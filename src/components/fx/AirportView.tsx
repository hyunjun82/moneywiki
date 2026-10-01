"use client";

/**
 * /fx/airport — 인천공항 환전 수수료 비교. 은행연합회 외환길잡이 "인천공항점 환전수수료 비교" 공시를
 * 시내 창구(공시 중간값)·앱 최대 우대와 같은 금액으로 나란히 놓는다.
 */

import { BandAd, DataNotice } from "./ui";
import { asOfLabel, korDate, useFx, won, type FxData } from "./fxData";
import { SPOKES, airportCompare, airportFaq, amountLabel, bestLabel, feeRange, rankBanks } from "./fxDerive";
import { CurrencyChips, FaqList, H2, SourceNote, TableWrap, td, th } from "./parts";

export default function AirportView({ initial }: { initial: FxData }) {
  const { data, status } = useFx(initial);
  const d = data ?? initial;

  const rows = SPOKES.map((m) => {
    const ap = airportCompare(d, m.code, m.sample);
    return ap ? { m, ap, ranked: rankBanks(d, m.code, m.sample) } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  if (!rows.length) {
    if (status === "error") return <div className="pt-8"><DataNotice /></div>;
    return (
      <div className="pt-8 flex flex-col gap-3">
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21]">인천공항 환전 수수료 비교</h1>
        <p className="m-0 text-[16px] leading-[1.75] text-[#3C424A]">
          은행연합회 외환길잡이의 인천공항점 공시를 받아 오는 중입니다. 확인되지 않은 수수료율은 표시하지 않습니다.
        </p>
      </div>
    );
  }

  const usd = rows.find((r) => r.m.code === "USD");
  const branches = new Map<string, { bank: string; branch?: string | null; dates: Set<string> }>();
  for (const r of rows)
    for (const x of r.ap.rows) {
      const k = x.bank;
      if (!branches.has(k)) branches.set(k, { bank: x.bank, branch: x.branch, dates: new Set() });
      if (x.asOf) branches.get(k)!.dates.add(x.asOf);
    }
  const faq = airportFaq(d);
  const top = [...rows].sort((a, b) => b.ap.midBuy - a.ap.midBuy);

  return (
    <div className="flex flex-col gap-10 pt-6 sm:pt-8">
      <header className="flex flex-col gap-3">
        <div className="text-[13px] font-bold text-[#1F4E79]">은행연합회 외환길잡이 인천공항점 공시 · 통화 {rows.length}종</div>
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21] leading-tight">
          인천공항 환전 수수료 비교
        </h1>
        {usd ? (
          <p className="m-0 text-[16px] sm:text-[17px] leading-[1.75] text-[#3C424A] max-w-[70ch]">
            인천공항점({usd.ap.rows.map((x) => x.bank).join("·")})의 달러 살 때 수수료율은 {feeRange(usd.ap.minBuy, usd.ap.maxBuy)}로, 시내
            창구 공시 중간값 {usd.ap.cityFeeRate != null ? `${+usd.ap.cityFeeRate.toFixed(2)}%` : ""}의 약 {usd.ap.times?.toFixed(1)}배입니다. 1,000달러를
            공항 창구에서 사면 수수료가 약 {won(usd.ap.airportFee)}원, 시내 창구는 {won(usd.ap.cityFee)}원, 앱 최대 우대({bestLabel(usd.ranked)})는{" "}
            {won(usd.ap.appFee)}원입니다.
          </p>
        ) : null}
      </header>

      <section className="flex flex-col gap-4">
        <H2 id="cost" lead="통화마다 여행 한 번에 흔히 바꾸는 금액으로 계산했습니다. 공항 창구는 공항점 공시 수수료율 중간값, 시내 창구는 은행 16곳 공시 중간값이며 둘 다 우대 없음입니다.">
          같은 금액, 공항 · 시내 · 앱 수수료
        </H2>
        <TableWrap min={720}>
          <thead>
            <tr>
              <th className={th}>통화 · 금액</th>
              <th className={`${th} text-right`}>공항 창구</th>
              <th className={`${th} text-right`}>시내 창구</th>
              <th className={`${th} text-right`}>앱 최대 우대</th>
              <th className={`${th} text-right`}>공항이 더 내는 돈</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ m, ap }) => (
              <tr key={m.code}>
                <td className={td}>
                  <a href={`/fx/${m.slug}#airport`} className="font-bold text-[#1F4E79] hover:underline underline-offset-2">
                    {m.short}
                  </a>{" "}
                  <span className="text-[12px] text-[#9CA1A8]">{amountLabel(m, m.sample)}</span>
                </td>
                <td className={`${td} text-right font-bold text-[#B4532A]`}>{won(ap.airportFee)}원</td>
                <td className={`${td} text-right`}>{ap.cityFee != null ? `${won(ap.cityFee)}원` : ""}</td>
                <td className={`${td} text-right text-[#2E7D5B]`}>{ap.appFee != null ? `${won(ap.appFee)}원` : ""}</td>
                <td className={`${td} text-right`}>{ap.appFee != null ? `+${won(ap.airportFee - ap.appFee)}원` : ""}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </section>

      <BandAd />

      <section className="flex flex-col gap-4">
        <H2 id="rates" lead="살 때는 원화로 외화를 살 때, 팔 때는 남은 외화를 원화로 바꿀 때 붙는 수수료율입니다. 수수료율이 높은 통화부터 적었습니다.">
          통화별 인천공항점 수수료율 vs 시내 창구
        </H2>
        <TableWrap min={640}>
          <thead>
            <tr>
              <th className={th}>통화</th>
              <th className={`${th} text-right`}>공항 살 때</th>
              <th className={`${th} text-right`}>공항 팔 때</th>
              <th className={`${th} text-right`}>시내 창구</th>
              <th className={`${th} text-right`}>배수</th>
            </tr>
          </thead>
          <tbody>
            {top.map(({ m, ap }) => {
              const sells = ap.rows.map((x) => x.sellFee).filter((x): x is number => typeof x === "number");
              return (
                <tr key={m.code}>
                  <td className={`${td} font-semibold text-[#1A1D21]`}>{m.short}</td>
                  <td className={`${td} text-right`}>{feeRange(ap.minBuy, ap.maxBuy)}</td>
                  <td className={`${td} text-right`}>{sells.length ? feeRange(Math.min(...sells), Math.max(...sells)) : ""}</td>
                  <td className={`${td} text-right`}>{ap.cityFeeRate != null ? `${+ap.cityFeeRate.toFixed(2)}%` : ""}</td>
                  <td className={`${td} text-right font-bold`}>{ap.times ? `${ap.times.toFixed(1)}배` : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </section>

      <section className="flex flex-col gap-4">
        <H2 id="branches" lead="은행연합회 외환길잡이에 인천공항점 수수료를 공시하는 은행과 지점, 공시 기준일입니다.">
          인천공항 환전, 어느 은행이 공시하나
        </H2>
        <TableWrap min={420}>
          <thead>
            <tr>
              <th className={th}>은행</th>
              <th className={th}>지점(공시 이름)</th>
              <th className={`${th} text-right`}>공시 기준일</th>
            </tr>
          </thead>
          <tbody>
            {[...branches.values()].map((b) => (
              <tr key={b.bank}>
                <td className={`${td} font-semibold text-[#1A1D21]`}>{b.bank}</td>
                <td className={td}>{b.branch ?? ""}</td>
                <td className={`${td} text-right`}>{[...b.dates].sort().map((x) => asOfLabel(x, d.updatedAt)).join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </section>

      <section className="flex flex-col gap-4">
        <H2 id="faq">인천공항 환전, 자주 묻는 질문</H2>
        <FaqList items={faq} />
      </section>

      <section className="flex flex-col gap-4">
        <H2>통화별 환율과 공항 수수료</H2>
        <CurrencyChips rates={Object.fromEntries((d.rates ?? []).map((r) => [r.code, { rate: r.rate, unit: r.unit }]))} />
      </section>

      <SourceNote>
        수수료율:{" "}
        <a href={d.banks?.airport?.sourceUrl ?? "https://exchange.kfb.or.kr/page/airport_commission.php"} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
          전국은행연합회 외환길잡이 — 은행별 주요통화 인천공항점 환전수수료 비교
        </a>
        (지점별 기준일은 위 표). 금액은 {d.source ?? "시장 중간환율"}({korDate(d.updatedAt)})에 수수료율을 곱해 계산했습니다. 실제 적용 환율은 거래 시점 은행
        고시와 조건에 따릅니다.
      </SourceNote>
    </div>
  );
}
