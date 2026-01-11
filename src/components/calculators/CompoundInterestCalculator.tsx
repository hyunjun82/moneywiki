"use client";

import { useState, useEffect } from "react";

type CompoundFrequency = "yearly" | "halfYearly" | "quarterly" | "monthly" | "daily";

interface YearlyData {
  year: number;
  simpleAmount: number;
  compoundAmount: number;
  difference: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10000000);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<CompoundFrequency>("yearly");

  const [simpleTotal, setSimpleTotal] = useState<number>(0);
  const [compoundTotal, setCompoundTotal] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);

  const getFrequencyValue = (freq: CompoundFrequency): number => {
    switch (freq) {
      case "yearly": return 1;
      case "halfYearly": return 2;
      case "quarterly": return 4;
      case "monthly": return 12;
      case "daily": return 365;
    }
  };

  useEffect(() => {
    if (principal <= 0 || rate <= 0 || years <= 0) {
      setSimpleTotal(0);
      setCompoundTotal(0);
      setDifference(0);
      setYearlyData([]);
      return;
    }

    const n = getFrequencyValue(frequency);
    const r = rate / 100;

    // 단리 계산
    const simpleInterest = principal * r * years;
    const simpleAmount = principal + simpleInterest;

    // 복리 계산
    const compoundAmount = principal * Math.pow(1 + r / n, n * years);

    setSimpleTotal(Math.round(simpleAmount));
    setCompoundTotal(Math.round(compoundAmount));
    setDifference(Math.round(compoundAmount - simpleAmount));

    // 연도별 데이터
    const data: YearlyData[] = [];
    for (let i = 1; i <= years; i++) {
      const simpleYearly = principal + principal * r * i;
      const compoundYearly = principal * Math.pow(1 + r / n, n * i);
      data.push({
        year: i,
        simpleAmount: Math.round(simpleYearly),
        compoundAmount: Math.round(compoundYearly),
        difference: Math.round(compoundYearly - simpleYearly)
      });
    }
    setYearlyData(data);
  }, [principal, rate, years, frequency]);

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

  const frequencies = [
    { value: "yearly", label: "연복리" },
    { value: "halfYearly", label: "반기복리" },
    { value: "quarterly", label: "분기복리" },
    { value: "monthly", label: "월복리" },
    { value: "daily", label: "일복리" }
  ];

  // 72의 법칙: 원금이 2배가 되는 년수
  const doubleYears = rate > 0 ? Math.round(72 / rate) : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">복리 계산기</h2>
            <p className="text-purple-100 text-sm">복리의 마법을 확인하세요</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 복리 주기 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">복리 주기</label>
          <div className="flex flex-wrap gap-2">
            {frequencies.map((freq) => (
              <button
                key={freq.value}
                onClick={() => setFrequency(freq.value as CompoundFrequency)}
                className={`py-2 px-4 rounded-xl font-medium transition-all ${
                  frequency === freq.value
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>

        {/* 원금 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">원금</label>
          <div className="relative">
            <input
              type="text"
              value={principal > 0 ? formatNumber(principal) : ""}
              onChange={(e) => setPrincipal(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="원금 입력"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {principal > 0 && <p className="mt-1 text-sm text-purple-600">{formatWon(principal)}</p>}

          <div className="flex gap-2 mt-3">
            {[10000000, 30000000, 50000000, 100000000, 500000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setPrincipal(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {amount >= 100000000 ? `${amount / 100000000}억` : `${amount / 10000}만`}
              </button>
            ))}
          </div>
        </div>

        {/* 금리/기간 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">연 수익률 (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              step="0.5"
              min="0"
              max="50"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-500 text-right"
            />
            <div className="flex gap-2 mt-2">
              {[3, 5, 7, 10].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-1 rounded text-sm ${rate === r ? "bg-purple-600 text-white" : "bg-neutral-100"}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">투자 기간 (년)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              min="1"
              max="50"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-purple-500 text-right"
            />
            <div className="flex gap-2 mt-2">
              {[5, 10, 20, 30].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`flex-1 py-1 rounded text-sm ${years === y ? "bg-purple-600 text-white" : "bg-neutral-100"}`}
                >
                  {y}년
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 */}
        {principal > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-bold text-purple-800 mb-4">복리 vs 단리 비교</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4 border-2 border-neutral-200">
                <div className="text-sm text-neutral-500 mb-1">단리 ({years}년 후)</div>
                <div className="text-2xl font-bold text-neutral-600">{formatNumber(simpleTotal)}원</div>
                <div className="text-xs text-neutral-500">{formatWon(simpleTotal)}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-purple-400">
                <div className="text-sm text-purple-600 mb-1">복리 ({years}년 후)</div>
                <div className="text-2xl font-bold text-purple-600">{formatNumber(compoundTotal)}원</div>
                <div className="text-xs text-neutral-500">{formatWon(compoundTotal)}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 mb-4">
              <div className="text-sm text-neutral-500 mb-1">복리 효과 (차이)</div>
              <div className="text-3xl font-bold text-pink-600">+{formatNumber(difference)}원</div>
              <div className="text-sm text-neutral-500">{formatWon(difference)} 더 받아요!</div>
            </div>

            {/* 72의 법칙 */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-600 font-bold">72의 법칙</span>
              </div>
              <div className="text-sm text-amber-700">
                연 {rate}% 수익률이면 약 <span className="font-bold">{doubleYears}년</span> 후에 원금이 2배가 돼요!
              </div>
            </div>

            {/* 연도별 비교 표 */}
            {yearlyData.length > 0 && (
              <div className="bg-white rounded-xl p-4 overflow-x-auto">
                <div className="text-sm font-medium text-neutral-700 mb-3">연도별 자산 증가</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-2 text-left text-neutral-500">년차</th>
                      <th className="py-2 text-right text-neutral-500">단리</th>
                      <th className="py-2 text-right text-purple-500">복리</th>
                      <th className="py-2 text-right text-pink-500">차이</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyData.filter((_, i) => i === 0 || i === Math.floor(years / 2) - 1 || i === years - 1).map((row) => (
                      <tr key={row.year} className="border-b border-neutral-100">
                        <td className="py-2 text-neutral-700">{row.year}년</td>
                        <td className="py-2 text-right">{formatWon(row.simpleAmount)}</td>
                        <td className="py-2 text-right font-medium text-purple-600">{formatWon(row.compoundAmount)}</td>
                        <td className="py-2 text-right text-pink-500">+{formatWon(row.difference)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-2">복리의 힘</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 복리: 이자에 이자가 붙어요 (눈덩이 효과)</li>
            <li>• 기간이 길수록, 금리가 높을수록 효과가 커요</li>
            <li>• 투자는 일찍 시작할수록 유리해요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
