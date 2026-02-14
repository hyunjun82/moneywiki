"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 2026년 기준 중위소득
const MEDIAN_INCOME: Record<number, number> = {
  2: 3932658, 3: 5025353, 4: 6097773, 5: 7108688, 6: 8064805,
};

function getMedianIncome(m: number): number {
  if (m <= 6) return MEDIAN_INCOME[m] || MEDIAN_INCOME[2];
  return MEDIAN_INCOME[6] + (m - 6) * (MEDIAN_INCOME[6] - MEDIAN_INCOME[5]);
}

// 2026년 한부모가족 지원 기준
const SINGLE_PARENT_2026 = {
  selectionRatio: 0.63,    // 기준 중위소득 63% 이하
  childSupport: {           // 아동양육비
    under18: 210000,         // 만 18세 미만 자녀 1인당 월 21만 원
  },
  additionalSupport: {
    under5: 50000,           // 추가 아동양육비 (만 5세 이하) 월 5만 원
    under25Mother: 100000,   // 청소년 한부모 자녀양육비 (만 24세 이하 부모) 월 10만 원 추가
  },
  educationSupport: 93000,  // 학용품비 연 1회
  livelihoodCriteria: 0.52, // 한부모가족 복지급여 (중위소득 52% 이하)
};

export default function SingleParentCalculator() {
  const [familyMembers, setFamilyMembers] = useState(3);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [childCount, setChildCount] = useState(1);
  const [childUnder5, setChildUnder5] = useState(0);
  const [isYoungParent, setIsYoungParent] = useState(false); // 만 24세 이하

  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeRatio, setIncomeRatio] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [childAllowance, setChildAllowance] = useState(0);
  const [additionalAllowance, setAdditionalAllowance] = useState(0);
  const [youngParentBonus, setYoungParentBonus] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const calculate = useCallback(() => {
    const median = getMedianIncome(familyMembers);
    setMedianIncome(median);
    const ratio = median > 0 ? (monthlyIncome / median) * 100 : 0;
    setIncomeRatio(ratio);

    const eligible = ratio <= 63;
    setIsEligible(eligible);

    if (eligible) {
      const childAmt = SINGLE_PARENT_2026.childSupport.under18 * childCount;
      setChildAllowance(childAmt);

      const additionalAmt = SINGLE_PARENT_2026.additionalSupport.under5 * childUnder5;
      setAdditionalAllowance(additionalAmt);

      const youngBonus = isYoungParent ? SINGLE_PARENT_2026.additionalSupport.under25Mother * childCount : 0;
      setYoungParentBonus(youngBonus);

      setTotalMonthly(childAmt + additionalAmt + youngBonus);
    } else {
      setChildAllowance(0);
      setAdditionalAllowance(0);
      setYoungParentBonus(0);
      setTotalMonthly(0);
    }
  }, [familyMembers, monthlyIncome, childCount, childUnder5, isYoungParent]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">한부모가족 지원 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 기준 한부모가족 아동양육비 등 예상 지원 금액을 확인해요</p>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">1. 가구 정보</h3></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">가구원수</span></div>
          <select value={familyMembers} onChange={(e) => setFamilyMembers(parseInt(e.target.value))} className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]">
            {[2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}인 가구</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">가구 월 소득</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(monthlyIncome)} onChange={(e) => setMonthlyIncome(parseInt(e.target.value.replace(/,/g,"")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 bg-[#F5F8FB] border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">선정기준 (63%)</span></div>
          <span className="font-bold text-[#1E3A5F]">{formatNumber(Math.round(medianIncome * 0.63))}원</span>
          <span className="text-xs text-neutral-500 ml-2">(소득 = 중위소득의 {incomeRatio.toFixed(1)}%)</span>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">2. 자녀 정보</h3></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">만 18세 미만 자녀</span></div>
          <select value={childCount} onChange={(e) => setChildCount(parseInt(e.target.value))} className="w-24 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">만 5세 이하 자녀</span></div>
          <select value={childUnder5} onChange={(e) => setChildUnder5(parseInt(e.target.value))} className="w-24 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]">
            {[0,1,2,3].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
          <span className="text-xs text-neutral-500">추가 양육비 대상</span>
        </div>
        <div className="py-3 px-4 border-b border-neutral-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isYoungParent} onChange={(e) => setIsYoungParent(e.target.checked)} className="w-4 h-4 text-[#1E3A5F]" />
            <span className="text-sm text-neutral-700">청소년 한부모 (만 24세 이하)</span>
          </label>
          <p className="text-xs text-neutral-500 mt-1 ml-6">자녀 1인당 월 10만 원 추가 지급</p>
        </div>
      </div>

      {/* 결과 */}
      {isEligible && totalMonthly > 0 && (
        <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
          <div className="bg-[#1E3A5F] px-6 py-3"><h3 className="font-semibold text-white">한부모가족 지원 결과</h3></div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 월 지원액</p>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(totalMonthly)}원</p>
              <p className="text-sm text-neutral-500">연간 약 {formatNumber(totalMonthly * 12)}원</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-white rounded-xl p-3 flex justify-between"><span className="text-sm">아동양육비 ({childCount}명)</span><span className="font-bold">{formatNumber(childAllowance)}원</span></div>
              {additionalAllowance > 0 && <div className="bg-white rounded-xl p-3 flex justify-between"><span className="text-sm">추가양육비 (5세이하 {childUnder5}명)</span><span className="font-bold">{formatNumber(additionalAllowance)}원</span></div>}
              {youngParentBonus > 0 && <div className="bg-white rounded-xl p-3 flex justify-between"><span className="text-sm">청소년한부모 추가</span><span className="font-bold">{formatNumber(youngParentBonus)}원</span></div>}
            </div>
          </div>
        </div>
      )}

      {!isEligible && monthlyIncome > 0 && (
        <div className="p-6"><div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="font-medium text-[#132A42]">현재 소득으로는 한부모가족 지원 대상이 아니에요</p>
          <p className="text-sm text-amber-700 mt-1">소득이 기준 중위소득의 63%({formatNumber(Math.round(medianIncome * 0.63))}원)를 초과해요.</p>
        </div></div>
      )}

      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">한부모가족 지원이 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">한부모가족(이혼·사별·미혼모부 등)에게 아동양육비, 추가양육비, 학용품비 등을 지원하는 제도예요.</p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>아동양육비:</strong> 자녀 1인당 월 21만 원</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>추가양육비:</strong> 5세 이하 월 5만 원 추가</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>소득기준:</strong> 기준 중위소득 63% 이하</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>신청:</strong> 주민센터 또는 복지로 온라인</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]"><p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.mogef.go.kr" target="_blank" rel="noopener noreferrer" className="underline">여성가족부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline">복지로</a></p></div>
        </div>
      </div>
    </div>
  );
}
