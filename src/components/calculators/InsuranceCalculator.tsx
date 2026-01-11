"use client";

import { useState, useEffect } from "react";

interface InsuranceResult {
  nationalPension: { employee: number; employer: number; total: number };
  healthInsurance: { employee: number; employer: number; total: number };
  longTermCare: { employee: number; employer: number; total: number };
  employmentInsurance: { employee: number; employer: number; total: number };
  industrialAccident: { employer: number };
  totalEmployee: number;
  totalEmployer: number;
  grandTotal: number;
}

export default function InsuranceCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [result, setResult] = useState<InsuranceResult | null>(null);

  // 2026년 4대보험 요율
  const RATES = {
    nationalPension: { employee: 0.045, employer: 0.045 },
    healthInsurance: { employee: 0.03545, employer: 0.03545 },
    longTermCareRate: 0.1295,
    employmentInsurance: { employee: 0.009, employer: 0.009 },
    industrialAccident: 0.007, // 업종 평균
  };

  useEffect(() => {
    if (monthlySalary <= 0) {
      setResult(null);
      return;
    }

    // 국민연금 (상한액 590만원 기준월소득, 상한보험료 265,500원)
    const pensionBase = Math.min(Math.max(monthlySalary, 370000), 5900000);
    const nationalPension = {
      employee: Math.round(pensionBase * RATES.nationalPension.employee),
      employer: Math.round(pensionBase * RATES.nationalPension.employer),
      total: Math.round(pensionBase * (RATES.nationalPension.employee + RATES.nationalPension.employer)),
    };

    // 건강보험
    const healthInsurance = {
      employee: Math.round(monthlySalary * RATES.healthInsurance.employee),
      employer: Math.round(monthlySalary * RATES.healthInsurance.employer),
      total: Math.round(monthlySalary * (RATES.healthInsurance.employee + RATES.healthInsurance.employer)),
    };

    // 장기요양보험
    const longTermCare = {
      employee: Math.round(healthInsurance.employee * RATES.longTermCareRate),
      employer: Math.round(healthInsurance.employer * RATES.longTermCareRate),
      total: Math.round(healthInsurance.total * RATES.longTermCareRate),
    };

    // 고용보험
    const employmentInsurance = {
      employee: Math.round(monthlySalary * RATES.employmentInsurance.employee),
      employer: Math.round(monthlySalary * RATES.employmentInsurance.employer),
      total: Math.round(monthlySalary * (RATES.employmentInsurance.employee + RATES.employmentInsurance.employer)),
    };

    // 산재보험 (사업주만 부담)
    const industrialAccident = {
      employer: Math.round(monthlySalary * RATES.industrialAccident),
    };

    const totalEmployee = nationalPension.employee + healthInsurance.employee + longTermCare.employee + employmentInsurance.employee;
    const totalEmployer = nationalPension.employer + healthInsurance.employer + longTermCare.employer + employmentInsurance.employer + industrialAccident.employer;

    setResult({
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      industrialAccident,
      totalEmployee,
      totalEmployer,
      grandTotal: totalEmployee + totalEmployer,
    });
  }, [monthlySalary]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">4대보험료 계산기</h2>
            <p className="text-green-100 text-sm">국민연금, 건강보험, 고용보험, 산재보험</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">월 급여 (세전)</label>
          <div className="relative">
            <input
              type="text"
              value={monthlySalary > 0 ? formatNumber(monthlySalary) : ""}
              onChange={(e) => setMonthlySalary(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="월 급여를 입력하세요"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-green-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>

          <div className="flex gap-2 mt-3">
            {[2500000, 3000000, 3500000, 4000000, 5000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setMonthlySalary(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {(amount / 10000).toFixed(0)}만
              </button>
            ))}
            <button onClick={() => setMonthlySalary(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-bold text-green-800 mb-4">4대보험료 내역</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="py-2 text-left text-neutral-600">항목</th>
                    <th className="py-2 text-right text-neutral-600">근로자</th>
                    <th className="py-2 text-right text-neutral-600">사업주</th>
                    <th className="py-2 text-right text-neutral-600">합계</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  <tr>
                    <td className="py-3 text-neutral-700">국민연금 (4.5%)</td>
                    <td className="py-3 text-right">{formatNumber(result.nationalPension.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.nationalPension.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.nationalPension.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">건강보험 (3.545%)</td>
                    <td className="py-3 text-right">{formatNumber(result.healthInsurance.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.healthInsurance.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.healthInsurance.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">장기요양 (12.95%)</td>
                    <td className="py-3 text-right">{formatNumber(result.longTermCare.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.longTermCare.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.longTermCare.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">고용보험 (0.9%)</td>
                    <td className="py-3 text-right">{formatNumber(result.employmentInsurance.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.employmentInsurance.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.employmentInsurance.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">산재보험 (0.7%)</td>
                    <td className="py-3 text-right text-neutral-400">-</td>
                    <td className="py-3 text-right">{formatNumber(result.industrialAccident.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.industrialAccident.employer)}원</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-green-300">
                  <tr>
                    <td className="py-3 font-bold text-neutral-800">합계</td>
                    <td className="py-3 text-right font-bold text-green-600">{formatNumber(result.totalEmployee)}원</td>
                    <td className="py-3 text-right font-bold text-emerald-600">{formatNumber(result.totalEmployer)}원</td>
                    <td className="py-3 text-right font-bold text-neutral-800">{formatNumber(result.grandTotal)}원</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-sm text-neutral-500">내가 내는 보험료</div>
                <div className="text-xl font-bold text-green-600">{formatNumber(result.totalEmployee)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-sm text-neutral-500">회사가 내는 보험료</div>
                <div className="text-xl font-bold text-emerald-600">{formatNumber(result.totalEmployer)}원</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">이용안내</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 2026년 4대보험 요율 기준으로 계산해요</li>
            <li>• 국민연금은 월 37만원~590만원 기준소득월액에서 계산해요</li>
            <li>• 산재보험료율은 업종 평균(0.7%)이며, 실제는 업종별로 달라요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
