"use client";

import { useState, useCallback, useEffect } from "react";

type RepaymentType = "equal_principal_interest" | "equal_principal" | "bullet";
type LoanType = "bank" | "bogeumjari" | "conforming" | "didimdon";

interface MonthlyPayment {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

export default function MortgageCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(4.0);
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(30);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equal_principal_interest");
  const [loanType, setLoanType] = useState<LoanType>("bank");
  const [ltv, setLtv] = useState<number>(0);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [schedule, setSchedule] = useState<MonthlyPayment[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // LTV 계산
  useEffect(() => {
    if (propertyValue > 0 && loanAmount > 0) {
      setLtv((loanAmount / propertyValue) * 100);
    } else {
      setLtv(0);
    }
  }, [propertyValue, loanAmount]);

  // 계산 로직
  const calculate = useCallback(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanPeriodYears <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setSchedule([]);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const months = loanPeriodYears * 12;
    let payment = 0;
    let totalInt = 0;
    const newSchedule: MonthlyPayment[] = [];
    let balance = loanAmount;

    switch (repaymentType) {
      case "equal_principal_interest":
        // 원리금균등상환
        payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

        for (let i = 1; i <= months; i++) {
          const interest = balance * monthlyRate;
          const principal = payment - interest;
          balance -= principal;
          totalInt += interest;
          newSchedule.push({
            month: i,
            principal,
            interest,
            payment,
            balance: Math.max(0, balance),
          });
        }
        break;

      case "equal_principal":
        // 원금균등상환
        const principalPayment = loanAmount / months;

        for (let i = 1; i <= months; i++) {
          const interest = balance * monthlyRate;
          const monthPayment = principalPayment + interest;
          balance -= principalPayment;
          totalInt += interest;

          if (i === 1) payment = monthPayment;

          newSchedule.push({
            month: i,
            principal: principalPayment,
            interest,
            payment: monthPayment,
            balance: Math.max(0, balance),
          });
        }
        break;

      case "bullet":
        // 만기일시상환
        const monthlyInterest = loanAmount * monthlyRate;
        payment = monthlyInterest;
        totalInt = monthlyInterest * months;

        for (let i = 1; i <= Math.min(months, 60); i++) { // 최대 5년치만 표시
          newSchedule.push({
            month: i,
            principal: i === months ? loanAmount : 0,
            interest: monthlyInterest,
            payment: i === months ? loanAmount + monthlyInterest : monthlyInterest,
            balance: i === months ? 0 : loanAmount,
          });
        }
        break;
    }

    setMonthlyPayment(Math.round(payment));
    setTotalInterest(Math.round(totalInt));
    setTotalPayment(Math.round(loanAmount + totalInt));
    setSchedule(newSchedule.slice(0, 60)); // 최대 5년치만 저장
  }, [loanAmount, interestRate, loanPeriodYears, repaymentType]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  // 대출 상품별 기본 금리 설정
  const handleLoanTypeChange = useCallback((type: LoanType) => {
    setLoanType(type);
    switch (type) {
      case "bank":
        setInterestRate(4.0);
        break;
      case "bogeumjari":
        setInterestRate(3.3);
        break;
      case "conforming":
        setInterestRate(3.8);
        break;
      case "didimdon":
        setInterestRate(2.5);
        break;
    }
  }, []);

  // 빠른 입력 버튼
  const handleQuickPropertyValue = useCallback((amount: number) => {
    setPropertyValue((prev) => prev + amount);
  }, []);

  const handleQuickLoanAmount = useCallback((amount: number) => {
    setLoanAmount((prev) => prev + amount);
  }, []);

  const handleClearProperty = useCallback(() => {
    setPropertyValue(0);
  }, []);

  const handleClearLoan = useCallback(() => {
    setLoanAmount(0);
  }, []);

  // LTV 기반 대출금액 설정
  const handleSetLtvAmount = useCallback((ltvPercent: number) => {
    if (propertyValue > 0) {
      setLoanAmount(Math.floor(propertyValue * ltvPercent / 100));
    }
  }, [propertyValue]);

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

  // LTV 상태 색상
  const getLtvColor = (): string => {
    if (ltv === 0) return "text-neutral-500";
    if (ltv <= 40) return "text-green-600";
    if (ltv <= 60) return "text-emerald-600";
    if (ltv <= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">주택담보대출 계산기</h2>
            <p className="text-emerald-100 text-sm">월 상환금과 총 이자 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 대출 상품 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            대출 상품
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: "bank" as LoanType, label: "시중은행", rate: "4.0%~" },
              { value: "bogeumjari" as LoanType, label: "보금자리론", rate: "3.3%~" },
              { value: "conforming" as LoanType, label: "적격대출", rate: "3.8%~" },
              { value: "didimdon" as LoanType, label: "디딤돌", rate: "2.5%~" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => handleLoanTypeChange(type.value)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  loanType === type.value
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs text-emerald-600">{type.rate}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 주택가격 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            주택가격 (매매가)
          </label>
          <div className="relative">
            <input
              type="text"
              value={propertyValue > 0 ? formatNumber(propertyValue) : ""}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                setPropertyValue(value);
              }}
              placeholder="주택 매매가격"
              className="w-full px-4 py-3 text-lg font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {propertyValue > 0 && (
            <p className="mt-1 text-sm text-emerald-600">{formatWon(propertyValue)}</p>
          )}

          <div className="flex gap-2 mt-2">
            <button onClick={() => handleQuickPropertyValue(100000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+1억</button>
            <button onClick={() => handleQuickPropertyValue(300000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+3억</button>
            <button onClick={() => handleQuickPropertyValue(500000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+5억</button>
            <button onClick={handleClearProperty} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-colors">C</button>
          </div>
        </div>

        {/* 대출금액 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            대출금액
          </label>
          <div className="relative">
            <input
              type="text"
              value={loanAmount > 0 ? formatNumber(loanAmount) : ""}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                setLoanAmount(value);
              }}
              placeholder="대출받을 금액"
              className="w-full px-4 py-3 text-lg font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            {loanAmount > 0 && (
              <span className="text-sm text-emerald-600">{formatWon(loanAmount)}</span>
            )}
            {ltv > 0 && (
              <span className={`text-sm font-medium ${getLtvColor()}`}>
                LTV {ltv.toFixed(1)}%
              </span>
            )}
          </div>

          {/* LTV 기반 빠른 설정 */}
          {propertyValue > 0 && (
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleSetLtvAmount(40)} className="flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors">LTV 40%</button>
              <button onClick={() => handleSetLtvAmount(50)} className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors">LTV 50%</button>
              <button onClick={() => handleSetLtvAmount(60)} className="flex-1 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-medium transition-colors">LTV 60%</button>
              <button onClick={() => handleSetLtvAmount(70)} className="flex-1 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium transition-colors">LTV 70%</button>
              <button onClick={handleClearLoan} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-colors">C</button>
            </div>
          )}
        </div>

        {/* 금리/기간 설정 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 금리 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              금리 (연 %)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              max="20"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right"
            />
          </div>

          {/* 대출기간 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              대출기간 (년)
            </label>
            <select
              value={loanPeriodYears}
              onChange={(e) => setLoanPeriodYears(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
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

        {/* 상환방식 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            상환방식
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "equal_principal_interest" as RepaymentType, label: "원리금균등", desc: "매월 동일 납부" },
              { value: "equal_principal" as RepaymentType, label: "원금균등", desc: "원금 동일 상환" },
              { value: "bullet" as RepaymentType, label: "만기일시상환", desc: "이자만 납부" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setRepaymentType(type.value)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  repaymentType === type.value
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs text-neutral-500">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 결과 표시 */}
        {loanAmount > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">계산 결과</h3>

            <div className="space-y-4">
              {/* 월 상환금 */}
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">
                  {repaymentType === "bullet" ? "월 이자" : "월 상환금"}
                  {repaymentType === "equal_principal" && " (첫 달)"}
                </div>
                <div className="text-3xl font-bold text-emerald-600">
                  {formatNumber(monthlyPayment)}원
                </div>
                <div className="text-sm text-neutral-500 mt-1">
                  {formatWon(monthlyPayment)}
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-neutral-500 mb-1">총 이자</div>
                  <div className="text-xl font-bold text-neutral-800">
                    {formatNumber(totalInterest)}원
                  </div>
                  <div className="text-xs text-neutral-500">
                    {formatWon(totalInterest)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-neutral-500 mb-1">총 상환금액</div>
                  <div className="text-xl font-bold text-neutral-800">
                    {formatNumber(totalPayment)}원
                  </div>
                  <div className="text-xs text-neutral-500">
                    {formatWon(totalPayment)}
                  </div>
                </div>
              </div>

              {/* 요약 정보 */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">대출금액</span>
                  <span className="font-medium">{formatWon(loanAmount)}</span>
                </div>
                {propertyValue > 0 && (
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-neutral-500">LTV (담보인정비율)</span>
                    <span className={`font-medium ${getLtvColor()}`}>{ltv.toFixed(1)}%</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-500">적용금리</span>
                  <span className="font-medium">연 {interestRate}%</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-500">대출기간</span>
                  <span className="font-medium">{loanPeriodYears}년 ({loanPeriodYears * 12}개월)</span>
                </div>
              </div>
            </div>

            {/* 상환 스케줄 토글 */}
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full mt-4 py-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-2"
            >
              {showSchedule ? "상환 스케줄 접기" : "상환 스케줄 보기 (최대 5년)"}
              <svg className={`w-4 h-4 transition-transform ${showSchedule ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 상환 스케줄 */}
            {showSchedule && schedule.length > 0 && (
              <div className="mt-4 bg-white rounded-xl overflow-hidden border border-emerald-100">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-emerald-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-neutral-600">회차</th>
                        <th className="px-3 py-2 text-right text-neutral-600">원금</th>
                        <th className="px-3 py-2 text-right text-neutral-600">이자</th>
                        <th className="px-3 py-2 text-right text-neutral-600">납입금</th>
                        <th className="px-3 py-2 text-right text-neutral-600">잔액</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {schedule.map((item) => (
                        <tr key={item.month} className="hover:bg-neutral-50">
                          <td className="px-3 py-2 text-neutral-600">{item.month}회차</td>
                          <td className="px-3 py-2 text-right">{formatNumber(Math.round(item.principal))}</td>
                          <td className="px-3 py-2 text-right">{formatNumber(Math.round(item.interest))}</td>
                          <td className="px-3 py-2 text-right font-medium">{formatNumber(Math.round(item.payment))}</td>
                          <td className="px-3 py-2 text-right text-neutral-500">{formatNumber(Math.round(item.balance))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LTV 기준 안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">LTV 한도 기준 (2026년)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">투기과열지구</span>
              <span className="font-medium text-emerald-600">LTV 40%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">조정대상지역</span>
              <span className="font-medium text-emerald-600">LTV 50%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">비규제지역</span>
              <span className="font-medium text-emerald-600">LTV 70%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="text-neutral-600">생애최초 주택구입</span>
              <span className="font-medium text-green-600">LTV 80%</span>
            </div>
          </div>
        </div>

        {/* 이용안내 */}
        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            이용안내
          </h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 실제 대출 금리는 신용등급, 대출 상품에 따라 달라요</li>
            <li>• LTV 외에 DSR 규제도 적용돼요 (총부채원리금상환비율)</li>
            <li>• 원리금균등이 가장 일반적이고, 총 이자가 적어요</li>
            <li>• 주담대는 보통 원리금균등 상환이 조건이에요</li>
          </ul>
        </div>

        {/* 주담대 월 상환금 비교표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 주담대 월 상환금 비교표 (원리금균등, 30년)</h4>
          <p className="text-xs text-neutral-500 text-center mb-3">금리별 × 대출금액별 월 상환금 (원리금균등 30년 기준)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">금리 ↓ / 대출금 →</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">2억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">3억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">4억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">5억</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">6억</th>
                  <th className="py-2 px-2 text-center text-neutral-600 font-medium border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-green-700 border border-gray-300">3.0%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">84만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">126만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">169만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">211만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">253만</td>
                  <td className="py-2 px-2 text-center text-green-600 text-xs border border-gray-300 hidden md:table-cell">정책금융 최저!</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-emerald-700 border border-gray-300">3.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">90만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">135만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">179만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">224만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">269만</td>
                  <td className="py-2 px-2 text-center text-emerald-600 text-xs border border-gray-300 hidden md:table-cell">보금자리론 평균</td>
                </tr>
                <tr className="bg-white border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">4.0%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">95만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">143万</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">191万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">239万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">286万</td>
                  <td className="py-2 px-2 text-center text-neutral-600 text-xs border border-gray-300 hidden md:table-cell">시중은행 평균</td>
                </tr>
                <tr className="bg-yellow-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-yellow-700 border border-gray-300">4.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">101万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">152万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">203万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">253万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">304万</td>
                  <td className="py-2 px-2 text-center text-yellow-600 text-xs border border-gray-300 hidden md:table-cell">300만원 돌파!</td>
                </tr>
                <tr className="bg-orange-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-orange-700 border border-gray-300">5.0%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">107万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">161万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">215万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">268万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">322万</td>
                  <td className="py-2 px-2 text-center text-orange-600 text-xs border border-gray-300 hidden md:table-cell">부담 증가</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-medium text-red-700 border border-gray-300">5.5%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">114万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">170万</td>
                  <td className="py-2 px-2 text-center border border-gray-300">227万</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">284万</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300 hidden sm:table-cell">341万</td>
                  <td className="py-2 px-2 text-center text-red-600 text-xs border border-gray-300 hidden md:table-cell">고금리 주의!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 4억 대출 시 금리 1% 차이 = 월 약 22만원, 30년간 약 8천만원 차이!</li>
              <li>• 보금자리론·디딤돌은 소득·가격 요건 충족 시 금리 1%+ 절약</li>
              <li>• 대출기간 30년→20년 줄이면 총 이자 30% 이상 절감</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
