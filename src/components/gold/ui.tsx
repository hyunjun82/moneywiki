"use client";

/**
 * 금 페이지 공용 UI — 시안(gold-home / gold-buy / gold-sell / gold-calculator)을 옮긴 것.
 *
 * 값이 없으면 그 칸을 통째로 숨긴다. 0원을 시세 자리에 내보내지 않는다.
 * 등락 색은 상승 빨강 / 하락 파랑 / 보합 회색 — 시안의 초록(#2E7D5B)은 쓰지 않는다.
 * 한국에서 초록 하락은 반대로 읽힌다.
 */

import { useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { type Dir, dirColor, dirMark, won } from "./priceData";

/* ─────────────────────────── 껍데기 ─────────────────────────── */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#E2DFD7] rounded-[18px] ${className}`}>{children}</div>
  );
}

export function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-5 rounded-[4px] bg-gradient-to-b from-[#F3DE9C] to-[#C79A22]" />
        <h2 className="m-0 text-[21px] sm:text-[27px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
          {title}
        </h2>
      </div>
      {note ? <span className="text-[14px] text-[#6C727B]">{note}</span> : null}
    </div>
  );
}

/** 시안의 다크 히어로 — 4개 페이지가 같은 배경을 쓴다. */
export function Hero({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="rounded-[22px] bg-[radial-gradient(120%_140%_at_80%_0%,#2A2618_0%,#14161A_62%)] px-5 sm:px-10 py-9 sm:py-12">
      <div
        className={
          aside
            ? "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center"
            : "flex flex-col gap-3"
        }
      >
        <div className="flex flex-col gap-3.5">
          <span className="text-[13px] font-bold tracking-[0.06em] text-[#D4AF37]">{eyebrow}</span>
          <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white">
            {title}
          </h1>
          <p className="m-0 text-[17px] sm:text-[20px] leading-[1.4] text-[#B9BDC4] max-w-[440px]">
            {lead}
          </p>
        </div>
        {aside}
      </div>
    </section>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block rounded-md bg-[#E2DFD7] animate-pulse ${className}`} />;
}

export function Delta({ change, dir }: { change?: number | null; dir?: Dir }) {
  if (dir === "none" || !change) return <span className="text-[#6C727B]">—</span>;
  return (
    <span className="tabular-nums font-bold" style={{ color: dirColor(dir) }}>
      {dirMark(dir)} {won(Math.abs(change))}
    </span>
  );
}

export function DataNotice() {
  return (
    <Card className="p-6 text-center">
      <p className="m-0 text-[15px] font-semibold text-[#1A1D21]">시세를 불러오지 못했습니다</p>
      <p className="mt-2 mb-0 text-[14px] text-[#6C727B]">
        잠시 후 새로고침해 주세요. 확인되지 않은 값을 대신 표시하지 않습니다.
      </p>
    </Card>
  );
}

/* ─────────────────────────── 시세 표 ─────────────────────────── */

export interface TableRow {
  name: string;
  don: string | null;
  gram: string | null;
  /** 마지막 열 — 살 때 페이지는 전일비, 팔 때 페이지는 매입률 */
  last: React.ReactNode;
}

export function PriceTable({
  head,
  rows,
  lastLabel,
}: {
  head: string;
  rows: TableRow[];
  lastLabel: string;
}) {
  const cols = "grid-cols-[1.3fr_1fr_1fr_0.8fr]";
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[440px]">
        <div
          className={`grid ${cols} gap-2 px-3 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#6C727B] border-b border-[#CFCBC1]`}
        >
          <span>{head}</span>
          <span className="text-right">1돈(3.75g)</span>
          <span className="text-right">1g</span>
          <span className="text-right">{lastLabel}</span>
        </div>
        {rows.length === 0
          ? [0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`grid ${cols} gap-2 px-3 py-4 border-b border-[#E2DFD7] ${
                  i % 2 ? "bg-[#F7F6F3]" : ""
                }`}
              >
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4 justify-self-end" />
                <Skeleton className="w-16 h-4 justify-self-end" />
                <Skeleton className="w-12 h-4 justify-self-end" />
              </div>
            ))
          : rows.map((r, i) => (
              <div
                key={r.name}
                className={`grid ${cols} gap-2 px-3 py-4 border-b border-[#E2DFD7] items-center ${
                  i % 2 ? "bg-[#F7F6F3]" : ""
                }`}
              >
                <span className="text-[15px] font-semibold text-[#1A1D21]">{r.name}</span>
                <span className="text-right text-[15px] font-bold text-[#1A1D21] tabular-nums">
                  {r.don ?? <span className="text-[13px] font-normal text-[#9CA1A8]">매장문의</span>}
                </span>
                <span className="text-right text-[15px] text-[#3C424A] tabular-nums">
                  {r.gram ?? <span className="text-[13px] text-[#9CA1A8]">—</span>}
                </span>
                <span className="text-right text-[14px] font-bold tabular-nums">{r.last}</span>
              </div>
            ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── 사이드바 ─────────────────────────── */

export function TipsCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <Card className="p-[22px] flex flex-col gap-3">
      <span className="text-[21px] font-bold tracking-[-0.02em] text-[#1A1D21]">{title}</span>
      {tips.map((t) => (
        <div key={t} className="flex gap-2.5 items-start">
          <span className="text-[#C79A22] font-bold shrink-0">·</span>
          <span className="text-[15px] leading-[1.7] text-[#3C424A]">{t}</span>
        </div>
      ))}
    </Card>
  );
}

/** 시안의 금색 CTA 버튼 */
export function GoldCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="bg-[linear-gradient(145deg,#F5E3A6_0%,#E0BE55_45%,#C79A22_100%)] rounded-[16px] p-5 flex items-center justify-between text-[#17181C] hover:brightness-105 transition-[filter]"
    >
      <span className="text-[18px] font-extrabold tracking-[-0.02em]">{label}</span>
      <span className="text-[22px]">→</span>
    </a>
  );
}

/** 사이드 광고 300×250 자리 — 프로젝트의 기존 슬롯을 쓴다 */
export function SideAd() {
  return (
    <div className="min-h-[250px]">
      <AdSlot slot="top" />
    </div>
  );
}

/** 가로 광고 728×90 자리 */
export function BandAd() {
  return <AdSlot slot="bottom" />;
}

/* ─────────────────────────── 페이지 간 이동 ─────────────────────────── */

export function CrossLinks({
  primary,
  secondary,
}: {
  primary: { href: string; title: string; sub: string };
  secondary: { href: string; title: string; sub: string };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <a
        href={primary.href}
        className="bg-white border-[1.5px] border-[#D4AF37] rounded-[18px] px-6 py-6 flex items-center justify-between gap-3 hover:brightness-[0.99] transition-[filter]"
      >
        <span className="flex flex-col gap-1.5">
          <span className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
            {primary.title}
          </span>
          <span className="text-[14px] text-[#6C727B]">{primary.sub}</span>
        </span>
        <span className="text-[24px] text-[#C79A22] shrink-0">→</span>
      </a>
      <a
        href={secondary.href}
        className="bg-white border border-[#E2DFD7] rounded-[18px] px-6 py-6 flex items-center justify-between gap-3 hover:border-[#CFCBC1] transition-colors"
      >
        <span className="flex flex-col gap-1.5">
          <span className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
            {secondary.title}
          </span>
          <span className="text-[14px] text-[#6C727B]">{secondary.sub}</span>
        </span>
        <span className="text-[24px] text-[#6C727B] shrink-0">→</span>
      </a>
    </div>
  );
}

/* ─────────────────────────── FAQ (홈 시안에만 있다) ─────────────────────────── */

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((f, i) => (
        <div key={f.q} className="bg-white border border-[#E2DFD7] rounded-[14px] overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 px-[22px] py-5 text-left cursor-pointer"
          >
            <span className="flex items-start gap-3 text-[17px] font-semibold text-[#1A1D21]">
              <span className="text-[#C79A22] font-extrabold shrink-0">Q</span>
              {f.q}
            </span>
            <span className="text-[18px] text-[#C79A22] shrink-0">{open === i ? "−" : "+"}</span>
          </button>
          {open === i ? (
            <div className="px-[22px] pb-[22px] pl-[50px] text-[16px] leading-[1.7] text-[#3C424A]">
              {f.a}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── 하단 고지 ─────────────────────────── */

export function FooterNote({ text, updatedAt }: { text: string; updatedAt?: string }) {
  return (
    <div className="bg-[#14161A] rounded-[18px] px-6 py-7 flex justify-between gap-5 flex-wrap">
      <span className="text-[14px] text-[#7C818A]">{text}</span>
      {updatedAt ? <span className="text-[14px] text-[#B9BDC4]">시세 갱신 {updatedAt}</span> : null}
    </div>
  );
}
