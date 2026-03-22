"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    "q": "배우자 명의로 돌리면 못 찾나요?",
    "a": "사해행위취소 소송으로 되돌릴 수 있어요. 재산 은닉 목적이 입증되면 법원이 명의 이전을 취소해줘요."
  },
  {
    "q": "공증 집행문으로 바로 압류가 되나요?",
    "a": "공증에 집행 인낙 문구가 있으면 별도 소송 없이 바로 강제집행이 가능해요."
  },
  {
    "q": "가압류 비용은 얼마인가요?",
    "a": "인지대·송달료 외에 보증금이 청구금액의 10~20% 정도 필요해요. 보증보험으로 대체할 수 있어요."
  },
  {
    "q": "가압류 후 본안소송을 안 하면 어떻게 되나요?",
    "a": "채권자가 일정 기간 내 본안소송을 제기하지 않으면 가압류가 취소될 수 있어요."
  },
  {
    "q": "공증과 판결문의 차이는 뭔가요?",
    "a": "공증은 당사자 합의 기반이고, 판결문은 법원이 확정한 거예요. 둘 다 집행력이 있지만 범위가 달라요."
  }
];
const REFERENCES = [
  {
    "category": "법령",
    "items": [
      {
        "label": "민사집행법(법제처)",
        "url": "https://www.law.go.kr/법령/민사집행법"
      },
      {
        "label": "대한법률구조공단",
        "url": "https://www.klac.or.kr"
      }
    ]
  }
];
const RELATED = [
  {
    "slug": "이혼-재산명의-일방-분할청구",
    "title": "이혼 재산분할 청구",
    "desc": "재산 명의가 한쪽에 있어도 분할 가능해요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 재산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공증 후 자택 가압류, 배우자 명의면 안전할까?<br />
        가압류 범위와 명의 관계
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공증까지 받았는데 상대방이 재산을 배우자 명의로 돌렸다고요? 배우자 명의라도 무조건 안전한 건 아니에요. 공동재산이면 가압류 대상이 될 수 있어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>배우자 명의라도 가압류가 될까요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <GreenBox>· 공동재산(혼인 중 취득): 가압류 대상이 될 수 있어요<br />· 특유재산(혼인 전 취득): 원칙적으로 대상 아님<br />· 사해행위 취소: 재산 은닉 목적 명의 이전은 취소 가능</GreenBox>
      <Divider />

      <H2>공증 집행의 효력 범위</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <BorderBox>· 공증 집행문은 채무자 본인 재산만 대상<br />· 배우자 재산은 원칙적으로 별도 소송 필요<br />· 단, 사해행위(재산 빼돌리기) 입증 시 취소 소송 가능</BorderBox>
      <Divider />

      <H2>재산 보전, 어떻게 해야 하나요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <Steps steps={[{"title":"가압류 신청","desc":"법원에 가압류 신청서를 제출해요.","tip":"보증금(청구금액의 10~20%)이 필요해요"},{"title":"법원 결정","desc":"심리 후 가압류 결정이 나와요."},{"title":"집행","desc":"등기소에 가압류 등기가 촉탁돼요."}]} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 관련 법령을 기준으로 작성됐어요. 구체적 사안은 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
