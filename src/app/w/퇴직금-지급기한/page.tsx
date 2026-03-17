"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 14일이 지났는데 퇴직금이 안 왔어요" },
  { id: "c2", label: "지급 기한 연장에 서면으로 동의한 적이 없어요" },
  { id: "c3", label: "IRP 계좌번호를 인사팀에 미리 전달했어요" },
  { id: "c4", label: "아직 퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 300, max: 10000, step: 300, defaultValue: 2000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "14일 초과 지연 일수", min: 1, max: 180, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "합산 청구액 (퇴직금+지연이자)",
    getValue: (v: Record<string, number>) => v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직 확인서 또는 사직서 수리 확인", required: true, where: "회사 인사팀" },
  { name: "퇴직금 미지급 내용증명", required: true, where: "우체국 발송" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "인사팀 또는 급여 앱" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "14일 기한 계산",
    desc: "퇴직일 다음 날부터 14일을 세요. 14일째 되는 날까지 IRP 계좌(300만원 초과) 또는 지정 계좌로 입금돼야 해요. 14일이 주말이나 공휴일이면 다음 영업일이 기한이에요.",
    tip: "퇴직일 포함 여부: 퇴직일 다음 날부터 계산",
  },
  {
    title: "인사팀 지급 요청",
    desc: "14일이 지나도 입금이 안 됐으면 먼저 인사팀에 지급 요청을 해요. 문자나 메일로 기록을 남기세요. 대부분 이 단계에서 해결돼요.",
    tip: "문자나 메일로 지급 요청 일자를 남겨두세요",
  },
  {
    title: "내용증명 발송",
    desc: "인사팀 요청 후에도 지급이 안 되면 내용증명으로 퇴직금과 지연이자 지급을 요청해요. 내용증명은 법적 청구 증거가 돼요. 우체국 방문 또는 온라인 우편서비스에서 발송할 수 있어요.",
    tip: "내용증명 발송일부터 법적 청구 기산일이 돼요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "내용증명 후에도 지급이 없으면 고용노동부 민원마당에서 온라인 진정을 낼 수 있어요. 근로감독관이 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌 대상이에요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) 24시간 신청 가능",
  },
];

const CHECKLIST = [
  "14일 기한: 퇴직일 다음 날부터 14일",
  "IRP 계좌번호 인사팀 통보: 미리 알려줘야 이체 가능",
  "14일 초과 시: 연 20% 지연이자 자동 발생",
  "내용증명 발송: 법적 청구 증거 확보",
  "고용노동부 진정: 민원마당 온라인 신청",
];

const FAQS = [
  {
    q: "퇴직금 지급 기한이 14일인 이유가 뭔가요?",
    a: "근로자퇴직급여보장법 제9조에 따라 퇴직 후 14일 이내에 지급해야 해요. 양 당사자가 서면으로 합의하면 연장이 가능해요.",
  },
  {
    q: "14일이 토요일이면 언제까지 줘야 하나요?",
    a: "토요일·일요일·공휴일이 기한이면 다음 첫 영업일이 기한이에요.",
  },
  {
    q: "IRP 계좌번호를 아직 안 알려줬는데 14일이 지났어요",
    a: "IRP 계좌를 알려주지 않으면 회사가 이체할 수 없어요. 이 경우 지연에 대한 귀책이 근로자에게 있을 수 있어요. 바로 IRP 계좌번호를 알려주세요.",
  },
  {
    q: "지연이자는 언제까지 계속 붙나요?",
    a: "실제 지급일까지 매일 붙어요. 연 20% 비율로 일할 계산해요. 고용노동부 진정 후 지급 시에도 지연이자를 함께 받을 수 있어요.",
  },
  {
    q: "합의하에 나눠 받기로 했는데 나중에 이자를 청구할 수 있나요?",
    a: "합의서에 이자 포기 조항이 없다면 청구 가능해요. 합의 전에 이자 조항을 꼭 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
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
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지연이자 계산과 청구 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 청구", description: "연 20% 이자 계산 방법." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 14일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한은 14일이에요<br />
        14일 초과 시 지연이자 청구 방법과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금이 언제까지 들어와야 하는지 모르는 분이 많아요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는
        퇴직 후 14일 이내 지급을 의무로 규정해요.
        14일이 지나면 합의 없이 자동으로 연 20% 지연이자가 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 지급 기한, 14일이 원칙이에요</H2>
      <p style={body}>
        퇴직일 다음 날부터 14일째 되는 날까지 IRP 계좌(300만원 초과) 또는 지정 계좌로 입금돼야 해요.
        기한이 토요일·공휴일이면 다음 첫 영업일로 자동 연장돼요.
      </p>
      <p style={body}>
        회사와 근로자가 서면으로 합의하면 지급 기한을 늘릴 수 있어요. 하지만 합의 없이 14일을 넘기면
        그날부터 연 20% 지연이자가 붙어요. 이 이자는 회사가 실제로 지급하는 날까지 매일 일할 계산으로 쌓여요.
      </p>

      <GreenBox title="14일 기한 핵심 정리">
        기산일: 퇴직일 다음 날부터 14일<br />
        300만원 초과: IRP 계좌로만 이체 가능<br />
        기한이 주말·공휴일: 다음 영업일로 연장<br />
        합의 없이 초과 시: 연 20% 지연이자 자동 발생<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 및 신고가 가능해요. 아래 계산기로 이자를 먼저 확인하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>지연이자 계산기: 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        14일이 지났다면 지연이자가 얼마나 붙었는지 먼저 계산해 보세요.
        퇴직금 총액과 지연 일수를 입력하면 청구 가능한 이자를 바로 알 수 있어요.
        이 금액이 고용노동부 진정 시 청구 근거가 돼요.
      </p>

      <SectionBadge>퇴직금 지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 14일 초과 시점부터 실제 지급일까지 누적 계산이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류 4가지</H2>
      <p style={body}>
        고용노동부 진정이나 내용증명 발송 전에 서류를 미리 갖춰두면 절차가 훨씬 빨라져요.
        퇴직 확인서와 급여명세서는 지급 기한과 퇴직금 산정 근거를 입증하는 핵심 서류예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 못 받았을 때 단계별 절차</H2>
      <p style={body}>
        14일이 지났는데도 퇴직금이 안 들어왔다면 순서대로 밟아야 할 절차가 있어요.
        4단계 중 대부분은 2단계(인사팀 요청) 또는 3단계(내용증명)에서 끝나요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지금 바로 해야 할 것들</H2>
      <p style={body}>
        퇴직금 청구는 시간이 지날수록 불리해요. 지연이자는 14일 초과부터 매일 붙지만,
        회사가 먼저 나서서 알려주지는 않아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 계좌번호를 미리 알려줘야 이체 가능해요">
        IRP 계좌번호를 인사팀에 미리 통보해 두세요.<br />
        계좌 정보 없이는 회사가 이체 자체를 못 해요. 이 경우 지연 귀책이 근로자에게 돌아올 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한과 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
