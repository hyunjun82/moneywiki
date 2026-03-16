"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "해고 통보를 받았어요" },
  { id: "c2", label: "해고 사유가 부당하다고 생각해요" },
  { id: "c3", label: "해고 시 퇴직금을 받을 수 있는지 궁금해요" },
  { id: "c4", label: "해고예고수당이 무엇인지 알고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "해고 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "해고예고수당 (30일분, 30일 전 통보 없을 시)",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "해고 통보서 또는 해고 통지 문자·이메일", required: true, where: "회사로부터 수령" },
  { name: "근로계약서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "해고 정당성 확인",
    desc: "해고는 정당한 이유가 있어야 해요. 단순 성격 차이, 능률 저하, 경영상 어려움만으로는 해고가 어려워요. 서면 통지 없는 해고도 절차 위반이에요. 부당해고라면 노동위원회에 구제신청을 할 수 있어요.",
    tip: "해고 통보는 반드시 서면으로 이유를 명시해야 해요",
  },
  {
    title: "퇴직금과 해고예고수당 확인",
    desc: "해고여도 1년 이상 근무했다면 퇴직금을 받아야 해요. 해고 30일 전 예고 없이 즉시 해고하면 30일분 통상임금을 해고예고수당으로 받을 수 있어요. 퇴직금은 해고 후 14일 이내에 지급해야 해요.",
    tip: "해고예고수당은 즉시 해고 시에만 발생해요",
  },
  {
    title: "부당해고 구제신청",
    desc: "해고일로부터 3개월 이내에 노동위원회에 구제신청을 할 수 있어요. 구제 인정 시 원직 복직 또는 해고 기간 임금 상당액을 받을 수 있어요. 5인 미만 사업장은 부당해고 구제신청이 불가하지만 민사소송은 가능해요.",
    tip: "3개월 기한이 지나면 구제신청이 불가해요 — 바로 신청하세요",
  },
  {
    title: "실업급여 신청",
    desc: "해고는 비자발적 이직이어서 실업급여 수급 자격이 생겨요. 고용보험 피보험기간 180일 이상이면 신청 가능해요. 퇴직일 다음 날부터 12개월 이내에 신청해야 해요.",
    tip: "고용24(www.work24.go.kr)에서 실업급여 신청 가능",
  },
];

const CHECKLIST = [
  "퇴직금 — 해고여도 1년 이상이면 지급 의무",
  "해고예고수당 — 30일 전 예고 없으면 30일분 통상임금",
  "부당해고 구제신청 — 해고일로부터 3개월 이내",
  "실업급여 — 해고 시 바로 신청 가능",
  "퇴직금 지급 기한 — 해고 후 14일 이내",
];

const FAQS = [
  {
    q: "해고당해도 퇴직금을 받을 수 있나요?",
    a: "맞아요. 해고는 근로 종료 사유 중 하나이고, 1년 이상 근무했다면 퇴직금 지급 의무가 있어요. 징계 해고여도 동일해요.",
  },
  {
    q: "즉시 해고를 당했어요, 무엇을 더 받을 수 있나요?",
    a: "30일 전 예고 없이 즉시 해고하면 30일분 통상임금(해고예고수당)을 받을 수 있어요. 퇴직금과 별개로 추가 청구 가능해요.",
  },
  {
    q: "부당해고라고 생각해요, 어떻게 해야 하나요?",
    a: "해고일로부터 3개월 이내에 지방노동위원회에 부당해고 구제신청을 해야 해요. 구제 인정 시 복직 또는 임금 상당액을 받을 수 있어요.",
  },
  {
    q: "해고 통보를 말로만 받았는데 유효한가요?",
    a: "아니에요. 해고는 서면으로 해고 사유와 시기를 명시해야 해요. 서면 통지 없는 해고는 절차 위반으로 부당해고에 해당할 수 있어요.",
  },
  {
    q: "5인 미만 사업장에서 해고당했어요",
    a: "5인 미만은 근로기준법 부당해고 조항(제23조)이 적용 안 돼요. 노동위원회 구제신청도 불가해요. 하지만 퇴직금·해고예고수당 지급 의무는 있어요. 민사소송으로 다툴 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제23조 — 부당해고 금지", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제26조 — 해고예고 30일", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 부당해고 구제신청 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "해고 후 14일 이내 지급 원칙." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  const sidebar = <Sidebar data={퇴직금_SIDEBAR} currentSlug="퇴직금-해고" />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
        퇴직금 · 해고 · 권리
      </div>

      {/* 헤딩 */}
      <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.35, color: "#111827", marginBottom: 8 }}>
        해고당했어요, 퇴직금을 받을 수 있나요?
        <br />
        <span style={{ fontSize: 20, fontWeight: 600, color: "#1D9E75" }}>
          해고예고수당·부당해고 구제까지 한 번에
        </span>
      </h1>

      {/* 인트로 */}
      <p style={{ ...body, marginBottom: 12 }}>
        해고 통보를 받은 순간 머릿속이 하얘지죠. &ldquo;퇴직금은 받을 수 있을까?&rdquo;, &ldquo;말도 안 되는 이유로 잘렸는데 이게 부당해고 아닌가?&rdquo; 이런 질문들이 쏟아지는 게 당연해요. 결론부터 말하면, 해고여도 <strong>1년 이상 근무했다면 퇴직금은 받을 수 있어요.</strong> 근로기준법은 해고 사유와 무관하게 퇴직금 지급을 보장하거든요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        거기다 30일 전 예고 없이 즉시 해고당했다면 <strong>해고예고수당</strong>까지 추가로 청구할 수 있어요. 퇴직금과 별개로 한 달치 통상임금을 더 받는 거예요. 해고 후 어떤 돈을 청구할 수 있고, 부당해고라면 어떻게 싸워야 하는지 — 이 글에서 전부 정리할게요.
      </p>

      <ArticleAd position="intro" />

      {/* H2-1: 해고 시 받을 수 있는 것들 */}
      <H2>해고 시 받을 수 있는 것들</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        해고를 당하면 크게 세 가지를 청구할 수 있어요. 퇴직금, 해고예고수당, 실업급여예요. 각각 요건이 다르니 본인 상황에 맞는 걸 짚어보세요.
      </p>
      <GreenBox>
        <strong>퇴직금</strong> — 1년 이상 근무하면 해고여도 반드시 지급해야 해요. 징계 해고, 권고사직 모두 동일해요.<br /><br />
        <strong>해고예고수당</strong> — 30일 전 서면 예고 없이 즉시 해고하면 30일분 통상임금을 추가로 받아요. 퇴직금과 별개예요.<br /><br />
        <strong>실업급여</strong> — 해고는 비자발적 이직이어서 고용보험 180일 이상이면 바로 신청할 수 있어요.
      </GreenBox>
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        셋 중 가장 빠른 기한이 있는 게 부당해고 구제신청이에요. <strong>해고일로부터 3개월</strong>이 지나면 노동위원회에 신청 자체가 불가해요. 퇴직금이나 해고예고수당은 3년 안에 청구할 수 있지만, 부당해고 구제는 놓치면 되돌릴 수 없어요.
      </p>

      {/* H2-2: 퇴직금과 해고예고수당 계산 */}
      <H2>퇴직금과 해고예고수당 계산해보세요</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        내가 얼마나 받을 수 있는지 먼저 파악해야 회사와 협상할 때도 밀리지 않아요. 월 평균급여와 근속 기간을 입력하면 예상 퇴직금과 해고예고수당을 바로 볼 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        퇴직금은 <strong>30일분 평균임금 × 근속연수</strong>로 계산해요. 해고예고수당은 즉시 해고 시에만 발생하고, 30일분 통상임금이에요. 아래에서 직접 입력해보세요.
      </p>
      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <Divider />

      <RelatedArticles articles={RELATED} />

      {/* H2-3: 해고 관련 필요 서류 */}
      <H2>해고 관련 필요 서류</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직금 청구든 부당해고 구제신청이든, 서류 준비를 먼저 해야 해요. 해고 통보서는 특히 중요해요. 회사가 서면으로 통보하지 않았다면 카카오톡, 문자, 이메일이라도 캡처해두세요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        퇴직금은 300만원 초과 시 IRP 계좌로만 받을 수 있어요. 아직 IRP 계좌가 없다면 은행이나 증권사에서 미리 개설해두세요. 개설 자체는 무료예요.
      </p>
      <DocTable docs={DOCS} />

      <ArticleAd position="mid" />

      {/* H2-4: 해고 대응 절차 4단계 */}
      <H2>해고 대응 절차 4단계</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        해고 통보를 받은 직후 해야 할 일들을 순서대로 정리했어요. 머릿속이 혼란스러울 때일수록 단계별로 따라가는 게 실수를 줄여줘요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        특히 부당해고라고 느낀다면 3단계 구제신청 기한인 <strong>3개월</strong>을 절대 놓치면 안 돼요. 퇴직금 받는 것과 병행해서 진행할 수 있으니 동시에 챙기세요.
      </p>
      <Steps steps={STEPS} />

      {/* H2-5: 해고 시 체크리스트 */}
      <H2>해고 시 체크리스트</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        해고 후 챙겨야 할 것들을 한 번에 정리했어요. 하나씩 짚어가면서 빠뜨린 게 없는지 보세요.
      </p>
      <Checklist items={CHECKLIST} />
      <GreenBox style={{ marginTop: 16 }}>
        <strong>부당해고 구제신청 3개월 기한 주의</strong><br />
        해고일로부터 3개월이 지나면 노동위원회에 구제신청을 할 수 없어요. 부당해고라고 생각한다면 퇴직금 청구와 동시에 바로 신청하세요. 고용노동부(1350) 또는 지방노동위원회에 문의하면 절차를 안내받을 수 있어요.
      </GreenBox>
      <p style={{ ...body, marginTop: 12, marginBottom: 20 }}>
        퇴직금과 해고예고수당은 3년 소멸시효가 있어서 시간이 조금 있지만, 증거는 시간이 지날수록 없어져요. 급여명세서, 해고 통보 메시지, 근로계약서는 지금 바로 저장해두세요.
      </p>

      {/* H2-6: 자주 묻는 것들 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        해고를 당한 분들이 공통으로 궁금해하는 질문들을 모았어요. 내 상황과 비슷한 사례를 찾아보세요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <CategoryButton category="퇴직금" />

      <References sources={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
