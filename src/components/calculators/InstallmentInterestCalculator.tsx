"use client";

import { useState, useEffect } from "react";

type InstallmentType = "card" | "loan" | "auto";

export default function InstallmentInterestCalculator() {
  // 할부 유형
  const [installmentType, setInstallmentType] = useState<InstallmentType>("card");

  // 입력값
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1000000);
  const [months, setMonths] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(12); // 연이율 %

  // 결과값
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [realInterestRate, setRealInterestRate] = useState<number>(0);
  const [schedule, setSchedule] = useState<
    Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>
  >([]);

  // 유형별 기본 이율 설정
  const defaultRates: Record<InstallmentType, number> = {
    card: 12, // 카드 할부 평균
    loan: 8, // 신용대출 평균
    auto: 5, // 자동차 할부 평균
  };

  // 유형 변경 시 이율 업데이트
  useEffect(() => {
    setInterestRate(defaultRates[installmentType]);
  }, [installmentType]);

  // 원리금균등 상환 계산
  useEffect(() => {
    if (purchaseAmount <= 0 || months <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setSchedule([]);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;

    let monthly: number;
    if (monthlyRate === 0) {
      // 무이자 할부
      monthly = purchaseAmount / months;
    } else {
      // 원리금균등상환
      monthly =
        (purchaseAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const total = monthly * months;
    const interest = total - purchaseAmount;

    // 실질 연이율 계산 (단순 이자율 대비)
    const realRate = (interest / purchaseAmount) * (12 / months) * 100;

    setMonthlyPayment(Math.round(monthly));
    setTotalPayment(Math.round(total));
    setTotalInterest(Math.round(interest));
    setRealInterestRate(realRate);

    // 상환 스케줄 생성
    const newSchedule = [];
    let balance = purchaseAmount;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      balance = Math.max(balance - principalPayment, 0);

      newSchedule.push({
        month: i,
        payment: Math.round(monthly),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance),
      });
    }

    setSchedule(newSchedule);
  }, [purchaseAmount, months, interestRate]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const formatManWon = (num: number): string => {
    if (num >= 10000) {
      return `${formatNumber(Math.round(num / 10000))}만원`;
    }
    return `${formatNumber(num)}원`;
  };

  // 무이자 vs 유이자 비교
  const interestSavedIfFree = totalInterest;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">할부 이자 계산기</h2>
        <p className="text-emerald-100 text-sm mt-1">카드/대출/자동차 할부</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 할부 유형 선택 */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setInstallmentType("card")}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              installmentType === "card"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            카드 할부
          </button>
          <button
            onClick={() => setInstallmentType("loan")}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              installmentType === "loan"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            신용대출
          </button>
          <button
            onClick={() => setInstallmentType("auto")}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              installmentType === "auto"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            자동차 할부
          </button>
        </div>

        {/* 금액 입력 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            {installmentType === "auto" ? "차량 가격" : "할부 금액"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatNumber(purchaseAmount)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setPurchaseAmount(Number(value) || 0);
              }}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-emerald-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {installmentType === "auto"
              ? [20000000, 30000000, 40000000, 50000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPurchaseAmount(amount)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      purchaseAmount === amount
                        ? "bg-orange-500 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {amount / 10000}만원
                  </button>
                ))
              : [500000, 1000000, 2000000, 3000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPurchaseAmount(amount)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      purchaseAmount === amount
                        ? "bg-orange-500 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {formatManWon(amount)}
                  </button>
                ))}
          </div>
        </div>

        {/* 할부 기간 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            할부 기간
          </label>
          <div className="flex flex-wrap gap-2">
            {installmentType === "auto"
              ? [12, 24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      months === m
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {m}개월
                  </button>
                ))
              : [3, 6, 10, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      months === m
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {m}개월
                  </button>
                ))}
          </div>
        </div>

        {/* 이자율 설정 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-neutral-700">
              연 이자율
            </label>
            <button
              onClick={() => setInterestRate(0)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                interestRate === 0
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
            >
              무이자
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="w-20 text-center">
              <span className="text-lg font-bold text-emerald-600">
                {interestRate}
              </span>
              <span className="text-sm text-neutral-500">%</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[0, 5, 10, 15, 20].map((rate) => (
              <button
                key={rate}
                onClick={() => setInterestRate(rate)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  interestRate === rate
                    ? "bg-orange-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {rate === 0 ? "무이자" : `${rate}%`}
              </button>
            ))}
          </div>
        </div>

        {/* 결과 영역 */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">월 납부액</p>
            <p className="text-4xl font-bold text-emerald-600">
              {formatNumber(monthlyPayment)}
              <span className="text-xl font-normal text-neutral-500">원</span>
            </p>
          </div>

          <div className="border-t border-emerald-200 pt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">총 납부액</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatManWon(totalPayment)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">총 이자</p>
              <p className="text-lg font-semibold text-red-500">
                {formatNumber(totalInterest)}원
              </p>
            </div>
          </div>

          {interestRate > 0 && (
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="text-xs text-neutral-500 mb-1">
                무이자 할부 대비 추가 부담
              </p>
              <p className="text-lg font-bold text-red-500">
                +{formatNumber(interestSavedIfFree)}원
              </p>
            </div>
          )}
        </div>

        {/* 상환 스케줄 (일부만 표시) */}
        {schedule.length > 0 && (
          <div className="bg-neutral-50 rounded-xl p-4">
            <h3 className="font-semibold text-neutral-700 mb-3">
              상환 스케줄 (처음 6개월)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-2 text-left font-medium text-neutral-600">
                      회차
                    </th>
                    <th className="py-2 text-right font-medium text-neutral-600">
                      납부액
                    </th>
                    <th className="py-2 text-right font-medium text-neutral-600">
                      원금
                    </th>
                    <th className="py-2 text-right font-medium text-neutral-600">
                      이자
                    </th>
                    <th className="py-2 text-right font-medium text-neutral-600">
                      잔액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(0, 6).map((row) => (
                    <tr key={row.month} className="border-b border-neutral-100">
                      <td className="py-2 text-neutral-700">{row.month}회차</td>
                      <td className="py-2 text-right text-neutral-700">
                        {formatNumber(row.payment)}원
                      </td>
                      <td className="py-2 text-right text-neutral-600">
                        {formatNumber(row.principal)}원
                      </td>
                      <td className="py-2 text-right text-red-500">
                        {formatNumber(row.interest)}원
                      </td>
                      <td className="py-2 text-right text-neutral-600">
                        {formatNumber(row.balance)}원
                      </td>
                    </tr>
                  ))}
                  {schedule.length > 6 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-2 text-center text-neutral-500"
                      >
                        ... {schedule.length - 6}개월 더 있음
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 이자율 비교 */}
        <div className="bg-neutral-50 rounded-xl p-4">
          <h3 className="font-semibold text-neutral-700 mb-3">
            이자율별 총 이자 비교
          </h3>
          <div className="space-y-2">
            {[5, 10, 15, 20].map((rate) => {
              const monthlyR = rate / 100 / 12;
              const payment =
                monthlyR === 0
                  ? purchaseAmount / months
                  : (purchaseAmount *
                      monthlyR *
                      Math.pow(1 + monthlyR, months)) /
                    (Math.pow(1 + monthlyR, months) - 1);
              const totalI = payment * months - purchaseAmount;

              return (
                <div
                  key={rate}
                  className={`flex justify-between items-center p-2 rounded-lg ${
                    interestRate === rate ? "bg-orange-100" : ""
                  }`}
                >
                  <span className="text-sm text-neutral-600">연 {rate}%</span>
                  <span className="text-sm font-medium text-neutral-700">
                    이자 {formatNumber(Math.round(totalI))}원
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 안내 */}
        <div className="text-xs text-neutral-500 space-y-1">
          <p>※ 원리금균등상환 방식으로 계산해요.</p>
          <p>※ 실제 할부 조건은 카드사/금융사에 따라 다를 수 있어요.</p>
          <p>※ 무이자 할부 이벤트를 활용하면 이자를 절약할 수 있어요.</p>
        </div>
      </div>
    </div>
  );
}
