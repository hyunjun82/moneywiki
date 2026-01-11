"use client";

import { useState, useEffect } from "react";

interface TaxResult {
  grossIncome: number;
  incomeDeduction: number;
  taxableIncome: number;
  personalDeduction: number;
  taxBase: number;
  calculatedTax: number;
  taxCredit: number;
  finalTax: number;
  localTax: number;
  totalTax: number;
  effectiveRate: number;
}

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(1);
  const [result, setResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    if (annualIncome <= 0) {
      setResult(null);
      return;
    }

    // 근로소득공제
    let incomeDeduction = 0;
    if (annualIncome <= 5000000) {
      incomeDeduction = annualIncome * 0.7;
    } else if (annualIncome <= 15000000) {
      incomeDeduction = 3500000 + (annualIncome - 5000000) * 0.4;
    } else if (annualIncome <= 45000000) {
      incomeDeduction = 7500000 + (annualIncome - 15000000) * 0.15;
    } else if (annualIncome <= 100000000) {
      incomeDeduction = 12000000 + (annualIncome - 45000000) * 0.05;
    } else {
      incomeDeduction = 14750000 + (annualIncome - 100000000) * 0.02;
    }

    const taxableIncome = annualIncome - incomeDeduction;

    // 인적공제
    const personalDeduction = dependents * 1500000;
    const standardDeduction = 1300000;

    // 과세표준
    const taxBase = Math.max(0, taxableIncome - personalDeduction - standardDeduction);

    // 산출세액 (누진세율)
    let calculatedTax = 0;
    if (taxBase <= 14000000) {
      calculatedTax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      calculatedTax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      calculatedTax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      calculatedTax = 15360000 + (taxBase - 88000000) * 0.35;
    } else if (taxBase <= 300000000) {
      calculatedTax = 37060000 + (taxBase - 150000000) * 0.38;
    } else if (taxBase <= 500000000) {
      calculatedTax = 94060000 + (taxBase - 300000000) * 0.40;
    } else if (taxBase <= 1000000000) {
      calculatedTax = 174060000 + (taxBase - 500000000) * 0.42;
    } else {
      calculatedTax = 384060000 + (taxBase - 1000000000) * 0.45;
    }

    // 근로소득세액공제
    let taxCredit = 0;
    if (calculatedTax <= 1300000) {
      taxCredit = calculatedTax * 0.55;
    } else {
      taxCredit = 715000 + (calculatedTax - 1300000) * 0.30;
    }
    taxCredit = Math.min(taxCredit, 740000); // 한도

    const finalTax = Math.max(0, calculatedTax - taxCredit);
    const localTax = Math.round(finalTax * 0.1);
    const totalTax = finalTax + localTax;
    const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

    setResult({
      grossIncome: annualIncome,
      incomeDeduction: Math.round(incomeDeduction),
      taxableIncome: Math.round(taxableIncome),
      personalDeduction: personalDeduction + standardDeduction,
      taxBase: Math.round(taxBase),
      calculatedTax: Math.round(calculatedTax),
      taxCredit: Math.round(taxCredit),
      finalTax: Math.round(finalTax),
      localTax,
      totalTax: Math.round(totalTax),
      effectiveRate,
    });
  }, [annualIncome, dependents]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

  // 세율 구간
  const taxBrackets = [
    { range: "1,400만원 이하", rate: "6%" },
    { range: "1,400만원 ~ 5,000만원", rate: "15%" },
    { range: "5,000만원 ~ 8,800만원", rate: "24%" },
    { range: "8,800만원 ~ 1.5억원", rate: "35%" },
    { range: "1.5억원 ~ 3억원", rate: "38%" },
    { range: "3억원 ~ 5억원", rate: "40%" },
    { range: "5억원 ~ 10억원", rate: "42%" },
    { range: "10억원 초과", rate: "45%" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">근로소득세 계산기</h2>
            <p className="text-emerald-100 text-sm">연봉 기준 소득세 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">연간 총급여</label>
          <div className="relative">
            <input
              type="text"
              value={annualIncome > 0 ? formatNumber(annualIncome) : ""}
              onChange={(e) => setAnnualIncome(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="연봉을 입력하세요"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>

          <div className="flex gap-2 mt-3">
            {[30000000, 50000000, 70000000, 100000000, 150000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setAnnualIncome(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {amount >= 100000000 ? `${amount / 100000000}억` : `${amount / 10000}만`}
              </button>
            ))}
            <button onClick={() => setAnnualIncome(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">부양가족 수 (본인 포함)</label>
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

        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">소득세 계산 결과</h3>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="text-sm text-neutral-500 mb-1">연간 소득세 + 지방소득세</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(result.totalTax)}원</div>
              <div className="text-sm text-neutral-500 mt-1">실효세율 {result.effectiveRate.toFixed(2)}%</div>
            </div>

            <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">총급여</span>
                <span>{formatNumber(result.grossIncome)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">(-) 근로소득공제</span>
                <span>{formatNumber(result.incomeDeduction)}원</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-neutral-700">(=) 근로소득금액</span>
                <span>{formatNumber(result.taxableIncome)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">(-) 인적공제+표준공제</span>
                <span>{formatNumber(result.personalDeduction)}원</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span className="text-neutral-700">(=) 과세표준</span>
                <span>{formatNumber(result.taxBase)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">산출세액</span>
                <span>{formatNumber(result.calculatedTax)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">(-) 근로소득세액공제</span>
                <span>{formatNumber(result.taxCredit)}원</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span className="text-neutral-700">결정세액 (소득세)</span>
                <span>{formatNumber(result.finalTax)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">(+) 지방소득세</span>
                <span>{formatNumber(result.localTax)}원</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 text-emerald-600">
                <span>총 납부세액</span>
                <span>{formatNumber(result.totalTax)}원</span>
              </div>
            </div>
          </div>
        )}

        {/* 세율표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
          <h4 className="font-medium text-neutral-700 mb-3">2026년 소득세 세율표</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {taxBrackets.map((bracket, i) => (
              <div key={i} className="flex justify-between p-2 bg-white rounded">
                <span className="text-neutral-600">{bracket.range}</span>
                <span className="font-medium text-emerald-600">{bracket.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
