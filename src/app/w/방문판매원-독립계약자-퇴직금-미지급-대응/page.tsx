"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "방문판매원이나 독립계약자로 1년 이상 일했어요" },
  { id: "c2", label: "출퇴근 시간이 정해져 있었거나 업무 지시를 받았어요" },
  { id: "c3", label: "다른 회사 일을 겸업하기 어려웠어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "방문판매원이 퇴직금을 받은 사례가 있나요?",
    a: "있어요. 특정 지역을 전담으로 배정받고, 매일 출근 보고를 하며, 회사가 정한 판매 방식을 따라야 했던 방문판매원이 근로자로 인정받아 퇴직금을 수령한 판례가 있죠.",
  },
  {
    q: "수수료제로 급여를 받았는데 근로자가 될 수 있나요?",
    a: "수수료제라고 해서 자동으로 사업자가 되는 건 아니에요. 출퇴근 관리, 업무 지시, 전속성 등 다른 요소가 근로자성을 뒷받침하면 수수료제여도 근로자로 인정될 수 있죠.",
  },
  {
    q: "독립계약자 계약서를 썼는데 퇴직금을 청구할 수 있나요?",
    a: "계약서 형식이 아니라 실질적 근로관계가 기준이에요. 독립계약자 계약서를 썼어도 실질이 근로자라면 퇴직금 청구가 가능하죠.",
  },
  {
    q: "4대보험에 가입 안 됐는데 근로자로 인정받을 수 있나요?",
    a: "4대보험 가입 여부는 보조적 판단 요소예요. 사업주가 의도적으로 가입하지 않은 거라면 오히려 사업주에게 불리하게 작용하죠.",
  },
  {
    q: "퇴직금 미지급 신고 시 어떤 증거가 필요한가요?",
    a: "출근 보고 내역, 업무 지시 메일·문자, 판매 지역 배정 문서, 급여(수수료) 이체 내역, 출퇴근 기록 등이 핵심 증거예요. 일할 때부터 꾸준히 모아두세요.",
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
    slug: "퇴직금-프리랜서",
    title: "퇴직금 프리랜서 적용 여부",
    description: "프리랜서 계약이지만 퇴직금을 받을 수 있는지 판단하는 기준을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 주면 어디에 어떻게 신고하는지 정리했어요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "퇴직금 발생 조건을 한눈에 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="방문판매원-독립계약자-퇴직금-미지급-대응"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 방문판매원 · 독립계약자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        방문판매원·독립계약자 퇴직금 미지급,<br />
        어떻게 대응하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        방문판매원이나 독립계약자로 오래 일했는데 퇴직금을 못 받는다고요?
        회사가 &ldquo;사업자니까 퇴직금이 없다&rdquo;고 주장하더라도, 실질적으로 근로자에 해당하면 퇴직금을 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 계약 형식이 아니라 근로 실태를 기준으로 판단하죠.
        근로자성 인정 조건, 미지급 신고 방법, 대응 전략까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>방문판매원도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있는 경우가 있어요. 방문판매원이 회사의 업무 지시에 따라 일하고, 출근 보고를 하며, 특정 지역을 전담으로 배정받아 활동했다면 근로자성이 인정될 수 있죠.
      </p>
      <p style={body}>
        핵심은 &ldquo;얼마나 자유로웠느냐&rdquo;예요. 판매 시간과 방법을 스스로 정하고 여러 업체 상품을 자유롭게 팔 수 있었다면 사업자에 가깝지만, 회사가 정한 시간에 출근하고 정한 방식으로만 판매해야 했다면 근로자에 가까워요.
      </p>
      <p style={body}>
        <a href="https://glaw.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원</a>에서도 방문판매원의 근로자성을 인정한 사례가 여러 건 있어요. 계약서에 &ldquo;독립사업자&rdquo;라고 적혀 있어도 실질이 근로자라면 법적 판단은 달라지죠.
      </p>

      <GreenBox title="근로자성 인정 핵심 요소">
        - 출퇴근 시간 관리를 받았는가<br />
        - 업무 지시·감독을 받았는가<br />
        - 전속적으로 한 회사에서만 일했는가<br />
        - 급여가 고정적이었는가 (또는 최저보장급 있었는가)
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 근로자성이 인정될 가능성이 높아요. 고용노동부(1350)에 상담받아보세요."
        partialMatchText="일부만 해당돼요. 종합적으로 판단하니 전문 상담을 받아보는 게 좋아요."
      />

      <Divider />

      <H2>독립계약자와 근로자의 차이는 뭔가요?</H2>
      <p style={body}>
        독립계약자는 자기 책임 아래 독립적으로 일하는 사업자예요. 업무 시간과 방법을 스스로 정하고, 결과물에 대해 보수를 받죠. 반면 근로자는 사용자의 지휘·감독 아래 일하고, 근로 자체에 대해 임금을 받아요.
      </p>
      <p style={body}>
        문제는 실제 현장에서 이 구분이 모호한 경우가 많다는 거예요. 형식적으로는 독립계약자 계약을 맺었는데, 실질적으로는 출퇴근 관리를 받고 업무 지시를 따르는 경우가 빈번하죠. 이럴 때 법은 &ldquo;실질&rdquo;을 기준으로 판단해요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-프리랜서" style={{ color: "#1D9E75", textDecoration: "underline" }}>프리랜서 퇴직금 적용 여부</a>와 동일한 판단 기준이 적용돼요. 사용종속관계가 인정되면 독립계약자 명칭과 관계없이 근로자로 보고, 퇴직금 지급 의무가 생기죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>근로자성을 인정받는 방법은?</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 &ldquo;근로자 지위 확인&rdquo; 상담을 받는 게 첫 단계예요. 근무 실태를 설명하면 근로자성 인정 가능성을 안내해주죠. 무료이고 전화 한 통이면 돼요.
      </p>
      <p style={body}>
        증거 확보가 가장 중요해요. 출근 보고 문자, 업무 지시 이메일·카톡, 판매 지역 배정 문서, 급여(수수료) 이체 내역, 회의 참석 기록 등을 미리 모아두세요. 근로자성 판단에서 이런 자료가 결정적 역할을 하거든요.
      </p>
      <p style={body}>
        관할 고용노동지청에 &ldquo;퇴직금 미지급 진정&rdquo;을 넣으면 근로감독관이 사실관계를 조사해요. 근로자성이 인정되면 사업주에게 퇴직금 지급 시정 명령을 내리죠. 인정되지 않으면 민사 소송으로 다툴 수 있어요.
      </p>

      <Divider />

      <H2>퇴직금 미지급 신고 방법은?</H2>
      <p style={body}>
        고용노동부 민원마당(온라인) 또는 관할 고용노동지청(방문)에 퇴직금 미지급 진정을 넣으면 돼요. 접수 시 독립계약자 계약서, 근무 증빙 자료, 급여 이체 내역 등을 함께 제출하세요.
      </p>
      <p style={body}>
        접수 후 근로감독관이 사업주를 조사하는데 보통 2~4주 걸려요. 근로자성이 인정되면 시정 명령이 내려지고, 사업주가 이행하지 않으면 검찰 송치까지 가능하죠.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>와 동시에 내용증명을 보내면 효과가 배가돼요. 내용증명은 법적 조치를 예고하는 의미가 있어서 사업주에게 상당한 압박이 되거든요. 소멸시효 <strong>3년</strong> 이내에 움직여야 한다는 점도 잊지 마세요.
      </p>

      <Divider />

      <H2>성공 사례가 있나요?</H2>
      <p style={body}>
        방문판매원이 근로자로 인정받아 퇴직금을 수령한 사례는 여러 건이에요. 특히 특정 지역을 전담으로 배정받고, 매일 출근 보고를 하며, 회사가 정한 판매 매뉴얼을 따라야 했던 경우에 근로자성이 인정됐죠.
      </p>
      <p style={body}>
        화장품 방문판매원이 회사 사무실에 매일 출근해서 조회에 참석하고, 지정된 지역에서만 활동하며, 회사가 정한 가격으로만 판매해야 했던 사례에서 법원은 근로자성을 인정했어요. 이 판매원은 5년치 퇴직금을 수령했죠.
      </p>
      <p style={body}>
        반면 여러 보험사 상품을 자유롭게 판매하고, 영업 시간과 방법을 스스로 결정하며, 성과에 따라 수수료만 받은 경우에는 사업자로 판단됐어요. 핵심은 &ldquo;얼마나 회사에 종속적이었느냐&rdquo;이죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        방문판매원·독립계약자 퇴직금 미지급에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니, 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
