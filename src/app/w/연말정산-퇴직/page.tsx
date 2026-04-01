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
    "q": "퇴사하면 연말정산을 안 해도 되나요?",
    "a": "회사가 중도정산을 해주지만, 추가 공제가 있다면 5월 종합소득세 신고를 해야 환급받을 수 있어요."
  },
  {
    "q": "원천징수영수증은 어디서 받나요?",
    "a": "퇴사한 회사에 요청하거나, 홈택스에서 지급명세서를 조회할 수 있어요."
  },
  {
    "q": "연도 중에 이직하면 두 군데 연말정산을 하나요?",
    "a": "새 회사에서 합산해서 한 번에 해줘요. 이전 회사 원천징수영수증을 제출하면 돼요."
  },
  {
    "q": "퇴직금도 연말정산에 포함되나요?",
    "a": "퇴직금은 퇴직소득으로 분류돼서 근로소득 연말정산과는 별도예요. 퇴직소득세가 따로 계산돼요."
  },
  {
    "q": "종합소득세 신고 안 하면 불이익이 있나요?",
    "a": "환급받을 금액이 있다면 못 받게 돼요. 추가 납부할 금액이 있는데 안 하면 가산세가 붙을 수 있어요."
  }
];
const REFERENCES = [
  {
    "category": "공식",
    "items": [
      {
        "label": "홈택스",
        "url": "https://www.hometax.go.kr"
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
    "slug": "연말정산-세액계산-방법",
    "title": "연말정산 세액계산 방법",
    "description": "전체 세액 계산 흐름을 정리했어요."
  },
  {
    "slug": "연말정산-경정청구",
    "title": "연말정산 경정청구",
    "description": "놓친 공제를 추후에 돌려받는 방법이에요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 퇴직</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직한 해 연말정산은 어떻게 하나요?<br />
        중도 퇴사자 연말정산 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중간에 퇴사했는데 연말정산은 어떻게 되는 거냐고요? 퇴사 시 회사가 중도정산을 해주고, 추가 공제를 받으려면 다음 해 5월에 직접 종합소득세 신고를 하면 돼요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>퇴직 시 연말정산 절차</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <Steps steps={[{"title":"회사 중도정산","desc":"퇴사 시점까지의 소득에 대해 회사가 연말정산을 해줘요."},{"title":"원천징수영수증 수령","desc":"퇴직 후 근로소득 원천징수영수증을 받아요.","tip":"이직 시 새 회사에 제출"},{"title":"종합소득세 신고 (5월)","desc":"추가 공제가 있으면 홈택스에서 직접 신고해요."}]} />
      <Divider />

      <H2>추가 공제를 받으려면?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <GreenBox>· 의료비·교육비·기부금 등 퇴사 후 발생분<br />· 이전 회사에서 반영 안 된 공제 항목<br />· 홈택스에서 5월 종합소득세 신고로 처리</GreenBox>
      <Divider />

      <H2>이직한 경우는 어떻게 하나요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <BorderBox>· 이직: 새 회사에 원천징수영수증 제출 → 합산 연말정산<br />· 미이직: 다음 해 5월 종합소득세 직접 신고<br />· 프리랜서 전환: 사업소득으로 종합소득세 신고</BorderBox>
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
