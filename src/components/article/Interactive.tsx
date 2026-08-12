"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/articles/types";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="toc">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="tl"><i>☰</i>목차 ({items.length}개 항목)</span>
        <span className="st">{open ? "닫기 ⌃" : "열기 ⌄"}</span>
      </button>
      <ol hidden={!open}>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{String(i + 1).padStart(2, "0")}. {it.label}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}

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
