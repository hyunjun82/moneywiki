"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BandAd, Card, DARK_BG, DataNotice, FooterNote, PillTabs, Skeleton } from "./ui";
import { brandOf } from "./bankBrand";
import {
  bankRate,
  korDate,
  korDateTime,
  perUnit,
  unitNameOf,
  useFx,
  won,
  type FxBank,
  type FxRate,
} from "./fxData";

const METHODS = [
  { key: "buy", label: "현찰 살 때" },
  { key: "sell", label: "현찰 팔 때" },
] as const;
type Method = (typeof METHODS)[number]["key"];

const SORTS = [
  { key: "best", label: "유리한 순" },
  { key: "bank", label: "은행순" },
  { key: "pref", label: "우대율순" },
] as const;
type Sort = (typeof SORTS)[number]["key"];

/** 은행환율비교.html 시안을 옮긴 페이지. */
/** ?? [] 는 매 렌더마다 새 배열이라 useMemo 의존성을 깨뜨린다. 한 번만 만든다. */
const NO_RATES: FxRate[] = [];
const NO_BANKS: FxBank[] = [];

export default function BanksView() {
  const { data, status } = useFx();
  const rates = data?.rates ?? NO_RATES;
  const bankBook = data?.banks ?? null;

  const [cur, setCur] = useState("USD");
  const [amountText, setAmountText] = useState("1000000");
  const [method, setMethod] = useState<Method>("buy");
  const [sort, setSort] = useState<Sort>("best");

  // 은행 비교는 은행연합회가 공시한 통화만 가능하다.
  const bankCurrencies = bankBook?.currencies ?? [];
  const curSafe = bankCurrencies.includes(cur) ? cur : (bankCurrencies[0] ?? cur);
  const banks = bankBook?.byCurrency?.[curSafe] ?? NO_BANKS;
  const rate = rates.find((r) => r.code === curSafe) ?? rates[0];
  const amount = Number(amountText.replace(/,/g, ""));
  const validAmount = Number.isFinite(amount) && amount > 0;

  const rows = useMemo(() => {
    if (!rate || banks.length === 0 || !validAmount) return [];
    const perUnitBase = perUnit(rate)!;
    const list = banks.map((b) => {
      // 최대우대율이 공시돼 있으면 그 값을, 없으면 기본우대율을 쓴다.
      const pref = typeof b.maxPref === "number" ? b.maxPref : b.basePref;
      const applied = bankRate(perUnitBase, b.feeRate, pref, method);
      // 살 때: 원화를 내고 외화를 받는다 → 원화 ÷ 적용환율
      // 팔 때: 외화를 내고 원화를 받는다 → 외화 × 적용환율
      const get = method === "buy" ? amount / applied : amount * applied;
      return { bank: b, pref, applied, get };
    });
    // 살 때는 많이 받을수록, 팔 때도 많이 받을수록 유리하다.
    const best = Math.max(...list.map((x) => x.get));
    const worst = Math.min(...list.map((x) => x.get));
    const withDiff = list.map((x) => ({
      ...x,
      isBest: x.get === best,
      diff: x.get - worst,
      barW: best === worst ? 0 : ((x.get - worst) / (best - worst)) * 100,
    }));
    const sorted = [...withDiff];
    if (sort === "best") sorted.sort((a, b) => b.get - a.get);
    if (sort === "bank") sorted.sort((a, b) => a.bank.bank.localeCompare(b.bank.bank, "ko"));
    if (sort === "pref") sorted.sort((a, b) => b.pref - a.pref);
    return sorted;
  }, [rate, banks, amount, validAmount, method, sort]);

  const best = rows.find((r) => r.isBest);
  const gap = rows.length > 1 ? Math.max(...rows.map((r) => r.get)) - Math.min(...rows.map((r) => r.get)) : 0;

  return (
    <div className="flex flex-col gap-0">
      {/* 히어로 */}
      <section style={DARK_BG} className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto flex items-end justify-between gap-10 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] font-extrabold text-[#3DD68C] tracking-[0.1em]">01</span>
              <span className="w-[22px] h-px bg-white/25" />
              <span className="text-[12px] font-bold text-white/50 tracking-[0.1em] uppercase">
                Bank comparison
              </span>
            </div>
            <h1 className="mt-4 mb-0 text-[32px] sm:text-[46px] leading-[1.16] tracking-[-0.035em] font-extrabold text-white">
              같은 100만원, 은행마다
              <br />
              <span className="text-white/55 font-medium">얼마나 차이 날까</span>
            </h1>
            <p className="mt-[18px] mb-0 text-[16px] sm:text-[17.5px] text-white/[0.62] leading-[1.7] max-w-[44ch]">
              은행연합회가 공시하는 환전수수료율과 우대율을 적용해 실제로 받는 금액을 비교합니다.
            </p>
          </div>
          <Link
            href="/fx"
            className="px-5 py-3.5 rounded-xl border border-white/20 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
          >
            ← 환율 계산기로
          </Link>
        </div>
      </section>

      <div className="flex flex-col gap-7 pt-10">
        {status === "error" ? <DataNotice /> : null}

        {!bankBook || banks.length === 0 ? (
          <PendingNotice ready={status === "ready"} />
        ) : (
          <>
            {/* 필터 */}
            <Card className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
              <Field label="환전 통화">
                <select
                  value={curSafe}
                  onChange={(e) => setCur(e.target.value)}
                  className="w-full border border-[#CFCBC1] rounded-xl px-3.5 py-3 text-[15px] font-semibold text-[#1A1D21] bg-white cursor-pointer outline-none focus:border-[#1F4E79]"
                >
                  {rates
                    .filter((r) => bankCurrencies.includes(r.code))
                    .map((r) => (
                      <option key={r.code} value={r.code}>
                        {r.code} {unitNameOf(r.name)}
                      </option>
                    ))}
                </select>
              </Field>
              <Field label={method === "buy" ? "원화 금액" : `${curSafe} 금액`}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountText}
                  onChange={(e) => setAmountText(e.target.value.replace(/[^\d]/g, ""))}
                  className="w-full border border-[#CFCBC1] rounded-xl px-3.5 py-3 text-[15px] font-bold text-[#1A1D21] tabular-nums outline-none focus:border-[#1F4E79]"
                />
              </Field>
              <Field label="환전 방법">
                <PillTabs tabs={METHODS} value={method} onChange={setMethod} />
              </Field>
              <Field label="정렬">
                <PillTabs tabs={SORTS} value={sort} onChange={setSort} />
              </Field>
            </Card>

            {/* 요약 3장 */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1F4E79] text-white rounded-[20px] p-6">
                <div className="text-[12px] font-bold tracking-[0.06em] uppercase opacity-75">
                  Best rate
                </div>
                <div className="mt-3 text-[20px] sm:text-[22px] font-extrabold tracking-[-0.02em]">
                  {best?.bank.bank ?? "—"}
                </div>
                <div className="mt-3.5 text-[28px] sm:text-[34px] font-extrabold tracking-[-0.03em] tabular-nums">
                  {best ? `${won(best.get, 2)} ${method === "buy" ? curSafe : "원"}` : "—"}
                </div>
                <div className="mt-1.5 text-[14px] opacity-80">
                  {best
                    ? method === "buy"
                      ? `원화 ${won(amount)}원으로 살 때 가장 많이 받습니다`
                      : `${curSafe} ${won(amount)}을 팔 때 가장 많이 받습니다`
                    : ""}
                </div>
              </div>
              <Card className="p-6">
                <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#9CA1A8]">
                  최저 대비 차액
                </div>
                <div className="mt-3 text-[28px] sm:text-[34px] font-extrabold text-[#2E7D5B] tracking-[-0.03em] tabular-nums">
                  {won(gap, 2)}
                </div>
                <div className="mt-2 text-[14px] text-[#6C727B] leading-[1.5]">
                  은행을 바꾸면 생기는 차이입니다. 단위는 {method === "buy" ? curSafe : "원"}입니다.
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-[#9CA1A8]">
                  매매기준율
                </div>
                <div className="mt-3 text-[28px] sm:text-[34px] font-extrabold text-[#1A1D21] tracking-[-0.03em] tabular-nums">
                  {rate ? won(rate.rate, 2) : "—"}
                </div>
                <div className="mt-2 text-[14px] text-[#6C727B] leading-[1.5]">
                  {rate ? `${rate.unit} ${unitNameOf(rate.name)} 기준 · 우대 적용 전` : ""}
                </div>
              </Card>
            </section>

            {/* 순위표 */}
            <Card className="rounded-[20px] overflow-hidden">
              <BankTable rows={rows} />
              <div className="px-5 sm:px-[26px] py-4 text-[13px] text-[#9CA1A8] leading-relaxed border-t border-[#E2DFD7]">
                환전수수료율과 우대율은{" "}
                {bankBook?.sourceUrl ? (
                  <a
                    href={bankBook.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[#1F4E79] underline underline-offset-2"
                  >
                    {bankBook.source}
                  </a>
                ) : (
                  "전국은행연합회 외환길잡이"
                )}{" "}
                공시값입니다. 은행별 기준일이 다르며 등급·이벤트에 따라 실제 적용 우대율은 달라질 수
                있습니다. 최대우대율이 공시된 은행은 그 값을 적용해 계산했습니다.
              </div>
            </Card>

            <BandAd />

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ["우대율은 조건부입니다", "앱 전용·거래 실적·이벤트 기간에 따라 달라집니다. 공시된 최대우대율이 항상 적용되는 것은 아닙니다."],
                ["현찰과 송금은 다릅니다", "이 비교는 현찰 기준입니다. 해외송금은 수수료 체계가 달라 별도로 확인해야 합니다."],
                ["금액이 클수록 차이가 큽니다", "우대율 차이는 정률이라 환전 금액이 커질수록 은행 간 격차가 그대로 커집니다."],
              ].map(([title, body]) => (
                <Card key={title} className="p-6 rounded-[18px]">
                  <div className="text-[15px] font-bold text-[#1A1D21]">{title}</div>
                  <div className="mt-2 text-[14px] leading-[1.65] text-[#6C727B]">{body}</div>
                </Card>
              ))}
            </section>
          </>
        )}

        <FooterNote
          text="은행별 환전수수료율·우대율은 은행연합회 외환길잡이 공시를 따릅니다. 실제 적용 금액은 거래 시점에 은행에서 확인하세요."
          updatedAt={korDateTime(data?.updatedAt)}
        />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <span className="text-[13px] font-semibold text-[#6C727B]">{label}</span>
      {children}
    </div>
  );
}

/**
 * 우대율 데이터가 아직 없을 때.
 * "○○은행이 최저가"는 근거 없이 단정하면 안 되는 문장이라 표를 아예 그리지 않는다.
 */
function PendingNotice({ ready }: { ready: boolean }) {
  if (!ready) {
    return (
      <Card className="p-8 flex flex-col gap-3">
        <Skeleton className="w-40 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </Card>
    );
  }
  return (
    <Card className="p-8 sm:p-10 text-center">
      <p className="m-0 text-[17px] font-bold text-[#1A1D21]">은행별 비교를 준비하고 있습니다</p>
      <p className="mt-3 mb-0 text-[15px] text-[#6C727B] leading-[1.7] max-w-[52ch] mx-auto">
        은행연합회가 공시하는 환전수수료율과 우대율을 확인한 뒤 공개합니다. 확인되지 않은 우대율로
        &ldquo;어느 은행이 유리하다&rdquo;고 표시하지 않습니다.
      </p>
      <Link
        href="/fx"
        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F4E79] text-white text-[15px] font-semibold hover:bg-[#2A6099] transition-colors"
      >
        환율 계산기 보기 →
      </Link>
    </Card>
  );
}

function BankTable({
  rows,
}: {
  rows: { bank: FxBank; pref: number; applied: number; get: number; isBest: boolean; diff: number; barW: number }[];
}) {
  const cols = "grid-cols-[minmax(0,1.6fr)_90px_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]";
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div
          className={`grid ${cols} gap-4 px-5 sm:px-[26px] py-4 border-b border-[#E2DFD7] bg-[#F7F6F3] text-[12.5px] font-bold text-[#6C727B]`}
        >
          <div>은행</div>
          <div className="text-right">우대율</div>
          <div className="text-right">적용 환율</div>
          <div className="text-right">받는 금액</div>
          <div className="text-right">최저 대비</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.bank.bank}
            className={`grid ${cols} gap-4 px-5 sm:px-[26px] py-[18px] border-b border-[#E2DFD7] items-center ${
              r.isBest ? "bg-[#E9F0F7]/60" : ""
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className="flex-none w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-[12px] font-extrabold tracking-[-0.03em] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                style={{ background: brandOf(r.bank.bank).bg, color: brandOf(r.bank.bank).fg }}
              >
                {brandOf(r.bank.bank).mark}
              </div>
              <div className="min-w-0">
                <div className="text-[15.5px] font-bold text-[#1A1D21] flex items-center gap-2">
                  {r.bank.bank}
                  {r.isBest ? (
                    <span className="px-[7px] py-[3px] rounded-md bg-[#E9F0F7] text-[#1F4E79] text-[11px] font-extrabold">
                      유리
                    </span>
                  ) : null}
                </div>
                <div className="mt-[3px] text-[12.5px] text-[#9CA1A8] truncate">
                  {r.bank.note ?? ""}
                  {r.bank.asOf ? ` · ${korDate(r.bank.asOf)} 기준` : ""}
                </div>
              </div>
            </div>
            <div className="text-right text-[15px] font-bold text-[#3C424A] tabular-nums">
              {r.pref}%
              {r.bank.maxPrefText && r.bank.maxPrefText !== `${r.pref}%` ? (
                <div className="text-[11.5px] font-medium text-[#9CA1A8]">
                  {r.bank.maxPrefText}
                </div>
              ) : null}
            </div>
            <div className="text-right text-[15px] text-[#3C424A] tabular-nums">
              {won(r.applied, 2)}
            </div>
            <div className="text-right text-[16px] sm:text-[17px] font-extrabold text-[#1A1D21] tabular-nums">
              {won(r.get, 2)}
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="flex-1 max-w-[110px] h-1.5 rounded-full bg-[#E7E4DD] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${r.barW}%`, background: r.isBest ? "#1F4E79" : "#9CA1A8" }}
                />
              </div>
              <div className="w-[70px] text-right text-[13.5px] font-bold text-[#2E7D5B] tabular-nums">
                {r.diff > 0 ? `+${won(r.diff, 2)}` : "—"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
