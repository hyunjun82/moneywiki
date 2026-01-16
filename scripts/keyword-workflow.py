#!/usr/bin/env python3
"""
머니위키 키워드 워크플로우 도구
- Google 연관검색어 추출 (기본 + 확장)
- 기존 wiki 파일 중복 체크
- 신규 키워드만 필터링

사용법:
  python keyword-workflow.py "실업급여"              # 기본 10개
  python keyword-workflow.py "실업급여" --expand     # 확장 (a-z, ㄱ-ㅎ)
  python keyword-workflow.py "실업급여" --check      # 중복 체크
  python keyword-workflow.py "실업급여" --expand --check  # 확장 + 중복 체크
"""

import requests
import os
import re
import sys
import glob
from urllib.parse import quote
from pathlib import Path

WIKI_DIR = Path(__file__).parent.parent / "content" / "wiki"

def get_google_suggestions(keyword: str, lang: str = "ko") -> list:
    """Google Autocomplete API에서 연관검색어 추출"""
    url = f"http://suggestqueries.google.com/complete/search?client=firefox&hl={lang}&q={quote(keyword)}"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        return data[1] if len(data) > 1 else []
    except Exception as e:
        return []

def expand_keywords(base_keyword: str, lang: str = "ko") -> list:
    """키워드 확장 (a-z, ㄱ-ㅎ)"""
    all_keywords = set(get_google_suggestions(base_keyword, lang))

    # 알파벳 확장
    for char in "abcdefghijklmnopqrstuvwxyz":
        suggestions = get_google_suggestions(f"{base_keyword} {char}", lang)
        all_keywords.update(suggestions)

    # 한글 자음 확장
    korean_chars = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
    for char in korean_chars:
        suggestions = get_google_suggestions(f"{base_keyword} {char}", lang)
        all_keywords.update(suggestions)

    all_keywords.discard(base_keyword)
    return sorted(all_keywords)

def get_existing_keywords() -> set:
    """기존 wiki 파일에서 모든 키워드 추출"""
    existing = set()

    for md_file in WIKI_DIR.glob("*.md"):
        try:
            content = md_file.read_text(encoding="utf-8")
            match = re.search(r"keywords:\s*\n((?:\s+-.*\n)+)", content)
            if match:
                keywords_block = match.group(1)
                for line in keywords_block.split("\n"):
                    line = line.strip()
                    if line.startswith("-"):
                        kw = line[1:].strip().strip("'\"")
                        existing.add(kw.lower())

            title_match = re.search(r"title:\s*['\"]?(.+?)['\"]?\s*\n", content)
            if title_match:
                existing.add(title_match.group(1).lower())

        except Exception as e:
            pass

    return existing

def filter_new_keywords(suggestions: list, existing: set) -> tuple:
    """신규 키워드와 중복 키워드 분리"""
    new_keywords = []
    duplicate_keywords = []

    for kw in suggestions:
        if kw.lower() in existing:
            duplicate_keywords.append(kw)
        else:
            new_keywords.append(kw)

    return new_keywords, duplicate_keywords

def main():
    if len(sys.argv) < 2:
        print("사용법: python keyword-workflow.py '키워드' [--expand] [--check]")
        print("예시:")
        print("  python keyword-workflow.py '실업급여'              # 기본 10개")
        print("  python keyword-workflow.py '실업급여' --expand     # 확장 50개+")
        print("  python keyword-workflow.py '실업급여' --check      # 중복 체크")
        print("  python keyword-workflow.py '실업급여' --expand --check  # 전체")
        sys.exit(1)

    keyword = sys.argv[1]
    expand_mode = "--expand" in sys.argv
    check_mode = "--check" in sys.argv

    print(f"\n{'='*60}")
    print(f"  키워드: {keyword}")
    print(f"  모드: {'확장' if expand_mode else '기본'} | {'중복체크' if check_mode else '전체'}")
    print(f"{'='*60}\n")

    # 1. 연관검색어 추출
    if expand_mode:
        print("Step 1: 확장 연관검색어 추출 (a-z, ㄱ-ㅎ)...")
        suggestions = expand_keywords(keyword)
    else:
        print("Step 1: 기본 연관검색어 추출...")
        suggestions = get_google_suggestions(keyword)

    print(f"   -> {len(suggestions)}개 발견\n")

    # 2. 중복 체크
    if check_mode:
        print("Step 2: 기존 wiki 파일 중복 체크...")
        existing = get_existing_keywords()
        print(f"   -> 기존 키워드 {len(existing)}개 로드\n")

        new_kw, dup_kw = filter_new_keywords(suggestions, existing)

        if dup_kw:
            print(f"[중복] {len(dup_kw)}개:")
            for kw in dup_kw[:10]:
                print(f"   x {kw}")
            if len(dup_kw) > 10:
                print(f"   ... 외 {len(dup_kw)-10}개")
            print()

        print(f"[신규] {len(new_kw)}개:")
        for kw in new_kw:
            print(f"   -> {kw}")
    else:
        print(f"[전체] {len(suggestions)}개:")
        for kw in suggestions:
            print(f"   -> {kw}")

    print(f"\n{'='*60}")
    print("완료!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
