"use client";

import { useState, useCallback, useEffect } from "react";

interface Loan {
  id: string;
  name: string;
  monthlyPayment: number;
}

type LoanType = "mortgage" | "credit" | "other";
type Region = "capital" | "local";

export default function DSRCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [existingLoans, setExistingLoans] = useState<Loan[]>([]);
  const [newLoanAmount, setNewLoanAmount] = useState<number>(0);
  const [newLoanRate, setNewLoanRate] = useState<number>(4.0);
  const [newLoanYears, setNewLoanYears] = useState<number>(30);
  const [loanType, setLoanType] = useState<LoanType>("mortgage");
  const [region, setRegion] = useState<Region>("capital");
  const [useStressDsr, setUseStressDsr] = useState<boolean>(true);

  const [dsr, setDsr] = useState<number>(0);
  const [stressDsr, setStressDsr] = useState<number>(0);
  const [totalAnnualPayment, setTotalAnnualPayment] = useState<number>(0);
  const [stressAnnualPayment, setStressAnnualPayment] = useState<number>(0);
  const [newLoanMonthlyPayment, setNewLoanMonthlyPayment] = useState<number>(0);
  const [stressMonthlyPayment, setStressMonthlyPayment] = useState<number>(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [stressMaxLoanAmount, setStressMaxLoanAmount] = useState<number>(0);

  // 스트레스 금리 가산 (2024.10.15 대책 기준)
  const getStressRate = useCallback((): number => {
    if (loanType === "mortgage") {
      // 주택담보대출
      if (region === "capital") return 3.0; // 수도권/규제지역
      return 0.75; // 지방 (2025년 말까지)
    } else if (loanType === "credit") {
      // 신용대출 (1억원 초과 시에만 적용, 여기서는 기본 적용)
      return 1.5;
    }
    return 0;
  }, [loanType, region]);

  // 원리금균등 월 상환금 계산
  const calculateMonthlyPayment = useCallback((principal: number, rate: number, years: number): number => {
    if (principal <= 0 || rate <= 0 || years <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }, []);

  // 최대 대출 가능 금액 계산 (DSR 40% 기준)
  const calculateMaxLoan = useCallback((income: number, existingPayments: number, rate: number, years: number): number => {
    const maxAnnualPayment = income * 0.4; // DSR 40%
    const availableAnnualPayment = maxAnnualPayment - existingPayments;
    if (availableAnnualPayment <= 0) return 0;

    const availableMonthlyPayment = availableAnnualPayment / 12;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    // 원리금균등 역산
    const maxPrincipal = availableMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    return Math.max(0, Math.floor(maxPrincipal));
  }, []);

  // DSR 계산 (일반 + 스트레스)
  useEffect(() => {
    const existingAnnualPayment = existingLoans.reduce((sum, loan) => sum + loan.monthlyPayment * 12, 0);

    // 일반 DSR
    const newMonthly = calculateMonthlyPayment(newLoanAmount, newLoanRate, newLoanYears);
    setNewLoanMonthlyPayment(Math.round(newMonthly));
    const totalAnnual = existingAnnualPayment + newMonthly * 12;
    setTotalAnnualPayment(Math.round(totalAnnual));

    // 스트레스 DSR (가산금리 적용)
    const stressRate = getStressRate();
    const stressAppliedRate = newLoanRate + stressRate;
    const stressMonthly = calculateMonthlyPayment(newLoanAmount, stressAppliedRate, newLoanYears);
    setStressMonthlyPayment(Math.round(stressMonthly));
    const stressTotal = existingAnnualPayment + stressMonthly * 12;
    setStressAnnualPayment(Math.round(stressTotal));

    if (annualIncome > 0) {
      // 일반 DSR
      setDsr((totalAnnual / annualIncome) * 100);
      setMaxLoanAmount(calculateMaxLoan(annualIncome, existingAnnualPayment, newLoanRate, newLoanYears));

      // 스트레스 DSR
      setStressDsr((stressTotal / annualIncome) * 100);
      setStressMaxLoanAmount(calculateMaxLoan(annualIncome, existingAnnualPayment, stressAppliedRate, newLoanYears));
    } else {
      setDsr(0);
      setStressDsr(0);
      setMaxLoanAmount(0);
      setStressMaxLoanAmount(0);
    }
  }, [annualIncome, existingLoans, newLoanAmount, newLoanRate, newLoanYears, loanType, region, calculateMonthlyPayment, calculateMaxLoan, getStressRate]);

  // 기존 대출 추가
  const addLoan = useCallback(() => {
    setExistingLoans((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `대출 ${prev.length + 1}`, monthlyPayment: 0 },
    ]);
  }, []);

  // 기존 대출 삭제
  const removeLoan = useCallback((id: string) => {
    setExistingLoans((prev) => prev.filter((loan) => loan.id !== id));
  }, []);

  // 기존 대출 수정
  const updateLoan = useCallback((id: string, field: keyof Loan, value: string | number) => {
    setExistingLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, [field]: value } : loan
      )
    );
  }, []);

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

  // DSR 상태 (스트레스 DSR 고려)
  const getDsrStatus = (dsrValue: number): { color: string; text: string; bg: string } => {
    if (dsrValue === 0) return { color: "text-neutral-500", text: "-", bg: "bg-neutral-50" };
    if (dsrValue <= 30) return { color: "text-green-600", text: "안전", bg: "bg-green-50" };
    if (dsrValue <= 40) return { color: "text-emerald-600", text: "대출 가능", bg: "bg-blue-50" };
    if (dsrValue <= 50) return { color: "text-yellow-600", text: "제2금융권", bg: "bg-yellow-50" };
    return { color: "text-red-600", text: "초과", bg: "bg-red-50" };
  };

  const currentDsr = useStressDsr ? stressDsr : dsr;
  const currentMaxLoan = useStressDsr ? stressMaxLoanAmount : maxLoanAmount;
  const currentAnnualPayment = useStressDsr ? stressAnnualPayment : totalAnnualPayment;
  const currentMonthlyPayment = useStressDsr ? stressMonthlyPayment : newLoanMonthlyPayment;
  const dsrStatus = getDsrStatus(currentDsr);

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">DSR 계산기</h2>
            <p className="text-emerald-100 text-sm">총부채원리금상환비율 계산</p>
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
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {annualIncome > 0 && (
            <p className="mt-1 text-sm text-emerald-600">{formatWon(annualIncome)}</p>
          )}

          <div className="flex gap-2 mt-2">
            <button onClick={() => setAnnualIncome(40000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">4천만원</button>
            <button onClick={() => setAnnualIncome(50000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">5천만원</button>
            <button onClick={() => setAnnualIncome(60000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">6천만원</button>
            <button onClick={() => setAnnualIncome(80000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">8천만원</button>
            <button onClick={() => setAnnualIncome(100000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">1억원</button>
          </div>
        </div>

        {/* 기존 대출 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-700">
              기존 대출 (월 상환금 합계)
            </label>
            <button
              onClick={addLoan}
              className="px-3 py-1 text-sm bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              + 대출 추가
            </button>
          </div>

          {existingLoans.length === 0 ? (
            <div className="p-4 bg-neutral-50 rounded-xl text-center text-sm text-neutral-500">
              기존 대출이 없으면 신규 대출만 계산됩니다
            </div>
          ) : (
            <div className="space-y-2">
              {existingLoans.map((loan) => (
                <div key={loan.id} className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl">
                  <input
                    type="text"
                    value={loan.name}
                    onChange={(e) => updateLoan(loan.id, "name", e.target.value)}
                    className="w-24 px-2 py-1 text-sm border border-neutral-200 rounded-lg focus:border-emerald-500"
                    placeholder="대출명"
                  />
                  <input
                    type="text"
                    value={loan.monthlyPayment > 0 ? formatNumber(loan.monthlyPayment) : ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                      updateLoan(loan.id, "monthlyPayment", value);
                    }}
                    className="flex-1 px-3 py-1 text-sm border border-neutral-200 rounded-lg focus:border-emerald-500 text-right"
                    placeholder="월 상환금"
                  />
                  <span className="text-sm text-neutral-500">원/월</span>
                  <button
                    onClick={() => removeLoan(loan.id)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 신규 대출 */}
        <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">신규 대출 (받고 싶은 대출)</h4>

          <div className="space-y-3">
            {/* 대출 종류 */}
            <div>
              <label className="block text-xs text-neutral-600 mb-1">대출 종류</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLoanType("mortgage")}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    loanType === "mortgage"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  주택담보
                </button>
                <button
                  onClick={() => setLoanType("credit")}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    loanType === "credit"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  신용대출
                </button>
                <button
                  onClick={() => setLoanType("other")}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    loanType === "other"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  기타
                </button>
              </div>
            </div>

            {/* 지역 선택 (주택담보대출만) */}
            {loanType === "mortgage" && (
              <div>
                <label className="block text-xs text-neutral-600 mb-1">주택 소재지</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRegion("capital")}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      region === "capital"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    수도권/규제지역
                  </button>
                  <button
                    onClick={() => setRegion("local")}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      region === "local"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    지방
                  </button>
                </div>
              </div>
            )}

            {/* 대출금액 */}
            <div>
              <label className="block text-xs text-neutral-600 mb-1">대출금액</label>
              <div className="relative">
                <input
                  type="text"
                  value={newLoanAmount > 0 ? formatNumber(newLoanAmount) : ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                    setNewLoanAmount(value);
                  }}
                  placeholder="희망 대출금액"
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:border-emerald-500 text-right pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">원</span>
              </div>
              {newLoanAmount > 0 && (
                <p className="text-xs text-emerald-600 mt-1">{formatWon(newLoanAmount)}</p>
              )}
            </div>

            {/* 금리/기간 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-neutral-600 mb-1">금리 (연 %)</label>
                <input
                  type="number"
                  value={newLoanRate}
                  onChange={(e) => setNewLoanRate(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="20"
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:border-emerald-500 text-right"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-600 mb-1">대출기간</label>
                <select
                  value={newLoanYears}
                  onChange={(e) => setNewLoanYears(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:border-emerald-500"
                >
                  <option value={10}>10년</option>
                  <option value={15}>15년</option>
                  <option value={20}>20년</option>
                  <option value={25}>25년</option>
                  <option value={30}>30년</option>
                  <option value={35}>35년</option>
                  <option value={40}>40년</option>
                </select>
              </div>
            </div>

            {newLoanMonthlyPayment > 0 && (
              <div className="p-2 bg-white rounded-lg text-sm">
                <span className="text-neutral-500">예상 월 상환금:</span>
                <span className="font-bold text-emerald-600 ml-2">{formatNumber(newLoanMonthlyPayment)}원</span>
                {useStressDsr && getStressRate() > 0 && (
                  <span className="text-orange-600 ml-2 text-xs">(스트레스: {formatNumber(stressMonthlyPayment)}원)</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 스트레스 DSR 토글 */}
        <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-orange-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                스트레스 DSR 적용
              </h4>
              <p className="text-xs text-orange-600 mt-1">
                실제 은행 심사 기준 (10.15 대책)
              </p>
            </div>
            <button
              onClick={() => setUseStressDsr(!useStressDsr)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                useStressDsr ? "bg-orange-500" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  useStressDsr ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
          {useStressDsr && getStressRate() > 0 && (
            <div className="mt-3 p-2 bg-white rounded-lg text-sm">
              <span className="text-orange-700">
                적용 가산금리: <strong>+{getStressRate().toFixed(2)}%p</strong>
                <span className="text-xs text-orange-500 ml-1">
                  ({loanType === "mortgage" ? (region === "capital" ? "수도권" : "지방") : "신용대출"})
                </span>
              </span>
            </div>
          )}
        </div>

        {/* DSR 결과 */}
        <div className={`rounded-2xl p-6 border ${dsrStatus.bg} border-opacity-50`}>
          <h3 className="text-lg font-bold text-neutral-800 mb-4">
            DSR 계산 결과
            {useStressDsr && <span className="text-sm font-normal text-orange-600 ml-2">(스트레스 DSR)</span>}
          </h3>

          <div className="space-y-4">
            {/* DSR 비교 (일반 vs 스트레스) */}
            {annualIncome > 0 && newLoanAmount > 0 && getStressRate() > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div className={`bg-white rounded-xl p-4 text-center ${!useStressDsr ? "ring-2 ring-emerald-500" : ""}`}>
                  <div className="text-xs text-neutral-500 mb-1">일반 DSR</div>
                  <div className={`text-2xl font-bold ${getDsrStatus(dsr).color}`}>
                    {dsr.toFixed(1)}%
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">금리 {newLoanRate}%</div>
                </div>
                <div className={`bg-white rounded-xl p-4 text-center ${useStressDsr ? "ring-2 ring-orange-500" : ""}`}>
                  <div className="text-xs text-orange-500 mb-1 font-medium">스트레스 DSR</div>
                  <div className={`text-2xl font-bold ${getDsrStatus(stressDsr).color}`}>
                    {stressDsr.toFixed(1)}%
                  </div>
                  <div className="text-xs text-orange-500 mt-1">금리 {(newLoanRate + getStressRate()).toFixed(1)}%</div>
                </div>
              </div>
            )}

            {/* 주요 DSR */}
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-sm text-neutral-500 mb-2">
                {useStressDsr ? "스트레스 DSR (실제 심사 기준)" : "일반 DSR"}
              </div>
              <div className={`text-4xl font-bold ${dsrStatus.color}`}>
                {currentDsr > 0 ? currentDsr.toFixed(1) : "-"}%
              </div>
              <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium inline-block ${dsrStatus.bg} ${dsrStatus.color}`}>
                {currentDsr > 0 ? (currentDsr <= 40 ? "은행권 가능" : currentDsr <= 50 ? "제2금융권 가능" : "대출 제한") : "정보를 입력하세요"}
              </div>
            </div>

            {/* 상세 정보 */}
            {annualIncome > 0 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-xs text-neutral-500 mb-1">연 소득</div>
                    <div className="font-bold text-neutral-800">{formatWon(annualIncome)}</div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="text-xs text-neutral-500 mb-1">
                      연간 상환액 {useStressDsr && <span className="text-orange-500">(스트레스)</span>}
                    </div>
                    <div className="font-bold text-neutral-800">{formatWon(currentAnnualPayment)}</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-neutral-500 mb-2">
                    DSR 40% 기준 최대 대출 가능액
                    {useStressDsr && <span className="text-orange-500 text-xs ml-1">(스트레스 기준)</span>}
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {currentMaxLoan > 0 ? formatWon(currentMaxLoan) : "불가"}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    (금리 {useStressDsr ? (newLoanRate + getStressRate()).toFixed(1) : newLoanRate}%, {newLoanYears}년 기준)
                  </div>
                  {useStressDsr && maxLoanAmount > stressMaxLoanAmount && (
                    <div className="text-xs text-red-500 mt-2">
                      ⚠️ 스트레스 DSR로 인해 약 {formatWon(maxLoanAmount - stressMaxLoanAmount)} 한도 감소
                    </div>
                  )}
                </div>

                {/* DSR 바 */}
                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between text-xs text-neutral-500 mb-2">
                    <span>0%</span>
                    <span>40% (은행)</span>
                    <span>50% (2금융)</span>
                    <span>100%</span>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded-full overflow-hidden relative">
                    {/* 40% 기준선 */}
                    <div className="absolute left-[40%] top-0 bottom-0 w-0.5 bg-red-400 z-10"></div>
                    {/* 50% 기준선 */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-yellow-400 z-10"></div>
                    {/* DSR 바 */}
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentDsr <= 40 ? "bg-gradient-to-r from-green-400 to-blue-500" :
                        currentDsr <= 50 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                        "bg-gradient-to-r from-orange-400 to-red-500"
                      }`}
                      style={{ width: `${Math.min(currentDsr, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className={dsrStatus.color}>현재: {currentDsr.toFixed(1)}%</span>
                    <span className="text-neutral-500">여유: {Math.max(0, 40 - currentDsr).toFixed(1)}%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* DSR 기준 안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">DSR 규제 기준 (2026년)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">은행권</span>
              <span className="font-medium text-emerald-600">DSR 40%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">제2금융권</span>
              <span className="font-medium text-emerald-600">DSR 50%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">서민금융</span>
              <span className="font-medium text-green-600">DSR 60%</span>
            </div>
          </div>
        </div>

        {/* 스트레스 DSR 설명 */}
        <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            스트레스 DSR이 뭔가요? (10.15 대책)
          </h4>
          <p className="text-sm text-orange-700 mb-2">
            금리 상승 가능성을 반영해 <span className="font-medium">실제 금리보다 높은 금리로 DSR을 계산</span>해요.
          </p>
          <div className="text-sm text-orange-700 space-y-1 mb-3">
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">⚡</span>
              <span><span className="font-medium">수도권/규제지역 주담대:</span> +3.0%p 가산</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">⚡</span>
              <span><span className="font-medium">지방 주담대:</span> +0.75%p 가산 (2025년 말까지)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">⚡</span>
              <span><span className="font-medium">신용대출:</span> 1억원 초과 시 +1.5%p 가산</span>
            </div>
          </div>
          <div className="p-2 bg-white rounded-lg text-xs text-orange-600">
            <strong>실제 은행 심사 시 스트레스 DSR이 적용됩니다.</strong> 대출 한도를 정확히 알려면 스트레스 DSR을 켜고 확인하세요.
          </div>
        </div>

        {/* 이용안내 - 간소화 */}
        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            DSR이 뭔가요?
          </h4>
          <p className="text-sm text-emerald-700 mb-2">
            내 소득 대비 대출 상환액 비율이에요. <span className="font-medium">40%가 넘으면 은행에서 대출이 어려워져요.</span>
          </p>
          <div className="text-sm text-emerald-700 space-y-1">
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span><span className="font-medium">모든 대출</span>이 포함돼요 (주택담보, 신용대출, 카드론, 학자금 등)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span><span className="font-medium">원금 + 이자</span> 상환액을 기준으로 계산해요</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">✓</span>
              <span>실제 한도는 은행마다 조금씩 다를 수 있어요</span>
            </div>
          </div>
        </div>

        {/* 연소득별 최대 대출 가능액표 - 개선 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-2 text-center">💰 내 연봉으로 얼마까지 빌릴 수 있을까?</h4>
          <p className="text-xs text-neutral-500 text-center mb-3">
            <span className="inline-block px-2 py-0.5 bg-white rounded">금리 4%</span>
            <span className="mx-1">·</span>
            <span className="inline-block px-2 py-0.5 bg-white rounded">30년 상환</span>
            <span className="mx-1">·</span>
            <span className="inline-block px-2 py-0.5 bg-white rounded">기존 대출 없음</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">
                    내 연봉
                  </th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">
                    <div>1년 상환</div>
                    <div className="text-xs font-normal text-emerald-600">(40% 한도)</div>
                  </th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">
                    <div>월 상환액</div>
                    <div className="text-xs font-normal text-emerald-600">(최대)</div>
                  </th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">
                    <div>대출 가능액</div>
                    <div className="text-xs font-normal text-emerald-600">(최대)</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-neutral-200 hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">3천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,200만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">100만원</td>
                  <td className="py-2 px-2 text-center font-bold text-neutral-800 border border-gray-300">2.1억원</td>
                </tr>
                <tr className="bg-green-50 border-b border-neutral-200 hover:bg-green-100 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-green-700 border border-gray-300">4천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,600만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">133만원</td>
                  <td className="py-2 px-2 text-center font-bold text-green-700 border border-gray-300">2.8억원</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200 hover:bg-emerald-100 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-emerald-700 border border-gray-300">5천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">2,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">167만원</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-700 border border-gray-300">3.5억원</td>
                </tr>
                <tr className="bg-blue-50 border-b border-neutral-200 hover:bg-blue-100 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-blue-700 border border-gray-300">6천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">2,400만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">200만원</td>
                  <td className="py-2 px-2 text-center font-bold text-blue-700 border border-gray-300">4.2억원</td>
                </tr>
                <tr className="bg-indigo-50 border-b border-neutral-200 hover:bg-indigo-100 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-indigo-700 border border-gray-300">8천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">3,200만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">267만원</td>
                  <td className="py-2 px-2 text-center font-bold text-indigo-700 border border-gray-300">5.6억원</td>
                </tr>
                <tr className="bg-purple-50 hover:bg-purple-100 transition-colors">
                  <td className="py-2 px-2 text-center font-medium text-purple-700 border border-gray-300">1억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">4,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">333만원</td>
                  <td className="py-2 px-2 text-center font-bold text-purple-700 border border-gray-300">7억원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 기존 대출이 있으면 최대 대출액이 그만큼 줄어요</li>
              <li>• 금리가 낮을수록 같은 월상환액으로 더 많이 빌릴 수 있어요</li>
              <li>• 부부합산 소득으로 계산하면 한도가 크게 늘어나요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
