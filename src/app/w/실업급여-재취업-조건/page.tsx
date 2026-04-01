"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여 받다가 빨리 취업했는데, 남은 급여를 날리는 건 아닌지 확인하려는 상황
// Q2. 조기재취업수당 조건을 확인하고 12개월 근무 후 고용24에서 신청한다
// Q3. 소정급여일수 1/2 이상 남기고 재취업, 12개월 이상 근무, 지급액 계산법(남은일수×일액×50%)
// Q4. GreenBox(조건 요약) + BorderBox(계산 예시) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "12개월 이상 계속 근무하세요",
    desc: "재취업한 날부터 12개월 이상 같은 직장에서 일해야 해요. 11개월 29일에 퇴사하면 수당을 못 받아요. 자영업이면 사업자등록 후 12개월 이상 사업을 영위하면 돼요.",
    tip: "하루 차이로 수백만원을 놓칠 수 있으니 12개월은 꼭 채우세요",
  },
  {
    title: "고용24에서 조기재취업수당을 신청하세요",
    desc: "12개월 근무를 채운 뒤 고용24(ei.go.kr)에서 온라인으로 신청해요. 관할 고용센터 방문 신청도 가능하고요. 재직증명서와 신분증이 필요해요.",
    tip: "4대보험 가입 이력으로 자동 확인되는 경우가 많아요",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "12개월 근무 완료 후 12개월 이내에 신청하세요",
    desc: "신청 기한이 있어요. 12개월 근무 완료 시점으로부터 12개월 이내에 신청해야 해요. 이 기한을 넘기면 청구권이 소멸돼요.",
    tip: "예: 2026년 3월 재취업 → 2027년 3월 12개월 완료 → 2028년 3월까지 신청",
  },
];

const CHECKLIST = [
  "소정급여일수의 1/2 이상 남기고 재취업했는지 확인",
  "이전 사업주와 관련 없는 새 직장인지 확인",
  "실업 신고일로부터 14일 이후에 취업했는지 확인",
  "최근 2년 내 조기재취업수당을 받은 적 없는지 확인",
  "12개월 이상 계속 근무 완료 여부 확인",
];

const FAQS = [
  {
    q: "조기재취업수당 받으면 다음 실업급여에 불이익 있나요?",
    a: "없어요. 조기재취업수당을 받아도 다음에 퇴사했을 때 피보험기간만 새로 충족하면 실업급여를 또 받을 수 있어요.",
  },
  {
    q: "자영업 시작해도 조기재취업수당 받을 수 있나요?",
    a: "네, 사업자등록 후 12개월 이상 계속 사업을 영위하면 받을 수 있어요. 다만 실업급여 신청 전부터 준비하던 사업이면 제외돼요.",
  },
  {
    q: "소정급여일수가 뭔가요?",
    a: "나이와 고용보험 가입기간에 따라 정해지는 실업급여 지급일수예요. 최소 120일에서 최대 270일까지 있어요. 고용24에서 본인 일수를 조회할 수 있어요.",
  },
  {
    q: "실업급여 받다가 이전 회사에 다시 들어가면?",
    a: "이전 사업주에게 재고용되면 조기재취업수당을 못 받아요. 관련 회사(계열사 포함)에 취업한 경우도 마찬가지예요.",
  },
  {
    q: "대기기간(14일) 내에 취업하면 어떻게 되나요?",
    a: "실업 신고일로부터 14일 이내에 취업하면 조기재취업수당 대상이 아니에요. 대기기간이 지난 후 취업해야 돼요.",
  },
];

const SOURCES = [
  { name: "고용보험법 제64조", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=3&cciNo=1&cnpClsNo=1" },
];

const RELATED = [
  { slug: "실업급여-자격", title: "실업급여 수급자격 조건", description: "180일 가입·비자발적 퇴사·구직의사 3가지 필수." },
  { slug: "실업급여-연장", title: "실업급여 연장급여 3종류", description: "기본 급여 끝나도 최대 60일 더 받는 법." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산법", description: "평균임금의 60%, 상한·하한 기준 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받다가 빨리 취업했다면?<br />
        조기재취업수당 조건과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받는 중에 취업하면 남은 급여를 그냥 날리는 걸까요?
      </p>
      <p style={body}>
        아니에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에 따라
        소정급여일수의 절반 이상을 남기고 재취업하면 <strong>남은 급여의 50%를 한꺼번에</strong> 받을 수 있어요.
        빨리 취업할수록 받는 금액이 커지는 구조예요. 12개월 근무 조건만 채우면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>조기재취업수당 받으려면 이 조건이에요</H2>
      <p style={body}>
        네 가지 조건을 모두 충족해야 수당을 받을 수 있어요.
      </p>

      <SectionBadge>수당 지급 조건</SectionBadge>
      <GreenBox title="조기재취업수당 4가지 조건">
        <p><strong>① 남은 급여일수</strong> — 소정급여일수의 1/2 이상 남기고 재취업</p>
        <p><strong>② 12개월 계속 근무</strong> — 재취업 후 12개월 이상 같은 직장에서 근무</p>
        <p><strong>③ 새로운 사업주</strong> — 이전 사업주와 관련 없는 회사</p>
        <p><strong>④ 수급자격 인정 상태</strong> — 실업급여 수급자격이 인정된 상태</p>
      </GreenBox>
      <p style={body}>
        빨리 취업할수록 남은 급여일수가 많으니까 받는 금액도 커져요.
        반대로 급여일수를 절반 이상 소진한 뒤에 취업하면 수당 자격 자체가 없어요.
      </p>

      <Divider />

      <H2>수당 얼마나 받는지 계산해 볼게요</H2>
      <p style={body}>
        공식은 간단해요. <strong>남은 소정급여일수 x 구직급여일액 x 1/2</strong>이에요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox>
        <p><strong>사례: 소정급여일수 210일, 구직급여일액 68,000원</strong></p>
        <p>60일째 재취업 → 남은 150일 x 68,000원 x 50% = <strong>약 510만원</strong></p>
        <p>100일째 재취업 → 남은 110일 x 68,000원 x 50% = <strong>약 374만원</strong></p>
        <p>40일 차이인데 136만원이나 달라요. 빨리 취업할수록 유리한 구조예요.</p>
      </BorderBox>
      <p style={body}>
        소정급여일수의 1/2 미만만 남은 상태에서 취업하면 대상이 아니에요.
        210일 기준으로 106일째 이후에 취업하면 남은 일수가 104일(1/2인 105일 미만)이라 수당을 못 받아요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청 전에 체크하세요</H2>
      <p style={body}>
        조기재취업수당은 빠뜨리기 쉬운 조건이 몇 가지 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        재취업하자마자 신청하는 게 아니에요. <strong>12개월 근무를 채운 뒤에</strong> 신청해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />
      <p style={body}>
        내 소정급여일수가 몇 일인지 모르겠다면 <a href="/w/실업급여-자격" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 수급자격</a> 글에서
        나이·가입기간별 기준표를 확인할 수 있어요.
      </p>

      <Divider />

      <CategoryButton label="고용" count={8} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성했어요. 개인 상황에 따라 결과가 다를 수 있으니 관할 고용센터에서 최종 확인하세요." />
    </ArticleLayout>
  );
}
