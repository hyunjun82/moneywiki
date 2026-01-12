"use client";

import { useState, useCallback, useEffect } from "react";

interface DeductionResult {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeduction: number;
  netSalary: number;
  monthlyNet: number;
}

export default function NetSalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [nonTaxable, setNonTaxable] = useState<number>(200000); // 비과세 (식대 등)
  const [result, setResult] = useState<DeductionResult | null>(null);

  // 4대보험 요율 (2026년 기준, 2026.1.1 시행)
  const RATES = {
    nationalPension: 0.0475, // 국민연금 4.75%
    healthInsurance: 0.03595, // 건강보험 3.595%
    longTermCareRate: 0.1314, // 장기요양보험 (건강보험의 13.14%)
    employmentInsurance: 0.009, // 고용보험 0.9%
  };

  // 간이세액표 기반 근로소득세 계산 (2026년 기준)
  const calculateIncomeTax = useCallback((monthlyTaxable: number, deps: number): number => {
    // 과세표준 계산
    const annualTaxable = monthlyTaxable * 12;

    // 근로소득공제
    let incomeDeduction = 0;
    if (annualTaxable <= 5000000) {
      incomeDeduction = annualTaxable * 0.7;
    } else if (annualTaxable <= 15000000) {
      incomeDeduction = 3500000 + (annualTaxable - 5000000) * 0.4;
    } else if (annualTaxable <= 45000000) {
      incomeDeduction = 7500000 + (annualTaxable - 15000000) * 0.15;
    } else if (annualTaxable <= 100000000) {
      incomeDeduction = 12000000 + (annualTaxable - 45000000) * 0.05;
    } else {
      incomeDeduction = 14750000 + (annualTaxable - 100000000) * 0.02;
    }

    // 인적공제 (본인 150만원 + 부양가족 1인당 150만원)
    const personalDeduction = deps * 1500000;

    // 표준공제
    const standardDeduction = 1300000;

    // 특별소득공제 (4대보험료 근로자부담분 추정)
    const estimatedInsurance = annualTaxable * 0.0935; // 약 9.35%

    // 과세표준
    const taxBase = Math.max(0, annualTaxable - incomeDeduction - personalDeduction - standardDeduction - estimatedInsurance);

    // 산출세액 (누진세율)
    let tax = 0;
    if (taxBase <= 14000000) {
      tax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      tax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      tax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      tax = 15360000 + (taxBase - 88000000) * 0.35;
    } else if (taxBase <= 300000000) {
      tax = 37060000 + (taxBase - 150000000) * 0.38;
    } else if (taxBase <= 500000000) {
      tax = 94060000 + (taxBase - 300000000) * 0.40;
    } else if (taxBase <= 1000000000) {
      tax = 174060000 + (taxBase - 500000000) * 0.42;
    } else {
      tax = 384060000 + (taxBase - 1000000000) * 0.45;
    }

    // 근로소득세액공제 (산출세액에서 공제)
    let taxCredit = 0;
    if (tax <= 1300000) {
      taxCredit = tax * 0.55;
    } else {
      taxCredit = 715000 + (tax - 1300000) * 0.30;
    }
    // 근로소득세액공제 한도 (총급여 기준)
    if (annualTaxable <= 33000000) {
      taxCredit = Math.min(taxCredit, 740000);
    } else if (annualTaxable <= 70000000) {
      taxCredit = Math.min(taxCredit, 740000 - (annualTaxable - 33000000) * 0.008);
      taxCredit = Math.max(taxCredit, 660000);
    } else {
      taxCredit = Math.min(taxCredit, 660000 - (annualTaxable - 70000000) * 0.5);
      taxCredit = Math.max(taxCredit, 500000);
    }

    // 결정세액
    const finalTax = Math.max(0, tax - taxCredit);

    return Math.round(finalTax / 12); // 월 소득세
  }, []);

  // 계산
  useEffect(() => {
    if (annualSalary <= 0) {
      setResult(null);
      return;
    }

    const monthlySalary = annualSalary / 12;
    const monthlyTaxable = monthlySalary - nonTaxable;

    // 4대보험 (월급 기준)
    const nationalPension = Math.min(monthlyTaxable * RATES.nationalPension, 302575); // 상한액 (637만원 × 4.75%)
    const healthInsurance = monthlyTaxable * RATES.healthInsurance;
    const longTermCare = healthInsurance * RATES.longTermCareRate;
    const employmentInsurance = monthlyTaxable * RATES.employmentInsurance;

    // 소득세
    const incomeTax = calculateIncomeTax(monthlyTaxable, dependents + children);
    const localIncomeTax = Math.round(incomeTax * 0.1); // 지방소득세 (소득세의 10%)

    const totalDeduction = nationalPension + healthInsurance + longTermCare +
                          employmentInsurance + incomeTax + localIncomeTax;
    const monthlyNet = monthlySalary - totalDeduction;

    setResult({
      nationalPension: Math.round(nationalPension),
      healthInsurance: Math.round(healthInsurance),
      longTermCare: Math.round(longTermCare),
      employmentInsurance: Math.round(employmentInsurance),
      incomeTax: Math.round(incomeTax),
      localIncomeTax: Math.round(localIncomeTax),
      totalDeduction: Math.round(totalDeduction),
      netSalary: Math.round(monthlyNet * 12),
      monthlyNet: Math.round(monthlyNet),
    });
  }, [annualSalary, dependents, children, nonTaxable, calculateIncomeTax]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

  const formatWon = (num: number): string => {
    if (num >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const man = Math.floor((num % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${formatNumber(man)}만원` : `${eok}억원`;
    } else if (num >= 10000) {
      return `${formatNumber(Math.floor(num / 10000))}만원`;
    }
    return `${formatNumber(num)}원`;
  };

  const handleQuickSalary = (amount: number) => setAnnualSalary(amount);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">연봉 실수령액 계산기</h2>
            <p className="text-emerald-100 text-sm">4대보험, 소득세 공제 후 실수령액</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 연봉 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">연봉 (세전)</label>
          <div className="relative">
            <input
              type="text"
              value={annualSalary > 0 ? formatNumber(annualSalary) : ""}
              onChange={(e) => setAnnualSalary(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="연봉을 입력하세요"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {annualSalary > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(annualSalary)}</p>}

          <div className="flex gap-2 mt-3">
            <button onClick={() => handleQuickSalary(30000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">3천만</button>
            <button onClick={() => handleQuickSalary(40000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">4천만</button>
            <button onClick={() => handleQuickSalary(50000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">5천만</button>
            <button onClick={() => handleQuickSalary(60000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">6천만</button>
            <button onClick={() => handleQuickSalary(80000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">8천만</button>
            <button onClick={() => setAnnualSalary(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        {/* 부양가족/비과세 설정 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">부양가족 (본인 포함)</label>
            <select
              value={dependents}
              onChange={(e) => setDependents(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">20세 이하 자녀</label>
            <select
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">비과세액 (월)</label>
            <select
              value={nonTaxable}
              onChange={(e) => setNonTaxable(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              <option value={0}>없음</option>
              <option value={100000}>10만원</option>
              <option value={200000}>20만원</option>
              <option value={300000}>30만원</option>
            </select>
          </div>
        </div>

        {/* 결과 */}
        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">실수령액</h3>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="text-sm text-neutral-500 mb-1">월 실수령액</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(result.monthlyNet)}원</div>
              <div className="text-sm text-neutral-500 mt-1">{formatWon(result.monthlyNet)}</div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="text-sm text-neutral-500 mb-1">연간 실수령액</div>
              <div className="text-2xl font-bold text-neutral-800">{formatNumber(result.netSalary)}원</div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-neutral-700 mb-3">월 공제 내역</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">국민연금</span>
                  <span className="font-medium">-{formatNumber(result.nationalPension)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">건강보험</span>
                  <span className="font-medium">-{formatNumber(result.healthInsurance)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">장기요양보험</span>
                  <span className="font-medium">-{formatNumber(result.longTermCare)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">고용보험</span>
                  <span className="font-medium">-{formatNumber(result.employmentInsurance)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">소득세</span>
                  <span className="font-medium">-{formatNumber(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">지방소득세</span>
                  <span className="font-medium">-{formatNumber(result.localIncomeTax)}원</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">총 공제액</span>
                  <span className="font-bold text-red-600">-{formatNumber(result.totalDeduction)}원</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">이용안내</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 2026년 4대보험 요율 기준으로 계산해요</li>
            <li>• 실제 공제액은 회사 정책에 따라 다를 수 있어요</li>
            <li>• 비과세 항목은 식대, 차량유지비 등이에요</li>
          </ul>
        </div>

        {/* 연봉별 실수령액 비교표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 연봉별 월 실수령액 비교표 (2026년 기준)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">연봉</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월급</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">4대보험</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">소득세</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">3,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">250만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 22만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 3만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 224만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">사회초년생 👶</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">4,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">333만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 30만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 10만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 293만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">3~5년차 평균 💼</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">5,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">417만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 39만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 21만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 357만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">대기업 초봉 🏢</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">6,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">500만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 47만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 33만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 420만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">과장급 평균 ⭐</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">8,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">667만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 62만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 61만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 543만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">차부장급 💎</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">833만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 71만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 99만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 664만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">억대연봉! 🎯</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1,250만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 91만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 224만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 935만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">임원급 🏆</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 부양가족 1인(본인), 비과세 20만원 기준 | 실제 금액은 상황에 따라 달라질 수 있음</p>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 연봉 ↑ → 세율 ↑ (누진세): 고소득일수록 실수령 비율 ↓</li>
              <li>• 4대보험은 고정비율, 소득세는 누진세율 적용</li>
              <li>• 부양가족 많으면 소득세 ↓ / 비과세 항목 챙기기!</li>
            </ul>
          </div>
        </div>

        {/* 공제율 비교표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">💰 연봉별 공제율 & 실수령률 비교</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">연봉</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">4대보험율</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">세금율</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">총 공제율</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령률</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">3,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 9%</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 1%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 10%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 90%</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">세금 거의 없음 😊</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">5,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 9%</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 14%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 86%</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">적정 세율 👍</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">8,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 9%</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 9%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 18%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 82%</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">세금 부담 증가 📈</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 9%</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 12%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 21%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 80%</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">누진세 체감 💸</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 7%</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 18%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 25%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 75%</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">절세 필수! 🎯</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 국민연금 상한액(월 302,575원) 적용으로 고소득자 4대보험율 ↓</p>
        </div>
      </div>
    </div>
  );
}
