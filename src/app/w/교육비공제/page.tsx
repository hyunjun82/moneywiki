"use client";
// Q1: 연말정산 시즌에 자녀 교육비나 본인 학비를 공제받을 수 있는지 궁금한 직장인
// Q2: 교육비 세액공제 대상과 한도를 확인하고, 공제 금액을 계산해서 연말정산에 반영한다
// Q3: 공제 대상(본인/배우자/자녀) / 공제율 15% / 대상 교육기관 / 항목별 한도 / 공제 안 되는 항목 / 신청 방법
// Q4: GreenBox로 핵심 정리 + Calculator로 환급액 계산 + DocTable로 대상 정리 + Checklist로 체크 + FAQ
// MAP-INTRO: "학원비도 연말정산에서 공제받을 수 있나요?"
// MAP-TYPE: 얼마형
// MAP-H2: 교육비공제 대상과 한도 > 환급액 계산 > 공제되는 항목과 안 되는 항목 > 신청 방법 > 체크리스트 > FAQ
// MAP-COMP: GreenBox > Calculator > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, Checklist, FAQ, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ───

const CALC_SLIDERS = [
  {
    id: "selfEdu",
    label: "본인 교육비",
    min: 0, max: 2000, step: 50, defaultValue: 0,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "childEdu",
    label: "자녀 교육비 (1인당)",
    min: 0, max: 500, step: 10, defaultValue: 200,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "childCount",
    label: "자녀 수",
    min: 0, max: 5, step: 1, defaultValue: 1,
    format: (v: number) => `${v}명`,
  },
];

const CALC_RESULTS = [
  {
    label: "공제 대상 교육비 합계",
    getValue: (v: Record<string, number>) => {
      const selfCapped = v.selfEdu; // 본인은 한도 없음
      const childCapped = Math.min(v.childEdu, 300) * v.childCount; // 자녀 1인당 300만원
      return selfCapped + childCapped;
    },
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "예상 세액공제",
    highlight: true,
    getValue: (v: Record<string, number>) => {
      const selfCapped = v.selfEdu;
      const childCapped = Math.min(v.childEdu, 300) * v.childCount;
      return Math.round((selfCapped + childCapped) * 0.15);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
];

const STEPS_DATA = [
  {
    title: "홈택스 연말정산 간소화에서 교육비를 조회하세요",
    desc: "대부분의 교육비는 간소화 서비스에서 자동으로 잡혀요. 학교, 유치원, 어린이집은 거의 다 조회되죠. 1월 15일 이후에 조회하면 정확해요.",
  },
  {
    title: "누락된 교육비는 직접 영수증을 받아서 제출하세요",
    desc: "학원비, 체육시설 이용료 등은 간소화에 안 뜰 수 있어요. 해당 기관에서 교육비 납입증명서를 발급받아서 회사에 제출하면 되죠.",
    tip: "학원비는 초등학교 취학 전 아동만 공제 대상이에요. 초등학생 이상 학원비는 공제 안 돼요",
  },
  {
    title: "회사에 교육비 공제 자료를 제출하세요",
    desc: "간소화 PDF와 추가 영수증을 함께 제출하면 돼요. 회사 인사팀에서 연말정산에 반영해주죠.",
  },
];

const CHECKLIST_DATA = [
  "본인 대학원·직업훈련비 영수증 확보",
  "자녀 유치원·어린이집 교육비 간소화 조회",
  "초등학교 취학 전 자녀 학원비 영수증 (취학 후 학원비는 공제 불가)",
  "교복 구입비 영수증 (중·고등학생, 50만원 한도)",
  "체험학습비 영수증 (초·중·고, 30만원 한도)",
  "장애인 특수교육비 영수증 (한도 없음)",
];

const FAQS = [
  {
    q: "대학생 자녀 등록금은 공제되나요?",
    a: "네. 대학생 자녀 등록금은 1인당 연 900만원 한도로 공제돼요. 대학원은 본인만 가능하고, 자녀 대학원 등록금은 공제 대상이 아니에요.",
  },
  {
    q: "맞벌이 부부는 누가 공제받나요?",
    a: "자녀를 기본공제 대상으로 등록한 쪽이 교육비도 공제받아요. 남편이 자녀를 부양가족으로 등록했으면 남편이 교육비공제도 받는 거죠.",
  },
  {
    q: "학원비는 전부 공제되나요?",
    a: "초등학교 취학 전 아동(유치원생 포함)의 학원비만 공제돼요. 1인당 연 300만원 한도죠. 초등학생 이상의 학원비는 공제 대상이 아니에요. 이 부분을 모르고 신청하면 추징당할 수 있어요.",
  },
  {
    q: "해외 유학 중인 자녀 교육비도 되나요?",
    a: "조건이 있어요. 해외 교육기관이 우리나라 학교에 해당하는 교육과정을 운영해야 하고, 자녀가 기본공제 대상이어야 하죠.",
  },
  {
    q: "교복비도 공제되나요?",
    a: "중·고등학생 자녀의 교복 구입비는 1인당 연 50만원 한도로 공제돼요. 체육복도 포함되죠. 영수증을 꼭 챙겨두세요.",
  },
  {
    q: "본인 직업훈련비도 공제되나요?",
    a: "네. 직업능력개발훈련비는 본인 교육비로 한도 없이 전액 공제돼요. 국비지원 교육은 본인 부담금만 공제 대상이고요.",
  },
];

// ─── 페이지 ───

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 교육비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        교육비 세액공제, 얼마나 돌려받나요?<br />
        공제 대상과 한도 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "학원비도 연말정산에서 공제받을 수 있나요?"
      </p>
      <p style={body}>
        교육비의 15%를 세금에서 빼줘요. 자녀 1명당 연 300만원(대학생 900만원) 한도이고, 본인 교육비는 한도가 없죠.
        자녀 유치원비 200만원을 냈다면 30만원을 환급받는 거예요.
        다만 초등학생 이상 학원비는 공제 대상이 아니에요. 이 차이를 모르면 놓칠 수 있는 돈이죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>교육비공제 대상과 한도</H2>
      <p style={body}>
        공제 대상은 본인, 배우자(소득 없는 경우), 기본공제 대상 자녀예요.
        한도는 대상별로 달라요. 본인은 전액 공제, 취학 전 아동과 초·중·고 자녀는 300만원, 대학생은 900만원이죠.
      </p>
      <GreenBox title="대상별 한도 정리">
        본인: 대학원·직업훈련 등 전액 (한도 없음){"\n"}
        취학 전 아동: 유치원·어린이집·학원비 → 1인당 연 300만원{"\n"}
        초·중·고 자녀: 수업료·급식비·교과서대 → 1인당 연 300만원{"\n"}
        대학생 자녀: 등록금 → 1인당 연 900만원{"\n"}
        공제율: 교육비의 15% 세액공제
      </GreenBox>

      <Divider />

      <H2>환급액이 얼마나 되나요?</H2>
      <p style={body}>
        교육비 공제율은 15%로 고정이에요. 총급여와 무관하죠.
        본인 대학원비 500만원을 냈다면 75만원, 자녀 유치원비 200만원이면 30만원을 세금에서 돌려받아요.
      </p>
      <SectionBadge>교육비공제 계산</SectionBadge>
      <Calculator
        title="교육비 세액공제 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="자녀 1인당 한도: 취학 전·초중고 300만원, 대학생 900만원. 본인은 한도 없음."
      />
      <p style={body}>
        금액을 확인했으면 어떤 항목이 공제되고 안 되는지를 정확히 알아야 해요. 여기서 실수하면 추징당하죠.
      </p>

      <Divider />

      <H2>공제되는 항목 vs 안 되는 항목</H2>
      <p style={body}>
        교육비공제에서 가장 많이 헷갈리는 게 학원비예요.
        취학 전 아동(유치원생 이하)의 학원비는 되지만, 초등학생 이상의 학원비는 안 돼요.
        이 한 줄이 매년 수만 건의 오류 신고를 만들죠.
      </p>
      <BorderBox>
        <strong>공제 가능</strong>{"\n"}
        유치원·어린이집 보육료 / 초·중·고 수업료·급식비·교과서대 / 대학 등록금 / 취학 전 아동 학원비·체육시설 / 교복비(중·고, 50만원) / 체험학습비(30만원) / 본인 대학원·직업훈련비 / 장애인 특수교육비(한도 없음){"\n\n"}
        <strong>공제 불가</strong>{"\n"}
        초등학생 이상 학원비 / 학교 기부금·찬조금 / 어학연수비(비학위과정) / 교재·참고서 구입비 / 통학버스비 / 급식비 중 간식비
      </BorderBox>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        대부분 홈택스 간소화에서 자동 조회돼요. 학교·유치원·어린이집은 거의 다 잡히죠.
        다만 학원비, 교복비, 체험학습비는 간소화에 안 뜰 수 있어서 직접 영수증을 받아야 해요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>놓치지 말아야 할 체크리스트</H2>
      <p style={body}>
        연말정산 때 교육비를 빠뜨리는 가장 흔한 이유는 "이것도 되는 줄 몰랐다"예요.
        교복비, 체험학습비, 장애인 특수교육비는 의외로 모르는 사람이 많죠. 아래 항목을 하나씩 점검해보세요.
      </p>
      <SectionBadge>교육비공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_DATA} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 소득세법 제59조의4(교육비 세액공제)를 바탕으로 정리한 일반 안내 자료예요. 개인 상황에 따라 공제 가능 여부가 다를 수 있으니, 정확한 판단은 홈택스 또는 세무사와 상담해보세요." />
    </ArticleLayout>
  );
}
