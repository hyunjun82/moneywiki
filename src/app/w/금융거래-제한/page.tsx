"use client";

// Q1. 갑자기 계좌 출금이 막혀서 당황한 상황이에요.
// Q2. 금융거래 제한 원인을 파악하고, 해제 절차를 밟는 행동.
// Q3. 제한 유형(전자금융거래제한 vs 한도제한), 원인, 조회 방법, 해제 절차, 필요 서류.
// Q4. Steps(해제 절차) + GreenBox(유형 구분) + BorderBox(필요 서류) + EligibilityChecker + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const CHECK_ITEMS = [
  { id: "c1", label: "ATM 출금 시 '금융거래 제한' 메시지가 떴다" },
  { id: "c2", label: "보이스피싱 관련 연락을 받은 적 있다" },
  { id: "c3", label: "통장을 타인에게 빌려준 적 있다" },
  { id: "c4", label: "경찰서에서 조사를 받으라는 연락이 왔다" },
  { id: "c5", label: "피해금이 내 계좌로 입금된 적 있다" },
];

const STEPS_DATA = [
  {
    title: "제한 사유 확인",
    desc: "거래 은행에 전화하거나 방문해서 정확한 제한 사유를 확인해요. 금융감독원 홈페이지에서도 전자금융거래제한 여부를 조회할 수 있어요.",
  },
  {
    title: "수사기관 조사 협조",
    desc: "경찰서에서 연락이 오면 조사에 성실히 응해요. 보이스피싱 피해자라면 진술서를 작성하고, 통장 양도 등 본인 과실이 없음을 입증해야 해요.",
  },
  {
    title: "무혐의 처분 또는 해제 서류 확보",
    desc: "수사 결과 무혐의 처분이 나오면 '무혐의 처분 결과 통지서'를 받아요. 이 서류가 해제 신청의 핵심이에요. 보통 1~2주 정도 걸려요.",
    tip: "무혐의 처분서 없이는 해제가 안 되니까 꼭 받으세요",
  },
  {
    title: "은행에 해제 신청",
    desc: "무혐의 처분서, 신분증을 가지고 거래 은행을 방문해서 금융거래 제한 해제를 신청해요. 은행 심사 후 해제돼요.",
  },
];

const FAQS = [
  {
    q: "금융거래 제한되면 월급도 못 받나요?",
    a: "입금은 가능해요. 출금과 이체만 막혀요. 월급은 계좌에 들어오지만 쓸 수가 없는 상황이에요. 당장 생활비가 급하면 은행에 사정을 설명하고 일부 출금 요청을 해보세요.",
  },
  {
    q: "금융거래 제한 조회는 어디서 하나요?",
    a: "금융감독원 홈페이지(fss.or.kr)에서 '전자금융거래제한' 메뉴로 들어가면 본인 계좌 제한 여부를 조회할 수 있어요.",
  },
  {
    q: "한도제한계좌와 전자금융거래제한은 뭐가 다른가요?",
    a: "한도제한계좌는 신규 개설 시 1일 이체 한도가 제한되는 거고, 전자금융거래제한은 보이스피싱 연루로 계좌 사용 자체가 막히는 거예요. 한도제한계좌는 증빙서류 제출로 비교적 쉽게 풀려요.",
  },
  {
    q: "억울하게 제한됐는데 빨리 풀 수 있나요?",
    a: "경찰 조사에 적극 협조해서 무혐의 처분을 빨리 받는 게 최선이에요. 보통 조사부터 해제까지 2~4주 정도 걸려요.",
  },
  {
    q: "제한 풀리면 다른 은행도 자동으로 풀리나요?",
    a: "아니에요. 제한된 계좌가 있는 각 은행에 개별적으로 해제 신청해야 해요. 하나의 은행에서 풀렸다고 다른 곳까지 자동 해제는 안 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "통신사기피해환급법 제13조의2 — 전자금융거래 제한", url: "https://www.law.go.kr/법령/전기통신금융사기피해방지및피해금환급에관한특별법" },
      { label: "금융감독원 — 전자금융거래제한 조회", url: "https://www.fss.or.kr/fss/cvpl/endNotice/list.do?menuNo=200584" },
      { label: "찾기쉬운 생활법령 — 전자금융범죄", url: "https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?csmSeq=1592&ccfNo=4&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "보이스피싱-피해-구제", title: "보이스피싱 피해 구제", description: "피해금 환급받는 절차를 정리했어요." },
  { slug: "계좌-개설-제한", title: "계좌 개설 제한", description: "신규 계좌를 못 만들 때 해결 방법이에요." },
  { slug: "예금자보호제도", title: "예금자보호제도", description: "은행 예금 5천만원까지 보호받는 구조예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 계좌 · 금융거래제한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        금융거래 제한, 왜 막혔나?<br />
        원인 조회부터 해제 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ATM에서 출금이 안 되고 "금융거래 제한"이라는 메시지가 떴다면 정말 당황스럽죠.{" "}
        <a href="https://www.law.go.kr/법령/전기통신금융사기피해방지및피해금환급에관한특별법" style={{ color: "#1D9E75", textDecoration: "underline" }}>통신사기피해환급법</a>에
        따라 보이스피싱 관련 계좌는 출금이 자동으로 차단돼요. 원인을 정확히 파악하고 해제 절차를 밟으면 풀 수 있어요.
      </p>

      <Divider />

      <H2>내 계좌가 제한된 이유는?</H2>
      <p style={body}>
        금융거래가 제한되는 원인은 크게 두 가지예요. 본인이 직접 연루된 경우와 모르는 사이에 연루된 경우죠.
      </p>

      <GreenBox title="금융거래 제한 주요 원인">
        <strong>전자금융거래제한</strong>: 보이스피싱 사기계좌로 이용되면 금융감독원이 전면 차단해요<br />
        <strong>한도제한계좌</strong>: 신규 계좌 개설 시 의심 거래가 감지되면 이체 한도가 제한돼요<br /><br />
        주요 사유: 통장 양도·대여 / 보이스피싱 피해금 입금 / 대포통장 의심 / 자금세탁 의심
      </GreenBox>

      <p style={body}>
        본인이 보이스피싱 피해자여도 계좌가 제한될 수 있어요. 사기범이 내 계좌로 돈을 보냈다면 해당 계좌는 '사기이용계좌'로 분류되거든요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="전자금융거래제한 대상일 가능성이 높아요. 아래 해제 절차를 확인하세요."
        partialMatchText="일부 해당되네요. 거래 은행에 정확한 제한 사유를 먼저 확인하세요."
      />

      <Divider />

      <H2>해제하려면 이렇게 하세요</H2>
      <p style={body}>
        금융거래 제한 해제는 수사기관 조사 → 무혐의 처분 → 은행 신청 순서로 진행돼요. 무혐의 처분서가 핵심 서류예요.
      </p>

      <Steps steps={STEPS_DATA} />

      <SectionBadge>해제 시 필요 서류</SectionBadge>
      <BorderBox>
        1. 무혐의 처분 결과 통지서 (경찰서 발급)<br />
        2. 신분증 (주민등록증 또는 운전면허증)<br />
        3. 해제 신청서 (은행 방문 시 작성)<br /><br />
        한도제한계좌의 경우: 금융거래 목적 증빙서류(재직증명서, 사업자등록증 등)만 있으면 해제 가능해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 통신사기피해환급법 및 금융감독원 자료를 기반으로 작성됐어요. 구체적인 해제 절차는 거래 은행 또는 금융감독원(1332)에 문의하세요." />
    </ArticleLayout>
  );
}
