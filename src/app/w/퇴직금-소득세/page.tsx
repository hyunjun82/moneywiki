"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-소득세";

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금",
    min: 500, max: 10000, step: 100, defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 35, step: 1, defaultValue: 10,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    id: "result1",
    label: "퇴직소득세 (추정)",
    highlight: true,
    getValue: (v: Record<string, number>) =>
      Math.round(Math.max(0, v.amount * 10000 * 0.05 * (1 - Math.min(v.years, 30) * 0.015))),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    id: "result2",
    label: "세후 수령액",
    highlight: false,
    getValue: (v: Record<string, number>) => {
      const tax = Math.round(Math.max(0, v.amount * 10000 * 0.05 * (1 - Math.min(v.years, 30) * 0.015)));
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직소득원천징수영수증", required: true, where: "회사 인사팀" },
  { name: "근로소득원천징수영수증", required: false, where: "회사 인사팀" },
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "IRP 이체 확인서", required: false, where: "IRP 금융기관" },
];

const STEPS = [
  {
    title: "원천징수영수증 수령 확인",
    desc: "회사에서 퇴직소득원천징수영수증 발급 요청.",
    tip: "영수증에 공제 항목 모두 확인",
  },
  {
    title: "공제 항목 검토",
    desc: "근속연수공제가 정확히 적용됐는지 확인.",
    tip: "근속 10년이면 4,000만원 공제",
  },
  {
    title: "세금 재계산",
    desc: "공제 후 세액이 맞는지 직접 계산 또는 홈택스 활용.",
    tip: "hometax.go.kr 퇴직소득세 모의계산",
  },
  {
    title: "환급 여부 확인",
    desc: "과오납 시 경정청구로 5년 이내 환급 가능.",
    tip: "세무사 없이도 홈택스에서 직접 가능",
  },
];

const CHECKLIST = [
  { label: "원천징수영수증 수령", desc: "퇴직 시 회사에 요청" },
  { label: "근속연수공제", desc: "근속기간 정확히 확인" },
  { label: "세액 일치 여부", desc: "직접 계산해서 비교" },
  { label: "환급 청구", desc: "과오납 시 5년 이내 경정청구" },
  { label: "IRP 연금", desc: "55세 이후 연금 수령 시 30% 추가 절세" },
];

const CHECK_ITEMS = [
  "퇴직소득원천징수영수증을 받았어요",
  "근속기간이 정확히 기록되어 있어요",
  "IRP로 수령했어요",
  "연말정산에서 환급이 가능한지 궁금해요",
];

const FAQS = [
  {
    q: "퇴직소득세와 근로소득세가 어떻게 다른가요?",
    a: "퇴직소득세는 근무기간 전체를 기준으로 분류과세해요. 일반 근로소득세보다 훨씬 낮은 실질 세율이 적용돼요.",
  },
  {
    q: "퇴직소득세 계산 구조가 어떻게 되나요?",
    a: "퇴직금 - 근속연수공제 = 퇴직소득 → 환산급여 = 퇴직소득×12÷근속연수 → 환산급여공제 적용 → 세율 적용 후 ÷12×근속연수 = 퇴직소득세",
  },
  {
    q: "IRP로 받으면 퇴직소득세를 내지 않나요?",
    a: "이체 시점에는 안 내요. 나중에 연금·일시금으로 수령할 때 납부해요. 연금 수령 시 30% 감면이 있어요.",
  },
  {
    q: "퇴직소득세 환급을 받을 수 있는 경우가 있나요?",
    a: "회사가 공제를 잘못 적용해서 세금을 더 냈다면 경정청구로 환급받을 수 있어요. 홈택스에서 직접 신청 가능해요.",
  },
  {
    q: "퇴직금 세금 계산을 어디서 해볼 수 있나요?",
    a: "국세청 홈택스(hometax.go.kr)의 '퇴직소득세 모의계산' 메뉴에서 정확하게 계산해볼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    name: "소득세법 제22조 — 퇴직소득",
    url: "https://www.law.go.kr/법령/소득세법",
  },
  {
    category: "공식",
    name: "국세청 홈택스 — 퇴직소득세 모의계산",
    url: "https://www.hometax.go.kr",
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금-몇프로",
    title: "퇴직금 세금 몇 퍼센트?",
    desc: "퇴직소득세 계산기",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, IRP 절세까지",
    desc: "세금 절약 방법 총정리",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    desc: "연금 선택 시 30% 감면",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 소득세 · 퇴직소득세</p>
        <h1 style={body.h1}>
          퇴직금 소득세, 어떻게 계산되나요?
          <br />
          <span style={body.h1sub}>퇴직소득세 공식부터 절세 방법까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금에 붙는 소득세는 '퇴직소득세'예요. 일반 소득세와 계산 방식이 완전히 달라서, 공제 적용 후 실질 세율이 낮아지는 구조예요. 근속 10년 퇴직금 3,000만원이면 세금이 100만원대도 나올 수 있어요.
      </p>
      <p style={body.prose}>
        원천징수영수증을 꼭 받아서 공제가 제대로 적용됐는지 봐야 해요. 잘못 계산된 세금은 5년 이내에 환급 청구도 가능하고요. 아래에서 계산 구조와 절세 방법을 하나씩 풀어드릴게요.
      </p>

      <Divider />

      {/* 섹션 1: 퇴직소득세란 */}
      <H2>퇴직소득세, 일반 소득세와 뭐가 다른가요</H2>

      <p style={body.prose}>
        퇴직소득세는 퇴직금에만 적용되는 별도 세금이에요. <a href="/w/근로소득세" style={body.link}>근로소득세</a>와 달리 '분류과세' 방식으로 계산돼요. 쉽게 말하면, 수십 년치 소득을 한꺼번에 받는 점을 고려해서 세금을 대폭 줄여주는 구조예요.
      </p>

      <GreenBox>
        퇴직소득세 계산 순서<br />
        ① 퇴직금 - 근속연수공제 = 퇴직소득<br />
        ② 퇴직소득 × 12 ÷ 근속연수 = 환산급여<br />
        ③ 환산급여 - 환산급여공제 = 환산과세표준<br />
        ④ 세율 적용 → 산출세액 ÷ 12 × 근속연수 = 퇴직소득세
      </GreenBox>

      <p style={body.prose}>
        핵심은 근속연수공제예요. <a href="https://www.law.go.kr/법령/소득세법" style={body.link} target="_blank" rel="noopener noreferrer">소득세법 제48조</a>에 따라, 근속 5년이면 1,500만원, 10년이면 4,000만원, 20년이면 1억원을 퇴직금에서 먼저 빼줘요. 공제 후 남은 금액에만 세금이 붙어요.
      </p>

      <BorderBox>
        <strong>근속연수공제 기준 (소득세법 제48조)</strong><br />
        · 5년 이하: 근속연수 × 30만원<br />
        · 5~10년: 150만원 + (근속연수-5) × 50만원<br />
        · 10~20년: 400만원 + (근속연수-10) × 80만원<br />
        · 20년 초과: 1,200만원 + (근속연수-20) × 120만원
      </BorderBox>

      <p style={body.prose}>
        환산급여공제도 있어요. 퇴직소득을 연 단위로 환산한 금액에서 추가로 공제해줘요. 두 번의 공제를 거치고 나서 세율을 적용하기 때문에, 최종 세율은 퇴직금의 5~10% 수준으로 매우 낮아요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>퇴직소득세 간편 계산기</H2>

      <p style={body.prose}>
        퇴직금과 근속기간을 입력하면 대략적인 세금이 나와요. 정확한 계산은 공제 구조가 복잡해서 국세청 홈택스에서 하는 게 맞아요. 여기서는 어느 정도인지 감 잡는 용도로 쓰세요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 세금은 근속연수공제+환산급여공제 후 세율 적용. 국세청 홈택스에서 정확히 계산 가능."
      />

      <p style={body.prose}>
        근속연수가 길수록 세금이 줄어드는 걸 볼 수 있어요. 20년 근속이면 같은 퇴직금이라도 세금이 10년 근속의 절반 이하로 나오기도 해요. 이게 퇴직소득세 분류과세의 핵심이에요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd />

      <Divider />

      {/* 섹션 3: IRP 절세 */}
      <H2>IRP로 받으면 세금을 줄일 수 있어요</H2>

      <p style={body.prose}>
        퇴직금을 <a href="/w/퇴직금-IRP-수령방법" style={body.link}>IRP(개인형 퇴직연금)</a>로 수령하면 수령 시점의 세금을 나중으로 미룰 수 있어요. 이걸 '과세이연'이라고 해요. IRP 계좌로 이체되는 시점에는 퇴직소득세를 내지 않아요.
      </p>

      <GreenBox>
        IRP 절세 포인트<br />
        · 55세 이후 연금 수령 시 퇴직소득세 30% 감면<br />
        · 10년 초과 수령 시 추가 40% 감면 (최대 60% 감면 가능)<br />
        · 일시금 수령 시 원래 세금 그대로 납부
      </GreenBox>

      <p style={body.prose}>
        연금으로 나눠 받으면 세금 부담이 크게 줄어요. 퇴직소득세 1,000만원이 나왔더라도 연금 수령 방식이면 300~600만원으로 줄 수 있어요. 55세 이후 생활비 목적으로 받으면 가장 유리해요.
      </p>

      <p style={body.prose}>
        다만 IRP 계좌에서 중도 인출하면 세금이 다시 붙어요. 연금 수령 요건(만 55세, 가입 5년 이상)을 갖추지 못하면 절세 효과가 없어요. <a href="/w/퇴직금-세금" style={body.link}>IRP 절세 방법 자세히</a>에서 시뮬레이션해볼 수 있어요.
      </p>

      <EligibilityChecker
        title="IRP 절세 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 4: 환급 */}
      <H2>세금을 더 냈다면 환급받을 수 있어요</H2>

      <p style={body.prose}>
        퇴직소득원천징수영수증을 받고 나서 세금이 이상하다 싶으면 직접 살펴보세요. 회사 인사팀이나 세무담당자가 근속연수를 잘못 기입하거나, 공제를 빠뜨리는 경우가 종종 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        과오납이 확인되면 경정청구로 환급받을 수 있어요. 법정 기한은 5년이에요. 홈택스(hometax.go.kr)에서 '경정청구' 메뉴로 들어가면 세무사 없이도 직접 신청할 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        영수증이 없으면 회사 인사팀에 다시 요청하면 돼요. 퇴직 후 언제든 재발급이 가능해요. 원천징수영수증을 기준으로 세금 내역을 하나씩 따라가다 보면 어디서 차이가 났는지 찾을 수 있어요.
      </p>

      <Divider />

      {/* 체크리스트 */}
      <H2>퇴직소득세 처리 체크리스트</H2>

      <p style={body.prose}>
        퇴직하고 나서 챙겨야 할 것들이 생각보다 많아요. 아래 목록대로 하나씩 처리하면 빠뜨리는 일 없이 끝낼 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <p style={body.prose}>
        특히 IRP 이체 확인서는 연금 수령 시 30% 감면 혜택과 직결돼요. 퇴직금이 IRP로 들어갔는지, 일시금으로 나갔는지 꼭 구분해두세요. 나중에 세금 낼 때 기준이 달라져요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
