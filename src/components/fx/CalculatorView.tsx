"use client";

import { useMemo, useState } from "react";
import {
  BandAd,
  BoxAd,
  Card,
  ChangeBadge,
  DARK_BG,
  DataNotice,
  FooterNote,
  PillTabs,
  SectionHead,
  Skeleton,
} from "./ui";
import {
  changeText,
  convert,
  countryOf,
  fxColor,
  korDateTime,
  perUnit,
  unitNameOf,
  useFx,
  won,
  type FxRate,
} from "./fxData";

const QUICK = [10000, 50000, 100000, 500000, 1000000];

/** 환율계산기.html 시안을 옮긴 페이지. */
/** ?? [] 는 매 렌더마다 새 배열이라 useMemo 의존성을 깨뜨린다. 한 번만 만든다. */
const NO_RATES: FxRate[] = [];

export default function CalculatorView() {
  const { data, status } = useFx();
  const rates = data?.rates ?? NO_RATES;

  const [amount, setAmount] = useState("1000000");
  const [from, setFrom] = useState("KRW");
  const [to, setTo] = useState("JPY");
  const [region, setRegion] = useState("전체");
  const [query, setQuery] = useState("");

  const num = Number(String(amount).replace(/,/g, ""));
  const valid = Number.isFinite(num) && num > 0;
  const result = valid ? convert(num, from, to, rates) : null;

  const options = useMemo(
    () => [{ code: "KRW", label: "KRW 원" }, ...rates.map((r) => ({ code: r.code, label: `${r.code} ${unitNameOf(r.name)}` }))],
    [rates]
  );

  // 적용 환율 한 줄 — "1 JPY = 9.44 KRW"
  const one = convert(1, from, to, rates);
  const rateLine = one ? `1 ${from} = ${won(one, one < 10 ? 4 : 2)} ${to}` : "";

  const regions = useMemo(() => {
    const set = new Set(rates.map((r) => r.region).filter(Boolean) as string[]);
    return ["전체", ...set];
  }, [rates]);

  const shown = rates.filter((r) => region === "전체" || r.region === region).slice(0, 6);

  // 차트에 띄울 통화 — 계산기에서 고른 외화를 따라간다
  const chartRate = rates.find((r) => r.code === (to === "KRW" ? from : to)) ?? rates[0];

  const tableRows = rates.filter((r) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      r.code.toLowerCase().includes(q) || (r.name ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-0">
      {/* 히어로 — 전체 너비 다크 */}
      <section style={DARK_BG} className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-12 sm:py-[72px]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] gap-10 lg:gap-[60px] items-start">
          <div className="pt-1.5">
            <div className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12]">
              <span className="px-[7px] py-0.5 rounded-full bg-[#3DD68C] text-[#06301E] text-[10.5px] font-extrabold tracking-[0.06em]">
                MID
              </span>
              <span className="text-[12.5px] font-semibold text-white/[0.78]">
                중간 환율 · 수수료 없는 기준가
              </span>
            </div>
            <h1 className="mt-[22px] mb-0 text-[36px] sm:text-[56px] leading-[1.12] tracking-[-0.035em] font-extrabold text-white text-balance">
              여행 갈 때마다
              <br />
              <span className="text-white/55 font-medium">계산기 두드리지</span> 않게
            </h1>
            <p className="mt-[22px] mb-0 text-[17px] sm:text-[18px] leading-[1.75] text-white/[0.62] max-w-[33ch]">
              매매기준율로 환전 금액을 바로 확인하고, 자주 가는 여행지 통화와 은행별 실제 환전가를
              한 화면에서 비교하세요.
            </p>
            <div className="mt-[30px] flex items-center gap-2.5 flex-wrap">
              <a
                href="/fx/banks"
                className="inline-flex items-center gap-2 px-6 py-[15px] rounded-[13px] bg-white text-[#0B2233] text-[15px] font-bold hover:bg-[#E9F0F7] transition-colors"
              >
                은행 환율 비교하기 →
              </a>
              {data?.banks?.currencies?.length ? (
                <span className="text-[13px] text-white/[0.42]">
                  {data.banks.byCurrency[data.banks.currencies[0]]?.length ?? 0}개 은행 ·{" "}
                  {rates.length}개 통화
                </span>
              ) : null}
            </div>

            <div className="mt-[38px] pt-6 border-t border-white/[0.12] grid grid-cols-3 gap-5">
              <HeroStat label="기준" value={data?.source ? "시장 중간환율" : "—"} />
              <HeroStat label="통화 수" value={rates.length ? `${rates.length}개` : "—"} />
              <HeroStat
                label="갱신"
                value={data?.updatedAt ? korDateTime(data.updatedAt).split(" ").slice(-1)[0] : "—"}
              />
            </div>
          </div>

          {/* 계산기 카드 */}
          <div className="bg-white rounded-[26px] p-6 sm:p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.12)]">
            <div className="grid gap-2.5">
              <label htmlFor="fx-amount" className="text-[14px] font-semibold text-[#6C727B]">
                보내는 금액
              </label>
              <div className="flex items-center gap-3 border border-[#CFCBC1] rounded-[14px] px-4 py-3.5">
                <input
                  id="fx-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  className="flex-1 min-w-0 border-none outline-none bg-transparent text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-[#1A1D21] tabular-nums"
                />
                <CurrencySelect value={from} onChange={setFrom} options={options} />
              </div>
            </div>

            <div className="flex items-center gap-3.5 py-3.5">
              <div className="flex-1 h-px bg-[#E2DFD7]" />
              <button
                type="button"
                aria-label="통화 바꾸기"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="w-10 h-10 rounded-xl border border-[#CFCBC1] bg-white text-[#3C424A] text-[15px] flex items-center justify-center hover:border-[#1F4E79] hover:text-[#1F4E79] transition-colors"
              >
                ⇅
              </button>
              <div className="flex-1 h-px bg-[#E2DFD7]" />
            </div>

            <div className="grid gap-2.5">
              <span className="text-[14px] font-semibold text-[#6C727B]">받는 금액</span>
              <div className="flex items-center gap-3 border border-[#E2DFD7] rounded-[14px] px-4 py-3.5 bg-[#F7F6F3]">
                <div className="flex-1 min-w-0 text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-[#1A1D21] tabular-nums overflow-hidden text-ellipsis">
                  {result !== null ? won(result, result < 100 ? 2 : 0) : rates.length ? "—" : ""}
                  {rates.length === 0 ? <Skeleton className="w-32 h-8" /> : null}
                </div>
                <CurrencySelect value={to} onChange={setTo} options={options} />
              </div>
            </div>

            {rateLine ? (
              <div className="mt-[22px] pt-5 border-t border-[#E2DFD7] flex justify-between items-baseline gap-4">
                <span className="text-[14px] text-[#6C727B]">적용 환율</span>
                <span className="text-[21px] font-bold text-[#1A1D21] tabular-nums">{rateLine}</span>
              </div>
            ) : null}

            <div className="mt-3.5 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className="px-3.5 py-2 rounded-full border border-[#E2DFD7] bg-white text-[13px] font-semibold text-[#6C727B] hover:border-[#1F4E79] hover:text-[#1F4E79] transition-colors"
                >
                  {q >= 10000 ? `${q / 10000}만` : won(q)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-10 pt-10">
        {status === "error" ? <DataNotice /> : null}

        {chartRate?.history && chartRate.history.length > 1 ? <RateChart rate={chartRate} /> : null}

        <BandAd />

        {/* 02 여행지별 */}
        <section className="flex flex-col gap-6">
          <SectionHead
            no="02"
            eyebrow="Destinations"
            title="여행지별 환율"
            lead="한국인이 자주 가는 지역 통화를 원화 기준으로 모았습니다."
            right={
              regions.length > 1 ? (
                <PillTabs
                  tabs={regions.map((r) => ({ key: r, label: r }))}
                  value={region}
                  onChange={setRegion}
                />
              ) : undefined
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.length === 0
              ? [0, 1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="p-6 rounded-[18px]">
                    <Skeleton className="w-24 h-5" />
                    <Skeleton className="w-32 h-8 mt-4" />
                  </Card>
                ))
              : shown.map((c) => <DestCard key={c.code} rate={c} />)}
          </div>
        </section>

        {/* 03 전체 고시표 + 사이드 광고 */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
          <Card className="rounded-[24px] overflow-hidden">
            <div className="px-5 sm:px-[30px] py-[26px] flex items-center justify-between gap-6 flex-wrap border-b border-[#E2DFD7]">
              <SectionHead
                no="03"
                eyebrow="All currencies"
                title="전체 통화 고시표"
                lead={rates.length ? `${rates.length}개 통화 · 매매기준율 기준` : undefined}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="통화명 또는 코드 검색"
                aria-label="통화 검색"
                className="w-full sm:w-[260px] border border-[#CFCBC1] rounded-[11px] px-3.5 py-[11px] text-[14px] text-[#1A1D21] outline-none focus:border-[#1F4E79]"
              />
            </div>
            <RateTable rows={tableRows} />
          </Card>

          <div className="hidden lg:block sticky top-[90px]">
            <BoxAd />
          </div>
        </section>

        {/* Tip */}
        <Card className="p-7 sm:p-10 rounded-[24px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-8 lg:gap-11 items-center">
            <div>
              <div className="text-[13px] tracking-[0.06em] uppercase text-[#1F4E79] font-bold">
                Tip
              </div>
              <h3 className="mt-3 mb-0 text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-[#1A1D21] leading-[1.3]">
                매매기준율과
                <br />
                실제 환전 금액은 다릅니다
              </h3>
              <a
                href="/fx/banks"
                className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F4E79] text-white text-[15px] font-semibold hover:bg-[#2A6099] transition-colors"
              >
                은행별 실제 환전가 비교 →
              </a>
            </div>
            <div className="grid gap-3.5">
              {[
                ["1", "매매기준율은 기준일 뿐입니다", "은행이 실제로 파는 값은 여기에 환전수수료가 더해진 금액입니다."],
                ["2", "우대율이 실수령액을 가릅니다", "같은 은행이라도 앱·등급·이벤트에 따라 우대율이 달라집니다."],
                ["3", "현찰과 송금은 값이 다릅니다", "현찰은 보관·운송 비용이 붙어 송금 환율보다 불리합니다."],
              ].map(([n, title, body]) => (
                <div key={n} className="flex gap-3.5 items-start">
                  <div className="flex-none w-[26px] h-[26px] rounded-lg bg-[#E9F0F7] text-[#1F4E79] text-[13px] font-extrabold flex items-center justify-center">
                    {n}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-[#1A1D21]">{title}</div>
                    <div className="mt-1 text-[14px] leading-[1.6] text-[#6C727B]">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <BandAd />

        <FooterNote
          text="여행·유학·해외송금에 필요한 환율을 한 화면에서. 매매기준율과 은행별 실제 환전가를 함께 봅니다."
          updatedAt={korDateTime(data?.updatedAt)}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────── 조각 ─────────────────────────── */

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11.5px] font-bold text-white/[0.42] tracking-[0.07em]">{label}</div>
      <div className="mt-[7px] text-[18px] sm:text-[21px] font-extrabold text-white tracking-[-0.02em] tabular-nums">
        {value}
      </div>
    </div>
  );
}

function CurrencySelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { code: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="통화 선택"
      className="border border-[#E2DFD7] outline-none bg-[#F7F6F3] rounded-[10px] px-3 py-2.5 text-[15px] font-bold text-[#1A1D21] cursor-pointer shrink-0"
    >
      {options.map((o) => (
        <option key={o.code} value={o.code}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function DestCard({ rate }: { rate: FxRate }) {
  const per = perUnit(rate);
  const per100k = per ? 100000 / per : null;
  const color = fxColor(rate.change);

  return (
    <Card className="relative p-6 rounded-[18px] overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_16px_32px_-22px_rgba(11,34,51,0.55)] transition-[transform,box-shadow]">
      <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex-none w-9 h-9 rounded-[11px] flex items-center justify-center text-[15px] font-extrabold tracking-[-0.03em]"
            style={{ background: "#E9F0F7", color: "#1F4E79" }}
          >
            {rate.code.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="text-[15.5px] font-bold text-[#1A1D21]">{countryOf(rate.name)}</div>
            <div className="mt-0.5 text-[12.5px] text-[#9CA1A8] font-medium">
              {rate.unit} {unitNameOf(rate.name)}
            </div>
          </div>
        </div>
        <div className="px-2.5 py-[5px] rounded-lg bg-[#F7F6F3] text-[11.5px] font-extrabold text-[#6C727B] tracking-[0.05em]">
          {rate.code}
        </div>
      </div>

      <div className="mt-[18px] flex items-baseline gap-2">
        <div className="text-[28px] sm:text-[32px] font-extrabold text-[#1A1D21] tracking-[-0.03em] tabular-nums">
          {won(rate.rate, 2)}
        </div>
        <div className="text-[14px] text-[#6C727B] font-semibold">원</div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <ChangeBadge change={rate.changePct} />

      </div>

      {per100k ? (
        <div className="mt-4 pt-3.5 border-t border-dashed border-[#E2DFD7] text-[13px] text-[#6C727B] leading-[1.5]">
          10만원 ≈{" "}
          <strong className="text-[#3C424A] font-bold tabular-nums">{won(per100k, 2)}</strong>{" "}
          {rate.code}
        </div>
      ) : null}

    </Card>
  );
}

function RateTable({ rows }: { rows: FxRate[] }) {
  const cols = "grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_100px]";
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div
          className={`grid ${cols} gap-4 px-5 sm:px-[30px] py-3.5 bg-[#F7F6F3] border-b border-[#E2DFD7] text-[12.5px] font-bold text-[#6C727B]`}
        >
          <div>통화</div>
          <div className="text-right">환율</div>
          <div className="text-right">1단위 환산</div>
          <div className="text-right">전일 대비</div>
        </div>
        {rows.length === 0
          ? [0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`grid ${cols} gap-4 px-5 sm:px-[30px] py-4 border-b border-[#E2DFD7]`}
              >
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-20 h-4 justify-self-end" />
                <Skeleton className="w-20 h-4 justify-self-end" />
                <Skeleton className="w-14 h-4 justify-self-end" />
              </div>
            ))
          : rows.map((r) => (
              <div
                key={r.code}
                className={`grid ${cols} gap-4 px-5 sm:px-[30px] py-[15px] border-b border-[#E2DFD7] items-center`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-none px-2 py-1 rounded-[7px] bg-[#F7F6F3] text-[11.5px] font-extrabold text-[#6C727B] tracking-[0.04em]">
                    {r.code}
                  </div>
                  <div className="text-[15px] font-semibold text-[#1A1D21] truncate">
                    {countryOf(r.name)}
                  </div>
                  <div className="text-[12.5px] text-[#9CA1A8] whitespace-nowrap">
                    {r.unit} {unitNameOf(r.name)}
                  </div>
                </div>
                <div className="text-right text-[15px] font-bold text-[#1A1D21] tabular-nums">
                  {won(r.rate, 2)}
                </div>
                <div className="text-right text-[14.5px] text-[#3C424A] tabular-nums">
                  {r.unit === 1 ? "—" : won(perUnit(r), 4)}
                </div>
                <div
                  className="text-right text-[13.5px] font-bold tabular-nums"
                  style={{ color: fxColor(r.changePct) }}
                >
                  {changeText(r.changePct)}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── 추이 차트 ───────────────────────────
 * 시안의 01 섹션. history({date, rate})가 있을 때만 그린다.
 */

const PERIODS = [
  { key: "1w", label: "1주", n: 7 },
  { key: "1m", label: "1개월", n: 30 },
  { key: "6m", label: "6개월", n: 182 },
  { key: "1y", label: "1년", n: 365 },
] as const;
type PeriodKey = (typeof PERIODS)[number]["key"];

export function RateChart({ rate }: { rate: FxRate }) {
  const [period, setPeriod] = useState<PeriodKey>("1m");
  const all = rate.history ?? [];
  const n = PERIODS.find((p) => p.key === period)!.n;
  const pts = all.slice(-n);
  if (pts.length < 2) return null;

  const vals = pts.map((p) => p.rate);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const span = max - min || 1;

  const W = 720;
  const H = 200;
  const pad = 20;
  const coords = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * W;
    const y = pad + (1 - (p.rate - min) / span) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M ${coords.join(" L ")}`;
  const area = `${line} L ${W},${H} L 0,${H} Z`;

  const first = pts[0].rate;
  const last = pts[pts.length - 1].rate;
  const diff = last - first;
  const diffPct = (diff / first) * 100;

  // x축 라벨 5개
  const axis = [0, 0.25, 0.5, 0.75, 1].map((r) => {
    const p = pts[Math.min(pts.length - 1, Math.round(r * (pts.length - 1)))];
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(p.date);
    return m ? `${Number(m[2])}.${Number(m[3])}` : "";
  });

  return (
    <Card className="p-6 sm:p-8 rounded-[24px]">
      <div className="flex items-start justify-between gap-8 flex-wrap">
        <div>
          <div className="text-[13px] tracking-[0.06em] uppercase text-[#9CA1A8] font-bold">
            {rate.code} / KRW{rate.unit !== 1 ? ` (${rate.unit}단위)` : ""}
          </div>
          <div className="mt-2.5 flex items-baseline gap-3 flex-wrap">
            <span className="text-[32px] sm:text-[40px] font-extrabold text-[#1A1D21] tracking-[-0.035em] tabular-nums">
              {won(last, 2)}원
            </span>
            <span
              className="text-[15px] font-bold px-2.5 py-1 rounded-lg tabular-nums"
              style={{
                color: fxColor(diffPct),
                background: diffPct > 0 ? "#E7F2EC" : diffPct < 0 ? "#E9F0F7" : "#F7F6F3",
              }}
            >
              {diffPct > 0 ? "▲" : diffPct < 0 ? "▼" : "—"} {Math.abs(diff).toFixed(2)} (
              {diffPct > 0 ? "+" : ""}
              {diffPct.toFixed(2)}%)
            </span>
            <span className="text-[14px] text-[#9CA1A8]">
              {PERIODS.find((p) => p.key === period)!.label} 변동
            </span>
          </div>
        </div>
        <PillTabs
          tabs={PERIODS.map((p) => ({ key: p.key, label: p.label }))}
          value={period}
          onChange={setPeriod}
        />
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-[190px] sm:h-[230px] mt-6"
        role="img"
        aria-label={`${rate.code} 환율 ${PERIODS.find((p) => p.key === period)!.label} 추이`}
      >
        <defs>
          <linearGradient id="fxArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F4E79" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1F4E79" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 100, 180].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2={W}
            y2={y}
            stroke="#E2DFD7"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={area} fill="url(#fxArea)" />
        <path
          d={line}
          fill="none"
          stroke="#1F4E79"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="flex justify-between mt-2.5 text-[12px] text-[#9CA1A8] tabular-nums">
        {axis.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-[#E2DFD7] grid grid-cols-2 sm:grid-cols-4 gap-5">
        {[
          ["기간 고가", `${won(max, 2)}원`],
          ["기간 저가", `${won(min, 2)}원`],
          ["평균", `${won(avg, 2)}원`],
          ["변동폭", `${won(max - min, 2)}원`],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="text-[12.5px] font-semibold text-[#9CA1A8]">{label}</div>
            <div className="mt-1.5 text-[17px] sm:text-[19px] font-bold text-[#1A1D21] tabular-nums">
              {value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
