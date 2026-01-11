"use client";

import { useState, useEffect } from "react";

type Relationship = "spouse" | "adultChild" | "minorChild" | "parent" | "sibling" | "other";

export default function InheritanceTaxCalculator() {
  // 입력값
  const [totalInheritance, setTotalInheritance] = useState<number>(1000000000); // 상속재산 총액
  const [hasSpouse, setHasSpouse] = useState<boolean>(true); // 배우자 유무
  const [childCount, setChildCount] = useState<number>(2); // 자녀 수
  const [spouseInheritance, setSpouseInheritance] = useState<number>(500000000); // 배우자 상속액
  const [debts, setDebts] = useState<number>(0); // 채무
  const [funeralCost, setFuneralCost] = useState<number>(10000000); // 장례비용

  // 결과값
  const [result, setResult] = useState({
    netInheritance: 0, // 순상속재산
    basicDeduction: 0, // 기초공제
    spouseDeduction: 0, // 배우자공제
    childDeduction: 0, // 자녀공제
    totalDeduction: 0, // 총 공제
    taxableAmount: 0, // 과세표준
    calculatedTax: 0, // 산출세액
    finalTax: 0, // 최종 세액 (신고공제 후)
    effectiveRate: 0, // 실효세율
  });

  // 세율 계산
  const calculateTax = (taxableAmount: number): number => {
    if (taxableAmount <= 0) return 0;

    // 상속세 누진세율 (증여세와 동일)
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

  // 세율 구간 반환
  const getTaxBracket = (taxableAmount: number): { rate: number; deduction: number } => {
    if (taxableAmount <= 100000000) return { rate: 10, deduction: 0 };
    if (taxableAmount <= 500000000) return { rate: 20, deduction: 10000000 };
    if (taxableAmount <= 1000000000) return { rate: 30, deduction: 60000000 };
    if (taxableAmount <= 3000000000) return { rate: 40, deduction: 160000000 };
    return { rate: 50, deduction: 460000000 };
  };

  useEffect(() => {
    // 순상속재산 = 총상속재산 - 채무 - 장례비용
    const netInheritance = totalInheritance - debts - funeralCost;

    // 기초공제: 2억원
    const basicDeduction = 200000000;

    // 인적공제
    // - 배우자공제: 법정상속분 또는 실제 상속액 중 작은 금액 (최소 5억, 최대 30억)
    let spouseDeduction = 0;
    if (hasSpouse) {
      // 법정상속분 계산 (배우자 1.5 : 자녀 각 1)
      const spouseShare = childCount > 0
        ? (1.5 / (1.5 + childCount)) * netInheritance
        : netInheritance;

      const deductionBase = Math.min(spouseInheritance, spouseShare);
      spouseDeduction = Math.max(500000000, Math.min(deductionBase, 3000000000));
    }

    // 자녀공제: 1인당 5천만원
    const childDeduction = childCount * 50000000;

    // 일괄공제: 5억원 (기초공제 + 인적공제 중 선택)
    // 대부분 일괄공제가 유리
    const itemizedDeduction = basicDeduction + childDeduction;
    const lumpSumDeduction = 500000000;

    // 배우자 공제는 별도로 적용
    const otherDeduction = Math.max(itemizedDeduction, lumpSumDeduction);
    const totalDeduction = otherDeduction + spouseDeduction;

    // 과세표준
    const taxableAmount = Math.max(netInheritance - totalDeduction, 0);

    // 산출세액
    const calculatedTax = calculateTax(taxableAmount);

    // 자진신고 공제 (3%)
    const selfReportDiscount = Math.round(calculatedTax * 0.03);
    const finalTax = Math.max(calculatedTax - selfReportDiscount, 0);

    // 실효세율
    const effectiveRate = totalInheritance > 0 ? (finalTax / totalInheritance) * 100 : 0;

    setResult({
      netInheritance,
      basicDeduction,
      spouseDeduction,
      childDeduction,
      totalDeduction,
      taxableAmount,
      calculatedTax: Math.round(calculatedTax),
      finalTax: Math.round(finalTax),
      effectiveRate,
    });
  }, [totalInheritance, hasSpouse, childCount, spouseInheritance, debts, funeralCost]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const formatManWon = (num: number): string => {
    if (num >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const man = Math.floor((num % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${formatNumber(man)}만원` : `${eok}억원`;
    }
    return `${formatNumber(Math.round(num / 10000))}만원`;
  };

  const bracket = getTaxBracket(result.taxableAmount);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
        <h2 className="text-xl font-bold text-white">상속세 계산기</h2>
        <p className="text-violet-100 text-sm mt-1">2026년 기준</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 상속재산 총액 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            상속재산 총액
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatNumber(totalInheritance)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setTotalInheritance(Number(value) || 0);
              }}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[500000000, 1000000000, 2000000000, 5000000000].map((amount) => (
              <button
                key={amount}
                onClick={() => setTotalInheritance(amount)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  totalInheritance === amount
                    ? "bg-violet-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {formatManWon(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* 가족 구성 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-neutral-700">
              배우자 생존 여부
            </label>
            <button
              onClick={() => setHasSpouse(!hasSpouse)}
              className={`w-12 h-6 rounded-full transition-all ${
                hasSpouse ? "bg-violet-500" : "bg-neutral-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-all ${
                  hasSpouse ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {hasSpouse && (
            <div className="space-y-2">
              <label className="block text-sm text-neutral-600">
                배우자 상속액
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatNumber(spouseInheritance)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setSpouseInheritance(Number(value) || 0);
                  }}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  원
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-neutral-700">
              자녀 수
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setChildCount(Math.max(0, childCount - 1))}
                className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 font-bold text-lg"
              >
                -
              </button>
              <span className="text-xl font-bold text-violet-600 w-8 text-center">
                {childCount}
              </span>
              <button
                onClick={() => setChildCount(childCount + 1)}
                className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 font-bold text-lg"
              >
                +
              </button>
              <span className="text-neutral-500">명</span>
            </div>
          </div>
        </div>

        {/* 공제 항목 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-neutral-700">
            공제 항목
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-neutral-500">채무</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatNumber(debts)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setDebts(Number(value) || 0);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">
                  원
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-500">장례비용</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatNumber(funeralCost)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setFuneralCost(Number(value) || 0);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">
                  원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 결과 영역 */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">예상 상속세</p>
            <p className="text-4xl font-bold text-violet-600">
              {formatManWon(result.finalTax)}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              실효세율: {result.effectiveRate.toFixed(2)}%
            </p>
          </div>

          <div className="border-t border-violet-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">상속재산 총액</span>
              <span className="font-medium text-neutral-700">
                {formatManWon(totalInheritance)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">채무 + 장례비용</span>
              <span className="font-medium text-red-500">
                -{formatNumber(debts + funeralCost)}원
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">순상속재산</span>
              <span className="font-medium text-neutral-700">
                {formatManWon(result.netInheritance)}
              </span>
            </div>
          </div>

          <div className="border-t border-violet-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">일괄공제</span>
              <span className="font-medium text-green-600">-5억원</span>
            </div>
            {hasSpouse && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">배우자공제</span>
                <span className="font-medium text-green-600">
                  -{formatManWon(result.spouseDeduction)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">총 공제</span>
              <span className="font-medium text-green-600">
                -{formatManWon(result.totalDeduction)}
              </span>
            </div>
          </div>

          <div className="border-t border-violet-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">과세표준</span>
              <span className="font-medium text-neutral-700">
                {formatManWon(result.taxableAmount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">
                적용세율 ({bracket.rate}%)
              </span>
              <span className="font-medium text-neutral-700">
                {formatNumber(result.calculatedTax)}원
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">자진신고 공제 (3%)</span>
              <span className="font-medium text-green-600">
                -{formatNumber(Math.round(result.calculatedTax * 0.03))}원
              </span>
            </div>
          </div>
        </div>

        {/* 세율표 */}
        <div className="bg-neutral-50 rounded-xl p-4">
          <h3 className="font-semibold text-neutral-700 mb-3">상속세 세율</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-2 text-left font-medium text-neutral-600">과세표준</th>
                  <th className="py-2 text-right font-medium text-neutral-600">세율</th>
                  <th className="py-2 text-right font-medium text-neutral-600">누진공제</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b border-neutral-100 ${result.taxableAmount <= 100000000 ? "bg-violet-50" : ""}`}>
                  <td className="py-2 text-neutral-700">1억원 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">10%</td>
                  <td className="py-2 text-right text-neutral-600">-</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${result.taxableAmount > 100000000 && result.taxableAmount <= 500000000 ? "bg-violet-50" : ""}`}>
                  <td className="py-2 text-neutral-700">5억원 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">20%</td>
                  <td className="py-2 text-right text-neutral-600">1천만원</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${result.taxableAmount > 500000000 && result.taxableAmount <= 1000000000 ? "bg-violet-50" : ""}`}>
                  <td className="py-2 text-neutral-700">10억원 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">30%</td>
                  <td className="py-2 text-right text-neutral-600">6천만원</td>
                </tr>
                <tr className={`border-b border-neutral-100 ${result.taxableAmount > 1000000000 && result.taxableAmount <= 3000000000 ? "bg-violet-50" : ""}`}>
                  <td className="py-2 text-neutral-700">30억원 이하</td>
                  <td className="py-2 text-right font-medium text-neutral-700">40%</td>
                  <td className="py-2 text-right text-neutral-600">1억 6천만원</td>
                </tr>
                <tr className={result.taxableAmount > 3000000000 ? "bg-violet-50" : ""}>
                  <td className="py-2 text-neutral-700">30억원 초과</td>
                  <td className="py-2 text-right font-medium text-neutral-700">50%</td>
                  <td className="py-2 text-right text-neutral-600">4억 6천만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 안내 */}
        <div className="text-xs text-neutral-500 space-y-1">
          <p>※ 배우자공제는 법정상속분 내에서 최소 5억~최대 30억까지 가능해요.</p>
          <p>※ 일괄공제 5억 또는 기초공제+인적공제 중 유리한 것이 적용돼요.</p>
          <p>※ 자진신고 시 산출세액의 3%를 공제받아요.</p>
          <p>※ 신고 기한: 상속개시일이 속한 달의 말일부터 6개월</p>
        </div>
      </div>
    </div>
  );
}
