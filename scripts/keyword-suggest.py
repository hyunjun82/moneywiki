#!/usr/bin/env python3
"""
Google + 네이버 연관검색어 추출 도구
사용법: python keyword-suggest.py "키워드" [--expand]
"""

import requests
import json
import sys
from urllib.parse import quote

def get_google_suggestions(keyword: str, lang: str = "ko") -> list:
    """Google Autocomplete API"""
    url = f"http://suggestqueries.google.com/complete/search?client=firefox&hl={lang}&q={quote(keyword)}"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        return data[1] if len(data) > 1 else []
    except:
        return []

def get_naver_suggestions(keyword: str) -> list:
    """네이버 Autocomplete API"""
    url = f"https://ac.search.naver.com/nx/ac?q={quote(keyword)}&q_enc=UTF-8&st=100&frm=nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1"
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, timeout=5, headers=headers)
        data = response.json()
        items = data.get("items", [[]])[0]
        return [item[0] for item in items if item]
    except:
        return []

def expand_keywords(base_keyword: str) -> dict:
    """키워드 확장 (a-z, ㄱ-ㅎ)"""
    results = {"google": [], "naver": []}

    # 기본
    results["google"].extend(get_google_suggestions(base_keyword))
    results["naver"].extend(get_naver_suggestions(base_keyword))

    # 알파벳 확장
    for char in "abcdefghijklmnopqrstuvwxyz":
        results["google"].extend(get_google_suggestions(f"{base_keyword} {char}"))
        results["naver"].extend(get_naver_suggestions(f"{base_keyword} {char}"))

    # 한글 자음 확장
    for char in ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]:
        results["google"].extend(get_google_suggestions(f"{base_keyword} {char}"))
        results["naver"].extend(get_naver_suggestions(f"{base_keyword} {char}"))

    # 중복 제거
    results["google"] = list(dict.fromkeys(results["google"]))
    results["naver"] = list(dict.fromkeys(results["naver"]))

    return results

def main():
    if len(sys.argv) < 2:
        print("사용법: python keyword-suggest.py '키워드' [--expand]")
        sys.exit(1)

    keyword = sys.argv[1]
    expand = "--expand" in sys.argv

    print(f"\n🔍 '{keyword}' 연관검색어 추출 중...\n")

    if expand:
        # 확장 모드
        results = expand_keywords(keyword)

        print(f"📌 Google ({len(results['google'])}개):")
        for s in results["google"][:20]:
            print(f"  - {s}")
        if len(results["google"]) > 20:
            print(f"  ... 외 {len(results['google'])-20}개")

        print(f"\n📌 네이버 ({len(results['naver'])}개):")
        for s in results["naver"][:20]:
            print(f"  - {s}")
        if len(results["naver"]) > 20:
            print(f"  ... 외 {len(results['naver'])-20}개")

        # 통합 (중복 제거)
        all_kw = list(dict.fromkeys(results["google"] + results["naver"]))
        print(f"\n📊 통합 (중복제거): {len(all_kw)}개")
    else:
        # 기본 모드
        google = get_google_suggestions(keyword)
        naver = get_naver_suggestions(keyword)

        print(f"📌 Google ({len(google)}개):")
        for s in google:
            print(f"  - {s}")

        print(f"\n📌 네이버 ({len(naver)}개):")
        for s in naver:
            print(f"  - {s}")

        # 통합
        all_kw = list(dict.fromkeys(google + naver))
        print(f"\n📊 통합 (중복제거): {len(all_kw)}개")

    print()

if __name__ == "__main__":
    main()
