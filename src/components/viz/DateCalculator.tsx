"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

export interface DatePreset { label: string; days: number }

export function DateCalculator({ title, presets, description }: {
  title: string;
  presets?: DatePreset[];
  description?: string;
}) {
  const [baseDate, setBaseDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [days, setDays] = useState(0);
  const defaults: DatePreset[] = presets || [
    { label: "1개월", days: 30 }, { label: "3개월", days: 90 },
    { label: "6개월", days: 180 }, { label: "1년", days: 365 },
  ];

  const target = new Date(baseDate);
  target.setDate(target.getDate() + days);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const targetStr = days > 0 ? `${target.getFullYear()}.${target.getMonth() + 1}.${target.getDate()}(${dayNames[target.getDay()]})` : "—";

  const diff = Math.ceil((target.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b bg-gray-50 px-5 py-3 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[#1B3A5C]" />
        <h4 className="text-sm font-bold text-gray-700">{title}</h4>
      </div>
      {description && <p className="px-5 pt-3 text-xs text-gray-400">{description}</p>}
      <div className="p-5 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">기준일</label>
          <input type="date" value={baseDate} onChange={e => setBaseDate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20" />
        </div>
        <div className="flex flex-wrap gap-2">
          {defaults.map((p, i) => (
            <button key={i} onClick={() => setDays(p.days)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${days === p.days ? "bg-[#1B3A5C] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="number" value={days || ""} onChange={e => setDays(parseInt(e.target.value) || 0)} placeholder="직접 입력"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20" />
          <span className="text-sm text-gray-500">일</span>
        </div>
      </div>
      {days > 0 && (
        <div className="border-t bg-blue-50/50 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">계산 결과</p>
            <p className="text-lg font-bold text-[#1B3A5C]">{targetStr}</p>
          </div>
          <span className={`text-sm font-bold ${diff < 0 ? "text-red-600" : diff <= 7 ? "text-amber-600" : "text-[#1B3A5C]"}`}>
            {diff === 0 ? "오늘" : diff > 0 ? `${diff}일 남음` : `${Math.abs(diff)}일 지남`}
          </span>
        </div>
      )}
    </div>
  );
}
