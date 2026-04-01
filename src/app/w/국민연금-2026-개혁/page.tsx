"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 2026년 국민연금 개혁 보험료율 인상 소득대체율 변화 info
// Q2: 보험료율 9%에서 매년 0.5%p 인상, 2033년 13% 도달 (월 7,700원~15,400원 부담 증가)
// Q3: 보험료율 9%에서 매년 0.5%p 인상, 2033년 13% 도달 (월 7,700원~15,400원 부담 증가), 소득대체율 41.5%에서 43%로 일시 인상, 연금 수령액 증가로 노후 보장 강화, 출산 크레딧 첫째부터 적용, 군복무 크레딧 12개월로 확대, 국가 지급 보장 법제화
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "보험료율 9%에서 매년 0.5%p 인상, 2033년 13% 도달 (월 7,700원~15,400원 부담 증가)",
  "소득대체율 41.5%에서 43%로 일시 인상, 연금 수령액 증가로 노후 보장 강화",
  "출산 크레딧 첫째부터 적용, 군복무 크레딧 12개월로 확대, 국가 지급 보장 법제화"
];

const FAQS = [
  { q: "2026년 국민연금 보험료가 얼마나 오르나요?", a: "월 평균소득 309만원 기준으로 직장인은 월 7,700원, 지역가입자는 월 15,400원 부담이 늘어나요. 보험료율이 9%에서 9.5%로 0.5%p 올랐기 때문이에요." },
  { q: "소득대체율 43%가 무슨 뜻인가요?", a: "은퇴 전 월급의 43%를 연금으로 받는다는 뜻이에요. 40년 가입 기준이고, 실제 수령액은 가입 기간과 납부 금액에 따라 달라져요." },
  { q: "기존 가입자도 변경된 소득대체율이 적용되나요?", a: "2026년 1월 1일 이후 납입분부터 43%가 적용돼요. 2025년까지 납부한 기간은 기존 기준(41.5%)이 적용되고, 두 기간을 합산해서 연금액이 계산돼요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "보건복지부 연금개혁 Q&A", url: "https://www.mohw.go.kr/menu.es?mid=a10714060000" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" },
      { label: "대한민국 정책브리핑", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148957270" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 국민연금 개혁 보험료율 인상 소득대체율 변화
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년부터 국민연금 보험료가 0.5%p 올라가고, 소득대체율도 43%로 인상돼요. 더 내고 더 받는 구조로 바뀌었어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>보험료율 9%에서 매년 0.5%p 인상, 2033년 1</H2>
      <p style={body}>보험료율 9%에서 매년 0.5%p 인상, 2033년 13% 도달 (월 7,700원~15,400원 부담 증가)</p>
      <GreenBox title="핵심 정리">
        보험료율 9%에서 매년 0.5%p 인상, 2033년 13% 도달 (월 7,700원~15,400원 부담 증가)<br />
        소득대체율 41.5%에서 43%로 일시 인상, 연금 수령액 증가로 노후 보장 강화<br />
        출산 크레딧 첫째부터 적용, 군복무 크레딧 12개월로 확대, 국가 지급 보장 법제화
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
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
