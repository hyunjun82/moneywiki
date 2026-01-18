#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
정부 사이트에서 민원서식 HWP/PDF 다운로드 스크립트

대상 사이트:
1. 법제처 국가법령정보센터 (law.go.kr) - 법령 별지 서식
2. 정부24 (gov.kr) - 민원 서식
3. 국세청 (nts.go.kr) - 세금 관련 서식
4. 고용노동부 (moel.go.kr) - 근로계약서 등

사용법:
    python download-gov-forms.py                    # 전체 다운로드
    python download-gov-forms.py --form 폐업신고서   # 특정 양식만
    python download-gov-forms.py --list             # 다운 가능 목록 확인
"""

import os
import sys
import json
import time
import re
import argparse
from pathlib import Path
from urllib.parse import urljoin, quote, unquote

import requests
from bs4 import BeautifulSoup

# ============================================================
# 설정
# ============================================================
PROJECT_ROOT = Path(__file__).parent.parent
FORMS_DIR = PROJECT_ROOT / "public" / "files" / "forms"
DATA_DIR = PROJECT_ROOT / "data" / "forms"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}

# 양식별 다운로드 URL 매핑
# 형식: "양식명": {"source": "출처", "url": "다운로드URL", "type": "hwp|pdf|xls"}
FORM_SOURCES = {
    # ============ 국세청 (nts.go.kr) ============
    "폐업신고서": {
        "source": "국세청",
        "sourceUrl": "https://www.nts.go.kr",
        "search_keyword": "폐업신고서",
        "category": "민원·행정",
    },
    "사업자등록신청서": {
        "source": "국세청",
        "sourceUrl": "https://www.nts.go.kr",
        "search_keyword": "사업자등록신청서",
        "category": "민원·행정",
    },
    "휴업신고서": {
        "source": "국세청",
        "sourceUrl": "https://www.nts.go.kr",
        "search_keyword": "휴업신고서",
        "category": "민원·행정",
    },

    # ============ 법제처 (law.go.kr) ============
    "혼인신고서": {
        "source": "법제처",
        "sourceUrl": "https://www.law.go.kr",
        "law_name": "가족관계의 등록 등에 관한 규칙",
        "attachment_name": "혼인신고서",
        "category": "민원·행정",
    },
    "출생신고서": {
        "source": "법제처",
        "sourceUrl": "https://www.law.go.kr",
        "law_name": "가족관계의 등록 등에 관한 규칙",
        "attachment_name": "출생신고서",
        "category": "민원·행정",
    },
    "사망신고서": {
        "source": "법제처",
        "sourceUrl": "https://www.law.go.kr",
        "law_name": "가족관계의 등록 등에 관한 규칙",
        "attachment_name": "사망신고서",
        "category": "민원·행정",
    },
    "이혼신고서": {
        "source": "법제처",
        "sourceUrl": "https://www.law.go.kr",
        "law_name": "가족관계의 등록 등에 관한 규칙",
        "attachment_name": "이혼신고서",
        "category": "민원·행정",
    },
    "전입신고서": {
        "source": "법제처",
        "sourceUrl": "https://www.law.go.kr",
        "law_name": "주민등록법 시행규칙",
        "attachment_name": "전입신고서",
        "category": "민원·행정",
    },

    # ============ 고용노동부 (moel.go.kr) ============
    "해고예고통지서": {
        "source": "고용노동부",
        "sourceUrl": "https://www.moel.go.kr",
        "search_keyword": "해고예고통지서",
        "category": "고용·근로",
    },
    "해고통지서": {
        "source": "고용노동부",
        "sourceUrl": "https://www.moel.go.kr",
        "search_keyword": "해고통지서",
        "category": "고용·근로",
    },

    # ============ 대법원 (scourt.go.kr) ============
    "소장-민사": {
        "source": "대법원",
        "sourceUrl": "https://www.scourt.go.kr",
        "search_keyword": "소장",
        "category": "법률·소송",
    },
    "지급명령신청서": {
        "source": "대법원",
        "sourceUrl": "https://www.scourt.go.kr",
        "search_keyword": "지급명령신청서",
        "category": "법률·소송",
    },
    "항고장": {
        "source": "대법원",
        "sourceUrl": "https://www.scourt.go.kr",
        "search_keyword": "항고장",
        "category": "법률·소송",
    },
}


# ============================================================
# 법제처 크롤러
# ============================================================
def search_law_forms(law_name, attachment_name):
    """
    법제처에서 법령 별지 서식 검색 및 다운로드 URL 추출
    """
    print(f"  🔍 법제처 검색: {law_name} - {attachment_name}")

    # 1. 법령 검색
    search_url = f"https://www.law.go.kr/법령/{quote(law_name)}"

    try:
        response = requests.get(search_url, headers=HEADERS, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        # 별지 서식 링크 찾기
        # 법제처는 별지 서식을 별도 페이지로 제공
        attachment_links = soup.select('a[href*="별지"]') or soup.select('a[href*="서식"]')

        for link in attachment_links:
            if attachment_name in link.get_text():
                href = link.get('href')
                if href:
                    download_url = urljoin("https://www.law.go.kr", href)
                    return download_url

        # 직접 서식 페이지 접근 시도
        form_url = f"https://www.law.go.kr/법령서식/{quote(law_name)}"
        response = requests.get(form_url, headers=HEADERS, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        # HWP 다운로드 링크 찾기
        download_links = soup.select('a[href*=".hwp"]') or soup.select('a[href*="download"]')
        for link in download_links:
            if attachment_name in link.get_text() or attachment_name in str(link):
                return urljoin("https://www.law.go.kr", link.get('href'))

    except Exception as e:
        print(f"    ❌ 법제처 검색 실패: {e}")

    return None


# ============================================================
# 국세청 크롤러
# ============================================================
def search_nts_forms(keyword):
    """
    국세청에서 서식 검색 및 다운로드 URL 추출
    """
    print(f"  🔍 국세청 검색: {keyword}")

    # 국세청 서식 검색 페이지
    search_url = f"https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2272&cntntsId=7693"

    try:
        response = requests.get(search_url, headers=HEADERS, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        # 서식 목록에서 키워드 검색
        links = soup.select('a')
        for link in links:
            text = link.get_text(strip=True)
            if keyword in text:
                href = link.get('href')
                if href and ('.hwp' in href or 'download' in href):
                    return urljoin("https://www.nts.go.kr", href)

        # 홈택스 서식 검색 시도
        hometax_url = f"https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml"
        # 홈택스는 JavaScript 기반이라 직접 크롤링 어려움

    except Exception as e:
        print(f"    ❌ 국세청 검색 실패: {e}")

    return None


# ============================================================
# 고용노동부 크롤러
# ============================================================
def search_moel_forms(keyword):
    """
    고용노동부에서 서식 검색 및 다운로드 URL 추출
    """
    print(f"  🔍 고용노동부 검색: {keyword}")

    # 고용노동부 정책자료실
    search_url = f"https://www.moel.go.kr/policy/policydata/list.do"

    try:
        params = {
            'searchText': keyword,
            'searchKeyword': keyword,
        }
        response = requests.get(search_url, headers=HEADERS, params=params, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        # 검색 결과에서 다운로드 링크 찾기
        links = soup.select('a[href*="download"]') or soup.select('a[href*=".hwp"]')
        for link in links:
            if keyword in link.get_text() or keyword in str(link.get('title', '')):
                return urljoin("https://www.moel.go.kr", link.get('href'))

    except Exception as e:
        print(f"    ❌ 고용노동부 검색 실패: {e}")

    return None


# ============================================================
# 대법원 크롤러
# ============================================================
def search_scourt_forms(keyword):
    """
    대법원에서 소송 서식 검색 및 다운로드 URL 추출
    """
    print(f"  🔍 대법원 검색: {keyword}")

    # 대법원 전자소송 서식 페이지
    search_url = "https://ecfs.scourt.go.kr/ecf/ecf300/ECF302.jsp"

    try:
        response = requests.get(search_url, headers=HEADERS, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        # 서식 목록에서 키워드 검색
        links = soup.select('a')
        for link in links:
            text = link.get_text(strip=True)
            if keyword in text:
                href = link.get('href')
                if href:
                    return urljoin("https://ecfs.scourt.go.kr", href)

    except Exception as e:
        print(f"    ❌ 대법원 검색 실패: {e}")

    return None


# ============================================================
# 파일 다운로드
# ============================================================
def download_file(url, save_path):
    """
    URL에서 파일 다운로드
    """
    try:
        response = requests.get(url, headers=HEADERS, timeout=60, stream=True)
        response.raise_for_status()

        # Content-Disposition에서 파일명 추출
        content_disp = response.headers.get('Content-Disposition', '')
        if 'filename=' in content_disp:
            # 인코딩된 파일명 처리
            match = re.search(r'filename[*]?=(?:UTF-8\'\')?([^;\s]+)', content_disp)
            if match:
                filename = unquote(match.group(1))

        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"    ✅ 다운로드 완료: {save_path}")
        return True

    except Exception as e:
        print(f"    ❌ 다운로드 실패: {e}")
        return False


# ============================================================
# 메인 로직
# ============================================================
def find_download_url(form_name, form_info):
    """
    양식별 다운로드 URL 찾기
    """
    source = form_info.get('source', '')

    if source == "법제처":
        return search_law_forms(
            form_info.get('law_name', ''),
            form_info.get('attachment_name', form_name)
        )
    elif source == "국세청":
        return search_nts_forms(form_info.get('search_keyword', form_name))
    elif source == "고용노동부":
        return search_moel_forms(form_info.get('search_keyword', form_name))
    elif source == "대법원":
        return search_scourt_forms(form_info.get('search_keyword', form_name))

    return None


def process_form(form_name):
    """
    단일 양식 처리
    """
    if form_name not in FORM_SOURCES:
        print(f"❌ 알 수 없는 양식: {form_name}")
        print(f"   사용 가능: {', '.join(FORM_SOURCES.keys())}")
        return False

    form_info = FORM_SOURCES[form_name]
    print(f"\n📄 {form_name} 처리 중...")

    # 다운로드 URL 찾기
    download_url = find_download_url(form_name, form_info)

    if download_url:
        print(f"    🔗 다운로드 URL: {download_url}")

        # 파일 확장자 추출
        ext = 'hwp'
        if '.pdf' in download_url.lower():
            ext = 'pdf'
        elif '.doc' in download_url.lower():
            ext = 'docx'
        elif '.xls' in download_url.lower():
            ext = 'xlsx'

        save_path = FORMS_DIR / f"{form_name}.{ext}"

        if download_file(download_url, str(save_path)):
            # JSON 파일 업데이트
            update_form_json(form_name, form_info, ext)
            return True
    else:
        print(f"    ⚠️ 다운로드 URL을 찾지 못했습니다.")
        print(f"    💡 수동 다운로드 필요: {form_info.get('sourceUrl', '')}")

    return False


def update_form_json(form_name, form_info, ext):
    """
    양식 JSON 파일에 다운로드 경로 추가
    """
    json_path = DATA_DIR / f"{form_name}.json"

    if json_path.exists():
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        print(f"    ⚠️ JSON 파일 없음: {json_path}")
        return

    # 다운로드 경로 업데이트
    if 'downloads' not in data or not data['downloads']:
        data['downloads'] = {}
    if 'downloadNames' not in data or not data['downloadNames']:
        data['downloadNames'] = {}

    data['downloads'][ext] = f"/files/forms/{form_name}.{ext}"
    data['downloadNames'][ext] = f"{form_name}_{form_info['source']}.{ext}"
    data['source'] = form_info['source']
    data['sourceUrl'] = form_info['sourceUrl']

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"    📝 JSON 업데이트: {json_path}")


def list_available_forms():
    """
    다운로드 가능한 양식 목록 출력
    """
    print("\n📋 다운로드 가능한 양식 목록")
    print("=" * 60)

    by_source = {}
    for form_name, info in FORM_SOURCES.items():
        source = info['source']
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(form_name)

    for source, forms in by_source.items():
        print(f"\n🏛️ {source}")
        for form in forms:
            # 이미 다운로드된 파일 확인
            exists = any((FORMS_DIR / f"{form}.{ext}").exists() for ext in ['hwp', 'pdf', 'docx'])
            status = "✅" if exists else "⬜"
            print(f"   {status} {form}")

    print("\n" + "=" * 60)
    total = len(FORM_SOURCES)
    downloaded = sum(1 for f in FORM_SOURCES if any((FORMS_DIR / f"{f}.{e}").exists() for e in ['hwp', 'pdf', 'docx']))
    print(f"총 {total}개 중 {downloaded}개 다운로드 완료")


def main():
    parser = argparse.ArgumentParser(description='정부 사이트 양식 다운로더')
    parser.add_argument('--form', '-f', help='특정 양식만 다운로드')
    parser.add_argument('--list', '-l', action='store_true', help='다운로드 가능 목록')
    parser.add_argument('--all', '-a', action='store_true', help='전체 다운로드')

    args = parser.parse_args()

    if args.list:
        list_available_forms()
        return

    if args.form:
        process_form(args.form)
        return

    if args.all:
        print("🚀 전체 양식 다운로드 시작")
        success = 0
        fail = 0

        for form_name in FORM_SOURCES:
            if process_form(form_name):
                success += 1
            else:
                fail += 1
            time.sleep(1)  # 서버 부하 방지

        print(f"\n📊 결과: 성공 {success}개, 실패 {fail}개")
        return

    # 기본: 목록 출력
    list_available_forms()
    print("\n사용법:")
    print("  python download-gov-forms.py --list       # 목록 확인")
    print("  python download-gov-forms.py --form 폐업신고서  # 특정 양식")
    print("  python download-gov-forms.py --all        # 전체 다운로드")


if __name__ == "__main__":
    main()
