"use client";

import { useState } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

export default function LongTermCareCalculator() {
  const [serviceType, setServiceType] = useState<"home" | "facility">("home");
  const [grade, setGrade] = useState<number>(3);
  const [monthlyCost, setMonthlyCost] = useState<string>("1000000");
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false);

  // 등급별 월 한도액 (2026년 기준)
  const MONTHLY_LIMITS: { [key: number]: number } = {
    1: 1600000, // 1등급: 160만원
    2: 1400000, // 2등급: 140만원
    3: 1300000, // 3등급: 130만원
    4: 1200000, // 4등급: 120만원
    5: 1100000, // 5등급: 110만원
    6: 600000,  // 인지지원등급: 60만원
  };

  const cost = parseInput(monthlyCost);
  const limit = MONTHLY_LIMITS[grade];

  // 본인부담률
  const copaymentRate = serviceType === "home" ? 0.15 : 0.20; // 재가 15%, 시설 20%

  // 계산
  let copayment = 0;
  let publicSupport = 0;
  let excessCost = 0;

  if (isBeneficiary) {
    // 기초생활수급자는 면제
    copayment = 0;
    publicSupport = cost;
  } else if (serviceType === "home") {
    // 재가급여: 한도 내에서만 15% 부담
    const withinLimit = Math.min(cost, limit);
    excessCost = Math.max(0, cost - limit);
    copayment = withinLimit * copaymentRate + excessCost;
    publicSupport = withinLimit * (1 - copaymentRate);
  } else {
    // 시설급여: 전체 비용의 20% 부담 (한도 없음)
    copayment = cost * copaymentRate;
    publicSupport = cost * (1 - copaymentRate);
  }

  const gradeNames: { [key: number]: string } = {
    1: "1등급 (95점 이상)",
    2: "2등급 (75~95점)",
    3: "3등급 (60~75점)",
    4: "4등급 (51~60점)",
    5: "5등급 (45~51점, 치매)",
    6: "인지지원등급 (45점 미만, 치매)",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          노인장기요양 본인부담금 계산기
        </h1>
        <p className="text-gray-600">
          장기요양 서비스 유형과 등급, 비용을 입력하면 본인부담금과 공단지원금을 계산해드려요.
        </p>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 정보 입력
        </h2>

        {/* 서비스 유형 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            서비스 유형
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setServiceType("home")}
              className={`p-4 rounded-lg border-2 transition-colors ${
                serviceType === "home"
                  ? "border-blue-500 bg-blue-100 text-blue-900"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="font-semibold mb-1">재가급여</div>
              <div className="text-sm">방문요양, 주간보호 등</div>
              <div className="text-xs mt-1 text-gray-600">본인부담 15%</div>
            </button>
            <button
              onClick={() => setServiceType("facility")}
              className={`p-4 rounded-lg border-2 transition-colors ${
                serviceType === "facility"
                  ? "border-blue-500 bg-blue-100 text-blue-900"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="font-semibold mb-1">시설급여</div>
              <div className="text-sm">요양원 입소</div>
              <div className="text-xs mt-1 text-gray-600">본인부담 20%</div>
            </button>
          </div>
        </div>

        {/* 장기요양등급 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            장기요양등급
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(gradeNames).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {serviceType === "home" && (
            <p className="text-sm text-gray-500 mt-1">
              월 한도액: {formatNumber(limit)}원
            </p>
          )}
        </div>

        {/* 월 서비스 비용 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {serviceType === "home" ? "월 이용 예상 비용" : "월 요양원 비용"}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={monthlyCost}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(value)) {
                  setMonthlyCost(value ? formatNumber(parseInput(value)) : "");
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 1,000,000"
            />
            <span className="text-gray-600">원</span>
          </div>
          {serviceType === "home" && cost > limit && (
            <p className="text-sm text-amber-600 mt-1">
              ⚠️ 한도 초과액({formatNumber(excessCost)}원)은 100% 본인부담이에요
            </p>
          )}
        </div>

        {/* 기초생활수급자 여부 */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isBeneficiary}
              onChange={(e) => setIsBeneficiary(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              기초생활수급자 또는 의료급여 수급자예요
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-1 ml-7">
            수급자는 본인부담금이 면제돼요
          </p>
        </div>
      </div>

      {/* 결과 섹션 */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-6">💰 예상 본인부담금</h2>

        <div className="space-y-4">
          {/* 총 서비스 비용 */}
          <div className="flex justify-between items-center pb-4 border-b border-green-400">
            <span className="text-lg">총 서비스 비용</span>
            <span className="text-2xl font-bold">{formatNumber(cost)}원</span>
          </div>

          {/* 공단 지원금 */}
          <div className="flex justify-between items-center pb-4 border-b border-green-400">
            <span className="text-lg">공단 지원금 ({isBeneficiary ? "100%" : serviceType === "home" ? "85%" : "80%"})</span>
            <span className="text-2xl font-bold">{formatNumber(publicSupport)}원</span>
          </div>

          {/* 본인부담금 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-semibold">
              본인부담금 {!isBeneficiary && `(${copaymentRate * 100}%${serviceType === "home" && cost > limit ? " + 초과액" : ""})`}
            </span>
            <span className="text-3xl font-bold">{formatNumber(copayment)}원</span>
          </div>
        </div>

        {isBeneficiary && (
          <div className="mt-6 p-4 bg-green-400 bg-opacity-30 rounded">
            <p className="text-sm">
              ✅ 기초생활수급자는 본인부담금이 전액 면제돼요
            </p>
          </div>
        )}
      </div>

      {/* 계산 상세 */}
      {!isBeneficiary && serviceType === "home" && cost > limit && (
        <div className="bg-amber-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📌 한도 초과 계산 상세
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• 한도 내 비용: {formatNumber(limit)}원 × 15% = <strong>{formatNumber(limit * 0.15)}원</strong></p>
            <p>• 한도 초과 비용: {formatNumber(excessCost)}원 × 100% = <strong>{formatNumber(excessCost)}원</strong></p>
            <p className="pt-2 border-t border-amber-200 font-semibold">
              • 총 본인부담금: {formatNumber(copayment)}원
            </p>
          </div>
        </div>
      )}

      {/* 등급별 한도액 표 (재가급여만) */}
      {serviceType === "home" && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 등급별 월 한도액
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">등급</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">월 한도액</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">본인부담 (15%)</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">중증도</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">1등급</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">1,600,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">240,000원</td>
                  <td className="py-3 px-4 text-gray-600">95점 이상 (최중증)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">2등급</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">1,400,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">210,000원</td>
                  <td className="py-3 px-4 text-gray-600">75~95점</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">3등급</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">1,300,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">195,000원</td>
                  <td className="py-3 px-4 text-gray-600">60~75점</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">4등급</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">1,200,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">180,000원</td>
                  <td className="py-3 px-4 text-gray-600">51~60점</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">5등급</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">1,100,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">165,000원</td>
                  <td className="py-3 px-4 text-gray-600">45~51점 (치매)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900">인지지원</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">600,000원</td>
                  <td className="py-3 px-4 text-right text-gray-600">90,000원</td>
                  <td className="py-3 px-4 text-gray-600">45점 미만 (치매)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 안내사항 */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>꼭 확인하세요</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>재가급여:</strong> 방문요양, 주간보호 등 집에서 받는 서비스 (본인부담 15%)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>시설급여:</strong> 요양원 입소 서비스 (본인부담 20%, 한도 없음)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>한도 초과:</strong> 재가급여는 등급별 월 한도 초과분은 100% 본인부담이에요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>수급자 면제:</strong> 기초생활수급자와 의료급여 수급자는 전액 면제돼요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>감경 대상:</strong> 저소득층은 일부 감면 혜택이 있을 수 있어요</span>
          </li>
        </ul>
      </div>

      {/* 계산 예시 */}
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 계산 예시
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 1: 3등급, 재가급여 월 100만원 이용</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 서비스 비용: 1,000,000원 (한도 내)</span>
              <span className="block">• 공단 지원: 850,000원 (85%)</span>
              <span className="block">• 본인부담: <strong>150,000원 (15%)</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 2: 2등급, 요양원 월 200만원</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 서비스 비용: 2,000,000원</span>
              <span className="block">• 공단 지원: 1,600,000원 (80%)</span>
              <span className="block">• 본인부담: <strong>400,000원 (20%)</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 3: 3등급, 재가급여 월 150만원 이용 (한도 초과)</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 한도 내: 1,300,000원 × 15% = 195,000원</span>
              <span className="block">• 한도 초과: 200,000원 × 100% = 200,000원</span>
              <span className="block">• 본인부담: <strong>395,000원</strong></span>
            </p>
          </div>
        </div>
      </div>

      {/* 신청 절차 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 장기요양등급 신청 절차
        </h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">국민건강보험공단 방문</p>
              <p className="text-gray-600">가까운 공단 지사에서 장기요양인정 신청서 작성해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">방문조사</p>
              <p className="text-gray-600">30일 이내 공단 직원이 집으로 와서 52개 항목 조사해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">등급판정</p>
              <p className="text-gray-600">등급판정위원회 심사 후 30일 이내 결과 통보돼요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <p className="font-medium">서비스 이용</p>
              <p className="text-gray-600">장기요양인정서 받고 재가급여나 시설급여 이용 시작해요</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="https://www.longtermcare.or.kr/npbs/e/b/101/npeb101m01.web?menuId=npe0000000030"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>장기요양 등급 신청하기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* 출처 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">📚 출처</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • <a href="https://www.law.go.kr/법령/노인장기요양보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">노인장기요양보험법 (2026년 기준)</a>
          </li>
          <li>
            • <a href="https://www.longtermcare.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국민건강보험공단 장기요양보험</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
