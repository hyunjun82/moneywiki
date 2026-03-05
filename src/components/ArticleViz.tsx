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
  "조기재취업수당-조건-금액-신청": [
    {
      position: "section-0",
      component: <StatCard items={[
        { label: "지급 비율", value: "50%", sub: "남은 급여의 절반" },
        { label: "잔여일수 조건", value: "1/2 이상", sub: "소정급여일수 기준" },
        { label: "고용 유지", value: "12개월", sub: "재취업 후 근무 기간" },
        { label: "일 상한액", value: "66,000원", sub: "2026년 기준" },
      ]} />,
    },
    {
      position: "section-1",
      component: <EligibilityChecker
        questions={[
          { question: "소정급여일수의 절반 이상 남았나요?" },
          { question: "12개월 이상 고용(또는 사업 영위) 가능한가요?" },
          { question: "이전 직장과 다른 사업장인가요?" },
          { question: "수급자격 신청 전에 채용이 확정되지 않았나요?" },
        ]}
        passMessage="조기재취업수당을 받을 수 있어요! 재취업 후 12개월이 지나면 고용24에서 신청하세요."
        failMessage="아쉽지만 조건을 충족하지 못해요. 남은 실업급여를 끝까지 수급하는 게 나을 수 있어요."
      />,
    },
    {
      position: "section-2",
      component: <RangeTable
        title="조기재취업수당 금액 시뮬레이션"
        headers={["소정급여일수", "수급 일수", "남은 일수", "수당 예상액 (상한 기준)"]}
        rows={[
          { label: "120일", values: ["20일", "100일", "330만원"], highlight: true },
          { label: "150일", values: ["30일", "120일", "396만원"] },
          { label: "180일", values: ["30일", "150일", "495만원"], highlight: true },
          { label: "210일", values: ["40일", "170일", "561만원"] },
          { label: "240일", values: ["50일", "190일", "627만원"], highlight: true },
          { label: "270일", values: ["60일", "210일", "693만원"] },
        ]}
      />,
    },
    {
      position: "section-3",
      component: <ProcessTimeline steps={[
        { title: "재취업", description: "소정급여일수 1/2 이상 남기고 취업" },
        { title: "12개월 근무", description: "같은 직장에서 계속 근무" },
        { title: "수당 신청", description: "고용24 또는 고용센터 방문" },
        { title: "심사·지급", description: "서류 확인 후 계좌 입금" },
      ]} />,
    },
    {
      position: "section-4",
      component: <WarningBox type="danger" title="반환해야 하는 경우">
        12개월 미만에 본인 귀책으로 퇴사하면 수당을 반환해야 해요. 다만 회사 도산이나 권고사직은 예외예요. 친족 회사 취업, 사업자등록만 해놓고 실제 영업 안 하는 경우도 거절 사유예요.
      </WarningBox>,
    },
  ],
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
