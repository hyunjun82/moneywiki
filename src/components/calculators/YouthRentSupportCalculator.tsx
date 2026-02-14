"use client";

import { useState, useEffect, useCallback } from "react";

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

const MEDIAN_INCOME: Record<number, number> = {
  1: 2392013, 2: 3932658, 3: 5025353, 4: 6097773, 5: 7108688, 6: 8064805,
};

// 2026년 청년월세 한시 특별지원 기준
const YOUTH_RENT_2026 = {
  incomeRatio: 0.60,          // 청년 가구 소득 기준 중위소득 60% 이하
  parentIncomeRatio: 1.00,    // 원가구(부모) 소득 기준 중위소득 100% 이하
  monthlySupport: 200000,     // 월 최대 20만 원
  supportMonths: 12,          // 최대 12개월
  ageMin: 19,
  ageMax: 34,
  assetLimit: 100000000,      // 총 자산 1억 원 이하
  rentMax: 600000,            // 실제 월세 60만 원 이하 (초과 시 감액)
};

export default function YouthRentSupportCalculator() {
  const [age, setAge] = useState(27);
  const [youthIncome, setYouthIncome] = useState(0); // 청년 본인 소득
  const [parentIncome, setParentIncome] = useState(0); // 원가구(부모) 소득
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);

  const [youthMedian, setYouthMedian] = useState(0);
  const [parentMedian, setParentMedian] = useState(0);
  const [youthRatio, setYouthRatio] = useState(0);
  const [parentRatio, setParentRatio] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [supportAmount, setSupportAmount] = useState(0);
  const [totalSupport, setTotalSupport] = useState(0);

  const calculate = useCallback(() => {
    const yMedian = MEDIAN_INCOME[1]; // 1인 가구 기준 (독립 청년)
    const pMedian = MEDIAN_INCOME[4]; // 4인 가구 기준 (부모 원가구)
    setYouthMedian(yMedian);
    setParentMedian(pMedian);

    const yRatio = yMedian > 0 ? (youthIncome / yMedian) * 100 : 0;
    const pRatio = pMedian > 0 ? (parentIncome / pMedian) * 100 : 0;
    setYouthRatio(yRatio);
    setParentRatio(pRatio);

    const ageOk = age >= 19 && age <= 34;
    const incomeOk = yRatio <= 60;
    const parentOk = pRatio <= 100;
    const assetOk = totalAsset <= YOUTH_RENT_2026.assetLimit;
    const eligible = ageOk && incomeOk && parentOk && assetOk && monthlyRent > 0;
    setIsEligible(eligible);

    if (eligible) {
      const support = Math.min(monthlyRent, YOUTH_RENT_2026.monthlySupport);
      setSupportAmount(support);
      setTotalSupport(support * YOUTH_RENT_2026.supportMonths);
    } else {
      setSupportAmount(0);
      setTotalSupport(0);
    }
  }, [age, youthIncome, parentIncome, monthlyRent, totalAsset]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-[#1E3A5F] text-white px-6 py-4">
        <h2 className="text-xl font-bold">청년월세지원 모의계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">2026년 기준 청년월세 한시 특별지원 대상 여부와 예상 지원금을 확인해요</p>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">1. 청년 정보</h3></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">나이</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} min="19" max="40" className="w-28 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">세 (만 19~34세)</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">청년 월 소득</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(youthIncome)} onChange={(e) => setYouthIncome(parseInt(e.target.value.replace(/,/g,"")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">1인 가구 중위소득 60%: {formatNumber(Math.round(MEDIAN_INCOME[1] * 0.6))}원</div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">부모 가구 월 소득</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(parentIncome)} onChange={(e) => setParentIncome(parseInt(e.target.value.replace(/,/g,"")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">4인 가구 중위소득 100%: {formatNumber(MEDIAN_INCOME[4])}원</div>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">2. 주거 정보</h3></div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">월세</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(monthlyRent)} onChange={(e) => setMonthlyRent(parseInt(e.target.value.replace(/,/g,"")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48"><span className="text-sm font-medium text-neutral-700">총 자산</span></div>
          <div className="flex-1 flex items-center gap-2">
            <input type="text" value={formatNumber(totalAsset)} onChange={(e) => setTotalAsset(parseInt(e.target.value.replace(/,/g,"")) || 0)} className="w-full max-w-xs px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280]" />
            <span className="text-sm text-neutral-500">원</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">1억 원 이하 조건</div>
        </div>
      </div>

      {/* 판정 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200"><h3 className="font-semibold text-neutral-800">3. 자격 판정</h3></div>
        <div className="p-4 space-y-2 text-sm">
          {[
            { label: "나이 (19~34세)", ok: age >= 19 && age <= 34 },
            { label: `청년 소득 (60%이하: ${formatNumber(Math.round(MEDIAN_INCOME[1]*0.6))}원)`, ok: youthRatio <= 60 },
            { label: `부모 소득 (100%이하: ${formatNumber(MEDIAN_INCOME[4])}원)`, ok: parentRatio <= 100 },
            { label: "자산 (1억 이하)", ok: totalAsset <= YOUTH_RENT_2026.assetLimit },
          ].map(item => (
            <div key={item.label} className={`flex justify-between py-2 px-4 -mx-4 rounded ${item.ok ? "bg-[#F0FDF4]" : "bg-red-50"}`}>
              <span>{item.label}</span>
              <span className={`font-bold ${item.ok ? "text-[#15803D]" : "text-red-500"}`}>{item.ok ? "충족" : "미충족"}</span>
            </div>
          ))}
        </div>
      </div>

      {isEligible && (
        <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
          <div className="bg-[#1E3A5F] px-6 py-3"><h3 className="font-semibold text-white">청년월세 지원 결과</h3></div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">월 지원금</p>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">{formatNumber(supportAmount)}원</p>
              <p className="text-sm text-neutral-500">최대 {YOUTH_RENT_2026.supportMonths}개월, 총 {formatNumber(totalSupport)}원</p>
            </div>
          </div>
        </div>
      )}

      {!isEligible && (youthIncome > 0 || monthlyRent > 0) && (
        <div className="p-6"><div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="font-medium text-[#132A42]">현재 조건으로는 청년월세 지원 대상이 아니에요</p>
          <p className="text-sm text-amber-700 mt-1">위 자격 요건을 모두 충족해야 해요.</p>
        </div></div>
      )}

      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#EDF2F8]">
        <div className="p-4 rounded-xl border border-[#B8D0E8] bg-white">
          <h4 className="font-medium text-[#132A42] mb-2">청년월세 지원이 뭔가요?</h4>
          <p className="text-sm text-[#162F4F] mb-2">만 19~34세 독립 청년 중 저소득층에게 월세를 최대 월 20만 원, 12개월 지원하는 제도예요.</p>
          <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>지원액:</strong> 월 최대 20만 원 (최대 12개월)</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>청년소득:</strong> 1인 가구 중위소득 60% 이하</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">&#10003;</span><span><strong>신청:</strong> 복지로 또는 주민센터</span></li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[#B8D0E8]"><p className="text-xs text-[#1E3A5F]">출처: <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="underline">보건복지부</a> · <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="underline">복지로</a></p></div>
        </div>
      </div>
    </div>
  );
}
