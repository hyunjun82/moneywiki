"use client";

// Q1. 퇴직금을 받으면 세금이 얼마나 빠지는지 궁금한 상황
// Q2. 퇴직소득세 계산 구조를 이해하고, IRP 이전으로 절세 여부를 판단한다
// Q3. 퇴직소득세 계산 흐름(근속연수공제→환산급여→세율), 근속연수별 세율, IRP 이전 절세 효과
// Q4. DocTable(근속연수공제표) + GreenBox(계산 흐름) + Steps(IRP 절세 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEDUCTION_TABLE = {
  headers: ["근속연수", "공제액"],
  rows: [
    ["5년 이하", "30만원 × 근속연수"],
    ["6~10년", "150만원 + 50만원 × (근속연수 - 5)"],
    ["11~20년", "400만원 + 80만원 × (근속연수 - 10)"],
    ["20년 초과", "1,200만원 + 120만원 × (근속연수 - 20)"],
  ],
};

const STEPS_DATA = [
  { title: "퇴직금 수령 방법 선택", desc: "일시금으로 바로 받을지, IRP로 이전할지 선택해요. IRP로 넣으면 세금을 나중에 내요." },
  { title: "IRP 계좌로 이전", desc: "퇴직금 전액을 IRP로 이전하면 퇴직소득세가 즉시 과세되지 않아요." },
  { title: "55세 이후 연금 수령", desc: "IRP에서 연금으로 수령하면 퇴직소득세의 30~40%를 감면받아요. 연금소득세 3.3~5.5%만 내면 돼요." },
];

const FAQS = [
  { q: "퇴직금 1억에 세금이 얼마나 나오나요?", a: "근속연수에 따라 크게 달라요. 10년 근속이면 약 300~400만원(3~4%), 20년이면 약 100만원(1%) 수준이에요. 근속연수가 길수록 공제가 커져서 세금이 확 줄어요." },
  { q: "근속연수공제가 핵심인가요?", a: "맞아요. 퇴직소득세 계산에서 근속연수공제가 가장 큰 영향을 줘요. 오래 일할수록 공제가 커져서 실효세율이 낮아지는 구조예요." },
  { q: "IRP로 이전하면 세금을 아낄 수 있나요?", a: "네. 일시금으로 받으면 퇴직소득세 전액을 바로 내지만, IRP를 거쳐 연금으로 받으면 30~40% 감면돼요. 장기적으로 유리해요." },
  { q: "중간정산 받은 퇴직금도 퇴직소득세를 내나요?", a: "네. 중간정산도 퇴직소득세 과세 대상이에요. 다만 근속연수는 중간정산 시점까지로 계산하니 공제가 적을 수 있어요." },
  { q: "퇴직소득세 환급받을 수 있는 경우가 있나요?", a: "원천징수된 세금이 실제 산출세액보다 많으면 환급받을 수 있어요. 다음 해 5월 종합소득세 신고 시 정산돼요." },
  { q: "퇴직금에 지방소득세도 별도로 내나요?", a: "네. 퇴직소득세의 10%를 지방소득세로 추가 납부해요." },
];

const SOURCES = [
  { name: "소득세법 제48조 (퇴직소득공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 퇴직소득세 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 비교", description: "일시금과 연금의 세금 차이." },
  { slug: "근로복지공단-퇴직연금-수령방법", title: "근로복지공단 퇴직연금 수령", description: "퇴직연금 수령 절차와 방법." },
  { slug: "개인퇴직연금-해지", title: "개인퇴직연금 해지", description: "IRP 중도 해지 시 세금과 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 퇴직소득세 · 절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금에 세금이 얼마나 빠질까?<br />
        퇴직소득세 계산 구조와 절세 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>퇴직금을 받으면 세금이 얼마나 빠지는지 걱정되죠. 하지만 일반 소득세보다 훨씬 적어요.</p>
      <p style={body}><a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에서 퇴직소득에는 근속연수공제를 크게 적용해요. 10년 일했으면 퇴직금 1억에 세금이 3~4% 수준이고, 20년이면 1% 정도예요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직소득세 계산 구조</H2>
      <p style={body}>복잡해 보이지만 핵심은 근속연수공제예요.</p>
      <GreenBox title="계산 흐름">
        1단계: 퇴직금 - 근속연수공제 = 환산급여 기초{"\n"}
        2단계: 환산급여 × 기본세율 적용{"\n"}
        3단계: 산출세액 + 지방소득세(10%){"\n"}
        핵심: 근속연수가 길수록 공제 ↑ 세금 ↓
      </GreenBox>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>근속연수별 공제 금액</H2>
      <p style={body}>오래 일할수록 공제가 급격히 커져요.</p>
      <SectionBadge>근속연수공제표</SectionBadge>
      <DocTable headers={DEDUCTION_TABLE.headers} rows={DEDUCTION_TABLE.rows} />
      <p style={body}>20년 근속이면 공제액이 1,200만원이에요. 퇴직금 대비 공제 비율이 높아서 실효세율이 1~2%까지 낮아지죠.</p>
      <Divider />

      <H2>IRP로 이전하면 세금을 더 줄일 수 있어요</H2>
      <p style={body}>퇴직금을 바로 받지 않고 IRP로 넘기면 절세 효과가 커요.</p>
      <SectionBadge>IRP 절세 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <BorderBox>
        <strong>IRP 연금 수령 시 세금 감면</strong><br />
        연금 수령 시 퇴직소득세 30~40% 감면{"\n"}<br />
        실효세율: 연금소득세 3.3~5.5% 수준{"\n"}<br />
        일시금 대비 절세 효과 큼
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>퇴직소득세에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 정확한 퇴직소득세는 근속연수, 퇴직금액, 기납부세액에 따라 달라지니, 국세청(nts.go.kr) 퇴직소득세 계산기를 활용하세요." />
    </ArticleLayout>
  );
}
