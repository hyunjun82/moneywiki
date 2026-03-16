"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 포기각서를 쓴 적이 있어요" },
  { id: "c2", label: "강요에 의해 각서를 작성했어요" },
  { id: "c3", label: "퇴직 후 아직 3년이 지나지 않았어요" },
  { id: "c4", label: "1년 이상 근무하고 주 15시간 이상 일했어요" },
];

const FAQS = [
  {
    q: "퇴직금 포기각서를 자발적으로 썼어도 무효인가요?",
    a: "네, 무효예요. 퇴직금은 근로자퇴직급여 보장법에서 정한 강행규정이라 근로자가 자발적으로 포기하더라도 효력이 없죠. 법이 보장하는 권리는 개인 합의로 포기할 수 없어요.",
  },
  {
    q: "포기각서를 쓰고 돈을 받았는데 퇴직금도 청구할 수 있나요?",
    a: "받은 돈이 퇴직금 명목이 아니라 위로금 등이라면 퇴직금을 별도로 청구할 수 있어요. 다만 이미 퇴직금 일부로 받은 거라면 차액만 청구하게 되죠.",
  },
  {
    q: "포기각서에 공증까지 받았어도 무효인가요?",
    a: "네, 공증을 받았어도 무효예요. 강행규정을 위반하는 약정은 공증 여부와 관계없이 법적 효력이 없죠.",
  },
  {
    q: "회사가 포기각서를 안 쓰면 퇴직 처리를 안 해준다고 해요.",
    a: "불법이에요. 퇴직 처리와 퇴직금은 별개 문제이죠. 포기각서 작성을 거부하더라도 퇴직 처리를 하지 않는 건 근로기준법 위반이에요. 고용노동부(1350)에 바로 상담하세요.",
  },
  {
    q: "포기각서를 쓰지 않기 위해 어떻게 대응하면 좋나요?",
    a: "서명을 거부하세요. 법적으로 포기각서 작성 의무가 없어요. 강요한다면 그 상황을 녹음하거나 문자로 증거를 남겨두세요. 나중에 강요 사실을 입증하는 데 결정적 자료가 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제3조 — 퇴직금 포기 금지", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제36조 — 금품 청산", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 관련 상담", url: "https://www.moel.go.kr" },
      { label: "대법원 판례 검색", url: "https://glaw.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 주면 어디에 어떻게 신고하는지 정리했어요.",
  },
  {
    slug: "퇴직금-정산서",
    title: "퇴직금 정산서 서명 전 확인사항",
    description: "퇴직금 정산서에 서명하기 전에 꼭 확인해야 할 항목을 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년",
    description: "퇴직금 청구 기한인 소멸시효 3년에 대해 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-포기각서"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 포기각서 · 근로자 권리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 포기각서,<br />
        쓰면 정말 못 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 퇴직금 포기각서를 쓰라고 압박받는 경우가 있죠.
        결론부터 말하면, <strong>퇴직금 포기각서는 법적으로 무효</strong>예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 퇴직금을 강행규정으로 보장하고 있어서, 근로자가 자발적으로 포기하더라도 효력이 없죠.
        각서를 썼어도 퇴직금을 청구할 수 있어요.
        법적 근거, 무효화 방법, 대처법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 포기각서가 법적으로 유효한가요?</H2>
      <p style={body}>
        유효하지 않아요. 근로자퇴직급여 보장법 제3조는 퇴직금 제도를 설정해야 할 의무를 사용자에게 부과하고 있죠. 이 규정은 &ldquo;강행규정&rdquo;이라서, 당사자 간 합의로 그 이하로 정하는 건 무효가 돼요.
      </p>
      <p style={body}>
        쉽게 말하면, 근로자가 &ldquo;퇴직금 안 받겠습니다&rdquo;라고 각서를 쓰더라도 법적 효력이 없다는 뜻이에요. <a href="https://glaw.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원</a>에서도 &ldquo;퇴직금 청구권을 사전에 포기하기로 하는 약정은 강행법규에 위반하여 무효&rdquo;라고 일관되게 판단하고 있죠.
      </p>
      <p style={body}>
        공증을 받았든, 자필로 썼든, 날인까지 했든 결과는 동일해요. 강행규정을 위반하는 약정은 형식을 갖췄더라도 무효이기 때문이죠. 각서를 썼다고 해서 퇴직금을 포기해야 한다고 생각하지 마세요.
      </p>

      <GreenBox title="퇴직금 포기각서 핵심">
        - 퇴직금은 <strong>강행규정</strong> → 개인 합의로 포기 불가<br />
        - 자발적 작성이든 강요든 <strong>법적 효력 없음</strong><br />
        - 공증·자필·날인 등 형식 무관 → <strong>무효</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 포기각서와 관계없이 퇴직금을 청구할 수 있어요."
        partialMatchText="일부만 해당돼요. 개별 상황을 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>강요에 의해 쓴 각서도 효력이 있나요?</H2>
      <p style={body}>
        효력이 없어요. 애초에 자발적이든 강요든 퇴직금 포기각서 자체가 무효인데, 강요까지 있었다면 형사상 문제가 될 수도 있죠. 강요에 의한 각서 작성은 &ldquo;강요죄&rdquo;에 해당할 수 있어요.
      </p>
      <p style={body}>
        &ldquo;각서를 안 쓰면 퇴직 처리를 안 해준다&rdquo;거나 &ldquo;불이익을 주겠다&rdquo;는 협박을 받았다면 그 상황을 증거로 남겨두세요. 녹음, 문자, 이메일 등이 모두 증거가 되죠. 나중에 노동부 진정이나 민사 소송에서 결정적 역할을 해요.
      </p>
      <p style={body}>
        강요 사실을 입증하면 퇴직금 청구뿐 아니라 부당노동행위로 신고할 수도 있어요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담하면 구체적인 대응 방법을 안내받을 수 있죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>포기각서를 무효로 만드는 방법은?</H2>
      <p style={body}>
        별도로 &ldquo;무효화&rdquo;하는 절차가 필요한 건 아니에요. 포기각서 자체가 이미 법적으로 무효이기 때문이죠. 퇴직금을 청구하면 되고, 회사가 각서를 근거로 거부하면 고용노동부에 진정을 넣으면 돼요.
      </p>
      <p style={body}>
        진정 시 포기각서 사본을 함께 제출하세요. 근로감독관이 &ldquo;강행규정 위반으로 무효&rdquo;라는 판단을 내리고 사업주에게 퇴직금 지급 시정 명령을 내리게 되죠.
      </p>
      <p style={body}>
        법원에 가더라도 결론은 동일해요. 퇴직금 포기각서를 유효하다고 인정한 판례는 사실상 없어요. 그러니 각서를 썼다고 포기하지 말고, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a> 절차를 진행하세요.
      </p>

      <Divider />

      <H2>포기각서 작성 후 퇴직금 청구가 가능한가요?</H2>
      <p style={body}>
        가능해요. 포기각서가 무효이기 때문에, 각서 작성 여부와 관계없이 퇴직금 청구권은 유지되죠. 소멸시효인 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직일로부터 3년</a> 이내에만 청구하면 돼요.
      </p>
      <p style={body}>
        청구 절차는 일반 퇴직금 미지급과 동일해요. 회사에 지급 요청 → 내용증명 발송 → 고용노동부 진정 순서로 진행하면 되죠. 각서를 증거로 제출하면 오히려 &ldquo;사업주가 불법적으로 포기를 강요했다&rdquo;는 증거가 돼요.
      </p>
      <p style={body}>
        3년이 지나면 청구권 자체가 사라지니까 빠르게 움직이는 게 중요해요. &ldquo;각서를 썼으니 안 될 거야&rdquo;라고 포기하는 분이 많은데, 법적으로 전혀 문제없이 청구할 수 있으니 망설이지 마세요.
      </p>

      <Divider />

      <H2>포기각서 관련 판례는 어떻게 되나요?</H2>
      <p style={body}>
        대법원은 퇴직금 포기각서에 대해 일관되게 &ldquo;무효&rdquo;라고 판단해왔어요. 대표적으로 &ldquo;근로자의 퇴직금 청구권을 사전에 포기하는 합의는 근로자퇴직급여 보장법의 강행규정에 반하여 무효&rdquo;라는 판시가 있죠.
      </p>
      <p style={body}>
        하급심에서도 포기각서를 유효하다고 본 사례가 거의 없어요. 회사가 각서를 근거로 퇴직금 지급을 거부해서 소송까지 간 경우에도, 법원은 예외 없이 근로자 손을 들어줬죠.
      </p>
      <p style={body}>
        이런 판례가 쌓여 있기 때문에 고용노동부 진정 단계에서 대부분 해결돼요. <a href="/w/퇴직금-정산서" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 정산서</a>에 서명하는 것과 포기각서를 쓰는 건 전혀 다른 문제니까, 두 가지를 혼동하지 않도록 주의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 포기각서에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 다를 수 있으니, 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
