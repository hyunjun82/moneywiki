"use client";
// Q1. 내항화물선을 운영하는데 유류세 보조금 청구에 필요한 서류가 뭔지 궁금한 상황이에요.
// Q2. 필요 서류를 갖춰서 유류세 보조금을 청구하는 행동.
// Q3. 필수 서류 5가지, 제출처, 청구 기한, 지원 금액 기준.
// Q4. DocTable(서류 목록) + Steps(청구 절차) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { DocTable } from "@/components/article-ui/DocTable";

const DOCS = [
  { name: "유류세 보조금 지급 청구서 (별지 제21호의2서식)", required: true, where: "해양수산부 홈페이지 다운로드" },
  { name: "유류 구매 영수증 (세금계산서)", required: true, where: "유류 판매업체에서 발급" },
  { name: "선박 운항 일지", required: true, where: "직접 작성" },
  { name: "내항화물운송사업 등록증 사본", required: true, where: "관할 지방해양수산청" },
  { name: "선박 국적증서 사본", required: true, where: "관할 지방해양수산청" },
];

const CLAIM_STEPS = [
  { title: "서류 준비", desc: "위 5가지 서류를 빠짐없이 갖춰요." },
  { title: "청구서 작성", desc: "별지 제21호의2서식에 운항 정보와 유류 사용량을 기재해요." },
  { title: "관할 지방해양수산청 제출", desc: "서류를 관할 지방해양수산청에 제출해요.", tip: "분기별 또는 월별 청구 가능" },
  { title: "심사 및 지급", desc: "서류 심사 후 지정 계좌로 보조금이 지급돼요." },
];

const FAQS = [
  { q: "유류세 보조금은 얼마나 받나요?", a: "유류 구매 가격에 포함된 유류세의 일정 비율을 환급받아요. 유종과 사용량에 따라 금액이 달라져요." },
  { q: "청구 기한이 있나요?", a: "유류를 구매한 날로부터 1년 이내에 청구해야 해요. 기한을 넘기면 보조금을 받을 수 없어요." },
  { q: "개인 어선도 대상인가요?", a: "이 보조금은 내항화물운송사업자 대상이에요. 어선은 별도의 면세유류 공급 제도가 있으니 수협에 문의하세요." },
  { q: "서류를 온라인으로 제출할 수 있나요?", a: "관할 지방해양수산청에 따라 다를 수 있어요. 대부분 우편 또는 방문 제출이 기본이에요." },
  { q: "보조금이 거부되면 어떻게 하나요?", a: "거부 사유를 확인한 뒤 보완 서류를 제출하면 재청구할 수 있어요. 이의신청도 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "해양수산부", url: "https://www.mof.go.kr" },
    { label: "해운법(법제처)", url: "https://www.law.go.kr/법령/해운법" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보조금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내항화물 유류세 보조금, 어떤 서류가 필요한가요?<br />
        필수 서류와 청구 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내항화물선을 운영하면서 유류세 보조금을 받으려는데 서류가 뭐가 필요한지 헷갈리죠?
        총 5가지 서류가 필요하고, 관할 지방해양수산청에 제출하면 돼요. 구매일로부터 1년 이내에 청구해야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>필수 서류 5가지</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/해운법" style={{ color: "#1D9E75", textDecoration: "underline" }}>해운법</a>에 따른
        유류세 보조금 청구에는 아래 서류가 필요해요.
      </p>

      <DocTable docs={DOCS} />

      <GreenBox>
        청구서 서식은 해양수산부 홈페이지에서 다운로드해요.<br />
        유류 구매 영수증은 세금계산서 형태여야 인정돼요.
      </GreenBox>

      <Divider />

      <H2>청구 절차</H2>
      <Steps steps={CLAIM_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 해운법을 기준으로 작성됐어요. 보조금 단가와 청구 절차는 변동될 수 있으니 관할 지방해양수산청에 확인하세요." />
    </ArticleLayout>
  );
}
