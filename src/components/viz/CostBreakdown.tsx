"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface CostItem { name: string; value: number; color?: string }

const COLORS = ["#1B3A5C", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#6366F1", "#818CF8"];

export function CostBreakdown({ items, title }: { items: CostItem[]; title?: string }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {title && <div className="border-b bg-gray-50 px-5 py-3"><h4 className="text-sm font-bold text-gray-700">{title}</h4></div>}
      <div className="p-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40 shrink-0">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={items} dataKey="value" innerRadius={35} outerRadius={65} paddingAngle={2}>
                {items.map((item, i) => <Cell key={i} fill={item.color || COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color || COLORS[i % COLORS.length] }} />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">{fmt(item.value)}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-bold">
            <span className="text-gray-700">합계</span>
            <span className="text-[#1B3A5C]">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
