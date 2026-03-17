"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택 구입 계약을 했어요" },
  { id: "c2", label: "배우자 명의로도 주택이 없어요" },
  { id: "c3", label: "주택 매매계약서 또는 분양계약서가 있어요" },
  { id: "c4", label: "잔금일이 다음 달 이내예요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간 (중간정산까지)", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 가능 금액",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 근속기간 초기화",
    getValue: () => 0,
    format: () => "중간정산 후 근속기간 0년 재시작",
  },
];

const DOCS = [
  { name: "주택 매매계약서 또는 분양계약서", required: true, where: "부동산 계약 시 수령" },
  { name: "무주택 확인서 (주민등록등본)", required: true, where: "정부24에서 무료 발급" },
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 양식" },
  { name: "금융기관 대출 확인서 (전세 사유 시)", required: false, where: "은행 또는 금융기관" },
];

const STEPS = [
  {
    title: "무주택 요건 확인",
    desc: "주택 구입 중간정산은 무주택 근로자만 가능해요. 본인·배우자 명의로 주택이 없어야 해요. 이미 주택이 있으면 이 사유로는 신청할 수 없어요.",
    tip: "주민등록등본으로 무주택 확인 가능해요",
  },
  {
    title: "주택 계약서 준비",
    desc: "주택 매매계약서 또는 분양계약서가 필요해요. 계약서에 본인이 매수인으로 기재돼야 해요. 전세 보증금 부족 사유도 가능하지만 별도 요건이 있어요.",
    tip: "계약일 기준으로 중간정산을 신청해야 해요",
  },
  {
    title: "인사팀에 신청서 제출",
    desc: "중간정산 신청서와 주택 계약서, 무주택 확인서를 인사팀에 제출해요. 회사가 정당한 이유 없이 거부하면 위법이에요. 승인 후 퇴직소득세를 원천징수하고 지급해요.",
    tip: "신청서·증빙을 한 세트로 제출하면 처리가 빨라요",
  },
  {
    title: "퇴직소득세 납부 및 수령",
    desc: "중간정산 금액에 퇴직소득세가 원천징수돼요. 이후 근속기간은 0년으로 재시작해요. 300만원 초과 시 IRP 계좌로 수령 후 인출할 수 있어요.",
    tip: "중간정산 후 퇴직금이 다시 쌓이기 시작해요",
  },
];

const CHECKLIST = [
  "무주택: 본인·배우자 명의 주택 없음",
  "주택 계약서: 매매·분양계약서 사본",
  "무주택 확인서: 주민등록등본",
  "중간정산 신청서: 인사팀 양식",
  "근속기간 초기화: 정산 후 재시작",
];

const FAQS = [
  {
    q: "주택 구입 중간정산 조건이 뭔가요?",
    a: "무주택 근로자가 주택을 구입할 때 신청할 수 있어요. 본인·배우자 명의로 주택이 없어야 해요. 주택 매매계약서가 있어야 해요.",
  },
  {
    q: "전세 계약도 중간정산이 가능한가요?",
    a: "전세보증금 마련 목적으로도 가능해요. 다만 무주택 요건과 전세보증금 부족 증빙이 필요해요.",
  },
  {
    q: "중간정산하면 세금이 얼마나 나오나요?",
    a: "중간정산 금액에 퇴직소득세가 원천징수돼요. 근속연수 공제가 적용돼서 세율이 높지 않아요. 근속기간이 길수록 공제액이 커요.",
  },
  {
    q: "중간정산 후 다시 퇴직금이 쌓이나요?",
    a: "맞아요. 중간정산 후 근속기간이 0년으로 초기화되고 다시 적립이 시작돼요.",
  },
  {
    q: "회사가 거부하면 어떻게 하나요?",
    a: "법정 사유가 명확하면 회사가 거부할 수 없어요. 거부 시 고용노동부에 진정을 낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "중간정산 조건 전체", description: "법정 허용 사유 5가지 정리." },
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 전체 안내", description: "신청 방법부터 절차까지." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 계산", description: "원천징수 금액 미리 확인." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-주택구입" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 주택구입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 구입할 때 퇴직금 중간정산이 가능한가요?<br />
        무주택 요건부터 신청 절차, 세금까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 사려는데 자금이 부족할 때 퇴직금을 미리 받을 수 있는지 궁금하죠? 무주택 근로자가 주택을 구입할 때는
        <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>이 법적으로 허용돼요.
        주택 매매계약서와 무주택 확인서를 준비해서 회사에 신청하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주택 구입 중간정산, 어떤 조건이 필요한가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에 따르면,
        무주택 근로자가 본인 명의로 주택을 구입하는 경우 퇴직금 중간정산을 신청할 수 있어요.
        '무주택'이란 신청일 기준으로 본인과 배우자 명의로 주택이 없는 상태를 말해요.
      </p>
      <p style={body}>
        주택 구입 외에 전세보증금이 부족한 경우도 같은 조항으로 신청할 수 있어요.
        이미 주택을 갖고 있거나 배우자 명의 주택이 있다면 이 사유로는 신청이 안 돼요.
      </p>

      <GreenBox title="주택 구입 중간정산 핵심 조건">
        · 본인·배우자 명의 주택 없음 (무주택)<br />
        · 주택 매매계약서 또는 분양계약서 보유<br />
        · 해당 주택이 본인 명의로 계약될 것<br />
        · 재직 중인 근로자 (퇴직 후 신청 불가)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="주택 구입 중간정산 신청 조건에 해당해요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="일부 조건이 맞지 않아요. 고용노동부(1350) 또는 인사팀에 먼저 확인하세요."
      />

      <Divider />

      <H2>중간정산 금액, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        퇴직금 중간정산 금액은 기본적으로 '1일 평균임금 × 30일 × 근속연수' 공식으로 계산해요.
        월 평균급여와 중간정산 시점까지의 근속기간을 입력하면 대략적인 금액을 확인할 수 있어요.
      </p>

      <SectionBadge>중간정산 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 금액은 평균임금(상여금·수당 포함) 기준으로 달라질 수 있어요. 정확한 금액은 인사팀에 문의하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        서류 준비가 가장 중요해요. 하나라도 빠지면 회사에서 반려할 수 있고, 그러면 주택 잔금일을 맞추기 어려워질 수 있어요.
        잔금일까지 여유가 충분하지 않을 때는 서류를 미리 준비해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        주민등록등본은 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 무료로 발급받을 수 있어요.
        중간정산 신청서 양식은 인사팀에 먼저 연락해서 받고, 서류를 한꺼번에 제출하면 처리 시간을 줄일 수 있어요.
      </p>

      <Divider />

      <H2>신청 절차를 단계별로 정리했어요</H2>
      <p style={body}>
        주택 계약서에 잔금일이 적혀 있죠? 그 날짜에 맞춰 역산해서 중간정산 신청을 시작해야 해요.
        회사마다 처리 기간이 다르지만 보통 1~2주는 잡아야 해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        퇴직소득세는 중간정산 금액에 바로 원천징수돼요. 세금이 얼마나 나오는지 미리 알고 싶다면
        <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산 글</a>에서 공제 구조와 계산 방법을 확인해보세요.
      </p>

      <Divider />

      <H2>신청 전 꼭 확인할 체크리스트</H2>
      <p style={body}>
        주택 잔금일을 앞두고 바빠지기 전에, 아래 체크리스트로 빠뜨린 게 없는지 먼저 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="중간정산 후 꼭 기억해야 할 것">
        · 근속기간이 0년으로 초기화돼요<br />
        · 퇴직소득세는 수령 금액에서 바로 차감돼요<br />
        · 중간정산 이후에도 퇴직금은 계속 쌓여요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주택 구입 중간정산에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
