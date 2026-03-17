"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과했어요" },
  { id: "c2", label: "IRP 계좌로 퇴직금을 받았어요" },
  { id: "c3", label: "현재 만 55세 미만이에요" },
  { id: "c4", label: "IRP에서 아직 인출하지 않았어요" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금",
    min: 500, max: 10000, step: 100, defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 35, step: 1, defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 (추정)",
    highlight: true,
    getValue: (v: Record<string, number>) =>
      Math.round(Math.max(0, v.amount * 10000 * 0.05 * (1 - Math.min(v.years, 30) * 0.015))),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "세후 수령액",
    getValue: (v: Record<string, number>) => {
      const tax = Math.round(Math.max(0, v.amount * 10000 * 0.05 * (1 - Math.min(v.years, 30) * 0.015)));
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀" },
  { name: "근로계약서 (입사일 확인용)", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: false, where: "회사 인사팀" },
  { name: "IRP 이체 확인서", required: false, where: "IRP 금융기관" },
];

const STEPS = [
  {
    title: "퇴직소득원천징수영수증 수령",
    desc: "퇴직 후 회사 인사팀에 '퇴직소득원천징수영수증'을 요청해요. 세금 내역이 항목별로 나와 있어요. 퇴직 후에도 언제든 재발급 요청이 가능해요.",
    tip: "홈택스 '지급명세서 조회'에서도 확인 가능해요",
  },
  {
    title: "근속연수공제 적용 확인",
    desc: "영수증에서 '근속연수공제' 금액이 맞는지 봐야 해요. 근속 10년이면 400만원, 20년이면 1,200만원이 기준이에요. 이 금액이 빠지면 세금이 훨씬 많이 나와요.",
    tip: "소득세법 제48조 공제 기준표와 대조해요",
  },
  {
    title: "홈택스에서 세액 검증",
    desc: "홈택스(hometax.go.kr) '퇴직소득세 모의계산'에 같은 수치를 입력해서 회사가 계산한 금액과 비교해요. 차이가 100만원 이상이면 잘못 계산된 거예요.",
    tip: "홈택스 → 세금신고 → 모의계산 → 퇴직소득세",
  },
  {
    title: "경정청구로 환급 신청",
    desc: "세금을 더 냈다면 홈택스에서 '경정청구'로 환급받을 수 있어요. 법정 기한은 5년이에요. 세무사 없이도 직접 신청 가능하고, 보통 2~3개월 안에 환급돼요.",
    tip: "퇴직소득세 환급은 세무서 방문 없이 온라인 처리 가능",
  },
];

const CHECKLIST = [
  "퇴직소득원천징수영수증 수령 및 항목 확인",
  "근속연수공제 금액 정확히 기재됐는지 검토",
  "홈택스 모의계산과 세액 비교",
  "IRP 수령 시 과세이연 처리 여부 확인",
  "과오납 확인 시 경정청구 5년 이내 신청",
];

const FAQS = [
  {
    q: "퇴직소득세와 근로소득세, 어느 쪽이 더 낮나요?",
    a: "퇴직소득세가 훨씬 낮아요. 근로소득세는 종합소득에 합산해서 누진세율이 적용되지만, 퇴직소득세는 분류과세로 별도 계산해요. 근속연수공제 후 연 단위로 환산해서 세율을 낮추는 구조라 같은 금액이라도 세금이 적게 나와요.",
  },
  {
    q: "IRP로 받으면 세금이 아예 없나요?",
    a: "이체 시점에는 안 내요. 과세이연이라고 해서 나중에 수령할 때 내는 구조예요. 만 55세 이후 연금으로 나눠 받으면 퇴직소득세를 30% 줄여줘요. 10년 이상 나눠 받으면 40% 감면도 있어요.",
  },
  {
    q: "퇴직소득세가 너무 많이 나온 것 같아요",
    a: "원천징수영수증에서 근속연수공제가 맞게 들어갔는지 먼저 봐요. 입사일이 잘못 기재되거나 공제 항목이 빠진 경우가 종종 있어요. 홈택스 모의계산과 비교해서 차이가 나면 경정청구로 환급받을 수 있어요.",
  },
  {
    q: "퇴직소득세는 언제 납부하나요?",
    a: "회사에서 원천징수해서 납부해요. 퇴직금을 받을 때 이미 세금이 빠진 금액이 들어오는 거예요. IRP로 받는 경우는 이체 시점에 원천징수 없이 전액 들어와요.",
  },
  {
    q: "명예퇴직금도 퇴직소득세가 붙나요?",
    a: "원칙적으로 붙어요. 다만 법정 퇴직금과 별도로 지급되는 경우, 소득 구분에 따라 근로소득으로 처리되는 부분도 있어요. 금액이 크면 세무사에게 확인해보는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득 정의", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조: 퇴직소득 근속연수공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "국세청: 퇴직소득 과세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 구조와 IRP 절세 방법을 비교했어요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "계좌 개설부터 연금 전환까지 절차를 정리했어요." },
  { slug: "퇴직금-세금-환급", title: "퇴직금 세금 환급받을 수 있는 경우", description: "경정청구 방법과 환급 조건을 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-소득세" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 소득세 · 퇴직소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 소득세, 어떻게 계산되나요?<br />
        퇴직소득세 공식부터 절세 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금에 붙는 세금은 퇴직소득세예요. 일반 근로소득세랑 계산 방식이 달라서 공제를 두 번 받는 구조예요.
        근속 10년에 퇴직금 3,000만원이면 세금이 100만원대로 나오기도 해요.
        <a href="/w/퇴직금-세금-환급" style={{ color: "#1D9E75", textDecoration: "underline" }}>잘못 공제된 세금은 경정청구로 5년 이내 환급</a>도
        가능하니, 원천징수영수증을 꼭 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP로 받으면 퇴직소득세가 줄어드나요?</H2>
      <p style={body}>
        IRP(개인형 퇴직연금)로 퇴직금을 받으면 이체 시점에 세금을 내지 않아요. '과세이연'이라고 해서 나중에 수령할 때 납부하는 구조예요.
        만 55세 이후 연금으로 나눠 받으면 퇴직소득세를 30% 줄여줘요. 10년 이상 나눠 받으면 40% 감면도 있어요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 초과하면 IRP로만 받아야 해요. 계좌 없이 퇴직하면 처리가 복잡해지니,
        퇴직 전에 미리 개설하고 인사팀에 계좌번호를 알려주는 게 중요해요.
      </p>

      <GreenBox title="퇴직소득세 계산 구조">
        퇴직금 - 근속연수공제 = 퇴직소득<br />
        퇴직소득 × 12 ÷ 근속연수 = 환산급여<br />
        환산급여 - 환산급여공제 = 환산과세표준<br />
        세율 적용 → ÷12 × 근속연수 = 최종 퇴직소득세
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 과세이연 혜택을 받을 수 있어요. 55세까지 유지하면 30% 절세가 가능해요."
        partialMatchText="일부 조건이 맞지 않을 수 있어요. 국세청(126)에 문의해보세요."
      />

      <Divider />

      <H2>퇴직소득세 얼마나 나오나요?</H2>
      <p style={body}>
        퇴직금과 근속기간을 넣으면 대략적인 세금을 볼 수 있어요. 정확한 수치는 공제 구조가 복잡해서
        국세청 홈택스 모의계산이 가장 정확해요. 여기서는 어느 정도 수준인지 감 잡는 용도로 쓰세요.
      </p>
      <p style={body}>
        근속 10년과 20년을 바꿔가면서 비교해보면 세금 차이가 확 느껴져요.
        오래 근무한 사람일수록 같은 퇴직금에 세금이 적어요.
      </p>

      <SectionBadge>퇴직소득세 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수공제+환산급여공제 적용 추정치. 정확한 계산은 국세청 홈택스 모의계산 이용."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>세금 확인에 필요한 서류</H2>
      <p style={body}>
        퇴직소득세 검증의 핵심은 원천징수영수증이에요. 세금이 어떻게 계산됐는지 항목별로 적혀 있어요.
        퇴직 후에도 언제든 회사에 재발급 요청할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>세금 잘못 냈다면 환급받는 절차</H2>
      <p style={body}>
        원천징수영수증을 받아서 세금이 이상하다 싶으면 바로 확인해봐야 해요.
        근속연수를 잘못 기재하거나 공제 항목이 빠진 경우가 실제로 있어요.
        차이가 크면 수십~수백만 원이 걸리는 문제예요.
      </p>
      <p style={body}>
        경정청구는 어렵지 않아요. 홈택스에서 온라인으로 신청할 수 있고 세무사가 없어도 돼요.
        법정 기한 5년이 지나면 청구권이 사라지니 퇴직 후 미루지 않는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직소득세 처리 체크리스트</H2>
      <p style={body}>
        퇴직 후 세금 관련해서 챙겨야 할 것들이에요. 하나씩 확인해두면 나중에 환급 청구하거나
        IRP 절세 혜택 받을 때 빠르게 처리할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 연금 수령 = 퇴직소득세 30% 절감">
        55세 이후 연금으로 나눠 받으면 퇴직소득세가 30% 줄어요.<br />
        10년 이상 수령하면 40% 감면까지 가능해요.<br />
        퇴직금이 클수록 이 차이가 커지죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직소득세에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 한도 변경이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
