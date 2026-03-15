"use client";

import {
  H2,
  SectionBadge,
  GreenBox,
  BorderBox,
  Divider,
  Calculator,
  EligibilityChecker,
  Steps,
  DocTable,
  Checklist,
  FAQ,
  References,
  Disclaimer,
  body,
} from "@/components/article-ui";

/* ─── 이 글의 데이터 ─── */

const ELIGIBILITY_ITEMS = [
  { id: "child", label: "만 19세 미만 자녀가 있어요" },
  { id: "custody", label: "제가 양육권자(아이를 키우는 쪽)예요" },
  { id: "divorce", label: "이혼했거나 별거 중이에요" },
  { id: "noSupport", label: "상대방이 양육비를 주지 않고 있어요" },
];

const CALC_SLIDERS = [
  {
    id: "income",
    label: "부모 합산 월소득",
    min: 200,
    max: 1500,
    step: 50,
    defaultValue: 500,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "children",
    label: "자녀 수",
    min: 1,
    max: 5,
    step: 1,
    defaultValue: 1,
    format: (v: number) => `${v}명`,
  },
  {
    id: "age",
    label: "자녀 나이",
    min: 0,
    max: 18,
    step: 1,
    defaultValue: 8,
    format: (v: number) => `${v}세`,
  },
];

const CALC_RESULTS = [
  {
    label: "자녀 1인당 양육비 (월)",
    getValue: (v: Record<string, number>) => {
      const base = v.age < 6 ? 80 : v.age < 12 ? 100 : 120;
      const incomeRatio = Math.min(v.income / 500, 2.5);
      return Math.round(base * incomeRatio);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 양육비 (월)",
    getValue: (v: Record<string, number>) => {
      const base = v.age < 6 ? 80 : v.age < 12 ? 100 : 120;
      const incomeRatio = Math.min(v.income / 500, 2.5);
      return Math.round(base * incomeRatio * v.children);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
];

const CLAIM_STEPS = [
  {
    title: "양육비이행관리원 상담 신청",
    desc: "전화(1644-6621) 또는 온라인으로 무료 상담을 받을 수 있어요. 상대방 정보와 이혼 서류를 준비해 가세요.",
    tip: "온라인 신청이 더 빨라요 (양육비이행관리원 홈페이지)",
  },
  {
    title: "협의 시도",
    desc: "양육비이행관리원이 상대방에게 연락해서 협의를 시도해요. 합의되면 양육비 이행합의서를 작성하고 공증받으면 끝이에요.",
  },
  {
    title: "조정·심판 신청 (협의 실패 시)",
    desc: "가정법원에 양육비 청구 조정을 신청해요. 조정이 안 되면 자동으로 심판(재판)으로 넘어가요. 이 단계에서 판사가 금액을 정해줘요.",
    tip: "인지대 약 1만원, 송달료 약 5만원 — 비용 부담이 적어요",
  },
  {
    title: "이행명령 신청 (안 줄 때)",
    desc: "법원 결정이 나왔는데도 안 주면, 이행명령을 신청해요. 이행명령을 어기면 1천만원 이하 과태료가 부과돼요.",
  },
  {
    title: "강제집행 (최후 수단)",
    desc: "이행명령도 무시하면 상대방 재산(급여, 예금, 부동산)을 압류할 수 있어요. 급여 압류는 월급의 1/2까지 가능해요.",
  },
];

const REQUIRED_DOCS = [
  { name: "이혼 판결문 또는 조정조서", required: true, where: "가정법원" },
  { name: "가족관계증명서", required: true, where: "정부24 / 주민센터" },
  { name: "주민등록등본", required: true, where: "정부24 / 주민센터" },
  { name: "소득증빙 (원천징수영수증 등)", required: true, where: "홈택스 / 직장" },
  { name: "양육비 산정 자료 (교육비, 의료비 등)", required: false, where: "직접 준비" },
  { name: "상대방 재산 자료 (강제집행 시)", required: false, where: "법원 재산조회" },
];

const CHECKLIST_ITEMS = [
  "양육비 청구 소멸시효는 3년이에요 — 이혼 후 바로 청구하세요",
  "공증받은 합의서가 있으면 바로 강제집행 가능해요",
  "양육비이행관리원은 무료예요 — 변호사 선임 전에 먼저 이용하세요",
  "과거 양육비(이혼 후~청구일)도 소급 청구 가능해요",
  "양육비와 면접교섭권(방문권)은 별개예요 — 안 준다고 아이 안 보여주면 불이익이에요",
];

const FAQS = [
  {
    q: "상대방이 '나 돈 없어, 백수야' 하면 어떻게 해요?",
    a: "소득이 없어도 양육비 의무는 사라지지 않아요. 법원은 상대방의 연령, 학력, 경력 등을 고려해서 '잠재적 소득'으로 양육비를 산정해요. 실제로 무직이라고 주장해도 최저 양육비(월 50~70만원 수준)는 나와요.",
  },
  {
    q: "재혼하면 양육비를 안 받을 수 있나요?",
    a: "재혼해도 친부모의 양육비 의무는 그대로예요. 새 배우자가 입양을 하지 않는 한, 친부모는 계속 양육비를 내야 해요. 다만 재혼으로 경제 상황이 크게 바뀌면 감액 청구는 가능해요.",
  },
  {
    q: "양육비 안 주면 감옥 가나요?",
    a: "직접 감옥에 가진 않지만, 이행명령 위반 시 1천만원 이하 과태료가 나오고, 감치(30일 이내 유치장 구금)도 가능해요. 2021년부터는 운전면허 정지, 여권 발급 제한도 돼요.",
  },
  {
    q: "아이가 대학 가면 양육비가 끊기나요?",
    a: "원칙적으로 만 19세(성년)가 되면 양육비 의무가 끝나요. 하지만 대학 등록금은 별도로 '부양료'로 청구할 수 있어요. 판례상 대학생 자녀에 대한 부양료가 인정된 사례가 있어요.",
  },
  {
    q: "양육비를 올려달라고 할 수 있나요?",
    a: "네, 가능해요. 자녀의 성장(학년 변경), 물가 상승, 의료비 증가 등 사정 변경이 있으면 가정법원에 양육비 증액 청구를 할 수 있어요. 반대로 소득이 줄었으면 감액 청구도 돼요.",
  },
  {
    q: "미혼모도 양육비를 받을 수 있나요?",
    a: "당연히 받을 수 있어요. 혼인 여부와 관계없이 친부(생물학적 아버지)에게 양육비를 청구할 수 있어요. 친자확인 소송을 먼저 하고, 확인되면 양육비를 청구하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민법 제843조, 제837조 (양육비 청구)", url: "https://www.law.go.kr/법령/민법" },
      { label: "양육비 이행확보 및 지원에 관한 법률", url: "https://www.law.go.kr/법령/양육비이행확보및지원에관한법률" },
    ],
  },
  {
    category: "공식 기관",
    items: [
      { label: "양육비이행관리원", url: "https://www.childsupport.or.kr" },
      { label: "대한법률구조공단 (무료 법률상담)", url: "https://www.klac.or.kr" },
      { label: "서울가정법원 양육비 산정기준표", url: "https://slfamily.scourt.go.kr" },
    ],
  },
];

/* ─── 페이지 ─── */

export default function Page() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
        color: "#111",
      }}
    >
      {/* 카테고리 + 제목 */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        법률
      </p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        양육비 청구 방법 신청 절차 | 미지급 강제집행 이행명령
      </h1>

      {/* 서론 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼하고 나서 양육비를 한 푼도 못 받고 있나요? 혼자 아이를 키우면서 경제적으로 버거운 건
        당연한 거예요. 그런데 양육비는 받을 수 있는 권리이고, 상대방이 안 준다고 포기할 필요가
        전혀 없어요. 법적으로 강제할 수 있는 방법이 여러 가지 있거든요.
      </p>
      <p style={body}>
        이 글에서는 양육비 청구 자격부터 금액 계산, 신청 절차, 서류,
        그리고 안 줄 때 대응 방법까지 전부 정리했어요. 끝까지 읽으면 지금 당장
        뭘 해야 하는지 명확해질 거예요.
      </p>

      <Divider />

      {/* ─── 섹션 1: 양육비 청구 자격 (트리거: 자격, 대상) → EligibilityChecker ─── */}
      <H2>양육비 청구 자격</H2>
      <SectionBadge>자격 확인</SectionBadge>
      <p style={body}>
        양육비를 청구하려면 기본적으로 내가 아이를 실제로 키우고 있어야 해요.
        이혼한 경우뿐 아니라, 별거 중이거나 미혼인 경우에도 청구할 수 있어요.
        핵심은 &quot;아이의 친부모인데 양육을 안 하고 있는 쪽&quot;에게 청구하는 거예요.
      </p>
      <p style={body}>
        아래 항목을 체크해 보세요. 4가지를 모두 충족하면 양육비 청구가 가능해요.
        하나라도 빠지면 해당 항목을 먼저 해결해야 할 수 있어요.
        예를 들어 친자 확인이 안 된 상태라면 친자확인 소송부터 진행해야 해요.
      </p>
      <EligibilityChecker items={ELIGIBILITY_ITEMS} />
      <p style={body}>
        참고로 양육비 청구권은 이혼 후 3년이 지나면 소멸시효에 걸려요.
        민법 제843조에 따라 양육에 관한 사항은 이혼 시 정해야 하고,
        정하지 않았다면 가정법원에 청구할 수 있어요. 시간이 지날수록 불리하니까
        가능한 한 빨리 움직이는 게 좋아요.
      </p>

      <Divider />

      {/* ─── 섹션 2: 양육비 금액 계산 (트리거: 계산, 금액) → Calculator ─── */}
      <H2>양육비는 얼마나 받을 수 있을까</H2>
      <SectionBadge>금액 계산</SectionBadge>
      <p style={body}>
        양육비 금액은 &quot;서울가정법원 양육비 산정기준표&quot;를 기준으로 정해요.
        부모의 합산 소득과 자녀 나이에 따라 달라지는데, 소득이 높을수록,
        자녀 나이가 많을수록 양육비도 올라가요.
      </p>
      <p style={body}>
        아래 계산기로 대략적인 금액을 확인해 보세요. 실제 법원 판결에서는
        교육비, 의료비, 주거비 등 특별한 사정도 반영되기 때문에
        이보다 더 나올 수도, 덜 나올 수도 있어요. 그래도 협상할 때 기준점으로
        쓰기에 충분해요.
      </p>
      <Calculator
        title="양육비 간편 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="서울가정법원 양육비 산정기준표(2024)를 참고한 추정치예요. 실제 판결 금액은 다를 수 있어요."
      />
      <p style={body}>
        여기서 중요한 게 있어요. 양육비 산정기준표는 &quot;최소 기준&quot;이에요.
        사교육비, 치료비 같은 특별비용은 별도로 청구할 수 있어요.
        예를 들어 아이가 아토피 치료를 받고 있다면 그 의료비를
        추가로 청구하는 게 가능하죠.
      </p>

      <Divider />

      {/* ─── 섹션 3: 청구 절차 (트리거: 절차, 방법) → Steps ─── */}
      <H2>양육비 청구 절차</H2>
      <SectionBadge>신청 방법</SectionBadge>
      <p style={body}>
        양육비 청구는 크게 5단계로 진행돼요. 처음부터 소송을 하는 게 아니라,
        협의 → 조정 → 심판 순서로 점점 강도가 올라가요.
        대부분은 2~3단계에서 해결되니까 너무 겁먹지 않아도 돼요.
      </p>
      <Steps steps={CLAIM_STEPS} />
      <p style={body}>
        이 절차에서 가장 먼저 해야 할 건 양육비이행관리원에 상담을 신청하는 거예요.
        무료이고, 상대방에게 직접 연락해주는 것부터 법률 지원까지 다 해줘요.
        변호사를 바로 선임하는 것보다 여기를 먼저 이용하는 게 훨씬 효율적이에요.
      </p>

      <Divider />

      {/* ─── 섹션 4: 필요 서류 (트리거: 서류, 준비물) → DocTable ─── */}
      <H2>필요 서류</H2>
      <SectionBadge>준비물</SectionBadge>
      <p style={body}>
        양육비 청구에 필요한 서류를 정리했어요. 필수 서류 4개는 반드시 준비해야 하고,
        나머지는 상황에 따라 추가로 내면 돼요. 서류가 많을수록 유리한 건 맞지만,
        없다고 청구를 못 하는 건 아니에요.
      </p>
      <DocTable docs={REQUIRED_DOCS} />
      <p style={body}>
        소득증빙이 어려우면 걱정하지 마세요. 법원에서 상대방의 소득을
        직권으로 조회할 수 있어요. 국세청, 국민연금공단, 건강보험공단에
        자료를 요청하는 거예요. 상대방이 소득을 숨겨도 잡아낼 수 있다는 뜻이에요.
      </p>
      <p style={body}>
        강제집행을 할 때는 상대방 재산 정보가 필요한데, 이것도 법원을 통해
        재산조회를 신청하면 돼요. 은행 예금, 부동산, 급여 정보를
        한꺼번에 확인할 수 있어요.
      </p>

      <Divider />

      {/* ─── 섹션 5: 신청 전 체크리스트 (트리거: 준비, 챙겨야) → Checklist ─── */}
      <H2>신청 전 꼭 챙겨야 할 것</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <p style={body}>
        양육비 청구를 시작하기 전에 아래 사항을 꼭 확인하세요.
        특히 소멸시효(3년)와 면접교섭권 부분은 많은 분이 모르고 있다가
        불이익을 받는 경우가 많아요. 하나씩 체크하면서 빠진 게 없는지 점검해 보세요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        가장 많이 실수하는 부분이 면접교섭권이에요. &quot;양육비 안 주니까 아이도 안 보여줄 거야&quot;
        이렇게 하면 오히려 내가 불이익을 받아요. 양육비와 면접교섭권은
        법적으로 완전히 별개의 권리거든요. 양육비를 안 주는 건 상대방 잘못이지만,
        아이를 안 보여주는 건 또 다른 위반이 돼요.
      </p>

      <Divider />

      {/* ─── 섹션 6: 안 줄 때 대응법 → BorderBox ─── */}
      <H2>양육비를 안 줄 때 대응 방법</H2>
      <SectionBadge>미지급 대응</SectionBadge>
      <p style={body}>
        법원에서 양육비를 정해줬는데도 상대방이 안 주는 경우가 진짜 많아요.
        통계상 양육비 이행률이 30%도 안 돼요. 그래서 법이 점점 강해지고 있어요.
        2021년부터는 양육비를 안 내면 운전면허 정지, 여권 발급 제한까지 가능해졌어요.
      </p>
      <BorderBox title="미지급 시 제재 수단 (강도순)">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>1단계</strong> 이행명령 → 위반 시 1천만원 이하 과태료
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>2단계</strong> 감치명령 → 30일 이내 유치장 구금
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>3단계</strong> 급여 압류 → 월급의 1/2까지 강제 징수
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>4단계</strong> 재산 압류 → 예금, 부동산, 자동차 등
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>부가 제재</strong> 운전면허 정지 + 여권 발급 제한 (2021년~)
        </p>
      </BorderBox>
      <p style={body}>
        실무적으로 가장 효과적인 건 급여 압류예요. 회사에서 월급을 줄 때
        법원 결정 금액을 먼저 빼서 양육비이행관리원 계좌로 보내는 거라,
        상대방이 피할 수가 없어요. 상대방이 직장인이라면
        이 방법을 우선 고려하세요.
      </p>
      <p style={body}>
        양육비이행관리원에서는 이 모든 절차를 무료로 도와줘요.
        한시적 양육비(월 최대 20만원)도 먼저 지급해주니까,
        당장 급한 분이라면 이행관리원부터 연락하는 게 가장 현실적인 첫걸음이에요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      {/* 출처 */}
      <References groups={REFERENCES} />

      {/* 면책 */}
      <Disclaimer text="이 글은 일반적인 법률 정보를 제공하며, 개별 사안에 대한 법률 자문이 아니에요. 구체적인 상황은 변호사 또는 양육비이행관리원(1644-6621)에 상담하세요. 2024년 양육비 산정기준표 기준이며, 향후 변경될 수 있어요." />
    </div>
  );
}
