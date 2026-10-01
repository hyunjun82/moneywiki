"use client";

/**
 * 환전 계산기 — 은행·우대율을 넣고 외화를 살 때 낼 원화, 팔 때 받을 원화를 계산한다.
 *
 * 위쪽 환율 계산기(CalculatorView 히어로)는 수수료 없는 기준 환율 환산이고, 이것은 은행 창구·앱에서
 * 실제로 오가는 원화다. 공식: 기준 환율 ± 기준 환율 × 수수료율 × (1 − 우대율) (fxCore.bankRate)
 * 수수료율·최대 우대율·인천공항점 수수료율은 은행연합회 외환길잡이 공시값이다.
 */

import { useMemo, useState } from "react";
import { bankRate, won, type FxData } from "./fxCore";
import { SPOKES, airportOf, amountLabel, baseOf, banksOf, median, medianFee, quoteLabel, type CurrencyMeta } from "./fxDerive";
import { Flag } from "./parts";

type Dir = "buy" | "sell";
const COUNTER = "__counter";
const AIRPORT = "__airport";

export default function ExchangeCalc({ data, defaultCode = "USD" }: { data: FxData; defaultCode?: string }) {
  const metas = SPOKES.filter((m) => banksOf(data, m.code).length);
  const [code, setCode] = useState(metas.some((m) => m.code === defaultCode) ? defaultCode : metas[0]?.code ?? "USD");
  const meta = (metas.find((m) => m.code === code) ?? metas[0]) as CurrencyMeta;
  const [dir, setDir] = useState<Dir>("buy");
  const [amountText, setAmountText] = useState(String(meta.sample));
  const banks = banksOf(data, code);
  const airport = airportOf(data, code);
  const [bank, setBank] = useState<string>(() => bestBankName(data, defaultCode));
  const bankRow = banks.find((b) => b.bank === bank);
  const maxPref = bankRow ? (typeof bankRow.maxPref === "number" ? bankRow.maxPref : bankRow.basePref ?? 0) : 0;
  const [pref, setPref] = useState<number>(maxPref);

  const base = baseOf(data, code);
  const amount = Number(amountText.replace(/,/g, ""));
  const valid = Number.isFinite(amount) && amount > 0;
  const cityFee = medianFee(data, code);
  const airportFee = airport.length
    ? median(airport.map((r) => (dir === "buy" ? r.buyFee : r.sellFee ?? r.buyFee)))
    : null;

  /** 고른 창구의 수수료율·우대율 */
  const pick = (() => {
    if (bank === COUNTER) return { fee: cityFee, pref: 0, label: "우대 없는 창구(공시 중간값)" };
    if (bank === AIRPORT) return { fee: airportFee, pref: 0, label: "인천공항 창구(공항점 공시 중간값)" };
    return { fee: bankRow?.feeRate ?? null, pref, label: bankRow?.bank ?? "" };
  })();

  const calc = (fee: number | null, p: number) => {
    if (!base || fee == null || !valid) return null;
    const applied = bankRate(base.perUnit, fee, p, dir);
    return { applied: applied * base.unit, krw: amount * applied, fee: Math.abs(amount * (applied - base.perUnit)) };
  };
  const res = calc(pick.fee, pick.pref);
  const counter = calc(cityFee, 0);
  const air = calc(airportFee, 0);

  // 같은 금액, 은행별(공시 최대 우대 — 팔 때는 우대 없이)
  const list = useMemo(() => {
    if (!base || !valid) return [];
    return banks
      .map((b) => {
        const p = dir === "buy" ? (typeof b.maxPref === "number" ? b.maxPref : b.basePref ?? 0) : 0;
        const applied = bankRate(base.perUnit, b.feeRate, p, dir);
        return { bank: b.bank, pref: p, krw: amount * applied };
      })
      .sort((a, b) => (dir === "buy" ? a.krw - b.krw : b.krw - a.krw));
  }, [banks, base, valid, amount, dir]);

  if (!base || !metas.length) return null;
  const q = quoteLabel(meta, base.unit);
  const better = (x: number | undefined) => (dir === "buy" ? (x ?? 0) : -(x ?? 0));

  const onCode = (c: string) => {
    const m = metas.find((x) => x.code === c)!;
    setCode(c);
    setAmountText(String(m.sample));
    const best = bestBankName(data, c);
    setBank(best);
    const b = banksOf(data, c).find((x) => x.bank === best);
    setPref(b ? (typeof b.maxPref === "number" ? b.maxPref : b.basePref ?? 0) : 0);
  };
  const onBank = (name: string) => {
    setBank(name);
    const b = banks.find((x) => x.bank === name);
    setPref(dir === "sell" ? 0 : b ? (typeof b.maxPref === "number" ? b.maxPref : b.basePref ?? 0) : 0);
  };

  return (
    <section id="exchange" className="scroll-mt-24 bg-white border border-[#E2DFD7] rounded-[24px] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 p-5 sm:p-8">
        {/* 입력 */}
        <div className="flex flex-col gap-4">
          <Field label="통화">
            <div className="flex items-center gap-2.5">
              <Flag code={code} size={28} />
              <select
                value={code}
                onChange={(e) => onCode(e.target.value)}
                className="flex-1 border border-[#CFCBC1] rounded-xl px-3.5 py-3 text-[15px] font-semibold text-[#1A1D21] bg-white outline-none focus:border-[#1F4E79]"
              >
                {metas.map((m) => (
                  <option key={m.code} value={m.code}>
                    {m.keyword} ({m.code})
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="무엇을">
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="환전 방향">
              {(
                [
                  ["buy", `${meta.unitWord} 살 때 (원화 냄)`],
                  ["sell", `${meta.unitWord} 팔 때 (원화 받음)`],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={dir === k}
                  onClick={() => {
                    setDir(k);
                    if (k === "sell") setPref(0);
                    else setPref(maxPref);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-[14px] font-semibold border ${
                    dir === k ? "bg-[#1F4E79] border-[#1F4E79] text-white" : "bg-white border-[#CFCBC1] text-[#3C424A]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>
          <Field label={`금액 (${meta.unitWord})`}>
            <input
              type="text"
              inputMode="numeric"
              value={valid ? won(amount) : amountText}
              onChange={(e) => setAmountText(e.target.value.replace(/[^\d]/g, ""))}
              className="w-full border border-[#CFCBC1] rounded-xl px-3.5 py-3 text-[18px] font-bold text-[#1A1D21] tabular-nums outline-none focus:border-[#1F4E79]"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {meta.chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAmountText(String(c))}
                  className="px-3 py-1.5 rounded-full border border-[#E2DFD7] text-[13px] font-semibold text-[#6C727B] hover:border-[#1F4E79]"
                >
                  {amountLabel(meta, c)}
                </button>
              ))}
            </div>
          </Field>
          <Field label="어디서">
            <select
              value={bank}
              onChange={(e) => onBank(e.target.value)}
              className="w-full border border-[#CFCBC1] rounded-xl px-3.5 py-3 text-[15px] font-semibold text-[#1A1D21] bg-white outline-none focus:border-[#1F4E79]"
            >
              <option value={COUNTER}>우대 없는 창구 (공시 중간값 {cityFee != null ? `${+cityFee.toFixed(2)}%` : ""})</option>
              {airport.length ? (
                <option value={AIRPORT}>인천공항 창구 ({airportFee != null ? `${+airportFee.toFixed(2)}%` : ""})</option>
              ) : null}
              {[...banks]
                .sort((a, b) => a.bank.localeCompare(b.bank, "ko"))
                .map((b) => (
                  <option key={b.bank} value={b.bank}>
                    {b.bank} · 수수료 {+b.feeRate.toFixed(2)}% · 최대 우대 {typeof b.maxPref === "number" ? b.maxPref : b.basePref}%
                  </option>
                ))}
            </select>
          </Field>
          {bankRow ? (
            <Field label={`우대율 ${pref}%${dir === "buy" ? ` (공시 최대 ${maxPref}%)` : ""}`}>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={pref}
                onChange={(e) => setPref(Number(e.target.value))}
                className="w-full accent-[#1F4E79]"
                aria-label="우대율"
              />
              {dir === "sell" ? (
                <p className="m-0 text-[12.5px] text-[#9CA1A8]">팔 때 우대는 은행·앱마다 조건이 달라 공시값이 없어 0%로 둡니다.</p>
              ) : null}
            </Field>
          ) : null}
        </div>

        {/* 결과 */}
        <div className="flex flex-col gap-3">
          <div className="rounded-[18px] bg-[#0B2233] text-white px-5 sm:px-6 py-5">
            <div className="text-[13px] font-semibold text-white/60">
              {pick.label} · {amountLabel(meta, valid ? amount : meta.sample)} {dir === "buy" ? "살 때 낼 원화" : "팔 때 받을 원화"}
            </div>
            <div className="mt-1.5 text-[34px] sm:text-[40px] font-extrabold tracking-[-0.03em] tabular-nums">
              {res ? `${won(res.krw)}원` : "—"}
            </div>
            {res ? (
              <div className="mt-1 text-[13.5px] text-white/70 tabular-nums">
                적용 환율 {q} {won(res.applied, 2)}원 · 그중 수수료 {won(res.fee)}원
              </div>
            ) : null}
          </div>
          {res && counter && bank !== COUNTER ? (
            <Line label="우대 없는 창구와 비교" value={better(counter.krw - res.krw)} dir={dir} />
          ) : null}
          {res && air && bank !== AIRPORT ? <Line label="인천공항 창구와 비교" value={better(air.krw - res.krw)} dir={dir} /> : null}
          <div className="text-[13px] text-[#6C727B] leading-[1.7]">
            기준 환율 {q} {won(base.rate, 2)}원({base.label}, {base.when}). 수수료율·우대율은 은행연합회 외환길잡이 공시값이며 실제 적용 조건은 은행에서
            확인해야 합니다.
          </div>
          {list.length ? (
            <div className="mt-1 border border-[#E2DFD7] rounded-[14px] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#F7F6F3] text-[12.5px] font-bold text-[#6C727B]">
                같은 금액, 은행별 {dir === "buy" ? "낼 원화 (공시 최대 우대)" : "받을 원화 (우대 없음)"}
              </div>
              {list.slice(0, 6).map((r, i) => (
                <button
                  key={r.bank}
                  type="button"
                  onClick={() => onBank(r.bank)}
                  className="w-full flex justify-between gap-3 px-4 py-2.5 border-t border-[#EFEDE8] text-[14px] text-left hover:bg-[#F7F6F3]"
                >
                  <span className="text-[#3C424A]">
                    {i + 1}. {r.bank} <span className="text-[12px] text-[#9CA1A8]">우대 {r.pref}%</span>
                  </span>
                  <span className="font-bold text-[#1A1D21] tabular-nums">{won(r.krw)}원</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function bestBankName(data: FxData, code: string): string {
  const base = baseOf(data, code);
  const banks = banksOf(data, code);
  if (!base || !banks.length) return COUNTER;
  let best = banks[0];
  let bestRate = Infinity;
  for (const b of banks) {
    const p = typeof b.maxPref === "number" ? b.maxPref : b.basePref ?? 0;
    const r = bankRate(base.perUnit, b.feeRate, p, "buy");
    if (r < bestRate) {
      bestRate = r;
      best = b;
    }
  }
  return best.bank;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#6C727B]">{label}</span>
      {children}
    </div>
  );
}

/** "+13,528원 덜 냄" — 양수면 이득 */
function Line({ label, value, dir }: { label: string; value: number; dir: Dir }) {
  const good = value > 0.5;
  const same = Math.abs(value) <= 0.5;
  return (
    <div className="flex justify-between items-baseline gap-3 px-4 py-3 rounded-[14px] border border-[#E2DFD7] bg-white">
      <span className="text-[14px] text-[#5B616A]">{label}</span>
      <span className={`text-[16px] font-extrabold tabular-nums ${same ? "text-[#9CA1A8]" : good ? "text-[#2E7D5B]" : "text-[#B4532A]"}`}>
        {same ? "같음" : `${won(Math.abs(value))}원 ${good ? (dir === "buy" ? "덜 냄" : "더 받음") : dir === "buy" ? "더 냄" : "덜 받음"}`}
      </span>
    </div>
  );
}
