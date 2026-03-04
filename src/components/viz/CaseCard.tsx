"use client";

import { Scale, ExternalLink } from "lucide-react";

export interface CaseInfo {
  court?: string;
  date?: string;
  caseNumber?: string;
  title: string;
  summary: string;
  result?: "승소" | "패소" | "일부승소" | "합의" | string;
  url?: string;
}

const RESULT_STYLES: Record<string, string> = {
  승소: "bg-blue-100 text-[#1B3A5C]",
  패소: "bg-red-100 text-red-700",
  일부승소: "bg-amber-100 text-amber-700",
  합의: "bg-gray-100 text-gray-700",
};

export function CaseCard({ cases }: { cases: CaseInfo[] }) {
  return (
    <div className="my-6 space-y-3">
      {cases.map((c, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-[#1B3A5C] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-gray-900">{c.title}</h4>
                {c.result && <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${RESULT_STYLES[c.result] || "bg-gray-100 text-gray-600"}`}>{c.result}</span>}
              </div>
              {(c.court || c.date || c.caseNumber) && (
                <p className="text-xs text-gray-400 mt-1">{[c.court, c.date, c.caseNumber].filter(Boolean).join(" · ")}</p>
              )}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{c.summary}</p>
              {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-blue-500 hover:underline"><ExternalLink className="h-3 w-3" />판례 보기</a>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
