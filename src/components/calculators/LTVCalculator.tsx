"use client";

import { useState, useCallback, useEffect } from "react";

type AreaType = "unregulated" | "adjustment" | "speculation";
type OwnershipType = "none" | "first-time" | "existing";

export default function LTVCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [areaType, setAreaType] = useState<AreaType>("unregulated");
  const [ownershipType, setOwnershipType] = useState<OwnershipType>("none");

  const [ltv, setLtv] = useState<number>(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [ltvDescription, setLtvDescription] = useState<string>("");
  const [limitByPrice, setLimitByPrice] = useState<number>(0);
  const [actualMaxLoan, setActualMaxLoan] = useState<number>(0);

  // LTV 비율 계산
  const calculateLtvRate = useCallback((area: AreaType, ownership: OwnershipType, value: number): { rate: number; description: string } => {
    // 생애최초
    if (ownership === "first-time") {
      return { rate: 70, description: "생애최초 특례" };
    }

    // 투기과열지구
    if (area === "speculation") {
      if (ownership === "existing") {
        return { rate: 0, description: "투기과열지구 유주택자 (대출 불가)" };
      }
      // 무주택자
      if (value <= 900000000) {
        return { rate: 40, description: "투기과열지구 9억 이하" };
      } else if (value <= 1500000000) {
        return { rate: 20, description: "투기과열지구 9억~15억" };
      } else {
        return { rate: 0, description: "투기과열지구 15억 초과 (대출 불가)" };
      }
    }

    // 조정대상지역
    if (area === "adjustment") {
      if (ownership === "existing") {
        return { rate: 0, description: "조정대상지역 유주택자 (대출 불가)" };
      }
      return { rate: 50, description: "조정대상지역 무주택자" };
    }

    // 비규제지역
    return { rate: 70, description: "비규제지역" };
  }, []);

  // 가격별 대출 한도 (수도권/규제지역)
  const getPriceLimitForRegulated = useCallback((value: number): number => {
    if (value <= 1500000000) {
      return 600000000; // 6억
    } else if (value <= 2500000000) {
      return 400000000; // 4억
    } else {
      return 200000000; // 2억
    }
  }, []);

  // LTV 계산
  useEffect(() => {
    if (propertyValue <= 0) {
      setLtv(0);
      setMaxLoanAmount(0);
      setLtvDescription("");
      setLimitByPrice(0);
      setActualMaxLoan(0);
      return;
    }

    const { rate, description } = calculateLtvRate(areaType, ownershipType, propertyValue);
    setLtv(rate);
    setLtvDescription(description);

    // LTV 기준 최대 대출액
    const ltvMaxLoan = Math.floor(propertyValue * (rate / 100));
    setMaxLoanAmount(ltvMaxLoan);

    // 규제지역 가격별 한도
    let priceLimit = 0;
    if (areaType === "speculation" || areaType === "adjustment") {
      priceLimit = getPriceLimitForRegulated(propertyValue);
      setLimitByPrice(priceLimit);
    }

    // 실제 최대 대출 가능액 (LTV와 가격별 한도 중 작은 값)
    const actualMax = priceLimit > 0 ? Math.min(ltvMaxLoan, priceLimit) : ltvMaxLoan;
    setActualMaxLoan(actualMax);
  }, [propertyValue, areaType, ownershipType, calculateLtvRate, getPriceLimitForRegulated]);

  // 숫자 포맷팅
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const formatWon = (num: number): string => {
    if (num >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const man = Math.floor((num % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${formatNumber(man)}만원` : `${eok}억원`;
    } else if (num >= 10000) {
      return `${formatNumber(Math.floor(num / 10000))}만원`;
    }
    return `${formatNumber(num)}원`;
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">LTV 계산기</h2>
            <p className="text-purple-100 text-sm">담보인정비율 및 최대 대출 가능액 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 부동산 가치 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            부동산 가치 (시세 또는 공시가격)
          </label>
          <div className="relative">
            <input
              type="text"
              value={propertyValue > 0 ? formatNumber(propertyValue) : ""}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/,/g, "")) || 0;
                setPropertyValue(value);
              }}
              placeholder="부동산 가치"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-colors text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {propertyValue > 0 && (
            <p className="mt-1 text-sm text-purple-600">{formatWon(propertyValue)}</p>
          )}
        </div>

        {/* 지역 구분 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">지역 구분</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setAreaType("unregulated")}
              className={`p-4 rounded-xl border-2 transition-all ${
                areaType === "unregulated"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">비규제지역</div>
              <div className="text-xs text-neutral-500 mt-1">LTV 70%</div>
            </button>
            <button
              onClick={() => setAreaType("adjustment")}
              className={`p-4 rounded-xl border-2 transition-all ${
                areaType === "adjustment"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">조정대상지역</div>
              <div className="text-xs text-neutral-500 mt-1">LTV 50%</div>
            </button>
            <button
              onClick={() => setAreaType("speculation")}
              className={`p-4 rounded-xl border-2 transition-all ${
                areaType === "speculation"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">투기과열지구</div>
              <div className="text-xs text-neutral-500 mt-1">LTV 40~20%</div>
            </button>
          </div>
        </div>

        {/* 주택 보유 상태 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">주택 보유 상태</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setOwnershipType("none")}
              className={`p-4 rounded-xl border-2 transition-all ${
                ownershipType === "none"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">무주택자</div>
              <div className="text-xs text-neutral-500 mt-1">일반</div>
            </button>
            <button
              onClick={() => setOwnershipType("first-time")}
              className={`p-4 rounded-xl border-2 transition-all ${
                ownershipType === "first-time"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">생애최초</div>
              <div className="text-xs text-neutral-500 mt-1">LTV 70% 특례</div>
            </button>
            <button
              onClick={() => setOwnershipType("existing")}
              className={`p-4 rounded-xl border-2 transition-all ${
                ownershipType === "existing"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="font-medium">유주택자</div>
              <div className="text-xs text-neutral-500 mt-1">규제지역 제한</div>
            </button>
          </div>
        </div>

        {/* 결과 */}
        {propertyValue > 0 && (
          <div className="space-y-4">
            {/* LTV 비율 */}
            <div className="p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-700">적용 LTV</span>
                <span className="text-xs text-purple-600 font-medium">{ltvDescription}</span>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {ltv.toFixed(0)}%
              </div>
              <div className="text-xs text-neutral-600">
                부동산 가치의 {ltv.toFixed(0)}%까지 대출 가능
              </div>
            </div>

            {/* LTV 기준 최대 대출액 */}
            <div className="p-5 bg-neutral-50 rounded-xl">
              <div className="text-sm text-neutral-700 mb-2">LTV 기준 최대 대출 가능액</div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">
                {formatWon(maxLoanAmount)}
              </div>
              <div className="text-xs text-neutral-500">
                {formatNumber(propertyValue)}원 × {ltv}% = {formatNumber(maxLoanAmount)}원
              </div>
            </div>

            {/* 가격별 한도 (규제지역만) */}
            {(areaType === "speculation" || areaType === "adjustment") && limitByPrice > 0 && (
              <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="text-sm text-yellow-800 mb-2 font-medium">
                  📍 규제지역 가격별 한도
                </div>
                <div className="text-2xl font-bold text-yellow-700 mb-1">
                  {formatWon(limitByPrice)}
                </div>
                <div className="text-xs text-yellow-600">
                  {propertyValue <= 1500000000 ? "15억 이하 주택" :
                   propertyValue <= 2500000000 ? "15~25억 주택" : "25억 초과 주택"}
                  {" "}최대 한도
                </div>
              </div>
            )}

            {/* 실제 최대 대출 가능액 */}
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
              <div className="text-sm opacity-90 mb-2">실제 최대 대출 가능액</div>
              <div className="text-4xl font-bold mb-2">{formatWon(actualMaxLoan)}</div>
              <div className="text-xs opacity-80">
                {(areaType === "speculation" || areaType === "adjustment") && limitByPrice > 0
                  ? `LTV 한도 ${formatWon(maxLoanAmount)}와 가격별 한도 ${formatWon(limitByPrice)} 중 작은 값`
                  : `LTV ${ltv}% 기준`}
              </div>
            </div>
          </div>
        )}

        {/* 이용안내 */}
        <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            LTV란?
          </h4>
          <p className="text-sm text-purple-700 mb-2">
            LTV는 부동산 담보 가치 대비 얼마까지 대출받을 수 있는지 보여주는 비율이에요. <span className="font-medium">담보가 충분해도 지역과 주택 보유 상태에 따라 제한</span>돼요.
          </p>
          <div className="text-sm text-purple-700 space-y-1">
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">비규제지역</span>: 70% (가장 여유)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">조정대상지역</span>: 무주택 50%, 유주택 0%</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">투기과열지구</span>: 9억 이하 40%, 9~15억 20%, 15억 초과 불가</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">생애최초</span>: 특정 조건 충족 시 70% (소득·가격 제한 있음)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium shrink-0">•</span>
              <span><span className="font-medium">가격별 한도</span>: 규제지역은 15억 이하 6억, 15~25억 4억, 25억 초과 2억</span>
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        {ownershipType === "first-time" && (
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              생애최초 특례 조건
            </h4>
            <div className="text-sm text-green-700 space-y-1">
              <div className="flex items-start gap-2">
                <span className="font-medium shrink-0">✓</span>
                <span>부부 모두 무주택 세대주</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium shrink-0">✓</span>
                <span>소득 제한: 연 소득 7천만원 이하 (생애최초 디딤돌)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium shrink-0">✓</span>
                <span>주택 가격 제한: 6억원 이하 (일부 지역 차이 있음)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium shrink-0">✓</span>
                <span>은행마다 세부 조건이 다를 수 있으니 확인 필요</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
