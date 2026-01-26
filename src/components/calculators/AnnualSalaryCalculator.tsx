"use client";

import { useState, useEffect } from "react";

type CalculationType = "monthToYear" | "hourToYear";
type TableType = "annual" | "monthly";

export default function AnnualSalaryCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("monthToYear");
  const [monthlyPay, setMonthlyPay] = useState<number>(0);
  const [hourlyPay, setHourlyPay] = useState<number>(0);
  const [bonusMonths, setBonusMonths] = useState<number>(0);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5);
  const [tableType, setTableType] = useState<TableType>("annual");

  const [annualSalary, setAnnualSalary] = useState<number>(0);
  const [monthlyAverage, setMonthlyAverage] = useState<number>(0);
  const [dailyWage, setDailyWage] = useState<number>(0);
  const [hourlyWage, setHourlyWage] = useState<number>(0);

  // 2026년 최저시급
  const MIN_WAGE_2026 = 10320;
  const WEEKS_PER_MONTH = 4.345;

  useEffect(() => {
    if (calcType === "monthToYear") {
      if (monthlyPay <= 0) {
        setAnnualSalary(0);
        setMonthlyAverage(0);
        setDailyWage(0);
        setHourlyWage(0);
        return;
      }

      // 월급 → 연봉
      const annual = monthlyPay * 12 + monthlyPay * bonusMonths;
      const monthlyAvg = annual / 12;
      const weeklyHours = workHoursPerDay * workDaysPerWeek;
      const monthlyHours = weeklyHours * WEEKS_PER_MONTH;
      const hourly = monthlyAvg / monthlyHours;
      const daily = hourly * workHoursPerDay;

      setAnnualSalary(Math.round(annual));
      setMonthlyAverage(Math.round(monthlyAvg));
      setDailyWage(Math.round(daily));
      setHourlyWage(Math.round(hourly));
    } else {
      if (hourlyPay <= 0) {
        setAnnualSalary(0);
        setMonthlyAverage(0);
        setDailyWage(0);
        setHourlyWage(0);
        return;
      }

      // 시급 → 연봉
      const weeklyHours = workHoursPerDay * workDaysPerWeek;
      const weeklyPay = hourlyPay * weeklyHours;

      // 주휴수당 포함 (주 15시간 이상)
      const weeklyHolidayPay = weeklyHours >= 15 ? hourlyPay * workHoursPerDay : 0;
      const totalWeeklyPay = weeklyPay + weeklyHolidayPay;

      const monthlyPay = totalWeeklyPay * WEEKS_PER_MONTH;
      const annual = monthlyPay * 12;
      const daily = hourlyPay * workHoursPerDay;

      setAnnualSalary(Math.round(annual));
      setMonthlyAverage(Math.round(monthlyPay));
      setDailyWage(Math.round(daily));
      setHourlyWage(Math.round(hourlyPay));
    }
  }, [calcType, monthlyPay, hourlyPay, bonusMonths, workHoursPerDay, workDaysPerWeek]);

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

  const isMinWageOk = hourlyWage >= MIN_WAGE_2026;

  // 연봉 기준 실수령액 표 데이터
  const annualSalaryData = [
    { annual: "1,000만", monthly: "83만", deduction: "10만", netPay: "73만", rate: "12.0%", note: "저소득 구간" },
    { annual: "1,100만", monthly: "92만", deduction: "11만", netPay: "81만", rate: "12.0%", note: "" },
    { annual: "1,200만", monthly: "100만", deduction: "12만", netPay: "88만", rate: "12.0%", note: "" },
    { annual: "1,300만", monthly: "108만", deduction: "14만", netPay: "94만", rate: "13.0%", note: "소득세 시작" },
    { annual: "1,400만", monthly: "117만", deduction: "15만", netPay: "102만", rate: "12.8%", note: "" },
    { annual: "1,500만", monthly: "125만", deduction: "17만", netPay: "108만", rate: "13.6%", note: "" },
    { annual: "1,600만", monthly: "133만", deduction: "19만", netPay: "114만", rate: "14.3%", note: "" },
    { annual: "1,700만", monthly: "142만", deduction: "21만", netPay: "121만", rate: "14.8%", note: "" },
    { annual: "1,800만", monthly: "150만", deduction: "23만", netPay: "127만", rate: "15.3%", note: "" },
    { annual: "1,900만", monthly: "158만", deduction: "25만", netPay: "133만", rate: "15.8%", note: "" },
    { annual: "2,000만", monthly: "167만", deduction: "27만", netPay: "140만", rate: "16.2%", note: "" },
    { annual: "2,400만", monthly: "200만", deduction: "21만", netPay: "179만", rate: "10.5%", note: "2026 최저연봉", highlight: true },
    { annual: "3,000만", monthly: "250만", deduction: "28만", netPay: "222만", rate: "11.2%", note: "사회초년생 평균" },
    { annual: "3,500만", monthly: "291만", deduction: "38만", netPay: "253만", rate: "13.0%", note: "250 돌파!" },
    { annual: "4,000만", monthly: "333만", deduction: "49만", netPay: "284만", rate: "14.7%", note: "중소기업 대리급" },
    { annual: "4,500만", monthly: "375만", deduction: "60만", netPay: "315만", rate: "16.0%", note: "실수령 300 돌파!", highlight: true },
    { annual: "5,000만", monthly: "416만", deduction: "72만", netPay: "344만", rate: "17.3%", note: "대기업 신입 평균" },
    { annual: "5,500만", monthly: "458만", deduction: "84만", netPay: "374만", rate: "18.3%", note: "소나타 할부 가능" },
    { annual: "6,000만", monthly: "500만", deduction: "98만", netPay: "402만", rate: "19.6%", note: "실수령 400 돌파!" },
    { annual: "7,000만", monthly: "583만", deduction: "128만", netPay: "455만", rate: "21.9%", note: "과장급 중위권" },
    { annual: "8,000만", monthly: "666만", deduction: "158만", netPay: "508만", rate: "23.7%", note: "실수령 500 돌파!", highlight: true },
    { annual: "9,000만", monthly: "750만", deduction: "191만", netPay: "559만", rate: "25.5%", note: "차장급" },
    { annual: "1억", monthly: "833만", deduction: "227만", netPay: "606만", rate: "27.2%", note: "억대 연봉!", highlight: true },
    { annual: "1.2억", monthly: "1,000만", deduction: "302만", netPay: "698만", rate: "30.2%", note: "월급 천만원대" },
    { annual: "1.5억", monthly: "1,250만", deduction: "421만", netPay: "829만", rate: "33.7%", note: "임원급" },
  ];

  // 월급 기준 실수령액 표 데이터
  const monthlySalaryData = [
    { monthly: "100만", netPay: "92만", deduction: "8만", rate: "8.0%", note: "최저 구간" },
    { monthly: "110만", netPay: "101만", deduction: "9만", rate: "8.2%", note: "" },
    { monthly: "120만", netPay: "110만", deduction: "10만", rate: "8.3%", note: "" },
    { monthly: "130만", netPay: "119만", deduction: "11만", rate: "8.5%", note: "" },
    { monthly: "140만", netPay: "128만", deduction: "12만", rate: "8.6%", note: "" },
    { monthly: "150만", netPay: "137만", deduction: "13만", rate: "8.7%", note: "" },
    { monthly: "160만", netPay: "146만", deduction: "14만", rate: "8.8%", note: "" },
    { monthly: "170만", netPay: "155만", deduction: "15만", rate: "8.8%", note: "" },
    { monthly: "180만", netPay: "164만", deduction: "16만", rate: "8.9%", note: "" },
    { monthly: "190만", netPay: "173만", deduction: "17만", rate: "8.9%", note: "" },
    { monthly: "200만", netPay: "182만", deduction: "18만", rate: "9.0%", note: "2026 최저월급", highlight: true },
    { monthly: "210만", netPay: "190만", deduction: "20만", rate: "9.5%", note: "" },
    { monthly: "220만", netPay: "199만", deduction: "21만", rate: "9.5%", note: "" },
    { monthly: "230만", netPay: "208만", deduction: "22만", rate: "9.6%", note: "" },
    { monthly: "240만", netPay: "217만", deduction: "23만", rate: "9.6%", note: "" },
    { monthly: "250만", netPay: "225만", deduction: "25만", rate: "10.0%", note: "초년생 평균", highlight: true },
    { monthly: "260만", netPay: "234만", deduction: "26만", rate: "10.0%", note: "" },
    { monthly: "270만", netPay: "243만", deduction: "27만", rate: "10.0%", note: "" },
    { monthly: "280만", netPay: "252만", deduction: "28만", rate: "10.0%", note: "" },
    { monthly: "290만", netPay: "260만", deduction: "30만", rate: "10.3%", note: "" },
    { monthly: "300만", netPay: "269만", deduction: "31만", rate: "10.3%", note: "중소기업 평균", highlight: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">연봉 계산기</h2>
            <p className="text-emerald-100 text-sm">월급/시급 → 연봉 환산</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 계산 유형 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setCalcType("monthToYear")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              calcType === "monthToYear"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            월급 → 연봉
          </button>
          <button
            onClick={() => setCalcType("hourToYear")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              calcType === "hourToYear"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            시급 → 연봉
          </button>
        </div>

        {calcType === "monthToYear" ? (
          <>
            {/* 월급 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">월급 (세전)</label>
              <div className="relative">
                <input
                  type="text"
                  value={monthlyPay > 0 ? formatNumber(monthlyPay) : ""}
                  onChange={(e) => setMonthlyPay(parseInt(e.target.value.replace(/,/g, "")) || 0)}
                  placeholder="월급 입력"
                  className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
              </div>
              {monthlyPay > 0 && <p className="mt-1 text-sm text-emerald-600">{formatWon(monthlyPay)}</p>}

              <div className="flex gap-2 mt-3">
                {[2000000, 2500000, 3000000, 4000000, 5000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setMonthlyPay(amount)}
                    className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                  >
                    {amount / 10000}만
                  </button>
                ))}
              </div>
            </div>

            {/* 상여금 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">연간 상여금 (월급 기준)</label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((months) => (
                  <button
                    key={months}
                    onClick={() => setBonusMonths(months)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      bonusMonths === months
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {months === 0 ? "없음" : `${months}개월분`}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-neutral-500">설, 추석, 성과급 등 연간 상여금</p>
            </div>
          </>
        ) : (
          <>
            {/* 시급 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">시급</label>
              <div className="relative">
                <input
                  type="text"
                  value={hourlyPay > 0 ? formatNumber(hourlyPay) : ""}
                  onChange={(e) => setHourlyPay(parseInt(e.target.value.replace(/,/g, "")) || 0)}
                  placeholder="시급 입력"
                  className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">2026년 최저시급: {formatNumber(MIN_WAGE_2026)}원</p>

              <div className="flex gap-2 mt-3">
                {[MIN_WAGE_2026, 11000, 12000, 15000, 20000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setHourlyPay(amount)}
                    className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                  >
                    {formatNumber(amount)}
                  </button>
                ))}
              </div>
            </div>

            {/* 근무시간 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">일 근무시간</label>
                <select
                  value={workHoursPerDay}
                  onChange={(e) => setWorkHoursPerDay(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
                >
                  {[4, 5, 6, 7, 8, 9, 10].map((h) => (
                    <option key={h} value={h}>{h}시간</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">주 근무일수</label>
                <select
                  value={workDaysPerWeek}
                  onChange={(e) => setWorkDaysPerWeek(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
                >
                  {[3, 4, 5, 6].map((d) => (
                    <option key={d} value={d}>{d}일</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* 결과 */}
        {(calcType === "monthToYear" ? monthlyPay > 0 : hourlyPay > 0) && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">환산 결과</h3>

            <div className="bg-white rounded-xl p-5 mb-4 border-2 border-emerald-200">
              <div className="text-sm text-neutral-500 mb-1">예상 연봉</div>
              <div className="text-3xl font-bold text-emerald-600">{formatNumber(annualSalary)}원</div>
              <div className="text-sm text-neutral-500">{formatWon(annualSalary)}</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">월 환산</div>
                <div className="text-lg font-bold text-neutral-800">{formatNumber(monthlyAverage)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">일 환산</div>
                <div className="text-lg font-bold text-neutral-800">{formatNumber(dailyWage)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-1">시급 환산</div>
                <div className={`text-lg font-bold ${isMinWageOk ? "text-neutral-800" : "text-red-500"}`}>
                  {formatNumber(hourlyWage)}원
                </div>
                {!isMinWageOk && (
                  <div className="text-xs text-red-500">최저시급 미달</div>
                )}
              </div>
            </div>

            {calcType === "hourToYear" && workHoursPerDay * workDaysPerWeek >= 15 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-emerald-100">
                <div className="text-sm text-blue-700">
                  ✓ 주 {workHoursPerDay * workDaysPerWeek}시간 근무 → 주휴수당 포함 계산
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">연봉 계산 기준</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 월급 × 12 + 상여금 = 연봉</li>
            <li>• 시급 × 주 근무시간 × 4.345주 × 12개월</li>
            <li>• 주 15시간 이상 근무 시 주휴수당 포함</li>
            <li>• 세전 금액 기준 (4대보험, 세금 별도)</li>
          </ul>
        </div>

        {/* 2026년 실수령액표 - Segmented Control 탭 */}
        <div className="mt-6">
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

          {/* 광고 공간 */}
          <div className="mb-4 min-h-[90px] bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200">
            <p className="text-neutral-400 text-sm">광고 영역</p>
          </div>

          {/* 실수령액 표 */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h4 className="font-medium text-emerald-800 mb-3">
              2026년 {tableType === "annual" ? "연봉별" : "월급별"} 실수령액표 (최신 4대보험 요율 적용)
            </h4>
            <div className="overflow-x-auto">
              {tableType === "annual" ? (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-emerald-200 bg-emerald-100">
                      <th className="py-2 px-1 text-left text-emerald-700">연봉</th>
                      <th className="py-2 px-1 text-right text-emerald-700">월급</th>
                      <th className="py-2 px-1 text-right text-emerald-700">공제</th>
                      <th className="py-2 px-1 text-right text-emerald-700 font-bold">실수령</th>
                      <th className="py-2 px-1 text-right text-emerald-700">공제율</th>
                      <th className="py-2 px-1 text-left text-emerald-700 hidden sm:table-cell">한줄평</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    {annualSalaryData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-neutral-100 ${row.highlight ? "bg-emerald-50" : ""}`}
                      >
                        <td className={`py-1.5 px-1 ${row.highlight ? "font-medium" : ""}`}>{row.annual}</td>
                        <td className="py-1.5 px-1 text-right">{row.monthly}</td>
                        <td className="py-1.5 px-1 text-right text-red-500">{row.deduction}</td>
                        <td className="py-1.5 px-1 text-right font-bold text-emerald-600">{row.netPay}</td>
                        <td className="py-1.5 px-1 text-right">{row.rate}</td>
                        <td className={`py-1.5 px-1 hidden sm:table-cell ${row.highlight ? "text-emerald-600 font-medium" : "text-gray-500"}`}>
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-emerald-200 bg-emerald-100">
                      <th className="py-2 px-1 text-left text-emerald-700">월급</th>
                      <th className="py-2 px-1 text-right text-emerald-700 font-bold">실수령</th>
                      <th className="py-2 px-1 text-right text-emerald-700">공제</th>
                      <th className="py-2 px-1 text-right text-emerald-700">공제율</th>
                      <th className="py-2 px-1 text-left text-emerald-700 hidden sm:table-cell">한줄평</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    {monthlySalaryData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-neutral-100 ${row.highlight ? "bg-emerald-50" : ""}`}
                      >
                        <td className={`py-1.5 px-1 ${row.highlight ? "font-medium" : ""}`}>{row.monthly}</td>
                        <td className="py-1.5 px-1 text-right font-bold text-emerald-600">{row.netPay}</td>
                        <td className="py-1.5 px-1 text-right text-red-500">{row.deduction}</td>
                        <td className="py-1.5 px-1 text-right">{row.rate}</td>
                        <td className={`py-1.5 px-1 hidden sm:table-cell ${row.highlight ? "text-emerald-600 font-medium" : "text-gray-500"}`}>
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <p className="mt-2 text-xs text-neutral-500">* 4대보험(국민연금·건강보험·고용보험·산재보험) + 소득세 + 지방소득세 공제 기준</p>
            <p className="text-xs text-neutral-500">* 부양가족 1인(본인) 기준, 비과세 항목 미적용 시 예상 금액</p>
          </div>
        </div>
      </div>
    </div>
  );
}
