"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "프리랜서 계약을 맺었지만 출퇴근 시간이 고정돼 있었어요" },
  { id: "c2", label: "회사가 업무 내용과 방법을 지시했어요" },
  { id: "c3", label: "다른 업체와 겸업이 사실상 불가능했어요" },
  { id: "c4", label: "1년 이상 같은 곳에서 계속 일했어요" },
];

const FAQS = [
  {
    q: "프리랜서 계약서를 쓰면 무조건 퇴직금을 못 받나요?",
    a: "아니에요. 계약서 형식이 아니라 실제 근로 실태가 기준이에요. 프리랜서 계약서를 썼어도 출퇴근 관리, 업무 지시, 전속성이 인정되면 근로자로 판단될 수 있죠.",
  },
  {
    q: "IT 프리랜서도 근로자성이 인정될 수 있나요?",
    a: "가능해요. 특히 상주 파견 형태로 출퇴근하고, 고객사의 업무 지시를 받으며, 프로젝트 기간 동안 다른 일을 못 하는 경우에는 근로자성이 인정된 판례가 있죠.",
  },
  {
    q: "근로자성이 인정되면 퇴직금은 얼마나 받나요?",
    a: "일반 근로자와 동일하게 계산해요. 퇴직 전 3개월 평균임금 x 근속연수로 산정하죠. 프리랜서 기간 전체가 근속연수로 인정돼요.",
  },
  {
    q: "4대보험에 가입 안 됐으면 근로자가 아닌 건가요?",
    a: "아니에요. 4대보험 가입 여부는 보조적 판단 요소일 뿐이에요. 사업주가 일부러 가입하지 않은 것이라면 오히려 사업주에게 불리하게 작용하죠.",
  },
  {
    q: "프리랜서 퇴직금 청구에서 가장 중요한 증거는 뭔가요?",
    a: "출퇴근 관리를 받았다는 증거가 가장 강력해요. 출입 기록, 근태 관리 시스템 로그, 업무 지시 카톡·이메일 등이 핵심 증거가 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조 — 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 근로자성 판단 기준", url: "https://www.moel.go.kr" },
      { label: "대법원 판례 검색", url: "https://glaw.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "프리랜서-퇴직금-지급기준",
    title: "프리랜서 퇴직금 지급 기준",
    description: "프리랜서가 퇴직금을 받을 수 있는 기준과 근로자성 판단 요소를 정리했어요.",
  },
  {
    slug: "퇴직금-기준",
    title: "퇴직금 지급 기준",
    description: "퇴직금 지급 기준과 근로 형태별 적용 방법을 정리했어요.",
  },
  {
    slug: "방문판매원-독립계약자-퇴직금-미지급-대응",
    title: "방문판매원·독립계약자 퇴직금 미지급 대응",
    description: "방문판매원이나 독립계약자가 퇴직금 미지급에 대응하는 방법을 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-프리랜서"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 프리랜서 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 프리랜서 적용 여부,<br />
        어떻게 판단하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        프리랜서 계약을 맺고 일했는데, 퇴직금을 받을 수 있는지 궁금하죠?
        결론부터 말하면 &ldquo;프리랜서&rdquo;라는 이름표보다 <strong>실제로 어떻게 일했느냐</strong>가 더 중요해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 계약 형식이 아니라 근로 실태로 근로자 여부를 판단하죠.
        근로자성이 인정되면 퇴직금은 당연히 발생해요.
        판단 기준, 유사 판례, 청구 가능성 확인 방법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>프리랜서 계약인데 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있는 경우가 있어요. 근로기준법 제2조는 &ldquo;직업의 종류와 관계없이 임금을 목적으로 사업이나 사업장에 근로를 제공하는 사람&rdquo;을 근로자로 정의하죠. 여기에 &ldquo;프리랜서 제외&rdquo;라는 말은 어디에도 없어요.
      </p>
      <p style={body}>
        회사가 비용을 아끼려고 형식적으로 프리랜서 계약을 쓰게 하는 경우가 많죠. 하지만 실질적으로 근로자처럼 일했다면 계약서에 뭐라고 적혀 있든 근로자로 인정받을 수 있어요. 대법원도 &ldquo;당사자 사이에 고용계약인지 도급계약인지는 경제적·사회적 여러 조건을 종합하여 판단한다&rdquo;고 밝혔죠.
      </p>
      <p style={body}>
        핵심 판단 기준은 &ldquo;사용종속관계&rdquo;예요. 출퇴근 시간이 정해져 있고, 업무 내용과 방법을 지시받으며, 겸업이 어렵고, 징계를 받을 수 있었다면 사용종속관계가 인정될 가능성이 높아요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 근로자성이 인정될 가능성이 높아요. 고용노동부(1350)에 상담을 받아보세요."
        partialMatchText="일부만 해당돼요. 종합적으로 판단하니, 해당 항목이 적어도 상담을 받아보는 게 좋아요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>근로자성 인정 기준이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>와 대법원은 여러 요소를 종합적으로 검토해요. 업무 내용을 사용자가 정했는지, 취업규칙이나 복무규정 적용을 받았는지, 근무 시간·장소가 지정됐는지가 핵심이죠.
      </p>
      <p style={body}>
        보수의 성격도 중요해요. 매월 고정 급여를 받았다면 근로자성이 강해지고, 성과에 따라 달라지는 보수였다면 사업자에 가까워지죠. 4대보험 가입 여부는 보조적 판단 요소인데, 사업주가 의도적으로 가입하지 않은 경우에는 오히려 사업주에게 불리하게 작용해요.
      </p>
      <p style={body}>
        &ldquo;전속성&rdquo;도 큰 비중을 차지해요. 한 회사에서만 일하고 다른 업체의 일을 할 수 없었다면 사용종속관계가 인정될 가능성이 높아지죠. 반대로 여러 업체 일을 자유롭게 수주했다면 사업자에 가깝다고 판단돼요.
      </p>

      <GreenBox title="근로자성 인정 핵심 요소">
        <strong>강한 근로자성</strong>: 출퇴근 고정 + 업무 지시 + 전속성 + 고정 급여<br />
        <strong>약한 근로자성</strong>: 시간 자유 + 성과 보수 + 겸업 가능 + 대체인력 투입 가능
      </GreenBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>유사 사례 판례가 있나요?</H2>
      <p style={body}>
        <a href="https://glaw.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원</a>에서 프리랜서의 근로자성을 인정한 대표적 사례가 여러 건 있어요. 학원 강사가 출퇴근 시간을 지정받고 교재·커리큘럼을 강제받은 경우, 방송작가가 특정 프로그램에 전속으로 배치되어 지시를 받은 경우 등이 대표적이죠.
      </p>
      <p style={body}>
        IT 분야에서도 상주 개발자가 클라이언트 사무실에 출퇴근하고, 프로젝트 매니저의 지시에 따라 일하며, 계약 기간 중 다른 프로젝트를 수행할 수 없었던 경우 근로자성이 인정된 사례가 있어요. 형식은 용역 계약이었지만 실질은 파견 근로였다는 판단이죠.
      </p>
      <p style={body}>
        반대로 근로자성이 부정된 사례도 있어요. 보험설계사가 자유롭게 영업 시간과 방법을 정하고, 여러 보험사 상품을 취급하며, 성과에 따라 수수료를 받은 경우에는 사업자로 판단됐죠. 결국 &ldquo;얼마나 자유로웠느냐&rdquo;가 분수령이 돼요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>퇴직금 청구 가능성을 어떻게 확인하나요?</H2>
      <p style={body}>
        가장 빠른 방법은 고용노동부(1350)에 전화 상담을 받는 거예요. 근무 실태를 설명하면 근로자성 인정 가능성을 1차적으로 안내해주죠. 무료이고 익명으로도 상담이 가능해요.
      </p>
      <p style={body}>
        더 정확한 판단을 원하면 관할 고용노동지청에 &ldquo;근로자 지위 확인 진정&rdquo;을 넣을 수 있어요. 근로감독관이 회사와 근로자 양쪽 의견을 듣고 사실관계를 조사한 뒤 판단을 내리죠. 이 결과가 퇴직금 청구의 근거가 돼요.
      </p>
      <p style={body}>
        <a href="/w/프리랜서-퇴직금-지급기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>프리랜서 퇴직금 지급 기준</a>에서 근로자성 판단의 7대 기준을 미리 체크해보세요. 해당 항목이 많을수록 인정 가능성이 높아지니, 증거를 미리 확보해두는 게 중요하죠. 출퇴근 기록, 업무 지시 메일, 카톡 대화 등을 스크린샷으로 저장해두세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>노동청 진정 절차는?</H2>
      <p style={body}>
        관할 고용노동지청에 퇴직금 미지급 진정을 넣으면 돼요. 온라인(고용노동부 민원마당)이나 방문 접수 모두 가능하죠. 접수 시 근로계약서(프리랜서 계약서), 급여 이체 내역, 출퇴근 기록, 업무 지시 증거를 함께 제출하세요.
      </p>
      <p style={body}>
        접수 후 근로감독관이 사업주를 조사하는데, 보통 2~4주 정도 걸려요. 근로자성이 인정되면 사업주에게 퇴직금 지급 시정 명령을 내리죠. 사업주가 이의를 제기하면 노동위원회나 법원으로 넘어갈 수 있어요.
      </p>
      <p style={body}>
        소멸시효가 퇴직일로부터 <strong>3년</strong>이니까, 그 안에 진정을 넣어야 해요. 진정 접수만으로도 시효 중단 효과가 생기니, 일단 접수하는 게 유리하죠. 결과가 나올 때까지 추가 증거를 꾸준히 모아두면 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 퇴직금 적용 여부에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니, 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
