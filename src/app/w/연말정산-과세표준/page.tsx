"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 과세표준이 뭔지, 내 세율이 몇 %인지 알고 싶은 직장인
// Q2. 총급여에서 과세표준까지 계산 흐름을 이해하고, 내 구간의 세율을 확인한다
// Q3. 과세표준 계산 흐름(총급여→근로소득공제→소득공제→과세표준), 8단계 세율표, 누진공제 개념
// Q4. DocTable(세율표) + GreenBox(계산 흐름) + BorderBox(예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TAX_RATE_TABLE = {
  headers: ["과세표준", "세율", "누진공제액"],
  rows: [
    ["1,400만원 이하", "6%", "-"],
    ["1,400만원 초과~5,000만원 이하", "15%", "126만원"],
    ["5,000만원 초과~8,800만원 이하", "24%", "576만원"],
    ["8,800만원 초과~1억 5천만원 이하", "35%", "1,544만원"],
    ["1억 5천만원 초과~3억원 이하", "38%", "1,994만원"],
    ["3억원 초과~5억원 이하", "40%", "2,594만원"],
    ["5억원 초과~10억원 이하", "42%", "3,594만원"],
    ["10억원 초과", "45%", "6,594만원"],
  ],
};

const FAQS = [
  { q: "과세표준이 정확히 뭔가요?", a: "총급여에서 근로소득공제와 각종 소득공제를 뺀 금액이에요. 이 금액에 세율을 곱해서 세금을 계산해요. 쉽게 말하면 '세금 매기는 기준 금액'이에요." },
  { q: "과세표준이 높으면 무조건 세금이 많나요?", a: "네, 과세표준이 높을수록 적용 세율이 올라가요. 누진세 구조라서 구간이 넘어갈 때마다 초과분에 더 높은 세율이 적용돼요." },
  { q: "누진공제액은 뭔가요?", a: "누진세 계산을 간단히 하려고 만든 금액이에요. (과세표준 x 세율) - 누진공제액 = 산출세액으로 한 번에 계산할 수 있어요." },
  { q: "과세표준은 어디서 확인하나요?", a: "연말정산이 끝나면 회사에서 발급하는 원천징수영수증에 나와요. 홈택스에서도 조회할 수 있어요." },
  { q: "2025년 귀속에서 세율 구간이 바뀌었나요?", a: "네, 최저 구간이 변경됐어요. 6% 세율이 적용되는 구간이 1,200만원 이하에서 1,400만원 이하로 넓어졌어요. 과세표준 1,200~1,400만원인 분은 세금이 줄어요." },
  { q: "과세표준을 줄이려면 어떻게 해요?", a: "소득공제를 많이 받으면 돼요. 인적공제, 신용카드 사용액, 주택청약저축 등이 대표적이에요. 소득공제를 많이 받을수록 과세표준이 낮아지고 세율도 내려갈 수 있어요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제55조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도 비교." },
  { slug: "연말정산-부양가족-공제", title: "연말정산 부양가족 공제", description: "가족 1명당 150만원 소득공제 조건." },
  { slug: "연말정산-공무원", title: "공무원 연말정산", description: "공무원연금 기여금 공제와 차이점." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 과세표준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 과세표준, 내 세율은 몇 %일까?<br />
        8단계 세율표와 계산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 결과를 보면 과세표준이란 항목이 나오는데 이게 뭔지 모르겠다는 분이 많아요. 과세표준은 세금을 매기는 기준 금액이에요. 총급여 전체가 아니라, 여러 공제를 빼고 남은 금액에 세금이 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>과세표준 계산 흐름</H2>
      <p style={body}>
        총급여에서 단계별로 빼나가면 과세표준이 나와요.
      </p>

      <GreenBox>
        총급여 (연봉 - 비과세소득){"\n"}
        → 근로소득공제 차감 → 근로소득금액{"\n"}
        → 소득공제 차감 (인적공제, 신용카드 등){"\n"}
        → 과세표준 확정 → 세율 적용 → 산출세액
      </GreenBox>

      <p style={body}>
        예를 들어 총급여 5,000만원이면 근로소득공제 약 1,475만원을 빼서 근로소득금액 3,525만원이 돼요. 여기서 인적공제, 신용카드 등 소득공제를 빼면 과세표준이 나오는 거예요.
      </p>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>과세표준별 세율표 (2025년 귀속)</H2>
      <p style={body}>
        과세표준 구간에 따라 세율이 6%부터 45%까지 8단계로 나뉘어요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제55조</a>에 규정된 세율이에요.
      </p>
      <SectionBadge>2025년 귀속 종합소득세 세율표</SectionBadge>
      <DocTable headers={TAX_RATE_TABLE.headers} rows={TAX_RATE_TABLE.rows} />

      <Divider />

      <H2>실제 계산은 이렇게 해요</H2>
      <p style={body}>
        누진세는 구간별로 세율이 달라지지만, 누진공제액을 쓰면 한 번에 계산할 수 있어요.
      </p>

      <BorderBox>
        <strong>과세표준 3,000만원인 경우</strong><br />
        3,000만원 x 15% - 126만원(누진공제) = 324만원 (산출세액){"\n"}
        여기서 세액공제를 빼면 결정세액이 나와요{"\n"}{"\n"}
        <strong>과세표준 6,000만원인 경우</strong><br />
        6,000만원 x 24% - 576만원(누진공제) = 864만원 (산출세액)
      </BorderBox>

      <p style={body}>
        산출세액에서 세액공제(의료비, 교육비, 연금저축 등)를 빼면 최종 결정세액이 나와요. <a href="/w/연말정산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산 공제항목</a>을 잘 챙기면 세금을 크게 줄일 수 있어요.
      </p>

      <Divider />

      <H2>과세표준과 세율, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 소득세법 제55조를 기준으로 작성했어요. 세율 구간은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
