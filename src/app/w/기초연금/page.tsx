"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 본인 또는 부모님이 만 65세에 가까워지면서 기초연금을 받을 수 있는지, 얼마나 받는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 소득인정액 기준에 해당되는지 판단하고, 주민센터나 복지로에서 직접 신청하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 2026년 선정기준액(단독 247만원, 부부 395.2만원), 기준연금액(약 34.97만원), 저소득 노인 40만원 인상, 감액 구조, 신청 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(2026 핵심 수치) + BorderBox(소득인정액 계산) + Steps(신청 절차) + EligibilityChecker + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const FAQS = [
  {
    q: "국민연금 받으면 기초연금 못 받나요?",
    a: "받을 수 있어요. 다만 국민연금이 기준연금액의 150%(약 52만원)를 넘으면 기초연금이 최대 50%까지 감액될 수 있어요.",
  },
  {
    q: "기초연금은 자동으로 나오나요?",
    a: "아니요. 반드시 본인이 신청해야 해요. 만 65세 생일 1개월 전부터 신청 가능해요. 소급 지급은 안 돼요.",
  },
  {
    q: "공무원연금 받으면 기초연금을 못 받나요?",
    a: "네. 공무원연금, 사학연금, 군인연금, 별정우체국연금 수급자는 기초연금 대상에서 제외돼요.",
  },
  {
    q: "부부가 둘 다 받으면 각각 얼마인가요?",
    a: "2026년 기준 부부가구 최대 55만 9,520원이에요. 각각 기준연금액의 80%(약 28만원)를 받아요.",
  },
  {
    q: "집이 있으면 못 받나요?",
    a: "집이 있어도 받을 수 있어요. 재산을 소득으로 환산해서 계산하는데, 대도시 기준 1억 3,500만원까지는 공제해줘요.",
  },
  {
    q: "2026년에 40만원으로 오른다는데요?",
    a: "2026년부터 중위소득 50% 이하 저소득 어르신은 40만원으로 인상돼요. 2027년에 전체 대상으로 확대 예정이에요.",
  },
  {
    q: "기초생활수급자도 기초연금을 받을 수 있나요?",
    a: "받을 수 있지만, 기초연금만큼 생계급여가 줄어들 수 있어요. 실질적으로 총 수령액은 비슷할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부 2026년 기초연금 선정기준액 고시", url: "https://www.mohw.go.kr" },
      { label: "복지로 기초연금 신청", url: "https://www.bokjiro.go.kr" },
      { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 조건", description: "국민연금 조기수령 시 감액률과 손익분기점을 확인하세요." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "갑자기 생활이 어려워졌을 때 긴급복지 지원을 받을 수 있어요." },
  { slug: "미환급금-조회-정부24-환급금-찾기", title: "미환급금 조회", description: "못 받은 환급금이 있는지 정부24에서 확인해보세요." },
];

const APPLY_STEPS = [
  { title: "신청 시기 확인", desc: "만 65세 생일 1개월 전부터 신청할 수 있어요.", tip: "미리 신청해두면 생일 지나자마자 바로 수급돼요." },
  { title: "신청 장소 선택", desc: "주민센터, 국민연금공단 지사, 또는 복지로(bokjiro.go.kr) 온라인 신청이에요." },
  { title: "서류 준비", desc: "신분증, 통장 사본, 금융정보 제공 동의서를 챙겨요.", tip: "전세 사는 분은 임대차계약서도 필요해요." },
  { title: "심사·지급", desc: "시청/구청에서 소득·재산을 조사해요. 1~2개월 걸리고, 통과하면 매월 25일 지급돼요." },
];

const ELIG_ITEMS = [
  { id: "e1", label: "만 65세 이상이다 (2026년 기준 1961년 이전 출생)" },
  { id: "e2", label: "대한민국 국적이고 국내에 거주한다" },
  { id: "e3", label: "공무원연금·사학연금·군인연금을 받고 있지 않다" },
  { id: "e4", label: "소득인정액이 선정기준액 이하다 (단독 247만원 / 부부 395.2만원)" },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 복지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기초연금, 받을 수 있을까?<br />
        2026년 금액·선정기준과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        만 65세 넘으면 나라에서 매달 연금을 준다는데, 본인이 대상인지 궁금하죠.
        2026년 기초연금 선정기준액과 금액이 모두 올랐어요.
        대상 여부 판단부터 신청 방법까지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>2026년 기초연금 핵심 수치부터 확인하세요</H2>
      <p style={body}>
        <a href="https://www.mohw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>보건복지부</a>가 고시한
        2026년 기초연금 선정기준액이에요. 만 65세 이상 어르신 중 소득 하위 70%가 대상이에요.
      </p>

      <GreenBox title="2026년 기초연금 핵심 수치">
        · 선정기준액: 단독가구 <strong>월 247만원</strong> / 부부가구 <strong>월 395.2만원</strong><br />
        · 기준연금액: 단독 <strong>월 34만 9,700원</strong> / 부부 <strong>월 55만 9,520원</strong><br />
        · 저소득 노인(중위소득 50% 이하): <strong>월 40만원</strong>으로 인상 (2026년~)<br />
        · 지급일: 매월 25일 (휴일이면 전 영업일)<br />
        · 전년 대비 선정기준 19만원 인상 (단독 기준)
      </GreenBox>

      <Divider />

      <H2>나는 기초연금 대상일까?</H2>
      <p style={body}>
        아래 4가지를 모두 충족하면 기초연금을 받을 수 있어요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="모두 해당하면 기초연금 대상이에요. 만 65세 생일 1개월 전부터 신청하세요."
        partialMatchText="체크가 빠진 항목이 있으면 대상이 아닐 수 있어요. 주민센터나 국민연금공단에 문의하세요."
      />

      <Divider />

      <H2>소득인정액은 어떻게 계산하나요?</H2>
      <p style={body}>
        소득인정액 = 소득평가액 + 재산의 소득환산액이에요.
        쉽게 말하면 버는 돈과 가진 재산을 합쳐서 계산하는 거예요.
      </p>

      <BorderBox title="소득 계산 방식">
        <strong>근로소득</strong>: (월 소득 - 110만원) × 70%만 반영<br />
        → 월 200만원 벌면 (200만-110만)×70% = <strong>63만원</strong>만 소득으로 잡혀요<br /><br />
        <strong>재산</strong>: 기본재산액 초과분 × 연 4% ÷ 12<br />
        → 대도시 1억 3,500만원 / 중소도시 8,500만원 / 농어촌 7,250만원까지 공제<br /><br />
        ※ 빚(부채)도 재산에서 빼줘요<br />
        ※ 4,000만원 초과 고급 자동차는 100% 소득 환산
      </BorderBox>

      <p style={body}>
        <a href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>복지로</a> 모의계산기에서
        본인 소득인정액을 미리 확인해볼 수 있어요.
      </p>

      <Divider />

      <H2>감액되는 경우도 있어요</H2>
      <p style={body}>
        기초연금 최대 금액을 다 못 받는 경우가 두 가지 있어요.
      </p>

      <BorderBox title="감액 사유">
        <strong>1. 소득역전방지 감액</strong><br />
        소득인정액 + 기초연금이 선정기준액(247만원)을 넘으면 넘는 만큼 깎여요.<br />
        예) 소득인정액 240만원 + 기초연금 34.97만원 = 274.97만원 → 27.97만원 감액<br /><br />
        <strong>2. 국민연금 연계 감액</strong><br />
        국민연금이 기준연금액의 150%(약 52만원)를 넘으면 기초연금이 최대 50%까지 감액돼요.<br />
        예) 국민연금 80만원 → 기초연금 약 17만원으로 줄어들 수 있어요
      </BorderBox>

      <Divider />

      <H2>신청 방법, 생일 1개월 전부터 가능해요</H2>
      <p style={body}>
        기초연금은 자동으로 나오지 않아요. 반드시 직접 신청해야 하고, 소급 지급은 안 돼요.
        신청한 달부터 지급이 시작되니 미리 신청하는 게 중요해요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 보건복지부 고시를 바탕으로 작성했어요. 소득인정액 계산은 개인별로 다르니, 정확한 수급 여부는 주민센터나 국민연금공단(☎ 1355)에 문의하세요." />
    </ArticleLayout>
  );
}
