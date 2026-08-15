"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 날로부터 14일이 지났어요" },
  { id: "c2", label: "아직 퇴직금이 입금되지 않았어요" },
  { id: "c3", label: "회사에 지급 요청했지만 계속 미루고 있어요" },
  { id: "c4", label: "기한 연장에 서면으로 동의한 적이 없어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (원금 + 이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "회사 인사팀" },
  { name: "퇴직일 증빙 (사직서 또는 해고통지서)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "지급 요청 문자·메일 기록", required: false, where: "직접 캡처 보관" },
  { name: "내용증명 발송 확인서 (해당자)", required: false, where: "우체국 또는 이메일 발송 기록" },
];

const STEPS = [
  {
    title: "14일 기한 정확히 계산",
    desc: "퇴직일 다음 날부터 14일째 되는 날이 지급 마감이에요. 3월 1일에 퇴직하면 3월 15일까지 입금이 돼야 해요. 주말·공휴일이 기한이어도 그날 안에 지급해야 하고, 미달 시 그 다음 날부터 지연이자가 붙어요.",
    tip: "퇴직일 당일은 포함하지 않아요. 다음 날부터 기산해요",
  },
  {
    title: "문자·메일로 지급 촉구",
    desc: "구두 요청은 증거가 안 돼요. '퇴직금 지급 기한이 지났다'는 내용을 문자나 이메일로 남겨두세요. '○월 ○일 퇴직 기준, 14일 기한인 ○월 ○일이 경과했다'고 날짜를 구체적으로 써야 해요. 이 단계에서 해결되는 경우가 많아요.",
    tip: "카카오톡보다 문자·메일이 법적 증거력이 더 높아요",
  },
  {
    title: "내용증명 발송",
    desc: "문자 요청 후 일주일이 지나도 응답이 없으면 내용증명을 보내요. '미지급 시 연 20% 지연이자와 함께 고용노동부에 진정을 접수할 예정'이라는 내용으로 작성하면 충분해요. 내용증명은 소멸시효도 끊어줘서 3년 시효 연장 효과가 있어요.",
    tip: "카카오 전자내용증명(kakao.com/certifiedmail)으로 간편하게 발송 가능해요",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "그래도 지급이 안 되면 고용노동부 민원마당에서 온라인으로 임금체불 진정을 접수하세요. 근로감독관이 조사해 사업주에게 시정 명령을 내려요. 이행하지 않으면 3년 이하 징역 또는 2천만원 이하 벌금이 부과돼요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "퇴직일 기준 14일 계산: 퇴직 다음 날부터 기산",
  "IRP 계좌 개설 여부: 300만원 초과 퇴직금은 IRP로만 수령",
  "지급 요청 증거 보관: 문자·메일·카카오톡 캡처",
  "지연이자 계산: 14일 초과 시점부터 연 20% 적용",
  "내용증명 발송: 소멸시효 중단 효과",
  "소멸시효 3년: 퇴직일 기준 3년 내 청구 필수",
];

const FAQS = [
  {
    q: "퇴직금 지급 기한이 정확히 언제인가요?",
    a: "퇴사일 다음 날부터 14일째 되는 날까지예요. 근로기준법 제36조에 명시된 기한이고, 주말·공휴일도 예외 없어요. 3월 1일 퇴직이면 3월 15일이 마지막 기한이에요.",
  },
  {
    q: "지급 기한을 연장할 수 있나요?",
    a: "당사자 간 서면 합의가 있으면 연장할 수 있어요. 하지만 회사가 일방적으로 '다음 달에 준다'고 하는 건 합의가 아니에요. 반드시 근로자가 서면으로 동의해야 하고, 구두 동의는 효력이 없어요.",
  },
  {
    q: "지연이자는 자동으로 붙나요?",
    a: "법적으로는 자동 발생해요. 하지만 실제로 받으려면 진정이나 소송 과정에서 명시적으로 청구해야 해요. 고용노동부에 진정할 때 지연이자도 함께 요청한다고 써야 받을 수 있어요.",
  },
  {
    q: "회사가 '자금이 없다'고 하면 어떻게 하나요?",
    a: "회사 사정은 법적 의무를 바꾸지 않아요. 14일이 지나면 이유 없이 위법이에요. 내용증명을 보내고 고용노동부에 진정을 접수하면 돼요. 회사가 폐업했다면 체당금 제도로 정부가 대신 지급해요.",
  },
  {
    q: "퇴직금 청구권 소멸시효가 있나요?",
    a: "퇴직일로부터 3년이에요. 3년이 지나면 청구권 자체가 소멸해서 받을 수 없어요. 내용증명 발송이나 진정 접수로 시효를 끊을 수 있으니 늦어도 3년 안에는 행동해야 해요.",
  },
  {
    q: "고용노동부 진정을 넣으면 얼마나 걸리나요?",
    a: "보통 2~4주 안에 근로감독관이 사업주를 조사해요. 사업주가 시정하면 바로 지급받고, 거부하면 형사 처벌 절차로 넘어가요. 진정 접수 자체는 온라인으로 10분이면 끝나요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 14일 이내 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 제9조: 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직금 지급 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "지연이자 계산법과 실제 청구 방법을 정리했어요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 진정 접수부터 처리 과정까지 안내해요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년, 시효 끊는 방법", description: "청구권이 사라지기 전에 해야 할 행동 정리해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금이 14일째 안 들어왔어요<br />
        지연이자 계산부터 신고 기한까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴사 후 14일 안에 줘야 해요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에
        명시된 기한이고, 단 하루라도 넘기면 위법이에요. 14일이 지나는 순간부터{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 자동으로 붙고,
        계속 버티면 형사 처벌까지 가능해요. 지금 당장 어떻게 해야 하는지 단계별로 안내할게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 14일 기한이 지난 상황인가요?</H2>
      <p style={body}>
        14일 기한은 퇴직일 다음 날부터 시작해요. 3월 1일에 퇴직했다면 3월 2일이 기산일이고,
        3월 15일까지 입금이 없으면 그 다음 날인 3월 16일부터 지연이자가 붙어요.
        IRP 계좌로 받든, 일반 계좌로 받든 기한은 똑같아요.
      </p>
      <p style={body}>
        당사자 간 서면 합의가 있으면 기한을 늘릴 수는 있어요. 하지만 회사가 구두로 "다음 달에 주겠다"고 한 건
        합의가 아니에요. 서면 없이는 효력이 없고, 기한 초과 상태 그대로예요.
        구두로 동의해줬더라도 서면이 없으면 법적으로 연장된 게 아니에요.
      </p>

      <GreenBox>
        퇴직일 당일은 포함하지 않아요. 다음 날부터 14일을 세요.<br />
        14일 초과 시 그 다음 날부터 연 20% 지연이자 발생<br />
        청구권 소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구와 신고가 가능한 상황이에요. 아래 계산기로 받을 수 있는 이자를 먼저 확인해보세요."
        partialMatchText="상황에 따라 대응 방법이 달라질 수 있어요. 고용노동부(1350)에 먼저 상담해보세요."
      />

      <Divider />

      <H2>지연이자, 얼마나 붙는 걸까?</H2>
      <p style={body}>
        14일을 넘기면 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>에
        따라 연 20% 이자가 붙어요. 퇴직금 500만원을 60일 지연하면 이자만 약 16만원이 쌓여요.
        지연 기간이 길어질수록 금액이 커지니까 빨리 청구하는 게 유리해요.
      </p>
      <p style={body}>
        이자는 법적으로 자동 발생하지만, 실제로 받으려면 진정이나 소송 과정에서 명시적으로 청구해야 해요.
        고용노동부에 진정할 때 "지연이자 포함 청구"라고 반드시 써주세요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 퇴직 후 14일 초과 시점부터 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신고에 필요한 서류</H2>
      <p style={body}>
        서류가 많지 않아도 진정 접수는 가능해요. 핵심은 두 가지예요.
        내가 이 회사에서 일했다는 근무 증빙, 그리고 퇴직금이 아직 안 들어왔다는 미지급 사실이에요.
      </p>
      <p style={body}>
        지급 요청 문자나 메일은 필수는 아니지만, 있으면 훨씬 유리해요.
        회사가 "요청받은 적 없다"고 발뺌할 때 반박 증거가 돼요.
        지금 당장 캡처해서 따로 저장해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>14일 초과 시 신고 절차 4단계</H2>
      <p style={body}>
        단계를 순서대로 밟으면 대부분 2~3단계에서 해결돼요.
        증거가 쌓이면서 협상력도 올라가고, 회사가 지급을 미룰 명분이 없어져요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 체크리스트</H2>
      <p style={body}>
        빠르게 처리하려면 아래 항목을 미리 챙겨두세요.
        소멸시효 3년을 놓치면 퇴직금 자체를 못 받을 수 있어서 신속하게 행동하는 게 중요해요.
      </p>

      <SectionBadge>대응 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금과 지연이자 청구권 모두 퇴직일로부터 3년이 지나면 소멸해요.<br />
        내용증명 발송이나 진정 접수만 해도 시효가 끊기고 새로 3년이 시작돼요.<br />
        미루지 말고 지금 바로 기록을 남겨두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한과 지연이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 및 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
