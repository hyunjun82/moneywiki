#!/usr/bin/env python3
"""
모든 .md 파일의 keywords 개수 확인
"""

import os
import re
from pathlib import Path

def count_keywords(file_path):
    """YAML frontmatter에서 keywords 개수 세기"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # frontmatter 추출
        match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
        if not match:
            return 0

        frontmatter = match.group(1)

        # keywords 섹션 찾기
        keywords_match = re.search(r'keywords:\s*\n((?:  - .*\n)*)', frontmatter)
        if not keywords_match:
            return 0

        keywords_section = keywords_match.group(1)

        # "  - " 로 시작하는 줄 개수 세기
        keywords = re.findall(r'  - .+', keywords_section)
        return len(keywords)

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0

def main():
    wiki_dir = Path('content/wiki')

    files_by_count = {}

    for md_file in wiki_dir.glob('*.md'):
        count = count_keywords(md_file)
        if count > 5:
            if count not in files_by_count:
                files_by_count[count] = []
            files_by_count[count].append(md_file.name)

    print("=" * 60)
    print("Keywords 5개 초과 파일 현황")
    print("=" * 60)

    total_files = 0
    for count in sorted(files_by_count.keys(), reverse=True):
        files = files_by_count[count]
        print(f"\n{count}개: {len(files)}개 파일")
        total_files += len(files)

        # 각 개수별로 최대 5개만 예시로 출력
        for f in files[:5]:
            print(f"  - {f}")
        if len(files) > 5:
            print(f"  ... 외 {len(files) - 5}개")

    print("\n" + "=" * 60)
    print(f"총 {total_files}개 파일이 keywords 5개 초과")
    print("=" * 60)

if __name__ == '__main__':
    main()
