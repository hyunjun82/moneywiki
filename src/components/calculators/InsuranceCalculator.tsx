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

  // 2026년 4대보험 요율 (2026.1.1 시행)
  const RATES = {
    nationalPension: { employee: 0.0475, employer: 0.0475 }, // 9.5% (각 4.75%)
    healthInsurance: { employee: 0.03595, employer: 0.03595 }, // 7.19% (각 3.595%)
    longTermCareRate: 0.1314, // 건강보험료의 13.14%
    employmentInsurance: { employee: 0.009, employer: 0.0115 }, // 근로자 0.9%, 사업주 1.15% (실업0.9%+고용안정0.25%)
    industrialAccident: 0.007, // 업종 평균
  };

  // 10원 미만 절사 (실제 고지서 기준)
  const truncate10 = (num: number): number => Math.floor(num / 10) * 10;

  useEffect(() => {
    if (monthlySalary <= 0) {
      setResult(null);
      return;
    }

    // 국민연금 (상한액 637만원 기준월소득, 2025.7~2026.6 적용)
    const pensionBase = Math.min(Math.max(monthlySalary, 400000), 6370000);
    const nationalPension = {
      employee: truncate10(pensionBase * RATES.nationalPension.employee),
      employer: truncate10(pensionBase * RATES.nationalPension.employer),
      total: truncate10(pensionBase * (RATES.nationalPension.employee + RATES.nationalPension.employer)),
    };

    // 건강보험
    const healthInsurance = {
      employee: truncate10(monthlySalary * RATES.healthInsurance.employee),
      employer: truncate10(monthlySalary * RATES.healthInsurance.employer),
      total: truncate10(monthlySalary * (RATES.healthInsurance.employee + RATES.healthInsurance.employer)),
    };

    // 장기요양보험
    const longTermCare = {
      employee: truncate10(healthInsurance.employee * RATES.longTermCareRate),
      employer: truncate10(healthInsurance.employer * RATES.longTermCareRate),
      total: truncate10(healthInsurance.total * RATES.longTermCareRate),
    };

    // 고용보험
    const employmentInsurance = {
      employee: truncate10(monthlySalary * RATES.employmentInsurance.employee),
      employer: truncate10(monthlySalary * RATES.employmentInsurance.employer),
      total: truncate10(monthlySalary * (RATES.employmentInsurance.employee + RATES.employmentInsurance.employer)),
    };

    // 산재보험 (사업주만 부담)
    const industrialAccident = {
      employer: truncate10(monthlySalary * RATES.industrialAccident),
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
      <div className="bg-gradient-to-r from-[#1E3A5F] to-teal-600 px-6 py-4">
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
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-2xl p-6 border border-green-100">
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
                    <td className="py-3 text-neutral-700">국민연금 (4.75%)</td>
                    <td className="py-3 text-right">{formatNumber(result.nationalPension.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.nationalPension.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.nationalPension.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">건강보험 (3.595%)</td>
                    <td className="py-3 text-right">{formatNumber(result.healthInsurance.employee)}원</td>
                    <td className="py-3 text-right">{formatNumber(result.healthInsurance.employer)}원</td>
                    <td className="py-3 text-right font-medium">{formatNumber(result.healthInsurance.total)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-neutral-700">장기요양 (13.14%)</td>
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
                    <td className="py-3 text-right font-bold text-[#1E3A5F]">{formatNumber(result.totalEmployer)}원</td>
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
                <div className="text-xl font-bold text-[#1E3A5F]">{formatNumber(result.totalEmployer)}원</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-[#F5F8FB] rounded-xl border border-[#EDF2F8]">
          <h4 className="font-medium text-[#132A42] mb-2">이용안내</h4>
          <ul className="text-sm text-[#162F4F] space-y-1">
            <li>• 2026년 4대보험 요율 기준으로 계산해요</li>
            <li>• 국민연금은 월 40만원~637만원 기준소득월액에서 계산해요</li>
            <li>• 산재보험료율은 업종 평균(0.7%)이며, 실제는 업종별로 달라요</li>
          </ul>
        </div>

        {/* 월급별 4대보험료 비교표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 월급별 4대보험료 비교표 (2026년 기준)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">월급</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">국민연금</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden sm:table-cell">건강+장기요양</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden sm:table-cell">고용보험</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">본인부담 합계</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">2,156,880원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">102,310원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">87,720원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">19,410원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 20.9만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">최저임금급 🌱</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">250만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">118,750원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">101,670원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">22,500원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 24.3만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">신입사원 👶</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">300만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">142,500원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">122,020원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">27,000원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 29.2만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">3년차 평균 💼</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">400만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">190,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">162,690원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">36,000원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 38.9만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">대리급 ⭐</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">500만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">237,500원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">203,360원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">45,000원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 48.6만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">과장급 🌟</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">637만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">302,570원<br/><span className="text-xs text-gray-500">상한</span></td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">259,050원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">57,330원</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">약 61.9만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">연금 상한 도달! 🎯</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 국민연금 4.75%, 건강보험 3.595%, 장기요양 13.14%(건보의), 고용보험 0.9%</p>

          <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
            <p className="text-xs text-[#132A42] font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
              <li>• 월급의 약 9.7%가 4대보험료로 빠져요 (2026년 기준)</li>
              <li>• 국민연금은 월 637만원 초과해도 302,570원이 최대!</li>
              <li>• 회사도 같은 금액을 부담해서 총 19.4%가 적립돼요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
