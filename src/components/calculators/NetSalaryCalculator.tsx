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

  // 4대보험 요율 (2026년 기준)
  const RATES = {
    nationalPension: 0.045, // 국민연금 4.5%
    healthInsurance: 0.03545, // 건강보험 3.545%
    longTermCareRate: 0.1295, // 장기요양보험 (건강보험의 12.95%)
    employmentInsurance: 0.009, // 고용보험 0.9%
  };

  // 간이세액표 기반 근로소득세 계산 (간략화)
  const calculateIncomeTax = useCallback((monthlyTaxable: number, deps: number): number => {
    // 과세표준 계산 (간략화)
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

    // 과세표준
    const taxBase = Math.max(0, annualTaxable - incomeDeduction - personalDeduction - standardDeduction);

    // 소득세 계산 (누진세율)
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

    return Math.round(tax / 12); // 월 소득세
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
    const nationalPension = Math.min(monthlyTaxable * RATES.nationalPension, 265500); // 상한액
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
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">이용안내</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 2026년 4대보험 요율 기준으로 계산해요</li>
            <li>• 실제 공제액은 회사 정책에 따라 다를 수 있어요</li>
            <li>• 비과세 항목은 식대, 차량유지비 등이에요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
