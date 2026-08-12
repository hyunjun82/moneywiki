import Link from "next/link";
import type { SectionWidget } from "@/data/articles/types";

/**
 * 본문 섹션 안에 끼우는 작은 시각/인터랙티브 위젯 4종
 * - calc-cta: 계산기 바로가기 박스
 * - stat-box: 큰 숫자 강조
 * - case-example: 페르소나 사례
 * - def-box: 용어 정의
 */
export function SectionWidgetRenderer({ widget }: { widget: SectionWidget }) {
  switch (widget.type) {
    case "calc-cta":
      return <CalcCta data={widget} />;
    case "stat-box":
      return <StatBox data={widget} />;
    case "case-example":
      return <CaseExample data={widget} />;
    case "def-box":
      return <DefBox data={widget} />;
  }
}

function CalcCta({ data }: { data: Extract<SectionWidget, { type: "calc-cta" }> }) {
  return (
    <Link href={`/w/${data.slug}`} className="widget calc-cta">
      <div className="cta-text">
        {data.note && <p className="cta-note">{data.note}</p>}
        <p className="cta-label">{data.label ?? "계산기 바로가기"}</p>
      </div>
      <span className="cta-arrow" aria-hidden>→</span>
    </Link>
  );
}

function StatBox({ data }: { data: Extract<SectionWidget, { type: "stat-box" }> }) {
  return (
    <div className="widget stat-box">
      <p className="sb-label">{data.label}</p>
      <p className="sb-value">{data.value}</p>
      {data.note && <p className="sb-note">{data.note}</p>}
    </div>
  );
}

function CaseExample({ data }: { data: Extract<SectionWidget, { type: "case-example" }> }) {
  return (
    <div className="widget case-example">
      <div className="ce-icon" aria-hidden>👤</div>
      <div className="ce-body">
        <p className="ce-persona">{data.persona}</p>
        <p className="ce-result">{data.result}</p>
        {data.note && <p className="ce-note">{data.note}</p>}
      </div>
    </div>
  );
}

function DefBox({ data }: { data: Extract<SectionWidget, { type: "def-box" }> }) {
  return (
    <details className="widget def-box">
      <summary>
        <span className="db-term">{data.term}</span>
        <span className="db-hint">용어 보기</span>
      </summary>
      <p className="db-def">{data.definition}</p>
    </details>
  );
}
