"use client";

// Q1. 법인세율 2026에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "2026년 법인세율이 뭐가 바뀌었어요?", a: "2025년까지는 2억 이하 9%, 2억~200억 19% 등이었는데, 2026년부터는 2억 이하 10%, 2억~200억 20%로 각각 1%p씩 올랐어요." },
  { q: "법인세 구간이 몇 개나 되나요?", a: "총 4개 구간이에요. 2억 이하, 2억~200억, 200억~3,000억, 3,000억 초과로 나뉘어 있어요." },
  { q: "중소기업도 높아진 세율을 내야 하나요?", a: "네, 중소기업도 같은 세율이 적용돼요. 다만 세액공제나 감면 혜택을 받을 수 있으니 확인해보세요." },
  { q: "법인세율 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "법인세율 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746&mi=2372" },
  { name: "국세법령정보", href: "https://taxlaw.nts.go.kr" },
];

const RELATED = [
  { slug: "법인세-신고-기간-홈택스-전자신고", title: "법인세 신고 기간 및 방법", description: "관련 내용 정리." },
  { slug: "법인-차량-운행일지-작성-방법", title: "법인 차량 운행일지 작성 방법", description: "관련 내용 정리." },
  { slug: "접대비-한도-법인-손금산입-기준", title: "접대비 한도 및 손금산입 기준", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        법인세율 , 과세표준 구간별 소득금액 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년부터 법인세율이 인상되어요. 소득금액별 과세표준 구간과 적용 세율을 알려드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 법인세율, 구간별로 정확히 알아보세요</H2>
      <p style={body}>2026년부터 국세청이 발표한 법인세율이 적용돼요. 소득금액의 크기에 따라 4개 구간으로 나뉘어요. 각 구간마다 다른 세율이 적용되니까 본인 회사가 어느 구간에 해당하는지 먼저 확인해보세요.</p>
      <GreenBox>
        2026년부터 법인세율이 인상되어요. 소득금액별 과세표준 구간과 적용 세율을 알려드릴게요.
      </GreenBox>
      <p style={body}>여기서 과세표준이라는 용어가 나오는데, 쉽게 말해서 법인세를 계산할 때 기준이 되는 소득금액이라고 생각하면 돼요. 매출에서 비용을 빼고, 여기에 손금으로 인정 안 되는 항목들을 다시 더한 금액이 과세표준이에요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>언제부터 적용되나요?</H2>
      <p style={body}>2026년 1월 1일 이후에 개시하는 사업연도부터 새로운 세율이 적용돼요. 예를 들어 1월부터 12월이 사업연도인 회사라면 2026년부터 바로 이 세율을 적용받는 거예요. 하지만 3월이나 6월, 9월이 결산월인 회사라면 그 달이 시작되는 시점부터 적용되니까 본인의 사업연도 개시일을 확인해야 해요.</p>
      <BorderBox>
        <strong>언제부터 적용되나요?</strong><br />
        2026년 1월 1일 이후에 개시하는 사업연도부터 새로운 세율이 적용돼요. 예를 들어 1월부터 12월이 사업연도인 회사라면 2026년부터 바로 이 세율을 적용받는 거예요. 하지만 3월이나 6월, 9월이 결산월인 회사
      </BorderBox>

      <Divider />
      <H2>소득금액별로 계산해보세요</H2>
      <p style={body}>예시를 통해 실제로 얼마나 세금이 달라지는지 보여드릴게요.</p>
      <p style={body}>2억 원의 순이익이 난 회사
- 2025년: 2억 × 9% = 1,800만 원
- 2026년: 2억 × 10% = 2,000만 원
- 세금 증가액: 200만 원</p>
      <p style={body}>50억 원의 순이익이 난 회사
- 2025년: 50억 × 19% = 9.5억 원
- 2026년: 50억 × 20% = 10억 원
- 세금 증가액: 5,000만 원</p>

      <Divider />
      <H2>법인세율 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
