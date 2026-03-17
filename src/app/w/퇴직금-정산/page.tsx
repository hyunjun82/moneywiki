"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직이 확정됐어요" },
  { id: "c2", label: "퇴직금이 아직 입금되지 않았어요" },
  { id: "c3", label: "급여명세서 최근 3개월치를 준비할 수 있어요" },
  { id: "c4", label: "회사에서 퇴직금 정산서를 아직 받지 못했어요" },
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
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "정산 요청 및 정산서 수령",
    desc: "퇴직 확정 후 인사팀에 퇴직금 정산서와 퇴직소득 원천징수영수증 발급을 요청해요. 퇴직일 2주 전에 요청하면 14일 지급 기한 내에 여유 있게 처리돼요. 평균임금 계산 내역이 포함된 정산서인지 확인하세요.",
    tip: "정산서는 법적 의무 아니지만 요청하면 대부분 발급해줘요",
  },
  {
    title: "정산서 숫자 직접 검증",
    desc: "3개월 합산 임금에 상여금 월 환산액이 포함됐는지 확인해요. 1일 평균임금 = 3개월 총임금 ÷ 총 일수, 퇴직금 = 1일 평균임금 × 30 × 근속연수예요. 상여금 월 환산이 누락된 경우가 가장 흔해요.",
    tip: "연간 상여금 ÷ 12 = 월 환산액, 이 금액이 3개월 임금에 포함됐는지 체크",
  },
  {
    title: "IRP 계좌번호 인사팀 통보",
    desc: "300만원 초과 퇴직금은 IRP 계좌로만 수령해요. IRP 계좌번호를 인사팀에 문자나 메일로 알려줘야 해요. 회사는 퇴직 후 14일 이내에 이체해야 해요.",
    tip: "문자·메일로 남기는 게 증거로 좋아요",
  },
  {
    title: "수령 확인 및 이의 제기",
    desc: "IRP 계좌에 입금됐는지 확인해요. 금액이 다르면 즉시 인사팀에 재계산 요청해요. 14일이 지나도 지급 안 되면 연 20% 지연이자를 청구할 수 있고, 고용노동부 진정도 가능해요.",
    tip: "입금 확인 후 원천징수영수증과 금액 일치 여부 확인",
  },
];

const CHECKLIST = [
  "정산서 발급 요청: 인사팀에 서면으로",
  "상여금 월 환산 포함 여부: 연간 ÷ 12",
  "1일 평균임금 공식 직접 계산: 3개월 총임금 ÷ 일수",
  "IRP 계좌번호 인사팀에 문자·메일 발송",
  "14일 이내 입금 여부 확인",
];

const FAQS = [
  {
    q: "퇴직금 정산서는 꼭 받아야 하나요?",
    a: "법적 의무는 없지만 받는 게 좋아요. 계산 내역을 확인할 수 있고, 오류 발견 시 증거가 돼요. 인사팀에 요청하면 대부분 발급해줘요.",
  },
  {
    q: "퇴직금이 예상보다 적게 왔어요",
    a: "급여명세서로 직접 계산해보세요. 상여금 환산 누락, 근속기간 오류 등이 원인이 될 수 있어요. 차이가 10만원 이상이면 인사팀에 재계산을 요청하고, 거부 시 고용노동부에 진정을 낼 수 있어요.",
  },
  {
    q: "퇴직금 정산 후 세금은 어떻게 처리되나요?",
    a: "회사가 퇴직금 지급 시 퇴직소득세를 원천징수해요. 세금 납부는 회사가 처리하고 퇴직소득 원천징수영수증을 발급해줘요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 일반 계좌로 받을 수 있나요?",
    a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 300만원 초과 시 의무적으로 IRP 계좌로만 수령해야 해요.",
  },
  {
    q: "14일이 지나도 정산이 안 되면?",
    a: "연 20% 지연이자가 자동으로 발생해요. 고용노동부 민원마당에서 온라인으로 진정을 낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조: 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
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
  { slug: "퇴직금-정산서", title: "퇴직금 정산서 보는 방법", description: "정산서 항목과 검증 방법을 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인해요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 정산 · 절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산, 어떻게 진행되나요?<br />
        정산서 검증부터 IRP 수령까지 4단계 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직 날짜가 정해지면 가장 먼저 챙겨야 하는 게 퇴직금 정산이에요.
        정산서를 직접 받아서 숫자를 검증하지 않으면 상여금 환산 누락이나 근속기간 오류로 적게 받는 경우가 꽤 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 기준으로 정산 요청부터 수령 확인까지 4단계로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 정산이 필요한 상황인가요?</H2>
      <p style={body}>
        퇴직이 확정된 순간부터 14일 카운트가 시작돼요. 회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 해요.
        기한이 지나면 연 20% 지연이자가 붙어요.
      </p>
      <p style={body}>
        정산서를 받으면 그냥 믿지 말고 직접 계산해봐야 해요.
        상여금 월 환산이 빠진 경우가 실제로 많아요. 연간 상여금 ÷ 12가 3개월 임금에 포함됐는지 꼭 확인하세요.
      </p>

      <GreenBox title="정산 핵심 체크 2가지">
        상여금 월 환산: 연간 상여금 ÷ 12 × 3개월분 포함됐는지 확인<br />
        IRP 계좌: 300만원 초과 시 퇴직 전 미리 개설해서 인사팀에 전달
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 정산이 필요한 상황이에요. 아래 계산기로 예상 금액을 확인하고 정산 절차를 진행하세요."
        partialMatchText="상황이 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>내 퇴직금 예상액 미리 계산해보세요</H2>
      <p style={body}>
        정산서를 받기 전에 예상 금액을 먼저 계산해두면 나중에 정산서와 비교하기 쉬워요.
        상여금 환산이나 연차수당이 있다면 실제 금액이 더 높아요.
        차이가 10만원 이상이면 인사팀에 재계산을 요청하세요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산. 상여금·연차수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>정산에 필요한 서류</H2>
      <p style={body}>
        퇴직금 정산에서 내가 챙겨야 하는 서류와 회사에서 받아야 하는 서류가 있어요.
        급여명세서 3개월치는 계산 검증할 때 핵심이에요.
        퇴직금이 300만원을 넘으면 IRP 계좌번호를 인사팀에 미리 알려줘야 14일 기한 내에 이체돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 정산 4단계 절차</H2>
      <p style={body}>
        정산 요청부터 수령까지 4단계로 진행돼요. 상여금 포함 여부 확인이 가장 중요한 포인트예요.
        이것만 놓치지 않아도 수십만~수백만원 차이가 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>정산서 검증 체크리스트</H2>
      <p style={body}>
        정산 과정에서 가장 흔한 실수가 상여금 환산 누락이에요.
        아래 체크리스트로 하나씩 확인해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="상여금 환산 누락이 가장 흔한 실수예요">
        연간 상여금 ÷ 12 = 월 환산액, 이 금액이 3개월 임금 합산에 포함됐는지 꼭 확인하세요.<br />
        포함되지 않았다면 인사팀에 재계산을 요청할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
