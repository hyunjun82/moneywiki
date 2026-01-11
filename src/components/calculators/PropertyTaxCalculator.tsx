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

type PropertyType = "house" | "building" | "land";
type LandType = "general" | "separate" | "split";

// 2026년 재산세율 (주택)
function getHouseTaxRate(taxBase: number): { rate: number; deduction: number; bracket: string } {
  if (taxBase <= 60000000) {
    return { rate: 0.1, deduction: 0, bracket: "6천만원 이하" };
  } else if (taxBase <= 150000000) {
    return { rate: 0.15, deduction: 30000, bracket: "6천만원~1.5억" };
  } else if (taxBase <= 300000000) {
    return { rate: 0.25, deduction: 180000, bracket: "1.5억~3억" };
  } else {
    return { rate: 0.4, deduction: 630000, bracket: "3억 초과" };
  }
}

// 2026년 재산세율 (건물)
function getBuildingTaxRate(isLuxury: boolean): { rate: number; description: string } {
  if (isLuxury) {
    return { rate: 4.0, description: "골프장/고급오락장/고급주택" };
  }
  return { rate: 0.25, description: "일반 건물" };
}

// 2026년 재산세율 (토지)
function getLandTaxRate(landType: LandType, taxBase: number): { rate: number; deduction: number; bracket: string } {
  if (landType === "general") {
    // 종합합산
    if (taxBase <= 50000000) {
      return { rate: 0.2, deduction: 0, bracket: "종합합산 5천만원 이하" };
    } else if (taxBase <= 100000000) {
      return { rate: 0.3, deduction: 50000, bracket: "종합합산 5천만원~1억" };
    } else {
      return { rate: 0.5, deduction: 250000, bracket: "종합합산 1억 초과" };
    }
  } else if (landType === "separate") {
    // 별도합산
    if (taxBase <= 200000000) {
      return { rate: 0.2, deduction: 0, bracket: "별도합산 2억 이하" };
    } else if (taxBase <= 1000000000) {
      return { rate: 0.3, deduction: 200000, bracket: "별도합산 2억~10억" };
    } else {
      return { rate: 0.4, deduction: 1200000, bracket: "별도합산 10억 초과" };
    }
  } else {
    // 분리과세 (농지, 임야 등)
    return { rate: 0.07, deduction: 0, bracket: "분리과세" };
  }
}

export default function PropertyTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("house");

  // 공시가격
  const [publicPrice, setPublicPrice] = useState(500000000);
  const [publicPriceInput, setPublicPriceInput] = useState("500,000,000");

  // 건물 옵션
  const [isLuxury, setIsLuxury] = useState(false);

  // 토지 옵션
  const [landType, setLandType] = useState<LandType>("general");

  const [result, setResult] = useState({
    publicPrice: 0,
    fairMarketRatio: 60,
    taxBase: 0,
    propertyTax: 0,
    taxRate: 0,
    rateDescription: "",
    localEducationTax: 0,
    cityPlanningTax: 0,
    totalTax: 0,
    julyTax: 0,
    septemberTax: 0
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
    // 1. 공정시장가액비율 (60%)
    const fairMarketRatio = 60;
    const taxBase = Math.round(publicPrice * (fairMarketRatio / 100));

    if (taxBase <= 0) {
      setResult({
        publicPrice,
        fairMarketRatio,
        taxBase: 0,
        propertyTax: 0,
        taxRate: 0,
        rateDescription: "과세표준 없음",
        localEducationTax: 0,
        cityPlanningTax: 0,
        totalTax: 0,
        julyTax: 0,
        septemberTax: 0
      });
      return;
    }

    let propertyTax = 0;
    let taxRate = 0;
    let rateDescription = "";
    let localEducationTax = 0;
    let cityPlanningTax = 0;

    if (propertyType === "house") {
      const rateInfo = getHouseTaxRate(taxBase);
      propertyTax = Math.round(taxBase * (rateInfo.rate / 100) - rateInfo.deduction);
      taxRate = rateInfo.rate;
      rateDescription = rateInfo.bracket;

      // 지방교육세: 재산세의 20%
      localEducationTax = Math.round(propertyTax * 0.2);

      // 도시지역분(구 도시계획세): 과세표준의 0.14% (주택)
      cityPlanningTax = Math.round(taxBase * 0.0014);

    } else if (propertyType === "building") {
      const rateInfo = getBuildingTaxRate(isLuxury);
      propertyTax = Math.round(taxBase * (rateInfo.rate / 100));
      taxRate = rateInfo.rate;
      rateDescription = rateInfo.description;

      // 지방교육세: 재산세의 20%
      localEducationTax = Math.round(propertyTax * 0.2);

      // 도시지역분: 과세표준의 0.14%
      cityPlanningTax = Math.round(taxBase * 0.0014);

    } else {
      const rateInfo = getLandTaxRate(landType, taxBase);
      propertyTax = Math.round(taxBase * (rateInfo.rate / 100) - rateInfo.deduction);
      taxRate = rateInfo.rate;
      rateDescription = rateInfo.bracket;

      // 지방교육세: 재산세의 20%
      localEducationTax = Math.round(propertyTax * 0.2);

      // 도시지역분: 토지는 0.14%
      cityPlanningTax = Math.round(taxBase * 0.0014);
    }

    propertyTax = Math.max(propertyTax, 0);
    const totalTax = propertyTax + localEducationTax + cityPlanningTax;

    // 주택의 경우 7월/9월 분납
    let julyTax = totalTax;
    let septemberTax = 0;

    if (propertyType === "house" && totalTax > 200000) {
      // 20만원 초과 시 7월/9월 분할 납부
      julyTax = Math.round(totalTax / 2);
      septemberTax = totalTax - julyTax;
    }

    setResult({
      publicPrice,
      fairMarketRatio,
      taxBase,
      propertyTax,
      taxRate,
      rateDescription,
      localEducationTax,
      cityPlanningTax,
      totalTax,
      julyTax,
      septemberTax
    });
  }, [publicPrice, propertyType, isLuxury, landType]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const propertyTypes = [
    { type: "house" as PropertyType, label: "주택" },
    { type: "building" as PropertyType, label: "건물" },
    { type: "land" as PropertyType, label: "토지" },
  ];

  // 빠른 금액 버튼
  const quickAmounts = [
    { label: "5억", value: 500000000 },
    { label: "1억", value: 100000000 },
    { label: "5천", value: 50000000 },
    { label: "1천", value: 10000000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 헤더 */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-900">재산세 계산기</h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex">
          {propertyTypes.map((item) => (
            <button
              key={item.type}
              onClick={() => setPropertyType(item.type)}
              className={`flex-1 py-2.5 text-sm font-medium transition-all border-b-2 ${
                propertyType === item.type
                  ? "border-emerald-500 text-emerald-600 bg-emerald-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 건물 옵션 */}
        {propertyType === "building" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">건물유형</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsLuxury(false)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  !isLuxury
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                일반건물
              </button>
              <button
                onClick={() => setIsLuxury(true)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  isLuxury
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                고급건물
              </button>
            </div>
          </div>
        )}

        {/* 토지 옵션 */}
        {propertyType === "land" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">토지유형</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setLandType("general")}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  landType === "general"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                종합합산
              </button>
              <button
                onClick={() => setLandType("separate")}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  landType === "separate"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                별도합산
              </button>
              <button
                onClick={() => setLandType("split")}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  landType === "split"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                분리과세
              </button>
            </div>
          </div>
        )}

        {/* 공시가격 */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">공시가격</label>
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
            <div className="w-20 shrink-0"></div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => addAmount(100000000)}
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
            <div className="w-20 shrink-0"></div>
            <span className="text-sm text-emerald-600 font-medium">{toUk(publicPrice)}</span>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setPublicPrice(500000000);
              setPublicPriceInput("500,000,000");
              setPropertyType("house");
              setIsLuxury(false);
              setLandType("general");
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
              <span className="text-gray-600">공시가격</span>
              <span className="font-medium text-gray-800">{formatNumber(result.publicPrice)}원</span>
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
              <span className="font-medium text-gray-800">{result.taxRate}%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">재산세</span>
              <span className="font-medium text-gray-800">{formatNumber(result.propertyTax)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">지방교육세</span>
                <span className="text-xs text-gray-400">(재산세의 20%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.localEducationTax)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">도시지역분</span>
                <span className="text-xs text-gray-400">(과세표준의 0.14%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.cityPlanningTax)}원</span>
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
            {propertyType === "house" && result.septemberTax > 0 && (
              <div className="text-emerald-100 text-xs mt-2 pt-2 border-t border-emerald-400">
                <div className="flex justify-between">
                  <span>7월 납부</span>
                  <span>{formatNumber(result.julyTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span>9월 납부</span>
                  <span>{formatNumber(result.septemberTax)}원</span>
                </div>
              </div>
            )}
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
            <h4 className="font-medium text-gray-800 mb-1">재산세란?</h4>
            <p className="text-gray-600 leading-relaxed">
              부동산을 보유한 사람에게 매년 부과하는 지방세예요. 매년 6월 1일 기준으로 부과되며, 주택은 7월과 9월에 나눠서 납부해요.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">납부 시기</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>주택</strong>: 7월(1/2), 9월(1/2) 분납 (20만원 이하는 7월 일시납)</li>
              <li>• <strong>건물</strong>: 7월 일시납</li>
              <li>• <strong>토지</strong>: 9월 일시납</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">세금 구성</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>재산세</strong>: 본세</li>
              <li>• <strong>지방교육세</strong>: 재산세의 20%</li>
              <li>• <strong>도시지역분</strong>: 과세표준의 0.14%</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">공시가격 확인</h4>
            <p className="text-gray-600 leading-relaxed">
              부동산공시가격 알리미(realtyprice.kr)에서 확인할 수 있어요. 아파트는 공동주택 공시가격, 단독주택은 개별주택가격을 확인하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 세율표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 재산세율표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">주택</p>
          <table className="w-full text-xs border-collapse min-w-[300px] mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">세율</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">6천만원 이하</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.1%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">6천만원~1.5억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.15%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">1.5억~3억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.25%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">3억 초과</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs text-gray-500">※ 공정시장가액비율: 60%</p>
          <p className="text-xs text-gray-500">※ 지방교육세(20%) + 도시지역분(0.14%) 별도</p>
        </div>
      </div>

      {/* 공시가격별 재산세액표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 주택 공시가격별 재산세액표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">공시가격</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">재산세</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">총 세액</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">1억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6천만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 15만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">2억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.2억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">15만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 35만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">3억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1.8억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">30만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 61만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">5억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">3억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">60만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 114만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">7억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">4.2억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">108만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 188만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">10억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">180만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 300만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">15억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">9억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">300만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 486만원</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">* 공정시장가액비율 60% 적용, 총 세액 = 재산세 + 지방교육세(20%) + 도시지역분(0.14%)</p>
          <p className="text-xs text-gray-500">* 주택분 재산세는 7월(1/2)·9월(1/2) 분납</p>
        </div>
      </div>
    </div>
  );
}
