"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "irp-퇴직금-인출";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 들어와 있어요" },
  { id: "c2", label: "급한 돈이 필요한 상황이에요" },
  { id: "c3", label: "55세가 안 됐어요" },
  { id: "c4", label: "중도 인출 시 세금이 어떻게 되는지 모르겠어요" },
];

const CALC_SLIDERS = [
  {
    key: "amount",
    label: "IRP 잔액",
    min: 500,
    max: 10000,
    step: 100,
    defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    key: "age",
    label: "현재 나이",
    min: 30,
    max: 70,
    step: 1,
    defaultValue: 45,
    format: (v: number) => `${v}세`,
  },
];

const CALC_RESULTS = [
  {
    key: "result1",
    label: "55세 이전 인출 시 세금 (기타소득세 16.5%)",
    highlight: true,
    getValue: (v: Record<string, number>) =>
      v.age < 55
        ? Math.round(v.amount * 10000 * 0.165)
        : Math.round(v.amount * 10000 * 0.033),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    key: "result2",
    label: "실수령액 (세후)",
    highlight: false,
    getValue: (v: Record<string, number>) => {
      const tax =
        v.age < 55
          ? Math.round(v.amount * 10000 * 0.165)
          : Math.round(v.amount * 10000 * 0.033);
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "IRP 계좌 정보", required: true, where: "IRP 개설 금융기관" },
  { name: "중도인출 신청서", required: true, where: "금융기관 앱 또는 방문" },
  { name: "사유 증빙 서류", required: false, where: "부득이한 사유 해당 시" },
];

const STEPS = [
  {
    title: "인출 사유 확인",
    desc: "부득이한 사유(무주택자 주택구입, 6개월 이상 요양 등)는 세금 혜택이 있어요.",
    tip: "부득이한 사유면 퇴직소득세만 적용",
  },
  {
    title: "세금 계산",
    desc: "55세 이전이면 기타소득세 16.5%, 55세 이후 연금소득세 3.3~5.5%예요.",
    tip: "세금 먼저 계산하고 인출 결정",
  },
  {
    title: "금융기관 신청",
    desc: "앱 또는 방문으로 신청하고, 부득이한 사유면 증빙 서류를 첨부해요.",
    tip: "앱으로 신청이 빠름",
  },
  {
    title: "세금 원천징수 후 지급",
    desc: "신청 후 2~3 영업일 내에 세금이 빠진 금액이 지급돼요.",
    tip: "세금이 빠진 금액이 실제 수령액",
  },
];

const CHECKLIST = [
  { id: "cl1", label: "나이 확인 — 55세 기준으로 세금이 달라져요" },
  { id: "cl2", label: "인출 사유 — 부득이한 사유면 세금 혜택이 있어요" },
  { id: "cl3", label: "세금 계산 — 기타소득세 16.5% vs 연금소득세 3.3%" },
  { id: "cl4", label: "부득이한 사유 증빙 — 해당 시 서류를 미리 준비해요" },
  { id: "cl5", label: "인출 전 연금 전환 검토 — 세금 차이가 크므로 신중히" },
];

const FAQS = [
  {
    q: "55세 이전에 IRP를 해지하면 세금이 얼마나 나오나요?",
    a: "기타소득세 16.5%가 원금 전체에 부과돼요. 퇴직소득세와 별도라 세금 부담이 커요.",
  },
  {
    q: "부득이한 사유가 정확히 어떤 경우인가요?",
    a: "무주택자 주택 구입, 6개월 이상 요양, 파산·개인회생, 천재지변 등이에요.",
  },
  {
    q: "부분 인출도 가능한가요?",
    a: "부득이한 사유에 한해 일부 인출이 가능해요. 일반 중도 인출은 전액 해지만 가능해요.",
  },
  {
    q: "인출 후 다시 IRP에 납입할 수 있나요?",
    a: "해지 후 재가입은 가능해요. 하지만 중도 인출로 인한 세금은 돌아오지 않아요.",
  },
  {
    q: "연금 수령 시 세금이 정말 3.3%밖에 안 되나요?",
    a: "55세 이후 10년 이상 분산 수령 시 3.3~5.5%예요. 일시 인출(16.5%)보다 훨씬 낮아요.",
  },
];

const REFERENCES = [
  {
    type: "법령" as const,
    name: "소득세법 제22조 — 퇴직소득세",
    url: "https://www.law.go.kr/법령/소득세법",
  },
  {
    type: "법령" as const,
    name: "근로자퇴직급여보장법 — IRP 중도인출 요건",
    url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
  },
  {
    type: "공식" as const,
    name: "금융감독원 — IRP 중도인출 안내",
    url: "https://www.fss.or.kr",
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    desc: "14일 이내 이체까지 4단계",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설",
    desc: "어디서 만드는 게 유리한지",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼나요?",
    desc: "IRP 절세 효과 계산",
  },
];

export default function Page() {
  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>
        IRP · 퇴직금 · 중도인출
      </p>

      {/* 타이틀 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, marginBottom: 6 }}>
        IRP 퇴직금 인출 방법, 중도에 꺼낼 수 있나요?
      </h1>
      <p style={{ fontSize: 17, color: "#374151", fontWeight: 500, marginBottom: 20 }}>
        조건·세금·불이익 완전 정리
      </p>

      {/* 인트로 */}
      <p style={{ ...body, marginBottom: 12 }}>
        IRP에 들어온 퇴직금을 꺼내는 건 원칙적으로 55세 이후에 해야 세금이 적어요. 55세 이전에 인출하면 기타소득세 16.5%가 원금 전체에 붙어요. 급하게 꺼내기 전에 세금 계산부터 해보세요.
      </p>

      {/* 체크리스트 — 해당 상황 확인 */}
      <SectionBadge text="지금 이런 상황이죠?" />
      <EligibilityChecker
        title="해당 상황 체크"
        items={CHECK_ITEMS}
        resultText="아래 내용을 꼼꼼히 읽어보세요."
      />

      <Divider />

      {/* 섹션 1: 인출 가능 여부 */}
      <H2>IRP 퇴직금, 중도에 꺼낼 수 있나요?</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        IRP는 퇴직급여를 노후를 위해 묶어두는 계좌예요. 그래서 원칙적으로 55세 이후에 연금 형태로 꺼내도록 설계돼 있죠. 55세 이전에는 '중도인출' 또는 '해지' 방식으로 꺼낼 수는 있지만, 세금 부담이 상당해요.
      </p>
      <p style={{ ...body, marginBottom: 12 }}>
        중도인출이 허용되는 경우는 두 가지로 나뉘어요. 첫째, 부득이한 사유(무주택자 주택 구입, 6개월 이상 요양 등)가 있을 때 일부 인출이 가능해요. 둘째, 그 외 경우에는 전액 해지만 가능하고 기타소득세 16.5%가 원금 전체에 붙어요.
      </p>
      <GreenBox>
        <strong>핵심 요약</strong><br />
        • 55세 이전 일반 해지 → 기타소득세 16.5% (원금 전체 과세)<br />
        • 부득이한 사유 일부 인출 → 퇴직소득세만 적용 (세금 ↓)<br />
        • 55세 이후 연금 수령 → 연금소득세 3.3~5.5% (세금 대폭 ↓)
      </GreenBox>
      <p style={{ ...body, marginTop: 12 }}>
        세금 차이가 크기 때문에, 지금 당장 꺼내야 하는 게 맞는지 먼저 따져보는 게 중요해요. 아래 계산기로 실제 세금을 먼저 확인해보세요.
      </p>

      <Divider />

      {/* 섹션 2: 세금 계산기 */}
      <H2>IRP 인출 세금 계산기</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        나이와 IRP 잔액을 입력하면 세금과 실수령액이 바로 나와요. 55세 기준으로 세금 차이가 얼마나 나는지 직접 확인해보세요.
      </p>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 55세 이전: 기타소득세 16.5% (원금 포함). 55세 이후 연금 수령: 연금소득세 3.3~5.5%."
      />

      {/* 관련 글 */}
      <CategoryButton category="퇴직금" href="/w/퇴직금-IRP-수령방법" />
      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* 섹션 3: 인출 절차 */}
      <H2>IRP 중도인출 신청 절차</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        인출 결정을 내렸다면 아래 순서대로 진행해요. 부득이한 사유가 있다면 증빙 서류를 미리 준비하는 게 시간을 아끼는 방법이에요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      {/* 섹션 4: 필요 서류 */}
      <H2>인출 시 필요한 서류</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        기본 서류는 신분증과 IRP 계좌 정보예요. 부득이한 사유가 해당된다면 사유 증빙 서류를 추가로 준비해야 해요. 서류가 누락되면 처리가 늦어지니 미리 챙겨두세요.
      </p>
      <DocTable docs={DOCS} />

      <BorderBox>
        <strong>부득이한 사유 증빙 서류 예시</strong><br />
        • 무주택자 주택 구입: 매매계약서, 주민등록등본<br />
        • 6개월 이상 요양: 진단서, 입원확인서<br />
        • 파산·개인회생: 법원 결정문
      </BorderBox>

      <Divider />

      {/* 인출 전 체크리스트 */}
      <H2>인출 전 반드시 짚어볼 것들</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        중도 인출은 한 번 하면 세금을 돌려받기 어려워요. 아래 항목을 하나씩 점검하고 나서 최종 결정을 내리세요.
      </p>
      <Checklist items={CHECKLIST} />

      <ArticleAd />

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      {/* 참고 자료 */}
      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
