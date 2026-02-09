#!/usr/bin/env python3
"""
네이버 연관검색어 최대한 수집

방법:
1. 네이버 검색 결과 페이지
2. 하단 연관검색어 영역
3. "더보기" 클릭 반복
4. 최대한 많이 수집
"""

from playwright.sync_api import sync_playwright
import csv
from pathlib import Path
import time

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def collect_naver_max(keyword):
    """네이버 연관검색어 최대한 수집"""
    
    print(f"🔍 네이버 연관검색어 수집: '{keyword}'")
    
    keywords = set()
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        # 1. 네이버 검색
        page.goto(f'https://search.naver.com/search.naver?query={keyword}')
        time.sleep(3)
        
        # 2. 하단으로 스크롤
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        
        # 3. 연관검색어 수집 (여러 방법)
        print("   [1/3] 기본 연관검색어...")
        
        related = page.evaluate("""
            () => {
                const results = [];
                
                // 방법 1: .related_srch
                document.querySelectorAll('.related_srch .keyword').forEach(el => {
                    results.push(el.textContent.trim());
                });
                
                // 방법 2: .lst_related_srch
                document.querySelectorAll('.lst_related_srch a').forEach(el => {
                    results.push(el.textContent.trim());
                });
                
                // 방법 3: .related_keyword
                document.querySelectorAll('.related_keyword a').forEach(el => {
                    results.push(el.textContent.trim());
                });
                
                // 방법 4: _related_keyword_ul
                document.querySelectorAll('._related_keyword_ul a').forEach(el => {
                    results.push(el.textContent.trim());
                });
                
                return [...new Set(results)];
            }
        """)
        
        for kw in related:
            if kw and len(kw) < 50:
                keywords.add(kw)
        
        print(f"   → {len(keywords)}개 수집")
        
        # 4. "더보기" 버튼 찾기
        print("   [2/3] 더보기 버튼 찾기...")
        
        try:
            more_btn = page.locator('a:has-text("더보기"), button:has-text("더보기")').first
            if more_btn:
                more_btn.click()
                time.sleep(2)
                
                # 추가 연관검색어 수집
                additional = page.evaluate("""
                    () => {
                        const results = [];
                        document.querySelectorAll('.related_srch .keyword, .lst_related_srch a').forEach(el => {
                            results.push(el.textContent.trim());
                        });
                        return [...new Set(results)];
                    }
                """)
                
                for kw in additional:
                    if kw and len(kw) < 50:
                        keywords.add(kw)
                
                print(f"   → 추가 {len(additional)}개 수집")
        except:
            print("   → 더보기 버튼 없음")
        
        # 5. 첫 번째 연관검색어 클릭 → 새로운 연관검색어
        print("   [3/3] 2차 연관검색어...")
        
        try:
            first_related = list(keywords)[0]
            page.goto(f'https://search.naver.com/search.naver?query={first_related}')
            time.sleep(2)
            
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(1)
            
            second_level = page.evaluate("""
                () => {
                    const results = [];
                    document.querySelectorAll('.related_srch .keyword').forEach(el => {
                        results.push(el.textContent.trim());
                    });
                    return [...new Set(results)];
                }
            """)
            
            for kw in second_level:
                if kw and len(kw) < 50 and keyword in kw:
                    keywords.add(kw)
            
            print(f"   → 2차 {len(second_level)}개 수집")
        except:
            print("   → 2차 수집 실패")
        
        browser.close()
    
    return keywords

def save_csv(keyword, keywords):
    """CSV 저장"""
    
    filename = f'{keyword.replace(" ", "-")}-naver-max.csv'
    filepath = DATA_DIR / filename
    
    with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['키워드', '타입', '소스'])
        
        for kw in sorted(keywords):
            writer.writerow([kw, '연관검색어', 'naver'])
    
    return filepath

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("사용법: py collect-naver-more.py '퇴직금'")
        sys.exit(1)
    
    keyword = sys.argv[1]
    
    print("=" * 60)
    print(f"🔍 네이버 연관검색어 최대 수집: '{keyword}'")
    print("=" * 60 + "\n")
    
    keywords = collect_naver_max(keyword)
    
    print("\n" + "=" * 60)
    print(f"✅ 수집 완료: {len(keywords)}개")
    
    filepath = save_csv(keyword, keywords)
    
    print(f"💾 저장: {filepath.name}")
    print("=" * 60)

if __name__ == '__main__':
    main()
