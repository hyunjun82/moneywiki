"use client";

import { useState, useEffect } from "react";

type VehicleType = "passenger" | "commercial" | "electric" | "hybrid";

export default function VehicleTaxCalculator() {
  // 입력값
  const [vehicleType, setVehicleType] = useState<VehicleType>("passenger");
  const [displacement, setDisplacement] = useState<number>(2000); // 배기량 (cc)
  const [vehicleAge, setVehicleAge] = useState<number>(0); // 차량 연식 (년)
  const [isBusinessUse, setIsBusinessUse] = useState<boolean>(false); // 영업용 여부

  // 결과값
  const [result, setResult] = useState({
    baseTax: 0, // 기본 자동차세
    educationTax: 0, // 지방교육세
    totalTax: 0, // 총 자동차세
    halfYearTax: 0, // 반기별 납부액
    ageDiscount: 0, // 경감률
    discountAmount: 0, // 경감액
    annualPrepayDiscount: 0, // 연납 할인액
    annualPrepayTotal: 0, // 연납 시 총액
  });

  // 자동차세 계산 (cc당 세액)
  const getPassengerTaxRate = (cc: number, isNonBusiness: boolean): number => {
    if (isNonBusiness) {
      // 비영업용 (자가용)
      if (cc <= 1000) return 80;
      if (cc <= 1600) return 140;
      return 200;
    } else {
      // 영업용 (택시 등)
      if (cc <= 1000) return 18;
      if (cc <= 1600) return 18;
      return 19;
    }
  };

  // 전기차 세액
  const ELECTRIC_TAX = 100000; // 연 10만원 (비영업용)
  const ELECTRIC_TAX_BUSINESS = 20000; // 연 2만원 (영업용)

  // 하이브리드 세액 (일반 차량과 동일, 감면 종료)
  const getHybridTaxRate = getPassengerTaxRate;

  // 차령별 경감률 (비영업용만)
  const getAgeDiscountRate = (age: number): number => {
    if (age < 3) return 0;
    if (age === 3) return 0.05;
    if (age === 4) return 0.10;
    if (age === 5) return 0.15;
    if (age === 6) return 0.20;
    if (age === 7) return 0.25;
    if (age === 8) return 0.30;
    if (age === 9) return 0.35;
    if (age === 10) return 0.40;
    if (age === 11) return 0.45;
    return 0.50; // 12년 이상 최대 50%
  };

  useEffect(() => {
    let baseTax = 0;
    let ageDiscount = 0;

    if (vehicleType === "electric") {
      baseTax = isBusinessUse ? ELECTRIC_TAX_BUSINESS : ELECTRIC_TAX;
      ageDiscount = 0; // 전기차는 경감 없음
    } else if (vehicleType === "passenger" || vehicleType === "hybrid") {
      const taxRate = getPassengerTaxRate(displacement, !isBusinessUse);
      baseTax = displacement * taxRate;
      ageDiscount = !isBusinessUse ? getAgeDiscountRate(vehicleAge) : 0;
    } else if (vehicleType === "commercial") {
      // 승합/화물/특수차량 (간소화)
      baseTax = displacement * (isBusinessUse ? 24 : 65);
      ageDiscount = !isBusinessUse ? getAgeDiscountRate(vehicleAge) : 0;
    }

    // 경감액 계산
    const discountAmount = Math.round(baseTax * ageDiscount);
    const discountedTax = baseTax - discountAmount;

    // 지방교육세 (자동차세의 30%)
    const educationTax = Math.round(discountedTax * 0.3);

    // 총 자동차세
    const totalTax = discountedTax + educationTax;

    // 반기별 납부액
    const halfYearTax = Math.round(totalTax / 2);

    // 연납 할인 (1월 납부 시 약 4.6% 할인)
    const annualPrepayDiscount = Math.round(totalTax * 0.046);
    const annualPrepayTotal = totalTax - annualPrepayDiscount;

    setResult({
      baseTax: Math.round(baseTax),
      educationTax,
      totalTax,
      halfYearTax,
      ageDiscount: ageDiscount * 100,
      discountAmount,
      annualPrepayDiscount,
      annualPrepayTotal,
    });
  }, [vehicleType, displacement, vehicleAge, isBusinessUse]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-slate-600 to-zinc-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">자동차세 계산기</h2>
        <p className="text-slate-200 text-sm mt-1">2026년 기준</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 차량 종류 선택 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            차량 종류
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setVehicleType("passenger")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                vehicleType === "passenger"
                  ? "bg-slate-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              승용차
            </button>
            <button
              onClick={() => setVehicleType("electric")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                vehicleType === "electric"
                  ? "bg-slate-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              전기차
            </button>
            <button
              onClick={() => setVehicleType("hybrid")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                vehicleType === "hybrid"
                  ? "bg-slate-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              하이브리드
            </button>
            <button
              onClick={() => setVehicleType("commercial")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                vehicleType === "commercial"
                  ? "bg-slate-600 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              승합/화물
            </button>
          </div>
        </div>

        {/* 영업용 여부 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-neutral-700">
            영업용 차량
          </label>
          <button
            onClick={() => setIsBusinessUse(!isBusinessUse)}
            className={`w-12 h-6 rounded-full transition-all ${
              isBusinessUse ? "bg-slate-600" : "bg-neutral-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-all ${
                isBusinessUse ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* 배기량 (전기차 제외) */}
        {vehicleType !== "electric" && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-700">
              배기량
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatNumber(displacement)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setDisplacement(Number(value) || 0);
                }}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                cc
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1000, 1600, 2000, 2500, 3000].map((cc) => (
                <button
                  key={cc}
                  onClick={() => setDisplacement(cc)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    displacement === cc
                      ? "bg-slate-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {formatNumber(cc)}cc
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 차량 연식 */}
        {!isBusinessUse && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-700">
              차량 연식 (출고 후 경과 년수)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="15"
                value={vehicleAge}
                onChange={(e) => setVehicleAge(Number(e.target.value))}
                className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
              <div className="w-16 text-center">
                <span className="text-lg font-bold text-slate-600">
                  {vehicleAge}
                </span>
                <span className="text-sm text-neutral-500">년</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>신차</span>
              <span>15년 이상</span>
            </div>
          </div>
        )}

        {/* 결과 영역 */}
        <div className="bg-gradient-to-r from-slate-50 to-zinc-50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">연간 자동차세</p>
            <p className="text-4xl font-bold text-slate-700">
              {formatNumber(result.totalTax)}
              <span className="text-xl font-normal text-neutral-500">원</span>
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">1기분 (6월)</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatNumber(result.halfYearTax)}원
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">2기분 (12월)</p>
              <p className="text-lg font-semibold text-neutral-700">
                {formatNumber(result.halfYearTax)}원
              </p>
            </div>
          </div>

          {result.ageDiscount > 0 && (
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="text-xs text-neutral-500 mb-1">
                차령 경감 ({result.ageDiscount}%)
              </p>
              <p className="text-lg font-bold text-green-600">
                -{formatNumber(result.discountAmount)}원
              </p>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  1월 연납 시
                </p>
                <p className="text-xs text-blue-600">약 4.6% 할인</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-700">
                  {formatNumber(result.annualPrepayTotal)}원
                </p>
                <p className="text-xs text-green-600">
                  -{formatNumber(result.annualPrepayDiscount)}원 할인
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 세율표 */}
        <div className="bg-neutral-50 rounded-xl p-4">
          <h3 className="font-semibold text-neutral-700 mb-3">
            승용차 세율 (비영업용)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-2 text-left font-medium text-neutral-600">
                    배기량
                  </th>
                  <th className="py-2 text-right font-medium text-neutral-600">
                    cc당 세액
                  </th>
                  <th className="py-2 text-right font-medium text-neutral-600">
                    예시 (연간)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`border-b border-neutral-100 ${
                    displacement <= 1000 ? "bg-slate-50" : ""
                  }`}
                >
                  <td className="py-2 text-neutral-700">1,000cc 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    80원
                  </td>
                  <td className="py-2 text-right text-neutral-600">
                    {formatNumber(1000 * 80 * 1.3)}원
                  </td>
                </tr>
                <tr
                  className={`border-b border-neutral-100 ${
                    displacement > 1000 && displacement <= 1600
                      ? "bg-slate-50"
                      : ""
                  }`}
                >
                  <td className="py-2 text-neutral-700">1,600cc 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    140원
                  </td>
                  <td className="py-2 text-right text-neutral-600">
                    {formatNumber(1600 * 140 * 1.3)}원
                  </td>
                </tr>
                <tr
                  className={`${displacement > 1600 ? "bg-slate-50" : ""}`}
                >
                  <td className="py-2 text-neutral-700">1,600cc 초과</td>
                  <td className="py-2 text-right font-medium text-neutral-700">
                    200원
                  </td>
                  <td className="py-2 text-right text-neutral-600">
                    {formatNumber(2000 * 200 * 1.3)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            ※ 예시 금액은 지방교육세 30% 포함
          </p>
        </div>

        {/* 차령 경감률 */}
        {!isBusinessUse && (
          <div className="bg-neutral-50 rounded-xl p-4">
            <h3 className="font-semibold text-neutral-700 mb-3">
              차령별 경감률 (비영업용)
            </h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center p-2 bg-white rounded">
                <p className="text-neutral-500">3년</p>
                <p className="font-medium text-green-600">5%</p>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <p className="text-neutral-500">6년</p>
                <p className="font-medium text-green-600">20%</p>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <p className="text-neutral-500">9년</p>
                <p className="font-medium text-green-600">35%</p>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <p className="text-neutral-500">12년+</p>
                <p className="font-medium text-green-600">50%</p>
              </div>
            </div>
          </div>
        )}

        {/* 안내 */}
        <div className="text-xs text-neutral-500 space-y-1">
          <p>※ 지방교육세(30%)가 자동 포함된 금액이에요.</p>
          <p>※ 1월에 연납하면 약 4.6% 할인받을 수 있어요.</p>
          <p>※ 전기차는 배기량과 관계없이 연 10만원(비영업용) 또는 2만원(영업용)이에요.</p>
          <p>※ 납부 시기: 1기분(6월), 2기분(12월)</p>
        </div>
      </div>
    </div>
  );
}
