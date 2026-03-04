"use client";

export interface StatItem { value: string; label: string; sub?: string }

export function StatCard({ items }: { items: StatItem[] }) {
  return (
    <div className={`my-6 grid gap-3 ${items.length <= 2 ? "grid-cols-2" : items.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <div className="h-1 -mx-4 -mt-4 mb-3 rounded-t-xl bg-gradient-to-r from-[#1B3A5C] to-blue-500" />
          <p className="text-xl font-bold text-[#1B3A5C]">{item.value}</p>
          <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          {item.sub && <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>}
        </div>
      ))}
    </div>
  );
}
