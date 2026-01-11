"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷 (천 단위 콤마)
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// 억원 단위로 변환
function toUk(num: number): string {
  if (num >= 100000000) {
    const uk = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    return man > 0 ? `${uk}억 ${formatNumber(man)}만원` : `${uk}억원`;
  } else if (num >= 10000) {
    return `${formatNumber(num / 10000)}만원`;
  }
  return `${formatNumber(num)}원`;
}

type HouseCount = "oneHouse" | "twoHouse" | "threeHouse";

// 2026년 종합부동산세율 (일반)
function getBasicTaxRate(taxBase: number): { rate: number; deduction: number; bracket: string } {
  if (taxBase <= 300000000) {
    return { rate: 0.5, deduction: 0, bracket: "3억 이하" };
  } else if (taxBase <= 600000000) {
    return { rate: 0.7, deduction: 600000, bracket: "3~6억" };
  } else if (taxBase <= 1200000000) {
    return { rate: 1.0, deduction: 2400000, bracket: "6~12억" };
  } else if (taxBase <= 5000000000) {
    return { rate: 1.5, deduction: 8400000, bracket: "12~50억" };
  } else if (taxBase <= 9400000000) {
    return { rate: 2.0, deduction: 33400000, bracket: "50~94억" };
  } else {
    return { rate: 2.7, deduction: 99200000, bracket: "94억 초과" };
  }
}

// 2026년 종합부동산세율 (다주택자 중과)
function getSurtaxRate(taxBase: number): { rate: number; deduction: number; bracket: string } {
  if (taxBase <= 300000000) {
    return { rate: 1.2, deduction: 0, bracket: "3억 이하" };
  } else if (taxBase <= 600000000) {
    return { rate: 1.6, deduction: 1200000, bracket: "3~6억" };
  } else if (taxBase <= 1200000000) {
    return { rate: 2.2, deduction: 4800000, bracket: "6~12억" };
  } else if (taxBase <= 5000000000) {
    return { rate: 3.6, deduction: 21600000, bracket: "12~50억" };
  } else if (taxBase <= 9400000000) {
    return { rate: 5.0, deduction: 91600000, bracket: "50~94억" };
  } else {
    return { rate: 6.0, deduction: 185600000, bracket: "94억 초과" };
  }
}

// 세액공제 계산 (고령자, 장기보유)
function calculateDeduction(
  tax: number,
  age: number,
  holdingYears: number,
  isOneHouse: boolean
): { ageDeduction: number; holdingDeduction: number; totalDeduction: number; description: string } {
  if (!isOneHouse) {
    return { ageDeduction: 0, holdingDeduction: 0, totalDeduction: 0, description: "1세대 1주택만 세액공제 적용" };
  }

  // 고령자 공제
  let ageRate = 0;
  if (age >= 70) ageRate = 30;
  else if (age >= 65) ageRate = 20;
  else if (age >= 60) ageRate = 10;

  // 장기보유 공제
  let holdingRate = 0;
  if (holdingYears >= 15) holdingRate = 50;
  else if (holdingYears >= 10) holdingRate = 40;
  else if (holdingYears >= 5) holdingRate = 20;

  // 합산 최대 80%
  const totalRate = Math.min(ageRate + holdingRate, 80);
  const totalDeduction = Math.round(tax * (totalRate / 100));

  return {
    ageDeduction: Math.round(tax * (ageRate / 100)),
    holdingDeduction: Math.round(tax * (holdingRate / 100)),
    totalDeduction,
    description: `고령자 ${ageRate}% + 장기보유 ${holdingRate}% = ${totalRate}%`
  };
}

export default function ComprehensivePropertyTaxCalculator() {
  // 주택 수
  const [houseCount, setHouseCount] = useState<HouseCount>("oneHouse");
  const [isRegulated, setIsRegulated] = useState(false);

  // 공시가격
  const [publicPrice, setPublicPrice] = useState(1500000000);
  const [publicPriceInput, setPublicPriceInput] = useState("1,500,000,000");

  // 1세대 1주택 옵션
  const [age, setAge] = useState(55);
  const [holdingYears, setHoldingYears] = useState(5);

  const [result, setResult] = useState({
    totalPublicPrice: 0,
    deductionAmount: 0,
    fairMarketRatio: 60,
    taxBase: 0,
    basicTax: 0,
    taxRate: 0,
    rateDescription: "",
    ageDeduction: 0,
    holdingDeduction: 0,
    totalDeduction: 0,
    deductionDescription: "",
    propertyTax: 0,
    localTax: 0,
    totalTax: 0,
    isSurtax: false
  });

  // 금액 빠른 입력
  const addAmount = (amount: number) => {
    const newPrice = publicPrice + amount;
    setPublicPrice(newPrice);
    setPublicPriceInput(formatNumber(newPrice));
  };

  const clearAmount = () => {
    setPublicPrice(0);
    setPublicPriceInput("0");
  };

  const handlePriceChange = (value: string) => {
    const numValue = parseInput(value);
    setPublicPrice(numValue);
    setPublicPriceInput(formatNumber(numValue));
  };

  const calculate = useCallback(() => {
    // 1. 공제금액 결정
    let deductionAmount = 600000000; // 기본 6억
    if (houseCount === "oneHouse") {
      deductionAmount = 1200000000; // 1세대 1주택 12억
    }

    // 2. 공정시장가액비율 (2024년부터 60%)
    const fairMarketRatio = 60;

    // 3. 과세표준 계산
    const taxableValue = Math.max(publicPrice - deductionAmount, 0);
    const taxBase = Math.round(taxableValue * (fairMarketRatio / 100));

    if (taxBase <= 0) {
      setResult({
        totalPublicPrice: publicPrice,
        deductionAmount,
        fairMarketRatio,
        taxBase: 0,
        basicTax: 0,
        taxRate: 0,
        rateDescription: "과세표준 없음 (공제금액 미달)",
        ageDeduction: 0,
        holdingDeduction: 0,
        totalDeduction: 0,
        deductionDescription: "",
        propertyTax: 0,
        localTax: 0,
        totalTax: 0,
        isSurtax: false
      });
      return;
    }

    // 4. 세율 적용 (중과 여부)
    const isSurtax = (houseCount === "twoHouse" && isRegulated) || houseCount === "threeHouse";
    const rateInfo = isSurtax ? getSurtaxRate(taxBase) : getBasicTaxRate(taxBase);
    const basicTax = Math.round(taxBase * (rateInfo.rate / 100) - rateInfo.deduction);

    // 5. 세액공제 (1세대 1주택만)
    const deductionInfo = calculateDeduction(basicTax, age, holdingYears, houseCount === "oneHouse");

    // 6. 종부세 계산
    const propertyTax = Math.max(basicTax - deductionInfo.totalDeduction, 0);

    // 7. 농어촌특별세 (종부세의 20%)
    const localTax = Math.round(propertyTax * 0.2);

    // 8. 총 납부세액
    const totalTax = propertyTax + localTax;

    setResult({
      totalPublicPrice: publicPrice,
      deductionAmount,
      fairMarketRatio,
      taxBase,
      basicTax,
      taxRate: rateInfo.rate,
      rateDescription: rateInfo.bracket,
      ageDeduction: deductionInfo.ageDeduction,
      holdingDeduction: deductionInfo.holdingDeduction,
      totalDeduction: deductionInfo.totalDeduction,
      deductionDescription: deductionInfo.description,
      propertyTax,
      localTax,
      totalTax,
      isSurtax
    });
  }, [publicPrice, houseCount, isRegulated, age, holdingYears]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const houseCountOptions = [
    { type: "oneHouse" as HouseCount, label: "1주택", description: "1세대 1주택" },
    { type: "twoHouse" as HouseCount, label: "2주택", description: "" },
    { type: "threeHouse" as HouseCount, label: "3주택+", description: "3주택 이상" },
  ];

  // 빠른 금액 버튼
  const quickAmounts = [
    { label: "10억", value: 1000000000 },
    { label: "5억", value: 500000000 },
    { label: "1억", value: 100000000 },
    { label: "5천", value: 50000000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 헤더 */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-900">종합부동산세 계산기</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 주택 수 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">주택 수</label>
          <div className="grid grid-cols-3 gap-2">
            {houseCountOptions.map((item) => (
              <button
                key={item.type}
                onClick={() => setHouseCount(item.type)}
                className={`px-3 py-2 text-sm rounded transition-all text-center ${
                  houseCount === item.type
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className={`text-xs mt-0.5 ${
                    houseCount === item.type ? "text-emerald-100" : "text-gray-400"
                  }`}>
                    {item.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 조정대상지역 (2주택만) */}
        {houseCount === "twoHouse" && (
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-medium text-gray-700 shrink-0">조정대상지역</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsRegulated(false)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  !isRegulated
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                비조정
              </button>
              <button
                onClick={() => setIsRegulated(true)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  isRegulated
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                조정대상
              </button>
            </div>
          </div>
        )}

        {/* 공시가격 */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-medium text-gray-700 shrink-0">공시가격 합계</label>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={publicPriceInput}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full px-3 py-2 pr-10 text-right text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white bg-emerald-500 px-2 py-0.5 rounded">원</span>
              </div>
            </div>
          </div>

          {/* 빠른 금액 버튼 */}
          <div className="flex items-center gap-3">
            <div className="w-24 shrink-0"></div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => addAmount(1000000000)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
              >
                +
              </button>
              {quickAmounts.map((item) => (
                <button
                  key={item.label}
                  onClick={() => addAmount(item.value)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={clearAmount}
                className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors font-medium"
              >
                C
              </button>
            </div>
          </div>

          {/* 금액 표시 */}
          <div className="flex items-center gap-3">
            <div className="w-24 shrink-0"></div>
            <span className="text-sm text-emerald-600 font-medium">{toUk(publicPrice)}</span>
          </div>
        </div>

        {/* 1세대 1주택 세액공제 옵션 */}
        {houseCount === "oneHouse" && (
          <div className="p-3 bg-emerald-50 rounded-lg space-y-3">
            <p className="text-sm text-emerald-700 font-medium">1세대 1주택 세액공제</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">나이</label>
                <select
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                >
                  <option value={55}>60세 미만</option>
                  <option value={60}>60~65세</option>
                  <option value={65}>65~70세</option>
                  <option value={70}>70세 이상</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">보유기간</label>
                <select
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                >
                  <option value={3}>5년 미만</option>
                  <option value={5}>5~10년</option>
                  <option value={10}>10~15년</option>
                  <option value={15}>15년 이상</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-emerald-600">
              고령자 공제 (60세+ 10~30%) + 장기보유 공제 (5년+ 20~50%), 합산 최대 80%
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setPublicPrice(1500000000);
              setPublicPriceInput("1,500,000,000");
              setHouseCount("oneHouse");
              setIsRegulated(false);
              setAge(55);
              setHoldingYears(5);
            }}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={calculate}
            className="px-6 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 transition-colors font-medium"
          >
            계산하기
          </button>
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h3 className="text-base font-semibold text-gray-900">계산 결과</h3>
        </div>

        <div className="p-4">
          {/* 계산 과정 */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">공시가격 합계</span>
              <span className="font-medium text-gray-800">{formatNumber(result.totalPublicPrice)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
              <div className="flex items-center gap-2">
                <span>공제금액</span>
                <span className="text-xs text-green-500">
                  ({houseCount === "oneHouse" ? "1세대 1주택 12억" : "기본 6억"})
                </span>
              </div>
              <span className="font-medium">-{formatNumber(result.deductionAmount)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">공정시장가액비율</span>
                <span className="text-xs text-gray-400">({result.fairMarketRatio}%)</span>
              </div>
              <span className="font-medium text-gray-800">×{result.fairMarketRatio}%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200 bg-gray-100 px-2 -mx-2">
              <span className="text-gray-700 font-medium">과세표준</span>
              <span className="font-bold text-gray-800">{formatNumber(result.taxBase)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">적용세율</span>
                <span className="text-xs text-gray-400">({result.rateDescription})</span>
              </div>
              <span className={`font-medium ${result.isSurtax ? "text-red-600" : "text-gray-800"}`}>
                {result.taxRate}%
                {result.isSurtax && <span className="text-xs ml-1">(중과)</span>}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">산출세액</span>
              <span className="font-medium text-gray-800">{formatNumber(result.basicTax)}원</span>
            </div>

            {result.totalDeduction > 0 && (
              <>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
                  <div className="flex items-center gap-2">
                    <span>세액공제</span>
                    <span className="text-xs text-green-500">({result.deductionDescription})</span>
                  </div>
                  <span className="font-medium">-{formatNumber(result.totalDeduction)}원</span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">종합부동산세</span>
              <span className="font-medium text-gray-800">{formatNumber(result.propertyTax)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">농어촌특별세</span>
                <span className="text-xs text-gray-400">(종부세의 20%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.localTax)}원</span>
            </div>
          </div>

          {/* 총액 */}
          <div className="p-4 bg-emerald-500 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-emerald-100 text-sm">총 납부세액</span>
              </div>
              <span className="text-white text-xl font-bold">{formatNumber(result.totalTax)}원</span>
            </div>
            <div className="text-emerald-100 text-xs mt-1">
              종부세 {formatNumber(result.propertyTax)}원 + 농특세 {formatNumber(result.localTax)}원
            </div>
          </div>
        </div>
      </div>

      {/* 이용안내 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">이용안내</h3>
        </div>

        <div className="p-4 text-sm text-gray-600 space-y-3">
          <div>
            <h4 className="font-medium text-gray-800 mb-1">종합부동산세란?</h4>
            <p className="text-gray-600 leading-relaxed">
              일정 기준을 초과하는 부동산 보유자에게 부과하는 국세예요. 매년 6월 1일 기준으로 재산세와 별도로 부과돼요.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">공제금액</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>1세대 1주택</strong>: 공시가격 12억원 공제</li>
              <li>• <strong>일반</strong>: 공시가격 6억원 공제</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">세액공제 (1세대 1주택)</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 고령자: 60세 10%, 65세 20%, 70세 30%</li>
              <li>• 장기보유: 5년 20%, 10년 40%, 15년 50%</li>
              <li>• 합산 최대 80%까지 공제</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">납부 시기</h4>
            <p className="text-gray-600 leading-relaxed">
              매년 12월 1일~15일 사이에 납부해요. 250만원 초과 시 분납 가능해요.
            </p>
          </div>
        </div>
      </div>

      {/* 세율표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 종합부동산세율표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">일반세율</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">중과세율</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">3억 이하</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.5%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">1.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">3~6억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.7%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">1.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">6~12억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1.0%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">2.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">12~50억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1.5%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">3.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">50~94억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">2.0%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">5.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">94억 초과</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">2.7%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600">6.0%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">※ 중과: 조정대상지역 2주택, 3주택 이상</p>
          <p className="text-xs text-gray-500">※ 공정시장가액비율: 60% (2024년~)</p>
        </div>
      </div>

      {/* 공시가격별 종부세액표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 1세대 1주택 공시가격별 종부세액표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <p className="text-xs text-gray-600 mb-3">※ 1세대 1주택 기준 (12억 공제, 세액공제 미적용)</p>
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">공시가격</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">세율</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">종부세+농특세</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">12억원 이하</td>
                <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-green-600 font-medium">0원 (비과세)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">15억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">0.5%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 108만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">20억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">4.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">0.7%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 331만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">25억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">7.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.0%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 648만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">30억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">10.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.0%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 1,008만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">50억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">22.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.5%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 3,110만원</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">* 공정시장가액비율 60% 적용, 총 세액 = 종부세 + 농어촌특별세(20%)</p>
          <p className="text-xs text-gray-500">* 고령자·장기보유 세액공제 적용 시 최대 80% 감면 가능</p>
        </div>
      </div>
    </div>
  );
}
