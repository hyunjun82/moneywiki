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

// ─── 2026년 기준 중위소득 (보건복지부 고시 2026.01.01) ───
const MEDIAN_INCOME_2026: Record<number, number> = {
  1: 2392013,
  2: 3932658,
  3: 5025353,
  4: 6097773,
  5: 7108688,
  6: 8064805,
  7: 6097773, // 7인 이상은 1인 증가 시 약 95만 추가 (근사치)
};

// 가구원수별 기준 중위소득 계산 (7인 이상)
function getMedianIncome(members: number): number {
  if (members <= 6) return MEDIAN_INCOME_2026[members];
  // 7인 이상: 6인 기준 + (members - 6) × (6인 - 5인 차이)
  const perPerson = MEDIAN_INCOME_2026[6] - MEDIAN_INCOME_2026[5];
  return MEDIAN_INCOME_2026[6] + (members - 6) * perPerson;
}

// ─── 교육비 지원 기준 (교육부 2026년) ───
const EDUCATION_SUPPORT_2026 = {
  // 교육활동지원비 (연 1회 지급, 중위소득 50% 이하)
  activitySupport: {
    incomeRatio: 0.50,
    amounts: {
      elementary: 461000,  // 초등학교
      middle: 654000,      // 중학교
      high: 727000,        // 고등학교
    },
  },
  // 급식비 (중위소득 50% 이하)
  mealSupport: {
    incomeRatio: 0.50,
    monthly: {
      elementary: 74000,   // 월 약 7.4만 원 (연 약 89만)
      middle: 89000,       // 월 약 8.9만 원 (연 약 107만)
      high: 96000,         // 월 약 9.6만 원 (연 약 115만)
    },
    schoolMonths: 12, // 연간 지원
  },
  // 방과후학교 자유수강권 (중위소득 60% 이하)
  afterSchool: {
    incomeRatio: 0.60,
    annualLimit: 600000, // 연 60만 원 한도
  },
  // 고교 입학금·수업료 (무상교육 전면 시행)
  highSchoolTuition: {
    freeEducation: true, // 2021년부터 전면 무상교육
  },
  // 인터넷 통신비 (중위소득 50% 이하, 월 정액)
  internetSupport: {
    incomeRatio: 0.50,
    monthly: 23100, // 월 23,100원
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

// 지원 항목 결과 카드
interface SupportItemProps {
  title: string;
  eligible: boolean;
  amount: string;
  description: string;
  period: string;
}

function SupportItem({ title, eligible, amount, description, period }: SupportItemProps) {
  return (
    <div className={`p-4 rounded-xl border ${eligible ? "border-[#B8D0E8] bg-[#F5F8FB]" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className={`font-semibold ${eligible ? "text-[#1E3A5F]" : "text-neutral-400"}`}>{title}</h4>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${eligible ? "bg-[#1E3A5F] text-white" : "bg-neutral-200 text-neutral-500"}`}>
          {eligible ? "지원 대상" : "대상 아님"}
        </span>
      </div>
      <p className={`text-2xl font-bold mb-1 ${eligible ? "text-[#1E3A5F]" : "text-neutral-300"}`}>{amount}</p>
      <p className={`text-xs ${eligible ? "text-neutral-600" : "text-neutral-400"}`}>{description}</p>
      <p className={`text-xs mt-1 ${eligible ? "text-[#4A7AB5]" : "text-neutral-400"}`}>{period}</p>
    </div>
  );
}

export default function EducationCostCalculator() {
  // ─── 입력 상태 ───
  const [familyMembers, setFamilyMembers] = useState(4);
  const [monthlyIncome, setMonthlyIncome] = useState(0); // 월 소득 (세전)
  const [schoolLevel, setSchoolLevel] = useState<"elementary" | "middle" | "high">("elementary");
  const [childCount, setChildCount] = useState(1); // 해당 학교급 자녀 수

  // ─── 계산 결과 ───
  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeRatio, setIncomeRatio] = useState(0);
  const [isActivity, setIsActivity] = useState(false);
  const [isMeal, setIsMeal] = useState(false);
  const [isAfterSchool, setIsAfterSchool] = useState(false);
  const [isInternet, setIsInternet] = useState(false);

  const [activityAmount, setActivityAmount] = useState(0);
  const [mealAmount, setMealAmount] = useState(0);
  const [afterSchoolAmount, setAfterSchoolAmount] = useState(0);
  const [internetAmount, setInternetAmount] = useState(0);
  const [totalAnnual, setTotalAnnual] = useState(0);

  // ─── 계산 로직 ───
  const calculate = useCallback(() => {
    // 1) 기준 중위소득
    const median = getMedianIncome(familyMembers);
    setMedianIncome(median);

    // 2) 소득 비율 (%)
    const ratio = median > 0 ? (monthlyIncome / median) * 100 : 0;
    setIncomeRatio(ratio);

    // 3) 교육활동지원비 (중위소득 50% 이하)
    const activityEligible = ratio <= 50;
    setIsActivity(activityEligible);
    const activityAmt = activityEligible
      ? EDUCATION_SUPPORT_2026.activitySupport.amounts[schoolLevel] * childCount
      : 0;
    setActivityAmount(activityAmt);

    // 4) 급식비 (중위소득 50% 이하)
    const mealEligible = ratio <= 50;
    setIsMeal(mealEligible);
    const mealAmt = mealEligible
      ? EDUCATION_SUPPORT_2026.mealSupport.monthly[schoolLevel] * EDUCATION_SUPPORT_2026.mealSupport.schoolMonths * childCount
      : 0;
    setMealAmount(mealAmt);

    // 5) 방과후학교 자유수강권 (중위소득 60% 이하)
    const afterSchoolEligible = ratio <= 60;
    setIsAfterSchool(afterSchoolEligible);
    const afterSchoolAmt = afterSchoolEligible
      ? EDUCATION_SUPPORT_2026.afterSchool.annualLimit * childCount
      : 0;
    setAfterSchoolAmount(afterSchoolAmt);

    // 6) 인터넷 통신비 (중위소득 50% 이하)
    const internetEligible = ratio <= 50;
    setIsInternet(internetEligible);
    const internetAmt = internetEligible
      ? EDUCATION_SUPPORT_2026.internetSupport.monthly * 12
      : 0;
    setInternetAmount(internetAmt);

    // 7) 총 연간 지원 금액
    setTotalAnnual(activityAmt + mealAmt + afterSchoolAmt + internetAmt);
  }, [familyMembers, monthlyIncome, schoolLevel, childCount]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const schoolLevelLabel = schoolLevel === "elementary" ? "초등학교" : schoolLevel === "middle" ? "중학교" : "고등학교";

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-[#1E3A5F] text-white px-6 py-4">
          <h2 className="text-xl font-bold">교육비 지원 모의계산기</h2>
          <p className="text-[#EDF2F8] text-sm mt-1">2026년 교육부 기준으로 초중고 교육비 지원 대상 여부와 예상 금액을 확인해요</p>
        </div>

        {/* ─── 1. 가구 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">1. 가구 정보</h3>
            <p className="text-xs text-neutral-500 mt-1">가구원수와 월 소득을 입력하세요</p>
          </div>

          {/* 가구원수 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-sm font-medium text-neutral-700">가구원수</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <select
                value={familyMembers}
                onChange={(e) => setFamilyMembers(parseInt(e.target.value))}
                className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n}인 가구</option>
                ))}
              </select>
            </div>
            <div className="sm:w-64 text-xs text-neutral-500">
              학생 본인 포함 가족 수
            </div>
          </div>

          {/* 월 소득 */}
          <InputField
            label="가구 월 소득 (세전)"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            description="근로·사업·재산·이전소득 합산"
          />

          {/* 기준 중위소득 표시 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100 bg-[#F5F8FB]">
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-sm font-medium text-neutral-700">{familyMembers}인 가구 기준 중위소득</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-[#1E3A5F]">{formatNumber(medianIncome)}원</span>
              <span className="text-xs text-neutral-500 ml-2">
                (내 소득 = 중위소득의 <span className={`font-bold ${incomeRatio <= 50 ? "text-[#15803D]" : incomeRatio <= 60 ? "text-amber-600" : "text-red-600"}`}>{incomeRatio.toFixed(1)}%</span>)
              </span>
            </div>
          </div>
        </div>

        {/* ─── 2. 학생 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">2. 학생 정보</h3>
            <p className="text-xs text-neutral-500 mt-1">교육비 지원 대상 자녀의 학교급과 인원을 선택하세요</p>
          </div>

          {/* 학교급 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">학교급</span>
              <div className="flex gap-3">
                {(["elementary", "middle", "high"] as const).map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="schoolLevel"
                      checked={schoolLevel === level}
                      onChange={() => setSchoolLevel(level)}
                      className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]"
                    />
                    <span className="text-sm text-neutral-700">
                      {level === "elementary" ? "초등학교" : level === "middle" ? "중학교" : "고등학교"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 자녀 수 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-sm font-medium text-neutral-700">해당 학교급 자녀 수</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <select
                value={childCount}
                onChange={(e) => setChildCount(parseInt(e.target.value))}
                className="w-24 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>
            <div className="sm:w-64 text-xs text-neutral-500">
              같은 학교급에 재학 중인 자녀 수
            </div>
          </div>
        </div>

        {/* ─── 3. 소득 구간 판정 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">3. 소득 구간 판정</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">가구 월 소득</span>
              <span className="font-medium">{formatNumber(monthlyIncome)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">{familyMembers}인 가구 기준 중위소득</span>
              <span className="font-medium">{formatNumber(medianIncome)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-[#F5F8FB] -mx-4 px-4">
              <span className="font-medium text-neutral-700">소득 비율</span>
              <span className={`font-bold ${incomeRatio <= 50 ? "text-[#15803D]" : incomeRatio <= 60 ? "text-amber-600" : "text-red-600"}`}>
                중위소득의 {incomeRatio.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">50% 기준 (교육활동·급식·인터넷)</span>
              <span className="font-medium">{formatNumber(medianIncome * 0.5)}원 이하</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">60% 기준 (방과후 자유수강권)</span>
              <span className="font-medium">{formatNumber(medianIncome * 0.6)}원 이하</span>
            </div>
          </div>
        </div>

        {/* ─── 4. 지원 항목별 결과 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-[#1E3A5F] px-6 py-3">
            <h3 className="font-semibold text-white">교육비 지원 예상 결과</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SupportItem
              title="교육활동지원비"
              eligible={isActivity}
              amount={`${formatNumber(activityAmount)}원`}
              description={`${schoolLevelLabel} ${childCount}명 x ${formatNumber(EDUCATION_SUPPORT_2026.activitySupport.amounts[schoolLevel])}원`}
              period="연 1회 지급"
            />
            <SupportItem
              title="급식비"
              eligible={isMeal}
              amount={`${formatNumber(mealAmount)}원`}
              description={`월 ${formatNumber(EDUCATION_SUPPORT_2026.mealSupport.monthly[schoolLevel])}원 x 12개월 x ${childCount}명`}
              period="매월 지급"
            />
            <SupportItem
              title="방과후학교 자유수강권"
              eligible={isAfterSchool}
              amount={`${formatNumber(afterSchoolAmount)}원`}
              description={`연 ${formatNumber(EDUCATION_SUPPORT_2026.afterSchool.annualLimit)}원 한도 x ${childCount}명`}
              period="학기별 지급"
            />
            <SupportItem
              title="인터넷 통신비"
              eligible={isInternet}
              amount={`${formatNumber(internetAmount)}원`}
              description={`월 ${formatNumber(EDUCATION_SUPPORT_2026.internetSupport.monthly)}원 x 12개월`}
              period="매월 지급 (가구당 1회)"
            />
          </div>
        </div>

        {/* ─── 5. 총 지원 금액 ─── */}
        {totalAnnual > 0 && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
            <div className="p-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-neutral-500 mb-2">연간 예상 교육비 지원 합계</p>
                <p className="text-4xl font-bold text-[#1E3A5F] mb-2">
                  {formatNumber(totalAnnual)}원
                </p>
                <p className="text-sm text-neutral-500">
                  월 평균 약 {formatNumber(Math.round(totalAnnual / 12))}원
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">학교급</p>
                  <p className="text-lg font-bold text-neutral-800">{schoolLevelLabel}</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">소득 구간</p>
                  <p className="text-lg font-bold text-neutral-800">
                    {incomeRatio <= 50 ? "50% 이하" : "60% 이하"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {totalAnnual === 0 && monthlyIncome > 0 && (
          <div className="p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="font-medium text-[#132A42]">현재 소득으로는 교육비 지원 대상이 아니에요</p>
              <p className="text-sm text-amber-700 mt-1">
                가구 소득이 기준 중위소득의 60%({formatNumber(medianIncome * 0.6)}원)를 초과해요.
                시도교육청별 추가 지원이 있을 수 있으니 해당 교육청에 문의하세요.
              </p>
            </div>
          </div>
        )}

        {/* ─── 안내 박스 ─── */}
        <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
          <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
            <h4 className="font-medium text-[#132A42] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              교육비 지원이 뭔가요?
            </h4>
            <p className="text-sm text-[#162F4F] mb-2">
              경제적으로 어려운 가정의 초중고 학생에게 교육활동지원비, 급식비, 방과후학교 자유수강권 등을 지원하는 제도예요.
              <span className="font-medium"> 매년 3월에 교육비 원클릭 신청시스템으로 간편하게 신청할 수 있어요.</span>
            </p>
            <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>신청:</strong> <a href="https://oneclick.neis.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">교육비 원클릭 신청시스템</a> 또는 복지로</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>신청 시기:</strong> 연중 수시 (집중 신청기간 3월)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>소득 기준:</strong> 중위소득 50~60% 이하 (항목별 다름)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">&#9888;</span>
                <span><strong>고교 무상교육:</strong> 2021년부터 고등학교 입학금·수업료 전액 면제 (소득 무관)</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-[#B8D0E8]">
              <p className="text-xs text-[#1E3A5F]">
                출처: <a href="https://www.moe.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">교육부</a> · <a href="https://oneclick.neis.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">교육비 원클릭</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">복지로</a>
              </p>
            </div>
          </div>
        </div>

        {/* ─── 기준표 ─── */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-3 text-center">2026년 교육비 지원 기준표</h4>
            <p className="text-xs text-neutral-500 text-center mb-3">교육부 고시 (2026년 기준)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">지원 항목</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">소득 기준</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">초등</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">중등</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">고등</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">교육활동지원비</td>
                    <td className="py-2 px-2 text-center border border-gray-300">50% 이하</td>
                    <td className="py-2 px-2 text-center border border-gray-300">46.1만</td>
                    <td className="py-2 px-2 text-center border border-gray-300">65.4만</td>
                    <td className="py-2 px-2 text-center border border-gray-300">72.7만</td>
                  </tr>
                  <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-[#162F4F] border border-gray-300">급식비</td>
                    <td className="py-2 px-2 text-center border border-gray-300">50% 이하</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 7.4만</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 8.9만</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 9.6만</td>
                  </tr>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">방과후 수강권</td>
                    <td className="py-2 px-2 text-center border border-gray-300">60% 이하</td>
                    <td className="py-2 px-2 text-center border border-gray-300" colSpan={3}>연 60만 원 한도</td>
                  </tr>
                  <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-[#162F4F] border border-gray-300">인터넷 통신비</td>
                    <td className="py-2 px-2 text-center border border-gray-300">50% 이하</td>
                    <td className="py-2 px-2 text-center border border-gray-300" colSpan={3}>월 23,100원</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">고교 수업료</td>
                    <td className="py-2 px-2 text-center border border-gray-300">전원</td>
                    <td className="py-2 px-2 text-center border border-gray-300" colSpan={3}>무상교육 (전면 시행)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
              <p className="text-xs text-[#132A42] font-medium">2026년 가구원수별 기준 중위소득 (월)</p>
              <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
                <li>&#8226; <strong>2인:</strong> {formatNumber(MEDIAN_INCOME_2026[2])}원 | <strong>3인:</strong> {formatNumber(MEDIAN_INCOME_2026[3])}원</li>
                <li>&#8226; <strong>4인:</strong> {formatNumber(MEDIAN_INCOME_2026[4])}원 | <strong>5인:</strong> {formatNumber(MEDIAN_INCOME_2026[5])}원</li>
                <li>&#8226; <strong>6인:</strong> {formatNumber(MEDIAN_INCOME_2026[6])}원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
