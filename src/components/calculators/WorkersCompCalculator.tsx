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

export default function WorkersCompCalculator() {
  const [averageWage, setAverageWage] = useState<string>("100000");
  const [restDays, setRestDays] = useState<string>("30");

  const wage = parseInput(averageWage);
  const days = parseInput(restDays);

  // 휴업급여 계산: 평균임금 × 70% × 휴업일수
  const BENEFIT_RATE = 0.70; // 70%
  const dailyBenefit = wage * BENEFIT_RATE;
  const totalBenefit = dailyBenefit * days;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          산재 휴업급여 계산기
        </h1>
        <p className="text-gray-600">
          평균임금과 휴업일수를 입력하면 산재보험 휴업급여 금액을 계산해드려요.
        </p>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 정보 입력
        </h2>

        {/* 평균임금 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1일 평균임금
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={averageWage}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(value)) {
                  setAverageWage(value ? formatNumber(parseInput(value)) : "");
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 100,000"
            />
            <span className="text-gray-600">원</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            산재 발생 전 3개월 총 임금 ÷ 총 일수
          </p>
        </div>

        {/* 휴업일수 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            휴업일수 (근로불능일수)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={restDays}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(value)) {
                  setRestDays(value ? formatNumber(parseInput(value)) : "");
                }
              }}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 30"
            />
            <span className="text-gray-600">일</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            요양으로 일하지 못한 기간 (4일 이상부터 지급)
          </p>
        </div>

        {/* 안내 박스 */}
        <div className="bg-white p-4 rounded border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>휴업급여 지급률:</strong> 평균임금의 <strong>70%</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            산재로 인해 일하지 못하는 기간 동안 지급돼요
          </p>
        </div>
      </div>

      {/* 결과 섹션 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-6">💰 예상 휴업급여</h2>

        <div className="space-y-4">
          {/* 1일 휴업급여 */}
          <div className="flex justify-between items-center pb-4 border-b border-blue-400">
            <span className="text-lg">1일 휴업급여 (평균임금 × 70%)</span>
            <span className="text-2xl font-bold">{formatNumber(dailyBenefit)}원</span>
          </div>

          {/* 휴업일수 */}
          <div className="flex justify-between items-center pb-4 border-b border-blue-400">
            <span className="text-lg">휴업일수</span>
            <span className="text-2xl font-bold">{formatNumber(days)}일</span>
          </div>

          {/* 총 휴업급여 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-semibold">총 휴업급여</span>
            <span className="text-3xl font-bold">{formatNumber(totalBenefit)}원</span>
          </div>
        </div>

        <p className="text-sm text-blue-100 mt-6">
          실제 지급액은 근로복지공단 심사 결과에 따라 달라질 수 있어요
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
              1일 휴업급여 = 평균임금 × 70%
            </p>
            <p className="font-mono text-sm text-blue-600">
              {formatNumber(wage)} × 0.70 = {formatNumber(dailyBenefit)}원
            </p>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="font-mono text-sm text-gray-700 mb-2">
              총 휴업급여 = 1일 휴업급여 × 휴업일수
            </p>
            <p className="font-mono text-sm text-blue-600">
              {formatNumber(dailyBenefit)} × {formatNumber(days)} = {formatNumber(totalBenefit)}원
            </p>
          </div>
        </div>
      </div>

      {/* 평균임금별 예시 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 평균임금별 휴업급여
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">평균임금</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">1일 급여 (70%)</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">30일 급여</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">90일 급여</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">50,000원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">35,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">1,050,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">3,150,000원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">100,000원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">70,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">2,100,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">6,300,000원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">150,000원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">105,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">3,150,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">9,450,000원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">200,000원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">140,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">4,200,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">12,600,000원</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">300,000원</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">210,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">6,300,000원</td>
                <td className="py-3 px-4 text-right text-gray-600">18,900,000원</td>
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
            <span><strong>지급 조건:</strong> 요양으로 인한 근로불능 기간이 4일 이상이어야 해요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>평균임금:</strong> 산재 발생 전 3개월 총 임금을 총 일수로 나눈 금액이에요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>지급률:</strong> 평균임금의 70%가 휴업급여로 지급돼요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>지급 기간:</strong> 요양 기간 동안 계속 지급되며 기간 제한이 없어요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>치료비:</strong> 휴업급여 외에 산재 치료비는 100% 별도 지원돼요</span>
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
            <p className="font-medium text-gray-900 mb-2">예시 1: 평균임금 10만원, 30일 휴업</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 1일 휴업급여: 100,000원 × 70% = 70,000원</span>
              <span className="block">• 총 휴업급여: 70,000원 × 30일 = <strong>2,100,000원</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 2: 평균임금 15만원, 90일 휴업</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 1일 휴업급여: 150,000원 × 70% = 105,000원</span>
              <span className="block">• 총 휴업급여: 105,000원 × 90일 = <strong>9,450,000원</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 3: 월급 300만원 (평균임금 약 10만원), 60일 휴업</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 월급 3,000,000원 ÷ 30일 = 평균임금 100,000원</span>
              <span className="block">• 1일 휴업급여: 100,000원 × 70% = 70,000원</span>
              <span className="block">• 총 휴업급여: 70,000원 × 60일 = <strong>4,200,000원</strong></span>
            </p>
          </div>
        </div>
      </div>

      {/* 신청 절차 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 휴업급여 신청 절차
        </h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">산재 신고</p>
              <p className="text-gray-600">회사나 본인이 근로복지공단에 산재 발생 사실을 신고해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">요양급여 신청</p>
              <p className="text-gray-600">병원에서 진단서를 받아 요양급여 신청서를 제출해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">휴업급여 신청</p>
              <p className="text-gray-600">4일 이상 근로불능 시 휴업급여 신청서를 제출해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <p className="font-medium">지급 결정</p>
              <p className="text-gray-600">근로복지공단 심사 후 평균임금의 70%를 지급받아요</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="https://www.kcomwel.or.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>근로복지공단 산재보험 바로가기</span>
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
            • <a href="https://www.kcomwel.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">근로복지공단 (2026년 기준)</a>
          </li>
          <li>
            • <a href="https://www.law.go.kr/법령/산업재해보상보험법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">산업재해보상보험법</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
