"use client";

/**
 * /fx — 오늘 환율 조회 허브. 통화 15종을 한 표로 보여 주고 통화별 페이지(스포크)로 보낸다.
 * 서버가 스냅숏으로 굽고, 브라우저가 최신 fx.json 으로 다시 그린다.
 */

import { BandAd, ChangeBadge, DataNotice } from "./ui";
import { korDate, useFx, won, type FxData } from "./fxData";
import {
  SPOKES,
  airportCompare,
  baseOf,
  bestLabel,
  counterPay,
  counterSell,
  hubFaq,
  quoteLabel,
  rankBanks,
} from "./fxDerive";
import { FaqList, Flag, H2, SourceNote, Spark } from "./parts";

const MAIN = ["USD", "JPY", "EUR", "VND"];

/** 표 한 줄 — 휴대폰: 통화 · 30일 그래프 · 환율 / md 이상: 살 때·팔 때·우대 최저까지 */
const ROW =
  "grid items-center gap-3 px-4 grid-cols-[minmax(0,1fr)_84px_auto] md:grid-cols-[minmax(0,1.4fr)_96px_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.1fr)]";

export default function HubView({
  initial,
  latestNews,
}: {
  initial: FxData;
  latestNews?: { date: string; title: string } | null;
}) {
  const { data } = useFx(initial);
  const d = data ?? initial;
  const usd = baseOf(d, "USD");
  if (!usd) return <DataNotice />;

  const rows = SPOKES.map((m) => {
    const base = baseOf(d, m.code);
    if (!base) return null;
    const ranked = rankBanks(d, m.code, m.sample);
    return {
      m,
      base,
      buy: counterPay(d, m.code, m.sample)?.applied ?? null,
      sell: counterSell(d, m.code),
      best: ranked[0] ? { name: bestLabel(ranked), applied: ranked[0].applied } : null,
    };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  const jpy = baseOf(d, "JPY");
  const eur = baseOf(d, "EUR");
  const usdMeta = SPOKES[0];
  const ranked = rankBanks(d, "USD", usdMeta.sample);
  const counter = counterPay(d, "USD", usdMeta.sample);
  const ap = airportCompare(d, "USD", usdMeta.sample);
  const faq = hubFaq(d);

  return (
    <div className="flex flex-col gap-10 pt-6 sm:pt-8">
      <header className="flex flex-col gap-3">
        <div className="text-[13px] font-bold text-[#1F4E79]">
          {usd.when} 기준 · {usd.label}
        </div>
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21] leading-tight">
          오늘 환율 조회 · 환전 시세
        </h1>
        <p className="m-0 text-[16px] sm:text-[17px] leading-[1.75] text-[#3C424A] max-w-[70ch]">
          {usd.when} 기준 달러는 1달러 {won(usd.rate, 2)}원
          {usd.rateRow.prevClose && typeof usd.rateRow.change === "number"
            ? `으로 전일 종가보다 ${won(Math.abs(usd.rateRow.change), 2)}원 ${usd.rateRow.change > 0 ? "올랐습니다" : usd.rateRow.change < 0 ? "내렸습니다" : "같습니다"}`
            : "입니다"}
          .{jpy ? ` 엔화는 100엔 ${won(jpy.rate, 2)}원,` : ""}
          {eur ? ` 유로는 1유로 ${won(eur.rate, 2)}원입니다.` : ""} 통화 {rows.length}종의 현찰 살 때·팔 때와 은행별 환전
          수수료를 아래에 모았습니다.
        </p>
      </header>

      {latestNews ? (
        <a
          href={`/fx/news/${latestNews.date}`}
          className="flex items-center gap-3 bg-white border border-[#E2DFD7] rounded-[16px] px-5 py-4 hover:border-[#1F4E79] transition-colors"
        >
          <span className="shrink-0 px-2 py-1 rounded-md bg-[#0B2233] text-white text-[12px] font-bold">환율 기사</span>
          <span className="text-[15px] font-semibold text-[#1A1D21] min-w-0 truncate">{latestNews.title}</span>
          <span className="ml-auto shrink-0 text-[#1F4E79] font-semibold text-[14px]">읽기 →</span>
        </a>
      ) : null}

      {/* 주요 통화 */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MAIN.map((code) => {
          const row = rows.find((x) => x.m.code === code);
          if (!row) return null;
          return (
            <a
              key={code}
              href={`/fx/${row.m.slug}`}
              className="bg-white border border-[#E2DFD7] rounded-[18px] p-4 sm:p-5 flex flex-col gap-1.5 hover:border-[#1F4E79] transition-colors min-w-0"
            >
              <span className="flex items-center gap-2 text-[14px] font-bold text-[#3C424A]">
                <Flag code={code} size={16} />
                {row.m.keyword}
              </span>
              <span className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em] text-[#1A1D21] tabular-nums leading-none">
                {won(row.base.rate, 2)}
              </span>
              <span className="text-[12.5px] text-[#6C727B]">원 / {quoteLabel(row.m, row.base.unit)}</span>
              <span className="flex items-center justify-between gap-2">
                <ChangeBadge change={row.base.rateRow.changePct} />
                <Spark points={row.base.rateRow.history} width={72} height={26} />
              </span>
            </a>
          );
        })}
      </section>

      {/* 전체 표 */}
      <section className="flex flex-col gap-4">
        <H2
          id="all"
          lead="현찰 살 때·팔 때는 기준 환율에 은행 공시 수수료율 중간값을 붙인 값(우대 없음)이고, 오른쪽 끝은 앱 최대 우대로 살 때 가장 싼 은행입니다."
        >
          통화별 오늘 환율 {rows.length}종
        </H2>
        <div className="bg-white border border-[#E2DFD7] rounded-[16px] overflow-hidden">
          <div className={`${ROW} hidden md:grid bg-[#F7F6F3] border-b border-[#E2DFD7] text-[12.5px] font-bold text-[#6C727B] py-3`}>
            <span>통화</span>
            <span>30일 흐름</span>
            <span className="text-right">기준 환율 · 전일 대비</span>
            <span className="text-right">현찰 살 때</span>
            <span className="text-right">현찰 팔 때</span>
            <span className="text-right">앱 우대 최저</span>
          </div>
          {rows.map(({ m, base, buy, sell, best }) => (
            <a
              key={m.code}
              href={`/fx/${m.slug}`}
              className={`${ROW} py-3 border-b border-[#EFEDE8] last:border-b-0 hover:bg-[#F7F6F3] transition-colors`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Flag code={m.code} size={20} />
                <span className="flex flex-col min-w-0">
                  <span className="text-[15px] font-bold text-[#1A1D21] truncate">{m.keyword}</span>
                  <span className="text-[12px] text-[#9CA1A8] truncate">
                    {m.code} · {quoteLabel(m, base.unit)}
                  </span>
                </span>
              </span>
              <span className="flex justify-center md:justify-start">
                <Spark points={base.rateRow.history} width={84} height={28} />
              </span>
              <span className="flex flex-col items-end gap-1">
                <span className="text-[16px] font-extrabold text-[#1A1D21] tabular-nums">{won(base.rate, 2)}</span>
                <ChangeBadge change={base.rateRow.changePct} />
              </span>
              <span className="hidden md:block text-right text-[14px] text-[#3C424A] tabular-nums">{buy ? won(buy, 2) : ""}</span>
              <span className="hidden md:block text-right text-[14px] text-[#3C424A] tabular-nums">{sell ? won(sell, 2) : ""}</span>
              <span className="hidden md:flex flex-col items-end text-[14px] text-[#3C424A] tabular-nums min-w-0">
                {best ? (
                  <>
                    <span>{won(best.applied, 2)}</span>
                    <span className="text-[12px] text-[#9CA1A8] truncate max-w-full">{best.name}</span>
                  </>
                ) : null}
              </span>
            </a>
          ))}
        </div>
        <p className="m-0 text-[13px] text-[#6C727B]">
          전일 대비는 시장 중간환율 전일 종가 기준입니다. 통화 이름을 누르면 은행별 비교·인천공항 수수료·1년 흐름이 있는
          통화별 페이지로 갑니다.
        </p>
      </section>

      <BandAd />

      {/* 1,000달러 */}
      {counter && ranked[0] ? (
        <section className="flex flex-col gap-4">
          <H2 id="where" lead="같은 1,000달러라도 어디서, 어떤 조건으로 바꾸느냐에 따라 수수료가 달라집니다.">
            1,000달러 바꾸면 수수료는 얼마일까
          </H2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ap ? (
              <Box label={`인천공항 창구 · ${+ap.midBuy.toFixed(2)}%`} value={`${won(ap.airportFee)}원`} href="/fx/airport" link="공항 환전 수수료 비교 →" tone="#B4532A" />
            ) : null}
            <Box label={`시내 창구 · ${+counter.feeRate.toFixed(2)}%`} value={`${won(counter.fee)}원`} href="/fx/banks" link="은행별 수수료 비교 →" />
            <Box label={`앱 최대 우대 · ${bestLabel(ranked)}`} value={`${won(ranked[0].fee)}원`} href="/fx/usd#banks" link="달러 은행별 비교 →" tone="#2E7D5B" />
          </div>
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <H2>환전 도구</H2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Tool href="/fx/calculator" title="환율 계산기" body="금액을 넣으면 기준 환율로 통화 17종을 바로 환산합니다." />
          <Tool href="/fx/exchange-calculator" title="환전 계산기" body="은행·우대율을 넣어 실제로 낼 원화와 수수료를 계산합니다." />
          <Tool href="/fx/banks" title="은행별 환전 수수료 비교" body="은행 16곳의 수수료율·우대율로 받는 금액을 줄 세웁니다." />
          <Tool href="/fx/airport" title="인천공항 환전 수수료" body="공항점 공시 수수료율을 시내 창구·앱 우대와 비교합니다." />
          <Tool href="/fx/exchange-fee" title="환전 수수료 아끼는 법" body="달러·엔화를 공항·창구·앱·100% 우대로 바꿀 때 오늘 낼 원화와 은행별 우대 조건." />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <H2 id="faq">환율 조회, 자주 묻는 질문</H2>
        <FaqList items={faq} />
      </section>

      <SourceNote>
        기준 환율: {d.source ?? "시장 중간환율"}
        {d.updatedAt ? ` (${korDate(d.updatedAt)} ${d.updatedAt.slice(11, 16)} 갱신)` : ""}. 은행 수수료율·우대율과 인천공항점
        수수료율: 전국은행연합회 외환길잡이 공시(은행별 기준일, 최신 {korDate(d.banks?.latestAsOf ?? undefined)}). 실제 적용 환율은
        거래 시점 은행 고시와 우대 조건에 따릅니다.
      </SourceNote>
    </div>
  );
}

function Box({ label, value, href, link, tone }: { label: string; value: string; href: string; link: string; tone?: string }) {
  return (
    <div className="bg-white border border-[#E2DFD7] rounded-[16px] px-5 py-4 flex flex-col gap-1">
      <span className="text-[13px] font-semibold text-[#6C727B]">{label}</span>
      <span className="text-[26px] font-extrabold tabular-nums tracking-[-0.02em]" style={{ color: tone ?? "#1A1D21" }}>
        {value}
      </span>
      <a href={href} className="text-[13.5px] font-semibold text-[#1F4E79] hover:underline underline-offset-2">
        {link}
      </a>
    </div>
  );
}

function Tool({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <a href={href} className="bg-white border border-[#E2DFD7] rounded-[16px] px-5 py-4 flex flex-col gap-1 hover:border-[#1F4E79] transition-colors">
      <span className="text-[16px] font-bold text-[#1A1D21]">{title} →</span>
      <span className="text-[14px] text-[#6C727B] leading-[1.6]">{body}</span>
    </a>
  );
}
