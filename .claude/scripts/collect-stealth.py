import csv
import time
import random
from pathlib import Path
from playwright.sync_api import sync_playwright

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def run(keyword):
    # 결과 저장 리스트
    results = []

    with sync_playwright() as p:
        # ★★★ 핵심: 스텔스 모드 옵션 추가 ★★★
        browser = p.chromium.launch(
            headless=False,  # 브라우저 보이게
            args=[
                "--disable-blink-features=AutomationControlled", # 로봇 표시 제거
                "--no-sandbox",
                "--disable-infobars"
            ]
        )
        
        # 문맥 생성 (User-Agent를 일반 사람처럼 설정)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 720}
        )
        
        # 페이지 생성 및 스텔스 스크립트 주입 (탐지 회피)
        page = context.new_page()
        page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        print("🚀 수집 시작... (차단 회피 모드)")

        # ---------------------------------------------------------
        # 1. 네이버 (이미 성공함 - 유지)
        # ---------------------------------------------------------
        try:
            print(f"1. 네이버 검색 중: {keyword}")
            page.goto(f"https://search.naver.com/search.naver?query={keyword}")
            page.wait_for_timeout(2000)
            
            # 네이버 연관검색어 셀렉터
            elements = page.locator(".lst_related_srch .tit")
            count = elements.count()
            
            if count > 0:
                for i in range(count):
                    text = elements.nth(i).inner_text().strip()
                    if text:
                        results.append([text, "연관검색어", "naver"])
                print(f"   ✅ 네이버 {count}개 수집 완료")
            else:
                print("   ⚠️ 네이버 연관검색어 없음")
                
        except Exception as e:
            print(f"   ❌ 네이버 에러: {e}")

        # ---------------------------------------------------------
        # 2. 구글 (차단 뚫기 시도)
        # ---------------------------------------------------------
        try:
            print(f"2. 구글 검색 중: {keyword}")
            page.goto(f"https://www.google.com/search?q={keyword}&hl=ko") # 한국어 설정
            page.wait_for_timeout(3000) # 로딩 대기

            # 구글 관련 검색어 (하단 칩 모양)
            # 셀렉터가 자주 바뀜. 여러 개 시도.
            chips = page.locator(".s75CSd, .k8XOCe, .s75CSd + div") 
            count = chips.count()
            
            if count > 0:
                for i in range(count):
                    text = chips.nth(i).inner_text().strip()
                    if text and text not in [r[0] for r in results]:
                        results.append([text, "연관검색어", "google"])
                print(f"   ✅ 구글 연관검색어 {count}개 수집 완료")
            else:
                print("   ⚠️ 구글 연관검색어(하단) 발견 못 함 (셀렉터 불일치 가능성)")

        except Exception as e:
            print(f"   ❌ 구글 에러: {e}")

        # ---------------------------------------------------------
        # 3. 구글 PAA (질문 수집 - 이게 핵심)
        # ---------------------------------------------------------
        try:
            print(f"3. 구글 PAA(관련 질문) 채굴 중...")
            
            # PAA 섹션 찾기 (jsname 속성으로 찾기 - 더 안정적)
            paa_questions = page.locator("div[jsname='yEVEwb'], .related-question-pair")
            
            # 처음 보이는 질문 개수
            count = paa_questions.count()
            print(f"   초기 질문 {count}개 발견. 클릭해서 확장 시도...")

            for i in range(min(count, 4)): # 최대 4개만 클릭해봄 (너무 많이 하면 차단)
                try:
                    # 질문 텍스트 가져오기
                    q_text = paa_questions.nth(i).inner_text().split('\n')[0] # 첫 줄만 질문임
                    
                    if q_text and q_text not in [r[0] for r in results]:
                        results.append([q_text, "PAA질문", "google_paa"])
                        print(f"      📌 질문 수집: {q_text}")
                    
                    # 클릭해서 새 질문 로딩 유도 (살살 클릭)
                    paa_questions.nth(i).click()
                    page.wait_for_timeout(random.randint(1000, 2000)) # 1~2초 랜덤 대기
                    
                except:
                    continue # 클릭 안 되면 패스

        except Exception as e:
            print(f"   ❌ 구글 PAA 에러: {e}")

        # ---------------------------------------------------------
        # 4. 다음 (Daum)
        # ---------------------------------------------------------
        try:
            print(f"4. 다음 검색 중: {keyword}")
            page.goto(f"https://search.daum.net/search?w=tot&q={keyword}")
            page.wait_for_timeout(2000)
            
            # 다음 관련 검색어
            # pc_rel_keyword 클래스 안의 a 태그
            daum_keywords = page.locator("#netizen_lists_top a.keyword")
            count = daum_keywords.count()
            
            if count > 0:
                for i in range(count):
                    text = daum_keywords.nth(i).inner_text().strip()
                    if text:
                        results.append([text, "연관검색어", "daum"])
                print(f"   ✅ 다음 {count}개 수집 완료")
            else:
                print("   ⚠️ 다음 연관검색어 없음")

        except Exception as e:
            print(f"   ❌ 다음 에러: {e}")
            
        # ---------------------------------------------------------
        # 저장
        # ---------------------------------------------------------
        browser.close()

    # CSV 저장
    if results:
        filename = DATA_DIR / f"{keyword}-keywords-stealth.csv"
        with open(filename, 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.writer(f)
            writer.writerow(['키워드', '타입', '소스'])
            writer.writerows(results)
        print(f"\n🎉 최종 저장 완료: {filename} (총 {len(results)}개)")
        return filename, len(results)
    else:
        print("\n😭 수집된 데이터가 없습니다.")
        return None, 0

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("사용법: py collect-stealth.py '퇴직금'")
        sys.exit(1)
    
    keyword = sys.argv[1]
    
    print("=" * 60)
    print(f"🎯 스텔스 모드 키워드 수집: '{keyword}'")
    print("=" * 60 + "\n")
    
    run(keyword)
