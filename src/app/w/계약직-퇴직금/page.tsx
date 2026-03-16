"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "계약직(기간제)으로 1년 이상 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 일했어요" },
  { id: "c3", label: "4대보험에 가입돼 있었어요(고용보험 포함)" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const CHECKLIST = [
  "근로계약서 — 계약 기간, 근무 시간, 임금 조건 확인",
  "급여명세서(최근 3개월) — 평균임금 산정 근거",
  "4대보험 가입 이력 — 근로복지공단 또는 국민연금공단에서 조회",
  "계약 갱신 이력 — 갱신된 경우 기간 합산 증빙용",
  "퇴직금 미지급 시 내용증명 발송 기록 — 증거 확보용",
];

const FAQS = [
  {
    q: "계약직 6개월 근무 후 퇴사하면 퇴직금을 받을 수 있나요?",
    a: "안타깝지만 받을 수 없어요. 근로기준법상 퇴직금은 1년 이상 계속 근로한 경우에만 발생하죠. 다만 계약이 반복 갱신돼서 총 기간이 1년을 넘으면 받을 수 있어요.",
  },
  {
    q: "계약 만료로 퇴사해도 퇴직금을 받나요?",
    a: "네, 받을 수 있죠. 퇴직 사유가 자발적이든 계약 만료든 상관없어요. 1년 이상 근무했고 주 15시간 이상 일했다면 퇴직금은 당연히 발생해요.",
  },
  {
    q: "6개월 계약을 두 번 갱신했는데 퇴직금이 생기나요?",
    a: "6개월 + 6개월 = 12개월이니까 퇴직금 발생 조건을 충족해요. 계약이 갱신되면 근무 기간이 합산되죠. 중간에 하루도 빠짐없이 이어졌다면 문제없어요.",
  },
  {
    q: "계약직인데 회사가 퇴직금이 없다고 해요. 어떻게 하나요?",
    a: "회사 말이 틀렸어요. 계약직이든 정규직이든 1년 이상 주 15시간 이상 근무하면 퇴직금은 법적 의무예요. 고용노동부(1350)에 진정을 넣으면 되죠.",
  },
  {
    q: "계약직 퇴직금 계산은 정규직이랑 같나요?",
    a: "완전히 같아요. 퇴직 전 3개월 평균임금 x 근속연수로 계산하죠. 계약직이라고 계산 방식이 달라지는 건 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제34조 — 퇴직급여 제도", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "근로복지공단 — 퇴직금 관련 상담", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "계약직-퇴직금-지급규정",
    title: "계약직 퇴직금 지급 규정 적용 방법",
    description: "계약 기간이 짧아도 갱신이 반복되면 퇴직금 지급 규정이 적용돼요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건 정리",
    description: "1년 이상 근무, 주 15시간 이상 — 퇴직금 발생 조건을 한눈에 정리했어요.",
  },
  {
    slug: "퇴직금-1년미만",
    title: "1년 미만 근무 퇴직금 받을 수 있는 경우",
    description: "1년을 못 채웠어도 퇴직금을 받을 수 있는 예외 상황이 있어요.",
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
          currentSlug="계약직-퇴직금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계약직 · 고용유형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 퇴직금, 1년 채우면<br />
        받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;계약직은 퇴직금이 없다&rdquo;는 말, 아직도 믿고 계신가요?
        틀렸어요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 정규직과 계약직을 구분하지 않아요.
        1년 이상 일하고, 주 평균 15시간 이상 근무했다면 퇴직금은 법적 권리죠.
        계약이 갱신되면 기간이 합산되니까, 6개월짜리 계약을 두 번 했어도 1년이면 퇴직금이 발생해요.
        지금부터 조건, 계산법, 갱신 시 합산 기준, 청구 방법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>계약직도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>과 근로자퇴직급여 보장법은 &ldquo;근로자&rdquo;라는 단어만 쓰지, 정규직·계약직을 따로 나누지 않죠. 1년 이상 계속 근로하고, 주 평균 근로시간이 15시간 이상이면 퇴직금 지급 의무가 생겨요.
      </p>
      <p style={body}>
        여기서 핵심은 &ldquo;계속 근로&rdquo;라는 개념이에요. 같은 사업장에서 끊김 없이 일했다면 계약직이어도 계속 근로로 인정받죠. 계약서를 매번 새로 썼더라도 실질적으로 업무가 이어졌으면 동일한 근로관계로 봐요.
      </p>
      <p style={body}>
        사업주가 &ldquo;계약직이라 퇴직금 해당 안 된다&rdquo;고 주장하는 경우가 종종 있는데, 법적으로 근거가 없는 말이에요. 이런 상황이라면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담부터 받아보세요. 무료이고, 전화 한 통이면 되죠.
      </p>

      <GreenBox title="계약직 퇴직금 핵심 조건">
        1. <strong>1년 이상</strong> 계속 근로 (계약 갱신 시 기간 합산)<br />
        2. 주 평균 <strong>15시간 이상</strong> 근무<br />
        3. 정규직·계약직·파트타임 구분 없이 <strong>동일 적용</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금을 받을 수 있는 조건을 갖췄어요. 퇴직 전 3개월 평균임금으로 금액을 계산해보세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용노동부(1350)에 상담을 받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>계약 기간이 1년 미만이면 어떻게 되나요?</H2>
      <p style={body}>
        단일 계약 기간이 1년 미만이면 원칙적으로 퇴직금이 발생하지 않아요. <a href="/w/퇴직금-1년미만" style={{ color: "#1D9E75", textDecoration: "underline" }}>1년 미만 퇴직금</a> 규정상 계속 근로 기간이 1년을 넘어야 하죠. 6개월 계약 한 번으로 끝났다면 퇴직금 청구가 어려워요.
      </p>
      <p style={body}>
        하지만 계약이 갱신되거나 재계약된 경우는 달라져요. 6개월 계약을 두 번, 혹은 3개월 계약을 네 번 반복했다면 총 기간이 합산돼요. 판례에서도 &ldquo;동일 사업장에서 반복 갱신된 계약은 계속 근로로 본다&rdquo;고 일관되게 판단하고 있죠.
      </p>
      <p style={body}>
        주의할 점이 하나 있어요. 계약과 계약 사이에 공백 기간이 길면 &ldquo;계속 근로&rdquo; 인정이 어려울 수 있죠. 보통 1~2일 정도 공백은 문제없지만, 한 달 이상 비어 있으면 별도 근로관계로 볼 가능성이 있어요. 갱신 시점을 잘 살펴야 해요.
      </p>

      <BorderBox title="1년 직전 계약 해지 — 편법 주의">
        일부 사업주가 퇴직금을 피하려고 11개월 30일에 계약을 끊는 경우가 있어요.<br />
        이건 탈법 행위로, 노동위원회에서 부당해고로 판단한 사례가 여러 건 있죠.<br />
        이런 상황이라면 고용노동부에 진정을 넣으세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>계약 갱신 시 퇴직금이 누적되나요?</H2>
      <p style={body}>
        네, 누적돼요. 계약 갱신이나 재계약이 이루어지면 근무 기간이 이어지는 것으로 보기 때문에 퇴직금 산정 시 전체 기간을 합산하죠. 1년 계약을 세 번 갱신해서 3년 근무했다면, 3년치 퇴직금을 받을 수 있어요.
      </p>
      <p style={body}>
        다만 &ldquo;갱신&rdquo;과 &ldquo;신규 채용&rdquo;은 구분해야 해요. 같은 회사에서 같은 업무를 했는데 형식적으로 퇴사 처리 후 재입사시키는 건 실질적 갱신으로 봐요. 반대로 완전히 다른 부서, 다른 업무로 새로 들어갔다면 별도 근로관계가 될 수도 있죠.
      </p>
      <p style={body}>
        계약 갱신 여부 판단이 애매하다면 근로계약서를 꼼꼼히 살펴보세요. 업무 내용, 근무 장소, 급여 조건이 동일하거나 비슷하면 갱신으로 인정받을 가능성이 높아요. 증빙 자료를 미리 모아두는 게 핵심이죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>계약 종료 시 퇴직금 지급 기한은?</H2>
      <p style={body}>
        계약 종료일로부터 <strong>14일 이내</strong>에 지급해야 해요. 이건 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에 명시된 원칙이죠. 계약직이든 정규직이든 기한은 동일해요. 14일이 넘으면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙기 시작하죠.
      </p>
      <p style={body}>
        계약 만료를 앞두고 있다면 퇴직 전 3개월 급여명세서를 미리 챙겨두세요. 평균임금 산정 근거가 되니까요. 회사가 &ldquo;정산 중이라 좀 늦는다&rdquo;고 하더라도 법적 기한은 14일이에요. 사정이 있다면 당사자 간 합의로 기한을 연장할 수 있지만, 서면 동의가 있어야 하죠.
      </p>
      <p style={body}>
        14일이 지나도 퇴직금이 안 들어온다면 먼저 회사에 내용증명을 보내세요. 그래도 반응이 없으면 고용노동부에 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 진정</a>을 넣으면 되죠. 접수 후 근로감독관이 사업주에게 시정 명령을 내리게 돼요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>계약직 퇴직금 청구 방법은?</H2>
      <p style={body}>
        퇴직금 청구는 크게 세 단계예요. 먼저 회사에 직접 요청하고, 안 되면 내용증명을 보내고, 그래도 안 되면 고용노동부에 신고하죠. 대부분 첫 번째나 두 번째 단계에서 해결이 돼요. 내용증명은 &ldquo;법적 조치를 하겠다&rdquo;는 의사 표현이라 효과가 큰 편이에요.
      </p>
      <p style={body}>
        고용노동부 신고는 온라인(민원마당)이나 관할 고용노동지청 방문으로 할 수 있어요. 접수 후 약 2~4주 내에 근로감독관이 사업주를 조사하고, 퇴직금 지급 시정 명령을 내리죠. 사업주가 이를 이행하지 않으면 검찰 송치까지 갈 수 있어요.
      </p>
      <p style={body}>
        소멸시효가 <strong>퇴직일로부터 3년</strong>이라는 점도 잊지 마세요. 3년이 지나면 아무리 정당한 퇴직금이어도 법적으로 청구할 수 없어요. &ldquo;나중에 해야지&rdquo; 미루다가 시효가 끝나는 경우가 생각보다 많으니, 퇴직 후 빠르게 움직이는 게 유리하죠.
      </p>

      <SectionBadge>청구 전 준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약직 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
