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
      <div className="bg-gradient-to-r from-[#1E3A5F] to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">적금 계산기</h2>
            <p className="text-[#EDF2F8] text-sm">정기적금 만기 수령액 계산</p>
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
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">{type.label}</div>
                <div className={`text-xs mt-1 ${taxType === type.value ? "text-[#B8D0E8]" : "text-neutral-400"}`}>
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
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-[#2B5280] focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {monthlyAmount > 0 && <p className="mt-1 text-sm text-[#1E3A5F]">{formatWon(monthlyAmount)}</p>}

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
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#2B5280] text-right"
            />
            <div className="flex gap-2 mt-2">
              {[3, 4, 5, 6].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-1 rounded text-sm ${rate === r ? "bg-[#1E3A5F] text-white" : "bg-neutral-100"}`}
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
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-[#2B5280]"
            >
              {[6, 12, 18, 24, 36].map((m) => (
                <option key={m} value={m}>{m}개월{m >= 12 ? ` (${m / 12}년)` : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 결과 */}
        {monthlyAmount > 0 && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-2xl p-6 border border-[#EDF2F8]">
            <h3 className="text-lg font-bold text-[#132A42] mb-4">만기 수령액</h3>

            <div className="bg-white rounded-xl p-5 mb-4">
              <div className="text-sm text-neutral-500 mb-1">예상 만기 수령액</div>
              <div className="text-3xl font-bold text-[#1E3A5F]">{formatNumber(totalAmount)}원</div>
              <div className="text-sm text-neutral-500">{formatWon(totalAmount)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">총 납입금</div>
                <div className="text-xl font-bold text-neutral-800">{formatNumber(totalDeposit)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">세전 이자</div>
                <div className="text-xl font-bold text-[#1E3A5F]">{formatNumber(grossInterest)}원</div>
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
                <div className="text-xl font-bold text-[#1E3A5F]">{formatNumber(netInterest)}원</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-[#F5F8FB] rounded-xl border border-[#EDF2F8]">
          <h4 className="font-medium text-[#132A42] mb-2">적금 과세 유형</h4>
          <ul className="text-sm text-[#162F4F] space-y-1">
            <li>• 일반과세: 이자소득세 14% + 지방소득세 1.4% = 15.4%</li>
            <li>• 세금우대: 농어촌특별세 1.4% + 이자소득세 9.5% (일부 조건)</li>
            <li>• 비과세: 청년희망적금, 주택청약 등 특정 상품</li>
          </ul>
        </div>

        {/* 월납입금별 만기금액 비교표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 1년 적금 만기수령액 비교표</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">일반과세 15.4%, 금리 4% 기준</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">월 납입금</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">총 납입금</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">세후이자</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">만기수령액</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden sm:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">10만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">120만</td>
                  <td className="py-2 px-2 text-center text-[#1E3A5F] border border-gray-300">2.2만</td>
                  <td className="py-2 px-2 text-center font-bold border border-gray-300">122.2만</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">소소한 시작</td>
                </tr>
                <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">20만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">240만</td>
                  <td className="py-2 px-2 text-center text-[#1E3A5F] border border-gray-300">4.4만</td>
                  <td className="py-2 px-2 text-center font-bold border border-gray-300">244.4만</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">커피값 저축</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">30만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">360만</td>
                  <td className="py-2 px-2 text-center text-[#1E3A5F] border border-gray-300">6.6만</td>
                  <td className="py-2 px-2 text-center font-bold border border-gray-300">366.6만</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">월급쟁이 평균</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">50만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">600만</td>
                  <td className="py-2 px-2 text-center text-[#1E3A5F] border border-gray-300">11만</td>
                  <td className="py-2 px-2 text-center font-bold text-amber-600 border border-gray-300">611만</td>
                  <td className="py-2 px-2 text-center text-amber-600 border border-gray-300 hidden sm:table-cell">알뜰 저축러</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">100만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1,200만</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">22만</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">1,222만</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300 hidden sm:table-cell">목돈 1천 돌파!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
            <p className="text-xs text-[#132A42] font-medium">💡 적금 꿀팁</p>
            <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
              <li>• 적금은 <strong>월초에 입금</strong>해야 이자 조금이라도 더!</li>
              <li>• 비과세 적금 찾으면 세금 15.4% 절약</li>
              <li>• <strong>자동이체</strong> 설정하면 우대금리 0.1~0.3% 추가</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
