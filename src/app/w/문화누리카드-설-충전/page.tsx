"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    "q": "문화누리카드 대상은 누구인가요?",
    "a": "기초생활수급자, 차상위계층이 대상이에요. 만 6세 이상이면 1인당 1장 발급돼요."
  },
  {
    "q": "온라인에서도 사용할 수 있나요?",
    "a": "네. 문화누리 가맹점 중 온라인 사용이 가능한 곳이 있어요. 앱에서 온라인 가맹점 목록을 확인할 수 있어요."
  },
  {
    "q": "잔액이 소멸되면 다시 충전되나요?",
    "a": "다음 해 2월에 새로 13만원이 충전돼요. 전년도 잔액은 소멸되고 이월은 안 돼요."
  },
  {
    "q": "가족이 대신 사용해도 되나요?",
    "a": "원칙적으로 본인 사용이에요. 다만 만 6세 미만 자녀는 보호자가 대리 사용 가능해요."
  },
  {
    "q": "문화누리카드로 식사도 가능한가요?",
    "a": "음식점은 가맹점이 아니에요. 문화·여가·체육·관광 분야만 사용 가능해요."
  }
];
const REFERENCES = [
  {
    "category": "공식",
    "items": [
      {
        "label": "문화누리카드",
        "url": "https://www.mnuri.kr"
      },
      {
        "label": "한국문화예술위원회",
        "url": "https://www.arko.or.kr"
      }
    ]
  }
];
const RELATED = [
  {
    "slug": "아동수당-지역사랑상품권-지급",
    "title": "아동수당 상품권 지급",
    "description": "아동수당이 상품권으로 나오는 지역이 있어요."
  }
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 문화</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        문화누리카드 설 충전, 언제 얼마 들어오나요?<br />
        충전 일정과 사용처
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 연휴에 문화누리카드로 뭘 할 수 있는지 궁금하죠? 매년 2월 초에 연간 충전금이 한꺼번에 들어와요. 2026년 기준 연간 13만원이에요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>충전 일정과 금액</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <GreenBox>· 충전 시기: 매년 2월 초 (설 전후)<br />· 연간 금액: 13만원 (일시 충전)<br />· 이월: 당해 12월 31일까지 미사용분 소멸</GreenBox>
      <Divider />

      <H2>어디서 사용할 수 있나요?</H2>
      <p style={body}>
        이 부분이 핵심이에요.
      </p>
      <Checklist items={["영화관 (CGV, 메가박스, 롯데시네마)","서점 (교보, 영풍 등)","공연·전시 티켓","여행 (KTX, 고속버스 등)","체육시설 (스포츠센터 등)","온라인 문화 콘텐츠"]} />
      <Divider />

      <H2>잔액 확인과 재발급</H2>
      <p style={body}>
        여기서 중요한 내용을 짚어볼게요.
      </p>
      <Steps steps={[{"title":"잔액 확인","description":"문화누리 홈페이지 또는 ARS 1544-3412로 확인해요."},{"title":"재발급","description":"카드 분실 시 주민센터에서 재발급 신청해요.","tip":"신분증 지참 필요"}]} />
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
