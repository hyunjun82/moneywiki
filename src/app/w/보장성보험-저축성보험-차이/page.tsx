"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    "q": "보장성과 저축성을 어떻게 구분하나요?",
    "a": "만기 환급금이 납입 보험료보다 적으면 보장성, 비슷하거나 많으면 저축성이에요. 보험증권에 표시돼 있어요."
  },
  {
    "q": "종신보험은 보장성인가요?",
    "a": "보장성으로 분류돼요. 사망보험금이 주계약이고 연말정산 세액공제도 가능해요."
  },
  {
    "q": "저축성보험 이자에 세금이 붙나요?",
    "a": "10년 이상 유지하면 비과세 혜택이 있어요. 10년 미만 해지 시 이자소득세 15.4%가 부과돼요."
  },
  {
    "q": "보장성보험료를 많이 내면 공제를 더 받나요?",
    "a": "연 100만원 한도예요. 그 이상 내도 공제 금액은 동일해요."
  },
  {
    "q": "둘 다 가입하는 게 좋은가요?",
    "a": "네. 보장성으로 위험 대비하고, 여유 자금으로 저축성이나 연금저축에 가입하는 조합이 일반적이에요."
  }
];
const REFERENCES = [
  {
    "category": "공식",
    "items": [
      {
        "label": "금융감독원",
        "url": "https://www.fss.or.kr"
      },
      {
        "label": "국세청",
        "url": "https://www.nts.go.kr"
      }
    ]
  }
];
const RELATED = [
  {
    "slug": "연말정산-세액공제-소득공제-차이",
    "title": "세액공제 vs 소득공제 차이",
    "description": "보험료 공제가 세액공제인 이유를 알아보세요."
  },
  {
    "slug": "자손-자상-중복-가입",
    "title": "자동차보험 자손·자상 중복 가입",
    "description": "보장성보험 중 자동차보험 구조예요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보장성보험 vs 저축성보험, 뭐가 다른가요?<br />
        차이점과 선택 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험 가입하려는데 보장성이니 저축성이니 헷갈리죠? 핵심은 목적이에요. 위험에 대비하려면 보장성, 돈을 모으려면 저축성이에요. 연말정산 공제도 달라요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>핵심 차이점</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <GreenBox>· 보장성: 사망·질병·상해 위험 대비 → 보험료 세액공제 가능 (연 100만원 한도)<br />· 저축성: 만기 환급금·적립 목적 → 세액공제 대상 아님<br />· 판단 기준: 만기 환급금이 납입 보험료의 일정 비율 이하면 보장성</GreenBox>
      <Divider />

      <H2>연말정산 공제 차이</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <BorderBox>· 보장성보험료: 연 100만원 한도 12% 세액공제 (최대 12만원 환급)<br />· 저축성보험료: 세액공제 없음<br />· 장애인 전용 보장성보험: 연 100만원 한도 15% 세액공제</BorderBox>
      <Divider />

      <H2>내 상황에 맞는 선택</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <Checklist items={["가족 부양 책임이 크면 → 보장성 사망보험","건강 걱정이 크면 → 보장성 실손·암보험","목돈 마련이 목적이면 → 저축성 연금보험","절세가 목적이면 → 연금저축 or 보장성 보험"]} />
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
