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

// 2025년 기준 (2026년 미발표)
const THRESHOLD = 25250000; // 상환기준소득 2,525만원
const RATE = 0.20;          // 초과액의 20%

export default function StudentLoanCalculator() {
  const [annualIncome, setAnnualIncome] = useState(30000000);

  const [excessIncome, setExcessIncome] = useState(0);
  const [annualRepayment, setAnnualRepayment] = useState(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [isAbove, setIsAbove] = useState(false);

  const calculate = useCallback(() => {
    const excess = Math.max(0, annualIncome - THRESHOLD);
    const annual = excess * RATE;
    setExcessIncome(excess);
    setAnnualRepayment(annual);
    setMonthlyRepayment(annual / 12);
    setIsAbove(annualIncome > THRESHOLD);
  }, [annualIncome]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-8 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-2">학자금대출 상환액 계산기</h1>
        <p className="text-[#B8D4F1] text-sm">
          연소득을 입력하면 취업 후 상환(ICL) 의무 상환액을 계산해요
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-white shadow-lg rounded-b-2xl">
        {/* 1. 소득 정보 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">1</span>
            <h2 className="text-lg font-bold text-neutral-800">소득 정보</h2>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <InputField
              label="연간 총 소득 (세전)"
              value={annualIncome}
              onChange={setAnnualIncome}
              description="근로소득 + 사업소득 등"
            />
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            상환기준소득: {formatNumber(THRESHOLD)}원 (2025년 기준, 2026년 미발표)
          </div>
        </div>

        {/* 2. 계산 결과 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">2</span>
            <h2 className="text-lg font-bold text-neutral-800">계산 결과</h2>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] text-white p-6 rounded-xl mb-4">
            {!isAbove ? (
              <>
                <div className="text-sm mb-2 opacity-90">의무 상환액</div>
                <div className="text-3xl font-bold mb-2">0원 (상환 의무 없음)</div>
                <div className="text-sm opacity-75">
                  연소득이 기준소득({formatNumber(THRESHOLD)}원) 이하예요
                </div>
              </>
            ) : (
              <>
                <div className="text-sm mb-2 opacity-90">월 평균 상환액</div>
                <div className="text-3xl font-bold mb-4">{formatNumber(monthlyRepayment)}원</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-75 mb-1">초과소득</div>
                    <div className="text-lg font-semibold">{formatNumber(excessIncome)}원</div>
                  </div>
                  <div>
                    <div className="opacity-75 mb-1">연간 상환액</div>
                    <div className="text-lg font-semibold">{formatNumber(annualRepayment)}원</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {isAbove && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">초과소득 (연소득 - 기준소득)</span>
                <span className="font-semibold text-neutral-800">{formatNumber(excessIncome)}원</span>
              </div>
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">연간 상환액 (초과액 × 20%)</span>
                <span className="font-semibold text-neutral-800">{formatNumber(annualRepayment)}원</span>
              </div>
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">월 상환액 (÷ 12개월)</span>
                <span className="font-semibold text-neutral-800">{formatNumber(monthlyRepayment)}원</span>
              </div>
            </div>
          )}
        </div>

        {/* 안내 사항 */}
        <div className="px-6 pb-6">
          <div className="bg-[#F0F7FF] border border-[#B8D4F1] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">💡 안내 사항</h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>상환기준소득 이하면 0원 상환이지만 이자(약 2.2%)는 계속 붙어요</li>
              <li>국세청 ICL 홈페이지에서 매년 3월경 자동 계산돼요</li>
              <li>실직 6개월 이상이면 상환 유예 신청 가능해요</li>
              <li>2026년 기준은 미발표로 2025년 기준 적용했어요</li>
            </ul>
          </div>
        </div>

        {/* 기준표 */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-neutral-800 mb-3">📊 소득별 상환액 예시</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-left">연소득</th>
                  <th className="px-4 py-2 text-right">초과액</th>
                  <th className="px-4 py-2 text-right">연간 상환</th>
                  <th className="px-4 py-2 text-right">월 상환</th>
                </tr>
              </thead>
              <tbody>
                {[20000000, 25250000, 30000000, 40000000, 50000000].map((income) => {
                  const ex = Math.max(0, income - THRESHOLD);
                  const annual = ex * RATE;
                  return (
                    <tr key={income} className="border-t border-neutral-200">
                      <td className="px-4 py-2">{formatNumber(income)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(ex)}원</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatNumber(annual)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(annual / 12)}원</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
