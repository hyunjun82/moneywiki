"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 연말정산 결과 발표 후 환급금 얼마인지, 언제 받는지 궁금한 직장인
// Q2: 홈택스에서 환급금 확인하고 2월 급여일에 받기
// Q3: 미리보기 vs 확정조회 차이, 국세+지방소득세 타이밍, 추가납부 케이스
// Q4: Steps + BorderBox + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_CHECK = [
  {
    title: "홈택스 → 장려금·연말정산·기부금 메뉴 접속",
    desc: "홈택스(hometax.go.kr)에 로그인해요. 상단 메뉴에서 '장려금·연말정산·기부금'을 클릭하고 '편리한 연말정산'으로 들어가요. 공동인증서나 간편인증으로 로그인해야 해요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "연말정산 미리보기 또는 지급명세서 확인",
    desc: "1~2월에는 '연말정산 미리보기'에서 예상 환급금을 확인할 수 있어요. 회사가 연말정산 신고를 완료하면 '근로소득 지급명세서'에서 확정된 환급금·추가납부 금액이 보여요. 미리보기는 참고용이고 지급명세서가 최종 금액이에요.",
    tip: "손택스 앱에서도 동일하게 확인 가능해요",
  },
  {
    title: "회사 급여 담당자에게 지급일 확인",
    desc: "환급금은 회사가 정산해서 급여와 함께 지급해요. 보통 2월 급여일에 반영돼요. 회사마다 처리 일정이 달라서 2월 말~3월 초에 받는 경우도 있어요. 정확한 날짜는 급여 담당자에게 확인하는 게 빨라요.",
    tip: "추가납부가 있다면 환급금과 반대로 2월 급여에서 차감돼요",
  },
  {
    title: "지방소득세 별도 환급 확인",
    desc: "연말정산 환급금은 국세(소득세)와 지방소득세로 나뉘어요. 대부분 회사에서 한 번에 처리하지만, 지방소득세가 따로 환급되는 경우도 있어요. 환급금이 예상보다 적다면 지방소득세 부분이 별도 처리 중일 수 있어요.",
  },
];

const CHECKLIST = [
  "홈택스 지급명세서: 환급금 또는 추가납부 금액 확인",
  "2월 급여일: 환급금 또는 추가납부 반영 여부 체크",
  "공제 항목 누락: 홈택스 연말정산 간소화 서비스에서 재확인",
  "월세 세액공제: 총급여 8,000만 원 이하 무주택자, 15~17% 공제",
  "의료비·교육비: 자동 조회 안 된 항목 직접 입력했는지 확인",
  "경정청구: 공제 누락 발견 시 5년 내 환급 신청 가능 (홈택스 경정청구 메뉴)",
];

const FAQS = [
  {
    q: "환급금은 언제 받나요?",
    a: "보통 2월 급여와 함께 받아요. 회사 처리 속도에 따라 2월 말~3월 초에 받는 경우도 있어요. 정확한 날짜는 회사 급여 담당자에게 문의하세요.",
  },
  {
    q: "홈택스에서 환급금을 확인하면 정확한 금액인가요?",
    a: "미리보기는 예상 금액이에요. 회사가 연말정산 신고를 완료한 후 지급명세서에 표시되는 금액이 확정 금액이에요. 지급명세서는 3월 이후에 조회 가능해요.",
  },
  {
    q: "환급 대신 세금을 더 내야 하는 경우는 언제인가요?",
    a: "작년보다 소득이 늘었거나 공제 항목이 줄었을 때, 또는 원천징수 세율 조정을 안 했을 때 추가납부가 발생해요. 추가납부액도 2월 급여에서 차감돼요.",
  },
  {
    q: "공제 항목을 빠뜨린 걸 나중에 발견했어요. 환급받을 수 있나요?",
    a: "5년 안에 홈택스에서 경정청구를 하면 돼요. 홈택스 → 신고/납부 → 경정청구 메뉴에서 신청하면 빠뜨린 공제 항목에 대한 환급을 받을 수 있어요.",
  },
  {
    q: "연말정산 환급금과 종합소득세 환급은 다른 건가요?",
    a: "네, 달라요. 연말정산은 근로소득자가 회사를 통해 처리하는 정산이에요. 종합소득세 환급은 프리랜서·사업소득자 등이 5월에 직접 신고하는 별개 절차예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제137조: 근로소득세액의 연말정산", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제45조: 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급금-늘리는방법", title: "연말정산 환급금 늘리는 방법", description: "신용카드·월세·의료비 공제 전략으로 환급금 최대화하는 방법이에요." },
  { slug: "월세-세액공제", title: "월세 세액공제 조건과 신청 방법", description: "총급여 8,000만 원 이하 무주택자라면 월세의 15~17%를 돌려받아요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "회사가 직원 급여에서 세금을 떼는 원천징수 신고 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 환급금 조회 방법 2026<br />
        홈택스에서 확인하고 2월 급여 때 받아요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 결과가 궁금하죠? 환급금은 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제137조</a>에 따라 근로소득 정산 후 기납부세액과 결정세액의 차액으로 계산돼요.
        홈택스에서 예상 금액을 미리 확인할 수 있고, 확정 금액은 회사가 신고 완료 후 지급명세서에서 볼 수 있어요. 보통 2월 급여와 함께 환급이나 추가납부가 처리돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>환급금 원리, 왜 돌려받기도 하고 더 내기도 하나요?</H2>
      <p style={body}>
        매달 월급에서 떼는 소득세는 대략적인 금액이에요. 정확한 세금은 한 해가 끝난 후 연말정산으로 계산해요.
        미리 낸 세금(기납부세액)이 실제 세금(결정세액)보다 많으면 환급, 적으면 추가납부예요.
      </p>

      <BorderBox>
        <strong>환급 케이스</strong>: 기납부세액 &gt; 결정세액 → 차액 돌려받음<br />
        <strong>추가납부 케이스</strong>: 기납부세액 &lt; 결정세액 → 차액 더 냄<br />
        <strong>환급 시기</strong>: 보통 2월 급여일 (회사마다 다름)<br />
        <strong>지방소득세</strong>: 국세 환급 후 별도 또는 함께 처리
      </BorderBox>

      <GreenBox>
        환급금이 클수록 미리 낸 세금이 많다는 뜻이에요.<br />
        환급이 없거나 적다면 공제 항목 누락이 없는지 확인하세요.
      </GreenBox>

      <Divider />

      <H2>환급금 확인하는 방법 4단계</H2>
      <p style={body}>
        홈택스 로그인 → 연말정산 메뉴 → 지급명세서 순서로 확인해요. 미리보기는 예상치라 실제 금액과 차이가 날 수 있어요.
      </p>

      <Steps steps={STEPS_CHECK} />

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>환급금 놓치지 않는 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공제 항목 빠뜨리면 환급금이 줄어요. 특히 월세 세액공제와 의료비는 자동으로 안 잡히는 경우가 많아요.
      </p>
      <SectionBadge>확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        연말정산 환급 관련해서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 기준은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
