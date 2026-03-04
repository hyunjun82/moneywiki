"use client";

import { AlertTriangle, Clock, CalendarCheck } from "lucide-react";

export function DeadlineBanner({ deadline, label }: { deadline: string; label: string }) {
  const target = new Date(deadline);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateStr = `${target.getFullYear()}.${target.getMonth() + 1}.${target.getDate()}(${days[target.getDay()]})`;

  const isExpired = diff < 0;
  const isUrgent = diff >= 0 && diff <= 7;

  const bg = isExpired ? "bg-red-50 border-red-200" : isUrgent ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200";
  const text = isExpired ? "text-red-700" : isUrgent ? "text-amber-700" : "text-[#1B3A5C]";
  const Icon = isExpired ? AlertTriangle : isUrgent ? Clock : CalendarCheck;
  const dDay = diff === 0 ? "D-DAY" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;

  return (
    <div className={`my-6 flex items-center gap-4 rounded-xl border ${bg} p-4`}>
      <Icon className={`h-6 w-6 ${text} shrink-0`} />
      <div className="flex-1">
        <p className={`text-sm font-bold ${text}`}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
      </div>
      <span className={`text-lg font-black ${text}`}>{dDay}</span>
    </div>
  );
}
