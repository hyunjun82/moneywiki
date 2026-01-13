"""
계산기 전체 오차 검증 스크립트 v2
- TSX 파일에서 비교표 데이터 추출
- 마크다운에서 계산 예시 추출
- 계산 로직으로 검증
"""

import re
import os
from pathlib import Path
from typing import List, Dict, Tuple, Any
import json

# ============================================================
# 계산 로직들
# ============================================================

def calc_savings(monthly: int, rate: float, period: int, tax_type: str = "general") -> Dict:
    """적금 계산"""
    tax_rates = {"general": 0.154, "taxPreferred": 0.095, "taxFree": 0.0}
    monthly_rate = rate / 100 / 12
    interest = sum(monthly * monthly_rate * (period - i + 1) for i in range(1, period + 1))

    total_deposit = monthly * period
    gross_interest = round(interest)
    tax = round(interest * tax_rates.get(tax_type, 0.154))
    net_interest = round(interest - tax)
    total_amount = round(total_deposit + interest - tax)

    return {"deposit": total_deposit, "gross": gross_interest, "tax": tax,
            "net": net_interest, "total": total_amount}


def calc_stock_profit(buy_amount: int, return_pct: float) -> Dict:
    """주식 순수익 계산 (수수료 0.015%, 거래세 0.20%)"""
    fee_rate = 0.00015
    tax_rate = 0.0020

    sell_amount = buy_amount * (1 + return_pct / 100)
    buy_fee = round(buy_amount * fee_rate)
    sell_fee = round(sell_amount * fee_rate)
    tax = round(sell_amount * tax_rate)

    net_profit = sell_amount - buy_amount - buy_fee - sell_fee - tax
    return {"profit": round(net_profit), "sell": round(sell_amount)}


def truncate10(n: float) -> int:
    """10원 미만 절사"""
    return int(n // 10) * 10


def calc_insurance(salary: int) -> Dict:
    """4대보험 계산 (2026년 요율)"""
    pension_cap = 6370000
    pension_base = min(max(salary, 400000), pension_cap)

    pension = truncate10(pension_base * 0.0475)
    health = truncate10(salary * 0.03595)
    longterm = truncate10(health * 0.1314)
    employment = truncate10(salary * 0.009)

    return {
        "pension": pension,
        "health": health,
        "longterm": longterm,
        "health_longterm": health + longterm,
        "employment": employment,
        "total": pension + health + longterm + employment
    }


def calc_unemployment(salary: int, years: int, age: int) -> Dict:
    """실업급여 계산"""
    daily_max, daily_min = 68100, 66048

    daily_avg = salary / 30
    daily_benefit = max(daily_min, min(daily_max, daily_avg * 0.6))
    daily_benefit = round(daily_benefit)

    # 수급일수
    if age >= 50:
        table = {1: 120, 3: 180, 5: 210, 10: 240, 999: 270}
    else:
        table = {1: 120, 3: 150, 5: 180, 10: 210, 999: 240}

    days = 120
    for threshold, d in sorted(table.items()):
        if years < threshold:
            days = d
            break

    return {"daily": daily_benefit, "days": days, "total": daily_benefit * days}


# ============================================================
# 검증 함수들
# ============================================================

def verify_savings():
    """적금 계산기 검증"""
    print("\n" + "=" * 70)
    print("📊 적금 계산기 검증 (금리 4%, 12개월, 일반과세)")
    print("=" * 70)

    # TSX 테이블 기대값 (수동 추출)
    expected_tsx = [
        (100000, "2.2만", "122.2만"),
        (200000, "4.4만", "244.4만"),
        (300000, "6.6만", "366.6만"),
        (500000, "11만", "611만"),
        (1000000, "22만", "1,222만"),
    ]

    errors = []
    for monthly, exp_net, exp_total in expected_tsx:
        calc = calc_savings(monthly, 4, 12, "general")
        calc_net = f"{calc['net']/10000:.1f}만".replace(".0만", "만")
        calc_total = f"{calc['total']/10000:,.1f}만".replace(".0만", "만")

        # 비교
        net_match = exp_net.replace(",", "") == calc_net.replace(",", "")
        total_match = exp_total.replace(",", "") == calc_total.replace(",", "")

        status = "✅" if net_match and total_match else "❌"
        print(f"{status} 월 {monthly//10000}만원: 세후 {calc_net} (기대: {exp_net}), 만기 {calc_total} (기대: {exp_total})")

        if not (net_match and total_match):
            errors.append({
                "월납입금": monthly,
                "기대_세후": exp_net,
                "계산_세후": calc_net,
                "기대_만기": exp_total,
                "계산_만기": calc_total
            })

    # 마크다운 예시 검증
    print("\n📄 마크다운 예시 검증:")
    md_example = {"monthly": 300000, "rate": 4, "period": 12, "gross": 78000, "tax": 12012, "net": 65988, "total": 3665988}
    calc = calc_savings(md_example["monthly"], md_example["rate"], md_example["period"])

    checks = [
        ("세전이자", md_example["gross"], calc["gross"]),
        ("세금", md_example["tax"], calc["tax"]),
        ("세후이자", md_example["net"], calc["net"]),
        ("만기수령액", md_example["total"], calc["total"]),
    ]

    for name, expected, calculated in checks:
        match = abs(expected - calculated) <= 10
        status = "✅" if match else "❌"
        print(f"  {status} {name}: {expected:,}원 vs {calculated:,}원")
        if not match:
            errors.append({"항목": name, "기대": expected, "계산": calculated})

    return errors


def verify_stock():
    """주식 수익률 계산기 검증"""
    print("\n" + "=" * 70)
    print("📊 주식 수익률 계산기 검증 (수수료 0.015%, 거래세 0.20%)")
    print("=" * 70)

    # TSX 테이블 기대값
    expected_tsx = [
        (1000000, 10, "+9.7만원"),
        (1000000, 20, "+19.7만원"),
        (5000000, 10, "+48.7만원"),
        (5000000, 20, "+98.6만원"),
        (10000000, 10, "+97.5만원"),
        (10000000, 20, "+197.3만원"),
        (100000000, 10, "+974.9만원"),
        (100000000, 20, "+1,972.7만원"),
    ]

    errors = []
    for buy_amt, ret_pct, exp_profit in expected_tsx:
        calc = calc_stock_profit(buy_amt, ret_pct)
        calc_profit_man = calc["profit"] / 10000

        # 기대값 파싱
        exp_num = float(exp_profit.replace("+", "").replace(",", "").replace("만원", ""))

        diff = abs(calc_profit_man - exp_num)
        match = diff <= 0.2  # 0.2만원 = 2000원 오차 허용

        status = "✅" if match else "❌"
        print(f"{status} {buy_amt//10000}만원 +{ret_pct}%: {calc_profit_man:+.1f}만원 (기대: {exp_profit})")

        if not match:
            errors.append({
                "매수금액": buy_amt,
                "수익률": ret_pct,
                "기대": exp_profit,
                "계산": f"+{calc_profit_man:.1f}만원"
            })

    # 마크다운 목표가 예시 검증
    print("\n📄 마크다운 목표가 예시 검증:")
    # 5만원 매수, 20% 목표 → 약 60,200원
    # 역산: 목표가에서 순수익 20% 되려면?
    buy = 50000
    target_return = 0.20
    fee_rate = 0.00015
    tax_rate = 0.0020

    # 역산 공식
    target_profit = buy * target_return
    # sell - buy - buy*fee - sell*fee - sell*tax = target_profit
    # sell * (1 - fee - tax) = buy + buy*fee + target_profit
    sell = (buy + buy * fee_rate + target_profit) / (1 - fee_rate - tax_rate)

    print(f"  5만원 매수, 20% 목표 → 계산된 목표가: {round(sell):,}원 (기대: 60,200원)")

    if abs(round(sell) - 60200) > 100:
        errors.append({"목표가계산": "오차발생", "기대": 60200, "계산": round(sell)})
    else:
        print(f"  ✅ 목표가 정확!")

    return errors


def verify_insurance():
    """4대보험 계산기 검증"""
    print("\n" + "=" * 70)
    print("📊 4대보험 계산기 검증 (2026년 요율)")
    print("=" * 70)

    # TSX 테이블 기대값
    expected_tsx = [
        (2000000, 95000, 81340, 18000, "약 19.4만원"),
        (2500000, 118750, 101670, 22500, "약 24.3만원"),
        (3000000, 142500, 122020, 27000, "약 29.2만원"),
        (4000000, 190000, 162690, 36000, "약 38.9만원"),
        (5000000, 237500, 203360, 45000, "약 48.6만원"),
        (6370000, 302570, 259050, 57330, "약 61.9만원"),
    ]

    errors = []
    for salary, exp_pension, exp_health_lt, exp_emp, exp_total_str in expected_tsx:
        calc = calc_insurance(salary)

        # 개별 항목 검증
        pension_match = abs(calc["pension"] - exp_pension) <= 10
        health_lt_match = abs(calc["health_longterm"] - exp_health_lt) <= 100
        emp_match = abs(calc["employment"] - exp_emp) <= 10

        # 총액 파싱 및 검증
        exp_total = float(exp_total_str.replace("약 ", "").replace("만원", "")) * 10000
        total_match = abs(calc["total"] - exp_total) <= 2000

        all_match = pension_match and health_lt_match and emp_match and total_match
        status = "✅" if all_match else "❌"

        print(f"{status} {salary//10000}만원: 연금 {calc['pension']:,} (기대:{exp_pension:,}), "
              f"건강+장기 {calc['health_longterm']:,} (기대:{exp_health_lt:,}), "
              f"고용 {calc['employment']:,} (기대:{exp_emp:,}), "
              f"합계 {calc['total']/10000:.1f}만원 (기대:{exp_total_str})")

        if not all_match:
            errors.append({
                "월급": salary,
                "연금": {"기대": exp_pension, "계산": calc["pension"]},
                "건강+장기": {"기대": exp_health_lt, "계산": calc["health_longterm"]},
                "고용": {"기대": exp_emp, "계산": calc["employment"]},
                "합계": {"기대": exp_total_str, "계산": f"{calc['total']/10000:.1f}만원"}
            })

    return errors


def verify_unemployment():
    """실업급여 계산기 검증"""
    print("\n" + "=" * 70)
    print("📊 실업급여 계산기 검증 (2026년 기준)")
    print("=" * 70)

    # 마크다운 예시 검증
    test_cases = [
        # (월급, 가입년수, 나이, 기대_일급여, 기대_일수, 기대_총액)
        (3000000, 5, 45, 66048, 210, 13870080),  # 하한액 적용
    ]

    errors = []
    for salary, years, age, exp_daily, exp_days, exp_total in test_cases:
        calc = calc_unemployment(salary, years, age)

        daily_match = calc["daily"] == exp_daily
        days_match = calc["days"] == exp_days
        total_match = calc["total"] == exp_total

        all_match = daily_match and days_match and total_match
        status = "✅" if all_match else "❌"

        print(f"{status} {salary//10000}만원, {years}년, {age}세:")
        print(f"    일급여: {calc['daily']:,}원 (기대: {exp_daily:,}원)")
        print(f"    수급일수: {calc['days']}일 (기대: {exp_days}일)")
        print(f"    총수령액: {calc['total']:,}원 (기대: {exp_total:,}원)")

        if not all_match:
            errors.append({
                "케이스": f"{salary//10000}만원, {years}년, {age}세",
                "일급여": {"기대": exp_daily, "계산": calc["daily"]},
                "일수": {"기대": exp_days, "계산": calc["days"]},
                "총액": {"기대": exp_total, "계산": calc["total"]}
            })

    return errors


# ============================================================
# 메인
# ============================================================

def main():
    print("🔍 계산기 전체 오차 검증 v2")
    print("=" * 70)

    all_errors = []

    all_errors.extend(verify_savings())
    all_errors.extend(verify_stock())
    all_errors.extend(verify_insurance())
    all_errors.extend(verify_unemployment())

    print("\n" + "=" * 70)
    print("📋 최종 검증 결과")
    print("=" * 70)

    if all_errors:
        print(f"❌ 총 {len(all_errors)}개 오류 발견!")
        print("\n오류 상세:")
        for err in all_errors:
            print(f"  - {err}")
    else:
        print("✅ 모든 검증 통과! 오차 없음.")

    # JSON 저장
    result = {
        "total_errors": len(all_errors),
        "errors": all_errors
    }

    output_path = Path(__file__).parent / "verification_result.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n결과 저장: {output_path}")

    return len(all_errors)


if __name__ == "__main__":
    import sys
    sys.exit(main())
