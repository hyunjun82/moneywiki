"use client";

import { useState, useEffect, useCallback } from "react";

// 숫자 포맷
function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("ko-KR");
}

// 입력 파싱
function parseInput(value: string): number {
  return parseInt(value.replace(/,/g, "")) || 0;
}

// 날짜 문자열 파싱 (YYYY-MM-DD)
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

// 날짜 포맷 (YYYY-MM-DD)
function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

// 재직일수 계산
function calculateWorkDays(start: Date, end: Date): number {
  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// 퇴직 전 3개월 총 일수 계산
function calculateThreeMonthDays(endDate: Date): number {
  const end = new Date(endDate);
  const threeMonthsAgo = new Date(end);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return calculateWorkDays(threeMonthsAgo, end);
}

// 근로자 유형
type WorkerType = "regular" | "daily" | "parttime";

interface InputFieldProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  description?: string;
  highlight?: boolean;
  unit?: string;
}

function InputField({ label, value, onChange, readOnly, description, highlight, unit = "원" }: InputFieldProps) {
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
        <span className="text-sm text-neutral-500">{unit}</span>
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  description?: string;
}

function DateField({ label, value, onChange, description }: DateFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
      <div className="sm:w-48 flex-shrink-0">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
      <div className="flex-1">
        <input
          type="date"
          value={formatDate(value)}
          onChange={(e) => onChange(parseDate(e.target.value))}
          className="px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      {description && (
        <div className="sm:w-64 text-xs text-neutral-500">{description}</div>
      )}
    </div>
  );
}

// 직장인 계산기
function RegularWorkerCalculator() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [baseSalary, setBaseSalary] = useState(2000000);
  const [allowances, setAllowances] = useState(360000);
  const [annualBonus, setAnnualBonus] = useState(4000000);
  const [annualLeaveCount, setAnnualLeaveCount] = useState(15);
  const [dailyLeaveRate, setDailyLeaveRate] = useState(60000);

  // 계산 결과
  const [workDays, setWorkDays] = useState(0);
  const [threeMonthDays, setThreeMonthDays] = useState(92);
  const [threeMonthWage, setThreeMonthWage] = useState(0);
  const [bonusPortion, setBonusPortion] = useState(0);
  const [leavePortion, setLeavePortion] = useState(0);
  const [totalThreeMonth, setTotalThreeMonth] = useState(0);
  const [avgDailyWage, setAvgDailyWage] = useState(0);
  const [severancePay, setSeverancePay] = useState(0);
  const [isEligible, setIsEligible] = useState(true);
  const [eligibilityMessage, setEligibilityMessage] = useState("");

  const calculate = useCallback(() => {
    if (!startDate || !endDate) {
      setWorkDays(0);
      setSeverancePay(0);
      return;
    }

    // 재직일수
    const days = calculateWorkDays(startDate, endDate);
    setWorkDays(days);

    // 퇴직금 자격 확인 (1년 이상)
    if (days < 365) {
      setIsEligible(false);
      setEligibilityMessage(`퇴직금은 1년(365일) 이상 근무해야 받을 수 있어요. 현재 ${days}일 근무로 ${365 - days}일 부족해요.`);
      setSeverancePay(0);
      return;
    }

    setIsEligible(true);
    setEligibilityMessage("");

    // 퇴직 전 3개월 일수
    const monthDays = calculateThreeMonthDays(endDate);
    setThreeMonthDays(monthDays);

    // 3개월 임금 합계
    const wage3m = (baseSalary + allowances) * 3;
    setThreeMonthWage(wage3m);

    // 상여금 3개월분
    const bonus3m = (annualBonus / 12) * 3;
    setBonusPortion(bonus3m);

    // 연차수당 3개월분
    const annualLeaveAmount = annualLeaveCount * dailyLeaveRate;
    const leave3m = (annualLeaveAmount / 12) * 3;
    setLeavePortion(leave3m);

    // 총액
    const total = wage3m + bonus3m + leave3m;
    setTotalThreeMonth(total);

    // 1일 평균임금
    const avgWage = total / monthDays;
    setAvgDailyWage(avgWage);

    // 퇴직금
    const pay = avgWage * 30 * (days / 365);
    setSeverancePay(pay);
  }, [startDate, endDate, baseSalary, allowances, annualBonus, annualLeaveCount, dailyLeaveRate]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <>
      {/* 기본 정보 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">1. 근무 기간</h3>
        </div>
        <DateField
          label="입사일"
          value={startDate}
          onChange={setStartDate}
          description="근로계약 시작일"
        />
        <DateField
          label="퇴직일"
          value={endDate}
          onChange={setEndDate}
          description="마지막 근무일"
        />
        <InputField
          label="재직일수"
          value={workDays}
          readOnly
          unit="일"
          description="자동 계산"
          highlight
        />
      </div>

      {/* 자격 미달 경고 */}
      {!isEligible && eligibilityMessage && (
        <div className="mx-4 my-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-xl">⚠️</span>
            <div>
              <p className="font-medium text-emerald-800">퇴직금 지급 대상이 아니에요</p>
              <p className="text-sm text-amber-700 mt-1">{eligibilityMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* 임금 정보 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">2. 임금 정보 (월 기준)</h3>
          <p className="text-xs text-neutral-500 mt-1">퇴직 전 3개월간 받은 평균 금액을 입력하세요</p>
        </div>
        <InputField
          label="기본급"
          value={baseSalary}
          onChange={setBaseSalary}
          description="월 기본급"
        />
        <InputField
          label="기타수당"
          value={allowances}
          onChange={setAllowances}
          description="식대, 교통비, 직책수당 등"
        />
        <InputField
          label="연간 상여금"
          value={annualBonus}
          onChange={setAnnualBonus}
          description="연간 상여금 총액 (정기 상여)"
        />
      </div>

      {/* 연차수당 */}
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">3. 연차수당</h3>
          <p className="text-xs text-neutral-500 mt-1">미사용 연차가 있는 경우 입력하세요</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">연차 일수</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={annualLeaveCount}
              onChange={(e) => setAnnualLeaveCount(parseInt(e.target.value) || 0)}
              min="0"
              max="30"
              className="w-20 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-500">일</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">미사용 연차일수</div>
        </div>
        <InputField
          label="연차수당 일급"
          value={dailyLeaveRate}
          onChange={setDailyLeaveRate}
          description="1일 통상임금"
        />
      </div>

      {/* 계산 과정 */}
      {isEligible && severancePay > 0 && (
        <div className="border-b border-neutral-200">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-800">4. 계산 과정</h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">① 3개월 임금 합계 ({formatNumber(baseSalary + allowances)} × 3)</span>
              <span className="font-medium">{formatNumber(threeMonthWage)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">② 상여금 3개월분 ({formatNumber(annualBonus)} ÷ 12 × 3)</span>
              <span className="font-medium">{formatNumber(bonusPortion)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">③ 연차수당 3개월분</span>
              <span className="font-medium">{formatNumber(leavePortion)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-emerald-50 -mx-4 px-4">
              <span className="text-neutral-700 font-medium">3개월 총액 (①+②+③)</span>
              <span className="font-bold text-emerald-700">{formatNumber(totalThreeMonth)}원</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">3개월 총 일수</span>
              <span className="font-medium">{threeMonthDays}일</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 bg-blue-50 -mx-4 px-4">
              <span className="text-neutral-700 font-medium">1일 평균임금 ({formatNumber(totalThreeMonth)} ÷ {threeMonthDays})</span>
              <span className="font-bold text-blue-700">{formatNumber(avgDailyWage)}원</span>
            </div>
          </div>
        </div>
      )}

      {/* 결과 */}
      {isEligible && severancePay > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="bg-emerald-600 px-6 py-3">
            <h3 className="font-semibold text-white">퇴직금 계산 결과</h3>
          </div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 퇴직금</p>
              <p className="text-4xl font-bold text-emerald-600 mb-2">
                {formatNumber(severancePay)}원
              </p>
              <p className="text-sm text-neutral-500">
                = {formatNumber(avgDailyWage)}원 × 30일 × ({workDays}일 ÷ 365)
              </p>
            </div>
            <div className="mt-4 p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-neutral-600">
                <span className="font-medium">약 {(severancePay / (baseSalary + allowances)).toFixed(1)}개월치</span> 월급에 해당해요.
                {workDays >= 365 && workDays < 730 && " 1년 근무 시 약 1개월치가 기준이에요."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 일용직 계산기
function DailyWorkerCalculator() {
  const [dailyWage, setDailyWage] = useState(150000);
  const [workDays, setWorkDays] = useState(252);

  const avgDailyWage = dailyWage;
  const severancePay = avgDailyWage * 30 * (workDays / 365);
  const isEligible = workDays >= 365;

  return (
    <>
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">일용직 퇴직금 계산</h3>
          <p className="text-xs text-neutral-500 mt-1">건설근로자 등 일용직 근로자용</p>
        </div>
        <InputField
          label="일당"
          value={dailyWage}
          onChange={setDailyWage}
          description="하루 일당"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">총 근무일수</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={workDays}
              onChange={(e) => setWorkDays(parseInt(e.target.value) || 0)}
              min="0"
              className="w-24 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-500">일</span>
          </div>
          <div className="sm:w-64 text-xs text-neutral-500">같은 사업장 총 근무일수</div>
        </div>
      </div>

      {/* 자격 확인 */}
      {!isEligible && (
        <div className="mx-4 my-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-xl">⚠️</span>
            <div>
              <p className="font-medium text-emerald-800">퇴직금 지급 대상이 아니에요</p>
              <p className="text-sm text-amber-700 mt-1">
                퇴직금은 1년(365일) 이상 근무해야 받을 수 있어요. 현재 {workDays}일 근무로 {365 - workDays}일 부족해요.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 건설근로자 퇴직공제 안내 */}
      <div className="mx-4 my-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-2">
          <span className="text-blue-500 text-xl">ℹ️</span>
          <div>
            <p className="font-medium text-emerald-800">건설근로자 퇴직공제</p>
            <p className="text-sm text-blue-700 mt-1">
              건설현장 일용직은 <strong>건설근로자 퇴직공제</strong> 제도를 이용할 수 있어요.
              252일 이상 근무하면 퇴직공제금을 받을 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 결과 */}
      {isEligible && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="bg-emerald-600 px-6 py-3">
            <h3 className="font-semibold text-white">퇴직금 계산 결과</h3>
          </div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 퇴직금</p>
              <p className="text-4xl font-bold text-emerald-600 mb-2">
                {formatNumber(severancePay)}원
              </p>
              <p className="text-sm text-neutral-500">
                = {formatNumber(avgDailyWage)}원 × 30일 × ({workDays}일 ÷ 365)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 아르바이트 계산기
function ParttimeWorkerCalculator() {
  const [hourlyWage, setHourlyWage] = useState(10360);
  const [hoursPerDay, setHoursPerDay] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [workMonths, setWorkMonths] = useState(12);

  const weeklyHours = hoursPerDay * daysPerWeek;
  const isWeeklyMinimum = weeklyHours >= 15;
  const isYearMinimum = workMonths >= 12;

  const dailyWage = hourlyWage * hoursPerDay;
  const monthlyWage = dailyWage * daysPerWeek * 4.35; // 4.35주
  const workDays = workMonths * 30;

  const avgDailyWage = (monthlyWage * 3) / 92;
  const severancePay = avgDailyWage * 30 * (workDays / 365);

  return (
    <>
      <div className="border-b border-neutral-200">
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">아르바이트 퇴직금 계산</h3>
          <p className="text-xs text-neutral-500 mt-1">파트타임, 편의점, 카페 등 시급제 근무자용</p>
        </div>
        <InputField
          label="시급"
          value={hourlyWage}
          onChange={setHourlyWage}
          description="2026년 최저시급 10,320원"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">일 근무시간</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 0)}
              min="1"
              max="12"
              className="w-20 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-500">시간</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">주 근무일수</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value) || 0)}
              min="1"
              max="7"
              className="w-20 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-500">일</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 border-b border-neutral-100">
          <div className="sm:w-48 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">총 근무기간</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={workMonths}
              onChange={(e) => setWorkMonths(parseInt(e.target.value) || 0)}
              min="0"
              className="w-20 px-3 py-2 text-right border border-neutral-300 rounded-lg bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-sm text-neutral-500">개월</span>
          </div>
        </div>
        <div className="py-3 px-4 border-b border-neutral-100 bg-blue-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700">주당 근무시간</span>
            <span className={`font-bold ${isWeeklyMinimum ? "text-emerald-600" : "text-red-600"}`}>
              {weeklyHours}시간 {isWeeklyMinimum ? "✓" : "(15시간 미만)"}
            </span>
          </div>
        </div>
      </div>

      {/* 자격 확인 */}
      {(!isWeeklyMinimum || !isYearMinimum) && (
        <div className="mx-4 my-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-xl">⚠️</span>
            <div>
              <p className="font-medium text-emerald-800">퇴직금 지급 대상이 아니에요</p>
              <ul className="text-sm text-amber-700 mt-1 space-y-1">
                {!isWeeklyMinimum && (
                  <li>• 주 15시간 이상 근무해야 해요 (현재 {weeklyHours}시간)</li>
                )}
                {!isYearMinimum && (
                  <li>• 1년(12개월) 이상 근무해야 해요 (현재 {workMonths}개월)</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 월급 정보 */}
      <div className="mx-4 my-4 p-4 bg-neutral-50 rounded-xl">
        <h4 className="font-medium text-neutral-700 mb-2">계산 기준</h4>
        <div className="space-y-1 text-sm text-neutral-600">
          <p>• 일급: {formatNumber(dailyWage)}원 ({formatNumber(hourlyWage)}원 × {hoursPerDay}시간)</p>
          <p>• 월급 (추정): {formatNumber(monthlyWage)}원</p>
          <p>• 1일 평균임금: {formatNumber(avgDailyWage)}원</p>
        </div>
      </div>

      {/* 결과 */}
      {isWeeklyMinimum && isYearMinimum && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="bg-emerald-600 px-6 py-3">
            <h3 className="font-semibold text-white">퇴직금 계산 결과</h3>
          </div>
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-neutral-500 mb-2">예상 퇴직금</p>
              <p className="text-4xl font-bold text-emerald-600 mb-2">
                {formatNumber(severancePay)}원
              </p>
              <p className="text-sm text-neutral-500">
                = {formatNumber(avgDailyWage)}원 × 30일 × ({workDays}일 ÷ 365)
              </p>
            </div>
            <div className="mt-4 p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-neutral-600">
                알바도 1년 이상 + 주 15시간 이상 근무하면 퇴직금을 받을 수 있어요.
                4대보험 가입 여부와 상관없어요.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function SeverancePayCalculator() {
  const [workerType, setWorkerType] = useState<WorkerType>("regular");

  const tabs: { type: WorkerType; label: string; description: string }[] = [
    { type: "regular", label: "직장인", description: "정규직, 계약직" },
    { type: "daily", label: "일용직", description: "건설근로자 등" },
    { type: "parttime", label: "알바", description: "시급제 파트타임" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* 헤더 */}
      <div className="bg-emerald-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold">퇴직금 계산기</h2>
        <p className="text-emerald-100 text-sm mt-1">고용노동부 공식과 동일한 방식으로 계산해요</p>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setWorkerType(tab.type)}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              workerType === tab.type
                ? "bg-emerald-50 border-b-2 border-emerald-600 text-emerald-700"
                : "text-neutral-500 hover:bg-neutral-50"
            }`}
          >
            <span className="font-medium block">{tab.label}</span>
            <span className="text-xs opacity-75">{tab.description}</span>
          </button>
        ))}
      </div>

      {/* 근로자 유형별 계산기 */}
      {workerType === "regular" && <RegularWorkerCalculator />}
      {workerType === "daily" && <DailyWorkerCalculator />}
      {workerType === "parttime" && <ParttimeWorkerCalculator />}

      {/* 주의사항 */}
      <div className="px-6 py-4 bg-neutral-50 text-xs text-neutral-500">
        <p>* 이 계산기는 참고용이에요. 실제 퇴직금과 다를 수 있어요.</p>
        <p>* 정확한 계산은 <a href="https://www.moel.go.kr/retirementpayCal.do" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">고용노동부 퇴직금 계산기</a>를 이용하세요.</p>
        <p>* 퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요.</p>
      </div>

      {/* 근속연수별 퇴직금 예상표 */}
      <div className="px-6 pb-6">
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 근속연수별 퇴직금 예상표</h4>
          <p className="text-xs text-neutral-500 text-center mb-3">월급(기본급+수당) 기준, 상여금·연차수당 미포함</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">근속 ↓ / 월급 →</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">250만원</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">300만원</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300">350만원</th>
                  <th className="py-2 px-2 text-center text-emerald-700 font-bold border border-gray-300 hidden sm:table-cell">400만원</th>
                  <th className="py-2 px-2 text-center text-neutral-600 font-medium border border-gray-300 hidden md:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-neutral-700 border border-gray-300">1년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">250만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">300만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">350만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">400만</td>
                  <td className="py-2 px-2 text-center text-neutral-600 text-xs border border-gray-300 hidden md:table-cell">약 1개월치</td>
                </tr>
                <tr className="bg-green-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-green-700 border border-gray-300">3년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">750만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">900만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1,050만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">1,200만</td>
                  <td className="py-2 px-2 text-center text-green-600 text-xs border border-gray-300 hidden md:table-cell">목돈 1천 돌파!</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-emerald-700 border border-gray-300">5년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1,250만</td>
                  <td className="py-2 px-2 text-center font-bold text-emerald-600 border border-gray-300">1,500만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">1,750만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">2,000만</td>
                  <td className="py-2 px-2 text-center text-emerald-600 text-xs border border-gray-300 hidden md:table-cell">목돈 2천 가능!</td>
                </tr>
                <tr className="bg-blue-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium text-blue-700 border border-gray-300">10년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">2,500만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">3,000만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">3,500만</td>
                  <td className="py-2 px-2 text-center border border-gray-300 hidden sm:table-cell">4,000만</td>
                  <td className="py-2 px-2 text-center text-blue-600 text-xs border border-gray-300 hidden md:table-cell">차 바꿀 돈!</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 px-2 text-center font-medium text-purple-700 border border-gray-300">20년</td>
                  <td className="py-2 px-2 text-center border border-gray-300">5,000만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">6,000만</td>
                  <td className="py-2 px-2 text-center border border-gray-300">7,000만</td>
                  <td className="py-2 px-2 text-center font-bold text-purple-600 border border-gray-300 hidden sm:table-cell">8,000만</td>
                  <td className="py-2 px-2 text-center text-purple-600 text-xs border border-gray-300 hidden md:table-cell">집 계약금 수준!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">💡 핵심 포인트</p>
            <ul className="text-xs text-emerald-700 mt-1 space-y-1">
              <li>• 퇴직금 = 월급 × 근속연수 (단순 계산)</li>
              <li>• 상여금·연차수당까지 포함하면 실제 더 많이 받아요</li>
              <li>• 알바도 주 15시간 이상 + 1년 이상이면 퇴직금 발생!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
