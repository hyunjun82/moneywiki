"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

const MEDIAN_INCOME: Record<number, number> = {
  1: 2392013, 2: 3932658, 3: 5025353, 4: 6097773, 5: 7108688, 6: 8064805,
};

function getMedianIncome(m: number): number {
  if (m <= 6) return MEDIAN_INCOME[m] || MEDIAN_INCOME[1];
  return MEDIAN_INCOME[6] + (m - 6) * (MEDIAN_INCOME[6] - MEDIAN_INCOME[5]);
}

// 2026년 청년내일저축계좌 기준 (보건복지부)
const YOUTH_SAVINGS_2026 = {
  // 자격 조건
  ageMin: 19,
  ageMax: 34,
  incomeRatioGeneral: 1.00,     // 일반형: 중위소득 100% 이하
  incomeRatioLow: 0.50,          // 저소득형(기초수급·차상위): 중위소득 50% 이하
  workIncomeMin: 100000,          // 근로·사업소득 월 10만 원 이상 필수
  // 저축 구조
  selfSavingsMonthly: 100000,     // 본인 저축 월 10만 원
  durationMonths: 36,             // 3년(36개월)
  // 정부 매칭 지원금 (월)
  matchLow: 300000,               // 저소득형: 월 30만 원
  matchGeneral: 100000,           // 일반형: 월 10만 원
  // 근로소득장려금 (일반형 추가)
  workIncentiveGeneral: 0,
  // 자산 한도
  assetLimit: 0,                  // 별도 자산 기준 없음 (소득 기준만)
};

type IncomeType = "low" | "general";

export default function YouthSavingsCalculator() {
  const [age, setAge] = useState(27);
  const [familySize, setFamilySize] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [workIncome, setWorkIncome] = useState(0);
  const [incomeType, setIncomeType] = useState<IncomeType>("general");

  // 결과
  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeRatio, setIncomeRatio] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [selfTotal, setSelfTotal] = useState(0);
  const [govMonthly, setGovMonthly] = useState(0);
  const [govTotal, setGovTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [failReasons, setFailReasons] = useState<string[]>([]);

  const calculate = useCallback(() => {
    const median = getMedianIncome(familySize);
    setMedianIncome(median);

    const ratio = median > 0 ? (monthlyIncome / median) * 100 : 0;
    setIncomeRatio(ratio);

    const reasons: string[] = [];

    // 나이 조건
    const ageOk = age >= YOUTH_SAVINGS_2026.ageMin && age <= YOUTH_SAVINGS_2026.ageMax;
    if (!ageOk) reasons.push("만 19~34세 조건을 충족하지 않아요.");

    // 근로소득 조건
    const workOk = workIncome >= YOUTH_SAVINGS_2026.workIncomeMin;
    if (!workOk) reasons.push("근로·사업소득이 월 10만 원 이상이어야 해요.");

    // 소득 조건
    const maxRatio = incomeType === "low"
      ? YOUTH_SAVINGS_2026.incomeRatioLow * 100
      : YOUTH_SAVINGS_2026.incomeRatioGeneral * 100;
    const incomeOk = ratio <= maxRatio;
    if (!incomeOk) reasons.push(`${incomeType === "low" ? "저소득형(50%)" : "일반형(100%)"} 소득 기준을 초과해요.`);

    setFailReasons(reasons);

    const eligible = ageOk && workOk && incomeOk;
    setIsEligible(eligible);

    if (eligible) {
      const self = YOUTH_SAVINGS_2026.selfSavingsMonthly * YOUTH_SAVINGS_2026.durationMonths;
      setSelfTotal(self);

      const gov = incomeType === "low" ? YOUTH_SAVINGS_2026.matchLow : YOUTH_SAVINGS_2026.matchGeneral;
      setGovMonthly(gov);
      const govT = gov * YOUTH_SAVINGS_2026.durationMonths;
      setGovTotal(govT);
      setGrandTotal(self + govT);
    } else {
      setSelfTotal(0);
      setGovMonthly(0);
      setGovTotal(0);
      setGrandTotal(0);
    }
  }, [age, familySize, monthlyIncome, workIncome, incomeType]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">청년내일저축계좌 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 기준 자격 여부와 3년 후 만기 수령액을 확인해요</p>
      </div>

      {/* 1. 기본 정보 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">1. 기본 정보</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">나이</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} min="15" max="50" className="w-28 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">세 (만 19~34세)</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">가구원수</span></div>
          <div className="flex-1 flex items-center gap-2">
            <select value={familySize} onChange={(e) => setFamilySize(parseInt(e.target.value))} className="w-28 px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]">
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}인</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">유형 선택</span></div>
          <div className="flex-1 flex flex-wrap gap-3">
            {([
              { value: "low" as IncomeType, label: "저소득형 (기초수급·차상위)" },
              { value: "general" as IncomeType, label: "일반형" },
            ]).map(opt => (
              <label key={opt.value} className={`flex items-center gap-2 py-2 px-4 rounded-lg border cursor-pointer transition-colors ${incomeType === opt.value ? "bg-[#EDF2F8] border-[#2B5280] text-[#1E3A5F]" : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}>
                <input type="radio" name="incomeType" value={opt.value} checked={incomeType === opt.value} onChange={(e) => setIncomeType(e.target.value as IncomeType)} className="hidden" />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 소득 정보 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">2. 소득 정보</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">가구 월 소득</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(monthlyIncome)} onChange={(e) => setMonthlyIncome(parseInt(e.target.value.replace(/,/g, "")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
          <div className="sm:w-72 text-xs text-neutral-500">
            {familySize}인 가구 중위소득 {incomeType === "low" ? "50%" : "100%"}: {formatNumber(Math.round(getMedianIncome(familySize) * (incomeType === "low" ? 0.5 : 1)))}원
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">근로·사업소득</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(workIncome)} onChange={(e) => setWorkIncome(parseInt(e.target.value.replace(/,/g, "")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
          <div className="sm:w-72 text-xs text-neutral-500">월 10만 원 이상 필수</div>
        </div>
      </div>

      {/* 3. 자격 판정 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">3. 자격 판정</h3>
        </div>
        <div className="p-4 space-y-2 text-sm">
          {[
            { label: "나이 (만 19~34세)", ok: age >= 19 && age <= 34 },
            { label: `근로·사업소득 (월 10만 원 이상)`, ok: workIncome >= 100000 },
            {
              label: `소득 기준 (${incomeType === "low" ? "중위소득 50%" : "중위소득 100%"} 이하: ${formatNumber(Math.round(getMedianIncome(familySize) * (incomeType === "low" ? 0.5 : 1)))}원)`,
              ok: incomeRatio <= (incomeType === "low" ? 50 : 100),
            },
          ].map(item => (
            <div key={item.label} className={`flex justify-between py-2 px-4 -mx-4 rounded ${item.ok ? "bg-[#F0FDF4]" : "bg-red-50"}`}>
              <span>{item.label}</span>
              <span className={`font-bold ${item.ok ? "text-[#15803D]" : "text-red-500"}`}>{item.ok ? "충족" : "미충족"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 결과 */}
      {isEligible && (
        <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
          <div className="bg-[#1E3A5F] px-6 py-3">
            <h3 className="font-semibold text-white">3년 후 만기 수령액</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 만기 수령액</p>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(grandTotal)}원</p>
              <p className="text-sm text-neutral-500">3년 만기 시 (이자 별도)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-neutral-500 mb-1">본인 저축</p>
                <p className="text-lg font-bold text-neutral-800">월 {formatNumber(YOUTH_SAVINGS_2026.selfSavingsMonthly)}원</p>
                <p className="text-xs text-neutral-500 mt-1">36개월 합계 {formatNumber(selfTotal)}원</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-neutral-500 mb-1">정부 매칭</p>
                <p className="text-lg font-bold text-[#15803D]">월 {formatNumber(govMonthly)}원</p>
                <p className="text-xs text-neutral-500 mt-1">36개월 합계 {formatNumber(govTotal)}원</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-neutral-500 mb-1">유형</p>
                <p className="text-lg font-bold text-[#1E3A5F]">{incomeType === "low" ? "저소득형" : "일반형"}</p>
                <p className="text-xs text-neutral-500 mt-1">{incomeType === "low" ? "정부 월 30만 원" : "정부 월 10만 원"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isEligible && (monthlyIncome > 0 || workIncome > 0) && (
        <div className="p-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="font-medium text-[#132A42]">현재 조건으로는 청년내일저축계좌 대상이 아니에요</p>
            {failReasons.length > 0 && (
              <ul className="text-sm text-amber-700 mt-2 space-y-1">
                {failReasons.map((r, i) => <li key={i}>- {r}</li>)}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">청년내일저축계좌가 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">일하는 저소득 청년이 매달 10만 원을 저축하면, 정부가 매달 10~30만 원을 추가로 적립해주는 자산형성 지원 제도예요. 3년 만기 시 최대 1,440만 원을 모을 수 있어요.</p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>저소득형:</strong> 중위소득 50% 이하, 정부 월 30만 원 매칭 (만기 1,440만 원)</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>일반형:</strong> 중위소득 100% 이하, 정부 월 10만 원 매칭 (만기 720만 원)</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>필수 조건:</strong> 만 19~34세, 근로·사업소득 월 10만 원 이상</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>신청:</strong> 주민센터 또는 복지로(bokjiro.go.kr)</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]">
            <p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline">복지로</a></p>
          </div>
        </div>
      </div>

      {/* 기준표 */}
      <div className="px-6 pb-6">
        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50">
          <h4 className="font-medium text-neutral-800 mb-3">2026년 가구원수별 기준 중위소득</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E3A5F] text-white">
                  <th className="py-2 px-3 text-left rounded-tl-lg">가구원수</th>
                  <th className="py-2 px-3 text-right">중위소득 50%</th>
                  <th className="py-2 px-3 text-right rounded-tr-lg">중위소득 100%</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5,6].map((n, i) => (
                  <tr key={n} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="py-2 px-3 font-medium">{n}인</td>
                    <td className="py-2 px-3 text-right">{formatNumber(Math.round(MEDIAN_INCOME[n] * 0.5))}원</td>
                    <td className="py-2 px-3 text-right">{formatNumber(MEDIAN_INCOME[n])}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
