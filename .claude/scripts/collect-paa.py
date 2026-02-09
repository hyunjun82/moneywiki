#!/usr/bin/env python3
"""
구글 PAA (People Also Ask) 수집
- Playwright로 headless 실행
- 재시도 로직 (오류 대응)
- 캐싱 시스템
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout, Error as PlaywrightError
import json
import sys
import time
from pathlib import Path
from datetime import datetime

def collect_google_paa(keyword, max_rounds=20, max_retries=3):
    """
    구글 PAA 수집 (재시도 로직 포함)
    
    Args:
        keyword: 검색 키워드
        max_rounds: 최대 확장 횟수
        max_retries: 최대 재시도 횟수
    
    Returns:
        list: PAA 질문 리스트
    """
    
    print(f"\n📡 PAA 수집 중: '{keyword}'")
    
    for attempt in range(max_retries):
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(
                    headless=True,
                    args=[
                        '--disable-blink-features=AutomationControlled',
                        '--disable-dev-shm-usage',
                        '--no-sandbox'
                    ]
                )
                
                context = browser.new_context(
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    viewport={'width': 1920, 'height': 1080}
                )
                
                page = context.new_page()
                
                # 1. 구글 검색
                page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
                page.wait_for_timeout(2000)
                
            # 2. 관련 질문 찾기 (여러 셀렉터 시도)
            all_questions = set()
            
            # 페이지 로드 대기
            page.wait_for_timeout(3000)
            
            # 3. 반복 확장
            for round_num in range(max_rounds):
                prev_count = len(all_questions)
                
                # 현재 질문 수집 (여러 셀렉터 시도)
                questions = page.evaluate("""
                    const questions = new Set();
                    
                    // 방법 1: role="button" (이미지의 V 버튼 영역)
                    document.querySelectorAll('[role="button"]').forEach(el => {
                        const text = el.textContent.trim();
                        if (text.includes('?') && text.length > 5 && text.length < 200) {
                            questions.add(text.split('\\n')[0].trim());
                        }
                    });
                    
                    // 방법 2: 관련 질문 헤더 찾기
                    const headers = document.querySelectorAll('div');
                    headers.forEach(header => {
                        const text = header.textContent;
                        if (text === '관련 질문' || text === 'People also ask') {
                            let parent = header.parentElement;
                            for (let i = 0; i < 3; i++) {
                                if (parent) {
                                    parent.querySelectorAll('[role="button"]').forEach(btn => {
                                        const btnText = btn.textContent.trim();
                                        if (btnText.includes('?') && btnText.length > 5) {
                                            questions.add(btnText.split('\\n')[0].trim());
                                        }
                                    });
                                    parent = parent.parentElement;
                                }
                            }
                        }
                    });
                    
                    // 방법 3: 직접 질문 텍스트 찾기
                    document.querySelectorAll('div, span').forEach(el => {
                        const text = el.textContent.trim();
                        // 한글로 끝나는 질문 형식
                        if ((text.endsWith('?') || text.endsWith('요?') || text.endsWith('까?')) 
                            && text.length > 10 && text.length < 200
                            && !text.includes('\\n')) {
                            questions.add(text);
                        }
                    });
                    
                    return Array.from(questions);
                """)
                
                for q in questions:
                    all_questions.add(q)
                
                # 새 질문 없으면 카운트
                if len(all_questions) == prev_count:
                    no_new_questions_count += 1
                    if no_new_questions_count >= 3:
                        # 3번 연속 새 질문 없으면 종료
                        break
                else:
                    no_new_questions_count = 0
                    
                # V 버튼 클릭 (확장)
                try:
                    # aria-expanded="false"인 버튼 찾기
                    v_buttons = page.locator('[role="button"][aria-expanded="false"]').all()
                    
                    if len(v_buttons) > 0:
                        # 첫 번째 V 버튼 클릭
                        v_buttons[0].scroll_into_view_if_needed()
                        page.wait_for_timeout(500)
                        v_buttons[0].click(timeout=3000)
                        page.wait_for_timeout(1000)  # 새 질문 로드 대기
                    else:
                        # 더 이상 확장 불가
                        no_new_questions_count += 1
                        if no_new_questions_count >= 3:
                            break
                except Exception as e:
                    # 클릭 실패
                    no_new_questions_count += 1
                    if no_new_questions_count >= 3:
                        break
                
                print(f"   ✅ {len(all_questions)}개 PAA 수집 완료")
                
                browser.close()
                return list(all_questions)
                
        except PlaywrightTimeout as e:
            print(f"   ⚠️  타임아웃 발생 (재시도 {attempt + 1}/{max_retries})")
            if attempt == max_retries - 1:
                print(f"   ❌ {max_retries}회 시도 후 실패")
                return []
            time.sleep(5)
            
        except (PlaywrightError, Exception) as e:
            print(f"   ⚠️  오류: {str(e)[:100]} (재시도 {attempt + 1}/{max_retries})")
            if attempt == max_retries - 1:
                print(f"   ❌ {max_retries}회 시도 후 실패")
                return []
            time.sleep(5)
    
    return []

def load_paa_cache(keyword):
    """PAA 캐시 로드 (7일 이내)"""
    cache_dir = Path(__file__).parent.parent / 'data' / 'paa-cache'
    cache_file = cache_dir / f'{keyword}.json'
    
    if not cache_file.exists():
        return None
    
    try:
        with open(cache_file, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        
        # 타임스탬프 확인
        cache_time = datetime.fromisoformat(cache['timestamp'])
        age_days = (datetime.now() - cache_time).days
        
        if age_days < 7:
            print(f"   ✅ 캐시 사용 ({age_days}일 전 수집)")
            return cache['questions']
    except:
        pass
    
    return None

def save_paa_cache(keyword, questions):
    """PAA 캐시 저장"""
    cache_dir = Path(__file__).parent.parent / 'data' / 'paa-cache'
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    cache_file = cache_dir / f'{keyword}.json'
    
    data = {
        'keyword': keyword,
        'timestamp': datetime.now().isoformat(),
        'count': len(questions),
        'questions': questions
    }
    
    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return cache_file

def collect_with_cache(keyword):
    """캐시 우선 PAA 수집"""
    # 1. 캐시 확인
    cached = load_paa_cache(keyword)
    if cached:
        return cached
    
    # 2. 새로 수집
    questions = collect_google_paa(keyword)
    
    # 3. 캐시 저장
    if questions:
        cache_file = save_paa_cache(keyword, questions)
        print(f"💾 캐시 저장: {cache_file.name}")
    
    return questions

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('사용법: py collect-paa.py "키워드"')
        print('옵션: --no-cache (캐시 사용 안 함)')
        sys.exit(1)
    
    keyword = sys.argv[1]
    use_cache = '--no-cache' not in sys.argv
    
    if use_cache:
        questions = collect_with_cache(keyword)
    else:
        questions = collect_google_paa(keyword)
    
    # JSON 출력
    print(f"\n결과: {len(questions)}개 질문")
    print(json.dumps(questions, ensure_ascii=False, indent=2))
