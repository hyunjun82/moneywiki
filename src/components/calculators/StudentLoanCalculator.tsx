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

export default function StudentLoanCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("30000000");
  const [year, setYear] = useState<number>(2026);

  // 2025년 기준 상환기준소득 (2026년은 아직 미발표, 2025년 기준 사용)
  const THRESHOLD_2025 = 25250000; // 2,525만원
  const REPAYMENT_RATE = 0.20; // 20%

  const income = parseInput(annualIncome);
  const threshold = THRESHOLD_2025;
  const excessIncome = Math.max(0, income - threshold);
  const annualRepayment = excessIncome * REPAYMENT_RATE;
  const monthlyRepayment = annualRepayment / 12;

  const isAboveThreshold = income > threshold;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          학자금대출 상환액 계산기
        </h1>
        <p className="text-gray-600">
          연소득을 입력하면 취업 후 상환 학자금대출(ICL)의 의무 상환액을 계산해드려요.
        </p>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 정보 입력
        </h2>

        {/* 기준 연도 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상환 기준 연도
          </label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={2025}>2025년</option>
            <option value={2026}>2026년 (2025년 기준 적용)</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            2026년 기준은 아직 미발표로 2025년 기준을 적용해요
          </p>
        </div>

        {/* 연소득 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연간 총 소득 (세전)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={annualIncome}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(value)) {
                  setAnnualIncome(value ? formatNumber(parseInput(value)) : "");
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 30,000,000"
            />
            <span className="text-gray-600">원</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            근로소득, 사업소득 등 연간 총 소득을 입력하세요
          </p>
        </div>

        {/* 상환 기준 소득 안내 */}
        <div className="bg-white p-4 rounded border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>2025년 상환기준소득:</strong> {formatNumber(threshold)}원
          </p>
          <p className="text-xs text-gray-500 mt-1">
            이 금액 이하면 상환 의무가 없어요
          </p>
        </div>
      </div>

      {/* 결과 섹션 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-6">💰 예상 상환액</h2>

        {!isAboveThreshold ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-2xl font-bold mb-2">상환 의무 없음</p>
            <p className="text-blue-100">
              연소득이 상환기준소득({formatNumber(threshold)}원) 이하라서<br />
              이번 해는 상환하지 않아도 돼요
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 초과 소득 */}
            <div className="flex justify-between items-center pb-4 border-b border-blue-400">
              <span className="text-lg">상환기준소득 초과액</span>
              <span className="text-2xl font-bold">{formatNumber(excessIncome)}원</span>
            </div>

            {/* 연간 상환액 */}
            <div className="flex justify-between items-center pb-4 border-b border-blue-400">
              <span className="text-lg">연간 의무 상환액 (초과액의 20%)</span>
              <span className="text-2xl font-bold">{formatNumber(annualRepayment)}원</span>
            </div>

            {/* 월 상환액 */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-semibold">월 평균 상환액</span>
              <span className="text-3xl font-bold">{formatNumber(monthlyRepayment)}원</span>
            </div>
          </div>
        )}

        <p className="text-sm text-blue-100 mt-6">
          {isAboveThreshold 
            ? "실제 상환액은 국세청 ICL 홈페이지에서 확정돼요"
            : "대출금은 그대로 남아있으며 이자가 계속 붙어요"}
        </p>
      </div>

      {/* 계산 공식 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🧮 계산 공식
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="font-mono text-sm text-gray-700 mb-2">
              초과소득 = 연소득 - 상환기준소득
            </p>
            <p className="font-mono text-sm text-blue-600">
              {formatNumber(income)} - {formatNumber(threshold)} = {formatNumber(excessIncome)}원
            </p>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="font-mono text-sm text-gray-700 mb-2">
              연간 상환액 = 초과소득 × 20%
            </p>
            <p className="font-mono text-sm text-blue-600">
              {formatNumber(excessIncome)} × 0.20 = {formatNumber(annualRepayment)}원
            </p>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="font-mono text-sm text-gray-700 mb-2">
              월 상환액 = 연간 상환액 ÷ 12개월
            </p>
            <p className="font-mono text-sm text-blue-600">
              {formatNumber(annualRepayment)} ÷ 12 = {formatNumber(monthlyRepayment)}원
            </p>
          </div>
        </div>
      </div>

      {/* 소득별 상환액 표 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 소득별 상환액 예시
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">연소득</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">초과액</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">연간 상환액</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">월 상환액</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">2,000만원</td>
                <td className="py-3 px-4 text-right text-gray-600">0원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">0원</td>
                <td className="py-3 px-4 text-right text-gray-600">0원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">2,525만원</td>
                <td className="py-3 px-4 text-right text-gray-600">0원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">0원</td>
                <td className="py-3 px-4 text-right text-gray-600">0원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">3,000만원</td>
                <td className="py-3 px-4 text-right text-gray-600">475만원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">950,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">79,167원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">4,000만원</td>
                <td className="py-3 px-4 text-right text-gray-600">1,475만원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">2,950,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">245,833원</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">5,000만원</td>
                <td className="py-3 px-4 text-right text-gray-600">2,475만원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">4,950,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">412,500원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 안내사항 */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>⚠️</span>
          <span>꼭 확인하세요</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>자동 계산:</strong> 국세청 ICL 홈페이지에서 전년도 소득 기반으로 자동 계산돼요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>상환 방법:</strong> 계좌이체, 신용카드, 가상계좌 등 다양한 방법 사용 가능해요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>이자:</strong> 상환하지 않은 금액에는 약 2.2% 이자가 계속 붙어요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>상환 유예:</strong> 실직, 경제위기 등 특수 상황에서는 유예 신청 가능해요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>2026년 기준:</strong> 교육부가 아직 공식 발표하지 않아 2025년 기준 적용했어요</span>
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
            <p className="font-medium text-gray-900 mb-2">예시 1: 연소득 2,800만원</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 초과소득: 2,800만원 - 2,525만원 = 275만원</span>
              <span className="block">• 연간 상환액: 275만원 × 20% = <strong>550,000원</strong></span>
              <span className="block">• 월 상환액: 550,000원 ÷ 12 = <strong>45,833원</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 2: 연소득 2,000만원</p>
            <p className="text-sm text-gray-700">
              상환기준소득 이하라서 <strong>상환 의무 없음</strong> (0원)
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 3: 연소득 4,500만원</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 초과소득: 4,500만원 - 2,525만원 = 1,975만원</span>
              <span className="block">• 연간 상환액: 1,975만원 × 20% = <strong>3,950,000원</strong></span>
              <span className="block">• 월 상환액: 3,950,000원 ÷ 12 = <strong>329,167원</strong></span>
            </p>
          </div>
        </div>
      </div>

      {/* 상환 절차 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 상환 절차
        </h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">국세청 ICL 홈페이지 접속</p>
              <p className="text-gray-600">매년 3월경 전년도 소득 정보가 자동으로 반영돼요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">소득 및 상환액 확인</p>
              <p className="text-gray-600">"개인정보 조회" → "소득 및 상환액"에서 확인해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">상환 방법 선택</p>
              <p className="text-gray-600">계좌이체(자동납부), 신용카드, 가상계좌 중 선택해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <p className="font-medium">상환 완료</p>
              <p className="text-gray-600">자동납부 설정하면 매달 정해진 금액이 자동으로 빠져요</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="https://icl.go.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>국세청 ICL 홈페이지 바로가기</span>
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
            • <a href="https://www.law.go.kr/LSW/lsEfInfoP.do?lsiSeq=162099" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">취업 후 학자금 상환 특별법 (2026년 기준)</a>
          </li>
          <li>
            • <a href="https://icl.go.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청 취업 후 학자금 상환(ICL)</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
