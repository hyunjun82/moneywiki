"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 14일이 지났는데 퇴직금이 안 왔어요" },
  { id: "c2", label: "퇴직금 지급 기한이 언제인지 모르겠어요" },
  { id: "c3", label: "지연이자를 받을 수 있는지 궁금해요" },
  { id: "c4", label: "고용노동부에 신고하는 방법을 알고 싶어요" },
];
const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 총액", min: 300, max: 10000, step: 300, defaultValue: 2000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "delay", label: "14일 초과 지연 일수", min: 1, max: 180, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];
const CALC_RESULTS = [
  { label: "지연이자 (연 20%)", getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * 0.2 * v.delay / 365), format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "합산 청구액 (퇴직금+지연이자)", getValue: (v: Record<string, number>) => v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365), format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원` },
];
const DOCS = [
  { name: "퇴직 확인서 또는 사직서 수리 확인", required: true, where: "회사 인사팀" },
  { name: "퇴직금 미지급 내용증명", required: true, where: "우체국 발송" },
  { name: "급여명세서 (3개월)", required: true, where: "인사팀 또는 급여앱" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사" },
];
const STEPS = [
  { title: "14일 기한 계산", desc: "퇴직일 다음 날부터 14일을 세요. 14일째 되는 날까지 IRP 계좌(300만원 초과) 또는 지정 계좌로 입금돼야 해요. 14일이 주말이나 공휴일이면 다음 영업일이 기한이에요.", tip: "퇴직일 포함 여부는 퇴직일 다음 날부터 계산" },
  { title: "인사팀 지급 요청", desc: "14일이 지나도 입금이 안 됐으면 먼저 인사팀에 지급 요청을 해요. 문자나 메일로 기록을 남기세요. 대부분 이 단계에서 해결돼요.", tip: "문자나 메일로 지급 요청 일자를 남겨두세요" },
  { title: "내용증명 발송", desc: "인사팀 요청 후에도 지급이 안 되면 내용증명으로 퇴직금과 지연이자 지급을 요청해요. 내용증명은 법적 청구 증거가 돼요. 우체국 방문 또는 온라인 우편서비스에서 발송할 수 있어요.", tip: "내용증명 발송일부터 법적 청구 기산일이 돼요" },
  { title: "고용노동부 진정 신청", desc: "내용증명 후에도 지급이 없으면 고용노동부 민원마당에서 온라인 진정을 낼 수 있어요. 근로감독관이 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌(3년 이하 징역 또는 3천만원 이하 벌금)이에요.", tip: "고용노동부 민원마당(minwon.moel.go.kr) 24시간 신청 가능" },
];
const CHECKLIST = [
  "14일 기한 — 퇴직일 다음 날부터 14일",
  "IRP 계좌번호 인사팀 통보 — 미리 알려줘야 이체 가능",
  "14일 초과 시 — 연 20% 지연이자 자동 발생",
  "내용증명 발송 — 법적 청구 증거 확보",
  "고용노동부 진정 — 민원마당 온라인 신청",
];
const FAQS = [
  { q: "퇴직금 지급 기한이 14일인 이유가 뭔가요?", a: "근로자퇴직급여보장법 제9조에 따라 퇴직 후 14일 이내에 지급해야 해요. 양 당사자가 합의하면 연장이 가능해요." },
  { q: "14일이 토요일이면 언제까지 줘야 하나요?", a: "토요일·일요일·공휴일이 기한이면 다음 첫 영업일이 기한이에요." },
  { q: "IRP 계좌번호를 아직 안 알려줬는데 14일이 지났어요", a: "IRP 계좌를 알려주지 않으면 회사가 이체할 수 없어요. 이 경우 지연에 대한 귀책이 근로자에게 있을 수 있어요. 바로 IRP 계좌번호를 알려주세요." },
  { q: "지연이자는 언제까지 계속 붙나요?", a: "실제 지급일까지 매일 붙어요. 연 20% 비율로 일할 계산해요. 고용노동부 진정 후 지급 시에도 지연이자를 함께 받을 수 있어요." },
  { q: "합의하에 나눠 받기로 했는데 나중에 이자를 청구할 수 있나요?", a: "합의서에 이자 포기 조항이 없다면 청구 가능해요. 합의 전에 이자 조항을 꼭 확인하세요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여보장법 제9조 — 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }, { label: "근로기준법 제37조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 민원마당 — 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "지연이자 계산과 청구 방법." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 청구", description: "연 20% 이자 계산 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
];

export default function Page() {
  const sidebar = <Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급기한" />;

  return (
    <ArticleLayout sidebar={sidebar}>
      {/* 브레드크럼 */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 지급기한 · 14일
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, marginBottom: 6 }}>
        퇴직금 지급 기한은 14일이에요
      </h1>
      <p style={{ fontSize: 18, color: "#374151", fontWeight: 500, marginBottom: 24 }}>
        14일 초과 시 지연이자 청구 방법과 절차
      </p>

      {/* 체크 — 해당자 확인 */}
      <EligibilityChecker
        title="이 글이 필요한 분"
        items={CHECK_ITEMS}
      />

      <ArticleAd slot="intro" />

      {/* 섹션 1 — 기한 원칙 */}
      <H2>퇴직금 지급 기한, 14일이 원칙이에요</H2>

      <p style={body}>
        퇴직금을 받을 날짜가 언제인지 모르는 분이 생각보다 많아요. 법에 명확히 나와 있는데도 회사에서 제때 알려주지 않는 경우가 많거든요. <a href="/w/퇴직금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산</a> 방법을 알아봤다면, 이제 언제까지 받아야 하는지도 짚고 넘어가야 해요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 퇴직 후 14일 이내 지급을 의무로 규정해요. 퇴직일 다음 날부터 14일째 되는 날까지 IRP 계좌(300만원 초과) 또는 지정 계좌로 입금돼야 해요. 기한이 토요일·공휴일이면 다음 첫 영업일로 자동 연장돼요.
      </p>
      <p style={body}>
        회사와 근로자가 합의하면 지급 기한을 늘릴 수 있어요. 하지만 합의 없이 14일을 넘기면 그날부터 연 20% 지연이자가 붙어요. 이 이자는 회사가 실제로 지급하는 날까지 매일 일할 계산으로 쌓여요.
      </p>

      <GreenBox>
        <strong>14일 기한 핵심 정리</strong>
        <ul style={{ margin: "8px 0 0 0", paddingLeft: 18, lineHeight: 2 }}>
          <li>기산일: 퇴직일 <strong>다음 날</strong>부터 14일</li>
          <li>300만원 초과: <strong>IRP 계좌</strong>로만 이체 가능</li>
          <li>기한이 주말·공휴일: 다음 영업일로 연장</li>
          <li>합의 없이 초과 시: <strong>연 20%</strong> 지연이자 자동 발생</li>
          <li>소멸시효: 퇴직일로부터 <strong>3년</strong></li>
        </ul>
      </GreenBox>

      <p style={body}>
        소멸시효는 퇴직일로부터 3년이에요. 3년이 지나면 청구권 자체가 사라지니, 14일이 지난 걸 뒤늦게 알아도 3년 안이라면 바로 청구할 수 있어요. <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 소멸시효</a>에 대한 자세한 내용은 별도로 확인해 두세요.
      </p>

      <Divider />

      {/* 섹션 2 — 지연이자 계산기 */}
      <H2>지연이자 계산기 — 얼마나 받을 수 있는지 바로 계산해요</H2>

      <p style={body}>
        14일이 지났다면 지연이자가 얼마나 붙었는지 먼저 계산해 보세요. 퇴직금 총액과 지연 일수를 입력하면 청구 가능한 이자를 바로 알 수 있어요. 이 금액이 고용노동부 진정 시 청구 근거가 돼요.
      </p>
      <p style={body}>
        지연이자 계산식은 <strong>퇴직금 × 20% ÷ 365 × 지연 일수</strong>예요. 예를 들어 퇴직금 2,000만원이 30일 늦었다면 약 32만원의 이자가 붙어요. 금액이 크거나 기간이 길수록 이자도 눈에 띄게 불어나요.
      </p>

      <Calculator
        title="퇴직금 지연이자 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
      />

      <p style={body}>
        계산된 금액은 법적 청구 가능 금액이에요. 회사에 지급 요청할 때 이 금액을 명시하면 협상력이 높아져요. 고용노동부에 진정을 낼 때도 지연이자 청구 금액을 함께 적으세요.
      </p>

      <CategoryButton category="퇴직금" />
      <RelatedArticles articles={RELATED} />

      <ArticleAd slot="mid" />

      {/* 섹션 3 — 서류 */}
      <H2>청구에 필요한 서류 4가지</H2>

      <p style={body}>
        고용노동부 진정이나 내용증명 발송 전에 서류를 미리 갖춰두면 절차가 훨씬 빨라져요. 특히 퇴직 확인서와 급여명세서는 지급 기한과 퇴직금 산정 근거를 입증하는 핵심 서류예요.
      </p>
      <p style={body}>
        IRP 계좌번호는 퇴직 전에 미리 개설하고 회사 인사팀에 알려두는 게 좋아요. 회사가 IRP 계좌번호를 모른다는 이유로 지급을 미루는 경우도 있거든요. 이 경우엔 지연 귀책이 근로자에게 돌아올 수 있으니 미리 통보해 두세요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body}>
        내용증명은 우체국 방문이나 <a href="https://www.epost.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>우체국 온라인 우편서비스</a>에서 발송할 수 있어요. 발송 이력이 법적 증거로 남기 때문에 반드시 등기로 보내야 해요. 내용증명 작성이 어렵다면 <a href="/w/퇴직금-내용증명" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 내용증명 작성법</a>을 참고하세요.
      </p>

      <Divider />

      {/* 섹션 4 — 절차 */}
      <H2>퇴직금 못 받았을 때 단계별 절차</H2>

      <p style={body}>
        14일이 지났는데도 퇴직금이 안 들어왔다면, 순서대로 밟아야 할 절차가 있어요. 바로 고용노동부에 신고하는 것보다 인사팀 요청부터 시작하는 게 더 빠르게 해결되는 경우가 많아요.
      </p>
      <p style={body}>
        4단계 중 대부분은 2단계(인사팀 요청) 또는 3단계(내용증명)에서 끝나요. 회사도 형사 처벌 위험을 알기 때문에 법적 절차를 시작하면 빠르게 움직이는 편이에요. 단계별로 기록을 남기는 게 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        고용노동부 진정은 <a href="https://minwon.moel.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>민원마당(minwon.moel.go.kr)</a>에서 24시간 온라인으로 신청할 수 있어요. 관할 지방고용노동청에 방문 신청도 가능해요. 진정 후 근로감독관이 회사에 출석 요구와 지급 명령을 내리고, 불이행 시 형사 처벌로 이어져요.
      </p>

      <Divider />

      {/* 섹션 5 — 체크리스트 */}
      <H2>지금 바로 해야 할 것들</H2>

      <p style={body}>
        퇴직금 청구는 시간이 지날수록 불리해요. 지연이자는 14일 초과부터 매일 붙지만, 회사가 먼저 나서서 알려주지는 않아요. 아래 체크리스트를 순서대로 따라가면 빠짐없이 챙길 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        <strong>놓치기 쉬운 것 하나</strong><br />
        IRP 계좌번호를 인사팀에 미리 알려줘야 이체가 가능해요. 퇴직 전에 IRP 계좌를 개설하고, 계좌번호를 문자나 메일로 인사팀에 전달해 두세요. 이걸 빠뜨리면 회사 귀책이 아닌 근로자 귀책으로 처리될 수 있어요.
      </GreenBox>

      <p style={body}>
        14일 기한을 계산할 때 퇴직일 당일은 포함하지 않아요. 퇴직일 다음 날이 1일차예요. 예를 들어 3월 1일 퇴직이면 3월 15일까지 지급해야 해요. 3월 15일이 토요일이면 3월 17일(월요일)이 기한이 돼요.
      </p>

      <Divider />

      {/* 섹션 6 — FAQ */}
      <H2>자주 묻는 질문</H2>

      <p style={body}>
        퇴직금 지급 기한과 지연이자에 대해 헷갈리는 부분을 모았어요. 특히 IRP 계좌 관련 질문과 분할 합의 후 이자 청구 여부는 실제로 자주 생기는 상황이에요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References sections={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
