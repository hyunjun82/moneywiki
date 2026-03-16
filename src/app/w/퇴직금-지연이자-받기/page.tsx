"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-지연이자-받기";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금이 안 왔어요" },
  { id: "c2", label: "지연이자를 받을 수 있는지 알고 싶어요" },
  { id: "c3", label: "얼마나 받을 수 있는지 계산해보고 싶어요" },
  { id: "c4", label: "지연이자 청구 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  {
    id: "severance",
    label: "미지급 퇴직금",
    min: 300, max: 10000, step: 300, defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "delay",
    label: "지연 일수 (14일 초과분)",
    min: 1, max: 365, step: 1, defaultValue: 30,
    format: (v: number) => `${v}일`,
  },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) =>
      Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구액 (퇴직금+이자)",
    getValue: (v: Record<string, number>) =>
      v.severance * 10000 + Math.round(v.severance * 10000 * 0.2 * v.delay / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: false,
  },
];

const DOCS = [
  { name: "퇴직 확인서", required: true, where: "회사 인사팀" },
  { name: "내용증명 사본", required: true, where: "우체국 발송 후 보관" },
  { name: "급여명세서 (3개월)", required: true, where: "인사팀" },
  { name: "IRP 계좌번호", required: true, where: "은행·증권사" },
];

const STEPS = [
  {
    title: "지연이자 발생 시점 확인",
    desc: "퇴직 후 14일이 지나면 자동으로 연 20% 지연이자가 발생해요. 14일째 되는 날 다음 날부터 계산돼요. 합의에 의한 지급 지연은 예외가 될 수 있어요.",
    tip: "14일은 달력 기준 — 주말·공휴일 포함",
  },
  {
    title: "내용증명 발송",
    desc: "퇴직금과 지연이자 지급을 요청하는 내용증명을 발송해요. 발송일부터 법적 청구 기록이 남아요. 우체국 또는 온라인 우편에서 발송 가능해요.",
    tip: "내용증명에 지연이자 청구도 명시하세요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "내용증명 후에도 지급이 없으면 고용노동부 민원마당에서 진정을 내요. 퇴직금과 지연이자를 함께 청구 가능해요. 근로감독관이 지급 명령을 내려요.",
    tip: "minwon.moel.go.kr — 온라인 24시간 신청 가능",
  },
  {
    title: "소액심판 또는 민사소송",
    desc: "진정으로 해결이 안 되면 소액심판(3,000만원 이하)으로 청구할 수 있어요. 소멸시효 3년 이내에 청구해야 해요. 대한법률구조공단(132)에서 무료 지원이 가능해요.",
    tip: "소액심판은 법원에서 빠르게 처리돼요",
  },
];

const CHECKLIST = [
  { label: "지연이자 발생 확인", desc: "14일 초과 시 연 20% 자동 발생" },
  { label: "내용증명 발송", desc: "법적 청구 증거 확보" },
  { label: "고용노동부 진정", desc: "퇴직금+이자 함께 청구" },
  { label: "소멸시효 3년 확인", desc: "퇴직 후 3년 이내 청구" },
  { label: "무료 법률 지원 활용", desc: "대한법률구조공단(132)" },
];

const FAQS = [
  {
    q: "지연이자 연 20%는 얼마나 되는 건가요?",
    a: "퇴직금 1,000만원을 30일 지연하면 약 16만원이에요. 지연 일수가 길수록, 퇴직금이 클수록 이자가 커요.",
  },
  {
    q: "회사가 지연이자 지급을 거부하면?",
    a: "고용노동부 진정을 내면 지연이자도 함께 지급 명령이 내려져요. 불이행 시 형사 처벌 대상이에요.",
  },
  {
    q: "합의해서 늦게 받기로 했는데 이자도 받을 수 있나요?",
    a: "합의서에 이자 포기 조항이 없다면 청구 가능해요. 합의 전에 이자 포기 조항이 있는지 꼭 확인하세요.",
  },
  {
    q: "지연이자의 소멸시효는 얼마나 되나요?",
    a: "3년이에요. 퇴직 후 3년 이내에 청구해야 해요. 내용증명 발송으로 소멸시효를 중단시킬 수 있어요.",
  },
  {
    q: "이자를 받으면 세금이 붙나요?",
    a: "지연이자는 기타소득으로 과세 대상이에요. 하지만 금액이 크지 않으면 실질적 세부담은 적어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제37조 — 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지연이자",
    title: "퇴직금 지연이자 청구",
    description: "연 20% 이자 계산 방법.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 못 받았을 때",
    description: "고용노동부 진정 절차 안내.",
  },
  {
    slug: "퇴직금-지급기한",
    title: "퇴직금 지급 기한",
    description: "14일 원칙과 이자 발생 기준.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 지연이자 · 청구방법</p>
        <h1 style={body.h1}>
          퇴직금 지연이자, 어떻게 받을 수 있나요?
          <br />
          <span style={body.h1sub}>연 20% 이자 계산부터 청구 절차까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        퇴직 후 14일이 지나도 퇴직금이 안 들어온다면, 법적으로 연 20%짜리 지연이자를 청구할 수 있어요. 퇴직금 3,000만원이 한 달 늦으면 이자만 49만원이에요. 그냥 기다릴 이유가 없는 거죠.
      </p>
      <p style={body.prose}>
        지연이자는 <a href="https://www.law.go.kr/법령/근로기준법" style={body.link} target="_blank" rel="noopener noreferrer">근로기준법 제37조</a>에 명시된 권리예요. 회사가 거부해도 고용노동부 진정으로 강제 청구가 가능하고요. 아래에서 계산 방법과 단계별 청구 절차를 정리했어요.
      </p>

      <ArticleAd />

      <Divider />

      {/* 섹션 1: 지연이자 기준 */}
      <H2>지연이자가 발생하는 기준은 뭔가요</H2>

      <p style={body.prose}>
        <a href="/w/퇴직금-지급기한" style={body.link}>퇴직금 지급기한</a>은 퇴직일로부터 14일이에요. 달력 기준이라서 주말이나 공휴일도 포함돼요. 15일째 되는 날부터 지연이자가 자동으로 붙기 시작해요.
      </p>

      <GreenBox>
        지연이자 핵심 기준 (근로기준법 제37조)<br />
        · 지연이자율: 연 20%<br />
        · 기산일: 퇴직 후 15일째부터<br />
        · 소멸시효: 퇴직 후 3년 이내 청구<br />
        · 예외: 천재지변, 양 당사자 합의 지연 시 적용 제외 가능
      </GreenBox>

      <p style={body.prose}>
        연 20%는 시중 대출금리보다 훨씬 높은 수준이에요. 회사 입장에서는 빨리 주는 게 유리한데, 직원이 모른다 싶으면 그냥 뭉개는 경우가 있어요. 소규모 사업장이나 폐업 직전인 회사에서 자주 발생하죠.
      </p>

      <p style={body.prose}>
        합의로 지급일을 늦춘 경우에는 이야기가 달라져요. 합의서에 '이자 면제' 조항이 있으면 지연이자를 청구하기 어려워요. 합의 전에 이자 포기 조항이 있는지 반드시 확인하세요. <a href="/w/퇴직금-미지급-신고" style={body.link}>퇴직금 미지급 신고 방법</a>도 함께 보면 도움이 돼요.
      </p>

      <Divider />

      {/* 섹션 2: 이자 계산기 */}
      <H2>지연이자 계산기</H2>

      <p style={body.prose}>
        미지급 퇴직금과 지연 일수를 입력하면 받을 수 있는 이자가 바로 나와요. 14일을 초과한 날수만 입력하면 돼요. 예를 들어 퇴직 후 44일이 지났다면 초과분 30일을 넣으면 되고요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 지연이자 = 미지급 퇴직금 × 20% × 지연일수 ÷ 365. 합의 지연 등 예외 상황은 제외."
      />

      <p style={body.prose}>
        지연이자는 퇴직금에 더해서 청구해요. 총 청구액은 원래 퇴직금에 이자를 합한 금액이에요. 회사가 지급 거부 시 이 전체 금액을 고용노동부 진정이나 소액심판으로 받을 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>청구할 때 필요한 서류</H2>

      <p style={body.prose}>
        내용증명을 보내거나 고용노동부에 진정할 때 서류가 필요해요. 미리 챙겨두면 시간을 많이 아낄 수 있어요. 아래 목록은 퇴직금 + 지연이자를 함께 청구할 때 기본으로 쓰는 서류예요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        퇴직 확인서는 퇴직 사실과 날짜를 증명하는 서류예요. 회사가 발급을 거부하면 근로계약서와 마지막 급여명세서로 대체할 수 있어요. 이미 퇴직했더라도 서류 재발급 요청은 언제든 가능해요.
      </p>

      <p style={body.prose}>
        IRP 계좌번호는 최종 지급 시 퇴직금을 받을 곳이에요. <a href="/w/퇴직금-IRP-수령방법" style={body.link}>IRP 계좌 개설 방법</a>을 미리 봐두면 좋아요. 은행이나 증권사에서 본인 명의로 만들면 돼요.
      </p>

      <Divider />

      {/* 섹션 4: 절차 */}
      <H2>지연이자 받는 단계별 절차</H2>

      <p style={body.prose}>
        퇴직금을 못 받고 있다면 아래 순서대로 움직이면 돼요. 내용증명부터 시작해서 소액심판까지, 대부분 3단계 안에서 해결돼요. 법률 전문가가 없어도 고용노동부 진정만으로 충분히 받아내는 경우가 많아요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        내용증명은 발송한 날부터 '나는 청구했다'는 법적 기록이 생겨요. 이후 소멸시효 중단 효과도 있죠. 우체국에서 3,000원 내외로 바로 발송할 수 있고, 온라인우편(epost.go.kr)으로도 돼요.
      </p>

      <p style={body.prose}>
        고용노동부 진정은 온라인으로 24시간 신청 가능해요. 접수 후 근로감독관이 조사에 나서고, 지급 명령까지 평균 2~4주가 걸려요. 퇴직금과 지연이자를 한 번에 청구할 수 있어서 가장 많이 쓰는 방법이에요.
      </p>

      <EligibilityChecker
        title="지연이자 청구 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>청구 전 최종 체크리스트</H2>

      <p style={body.prose}>
        지연이자 청구는 준비가 되어 있을수록 빠르게 해결돼요. 아래 목록을 하나씩 체크하고 나서 내용증명을 보내세요. 빠뜨리는 항목이 없으면 청구 과정이 훨씬 수월해져요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        무료 법률 지원 기관<br />
        · 대한법률구조공단: 전화 132, 소액심판 무료 지원<br />
        · 고용노동부 민원마당: minwon.moel.go.kr<br />
        · 노동청 방문 상담: 전국 지방노동청 무료
      </GreenBox>

      <p style={body.prose}>
        소멸시효 3년이 지나면 아무리 청구해도 받기 어려워요. 퇴직한 날부터 3년 안에는 반드시 청구하세요. 이미 2년이 넘었다면 바로 내용증명부터 보내서 시효를 중단시키는 게 먼저예요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <p style={body.prose}>
        지연이자 청구를 처음 하려는 분들이 많이 헷갈려하는 내용을 모았어요. 내 상황과 비슷한 케이스가 있으면 참고하세요.
      </p>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
