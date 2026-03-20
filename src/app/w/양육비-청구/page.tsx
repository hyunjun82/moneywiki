"use client";

// ─── Q1-Q4 필수 사고 ─────────────────────────────────
// Q1. 이혼 후(또는 별거 중) 상대방이 양육비를 안 줘서 어떻게 받아낼지 막막한 상황
// Q2. 양육비이행관리원에 상담 신청하고, 필요하면 법원 청구·강제집행까지 밟아서 실제로 돈을 받아낸다
// Q3. 청구 절차 5단계(협의→조정→심판→이행명령→강제집행), 얼마 받을 수 있는지(산정기준표),
//     청구 자격(별거·미혼 포함), 필요 서류, 안 줄 때 제재 수단(운전면허·감치), 소멸시효 3년
// Q4. Steps(절차 먼저, 방법형) → Calculator(금액) → GreenBox(자격 정리) → DocTable(서류)
//     → BorderBox(제재 수단) → Checklist(주의사항) → FAQ
//
// MAP:
// Q1 → 서론: "상대방이 안 주고 있다"는 상황 공감, 법이 강제하는 의무임을 짧게
// Q2 → H2-1 = Steps (청구 절차 5단계), 타이틀 line2 = "청구 절차와 강제집행 방법"
// Q3 → H2 6개 + FAQ 6개
// Q4 → Steps, Calculator, GreenBox, DocTable, BorderBox, Checklist

import {
  H2,
  SectionBadge,
  GreenBox,
  BorderBox,
  Divider,
  Calculator,
  Steps,
  DocTable,
  Checklist,
  body,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";

/* ─── 데이터 ─── */

const CLAIM_STEPS = [
  {
    title: "양육비이행관리원 상담 신청",
    desc: "전화(1644-6621) 또는 홈페이지에서 무료 상담을 신청해요. 상대방 연락처와 이혼 서류를 준비하면 돼요. 이 기관이 상대방에게 직접 연락해줘요.",
    tip: "온라인 신청이 더 빨라요 (childsupport.or.kr)",
  },
  {
    title: "협의 시도",
    desc: "이행관리원이 상대방과 협의를 진행해요. 합의가 되면 양육비 이행합의서를 작성하고 공증까지 받으면 끝이에요. 공증된 합의서는 법원 판결 없이 바로 강제집행이 가능해요.",
    tip: "이 단계에서 끝나는 경우가 가장 많아요",
  },
  {
    title: "조정·심판 신청",
    desc: "협의가 안 되면 가정법원에 양육비 청구 조정을 신청해요. 조정이 성립 안 되면 자동으로 심판(재판)으로 넘어가고, 판사가 금액을 결정해요.",
    tip: "인지대 약 1만원, 송달료 약 5만원이에요. 비용 부담이 적어요",
  },
  {
    title: "이행명령 신청",
    desc: "법원 결정이 나왔는데도 안 주면 이행명령을 신청해요. 이행명령을 어기면 1천만원 이하 과태료가 부과되고, 30일 이내 유치장 감치도 가능해요.",
  },
  {
    title: "강제집행",
    desc: "최후 수단이에요. 상대방 급여(월급의 1/2까지), 예금, 부동산을 압류할 수 있죠. 2021년부터는 운전면허 정지, 여권 발급 제한도 가능해요.",
  },
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

const REQUIRED_DOCS = [
  { name: "이혼 판결문 또는 조정조서", required: true, where: "가정법원 등본 교부" },
  { name: "가족관계증명서", required: true, where: "정부24 / 주민센터" },
  { name: "주민등록등본", required: true, where: "정부24 / 주민센터" },
  { name: "소득증빙 (원천징수영수증)", required: true, where: "홈택스 / 직장" },
  { name: "양육비 산정 자료 (교육비·의료비 등)", required: false, where: "직접 준비" },
  { name: "상대방 재산 자료 (강제집행 시)", required: false, where: "법원 재산조회" },
];

const CHECKLIST_ITEMS = [
  "소멸시효 3년이에요. 이혼 직후 바로 청구하는 게 유리해요",
  "공증받은 합의서가 있으면 법원 판결 없이 바로 강제집행 가능해요",
  "과거 양육비(이혼 후~청구일)도 소급 청구 가능해요",
  "양육비이행관리원은 무료예요. 변호사 선임 전에 먼저 이용해요",
  "양육비와 면접교섭권(방문권)은 별개예요. 안 준다고 아이 안 보여주면 내가 불이익 받아요",
];

const FAQS = [
  {
    q: "상대방이 '나 백수야, 돈 없어' 하면 어떻게 해요?",
    a: "소득이 없어도 양육비 의무는 사라지지 않아요. 법원은 나이·학력·경력을 고려해서 '잠재적 소득'으로 양육비를 산정해요. 무직이라고 주장해도 최저 수준(월 50~70만원 수준)은 나와요.",
  },
  {
    q: "재혼하면 양육비를 안 받게 되나요?",
    a: "재혼해도 친부모 양육비 의무는 그대로예요. 새 배우자가 입양하지 않는 한, 친부모는 계속 내야 해요. 다만 재혼으로 경제 상황이 크게 바뀌면 감액 청구는 가능해요.",
  },
  {
    q: "양육비 안 주면 감옥 가나요?",
    a: "직접 감옥에 가진 않지만, 이행명령 위반 시 1천만원 이하 과태료와 30일 이내 유치장 감치가 가능해요. 2021년부터 운전면허 정지, 여권 발급 제한도 추가됐어요.",
  },
  {
    q: "아이가 대학 가면 양육비가 끊기나요?",
    a: "원칙적으로 만 19세(성년)가 되면 양육비 의무가 끝나요. 대학 등록금은 별도로 '부양료'로 청구할 수 있고, 판례상 대학생 자녀 부양료가 인정된 사례도 있죠.",
  },
  {
    q: "미혼모도 양육비를 받을 수 있나요?",
    a: "받을 수 있죠. 혼인 여부와 관계없이 친부(생물학적 아버지)에게 청구할 수 있죠. 인지(친자 확인)가 안 됐다면 친자확인 소송과 양육비 청구를 동시에 진행하면 돼요.",
  },
  {
    q: "양육비를 올려달라고 할 수 있나요?",
    a: "가능해요. 자녀가 학년이 올라가거나 의료비가 늘어나는 등 사정 변경이 있으면 가정법원에 증액 청구를 할 수 있죠. 반대로 상대방 소득이 줄었으면 감액 청구도 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민법 제837조, 제843조 (양육비 청구)", url: "https://www.law.go.kr/법령/민법" },
      { label: "양육비 이행확보 및 지원에 관한 법률", url: "https://www.law.go.kr/법령/양육비이행확보및지원에관한법률" },
    ],
  },
  {
    category: "공식 기관",
    items: [
      { label: "양육비이행관리원 (1644-6621)", url: "https://www.childsupport.or.kr" },
      { label: "대한법률구조공단 무료 법률상담", url: "https://www.klac.or.kr" },
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
        양육비 청구 절차와 강제집행 방법
      </h1>

      {/* 서론 */}
      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        상대방이 안 주고 있죠?
      </p>
      <p style={body}>
        양육비는 착해서 주는 돈이 아니에요. 민법 제837조가 명시한 법적 의무고,
        이혼을 했다고 해서 부모 책임이 사라지진 않아요.
        안 주면 운전면허 정지, 유치장 감치까지 가능한 강제 수단이 법에 다 갖춰져 있죠.
      </p>
      <p style={body}>
        문제는 어디서부터 시작해야 하는지 모른다는 거예요.
        청구 절차 5단계, 얼마 받을 수 있는지 계산, 안 줄 때 강제집행까지 순서대로 정리했어요.
      </p>

      <Divider />

      {/* ─── 섹션 1: 청구 절차 → Steps ─── */}
      <H2>양육비 청구, 5단계로 진행해요</H2>
      <SectionBadge>신청 방법</SectionBadge>
      <p style={body}>
        처음부터 소송이나 변호사가 필요한 건 아니에요.
        양육비 청구는 협의 → 조정 → 심판 순서로 강도가 올라가는 구조예요.
        대부분은 1~2단계에서 해결되고, 비용도 거의 들지 않아요.
      </p>
      <p style={body}>
        정부기관인 <strong>양육비이행관리원(1644-6621)</strong>이 무료로 전 과정을 도와줘요.
        상담부터 법원 대리, 강제집행 신청까지요.
        변호사를 바로 선임하는 것보다 여기 먼저 연락하는 게 훨씬 효율적이에요.
      </p>
      <Steps steps={CLAIM_STEPS} />
      <p style={body}>
        실무적으로 보면, 이행관리원에서 연락이 간다는 것만으로도 상대방이 협의에 응하는 경우가 꽤 많아요.
        공식 기관에서 연락이 오면 심리적 압박이 크게 작용하기 때문이에요.
        이 단계부터 챙겨두면 나머지 절차가 훨씬 빨라지죠.
      </p>

      <Divider />

      {/* ─── 섹션 2: 금액 계산 → Calculator ─── */}
      <H2>양육비, 얼마 받을 수 있을까요?</H2>
      <SectionBadge>금액 계산</SectionBadge>
      <p style={body}>
        금액은 부모 양쪽 소득, 자녀 나이, 자녀 수를 기준으로 법원이 정해요.
        2022년부터 서울가정법원 <strong>양육비 산정기준표</strong>가 실무 기준이에요.
        예를 들어 부모 합산 소득 400만원대에 8세 자녀 한 명이면 월 약 90만원 수준이에요.
      </p>
      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>이혼해도 부모 의무는 그대로예요. 양쪽 모두 내야 해요.</p>
        <p style={{ margin: "0 0 4px" }}>만 19세까지예요. 대학 입학 여부와 상관없어요.</p>
        <p style={{ margin: 0 }}>과거 양육비도 청구 가능해요. 혼자 키운 기간도 소급돼요.</p>
      </GreenBox>
      <Calculator
        title="내 상황에 맞게 계산해보세요"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="서울가정법원 양육비 산정기준표(2024)를 참고한 추정치예요. 실제 판결 금액은 다를 수 있죠."
      />
      <p style={body}>
        매달 45만원이 작아 보여도, 자녀가 어릴수록 만 19세까지 합산하면 수천만원이 쌓여요.
        그냥 넘어가면 그 돈 전부를 포기하는 거예요.
        자녀의 교육비·의료비 같은 특별 비용은 별도로 추가 청구도 가능해요.
      </p>

      <Divider />

      {/* ─── 섹션 3: 청구 자격 → GreenBox ─── */}
      <H2>별거 중이거나 미혼인데 청구 가능한가요?</H2>
      <SectionBadge>청구 자격</SectionBadge>
      <p style={body}>
        꼭 정식 이혼이 끝나야만 청구할 수 있는 건 아니에요.
        핵심은 &quot;아이를 실제로 키우는 쪽&quot;이 &quot;키우지 않는 쪽&quot;에게 청구하는 구조예요.
      </p>
      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>별거 중:</strong> 이혼소송 중에도 양육비 가처분(임시 지급 명령)을 바로 신청할 수 있죠
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>미혼 부모:</strong> 혼인 여부와 무관하게 청구 가능해요. 인지(친자 확인)가 안 됐다면 동시에 진행하면 돼요
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>사실혼 해소:</strong> 사실혼 관계가 끝난 경우도 청구할 수 있죠
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>제3자 양육:</strong> 조부모 등이 양육자로 지정된 경우에도 부모 양쪽 모두에게 청구 가능해요
        </p>
      </BorderBox>
      <p style={body}>
        양육비이행관리원은 미혼 부모의 인지청구와 양육비 청구를 함께 무료로 도와줘요.
        상황이 복잡해도 일단 상담부터 받아보면 길이 보여요.
        다음은 어떤 서류가 필요한지 볼게요.
      </p>

      <Divider />

      {/* ─── 섹션 4: 필요 서류 → DocTable ─── */}
      <H2>청구에 필요한 서류 4가지</H2>
      <SectionBadge>준비물</SectionBadge>
      <p style={body}>
        필수 서류 4개만 있으면 청구 자체는 시작할 수 있죠.
        가족관계증명서와 주민등록등본은 정부24에서 온라인으로 즉시 발급돼요.
        소득증빙은 홈택스에서 원천징수영수증을 출력하면 돼요.
      </p>
      <DocTable docs={REQUIRED_DOCS} />
      <p style={body}>
        상대방 소득을 모를 때도 걱정하지 않아도 돼요.
        법원이 국세청·국민연금공단·건강보험공단에 직권으로 조회할 수 있죠.
        강제집행 단계에서는 은행 예금·부동산·급여 정보도 법원을 통해 한꺼번에 끌어올 수 있어요.
      </p>

      <Divider />

      {/* ─── 섹션 5: 안 줄 때 대응 → BorderBox ─── */}
      <H2>강제집행과 이행명령, 어디까지 가능한가요?</H2>
      <SectionBadge>미지급 대응</SectionBadge>
      <p style={body}>
        통계상 양육비 이행률이 30%도 안 돼요. 법원 결정을 받아도 10명 중 7명은 무시한다는 거예요.
        그래서 법이 점점 강해지고 있죠.
        아래는 법이 정해놓은 제재 수단이에요.
      </p>
      <BorderBox>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>이행명령:</strong> 위반 시 1천만원 이하 과태료
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>감치명령:</strong> 30일 이내 유치장 구금
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>급여 압류:</strong> 월급의 1/2까지 강제 징수 (직장인에게 가장 효과적)
        </p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>
          <strong>재산 압류:</strong> 예금, 부동산, 자동차 등
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>부가 제재:</strong> 운전면허 정지, 여권 발급 제한 (2021년부터)
        </p>
      </BorderBox>
      <p style={body}>
        실무적으로 가장 효과적인 건 급여 압류예요.
        회사가 월급 지급 시 법원 결정 금액을 먼저 빼서 이행관리원 계좌로 보내는 구조라, 상대방이 피할 방법이 없어요.
        상대방이 직장인이라면 이 방법을 우선 고려해보세요.
      </p>
      <p style={body}>
        양육비이행관리원은 한시적 양육비(월 최대 20만원)를 먼저 지급해주는 제도도 운영해요.
        당장 생활이 급하다면 이 제도도 함께 신청할 수 있죠.
      </p>

      <Divider />

      {/* ─── 섹션 6: 체크리스트 ─── */}
      <H2>청구 시작 전 반드시 짚어야 할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <p style={body}>
        양육비 청구를 시작하기 전에 아래 사항을 먼저 짚어보세요.
        특히 소멸시효(3년)와 면접교섭권 부분은 몰랐다가 나중에 불이익을 받는 경우가 많아요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        면접교섭권 부분은 많은 분이 실수하는 지점이에요.
        &quot;양육비를 안 주니까 아이도 안 보여줄 거야&quot; 하면, 오히려 내가 법원에서 불이익을 받아요.
        양육비와 면접교섭권은 법적으로 완전히 독립된 권리거든요.
        이혼 전에 양육비 합의서를 공증받아두면 나중에 소송 없이 바로 강제집행이 가능해요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      {/* 출처 */}
      <References groups={REFERENCES} />

      {/* 면책 */}
      <Disclaimer text="이 글은 일반적인 법률 정보를 제공하며, 개별 사안에 대한 법률 자문이 아니에요. 구체적인 상황은 변호사 또는 양육비이행관리원(1644-6621)에 상담하세요. 2024년 양육비 산정기준표 기준이며, 향후 변경될 수 있죠." />
    </div>
  );
}
