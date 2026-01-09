#!/usr/bin/env python3
"""
슈퍼 롱테일 키워드 수집기 v1.0
- 네이버, 다음, 구글, 빙에서 연관검색어 수집
- 꼬리물기: 연관검색어의 연관검색어 재귀 수집
- 2024년 이전 구버전 키워드 자동 필터링
- 허브 → 스포크 → 서브스포크 → 슈퍼롱테일 구조 자동 분류

사용법:
  python collect-longtail-keywords.py 퇴직금
  python collect-longtail-keywords.py 연말정산 --depth 3
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time
import random
import sys
import os
from urllib.parse import quote
from datetime import datetime

# === 설정 ===
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# 스크립트 디렉토리
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), '.claude', 'keywords')

# === 연도 필터링 ===
def is_current_keyword(keyword):
    """2025년 미만 '철지난 키워드' 판독기"""
    # 1. 키워드에서 '20xx' 형태의 숫자(연도)를 모두 찾음
    years = re.findall(r"20(\d{2})", keyword)

    for year in years:
        full_year = int(f"20{year}")
        # 2. 발견된 연도가 2025년보다 작으면 (예: 2024, 2023...) → 탈락(False)
        if full_year < 2025:
            return False

    # 3. '24년', '23년' 같은 약어 패턴도 검사
    short_years = re.findall(r"(\d{2})년", keyword)
    for sy in short_years:
        # 10-24 사이의 숫자가 '년' 앞에 붙으면 (예: 24년 연말정산) → 탈락
        if 10 <= int(sy) <= 24:
            return False

    return True  # 연도가 없거나, 2025년 이상이면 통과


# === 키워드 관련성 필터 ===
def is_relevant_keyword(keyword, seed_keyword):
    """시드 키워드와 관련 없는 노이즈 필터링"""
    keyword_lower = keyword.lower().strip()

    # 1. 너무 짧거나 긴 키워드 제외
    if len(keyword) < 2 or len(keyword) > 50:
        return False

    # 2. UI 요소/네비게이션 제외
    ui_patterns = [
        r"^열기$", r"^닫기$", r"^더보기$", r"^도움말$", r"^검색$",
        r"검색어.*기능", r"기능 닫기", r"기능 열기",
        r"^신고$", r"^공유$", r"^저장$", r"^설정$",
        r"html.*열기", r"파일.*열기"
    ]
    for pattern in ui_patterns:
        if re.search(pattern, keyword, re.IGNORECASE):
            return False

    # 3. 깨진 문자/특수문자 제외
    if re.search(r"[鹹赽鎗跺湮齪秷夔鎮肭楷珋岆樑億]", keyword):
        return False
    if re.search(r"[\u4e00-\u9fff]{5,}", keyword):  # 연속 한자 5개 이상
        return False

    # 4. 명확히 무관한 주제 패턴
    noise_patterns = [
        r"게임", r"영화", r"드라마", r"노래", r"음악",
        r"요리", r"레시피", r"맛집", r"여행",
        r"축구", r"야구", r"농구", r"스포츠",
        r"가연성", r"누출사고", r"가스.*누출",
        r"kijul", r"개걸스럽다"
    ]

    for pattern in noise_patterns:
        if re.search(pattern, keyword, re.IGNORECASE) and not re.search(pattern, seed_keyword, re.IGNORECASE):
            return False

    # 5. 시드 키워드와 전혀 관련 없는지 체크 (한글 기준)
    # 시드의 핵심 단어가 키워드에 포함되어야 함
    seed_core = re.sub(r'[^\w가-힣]', '', seed_keyword)
    if len(seed_core) >= 2:
        # 시드 키워드의 첫 글자라도 포함되어 있는지
        if seed_core[0] not in keyword and seed_keyword not in keyword:
            # 완전히 무관해 보이면 추가 검사
            related_terms = get_related_terms(seed_keyword)
            if not any(term in keyword for term in related_terms):
                return False

    return True


def get_related_terms(seed_keyword):
    """시드 키워드와 관련된 용어 목록"""
    # 시드별 관련 용어 매핑
    related_map = {
        "퇴직금": ["퇴직", "퇴사", "이직", "근로", "급여", "임금", "고용", "노동", "연금", "IRP", "DC", "DB"],
        "연말정산": ["소득", "공제", "세금", "세액", "연봉", "급여", "원천징수"],
        "실업급여": ["고용보험", "실업", "구직", "이직", "퇴사"],
    }

    # 기본 관련 용어
    base_terms = seed_keyword.split() + [seed_keyword]

    # 매핑된 관련 용어 추가
    for key, terms in related_map.items():
        if key in seed_keyword:
            base_terms.extend(terms)

    return base_terms


# === 네이버 수집 ===
def get_naver(keyword):
    """네이버 연관검색어 + 자동완성 수집"""
    results = set()
    try:
        # 연관검색어
        url = f"https://search.naver.com/search.naver?where=nexearch&query={quote(keyword)}"
        res = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(res.text, 'html.parser')

        # 연관검색어 셀렉터들 (2025년 업데이트)
        selectors = [
            ".lst_related_srch .tit",
            "._related_srch .tit",
            ".api_txt_lines",
            ".related_srch .tit",
            "[class*='related'] a",
            ".keyword_list a",
            ".relate_srch a"
        ]
        for selector in selectors:
            items = soup.select(selector)
            for item in items:
                txt = item.get_text().strip()
                if txt and is_current_keyword(txt):
                    results.add(txt)

        # 자동완성 API (여러 엔드포인트 시도)
        ac_urls = [
            f"https://ac.search.naver.com/nx/ac?q={quote(keyword)}&con=1&r_format=json&st=100",
            f"https://mac.search.naver.com/mobile/ac?q={quote(keyword)}&st=100&r_format=json",
        ]

        for url_ac in ac_urls:
            try:
                res = requests.get(url_ac, headers=headers, timeout=5)
                if res.text.strip():
                    data = json.loads(res.text)
                    items_data = data.get('items', []) or data.get('suggestions', [])
                    for group in items_data:
                        if isinstance(group, list):
                            for item in group:
                                if isinstance(item, list) and item:
                                    txt = item[0] if isinstance(item[0], str) else str(item[0])
                                    if txt and is_current_keyword(txt):
                                        results.add(txt)
                                elif isinstance(item, str) and is_current_keyword(item):
                                    results.add(item)
                        elif isinstance(group, str) and is_current_keyword(group):
                            results.add(group)
                    break  # 성공하면 루프 종료
            except:
                continue

    except Exception as e:
        print(f"  [네이버 오류] {e}")

    return results


# === 다음 수집 ===
def get_daum(keyword):
    """다음 연관검색어 수집"""
    results = set()
    try:
        url = f"https://search.daum.net/search?w=tot&q={quote(keyword)}"
        res = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(res.text, 'html.parser')

        # 연관검색어 셀렉터들 (2025년 업데이트)
        selectors = [
            ".link_relate",
            ".txt_relate",
            ".relate_keyword a",
            ".suggest_keyword a",
            "[class*='relate'] a",
            ".c-relate-keyword a",
            ".keyword-list a"
        ]

        for selector in selectors:
            items = soup.select(selector)
            for item in items:
                txt = item.get_text().strip()
                if txt and is_current_keyword(txt):
                    results.add(txt)

        # 다음 자동완성 API 시도
        try:
            ac_url = f"https://suggest.search.daum.net/sushi/ac/get?q={quote(keyword)}"
            res_ac = requests.get(ac_url, headers=headers, timeout=5)
            if res_ac.text.strip():
                data = json.loads(res_ac.text)
                suggestions = data.get('items', []) or data.get('results', [])
                for item in suggestions:
                    if isinstance(item, dict):
                        txt = item.get('keyword', '') or item.get('text', '')
                    else:
                        txt = str(item)
                    if txt and is_current_keyword(txt):
                        results.add(txt)
        except:
            pass

    except Exception as e:
        print(f"  [다음 오류] {e}")

    return results


# === 구글 수집 ===
def get_google(keyword):
    """구글 자동완성 수집"""
    results = set()
    try:
        # 구글 자동완성 API
        url = f"https://suggestqueries.google.com/complete/search?client=firefox&q={quote(keyword)}"
        res = requests.get(url, headers=headers, timeout=5)
        data = json.loads(res.text)

        if len(data) > 1 and isinstance(data[1], list):
            for item in data[1]:
                if item and is_current_keyword(item):
                    results.add(item)
    except Exception as e:
        print(f"  [구글 오류] {e}")

    return results


# === 빙 수집 ===
def get_bing(keyword):
    """빙 자동완성 수집"""
    results = set()
    try:
        url = f"https://api.bing.com/osjson.aspx?query={quote(keyword)}"
        res = requests.get(url, headers=headers, timeout=5)
        data = json.loads(res.text)

        if len(data) > 1 and isinstance(data[1], list):
            for item in data[1]:
                if item and is_current_keyword(item):
                    results.add(item)
    except Exception as e:
        print(f"  [빙 오류] {e}")

    return results


# === 전역 시드 키워드 (노이즈 필터용) ===
SEED_KEYWORD = ""


# === 4대 포털 통합 수집 ===
def collect_all_portals(keyword):
    """4대 포털에서 키워드 수집"""
    global SEED_KEYWORD
    all_results = set()

    print(f"  📍 '{keyword}' 수집 중...")

    # 네이버
    naver = get_naver(keyword)
    all_results.update(naver)
    print(f"    - 네이버: {len(naver)}개")

    time.sleep(random.uniform(0.2, 0.5))

    # 다음
    daum = get_daum(keyword)
    all_results.update(daum)
    print(f"    - 다음: {len(daum)}개")

    time.sleep(random.uniform(0.2, 0.5))

    # 구글
    google = get_google(keyword)
    all_results.update(google)
    print(f"    - 구글: {len(google)}개")

    time.sleep(random.uniform(0.2, 0.5))

    # 빙
    bing = get_bing(keyword)
    all_results.update(bing)
    print(f"    - 빙: {len(bing)}개")

    # 노이즈 필터링 (시드 키워드와 무관한 키워드 제거)
    if SEED_KEYWORD:
        filtered = {kw for kw in all_results if is_relevant_keyword(kw, SEED_KEYWORD)}
        removed = len(all_results) - len(filtered)
        if removed > 0:
            print(f"    - 노이즈 제거: {removed}개")
        return filtered

    return all_results


# === 꼬리물기 (재귀 확장) ===
def collect_with_tail_biting(seed_keyword, max_depth=2, max_expand=15):
    """
    꼬리물기: 연관검색어의 연관검색어를 재귀적으로 수집

    Args:
        seed_keyword: 시작 키워드 (허브)
        max_depth: 최대 확장 깊이 (1=스포크, 2=서브스포크, 3=슈퍼롱테일)
        max_expand: 각 레벨에서 확장할 최대 키워드 수
    """
    global SEED_KEYWORD
    SEED_KEYWORD = seed_keyword  # 노이즈 필터용 시드 설정
    all_keywords = {seed_keyword}  # 중복 방지용 전체 집합
    level_keywords = {0: {seed_keyword}}  # 레벨별 키워드

    print(f"\n🔥 [1단계] '{seed_keyword}' 1차 수집 중...")

    # 1단계: 시드 키워드에서 수집
    level1 = collect_all_portals(seed_keyword)
    level1 = level1 - all_keywords  # 중복 제거
    all_keywords.update(level1)
    level_keywords[1] = level1

    print(f"\n✅ 1차 수집: {len(level1)}개")

    # 2단계 이상: 꼬리물기
    for depth in range(2, max_depth + 1):
        print(f"\n🐍 [{depth}단계] 롱테일 확장 중 (깊이 {depth})...")

        # 이전 레벨에서 상위 키워드만 확장
        prev_level = list(level_keywords.get(depth - 1, set()))[:max_expand]
        current_level = set()

        for i, kw in enumerate(prev_level):
            print(f"  [{i+1}/{len(prev_level)}] 확장: '{kw}'")
            new_keywords = collect_all_portals(kw)
            new_keywords = new_keywords - all_keywords  # 중복 제거
            current_level.update(new_keywords)
            all_keywords.update(new_keywords)
            time.sleep(random.uniform(0.3, 0.7))

        level_keywords[depth] = current_level
        print(f"\n✅ {depth}차 수집: {len(current_level)}개 (신규)")

    return all_keywords, level_keywords


# === 허브-스포크 구조 분류 ===
def classify_structure(seed_keyword, level_keywords):
    """
    허브 → 스포크 → 서브스포크 → 슈퍼롱테일 구조 자동 분류
    """
    structure = {
        "허브": seed_keyword,
        "스포크": [],        # 1단계 (메인 연관)
        "서브스포크": [],    # 2단계 (세부 연관)
        "슈퍼롱테일": []     # 3단계+ (초롱테일)
    }

    # 1단계 = 스포크
    if 1 in level_keywords:
        structure["스포크"] = sorted(list(level_keywords[1]))

    # 2단계 = 서브스포크
    if 2 in level_keywords:
        structure["서브스포크"] = sorted(list(level_keywords[2]))

    # 3단계+ = 슈퍼롱테일
    super_longtail = set()
    for depth in range(3, max(level_keywords.keys()) + 1):
        if depth in level_keywords:
            super_longtail.update(level_keywords[depth])
    structure["슈퍼롱테일"] = sorted(list(super_longtail))

    return structure


# === 파일 슬러그 변환 ===
def to_slug(keyword):
    """키워드를 파일명용 슬러그로 변환"""
    # 공백 → 하이픈
    slug = keyword.replace(" ", "-")
    # 특수문자 제거
    slug = re.sub(r'[^\w가-힣-]', '', slug)
    return slug


# === 결과 저장 ===
def save_results(seed_keyword, all_keywords, structure):
    """결과를 JSON 파일로 저장"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    slug = to_slug(seed_keyword)
    output_path = os.path.join(OUTPUT_DIR, f"{slug}.json")

    result = {
        "허브": seed_keyword,
        "수집일": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "총_키워드수": len(all_keywords),
        "구조": {
            "허브": structure["허브"],
            "스포크_개수": len(structure["스포크"]),
            "서브스포크_개수": len(structure["서브스포크"]),
            "슈퍼롱테일_개수": len(structure["슈퍼롱테일"])
        },
        "글작성_우선순위": {
            "1단계_스포크": structure["스포크"][:20],
            "2단계_서브스포크": structure["서브스포크"][:30],
            "3단계_슈퍼롱테일": structure["슈퍼롱테일"][:50]
        },
        "전체_키워드": sorted(list(all_keywords))
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n💾 저장 완료: {output_path}")
    return output_path


# === 메인 실행 ===
def main():
    if len(sys.argv) < 2:
        print("사용법: python collect-longtail-keywords.py <키워드> [--depth N]")
        print("예시: python collect-longtail-keywords.py 퇴직금")
        print("      python collect-longtail-keywords.py 연말정산 --depth 3")
        sys.exit(1)

    seed_keyword = sys.argv[1]

    # 깊이 옵션 파싱
    max_depth = 2  # 기본값
    if "--depth" in sys.argv:
        idx = sys.argv.index("--depth")
        if idx + 1 < len(sys.argv):
            max_depth = int(sys.argv[idx + 1])

    print("=" * 60)
    print(f"🚀 슈퍼 롱테일 키워드 수집기 v1.0")
    print(f"📌 시드 키워드: {seed_keyword}")
    print(f"📊 확장 깊이: {max_depth}")
    print("=" * 60)

    # 키워드 수집
    all_keywords, level_keywords = collect_with_tail_biting(
        seed_keyword,
        max_depth=max_depth
    )

    # 구조 분류
    structure = classify_structure(seed_keyword, level_keywords)

    # 결과 출력
    print("\n" + "=" * 60)
    print(f"👑 최종 결과")
    print(f"🎯 검색어: {seed_keyword}")
    print(f"📊 총 개수: {len(all_keywords)}개")
    print("=" * 60)

    print(f"\n📁 구조 분석:")
    print(f"  - 허브: {structure['허브']}")
    print(f"  - 스포크: {len(structure['스포크'])}개")
    print(f"  - 서브스포크: {len(structure['서브스포크'])}개")
    print(f"  - 슈퍼롱테일: {len(structure['슈퍼롱테일'])}개")

    print(f"\n🔝 스포크 TOP 10:")
    for i, kw in enumerate(structure['스포크'][:10], 1):
        print(f"  {i}. {kw}")

    print(f"\n🔝 서브스포크 TOP 10:")
    for i, kw in enumerate(structure['서브스포크'][:10], 1):
        print(f"  {i}. {kw}")

    print(f"\n🔝 슈퍼롱테일 TOP 10:")
    for i, kw in enumerate(structure['슈퍼롱테일'][:10], 1):
        print(f"  {i}. {kw}")

    # 저장
    output_path = save_results(seed_keyword, all_keywords, structure)

    print(f"\n✨ 완료! {output_path}에서 전체 키워드 확인하세요.")


if __name__ == "__main__":
    main()
