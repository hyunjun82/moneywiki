"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// ─── 2026년 장애인연금 기준 (보건복지부) ───
const DISABILITY_PENSION_2026 = {
  // 기초급여 (만 18~64세)
  basicPension: {
    max: 423500,          // 월 최대 42만 3,500원 (2026년)
    singleCriteria: 1420000, // 단독가구 선정기준 (소득인정액)
    coupleCriteria: 2268000, // 부부가구 선정기준
  },
  // 부가급여
  supplement: {
    livelihoodSingle: 91000,   // 기초생활(생계·의료) 수급자
    livelihoodCouple: 145600,  // 부부 모두 기초생활 수급
    nearPoor: 91000,            // 차상위계층
    excepted: 91000,            // 차상위 초과
  },
  // 65세 이상은 기초연금으로 전환
  seniorAge: 65,
  // 재산 기본공제
  propertyDeduction: {
    metro: 135000000,
    city: 85000000,
    rural: 72500000,
  },
  workIncomeDeduction: 1120000, // 근로소득 공제
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
            readOnly ? "bg-neutral-100 text-neutral-600 border-neutral-200" : "bg-white border-neutral-300 focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]"
          }`}
        />
        <span className="text-sm text-neutral-500">{unit}</span>
      </div>
      {description && <div className="sm:w-64 text-xs text-neutral-500">{description}</div>}
    </div>
  );
}

export default function DisabilityPensionCalculator() {
  const [age, setAge] = useState(40);
  const [householdType, setHouseholdType] = useState<"single" | "couple">("single");
  const [region, setRegion] = useState<"metro" | "city" | "rural">("metro");
  const [incomeStatus, setIncomeStatus] = useState<"livelihood" | "nearPoor" | "general">("general");

  const [workIncome, setWorkIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [generalProperty, setGeneralProperty] = useState(0);
  const [financialAsset, setFinancialAsset] = useState(0);
  const [debt, setDebt] = useState(0);

  const [totalRecognized, setTotalRecognized] = useState(0);
  const [criteria, setCriteria] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [basicAmount, setBasicAmount] = useState(0);
  const [supplementAmount, setSupplementAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSenior, setIsSenior] = useState(false);

  const calculate = useCallback(() => {
    const senior = age >= 65;
    setIsSenior(senior);

    const selectionCriteria = householdType === "single"
      ? DISABILITY_PENSION_2026.basicPension.singleCriteria
      : DISABILITY_PENSION_2026.basicPension.coupleCriteria;
    setCriteria(selectionCriteria);

    // 소득인정액 (기초연금과 유사)
    const workDeducted = Math.max(0, workIncome - DISABILITY_PENSION_2026.workIncomeDeduction);
    const workEval = workDeducted * 0.7;
    const monthlyIncome = workEval + otherIncome;

    const deduction = DISABILITY_PENSION_2026.propertyDeduction[region];
    const financialDeducted = Math.max(0, financialAsset - 20000000);
    const netProperty = Math.max(0, (generalProperty - deduction) + financialDeducted - debt);
    const propertyIncome = (netProperty * 0.04) / 12;

    const total = monthlyIncome + propertyIncome;
    setTotalRecognized(total);

    const eligible = age >= 18 && !senior && total <= selectionCriteria;
    setIsEligible(eligible);

    if (eligible) {
      let basic = DISABILITY_PENSION_2026.basicPension.max;
      if (householdType === "couple") {
        basic = Math.round(basic * 0.8); // 부부 감액 20%
      }
      // 소득역전 방지 감액
      if (total + basic > selectionCriteria) {
        basic = Math.max(Math.round(DISABILITY_PENSION_2026.basicPension.max * 0.5), selectionCriteria - Math.round(total));
      }
      setBasicAmount(Math.max(0, basic));

      // 부가급여
      let supplement = 0;
      if (incomeStatus === "livelihood") {
        supplement = householdType === "couple"
          ? DISABILITY_PENSION_2026.supplement.livelihoodCouple
          : DISABILITY_PENSION_2026.supplement.livelihoodSingle;
      } else if (incomeStatus === "nearPoor") {
        supplement = DISABILITY_PENSION_2026.supplement.nearPoor;
      } else {
        supplement = DISABILITY_PENSION_2026.supplement.excepted;
      }
      setSupplementAmount(supplement);
      setTotalAmount(Math.max(0, basic) + supplement);
    } else {
      setBasicAmount(0);
      setSupplementAmount(0);
      setTotalAmount(0);
    }
  }, [age, householdType, region, incomeStatus, workIncome, otherIncome, generalProperty, financialAsset, debt]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">장애인연금 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 보건복지부 기준으로 장애인연금 예상 수급액을 확인해요</p>
      </div>

      {/* 1. 기본 정보 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">1. 기본 정보</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">나이</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} min="18" max="100" className="w-28 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">세</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">만 18세 이상 중증 장애인 대상</div>
        </div>
        {isSenior && (
          <div className="mx-4 my-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="font-medium text-[#132A42]">65세 이상은 기초연금으로 전환돼요</p>
            <p className="text-sm text-blue-700 mt-1">만 65세부터는 장애인연금 기초급여 대신 기초연금을 받고, 부가급여만 별도로 지급돼요.</p>
            <a href="/w/기초연금-계산기" className="inline-block mt-2 text-sm text-[#1E3A5F] font-medium underline">기초연금 계산기 바로가기</a>
          </div>
        )}
        {age < 18 && age > 0 && (
          <div className="mx-4 my-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="font-medium text-[#132A42]">18세 미만은 장애아동수당 대상이에요</p>
            <a href="/w/장애아동수당-계산기" className="inline-block mt-2 text-sm text-[#1E3A5F] font-medium underline">장애아동수당 계산기 바로가기</a>
          </div>
        )}
        <div className="py-3 px-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-48">가구형태</span>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="dp-household" checked={householdType === "single"} onChange={() => setHouseholdType("single")} className="w-4 h-4 text-[#1E3A5F]" />
                <span className="text-sm">단독가구</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="dp-household" checked={householdType === "couple"} onChange={() => setHouseholdType("couple")} className="w-4 h-4 text-[#1E3A5F]" />
                <span className="text-sm">부부가구</span>
              </label>
            </div>
          </div>
        </div>
        <div className="py-3 px-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-48">거주지역</span>
            <select value={region} onChange={(e) => setRegion(e.target.value as "metro" | "city" | "rural")} className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700">
              <option value="metro">대도시</option>
              <option value="city">중소도시</option>
              <option value="rural">농어촌</option>
            </select>
          </div>
        </div>
        <div className="py-3 px-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-48">소득 구분</span>
            <select value={incomeStatus} onChange={(e) => setIncomeStatus(e.target.value as "livelihood" | "nearPoor" | "general")} className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700">
              <option value="livelihood">기초생활수급자 (생계·의료)</option>
              <option value="nearPoor">차상위계층</option>
              <option value="general">차상위 초과</option>
            </select>
          </div>
          <p className="text-xs text-neutral-500 mt-1 sm:ml-48">부가급여 산정에 사용돼요</p>
        </div>
      </div>

      {/* 2. 소득·재산 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">2. 소득·재산</h3></div>
        <InputField label="근로소득" value={workIncome} onChange={setWorkIncome} description="월 112만 원 공제 후 70%" />
        <InputField label="기타소득" value={otherIncome} onChange={setOtherIncome} description="사업·이자·배당·연금 등" />
        <InputField label="일반재산" value={generalProperty} onChange={setGeneralProperty} description="주택·토지 시가표준액" />
        <InputField label="금융재산" value={financialAsset} onChange={setFinancialAsset} description="예금·적금 등 (2천만 공제)" />
        <InputField label="부채" value={debt} onChange={setDebt} description="대출금 등" />
      </div>

      {/* 3. 판정 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">3. 수급 판정</h3></div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-600">소득인정액</span>
            <span className="font-bold text-blue-700">{formatNumber(totalRecognized)}원</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-600">선정기준 ({householdType === "single" ? "단독" : "부부"})</span>
            <span className="font-medium">{formatNumber(criteria)}원</span>
          </div>
          <div className={`flex justify-between py-2 -mx-4 px-4 ${isEligible ? "bg-[#F0FDF4]" : "bg-amber-50"}`}>
            <span className="font-medium">판정</span>
            <span className={`font-bold ${isEligible ? "text-[#15803D]" : "text-amber-700"}`}>
              {isSenior ? "기초연금 대상" : age < 18 ? "장애아동수당 대상" : isEligible ? "수급 가능" : "기준 초과"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. 결과 */}
      {isEligible && (
        <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
          <div className="bg-[#1E3A5F] px-6 py-3"><h3 className="font-semibold text-white">장애인연금 계산 결과</h3></div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 월 수급액</p>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(totalAmount)}원</p>
              <p className="text-sm text-neutral-500">연간 약 {formatNumber(totalAmount * 12)}원</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-neutral-500 mb-1">기초급여</p>
                <p className="text-lg font-bold text-[#1E3A5F]">{formatNumber(basicAmount)}원</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-neutral-500 mb-1">부가급여</p>
                <p className="text-lg font-bold text-[#1E3A5F]">{formatNumber(supplementAmount)}원</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">장애인연금이 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">
            만 18세 이상 중증 장애인(장애의 정도가 심한 장애인) 중 소득인정액이 선정기준 이하인 분께 매월 지급하는 연금이에요.
            <span className="font-medium"> 기초급여(최대 42만 3,500원)와 부가급여(최대 9만 1천 원)로 구성돼요.</span>
          </p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>대상:</strong> 만 18~64세 중증 장애인</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>기초급여:</strong> 월 최대 423,500원</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>선정기준:</strong> 단독 142만/부부 226만 8천 원</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">&#9888;</span><span><strong>65세 이상:</strong> 기초연금으로 전환 (부가급여만 별도)</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]">
            <p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline">복지로</a></p>
          </div>
        </div>
      </div>

      {/* 기준표 */}
      <div className="px-6 pb-6">
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">2026년 장애인연금 지급 기준</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                  <th className="py-2 px-2 text-center font-bold border border-gray-300">구분</th>
                  <th className="py-2 px-2 text-center font-bold border border-gray-300">기초급여</th>
                  <th className="py-2 px-2 text-center font-bold border border-gray-300">부가급여</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">기초수급자</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">최대 423,500원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">91,000원</td>
                </tr>
                <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">차상위</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">최대 423,500원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">91,000원</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">차상위 초과</td>
                  <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">최대 423,500원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">91,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
