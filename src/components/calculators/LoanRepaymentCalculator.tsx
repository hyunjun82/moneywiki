"use client";

import { useState, useEffect } from "react";

type RepaymentType = "equalPrincipalInterest" | "equalPrincipal" | "bullet";

interface MonthlyPayment {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

export default function LoanRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(5);
  const [period, setPeriod] = useState<number>(12);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equalPrincipalInterest");

  const [schedule, setSchedule] = useState<MonthlyPayment[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [firstPayment, setFirstPayment] = useState<number>(0);
  const [lastPayment, setLastPayment] = useState<number>(0);

  useEffect(() => {
    if (loanAmount <= 0 || rate <= 0 || period <= 0) {
      setSchedule([]);
      setTotalInterest(0);
      setTotalPayment(0);
      setFirstPayment(0);
      setLastPayment(0);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const newSchedule: MonthlyPayment[] = [];
    let balance = loanAmount;
    let totalInt = 0;

    if (repaymentType === "equalPrincipalInterest") {
      // 원리금균등상환
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, period)) / (Math.pow(1 + monthlyRate, period) - 1);

      for (let i = 1; i <= period; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance -= principal;
        totalInt += interest;

        newSchedule.push({
          month: i,
          principal: Math.round(principal),
          interest: Math.round(interest),
          payment: Math.round(monthlyPayment),
          balance: Math.max(0, Math.round(balance))
        });
      }
      setFirstPayment(Math.round(monthlyPayment));
      setLastPayment(Math.round(monthlyPayment));
    } else if (repaymentType === "equalPrincipal") {
      // 원금균등상환
      const monthlyPrincipal = loanAmount / period;

      for (let i = 1; i <= period; i++) {
        const interest = balance * monthlyRate;
        const payment = monthlyPrincipal + interest;
        balance -= monthlyPrincipal;
        totalInt += interest;

        newSchedule.push({
          month: i,
          principal: Math.round(monthlyPrincipal),
          interest: Math.round(interest),
          payment: Math.round(payment),
          balance: Math.max(0, Math.round(balance))
        });
      }
      setFirstPayment(Math.round(monthlyPrincipal + loanAmount * monthlyRate));
      setLastPayment(Math.round(monthlyPrincipal + (loanAmount / period) * monthlyRate));
    } else {
      // 만기일시상환
      const monthlyInterest = loanAmount * monthlyRate;

      for (let i = 1; i <= period; i++) {
        const isLast = i === period;
        newSchedule.push({
          month: i,
          principal: isLast ? loanAmount : 0,
          interest: Math.round(monthlyInterest),
          payment: isLast ? Math.round(loanAmount + monthlyInterest) : Math.round(monthlyInterest),
          balance: isLast ? 0 : loanAmount
        });
        totalInt += monthlyInterest;
      }
      setFirstPayment(Math.round(monthlyInterest));
      setLastPayment(Math.round(loanAmount + monthlyInterest));
    }

    setSchedule(newSchedule);
    setTotalInterest(Math.round(totalInt));
    setTotalPayment(Math.round(loanAmount + totalInt));
  }, [loanAmount, rate, period, repaymentType]);

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

  const repaymentTypes = [
    { value: "equalPrincipalInterest", label: "원리금균등", desc: "매월 동일 금액" },
    { value: "equalPrincipal", label: "원금균등", desc: "원금 동일, 이자 감소" },
    { value: "bullet", label: "만기일시", desc: "이자만 납부, 만기에 원금" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">대출상환 계산기</h2>
            <p className="text-emerald-100 text-sm">상환방식별 월 납입금 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 상환방식 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">상환 방식</label>
          <div className="grid grid-cols-3 gap-2">
            {repaymentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setRepaymentType(type.value as RepaymentType)}
                className={`py-3 px-2 rounded-xl font-medium transition-all text-center ${
                  repaymentType === type.value
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">{type.label}</div>
                <div className={`text-xs mt-1 ${repaymentType === type.value ? "text-emerald-200" : "text-neutral-400"}`}>
                  {type.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 대출금액 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">대출금액</label>
          <div className="relative">
            <input
              type="text"
              value={loanAmount > 0 ? formatNumber(loanAmount) : ""}
              onChange={(e) => setLoanAmount(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="대출금액 입력"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {loanAmount > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(loanAmount)}</p>}

          <div className="flex gap-2 mt-3">
            {[10000000, 30000000, 50000000, 100000000, 200000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setLoanAmount(amount)}
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
              max="30"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 text-right"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">대출기간</label>
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
        {loanAmount > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">상환 계획</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">첫 달 납입금</div>
                <div className="text-2xl font-bold text-emerald-600">{formatNumber(firstPayment)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">마지막 달 납입금</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(lastPayment)}원</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">총 이자</div>
                <div className="text-xl font-bold text-red-600">{formatNumber(totalInterest)}원</div>
                <div className="text-xs text-neutral-500">{formatWon(totalInterest)}</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">총 상환금액</div>
                <div className="text-xl font-bold text-neutral-800">{formatNumber(totalPayment)}원</div>
                <div className="text-xs text-neutral-500">{formatWon(totalPayment)}</div>
              </div>
            </div>

            {/* 상환 스케줄 (처음 6개월만) */}
            {schedule.length > 0 && (
              <div className="bg-white rounded-xl p-4 overflow-x-auto">
                <div className="text-sm font-medium text-neutral-700 mb-3">월별 상환 스케줄</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-2 text-left text-neutral-500">회차</th>
                      <th className="py-2 text-right text-neutral-500">원금</th>
                      <th className="py-2 text-right text-neutral-500">이자</th>
                      <th className="py-2 text-right text-neutral-500">납입금</th>
                      <th className="py-2 text-right text-neutral-500">잔액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.slice(0, 6).map((row) => (
                      <tr key={row.month} className="border-b border-neutral-100">
                        <td className="py-2 text-neutral-700">{row.month}회</td>
                        <td className="py-2 text-right">{formatNumber(row.principal)}원</td>
                        <td className="py-2 text-right text-red-500">{formatNumber(row.interest)}원</td>
                        <td className="py-2 text-right font-medium">{formatNumber(row.payment)}원</td>
                        <td className="py-2 text-right text-neutral-500">{formatNumber(row.balance)}원</td>
                      </tr>
                    ))}
                    {schedule.length > 6 && (
                      <tr>
                        <td colSpan={5} className="py-2 text-center text-neutral-400">
                          ... {schedule.length - 6}개월 더 ...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">상환방식 비교</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 원리금균등: 매월 같은 금액, 계획 세우기 좋아요</li>
            <li>• 원금균등: 총 이자가 가장 적어요</li>
            <li>• 만기일시: 매월 부담 적지만 총 이자 많아요</li>
          </ul>
        </div>

        {/* 대출금액별 월상환액 비교표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 대출금액별 월상환액 비교표</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">금리 5%, 원리금균등상환, 30년(360개월) 기준</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">대출금</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월 상환액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">총 이자</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">총 상환액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1억</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">53.7만</td>
                  <td className="py-2 px-2 text-center text-red-500 border border-gray-300">9,330만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1.93억</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">신혼부부 시작</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-emerald-700 border border-gray-300">2억</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">107.4만</td>
                  <td className="py-2 px-2 text-center text-red-500 border border-gray-300">1.87억</td>
                  <td className="py-2 px-2 text-center border border-gray-300">3.87억</td>
                  <td className="py-2 px-2 text-center text-emerald-600 border border-gray-300 hidden sm:table-cell">월 100만 돌파</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">3억</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">161.1만</td>
                  <td className="py-2 px-2 text-center text-red-500 border border-gray-300">2.80억</td>
                  <td className="py-2 px-2 text-center border border-gray-300">5.80억</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">서울 외곽 아파트</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">5억</td>
                  <td className="py-2 px-2 text-center font-bold text-amber-600 border border-gray-300">268.4만</td>
                  <td className="py-2 px-2 text-center text-red-500 border border-gray-300">4.66억</td>
                  <td className="py-2 px-2 text-center border border-gray-300">9.66억</td>
                  <td className="py-2 px-2 text-center text-amber-600 border border-gray-300 hidden sm:table-cell">연봉 8천 필요</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">7억</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">375.8만</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300">6.53억</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">13.53억</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300 hidden sm:table-cell">이자만 6억!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 대출 핵심</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 30년 대출 시 <strong>원금만큼 이자</strong> 나가요 (100% 이상)</li>
              <li>• 기간 줄이면 월 부담↑, 총 이자↓</li>
              <li>• DSR 40% 기준: 월 상환액 = 연봉 × 40% ÷ 12</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
