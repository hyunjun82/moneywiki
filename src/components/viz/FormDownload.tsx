"use client";

import { FileText, Download } from "lucide-react";

export interface FormItem { name: string; description?: string; url?: string; fileType?: string; note?: string }

export function FormDownload({ forms, title }: { forms: FormItem[]; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {title && <div className="border-b bg-gray-50 px-5 py-3"><h4 className="text-sm font-bold text-gray-700">{title}</h4></div>}
      <div className="divide-y divide-gray-100">
        {forms.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 gap-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-[#1B3A5C] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">{f.name}</p>
                {f.description && <p className="text-xs text-gray-400 mt-0.5">{f.description}</p>}
                {f.note && <p className="text-xs text-amber-600 mt-0.5">{f.note}</p>}
              </div>
            </div>
            {f.url ? (
              <a href={f.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B3A5C] text-white text-xs font-medium hover:bg-[#142d49] shrink-0">
                <Download className="h-3 w-3" />{f.fileType || "PDF"}
              </a>
            ) : (
              <span className="text-xs text-gray-400 shrink-0">기관 제공</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
