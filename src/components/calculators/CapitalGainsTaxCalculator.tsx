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
type PropertyType = "house" | "land" | "officetel" | "commercial" | "presale";
type HouseCategory = "oneHouseExempt" | "oneHouseTaxable" | "twoHouse" | "threeHouse";
type OfficetelCategory = "residential" | "commercial";

// 2026년 양도소득세 기본세율 (누진세)
function getBaseTaxRate(taxableIncome: number): { rate: number; deduction: number; bracket: string } {
  if (taxableIncome <= 14000000) {
    return { rate: 6, deduction: 0, bracket: "1,400만원 이하" };
  } else if (taxableIncome <= 50000000) {
    return { rate: 15, deduction: 1260000, bracket: "1,400~5,000만원" };
  } else if (taxableIncome <= 88000000) {
    return { rate: 24, deduction: 5760000, bracket: "5,000~8,800만원" };
  } else if (taxableIncome <= 150000000) {
    return { rate: 35, deduction: 15440000, bracket: "8,800만원~1.5억" };
  } else if (taxableIncome <= 300000000) {
    return { rate: 38, deduction: 19940000, bracket: "1.5~3억" };
  } else if (taxableIncome <= 500000000) {
    return { rate: 40, deduction: 25940000, bracket: "3~5억" };
  } else if (taxableIncome <= 1000000000) {
    return { rate: 42, deduction: 35940000, bracket: "5~10억" };
  } else {
    return { rate: 45, deduction: 65940000, bracket: "10억 초과" };
  }
}

// 단기보유 세율 (오피스텔, 분양권)
function getShortTermRate(
  holdingYears: number,
  propertyType: PropertyType,
  category?: OfficetelCategory
): { rate: number; description: string } {
  // 분양권 (지역 구분 없이 일괄 적용 - 국세청 기준)
  if (propertyType === "presale") {
    if (holdingYears < 1) {
      return { rate: 70, description: "분양권 1년 미만" };
    } else if (holdingYears < 2) {
      return { rate: 60, description: "분양권 1~2년" };
    } else {
      return { rate: 60, description: "분양권 2년 이상" };
    }
  }

  // 오피스텔 (업무용)
  if (propertyType === "officetel" && category === "commercial") {
    if (holdingYears < 1) {
      return { rate: 50, description: "업무용 오피스텔 1년 미만" };
    } else if (holdingYears < 2) {
      return { rate: 40, description: "업무용 오피스텔 1~2년" };
    }
  }

  return { rate: 0, description: "" };
}

// 장기보유특별공제율 계산
function getLongTermDeductionRate(
  holdingYears: number,
  residenceYears: number,
  isOneHouseExempt: boolean
): { holdingRate: number; residenceRate: number; totalRate: number; description: string } {
  if (isOneHouseExempt) {
    // 1세대 1주택 고가주택: 보유 + 거주 최대 80%
    let holdingRate = 0;
    let residenceRate = 0;

    // 보유기간 공제율 (1세대 1주택)
    if (holdingYears >= 3 && holdingYears < 4) holdingRate = 12;
    else if (holdingYears >= 4 && holdingYears < 5) holdingRate = 16;
    else if (holdingYears >= 5 && holdingYears < 6) holdingRate = 20;
    else if (holdingYears >= 6 && holdingYears < 7) holdingRate = 24;
    else if (holdingYears >= 7 && holdingYears < 8) holdingRate = 28;
    else if (holdingYears >= 8 && holdingYears < 9) holdingRate = 32;
    else if (holdingYears >= 9 && holdingYears < 10) holdingRate = 36;
    else if (holdingYears >= 10) holdingRate = 40;

    // 거주기간 공제율
    if (residenceYears >= 2 && residenceYears < 3) residenceRate = 8;
    else if (residenceYears >= 3 && residenceYears < 4) residenceRate = 12;
    else if (residenceYears >= 4 && residenceYears < 5) residenceRate = 16;
    else if (residenceYears >= 5 && residenceYears < 6) residenceRate = 20;
    else if (residenceYears >= 6 && residenceYears < 7) residenceRate = 24;
    else if (residenceYears >= 7 && residenceYears < 8) residenceRate = 28;
    else if (residenceYears >= 8 && residenceYears < 9) residenceRate = 32;
    else if (residenceYears >= 9 && residenceYears < 10) residenceRate = 36;
    else if (residenceYears >= 10) residenceRate = 40;

    const totalRate = Math.min(holdingRate + residenceRate, 80);
    return {
      holdingRate,
      residenceRate,
      totalRate,
      description: `1세대1주택 (보유 ${holdingRate}% + 거주 ${residenceRate}%)`
    };
  } else {
    // 일반 장기보유특별공제 (보유기간만, 최대 30%)
    let holdingRate = 0;

    if (holdingYears >= 3 && holdingYears < 4) holdingRate = 6;
    else if (holdingYears >= 4 && holdingYears < 5) holdingRate = 8;
    else if (holdingYears >= 5 && holdingYears < 6) holdingRate = 10;
    else if (holdingYears >= 6 && holdingYears < 7) holdingRate = 12;
    else if (holdingYears >= 7 && holdingYears < 8) holdingRate = 14;
    else if (holdingYears >= 8 && holdingYears < 9) holdingRate = 16;
    else if (holdingYears >= 9 && holdingYears < 10) holdingRate = 18;
    else if (holdingYears >= 10 && holdingYears < 11) holdingRate = 20;
    else if (holdingYears >= 11 && holdingYears < 12) holdingRate = 22;
    else if (holdingYears >= 12 && holdingYears < 13) holdingRate = 24;
    else if (holdingYears >= 13 && holdingYears < 14) holdingRate = 26;
    else if (holdingYears >= 14 && holdingYears < 15) holdingRate = 28;
    else if (holdingYears >= 15) holdingRate = 30;

    return {
      holdingRate,
      residenceRate: 0,
      totalRate: holdingRate,
      description: `일반 (보유 ${holdingRate}%)`
    };
  }
}

// 중과세율 계산
function getSurtaxRate(
  category: HouseCategory,
  isRegulated: boolean,
  propertyType: PropertyType,
  isNonBusiness: boolean
): { additionalRate: number; description: string } {
  if (propertyType === "land" && isNonBusiness) {
    return { additionalRate: 10, description: "비사업용 토지 +10%p" };
  }

  if (category === "twoHouse" && isRegulated) {
    return { additionalRate: 20, description: "조정대상지역 2주택 +20%p" };
  }

  if (category === "threeHouse" && isRegulated) {
    return { additionalRate: 30, description: "조정대상지역 3주택+ +30%p" };
  }

  return { additionalRate: 0, description: "기본세율" };
}

export default function CapitalGainsTaxCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("house");

  // 금액 입력
  const [salePrice, setSalePrice] = useState(800000000);
  const [salePriceInput, setSalePriceInput] = useState("800,000,000");
  const [purchasePrice, setPurchasePrice] = useState(500000000);
  const [purchasePriceInput, setPurchasePriceInput] = useState("500,000,000");
  const [expenses, setExpenses] = useState(5000000);
  const [expensesInput, setExpensesInput] = useState("5,000,000");

  // 주택 옵션
  const [houseCategory, setHouseCategory] = useState<HouseCategory>("oneHouseTaxable");
  const [isRegulated, setIsRegulated] = useState(false);

  // 토지 옵션
  const [isNonBusiness, setIsNonBusiness] = useState(false);

  // 오피스텔 옵션
  const [officetelCategory, setOfficetelCategory] = useState<OfficetelCategory>("residential");

  // 보유/거주기간
  const [holdingYears, setHoldingYears] = useState(5);
  const [residenceYears, setResidenceYears] = useState(2);

  // 활성 입력 필드
  const [activeField, setActiveField] = useState<"sale" | "purchase" | "expenses">("sale");

  const [result, setResult] = useState({
    gain: 0,
    taxableGain: 0,
    exemptAmount: 0,
    longTermDeduction: 0,
    basicDeduction: 2500000,
    taxableIncome: 0,
    baseRate: 0,
    additionalRate: 0,
    totalRate: 0,
    tax: 0,
    localTax: 0,
    totalTax: 0,
    rateDescription: "",
    longTermDescription: "",
    surtaxDescription: ""
  });

  // 금액 빠른 입력
  const addAmount = (amount: number) => {
    if (activeField === "sale") {
      const newPrice = salePrice + amount;
      setSalePrice(newPrice);
      setSalePriceInput(formatNumber(newPrice));
    } else if (activeField === "purchase") {
      const newPrice = purchasePrice + amount;
      setPurchasePrice(newPrice);
      setPurchasePriceInput(formatNumber(newPrice));
    } else {
      const newPrice = expenses + amount;
      setExpenses(newPrice);
      setExpensesInput(formatNumber(newPrice));
    }
  };

  const clearAmount = () => {
    if (activeField === "sale") {
      setSalePrice(0);
      setSalePriceInput("0");
    } else if (activeField === "purchase") {
      setPurchasePrice(0);
      setPurchasePriceInput("0");
    } else {
      setExpenses(0);
      setExpensesInput("0");
    }
  };

  const handleSalePriceChange = (value: string) => {
    const numValue = parseInput(value);
    setSalePrice(numValue);
    setSalePriceInput(formatNumber(numValue));
  };

  const handlePurchasePriceChange = (value: string) => {
    const numValue = parseInput(value);
    setPurchasePrice(numValue);
    setPurchasePriceInput(formatNumber(numValue));
  };

  const handleExpensesChange = (value: string) => {
    const numValue = parseInput(value);
    setExpenses(numValue);
    setExpensesInput(formatNumber(numValue));
  };

  const calculate = useCallback(() => {
    // 1. 양도차익 계산
    const gain = salePrice - purchasePrice - expenses;

    if (gain <= 0) {
      setResult({
        gain,
        taxableGain: 0,
        exemptAmount: 0,
        longTermDeduction: 0,
        basicDeduction: 0,
        taxableIncome: 0,
        baseRate: 0,
        additionalRate: 0,
        totalRate: 0,
        tax: 0,
        localTax: 0,
        totalTax: 0,
        rateDescription: "양도차익 없음",
        longTermDescription: "",
        surtaxDescription: ""
      });
      return;
    }

    let taxableGain = gain;
    let exemptAmount = 0;
    let longTermDeduction = 0;
    let longTermDescription = "";

    // 2. 1세대 1주택 비과세 적용 (주택 + 오피스텔 주거용)
    const canApplyExemption =
      (propertyType === "house" && houseCategory === "oneHouseExempt") ||
      (propertyType === "officetel" && officetelCategory === "residential" && houseCategory === "oneHouseExempt");

    if (canApplyExemption) {
      if (salePrice <= 1200000000) {
        // 12억 이하: 전액 비과세
        setResult({
          gain,
          taxableGain: 0,
          exemptAmount: gain,
          longTermDeduction: 0,
          basicDeduction: 0,
          taxableIncome: 0,
          baseRate: 0,
          additionalRate: 0,
          totalRate: 0,
          tax: 0,
          localTax: 0,
          totalTax: 0,
          rateDescription: "1세대 1주택 비과세",
          longTermDescription: "2년 이상 보유·거주",
          surtaxDescription: ""
        });
        return;
      } else {
        // 12억 초과: 초과분만 과세 (비율 계산)
        const taxableRatio = (salePrice - 1200000000) / salePrice;
        taxableGain = Math.round(gain * taxableRatio);
        exemptAmount = gain - taxableGain;
      }
    }

    // 3. 분양권 - 단기 고율 과세 (장기보유공제 없음, 지역 구분 없음)
    if (propertyType === "presale") {
      const shortTermInfo = getShortTermRate(holdingYears, propertyType);
      const basicDeduction = 0; // 분양권 단기는 기본공제 없음
      const taxableIncome = Math.max(taxableGain - basicDeduction, 0);
      const tax = Math.round(taxableIncome * (shortTermInfo.rate / 100));
      const localTax = Math.round(tax * 0.1);

      setResult({
        gain,
        taxableGain,
        exemptAmount: 0,
        longTermDeduction: 0,
        basicDeduction,
        taxableIncome,
        baseRate: shortTermInfo.rate,
        additionalRate: 0,
        totalRate: shortTermInfo.rate,
        tax,
        localTax,
        totalTax: tax + localTax,
        rateDescription: shortTermInfo.description,
        longTermDescription: "분양권은 장기보유공제 적용 안 됨 (2년 이상 보유해도 60%)",
        surtaxDescription: ""
      });
      return;
    }

    // 4. 오피스텔 업무용 - 단기 고율 or 장기 누진세
    if (propertyType === "officetel" && officetelCategory === "commercial") {
      const shortTermInfo = getShortTermRate(holdingYears, propertyType, officetelCategory);

      if (shortTermInfo.rate > 0) {
        // 2년 미만: 단기 고율
        const basicDeduction = 0;
        const taxableIncome = Math.max(taxableGain - basicDeduction, 0);
        const tax = Math.round(taxableIncome * (shortTermInfo.rate / 100));
        const localTax = Math.round(tax * 0.1);

        setResult({
          gain,
          taxableGain,
          exemptAmount: 0,
          longTermDeduction: 0,
          basicDeduction,
          taxableIncome,
          baseRate: shortTermInfo.rate,
          additionalRate: 0,
          totalRate: shortTermInfo.rate,
          tax,
          localTax,
          totalTax: tax + localTax,
          rateDescription: shortTermInfo.description,
          longTermDescription: "",
          surtaxDescription: ""
        });
        return;
      }
      // 2년 이상: 장기보유공제 적용 후 누진세
      const longTermInfo = getLongTermDeductionRate(holdingYears, 0, false);
      longTermDeduction = Math.round(taxableGain * (longTermInfo.totalRate / 100));
      longTermDescription = longTermInfo.description;
    }

    // 5. 장기보유특별공제 계산 (주택, 토지, 상가, 오피스텔 주거용)
    if (propertyType === "house" || propertyType === "land" || propertyType === "commercial" ||
        (propertyType === "officetel" && officetelCategory === "residential")) {

      // ⚠️ 다주택 중과세 시 장기보유특별공제 배제 (국세청 기준)
      const isSurtaxApplied =
        (houseCategory === "twoHouse" || houseCategory === "threeHouse") && isRegulated;

      if (isSurtaxApplied) {
        longTermDeduction = 0;
        longTermDescription = "다주택 중과세 시 장특공 배제";
      } else {
        const isOneHouseExempt =
          (propertyType === "house" || (propertyType === "officetel" && officetelCategory === "residential")) &&
          (houseCategory === "oneHouseExempt" || houseCategory === "oneHouseTaxable");

        const longTermInfo = getLongTermDeductionRate(
          holdingYears,
          residenceYears,
          isOneHouseExempt && residenceYears >= 2
        );
        longTermDeduction = Math.round(taxableGain * (longTermInfo.totalRate / 100));
        longTermDescription = longTermInfo.description;
      }
    }

    // 6. 양도소득금액
    const afterLongTerm = taxableGain - longTermDeduction;

    // 7. 기본공제 (연 250만원)
    const basicDeduction = 2500000;
    const taxableIncome = Math.max(afterLongTerm - basicDeduction, 0);

    // 8. 세율 적용
    const { rate: baseRate, deduction, bracket } = getBaseTaxRate(taxableIncome);
    const { additionalRate, description: surtaxDescription } = getSurtaxRate(
      houseCategory,
      isRegulated,
      propertyType,
      isNonBusiness
    );

    const totalRate = baseRate + additionalRate;
    const tax = Math.max(Math.round(taxableIncome * (totalRate / 100) - deduction), 0);

    // 9. 지방소득세 (양도소득세의 10%)
    const localTax = Math.round(tax * 0.1);
    const totalTax = tax + localTax;

    setResult({
      gain,
      taxableGain,
      exemptAmount,
      longTermDeduction,
      basicDeduction: afterLongTerm > 0 ? basicDeduction : 0,
      taxableIncome,
      baseRate,
      additionalRate,
      totalRate,
      tax,
      localTax,
      totalTax,
      rateDescription: bracket,
      longTermDescription,
      surtaxDescription
    });
  }, [
    salePrice, purchasePrice, expenses, houseCategory, isRegulated,
    propertyType, isNonBusiness, holdingYears, residenceYears,
    officetelCategory
  ]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const houseCategories = [
    { type: "oneHouseExempt" as HouseCategory, label: "1주택 비과세", description: "2년 이상 보유·거주" },
    { type: "oneHouseTaxable" as HouseCategory, label: "1주택 과세", description: "비과세 요건 미충족" },
    { type: "twoHouse" as HouseCategory, label: "2주택", description: "" },
    { type: "threeHouse" as HouseCategory, label: "3주택+", description: "" },
  ];

  // 빠른 금액 버튼
  const quickAmounts = [
    { label: "5억", value: 500000000 },
    { label: "1억", value: 100000000 },
    { label: "5천", value: 50000000 },
    { label: "1천", value: 10000000 },
    { label: "백만", value: 1000000 },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "양도소득세 계산기",
    "description": "부동산 양도소득세를 계산하는 온라인 계산기. 주택, 오피스텔, 상가, 분양권 모두 계산 가능. 국세청 기준 적용",
    "url": "https://jjyu.co.kr/calculators/capital-gains-tax",
    "provider": {
      "@type": "Organization",
      "name": "머니위키",
      "url": "https://jjyu.co.kr"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 헤더 */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-900">양도소득세 계산기</h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex overflow-x-auto">
          {[
            { type: "house" as PropertyType, label: "주택" },
            { type: "officetel" as PropertyType, label: "오피스텔" },
            { type: "commercial" as PropertyType, label: "상가" },
            { type: "land" as PropertyType, label: "토지" },
            { type: "presale" as PropertyType, label: "분양권" },
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => setPropertyType(item.type)}
              className={`flex-1 py-2.5 px-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
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
        {/* 주택 구분 */}
        {propertyType === "house" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">주택구분</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {houseCategories.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setHouseCategory(item.type)}
                  className={`px-3 py-2 text-sm rounded transition-all text-center ${
                    houseCategory === item.type
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className={`text-xs mt-0.5 ${
                      houseCategory === item.type ? "text-emerald-100" : "text-gray-400"
                    }`}>
                      {item.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 오피스텔 유형 */}
        {propertyType === "officetel" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">오피스텔 유형</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setOfficetelCategory("residential")}
                className={`px-3 py-2 text-sm rounded transition-all text-center ${
                  officetelCategory === "residential"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="font-medium">주거용</div>
                <div className={`text-xs mt-0.5 ${
                  officetelCategory === "residential" ? "text-emerald-100" : "text-gray-400"
                }`}>
                  1주택 비과세 가능
                </div>
              </button>
              <button
                onClick={() => setOfficetelCategory("commercial")}
                className={`px-3 py-2 text-sm rounded transition-all text-center ${
                  officetelCategory === "commercial"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="font-medium">업무용</div>
                <div className={`text-xs mt-0.5 ${
                  officetelCategory === "commercial" ? "text-emerald-100" : "text-gray-400"
                }`}>
                  단기 고율 적용
                </div>
              </button>
            </div>
            {officetelCategory === "residential" && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">주택구분</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {houseCategories.map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setHouseCategory(item.type)}
                      className={`px-3 py-2 text-sm rounded transition-all text-center ${
                        houseCategory === item.type
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <div className="font-medium">{item.label}</div>
                      {item.description && (
                        <div className={`text-xs mt-0.5 ${
                          houseCategory === item.type ? "text-emerald-100" : "text-gray-400"
                        }`}>
                          {item.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 상가 - 별도 옵션 불필요 (누진세율 적용) */}
        {propertyType === "commercial" && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              <span className="font-medium">상가는 누진세율(6~45%)</span>이 적용되며,
              보유기간 3년 이상일 때 장기보유특별공제(최대 30%)가 적용돼요.
            </p>
          </div>
        )}

        {/* 토지 유형 */}
        {propertyType === "land" && (
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">토지유형</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsNonBusiness(false)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  !isNonBusiness
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                사업용 토지
              </button>
              <button
                onClick={() => setIsNonBusiness(true)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  isNonBusiness
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                비사업용 토지
              </button>
            </div>
          </div>
        )}

        {/* 분양권 안내 */}
        {propertyType === "presale" && (
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-medium">분양권 세율 (지역 구분 없음)</span>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• 보유기간 1년 미만: <span className="font-medium">70%</span></li>
                <li>• 보유기간 1~2년: <span className="font-medium">60%</span></li>
                <li>• 보유기간 2년 이상: <span className="font-medium">60%</span></li>
              </ul>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">⚠️ 분양권은 장기보유공제가 적용되지 않아요.</span>
                {" "}2년 이상 보유해도 60% 세율이 유지되니 주의하세요. (조정대상지역 여부와 무관)
              </p>
            </div>
          </div>
        )}

        {/* 조정대상지역 */}
        {propertyType === "house" && (houseCategory === "twoHouse" || houseCategory === "threeHouse") && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm font-medium text-gray-700 shrink-0">조정지역</label>
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
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">⚠️ 중과 유예 기간 안내</span>
                {" "}2026년 5월 9일까지는 중과세가 한시적으로 배제되어 기본세율만 적용됩니다.
                {" "}2026년 5월 10일부터는 조정대상지역 2주택 +20%p, 3주택+ +30%p 중과세율이 적용되며 장기보유특별공제도 배제됩니다.
              </p>
            </div>
          </div>
        )}

        {/* 금액 입력 영역 */}
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          {/* 양도가액 */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <label className="w-16 text-sm font-medium text-gray-700 shrink-0">양도가액</label>
              <div className="flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={salePriceInput}
                    onChange={(e) => handleSalePriceChange(e.target.value)}
                    onFocus={() => setActiveField("sale")}
                    className={`w-full px-3 py-2 pr-10 text-right text-sm border rounded focus:outline-none ${
                      activeField === "sale"
                        ? "border-emerald-500 ring-1 ring-emerald-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white bg-emerald-500 px-2 py-0.5 rounded">원</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 shrink-0"></div>
              <span className="text-sm text-emerald-600 font-medium">{toManwon(salePrice)}</span>
            </div>
          </div>

          {/* 취득가액 */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <label className="w-16 text-sm font-medium text-gray-700 shrink-0">취득가액</label>
              <div className="flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={purchasePriceInput}
                    onChange={(e) => handlePurchasePriceChange(e.target.value)}
                    onFocus={() => setActiveField("purchase")}
                    className={`w-full px-3 py-2 pr-10 text-right text-sm border rounded focus:outline-none ${
                      activeField === "purchase"
                        ? "border-emerald-500 ring-1 ring-emerald-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white bg-emerald-500 px-2 py-0.5 rounded">원</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 shrink-0"></div>
              <span className="text-sm text-emerald-600 font-medium">{toManwon(purchasePrice)}</span>
            </div>
          </div>

          {/* 필요경비 */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <label className="w-16 text-sm font-medium text-gray-700 shrink-0">필요경비</label>
              <div className="flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={expensesInput}
                    onChange={(e) => handleExpensesChange(e.target.value)}
                    onFocus={() => setActiveField("expenses")}
                    className={`w-full px-3 py-2 pr-10 text-right text-sm border rounded focus:outline-none ${
                      activeField === "expenses"
                        ? "border-emerald-500 ring-1 ring-emerald-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white bg-emerald-500 px-2 py-0.5 rounded">원</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 shrink-0"></div>
              <span className="text-xs text-gray-500">취득세, 중개수수료, 인테리어 비용 등</span>
            </div>
          </div>

          {/* 빠른 금액 버튼 */}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-16 shrink-0"></div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => addAmount(100000000)}
                className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-600 rounded transition-colors"
              >
                +
              </button>
              {quickAmounts.map((item) => (
                <button
                  key={item.label}
                  onClick={() => addAmount(item.value)}
                  className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-600 rounded transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={clearAmount}
                className="px-2 py-1 text-xs bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors font-medium"
              >
                C
              </button>
            </div>
          </div>
        </div>

        {/* 보유/거주기간 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 shrink-0">보유기간</label>
            <div className="flex items-center gap-1">
              <select
                value={holdingYears}
                onChange={(e) => setHoldingYears(parseInt(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
              >
                {Array.from({ length: 21 }, (_, i) => (
                  <option key={i} value={i}>{i}년</option>
                ))}
              </select>
            </div>
          </div>

          {propertyType === "house" && (houseCategory === "oneHouseExempt" || houseCategory === "oneHouseTaxable") && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 shrink-0">거주기간</label>
              <div className="flex items-center gap-1">
                <select
                  value={residenceYears}
                  onChange={(e) => setResidenceYears(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                >
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i} value={i}>{i}년</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setSalePrice(800000000);
              setSalePriceInput("800,000,000");
              setPurchasePrice(500000000);
              setPurchasePriceInput("500,000,000");
              setExpenses(5000000);
              setExpensesInput("5,000,000");
              setHoldingYears(5);
              setResidenceYears(2);
              setHouseCategory("oneHouseTaxable");
              setIsRegulated(false);
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
          {/* 세금 계산 과정 */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">양도차익</span>
              <span className="font-medium text-gray-800">{formatNumber(result.gain)}원</span>
            </div>

            {result.exemptAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
                <span>비과세 금액 (12억 이하분)</span>
                <span className="font-medium">-{formatNumber(result.exemptAmount)}원</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">과세대상 양도차익</span>
              <span className="font-medium text-gray-800">{formatNumber(result.taxableGain)}원</span>
            </div>

            {result.longTermDeduction > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
                <div className="flex items-center gap-2">
                  <span>장기보유특별공제</span>
                  <span className="text-xs text-green-500">({result.longTermDescription})</span>
                </div>
                <span className="font-medium">-{formatNumber(result.longTermDeduction)}원</span>
              </div>
            )}

            {result.basicDeduction > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
                <span>기본공제</span>
                <span className="font-medium">-{formatNumber(result.basicDeduction)}원</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">과세표준</span>
              <span className="font-medium text-gray-800">{formatNumber(result.taxableIncome)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">적용세율</span>
                <span className="text-xs text-gray-400">({result.rateDescription})</span>
              </div>
              <span className="font-medium text-gray-800">
                {result.baseRate}%
                {result.additionalRate > 0 && (
                  <span className="text-red-600"> +{result.additionalRate}%</span>
                )}
              </span>
            </div>

            {result.surtaxDescription && result.additionalRate > 0 && (
              <div className="px-3 py-2 bg-red-50 rounded text-sm text-red-700">
                {result.surtaxDescription}
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">양도소득세</span>
              <span className="font-medium text-gray-800">{formatNumber(result.tax)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">지방소득세</span>
                <span className="text-xs text-gray-400">(양도세의 10%)</span>
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
              양도소득세 {formatNumber(result.tax)}원 + 지방소득세 {formatNumber(result.localTax)}원
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
            <h4 className="font-medium text-gray-800 mb-1">양도소득세란?</h4>
            <p className="text-gray-600 leading-relaxed">
              부동산을 팔아서 생긴 이익(양도차익)에 부과하는 국세예요. 양도일이 속하는 달의 말일부터 2개월 이내에 신고·납부해야 해요.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">1세대 1주택 비과세</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 2년 이상 보유 + 2년 이상 거주 시 비과세</li>
              <li>• 양도가액 12억원 초과분만 과세</li>
              <li>• 조정대상지역은 2년 거주 필수</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">장기보유특별공제</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 일반: 3년 이상 보유 시 6%부터 최대 30%</li>
              <li>• 1세대 1주택: 보유+거주 합산 최대 80%</li>
              <li>• 다주택자 중과 시 장특공 배제</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">주의사항</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 필요경비: 취득세, 중개수수료, 인테리어 비용 등</li>
              <li>• 실제 세액은 개인 상황에 따라 달라질 수 있어요</li>
              <li>• 정확한 세액은 세무사에게 상담하세요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 세율표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 양도소득세율표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[350px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">세율</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">누진공제</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">1,400만원 이하</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">6%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">1,400~5,000만원</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">15%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">126만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">5,000~8,800만원</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">24%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">576만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">8,800만원~1.5억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">35%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1,544만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">1.5억~3억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">38%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">1,994만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">3억~5억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">40%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">2,594만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">5억~10억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">42%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">3,594만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">10억 초과</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">45%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">6,594만원</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-3 space-y-1">
            <p className="text-xs text-red-600 font-medium">※ 중과세율</p>
            <ul className="text-xs text-gray-500 space-y-0.5">
              <li>• 조정대상지역 2주택: 기본세율 +20%p</li>
              <li>• 조정대상지역 3주택+: 기본세율 +30%p</li>
              <li>• 비사업용 토지: 기본세율 +10%p</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 양도차익별 예상세액표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 양도차익별 예상세액표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <p className="text-xs text-gray-600 mb-3">※ 1주택 과세 기준 (장특공 30% 적용, 기본공제 250만원)</p>
          <table className="w-full text-xs border-collapse min-w-[450px]">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">양도차익</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">과세표준</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">세율</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-emerald-800">양도세+지방세</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">5천만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">3,250만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">15%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 349만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">1억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6,750만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">24%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 1,148만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">2억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">1억 3,750만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">35%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 3,591만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">3억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">2억 750만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">38%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 6,488만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">5억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">3억 4,750만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">40%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 1억 2,447만원</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">10억원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6억 9,750만원</td>
                <td className="border border-gray-300 px-2 py-2 text-center">42%</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 2억 5,450만원</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs text-gray-500 mt-3 font-medium">※ 1세대 1주택 비과세 예시</p>
          <table className="w-full text-xs border-collapse mt-2 min-w-[400px]">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-green-800">양도가액</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-green-800">양도차익</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-green-800">예상세액</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center">12억원 이하</td>
                <td className="border border-gray-300 px-2 py-2 text-center">전액</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-green-600 font-medium">0원 (비과세)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center">15억원 (차익 3억)</td>
                <td className="border border-gray-300 px-2 py-2 text-center">6천만원 과세</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 288만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-2 text-center">20억원 (차익 5억)</td>
                <td className="border border-gray-300 px-2 py-2 text-center">2억원 과세</td>
                <td className="border border-gray-300 px-2 py-2 text-center text-emerald-600 font-medium">약 1,573만원</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">* 2년 이상 보유·거주, 장특공 80% 적용 시 예상 세액</p>
        </div>
      </div>
    </div>
    </>
  );
}
