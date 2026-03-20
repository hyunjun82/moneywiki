"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "고용보험에 가입돼 있어요 (특고/예술인 의무가입 또는 근로자성 인정)" },
  { id: "c2", label: "이직 전 24개월 중 피보험기간 12개월 이상이에요" },
  { id: "c3", label: "비자발적 계약 종료예요 (계약 만료, 소득 50% 이상 감소 등)" },
  { id: "c4", label: "구직활동 의사와 능력이 있어요" },
];

// 특고/예술인 기준보수등급별 1일 보수액 (2026년 기준)
const GRADE_DAILY: Record<number, number> = {
  1: 57_600,
  2: 64_000,
  3: 70_400,
  4: 80_000,
  5: 96_000,
  6: 112_000,
  7: 128_000,
};

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

function getDailyAmount(grade: number): number {
  const base = GRADE_DAILY[grade] ?? 57_600;
  return Math.round(base * 0.6);
}

const CALC_SLIDERS = [
  { id: "grade", label: "기준보수등급 (1~7등급)", min: 1, max: 7, step: 1, defaultValue: 3, format: (v: number) => `${v}등급 (일 ${(GRADE_DAILY[v] ?? 57600).toLocaleString()}원)` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 15, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
  { id: "age", label: "나이", min: 25, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액 (기준보수 x 60%)",
    getValue: (v: Record<string, number>) => getDailyAmount(v.grade),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => getDailyAmount(v.grade) * getDays(v.age, v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 피보험자격 이력 조회 (본인도 모르게 가입돼 있을 수 있음)",
  "계약 종료 후 사업주에게 이직확인서 제출 요청",
  "수급자격 신청자 온라인 교육 이수 (약 1시간)",
  "퇴직 다음날부터 12개월 이내에 반드시 신청",
  "소득감소 퇴직 시 전년도 대비 50% 이상 감소 증빙 준비",
];

const FAQS = [
  {
    q: "프리랜서인데 고용보험에 가입된 적이 없으면 어떻게 하나요?",
    a: "일반 프리랜서는 고용보험 의무가입 대상이 아니에요. 그런데 사업주와 실질적인 근로관계가 있었다면 근로자성을 주장할 수 있죠. 출퇴근 기록, 업무지시 내역 등 증빙을 갖고 고용센터에 상담받아보세요.",
  },
  {
    q: "특수고용직인데 사업주가 고용보험 신고를 안 했으면요?",
    a: "사업주가 의무를 안 지킨 거예요. 고용센터에 신고하면 소급 적용이 가능하죠. 1350(고용센터)에 전화해서 미신고 사실을 알려주세요.",
  },
  {
    q: "계약이 안 끝났는데 일감이 뚝 끊겼어요. 실업급여 되나요?",
    a: "될 수 있어요. 전년 대비 소득이 50% 이상 줄었거나 3개월 연속 월 소득이 기준 이하로 떨어지면 이직으로 인정돼요. 소득 감소 증빙을 챙겨서 고용센터에 문의하세요.",
  },
  {
    q: "프리랜서 실업급여 금액은 어떻게 계산하나요?",
    a: "기준보수일액의 60%예요. 등급에 따라 1일 34,560원(1등급)부터 76,800원(7등급)까지 달라지죠. 월로 환산하면 약 104만~230만 원 사이를 받게 돼요.",
  },
  {
    q: "유튜버나 인플루언서도 실업급여를 받을 수 있나요?",
    a: "MCN 소속으로 전속계약을 맺고 일한 경우라면 특수고용직으로 인정될 수 있어요. 다만 개인 채널을 직접 운영한 경우는 자영업자에 가깝죠. 계약 형태에 따라 달라지니 고용센터에서 확인이 필요해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 특수형태근로종사자 고용보험 적용", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "예술인복지법: 예술인 고용보험 가입 근거", url: "https://www.law.go.kr/법령/예술인복지법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 특수고용·예술인 고용보험 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "예술인-실업급여",
    title: "예술인 실업급여 받는 법",
    description: "작가, 배우, 음악가 등 예술인이 고용보험으로 실업급여를 받는 방법이에요.",
  },
  {
    slug: "특고-실업급여",
    title: "특수고용직 실업급여 조건과 신청 방법",
    description: "배달기사, 택배기사, 보험설계사 등 특수고용직의 수급 요건이에요.",
  },
  {
    slug: "자영업자-실업급여",
    title: "자영업자 실업급여 조건과 신청방법",
    description: "자영업자도 고용보험에 가입했으면 폐업 시 실업급여를 받을 수 있어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="프리랜서-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 프리랜서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        프리랜서도 실업급여 받을까?<br />
        고용보험 가입부터 신청까지
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &quot;프리랜서로 3년 일했는데 계약이 끝났어요. 실업급여는 직장인만 받는 거 아닌가요?&quot;
      </p>
      <p style={body}>
        아니에요. <strong>고용보험에 가입돼 있었다면</strong> 프리랜서도 받을 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        특수형태근로종사자와 예술인을 의무가입 대상으로 정해뒀어요.
        본인도 모르게 이미 가입돼 있을 수 있으니,{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 먼저 조회해보세요.
      </p>
      <p style={body}>
        &quot;나는 프리랜서니까 해당 안 될 거야&quot; 하고 넘기는 분이 정말 많아요.
        그 사이에 수백만 원을 그냥 놓치는 거죠.
        내가 대상인지 아닌지, 얼마를 받을 수 있는지 지금부터 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 누가 가입 대상인지 + 자격 체크 */}
      <H2>고용보험 가입 대상은 누구인가요?</H2>
      <SectionBadge>핵심 개념</SectionBadge>
      <p style={body}>
        프리랜서라고 다 같은 조건은 아니에요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정한{" "}
        <strong>특수형태근로종사자(특고)</strong>에 해당하면 의무가입 대상이죠.
        보험설계사, 학습지교사, 택배기사, 대리운전기사, 방과후학교 강사, 화물차주, 플랫폼 배달원 등이 여기에 속해요.
        내가 계약서에 &quot;프리랜서&quot;라고 돼 있어도, 실제 업무가 특고 14개 직종이면 고용보험 가입 대상이죠.
      </p>
      <p style={body}>
        <strong>예술인</strong>도 마찬가지예요.{" "}
        <a href="https://www.law.go.kr/법령/예술인복지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>예술인복지법</a>에 따라
        문화예술용역 계약을 맺으면 고용보험에 자동으로 들어가요.
        작가, 배우, 음악가, 디자이너, 사진작가 등 예술활동을 하는 분들이 해당되죠.
        MCN 소속 크리에이터도 전속계약 형태라면 적용 대상이 될 수 있죠.
      </p>
      <p style={body}>
        가입 신고는 계약을 맺은 사업주가 하는 거예요. 본인이 직접 신고하는 게 아니죠.
        그래서 본인도 모르는 사이에 이미 가입돼 있을 수 있죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 들어가서
        피보험자격 이력을 조회하면 가입 여부를 바로 확인할 수 있으니까, 한번 들어가보세요.
      </p>

      <GreenBox>
        <p style={{ margin: 0 }}>아래 항목을 체크해서 조건을 충족하는지 따져보세요.</p>
      </GreenBox>
      <EligibilityChecker items={CHECK_ITEMS} />

      <Divider />

      {/* 섹션 2: 수급 조건 + 계산기 */}
      <H2>고용보험 가입 후 신청 조건은 뭔가요?</H2>
      <p style={body}>
        고용보험에 가입돼 있다고 무조건 받는 건 아니에요.
        이직 전 24개월 중 <strong>피보험 단위기간이 12개월 이상</strong>이어야 하죠.
        일반 근로자는 18개월 중{" "}
        <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간 180일</a>이 기준인데, 프리랜서(특고·예술인)는 기간이 더 길어요.
        이 차이를 모르고 &quot;180일만 채우면 되는 거 아니야?&quot; 하다가 탈락하는 분이 꽤 많죠.
      </p>
      <p style={body}>
        <strong>비자발적 이직</strong>이어야 해요.
        계약기간 만료, 원청의 계약 해지, 소득 급감(전년 대비 50% 이상 감소)이 대표적인 사유죠.
        내가 먼저 계약을 끊었다면 자발적 이직이라 수급이 어려워요.
        그런데 소득이 크게 줄어서 일을 계속하기 어려운 경우라면, 소득감소 사유로 인정받을 수 있죠.
      </p>
      <p style={body}>
        마지막으로 재취업 의사와 능력을 갖춰야 해요.
        수급 기간 동안 정해진 횟수만큼{" "}
        <a href="/w/실업급여-구직활동-횟수" style={{ color: "#1D9E75", textDecoration: "underline" }}>구직활동</a>을 해야 급여가 계속 나오죠.
        프리랜서라면 새 프로젝트에 지원하거나 포트폴리오를 업데이트하는 것도 구직활동으로 인정받을 수 있죠.
        이 세 가지를 모두 갖춰야 수급자격이 생기는 거예요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>1. 이직 전 24개월 중 피보험기간 12개월 이상</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>2. 비자발적 이직 (계약 만료, 소득 50% 이상 감소 등)</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>3. 재취업 의사와 능력 보유 (구직활동 가능 상태)</p>
      </BorderBox>

      <Calculator
        title="프리랜서 실업급여 예상 수급액 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 특고/예술인 실업급여는 기준보수등급에 따라 금액이 결정돼요. 실제 금액은 고용센터 심사 후 확정됩니다."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 일반 프리랜서 + 체크리스트 */}
      <H2>고용보험 미가입 프리랜서의 대안</H2>
      <SectionBadge>예외 상황</SectionBadge>
      <p style={body}>
        일반 프리랜서는 원칙적으로 고용보험 의무가입 대상이 아니에요.
        그래서 실업급여를 받기가 쉽지 않죠.
        &quot;나는 특고도 예술인도 아닌데, 방법이 아예 없나요?&quot; 하는 분이 많은데, 완전히 없지는 않아요.
      </p>
      <p style={body}>
        사업주와 <strong>실질적인 근로관계</strong>가 있었다면 일반 근로자로 인정될 수 있죠.
        출퇴근 시간이 정해져 있었거나, 구체적인 업무 지시를 받았거나, 정해진 장소에서 일했다면 근로자성을 주장할 수 있죠.
        계약서에 &quot;프리랜서&quot;라고 적혀 있어도 실질이 근로자면 인정돼요.
        형식이 아니라 실제 일하는 방식을 기준으로 판단하니까요.
      </p>
      <p style={body}>
        고용센터에서 실제 근무 형태를 보고 판단해요.
        계약서, 업무지시 이메일, 출근 기록, 급여 입금 내역 같은 증빙이 많을수록 유리하죠.
        혹시 해당될 수 있다 싶으면 퇴직 전에 증빙부터 챙겨놓으세요.
        퇴직 후에 자료를 모으려면 늦는 경우가 많죠.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 금액과 기간 */}
      <H2>가입 기간별 수급액과 수급기간</H2>
      <p style={body}>
        1일 구직급여액은 기준보수일액의 <strong>60%</strong>예요.
        등급에 따라 1일 34,560원(1등급)부터 76,800원(7등급)까지 차이가 나죠.
        월로 환산하면 약 104만 원에서 230만 원 사이를 받게 돼요.
        등급이 낮더라도 최소 100만 원 이상은 보장되는 셈이에요.
      </p>
      <p style={body}>
        수급 기간은 피보험기간과 나이에 따라 갈려요.
        가입기간이 1년 미만이면 50세 미만·이상 모두 120일이에요.
        1~3년이면 150일(50세 미만) 또는 180일(50세 이상), 3~5년이면 180일 또는 210일이죠.
        10년 이상 가입했다면 최대 240일(50세 미만)에서 270일(50세 이상)까지 받을 수 있죠.
      </p>
      <p style={body}>
        예를 들어 3등급으로 3년 일한 40대라면, 150일(약 5개월) 동안 매달 약 127만 원을 받게 돼요.
        전체 수령액은 약 634만 원이죠.
        &quot;프리랜서라서 아무 안전망도 없다&quot;고 생각했다면, 이 금액은 의미가 커요.
        고용보험이 가입돼 있었는지 한 번만 조회해보세요.
      </p>

      <Divider />

      {/* 섹션 5: 신청 절차와 주의사항 */}
      <H2>가입 이력 확인하고 바로 신청하세요</H2>
      <p style={body}>
        계약이 끝나면 사업주가 <strong>이직확인서</strong>를 제출해야 해요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 들어가서
        이직확인서가 처리됐는지 조회해보세요.
        사업주가 안 내주면 고용센터에 도움을 요청할 수 있고, 직권으로 처리해주는 경우도 있죠.
        여기서 막힌다고 포기하면 안 돼요.
      </p>
      <p style={body}>
        이직확인서가 처리되면 수급자격 신청자 온라인 교육을 이수해요.
        약 1시간 정도 걸리죠.
        그다음 수급자격 인정 신청을 하면 고용센터에서 심사 후 수급자격을 결정해요.
        전체 과정이 2~3주 정도 걸리는 편이에요.
      </p>
      <p style={body}>
        여기서 가장 중요한 건{" "}
        <a href="/w/퇴사후-실업급여-신청-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직 다음날부터 12개월 이내</a>에 신청해야 한다는 거예요.
        이 기간을 넘기면 아무리 조건을 다 갖춰도 실업급여를 못 받아요.
        프로젝트 정리한다고, 다음 계약 찾아본다고 미루다가 12개월을 놓치는 분이 실제로 많죠.
        계약이 끝나면 바로 움직이세요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>특고·예술인 → 의무가입 대상, 12개월 이상 가입하면 수급 가능</p>
        <p style={{ margin: "0 0 4px" }}>일반 프리랜서 → 근로자성 인정 시 일반 근로자 기준 적용</p>
        <p style={{ margin: 0 }}>신청 기한 → 퇴직 다음날부터 12개월 이내 (기한 엄수)</p>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 예술인복지법을 바탕으로 작성됐어요. 개별 수급 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
