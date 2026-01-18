#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
양식 검색 + 다운로드 자동화 스크립트

방식:
1. 정부기관 사이트 직접 검색 (정부24, 법제처, 국세청 등)
2. HWP/PDF 다운로드 링크 추출
3. 자동 다운로드

사용법:
    python search-and-download-forms.py 폐업신고서
    python search-and-download-forms.py --all
    python search-and-download-forms.py --list
"""

import os
import sys
import re
import json
import time
import argparse
from pathlib import Path
from urllib.parse import urljoin, quote, unquote, urlparse

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

# 다운로드 가능한 파일 확장자
DOWNLOAD_EXTENSIONS = ['.hwp', '.pdf', '.doc', '.docx', '.xls', '.xlsx']


# ============================================================
# 알려진 다운로드 URL 매핑 (직접 확인된 URL)
# ============================================================
KNOWN_DOWNLOAD_URLS = {
    # 국세청
    "폐업신고서": "https://www.nts.go.kr/comm/ntsFileDown.do?filePath=/upload/nts/03/0301/_info_%ED%86%B5%ED%95%A9%ED%8F%90%EC%97%85%EC%8B%A0%EA%B3%A0%EC%84%9C.hwp",
    "사업자등록신청서": "https://www.nts.go.kr/comm/ntsFileDown.do?filePath=/upload/nts/03/0301/_info_%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%8B%A0%EC%B2%AD%EC%84%9C.hwp",
    "휴업신고서": "https://www.nts.go.kr/comm/ntsFileDown.do?filePath=/upload/nts/03/0301/_info_%ED%9C%B4%EC%97%85%EC%8B%A0%EA%B3%A0%EC%84%9C.hwp",

    # 강남구청 (가족관계)
    "혼인신고서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010099/download.do",
    "출생신고서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010098/download.do",
    "사망신고서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010100/download.do",
    "이혼신고서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010101/download.do",

    # 고용노동부 (7종 근로계약서)
    "표준근로계약서": "https://www.moel.go.kr/common/downloadFile.do?file_seq=20190700012&bbs_seq=20190700008&bbs_id=29&file_ext=hwp",

    # 정부24/법제처
    "전입신고서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010107/download.do",
    "주민등록등본신청서": "https://www.gangnam.go.kr/file/1/get/FILE_000000000010108/download.do",
}


# ============================================================
# 정부24 검색
# ============================================================
def search_gov24(form_name):
    """
    정부24에서 민원서식 검색
    """
    print(f"  🔍 정부24 검색: {form_name}")

    search_url = f"https://www.gov.kr/search/applyMw?query={quote(form_name)}"

    try:
        response = requests.get(search_url, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'lxml')

        results = []
        for link in soup.select('a[href*="CappBizCD"]'):
            title = link.get_text(strip=True)
            href = link.get('href', '')
            if form_name in title and href:
                results.append({
                    'title': title,
                    'url': urljoin("https://www.gov.kr", href)
                })

        return results[:5]

    except Exception as e:
        print(f"    ❌ 정부24 검색 실패: {e}")
        return []


# ============================================================
# 강남구청 검색 (민원서식 잘 정리됨)
# ============================================================
def search_gangnam(form_name):
    """
    강남구청 민원서식에서 검색
    """
    print(f"  🔍 강남구청 검색: {form_name}")

    # 민원서식 목록 페이지
    base_url = "https://www.gangnam.go.kr/board/B_000060/list.do"

    try:
        params = {'searchKeyword': form_name}
        response = requests.get(base_url, headers=HEADERS, params=params, timeout=30)
        soup = BeautifulSoup(response.text, 'lxml')

        results = []
        for link in soup.select('a[href*="view.do"]'):
            title = link.get_text(strip=True)
            href = link.get('href', '')
            if href:
                results.append({
                    'title': title,
                    'url': urljoin("https://www.gangnam.go.kr", href)
                })

        return results[:10]

    except Exception as e:
        print(f"    ❌ 강남구청 검색 실패: {e}")
        return []


# ============================================================
# 페이지에서 다운로드 링크 추출
# ============================================================
def find_download_links(url, form_name):
    """
    페이지에서 HWP/PDF 다운로드 링크 찾기
    """
    print(f"    📄 페이지 분석 중...")

    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')

        download_links = []

        # 모든 링크 검사
        for link in soup.select('a[href]'):
            href = link.get('href', '')
            text = link.get_text(strip=True)

            # 다운로드 링크 판별
            is_download = False
            file_ext = None

            # 1. 확장자로 판별
            for ext in DOWNLOAD_EXTENSIONS:
                if ext in href.lower():
                    is_download = True
                    file_ext = ext.replace('.', '')
                    break

            # 2. download 키워드로 판별
            if any(kw in href.lower() for kw in ['download', 'filedown', 'ntsfiledown', 'file/1/get']):
                is_download = True
                # 확장자 추측
                if 'hwp' in href.lower() or 'hwp' in text.lower() or '.hwp' in text.lower():
                    file_ext = 'hwp'
                elif 'pdf' in href.lower() or 'pdf' in text.lower():
                    file_ext = 'pdf'
                elif 'doc' in href.lower() or 'doc' in text.lower():
                    file_ext = 'docx'
                else:
                    file_ext = 'hwp'  # 기본값

            if is_download and file_ext:
                # 상대 URL을 절대 URL로 변환
                full_url = urljoin(url, href)

                # 관련성 점수
                relevance = 0
                if form_name in text or form_name in unquote(href):
                    relevance = 100
                elif any(kw in text for kw in ['양식', '서식', form_name[:2]]):
                    relevance = 50
                else:
                    relevance = 10

                download_links.append({
                    'url': full_url,
                    'text': text[:50] if text else '다운로드',
                    'ext': file_ext,
                    'relevance': relevance
                })

        # 관련성 높은 순으로 정렬
        download_links.sort(key=lambda x: x['relevance'], reverse=True)

        return download_links[:5]

    except Exception as e:
        print(f"    ❌ 페이지 분석 실패: {e}")
        return []


# ============================================================
# 파일 다운로드
# ============================================================
def download_file(url, save_path):
    """
    파일 다운로드
    """
    try:
        response = requests.get(url, headers=HEADERS, timeout=60, stream=True, allow_redirects=True)

        if response.status_code != 200:
            print(f"    ❌ HTTP {response.status_code}")
            return False

        # 파일 크기 체크
        content_length = response.headers.get('Content-Length', 0)
        if content_length and int(content_length) < 500:
            print(f"    ⚠️ 파일이 너무 작음 ({content_length} bytes)")
            return False

        # HTML 체크
        content_type = response.headers.get('Content-Type', '')
        if 'text/html' in content_type and 'attachment' not in response.headers.get('Content-Disposition', ''):
            # 처음 100바이트 확인
            first_bytes = response.content[:100]
            if b'<!DOCTYPE' in first_bytes or b'<html' in first_bytes:
                print(f"    ⚠️ HTML 페이지임 (파일 아님)")
                return False

        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, 'wb') as f:
            f.write(response.content)

        file_size = os.path.getsize(save_path)

        # 최종 확인: HWP 파일 시그니처 체크
        with open(save_path, 'rb') as f:
            header = f.read(8)

        # HWP 파일 시그니처: D0 CF 11 E0 (OLE compound)
        if save_path.endswith('.hwp') and not header.startswith(b'\xd0\xcf\x11\xe0'):
            print(f"    ⚠️ 유효한 HWP 파일이 아님")
            os.remove(save_path)
            return False

        print(f"    ✅ 다운로드 완료: {os.path.basename(save_path)} ({file_size:,} bytes)")
        return True

    except Exception as e:
        print(f"    ❌ 다운로드 실패: {e}")
        return False


# ============================================================
# JSON 업데이트
# ============================================================
def update_json(form_name, ext, source_url=None):
    """
    양식 JSON 파일 업데이트
    """
    json_path = DATA_DIR / f"{form_name}.json"

    if not json_path.exists():
        print(f"    ⚠️ JSON 파일 없음: {form_name}.json")
        return

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 다운로드 경로 추가
        if 'downloads' not in data or not data['downloads']:
            data['downloads'] = {}
        if 'downloadNames' not in data or not data['downloadNames']:
            data['downloadNames'] = {}

        data['downloads'][ext] = f"/files/forms/{form_name}.{ext}"
        data['downloadNames'][ext] = f"{form_name}.{ext}"

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"    📝 JSON 업데이트 완료")

    except Exception as e:
        print(f"    ❌ JSON 업데이트 실패: {e}")


# ============================================================
# 메인 처리
# ============================================================
def process_form(form_name):
    """
    양식 검색 → 다운로드 → JSON 업데이트
    """
    print(f"\n{'='*60}")
    print(f"📋 {form_name}")
    print('='*60)

    # 이미 다운로드됐는지 확인
    for ext in ['hwp', 'pdf', 'docx']:
        existing = FORMS_DIR / f"{form_name}.{ext}"
        if existing.exists() and existing.stat().st_size > 1000:
            print(f"  ✅ 이미 존재: {form_name}.{ext}")
            return True

    # 1. 알려진 URL 확인
    if form_name in KNOWN_DOWNLOAD_URLS:
        print(f"  📌 알려진 URL 사용")
        url = KNOWN_DOWNLOAD_URLS[form_name]

        # 확장자 추출
        ext = 'hwp'
        if '.pdf' in url.lower():
            ext = 'pdf'
        elif '.doc' in url.lower():
            ext = 'docx'

        save_path = str(FORMS_DIR / f"{form_name}.{ext}")

        if download_file(url, save_path):
            update_json(form_name, ext)
            return True

    # 2. 강남구청 검색
    results = search_gangnam(form_name)

    for result in results:
        if form_name in result['title'] or result['title'] in form_name:
            download_links = find_download_links(result['url'], form_name)

            for link in download_links:
                ext = link['ext']
                save_path = str(FORMS_DIR / f"{form_name}.{ext}")

                print(f"    ⬇️ 다운로드 시도: {link['text']}")

                if download_file(link['url'], save_path):
                    update_json(form_name, ext)
                    return True

    # 3. 정부24 검색
    results = search_gov24(form_name)

    for result in results:
        download_links = find_download_links(result['url'], form_name)

        for link in download_links:
            ext = link['ext']
            save_path = str(FORMS_DIR / f"{form_name}.{ext}")

            print(f"    ⬇️ 다운로드 시도: {link['text']}")

            if download_file(link['url'], save_path):
                update_json(form_name, ext)
                return True

    print(f"  ❌ 다운로드 실패")
    return False


def get_missing_forms():
    """
    다운로드 파일이 없는 양식만 가져오기
    """
    missing = []
    for json_file in DATA_DIR.glob('*.json'):
        form_name = json_file.stem
        has_file = any((FORMS_DIR / f"{form_name}.{ext}").exists()
                       for ext in ['hwp', 'pdf', 'docx', 'doc', 'xlsx', 'xls'])
        if not has_file:
            missing.append(form_name)
    return sorted(missing)


def main():
    parser = argparse.ArgumentParser(description='정부기관 양식 검색 & 다운로드')
    parser.add_argument('form_name', nargs='?', help='양식명')
    parser.add_argument('--all', '-a', action='store_true', help='미다운로드 양식 전체')
    parser.add_argument('--list', '-l', action='store_true', help='목록 확인')
    parser.add_argument('--missing', '-m', action='store_true', help='미다운로드 목록')

    args = parser.parse_args()

    FORMS_DIR.mkdir(parents=True, exist_ok=True)

    if args.list or args.missing:
        missing = get_missing_forms()
        downloaded = [f.stem for f in FORMS_DIR.glob('*.hwp')] + [f.stem for f in FORMS_DIR.glob('*.pdf')]
        print(f"\n📊 현황: 다운로드 {len(set(downloaded))}개 / 미다운로드 {len(missing)}개")
        print(f"\n⬜ 미다운로드 ({len(missing)}개):")
        for form in missing[:20]:
            print(f"   {form}")
        if len(missing) > 20:
            print(f"   ... 외 {len(missing)-20}개")
        return

    if args.all:
        missing = get_missing_forms()
        print(f"\n🚀 전체 다운로드 시작 ({len(missing)}개)")

        success = 0
        fail = 0

        for form in missing:
            if process_form(form):
                success += 1
            else:
                fail += 1
            time.sleep(1)

        print(f"\n{'='*60}")
        print(f"📊 결과: 성공 {success}개, 실패 {fail}개")
        return

    if args.form_name:
        process_form(args.form_name)
        return

    print("\n사용법:")
    print("  python search-and-download-forms.py 폐업신고서    # 특정 양식")
    print("  python search-and-download-forms.py --all        # 전체 다운로드")
    print("  python search-and-download-forms.py --missing    # 미다운로드 목록")


if __name__ == "__main__":
    main()
