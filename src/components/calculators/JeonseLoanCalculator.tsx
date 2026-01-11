"use client";

import { useState, useCallback, useEffect } from "react";

type RepaymentType = "equal_principal_interest" | "equal_principal" | "bullet";
type LoanType = "bank" | "hug" | "khfc";

interface MonthlyPayment {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

export default function JeonseLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [loanPeriod, setLoanPeriod] = useState<number>(24);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("bullet");
  const [loanType, setLoanType] = useState<LoanType>("bank");

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [schedule, setSchedule] = useState<MonthlyPayment[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // 계산 로직
  const calculate = useCallback(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanPeriod <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setSchedule([]);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const months = loanPeriod;
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

          if (i === 1) payment = monthPayment; // 첫 달 납부금액

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
        // 만기일시상환 (이자만 납부)
        const monthlyInterest = loanAmount * monthlyRate;
        payment = monthlyInterest;
        totalInt = monthlyInterest * months;

        for (let i = 1; i <= months; i++) {
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
    setSchedule(newSchedule);
  }, [loanAmount, interestRate, loanPeriod, repaymentType]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  // 대출 상품별 기본 금리 설정
  const handleLoanTypeChange = useCallback((type: LoanType) => {
    setLoanType(type);
    switch (type) {
      case "bank":
        setInterestRate(3.5);
        break;
      case "hug":
        setInterestRate(2.7);
        break;
      case "khfc":
        setInterestRate(2.3);
        break;
    }
  }, []);

  // 빠른 입력 버튼
  const handleQuickAmount = useCallback((amount: number) => {
    setLoanAmount((prev) => prev + amount);
  }, []);

  const handleClear = useCallback(() => {
    setLoanAmount(0);
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

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">전세대출 계산기</h2>
            <p className="text-emerald-100 text-sm">월 이자와 총 비용 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 대출 상품 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            대출 상품
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "bank" as LoanType, label: "시중은행", rate: "3.5%~", desc: "일반 전세대출" },
              { value: "hug" as LoanType, label: "버팀목", rate: "2.7%~", desc: "주금공 보증" },
              { value: "khfc" as LoanType, label: "디딤돌", rate: "2.3%~", desc: "청년/신혼부부" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => handleLoanTypeChange(type.value)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  loanType === type.value
                    ? "border-violet-500 bg-emerald-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs text-emerald-600">{type.rate}</div>
                <div className="text-xs text-neutral-500">{type.desc}</div>
              </button>
            ))}
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
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {loanAmount > 0 && (
            <p className="mt-1 text-sm text-emerald-600">{formatWon(loanAmount)}</p>
          )}

          {/* 빠른 입력 버튼 */}
          <div className="flex gap-2 mt-3">
            <button onClick={() => handleQuickAmount(10000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+1천만</button>
            <button onClick={() => handleQuickAmount(50000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+5천만</button>
            <button onClick={() => handleQuickAmount(100000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+1억</button>
            <button onClick={() => handleQuickAmount(200000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">+2억</button>
            <button onClick={handleClear} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition-colors">C</button>
          </div>
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
              대출기간 (개월)
            </label>
            <select
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors"
            >
              <option value={12}>12개월 (1년)</option>
              <option value={24}>24개월 (2년)</option>
              <option value={36}>36개월 (3년)</option>
              <option value={48}>48개월 (4년)</option>
              <option value={60}>60개월 (5년)</option>
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
              { value: "bullet" as RepaymentType, label: "만기일시상환", desc: "이자만 납부" },
              { value: "equal_principal_interest" as RepaymentType, label: "원리금균등", desc: "매월 동일 납부" },
              { value: "equal_principal" as RepaymentType, label: "원금균등", desc: "원금 동일 상환" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setRepaymentType(type.value)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  repaymentType === type.value
                    ? "border-violet-500 bg-emerald-50"
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
              {/* 월 납부금 */}
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">
                  {repaymentType === "bullet" ? "월 이자" : "월 납부금"}
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
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-500">적용금리</span>
                  <span className="font-medium">연 {interestRate}%</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-500">대출기간</span>
                  <span className="font-medium">{loanPeriod}개월 ({loanPeriod / 12}년)</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-500">상환방식</span>
                  <span className="font-medium">
                    {repaymentType === "bullet" ? "만기일시상환" :
                     repaymentType === "equal_principal_interest" ? "원리금균등" : "원금균등"}
                  </span>
                </div>
              </div>
            </div>

            {/* 상환 스케줄 토글 */}
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full mt-4 py-3 text-sm text-emerald-600 hover:text-violet-700 font-medium flex items-center justify-center gap-2"
            >
              {showSchedule ? "상환 스케줄 접기" : "상환 스케줄 보기"}
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

        {/* 대출 상품 안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">전세대출 상품 비교</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-violet-700">버팀목 전세자금대출</div>
              <div className="text-neutral-600 mt-1">연소득 5천만원 이하, 보증금 3억 이하 주택</div>
              <div className="text-emerald-600 text-xs mt-1">금리 연 2.1%~2.9%</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-violet-700">청년 전용 버팀목</div>
              <div className="text-neutral-600 mt-1">만 19~34세, 연소득 5천만원 이하</div>
              <div className="text-emerald-600 text-xs mt-1">금리 연 1.8%~2.7%</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-violet-700">신혼부부 전용</div>
              <div className="text-neutral-600 mt-1">결혼 7년 이내, 합산소득 6천만원 이하</div>
              <div className="text-emerald-600 text-xs mt-1">금리 연 1.65%~2.6%</div>
            </div>
          </div>
        </div>

        {/* 이용안내 */}
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            이용안내
          </h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 실제 대출 금리는 신용등급, 대출 상품에 따라 달라요</li>
            <li>• 전세대출은 보통 만기일시상환으로 이자만 납부해요</li>
            <li>• 버팀목/디딤돌은 소득, 자산 요건이 있어요</li>
            <li>• 대출 한도는 보증금의 70~80% 정도예요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
