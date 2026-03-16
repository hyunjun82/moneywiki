"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "몇 개월 일해야 퇴직금이 생기는지 모르겠어요" },
  { id: "c2", label: "11개월 일했는데 퇴직금이 있는지 궁금해요" },
  { id: "c3", label: "1년을 채우면 정확히 얼마를 받는지 알고 싶어요" },
  { id: "c4", label: "주 15시간 기준이 뭔지 모르겠어요" },
];
const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 400, step: 10, defaultValue: 220, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 24, step: 1, defaultValue: 12, format: (v: number) => `${v}개월` },
];
const CALC_RESULTS = [
  { label: "예상 퇴직금", getValue: (v: Record<string, number>) => v.months >= 12 ? Math.round(v.salary * 10000 * v.months / 12) : 0, format: (v: number) => v === 0 ? "0원 (12개월 미만 퇴직금 없음)" : `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "퇴직금 발생 여부", getValue: (v: Record<string, number>) => v.months, format: (v: number) => v >= 12 ? "퇴직금 발생 (1년 이상)" : `퇴직금 없음 (${v}개월, 1년 미만)` },
];
const DOCS = [
  { name: "근로계약서 (입사일 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (3개월)", required: true, where: "인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사" },
  { name: "퇴직 확인서", required: false, where: "인사팀" },
];
const STEPS = [
  { title: "정확한 근무 기간 확인", desc: "입사일부터 퇴직일까지 만 1년(12개월)이 돼야 퇴직금이 발생해요. 1월 1일 입사라면 다음 해 1월 1일이 정확히 1년이에요. 1년이 안 되면 퇴직금이 없어요.", tip: "입사일 포함, 퇴직일 포함해서 만 1년 계산" },
  { title: "주 15시간 기준 확인", desc: "1년 이상 근무했더라도 주 평균 15시간 미만이면 퇴직금이 발생하지 않아요. 파트타임이나 단시간 근무자도 주 15시간 이상이면 퇴직금이 생겨요.", tip: "주 15시간은 월 65시간 기준으로도 확인해요" },
  { title: "퇴직금 계산", desc: "1일 평균임금 × 30일 × 근속연수예요. 근속기간이 1년이면 월급 1개월치가 기준이에요. 2년이면 2개월치, 5년이면 5개월치예요.", tip: "상여금·고정수당도 평균임금에 포함돼요" },
  { title: "IRP 계좌 수령", desc: "300만원 초과 퇴직금은 IRP 계좌로만 받아요. 미리 개설하고 인사팀에 계좌번호를 알려줘요. 14일 이내에 이체돼요.", tip: "IRP 계좌는 앱으로 10분이면 개설 가능해요" },
];
const CHECKLIST = [
  "만 12개월(1년) 이상 — 퇴직금 발생",
  "11개월 이하 — 퇴직금 없음",
  "주 15시간 이상 — 필수 요건",
  "1년 미만이어도 — 연차수당 청구 가능",
  "IRP 계좌 — 300만원 초과 시 필수",
];
const FAQS = [
  { q: "몇 개월부터 퇴직금이 생기나요?", a: "만 12개월(1년) 이상 근무해야 퇴직금이 발생해요. 11개월 29일은 1년 미만이라서 퇴직금이 없어요." },
  { q: "딱 12개월 됐을 때 퇴직하면 퇴직금이 얼마나 되나요?", a: "월 평균임금 1개월치예요. 월급 250만원이라면 퇴직금도 약 250만원이에요." },
  { q: "주 15시간 기준이 뭔가요?", a: "주 평균 근무시간이 15시간 이상이어야 퇴직금 대상이 돼요. 월 65시간 기준으로도 확인해요." },
  { q: "11개월 일하고 그만뒀는데 아무것도 못 받나요?", a: "퇴직금은 없어요. 하지만 월 개근 시 연차(최대 11일)가 발생해요. 연차수당은 별도로 청구할 수 있어요." },
  { q: "1년 직전에 해고당하면 어떻게 되나요?", a: "1년을 채우지 못하게 하려는 의도적 해고는 부당해고에 해당할 수 있어요. 노동위원회에 구제신청을 할 수 있어요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여보장법 제8조 — 계속근로 1년 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금 없을 때", description: "연차수당·실업급여로 보완하는 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 요건과 예외 상황." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산기", description: "월급·근속기간으로 금액 바로 확인." },
];

export default function Page() {
  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-몇개월부터" />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 발생시점 · 12개월
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1.35, marginBottom: 6 }}>
        퇴직금은 몇 개월부터 받을 수 있나요?
      </h1>
      <p style={{ fontSize: 16, color: "#374151", marginBottom: 20, fontWeight: 500 }}>
        만 1년 기준과 주 15시간 요건, 미만일 때 대안
      </p>

      {/* 공감 인트로 */}
      <EligibilityChecker
        title="퇴직금 걱정, 해당되는 상황을 골라보세요"
        items={CHECK_ITEMS}
        resultMessage="해당 항목이 있다면 이 글에서 모두 해결돼요."
      />

      <ArticleAd position="intro" />

      <p style={body}>
        "몇 개월 일해야 퇴직금이 생기지?" — 퇴사 결정 전에 가장 먼저 드는 질문이죠. 딱 하루 차이로 퇴직금을 못 받는 경우가 생각보다 많아요. 기준이 뭔지, 주 15시간이 왜 나오는지, 1년을 못 채웠을 때 받을 수 있는 게 뭔지 순서대로 짚어볼게요.
      </p>
      <p style={body}>
        결론부터 말하면 <strong>만 12개월(1년) 이상 + 주 평균 15시간 이상</strong>, 이 두 가지를 모두 충족해야 퇴직금이 발생해요. 11개월 29일 근무하고 퇴사하면 퇴직금은 0원이에요. 반면 딱 1년을 채우면 월급 1개월치에 해당하는 퇴직금이 나와요.
      </p>

      <Divider />

      {/* H2-1: 발생 기준 */}
      <H2>퇴직금이 생기는 두 가지 조건</H2>

      <p style={body}>
        <a href="/w/근로자퇴직급여보장법" style={{ color: "#1D9E75" }}>근로자퇴직급여보장법</a> 제8조에 따르면 퇴직금 발생 요건은 딱 두 가지예요. 첫째, 계속근로 기간이 만 1년 이상일 것. 둘째, 4주 평균 주당 근로시간이 15시간 이상일 것. 둘 중 하나라도 빠지면 퇴직금이 없어요.
      </p>
      <p style={body}>
        "계속근로"란 말 그대로 고용 관계가 끊기지 않고 이어진 기간이에요. 같은 회사에서 계약직으로 11개월, 정규직으로 8개월 일했다면 계약이 중간에 갱신됐는지에 따라 합산 여부가 달라져요. 계약이 자동갱신되거나 사실상 동일한 근무라면 합산돼요.
      </p>
      <p style={body}>
        주 15시간 요건은 파트타임 근무자를 위한 기준이에요. 카페 아르바이트로 주 20시간 일한다면 1년 후 퇴직금 대상이 되고, 주 10시간만 일한다면 1년이 넘어도 퇴직금이 없어요.
      </p>

      <GreenBox title="퇴직금 발생 요건 요약">
        <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 2 }}>
          <li><strong>만 1년(12개월) 이상</strong> 계속근로 — 하루라도 미달이면 0원</li>
          <li><strong>주 평균 15시간 이상</strong> 근무 — 단시간 근로자도 해당 가능</li>
          <li>두 조건 모두 충족해야 퇴직금 발생</li>
          <li>정규직·계약직·아르바이트 구분 없이 동일 적용</li>
        </ul>
      </GreenBox>

      <Divider />

      {/* H2-2: 계산기 */}
      <H2>근무 기간별 예상 퇴직금 계산</H2>

      <p style={body}>
        퇴직금 계산식은 <strong>1일 평균임금 × 30일 × (총 근속일 수 ÷ 365)</strong>예요. 쉽게 말하면 1년 근무 시 월급 1개월치, 2년 근무 시 2개월치가 기본 기준이에요. 상여금이나 고정수당이 있으면 평균임금에 포함돼서 금액이 달라질 수 있어요.
      </p>
      <p style={body}>
        12개월 미만이면 계산 자체가 의미 없어요. 아래 슬라이더로 근무 기간을 12개월 미만으로 설정하면 퇴직금이 0원으로 나오는 걸 바로 볼 수 있어요.
      </p>

      <Calculator
        title="퇴직금 간이 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="상여금·수당이 있으면 실제 퇴직금은 더 높을 수 있어요."
      />

      <p style={body}>
        퇴직금을 정확하게 계산하려면 퇴직 전 3개월 급여명세서가 필요해요. 상여금이 분기별로 지급된다면 해당 금액도 평균임금에 넣어야 해요. 정밀한 금액은 <a href="/w/퇴직금-계산기" style={{ color: "#1D9E75" }}>퇴직금 계산기</a>에서 확인해요.
      </p>

      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3: 서류 */}
      <H2>퇴직금 청구에 필요한 서류</H2>

      <p style={body}>
        퇴직금은 별도 신청서 없이 퇴직하면 회사가 자동 지급해야 해요. 그래도 정확한 금액 확인과 분쟁 예방을 위해 서류는 미리 챙겨두는 게 좋아요. 근로계약서로 입사일을 확정하고, 급여명세서로 평균임금을 산정하는 게 기본이에요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP(개인형퇴직연금) 계좌로만 수령할 수 있어요. 미리 개설하지 않으면 지급이 지연될 수 있으니 퇴사 전에 은행이나 증권사 앱으로 만들어두는 게 좋아요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body}>
        퇴직금은 퇴사일로부터 14일 이내에 지급돼야 해요. 회사가 지연하면 <strong>연 20% 지연이자</strong>가 붙어요. 14일이 지나도 입금되지 않으면 <a href="/w/퇴직금-미지급" style={{ color: "#1D9E75" }}>퇴직금 미지급 신고</a> 절차를 밟을 수 있어요.
      </p>

      <Divider />

      {/* H2-4: 절차 */}
      <H2>퇴직금 받는 절차 4단계</H2>

      <p style={body}>
        퇴직금은 퇴사 결정 전에 준비해야 할 게 있어요. 특히 IRP 계좌는 퇴사 후 개설하면 수령이 늦어지니까요. 아래 단계를 순서대로 따라가면 퇴사 후 14일 안에 퇴직금을 받을 수 있어요.
      </p>
      <p style={body}>
        퇴직금 정산 과정에서 회사와 금액 차이가 생기는 경우가 꽤 있어요. 상여금이나 고정수당 포함 여부를 놓고 다툼이 생기기도 해요. 지급 명세서를 받으면 계산 내역을 직접 확인하는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton category="퇴직금" slug="퇴직금-몇개월부터" />
      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* H2-5: 체크리스트 + GreenBox */}
      <H2>1년 미만일 때 받을 수 있는 것들</H2>

      <p style={body}>
        퇴직금이 없다고 해서 아무것도 못 받는 건 아니에요. 1년 미만 근무자도 챙길 수 있는 게 있어요. 월 개근하면 연차가 생기고, 퇴사 시 사용하지 않은 연차는 수당으로 받을 수 있어요.
      </p>
      <p style={body}>
        11개월 일하고 퇴사하면 최대 11일치 연차수당을 청구할 수 있어요. 일급으로 환산해서 지급받는 방식이에요. 퇴직금은 없지만 연차수당은 별개 권리라서 반드시 챙기는 게 좋아요.
      </p>

      <GreenBox title="1년 미만 퇴사 시 챙길 수 있는 권리">
        <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 2 }}>
          <li><strong>연차수당</strong> — 월 개근 시 발생, 최대 11일치 청구 가능</li>
          <li><strong>실업급여</strong> — 비자발적 퇴사라면 180일 이상 가입 시 수령 가능</li>
          <li><strong>퇴직금 청구권</strong> — 1년 이상이면 소멸시효 3년 이내 청구 가능</li>
        </ul>
      </GreenBox>

      <Checklist items={CHECKLIST} title="퇴직금 핵심 기준 체크리스트" />

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 질문</H2>

      <p style={body}>
        퇴직금 기준에서 헷갈리는 부분이 여러 가지 있어요. 특히 "딱 1년"과 "11개월 29일"의 차이, 단시간 근로자 기준, 1년 직전 해고 문제는 실제로 자주 발생하는 케이스예요.
      </p>
      <p style={body}>
        아래에서 가장 많이 묻는 질문들을 모아봤어요. 내 상황과 비슷한 케이스가 있다면 참고해요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References references={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
