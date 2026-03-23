"use client";

// Q1. 무보험 차량에 사고 당해서 가해자가 돈이 없다고 하는데 병원비를 어디서 받을지 찾는 교통사고 피해자
// Q2. 정부 보장사업 보상 한도를 확인하고 보험회사 또는 자동차손해배상진흥원에 청구서를 제출하는 행동
// Q3. 보장사업 보상 한도(사망 1.5억, 부상 3천만), 청구 절차, 필요 서류, 시효 3년, 초과분 처리 방법
// Q4. GreenBox(보상한도) + Steps(청구절차) + DocTable(서류) + BorderBox(초과분) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const CLAIM_STEPS = [
  { title: "112 신고 → 사고사실확인원 발급", desc: "사고 직후 경찰에 신고하세요. 교통사고사실확인원이 없으면 보상 청구가 안 돼요.", tip: "가해 차량 번호판 반드시 확보" },
  { title: "병원 치료 → 진단서·영수증 보관", desc: "치료받으면서 진단서와 모든 치료비 영수증을 보관하세요." },
  { title: "필요 서류 준비", desc: "사고사실확인원, 진단서, 치료비 영수증, 신분증 사본, 인감증명서, 주민등록등본을 모아요." },
  { title: "보험회사 또는 진흥원에 청구", desc: "아무 자동차 보험회사나 자동차손해배상진흥원(tacss.or.kr)에 청구하면 돼요.", tip: "사고일로부터 3년 이내에 청구해야 해요" },
];

const DOCS = [
  { name: "교통사고사실확인원", required: true, where: "사고 관할 경찰서 발급" },
  { name: "진단서", required: true, where: "치료 병원 발급" },
  { name: "치료비 영수증", required: true, where: "치료 병원" },
  { name: "인감증명서", required: true, where: "주민센터 발급" },
  { name: "주민등록등본", required: true, where: "주민센터 발급" },
  { name: "신분증 사본", required: true, where: "본인 준비" },
];

const FAQS = [
  { q: "정부 보상은 어디에 청구하나요?", a: "아무 자동차 보험회사에 청구하거나 자동차손해배상진흥원(tacss.or.kr)에 직접 청구하면 돼요. 가해자 보험이 아니라 어떤 보험사든 상관없어요." },
  { q: "뺑소니로 가해자를 못 찾아도 보상되나요?", a: "돼요. 자동차손해배상보장법 제30조에 따라 뺑소니 사고도 정부 보장사업 대상이에요." },
  { q: "물적 피해(차량 수리비)도 보상해주나요?", a: "안 돼요. 정부 보장사업은 대인(사람) 피해만 보상해요. 차량 파손은 본인 자동차보험 자차 담보로 처리하거나 가해자에게 직접 청구해야 해요." },
  { q: "보상 한도를 초과하면 어떻게 해요?", a: "본인 자동차보험에 '무보험차상해' 특약이 있으면 초과분도 보상받을 수 있어요. 특약이 없으면 가해자에게 직접 청구해야 해요." },
  { q: "청구 기한이 있나요?", a: "사고 발생일로부터 3년이에요. 3년이 지나면 시효가 만료돼서 보상받을 수 없어요." },
  { q: "과실이 있어도 받을 수 있나요?", a: "받을 수 있지만 과실 비율만큼 차감돼요. 본인 과실이 30%면 보상금도 30% 줄어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "자동차손해배상보장법(법제처)", url: "https://www.law.go.kr/법령/자동차손해배상보장법" },
      { label: "자동차손해배상진흥원", url: "https://tacss.or.kr/" },
      { label: "무보험차량 사고 보상(생활법령)", url: "https://easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=90&onhunqueSeq=3002" },
    ],
  },
];

const RELATED = [
  { slug: "무보험-차량-사고-처리", title: "무보험 차와 사고 났을 때 처리 순서", description: "사고 직후 대응부터 보상 청구까지 단계별로 안내해요." },
  { slug: "무보험-교통사고-보험사-청구", title: "내 보험사에 무보험사고 청구하기", description: "무보험차상해 특약이 있으면 내 보험사에서도 보상받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 교통사고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 교통사고, 정부 보상 얼마까지?<br />
        보장사업 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무보험 차량에 사고 당했는데 가해자가 돈이 없다고 하시죠?
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상보장법 제30조</a>에 따라 정부가 대신 보상해줘요.
        사망 최대 1억5천만원, 부상 최대 3천만원까지 받을 수 있어요.
        뺑소니로 가해자를 못 찾아도 보상 대상이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>보상 한도가 얼마예요?</H2>
      <p style={body}>
        <a href="https://tacss.or.kr/" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상진흥원</a> 기준 보상 한도예요.
        책임보험 한도 내에서 보상하는 구조라 대인 피해만 해당되고, 물적 피해(차량 수리비)는 제외돼요.
      </p>

      <GreenBox title="정부 보장사업 보상 한도">
        · 사망: 최대 1억5천만원 (최소 2천만원 보장)<br />
        · 부상: 최대 3천만원 (치료비 + 위자료 + 휴업손해)<br />
        · 후유장해: 등급별 최대 1억5천만원<br />
        · 물적 피해: 보상 대상 아님
      </GreenBox>

      <Divider />

      <H2>한도 초과분은 어떻게 받나요?</H2>
      <p style={body}>
        정부 보상 한도를 넘는 손해는 두 가지 방법이 있어요.
        하나는 가해자에게 직접 청구하는 것(실제로 받기 어려운 경우 많아요), 다른 하나는 본인 자동차보험의 무보험차상해 특약을 활용하는 거예요.
      </p>

      <BorderBox>
        본인 보험에 '무보험자동차에 의한 상해' 특약이 가입돼 있으면 한도 초과분도 보상받아요.
        특약 한도는 보통 대인배상 2억~무제한이에요.
        보험증권이나 보험사 앱에서 가입 여부를 확인하세요. 없으면 다음 갱신 때 꼭 추가하세요.
      </BorderBox>

      <Divider />

      <H2>청구 절차, 이렇게 해요</H2>
      <p style={body}>
        사고 직후 경찰 신고부터 시작해요.
        보험회사나 진흥원에 서류를 제출하면 정부가 먼저 보상하고, 나중에 가해자에게 구상권을 행사해요.
      </p>

      <SectionBadge>보장사업 청구 절차</SectionBadge>
      <Steps steps={CLAIM_STEPS} />

      <Divider />

      <H2>청구할 때 필요한 서류</H2>
      <p style={body}>
        아래 서류를 모두 준비해서 제출하세요. 서류가 빠지면 접수가 지연돼요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles items={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 자동차손해배상보장법 및 자동차손해배상진흥원 공개 자료를 바탕으로 작성했어요. 보상 한도와 절차는 법 개정에 따라 변동될 수 있어요." />
    </ArticleLayout>
  );
}
