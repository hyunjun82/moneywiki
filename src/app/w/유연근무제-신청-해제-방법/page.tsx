"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 유연근무제 신청 및 해제: 유연근무제 신청 절차 및 유연근무제 해제 방법 info
// Q2: 유연근무제는 근로자가 신청하고 회사가 승인해요
// Q3: 유연근무제는 근로자가 신청하고 회사가 승인해요, 해제는 별도 서식으로 복무담당부서에 신청해요, 근로계약 변경사항이므로 일방적 변경은 불가해요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "유연근무제는 근로자가 신청하고 회사가 승인해요", desc: "유연근무제는 근로자가 신청하고 회사가 승인해요" },
  { title: "해제는 별도 서식으로 복무담당부서에 신청해요", desc: "해제는 별도 서식으로 복무담당부서에 신청해요" },
  { title: "근로계약 변경사항이므로 일방적 변경은 불가해요", desc: "근로계약 변경사항이므로 일방적 변경은 불가해요" },
];
const CHECKLIST = [
  "유연근무제는 근로자가 신청하고 회사가 승인해요",
  "해제는 별도 서식으로 복무담당부서에 신청해요",
  "근로계약 변경사항이므로 일방적 변경은 불가해요"
];

const FAQS = [
  { q: "유연근무제 신청했다가 다시 원래대로 돌아갈 수 있나요?", a: "가능해요. 해제 신청서를 작성해서 복무담당부서에 제출하면 돼요. 다만 근로계약 변경사항이므로 회사 승인이 필요해요." },
  { q: "유연근무제 해제하면 불이익 받나요?", a: "법적으로 불이익은 없어요. 다만 회사 내규나 취업규칙에 따라 절차가 다를 수 있으니 인사팀에 먼저 확인하세요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1326&ccfNo=3&cciNo=1&cnpClsNo=1" },
      { label: "고용노동부", url: "https://www.moel.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        유연근무제 신청 및 해제<br />
        유연근무제 신청 절차 및 유연근무제 해제 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        유연근무제를 해제하고 싶을 때 어떻게 해야 하는지 알려드려요. 신청 서식부터 절차까지 한눈에 확인하세요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>유연근무제는 근로자가 신청하고 회사가 승인해요</H2>
      <p style={body}>유연근무제는 근로자가 신청하고 회사가 승인해요</p>
      <GreenBox title="핵심 정리">
        유연근무제는 근로자가 신청하고 회사가 승인해요<br />
        해제는 별도 서식으로 복무담당부서에 신청해요<br />
        근로계약 변경사항이므로 일방적 변경은 불가해요
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>해제는 별도 서식으로 복무담당부서에 신청해요</H2>
      <p style={body}>해제는 별도 서식으로 복무담당부서에 신청해요</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
