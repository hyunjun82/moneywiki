"use client";

import {
  BandAd,
  Card,
  CrossLinks,
  FooterNote,
  SectionHead,
  SideAd,
  PriceTable,
  type TableRow,
} from "./ui";
import { dirMark, dirColor, korDateTime, perGram, usePrice, won, gold24 } from "./priceData";

/** 일일 기사 JSON의 형태 (scripts/gold/generate-news.mjs 가 생성) */
export interface NewsDoc {
  date: string;
  title: string;
  description: string;
  updatedAt?: string | null;
  quoteDate?: string | null;
  retail?: {
    note?: string;
    items?: {
      key: string;
      name: string;
      userSell: { price: number; change: number; dir: "up" | "down" | "none" } | null;
      userBuy: { price: number; change: number; dir: "up" | "down" | "none" } | null;
    }[];
  } | null;
  krx?: {
    latest?: {
      date: string;
      krwPerGram: number;
      krwPerDon: number;
      change: number;
      changePct: number;
    };
    note?: string | null;
  } | null;
  fx?: { usdkrw?: number } | null;
  intl?: {
    gold?: { usdPerOz: number; changePct: number; dir: "up" | "down" | "none"; krwPerDon: number };
    silver?: { usdPerOz: number; changePct: number; dir: "up" | "down" | "none"; krwPerDon: number };
  } | null;
  /** v2: 독자 훅 리드 문단 */
  lead?: string;
  /** v2: 소제목(H2) 섹션 구조 */
  sections?: { heading: string; paragraphs: string[] }[];
  paragraphs: string[];
  sources?: string[];
}

/** 기사 상단 — 살 때 / 팔 때 / 계산기 버튼 3개 */
function QuickButtons({ buy, sell }: { buy?: number | null; sell?: number | null }) {
  const items = [
    { href: "/gold/buy", label: "금 살 때", sub: buy ? `${won(buy)}원` : "가격 보기" },
    { href: "/gold/sell", label: "금 팔 때", sub: sell ? `${won(sell)}원` : "가격 보기" },
    { href: "/gold/calculator", label: "금 계산기", sub: "내 금 계산" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          className="bg-[linear-gradient(145deg,#F5E3A6_0%,#E0BE55_45%,#C79A22_100%)] rounded-[14px] px-3 py-3.5 sm:px-5 sm:py-4 flex flex-col items-center gap-0.5 text-[#17181C] hover:brightness-105 transition-[filter]"
        >
          <span className="text-[15px] sm:text-[17px] font-extrabold tracking-[-0.02em]">
            {it.label}
          </span>
          <span className="text-[12px] sm:text-[13px] font-semibold opacity-80 tabular-nums">
            {it.sub}
          </span>
        </a>
      ))}
    </div>
  );
}

/** /gold/news/[date] 본문. 기사 숫자는 발행 시점 스냅샷, 상단 배지는 실시간. */
export default function NewsView({ doc }: { doc: NewsDoc }) {
  const { data } = usePrice();
  const liveG24 = gold24(data);
  const g24 = doc.retail?.items?.find((it) => it.key === "gold24");

  const rows: TableRow[] = (doc.retail?.items ?? []).map((it) => {
    const q = it.userSell;
    return {
      name: it.name,
      don: q ? won(q.price) : null,
      gram: q ? won(perGram(q.price)) : null,
      last: q ? (
        <span className="tabular-nums font-bold" style={{ color: dirColor(q.dir) }}>
          {dirMark(q.dir)} {q.change ? won(Math.abs(q.change)) : ""}
        </span>
      ) : (
        <span className="text-[13px] font-normal text-[#9CA1A8]">매장문의</span>
      ),
    };
  });

  return (
    <article className="flex flex-col gap-7 pt-6">
      <header className="flex flex-col gap-4">
        <h1 className="m-0 text-[26px] sm:text-[36px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#1A1D21]">
          {doc.title}
        </h1>
        <p className="m-0 text-[15px] text-[#6C727B]">
          {doc.date} 발행
          {liveG24?.userBuy?.price ? (
            <>
              {" · 지금 살 때 "}
              <strong className="text-[#8A6A16] tabular-nums">
                {won(liveG24.userBuy.price)}원
              </strong>
              {liveG24.userSell?.price ? (
                <>
                  {" · 팔 때 "}
                  <strong className="text-[#8A6A16] tabular-nums">
                    {won(liveG24.userSell.price)}원
                  </strong>
                </>
              ) : null}
              <span className="text-[13px]"> (실시간)</span>
            </>
          ) : null}
        </p>
        <QuickButtons buy={g24?.userBuy?.price} sell={g24?.userSell?.price} />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-7 items-start">
        <div className="flex flex-col gap-7">
          {doc.sections?.length ? (
            <Card className="p-[26px] flex flex-col gap-6">
              {doc.lead ? (
                <p className="m-0 text-[17px] leading-[1.85] text-[#1A1D21] font-medium">
                  {doc.lead}
                </p>
              ) : null}
              {doc.sections.map((s) => (
                <section key={s.heading} className="flex flex-col gap-3.5">
                  <h2 className="m-0 flex items-center gap-2.5 text-[20px] sm:text-[23px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
                    <span className="w-2 h-5 rounded-[4px] bg-gradient-to-b from-[#F3DE9C] to-[#C79A22] shrink-0" />
                    {s.heading}
                  </h2>
                  {s.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 24)}
                      className="m-0 text-[16px] leading-[1.85] text-[#3C424A]"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </Card>
          ) : (
            <Card className="p-[26px] flex flex-col gap-5">
              {doc.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="m-0 text-[16px] leading-[1.85] text-[#3C424A]">
                  {p}
                </p>
              ))}
            </Card>
          )}

          {rows.length > 0 ? (
            <Card className="p-[26px] flex flex-col gap-4">
              <SectionHead title="오늘 팔 때 가격 한눈에" note="원/돈 기준" />
              <PriceTable head="품목" rows={rows} lastLabel="전일비" />
              {doc.retail?.note ? (
                <span className="text-[14px] text-[#9CA1A8]">{doc.retail.note}</span>
              ) : null}
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <SideAd />
          {doc.sources?.length ? (
            <Card className="p-[22px] flex flex-col gap-2.5">
              <span className="text-[17px] font-bold text-[#1A1D21]">자료 출처</span>
              {doc.sources.map((s) => (
                <span key={s} className="text-[13px] leading-[1.6] text-[#6C727B]">
                  · {s}
                </span>
              ))}
            </Card>
          ) : null}
        </div>
      </section>

      <BandAd />

      <CrossLinks
        primary={{ href: "/gold", title: "오늘의 시세 홈", sub: "국내·국제 한눈에" }}
        secondary={{ href: "/gold/news", title: "지난 금시세 뉴스", sub: "날짜별 보기" }}
      />

      <FooterNote
        text="기사 숫자는 발행 시점 고시가 기준이며, 장중 시세는 상단 실시간 표시를 참고하세요."
        updatedAt={korDateTime(data?.updatedAt ?? doc.updatedAt ?? undefined)}
      />
    </article>
  );
}
