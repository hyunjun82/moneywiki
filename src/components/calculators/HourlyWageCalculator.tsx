"use client";

import { useState, useEffect } from "react";

type CalcMode = "toMonthly" | "toHourly";

export default function HourlyWageCalculator() {
  const [mode, setMode] = useState<CalcMode>("toMonthly");
  const [hourlyWage, setHourlyWage] = useState<number>(0);
  const [monthlyWage, setMonthlyWage] = useState<number>(0);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);
  const [includeHolidayPay, setIncludeHolidayPay] = useState<boolean>(true);

  const [resultMonthly, setResultMonthly] = useState<number>(0);
  const [resultHourly, setResultHourly] = useState<number>(0);
  const [resultDaily, setResultDaily] = useState<number>(0);
  const [resultAnnual, setResultAnnual] = useState<number>(0);

  const MIN_WAGE_2026 = 10320;

  useEffect(() => {
    // 월 환산 계수: 4.345주 (365일 / 12개월 / 7일)
    const weeksPerMonth = 4.345;
    const holidayHours = includeHolidayPay && weeklyHours >= 15 ? weeklyHours / 5 : 0; // 주휴시간
    const totalWeeklyHours = weeklyHours + holidayHours;

    if (mode === "toMonthly" && hourlyWage > 0) {
      const monthly = Math.round(hourlyWage * totalWeeklyHours * weeksPerMonth);
      const daily = Math.round(hourlyWage * (weeklyHours / 5));
      setResultMonthly(monthly);
      setResultDaily(daily);
      setResultAnnual(monthly * 12);
      setResultHourly(hourlyWage);
    } else if (mode === "toHourly" && monthlyWage > 0) {
      const hourly = Math.round(monthlyWage / (totalWeeklyHours * weeksPerMonth));
      const daily = Math.round(hourly * (weeklyHours / 5));
      setResultHourly(hourly);
      setResultDaily(daily);
      setResultMonthly(monthlyWage);
      setResultAnnual(monthlyWage * 12);
    } else {
      setResultMonthly(0);
      setResultHourly(0);
      setResultDaily(0);
      setResultAnnual(0);
    }
  }, [mode, hourlyWage, monthlyWage, weeklyHours, includeHolidayPay]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

  const isMinimumWage = resultHourly > 0 && resultHourly < MIN_WAGE_2026;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-[#1E3A5F] to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">시급 계산기</h2>
            <p className="text-[#EDF2F8] text-sm">시급 ↔ 월급 변환</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 모드 선택 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("toMonthly")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              mode === "toMonthly"
                ? "bg-[#1E3A5F] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            시급 → 월급
          </button>
          <button
            onClick={() => setMode("toHourly")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              mode === "toHourly"
                ? "bg-[#1E3A5F] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            월급 → 시급
          </button>
        </div>

        {/* 입력 */}
        {mode === "toMonthly" ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">시급</label>
            <div className="relative">
              <input
                type="text"
                value={hourlyWage > 0 ? formatNumber(hourlyWage) : ""}
                onChange={(e) => setHourlyWage(parseInt(e.target.value.replace(/,/g, "")) || 0)}
                placeholder={`2026 최저시급 ${formatNumber(MIN_WAGE_2026)}원`}
                className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-[#2B5280] focus:ring-0 text-right pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setHourlyWage(MIN_WAGE_2026)} className="flex-1 py-2 bg-[#EDF2F8] hover:bg-[#B8D0E8] text-[#1E3A5F] rounded-lg text-sm font-medium">최저시급</button>
              <button onClick={() => setHourlyWage(12000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">12,000</button>
              <button onClick={() => setHourlyWage(15000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">15,000</button>
              <button onClick={() => setHourlyWage(20000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">20,000</button>
              <button onClick={() => setHourlyWage(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">월급</label>
            <div className="relative">
              <input
                type="text"
                value={monthlyWage > 0 ? formatNumber(monthlyWage) : ""}
                onChange={(e) => setMonthlyWage(parseInt(e.target.value.replace(/,/g, "")) || 0)}
                placeholder="월급을 입력하세요"
                className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-[#2B5280] focus:ring-0 text-right pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
            </div>
            <div className="flex gap-2 mt-3">
              {[2000000, 2500000, 3000000, 3500000, 4000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setMonthlyWage(amount)}
                  className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium"
                >
                  {amount / 10000}만
                </button>
              ))}
              <button onClick={() => setMonthlyWage(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
            </div>
          </div>
        )}

        {/* 설정 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">주간 근무시간</label>
            <select
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-[#2B5280]"
            >
              {[15, 20, 25, 30, 35, 40].map((h) => (
                <option key={h} value={h}>{h}시간</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHolidayPay}
                onChange={(e) => setIncludeHolidayPay(e.target.checked)}
                className="w-5 h-5 text-[#1E3A5F] rounded"
              />
              <span className="text-sm text-neutral-700">주휴수당 포함</span>
            </label>
          </div>
        </div>

        {/* 결과 */}
        {(resultHourly > 0 || resultMonthly > 0) && (
          <div className="bg-gradient-to-r from-[#F5F8FB] to-teal-50 rounded-2xl p-6 border border-[#EDF2F8]">
            <h3 className="text-lg font-bold text-[#132A42] mb-4">환산 결과</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">시급</div>
                <div className="text-2xl font-bold text-[#1E3A5F]">{formatNumber(resultHourly)}원</div>
                {isMinimumWage && (
                  <div className="text-xs text-red-500 mt-1">최저시급 미달!</div>
                )}
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">일급 (8시간)</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(resultDaily)}원</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">월급</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(resultMonthly)}원</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">연봉</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(resultAnnual)}원</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-[#F5F8FB] rounded-xl border border-[#EDF2F8]">
          <h4 className="font-medium text-[#132A42] mb-2">계산 기준</h4>
          <ul className="text-sm text-[#162F4F] space-y-1">
            <li>• 월 환산: 주 근무시간 × 4.345주</li>
            <li>• 주휴수당: 주 15시간 이상 근무 시 1일분</li>
            <li>• 2026년 최저시급: {formatNumber(MIN_WAGE_2026)}원</li>
          </ul>
        </div>

        {/* 시급별 월급 비교표 */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <h4 className="font-bold text-neutral-800 mb-3 text-center">📊 시급별 월급 비교표</h4>
          <p className="text-xs text-neutral-500 mb-4 text-center">주 40시간, 주휴수당 포함 기준</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#EDF2F8] border-b-2 border-[#4A7AB5]">
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">시급</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">일급(8h)</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">월급</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300">연봉</th>
                  <th className="py-2 px-2 text-center text-[#162F4F] font-bold border border-gray-300 hidden sm:table-cell">한줄평</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-yellow-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-yellow-700 border border-gray-300">10,320원 ⭐</td>
                  <td className="py-2 px-2 text-center border border-gray-300">82,560원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">215만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">2,581만원</td>
                  <td className="py-2 px-2 text-center text-yellow-600 border border-gray-300 hidden sm:table-cell">2026 최저시급</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">11,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">88,000원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">229만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">2,752만원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">최저+α</td>
                </tr>
                <tr className="bg-[#F5F8FB] border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-[#162F4F] border border-gray-300">12,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">96,000원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">250만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">3,002만원</td>
                  <td className="py-2 px-2 text-center text-[#1E3A5F] border border-gray-300 hidden sm:table-cell">연봉 3천 돌파!</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">15,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">120,000원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">313만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">3,753만원</td>
                  <td className="py-2 px-2 text-center text-gray-500 border border-gray-300 hidden sm:table-cell">카페 알바 상위권</td>
                </tr>
                <tr className="bg-amber-50 border-b border-neutral-200">
                  <td className="py-2 px-2 text-center font-bold text-amber-700 border border-gray-300">20,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">160,000원</td>
                  <td className="py-2 px-2 text-center font-medium border border-gray-300">417만원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">5,004만원</td>
                  <td className="py-2 px-2 text-center text-amber-600 border border-gray-300 hidden sm:table-cell">연봉 5천 가능!</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="py-2 px-2 text-center font-bold text-red-700 border border-gray-300">30,000원</td>
                  <td className="py-2 px-2 text-center border border-gray-300">240,000원</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">626만원</td>
                  <td className="py-2 px-2 text-center font-bold text-red-600 border border-gray-300">7,506만원</td>
                  <td className="py-2 px-2 text-center text-red-600 border border-gray-300 hidden sm:table-cell">전문직 수준</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-[#EDF2F8] rounded-lg">
            <p className="text-xs text-[#132A42] font-medium">💡 알바 꿀팁</p>
            <ul className="text-xs text-[#162F4F] mt-1 space-y-1">
              <li>• <strong>주휴수당</strong>은 주 15시간 이상 근무 시 필수 지급!</li>
              <li>• 시급 1,000원 차이 = 월급 약 <strong>21만원</strong> 차이</li>
              <li>• 최저시급 미달 시 노동청에 신고 가능해요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
