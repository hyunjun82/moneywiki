"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷 (원 단위)
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 만원 단위 포맷
function formatManWon(num: number): string {
  const man = num / 10000;
  if (man >= 10000) return `${(man / 10000).toFixed(1)}억`;
  return `${formatNumber(man)}만`;
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// ─── 2026년 기초연금 기준 (보건복지부 보도자료 2026.01.01) ───
const CRITERIA_2026 = {
  // 선정기준액
  selection: {
    single: 2470000,   // 단독가구 월 247만 원
    couple: 3952000,   // 부부가구 월 395만 2천 원
  },
  // 기초연금 기본액
  pension: {
    full: 349360,      // 기준연금액 (2026년)
    coupleDeduction: 0.8, // 부부 감액 20%
  },
  // 국민연금 연계 감액 기준
  nationalPensionCap: 524040, // 기준연금액의 150%
  // 재산 기본공제
  propertyDeduction: {
    metro: 135000000,   // 대도시 1억 3,500만 원
    city: 85000000,     // 중소도시 8,500만 원
    rural: 72500000,    // 농어촌 7,250만 원
  },
  // 근로소득 공제
  workIncomeDeduction: 1120000, // 월 112만 원 기본공제 후 30% 추가공제
};

// ─── 소득인정액 계산 공식 (보건복지부 기준) ───
// 소득인정액 = 월 소득평가액 + 재산의 소득환산액
// 월 소득평가액 = {0.7 × (근로소득 - 112만원)} + 기타소득
// 재산의 소득환산액 = [{(일반재산 - 기본공제) + (금융재산 - 2,000만원) - 부채} × 4% ÷ 12]

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

export default function BasicPensionCalculator() {
  // ─── 입력 상태 ───
  const [birthYear, setBirthYear] = useState(1959);
  const [householdType, setHouseholdType] = useState<"single" | "couple">("single");
  const [region, setRegion] = useState<"metro" | "city" | "rural">("metro");

  // 소득
  const [workIncome, setWorkIncome] = useState(0);       // 근로소득
  const [pensionIncome, setPensionIncome] = useState(0);  // 국민연금 등
  const [otherIncome, setOtherIncome] = useState(0);      // 사업·이자·배당 등

  // 재산
  const [generalProperty, setGeneralProperty] = useState(0);  // 일반재산 (주택·토지)
  const [financialAsset, setFinancialAsset] = useState(0);    // 금융재산 (예금·적금)
  const [debt, setDebt] = useState(0);                         // 부채

  // ─── 계산 결과 ───
  const [age, setAge] = useState(0);
  const [isEligibleAge, setIsEligibleAge] = useState(false);

  const [workIncomeEval, setWorkIncomeEval] = useState(0);
  const [monthlyIncomeEval, setMonthlyIncomeEval] = useState(0);
  const [propertyIncomeEval, setPropertyIncomeEval] = useState(0);
  const [totalIncomeRecognized, setTotalIncomeRecognized] = useState(0);

  const [selectionCriteria, setSelectionCriteria] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [pensionAmount, setPensionAmount] = useState(0);

  // ─── 계산 로직 ───
  const calculate = useCallback(() => {
    // 1) 나이 확인
    const currentAge = 2026 - birthYear;
    setAge(currentAge);
    setIsEligibleAge(currentAge >= 65);

    // 2) 선정기준액
    const criteria = householdType === "single"
      ? CRITERIA_2026.selection.single
      : CRITERIA_2026.selection.couple;
    setSelectionCriteria(criteria);

    // 3) 근로소득 평가 (112만 원 공제 후 30% 추가 공제)
    const workDeducted = Math.max(0, workIncome - CRITERIA_2026.workIncomeDeduction);
    const workEval = workDeducted * 0.7;
    setWorkIncomeEval(workEval);

    // 4) 월 소득평가액 = 근로소득 평가 + 국민연금 + 기타소득
    const monthlyIncome = workEval + pensionIncome + otherIncome;
    setMonthlyIncomeEval(monthlyIncome);

    // 5) 재산의 소득환산액
    const deduction = CRITERIA_2026.propertyDeduction[region];
    const financialDeducted = Math.max(0, financialAsset - 20000000); // 금융 2천만 공제
    const netProperty = Math.max(0, (generalProperty - deduction) + financialDeducted - debt);
    const propertyIncome = (netProperty * 0.04) / 12;
    setPropertyIncomeEval(propertyIncome);

    // 6) 소득인정액
    const total = monthlyIncome + propertyIncome;
    setTotalIncomeRecognized(total);

    // 7) 수급 여부 판정
    const eligible = currentAge >= 65 && total <= criteria;
    setIsEligible(eligible);

    // 8) 연금액 산출
    if (eligible) {
      let amount = CRITERIA_2026.pension.full;

      // 부부 감액 (20%)
      if (householdType === "couple") {
        amount = Math.round(amount * CRITERIA_2026.pension.coupleDeduction);
      }

      // 국민연금 연계 감액: 국민연금 월 수령액이 기준연금액의 150% 초과 시
      if (pensionIncome > CRITERIA_2026.nationalPensionCap) {
        const reduction = Math.round(amount * 0.5); // 최대 50% 감액
        amount = Math.max(Math.round(amount * 0.5), amount - reduction);
      }

      // 소득역전 방지 감액: 소득인정액 + 기초연금이 선정기준 초과 시
      if (total + amount > criteria) {
        const adjusted = Math.max(0, criteria - total);
        // 최소 기준연금액의 50%는 보장
        amount = Math.max(Math.round(CRITERIA_2026.pension.full * 0.5), adjusted);
      }

      setPensionAmount(amount);
    } else {
      setPensionAmount(0);
    }
  }, [birthYear, householdType, region, workIncome, pensionIncome, otherIncome, generalProperty, financialAsset, debt]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-[#1E3A5F] text-white px-6 py-4">
          <h2 className="text-xl font-bold">기초연금 모의계산기</h2>
          <p className="text-[#EDF2F8] text-sm mt-1">2026년 보건복지부 기준으로 예상 수급액을 계산해요</p>
        </div>

        {/* ─── 1. 기본 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">1. 기본 정보</h3>
            <p className="text-xs text-neutral-500 mt-1">만 65세 이상(1961년생 이전)이면 신청할 수 있어요</p>
          </div>

          {/* 출생연도 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-sm font-medium text-neutral-700">출생연도</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(parseInt(e.target.value) || 0)}
                min="1920"
                max="1961"
                className="w-28 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
              />
              <span className="text-sm text-neutral-500">년</span>
            </div>
            <div className="sm:w-64 text-xs text-neutral-500">
              2026년 기준 만 {age}세 {isEligibleAge && "✓"}
            </div>
          </div>

          {!isEligibleAge && birthYear > 0 && (
            <div className="mx-4 my-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="font-medium text-[#132A42]">아직 신청 대상이 아니에요</p>
              <p className="text-sm text-amber-700 mt-1">
                만 65세 이상부터 기초연금을 신청할 수 있어요. {65 - age > 0 ? `${65 - age}년 후(${birthYear + 65}년)` : ""} 생일이 속한 달 1개월 전부터 신청 가능해요.
              </p>
            </div>
          )}

          {/* 가구형태 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">가구형태</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="household" checked={householdType === "single"} onChange={() => setHouseholdType("single")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">단독가구</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="household" checked={householdType === "couple"} onChange={() => setHouseholdType("couple")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">부부가구</span>
                </label>
              </div>
            </div>
            {householdType === "couple" && (
              <p className="text-xs text-neutral-500 mt-1 sm:ml-48">부부 모두 기초연금을 받으면 각각 20% 감액돼요</p>
            )}
          </div>

          {/* 거주지역 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">거주지역</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as "metro" | "city" | "rural")}
                className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700"
              >
                <option value="metro">대도시 (특별시·광역시)</option>
                <option value="city">중소도시 (시 지역)</option>
                <option value="rural">농어촌 (군 지역)</option>
              </select>
            </div>
            <p className="text-xs text-neutral-500 mt-1 sm:ml-48">
              재산 기본공제: {region === "metro" ? "1억 3,500만" : region === "city" ? "8,500만" : "7,250만"} 원
            </p>
          </div>
        </div>

        {/* ─── 2. 소득 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">2. 월 소득 (세전)</h3>
            <p className="text-xs text-neutral-500 mt-1">본인과 배우자 합산 월 소득을 입력하세요</p>
          </div>
          <InputField
            label="근로소득"
            value={workIncome}
            onChange={setWorkIncome}
            description="월급, 일용직 등 (112만 원 공제)"
          />
          <InputField
            label="국민연금 수령액"
            value={pensionIncome}
            onChange={setPensionIncome}
            description="국민·공무원·사학연금 등"
          />
          <InputField
            label="기타소득"
            value={otherIncome}
            onChange={setOtherIncome}
            description="사업·이자·배당·임대소득 등"
          />
        </div>

        {/* ─── 3. 재산 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">3. 재산</h3>
            <p className="text-xs text-neutral-500 mt-1">본인과 배우자 합산 재산을 입력하세요</p>
          </div>
          <InputField
            label="일반재산"
            value={generalProperty}
            onChange={setGeneralProperty}
            description="주택·토지 시가표준액"
          />
          <InputField
            label="금융재산"
            value={financialAsset}
            onChange={setFinancialAsset}
            description="예금·적금·주식 등 (2천만 공제)"
          />
          <InputField
            label="부채"
            value={debt}
            onChange={setDebt}
            description="대출금 등 (재산에서 차감)"
          />
        </div>

        {/* ─── 4. 계산 과정 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">4. 소득인정액 계산</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">① 근로소득 평가 (공제 후 70%)</span>
              <span className="font-medium">{formatNumber(workIncomeEval)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">② 연금 + 기타소득</span>
              <span className="font-medium">{formatNumber(pensionIncome + otherIncome)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-[#F5F8FB] -mx-4 px-4">
              <span className="text-neutral-700 font-medium">월 소득평가액 (①+②)</span>
              <span className="font-bold text-[#162F4F]">{formatNumber(monthlyIncomeEval)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">③ 재산의 소득환산액</span>
              <span className="font-medium">{formatNumber(propertyIncomeEval)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-blue-50 -mx-4 px-4">
              <span className="text-neutral-700 font-medium">소득인정액 (소득+재산환산)</span>
              <span className="font-bold text-blue-700">{formatNumber(totalIncomeRecognized)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">선정기준액 ({householdType === "single" ? "단독" : "부부"}가구)</span>
              <span className="font-medium">{formatNumber(selectionCriteria)}원</span>
            </div>
            <div className={`flex justify-between py-2 border-b border-neutral-100 -mx-4 px-4 ${isEligible ? "bg-[#F0FDF4]" : "bg-amber-50"}`}>
              <span className="font-medium text-neutral-700">수급 판정</span>
              <span className={`font-bold ${isEligible ? "text-[#15803D]" : "text-amber-700"}`}>
                {!isEligibleAge
                  ? "나이 미달"
                  : isEligible
                    ? "수급 가능"
                    : `기준 초과 (+${formatNumber(totalIncomeRecognized - selectionCriteria)}원)`}
              </span>
            </div>
          </div>
        </div>

        {/* ─── 5. 결과 ─── */}
        {isEligible && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
            <div className="bg-[#1E3A5F] px-6 py-3">
              <h3 className="font-semibold text-white">기초연금 계산 결과</h3>
            </div>
            <div className="p-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-neutral-500 mb-2">예상 월 수급액</p>
                <p className="text-4xl font-bold text-[#1E3A5F] mb-2">
                  {formatNumber(pensionAmount)}원
                </p>
                <p className="text-sm text-neutral-500">
                  연간 약 {formatManWon(pensionAmount * 12)} 원
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">가구형태</p>
                  <p className="text-lg font-bold text-neutral-800">
                    {householdType === "single" ? "단독" : "부부"}가구
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">지급일</p>
                  <p className="text-lg font-bold text-neutral-800">매월 25일</p>
                </div>
              </div>
              {householdType === "couple" && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl">
                  <p className="text-sm text-neutral-600">
                    부부가구는 각각 20% 감액되어 1인당 {formatNumber(pensionAmount)}원이에요.
                    두 분 합산 월 {formatNumber(pensionAmount * 2)}원을 받을 수 있어요.
                  </p>
                </div>
              )}
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
              기초연금이 뭔가요?
            </h4>
            <p className="text-sm text-[#162F4F] mb-2">
              만 65세 이상 어르신 중 소득인정액이 선정기준 이하인 분께 지급하는 연금이에요.
              <span className="font-medium"> 전체 어르신의 약 70%가 받고 있어요.</span>
            </p>
            <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>신청:</strong> 주민센터, 국민연금공단, 복지로(온라인)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>2026년 기준연금액:</strong> 월 34만 9,360원</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>선정기준:</strong> 단독 247만 원 / 부부 395만 2천 원</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">⚠</span>
                <span><strong>1961년생</strong>부터 신청 가능 (생일 1개월 전부터)</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-[#B8D0E8]">
              <p className="text-xs text-[#1E3A5F]">
                📌 출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">복지로</a> · <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">국민연금공단</a>
              </p>
            </div>
          </div>
        </div>

        {/* ─── 기준표 ─── */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 2026년 기초연금 선정기준</h4>
            <p className="text-xs text-neutral-500 text-center mb-3">보건복지부 고시 (2026.01.01 기준)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">구분</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">단독가구</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">부부가구</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">선정기준액</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 247만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 395만 2천 원</td>
                  </tr>
                  <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-[#162F4F] border border-gray-300">기준연금액</td>
                    <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300" colSpan={2}>월 34만 9,360원</td>
                  </tr>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">부부 감액</td>
                    <td className="py-2 px-2 text-center border border-gray-300" colSpan={2}>각각 20% 감액 (1인당 27만 9,488원)</td>
                  </tr>
                  <tr className="bg-[#F5F8FB]">
                    <td className="py-2 px-2 text-center font-medium text-[#162F4F] border border-gray-300">지급일</td>
                    <td className="py-2 px-2 text-center border border-gray-300" colSpan={2}>매월 25일 (휴일 시 전일)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
              <p className="text-xs text-[#132A42] font-medium">💡 소득인정액 계산 공식</p>
              <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
                <li>• <strong>소득인정액</strong> = 월 소득평가액 + 재산의 소득환산액</li>
                <li>• <strong>근로소득</strong>: 월 112만 원 공제 후 나머지의 70%만 반영</li>
                <li>• <strong>재산환산</strong>: (재산 - 기본공제) × 연 4% ÷ 12개월</li>
                <li>• <strong>금융재산</strong>: 2,000만 원까지 공제</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
