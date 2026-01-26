"use client";

import { useState, useCallback, useEffect } from "react";

type LoanCategory = "mortgage" | "other";

interface Loan {
  id: string;
  name: string;
  category: LoanCategory;
  amount: number;
  rate: number;
  years: number;
  monthlyPayment: number;
  monthlyInterest: number;
}

export default function DTICalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [existingLoans, setExistingLoans] = useState<Loan[]>([]);
  const [newLoanCategory, setNewLoanCategory] = useState<LoanCategory>("mortgage");
  const [newLoanAmount, setNewLoanAmount] = useState<number>(0);
  const [newLoanRate, setNewLoanRate] = useState<number>(4.0);
  const [newLoanYears, setNewLoanYears] = useState<number>(30);

  const [dti, setDti] = useState<number>(0);
  const [totalAnnualDti, setTotalAnnualDti] = useState<number>(0);
  const [newLoanMonthlyPayment, setNewLoanMonthlyPayment] = useState<number>(0);
  const [newLoanMonthlyInterest, setNewLoanMonthlyInterest] = useState<number>(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);

  // 원리금균등 월 상환금 계산
  const calculateMonthlyPayment = useCallback((principal: number, rate: number, years: number): number => {
    if (principal <= 0 || rate <= 0 || years <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, []);

  // 월 이자 계산
  const calculateMonthlyInterest = useCallback((principal: number, rate: number): number => {
    if (principal <= 0 || rate <= 0) return 0;
    return principal * (rate / 100 / 12);
  }, []);

  // 최대 대출 가능 금액 계산 (DTI 40% 기준, 주택담보대출)
  const calculateMaxLoan = useCallback((
    income: number,
    existingDtiPayments: number,
    rate: number,
    years: number
  ): number => {
    const maxAnnualPayment = income * 0.4; // DTI 40%
    const availableAnnualPayment = maxAnnualPayment - existingDtiPayments;
    if (availableAnnualPayment <= 0) return 0;

    const availableMonthlyPayment = availableAnnualPayment / 12;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    // 원리금균등 역산
    const maxPrincipal = availableMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    return Math.max(0, Math.floor(maxPrincipal));
  }, []);

  // DTI 계산
  useEffect(() => {
    // 기존 대출 DTI 연간 상환액
    const existingDtiAnnual = existingLoans.reduce((sum, loan) => {
      if (loan.category === "mortgage") {
        // 주택담보대출: 원리금
        return sum + loan.monthlyPayment * 12;
      } else {
        // 기타 대출: 이자만
        return sum + loan.monthlyInterest * 12;
      }
    }, 0);

    // 신규 대출 월 상환금 및 월 이자
    const newMonthly = calculateMonthlyPayment(newLoanAmount, newLoanRate, newLoanYears);
    const newInterest = calculateMonthlyInterest(newLoanAmount, newLoanRate);
    setNewLoanMonthlyPayment(Math.round(newMonthly));
    setNewLoanMonthlyInterest(Math.round(newInterest));

    // 신규 대출 DTI 연간 상환액
    const newDtiAnnual = newLoanCategory === "mortgage"
      ? newMonthly * 12  // 주택담보: 원리금
      : newInterest * 12; // 기타: 이자만

    // 총 DTI 연간 상환액
    const totalDtiAnnual = existingDtiAnnual + newDtiAnnual;
    setTotalAnnualDti(Math.round(totalDtiAnnual));

    if (annualIncome > 0) {
      // DTI 계산
      setDti((totalDtiAnnual / annualIncome) * 100);
      // 최대 대출 가능 금액 (주택담보대출 기준)
      setMaxLoanAmount(calculateMaxLoan(annualIncome, existingDtiAnnual, newLoanRate, newLoanYears));
    } else {
      setDti(0);
      setMaxLoanAmount(0);
    }
  }, [annualIncome, existingLoans, newLoanAmount, newLoanRate, newLoanYears, newLoanCategory, calculateMonthlyPayment, calculateMonthlyInterest, calculateMaxLoan]);

  // 기존 대출 추가
  const addLoan = useCallback(() => {
    setExistingLoans((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `대출 ${prev.length + 1}`,
        category: "other",
        amount: 0,
        rate: 4.0,
        years: 30,
        monthlyPayment: 0,
        monthlyInterest: 0
      },
    ]);
  }, []);

  // 기존 대출 삭제
  const removeLoan = useCallback((id: string) => {
    setExistingLoans((prev) => prev.filter((loan) => loan.id !== id));
  }, []);

  // 기존 대출 수정
  const updateLoan = useCallback((id: string, field: keyof Loan, value: string | number | LoanCategory) => {
    setExistingLoans((prev) =>
      prev.map((loan) => {
        if (loan.id !== id) return loan;

        const updated = { ...loan, [field]: value };

        // 금액, 금리, 기간, 카테고리가 변경되면 월 상환금 재계산
        if (field === "amount" || field === "rate" || field === "years" || field === "category") {
          const amount = field === "amount" ? (value as number) : updated.amount;
          const rate = field === "rate" ? (value as number) : updated.rate;
          const years = field === "years" ? (value as number) : updated.years;

          const monthly = calculateMonthlyPayment(amount, rate, years);
          const interest = calculateMonthlyInterest(amount, rate);

          updated.monthlyPayment = Math.round(monthly);
          updated.monthlyInterest = Math.round(interest);
        }

        return updated;
      })
    );
  }, [calculateMonthlyPayment, calculateMonthlyInterest]);

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

  // DTI 상태
  const getDtiStatus = (): { color: string; text: string; bg: string } => {
    if (dti === 0) return { color: "text-neutral-500", text: "-", bg: "bg-neutral-50" };
    if (dti <= 30) return { color: "text-green-600", text: "안전", bg: "bg-green-50" };
    if (dti <= 40) return { color: "text-blue-600", text: "적정", bg: "bg-blue-50" };
    if (dti <= 50) return { color: "text-yellow-600", text: "주의", bg: "bg-yellow-50" };
    return { color: "text-red-600", text: "초과", bg: "bg-red-50" };
  };

  const dtiStatus = getDtiStatus();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">DTI 계산기</h2>
            <p className="text-blue-100 text-sm">총부채상환비율 (주택담보대출 전용)</p>
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
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {annualIncome > 0 && (
            <p className="mt-1 text-sm text-blue-600">{formatWon(annualIncome)}</p>
          )}
        </div>

        {/* 기존 대출 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-neutral-700">기존 대출</label>
            <button
              onClick={addLoan}
              className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
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
                      className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-0"
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
                        value={loan.category}
                        onChange={(e) => updateLoan(loan.id, "category", e.target.value as LoanCategory)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-0"
                      >
                        <option value="mortgage">주택담보대출 (원리금)</option>
                        <option value="other">기타 대출 (이자만)</option>
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
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-0 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">금리 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan.rate}
                        onChange={(e) => updateLoan(loan.id, "rate", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-0 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">상환 기간 (년)</label>
                      <input
                        type="number"
                        value={loan.years}
                        onChange={(e) => updateLoan(loan.id, "years", parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-0 text-right"
                      />
                    </div>
                  </div>

                  {loan.amount > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                      <span className="text-xs text-neutral-600">
                        {loan.category === "mortgage" ? "월 원리금" : "월 이자"}
                      </span>
                      <span className="text-sm font-medium text-neutral-900">
                        {formatWon(loan.category === "mortgage" ? loan.monthlyPayment : loan.monthlyInterest)}
                      </span>
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

          <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
            <div>
              <label className="block text-xs text-neutral-700 mb-2">대출 유형</label>
              <select
                value={newLoanCategory}
                onChange={(e) => setNewLoanCategory(e.target.value as LoanCategory)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
              >
                <option value="mortgage">주택담보대출 (원리금 포함)</option>
                <option value="other">기타 대출 (이자만 포함)</option>
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
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors text-right"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-700 mb-2">금리 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newLoanRate}
                  onChange={(e) => setNewLoanRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors text-right"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-700 mb-2">상환 기간 (년)</label>
                <input
                  type="number"
                  value={newLoanYears}
                  onChange={(e) => setNewLoanYears(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors text-right"
                />
              </div>
            </div>

            {newLoanAmount > 0 && (
              <div className="space-y-2 pt-2 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">월 원리금 상환액</span>
                  <span className="text-lg font-bold text-blue-600">{formatWon(newLoanMonthlyPayment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">월 이자</span>
                  <span className="text-sm font-medium text-neutral-600">{formatWon(newLoanMonthlyInterest)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                  <span className="text-sm text-neutral-700">
                    DTI 계산 기준 월 상환액
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatWon(newLoanCategory === "mortgage" ? newLoanMonthlyPayment : newLoanMonthlyInterest)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 결과 */}
        {annualIncome > 0 && (
          <div className="space-y-4">
            {/* DTI 결과 */}
            <div className={`p-5 ${dtiStatus.bg} rounded-xl border-2 ${dtiStatus.color.replace("text", "border")}`}>
              <div className="text-sm text-neutral-700 mb-2 font-medium">DTI (총부채상환비율)</div>
              <div className={`text-3xl font-bold ${dtiStatus.color} mb-1`}>
                {dti.toFixed(2)}%
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600">
                  연간 DTI 상환액: {formatWon(totalAnnualDti)}
                </span>
                <span className={`text-xs font-bold ${dtiStatus.color}`}>
                  {dtiStatus.text}
                </span>
              </div>
            </div>

            {/* 최대 대출 가능 금액 */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white">
              <div className="text-sm opacity-90 mb-2">DTI 40% 기준 최대 주택담보대출 가능 금액</div>
              <div className="text-4xl font-bold mb-2">{formatWon(maxLoanAmount)}</div>
              <div className="text-xs opacity-80">
                금리 {newLoanRate}%, 상환 기간 {newLoanYears}년 기준
              </div>
            </div>
          </div>
        )}

        {/* 이용안내 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            DTI란?
          </h4>
          <p className="text-sm text-blue-700 mb-2">
            DTI는 주택담보대출을 위한 지표예요. <span className="font-medium">주택담보대출은 원리금 전체, 기타 대출은 이자만</span> 계산에 포함돼요.
          </p>
          <div className="text-sm text-blue-700 space-y-1">
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span><span className="font-medium">주택담보대출</span>: 원금 + 이자 모두 포함</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span><span className="font-medium">기타 대출</span> (신용대출, 카드론 등): 이자만 포함</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span>DTI <span className="font-medium">40%가 기준</span>이에요 (은행마다 차이 있을 수 있음)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span>DSR은 모든 대출의 원리금을 포함하는 더 엄격한 기준이에요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
