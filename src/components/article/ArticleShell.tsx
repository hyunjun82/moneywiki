import Link from "next/link";
import "@/app/article-v3.css";
import { RichText } from "./RichText";
import { ProgressBar } from "./ProgressBar";
import { ReactionBar } from "./ReactionBar";
import { SectionWidgetRenderer } from "./SectionWidgets";
import { MobileJumpChips } from "./MobileJumpChips";
import { MobileStickyCta } from "./MobileStickyCta";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
  HowToSchema,
} from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import type {
  ArticleData,
  MainSection,
  CompareCell,
  FaqItem,
} from "@/data/articles/types";

interface Props {
  data: ArticleData;
}

const SITE = "https://www.jjyu.co.kr";

/**
 * ArticleShell — 글 페이지 v3 디자인 (3컬럼 + SGE 강화 13요소)
 *
 * 레이아웃: TOC(220) | 본문(720) | 광고 sticky(280)
 * 모바일: 본문 1컬럼 (TOC, 광고 사이드 숨김)
 */
export function ArticleShell({ data }: Props) {
  const url = `${SITE}/w/${data.slug}`;
  const author = data.meta.author ?? {
    name: "머니위키 에디터",
    avatarChar: "M",
  };
  const publishedAt = data.meta.publishedAt ?? data.lastVerified;

  // ── 스키마용 데이터 변환 ──
  const howToSteps = data.resolution.steps.map((s) => ({
    name: s.title,
    text: s.body,
  }));
  const faqFromMain = data.mainSections.map((s) => ({
    question: s.heading,
    answer: (s.highlight ? s.highlight + " " : "") + s.body,
  }));
  const faqFromList = data.context?.faqList ?? [];
  const faqItems = [...faqFromMain, ...faqFromList];
  const breadcrumb = [
    { name: "홈", url: SITE },
    { name: data.category, url: `${SITE}/category/${encodeURIComponent(data.category)}` },
    { name: data.meta.title, url },
  ];

  return (
    <div className="article-v3">
      {/* ── JSON-LD ── */}
      <ArticleSchema
        title={data.meta.title}
        description={data.meta.description}
        url={url}
        datePublished={publishedAt}
        dateModified={data.lastVerified}
        author={author.name}
        category={data.category}
      />
      <BreadcrumbSchema items={breadcrumb} />
      {howToSteps.length > 0 && (
        <HowToSchema
          name={data.meta.title}
          description={data.searchIntent.directAnswer}
          steps={howToSteps}
        />
      )}
      {faqItems.length > 0 && <FAQSchema items={faqItems} />}

      <ProgressBar />

      <div className="layout">
        {/* ── LEFT: TOC ── */}
        <TocSide sections={data.mainSections} hasFaq={faqItems.length > 0} />

        {/* ── MIDDLE: Article ── */}
        <article className="article">
          <Breadcrumb category={data.category} title={data.meta.title} />
          <span className="cat-pill">{data.category}</span>
          <ArticleTitle title={data.meta.title} subtitle={data.meta.subtitle} />
          <p className="article-sub">{data.meta.description}</p>

          <MetaRow
            author={author}
            publishedAt={publishedAt}
            sources={data.sources}
          />

          <Bluf
            answer={data.searchIntent.directAnswer}
            why={data.searchIntent.why}
          />

          {/* 모바일 전용 점프 칩 (TOC가 모바일에서 숨겨지므로) */}
          <MobileJumpChips sections={data.mainSections} />

          {data.mainSections.map((s, i) => (
            <MainSectionV3 key={i} index={i} section={s} />
          ))}

          {/* 첫 광고: 본문 H2 1~2개 후 자연스러운 위치 */}
          <AdSlot slot="hero" />

          {/* FAQ */}
          {data.context?.faqList && data.context.faqList.length > 0 && (
            <FaqSection items={data.context.faqList} />
          )}

          {/* 출처 + 면책 */}
          <SourcesBlock
            sources={data.sources}
            lastVerified={data.lastVerified}
            disclaimer={data.context?.disclaimer}
          />

          {/* 저자 카드 (E-E-A-T) */}
          {data.meta.author && <AuthorCard author={data.meta.author} />}

          {/* 사용자 평가 (Google 신호) */}
          <ReactionBar />

          {/* 관련 글 */}
          {data.relatedQuestions && data.relatedQuestions.length > 0 && (
            <RelatedBlock items={data.relatedQuestions} />
          )}
        </article>

        {/* ── RIGHT: 광고 sticky ── */}
        <aside className="ad-side">
          <div className="ad-sticky">
            <span className="label-sp">SPONSORED</span>
            <AdSlot slot="top" />
          </div>
        </aside>
      </div>

      {/* 모바일 하단 끈끈한 CTA (토스 표준) */}
      <MobileStickyCta
        calcSlug={findRelevantCalculator(data.category)}
        calcLabel={`${data.category} 계산기`}
      />
    </div>
  );
}

/** 카테고리 → 가장 관련 깊은 계산기 slug (간단 매핑) */
function findRelevantCalculator(category: string): string {
  const map: Record<string, string> = {
    퇴직금: "퇴직금-계산기",
    실업급여: "실업급여-계산기",
    연말정산: "연말정산-계산기",
    부동산: "양도소득세-계산기",
    근로: "연봉-실수령액-계산기",
    세금: "연말정산-계산기",
    금융: "대출이자-계산기",
  };
  return map[category] ?? "퇴직금-계산기";
}

/* ───────── TOC ───────── */
function TocSide({ sections, hasFaq }: { sections: MainSection[]; hasFaq: boolean }) {
  return (
    <aside className="toc-side">
      <div className="toc-card">
        <div className="ttl">목차</div>
        <ul className="toc-list">
          {sections.map((s, i) => (
            <li key={i}>
              <a href={`#s${i + 1}`}>{s.heading}</a>
            </li>
          ))}
          {hasFaq && (
            <li>
              <a href="#faq">자주 묻는 질문</a>
            </li>
          )}
        </ul>
        <div className="toc-share">
          <a
            href="https://accounts.kakao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-share"
          >
            카톡 공유
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ───────── Breadcrumb ───────── */
function Breadcrumb({ category, title }: { category: string; title: string }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link href="/">홈</Link>
      <span className="sep">›</span>
      <Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>
      <span className="sep">›</span>
      <span className="cur">{title}</span>
    </nav>
  );
}

/* ───────── Title ───────── */
function ArticleTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <h1 className="article-title">
      {title}
      {subtitle && (
        <>
          <br />
          <span className="sub-line">{subtitle}</span>
        </>
      )}
    </h1>
  );
}

/* ───────── Meta Row ───────── */
function MetaRow({
  author,
  publishedAt,
  sources,
}: {
  author: NonNullable<ArticleData["meta"]["author"]>;
  publishedAt: string;
  sources: ArticleData["sources"];
}) {
  const primarySource = sources[0];
  return (
    <div className="meta-row">
      <div className="author">
        <span className="av">{author.avatarChar ?? "M"}</span>
        <div>
          <span className="name">{author.name}</span>
          {author.role && (
            <>
              {" "}
              <span style={{ color: "var(--ink-3)", fontSize: 12 }}>
                · {author.role}
              </span>
            </>
          )}
        </div>
      </div>
      <span className="dot" />
      <span>{publishedAt} 작성</span>
      {primarySource && (
        <>
          <span className="dot" />
          <span>
            출처 ·{" "}
            <b>
              <a
                href={primarySource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {primarySource.title}
              </a>
            </b>
            {sources.length > 1 && ` 외 ${sources.length - 1}건`}
          </span>
        </>
      )}
    </div>
  );
}

/* ───────── BLUF ───────── */
function Bluf({ answer, why }: { answer: string; why: string }) {
  return (
    <div className="bluf">
      <div className="lbl">결론 먼저</div>
      <p className="ans">{renderInlineBold(answer)}</p>
      <p className="why">{why}</p>
    </div>
  );
}

/* ───────── Main Section (H2 + answer-box + body + source-quote + compare-table) ───────── */
function MainSectionV3({ index, section }: { index: number; section: MainSection }) {
  const id = `s${index + 1}`;
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <>
      <h2 id={id}>
        <span className="num">{numStr}.</span>
        {section.heading}
      </h2>

      {section.highlight && (
        <div className="answer-box">
          <p>{renderInlineBold(section.highlight)}</p>
        </div>
      )}

      <RichText>{section.body}</RichText>

      {section.sourceQuote && (
        <div className="source-quote">
          <div className="label-mini">법령 원문</div>
          <p>&ldquo;{section.sourceQuote.excerpt}&rdquo;</p>
          <div className="src">{section.sourceQuote.source}</div>
        </div>
      )}

      {section.compareTable && <CompareTable table={section.compareTable} />}

      {section.widgets && section.widgets.map((w, i) => (
        <SectionWidgetRenderer key={i} widget={w} />
      ))}

      {section.link && (
        <p style={{ marginTop: 12 }}>
          <Link
            href={`/w/${section.link.slug}`}
            style={{
              color: "var(--ink)",
              fontWeight: 700,
              borderBottom: "1px solid var(--ink-3)",
              paddingBottom: 1,
            }}
          >
            {section.link.label} →
          </Link>
        </p>
      )}
    </>
  );
}

/* ───────── Compare Table ───────── */
function CompareTable({ table }: { table: NonNullable<MainSection["compareTable"]> }) {
  return (
    <div className="compare-table">
      <table>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => renderCompareCell(cell, ci))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCompareCell(cell: CompareCell, key: number) {
  if (typeof cell === "string") return <td key={key}>{cell}</td>;
  const cls = cell.status ? cell.status : "";
  const prefix =
    cell.status === "ok" ? "✓ " : cell.status === "no" ? "✗ " : "";
  return (
    <td key={key} className={cls}>
      {prefix}
      {cell.text}
    </td>
  );
}

/* ───────── FAQ Section ───────── */
function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="faq-section">
      <h2 id="faq">자주 묻는 질문</h2>
      <div className="faq-list">
        {items.map((f, i) => (
          <details key={i} className="faq-item" open={i === 0}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ───────── Sources Block ───────── */
function SourcesBlock({
  sources,
  lastVerified,
  disclaimer,
}: {
  sources: ArticleData["sources"];
  lastVerified: string;
  disclaimer?: string;
}) {
  const daysAgo = daysSinceISO(lastVerified);
  const isStale = daysAgo > 30;
  const isVeryStale = daysAgo > 90;

  return (
    <div className="sources-block">
      <div className="head-row">
        <span className="ttl">참고 자료 · 출처</span>
        <span className="updated">
          최종 검증 · {lastVerified}
          {isVeryStale && (
            <span
              style={{
                marginLeft: 8,
                padding: "2px 6px",
                borderRadius: 4,
                background: "#fee2e2",
                color: "#991b1b",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              재검증 필요 ({daysAgo}일 경과)
            </span>
          )}
          {!isVeryStale && isStale && (
            <span
              style={{
                marginLeft: 8,
                padding: "2px 6px",
                borderRadius: 4,
                background: "#fef3c7",
                color: "#92400e",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {daysAgo}일 경과 — 변경 사항 확인 권장
            </span>
          )}
        </span>
      </div>
      <ul>
        {sources.map((s, i) => (
          <li key={i}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.title}
            </a>{" "}
            · {s.org}
          </li>
        ))}
      </ul>
      {disclaimer && <div className="disclaimer">{disclaimer}</div>}
    </div>
  );
}

/** YYYY-MM-DD → 경과 일수 */
function daysSinceISO(yyyymmdd: string): number {
  const t = new Date(yyyymmdd).getTime();
  if (isNaN(t)) return 0;
  return Math.floor((Date.now() - t) / 86_400_000);
}

/* ───────── Author Card ───────── */
function AuthorCard({
  author,
}: {
  author: NonNullable<ArticleData["meta"]["author"]>;
}) {
  return (
    <div className="author-card">
      <span className="av-big">{author.avatarChar ?? "M"}</span>
      <div>
        <h4>{author.name}</h4>
        {author.role && <div className="role-line">{author.role}</div>}
        {author.bio && <p className="bio">{author.bio}</p>}
      </div>
    </div>
  );
}

/* ───────── Related Block ───────── */
function RelatedBlock({ items }: { items: NonNullable<ArticleData["relatedQuestions"]> }) {
  return (
    <div className="related-block">
      <div className="ttl-row">
        <h3>이런 글도 봤어요</h3>
      </div>
      <div className="related-grid">
        {items.map((q, i) => (
          <Link key={i} href={`/w/${q.slug}`} className="related-card">
            <div className="cat-mini">관련 질문</div>
            <h4>{q.question}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ───────── Helper: 인라인 **굵게** 처리 ───────── */
function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <b key={i}>{p.slice(2, -2)}</b>
    ) : (
      p
    ),
  );
}
