"""
계산기 오차 검증 스크립트
- 마크다운 파일에서 계산 예시 추출
- 계산기 로직으로 재검증
- 오차 리포트 출력
"""

import re
import os
import json
from pathlib import Path
from dataclasses import dataclass
from typing import Optional, List, Dict, Any

# ============================================================
# 계산기 로직 (TSX 컴포넌트와 동일)
# ============================================================

class SavingsCalculator:
    """적금 계산기"""
    TAX_RATES = {
        "general": 0.154,      # 일반과세 15.4%
        "taxPreferred": 0.095, # 세금우대 9.5%
        "taxFree": 0.0         # 비과세 0%
    }

    @staticmethod
    def calculate(monthly: int, rate: float, period: int, tax_type: str = "general"):
        """
        monthly: 월 납입금
        rate: 연 이자율 (예: 4 = 4%)
        period: 개월 수
        tax_type: general, taxPreferred, taxFree
        """
        monthly_rate = rate / 100 / 12
        interest = 0

        # 매월 납입금에 대한 이자 계산
        for i in range(1, period + 1):
            months = period - i + 1
            interest += monthly * monthly_rate * months

        total_deposit = monthly * period
        gross_interest = round(interest)

        tax_rate = SavingsCalculator.TAX_RATES.get(tax_type, 0.154)
        tax = round(interest * tax_rate)
        net_interest = round(interest - tax)
        total_amount = round(total_deposit + interest - tax)

        return {
            "total_deposit": total_deposit,
            "gross_interest": gross_interest,
            "tax": tax,
            "net_interest": net_interest,
            "total_amount": total_amount
        }


class StockReturnCalculator:
    """주식 수익률 계산기"""
    FEE_RATE = 0.00015  # 0.015%
    TAX_RATE = 0.0020   # 0.20% (2026년 기준)

    @staticmethod
    def calculate(buy_price: int, sell_price: int, quantity: int = 1):
        """
        buy_price: 매수가
        sell_price: 매도가
        quantity: 수량
        """
        buy_amount = buy_price * quantity
        sell_amount = sell_price * quantity

        buy_fee = round(buy_amount * StockReturnCalculator.FEE_RATE)
        sell_fee = round(sell_amount * StockReturnCalculator.FEE_RATE)
        tax = round(sell_amount * StockReturnCalculator.TAX_RATE)

        total_cost = buy_fee + sell_fee + tax
        net_profit = sell_amount - buy_amount - total_cost
        return_rate = (net_profit / buy_amount) * 100

        return {
            "buy_amount": buy_amount,
            "sell_amount": sell_amount,
            "buy_fee": buy_fee,
            "sell_fee": sell_fee,
            "tax": tax,
            "total_cost": total_cost,
            "net_profit": net_profit,
            "return_rate": round(return_rate, 2)
        }

    @staticmethod
    def calculate_by_return(buy_amount: int, target_return: float):
        """수익률 기반 순수익 계산"""
        # 매수 수수료
        buy_fee = round(buy_amount * StockReturnCalculator.FEE_RATE)

        # 목표 수익률에 해당하는 순수익
        target_profit = buy_amount * (target_return / 100)

        # 역산: 매도금액 = 매수금액 + 순수익 + 수수료 + 세금
        # sell - buy - buy_fee - sell_fee - tax = target_profit
        # sell - buy - buy_fee - sell*0.00015 - sell*0.002 = target_profit
        # sell * (1 - 0.00215) = buy + buy_fee + target_profit
        sell_amount = (buy_amount + buy_fee + target_profit) / (1 - 0.00215)
        sell_amount = round(sell_amount)

        sell_fee = round(sell_amount * StockReturnCalculator.FEE_RATE)
        tax = round(sell_amount * StockReturnCalculator.TAX_RATE)

        actual_profit = sell_amount - buy_amount - buy_fee - sell_fee - tax

        return {
            "buy_amount": buy_amount,
            "sell_amount": sell_amount,
            "net_profit": round(actual_profit),
            "return_rate": round((actual_profit / buy_amount) * 100, 2)
        }


class InsuranceCalculator:
    """4대보험 계산기"""
    RATES = {
        "nationalPension": {"employee": 0.0475, "employer": 0.0475},
        "healthInsurance": {"employee": 0.03595, "employer": 0.03595},
        "longTermCareRate": 0.1314,
        "employmentInsurance": {"employee": 0.009, "employer": 0.009},
        "industrialAccident": 0.007
    }
    PENSION_CAP = 6370000  # 국민연금 상한 637만원

    @staticmethod
    def truncate10(num: float) -> int:
        """10원 미만 절사"""
        return int(num // 10) * 10

    @staticmethod
    def calculate(salary: int):
        """월급 기준 4대보험료 계산"""
        # 국민연금 (상한액 적용)
        pension_base = min(max(salary, 400000), InsuranceCalculator.PENSION_CAP)
        pension_employee = InsuranceCalculator.truncate10(
            pension_base * InsuranceCalculator.RATES["nationalPension"]["employee"]
        )

        # 건강보험
        health_employee = InsuranceCalculator.truncate10(
            salary * InsuranceCalculator.RATES["healthInsurance"]["employee"]
        )

        # 장기요양보험 (건강보험료의 13.14%)
        longterm_employee = InsuranceCalculator.truncate10(
            health_employee * InsuranceCalculator.RATES["longTermCareRate"]
        )

        # 고용보험
        employment_employee = InsuranceCalculator.truncate10(
            salary * InsuranceCalculator.RATES["employmentInsurance"]["employee"]
        )

        total_employee = pension_employee + health_employee + longterm_employee + employment_employee

        return {
            "pension": pension_employee,
            "health": health_employee,
            "health_longterm": health_employee + longterm_employee,
            "longterm": longterm_employee,
            "employment": employment_employee,
            "total_employee": total_employee
        }


class UnemploymentCalculator:
    """실업급여 계산기"""
    DAILY_MAX = 68100  # 2026년 상한액
    DAILY_MIN = 66048  # 2026년 하한액 (최저임금 80%)

    # 수급일수 테이블 (가입기간, 나이 기준)
    BENEFIT_DAYS = {
        "under50": {
            1: 120, 3: 150, 5: 180, 10: 210, 999: 240
        },
        "50plus": {
            1: 120, 3: 180, 5: 210, 10: 240, 999: 270
        }
    }

    @staticmethod
    def get_benefit_days(years: int, age: int) -> int:
        """수급일수 계산"""
        table = UnemploymentCalculator.BENEFIT_DAYS["50plus" if age >= 50 else "under50"]
        for threshold, days in sorted(table.items()):
            if years < threshold:
                return days
        return 240

    @staticmethod
    def calculate(monthly_salary: int, years: int, age: int):
        """
        monthly_salary: 퇴직 전 월급
        years: 고용보험 가입기간 (년)
        age: 나이
        """
        daily_avg = monthly_salary / 30
        daily_benefit = daily_avg * 0.6

        # 상한/하한 적용
        daily_benefit = max(UnemploymentCalculator.DAILY_MIN,
                          min(UnemploymentCalculator.DAILY_MAX, daily_benefit))
        daily_benefit = round(daily_benefit)

        benefit_days = UnemploymentCalculator.get_benefit_days(years, age)
        total_benefit = daily_benefit * benefit_days

        return {
            "daily_avg": round(daily_avg),
            "daily_benefit": daily_benefit,
            "benefit_days": benefit_days,
            "total_benefit": total_benefit,
            "monthly_estimate": round(daily_benefit * 30)
        }


# ============================================================
# 마크다운 파서 및 검증기
# ============================================================

@dataclass
class VerificationResult:
    file: str
    calculator_type: str
    location: str
    expected: Any
    calculated: Any
    match: bool
    error_detail: str = ""


class MarkdownVerifier:
    """마크다운 파일에서 계산 예시를 추출하고 검증"""

    def __init__(self, content_dir: str):
        self.content_dir = Path(content_dir)
        self.results: List[VerificationResult] = []

    def parse_korean_number(self, text: str) -> Optional[int]:
        """한글 숫자 파싱 (예: 360만원 -> 3600000)"""
        text = text.replace(",", "").replace(" ", "").strip()

        # 억 + 만 패턴
        match = re.match(r'약?(\d+(?:\.\d+)?)억\s*(\d+(?:\.\d+)?)?만?원?', text)
        if match:
            eok = float(match.group(1)) * 100000000
            man = float(match.group(2) or 0) * 10000
            return int(eok + man)

        # 만원 패턴
        match = re.match(r'약?(\d+(?:\.\d+)?)만원?', text)
        if match:
            return int(float(match.group(1)) * 10000)

        # 원 패턴
        match = re.match(r'약?(\d+(?:,\d+)*)원?', text)
        if match:
            return int(match.group(1).replace(",", ""))

        return None

    def verify_savings(self, content: str, filename: str) -> List[VerificationResult]:
        """적금 계산기 마크다운 검증"""
        results = []

        # 계산 예시 섹션 찾기
        # 패턴: 월 30만원, 연 4%, 1년, 일반과세
        example_pattern = r'월\s*(\d+)만원.*?연\s*(\d+(?:\.\d+)?)%.*?(\d+)년.*?(일반과세|세금우대|비과세)'

        for match in re.finditer(example_pattern, content):
            monthly = int(match.group(1)) * 10000
            rate = float(match.group(2))
            years = int(match.group(3))
            tax_type_kr = match.group(4)

            tax_map = {"일반과세": "general", "세금우대": "taxPreferred", "비과세": "taxFree"}
            tax_type = tax_map.get(tax_type_kr, "general")

            calc_result = SavingsCalculator.calculate(monthly, rate, years * 12, tax_type)

            # 주변 텍스트에서 예상값 찾기
            context = content[match.end():match.end()+500]

            # 세전 이자 검증
            gross_match = re.search(r'세전\s*이자[:\s]*약?\s*(\d+(?:,\d+)*)\s*원', context)
            if gross_match:
                expected = int(gross_match.group(1).replace(",", ""))
                calculated = calc_result["gross_interest"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="적금",
                    location=f"세전이자 (월{monthly//10000}만, {rate}%, {years}년)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 100,  # 100원 오차 허용
                    error_detail=f"차이: {expected - calculated}원"
                ))

            # 만기 수령액 검증
            total_match = re.search(r'만기\s*수령액[:\s]*약?\s*(\d+(?:,\d+)*)\s*원', context)
            if total_match:
                expected = int(total_match.group(1).replace(",", ""))
                calculated = calc_result["total_amount"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="적금",
                    location=f"만기수령액 (월{monthly//10000}만, {rate}%, {years}년)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 100,
                    error_detail=f"차이: {expected - calculated}원"
                ))

        return results

    def verify_stock(self, content: str, filename: str) -> List[VerificationResult]:
        """주식 수익률 계산기 마크다운 검증"""
        results = []

        # 계산 예시: 5만원에 100주 매수 → 6만원에 매도
        example_pattern = r'(\d+(?:\.\d+)?)만원에\s*(\d+)주\s*매수.*?(\d+(?:\.\d+)?)만원에\s*매도'

        for match in re.finditer(example_pattern, content):
            buy_price = int(float(match.group(1)) * 10000)
            quantity = int(match.group(2))
            sell_price = int(float(match.group(3)) * 10000)

            calc_result = StockReturnCalculator.calculate(buy_price, sell_price, quantity)

            context = content[match.end():match.end()+500]

            # 순수익 검증
            profit_match = re.search(r'순수익[:\s]*약?\s*(\d+)만?\s*(\d+(?:,\d+)*)?\s*원', context)
            if profit_match:
                man = int(profit_match.group(1) or 0) * 10000
                won = int((profit_match.group(2) or "0").replace(",", ""))
                expected = man + won
                calculated = calc_result["net_profit"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="주식수익률",
                    location=f"순수익 ({buy_price//10000}만→{sell_price//10000}만, {quantity}주)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 1000,  # 1000원 오차 허용
                    error_detail=f"차이: {expected - calculated}원"
                ))

            # 수익률 검증
            rate_match = re.search(r'수익률[:\s]*약?\s*(\d+(?:\.\d+)?)\s*%', context)
            if rate_match:
                expected = float(rate_match.group(1))
                calculated = calc_result["return_rate"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="주식수익률",
                    location=f"수익률 ({buy_price//10000}만→{sell_price//10000}만)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 0.1,  # 0.1% 오차 허용
                    error_detail=f"차이: {expected - calculated}%"
                ))

        # 목표가 예시: 5만원 매수, 20% 수익 목표 → 약 60,200원
        target_pattern = r'(\d+(?:\.\d+)?)만원\s*매수.*?(\d+)%\s*수익\s*목표.*?약?\s*(\d+(?:,\d+)*)\s*원'

        for match in re.finditer(target_pattern, content):
            buy_price = int(float(match.group(1)) * 10000)
            target_return = int(match.group(2))
            expected_target = int(match.group(3).replace(",", ""))

            # 역산으로 목표가 계산
            calc_result = StockReturnCalculator.calculate_by_return(buy_price, target_return)
            calculated_target = calc_result["sell_amount"] // 1  # 1주 기준 가격

            results.append(VerificationResult(
                file=filename,
                calculator_type="주식수익률",
                location=f"목표가 ({buy_price//10000}만원, {target_return}% 목표)",
                expected=expected_target,
                calculated=calculated_target // (buy_price // buy_price),  # 주당 가격
                match=abs(expected_target - (calculated_target // 1)) <= 200,
                error_detail=f"예상: {expected_target}원, 계산: {calculated_target}원"
            ))

        return results

    def verify_unemployment(self, content: str, filename: str) -> List[VerificationResult]:
        """실업급여 계산기 마크다운 검증"""
        results = []

        # 예시 패턴: 45세, 월급 300만원, 고용보험 5년
        example_pattern = r'(\d+)세.*?월급\s*(\d+)만원.*?(\d+)년\s*가입'

        for match in re.finditer(example_pattern, content):
            age = int(match.group(1))
            salary = int(match.group(2)) * 10000
            years = int(match.group(3))

            calc_result = UnemploymentCalculator.calculate(salary, years, age)

            context = content[match.end():match.end()+500]

            # 수급기간 검증
            days_match = re.search(r'(\d+)일', context)
            if days_match:
                expected = int(days_match.group(1))
                calculated = calc_result["benefit_days"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="실업급여",
                    location=f"수급기간 ({age}세, {years}년)",
                    expected=expected,
                    calculated=calculated,
                    match=expected == calculated,
                    error_detail=f"예상: {expected}일, 계산: {calculated}일"
                ))

            # 총 수령액 검증
            total_match = re.search(r'총.*?수령액[:\s]*(\d+(?:,\d+)*)\s*원', context)
            if total_match:
                expected = int(total_match.group(1).replace(",", ""))
                calculated = calc_result["total_benefit"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="실업급여",
                    location=f"총수령액 ({age}세, {salary//10000}만, {years}년)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 10000,
                    error_detail=f"차이: {expected - calculated}원"
                ))

        return results

    def verify_insurance(self, content: str, filename: str) -> List[VerificationResult]:
        """4대보험 계산기 마크다운 검증"""
        results = []

        # 월급 패턴
        salary_pattern = r'월급\s*(\d+)만원'

        for match in re.finditer(salary_pattern, content):
            salary = int(match.group(1)) * 10000
            calc_result = InsuranceCalculator.calculate(salary)

            context = content[max(0, match.start()-100):match.end()+300]

            # 국민연금 검증
            pension_match = re.search(r'국민연금[:\s]*(\d+(?:,\d+)*)\s*원', context)
            if pension_match:
                expected = int(pension_match.group(1).replace(",", ""))
                calculated = calc_result["pension"]
                results.append(VerificationResult(
                    file=filename,
                    calculator_type="4대보험",
                    location=f"국민연금 (월급 {salary//10000}만)",
                    expected=expected,
                    calculated=calculated,
                    match=abs(expected - calculated) <= 10,
                    error_detail=f"예상: {expected}원, 계산: {calculated}원"
                ))

        return results

    def verify_file(self, filepath: Path) -> List[VerificationResult]:
        """파일 하나 검증"""
        try:
            content = filepath.read_text(encoding="utf-8")
        except Exception as e:
            return [VerificationResult(
                file=str(filepath),
                calculator_type="ERROR",
                location="파일 읽기",
                expected=None,
                calculated=None,
                match=False,
                error_detail=str(e)
            )]

        results = []
        filename = filepath.name

        # 파일명으로 계산기 타입 판별
        if "적금" in filename:
            results.extend(self.verify_savings(content, filename))
        if "주식" in filename and "수익" in filename:
            results.extend(self.verify_stock(content, filename))
        if "실업급여" in filename:
            results.extend(self.verify_unemployment(content, filename))
        if "4대보험" in filename or "보험료" in filename:
            results.extend(self.verify_insurance(content, filename))

        return results

    def verify_all(self) -> List[VerificationResult]:
        """모든 마크다운 파일 검증"""
        wiki_dir = self.content_dir / "wiki"

        if not wiki_dir.exists():
            print(f"디렉토리 없음: {wiki_dir}")
            return []

        all_results = []

        for md_file in wiki_dir.glob("*.md"):
            results = self.verify_file(md_file)
            all_results.extend(results)

        self.results = all_results
        return all_results

    def print_report(self):
        """검증 결과 리포트 출력"""
        if not self.results:
            print("검증 결과 없음")
            return

        errors = [r for r in self.results if not r.match]
        passed = [r for r in self.results if r.match]

        print("=" * 60)
        print(f"📊 계산기 오차 검증 리포트")
        print("=" * 60)
        print(f"✅ 통과: {len(passed)}개")
        print(f"❌ 오류: {len(errors)}개")
        print()

        if errors:
            print("🚨 오류 목록:")
            print("-" * 60)
            for err in errors:
                print(f"파일: {err.file}")
                print(f"  위치: {err.location}")
                print(f"  타입: {err.calculator_type}")
                print(f"  예상값: {err.expected}")
                print(f"  계산값: {err.calculated}")
                print(f"  상세: {err.error_detail}")
                print()

        if passed:
            print("✅ 통과 항목:")
            for p in passed:
                print(f"  - [{p.calculator_type}] {p.file}: {p.location}")

    def export_json(self, output_path: str):
        """결과를 JSON으로 내보내기"""
        data = {
            "total": len(self.results),
            "passed": len([r for r in self.results if r.match]),
            "errors": len([r for r in self.results if not r.match]),
            "results": [
                {
                    "file": r.file,
                    "calculator_type": r.calculator_type,
                    "location": r.location,
                    "expected": r.expected,
                    "calculated": r.calculated,
                    "match": r.match,
                    "error_detail": r.error_detail
                }
                for r in self.results
            ]
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"결과 저장: {output_path}")


# ============================================================
# TSX 비교표 검증기
# ============================================================

class TSXTableVerifier:
    """TSX 컴포넌트의 비교표 데이터 검증"""

    def verify_savings_table(self):
        """적금 계산기 비교표 검증 (금리 4%, 12개월, 일반과세)"""
        test_cases = [
            (100000, "10만원"),
            (200000, "20만원"),
            (300000, "30만원"),
            (500000, "50만원"),
            (1000000, "100만원"),
        ]

        print("\n📊 적금 계산기 비교표 검증 (금리 4%, 12개월, 일반과세)")
        print("-" * 70)
        print(f"{'월납입금':^12} {'총납입금':^12} {'세후이자':^12} {'만기수령액':^15}")
        print("-" * 70)

        for monthly, label in test_cases:
            result = SavingsCalculator.calculate(monthly, 4, 12, "general")
            print(f"{label:^12} {result['total_deposit']//10000:>8}만 {result['net_interest']//10000:>8.1f}만 {result['total_amount']//10000:>12.1f}만")

    def verify_stock_table(self):
        """주식 수익률 계산기 비교표 검증"""
        test_amounts = [1000000, 5000000, 10000000, 30000000, 50000000, 100000000]
        returns = [10, 20, 30, 50]

        print("\n📊 주식 수익률 계산기 비교표 검증 (수수료 0.015%, 거래세 0.20%)")
        print("-" * 80)
        header = f"{'매수금액':^12}" + "".join([f"{r}% 수익:^15" for r in returns])
        print(f"{'매수금액':^12} {'+10%':^15} {'+20%':^15} {'+30%':^15} {'+50%':^15}")
        print("-" * 80)

        for amount in test_amounts:
            row = f"{amount//10000:>8}만원"
            for ret in returns:
                result = StockReturnCalculator.calculate_by_return(amount, ret)
                row += f" {result['net_profit']/10000:>+12.1f}만원"
            print(row)

    def verify_insurance_table(self):
        """4대보험 계산기 비교표 검증"""
        test_salaries = [2000000, 2500000, 3000000, 4000000, 5000000, 6370000]

        print("\n📊 4대보험 계산기 비교표 검증 (2026년 요율)")
        print("-" * 90)
        print(f"{'월급':^10} {'국민연금':^12} {'건강+장기':^12} {'고용보험':^10} {'본인부담합계':^15}")
        print("-" * 90)

        for salary in test_salaries:
            result = InsuranceCalculator.calculate(salary)
            print(f"{salary//10000:>6}만원 {result['pension']:>10,}원 {result['health_longterm']:>10,}원 {result['employment']:>8,}원 {result['total_employee']:>13,}원")

    def verify_unemployment_table(self):
        """실업급여 계산기 검증"""
        test_cases = [
            (3000000, 5, 45),   # 300만원, 5년, 45세
            (3000000, 5, 55),   # 300만원, 5년, 55세
            (4000000, 10, 45),  # 400만원, 10년, 45세
        ]

        print("\n📊 실업급여 계산기 검증 (2026년 기준)")
        print("-" * 80)
        print(f"{'월급':^10} {'가입기간':^8} {'나이':^6} {'일급여':^10} {'수급일수':^8} {'총수령액':^15}")
        print("-" * 80)

        for salary, years, age in test_cases:
            result = UnemploymentCalculator.calculate(salary, years, age)
            print(f"{salary//10000:>6}만원 {years:>6}년 {age:>4}세 {result['daily_benefit']:>8,}원 {result['benefit_days']:>6}일 {result['total_benefit']:>13,}원")


# ============================================================
# 메인 실행
# ============================================================

if __name__ == "__main__":
    import sys

    # 기본 경로
    content_dir = Path(__file__).parent.parent / "content"

    if len(sys.argv) > 1:
        content_dir = Path(sys.argv[1])

    print("🔍 계산기 오차 검증 시작...")
    print(f"📁 대상 디렉토리: {content_dir}")
    print()

    # 1. TSX 비교표 검증 (정확한 값 출력)
    tsx_verifier = TSXTableVerifier()
    tsx_verifier.verify_savings_table()
    tsx_verifier.verify_stock_table()
    tsx_verifier.verify_insurance_table()
    tsx_verifier.verify_unemployment_table()

    print("\n" + "=" * 60)

    # 2. 마크다운 파일 검증
    md_verifier = MarkdownVerifier(str(content_dir))
    md_verifier.verify_all()
    md_verifier.print_report()

    # 결과 저장
    output_path = Path(__file__).parent / "verification_report.json"
    md_verifier.export_json(str(output_path))
