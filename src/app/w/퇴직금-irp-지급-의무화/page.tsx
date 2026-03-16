"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 300만원이 넘어요" },
  { id: "c2", label: "회사가 IRP로 이체하겠다고 해요" },
  { id: "c3", label: "IRP 의무화가 언제부터 시작됐는지 모르겠어요" },
  { id: "c4", label: "IRP 말고 다른 방법으로 받고 싶어요" },
];
const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];
const CALC_RESULTS = [
  { label: "예상 퇴직금", getValue: (v: Record<string, number>) => v.salary * 10000 * v.years, format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "IRP 의무 여부", getValue: (v: Record<string, number>) => v.salary * 10000 * v.years, format: (v: number) => v > 3000000 ? "300만원 초과 → IRP 필수" : "300만원 이하 → 일반계좌 가능" },
];
const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];
const STEPS = [
  { title: "IRP 의무화 적용 여부 확인", desc: "2022년 4월 14일부터 퇴직금 300만원 초과 시 IRP로만 수령해야 해요. 300만원 이하는 일반 계좌도 가능해요. 예외 사유(55세 이상, 사망, 외국인 국외이주)도 있어요.", tip: "300만원 기준은 세전 퇴직금 총액 기준이에요" },
  { title: "IRP 계좌 개설", desc: "퇴직 전에 은행·증권사·보험사 앱에서 IRP 계좌를 미리 개설해요. 10분 이내에 비대면으로 개설 가능해요. 수수료가 낮은 증권사를 추천해요.", tip: "퇴직 확정 전에 미리 만들어두면 지급 지연이 없어요" },
  { title: "계좌번호 인사팀에 통보", desc: "IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이 계좌로 이체해야 해요.", tip: "통보 기록을 메시지로 남겨두세요" },
  { title: "입금 확인 및 운용 지시", desc: "IRP 계좌에 퇴직금이 입금되면 어떻게 운용할지 선택해요. 원리금보장형(예금)과 실적배당형(ETF) 중 선택 가능해요. 55세 이후 연금으로 수령하면 세금을 30% 절감해요.", tip: "운용 지시 안 하면 기본 원리금보장형으로 배정돼요" },
];
const CHECKLIST = [
  "300만원 초과 → IRP 필수 (2022.4.14~)",
  "IRP 계좌 개설 — 퇴직 전 미리",
  "계좌번호 인사팀에 문자·메일 통보",
  "14일 이내 입금 확인",
  "연금 수령 선택 → 퇴직소득세 30% 절감",
];
const FAQS = [
  { q: "IRP 의무화는 언제부터인가요?", a: "2022년 4월 14일부터 퇴직금 300만원 초과 시 IRP 의무화가 시행됐어요." },
  { q: "IRP 없이 받으면 어떻게 되나요?", a: "회사가 IRP 외 계좌로 지급하면 근로자퇴직급여보장법 위반이에요. 회사가 법적 책임을 져요." },
  { q: "IRP 개설이 어려우면 어떻게 하나요?", a: "스마트폰 앱으로 10분이면 개설 가능해요. 앱이 어려우면 은행 방문으로도 개설할 수 있어요." },
  { q: "IRP에 받은 돈을 바로 인출할 수 있나요?", a: "퇴직소득세를 납부하면 인출 가능해요. 55세 미만이면 기타소득세 16.5%가 추가될 수 있어요." },
  { q: "회사가 IRP 이체를 거부하면?", a: "고용노동부(1350)에 신고하면 돼요. IRP 이외 계좌로 지급하거나 현금으로 주는 건 위법이에요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여보장법 제9조 — IRP 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — IRP 의무화 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무화 기준", description: "300만원 초과 시 IRP 필수 기준." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차." },
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무화 예외", description: "예외 적용 대상과 일반계좌 수령 조건." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar data={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-지급-의무화" />}
    >
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>퇴직금 · IRP의무화 · 2022년</p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, color: "#111827", marginBottom: 6 }}>
        퇴직금 IRP 의무화, 언제부터 어떻게 적용되나요?
      </h1>
      <p style={{ fontSize: 17, fontWeight: 600, color: "#374151", marginBottom: 20 }}>
        300만원 초과 IRP 수령 의무와 개설 방법
      </p>

      {/* 인트로 */}
      <p style={body}>
        퇴직하면 퇴직금을 예전처럼 일반 통장으로 받을 수 없어요. 2022년 4월 14일부터 퇴직금이 300만원을 넘으면 반드시 IRP(개인형 퇴직연금) 계좌로만 받아야 해요. 회사가 "IRP 계좌 번호 주세요"라고 하는 이유가 바로 이거예요.
      </p>
      <p style={body}>
        IRP 계좌가 없으면 퇴직금을 받는 게 지연될 수 있어요. 퇴직 전에 미리 개설해두지 않으면 회사 입장에서도 법정 기한인 14일 안에 이체하기가 어려워지거든요. 준비가 안 된 채로 퇴직하면 불필요한 기다림이 생겨요.
      </p>
      <p style={body}>
        이 글에서는 IRP 의무화가 정확히 어디서부터 적용되는지, 어떻게 계좌를 열어야 하는지, 단계별로 짚어드릴게요. 퇴직을 앞두고 있다면 지금 바로 확인해두는 게 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* Section 1 */}
      <H2>IRP 의무화, 내용이 뭔가요?</H2>
      <p style={body}>
        IRP 의무화는 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에 따른 제도예요. 2022년 4월 14일 개정으로 퇴직금 300만원 초과 시 IRP 계좌로만 지급하도록 의무화했어요. 이전에는 근로자가 원하면 일반 계좌로도 받을 수 있었는데, 이제는 불가능해요.
      </p>
      <p style={body}>
        예외가 있긴 해요. 55세 이상 퇴직자, 퇴직급여가 300만원 이하인 경우, 사망, 외국인 근로자의 출국 등은 일반 계좌로 받는 게 허용돼요. 하지만 대부분의 직장인은 300만원을 초과하기 때문에 IRP 계좌 개설이 사실상 필수예요.
      </p>
      <p style={body}>
        IRP는 단순히 퇴직금을 받는 통로가 아니에요. 계좌 안에서 예금·ETF·채권 등으로 운용하면서 세금을 유예할 수 있고, 55세 이후 연금으로 나눠 받으면 퇴직소득세를 30% 줄일 수 있어요. 일단 받아두고 나중에 어떻게 활용할지 결정해도 돼요.
      </p>

      <GreenBox>
        2022.4.14부터 퇴직금 300만원 초과 시 IRP 필수 — 일반 계좌 이체 불가. 미개설 시 지급 지연 발생.
      </GreenBox>

      <SectionBadge>해당 여부 확인</SectionBadge>
      <EligibilityChecker
        title="IRP 의무화 해당 여부"
        items={CHECK_ITEMS}
        resultTrue="IRP 계좌가 필요해요. 퇴직 전에 미리 개설하세요."
        resultFalse="조건에 따라 일반 계좌 수령이 가능할 수 있어요. 인사팀과 확인해보세요."
        threshold={2}
      />

      <Divider />

      {/* Section 2 */}
      <H2>내 퇴직금이 IRP 의무 대상인지 확인해보세요</H2>
      <p style={body}>
        퇴직금은 '평균임금 × 30일 × 근속연수'로 계산해요. 월 급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 여부를 바로 확인할 수 있어요. 정확한 금액은 회사에서 산출하지만, 대략적인 규모를 미리 파악하면 준비가 훨씬 수월해요.
      </p>
      <p style={body}>
        300만원을 살짝 넘는 경우라도 IRP 의무가 적용돼요. 예를 들어 월 250만원을 받고 13개월 근무했다면 퇴직금이 약 325만원으로 계산되고, 이 경우 IRP가 필수예요. 애매한 구간이라면 미리 IRP를 만들어두는 게 안전해요.
      </p>

      <Calculator
        title="퇴직금 IRP 의무 여부 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
      />

      <CategoryButton href="/w/퇴직금" label="퇴직금 전체 가이드 보기" />
      <RelatedArticles articles={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* Section 3 */}
      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 계좌는 은행, 증권사, 보험사 어디서든 개설할 수 있어요. 비대면 앱 개설이 가장 빠르고, 보통 10~15분이면 완료돼요. 준비할 서류는 많지 않아요. 신분증과 인증 수단만 있으면 대부분 해결돼요.
      </p>
      <p style={body}>
        수수료 측면에서는 증권사 IRP가 유리한 경우가 많아요. 은행 IRP는 접근성이 좋고, 보험사 IRP는 안정성을 선호하는 분들이 선택해요. 어디서 개설하든 퇴직금 수령 기능은 동일하게 작동하니 편한 곳을 선택하면 돼요.
      </p>
      <p style={body}>
        일부 금융사는 재직증명서를 요구하기도 해요. 퇴직 전 개설 시 재직 중임을 증명해야 하는 경우가 있거든요. 미리 인사팀에 재직증명서 발급을 부탁해두면 빠르게 처리할 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      {/* Section 4 */}
      <H2>IRP 수령 절차 4단계</H2>
      <p style={body}>
        퇴직금을 IRP로 받는 과정은 생각보다 단순해요. 미리 계좌를 개설해두고, 계좌 번호를 인사팀에 알려주면 회사가 14일 이내에 이체해요. 이체 후 운용 방식만 결정하면 끝이에요.
      </p>
      <p style={body}>
        중요한 건 순서예요. 퇴직 확정 전에 IRP를 개설해두지 않으면 회사가 이체할 계좌가 없어서 지급이 늦어질 수 있어요. 퇴직 의사를 밝힌 시점부터 IRP 개설을 준비하는 게 좋아요. 14일이 지나도 이체가 안 되면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* Section 5 */}
      <H2>IRP 의무화 체크리스트</H2>
      <p style={body}>
        퇴직 준비 과정에서 놓치기 쉬운 항목들을 정리했어요. 특히 IRP 계좌 개설 시점이 중요해요. 퇴직 후에 개설하려고 하면 회사에서 이체할 곳이 없어서 지급이 늦어지거든요. 퇴직이 확정된 시점에 바로 개설을 시작하세요.
      </p>
      <p style={body}>
        IRP에 퇴직금이 들어온 후 어떻게 운용할지도 미리 생각해두면 좋아요. 55세 이전에 일시금으로 인출하면 퇴직소득세 전액을 내야 하지만, 55세 이후 연금으로 받으면 세금이 30% 줄어요. 지금 당장 쓸 계획이 없다면 연금 수령을 염두에 두세요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP에서 연금으로 수령하면 퇴직소득세 30% 절감 — 55세 이후 10년 이상 나눠 받는 방식으로 절세 가능해요.
      </GreenBox>

      <Divider />

      {/* Section 6 */}
      <H2>자주 묻는 것들</H2>
      <p style={body}>
        IRP 의무화에 대해 많이들 헷갈려 하는 부분이 있어요. 특히 "IRP 없이 받을 수 없냐", "바로 인출하면 세금이 얼마냐" 같은 질문이 많아요. 아래에서 자주 나오는 질문들을 모아서 답해드릴게요.
      </p>
      <p style={body}>
        IRP 계좌를 못 만들겠다고 포기하는 분들도 계신데, 정말 10분이면 돼요. 카카오뱅크, 토스뱅크, 키움증권 등 앱에서 바로 개설 가능하고, 불편하면 시중은행 창구에서 도움받을 수 있어요. 회사가 의무를 어기면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부(1350)</a>에 신고하는 방법도 알아두세요.
      </p>

      <FAQ faqs={FAQS} />

      <Divider />

      <References references={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
