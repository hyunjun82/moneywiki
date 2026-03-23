"use client";

// Q1. 국민연금 매달 내는데 "나중에 얼마 받을 수 있는지" 확인하고 싶은 상황
// Q2. NPS 홈페이지/앱에서 예상수령액 조회 후 부족하면 추납·임의계속가입 검토
// Q3. 조회 방법(온라인·앱·전화), 수령액 결정 요소(가입기간·소득), 늘리는 방법 3가지
// Q4. Steps(조회 절차) + GreenBox(수령액 구조) + BorderBox(늘리는 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "국민연금공단 접속",
    desc: "nps.or.kr 또는 '내 곁에 국민연금' 앱을 설치해요. PC와 모바일 둘 다 가능하죠.",
    link: { label: "국민연금공단 바로가기", href: "https://www.nps.or.kr" },
  },
  {
    title: "본인인증 로그인",
    desc: "공동인증서나 간편인증(카카오, 네이버, 토스 등)으로 로그인해요. 비회원도 간편인증이면 조회 가능하죠.",
  },
  {
    title: "'내 연금 알아보기' 클릭",
    desc: "예상 월 수령액, 수령 시작 나이, 지금까지 납부한 총액, 가입 기간을 한눈에 볼 수 있어요.",
    tip: "가입내역 조회에서 빠진 기간이 없는지도 같이 확인하세요",
  },
  {
    title: "모의계산으로 시뮬레이션",
    desc: "앞으로 몇 년 더 내면 얼마 받는지, 추납하면 얼마 늘어나는지 직접 계산해볼 수 있어요.",
    link: { label: "예상연금 모의계산", href: "https://csa.nps.or.kr" },
  },
];

const FAQS = [
  { q: "예상 수령액이 실제랑 다를 수 있나요?", a: "네. 앞으로의 납부 기간과 금액에 따라 달라지는 추정치예요. 소득이 오르거나 납부 기간이 늘면 수령액도 올라가죠." },
  { q: "가입기간 10년 미만이면 어떻게 되나요?", a: "연금으로 못 받고 일시금으로 받아요. 추납으로 10년을 채우면 매달 연금으로 받을 수 있어요." },
  { q: "비회원도 조회 가능한가요?", a: "네. 간편인증(카카오, 네이버 등)으로 본인인증하면 비회원도 바로 조회할 수 있어요." },
  { q: "수령 시기를 늦추면 더 받나요?", a: "네. 연기연금 제도로 1년 늦출 때마다 7.2%가 늘어요. 최대 5년 연기하면 36% 증액이에요." },
  { q: "전화로도 확인할 수 있나요?", a: "국민연금 콜센터(국번 없이 1355)에 전화하면 상담사가 안내해줘요." },
  { q: "이직하면서 빠진 기간은 어떻게 하나요?", a: "가입내역 조회에서 누락 기간을 확인하고, 추납 신청으로 채울 수 있어요. 추납하면 가입기간이 늘어서 수령액도 올라가죠." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민연금공단: 내 연금 알아보기", url: "https://www.nps.or.kr" },
      { label: "중앙노후준비지원센터: 예상연금 모의계산", url: "https://csa.nps.or.kr" },
      { label: "국민연금법", url: "https://www.law.go.kr/법령/국민연금법" },
    ],
  },
];

const RELATED = [
  { slug: "국민연금-추납제도", title: "국민연금 추납제도", description: "빠진 기간 보험료를 나중에 내서 가입기간을 늘리는 방법이에요." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령", description: "일찍 받으면 얼마나 깎이는지, 손익분기점은 언제인지 정리했어요." },
  { slug: "국민연금-연기연금", title: "국민연금 연기연금", description: "수령을 늦추면 7.2%씩 늘어나는 연기연금 제도예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 국민연금 · 조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 예상수령액, 5분이면 확인돼요<br />
        조회 방법과 연금 늘리는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 빠져나가는 국민연금, 나중에 얼마나 돌아올까 궁금하죠.
        <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a> 홈페이지나 앱에서 5분이면 확인할 수 있어요.
        예상 수령액이 적다면 추납이나 연기연금으로 늘릴 수 있는 방법도 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>예상수령액 확인, 이렇게 해요</H2>
      <p style={body}>
        PC든 모바일이든 간편인증만 있으면 바로 조회할 수 있어요. 비회원도 가능하죠.
      </p>

      <Steps steps={STEPS} />

      <H2>수령액은 뭘로 결정되나요?</H2>
      <p style={body}>
        오래 낼수록, 많이 낼수록 수령액이 커져요. 하지만 저소득자에게 유리한 구조예요.
      </p>

      <GreenBox>
        <strong>연금 산식</strong>: (A + B) x 계수 x 가입기간<br />
        - A = 전체 가입자 평균소득월액 (2026년 약 319만원)<br />
        - B = 본인 평균소득월액<br />
        - 계수 = 소득대체율에 따른 비율<br /><br />
        <strong>핵심</strong>: A(전체 평균)가 반영되기 때문에 소득이 낮아도 일정 수준 이상 받아요.<br />
        가입기간 10년 미만이면 연금이 아니라 일시금으로만 받을 수 있어요.
      </GreenBox>

      <H2>예상수령액이 적다면? 늘리는 방법 3가지</H2>
      <p style={body}>
        지금이라도 가입기간을 늘리거나 수령 시기를 조정하면 연금을 늘릴 수 있어요.
      </p>

      <BorderBox>
        <strong>1. 추납(추후납부)</strong><br />
        실업·경력 단절 등으로 못 낸 기간의 보험료를 나중에 내요. 가입기간이 늘어서 연금도 올라가죠.
        <a href="/w/국민연금-추납제도" style={{ color: "#1D9E75", textDecoration: "underline" }}> 추납제도 자세히 보기</a><br /><br />
        <strong>2. 임의계속가입</strong><br />
        60세 이후에도 65세까지 계속 가입할 수 있어요. 5년 더 내면 월 수령액이 10~20만원 늘어날 수 있죠.<br /><br />
        <strong>3. 연기연금</strong><br />
        수령 시기를 최대 5년 늦추면 36% 증액돼요(연 7.2%). 당장 돈이 필요 없다면 효과적이에요.
        <a href="/w/국민연금-연기연금" style={{ color: "#1D9E75", textDecoration: "underline" }}> 연기연금 자세히 보기</a>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 국민연금공단 기준으로 작성됐어요. 예상수령액은 추정치이며 향후 납부 기간과 제도 변경에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
