"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 2026년 기준 중위소득
const MEDIAN_INCOME: Record<number, number> = {
  1: 2392013, 2: 3932658, 3: 5025353, 4: 6097773, 5: 7108688, 6: 8064805,
};
function getMedianIncome(m: number): number {
  if (m <= 6) return MEDIAN_INCOME[m] || MEDIAN_INCOME[3];
  return MEDIAN_INCOME[6] + (m - 6) * (MEDIAN_INCOME[6] - MEDIAN_INCOME[5]);
}

// 2026년 산모·신생아 건강관리 지원 기준
const MATERNAL_CARE_2026 = {
  incomeRatio: 1.50, // 기준 중위소득 150% 이하
  // 서비스 기간 (일수)
  serviceDays: {
    single: { first: 15, second: 15, third: 15, twin: 20 },
    // 실제 유형별로 다름, 간소화
  },
  // 본인부담금 (소득구간별, 1일 기준 근사치)
  selfPayment: {
    type1: { daily: 0 },       // A-가-1 유형 (기초수급)
    type2: { daily: 5000 },    // A-가-2 유형 (차상위)
    type3: { daily: 10000 },   // A-나 유형 (중위 80% 이하)
    type4: { daily: 15000 },   // B 유형 (중위 120% 이하)
    type5: { daily: 20000 },   // C 유형 (중위 150% 이하)
  },
  // 정부 지원 바우처 (1일 기준)
  govSupport: {
    standard: 200000,          // 표준(단태아 첫째) 일 약 20만 원
    twin: 250000,              // 쌍태아
  },
};

export default function MaternalCareCalculator() {
  const [familyMembers, setFamilyMembers] = useState(3);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [birthOrder, setBirthOrder] = useState<"first" | "second" | "third" | "twin">("first");
  const [serviceType, setServiceType] = useState<"standard" | "intensive">("standard");

  const [medianIncome, setMedianIncome] = useState(0);
  const [incomeRatio, setIncomeRatio] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [serviceDays, setServiceDays] = useState(0);
  const [dailySelfPay, setDailySelfPay] = useState(0);
  const [totalSelfPay, setTotalSelfPay] = useState(0);
  const [govSupportTotal, setGovSupportTotal] = useState(0);

  const calculate = useCallback(() => {
    const median = getMedianIncome(familyMembers);
    setMedianIncome(median);
    const ratio = median > 0 ? (monthlyIncome / median) * 100 : 0;
    setIncomeRatio(ratio);

    const eligible = ratio <= 150;
    setIsEligible(eligible);

    if (eligible) {
      // 서비스 기간
      let days = 15;
      if (birthOrder === "twin") days = 20;
      else if (birthOrder === "third") days = 15;
      if (serviceType === "intensive") days += 5;
      setServiceDays(days);

      // 본인부담금
      let dailyPay = 0;
      if (ratio <= 40) dailyPay = 0;
      else if (ratio <= 50) dailyPay = 5000;
      else if (ratio <= 80) dailyPay = 10000;
      else if (ratio <= 120) dailyPay = 15000;
      else dailyPay = 20000;
      setDailySelfPay(dailyPay);
      setTotalSelfPay(dailyPay * days);

      // 정부 지원
      const dailyGov = birthOrder === "twin" ? MATERNAL_CARE_2026.govSupport.twin : MATERNAL_CARE_2026.govSupport.standard;
      setGovSupportTotal(dailyGov * days);
    } else {
      setServiceDays(0);
      setDailySelfPay(0);
      setTotalSelfPay(0);
      setGovSupportTotal(0);
    }
  }, [familyMembers, monthlyIncome, birthOrder, serviceType]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">산모·신생아 건강관리 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 기준 산모·신생아 건강관리 서비스 지원 금액과 본인부담금을 확인해요</p>
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
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">소득 비율</span></div>
          <span className={`font-bold ${incomeRatio <= 150 ? "text-[#15803D]" : "text-red-600"}`}>중위소득의 {incomeRatio.toFixed(1)}%</span>
          <span className="text-xs text-neutral-500 ml-2">(기준: 150% 이하)</span>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">2. 출산 정보</h3></div>
        <div className="py-3 px-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-48">출산 순서</span>
            <select value={birthOrder} onChange={(e) => setBirthOrder(e.target.value as "first"|"second"|"third"|"twin")} className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]">
              <option value="first">첫째</option>
              <option value="second">둘째</option>
              <option value="third">셋째 이상</option>
              <option value="twin">쌍태아 (쌍둥이)</option>
            </select>
          </div>
        </div>
        <div className="py-3 px-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-medium text-neutral-700 sm:w-48">서비스 유형</span>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="serviceType" checked={serviceType === "standard"} onChange={() => setServiceType("standard")} className="w-4 h-4 text-[#1E3A5F]" />
                <span className="text-sm">표준형</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="serviceType" checked={serviceType === "intensive"} onChange={() => setServiceType("intensive")} className="w-4 h-4 text-[#1E3A5F]" />
                <span className="text-sm">집중형 (+5일)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {isEligible && (
        <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
          <div className="bg-[#1E3A5F] px-6 py-3"><h3 className="font-semibold text-white">지원 결과</h3></div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">정부 지원 바우처</p>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(govSupportTotal)}원</p>
              <p className="text-sm text-neutral-500">{serviceDays}일 x 일 {formatNumber(birthOrder === "twin" ? 250000 : 200000)}원</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-neutral-500 mb-1">서비스 기간</p>
                <p className="text-lg font-bold text-neutral-800">{serviceDays}일</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-neutral-500 mb-1">일 본인부담</p>
                <p className="text-lg font-bold text-neutral-800">{formatNumber(dailySelfPay)}원</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-neutral-500 mb-1">총 본인부담</p>
                <p className="text-lg font-bold text-amber-700">{formatNumber(totalSelfPay)}원</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isEligible && monthlyIncome > 0 && (
        <div className="p-6"><div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="font-medium text-[#132A42]">소득이 기준 중위소득 150%를 초과해요</p>
        </div></div>
      )}

      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">산모·신생아 건강관리 서비스가 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">출산 후 건강관리사가 가정을 방문하여 산모와 신생아를 돌봐주는 서비스예요. 산후조리 대체 성격이에요.</p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>대상:</strong> 기준 중위소득 150% 이하 출산 가정</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>서비스:</strong> 산모 건강관리, 신생아 돌봄, 가사 지원</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>신청:</strong> 주민센터, 복지로 (출산 전 40일부터)</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]"><p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline">복지로</a></p></div>
        </div>
      </div>
    </div>
  );
}
