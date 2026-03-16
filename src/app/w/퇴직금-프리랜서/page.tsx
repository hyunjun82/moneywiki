"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "프리랜서로 계약하고 있지만 실제로는 회사 지시를 받아요" },
  { id: "c2", label: "출퇴근 시간이 정해져 있고 업무 방식도 지시받아요" },
  { id: "c3", label: "1년 이상 같은 회사에서 일했어요" },
  { id: "c4", label: "근로자성을 인정받아 퇴직금을 받고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 600, step: 50, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "같은 업체 계약 기간", min: 1, max: 10, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연간 퇴직금 적립액",
    getValue: (v: Record<string, number>) => v.monthly * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "업무 지시 이메일·메신저 기록", required: true, where: "본인 보관 (카카오톡·슬랙·이메일)" },
  { name: "출퇴근 기록 또는 근태 관련 자료", required: true, where: "회사 시스템 또는 직접 기록" },
  { name: "세금계산서·용역 계약서", required: false, where: "회사에서 수령한 계약서" },
  { name: "4대 보험 가입 여부 확인서", required: false, where: "국민건강보험공단 또는 근로복지공단" },
];

const STEPS = [
  {
    title: "근로자성 판단 기준 확인",
    desc: "계약 명칭이 '프리랜서'라도 실질적으로 사용자 지휘·감독 아래 근무했다면 근로자예요. 출퇴근 강제, 업무 방식 지시, 전속성(한 업체에서만 일함)이 핵심 기준이에요. 이 중 2가지 이상 해당하면 근로자로 인정될 가능성이 커요.",
    tip: "대법원은 실질적 근로관계를 계약 형식보다 우선해요",
  },
  {
    title: "증거 수집",
    desc: "업무 지시 내용이 담긴 카카오톡·이메일·슬랙 메시지를 캡처해 보관해요. 출퇴근 기록, 업무 보고 내역, 회사 시스템 접근 기록도 증거가 돼요. 계약서에 '근로자' 관련 조항이 있으면 더욱 유리해요.",
    tip: "증거는 퇴직 전에 미리 저장해두세요",
  },
  {
    title: "고용노동부 진정 또는 노동위원회 신청",
    desc: "고용노동부에 퇴직금 청구 진정을 낼 수 있어요. 근로자성이 인정되면 퇴직금 지급 명령이 내려져요. 회사가 이의를 제기하면 노동위원회나 법원에서 다툴 수 있어요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 진정 가능",
  },
  {
    title: "퇴직금 수령",
    desc: "근로자성이 인정되면 근속기간 전체에 대한 퇴직금을 받을 수 있어요. 300만원 초과 시 IRP 계좌로 수령해요. 퇴직소득세 원천징수 후 지급돼요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직 후에도 청구 가능해요",
  },
];

const CHECKLIST = [
  "근로자성 판단 — 출퇴근 강제·업무 지시·전속성 여부",
  "증거 수집 — 업무 지시 메시지·출퇴근 기록",
  "고용노동부 진정 — 근로자성 인정 신청",
  "소멸시효 — 퇴직 후 3년 이내 청구",
  "IRP 계좌 — 300만원 초과 수령 시 필수",
];

const FAQS = [
  {
    q: "프리랜서 계약서를 썼는데 퇴직금을 받을 수 있나요?",
    a: "계약 명칭보다 실제 근무 형태가 중요해요. 회사 지시를 받고, 출퇴근이 강제되고, 전속적으로 일했다면 근로자로 인정될 수 있어요. 대법원도 이 기준을 여러 차례 인정했어요.",
  },
  {
    q: "프리랜서 근로자성 판단 기준이 뭔가요?",
    a: "출퇴근 강제, 업무 방식·시간 지시, 전속성(한 곳에서만 일), 재료·장비 제공 여부, 보수의 성격(시급·월급) 등을 종합적으로 봐요. 여러 기준 중 상당수가 충족되면 근로자로 볼 수 있어요.",
  },
  {
    q: "특수고용직(보험설계사·학습지교사 등)도 퇴직금을 받나요?",
    a: "업종에 따라 달라요. 일부 특수고용직은 근로자성이 인정돼 퇴직금을 받을 수 있어요. 대법원 판례가 쌓이면서 보험설계사, 골프장 경기보조원 등의 근로자성이 인정된 사례도 있어요.",
  },
  {
    q: "퇴직금 청구 시 회사가 거부하면 어떻게 하나요?",
    a: "고용노동부에 진정을 내면 근로감독관이 조사해요. 근로자성이 인정되면 퇴직금 지급 명령이 내려지고, 불이행 시 형사 처벌 대상이 돼요. 법원 소송도 선택할 수 있어요.",
  },
  {
    q: "3.3% 원천징수를 했으면 근로자가 아닌가요?",
    a: "아니에요. 세금 처리 방식은 근로자성 판단에 영향을 주지 않아요. 사업소득세 3.3% 원천징수를 했더라도 실질적으로 근로자면 퇴직금 청구가 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 특수형태근로종사자 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "프리랜서-퇴직금-지급기준", title: "프리랜서 퇴직금 지급기준", description: "근로자성 인정 기준을 상세히 설명해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 주 15시간 요건과 예외." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  const sidebar = (
    <Sidebar
      heading="퇴직금 가이드"
      items={퇴직금_SIDEBAR}
      currentSlug="퇴직금-프리랜서"
    />
  );

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        퇴직금 · 프리랜서 · 근로자성
      </p>

      {/* 제목 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, color: "#111827", marginBottom: 6 }}>
        프리랜서도 퇴직금을 받을 수 있나요?
      </h1>
      <p style={{ fontSize: 19, fontWeight: 500, color: "#374151", marginBottom: 20 }}>
        근로자성 판단 기준부터 청구 방법까지
      </p>

      {/* 인트로 */}
      <p style={{ ...body, marginBottom: 12 }}>
        계약서에 &lsquo;프리랜서&rsquo;라고 적혀 있어도 퇴직금을 받을 수 있는 경우가 있어요. 실제로 회사의 지시를 받고, 출퇴근이 강제됐고, 1년 이상 일했다면 법적으로는 근로자로 볼 수 있기 때문이에요. <a href="/w/퇴직금-조건" style={{ color: "#1D9E75" }}>퇴직금 지급 조건</a>은 계약 형식이 아니라 실질적인 근무 형태로 판단해요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        대법원은 오래전부터 &ldquo;계약 명칭이 도급이나 위임이더라도 실질이 근로관계면 근로자&rdquo;라는 입장을 유지하고 있어요. 이 기준을 알면 프리랜서로 일했던 기간의 퇴직금도 청구할 수 있어요.
      </p>

      <ArticleAd position="intro" />

      {/* H2-1 */}
      <H2>언제 프리랜서도 퇴직금을 받을 수 있나요?</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        핵심은 &lsquo;실질&rsquo;이에요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75" }}>근로기준법 제2조</a>는 근로자를 &ldquo;사용자 아래서 임금을 목적으로 근로를 제공하는 사람&rdquo;으로 정의해요. 계약서 제목이 아닌, 실제로 어떻게 일했느냐가 기준이 돼요. 출퇴근 시간이 정해져 있고, 업무 방식을 지시받고, 그 업체에서만 전속으로 일했다면 근로자성이 인정될 수 있어요.
      </p>
      <GreenBox>
        <strong>근로자성 3대 핵심 기준</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
          <li><strong>출퇴근 강제</strong> — 정해진 시간에 출근·퇴근 의무가 있어요</li>
          <li><strong>업무 지시</strong> — 업무 방식·절차를 사용자가 지시해요</li>
          <li><strong>전속성</strong> — 다른 업체 일 없이 한 곳에서만 일했어요</li>
        </ul>
      </GreenBox>
      <p style={{ ...body, marginTop: 12, marginBottom: 8 }}>
        이 세 가지 외에도 재료·장비를 회사가 제공했는지, 보수가 시간급·월급 성격인지, 계속성이 있는지도 판단 요소예요. 하나만 충족돼도 근로자가 되는 건 아니지만, 여러 요소가 겹칠수록 인정 가능성이 높아져요. 특수고용직인 보험설계사, 골프장 경기보조원도 대법원 판례에서 근로자성을 인정받은 사례가 있어요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        반대로 여러 업체와 동시에 계약하고, 작업 방식을 스스로 결정하고, 자신의 장비를 사용한다면 근로자성이 부정될 수 있어요. 판단이 어려울 때는 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75" }}>고용노동부 퇴직금 진정</a>을 내면 근로감독관이 직접 사실 조사를 해줘요.
      </p>

      {/* H2-2 */}
      <H2>근로자 인정 시 예상 퇴직금 계산해보세요</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        근로자성이 인정되면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75" }}>퇴직금은 평균임금 × 근속연수</a>로 계산돼요. 프리랜서 계약 기간 전체가 근속기간으로 인정되기 때문에, 오래 일했을수록 받을 수 있는 금액이 커요. 아래 계산기로 예상 금액을 먼저 확인해보세요.
      </p>
      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        이 금액은 세전 기준이에요. 실제 수령 시에는 퇴직소득세가 공제돼요. 300만원을 넘으면 IRP 계좌로 받아야 하고, IRP에서 인출할 때 세금이 정산돼요. 55세 이후에 찾으면 세율이 낮아지는 장점도 있어요.
      </p>

      {/* 섹션 2 끝 → 관련 글 */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <ArticleAd position="mid" />

      {/* H2-3 */}
      <H2>근로자성 증명에 필요한 서류</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        고용노동부에 진정을 낼 때 증거가 중요해요. 특히 업무 지시가 담긴 메신저 기록은 근로자성을 입증하는 강력한 증거예요. 퇴직 후에는 회사 시스템에 접근하기 어려우니, 재직 중에 미리 저장해두는 게 좋아요.
      </p>
      <DocTable docs={DOCS} />
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        세금계산서나 용역 계약서는 회사 측이 &lsquo;근로계약이 아니다&rsquo;라고 주장하는 근거로 쓸 수 있어요. 하지만 계약서 내용보다 실제 근무 형태가 우선이기 때문에, 실질적 지휘·감독 증거가 더 중요해요. 4대 보험에 가입돼 있었다면 근로자성을 뒷받침하는 추가 증거가 돼요.
      </p>

      {/* H2-4 */}
      <H2>프리랜서 퇴직금 청구 절차 4단계</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        처음부터 법원 소송을 할 필요는 없어요. 고용노동부 진정이 가장 빠르고 비용도 들지 않아요. 근로감독관이 사실 조사를 하고, 근로자성이 인정되면 회사에 퇴직금 지급을 명령해요. 회사가 불이행하면 형사 처벌까지 이어질 수 있어요.
      </p>
      <Steps steps={STEPS} />
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        소멸시효는 퇴직 후 3년이에요. 이미 일을 그만뒀더라도 3년이 지나지 않았다면 지금 바로 청구할 수 있어요. 퇴직일 기준으로 계산하니, 시간이 촉박하다면 서둘러 진정을 내는 게 좋아요.
      </p>

      {/* H2-5 */}
      <H2>프리랜서 퇴직금 체크리스트</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        근로자성 인정부터 퇴직금 수령까지 놓치면 안 되는 항목들이에요. 진정 전에 아래 리스트를 하나씩 점검해보세요. 특히 소멸시효와 IRP 계좌는 시간·금액 기준이 있으니 미리 챙겨야 해요.
      </p>
      <Checklist items={CHECKLIST} />
      <GreenBox style={{ marginTop: 16 }}>
        <strong>3.3% 사업소득세를 냈어도 퇴직금 청구 가능해요</strong>
        <p style={{ marginTop: 6, fontSize: 14 }}>
          세금 처리 방식은 근로자성 판단과 별개예요. 회사가 3.3% 사업소득세를 원천징수했더라도, 실질적으로 근로자였다면 퇴직금을 받을 수 있어요. 대법원도 이 입장을 여러 판결에서 확인했어요.
        </p>
      </GreenBox>
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        IRP 계좌는 퇴직금 300만원 초과 시 의무 수령 계좌예요. 아직 IRP 계좌가 없다면 은행이나 증권사에서 개설하면 돼요. 계좌 개설 자체는 무료이고, 개설 후 퇴직금 수령 전까지 운용할 필요는 없어요.
      </p>

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니, 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
