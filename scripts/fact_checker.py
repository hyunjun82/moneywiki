#!/usr/bin/env python3
"""
노동FAQ 위키 문서 검증 스크립트
- 본문 텍스트 오차 검증
- 2026년 최신 정보 기준 확인
- 내부/외부 출처 적용 확인
- wegive 스타일 준수 확인
"""

import os
import re
import sys
import json
from pathlib import Path
from datetime import datetime

# 색상 코드
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_error(msg):
    print(f"{Colors.RED}X {msg}{Colors.RESET}")

def print_warning(msg):
    print(f"{Colors.YELLOW}! {msg}{Colors.RESET}")

def print_success(msg):
    print(f"{Colors.GREEN}O {msg}{Colors.RESET}")


class WikiFactChecker:
    def __init__(self, content_dir):
        self.content_dir = Path(content_dir)
        self.errors = []
        self.warnings = []
        self.current_year = 2026

        # wegive 스타일 규칙
        self.friendly_endings = ['요', '죠', '세요', '거예요', '랍니다', '돼요', '해요', '있어요', '없어요', '이에요', '예요']
        self.formal_endings = ['입니다', '합니다', '됩니다', '있습니다', '없습니다']

        # 필수 frontmatter 필드
        self.required_fields = ['title', 'description', 'category', 'keywords', 'lastUpdated', 'summary', 'sources', 'faq', 'relatedDocs']

    def parse_frontmatter(self, content):
        """frontmatter 파싱"""
        if not content.startswith('---'):
            return None, content

        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content

        frontmatter_text = parts[1].strip()
        body = parts[2].strip()

        # 간단한 YAML 파싱
        frontmatter = {}
        current_key = None
        current_list = None

        for line in frontmatter_text.split('\n'):
            line = line.rstrip()
            if not line:
                continue

            # 리스트 항목
            if line.startswith('  - '):
                if current_list is not None:
                    current_list.append(line[4:].strip())
                continue
            elif line.startswith('    '):
                continue

            # 키-값 쌍
            if ':' in line and not line.startswith(' '):
                if current_list is not None and current_key:
                    frontmatter[current_key] = current_list
                    current_list = None

                key, _, value = line.partition(':')
                key = key.strip()
                value = value.strip().strip("'\"")

                if not value:
                    current_key = key
                    current_list = []
                else:
                    frontmatter[key] = value
                    current_key = None

        if current_list is not None and current_key:
            frontmatter[current_key] = current_list

        return frontmatter, body

    def check_frontmatter(self, frontmatter, filepath):
        """frontmatter 필수 필드 검증"""
        errors = []

        if frontmatter is None:
            errors.append(f"frontmatter가 없습니다")
            return errors

        for field in self.required_fields:
            if field not in frontmatter:
                errors.append(f"필수 필드 누락: {field}")

        # lastUpdated 날짜 확인
        if 'lastUpdated' in frontmatter:
            date_str = frontmatter['lastUpdated']
            if not date_str.startswith('2026'):
                errors.append(f"lastUpdated가 2026년이 아님: {date_str}")

        # title 키워드 개수 확인 (3-5개)
        if 'title' in frontmatter:
            title = frontmatter['title']
            words = re.split(r'[\s\-]+', title)
            words = [w for w in words if w]
            if len(words) < 3:
                errors.append(f"title 키워드 부족 ({len(words)}개): {title}")
            elif len(words) > 7:
                errors.append(f"title 키워드 과다 ({len(words)}개): {title}")

        return errors

    def check_wegive_style(self, body, filepath):
        """wegive 스타일 검증"""
        errors = []
        warnings = []

        lines = body.split('\n')

        # 1. H1 사용 금지
        for i, line in enumerate(lines):
            if line.startswith('# ') and not line.startswith('## '):
                errors.append(f"H1 사용 금지 (라인 {i+1}): {line[:50]}")

        # 2. H2에 번호 금지
        h2_pattern = re.compile(r'^## \d+\.')
        for i, line in enumerate(lines):
            if h2_pattern.match(line):
                errors.append(f"H2에 번호 사용 금지 (라인 {i+1}): {line[:50]}")

        # 3. 서론 공감 질문 확인
        first_para = ''
        for line in lines:
            if line.strip() and not line.startswith('#'):
                first_para = line
                break

        empathy_patterns = ['있으셨죠', '있으시죠', '궁금증', '고민', '경험']
        has_empathy = any(p in first_para for p in empathy_patterns)
        if not has_empathy and first_para:
            warnings.append(f"서론에 공감 질문이 없음")

        # 4. 블릿 포인트 과다 사용 체크 (관련 문서 섹션 제외)
        bullet_count = 0
        in_related_section = False

        for line in lines:
            if '## 관련 문서' in line or '## 관련문서' in line:
                in_related_section = True
            if line.startswith('## ') and '관련' not in line:
                in_related_section = False

            if not in_related_section and line.strip().startswith('- '):
                bullet_count += 1

        if bullet_count > 10:
            errors.append(f"블릿 포인트 과다 사용 ({bullet_count}개) - 문단형으로 작성 필요")
        elif bullet_count > 5:
            warnings.append(f"블릿 포인트 다소 많음 ({bullet_count}개)")

        # 5. 딱딱한 문어체 체크
        formal_count = 0
        for ending in self.formal_endings:
            formal_count += body.count(ending)

        if formal_count > 3:
            warnings.append(f"딱딱한 문어체 사용 ({formal_count}회) - 친근한 어체 권장")

        # 6. 내부 링크 형식 확인
        internal_links = re.findall(r'\[([^\]]+)\]\((/w/[^\)]+)\)', body)
        for text, link in internal_links:
            slug = link.replace('/w/', '')
            if not re.match(r'^[가-힣0-9\-]+$', slug):
                warnings.append(f"내부 링크 슬러그 형식 확인: {link}")

        return errors, warnings

    def check_content_accuracy(self, body, frontmatter, filepath):
        """내용 정확성 검증"""
        errors = []
        warnings = []

        # 1. 연도 확인 (2024, 2025 등 구버전 연도 체크)
        old_years = re.findall(r'202[0-4]년', body)
        if old_years:
            for year in set(old_years):
                warnings.append(f"구버전 연도 발견: {year} -> 2026년 확인 필요")

        # 2. 최저임금 금액 확인
        if '최저' in body and '임금' in body:
            if '9,860' in body:
                errors.append("2024년 최저임금(9,860원) 발견 -> 2026년(10,030원)으로 수정")
            if '10,030' not in body and '최저시급' in body:
                warnings.append("2026년 최저시급(10,030원) 확인 필요")

        # 3. 출처 확인
        if 'sources' in frontmatter:
            sources = frontmatter.get('sources', [])
            if not sources:
                warnings.append("출처(sources)가 비어있음")

        return errors, warnings

    def check_links(self, body, filepath):
        """링크 유효성 검증"""
        errors = []
        warnings = []

        # 내부 링크 추출
        internal_links = re.findall(r'\(/w/([^\)]+)\)', body)

        for slug in internal_links:
            expected_file = self.content_dir / 'wiki' / f"{slug}.md"
            if not expected_file.exists():
                warnings.append(f"내부 링크 파일 없음: /w/{slug}")

        # 외부 링크 확인
        external_links = re.findall(r'https?://[^\s\)]+', body)
        invalid_domains = ['example.com', 'test.com']
        for link in external_links:
            for domain in invalid_domains:
                if domain in link:
                    errors.append(f"테스트 도메인 링크: {link}")

        return errors, warnings

    def check_file(self, filepath):
        """단일 파일 검증"""
        all_errors = []
        all_warnings = []

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return [f"파일 읽기 실패: {e}"], []

        frontmatter, body = self.parse_frontmatter(content)

        # 1. frontmatter 검증
        errors = self.check_frontmatter(frontmatter, filepath)
        all_errors.extend(errors)

        # 2. wegive 스타일 검증
        errors, warnings = self.check_wegive_style(body, filepath)
        all_errors.extend(errors)
        all_warnings.extend(warnings)

        # 3. 내용 정확성 검증
        errors, warnings = self.check_content_accuracy(body, frontmatter or {}, filepath)
        all_errors.extend(errors)
        all_warnings.extend(warnings)

        # 4. 링크 검증
        errors, warnings = self.check_links(body, filepath)
        all_errors.extend(errors)
        all_warnings.extend(warnings)

        return all_errors, all_warnings

    def run(self, target_dir=None, specific_files=None):
        """검증 실행"""
        results = {
            'total_files': 0,
            'error_files': 0,
            'warning_files': 0,
            'passed_files': 0,
            'details': []
        }

        # 대상 파일 수집
        if specific_files:
            files = [Path(f) for f in specific_files]
        else:
            wiki_dir = self.content_dir / 'wiki'
            if target_dir:
                wiki_dir = Path(target_dir)
            files = list(wiki_dir.glob('*.md'))

        print(f"\n{'='*60}")
        print(f"  Wiki Fact Checker - {len(files)} files")
        print(f"{'='*60}\n")

        for filepath in sorted(files):
            results['total_files'] += 1
            errors, warnings = self.check_file(filepath)

            file_result = {
                'file': str(filepath.name),
                'errors': errors,
                'warnings': warnings,
                'status': 'pass'
            }

            if errors:
                file_result['status'] = 'error'
                results['error_files'] += 1
                print(f"\n{Colors.RED}X {filepath.name}{Colors.RESET}")
                for err in errors:
                    print(f"   {Colors.RED}  - {err}{Colors.RESET}")
            elif warnings:
                file_result['status'] = 'warning'
                results['warning_files'] += 1
                print(f"\n{Colors.YELLOW}! {filepath.name}{Colors.RESET}")
                for warn in warnings:
                    print(f"   {Colors.YELLOW}  - {warn}{Colors.RESET}")
            else:
                results['passed_files'] += 1

            if warnings and not errors:
                for warn in warnings:
                    print(f"   {Colors.YELLOW}  - {warn}{Colors.RESET}")

            results['details'].append(file_result)

        # 결과 요약
        print(f"\n{'='*60}")
        print(f"  Results Summary")
        print(f"{'='*60}")
        print(f"   Total:    {results['total_files']}")
        print(f"   {Colors.GREEN}Passed:  {results['passed_files']}{Colors.RESET}")
        print(f"   {Colors.YELLOW}Warning: {results['warning_files']}{Colors.RESET}")
        print(f"   {Colors.RED}Error:   {results['error_files']}{Colors.RESET}")
        print(f"{'='*60}\n")

        # 결과 저장
        output_file = self.content_dir.parent / 'scripts' / 'fact_check_results.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        print(f"Details saved: {output_file}\n")

        # CI/CD용 exit code
        if results['error_files'] > 0:
            print(f"{Colors.RED}[BLOCKED] Errors found. Deploy blocked.{Colors.RESET}")
            return 1
        return 0


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Wiki document quality checker')
    parser.add_argument('--dir', '-d', help='Directory to check', default=None)
    parser.add_argument('--files', '-f', nargs='+', help='Specific files to check')
    parser.add_argument('--content-dir', '-c', help='Content root directory',
                        default=r'C:\Users\user\wiki-site\content')

    args = parser.parse_args()

    checker = WikiFactChecker(args.content_dir)
    exit_code = checker.run(target_dir=args.dir, specific_files=args.files)
    sys.exit(exit_code)


if __name__ == '__main__':
    main()
