"use client";

import dynamic from "next/dynamic";

// 계산기 컴포넌트 동적 임포트 - 코드 스플리팅으로 초기 로딩 최적화
const calculators: Record<string, React.ComponentType> = {};

// 동적 로딩 함수 - 필요할 때만 로드
const loadCalculator = (name: string) => {
  if (!calculators[name]) {
    calculators[name] = dynamic(
      () => import(`@/components/calculators/${name}`),
      {
        loading: () => (
          <div className="animate-pulse bg-neutral-100 rounded-xl p-8 text-center">
            <div className="text-neutral-500">계산기 로딩 중...</div>
          </div>
        ),
      }
    );
  }
  return calculators[name];
};

// 슬러그와 계산기 컴포넌트 매핑
const calculatorMap: Record<string, string> = {
  "퇴직금-계산기": "SeverancePayCalculator",
  "실업급여-계산기": "UnemploymentBenefitCalculator",
  "연말정산-계산기": "YearEndTaxCalculator",
  "취득세-계산기": "AcquisitionTaxCalculator",
  "양도소득세-계산기": "CapitalGainsTaxCalculator",
  "종합부동산세-계산기": "ComprehensivePropertyTaxCalculator",
  "재산세-계산기": "PropertyTaxCalculator",
  "중개수수료-계산기": "BrokerFeeCalculator",
  "평수-계산기": "AreaConverterCalculator",
  "전세대출-계산기": "JeonseLoanCalculator",
  "주택담보대출-계산기": "MortgageCalculator",
  "DSR-계산기": "DSRCalculator",
  "DTI-계산기": "DTICalculator",
  "LTV-계산기": "LTVCalculator",
  "연봉-실수령액-계산기": "NetSalaryCalculator",
  "4대보험료-계산기": "InsuranceCalculator",
  "근로소득세-계산기": "IncomeTaxCalculator",
  "주휴수당-계산기": "WeeklyHolidayPayCalculator",
  "시급-계산기": "HourlyWageCalculator",
  "대출이자-계산기": "LoanInterestCalculator",
  "대출상환-계산기": "LoanRepaymentCalculator",
  "적금-계산기": "SavingsCalculator",
  "예금이자-계산기": "DepositInterestCalculator",
  "복리-계산기": "CompoundInterestCalculator",
  "연봉-계산기": "AnnualSalaryCalculator",
  "증여세-계산기": "GiftTaxCalculator",
  "국민연금-수령액-계산기": "NationalPensionCalculator",
  "주식-수익률-계산기": "StockReturnCalculator",
  "할부-이자-계산기": "InstallmentInterestCalculator",
  "상속세-계산기": "InheritanceTaxCalculator",
  "자동차세-계산기": "VehicleTaxCalculator",
  "예적금-계산기": "DepositSavingsCalculator",
  "기초연금-계산기": "BasicPensionCalculator",
  "교육비지원-계산기": "EducationCostCalculator",
  "장애아동수당-계산기": "DisabilityAllowanceCalculator",
  "기초생활보장-계산기": "BasicLivelihoodCalculator",
  "장애인연금-계산기": "DisabilityPensionCalculator",
  "한부모가족지원-계산기": "SingleParentCalculator",
  "산모신생아-계산기": "MaternalCareCalculator",
  "아이돌봄서비스-계산기": "ChildcareCalculator",
  "청년월세지원-계산기": "YouthRentSupportCalculator",
  "청년내일저축계좌-계산기": "YouthSavingsCalculator",
  "건강보험료-계산기": "HealthInsuranceCalculator",
  "자녀세액공제-계산기": "ChildTaxCreditCalculator",
  "학자금대출-상환-계산기": "StudentLoanCalculator",
  "노인장기요양-본인부담금-계산기": "LongTermCareCalculator",
  "산재-휴업급여-계산기": "WorkersCompCalculator",
  "산재휴업급여계산기": "WorkersCompCalculator",
  "보금자리론-상환-계산기": "HousingLoanCalculator",
  "보금자리론상환계산기": "HousingLoanCalculator",
};

interface CalculatorLoaderProps {
  slug: string;
}

export default function CalculatorLoader({ slug }: CalculatorLoaderProps) {
  const decodedSlug = decodeURIComponent(slug);
  const calculatorName = calculatorMap[decodedSlug];

  if (!calculatorName) {
    return null;
  }

  const Calculator = loadCalculator(calculatorName);

  return (
    <div className="mb-8">
      <Calculator />
    </div>
  );
}
