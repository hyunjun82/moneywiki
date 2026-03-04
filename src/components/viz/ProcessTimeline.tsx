"use client";

export interface TimelineStep { title: string; description: string }

export function ProcessTimeline({ steps, title }: { steps: TimelineStep[]; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {title && <div className="border-b bg-gray-50 px-5 py-3"><h4 className="text-sm font-bold text-gray-700">{title}</h4></div>}
      <div className="p-5 space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B3A5C] text-white text-xs font-bold shrink-0">{i + 1}</div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
            </div>
            <div className={`pb-5 ${i === steps.length - 1 ? "pb-0" : ""}`}>
              <p className="text-sm font-bold text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
