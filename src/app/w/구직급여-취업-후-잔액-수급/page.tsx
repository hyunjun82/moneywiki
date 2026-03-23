"use client";

// Q1. 구직급여 받다가 취업했는데 "남은 금액 못 받나?" 궁금한 상황
// Q2. 조기재취업수당 조건 확인 후 12개월 근무 뒤 고용센터에 신청
// Q3. 수급일수 절반 이상 남겨야, 12개월 이상 근속, 대기기간 후 취업, 신청 기한 24개월
// Q4. GreenBox(결론) + EligibilityChecker(조건) + Steps(신청) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "소정급여일수의 절반 이상 남기고 취업했어요" },
  { id: "c2", label: "새 직장에서 12개월 이상 계속 일했어요" },
  { id: "c3", label: "새 직장에서 고용보험에 가입됐어요" },
  { id: "c4", label: "실업신고 후 7일 대기기간이 지난 뒤 취업했어요" },
  { id: "c5", label: "이전 직장 사업주나 관련 사업주에게 재고용된 게 아니에요" },
];

const STEPS = [
  {
    title: "12개월 이상 계속 근무",
    desc: "새 직장에서 고용보험 가입 상태로 12개월 이상 일해야 해요. 중간에 퇴사하면 자격이 없어지죠.",
  },
  {
    title: "조기재취업수당 신청서 작성",
    desc: "고용24(work24.go.kr) 또는 관할 고용센터에서 신청서를 받아요.",
    link: { label: "고용24 바로가기", href: "https://www.work24.go.kr" },
  },
  {
    title: "서류 제출",
    desc: "재직증명서, 고용보험 가입 확인서를 함께 제출해요. 온라인 신청도 가능하죠.",
  },
  {
    title: "심사 후 일시금 지급",
    desc: "심사가 끝나면 남은 수급일수의 50%에 해당하는 금액을 한 번에 받아요. 보통 2~3주면 입금돼요.",
  },
];

const FAQS = [
  { q: "구직급여 180일 중 60일 받고 취업했어요. 얼마 받나요?", a: "남은 120일의 50%인 60일분을 한꺼번에 받아요. 하루 구직급여일액이 6만원이면 60일 x 6만원 = 360만원이에요." },
  { q: "아르바이트로 취업해도 받을 수 있나요?", a: "주 15시간 이상 근무하고 고용보험에 가입돼야 해요. 가입 안 되는 초단시간 아르바이트는 대상이 아니에요." },
  { q: "자영업을 시작해도 받나요?", a: "네. 사업자등록을 하고 12개월 이상 영업하면 조기재취업수당을 받을 수 있어요." },
  { q: "12개월 근무 후 바로 안 신청하면 어떻게 되나요?", a: "취업일로부터 24개월 이내에 신청해야 해요. 24개월이 지나면 소멸돼서 못 받아요." },
  { q: "새 직장에서 퇴사하면 수당을 돌려줘야 하나요?", a: "12개월 근무 후에 받는 거라서 이미 지급된 수당은 돌려줄 필요 없어요. 12개월 채우기 전에 퇴사하면 애초에 못 받는 거죠." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 제64조(조기재취업 수당)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 조기재취업수당 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "자발적-퇴사-구직급여", title: "자발적 퇴사 구직급여", description: "자발적으로 퇴사해도 구직급여를 받을 수 있는 예외 사유예요." },
  { slug: "실업인정-신청", title: "실업인정 신청", description: "구직급여를 계속 받으려면 4주마다 실업인정을 받아야 해요." },
  { slug: "구직급여-연장", title: "구직급여 연장", description: "수급 기간이 끝나도 취업이 안 됐을 때 연장받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 실업급여 · 재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직급여 받다가 취업하면 남은 돈은?<br />
        조기재취업수당 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구직급여 6개월 중 2개월만 받고 좋은 일자리가 생겼어요. 남은 4개월치는 그냥 사라지는 걸까요?
        아니에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에 따라
        남은 수급일수의 절반을 조기재취업수당으로 한 번에 받을 수 있어요.
        단, 조건이 몇 가지 있으니 미리 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>조기재취업수당, 핵심 정리</H2>
      <p style={body}>
        빨리 취업할수록 더 많이 남기니까 더 유리해요. 정부가 빠른 재취업을 유도하려고 만든 제도예요.
      </p>

      <GreenBox>
        <strong>지급 금액</strong>: 구직급여일액 x 남은 수급일수의 50%<br />
        <strong>지급 방식</strong>: 12개월 근무 확인 후 일시금으로 지급<br />
        <strong>신청 기한</strong>: 취업일로부터 24개월 이내<br /><br />
        예시: 소정급여일수 180일, 60일 수급 후 취업 → 남은 120일의 50% = 60일분 일시금
      </GreenBox>

      <H2>내가 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        5가지 조건을 모두 충족해야 해요. 하나라도 안 맞으면 수당을 못 받아요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="조건을 모두 충족했어요. 12개월 근무 후 고용센터에 신청하세요."
        partialMatchText="충족하지 못한 조건이 있어요. 해당 항목을 확인해보세요."
      />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        취업하자마자 신청하는 게 아니에요. 12개월 이상 근무한 뒤에 신청해야 해요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 고용보험법 기준으로 작성됐어요. 제도 내용은 법 개정에 따라 변경될 수 있으니 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
