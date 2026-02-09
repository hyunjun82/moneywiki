import csv
import time
import random
from pathlib import Path
from playwright.sync_api import sync_playwright

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def run(keyword):
    results = []

    with sync_playwright() as p:
        # 스텔스 모드 브라우저 실행
        browser = p.chromium.launch(
            headless=False, 
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"]
        )
        
        # 모바일/태블릿 뷰포트가 아닌 PC 해상도 강제
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1920, "height": 1080},
            locale="ko-KR"
        )
        page = context.new_page()
        
        # 봇 탐지 우회 스크립트
        page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        print("🚀 구글 PAA 집중 공략 시작...")

        try:
            # 구글 접속 (한국어 강제)
            page.goto(f"https://www.google.com/search?q={keyword}&hl=ko&gl=kr")
            page.wait_for_timeout(3000)
            
            # ★ 캡차 감지 및 대기 ★
            print("   🔍 캡차 감지 중...")
            captcha_detected = page.locator("iframe[src*='recaptcha'], div#recaptcha, form#captcha-form").count() > 0
            
            if captcha_detected:
                print("\n" + "=" * 60)
                print("🤖 캡차 감지됨!")
                print("=" * 60)
                print("\n👉 브라우저 창에서 '나는 로봇이 아닙니다' 클릭하세요!")
                print("   (60초 대기 중...)\n")
                
                # 60초 대기 (사용자가 캡차 풀 시간)
                page.wait_for_timeout(60000)
                
                print("✅ 캡차 통과! 계속 진행합니다...\n")
            else:
                print("   ✅ 캡차 없음. 바로 진행!")

            # ★ 핵심 1: 사람처럼 스크롤 내리기 (PAA 로딩 유도) ★
            print("   🖱️ 스크롤 다운 중 (PAA 로딩 유도)...")
            page.mouse.wheel(0, 1000) # 1000픽셀 아래로 휠 굴리기
            page.wait_for_timeout(2000) # 로딩 대기
            page.mouse.wheel(0, -500) # 다시 살짝 올리기 (사람인 척)
            page.wait_for_timeout(1000)

            # ★ 핵심 2: 여러 가지 방법으로 PAA 찾기 ★
            # 방법 A: 클래스명으로 찾기
            paa_elements = page.locator(".related-question-pair")
            
            # 방법 B: 텍스트로 찾기 (만약 클래스가 바뀌었을 경우 대비)
            if paa_elements.count() == 0:
                print("   ⚠️ 클래스명으로 못 찾음. 텍스트 구조로 재탐색...")
                # '관련 질문' 헤더 근처의 리스트 찾기 (구조적 탐색)
                paa_elements = page.locator("div[jsname] > div[data-q]")

            count = paa_elements.count()
            print(f"   🔎 발견된 질문 개수: {count}개")

            if count > 0:
                # ★ 목표: 100개 수집 (최대 50회 클릭) ★
                max_clicks = 50
                total_collected = 0
                
                for click_round in range(max_clicks):
                    # 현재 보이는 모든 PAA 수집
                    paa_elements = page.locator(".related-question-pair, div[jsname] > div[data-q]")
                    current_count = paa_elements.count()
                    
                    if current_count == 0:
                        print(f"      ⚠️ {click_round}회 클릭 후 PAA 사라짐. 중단.")
                        break
                    
                    # 클릭할 인덱스 (이미 수집한 것 건너뛰기)
                    for i in range(min(current_count, 3)):
                        try:
                            # 텍스트 추출
                            text = paa_elements.nth(i).inner_text().split('\n')[0]
                            
                            if text and text not in [r[0] for r in results]:
                                print(f"      ✅ [{len(results)+1}] {text}")
                                results.append([text, "PAA질문", "google"])
                                total_collected += 1
                            
                            # 클릭해서 새 질문 증식
                            paa_elements.nth(i).click()
                            page.wait_for_timeout(random.randint(1000, 2000))
                            
                        except Exception as e:
                            continue
                    
                    # 100개 달성 시 중단
                    if total_collected >= 100:
                        print(f"\n      🎉 목표 100개 달성! 수집 종료")
                        break
                    
                    # 진행 상황 출력
                    if click_round % 5 == 0 and click_round > 0:
                        print(f"      📊 {click_round}회 클릭 완료 / 총 {total_collected}개 수집")
            else:
                print("   ❌ 여전히 PAA가 안 뜹니다. (IP 차단 또는 진짜 없는 키워드)")
                # 디버깅용 스크린샷 저장
                debug_dir = Path(__file__).parent.parent / 'data'
                debug_dir.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(debug_dir / "google_debug.png"))
                print(f"   📸 디버깅용 스크린샷 저장됨 (.claude/data/google_debug.png)")

        except Exception as e:
            print(f"   ❌ 치명적 에러: {e}")

        browser.close()

    # 결과 저장
    if results:
        filename = DATA_DIR / f"{keyword}-google-paa.csv"
        with open(filename, 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.writer(f)
            writer.writerow(['키워드', '타입', '소스'])
            writer.writerows(results)
        print(f"\n🎉 저장 완료: {filename}")
        return len(results)
    else:
        print("\n😭 구글 PAA 수집 실패 (0개)")
        return 0

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("사용법: py collect-google-final.py '퇴직금'")
        sys.exit(1)
    
    keyword = sys.argv[1]
    
    print("=" * 60)
    print(f"🎯 구글 PAA 최종 공략: '{keyword}'")
    print("=" * 60 + "\n")
    
    count = run(keyword)
    
    if count > 0:
        print(f"\n✅ 성공! {count}개 PAA 수집")
    else:
        print("\n⚠️ 구글 PAA 수집 실패")
        print("   - 디버깅 스크린샷 확인: .claude/data/google_debug.png")
        print("   - 다른 키워드 시도: py collect-google-final.py '실업급여'")
