"use client";

/**
 * 환율노트 공용 UI — 시안(환율계산기.html)을 옮긴 것.
 *
 * 다크 히어로 #0B2233 + 도트 패턴, 페이퍼 카드, 파랑 액센트 #1F4E79.
 * 등락 색은 시안 규칙을 따른다 — 상승 초록 / 하락 파랑.
 */

import { AdSlot } from "@/components/AdSlot";
import { changeText, fxColor } from "./fxData";

/** 다크 히어로 배경 — 도트 패턴까지 시안 그대로 */
export const DARK_BG = {
  background: "#0B2233",
  backgroundImage: "radial-gradient(rgba(255,255,255,0.075) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
} as const;

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#E2DFD7] rounded-[20px] ${className}`}>{children}</div>
  );
}

/** 섹션 머리 — "02 ─ Destinations / 여행지별 환율" */
export function SectionHead({
  no,
  eyebrow,
  title,
  lead,
  right,
}: {
  no: string;
  eyebrow: string;
  title: string;
  lead?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-extrabold text-[#1F4E79] tracking-[0.1em]">{no}</span>
          <span className="w-[22px] h-px bg-[#CFCBC1]" />
          <span className="text-[12px] font-bold text-[#9CA1A8] tracking-[0.1em] uppercase">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-3 mb-0 text-[24px] sm:text-[30px] font-extrabold tracking-[-0.03em] text-[#1A1D21]">
          {title}
        </h2>
        {lead ? <p className="mt-2 mb-0 text-[16px] sm:text-[17px] text-[#6C727B]">{lead}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block rounded-md bg-[#E2DFD7] animate-pulse ${className}`} />;
}

/** 값이 없을 때 — 숫자를 지어내지 않는다 */
export function DataNotice() {
  return (
    <Card className="p-7 text-center">
      <p className="m-0 text-[15px] font-semibold text-[#1A1D21]">환율을 불러오지 못했습니다</p>
      <p className="mt-2 mb-0 text-[14px] text-[#6C727B]">
        잠시 후 새로고침해 주세요. 확인되지 않은 값을 대신 표시하지 않습니다.
      </p>
    </Card>
  );
}

/** 전일 대비 배지 */
export function ChangeBadge({ change }: { change?: number }) {
  const color = fxColor(change);
  const bg = !change ? "#F7F6F3" : change > 0 ? "#E7F2EC" : "#E9F0F7";
  return (
    <span
      className="text-[13px] font-bold px-2 py-1 rounded-[7px] tabular-nums"
      style={{ color, background: bg }}
    >
      {changeText(change)}
    </span>
  );
}

/** 알약 탭 — 기간·지역·정렬에 공통으로 쓴다 */
export function PillTabs<T extends string>({
  tabs,
  value,
  onChange,
  dark = false,
}: {
  tabs: readonly { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex gap-1 p-1 rounded-full ${dark ? "bg-white/10" : "bg-[#E7E4DD]"}`}
      role="tablist"
    >
      {tabs.map((t) => {
        const on = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors ${
              on
                ? dark
                  ? "bg-white text-[#0B2233]"
                  : "bg-white text-[#1A1D21] shadow-[0_1px_2px_rgba(26,29,33,.10)]"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-[#6C727B] hover:text-[#1A1D21]"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── 광고 ───────────────────────────
 * 시안에는 광고 자리가 없었다. 애드센스 최적화가 목표라 자리를 먼저 잡는다.
 * 나중에 끼워 넣으면 섹션 간격이 깨진다.
 */

/** 본문 흐름 사이 — 반응형 가로 */
export function BandAd() {
  return (
    <div className="my-2">
      <AdSlot slot="bottom" />
    </div>
  );
}

/** 사각형 — 표 옆이나 카드 사이 */
export function BoxAd() {
  return (
    <div className="min-h-[250px]">
      <AdSlot slot="top" />
    </div>
  );
}

/* ─────────────────────────── 하단 고지 ─────────────────────────── */

export function FooterNote({
  text,
  updatedAt,
}: {
  text: string;
  updatedAt?: string;
}) {
  return (
    <div style={DARK_BG} className="rounded-[20px] px-7 py-8 flex justify-between gap-5 flex-wrap">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-[9px] bg-white text-[#0B2233] flex items-center justify-center text-[14px] font-extrabold">
            ₩
          </span>
          <span className="text-[16px] font-bold text-white tracking-[-0.02em]">환율노트</span>
        </div>
        <span className="text-[14px] text-white/50 max-w-[42ch] leading-relaxed">{text}</span>
      </div>
      {updatedAt ? (
        <span className="text-[14px] text-white/70 self-end">환율 갱신 {updatedAt}</span>
      ) : null}
    </div>
  );
}
