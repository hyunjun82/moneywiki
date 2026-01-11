"use client";

import { useState, useEffect } from "react";

type TaxType = "general" | "taxFree" | "taxPreferred";
type InterestType = "simple" | "compound";

export default function DepositInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(4);
  const [period, setPeriod] = useState<number>(12);
  const [taxType, setTaxType] = useState<TaxType>("general");
  const [interestType, setInterestType] = useState<InterestType>("simple");

  const [grossInterest, setGrossInterest] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [netInterest, setNetInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);

  useEffect(() => {
    if (principal <= 0 || rate <= 0 || period <= 0) {
      setGrossInterest(0);
      setTax(0);
      setNetInterest(0);
      setTotalAmount(0);
      setMonthlyInterest(0);
      return;
    }

    let interest = 0;
    if (interestType === "simple") {
      // 단리
      interest = principal * (rate / 100) * (period / 12);
    } else {
      // 복리 (월복리)
      const monthlyRate = rate / 100 / 12;
      interest = principal * (Math.pow(1 + monthlyRate, period) - 1);
    }

    setGrossInterest(Math.round(interest));

    // 세금 계산
    let taxRate = 0;
    if (taxType === "general") {
      taxRate = 0.154;
    } else if (taxType === "taxPreferred") {
      taxRate = 0.095;
    }

    const taxAmount = Math.round(interest * taxRate);
    setTax(taxAmount);
    setNetInterest(Math.round(interest - taxAmount));
    setTotalAmount(Math.round(principal + interest - taxAmount));
    setMonthlyInterest(Math.round((interest - taxAmount) / period));
  }, [principal, rate, period, taxType, interestType]);

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">예금이자 계산기</h2>
            <p className="text-emerald-100 text-sm">정기예금 이자 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 이자 계산 방식 */}
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
            월복리
          </button>
        </div>

        {/* 과세유형 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">과세 유형</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "general", label: "일반과세", rate: "15.4%" },
              { value: "taxPreferred", label: "세금우대", rate: "9.5%" },
              { value: "taxFree", label: "비과세", rate: "0%" }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setTaxType(type.value as TaxType)}
                className={`py-2 px-2 rounded-xl font-medium transition-all text-center ${
                  taxType === type.value
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">{type.label}</div>
                <div className={`text-xs ${taxType === type.value ? "text-blue-200" : "text-neutral-400"}`}>
                  {type.rate}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 예금액 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">예금액</label>
          <div className="relative">
            <input
              type="text"
              value={principal > 0 ? formatNumber(principal) : ""}
              onChange={(e) => setPrincipal(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="예금액 입력"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {principal > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(principal)}</p>}

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
            <label className="block text-sm font-medium text-neutral-700 mb-2">연 이자율 (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              max="20"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 text-right"
            />
            <div className="flex gap-2 mt-2">
              {[3, 3.5, 4, 4.5, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-1 rounded text-xs ${rate === r ? "bg-emerald-600 text-white" : "bg-neutral-100"}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">예금 기간</label>
            <select
              value={period}
              onChange={(e) => setPeriod(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[3, 6, 12, 24, 36].map((m) => (
                <option key={m} value={m}>{m}개월{m >= 12 ? ` (${m / 12}년)` : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 결과 */}
        {principal > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">만기 수령액</h3>

            <div className="bg-white rounded-xl p-5 mb-4">
              <div className="text-sm text-neutral-500 mb-1">예상 만기 수령액</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(totalAmount)}원</div>
              <div className="text-sm text-neutral-500">{formatWon(totalAmount)}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">세전 이자</div>
                <div className="text-lg font-bold text-neutral-800">{formatNumber(grossInterest)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">세금</div>
                <div className="text-lg font-bold text-red-500">-{formatNumber(tax)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">세후 이자</div>
                <div className="text-lg font-bold text-emerald-600">{formatNumber(netInterest)}원</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-neutral-500">월 평균 이자</div>
                  <div className="text-xl font-bold text-neutral-800">{formatNumber(monthlyInterest)}원</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500">실효 수익률</div>
                  <div className="text-lg font-bold text-emerald-600">
                    {((netInterest / principal) * (12 / period) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">예금 vs 적금</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 예금: 목돈을 한 번에 예치, 이자 수령</li>
            <li>• 적금: 매월 일정 금액 납입, 만기에 수령</li>
            <li>• 같은 금리면 예금 이자가 더 많아요</li>
          </ul>
        </div>

        {/* 예금액/금리별 이자 비교표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 1년 정기예금 세후이자 비교표</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">일반과세 15.4% 적용, 단리 기준</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">금리 ↓ / 예금액 →</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">1천만</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">3천만</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">5천만</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">1억</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-neutral-600 border border-gray-300">3.0%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">25.4만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">76.1만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">126.9만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">253.8만</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-emerald-700 border border-gray-300">3.5%</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">29.6만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">88.8만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">148.1만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300 hidden sm:table-cell">296.1만</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-emerald-600 border border-gray-300">4.0% ⭐</td>
                  <td className="py-2 px-2 text-center border border-gray-300">33.8만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">101.5만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">169.2만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">338.4만</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">4.5%</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">38.1만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">114.2만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">190.3만</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300 hidden sm:table-cell">380.7만</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">5.0%</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">42.3만</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">126.9만</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">211.5만</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300 hidden sm:table-cell">423만</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 예금 꿀팁</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• <strong>금리 0.5%</strong> 차이 = 1천만원당 연 <strong>4.2만원</strong> 차이</li>
              <li>• 1억 예금 시 금리 3% vs 5% = 연 169만원 차이!</li>
              <li>• <strong>특판 예금</strong> 찾으면 0.3~0.5% 추가 금리 가능</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
