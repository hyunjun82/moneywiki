"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 사업장에서 일했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "근로계약서를 쓴 근로자(정규직, 계약직, 아르바이트 포함)예요" },
  { id: "c4", label: "퇴직(자발적 퇴사, 해고, 계약만료 등)을 했어요" },
];

const CHECKLIST = [
  "근로계약서 — 근무 시작일과 근무 조건이 기재돼 있어야 해요",
  "급여명세서 — 최근 3개월치, 평균임금 산정에 필요해요",
  "퇴직증명서 — 회사에 요청하면 발급해줘야 하죠",
  "통장 사본 — 퇴직금 수령 계좌용이에요",
  "IRP 계좌 — 퇴직금 55만 원 이상이면 IRP로 받아야 해요",
];

const FAQS = [
  {
    q: "수습 기간도 퇴직금 근무 기간에 포함되나요?",
    a: "포함돼요. 수습 기간이라고 해도 근로계약이 성립한 시점부터 근무 기간에 산입되죠. 수습 3개월 + 정규 9개월이면 합쳐서 1년이니까 퇴직금 대상이에요.",
  },
  {
    q: "퇴직금은 세금을 떼고 주나요?",
    a: "맞아요. 퇴직소득세가 원천징수돼요. 세율은 근속연수와 금액에 따라 달라지는데, 대부분 3~10% 수준이죠. IRP로 받으면 세금이 이연(나중에 연금으로 수령 시 더 낮은 세율 적용)돼요.",
  },
  {
    q: "회사가 부도나면 퇴직금을 못 받나요?",
    a: "아니에요. 고용노동부 체당금 제도가 있어요. 회사가 도산하거나 폐업해도 국가가 먼저 퇴직금을 지급하고, 나중에 회사에 구상하는 구조예요. 퇴직 후 2년 이내에 신청하면 돼요.",
  },
  {
    q: "퇴직금을 월급에 포함해서 준다고 하면요?",
    a: "불법이에요. 퇴직금을 매월 급여에 포함해서 지급하는 건 근로자퇴직급여보장법 위반이죠. 나중에 퇴직할 때 별도로 다시 청구할 수 있고, 이미 받은 금액은 관계없이 전액 받을 수 있어요.",
  },
  {
    q: "1년 딱 채우고 하루 더 일해야 퇴직금이 나오나요?",
    a: "1년 '이상'이 기준이에요. 정확히 1년(365일) 근무하면 퇴직금 대상이 되죠. 하루 더 일할 필요는 없어요. 다만 입사일부터 퇴사일까지의 계산은 회사마다 해석이 조금 달라서, 364일이 될 수 있는 경우에는 하루 더 채우는 게 안전하긴 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 — 근로자의 정의 및 근로관계", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24 — 체당금 신청 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건 정리",
    description: "1년 이상 근무, 주 15시간 이상 등 퇴직금 수급 조건을 구체적으로 정리했어요.",
  },
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법과 공식",
    description: "평균임금 기준 퇴직금 계산 공식과 실제 계산 예시를 다뤘어요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "퇴직일로부터 14일 이내 지급 의무와 지연이자 연 20%를 정리했어요.",
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
          currentSlug="퇴직금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 기본개념</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금이 뭔지 모르겠다면?<br />
        기본 개념과 수령 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 정확히 뭔지, 내가 받을 수 있는 건지 잘 모르겠어요.&rdquo;<br />
        이런 분이 생각보다 많아요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정해놓은 건 간단하죠.
        1년 이상 일한 근로자가 퇴직하면 사업주가 반드시 지급해야 하는 돈이에요.
        정규직이든 계약직이든 <a href="/w/알바-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>아르바이트</a>든 조건만 맞으면 다 받을 수 있죠.
        지금부터 퇴직금이 뭔지, 누가 얼마나 받는지, 어떻게 받는지 순서대로 풀어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금이 정확히 뭔가요?</H2>
      <p style={body}>
        퇴직금은 근로자가 회사를 그만둘 때 사업주가 지급하는 법정 급여예요. &ldquo;법정&rdquo;이라는 건 회사가 &ldquo;줄게, 안 줄게&rdquo; 선택할 수 있는 게 아니라 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>법이 강제</a>한다는 뜻이죠. 안 주면 사업주가 처벌받아요.
      </p>
      <p style={body}>
        흔히 &ldquo;보너스&rdquo;나 &ldquo;위로금&rdquo; 같은 거라고 착각하는 분이 계시는데, 전혀 달라요. 퇴직금은 근로자가 일한 대가의 일부를 퇴직 시점에 한꺼번에 받는 후불임금(나중에 받는 월급)의 성격이에요. 대법원 판례도 일관되게 이 입장을 유지하고 있죠.
      </p>
      <p style={body}>
        사업장 규모와 무관하게 적용돼요. 직원이 1명인 가게든, 직원 수천 명인 대기업이든 모두 해당되죠. 2010년 12월 1일부터 4인 이하 사업장에도 퇴직금 제도가 확대 적용됐기 때문에, &ldquo;우리 회사는 작아서 퇴직금이 없다&rdquo;는 말은 틀린 거예요.
      </p>

      <GreenBox title="핵심 정리">
        퇴직금 = 법이 강제하는 후불임금<br />
        1인 이상 모든 사업장에 적용<br />
        사업주가 안 주면 3년 이하 징역 또는 3천만 원 이하 벌금
      </GreenBox>

      <SectionBadge>내가 퇴직금 대상인지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금을 받을 수 있는 대상이에요. 회사에 지급을 요청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건을 다시 확인해보시고, 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>누가 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        조건이 딱 두 가지예요. 첫째, 같은 사업장에서 <strong>1년 이상</strong> 근무할 것. 둘째, 4주 평균 <strong>주 15시간 이상</strong> 일할 것. 이 두 가지만 채우면 고용 형태(정규직, 계약직, 일용직, 아르바이트)와 관계없이 퇴직금을 받을 수 있죠.
      </p>
      <p style={body}>
        퇴사 사유도 따지지 않아요. 자발적으로 그만두든, 해고를 당하든, <a href="/w/계약직-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약 기간이 만료</a>되든 퇴직금은 나와요. &ldquo;자기가 그만뒀으니까 퇴직금 없다&rdquo;는 건 회사의 거짓말이에요. 법적 근거가 전혀 없죠.
      </p>
      <p style={body}>
        한 가지 주의할 점이 있어요. 주 15시간 미만 초단시간 근로자는 퇴직금 대상에서 빠져요. 주 14시간 근무 아르바이트라면 아무리 오래 일해도 퇴직금이 안 나오죠. 그런데 실제 근무 시간이 계약서보다 많다면 실제 시간 기준으로 따지니까, 이 부분은 꼼꼼히 따져봐야 해요.
      </p>

      <BorderBox title="자주 헷갈리는 사례">
        <strong>수습 기간</strong> — 퇴직금 산정에 포함돼요. 입사 첫날부터 카운트하죠.<br />
        <strong>병가·휴직</strong> — 재직 기간에 포함돼요. 무급 휴직이어도 마찬가지고요.<br />
        <strong>파견근로자</strong> — 파견회사(사용자)가 퇴직금을 줘야 해요. 실제 일하는 회사가 아니에요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>퇴직금은 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        계산 공식이 정해져 있어요. <strong>1일 평균임금 x 30일 x (재직일수 / 365)</strong>이죠. 평균임금은 퇴직 전 3개월간 받은 총 임금을 그 기간의 총 일수로 나눈 값이에요. 기본급뿐 아니라 고정 수당, 상여금(정기적으로 받는 것)도 포함되죠.
      </p>
      <p style={body}>
        예를 들어볼게요. 월급 300만 원을 받고 3년간 근무했다면, 평균임금은 약 10만 원(300만 원 x 3개월 / 91일)이에요. 퇴직금은 10만 원 x 30일 x 3년 = 약 900만 원이 되죠. 실제로는 상여금, 연차수당 등을 포함하면 금액이 더 올라가는 경우가 많아요.
      </p>
      <p style={body}>
        퇴직금 계산에서 가장 많이 분쟁이 나는 부분은 &ldquo;뭘 평균임금에 넣느냐&rdquo;예요. 식대, 교통비, 직책수당 같은 고정 수당은 포함되는데, 경조사비처럼 비정기적으로 받는 돈은 빠지죠. <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 방법</a> 글에서 더 자세히 다루고 있어요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 */}
      <H2>퇴직금은 언제 어떻게 받나요?</H2>
      <p style={body}>
        퇴직일로부터 <strong>14일 이내</strong>에 지급해야 해요. 이건 근로자퇴직급여보장법 제9조가 정한 기한이죠. 14일이 지나도 안 주면 그때부터 <strong>연 20%</strong> 지연이자가 붙어요. 100만 원이 밀리면 하루에 약 548원씩 이자가 쌓이는 거예요.
      </p>
      <p style={body}>
        지급 방법은 원칙적으로 <strong>IRP(개인형 퇴직연금) 계좌</strong>로 받아야 해요. 퇴직금이 300만 원 이하인 경우에만 일반 통장으로 받을 수 있죠. IRP 계좌는 은행이나 증권사 앱에서 10분이면 개설할 수 있으니까, 퇴직 전에 미리 만들어두면 편해요.
      </p>
      <p style={body}>
        회사가 &ldquo;다음 달에 줄게&rdquo;, &ldquo;자금 사정이 어려워서&rdquo; 이러면 어떡하냐고요? 당사자 간 합의로 지급 기한을 연장할 수 있긴 하지만, 서면 합의가 필수예요. 구두 약속은 효력이 없죠. 연장 합의 없이 14일이 넘으면 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자</a>를 청구할 수 있어요.
      </p>

      <GreenBox title="지급 기한 정리">
        퇴직일로부터 <strong>14일</strong> 이내 지급 (법정 기한)<br />
        14일 초과 시 <strong>연 20%</strong> 지연이자 발생<br />
        지급 기한 연장은 <strong>서면 합의</strong> 필수
      </GreenBox>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직금 못 받을 수도 있나요?</H2>
      <p style={body}>
        법적으로 퇴직금 대상인데 못 받는 경우는 &ldquo;회사가 안 주는 것&rdquo;이지 &ldquo;받을 수 없는 것&rdquo;이 아니에요. 조건을 채웠는데 회사가 지급을 거부하면 <strong>고용노동부에 진정</strong>을 넣을 수 있죠. 접수 후 보통 2~4주 내에 근로감독관이 사업주에게 시정 명령을 내려요.
      </p>
      <p style={body}>
        시정 명령에도 안 주면 형사고소까지 갈 수 있어요. 퇴직금 미지급은 근로자퇴직급여보장법 위반으로 <strong>3년 이하 징역 또는 3천만 원 이하 벌금</strong>이에요. 실제로 처벌받는 사업주가 꽤 되니까 &ldquo;어차피 소용없겠지&rdquo; 하고 포기하지 마세요.
      </p>
      <p style={body}>
        퇴직금 청구권에는 <strong>소멸시효 3년</strong>이 적용돼요. 퇴직일로부터 3년이 지나면 청구 자체가 불가능해지죠. 그러니까 &ldquo;나중에 해야지&rdquo; 미루지 말고, 퇴직 후 최대한 빨리 움직이는 게 유리해요. 고용노동부 상담(1350)은 무료이니까, 상황이 애매하면 전화부터 하세요.
      </p>

      <BorderBox title="소멸시효 주의">
        퇴직금 청구권의 소멸시효는 퇴직일 다음 날부터 <strong>3년</strong>이에요.<br />
        3년이 지나면 법적으로 청구할 수 없게 되니까, 미지급 상태라면 지금 바로 행동하세요.<br />
        고용노동부 진정 접수는 온라인(minwon.moel.go.kr)으로도 가능하죠.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기본 개념에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
