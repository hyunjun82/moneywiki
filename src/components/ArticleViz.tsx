"use client";

import { ReactNode } from "react";
import { EligibilityChecker } from "@/components/viz";
import { RangeTable } from "@/components/viz";
import { WarningBox } from "@/components/viz";

/* ──────────────────────────────────────────────
   ArticleViz — slug → 시각화 컴포넌트 매퍼

   사용법 (spoke page에서):
   <ArticleViz slug={slug} position="top" />
   <ArticleViz slug={slug} position="after-0" />

   position 키:
   - "top"      : 본문 시작 전
   - "after-0"  : 첫 번째 섹션 뒤
   - "after-1"  : 두 번째 섹션 뒤
   - "after-2"  : 세 번째 섹션 뒤 ...
   - "bottom"   : 본문 끝, FAQ 앞
   ────────────────────────────────────────────── */

type Position = "top" | "bottom" | `after-${number}`;

interface VizEntry {
  position: Position;
  component: ReactNode;
}

// slug별 시각화 매핑 — 글 작성 시 여기에 추가
const VIZ_MAP: Record<string, VizEntry[]> = {
  "부양가족-공제-연말정산": [
    {
      position: "top",
      component: <EligibilityChecker
        questions={[
          { question: "부양가족이 만 20세 이하 또는 만 60세 이상인가요?" },
          { question: "부양가족의 연간 소득금액이 100만원 이하인가요? (근로소득만 있는 경우 총급여 500만원 이하)" },
          { question: "주민등록상 같은 세대에 거주하고 있나요? (직계존속은 별거도 가능)" },
        ]}
        passMessage="축하해요! 부양가족 기본공제 대상에 해당돼요. 1인당 150만원 소득공제를 받을 수 있어요."
        failMessage="아쉽지만 기본공제 대상에 해당하지 않아요. 조건을 다시 확인해 보세요."
      />,
    },
    {
      position: "after-1",
      component: <RangeTable
        title="연말정산 부양가족 공제 종류별 금액 한도"
        headers={["공제 유형", "대상 조건", "공제 금액"]}
        rows={[
          { label: "기본공제", values: ["1인당", "150만원"], highlight: true },
          { label: "경로우대 추가공제", values: ["만 70세 이상", "100만원 추가"] },
          { label: "장애인 추가공제", values: ["장애인 등록자", "200만원 추가"] },
          { label: "부녀자 추가공제", values: ["배우자 없는 여성 세대주", "50만원 추가"] },
          { label: "한부모 추가공제", values: ["배우자 없이 자녀 부양", "100만원 추가"] },
        ]}
      />,
    },
    {
      position: "after-3",
      component: <WarningBox type="warning" title="부양가족 공제 중복공제 주의">
        자녀가 아르바이트로 연 500만원 이상 벌면 기본공제 대상에서 제외돼요. 대학생 자녀의 근로소득을 꼭 확인하세요.
      </WarningBox>,
    },
  ],
};

export function ArticleViz({ slug, position }: { slug: string; position: Position }) {
  const entries = VIZ_MAP[slug];
  if (!entries) return null;

  const matched = entries.filter((e) => e.position === position);
  if (matched.length === 0) return null;

  return (
    <>
      {matched.map((entry, i) => (
        <div key={`viz-${position}-${i}`}>{entry.component}</div>
      ))}
    </>
  );
}

// 특정 slug에 시각화가 있는지 확인 (렌더링 최적화용)
export function hasViz(slug: string): boolean {
  return slug in VIZ_MAP;
}
