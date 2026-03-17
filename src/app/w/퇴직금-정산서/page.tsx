"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 퇴직금 정산서를 받았어요" },
  { id: "c2", label: "정산서 금액이 예상보다 적게 나왔어요" },
  { id: "c3", label: "급여명세서에 상여금이 포함돼 있었어요" },
  { id: "c4", label: "서명 전에 숫자를 직접 검증해보고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
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
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀" },
  { name: "상여금 지급 내역", required: false, where: "인사팀 또는 급여명세서" },
];

const STEPS = [
  {
    title: "기본 항목 확인",
    desc: "정산서에서 가장 먼저 입사일과 퇴직일이 정확한지 확인하세요. 하루 차이도 퇴직금에 영향을 줘요. 그 다음 3개월 총임금이 급여명세서 합계와 일치하는지 직접 더해보세요.",
    tip: "근속기간 1일 차이도 퇴직금에 영향을 줘요",
  },
  {
    title: "평균임금 검증",
    desc: "정산서에 표시된 3개월 총임금에 상여금·고정수당이 포함됐는지 확인해요. 정기 상여금은 연간 총액 ÷ 12 × 3으로 환산해 포함시켜야 해요. 이 항목이 빠진 경우가 가장 흔해요.",
    tip: "상여금 누락이 퇴직금 차이 중 가장 큰 원인이에요",
  },
  {
    title: "공식 직접 계산",
    desc: "1일 평균임금 × 30일 × 근속연수로 직접 계산해요. 정산서 금액과 10만원 이상 차이가 나면 인사팀에 재계산을 요청하세요. 거부하면 고용노동부에 진정을 낼 수 있어요.",
    tip: "아래 계산기로 바로 비교해볼 수 있어요",
  },
  {
    title: "오류 발견 시 이의 제기",
    desc: "차액이 있으면 내용증명으로 차액 지급을 요청해요. 퇴직 후에도 소멸시효 3년 이내라면 청구 가능해요. 고용노동부 민원마당에서 온라인 진정 접수가 가능해요.",
    tip: "소멸시효 3년 이내라면 퇴직 후에도 청구할 수 있어요",
  },
];

const CHECKLIST = [
  "입사일·퇴직일: 정확한지 먼저 확인",
  "3개월 총임금: 급여명세서 합계와 대조",
  "상여금 환산 포함 여부: 연간÷12×3",
  "총 일수: 달력 기준 실제 일수 맞는지",
  "차이 있으면: 인사팀 재계산 요청",
];

const FAQS = [
  {
    q: "퇴직금 정산서를 주지 않으면 어떻게 하나요?",
    a: "법적으로 발급 의무는 없지만 요청하면 대부분 줘요. 안 줄 경우 급여명세서로 직접 계산할 수 있어요.",
  },
  {
    q: "정산서에 상여금이 빠진 것 같아요",
    a: "정기적으로 지급된 상여금은 연간 총액 ÷ 12 × 3으로 3개월 총임금에 포함해야 해요. 빠졌다면 인사팀에 재계산을 요청하세요.",
  },
  {
    q: "정산서와 실제 입금액이 달라요",
    a: "퇴직소득세가 원천징수되기 때문에 차이가 날 수 있어요. 원천징수영수증으로 세금 금액을 확인하세요.",
  },
  {
    q: "퇴직금 정산서와 원천징수영수증은 다른 건가요?",
    a: "달라요. 정산서는 퇴직금 계산 내역이고, 원천징수영수증은 세금 납부 내역이에요. 둘 다 받아두세요.",
  },
  {
    q: "이미 퇴직했는데 정산서 오류를 발견했어요",
    a: "퇴직 후 3년 이내라면 차액을 청구할 수 있어요. 내용증명 발송 또는 고용노동부 진정으로 청구 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-정산", title: "퇴직금 정산 절차 4단계", description: "정산 요청부터 IRP 수령까지 절차를 정리했어요." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "포함 항목과 산정 기준을 설명해요." },
  { slug: "퇴직금-상여금-포함", title: "상여금 포함 여부", description: "상여금 환산 방법과 포함 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-정산서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 정산서 · 검증</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산서, 어떻게 확인하나요?<br />
        항목별 검증 방법부터 오류 이의 제기까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 내민 퇴직금 정산서, 그냥 서명해도 될까요? 정산서에 표시된 숫자가 맞는지 확인하지 않고 서명하면
        나중에 오류를 발견해도 추가 청구가 어려워질 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 기준으로
        평균임금 계산법, 상여금 포함 여부, 오류 발견 시 이의 제기 방법까지 항목별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>정산서에서 가장 먼저 확인해야 할 게 뭔가요?</H2>
      <p style={body}>
        정산서를 받으면 맨 먼저 입사일과 퇴직일이 맞는지 봐야 해요. 단 하루만 틀려도 퇴직금이 달라지거든요.
        그 다음은 평균임금 산정 내역인데, 퇴직 전 3개월 급여 합계가 급여명세서와 일치하는지 직접 더해보세요.
      </p>
      <p style={body}>
        가장 흔하게 빠지는 게 상여금이에요. 정기적으로 지급된 상여금은 연간 총액을 12로 나누고 3을 곱해
        3개월치로 환산한 뒤 포함시켜야 해요. 식대·교통비 같은 고정수당도 마찬가지예요.
        이 항목들이 빠지면 평균임금이 낮아지고, 퇴직금도 그만큼 줄어들죠.
      </p>
      <p style={body}>
        정산서 맨 아래에 "이의를 제기하지 않겠다"는 문구가 있는지도 확인하세요.
        이런 문구가 있는 정산서에 서명하면 나중에 오류를 발견해도 청구하기가 훨씬 어려워져요.
      </p>

      <GreenBox title="정산서 3대 핵심 확인 항목">
        근속기간: 입사일·퇴직일 정확한지, 육아휴직 포함 여부<br />
        평균임금: 3개월 총임금에 상여금·고정수당 포함 여부<br />
        이의 제기 문구: 서명 전 제한 문구 유무 반드시 확인
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="해당 상황이에요. 아래 계산기로 예상 금액을 직접 계산하고 정산서와 비교해보세요."
        partialMatchText="일부 항목이 해당돼요. 그 부분부터 집중적으로 확인하면 돼요."
      />

      <Divider />

      <H2>직접 계산해서 정산서 금액과 비교해보세요</H2>
      <p style={body}>
        퇴직금 공식은 1일 평균임금 × 30일 × 근속연수예요. 1일 평균임금은 퇴직 전 3개월 총임금을
        그 기간 총 일수로 나눠서 구해요. 아래 계산기에서 월 평균급여와 근속 기간을 입력하면
        예상 퇴직금이 바로 나와요.
      </p>
      <p style={body}>
        계산기 결과와 정산서 금액을 비교해서 10만원 이상 차이가 나면 회사 인사팀에 산정 내역 설명을 요청하세요.
        정당한 이유 없이 거부한다면 <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서
        온라인 진정을 넣을 수 있어요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 × 근속연수로 간략 계산한 값이에요. 실제 퇴직금은 퇴직 전 3개월 평균임금 기준으로 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>검증에 필요한 서류는 뭔가요?</H2>
      <p style={body}>
        정산서를 제대로 검증하려면 비교할 기준 자료가 있어야 해요. 가장 중요한 건 최근 3개월 급여명세서예요.
        정산서에 표시된 3개월 총임금이 명세서 합계와 일치하는지 직접 대조할 수 있거든요.
      </p>
      <p style={body}>
        퇴직소득 원천징수영수증도 꼭 받아두세요. 정산서와 실제 입금액 차이가 나는 이유가 이 문서에 나와 있어요.
        퇴직소득세가 얼마나 원천징수됐는지, 세율 적용이 맞는지 확인할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>정산서 오류를 발견하면 어떤 순서로 움직여야 하나요?</H2>
      <p style={body}>
        이의 제기는 단계별로 하는 게 효과적이에요. 바로 고용노동부에 진정을 넣는 것보다,
        회사에 먼저 재계산 요청을 하는 게 일반적으로 빠르게 해결돼요.
        단계별로 진행하면서 문자·메일로 증거를 남겨두는 것도 중요해요.
      </p>
      <p style={body}>
        회사가 재계산 요청을 거부하거나 이유 없이 차액을 인정하지 않으면 그때 고용노동부 진정을 넣으면 돼요.
        퇴직 후에도 소멸시효 3년 이내라면 청구할 수 있으니, 시간이 촉박하다면 진정을 먼저 넣어 시효를 중단시키세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>서명하기 전 이것만 확인하면 돼요</H2>
      <p style={body}>
        정산서를 받은 당일 바로 서명하지 않아도 돼요. 검토 시간을 요청하는 건 당연한 권리예요.
        아래 5가지 항목을 순서대로 확인하고, 모두 이상 없을 때 서명하면 돼요.
      </p>
      <p style={body}>
        특히 상여금 환산 포함 여부와 총 일수는 직접 달력을 보면서 확인하는 게 좋아요.
        회사 시스템 오류로 1~2일 차이가 나는 경우도 있거든요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="오류 발견 시 행동 요약">
        서명 전: 인사팀에 재계산 요청 → 거부 시 고용노동부 진정<br />
        서명 후: 명백한 오류라면 차액 청구 가능, 소멸시효 3년 이내<br />
        지연 지급: 14일 초과 시 지연이자 연 20% 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산서에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
