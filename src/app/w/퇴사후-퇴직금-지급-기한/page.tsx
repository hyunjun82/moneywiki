"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사 후 14일이 지났는데 퇴직금이 안 왔어요" },
  { id: "c2", label: "회사가 지연이자를 줘야 하는지 궁금해요" },
  { id: "c3", label: "회사가 지급 연장에 동의를 요구하고 있어요" },
  { id: "c4", label: "퇴직한 지 3년이 안 됐어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "지연 일수", min: 15, max: 365, step: 5, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20% 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.20 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => v.amount * 10000 + Math.round(v.amount * 10000 * 0.20 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직확인서 또는 사직서 사본", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: false, where: "인사팀 또는 입사 시 수령본" },
  { name: "통장 거래내역 (미입금 확인용)", required: false, where: "인터넷뱅킹" },
];

const STEPS = [
  {
    title: "14일 경과 여부 확인",
    desc: "퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요. 14일이 지났는데 아무 연락도 없다면 체불 상태예요. 단, 당사자 합의로 지급 기한을 연장한 경우에는 연장된 기한을 기준으로 봐야 해요.",
    tip: "합의 없이 14일을 넘기면 연 20% 지연이자가 자동으로 발생해요",
  },
  {
    title: "내용증명 발송",
    desc: "퇴직금 지급을 공식적으로 요청하려면 내용증명을 보내요. 내용증명은 우체국이나 법원 인터넷우체국에서 보낼 수 있어요. 요청일, 미지급 금액, 지급 요청 기한을 명시해요.",
    tip: "내용증명은 나중에 법적 분쟁 시 증거가 돼요",
  },
  {
    title: "고용노동청 진정",
    desc: "내용증명 후에도 지급하지 않으면 관할 고용노동청에 체불 진정을 내요. 고용24 온라인이나 방문으로 접수할 수 있어요. 접수 후 근로감독관이 조사해서 지급 명령을 내려요.",
    tip: "고용24(work.go.kr)에서 온라인 진정 접수 가능",
  },
  {
    title: "소액심판 또는 민사소송",
    desc: "노동청 진정으로도 해결이 안 되면 법원에 소액심판(3,000만원 이하) 또는 민사소송을 제기해요. 지연이자(연 20%)까지 함께 청구할 수 있어요. 소멸시효는 퇴직일로부터 3년이에요.",
    tip: "3,000만원 이하라면 소액심판이 빠르고 저렴해요",
  },
];

const CHECKLIST = [
  "지급 기한 14일 — 퇴직일 기준 경과 여부 확인",
  "지연이자 — 14일 초과 시 연 20% 자동 발생",
  "내용증명 — 지급 요청 공식 기록",
  "고용노동청 진정 — 고용24 온라인 접수",
  "소멸시효 — 퇴직일로부터 3년 이내",
];

const FAQS = [
  {
    q: "퇴사 후 14일이 지났는데 퇴직금이 안 오면 무조건 위법인가요?",
    a: "당사자 합의 없이 14일을 넘기면 위법이에요. 다만 근로자와 사업주가 서면으로 지급 기한을 연장하기로 합의하면 합법이에요. 회사가 일방적으로 늦추면 체불에 해당해요.",
  },
  {
    q: "지연이자 연 20%는 언제부터 계산하나요?",
    a: "14일이 지난 다음 날부터 실제 지급일까지 연 20%를 계산해요. 예를 들어 1,000만원이 30일 지연됐다면 약 16만원의 지연이자가 발생해요.",
  },
  {
    q: "회사가 지급 동의서에 서명하라고 하면 어떻게 해야 하나요?",
    a: "지급 기한 연장 동의서에 서명하면 기한 내 지급이라는 법적 의미를 가져요. 서명 전에 내용을 꼼꼼히 확인하고, 이자 포기 조항이 들어 있으면 서명하지 마세요.",
  },
  {
    q: "퇴사한 지 1년이 됐는데 아직도 받을 수 있나요?",
    a: "가능해요. 퇴직금 청구권 소멸시효는 3년이에요. 퇴직 후 3년이 지나지 않았다면 고용노동청 진정이나 소액심판으로 청구할 수 있어요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 일반 계좌로 받았는데 문제가 있나요?",
    a: "300만원 초과 퇴직금을 IRP 아닌 계좌로 받은 경우 회사 측 위반이에요. 퇴직금을 받은 근로자에게는 불이익이 없지만, 회사는 위법 처리될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 이내 지급)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조 — 미지급 임금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 온라인 체불 진정 접수", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "14일 초과 시 지연이자 청구법." },
  { slug: "퇴직금-미지급-청구-기한-지연이자", title: "퇴직금 미지급 청구 기한", description: "소멸시효 3년과 지연이자 계산." },
  { slug: "퇴직금-지급-청구-방법", title: "퇴직금 청구 방법", description: "내용증명·노동청 신고·소송 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴사후-퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 14일규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴사 후 퇴직금 지급 기한, 14일을 넘기면 어떻게 되나요?<br />
        지연이자·내용증명·고용노동청 신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에 명시된 규정이에요.
        14일을 넘기면 연 20%의 지연이자가 자동으로 발생하고, <a href="/w/퇴직금-지급-청구-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동청 신고</a>나 소액심판으로 청구할 수 있어요.
        퇴직한 지 3년이 지나지 않았다면 지금도 청구 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>14일 규정, 정확히 어떻게 적용되나요?</H2>
      <p style={body}>
        퇴직금은 퇴직일 기준으로 14일 이내에 지급해야 해요. 퇴직일이 공휴일이어도 같아요.
        단, 근로자와 사업주가 서면으로 지급 기한 연장에 합의하면 합법적으로 늦출 수 있어요.
        이 합의 없이 14일을 넘기면 체불에 해당하고 형사 고발도 가능해요.
      </p>
      <p style={body}>
        회사가 동의서 서명을 요구하면 내용을 꼼꼼히 읽어보세요.
        이자 포기 조항이 있다면 사실상 지연이자 청구권을 잃는 거예요.
        서명 전에 불이익이 없는지 반드시 확인하세요.
      </p>

      <GreenBox title="퇴직금 지급 기한 핵심 규정">
        지급 기한: 퇴직일로부터 14일 이내 (근로기준법 제36조)<br />
        지연이자: 14일 초과 시 연 20% (근로기준법 제37조)<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 조건에 해당해요. 아래 계산기로 금액을 확인하고 대응하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>지연이자 얼마나 되나요?</H2>
      <p style={body}>
        14일이 지난 날부터 실제 지급일까지 연 20%로 계산해요.
        미지급 퇴직금과 지연 일수를 입력하면 지연이자를 바로 확인할 수 있어요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 14일 초과일부터 실제 지급일까지 연 20% 적용 (근로기준법 제37조 및 근로기준법 시행령 제18조)."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        퇴직확인서와 급여명세서가 핵심이에요.
        고용노동청 진정이나 소액심판 시 미지급 사실을 입증하는 서류가 필요해요.
        통장 거래내역으로 미입금 사실을 증명할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 지연 시 대응 절차 4단계</H2>
      <p style={body}>
        내용증명부터 소액심판까지 단계별로 대응하면 돼요.
        고용노동청 진정이 가장 빠르고 비용 없이 해결할 수 있는 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>대응 전 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 법적 청구가 어려워요. 지금 바로 행동하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="3년 이내라면 지금 청구해도 돼요">
        퇴직금 청구권 소멸시효는 3년이에요.
        퇴직한 지 1~2년이 지났어도 청구할 수 있어요.
        고용노동청 진정은 무료이고 온라인으로 바로 접수할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴사 후 퇴직금 지급 기한에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
