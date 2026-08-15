"use client";

import {
  BandAd,
  Card,
  CrossLinks,
  DataNotice,
  Delta,
  FooterNote,
  GoldCta,
  Hero,
  PriceTable,
  SectionHead,
  SideAd,
  Skeleton,
  type TableRow,
} from "./ui";
import {
  dirMark,
  gold24,
  korDate,
  korDateTime,
  perGram,
  usePrice,
  won,
} from "./priceData";

/** gold-buy.html 시안을 옮긴 페이지. */
export default function BuyView() {
  const { data, status } = usePrice();
  const g24 = gold24(data);
  const retail = data?.retail;
  const buy = g24?.userBuy;
  const sell = g24?.userSell;

  const rows: TableRow[] = (retail?.items ?? []).map((it) => {
    const q = it.userBuy;
    return {
      name: it.name,
      don: q ? won(q.price) : null,
      gram: q ? won(perGram(q.price)) : null,
      last: q ? (
        <Delta change={q.change} dir={q.dir} />
      ) : (
        <span className="text-[13px] font-normal text-[#9CA1A8]">매장문의</span>
      ),
    };
  });

  // 시안에는 "약 12~15% 차이"가 박혀 있었지만 데이터에 없는 값이다. 오늘 값으로 계산한다.
  const gap = buy && sell ? buy.price - sell.price : null;
  const gapPct = gap && buy ? (gap / buy.price) * 100 : null;

  const tips = [
    gap && gapPct
      ? `살 때 가격은 부가세 별도로 고시된 값이며, 오늘 팔 때 가격과 ${won(gap)}원(살 때 대비 ${gapPct.toFixed(1)}%) 차이가 납니다.`
      : "살 때 가격은 부가세 별도로 고시된 값이라 실제 결제 금액은 이보다 높아집니다.",
    "골드바는 세공비가 없어 반지·목걸이보다 매입 시 손실이 적습니다.",
    "18K·14K는 순도 환산으로 계산되며 매장별 매입률이 다릅니다.",
  ];

  return (
    <div className="flex flex-col gap-7 pt-6">
      <Hero
        eyebrow="BUY GOLD · 살 때"
        title="금 살 때 가격"
        lead="소비자가 매장에서 금을 구입할 때 지불하는 가격입니다. 고시가는 부가세 별도 기준이며, 공임은 제품에 따라 추가됩니다."
        aside={
          <div className="bg-[linear-gradient(145deg,#F7E7B0_0%,#E3C15C_32%,#D4AF37_66%,#A8801A_100%)] rounded-[22px] p-7 flex flex-col gap-3.5 shadow-[0_24px_50px_rgba(0,0,0,.35)]">
            <span className="text-[13px] font-bold tracking-[0.06em] text-[#4A3400]">
              순금 24K · 1돈(3.75g) 살 때
            </span>
            {buy ? (
              <>
                <div className="flex items-end gap-2">
                  <span className="text-[42px] sm:text-[54px] font-extrabold leading-[.95] tracking-[-0.03em] text-[#17181C] tabular-nums">
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
                    {retail?.quoteDate ? `${korDate(retail.quoteDate)} 기준` : ""}
                  </span>
                </div>
              </>
            ) : (
              <Skeleton className="w-[200px] h-12" />
            )}
          </div>
        }
      />

      {status === "error" ? <DataNotice /> : null}

      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-7 items-start">
        <Card className="p-[26px] flex flex-col gap-4">
          <SectionHead title="품목별 살 때 가격" />
          <PriceTable head="품목" rows={rows} lastLabel="전일비" />
          <span className="text-[14px] text-[#9CA1A8]">
            {retail?.note ?? "고시가는 부가세 별도입니다."} 세공비는 디자인에 따라 추가됩니다.
          </span>
        </Card>

        <div className="flex flex-col gap-5">
          <SideAd />
          <TipsBox tips={tips} />
          <GoldCta href="/gold/calculator" label="금 계산기로 계산하기" />
        </div>
      </section>

      <BandAd />

      <CrossLinks
        primary={{
          href: "/gold/sell",
          title: "금 팔 때 가격 보기",
          sub: sell ? `24K 1돈 ${won(sell.price)}원` : "순도별 매입가",
        }}
        secondary={{ href: "/gold", title: "오늘의 시세 홈", sub: "국내·국제 한눈에" }}
      />

      <FooterNote
        text="표시 가격은 참고용이며 실제 거래가는 매장·시점에 따라 다릅니다."
        updatedAt={korDateTime(data?.updatedAt)}
      />
    </div>
  );
}

function TipsBox({ tips }: { tips: string[] }) {
  return (
    <Card className="p-[22px] flex flex-col gap-3">
      <span className="text-[21px] font-bold tracking-[-0.02em] text-[#1A1D21]">살 때 알아두기</span>
      {tips.map((t) => (
        <div key={t} className="flex gap-2.5 items-start">
          <span className="text-[#C79A22] font-bold shrink-0">·</span>
          <span className="text-[15px] leading-[1.7] text-[#3C424A]">{t}</span>
        </div>
      ))}
    </Card>
  );
}
