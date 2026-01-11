"use client";

import { useState, useEffect } from "react";

type InterestType = "simple" | "compound";

export default function LoanInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(5);
  const [period, setPeriod] = useState<number>(12);
  const [interestType, setInterestType] = useState<InterestType>("simple");

  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);

  useEffect(() => {
    if (principal <= 0 || rate <= 0 || period <= 0) {
      setTotalInterest(0);
      setTotalAmount(0);
      setMonthlyInterest(0);
      return;
    }

    if (interestType === "simple") {
      // 단리
      const interest = principal * (rate / 100) * (period / 12);
      setTotalInterest(Math.round(interest));
      setTotalAmount(Math.round(principal + interest));
      setMonthlyInterest(Math.round(interest / period));
    } else {
      // 복리 (월복리)
      const monthlyRate = rate / 100 / 12;
      const amount = principal * Math.pow(1 + monthlyRate, period);
      const interest = amount - principal;
      setTotalInterest(Math.round(interest));
      setTotalAmount(Math.round(amount));
      setMonthlyInterest(Math.round(interest / period));
    }
  }, [principal, rate, period, interestType]);

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

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">대출이자 계산기</h2>
            <p className="text-red-100 text-sm">단리/복리 이자 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 이자 유형 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setInterestType("simple")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              interestType === "simple"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            단리
          </button>
          <button
            onClick={() => setInterestType("compound")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              interestType === "compound"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            복리 (월복리)
          </button>
        </div>

        {/* 원금 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">대출금액 (원금)</label>
          <div className="relative">
            <input
              type="text"
              value={principal > 0 ? formatNumber(principal) : ""}
              onChange={(e) => setPrincipal(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="대출금액"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {principal > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(principal)}</p>}

          <div className="flex gap-2 mt-3">
            {[10000000, 30000000, 50000000, 100000000, 200000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setPrincipal(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {amount >= 100000000 ? `${amount / 100000000}억` : `${amount / 10000}만`}
              </button>
            ))}
            <button onClick={() => setPrincipal(0)} className="py-2 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        {/* 금리/기간 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">연 이자율 (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              max="30"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 text-right"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">대출기간 (개월)</label>
            <select
              value={period}
              onChange={(e) => setPeriod(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[6, 12, 24, 36, 48, 60, 120, 240, 360].map((m) => (
                <option key={m} value={m}>{m}개월 ({m / 12}년)</option>
              ))}
            </select>
          </div>
        </div>

        {/* 결과 */}
        {principal > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">계산 결과</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">총 이자</div>
                <div className="text-2xl font-bold text-red-600">{formatNumber(totalInterest)}원</div>
                <div className="text-xs text-neutral-500">{formatWon(totalInterest)}</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">월 평균 이자</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(monthlyInterest)}원</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-neutral-500">총 상환금액</div>
                  <div className="text-xl font-bold text-neutral-800">{formatNumber(totalAmount)}원</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500">원금</div>
                  <div className="font-medium">{formatWon(principal)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">단리 vs 복리</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 단리: 원금에만 이자 발생 (예: 예금)</li>
            <li>• 복리: 원금+이자에 이자 발생 (예: 대출)</li>
            <li>• 대출은 보통 월복리로 계산해요</li>
          </ul>
        </div>

        {/* 금리별 월 이자 비교표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 금리별 월 이자 비교표 (단리 기준)</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">대출금액별 월 이자 비교 - 원금균등상환 첫 달 기준</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">금리 ↓ / 대출금 →</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">1억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">2억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">3억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">5억</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-green-700 border border-gray-300">3.0%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">25만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">50만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">75만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">125만원</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-green-600 border border-gray-300">3.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">29만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">58만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">87만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">145만원</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-emerald-700 border border-gray-300">4.0% ⭐</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">33만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">66만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">100만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300 hidden sm:table-cell">166만원</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-amber-600 border border-gray-300">4.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">37만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">75만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">112만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">187만원</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">5.0%</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">41만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">83만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">125만원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300 hidden sm:table-cell">208만원</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-orange-600 border border-gray-300">5.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">45만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">91만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">137만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">229만원</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">6.0% 🔥</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">50만원</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">100만원</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">150만원</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300 hidden sm:table-cell">250만원</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• <strong>금리 1% 차이</strong> = 1억당 월 <strong>8만원</strong> 차이</li>
              <li>• 3억 대출 시 금리 3% vs 6% = 월 75만원 차이! (연 900만원)</li>
              <li>• 대출 전 여러 은행 금리 비교는 필수!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
