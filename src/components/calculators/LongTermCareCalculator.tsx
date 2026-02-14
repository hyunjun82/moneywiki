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

// 등급별 월 한도액 (2026년 기준)
const LIMITS: Record<number, number> = {
  1: 1600000, 2: 1400000, 3: 1300000, 4: 1200000, 5: 1100000, 6: 600000,
};

const GRADE_NAMES: Record<number, string> = {
  1: "1등급 (95점 이상)", 2: "2등급 (75~95점)", 3: "3등급 (60~75점)",
  4: "4등급 (51~60점)", 5: "5등급 (45~51점, 치매)", 6: "인지지원등급 (45점 미만, 치매)",
};

export default function LongTermCareCalculator() {
  const [serviceType, setServiceType] = useState<"home" | "facility">("home");
  const [grade, setGrade] = useState(3);
  const [monthlyCost, setMonthlyCost] = useState(1000000);
  const [isBeneficiary, setIsBeneficiary] = useState(false);

  const [copayment, setCopayment] = useState(0);
  const [publicSupport, setPublicSupport] = useState(0);
  const [excessCost, setExcessCost] = useState(0);

  const copayRate = serviceType === "home" ? 0.15 : 0.20;
  const limit = LIMITS[grade];

  const calculate = useCallback(() => {
    if (isBeneficiary) {
      setCopayment(0);
      setPublicSupport(monthlyCost);
      setExcessCost(0);
      return;
    }

    if (serviceType === "home") {
      const withinLimit = Math.min(monthlyCost, limit);
      const excess = Math.max(0, monthlyCost - limit);
      setCopayment(withinLimit * copayRate + excess);
      setPublicSupport(withinLimit * (1 - copayRate));
      setExcessCost(excess);
    } else {
      setCopayment(monthlyCost * copayRate);
      setPublicSupport(monthlyCost * (1 - copayRate));
      setExcessCost(0);
    }
  }, [serviceType, grade, monthlyCost, isBeneficiary, copayRate, limit]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-8 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-2">노인장기요양 본인부담금 계산기</h1>
        <p className="text-[#B8D4F1] text-sm">
          서비스 유형과 등급, 비용을 입력하면 본인부담금을 계산해요
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-white shadow-lg rounded-b-2xl">
        {/* 1. 서비스 유형 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">1</span>
            <h2 className="text-lg font-bold text-neutral-800">서비스 유형</h2>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={serviceType === "home"} onChange={() => setServiceType("home")} className="w-4 h-4" />
              <span className="text-sm">재가급여 (방문요양 등, 15%)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={serviceType === "facility"} onChange={() => setServiceType("facility")} className="w-4 h-4" />
              <span className="text-sm">시설급여 (요양원, 20%)</span>
            </label>
          </div>
        </div>

        {/* 2. 등급·비용 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">2</span>
            <h2 className="text-lg font-bold text-neutral-800">등급 및 비용</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">장기요양등급</label>
              <select
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value))}
                className="px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
              >
                {Object.entries(GRADE_NAMES).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              {serviceType === "home" && (
                <div className="text-xs text-neutral-500 mt-1">월 한도액: {formatNumber(limit)}원</div>
              )}
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <InputField
                label={serviceType === "home" ? "월 이용 비용" : "월 요양원 비용"}
                value={monthlyCost}
                onChange={setMonthlyCost}
                description={serviceType === "home" && monthlyCost > limit ? `한도 초과 ${formatNumber(monthlyCost - limit)}원` : undefined}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isBeneficiary} onChange={(e) => setIsBeneficiary(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">기초생활수급자 (본인부담 면제)</span>
            </label>
          </div>
        </div>

        {/* 3. 계산 결과 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">3</span>
            <h2 className="text-lg font-bold text-neutral-800">계산 결과</h2>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] text-white p-6 rounded-xl mb-4">
            <div className="text-sm mb-2 opacity-90">본인부담금</div>
            <div className="text-3xl font-bold mb-4">
              {isBeneficiary ? "0원 (면제)" : `${formatNumber(copayment)}원`}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-75 mb-1">공단 지원금</div>
                <div className="text-lg font-semibold">{formatNumber(publicSupport)}원</div>
              </div>
              <div>
                <div className="opacity-75 mb-1">총 서비스 비용</div>
                <div className="text-lg font-semibold">{formatNumber(monthlyCost)}원</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">본인부담률</span>
              <span className="font-semibold text-neutral-800">{isBeneficiary ? "면제" : `${copayRate * 100}%`}</span>
            </div>
            {serviceType === "home" && excessCost > 0 && !isBeneficiary && (
              <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">한도 초과 (100% 부담)</span>
                <span className="font-semibold text-neutral-800">{formatNumber(excessCost)}원</span>
              </div>
            )}
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="px-6 pb-6">
          <div className="bg-[#F0F7FF] border border-[#B8D4F1] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">💡 안내 사항</h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>재가급여 본인부담 15%, 시설급여 본인부담 20%예요</li>
              <li>재가급여는 등급별 월 한도 초과분은 100% 본인부담이에요</li>
              <li>기초생활수급자·의료급여 수급자는 전액 면제돼요</li>
              <li>장기요양 상담: 1577-1000 (국민건강보험공단)</li>
            </ul>
          </div>
        </div>

        {/* 등급별 한도 기준표 */}
        {serviceType === "home" && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-neutral-800 mb-3">📊 등급별 월 한도액</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="px-4 py-2 text-left">등급</th>
                    <th className="px-4 py-2 text-right">월 한도</th>
                    <th className="px-4 py-2 text-right">본인부담 (15%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(LIMITS).map(([g, lim]) => (
                    <tr key={g} className="border-t border-neutral-200">
                      <td className="px-4 py-2">{g === "6" ? "인지지원" : `${g}등급`}</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatNumber(lim)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(lim * 0.15)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
