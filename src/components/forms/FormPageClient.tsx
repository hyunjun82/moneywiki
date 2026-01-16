"use client";

import { useState } from "react";
import FormPreview from "./FormPreview";

interface FormField {
  label?: string;
  value?: string;
  placeholder?: string;
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
  exampleValue?: string;
}

interface FormRow {
  fields: FormField[];
}

interface FormPageClientProps {
  formTitle: string;
  previewData: FormRow[];
}

export default function FormPageClient({ formTitle, previewData }: FormPageClientProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "example">("preview");

  return (
    <div className="mb-8">
      {/* 탭 헤더 */}
      <div className="flex items-center gap-1 mb-4">
        <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          양식
        </h2>
      </div>

      {/* 탭 버튼 */}
      <div className="flex border-b border-neutral-200 mb-0">
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-emerald-500 text-emerald-600 bg-emerald-50/50"
              : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            미리보기
          </span>
        </button>
        <button
          onClick={() => setActiveTab("example")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "example"
              ? "border-blue-500 text-blue-600 bg-blue-50/50"
              : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            작성 예시
          </span>
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      <FormPreview
        title={formTitle}
        rows={previewData}
        mode={activeTab}
        className="rounded-t-none border-t-0"
      />

      {/* 안내 문구 */}
      <p className="text-xs text-neutral-500 mt-2">
        {activeTab === "preview"
          ? "* 실제 양식의 미리보기입니다. 다운로드 후 직접 작성하세요."
          : "* 파란색 텍스트는 작성 예시입니다. 본인 상황에 맞게 수정하세요."
        }
      </p>
    </div>
  );
}
