"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-중간정산-조건";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택 구입 또는 전세 계약을 앞두고 있어요" },
  { id: "c2", label: "본인 또는 부양가족이 6개월 이상 요양 중이에요" },
  { id: "c3", label: "천재지변·재해로 피해를 입었어요" },
  { id: "c4", label: "근속기간이 5년 이상이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간 (중간정산까지)", min: 1, max: 20, step: 1, defaultValue: 7, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 가능 금액",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 리셋 (재근속 시작)",
    getValue: () => 0,
    format: () => "중간정산 후 근속기간 0년으로 초기화",
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 양식" },
  { name: "주택 계약서 (주택 구입·전세 사유 시)", required: true, where: "등기소 또는 공인중개사" },
  { name: "진단서·치료비 영수증 (요양 사유 시)", required: true, where: "병원 발급" },
  { name: "재해 피해 확인서 (재해 사유 시)", required: true, where: "지자체 또는 소방서" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "중간정산은 아무 때나 안 되고, 법이 정한 사유가 있어야 해요. 주택 구입, 전세보증금, 장기 요양, 천재지변, 파산·회생이 대표적인 법정 사유예요. 사유가 없으면 중간정산 신청이 거부될 수 있어요.",
    tip: "사유별 증빙서류 목록을 먼저 인사팀에 확인하세요",
  },
  {
    title: "인사팀에 신청서 제출",
    desc: "법정 사유에 해당하면 인사팀에 중간정산 신청서와 증빙서류를 제출해요. 회사마다 양식이 다를 수 있으니 미리 받아두세요. 회사가 정당한 이유 없이 거부하는 건 위법이에요.",
    tip: "신청서와 증빙을 한 세트로 묶어서 제출하면 처리가 빨라요",
  },
  {
    title: "퇴직소득세 원천징수",
    desc: "중간정산 금액에 대해 퇴직소득세가 원천징수돼요. 이때 근속연수는 중간정산 시점까지만 적용해요. 중간정산 후 근속기간은 0년으로 초기화돼요.",
    tip: "중간정산 이력은 퇴직 시 최종 퇴직금 계산에 영향을 줘요",
  },
  {
    title: "지급 및 이후 관리",
    desc: "승인되면 14일 이내에 지급받아요. 중간정산 후 남은 재직기간도 퇴직금이 다시 적립돼요. 단, IRP 의무화 이후 중간정산 자체가 더 어려워졌어요.",
    tip: "IRP 계좌가 있으면 중간정산금도 IRP로 받을 수 있어요",
  },
];

const CHECKLIST = [
  "법정 사유 해당 여부 — 주택구입·요양·재해·파산만 가능",
  "증빙서류 — 사유별 서류 목록 인사팀 확인",
  "퇴직소득세 원천징수 — 중간정산도 세금 납부",
  "근속기간 초기화 — 중간정산 후 재근속 0년",
  "IRP 의무가입 여부 — 300만원 초과 시 IRP 수령",
];

const FAQS = [
  {
    q: "중간정산을 받으면 퇴직금이 줄어드나요?",
    a: "중간정산 자체는 이미 쌓인 퇴직금을 미리 받는 거예요. 이후 재직기간에 대한 퇴직금은 새로 쌓여요. 전체 합산하면 동일하지만, 세금 계산에서 근속연수가 나뉘어 절세 효과가 줄어들 수 있어요.",
  },
  {
    q: "집을 사면 무조건 중간정산이 되나요?",
    a: "무주택 근로자가 주택을 구입하는 경우에만 해당해요. 이미 집이 있거나 투자 목적이라면 안 돼요. 전세보증금 부족의 경우도 가능하지만 요건이 있어요.",
  },
  {
    q: "회사가 중간정산을 거부하면 어떻게 하나요?",
    a: "법정 사유가 명확히 있는데도 거부하면 고용노동부에 진정을 낼 수 있어요. 다만 회사가 동의해야 하는 임의 사유는 회사 재량이에요.",
  },
  {
    q: "중간정산 후 퇴직 시 퇴직금은 어떻게 계산하나요?",
    a: "중간정산 이후 재직한 기간의 임금만 기준으로 다시 계산해요. 중간정산 전 기간은 이미 정산됐으니 포함 안 돼요. 근속연수도 중간정산 이후부터 다시 세요.",
  },
  {
    q: "중간정산과 IRP 의무화는 어떻게 연관되나요?",
    a: "2022년부터 퇴직금 300만원 초과 시 IRP로만 수령해야 해요. 중간정산도 동일하게 적용돼요. 단, 법정 사유에 해당하면 IRP에서 바로 인출할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조 3항 — 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 전체 안내", description: "신청 방법부터 절차까지 정리했어요." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 계산", description: "원천징수 금액을 미리 확인해요." },
  { slug: "퇴직금-중간정산-주택구입", title: "주택 구입 중간정산", description: "무주택자 주택 구입 시 중간정산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 중간정산 · 조건</p>
        <h1 style={body.h1}>
          퇴직금 중간정산, 어떤 경우에 받을 수 있나요?
          <br />
          <span style={body.h1sub}>법정 허용 사유 5가지부터 신청 절차까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직금 중간정산은 아무나 받을 수 있는 게 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={body.link} target="_blank" rel="noopener noreferrer">
          근로자퇴직급여보장법 제8조 3항
        </a>
        에서 정한 법정 사유에 해당해야만 신청할 수 있어요. 주택 구입, 전세보증금, 장기 요양, 천재지변, 파산·회생이 대표적이에요.
      </p>
      <p style={body.prose}>
        법정 사유가 없는데 요청하면 회사가 거부해도 문제없어요. 반대로 사유가 명확한데 거부당하면 고용노동부에 진정할 수 있어요. 아래에서 5가지 사유와 신청 절차를 정리할게요.
      </p>

      <Divider />

      <ArticleAd position="intro" />

      {/* 섹션 1: 조건 */}
      <H2>중간정산이 되는 조건이 뭔가요?</H2>

      <p style={body.prose}>
        <a href="/w/퇴직금-중간정산" style={body.link}>퇴직금 중간정산</a>은 퇴직 전에 이미 쌓인 퇴직금을 미리 받는 제도예요. 고용노동부가 인정한 법정 사유가 있어야만 신청 가능하고, 사유 없이 받으면 나중에 세금 문제가 생길 수 있어요.
      </p>

      <GreenBox>
        중간정산 법정 허용 사유 5가지 (근로자퇴직급여보장법 제8조 3항)<br />
        ① 무주택 근로자가 주택을 구입하는 경우<br />
        ② 무주택 근로자의 전세보증금이 부족한 경우<br />
        ③ 본인 또는 부양가족이 6개월 이상 요양이 필요한 경우<br />
        ④ 천재지변·재해로 피해를 입은 경우<br />
        ⑤ 파산선고·개인회생 절차 개시를 받은 경우
      </GreenBox>

      <p style={body.prose}>
        주택 구입 조건에서 '무주택자'가 핵심이에요. 본인 명의 집이 한 채라도 있으면 안 돼요. 세대원(배우자 포함) 전체가 무주택이어야 해요. 전세보증금 부족도 마찬가지로 무주택 근로자에게만 해당해요.
      </p>

      <p style={body.prose}>
        요양 사유는 '6개월 이상'이라는 기간 요건이 있어요. 단순 입원이나 짧은 치료는 해당 안 돼요. 의사 진단서로 6개월 이상 요양이 필요하다는 걸 증명해야 하고, 부양가족(배우자, 자녀, 부모)도 포함돼요.
      </p>

      <EligibilityChecker
        title="중간정산 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <p style={body.prose}>
        위 사유 중 하나라도 해당한다면 중간정산 신청이 가능해요. 단, 사유를 증명하는 서류를 반드시 갖춰야 해요. 서류 없이 구두로만 신청하면 회사가 거부할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>중간정산으로 얼마나 받을 수 있나요?</H2>

      <p style={body.prose}>
        중간정산 금액은 일반 퇴직금 계산 방식과 동일해요. 퇴직 전 3개월 평균임금 × 근속연수(중간정산 시점까지)로 계산하면 돼요. 아래 슬라이더로 대략적인 금액을 먼저 확인해보세요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 금액은 퇴직 전 3개월 평균임금 기준. 상여금·수당 포함 여부에 따라 달라질 수 있어요."
      />

      <p style={body.prose}>
        중간정산을 받으면 근속기간이 0년으로 초기화돼요. 이후 재직기간부터 퇴직금이 새로 적립돼요. 중간정산 전에 받는 게 유리한지, 퇴직까지 기다리는 게 나은지는{" "}
        <a href="/w/퇴직금-중간정산-세금" style={body.link}>중간정산 세금 계산</a>
        에서 비교해볼 수 있어요.
      </p>

      <BorderBox>
        <strong>중간정산 시 세금 주의사항</strong><br />
        · 중간정산 금액에도 퇴직소득세가 원천징수돼요<br />
        · 근속연수가 짧으면 공제가 적게 적용돼 세금이 늘어날 수 있어요<br />
        · 나중에 퇴직 시 재정산되므로 이중 과세는 아니에요
      </BorderBox>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>중간정산 신청에 필요한 서류</H2>

      <p style={body.prose}>
        사유마다 제출해야 하는 서류가 달라요. 주택 구입이라면 매매계약서나 등기서류, 요양이라면 진단서와 치료비 영수증이 필요해요. 사유를 증명하지 못하면 신청이 반려될 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        인사팀에 제출하기 전에 서류가 빠진 게 없는지 먼저 확인하는 게 좋아요. 사유에 맞지 않는 서류를 냈다가 반려되면 다시 준비하는 데 시간이 걸려요. 처음부터 한 번에 맞게 제출하는 게 가장 빠른 방법이에요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>중간정산 신청 절차 4단계</H2>

      <p style={body.prose}>
        법정 사유가 있다는 걸 확인했다면, 신청 절차를 밟으면 돼요. 회사마다 처리 기간이 다를 수 있지만, 승인 후 14일 이내에 지급받는 게 원칙이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        중간정산이 완료되면 회사는 퇴직소득원천징수영수증을 발급해줘요. 이 서류는 나중에{" "}
        <a href="/w/퇴직금-소득세" style={body.link}>퇴직소득세</a>를 신고하거나 환급받을 때 필요하니까 잘 보관해두세요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>중간정산 체크리스트</H2>

      <p style={body.prose}>
        신청하기 전에 아래 항목을 하나씩 점검해보세요. 빠뜨리는 것 없이 준비해야 한 번에 통과할 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        중간정산 후 근속기간 초기화 주의<br />
        중간정산을 받으면 그 시점부터 근속기간이 0년으로 다시 시작돼요. 퇴직금 계산에서 근속연수가 짧아지면 나중에 받는 퇴직금도 줄어들 수 있어요. 퇴직 시기가 얼마 안 남았다면 중간정산 대신 퇴직까지 기다리는 게 세금 면에서 유리할 수 있어요.
      </GreenBox>

      <p style={body.prose}>
        IRP 의무화도 챙겨야 해요. 2022년부터 퇴직금 300만원 초과 시 IRP 계좌로만 수령해야 해요. 중간정산도 예외가 없어요. IRP 계좌가 없다면 신청 전에 미리 개설해두세요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
