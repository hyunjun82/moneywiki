#!/usr/bin/env python3
"""
Google 연관검색어 추출 도구
사용법: python keyword-suggest.py "실업급여"
"""

import requests
import json
import sys
from urllib.parse import quote

def get_google_suggestions(keyword: str, lang: str = "ko") -> list:
    """Google Autocomplete API에서 연관검색어 추출"""
    url = f"http://suggestqueries.google.com/complete/search?client=firefox&hl={lang}&q={quote(keyword)}"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        return data[1] if len(data) > 1 else []
    except Exception as e:
        print(f"Error: {e}")
        return []

def expand_keywords(base_keyword: str, lang: str = "ko") -> dict:
    """키워드 확장 (a-z, ㄱ-ㅎ 추가)"""
    results = {
        "base": get_google_suggestions(base_keyword, lang),
        "expanded": {}
    }

    # 알파벳 확장
    for char in "abcdefghijklmnopqrstuvwxyz":
        suggestions = get_google_suggestions(f"{base_keyword} {char}", lang)
        if suggestions:
            results["expanded"][char] = suggestions

    # 한글 자음 확장
    korean_chars = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
    for char in korean_chars:
        suggestions = get_google_suggestions(f"{base_keyword} {char}", lang)
        if suggestions:
            results["expanded"][char] = suggestions

    return results

def get_all_unique_keywords(keyword: str) -> list:
    """모든 고유 키워드 추출 (중복 제거)"""
    results = expand_keywords(keyword)

    all_keywords = set(results["base"])
    for suggestions in results["expanded"].values():
        all_keywords.update(suggestions)

    # 원본 키워드 제거하고 정렬
    all_keywords.discard(keyword)
    return sorted(all_keywords)

def main():
    if len(sys.argv) < 2:
        print("사용법: python keyword-suggest.py '키워드'")
        print("예시: python keyword-suggest.py '실업급여'")
        sys.exit(1)

    keyword = sys.argv[1]
    print(f"\n🔍 '{keyword}' 연관검색어 추출 중...\n")

    # 기본 연관검색어
    base_suggestions = get_google_suggestions(keyword)
    print(f"📌 기본 연관검색어 ({len(base_suggestions)}개):")
    for s in base_suggestions:
        print(f"  - {s}")

    # 전체 확장 (선택사항)
    if len(sys.argv) > 2 and sys.argv[2] == "--expand":
        print(f"\n📌 전체 확장 키워드:")
        all_keywords = get_all_unique_keywords(keyword)
        print(f"총 {len(all_keywords)}개 발견:")
        for kw in all_keywords:
            print(f"  - {kw}")

    print()

if __name__ == "__main__":
    main()
