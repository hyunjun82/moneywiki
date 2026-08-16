import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";

/**
 * /gold/news — 금시세 일일 기사 목록.
 * 날짜가 붙는 건 기사뿐이고, 검색 트래픽이 쌓이는 허브는 /gold 다.
 */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금시세 뉴스 — 날짜별 오늘의 금값 정리",
  description:
    "매일 아침 발행되는 금시세 기사입니다. 순금 24K 살 때·팔 때, KRX 도매 종가, 국제 금값을 날짜별로 확인하세요.",
  alternates: { canonical: "/gold/news" },
};

interface Row {
  date: string;
  title: string;
  description: string;
}

function listDocs(): Row[] {
  const dir = path.join(process.cwd(), "src/data/gold-news");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse()
    .slice(0, 90)
    .map((f) => {
      const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      return { date: j.date, title: j.title, description: j.description };
    });
}

export default function GoldNewsListPage() {
  const docs = listDocs();
  return (
    <div className="flex flex-col gap-7 pt-6">
      <header className="flex flex-col gap-2">
        <h1 className="m-0 text-[26px] sm:text-[36px] font-extrabold tracking-[-0.02em] text-[#1A1D21]">
          금시세 뉴스
        </h1>
        <p className="m-0 text-[16px] text-[#6C727B]">
          매일 아침 6시에 그날의 금값을 정리해 발행합니다.
        </p>
      </header>

      {docs.length === 0 ? (
        <div className="bg-white border border-[#E2DFD7] rounded-[18px] p-8 text-center text-[15px] text-[#6C727B]">
          첫 기사가 곧 발행됩니다.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {docs.map((d) => (
            <Link
              key={d.date}
              href={`/gold/news/${d.date}`}
              className="bg-white border border-[#E2DFD7] rounded-[16px] px-6 py-5 flex flex-col gap-1.5 hover:border-[#D4AF37] transition-colors"
            >
              <span className="text-[18px] sm:text-[20px] font-bold tracking-[-0.02em] text-[#1A1D21]">
                {d.title}
              </span>
              <span className="text-[14px] text-[#6C727B] line-clamp-2">{d.description}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
