"""
머니위키 팩트체커 v1
- 마크다운 텍스트에서 숫자/비율 추출
- 2026년 기준 정확한 값과 비교
- 오류 리포트 출력
"""

import re
import os
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
import json

# ============================================================
# 2026년 기준 정확한 값 데이터베이스
# ============================================================

FACTS_2026 = {
    # 실업급여
    "실업급여_일상한": {"value": 68100, "unit": "원", "keywords": ["실업급여", "상한", "최대"], "tolerance": 0},
    "실업급여_일하한": {"value": 66048, "unit": "원", "keywords": ["실업급여", "하한", "최소"], "tolerance": 0},
    "실업급여_수급일수_최대": {"value": 270, "unit": "일", "keywords": ["실업급여", "최대", "수급"], "tolerance": 0},

    # 세율
    "이자소득세": {"value": 15.4, "unit": "%", "keywords": ["이자소득세", "일반과세"], "tolerance": 0},
    "세금우대_세율": {"value": 9.5, "unit": "%", "keywords": ["세금우대"], "tolerance": 0},
    "증권거래세_2026": {"value": 0.20, "unit": "%", "keywords": ["증권거래세", "거래세"], "tolerance": 0},
    "양도소득세": {"value": 22, "unit": "%", "keywords": ["양도소득세", "양도세"], "tolerance": 0},

    # 4대보험 요율 (2026년)
    "국민연금_요율": {"value": 4.75, "unit": "%", "keywords": ["국민연금", "요율", "4.75"], "tolerance": 0},
    "국민연금_상한": {"value": 637, "unit": "만원", "keywords": ["국민연금", "상한", "637"], "tolerance": 0},
    "국민연금_상한원": {"value": 6370000, "unit": "원", "keywords": ["국민연금", "상한"], "tolerance": 0},
    "건강보험_요율": {"value": 3.595, "unit": "%", "keywords": ["건강보험", "요율", "3.595"], "tolerance": 0},
    "장기요양_요율": {"value": 13.14, "unit": "%", "keywords": ["장기요양", "요율", "13.14"], "tolerance": 0},
    "고용보험_요율": {"value": 0.9, "unit": "%", "keywords": ["고용보험", "요율", "0.9"], "tolerance": 0},

    # 최저임금 (2026년)
    "최저임금_시급": {"value": 10030, "unit": "원", "keywords": ["최저임금", "시급"], "tolerance": 0},
    "최저임금_월급": {"value": 2096270, "unit": "원", "keywords": ["최저임금", "월급", "월환산"], "tolerance": 1000},

    # 퇴직금/연금
    "퇴직소득세_세율": {"value": 16.5, "unit": "%", "keywords": ["퇴직소득세", "기타소득세"], "tolerance": 0},

    # 부동산
    "취득세_6억이하": {"value": 1, "unit": "%", "keywords": ["취득세", "6억", "1%"], "tolerance": 0},
    "취득세_9억이하": {"value": 2, "unit": "%", "keywords": ["취득세", "9억", "2%"], "tolerance": 0},
    "취득세_9억초과": {"value": 3, "unit": "%", "keywords": ["취득세", "9억초과", "3%"], "tolerance": 0},
}

# 잘못된 값 패턴 (자주 발생하는 오류)
COMMON_ERRORS = [
    {"wrong": "68,000원", "correct": "68,100원", "context": "실업급여 상한"},
    {"wrong": "66,000원", "correct": "66,048원", "context": "실업급여 하한"},
    {"wrong": "15%", "correct": "15.4%", "context": "이자소득세"},
    {"wrong": "0.15%", "correct": "0.20%", "context": "증권거래세 2026년"},
    {"wrong": "0.18%", "correct": "0.20%", "context": "증권거래세 2026년"},
    {"wrong": "4.5%", "correct": "4.75%", "context": "국민연금 요율 2026년"},
    {"wrong": "3.545%", "correct": "3.595%", "context": "건강보험 요율 2026년"},
    {"wrong": "12.95%", "correct": "13.14%", "context": "장기요양 요율 2026년"},
    {"wrong": "590만원", "correct": "637만원", "context": "국민연금 상한 2025.7~"},
    {"wrong": "553만원", "correct": "637만원", "context": "국민연금 상한 2025.7~"},
]


@dataclass
class FactError:
    file: str
    line_num: int
    context: str
    found_value: str
    correct_value: str
    error_type: str


class FactChecker:
    def __init__(self, content_dir: str):
        self.content_dir = Path(content_dir)
        self.errors: List[FactError] = []

    def extract_numbers(self, text: str) -> List[Tuple[str, float, str]]:
        """텍스트에서 숫자 추출 (값, 파싱된숫자, 단위)"""
        results = []

        # 패턴들: 숫자 + 단위
        patterns = [
            # 68,100원, 1,234원
            (r'(\d{1,3}(?:,\d{3})+)\s*원', '원'),
            # 15.4%, 0.20%
            (r'(\d+\.?\d*)\s*%', '%'),
            # 637만원, 100만원
            (r'(\d+(?:\.\d+)?)\s*만\s*원', '만원'),
            # 270일, 210일
            (r'(\d+)\s*일', '일'),
        ]

        for pattern, unit in patterns:
            for match in re.finditer(pattern, text):
                raw = match.group(1)
                try:
                    if ',' in raw:
                        num = float(raw.replace(',', ''))
                    else:
                        num = float(raw)
                    results.append((match.group(0), num, unit))
                except:
                    pass

        return results

    def check_common_errors(self, text: str, filename: str, line_num: int) -> List[FactError]:
        """자주 발생하는 오류 패턴 검사"""
        errors = []

        for err in COMMON_ERRORS:
            if err["wrong"] in text:
                # 문맥 확인
                context_start = max(0, text.find(err["wrong"]) - 30)
                context_end = min(len(text), text.find(err["wrong"]) + len(err["wrong"]) + 30)
                context = text[context_start:context_end]

                errors.append(FactError(
                    file=filename,
                    line_num=line_num,
                    context=context.strip(),
                    found_value=err["wrong"],
                    correct_value=err["correct"],
                    error_type=f"오래된 값 ({err['context']})"
                ))

        return errors

    def check_specific_facts(self, text: str, filename: str, line_num: int) -> List[FactError]:
        """특정 팩트 검증"""
        errors = []
        text_lower = text.lower()

        # 실업급여 상한액 검증
        if "실업급여" in text and ("상한" in text or "최대" in text or "1일" in text):
            # 68,100원이 아닌 다른 값이 있는지 확인
            amounts = re.findall(r'(\d{1,3}(?:,\d{3})*)\s*원', text)
            for amt in amounts:
                num = int(amt.replace(',', ''))
                if 60000 <= num <= 70000 and num != 68100:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{amt}원",
                        correct_value="68,100원",
                        error_type="실업급여 상한액 오류"
                    ))

        # 실업급여 하한액 검증
        if "실업급여" in text and ("하한" in text or "최소" in text):
            amounts = re.findall(r'(\d{1,3}(?:,\d{3})*)\s*원', text)
            for amt in amounts:
                num = int(amt.replace(',', ''))
                if 60000 <= num <= 70000 and num != 66048:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{amt}원",
                        correct_value="66,048원",
                        error_type="실업급여 하한액 오류"
                    ))

        # 이자소득세 검증
        if "이자소득세" in text or "일반과세" in text:
            rates = re.findall(r'(\d+\.?\d*)\s*%', text)
            for rate in rates:
                num = float(rate)
                if 14 <= num <= 16 and num != 15.4:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{rate}%",
                        correct_value="15.4%",
                        error_type="이자소득세율 오류"
                    ))

        # 증권거래세 검증 (2026년 기준)
        if "증권거래세" in text or "거래세" in text:
            rates = re.findall(r'(\d+\.?\d*)\s*%', text)
            for rate in rates:
                num = float(rate)
                # 0.15%, 0.18% 등은 2026년 기준 틀림
                if 0.1 <= num <= 0.25 and num != 0.20 and num != 0.2:
                    # 농특세(0.15%)는 허용
                    if "농특세" not in text:
                        errors.append(FactError(
                            file=filename,
                            line_num=line_num,
                            context=text[:100],
                            found_value=f"{rate}%",
                            correct_value="0.20%",
                            error_type="증권거래세 오류 (2026년 기준)"
                        ))

        # 국민연금 요율 검증
        if "국민연금" in text and "요율" in text:
            rates = re.findall(r'(\d+\.?\d*)\s*%', text)
            for rate in rates:
                num = float(rate)
                if 4 <= num <= 5 and num != 4.75:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{rate}%",
                        correct_value="4.75%",
                        error_type="국민연금 요율 오류 (2026년 기준)"
                    ))

        # 국민연금 상한액 검증
        if "국민연금" in text and "상한" in text:
            amounts = re.findall(r'(\d+)\s*만\s*원?', text)
            for amt in amounts:
                num = int(amt)
                if 500 <= num <= 700 and num != 637:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{amt}만원",
                        correct_value="637만원",
                        error_type="국민연금 상한액 오류 (2025.7~ 기준)"
                    ))

        # 건강보험 요율 검증
        if "건강보험" in text and "요율" in text:
            rates = re.findall(r'(\d+\.?\d*)\s*%', text)
            for rate in rates:
                num = float(rate)
                if 3 <= num <= 4 and abs(num - 3.595) > 0.01:
                    errors.append(FactError(
                        file=filename,
                        line_num=line_num,
                        context=text[:100],
                        found_value=f"{rate}%",
                        correct_value="3.595%",
                        error_type="건강보험 요율 오류"
                    ))

        return errors

    def check_file(self, filepath: Path) -> List[FactError]:
        """파일 하나 검사"""
        try:
            content = filepath.read_text(encoding='utf-8')
        except Exception as e:
            return [FactError(
                file=str(filepath.name),
                line_num=0,
                context=str(e),
                found_value="",
                correct_value="",
                error_type="파일 읽기 오류"
            )]

        errors = []
        lines = content.split('\n')

        for i, line in enumerate(lines, 1):
            # 빈 줄 스킵
            if not line.strip():
                continue

            # 자주 발생하는 오류 패턴 검사
            errors.extend(self.check_common_errors(line, filepath.name, i))

            # 특정 팩트 검증
            errors.extend(self.check_specific_facts(line, filepath.name, i))

        return errors

    def check_all(self) -> List[FactError]:
        """모든 마크다운 파일 검사"""
        wiki_dir = self.content_dir / "wiki"

        if not wiki_dir.exists():
            print(f"디렉토리 없음: {wiki_dir}")
            return []

        all_errors = []
        file_count = 0

        for md_file in wiki_dir.glob("*.md"):
            file_count += 1
            errors = self.check_file(md_file)
            all_errors.extend(errors)

        self.errors = all_errors
        print(f"검사 완료: {file_count}개 파일")
        return all_errors

    def print_report(self):
        """오류 리포트 출력"""
        if not self.errors:
            print("\n✅ 모든 파일 팩트체크 통과! 오류 없음.")
            return

        print(f"\n❌ 총 {len(self.errors)}개 오류 발견!\n")
        print("=" * 70)

        # 파일별로 그룹핑
        by_file = {}
        for err in self.errors:
            if err.file not in by_file:
                by_file[err.file] = []
            by_file[err.file].append(err)

        for filename, errs in sorted(by_file.items()):
            print(f"\n📄 {filename}")
            print("-" * 50)
            for err in errs:
                print(f"  Line {err.line_num}: {err.error_type}")
                print(f"    발견: {err.found_value}")
                print(f"    정확: {err.correct_value}")
                print(f"    문맥: ...{err.context}...")
                print()

    def export_json(self, output_path: str):
        """결과 JSON 저장"""
        data = {
            "total_errors": len(self.errors),
            "errors": [
                {
                    "file": e.file,
                    "line": e.line_num,
                    "type": e.error_type,
                    "found": e.found_value,
                    "correct": e.correct_value,
                    "context": e.context
                }
                for e in self.errors
            ]
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"결과 저장: {output_path}")


def main():
    print("🔍 머니위키 팩트체커 v1")
    print("=" * 70)
    print("2026년 기준 숫자/비율 검증 시작...\n")

    content_dir = Path(__file__).parent.parent / "content"

    checker = FactChecker(str(content_dir))
    checker.check_all()
    checker.print_report()

    output_path = Path(__file__).parent / "fact_check_result.json"
    checker.export_json(str(output_path))

    return len(checker.errors)


if __name__ == "__main__":
    import sys
    sys.exit(main())
