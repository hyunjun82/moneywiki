"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const FAQS = [
  {
    q: "11개월 29일 일하고 퇴사하면 퇴직금을 못 받나요?",
    a: "원칙적으로 못 받아요. 계속근로기간이 1년(365일)에 하루라도 모자라면 퇴직금 대상이 아니죠. 하루 차이로 놓치지 않으려면 퇴사일을 신중하게 정해야 해요.",
  },
  {
    q: "6개월 계약을 두 번 하면 1년으로 인정되나요?",
    a: "계약 사이에 공백 없이 바로 갱신됐다면 합산돼요. 6개월 + 6개월 = 12개월로 퇴직금 대상이 되죠. 다만 계약 사이에 긴 공백이 있으면 합산이 안 될 수 있어요.",
  },
  {
    q: "1년 딱 채우고 바로 퇴사해도 불이익이 없나요?",
    a: "법적으로 불이익은 없어요. 퇴직금은 1년 이상 근무하면 받을 수 있는 법정 권리이니까요. 다만 퇴직금 계산은 근속기간에 비례하기 때문에, 오래 일할수록 금액이 커지죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조 — 근로자·사용자의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-1년미만",
    title: "1년 미만 근무, 퇴직금을 받을 수 있나요?",
    description: "1년 미만이라도 예외적으로 퇴직금을 받을 수 있는 경우를 설명해요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건 정리",
    description: "1년, 주 15시간, 퇴직 사유까지 퇴직금 수령 조건을 정리했어요.",
  },
  {
    slug: "계약직-퇴직금",
    title: "계약직도 퇴직금을 받을 수 있나요?",
    description: "계약 갱신과 기간 합산, 계약직 퇴직금 기준을 안내해요.",
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
          currentSlug="퇴직금-몇개월부터"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 기간기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 몇 개월 일해야<br />
        받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;6개월 일했는데 퇴직금 나오나요?&rdquo; &ldquo;11개월이면 아깝지 않나요?&rdquo;<br />
        퇴직금은 <strong>12개월(1년) 이상</strong> 근무해야 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>가 &ldquo;계속근로기간 1년 이상인 근로자&rdquo;를 대상으로 규정하고 있죠.
        그렇다면 &ldquo;1년&rdquo;은 정확히 어떻게 세는 걸까요? 중간에 퇴사하면 날아가는 건지, 계약 갱신은 합산되는 건지 — 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금은 몇 개월 일해야 받나요?</H2>
      <p style={body}>
        <strong>12개월(365일)</strong>이에요. 입사일부터 퇴사일까지 계속근로기간이 1년 이상이면 퇴직금 대상이 되죠. 정규직, <a href="/w/계약직-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약직</a>, 아르바이트 모두 같은 기준이에요.
      </p>
      <p style={body}>
        여기서 &ldquo;12개월&rdquo;이라고 했지만, 정확하게는 역일(曆日) 기준 365일이에요. 윤년이면 366일이 아니라 &ldquo;1년&rdquo;의 기준일이 달라지죠. 예를 들어 2025년 3월 1일 입사라면 2026년 3월 1일이 &ldquo;1년&rdquo;이 되는 날이에요.
      </p>
      <p style={body}>
        11개월 29일까지 일하고 퇴사하면 퇴직금을 받을 수 없어요. 하루 차이로 수십만 원에서 수백만 원을 놓칠 수 있죠. 그래서 퇴사 시점을 정할 때 반드시 입사일 기준으로 1년이 지났는지를 확인해야 해요.
      </p>

      <GreenBox title="퇴직금 기간 기준">
        계속근로기간 <strong>1년(365일) 이상</strong> → 퇴직금 대상<br />
        주 소정근로시간 <strong>15시간 이상</strong>도 동시에 충족해야 해요.<br />
        하루라도 모자라면 법적 의무가 발생하지 않죠.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>1년 기준은 어떻게 계산하나요?</H2>
      <p style={body}>
        <strong>입사일 ~ 퇴사일</strong>까지의 기간으로 계산해요. 퇴사일은 근무 마지막 날의 다음 날이죠. 2025년 1월 1일에 입사해서 2025년 12월 31일까지 일하고, 2026년 1월 1일자로 퇴사하면 딱 365일이에요.
      </p>
      <p style={body}>
        수습 기간도 포함돼요. 회사가 &ldquo;수습 3개월은 빠진다&rdquo;고 해도 법적 효력이 없죠. 실제로 근로를 제공하고 급여를 받은 기간은 모두 계속근로기간에 산입되고요. 시용 기간이나 인턴 기간도 마찬가지예요.
      </p>
      <p style={body}>
        병가나 육아휴직 기간은 어떨까요? 근로관계가 유지된 상태라면 계속근로기간에 포함돼요. 3개월 병가를 쓴다고 해서 계속근로기간이 3개월 줄어드는 게 아니죠. 핵심은 &ldquo;근로계약이 끊기지 않았느냐&rdquo;예요.
      </p>

      <BorderBox title="입사일 확인하는 법">
        고용보험 피보험자격 이력에서 정확한 입사일을 확인할 수 있어요.<br />
        고용24(ei.go.kr) → 나의 이력 → 피보험자격 이력 조회에서 볼 수 있죠.<br />
        회사가 신고한 입사일이 실제와 다르면 정정 요청도 가능해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>중간에 퇴사하면 퇴직금이 사라지나요?</H2>
      <p style={body}>
        1년이 안 되는 시점에서 퇴사하면 퇴직금 자체가 발생하지 않아요. &ldquo;사라진다&rdquo;기보다는 &ldquo;애초에 생기지 않는다&rdquo;가 정확한 표현이죠. 퇴직금은 퇴직 시점에 지급 의무가 발생하는 거니까요.
      </p>
      <p style={body}>
        다만 회사 취업규칙이나 단체협약에서 &ldquo;1년 미만 근무자에게도 퇴직금을 지급한다&rdquo;고 정해놓은 경우가 있어요. 이건 법정 기준보다 유리한 조건이기 때문에 유효하죠. 입사할 때 받은 취업규칙을 한번 살펴보는 게 좋아요.
      </p>
      <p style={body}>
        회사가 의도적으로 1년 직전에 퇴사를 유도하는 경우도 있어요. 11개월째 갑자기 계약 종료를 통보하거나 권고사직을 압박하는 식이죠. 이런 경우 부당해고에 해당할 수 있고, <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담을 받아볼 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>계약이 갱신된 경우 기간이 합산되나요?</H2>
      <p style={body}>
        원칙적으로 합산돼요. 6개월 계약을 두 번 연속으로 체결했다면 12개월 근무로 인정되죠. 핵심은 계약 사이에 <strong>공백 없이 연속</strong>됐느냐예요. 하루 쉬고 다시 계약했어도 실질적으로 연속 근로로 판단하는 경우가 많아요.
      </p>
      <p style={body}>
        대법원 판례도 같은 입장이에요. 계약 형식이 바뀌었어도 업무 내용과 근무 장소가 동일하고, 실질적으로 근로관계가 계속됐다면 계속근로기간으로 봐야 한다고 판시했죠. 계약서만 새로 썼다고 기간이 초기화되는 건 아니에요.
      </p>
      <p style={body}>
        반대로 합산이 안 되는 경우도 있어요. 첫 번째 계약 종료 후 수개월간 완전히 퇴직 상태였다가 다시 채용된 경우가 대표적이죠. 이때는 새로운 근로관계가 시작된 거라서 이전 기간과 합산하지 않아요. 공백 기간의 길이와 퇴직 처리 여부가 판단 기준이 되고요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직금 받기 직전에 퇴사하면 어떻게 되나요?</H2>
      <p style={body}>
        &ldquo;퇴직금 받기 직전&rdquo;이라는 건 보통 11~12개월차를 말하죠. 이 시기에 회사가 퇴사를 유도하면 퇴직금 회피 의도가 의심돼요. 실제로 고용노동부에서도 &ldquo;퇴직금 발생 직전 해고&rdquo;를 주의 깊게 보고 있어요.
      </p>
      <p style={body}>
        본인이 자발적으로 퇴사하는 경우라면 아쉽지만 어쩔 수 없어요. 1년이 안 됐으니 법적 퇴직금 의무가 없죠. 하지만 퇴사 시점을 며칠이라도 늦출 수 있다면, 1년을 채우고 나가는 게 금전적으로 훨씬 유리해요.
      </p>
      <p style={body}>
        회사가 1년 직전에 부당하게 해고했다면 노동위원회에 <strong>부당해고 구제신청</strong>을 할 수 있어요. 구제가 인정되면 해고일부터 복직일까지의 기간이 근속기간에 포함되기 때문에, 결과적으로 1년을 넘기게 되는 경우도 생기죠. 혼자 판단하기 어려우면 1350에 상담부터 받아보세요.
      </p>

      <GreenBox title="퇴직금 기간 핵심 정리">
        <strong>12개월(1년) 이상</strong> 근무 시 퇴직금 대상<br />
        계약 갱신은 공백 없이 연속되면 <strong>기간 합산</strong><br />
        지급 기한 <strong>14일</strong> / 지연이자 <strong>연 20%</strong> / 소멸시효 <strong>3년</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기간 기준에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
