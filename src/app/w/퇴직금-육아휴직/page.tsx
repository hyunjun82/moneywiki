"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "육아휴직을 사용했어요" },
  { id: "c2", label: "육아휴직 기간이 퇴직금 근속기간에 포함되는지 궁금해요" },
  { id: "c3", label: "육아휴직 중 퇴직금 계산 기준이 달라지는지 알고 싶어요" },
  { id: "c4", label: "육아휴직 후 퇴직 시 퇴직금을 받을 수 있나요?" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "육아휴직 전 월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "입사~퇴직 전체 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 (육아휴직 포함 전체 근속 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당 적립액",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "육아휴직 확인서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (육아휴직 전 3개월)", required: true, where: "회사 인사팀" },
  { name: "근로계약서", required: false, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "육아휴직 기간의 근속 산입 여부 확인",
    desc: "육아휴직 기간은 퇴직금 근속기간에 포함돼요. 근로기준법과 남녀고용평등법에 따라 육아휴직은 계속 근로기간으로 인정해요. 육아휴직 1년을 썼어도 입사일부터 퇴직일까지 전체가 근속기간이에요.",
    tip: "육아휴직 기간 = 퇴직금 근속기간에 포함",
  },
  {
    title: "평균임금 계산 시 주의사항",
    desc: "퇴직금 평균임금은 퇴직 전 3개월 임금 기준이에요. 육아휴직 중이나 직후 퇴직하면 평균임금이 낮게 나올 수 있어요. 이 경우 육아휴직 전 3개월 임금을 기준으로 하는 게 유리하고, 법적으로도 허용돼요.",
    tip: "육아휴직 직후 퇴직 시 평균임금 산정 기준을 인사팀에 확인하세요",
  },
  {
    title: "퇴직금 계산 및 청구",
    desc: "전체 근속기간(육아휴직 포함)을 기준으로 퇴직금을 계산해요. 회사가 육아휴직 기간을 제외하고 계산했다면 차액이 있어요. 차액을 청구하거나 거부 시 고용노동부에 진정을 낼 수 있어요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직 후에도 청구 가능",
  },
  {
    title: "IRP 계좌로 수령",
    desc: "퇴직금 300만원 초과 시 IRP 계좌로만 수령해요. IRP 계좌번호를 인사팀에 알려주면 14일 이내에 이체돼요. IRP에서 연금으로 수령하면 퇴직소득세를 30% 절감할 수 있어요.",
    tip: "퇴직 전에 IRP 계좌 미리 만들어두세요",
  },
];

const CHECKLIST = [
  "육아휴직 기간 — 퇴직금 근속기간에 반드시 포함",
  "평균임금 — 육아휴직 직후 퇴직 시 기준 확인",
  "퇴직금 계산 확인 — 전체 근속기간 기준인지",
  "IRP 계좌 — 300만원 초과 시 필수 개설",
  "지급 기한 — 퇴직 후 14일 이내",
];

const FAQS = [
  {
    q: "육아휴직 기간이 퇴직금 계산에 포함되나요?",
    a: "맞아요. 남녀고용평등법 제19조에 따라 육아휴직 기간은 계속 근로기간으로 인정돼요. 퇴직금 근속기간에 포함돼요.",
  },
  {
    q: "육아휴직 중 퇴직하면 퇴직금이 줄어드나요?",
    a: "퇴직금 근속기간은 줄지 않아요. 하지만 퇴직 전 3개월 임금이 육아휴직급여(통상임금의 80%)라면 평균임금이 낮게 나올 수 있어요. 이 경우 육아휴직 전 임금을 기준으로 재산정을 요청할 수 있어요.",
  },
  {
    q: "육아휴직 후 바로 퇴직해도 퇴직금이 있나요?",
    a: "있어요. 육아휴직 기간 포함 총 근속기간이 1년 이상이면 퇴직금이 발생해요. 육아휴직 복귀 후 바로 퇴직해도 동일해요.",
  },
  {
    q: "회사가 육아휴직 기간을 근속기간에서 빼고 계산했어요",
    a: "위법이에요. 남녀고용평등법에 따라 육아휴직은 계속 근로기간으로 인정해야 해요. 고용노동부에 진정을 낼 수 있고, 차액을 청구할 수 있어요.",
  },
  {
    q: "배우자 출산휴가도 퇴직금 근속기간에 포함되나요?",
    a: "맞아요. 배우자 출산휴가, 출산전후휴가도 근로기준법에 따라 계속 근로기간으로 인정돼요. 퇴직금 계산에서 제외할 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "남녀고용평등법 제19조 — 육아휴직 계속근로기간 산입", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
      { label: "근로자퇴직급여보장법 제8조 — 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 육아휴직 퇴직금 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 요건과 예외 상황." },
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산", description: "포함 항목과 산정 기준을 설명해요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌로 안전하게 받는 방법." },
];

export default function Page() {
  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-육아휴직" />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 육아휴직 · 근속기간
      </div>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.4, color: "#111827", marginBottom: 6 }}>
        육아휴직 기간도 퇴직금 계산에 포함되나요?
      </h1>
      <p style={{ fontSize: 17, color: "#374151", fontWeight: 500, marginBottom: 20 }}>
        근속기간 산입 기준부터 평균임금 주의사항까지
      </p>

      {/* Intro */}
      <p style={{ ...body, marginBottom: 12 }}>
        육아휴직을 쓰고 나면 퇴직금이 줄어들까 걱정되죠. 결론부터 말하면, 육아휴직 기간은 퇴직금 근속기간에 그대로 포함돼요.{" "}
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>
          남녀고용평등법 제19조
        </a>
        에서 이걸 명시적으로 보장하고 있어서, 회사가 임의로 뺄 수 없어요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        다만 주의할 지점이 하나 있어요. 퇴직금 근속기간은 문제없지만, 평균임금 계산은 달라질 수 있거든요. 육아휴직 중이나 직후에 퇴직하면 퇴직 전 3개월 임금이 낮게 잡혀서 퇴직금이 줄어드는 상황이 생길 수 있어요. 이 부분만 정확히 알면 퇴직금을 온전히 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />

      {/* H2-1 */}
      <H2>육아휴직, 퇴직금 계산에 어떻게 반영되나요?</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        퇴직금은 '계속 근로기간 1년에 30일분 평균임금'으로 계산해요. 여기서 핵심은 '계속 근로기간'인데, 육아휴직 기간은 이 계속 근로기간에 포함돼요. 육아휴직을 1년 썼어도 입사일부터 퇴직일 사이 기간 전부가 근속기간이에요.
      </p>

      <GreenBox>
        <strong>육아휴직 기간 = 퇴직금 근속기간 포함</strong><br />
        남녀고용평등법 제19조 4항에 따라 육아휴직 기간은 근속기간(계속 근로기간)으로 인정돼요. 회사가 이를 제외하고 퇴직금을 계산하면 위법이에요.
      </GreenBox>

      <p style={{ ...body, marginTop: 16, marginBottom: 12 }}>
        예를 들어 5년 근무 중 1년 육아휴직을 썼다면, 퇴직금 계산의 근속기간은 5년이에요. 육아휴직 기간을 뺀 4년이 아니에요. 이 차이가 꽤 커요. 5년 기준이면 4년 기준보다 퇴직금이 25% 더 많아지거든요.
      </p>
      <p style={{ ...body, marginBottom: 20 }}>
        배우자 출산휴가나 출산전후휴가도 같은 원칙이 적용돼요. 법정 휴가로 보장된 기간은 모두 계속 근로기간에 포함돼요. 회사가 이를 빼고 계산했다면 차액을 청구할 수 있고, 소멸시효 3년 안이라면 이미 퇴직한 뒤에도 청구 가능해요.
      </p>

      {/* H2-2 */}
      <H2>육아휴직 포함 예상 퇴직금 계산해보세요</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        아래 계산기는 육아휴직 전 월 평균급여와 입사~퇴직 전체 기간을 기준으로 퇴직금을 추산해요. 육아휴직 기간을 포함한 전체 근속기간을 입력하면 돼요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        실제 퇴직금은 퇴직 전 3개월 평균임금을 쓰는데, 육아휴직 직후 퇴직 시 평균임금이 낮게 산정될 수 있어요. 이 경우 아래 계산값과 차이가 날 수 있으니 인사팀에 정확한 평균임금을 확인하는 게 좋아요.
      </p>

      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <CategoryButton slug="퇴직금-계산기" label="퇴직금 정밀 계산기로 이동" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      {/* H2-3 */}
      <H2>퇴직금 수령에 필요한 서류</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        육아휴직 후 퇴직 시에는 일반 퇴직보다 서류가 조금 더 필요해요. 회사가 평균임금을 어떻게 산정했는지 확인하려면 급여명세서가 핵심이에요. 육아휴직 전 3개월치와 퇴직 전 3개월치를 모두 받아두는 게 좋아요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        IRP 계좌는 퇴직금 300만원 초과 시 필수예요. 퇴직 전에 미리 만들어두지 않으면 지급이 지연될 수 있어요. 은행이나 증권사 앱에서 5분이면 개설할 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      {/* H2-4 */}
      <H2>육아휴직 후 퇴직금 수령 절차 4단계</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        육아휴직 후 퇴직금 수령 과정에서 가장 많이 놓치는 게 평균임금 산정 기준이에요. 회사가 자동으로 유리하게 계산해주지 않는 경우도 있어서, 직접 확인하는 게 필요해요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        아래 4단계를 순서대로 따르면 퇴직금을 빠짐없이 챙길 수 있어요. 특히 2단계 평균임금 확인이 금액 차이를 만드는 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      {/* H2-5 */}
      <H2>육아휴직 퇴직금 체크리스트</H2>

      <p style={{ ...body, marginBottom: 12 }}>
        퇴직 전에 아래 항목을 하나씩 점검해두면 퇴직금 손해를 막을 수 있어요. 특히 평균임금과 IRP 계좌는 퇴직 전날까지 준비해야 해요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={{ ...body, marginTop: 16, marginBottom: 12 }}>
        체크리스트를 점검하면서 회사 계산서와 본인이 직접 계산한 금액을 비교해보세요. 근속기간이나 평균임금에서 차이가 나면 바로 이의를 제기해야 해요.
      </p>

      <GreenBox>
        <strong>회사가 육아휴직을 제외하고 계산했다면?</strong><br />
        즉시 인사팀에 서면으로 이의를 신청하세요. 거부하면{" "}
        <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>
          고용노동부
        </a>
        에 진정을 낼 수 있어요. 퇴직 후라도 소멸시효 3년 안이면 청구 가능해요.
      </GreenBox>

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>

      <p style={{ ...body, marginBottom: 16 }}>
        육아휴직과 퇴직금을 둘러싼 질문 중 가장 많이 나오는 것들만 모았어요. 상황이 비슷하다면 참고하세요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References sections={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
