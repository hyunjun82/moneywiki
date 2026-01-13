#!/usr/bin/env python3
"""
위키 문서 오류 자동 수정 스크립트
fact_checker.py 결과를 기반으로 자동 수정
"""

import os
import re
import sys
import json
from pathlib import Path

class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'


class WikiFixer:
    def __init__(self, content_dir):
        self.content_dir = Path(content_dir)
        self.fixed_count = 0

    def fix_h1_to_h2(self, content):
        """H1을 H2로 변경 (frontmatter 이후)"""
        lines = content.split('\n')
        fixed = False
        in_frontmatter = False
        frontmatter_count = 0

        for i, line in enumerate(lines):
            if line.strip() == '---':
                frontmatter_count += 1
                if frontmatter_count == 2:
                    in_frontmatter = False
                continue

            if frontmatter_count < 2:
                continue

            if line.startswith('# ') and not line.startswith('## '):
                lines[i] = '#' + line  # # -> ##
                fixed = True

        return '\n'.join(lines), fixed

    def fix_h2_numbers(self, content):
        """H2에서 번호 제거"""
        pattern = r'^(## )\d+\.\s*'
        new_content, count = re.subn(pattern, r'\1', content, flags=re.MULTILINE)
        return new_content, count > 0

    def fix_old_years(self, content):
        """구버전 연도를 2026년으로 수정 (주의: 특정 컨텍스트만)"""
        # 법 개정 연도 등은 수정하면 안 됨, 여기서는 경고만
        return content, False

    def fix_minimum_wage(self, content):
        """최저임금 금액 수정"""
        # 2024년 -> 2026년
        old_wages = {
            '9,860원': '10,030원',
            '9860원': '10,030원',
        }

        fixed = False
        for old, new in old_wages.items():
            if old in content:
                content = content.replace(old, new)
                fixed = True

        return content, fixed

    def fix_formal_endings(self, content):
        """딱딱한 문어체를 친근한 어체로 변경"""
        # 이건 자동 수정이 위험해서 건너뜀
        return content, False

    def fix_file(self, filepath, dry_run=False):
        """단일 파일 수정"""
        fixes_applied = []

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                original_content = f.read()
        except Exception as e:
            print(f"{Colors.RED}X 파일 읽기 실패: {filepath} - {e}{Colors.RESET}")
            return []

        content = original_content

        # 1. H1 -> H2 수정
        content, fixed = self.fix_h1_to_h2(content)
        if fixed:
            fixes_applied.append("H1 -> H2 변경")

        # 2. H2 번호 제거
        content, fixed = self.fix_h2_numbers(content)
        if fixed:
            fixes_applied.append("H2 번호 제거")

        # 3. 최저임금 수정
        content, fixed = self.fix_minimum_wage(content)
        if fixed:
            fixes_applied.append("최저임금 금액 수정")

        # 변경 사항이 있으면 저장
        if fixes_applied and content != original_content:
            if dry_run:
                print(f"{Colors.YELLOW}[DRY-RUN] {filepath.name}:{Colors.RESET}")
                for fix in fixes_applied:
                    print(f"   - {fix}")
            else:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"{Colors.GREEN}O {filepath.name}: {', '.join(fixes_applied)}{Colors.RESET}")
                self.fixed_count += 1

        return fixes_applied

    def run(self, target_dir=None, specific_files=None, dry_run=False, fix=False):
        """수정 실행"""
        if not fix and not dry_run:
            print(f"{Colors.YELLOW}! --fix 또는 --dry-run 옵션을 사용하세요.{Colors.RESET}")
            print("   --fix     : 실제로 파일을 수정")
            print("   --dry-run : 수정 내용만 미리보기")
            return 0

        # 대상 파일 수집
        if specific_files:
            files = [Path(f) for f in specific_files]
        else:
            wiki_dir = self.content_dir / 'wiki'
            if target_dir:
                wiki_dir = Path(target_dir)
            files = list(wiki_dir.glob('*.md'))

        mode = "DRY-RUN" if dry_run else "FIX"
        print(f"\n{'='*60}")
        print(f"  Wiki Error Fixer [{mode}] - {len(files)} files")
        print(f"{'='*60}\n")

        total_fixes = 0
        for filepath in sorted(files):
            fixes = self.fix_file(filepath, dry_run=dry_run)
            total_fixes += len(fixes)

        print(f"\n{'='*60}")
        print(f"  Results")
        print(f"{'='*60}")
        print(f"   Files processed: {len(files)}")
        print(f"   {Colors.GREEN}Files fixed: {self.fixed_count}{Colors.RESET}")
        print(f"   Total fixes: {total_fixes}")
        print(f"{'='*60}\n")

        return 0


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Wiki document error fixer')
    parser.add_argument('--dir', '-d', help='Directory to fix', default=None)
    parser.add_argument('--files', '-f', nargs='+', help='Specific files to fix')
    parser.add_argument('--content-dir', '-c', help='Content root directory',
                        default=r'C:\Users\user\wiki-site\content')
    parser.add_argument('--fix', action='store_true', help='Actually fix files')
    parser.add_argument('--dry-run', action='store_true', help='Preview fixes without applying')

    args = parser.parse_args()

    fixer = WikiFixer(args.content_dir)
    exit_code = fixer.run(
        target_dir=args.dir,
        specific_files=args.files,
        dry_run=args.dry_run,
        fix=args.fix
    )
    sys.exit(exit_code)


if __name__ == '__main__':
    main()
