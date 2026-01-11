"use client";

import { useState, useEffect } from "react";

type TaxType = "general" | "taxFree" | "taxPreferred";

export default function SavingsCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(4);
  const [period, setPeriod] = useState<number>(12);
  const [taxType, setTaxType] = useState<TaxType>("general");

  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [grossInterest, setGrossInterest] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [netInterest, setNetInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (monthlyAmount <= 0 || rate <= 0 || period <= 0) {
      setTotalDeposit(0);
      setGrossInterest(0);
      setTax(0);
      setNetInterest(0);
      setTotalAmount(0);
      return;
    }

    // 적금 이자 계산 (월복리)
    const monthlyRate = rate / 100 / 12;
    let interest = 0;

    // 매월 납입금에 대한 이자 계산
    for (let i = 1; i <= period; i++) {
      const months = period - i + 1; // 해당 납입금이 예치되는 개월 수
      interest += monthlyAmount * monthlyRate * months;
    }

    const deposit = monthlyAmount * period;
    setTotalDeposit(deposit);
    setGrossInterest(Math.round(interest));

    // 세금 계산
    let taxRate = 0;
    if (taxType === "general") {
      taxRate = 0.154; // 일반과세 15.4%
    } else if (taxType === "taxPreferred") {
      taxRate = 0.095; // 세금우대 9.5%
    }
    // 비과세는 0%

    const taxAmount = Math.round(interest * taxRate);
    setTax(taxAmount);
    setNetInterest(Math.round(interest - taxAmount));
    setTotalAmount(Math.round(deposit + interest - taxAmount));
  }, [monthlyAmount, rate, period, taxType]);

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

  const taxTypes = [
    { value: "general", label: "일반과세", rate: "15.4%" },
    { value: "taxPreferred", label: "세금우대", rate: "9.5%" },
    { value: "taxFree", label: "비과세", rate: "0%" }
  ];

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
            <h2 className="text-xl font-bold text-white">적금 계산기</h2>
            <p className="text-emerald-100 text-sm">정기적금 만기 수령액 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 과세유형 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">과세 유형</label>
          <div className="grid grid-cols-3 gap-2">
            {taxTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setTaxType(type.value as TaxType)}
                className={`py-3 px-2 rounded-xl font-medium transition-all text-center ${
                  taxType === type.value
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">{type.label}</div>
                <div className={`text-xs mt-1 ${taxType === type.value ? "text-emerald-200" : "text-neutral-400"}`}>
                  {type.rate}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 월 납입금 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">월 납입금</label>
          <div className="relative">
            <input
              type="text"
              value={monthlyAmount > 0 ? formatNumber(monthlyAmount) : ""}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="월 납입금 입력"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {monthlyAmount > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(monthlyAmount)}</p>}

          <div className="flex gap-2 mt-3">
            {[100000, 200000, 300000, 500000, 1000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setMonthlyAmount(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {amount >= 1000000 ? `${amount / 10000}만` : `${amount / 10000}만`}
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
              {[3, 4, 5, 6].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-1 rounded text-sm ${rate === r ? "bg-emerald-600 text-white" : "bg-neutral-100"}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">적금 기간</label>
            <select
              value={period}
              onChange={(e) => setPeriod(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[6, 12, 18, 24, 36].map((m) => (
                <option key={m} value={m}>{m}개월{m >= 12 ? ` (${m / 12}년)` : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 결과 */}
        {monthlyAmount > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">만기 수령액</h3>

            <div className="bg-white rounded-xl p-5 mb-4">
              <div className="text-sm text-neutral-500 mb-1">예상 만기 수령액</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(totalAmount)}원</div>
              <div className="text-sm text-neutral-500">{formatWon(totalAmount)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">총 납입금</div>
                <div className="text-xl font-bold text-neutral-800">{formatNumber(totalDeposit)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">세전 이자</div>
                <div className="text-xl font-bold text-blue-600">{formatNumber(grossInterest)}원</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">
                  이자소득세 ({taxType === "general" ? "15.4%" : taxType === "taxPreferred" ? "9.5%" : "0%"})
                </div>
                <div className="text-xl font-bold text-red-500">-{formatNumber(tax)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">세후 이자</div>
                <div className="text-xl font-bold text-emerald-600">{formatNumber(netInterest)}원</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="font-medium text-amber-800 mb-2">적금 과세 유형</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 일반과세: 이자소득세 14% + 지방소득세 1.4% = 15.4%</li>
            <li>• 세금우대: 농어촌특별세 1.4% + 이자소득세 9.5% (일부 조건)</li>
            <li>• 비과세: 청년희망적금, 주택청약 등 특정 상품</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
