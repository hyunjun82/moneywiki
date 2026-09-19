"use client";

import { useMemo, useState } from "react";
import {
  BandAd,
  Card,
  CrossLinks,
  Faq,
  FooterNote,
  SectionHead,
  SideAd,
  PriceTable,
  type TableRow,
} from "./ui";
import {
  type PriceData,
  dirMark,
  dirColor,
  korDateTime,
  normalizePrice,
  perGram,
  usePrice,
  won,
  gold24,
} from "./priceData";

type Dir = "up" | "down" | "none";

/** 일일 기사 JSON의 형태 (scripts/gold/generate-news.mjs 가 생성). v3(2026-09-20)부터 stats·series·drivers·faq 가 붙는다. */
export interface NewsDoc {
  v?: number;
  date: string;
  title: string;
  description: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  quoteDate?: string | null;
  headline?: string;
  retail?: {
    note?: string;
    vatIncludedBuy?: boolean;
    items?: {
      key: string;
      name: string;
      userSell: { price: number; change: number; dir: Dir } | null;
      userBuy: { price: number; change: number; dir: Dir } | null;
    }[];
  } | null;
  krx?: {
    latest?: { date: string; krwPerGram: number; krwPerDon: number; change: number; changePct: number };
    note?: string | null;
  } | null;
  fx?: { usdkrw?: number } | null;
  intl?: {
    gold?: { usdPerOz: number; changePct: number; dir: Dir; krwPerDon: number };
    silver?: { usdPerOz: number; changePct: number; dir: Dir; krwPerDon: number };
  } | null;
  stats?: {
    covered: number;
    hi30: { date: string; buy: number };
    lo30: { date: string; buy: number };
    hi1y: { date: string; buy: number };
    lo1y: { date: string; buy: number };
    pos30: number;
    chg1w: { won: number; pct: number; from: string } | null;
    chg1m: { won: number; pct: number; from: string } | null;
    chg1y: { won: number; pct: number; from: string } | null;
    chgYtd: { won: number; pct: number; from: string } | null;
    streak: { dir: Dir; days: number };
  } | null;
  intraday?: { rounds: number } | null;
  drivers?: { key: string; name: string; value: string; unit?: string; change?: number | null; changePct?: number | null; dir: Dir }[];
  /** 최근 1년 일별(그날 마지막 고시): d 날짜, b 살 때, s 팔 때 */
  series?: { d: string; b: number; s: number }[];
  lead?: string;
  sections?: { heading: string; paragraphs: string[] }[];
  faq?: { q: string; a: string }[];
  paragraphs: string[];
  sources?: string[];
}

/* 그래프 색 — dataviz 검증 통과(라이트 표면, CVD ΔE 28 이상): 살 때 금색, 팔 때 파랑 */
const SERIES_BUY = "#B08A1E";
const SERIES_SELL = "#2F5FA8";
const INK = "#1A1D21";
const INK2 = "#4B5160";
const INK3 = "#8A90A0";
const LINE = "#E3E6EB";
const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const shortDate = (iso: string) => `${Number(iso.slice(5, 7))}.${Number(iso.slice(8, 10))}`;
const korDate = (iso: string) => `${Number(iso.slice(5, 7))}월 ${Number(iso.slice(8, 10))}일`;
const signedWon = (n: number) => (n > 0 ? `+${won(n)}` : n < 0 ? `-${won(Math.abs(n))}` : "0");
const signedPct = (p: number) => (p > 0 ? `+${p}%` : `${p}%`);

/** 기사 상단 — 살 때 / 팔 때 / 계산기 버튼 3개 */
function QuickButtons({ buy, sell }: { buy?: number | null; sell?: number | null }) {
  const items = [
    { href: "/gold/buy", label: "금 살 때", sub: buy ? `${won(buy)}원` : "가격 보기" },
    { href: "/gold/sell", label: "금 팔 때", sub: sell ? `${won(sell)}원` : "가격 보기" },
    { href: "/gold/calculator", label: "금 계산기", sub: "내 금 계산" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          className="bg-[linear-gradient(145deg,#F5E3A6_0%,#E0BE55_45%,#C79A22_100%)] rounded-[14px] px-3 py-3.5 sm:px-5 sm:py-4 flex flex-col items-center gap-0.5 text-[#17181C] hover:brightness-105 transition-[filter]"
        >
          <span className="text-[15px] sm:text-[17px] font-extrabold tracking-[-0.02em]">{it.label}</span>
          <span className="text-[12px] sm:text-[13px] font-semibold opacity-80 tabular-nums">{it.sub}</span>
        </a>
      ))}
    </div>
  );
}

/** 핵심 숫자 4칸: 살 때 · 팔 때 · 30일 범위 · 1년 범위 */
function KeyStats({ doc, buy, sell }: { doc: NewsDoc; buy: { price: number; change: number; dir: Dir } | null; sell: { price: number; change: number; dir: Dir } | null }) {
  const st = doc.stats;
  const tiles: { label: string; value: string; sub: React.ReactNode }[] = [];
  if (buy) tiles.push({ label: "살 때 (부가세 포함)", value: `${won(buy.price)}원`, sub: <span style={{ color: dirColor(buy.dir) }}>{dirMark(buy.dir)} {buy.change ? `${won(buy.change)}원` : "보합"} <span className="text-[#8A90A0]">전일비</span></span> });
  if (sell) tiles.push({ label: "팔 때", value: `${won(sell.price)}원`, sub: <span style={{ color: dirColor(sell.dir) }}>{dirMark(sell.dir)} {sell.change ? `${won(sell.change)}원` : "보합"} <span className="text-[#8A90A0]">전일비</span></span> });
  if (st) {
    tiles.push({ label: "30일 살 때 범위", value: `${won(st.lo30.buy / 10000)}~${won(st.hi30.buy / 10000)}만`, sub: <span className="text-[#8A90A0]">최저 {korDate(st.lo30.date)} · 최고 {korDate(st.hi30.date)}</span> });
    if (st.covered >= 300) tiles.push({ label: "1년 살 때 범위", value: `${won(st.lo1y.buy / 10000)}~${won(st.hi1y.buy / 10000)}만`, sub: <span className="text-[#8A90A0]">{st.chg1y ? `1년 전보다 ${signedPct(st.chg1y.pct)}` : `최고 ${korDate(st.hi1y.date)}`}</span> });
    else if (st.chg1m) tiles.push({ label: "한 달 변동", value: signedPct(st.chg1m.pct), sub: <span className="text-[#8A90A0]">{signedWon(st.chg1m.won)}원 · {korDate(st.chg1m.from)} 대비</span> });
  }
  if (!tiles.length) return null;
  return (
    <div className={`grid grid-cols-2 ${tiles.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-2.5`}>
      {tiles.map((t) => (
        <div key={t.label} className="rounded-[12px] border border-[#E2DFD7] bg-[#FBFAF7] px-4 py-3.5 flex flex-col gap-1">
          <span className="text-[12px] font-semibold tracking-[0.02em] text-[#6C727B]">{t.label}</span>
          <span className="text-[20px] sm:text-[22px] font-extrabold tabular-nums tracking-[-0.02em] text-[#1A1D21]">{t.value}</span>
          <span className="text-[12.5px] font-medium tabular-nums">{t.sub}</span>
        </div>
      ))}
    </div>
  );
}

/** 30일 · 1년 선 그래프 (살 때·팔 때). 정적 SVG + 마우스 크로스헤어. */
function TrendChart({ series, quoteDate }: { series: { d: string; b: number; s: number }[]; quoteDate: string }) {
  const covered = series.length >= 2 ? Math.round((new Date(series[series.length - 1].d).getTime() - new Date(series[0].d).getTime()) / 86400000) : 0;
  const [range, setRange] = useState<"m1" | "y1">("m1");
  const [hover, setHover] = useState<number | null>(null);
  const pts = useMemo(() => {
    const days = range === "m1" ? 31 : 366;
    const cut = new Date(quoteDate + "T00:00:00Z");
    cut.setUTCDate(cut.getUTCDate() - days);
    const from = cut.toISOString().slice(0, 10);
    return series.filter((p) => p.d >= from);
  }, [series, range, quoteDate]);
  if (pts.length < 2) return null;

  const W = 1120, H = 300, L = 66, R = 18, T = 20, B = 34;
  const all = pts.flatMap((p) => [p.b, p.s]);
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.15 || 10000;
  lo -= pad; hi += pad;
  const step = (() => { const r0 = hi - lo; const p = 10 ** Math.floor(Math.log10(r0 / 4)); const m = r0 / 4 / p; return (m < 1.5 ? 1 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10) * p; })();
  lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
  const n = pts.length;
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(1, n - 1);
  const y = (v: number) => T + ((hi - v) / (hi - lo || 1)) * (H - T - B);
  const ticks: number[] = [];
  for (let v = lo; v <= hi + 1e-6; v += step) ticks.push(v);
  const labelEvery = Math.max(1, Math.ceil(n / 7));
  const lines = [
    { key: "b" as const, name: "살 때", color: SERIES_BUY },
    { key: "s" as const, name: "팔 때", color: SERIES_SELL },
  ];
  const hiB = pts.reduce((m, p, i) => (p.b > pts[m].b ? i : m), 0);
  const loB = pts.reduce((m, p, i) => (p.b < pts[m].b ? i : m), 0);

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let i = Math.round((px - L) / ((W - L - R) / Math.max(1, n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    setHover(i);
  };

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <figcaption className="text-[16px] font-bold text-[#1A1D21]">순금 한 돈 시세 추이</figcaption>
          <div className="text-[12.5px] mt-0.5" style={{ color: INK3 }}>
            한국금거래소 일별 마지막 고시 · {shortDate(pts[0].d)} → {shortDate(pts[n - 1].d)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-[12.5px]" style={{ color: INK2 }} aria-label="범례">
            {lines.map((l) => (
              <span key={l.key} className="inline-flex items-center gap-1.5"><i className="inline-block w-3.5 h-0.5 rounded-sm" style={{ background: l.color }} />{l.name}</span>
            ))}
          </div>
          <div className="inline-flex gap-0.5 p-[3px] rounded-[9px] border border-[#E2DFD7] bg-[#F7F6F3]" role="tablist">
            {([["m1", "30일"], ["y1", "1년"]] as const).map(([k, label]) => {
              const disabled = k === "y1" && covered < 300;
              return (
                <button key={k} type="button" role="tab" aria-selected={range === k} disabled={disabled} onClick={() => { setRange(k); setHover(null); }}
                  className="px-3 py-1.5 rounded-md text-[12.5px] font-medium disabled:cursor-not-allowed"
                  style={range === k ? { background: "#fff", color: INK, boxShadow: "0 1px 2px rgba(15,17,21,.08)" } : { color: disabled ? INK3 : INK2 }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative rounded-xl border border-[#E2DFD7] bg-white pt-3 px-2 pb-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px] sm:h-[300px] block overflow-visible" role="img" aria-label="순금 한 돈 살 때·팔 때 추이 그래프" onMouseLeave={() => setHover(null)}>
          {ticks.map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={LINE} strokeDasharray="2 4" />
              <text x={L - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill={INK3} style={{ fontFamily: MONO }}>{(v / 10000).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}만</text>
            </g>
          ))}
          {pts.map((p, i) => (i % labelEvery === 0 || i === n - 1) ? (
            <text key={p.d} x={x(i)} y={H - 10} textAnchor={i === n - 1 ? "end" : i === 0 ? "start" : "middle"} fontSize="11" fill={INK3} style={{ fontFamily: MONO }}>{range === "y1" ? `${p.d.slice(2, 4)}.${Number(p.d.slice(5, 7))}` : shortDate(p.d)}</text>
          ) : null)}
          {lines.map((l) => {
            const d = pts.map((p, i) => `${x(i)},${y(p[l.key])}`).join(" ");
            return (
              <g key={l.key}>
                <polyline fill="none" stroke={l.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={d} />
                <circle cx={x(n - 1)} cy={y(pts[n - 1][l.key])} r="4" fill={l.color} stroke="#fff" strokeWidth="2" />
                <text x={x(n - 1) - 8} y={y(pts[n - 1][l.key]) + (l.key === "b" ? -9 : 15)} textAnchor="end" fontSize="11.5" fontWeight="600" fill={INK2} style={{ fontFamily: MONO }}>{won(pts[n - 1][l.key])}</text>
              </g>
            );
          })}
          {/* 살 때 최고·최저 표시 (마지막 점과 겹치면 생략) */}
          {[hiB, loB].map((i, k) => i !== n - 1 ? (
            <g key={k}>
              <circle cx={x(i)} cy={y(pts[i].b)} r="3.5" fill="#fff" stroke={SERIES_BUY} strokeWidth="2" />
              <text x={x(i)} y={y(pts[i].b) + (k === 0 ? -9 : 17)} textAnchor="middle" fontSize="11" fill={INK2} style={{ fontFamily: MONO }}>{k === 0 ? "최고" : "최저"} {won(pts[i].b)}</text>
            </g>
          ) : null)}
          {hover != null ? (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="#CDD2DA" strokeDasharray="3 3" />
              {lines.map((l) => <circle key={l.key} cx={x(hover)} cy={y(pts[hover][l.key])} r="4" fill={l.color} stroke="#fff" strokeWidth="2" />)}
            </g>
          ) : null}
          <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="transparent" onMouseMove={onMove} />
        </svg>
        {hover != null ? (
          <div className="absolute pointer-events-none text-[12px] px-2.5 py-2 rounded-[7px] whitespace-nowrap leading-[1.5] bg-[#14161A] text-white" style={{ left: `${(x(hover) / W) * 100}%`, top: 10, transform: "translateX(-50%)" }}>
            <b className="font-semibold">{korDate(pts[hover].d)}</b>
            {lines.map((l) => <div key={l.key} className="flex justify-between gap-3.5"><span className="opacity-80">{l.name}</span><b className="font-semibold tabular-nums">{won(pts[hover][l.key])}</b></div>)}
          </div>
        ) : null}
      </div>
    </figure>
  );
}

/** 배경 지표 줄: 국제 금값 · 환율 · 달러인덱스 · 미 10년물 · WTI */
function Drivers({ items }: { items: NonNullable<NewsDoc["drivers"]> }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]">움직인 배경 · 전일 종가 대비</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {items.map((d) => {
          const chg = d.key === "us10y" && typeof d.change === "number" ? `${d.change > 0 ? "+" : ""}${d.change.toFixed(2)}%p` : d.key === "usdkrw" && typeof d.change === "number" ? `${d.change > 0 ? "+" : ""}${d.change.toFixed(2)}원` : typeof d.changePct === "number" ? signedPct(d.changePct) : "";
          return (
            <div key={d.key} className="rounded-[10px] border border-[#E2DFD7] px-3 py-2.5 flex flex-col gap-0.5">
              <span className="text-[12px] text-[#6C727B]">{d.name}</span>
              <span className="text-[15px] font-bold tabular-nums text-[#1A1D21]">{d.value}<span className="text-[11px] font-normal text-[#8A90A0]">{d.unit ?? ""}</span></span>
              <span className="text-[12.5px] font-semibold tabular-nums" style={{ color: dirColor(d.dir) }}>{dirMark(d.dir)} {chg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** /gold/news/[date] 본문. 기사 숫자는 발행 시점 스냅샷, 상단 배지는 실시간. */
export default function NewsView({ doc }: { doc: NewsDoc }) {
  const { data } = usePrice();
  const liveG24 = gold24(data);
  const snapshot = normalizePrice(doc.retail ? ({ retail: doc.retail } as PriceData) : null)?.retail;
  const g24 = snapshot?.items?.find((it) => it.key === "gold24");
  const isV3 = (doc.v ?? 0) >= 3;

  const rows: TableRow[] = (snapshot?.items ?? []).map((it) => {
    const q = it.userSell;
    return {
      name: it.name,
      don: q ? won(q.price) : null,
      gram: q ? won(perGram(q.price)) : null,
      last: q ? (
        <span className="tabular-nums font-bold" style={{ color: dirColor(q.dir) }}>
          {dirMark(q.dir)} {q.change ? won(Math.abs(q.change)) : ""}
        </span>
      ) : (
        <span className="text-[13px] font-normal text-[#9CA1A8]">매장문의</span>
      ),
    };
  });

  return (
    <article className="flex flex-col gap-7 pt-6">
      <header className="flex flex-col gap-4">
        <h1 className="m-0 text-[26px] sm:text-[36px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#1A1D21]">{doc.title}</h1>
        <p className="m-0 text-[15px] text-[#6C727B]">
          {doc.date} 발행
          {doc.intraday?.rounds ? ` · 고시 ${doc.intraday.rounds}차 기준` : ""}
          {liveG24?.userBuy?.price ? (
            <>
              {" · 지금 살 때 "}
              <strong className="text-[#8A6A16] tabular-nums">{won(liveG24.userBuy.price)}원</strong>
              {liveG24.userSell?.price ? (
                <>
                  {" · 팔 때 "}
                  <strong className="text-[#8A6A16] tabular-nums">{won(liveG24.userSell.price)}원</strong>
                </>
              ) : null}
              <span className="text-[13px]"> (실시간)</span>
            </>
          ) : null}
        </p>
        <QuickButtons buy={g24?.userBuy?.price} sell={g24?.userSell?.price} />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-7 items-start">
        <div className="flex flex-col gap-7">
          <Card className="p-[22px] sm:p-[26px] flex flex-col gap-6">
            {doc.lead ? <p className="m-0 text-[17px] leading-[1.85] text-[#1A1D21] font-medium">{doc.lead}</p> : null}

            {isV3 ? <KeyStats doc={doc} buy={g24?.userBuy ?? null} sell={g24?.userSell ?? null} /> : null}
            {isV3 && doc.series?.length ? <TrendChart series={doc.series} quoteDate={doc.quoteDate ?? doc.date} /> : null}
            {isV3 && doc.drivers?.length ? <Drivers items={doc.drivers} /> : null}

            {doc.sections?.length
              ? doc.sections.map((s) => (
                  <section key={s.heading} className="flex flex-col gap-3.5">
                    <h2 className="m-0 flex items-center gap-2.5 text-[20px] sm:text-[23px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
                      <span className="w-2 h-5 rounded-[4px] bg-gradient-to-b from-[#F3DE9C] to-[#C79A22] shrink-0" />
                      {s.heading}
                    </h2>
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className="m-0 text-[16px] leading-[1.85] text-[#3C424A]">{p}</p>
                    ))}
                  </section>
                ))
              : doc.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="m-0 text-[16px] leading-[1.85] text-[#3C424A]">{p}</p>
                ))}
          </Card>

          {rows.length > 0 ? (
            <Card className="p-[22px] sm:p-[26px] flex flex-col gap-4">
              <SectionHead title="오늘 팔 때 가격 한눈에" note="원/돈 기준" />
              <PriceTable head="품목" rows={rows} lastLabel="전일비" />
              {snapshot?.note ? <span className="text-[14px] text-[#9CA1A8]">{snapshot.note}</span> : null}
            </Card>
          ) : null}

          {doc.faq?.length ? (
            <div className="flex flex-col gap-3">
              <SectionHead title="자주 묻는 질문" />
              <Faq items={doc.faq} />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <SideAd />
          {doc.stats ? (
            <Card className="p-[22px] flex flex-col gap-2.5">
              <span className="text-[17px] font-bold text-[#1A1D21]">기간별 변동 · 살 때</span>
              {[
                ["1주일", doc.stats.chg1w],
                ["1개월", doc.stats.chg1m],
                ["올해", doc.stats.chgYtd],
                ["1년", doc.stats.chg1y],
              ].map(([label, c]) => {
                const v = c as { won: number; pct: number; from: string } | null;
                if (!v) return null;
                const dir: Dir = v.won > 0 ? "up" : v.won < 0 ? "down" : "none";
                return (
                  <div key={label as string} className="flex items-center justify-between gap-3 text-[14px]">
                    <span className="text-[#6C727B]">{label as string} <span className="text-[12px] text-[#9CA1A8]">({shortDate(v.from)}~)</span></span>
                    <span className="font-bold tabular-nums" style={{ color: dirColor(dir) }}>{signedWon(v.won)}원 · {signedPct(v.pct)}</span>
                  </div>
                );
              })}
            </Card>
          ) : null}
          {doc.sources?.length ? (
            <Card className="p-[22px] flex flex-col gap-2.5">
              <span className="text-[17px] font-bold text-[#1A1D21]">자료 출처</span>
              {doc.sources.map((s) => (
                <span key={s} className="text-[13px] leading-[1.6] text-[#6C727B]">· {s}</span>
              ))}
            </Card>
          ) : null}
        </div>
      </section>

      <BandAd />

      <CrossLinks
        primary={{ href: "/gold", title: "오늘의 시세 홈", sub: "국내·국제 한눈에" }}
        secondary={{ href: "/gold/news", title: "지난 금시세 뉴스", sub: "날짜별 보기" }}
      />

      <FooterNote
        text="기사 숫자는 발행 시점 고시가 기준이며, 장중 시세는 상단 실시간 표시를 참고하세요."
        updatedAt={korDateTime(data?.updatedAt ?? doc.updatedAt ?? undefined)}
      />
    </article>
  );
}
