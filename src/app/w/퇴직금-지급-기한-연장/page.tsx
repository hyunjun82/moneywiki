"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 퇴직금 지급 기한을 연장해달라고 요청했어요" },
  { id: "c2", label: "동의서에 서명한 적이 없어요 (또는 아직 안 했어요)" },
  { id: "c3", label: "회사가 구두로만 '조금만 기다려달라'고 했어요" },
  { id: "c4", label: "연장 사유가 단순 자금난이에요" },
];

const CHECKLIST = [
  "연장 동의서 작성 여부 확인 — 서명한 적 있는지 점검",
  "동의서 내용 확인 — 연장 기한, 지연이자 면제 조항 유무",
  "동의 기한 경과 여부 — 연장 합의 기한도 넘겼는지 체크",
  "내용증명 발송 — 합의 기한 경과 시 즉시 지급 요청",
  "노동청 신고 준비 — 근로계약서, 동의서 사본, 퇴직증명서 확보",
];

const FAQS = [
  {
    q: "기한 연장에 동의하면 지연이자를 못 받나요?",
    a: "합의한 연장 기한까지는 지연이자가 발생하지 않아요. 하지만 연장된 기한마저 넘기면 그때부터 연 20% 지연이자가 붙기 시작하죠.",
  },
  {
    q: "구두 합의도 유효한가요?",
    a: "법적으로는 구두 합의도 유효할 수 있어요. 하지만 증거가 없으면 나중에 입증이 어렵죠. 회사가 '합의했잖아'라고 주장하면 반박이 곤란하니까 서면으로 남기는 게 안전해요.",
  },
  {
    q: "동의서를 쓰면 퇴직금 자체를 포기하는 건가요?",
    a: "아니에요. 기한만 연장하는 거지 퇴직금 청구권은 그대로 남아요. 퇴직금 포기는 법적으로 무효이니까, 동의서에 '퇴직금을 포기한다'는 문구가 있더라도 효력이 없죠.",
  },
  {
    q: "연장 기한이 명시되지 않은 동의서는 유효한가요?",
    a: "구체적인 기한 없이 '나중에 주겠다'는 식의 동의서는 효력이 약해요. 법원에서도 합리적인 기한 내 지급을 요구하죠.",
  },
  {
    q: "이미 동의서에 서명했는데 취소할 수 있나요?",
    a: "합의를 일방적으로 철회하긴 어려워요. 하지만 회사가 연장된 기한마저 지키지 않으면 합의가 무효화될 수 있고, 그때부터 14일 원칙이 다시 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조 — 금품 청산 (14일 원칙, 합의 연장)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제18조 — 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한-연장-동의서",
    title: "퇴직금 기한 연장 동의서 작성법",
    description: "동의서에 어떤 내용이 들어가야 하는지, 써도 괜찮은지 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "퇴직금 14일 지급 기한의 법적 근거와 대응법을 안내해요.",
  },
  {
    slug: "회사-폐업-퇴직금",
    title: "회사 폐업 시 퇴직금 받는 방법",
    description: "회사가 문을 닫아도 체당금 제도로 퇴직금을 받을 수 있어요.",
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
          currentSlug="퇴직금-지급-기한-연장"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 연장,<br />
        동의하면 어떻게 되나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사가 퇴직금을 좀 늦게 줘도 되겠냐고 해요. 동의해야 하나요?&rdquo;<br />
        결론부터 말하면, 동의할 의무는 없어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직금을 <strong>14일 이내</strong>에 지급하라고 정해뒀지만, &ldquo;당사자 간 합의가 있으면 기한을 연장할 수 있다&rdquo;는 단서를 달아뒀죠.
        문제는 이 합의가 근로자에게 불리하게 작용할 수 있다는 점이에요.
        연장의 효력, 불이익, 거부 시 대응법을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지급 기한을 연장할 수 있나요?</H2>
      <p style={body}>
        법적으로 가능해요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a> 단서에 &ldquo;특별한 사정이 있는 경우에는 당사자 간의 합의에 의하여 기일을 연장할 수 있다&rdquo;고 돼 있어요. 여기서 &ldquo;당사자 간 합의&rdquo;란 회사와 근로자가 <strong>자발적으로</strong> 합의하는 걸 뜻하죠.
      </p>
      <p style={body}>
        핵심은 &ldquo;자발적&rdquo;이에요. 회사가 일방적으로 &ldquo;다음 달에 줄게&rdquo;라고 통보하는 건 합의가 아니에요. 근로자가 &ldquo;그래요, 언제까지 기다리겠어요&rdquo;라고 명시적으로 동의해야 유효하죠. 압박이나 강요에 의한 동의는 법적으로 무효가 될 수 있어요.
      </p>
      <p style={body}>
        연장 기한에도 합리적인 범위가 있어요. &ldquo;1년 뒤에 줄게&rdquo; 같은 지나치게 긴 연장은 법원에서 인정하지 않을 가능성이 높죠. 보통 1~3개월 정도가 합리적인 연장 기한으로 보고 있고, 구체적인 지급 일자가 명시돼야 해요.
      </p>

      <GreenBox title="기한 연장 합의의 3가지 조건">
        1. <strong>자발적 합의</strong> — 근로자의 강요 없는 동의<br />
        2. <strong>구체적 기한</strong> — &ldquo;○월 ○일까지&rdquo; 명시<br />
        3. <strong>합리적 기간</strong> — 지나치게 긴 연장은 무효 가능
      </GreenBox>

      <SectionBadge>내 상황을 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="동의서에 서명하지 않았고, 구두 통보만 받은 상태네요. 14일 원칙이 그대로 적용돼요. 기한이 지났다면 지연이자를 청구하세요."
        partialMatchText="일부만 해당돼요. 동의서 작성 여부와 연장 기한을 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>연장 동의서를 쓰면 불이익이 있나요?</H2>
      <p style={body}>
        가장 큰 불이익은 <strong>지연이자를 못 받는다</strong>는 점이에요. 합의로 연장된 기한까지는 지연이자가 발생하지 않거든요. 예를 들어 14일 기한을 30일 뒤로 연장했다면, 15일째부터 30일째까지의 이자(연 20%)를 청구할 수 없게 되죠.
      </p>
      <p style={body}>
        물론 연장된 기한마저 넘기면 그때부터 지연이자가 다시 붙어요. 동의서를 썼다고 해서 영원히 이자를 포기하는 건 아니에요. 하지만 회사가 연장 기한 안에 지급하면 이자를 한 푼도 못 받는 셈이니까, 동의 전에 신중하게 따져봐야 하죠.
      </p>
      <p style={body}>
        노동청 신고 시점도 늦어져요. 합의 기한이 남아 있으면 노동청에서 &ldquo;아직 기한 안이니까 기다리세요&rdquo;라고 할 수 있거든요. 빠르게 퇴직금을 받고 싶은 상황이라면 연장 동의가 오히려 발목을 잡을 수 있죠.
      </p>

      <BorderBox title="동의서를 쓰기 전에 생각해볼 것">
        회사가 정말 지급할 의사가 있는가? → 과거 급여 지연 이력 확인<br />
        연장 기한이 합리적인가? → 1~3개월 이내가 적정<br />
        지연이자 포기가 감수할 만한가? → 금액이 크면 손해도 커요
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>연장 동의 후 회사가 폐업하면?</H2>
      <p style={body}>
        최악의 시나리오죠. 기한을 연장해줬는데 그 사이에 <a href="/w/회사-폐업-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>회사가 폐업</a>해버리면 퇴직금을 직접 받기가 매우 어려워져요. 이때는 정부의 <strong>체당금 제도</strong>를 활용해야 하죠. 고용노동부에 체당금을 신청하면 국가가 퇴직금을 대신 지급하고, 사업주에게 나중에 구상권을 행사하는 구조예요.
      </p>
      <p style={body}>
        체당금은 최대 <strong>700만 원</strong>까지 받을 수 있어요. 퇴직금이 이보다 많으면 차액은 사업주 개인에게 민사소송으로 청구해야 하죠. 폐업 사실을 알게 된 날로부터 2년 이내에 신청해야 하니 빨리 움직여야 해요.
      </p>
      <p style={body}>
        이런 리스크 때문에 &ldquo;동의서를 쓸 때는 회사 상태를 먼저 살펴보라&rdquo;고 전문가들이 조언하는 거예요. 이미 급여가 밀리고 있거나, 거래처 대금이 정산되지 않는 회사라면 연장 동의는 위험해요. 차라리 14일 기한이 지나자마자 노동청에 신고하는 게 안전하죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>동의 없이 기한을 넘기면 어떻게 되나요?</H2>
      <p style={body}>
        합의 없이 14일을 넘기면 법 위반이에요. <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제18조</a>에 따라 15일째부터 <strong>연 20%</strong> 지연이자가 자동으로 붙기 시작하죠. 근로자가 별도로 청구하지 않아도 법률상 이자가 발생하는 거예요.
      </p>
      <p style={body}>
        형사처벌 대상이기도 해요. 근로기준법 제109조에 따르면 금품 미청산은 3년 이하 징역 또는 3,000만 원 이하 벌금에 해당하죠. 노동청에 진정을 넣으면 근로감독관이 시정지시를 내리고, 회사가 불이행하면 검찰로 송치돼요.
      </p>
      <p style={body}>
        근로자 입장에서는 오히려 유리한 상황이에요. 합의가 없으니까 지연이자를 온전히 받을 수 있고, 노동청 신고도 바로 가능하죠. 회사가 &ldquo;조금만 기다려줘&rdquo;라고 구두로 말하는 건 법적 합의가 아니니까, 14일이 지나면 바로 행동에 옮기세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>기한 연장 동의, 거부해도 되나요?</H2>
      <p style={body}>
        당연히 거부할 수 있어요. 연장 동의는 근로자의 <strong>권리</strong>이지 의무가 아니거든요. 회사가 아무리 사정을 호소해도 &ldquo;14일 안에 주세요&rdquo;라고 거절할 수 있죠. 거부했다는 이유로 불이익을 주면 그것 자체가 부당 행위에 해당해요.
      </p>
      <p style={body}>
        거부할 때는 구두보다 서면이 좋아요. &ldquo;기한 연장에 동의하지 않으며, 근로기준법 제36조에 따라 14일 이내 지급을 요청합니다&rdquo;라는 내용을 이메일이나 내용증명으로 보내세요. 이렇게 하면 나중에 &ldquo;근로자가 동의했다&rdquo;는 회사 측 주장을 원천 차단할 수 있죠.
      </p>
      <p style={body}>
        현실적으로 재직 중인 회사에 연장을 거부하기가 부담스러울 수 있어요. 하지만 이미 퇴사한 상태라면 눈치 볼 이유가 없죠. 퇴직금은 근로자가 일해서 번 돈이에요. 정당한 권리를 행사하는 것이니 당당하게 요청하세요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한 연장에 대해 자주 나오는 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)나 고용노동부 고객센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
