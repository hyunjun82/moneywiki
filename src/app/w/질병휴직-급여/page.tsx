"use client";

// Q1. 오래 아파서 회사를 쉬어야 하는데 급여가 나오는지, 무급인지 걱정하는 상황
// Q2. 질병휴직 급여 지급 여부를 확인하고, 상병수당·건강보험 등 받을 수 있는 것을 파악해서 신청
// Q3. 법정 휴직 아님→회사 규정 따름, 대부분 무급, 상병수당 전국 확대, 4대보험 유지, 산재와 구분
// Q4. GreenBox(급여 지급 기준) + BorderBox(질병휴직 vs 산재휴직) + Checklist(받을 수 있는 것) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const AVAILABLE_BENEFITS = [
  "회사 취업규칙에 유급 질병휴직 조항이 있는지 확인",
  "상병수당: 업무 외 질병·부상으로 일 못 하면 소득 일부 지원 (대기기간 7일, 최대 150일)",
  "건강보험 급여: 치료비는 건강보험 적용, 본인부담금만 부담",
  "실비보험·소득보장보험 등 민간보험 가입 여부 확인 후 청구",
  "국민연금·건강보험 납부예외 신청 (무급휴직 시)",
  "고용보험 피보험자격은 유지되니 별도 조치 불필요",
];

const FAQS = [
  {
    q: "질병휴직 중에 월급이 나오나요?",
    a: "회사 규정에 따라 달라요. 법으로 정해진 게 아니라서 대부분 무급이에요. 일부 대기업이나 공공기관은 일정 기간 기본급의 50% 정도 지급하기도 해요.",
  },
  {
    q: "상병수당이 뭔가요?",
    a: "업무 외 질병·부상으로 일하지 못할 때 소득의 일부를 보전해 주는 제도예요. 2026년 전국으로 확대 시행 중이고, 대기기간 7일 후 최대 150일 지급돼요.",
  },
  {
    q: "질병휴직 중 4대보험은 어떻게 되나요?",
    a: "근로관계가 유지되니 자격은 그대로 유지돼요. 무급이면 국민연금과 건강보험 납부예외를 신청할 수 있어요.",
  },
  {
    q: "업무 때문에 아픈 건데 질병휴직인가요?",
    a: "업무상 질병이면 산재로 처리해야 해요. 산재 인정되면 휴업급여(평균임금의 70%)를 받을 수 있어서 훨씬 유리해요.",
  },
  {
    q: "질병휴직 최대 기간은 얼마인가요?",
    a: "회사 규정에 따라 달라요. 보통 6개월~2년이에요. 공무원은 질병휴직 1년은 봉급 70%, 1년 초과 2년 이내는 50%가 나와요.",
  },
  {
    q: "취업규칙에 질병휴직 규정이 없으면?",
    a: "휴직 자체가 안 될 수 있어요. 이 경우 연차, 병가 등 다른 제도를 활용해야 해요. 회사 인사팀에 먼저 문의하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "국민건강보험법", url: "https://www.law.go.kr/법령/국민건강보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 상병수당 시범사업", url: "https://www.mohw.go.kr/menu.es?mid=a10705020300" },
      { label: "복지로: 나에게 맞는 복지 찾기", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "산재-휴업급여", title: "산재 휴업급여 신청 방법", description: "업무상 질병·부상이면 산재로 처리하세요." },
  { slug: "휴직-종류", title: "휴직 종류별 비교", description: "육아·질병·개인사유 휴직을 비교해요." },
  { slug: "상병급여-신청-조건-및-수급-방법", title: "상병급여 신청 조건", description: "실업급여 수급 중 아플 때 받는 급여예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 휴직 · 급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        질병휴직 중에 급여가 나올까?<br />
        지급 기준과 받을 수 있는 수당
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오래 아파서 회사를 쉬어야 하는데 급여가 어떻게 되는지 막막하죠?
        질병휴직은 법정 휴직이 아니라 회사 규정에 따라요.
        대부분 무급이지만, 상병수당이나 보험으로 소득을 보전할 수 있는 방법이 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>질병휴직 급여는 나오나요?</H2>
      <SectionBadge>급여 기준</SectionBadge>

      <p style={body}>
        질병휴직은 육아휴직이나 산재휴직과 달리 <strong>법으로 정해진 휴직이 아니에요</strong>.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에
        질병휴직 관련 조항이 없어서 회사 취업규칙이나 단체협약에서 정하는 대로 따라요.
      </p>

      <GreenBox title="질병휴직 급여 지급 기준">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>법정 의무</strong>: 없음 (회사 규정에 따름)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>대부분</strong>: 무급 (급여 지급 의무 없음)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>일부 대기업·공공기관</strong>: 일정 기간 기본급 50% 등 유급 운영</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>공무원</strong>: 1년 이내 봉급 70%, 1년 초과 2년 이내 봉급 50%</p>
      </GreenBox>

      <p style={body}>
        먼저 회사 취업규칙을 확인하세요. "질병휴직 기간은 무급으로 한다"고 돼 있으면 급여가 안 나와요.
        취업규칙에 질병휴직 규정 자체가 없으면 휴직이 안 될 수도 있어요.
      </p>

      <Divider />

      <H2>급여 대신 받을 수 있는 것은?</H2>
      <SectionBadge>소득 보전</SectionBadge>

      <p style={body}>
        무급이라도 포기하지 마세요. 아래 항목을 하나씩 확인해서 받을 수 있는 건 다 챙기세요.
      </p>

      <Checklist items={AVAILABLE_BENEFITS} />

      <p style={{ ...body, marginTop: 14 }}>
        <a href="https://www.mohw.go.kr/menu.es?mid=a10705020300" style={{ color: "#1D9E75", textDecoration: "underline" }}>상병수당</a>은
        2026년 전국으로 확대 시행 중이에요.
        업무 외 질병이나 부상으로 일하지 못하는 기간 동안 소득을 보전해 줘요.
        대기기간 7일 후 최대 150일까지 받을 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>산재휴직과는 뭐가 다른가요?</H2>

      <p style={body}>
        업무 때문에 아프거나 다쳤다면 질병휴직이 아니라 <a href="/w/산재-휴업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>산재</a>로 처리해야 해요.
        산재 인정되면 휴업급여를 받을 수 있어서 훨씬 유리해요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>질병휴직 vs 산재휴직 비교</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>질병휴직</strong>: 개인 질병 → 회사 규정 → 대부분 무급</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>산재휴직</strong>: 업무상 질병·부상 → 산재보험법 → 휴업급여 (평균임금 70%)</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          업무와 관련된 질병이라면 산재 인정 여부를 먼저 확인하세요.
        </p>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 상병수당 지급 기준과 금액은 정책 변경에 따라 달라질 수 있으니 보건복지부 홈페이지를 확인하세요." />
    </ArticleLayout>
  );
}
