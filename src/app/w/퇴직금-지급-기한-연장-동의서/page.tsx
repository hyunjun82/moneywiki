"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 동의서를 써달라고 요청했어요" },
  { id: "c2", label: "동의서에 구체적인 지급 일자가 적혀 있어요" },
  { id: "c3", label: "동의서에 '퇴직금 포기' 같은 문구는 없어요" },
  { id: "c4", label: "회사의 재정 상태가 양호한 편이에요" },
];

const CHECKLIST = [
  "동의서 내용 확인 — 지급 일자, 금액, 지연이자 면제 조항 유무",
  "퇴직금 포기 조항 확인 — 해당 문구가 있으면 서명하지 말 것",
  "사본 보관 — 서명 전 원본 사진 촬영 또는 사본 수령",
  "연장 기한 합리성 확인 — 1~3개월 이내가 적정 범위",
  "회사 재정 상태 확인 — 급여 지연 이력, 사업자 상태 조회",
];

const FAQS = [
  {
    q: "동의서를 쓰면 퇴직금을 포기하는 건가요?",
    a: "아니에요. 지급 기한만 연장하는 거지 퇴직금 자체를 포기하는 게 아니에요. 퇴직금 포기는 근로기준법상 무효이니까, 그런 문구가 있어도 법적 효력이 없죠.",
  },
  {
    q: "동의서에 꼭 서명해야 하나요?",
    a: "거부할 수 있어요. 연장 동의는 의무가 아니라 근로자의 선택이죠. 거부한다고 해서 불이익을 줄 수 없고, 불이익을 주면 부당 행위에 해당해요.",
  },
  {
    q: "동의서 없이 구두로 '기다리겠다'고 하면 합의가 되나요?",
    a: "법적으로 구두 합의도 유효할 수 있어요. 하지만 증거가 없으면 분쟁 시 불리하죠. 회사가 나중에 '근로자가 동의했다'고 주장해도 입증이 어렵게 되니, 동의할 거라면 서면으로 하세요.",
  },
  {
    q: "동의서를 쓴 뒤에 취소할 수 있나요?",
    a: "이미 서명한 합의를 일방적으로 취소하기는 어려워요. 하지만 강요에 의한 서명이라면 무효를 주장할 수 있고, 회사가 연장 기한도 안 지키면 합의 자체가 무효화될 수 있죠.",
  },
  {
    q: "동의서에 지연이자 면제 조항이 들어가면 어떻게 하나요?",
    a: "연장 기한까지의 지연이자를 면제하는 조항은 유효할 수 있어요. 하지만 향후 발생할 모든 지연이자를 포괄적으로 면제하는 건 근로자에게 불리하니 서명을 피하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (당사자 합의 연장)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 미지급 임금 지연이자", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 관련 자주 묻는 질문", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 근로자 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한-연장",
    title: "퇴직금 지급 기한 연장 조건",
    description: "연장의 법적 요건과 동의 거부 시 대응법을 안내해요.",
  },
  {
    slug: "퇴직금-포기각서",
    title: "퇴직금 포기각서의 법적 효력",
    description: "퇴직금 포기각서를 써도 법적으로 무효라는 점을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 노동청 신고",
    description: "연장 기한까지 안 주면 노동청에 신고할 수 있어요.",
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
          currentSlug="퇴직금-지급-기한-연장-동의서"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장 동의서,<br />
        써도 괜찮을까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사에서 동의서를 가져왔는데, 서명하면 손해 보는 거 아닌가요?&rdquo;<br />
        맞아요, 손해 볼 수 있어요.
        퇴직금 지급 기한 연장 동의서에 서명하면 <strong>연장 기한까지의 지연이자(연 20%)</strong>를 받을 수 없게 되거든요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가 허용하는 합의 연장이지만, 근로자에게 불리한 조건이 숨어 있을 수 있죠.
        동의서의 법적 효력, 포함돼야 할 내용, 작성 전 주의사항을 하나씩 짚어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>지급 기한 연장 동의서가 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직금을 14일 안에 주라고 정해뒀어요. 그런데 &ldquo;특별한 사정이 있으면 당사자 합의로 기한을 연장할 수 있다&rdquo;는 단서가 붙어 있죠. 이 합의를 서면으로 남긴 게 &ldquo;지급 기한 연장 동의서&rdquo;예요.
      </p>
      <p style={body}>
        보통 회사가 자금 사정이 어려울 때 근로자에게 요청하죠. &ldquo;한 달만 더 기다려주면 다 드릴게요&rdquo; 하면서 동의서를 내밀어요. 근로자가 서명하면 합의가 성립되고, 연장 기한까지는 14일 원칙 위반이 아니게 되죠.
      </p>
      <p style={body}>
        문제는 서명 이후에 벌어지는 일이에요. 연장 기한까지 지연이자를 청구할 수 없게 되고, 노동청 신고 시점도 늦어져요. 회사 상태가 더 나빠져서 <a href="/w/회사-폐업-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>폐업</a>하면 퇴직금 자체를 받기 어려워질 수도 있죠. 그래서 서명 전에 반드시 내용을 꼼꼼히 살펴봐야 해요.
      </p>

      <GreenBox title="동의서의 법적 효과">
        서명하면 → 연장 기한까지 지연이자(연 20%) 청구 불가<br />
        서명하면 → 연장 기한 전에는 노동청 신고 어려움<br />
        서명 안 하면 → <strong>14일 원칙 그대로 적용</strong>, 초과 시 이자 발생
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="동의서 내용이 양호하고 회사 상태도 괜찮은 편이에요. 다만 서명 전에 사본을 꼭 보관하세요."
        partialMatchText="일부 조건이 미비해요. 동의서 내용을 다시 확인하고, 불안하면 대한법률구조공단(klac.or.kr)에 무료 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>동의서를 쓰면 권리를 포기하는 건가요?</H2>
      <p style={body}>
        퇴직금 청구권은 포기할 수 없어요. 근로기준법은 강행 규정이라서, &ldquo;퇴직금을 포기한다&rdquo;는 합의는 설사 서면으로 했더라도 <strong>법적으로 무효</strong>예요. 동의서는 &ldquo;지급 시기&rdquo;만 늦추는 거지, 퇴직금 자체를 없애는 게 아니죠.
      </p>
      <p style={body}>
        하지만 동의서에 숨겨진 조항이 문제가 될 수 있어요. &ldquo;본 합의로 일체의 민·형사 청구를 하지 않는다&rdquo; 같은 포괄적 부제소 합의가 들어가 있으면 지연이자 청구나 노동청 신고가 막힐 수 있죠. 이런 조항이 있으면 서명을 피하거나, 삭제를 요청하세요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-포기각서" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 포기각서</a>와 헷갈리면 안 돼요. 포기각서는 &ldquo;퇴직금을 받지 않겠다&rdquo;는 문서고, 연장 동의서는 &ldquo;나중에 받겠다&rdquo;는 문서예요. 성격이 완전히 다르죠. 포기각서는 무조건 무효이고, 연장 동의서는 조건에 따라 유효해요.
      </p>

      <BorderBox title="주의할 동의서 조항">
        &ldquo;퇴직금에 대한 일체의 이의를 제기하지 않는다&rdquo; → 서명 금지<br />
        &ldquo;지연이자를 포함한 모든 청구를 포기한다&rdquo; → 서명 금지<br />
        &ldquo;○월 ○일까지 지급하되, 미이행 시 14일 원칙 적용&rdquo; → 양호
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>어떤 내용이 포함되어야 하나요?</H2>
      <p style={body}>
        필수 항목은 네 가지예요. 첫째, <strong>퇴직금 금액</strong>이 명시돼야 해요. &ldquo;퇴직금 전액&rdquo;이라고만 적으면 나중에 금액 분쟁이 생길 수 있으니, 구체적인 숫자를 넣는 게 좋죠.
      </p>
      <p style={body}>
        둘째, <strong>연장 지급 기한</strong>이 정확한 날짜로 적혀야 해요. &ldquo;빠른 시일 내&rdquo;, &ldquo;사정이 나아지면&rdquo; 같은 모호한 표현은 효력이 약하죠. &ldquo;2026년 4월 30일까지 지급한다&rdquo;처럼 구체적이어야 해요.
      </p>
      <p style={body}>
        셋째, <strong>미이행 시 조치</strong>가 들어가면 좋아요. &ldquo;위 기한까지 지급하지 않을 경우 근로기준법 시행령 제18조에 따른 지연이자를 가산하여 지급한다&rdquo;는 문구를 넣으면 회사에 압박이 되죠. 넷째, <strong>양측 서명과 날짜</strong>가 빠지면 안 돼요. 근로자와 사용자 모두 서명하고 날짜를 기재해야 유효한 합의 문서가 돼요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>동의서 없이 연장하는 건 가능한가요?</H2>
      <p style={body}>
        서면 없이 구두로 합의하는 것도 법적으로 불가능하지는 않아요. 다만 증거가 없으면 분쟁 시 &ldquo;합의한 적 없다&rdquo;고 주장할 수 있어서 위험하죠. 회사 측에서 &ldquo;근로자가 구두로 동의했다&rdquo;고 주장하면 근로자가 반박하기 어려워요.
      </p>
      <p style={body}>
        반대 상황도 마찬가지예요. 근로자가 구두로 &ldquo;좀 더 기다리겠다&rdquo;고 했는데, 나중에 지연이자를 청구하면 회사가 &ldquo;합의가 있었잖아&rdquo;라고 맞설 수 있죠. 이런 분쟁을 피하려면 모든 합의는 서면으로 남기는 게 원칙이에요.
      </p>
      <p style={body}>
        만약 구두로 &ldquo;기다리겠다&rdquo;고 말한 상태라면, 지금이라도 서면으로 정리하거나, 아니면 명시적으로 &ldquo;더 이상 기다리지 않겠다. 즉시 지급해달라&rdquo;는 내용증명을 보내세요. 이렇게 하면 구두 합의를 사실상 철회하는 효과가 있죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>동의서 작성 후 회사가 지급하지 않으면?</H2>
      <p style={body}>
        연장된 기한마저 넘기면 14일 원칙이 다시 살아나요. 이때부터 <strong>연 20%</strong> 지연이자가 붙기 시작하죠. 합의를 어긴 건 회사 쪽이니까, 근로자가 합의 위반을 이유로 노동청 진정을 접수할 수 있어요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>(minwon.moel.go.kr)에 &ldquo;임금체불 진정&rdquo;으로 접수하세요. 동의서 사본을 함께 첨부하면 &ldquo;회사가 합의 기한도 안 지켰다&rdquo;는 증거가 되죠. 근로감독관이 시정지시를 내리면 대부분 이 단계에서 지급이 이뤄져요.
      </p>
      <p style={body}>
        시정지시에도 불응하면 형사 절차로 넘어가요. 검찰 송치 → 기소 → 재판 순서인데, 실무적으로는 송치 단계에서 회사가 지급하는 경우가 많죠. 이 과정이 오래 걸리니까, 급하면 <strong>민사소송(소액심판)</strong>을 병행하는 것도 방법이에요. 소멸시효 3년 이내라면 청구권은 살아 있으니까요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기한 연장 동의서에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
