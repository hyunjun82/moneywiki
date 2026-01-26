"use client";

import { useState, useCallback, useEffect } from "react";

interface DeductionResult {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeduction: number;
  netSalary: number;
  monthlyNet: number;
}

type TableType = "annual" | "monthly";

export default function NetSalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [nonTaxable, setNonTaxable] = useState<number>(200000); // 비과세 (식대 등)
  const [result, setResult] = useState<DeductionResult | null>(null);
  const [tableType, setTableType] = useState<TableType>("annual");

  // 4대보험 요율 (2026년 기준, 2026.1.1 시행)
  const RATES = {
    nationalPension: 0.0475, // 국민연금 4.75%
    healthInsurance: 0.03595, // 건강보험 3.595%
    longTermCareRate: 0.1314, // 장기요양보험 (건강보험의 13.14%)
    employmentInsurance: 0.009, // 고용보험 0.9%
  };

  // 간이세액표 기반 근로소득세 계산 (2026년 기준)
  const calculateIncomeTax = useCallback((monthlyTaxable: number, deps: number): number => {
    // 과세표준 계산
    const annualTaxable = monthlyTaxable * 12;

    // 근로소득공제
    let incomeDeduction = 0;
    if (annualTaxable <= 5000000) {
      incomeDeduction = annualTaxable * 0.7;
    } else if (annualTaxable <= 15000000) {
      incomeDeduction = 3500000 + (annualTaxable - 5000000) * 0.4;
    } else if (annualTaxable <= 45000000) {
      incomeDeduction = 7500000 + (annualTaxable - 15000000) * 0.15;
    } else if (annualTaxable <= 100000000) {
      incomeDeduction = 12000000 + (annualTaxable - 45000000) * 0.05;
    } else {
      incomeDeduction = 14750000 + (annualTaxable - 100000000) * 0.02;
    }

    // 인적공제 (본인 150만원 + 부양가족 1인당 150만원)
    const personalDeduction = deps * 1500000;

    // 표준공제
    const standardDeduction = 1300000;

    // 특별소득공제 (4대보험료 근로자부담분 추정)
    const estimatedInsurance = annualTaxable * 0.0935; // 약 9.35%

    // 과세표준
    const taxBase = Math.max(0, annualTaxable - incomeDeduction - personalDeduction - standardDeduction - estimatedInsurance);

    // 산출세액 (누진세율)
    let tax = 0;
    if (taxBase <= 14000000) {
      tax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      tax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      tax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      tax = 15360000 + (taxBase - 88000000) * 0.35;
    } else if (taxBase <= 300000000) {
      tax = 37060000 + (taxBase - 150000000) * 0.38;
    } else if (taxBase <= 500000000) {
      tax = 94060000 + (taxBase - 300000000) * 0.40;
    } else if (taxBase <= 1000000000) {
      tax = 174060000 + (taxBase - 500000000) * 0.42;
    } else {
      tax = 384060000 + (taxBase - 1000000000) * 0.45;
    }

    // 근로소득세액공제 (산출세액에서 공제)
    let taxCredit = 0;
    if (tax <= 1300000) {
      taxCredit = tax * 0.55;
    } else {
      taxCredit = 715000 + (tax - 1300000) * 0.30;
    }
    // 근로소득세액공제 한도 (총급여 기준)
    if (annualTaxable <= 33000000) {
      taxCredit = Math.min(taxCredit, 740000);
    } else if (annualTaxable <= 70000000) {
      taxCredit = Math.min(taxCredit, 740000 - (annualTaxable - 33000000) * 0.008);
      taxCredit = Math.max(taxCredit, 660000);
    } else {
      taxCredit = Math.min(taxCredit, 660000 - (annualTaxable - 70000000) * 0.5);
      taxCredit = Math.max(taxCredit, 500000);
    }

    // 결정세액
    const finalTax = Math.max(0, tax - taxCredit);

    return Math.round(finalTax / 12); // 월 소득세
  }, []);

  // 계산
  useEffect(() => {
    if (annualSalary <= 0) {
      setResult(null);
      return;
    }

    const monthlySalary = annualSalary / 12;
    const monthlyTaxable = monthlySalary - nonTaxable;

    // 4대보험 (월급 기준)
    const nationalPension = Math.min(monthlyTaxable * RATES.nationalPension, 302575); // 상한액 (637만원 × 4.75%)
    const healthInsurance = monthlyTaxable * RATES.healthInsurance;
    const longTermCare = healthInsurance * RATES.longTermCareRate;
    const employmentInsurance = monthlyTaxable * RATES.employmentInsurance;

    // 소득세
    const incomeTax = calculateIncomeTax(monthlyTaxable, dependents + children);
    const localIncomeTax = Math.round(incomeTax * 0.1); // 지방소득세 (소득세의 10%)

    const totalDeduction = nationalPension + healthInsurance + longTermCare +
                          employmentInsurance + incomeTax + localIncomeTax;
    const monthlyNet = monthlySalary - totalDeduction;

    setResult({
      nationalPension: Math.round(nationalPension),
      healthInsurance: Math.round(healthInsurance),
      longTermCare: Math.round(longTermCare),
      employmentInsurance: Math.round(employmentInsurance),
      incomeTax: Math.round(incomeTax),
      localIncomeTax: Math.round(localIncomeTax),
      totalDeduction: Math.round(totalDeduction),
      netSalary: Math.round(monthlyNet * 12),
      monthlyNet: Math.round(monthlyNet),
    });
  }, [annualSalary, dependents, children, nonTaxable, calculateIncomeTax]);

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

  const handleQuickSalary = (amount: number) => setAnnualSalary(amount);

  // 연봉 기준 실수령액 표 데이터
  const annualSalaryData = [
    { annual: "1,000만", monthly: "83만", insurance: "7만", tax: "0.3만", netPay: "76만", rate: "92%", note: "최저 구간" },
    { annual: "1,500만", monthly: "125만", insurance: "11만", tax: "1만", netPay: "113만", rate: "90%", note: "최저임금 수준" },
    { annual: "2,000만", monthly: "167만", insurance: "15만", tax: "2만", netPay: "150만", rate: "90%", note: "저소득 구간" },
    { annual: "2,500만", monthly: "208만", insurance: "19만", tax: "3만", netPay: "186만", rate: "89%", note: "저소득 구간" },
    { annual: "3,000만", monthly: "250만", insurance: "22만", tax: "3만", netPay: "224만", rate: "90%", note: "사회초년생 👶", highlight: true },
    { annual: "3,500만", monthly: "292만", insurance: "26만", tax: "7만", netPay: "259만", rate: "89%", note: "2~3년차" },
    { annual: "4,000만", monthly: "333만", insurance: "30만", tax: "10만", netPay: "293만", rate: "88%", note: "3~5년차 평균 💼", highlight: true },
    { annual: "4,500만", monthly: "375만", insurance: "34만", tax: "15만", netPay: "326만", rate: "87%", note: "중소기업 평균" },
    { annual: "5,000만", monthly: "417만", insurance: "39만", tax: "21만", netPay: "357만", rate: "86%", note: "대기업 초봉 🏢", highlight: true },
    { annual: "5,500만", monthly: "458만", insurance: "43만", tax: "26만", netPay: "389만", rate: "85%", note: "대기업 3년차" },
    { annual: "6,000만", monthly: "500만", insurance: "47만", tax: "33만", netPay: "420만", rate: "84%", note: "과장급 평균 ⭐", highlight: true },
    { annual: "6,500만", monthly: "542만", insurance: "51만", tax: "40만", netPay: "451만", rate: "83%", note: "과장급" },
    { annual: "7,000만", monthly: "583만", insurance: "55만", tax: "47만", netPay: "481만", rate: "82%", note: "차부장급" },
    { annual: "7,500만", monthly: "625만", insurance: "58만", tax: "54만", netPay: "513만", rate: "82%", note: "차부장급" },
    { annual: "8,000만", monthly: "667만", insurance: "62만", tax: "61만", netPay: "543만", rate: "81%", note: "차부장급 💎", highlight: true },
    { annual: "8,500만", monthly: "708만", insurance: "66만", tax: "69만", netPay: "573만", rate: "81%", note: "부장급" },
    { annual: "9,000만", monthly: "750만", insurance: "70만", tax: "77만", netPay: "603만", rate: "80%", note: "부장급" },
    { annual: "9,500만", monthly: "792만", insurance: "73만", tax: "86만", netPay: "632만", rate: "80%", note: "부장급" },
    { annual: "1억", monthly: "833만", insurance: "71만", tax: "99만", netPay: "664만", rate: "80%", note: "억대연봉! 🎯", highlight: true },
    { annual: "1.1억", monthly: "917만", insurance: "76만", tax: "117만", netPay: "724만", rate: "79%", note: "임원급" },
    { annual: "1.2억", monthly: "1,000만", insurance: "80만", tax: "136만", netPay: "784만", rate: "78%", note: "임원급" },
    { annual: "1.3억", monthly: "1,083만", insurance: "84만", tax: "156만", netPay: "843만", rate: "77%", note: "임원급" },
    { annual: "1.4억", monthly: "1,167만", insurance: "88만", tax: "177만", netPay: "902만", rate: "77%", note: "임원급" },
    { annual: "1.5억", monthly: "1,250만", insurance: "91만", tax: "224만", netPay: "935만", rate: "75%", note: "임원급 🏆", highlight: true },
    { annual: "2억", monthly: "1,667만", insurance: "107만", tax: "382만", netPay: "1,178만", rate: "71%", note: "최고경영진" },
  ];

  // 월급 기준 실수령액 표 데이터
  const monthlySalaryData = [
    { monthly: "100만", netPay: "92만", insurance: "7만", tax: "0.3만", rate: "92%", note: "최저 구간" },
    { monthly: "150만", netPay: "136만", insurance: "13만", tax: "1만", rate: "91%", note: "최저임금" },
    { monthly: "200만", netPay: "180만", insurance: "18만", tax: "2만", rate: "90%", note: "저소득" },
    { monthly: "250만", netPay: "224만", insurance: "22만", tax: "3만", rate: "90%", note: "사회초년생 👶", highlight: true },
    { monthly: "300만", netPay: "269만", insurance: "27만", tax: "4만", rate: "90%", note: "중소기업 평균 💼", highlight: true },
    { monthly: "350만", netPay: "311만", insurance: "32만", tax: "7만", rate: "89%", note: "3~5년차" },
    { monthly: "400만", netPay: "353만", insurance: "37만", tax: "10만", rate: "88%", note: "대기업 초봉 🏢", highlight: true },
    { monthly: "450만", netPay: "394만", insurance: "42만", tax: "14만", rate: "88%", note: "대기업 3년차" },
    { monthly: "500만", netPay: "420만", insurance: "47만", tax: "33만", rate: "84%", note: "과장급 평균 ⭐", highlight: true },
    { monthly: "550만", netPay: "460만", insurance: "51만", tax: "39만", rate: "84%", note: "과장급" },
    { monthly: "600만", netPay: "499만", insurance: "56만", tax: "45만", rate: "83%", note: "차부장급" },
    { monthly: "650만", netPay: "537만", insurance: "60만", tax: "52만", rate: "83%", note: "차부장급 💎", highlight: true },
    { monthly: "700만", netPay: "574만", insurance: "65만", tax: "61만", rate: "82%", note: "부장급" },
    { monthly: "750만", netPay: "603만", insurance: "70만", tax: "77만", rate: "80%", note: "부장급" },
    { monthly: "800만", netPay: "654만", insurance: "69만", tax: "78만", rate: "82%", note: "억대연봉 🎯", highlight: true },
    { monthly: "900만", netPay: "716만", insurance: "75만", tax: "109만", rate: "80%", note: "임원급" },
    { monthly: "1,000만", netPay: "777만", insurance: "80만", tax: "143만", rate: "78%", note: "임원급 🏆", highlight: true },
    { monthly: "1,200만", netPay: "895만", insurance: "87만", tax: "218만", rate: "75%", note: "최고경영진" },
    { monthly: "1,500만", netPay: "1,083만", insurance: "97만", tax: "320만", rate: "72%", note: "CEO급" },
    { monthly: "2,000만", netPay: "1,383만", insurance: "108만", tax: "509만", rate: "69%", note: "최상위" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">연봉 실수령액 계산기</h2>
            <p className="text-emerald-100 text-sm">4대보험, 소득세 공제 후 실수령액</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 연봉 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">연봉 (세전)</label>
          <div className="relative">
            <input
              type="text"
              value={annualSalary > 0 ? formatNumber(annualSalary) : ""}
              onChange={(e) => setAnnualSalary(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder="연봉을 입력하세요"
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>
          {annualSalary > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(annualSalary)}</p>}

          <div className="flex gap-2 mt-3">
            <button onClick={() => handleQuickSalary(30000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">3천만</button>
            <button onClick={() => handleQuickSalary(40000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">4천만</button>
            <button onClick={() => handleQuickSalary(50000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">5천만</button>
            <button onClick={() => handleQuickSalary(60000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">6천만</button>
            <button onClick={() => handleQuickSalary(80000000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">8천만</button>
            <button onClick={() => setAnnualSalary(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        {/* 부양가족/비과세 설정 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">부양가족 (본인 포함)</label>
            <select
              value={dependents}
              onChange={(e) => setDependents(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">20세 이하 자녀</label>
            <select
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">비과세액 (월)</label>
            <select
              value={nonTaxable}
              onChange={(e) => setNonTaxable(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              <option value={0}>없음</option>
              <option value={100000}>10만원</option>
              <option value={200000}>20만원</option>
              <option value={300000}>30만원</option>
            </select>
          </div>
        </div>

        {/* 결과 */}
        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">실수령액</h3>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="text-sm text-neutral-500 mb-1">월 실수령액</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(result.monthlyNet)}원</div>
              <div className="text-sm text-neutral-500 mt-1">{formatWon(result.monthlyNet)}</div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="text-sm text-neutral-500 mb-1">연간 실수령액</div>
              <div className="text-2xl font-bold text-neutral-800">{formatNumber(result.netSalary)}원</div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-neutral-700 mb-3">월 공제 내역</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">국민연금</span>
                  <span className="font-medium">-{formatNumber(result.nationalPension)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">건강보험</span>
                  <span className="font-medium">-{formatNumber(result.healthInsurance)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">장기요양보험</span>
                  <span className="font-medium">-{formatNumber(result.longTermCare)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">고용보험</span>
                  <span className="font-medium">-{formatNumber(result.employmentInsurance)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">소득세</span>
                  <span className="font-medium">-{formatNumber(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">지방소득세</span>
                  <span className="font-medium">-{formatNumber(result.localIncomeTax)}원</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-700">총 공제액</span>
                  <span className="font-bold text-red-600">-{formatNumber(result.totalDeduction)}원</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 안내 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">이용안내</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 2026년 4대보험 요율 기준으로 계산해요</li>
            <li>• 실제 공제액은 회사 정책에 따라 다를 수 있어요</li>
            <li>• 비과세 항목은 식대, 차량유지비 등이에요</li>
          </ul>
        </div>

        {/* 실수령액 비교표 - 탭 전환 */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-4 text-center">📊 2026년 실수령액 비교표</h4>

          {/* Segmented Control 탭 */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-neutral-200 rounded-full p-1">
              <button
                onClick={() => setTableType("annual")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  tableType === "annual"
                    ? "bg-[#00C896] text-white shadow-md"
                    : "bg-transparent text-neutral-600"
                }`}
              >
                연봉 기준 표
              </button>
              <button
                onClick={() => setTableType("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  tableType === "monthly"
                    ? "bg-[#00C896] text-white shadow-md"
                    : "bg-transparent text-neutral-600"
                }`}
              >
                월급 기준 표
              </button>
            </div>
          </div>

          {/* 광고 영역 */}
          <div className="mb-4 min-h-[90px] bg-neutral-100 rounded-xl flex items-center justify-center">
            <p className="text-neutral-400 text-sm">광고 영역</p>
          </div>

          {/* 표 내용 - 조건부 렌더링 */}
          <div className="overflow-x-auto">
            {tableType === "annual" ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">연봉</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월급</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">4대보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">소득세</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령액</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                  </tr>
                </thead>
                <tbody>
                  {annualSalaryData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? "bg-green-50" : "bg-white"}>
                      <td className="py-2 px-2 text-center font-medium border border-gray-300">{row.annual}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300">{row.monthly}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.insurance}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.tax}원</td>
                      <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">{row.netPay}원</td>
                      <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월급</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령액</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">4대보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">소득세</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령률</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">한줄평</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySalaryData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? "bg-green-50" : "bg-white"}>
                      <td className="py-2 px-2 text-center font-medium border border-gray-300">{row.monthly}원</td>
                      <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">{row.netPay}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.insurance}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.tax}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300">{row.rate}</td>
                      <td className="py-2 px-2 text-center text-xs text-gray-600 border border-gray-300 hidden md:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">※ 부양가족 1인(본인), 비과세 20만원 기준 | 실제 금액은 상황에 따라 달라질 수 있음</p>

          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 연봉 ↑ → 세율 ↑ (누진세): 고소득일수록 실수령 비율 ↓</li>
              <li>• 4대보험은 고정비율, 소득세는 누진세율 적용</li>
              <li>• 부양가족 많으면 소득세 ↓ / 비과세 항목 챙기기!</li>
              <li>• 국민연금 상한액(월 302,575원) 적용으로 고소득자 4대보험율 ↓</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
