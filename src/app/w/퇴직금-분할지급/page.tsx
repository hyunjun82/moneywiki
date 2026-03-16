"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 퇴직금을 나눠서 주겠다고 했어요" },
  { id: "c2", label: "퇴직 후 14일이 지났는데 아직 받지 못했어요" },
  { id: "c3", label: "분할지급 합의를 받아야 하는 상황인지 모르겠어요" },
  { id: "c4", label: "지연이자를 청구할 수 있는지 알고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 300, max: 10000, step: 300, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "지급 지연 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "합산 청구액 (퇴직금 + 지연이자)",
    getValue: (v: Record<string, number>) => v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "분할지급 합의서 (합의한 경우)", required: false, where: "회사와 작성" },
  { name: "퇴직금 미지급 확인서 또는 내용증명", required: true, where: "내용증명 우편 발송" },
  { name: "퇴직 증명서 또는 사직서 수리 확인", required: true, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "14일 기한 확인",
    desc: "회사는 퇴직 후 14일 이내에 퇴직금을 지급해야 해요. 14일이 지나면 지급 지체가 되고, 연 20% 지연이자가 자동으로 발생해요. 14일 이내라면 아직 위반은 아니지만, 지급 일정을 확인해야 해요.",
    tip: "14일은 근로자가 요청하지 않아도 자동으로 지급 의무 발생",
  },
  {
    title: "분할지급 합의 여부 결정",
    desc: "회사와 합의하면 분할지급이 가능해요. 단, 합의 없이 분할지급하면 위법이에요. 합의를 하더라도 지연이자 포기 조항을 넣으면 불리하니, 이자 조항을 빼고 합의하는 게 좋아요.",
    tip: "합의 시 지급 일정과 금액을 서면으로 남기세요",
  },
  {
    title: "내용증명 발송",
    desc: "14일이 지났는데 지급이 안 되면 내용증명으로 퇴직금과 지연이자 지급을 요청해요. 내용증명은 법적 청구 증거가 돼요. 발송 후에도 지급이 안 되면 고용노동부 진정을 낼 수 있어요.",
    tip: "내용증명은 우체국 방문 또는 온라인 우편서비스에서 발송 가능",
  },
  {
    title: "고용노동부 진정",
    desc: "고용노동부 민원마당에서 온라인 진정이 가능해요. 진정 접수 후 근로감독관이 회사를 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌 대상이 돼요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) — 온라인 24시간 신청 가능",
  },
];

const CHECKLIST = [
  "14일 기한 — 퇴직일 기준 달력으로 계산",
  "분할지급 합의 — 반드시 서면으로 작성",
  "지연이자 — 14일 초과 시 연 20% 자동 발생",
  "내용증명 — 지급 요청 증거 확보",
  "고용노동부 진정 — 민원마당 온라인 신청",
];

const FAQS = [
  {
    q: "퇴직금을 나눠 받는 게 가능한가요?",
    a: "근로자가 동의하면 분할지급 합의가 가능해요. 하지만 합의 없이 회사가 일방적으로 분할지급하면 위법이에요. 분할지급에 동의할 때는 이자와 지급 일정을 명확히 하세요.",
  },
  {
    q: "퇴직금 지연이자는 어떻게 계산하나요?",
    a: "연 20% 비율로 계산해요. 예를 들어 3,000만원을 30일 지연하면 약 49만원 이자가 발생해요. 퇴직 후 14일이 지난 날부터 실제 지급일까지 일 단위로 계산해요.",
  },
  {
    q: "회사 사정이 어려워 퇴직금을 못 준다고 하면?",
    a: "회사 사정과 무관하게 퇴직금은 지급 의무가 있어요. 폐업이나 도산 시에는 체당금 제도를 이용해 고용보험에서 일부 받을 수 있어요. 고용노동부(1350)에 문의하세요.",
  },
  {
    q: "분할지급 합의서에 서명했는데 후회돼요",
    a: "합의 내용이 퇴직금 포기나 지나친 이자 면제 조항이 있으면 무효가 될 수 있어요. 법률 전문가 상담을 받아보세요. 퇴직금 청구권은 법으로 보호되는 권리예요.",
  },
  {
    q: "퇴직금 소멸시효가 있나요?",
    a: "있어요. 퇴직 후 3년 이내에 청구해야 해요. 3년이 지나면 법적 청구가 어려워져요. 지연이자 청구도 동일하게 3년 이내예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조 — 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제9조 — 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
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
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "14일 기한과 지연이자 계산 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 청구", description: "연 20% 이자 계산 방법과 청구 절차." },
];

export default function Page() {
  const currentSlug = "퇴직금-분할지급";

  const sidebar = (
    <Sidebar
      items={퇴직금_SIDEBAR}
      currentSlug={currentSlug}
    />
  );

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 분할지급 · 지연이자
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, marginBottom: 8, color: "#111827" }}>
        회사가 퇴직금을 나눠 주겠다고 해요, 괜찮은 건가요?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#374151" }}>
          분할지급 합의 기준과 지연이자 청구 방법
        </span>
      </h1>

      {/* 인트로 */}
      <p style={{ ...body, marginBottom: 8 }}>
        퇴직금은 퇴직 후 14일 이내에 전액을 한 번에 받는 게 원칙이에요. 그런데 회사가 "사정이 어려우니 나눠서 주겠다"고 하면 어떻게 해야 할지 막막하죠.
      </p>
      <p style={{ ...body, marginBottom: 8 }}>
        결론부터 말하면, 근로자가 동의하지 않으면 분할지급은 위법이에요. 동의하더라도 14일이 지난 기간에 대해서는 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>를 청구할 수 있고요. 이 글에서 분할지급 합의 기준과 지연이자 계산 방법을 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* H2-1 */}
      <H2>퇴직금 분할지급, 원래 되는 건가요?</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 퇴직 후 14일 이내에 퇴직금을 전액 지급해야 한다고 규정해요. 이 기한은 근로자가 따로 요청하지 않아도 회사가 지켜야 하는 의무예요. 14일을 넘기면 그날부터 연 20% 지연이자가 자동으로 붙어요.
      </p>
      <p style={{ ...body, marginBottom: 12 }}>
        단, 근로자가 명시적으로 동의하면 분할지급 합의가 가능해요. 회사 사정이 어렵거나 근로자가 원할 경우에 해당하죠. 이때 합의서에 지급 일정, 금액, 이자 조항을 명확히 넣는 게 중요해요. 합의 없이 회사가 일방적으로 나눠 준다면, 그건 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급</a>과 동일하게 처리돼요.
      </p>

      <GreenBox title="분할지급 원칙 요약">
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          <li style={{ marginBottom: 4 }}>퇴직 후 14일 이내 전액 지급이 원칙</li>
          <li style={{ marginBottom: 4 }}>근로자 동의 없는 분할지급 = 위법</li>
          <li style={{ marginBottom: 4 }}>합의 시 지급 일정·금액·이자 조항 서면 작성 필수</li>
          <li>14일 초과분에 대해 지연이자(연 20%) 청구 가능</li>
        </ul>
      </GreenBox>

      <p style={{ ...body, marginTop: 12 }}>
        합의를 할 때 주의할 점이 있어요. 회사가 "이자 없이 나눠 받는 데 동의하세요"라고 요청할 수 있는데, 이 조항에 서명하면 불리해요. 이자 포기 조항은 빼고 지급 일정만 합의하는 게 근로자에게 유리해요.
      </p>

      <Divider />

      {/* H2-2 */}
      <H2>지연이자 얼마나 받을 수 있나요?</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 지연이자</a>는 연 20%로 고정돼 있어요. 근로기준법 제37조에 따른 비율이라 협상으로 줄일 수 없어요. 퇴직일로부터 14일이 지난 날부터 실제 지급일까지 일수를 계산해요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        예를 들어 퇴직금이 3,000만원인데 30일 지연됐다면, 이자는 약 49만원이에요. 지연 기간이 길수록 이자가 쌓이니, 지급이 늦어질수록 회사 부담이 커지는 구조예요. 아래 계산기로 직접 계산해 보세요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
      />

      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3 */}
      <H2>필요한 서류 목록</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        퇴직금 지급을 청구하거나 분할지급 합의를 진행할 때 필요한 서류예요. 미지급 상황이라면 내용증명과 퇴직 증명서가 핵심이에요. IRP 계좌는 퇴직금이 300만원을 넘으면 반드시 개설해야 해요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        분할지급에 합의한 경우에는 합의서를 별도로 작성해요. 합의서에는 각 회차 지급 날짜와 금액, 이자 조항 포함 여부를 명확하게 적어야 나중에 분쟁이 생겼을 때 증거가 돼요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4 */}
      <H2>분할지급 대응 절차 4단계</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        회사가 분할지급을 제안했거나 14일이 지나도 퇴직금을 못 받았다면, 아래 순서대로 대응하면 돼요. 내용증명 발송이 법적 절차의 시작이고, 그 이후 단계는 고용노동부가 직접 처리해요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        고용노동부 진정은 온라인으로 24시간 신청할 수 있어요. 직접 방문하지 않아도 되니까 절차 자체는 어렵지 않아요. 진정 접수 후 약 2~4주 이내에 근로감독관이 회사에 연락해요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton
        slug="퇴직금"
        label="퇴직금 전체 글 보기"
      />

      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* H2-5 */}
      <H2>분할지급 체크리스트</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        분할지급 합의 전에 아래 항목을 꼭 짚어보세요. 특히 이자 조항은 합의서 서명 전에 확인하는 게 중요해요. 한번 서명하면 번복하기 어려울 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        14일 기한은 달력으로 세는 달력일 기준이에요. 공휴일이나 주말도 포함돼요. 퇴직일이 월요일이면 14일 후인 다음 월요일까지 지급해야 해요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>합의 전 반드시 살펴볼 것</p>
        <p style={{ margin: 0 }}>
          분할지급 합의서에 서명하기 전, 지급 일정과 이자 조항을 꼭 읽어보세요. "이자 포기" 조항이 있으면 삭제 요청하거나 서명을 거부할 수 있어요. 지연이자는 법으로 정해진 권리예요.
        </p>
      </GreenBox>

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>

      <p style={{ ...body, marginBottom: 16 }}>
        분할지급과 지연이자에 대해 자주 나오는 질문을 정리했어요. 소멸시효 3년을 놓치면 청구 자체가 어려워지니, 지금 상황이라면 늦지 않게 대응하는 게 좋아요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
