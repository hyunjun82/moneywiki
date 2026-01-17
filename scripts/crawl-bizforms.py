#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
비즈폼/예스폼 양식 키워드 수집 스크립트
결과: data/form-keywords.csv
"""

import requests
from bs4 import BeautifulSoup
import csv
import time
import os
from datetime import datetime

# 결과 저장 경로
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'form-keywords.csv')

# 요청 헤더
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}

# 비즈폼 카테고리 URL 목록
BIZFORMS_CATEGORIES = [
    # 문서/서식
    ("회사서식", "https://www.bizforms.co.kr/forml/10/list_1.asp"),
    ("경리서식", "https://www.bizforms.co.kr/forml/10/200/list_1.asp"),
    ("세무회계", "https://www.bizforms.co.kr/forml/8/list_1.asp"),
    ("인사서식", "https://www.bizforms.co.kr/forml/10/218/list_1.asp"),
    ("민원행정", "https://www.bizforms.co.kr/forml/4/list_1.asp"),
    ("법률서식", "https://www.bizforms.co.kr/forml/5/list_1.asp"),
    ("교육서식", "https://www.bizforms.co.kr/forml/2/list_1.asp"),
    ("건설서식", "https://www.bizforms.co.kr/forml/1/list_1.asp"),
    ("생활서식", "https://www.bizforms.co.kr/forml/7/list_1.asp"),
    ("금융서식", "https://www.bizforms.co.kr/forml/3/list_1.asp"),
    ("영문서식", "https://www.bizforms.co.kr/forml/9/list_1.asp"),

    # 계약서
    ("계약서-건설/공사", "https://contract.bizforms.co.kr/sample/index.asp?c=148"),
    ("계약서-근로/고용", "https://contract.bizforms.co.kr/sample/index.asp?c=149"),
    ("계약서-금전거래", "https://contract.bizforms.co.kr/sample/index.asp?c=150"),
    ("계약서-물품/납품", "https://contract.bizforms.co.kr/sample/index.asp?c=151"),
    ("계약서-부동산", "https://contract.bizforms.co.kr/sample/index.asp?c=152"),
    ("계약서-사업/동업", "https://contract.bizforms.co.kr/sample/index.asp?c=153"),
    ("계약서-지식재산", "https://contract.bizforms.co.kr/sample/index.asp?c=155"),
    ("계약서-회사운영", "https://contract.bizforms.co.kr/sample/index.asp?c=156"),

    # 표준서식
    ("표준-기업일반", "https://standard.bizforms.co.kr/forml/28/list_1.asp"),
    ("표준-인사관리", "https://standard.bizforms.co.kr/forml/29st_1.asp"),
    ("표준-경리", "https://standard.bizforms.co.kr/forml/30/list_1.asp"),
    ("표준-경영", "https://standard.bizforms.co.kr/forml/31/list_1.asp"),
    ("표준-사규규정", "https://standard.bizforms.co.kr/forml/32/list_1.asp"),
    ("표준-총무", "https://standard.bizforms.co.kr/forml/34/list_1.asp"),
    ("표준-영업", "https://standard.bizforms.co.kr/forml/36/list_1.asp"),

    # 샘플서식
    ("샘플-기업일반", "https://www.bizforms.co.kr/samplel/11/list_1.asp"),
    ("샘플-기획제안", "https://www.bizforms.co.kr/samplel/13/list_1.asp"),
    ("샘플-법률", "https://www.bizforms.co.kr/samplel/14/list_1.asp"),
    ("샘플-생활가정", "https://www.bizforms.co.kr/samplel/16/list_1.asp"),
    ("샘플-계약서식", "https://www.bizforms.co.kr/samplel/27/list_1.asp"),
    ("샘플-취업서식", "https://www.bizforms.co.kr/samplel/96/list_1.asp"),

    # 부서별
    ("부서-경리부", "https://part.bizforms.co.kr/list.asp?partn=5"),
    ("부서-인사부", "https://part.bizforms.co.kr/list.asp?partn=2"),
    ("부서-총무부", "https://part.bizforms.co.kr/list.asp?partn=11"),
    ("부서-건설부", "https://part.bizforms.co.kr/list.asp?partn=1"),
    ("부서-영업부", "https://part.bizforms.co.kr/list.asp?partn=8"),
    ("부서-기획비서", "https://part.bizforms.co.kr/list.asp?partn=12"),

    # 취업서식
    ("취업-이력서", "https://resume.bizforms.co.kr/resume-form.asp"),
    ("취업-자기소개서", "https://resume.bizforms.co.kr/sector-self-introduction.asp"),
    ("취업-경력기술서", "https://resume.bizforms.co.kr/statement-of-career.asp"),
]

def get_page(url, retry=3):
    """페이지 HTML 가져오기"""
    for i in range(retry):
        try:
            response = requests.get(url, headers=HEADERS, timeout=10)
            # 인코딩 자동 감지 또는 EUC-KR 시도
            if 'charset' in response.headers.get('Content-Type', ''):
                response.encoding = response.apparent_encoding
            else:
                # EUC-KR 먼저 시도, 실패하면 UTF-8
                try:
                    response.content.decode('euc-kr')
                    response.encoding = 'euc-kr'
                except:
                    response.encoding = 'utf-8'
            return response.text
        except Exception as e:
            print(f"  재시도 {i+1}/{retry}: {e}")
            time.sleep(2)
    return None

def parse_bizforms_list(html, category):
    """비즈폼 목록 페이지에서 양식명 추출"""
    keywords = []
    soup = BeautifulSoup(html, 'html.parser')

    # 다양한 선택자 시도
    selectors = [
        'a.subject',  # 일반 목록
        'td.subject a',
        'div.subject a',
        'a[href*="form_view"]',
        'a[href*="view.asp"]',
        'li a',
        'td a',
    ]

    for selector in selectors:
        links = soup.select(selector)
        for link in links:
            text = link.get_text(strip=True)
            # 필터링: 빈 텍스트, 메뉴, 버튼 등 제외
            if text and len(text) > 2 and len(text) < 100:
                if not any(skip in text for skip in ['로그인', '회원가입', '더보기', '이전', '다음', '검색', '홈', '카테고리']):
                    keywords.append({
                        'keyword': text,
                        'category': category,
                        'source': 'bizforms'
                    })

    return keywords

def crawl_multiple_pages(base_url, category, max_pages=5):
    """여러 페이지 크롤링"""
    all_keywords = []

    for page in range(1, max_pages + 1):
        # URL 페이지 번호 변경
        if 'list_1.asp' in base_url:
            url = base_url.replace('list_1.asp', f'list_{page}.asp')
        elif 'page=' in base_url:
            url = base_url.split('page=')[0] + f'page={page}'
        else:
            url = f"{base_url}&page={page}" if '?' in base_url else f"{base_url}?page={page}"

        print(f"    페이지 {page}: {url}")
        html = get_page(url)

        if html:
            keywords = parse_bizforms_list(html, category)
            if not keywords:
                print(f"    → 더 이상 결과 없음")
                break
            all_keywords.extend(keywords)
            print(f"    → {len(keywords)}개 수집")

        time.sleep(0.5)  # 서버 부하 방지

    return all_keywords

def remove_duplicates(keywords):
    """중복 제거"""
    seen = set()
    unique = []
    for kw in keywords:
        key = kw['keyword'].lower()
        if key not in seen:
            seen.add(key)
            unique.append(kw)
    return unique

def save_to_csv(keywords, filepath):
    """CSV 파일로 저장"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    with open(filepath, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['keyword', 'category', 'source'])
        writer.writeheader()
        writer.writerows(keywords)

    print(f"\n✅ 저장 완료: {filepath}")
    print(f"   총 {len(keywords)}개 키워드")

def main():
    print("=" * 60)
    print("🔍 비즈폼 양식 키워드 수집 시작")
    print(f"   시작 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    all_keywords = []

    for category, url in BIZFORMS_CATEGORIES:
        print(f"\n📁 [{category}]")
        keywords = crawl_multiple_pages(url, category, max_pages=3)
        all_keywords.extend(keywords)
        print(f"   소계: {len(keywords)}개")

    # 중복 제거
    unique_keywords = remove_duplicates(all_keywords)
    print(f"\n📊 중복 제거: {len(all_keywords)} → {len(unique_keywords)}개")

    # 저장
    save_to_csv(unique_keywords, OUTPUT_FILE)

    print("\n" + "=" * 60)
    print(f"✅ 수집 완료!")
    print(f"   파일 위치: {os.path.abspath(OUTPUT_FILE)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
