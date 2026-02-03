"use client";

import { useState, useCallback, useEffect } from "react";

type CalculatorType = "deposit" | "savings";
type TaxType = "taxable" | "taxFree";

export default function DepositSavingsCalculator() {
  const [calcType, setCalcType] = useState<CalculatorType>("deposit");
  const [principal, setPrincipal] = useState<number>(0); // 예금: 예치금, 적금: 월납입액
  const [rate, setRate] = useState<number>(3.5);
  const [months, setMonths] = useState<number>(12);
  const [taxType, setTaxType] = useState<TaxType>("taxable");

  const [totalPrincipal, setTotalPrincipal] = useState<number>(0);
  const [grossInterest, setGrossInterest] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [netInterest, setNetInterest] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);

  // 세율 (일반과세: 15.4%, 비과세: 0%)
  const TAX_RATE = 0.154;

  // 예금 이자 계산 (단리)
  const calculateDeposit = useCallback(() => {
    if (principal <= 0 || rate <= 0 || months <= 0) return;

    const grossInt = principal * (rate / 100) * (months / 12);
    const taxAmount = taxType === "taxable" ? grossInt * TAX_RATE : 0;
    const netInt = grossInt - taxAmount;
    const maturity = principal + netInt;

    setTotalPrincipal(principal);
    setGrossInterest(Math.round(grossInt));
    setTax(Math.round(taxAmount));
    setNetInterest(Math.round(netInt));
    setMaturityAmount(Math.round(maturity));
  }, [principal, rate, months, taxType]);

  // 적금 이자 계산 (월복리 적금 공식)
  const calculateSavings = useCallback(() => {
    if (principal <= 0 || rate <= 0 || months <= 0) return;

    // 적금 이자 공식: 월납입액 × 개월수 × (개월수+1) / 2 × 연이율 / 12
    const totalPrinc = principal * months;
    const grossInt = principal * months * (months + 1) / 2 * (rate / 100) / 12;
    const taxAmount = taxType === "taxable" ? grossInt * TAX_RATE : 0;
    const netInt = grossInt - taxAmount;
    const maturity = totalPrinc + netInt;

    setTotalPrincipal(totalPrinc);
    setGrossInterest(Math.round(grossInt));
    setTax(Math.round(taxAmount));
    setNetInterest(Math.round(netInt));
    setMaturityAmount(Math.round(maturity));
  }, [principal, rate, months, taxType]);

  useEffect(() => {
    if (calcType === "deposit") {
      calculateDeposit();
    } else {
      calculateSavings();
    }
  }, [calcType, calculateDeposit, calculateSavings]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

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

  // 강화된 스키마 (@graph 구조)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://jjyu.co.kr/w/예적금-계산기#calculator",
        "name": "예적금 계산기 - 예금/적금 이자 통합 계산",
        "alternateName": ["예금 계산기", "적금 계산기", "예금이자 계산기", "적금이자 계산기", "정기예금 계산기", "정기적금 계산기"],
        "description": "2026년 최신 예금/적금 이자를 한 번에 계산. 예치금액, 월납입액, 금리, 기간을 입력하면 세전이자, 세후이자, 만기수령액 즉시 확인. 일반과세(15.4%)와 비과세 자동 계산",
        "url": "https://jjyu.co.kr/w/예적금-계산기",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "1.0",
        "datePublished": "2026-02-03",
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "ko",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "KRW",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "정기예금 만기수령액 계산",
          "정기적금 만기수령액 계산",
          "세전이자/세후이자 자동 계산",
          "일반과세(15.4%)/비과세 선택",
          "실시간 결과 표시",
          "금리별 비교표 제공"
        ],
        "screenshot": "https://jjyu.co.kr/images/calculators/deposit-savings-calculator.png",
        "author": {
          "@type": "Organization",
          "name": "머니위키",
          "url": "https://jjyu.co.kr"
        },
        "provider": {
          "@type": "Organization",
          "name": "머니위키",
          "url": "https://jjyu.co.kr",
          "logo": "https://jjyu.co.kr/logo.png"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "예금과 적금의 이자 계산 방식이 다른가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "네, 다릅니다. 예금은 목돈을 한 번에 예치하므로 '원금 × 금리 × 기간'으로 단순 계산합니다. 적금은 매월 납입하므로 첫 달 납입금은 12개월치 이자, 마지막 달 납입금은 1개월치 이자만 받아 평균 (n+1)/2 방식으로 계산합니다."
            }
          },
          {
            "@type": "Question",
            "name": "예금 이자에 세금이 얼마나 붙나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "일반과세 시 이자소득세 14% + 지방소득세 1.4% = 총 15.4%가 원천징수됩니다. 비과세 종합저축(만 65세 이상, 장애인 등)은 5천만원까지 비과세 혜택을 받을 수 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "2026년 예금 금리는 어느 정도인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "2026년 1월 기준 시중은행 정기예금 금리는 연 3.0~3.8% 수준이며, 저축은행은 4.0~4.5%까지도 가능합니다. 특판 상품이나 우대금리 적용 시 더 높은 금리를 받을 수 있습니다."
            }
          }
        ]
      },
      {
        "@type": "FinancialProduct",
        "name": "정기예금/정기적금",
        "description": "목돈을 일정 기간 예치하거나 매월 일정 금액을 적립하여 이자를 받는 저축 상품",
        "provider": {
          "@type": "Organization",
          "name": "금융감독원",
          "url": "https://www.fss.or.kr"
        },
        "feesAndCommissionsSpecification": "이자소득세 15.4% (비과세 종합저축 제외)"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">예적금 계산기</h2>
              <p className="text-blue-100 text-sm">예금/적금 이자 한 번에 계산</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* 예금/적금 탭 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { setCalcType("deposit"); setPrincipal(0); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                calcType === "deposit"
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <div className="text-sm">예금</div>
              <div className={`text-xs mt-0.5 ${calcType === "deposit" ? "text-blue-200" : "text-neutral-400"}`}>
                목돈 예치
              </div>
            </button>
            <button
              onClick={() => { setCalcType("savings"); setPrincipal(0); }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                calcType === "savings"
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <div className="text-sm">적금</div>
              <div className={`text-xs mt-0.5 ${calcType === "savings" ? "text-blue-200" : "text-neutral-400"}`}>
                매월 적립
              </div>
            </button>
          </div>

          {/* 금액 입력 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {calcType === "deposit" ? "예치금액" : "월 납입액"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={principal > 0 ? formatNumber(principal) : ""}
                onChange={(e) => setPrincipal(parseInt(e.target.value.replace(/,/g, "")) || 0)}
                placeholder={calcType === "deposit" ? "예치할 금액" : "매월 납입할 금액"}
                className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:ring-0 text-right pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
            </div>
            {principal > 0 && <p className="mt-1 text-sm text-blue-600">{formatWon(principal)}</p>}

            <div className="flex gap-2 mt-3">
              {calcType === "deposit" ? (
                // 예금 금액 버튼
                [10000000, 30000000, 50000000, 100000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPrincipal(amount)}
                    className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                  >
                    {amount >= 100000000 ? `${amount / 100000000}억` : `${amount / 10000}만`}
                  </button>
                ))
              ) : (
                // 적금 금액 버튼
                [100000, 300000, 500000, 1000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPrincipal(amount)}
                    className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                  >
                    {amount / 10000}만
                  </button>
                ))
              )}
              <button
                onClick={() => setPrincipal(0)}
                className="py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-sm font-medium"
              >
                C
              </button>
            </div>
          </div>

          {/* 금리/기간 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">연 금리 (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                step="0.1"
                min="0"
                max="20"
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">기간</label>
              <select
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-blue-500"
              >
                {[6, 12, 24, 36].map((m) => (
                  <option key={m} value={m}>{m}개월 ({m / 12}년)</option>
                ))}
              </select>
            </div>
          </div>

          {/* 과세구분 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">과세 구분</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTaxType("taxable")}
                className={`py-3 rounded-xl font-medium transition-all ${
                  taxType === "taxable"
                    ? "bg-amber-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">일반과세</div>
                <div className={`text-xs ${taxType === "taxable" ? "text-amber-200" : "text-neutral-400"}`}>
                  세금 15.4%
                </div>
              </button>
              <button
                onClick={() => setTaxType("taxFree")}
                className={`py-3 rounded-xl font-medium transition-all ${
                  taxType === "taxFree"
                    ? "bg-green-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">비과세</div>
                <div className={`text-xs ${taxType === "taxFree" ? "text-green-200" : "text-neutral-400"}`}>
                  세금 0%
                </div>
              </button>
            </div>
          </div>

          {/* 결과 */}
          {principal > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-4">
                {calcType === "deposit" ? "예금" : "적금"} 만기 예상
              </h3>

              <div className="bg-white rounded-xl p-4 mb-4 text-center">
                <div className="text-sm text-neutral-500 mb-1">만기 수령액</div>
                <div className="text-3xl font-bold text-blue-600">{formatNumber(maturityAmount)}원</div>
                <div className="text-sm text-neutral-500 mt-1">{formatWon(maturityAmount)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-neutral-500 mb-1">
                    {calcType === "deposit" ? "예치 원금" : "총 납입액"}
                  </div>
                  <div className="font-bold text-neutral-800">{formatNumber(totalPrincipal)}원</div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-neutral-500 mb-1">세전 이자</div>
                  <div className="font-bold text-neutral-800">{formatNumber(grossInterest)}원</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-neutral-500 mb-1">
                    세금 ({taxType === "taxable" ? "15.4%" : "0%"})
                  </div>
                  <div className={`font-bold ${taxType === "taxable" ? "text-red-500" : "text-green-500"}`}>
                    -{formatNumber(tax)}원
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <div className="text-xs text-neutral-500 mb-1">세후 이자</div>
                  <div className="font-bold text-green-600">{formatNumber(netInterest)}원</div>
                </div>
              </div>

              {/* 수익 요약 */}
              <div className="mt-4 p-3 bg-white rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">실질 수익률</span>
                  <span className="font-bold text-blue-600">
                    {totalPrincipal > 0 ? ((netInterest / totalPrincipal) * 100).toFixed(2) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-neutral-600">월평균 이자</span>
                  <span className="font-medium text-neutral-800">
                    {formatNumber(Math.round(netInterest / months))}원
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 예금/적금 비교표 */}
          <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-3 text-center">
              📊 금리별 {calcType === "deposit" ? "예금" : "적금"} 이자 비교
            </h4>
            <p className="text-xs text-neutral-500 mb-4 text-center">
              {calcType === "deposit"
                ? "1억원 예치, 12개월 기준 (일반과세)"
                : "월 100만원 적립, 12개월 기준 (일반과세)"}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-100 border-b-2 border-blue-300">
                    <th className="py-2 px-2 text-center text-blue-700 font-bold border border-gray-300">금리</th>
                    <th className="py-2 px-2 text-center text-blue-700 font-bold border border-gray-300">세전이자</th>
                    <th className="py-2 px-2 text-center text-blue-700 font-bold border border-gray-300">세후이자</th>
                    <th className="py-2 px-2 text-center text-blue-700 font-bold border border-gray-300">만기수령액</th>
                  </tr>
                </thead>
                <tbody>
                  {calcType === "deposit" ? (
                    // 예금 비교표 (1억원, 12개월)
                    <>
                      <tr className="border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-medium text-green-600 border border-gray-300">3.0%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">300만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">254만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1억254만원</td>
                      </tr>
                      <tr className="bg-blue-50 border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-bold text-blue-700 border border-gray-300">3.5%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">350만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">296만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1억296만원</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-medium text-amber-600 border border-gray-300">4.0%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">400만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">338만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1억338만원</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">4.5%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">450만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">381만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1억381만원</td>
                      </tr>
                    </>
                  ) : (
                    // 적금 비교표 (월 100만원, 12개월)
                    <>
                      <tr className="border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-medium text-green-600 border border-gray-300">3.0%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">19.5만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">16.5만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1,216만원</td>
                      </tr>
                      <tr className="bg-blue-50 border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-bold text-blue-700 border border-gray-300">3.5%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">22.8만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">19.2만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1,219만원</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-2 px-2 text-center font-medium text-amber-600 border border-gray-300">4.0%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">26만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">22만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1,222만원</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">4.5%</td>
                        <td className="py-2 px-2 text-center border border-gray-300">29.3만원</td>
                        <td className="py-2 px-2 text-center border border-gray-300">24.7만원</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-600 border border-gray-300">1,225만원</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-xs text-blue-800 font-medium">💡 알아두세요</p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                {calcType === "deposit" ? (
                  <>
                    <li>• 금리 1% 차이 = 1억당 연 <strong>84.6만원</strong> 이자 차이 (세후)</li>
                    <li>• 저축은행이 시중은행보다 금리가 0.5~1% 높아요</li>
                  </>
                ) : (
                  <>
                    <li>• 적금은 매월 납입하므로 예금보다 이자가 적어요</li>
                    <li>• 첫 달 납입금만 12개월치 이자, 마지막 달은 1개월치만!</li>
                  </>
                )}
                <li>• 비과세 종합저축(65세↑, 장애인)은 5천만원까지 세금 0%</li>
              </ul>
            </div>
          </div>

          {/* 안내 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              예금 vs 적금 차이
            </h4>
            <ul className="text-sm text-blue-700 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span><strong>예금:</strong> 목돈을 한 번에 예치 → 전체 기간 이자 발생</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span><strong>적금:</strong> 매월 일정 금액 납입 → 평균 이자 발생</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">⚠</span>
                <span>같은 금액이면 <strong>예금 이자가 약 2배</strong> 더 많아요</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-600">
                📌 출처: <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">금융감독원</a> · <a href="https://finlife.fss.or.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">금융상품한눈에</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
