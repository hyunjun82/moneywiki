"use client";

// Q1. 종합부동산세에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 1세대 1주택자는 공시가격 12억원 이상부터 종합부동산세 과세대상이에요., 다주택자는 공시가격 9억원 초과 주택부터 과세돼요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "종합부동산세는 언제 내나요?", a: "과세기준일은 매년 6월 1일이에요. 납부는 12월에 해요. 재산세는 지방세로 7월과 9월에 내고, 종합부동산세는 국세로 12월에 내죠." },
  { q: "1세대 1주택자 종합부동산세 기준은?", a: "1세대 1주택자는 공시가격 12억원 이상부터 종합부동산세 과세대상이에요. 12억원 미만이면 종부세를 안 내요." },
  { q: "종합부동산세 세율은 얼마예요?", a: "주택분 종합부동산세 세율이 주택 수에 따른 차등과세에서 가액기준 과세로 전환되고 세율 자체도 인하됐어요. 누진세율이 적용돼요." },
  { q: "종합부동산세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "종합부동산세 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "국세청 종합부동산세 개요", href: "https://www.nts.go.kr" },
  { name: "종합부동산세법", href: "https://www.law.go.kr" },
];

const RELATED = [
  { slug: "재산세-납부", title: "재산세 납부 기간", description: "관련 내용 정리." },
  { slug: "양도소득세-비과세", title: "양도소득세 비과세 요건", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종합부동산세 과세대상 기준 세율
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        1세대 1주택자는 공시가격 12억원 이상부터 종합부동산세 과세대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>종합부동산세란</H2>
      <p style={body}>종합부동산세는 과세기준일(매년 6월 1일) 현재 국내에 소재한 재산세 과세대상인 주택 및 토지를 유형별로 구분하여 인별로 합산한 결과, 그 공시가격 합계액이 각 유형별로 공제금액을 초과하는 경우 그 초과분에 대하여 과세되는 세금이에요.</p>
      <GreenBox>
        1세대 1주택자는 공시가격 12억원 이상부터 종합부동산세 과세대상이에요.{"\n"}
        다주택자는 공시가격 9억원 초과 주택부터 과세돼요.{"\n"}
        종합합산토지 5억원, 별도합산토지 80억원 초과 시 과세돼요.
      </GreenBox>
      <p style={body}>다시 말해 비싼 집이나 여러 채를 가진 사람에게 추가로 부과하는 세금이에요. 재산세는 지방세인데, 종합부동산세는 국세예요.</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>종합부동산세 과세대상 기준 금액</H2>
      <p style={body}>1세대 1주택자는 공시가격 12억원 이상을 기준으로 해요. 다주택자는 아파트나 다가구 등의 주택 과세대상이 공시가격 9억원 초과예요.</p>
      <BorderBox>
        <strong>종합부동산세 과세대상 기준 금액</strong><br />
        1세대 1주택자는 공시가격 12억원 이상을 기준으로 해요. 다주택자는 아파트나 다가구 등의 주택 과세대상이 공시가격 9억원 초과예요.<br />
        종합합산토지(나대지·잡종지 등)와 별도합산토지(상가·사무실 등)는 각각 5억원, 80억원을 초과해야 종부세 과세대상이에요.
      </BorderBox>
      <p style={body}>종합합산토지(나대지·잡종지 등)와 별도합산토지(상가·사무실 등)는 각각 5억원, 80억원을 초과해야 종부세 과세대상이에요.</p>

      <Divider />
      <H2>종합부동산세 세율</H2>
      <p style={body}>종부세는 누진세율이 적용되는 시스템이에요. 주택분 종합부동산세 세율이 주택 수에 따른 차등과세에서 가액기준 과세로 전환되고 세율 자체도 인하됐어요.</p>
      <p style={body}>2026년 변경사항으로 인구감소지역의 주택 취득자에 대한 양도소득세 및 종합부동산세 특례가 적용되는 주택 가액을 수도권 공시가격 4억원, 비수도권 공시가격 9억원으로 상향됐어요. 이는 2025년 8월 14일 이후 취득하는 분부터 적용돼요.</p>
      <p style={body}>1차로 부동산 소재지 관할 시·군·구에서 관내 부동산을 과세유형별로 구분하여 재산세를 부과하고, 2차로 각 유형별 공제액을 초과하는 부분에 대하여 주소지(본점 소재지) 관할세무서에서 종합부동산세를 부과해요.</p>

      <Divider />
      <H2>종합부동산세 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
