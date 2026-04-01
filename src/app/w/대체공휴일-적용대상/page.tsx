"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 공휴일이 주말과 겹쳤는데 회사에서 대체공휴일을 안 쉬게 해서, 우리 회사도 적용되는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 사업장이 5인 이상인지 확인하고, 대체공휴일에 쉴 권리가 있는지 판단하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 5인 이상 vs 5인 미만 기준, 적용되는 공휴일 목록(8개), 휴일근로수당 150%, 2022년 전면 확대 시행.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(사업장 규모 확인) + GreenBox(핵심 기준) + DocTable(적용 공휴일 목록) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  EligibilityChecker, DocTable,
  ArticleLayout,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "size", label: "우리 회사 상시근로자가 5인 이상이에요" },
  { id: "holiday", label: "공휴일이 주말(토·일)과 겹쳤어요" },
  { id: "target", label: "해당 공휴일이 대체공휴일 적용 대상이에요" },
  { id: "worker", label: "근로기준법상 근로자예요 (프리랜서·사업자 아님)" },
];

const HOLIDAY_DOCS = [
  { name: "설날 (연휴 3일)", required: true, where: "음력 12.30~1.2 중 주말 겹치면 적용" },
  { name: "추석 (연휴 3일)", required: true, where: "음력 8.14~8.16 중 주말 겹치면 적용" },
  { name: "어린이날 (5월 5일)", required: true, where: "토·일 겹치면 그 다음 평일 쉬어요" },
  { name: "광복절 (8월 15일)", required: true, where: "2021년부터 적용" },
  { name: "개천절 (10월 3일)", required: true, where: "2021년부터 적용" },
  { name: "한글날 (10월 9일)", required: true, where: "2021년부터 적용" },
  { name: "부처님오신날 (음력 4.8)", required: true, where: "2023년부터 적용" },
  { name: "성탄절 (12월 25일)", required: true, where: "2023년부터 적용" },
];

const FAQS = [
  {
    q: "5인 미만 사업장도 대체공휴일에 쉬어야 하나요?",
    a: "법적 의무는 없어요. 다만 회사 내규나 근로계약서에 공휴일 휴무 규정이 있으면 쉴 수 있어요. 사업주 재량이에요.",
  },
  {
    q: "대체공휴일에 출근하면 수당을 더 받나요?",
    a: "5인 이상 사업장이라면 휴일근로수당으로 통상임금의 150%를 받아요. 8시간 초과분은 200%예요.",
  },
  {
    q: "일용직이나 아르바이트도 대체공휴일 적용되나요?",
    a: "5인 이상 사업장에서 일하는 근로자라면 고용 형태에 관계없이 적용돼요. 일용직, 파트타임, 계약직 모두 해당돼요.",
  },
  {
    q: "공무원은 대체공휴일이 다른가요?",
    a: "공무원은 관공서의 공휴일에 관한 규정이 별도로 적용돼요. 민간보다 먼저 대체공휴일 제도가 시행됐어요.",
  },
  {
    q: "대체공휴일인데 연차를 쓰라고 하면요?",
    a: "불법이에요. 대체공휴일은 유급휴일이라 연차에서 차감할 수 없어요. 고용노동부(1350)에 신고할 수 있어요.",
  },
  {
    q: "2026년 대체공휴일은 언제예요?",
    a: "2026년에는 3월 1일(삼일절)이 일요일이지만 삼일절은 대체공휴일 적용 대상이 아니에요. 설날·추석 연휴와 각 공휴일 날짜를 확인해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "근로기준법 제55조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "관공서의 공휴일에 관한 규정", url: "https://www.law.go.kr/법령/관공서의공휴일에관한규정" },
      { label: "고용노동부 노동 민원", url: "https://www.moel.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·휴일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대체공휴일, 우리 회사도 쉬나요?<br />
        적용 대상과 휴일수당 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공휴일이 주말이랑 겹쳤는데 회사에서 아무 말이 없어요.
        대체공휴일은 5인 이상 사업장이면 법으로 보장된 유급휴일이에요.
        어떤 회사가 적용되고, 어떤 공휴일이 해당되는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>우리 회사에 대체공휴일이 적용되나요?</H2>
      <p style={body}>
        핵심은 <strong>상시근로자 수</strong>예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제55조 제2항</a>에
        따라 5인 이상 사업장은 관공서 공휴일과 대체공휴일이 유급휴일이에요.
        2022년 1월 1일부터 5인 이상 사업장 전체로 확대됐어요.
      </p>

      <GreenBox>
        <strong>5인 이상 사업장</strong> = 대체공휴일 유급휴일 (법적 의무)<br />
        <strong>5인 미만 사업장</strong> = 적용 의무 없음 (사업주 재량)<br />
        상시근로자 수는 최근 1개월간 평균 근로자 수로 판단해요.
      </GreenBox>

      <SectionBadge>적용 여부 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="대체공휴일에 유급 휴일을 쓸 수 있어요. 출근하면 휴일근로수당(150%)을 받을 수 있어요."
        partialMatchText="일부 조건이 안 맞으면 적용되지 않을 수 있어요. 아래 내용을 더 확인해보세요."
      />

      <Divider />

      <H2>어떤 공휴일에 대체공휴일이 생기나요?</H2>
      <p style={body}>
        모든 공휴일이 대체공휴일 대상은 아니에요.
        <a href="https://www.law.go.kr/법령/관공서의공휴일에관한규정" style={{ color: "#1D9E75", textDecoration: "underline" }}>관공서의 공휴일에 관한 규정</a>에서
        정한 8개 공휴일만 해당돼요.
        삼일절, 현충일, 제헌절은 대체공휴일 적용 대상이 아니에요.
      </p>

      <SectionBadge>대체공휴일 적용 공휴일 8개</SectionBadge>
      <DocTable docs={HOLIDAY_DOCS} />

      <Divider />

      <H2>대체공휴일에 일하면 수당은 얼마나 받나요?</H2>
      <p style={body}>
        5인 이상 사업장에서 대체공휴일에 출근하면 <strong>휴일근로수당</strong>을 받아요.
        8시간 이내는 통상임금의 150%, 8시간 초과분은 200%예요.
        예를 들어 시급 1만원인 근로자가 대체공휴일에 10시간 일하면,
        8시간분 12만원(1만원 x 8 x 1.5) + 2시간분 4만원(1만원 x 2 x 2.0) = 총 16만원을 받아요.
      </p>

      <BorderBox title="휴일근로수당 계산">
        8시간 이내: 통상임금 x 150% (1.5배)<br />
        8시간 초과: 통상임금 x 200% (2.0배)<br />
        5인 미만 사업장은 휴일근로수당 의무 없음
      </BorderBox>

      <p style={body}>
        회사에서 대체공휴일에 연차를 쓰라고 강요하는 건 위법이에요.
        대체공휴일은 법으로 보장된 유급휴일이라 연차와 별개예요.
        이런 경우 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 신고할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 구체적인 사안은 고용노동부(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
