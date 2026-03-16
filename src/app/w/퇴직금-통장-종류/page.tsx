"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 수령 계좌를 만들어야 해요" },
  { id: "c2", label: "IRP와 일반 계좌의 차이를 모르겠어요" },
  { id: "c3", label: "퇴직연금이 DB형인지 DC형인지 확인하고 싶어요" },
  { id: "c4", label: "세액공제 혜택을 받을 수 있는 계좌를 알고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  { label: "예상 퇴직금 (300만원 초과 → IRP 필수)", getValue: (v: Record<string, number>) => v.salary * 10000 * v.years, format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`, highlight: true },
  { label: "IRP 세액공제 최대 (연 300만 납입 기준)", getValue: () => 495000, format: () => "약 49.5만원/년 (소득 5,500만 이하 기준)" },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  { title: "퇴직금 계좌 종류 파악", desc: "퇴직금을 받을 수 있는 계좌는 크게 두 가지예요. 일반 은행 계좌(300만원 이하만 가능)와 IRP 계좌(300만원 초과 필수)예요. 퇴직금이 300만원을 넘으면 IRP 계좌가 반드시 필요해요.", tip: "퇴직금 300만원 초과는 IRP 계좌만 가능" },
  { title: "IRP 계좌 개설", desc: "은행·증권사·보험사에서 개설할 수 있어요. 수수료가 낮은 증권사(연 0.2~0.3%)를 추천해요. 앱으로 10분 이내 개설 가능해요.", tip: "수수료 0% 상품도 있어요 (일부 증권사)" },
  { title: "DC형·DB형 퇴직연금 계좌 확인", desc: "회사가 DC형이라면 퇴직연금 계좌에 이미 적립이 되고 있어요. 퇴직 시 자동으로 IRP로 이전돼요. DB형은 회사가 금융기관에 적립하고 퇴직 시 IRP로 이전돼요.", tip: "인사팀에 퇴직연금 유형을 확인해두세요" },
  { title: "계좌번호 인사팀에 통보", desc: "IRP 계좌번호를 인사팀에 문자·메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이체해야 해요. 추가 납입 시 세액공제(최대 16.5%)도 받을 수 있어요.", tip: "문자나 메일로 남겨야 증거가 돼요" },
];

const CHECKLIST = [
  "300만원 초과 — IRP 계좌 필수",
  "300만원 이하 — 일반 계좌 수령 가능",
  "증권사 IRP — 수수료 낮고 ETF 투자 가능",
  "DC형/DB형 — 퇴직 시 자동 IRP 이전",
  "세액공제 — 추가 납입 시 최대 16.5%",
];

const FAQS = [
  { q: "퇴직금을 일반 통장으로 받을 수 없나요?", a: "300만원 이하라면 일반 계좌로 받을 수 있어요. 300만원 초과 시 IRP 계좌가 필수예요." },
  { q: "IRP 계좌는 어디서 만드는 게 좋나요?", a: "수수료가 낮은 증권사(미래에셋·삼성·NH투자증권 등)를 추천해요. 연 수수료 0.2~0.3% 수준이에요. 은행은 0.5%까지 올라가요." },
  { q: "DC형 퇴직연금과 IRP의 차이는 뭔가요?", a: "DC형은 회사가 운영하는 퇴직연금 계좌예요. 퇴직하면 DC형 잔액이 자동으로 본인 IRP로 이전돼요. IRP는 퇴직금 수령 + 추가 납입 + 세액공제가 모두 가능한 개인 계좌예요." },
  { q: "퇴직금 통장을 여러 개 만들 수 있나요?", a: "IRP는 여러 금융기관에서 만들 수 있어요. 하지만 세액공제 한도는 IRP+연금저축 합산 연 900만원이에요." },
  { q: "IRP 계좌에 있는 돈을 언제든 뺄 수 있나요?", a: "55세 미만이면 인출 시 기타소득세 16.5%가 부과돼요. 55세 이후 연금으로 수령하면 세금이 줄어요. 법정 사유(주택구입·요양 등)에 해당하면 중도 인출도 가능해요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여보장법 — IRP 의무화 및 운용 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" }] },
];

const RELATED = [
  { slug: "퇴직금-통장-만들기", title: "IRP 계좌 만드는 방법", description: "수수료 비교와 개설 절차." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 절차." },
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류", description: "법정퇴직금·DB형·DC형 비교." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-종류" />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 통장 · 계좌종류</p>
        <h1 style={body.h1}>
          퇴직금 받는 통장, 어떤 종류가 있나요?
          <br />
          <span style={body.h1sub}>일반계좌·IRP·DC형 차이와 수령 기준</span>
        </h1>
      </div>

      {/* 인트로 */}
      <ArticleAd />

      <p style={body.prose}>
        퇴직하고 나서 가장 먼저 생기는 질문이 "퇴직금 어디로 받아요?"예요. 그냥 통장 번호 알려주면 되는 줄 알았다가 IRP 계좌가 필요하다는 말에 당황하는 분들이 많아요. 퇴직금이 300만원을 넘으면 일반 통장으로는 못 받거든요.
      </p>
      <p style={body.prose}>
        퇴직금 수령 계좌는 크게 세 종류예요. 일반 은행 통장, IRP(개인형 퇴직연금) 계좌, 그리고 회사가 운영하는 DC형 퇴직연금 계좌예요. 어떤 계좌를 써야 하는지는 퇴직금 금액과 회사 퇴직연금 제도에 따라 달라져요. 아래에서 하나씩 짚어드릴게요.
      </p>

      <Divider />

      {/* 섹션 1: 계좌 종류 */}
      <H2>퇴직금 수령 계좌, 세 가지 중 하나예요</H2>

      <p style={body.prose}>
        퇴직금을 받을 수 있는 계좌는 퇴직금 금액과 회사 제도에 따라 나뉘어요. 300만원 이하면 일반 통장도 되지만, 대부분의 직장인은 퇴직금이 300만원을 훨씬 넘어서 IRP가 기본이에요.
      </p>

      <GreenBox>
        퇴직금 수령 계좌 3가지<br />
        ① 일반 은행 계좌 — 퇴직금 300만원 이하인 경우만 가능<br />
        ② IRP(개인형 퇴직연금) — 300만원 초과 시 필수, 세액공제 혜택도 있음<br />
        ③ DC형 퇴직연금 계좌 — 회사가 운영, 퇴직 시 IRP로 자동 이전
      </GreenBox>

      <p style={body.prose}>
        일반 계좌는 퇴직금이 적은 단기 근무자에게만 해당돼요. 1년 이상 다닌 직장에서 나오는 퇴직금은 거의 300만원을 넘기 때문에 IRP 계좌가 사실상 표준이에요. <a href="/w/퇴직금-IRP-계좌" style={body.link}>IRP 계좌 개설 방법</a>을 미리 알아두면 퇴직 전 준비가 훨씬 수월해요.
      </p>

      <BorderBox>
        <strong>DB형 vs DC형 퇴직연금 계좌 비교</strong><br />
        · DB형(확정급여형): 회사가 운영, 퇴직 시 확정 금액을 IRP로 이전<br />
        · DC형(확정기여형): 회사가 매년 납입, 본인이 운용, 퇴직 시 IRP로 자동 이전<br />
        · 공통: 퇴직 후 최종적으로 IRP 계좌에 쌓임
      </BorderBox>

      <p style={body.prose}>
        DB형이든 DC형이든 퇴직하면 결국 IRP 계좌가 필요해요. 퇴직연금 제도가 있는 회사는 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법</a>에 따라 퇴직금을 IRP로 이전해야 해요. 퇴직 전에 IRP 계좌를 만들어두고 계좌번호를 인사팀에 알려줘야 14일 내 이체가 가능해요.
      </p>

      <EligibilityChecker
        title="내 상황 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>퇴직금 예상액으로 계좌 종류 먼저 파악해요</H2>

      <p style={body.prose}>
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금이 나와요. 300만원이 넘으면 IRP 계좌가 필수라는 걸 바로 알 수 있어요. IRP에 추가로 납입하면 세액공제도 같이 받을 수 있고요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 월 평균급여 × 근속연수 (법정 산식 기준). 정확한 계산은 퇴직금-계산기 페이지에서."
      />

      <p style={body.prose}>
        IRP에 연간 300만원을 추가 납입하면 세액공제를 약 49.5만원 받을 수 있어요(소득 5,500만원 이하 기준). 퇴직금 수령 외에도 노후 준비 수단으로 쓸 수 있는 거예요. <a href="/w/퇴직금-세금" style={body.link}>퇴직금 세금과 IRP 절세</a>에서 더 자세한 내용을 볼 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>IRP 계좌 개설에 필요한 서류예요</H2>

      <p style={body.prose}>
        IRP 계좌 개설은 생각보다 간단해요. 은행 앱이나 증권사 앱에서 10분 내로 끝나는 경우가 많아요. 신분증과 기존 금융계좌만 있으면 대부분 비대면 개설이 돼요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        재직증명서는 일부 금융사에서 요구하기도 해요. 미리 인사팀에 받아두면 번거로움을 줄일 수 있어요. 은행·증권사·보험사 중 어디서 만들든 퇴직금을 받는 기능은 같아요. 차이는 수수료와 운용 상품이에요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>퇴직금 받는 통장 준비 절차, 4단계예요</H2>

      <p style={body.prose}>
        퇴직 전에 미리 준비해야 14일 내 이체 기한을 놓치지 않아요. 회사가 지급 기한을 넘기면 <a href="/w/퇴직금-지연이자" style={body.link}>연 20% 지연이자</a>를 받을 수 있지만, 그 상황 자체가 번거롭거든요. 아래 순서대로 미리 챙겨두세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        DC형 퇴직연금인 경우 회사가 자동으로 IRP로 이전해줘요. 하지만 IRP 계좌번호를 미리 알려주지 않으면 지연될 수 있어요. 퇴직 의사를 밝히는 시점에 IRP 계좌도 함께 만들어두는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>퇴직금 계좌 준비 체크리스트</H2>

      <p style={body.prose}>
        퇴직 전에 챙겨야 할 항목을 정리했어요. 막상 퇴직일이 다가오면 정신없어서 빠뜨리기 쉬운 것들이에요. 아래 목록대로 하나씩 처리하면 빠짐없이 끝낼 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP 계좌 수수료 비교 (2025년 기준)<br />
        · 증권사: 연 0.2~0.3% (미래에셋·삼성·NH투자증권 등)<br />
        · 은행: 연 0.4~0.5%<br />
        · 일부 증권사: 수수료 0% 상품 운영 중<br />
        · 운용 상품: 증권사는 ETF, 은행은 예·적금 중심
      </GreenBox>

      <p style={body.prose}>
        수수료 차이가 장기적으로 크게 벌어져요. 퇴직금 5,000만원을 20년 운용한다면 연 0.3%와 0.5% 차이가 수백만원이 되기도 해요. IRP를 단순 수령 계좌가 아니라 노후 자산 운용 창구로 보는 게 맞아요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
