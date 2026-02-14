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

const BENEFIT_RATE = 0.70; // 평균임금의 70%

export default function WorkersCompCalculator() {
  const [averageWage, setAverageWage] = useState(100000);
  const [restDays, setRestDays] = useState(30);

  const [dailyBenefit, setDailyBenefit] = useState(0);
  const [totalBenefit, setTotalBenefit] = useState(0);

  const calculate = useCallback(() => {
    const daily = averageWage * BENEFIT_RATE;
    setDailyBenefit(daily);
    setTotalBenefit(daily * restDays);
  }, [averageWage, restDays]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-8 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-2">산재 휴업급여 계산기</h1>
        <p className="text-[#B8D4F1] text-sm">
          평균임금과 휴업일수를 입력하면 산재보험 휴업급여를 계산해요
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-white shadow-lg rounded-b-2xl">
        {/* 1. 임금 정보 */}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">1</span>
            <h2 className="text-lg font-bold text-neutral-800">임금 정보</h2>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <InputField
              label="1일 평균임금"
              value={averageWage}
              onChange={setAverageWage}
              description="산재 전 3개월 총임금 ÷ 총일수"
            />
            <InputField
              label="휴업일수"
              value={restDays}
              onChange={setRestDays}
              unit="일"
              description="근로불능 기간 (4일 이상)"
            />
          </div>
        </div>

        {/* 2. 계산 결과 */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E3A5F] text-white text-sm font-bold">2</span>
            <h2 className="text-lg font-bold text-neutral-800">계산 결과</h2>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] text-white p-6 rounded-xl mb-4">
            <div className="text-sm mb-2 opacity-90">총 휴업급여</div>
            <div className="text-3xl font-bold mb-4">{formatNumber(totalBenefit)}원</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-75 mb-1">1일 휴업급여 (70%)</div>
                <div className="text-lg font-semibold">{formatNumber(dailyBenefit)}원</div>
              </div>
              <div>
                <div className="opacity-75 mb-1">휴업일수</div>
                <div className="text-lg font-semibold">{formatNumber(restDays)}일</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">평균임금 × 70%</span>
              <span className="font-semibold text-neutral-800">{formatNumber(averageWage)} × 0.70 = {formatNumber(dailyBenefit)}원</span>
            </div>
            <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-neutral-600">1일 급여 × {formatNumber(restDays)}일</span>
              <span className="font-semibold text-neutral-800">{formatNumber(totalBenefit)}원</span>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="px-6 pb-6">
          <div className="bg-[#F0F7FF] border border-[#B8D4F1] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">💡 안내 사항</h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>4일 이상 근로불능이어야 휴업급여가 지급돼요</li>
              <li>평균임금의 70%가 1일 급여로 지급돼요</li>
              <li>요양 기간 동안 기간 제한 없이 지급돼요</li>
              <li>치료비는 별도로 100% 지원돼요</li>
              <li>산재보험료는 사업주가 전액 부담해요</li>
            </ul>
          </div>
        </div>

        {/* 기준표 */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-neutral-800 mb-3">📊 평균임금별 휴업급여</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-4 py-2 text-left">평균임금</th>
                  <th className="px-4 py-2 text-right">1일 급여</th>
                  <th className="px-4 py-2 text-right">30일</th>
                  <th className="px-4 py-2 text-right">90일</th>
                </tr>
              </thead>
              <tbody>
                {[50000, 100000, 150000, 200000, 300000].map((w) => {
                  const daily = w * 0.70;
                  return (
                    <tr key={w} className="border-t border-neutral-200">
                      <td className="px-4 py-2">{formatNumber(w)}원</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatNumber(daily)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(daily * 30)}원</td>
                      <td className="px-4 py-2 text-right">{formatNumber(daily * 90)}원</td>
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
