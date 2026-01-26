"use client";

import { useState, useCallback, useEffect } from "react";

type LoanType = "metro-mortgage" | "local-mortgage" | "credit" | "other";

interface Loan {
  id: string;
  name: string;
  type: LoanType;
  amount: number;
  rate: number;
  years: number;
  monthlyPayment: number;
}

export default function StressDSRCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [existingLoans, setExistingLoans] = useState<Loan[]>([]);
  const [newLoanType, setNewLoanType] = useState<LoanType>("credit");
  const [newLoanAmount, setNewLoanAmount] = useState<number>(0);
  const [newLoanRate, setNewLoanRate] = useState<number>(4.0);
  const [newLoanYears, setNewLoanYears] = useState<number>(30);

  const [dsr, setDsr] = useState<number>(0);
  const [stressDsr, setStressDsr] = useState<number>(0);
  const [totalAnnualPayment, setTotalAnnualPayment] = useState<number>(0);
  const [stressTotalAnnualPayment, setStressTotalAnnualPayment] = useState<number>(0);
  const [newLoanMonthlyPayment, setNewLoanMonthlyPayment] = useState<number>(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);

  // 스트레스 금리 반환 (2026년 기준)
  const getStressRate = useCallback((type: LoanType): number => {
    switch (type) {
      case "metro-mortgage":
        return 3.0; // 수도권 주담대
      case "local-mortgage":
        return 0.75; // 지방 주담대 (2026년 6월까지)
      case "credit":
        return 1.5; // 신용대출
      case "other":
        return 1.5; // 기타
      default:
        return 1.5;
    }
  }, []);

  // 원리금균등 월 상환금 계산
  const calculateMonthlyPayment = useCallback((principal: number, rate: number, years: number): number => {
    if (principal <= 0 || rate <= 0 || years <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, []);

  // 최대 대출 가능 금액 계산 (스트레스 DSR 40% 기준)
  const calculateMaxLoan = useCallback((
    income: number,
    existingStressPayments: number,
    rate: number,
    years: number,
    loanType: LoanType
  ): number => {
    const maxAnnualPayment = income * 0.4; // DSR 40%
    const availableAnnualPayment = maxAnnualPayment - existingStressPayments;
    if (availableAnnualPayment <= 0) return 0;

    const availableMonthlyPayment = availableAnnualPayment / 12;
    const stressRate = getStressRate(loanType);
    const effectiveRate = rate + stressRate;
    const monthlyRate = effectiveRate / 100 / 12;
    const months = years * 12;

    // 원리금균등 역산
    const maxPrincipal = availableMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    return Math.max(0, Math.floor(maxPrincipal));
  }, [getStressRate]);

  // DSR 및 스트레스 DSR 계산
  useEffect(() => {
    // 기존 대출 연간 상환액 (실제 금리)
    const existingAnnualPayment = existingLoans.reduce((sum, loan) => sum + loan.monthlyPayment * 12, 0);

    // 기존 대출 연간 상환액 (스트레스 금리 적용)
    const existingStressAnnualPayment = existingLoans.reduce((sum, loan) => {
      const stressRate = getStressRate(loan.type);
      const effectiveRate = loan.rate + stressRate;
      const stressMonthly = calculateMonthlyPayment(loan.amount, effectiveRate, loan.years);
      return sum + stressMonthly * 12;
    }, 0);

    // 신규 대출 월 상환금 (실제 금리)
    const newMonthly = calculateMonthlyPayment(newLoanAmount, newLoanRate, newLoanYears);
    setNewLoanMonthlyPayment(Math.round(newMonthly));

    // 신규 대출 월 상환금 (스트레스 금리 적용)
    const newStressRate = getStressRate(newLoanType);
    const newEffectiveRate = newLoanRate + newStressRate;
    const newStressMonthly = calculateMonthlyPayment(newLoanAmount, newEffectiveRate, newLoanYears);

    // 총 연간 상환액
    const totalAnnual = existingAnnualPayment + newMonthly * 12;
    setTotalAnnualPayment(Math.round(totalAnnual));

    // 총 스트레스 연간 상환액
    const stressTotalAnnual = existingStressAnnualPayment + newStressMonthly * 12;
    setStressTotalAnnualPayment(Math.round(stressTotalAnnual));

    if (annualIncome > 0) {
      // 일반 DSR (실제 금리)
      setDsr((totalAnnual / annualIncome) * 100);
      // 스트레스 DSR (스트레스 금리 적용)
      setStressDsr((stressTotalAnnual / annualIncome) * 100);
      // 최대 대출 가능 금액 (스트레스 금리 기준)
      setMaxLoanAmount(calculateMaxLoan(annualIncome, existingStressAnnualPayment, newLoanRate, newLoanYears, newLoanType));
    } else {
      setDsr(0);
      setStressDsr(0);
      setMaxLoanAmount(0);
    }
  }, [annualIncome, existingLoans, newLoanAmount, newLoanRate, newLoanYears, newLoanType, calculateMonthlyPayment, calculateMaxLoan, getStressRate]);

  // 기존 대출 추가
  const addLoan = useCallback(() => {
    setExistingLoans((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `대출 ${prev.length + 1}`,
        type: "credit",
        amount: 0,
        rate: 4.0,
        years: 30,
        monthlyPayment: 0
      },
    ]);
  }, []);

  // 기존 대출 삭제
  const removeLoan = useCallback((id: string) => {
    setExistingLoans((prev) => prev.filter((loan) => loan.id !== id));
  }, []);

  // 기존 대출 수정
  const updateLoan = useCallback((id: string, field: keyof Loan, value: string | number | LoanType) => {
    setExistingLoans((prev) =>
      prev.map((loan) => {
        if (loan.id !== id) return loan;

        const updated = { ...loan, [field]: value };

        // 금액, 금리, 기간이 변경되면 월 상환금 재계산
        if (field === "amount" || field === "rate" || field === "years") {
          const monthly = calculateMonthlyPayment(
            field === "amount" ? (value as number) : updated.amount,
            field === "rate" ? (value as number) : updated.rate,
            field === "years" ? (value as number) : updated.years
          );
          updated.monthlyPayment = Math.round(monthly);
        }

        return updated;
      })
    );
  }, [calculateMonthlyPayment]);

  // 숫자 포맷팅
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

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

  // 스트레스 DSR 상태
  const getStressDsrStatus = (): { color: string; text: string; bg: string } => {
    if (stressDsr === 0) return { color: "text-neutral-500", text: "-", bg: "bg-neutral-50" };
    if (stressDsr <= 30) return { color: "text-green-600", text: "안전", bg: "bg-green-50" };
    if (stressDsr <= 40) return { color: "text-emerald-600", text: "적정", bg: "bg-blue-50" };
    if (stressDsr <= 50) return { color: "text-yellow-600", text: "주의", bg: "bg-yellow-50" };
    return { color: "text-red-600", text: "초과", bg: "bg-red-50" };
  };

  const stressDsrStatus = getStressDsrStatus();

  const loanTypes: { value: LoanType; label: string; stressRate: string }[] = [
    { value: "metro-mortgage", label: "수도권 주택담보", stressRate: "+3.0%" },
    { value: "local-mortgage", label: "지방 주택담보", stressRate: "+0.75%" },
    { value: "credit", label: "신용대출", stressRate: "+1.5%" },
    { value: "other", label: "기타 대출", stressRate: "+1.5%" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">신DSR 계산기 (스트레스 DSR)</h2>
            <p className="text-red-100 text-sm">미래 금리 상승 반영한 대출 한도 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 연소득 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            연소득 (세전)
          </label>
          <div className="relative">
            <input
              type="text"
              value={annualIncome > 0 ? formatNumber(annualIncome) : ""}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                setAnnualIncome(value);
              }}
              placeholder="세전 연봉"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {annualIncome > 0 && (
            <p className="mt-1 text-sm text-red-600">{formatWon(annualIncome)}</p>
          )}
        </div>

        {/* 기존 대출 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-neutral-700">기존 대출</label>
            <button
              onClick={addLoan}
              className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              + 대출 추가
            </button>
          </div>

          {existingLoans.length === 0 ? (
            <div className="p-4 bg-neutral-50 rounded-xl text-center text-sm text-neutral-500">
              기존 대출이 없으면 추가하지 않아도 돼요
            </div>
          ) : (
            <div className="space-y-3">
              {existingLoans.map((loan) => (
                <div key={loan.id} className="p-4 bg-neutral-50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={loan.name}
                      onChange={(e) => updateLoan(loan.id, "name", e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-red-500 focus:ring-0"
                      placeholder="대출명"
                    />
                    <button
                      onClick={() => removeLoan(loan.id)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">대출 유형</label>
                      <select
                        value={loan.type}
                        onChange={(e) => updateLoan(loan.id, "type", e.target.value as LoanType)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-red-500 focus:ring-0"
                      >
                        {loanTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label} ({type.stressRate})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">대출 금액</label>
                      <input
                        type="text"
                        value={loan.amount > 0 ? formatNumber(loan.amount) : ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                          updateLoan(loan.id, "amount", value);
                        }}
                        placeholder="0"
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-red-500 focus:ring-0 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">금리 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan.rate}
                        onChange={(e) => updateLoan(loan.id, "rate", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-red-500 focus:ring-0 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">상환 기간 (년)</label>
                      <input
                        type="number"
                        value={loan.years}
                        onChange={(e) => updateLoan(loan.id, "years", parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-red-500 focus:ring-0 text-right"
                      />
                    </div>
                  </div>

                  {loan.amount > 0 && loan.monthlyPayment > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                      <span className="text-xs text-neutral-600">월 상환액 (실제 금리)</span>
                      <span className="text-sm font-medium text-neutral-900">{formatWon(loan.monthlyPayment)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 신규 대출 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">신규 대출 계획</label>

          <div className="space-y-4 p-4 bg-red-50 rounded-xl">
            <div>
              <label className="block text-xs text-neutral-700 mb-2">대출 유형</label>
              <select
                value={newLoanType}
                onChange={(e) => setNewLoanType(e.target.value as LoanType)}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors"
              >
                {loanTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} (스트레스 금리 {type.stressRate})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-neutral-700 mb-2">대출 금액</label>
                <input
                  type="text"
                  value={newLoanAmount > 0 ? formatNumber(newLoanAmount) : ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                    setNewLoanAmount(value);
                  }}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors text-right"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-700 mb-2">금리 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newLoanRate}
                  onChange={(e) => setNewLoanRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors text-right"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-700 mb-2">상환 기간 (년)</label>
                <input
                  type="number"
                  value={newLoanYears}
                  onChange={(e) => setNewLoanYears(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors text-right"
                />
              </div>
            </div>

            {newLoanAmount > 0 && newLoanMonthlyPayment > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-red-200">
                <span className="text-sm text-neutral-700">월 상환액 (실제 금리)</span>
                <span className="text-lg font-bold text-red-600">{formatWon(newLoanMonthlyPayment)}</span>
              </div>
            )}
          </div>
        </div>

        {/* 결과 */}
        {annualIncome > 0 && (
          <div className="space-y-4">
            {/* DSR vs 스트레스 DSR 비교 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-50 rounded-xl">
                <div className="text-sm text-neutral-600 mb-2">일반 DSR (실제 금리)</div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">{dsr.toFixed(2)}%</div>
                <div className="text-xs text-neutral-500">
                  연간 상환액: {formatWon(totalAnnualPayment)}
                </div>
              </div>

              <div className={`p-5 ${stressDsrStatus.bg} rounded-xl border-2 ${stressDsrStatus.color.replace("text", "border")}`}>
                <div className="text-sm text-neutral-700 mb-2 font-medium">스트레스 DSR (스트레스 금리 적용)</div>
                <div className={`text-3xl font-bold ${stressDsrStatus.color} mb-1`}>
                  {stressDsr.toFixed(2)}%
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">
                    연간 상환액: {formatWon(stressTotalAnnualPayment)}
                  </span>
                  <span className={`text-xs font-bold ${stressDsrStatus.color}`}>
                    {stressDsrStatus.text}
                  </span>
                </div>
              </div>
            </div>

            {/* 최대 대출 가능 금액 */}
            <div className="p-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white">
              <div className="text-sm opacity-90 mb-2">스트레스 DSR 40% 기준 최대 대출 가능 금액</div>
              <div className="text-4xl font-bold mb-2">{formatWon(maxLoanAmount)}</div>
              <div className="text-xs opacity-80">
                현재 금리 {newLoanRate}% + 스트레스 금리 {getStressRate(newLoanType)}% = {(newLoanRate + getStressRate(newLoanType)).toFixed(2)}% 기준
              </div>
            </div>
          </div>
        )}

        {/* 이용안내 */}
        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
          <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            스트레스 DSR이란?
          </h4>
          <p className="text-sm text-red-700 mb-2">
            미래 금리가 오를 가능성을 미리 반영해서 대출 한도를 정하는 제도예요. <span className="font-medium">실제로 높은 이자를 내는 게 아니라, 한도를 계산할 때만 적용</span>돼요.
          </p>
          <div className="text-sm text-red-700 space-y-1">
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">수도권 주택담보</span>: 실제 금리 + 3.0%로 계산</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">지방 주택담보</span>: 실제 금리 + 0.75% (2026년 6월까지)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">신용대출/기타</span>: 실제 금리 + 1.5%</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span>스트레스 DSR <span className="font-medium">40%가 넘으면</span> 은행에서 대출이 어려워져요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
