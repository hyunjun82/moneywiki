"use client";

import {
  BandAd,
  Card,
  CrossLinks,
  DataNotice,
  FooterNote,
  GoldCta,
  Hero,
  PriceTable,
  SectionHead,
  SideAd,
  Skeleton,
  TipsCard,
  type TableRow,
} from "./ui";
import {
  buybackRate,
  dirMark,
  gold24,
  korDate,
  korDateTime,
  perGram,
  usePrice,
  won,
} from "./priceData";

/** gold-sell.html 시안을 옮긴 페이지. */
export default function SellView() {
  const { data, status } = usePrice();
  const g24 = gold24(data);
  const retail = data?.retail;
  const sell = g24?.userSell;
  const buy = g24?.userBuy;

  const rows: TableRow[] = (retail?.items ?? []).map((it) => {
    const q = it.userSell;
    // 시안의 매입률(98%·92%·88%)은 데이터에 없는 값이라 쓰지 않는다.
    // 매입가 ÷ (순금 매입가 × 함량) 으로 오늘 값에서 직접 계산한다.
    const rate = buybackRate(q?.price, sell?.price, it.key);
    return {
      name: it.name,
      don: q ? won(q.price) : null,
      gram: q ? won(perGram(q.price)) : null,
      last: rate ? (
        <span className="text-[#8A6A16]">{rate.toFixed(1)}%</span>
      ) : (
        <span className="text-[13px] font-normal text-[#9CA1A8]">—</span>
      ),
    };
  });

  const diff = buy && sell ? sell.price - buy.price : null;
  const diffPct = diff && buy ? (Math.abs(diff) / buy.price) * 100 : null;

  return (
    <div className="flex flex-col gap-7 pt-6">
      <Hero
        eyebrow="SELL GOLD · 팔 때"
        title="금 팔 때 가격"
        lead="보유한 금을 매장에 매도할 때 받는 금액입니다. 순도 감정과 매입 수수료가 반영된 실수령 기준가입니다."
        aside={
          <div className="bg-[#1E2026] border-[1.5px] border-[rgba(212,175,55,.55)] rounded-[22px] p-7 flex flex-col gap-3.5 shadow-[0_24px_50px_rgba(0,0,0,.35)]">
            <span className="text-[13px] font-bold tracking-[0.06em] text-[#D4AF37]">
              순금 24K · 1돈(3.75g) 팔 때
            </span>
            {sell ? (
              <>
                <div className="flex items-end gap-2">
                  <span className="text-[42px] sm:text-[54px] font-extrabold leading-[.95] tracking-[-0.03em] text-white tabular-nums">
                    {won(sell.price)}
                  </span>
                  <span className="text-[21px] font-bold text-[#E3C15C] pb-1">원</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {sell.change ? (
                    <span className="bg-[linear-gradient(140deg,#F3DE9C,#D4AF37)] text-[#17181C] text-[14px] font-bold px-3 py-1.5 rounded-full tabular-nums">
                      {dirMark(sell.dir)} {won(Math.abs(sell.change))}
                      {sell.price - sell.change > 0
                        ? ` (${((sell.change / (sell.price - sell.change)) * 100).toFixed(2)}%)`
                        : ""}
                    </span>
                  ) : null}
                  <span className="text-[14px] text-[#9CA1A8]">
                    {retail?.quoteDate ? `${korDate(retail.quoteDate)} 기준` : ""}
                  </span>
                </div>
                {diff && diffPct ? (
                  <>
                    <div className="h-px bg-[rgba(212,175,55,.25)]" />
                    <span className="text-[14px] text-[#9CA1A8]">
                      살 때 대비{" "}
                      <span className="text-[#E3C15C] font-bold tabular-nums">
                        {won(diff)}원 ({diffPct.toFixed(1)}%)
                      </span>
                    </span>
                  </>
                ) : null}
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
          <SectionHead title="순도별 매입 가격" />
          <PriceTable head="순도" rows={rows} lastLabel="매입률" />
          <span className="text-[14px] text-[#9CA1A8]">
            매입률은 오늘 고시된 매입가를 순금 매입가와 각인 함량(24K 99.9% · 18K 75% · 14K
            58.5%)으로 나눈 값입니다. 감정 결과에 따라 실제 매입가는 달라질 수 있습니다.
          </span>
        </Card>

        <div className="flex flex-col gap-5">
          <SideAd />
          <TipsCard
            title="팔 때 체크리스트"
            tips={[
              "제품 금은 순도 감정 후 매입되며, 도금·용접 부위는 중량에서 제외됩니다.",
              "보증서나 각인(999·750 등)이 있으면 감정이 수월합니다.",
              "매도 금액이 크면 신분증 확인과 거래 내역 기록이 필요합니다.",
            ]}
          />
          <GoldCta href="/gold/calculator" label="내 금 매도가 계산하기" />
        </div>
      </section>

      <BandAd />

      <CrossLinks
        primary={{
          href: "/gold/buy",
          title: "금 살 때 가격 보기",
          sub: buy ? `24K 1돈 ${won(buy.price)}원` : "품목별 판매가",
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
