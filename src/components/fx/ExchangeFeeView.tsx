"use client";

/**
 * /fx/exchange-fee — 환전 수수료 아끼는 법 (2026-10-09).
 * "환전 수수료 · 환율 우대 · 달러·엔화" 는 일 년 내내 검색된다. 요령 글 대신 같은 금액을 어디서 바꾸느냐에 따라
 * 오늘 낼 원화를 은행연합회 공시로 계산해 보인다. 공시에 없는 사실(토스뱅크·관세청)은 Playwright 로 연 페이지만 적는다(fxDerive TOSS_FX·CUSTOMS_FX).
 */

import { BandAd, DataNotice } from "./ui";
import { asOfLabel, korDate, useFx, won, type FxData } from "./fxData";
import {
  CUSTOMS_FX,
  TOSS_FX,
  feeChannels,
  feeFaq,
  metaByCode,
  prefConditions,
  prefLadder,
  sellChannels,
  type FeeChannel,
} from "./fxDerive";
import { CurrencyChips, FaqList, H2, SourceNote, TableWrap, td, th } from "./parts";

const TONE: Record<FeeChannel["key"], string> = {
  airport: "#B4532A",
  counter: "#3C424A",
  app: "#1F4E79",
  full: "#2E7D5B",
};

/** 항목·설명 목록 — 넓은 화면은 두 칸, 휴대폰은 항목 이름 아래에 설명을 쌓는다(표로 두면 설명이 화면 밖으로 잘렸다) */
function KV({ rows }: { rows: string[][] }) {
  return (
    <dl className="m-0 bg-white border border-[#E2DFD7] rounded-[16px] overflow-hidden divide-y divide-[#EFEDE8]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid sm:grid-cols-[140px_1fr]">
          <dt className="px-4 sm:px-5 pt-3 sm:py-3.5 text-[12.5px] font-bold text-[#6C727B] sm:bg-[#F7F6F3]">{k}</dt>
          <dd className="m-0 px-4 sm:px-5 pb-3 pt-1 sm:py-3.5 text-[14.5px] leading-[1.7] text-[#3C424A]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 공시 최대 우대 첫 줄 — "-" 나 빈칸이면 "공시 없음" */
const maxLabel = (b: { maxPref?: number | null; maxPrefText?: string | null }) => {
  const t = b.maxPrefText?.split("\n")[0].trim();
  return t && t !== "-" ? t : b.maxPref != null ? `${b.maxPref}%` : "공시 없음";
};

/** 휴대폰 폭에 들어가게 칸 여백을 줄인 표 */
const thTight = th.replace("px-4", "px-3");
const tdTight = td.replace("px-4", "px-3");

const pct = (x: number) => `${+x.toFixed(3)}%`;

/**
 * 바꾸는 곳별 수수료 — 표 대신 줄 목록. 휴대폰에서 표로 두면 수수료·낼 원화 칸이 화면 밖으로 밀려
 * 가장 중요한 숫자가 안 보였다(2026-10-09 390px 확인). 넓은 화면은 한 줄, 좁은 화면은 두 줄로 접는다.
 */
function ChannelTable({ rows, amountText }: { rows: FeeChannel[]; amountText: string }) {
  const max = Math.max(...rows.map((r) => r.fee), 1);
  return (
    <div className="bg-white border border-[#E2DFD7] rounded-[16px] overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1.6fr_0.6fr_1.4fr_1fr] gap-3 px-5 py-3 bg-[#F7F6F3] border-b border-[#E2DFD7] text-[12.5px] font-bold text-[#6C727B]">
        <div>{amountText} 바꾸는 곳</div>
        <div className="text-right">수수료율</div>
        <div>수수료</div>
        <div className="text-right">낼 원화</div>
      </div>
      <ul className="m-0 p-0 list-none divide-y divide-[#EFEDE8]">
        {rows.map((r) => (
          <li key={r.key} className="px-4 sm:px-5 py-3.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_0.6fr_1.4fr_1fr] gap-x-3 gap-y-1.5 items-center tabular-nums">
            <div className="min-w-0">
              <div className="text-[15px] font-bold" style={{ color: TONE[r.key] }}>{r.label}</div>
              <div className="text-[12px] text-[#9CA1A8] truncate">{r.sub}</div>
            </div>
            <div className="hidden sm:block text-right text-[14px] text-[#3C424A]">{pct(r.feeRate)}</div>
            <div className="flex items-center justify-end sm:justify-start gap-2.5">
              <span className="text-[16px] sm:text-[15px] font-extrabold sm:min-w-[80px] text-right" style={{ color: TONE[r.key] }}>
                {won(r.fee)}원
              </span>
              <span className="hidden sm:block h-2 rounded-full bg-[#EFEDE8] w-[110px] overflow-hidden" aria-hidden>
                <span className="block h-full rounded-full" style={{ width: `${(r.fee / max) * 100}%`, background: TONE[r.key] }} />
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex justify-between sm:block sm:text-right text-[13px] sm:text-[14.5px] text-[#5B616A] sm:font-semibold sm:text-[#1A1D21]">
              <span className="sm:hidden">수수료율 {pct(r.feeRate)} · 낼 원화</span>
              <span>{won(r.pay)}원</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExchangeFeeView({ initial }: { initial: FxData }) {
  const { data, status } = useFx(initial);
  const d = data ?? initial;
  const usdMeta = metaByCode("USD")!;
  const jpyMeta = metaByCode("JPY")!;
  const usd = feeChannels(d, "USD", usdMeta.sample);
  const jpy = feeChannels(d, "JPY", jpyMeta.sample);

  if (!usd) {
    if (status === "error") return <div className="pt-8"><DataNotice /></div>;
    return (
      <div className="pt-8 flex flex-col gap-3">
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21]">환전 수수료 아끼는 법</h1>
        <p className="m-0 text-[16px] leading-[1.75] text-[#3C424A]">환율과 은행 공시를 받아 오는 중입니다. 확인되지 않은 수수료는 표시하지 않습니다.</p>
      </div>
    );
  }

  const get = (c: typeof usd, k: FeeChannel["key"]) => c?.rows.find((r) => r.key === k);
  const ua = get(usd, "airport");
  const uc = get(usd, "counter");
  const up = get(usd, "app");
  const ladderU = prefLadder(d, "USD", usdMeta.sample);
  const ladderJ = prefLadder(d, "JPY", jpyMeta.sample);
  const sellU = sellChannels(d, "USD", 100);
  const sellJ = sellChannels(d, "JPY", 10000);
  const conds = prefConditions(d, "USD");
  const faq = feeFaq(d);

  return (
    <div className="flex flex-col gap-10 pt-6 sm:pt-8">
      <header className="flex flex-col gap-3">
        <div className="text-[13px] font-bold text-[#1F4E79]">
          {usd.base.label} · {usd.base.when} · 은행연합회 외환길잡이 공시
        </div>
        <h1 className="m-0 text-[30px] sm:text-[40px] font-extrabold tracking-[-0.035em] text-[#1A1D21] leading-tight">
          환전 수수료 아끼는 법 · 달러·엔화 환율 우대
        </h1>
        <p className="m-0 text-[16px] sm:text-[17px] leading-[1.75] text-[#3C424A] max-w-[72ch]">
          같은 1,000달러라도 어디서 바꾸느냐에 따라 수수료가 달라집니다. 오늘 기준으로{" "}
          {ua ? <>인천공항 창구는 약 <b className="text-[#B4532A]">{won(ua.fee)}원</b>, </> : null}
          {uc ? <>우대 없는 은행 창구는 {won(uc.fee)}원, </> : null}
          {up ? <>은행 앱 최대 우대는 <b className="text-[#1F4E79]">{won(up.fee)}원</b>, </> : null}
          환율 100% 우대 통장은 <b className="text-[#2E7D5B]">0원</b>입니다.
          {ua && up && up.fee > 0 ? ` 공항 창구 수수료가 앱 최대 우대의 약 ${Math.round(ua.fee / up.fee)}배입니다.` : ""}
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <H2 id="usd" lead="공항과 은행 창구는 공시 수수료율 중간값(우대 없음), 은행 앱은 공시 최대 우대로 가장 적게 내는 은행입니다. 100% 우대는 그 은행이 고시하는 기준 환율로 사는 값이라 기준 환율이 다르면 금액도 달라집니다.">
          달러 환전 수수료 — 1,000달러, 어디서 바꾸면 얼마
        </H2>
        <ChannelTable rows={usd.rows} amountText="1,000달러" />
      </section>

      {jpy ? (
        <section className="flex flex-col gap-4">
          <H2 id="jpy" lead={`엔화는 100엔당 ${won(jpy.base.rate, 2)}원(${jpy.base.when}) 기준입니다. 일본 여행 한 번에 흔히 바꾸는 10만 엔으로 계산했습니다.`}>
            엔화 환전 수수료 — 10만 엔, 어디서 바꾸면 얼마
          </H2>
          <ChannelTable rows={jpy.rows} amountText="10만 엔" />
        </section>
      ) : null}

      <BandAd />

      {ladderU.length ? (
        <section className="flex flex-col gap-4">
          <H2 id="pref" lead="환율 우대는 환율을 깎는 것이 아니라 수수료를 깎습니다. 우대 90%면 수수료의 10%만 내고, 100%면 기준 환율 그대로 삽니다. 수수료율은 은행 공시 중간값입니다.">
            환율 우대율별 수수료 — 달러·엔화
          </H2>
          <TableWrap min={340}>
            <thead>
              <tr>
                <th className={th}>환율 우대</th>
                <th className={`${th} text-right`}>1,000달러 수수료</th>
                <th className={`${th} text-right`}>10만 엔 수수료</th>
              </tr>
            </thead>
            <tbody>
              {ladderU.map((r, i) => (
                <tr key={r.pref}>
                  <td className={`${td} font-semibold text-[#1A1D21]`}>{r.pref === 0 ? "우대 없음" : `${r.pref}%`}</td>
                  <td className={`${td} text-right`}>{won(r.fee)}원</td>
                  <td className={`${td} text-right`}>{ladderJ[i] ? `${won(ladderJ[i].fee)}원` : ""}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </section>
      ) : null}

      {conds.length ? (
        <section className="flex flex-col gap-4">
          <H2 id="conditions" lead="은행이 은행연합회에 공시한 기본 우대율, 최대 우대율과 그 조건 원문입니다. 최대 우대에는 앱 환전·금액·거래 실적 같은 조건이 붙습니다. 조건은 통화와 관계없이 은행마다 같고, 통화별 수수료율은 은행 비교에 있습니다.">
            은행별 환율 우대 받는 조건
          </H2>
          <div className="flex flex-col divide-y divide-[#E2DFD7] border border-[#E2DFD7] bg-white rounded-[16px] overflow-hidden">
            {conds.map((b) => (
              <details key={b.bank} className="group px-5 sm:px-6 py-3.5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="flex items-baseline gap-2 min-w-0">
                    <h3 className="m-0 text-[15.5px] font-bold text-[#1A1D21] whitespace-nowrap">{b.bank}</h3>
                    <span className="text-[13.5px] text-[#5B616A] tabular-nums">
                      기본 {b.basePref}% → 최대 {maxLabel(b)}
                    </span>
                  </span>
                  <span className="text-[#9CA1A8] group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <div className="mt-2.5 text-[14px] leading-[1.75] text-[#3C424A] whitespace-pre-line">
                  {b.maxPrefText && b.maxPrefText.includes("\n") ? `${b.maxPrefText.replace(/\n/g, " ")}\n` : ""}
                  {b.note || "공시된 추가 조건이 없습니다."}
                  {b.asOf ? <div className="mt-1.5 text-[12px] text-[#9CA1A8]">공시 기준일 {asOfLabel(b.asOf, d.updatedAt)}</div> : null}
                </div>
              </details>
            ))}
          </div>
          <a href="/fx/banks" className="self-start text-[14px] font-semibold text-[#1F4E79] underline underline-offset-2">
            통화별 은행 수수료 순위 보기
          </a>
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <H2 id="toss" lead={`공시 대상이 아닌 상품이라 토스뱅크 상품 안내 페이지(${korDate(TOSS_FX.checked)} 확인)에 적힌 내용만 옮겼습니다.`}>
          환율 100% 우대 — {TOSS_FX.name}
        </H2>
        <KV
          rows={[
              ["환율 우대", "외화 살 때·팔 때 모두 100% (토스 앱에 고시된 환율 기준)"],
              ["통화", `${TOSS_FX.currencies}종 — 달러·유로·엔화·파운드·위안화·베트남 동·대만 달러 등`],
              ["환전 입금 한도", TOSS_FX.limit],
              ["가입 대상", TOSS_FX.who],
              ["해외 결제", "토스뱅크 체크카드 결제 계좌로 쓰면 해외 결제 수수료 면제(2026년 8월 11일부터 별도 고지 전까지)"],
              ["유의", "토스뱅크 매매기준율은 다른 은행과 다를 수 있다고 안내합니다. 외화보통예금(외화 입출금 통장)이라 창구에서 현찰을 사는 것과는 방식이 다릅니다."],
            ]}
        />
      </section>

      {sellU ? (
        <section className="flex flex-col gap-4">
          <H2 id="sell" lead="여행에서 남은 외화를 원화로 바꿀 때도 수수료가 붙습니다. 은행연합회 우대율 공시는 살 때 기준이라, 은행 창구는 우대 없이 계산했습니다.">
            남은 외화 팔 때 받는 원화
          </H2>
          <TableWrap min={340}>
            <thead>
              <tr>
                <th className={thTight}>파는 곳</th>
                <th className={`${thTight} text-right`}>100달러</th>
                <th className={`${thTight} text-right`}>1만 엔</th>
              </tr>
            </thead>
            <tbody>
              {sellU.rows.map((r) => {
                const j = sellJ?.rows.find((x) => x.label === r.label);
                return (
                  <tr key={r.label}>
                    <td className={tdTight.replace("whitespace-nowrap", "whitespace-normal")}>
                      <div className="font-semibold text-[#1A1D21]">{r.label.split(" · ")[0]}</div>
                      <div className="text-[12px] text-[#9CA1A8]">
                        {r.label.split(" · ").slice(1).concat(`수수료 ${pct(r.feeRate)}`).join(" · ")}
                      </div>
                    </td>
                    <td className={`${tdTight} text-right`}>{won(r.get)}원</td>
                    <td className={`${tdTight} text-right`}>{j ? `${won(j.get)}원` : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </section>
      ) : null}

      <section className="flex flex-col gap-4">
        <H2 id="customs" lead={`관세청 출·입국 외환신고 안내(${korDate(CUSTOMS_FX.checked)} 확인) 기준입니다.`}>
          외화 1만 달러 넘게 가져가면 세관 신고
        </H2>
        <KV
          rows={[
              ["출국", "외화·원화·원화 자기앞수표를 모두 합해 미화 1만 달러 이하는 신고 없이 가지고 나갑니다. 일반 여행자가 1만 달러를 넘게 가지고 나가려면 관할 세관에 신고합니다."],
              ["입국", "모두 합해 미화 1만 달러를 넘으면 여행자휴대품신고서에 외화 신고를 하고 외국환 신고필증을 받습니다. 입국장을 나간 뒤에는 필증을 받을 수 없습니다."],
              ["신고하지 않으면", "위반 금액이 미화 3만 달러 이하면 과태료, 넘으면 1년 이하 징역 또는 1억 원 이하 벌금입니다."],
            ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <H2 id="faq">환전 수수료·환율 우대, 자주 묻는 질문</H2>
        <FaqList items={faq} />
      </section>

      <section className="flex flex-col gap-4">
        <H2>통화별 환율과 은행 수수료</H2>
        <CurrencyChips rates={Object.fromEntries((d.rates ?? []).map((r) => [r.code, { rate: r.rate, unit: r.unit }]))} />
      </section>

      <SourceNote>
        수수료율·우대율:{" "}
        <a href={d.banks?.sourceUrl ?? "https://exchange.kfb.or.kr/page/on_commission.php"} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
          전국은행연합회 외환길잡이
        </a>{" "}
        은행별 인터넷환전 우대율·인천공항점 공시(은행별 기준일이 다름). 100% 우대:{" "}
        <a href={TOSS_FX.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
          토스뱅크 외화통장 상품 안내
        </a>
        ({korDate(TOSS_FX.checked)} 확인). 세관 신고:{" "}
        <a href={CUSTOMS_FX.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
          관세청 출·입국 외환신고
        </a>
        . 금액은 {usd.base.label}({usd.base.when})에 수수료율을 곱해 계산했습니다. 실제 적용 환율은 거래 시점 은행 고시와 조건에 따릅니다.
      </SourceNote>
    </div>
  );
}
