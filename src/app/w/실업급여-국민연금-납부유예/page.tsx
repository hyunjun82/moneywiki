"use client";

// Q1. 실직했는데 국민연금 보험료를 못 낼 것 같고, 안 내면 나중에 연금이 줄어들까 불안한 상황이에요.
// Q2. 고용센터에서 실업크레딧을 신청해서 보험료 75% 지원받으면서 가입기간을 유지하는 행동.
// Q3. 실업크레딧 vs 납부예외 차이, 75% 지원(본인 25%), 신청 자격(구직급여 수급+18~60세), 최대 12개월, 신청 기한.
// Q4. GreenBox(핵심 비교) + EligibilityChecker(자격 확인) + Steps(신청 방법) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "구직급여(실업급여)를 받는 중이다" },
  { id: "c2", label: "18세 이상 60세 미만이다" },
  { id: "c3", label: "과거에 국민연금 보험료를 1개월 이상 납부한 적이 있다" },
  { id: "c4", label: "재산(부동산·통장·주식 합산)이 6억원 이하다" },
  { id: "c5", label: "연간 종합소득(사업·근로소득 제외)이 1,680만원 이하다" },
];

const APPLY_STEPS = [
  { title: "고용센터에서 신청 (가장 간편)", desc: "구직급여 받으러 갈 때 실업크레딧도 같이 신청할 수 있어요. 실업급여 신청서에 실업크레딧 신청 의사를 표시하면 돼요.", tip: "구직급여 신청하면서 같이 하면 추가 서류 거의 없어요" },
  { title: "국민연금공단 지사에서 신청", desc: "가까운 국민연금공단 지사를 방문하거나 nps.or.kr에서 온라인으로 신청할 수 있어요." },
  { title: "자격 심사 (약 2주)", desc: "국민연금공단에서 자격을 심사해요. 승인되면 매월 본인 부담분(25%)만 내면 돼요." },
  { title: "본인 부담분 납부", desc: "매월 보험료의 25%만 납부해요. 자동이체 설정해두면 놓칠 걱정 없어요.", tip: "본인 부담분 안 내면 그 달은 가입기간으로 인정 안 돼요" },
];

const FAQS = [
  { q: "실업크레딧과 납부예외, 뭐가 다른가요?", a: "실업크레딧은 보험료 75%를 지원받고 가입기간이 인정돼요. 납부예외는 보험료를 안 내는 대신 그 기간이 가입기간에 포함되지 않아요. 같은 기간이라면 실업크레딧이 훨씬 유리해요." },
  { q: "보험료를 얼마나 내야 하나요?", a: "실직 전 3개월 평균 월급의 50%를 기준으로 보험료를 계산하고, 그 중 25%만 본인이 내요. 기준소득 상한이 70만원이라 월 최대 63,000원 정도예요." },
  { q: "생애 몇 개월까지 받을 수 있나요?", a: "최대 12개월이에요. 여러 번 실직해도 합산해서 12개월을 넘을 수 없어요. 이번에 6개월 썼으면 다음에 최대 6개월 남아요." },
  { q: "구직급여가 끝나면 어떻게 되나요?", a: "실업크레딧도 자동으로 끝나요. 새 직장을 구하면 직장가입자로, 못 구하면 지역가입자로 전환돼요." },
  { q: "이미 납부예외를 신청했는데 바꿀 수 있나요?", a: "가능해요. 납부예외를 취소하고 실업크레딧으로 변경해야 해요. 국민연금공단(1355)에 전화해서 변경 절차를 안내받으세요." },
  { q: "신청 기한은 언제까지예요?", a: "구직급여가 끝나는 달의 다음 달 15일까지예요. 예를 들어 구직급여가 2월에 끝나면 3월 15일까지 신청해야 해요. 기한 넘기면 신청 자체가 안 돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민연금공단 실업크레딧 안내", url: "https://www.nps.or.kr" },
      { label: "정부24 실업크레딧 신청", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/B55201500004" },
      { label: "국민연금 온에어 실업크레딧", url: "https://www.npsonair.kr/advantages/1481" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 받을 수 있는 조건", description: "구직급여 수급자격을 먼저 확인해야 실업크레딧도 신청할 수 있어요." },
  { slug: "국민연금", title: "국민연금 수령액과 가입기간", description: "가입기간에 따라 연금이 얼마나 달라지는지 확인하세요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "고용센터에서 구직급여 신청하는 전체 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 국민연금 · 실업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받을 때 국민연금은?<br />
        실업크레딧으로 가입기간 유지하기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실직했는데 국민연금 보험료를 못 낼 것 같으시죠?
        실업크레딧을 신청하면 보험료의 75%를 지원받고, 그 기간도 가입기간으로 인정돼요.
        납부예외를 하면 보험료는 안 내지만 가입기간이 끊겨서 나중에 연금이 줄어요.
        같은 상황이라면 실업크레딧이 훨씬 유리해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>실업크레딧 vs 납부예외, 핵심 차이</H2>
      <p style={body}>
        둘 다 실직 기간 국민연금과 관련된 제도인데, 결과가 완전히 달라요.
        핵심 차이는 가입기간 인정 여부예요.
      </p>

      <SectionBadge>비교 요약</SectionBadge>
      <GreenBox title="실업크레딧 vs 납부예외">
        <p style={{ ...body, marginBottom: 8 }}><strong>실업크레딧</strong></p>
        <p style={{ ...body, marginBottom: 8 }}>보험료 75% 정부 지원 + 본인 25%만 부담. 가입기간 인정. 나중에 연금 수령액에 반영돼요.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>납부예외</strong></p>
        <p style={{ ...body, marginBottom: 0 }}>보험료 0원. 하지만 가입기간 미인정. 연금 수령액이 줄어들 수 있어요.</p>
      </GreenBox>

      <p style={body}>
        실업크레딧은 2016년 8월부터 시행된 제도예요.
        <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>에서 운영하고, 생애 최대 12개월까지 지원받을 수 있어요.
      </p>

      <Divider />

      <H2>실업크레딧 받을 수 있는 조건</H2>
      <p style={body}>
        구직급여를 받는 중이고 일정 조건을 충족하면 신청할 수 있어요.
        아래 항목을 전부 체크해보세요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="실업크레딧 신청 자격이 돼요. 고용센터에서 바로 신청하세요." partialMatchText="일부 조건이 맞지 않을 수 있어요. 국민연금공단(1355)에 전화해서 확인하세요." />

      <Divider />

      <H2>실업크레딧 신청 방법</H2>
      <p style={body}>
        가장 간편한 방법은 고용센터에서 구직급여 신청할 때 같이 하는 거예요.
        추가 서류가 거의 없고, 신청서에 체크만 하면 돼요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>주의사항, 놓치면 탈락이에요</H2>
      <p style={body}>
        실업크레딧에는 몇 가지 중요한 주의사항이 있어요. 특히 신청 기한과 본인 부담분 납부를 놓치면 안 돼요.
      </p>

      <SectionBadge>핵심 주의사항</SectionBadge>
      <BorderBox title="꼭 기억하세요">
        <p style={{ ...body, marginBottom: 6 }}><strong>신청 기한</strong>: 구직급여 종료일이 속하는 달의 다음 달 15일까지 (기한 넘기면 신청 불가)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>본인 부담분</strong>: 25%를 꼭 납부해야 해요. 안 내면 그 달은 가입기간 미인정</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>최대 한도</strong>: 생애 12개월 (여러 번 실직해도 합산 12개월 초과 불가)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>납부예외 중복</strong>: 이미 납부예외 중이면 취소 후 실업크레딧으로 변경해야 해요</p>
      </BorderBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민연금공단과 정부24 자료를 바탕으로 작성했어요. 개인 상황에 따라 자격 여부가 달라질 수 있으니 국민연금공단(1355)에 확인하세요." />
    </ArticleLayout>
  );
}
