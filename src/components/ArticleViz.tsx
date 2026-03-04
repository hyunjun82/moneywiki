"use client";

import { ReactNode } from "react";
import { EligibilityChecker } from "@/components/viz";
import { RangeTable } from "@/components/viz";
import { WarningBox } from "@/components/viz";
import { ComparisonTable } from "@/components/viz";
import { ProcessTimeline } from "@/components/viz";
import { StatCard } from "@/components/viz";

/* ──────────────────────────────────────────────
   ArticleViz — slug → 시각화 컴포넌트 매퍼

   position 키:
   - "top"        : 본문 시작 전
   - "section-0"  : 첫 번째 소제목 아래, 텍스트 위
   - "section-1"  : 두 번째 소제목 아래, 텍스트 위
   - "bottom"     : 본문 끝, FAQ 앞
   ────────────────────────────────────────────── */

type Position = "top" | "bottom" | `section-${number}` | `after-${number}`;

interface VizEntry {
  position: Position;
  component: ReactNode;
}

// slug별 시각화 매핑 — 글 작성 시 여기에 추가
const VIZ_MAP: Record<string, VizEntry[]> = {
  "부양가족-공제-연말정산": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "기본공제", value: "150만원", sub: "부양가족 1인당" },
        { label: "경로우대", value: "+100만원", sub: "만 70세 이상" },
        { label: "장애인", value: "+200만원", sub: "장애인 등록자" },
        { label: "한부모", value: "+100만원", sub: "배우자 없이 자녀 부양" },
      ]} />,
    },
    {
      position: "section-1",
      component: <RangeTable
        title="부양가족 소득요건 기준표"
        headers={["소득 유형", "기준", "공제 가능 여부"]}
        rows={[
          { label: "근로소득만", values: ["총급여 500만원 이하", "공제 가능"], highlight: true },
          { label: "사업소득", values: ["소득금액 100만원 이하", "공제 가능"] },
          { label: "연금소득", values: ["소득금액 100만원 이하", "공제 가능"] },
          { label: "이자·배당", values: ["2,000만원 초과분 합산", "100만원 초과 시 불가"] },
          { label: "양도소득", values: ["소득금액 전액 합산", "100만원 초과 시 불가"] },
        ]}
      />,
    },
    {
      position: "section-2",
      component: <ComparisonTable
        columns={[
          { name: "구분" },
          { name: "나이 요건" },
          { name: "동거 요건" },
          { name: "비고" },
        ]}
        rows={[
          { label: "배우자", values: ["제한 없음", "별거 가능", "소득요건만 충족"] },
          { label: "직계존속(부모)", values: ["만 60세 이상", "별거 가능", "1966년생 이전"] },
          { label: "직계비속(자녀)", values: ["만 20세 이하", "동거 원칙", "2006년생 이후"] },
          { label: "형제자매", values: ["60세↑ 또는 20세↓", "동거 원칙", "취학·요양 예외"] },
          { label: "장애인", values: ["제한 없음", "동거 원칙", "나이 무관"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <WarningBox type="danger" title="중복공제 적발 시 불이익">
        같은 부양가족을 2명이 동시에 공제받으면 국세청이 자동으로 걸러내요. 한 쪽은 공제 취소 + 추가 세금 + 가산세를 내야 해요. 연봉 높은 쪽이 공제받는 게 유리해요.
      </WarningBox>,
    },
    {
      position: "section-4",
      component: <ProcessTimeline steps={[
        { title: "홈택스 로그인", description: "공동인증서 또는 간편인증" },
        { title: "연말정산 간소화", description: "메뉴에서 부양가족 자료제공 동의" },
        { title: "부양가족 정보 입력", description: "이름, 주민등록번호 입력" },
        { title: "부양가족 본인인증", description: "부양가족이 직접 동의 (손택스 가능)" },
        { title: "등록 완료", description: "1월 15일부터 간소화 자료 조회 가능" },
      ]} />,
    },
    {
      position: "section-5",
      component: <RangeTable
        title="부양가족 공제 오류 시 추징 예시 (150만원 잘못 공제)"
        headers={["항목", "금액", "산출 근거"]}
        rows={[
          { label: "추가 납부 세액", values: ["200,000원", "150만원 × 세율 15%"], highlight: true },
          { label: "과소신고 가산세", values: ["20,000원", "추가세액의 10%"] },
          { label: "납부지연 가산세", values: ["16,060원", "미납세액 × 0.022% × 365일"] },
          { label: "합계", values: ["236,060원", "총 추징액"], highlight: true },
        ]}
      />,
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
        <div key={`viz-${position}-${i}`} className="my-4">{entry.component}</div>
      ))}
    </>
  );
}

// 특정 slug에 시각화가 있는지 확인 (렌더링 최적화용)
export function hasViz(slug: string): boolean {
  return slug in VIZ_MAP;
}
