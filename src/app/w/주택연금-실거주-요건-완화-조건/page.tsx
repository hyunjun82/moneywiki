"use client";

// Q1. 주택연금 실거주에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 2026년 6월부터 질병치료·자녀봉양·노인시설 입주 시 실거주 안 해도 가입 가능해요, 기존 가입자도 요양원 가거나 병원 입원해도 연금 계속 받을 수 있어요
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "주택연금 실거주 안 하고 병원에 장기 입원해도 연금이 계속 나오나요?", a: "2026년 6월부터는 질병치료를 위한 입원이나 요양병원 입소도 불가피한 사유로 인정돼서 연금이 계속 지급돼요." },
  { q: "실거주 요건 없이 자녀와 함께 살고 있어도 주택연금 가입되나요?", a: "자녀 봉양을 위해 자녀 집에 거주하는 경우도 2026년 6월부터 예외 사유로 인정돼요. 부부합산 1주택자 요건만 충족하면 돼요." },
  { q: "주택연금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "주택연금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "주택연금 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "한국주택금융공사", href: "https://www.hf.go.kr" },
  { name: "서울신문 - 주택연금 실거주 의무 예외", href: "https://www.seoul.co.kr/news/economy/finance/2026/02/05/20260205500343" },
];

const RELATED = [
  { slug: "주택연금-가입조건-수령액-계산", title: "주택연금 가입조건 수령액 계산", description: "관련 내용 정리." },
  { slug: "주택연금-이사-가능-담보주택-변경", title: "주택연금 이사 가능 담보주택 변경", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택연금 실거주 요건 완화 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 6월부터 질병치료·자녀봉양·노인시설 입주 시 실거주 안 해도 가입 가능해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주택연금 실거주 요건이란 뭔가요?</H2>
      <p style={body}>담보로 제공하는 집에 실제로 거주해야 주택연금을 받을 수 있다는 조건이에요.</p>
      <GreenBox>
        2026년 6월부터 질병치료·자녀봉양·노인시설 입주 시 실거주 안 해도 가입 가능해요{"\n"}
        기존 가입자도 요양원 가거나 병원 입원해도 연금 계속 받을 수 있어요{"\n"}
        부부합산 1주택자여야 하고 불가피한 사유를 증명해야 해요
      </GreenBox>
      <p style={body}>한국주택금융공사에서 운영하는 주택연금은 본인 소유 주택을 담보로 매달 연금을 받는 제도예요.
그동안은 담보주택에 반드시 살고 있어야만 가입이 가능했고, 만 55세 이상이면 신청할 수 있어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>주택연금 실거주 기준 실거주 요건은 어떻게 바뀌나요?</H2>
      <p style={body}>주택연금 실거주 면제가 2026년 6월 1일부터 질병치료, 자녀봉양, 노인시설 입주까지 확대돼요.</p>
      <BorderBox>
        <strong>주택연금 실거주 기준 실거주 요건은 어떻게 바뀌나요?</strong><br />
        주택연금 실거주 면제가 2026년 6월 1일부터 질병치료, 자녀봉양, 노인시설 입주까지 확대돼요.<br />
        구체적으로 보면 이래요. 부부합산 1주택자가 이런 사유로 담보주택에 살지 못하는 경우, 예외로 인정돼요.
질병 치료를 위한 병원 입원, 요양병원 입소, 요양원 거주가 포함되고, 자녀를 봉양하기 위해 자녀 집에서 거주
      </BorderBox>
      <p style={body}>구체적으로 보면 이래요. 부부합산 1주택자가 이런 사유로 담보주택에 살지 못하는 경우, 예외로 인정돼요.
질병 치료를 위한 병원 입원, 요양병원 입소, 요양원 거주가 포함되고, 자녀를 봉양하기 위해 자녀 집에서 거주하는 경우도 인정돼요.</p>

      <Divider />
      <H2>주택연금 실거주 없이 요건 완화로 가입할 수 있나요?</H2>
      <p style={body}>주택연금 실거주 대신 요건 완화된 기준이 있으면 2026년 6월부터 담보주택에 안 살아도 연금을 받을 수 있어요.</p>
      <p style={body}>그러니까 정리하면 이래요. 기존에는 담보주택에 반드시 살아야 했지만, 이제는 예외 사유를 증명하면 되고, 가입 당시 실거주하지 않아도 돼요.
다만 부부합산 1주택자 요건은 계속 유지돼야 하고, 초기보증료는 주택가의 1.0%로 인하됐어요.</p>
      <p style={body}>한 가지 더 알아두실 게 있어요. 예외 사유로 인정받으려면 관련 서류를 제출해야 해요.
병원 입원 확인서, 요양원 입소 확인서, 자녀 주민등록등본 등이 필요하고, 서류 준비 기간은 보통 1~2주 정도 걸려요.</p>

      <Divider />
      <H2>주택연금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
