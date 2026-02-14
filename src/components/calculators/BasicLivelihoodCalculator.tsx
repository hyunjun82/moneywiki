"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

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
};

function getMedianIncome(members: number): number {
  if (members <= 6) return MEDIAN_INCOME_2026[members];
  const perPerson = MEDIAN_INCOME_2026[6] - MEDIAN_INCOME_2026[5];
  return MEDIAN_INCOME_2026[6] + (members - 6) * perPerson;
}

// ─── 급여별 선정기준 비율 ───
const BENEFIT_RATIOS = {
  livelihood: 0.32,  // 생계급여 32%
  medical: 0.40,     // 의료급여 40%
  housing: 0.48,     // 주거급여 48%
  education: 0.50,   // 교육급여 50%
};

// ─── 재산 기본공제 (2026년) ───
const PROPERTY_DEDUCTION = {
  metro: 69000000,    // 대도시 6,900만 원
  city: 42000000,     // 중소도시 4,200만 원
  rural: 35000000,    // 농어촌 3,500만 원
};

// ─── 재산 소득환산율 (월) ───
const PROPERTY_CONVERSION_RATE = {
  general: 0.0417,    // 일반재산 월 4.17%
  financial: 0.0625,  // 금융재산 월 6.25%
  car: 1.0,           // 자동차 월 100% (일반 기준)
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

export default function BasicLivelihoodCalculator() {
  // ─── 입력 상태 ───
  const [familyMembers, setFamilyMembers] = useState(4);
  const [region, setRegion] = useState<"metro" | "city" | "rural">("metro");

  // 소득
  const [workIncome, setWorkIncome] = useState(0);
  const [businessIncome, setBusinessIncome] = useState(0);
  const [propertyIncome, setPropertyIncome] = useState(0);
  const [transferIncome, setTransferIncome] = useState(0); // 사적이전소득

  // 재산
  const [generalProperty, setGeneralProperty] = useState(0);
  const [financialAsset, setFinancialAsset] = useState(0);
  const [carValue, setCarValue] = useState(0);
  const [debt, setDebt] = useState(0);

  // ─── 계산 결과 ───
  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeEval, setIncomeEval] = useState(0);
  const [propertyConversion, setPropertyConversion] = useState(0);
  const [totalRecognized, setTotalRecognized] = useState(0);

  const [livelihoodCriteria, setLivelihoodCriteria] = useState(0);
  const [medicalCriteria, setMedicalCriteria] = useState(0);
  const [housingCriteria, setHousingCriteria] = useState(0);
  const [educationCriteria, setEducationCriteria] = useState(0);

  const [isLivelihood, setIsLivelihood] = useState(false);
  const [isMedical, setIsMedical] = useState(false);
  const [isHousing, setIsHousing] = useState(false);
  const [isEducation, setIsEducation] = useState(false);

  const [livelihoodAmount, setLivelihoodAmount] = useState(0);

  // ─── 계산 로직 ───
  const calculate = useCallback(() => {
    const median = getMedianIncome(familyMembers);
    setMedianIncome(median);

    // 1) 급여별 선정기준
    const livCriteria = Math.round(median * BENEFIT_RATIOS.livelihood);
    const medCriteria = Math.round(median * BENEFIT_RATIOS.medical);
    const houCriteria = Math.round(median * BENEFIT_RATIOS.housing);
    const eduCriteria = Math.round(median * BENEFIT_RATIOS.education);
    setLivelihoodCriteria(livCriteria);
    setMedicalCriteria(medCriteria);
    setHousingCriteria(houCriteria);
    setEducationCriteria(eduCriteria);

    // 2) 소득평가액 = 실제소득 - 가구특성별 지출비용 - 근로소득공제
    // 간소화: 근로소득 30% 공제 적용
    const workDeducted = workIncome * 0.7; // 30% 공제
    const totalIncome = workDeducted + businessIncome + propertyIncome + transferIncome;
    setIncomeEval(totalIncome);

    // 3) 재산의 소득환산액
    const deduction = PROPERTY_DEDUCTION[region];
    const netGeneral = Math.max(0, generalProperty - deduction);
    const generalConversion = netGeneral * PROPERTY_CONVERSION_RATE.general;
    const financialConversion = Math.max(0, financialAsset) * PROPERTY_CONVERSION_RATE.financial;
    const carConversion = carValue * PROPERTY_CONVERSION_RATE.car;
    const totalProperty = Math.max(0, generalConversion + financialConversion + carConversion - (debt * PROPERTY_CONVERSION_RATE.general));
    setPropertyConversion(totalProperty);

    // 4) 소득인정액
    const total = totalIncome + totalProperty;
    setTotalRecognized(total);

    // 5) 급여별 수급 판정
    setIsLivelihood(total <= livCriteria);
    setIsMedical(total <= medCriteria);
    setIsHousing(total <= houCriteria);
    setIsEducation(total <= eduCriteria);

    // 6) 생계급여액 = 선정기준 - 소득인정액
    if (total <= livCriteria) {
      setLivelihoodAmount(Math.max(0, livCriteria - total));
    } else {
      setLivelihoodAmount(0);
    }
  }, [familyMembers, region, workIncome, businessIncome, propertyIncome, transferIncome, generalProperty, financialAsset, carValue, debt]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const anyEligible = isLivelihood || isMedical || isHousing || isEducation;

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-[#1E3A5F] text-white px-6 py-4">
          <h2 className="text-xl font-bold">기초생활보장 모의계산기</h2>
          <p className="text-[#EDF2F8] text-sm mt-1">2026년 보건복지부 기준으로 생계·의료·주거·교육급여 수급 여부를 확인해요</p>
        </div>

        {/* ─── 1. 가구 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">1. 가구 정보</h3>
            <p className="text-xs text-neutral-500 mt-1">가구원수와 거주지역을 선택하세요</p>
          </div>

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
          </div>

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
              재산 기본공제: {region === "metro" ? "6,900만" : region === "city" ? "4,200만" : "3,500만"} 원
            </p>
          </div>
        </div>

        {/* ─── 2. 소득 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">2. 월 소득 (가구 합산)</h3>
            <p className="text-xs text-neutral-500 mt-1">가구원 전체의 월 소득을 입력하세요</p>
          </div>
          <InputField label="근로소득" value={workIncome} onChange={setWorkIncome} description="월급, 일용직 등 (30% 공제)" />
          <InputField label="사업소득" value={businessIncome} onChange={setBusinessIncome} description="자영업, 프리랜서 등" />
          <InputField label="재산소득" value={propertyIncome} onChange={setPropertyIncome} description="임대소득, 이자, 배당 등" />
          <InputField label="이전소득" value={transferIncome} onChange={setTransferIncome} description="사적이전, 부양비 등" />
        </div>

        {/* ─── 3. 재산 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">3. 재산 (가구 합산)</h3>
            <p className="text-xs text-neutral-500 mt-1">가구원 전체의 재산을 입력하세요</p>
          </div>
          <InputField label="일반재산" value={generalProperty} onChange={setGeneralProperty} description="주택·토지 시가표준액" />
          <InputField label="금융재산" value={financialAsset} onChange={setFinancialAsset} description="예금·적금·주식 등" />
          <InputField label="자동차" value={carValue} onChange={setCarValue} description="차량 시가표준액" />
          <InputField label="부채" value={debt} onChange={setDebt} description="대출금 등 (재산에서 차감)" />
        </div>

        {/* ─── 4. 소득인정액 계산 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">4. 소득인정액 계산</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">소득평가액 (근로30%공제 후)</span>
              <span className="font-medium">{formatNumber(incomeEval)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">재산의 소득환산액</span>
              <span className="font-medium">{formatNumber(propertyConversion)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-blue-50 -mx-4 px-4">
              <span className="font-medium text-neutral-700">소득인정액</span>
              <span className="font-bold text-blue-700">{formatNumber(totalRecognized)}원</span>
            </div>
          </div>
        </div>

        {/* ─── 5. 급여별 판정 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">5. 급여별 수급 판정</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            {[
              { label: "생계급여 (32%)", criteria: livelihoodCriteria, eligible: isLivelihood },
              { label: "의료급여 (40%)", criteria: medicalCriteria, eligible: isMedical },
              { label: "주거급여 (48%)", criteria: housingCriteria, eligible: isHousing },
              { label: "교육급여 (50%)", criteria: educationCriteria, eligible: isEducation },
            ].map((item) => (
              <div key={item.label} className={`flex justify-between py-2 border-b border-neutral-100 -mx-4 px-4 ${item.eligible ? "bg-[#F0FDF4]" : ""}`}>
                <div>
                  <span className="text-neutral-700 font-medium">{item.label}</span>
                  <span className="text-xs text-neutral-500 ml-2">기준: {formatNumber(item.criteria)}원</span>
                </div>
                <span className={`font-bold ${item.eligible ? "text-[#15803D]" : "text-red-500"}`}>
                  {item.eligible ? "수급 가능" : "기준 초과"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 6. 결과 ─── */}
        {anyEligible && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
            <div className="bg-[#1E3A5F] px-6 py-3">
              <h3 className="font-semibold text-white">기초생활보장 계산 결과</h3>
            </div>
            <div className="p-6">
              {isLivelihood && (
                <div className="bg-white rounded-xl p-6 text-center shadow-sm mb-4">
                  <p className="text-neutral-500 mb-2">예상 월 생계급여액</p>
                  <p className="text-4xl font-bold text-[#1E3A5F] mb-2">
                    {formatNumber(livelihoodAmount)}원
                  </p>
                  <p className="text-sm text-neutral-500">
                    연간 약 {formatNumber(livelihoodAmount * 12)}원
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">생계급여 = 선정기준({formatNumber(livelihoodCriteria)}원) - 소득인정액({formatNumber(totalRecognized)}원)</p>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "생계급여", eligible: isLivelihood },
                  { label: "의료급여", eligible: isMedical },
                  { label: "주거급여", eligible: isHousing },
                  { label: "교육급여", eligible: isEducation },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl p-3 text-center ${item.eligible ? "bg-white shadow-sm" : "bg-neutral-100"}`}>
                    <p className="text-xs text-neutral-500">{item.label}</p>
                    <p className={`text-sm font-bold mt-1 ${item.eligible ? "text-[#15803D]" : "text-neutral-400"}`}>
                      {item.eligible ? "수급 가능" : "대상 아님"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!anyEligible && (workIncome + businessIncome + propertyIncome + transferIncome > 0 || generalProperty + financialAsset > 0) && (
          <div className="p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="font-medium text-[#132A42]">현재 소득인정액으로는 기초생활보장 수급 대상이 아니에요</p>
              <p className="text-sm text-amber-700 mt-1">
                소득인정액({formatNumber(totalRecognized)}원)이 교육급여 기준({formatNumber(educationCriteria)}원)을 초과해요.
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
              국민기초생활보장이 뭔가요?
            </h4>
            <p className="text-sm text-[#162F4F] mb-2">
              소득인정액이 기준 중위소득의 일정 비율 이하인 가구에 생계·의료·주거·교육 급여를 지원하는 제도예요.
              <span className="font-medium"> 급여별로 선정기준이 달라서 생계급여는 안 돼도 주거급여는 받을 수 있어요.</span>
            </p>
            <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>신청:</strong> 주민센터 방문 또는 복지로 온라인 신청</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>생계급여:</strong> 중위소득 32% 이하 (차액 지급)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>의료급여:</strong> 중위소득 40% 이하 (본인부담 경감)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>주거급여:</strong> 중위소득 48% 이하 (임차료 지원)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">&#9888;</span>
                <span><strong>부양의무자 기준:</strong> 생계·의료급여만 적용 (주거·교육 폐지)</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-[#B8D0E8]">
              <p className="text-xs text-[#1E3A5F]">
                출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#132A42]">복지로</a>
              </p>
            </div>
          </div>
        </div>

        {/* ─── 기준표 ─── */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-3 text-center">2026년 급여별 선정기준 (월)</h4>
            <p className="text-xs text-neutral-500 text-center mb-3">보건복지부 고시 (2026.01.01 기준)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">가구</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">생계(32%)</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">의료(40%)</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">주거(48%)</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">교육(50%)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((n) => {
                    const m = MEDIAN_INCOME_2026[n];
                    return (
                      <tr key={n} className={n % 2 === 0 ? "bg-[#F5F8FB]" : "bg-white"}>
                        <td className="py-2 px-2 text-center font-medium border border-gray-300">{n}인</td>
                        <td className="py-2 px-2 text-center border border-gray-300">{formatNumber(Math.round(m * 0.32))}</td>
                        <td className="py-2 px-2 text-center border border-gray-300">{formatNumber(Math.round(m * 0.40))}</td>
                        <td className="py-2 px-2 text-center border border-gray-300">{formatNumber(Math.round(m * 0.48))}</td>
                        <td className="py-2 px-2 text-center border border-gray-300">{formatNumber(Math.round(m * 0.50))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
              <p className="text-xs text-[#132A42] font-medium">소득인정액 계산 공식</p>
              <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
                <li>&#8226; <strong>소득인정액</strong> = 소득평가액 + 재산의 소득환산액</li>
                <li>&#8226; <strong>근로소득</strong>: 30% 공제 후 반영</li>
                <li>&#8226; <strong>일반재산</strong>: 기본공제 후 월 4.17% 환산</li>
                <li>&#8226; <strong>금융재산</strong>: 월 6.25% 환산</li>
                <li>&#8226; <strong>자동차</strong>: 월 100% 환산 (생활용 자동차 제외 가능)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
