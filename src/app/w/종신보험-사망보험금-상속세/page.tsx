"use client";
// Q1: 종신보험 가입자 또는 수익자가 사망보험금에 상속세가 붙는지 궁금한 상황
// Q2: 사망보험금의 상속세 과세 여부를 판단하고, 절세 방법을 알아서 적용한다
// Q3: 사망보험금 상속세 과세 기준 / 계약자·피보험자·수익자 관계별 과세 차이 / 상속공제 활용법 / 증여세와 구분
// Q4: GreenBox로 과세 원칙 + BorderBox로 관계별 과세 구분 + Calculator로 세금 계산 + Steps로 신고 절차 + FAQ
// MAP-INTRO: "종신보험 사망보험금도 상속세를 내야 하나요?"
// MAP-TYPE: 가능형
// MAP-H2: 사망보험금 과세 원칙 > 계약 관계별 세금 차이 > 상속세 계산 > 절세 방법 > 신고 절차 > FAQ
// MAP-COMP: GreenBox > BorderBox > Calculator > GreenBox > Steps > FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, FAQ, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ───

const CALC_SLIDERS = [
  {
    id: "insurance",
    label: "사망보험금",
    min: 1000, max: 50000, step: 1000, defaultValue: 10000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "otherAssets",
    label: "기타 상속재산",
    min: 0, max: 100000, step: 5000, defaultValue: 30000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "deduction",
    label: "상속공제 합계",
    min: 5000, max: 50000, step: 1000, defaultValue: 10000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
];

const CALC_RESULTS = [
  {
    label: "상속재산 합계",
    getValue: (v: Record<string, number>) => v.insurance + v.otherAssets,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "과세표준",
    getValue: (v: Record<string, number>) => Math.max(v.insurance + v.otherAssets - v.deduction, 0),
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "예상 상속세",
    highlight: true,
    getValue: (v: Record<string, number>) => {
      const taxable = Math.max(v.insurance + v.otherAssets - v.deduction, 0);
      if (taxable <= 0) return 0;
      if (taxable <= 10000) return Math.round(taxable * 0.1);
      if (taxable <= 50000) return Math.round(1000 + (taxable - 10000) * 0.2);
      if (taxable <= 100000) return Math.round(9000 + (taxable - 50000) * 0.3);
      if (taxable <= 300000) return Math.round(24000 + (taxable - 100000) * 0.4);
      return Math.round(104000 + (taxable - 300000) * 0.5);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
];

const STEPS_DATA = [
  {
    title: "사망일로부터 6개월 이내에 신고하세요",
    desc: "상속세 신고 기한은 피상속인 사망일이 속하는 달의 말일부터 6개월이에요. 이 기한을 넘기면 무신고 가산세(20%)가 붙죠.",
  },
  {
    title: "보험금 수령 내역을 정리하세요",
    desc: "보험사에서 보험금 지급확인서를 발급받아요. 계약자·피보험자·수익자가 누구인지, 보험금 금액이 얼마인지 확인해야 하죠. 여러 보험사에서 받았으면 전부 합산해야 해요.",
    tip: "국세청 홈택스에서 피상속인 명의의 보험 가입 내역을 조회할 수 있어요",
  },
  {
    title: "기타 상속재산과 합산해서 신고하세요",
    desc: "사망보험금만 따로 신고하는 게 아니라, 부동산·금융자산 등 모든 상속재산과 합산해서 신고해요. 홈택스에서 전자신고하거나, 세무서에 서류를 제출하면 되죠.",
  },
  {
    title: "상속세를 납부하세요",
    desc: "신고 기한까지 납부하면 신고세액공제(3%)를 받을 수 있어요. 세금이 1,000만원을 넘으면 분할납부도 가능하고, 2,000만원을 넘으면 연부연납(최대 5년 분할)을 신청할 수 있죠.",
  },
];

const FAQS = [
  {
    q: "수익자가 배우자이면 상속세가 안 나오나요?",
    a: "배우자 상속공제가 크기 때문에 세금이 안 나올 수 있어요. 배우자 상속공제는 최소 5억원, 최대 30억원(법정상속분 한도)이거든요. 사망보험금 포함 전체 상속재산이 5억원 이하면 세금이 없죠.",
  },
  {
    q: "계약자와 수익자가 다르면 증여세인가요?",
    a: "계약자·피보험자·수익자가 모두 다른 경우에 증여세가 나올 수 있어요. 예를 들어 아버지(계약자)가 보험료를 내고 어머니(피보험자) 사망 시 자녀(수익자)가 받으면 증여에 해당하죠.",
  },
  {
    q: "보험금을 여러 명이 나눠 받으면 각자 신고하나요?",
    a: "상속세는 상속인 전체가 연대해서 납부해요. 보험금을 누가 받았든 전체 상속재산을 합산해서 신고하고, 각 상속인이 받은 비율대로 세금을 나누죠.",
  },
  {
    q: "단체보험 사망보험금도 상속세 대상인가요?",
    a: "회사에서 가입한 단체보험은 퇴직급여 성격이면 상속세 대상이 아니에요. 하지만 개인이 추가로 가입한 단체보험이면 상속세 대상이 되죠.",
  },
  {
    q: "종신보험을 상속 대비용으로 가입하면 절세가 되나요?",
    a: "상속세를 줄이는 건 아니에요. 사망보험금 자체가 상속재산에 포함되니까요. 다만 상속세 납부 재원을 현금으로 확보할 수 있다는 장점이 있죠. 부동산이 많아서 세금 낼 현금이 부족할 때 유용해요.",
  },
  {
    q: "보험금 수령 전에 상속 포기하면 어떻게 되나요?",
    a: "상속 포기와 보험금 수령은 별개예요. 수익자로 지정돼 있으면 상속을 포기해도 보험금은 받을 수 있죠. 다만 이 보험금에 대해 상속세(또는 증여세) 납부 의무는 남아요.",
  },
];

// ─── 페이지 ───

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 상속세 · 보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종신보험 사망보험금, 상속세 내야 하나요?<br />
        과세 기준과 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "종신보험 사망보험금도 상속세를 내야 하나요?"
      </p>
      <p style={body}>
        대부분의 경우, 네. 상속세 대상이에요.
        계약자와 피보험자가 같고, 수익자가 상속인이면 사망보험금은 상속재산에 포함되죠.
        다만 상속공제를 적용하면 실제 세금이 0원이 되는 경우도 많아요. 특히 배우자가 수익자일 때요.
        내 상황에서 세금이 나오는지, 나온다면 얼마인지 아래에서 계산해볼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>사망보험금, 상속세 과세 원칙</H2>
      <p style={body}>
        상속세 및 증여세법 제8조에서 사망보험금을 상속재산으로 간주해요.
        피상속인(사망자)이 보험료를 부담한 경우, 그 보험금은 상속재산에 합산되죠.
        쉽게 말하면 "돌아가신 분이 보험료를 냈으면, 그 보험금은 상속재산"이에요.
      </p>
      <GreenBox title="과세 원칙">
        계약자 = 피보험자 = 사망자 → 보험금 전액 상속재산{"\n"}
        계약자(사망자) ≠ 피보험자 → 해약환급금 상당액이 상속재산{"\n"}
        보험금은 다른 상속재산(부동산, 금융)과 합산해서 세금 계산{"\n"}
        상속공제 적용 후 과세표준이 0이면 세금도 0
      </GreenBox>

      <Divider />

      <H2>계약 관계에 따라 세금이 달라져요</H2>
      <p style={body}>
        종신보험의 세금은 계약자·피보험자·수익자가 누구냐에 따라 완전히 달라요.
        세 사람이 같은지 다른지에 따라 상속세가 될 수도 있고, 증여세가 될 수도 있죠.
      </p>
      <BorderBox>
        <strong>Case 1: 계약자=피보험자(사망), 수익자=배우자/자녀</strong>{"\n"}
        → 상속세. 가장 일반적인 구조. 보험금 전액이 상속재산에 포함{"\n\n"}
        <strong>Case 2: 계약자=수익자(생존), 피보험자(사망)만 다른 사람</strong>{"\n"}
        → 상속세 아님. 수익자가 본인 돈으로 보험료를 냈으니까 소득세도 없음{"\n\n"}
        <strong>Case 3: 계약자·피보험자·수익자 전부 다른 사람</strong>{"\n"}
        → 증여세. 계약자가 수익자에게 보험금을 증여한 것으로 봄
      </BorderBox>
      <p style={body}>
        본인 종신보험의 계약자·피보험자·수익자가 어떻게 돼 있는지 보험증권에서 확인해보세요.
        이 구조에 따라 세금 종류 자체가 바뀌니까, 절세 설계의 출발점이에요.
      </p>

      <Divider />

      <H2>상속세가 얼마나 나오나요?</H2>
      <p style={body}>
        사망보험금만으로 세금이 결정되는 게 아니에요. 부동산, 예금, 주식 등 모든 상속재산을 합산한 뒤 상속공제를 빼고 세율을 적용하죠.
        상속공제에는 기초공제(2억원), 배우자공제(최소 5억원), 일괄공제(5억원) 등이 있어요.
      </p>
      <p style={body}>
        상속재산이 배우자 포함 10억원 이하면 세금이 0원인 경우가 많아요. 배우자 상속공제(5억원) + 일괄공제(5억원) = 10억원까지 공제되니까요.
      </p>
      <SectionBadge>상속세 계산</SectionBadge>
      <Calculator
        title="사망보험금 포함 상속세 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 세금은 채무 공제, 장례비용 공제, 금융재산 공제 등에 따라 달라질 수 있어요. 정확한 계산은 세무사와 상담하세요."
      />

      <Divider />

      <H2>절세하려면 어떻게 해야 하나요?</H2>
      <p style={body}>
        종신보험 자체로 상속세를 줄이기는 어려워요. 보험금이 상속재산에 포함되니까요.
        하지만 계약 구조를 바꾸거나, 상속공제를 최대로 활용하면 세금을 줄일 수 있죠.
      </p>
      <GreenBox title="절세 포인트">
        계약자를 수익자와 같게 변경: 수익자가 보험료를 내면 상속재산 불포함{"\n"}
        배우자 상속공제 활용: 배우자가 받으면 최소 5억원 공제{"\n"}
        사전증여 활용: 10년 단위로 보험료를 증여해서 계약자를 변경{"\n"}
        연부연납 활용: 세금이 크면 최대 5년 분할 납부로 부담 분산
      </GreenBox>
      <p style={body}>
        절세 구조를 짜려면 가입 단계에서부터 설계해야 해요. 이미 가입된 보험도 계약자 변경이 가능한 경우가 있으니, 보험사에 문의해보세요.
        그러면 실제 신고는 어떻게 하는지 보죠.
      </p>

      <Divider />

      <H2>상속세 신고 절차</H2>
      <p style={body}>
        사망보험금을 받았으면 다른 상속재산과 함께 신고해야 해요.
        신고 기한은 사망일로부터 6개월. 기한 내 신고하면 신고세액공제(3%)를 받을 수 있죠.
      </p>
      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 상속세 및 증여세법을 바탕으로 정리한 일반 안내 자료예요. 계약 구조와 상속 상황에 따라 과세 방식이 달라지니, 구체적인 세금 계산은 세무사와 상담해보세요." />
    </ArticleLayout>
  );
}
