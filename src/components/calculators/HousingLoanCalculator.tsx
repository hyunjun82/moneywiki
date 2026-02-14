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

export default function HousingLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("300000000");
  const [interestRate, setInterestRate] = useState<string>("4.0");
  const [loanPeriod, setLoanPeriod] = useState<number>(30);
  const [repaymentType, setRepaymentType] = useState<"equal" | "principal">("equal");

  const principal = parseInput(loanAmount);
  const annualRate = parseFloat(interestRate) / 100;
  const monthlyRate = annualRate / 12;
  const months = loanPeriod * 12;

  // 원리금균등 상환
  function calculateEqualPayment(): { monthly: number; totalInterest: number } {
    if (monthlyRate === 0) {
      return { monthly: principal / months, totalInterest: 0 };
    }
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInterest = monthly * months - principal;
    return { monthly, totalInterest };
  }

  // 원금균등 상환
  function calculatePrincipalPayment(): { firstMonth: number; lastMonth: number; totalInterest: number } {
    const principalPerMonth = principal / months;
    const firstInterest = principal * monthlyRate;
    const firstMonth = principalPerMonth + firstInterest;
    const lastMonth = principalPerMonth + (principalPerMonth * monthlyRate);
    
    // 총 이자 계산 (등차수열 합)
    const totalInterest = (principal * monthlyRate * (months + 1)) / 2;
    
    return { firstMonth, lastMonth, totalInterest };
  }

  const equalPayment = calculateEqualPayment();
  const principalPayment = calculatePrincipalPayment();

  const result = repaymentType === "equal" ? {
    monthly: equalPayment.monthly,
    totalPayment: equalPayment.monthly * months,
    totalInterest: equalPayment.totalInterest,
    isFirstMonth: false,
  } : {
    monthly: principalPayment.firstMonth,
    totalPayment: principal + principalPayment.totalInterest,
    totalInterest: principalPayment.totalInterest,
    isFirstMonth: true,
    lastMonth: principalPayment.lastMonth,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          보금자리론 상환 계산기
        </h1>
        <p className="text-gray-600">
          대출금액, 금리, 상환기간을 입력하면 월 상환액과 총 이자를 계산해드려요.
        </p>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 대출 정보 입력
        </h2>

        {/* 대출금액 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대출금액
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={loanAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(value)) {
                  setLoanAmount(value ? formatNumber(parseInput(value)) : "");
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 300,000,000"
            />
            <span className="text-gray-600">원</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            보금자리론 최대 한도: 3.6억원
          </p>
        </div>

        {/* 연 이자율 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연 이자율
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={interestRate}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setInterestRate(value);
                }
              }}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: 4.0"
            />
            <span className="text-gray-600">%</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            보금자리론 기준: 연 4% 내외 (고정금리)
          </p>
        </div>

        {/* 상환기간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상환기간
          </label>
          <select
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(parseInt(e.target.value))}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={10}>10년</option>
            <option value={15}>15년</option>
            <option value={20}>20년</option>
            <option value={30}>30년</option>
            <option value={40}>40년</option>
          </select>
        </div>

        {/* 상환방식 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상환방식
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRepaymentType("equal")}
              className={`p-4 rounded-lg border-2 transition-colors ${
                repaymentType === "equal"
                  ? "border-blue-500 bg-blue-100 text-blue-900"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="font-semibold mb-1">원리금균등</div>
              <div className="text-sm">매월 동일 금액</div>
            </button>
            <button
              onClick={() => setRepaymentType("principal")}
              className={`p-4 rounded-lg border-2 transition-colors ${
                repaymentType === "principal"
                  ? "border-blue-500 bg-blue-100 text-blue-900"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="font-semibold mb-1">원금균등</div>
              <div className="text-sm">원금 동일, 이자 감소</div>
            </button>
          </div>
        </div>
      </div>

      {/* 결과 섹션 */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-6">💰 상환 계산 결과</h2>

        <div className="space-y-4">
          {/* 월 상환액 */}
          <div className="flex justify-between items-center pb-4 border-b border-green-400">
            <span className="text-lg">
              {repaymentType === "equal" ? "월 상환액 (고정)" : result.isFirstMonth ? "첫 달 상환액" : "마지막 달 상환액"}
            </span>
            <span className="text-2xl font-bold">{formatNumber(result.monthly)}원</span>
          </div>

          {/* 원금균등인 경우 범위 표시 */}
          {repaymentType === "principal" && result.lastMonth && (
            <div className="flex justify-between items-center pb-4 border-b border-green-400">
              <span className="text-lg">마지막 달 상환액</span>
              <span className="text-2xl font-bold">{formatNumber(result.lastMonth)}원</span>
            </div>
          )}

          {/* 총 상환액 */}
          <div className="flex justify-between items-center pb-4 border-b border-green-400">
            <span className="text-lg">총 상환액 ({loanPeriod}년)</span>
            <span className="text-2xl font-bold">{formatNumber(result.totalPayment)}원</span>
          </div>

          {/* 총 이자 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-semibold">총 이자</span>
            <span className="text-3xl font-bold">{formatNumber(result.totalInterest)}원</span>
          </div>
        </div>

        <p className="text-sm text-green-100 mt-6">
          실제 금리와 조건은 은행 심사 결과에 따라 달라질 수 있어요
        </p>
      </div>

      {/* 상환방식 비교 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 상환방식 비교
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">구분</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">원리금균등</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">원금균등</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">첫 달 상환액</td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">
                  {formatNumber(equalPayment.monthly)}원
                </td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">
                  {formatNumber(principalPayment.firstMonth)}원
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">마지막 달 상환액</td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatNumber(equalPayment.monthly)}원
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatNumber(principalPayment.lastMonth)}원
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">총 이자</td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatNumber(equalPayment.totalInterest)}원
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatNumber(principalPayment.totalInterest)}원
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">이자 절감</td>
                <td className="py-3 px-4 text-right text-gray-600">-</td>
                <td className="py-3 px-4 text-right font-semibold text-green-600">
                  {formatNumber(equalPayment.totalInterest - principalPayment.totalInterest)}원 절감
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 보금자리론 안내 */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>보금자리론 조건 (2026년 기준)</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>대상:</strong> 무주택 또는 1주택 가구</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>소득:</strong> 부부합산 연 7,000만원 이하</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>주택가격:</strong> 6억원 이하</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>금리:</strong> 연 4% 내외 (고정금리)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>한도:</strong> 최대 3.6억원</span>
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
            <p className="font-medium text-gray-900 mb-2">예시 1: 3억원, 연 4%, 30년, 원리금균등</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 월 상환액: 약 <strong>1,432,000원</strong> (매달 동일)</span>
              <span className="block">• 총 상환액: 약 <strong>515,520,000원</strong></span>
              <span className="block">• 총 이자: 약 <strong>215,520,000원</strong></span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 2: 3억원, 연 4%, 30년, 원금균등</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 첫 달: 약 <strong>1,833,000원</strong></span>
              <span className="block">• 마지막 달: 약 <strong>836,000원</strong></span>
              <span className="block">• 총 이자: 약 <strong>180,750,000원</strong> (원리금균등 대비 약 3,500만원 절감)</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <p className="font-medium text-gray-900 mb-2">예시 3: 2억원, 연 3.5%, 20년, 원리금균등</p>
            <p className="text-sm text-gray-700 space-y-1">
              <span className="block">• 월 상환액: 약 <strong>1,160,000원</strong></span>
              <span className="block">• 총 상환액: 약 <strong>278,400,000원</strong></span>
              <span className="block">• 총 이자: 약 <strong>78,400,000원</strong></span>
            </p>
          </div>
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
            <span><strong>원리금균등:</strong> 매월 동일 금액 상환, 예산 관리 편리</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>원금균등:</strong> 초기 부담 크지만 총 이자 적음, 장기적으로 유리</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>중도상환수수료:</strong> 3년 이내 중도상환 시 약 1.0~1.5% 수수료 부과</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>DSR 규제:</strong> 연소득의 40%까지만 대출 원리금 상환 가능</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span><strong>금리 변동:</strong> 고정금리는 만기까지 동일, 변동금리는 시장금리에 따라 변동</span>
          </li>
        </ul>
      </div>

      {/* 신청 안내 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 보금자리론 신청 방법
        </h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">신청 자격 확인</p>
              <p className="text-gray-600">소득, 주택가격, 주택 수 조건 확인해요</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">은행 상담</p>
              <p className="text-gray-600">취급 은행(국민, 우리, 농협, 신한, 하나 등) 방문 또는 전화 상담</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">서류 제출</p>
              <p className="text-gray-600">소득증빙, 재직증명서, 매매계약서, 등기부등본 등 제출</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <p className="font-medium">심사 및 승인</p>
              <p className="text-gray-600">1~2주 소요, 승인 후 담보설정 및 대출 실행</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="https://www.hf.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>주택금융공사 보금자리론 바로가기</span>
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
            • <a href="https://www.hf.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">주택금융공사 (2026년 기준)</a>
          </li>
          <li>
            • <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">금융위원회</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
