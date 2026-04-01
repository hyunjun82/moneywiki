"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "출퇴근 시간이 정해져 있고 지각·결근 관리를 받았어요" },
  { id: "c2", label: "업무 내용과 방법을 사용자(회사)가 직접 지시했어요" },
  { id: "c3", label: "다른 클라이언트 없이 한 곳에서만 전속적으로 일했어요" },
  { id: "c4", label: "매월 일정한 금액이 고정으로 지급됐어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 600, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "계속 근무 기간", min: 12, max: 84, step: 1, defaultValue: 24, format: (v: number) => `${Math.floor(v / 12)}년 ${v % 12}개월` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 예상 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 기준 (월 평균 수입 기준)",
    getValue: (v: Record<string, number>) => v.monthly * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "업무계약서 또는 이메일·카카오톡 계약 내용", required: true, where: "계약 시 수령 — 없으면 메시지·이메일 내역으로 대체" },
  { name: "급여 이체 내역 (매월 고정 지급 증빙)", required: true, where: "은행 앱 출력 — 6개월 이상 내역 확보 권장" },
  { name: "업무지시서·메시지 (출근 요청, 업무 지시 내용)", required: true, where: "이메일·카카오톡 캡처 또는 출력" },
  { name: "출퇴근 기록 또는 사무실 출입 내역", required: false, where: "출퇴근 앱·사무실 출입카드·사진 등" },
  { name: "취업규칙·복무규정 적용 증빙", required: false, where: "회사 내부 규정 문서 또는 카카오워크·슬랙 메시지" },
];

const STEPS = [
  {
    title: "근로자성 요건 사전 점검",
    desc: "출퇴근 시간이 지정됐는지, 업무 지시를 받았는지, 한 곳에서만 전속적으로 일했는지, 보수가 고정 지급됐는지 따져보세요. 이 요소들이 많이 해당될수록 근로자성이 인정될 가능성이 높아요. 4대보험 미가입이나 3.3% 원천징수는 근로자성을 부정하는 결정적 이유가 아니에요.",
    tip: "근로기준법은 계약 형식이 아니라 실질적 근로관계를 기준으로 판단해요",
  },
  {
    title: "증빙 자료 수집",
    desc: "업무 지시 이메일·카카오톡, 출퇴근 기록, 급여 이체 내역, 업무계약서를 전부 확보해두세요. 퇴사 후에는 자료 접근이 막힐 수 있으니 재직 중에 미리 저장해두는 게 중요해요. 카카오워크·슬랙 등 내부 메신저도 캡처해두세요.",
    tip: "재직 중 자료 확보가 가장 중요 — 퇴사 후엔 접근이 막혀요",
  },
  {
    title: "사용자에게 퇴직금 지급 요청 (서면)",
    desc: "사용자(회사)에 내용증명 또는 이메일로 퇴직금 지급을 공식 요청해요. 서면으로 남겨두면 나중에 고용노동부 진정 시 증거로 활용할 수 있어요. 요청 후 14일이 지나도 지급이 없으면 다음 단계로 넘어가세요.",
    tip: "요청 날짜와 내용이 명확하게 남도록 이메일이나 내용증명을 활용하세요",
  },
  {
    title: "고용노동부 민원마당에서 진정 접수",
    desc: "사용자가 '프리랜서니까 퇴직금 없다'며 거부하면 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 진정을 접수해요. 근로감독관이 근로자성을 포함해 사실관계를 직접 조사해요. 조사 결과에 강제력이 있어요.",
    tip: "온라인 접수 무료 — 법률구조공단(132) 무료 법률 상담도 병행 추천",
    link: { label: "고용노동부 진정 접수", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "근로자성 요건 확인: 출퇴근 지정·업무 지시·전속성·고정 보수",
  "재직 중 증거 확보: 업무지시서·급여 이체 내역·출퇴근 기록",
  "3.3% 원천징수 여부: 근로자성 부정의 결정적 이유 아님",
  "서면 지급 요청 기록 유지: 이메일·내용증명",
  "소멸시효 3년: 퇴직일로부터 3년 이내 청구 필수",
  "법률구조공단(132) 무료 상담 활용 가능",
];

const FAQS = [
  {
    q: "3.3% 원천징수를 받으면 퇴직금을 받을 수 없나요?",
    a: "3.3% 원천징수(사업소득세)는 근로자성을 부정하는 결정적 이유가 아니에요. 계약 형식이 아니라 실질적인 근로관계가 기준이죠. 출퇴근 관리, 업무 지시, 전속성 등이 인정되면 근로자로 볼 수 있어요.",
  },
  {
    q: "계약서에 '퇴직금 없음'이라고 돼 있으면 어떻게 되나요?",
    a: "계약서에 무엇이라고 적혀 있든 실질적으로 근로자에 해당하면 퇴직금은 법적 의무예요. 근로자성이 인정되면 '퇴직금 없음' 조항은 효력이 없어요. 근로기준법보다 불리한 조건의 계약은 무효거든요.",
  },
  {
    q: "프리랜서로 5년 넘게 일했는데 근로자성이 인정되면 퇴직금을 전부 받을 수 있나요?",
    a: "근로자성이 인정되면 계속 근로 기간 전체에 대해 퇴직금을 청구할 수 있어요. 다만 소멸시효 3년이 적용되니, 퇴직일로부터 3년 이내에 청구해야 해요.",
  },
  {
    q: "4대보험에 가입 안 됐는데 근로자성 인정이 되나요?",
    a: "4대보험 미가입은 근로자성을 부정하는 결정적 이유가 아니에요. 대법원은 계약 형식이나 세금 처리 방식이 아닌 실질적인 근로관계를 기준으로 판단해요. 출퇴근·업무지시·전속성 등 실태가 더 중요해요.",
  },
  {
    q: "근로자성 판단은 누가 하나요?",
    a: "고용노동부 근로감독관이 1차적으로 판단하고, 분쟁이 생기면 노동위원회나 법원에서 최종 판단해요. 사실관계를 종합적으로 검토하죠.",
  },
  {
    q: "재직 중에 증거를 못 모았는데 퇴직 후에 청구할 수 있나요?",
    a: "퇴직 후에도 청구할 수 있어요. 소멸시효 3년이 지나지 않았다면 괜찮아요. 다만 증거 확보가 어려워질 수 있으니, 기억에 남아 있는 업무 지시 내용이나 출퇴근 내역을 최대한 복원하고 법률구조공단(132) 상담을 받아보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 근로자성 판단 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-프리랜서",
    title: "프리랜서 퇴직금 총정리",
    description: "프리랜서가 퇴직금을 받을 수 있는 모든 경우를 정리했어요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "고용형태별 퇴직금 발생 조건과 1년 기준을 정리했어요.",
  },
  {
    slug: "방문판매원-독립계약자-퇴직금-미지급-대응",
    title: "독립계약자 퇴직금 미지급 대응",
    description: "방문판매원·독립계약자도 근로자성이 인정되면 퇴직금 청구가 가능해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="프리랜서-퇴직금-지급기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 프리랜서 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        프리랜서인데 퇴직금을 받을 수 있나요?<br />
        근로자성 판단 기준부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "프리랜서니까 퇴직금은 없다"는 말, 무조건 맞는 건 아니에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 계약 형식이 아니라 실질적인 근로관계를 기준으로 근로자 여부를 판단하거든요.
        프리랜서 계약서를 썼어도 출퇴근 관리를 받고, 업무 지시를 따르고, 전속적으로 일했다면 근로자로 인정받을 수 있어요.
        근로자성이 인정되고 1년 이상 근무했다면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>도 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>프리랜서가 퇴직금을 받을 수 있는 조건</H2>
      <p style={body}>
        핵심은 '프리랜서'라는 명칭이 아니라, 실질적으로 근로자에 해당하느냐예요.
        근로기준법 제2조는 "임금을 목적으로 사업이나 사업장에 근로를 제공하는 사람"을 근로자로 정의하고, 대법원은 계약 형식이 아닌 실태를 기준으로 판단해요.
      </p>
      <p style={body}>
        회사가 형식적으로 프리랜서 계약서를 쓰게 했더라도, 출퇴근 시간을 정하고 업무 지시를 내리며 전속적으로 일하게 했다면 실질적 근로관계가 성립돼요.
        4대보험 미가입이나 3.3% 원천징수는 근로자성을 부정하는 결정적 이유가 아니에요.
      </p>

      <GreenBox>
        출퇴근 시간·장소 지정 여부<br />
        업무 내용·방법에 대한 지휘·감독 여부<br />
        다른 클라이언트 없이 전속적으로 근무했는지<br />
        보수가 매월 고정적으로 지급됐는지
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성이 인정될 가능성이 높아요. 고용노동부(1350) 또는 법률구조공단(132) 상담을 받아보세요."
        partialMatchText="일부만 해당돼요. 근로자성 판단은 종합적으로 이루어지니 전문 상담을 받아보는 게 좋아요."
      />

      <Divider />

      <H2>근로자 인정 시 퇴직금, 얼마나 나올까?</H2>
      <p style={body}>
        근로자성이 인정되면 일반 퇴직금 공식이 그대로 적용돼요.
        월 평균임금 × 근속연수(총 근무일수 ÷ 365)로 계산하죠.
        아래에서 월 수입과 근무 기간을 조절해보세요.
      </p>
      <p style={body}>
        이 금액은 근로자성이 인정된 경우에만 해당돼요.
        실제 인정 여부는 고용노동부 또는 법원이 판단하고, 소멸시효 3년 이내에 청구해야 해요.
      </p>

      <SectionBadge>프리랜서 퇴직금 계산기 (근로자 인정 시)</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로자성이 인정된 경우에만 해당돼요. 실제 인정 여부는 고용노동부·법원이 판단해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>근로자성 입증을 위한 서류</H2>
      <p style={body}>
        프리랜서 퇴직금 청구에서 가장 중요한 건 근로자성을 입증하는 자료예요.
        재직 중에 아래 서류를 미리 저장해두세요. 퇴사 후에는 자료 접근이 막힐 수 있거든요.
      </p>
      <p style={body}>
        계약서가 없어도 이메일·카카오톡 대화 내역으로 업무 지시 구조를 충분히 입증할 수 있어요.
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 진정</a>을 넣을 때 증거로 첨부하면 되죠.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        1. 업무 내용을 사용자가 정하는가<br />
        2. 취업규칙·복무규정 적용을 받는가<br />
        3. 업무 수행 시 지휘·감독을 받는가<br />
        4. 근무 시간·장소가 지정돼 있는가<br />
        5. 비품·도구를 사용자가 제공하는가<br />
        6. 본인 대신 다른 사람을 보낼 수 있는가<br />
        7. 보수가 근로의 대가인가
      </BorderBox>

      <Divider />

      <H2>퇴직금 청구 절차</H2>
      <p style={body}>
        사용자가 "프리랜서니까 퇴직금 의무 없다"고 버티면 고용노동부 진정이 가장 효과적이에요.
        무료이고, 근로감독관 조사 결과에 강제력이 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        퇴사 후에는 자료 수집이 어려워져요.
        일하는 동안 꾸준히 모아두는 게 가장 확실한 방법이에요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금 청구권은 퇴직일로부터 3년 이내에 행사해야 해요.
        근로자성 인정에 시간이 걸리더라도 3년 이내라면 법적으로 청구할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 퇴직금 지급 기준에 대해 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
