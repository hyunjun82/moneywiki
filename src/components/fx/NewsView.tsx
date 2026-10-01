/**
 * /fx/news/<날짜> — 환율 일일 기사 화면 (서버 컴포넌트, 정적). 데이터는 newsData.FxNewsDoc.
 */

import { BandAd, ChangeBadge } from "./ui";
import { korDate } from "./fxCore";
import { CurrencyChips, Crumbs, FaqList, Flag, H2, LineChart, SourceNote, TableWrap, td, th } from "./parts";
import type { FxNewsDoc } from "./newsData";

export default function NewsView({ doc, prev, next }: { doc: FxNewsDoc; prev?: string | null; next?: string | null }) {
  const usd = doc.series?.USD?.map((p) => ({ date: p.d, rate: p.r })) ?? [];
  const jpy = doc.series?.JPY?.map((p) => ({ date: p.d, rate: p.r })) ?? [];
  const pub = doc.publishedAt ? `${korDate(doc.publishedAt)} ${doc.publishedAt.slice(11, 16)} 발행` : "";

  return (
    <article className="flex flex-col gap-9 pt-6 sm:pt-8 max-w-[880px]">
      <header className="flex flex-col gap-3">
        <Crumbs items={[{ name: "오늘 환율", href: "/fx" }, { name: "환율 기사", href: "/fx/news" }, { name: korDate(doc.date) }]} />
        <h1 className="m-0 text-[26px] sm:text-[34px] font-extrabold tracking-[-0.03em] text-[#1A1D21] leading-snug">{doc.title}</h1>
        <div className="text-[13px] text-[#6C727B]">
          {pub}
          {doc.basis ? ` · 기준 ${doc.basis.when} ${doc.basis.label}` : ""}
        </div>
        <p className="m-0 text-[16.5px] sm:text-[17.5px] leading-[1.85] text-[#1A1D21]">{doc.lead}</p>
      </header>

      {doc.cards?.length ? (
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {doc.cards.map((c) => (
            <a
              key={c.code}
              href={`/fx/${c.slug}`}
              className="bg-white border border-[#E2DFD7] rounded-[16px] p-4 flex flex-col gap-1.5 hover:border-[#1F4E79] transition-colors min-w-0"
            >
              <span className="flex items-center gap-2 text-[13.5px] font-bold text-[#3C424A]">
                <Flag code={c.code} size={15} />
                {c.name}
                <span className="text-[12px] font-medium text-[#9CA1A8]">{c.quote}</span>
              </span>
              <span className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.03em] text-[#1A1D21] tabular-nums">
                {c.rate.toLocaleString("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span>
                <ChangeBadge change={c.changePct ?? undefined} />
              </span>
            </a>
          ))}
        </section>
      ) : null}

      {usd.length > 1 || jpy.length > 1 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["달러", usd, "1달러"],
            ["엔화", jpy, "100엔"],
          ].map(([name, s, q]) =>
            (s as { date: string; rate: number }[]).length > 1 ? (
              <div key={name as string} className="bg-white border border-[#E2DFD7] rounded-[16px] p-4">
                <div className="text-[13.5px] font-bold text-[#3C424A]">
                  {name as string} 최근 1년 ({q as string}, 원)
                </div>
                <LineChart series={s as { date: string; rate: number }[]} label={`${name} 최근 1년 환율 그래프`} />
              </div>
            ) : null
          )}
        </section>
      ) : null}

      {doc.sections.map((s, i) => (
        <section key={s.heading} className="flex flex-col gap-3">
          <H2>{s.heading}</H2>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="m-0 text-[16px] leading-[1.85] text-[#1A1D21]">
              {p}
            </p>
          ))}
          {s.table ? (
            <>
              <TableWrap min={Math.max(420, s.table.head.length * 120)}>
                <thead>
                  <tr>
                    {s.table.head.map((h, j) => (
                      <th key={h} className={`${th} ${j ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, j) => (
                        <td key={j} className={`${td} ${j ? "text-right" : "font-semibold text-[#1A1D21]"}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
              {s.table.note ? <p className="m-0 text-[13px] text-[#6C727B] leading-[1.7]">{s.table.note}</p> : null}
            </>
          ) : null}
          {i === 1 ? <BandAd /> : null}
        </section>
      ))}

      <section className="flex flex-col gap-3">
        <H2>환전 전에 계산해 보기</H2>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
          <a href="/fx/exchange-calculator" className="text-[#1F4E79] hover:underline underline-offset-2">환전 계산기 — 은행·우대율별 낼 원화 →</a>
          <a href="/fx/banks" className="text-[#1F4E79] hover:underline underline-offset-2">은행별 환전 수수료 비교 →</a>
          <a href="/fx/airport" className="text-[#1F4E79] hover:underline underline-offset-2">인천공항 환전 수수료 →</a>
        </div>
      </section>

      {doc.faq?.length ? (
        <section className="flex flex-col gap-3">
          <H2>오늘 환율, 자주 묻는 질문</H2>
          <FaqList items={doc.faq} />
        </section>
      ) : null}

      <section className="flex flex-col gap-3">
        <H2>통화별 오늘 환율</H2>
        <CurrencyChips />
      </section>

      <nav className="flex justify-between gap-3 text-[14.5px] font-semibold">
        {prev ? (
          <a href={`/fx/news/${prev}`} className="text-[#1F4E79] hover:underline underline-offset-2">← {korDate(prev)} 환율</a>
        ) : <span />}
        <a href="/fx/news" className="text-[#1F4E79] hover:underline underline-offset-2">환율 기사 목록</a>
        {next ? (
          <a href={`/fx/news/${next}`} className="text-[#1F4E79] hover:underline underline-offset-2">{korDate(next)} 환율 →</a>
        ) : <span />}
      </nav>

      {doc.sources?.length ? (
        <SourceNote>
          출처: {doc.sources.join(" · ")}. 숫자는 발행 시점 값이며 은행 창구의 실제 적용 환율은 거래 시점 고시와 우대 조건에 따릅니다.
          {doc.analysis ? " 해석 문단은 위 숫자만으로 작성했고, 문단 속 숫자는 발행 전에 데이터와 대조했습니다." : ""}
        </SourceNote>
      ) : null}
    </article>
  );
}
