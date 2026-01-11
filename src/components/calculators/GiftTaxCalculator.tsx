"use client";

import { useState, useEffect } from "react";

type Relationship = "spouse" | "adultChild" | "minorChild" | "parent" | "otherRelative" | "nonRelative";

export default function GiftTaxCalculator() {
  const [giftAmount, setGiftAmount] = useState<number>(0);
  const [relationship, setRelationship] = useState<Relationship>("adultChild");
  const [isGenerationSkip, setIsGenerationSkip] = useState<boolean>(false);
  const [previousGifts, setPreviousGifts] = useState<number>(0);

  const [exemption, setExemption] = useState<number>(0);
  const [taxBase, setTaxBase] = useState<number>(0);
  const [calculatedTax, setCalculatedTax] = useState<number>(0);
  const [generationSkipSurcharge, setGenerationSkipSurcharge] = useState<number>(0);
  const [selfReportDiscount, setSelfReportDiscount] = useState<number>(0);
  const [finalTax, setFinalTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);

  // 증여재산공제 (10년 합산)
  const getExemption = (rel: Relationship): number => {
    switch (rel) {
      case "spouse": return 600000000; // 6억
      case "adultChild": return 50000000; // 5천만원
      case "minorChild": return 20000000; // 2천만원
      case "parent": return 50000000; // 5천만원
      case "otherRelative": return 10000000; // 1천만원
      case "nonRelative": return 0;
    }
  };

  // 증여세 세율표 (누진세율)
  const calculateTax = (taxableAmount: number): number => {
    if (taxableAmount <= 0) return 0;

    if (taxableAmount <= 100000000) {
      return taxableAmount * 0.1;
    } else if (taxableAmount <= 500000000) {
      return taxableAmount * 0.2 - 10000000;
    } else if (taxableAmount <= 1000000000) {
      return taxableAmount * 0.3 - 60000000;
    } else if (taxableAmount <= 3000000000) {
      return taxableAmount * 0.4 - 160000000;
    } else {
      return taxableAmount * 0.5 - 460000000;
    }
  };

  // 세율 구간 확인
  const getTaxBracket = (taxableAmount: number): { rate: number; deduction: number } => {
    if (taxableAmount <= 100000000) {
      return { rate: 10, deduction: 0 };
    } else if (taxableAmount <= 500000000) {
      return { rate: 20, deduction: 10000000 };
    } else if (taxableAmount <= 1000000000) {
      return { rate: 30, deduction: 60000000 };
    } else if (taxableAmount <= 3000000000) {
      return { rate: 40, deduction: 160000000 };
    } else {
      return { rate: 50, deduction: 460000000 };
    }
  };

  useEffect(() => {
    if (giftAmount <= 0) {
      setExemption(0);
      setTaxBase(0);
      setCalculatedTax(0);
      setGenerationSkipSurcharge(0);
      setSelfReportDiscount(0);
      setFinalTax(0);
      setEffectiveRate(0);
      return;
    }

    // 10년간 증여 합산
    const totalGift = giftAmount + previousGifts;
    const exemptionAmount = getExemption(relationship);
    setExemption(exemptionAmount);

    // 과세표준
    const base = Math.max(0, totalGift - exemptionAmount);
    setTaxBase(base);

    // 산출세액
    const tax = calculateTax(base);
    setCalculatedTax(Math.round(tax));

    // 세대생략 가산세 (30%)
    let surcharge = 0;
    if (isGenerationSkip && base > 0) {
      surcharge = tax * 0.3;
      // 미성년자에게 20억 초과 증여 시 40%
      if (relationship === "minorChild" && totalGift > 2000000000) {
        surcharge = tax * 0.4;
      }
    }
    setGenerationSkipSurcharge(Math.round(surcharge));

    // 자진신고 공제 (3%)
    const totalBeforeDiscount = tax + surcharge;
    const discount = totalBeforeDiscount * 0.03;
    setSelfReportDiscount(Math.round(discount));

    // 최종 세액
    const final = Math.max(0, totalBeforeDiscount - discount);
    setFinalTax(Math.round(final));

    // 실효세율
    if (giftAmount > 0) {
      setEffectiveRate((final / giftAmount) * 100);
    }
  }, [giftAmount, relationship, isGenerationSkip, previousGifts]);

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

  const relationships = [
    { value: "spouse", label: "배우자", exemption: "6억원" },
    { value: "adultChild", label: "성인 자녀", exemption: "5천만원" },
    { value: "minorChild", label: "미성년 자녀", exemption: "2천만원" },
    { value: "parent", label: "부모", exemption: "5천만원" },
    { value: "otherRelative", label: "기타 친족", exemption: "1천만원" },
    { value: "nonRelative", label: "타인", exemption: "없음" },
  ];

  const taxBracket = getTaxBracket(taxBase);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">증여세 계산기</h2>
            <p className="text-emerald-100 text-sm">2026년 기준 증여세 자동 계산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 증여 관계 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">증여자와의 관계</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {relationships.map((rel) => (
              <button
                key={rel.value}
                onClick={() => setRelationship(rel.value as Relationship)}
                className={`py-3 px-2 rounded-xl font-medium transition-all text-center ${
                  relationship === rel.value
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <div className="text-sm">{rel.label}</div>
                <div className={`text-xs mt-1 ${relationship === rel.value ? "text-emerald-200" : "text-neutral-400"}`}>
                  공제 {rel.exemption}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 증여금액 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">이번 증여금액</label>
          <div className="relative">
            <input
              type="text"
              value={giftAmount > 0 ? formatNumber(giftAmount) : ""}
              onChange={(e) => setGiftAmount(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="증여금액 입력"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {giftAmount > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(giftAmount)}</p>}

          <div className="flex gap-2 mt-3">
            {[50000000, 100000000, 300000000, 500000000, 1000000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setGiftAmount(amount)}
                className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
              >
                {amount >= 100000000 ? `${amount / 100000000}억` : `${amount / 10000}만`}
              </button>
            ))}
          </div>
        </div>

        {/* 10년 내 기증여액 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            10년 내 동일인 기증여액 (선택)
          </label>
          <div className="relative">
            <input
              type="text"
              value={previousGifts > 0 ? formatNumber(previousGifts) : ""}
              onChange={(e) => setPreviousGifts(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="이전 증여금액 (없으면 0)"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">같은 사람에게 10년 내 받은 증여액을 합산해요</p>
        </div>

        {/* 세대생략 증여 */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isGenerationSkip}
              onChange={(e) => setIsGenerationSkip(e.target.checked)}
              className="w-5 h-5 text-emerald-600 border-2 border-neutral-300 rounded focus:ring-emerald-500"
            />
            <div>
              <span className="font-medium text-neutral-700">세대생략 증여</span>
              <p className="text-xs text-neutral-500">조부모→손자녀 등 세대를 건너뛴 증여 (30% 가산)</p>
            </div>
          </label>
        </div>

        {/* 결과 */}
        {giftAmount > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">증여세 계산 결과</h3>

            {/* 계산 과정 */}
            <div className="bg-white rounded-xl p-4 mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">증여재산가액</span>
                <span className="font-medium">{formatNumber(giftAmount + previousGifts)}원</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>(-) 증여재산공제</span>
                <span>-{formatNumber(exemption)}원</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2">
                <span className="font-medium">과세표준</span>
                <span className="font-bold">{formatNumber(taxBase)}원</span>
              </div>
              <div className="flex justify-between text-neutral-500 text-xs">
                <span>적용세율</span>
                <span>{taxBracket.rate}% (누진공제 {formatWon(taxBracket.deduction)})</span>
              </div>
            </div>

            {/* 세액 계산 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">산출세액</div>
                <div className="text-xl font-bold text-neutral-800">{formatNumber(calculatedTax)}원</div>
              </div>
              {isGenerationSkip && generationSkipSurcharge > 0 && (
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-neutral-500 mb-1">세대생략 가산</div>
                  <div className="text-xl font-bold text-red-500">+{formatNumber(generationSkipSurcharge)}원</div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-neutral-500">자진신고 공제 (3%)</span>
                <span className="text-green-600">-{formatNumber(selfReportDiscount)}원</span>
              </div>
            </div>

            {/* 최종 세액 */}
            <div className="bg-white rounded-xl p-5 border-2 border-emerald-300">
              <div className="text-sm text-neutral-500 mb-1">납부할 증여세</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(finalTax)}원</div>
              <div className="text-sm text-neutral-500 mt-1">{formatWon(finalTax)}</div>
              <div className="mt-2 text-sm">
                <span className="text-neutral-500">실효세율: </span>
                <span className="font-medium text-emerald-600">{effectiveRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* 세율표 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-medium text-neutral-800 mb-3">증여세 세율표</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-2 text-left text-neutral-500">과세표준</th>
                  <th className="py-2 text-right text-neutral-500">세율</th>
                  <th className="py-2 text-right text-neutral-500">누진공제</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b border-neutral-100 ${taxBase > 0 && taxBase <= 100000000 ? "bg-emerald-50" : ""}`}>
                  <td className="py-2">1억원 이하</td>
                  <td className="py-2 text-right">10%</td>
                  <td className="py-2 text-right">-</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${taxBase > 100000000 && taxBase <= 500000000 ? "bg-emerald-50" : ""}`}>
                  <td className="py-2">5억원 이하</td>
                  <td className="py-2 text-right">20%</td>
                  <td className="py-2 text-right">1,000만원</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${taxBase > 500000000 && taxBase <= 1000000000 ? "bg-emerald-50" : ""}`}>
                  <td className="py-2">10억원 이하</td>
                  <td className="py-2 text-right">30%</td>
                  <td className="py-2 text-right">6,000만원</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${taxBase > 1000000000 && taxBase <= 3000000000 ? "bg-emerald-50" : ""}`}>
                  <td className="py-2">30억원 이하</td>
                  <td className="py-2 text-right">40%</td>
                  <td className="py-2 text-right">1억 6,000만원</td>
                </tr>
                <tr className={`${taxBase > 3000000000 ? "bg-emerald-50" : ""}`}>
                  <td className="py-2">30억원 초과</td>
                  <td className="py-2 text-right">50%</td>
                  <td className="py-2 text-right">4억 6,000만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">알아두세요</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 증여일로부터 3개월 내 신고하면 3% 공제</li>
            <li>• 동일인에게 10년간 받은 증여액은 합산</li>
            <li>• 부동산 증여 시 취득세도 별도 발생</li>
          </ul>
        </div>

        {/* 성인자녀 증여 시 예상세액표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 성인자녀 증여 시 예상세액표</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">10년간 증여재산공제 5천만원 적용 (자진신고 3% 공제 포함)</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">증여금액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">과세표준</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">세율</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">예상세액</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">5천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">0원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">-</td>
                  <td className="py-2 px-2 text-center font-bold text-green-600 border border-gray-300">0원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">비과세 한도!</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">1억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">5천만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">10%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">485만원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">최저세율 적용</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">2억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">20%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">1,940만원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">아파트 한채 값</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">3억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">2.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">20%</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">3,880만원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">세금 4천 가까이</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">4.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">20%</td>
                  <td className="py-2 px-2 text-center font-bold text-amber-600 border border-gray-300">7,760만원</td>
                  <td className="py-2 px-2 text-center text-amber-600 border border-gray-300 hidden sm:table-cell">세율 상승 직전!</td>
                </tr>
                <tr className="bg-red-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">10억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">9.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">30%</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">2.27억원</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300 hidden sm:table-cell">30% 세율 적용</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">30억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">29.5억원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">40%</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">9.89억원</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300 hidden sm:table-cell">증여의 1/3이 세금</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 절세 팁</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• <strong>10년 주기</strong>로 나눠서 증여하면 공제 여러 번 적용!</li>
              <li>• 5천만원 이하는 세금 0원 (미성년은 2천만원)</li>
              <li>• 부동산보다 <strong>현금 증여</strong>가 유리한 경우 많아요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
