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
          {/* data-custom-style — globals.css 의 옛 MD 글용 표 스타일(남색 그라데이션 헤더)이
              이 표를 건드리지 못하게 끊는다. 그쪽 규칙이 :not([data-custom-style]) 로
              예외를 허용하고 있어 특정성 싸움 없이 분리된다. */}
          <table data-custom-style="template">
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
                <a className="btn-p" href={`/w/${encodeURIComponent(w.slug)}`}>
                  계산기 열기
                </a>
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
          <a href={`/w/${encodeURIComponent(s.link.slug)}`}>{s.link.label} →</a>
        </p>
      )}

      {/* 섹션 행동 버튼. 광고와 붙지 않도록 위에 여백을 크게 둔다.
          AdSense 정책상 광고가 버튼처럼 보이면 안 되므로 시각적으로 분리한다. */}
      {/* 버튼 글자는 label 그대로 쓴다.
          예전에는 label을 h3 제목으로 올리고 버튼에는 "{기관명}에서 바로 진행하기"를
          하드코딩했다. 그래서 글이 뭐든 모든 버튼이 똑같은 문장이 됐고,
          읽는 사람 이익이 아니라 기관 이름만 보였다.
          새 창(target=_blank)도 뺐다 — 누르는 순간 사이트 밖 새 탭으로 튕겨 나갔다. */}
      {s.cta && (
        <div className="cta-box viz" style={{ marginTop: 28 }}>
          {s.cta.note && <p>{s.cta.note}</p>}
          <div className="cta-row">
            <a className="btn-p" href={s.cta.url} rel="noopener">
              {s.cta.label} →
            </a>
          </div>
          <p className="fine">{s.cta.org}</p>
        </div>
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
        {/* article 요소를 쓰지 않는다 — globals.css 의 옛 MD 글용 규칙이
            article 선택자로 표·문단·인용구를 전부 덮어써 새 템플릿과 충돌한다.
            문서 의미는 JSON-LD ArticleSchema 가 담당한다. */}
        <div className="aw-doc">
          <nav className="bc">
            <a href="/">홈</a><span>›</span>
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
            <a className="cta-main" href={data.heroCta.url} rel="noopener">
              {data.heroCta.label} →
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

          {/* q1은 행동(신청) 섹션이다. 읽고 바로 움직이는 구간이라 주목도가 가장 높다.
              여기 뒤에 광고를 두고, 행동 버튼은 섹션 안(광고 위)에 둔다.
              광고가 버튼 위에 오면 CTA로 오인될 수 있어 순서를 이렇게 잡는다. */}
          {data.mainSections.slice(0, 1).map((s, i) => (
            <Section s={s} n={i + 1} key={i} />
          ))}

          <div className="adslot-mid"><AdSlot slot="hero" /></div>

          {data.mainSections.slice(1).map((s, i) => (
            <Section s={s} n={i + 2} key={i + 1} />
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
                    <a className="btn-p" href={firstAction.url} rel="noopener">
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
                        <p><a href={st.action.url} rel="noopener">{st.action.label} →</a></p>
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
        </div>

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
                    <a href={`/w/${encodeURIComponent(r.slug)}`}>
                      <b>{r.question}</b>
                    </a>
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
