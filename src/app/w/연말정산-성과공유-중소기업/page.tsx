"use client";
// Q1: 연말정산 성과공유 중소기업 info
// Q2: 성과공유 중소기업 경영성과급 50% 소득세 감면이에요.
// Q3: 성과공유 중소기업 경영성과급 50% 소득세 감면이에요., 연 500만원 한도예요., 성과공유제 등록 중소기업 근로자가 대상이에요.
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "성과공유 중소기업 경영성과급 50% 소득세 감면이에요.",
  "연 500만원 한도예요.",
  "성과공유제 등록 중소기업 근로자가 대상이에요."
];

const FAQS = [
  { q: "감면율이 얼마예요?", a: "소득세 50% 감면이에요. 성과급 500만원 받으면 절반인 250만원만 과세돼요." },
  { q: "모든 중소기업이 해당돼요?", a: "아니요. 성과공유제를 도입하고 고용노동부에 등록한 기업만 해당돼요." },
  { q: "연봉에 포함된 성과급도 해당돼요?", a: "아니요. 경영성과에 따라 추가로 지급하는 성과급만 해당돼요." },
  { q: "중소기업 취업자 감면이랑 중복 적용되나요?", a: "안 돼요. 둘 중 유리한 걸로 회사에서 자동 적용해요." },
  { q: "따로 신청해야 하나요?", a: "아니요. 회사에서 급여 지급할 때 자동으로 감면 적용해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 중소기업 성과공유", url: "https://www.nts.go.kr" },
      { label: "조세특례제한법 제29조의6", url: "https://www.law.go.kr/법령/조세특례제한법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 성과공유 중소기업
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        성과공유 중소기업에서 받은 경영성과급은 50% 소득세 감면 혜택이 있어요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>성과공유 중소기업 경영성과급 50% 소득세 감면이에요.</H2>
      <p style={body}>성과공유 중소기업 경영성과급 50% 소득세 감면이에요.</p>
      <GreenBox title="핵심 정리">
        성과공유 중소기업 경영성과급 50% 소득세 감면이에요.<br />
        연 500만원 한도예요.<br />
        성과공유제 등록 중소기업 근로자가 대상이에요.
      </GreenBox>

      <CategoryButton label="세금 · 연말정산 정보" count={5} href="/category/연말정산" />
      <RelatedArticles items={[]} />
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
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
