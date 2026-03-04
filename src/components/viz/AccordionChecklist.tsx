"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface ChecklistGroup {
  title: string;
  items: { label: string; checked?: boolean }[];
}

export function AccordionChecklist({ groups, title }: { groups: ChecklistGroup[]; title?: string }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    groups.forEach((g, gi) => g.items.forEach((item, ii) => { init[`${gi}-${ii}`] = item.checked || false; }));
    return init;
  });

  const total = groups.reduce((s, g) => s + g.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {title && (
        <div className="border-b bg-gray-50 px-5 py-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-700">{title}</h4>
          <span className="text-xs text-gray-400">{done}/{total} 완료</span>
        </div>
      )}
      <div className="px-5 pt-3 pb-1">
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-[#1B3A5C] transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
        </div>
      </div>
      {groups.map((group, gi) => (
        <div key={gi} className="border-t border-gray-100 first:border-t-0">
          <button onClick={() => setOpen(p => ({ ...p, [gi]: !p[gi] }))} className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">{group.title}</span>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open[gi] ? "rotate-180" : ""}`} />
          </button>
          {open[gi] && (
            <div className="px-5 pb-3 space-y-2">
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                return (
                  <label key={ii} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${checked[key] ? "bg-[#1B3A5C] border-[#1B3A5C]" : "border-gray-300 group-hover:border-[#1B3A5C]"}`}
                      onClick={() => setChecked(p => ({ ...p, [key]: !p[key] }))}>
                      {checked[key] && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-sm ${checked[key] ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
