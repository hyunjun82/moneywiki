"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 소액사건 소장 작성: 필수 기재 사항 및 양식 작성법 info
// Q2: 소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요.
// Q3: 소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요., 대법원 전자소송 사이트에서 양식 다운로드 가능해요., 3,000만원 이하 금전 청구는 소액사건으로 진행할 수 있어요.
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야", desc: "소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요." },
  { title: "대법원 전자소송 사이트에서 양식 다운로드 가능해요.", desc: "대법원 전자소송 사이트에서 양식 다운로드 가능해요." },
  { title: "3,000만원 이하 금전 청구는 소액사건으로 진행할 수", desc: "3,000만원 이하 금전 청구는 소액사건으로 진행할 수 있어요." },
];
const CHECKLIST = [
  "소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요.",
  "대법원 전자소송 사이트에서 양식 다운로드 가능해요.",
  "3,000만원 이하 금전 청구는 소액사건으로 진행할 수 있어요."
];

const FAQS = [
  { q: "소액사건 소장 어디서 받나요?", a: "대법원 전자소송 사이트나 가까운 법원 민원실에서 양식을 받을 수 있어요." },
  { q: "변호사 없이 혼자 작성 가능한가요?", a: "네, 가능해요. 양식에 맞춰 사실관계만 정확히 쓰면 돼요." },
  { q: "소장에 뭘 꼭 써야 하나요?", a: "원고와 피고 인적사항, 청구 취지(얼마 달라), 청구 원인(왜 달라)을 반드시 써야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "소액사건심판법", url: "https://www.law.go.kr/법령/소액사건심판법" },
      { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소액사건 소장 작성<br />
        필수 기재 사항 및 양식 작성법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        소액사건 소장을 어떻게 써야 할지 막막하시죠. 필수로 써야 할 내용부터 실제 양식 작성법까지 자세히 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야</H2>
      <p style={body}>소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요.</p>
      <GreenBox title="핵심 정리">
        소장에는 당사자, 청구 취지, 청구 원인을 반드시 써야 해요.<br />
        대법원 전자소송 사이트에서 양식 다운로드 가능해요.<br />
        3,000만원 이하 금전 청구는 소액사건으로 진행할 수 있어요.
      </GreenBox>

      <CategoryButton label="법률 정보" count={5} href="/category/법률" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>대법원 전자소송 사이트에서 양식 다운로드 가능</H2>
      <p style={body}>대법원 전자소송 사이트에서 양식 다운로드 가능해요.</p>
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
