"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 14일이 지났는데 퇴직금이 안 들어왔어요" },
  { id: "c2", label: "지급 기한 연장에 서면으로 합의한 적이 없어요" },
  { id: "c3", label: "퇴직금 300만원 초과라 IRP 계좌를 개설했어요" },
  { id: "c4", label: "아직 퇴직한 지 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    highlight: true,
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "총 청구 금액 (원금+이자)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 + v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직 확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "지급 요청 문자·메일 기록", required: false, where: "직접 캡처 보관" },
];

const STEPS = [
  {
    title: "14일 기한 확인",
    desc: "퇴직일 다음 날부터 14일째가 마감이에요. 3월 1일에 퇴직했다면 3월 15일이 기한이에요. 공휴일·주말도 기한에 포함되니까 예외가 없어요.",
    tip: "기한 계산: 퇴직일 다음 날부터 14일째",
  },
  {
    title: "지급 요청 문자 발송",
    desc: "14일이 지났다면 '○월 ○일 기준 14일 경과, 지급 요청' 문자를 발송해요. 날짜를 명시해서 증거를 남기는 게 중요해요. 구두 요청은 증거가 안 돼요.",
    tip: "날짜 명시해서 증거 남기기",
  },
  {
    title: "내용증명 발송",
    desc: "문자 발송 후에도 무응답이면 지연이자를 포함한 내용증명을 보내요. 카카오 전자내용증명으로 10분 안에 발송 가능해요. 지연이자 금액을 명시해야 효과적이에요.",
    tip: "카카오 전자내용증명 이용 가능",
  },
  {
    title: "고용노동부 진정",
    desc: "임금체불 진정을 접수할 때 '지연이자 청구' 항목을 명시해야 해요. 그냥 '퇴직금 못 받았다'만 적으면 이자는 빠질 수 있어요. 근로기준법 제37조, 연 20% 지연이자를 직접 써넣으세요.",
    tip: "minwon.moel.go.kr 온라인 접수 가능",
  },
];

const CHECKLIST = [
  "14일 기한: 퇴직일 다음 날부터 계산",
  "지급 요청: 문자·메일 증거 보관",
  "지연이자 명시: 내용증명에 연 20% 포함",
  "소멸시효 3년: 퇴직일 기준",
  "IRP 계좌: 300만원 초과 시 필수",
];

const FAQS = [
  {
    q: "14일 기한은 언제부터 세나요?",
    a: "퇴직일 다음 날부터 계산해요. 3월 1일 퇴직이면 3월 2일부터 세서 3월 15일이 기한이에요. 공휴일·주말도 포함돼요.",
  },
  {
    q: "기한 연장이 가능한가요?",
    a: "당사자 간 서면 합의가 있으면 연장 가능해요. 회사가 일방적으로 '다음 달에 준다'고 하는 건 법적 효력이 없어요.",
  },
  {
    q: "지연이자는 자동으로 받나요?",
    a: "자동 발생하지만 청구해야 받아요. 진정이나 소송에서 명시적으로 요청해야 해요.",
  },
  {
    q: "14일 초과했는데 회사가 자금 없다고 하면?",
    a: "그건 회사 사정이에요. 법적 의무는 변하지 않아요. 14일 초과한 순간부터 지연이자가 발생하고, 바로 신고 가능해요.",
  },
  {
    q: "회사가 폐업하면 퇴직금을 못 받나요?",
    a: "체당금 제도로 정부가 대신 지급해줘요. 고용노동부에 신청하면 퇴직금과 최근 임금 일부를 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 14일 이내 지급", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한", description: "14일 기한과 대응 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20%", description: "청구 방법과 계산법." },
  { slug: "퇴직금-지급-기한-연장-동의서", title: "지급 기한 연장 동의서", description: "서명 전 확인 사항과 거부 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기한-14일-원칙-지연이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 14일기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 14일 원칙, 넘기면 연 20%?<br />
        지연이자 계산법부터 신고 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직 후 14일 이내에 받아야 해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에
        명시된 기한이에요. 14일이 지나면 연 20% 지연이자가 붙기 시작해요. 1,000만원 퇴직금이 60일 지연되면 이자만 약 33만원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>14일 기한, 어디서 어떻게 세는 건가요?</H2>
      <p style={body}>
        퇴직일 다음 날부터 14일째가 지급 마감이에요. 3월 1일에 퇴직했다면 3월 15일이 기한이에요.
        공휴일이나 주말도 기한에 포함돼요. 단, 당사자 간 서면 합의가 있으면 기한을 연장할 수 있어요.
      </p>
      <p style={body}>
        회사가 전화나 말로 "다음 달에 주겠다"고 해도 법적 효력이 없어요.
        서면 합의 없이 14일이 지나면 그 순간부터 지연이자가 발생해요.
        "회사 자금이 없다"는 것도 기한 면제 사유가 아니에요.
      </p>

      <GreenBox title="14일 기한 계산 공식">
        퇴직일 + 1일 = 기산일 → 기산일부터 14일째 = 마감일<br />
        예) 3월 1일 퇴직 → 3월 2일 기산 → 3월 15일까지 지급 필수<br />
        ※ 공휴일·주말 포함, 서면 합의 시에만 연장 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 조건에 해당해요. 아래 계산기로 이자 금액을 확인하세요."
        partialMatchText="일부 조건이 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>지연이자 얼마나 붙을지 계산해보세요</H2>
      <p style={body}>
        연 20% 기준으로 하루하루 쌓여요. 미지급 퇴직금에 0.2를 곱하고 지연 일수를 365로 나누면 돼요.
        금액이 클수록, 기간이 길수록 이자도 눈덩이처럼 불어나요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 퇴직 후 14일 초과 시점부터 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>지연이자 청구에 필요한 서류</H2>
      <p style={body}>
        지급 요청 기록이 가장 중요해요. 문자나 메일로 남겨두면 분쟁 시 증거가 돼요.
        퇴직 확인서와 급여명세서는 퇴직금 금액과 기한 기산일을 증명해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>기한 넘겼을 때 단계별 대응 방법</H2>
      <p style={body}>
        막막하게 느껴지지만 순서대로 하면 어렵지 않아요. 첫 단계는 증거 남기기, 마지막 단계는 고용노동부 진정이에요.
        진정을 낼 때 지연이자 항목을 명시해야 이자도 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        진정을 내면 근로감독관이 사업주에게 연락해서 사실관계를 확인해요.
        소멸시효는 퇴직일부터 3년이에요. 3년이 지나면 청구권이 사라지니까 가능한 빨리 행동하는 게 맞아요.
      </p>

      <Divider />

      <H2>놓치기 쉬운 포인트 체크리스트</H2>
      <p style={body}>
        퇴직금 분쟁에서 패하는 이유 대부분은 증거 부족이에요.
        기한 계산을 잘못하거나 IRP 계좌 준비를 안 해서 입금 자체가 안 되는 경우도 많아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 계좌 준비 안 하면 입금 자체가 안 돼요">
        퇴직금 300만원 초과 시 IRP 계좌로만 수령 가능해요.<br />
        계좌가 없으면 회사가 입금 자체를 못 해요. 퇴직 전에 미리 개설하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한과 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
