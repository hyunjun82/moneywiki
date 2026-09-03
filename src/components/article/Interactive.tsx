"use client";

import { useState } from "react";
import type { FaqItem, SectionWidget } from "@/data/articles/types";

/* ── 목차: 대제목 + 들여쓴 소제목 ── */
export interface TocItem { id: string; label: string; children?: { id: string; label: string }[] }

export function Toc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="toc">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="tl"><i>☰</i>목차</span>
        <span className="st">{open ? "닫기 ⌃" : "열기 ⌄"}</span>
      </button>
      <ol hidden={!open}>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{i + 1}. {it.label}</a>
            {it.children && it.children.length > 0 && (
              <ol>
                {it.children.map((c) => (
                  <li key={c.id}><a href={`#${c.id}`}>{c.label}</a></li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── FAQ 아코디언 ── */
export function Faq({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0);
  return (
    <div className="faq">
      {items.map((f, i) => {
        const open = openIdx === i;
        return (
          <div className="item" key={i}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIdx(open ? -1 : i)}>
              <span className="qq"><i>Q</i>{f.question}</span>
              <span className="pm">{open ? "−" : "+"}</span>
            </button>
            <div className="aa" hidden={!open}><i>A</i><p>{f.answer}</p></div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 판정: 항목별 충족/미충족 → 결과 + 다음 할 일 ── */
type DecideWidget = Extract<SectionWidget, { type: "decide" }>;

export function Decide({ w }: { w: DecideWidget }) {
  const [ans, setAns] = useState<(null | "y" | "n")[]>(w.items.map(() => null));
  const set = (i: number, v: "y" | "n") => setAns((a) => a.map((x, j) => (j === i ? v : x)));
  const done = ans.every(Boolean);
  const bad = ans.indexOf("n");
  const filled = ans.filter(Boolean).length;
  return (
    <div className="decide viz">
      <ul>
        {w.items.map((it, i) => (
          <li key={i}>
            <div>
              <div className="qtx">{it.q}</div>
              {it.sub && <div className="qsub">{it.sub}</div>}
            </div>
            <div className="yn">
              <button type="button" className="y" aria-pressed={ans[i] === "y"} onClick={() => set(i, "y")}>충족</button>
              <button type="button" className="n" aria-pressed={ans[i] === "n"} onClick={() => set(i, "n")}>미충족</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={`decide-out${done ? (bad < 0 ? " ok" : " no") : ""}`}>
        {!done && `항목을 눌러 보세요. (${filled}/${w.items.length})`}
        {done && bad < 0 && <><b>받을 수 있어요.</b> {w.okText}</>}
        {done && bad >= 0 && <><b>{bad + 1}번 조건이 걸려요.</b> {w.items[bad].next}</>}
      </div>
    </div>
  );
}

/* ── 단계 탭 ── */
type StepbarWidget = Extract<SectionWidget, { type: "stepbar" }>;

export function StepBar({ w, id }: { w: StepbarWidget; id: string }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="stepbar viz">
      <div className="tabs" role="tablist">
        {w.steps.map((s, i) => (
          <button type="button" role="tab" key={i} aria-selected={cur === i} aria-controls={`${id}-p${i}`} onClick={() => setCur(i)}>
            <i>{i + 1}</i><span>{s.tab}</span>
          </button>
        ))}
      </div>
      {w.steps.map((s, i) => (
        <div className="panel" id={`${id}-p${i}`} role="tabpanel" key={i} hidden={cur !== i}>
          <b className="pt">{s.title}</b>
          <p>{s.body}</p>
          {(s.prep || s.time) && (
            <div className="kv">
              {s.prep && <span>준비물 <b>{s.prep}</b></span>}
              {s.time && <span>소요 <b>{s.time}</b></span>}
            </div>
          )}
          {s.action && (
            <div className="act">
              <a className={s.action.primary === false ? "btn-s" : "btn-p"} href={s.action.url} rel="noopener">{s.action.label}</a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
