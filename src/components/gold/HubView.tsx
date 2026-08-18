"use client";

import { useState } from "react";
import {
  BandAd,
  Card,
  DataNotice,
  Delta,
  Faq,
  FooterNote,
  Hero,
  SectionHead,
  Skeleton,
} from "./ui";
import { HOME_FAQ } from "./faqData";
import {
  type KrxPoint,
  dirColor,
  dirMark,
  gold24,
  korDate,
  korDateTime,
  perGram,
  usePrice,
  won,
} from "./priceData";

/** gold-home.html 시안을 옮긴 허브 페이지. */
export default function HubView() {
  const { data, status } = usePrice();
  const g24 = gold24(data);
  const retail = data?.retail;
  const krx = data?.krx;
  const buy = g24?.userBuy;
  const sell = g24?.userSell;

  return (
    <div className="flex flex-col gap-7 pt-6">
      <Hero
        eyebrow="TODAY'S GOLD PRICE"
        title="오늘의 금시세, 국내와 국제를 한 화면에"
        lead="순금 24K 소매 시세와 한국거래소 도매 종가, 국제 금 현물가를 함께 보여드립니다. 살 때·팔 때 가격 차이까지 그대로."
        aside={
          <div className="bg-[linear-gradient(145deg,#F7E7B0_0%,#E3C15C_32%,#D4AF37_66%,#A8801A_100%)] rounded-[24px] p-[30px] flex flex-col gap-[18px] shadow-[0_24px_50px_rgba(0,0,0,.35)]">
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <span className="text-[13px] font-bold tracking-[0.06em] text-[#4A3400]">
                국내 순금 24K · 1돈(3.75g)
              </span>
              <span className="text-[12px] font-bold text-[#14161A] bg-white/55 px-2.5 py-1.5 rounded-full">
                살 때
              </span>
            </div>

            {buy ? (
              <>
                <div className="flex items-end gap-2">
                  <span className="text-[44px] sm:text-[56px] font-extrabold leading-[.95] tracking-[-0.03em] text-[#17181C] tabular-nums">
                    {won(buy.price)}
                  </span>
                  <span className="text-[21px] font-bold text-[#4A3400] pb-1">원</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {buy.change ? (
                    <span
                      className="bg-[#17181C] text-[14px] font-bold px-3 py-1.5 rounded-full tabular-nums"
                      style={{ color: buy.dir === "down" ? "#93B4FF" : "#FFB3A7" }}
                    >
                      {dirMark(buy.dir)} {won(Math.abs(buy.change))}
                      {buy.price - buy.change > 0
                        ? ` (${((buy.change / (buy.price - buy.change)) * 100).toFixed(2)}%)`
                        : ""}
                    </span>
                  ) : null}
                  <span className="text-[14px] font-medium text-[#4A3400]">
                    {retail?.quoteDate ? `${korDate(retail.quoteDate)} 기준` : "전일 대비"}
                  </span>
                </div>
              </>
            ) : (
              <Skeleton className="w-[220px] h-14" />
            )}

            <div className="h-px bg-[rgba(74,52,0,.25)]" />

            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#4A3400]">팔 때 (24K)</span>
                {sell ? (
                  <span className="text-[24px] font-extrabold text-[#17181C] tabular-nums">
                    {won(sell.price)}
                  </span>
                ) : (
                  <Skeleton className="w-20 h-6" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#4A3400]">1g 환산 (살 때)</span>
                {buy ? (
                  <span className="text-[24px] font-extrabold text-[#17181C] tabular-nums">
                    {won(perGram(buy.price))}
                  </span>
                ) : (
                  <Skeleton className="w-20 h-6" />
                )}
              </div>
            </div>
          </div>
        }
      />

      {status === "error" ? <DataNotice /> : null}

      {/* 큰 액션 버튼 2개 */}
      <div className="flex flex-col gap-4">
        <a
          href="/gold/buy"
          className="bg-[linear-gradient(145deg,#F7E7B0_0%,#E3C15C_34%,#D4AF37_68%,#A8801A_100%)] rounded-[18px] px-6 sm:px-8 py-6 min-h-[104px] flex items-center justify-between gap-4 shadow-[0_16px_34px_rgba(140,105,10,.28)] hover:brightness-105 transition-[filter]"
        >
          <span className="flex flex-col gap-2">
            <span className="text-[26px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-[#17181C]">
              금 살 때
            </span>
            <span className="text-[15px] sm:text-[16px] font-semibold text-[#4A3400]">
              {buy ? `24K 1돈 ${won(buy.price)}원 · ` : ""}살 때 가격 전체보기
            </span>
          </span>
          <span className="text-[28px] sm:text-[34px] text-[#17181C]">→</span>
        </a>

        <a
          href="/gold/sell"
          className="bg-[#14161A] border-[1.5px] border-[#D4AF37] rounded-[18px] px-6 sm:px-8 py-6 min-h-[104px] flex items-center justify-between gap-4 hover:brightness-125 transition-[filter]"
        >
          <span className="flex flex-col gap-2">
            <span className="text-[26px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-white">
              금 팔 때
            </span>
            <span className="text-[15px] sm:text-[16px] font-semibold text-[#B9BDC4]">
              {sell ? `24K 1돈 ${won(sell.price)}원 · ` : ""}순도별 매입가 보기
            </span>
          </span>
          <span className="text-[28px] sm:text-[34px] text-[#E3C15C]">→</span>
        </a>
      </div>

      {/* 국내 / 국제 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <Card className="p-[26px] flex flex-col gap-[18px]">
          <SectionHead title="국내 시세" note={retail?.unit ? `단위: ${retail.unit}` : undefined} />
          <div className="overflow-x-auto">
            <div className="min-w-[380px]">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#6C727B] border-b border-[#CFCBC1]">
                <span>품목</span>
                <span className="text-right">살 때</span>
                <span className="text-right">팔 때</span>
                <span className="text-right">전일비</span>
              </div>
              {(retail?.items ?? []).length === 0
                ? [0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-4 border-b border-[#E2DFD7] ${
                        i % 2 ? "bg-[#F7F6F3]" : ""
                      }`}
                    >
                      <Skeleton className="w-16 h-4" />
                      <Skeleton className="w-16 h-4 justify-self-end" />
                      <Skeleton className="w-16 h-4 justify-self-end" />
                      <Skeleton className="w-12 h-4 justify-self-end" />
                    </div>
                  ))
                : (retail?.items ?? []).map((row, i) => (
                    <div
                      key={row.key}
                      className={`grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-4 border-b border-[#E2DFD7] items-center ${
                        i % 2 ? "bg-[#F7F6F3]" : ""
                      }`}
                    >
                      <span className="text-[15px] font-semibold text-[#1A1D21]">{row.name}</span>
                      <span className="text-right text-[15px] font-bold text-[#1A1D21] tabular-nums">
                        {row.userBuy ? (
                          won(row.userBuy.price)
                        ) : (
                          <span className="text-[13px] font-normal text-[#9CA1A8]">매장문의</span>
                        )}
                      </span>
                      <span className="text-right text-[15px] text-[#3C424A] tabular-nums">
                        {row.userSell ? won(row.userSell.price) : "—"}
                      </span>
                      <span className="text-right text-[14px]">
                        {row.userSell ? (
                          <Delta change={row.userSell.change} dir={row.userSell.dir} />
                        ) : null}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
          <span className="text-[14px] text-[#9CA1A8]">
            {retail?.source ? `${retail.source} 고시 소매가 · ` : ""}
            {retail?.note ?? "살 때 가격은 부가세 별도입니다."}
          </span>
        </Card>

        <Card className="p-[26px] flex flex-col gap-[18px]">
          <SectionHead title="국제 시세" note="단위: USD / 트로이온스" />
          <div className="overflow-x-auto">
            <div className="min-w-[360px]">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#6C727B] border-b border-[#CFCBC1]">
                <span>종목</span>
                <span className="text-right">현재가</span>
                <span className="text-right">원화 1돈</span>
                <span className="text-right">등락</span>
              </div>
              {[data?.intl?.gold, data?.intl?.silver]
                .filter(Boolean)
                .map((r, i) =>
                  r ? (
                    <div
                      key={r.name}
                      className={`grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-4 border-b border-[#E2DFD7] items-center ${
                        i % 2 ? "bg-[#F7F6F3]" : ""
                      }`}
                    >
                      <span className="text-[15px] font-semibold text-[#1A1D21]">{r.name}</span>
                      <span className="text-right text-[15px] font-bold text-[#1A1D21] tabular-nums">
                        ${r.usdPerOz.toLocaleString("en-US")}
                      </span>
                      <span className="text-right text-[15px] text-[#3C424A] tabular-nums">
                        {won(r.krwPerDon)}
                      </span>
                      <span
                        className="text-right text-[14px] font-bold tabular-nums"
                        style={{ color: dirColor(r.dir) }}
                      >
                        {dirMark(r.dir)} {Math.abs(r.changePct).toFixed(2)}%
                      </span>
                    </div>
                  ) : null
                )}
              {!data?.intl?.gold && !data?.intl?.silver
                ? [0, 1].map((i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[1.2fr_1fr_1fr_0.9fr] gap-2 px-3 py-4 border-b border-[#E2DFD7] ${
                        i % 2 ? "bg-[#F7F6F3]" : ""
                      }`}
                    >
                      <Skeleton className="w-14 h-4" />
                      <Skeleton className="w-16 h-4 justify-self-end" />
                      <Skeleton className="w-16 h-4 justify-self-end" />
                      <Skeleton className="w-12 h-4 justify-self-end" />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <span className="text-[14px] text-[#9CA1A8]">
            국제 금 현물(COMEX 선물)
            {data?.fx?.usdkrw ? ` · 환율 ${won(data.fx.usdkrw)}원 적용` : ""} · 환산 참고값이라
            국내 소매가와 다릅니다.
          </span>
        </Card>
      </section>

      {/* 추이 */}
      {krx?.history && krx.history.length > 1 ? (
        <Card className="p-[26px] flex flex-col gap-5">
          <MonthlyChart history={krx.history} />
          <span className="text-[14px] text-[#9CA1A8]">
            {krx.note ?? ""} {krx.source ? `출처 ${krx.source}` : ""}
          </span>
        </Card>
      ) : null}

      <BandAd />

      {/* 계산기 + 도매 종가 */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-7 items-start">
        <div className="bg-[#14161A] rounded-[18px] p-[26px] flex flex-col gap-[18px]">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold tracking-[0.06em] text-[#D4AF37]">
              CALCULATOR
            </span>
            <h2 className="m-0 text-[24px] sm:text-[27px] font-extrabold tracking-[-0.02em] text-white">
              내 금 얼마일까
            </h2>
          </div>
          <div className="flex items-center justify-between bg-[#1E2026] border border-[#33363D] rounded-[14px] px-4 py-4">
            <span className="text-[26px] font-bold text-white tabular-nums">3.75</span>
            <span className="text-[14px] font-semibold text-[#E3C15C]">g (1돈)</span>
          </div>
          <div className="bg-[linear-gradient(145deg,#F7E7B0_0%,#E3C15C_34%,#D4AF37_68%,#A8801A_100%)] rounded-[16px] p-5 flex flex-col gap-1.5">
            <span className="text-[12px] font-bold tracking-[0.06em] text-[#4A3400]">
              예상 매입가 (팔 때 · 순금 1돈)
            </span>
            <div className="flex items-end gap-1.5">
              <span className="text-[34px] sm:text-[38px] font-extrabold leading-none tracking-[-0.03em] text-[#17181C] tabular-nums">
                {sell ? won(sell.price) : "—"}
              </span>
              <span className="text-[17px] font-bold text-[#4A3400]">원</span>
            </div>
            <span className="text-[12px] text-[#4A3400]">감정 결과에 따라 달라집니다</span>
          </div>
          <a
            href="/gold/calculator"
            className="bg-[linear-gradient(145deg,#F5E3A6_0%,#E0BE55_45%,#C79A22_100%)] rounded-[14px] px-5 py-4 flex items-center justify-between text-[#17181C] hover:brightness-105 transition-[filter]"
          >
            <span className="text-[17px] font-extrabold tracking-[-0.02em]">
              순도·중량 넣고 계산하기
            </span>
            <span className="text-[20px]">→</span>
          </a>
        </div>

        {krx?.latest ? (
          <Card className="p-[26px] flex flex-col gap-4">
            <SectionHead title="한국거래소 도매 종가" />
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[30px] sm:text-[38px] font-extrabold text-[#1A1D21] tabular-nums">
                {won(krx.latest.krwPerDon)}원
              </span>
              <span className="text-[15px] text-[#6C727B]">
                1돈 기준 · {korDate(krx.latest.date)} 종가
              </span>
            </div>
            <p className="m-0 text-[15px] leading-[1.7] text-[#3C424A]">
              그램당 {won(krx.latest.krwPerGram)}원입니다. 하루 한 번 갱신되는 전 영업일 종가라
              매장에서 부르는 값과는 다릅니다. 매장 가격은 위의 국내 시세표를 보세요.
            </p>
            {buy && sell ? (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#F7F6F3] border border-[#E2DFD7] rounded-[14px] px-4 py-3.5 flex flex-col gap-1">
                  <span className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]">
                    살 때 − 도매
                  </span>
                  <span className="text-[19px] font-extrabold text-[#1A1D21] tabular-nums">
                    {won(buy.price - krx.latest.krwPerDon)}원
                  </span>
                </div>
                <div className="bg-[#F7F6F3] border border-[#E2DFD7] rounded-[14px] px-4 py-3.5 flex flex-col gap-1">
                  <span className="text-[12px] font-bold tracking-[0.06em] text-[#6C727B]">
                    도매 − 팔 때
                  </span>
                  <span className="text-[19px] font-extrabold text-[#1A1D21] tabular-nums">
                    {won(krx.latest.krwPerDon - sell.price)}원
                  </span>
                </div>
              </div>
            ) : null}
          </Card>
        ) : null}
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-4">
        <SectionHead title="자주 묻는 질문" />
        <Faq items={HOME_FAQ} />
      </section>

      <FooterNote
        text="표시 가격은 참고용이며 실제 거래가는 매장·시점에 따라 다릅니다."
        updatedAt={korDateTime(data?.updatedAt)}
      />
    </div>
  );
}

/* ─────────────────────────── 월별 막대 추이 ─────────────────────────── */

const RANGES = [
  { label: "1개월", months: 1 },
  { label: "3개월", months: 3 },
  { label: "6개월", months: 6 },
] as const;

function MonthlyChart({ history }: { history: KrxPoint[] }) {
  const [idx, setIdx] = useState(2);

  // 월별 마지막 영업일 종가로 묶는다. 시안의 막대 그래프 형태를 따른다.
  const byMonth = new Map<string, KrxPoint>();
  for (const p of history) {
    byMonth.set(p.date.slice(0, 7), p);
  }
  const months = Array.from(byMonth.entries()).sort(([a], [b]) => a.localeCompare(b));
  const shown = months.slice(-RANGES[idx].months);

  if (shown.length === 0) return null;

  const values = shown.map(([, p]) => p.krwPerDon);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;

  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="w-2 h-5 rounded-[4px] bg-gradient-to-b from-[#F3DE9C] to-[#C79A22]" />
          <h2 className="m-0 text-[21px] sm:text-[27px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
            금값 추이
          </h2>
          <span className="text-[14px] text-[#6C727B]">KRX 도매 종가 · 1돈</span>
        </div>
        <div className="flex gap-1.5">
          {RANGES.map((r, i) => (
            <button
              key={r.label}
              type="button"
              onClick={() => setIdx(i)}
              className={`text-[13px] font-bold px-3.5 py-1.5 rounded-full border transition-colors ${
                i === idx
                  ? "bg-[linear-gradient(140deg,#F3DE9C,#D4AF37)] text-[#17181C] border-transparent"
                  : "bg-transparent text-[#6C727B] border-[#E2DFD7] hover:border-[#CFCBC1]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-2.5 h-[200px] px-1 border-b border-[#CFCBC1]">
        {shown.map(([ym, p], i) => (
          <div
            key={ym}
            className="flex-1 flex flex-col items-center gap-2 justify-end h-full min-w-0"
          >
            <span className="text-[11px] font-semibold text-[#9CA1A8] tabular-nums">
              {Math.round(p.krwPerDon / 1000)}
            </span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${Math.round(((p.krwPerDon - min) / span) * 140 + 20)}px`,
                background:
                  i === shown.length - 1
                    ? "linear-gradient(180deg,#F3DE9C,#C79A22)"
                    : "linear-gradient(180deg,#EFE6CC,#D9C88C)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2.5 px-1">
        {shown.map(([ym]) => (
          <span key={ym} className="flex-1 text-center text-[12px] text-[#6C727B] min-w-0">
            {Number(ym.slice(5))}월
          </span>
        ))}
      </div>
      <span className="text-[13px] text-[#9CA1A8]">막대 위 숫자는 1돈 가격을 천 원 단위로 줄인 값입니다.</span>
    </>
  );
}
