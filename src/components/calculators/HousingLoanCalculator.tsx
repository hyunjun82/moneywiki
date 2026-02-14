"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  description?: string;
  highlight?: boolean;
  unit?: string;
}

function InputField({ label, value, onChange, readOnly, description, highlight, unit = "원" }: InputFieldProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100 ${highlight ? "bg-[#F5F8FB]" : ""}`}>
      <div className="sm:w-48 flex-shrink-0">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={formatNumber(value)}
          onChange={(e) => onChange && onChange(parseInput(e.target.value))}
          readOnly={readOnly}
          className={`w-full max-w-xs px-3 py-2 text-right border rounded-lg ${
            readOnly
              ? "bg-neutral-100 text-neutral-600 border-neutral-200"
              : "bg-white border-neutral-300 focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
          }`}
        />
        <span className="text-sm text-neutral-500">{unit}</span>
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

export default function HousingLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000000);
  const [interestRate, setInterestRate] = useState("4.0");
  const [loanYears, setLoanYears] = useState(30);
  const [repayType, setRepayType] = useState<"equal" | "principal">("equal");

  const [equalMonthly, setEqualMonthly] = useState(0);
  const [equalTotalInterest, setEqualTotalInterest] = useState(0);
  const [principalFirst, setPrincipalFirst] = useState(0);
  const [principalLast, setPrincipalLast] = useState(0);
  const [principalTotalInterest, setPrincipalTotalInterest] = useState(0);

  const calculate = useCallback(() => {
    const rate = parseFloat(interestRate) / 100;
    const monthlyRate = rate / 12;
    const months = loanYears * 12;

    // 원리금균등
    if (monthlyRate > 0) {
      const mp = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      setEqualMonthly(mp);
      setEqualTotalInterest(mp * months - loanAmount);
    } else {
      setEqualMonthly(loanAmount / months);
      setEqualTotalInterest(0);
    }

    // 원금균등
    const principalPerMonth = loanAmount / months;
    const firstInterest = loanAmount * monthlyRate;
    setPrincipalFirst(principalPerMonth + firstInterest);
    setPrincipalLast(principalPerMonth + principalPerMonth * monthlyRate);
    setPrincipalTotalInterest((loanAmount * monthlyRate * (months + 1)) / 2);
  }, [loanAmount, interestRate, loanYears]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const monthly = repayType === "equal" ? equalMonthly : principalFirst;
  const totalInterest = repayType === "equal" ? equalTotalInterest : principalTotalInterest;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-8 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-2">보금자리론 상환 계산기</h1>
        <p className="text-[#B8D4F1] text-sm">
          대출금액, 금리, 상환기간을 입력하면 월 상환액을 계산해요
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-white shadow-lg rounded-b-2xl">
        {/* 1. 상환방식 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">1</span>
            <h2 className="text-lg font-bold text-neutral-800">상환방식</h2>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={repayType === "equal"} onChange={() => setRepayType("equal")} className="w-4 h-4" />
              <span className="text-sm">원리금균등 (매월 동일)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={repayType === "principal"} onChange={() => setRepayType("principal")} className="w-4 h-4" />
              <span className="text-sm">원금균등 (이자 감소)</span>
            </label>
          </div>
        </div>

        {/* 2. 대출 정보 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">2</span>
            <h2 className="text-lg font-bold text-neutral-800">대출 정보</h2>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <InputField
              label="대출금액"
              value={loanAmount}
              onChange={setLoanAmount}
              description="보금자리론 최대 3.6억원"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
              <div className="sm:w-48 flex-shrink-0">
                <span className="text-sm font-medium text-neutral-700">연 이자율</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={interestRate}
                  onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value)) setInterestRate(e.target.value); }}
                  className="w-full max-w-xs px-3 py-2 text-right border rounded-lg bg-white border-neutral-300 focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
                />
                <span className="text-sm text-neutral-500">%</span>
              </div>
              <div className="sm:w-64 text-xs text-neutral-500">보금자리론 약 4% (고정)</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
              <div className="sm:w-48 flex-shrink-0">
                <span className="text-sm font-medium text-neutral-700">상환기간</span>
              </div>
              <div className="flex-1">
                <select
                  value={loanYears}
                  onChange={(e) => setLoanYears(parseInt(e.target.value))}
                  className="px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
                >
                  {[10, 15, 20, 30, 40].map((y) => (
                    <option key={y} value={y}>{y}년</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 계산 결과 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">3</span>
            <h2 className="text-lg font-bold text-neutral-800">계산 결과</h2>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] text-white p-6 rounded-xl mb-4">
            <div className="text-sm mb-2 opacity-90">
              {repayType === "equal" ? "월 상환액 (고정)" : "첫 달 상환액"}
            </div>
            <div className="text-3xl font-bold mb-4">{formatNumber(monthly)}원</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-75 mb-1">총 이자</div>
                <div className="text-lg font-semibold">{formatNumber(totalInterest)}원</div>
              </div>
              <div>
                <div className="opacity-75 mb-1">총 상환액</div>
                <div className="text-lg font-semibold">{formatNumber(loanAmount + totalInterest)}원</div>
              </div>
            </div>
          </div>

          {repayType === "principal" && (
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">첫 달 상환액</span>
                <span className="font-semibold text-neutral-800">{formatNumber(principalFirst)}원</span>
              </div>
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">마지막 달 상환액</span>
                <span className="font-semibold text-neutral-800">{formatNumber(principalLast)}원</span>
              </div>
            </div>
          )}

          {/* 상환방식 비교 */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">원리금균등 총 이자</span>
              <span className="font-semibold text-neutral-800">{formatNumber(equalTotalInterest)}원</span>
            </div>
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">원금균등 총 이자</span>
              <span className="font-semibold text-neutral-800">{formatNumber(principalTotalInterest)}원</span>
            </div>
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">원금균등 이자 절감</span>
              <span className="font-semibold text-[#1E3A5F]">{formatNumber(equalTotalInterest - principalTotalInterest)}원</span>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="px-6 pb-6">
          <div className="bg-[#F0F7FF] border border-[#B8D4F1] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">💡 보금자리론 조건 (2026년)</h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>대상: 무주택 또는 1주택, 부부합산 연 7,000만원 이하</li>
              <li>주택가격 6억원 이하, 최대 3.6억원 한도</li>
              <li>금리: 연 4% 내외 (고정금리)</li>
              <li>중도상환수수료: 3년 이내 약 1.0~1.5%</li>
              <li>DSR 40% 규제 적용돼요</li>
            </ul>
          </div>
        </div>

        {/* 기준표 */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-neutral-800 mb-3">📊 상환방식 비교 (현재 조건)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-left">구분</th>
                  <th className="px-4 py-2 text-right">원리금균등</th>
                  <th className="px-4 py-2 text-right">원금균등</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-2">첫 달 상환</td>
                  <td className="px-4 py-2 text-right">{formatNumber(equalMonthly)}원</td>
                  <td className="px-4 py-2 text-right">{formatNumber(principalFirst)}원</td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-2">마지막 달</td>
                  <td className="px-4 py-2 text-right">{formatNumber(equalMonthly)}원</td>
                  <td className="px-4 py-2 text-right">{formatNumber(principalLast)}원</td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-2">총 이자</td>
                  <td className="px-4 py-2 text-right">{formatNumber(equalTotalInterest)}원</td>
                  <td className="px-4 py-2 text-right font-semibold">{formatNumber(principalTotalInterest)}원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
