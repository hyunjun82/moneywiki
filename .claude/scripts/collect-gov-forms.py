#!/usr/bin/env python3
"""
대한민국 정부 양식 자동 수집기 (합법)

타겟:
1. 대한법률구조공단 (법률서식)
2. 대법원 나홀로 소송 (법원 서식)
3. 국세청 (세무 서식)
4. 고용노동부 (근로계약서 등)
5. 국가법령정보센터 (별지 서식)

출처: 
- https://www.klac.or.kr/ (대한법률구조공단)
- https://pro-se.scourt.go.kr/ (나홀로 소송)
- https://www.nts.go.kr/ (국세청)
- https://www.moel.go.kr/ (고용노동부)
- https://www.law.go.kr/ (법령정보센터)
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import json
import os
from pathlib import Path
from datetime import datetime
import time

# 결과 저장 디렉토리
DATA_DIR = Path(__file__).parent.parent / 'data' / 'gov-forms'
DATA_DIR.mkdir(parents=True, exist_ok=True)

def collect_klac_forms():
    """대한법률구조공단 서식 수집"""
    print("\n📁 [1/5] 대한법률구조공단 서식 수집 중...")
    
    forms = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 법률서식 페이지
        page.goto('https://www.klac.or.kr/legalinfo/domesticForm.do')
        page.wait_for_timeout(2000)
        
        # 페이지네이션 (1~10페이지만 수집)
        for page_num in range(1, 11):
            print(f"   페이지 {page_num}/10...")
            
            # 서식 목록 수집
            items = page.evaluate("""
                () => {
                    const results = [];
                    document.querySelectorAll('.board_list tr').forEach(row => {
                        const title = row.querySelector('td.subject a')?.textContent?.trim();
                        const link = row.querySelector('td.subject a')?.href;
                        const file = row.querySelector('td.file a')?.href;
                        
                        if (title && link) {
                            results.push({
                                title: title,
                                url: link,
                                file: file || null,
                                source: '대한법률구조공단',
                                category: '법률서식'
                            });
                        }
                    });
                    return results;
                }
            """)
            
            forms.extend(items)
            
            # 다음 페이지
            try:
                next_btn = page.locator(f'a:has-text("{page_num + 1}")').first
                next_btn.click()
                page.wait_for_timeout(1000)
            except:
                break
        
        browser.close()
    
    print(f"   ✅ {len(forms)}개 수집 완료")
    return forms

def collect_scourt_forms():
    """대법원 나홀로 소송 서식 수집"""
    print("\n⚖️ [2/5] 대법원 나홀로 소송 서식 수집 중...")
    
    forms = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 민사 소장
        categories = [
            ('https://pro-se.scourt.go.kr/proto/lawsuit/civilLawsuit.jsp', '민사소장'),
            ('https://pro-se.scourt.go.kr/proto/lawsuit/divorceLawsuit.jsp', '이혼소송'),
            ('https://pro-se.scourt.go.kr/proto/lawsuit/estateLawsuit.jsp', '부동산소송')
        ]
        
        for url, category in categories:
            page.goto(url)
            page.wait_for_timeout(2000)
            
            items = page.evaluate(f"""
                () => {{
                    const results = [];
                    document.querySelectorAll('.formList a, .download a').forEach(el => {{
                        const title = el.textContent.trim();
                        const href = el.href;
                        
                        if (title && href && href.includes('.hwp') || href.includes('.doc')) {{
                            results.push({{
                                title: title,
                                url: href,
                                file: href,
                                source: '대법원',
                                category: '{category}'
                            }});
                        }}
                    }});
                    return results;
                }}
            """)
            
            forms.extend(items)
            print(f"   {category}: {len(items)}개")
        
        browser.close()
    
    print(f"   ✅ {len(forms)}개 수집 완료")
    return forms

def collect_nts_forms():
    """국세청 세무 서식 수집"""
    print("\n💰 [3/5] 국세청 세무 서식 수집 중...")
    
    forms = []
    
    # 국세청 주요 서식 URL (정적 리스트)
    known_forms = [
        {
            'title': '부가가치세 신고서',
            'url': 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2228',
            'category': '부가가치세',
            'source': '국세청'
        },
        {
            'title': '종합소득세 신고서',
            'url': 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2224',
            'category': '종합소득세',
            'source': '국세청'
        },
        {
            'title': '법인세 신고서',
            'url': 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2226',
            'category': '법인세',
            'source': '국세청'
        }
    ]
    
    forms.extend(known_forms)
    print(f"   ✅ {len(forms)}개 기본 서식 로드")
    
    return forms

def collect_moel_forms():
    """고용노동부 근로 서식 수집"""
    print("\n👔 [4/5] 고용노동부 근로 서식 수집 중...")
    
    forms = []
    
    # 고용노동부 주요 서식
    known_forms = [
        {
            'title': '표준 근로계약서',
            'url': 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20200101165',
            'category': '근로계약',
            'source': '고용노동부'
        },
        {
            'title': '기간제 근로계약서',
            'url': 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20200101166',
            'category': '근로계약',
            'source': '고용노동부'
        },
        {
            'title': '단시간 근로계약서',
            'url': 'https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20200101167',
            'category': '근로계약',
            'source': '고용노동부'
        }
    ]
    
    forms.extend(known_forms)
    print(f"   ✅ {len(forms)}개 기본 서식 로드")
    
    return forms

def collect_law_forms():
    """국가법령정보센터 별지 서식 수집"""
    print("\n📜 [5/5] 국가법령정보센터 별지 서식 수집 중...")
    
    forms = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 주요 법령의 별지 서식
        laws = ['민법', '상법', '행정절차법', '민사소송법']
        
        for law_name in laws:
            page.goto(f'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=0&ancYd=&ancNo=&efYd=&nwJoYnInfo=N&efGubun=Y&chrClsCd=010202&ancYnChk=0&lsNm={law_name}')
            page.wait_for_timeout(2000)
            
            # 별지 서식 찾기
            items = page.evaluate(f"""
                () => {{
                    const results = [];
                    document.querySelectorAll('a[href*="format"]').forEach(el => {{
                        results.push({{
                            title: el.textContent.trim(),
                            url: el.href,
                            source: '법령정보센터',
                            category: '{law_name}'
                        }});
                    }});
                    return results;
                }}
            """)
            
            forms.extend(items)
            print(f"   {law_name}: {len(items)}개")
        
        browser.close()
    
    print(f"   ✅ {len(forms)}개 수집 완료")
    return forms

def save_results(all_forms):
    """결과 저장"""
    print("\n💾 결과 저장 중...")
    
    # JSON 저장
    output_file = DATA_DIR / f'gov-forms-{datetime.now().strftime("%Y%m%d")}.json'
    
    result = {
        'collectedAt': datetime.now().isoformat(),
        'totalCount': len(all_forms),
        'sources': {
            '대한법률구조공단': len([f for f in all_forms if f['source'] == '대한법률구조공단']),
            '대법원': len([f for f in all_forms if f['source'] == '대법원']),
            '국세청': len([f for f in all_forms if f['source'] == '국세청']),
            '고용노동부': len([f for f in all_forms if f['source'] == '고용노동부']),
            '법령정보센터': len([f for f in all_forms if f['source'] == '법령정보센터'])
        },
        'forms': all_forms
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"   ✅ 저장 완료: {output_file.name}")
    print(f"\n📊 수집 결과:")
    for source, count in result['sources'].items():
        print(f"   - {source}: {count}개")
    print(f"\n총 {len(all_forms)}개 양식 수집 완료!")
    
    return output_file

def main():
    """메인 함수"""
    print("=" * 50)
    print("🏛️ 대한민국 정부 양식 자동 수집기")
    print("=" * 50)
    
    all_forms = []
    
    try:
        # 1. 대한법률구조공단
        forms = collect_klac_forms()
        all_forms.extend(forms)
    except Exception as e:
        print(f"   ❌ 오류: {e}")
    
    try:
        # 2. 대법원
        forms = collect_scourt_forms()
        all_forms.extend(forms)
    except Exception as e:
        print(f"   ❌ 오류: {e}")
    
    try:
        # 3. 국세청
        forms = collect_nts_forms()
        all_forms.extend(forms)
    except Exception as e:
        print(f"   ❌ 오류: {e}")
    
    try:
        # 4. 고용노동부
        forms = collect_moel_forms()
        all_forms.extend(forms)
    except Exception as e:
        print(f"   ❌ 오류: {e}")
    
    try:
        # 5. 법령정보센터
        forms = collect_law_forms()
        all_forms.extend(forms)
    except Exception as e:
        print(f"   ❌ 오류: {e}")
    
    # 저장
    if all_forms:
        save_results(all_forms)
    else:
        print("\n❌ 수집된 양식이 없습니다.")

if __name__ == '__main__':
    main()
