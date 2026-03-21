"use client";

// Q1. 미국 주식 등 해외주식을 팔아서 수익이 났는데, 세금을 얼마나 내야 하고 어떻게 신고해야 하는지 모르는 상황
// Q2. 양도차익 계산 → 250만원 공제 → 세금 22% 계산 → 5월에 홈택스 신고
// Q3. 250만원 기본공제, 22% 세율(20%+지방세2%), 손익통산, 환차익 과세, 5월 신고 미신고 가산세
// Q4. GreenBox(계산 예시) + BorderBox(손익통산 예시) + GreenBox(절세 전략) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "연간 양도차익 250만원까지는 세금이 없어요",
  "같은 해 해외주식 손실과 이익을 합산(손익통산)할 수 있어요",
  "부부는 각자 계좌를 쓰면 250만원씩 공제받아요",
  "신고는 매년 5월에 홈택스에서 직접 해요",
  "미신고 시 무신고 가산세 20%가 붙어요",
];

const FAQS = [
  {
    q: "해외주식 세금은 얼마인가요?",
    a: "양도차익에서 연간 250만원 공제 후 22%(양도세 20% + 지방세 2%)예요. 양도차익 1,000만원이면 750만원에 22%인 165만원이에요.",
  },
  {
    q: "해외주식 세금 신고는 언제 하나요?",
    a: "다음 해 5월 1일~31일에 홈택스에서 신고해요. 증권사가 대신 해주지 않아요. 본인이 직접 신고해야 해요.",
  },
  {
    q: "손실이 났으면 세금 안 내나요?",
    a: "같은 해 다른 해외주식 이익과 손실을 합산(손익통산)할 수 있어요. 전체 순이익이 250만원 이하면 세금이 없어요. 다음 해로 이월은 안 돼요.",
  },
  {
    q: "미신고하면 어떻게 되나요?",
    a: "무신고 가산세 20%, 과소신고 가산세 10%, 납부지연 가산세 1일 0.022%가 붙어요. 신고 안 해도 국세청이 증권사 자료로 파악해요.",
  },
  {
    q: "배당금은 세금이 얼마예요?",
    a: "미국 주식 배당금은 현지에서 15% 원천징수해요. 국내에서는 금융소득 종합과세 대상이고, 이미 낸 외국세는 외국납부세액공제로 공제돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 (해외주식 양도소득)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 홈택스 - 양도소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "종합소득세", title: "종합소득세 신고 방법", description: "해외 배당이 2,000만원 넘으면 종합과세예요." },
  { slug: "양도소득세-계산", title: "양도소득세 계산 방법", description: "국내 부동산 양도세 계산 공식이에요." },
  { slug: "isa-계좌", title: "ISA 계좌 활용법", description: "해외 배당 비과세 혜택을 받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 해외주식 · 양도소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해외주식 세금 계산부터 신고까지<br />
        250만원 공제와 절세 전략
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외주식은 국내주식과 달리 금액에 관계없이 양도소득세를 내야 해요.
        연간 양도차익 250만원까지는 공제되고, 초과분에 22%가 붙어요.
        매년 5월에 홈택스에서 직접 신고해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>양도소득세 계산 공식</H2>
      <p style={body}>
        해외주식을 팔아서 이익이 났다면 <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>소득세법</a>에 따라 세금을 내야 해요.
        국내 상장주식은 대주주만 내지만, 해외주식은 금액에 관계없이 모든 투자자가 대상이에요.
      </p>
      <p style={body}>
        공식은 이래요: <strong>(양도차익 − 250만원) × 22%</strong>.
        250만원은 연간 기본공제예요. 1년에 한 번만 받아요. 부부라면 각자 250만원씩 받을 수 있어요.
      </p>

      <GreenBox>
        <strong>계산 예시: 양도차익 1,000만원</strong><br />
        <br />
        양도차익: 1,000만원<br />
        (−) 기본공제: 250만원<br />
        과세표준: 750만원<br />
        세율: 22% (양도세 20% + 지방세 2%)<br />
        <strong>납부세액: 165만원</strong><br />
        <br />
        ★ 환차익도 양도소득에 포함돼요. 달러 환율이 올라서 수익이 났으면 그것도 과세 대상이에요.
      </GreenBox>

      <H2>손익통산으로 세금 줄이는 법</H2>
      <p style={body}>
        같은 해 해외주식끼리는 이익과 손실을 합산할 수 있어요. A주식에서 500만원 벌었고 B주식에서 200만원 잃었으면,
        순이익 300만원에서 250만원 공제해서 50만원에만 22%가 붙어요.
      </p>

      <BorderBox>
        <strong>손익통산 예시</strong><br />
        <br />
        A주식 이익: +500만원<br />
        B주식 손실: −200만원<br />
        순이익: 300만원<br />
        (−) 기본공제: 250만원<br />
        과세표준: 50만원<br />
        <strong>납부세액: 11만원</strong><br />
        <br />
        ★ 단, 국내주식 손실과는 합산 안 돼요. 해외주식끼리만 가능해요.<br />
        ★ 다음 해로 손실 이월도 안 돼요. 같은 해에 정리해야 해요.
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>절세 전략 3가지</H2>
      <p style={body}>
        합법적으로 세금을 줄일 수 있는 방법이 있어요. 미리 알고 연말에 활용하세요.
      </p>

      <GreenBox>
        <strong>절세 전략</strong><br />
        <br />
        ① <strong>매년 250만원 기본공제 활용</strong><br />
        이익이 250만원 이하로 나오도록 연말에 일부 매도해요. 이월이 안 되니 해마다 쓰세요.<br />
        <br />
        ② <strong>손실 종목 연내 정리</strong><br />
        12월 안에 손실 종목을 매도해서 이익과 상계해요. 이월이 안 되니 같은 해에 처리해야 해요.<br />
        <br />
        ③ <strong>부부 분산 투자</strong><br />
        배우자도 해외주식 계좌를 열면 각자 250만원씩 공제받아요. 합산 500만원까지 비과세예요.
      </GreenBox>

      <H2>5월에 홈택스에서 직접 신고하세요</H2>
      <p style={body}>
        해외주식 양도소득세는 <strong>매년 5월 1일~31일</strong>에 신고해요.
        증권사가 대신 신고해주지 않아요. 본인이 직접 <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>홈택스</a>에서 신고해야 해요.
      </p>
      <p style={body}>
        증권사 거래내역서를 발급받아서 홈택스에 입력하면 돼요. 환율 자료도 필요해요.
        일부 증권사는 신고 대행 서비스를 제공하니 확인해보세요.
        미신고하면 무신고 가산세 20%가 붙어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 소득세법 기준으로 작성됐어요. 세율과 공제 한도는 변경될 수 있으니 국세청 또는 세무사에게 살펴봐요." />
    </ArticleLayout>
  );
}
