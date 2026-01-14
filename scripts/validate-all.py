#!/usr/bin/env python3
"""
머니위키 콘텐츠 검증 스크립트
- 2026년 기준 금액/세율 검증
- 계산식 오류 검증
- 금지 패턴 검증
"""

import json
import re
from pathlib import Path

# 색상 코드
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RESET = '\033[0m'

def load_fact_db():
    """fact-check-db.json 로드"""
    db_path = Path(__file__).parent / 'fact-check-db.json'
    with open(db_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def check_forbidden_values(content, forbidden_values):
    """금지된 값 검증"""
    errors = []
    for forbidden, correct in forbidden_values.items():
        # 15%, 12% 같은 잘못된 세율 찾기
        if '퍼센트' in forbidden or '%' in forbidden:
            pattern = forbidden.replace('퍼센트', '%').replace('세액공제_', '').replace('_', ' ')
            if pattern in content:
                errors.append(f"❌ 잘못된 세율: {forbidden} → {correct}")

        # 10,030원 같은 잘못된 최저임금 찾기
        elif '원' in forbidden:
            if forbidden.replace('최저임금_', '').replace('_', ',') in content:
                errors.append(f"❌ 잘못된 금액: {forbidden} → {correct}")

        # 7일, 5년 같은 잘못된 기한 찾기
        elif '일' in forbidden or '년' in forbidden:
            pattern = forbidden.replace('퇴직금_', '').replace('청구권_', '').replace('_', '')
            if pattern in content:
                errors.append(f"❌ 잘못된 기한: {forbidden} → {correct}")

    return errors

def check_calculations(content, categories):
    """계산식 검증"""
    errors = []

    # 실업급여 상한액 검증
    if '68,100' in content or '68100' in content:
        if categories['unemployment']['실업급여_상한액_일'] != 68100:
            errors.append(f"⚠️ 실업급여 상한액 확인 필요: 68,100원")

    # 세액공제율 검증
    if '16.5%' in content or '0.165' in content:
        if categories['tax']['세액공제_5500만원이하'] != 16.5:
            errors.append(f"⚠️ 세액공제 16.5% 확인 필요")

    if '13.2%' in content or '0.132' in content:
        if categories['tax']['세액공제_5500만원초과'] != 13.2:
            errors.append(f"⚠️ 세액공제 13.2% 확인 필요")

    # 최저임금 검증
    if '10,320' in content or '10320' in content:
        if categories['wage']['최저임금_시급'] != 10320:
            errors.append(f"⚠️ 최저임금 10,320원 확인 필요")

    return errors

def check_forbidden_patterns(content):
    """금지 패턴 검증"""
    errors = []

    # 본문에 FAQ 섹션 있는지
    if re.search(r'^##\s*자주\s*묻는\s*질문', content, re.MULTILINE):
        errors.append(f"❌ 본문에 FAQ 섹션 금지 (frontmatter만 사용)")

    # 헤딩에 숫자 있는지
    headings_with_numbers = re.findall(r'^##\s+\d+\.', content, re.MULTILINE)
    if headings_with_numbers:
        errors.append(f"❌ 헤딩에 숫자 금지: {headings_with_numbers}")

    # description에 "알아봅니다" 있는지
    if re.search(r'description:.*알아봅니다', content):
        errors.append(f"❌ description에 '알아봅니다' 금지")

    # 이모지 사용
    emoji_pattern = r'[\U0001F300-\U0001F9FF]'
    if re.search(emoji_pattern, content):
        errors.append(f"⚠️ 이모지 사용 확인 필요")

    return errors

def validate_file(filepath, db):
    """파일 검증"""
    content = filepath.read_text(encoding='utf-8')
    errors = []

    # 1. 금지된 값 검증
    errors.extend(check_forbidden_values(content, db['forbidden_values']))

    # 2. 계산 검증
    errors.extend(check_calculations(content, db['categories']))

    # 3. 금지 패턴 검증
    errors.extend(check_forbidden_patterns(content))

    return errors

def main():
    print(f"\n{YELLOW}=== 머니위키 콘텐츠 검증 시작 ==={RESET}\n")

    # DB 로드
    db = load_fact_db()
    print(f"✓ fact-check-db.json 로드 완료 (버전: {db['version']})")

    # 파일 검증
    wiki_dir = Path('content/wiki')
    files = list(wiki_dir.glob('*.md'))
    print(f"✓ 검증 대상: {len(files)}개 파일\n")

    total_errors = 0
    error_files = []

    for filepath in files:
        errors = validate_file(filepath, db)
        if errors:
            total_errors += len(errors)
            error_files.append((filepath.name, errors))

    # 결과 출력
    if total_errors == 0:
        print(f"{GREEN}✅ 검증 통과! 오류 없음{RESET}\n")
        return 0
    else:
        print(f"{RED}❌ 검증 실패: {total_errors}개 오류 발견{RESET}\n")

        for filename, errors in error_files[:10]:  # 최대 10개 파일만 표시
            print(f"{RED}파일: {filename}{RESET}")
            for error in errors:
                print(f"  {error}")
            print()

        if len(error_files) > 10:
            print(f"... 외 {len(error_files) - 10}개 파일\n")

        return 1

if __name__ == '__main__':
    exit(main())
