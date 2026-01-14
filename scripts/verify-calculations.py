#!/usr/bin/env python3
"""
계산 검증 스크립트 - 본문 내 모든 계산식 오차 검증
"""

import re
import json
import sys
from pathlib import Path
from typing import List, Dict, Tuple

# fact-check-db.json 로드
def load_fact_db():
    """fact-check-db.json 로드"""
    db_path = Path(__file__).parent / "fact-check-db.json"
    if not db_path.exists():
        print("⚠️  fact-check-db.json 없음 - 기본 검증만 실행")
        return {}

    with open(db_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_calculations(text: str) -> List[Tuple[str, str, str, str]]:
    """
    본문에서 계산식 추출

    패턴:
    - "10,000,000 × 0.165 = 1,650,000원"
    - "68,100원 × 120일"
    - "2,000,000원 - 500,000원 = 1,500,000원"
    """

    # 패턴 1: 곱셈 (× or x)
    multiplication = r'([\d,]+)\s*[×x]\s*([\d.]+)\s*=\s*([\d,]+)'

    # 패턴 2: 덧셈
    addition = r'([\d,]+)\s*\+\s*([\d,]+)\s*=\s*([\d,]+)'

    # 패턴 3: 뺄셈
    subtraction = r'([\d,]+)\s*[-−]\s*([\d,]+)\s*=\s*([\d,]+)'

    # 패턴 4: 나눗셈
    division = r'([\d,]+)\s*[÷/]\s*([\d,]+)\s*=\s*([\d,]+)'

    results = []

    # 곱셈
    for match in re.finditer(multiplication, text):
        num1, num2, result = match.groups()
        results.append(('*', num1, num2, result))

    # 덧셈
    for match in re.finditer(addition, text):
        num1, num2, result = match.groups()
        results.append(('+', num1, num2, result))

    # 뺄셈
    for match in re.finditer(subtraction, text):
        num1, num2, result = match.groups()
        results.append(('-', num1, num2, result))

    # 나눗셈
    for match in re.finditer(division, text):
        num1, num2, result = match.groups()
        results.append(('/', num1, num2, result))

    return results

def parse_number(s: str) -> float:
    """문자열 숫자를 float으로 변환 (쉼표 제거)"""
    return float(s.replace(',', '').replace('원', '').replace('일', '').replace('%', ''))

def verify_calculation(op: str, num1: str, num2: str, result: str) -> Dict:
    """
    계산 검증

    Returns:
        dict: {
            'valid': bool,
            'expression': str,
            'expected': float,
            'actual': float,
            'error': float
        }
    """

    n1 = parse_number(num1)
    n2 = parse_number(num2)
    actual = parse_number(result)

    # 계산
    if op == '*':
        expected = n1 * n2
    elif op == '+':
        expected = n1 + n2
    elif op == '-':
        expected = n1 - n2
    elif op == '/':
        expected = n1 / n2 if n2 != 0 else 0
    else:
        expected = actual

    # 오차 계산 (1원 이상 시 오류)
    error = abs(expected - actual)
    valid = error < 1.0

    return {
        'valid': valid,
        'expression': f"{num1} {op} {num2} = {result}",
        'expected': expected,
        'actual': actual,
        'error': error
    }

def check_markdown_file(file_path: Path) -> List[Dict]:
    """
    마크다운 파일의 계산식 검증

    Returns:
        list: 오류 목록
    """

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 계산식 추출
    calculations = extract_calculations(content)

    errors = []

    for op, num1, num2, result in calculations:
        verification = verify_calculation(op, num1, num2, result)

        if not verification['valid']:
            errors.append({
                'file': str(file_path),
                'expression': verification['expression'],
                'expected': verification['expected'],
                'actual': verification['actual'],
                'error': verification['error']
            })

    return errors

def verify_all_wiki_files() -> Dict:
    """
    모든 위키 파일 검증

    Returns:
        dict: {
            'total_files': int,
            'total_calculations': int,
            'errors': list,
            'error_count': int
        }
    """

    wiki_dir = Path(__file__).parent.parent / 'content' / 'wiki'

    if not wiki_dir.exists():
        print("❌ content/wiki 폴더 없음")
        sys.exit(1)

    md_files = list(wiki_dir.glob('*.md'))

    all_errors = []
    total_calculations = 0

    for md_file in md_files:
        try:
            # frontmatter 건너뛰기
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # frontmatter 제거 (---)
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    content = parts[2]

            # 계산식 추출 및 검증
            calculations = extract_calculations(content)
            total_calculations += len(calculations)

            for op, num1, num2, result in calculations:
                verification = verify_calculation(op, num1, num2, result)

                if not verification['valid']:
                    all_errors.append({
                        'file': md_file.name,
                        'expression': verification['expression'],
                        'expected': f"{verification['expected']:,.0f}",
                        'actual': f"{verification['actual']:,.0f}",
                        'error': f"{verification['error']:,.0f}"
                    })

        except Exception as e:
            print(f"⚠️  {md_file.name} 처리 중 오류: {e}")

    return {
        'total_files': len(md_files),
        'total_calculations': total_calculations,
        'errors': all_errors,
        'error_count': len(all_errors)
    }

def main():
    """메인 실행"""

    print("🔍 계산 검증 시작...")

    # fact-check-db 로드
    fact_db = load_fact_db()

    # 모든 위키 파일 검증
    result = verify_all_wiki_files()

    print(f"\n📊 검증 결과:")
    print(f"   - 검증 파일: {result['total_files']}개")
    print(f"   - 발견된 계산식: {result['total_calculations']}개")
    print(f"   - 오차 발견: {result['error_count']}개")

    if result['error_count'] > 0:
        print(f"\n❌ {result['error_count']}개 계산 오류 발견!\n")

        for error in result['errors']:
            print(f"📄 {error['file']}")
            print(f"   표현식: {error['expression']}")
            print(f"   기대값: {error['expected']}원")
            print(f"   실제값: {error['actual']}원")
            print(f"   오차: {error['error']}원\n")

        # 오류 결과 JSON 저장
        output_path = Path(__file__).parent / 'calculation_errors.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        print(f"💾 상세 결과: {output_path}")

        sys.exit(1)  # 빌드 중단

    print("\n✅ 모든 계산 검증 통과!")
    sys.exit(0)

if __name__ == '__main__':
    main()
