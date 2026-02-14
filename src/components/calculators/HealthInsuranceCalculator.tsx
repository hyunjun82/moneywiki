"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷 (원 단위)
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// ─── 2026년 건강보험료 기준 (국민건강보험공단) ───
const CRITERIA_2026 = {
  // 직장가입자
  workplace: {
    rate: 0.0719,           // 7.19%
    employeeRate: 0.03595,  // 본인 부담 3.595%
    maxSalary: 9183480 / 0.0719, // 상한액 기준 월급
    maxPremium: 9183480,    // 월 상한액
  },
  // 장기요양보험
  longTermCare: {
    rate: 0.1314,           // 건강보험료의 13.14%
  },
  // 지역가입자 (간이 계산)
  regional: {
    scorePerWon: 211,       // 점수당 금액 (2026년 예상)
  },
};

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

export default function HealthInsuranceCalculator() {
  // ─── 입력 상태 ───
  const [type, setType] = useState<"workplace" | "regional">("workplace");
  const [monthlySalary, setMonthlySalary] = useState(3000000); // 직장: 월급

  // ─── 계산 결과 ───
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [longTermCare, setLongTermCare] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  const [employerShare, setEmployerShare] = useState(0);

  // ─── 계산 로직 ───
  const calculate = useCallback(() => {
    if (type === "workplace") {
      // 직장가입자
      const salary = Math.min(monthlySalary, CRITERIA_2026.workplace.maxSalary);
      
      // 건강보험료 (본인 부담분)
      const health = salary * CRITERIA_2026.workplace.employeeRate;
      setHealthInsurance(Math.min(health, CRITERIA_2026.workplace.maxPremium / 2));

      // 장기요양보험료
      const longTerm = health * CRITERIA_2026.longTermCare.rate;
      setLongTermCare(longTerm);

      // 총 본인 부담
      const total = health + longTerm;
      setTotalPremium(total);

      // 회사 부담 (건강보험료 절반 + 장기요양 절반)
      setEmployerShare(total);
    }
  }, [type, monthlySalary]);

  // ─── 자동 계산 ───
  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-8 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-2">2026 건강보험료 계산기</h1>
        <p className="text-[#B8D4F1] text-sm">
          2026년 보험료율 7.19% 기준으로 건강보험료와 장기요양보험료를 계산해요
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-white shadow-lg rounded-b-2xl">
        {/* 1. 가입자 유형 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">
              1
            </span>
            <h2 className="text-lg font-bold text-neutral-800">가입자 유형</h2>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={type === "workplace"}
                onChange={() => setType("workplace")}
                className="w-4 h-4"
              />
              <span className="text-sm">직장가입자</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={type === "regional"}
                onChange={() => setType("regional")}
                className="w-4 h-4"
              />
              <span className="text-sm">지역가입자 (준비 중)</span>
            </label>
          </div>
        </div>

        {/* 2. 소득 정보 */}
        {type === "workplace" && (
          <div className="p-6 border-b-2 border-neutral-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">
                2
              </span>
              <h2 className="text-lg font-bold text-neutral-800">월급 정보</h2>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <InputField
                label="월급 (보수월액)"
                value={monthlySalary}
                onChange={setMonthlySalary}
                description="세전 월급 (상여금 포함)"
              />
            </div>
          </div>
        )}

        {/* 3. 계산 결과 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">
              3
            </span>
            <h2 className="text-lg font-bold text-neutral-800">계산 결과</h2>
          </div>

          {/* 결과 카드 */}
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] text-white p-6 rounded-xl mb-4">
            <div className="text-sm mb-2 opacity-90">월 납부액 (본인 부담)</div>
            <div className="text-3xl font-bold mb-4">
              {formatNumber(totalPremium)}원
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-75 mb-1">건강보험료</div>
                <div className="text-lg font-semibold">{formatNumber(healthInsurance)}원</div>
              </div>
              <div>
                <div className="opacity-75 mb-1">장기요양보험료</div>
                <div className="text-lg font-semibold">{formatNumber(longTermCare)}원</div>
              </div>
            </div>
          </div>

          {/* 상세 내역 */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">회사 부담액</span>
              <span className="font-semibold text-neutral-800">{formatNumber(employerShare)}원</span>
            </div>
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">총 보험료 (본인+회사)</span>
              <span className="font-semibold text-neutral-800">{formatNumber(totalPremium * 2)}원</span>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="px-6 pb-6">
          <div className="bg-[#F0F7FF] border border-[#B8D4F1] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">💡 안내 사항</h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>2026년 보험료율 7.19% 기준이에요 (본인 3.595%)</li>
              <li>장기요양보험료는 건강보험료의 13.14%예요</li>
              <li>직장가입자는 회사와 절반씩 부담해요</li>
              <li>월 상한액은 9,183,480원이에요</li>
            </ul>
          </div>
        </div>

        {/* 기준표 */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-neutral-800 mb-3">📊 월급별 보험료 (2026년)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-left">월급</th>
                  <th className="px-4 py-2 text-right">건강보험료</th>
                  <th className="px-4 py-2 text-right">장기요양</th>
                  <th className="px-4 py-2 text-right">총액</th>
                </tr>
              </thead>
              <tbody>
                {[2000000, 3000000, 4000000, 5000000, 7000000, 10000000].map((salary) => {
                  const health = salary * 0.03595;
                  const longTerm = health * 0.1314;
                  const total = health + longTerm;
                  return (
                    <tr key={salary} className="border-t border-neutral-200">
                      <td className="px-4 py-2">{formatNumber(salary)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(health)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(longTerm)}원</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatNumber(total)}원</td>
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
