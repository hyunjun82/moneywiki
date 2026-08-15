"use client";
// Q1. 기본 실업급여 기간이 끝나가는데 아직 취업 못 한 사람이 추가 급여가 있는지 찾는 상황
// Q2. 자신에게 해당하는 연장급여 종류를 파악하고 고용센터 또는 고용24에서 신청한다
// Q3. 3종류(훈련·개별·특별) 차이, 지급률(100%·70%), 순서 규칙, 신청 서류
// Q4. GreenBox(3종 비교) + EligibilityChecker + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "basic", label: "기본 실업급여를 받고 있거나 받은 적 있다" },
  { id: "job3", label: "고용센터 직업소개를 3회 이상 받았다" },
  { id: "family", label: "부양가족이 있다 (또는 60세 이상·장애인)" },
  { id: "income", label: "재취업이 특히 어려운 상황이다" },
];

const STEPS = [
  {
    title: "기본 실업급여 종료 전 고용센터에 문의하세요",
    desc: "기본 급여가 끝나기 2~4주 전에 관할 고용센터에 연락해서 연장급여 대상인지 상담받아요. 상담사가 본인 상황에 맞는 연장급여 종류를 안내해줘요.",
    tip: "고용24(ei.go.kr)에서 온라인 상담도 가능",
  },
  {
    title: "필요 서류를 준비하세요",
    desc: "신분증, 통장 사본은 기본이고, 개별연장은 가족관계증명서와 건강보험증 사본이 필요해요. 훈련연장은 훈련 지시서와 수강 증빙을 고용센터에서 받을 수 있어요.",
    tip: "온라인 신청 시 공동인증서 또는 간편인증 필요",
  },
  {
    title: "고용24 또는 고용센터에서 신청하세요",
    desc: "고용24(ei.go.kr)에 로그인 후 '연장급여 신청' 메뉴를 찾으면 돼요. 고용센터 방문 신청도 가능하고요. 특별연장급여는 공고 기간 동안만 신청할 수 있으니 기한을 꼭 체크하세요.",
    tip: "특별연장은 정부 공고 기간에만 신청 가능",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
];

const FAQS = [
  {
    q: "실업급여 기간 다 써도 더 받을 수 있나요?",
    a: "네, 가능해요. 훈련연장(최대 2년), 개별연장(60일), 특별연장(60일) 세 가지가 있고, 조건에 맞으면 순서대로 신청할 수 있어요.",
  },
  {
    q: "세 가지 연장급여를 다 받을 수 있나요?",
    a: "조건만 충족하면 순서대로 다 받을 수 있어요. 훈련연장 → 개별연장 → 특별연장 순서이고, 동시에 두 가지를 받을 수는 없어요.",
  },
  {
    q: "개별연장급여 금액이 기본보다 적나요?",
    a: "네, 기본 실업급여일액의 70%만 받아요. 기본이 하루 6만원이라면 개별연장은 42,000원이에요. 훈련연장은 100% 그대로 받고요.",
  },
  {
    q: "특별연장급여는 아무 때나 신청할 수 있나요?",
    a: "아니에요. 경제 위기 등으로 고용노동부가 공고한 기간에만 신청 가능해요. 고용24나 고용센터 공지사항을 수시로 확인해야 해요.",
  },
  {
    q: "훈련연장급여 받으려면 어떤 훈련을 받아야 하나요?",
    a: "아무 훈련이 아니라 고용센터에서 '훈련 지시'를 받은 경우만 돼요. 상담사가 재취업에 필요하다고 판단한 훈련 과정이어야 해요.",
  },
  {
    q: "부양가족이 없으면 개별연장급여를 못 받나요?",
    a: "원칙적으로 부양가족이 있어야 하지만, 60세 이상이거나 장애인이면 부양가족 없이도 신청할 수 있어요.",
  },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=4&cnpClsNo=2" },
];

const RELATED = [
  { slug: "실업급여-자격", title: "실업급여 수급자격 조건", description: "180일 가입·비자발적 퇴사·구직의사 3가지 필수 조건." },
  { slug: "실업급여-재취업-조건", title: "실업급여 조기재취업수당", description: "빨리 취업하면 남은 급여의 50%를 한번에 받아요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산법", description: "평균임금의 60%, 상한·하한 기준 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 연장급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 기간 끝났는데 아직 취업 못 했다면?<br />
        연장급여 3종류와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기본 실업급여 기간이 끝나가는데 일자리가 안 잡히면 막막하죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        훈련연장(최대 2년), 개별연장(60일), 특별연장(60일) 세 가지 추가 급여를 두고 있어요.
        조건에 맞으면 기본 급여 끝난 뒤에도 계속 받을 수 있어요.
        아래에서 각 연장급여 차이와 신청 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연장급여 3종류, 뭐가 다른가요?</H2>
      <p style={body}>
        연장급여는 세 종류인데, 각각 조건과 지급액이 달라요. 핵심 차이를 먼저 보고 가세요.
      </p>

      <SectionBadge>연장급여 비교</SectionBadge>
      <GreenBox title="3종 연장급여 비교">
        <p><strong>훈련연장급여</strong> — 고용센터 훈련 지시를 받고 직업훈련 참여 시 | 최대 2년 | 기본급여의 <strong>100%</strong></p>
        <p><strong>개별연장급여</strong> — 취업이 특히 어렵고 부양가족 있는 경우 | 최대 60일 | 기본급여의 <strong>70%</strong></p>
        <p><strong>특별연장급여</strong> — 경제 위기로 고용노동부가 공고한 기간 | 최대 60일 | 기본급여의 <strong>70%</strong></p>
      </GreenBox>
      <p style={body}>
        세 가지는 <strong>순서가 정해져 있어요</strong>. 훈련연장 → 개별연장 → 특별연장 순서로만 받을 수 있고,
        동시에 두 가지를 받을 수는 없어요. 훈련연장이 끝나야 개별연장을 신청할 수 있는 구조죠.
      </p>

      <Divider />

      <H2>개별연장급여 받을 수 있는지 체크해 보세요</H2>
      <p style={body}>
        개별연장급여는 가장 많이 신청하는 연장급여예요.
        아래 항목을 체크해서 대상인지 확인해 보세요.
      </p>

      <SectionBadge>개별연장 자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="개별연장급여 대상일 가능성이 높아요. 고용센터에서 최종 확인을 받으세요."
        partialMatchText="일부 조건이 부족해요. 60세 이상이거나 장애인이면 부양가족 없이도 가능하니 고용센터에 상담받아 보세요."
      />
      <p style={body}>
        훈련연장급여는 위 체크 없이 <strong>고용센터에서 훈련 지시를 받으면 자동으로 대상</strong>이 돼요.
        상담할 때 "직업훈련이 필요하다"고 말씀하면 상담사가 판단해줘요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>연장급여 신청은 이렇게 해요</H2>
      <p style={body}>
        기본 실업급여가 끝나기 전에 미리 움직여야 해요.
        기한을 놓치면 신청 자체를 못 할 수 있어요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />
      <p style={body}>
        신청 후 고용센터에서 심사하는 데 보통 7~14일 걸려요.
        통과하면 기본 급여 종료일 다음 날부터 연장급여가 지급돼요.
        <a href="/w/실업급여-자격" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 수급자격</a>이 인정된 상태에서만 신청할 수 있다는 점 기억하세요.
      </p>

      <Divider />

      <H2>연장급여 받을 때 주의할 점</H2>
      <p style={body}>
        연장급여도 실업인정을 계속 받아야 해요.
        4주마다 1회 이상 구직활동 보고를 해야 급여가 나오죠.
      </p>
      <BorderBox>
        <p><strong>실업인정 유지</strong> — 연장급여 기간에도 4주마다 구직활동 보고 필수</p>
        <p><strong>동시 수급 불가</strong> — 훈련연장 받는 동안 개별·특별연장 신청 불가</p>
        <p><strong>반복 수급 제한</strong> — 최근 5년간 자주 실업급여를 받았으면 개별연장 기간이 60일 미만으로 줄 수 있어요</p>
        <p><strong>특별연장 기한</strong> — 공고 기간이 지나면 신청 불가, 고용24 공지사항 수시 확인</p>
      </BorderBox>

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
