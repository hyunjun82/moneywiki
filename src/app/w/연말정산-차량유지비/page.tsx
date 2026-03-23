"use client";

// Q1. 연말정산 차량유지비에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 차량유지비는 연말정산 공제 대상이 아니에요., 회사에서 받는 자가운전보조금만 월 20만원까지 비과세예요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "차량유지비도 연말정산 공제받을 수 있나요?", a: "아니요, 개인 차량 유류비나 보험료는 공제 대상이 아니에요." },
  { q: "자가운전보조금이 뭐예요?", a: "회사 업무를 위해 개인 차량을 사용할 때 받는 수당으로 월 20만원까지 비과세예요." },
  { q: "회사 차량 관련 비용은요?", a: "회사 차량은 회사 경비이므로 개인 연말정산과 무관해요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "연말정산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-bigwase-geunrosodeuk", title: "연말정산 비과세 근로소득", description: "관련 내용 정리." },
  { slug: "연말정산-sinnyongkadeu-sodeukgongje", title: "연말정산 신용카드", description: "관련 내용 정리." },
  { slug: "연말정산-sodeukgongje", title: "연말정산 소득공제", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 차량유지비
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        차량유지비는 연말정산 공제 대상이 아니에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>차량유지비 공제가 안 되는 이유는요?</H2>
      <p style={body}>소득세법에서 연말정산 공제 대상은 교육비, 의료비, 보험료처럼 공익적 성격이 있거나 정책적으로 장려하는 지출이에요. 차량유지비는 개인 소비에 해당해서 공제 대상에 포함되지 않죠. 예를 들어 유류비 월 30만원, 보험료 월 10만원 내도 연말정산에서는 공제받을 수 없어요.</p>
      <GreenBox>
        차량유지비는 연말정산 공제 대상이 아니에요.{"\n"}
        회사에서 받는 자가운전보조금만 월 20만원까지 비과세예요.{"\n"}
        개인 차량 유류비나 보험료는 공제받을 수 없어요.
      </GreenBox>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>자가운전보조금은 뭐예요?</H2>
      <p style={body}>회사 업무용 개인 차량 사용 수당이에요.</p>
      <BorderBox>
        <strong>자가운전보조금은 뭐예요?</strong><br />
        회사 업무용 개인 차량 사용 수당이에요.<br />
        자가운전보조금은 회사 업무를 위해 본인 차량을 사용할 때 회사가 지급하는 수당이에요. 월 20만원까지 비과세 근로소득으로 인정돼요. 예를 들어 회사에서 매달 자가운전보조금 25만원을 준다면, 20만원은 비과세이고 나
      </BorderBox>
      <p style={body}>자가운전보조금은 회사 업무를 위해 본인 차량을 사용할 때 회사가 지급하는 수당이에요. 월 20만원까지 비과세 근로소득으로 인정돼요. 예를 들어 회사에서 매달 자가운전보조금 25만원을 준다면, 20만원은 비과세이고 나머지 5만원은 과세 대상이 되는 거죠. 급여명세서에서 비과세 항목으로 표시돼요.</p>

      <Divider />
      <H2>신용카드로 주유하면요?</H2>
      <p style={body}>주유소에서 신용카드로 결제하면 신용카드 소득공제는 받을 수 있어요. 하지만 이건 차량유지비 자체를 공제받는 게 아니라, 신용카드 사용액으로 공제받는 거죠. 총급여 25%를 초과한 금액의 15%(신용카드) 또는 30%(체크카드)를 소득공제받아요. 예를 들어 연봉 5,000만원이면 1,250만원 넘게 쓴 부분부터 공제되는 거예요.</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
