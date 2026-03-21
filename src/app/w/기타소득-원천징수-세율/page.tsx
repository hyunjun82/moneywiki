"use client";
// Q1: 강연료, 원고료 등 기타소득을 받았는데 세금이 얼마나 떼이는지 궁금한 사람
// Q2: 기타소득 원천징수 세율을 이해하고, 종합소득세 신고 여부를 판단한다
// Q3: 기타소득 범위 / 원천징수 세율(20%+지방소득세 2%) / 필요경비 60% 인정 / 300만원 기준 분리과세 / 종합과세 선택
// Q4: GreenBox로 핵심 세율 + Calculator로 실수령액 계산 + BorderBox로 기타소득 종류 + FAQ
// MAP-INTRO: "강연료 100만원 받았는데, 세금이 8.8%라고요?"
// MAP-TYPE: 얼마형
// MAP-H2: 기타소득 원천징수 세율 > 실수령액 계산 > 기타소득에 해당하는 것들 > 분리과세 vs 종합과세 > FAQ
// MAP-COMP: GreenBox > Calculator > BorderBox > GreenBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, FAQ, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  {
    id: "income",
    label: "기타소득 금액",
    min: 10, max: 1000, step: 10, defaultValue: 100,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
];

const CALC_RESULTS = [
  {
    label: "필요경비 (60%)",
    getValue: (v: Record<string, number>) => Math.round(v.income * 0.6),
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "소득금액 (40%)",
    getValue: (v: Record<string, number>) => Math.round(v.income * 0.4),
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "원천징수 세금 (8.8%)",
    getValue: (v: Record<string, number>) => Math.round(v.income * 0.4 * 0.22),
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
  {
    label: "실수령액",
    highlight: true,
    getValue: (v: Record<string, number>) => Math.round(v.income - v.income * 0.4 * 0.22),
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
];

const FAQS = [
  {
    q: "기타소득이 300만원 이하면 세금 신고 안 해도 되나요?",
    a: "기타소득금액(필요경비 뺀 금액)이 300만원 이하면 분리과세로 끝낼 수 있어요. 원천징수로 이미 세금을 냈으니까 따로 신고할 필요가 없죠. 다만 종합과세가 유리하면 선택적으로 신고할 수 있어요.",
  },
  {
    q: "필요경비 60%는 자동으로 적용되나요?",
    a: "네. 강연료, 원고료, 사례금 등 대부분의 기타소득에 60%가 자동 적용돼요. 실제 경비가 더 많으면 증빙을 통해 실제 경비를 인정받을 수도 있죠.",
  },
  {
    q: "기타소득과 사업소득의 차이가 뭔가요?",
    a: "반복적·계속적으로 하면 사업소득, 일시적·우연히 하면 기타소득이에요. 매달 강연하면 사업소득이고, 1년에 한두 번 강연하면 기타소득이죠.",
  },
  {
    q: "복권 당첨금도 기타소득인가요?",
    a: "네. 복권 당첨금은 기타소득이에요. 다만 5만원 이하는 비과세이고, 3억원 초과분은 세율이 33%(지방소득세 포함)로 올라가죠.",
  },
  {
    q: "원천징수된 세금을 돌려받을 수 있나요?",
    a: "종합소득세 신고를 하면 돌려받을 수 있어요. 다른 소득이 적어서 세율이 낮은 구간에 해당하면, 원천징수로 낸 8.8%보다 적은 세금만 내면 되거든요. 차액을 환급받죠.",
  },
  {
    q: "프리랜서 원고료도 기타소득인가요?",
    a: "일시적 원고료는 기타소득, 고정 계약으로 매월 받으면 사업소득이에요. 세무서는 빈도와 계속성을 보고 판단하죠.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 기타소득 · 원천징수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기타소득 원천징수, 세율은 8.8%예요<br />
        실수령액 계산과 신고 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "강연료 100만원 받았는데, 세금이 8.8%라고요?"
      </p>
      <p style={body}>
        맞아요. 기타소득은 원천징수 세율이 실효 8.8%예요.
        정확히는 소득의 40%(필요경비 60% 제외)에 대해 22%(소득세 20% + 지방소득세 2%)를 떼는 거죠.
        100만원 강연료를 받으면 약 8.8만원이 세금으로 빠지고, 91.2만원을 실수령해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기타소득 원천징수 세율</H2>
      <p style={body}>
        기타소득에서 세금이 계산되는 과정은 이래요.
        먼저 총 수입에서 필요경비 60%를 빼요. 남은 40%가 '기타소득금액'이죠.
        이 금액에 소득세 20%와 지방소득세 2%를 합한 22%를 원천징수해요.
      </p>
      <GreenBox title="세율 계산 구조">
        기타소득 100만원{"\n"}
        - 필요경비 60만원 (60% 자동 인정){"\n"}
        = 기타소득금액 40만원{"\n"}
        × 세율 22% (소득세 20% + 지방소득세 2%){"\n"}
        = 원천징수 세금 8.8만원{"\n"}
        실효세율: 총 수입의 8.8%
      </GreenBox>

      <Divider />

      <H2>실수령액은 얼마인가요?</H2>
      <p style={body}>
        아래 계산기에서 기타소득 금액을 넣으면 원천징수 세금과 실수령액이 바로 나와요.
        필요경비 60%가 자동 적용된 결과예요.
      </p>
      <SectionBadge>실수령액 계산</SectionBadge>
      <Calculator
        title="기타소득 원천징수 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="필요경비 60% 자동 적용. 실제 경비가 더 많으면 증빙으로 추가 공제 가능."
      />

      <Divider />

      <H2>어떤 소득이 기타소득인가요?</H2>
      <p style={body}>
        기타소득은 일시적·우연히 발생하는 소득이에요.
        매달 반복적으로 받으면 사업소득이 되고, 1회성이면 기타소득이죠.
      </p>
      <BorderBox>
        <strong>기타소득 해당 (필요경비 60%)</strong>{"\n"}
        강연료, 원고료, 자문료, 사례금{"\n"}
        인적용역 일시 대가 (심사료, 감수료){"\n"}
        공익법인 상금, 현상금{"\n\n"}
        <strong>기타소득 해당 (필요경비 다름)</strong>{"\n"}
        복권 당첨금: 필요경비 = 복권 구입비{"\n"}
        위약금·배상금: 필요경비 = 실제 손실액{"\n"}
        연금저축 해지: 필요경비 = 납입액{"\n\n"}
        <strong>기타소득 아님</strong>{"\n"}
        매달 받는 고정 원고료 → 사업소득{"\n"}
        근로계약 기반 급여 → 근로소득
      </BorderBox>

      <Divider />

      <H2>분리과세 vs 종합과세, 뭐가 유리하나요?</H2>
      <p style={body}>
        기타소득금액(필요경비 뺀 금액)이 300만원 이하면 분리과세로 끝낼 수 있어요.
        원천징수로 이미 세금을 냈으니까 추가 신고 없이 끝나죠.
        300만원을 넘으면 무조건 종합소득세 신고를 해야 해요.
      </p>
      <GreenBox title="분리과세 vs 종합과세">
        기타소득금액 300만원 이하 → 분리과세 선택 가능 (신고 불필요){"\n"}
        기타소득금액 300만원 초과 → 종합과세 의무 (5월 신고){"\n"}
        다른 소득이 적으면 → 종합과세가 환급받을 수 있어서 유리{"\n"}
        다른 소득이 많으면 → 분리과세가 세율이 낮아서 유리
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 소득세법 제21조(기타소득)를 바탕으로 정리한 일반 안내 자료예요. 개인 상황에 따라 세금이 달라질 수 있으니, 정확한 계산은 홈택스 또는 세무사와 상담해보세요." />
    </ArticleLayout>
  );
}
