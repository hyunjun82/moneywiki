"use client";

// Q1: 퇴직소득 원천징수 세율 계산 방법 2026 info
// Q2: 퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 거예요
// Q3: 퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 거예요, 근속연수가 길수록 공제금액이 커져서 세금이 줄어들어요, 원천징수 신고는 퇴직금 지급한 다음 달 10일까지 해야 해요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 거예요",
  "근속연수가 길수록 공제금액이 커져서 세금이 줄어들어요",
  "원천징수 신고는 퇴직금 지급한 다음 달 10일까지 해야 해요"
];

const FAQS = [
  { q: "퇴직소득 원천징수세액은 어떻게 확인하나요?", a: "홈택스에서 퇴직소득세액 모의계산을 하거나, 회사에서 발급받은 원천징수영수증으로 확인할 수 있어요." },
  { q: "퇴직소득세를 안 떼면 어떻게 되나요?", a: "회사가 나중에 세금 내야 하고 가산세까지 내야 해요. 퇴직자는 다음 해 5월 종합소득세 신고 때 직접 신고해야 할 수도 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "국세청 퇴직소득 원천징수", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6447&cntntsId=7883" },
      { label: "국세청 퇴직소득세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6444&cntntsId=7880" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직소득 원천징수 세율 계산 방법 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직할 때 회사가 떼는 세금이 퇴직소득세예요. 근속연수에 따라 세율이 달라지고, 세액공제까지 받으면 실제 부담은 줄어들어요. 계산법과 신고 기한까지 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 </H2>
      <p style={body}>퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 거예요</p>
      <GreenBox title="핵심 정리">
        퇴직소득 원천징수는 퇴직금에서 회사가 미리 세금 떼는 거예요<br />
        근속연수가 길수록 공제금액이 커져서 세금이 줄어들어요<br />
        원천징수 신고는 퇴직금 지급한 다음 달 10일까지 해야 해요
      </GreenBox>

      <CategoryButton label="세금 · 절세 정보" count={5} href="/category/세금" />
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
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
