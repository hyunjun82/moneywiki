"use client";

/**
 * /fx/exchange-calculator — 환전 계산기. 은행·우대율을 넣어 낼 원화(팔 때 받을 원화)를 계산한다.
 * 수수료 없는 기준 환율 환산은 /fx/calculator(환율 계산기)가 맡는다 — 둘은 검색어도 다르다.
 */

import ExchangeCalc from "./ExchangeCalc";
import { BandAd } from "./ui";
import { useFx, won, type FxData } from "./fxData";
import { bestLabel, counterPay, exchangeFaq, prefLadder, rankBanks, baseOf } from "./fxDerive";
import { CurrencyChips, Crumbs, FaqList, H2, SourceNote, TableWrap, td, th } from "./parts";

export default function ExchangeView({ initial, defaultCode = "USD" }: { initial: FxData; defaultCode?: string }) {
  const { data } = useFx(initial);
  const d = data ?? initial;
  const usd = baseOf(d, "USD");
  const counter = counterPay(d, "USD", 1000);
  const ranked = rankBanks(d, "USD", 1000);
  const ladder = prefLadder(d, "USD", 1000);
  const faq = exchangeFaq(d);

  return (
    <div className="flex flex-col gap-10 pt-6 sm:pt-8">
      <header className="flex flex-col gap-3">
        <Crumbs items={[{ name: "오늘 환율", href: "/fx" }, { name: "환전 계산기" }]} />
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21] leading-tight">
          환전 계산기
        </h1>
        <p className="m-0 text-[16px] sm:text-[17px] leading-[1.75] text-[#3C424A] max-w-[70ch]">
          통화·금액·은행·우대율을 고르면 현찰로 살 때 낼 원화와 팔 때 받을 원화를 계산합니다.
          {usd && counter && ranked.length
            ? ` 오늘(${usd.when}) 1,000달러를 사면 우대 없는 창구에서 ${won(counter.pay)}원, 공시 최대 우대로는 ${bestLabel(ranked)} ${won(ranked[0].pay)}원입니다.`
            : ""}{" "}
          수수료 없는 기준 환율로 바꿔만 보려면{" "}
          <a href="/fx/calculator" className="text-[#1F4E79] font-semibold underline underline-offset-2">
            환율 계산기
          </a>
          를 쓰면 됩니다.
        </p>
      </header>

      <ExchangeCalc data={d} defaultCode={defaultCode} />

      {ladder.length && usd ? (
        <section className="flex flex-col gap-4">
          <H2 id="pref" lead="같은 1,000달러라도 우대율에 따라 수수료가 이만큼 달라집니다. 수수료율은 은행 공시 중간값입니다.">
            우대율별 1,000달러 낼 원화
          </H2>
          <TableWrap min={420}>
            <thead>
              <tr>
                <th className={th}>우대율</th>
                <th className={`${th} text-right`}>적용 환율</th>
                <th className={`${th} text-right`}>낼 원화</th>
                <th className={`${th} text-right`}>그중 수수료</th>
              </tr>
            </thead>
            <tbody>
              {ladder.map((r) => (
                <tr key={r.pref}>
                  <td className={`${td} font-semibold text-[#1A1D21]`}>{r.pref === 0 ? "우대 없음" : `${r.pref}%`}</td>
                  <td className={`${td} text-right`}>{won(r.applied, 2)}</td>
                  <td className={`${td} text-right font-bold text-[#1A1D21]`}>{won(r.pay)}원</td>
                  <td className={`${td} text-right`}>{won(r.fee)}원</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </section>
      ) : null}

      <BandAd />

      <section className="flex flex-col gap-4">
        <H2 id="faq">환전 계산기, 자주 묻는 질문</H2>
        <FaqList items={faq} />
      </section>

      <section className="flex flex-col gap-4">
        <H2>통화별 환율과 은행 비교</H2>
        <CurrencyChips rates={Object.fromEntries((d.rates ?? []).map((r) => [r.code, { rate: r.rate, unit: r.unit }]))} />
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] font-semibold">
          <a href="/fx" className="text-[#1F4E79] hover:underline underline-offset-2">오늘 환율 전체 →</a>
          <a href="/fx/banks" className="text-[#1F4E79] hover:underline underline-offset-2">은행별 환전 수수료 비교 →</a>
          <a href="/fx/airport" className="text-[#1F4E79] hover:underline underline-offset-2">인천공항 환전 수수료 →</a>
        </div>
      </section>

      <SourceNote>
        기준 환율: {d.source ?? "시장 중간환율"}. 수수료율·우대율·인천공항점 수수료율: 전국은행연합회 외환길잡이 공시(은행별 기준일이 다름). 실제
        적용 환율은 거래 시점 은행 고시와 우대 조건에 따릅니다.
      </SourceNote>
    </div>
  );
}
