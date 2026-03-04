"use client";

import { Check } from "lucide-react";

export interface ProgressStep { label: string; completed?: boolean; active?: boolean }

export function ProgressTracker({ steps }: { steps: ProgressStep[] }) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-5 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[400px]">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step.completed ? "bg-[#1B3A5C] text-white" : step.active ? "bg-[#1B3A5C] text-white ring-4 ring-blue-100" : "bg-gray-200 text-gray-500"
              }`}>
                {step.completed ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-[11px] mt-1.5 text-center max-w-[80px] ${step.active ? "font-bold text-[#1B3A5C]" : "text-gray-500"}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-[2px] mx-2 ${step.completed ? "bg-[#1B3A5C]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}
