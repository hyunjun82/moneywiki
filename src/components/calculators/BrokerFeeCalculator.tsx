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

type TransactionType = "sale" | "lease";
type PropertyType = "house" | "officetel" | "commercial" | "land";

// 2024년 개정 중개수수료 상한요율 (매매)
function getSaleFeeRate(price: number): { rate: number; maxFee: number | null; bracket: string } {
  if (price < 50000000) {
    return { rate: 0.6, maxFee: 250000, bracket: "5천만원 미만" };
  } else if (price < 200000000) {
    return { rate: 0.5, maxFee: 800000, bracket: "5천만원~2억 미만" };
  } else if (price < 900000000) {
    return { rate: 0.4, maxFee: null, bracket: "2억~9억 미만" };
  } else if (price < 1200000000) {
    return { rate: 0.5, maxFee: null, bracket: "9억~12억 미만" };
  } else if (price < 1500000000) {
    return { rate: 0.6, maxFee: null, bracket: "12억~15억 미만" };
  } else {
    return { rate: 0.7, maxFee: null, bracket: "15억 이상" };
  }
}

// 2024년 개정 중개수수료 상한요율 (전세/임대차)
function getLeaseFeeRate(price: number): { rate: number; maxFee: number | null; bracket: string } {
  if (price < 50000000) {
    return { rate: 0.5, maxFee: 200000, bracket: "5천만원 미만" };
  } else if (price < 100000000) {
    return { rate: 0.4, maxFee: 300000, bracket: "5천만원~1억 미만" };
  } else if (price < 600000000) {
    return { rate: 0.3, maxFee: null, bracket: "1억~6억 미만" };
  } else if (price < 1200000000) {
    return { rate: 0.4, maxFee: null, bracket: "6억~12억 미만" };
  } else if (price < 1500000000) {
    return { rate: 0.5, maxFee: null, bracket: "12억~15억 미만" };
  } else {
    return { rate: 0.6, maxFee: null, bracket: "15억 이상" };
  }
}

// 오피스텔/상가 중개수수료 (매매/전세 동일)
function getCommercialFeeRate(): { rate: number; maxFee: number | null; bracket: string } {
  return { rate: 0.9, maxFee: null, bracket: "오피스텔/상가/토지" };
}

export default function BrokerFeeCalculator() {
  const [transactionType, setTransactionType] = useState<TransactionType>("sale");
  const [propertyType, setPropertyType] = useState<PropertyType>("house");

  // 금액
  const [price, setPrice] = useState(500000000);
  const [priceInput, setPriceInput] = useState("500,000,000");

  const [result, setResult] = useState({
    price: 0,
    rate: 0,
    rateDescription: "",
    calculatedFee: 0,
    maxFee: null as number | null,
    actualFee: 0,
    vat: 0,
    totalFee: 0
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
    let rateInfo;

    // 부동산 유형에 따른 수수료율 결정
    if (propertyType === "house") {
      if (transactionType === "sale") {
        rateInfo = getSaleFeeRate(price);
      } else {
        rateInfo = getLeaseFeeRate(price);
      }
    } else {
      // 오피스텔, 상가, 토지는 0.9% 고정
      rateInfo = getCommercialFeeRate();
    }

    // 계산된 수수료
    const calculatedFee = Math.round(price * (rateInfo.rate / 100));

    // 상한 적용
    let actualFee = calculatedFee;
    if (rateInfo.maxFee !== null && calculatedFee > rateInfo.maxFee) {
      actualFee = rateInfo.maxFee;
    }

    // 부가세 (10%)
    const vat = Math.round(actualFee * 0.1);
    const totalFee = actualFee + vat;

    setResult({
      price,
      rate: rateInfo.rate,
      rateDescription: rateInfo.bracket,
      calculatedFee,
      maxFee: rateInfo.maxFee,
      actualFee,
      vat,
      totalFee
    });
  }, [price, transactionType, propertyType]);

  useEffect(() => {
    calculate();
  }, [calculate]);

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
          <span className="w-1 h-5 bg-teal-500 rounded-full"></span>
          <h2 className="text-base font-semibold text-gray-900">중개수수료 계산기</h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex">
          {[
            { type: "sale" as TransactionType, label: "매매" },
            { type: "lease" as TransactionType, label: "전세/월세" },
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => setTransactionType(item.type)}
              className={`flex-1 py-2.5 text-sm font-medium transition-all border-b-2 ${
                transactionType === item.type
                  ? "border-teal-500 text-emerald-600 bg-teal-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 부동산 유형 */}
        <div className="flex items-center gap-3">
          <label className="w-20 text-sm font-medium text-gray-700 shrink-0">부동산</label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { type: "house" as PropertyType, label: "주택" },
              { type: "officetel" as PropertyType, label: "오피스텔" },
              { type: "commercial" as PropertyType, label: "상가" },
              { type: "land" as PropertyType, label: "토지" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => setPropertyType(item.type)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  propertyType === item.type
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 거래금액 */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm font-medium text-gray-700 shrink-0">
              {transactionType === "sale" ? "매매가" : "보증금"}
            </label>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full px-3 py-2 pr-10 text-right text-sm border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white bg-teal-500 px-2 py-0.5 rounded">원</span>
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
            <span className="text-sm text-emerald-600 font-medium">{toUk(price)}</span>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => {
              setPrice(500000000);
              setPriceInput("500,000,000");
              setTransactionType("sale");
              setPropertyType("house");
            }}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={calculate}
            className="px-6 py-2 text-sm text-white bg-teal-500 rounded hover:bg-emerald-600 transition-colors font-medium"
          >
            계산하기
          </button>
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <span className="w-1 h-5 bg-teal-500 rounded-full"></span>
          <h3 className="text-base font-semibold text-gray-900">계산 결과</h3>
        </div>

        <div className="p-4">
          {/* 적용 기준 */}
          <div className="mb-4 px-3 py-2 bg-teal-50 rounded text-sm">
            <span className="text-gray-600">적용 기준: </span>
            <span className="font-medium text-teal-700">{result.rateDescription} ({result.rate}%)</span>
          </div>

          {/* 계산 과정 */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">거래금액</span>
              <span className="font-medium text-gray-800">{formatNumber(result.price)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">요율</span>
              </div>
              <span className="font-medium text-gray-800">{result.rate}%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">계산 수수료</span>
              <span className="font-medium text-gray-800">{formatNumber(result.calculatedFee)}원</span>
            </div>

            {result.maxFee !== null && result.calculatedFee > result.maxFee && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200 text-green-600">
                <div className="flex items-center gap-2">
                  <span>상한액 적용</span>
                  <span className="text-xs text-green-500">(한도 {formatNumber(result.maxFee)}원)</span>
                </div>
                <span className="font-medium">{formatNumber(result.actualFee)}원</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">중개수수료</span>
              <span className="font-medium text-gray-800">{formatNumber(result.actualFee)}원</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">부가세</span>
                <span className="text-xs text-gray-400">(10%)</span>
              </div>
              <span className="font-medium text-gray-800">{formatNumber(result.vat)}원</span>
            </div>
          </div>

          {/* 총액 */}
          <div className="p-4 bg-teal-500 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-emerald-100 text-sm">총 중개수수료</span>
                <span className="text-teal-200 text-xs ml-1">(부가세 포함)</span>
              </div>
              <span className="text-white text-xl font-bold">{formatNumber(result.totalFee)}원</span>
            </div>
          </div>

          {/* 양쪽 부담 안내 */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            ※ 중개수수료는 매도인·매수인(또는 임대인·임차인) 각각 부담해요
          </p>
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
            <h4 className="font-medium text-gray-800 mb-1">중개수수료란?</h4>
            <p className="text-gray-600 leading-relaxed">
              부동산 거래 시 공인중개사에게 지급하는 보수예요. 법정 상한요율이 정해져 있고, 실제 수수료는 협의 가능해요.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">수수료 협상</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 상한요율은 최대 금액이에요</li>
              <li>• 실제 수수료는 협상으로 낮출 수 있어요</li>
              <li>• 0.1~0.2% 할인 협상이 일반적이에요</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-1">주의사항</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 부가세(10%)는 별도예요</li>
              <li>• 매도인·매수인 각각 지불해요</li>
              <li>• 지역에 따라 요율이 다를 수 있어요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 요율표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-gray-400 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">2026년 중개수수료 상한요율표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">주택 매매</p>
          <table className="w-full text-xs border-collapse min-w-[300px] mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">거래금액</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">상한요율</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">한도액</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">5천만원 미만</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.6%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">25만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">5천만원~2억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.5%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">80만원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">2억~9억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.4%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">9억~12억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.5%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">12억~15억</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.6%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1.5">15억 이상</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">0.7%</td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">-</td>
              </tr>
            </tbody>
          </table>

          <p className="text-xs text-gray-500">※ 오피스텔/상가/토지: 0.9% (협의)</p>
          <p className="text-xs text-gray-500">※ 전세/월세는 별도 요율 적용</p>
        </div>
      </div>

      {/* 매매가별 예상 중개수수료 비교표 */}
      <div className="border-t border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
          <h3 className="text-sm font-semibold text-gray-700">📊 매매가별 예상 중개수수료 비교표</h3>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">매매가</th>
                <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">요율</th>
                <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">수수료</th>
                <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">총액(VAT포함)</th>
                <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">1억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.5%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">50만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">55만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">소형주택 🏠</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">3억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.4%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">120만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">132만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">20평대 아파트 🏢</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">5억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.4%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">200만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">220만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">30평대 아파트 ⭐</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">7억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.4%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">280만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">308만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">40평대 중대형 🌟</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">10억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.5%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">500만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">550만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">고급 아파트 💎</td>
              </tr>
              <tr className="bg-purple-50">
                <td className="py-2 px-2 text-center font-medium border border-gray-300">15억원</td>
                <td className="py-2 px-2 text-center border border-gray-300">0.7%</td>
                <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,050만원</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">1,155만원</td>
                <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">프리미엄 🏆</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2 text-center">※ 주택 매매 기준, 매도인·매수인 각각 부담</p>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 2~9억: 0.4% 구간이 가장 저렴해요!</li>
              <li>• 9억 넘으면 요율 UP: 0.5%~0.7%로 급상승</li>
              <li>• 협상 가능: 상한요율이니 깎을 수 있어요 🤝</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
