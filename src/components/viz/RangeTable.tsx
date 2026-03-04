"use client";

import { useState } from "react";

export interface RangeRow { label: string; values: string[]; highlight?: boolean }

export function RangeTable({ headers, rows, title }: {
  headers: string[];
  rows: RangeRow[];
  title?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden not-prose">
      {title && <div className="border-b bg-gray-50 px-5 py-3"><h4 className="text-sm font-bold text-gray-800">{title}</h4></div>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ all: "unset", display: "table", width: "100%", fontSize: "0.875rem" }}>
          <thead>
            <tr>{headers.map((h, i) => <th key={i} className="!bg-[#F1F5F9] !text-[#334155] !font-semibold !text-left !px-4 !py-3 !border-b !border-gray-200 !text-sm" style={{ background: "#F1F5F9", color: "#334155", textAlign: "left", fontWeight: 600, padding: "10px 16px", border: "none", borderBottom: "1px solid #E2E8F0" }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} onClick={() => setSelected(ri === selected ? null : ri)}
                className={`cursor-pointer transition-colors ${row.highlight ? "!bg-blue-50" : selected === ri ? "!bg-blue-50/50" : "hover:!bg-gray-50"}`}
                style={row.highlight ? { backgroundColor: "#EFF6FF" } : undefined}>
                <td className="!px-4 !py-3 !font-medium !text-gray-800 !border-b !border-gray-100" style={{ padding: "10px 16px", fontWeight: 500, color: "#1E293B", borderBottom: "1px solid #F1F5F9" }}>{row.label}</td>
                {row.values.map((v, vi) => <td key={vi} className="!px-4 !py-3 !text-gray-600 !border-b !border-gray-100" style={{ padding: "10px 16px", color: "#475569", borderBottom: "1px solid #F1F5F9" }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
