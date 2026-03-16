"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-중간정산-주택구입";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택 구입을 앞두고 있어요" },
  { id: "c2", label: "퇴직금을 중간정산해서 주택 구입에 쓰고 싶어요" },
  { id: "c3", label: "주택 구입 중간정산 조건이 맞는지 모르겠어요" },
  { id: "c4", label: "얼마나 받을 수 있는지 미리 계산해보고 싶어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 평균급여",
    min: 200, max: 600, step: 50, defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "근속 기간 (중간정산까지)",
    min: 1, max: 20, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "중간정산 가능 금액",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 근속기간 초기화",
    getValue: () => 0,
    format: () => "중간정산 후 근속기간 0년 재시작",
  },
];

const DOCS = [
  { name: "주택 매매계약서 또는 분양계약서", required: true, where: "부동산 계약 시 수령" },
  { name: "무주택 확인서 (주민등록등본)", required: true, where: "정부24에서 무료 발급" },
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 양식" },
  { name: "금융기관 대출 확인서 (전세 사유 시)", required: false, where: "은행 또는 금융기관" },
];

const STEPS = [
  {
    title: "무주택 요건 확인",
    desc: "주택 구입 중간정산은 무주택 근로자만 가능해요. 본인·배우자 명의로 주택이 없어야 해요. 이미 주택이 있으면 이 사유로는 신청할 수 없어요.",
    tip: "주민등록등본으로 무주택 확인 가능해요",
  },
  {
    title: "주택 계약서 준비",
    desc: "주택 매매계약서 또는 분양계약서가 필요해요. 계약서에 본인이 매수인으로 기재돼야 해요. 전세 보증금 부족 사유도 가능하지만 별도 요건이 있어요.",
    tip: "계약일 기준으로 중간정산을 신청해야 해요",
  },
  {
    title: "인사팀에 신청서 제출",
    desc: "중간정산 신청서와 주택 계약서, 무주택 확인서를 인사팀에 제출해요. 회사가 정당한 이유 없이 거부하면 위법이에요. 승인 후 퇴직소득세를 원천징수하고 지급해요.",
    tip: "신청서·증빙을 한 세트로 제출하면 처리가 빨라요",
  },
  {
    title: "퇴직소득세 납부 및 수령",
    desc: "중간정산 금액에 퇴직소득세가 원천징수돼요. 이후 근속기간은 0년으로 재시작해요. 300만원 초과 시 IRP 계좌로 수령 후 인출할 수 있어요.",
    tip: "중간정산 후 퇴직금이 다시 쌓이기 시작해요",
  },
];

const CHECKLIST = [
  "무주택 — 본인·배우자 명의 주택 없음",
  "주택 계약서 — 매매·분양계약서 사본",
  "무주택 확인서 — 주민등록등본",
  "중간정산 신청서 — 인사팀 양식",
  "근속기간 초기화 — 정산 후 재시작",
];

const FAQS = [
  {
    q: "주택 구입 중간정산 조건이 뭔가요?",
    a: "무주택 근로자가 주택을 구입할 때 신청할 수 있어요. 본인·배우자 명의로 주택이 없어야 해요. 주택 매매계약서가 있어야 해요.",
  },
  {
    q: "전세 계약도 중간정산이 가능한가요?",
    a: "전세보증금 마련 목적으로도 가능해요. 다만 무주택 요건과 전세보증금 부족 증빙이 필요해요.",
  },
  {
    q: "중간정산하면 세금이 얼마나 나오나요?",
    a: "중간정산 금액에 퇴직소득세가 원천징수돼요. 근속연수 공제가 적용돼서 세율이 높지 않아요. 근속기간이 길수록 공제액이 커요.",
  },
  {
    q: "중간정산 후 다시 퇴직금이 쌓이나요?",
    a: "맞아요. 중간정산 후 근속기간이 0년으로 초기화되고 다시 적립이 시작돼요.",
  },
  {
    q: "회사가 거부하면 어떻게 하나요?",
    a: "법정 사유가 명확하면 회사가 거부할 수 없어요. 거부 시 고용노동부에 진정을 낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      {
        label: "근로자퇴직급여보장법 시행령 제3조 — 중간정산 허용 사유",
        url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령",
      },
    ],
  },
  {
    category: "공식 자료",
    items: [
      {
        label: "고용노동부 — 퇴직금 중간정산 안내",
        url: "https://www.moel.go.kr",
      },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "중간정산 조건 전체",
    description: "법정 허용 사유 5가지 정리.",
  },
  {
    slug: "퇴직금-중간정산",
    title: "퇴직금 중간정산 전체 안내",
    description: "신청 방법부터 절차까지.",
  },
  {
    slug: "퇴직금-중간정산-세금",
    title: "중간정산 세금 계산",
    description: "원천징수 금액 미리 확인.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 중간정산 · 주택구입</p>
        <h1 style={body.h1}>
          주택 구입할 때 퇴직금 중간정산이 가능한가요?
          <br />
          <span style={body.h1sub}>무주택 요건부터 신청 절차, 세금까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        집을 사려는데 자금이 부족할 때 퇴직금을 미리 받을 수 있는지 궁금하죠? 결론부터 말하면, 무주택 근로자가 주택을 구입할 때는 <a href="/w/퇴직금-중간정산-조건" style={body.link}>퇴직금 중간정산</a>이 법적으로 허용돼요. 주택 매매계약서와 무주택 확인서를 준비해서 회사에 신청하면 돼요.
      </p>
      <p style={body.prose}>
        중간정산 후 근속기간이 0년으로 초기화되는 점, 퇴직소득세가 원천징수되는 점은 미리 알고 가야 해요. 아래에서 조건·계산·서류·절차를 순서대로 풀어드릴게요.
      </p>

      <ArticleAd />

      <Divider />

      {/* 섹션 1: 조건 설명 */}
      <H2>주택 구입 중간정산, 어떤 조건이 필요한가요</H2>

      <p style={body.prose}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={body.link} target="_blank" rel="noopener noreferrer">근로자퇴직급여보장법 시행령 제3조</a>에 따르면, 무주택 근로자가 본인 명의로 주택을 구입하는 경우 퇴직금 중간정산을 신청할 수 있어요. '무주택'이란 신청일 기준으로 본인과 배우자 명의로 주택이 없는 상태를 말해요.
      </p>

      <GreenBox>
        주택 구입 중간정산 핵심 조건<br />
        · 본인·배우자 명의 주택 없음 (무주택)<br />
        · 주택 매매계약서 또는 분양계약서 보유<br />
        · 해당 주택이 본인 명의로 계약될 것<br />
        · 재직 중인 근로자 (퇴직 후 신청 불가)
      </GreenBox>

      <p style={body.prose}>
        주택 구입 외에 전세보증금이 부족한 경우도 같은 조항으로 신청할 수 있어요. 이 경우엔 무주택 확인서 외에 전세계약서와 보증금 부족 증빙이 추가로 필요해요. 두 사유 모두 동일 근로자에게 반복 적용도 돼요.
      </p>

      <p style={body.prose}>
        이미 주택을 갖고 있거나 배우자 명의 주택이 있다면 이 사유로는 신청이 안 돼요. 다른 중간정산 허용 사유(요양, 파산 등)에 해당하는지 <a href="/w/퇴직금-중간정산-조건" style={body.link}>중간정산 조건 전체 글</a>에서 확인해보세요.
      </p>

      <EligibilityChecker
        title="주택 구입 중간정산 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>중간정산 금액, 얼마나 받을 수 있나요</H2>

      <p style={body.prose}>
        퇴직금 중간정산 금액은 기본적으로 '1일 평균임금 × 30일 × 근속연수' 공식으로 계산해요. 월 평균급여와 중간정산 시점까지의 근속기간을 입력하면 대략적인 금액을 확인할 수 있어요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 금액은 평균임금(상여금·수당 포함) 기준으로 달라질 수 있어요. 정확한 금액은 인사팀에 문의하세요."
      />

      <p style={body.prose}>
        중간정산을 받으면 그 이후 근속기간이 0년으로 초기화돼요. 나중에 퇴직할 때 퇴직금 계산은 중간정산 이후 기간부터 다시 시작해요. 주택 구입 자금으로 쓸 만큼만 신청하는 게 장기적으로 유리해요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>신청에 필요한 서류가 뭔가요</H2>

      <p style={body.prose}>
        서류 준비가 가장 중요해요. 하나라도 빠지면 회사에서 반려할 수 있고, 그러면 주택 잔금일을 맞추기 어려워질 수 있어요. 계약일로부터 잔금일까지 여유가 충분하지 않을 때는 서류를 미리 준비해두는 게 좋아요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        주민등록등본은 <a href="https://www.gov.kr" style={body.link} target="_blank" rel="noopener noreferrer">정부24</a>에서 무료로 발급받을 수 있어요. 본인과 배우자가 같은 주소에 있지 않다면 배우자 명의 주택 유무 확인을 위해 가족관계증명서가 추가로 필요할 수 있어요.
      </p>

      <p style={body.prose}>
        중간정산 신청서 양식은 회사마다 달라요. 인사팀에 먼저 연락해서 양식을 받고, 작성 방법을 확인하는 게 빨라요. 서류를 한꺼번에 제출하면 처리 시간을 줄일 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>신청 절차를 단계별로 정리했어요</H2>

      <p style={body.prose}>
        주택 계약서에 잔금일이 적혀 있죠? 그 날짜에 맞춰 역산해서 중간정산 신청을 시작해야 해요. 회사마다 처리 기간이 다르지만 보통 1~2주는 잡아야 해요. 잔금일 직전에 신청하면 늦을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        회사가 법정 사유에 해당하는데도 중간정산을 거부하면 위법이에요. <a href="https://www.moel.go.kr" style={body.link} target="_blank" rel="noopener noreferrer">고용노동부</a> 고객상담센터(1350)에 전화하거나 온라인 진정을 넣을 수 있어요. 다만 회사 내부 규정으로 신청 시기를 제한하는 경우는 별도로 확인해야 해요.
      </p>

      <p style={body.prose}>
        퇴직소득세는 중간정산 금액에 바로 원천징수돼요. 세금이 얼마나 나오는지 미리 알고 싶다면 <a href="/w/퇴직금-중간정산-세금" style={body.link}>중간정산 세금 계산 글</a>에서 공제 구조와 계산 방법을 확인해보세요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 + GreenBox */}
      <H2>신청 전 이것만 챙기면 돼요</H2>

      <p style={body.prose}>
        주택 잔금일을 앞두고 바빠지기 전에, 아래 체크리스트로 빠뜨린 게 없는지 먼저 확인하세요. 하나라도 빠지면 신청이 반려되거나 지연될 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        중간정산 후 꼭 기억해야 할 것<br />
        · 근속기간이 0년으로 초기화되니 다음 퇴직금은 정산 이후 기간부터 계산돼요<br />
        · 퇴직소득세는 수령 금액에서 바로 차감돼요<br />
        · 중간정산 이후에도 퇴직금은 계속 쌓여요 — 퇴직 시 다시 수령 가능
      </GreenBox>

      <p style={body.prose}>
        중간정산 이후 퇴직연금(DC·DB) 운용 방식에 따라 적립 구조가 달라질 수 있어요. DC형은 근속기간 초기화 후 새 적립이 시작되고, DB형은 회사가 전체를 운용하는 방식이라 구조가 달라요. 소속 회사의 퇴직연금 유형을 미리 확인하는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
