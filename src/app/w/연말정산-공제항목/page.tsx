"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산에서 어떤 공제를 받을 수 있는지 전체적으로 파악하려는 직장인
// Q2. 소득공제와 세액공제 차이를 이해하고, 본인에게 해당하는 공제항목을 찾아서 챙긴다
// Q3. 소득공제(인적·신용카드·주택자금 등) vs 세액공제(의료비·교육비·보험료·연금저축 등) 구분, 항목별 한도
// Q4. DocTable(공제항목 비교표) + GreenBox(핵심 차이) + BorderBox(한도 정보) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEDUCTION_TABLE = {
  headers: ["구분", "항목", "공제율/한도", "적용 방식"],
  rows: [
    ["소득공제", "인적공제 (기본)", "1인당 150만원", "소득에서 차감"],
    ["소득공제", "국민연금 보험료", "전액 공제", "소득에서 차감"],
    ["소득공제", "신용카드 등", "15~40% (한도 200~300만원)", "총급여 25% 초과분"],
    ["소득공제", "주택청약저축", "납입액 40% (연 300만원 한도)", "무주택 세대주"],
    ["세액공제", "자녀 세액공제", "첫째 25만, 둘째 30만, 셋째 40만원", "세금에서 차감"],
    ["세액공제", "의료비", "15% (한도 700만원)", "총급여 3% 초과분"],
    ["세액공제", "교육비", "15% (대학생 연 900만원)", "세금에서 차감"],
    ["세액공제", "보장성보험료", "12% (연 100만원 한도)", "세금에서 차감"],
    ["세액공제", "연금저축·IRP", "12~15% (합산 900만원 한도)", "세금에서 차감"],
    ["세액공제", "월세", "15~17% (연 1,000만원 한도)", "총급여 8천만원 이하"],
  ],
};

const FAQS = [
  { q: "소득공제와 세액공제 중 뭐가 더 유리해요?", a: "같은 금액이면 세액공제가 더 유리해요. 소득공제 100만원은 세율 15%면 15만원 절세지만, 세액공제 100만원은 그대로 100만원이 절세돼요." },
  { q: "공제 순서가 중요한가요?", a: "네, 소득공제를 먼저 적용해서 과세표준을 정하고, 세율을 곱해 산출세액을 구한 뒤 세액공제를 빼요. 순서는 자동으로 적용되니 직접 조정할 필요는 없어요." },
  { q: "2025년 귀속에서 달라진 공제가 있나요?", a: "자녀 세액공제가 1인당 10만원씩 인상됐고, 결혼 세액공제(인별 50만원)가 신설됐어요. 과세표준 6% 구간도 1,400만원 이하로 상향됐어요." },
  { q: "공제를 하나도 안 받으면 어떻게 되나요?", a: "기본공제(본인 150만원)와 근로소득공제는 자동 적용돼요. 그 외 추가 공제를 안 받으면 세금을 더 많이 내는 거예요." },
  { q: "간소화 서비스에 안 뜨는 공제는 어떻게 해요?", a: "기부금, 안경 구입비, 보청기 등은 직접 영수증을 제출해야 해요. 간소화 자료에 누락된 항목은 발급기관에 요청하거나 수동 등록하세요." },
  { q: "맞벌이 부부는 어떻게 나눠야 유리해요?", a: "소득이 높은 쪽에 인적공제를 몰고, 의료비는 소득이 낮은 쪽에 몰면 유리해요. 총급여 3% 기준이 낮을수록 넘기기 쉬우니까요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산 방법." },
  { slug: "연말정산-부양가족-공제", title: "연말정산 부양가족 공제", description: "가족 1명당 150만원 소득공제 조건." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "연금저축+IRP 조합 최대 148만원 환급." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 공제항목</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 공제항목, 뭐가 있을까?<br />
        소득공제와 세액공제 항목별 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 공제항목이 너무 많아서 뭘 챙겨야 하는지 모르겠다는 분이 많아요. 크게 두 가지만 기억하면 돼요. 소득에서 빼주는 소득공제, 세금에서 빼주는 세액공제예요.
      </p>
      <p style={body}>
        소득공제는 과세표준을 줄여서 간접적으로 세금을 줄이고, 세액공제는 세금 자체를 직접 깎아줘요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 항목마다 한도와 조건이 정해져 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소득공제 vs 세액공제, 핵심 차이</H2>
      <p style={body}>
        두 가지 공제의 작동 방식이 달라요. 같은 100만원이라도 효과가 다르죠.
      </p>

      <GreenBox>
        소득공제 100만원 → 세율 15%면 → 15만원 절세{"\n"}
        세액공제 100만원 → 세금에서 바로 → 100만원 절세{"\n"}
        같은 금액이면 세액공제가 훨씬 유리해요
      </GreenBox>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>주요 공제항목 한눈에 비교</H2>
      <p style={body}>
        2025년 귀속 기준 주요 공제항목과 한도예요. 본인에게 해당하는 항목을 체크해보세요.
      </p>
      <SectionBadge>2025년 귀속 연말정산 공제항목 비교표</SectionBadge>
      <DocTable headers={DEDUCTION_TABLE.headers} rows={DEDUCTION_TABLE.rows} />

      <Divider />

      <H2>2025년 귀속 달라진 공제항목</H2>
      <p style={body}>
        2025년 귀속(2026년 연말정산)에서 달라진 핵심 변경사항이에요.
      </p>

      <BorderBox>
        <strong>2025년 귀속 주요 변경사항</strong><br />
        과세표준 6% 구간: 1,200만원 이하 → 1,400만원 이하로 상향{"\n"}
        자녀 세액공제: 1인당 10만원씩 인상 (첫째 25만, 둘째 30만, 셋째 40만원){"\n"}
        결혼 세액공제 신설: 인별 50만원 (2024~2026년 혼인신고 시, 생애 1회){"\n"}
        문화비 공제: 헬스장·수영장 이용료 추가 (2025년 7월분부터)
      </BorderBox>

      <p style={body}>
        과세표준 구간이 바뀌면 세금이 줄어들 수 있어요. <a href="/w/연말정산-과세표준" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산 과세표준</a> 글에서 구간별 세율을 자세히 볼 수 있어요.
      </p>

      <Divider />

      <H2>연말정산 공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 세법 개정에 따라 한도와 조건이 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
