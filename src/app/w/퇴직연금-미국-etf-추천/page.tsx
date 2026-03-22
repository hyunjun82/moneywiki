"use client";

// Q1. 퇴직연금(IRP/DC)에서 미국 ETF에 투자하고 싶은데 어떤 걸 사야 할지 모르는 직장인
// Q2. 퇴직연금에서 투자 가능한 미국 ETF 종류를 비교하고, 본인에 맞는 상품을 선택한다
// Q3. 퇴직연금 투자 가능 ETF 조건(위험자산 70% 한도), S&P500/나스닥100 국내상장 ETF, 수수료 비교
// Q4. GreenBox(핵심 추천) + BorderBox(수수료 비교) + Checklist(투자 전 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "내 퇴직연금 유형 확인 / DC형 또는 IRP만 가능",
  "위험자산 투자 한도 확인 / 적립금의 70%까지",
  "원하는 지수 선택 / S&P500, 나스닥100, 미국배당 등",
  "ETF 총보수(수수료) 비교 / 낮을수록 유리",
  "환헤지 여부 결정 / (H)는 환율 변동 차단",
];

const FAQS = [
  {
    q: "퇴직연금으로 미국 주식 ETF를 직접 살 수 있나요?",
    a: "미국 거래소에 상장된 ETF(SPY, QQQ 등)는 직접 못 사요. 국내 증권거래소에 상장된 미국 지수 추종 ETF를 사야 해요. TIGER 미국S&P500, KODEX 미국나스닥100 같은 상품이에요.",
  },
  {
    q: "DC형이랑 IRP 둘 다 가능한가요?",
    a: "네, DC형과 IRP 모두에서 ETF 투자가 가능해요. DB형은 회사가 운용하니까 개인이 ETF를 고를 수 없어요.",
  },
  {
    q: "70% 한도가 뭔가요?",
    a: "퇴직연금에서 주식형 ETF 같은 위험자산은 적립금의 70%까지만 투자할 수 있어요. 나머지 30%는 예금, 채권형 등 안전자산으로 채워야 해요.",
  },
  {
    q: "환헤지 ETF를 사는 게 나은가요?",
    a: "장기 투자라면 환노출(비헤지)이 수익률이 높은 편이에요. 환율이 오르면 추가 수익이 생기거든요. 다만 환율 변동이 불안하면 환헤지(H) 상품을 선택해도 돼요.",
  },
  {
    q: "수수료가 가장 낮은 ETF는 뭔가요?",
    a: "2026년 기준 S&P500 추종 ETF 중에서는 ACE 미국S&P500, TIGER 미국S&P500이 총보수 0.07%대로 가장 낮은 수준이에요. 수수료는 수시로 바뀌니 최신 정보를 확인하세요.",
  },
  {
    q: "퇴직연금 ETF도 세금이 붙나요?",
    a: "퇴직연금 계좌 안에서는 매매 차익에 세금이 안 붙어요. 나중에 퇴직 시 수령할 때 퇴직소득세가 과세돼요. 연금으로 받으면 세율이 더 낮아요.",
  },
];

const SOURCES = [
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "한국거래소 ETF", href: "https://www.krx.co.kr" },
];

const RELATED = [
  { slug: "퇴직연금-종류", title: "퇴직연금 DB·DC·IRP 차이", description: "퇴직연금 유형별 특징 비교." },
  { slug: "퇴직연금-운용지시", title: "퇴직연금 운용지시 방법", description: "DC형·IRP 운용 상품 변경법." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "연금 계좌 세액공제 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 미국 ETF · 장기 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금으로 미국 ETF 투자하려면?<br />
        추천 상품과 수수료 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직연금이 예금에만 들어가 있는데, 미국 ETF로 바꿀 수 있나요?"
      </p>
      <p style={body}>
        DC형이나 IRP라면 가능해요. 다만 미국 거래소 ETF(SPY 등)를 직접 사는 건 안 되고,
        <strong>국내 상장 미국 지수 추종 ETF</strong>를 사야 해요.
        S&P500, 나스닥100 추종 ETF가 장기 투자에 많이 활용되고 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 ETF를 사야 하나요?</H2>
      <p style={body}>
        퇴직연금에서 가장 많이 선택하는 건 S&P500 추종 ETF와 나스닥100 추종 ETF예요.
        장기 투자에 적합한 대표 상품을 정리했어요.
      </p>

      <GreenBox title="퇴직연금 미국 ETF 대표 상품">
        {"S&P500 추종 (미국 대형주 500개)\n· TIGER 미국S&P500 / 총보수 0.07%\n· ACE 미국S&P500 / 총보수 0.07%\n· KODEX 미국S&P500TR / 총보수 0.05% (배당 재투자형)\n\n나스닥100 추종 (기술주 중심 100개)\n· TIGER 미국나스닥100 / 총보수 0.07%\n· KODEX 미국나스닥100TR / 총보수 0.05%\n\n미국 배당주\n· TIGER 미국배당다우존스 / 총보수 0.15%\n· ACE 미국배당다우존스 / 총보수 0.15%"}
      </GreenBox>

      <CategoryButton label="퇴직연금 정보" count={10} href="/category/퇴직연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>S&P500 vs 나스닥100, 뭘 골라야 하죠?</H2>
      <p style={body}>
        둘 다 미국 대표 지수지만 성격이 달라요.
        안정적이면 S&P500, 성장성을 원하면 나스닥100이에요.
      </p>

      <BorderBox>
        <strong>S&P500 vs 나스닥100 비교</strong>{"\n"}
        {"\n"}
        S&P500{"\n"}
        · 미국 대형주 500개 (전 업종){"\n"}
        · 분산 효과 높음, 변동성 상대적으로 낮음{"\n"}
        · 장기 연평균 수익률 약 10~12%{"\n"}
        {"\n"}
        나스닥100{"\n"}
        · 기술주 중심 100개 (애플, 마이크로소프트, 엔비디아 등){"\n"}
        · 성장성 높지만 변동성도 큼{"\n"}
        · 장기 연평균 수익률 약 14~16% (최근 10년){"\n"}
        {"\n"}
        ※ 과거 수익률이 미래를 보장하지 않아요
      </BorderBox>

      <p style={body}>
        퇴직연금은 20~30년 장기 투자니까, 본인의 위험 수용도에 맞게 선택하세요.
        S&P500 60% + 안전자산 40% 조합이 가장 일반적이에요.
      </p>

      <Divider />

      <H2>투자 전에 이것만 확인하세요</H2>
      <p style={body}>
        퇴직연금 ETF 투자에는 몇 가지 제한이 있어요. 미리 체크해두면 실수를 피할 수 있어요.
      </p>

      <SectionBadge>투자 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보예요. ETF 수수료, 상품 라인업은 수시로 바뀌니 투자 전 최신 정보를 확인하세요. 투자 원금 손실이 발생할 수 있으며, 이 글은 특정 상품의 매수를 권유하지 않아요." />
    </ArticleLayout>
  );
}
