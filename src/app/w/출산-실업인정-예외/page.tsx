"use client";

// Q1. 실업급여를 받고 있는데 출산 때문에 구직활동을 못 해서 급여가 끊길까 걱정하는 임산부
// Q2. 고용센터에 출산 실업인정 유예를 신청해서 구직활동 없이도 구직급여를 계속 받는 행동
// Q3. 유예 기간(전후 45일씩 총 90일), 구직급여 계속 지급, 수급기간에 포함, 신청 방법·서류
// Q4. GreenBox(핵심 요약) + Steps(신청절차) + DocTable(서류) + BorderBox(유예 후 주의) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const APPLY_STEPS = [
  { title: "고용센터에 유예 신청", desc: "관할 고용센터에 방문하거나 온라인으로 출산 실업인정 유예를 신청해요.", tip: "출산 전에 미리 신청해도, 출산 후에 소급 신청해도 돼요" },
  { title: "증빙서류 제출", desc: "출생증명서(출산 후) 또는 임신확인서+출산예정일 진단서(출산 전)를 제출해요." },
  { title: "유예 승인 후 급여 계속 수령", desc: "승인되면 유예 기간 동안 고용센터 출석·구직활동 없이도 구직급여가 계좌로 입금돼요." },
  { title: "유예 종료 후 실업인정 재개", desc: "출산 후 45일이 지나면 다시 고용센터에 출석해서 실업인정을 받아야 급여가 나와요." },
];

const DOCS = [
  { name: "출생증명서", required: true, where: "분만 병원 발급 (출산 후)" },
  { name: "임신확인서", required: false, where: "산부인과 발급 (출산 전 신청 시)" },
  { name: "출산예정일 진단서", required: false, where: "산부인과 발급 (출산 전 신청 시)" },
  { name: "신분증", required: true, where: "본인 지참" },
];

const FAQS = [
  { q: "유예 기간에도 구직급여를 받나요?", a: "네, 받아요. 실업인정은 유예되지만 급여는 정상적으로 지급돼요. '구직활동을 안 해서 못 받는다'가 아니에요." },
  { q: "유예 기간이 수급일수에 포함되나요?", a: "포함돼요. 120일 수급이라면 유예 90일도 수급일수로 카운트되고, 남은 30일만 추가로 실업인정을 받으면 돼요." },
  { q: "출산 전에도 유예를 신청할 수 있나요?", a: "돼요. 임신확인서와 출산예정일 진단서를 제출하면 출산 전 45일부터 유예가 시작돼요." },
  { q: "유예가 자동 적용되나요?", a: "아니에요. 반드시 본인이 신청해야 해요. 자동 적용이 안 되니 출산 전후로 꼭 고용센터에 알리세요." },
  { q: "출산 후 90일 넘게 쉬고 싶으면요?", a: "유예는 최대 90일이에요. 그 이후에도 취업이 어려우면 수급기간 연장(최대 4년)을 별도로 신청할 수 있어요." },
  { q: "출산전후휴가와 뭐가 다른가요?", a: "출산전후휴가는 재직 중인 근로자가 받는 거예요. 출산 실업인정 유예는 퇴직 후 실업급여를 받는 중에 출산할 때 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법(법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24(고용노동부)", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청", title: "실업급여 신청 방법", description: "실업급여 기본 신청 절차를 확인하세요." },
  { slug: "출산전후휴가", title: "출산전후휴가 제도", description: "재직 중이라면 출산전후휴가 조건과 급여를 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 실업급여 · 출산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산 중 실업급여, 끊기나요?<br />
        실업인정 유예 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/실업급여-신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>를 받고 있는데 출산이 다가오니 걱정되시죠?
        구직활동을 못 하면 급여가 끊기는 거 아닌가 싶고요.
        걱정하지 마세요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 출산으로 구직활동이 어려운 경우 실업인정을 유예해주고 있어요.
        출산 전 45일, 출산 후 45일까지 총 90일간 구직급여가 계속 나와요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>핵심부터 정리하면요</H2>
      <p style={body}>
        출산 실업인정 유예의 핵심은 간단해요.
        실업인정(구직활동 확인 절차)만 면제되고, 구직급여는 계속 나온다는 거예요.
      </p>

      <GreenBox title="출산 실업인정 유예 핵심">
        · 유예 기간: 출산 전 45일 + 출산 후 45일 = 총 90일<br />
        · 구직급여: 유예 중에도 정상 지급<br />
        · 고용센터 출석: 유예 기간 동안 면제<br />
        · 수급일수: 유예 기간도 수급일수에 포함<br />
        · 신청: 본인이 직접 해야 함 (자동 적용 아님)
      </GreenBox>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        출산 전에 미리 신청해도 되고, 출산 후에 한꺼번에 신청해도 소급 인정돼요.
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 신청하거나 고용센터를 방문하세요.
      </p>

      <SectionBadge>유예 신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>필요한 서류</H2>
      <p style={body}>
        출산 시점에 따라 필요한 서류가 달라져요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        유예 기간(90일)이 끝나면 다시 고용센터에 출석해서 실업인정을 받아야 해요.
        유예가 끝난 뒤에도 취업이 어려우면 수급기간 연장(임신·출산·육아 사유로 최대 4년)을
        별도로 신청할 수 있어요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 및 고용24 공개 자료를 바탕으로 작성했어요. 개별 수급 조건은 관할 고용센터에서 최종 확인하세요." />
    </ArticleLayout>
  );
}
