"use client";

import { useState, useEffect, useCallback } from "react";

// 2025년 귀속 근로소득공제 계산
function calcIncomeDeduction(totalSalary: number): number {
  if (totalSalary <= 5000000) {
    return totalSalary * 0.7;
  } else if (totalSalary <= 15000000) {
    return 3500000 + (totalSalary - 5000000) * 0.4;
  } else if (totalSalary <= 45000000) {
    return 7500000 + (totalSalary - 15000000) * 0.15;
  } else if (totalSalary <= 100000000) {
    return 12000000 + (totalSalary - 45000000) * 0.05;
  } else {
    return 14750000 + (totalSalary - 100000000) * 0.02;
  }
}

// 2025년 귀속 소득세율 및 누진공제
function calcIncomeTax(taxBase: number): number {
  if (taxBase <= 0) return 0;
  if (taxBase <= 14000000) {
    return taxBase * 0.06;
  } else if (taxBase <= 50000000) {
    return taxBase * 0.15 - 1260000;
  } else if (taxBase <= 88000000) {
    return taxBase * 0.24 - 5760000;
  } else if (taxBase <= 150000000) {
    return taxBase * 0.35 - 15440000;
  } else if (taxBase <= 300000000) {
    return taxBase * 0.38 - 19940000;
  } else if (taxBase <= 500000000) {
    return taxBase * 0.4 - 25940000;
  } else if (taxBase <= 1000000000) {
    return taxBase * 0.42 - 35940000;
  } else {
    return taxBase * 0.45 - 65940000;
  }
}

// 근로소득세액공제 계산
function calcEarnedIncomeCredit(calculatedTax: number, totalSalary: number): number {
  let credit = 0;
  if (calculatedTax <= 1300000) {
    credit = calculatedTax * 0.55;
  } else {
    credit = 715000 + (calculatedTax - 1300000) * 0.3;
  }

  // 한도 적용
  let limit = 0;
  if (totalSalary <= 33000000) {
    limit = 740000;
  } else if (totalSalary <= 70000000) {
    limit = Math.max(740000 - (totalSalary - 33000000) * 0.008, 660000);
  } else if (totalSalary <= 120000000) {
    limit = Math.max(660000 - (totalSalary - 70000000) * 0.5 / 100, 500000);
  } else {
    limit = Math.max(500000 - (totalSalary - 120000000) * 0.5 / 100, 200000);
  }

  return Math.min(credit, limit);
}

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  description?: string;
  highlight?: boolean;
}

function InputField({ label, value, onChange, readOnly, description, highlight }: InputFieldProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100 ${highlight ? "bg-emerald-50" : ""}`}>
      <div className="sm:w-48 flex-shrink-0">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={formatNumber(value)}
          onChange={(e) => onChange && onChange(parseInput(e.target.value))}
          readOnly={readOnly}
          className={`w-full max-w-xs px-3 py-2 text-right border rounded-lg ${
            readOnly
              ? "bg-neutral-100 text-neutral-600 border-neutral-200"
              : "bg-white border-neutral-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          }`}
        />
        <span className="text-sm text-neutral-500">원</span>
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

function SelectField({ label, value, onChange, description }: SelectFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
      <div className="sm:w-48 flex-shrink-0">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={value}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-emerald-600"
          />
          <span className="text-sm">예</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!value}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-emerald-600"
          />
          <span className="text-sm">아니오</span>
        </label>
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

interface NumberSelectProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  description?: string;
}

function NumberSelect({ label, value, onChange, max, description }: NumberSelectProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
      <div className="sm:w-48 flex-shrink-0">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
      <div className="flex-1">
        <select
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        >
          {Array.from({ length: max + 1 }, (_, i) => (
            <option key={i} value={i}>{i}명</option>
          ))}
        </select>
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

export default function YearEndTaxCalculator() {
  // 1. 기본입력사항
  const [totalSalary, setTotalSalary] = useState(50000000);

  // 2. 기본공제
  const [hasSpouse, setHasSpouse] = useState(false);
  const [numParents, setNumParents] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [numSiblings, setNumSiblings] = useState(0);

  // 4. 연금보험료공제
  const [nationalPension, setNationalPension] = useState(0);

  // 5. 특별소득공제
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [employmentInsurance, setEmploymentInsurance] = useState(0);
  const [rentLoanPrincipal, setRentLoanPrincipal] = useState(0);
  const [mortgageInterest, setMortgageInterest] = useState(0);

  // 6. 그 밖의 소득공제
  const [personalPension, setPersonalPension] = useState(0);
  const [housingDeposit, setHousingDeposit] = useState(0);
  const [creditCardUsage, setCreditCardUsage] = useState(0);
  const [debitCardUsage, setDebitCardUsage] = useState(0);
  const [cashReceipt, setCashReceipt] = useState(0);
  const [traditionalMarket, setTraditionalMarket] = useState(0);

  // 세액공제
  const [pensionAccount, setPensionAccount] = useState(0); // 연금저축
  const [irp, setIrp] = useState(0); // IRP
  const [insurancePremium, setInsurancePremium] = useState(0); // 보장성보험료
  const [medicalExpense, setMedicalExpense] = useState(0); // 의료비
  const [educationExpense, setEducationExpense] = useState(0); // 교육비
  const [donation, setDonation] = useState(0); // 기부금
  const [monthlyRent, setMonthlyRent] = useState(0); // 월세액

  // 기납부세액
  const [prepaidTax, setPrepaidTax] = useState(0);

  // 자동계산 값들
  const [incomeDeduction, setIncomeDeduction] = useState(0);
  const [earnedIncome, setEarnedIncome] = useState(0);
  const [totalPersonalDeduction, setTotalPersonalDeduction] = useState(0);
  const [totalPensionDeduction, setTotalPensionDeduction] = useState(0);
  const [totalSpecialDeduction, setTotalSpecialDeduction] = useState(0);
  const [totalOtherDeduction, setTotalOtherDeduction] = useState(0);
  const [creditCardDeduction, setCreditCardDeduction] = useState(0);
  const [taxBase, setTaxBase] = useState(0);
  const [calculatedTax, setCalculatedTax] = useState(0);
  const [totalTaxCredit, setTotalTaxCredit] = useState(0);
  const [determinedTax, setDeterminedTax] = useState(0);
  const [finalTax, setFinalTax] = useState(0);

  // 자동계산
  const calculate = useCallback(() => {
    // 1. 근로소득공제
    const incDed = calcIncomeDeduction(totalSalary);
    setIncomeDeduction(incDed);

    // 2. 근로소득금액
    const earnInc = totalSalary - incDed;
    setEarnedIncome(earnInc);

    // 3. 인적공제
    const selfDeduction = 1500000;
    const spouseDeduction = hasSpouse ? 1500000 : 0;
    const dependentsDeduction = (numParents + numChildren + numSiblings) * 1500000;
    const elderlyDeduction = numParents * 1000000; // 경로우대
    const childDeduction = numChildren > 0 ? (numChildren <= 2 ? numChildren * 150000 : 300000 + (numChildren - 2) * 300000) : 0;
    const persDeduction = selfDeduction + spouseDeduction + dependentsDeduction + elderlyDeduction;
    setTotalPersonalDeduction(persDeduction);

    // 4. 연금보험료공제 (자동계산, 2026년 기준 4.75%)
    const autoPension = Math.round(totalSalary * 0.0475);
    setNationalPension(autoPension);
    const pensionDed = autoPension;
    setTotalPensionDeduction(pensionDed);

    // 5. 특별소득공제 (자동계산, 2026년 기준)
    const autoHealth = Math.round(totalSalary * 0.03595 + totalSalary * 0.0719 * 0.1314 * 0.5);
    const autoEmployment = Math.round(totalSalary * 0.009);
    setHealthInsurance(autoHealth);
    setEmploymentInsurance(autoEmployment);
    const specialDed = autoHealth + autoEmployment + Math.round(rentLoanPrincipal * 0.4) + mortgageInterest;
    setTotalSpecialDeduction(specialDed);

    // 6. 신용카드 등 소득공제
    const minUsage = totalSalary * 0.25;
    const totalCardUsage = creditCardUsage + debitCardUsage + cashReceipt + traditionalMarket;
    let cardDed = 0;
    if (totalCardUsage > minUsage) {
      const excess = totalCardUsage - minUsage;
      // 신용카드 15%, 체크카드/현금영수증 30%, 전통시장 40%
      const creditExcess = Math.min(creditCardUsage, excess);
      const remaining = excess - creditExcess;
      const debitExcess = Math.min(debitCardUsage + cashReceipt, remaining);
      const marketExcess = Math.min(traditionalMarket, excess);

      cardDed = creditExcess * 0.15 + debitExcess * 0.3 + marketExcess * 0.4;

      // 한도: 총급여 7천만원 이하 300만원, 7천만원 초과 250만원
      const limit = totalSalary <= 70000000 ? 3000000 : 2500000;
      cardDed = Math.min(cardDed, limit);
    }
    setCreditCardDeduction(cardDed);

    // 그 밖의 소득공제
    const personalPensionDed = Math.min(personalPension * 0.4, 720000);
    const housingDed = totalSalary <= 70000000 ? Math.min(housingDeposit * 0.4, 3000000) : 0;
    const otherDed = personalPensionDed + housingDed + cardDed;
    setTotalOtherDeduction(otherDed);

    // 7. 과세표준
    const totalDeduction = persDeduction + pensionDed + specialDed + otherDed;
    const taxB = Math.max(earnInc - totalDeduction, 0);
    setTaxBase(taxB);

    // 8. 산출세액
    const calcTax = calcIncomeTax(taxB);
    setCalculatedTax(calcTax);

    // 9. 세액공제
    // 근로소득세액공제
    const earnedIncomeCredit = calcEarnedIncomeCredit(calcTax, totalSalary);

    // 연금계좌세액공제 (연금저축 + IRP, 합계 900만원 한도)
    const pensionTotal = Math.min(pensionAccount + irp, 9000000);
    const pensionCreditRate = totalSalary <= 55000000 ? 0.15 : 0.12;
    const pensionCredit = pensionTotal * pensionCreditRate;

    // 자녀세액공제
    const childTaxCredit = numChildren > 0 ? (numChildren <= 2 ? numChildren * 150000 : 300000 + (numChildren - 2) * 300000) : 0;

    // 특별세액공제
    // 보험료 12%
    const insuranceCredit = Math.min(insurancePremium, 1000000) * 0.12;

    // 의료비 15% (총급여 3% 초과분)
    const medicalThreshold = totalSalary * 0.03;
    const medicalCredit = medicalExpense > medicalThreshold ? (medicalExpense - medicalThreshold) * 0.15 : 0;

    // 교육비 15%
    const educationCredit = educationExpense * 0.15;

    // 기부금 15% (1천만원 초과분 30%)
    const donationCredit = donation <= 10000000 ? donation * 0.15 : 1500000 + (donation - 10000000) * 0.3;

    // 월세세액공제 (총급여 8천만원 이하, 17%)
    const rentCredit = totalSalary <= 80000000 ? Math.min(monthlyRent, 10000000) * 0.17 : 0;

    const totalCredit = earnedIncomeCredit + pensionCredit + childTaxCredit + insuranceCredit + medicalCredit + educationCredit + donationCredit + rentCredit;
    setTotalTaxCredit(totalCredit);

    // 10. 결정세액
    const detTax = Math.max(calcTax - totalCredit, 0);
    setDeterminedTax(detTax);

    // 11. 기납부세액 자동계산 (간이세액표 기준 대략적 계산)
    const monthlyTax = Math.round(calcTax / 12);
    const autoPrepaid = monthlyTax * 12;
    setPrepaidTax(autoPrepaid);

    // 12. 차감징수세액 (환급/추가납부)
    const final = detTax - autoPrepaid;
    setFinalTax(final);
  }, [totalSalary, hasSpouse, numParents, numChildren, numSiblings, rentLoanPrincipal, mortgageInterest, personalPension, housingDeposit, creditCardUsage, debitCardUsage, cashReceipt, traditionalMarket, pensionAccount, irp, insurancePremium, medicalExpense, educationExpense, donation, monthlyRent]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-emerald-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold">연말정산 계산기 (2025년 귀속)</h2>
        <p className="text-emerald-100 text-sm mt-1">홈택스 연말정산 미리보기와 동일한 방식으로 계산해요</p>
      </div>

      {/* 1. 기본입력사항 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">기본입력사항</h3>
        </div>
        <InputField
          label="총급여"
          value={totalSalary}
          onChange={setTotalSalary}
          description="연간 급여 + 상여 - 비과세소득"
        />
        <InputField
          label="근로소득공제"
          value={incomeDeduction}
          readOnly
          description="자동계산"
        />
        <InputField
          label="근로소득금액"
          value={earnedIncome}
          readOnly
          description="총급여 - 근로소득공제"
        />
      </div>

      {/* 2. 기본공제 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">기본공제 (연간소득금액 100만원 이하)</h3>
        </div>
        <InputField
          label="본인"
          value={1500000}
          readOnly
          description="자동적용"
        />
        <SelectField
          label="배우자공제"
          value={hasSpouse}
          onChange={setHasSpouse}
          description="연봉 500만원 이하 또는 소득금액 100만원 이하"
        />
        <NumberSelect
          label="직계존속 (부모님)"
          value={numParents}
          onChange={setNumParents}
          max={4}
          description="만60세 이상, 1964.12.31 이전 출생"
        />
        <NumberSelect
          label="자녀"
          value={numChildren}
          onChange={setNumChildren}
          max={5}
          description="만20세 이하, 2004.1.1 이후 출생"
        />
        <NumberSelect
          label="형제자매"
          value={numSiblings}
          onChange={setNumSiblings}
          max={4}
          description="만20세 이하 또는 만60세 이상"
        />
        <InputField
          label="기본공제 합계"
          value={totalPersonalDeduction}
          readOnly
          highlight
        />
      </div>

      {/* 4. 연금보험료공제 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">연금보험료공제 (근로자 부담분)</h3>
        </div>
        <InputField
          label="국민연금"
          value={nationalPension}
          readOnly
          description="총급여 x 4.75% (2026년 기준, 자동계산)"
        />
        <InputField
          label="연금보험료공제 합계"
          value={totalPensionDeduction}
          readOnly
          highlight
        />
      </div>

      {/* 5. 특별소득공제 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">특별소득공제</h3>
        </div>
        <InputField
          label="건강보험료"
          value={healthInsurance}
          readOnly
          description="자동계산"
        />
        <InputField
          label="고용보험료"
          value={employmentInsurance}
          readOnly
          description="총급여 x 0.9%"
        />
        <InputField
          label="주택임차차입금 원리금상환액"
          value={rentLoanPrincipal}
          onChange={setRentLoanPrincipal}
          description="상환액 x 40%"
        />
        <InputField
          label="장기주택저당차입금 이자상환액"
          value={mortgageInterest}
          onChange={setMortgageInterest}
          description="이자상환액 전액"
        />
        <InputField
          label="특별소득공제 합계"
          value={totalSpecialDeduction}
          readOnly
          highlight
        />
      </div>

      {/* 6. 그 밖의 소득공제 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">그 밖의 소득공제</h3>
        </div>
        <InputField
          label="개인연금저축"
          value={personalPension}
          onChange={setPersonalPension}
          description="불입액 x 40% (한도: 72만원)"
        />
        <InputField
          label="주택마련저축"
          value={housingDeposit}
          onChange={setHousingDeposit}
          description="총급여 7천만원 이하만"
        />
        <div className="bg-neutral-50 px-6 py-2 border-b border-neutral-200">
          <span className="text-sm font-medium text-neutral-600">신용카드 등 사용금액</span>
          <span className="text-xs text-neutral-500 ml-2">(총급여 25% 초과분부터 공제)</span>
        </div>
        <InputField
          label="- 신용카드"
          value={creditCardUsage}
          onChange={setCreditCardUsage}
          description="공제율 15%"
        />
        <InputField
          label="- 체크카드/현금영수증"
          value={debitCardUsage}
          onChange={setDebitCardUsage}
          description="공제율 30%"
        />
        <InputField
          label="- 현금영수증"
          value={cashReceipt}
          onChange={setCashReceipt}
          description="공제율 30%"
        />
        <InputField
          label="- 전통시장"
          value={traditionalMarket}
          onChange={setTraditionalMarket}
          description="공제율 40%"
        />
        <InputField
          label="신용카드등 공제액"
          value={creditCardDeduction}
          readOnly
          highlight
        />
        <InputField
          label="그 밖의 소득공제 합계"
          value={totalOtherDeduction}
          readOnly
          highlight
        />
      </div>

      {/* 세액감면 및 세액공제 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">세액감면 및 세액공제</h3>
        </div>
        <InputField
          label="연금저축"
          value={pensionAccount}
          onChange={setPensionAccount}
          description="세액공제율 12~15%"
        />
        <InputField
          label="IRP (퇴직연금)"
          value={irp}
          onChange={setIrp}
          description="연금저축 합계 900만원 한도"
        />
        <InputField
          label="보장성보험료"
          value={insurancePremium}
          onChange={setInsurancePremium}
          description="세액공제율 12%"
        />
        <InputField
          label="의료비"
          value={medicalExpense}
          onChange={setMedicalExpense}
          description="총급여 3% 초과분 15%"
        />
        <InputField
          label="교육비"
          value={educationExpense}
          onChange={setEducationExpense}
          description="세액공제율 15%"
        />
        <InputField
          label="기부금"
          value={donation}
          onChange={setDonation}
          description="15% (1천만원 초과 30%)"
        />
        <InputField
          label="월세액"
          value={monthlyRent}
          onChange={setMonthlyRent}
          description="총급여 8천만원 이하, 17%"
        />
        <InputField
          label="세액공제 합계"
          value={totalTaxCredit}
          readOnly
          highlight
        />
      </div>

      {/* 결과 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="bg-emerald-600 px-6 py-3">
          <h3 className="font-semibold text-white">계산 결과</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
            <span className="text-neutral-700">과세표준</span>
            <span className="font-semibold">{formatNumber(taxBase)}원</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
            <span className="text-neutral-700">산출세액</span>
            <span className="font-semibold">{formatNumber(calculatedTax)}원</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
            <span className="text-neutral-700">세액공제 합계</span>
            <span className="font-semibold text-emerald-600">-{formatNumber(totalTaxCredit)}원</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
            <span className="text-neutral-700">결정세액</span>
            <span className="font-semibold">{formatNumber(determinedTax)}원</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-emerald-200">
            <span className="text-neutral-700">기납부세액 (예상)</span>
            <span className="font-semibold">{formatNumber(prepaidTax)}원</span>
          </div>
          <div className="flex justify-between items-center py-4 bg-white rounded-xl px-4 mt-4">
            <span className="text-lg font-bold text-neutral-800">
              {finalTax < 0 ? "환급예상액" : "추가납부예상액"}
            </span>
            <span className={`text-2xl font-bold ${finalTax < 0 ? "text-emerald-600" : "text-red-600"}`}>
              {finalTax < 0 ? "+" : ""}{formatNumber(Math.abs(finalTax))}원
            </span>
          </div>
          {finalTax < 0 && (
            <p className="text-sm text-emerald-700 text-center mt-2">
              약 {formatNumber(Math.abs(finalTax))}원을 돌려받을 수 있어요
            </p>
          )}
          {finalTax > 0 && (
            <p className="text-sm text-red-600 text-center mt-2">
              약 {formatNumber(finalTax)}원을 추가로 납부해야 해요
            </p>
          )}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="px-6 py-4 bg-neutral-50 text-xs text-neutral-500">
        <p>* 이 계산기는 참고용이에요. 실제 연말정산 결과와 다를 수 있어요.</p>
        <p>* 정확한 계산은 홈택스 연말정산 미리보기를 이용하세요.</p>
      </div>
    </div>
  );
}
