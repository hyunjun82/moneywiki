"use client";

import { useState, useEffect } from "react";

type CalculationType = "monthToYear" | "hourToYear";

export default function AnnualSalaryCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("monthToYear");
  const [monthlyPay, setMonthlyPay] = useState<number>(0);
  const [hourlyPay, setHourlyPay] = useState<number>(0);
  const [bonusMonths, setBonusMonths] = useState<number>(0);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5);

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

        {/* 2026년 연봉별 실수령액표 */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-3">2026년 연봉별 실수령액표 (최신 4대보험 요율 적용)</h4>
          <div className="overflow-x-auto">
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
                <tr className="border-b border-neutral-100 bg-yellow-50">
                  <td className="py-1.5 px-1 font-medium">2,400만</td>
                  <td className="py-1.5 px-1 text-right">200만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">21만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">179만</td>
                  <td className="py-1.5 px-1 text-right">10.5%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">2026 최저연봉</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">3,000만</td>
                  <td className="py-1.5 px-1 text-right">250만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">28만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">222만</td>
                  <td className="py-1.5 px-1 text-right">11.2%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">사회초년생 평균</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">3,500만</td>
                  <td className="py-1.5 px-1 text-right">291만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">38만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">253만</td>
                  <td className="py-1.5 px-1 text-right">13.0%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">250 돌파!</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">4,000만</td>
                  <td className="py-1.5 px-1 text-right">333만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">49만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">284만</td>
                  <td className="py-1.5 px-1 text-right">14.7%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">중소기업 대리급</td>
                </tr>
                <tr className="border-b border-neutral-100 bg-emerald-50">
                  <td className="py-1.5 px-1 font-medium">4,500만</td>
                  <td className="py-1.5 px-1 text-right">375만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">60만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">315만</td>
                  <td className="py-1.5 px-1 text-right">16.0%</td>
                  <td className="py-1.5 px-1 text-emerald-600 hidden sm:table-cell">실수령 300 돌파!</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">5,000만</td>
                  <td className="py-1.5 px-1 text-right">416만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">72만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">344만</td>
                  <td className="py-1.5 px-1 text-right">17.3%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">대기업 신입 평균</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">5,500만</td>
                  <td className="py-1.5 px-1 text-right">458만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">84만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">374만</td>
                  <td className="py-1.5 px-1 text-right">18.3%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">소나타 할부 가능</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">6,000만</td>
                  <td className="py-1.5 px-1 text-right">500만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">98만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">402만</td>
                  <td className="py-1.5 px-1 text-right">19.6%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">실수령 400 돌파!</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">7,000만</td>
                  <td className="py-1.5 px-1 text-right">583만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">128만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">455만</td>
                  <td className="py-1.5 px-1 text-right">21.9%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">과장급 중위권</td>
                </tr>
                <tr className="border-b border-neutral-100 bg-emerald-50">
                  <td className="py-1.5 px-1 font-medium">8,000만</td>
                  <td className="py-1.5 px-1 text-right">666만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">158만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">508만</td>
                  <td className="py-1.5 px-1 text-right">23.7%</td>
                  <td className="py-1.5 px-1 text-emerald-600 hidden sm:table-cell">실수령 500 돌파!</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">9,000만</td>
                  <td className="py-1.5 px-1 text-right">750만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">191만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">559만</td>
                  <td className="py-1.5 px-1 text-right">25.5%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">차장급</td>
                </tr>
                <tr className="border-b border-neutral-100 bg-yellow-50">
                  <td className="py-1.5 px-1 font-medium">1억</td>
                  <td className="py-1.5 px-1 text-right">833만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">227만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">606만</td>
                  <td className="py-1.5 px-1 text-right">27.2%</td>
                  <td className="py-1.5 px-1 text-amber-600 hidden sm:table-cell">억대 연봉!</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">1.2억</td>
                  <td className="py-1.5 px-1 text-right">1,000만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">302만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">698만</td>
                  <td className="py-1.5 px-1 text-right">30.2%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">월급 천만원대</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-1.5 px-1">1.5억</td>
                  <td className="py-1.5 px-1 text-right">1,250만</td>
                  <td className="py-1.5 px-1 text-right text-red-500">421만</td>
                  <td className="py-1.5 px-1 text-right font-bold text-emerald-600">829만</td>
                  <td className="py-1.5 px-1 text-right">33.7%</td>
                  <td className="py-1.5 px-1 text-gray-500 hidden sm:table-cell">임원급</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-neutral-500">* 4대보험(국민연금·건강보험·고용보험·산재보험) + 소득세 + 지방소득세 공제 기준</p>
          <p className="text-xs text-neutral-500">* 부양가족 1인(본인) 기준, 비과세 항목 미적용 시 예상 금액</p>
        </div>
      </div>
    </div>
  );
}
