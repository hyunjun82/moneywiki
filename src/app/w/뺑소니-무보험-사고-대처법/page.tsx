"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 뺑소니 당했는데 가해 차량이 무보험이고 범인도 못 찾은 상황이에요. 치료비를 어디서 받아야 할지 모르겠어요.
// Q2. 정부 보장사업에 보상 청구를 할 수 있어요.
// Q3. 112 신고 → 증거 확보 → 병원 치료 → 정부보장사업 청구 절차, 보상 한도(사망 최대 1.5억, 부상 최대 3천만), 청구 기한 3년.
// Q4. GreenBox(보상 한도) + Steps(대처 절차) + BorderBox(필요 서류) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "범인 못 찾아도 보상받을 수 있나요?",
    a: "네. 정부 보장사업은 범인 검거 여부와 관계없이 보상해줘요. 경찰 신고와 교통사고사실확인원만 있으면 청구 가능해요.",
  },
  {
    q: "차량 수리비도 정부가 보상해주나요?",
    a: "안 돼요. 정부 보장사업은 대인(사람) 피해만 보상해요. 차량 파손은 본인 자동차보험 자차 담보로 처리하거나 범인 잡히면 가해자에게 청구해요.",
  },
  {
    q: "보상 청구 기한은 언제까지예요?",
    a: "사고 발생일로부터 3년 이내에 청구해야 해요. 3년 넘기면 시효가 끝나서 못 받아요.",
  },
  {
    q: "어디에 청구하나요?",
    a: "자동차손해배상진흥원이나 아무 보험회사 창구에서 청구할 수 있어요. 가까운 보험회사에 가는 게 빨라요.",
  },
  {
    q: "블랙박스 없으면 보상이 어렵나요?",
    a: "블랙박스가 없어도 경찰 신고만 제대로 했으면 교통사고사실확인원으로 증명 가능해요. 목격자 진술이나 CCTV도 도움이 돼요.",
  },
  {
    q: "범인이 나중에 잡히면 어떻게 되나요?",
    a: "정부가 가해자에게 구상권을 행사해요. 피해자가 추가로 할 일은 없어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "자동차손해배상보장법 (법제처)", url: "https://www.law.go.kr/법령/자동차손해배상보장법" },
      { label: "자동차손해배상진흥원", url: "https://tacss.or.kr/" },
      { label: "뺑소니·무보험차 보상 안내 (생활법령)", url: "https://easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=90&onhunqueSeq=3002" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "자동차 취득세 계산도 정리했어요." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "갑작스러운 사고로 생계가 어렵다면 긴급복지도 확인하세요." },
];

const STEPS = [
  { title: "즉시 112 신고", desc: "경찰이 현장 조사 후 교통사고사실확인원을 발급해줘요. 이 서류가 보상 청구의 핵심이에요.", tip: "경찰 신고 없으면 보상 청구가 불가능해요" },
  { title: "증거 확보", desc: "차량 번호판·차종·색상을 기억하고, 블랙박스 영상·현장 사진·목격자 연락처를 확보하세요." },
  { title: "병원 치료", desc: "응급 치료 후 진단서와 치료비 영수증을 모두 보관해요. 완치될 때까지 영수증을 계속 모으세요." },
  { title: "정부 보장사업 청구", desc: "교통사고사실확인원 + 진단서 + 치료비 영수증을 준비해서 보험회사나 자동차손해배상진흥원에 청구해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 교통사고 · 보상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        뺑소니 무보험 사고,<br />
        범인 못 찾아도 보상받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        뺑소니 당했는데 무보험 차량이래요. 범인도 못 찾았고요.
        치료비는 누가 내느냐고요? 범인을 못 찾아도 정부 보장사업으로 보상받을 수 있어요.
        사고 직후 112 신고만 제대로 하면 돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>정부 보장사업 보상 한도는 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상보장법</a>에 따라
        뺑소니·무보험 사고 피해자는 정부가 보상해줘요.
      </p>

      <GreenBox>
        정부 보장사업 보상 한도<br />
        · 사망: 최소 2,000만원 ~ 최대 <strong>1억 5,000만원</strong><br />
        · 부상: 최대 <strong>3,000만원</strong> (급수별 한도)<br />
        · 후유장해: 장해 등급에 따라 최대 1억 5,000만원<br />
        · 차량 파손: <strong>보상 안 됨</strong> (자차 담보 또는 가해자 청구)
      </GreenBox>

      <p style={body}>
        부상 보상에는 치료비 외에 위자료와 휴업손해도 포함돼요.
        범인이 나중에 잡히면 정부가 가해자에게 구상권을 행사하니까
        피해자가 추가로 할 일은 없어요.
        청구 기한은 사고일로부터 <strong>3년</strong>이에요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>사고 직후 이렇게 대처하세요</H2>
      <p style={body}>
        뺑소니 사고가 나면 당황하기 마련이지만, 순서대로 하면 보상을 빠짐없이 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구할 때 필요한 서류</H2>
      <p style={body}>
        보상 청구 시 아래 서류를 한꺼번에 준비해서 보험회사나
        <a href="https://tacss.or.kr/" style={{ color: "#1D9E75", textDecoration: "underline" }}> 자동차손해배상진흥원</a>에 제출하면 돼요.
      </p>

      <BorderBox title="필요 서류 목록">
        · 교통사고사실확인원 (경찰서 발급)<br />
        · 진단서 (병원 발급)<br />
        · 치료비 영수증 전체<br />
        · 주민등록등본<br />
        · 통장 사본 (보상금 수령용)<br />
        · 후유장해 진단서 (해당 시)
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 개별 사고 상황에 따라 보상 범위가 달라질 수 있어요. 구체적인 상담은 자동차손해배상진흥원이나 법률 전문가에게 문의하세요." />
    </ArticleLayout>
  );
}
