import { Fragment } from "react";
import "./template.css";
import { Toc, Faq, Decide, StepBar } from "./Interactive";
import { QuickCalc } from "./quick";
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
  SubSection,
  CompareCell,
  CompareTable,
  SectionWidget,
  LawQuote,
  SourceItem,
} from "@/data/articles/types";

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
      {text.split(/\n\n+/).filter(Boolean).map((p, i) => (
        <p className="body" key={i}><Mk text={p} /></p>
      ))}
    </>
  );
}

const CELL_CLASS: Record<string, string> = { ok: "g", warn: "warn", no: "warn", key: "k", sub: "s" };

function Cell({ cell, header }: { cell: CompareCell; header: string }) {
  if (typeof cell === "string") return <td data-h={header}>{cell}</td>;
  const cls = [cell.status ? CELL_CLASS[cell.status] : "", cell.hideOnMobile ? "m-hide" : ""].filter(Boolean).join(" ") || undefined;
  return (
    <td className={cls} data-h={header}>
      {cell.tag && <span className={`tag ${cell.tagTone ?? ""}`}>{cell.tag}</span>}
      {cell.text && (cell.tag ? " " : "")}
      {cell.text}
      {cell.doc && <span className="doc">{cell.doc}</span>}
      {cell.links?.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <a className="go" href={l.url} rel="noopener">{l.label}</a>
        </Fragment>
      ))}
    </td>
  );
}

function Table({ t }: { t: CompareTable }) {
  return (
    <figure className={`tbl viz${t.cards ? " cards" : ""}`}>
      {t.caption && <figcaption>{t.caption}</figcaption>}
      {/* data-custom-style — globals.css 의 옛 MD 글용 표 스타일이 이 표를 건드리지 못하게 끊는다 */}
      <table data-custom-style="template">
        <thead><tr>{t.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {t.rows.map((row, i) => (
            <tr key={i}>{row.map((c, j) => <Cell cell={c} header={t.headers[j] ?? ""} key={j} />)}</tr>
          ))}
        </tbody>
      </table>
      {t.footnote && <div className="fn">{t.footnote}</div>}
    </figure>
  );
}

function Quote({ q }: { q: LawQuote }) {
  return (
    <details className="quote">
      <summary>근거 조문 보기</summary>
      <p><b>{q.law}</b> {q.text}</p>
    </details>
  );
}

function Widget({ w, id }: { w: SectionWidget; id: string }) {
  switch (w.type) {
    case "checklist":
      return (
        <ul className="check viz">
          {w.items.map((it, j) => <li key={j}><i>✓</i><span><Mk text={it} /></span></li>)}
        </ul>
      );
    case "stat-box":
      return (
        <div className="stats viz">
          <div className="stat">
            <p className="cap">{w.label}</p>
            <p className="big">{w.value}</p>
            {w.note && <p className="sub">{w.note}</p>}
          </div>
        </div>
      );
    case "calc-cta":
      return (
        <div className="cta-box viz">
          <h3>{w.label ?? "계산기로 바로 확인하기"}</h3>
          {w.note && <p>{w.note}</p>}
          <div className="cta-row"><a className="btn-p" href={`/w/${encodeURIComponent(w.slug)}`}>계산기 열기</a></div>
        </div>
      );
    case "case-example":
      return (
        <div className="caution viz"><i>예</i><p><b>{w.persona}</b> — <Mk text={w.result} />{w.note && <> ({w.note})</>}</p></div>
      );
    case "def-box":
      return (
        <div className="caution viz"><i>용어</i><p><b>{w.term}</b> — <Mk text={w.definition} /></p></div>
      );
    case "decide":
      return <Decide w={w} />;
    case "flow":
      return (
        <div className="flow viz">
          {w.steps.map((s, i) => (
            <Fragment key={i}>
              {i > 0 && <div className="arr">→</div>}
              <div className={`box${s.hi ? " hi" : ""}`}>
                <div className="cap">{s.cap}</div>
                <div className="val">{s.val}</div>
                {s.sub && <p className="fsub">{s.sub}</p>}
              </div>
            </Fragment>
          ))}
        </div>
      );
    case "stepbar":
      return <StepBar w={w} id={id} />;
    case "timeline":
      return (
        <ol className="tl viz">
          {w.items.map((it, i) => (
            <li key={i} className={it.pay ? "pay" : undefined}>
              <div className="d">{it.d}</div><div className="t">{it.t}</div><div className="m">{it.m}</div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

/** 섹션·소섹션 공통 본문: 비주얼 먼저 → 해설 → 주의 → 내부 링크 → 행동 버튼 → 접힌 조문 */
function SectionBody({ s, id }: { s: MainSection | SubSection; id: string }) {
  const link = "link" in s ? s.link : undefined;
  return (
    <>
      {s.compareTable && <Table t={s.compareTable} />}
      {s.widgets?.map((w, i) => <Widget w={w} id={`${id}-w${i}`} key={i} />)}
      {s.body && <div style={{ marginTop: 16 }}><Paragraphs text={s.body} /></div>}
      {s.highlight && <div className="caution"><i>!</i><p><Mk text={s.highlight} /></p></div>}
      {link && (
        <p className="body" style={{ marginTop: 12 }}>
          <Mk text={link.bridge} />{" "}
          <a href={`/w/${encodeURIComponent(link.slug)}`}>{link.label} →</a>
        </p>
      )}
      {s.cta && (
        <div className="cta-row inline">
          <a className="btn-p" href={s.cta.url} rel="noopener">{s.cta.label}</a>
          <span className="fine">{s.cta.org}{s.cta.note ? ` · ${s.cta.note}` : ""}</span>
        </div>
      )}
      {s.quote && <Quote q={s.quote} />}
    </>
  );
}

function Section({ s, n }: { s: MainSection; n: number }) {
  const id = `q${n}`;
  return (
    <section className="q" id={id}>
      <div className="eyebrow"><i>{n}</i><span>{s.eyebrow}</span></div>
      <h2>{s.heading}</h2>
      {s.answer && <p className="ans">{s.answer}</p>}
      <SectionBody s={s} id={id} />
      {s.subsections?.map((sub, i) => {
        const sid = sub.id ?? `${id}-${String.fromCharCode(97 + i)}`;
        return (
          <div className="sub" id={sid} key={sid}>
            <h3 className="sh">{sub.heading}</h3>
            <p className="ans">{sub.answer}</p>
            <SectionBody s={sub} id={sid} />
          </div>
        );
      })}
    </section>
  );
}

const GROUPS: NonNullable<SourceItem["group"]>[] = ["법령", "행정규칙·안내", "정부 도구", "검증 방법"];

function Sources({ data }: { data: ArticleData }) {
  const grouped = data.sources.some((s) => s.group);
  if (!grouped) {
    return (
      <p className="foot-note">
        {data.sources.map((s, i) => (
          <span key={i}>
            출처: <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> ({s.org}){i < data.sources.length - 1 ? " · " : ""}
          </span>
        ))}
        <br />
        {data.context?.disclaimer ?? "본 문서는 일반 정보 제공 목적이며, 개별 사안은 관할 기관 확인이 필요합니다."}
      </p>
    );
  }
  return (
    <>
      <section className="src">
        <div className="src-hd">
          <h2>출처</h2>
          {data.verify && <span className="verify"><i>✓</i>{data.verify.date} 검증</span>}
        </div>
        <dl>
          {GROUPS.filter((g) => data.sources.some((s) => s.group === g)).map((g) => (
            <Fragment key={g}>
              <dt>{g}</dt>
              <dd>
                {data.sources.filter((s) => s.group === g).map((s, i, arr) => (
                  <Fragment key={i}>
                    {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}
                    {s.note ? ` — ${s.note}` : ""}
                    {i < arr.length - 1 ? " · " : ""}
                  </Fragment>
                ))}
              </dd>
            </Fragment>
          ))}
        </dl>
      </section>
      <p className="foot-note">
        {data.context?.disclaimer ?? "이 글은 법령과 공식 안내를 바탕으로 정리한 참고 자료예요. 개별 사안은 관할 기관이 결정해요. 법령이 바뀌면 표와 위젯의 숫자를 함께 갱신해요."}
      </p>
    </>
  );
}

/**
 * ArticleShell — 정본 템플릿(docs/moneywiki-article-template.html) 렌더러
 * 타이틀 → 리드 → 검증 배지 → 즉답 위젯 → 숫자 박스 → 광고 → 목차 → 핵심콕콕
 * → 대제목 섹션(h2 + 한 줄 답 + 소제목 h3) → FAQ → 정리 → 출처 4묶음 → 스포크
 * 옛 글(heroHook·heroCta·resolution.steps·edgeCases)도 그대로 그린다.
 */
export function ArticleShell({ data }: Props) {
  const url = `${SITE}/w/${data.slug}`;
  const isV2 = Boolean(data.verify || data.heroWidget || data.mainSections.some((s) => s.answer || s.subsections));
  const heroHook = data.heroHook ?? (isV2 ? "" : `${data.searchIntent.directAnswer} ${data.searchIntent.why}`);
  const mainSrc = data.sources[0];
  const tocItems = data.mainSections.map((s, i) => ({
    id: `q${i + 1}`,
    label: s.heading,
    children: s.subsections?.map((sub, j) => ({ id: sub.id ?? `q${i + 1}-${String.fromCharCode(97 + j)}`, label: sub.heading })),
  }));
  const faqItems = data.context?.faqList ?? [];
  const steps = data.resolution.steps;
  const firstAction = steps.find((s) => s.action)?.action;
  const howToSteps = steps.length > 0
    ? steps.map((s) => ({ name: s.title, text: s.body }))
    : data.mainSections.flatMap((s) => (s.widgets ?? []).flatMap((w) => (w.type === "stepbar" ? w.steps.map((st) => ({ name: st.title, text: st.body })) : [])));

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
      {howToSteps.length > 0 && (
        <HowToSchema name={data.meta.title} description={data.meta.description} steps={howToSteps} />
      )}

      <div className="aw">
        {/* article 요소를 쓰지 않는다 — globals.css 의 옛 MD 글용 규칙과 충돌한다. 문서 의미는 JSON-LD 가 담당한다. */}
        <div className="aw-doc">
          <nav className="bc">
            <a href="/">홈</a><span>›</span>
            <span>{data.category}</span><span>›</span>
            <b>{data.primaryKeywords[0]}</b>
          </nav>

          <h1>{data.meta.title}</h1>
          <p className="lead"><Mk text={data.meta.description} /></p>

          <div className="meta">
            <span className="by">{data.meta.author?.name ?? "머니위키 편집팀"}</span>
            <span className="dot">·</span>
            <span>{data.lastVerified} 갱신</span>
            {data.verify
              ? <span className="verify"><i>✓</i>{data.verify.note} · {data.verify.date}</span>
              : mainSrc && <span className="src">출처 {mainSrc.org}</span>}
          </div>

          {heroHook && <div style={{ marginTop: 22 }}><Paragraphs text={heroHook} /></div>}

          {data.heroWidget && <QuickCalc w={data.heroWidget} />}

          {data.heroStats && data.heroStats.length > 0 && (
            <div className="stats hero">
              {data.heroStats.map((s, i) => (
                <div className="stat" key={i}>
                  <p className="cap">{s.label}</p>
                  <p className="big">{s.value}{s.unit && <small>{s.unit}</small>}</p>
                  {s.note && <p className="sub">{s.note}</p>}
                </div>
              ))}
            </div>
          )}

          {data.heroCta && (
            <a className="cta-main" href={data.heroCta.url} rel="noopener">{data.heroCta.label} →</a>
          )}

          <div className="adslot-top"><AdSlot slot="top" /></div>

          <Toc items={tocItems} />

          {data.keyFacts && data.keyFacts.length > 0 && (
            <section className="kf">
              <div className="kf-hd">
                <p className="eb">📌 핵심콕콕</p>
                <p className="tt">한눈에 보는 {data.primaryKeywords[0]}</p>
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

          {/* 광고는 첫 대제목 뒤. 버튼과 붙지 않게 여백을 둔다 */}
          {data.mainSections.slice(0, 1).map((s, i) => <Section s={s} n={i + 1} key={i} />)}
          <div className="adslot-mid"><AdSlot slot="hero" /></div>
          {data.mainSections.slice(1).map((s, i) => <Section s={s} n={i + 2} key={i + 1} />)}

          {steps.length > 0 && (
            <section className="q" id="steps">
              <div className="eyebrow"><i>{data.mainSections.length + 1}</i><span>신청 절차</span></div>
              <h2>지금 바로 진행하는 방법</h2>
              {firstAction && (
                <div className="cta-box viz">
                  <h3>지금 바로 {firstAction.label.includes("신청") ? "신청하기" : "확인하기"}</h3>
                  <p>{firstAction.org}에서 바로 진행할 수 있습니다.</p>
                  <div className="cta-row"><a className="btn-p" href={firstAction.url} rel="noopener">{firstAction.label}</a></div>
                </div>
              )}
              <ol className="steps" style={{ marginTop: 14 }}>
                {steps.map((st, i) => (
                  <li key={i}>
                    <i>{i + 1}</i>
                    <div>
                      <b>{st.title}</b>
                      <p>{st.body}</p>
                      {st.action && i > 0 && <p><a href={st.action.url} rel="noopener">{st.action.label} →</a></p>}
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
                  <i>Q</i><p><b>{e.scenario}</b> — <Mk text={e.answer} /></p>
                </div>
              ))}
            </section>
          )}

          {faqItems.length > 0 && (
            <section className="q" id="faq">
              <div className="eyebrow"><i>?</i><span>자주 묻는 질문</span></div>
              <h2>{data.primaryKeywords[0]}, 이것도 궁금해요</h2>
              <Faq items={faqItems} />
            </section>
          )}

          {data.summary && data.summary.length > 0 && (
            <section className="sum">
              <p className="eb">{isV2 ? "떠나기 전 체크" : "3줄 요약"}</p>
              <ul>
                {data.summary.map((s, i) => (
                  <li key={i}>{isV2 ? <i className="bx">✓</i> : <i>{i + 1}</i>}<span><Mk text={s} /></span></li>
                ))}
              </ul>
            </section>
          )}

          <div className="adslot-mid"><AdSlot slot="bottom" /></div>

          <Sources data={data} />
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
                  <li key={i}><a href={`/w/${encodeURIComponent(r.slug)}`}><b>{r.question}</b></a></li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </>
  );
}
