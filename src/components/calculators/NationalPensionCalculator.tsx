"use client";

import { useState, useEffect } from "react";

type PensionType = "old-age" | "early" | "delayed";

export default function NationalPensionCalculator() {
  // 입력값
  const [avgMonthlyIncome, setAvgMonthlyIncome] = useState<number>(3000000); // 평균소득월액
  const [contributionYears, setContributionYears] = useState<number>(20); // 가입기간(년)
  const [birthYear, setBirthYear] = useState<number>(1970); // 출생년도
  const [pensionType, setPensionType] = useState<PensionType>("old-age"); // 연금 유형

  // 결과값
  const [monthlyPension, setMonthlyPension] = useState<number>(0);
  const [startAge, setStartAge] = useState<number>(65);
  const [totalContribution, setTotalContribution] = useState<number>(0);
  const [expectedTotal20Years, setExpectedTotal20Years] = useState<number>(0);

  // 2026년 기준 A값 (전체 가입자 평균소득월액 3년 평균)
  const A_VALUE = 3089062; // 2025년 기준 309만원 (국민연금공단 공식)

  // 수급개시연령 계산 (출생년도 기준)
  const getStartAge = (year: number): number => {
    if (year <= 1952) return 60;
    if (year <= 1956) return 61;
    if (year <= 1960) return 62;
    if (year <= 1964) return 63;
    if (year <= 1968) return 64;
    return 65; // 1969년 이후
  };

  // 조기연금 감액률 (1년당 6%)
  const getEarlyReductionRate = (yearsEarly: number): number => {
    return 1 - (yearsEarly * 0.06);
  };

  // 연기연금 증액률 (1년당 7.2%)
  const getDelayedIncreaseRate = (yearsDelayed: number): number => {
    return 1 + (yearsDelayed * 0.072);
  };

  // 기본연금액 계산 (국민연금공단 공식 기반)
  // 20년 가입 시 (A+B)×소득대체율 = 약 107만원 기준
  // 20년 초과 시 1년당 5%씩 추가 증가
  const calculateBasicPension = (avgIncome: number, years: number): number => {
    const B = Math.min(avgIncome, 6370000); // 기준소득월액 상한 637만원 (2025.7~2026.6)
    const baseAmount = (A_VALUE + B) * 0.179; // 20년 기준 월 연금액

    if (years < 10) {
      // 10년 미만: 반환일시금 (연금 수급 불가)
      return 0;
    }

    if (years <= 20) {
      // 10~20년: 1년당 5%씩 증가 (10년=50%, 20년=100%)
      const rate = 0.5 + (years - 10) * 0.05;
      return Math.round(baseAmount * rate);
    } else {
      // 20년 초과: 매년 5%씩 추가 증가 (30년=150%, 40년=200%)
      const extraYears = years - 20;
      const extraRate = 1 + (extraYears * 0.05);
      return Math.round(baseAmount * extraRate);
    }
  };

  useEffect(() => {
    const baseAge = getStartAge(birthYear);
    let adjustedAge = baseAge;
    let pension = calculateBasicPension(avgMonthlyIncome, contributionYears);

    // 연금 유형에 따른 조정
    if (pensionType === "early") {
      // 조기연금: 최대 5년 앞당겨 수령 (감액)
      adjustedAge = baseAge - 5;
      pension = Math.round(pension * getEarlyReductionRate(5));
    } else if (pensionType === "delayed") {
      // 연기연금: 최대 5년 늦춰 수령 (증액)
      adjustedAge = baseAge + 5;
      pension = Math.round(pension * getDelayedIncreaseRate(5));
    }

    setStartAge(adjustedAge);
    setMonthlyPension(pension);

    // 총 납부액 계산 (본인부담 4.5%, 2024년 기준)
    const total = avgMonthlyIncome * 0.045 * contributionYears * 12;
    setTotalContribution(total);

    // 20년간 예상 수령 총액
    setExpectedTotal20Years(pension * 12 * 20);
  }, [avgMonthlyIncome, contributionYears, birthYear, pensionType]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const formatManWon = (num: number): string => {
    if (num >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const man = Math.floor((num % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${formatNumber(man)}만원` : `${eok}억원`;
    }
    return `${formatNumber(Math.round(num / 10000))}만원`;
  };

  // 손익분기점 계산 (몇 년 받아야 본전)
  const breakEvenYears = totalContribution > 0 && monthlyPension > 0
    ? Math.ceil(totalContribution / (monthlyPension * 12))
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">국민연금 수령액 계산기</h2>
        <p className="text-emerald-100 text-sm mt-1">2026년 기준</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 연금 유형 선택 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            연금 유형
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPensionType("old-age")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                pensionType === "old-age"
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              노령연금
            </button>
            <button
              onClick={() => setPensionType("early")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                pensionType === "early"
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              조기연금
            </button>
            <button
              onClick={() => setPensionType("delayed")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                pensionType === "delayed"
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              연기연금
            </button>
          </div>
          <p className="text-xs text-neutral-500">
            {pensionType === "old-age" && "정상 수급개시연령에 받는 연금"}
            {pensionType === "early" && "최대 5년 앞당겨 수령 (연 6% 감액)"}
            {pensionType === "delayed" && "최대 5년 늦춰 수령 (연 7.2% 증액)"}
          </p>
        </div>

        {/* 출생년도 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            출생년도
          </label>
          <div className="relative">
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-emerald-500 appearance-none bg-white"
            >
              {Array.from({ length: 50 }, (_, i) => 1955 + i).map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
              ▼
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            수급개시연령: {getStartAge(birthYear)}세
          </p>
        </div>

        {/* 평균소득월액 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            평균 월 소득 (세전)
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatNumber(avgMonthlyIncome)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setAvgMonthlyIncome(Number(value) || 0);
              }}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-emerald-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[2000000, 3000000, 4000000, 5000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setAvgMonthlyIncome(amount)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  avgMonthlyIncome === amount
                    ? "bg-teal-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {amount / 10000}만원
              </button>
            ))}
          </div>
        </div>

        {/* 가입기간 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            예상 가입기간
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="10"
              max="40"
              value={contributionYears}
              onChange={(e) => setContributionYears(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="w-20 text-center">
              <span className="text-lg font-bold text-emerald-600">{contributionYears}</span>
              <span className="text-sm text-neutral-500">년</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500">
            <span>10년 (최소)</span>
            <span>40년 (최대)</span>
          </div>
        </div>

        {/* 결과 영역 */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">예상 월 수령액</p>
            <p className="text-4xl font-bold text-emerald-600">
              {formatNumber(monthlyPension)}
              <span className="text-xl font-normal text-neutral-500">원</span>
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              {startAge}세부터 수령
            </p>
          </div>

          <div className="border-t border-teal-200 pt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">연간 수령액</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatManWon(monthlyPension * 12)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">20년 수령 시</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatManWon(expectedTotal20Years)}
              </p>
            </div>
          </div>

          <div className="border-t border-teal-200 pt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">예상 총 납부액</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatManWon(totalContribution)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">손익분기점</p>
              <p className="text-lg font-semibold text-neutral-700">
                {breakEvenYears}년
              </p>
            </div>
          </div>
        </div>

        {/* 연금 유형별 비교 */}
        <div className="bg-neutral-50 rounded-xl p-4">
          <h3 className="font-semibold text-neutral-700 mb-3">연금 유형별 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-2 text-left font-medium text-neutral-600">유형</th>
                  <th className="py-2 text-right font-medium text-neutral-600">수령시기</th>
                  <th className="py-2 text-right font-medium text-neutral-600">월 수령액</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b border-neutral-100 ${pensionType === "early" ? "bg-teal-50" : ""}`}>
                  <td className="py-2 text-neutral-700">조기연금</td>
                  <td className="py-2 text-right text-neutral-600">{getStartAge(birthYear) - 5}세</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    {formatNumber(Math.round(calculateBasicPension(avgMonthlyIncome, contributionYears) * getEarlyReductionRate(5)))}원
                  </td>
                </tr>
                <tr className={`border-b border-neutral-100 ${pensionType === "old-age" ? "bg-teal-50" : ""}`}>
                  <td className="py-2 text-neutral-700">노령연금</td>
                  <td className="py-2 text-right text-neutral-600">{getStartAge(birthYear)}세</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    {formatNumber(calculateBasicPension(avgMonthlyIncome, contributionYears))}원
                  </td>
                </tr>
                <tr className={pensionType === "delayed" ? "bg-teal-50" : ""}>
                  <td className="py-2 text-neutral-700">연기연금</td>
                  <td className="py-2 text-right text-neutral-600">{getStartAge(birthYear) + 5}세</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    {formatNumber(Math.round(calculateBasicPension(avgMonthlyIncome, contributionYears) * getDelayedIncreaseRate(5)))}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 안내 */}
        <div className="text-xs text-neutral-500 space-y-1">
          <p>※ 실제 연금액은 가입이력, 소득 변동 등에 따라 달라질 수 있어요.</p>
          <p>※ 국민연금공단에서 정확한 예상연금 조회가 가능해요.</p>
          <p>※ 2026년 기준 A값(전체가입자 평균소득월액 3년평균): {formatNumber(A_VALUE)}원</p>
        </div>

        {/* 가입기간별 연금액표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 가입기간별 예상 월 연금액 (노령연금)</h4>
          <p className="text-xs text-neutral-500 text-center mb-3">월 소득 300만원 기준, 2026년 A값 적용</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">가입기간</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">지급률</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월 연금액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">연간 총액</th>
                  <th className="py-2 px-2 text-center text-neutral-600 font-medium border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">10년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">50%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 53만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 636만</td>
                  <td className="py-2 px-2 text-center text-neutral-600 text-xs border border-gray-300 hidden md:table-cell">최소 가입</td>
                </tr>
                <tr className="bg-green-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-green-700 border border-gray-300">15년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">75%</td>
                  <td className="py-2 px-2 text-center border border-gray-300">약 80만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 960만</td>
                  <td className="py-2 px-2 text-center text-green-600 text-xs border border-gray-300 hidden md:table-cell">기초생활 가능</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-emerald-700 border border-gray-300">20년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">100%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">약 107만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 1,284만</td>
                  <td className="py-2 px-2 text-center text-emerald-600 text-xs border border-gray-300 hidden md:table-cell">100만원 돌파!</td>
                </tr>
                <tr className="bg-blue-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-blue-700 border border-gray-300">30년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">150%</td>
                  <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">약 161만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">약 1,932만</td>
                  <td className="py-2 px-2 text-center text-blue-600 text-xs border border-gray-300 hidden md:table-cell">1.5배 증가!</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 px-2 text-center font-medium text-purple-700 border border-gray-300">40년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">200%</td>
                  <td className="py-2 px-2 text-center font-bold text-purple-600 border border-gray-300">약 214만</td>
                  <td className="py-2 px-2 text-center font-bold text-purple-600 border border-gray-300 hidden sm:table-cell">약 2,568만</td>
                  <td className="py-2 px-2 text-center text-purple-600 text-xs border border-gray-300 hidden md:table-cell">2배 달성!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 20년 가입하면 100% 지급률 달성!</li>
              <li>• 20년 초과 시 매년 5%씩 추가 증가 (30년=150%, 40년=200%)</li>
              <li>• 연기연금 선택 시 연 7.2% 증액 (5년 최대 36%)</li>
              <li>• 소득이 높을수록 월 연금액도 증가해요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
