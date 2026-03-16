"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직을 앞두고 퇴직금 정산 절차를 알고 싶어요" },
  { id: "c2", label: "퇴직금을 언제, 어떻게 받는지 모르겠어요" },
  { id: "c3", label: "퇴직금 정산서 내용을 이해하고 싶어요" },
  { id: "c4", label: "회사가 계산을 잘못한 것 같아서 확인하고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 예상 수령액 (퇴직소득세 약 3~5% 차감)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.96),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 정산서 (회사 발급)", required: true, where: "회사 인사팀 요청" },
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 발급" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사 (300만원 초과 시)" },
];

const STEPS = [
  {
    title: "퇴직금 정산 요청",
    desc: "퇴직 확정 후 인사팀에 퇴직금 정산서와 퇴직소득 원천징수영수증 발급을 요청해요. 평균임금 계산 내역(3개월 임금 합산, 총 일수, 1일 평균임금)이 포함돼야 해요. 상여금 월 환산 포함 여부도 확인하세요.",
    tip: "정산서를 받으면 숫자를 직접 검증해보는 게 좋아요",
  },
  {
    title: "정산서 내용 검증",
    desc: "3개월 합산 임금에 상여금 월 환산액이 포함됐는지 확인해요. 1일 평균임금 = 3개월 총임금 ÷ 총 일수, 퇴직금 = 1일 평균임금 × 30 × 근속연수 공식이 맞는지 직접 계산해봐요. 차이가 있으면 인사팀에 재계산을 요청해요.",
    tip: "계산기로 직접 계산해서 정산서와 비교해보세요",
  },
  {
    title: "IRP 계좌 알림",
    desc: "300만원 초과 퇴직금은 IRP 계좌로만 수령 가능해요. IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자·메일로 알려줘야 해요. 회사는 퇴직 후 14일 이내에 IRP 계좌로 이체해야 해요.",
    tip: "문자나 메일로 알려야 증거가 남아요",
  },
  {
    title: "수령 확인 및 이의 제기",
    desc: "IRP 계좌에 입금됐는지 확인해요. 금액이 다르면 즉시 인사팀에 문의하고, 14일이 지나도 지급 안 되면 지연이자(연 20%)를 청구할 수 있어요. 계산 오류가 있으면 고용노동부에 진정을 낼 수 있어요.",
    tip: "입금 확인 후 원천징수영수증과 금액이 일치하는지 확인하세요",
  },
];

const CHECKLIST = [
  "퇴직금 정산서 발급 요청 — 인사팀",
  "3개월 임금 + 상여금 환산 포함 여부 확인",
  "공식 직접 계산 — 정산서와 대조",
  "IRP 계좌번호 인사팀에 문자·메일 발송",
  "14일 이내 입금 여부 확인",
];

const FAQS = [
  {
    q: "퇴직금 정산서는 꼭 받아야 하나요?",
    a: "법적 의무는 없지만 받는 게 좋아요. 정산서로 계산 내역을 확인할 수 있고, 오류 발견 시 증거가 돼요. 인사팀에 요청하면 대부분 발급해줘요.",
  },
  {
    q: "퇴직금이 예상보다 적게 왔어요, 어떻게 하나요?",
    a: "급여명세서로 직접 계산해보세요. 상여금 환산 누락, 근속기간 오류 등이 원인이 될 수 있어요. 차이가 10만원 이상이면 인사팀에 재계산을 요청하고, 거부 시 고용노동부에 진정을 낼 수 있어요.",
  },
  {
    q: "퇴직금 정산 후 세금이 어떻게 처리되나요?",
    a: "회사가 퇴직금 지급 시 퇴직소득세를 원천징수해요. 세금 납부는 회사가 처리하고, 퇴직소득 원천징수영수증을 발급해줘요. 별도 신고는 불필요해요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 일반 계좌로 받을 수 있나요?",
    a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 300만원 초과 시 의무적으로 IRP 계좌로만 수령해야 해요.",
  },
  {
    q: "퇴직금 정산이 14일이 지나도 안 되면?",
    a: "연 20% 지연이자가 자동으로 발생해요. 고용노동부 민원마당에서 온라인으로 진정을 낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조 — 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조 — 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-정산서", title: "퇴직금 정산서 보는 방법", description: "정산서 항목과 검증 방법을 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-정산" />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 정산 · 절차
      </div>

      {/* H1 */}
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", lineHeight: 1.35, marginBottom: 6 }}>
        퇴직금 정산, 어떻게 진행되나요?
      </h1>
      <p style={{ fontSize: 17, color: "#374151", fontWeight: 500, marginBottom: 20 }}>
        정산서 검증부터 IRP 수령까지 4단계 절차
      </p>

      {/* Intro */}
      <p style={body}>
        퇴직 날짜가 정해지면 가장 먼저 챙겨야 하는 게 퇴직금 정산이에요. 그냥 회사에서 알아서 입금해주겠지 싶지만, 정산서를 직접 받아서 숫자를 검증하지 않으면 상여금 환산 누락이나 근속기간 오류로 적게 받는 경우가 꽤 있어요.
      </p>
      <p style={body}>
        퇴직금 정산은 크게 네 단계예요. 정산 요청 → 정산서 검증 → IRP 계좌 알림 → 수령 확인. 이 흐름을 알고 있으면 회사가 계산을 잘못해도 바로 잡을 수 있어요.
      </p>

      <ArticleAd position="intro" />

      {/* H2-1 */}
      <H2>퇴직금 정산, 언제 어떻게 시작하나요?</H2>
      <p style={body}>
        퇴직 확정 후 인사팀에 정산 요청을 넣는 게 첫 번째예요. 퇴직일 2주 전쯤에 미리 요청하면 14일 지급 기한 내에 여유 있게 처리돼요. 정산 요청할 때 퇴직금 정산서와 퇴직소득 원천징수영수증도 함께 발급 요청하세요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에 따라 회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 해요. 300만원 초과라면 IRP 계좌로만 받을 수 있으니, 계좌번호를 미리 준비해두세요.
      </p>
      <GreenBox>
        퇴직 확정 → 정산서 + 원천징수영수증 요청 → IRP 계좌번호 인사팀 전달 → 퇴직 후 14일 이내 수령
      </GreenBox>
      <p style={body}>
        정산서를 받으면 그냥 믿지 말고 직접 계산해봐야 해요. 1일 평균임금 = 퇴직 전 3개월 총임금 ÷ 총 일수, 퇴직금 = 1일 평균임금 × 30 × 근속연수 공식을 쓰면 돼요. 이때 상여금 월 환산액이 3개월 임금에 포함됐는지 반드시 확인하세요.
      </p>

      {/* H2-2 */}
      <H2>내 퇴직금 예상액 미리 계산해보세요</H2>
      <p style={body}>
        정산서를 받기 전에 예상 금액을 먼저 계산해보면, 나중에 정산서와 비교하기 쉬워요. 월 평균급여와 근속 기간만 입력하면 바로 확인할 수 있어요.
      </p>
      <p style={body}>
        여기서 나오는 금액은 기본 계산식 기준이에요. 상여금 환산이나 연차수당 포함 여부에 따라 실제 금액과 차이가 날 수 있어요. 정확한 금액은 정산서와 급여명세서를 대조해서 계산하는 게 맞아요.
      </p>
      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <ArticleAd position="mid" />

      {/* H2-3 */}
      <H2>퇴직금 정산에 필요한 서류</H2>
      <p style={body}>
        퇴직금 정산에서 내가 챙겨야 하는 서류와 회사에서 받아야 하는 서류가 있어요. 회사 발급 서류는 인사팀에 요청하면 되고, IRP 계좌번호는 본인이 미리 만들어둬야 해요.
      </p>
      <p style={body}>
        급여명세서 3개월치는 직접 계산 검증할 때 핵심 자료예요. 회사 급여 앱이나 인사팀에서 받을 수 있어요. 없으면 통장 입금 내역으로 대신할 수도 있지만, 상여금 내역이 빠질 수 있으니 명세서로 받는 게 낫죠.
      </p>
      <DocTable docs={DOCS} />

      {/* H2-4 */}
      <H2>퇴직금 정산 4단계 절차</H2>
      <p style={body}>
        정산 요청부터 수령까지 4단계로 진행돼요. 각 단계에서 놓치면 안 되는 포인트가 있으니 순서대로 체크하면서 진행하세요.
      </p>
      <p style={body}>
        14일 지급 기한은 회사 사정과 상관없이 법으로 정해진 기한이에요. 기한이 넘어가면 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a> 기준으로 연 20% 지연이자가 자동으로 붙어요. 지연 지급 시 <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 진정 신청할 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <RelatedArticles articles={RELATED} />

      {/* H2-5 */}
      <H2>퇴직금 정산 체크리스트</H2>
      <p style={body}>
        정산 과정에서 가장 흔한 실수가 상여금 환산 누락이에요. 연간 상여금을 12개월로 나눈 월 환산액이 3개월 임금 계산에 포함돼야 하는데, 회사가 빠뜨리는 경우가 있어요. 정산서를 받으면 이 부분을 가장 먼저 확인하세요.
      </p>
      <Checklist items={CHECKLIST} />
      <GreenBox>
        상여금 환산 누락이 가장 흔한 실수예요. 연간 상여금 ÷ 12 = 월 환산액, 이 금액이 3개월 임금 합산에 포함됐는지 꼭 확인하세요.
      </GreenBox>
      <p style={body}>
        체크리스트를 모두 완료하면 퇴직금 정산 과정이 끝이에요. 수령 후에도 퇴직소득 원천징수영수증은 잘 보관하세요. 나중에 연말정산이나 퇴직소득 세액 정산 시 필요할 수 있어요.
      </p>

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <CategoryButton category="퇴직금" />

      <References sources={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
