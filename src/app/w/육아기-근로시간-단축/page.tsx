"use client";
// Q1. 육아휴직 대신 근무시간만 줄이면서 일하고 싶은데, 급여가 얼마나 되고 어떻게 신청하는지 궁금해요.
// Q2. 본인이 신청 대상인지 확인하고, 회사에 30일 전 서면 신청 → 고용센터에 급여 신청하는 행동.
// Q3. 2026년 상한액(250만/160만), 대상(만 8세 이하), 급여 계산법, 사용기간 2년+전환, 신청 절차, 거부 시 대응.
// Q4. GreenBox(2026 인상 핵심) + Calculator식 예시(BorderBox) + EligibilityChecker + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { Steps } from "@/components/article-ui/Steps";

const ELIGIBILITY_ITEMS = [
  { id: "child", label: "만 8세 이하 또는 초등학교 2학년 이하 자녀가 있어요" },
  { id: "insurance", label: "고용보험 피보험기간 180일 이상이에요" },
  { id: "tenure", label: "해당 사업장에서 6개월 이상 근무했어요" },
  { id: "hours", label: "주 15~35시간으로 단축 근무를 원해요" },
];

const STEPS = [
  { title: "30일 전 서면 신청", desc: "단축근무 시작 30일 전에 회사에 서면으로 신청해요.", tip: "회사는 정당한 사유 없이 거부할 수 없어요" },
  { title: "근무 시간 조정", desc: "주 15~35시간 범위에서 단축 시간을 정해요. 최소 3개월 이상 사용해야 해요." },
  { title: "고용센터에 급여 신청", desc: "단축근무 시작 후 관할 고용센터에 급여를 신청해요. 고용보험 홈페이지에서 온라인 신청도 가능해요." },
  { title: "급여 수령", desc: "매월 단축급여가 입금돼요. 회사 급여와 별도로 고용보험에서 지급해요." },
];

const FAQS = [
  { q: "2026년에 급여 상한액이 얼마나 올랐나요?", a: "매주 10시간 단축분 상한액이 월 220만원에서 250만원으로, 나머지 단축분은 150만원에서 160만원으로 올랐어요." },
  { q: "육아휴직 안 쓴 기간을 단축근무로 바꿀 수 있나요?", a: "네. 육아휴직 미사용 기간을 2배로 전환할 수 있어요. 예를 들어 육아휴직 6개월 남으면 단축근무 12개월로 바꿀 수 있어요." },
  { q: "회사에서 거부하면 어떻게 하나요?", a: "정당한 사유 없이 거부하면 법 위반이에요. 고용노동부 1350에 신고하면 과태료가 부과돼요." },
  { q: "분할 사용이 가능한가요?", a: "네. 횟수 제한 없이 분할 사용 가능해요. 다만 1회 사용 시 최소 3개월은 써야 해요." },
  { q: "급여가 얼마나 줄어드나요?", a: "크게 안 줄어요. 예를 들어 월급 300만원에서 주 25시간으로 단축하면, 회사 급여 187.5만원 + 단축급여 105만원 = 총 292.5만원을 받아요." },
  { q: "배우자가 이미 육아휴직 중이면 신청 가능한가요?", a: "같은 자녀에 대해 배우자가 육아휴직 중이면 회사가 거부할 수 있어요. 단, 서로 다른 자녀면 동시 신청 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용보험 육아기 근로시간 단축 급여", url: "https://www.ei.go.kr" },
    { label: "고용노동부 육아지원제도", url: "https://www.moel.go.kr" },
    { label: "남녀고용평등법 제19조의2", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
  ]},
];

const RELATED = [
  { slug: "육아휴직급여", title: "육아휴직급여 가이드", description: "육아휴직 급여 계산법과 신청 방법이에요." },
  { slug: "2026년-육아휴직급여", title: "2026년 육아휴직급여 변경사항", description: "올해 달라진 육아휴직 급여 상한액을 확인하세요." },
  { slug: "유연근무제-종류-신청-방법", title: "유연근무제 종류와 신청", description: "시차출퇴근·재택근무 등 유연근무 유형을 비교해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 육아 · 단축근무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아기 근로시간 단축, 급여는 얼마?<br />
        2026년 상한액 인상과 신청 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직은 완전히 쉬는 거라 커리어 단절이 걱정되죠?
        근무시간만 줄이면서 일도 계속하고 급여도 보전받을 수 있어요.
        2026년에 급여 상한액이 올라서 소득 감소 부담이 더 줄었어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 급여 상한액, 어떻게 바뀌었나요?</H2>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험</a>에서 지급하는
        육아기 근로시간 단축 급여 상한액이 인상됐어요.
      </p>

      <GreenBox>
        2026년 인상 내용이에요.<br />
        · 최초 주 10시간 단축분: 통상임금 100%, 상한 <strong>월 250만원</strong> (2025년 220만원)<br />
        · 나머지 단축분: 통상임금 80%, 상한 <strong>월 160만원</strong> (2025년 150만원)<br />
        · 사용 기간: 자녀 1명당 최대 <strong>2년</strong> (분할 사용 가능)
      </GreenBox>

      <p style={body}>
        처음 10시간은 통상임금 100%를 보전해주니까 급여 손해 없이 줄일 수 있어요.
        고소득자도 부담 없이 단축근무를 선택할 수 있도록 상한액을 올린 거예요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>급여는 구체적으로 얼마 받나요?</H2>
      <p style={body}>
        급여는 두 구간으로 나눠서 계산해요. 아래 예시로 확인해보세요.
      </p>

      <SectionBadge>급여 계산 예시</SectionBadge>
      <BorderBox>
        <strong>월급 300만원, 주 40시간 → 주 25시간 단축 (15시간 감소)</strong><br /><br />
        ① 최초 10시간: 300만 × (10÷40) × 100% = <strong>75만원</strong><br />
        ② 나머지 5시간: 300만 × (5÷40) × 80% = <strong>30만원</strong><br />
        → 단축급여 합계: <strong>105만원</strong><br /><br />
        ③ 회사 급여: 300만 × (25÷40) = <strong>187.5만원</strong><br />
        → 총 수령액: 105 + 187.5 = <strong>292.5만원</strong> (원래 300만원 대비 7.5만원만 감소)
      </BorderBox>

      <Divider />

      <H2>신청 대상인지 확인해봐요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 제19조의2</a>에 따른
        신청 조건이에요. 아래 항목에 모두 해당하면 신청할 수 있어요.
      </p>

      <SectionBadge>자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="육아기 근로시간 단축 신청 대상이에요! 회사에 30일 전 서면으로 신청하세요."
        partialMatchText="일부 조건이 안 맞을 수 있어요. 고용노동부 1350으로 문의해보세요."
      />

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        회사에 먼저 신청하고, 단축근무 시작 후 고용센터에 급여를 신청하는 순서예요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        육아휴직을 다 안 쓰고 남겨뒀다면, 미사용 기간을 단축근무로 2배 전환할 수 있어요.
        육아휴직 6개월 남았으면 단축근무 12개월로 바꿔서 기본 2년에 더해 총 3년 사용이 가능해요.
        문의는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 1350이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기준 고용보험법과 남녀고용평등법을 바탕으로 작성됐어요. 정책 변경 시 급여 상한액과 조건이 달라질 수 있으니 고용보험 공식 사이트에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
