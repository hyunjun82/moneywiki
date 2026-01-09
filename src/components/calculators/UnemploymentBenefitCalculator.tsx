"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// 고용보험 가입기간 타입
type InsurancePeriod = "under1" | "1to3" | "3to5" | "5to10" | "over10";

// 수급기간 계산 (가입기간 + 나이/장애 여부)
function getBenefitDays(
  insurancePeriod: InsurancePeriod,
  isOver50: boolean,
  isDisabled: boolean
): number {
  const over50OrDisabled = isOver50 || isDisabled;

  const table: Record<InsurancePeriod, [number, number]> = {
    under1: [120, 120],
    "1to3": [150, 180],
    "3to5": [180, 210],
    "5to10": [210, 240],
    over10: [240, 270],
  };

  return over50OrDisabled ? table[insurancePeriod][1] : table[insurancePeriod][0];
}

// 1일 구직급여 계산 (상한/하한 적용)
function calculateDailyBenefit(avgDailyWage: number): {
  benefit: number;
  isUpperLimit: boolean;
  isLowerLimit: boolean;
} {
  const rawBenefit = avgDailyWage * 0.6;
  const upperLimit = 66000; // 2026년 상한액
  const lowerLimit = 64192; // 최저임금 10,030원 × 80% × 8시간

  if (rawBenefit >= upperLimit) {
    return { benefit: upperLimit, isUpperLimit: true, isLowerLimit: false };
  } else if (rawBenefit <= lowerLimit) {
    return { benefit: lowerLimit, isUpperLimit: false, isLowerLimit: true };
  }
  return { benefit: rawBenefit, isUpperLimit: false, isLowerLimit: false };
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

function InputField({
  label,
  value,
  onChange,
  readOnly,
  description,
  highlight,
  unit = "원",
}: InputFieldProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100 ${
        highlight ? "bg-blue-50" : ""
      }`}
    >
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
              : "bg-white border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

export default function UnemploymentBenefitCalculator() {
  // 입력 상태
  const [monthlyWage, setMonthlyWage] = useState(3000000);
  const [isOver50, setIsOver50] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [insurancePeriod, setInsurancePeriod] = useState<InsurancePeriod>("3to5");

  // 계산 결과
  const [avgDailyWage, setAvgDailyWage] = useState(0);
  const [dailyBenefit, setDailyBenefit] = useState(0);
  const [isUpperLimit, setIsUpperLimit] = useState(false);
  const [isLowerLimit, setIsLowerLimit] = useState(false);
  const [benefitDays, setBenefitDays] = useState(0);
  const [monthlyBenefit, setMonthlyBenefit] = useState(0);
  const [totalBenefit, setTotalBenefit] = useState(0);

  const calculate = useCallback(() => {
    // 1일 평균임금
    const dailyWage = monthlyWage / 30;
    setAvgDailyWage(dailyWage);

    // 1일 구직급여 (상한/하한 적용)
    const { benefit, isUpperLimit: upper, isLowerLimit: lower } =
      calculateDailyBenefit(dailyWage);
    setDailyBenefit(benefit);
    setIsUpperLimit(upper);
    setIsLowerLimit(lower);

    // 수급기간
    const days = getBenefitDays(insurancePeriod, isOver50, isDisabled);
    setBenefitDays(days);

    // 월 예상 수령액
    setMonthlyBenefit(benefit * 30);

    // 총 예상 수령액
    setTotalBenefit(benefit * days);
  }, [monthlyWage, isOver50, isDisabled, insurancePeriod]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const insurancePeriodOptions: { value: InsurancePeriod; label: string }[] = [
    { value: "under1", label: "1년 미만" },
    { value: "1to3", label: "1년 ~ 3년" },
    { value: "3to5", label: "3년 ~ 5년" },
    { value: "5to10", label: "5년 ~ 10년" },
    { value: "over10", label: "10년 이상" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold">실업급여 계산기</h2>
        <p className="text-blue-100 text-sm mt-1">
          퇴직하면 얼마나 받을 수 있는지 바로 확인하세요
        </p>
      </div>

      {/* 나이/장애 선택 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">1. 나이와 장애 여부</h3>
          <p className="text-xs text-neutral-500 mt-1">
            50세 이상이거나 장애인이면 더 오래 받을 수 있어요
          </p>
        </div>
        <div className="p-4 space-y-4">
          {/* 나이 선택 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-32">
              나이
            </span>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="age"
                  checked={!isOver50}
                  onChange={() => setIsOver50(false)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-neutral-700">50세 미만</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="age"
                  checked={isOver50}
                  onChange={() => setIsOver50(true)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-neutral-700">50세 이상</span>
              </label>
            </div>
          </div>

          {/* 장애인 여부 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-32">
              장애인 여부
            </span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-neutral-700">
                장애인 등록되어 있어요
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 고용보험 가입기간 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">2. 고용보험 가입기간</h3>
          <p className="text-xs text-neutral-500 mt-1">
            여러 직장 합산이에요. 고용보험 홈페이지에서 확인할 수 있어요
          </p>
        </div>
        <div className="p-4">
          <select
            value={insurancePeriod}
            onChange={(e) => setInsurancePeriod(e.target.value as InsurancePeriod)}
            className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-neutral-700"
          >
            {insurancePeriodOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <a
            href="https://www.ei.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-blue-600 hover:underline"
          >
            → 고용보험 가입기간 조회하기
          </a>
        </div>
      </div>

      {/* 월급 입력 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">3. 퇴직 전 월급</h3>
          <p className="text-xs text-neutral-500 mt-1">
            세금 떼기 전 월급 (세전)으로 입력하세요
          </p>
        </div>
        <InputField
          label="월 평균 급여"
          value={monthlyWage}
          onChange={setMonthlyWage}
          description="최근 3개월 평균"
        />
      </div>

      {/* 계산 과정 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">4. 계산 과정</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-600">
              ① 1일 평균임금 ({formatNumber(monthlyWage)} ÷ 30)
            </span>
            <span className="font-medium">{formatNumber(avgDailyWage)}원</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-600">
              ② 1일 구직급여 ({formatNumber(avgDailyWage)} × 60%)
            </span>
            <span className="font-medium">
              {formatNumber(avgDailyWage * 0.6)}원
            </span>
          </div>
          {(isUpperLimit || isLowerLimit) && (
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-amber-50 -mx-4 px-4">
              <span className="text-amber-700 font-medium">
                {isUpperLimit
                  ? "③ 상한액 적용 (1일 66,000원 초과)"
                  : "③ 하한액 적용 (최저임금 80%)"}
              </span>
              <span className="font-bold text-amber-700">
                {formatNumber(dailyBenefit)}원
              </span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-neutral-100 bg-blue-50 -mx-4 px-4">
            <span className="text-neutral-700 font-medium">
              수급기간 ({isOver50 || isDisabled ? "50세 이상/장애인" : "50세 미만"},{" "}
              {insurancePeriodOptions.find((o) => o.value === insurancePeriod)?.label})
            </span>
            <span className="font-bold text-blue-700">{benefitDays}일</span>
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="bg-blue-600 px-6 py-3">
          <h3 className="font-semibold text-white">실업급여 계산 결과</h3>
        </div>
        <div className="p-6">
          {/* 주요 결과 */}
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-neutral-500 mb-2">총 예상 수령액</p>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {formatNumber(totalBenefit)}원
            </p>
            <p className="text-sm text-neutral-500">
              = {formatNumber(dailyBenefit)}원 × {benefitDays}일
            </p>
          </div>

          {/* 세부 결과 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">1일 구직급여</p>
              <p className="text-xl font-bold text-neutral-800">
                {formatNumber(dailyBenefit)}원
              </p>
              {isUpperLimit && (
                <span className="text-xs text-amber-600">상한액</span>
              )}
              {isLowerLimit && (
                <span className="text-xs text-amber-600">하한액</span>
              )}
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">월 예상 수령액</p>
              <p className="text-xl font-bold text-neutral-800">
                {formatNumber(monthlyBenefit)}원
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">수급 기간</p>
              <p className="text-xl font-bold text-neutral-800">{benefitDays}일</p>
              <span className="text-xs text-neutral-500">
                약 {Math.round(benefitDays / 30)}개월
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">실업인정 횟수</p>
              <p className="text-xl font-bold text-neutral-800">
                {Math.ceil(benefitDays / 28)}회
              </p>
              <span className="text-xs text-neutral-500">4주마다 1회</span>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-4 p-4 bg-white/50 rounded-xl">
            <p className="text-sm text-neutral-600">
              💡 <strong>실업급여는 4주마다 실업인정</strong>을 받아야 지급돼요. 구직활동을
              하고 고용센터에 신고하면 돼요.
            </p>
          </div>
        </div>
      </div>

      {/* 수급 조건 안내 */}
      <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
        <h4 className="font-medium text-amber-800 mb-2">⚠️ 실업급여 받으려면</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• 고용보험 가입 180일 이상 (퇴직 전 18개월 중)</li>
          <li>• 비자발적 퇴사 (권고사직, 계약만료, 정리해고 등)</li>
          <li>• 적극적인 구직활동 의사</li>
          <li>• 퇴직 후 12개월 이내 신청</li>
        </ul>
      </div>

      {/* 주의사항 */}
      <div className="px-6 py-4 bg-neutral-50 text-xs text-neutral-500">
        <p>* 이 계산기는 참고용이에요. 실제 금액과 다를 수 있어요.</p>
        <p>
          * 정확한 금액은{" "}
          <a
            href="https://www.ei.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            고용24
          </a>
          에서 확인하세요.
        </p>
        <p>* 2026년 기준: 상한액 66,000원, 하한액 64,192원</p>
      </div>
    </div>
  );
}
