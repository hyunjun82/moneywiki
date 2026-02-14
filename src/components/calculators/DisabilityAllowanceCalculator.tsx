"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// ─── 2026년 장애(아동)수당 기준 (보건복지부 고시) ───
const DISABILITY_ALLOWANCE_2026 = {
  // 장애아동수당 (만 18세 미만)
  child: {
    severe: {
      // 중증 (장애의 정도가 심한 장애인)
      basic: 220000,        // 기초생활수급자 (재가)
      nearPoor: 170000,     // 차상위계층
      facility: 90000,      // 보장시설 수급자
    },
    mild: {
      // 경증 (장애의 정도가 심하지 않은 장애인)
      basic: 110000,        // 기초생활수급자 (재가)
      nearPoor: 110000,     // 차상위계층
      facility: 30000,      // 보장시설 수급자
    },
  },
  // 장애수당 (만 18세 이상, 장애의 정도가 심하지 않은 장애인)
  adult: {
    basic: 60000,           // 기초생활수급자 (재가)
    nearPoor: 60000,        // 차상위계층
    facility: 30000,        // 보장시설 수급자
  },
};

export default function DisabilityAllowanceCalculator() {
  // ─── 입력 상태 ───
  const [ageGroup, setAgeGroup] = useState<"child" | "adult">("child"); // 18세 미만/이상
  const [severity, setSeverity] = useState<"severe" | "mild">("severe"); // 중증/경증
  const [incomeClass, setIncomeClass] = useState<"basic" | "nearPoor" | "facility">("basic"); // 소득 구간
  const [recipients, setRecipients] = useState(1); // 수급 대상 인원

  // ─── 계산 결과 ───
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [annualAmount, setAnnualAmount] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  // ─── 계산 로직 ───
  const calculate = useCallback(() => {
    let amount = 0;

    if (ageGroup === "child") {
      // 장애아동수당
      const rates = severity === "severe"
        ? DISABILITY_ALLOWANCE_2026.child.severe
        : DISABILITY_ALLOWANCE_2026.child.mild;
      amount = rates[incomeClass];
    } else {
      // 장애수당 (성인, 경증만 대상)
      // 중증 성인은 장애인연금 대상이므로 장애수당 대상 아님
      if (severity === "severe") {
        amount = 0; // 중증 성인은 장애인연금으로 안내
      } else {
        amount = DISABILITY_ALLOWANCE_2026.adult[incomeClass];
      }
    }

    const monthly = amount * recipients;
    setMonthlyAmount(monthly);
    setAnnualAmount(monthly * 12);
    setIsEligible(amount > 0);
  }, [ageGroup, severity, incomeClass, recipients]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const incomeLabel = incomeClass === "basic" ? "기초생활수급자" : incomeClass === "nearPoor" ? "차상위계층" : "보장시설 수급자";
  const severityLabel = severity === "severe" ? "장애의 정도가 심한" : "장애의 정도가 심하지 않은";

  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-[#1E3A5F] text-white px-6 py-4">
          <h2 className="text-xl font-bold">장애(아동)수당 모의계산기</h2>
          <p className="text-[#EDF2F8] text-sm mt-1">2026년 보건복지부 기준으로 장애수당·장애아동수당 예상 금액을 확인해요</p>
        </div>

        {/* ─── 1. 대상자 정보 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">1. 대상자 정보</h3>
            <p className="text-xs text-neutral-500 mt-1">장애인 연령, 장애 정도, 소득 구간을 선택하세요</p>
          </div>

          {/* 연령 구분 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">연령 구분</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="ageGroup" checked={ageGroup === "child"} onChange={() => setAgeGroup("child")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">만 18세 미만 (장애아동수당)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="ageGroup" checked={ageGroup === "adult"} onChange={() => setAgeGroup("adult")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">만 18세 이상 (장애수당)</span>
                </label>
              </div>
            </div>
            {ageGroup === "adult" && (
              <p className="text-xs text-neutral-500 mt-1 sm:ml-48">만 18세 이상 중증 장애인은 장애인연금 대상이에요</p>
            )}
          </div>

          {/* 장애 정도 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">장애 정도</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="severity" checked={severity === "severe"} onChange={() => setSeverity("severe")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">심한 장애 (중증)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="severity" checked={severity === "mild"} onChange={() => setSeverity("mild")} className="w-4 h-4 text-[#1E3A5F] focus:ring-[#2B5280]" />
                  <span className="text-sm text-neutral-700">심하지 않은 장애 (경증)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 소득 구간 */}
          <div className="py-3 px-4 border-b border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 sm:w-48">소득 구간</span>
              <select
                value={incomeClass}
                onChange={(e) => setIncomeClass(e.target.value as "basic" | "nearPoor" | "facility")}
                className="w-full sm:w-64 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700"
              >
                <option value="basic">기초생활수급자 (재가)</option>
                <option value="nearPoor">차상위계층</option>
                <option value="facility">보장시설 수급자</option>
              </select>
            </div>
            <p className="text-xs text-neutral-500 mt-1 sm:ml-48">
              {incomeClass === "basic"
                ? "국민기초생활수급자 (생계·의료·주거·교육급여)"
                : incomeClass === "nearPoor"
                  ? "차상위 계층 (기준 중위소득 50% 이하)"
                  : "장애인 거주시설 등 보장시설 입소자"}
            </p>
          </div>

          {/* 수급 인원 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
            <div className="sm:w-48 flex-shrink-0">
              <span className="text-sm font-medium text-neutral-700">수급 대상 인원</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <select
                value={recipients}
                onChange={(e) => setRecipients(parseInt(e.target.value))}
                className="w-24 px-4 py-3 border border-neutral-300 rounded-lg bg-white focus:border-[#2B5280] focus:ring-1 focus:ring-[#2B5280] text-neutral-700"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>
            <div className="sm:w-64 text-xs text-neutral-500">
              가구 내 수당 대상 장애인 수
            </div>
          </div>
        </div>

        {/* ─── 2. 판정 결과 ─── */}
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">2. 수급 판정</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">수당 유형</span>
              <span className="font-medium">{ageGroup === "child" ? "장애아동수당" : "장애수당"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">장애 정도</span>
              <span className="font-medium">{severityLabel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">소득 구간</span>
              <span className="font-medium">{incomeLabel}</span>
            </div>
            <div className={`flex justify-between py-2 border-b border-neutral-100 -mx-4 px-4 ${isEligible ? "bg-[#F0FDF4]" : "bg-amber-50"}`}>
              <span className="font-medium text-neutral-700">수급 판정</span>
              <span className={`font-bold ${isEligible ? "text-[#15803D]" : "text-amber-700"}`}>
                {isEligible ? "수급 가능" : ageGroup === "adult" && severity === "severe" ? "장애인연금 대상" : "대상 아님"}
              </span>
            </div>
          </div>
        </div>

        {/* ─── 3. 결과 ─── */}
        {isEligible && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50">
            <div className="bg-[#1E3A5F] px-6 py-3">
              <h3 className="font-semibold text-white">{ageGroup === "child" ? "장애아동수당" : "장애수당"} 계산 결과</h3>
            </div>
            <div className="p-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-neutral-500 mb-2">예상 월 수급액</p>
                <p className="text-4xl font-bold text-[#1E3A5F] mb-2">
                  {formatNumber(monthlyAmount)}원
                </p>
                <p className="text-sm text-neutral-500">
                  연간 약 {formatNumber(annualAmount)}원
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">1인당 월액</p>
                  <p className="text-lg font-bold text-neutral-800">
                    {formatNumber(monthlyAmount / recipients)}원
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-500 mb-1">지급일</p>
                  <p className="text-lg font-bold text-neutral-800">매월 20일</p>
                </div>
              </div>
              {recipients > 1 && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl">
                  <p className="text-sm text-neutral-600">
                    {recipients}명 합산 월 {formatNumber(monthlyAmount)}원, 연간 {formatNumber(annualAmount)}원이에요.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 중증 성인 안내 */}
        {ageGroup === "adult" && severity === "severe" && (
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="font-medium text-[#132A42]">중증 장애인은 장애인연금 대상이에요</p>
              <p className="text-sm text-blue-700 mt-1">
                만 18세 이상 중증 장애인(장애의 정도가 심한 장애인)은 장애수당이 아닌 <strong>장애인연금</strong>을 받을 수 있어요.
                2026년 기초급여액은 월 최대 약 42만 3,500원이에요.
              </p>
              <a href="/w/장애인연금-계산기" className="inline-block mt-2 text-sm text-[#1E3A5F] font-medium underline hover:text-[#132A42]">
                장애인연금 계산기 바로가기
              </a>
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
              장애(아동)수당이 뭔가요?
            </h4>
            <p className="text-sm text-[#162F4F] mb-2">
              장애로 인한 추가 비용을 보전해 주기 위해 저소득 장애인에게 매월 지급하는 수당이에요.
              <span className="font-medium"> 만 18세 미만은 장애아동수당, 만 18세 이상 경증 장애인은 장애수당을 받을 수 있어요.</span>
            </p>
            <ul className="text-sm text-[#162F4F] space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>신청:</strong> 주민센터 방문 또는 복지로 온라인 신청</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>대상:</strong> 기초생활수급자·차상위 장애인</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span><strong>장애아동수당 최대:</strong> 월 22만 원 (중증, 기초수급자)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">&#9888;</span>
                <span><strong>중증 성인:</strong> 장애수당이 아닌 장애인연금 대상</span>
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
            <h4 className="font-bold text-neutral-800 mb-3 text-center">2026년 장애(아동)수당 지급 기준</h4>
            <p className="text-xs text-neutral-500 text-center mb-3">보건복지부 고시 (2026년 기준)</p>

            {/* 장애아동수당 표 */}
            <p className="text-sm font-bold text-[#1E3A5F] mb-2">장애아동수당 (만 18세 미만)</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">구분</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">기초수급 (재가)</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">차상위</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">보장시설</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">중증</td>
                    <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">월 22만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 17만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 9만 원</td>
                  </tr>
                  <tr className="bg-[#F5F8FB]">
                    <td className="py-2 px-2 text-center font-medium text-[#162F4F] border border-gray-300">경증</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 11만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 11만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 3만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 장애수당 표 */}
            <p className="text-sm font-bold text-[#1E3A5F] mb-2">장애수당 (만 18세 이상, 경증)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">기초수급 (재가)</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">차상위</th>
                    <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">보장시설</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-2 px-2 text-center font-bold text-[#1E3A5F] border border-gray-300">월 6만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 6만 원</td>
                    <td className="py-2 px-2 text-center border border-gray-300">월 3만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
              <p className="text-xs text-[#132A42] font-medium">참고사항</p>
              <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
                <li>&#8226; 만 18세 이상 <strong>중증</strong> 장애인은 장애수당이 아닌 <strong>장애인연금</strong> 대상</li>
                <li>&#8226; 장애인연금 기초급여: 월 최대 약 42만 3,500원 (2026년)</li>
                <li>&#8226; 수당은 매월 20일 지급 (은행 휴무 시 전일)</li>
                <li>&#8226; 장애수당과 장애아동수당은 중복 수급 불가</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
