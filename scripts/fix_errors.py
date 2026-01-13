"""
진짜 오류만 일괄 수정하는 스크립트
- False positive 제외 (교육비 15%, 퇴직소득세 등)
- 2026년 기준으로 확실한 오류만 수정
"""

import os
import re
from pathlib import Path
from typing import List, Tuple

# ============================================================
# 수정할 오류 패턴들 (확실한 것만!)
# ============================================================

FIXES = [
    # 실업급여 하한액 (66,000원은 2025년 기준, 2026년은 66,048원)
    # 단, "66,000원 → 68,100원" 같은 비교 표현은 제외
    {
        "pattern": r'(?<![→])\s*66,000원(?!\s*→)',
        "replace": "66,048원",
        "context_must_have": ["실업급여", "하한", "상한"],
        "context_must_not_have": ["→", "에서"],
        "description": "실업급여 하한액 66,000→66,048"
    },

    # 건강보험 요율 (3.545% → 3.595%)
    {
        "pattern": r'3\.545%',
        "replace": "3.595%",
        "context_must_have": ["건강보험", "요율"],
        "description": "건강보험 요율 3.545→3.595"
    },

    # 장기요양 요율 (12.95% → 13.14%)
    {
        "pattern": r'12\.95%',
        "replace": "13.14%",
        "context_must_have": ["장기요양"],
        "description": "장기요양 요율 12.95→13.14"
    },

    # 국민연금 요율 (4.5% → 4.75%)
    # 비교 표현 "4.5% → 4.75%" 제외
    {
        "pattern": r'(?<!→\s)4\.5%(?!\s*→)',
        "replace": "4.75%",
        "context_must_have": ["국민연금", "요율"],
        "context_must_not_have": ["→"],
        "description": "국민연금 요율 4.5→4.75"
    },
]

# 수정하지 않을 패턴 (False Positive)
IGNORE_CONTEXTS = [
    "교육비", "세액공제",  # 교육비 세액공제 15%는 맞음
    "퇴직소득세", "실효세율",  # 퇴직소득세 실효세율은 다름
    "원천징수", "해외주식",  # 해외주식 원천징수 15%는 맞음
    "→",  # 비교 표현
    "에서",  # "XX에서 YY로" 표현
]


def should_fix_line(line: str, fix: dict) -> bool:
    """이 줄을 수정해야 하는지 판단"""
    # 필수 키워드 확인
    if "context_must_have" in fix:
        has_keyword = any(kw in line for kw in fix["context_must_have"])
        if not has_keyword:
            return False

    # 제외 키워드 확인
    if "context_must_not_have" in fix:
        has_exclude = any(kw in line for kw in fix["context_must_not_have"])
        if has_exclude:
            return False

    return True


def fix_file(filepath: Path, dry_run: bool = True) -> List[Tuple[int, str, str]]:
    """파일 하나 수정"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        print(f"  ❌ 파일 읽기 실패: {e}")
        return []

    lines = content.split('\n')
    changes = []

    for i, line in enumerate(lines):
        original_line = line

        for fix in FIXES:
            if re.search(fix["pattern"], line):
                # 컨텍스트 확인
                # 현재 줄 + 앞뒤 2줄 컨텍스트
                context_start = max(0, i - 2)
                context_end = min(len(lines), i + 3)
                context = ' '.join(lines[context_start:context_end])

                if should_fix_line(context, fix):
                    new_line = re.sub(fix["pattern"], fix["replace"], line)
                    if new_line != line:
                        lines[i] = new_line
                        changes.append((i + 1, original_line.strip(), new_line.strip()))

    if changes and not dry_run:
        filepath.write_text('\n'.join(lines), encoding='utf-8')

    return changes


def main():
    import sys

    dry_run = "--fix" not in sys.argv

    print("🔧 머니위키 오류 일괄 수정")
    print("=" * 70)

    if dry_run:
        print("⚠️  DRY RUN 모드 (실제 수정 안함)")
        print("   실제 수정하려면: py fix_errors.py --fix")
    else:
        print("🚨 실제 수정 모드!")

    print()

    content_dir = Path(__file__).parent.parent / "content" / "wiki"
    total_changes = 0
    files_changed = 0

    for md_file in sorted(content_dir.glob("*.md")):
        changes = fix_file(md_file, dry_run=dry_run)

        if changes:
            files_changed += 1
            print(f"\n📄 {md_file.name}")
            for line_num, old, new in changes:
                print(f"  Line {line_num}:")
                print(f"    - {old[:60]}...")
                print(f"    + {new[:60]}...")
                total_changes += 1

    print("\n" + "=" * 70)
    print(f"📊 결과: {files_changed}개 파일, {total_changes}개 수정")

    if dry_run and total_changes > 0:
        print("\n💡 실제 수정하려면: py fix_errors.py --fix")

    return 0 if total_changes == 0 else 1


if __name__ == "__main__":
    main()
