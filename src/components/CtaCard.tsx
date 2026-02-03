"use client";

import Link from "next/link";

interface CtaCardProps {
  label: string;
  mainText: string;
  subText: string;
  url: string;
  external?: boolean;
}

export default function CtaCard({
  label,
  mainText,
  subText,
  url,
  external = false,
}: CtaCardProps) {
  const cardContent = (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold text-orange-500 mb-2">{label}</p>
        <p className="text-base md:text-lg font-bold text-slate-900 mb-1">
          {mainText}
        </p>
        <p className="text-sm text-slate-500">{subText}</p>
      </div>
      <div className="ml-4 w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shrink-0">
        <svg
          className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );

  const baseClassName =
    "group block mt-6 mb-8 p-5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl transition-all hover:shadow-md";

  // 외부 링크
  if (external) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        {cardContent}
      </a>
    );
  }

  // 내부 링크
  return (
    <Link href={url} className={baseClassName}>
      {cardContent}
    </Link>
  );
}
