"use client";

import { useState, useEffect } from "react";

type CalcMode = "return" | "target";

export default function StockReturnCalculator() {
  // 계산 모드
  const [calcMode, setCalcMode] = useState<CalcMode>("return");

  // 수익률 계산 입력값
  const [buyPrice, setBuyPrice] = useState<number>(50000);
  const [buyQuantity, setBuyQuantity] = useState<number>(100);
  const [sellPrice, setSellPrice] = useState<number>(60000);

  // 목표가 계산 입력값
  const [targetBuyPrice, setTargetBuyPrice] = useState<number>(50000);
  const [targetBuyQuantity, setTargetBuyQuantity] = useState<number>(100);
  const [targetReturn, setTargetReturn] = useState<number>(20);

  // 세금/수수료 설정
  const [includeFees, setIncludeFees] = useState<boolean>(true);
  const [brokerageFee, setBrokerageFee] = useState<number>(0.015); // 증권사 수수료 (%)
  const [isTaxable, setIsTaxable] = useState<boolean>(false); // 양도소득세 대상

  // 결과값
  const [result, setResult] = useState({
    totalBuyAmount: 0,
    totalSellAmount: 0,
    grossProfit: 0,
    fees: 0,
    tax: 0,
    netProfit: 0,
    returnRate: 0,
    targetSellPrice: 0,
  });

  // 매매세 (증권거래세 + 농특세)
  const TRADING_TAX = 0.0020; // 0.20% (2026년 기준 - 코스피 0.05% + 농특세 0.15%)

  // 양도소득세 계산 (대주주/해외주식)
  const calculateCapitalGainsTax = (profit: number): number => {
    if (!isTaxable || profit <= 0) return 0;
    // 기본공제 250만원, 세율 22% (지방세 포함)
    const taxableProfit = Math.max(profit - 2500000, 0);
    return Math.round(taxableProfit * 0.22);
  };

  useEffect(() => {
    if (calcMode === "return") {
      // 수익률 계산
      const totalBuy = buyPrice * buyQuantity;
      const totalSell = sellPrice * buyQuantity;
      const grossProfit = totalSell - totalBuy;

      let fees = 0;
      if (includeFees) {
        // 매수 수수료 + 매도 수수료 + 매도 시 거래세
        fees = Math.round(
          totalBuy * (brokerageFee / 100) +
          totalSell * (brokerageFee / 100) +
          totalSell * TRADING_TAX
        );
      }

      const profitAfterFees = grossProfit - fees;
      const tax = calculateCapitalGainsTax(profitAfterFees);
      const netProfit = profitAfterFees - tax;
      const returnRate = totalBuy > 0 ? (netProfit / totalBuy) * 100 : 0;

      setResult({
        totalBuyAmount: totalBuy,
        totalSellAmount: totalSell,
        grossProfit,
        fees,
        tax,
        netProfit,
        returnRate,
        targetSellPrice: 0,
      });
    } else {
      // 목표가 계산
      const totalBuy = targetBuyPrice * targetBuyQuantity;
      const desiredNetProfit = totalBuy * (targetReturn / 100);

      // 역산: 수수료와 세금을 고려한 목표 매도가
      // netProfit = sellTotal - buyTotal - fees - tax
      // sellTotal = netProfit + buyTotal + fees + tax
      // 반복 계산으로 근사값 찾기

      let targetSell = totalBuy * (1 + targetReturn / 100);

      if (includeFees) {
        // 수수료와 세금을 고려한 보정
        for (let i = 0; i < 10; i++) {
          const fees =
            totalBuy * (brokerageFee / 100) +
            targetSell * (brokerageFee / 100) +
            targetSell * TRADING_TAX;
          const grossP = targetSell - totalBuy;
          const profitAfterFees = grossP - fees;
          const tax = calculateCapitalGainsTax(profitAfterFees);
          const currentNet = profitAfterFees - tax;
          const diff = desiredNetProfit - currentNet;
          targetSell += diff;
        }
      }

      const targetPrice = Math.ceil(targetSell / targetBuyQuantity);

      setResult({
        ...result,
        totalBuyAmount: totalBuy,
        targetSellPrice: targetPrice,
      });
    }
  }, [
    calcMode,
    buyPrice,
    buyQuantity,
    sellPrice,
    targetBuyPrice,
    targetBuyQuantity,
    targetReturn,
    includeFees,
    brokerageFee,
    isTaxable,
  ]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const formatManWon = (num: number): string => {
    if (Math.abs(num) >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const man = Math.floor((Math.abs(num) % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${formatNumber(man)}만원` : `${eok}억원`;
    }
    if (Math.abs(num) >= 10000) {
      // 소수점 첫째 자리까지 표시 (98.6만원 형태)
      const manValue = num / 10000;
      const rounded = Math.round(manValue * 10) / 10; // 소수점 첫째 자리까지
      if (rounded % 1 === 0) {
        return `${formatNumber(rounded)}만원`;
      }
      return `${rounded.toFixed(1)}만원`;
    }
    return `${formatNumber(num)}원`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-teal-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">주식 수익률 계산기</h2>
        <p className="text-[#EDF2F8] text-sm mt-1">수수료/세금 포함</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 계산 모드 선택 */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCalcMode("return")}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              calcMode === "return"
                ? "bg-[#2B5280] text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            수익률 계산
          </button>
          <button
            onClick={() => setCalcMode("target")}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              calcMode === "target"
                ? "bg-[#2B5280] text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            목표가 계산
          </button>
        </div>

        {calcMode === "return" ? (
          <>
            {/* 수익률 계산 입력 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    매수가
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatNumber(buyPrice)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setBuyPrice(Number(value) || 0);
                      }}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#2B5280] focus:border-[#2B5280]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                      원
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    수량
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatNumber(buyQuantity)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setBuyQuantity(Number(value) || 0);
                      }}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#2B5280] focus:border-[#2B5280]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                      주
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  매도가 (현재가)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatNumber(sellPrice)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setSellPrice(Number(value) || 0);
                    }}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#2B5280] focus:border-[#2B5280]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                    원
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[-20, -10, 10, 20, 30, 50].map((pct) => (
                    <button
                      key={pct}
                      onClick={() =>
                        setSellPrice(Math.round(buyPrice * (1 + pct / 100)))
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        pct < 0
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {pct > 0 ? "+" : ""}
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 목표가 계산 입력 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    매수가
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatNumber(targetBuyPrice)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setTargetBuyPrice(Number(value) || 0);
                      }}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#2B5280] focus:border-[#2B5280]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                      원
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    수량
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatNumber(targetBuyQuantity)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setTargetBuyQuantity(Number(value) || 0);
                      }}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#2B5280] focus:border-[#2B5280]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
                      주
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  목표 수익률
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={targetReturn}
                    onChange={(e) => setTargetReturn(Number(e.target.value))}
                    className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="w-20 text-center">
                    <span className="text-lg font-bold text-[#1E3A5F]">
                      {targetReturn}
                    </span>
                    <span className="text-sm text-neutral-500">%</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[10, 20, 30, 50, 100].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setTargetReturn(rate)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        targetReturn === rate
                          ? "bg-[#2B5280] text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      +{rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 수수료/세금 설정 */}
        <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              수수료/세금 반영
            </span>
            <button
              onClick={() => setIncludeFees(!includeFees)}
              className={`w-12 h-6 rounded-full transition-all ${
                includeFees ? "bg-[#2B5280]" : "bg-neutral-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-all ${
                  includeFees ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {includeFees && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">증권사 수수료</span>
                <span className="font-medium text-neutral-700">
                  {brokerageFee}% (매수+매도)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">증권거래세</span>
                <span className="font-medium text-neutral-700">0.20% (매도)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                  양도세 (대주주/해외주식)
                </span>
                <button
                  onClick={() => setIsTaxable(!isTaxable)}
                  className={`w-10 h-5 rounded-full transition-all ${
                    isTaxable ? "bg-[#2B5280]" : "bg-neutral-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-all ${
                      isTaxable ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </>
          )}
        </div>

        {/* 결과 영역 */}
        {calcMode === "return" ? (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-xl p-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-2">
                {result.netProfit >= 0 ? "순수익" : "손실"}
              </p>
              <p
                className={`text-4xl font-bold ${
                  result.netProfit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {result.netProfit >= 0 ? "+" : ""}
                {formatManWon(result.netProfit)}
              </p>
              <p
                className={`text-lg font-medium mt-1 ${
                  result.returnRate >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {result.returnRate >= 0 ? "+" : ""}
                {result.returnRate.toFixed(2)}%
              </p>
            </div>

            <div className="border-t border-[#B8D0E8] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">총 매수금액</span>
                <span className="font-medium text-neutral-700">
                  {formatNumber(result.totalBuyAmount)}원
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">총 매도금액</span>
                <span className="font-medium text-neutral-700">
                  {formatNumber(result.totalSellAmount)}원
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">수익 (세전)</span>
                <span
                  className={`font-medium ${
                    result.grossProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.grossProfit >= 0 ? "+" : ""}
                  {formatNumber(result.grossProfit)}원
                </span>
              </div>
              {includeFees && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">수수료/세금</span>
                    <span className="font-medium text-red-500">
                      -{formatNumber(result.fees)}원
                    </span>
                  </div>
                  {result.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">양도소득세</span>
                      <span className="font-medium text-red-500">
                        -{formatNumber(result.tax)}원
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-xl p-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-2">목표 매도가</p>
              <p className="text-4xl font-bold text-[#1E3A5F]">
                {formatNumber(result.targetSellPrice)}
                <span className="text-xl font-normal text-neutral-500">원</span>
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                {formatNumber(targetBuyPrice)}원 → {formatNumber(result.targetSellPrice)}원
              </p>
            </div>

            <div className="border-t border-[#B8D0E8] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">총 매수금액</span>
                <span className="font-medium text-neutral-700">
                  {formatManWon(result.totalBuyAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">목표 수익률</span>
                <span className="font-medium text-green-600">+{targetReturn}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">예상 순수익</span>
                <span className="font-medium text-green-600">
                  +{formatManWon(result.totalBuyAmount * (targetReturn / 100))}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 안내 */}
        <div className="text-xs text-neutral-500 space-y-1">
          <p>※ 증권거래세 0.20%는 2026년 코스피 기준이에요.</p>
          <p>※ 양도소득세는 대주주(10억 이상) 또는 해외주식에 적용돼요.</p>
          <p>※ 증권사 수수료는 업체별로 다를 수 있어요.</p>
        </div>

        {/* 투자금액별 수익률 비교표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 투자금액별 수익 비교표 (수수료/세금 포함)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">투자금 ↓ / 수익률 →</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">+10%</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">+20%</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden sm:table-cell">+30%</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden md:table-cell">+50%</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">100만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+9.7만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+19.7만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+29.7만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+49.7만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">소액 투자 🌱</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">500만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+48.7만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+98.6만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+148.5만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+248.3만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">적립식 투자 💰</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+97.5만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+197.3만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+297.1만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+496.6만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">본격 투자 ⭐</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">3,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+292.5만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+591.8만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+891.2만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+1,489.9만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">중급 투자자 🌟</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">5,000만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+487.4만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+986.4만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+1,485.3만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+2,483.1만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">시드머니 확보 💎</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+974.9만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 text-green-600">+1,972.7만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell text-green-600">+2,970.6만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell text-green-600">+4,966.3만원</td>
                  <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">고액 투자자 🏆</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 증권사 수수료 0.015%, 거래세 0.20% 반영 (양도세 미적용)</p>

          <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
            <p className="text-xs text-[#132A42] font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
              <li>• 수수료+세금으로 약 0.4% 정도가 빠져요</li>
              <li>• 장기투자일수록 수수료 영향 ↓ (복리효과 ↑)</li>
              <li>• 대주주/해외주식은 양도세 22% 추가!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
