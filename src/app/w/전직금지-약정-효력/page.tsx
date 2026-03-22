"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    "q": "전직금지 약정서에 서명했으면 무조건 지켜야 하나요?",
    "a": "아니에요. 서명했더라도 기간·범위·보상이 과도하면 법원이 무효로 판단할 수 있어요."
  },
  {
    "q": "보상 없는 전직금지 약정은 유효한가요?",
    "a": "대법원 판례상 보상 없는 전직금지 약정은 무효 가능성이 높아요. 합리적 대가가 있어야 해요."
  },
  {
    "q": "경쟁사로 이직하면 소송당할 수 있나요?",
    "a": "가능해요. 하지만 약정이 무효라면 이길 수 있어요. 이직 전에 노무사나 변호사 상담을 받는 게 안전해요."
  },
  {
    "q": "프리랜서로 일하는 건 위반인가요?",
    "a": "약정 범위에 따라 달라요. 동종 업무를 수행하면 위반으로 볼 수 있어요."
  },
  {
    "q": "외국계 회사 전직금지 약정도 같은 기준인가요?",
    "a": "한국 법원에서 다뤄지면 한국 기준이 적용돼요. 외국법 준거 약정이면 달라질 수 있어요."
  }
];
const REFERENCES = [
  {
    "category": "법령",
    "items": [
      {
        "label": "근로기준법(법제처)",
        "url": "https://www.law.go.kr/법령/근로기준법"
      },
      {
        "label": "대법원 판례검색",
        "url": "https://glaw.scourt.go.kr"
      }
    ]
  }
];
const RELATED = [
  {
    "slug": "권고사직-수락-거부-방법",
    "title": "권고사직 수락·거부 방법",
    "description": "퇴사 강요를 받을 때 대응 방법이에요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 계약</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전직금지 약정, 퇴사 후에도 효력이 있나요?<br />
        유효 요건과 위반 시 대응
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사하려는데 전직금지 약정서에 서명한 게 걸리죠? 무조건 지켜야 하는 건 아니에요. 법원은 기간·범위·보상이 합리적일 때만 유효하다고 봐요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>전직금지 약정이 유효하려면?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <GreenBox>· 기간: 보통 1~2년 이내<br />· 범위: 동종 업계로 한정 (모든 취업 금지는 무효)<br />· 보상: 전직금지에 대한 합리적 대가 지급<br />· 이 세 가지를 모두 충족해야 유효</GreenBox>
      <Divider />

      <H2>약정이 무효가 되는 경우</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <Checklist items={["기간이 3년 이상으로 과도한 경우","모든 업종 취업을 금지하는 경우","보상 없이 일방적으로 강요한 경우","영업비밀을 다루지 않는 직무였던 경우"]} />
      <Divider />

      <H2>위반하면 어떻게 되나요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <BorderBox>· 유효한 약정 위반: 손해배상 청구 가능<br />· 법원이 무효로 판단하면: 아무 제재 없음<br />· 가처분 신청: 회사가 경쟁사 입사 금지 가처분을 신청할 수 있음</BorderBox>
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
