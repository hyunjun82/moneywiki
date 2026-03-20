"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 퇴직금 정산서를 받았어요" },
  { id: "c2", label: "정산서에 서명하기 전에 금액을 직접 검증해보고 싶어요" },
  { id: "c3", label: "급여명세서에 상여금이나 고정수당이 포함돼 있었어요" },
  { id: "c4", label: "정산서 금액이 예상보다 적게 나왔어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "직접 계산한 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "정산서 금액과 비교해보세요",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `계산값: 약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 정산서", required: true, where: "회사 인사팀 발급" },
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 발급" },
  { name: "급여명세서 (퇴직 전 3개월)", required: true, where: "회사 인사팀 또는 급여 시스템" },
  { name: "상여금·수당 지급 내역", required: false, where: "인사팀 또는 급여명세서 확인" },
];

const STEPS = [
  {
    title: "입사일·퇴직일 확인",
    desc: "정산서를 받으면 맨 먼저 입사일과 퇴직일이 정확한지 봐요. 하루만 틀려도 근속연수가 달라지고 퇴직금도 바뀌어요. 달력으로 직접 세어봐서 총 일수가 정산서와 맞는지 대조하세요.",
    tip: "근속기간 1일 차이도 퇴직금에 영향을 줘요",
  },
  {
    title: "평균임금 구성 항목 대조",
    desc: "정산서에 표시된 3개월 총임금이 급여명세서 합계와 일치하는지 직접 더해봐요. 정기 상여금은 연간 총액 ÷ 12 × 3으로 환산해 포함시켜야 해요. 식대·교통비 같은 고정수당도 빠지지 않았는지 확인하세요.",
    tip: "상여금 누락이 퇴직금 차이의 가장 흔한 원인이에요",
  },
  {
    title: "공식으로 직접 계산",
    desc: "1일 평균임금 × 30일 × 근속연수 공식으로 직접 계산해요. 1일 평균임금은 퇴직 전 3개월 총임금 ÷ 그 기간 총 일수예요. 정산서 금액과 10만원 이상 차이가 나면 인사팀에 산정 내역 설명을 요청하세요.",
    tip: "위 계산기로 바로 비교해볼 수 있어요",
    link: { label: "퇴직금 평균임금 계산 기준 보기", href: "/w/퇴직금-평균임금" },
  },
  {
    title: "오류 발견 시 이의 제기",
    desc: "차액이 확인되면 먼저 인사팀에 서면으로 재계산을 요청해요. 거부하거나 이유 없이 차액을 인정하지 않으면 고용노동부 민원마당에서 온라인 진정을 낼 수 있어요. 퇴직 후에도 소멸시효 3년 이내라면 청구할 수 있어요.",
    tip: "청구는 메일·문자 등 서면으로 남겨두세요",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "입사일·퇴직일: 달력으로 직접 확인",
  "3개월 총임금: 급여명세서 합계와 대조",
  "정기 상여금: 연간÷12×3 환산 포함 여부",
  "고정수당(식대·교통비 등): 누락 없는지 확인",
  "총 일수: 퇴직 전 3개월 달력 일수 맞는지",
  "이의 제기 문구: 서명 전 제한 문구 유무 확인",
];

const FAQS = [
  {
    q: "퇴직금 정산서를 안 줘도 되나요?",
    a: "법적 발급 의무는 없어요. 그래도 요청하면 대부분 줘요. 안 주면 급여명세서와 근속 기간으로 직접 계산할 수 있어요. 퇴직소득 원천징수영수증은 의무 발급 서류라 반드시 받을 수 있어요.",
  },
  {
    q: "정산서에 상여금이 빠진 것 같아요",
    a: "정기적으로 지급된 상여금은 연간 총액 ÷ 12 × 3으로 환산해 3개월 총임금에 포함시켜야 해요. 빠졌다면 인사팀에 항목 추가 후 재계산을 요청하세요.",
  },
  {
    q: "정산서 금액과 실제 입금액이 달라요",
    a: "퇴직소득세가 원천징수된 금액이 입금되거든요. 정산서는 세전 퇴직금이고, 실제 입금은 세후 금액이에요. 원천징수영수증에서 원천징수된 세금 금액을 확인하세요.",
  },
  {
    q: "퇴직금 정산서와 원천징수영수증은 다른 건가요?",
    a: "달라요. 정산서는 퇴직금 계산 내역이고, 원천징수영수증은 세금 납부 내역이에요. 둘 다 받아두는 게 좋아요.",
  },
  {
    q: "서명 후에 오류를 발견했어요",
    a: "서명 후라도 명백한 계산 오류라면 차액 청구가 가능해요. 퇴직 후 3년 이내라면 내용증명 발송 또는 고용노동부 진정으로 청구할 수 있어요.",
  },
  {
    q: "이미 퇴직한 지 2년이 됐는데 청구할 수 있나요?",
    a: "퇴직금 청구권 소멸시효는 3년이에요. 퇴직일 기준 3년 이내라면 지금도 청구 가능해요. 소멸시효 완성이 임박하면 진정을 먼저 넣어 시효를 중단시키세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 기준", description: "포함 항목과 3개월 산정 방법을 정리했어요." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "상여금 환산 방법과 포함 기준이에요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 진정 절차를 알 수 있어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-정산서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 정산서 · 검증</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산서, 그냥 서명해도 될까요?<br />
        항목 확인법부터 오류 이의 제기까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 내민 퇴직금 정산서, 금액이 맞는지 모른 채 서명하는 경우가 생각보다 많아요.
        서명 전 숫자를 직접 검증해두지 않으면 나중에 오류를 발견해도 추가 청구가 복잡해질 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 기준으로
        정산서 항목 확인법, 상여금 포함 여부, 오류 발견 시 이의 제기 방법까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>정산서에서 가장 먼저 봐야 할 항목이 뭔가요?</H2>
      <p style={body}>
        정산서를 받으면 입사일·퇴직일부터 봐요. 하루만 달라도 근속연수가 바뀌고, 퇴직금도 그만큼 달라지거든요.
        달력으로 직접 세어봐서 정산서에 표시된 총 일수와 맞는지 대조하세요.
      </p>
      <p style={body}>
        다음으로 볼 건 3개월 총임금이에요. 퇴직 전 3개월 급여명세서를 꺼내서 합계를 직접 더해보세요.
        정산서 수치와 차이가 나면 상여금·고정수당이 빠진 경우가 많아요.
        정기 상여금은 연간 총액 ÷ 12 × 3으로 환산해서 포함해야 하고, 식대·교통비 같은 고정수당도 마찬가지예요.
      </p>
      <p style={body}>
        정산서 하단에 "이의를 제기하지 않겠다"는 문구가 있는지도 꼭 봐요.
        이런 문구에 서명하면 나중에 오류를 발견해도 청구하기가 훨씬 어려워질 수 있어요.
      </p>

      <GreenBox>
        근속기간: 입사일·퇴직일 정확한지, 총 일수 맞는지<br />
        평균임금: 3개월 총임금에 상여금·고정수당 포함 여부<br />
        이의 제기 문구: 서명 전 제한 문구 유무 반드시 확인
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="해당 상황이에요. 아래 계산기로 예상 퇴직금을 직접 계산하고 정산서 금액과 비교해보세요."
        partialMatchText="일부 항목이 해당돼요. 해당 부분부터 집중해서 확인하면 돼요."
      />

      <Divider />

      <H2>예상 퇴직금 직접 계산해서 정산서와 비교하기</H2>
      <p style={body}>
        퇴직금 공식은 1일 평균임금 × 30일 × 근속연수예요. 1일 평균임금은 퇴직 전 3개월 총임금 ÷ 그 기간 총 일수로 구해요.
        아래 계산기는 월 평균급여 기준 간략 계산으로, 정산서 금액과 큰 차이가 없는지 빠르게 가늠하는 용도예요.
      </p>
      <p style={body}>
        계산기 결과와 정산서 금액을 비교해서 10만원 이상 차이가 나면 인사팀에 산정 내역 설명을 요청하세요.
        정당한 이유 없이 거부한다면 <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서
        온라인 진정을 낼 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 × 근속연수 기준 간략 계산이에요. 실제 퇴직금은 퇴직 전 3개월 평균임금 기준으로 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>검증에 필요한 서류는 뭔가요?</H2>
      <p style={body}>
        정산서를 제대로 확인하려면 비교할 기준 서류가 필요해요. 가장 중요한 건 퇴직 전 3개월 급여명세서예요.
        정산서에 표시된 총임금이 명세서 합계와 일치하는지 직접 대조할 수 있어요.
      </p>
      <p style={body}>
        퇴직소득 원천징수영수증도 꼭 받아두세요. 정산서 금액과 실제 입금액이 다른 이유가 이 서류에 나와 있어요.
        퇴직소득세가 얼마나 원천징수됐는지, 세율 적용이 맞는지 확인할 수 있거든요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>오류 발견 시 어떤 순서로 이의 제기하나요?</H2>
      <p style={body}>
        이의 제기는 단계별로 하는 게 효과적이에요. 고용노동부 진정보다 회사 인사팀에 먼저 재계산을 요청하는 게 빠르게 해결될 가능성이 높아요.
        각 단계에서 메일·문자 등 서면으로 기록을 남겨두면 나중에 증거로 쓸 수 있어요.
      </p>
      <p style={body}>
        회사가 거부하거나 이유 없이 차액을 인정하지 않으면 그때 고용노동부 진정을 넣으면 돼요.
        소멸시효 만료가 임박하다면 진정을 먼저 낸 뒤 협의를 진행하는 방식도 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>서명 전 이것만 확인하면 돼요</H2>
      <p style={body}>
        정산서를 받은 날 바로 서명하지 않아도 돼요. 검토 시간을 달라고 요청하는 건 당연한 권리예요.
        아래 6가지를 순서대로 확인하고 이상 없을 때 서명하면 돼요.
      </p>
      <p style={body}>
        상여금 환산 포함 여부와 총 일수는 달력을 직접 보면서 세는 게 좋아요.
        회사 시스템 입력 오류로 1~2일 차이가 나는 경우도 있거든요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        서명 전: 인사팀에 재계산 요청 → 거부 시 고용노동부 진정<br />
        서명 후: 명백한 오류라면 소멸시효 3년 이내 차액 청구 가능<br />
        지연 지급: 퇴직일로부터 14일 초과 시 연 20% 지연이자 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산서를 받은 분들이 실제로 많이 물어보는 것들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법·근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
