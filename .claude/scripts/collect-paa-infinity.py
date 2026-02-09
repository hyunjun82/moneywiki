#!/usr/bin/env python3
"""
구글 PAA 무한 확장 수집기

원리:
1. 구글 검색 "퇴직금"
2. PAA 질문 4개 발견
3. 첫 번째 질문 클릭 → 새로운 질문 2개 추가 (총 6개)
4. 두 번째 질문 클릭 → 새로운 질문 2개 추가 (총 8개)
5. 반복... → 100~200개 수집

참고: 구글이 차단할 수 있으므로 딜레이 필수
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import json
from pathlib import Path
from datetime import datetime
import time
import random

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def collect_paa_infinity(keyword, target_count=100, max_clicks=50):
    """
    PAA 무한 확장 수집
    
    Args:
        keyword: 검색 키워드
        target_count: 목표 수집 개수 (기본 100개)
        max_clicks: 최대 클릭 횟수 (기본 50회)
    
    Returns:
        list: PAA 질문 리스트
    """
    
    print(f"\n🔍 PAA 무한 확장 수집 시작: '{keyword}'")
    print(f"   목표: {target_count}개, 최대 클릭: {max_clicks}회\n")
    
    all_questions = set()
    click_count = 0
    
    try:
        with sync_playwright() as p:
            # 브라우저 실행 (headless)
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
            print(f"[1/3] 구글 검색 중... ({keyword})")
            page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
            time.sleep(2)
            
            # 2. PAA 영역으로 스크롤
            print("[2/3] PAA 영역 찾는 중...")
            try:
                page.evaluate("""
                    () => {
                        const paaSection = document.querySelector('[jsname="yEVEwb"]');
                        if (paaSection) {
                            paaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                """)
                time.sleep(1)
            except:
                pass
            
            # 3. PAA 무한 확장
            print(f"[3/3] PAA 확장 중... (목표: {target_count}개)")
            print("=" * 50)
            
            no_new_count = 0  # 새 질문 없는 횟수
            
            while len(all_questions) < target_count and click_count < max_clicks:
                prev_count = len(all_questions)
                
                # 현재 PAA 질문 수집
                questions = page.evaluate("""
                    () => {
                        const questions = [];
                        
                        // 방법 1: role="button" 요소
                        document.querySelectorAll('[role="button"]').forEach(el => {
                            const text = el.textContent.trim();
                            if (text.includes('?') && text.length > 10 && text.length < 200) {
                                const firstLine = text.split('\\n')[0].trim();
                                if (firstLine.length > 10) {
                                    questions.push(firstLine);
                                }
                            }
                        });
                        
                        // 방법 2: jsname 속성
                        document.querySelectorAll('[jsname]').forEach(el => {
                            const text = el.textContent.trim();
                            if ((text.endsWith('?') || text.endsWith('요?') || text.endsWith('까?')) 
                                && text.length > 10 && text.length < 200
                                && !text.includes('\\n')) {
                                questions.push(text);
                            }
                        });
                        
                        return [...new Set(questions)];
                    }
                """)
                
                # 수집
                for q in questions:
                    if q not in all_questions:
                        all_questions.add(q)
                
                # 진행 상황 출력
                new_count = len(all_questions) - prev_count
                if new_count > 0:
                    print(f"   [{len(all_questions)}/{target_count}] +{new_count}개 수집 (클릭: {click_count}회)")
                    no_new_count = 0
                else:
                    no_new_count += 1
                
                # 새 질문 없으면 3회 후 종료
                if no_new_count >= 3:
                    print(f"\n   ⚠️  새 질문이 {no_new_count}회 연속 없음. 종료합니다.")
                    break
                
                # 목표 달성
                if len(all_questions) >= target_count:
                    print(f"\n   ✅ 목표 {target_count}개 달성!")
                    break
                
                # PAA 질문 클릭 (확장)
                try:
                    # aria-expanded="false"인 버튼 찾기
                    buttons = page.locator('[role="button"][aria-expanded="false"]').all()
                    
                    if len(buttons) > 0:
                        # 랜덤하게 버튼 선택 (구글 우회)
                        idx = random.randint(0, min(2, len(buttons) - 1))
                        button = buttons[idx]
                        
                        # 스크롤 후 클릭
                        button.scroll_into_view_if_needed()
                        time.sleep(random.uniform(0.5, 1.5))  # 사람인 척
                        
                        button.click(timeout=3000)
                        click_count += 1
                        
                        # 새 질문 로드 대기
                        time.sleep(random.uniform(1.0, 2.0))
                    else:
                        no_new_count += 1
                        if no_new_count >= 3:
                            break
                
                except Exception as e:
                    # 클릭 실패 시 스크롤 후 재시도
                    try:
                        page.evaluate("window.scrollBy(0, 300)")
                        time.sleep(1)
                    except:
                        pass
                    no_new_count += 1
            
            browser.close()
            
            print("=" * 50)
            print(f"\n✅ 수집 완료: {len(all_questions)}개")
            print(f"   총 클릭: {click_count}회\n")
            
            return list(all_questions)
    
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        return list(all_questions)

def classify_questions(questions, base_keyword):
    """Hub/Spoke 분류"""
    hub = []
    spoke = []
    
    base_lower = base_keyword.lower()
    
    for q in questions:
        q_lower = q.lower()
        
        # 베이스 키워드 직접 포함 → Hub
        if base_lower in q_lower:
            hub.append(q)
        else:
            # 베이스 키워드의 단어 중 하나라도 포함 → Spoke
            base_parts = base_lower.split()
            if any(part in q_lower for part in base_parts):
                spoke.append(q)
    
    return hub, spoke

def save_results(keyword, questions):
    """결과 저장"""
    hub, spoke = classify_questions(questions, keyword)
    
    result = {
        'keyword': keyword,
        'collectedAt': datetime.now().strftime('%Y-%m-%d'),
        'method': 'paa_infinity',
        'count': len(questions),
        'hubCount': len(hub),
        'spokeCount': len(spoke),
        'questions': questions,
        'hubQuestions': hub,
        'spokeQuestions': spoke
    }
    
    filename = f'{keyword.replace(" ", "-")}-paa-infinity.json'
    filepath = DATA_DIR / filename
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"💾 저장 완료: {filename}")
    print(f"   Hub: {len(hub)}개")
    print(f"   Spoke: {len(spoke)}개")
    
    return filepath

def main():
    """메인 함수"""
    import sys
    
    if len(sys.argv) < 2:
        print("사용법: py collect-paa-infinity.py '퇴직금' [목표개수]")
        print("예시: py collect-paa-infinity.py '퇴직금' 100")
        sys.exit(1)
    
    keyword = sys.argv[1]
    target_count = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    
    # PAA 수집
    questions = collect_paa_infinity(keyword, target_count=target_count)
    
    if questions:
        # 저장
        filepath = save_results(keyword, questions)
        print(f"\n✅ 완료! {len(questions)}개 수집")
        print(f"   파일: {filepath}")
    else:
        print("\n❌ 수집된 질문이 없습니다.")

if __name__ == '__main__':
    main()
