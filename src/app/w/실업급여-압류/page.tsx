"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    "q": "실업급여가 입금된 통장이 압류되면 어떡하나요?",
    "a": "법원에 이의 신청을 하세요. 실업급여임을 입증하면 압류가 해제돼요. 급한 경우 압류방지통장으로 변경하세요."
  },
  {
    "q": "압류방지통장이 뭔가요?",
    "a": "법원 압류가 차단되는 전용 통장이에요. 은행에서 개설 가능하고, 여기로 실업급여를 받으면 안전해요."
  },
  {
    "q": "세금 체납도 실업급여 압류가 안 되나요?",
    "a": "국세·지방세 체납은 일반 채권과 달리 강제징수가 가능해서, 실업급여도 일부 압류될 수 있어요. 하지만 최저생계비는 보호돼요."
  },
  {
    "q": "카드 빚 때문에 압류될 수 있나요?",
    "a": "카드사가 법원 판결을 받으면 통장 압류가 가능해요. 하지만 실업급여는 압류 금지 대상이라 이의 신청으로 해제할 수 있어요."
  },
  {
    "q": "실업급여를 현금으로 받을 수 있나요?",
    "a": "안 돼요. 계좌 입금만 가능해요. 압류방지통장을 이용하는 게 가장 안전한 방법이에요."
  }
];
const REFERENCES = [
  {
    "category": "법령",
    "items": [
      {
        "label": "고용보험법(법제처)",
        "url": "https://www.law.go.kr/법령/고용보험법"
      },
      {
        "label": "민사집행법(법제처)",
        "url": "https://www.law.go.kr/법령/민사집행법"
      }
    ]
  }
];
const RELATED = [
  {
    "slug": "실업급여-비과세",
    "title": "실업급여 비과세 여부",
    "description": "실업급여에 세금이 붙는지 정리했어요."
  },
  {
    "slug": "실업급여-실업인정-특례",
    "title": "실업인정 특례",
    "description": "구직활동 못 할 때 특례 신청 방법이에요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여도 압류당할 수 있나요?<br />
        압류 금지 범위와 예외
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받는 통장이 압류됐다고요? 실업급여는 원칙적으로 압류가 금지돼 있어요. 고용보험법에서 보호하고 있거든요. 다만 통장에 다른 돈과 섞이면 구분이 어려워질 수 있어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>실업급여 압류 금지 원칙</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <GreenBox>· 고용보험법 제108조: 실업급여 수급권은 압류 금지<br />· 통장 입금 후에도 실업급여임이 확인되면 보호<br />· 150만원 이하 예금은 전액 압류 금지 (민사집행법)</GreenBox>
      <Divider />

      <H2>통장이 압류됐을 때 대처법</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <Steps steps={[{"title":"압류방지통장 개설","desc":"고용센터에서 압류방지 전용 통장을 안내받아요."},{"title":"이의 신청","desc":"법원에 압류된 금액 중 실업급여분에 대해 이의 신청을 해요."},{"title":"법률 상담","desc":"대한법률구조공단(132)에서 무료 상담을 받아요."}]} />
      <Divider />

      <H2>압류 금지 범위는 어디까지인가요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <BorderBox>· 실업급여 전액: 수급권 자체가 압류 금지<br />· 예금 150만원 이하: 민사집행법상 전액 보호<br />· 초과분: 최저생계비를 고려해 일부 보호</BorderBox>
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
