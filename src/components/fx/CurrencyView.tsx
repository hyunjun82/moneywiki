"use client";

/**
 * /fx/<통화> — 통화 한 종의 오늘 환율·은행별 환전 수수료·인천공항·원화 환산·1년 흐름·FAQ.
 *
 * 서버가 빌드 때 스냅숏으로 한 번 그리고(HTML 에 숫자), 브라우저가 최신 fx.json 으로 다시 그린다.
 * 숫자 문장은 전부 fxDerive 에서 온다 — 메타 설명·FAQ JSON-LD 와 같은 함수다.
 */

import { useMemo, useState } from "react";
import { BandAd, ChangeBadge, DataNotice } from "./ui";
import { brandOf } from "./bankBrand";
import { asOfLabel, korDate, useFx, won, type FxData, type HistoryPoint } from "./fxData";
import {
  airportCompare,
  amountLabel,
  baseOf,
  bestLabel,
  counterPay,
  counterSell,
  currencyFaq,
  feeRange,
  josa,
  leadText,
  metaBySlug,
  quoteLabel,
  rangeStats,
  rankBanks,
  withLatest,
} from "./fxDerive";
import { CurrencyChips, Crumbs, FaqList, H2, LineChart, SourceNote, TableWrap, td, th } from "./parts";

const KRW_ROWS = [100_000, 500_000, 1_000_000, 3_000_000];

export default function CurrencyView({
  slug,
  initial,
  history,
}: {
  slug: string;
  initial: FxData;
  history: HistoryPoint[];
}) {
  const meta = metaBySlug(slug)!;
  const { data } = useFx(initial);
  const d = data ?? initial;
  const [amount, setAmount] = useState(meta.sample);

  // 기준 = 수출입은행 고시가 있으면 그것, 없으면 시장 중간환율 (fxDerive.baseOf)
  const base = baseOf(d, meta.code);
  const ranked = useMemo(() => rankBanks(d, meta.code, amount), [d, meta.code, amount]);
  const rateRow = base?.rateRow;
  const series = useMemo(() => withLatest(history, rateRow, d.updatedAt), [history, rateRow, d.updatedAt]);

  if (!base) return <DataNotice />;

  const counter = counterPay(d, meta.code, amount);
  const sell = counterSell(d, meta.code);
  const ap = airportCompare(d, meta.code, amount);
  const stats = rangeStats(series);
  const faq = currencyFaq(d, meta);
  const unit = base.unit;
  const q = quoteLabel(meta, unit);
  const best = ranked[0];
  const chipRates = Object.fromEntries((d.rates ?? []).map((r) => [r.code, { rate: r.rate, unit: r.unit }]));
  const lead = leadText(d, meta);

  return (
    <div className="flex flex-col gap-10 pt-6 sm:pt-8">
      {/* 머리 */}
      <header className="flex flex-col gap-3">
        <Crumbs items={[{ name: "오늘 환율", href: "/fx" }, { name: meta.keyword }]} />
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21] leading-tight">
          {meta.h1}
        </h1>
        <p className="m-0 text-[16px] sm:text-[17px] leading-[1.75] text-[#3C424A] max-w-[70ch]">{lead}</p>
      </header>

      <RateCard d={d} slug={slug} />

      {/* 은행별 */}
      <section className="flex flex-col gap-4">
        <H2
          id="banks"
          lead={`은행연합회가 공시한 은행 ${ranked.length}곳의 ${meta.short} 환전 수수료율과 최대 우대율로, ${josa(
            amountLabel(meta, amount),
            "을를"
          )} 현찰로 살 때 낼 원화를 계산했습니다.`}
        >
          은행별 {meta.short} 환율 · 환전 수수료 비교
        </H2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="환전 금액">
          {meta.chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setAmount(c)}
              aria-pressed={c === amount}
              className={`px-4 py-2 rounded-full text-[14px] font-semibold border transition-colors ${
                c === amount
                  ? "bg-[#1F4E79] border-[#1F4E79] text-white"
                  : "bg-white border-[#CFCBC1] text-[#3C424A] hover:border-[#1F4E79]"
              }`}
            >
              {amountLabel(meta, c)}
            </button>
          ))}
        </div>
        {ranked.length ? (
          <>
            <p className="m-0 text-[15.5px] leading-[1.7] text-[#1A1D21]">
              앱 최대 우대로 가장 적게 내는 곳은 <b>{bestLabel(ranked)}</b>({won(best.pay)}원)입니다.
              {counter ? ` 우대 없이 창구에서 사면 ${won(counter.pay)}원이라 ${won(counter.pay - best.pay)}원 차이입니다.` : ""}
            </p>
            <TableWrap min={640}>
              <thead>
                <tr>
                  <th className={th}>은행</th>
                  <th className={`${th} text-right`}>수수료율</th>
                  <th className={`${th} text-right`}>최대 우대</th>
                  <th className={`${th} text-right`}>우대 후 살 때 ({q})</th>
                  <th className={`${th} text-right`}>낼 원화</th>
                  <th className={`${th} text-right`}>최저보다</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((r) => {
                  const brand = brandOf(r.bank.bank);
                  return (
                    <tr key={r.bank.bank} className={r.isBest ? "bg-[#E9F0F7]/50" : ""}>
                      <td className={td}>
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[10.5px] font-extrabold"
                            style={{ background: brand.bg, color: brand.fg }}
                          >
                            {brand.mark}
                          </span>
                          <span className="font-semibold text-[#1A1D21]">{r.bank.bank}</span>
                          {r.bank.asOf ? <span className="text-[12px] text-[#9CA1A8]">{asOfLabel(r.bank.asOf, d.updatedAt)}</span> : null}
                        </span>
                      </td>
                      <td className={`${td} text-right`}>{+r.bank.feeRate.toFixed(2)}%</td>
                      <td className={`${td} text-right`}>{r.pref}%</td>
                      <td className={`${td} text-right`}>{won(r.applied, 2)}</td>
                      <td className={`${td} text-right font-bold text-[#1A1D21]`}>{won(r.pay)}원</td>
                      <td className={`${td} text-right ${r.diff >= 0.5 ? "text-[#B4532A]" : "text-[#9CA1A8]"}`}>
                        {r.diff >= 0.5 ? `+${won(r.diff)}원` : "최저"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableWrap>
            <p className="m-0 text-[13px] leading-[1.7] text-[#6C727B]">
              최대 우대율은 앱 환전·금액·거래 실적 같은 조건이 붙은 공시값입니다. 은행 이름 옆 날짜는 그 은행의 공시
              기준일입니다. 거래 전에 은행 앱이나 창구에서 실제 적용 우대율을 확인해야 합니다.
            </p>
          </>
        ) : (
          <p className="m-0 text-[15px] text-[#6C727B]">이 통화의 은행 공시를 아직 받지 못했습니다.</p>
        )}
      </section>

      <BandAd />

      {/* 인천공항 */}
      {ap ? (
        <section className="flex flex-col gap-4">
          <H2
            id="airport"
            lead={`인천공항점 ${ap.rows.length}곳(${ap.rows.map((x) => x.bank).join("·")})이 은행연합회에 따로 공시한 ${meta.short} 수수료율입니다. 공항점은 우대 없이 계산했습니다.`}
          >
            인천공항에서 {meta.short} 환전하면
          </H2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Stat
              label={`공항 창구 · ${feeRange(ap.minBuy, ap.maxBuy)}`}
              value={`${won(ap.airportFee)}원`}
              note={`${amountLabel(meta, amount)} 수수료`}
              tone="warn"
            />
            {ap.cityFee != null && ap.cityFeeRate != null ? (
              <Stat label={`시내 창구 · ${+ap.cityFeeRate.toFixed(2)}%`} value={`${won(ap.cityFee)}원`} note="공시 수수료율 중간값, 우대 없음" />
            ) : null}
            {ap.appFee != null ? (
              <Stat label="앱 최대 우대" value={`${won(ap.appFee)}원`} note={bestLabel(ranked)} tone="good" />
            ) : null}
          </div>
          {ap.times ? (
            <p className="m-0 text-[15.5px] leading-[1.7] text-[#1A1D21]">
              공항점 살 때 수수료율은 시내 창구의 약 <b>{ap.times.toFixed(1)}배</b>입니다.
              {ap.midSell != null ? ` 남은 ${josa(meta.short, "을를")} 공항에서 팔 때 수수료율은 ${+ap.midSell.toFixed(2)}%입니다.` : ""}
            </p>
          ) : null}
          <TableWrap min={480}>
            <thead>
              <tr>
                <th className={th}>은행 · 지점</th>
                <th className={`${th} text-right`}>살 때</th>
                <th className={`${th} text-right`}>팔 때</th>
                <th className={`${th} text-right`}>공시 기준일</th>
              </tr>
            </thead>
            <tbody>
              {ap.rows.map((r) => (
                <tr key={r.bank + (r.branch ?? "")}>
                  <td className={td}>
                    <span className="font-semibold text-[#1A1D21]">{r.bank}</span> {r.branch ?? ""}
                  </td>
                  <td className={`${td} text-right`}>{+r.buyFee.toFixed(2)}%</td>
                  <td className={`${td} text-right`}>{r.sellFee != null ? `${+r.sellFee.toFixed(2)}%` : ""}</td>
                  <td className={`${td} text-right`}>{asOfLabel(r.asOf, d.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <a href="/fx/airport" className="self-start text-[14.5px] font-semibold text-[#1F4E79] hover:underline underline-offset-2">
            인천공항 환전 수수료, 통화 15종 비교 →
          </a>
        </section>
      ) : null}

      {/* 원화 → 외화 */}
      {counter && best ? (
        <section className="flex flex-col gap-4">
          <H2 id="krw" lead={`기준 환율 ${q} ${won(base.rate, 2)}원에 수수료를 붙여, 원화로 살 수 있는 ${josa(meta.short, "을를")} 계산했습니다.`}>
            원화로 바꾸면 {meta.short} 얼마
          </H2>
          <TableWrap min={420}>
            <thead>
              <tr>
                <th className={th}>원화</th>
                <th className={`${th} text-right`}>창구 · 우대 없음</th>
                <th className={`${th} text-right`}>앱 최대 우대</th>
              </tr>
            </thead>
            <tbody>
              {KRW_ROWS.map((krw) => (
                <tr key={krw}>
                  <td className={`${td} font-semibold text-[#1A1D21]`}>{won(krw / 10000)}만 원</td>
                  <td className={`${td} text-right`}>
                    {won(Math.floor(krw / (counter.applied / unit)))}
                    {meta.unitWord}
                  </td>
                  <td className={`${td} text-right font-bold text-[#1A1D21]`}>
                    {won(Math.floor(krw / (best.applied / unit)))}
                    {meta.unitWord}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="m-0 text-[13px] text-[#6C727B]">
            현찰 팔 때(우대 없음)는 {q} {sell ? won(sell, 2) : ""}원입니다. 금액 칸에 직접 넣어 보려면{" "}
            <a href="/fx/calculator" className="text-[#1F4E79] font-semibold hover:underline underline-offset-2">
              환율 계산기
            </a>
            를 쓰면 됩니다.
          </p>
        </section>
      ) : null}

      {/* 흐름 */}
      {stats ? (
        <section className="flex flex-col gap-4">
          <H2
            id="trend"
            lead={`${stats.spanLabel} 최저 ${won(stats.low.rate, 2)}원(${korDate(stats.low.date)})과 최고 ${won(
              stats.high.rate,
              2
            )}원(${korDate(stats.high.date)}) 사이에서 지금 값은 아래에서 ${Math.round(stats.pos * 100)}% 자리에 있습니다. 지난 흐름이 앞으로의 값을 알려 주지는 않습니다.`}
          >
            {stats.spanLabel} {meta.short} 환율 흐름
          </H2>
          <div className="bg-white border border-[#E2DFD7] rounded-[16px] p-4 sm:p-5">
            <LineChart series={series} label={`${meta.keyword} ${stats.spanLabel} 그래프`} />
            <div className="mt-3 h-2 rounded-full bg-[#E7E4DD] relative" aria-hidden>
              <span
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#1A1D21] border-2 border-white"
                style={{ left: `calc(${(stats.pos * 100).toFixed(1)}% - 7px)` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[12px] text-[#6C727B] tabular-nums">
              <span>최저 {won(stats.low.rate, 2)}</span>
              <span>최고 {won(stats.high.rate, 2)}</span>
            </div>
          </div>
          {stats.changes.length ? (
            <TableWrap min={420}>
              <thead>
                <tr>
                  <th className={th}>비교 시점</th>
                  <th className={`${th} text-right`}>그때 ({q})</th>
                  <th className={`${th} text-right`}>지금과 차이</th>
                </tr>
              </thead>
              <tbody>
                {stats.changes.map((c) => (
                  <tr key={c.label}>
                    <td className={td}>
                      {c.label} <span className="text-[12px] text-[#9CA1A8]">{korDate(c.from.date)}</span>
                    </td>
                    <td className={`${td} text-right`}>{won(c.from.rate, 2)}원</td>
                    <td className={`${td} text-right font-semibold`} style={{ color: c.diff > 0 ? "#2E7D5B" : c.diff < 0 ? "#2A6099" : undefined }}>
                      {c.diff > 0 ? "+" : ""}
                      {won(c.diff, 2)}원 ({c.pct > 0 ? "+" : ""}
                      {c.pct.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          ) : null}
          <p className="m-0 text-[13px] text-[#6C727B]">그래프와 표는 시장 중간환율(Yahoo Finance) 일별 종가입니다.</p>
        </section>
      ) : null}

      <BandAd />

      {/* FAQ */}
      {faq.length ? (
        <section className="flex flex-col gap-4">
          <H2 id="faq">{meta.short} 환전, 자주 묻는 질문</H2>
          <FaqList items={faq} />
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <H2>다른 통화 환율</H2>
        <CurrencyChips current={meta.code} rates={chipRates} />
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] font-semibold">
          <a href="/fx" className="text-[#1F4E79] hover:underline underline-offset-2">오늘 환율 전체 →</a>
          <a href="/fx/banks" className="text-[#1F4E79] hover:underline underline-offset-2">은행별 환전 수수료 비교 →</a>
          <a href="/fx/calculator" className="text-[#1F4E79] hover:underline underline-offset-2">환율 계산기 →</a>
          <a href="/fx/airport" className="text-[#1F4E79] hover:underline underline-offset-2">인천공항 환전 수수료 →</a>
        </div>
      </section>

      <Sources d={d} />
    </div>
  );
}

function RateCard({ d, slug }: { d: FxData; slug: string }) {
  const meta = metaBySlug(slug)!;
  // 큰 숫자 = baseOf (수출입은행 고시가 있으면 그것) — 첫 문단·FAQ 와 같은 값
  const base = baseOf(d, meta.code)!;
  const r = base.rateRow;
  const ranked = rankBanks(d, meta.code, meta.sample);
  const counter = counterPay(d, meta.code, meta.sample);
  const sell = counterSell(d, meta.code);
  const q = quoteLabel(meta, r.unit);
  return (
    <section className="bg-white border border-[#E2DFD7] rounded-[22px] overflow-hidden">
      <div className="p-5 sm:p-7 flex flex-col gap-2">
        <div className="text-[13px] font-bold text-[#1F4E79]">
          {meta.country} {meta.short} · {base.label} · {base.when}
        </div>
        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-[44px] sm:text-[56px] font-extrabold tracking-[-0.04em] text-[#1A1D21] tabular-nums leading-none">
            {won(base.rate, 2)}
          </span>
          <span className="text-[18px] font-bold text-[#3C424A] pb-1.5">원 / {q}</span>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap text-[14px] text-[#6C727B]">
          <ChangeBadge change={r.changePct} />
          {r.prevClose ? (
            <span className="tabular-nums">
              전일 종가({korDate(r.prevClose.date)} {won(r.prevClose.rate, 2)}원) 대비{" "}
              {typeof r.change === "number" ? `${r.change > 0 ? "+" : ""}${won(r.change, 2)}원` : ""}
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[#E2DFD7] divide-y sm:divide-y-0 sm:divide-x divide-[#E2DFD7]">
        <Cell label="현찰 살 때 · 우대 없음" value={counter ? won(counter.applied, 2) : ""} note={counter ? `공시 수수료율 중간값 ${+counter.feeRate.toFixed(2)}%` : ""} />
        <Cell label="현찰 팔 때 · 우대 없음" value={sell ? won(sell, 2) : ""} note="남은 외화를 원화로 바꿀 때" />
        <Cell
          label="앱 최대 우대 · 살 때"
          value={ranked[0] ? won(ranked[0].applied, 2) : ""}
          note={ranked[0] ? bestLabel(ranked) : ""}
        />
      </div>
      <div className="px-5 sm:px-7 py-3.5 border-t border-[#E2DFD7] flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
        <a href="#banks" className="text-[#1F4E79] hover:underline underline-offset-2">은행별 비교 ↓</a>
        <a href="#airport" className="text-[#1F4E79] hover:underline underline-offset-2">인천공항 ↓</a>
        <a href="#trend" className="text-[#1F4E79] hover:underline underline-offset-2">환율 흐름 ↓</a>
        <a href="/fx/calculator" className="text-[#1F4E79] hover:underline underline-offset-2">계산기 →</a>
      </div>
    </section>
  );
}

function Cell({ label, value, note }: { label: string; value: string; note?: string }) {
  if (!value) return null;
  return (
    <div className="px-5 sm:px-7 py-4">
      <div className="text-[13px] font-semibold text-[#6C727B]">{label}</div>
      <div className="mt-1 text-[22px] font-extrabold text-[#1A1D21] tabular-nums tracking-[-0.02em]">{value}원</div>
      {note ? <div className="mt-0.5 text-[12.5px] text-[#9CA1A8]">{note}</div> : null}
    </div>
  );
}

function Stat({ label, value, note, tone }: { label: string; value: string; note?: string; tone?: "warn" | "good" }) {
  const color = tone === "warn" ? "#B4532A" : tone === "good" ? "#2E7D5B" : "#1A1D21";
  return (
    <div className="bg-white border border-[#E2DFD7] rounded-[16px] px-5 py-4">
      <div className="text-[13px] font-semibold text-[#6C727B]">{label}</div>
      <div className="mt-1 text-[24px] font-extrabold tabular-nums tracking-[-0.02em]" style={{ color }}>
        {value}
      </div>
      {note ? <div className="mt-0.5 text-[12.5px] text-[#9CA1A8]">{note}</div> : null}
    </div>
  );
}

function Sources({ d }: { d: FxData }) {
  return (
    <SourceNote>
      기준 환율: {d.official?.items?.length ? "한국수출입은행 매매기준율(고시 통화), 그 밖의 통화는 " : ""}
      {d.source ?? "시장 중간환율"}, {d.updatedAt ? `${korDate(d.updatedAt)} ${d.updatedAt.slice(11, 16)}` : ""} 갱신.
      은행별 환전 수수료율·우대율과 인천공항점 수수료율:{" "}
      <a href={d.banks?.sourceUrl ?? "https://exchange.kfb.or.kr"} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
        전국은행연합회 외환길잡이
      </a>{" "}
      공시(은행별 기준일이 다르며 최신 {korDate(d.banks?.latestAsOf ?? undefined)}). 실제 적용 환율은 거래 시점 은행 고시와 우대
      조건에 따릅니다.
    </SourceNote>
  );
}
