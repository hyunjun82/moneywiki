"use client";

import { useState, useEffect } from "react";

export default function WeeklyHolidayPayCalculator() {
  const [hourlyWage, setHourlyWage] = useState<number>(0);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);
  const [workDays, setWorkDays] = useState<number>(5);
  const [weeklyHolidayPay, setWeeklyHolidayPay] = useState<number>(0);
  const [monthlyPay, setMonthlyPay] = useState<number>(0);

  const MIN_WAGE_2026 = 10320; // 2026년 최저임금

  useEffect(() => {
    if (hourlyWage <= 0 || weeklyHours <= 0) {
      setWeeklyHolidayPay(0);
      setMonthlyPay(0);
      return;
    }

    // 주휴수당 = 1주 소정근로시간 / 근무일수 × 시급
    // 주 15시간 이상 근무 시 발생
    if (weeklyHours >= 15) {
      const dailyHours = weeklyHours / workDays;
      const holidayPay = Math.round(dailyHours * hourlyWage);
      setWeeklyHolidayPay(holidayPay);

      // 월 환산 (4.345주)
      const monthlyBase = hourlyWage * weeklyHours * 4.345;
      const monthlyHoliday = holidayPay * 4.345;
      setMonthlyPay(Math.round(monthlyBase + monthlyHoliday));
    } else {
      setWeeklyHolidayPay(0);
      setMonthlyPay(Math.round(hourlyWage * weeklyHours * 4.345));
    }
  }, [hourlyWage, weeklyHours, workDays]);

  const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">주휴수당 계산기</h2>
            <p className="text-emerald-100 text-sm">주 15시간 이상 근무 시 발생</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">시급</label>
          <div className="relative">
            <input
              type="text"
              value={hourlyWage > 0 ? formatNumber(hourlyWage) : ""}
              onChange={(e) => setHourlyWage(parseInt(e.target.value.replace(/,/g, "")) || 0)}
              placeholder={`2026년 최저시급 ${formatNumber(MIN_WAGE_2026)}원`}
              className="w-full px-4 py-4 text-xl font-bold border-2 border-neutral-200 rounded-xl focus:border-emerald-500 focus:ring-0 text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">원</span>
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => setHourlyWage(MIN_WAGE_2026)} className="flex-1 py-2 bg-purple-100 hover:bg-purple-200 text-emerald-600 rounded-lg text-sm font-medium">최저시급</button>
            <button onClick={() => setHourlyWage(12000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">12,000원</button>
            <button onClick={() => setHourlyWage(15000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">15,000원</button>
            <button onClick={() => setHourlyWage(20000)} className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium">20,000원</button>
            <button onClick={() => setHourlyWage(0)} className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium">C</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">주간 근무시간</label>
            <select
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[15, 20, 25, 30, 35, 40].map((h) => (
                <option key={h} value={h}>{h}시간</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">주간 근무일수</label>
            <select
              value={workDays}
              onChange={(e) => setWorkDays(parseInt(e.target.value))}
              className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500"
            >
              {[3, 4, 5, 6].map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        {hourlyWage > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">계산 결과</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">주휴수당 (주)</div>
                <div className="text-2xl font-bold text-emerald-600">
                  {weeklyHours >= 15 ? formatNumber(weeklyHolidayPay) : "0"}원
                </div>
                {weeklyHours < 15 && (
                  <div className="text-xs text-red-500 mt-1">주 15시간 미만 근무</div>
                )}
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-neutral-500 mb-1">예상 월급</div>
                <div className="text-2xl font-bold text-neutral-800">{formatNumber(monthlyPay)}원</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-neutral-700 mb-3">계산 내역</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">1일 근로시간</span>
                  <span>{(weeklyHours / workDays).toFixed(1)}시간</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">주휴수당 계산</span>
                  <span>{(weeklyHours / workDays).toFixed(1)}시간 × {formatNumber(hourlyWage)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">월 환산 (4.345주)</span>
                  <span>기본급 + 주휴수당</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">주휴수당이란?</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 1주 15시간 이상 근무 시 유급휴일 1일 발생</li>
            <li>• 주휴수당 = 1일 소정근로시간 × 시급</li>
            <li>• 결근 없이 소정근로일 개근해야 발생</li>
            <li>• 2026년 최저시급: {formatNumber(MIN_WAGE_2026)}원</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
