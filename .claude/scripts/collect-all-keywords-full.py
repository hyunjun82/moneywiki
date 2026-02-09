#!/usr/bin/env python3
"""
🚀 풀자동 키워드 수집기 (5개 소스 통합)

소스:
1. 네이버 연관검색어 (30~50개)
2. 구글 연관검색어 (30~50개)
3. 빙 연관검색어 (20~30개)
4. 다음 연관검색어 (20~30개)
5. 구글 PAA 무한 확장 (40~100개)

출력: 100~200개 (중복 제거 후)
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import json
from pathlib import Path
from datetime import datetime
import time
import random

DATA_DIR = Path(__file__).parent.parent / 'data' / 'paa-results'
DATA_DIR.mkdir(parents=True, exist_ok=True)

# 동의어 그룹 (중복 제거용)
SYNONYM_GROUPS = [
    ['신청', '가입', '접수', '등록'],
    ['조건', '자격', '요건', '대상', '기준'],
    ['방법', '절차', '안내', '신청법', '하는법'],
    ['기한', '기간', '시기', '일정', '날짜'],
    ['금액', '비용', '가격', '수수료', '이자', '한도'],
    ['서류', '준비물', '문서', '첨부', '구비서류'],
    ['혜택', '지원금', '지원', '보조', '매칭금'],
    ['확인', '조회', '검색', '찾기'],
    ['해지', '탈퇴', '취소', '해약'],
    ['변경', '수정', '정정']
]

def normalize_keyword(text):
    """동의어 정규화"""
    normalized = text.lower().strip()
    
    for group in SYNONYM_GROUPS:
        for synonym in group:
            if synonym in normalized:
                normalized = normalized.replace(synonym, group[0])
    
    return normalized

def collect_naver_keywords(page, keyword):
    """네이버 연관검색어 수집"""
    print(f"\n[1/5] 📗 네이버 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        # 네이버 검색
        page.goto(f'https://search.naver.com/search.naver?query={keyword}', wait_until='networkidle')
        time.sleep(2)
        
        # 연관검색어 수집
        related = page.evaluate("""
            () => {
                const results = [];
                
                // 방법 1: 하단 연관검색어
                document.querySelectorAll('.related_srch .keyword, .lst_related_srch a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0) results.push(text);
                });
                
                // 방법 2: 자동완성
                document.querySelectorAll('.autocomplete li, .suggest_list li').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0) results.push(text);
                });
                
                // 방법 3: 통합검색 연관어
                document.querySelectorAll('.related_keyword a, .api_subject_bx a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0) results.push(text);
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

def collect_google_keywords(page, keyword):
    """구글 연관검색어 수집"""
    print(f"\n[2/5] 🔍 구글 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        # 구글 검색
        page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
        time.sleep(2)
        
        # 하단으로 스크롤 (연관검색어 영역)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        
        # 연관검색어 수집
        related = page.evaluate("""
            () => {
                const results = [];
                
                // "관련 검색어" 영역
                document.querySelectorAll('.k8XOCe, .s75CSd, .AJLUJb, .nVcaUb').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0 && !text.includes('관련 검색')) {
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

def collect_bing_keywords(page, keyword):
    """빙 연관검색어 수집"""
    print(f"\n[3/5] 🔵 빙 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        # 빙 검색
        page.goto(f'https://www.bing.com/search?q={keyword}', wait_until='networkidle')
        time.sleep(2)
        
        # 하단으로 스크롤
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        
        # 연관검색어 수집
        related = page.evaluate("""
            () => {
                const results = [];
                
                // "관련 검색" 영역
                document.querySelectorAll('.b_rs a, .sa_tm a, .b_sear a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0) results.push(text);
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

def collect_daum_keywords(page, keyword):
    """다음 연관검색어 수집"""
    print(f"\n[4/5] 🟠 다음 연관검색어 수집 중...")
    
    keywords = set()
    
    try:
        # 다음 검색
        page.goto(f'https://search.daum.net/search?q={keyword}', wait_until='networkidle')
        time.sleep(2)
        
        # 연관검색어 수집
        related = page.evaluate("""
            () => {
                const results = [];
                
                // 연관검색어 영역
                document.querySelectorAll('.rel_search a, .relate_keyword a, #netizen_lists_top a').forEach(el => {
                    const text = el.textContent.trim();
                    if (text.length > 0) results.push(text);
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
    """구글 PAA 무한 확장 수집"""
    print(f"\n[5/5] 🎯 구글 PAA 무한 확장 수집 중... (목표: {target_count}개)")
    
    all_questions = set()
    click_count = 0
    max_clicks = 50
    
    try:
        # 구글 검색
        page.goto(f'https://www.google.com/search?q={keyword}&hl=ko', wait_until='networkidle')
        time.sleep(2)
        
        # PAA 영역으로 스크롤
        try:
            page.evaluate("""
                () => {
                    const paaSection = document.querySelector('[jsname="yEVEwb"]');
                    if (paaSection) paaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            """)
            time.sleep(1)
        except:
            pass
        
        no_new_count = 0
        
        while len(all_questions) < target_count and click_count < max_clicks:
            prev_count = len(all_questions)
            
            # 현재 PAA 질문 수집
            questions = page.evaluate("""
                () => {
                    const questions = [];
                    
                    document.querySelectorAll('[role="button"]').forEach(el => {
                        const text = el.textContent.trim();
                        if (text.includes('?') && text.length > 10 && text.length < 200) {
                            const firstLine = text.split('\\n')[0].trim();
                            if (firstLine.length > 10) questions.push(firstLine);
                        }
                    });
                    
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
            
            for q in questions:
                if q not in all_questions:
                    all_questions.add(q)
            
            new_count = len(all_questions) - prev_count
            if new_count > 0:
                print(f"   [{len(all_questions)}/{target_count}] +{new_count}개 (클릭: {click_count}회)")
                no_new_count = 0
            else:
                no_new_count += 1
            
            if no_new_count >= 3 or len(all_questions) >= target_count:
                break
            
            # PAA 클릭
            try:
                buttons = page.locator('[role="button"][aria-expanded="false"]').all()
                
                if len(buttons) > 0:
                    idx = random.randint(0, min(2, len(buttons) - 1))
                    button = buttons[idx]
                    
                    button.scroll_into_view_if_needed()
                    time.sleep(random.uniform(0.5, 1.5))
                    
                    button.click(timeout=3000)
                    click_count += 1
                    
                    time.sleep(random.uniform(1.0, 2.0))
                else:
                    no_new_count += 1
            
            except:
                try:
                    page.evaluate("window.scrollBy(0, 300)")
                    time.sleep(1)
                except:
                    pass
                no_new_count += 1
        
        print(f"   ✅ {len(all_questions)}개 수집 (클릭: {click_count}회)")
    
    except Exception as e:
        print(f"   ❌ 오류: {str(e)[:50]}")
    
    return all_questions

def deduplicate_keywords(all_keywords):
    """중복 제거"""
    unique_map = {}
    
    for item in all_keywords:
        kw = item['keyword']
        source = item['source']
        
        # 동의어 정규화
        normalized = normalize_keyword(kw)
        
        if normalized not in unique_map:
            unique_map[normalized] = {
                'keyword': kw,
                'normalized': normalized,
                'sources': [source]
            }
        else:
            if source not in unique_map[normalized]['sources']:
                unique_map[normalized]['sources'].append(source)
    
    return list(unique_map.values())

def filter_relevant_keywords(keywords, base_keyword):
    """
    관련없는 키워드 배제
    
    베이스 키워드와 관련 없는 것 제거:
    - 베이스 키워드가 전혀 포함 안 됨
    - 베이스 키워드의 단어가 하나도 안 포함됨
    """
    relevant = []
    irrelevant = []
    
    base_lower = base_keyword.lower()
    base_parts = base_lower.split()
    
    for item in keywords:
        kw = item['keyword']
        kw_lower = kw.lower()
        
        # 베이스 키워드 직접 포함 → 관련 있음
        if base_lower in kw_lower:
            relevant.append(item)
        # 베이스 키워드의 단어 중 하나라도 포함 → 관련 있음
        elif any(part in kw_lower for part in base_parts if len(part) > 1):
            relevant.append(item)
        # 아무것도 없음 → 관련 없음
        else:
            irrelevant.append(item)
    
    return relevant, irrelevant

def classify_keywords(keywords, base_keyword):
    """Hub/Spoke 분류"""
    hub = []
    spoke = []
    
    base_lower = base_keyword.lower()
    
    for item in keywords:
        kw = item['keyword']
        kw_lower = kw.lower()
        
        if base_lower in kw_lower:
            hub.append(item)
        else:
            base_parts = base_lower.split()
            if any(part in kw_lower for part in base_parts):
                spoke.append(item)
    
    return hub, spoke

def save_results(keyword, all_data):
    """결과 저장 (JSON + CSV)"""
    import csv
    
    # 통계
    stats = {
        'naver': len([d for d in all_data if d['source'] == 'naver']),
        'google': len([d for d in all_data if d['source'] == 'google']),
        'bing': len([d for d in all_data if d['source'] == 'bing']),
        'daum': len([d for d in all_data if d['source'] == 'daum']),
        'paa': len([d for d in all_data if d['source'] == 'paa'])
    }
    
    # 중복 제거
    unique = deduplicate_keywords(all_data)
    
    # ⭐ 관련없는 키워드 배제
    relevant, irrelevant = filter_relevant_keywords(unique, keyword)
    
    # Hub/Spoke 분류
    hub, spoke = classify_keywords(relevant, keyword)
    
    # 결과
    result = {
        'keyword': keyword,
        'collectedAt': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'sources': stats,
        'totalRaw': len(all_data),
        'totalUnique': len(unique),
        'totalRelevant': len(relevant),
        'totalIrrelevant': len(irrelevant),
        'hubCount': len(hub),
        'spokeCount': len(spoke),
        'hub': [item['keyword'] for item in hub],
        'spoke': [item['keyword'] for item in spoke],
        'irrelevant': [item['keyword'] for item in irrelevant],
        'hubDetails': hub,
        'spokeDetails': spoke
    }
    
    # JSON 저장
    filename_json = f'{keyword.replace(" ", "-")}-all.json'
    filepath_json = DATA_DIR / filename_json
    
    with open(filepath_json, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    # ⭐ CSV 저장
    filename_csv = f'{keyword.replace(" ", "-")}-all.csv'
    filepath_csv = DATA_DIR / filename_csv
    
    with open(filepath_csv, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        
        # 헤더
        writer.writerow(['키워드', '분류', '소스', '관련성'])
        
        # Hub
        for item in hub:
            sources = ','.join(item['sources'])
            writer.writerow([item['keyword'], 'Hub', sources, '관련있음'])
        
        # Spoke
        for item in spoke:
            sources = ','.join(item['sources'])
            writer.writerow([item['keyword'], 'Spoke', sources, '관련있음'])
        
        # Irrelevant (참고용)
        for item in irrelevant:
            sources = ','.join(item['sources'])
            writer.writerow([item['keyword'], '제외', sources, '관련없음'])
    
    return filepath_json, filepath_csv, result

def main():
    """메인 함수"""
    import sys
    
    if len(sys.argv) < 2:
        print("=" * 60)
        print("🚀 풀자동 키워드 수집기 (5개 소스 통합)")
        print("=" * 60)
        print("\n사용법:")
        print("  py collect-all-keywords-full.py '퇴직금'")
        print("  py collect-all-keywords-full.py '근로장려금' 150")
        print("\n수집 소스:")
        print("  1. 네이버 연관검색어")
        print("  2. 구글 연관검색어")
        print("  3. 빙 연관검색어")
        print("  4. 다음 연관검색어")
        print("  5. 구글 PAA (무한 확장)")
        print("\n출력: 100~200개 (중복 제거 후)")
        sys.exit(1)
    
    keyword = sys.argv[1]
    paa_target = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    
    print("=" * 60)
    print(f"🚀 풀자동 키워드 수집 시작: '{keyword}'")
    print("=" * 60)
    
    all_data = []
    
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
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            viewport={'width': 1920, 'height': 1080}
        )
        
        page = context.new_page()
        
        # 1. 네이버
        keywords = collect_naver_keywords(page, keyword)
        all_data.extend([{'keyword': kw, 'source': 'naver'} for kw in keywords])
        
        # 2. 구글
        keywords = collect_google_keywords(page, keyword)
        all_data.extend([{'keyword': kw, 'source': 'google'} for kw in keywords])
        
        # 3. 빙
        keywords = collect_bing_keywords(page, keyword)
        all_data.extend([{'keyword': kw, 'source': 'bing'} for kw in keywords])
        
        # 4. 다음
        keywords = collect_daum_keywords(page, keyword)
        all_data.extend([{'keyword': kw, 'source': 'daum'} for kw in keywords])
        
        # 5. 구글 PAA
        questions = collect_google_paa(page, keyword, target_count=paa_target)
        all_data.extend([{'keyword': q, 'source': 'paa'} for q in questions])
        
        browser.close()
    
    # 결과 저장
    print("\n" + "=" * 60)
    print("💾 결과 저장 중...")
    
    filepath_json, filepath_csv, result = save_results(keyword, all_data)
    
    print("\n✅ 수집 완료!")
    print("=" * 60)
    print(f"\n📊 소스별 수집 결과:")
    for source, count in result['sources'].items():
        print(f"   - {source:8s}: {count:3d}개")
    
    print(f"\n🔍 필터링:")
    print(f"   - 원본: {result['totalRaw']}개")
    print(f"   - 중복 제거: {result['totalUnique']}개")
    print(f"   - 관련 있음: {result['totalRelevant']}개")
    print(f"   - 관련 없음 (제외): {result['totalIrrelevant']}개")
    
    print(f"\n📂 분류:")
    print(f"   - Hub: {result['hubCount']}개")
    print(f"   - Spoke: {result['spokeCount']}개")
    
    print(f"\n💾 저장:")
    print(f"   - JSON: {filepath_json.name}")
    print(f"   - CSV:  {filepath_csv.name}")
    
    print(f"\n다음 단계: /keyword {keyword}")

if __name__ == '__main__':
    main()
