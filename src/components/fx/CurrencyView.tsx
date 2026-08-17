"use client";

import Link from "next/link";
import { useState } from "react";
import { BandAd, BoxAd, Card, DARK_BG, DataNotice, FooterNote, Skeleton } from "./ui";
import type { CurrencyMeta } from "./currencies";
import { changeText, fxColor, korDateTime, perUnit, useFx, won } from "./fxData";

/**
 * /fx/[code] — 통화별 환율 페이지.
 *
 * 검색 실측에서 "달러 환율", "베트남 환율 계산기", "100달러 한국돈" 형태의
 * 질의가 확인됐다. 그 질문에 첫 화면에서 바로 답하도록 구성한다.
 */
export default function CurrencyView({ meta }: { meta: CurrencyMeta }) {
  const { data, status } = useFx();
  const rates = data?.rates;
  const rate = rates?.find((r) => r.code === meta.code);
  const per = perUnit(rate);

  const [amount, setAmount] = useState(String(meta.sample));
  const num = Number(amount.replace(/,/g, ""));
  const valid = Number.isFinite(num) && num > 0;

  const toKrw = valid && per ? num * per : null;
  const krwSample = 100000;
  const fromKrw = per ? krwSample / per : null;

  const others = (rates ?? []).filter((r) => r.code !== meta.code).slice(0, 6);

  return (
    <div className="flex flex-col gap-0">
      {/* 히어로 — 질문에 바로 답한다 */}
      <section style={DARK_BG} className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-10 items-start">
          <div>
            <nav className="flex items-center gap-2 text-[13px] text-white/50">
              <Link href="/fx" className="hover:text-white/80">
                환율
              </Link>
              <span>›</span>
              <span className="text-white/80">{meta.common}</span>
            </nav>
            <h1 className="mt-4 mb-0 text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.035em] font-extrabold text-white">
              {meta.common} 환율
            </h1>

            {rate ? (
              <>
                <div className="mt-6 flex items-end gap-3 flex-wrap">
                  <span className="text-[44px] sm:text-[56px] font-extrabold text-white tracking-[-0.04em] leading-none tabular-nums">
                    {won(rate.rate, 2)}
                  </span>
                  <span className="text-[18px] font-semibold text-white/60 pb-1.5">원</span>
                  <span
                    className="text-[15px] font-bold px-2.5 py-1 rounded-lg tabular-nums mb-1"
                    style={{
                      color: rate.changePct && rate.changePct > 0 ? "#3DD68C" : "#93B4FF",
                      background: "rgba(255,255,255,0.10)",
                    }}
                  >
                    {changeText(rate.changePct)}
                  </span>
                </div>
                <p className="mt-3 mb-0 text-[16px] text-white/60">
                  {meta.unit} {meta.unitName} 기준 · 시장 중간환율
                  {meta.unit !== 1 && per ? ` · 1${meta.unitName} ${won(per, 4)}원` : ""}
                </p>
              </>
            ) : (
              <Skeleton className="mt-6 w-[260px] h-14" />
            )}
          </div>

          {/* 환산 계산기 */}
          <div className="bg-white rounded-[22px] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
            <label htmlFor="cur-amount" className="text-[14px] font-semibold text-[#6C727B]">
              {meta.common} → 원화
            </label>
            <div className="mt-2.5 flex items-center gap-3 border border-[#CFCBC1] rounded-[14px] px-4 py-3.5">
              <input
                id="cur-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                className="flex-1 min-w-0 border-none outline-none bg-transparent text-[26px] font-bold text-[#1A1D21] tabular-nums"
              />
              <span className="text-[15px] font-bold text-[#6C727B] shrink-0">{meta.code}</span>
            </div>
            <div className="mt-3 px-4 py-3.5 rounded-[14px] bg-[#F7F6F3] border border-[#E2DFD7] flex items-center justify-between gap-3">
              <span className="text-[26px] font-bold text-[#1A1D21] tabular-nums truncate">
                {toKrw !== null ? won(toKrw, 0) : "—"}
              </span>
              <span className="text-[15px] font-bold text-[#6C727B] shrink-0">원</span>
            </div>
            <Link
              href="/fx"
              className="mt-4 block text-center px-4 py-3 rounded-xl bg-[#1F4E79] text-white text-[15px] font-semibold hover:bg-[#2A6099] transition-colors"
            >
              다른 통화도 계산하기 →
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-8 pt-10">
        {status === "error" ? <DataNotice /> : null}

        {/* 자주 찾는 금액 — "100달러 한국돈" 질의를 그대로 받는다 */}
        {per ? (
          <Card className="p-6 sm:p-8">
            <h2 className="m-0 text-[22px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
              {meta.common} 얼마인가요
            </h2>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 10, 100, 1000].map((q) => {
                const v = q * meta.unit * (per ?? 0);
                return (
                  <div key={q} className="bg-[#F7F6F3] border border-[#E2DFD7] rounded-[14px] p-4">
                    <div className="text-[13px] font-semibold text-[#6C727B]">
                      {won(q * meta.unit)} {meta.unitName}
                    </div>
                    <div className="mt-1.5 text-[18px] sm:text-[20px] font-extrabold text-[#1A1D21] tabular-nums">
                      {won(v, 0)}원
                    </div>
                  </div>
                );
              })}
            </div>
            {fromKrw ? (
              <p className="mt-5 mb-0 text-[15px] leading-[1.7] text-[#3C424A]">
                반대로 10만원이면 약{" "}
                <strong className="font-bold text-[#1A1D21] tabular-nums">
                  {won(fromKrw, 2)} {meta.code}
                </strong>
                입니다. 실제 환전에는 은행 수수료와 우대율이 적용되므로 이 금액보다 적게 받습니다.
              </p>
            ) : null}
          </Card>
        ) : null}

        <BandAd />

        {/* 환전 안내 */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
          <Card className="p-6 sm:p-8">
            <h2 className="m-0 text-[22px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
              {meta.common} 환전, 어디가 유리한가요
            </h2>
            <p className="mt-3 mb-0 text-[16px] leading-[1.75] text-[#3C424A]">
              위 환율은 시장 중간환율입니다. 은행 창구나 앱에서 실제로 환전할 때는 여기에
              환전수수료가 붙고, 우대율만큼 그 수수료가 깎입니다. 같은 금액이라도 어느 은행에서
              바꾸느냐에 따라 받는 돈이 달라집니다.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                ["환전수수료율", "은행이 중간환율에 얹는 몫입니다. 통화마다 다릅니다."],
                ["우대율", "그 수수료를 깎아 주는 비율입니다. 100%면 중간환율 그대로입니다."],
                ["공시 기준일", "우대율은 수시로 바뀝니다. 언제 기준인지 함께 봐야 합니다."],
              ].map(([t, b]) => (
                <div key={t} className="flex gap-3 items-start">
                  <span className="flex-none w-[22px] h-[22px] rounded-md bg-[#E9F0F7] text-[#1F4E79] text-[12px] font-extrabold flex items-center justify-center mt-0.5">
                    ·
                  </span>
                  <span>
                    <strong className="text-[15px] font-bold text-[#1A1D21]">{t}</strong>
                    <span className="block mt-0.5 text-[14px] text-[#6C727B] leading-[1.6]">{b}</span>
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/fx/banks"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F4E79] text-white text-[15px] font-semibold hover:bg-[#2A6099] transition-colors"
            >
              은행별 환전가 비교 →
            </Link>
          </Card>
          <div className="hidden lg:block sticky top-[90px]">
            <BoxAd />
          </div>
        </section>

        {/* 다른 통화 */}
        {others.length > 0 ? (
          <section className="flex flex-col gap-4">
            <h2 className="m-0 text-[20px] sm:text-[24px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
              다른 통화 환율
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {others.map((r) => (
                <Link
                  key={r.code}
                  href={`/fx/${r.code.toLowerCase()}`}
                  className="bg-white border border-[#E2DFD7] rounded-[14px] p-4 hover:border-[#1F4E79] transition-colors"
                >
                  <div className="text-[12px] font-extrabold text-[#6C727B]">{r.code}</div>
                  <div className="mt-1.5 text-[17px] font-extrabold text-[#1A1D21] tabular-nums">
                    {won(r.rate, 2)}
                  </div>
                  <div
                    className="mt-1 text-[12px] font-bold tabular-nums"
                    style={{ color: fxColor(r.changePct) }}
                  >
                    {changeText(r.changePct)}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <FooterNote
          text={`${meta.common} 환율은 시장 중간환율입니다. 실제 환전 금액은 은행 수수료와 우대율에 따라 달라집니다.`}
          updatedAt={korDateTime(data?.updatedAt)}
        />
      </div>
    </div>
  );
}
