"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 국가유공자 본인이거나 유족인데, 영구임대주택에 우선공급 받을 수 있는지 자격과 절차를 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 소득·자산 기준을 확인하고, LH청약에서 영구임대 공고를 찾아 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 우선공급 비율(10%), 자격 대상(유공자+유족), 소득 기준(70% 이하), 신청 장소(주민센터), 2029.3.31 유효기간.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(자격 확인) + GreenBox(핵심 기준) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps, EligibilityChecker,
  ArticleLayout,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "veteran", label: "국가유공자, 독립유공자, 5·18유공자, 특수임무유공자 또는 그 유족이에요" },
  { id: "homeless", label: "입주자 모집공고일 기준 무주택세대구성원이에요" },
  { id: "income", label: "도시근로자 월평균소득의 70% 이하예요 (1인 90%, 2인 80%)" },
  { id: "asset", label: "자산 보유 기준을 충족해요" },
];

const STEPS = [
  { title: "입주 공고 확인", desc: "LH청약플러스(apply.lh.or.kr) 또는 마이홈포털(myhome.go.kr)에서 영구임대주택 입주 공고를 확인하세요." },
  { title: "자격 요건 확인", desc: "국가유공자 또는 유족 여부, 무주택 여부, 소득·자산 기준을 미리 확인해요.", tip: "국가보훈처에서 유공자 확인서를 발급받아야 해요." },
  { title: "주민센터에서 신청", desc: "거주지 관할 주민센터(행정복지센터)를 방문해서 입주 신청서를 제출해요." },
  { title: "서류 심사·추첨", desc: "LH에서 소득·자산 심사를 거쳐 입주 대상자를 선정해요. 경쟁이 있으면 추첨으로 결정돼요." },
];

const FAQS = [
  {
    q: "국가유공자 자녀도 우선공급 받을 수 있나요?",
    a: "네, 받을 수 있어요. 국가유공자 본인뿐 아니라 유족도 우선공급 대상이에요. 다만 참전유공자의 유족은 제외돼요.",
  },
  {
    q: "영구임대주택 임대료는 얼마나 되나요?",
    a: "시세의 30% 수준으로 매우 저렴해요. 보증금과 월임대료 모두 일반 시세보다 훨씬 낮아요. 단지별로 다르니 공고문에서 확인하세요.",
  },
  {
    q: "소득 기준은 어떻게 확인하나요?",
    a: "도시근로자 가구당 월평균소득의 70% 이하예요. 1인 가구는 90%, 2인 가구는 80%를 적용해요. 건강보험료 납부액으로 소득을 추정해요.",
  },
  {
    q: "우선공급 비율이 얼마나 되나요?",
    a: "영구임대주택 건설 물량의 약 10%가 국가유공자 등에게 우선공급돼요.",
  },
  {
    q: "이 규정은 언제까지 유효한가요?",
    a: "2029년 3월 31일까지 우선공급 규정이 유효해요. 이후에는 연장 여부가 결정될 예정이에요.",
  },
  {
    q: "영구임대 말고 다른 공공임대도 우선공급 있나요?",
    a: "네, 국민임대주택이나 행복주택에서도 국가유공자 우선공급이 있어요. 유형마다 자격 기준이 조금씩 다르니 각 공고문을 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보 — 영구임대주택 입주", url: "https://easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=1769&ccfNo=2&cciNo=1&cnpClsNo=3" },
      { label: "LH청약플러스", url: "https://apply.lh.or.kr" },
      { label: "마이홈포털", url: "https://www.myhome.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주거 · 공공임대</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국가유공자 영구임대주택 우선공급,<br />
        자격 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국가유공자이거나 유족이시라면 영구임대주택에 우선으로 입주할 수 있어요.
        건설 물량의 약 10%가 우선공급 대상이에요.
        자격 요건과 신청 절차를 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>우선공급 자격이 되는지 확인해보세요</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=1769&ccfNo=2&cciNo=1&cnpClsNo=3" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면,
        국가유공자와 유족은 영구임대주택 1순위 우선공급 대상이에요.
        무주택이면서 소득·자산 기준을 충족해야 해요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="영구임대주택 국가유공자 우선공급 대상이에요. 입주 공고가 나면 주민센터에서 신청하세요."
        partialMatchText="일부 조건이 안 맞을 수 있어요. 아래 세부 기준을 확인해보세요."
      />

      <Divider />

      <H2>소득과 자산 기준은 어떻게 되나요?</H2>
      <p style={body}>
        영구임대주택은 저소득층을 위한 주거 복지 제도라서 소득·자산 기준이 있어요.
        건강보험료 납부액으로 소득을 추정해요.
      </p>

      <GreenBox>
        <strong>소득 기준</strong>: 도시근로자 가구당 월평균소득의 70% 이하<br />
        · 1인 가구: 90% 이하<br />
        · 2인 가구: 80% 이하<br />
        · 3인 이상: 70% 이하<br /><br />
        <strong>우선공급 비율</strong>: 건설 물량의 약 10%<br />
        <strong>규정 유효기간</strong>: 2029년 3월 31일까지
      </GreenBox>

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://apply.lh.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>LH청약플러스</a>에서
        입주 공고를 확인한 뒤, 관할 주민센터에서 신청해요.
        국가보훈처 확인서가 필요하니 미리 발급받으세요.
      </p>

      <SectionBadge>신청 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox title="함께 알아두면 좋은 것">
        · 국민임대주택도 국가유공자 우선공급이 있어요<br />
        · 행복주택은 청년·신혼부부 위주지만 유공자도 신청 가능<br />
        · <a href="/w/공공임대주택-종류-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>공공임대주택 종류</a>별로 자격 기준이 달라요
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공공주택 특별법과 국가유공자 등 예우 및 지원에 관한 법률을 바탕으로 작성됐어요. 세부 자격은 LH(1600-1004) 또는 국가보훈처(1577-0606)에 문의하세요." />
    </ArticleLayout>
  );
}
