"use client";

import { useState } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

export default function ChildTaxCreditCalculator() {
  const [childCount, setChildCount] = useState<number>(1);
  const [birthYear, setBirthYear] = useState<number>(2026);
  const [hasBirth, setHasBirth] = useState<boolean>(false);
  const [birthOrder, setBirthOrder] = useState<number>(1);

  // 자녀세액공제 계산 (자녀 수별)
  function calculateChildCredit(count: number): number {
    if (count === 0) return 0;
    if (count === 1) return 150000;
    if (count === 2) return 350000;
    // 3명 이상: 35만원 + 30만원 × (자녀 수 - 2)
    return 350000 + 300000 * (count - 2);
  }

  // 출생·입양 세액공제
  function calculateBirthCredit(order: number): number {
    if (order === 1) return 300000; // 첫째 30만원
    if (order === 2) return 500000; // 둘째 50만원
    return 700000; // 셋째 이상 70만원
  }

  const childCredit = calculateChildCredit(childCount);
  const birthCredit = hasBirth ? calculateBirthCredit(birthOrder) : 0;
  const totalCredit = childCredit + birthCredit;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          자녀세액공제 계산기
        </h1>
        <p className="text-gray-600">
          자녀 수와 출생 여부를 입력하면 연말정산에서 받을 수 있는 자녀세액공제 금액을 계산해드려요.
        </p>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 정보 입력
        </h2>

        {/* 자녀 수 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            자녀 수 (만 7~18세)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="0"
              max="10"
              value={childCount}
              onChange={(e) => setChildCount(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-600">명</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            만 7세 이상 만 18세 이하 자녀 수를 입력하세요
          </p>
        </div>

        {/* 기준 연도 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기준 연도
          </label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(parseInt(e.target.value))}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={2026}>2026년</option>
            <option value={2027}>2027년</option>
          </select>
        </div>

        {/* 출생·입양 여부 */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasBirth}
              onChange={(e) => setHasBirth(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {birthYear}년에 출생·입양한 자녀가 있어요
            </span>
          </label>
        </div>

        {/* 출생 순서 (출생 체크 시) */}
        {hasBirth && (
          <div className="mb-6 ml-7">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              출생·입양 순서
            </label>
            <select
              value={birthOrder}
              onChange={(e) => setBirthOrder(parseInt(e.target.value))}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>첫째</option>
              <option value={2}>둘째</option>
              <option value={3}>셋째 이상</option>
            </select>
          </div>
        )}
      </div>

      {/* 결과 섹션 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-6">💰 예상 세액공제</h2>

        <div className="space-y-4">
          {/* 자녀세액공제 */}
          <div className="flex justify-between items-center pb-4 border-b border-blue-400">
            <span className="text-lg">자녀세액공제 ({childCount}명)</span>
            <span className="text-2xl font-bold">{formatNumber(childCredit)}원</span>
          </div>

          {/* 출생·입양 공제 */}
          {hasBirth && (
            <div className="flex justify-between items-center pb-4 border-b border-blue-400">
              <span className="text-lg">
                출생·입양 공제 ({birthOrder === 1 ? "첫째" : birthOrder === 2 ? "둘째" : "셋째 이상"})
              </span>
              <span className="text-2xl font-bold">{formatNumber(birthCredit)}원</span>
            </div>
          )}

          {/* 합계 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-semibold">총 세액공제</span>
            <span className="text-3xl font-bold">{formatNumber(totalCredit)}원</span>
          </div>
        </div>

        <p className="text-sm text-blue-100 mt-6">
          실제 환급액은 납부한 세액 범위 내에서 결정돼요
        </p>
      </div>

      {/* 자녀 수별 공제액 표 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 자녀 수별 공제액
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">자녀 수</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">연간 공제액</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">계산식</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">1명</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">150,000원</td>
                <td className="py-3 px-4 text-gray-600">15만원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">2명</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">350,000원</td>
                <td className="py-3 px-4 text-gray-600">35만원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">3명</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">650,000원</td>
                <td className="py-3 px-4 text-gray-600">35만원 + 30만원 × 1</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">4명</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">950,000원</td>
                <td className="py-3 px-4 text-gray-600">35만원 + 30만원 × 2</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">5명</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">1,250,000원</td>
                <td className="py-3 px-4 text-gray-600">35만원 + 30만원 × 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 출생·입양 공제액 표 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🍼 출생·입양 세액공제
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">출생 순서</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">추가 공제액</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">적용 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">첫째</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">300,000원</td>
                <td className="py-3 px-4 text-gray-600">출생 연도 1회</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">둘째</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">500,000원</td>
                <td className="py-3 px-4 text-gray-600">출생 연도 1회</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">셋째 이상</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">700,000원</td>
                <td className="py-3 px-4 text-gray-600">출생 연도 1회</td>
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
            <span><strong>대상 나이:</strong> 만 7세 이상 만 18세 이하 자녀만 해당돼요 (12월 31일 기준)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>중복 불가:</strong> 맞벌이 부부도 한 사람만 공제받을 수 있어요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>손자녀:</strong> 부양하는 손자녀도 자녀세액공제 대상이에요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>세액공제:</strong> 소득공제가 아닌 세액공제라서 세금에서 직접 차감돼요</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>출생 공제:</strong> 출생·입양한 해에만 1회 추가 공제받아요</span>
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
            <p className="font-medium text-gray-900 mb-2">예시 1: 자녀 2명 (만 8세, 만 12세)</p>
            <p className="text-sm text-gray-700">
              자녀세액공제: <strong>350,000원</strong>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 2: 자녀 3명 + 2026년 셋째 출생</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 자녀세액공제 (3명): 650,000원</span>
              <span className="block">• 출생 공제 (셋째): 700,000원</span>
              <span className="block font-semibold text-green-700">• 합계: 1,350,000원</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 3: 자녀 5명</p>
            <p className="text-sm text-gray-700">
              자녀세액공제: 35만원 + 30만원 × 3 = <strong>1,250,000원</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 신청 방법 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 신청 방법
        </h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">국세청 홈택스 접속</p>
              <p className="text-gray-600">연말정산 간소화 서비스에서 자동으로 자녀 정보가 반영돼요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">자녀 공제 확인</p>
              <p className="text-gray-600">주민등록등본 기반으로 자동 계산되며, 확인 후 제출하면 돼요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">출생·입양 서류 제출</p>
              <p className="text-gray-600">해당년도 출생·입양 시 출생증명서나 입양관계증명서 첨부해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <p className="font-medium">회사 제출</p>
              <p className="text-gray-600">연말정산 서류를 회사에 제출하면 2월 급여에 반영돼요</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>홈택스 연말정산 바로가기</span>
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
            • <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">소득세법 (2026년 기준)</a>
          </li>
          <li>
            • <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">국세청 (2026년 기준)</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
