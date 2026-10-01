import type { Metadata } from "next";
import { listFxNewsDates, loadFxNews } from "@/components/fx/newsData";
import { Crumbs } from "@/components/fx/parts";

/**
 * /fx/news — 환율 일일 기사 목록. 검색이 쌓이는 허브는 /fx, 날짜가 붙는 건 기사뿐이다.
 */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "환율 기사 — 날짜별 오늘 환율·달러·엔화 정리" },
  description:
    "평일 매매기준율이 확정되는 오전에 발행하는 환율 기사입니다. 달러·엔화·유로·베트남 동의 전일 대비와 1년 위치, 오늘 환전하면 창구·앱·인천공항에서 낼 원화를 날짜별로 정리합니다.",
  alternates: { canonical: "/fx/news" },
};

export default function FxNewsListPage() {
  const docs = listFxNewsDates()
    .slice(0, 120)
    .map((d) => loadFxNews(d))
    .filter((x): x is NonNullable<typeof x> => x !== null);
  return (
    <div className="flex flex-col gap-7 pt-6 sm:pt-8 max-w-[880px]">
      <header className="flex flex-col gap-2">
        <Crumbs items={[{ name: "오늘 환율", href: "/fx" }, { name: "환율 기사" }]} />
        <h1 className="m-0 text-[28px] sm:text-[36px] font-extrabold tracking-[-0.03em] text-[#1A1D21]">환율 기사</h1>
        <p className="m-0 text-[16px] leading-[1.7] text-[#5B616A]">
          평일 오전, 그날 매매기준율이 확정된 뒤 달러·엔화·유로·베트남 동 환율과 오늘 환전하면 낼 원화를 정리해 발행합니다.
        </p>
      </header>
      {docs.length === 0 ? (
        <div className="bg-white border border-[#E2DFD7] rounded-[18px] p-8 text-center text-[15px] text-[#6C727B]">
          첫 기사가 곧 발행됩니다.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {docs.map((d) => (
            <a
              key={d.date}
              href={`/fx/news/${d.date}`}
              className="bg-white border border-[#E2DFD7] rounded-[16px] px-5 sm:px-6 py-5 flex flex-col gap-1.5 hover:border-[#1F4E79] transition-colors"
            >
              <span className="text-[17px] sm:text-[19px] font-bold tracking-[-0.02em] text-[#1A1D21]">{d.title}</span>
              <span className="text-[14px] text-[#6C727B] line-clamp-2">{d.description}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
