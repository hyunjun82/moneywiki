"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

const MEDIAN_INCOME: Record<number, number> = {
  1: 2392013, 2: 3932658, 3: 5025353, 4: 6097773, 5: 7108688, 6: 8064805,
};
function getMedianIncome(m: number): number {
  if (m <= 6) return MEDIAN_INCOME[m] || MEDIAN_INCOME[3];
  return MEDIAN_INCOME[6] + (m - 6) * (MEDIAN_INCOME[6] - MEDIAN_INCOME[5]);
}

// 2026년 아이돌봄서비스 기준
const CHILDCARE_2026 = {
  incomeRatio: 2.0, // 중위소득 200% 이하 (정부지원 대상)
  hourlyRate: 11600, // 시간당 단가 (2026년 기준)
  selfPayRatio: {
    typeA: { ratio: 0, label: "A유형 (기초~75%)" },    // 무료~25%
    typeB: { ratio: 0.10, label: "B유형 (75~120%)" },
    typeC: { ratio: 0.25, label: "C유형 (120~150%)" },
    typeD: { ratio: 0.50, label: "D유형 (150~200%)" },
    typeE: { ratio: 1.0, label: "E유형 (200% 초과)" },
  },
  monthlyHourLimit: 960, // 연간 960시간 한도 (월 80시간)
};

export default function ChildcareCalculator() {
  const [familyMembers, setFamilyMembers] = useState(4);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyHours, setMonthlyHours] = useState(40);

  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeRatio, setIncomeRatio] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [selfPayRatio, setSelfPayRatio] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [monthlySelfPay, setMonthlySelfPay] = useState(0);
  const [monthlyGovSupport, setMonthlyGovSupport] = useState(0);

  const calculate = useCallback(() => {
    const median = getMedianIncome(familyMembers);
    setMedianIncome(median);
    const ratio = median > 0 ? (monthlyIncome / median) * 100 : 0;
    setIncomeRatio(ratio);

    let payRatio = 1.0;
    let type = "E유형 (전액 본인부담)";
    if (ratio <= 75) { payRatio = 0; type = "A유형 (정부 전액 지원)"; }
    else if (ratio <= 120) { payRatio = 0.10; type = "B유형 (본인부담 10%)"; }
    else if (ratio <= 150) { payRatio = 0.25; type = "C유형 (본인부담 25%)"; }
    else if (ratio <= 200) { payRatio = 0.50; type = "D유형 (본인부담 50%)"; }

    setIncomeType(type);
    setSelfPayRatio(payRatio);

    const total = CHILDCARE_2026.hourlyRate * monthlyHours;
    setMonthlyCost(total);
    setMonthlySelfPay(Math.round(total * payRatio));
    setMonthlyGovSupport(Math.round(total * (1 - payRatio)));
  }, [familyMembers, monthlyIncome, monthlyHours]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">아이돌봄서비스 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 기준 아이돌봄서비스 이용 요금과 정부 지원금을 확인해요</p>
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
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">소득 유형</span></div>
          <span className="font-bold text-[#1E3A5F]">{incomeType}</span>
          <span className="text-xs text-neutral-500 ml-2">(중위소득의 {incomeRatio.toFixed(1)}%)</span>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">2. 이용 정보</h3></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">월 예상 이용시간</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="number" value={monthlyHours} onChange={(e) => setMonthlyHours(parseInt(e.target.value) || 0)} min="1" max="80" className="w-28 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">시간 (최대 80시간/월)</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">시간당 단가</span></div>
          <span className="font-medium text-neutral-700">{formatNumber(CHILDCARE_2026.hourlyRate)}원</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
        <div className="bg-[#1E3A5F] px-6 py-3"><h3 className="font-semibold text-white">이용 요금 계산 결과</h3></div>
        <div className="p-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-neutral-500 mb-2">월 본인부담금</p>
            <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(monthlySelfPay)}원</p>
            <p className="text-sm text-neutral-500">정부 지원: {formatNumber(monthlyGovSupport)}원 (본인부담 {Math.round(selfPayRatio * 100)}%)</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">총 이용료</p>
              <p className="text-lg font-bold text-neutral-800">{formatNumber(monthlyCost)}원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">정부 지원</p>
              <p className="text-lg font-bold text-[#15803D]">{formatNumber(monthlyGovSupport)}원</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-neutral-500 mb-1">본인부담</p>
              <p className="text-lg font-bold text-amber-700">{formatNumber(monthlySelfPay)}원</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">아이돌봄서비스가 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">맞벌이 등으로 돌봄이 필요한 가정에 돌보미가 방문하여 만 12세 이하 아이를 돌봐주는 서비스예요.</p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>대상:</strong> 만 3개월~12세 아동 가정</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>시간:</strong> 연 960시간 (월 80시간) 한도</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>신청:</strong> 아이돌봄서비스 (idolbom.go.kr)</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]"><p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.idolbom.go.kr" target="_blank" rel="noopener noreferrer" className="underline">아이돌봄서비스</a> · <a href="https://www.mogef.go.kr" target="_blank" rel="noopener noreferrer" className="underline">여성가족부</a></p></div>
        </div>
      </div>
    </div>
  );
}
