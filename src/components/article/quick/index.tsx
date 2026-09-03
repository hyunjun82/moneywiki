"use client";

/**
 * 즉답 위젯 레지스트리 — 정본 템플릿 .now
 *
 * 글은 heroWidget.component 이름으로 위젯을 고른다. 계산식은 주제마다 달라 코드로 두고,
 * 상수(하한·상한·일수표 등)는 글의 heroWidget.params 로 받는다 — 본문 표와 같은 증거 JSON 값이어야 한다.
 * 새 주제의 위젯이 필요하면 이 폴더에 파일을 하나 더 만들고 아래 표에 이름을 등록한다.
 */
import type { ComponentType } from "react";
import type { ArticleData } from "@/data/articles/types";
import { UnemploymentBenefit } from "./UnemploymentBenefit";

export type QuickProps = { params: Record<string, unknown> };

const REGISTRY: Record<string, ComponentType<QuickProps>> = {
  "unemployment-benefit": UnemploymentBenefit,
};

export function QuickCalc({ w }: { w: NonNullable<ArticleData["heroWidget"]> }) {
  const Cmp = REGISTRY[w.component];
  if (!Cmp) return null;
  return (
    <div className="now">
      <div className="now-hd"><b>{w.title}</b>{w.hint && <span>{w.hint}</span>}</div>
      <Cmp params={w.params ?? {}} />
      {(w.formula || w.more) && (
        <div className="now-ft">
          <span>{w.formula}</span>
          {w.more && <a href={`/w/${encodeURIComponent(w.more.slug)}`}>{w.more.label} →</a>}
        </div>
      )}
    </div>
  );
}
