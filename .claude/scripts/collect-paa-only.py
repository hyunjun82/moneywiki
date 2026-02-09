#!/usr/bin/env python3
"""
🎯 진짜 연관검색어 + PAA 수집기

수집 대상:
1. 네이버 연관검색어 (화면 하단 짧은 키워드)
2. 구글 연관검색어 (화면 하단 칩)
3. 빙 연관검색어 (화면 하단)
4. 다음 연관검색어 (화면 하단)
5. 구글 PAA (People Also Ask 질문)

출력: CSV (관련있는 것만)
"""

from playwright.sync_api import sync_playwright
import csv
from pathlib import Path
from datetime import datetime
import time
import random

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def collect_naver_related(page, keyword):
    """네이버 연관검색어 (하단만!)"""
    print(f"\n[1/5] 📗 네이버 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        page.goto(f'https://search.naver.com/search.naver?query={keyword}', wait_until='networkidle')
        time.sleep(3)  # 2초 → 3초
        
        # 하단으로 스크롤
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        
        # ⭐ 연관검색어만 (짧은 키워드!)
        related = page.evaluate("""
            () => {
                const results = [];
                
                // 방법 1: 하단 연관검색어 영역
                document.querySelectorAll('.related_srch .keyword').forEach(el => {
                    const text = el.textContent.trim();
                    // 짧은 키워드만 (50자 이하)
                    if (text.length > 0 && text.length < 50) {
                        results.push(text);
                    }
                });
                
                // 방법 2: VIEW 탭 하단
                document.querySelectorAll('.lst_related_srch a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0 && text.length < 50) {
                        results.push(text);
                    }
                });
                
                return [...new Set(results)];
            }
        """)
        
        for kw in related:
            if kw and len(kw) > 1 and not kw.startswith('http'):
                keywords.add(kw)
        
        print(f"   ✅ {len(keywords)}개 수집")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return keywords

def collect_google_related(page, keyword):
    """구글 연관검색어 (하단 칩!)"""
    print(f"\n[2/5] 🔍 구글 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
        time.sleep(2)
        
        # 하단으로 스크롤
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        
        # ⭐ 관련 검색어 칩만
        related = page.evaluate("""
            () => {
                const results = [];
                
                // "관련 검색어" 칩 (짧은 키워드!)
                document.querySelectorAll('.k8XOCe, .s75CSd').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0 && text.length < 50 && !text.includes('관련')) {
                        results.push(text);
                    }
                });
                
                return [...new Set(results)];
            }
        """)
        
        for kw in related:
            if kw and len(kw) > 1:
                keywords.add(kw)
        
        print(f"   ✅ {len(keywords)}개 수집")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return keywords

def collect_bing_related(page, keyword):
    """빙 연관검색어 (하단만!)"""
    print(f"\n[3/5] 🔵 빙 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        page.goto(f'https://www.bing.com/search?q={keyword}', wait_until='networkidle')
        time.sleep(3)  # 2초 → 3초
        
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        
        related = page.evaluate("""
            () => {
                const results = [];
                document.querySelectorAll('.b_rs a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0 && text.length < 50) {
                        results.push(text);
                    }
                });
                return [...new Set(results)];
            }
        """)
        
        for kw in related:
            if kw and len(kw) > 1:
                keywords.add(kw)
        
        print(f"   ✅ {len(keywords)}개 수집")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return keywords

def collect_daum_related(page, keyword):
    """다음 연관검색어 (하단만!)"""
    print(f"\n[4/5] 🟠 다음 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        page.goto(f'https://search.daum.net/search?q={keyword}', wait_until='networkidle')
        time.sleep(3)  # 2초 → 3초
        
        related = page.evaluate("""
            () => {
                const results = [];
                document.querySelectorAll('.rel_search a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0 && text.length < 50) {
                        results.push(text);
                    }
                });
                return [...new Set(results)];
            }
        """)
        
        for kw in related:
            if kw and len(kw) > 1:
                keywords.add(kw)
        
        print(f"   ✅ {len(keywords)}개 수집")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return keywords

def collect_google_paa(page, keyword, target_count=100):
    """구글 PAA (질문만!)"""
    print(f"\n[5/5] 🎯 구글 PAA 수집 중... (목표: {target_count}개)")
    
    questions = set()
    click_count = 0
    max_clicks = 50
    
    try:
        page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
        time.sleep(3)  # 2초 → 3초
        
        no_new_count = 0
        
        while len(questions) < target_count and click_count < max_clicks:
            prev_count = len(questions)
            
            # ⭐ PAA 질문만 (물음표로 끝나는 짧은 문장!)
            paa_questions = page.evaluate("""
                () => {
                    const questions = [];
                    
                    // PAA 영역 찾기
                    document.querySelectorAll('[jsname="Cpkphb"], .related-question-pair').forEach(el => {
                        const text = el.textContent.trim();
                        const firstLine = text.split('\\n')[0].trim();
                        
                        // 질문 형식 (물음표 + 길이 제한)
                        if ((firstLine.endsWith('?') || firstLine.endsWith('요?') || firstLine.endsWith('까?'))
                            && firstLine.length > 10 
                            && firstLine.length < 100) {
                            questions.push(firstLine);
                        }
                    });
                    
                    return [...new Set(questions)];
                }
            """)
            
            for q in paa_questions:
                if q not in questions:
                    questions.add(q)
            
            new_count = len(questions) - prev_count
            if new_count > 0:
                print(f"   [{len(questions)}/{target_count}] +{new_count}개 (클릭: {click_count}회)")
                no_new_count = 0
            else:
                no_new_count += 1
            
            if no_new_count >= 3 or len(questions) >= target_count:
                break
            
            # PAA 확장 클릭
            try:
                buttons = page.locator('[jsname="Cpkphb"][aria-expanded="false"]').all()
                
                if len(buttons) > 0:
                    idx = min(0, len(buttons) - 1)
                    button = buttons[idx]
                    
                    button.scroll_into_view_if_needed()
                    time.sleep(random.uniform(0.5, 1.5))
                    
                    button.click(timeout=3000)
                    click_count += 1
                    
                    time.sleep(random.uniform(1.0, 2.0))
                else:
                    no_new_count += 1
            
            except:
                no_new_count += 1
        
        print(f"   ✅ {len(questions)}개 수집")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return questions

def save_csv(keyword, all_data):
    """CSV 저장"""
    
    filename = f'{keyword.replace(" ", "-")}-keywords.csv'
    filepath = DATA_DIR / filename
    
    with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['키워드', '타입', '소스'])
        
        # 연관검색어
        for item in all_data['related']:
            writer.writerow([item['keyword'], '연관검색어', item['source']])
        
        # PAA
        for question in all_data['paa']:
            writer.writerow([question, 'PAA', 'google'])
    
    return filepath

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("=" * 60)
        print("🎯 진짜 연관검색어 + PAA 수집기")
        print("=" * 60)
        print("\n사용법:")
        print("  py collect-paa-only.py '퇴직금'")
        print("  py collect-paa-only.py '근로장려금' 150")
        sys.exit(1)
    
    keyword = sys.argv[1]
    paa_target = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    
    print("=" * 60)
    print(f"🎯 키워드 수집 시작: '{keyword}'")
    print("=" * 60)
    
    all_related = []
    all_paa = set()
    
    with sync_playwright() as p:
        # ⭐ headless=False로 변경 (브라우저 보이게 → 구글 차단 우회)
        browser = p.chromium.launch(
            headless=False,  # 브라우저 창 보이게!
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox'
            ]
        )
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080}
        )
        page = context.new_page()
        
        # 1. 네이버 연관검색어
        keywords = collect_naver_related(page, keyword)
        all_related.extend([{'keyword': kw, 'source': 'naver'} for kw in keywords])
        
        # 2. 구글 연관검색어
        keywords = collect_google_related(page, keyword)
        all_related.extend([{'keyword': kw, 'source': 'google'} for kw in keywords])
        
        # 3. 빙 연관검색어
        keywords = collect_bing_related(page, keyword)
        all_related.extend([{'keyword': kw, 'source': 'bing'} for kw in keywords])
        
        # 4. 다음 연관검색어
        keywords = collect_daum_related(page, keyword)
        all_related.extend([{'keyword': kw, 'source': 'daum'} for kw in keywords])
        
        # 5. 구글 PAA
        questions = collect_google_paa(page, keyword, target_count=paa_target)
        all_paa = questions
        
        browser.close()
    
    # CSV 저장
    print("\n" + "=" * 60)
    print("💾 CSV 저장 중...")
    
    data = {
        'related': all_related,
        'paa': all_paa
    }
    
    filepath = save_csv(keyword, data)
    
    print("\n✅ 수집 완료!")
    print("=" * 60)
    print(f"\n📊 결과:")
    print(f"   - 연관검색어: {len(all_related)}개")
    print(f"   - PAA: {len(all_paa)}개")
    print(f"\n💾 저장: {filepath.name}")

if __name__ == '__main__':
    main()
