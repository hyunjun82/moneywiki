"use client";

// Q1: 불법사금융예방대출 조건 금리 신청방법 info
// Q2: 불법사금융 이용자 대상, 최대 100만원 대출
// Q3: 불법사금융 이용자 대상, 최대 100만원 대출, 기본 금리 12.5%, 이자페이백 적용 시 실질 5~6.3%, 완제자 재대출은 금리 4.5%로 더 낮아짐
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "불법사금융 이용자 대상, 최대 100만원 대출", desc: "불법사금융 이용자 대상, 최대 100만원 대출" },
  { title: "기본 금리 12.5%, 이자페이백 적용 시 실질 5~6", desc: "기본 금리 12.5%, 이자페이백 적용 시 실질 5~6.3%" },
  { title: "완제자 재대출은 금리 4.5%로 더 낮아짐", desc: "완제자 재대출은 금리 4.5%로 더 낮아짐" },
];
const CHECKLIST = [
  "불법사금융 이용자 대상, 최대 100만원 대출",
  "기본 금리 12.5%, 이자페이백 적용 시 실질 5~6.3%",
  "완제자 재대출은 금리 4.5%로 더 낮아짐"
];

const FAQS = [
  { q: "불법사금융예방대출 신용등급 낮아도 되나요?", a: "네, 가능해요. 불법사금융 피해자를 위한 상품이라 신용등급 제한이 완화돼요. 다만 상환 능력은 확인해요." },
  { q: "불법사금융예방대출 이자페이백이 뭔가요?", a: "대출 상환 완료 시 납부한 이자 일부를 돌려주는 제도예요. 실질 금리가 5~6.3%까지 낮아지는 효과가 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" },
      { label: "금융위원회", url: "https://www.fsc.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        불법사금융예방대출 조건 금리 신청방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        불법사금융 쓰고 있다면 예방대출로 갈아타세요. 최대 100만원, 이자페이백 적용 시 실질 5~6.3% 금리예요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>불법사금융 이용자 대상, 최대 100만원 대출</H2>
      <p style={body}>불법사금융 이용자 대상, 최대 100만원 대출</p>
      <GreenBox title="핵심 정리">
        불법사금융 이용자 대상, 최대 100만원 대출<br />
        기본 금리 12.5%, 이자페이백 적용 시 실질 5~6.3%<br />
        완제자 재대출은 금리 4.5%로 더 낮아짐
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>기본 금리 12.5%, 이자페이백 적용 시 실</H2>
      <p style={body}>기본 금리 12.5%, 이자페이백 적용 시 실질 5~6.3%</p>
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
