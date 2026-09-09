"use client";

/**
 * /gold 허브 — docs/gold-hub-mockup-v2.html 의 구조와 데이터 배치를 그대로 옮긴 화면 (스펙 7절).
 *
 * 순서: 티커 → 머리 → 보드(살 때·팔 때·스프레드 브래킷) → 7일 스파크 → [기간별 등락 · 살 때 분해 · 기준가]
 *       → 차트(1주/1개월/1년 · 5개월 KRX) → 시세표(1돈/1g/1kg) + 고시 이력 3일 → 간이 계산기 → FAQ → 출처.
 * 숫자는 전부 gold.json 에서 온다. 값이 없으면 그 칸을 숨긴다. 색: 상승 빨강 · 하락 파랑.
 */

import { useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { HOME_FAQ } from "./faqData";
import {
  type GoldDaily,
  type GoldData,
  type GoldQuote,
  GRAM_PER_DON,
  dirOf,
  hhmm,
  korDateDow,
  monthHigh,
  pointDaysAgo,
  shortDate,
  signedPct,
  signedWon,
  useGold,
  weekStartPoint,
  won,
} from "./goldData";

/* ─────────────────────────── 토큰 (목업 light 팔레트) ─────────────────────────── */
const C = {
  bg: "#FFFFFF",
  surface: "#F6F7F9",
  surface2: "#EEF0F3",
  ink: "#0F1115",
  ink2: "#4B5160",
  ink3: "#8A90A0",
  line: "#E3E6EB",
  line2: "#CDD2DA",
  gold700: "#8F6A12",
  gold500: "#C09A2E",
  gold300: "#E5CC7A",
  gold100: "#FAF4E3",
  up: "#D6323C",
  upBg: "#FCEDEE",
  down: "#2A6FDB",
  downBg: "#EAF1FC",
  flat: "#8A90A0",
  rail: "#0E1116",
  rail2: "#161B22",
  railInk: "#E8EBF0",
  railMute: "#8B94A6",
} as const;

const MONO = "var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const dirColor = (n: number | null | undefined) =>
  dirOf(n) === "up" ? C.up : dirOf(n) === "down" ? C.down : C.flat;
const dirBg = (n: number | null | undefined) =>
  dirOf(n) === "up" ? C.upBg : dirOf(n) === "down" ? C.downBg : C.surface2;
const arrow = (n: number | null | undefined) => (dirOf(n) === "up" ? "▲" : dirOf(n) === "down" ? "▼" : "");

/** "▼ 8,000 (−0.95%)" */
function pill(n: number | null | undefined, pct: number | null | undefined) {
  if (typeof n !== "number") return "";
  if (n === 0) return "보합";
  return `${arrow(n)} ${won(Math.abs(n))}${typeof pct === "number" ? ` (${signedPct(pct)})` : ""}`;
}

/* ─────────────────────────── 화면 ─────────────────────────── */

export default function HubView() {
  const { data, status, reload, loadedAt } = useGold();
  const [spinning, setSpinning] = useState(false);

  const g = data;
  const r = g?.retail;
  const l = r?.latest;
  const ch = r?.change;
  const ref = g?.reference ?? null;
  const d = g?.derived;
  const daily = g?.history?.daily ?? [];

  const onRefresh = () => {
    setSpinning(true);
    reload();
    setTimeout(() => setSpinning(false), 900);
  };

  const stamp = useMemo(() => {
    const t = loadedAt ? new Date(loadedAt) : null;
    return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "";
  }, [loadedAt]);

  return (
    <div style={{ fontFamily: "var(--font-plex-sans), -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif", color: C.ink }} className="text-[14px] leading-[1.55] [font-feature-settings:'tnum'_1]">
      <TickerRail g={g} />

      {/* ── 머리 ── */}
      <header className="flex items-end justify-between gap-6 flex-wrap pt-7 pb-[18px] border-b" style={{ borderColor: C.line }}>
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center font-bold text-[16px] border" style={{ background: C.gold100, color: C.gold700, borderColor: C.gold300 }} aria-hidden="true">金</div>
          <div>
            <h1 className="m-0 text-[22px] font-semibold tracking-[-0.01em]">오늘의 금시세</h1>
            <div className="text-[12.5px] mt-0.5" style={{ color: C.ink3 }}>순금 1돈(3.75g) 살 때 · 팔 때 · 한국거래소 기준가 · 국제 시세</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="text-[12px] flex items-center gap-2" style={{ fontFamily: MONO, color: C.ink2 }}>
            {l ? (
              <>
                <span>{korDateDow(l.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{r?.source} {l.round}차 고시 {hhmm(l.time)}</span>
                {stamp ? (<><span aria-hidden="true">·</span><span>확인 <b>{stamp}</b></span></>) : null}
              </>
            ) : (
              <Skel w={220} />
            )}
          </div>
          <button type="button" onClick={onRefresh} className="inline-flex items-center gap-2 h-[34px] px-3.5 rounded-lg border text-[13px] font-medium transition-colors hover:bg-[#F6F7F9]" style={{ borderColor: C.line2, background: C.bg }} title="시세를 다시 읽습니다">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={spinning ? "animate-spin" : ""}><path d="M21 12a9 9 0 1 1-2.64-6.36" /><polyline points="21 3 21 9 15 9" /></svg>
            갱신
          </button>
        </div>
      </header>

      {status === "error" && !g ? <Notice /> : null}

      {/* ── 보드 ── */}
      <section className="pt-[30px] pb-[26px] border-b" style={{ borderColor: C.line }} aria-label="오늘 순금 1돈 시세">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-[18px] md:gap-x-8 items-start">
          {/* 살 때 */}
          <div>
            <div className="mb-2.5 text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: MONO, color: C.ink3 }}>
              순금 24K · 1돈 · 내가 살 때 <span style={{ color: C.gold700 }}>VAT 포함</span>
            </div>
            {l ? (
              <>
                <div className="flex items-baseline gap-2 leading-none">
                  <span className="text-[48px] md:text-[64px] font-semibold tracking-[-0.035em] tabular-nums">{won(l.buy)}</span>
                  <span className="text-[20px] font-medium" style={{ color: C.ink3 }}>원</span>
                </div>
                {ch && r?.prevClose ? (
                  <div className="inline-flex items-center gap-2 mt-3 text-[14px] font-medium flex-wrap">
                    <Pill n={ch.buy} pct={ch.buyPct} />
                    <span className="text-[12.5px] font-normal" style={{ color: C.ink3 }}>전일 마지막 고시 {won(r.prevClose.buy)}원 대비</span>
                  </div>
                ) : null}
                <div className="mt-3.5 grid gap-[5px] text-[12.5px]" style={{ color: C.ink2 }}>
                  <IntradayLine g={g!} side="buy" />
                  <div>1g 환산 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(l.buy / GRAM_PER_DON)}원</b> · 10돈 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(l.buy * 10)}원</b></div>
                </div>
              </>
            ) : (
              <Skel w={260} h={64} />
            )}
          </div>

          {/* 스프레드 브래킷 */}
          <div className="self-center flex md:flex-col flex-row items-center justify-between md:justify-center gap-1.5 px-[18px] py-3.5 rounded-xl border border-dashed md:min-w-[196px] order-3 md:order-none" style={{ borderColor: C.gold300, background: C.gold100 }}>
            <div className="hidden md:block w-full h-3.5 relative" aria-hidden="true">
              <span className="absolute left-0 right-0 top-1/2 h-px" style={{ background: C.gold500 }} />
              <span className="absolute left-0 top-0.5 w-px h-2.5" style={{ background: C.gold500 }} />
              <span className="absolute right-0 top-0.5 w-px h-2.5" style={{ background: C.gold500 }} />
            </div>
            {d ? (
              <>
                <div className="text-[26px] font-semibold tracking-[-0.03em] tabular-nums" style={{ color: C.gold700 }}>
                  {won(d.spread)}원<small className="text-[13px] font-medium ml-1 opacity-85">{d.spreadPct.toFixed(1)}%</small>
                </div>
                <div className="text-[11.5px] text-center leading-[1.35]" style={{ color: C.ink2 }}>
                  사자마자 팔면 사라지는 돈<br />10돈이면 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(d.spread * 10)}원</b>
                </div>
              </>
            ) : (
              <Skel w={120} h={40} />
            )}
          </div>

          {/* 팔 때 */}
          <div className="md:text-right">
            <div className="mb-2.5 text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: MONO, color: C.ink3 }}>순금 24K · 1돈 · 내가 팔 때</div>
            {l ? (
              <>
                <div className="flex items-baseline gap-2 leading-none md:justify-end">
                  <span className="text-[48px] md:text-[64px] font-semibold tracking-[-0.035em] tabular-nums">{won(l.sell)}</span>
                  <span className="text-[20px] font-medium" style={{ color: C.ink3 }}>원</span>
                </div>
                {ch && r?.prevClose ? (
                  <div className="inline-flex items-center gap-2 mt-3 text-[14px] font-medium flex-wrap md:justify-end">
                    <span className="text-[12.5px] font-normal md:order-none order-2" style={{ color: C.ink3 }}>전일 마지막 고시 {won(r.prevClose.sell)}원 대비</span>
                    <Pill n={ch.sell} pct={ch.sellPct} />
                  </div>
                ) : null}
                <div className="mt-3.5 grid gap-[5px] text-[12.5px]" style={{ color: C.ink2 }}>
                  {ref && d?.sellVsBase != null ? (
                    <div>
                      장중 기준가 {won(ref.basePerDon)}원보다{" "}
                      <b className="font-medium tabular-nums" style={{ color: dirColor(d.sellVsBase) }}>
                        {won(Math.abs(d.sellVsBase))}원 {d.sellVsBase < 0 ? "낮음" : d.sellVsBase > 0 ? "높음" : "같음"}
                      </b>
                    </div>
                  ) : null}
                  <div>1g 환산 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(l.sell / GRAM_PER_DON)}원</b> · 10돈 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(l.sell * 10)}원</b></div>
                </div>
              </>
            ) : (
              <Skel w={260} h={64} />
            )}
          </div>
        </div>

        {/* 7거래일 스파크 */}
        {daily.length >= 2 ? <Spark daily={daily.slice(-7)} /> : null}
      </section>

      {/* ── 카드 3장 ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.05fr_1.25fr_1fr] gap-4 py-[22px]" aria-label="기간별 등락 · 가격 구성 · 기준가">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardTitle right={<More href="/gold/news">날짜별 기사 →</More>}>기간별 등락</CardTitle>
          {g && l ? <PerfTable g={g} /> : <Skel w="100%" h={160} />}
        </Card>

        <Card>
          <CardTitle right={<More href="/gold/buy">살 때 자세히 →</More>}>{l ? `살 때 ${won(l.buy)}원은 이렇게 구성됩니다` : "살 때 가격 구성"}</CardTitle>
          {l && d?.breakdown ? <Breakdown buy={l.buy} sell={l.sell} b={d.breakdown} base={ref?.basePerDon ?? null} sellVsBase={d.sellVsBase} asOf={ref?.asOf} /> : <Skel w="100%" h={160} />}
        </Card>

        <Card>
          <CardTitle right={<span className="text-[12px] font-normal" style={{ color: C.ink3 }}>도매 · 국제</span>}>기준가</CardTitle>
          {g ? <RefCard g={g} /> : <Skel w="100%" h={160} />}
        </Card>
      </section>

      {/* ── 차트 ── */}
      <section className="py-[22px] border-t" style={{ borderColor: C.line }} aria-label="시세 추이">
        {g && daily.length >= 2 ? <Chart g={g} /> : <Skel w="100%" h={300} />}
        <div className="mt-[18px] mb-1"><AdSlot slot="bottom" /></div>
      </section>

      {/* ── 시세표 + 고시 이력 ── */}
      <section className="py-[22px] border-t" style={{ borderColor: C.line }} aria-label="국내 시세표와 고시 이력">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
          <Card>
            {g ? <PriceTable g={g} /> : <Skel w="100%" h={220} />}
          </Card>
          <Card>
            <CardTitle>고시 이력</CardTitle>
            {r?.quotes?.length ? <History quotes={r.quotes} /> : <Skel w="100%" h={220} />}
          </Card>
        </div>
      </section>

      {/* ── 계산기 ── */}
      <section className="py-[22px] border-t" style={{ borderColor: C.line }} aria-label="내 금 계산기">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-3.5">
          <div>
            <h2 className="m-0 text-[16px] font-semibold">내 금 얼마일까 <More href="/gold/calculator">감량·수수료까지 계산 →</More></h2>
            <div className="text-[12px] mt-0.5" style={{ color: C.ink3 }}>오늘 팔 때 고시가로 계산합니다 · 감정 결과에 따라 달라질 수 있습니다</div>
          </div>
        </div>
        {g ? <Calc g={g} /> : <Skel w="100%" h={160} />}
      </section>

      {/* ── FAQ ── */}
      <section className="py-[22px] border-t" style={{ borderColor: C.line }} aria-label="자주 묻는 질문">
        <h2 className="m-0 mb-3.5 text-[16px] font-semibold">자주 묻는 질문</h2>
        <Faq g={g} />
      </section>

      <div className="mb-2"><AdSlot slot="bottom" /></div>

      {/* ── 출처 ── */}
      <footer className="pt-[22px] pb-4 border-t grid gap-2 text-[12px]" style={{ borderColor: C.line, color: C.ink3 }}>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1.5">
          <span>{r?.source ?? "한국금거래소"} 금·백금·은 시세{l ? ` (${korDateDow(l.date)} ${l.round}차 고시)` : ""}</span>
          {g?.wholesale ? <span>· {g.wholesale.source}{g.wholesale.date ? ` (${shortDate(g.wholesale.date)} 종가)` : ""}</span> : null}
          {ref ? <span>· 기준가: {ref.source}{ref.asOf ? ` (${hhmm(ref.asOf.slice(11))})` : ""}</span> : null}
        </div>
        <div>표시 가격은 참고용이며 실제 거래가는 업체·시점·제품 상태에 따라 달라집니다. 상승은 빨간색, 하락은 파란색으로 표시합니다. 살 때는 부가세 10% 포함, 등락은 전 거래일 마지막 고시 대비입니다.</div>
        {g?.updatedAt ? <div style={{ fontFamily: MONO }}>데이터 갱신 {g.updatedAt.slice(0, 16).replace("T", " ")}</div> : null}
      </footer>
    </div>
  );
}

/* ─────────────────────────── 조각 ─────────────────────────── */

function Skel({ w, h = 16 }: { w: number | string; h?: number }) {
  return <span className="inline-block rounded-md animate-pulse" style={{ width: w, height: h, background: C.surface2 }} />;
}

function Notice() {
  return (
    <div className="mt-5 p-5 rounded-xl border text-center" style={{ borderColor: C.line }}>
      <p className="m-0 text-[15px] font-semibold">시세를 불러오지 못했습니다</p>
      <p className="mt-1.5 mb-0 text-[13px]" style={{ color: C.ink3 }}>잠시 후 새로고침해 주세요. 확인되지 않은 값을 대신 표시하지 않습니다.</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border px-5 py-[18px] ${className}`} style={{ borderColor: C.line, background: C.bg, boxShadow: "0 1px 2px rgba(15,17,21,.04),0 8px 24px -12px rgba(15,17,21,.12)" }}>
      {children}
    </div>
  );
}

function CardTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <h2 className="m-0 mb-3.5 text-[14px] font-semibold flex items-center justify-between gap-2.5">
      <span>{children}</span>
      {right}
    </h2>
  );
}

function More({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[12px] font-medium no-underline whitespace-nowrap px-1.5 py-0.5 rounded-[5px] hover:bg-[#FAF4E3]" style={{ color: C.gold700 }}>
      {children}
    </a>
  );
}

function Pill({ n, pct }: { n: number; pct: number | null }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded-md text-[12.5px] font-medium tabular-nums" style={{ fontFamily: MONO, color: dirColor(n), background: dirBg(n) }}>
      {pill(n, pct)}
    </span>
  );
}

/** "장중 1차 828,000원 → 3차 831,000원 (+3,000)" */
function IntradayLine({ g, side }: { g: GoldData; side: "buy" | "sell" }) {
  const r = g.retail!;
  const today = r.quotes.filter((q) => q.date === r.latest.date).sort((a, b) => a.round - b.round);
  if (today.length <= 1) return <div>오늘 {r.latest.round}차 고시 {hhmm(r.latest.time)}</div>;
  const first = today[0];
  const last = today[today.length - 1];
  const diff = last[side] - first[side];
  return (
    <div>
      장중 1차 {won(first[side])}원 → {last.round}차 <b className="font-medium tabular-nums" style={{ color: C.ink }}>{won(last[side])}원</b>{" "}
      <span className="tabular-nums" style={{ color: dirColor(diff) }}>({signedWon(diff)})</span>
    </div>
  );
}

/* 7거래일 스파크 */
function Spark({ daily }: { daily: GoldDaily[] }) {
  const W = 600, H = 44, P = 3;
  const all = daily.flatMap((p) => [p.buy, p.sell]);
  const lo = Math.min(...all), hi = Math.max(...all);
  const x = (i: number) => P + (i * (W - 2 * P)) / Math.max(1, daily.length - 1);
  const y = (v: number) => H - P - ((v - lo) / (hi - lo || 1)) * (H - 2 * P);
  const pts = (k: "buy" | "sell") => daily.map((p, i) => `${x(i)},${y(p[k])}`).join(" ");
  const first = daily[0], last = daily[daily.length - 1];
  return (
    <div className="mt-[22px] grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-2.5 md:gap-[18px] px-4 py-3 rounded-lg border" style={{ borderColor: C.line, background: C.surface }} aria-label="최근 7거래일 추이">
      <div className="flex gap-4 text-[12px]" style={{ color: C.ink2 }}>
        <span><i className="inline-block w-3.5 h-0.5 align-middle mr-1.5 rounded-sm" style={{ background: C.gold500 }} />살 때</span>
        <span><i className="inline-block w-3.5 h-0.5 align-middle mr-1.5 rounded-sm" style={{ background: C.ink2 }} />팔 때</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-11 block" aria-hidden="true">
        <polyline fill="none" stroke={C.gold500} strokeWidth="2" strokeLinejoin="round" points={pts("buy")} />
        <polyline fill="none" stroke={C.ink2} strokeWidth="2" strokeLinejoin="round" points={pts("sell")} />
        <circle cx={x(daily.length - 1)} cy={y(last.buy)} r="3" fill={C.gold500} />
        <circle cx={x(daily.length - 1)} cy={y(last.sell)} r="3" fill={C.ink2} />
      </svg>
      <div className="text-[11.5px] md:text-right leading-[1.5] tabular-nums" style={{ fontFamily: MONO, color: C.ink3 }}>
        {shortDate(first.date)} → {shortDate(last.date)}<br />살 {signedWon(last.buy - first.buy)} · 팔 {signedWon(last.sell - first.sell)}
      </div>
    </div>
  );
}

/* 기간별 등락 */
function PerfTable({ g }: { g: GoldData }) {
  const r = g.retail!;
  const l = r.latest;
  const daily = g.history?.daily ?? [];
  const rows: { label: string; sub: string; buy: number | null; sell: number | null; soon?: boolean }[] = [];

  rows.push({
    label: "오늘",
    sub: r.prevClose ? "전일 마지막 고시 대비" : "전일 고시 없음",
    buy: r.change?.buy ?? null,
    sell: r.change?.sell ?? null,
  });
  const wk = weekStartPoint(daily, l.date);
  rows.push({ label: "이번 주", sub: wk ? `${shortDate(wk.date)} 종가 대비` : "", buy: wk ? l.buy - wk.buy : null, sell: wk ? l.sell - wk.sell : null, soon: !wk });
  const mh = monthHigh(daily, l.date);
  rows.push({ label: "이달 고점 대비", sub: mh ? `${shortDate(mh.date)} ${won(mh.buy)} / ${won(mh.sell)}` : "", buy: mh ? l.buy - mh.buy : null, sell: mh ? l.sell - mh.sell : null, soon: !mh });
  for (const [label, days] of [["1개월", 30], ["6개월", 182], ["1년", 365]] as const) {
    const p = pointDaysAgo(daily, l.date, days);
    const covered = p && g.history?.from && daysBetween(g.history.from, l.date) >= days - 3;
    // 해가 다른 비교 시점은 연도를 붙인다 ("2025.9.9 종가 대비")
    const when = p ? (p.date.slice(0, 4) !== l.date.slice(0, 4) ? `${p.date.slice(0, 4)}.${shortDate(p.date)}` : shortDate(p.date)) : "";
    rows.push({ label, sub: covered && p ? `${when} 종가 대비` : "", buy: covered && p ? l.buy - p.buy : null, sell: covered && p ? l.sell - p.sell : null, soon: !covered });
  }

  const base = (label: string, side: "buy" | "sell") => {
    // 등락률 분모: 각 행의 비교 시점 값
    if (label === "오늘") return r.prevClose?.[side] ?? null;
    if (label === "이번 주") return wk?.[side] ?? null;
    if (label === "이달 고점 대비") return mh?.[side] ?? null;
    const days = label === "1개월" ? 30 : label === "6개월" ? 182 : 365;
    return pointDaysAgo(daily, l.date, days)?.[side] ?? null;
  };

  return (
    <table className="w-full border-collapse text-[13px] tabular-nums">
      <thead>
        <tr>
          {["구간", "살 때", "팔 때"].map((h, i) => (
            <th key={h} className={`font-medium text-[11.5px] pt-1.5 pb-2 border-b whitespace-nowrap ${i ? "text-right" : "text-left"}`} style={{ color: C.ink3, borderColor: C.line }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className="py-[9px] border-b text-left" style={{ borderColor: C.line, color: C.ink2 }}>
              {row.label}
              {row.sub ? <small className="block text-[11px]" style={{ color: C.ink3 }}>{row.sub}</small> : null}
            </td>
            {row.soon ? (
              <td colSpan={2} className="py-[9px] border-b text-right" style={{ borderColor: C.line }}>
                <span className="inline-block px-1.5 py-px border border-dashed rounded text-[10.5px] tracking-[0.04em]" style={{ borderColor: C.line2, color: C.ink3, fontFamily: MONO }}>이력 수집 중</span>
              </td>
            ) : (
              (["buy", "sell"] as const).map((side) => {
                const v = row[side];
                const b = base(row.label, side);
                const pct = v != null && b ? (v / b) * 100 : null;
                return (
                  <td key={side} className="py-[9px] border-b text-right whitespace-nowrap" style={{ borderColor: C.line, color: dirColor(v) }}>
                    {signedWon(v)}
                    {pct != null ? <span className="block text-[11px] mt-px" style={{ fontFamily: MONO }}>{signedPct(pct)}</span> : null}
                  </td>
                );
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(`${b}T00:00:00Z`).getTime() - new Date(`${a}T00:00:00Z`).getTime()) / 86400000);
}

/* 살 때 분해 */
function Breakdown({ buy, sell, b, base, sellVsBase, asOf }: { buy: number; sell: number; b: { gold: number; craft: number; vat: number }; base: number | null; sellVsBase: number | null; asOf?: string }) {
  const parts = [
    { k: "금 자체의 값", sub: `국제 시세 × 환율${asOf ? ` · ${hhmm(asOf.slice(11))} 기준가` : ""}`, v: b.gold, color: C.gold500 },
    { k: "세공비 · 유통 마진", sub: "골드바·반지로 만들어 파는 비용", v: b.craft, color: C.ink2 },
    { k: "부가가치세 10%", sub: "실물 구매 시 소비자 부담", v: b.vat, color: C.ink3 },
  ];
  const pctOfBuy = (v: number) => Math.max(0, (v / buy) * 100);
  return (
    <div className="mt-1.5">
      <div className="flex h-[34px] rounded-[7px] overflow-hidden" style={{ background: C.surface2 }} role="img" aria-label={parts.map((p) => `${p.k} ${pctOfBuy(p.v).toFixed(1)}%`).join(", ")}>
        {parts.map((p) => (
          <div key={p.k} style={{ width: `${pctOfBuy(p.v)}%`, background: p.color }} />
        ))}
      </div>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 gap-y-1.5 items-center mt-3 text-[12.5px] tabular-nums">
        {parts.map((p) => (
          <FragmentRow key={p.k} p={p} pct={pctOfBuy(p.v)} />
        ))}
      </div>
      <div className="mt-3 pt-3 border-t text-[12.5px] flex justify-between gap-3 flex-wrap" style={{ borderColor: C.line, color: C.ink2 }}>
        <span>
          팔 때 {won(sell)}원{base != null && sellVsBase != null ? <> = 기준가 {won(base)}원 <b className="font-medium" style={{ color: dirColor(sellVsBase) }}>{sellVsBase < 0 ? "−" : "+"} {won(Math.abs(sellVsBase))}원</b></> : null}
        </span>
        <span>세금·세공비는 <b className="font-medium" style={{ color: C.ink }}>되돌아오지 않음</b></span>
      </div>
    </div>
  );
}

function FragmentRow({ p, pct }: { p: { k: string; sub: string; v: number; color: string }; pct: number }) {
  return (
    <>
      <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: p.color }} />
      <span style={{ color: C.ink2 }}>{p.k}<small className="block text-[11px]" style={{ color: C.ink3 }}>{p.sub}</small></span>
      <span className="font-medium text-right" style={{ color: p.v < 0 ? C.down : C.ink }}>{p.v < 0 ? "−" : ""}{won(Math.abs(p.v))}원</span>
      <span className="text-[11px] text-right min-w-[44px]" style={{ fontFamily: MONO, color: C.ink3 }}>{pct.toFixed(1)}%</span>
    </>
  );
}

/* 기준가 카드 */
function RefCard({ g }: { g: GoldData }) {
  const ref = g.reference;
  const w = g.wholesale;
  const rows: { k: string; sub: string; v: string; sub2?: string }[] = [];
  if (w) rows.push({ k: "한국거래소 KRX 금시장", sub: `1g · ${shortDate(w.date)} 종가`, v: `${won(w.closePerGram)}원`, sub2: `1돈 ${won(w.closePerDon)}원` });
  if (ref) {
    rows.push({ k: "기준가 (국제 시세 × 환율)", sub: `1g · ${hhmm(ref.asOf.slice(11))} 기준`, v: `${won(ref.basePerGram)}원`, sub2: `1돈 ${won(ref.basePerDon)}원` });
    rows.push({ k: "국제 금", sub: "달러 · 트로이온스 (COMEX 선물)", v: `$${ref.xauUsd.toLocaleString("en-US")}` });
    rows.push({ k: "원/달러", sub: "시장 환율", v: `${ref.usdKrw.toLocaleString("ko-KR")}원` });
  }
  if (!rows.length) return <div className="text-[12.5px]" style={{ color: C.ink3 }}>기준가를 아직 받지 못했습니다.</div>;
  return (
    <>
      <div className="grid gap-2.5 tabular-nums">
        {rows.map((row) => (
          <div key={row.k} className="flex justify-between items-baseline gap-3">
            <span className="text-[12.5px]" style={{ color: C.ink2 }}>{row.k}<small className="block text-[11px]" style={{ color: C.ink3 }}>{row.sub}</small></span>
            <span className="font-medium text-right">{row.v}{row.sub2 ? <small className="block text-[11px] font-normal" style={{ fontFamily: MONO, color: C.ink3 }}>{row.sub2}</small> : null}</span>
          </div>
        ))}
      </div>
      {ref && g.retail ? (
        <div className="mt-3.5 px-3 py-2.5 rounded-lg text-[11.5px] leading-[1.6] overflow-x-auto" style={{ background: C.surface, fontFamily: MONO, color: C.ink2 }}>
          {ref.xauUsd.toLocaleString("en-US")} ÷ 31.1035 × {ref.usdKrw.toLocaleString("ko-KR")} × 3.75<br />
          = <b className="font-semibold" style={{ color: C.ink }}>{won(ref.basePerDon)}원</b>{" "}
          {g.derived?.sellVsBase != null ? <span style={{ color: C.ink3 }}>← 팔 때 고시가와 {won(Math.abs(g.derived.sellVsBase))}원 차이</span> : null}
        </div>
      ) : null}
    </>
  );
}

/* 차트 */
type Range = "w" | "m1" | "y1" | "m5";
function Chart({ g }: { g: GoldData }) {
  const daily = useMemo(() => g.history?.daily ?? [], [g]);
  const coveredDays = g.history?.from && g.retail ? daysBetween(g.history.from, g.retail.latest.date) : 0;
  const [range, setRange] = useState<Range>("w");
  const [show, setShow] = useState<[boolean, boolean]>([true, true]);
  const [hover, setHover] = useState<number | null>(null);

  const tabs: { key: Range; label: string; disabled?: boolean }[] = [
    { key: "w", label: "1주" },
    { key: "m1", label: "1개월", disabled: coveredDays < 27 },
    { key: "y1", label: "1년", disabled: coveredDays < 300 },
    { key: "m5", label: "5개월 · KRX", disabled: !(g.wholesale?.monthly?.length) },
  ];

  const { labels, series, note, title } = useMemo(() => {
    if (range === "m5" && g.wholesale?.monthly?.length) {
      const m = g.wholesale.monthly;
      return {
        labels: m.map((x) => `${Number(x.month.slice(5))}월`),
        series: [{ n: "KRX 도매 종가", d: m.map((x) => x.closePerDon), c: C.gold500 }],
        note: "하루 1회 갱신되는 전 영업일 종가 기준 · 월별 마지막 영업일",
        title: `KRX 금시장 도매 종가 · 월별 · ${Number(m[0].month.slice(5))}월 → ${Number(m[m.length - 1].month.slice(5))}월`,
      };
    }
    const n = range === "w" ? 7 : range === "m1" ? 22 : daily.length;
    const pts = daily.slice(-n);
    return {
      labels: pts.map((p) => (range === "y1" ? p.date.slice(2, 7).replace("-", ".") : shortDate(p.date))),
      series: [
        { n: "살 때", d: pts.map((p) => p.buy), c: C.gold500 },
        { n: "팔 때", d: pts.map((p) => p.sell), c: C.ink2 },
      ],
      note: "마우스를 올리면 날짜별 값이 표시됩니다.",
      title: `${g.retail?.source ?? ""} 일별 마지막 고시 · ${shortDate(pts[0].date)} → ${shortDate(pts[pts.length - 1].date)}`,
    };
  }, [range, daily, g]);

  const vis = series.filter((_, i) => (range === "m5" ? true : show[i]));
  const W = 1120, H = 300, L = 64, R = 16, T = 18, B = 34;
  const all = vis.flatMap((s) => s.d);
  let lo = all.length ? Math.min(...all) : 0, hi = all.length ? Math.max(...all) : 1;
  const pad = (hi - lo) * 0.18 || 10000;
  lo -= pad; hi += pad;
  const step = (() => { const r0 = hi - lo; const p = 10 ** Math.floor(Math.log10(r0 / 4)); const m = r0 / 4 / p; return (m < 1.5 ? 1 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10) * p; })();
  lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
  const n = labels.length;
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(1, n - 1);
  const y = (v: number) => T + ((hi - v) / (hi - lo || 1)) * (H - T - B);
  const ticks: number[] = [];
  for (let v = lo; v <= hi + 1e-6; v += step) ticks.push(v);
  const labelEvery = Math.max(1, Math.ceil(n / 8));

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let i = Math.round((px - L) / ((W - L - R) / Math.max(1, n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    setHover(i);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-3.5">
        <div>
          <h2 className="m-0 text-[16px] font-semibold">금 1돈 시세 추이</h2>
          <div className="text-[12px] mt-0.5" style={{ color: C.ink3 }}>{title}</div>
        </div>
        <div className="inline-flex gap-0.5 p-[3px] rounded-[9px] border" style={{ borderColor: C.line, background: C.surface }} role="tablist">
          {tabs.map((t) => (
            <button key={t.key} type="button" role="tab" aria-selected={range === t.key} disabled={t.disabled} onClick={() => { setRange(t.key); setHover(null); }}
              className="px-3 py-1.5 rounded-md text-[12.5px] font-medium disabled:cursor-not-allowed"
              style={range === t.key ? { background: C.bg, color: C.ink, boxShadow: "0 1px 2px rgba(15,17,21,.08)" } : { color: t.disabled ? C.ink3 : C.ink2 }}
              title={t.disabled ? "이력이 쌓이면 열립니다" : undefined}>
              {t.label}{t.disabled ? <small className="ml-1 text-[10px] opacity-80" style={{ fontFamily: MONO }}>수집 중</small> : null}
            </button>
          ))}
        </div>
      </div>
      <div className="relative rounded-xl border pt-4 px-3 pb-2" style={{ borderColor: C.line, background: C.bg, boxShadow: "0 1px 2px rgba(15,17,21,.04),0 8px 24px -12px rgba(15,17,21,.12)" }}>
        {range !== "m5" ? (
          <div className="flex gap-4 px-2 pb-2 text-[12px]" style={{ color: C.ink2 }}>
            {series.map((s, i) => (
              <button key={s.n} type="button" aria-pressed={show[i]} onClick={() => setShow((p) => (i === 0 ? [!p[0], p[1]] : [p[0], !p[1]]))} className="inline-flex items-center gap-1.5 px-1 py-0.5 rounded" style={{ opacity: show[i] ? 1 : 0.4 }}>
                <i className="inline-block w-3.5 h-0.5 rounded-sm" style={{ background: s.c }} /><span>{s.n}</span>
              </button>
            ))}
          </div>
        ) : null}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px] sm:h-[300px] block overflow-visible" role="img" aria-label="금 1돈 시세 추이 차트" onMouseLeave={() => setHover(null)}>
          <g>
            {ticks.map((v) => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={C.line} strokeDasharray="2 4" />
                <text x={L - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill={C.ink3} style={{ fontFamily: MONO }}>{(v / 10000).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}만</text>
              </g>
            ))}
            {labels.map((lb, i) => (i % labelEvery === 0 || i === n - 1) ? <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill={C.ink3} style={{ fontFamily: MONO }}>{lb}</text> : null)}
          </g>
          {vis.map((s, k) => {
            const pts = s.d.map((v, i) => `${x(i)},${y(v)}`).join(" ");
            const area = `M${x(0)},${y(s.d[0])} L${pts.split(" ").join(" L")} L${x(n - 1)},${H - B} L${x(0)},${H - B} Z`;
            return (
              <g key={s.n}>
                <path d={area} fill={s.c} fillOpacity={k === 0 ? 0.1 : 0.06} />
                <polyline fill="none" stroke={s.c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts} />
                <circle cx={x(n - 1)} cy={y(s.d[n - 1])} r="4.5" fill={s.c} stroke={C.bg} strokeWidth="2" />
              </g>
            );
          })}
          {hover != null ? (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke={C.line2} strokeDasharray="3 3" />
              {vis.map((s) => <circle key={s.n} cx={x(hover)} cy={y(s.d[hover])} r="4" fill={s.c} stroke={C.bg} strokeWidth="2" />)}
            </g>
          ) : null}
          <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="transparent" onMouseMove={onMove} />
        </svg>
        {hover != null ? (
          <div className="absolute pointer-events-none text-[12px] px-2.5 py-2 rounded-[7px] whitespace-nowrap leading-[1.5]" style={{ left: `${(x(hover) / W) * 100}%`, top: 12, transform: "translateX(-50%)", background: C.ink, color: C.bg, fontFamily: MONO }}>
            <b className="font-semibold">{range === "m5" ? `${labels[hover]}` : labels[hover]}</b>
            {vis.map((s) => <div key={s.n} className="flex justify-between gap-3.5"><span>{s.n}</span><b className="font-semibold">{won(s.d[hover])}</b></div>)}
          </div>
        ) : null}
        <div className="px-2 pt-2 pb-0.5 text-[11.5px] flex justify-between gap-3 flex-wrap" style={{ color: C.ink3 }}>
          <span>{note}</span><span>단위: 원 / 1돈(3.75g)</span>
        </div>
      </div>
    </>
  );
}

/* 시세표 (1돈 / 1g / 1kg) */
type Unit = "don" | "g" | "kg";
function PriceTable({ g }: { g: GoldData }) {
  const r = g.retail!;
  const l = r.latest;
  const c = r.change;
  const [unit, setUnit] = useState<Unit>("don");
  const conv = (v: number) => (unit === "don" ? v : unit === "g" ? v / GRAM_PER_DON : (v / GRAM_PER_DON) * 1000);
  const rows: { name: string; sub: string; buy: number | null; sell: number | null; db: number | null; ds: number | null; buyNa?: string }[] = [
    { name: "순금 24K", sub: "Gold 99.9%", buy: l.buy, sell: l.sell, db: c?.buy ?? null, ds: c?.sell ?? null },
    { name: "18K", sub: "금 함량 75%", buy: null, sell: l.k18, db: null, ds: c?.k18 ?? null, buyNa: "제품시세" },
    { name: "14K", sub: "금 함량 58.5%", buy: null, sell: l.k14, db: null, ds: c?.k14 ?? null, buyNa: "제품시세" },
    { name: "백금", sub: "Platinum", buy: r.platinum.buy, sell: r.platinum.sell, db: r.platinum.buy != null && r.platinum.prevBuy != null ? r.platinum.buy - r.platinum.prevBuy : null, ds: r.platinum.sell != null && r.platinum.prevSell != null ? r.platinum.sell - r.platinum.prevSell : null },
    { name: "은", sub: "Silver", buy: r.silver.buy, sell: r.silver.sell, db: r.silver.buy != null && r.silver.prevBuy != null ? r.silver.buy - r.silver.prevBuy : null, ds: r.silver.sell != null && r.silver.prevSell != null ? r.silver.sell - r.silver.prevSell : null },
  ];
  const delta = (v: number | null) => v == null ? <span style={{ color: C.ink3 }}>—</span> : <span style={{ color: dirColor(v) }}>{v === 0 ? "0" : `${arrow(v)} ${won(Math.abs(conv(v)))}`}</span>;
  return (
    <>
      <CardTitle right={
        <span className="inline-flex gap-0.5 p-[3px] rounded-lg border" style={{ borderColor: C.line, background: C.surface }} role="group" aria-label="단위">
          {(["don", "g", "kg"] as Unit[]).map((u) => (
            <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)} className="px-2.5 py-1 rounded-[5px] text-[12px] font-medium" style={unit === u ? { background: C.bg, color: C.ink, boxShadow: "0 1px 2px rgba(15,17,21,.08)" } : { color: C.ink2 }}>
              {u === "don" ? "1돈" : u === "g" ? "1g" : "1kg"}
            </button>
          ))}
        </span>
      }>
        <span>국내 시세표 <More href="/gold/sell">순도별 매입가 →</More></span>
      </CardTitle>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px] tabular-nums min-w-[420px]">
          <thead>
            <tr>
              <th className="font-medium text-[11.5px] text-left pt-1.5 pb-2 border-b" style={{ color: C.ink3, borderColor: C.line }}>품목</th>
              <th className="font-medium text-[11.5px] text-right pt-1.5 pb-2 border-b" style={{ color: C.ink3, borderColor: C.line }}>살 때</th>
              <th className="font-medium text-[11.5px] text-right pt-1.5 pb-2 border-b" style={{ color: C.ink3, borderColor: C.line }}>팔 때</th>
              <th className="font-medium text-[11.5px] text-right pt-1.5 pb-2 border-b whitespace-nowrap" style={{ color: C.ink3, borderColor: C.line }}>전일 대비<br /><span className="font-normal">살 / 팔</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="py-[9px] border-b font-medium" style={{ borderColor: C.line }}>{row.name}<small className="block text-[11px] font-normal" style={{ color: C.ink3 }}>{row.sub}</small></td>
                <td className="py-[9px] border-b text-right text-[14px] font-medium" style={{ borderColor: C.line }}>{row.buy != null ? won(conv(row.buy)) : <span className="text-[12px] font-normal" style={{ color: C.ink3 }}>{row.buyNa ?? "—"}</span>}</td>
                <td className="py-[9px] border-b text-right text-[14px] font-medium" style={{ borderColor: C.line }}>{row.sell != null ? won(conv(row.sell)) : <span style={{ color: C.ink3 }}>—</span>}</td>
                <td className="py-[9px] border-b text-right whitespace-nowrap" style={{ borderColor: C.line }}>{delta(row.db)} <span style={{ color: C.line2 }}>/</span> {delta(row.ds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 mb-0 text-[12px]" style={{ color: C.ink3 }}>
        {r.source} {korDateDow(l.date)} {l.round}차 고시 · 살 때는 부가세 포함가 · 18K·14K는 매입만 하며 살 때는 제품 시세가 적용됩니다.
      </p>
    </>
  );
}

/* 고시 이력 3일 */
function History({ quotes }: { quotes: GoldQuote[] }) {
  const days = [...new Set(quotes.map((q) => q.date))];
  return (
    <div>
      {days.map((day, di) => {
        const qs = quotes.filter((q) => q.date === day).sort((a, b) => b.round - a.round);
        const sells = qs.map((q) => q.sell);
        const range = Math.max(...sells) - Math.min(...sells);
        return (
          <div key={day} className="py-2.5 border-b last:border-b-0" style={{ borderColor: C.line }}>
            <div className="flex justify-between items-baseline mb-1.5">
              <b className="font-semibold text-[13px]">{korDateDow(day)}</b>
              <span className="text-[11px]" style={{ fontFamily: MONO, color: C.ink3 }}>
                {qs.length}회 고시{range > 0 ? <> · <span className="inline-block px-[7px] py-px rounded-[5px] text-[10.5px]" style={{ background: C.surface2, color: C.ink2 }}>하루 폭 {won(range)}</span></> : null}
              </span>
            </div>
            {qs.map((q, qi) => {
              const latest = di === 0 && qi === 0;
              return (
                <div key={q.round} className="grid grid-cols-[36px_1fr_1fr] gap-2 py-1 text-[12.5px] items-baseline tabular-nums" style={latest ? { background: C.gold100, margin: "0 -8px", padding: "6px 8px", borderRadius: 6 } : undefined}>
                  <span className="text-[11px]" style={{ fontFamily: MONO, color: latest ? C.gold700 : C.ink3 }}>{q.round}차</span>
                  <span className="text-right"><span className="text-[11px] mr-1.5" style={{ color: C.ink3 }}>살</span>{won(q.buy)}</span>
                  <span className="text-right"><span className="text-[11px] mr-1.5" style={{ color: C.ink3 }}>팔</span>{won(q.sell)}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* 간이 계산기 */
function Calc({ g }: { g: GoldData }) {
  const r = g.retail!;
  const l = r.latest;
  const options = [
    { key: "24k", label: `순금 24K · 1돈 ${won(l.sell)}원`, rate: l.sell },
    ...(l.k18 ? [{ key: "18k", label: `18K (각인 750) · 1돈 ${won(l.k18)}원`, rate: l.k18 }] : []),
    ...(l.k14 ? [{ key: "14k", label: `14K (각인 585) · 1돈 ${won(l.k14)}원`, rate: l.k14 }] : []),
    ...(r.platinum.sell ? [{ key: "pt", label: `백금 · 1돈 ${won(r.platinum.sell)}원`, rate: r.platinum.sell }] : []),
    ...(r.silver.sell ? [{ key: "ag", label: `은 · 1돈 ${won(r.silver.sell)}원`, rate: r.silver.sell }] : []),
  ];
  const [wt, setWt] = useState("3.75");
  const [wu, setWu] = useState<"g" | "don">("g");
  const [pu, setPu] = useState(options[0].key);
  const rate = options.find((o) => o.key === pu)?.rate ?? l.sell;
  const raw = parseFloat(wt);
  const valid = Number.isFinite(raw) && raw > 0;
  const don = valid ? (wu === "g" ? raw / GRAM_PER_DON : raw) : 0;
  const out = don * rate;
  const inputCls = "h-11 px-3.5 rounded-lg border text-[18px] font-medium tabular-nums min-w-0 flex-1";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid gap-3.5">
        <div className="grid gap-1.5">
          <label htmlFor="hub-wt" className="text-[12px]" style={{ color: C.ink2 }}>중량</label>
          <div className="flex gap-2">
            <input id="hub-wt" type="number" inputMode="decimal" min="0" step="0.01" value={wt} onChange={(e) => setWt(e.target.value)} className={inputCls} style={{ borderColor: C.line2, background: C.bg, color: C.ink }} aria-label="중량" />
            <select value={wu} onChange={(e) => setWu(e.target.value as "g" | "don")} className="h-11 px-3 rounded-lg border text-[14px]" style={{ borderColor: C.line2, background: C.bg, color: C.ink }} aria-label="중량 단위">
              <option value="g">g</option><option value="don">돈</option>
            </select>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {[1, 2, 3, 5, 10].map((n) => (
              <button key={n} type="button" onClick={() => { setWu("don"); setWt(String(n)); }} className="px-2.5 py-[5px] rounded-full border text-[12px] hover:border-[#8A90A0]" style={{ borderColor: C.line2, color: C.ink2 }}>{n}돈{n === 1 ? " (3.75g)" : ""}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="hub-pu" className="text-[12px]" style={{ color: C.ink2 }}>순도</label>
          <select id="hub-pu" value={pu} onChange={(e) => setPu(e.target.value)} className="h-11 px-3 rounded-lg border text-[14px] w-full" style={{ borderColor: C.line2, background: C.bg, color: C.ink }} aria-label="순도">
            {options.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="rounded-xl border px-[22px] py-5 flex flex-col justify-center gap-2" style={{ borderColor: C.line, background: C.surface }}>
        <div className="text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: MONO, color: C.ink3 }}>예상 매입가 · 팔 때</div>
        <div className="text-[40px] font-semibold tracking-[-0.03em] leading-none tabular-nums">{valid ? won(out) : "—"}<small className="text-[16px] font-medium ml-1" style={{ color: C.ink3 }}>원</small></div>
        <div className="text-[11.5px] leading-[1.6] mt-1.5" style={{ fontFamily: MONO, color: C.ink2 }}>
          {valid ? (wu === "g" ? `${raw}g ÷ 3.75 = ${don.toFixed(2)}돈 × ${won(rate)}원` : `${raw}돈 × ${won(rate)}원`) : "중량을 입력하거나 위 버튼을 누르세요"}
        </div>
        <div className="text-[12px] mt-1.5" style={{ color: C.ink3 }}>보석·큐빅 무게는 제외되고, 도금·상태에 따라 감량이 붙을 수 있습니다. 두세 곳 매입가를 비교하세요.</div>
      </div>
    </div>
  );
}

/* FAQ — 문항은 faqData.HOME_FAQ(JSON-LD 와 동일), 오늘 숫자 한 줄을 덧붙인다 */
function Faq({ g }: { g: GoldData | null }) {
  const l = g?.retail?.latest;
  const d = g?.derived;
  const ref = g?.reference;
  const daily = g?.history?.daily ?? [];
  const live: Record<number, string> = {};
  if (l && d?.breakdown) {
    live[0] = `오늘 기준 살 때 ${won(l.buy)}원에는 부가가치세 ${won(d.breakdown.vat)}원과 세공·유통 비용 ${won(d.breakdown.craft)}원이 들어 있고, 팔 때 ${won(l.sell)}원은 기준가 ${ref ? won(ref.basePerDon) : ""}원과 ${d.sellVsBase != null ? won(Math.abs(d.sellVsBase)) : ""}원 차이입니다.`;
  }
  if (l && d && l.k18 && l.k14) {
    live[1] = `오늘 순금 매입가 ${won(l.sell)}원의 75%는 ${won(d.k18Theory)}원이지만 18K 고시가는 ${won(l.k18)}원으로 ${won(Math.abs(d.k18Gap ?? 0))}원 적고, 14K도 이론값 ${won(d.k14Theory)}원보다 ${won(Math.abs(d.k14Gap ?? 0))}원 적습니다.`;
  }
  if (l && daily.length >= 2) {
    const y = daily[daily.length - 2];
    live[3] = `${korDateDow(l.date)}에는 ${l.round}회, ${korDateDow(y.date)}에는 ${y.rounds}회 고시됐습니다.`;
  }
  return (
    <div>
      {HOME_FAQ.map((f, i) => (
        <details key={f.q} open={i === 0} className="border-b group" style={{ borderColor: C.line }}>
          <summary className="list-none cursor-pointer flex justify-between items-center gap-3 py-3.5 font-medium text-[14px] [&::-webkit-details-marker]:hidden">
            {f.q}<span className="text-[16px] transition-transform group-open:rotate-45" style={{ fontFamily: MONO, color: C.ink3 }}>+</span>
          </summary>
          <div className="pb-4 text-[13.5px] leading-[1.7] max-w-[68ch]" style={{ color: C.ink2 }}>
            {f.a}{live[i] ? <> <b className="font-medium" style={{ color: C.ink }}>{live[i]}</b></> : null}
          </div>
        </details>
      ))}
    </div>
  );
}

/* 티커 레일 */
function TickerRail({ g }: { g: GoldData | null }) {
  const r = g?.retail;
  const l = r?.latest;
  const c = r?.change;
  const items: [string, string, string, number | null][] = [];
  if (l) {
    items.push(["순금 1돈 살 때", won(l.buy), pill(c?.buy ?? 0, null), c?.buy ?? 0]);
    items.push(["순금 1돈 팔 때", won(l.sell), pill(c?.sell ?? 0, null), c?.sell ?? 0]);
    if (l.k18) items.push(["18K 팔 때", won(l.k18), pill(c?.k18 ?? 0, null), c?.k18 ?? 0]);
    if (l.k14) items.push(["14K 팔 때", won(l.k14), pill(c?.k14 ?? 0, null), c?.k14 ?? 0]);
    if (r?.platinum.buy && r.platinum.sell) {
      const dd = r.platinum.sell != null && r.platinum.prevSell != null ? r.platinum.sell - r.platinum.prevSell : 0;
      items.push(["백금 1돈", `${won(r.platinum.buy)} / ${won(r.platinum.sell)}`, pill(dd, null), dd]);
    }
    if (r?.silver.buy && r.silver.sell) {
      const dd = r.silver.sell != null && r.silver.prevSell != null ? r.silver.sell - r.silver.prevSell : 0;
      items.push(["은 1돈", `${won(r.silver.buy)} / ${won(r.silver.sell)}`, pill(dd, null), dd]);
    }
  }
  if (g?.wholesale) items.push(["KRX 금시장", `${won(g.wholesale.closePerGram)}원/g`, `${shortDate(g.wholesale.date)} 종가`, null]);
  if (g?.reference) {
    items.push(["국제 금 (COMEX)", `$${g.reference.xauUsd.toLocaleString("en-US")}`, hhmm(g.reference.asOf.slice(11)), null]);
    items.push(["USD/KRW", g.reference.usdKrw.toLocaleString("ko-KR"), hhmm(g.reference.asOf.slice(11)), null]);
  }
  if (!items.length) return null;
  const track = (
    <div className="flex">
      {items.map(([k, v, dd, n], i) => (
        <span key={`${k}-${i}`} className="inline-flex items-baseline gap-2 px-[22px] py-[11px] border-r text-[12.5px] whitespace-nowrap" style={{ borderColor: C.rail2, fontFamily: MONO }}>
          <span className="text-[11px] tracking-[0.04em]" style={{ color: C.railMute }}>{k}</span>
          <span className="font-medium">{v}</span>
          <span className="text-[11px]" style={{ color: n == null ? C.railMute : n > 0 ? "#F25C65" : n < 0 ? "#5E96F5" : C.railMute }}>{dd}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-b -mx-4 sm:-mx-8" style={{ background: C.rail, color: C.railInk, borderColor: C.rail2 }} aria-label="시세 티커">
      <div className="absolute left-0 top-0 bottom-0 z-[2] flex items-center gap-2 pl-6 pr-4 text-[11px] tracking-[0.12em]" style={{ background: C.rail, fontFamily: MONO }}>
        <span className="w-[7px] h-[7px] rounded-full" style={{ background: C.gold500, boxShadow: "0 0 0 3px rgba(192,154,46,.25)" }} aria-hidden="true" />LIVE
      </div>
      <div className="flex w-max pl-[118px] gold-marquee">
        {track}{track}
      </div>
      <style>{`
        @keyframes gold-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .gold-marquee { animation: gold-marquee 52s linear infinite }
        .gold-marquee:hover { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) { .gold-marquee { animation: none } }
      `}</style>
    </div>
  );
}
