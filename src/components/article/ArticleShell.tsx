import Link from "next/link";
import { Fragment } from "react";
import "./template.css";
import { Toc, Faq } from "./Interactive";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
  HowToSchema,
} from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import type { ArticleData, MainSection, CompareCell } from "@/data/articles/types";

interface Props {
  data: ArticleData;
}

const SITE = "https://www.jjyu.co.kr";

/** "**강조**" → 형광 마크 (정본 템플릿 .mark) */
function Mk({ text }: { text: string }) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? <b className="mark" key={i}>{p}</b> : <span key={i}>{p}</span>
      )}
    </>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p className="body" key={i}><Mk text={p} /></p>
      ))}
    </>
  );
}

const CELL_CLASS: Record<string, string> = {
  ok: "ok",
  warn: "warn",
  no: "warn",
  key: "k",
  sub: "s",
};

function Cell({ cell }: { cell: CompareCell }) {
  if (typeof cell === "string") return <td>{cell}</td>;
  return <td className={cell.status ? CELL_CLASS[cell.status] : undefined}>{cell.text}</td>;
}

function Section({ s, n }: { s: MainSection; n: number }) {
  const id = `q${n}`;
  return (
    <section className="q" id={id}>
      <div className="eyebrow"><i>{n}</i><span>{s.eyebrow}</span></div>
      <h2>{s.heading}</h2>
      {s.compareTable && (
        <div className="tbl viz">
          <table>
            <thead><tr>{s.compareTable.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {s.compareTable.rows.map((row, i) => (
                <tr key={i}>{row.map((c, j) => <Cell cell={c} key={j} />)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.widgets?.map((w, i) => {
        if (w.type === "checklist")
          return (
            <ul className="check viz" key={i}>
              {w.items.map((it, j) => (
                <li key={j}><i>✓</i><span><Mk text={it} /></span></li>
              ))}
            </ul>
          );
        if (w.type === "stat-box")
          return (
            <div className="stats viz" key={i}>
              <div className="stat">
                <p className="cap">{w.label}</p>
                <p className="big">{w.value}</p>
                {w.note && <p className="sub">{w.note}</p>}
              </div>
            </div>
          );
        if (w.type === "calc-cta")
          return (
            <div className="cta-box viz" key={i}>
              <h3>{w.label ?? "계산기로 바로 확인하기"}</h3>
              {w.note && <p>{w.note}</p>}
              <div className="cta-row">
                <Link className="btn-p" href={`/w/${encodeURIComponent(w.slug)}`}>
                  계산기 열기
                </Link>
              </div>
            </div>
          );
        if (w.type === "def-box")
          return (
            <div className="caution viz" key={i}>
              <i>용어</i>
              <p><b>{w.term}</b> — <Mk text={w.definition} /></p>
            </div>
          );
        return null;
      })}
      <div style={{ marginTop: 16 }} />
      <Paragraphs text={s.body} />
      {s.highlight && (
        <div className="caution"><i>주의</i><p><Mk text={s.highlight} /></p></div>
      )}
      {s.link && (
        <p className="body" style={{ marginTop: 12 }}>
          <Mk text={s.link.bridge} />{" "}
          <Link href={`/w/${encodeURIComponent(s.link.slug)}`}>{s.link.label} →</Link>
        </p>
      )}
    </section>
  );
}

/**
 * ArticleShell — 정본 템플릿(docs/moneywiki-article-template.html) 렌더러
 * heroHook + heroAct(대형 CTA) + 핵심콕콕 + qa 섹션 + FAQ + 3줄 요약 + 스포크
 */
export function ArticleShell({ data }: Props) {
  const url = `${SITE}/w/${data.slug}`;
  const heroHook = data.heroHook ?? `${data.searchIntent.directAnswer} ${data.searchIntent.why}`;
  const mainSrc = data.sources[0];
  const tocItems = data.mainSections.map((s, i) => ({ id: `q${i + 1}`, label: s.heading }));
  const faqItems = data.context?.faqList ?? [];
  const steps = data.resolution.steps;
  const firstAction = steps.find((s) => s.action)?.action;

  return (
    <>
      <ArticleSchema
        title={data.meta.title}
        description={data.meta.description}
        url={url}
        datePublished={data.meta.publishedAt ?? data.lastVerified}
        dateModified={data.lastVerified}
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: SITE },
          { name: data.category, url: `${SITE}/#category-${encodeURIComponent(data.category)}` },
          { name: data.meta.title, url },
        ]}
      />
      {faqItems.length > 0 && (
        <FAQSchema items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))} />
      )}
      {steps.length > 0 && (
        <HowToSchema
          name={data.meta.title}
          description={data.meta.description}
          steps={steps.map((s) => ({ name: s.title, text: s.body }))}
        />
      )}

      <div className="aw">
        <article>
          <nav className="bc">
            <Link href="/">홈</Link><span>›</span>
            <span>{data.category}</span><span>›</span>
            <b>{data.primaryKeywords[0]}</b>
          </nav>

          <h1>{data.meta.title}</h1>
          <p className="lead">{data.meta.description}</p>

          <div className="meta">
            <span className="by">{data.meta.author?.name ?? "머니위키 편집팀"}</span>
            <span className="dot">·</span>
            <span>{data.lastVerified} 갱신</span>
            {mainSrc && <span className="src">출처 {mainSrc.org}</span>}
          </div>

          <div style={{ marginTop: 22 }}>
            <Paragraphs text={heroHook} />
          </div>

          {data.heroCta && (
            <a className="cta-main" href={data.heroCta.url} target="_blank" rel="noopener noreferrer">
              {data.heroCta.label}
            </a>
          )}

          <div className="adslot-top"><AdSlot slot="top" /></div>

          <Toc items={tocItems} />

          {data.keyFacts && data.keyFacts.length > 0 && (
            <section className="kf">
              <div className="kf-hd">
                <p className="eb">한눈에 보는 요약</p>
                <p className="tt">📌 핵심콕콕</p>
              </div>
              <dl>
                {data.keyFacts.map((k, i) => (
                  <Fragment key={i}>
                    <dt>{k.label}</dt>
                    <dd><Mk text={k.value} /></dd>
                  </Fragment>
                ))}
              </dl>
            </section>
          )}

          {data.mainSections.slice(0, 2).map((s, i) => (
            <Section s={s} n={i + 1} key={i} />
          ))}

          <div className="adslot-mid"><AdSlot slot="hero" /></div>

          {data.mainSections.slice(2).map((s, i) => (
            <Section s={s} n={i + 3} key={i + 2} />
          ))}

          {steps.length > 0 && (
            <section className="q" id="steps">
              <div className="eyebrow"><i>{data.mainSections.length + 1}</i><span>신청 절차</span></div>
              <h2>지금 바로 진행하는 방법</h2>
              {firstAction && (
                <div className="cta-box viz">
                  <h3>지금 바로 {firstAction.label.includes("신청") ? "신청하기" : "확인하기"}</h3>
                  <p>{firstAction.org}에서 바로 진행할 수 있습니다.</p>
                  <div className="cta-row">
                    <a className="btn-p" href={firstAction.url} target="_blank" rel="noopener noreferrer">
                      {firstAction.label}
                    </a>
                  </div>
                </div>
              )}
              <ol className="steps" style={{ marginTop: 14 }}>
                {steps.map((st, i) => (
                  <li key={i}>
                    <i>{i + 1}</i>
                    <div>
                      <b>{st.title}</b>
                      <p>{st.body}</p>
                      {st.action && i > 0 && (
                        <p><a href={st.action.url} target="_blank" rel="noopener noreferrer">{st.action.label} →</a></p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {data.context?.edgeCases && data.context.edgeCases.length > 0 && (
            <section className="q" id="edge">
              <div className="eyebrow"><i>!</i><span>예외 상황</span></div>
              <h2>이런 경우는 어떻게 되나요</h2>
              <div style={{ marginTop: 16 }} />
              {data.context.edgeCases.map((e, i) => (
                <div className="caution" key={i} style={{ marginTop: i === 0 ? 0 : 12 }}>
                  <i>Q</i>
                  <p><b>{e.scenario}</b> — <Mk text={e.answer} /></p>
                </div>
              ))}
            </section>
          )}

          {faqItems.length > 0 && (
            <section className="q" id="faq">
              <div className="eyebrow"><i>Q</i><span>자주 묻는 질문</span></div>
              <h2>{data.primaryKeywords[0]} FAQ</h2>
              <Faq items={faqItems} />
            </section>
          )}

          {data.summary && (
            <section className="sum">
              <p className="eb">3줄 요약</p>
              <ul>
                {data.summary.map((s, i) => (
                  <li key={i}><i>{i + 1}</i>{s}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="adslot-mid"><AdSlot slot="bottom" /></div>

          <p className="foot-note">
            {data.sources.map((s, i) => (
              <span key={i}>
                출처: <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> ({s.org}){i < data.sources.length - 1 ? " · " : ""}
              </span>
            ))}
            <br />
            {data.context?.disclaimer ?? "본 문서는 일반 정보 제공 목적이며, 개별 사안은 관할 기관 확인이 필요합니다."}
          </p>
        </article>

        <aside>
          {data.relatedQuestions && data.relatedQuestions.length > 0 && (
            <nav className="spoke">
              <div className="spoke-hd">
                <p className="eb">{data.primaryKeywords[0]} 시리즈</p>
                <p className="tt">이 주제를 항목별로 더 깊게</p>
              </div>
              <ul>
                {data.relatedQuestions.map((r, i) => (
                  <li key={i}>
                    <Link href={`/w/${encodeURIComponent(r.slug)}`}>
                      <b>{r.question}</b>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </>
  );
}
