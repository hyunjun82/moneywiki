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
    { annual: "1,000만", netPay: "771,033", total: "62,300", pension: "32,990", health: "22,870", longTerm: "1,680", employ: "4,760", income: "0", local: "0" },
    { annual: "1,100만", netPay: "847,286", total: "69,380", pension: "36,740", health: "25,470", longTerm: "1,870", employ: "5,300", income: "0", local: "0" },
    { annual: "1,200만", netPay: "923,500", total: "76,500", pension: "40,500", health: "28,080", longTerm: "2,070", employ: "5,850", income: "0", local: "0" },
    { annual: "1,300만", netPay: "998,863", total: "84,470", pension: "44,240", health: "30,670", longTerm: "2,260", employ: "6,390", income: "830", local: "80" },
    { annual: "1,400만", netPay: "1,073,736", total: "92,930", pension: "47,990", health: "33,270", longTerm: "2,450", employ: "6,930", income: "2,090", local: "200" },
    { annual: "1,500만", netPay: "1,148,580", total: "101,420", pension: "51,750", health: "35,880", longTerm: "2,640", employ: "7,470", income: "3,350", local: "330" },
    { annual: "1,600만", netPay: "1,223,463", total: "109,870", pension: "55,490", health: "38,470", longTerm: "2,830", employ: "8,010", income: "4,610", local: "460" },
    { annual: "1,700만", netPay: "1,297,826", total: "118,840", pension: "59,240", health: "41,070", longTerm: "3,030", employ: "8,550", income: "6,320", local: "630" },
    { annual: "1,800만", netPay: "1,372,040", total: "127,960", pension: "63,000", health: "43,680", longTerm: "3,220", employ: "9,100", income: "8,150", local: "810" },
    { annual: "1,900만", netPay: "1,446,313", total: "137,020", pension: "66,740", health: "46,270", longTerm: "3,410", employ: "9,640", income: "9,970", local: "990" },
    { annual: "2,000만", netPay: "1,520,566", total: "146,100", pension: "70,490", health: "48,870", longTerm: "3,600", employ: "10,180", income: "11,790", local: "1,170" },
    { annual: "2,100만", netPay: "1,594,790", total: "155,210", pension: "74,250", health: "51,480", longTerm: "3,790", employ: "10,720", income: "13,610", local: "1,360" },
    { annual: "2,200만", netPay: "1,669,043", total: "164,290", pension: "77,990", health: "54,070", longTerm: "3,990", employ: "11,260", income: "15,440", local: "1,540" },
    { annual: "2,300만", netPay: "1,743,296", total: "173,370", pension: "81,740", health: "56,670", longTerm: "4,180", employ: "11,800", income: "17,260", local: "1,720" },
    { annual: "2,400만", netPay: "1,817,310", total: "182,690", pension: "85,500", health: "59,280", longTerm: "4,370", employ: "12,350", income: "19,270", local: "1,920" },
    { annual: "2,500만", netPay: "1,890,463", total: "192,870", pension: "89,240", health: "61,870", longTerm: "4,560", employ: "12,890", income: "22,100", local: "2,210" },
    { annual: "2,600만", netPay: "1,963,596", total: "203,070", pension: "92,990", health: "64,470", longTerm: "4,750", employ: "13,430", income: "24,940", local: "2,490" },
    { annual: "2,700만", netPay: "2,036,710", total: "213,290", pension: "96,750", health: "67,080", longTerm: "4,950", employ: "13,970", income: "27,770", local: "2,770" },
    { annual: "2,800만", netPay: "2,109,853", total: "223,480", pension: "100,490", health: "69,670", longTerm: "5,140", employ: "14,510", income: "30,610", local: "3,060" },
    { annual: "2,900만", netPay: "2,179,916", total: "236,750", pension: "104,240", health: "72,270", longTerm: "5,330", employ: "15,050", income: "36,240", local: "3,620" },
    // 3,000만원 ~ 5,000만원
    { annual: "3,000만", netPay: "2,248,340", total: "251,660", pension: "108,000", health: "74,880", longTerm: "5,520", employ: "15,600", income: "43,330", local: "4,330", highlight: true },
    { annual: "3,500만", netPay: "2,580,346", total: "336,320", pension: "126,740", health: "87,870", longTerm: "6,480", employ: "18,300", income: "88,120", local: "8,810" },
    { annual: "4,000만", netPay: "2,917,143", total: "416,190", pension: "145,490", health: "100,870", longTerm: "7,440", employ: "21,010", income: "128,530", local: "12,850", highlight: true },
    { annual: "4,500만", netPay: "3,239,250", total: "510,750", pension: "164,250", health: "113,880", longTerm: "8,400", employ: "23,720", income: "182,280", local: "18,220" },
    { annual: "5,000만", netPay: "3,552,316", total: "614,350", pension: "182,990", health: "126,870", longTerm: "9,360", employ: "26,430", income: "244,280", local: "24,420", highlight: true },
    // 5,000만원 ~ 10,000만원
    { annual: "5,500만", netPay: "3,869,273", total: "714,060", pension: "201,740", health: "139,870", longTerm: "10,320", employ: "29,140", income: "302,720", local: "30,270" },
    { annual: "6,000만", netPay: "4,183,470", total: "816,530", pension: "220,500", health: "152,880", longTerm: "11,280", employ: "31,850", income: "363,660", local: "36,360", highlight: true },
    { annual: "6,500만", netPay: "4,500,476", total: "916,190", pension: "239,240", health: "165,870", longTerm: "12,240", employ: "34,550", income: "422,090", local: "42,200" },
    { annual: "7,000만", netPay: "4,785,823", total: "1,047,510", pension: "257,990", health: "178,870", longTerm: "13,200", employ: "37,260", income: "509,270", local: "50,920" },
    { annual: "7,500만", netPay: "5,036,270", total: "1,213,730", pension: "276,750", health: "191,880", longTerm: "14,160", employ: "39,970", income: "628,160", local: "62,810" },
    { annual: "8,000만", netPay: "5,313,816", total: "1,352,850", pension: "295,490", health: "204,870", longTerm: "15,110", employ: "42,680", income: "722,460", local: "72,240", highlight: true },
    { annual: "8,500만", netPay: "5,591,343", total: "1,491,990", pension: "314,240", health: "217,870", longTerm: "16,070", employ: "45,390", income: "816,750", local: "81,670" },
    { annual: "9,000만", netPay: "5,868,840", total: "1,631,160", pension: "333,000", health: "230,880", longTerm: "17,030", employ: "48,100", income: "911,050", local: "91,100" },
    { annual: "9,500만", netPay: "6,146,386", total: "1,770,280", pension: "351,740", health: "243,870", longTerm: "17,990", employ: "50,800", income: "1,005,350", local: "100,530" },
    { annual: "1억", netPay: "6,423,903", total: "1,909,430", pension: "370,490", health: "256,870", longTerm: "18,950", employ: "53,510", income: "1,099,650", local: "109,960", highlight: true },
    // 10,000만원 ~ 15,000만원
    { annual: "10,500만", netPay: "6,698,900", total: "2,051,100", pension: "389,250", health: "269,880", longTerm: "19,910", employ: "56,220", income: "1,196,220", local: "119,620" },
    { annual: "11,000만", netPay: "6,968,006", total: "2,198,660", pension: "407,990", health: "282,870", longTerm: "20,870", employ: "58,930", income: "1,298,190", local: "129,810" },
    { annual: "11,500만", netPay: "7,193,163", total: "2,390,170", pension: "426,740", health: "295,870", longTerm: "21,830", employ: "61,640", income: "1,440,090", local: "144,000" },
    { annual: "12,000만", netPay: "7,418,310", total: "2,581,690", pension: "445,500", health: "308,880", longTerm: "22,790", employ: "64,350", income: "1,581,980", local: "158,190" },
    { annual: "12,500만", netPay: "7,524,186", total: "2,892,480", pension: "464,240", health: "321,870", longTerm: "23,750", employ: "67,050", income: "1,832,340", local: "183,230" },
    { annual: "13,000만", netPay: "7,748,553", total: "3,084,780", pension: "482,990", health: "334,870", longTerm: "24,710", employ: "69,760", income: "1,974,960", local: "197,490" },
    { annual: "13,500만", netPay: "7,972,900", total: "3,277,100", pension: "501,750", health: "347,880", longTerm: "25,670", employ: "72,470", income: "2,117,580", local: "211,750" },
    { annual: "14,000만", netPay: "8,197,266", total: "3,469,400", pension: "520,490", health: "360,870", longTerm: "26,630", employ: "75,180", income: "2,260,210", local: "226,020" },
    { annual: "14,500만", netPay: "8,421,633", total: "3,661,700", pension: "539,240", health: "373,870", longTerm: "27,590", employ: "77,890", income: "2,402,830", local: "240,280" },
    { annual: "15,000만", netPay: "8,645,980", total: "3,854,020", pension: "558,000", health: "386,880", longTerm: "28,550", employ: "80,600", income: "2,545,450", local: "254,540", highlight: true },
  ];

  // 월급 기준 실수령액 표 데이터 (2026년 기준)
  const monthlySalaryData = [
    // 100만원 ~ 300만원 (10만원 단위)
    { monthly: "100만", netPay: "923,500", total: "76,500", pension: "40,500", health: "28,080", longTerm: "2,070", employ: "5,850", income: "0", local: "0" },
    { monthly: "110만", netPay: "1,013,810", total: "86,190", pension: "45,000", health: "31,200", longTerm: "2,300", employ: "6,500", income: "1,090", local: "100" },
    { monthly: "120만", netPay: "1,103,640", total: "96,360", pension: "49,500", health: "34,320", longTerm: "2,530", employ: "7,150", income: "2,600", local: "260" },
    { monthly: "130만", netPay: "1,193,480", total: "106,520", pension: "54,000", health: "37,440", longTerm: "2,760", employ: "7,800", income: "4,110", local: "410" },
    { monthly: "140만", netPay: "1,282,950", total: "117,050", pension: "58,500", health: "40,560", longTerm: "2,990", employ: "8,450", income: "5,960", local: "590" },
    { monthly: "150만", netPay: "1,372,040", total: "127,960", pension: "63,000", health: "43,680", longTerm: "3,220", employ: "9,100", income: "8,150", local: "810" },
    { monthly: "160만", netPay: "1,461,140", total: "138,860", pension: "67,500", health: "46,800", longTerm: "3,450", employ: "9,750", income: "10,330", local: "1,030" },
    { monthly: "170만", netPay: "1,550,230", total: "149,770", pension: "72,000", health: "49,920", longTerm: "3,680", employ: "10,400", income: "12,520", local: "1,250" },
    { monthly: "180만", netPay: "1,639,320", total: "160,680", pension: "76,500", health: "53,040", longTerm: "3,910", employ: "11,050", income: "14,710", local: "1,470" },
    { monthly: "190만", netPay: "1,728,430", total: "171,570", pension: "81,000", health: "56,160", longTerm: "4,140", employ: "11,700", income: "16,890", local: "1,680" },
    { monthly: "200만", netPay: "1,817,310", total: "182,690", pension: "85,500", health: "59,280", longTerm: "4,370", employ: "12,350", income: "19,270", local: "1,920", highlight: true },
    { monthly: "210만", netPay: "1,905,070", total: "194,930", pension: "90,000", health: "62,400", longTerm: "4,600", employ: "13,000", income: "22,670", local: "2,260" },
    { monthly: "220만", netPay: "1,992,830", total: "207,170", pension: "94,500", health: "65,520", longTerm: "4,830", employ: "13,650", income: "26,070", local: "2,600" },
    { monthly: "230만", netPay: "2,080,590", total: "219,410", pension: "99,000", health: "68,640", longTerm: "5,060", employ: "14,300", income: "29,470", local: "2,940" },
    { monthly: "240만", netPay: "2,166,200", total: "233,800", pension: "103,500", health: "71,760", longTerm: "5,290", employ: "14,950", income: "34,820", local: "3,480" },
    { monthly: "250만", netPay: "2,248,340", total: "251,660", pension: "108,000", health: "74,880", longTerm: "5,520", employ: "15,600", income: "43,330", local: "4,330", highlight: true },
    { monthly: "260만", netPay: "2,330,490", total: "269,510", pension: "112,500", health: "78,000", longTerm: "5,750", employ: "16,250", income: "51,830", local: "5,180" },
    { monthly: "270만", netPay: "2,412,060", total: "287,940", pension: "117,000", health: "81,120", longTerm: "5,980", employ: "16,900", income: "60,860", local: "6,080" },
    { monthly: "280만", netPay: "2,490,130", total: "309,870", pension: "121,500", health: "84,240", longTerm: "6,210", employ: "17,550", income: "73,070", local: "7,300" },
    { monthly: "290만", netPay: "2,567,440", total: "332,560", pension: "126,000", health: "87,360", longTerm: "6,440", employ: "18,200", income: "85,970", local: "8,590" },
    { monthly: "300만", netPay: "2,656,670", total: "343,330", pension: "130,500", health: "90,480", longTerm: "6,670", employ: "18,850", income: "88,030", local: "8,800", highlight: true },
    // 300만원 ~ 800만원 (50만원 단위)
    { monthly: "350만", netPay: "3,045,970", total: "454,030", pension: "153,000", health: "106,080", longTerm: "7,820", employ: "22,100", income: "150,030", local: "15,000" },
    { monthly: "400만", netPay: "3,425,500", total: "574,500", pension: "175,500", health: "121,680", longTerm: "8,970", employ: "25,350", income: "220,910", local: "22,090", highlight: true },
    { monthly: "450만", netPay: "3,805,860", total: "694,140", pension: "198,000", health: "137,280", longTerm: "10,130", employ: "28,600", income: "291,030", local: "29,100" },
    { monthly: "500만", netPay: "4,183,470", total: "816,530", pension: "220,500", health: "152,880", longTerm: "11,280", employ: "31,850", income: "363,660", local: "36,360", highlight: true },
    { monthly: "550만", netPay: "4,562,980", total: "937,020", pension: "243,000", health: "168,480", longTerm: "12,430", employ: "35,100", income: "434,560", local: "43,450" },
    { monthly: "600만", netPay: "4,869,760", total: "1,130,240", pension: "265,500", health: "184,080", longTerm: "13,580", employ: "38,350", income: "571,580", local: "57,150" },
    { monthly: "650만", netPay: "5,202,780", total: "1,297,220", pension: "288,000", health: "199,680", longTerm: "14,730", employ: "41,600", income: "684,740", local: "68,470", highlight: true },
    { monthly: "700만", netPay: "5,535,820", total: "1,464,180", pension: "310,500", health: "215,280", longTerm: "15,880", employ: "44,850", income: "797,890", local: "79,780" },
    { monthly: "750만", netPay: "5,868,840", total: "1,631,160", pension: "333,000", health: "230,880", longTerm: "17,030", employ: "48,100", income: "911,050", local: "91,100" },
    { monthly: "800만", netPay: "6,201,850", total: "1,798,150", pension: "355,500", health: "246,480", longTerm: "18,190", employ: "51,350", income: "1,024,210", local: "102,420", highlight: true },
    // 800만원 ~ 1,200만원
    { monthly: "900만", netPay: "6,863,420", total: "2,136,580", pension: "400,500", health: "277,680", longTerm: "20,490", employ: "57,850", income: "1,254,600", local: "125,460" },
    { monthly: "1,000만", netPay: "7,418,310", total: "2,581,690", pension: "445,500", health: "308,880", longTerm: "22,790", employ: "64,350", income: "1,581,980", local: "158,190", highlight: true },
    { monthly: "1,100만", netPay: "7,838,270", total: "3,161,730", pension: "490,500", health: "340,080", longTerm: "25,090", employ: "70,850", income: "2,032,010", local: "203,200" },
    { monthly: "1,200만", netPay: "8,376,740", total: "3,623,260", pension: "535,500", health: "371,280", longTerm: "27,400", employ: "77,350", income: "2,374,300", local: "237,430", highlight: true },
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
