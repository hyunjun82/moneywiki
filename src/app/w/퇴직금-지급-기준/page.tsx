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
    q: "1년을 딱 채우고 퇴사하면 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 근로자퇴직급여보장법은 '1년 이상' 근무를 기준으로 하기 때문에, 입사일로부터 정확히 365일이 되는 날 퇴사하면 지급 대상이죠.",
  },
  {
    q: "수습 기간도 근무 기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 급여를 받았다면 계속근로기간에 들어가죠. 회사가 '수습은 제외'라고 해도 법적으로 효력이 없어요.",
  },
  {
    q: "주 15시간을 기준으로 왜 나누나요?",
    a: "근로기준법이 주 15시간 미만 초단시간 근로자에게는 퇴직금·주휴수당 등 일부 규정을 적용하지 않기 때문이에요. 4주 평균 주 15시간 이상이면 퇴직금 대상이죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조 — 단시간근로자의 근로조건", url: "https://www.law.go.kr/법령/근로기준법" },
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
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건 정리",
    description: "1년, 주 15시간, 퇴직 사유까지 퇴직금 수령 조건을 한눈에 볼 수 있어요.",
  },
  {
    slug: "퇴직금-몇개월부터",
    title: "퇴직금, 몇 개월 일해야 받을 수 있나요?",
    description: "12개월 기준의 구체적인 계산법과 중간 퇴사 시 처리 방식을 정리했어요.",
  },
  {
    slug: "퇴직금-지급-기준-5인미만",
    title: "5인 미만 사업장 퇴직금 지급 기준",
    description: "소규모 사업장이라도 퇴직금을 지급해야 하는 이유와 기준을 설명해요.",
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
          currentSlug="퇴직금-지급-기준"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기준,<br />
        1년 이상 근무하면 무조건 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;1년 넘게 다녔는데, 퇴직금 못 받는 경우도 있나요?&rdquo;<br />
        결론부터 말하면, 1년 이상 근무했고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>가 이걸 명확하게 규정하고 있죠.
        다만 &ldquo;1년&rdquo;의 기준이나 &ldquo;주 15시간&rdquo;의 계산법을 모르면 자격이 되는데도 놓치는 경우가 생기죠.
        지급 기준의 핵심 조건, 근무 기간 계산법, 예외 사유까지 하나씩 풀어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 지급 기준이 정확히 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>는 두 가지 조건을 제시해요. 첫째, <strong>계속근로기간이 1년 이상</strong>이어야 하고요. 둘째, <strong>4주 평균 주 소정근로시간이 15시간 이상</strong>이어야 하죠. 이 두 조건을 동시에 충족하면 정규직이든 계약직이든 아르바이트든 퇴직금 대상이에요.
      </p>
      <p style={body}>
        &ldquo;계속근로기간&rdquo;이라는 표현이 낯설 수 있는데, 쉽게 말하면 같은 회사에 끊기지 않고 다닌 기간이에요. 입사일부터 퇴사일까지를 기준으로 하죠. 중간에 휴직이나 병가가 있었어도 근로관계가 유지됐다면 계속근로기간에 포함돼요.
      </p>
      <p style={body}>
        여기서 중요한 게 &ldquo;무조건&rdquo;이라는 말이에요. 회사 규모가 작든 크든, 정규직이든 비정규직이든 상관없어요. 사업장 규모에 관계없이 동일하게 적용되죠. 2010년 12월 1일 이후로는 <a href="/w/퇴직금-지급-기준-5인미만" style={{ color: "#1D9E75", textDecoration: "underline" }}>5인 미만 사업장</a>에도 전면 적용되고 있어요.
      </p>

      <GreenBox title="퇴직금 지급 조건 2가지">
        1. 같은 사업장에서 <strong>계속근로기간 1년 이상</strong><br />
        2. 4주 평균 <strong>주 소정근로시간 15시간 이상</strong><br />
        두 조건을 모두 충족하면 고용 형태와 무관하게 퇴직금 대상이에요.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>근무 기간 계산은 어떻게 하나요?</H2>
      <p style={body}>
        계속근로기간은 <strong>입사일~퇴사일</strong>로 계산해요. 예를 들어 2025년 1월 1일에 입사해서 2026년 1월 1일에 퇴사하면 딱 365일이죠. 이 경우 1년 이상이니 퇴직금 대상이에요.
      </p>
      <p style={body}>
        수습 기간이나 시용 기간도 포함돼요. 회사가 &ldquo;수습 3개월은 근무 기간에서 빼겠다&rdquo;고 해도 법적으로 효력이 없죠. 실제로 근로를 제공하고 급여를 받았다면 그 기간은 자동으로 산입되고요.
      </p>
      <p style={body}>
        휴직 기간은 조금 복잡해요. 육아휴직, 병가 등 회사와 근로관계가 유지된 상태에서의 휴직은 계속근로기간에 포함돼요. 반면 무단결근으로 인한 대기발령 같은 경우는 개별 판단이 필요하죠. 핵심은 &ldquo;근로계약이 끊기지 않았느냐&rdquo;예요.
      </p>

      <BorderBox title="퇴직일 기준 주의">
        퇴직금 계산에서 &ldquo;퇴사일&rdquo;은 근무 마지막 날의 다음 날이에요.<br />
        12월 31일까지 일하고 1월 1일자로 퇴사하면, 퇴사일은 1월 1일이죠.<br />
        이 하루 차이가 1년 충족 여부를 바꿀 수 있으니 꼭 확인하세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>주 15시간 기준은 왜 중요한가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제18조</a>는 4주 평균 주 소정근로시간이 15시간 미만인 근로자를 &ldquo;초단시간 근로자&rdquo;로 분류해요. 이 경우 퇴직금, 주휴수당, 연차 등 일부 규정이 적용되지 않죠. 그래서 주 15시간은 퇴직금을 가르는 핵심 기준선이에요.
      </p>
      <p style={body}>
        계산은 &ldquo;4주 평균&rdquo;으로 해요. 어떤 주에는 20시간, 다른 주에는 10시간 일했다면 4주 평균이 15시간 이상인지를 봐야 하죠. 한 주만 15시간 미만이었다고 바로 탈락하는 건 아니에요.
      </p>
      <p style={body}>
        문제는 사업주가 의도적으로 근로시간을 14시간으로 쪼개는 경우예요. 이런 관행을 &ldquo;쪼개기 고용&rdquo;이라 부르는데, 실질적으로 15시간 이상 일하고 있다면 근로감독관에게 신고할 수 있죠. 실제 근무 시간을 기록해두면 증거로 활용할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>지급 기준을 충족했는데 못 받는 경우도 있나요?</H2>
      <p style={body}>
        드물지만 있어요. 가장 대표적인 건 <strong>퇴직금 소멸시효</strong>가 지난 경우예요. 퇴직금 청구권은 퇴직일로부터 <strong>3년</strong>이에요. 3년이 넘으면 법적으로 청구할 수 없죠. 퇴사한 지 오래됐다면 시효부터 따져봐야 해요.
      </p>
      <p style={body}>
        사업주가 퇴직금 지급을 거부하는 경우도 현실적으로 많아요. 이때는 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동부에 임금체불 진정</a>을 넣으면 돼요. 퇴직금은 임금에 해당하기 때문에 미지급 시 사업주가 형사처벌(3년 이하 징역 또는 3천만 원 이하 벌금)을 받을 수 있죠.
      </p>
      <p style={body}>
        퇴직금 지급 기한은 퇴직일로부터 <strong>14일</strong>이에요. 이 기한을 넘기면 <strong>연 20%</strong>의 지연이자가 붙죠. 회사가 &ldquo;지금 사정이 어려우니 나중에 주겠다&rdquo;고 해도 법적 기한은 변하지 않아요. 다만 당사자 간 합의로 기한을 연장할 수는 있는데, 반드시 서면으로 해야 효력이 생기죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>기준 충족 여부를 어떻게 확인하나요?</H2>
      <p style={body}>
        가장 정확한 방법은 <strong>고용보험 가입 이력</strong>을 조회하는 거예요. 고용보험 홈페이지나 고용24에서 본인의 피보험자격 이력을 확인하면 입사일·퇴사일·주 소정근로시간이 나오죠. 회사가 신고한 내용이 실제와 다르면 정정 요청도 가능하고요.
      </p>
      <p style={body}>
        근로계약서도 꼭 꺼내봐야 해요. 주 소정근로시간이 몇 시간으로 기재돼 있는지, 입사일이 정확한지를 비교해보세요. 근로계약서가 없다면 급여명세서, 출퇴근 기록, 카카오톡 대화 내역 같은 걸로 대체할 수 있어요.
      </p>
      <p style={body}>
        혼자 판단하기 어렵다면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담전화 1350에 문의하세요. 무료이고, 본인 상황을 설명하면 퇴직금 대상인지 바로 안내받을 수 있죠. 근로감독관 상담도 요청할 수 있어요.
      </p>

      <GreenBox title="퇴직금 지급 기준 핵심 정리">
        계속근로기간 1년 이상 + 주 15시간 이상 = 퇴직금 대상<br />
        지급 기한 <strong>14일</strong> 초과 시 <strong>연 20% 지연이자</strong><br />
        청구권 소멸시효 <strong>3년</strong> — 퇴직 후 바로 챙기는 게 안전해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기준에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
