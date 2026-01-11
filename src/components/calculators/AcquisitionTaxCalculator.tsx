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

// 만원 단위로 변환
function toManwon(num: number): string {
  if (num >= 100000000) {
    const uk = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    return man > 0 ? `${uk}억 ${formatNumber(man)}만원` : `${uk}억원`;
  } else if (num >= 10000) {
    return `${formatNumber(num / 10000)}만원`;
  }
  return `${formatNumber(num)}원`;
}

// 부동산 유형
type PropertyType = "house" | "officetel" | "commercial" | "land";
type HouseCategory = "first" | "one" | "two" | "three";
type OfficetelUse = "residential" | "commercial";

// 2026년 취득세율 계산 함수들
function calculateHouseTax(
  price: number,
  area: number,
  category: HouseCategory,
  isRegulated: boolean
): {
  acquisitionRate: number;
  educationRate: number;
  ruralRate: number;
  description: string;
} {
  const is85orLess = area <= 85;

  if (category === "first") {
    if (price <= 150000000) {
      return {
        acquisitionRate: 0,
        educationRate: 0,
        ruralRate: 0,
        description: "생애최초 1.5억 이하 (취득세 면제)"
      };
    } else if (price <= 300000000) {
      return {
        acquisitionRate: 0.5,
        educationRate: 0.05,
        ruralRate: is85orLess ? 0 : 0.2,
        description: "생애최초 3억 이하 (50% 감면)"
      };
    }
  }

  if (category === "three") {
    return {
      acquisitionRate: 12,
      educationRate: 0.4,
      ruralRate: 1.0,
      description: "3주택 이상 (12% 중과)"
    };
  }

  if (category === "two" && isRegulated) {
    return {
      acquisitionRate: 8,
      educationRate: 0.4,
      ruralRate: 0.6,
      description: "조정대상지역 2주택 (8% 중과)"
    };
  }

  if (price <= 600000000) {
    return {
      acquisitionRate: 1,
      educationRate: 0.1,
      ruralRate: is85orLess ? 0 : 0.2,
      description: "6억 이하 (1%)"
    };
  } else if (price <= 900000000) {
    const rate = (price / 100000000) * (2 / 3) - 3;
    return {
      acquisitionRate: Math.min(Math.max(rate, 1), 3),
      educationRate: 0.1,
      ruralRate: is85orLess ? 0 : 0.2,
      description: `6~9억 구간 (${rate.toFixed(2)}%)`
    };
  } else {
    return {
      acquisitionRate: 3,
      educationRate: 0.3,
      ruralRate: is85orLess ? 0 : 0.2,
      description: "9억 초과 (3%)"
    };
  }
}

function calculateOfficetelTax(
  price: number,
  use: OfficetelUse,
  houseCount: number,
  isRegulated: boolean
): {
  acquisitionRate: number;
  educationRate: number;
  ruralRate: number;
  description: string;
} {
  if (use === "residential") {
    if (houseCount === 0) {
      if (price <= 600000000) {
        return {
          acquisitionRate: 1,
          educationRate: 0.1,
          ruralRate: 0.2,
          description: "주거용 오피스텔 1주택 (1%)"
        };
      } else if (price <= 900000000) {
        const rate = (price / 100000000) * (2 / 3) - 3;
        return {
          acquisitionRate: Math.min(Math.max(rate, 1), 3),
          educationRate: 0.1,
          ruralRate: 0.2,
          description: `주거용 오피스텔 6~9억 (${rate.toFixed(2)}%)`
        };
      } else {
        return {
          acquisitionRate: 3,
          educationRate: 0.3,
          ruralRate: 0.2,
          description: "주거용 오피스텔 9억 초과 (3%)"
        };
      }
    } else if (houseCount === 1) {
      if (isRegulated) {
        return {
          acquisitionRate: 8,
          educationRate: 0.4,
          ruralRate: 0.6,
          description: "주거용 오피스텔 조정지역 2주택 (8%)"
        };
      } else {
        return {
          acquisitionRate: 1,
          educationRate: 0.1,
          ruralRate: 0.2,
          description: "주거용 오피스텔 비조정 2주택 (1~3%)"
        };
      }
    } else {
      return {
        acquisitionRate: 12,
        educationRate: 0.4,
        ruralRate: 1.0,
        description: "주거용 오피스텔 3주택 이상 (12%)"
      };
    }
  }

  return {
    acquisitionRate: 4,
    educationRate: 0.4,
    ruralRate: 0.2,
    description: "업무용 오피스텔 (4%)"
  };
}

function calculateCommercialTax(): {
  acquisitionRate: number;
  educationRate: number;
  ruralRate: number;
  description: string;
} {
  return {
    acquisitionRate: 4,
    educationRate: 0.4,
    ruralRate: 0.2,
    description: "상가/건물 (4%)"
  };
}

function calculateLandTax(isAgricultural: boolean): {
  acquisitionRate: number;
  educationRate: number;
  ruralRate: number;
  description: string;
} {
  if (isAgricultural) {
    return {
      acquisitionRate: 3,
      educationRate: 0.2,
      ruralRate: 0.2,
      description: "농지 (3%)"
    };
  }
  return {
    acquisitionRate: 4,
    educationRate: 0.4,
    ruralRate: 0.2,
    description: "일반 토지 (4%)"
  };
}

export default function AcquisitionTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [price, setPrice] = useState(500000000);
  const [priceInput, setPriceInput] = useState("500,000,000");
  const [area, setArea] = useState(84);
  const [houseCategory, setHouseCategory] = useState<HouseCategory>("one");
  const [isRegulated, setIsRegulated] = useState(false);
  const [officetelUse, setOfficetelUse] = useState<OfficetelUse>("residential");
  const [existingHouseCount, setExistingHouseCount] = useState(0);
  const [isAgricultural, setIsAgricultural] = useState(false);

  const [result, setResult] = useState({
    acquisitionTax: 0,
    educationTax: 0,
    ruralTax: 0,
    totalTax: 0,
    acquisitionRate: 0,
    educationRate: 0,
    ruralRate: 0,
    totalRate: 0,
    description: ""
  });

  // 금액 빠른 입력
  const addAmount = (amount: number) => {
    const newPrice = price + amount;
    setPrice(newPrice);
    setPriceInput(formatNumber(newPrice));
  };

  const clearAmount = () => {
    setPrice(0);
    setPriceInput("0");
  };

  const handlePriceChange = (value: string) => {
    const numValue = parseInput(value);
    setPrice(numValue);
    setPriceInput(formatNumber(numValue));
  };

  const calculate = useCallback(() => {
    let taxInfo;

    switch (propertyType) {
      case "house":
        taxInfo = calculateHouseTax(price, area, houseCategory, isRegulated);
        break;
      case "officetel":
        taxInfo = calculateOfficetelTax(price, officetelUse, existingHouseCount, isRegulated);
        break;
      case "commercial":
        taxInfo = calculateCommercialTax();
        break;
      case "land":
        taxInfo = calculateLandTax(isAgricultural);
        break;
      default:
        taxInfo = { acquisitionRate: 0, educationRate: 0, ruralRate: 0, description: "" };
    }

    const acquisitionTax = price * (taxInfo.acquisitionRate / 100);
    const educationTax = price * (taxInfo.educationRate / 100);
    const ruralTax = price * (taxInfo.ruralRate / 100);
    const totalTax = acquisitionTax + educationTax + ruralTax;
    const totalRate = taxInfo.acquisitionRate + taxInfo.educationRate + taxInfo.ruralRate;

    setResult({
      acquisitionTax,
      educationTax,
      ruralTax,
      totalTax,
      acquisitionRate: taxInfo.acquisitionRate,
      educationRate: taxInfo.educationRate,
      ruralRate: taxInfo.ruralRate,
      totalRate,
      description: taxInfo.description
    });
  }, [propertyType, price, area, houseCategory, isRegulated, officetelUse, existingHouseCount, isAgricultural]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const propertyTypes = [
    { type: "house" as PropertyType, label: "주택" },
    { type: "officetel" as PropertyType, label: "오피스텔" },
    { type: "commercial" as PropertyType, label: "상가·건물" },
    { type: "land" as PropertyType, label: "토지" },
  ];

  const houseCategories = [
    { type: "first" as HouseCategory, label: "생애최초" },
    { type: "one" as HouseCategory, label: "1주택" },
    { type: "two" as HouseCategory, label: "2주택" },
    { type: "three" as HouseCategory, label: "3주택 이상" },
  ];

  // 빠른 금액 버튼
  const quickAmounts = [
    { label: "5억", value: 500000000 },
    { label: "1억", value: 100000000 },
    { label: "5천", value: 50000000 },
    { label: "1천", value: 10000000 },
    { label: "백만", value: 1000000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 헤더 - 아는자산 스타일 */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
          <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-900">취득세 계산기</h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex">
          {propertyTypes.map((item) => (
            <button
              key={item.type}
              onClick={() => setPropertyType(item.type)}
              className={`flex-1 py-2.5 text-sm font-medium transition-all border-b-2 ${
                propertyType === item.type
                  ? "border-blue-500 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 주택 구분 */}
        {propertyType === "house" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">주택구분</label>
            <div className="flex flex-wrap gap-1.5">
              {houseCategories.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setHouseCategory(item.type)}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    houseCategory === item.type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 오피스텔 용도 */}
        {propertyType === "officetel" && (
          <>
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm font-medium text-gray-700 shrink-0">용도</label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setOfficetelUse("residential")}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    officetelUse === "residential"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  주거용
                </button>
                <button
                  onClick={() => setOfficetelUse("commercial")}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    officetelUse === "commercial"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  업무용
                </button>
              </div>
            </div>

            {officetelUse === "residential" && (
              <div className="flex items-center gap-3">
                <label className="w-20 text-sm font-medium text-gray-700 shrink-0">보유주택</label>
                <select
                  value={existingHouseCount}
                  onChange={(e) => setExistingHouseCount(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value={0}>무주택</option>
                  <option value={1}>1주택</option>
                  <option value={2}>2주택 이상</option>
                </select>
              </div>
            )}
          </>
        )}

        {/* 토지 유형 */}
        {propertyType === "land" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">토지유형</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsAgricultural(false)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  !isAgricultural
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                일반토지
              </button>
              <button
                onClick={() => setIsAgricultural(true)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  isAgricultural
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                농지
              </button>
            </div>
          </div>
        )}

        {/* 조정대상지역 */}
        {(propertyType === "house" || (propertyType === "officetel" && officetelUse === "residential")) &&
         (houseCategory === "two" || (propertyType === "officetel" && existingHouseCount === 1)) && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">조정지역</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsRegulated(false)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  !isRegulated
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                비조정
              </button>
              <button
                onClick={() => setIsRegulated(true)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  isRegulated
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                조정대상
              </button>
            </div>
          </div>
        )}

        {/* 취득가액 */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">취득가액</label>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full px-3 py-2 pr-10 text-right text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 bg-blue-500 text-white px-2 py-0.5 rounded text-xs">원</span>
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
            <span className="text-sm text-blue-600 font-medium">{toManwon(price)}</span>
          </div>
        </div>

        {/* 전용면적 (주택만) */}
        {propertyType === "house" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">전용면적</label>
            <div className="flex items-center gap-2">
              <div className="relative w-24">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 pr-8 text-right text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white bg-blue-500 px-1.5 py-0.5 rounded">㎡</span>
              </div>
              <span className="text-sm text-gray-500">(약 {(area / 3.3058).toFixed(0)}평)</span>
              {area <= 85 && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  농특세 면제
                </span>
              )}
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setPrice(500000000);
              setPriceInput("500,000,000");
              setArea(84);
              setHouseCategory("one");
              setIsRegulated(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={calculate}
            className="px-6 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors font-medium"
          >
            계산하기
          </button>
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
          <h3 className="text-base font-semibold text-gray-900">계산 결과</h3>
        </div>

        <div className="p-4">
          {/* 적용 기준 */}
          <div className="mb-4 px-3 py-2 bg-blue-50 rounded text-sm">
            <span className="text-gray-600">적용 기준: </span>
            <span className="font-medium text-blue-700">{result.description}</span>
          </div>

          {/* 세금 내역 */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">취득세</span>
                <span className="text-xs text-gray-400">({result.acquisitionRate}%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.acquisitionTax)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">지방교육세</span>
                <span className="text-xs text-gray-400">({result.educationRate}%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.educationTax)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">농어촌특별세</span>
                <span className="text-xs text-gray-400">({result.ruralRate}%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.ruralTax)}원</span>
            </div>
          </div>

          {/* 총액 */}
          <div className="mt-4 p-4 bg-blue-500 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-blue-100 text-sm">총 납부세액</span>
                <span className="text-blue-200 text-xs ml-1">({result.totalRate.toFixed(2)}%)</span>
              </div>
              <span className="text-white text-xl font-bold">{formatNumber(result.totalTax)}원</span>
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
            <h4 className="font-medium text-gray-800 mb-1">취득세란?</h4>
            <p className="text-gray-600 leading-relaxed">
              부동산을 매매, 증여, 상속 등으로 취득할 때 내는 지방세예요. 취득일로부터 60일 이내에 신고·납부해야 하며, 기한을 넘기면 가산세가 붙어요.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">세금 구성</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>취득세</strong>: 부동산 취득가액에 따른 본세</li>
              <li>• <strong>지방교육세</strong>: 취득세의 부가세 (취득세액의 10%)</li>
              <li>• <strong>농어촌특별세</strong>: 전용 85㎡ 초과 주택에 부과</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">주의사항</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 생애최초 감면은 소득, 주택가액 등 추가 조건이 있어요</li>
              <li>• 조정대상지역은 정부 고시에 따라 변경될 수 있어요</li>
              <li>• 주거용 오피스텔은 주택 수에 포함돼요</li>
              <li>• 정확한 세액은 지자체에 문의하세요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 세율표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 취득세율표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">구분</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">취득세</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">지방교육세</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">농특세</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">합계</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">주택 6억 이하</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.1%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">1.1%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">주택 6~9억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1~3%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.1%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">1.1~3.1%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">주택 9억 초과</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">3%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.3%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.2%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">3.5%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-2 py-1.5 text-red-700">조정 2주택</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600 font-medium">8%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.6%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium text-red-600">9%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-2 py-1.5 text-red-700">3주택 이상</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center text-red-600 font-medium">12%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium text-red-600">13.4%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">오피스텔/상가</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.2%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">4.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">토지</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.2%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">4.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">농지</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">3%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.2%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.2%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center font-medium">3.4%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">※ 농어촌특별세: 전용면적 85㎡ 이하 주택은 비과세</p>
        </div>
      </div>
    </div>
  );
}
