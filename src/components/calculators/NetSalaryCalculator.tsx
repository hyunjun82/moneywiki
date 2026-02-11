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

  // 연봉 기준 실수령액 표 데이터 (2026년 기준)
  const annualSalaryData = [
    // 1,000만원 ~ 3,000만원 (100만원 단위)
    { annual: "1,000만", netPay: "771,790", total: "61,543", pension: "30,083", health: "22,768", longTerm: "2,992", employ: "5,700", income: "0", local: "0" },
    { annual: "1,100만", netPay: "846,887", total: "69,780", pension: "34,042", health: "25,764", longTerm: "3,385", employ: "6,450", income: "126", local: "13" },
    { annual: "1,200만", netPay: "920,869", total: "79,131", pension: "38,000", health: "28,760", longTerm: "3,779", employ: "7,200", income: "1,265", local: "127" },
    { annual: "1,300만", netPay: "994,850", total: "88,483", pension: "41,958", health: "31,756", longTerm: "4,173", employ: "7,950", income: "2,405", local: "241" },
    { annual: "1,400만", netPay: "1,068,832", total: "97,835", pension: "45,917", health: "34,752", longTerm: "4,566", employ: "8,700", income: "3,545", local: "355" },
    { annual: "1,500만", netPay: "1,142,815", total: "107,185", pension: "49,875", health: "37,748", longTerm: "4,960", employ: "9,450", income: "4,684", local: "468" },
    { annual: "1,600만", netPay: "1,216,797", total: "116,536", pension: "53,833", health: "40,743", longTerm: "5,354", employ: "10,200", income: "5,824", local: "582" },
    { annual: "1,700만", netPay: "1,290,779", total: "125,888", pension: "57,792", health: "43,739", longTerm: "5,747", employ: "10,950", income: "6,964", local: "696" },
    { annual: "1,800만", netPay: "1,364,389", total: "135,611", pension: "61,750", health: "46,735", longTerm: "6,141", employ: "11,700", income: "8,441", local: "844" },
    { annual: "1,900만", netPay: "1,437,752", total: "145,581", pension: "65,708", health: "49,731", longTerm: "6,535", employ: "12,450", income: "10,143", local: "1,014" },
    { annual: "2,000만", netPay: "1,511,115", total: "155,552", pension: "69,667", health: "52,727", longTerm: "6,928", employ: "13,200", income: "11,845", local: "1,185" },
    { annual: "2,100만", netPay: "1,584,478", total: "165,522", pension: "73,625", health: "55,723", longTerm: "7,322", employ: "13,950", income: "13,547", local: "1,355" },
    { annual: "2,200만", netPay: "1,657,842", total: "175,491", pension: "77,583", health: "58,718", longTerm: "7,716", employ: "14,700", income: "15,249", local: "1,525" },
    { annual: "2,300만", netPay: "1,731,206", total: "185,461", pension: "81,542", health: "61,714", longTerm: "8,109", employ: "15,450", income: "16,951", local: "1,695" },
    { annual: "2,400만", netPay: "1,804,569", total: "195,431", pension: "85,500", health: "64,710", longTerm: "8,503", employ: "16,200", income: "18,653", local: "1,865" },
    { annual: "2,500만", netPay: "1,877,930", total: "205,403", pension: "89,458", health: "67,706", longTerm: "8,897", employ: "16,950", income: "20,356", local: "2,036" },
    { annual: "2,600만", netPay: "1,951,294", total: "215,373", pension: "93,417", health: "70,702", longTerm: "9,290", employ: "17,700", income: "22,058", local: "2,206" },
    { annual: "2,700만", netPay: "2,024,657", total: "225,343", pension: "97,375", health: "73,698", longTerm: "9,684", employ: "18,450", income: "23,760", local: "2,376" },
    { annual: "2,800만", netPay: "2,098,021", total: "235,312", pension: "101,333", health: "76,693", longTerm: "10,078", employ: "19,200", income: "25,462", local: "2,546" },
    { annual: "2,900만", netPay: "2,171,385", total: "245,282", pension: "105,292", health: "79,689", longTerm: "10,471", employ: "19,950", income: "27,164", local: "2,716" },
    // 3,000만원 ~ 5,000만원
    { annual: "3,000만", netPay: "2,244,747", total: "255,253", pension: "109,250", health: "82,685", longTerm: "10,865", employ: "20,700", income: "28,866", local: "2,887", highlight: true },
    { annual: "3,500만", netPay: "2,601,867", total: "314,800", pension: "129,042", health: "97,664", longTerm: "12,833", employ: "24,450", income: "46,192", local: "4,619" },
    { annual: "4,000만", netPay: "2,928,393", total: "404,940", pension: "148,833", health: "112,643", longTerm: "14,801", employ: "28,200", income: "91,330", local: "9,133", highlight: true },
    { annual: "4,500만", netPay: "3,248,892", total: "501,108", pension: "168,625", health: "127,623", longTerm: "16,770", employ: "31,950", income: "141,945", local: "14,195" },
    { annual: "5,000만", netPay: "3,569,193", total: "597,474", pension: "188,417", health: "142,602", longTerm: "18,738", employ: "35,700", income: "192,743", local: "19,274", highlight: true },
    // 5,000만원 ~ 10,000만원
    { annual: "5,500만", netPay: "3,886,487", total: "696,846", pension: "208,208", health: "157,581", longTerm: "20,706", employ: "39,450", income: "246,274", local: "24,627" },
    { annual: "6,000만", netPay: "4,203,780", total: "796,220", pension: "228,000", health: "172,560", longTerm: "22,674", employ: "43,200", income: "299,805", local: "29,981", highlight: true },
    { annual: "6,500만", netPay: "4,521,073", total: "895,594", pension: "247,792", health: "187,539", longTerm: "24,643", employ: "46,950", income: "353,336", local: "35,334" },
    { annual: "7,000만", netPay: "4,838,366", total: "994,967", pension: "267,583", health: "202,518", longTerm: "26,611", employ: "50,700", income: "406,868", local: "40,687" },
    { annual: "7,500만", netPay: "5,140,993", total: "1,109,007", pension: "287,375", health: "217,498", longTerm: "28,579", employ: "54,450", income: "473,732", local: "47,373" },
    { annual: "8,000만", netPay: "5,430,585", total: "1,236,082", pension: "302,575", health: "232,477", longTerm: "30,547", employ: "58,200", income: "556,621", local: "55,662", highlight: true },
    { annual: "8,500만", netPay: "5,732,338", total: "1,350,995", pension: "302,575", health: "247,456", longTerm: "32,516", employ: "61,950", income: "642,271", local: "64,227" },
    { annual: "9,000만", netPay: "6,034,093", total: "1,465,907", pension: "302,575", health: "262,435", longTerm: "34,484", employ: "65,700", income: "727,921", local: "72,792" },
    { annual: "9,500만", netPay: "6,335,848", total: "1,580,819", pension: "302,575", health: "277,414", longTerm: "36,452", employ: "69,450", income: "813,571", local: "81,357" },
    { annual: "1억", netPay: "6,637,602", total: "1,695,731", pension: "302,575", health: "292,393", longTerm: "38,420", employ: "73,200", income: "899,221", local: "89,922", highlight: true },
    // 10,000만원 ~ 15,000만원
    { annual: "10,500만", netPay: "6,937,639", total: "1,812,361", pension: "302,575", health: "307,373", longTerm: "40,389", employ: "76,950", income: "986,431", local: "98,643" },
    { annual: "11,000만", netPay: "7,236,094", total: "1,930,573", pension: "302,575", health: "322,352", longTerm: "42,357", employ: "80,700", income: "1,075,081", local: "107,508" },
    { annual: "11,500만", netPay: "7,534,548", total: "2,048,785", pension: "302,575", health: "337,331", longTerm: "44,325", employ: "84,450", income: "1,163,731", local: "116,373" },
    { annual: "12,000만", netPay: "7,825,919", total: "2,174,081", pension: "302,575", health: "352,310", longTerm: "46,294", employ: "88,200", income: "1,258,820", local: "125,882" },
    { annual: "12,500만", netPay: "8,079,680", total: "2,336,987", pension: "302,575", health: "367,289", longTerm: "48,262", employ: "91,950", income: "1,388,101", local: "138,810" },
    { annual: "13,000만", netPay: "8,333,439", total: "2,499,894", pension: "302,575", health: "382,268", longTerm: "50,230", employ: "95,700", income: "1,517,383", local: "151,738" },
    { annual: "13,500만", netPay: "8,587,199", total: "2,662,801", pension: "302,575", health: "397,248", longTerm: "52,198", employ: "99,450", income: "1,646,664", local: "164,666" },
    { annual: "14,000만", netPay: "8,840,958", total: "2,825,709", pension: "302,575", health: "412,227", longTerm: "54,167", employ: "103,200", income: "1,775,945", local: "177,595" },
    { annual: "14,500만", netPay: "9,094,718", total: "2,988,615", pension: "302,575", health: "427,206", longTerm: "56,135", employ: "106,950", income: "1,905,226", local: "190,523" },
    { annual: "15,000만", netPay: "9,348,478", total: "3,151,522", pension: "302,575", health: "442,185", longTerm: "58,103", employ: "110,700", income: "2,034,508", local: "203,451", highlight: true },
  ];

  // 월급 기준 실수령액 표 데이터 (2026년 기준)
  const monthlySalaryData = [
    // 100만원 ~ 300만원 (10만원 단위)
    { monthly: "100만", netPay: "920,869", total: "79,131", pension: "38,000", health: "28,760", longTerm: "3,779", employ: "7,200", income: "1,265", local: "127" },
    { monthly: "110만", netPay: "1,009,648", total: "90,352", pension: "42,750", health: "32,355", longTerm: "4,251", employ: "8,100", income: "2,633", local: "263" },
    { monthly: "120만", netPay: "1,098,426", total: "101,574", pension: "47,500", health: "35,950", longTerm: "4,724", employ: "9,000", income: "4,000", local: "400" },
    { monthly: "130만", netPay: "1,187,204", total: "112,796", pension: "52,250", health: "39,545", longTerm: "5,196", employ: "9,900", income: "5,368", local: "537" },
    { monthly: "140만", netPay: "1,275,981", total: "124,019", pension: "57,000", health: "43,140", longTerm: "5,669", employ: "10,800", income: "6,736", local: "674" },
    { monthly: "150만", netPay: "1,364,389", total: "135,611", pension: "61,750", health: "46,735", longTerm: "6,141", employ: "11,700", income: "8,441", local: "844" },
    { monthly: "160만", netPay: "1,452,426", total: "147,574", pension: "66,500", health: "50,330", longTerm: "6,613", employ: "12,600", income: "10,483", local: "1,048" },
    { monthly: "170만", netPay: "1,540,460", total: "159,540", pension: "71,250", health: "53,925", longTerm: "7,086", employ: "13,500", income: "12,526", local: "1,253" },
    { monthly: "180만", netPay: "1,628,497", total: "171,503", pension: "76,000", health: "57,520", longTerm: "7,558", employ: "14,400", income: "14,568", local: "1,457" },
    { monthly: "190만", netPay: "1,716,532", total: "183,468", pension: "80,750", health: "61,115", longTerm: "8,031", employ: "15,300", income: "16,611", local: "1,661" },
    { monthly: "200만", netPay: "1,804,569", total: "195,431", pension: "85,500", health: "64,710", longTerm: "8,503", employ: "16,200", income: "18,653", local: "1,865", highlight: true },
    { monthly: "210만", netPay: "1,892,604", total: "207,396", pension: "90,250", health: "68,305", longTerm: "8,975", employ: "17,100", income: "20,696", local: "2,070" },
    { monthly: "220만", netPay: "1,980,639", total: "219,361", pension: "95,000", health: "71,900", longTerm: "9,448", employ: "18,000", income: "22,739", local: "2,274" },
    { monthly: "230만", netPay: "2,068,676", total: "231,324", pension: "99,750", health: "75,495", longTerm: "9,920", employ: "18,900", income: "24,781", local: "2,478" },
    { monthly: "240만", netPay: "2,156,712", total: "243,288", pension: "104,500", health: "79,090", longTerm: "10,392", employ: "19,800", income: "26,824", local: "2,682" },
    { monthly: "250만", netPay: "2,244,747", total: "255,253", pension: "109,250", health: "82,685", longTerm: "10,865", employ: "20,700", income: "28,866", local: "2,887", highlight: true },
    { monthly: "260만", netPay: "2,332,783", total: "267,217", pension: "114,000", health: "86,280", longTerm: "11,337", employ: "21,600", income: "30,909", local: "3,091" },
    { monthly: "270만", netPay: "2,418,424", total: "281,576", pension: "118,750", health: "89,875", longTerm: "11,810", employ: "22,500", income: "35,128", local: "3,513" },
    { monthly: "280만", netPay: "2,503,089", total: "296,911", pension: "123,500", health: "93,470", longTerm: "12,282", employ: "23,400", income: "40,235", local: "4,024" },
    { monthly: "290만", netPay: "2,587,756", total: "312,244", pension: "128,250", health: "97,065", longTerm: "12,754", employ: "24,300", income: "45,341", local: "4,534" },
    // 300만원 ~ 800만원 (50만원 단위)
    { monthly: "300만", netPay: "2,671,384", total: "328,616", pension: "133,000", health: "100,660", longTerm: "13,227", employ: "25,200", income: "51,390", local: "5,139", highlight: true },
    { monthly: "350만", netPay: "3,056,592", total: "443,408", pension: "156,750", health: "118,635", longTerm: "15,589", employ: "29,700", income: "111,576", local: "11,158" },
    { monthly: "400만", netPay: "3,442,276", total: "557,724", pension: "180,500", health: "136,610", longTerm: "17,951", employ: "34,200", income: "171,330", local: "17,133", highlight: true },
    { monthly: "450만", netPay: "3,823,028", total: "676,972", pension: "204,250", health: "154,585", longTerm: "20,312", employ: "38,700", income: "235,568", local: "23,557" },
    { monthly: "500만", netPay: "4,203,780", total: "796,220", pension: "228,000", health: "172,560", longTerm: "22,674", employ: "43,200", income: "299,805", local: "29,981", highlight: true },
    { monthly: "550만", netPay: "4,584,532", total: "915,468", pension: "251,750", health: "190,535", longTerm: "25,036", employ: "47,700", income: "364,043", local: "36,404" },
    { monthly: "600만", netPay: "4,965,284", total: "1,034,716", pension: "275,500", health: "208,510", longTerm: "27,398", employ: "52,200", income: "428,280", local: "42,828" },
    { monthly: "650만", netPay: "5,313,208", total: "1,186,792", pension: "299,250", health: "226,485", longTerm: "29,760", employ: "56,700", income: "522,361", local: "52,236", highlight: true },
    { monthly: "700만", netPay: "5,671,988", total: "1,328,012", pension: "302,575", health: "244,460", longTerm: "32,122", employ: "61,200", income: "625,141", local: "62,514" },
    { monthly: "750만", netPay: "6,034,093", total: "1,465,907", pension: "302,575", health: "262,435", longTerm: "34,484", employ: "65,700", income: "727,921", local: "72,792" },
    { monthly: "800만", netPay: "6,396,198", total: "1,603,802", pension: "302,575", health: "280,410", longTerm: "36,846", employ: "70,200", income: "830,701", local: "83,070", highlight: true },
    // 800만원 ~ 1,200만원
    { monthly: "900만", netPay: "7,116,712", total: "1,883,288", pension: "302,575", health: "316,360", longTerm: "41,570", employ: "79,200", income: "1,039,621", local: "103,962" },
    { monthly: "1,000만", netPay: "7,825,919", total: "2,174,081", pension: "302,575", health: "352,310", longTerm: "46,294", employ: "88,200", income: "1,258,820", local: "125,882", highlight: true },
    { monthly: "1,100만", netPay: "8,434,943", total: "2,565,057", pension: "302,575", health: "388,260", longTerm: "51,017", employ: "97,200", income: "1,569,095", local: "156,910" },
    { monthly: "1,200만", netPay: "9,043,967", total: "2,956,033", pension: "302,575", health: "424,210", longTerm: "55,741", employ: "106,200", income: "1,879,370", local: "187,937", highlight: true },
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

          {/* 표 내용 - 조건부 렌더링 */}
          <div className="overflow-x-auto">
            {tableType === "annual" ? (
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">연봉</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령액</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden lg:table-cell">공제액계</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">국민연금</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">건강보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden xl:table-cell">장기요양</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden xl:table-cell">고용보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">소득세</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden lg:table-cell">지방소득세</th>
                  </tr>
                </thead>
                <tbody>
                  {annualSalaryData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? "bg-green-50" : "bg-white"}>
                      <td className="py-2 px-2 text-center font-medium border border-gray-300">{row.annual}원</td>
                      <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">{row.netPay}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden lg:table-cell">{row.total}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell">{row.pension}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell">{row.health}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden xl:table-cell">{row.longTerm}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden xl:table-cell">{row.employ}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.income}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden lg:table-cell">{row.local}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">월급</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">실수령액</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden lg:table-cell">공제액계</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">국민연금</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden md:table-cell">건강보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden xl:table-cell">장기요양</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden xl:table-cell">고용보험</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">소득세</th>
                    <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden lg:table-cell">지방소득세</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySalaryData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? "bg-green-50" : "bg-white"}>
                      <td className="py-2 px-2 text-center font-medium border border-gray-300">{row.monthly}원</td>
                      <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">{row.netPay}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden lg:table-cell">{row.total}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell">{row.pension}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden md:table-cell">{row.health}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden xl:table-cell">{row.longTerm}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden xl:table-cell">{row.employ}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">{row.income}원</td>
                      <td className="py-2 px-2 text-center border border-gray-300 hidden lg:table-cell">{row.local}원</td>
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
