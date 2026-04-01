"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 조정대상지역 주택을 임대 중인데, 거주요건 없이 비과세 받을 방법을 찾는 1주택 예정자
// Q2. 상생임대주택 특례 요건을 확인하고, 직전계약·상생계약을 맞춰 거주요건 면제를 받는다
// Q3. 직전계약(1년6개월↑) + 상생계약(2년↑, 5% 이내 인상), 4년 단일계약 불가, 적용 기한(~2026.12.31)
// Q4. EligibilityChecker(요건 확인) + GreenBox(핵심 요건) + BorderBox(사례 비교) + Steps(적용 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "one", label: "1세대 1주택자예요 (양도 시점 기준)" },
  { id: "prev", label: "직전임대차계약 기간이 1년 6개월 이상이에요" },
  { id: "new", label: "상생임대차계약 기간이 2년 이상이에요" },
  { id: "rent", label: "임대료를 직전 계약 대비 5% 이내로 올렸어요" },
  { id: "period", label: "상생계약을 2024.12.31 이전에 체결했어요 (또는 2026.12.31 이전)" },
];

const STEPS = [
  {
    title: "직전임대차계약이 1년 6개월 이상인지 확인하세요",
    desc: "상생임대 특례를 받으려면 '직전임대차계약'과 '상생임대차계약' 두 개가 필요해요. 직전 계약의 실제 임대 기간이 1년 6개월 이상이어야 해요.",
    tip: "4년짜리 단일 계약 하나로는 특례를 받을 수 없어요",
  },
  {
    title: "상생임대차계약을 체결하세요",
    desc: "직전 계약 종료 후 새 임대차계약(상생계약)을 맺을 때 임대료 인상률을 5% 이내로 해야 해요. 계약 기간은 2년 이상이어야 하고, 2026년 12월 31일까지 계약해야 해요.",
  },
  {
    title: "상생임대인 확인서를 발급받으세요",
    desc: "관할 시·군·구청에서 상생임대인 확인서를 발급받아야 해요. 양도소득세 신고 시 이 확인서를 첨부해야 거주요건 면제를 적용받을 수 있어요.",
  },
  {
    title: "양도 시 비과세 신고에 특례를 적용하세요",
    desc: "주택을 양도할 때 양도소득세 비과세 신고를 하면서 상생임대주택 특례를 적용해요. 홈택스에서 신고하거나 세무서에 방문해서 신고할 수 있어요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
];

const FAQS = [
  {
    q: "상생임대주택 특례가 뭔가요?",
    a: "임대료를 5% 이내로 올리고 요건을 갖추면, 1세대 1주택 비과세를 받을 때 거주요건(2년 거주)을 면제해주는 제도예요. 집에 직접 살지 않아도 비과세를 받을 수 있어요.",
  },
  {
    q: "4년짜리 임대계약 하나로 특례 받을 수 있나요?",
    a: "안 돼요. 직전임대차계약과 상생임대차계약을 각각 별도로 체결해야 해요. 하나의 계약을 임의로 나눌 수 없고, 갱신도 별도 계약으로 인정돼요.",
  },
  {
    q: "임대료 5% 인상 기준은 어떻게 계산하나요?",
    a: "보증금과 월세를 환산해서 비교해요. 보증금만 있는 경우 보증금 인상률이 5% 이내여야 해요. 보증금 5억원이면 5,250만원 이하로 올려야 해요.",
  },
  {
    q: "상생계약은 언제까지 체결해야 하나요?",
    a: "2021년 12월 20일부터 2026년 12월 31일 사이에 체결한 상생계약에 적용돼요. 이 기간 밖이면 특례를 받을 수 없어요.",
  },
  {
    q: "장기보유특별공제에도 거주 면제가 되나요?",
    a: "네, 상생임대주택 특례를 적용하면 장기보유특별공제 계산 시 거주기간 요건도 면제돼요. 보유기간만으로 공제율을 적용받을 수 있어요.",
  },
  {
    q: "세입자가 계약갱신청구권을 행사한 경우도 되나요?",
    a: "네, 세입자의 계약갱신청구권에 의한 갱신도 상생계약으로 인정돼요. 다만 임대료 인상률 5% 이내 요건은 동일하게 적용돼요.",
  },
];

const SOURCES = [
  { name: "국세청", href: "https://www.nts.go.kr" },
  { name: "소득세법 시행령", href: "https://www.law.go.kr/법령/소득세법시행령" },
  { name: "기획재정부", href: "https://www.moef.go.kr" },
];

const RELATED = [
  { slug: "양도소득세", title: "양도소득세 계산과 신고", description: "양도소득세 기본 구조와 세율." },
  { slug: "1세대1주택-비과세", title: "1세대 1주택 비과세 조건", description: "비과세 요건과 거주·보유 기간." },
  { slug: "양도소득세-장기보유특별공제", title: "장기보유특별공제 요건", description: "보유·거주 기간별 공제율 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 양도소득세 · 상생임대주택</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집에 안 살아도 비과세 받을 수 있다고?<br />
        상생임대주택 특례 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "임대 주고 있는 집인데, 비과세 받으려면 내가 직접 살아야 한대요."
      </p>
      <p style={body}>
        상생임대주택 특례를 적용하면 <strong>거주하지 않아도</strong> 1세대 1주택 비과세를 받을 수 있어요.
        핵심은 직전 계약 1년 6개월 이상 + 새 계약 2년 이상, 임대료 인상 5% 이내예요.
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령</a>에 근거한 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 상생임대 특례를 받을 수 있나요?</H2>
      <p style={body}>
        아래 요건을 모두 충족해야 해요. 하나라도 빠지면 일반 비과세 요건(거주 2년)을 적용받아야 해요.
      </p>

      <SectionBadge>요건 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>상생임대 특례 핵심 요건</H2>
      <p style={body}>
        '직전계약'과 '상생계약' 두 개를 따로 맺어야 해요.
        4년짜리 계약 하나로는 안 돼요.
      </p>

      <GreenBox title="상생임대주택 특례 요건 정리">
        {"직전임대차계약\n· 기간: 1년 6개월 이상\n· 시점: 상생계약 직전에 체결된 계약\n\n상생임대차계약\n· 기간: 2년 이상\n· 임대료: 직전 계약 대비 5% 이내 인상\n· 체결 시기: 2021.12.20~2026.12.31\n\n효과: 1세대 1주택 비과세 시 거주요건(2년) 면제\n장기보유특별공제 거주기간 요건도 면제"}
      </GreenBox>

      <Divider />

      <H2>직전계약과 상생계약, 헷갈리는 부분 정리</H2>
      <p style={body}>
        가장 많이 실수하는 게 4년 단일 계약이에요.
        반드시 두 건의 별도 계약이 있어야 해요.
      </p>

      <BorderBox>
        <strong>되는 경우 vs 안 되는 경우</strong>{"\n"}
        {"\n"}
        되는 경우:{"\n"}
        · 2023.1.1~2024.6.30 (1년6개월) → 2024.7.1~2026.6.30 (2년, 5%↓){"\n"}
        · 계약갱신청구권으로 갱신 + 임대료 5% 이내{"\n"}
        {"\n"}
        안 되는 경우:{"\n"}
        · 2022.1.1~2025.12.31 (4년 단일계약){"\n"}
        · 직전계약 11개월 (1년6개월 미달){"\n"}
        · 임대료 6% 인상 (5% 초과)
      </BorderBox>

      <Divider />

      <H2>특례 적용은 이렇게 해요</H2>
      <p style={body}>
        계약 조건만 맞추면 끝이 아니에요.
        확인서 발급과 양도세 신고까지 해야 특례가 적용돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 소득세법 시행령 기준으로 작성했어요. 상생임대 특례 기한, 요건은 법 개정에 따라 달라질 수 있으니 최신 내용은 국세청(126)이나 세무사에게 확인해 주세요." />
    </ArticleLayout>
  );
}
