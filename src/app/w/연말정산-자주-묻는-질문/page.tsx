"use client";
// Q1. 연말정산 시즌에 기간, 환급금, 부양가족 등 기본적인 것들이 매년 헷갈리는 직장인
// Q2. 자주 묻는 질문 10가지를 확인하고 연말정산 서류를 회사에 제출한다
// Q3. 일정(1월 15일~2월), 환급금 계산, 부양가족 요건, 맞벌이 전략, 누락 시 대응법
// Q4. FAQ(핵심 10가지) + GreenBox(일정 요약) + Steps(놓쳤을 때 대응) + Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const MISSED_STEPS = [
  {
    title: "회사에 추가 제출이 가능한지 먼저 문의하세요",
    desc: "2월 말까지는 회사에서 수정 접수를 받는 경우가 많아요. 놓친 영수증이나 공제 항목이 있으면 인사팀에 바로 문의하세요.",
  },
  {
    title: "5월 종합소득세 신고로 직접 하세요",
    desc: "회사에서 이미 마감했다면 5월에 홈택스(hometax.go.kr)에서 종합소득세 신고를 통해 공제를 적용할 수 있어요. 근로소득자도 종소세 신고로 환급받을 수 있어요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "5년 이내라면 경정청구로 돌려받으세요",
    desc: "과거 연말정산에서 놓친 공제가 있다면 5년 이내에 경정청구를 할 수 있어요. 홈택스에서 온라인으로 신청하면 1~2개월 내에 환급금이 입금돼요.",
  },
];

const CHECK_ITEMS = [
  "부양가족 중복 주의 / 부부가 같은 자녀를 각자 공제하면 가산세",
  "간소화 자료 누락 확인 / 안경 구입비, 월세, 일부 기부금은 수동 제출",
  "영수증 5년 보관 / 경정청구나 세무조사 대비",
  "공제 한도 확인 / 항목마다 한도가 달라서 전략적 사용 필요",
  "중도퇴사자는 5월 종소세 신고 필수 / 전 직장 원천징수영수증 확보",
];

const FAQS = [
  {
    q: "연말정산 간소화서비스는 언제 열리나요?",
    a: "매년 1월 15일에 열려요. 홈택스에 로그인하면 카드 사용액, 의료비, 교육비, 보험료 등이 자동으로 조회돼요. 1월 20일 이후에 접속하면 데이터가 더 완전해져요.",
  },
  {
    q: "환급금은 언제 통장에 들어오나요?",
    a: "보통 2~3월 급여와 함께 입금돼요. 회사마다 정산 시기가 다르지만 대부분 2월 말~3월 중에 처리돼요. 추가 납부 금액도 같은 시기에 급여에서 차감돼요.",
  },
  {
    q: "맞벌이 부부는 어떻게 나눠야 유리한가요?",
    a: "인적공제(부모·자녀)는 소득 높은 쪽이, 의료비 공제는 소득 낮은 쪽이 유리해요. 의료비는 총급여의 3%를 넘어야 공제가 시작되는데, 소득이 낮으면 3% 기준을 넘기기 쉬워요. 신용카드는 각자 사용분 각자 공제예요.",
  },
  {
    q: "신용카드와 체크카드, 뭘 써야 유리하나요?",
    a: "총급여의 25%까지는 어떤 카드를 쓰든 상관없어요. 25%를 넘긴 후부터 공제가 시작되는데, 신용카드는 15%, 체크카드·현금은 30% 공제율이에요. 연초에 신용카드로 25%를 채우고 그 이후에 체크카드를 쓰면 유리해요.",
  },
  {
    q: "프리랜서도 연말정산을 하나요?",
    a: "프리랜서(3.3% 원천징수)는 연말정산 대상이 아니에요. 5월 종합소득세 신고를 직접 해야 해요. 근로소득과 사업소득이 동시에 있으면 합산 신고해야 해요.",
  },
  {
    q: "환급금이 최대 얼마까지 나오나요?",
    a: "기납부세액(1년간 원천징수된 세금 합계)이 한도예요. 결정세액이 0원이면 기납부세액 전액을 돌려받아요. 기납부세액이 240만원이고 결정세액이 0원이면 환급금은 240만원이에요.",
  },
  {
    q: "연말정산을 아예 안 하면 어떻게 되나요?",
    a: "공제를 적용받지 못해서 세금을 더 내는 결과가 돼요. 하지만 5월 종소세 신고로 직접 할 수 있고, 5년 이내라면 경정청구로 돌려받을 수 있어요. 영원히 못 받는 건 아니에요.",
  },
];

const RELATED = [
  { slug: "연말정산-기본공제-대상", title: "기본공제 대상과 요건", description: "1인당 150만원 소득공제 요건 정리." },
  { slug: "연말정산-결정세액", title: "결정세액 계산 방법", description: "산출세액 - 세액공제 = 결정세액." },
  { slug: "연말정산-의료비-공제-한도", title: "의료비 공제 한도", description: "총급여 3% 초과분부터 15% 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 질문 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산, 매년 헷갈리는 질문 7가지<br />
        일정부터 환급금까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "간소화서비스 언제 열려요? 환급금 언제 들어와요? 부양가족 조건이 뭐예요?"
      </p>
      <p style={body}>
        매년 1~2월이면 같은 질문이 반복돼요. 한 번만 읽어두면 내년에도 헤매지 않을 거예요.
        2025년 귀속(2026년 신고) 기준으로 정리했어요.
      </p>

      <Divider />

      <H2>연말정산 일정, 이것만 기억하세요</H2>
      <p style={body}>
        핵심 날짜 3개만 알면 돼요. 간소화서비스 오픈일, 회사 제출 기한, 환급금 입금 시기예요.
      </p>

      <GreenBox>
        연말정산 주요 일정{"\n"}
        · 1월 15일: 간소화서비스 오픈 (홈택스){"\n"}
        · 1월 15일 ~ 2월: 자료 다운로드 + 회사 제출{"\n"}
        · 2~3월: 환급금 급여에 포함 입금
      </GreenBox>

      <p style={body}>
        회사마다 제출 기한이 달라요. 보통 1월 말~2월 초에 마감하니까 인사팀 공지를 꼭 챙겨보세요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화서비스는 1월 20일 이후에 접속하면 데이터가 더 정확해요.
      </p>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연말정산 자주 묻는 질문이에요</H2>
      <p style={body}>
        매년 가장 많이 들어오는 질문 7가지를 정리했어요. <a href="/w/연말정산-기본공제-대상" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본공제 상세 요건</a>이나 <a href="/w/연말정산-결정세액" style={{ color: "#1D9E75", textDecoration: "underline" }}>결정세액 계산법</a>은 각 글에서 깊이 있게 다뤄요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <H2>공제를 놓쳤을 때 이렇게 하세요</H2>
      <p style={body}>
        연말정산 기한을 놓쳤다고 끝이 아니에요. 3가지 방법으로 돌려받을 수 있어요.
      </p>

      <Steps steps={MISSED_STEPS} />

      <Divider />

      <H2>놓치기 쉬운 체크포인트예요</H2>
      <p style={body}>
        매년 같은 실수가 반복돼요. 아래 항목을 체크하면 실수를 줄일 수 있어요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.nts.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세청</a>
        <a href="https://www.hometax.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>홈택스</a>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>소득세법</a>
      </div>

      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 기준으로 작성됐어요. 세법 개정에 따라 공제 한도나 일정이 달라질 수 있어요." />
    </ArticleLayout>
  );
}
