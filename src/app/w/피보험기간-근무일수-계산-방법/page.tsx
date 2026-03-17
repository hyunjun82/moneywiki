"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "근로계약서에 근무일·유급휴일이 명시돼 있어요" },
  { id: "c2", label: "유급일과 무급일을 구분할 수 있어요" },
  { id: "c3", label: "고용24에서 피보험자격 이력을 조회했어요" },
  { id: "c4", label: "퇴직 전 18개월 내 피보험기간 180일을 충족해요" },
];

const FAQS = [
  {
    q: "피보험기간 180일이 정확히 몇 개월이에요?",
    a: "주 5일 근무에 유급 주휴일 포함하면 한 달에 약 24~26일이 쌓여요. 180일 나누면 대략 7~8개월이죠. 여유 있게 보면 8~9개월 근무하면 180일을 채울 수 있어요.",
  },
  {
    q: "주말이랑 공휴일도 피보험기간에 들어가나요?",
    a: "유급 주휴일은 포함되지만, 무급휴일은 제외돼요. 토요일이 무급이면 빠지고, 일요일이 유급 주휴일이면 포함되죠. 공휴일은 유급이면 들어가고, 무급이면 안 들어가요.",
  },
  {
    q: "이전 직장 피보험기간도 합산할 수 있나요?",
    a: "가능하죠. 단, 이전 퇴직 때 실업급여를 받지 않았어야 해요. 실업급여를 한 번이라도 받았으면 그 이전 기간은 전부 리셋돼요. 새로 180일을 처음부터 쌓아야 하죠.",
  },
  {
    q: "일용직이나 단기 알바도 피보험기간이 쌓이나요?",
    a: "고용보험에 가입된 일용직이라면 일한 날수만큼 피보험기간이 쌓여요. 고용24에서 일용근로내역을 조회하면 본인의 기록을 확인할 수 있죠.",
  },
  {
    q: "피보험기간이 180일에서 딱 모자라면 어떡하죠?",
    a: "합산해도 부족하면 실업급여 수급자격이 안 돼요. 다른 곳에서 추가로 일해서 180일을 채워야 하죠. 실업급여 대상이 아니라면 국민취업지원제도로 구직촉진수당을 받는 방법도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 피보험기간 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령: 피보험단위기간 계산 세부 규정", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험자격 이력내역 조회", url: "https://www.ei.go.kr" },
      { label: "4대사회보험포털: 고용보험 가입 이력 확인", url: "https://www.4insure.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간 계산",
    description: "피보험기간 180일 산정 기준과 예외 사항을 정리했어요.",
  },
  {
    slug: "실업급여-피보험단위기간",
    title: "피보험단위기간이란",
    description: "피보험단위기간과 피보험기간의 차이를 쉽게 풀었어요.",
  },
  {
    slug: "무급휴무일-180일-미달",
    title: "무급휴무일 때문에 180일 미달?",
    description: "무급휴무일이 많아서 피보험기간이 부족한 경우 대처법이에요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="피보험기간-근무일수-계산-방법"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 피보험기간</p>

      {/* h1 (2줄) */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        피보험기간 근무일수, 180일이 몇 개월?<br />
        계산 방법
      </h1>

      {/* intro: 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;180일이 대체 몇 개월이에요? 달력으로 6개월이면 되는 거 아닌가요?&quot;
      </p>
      <p style={body}>
        아니에요. 달력상 6개월하고는 다른 개념이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제40조</a>에 따르면 피보험기간은 고용보험에 가입된 기간 중 <strong>보수가 지급된 날</strong>만 세거든요.
        유급휴일은 포함되지만, 무급휴일은 빠지죠.
      </p>
      <p style={body}>
        주 5일제 기준으로 한 달에 약 <strong>24~26일</strong>이 쌓여요. 이 속도라면 180일을 채우려면 최소 <strong>7~9개월</strong>은 일해야 해요.
        6개월 딱 채우고 퇴직하면 180일에 못 미칠 가능성이 높죠.
        아래에서 정확한 계산법과 확인 방법, 합산 조건까지 순서대로 정리해뒀어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 피보험기간이 뭔지 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>피보험기간 근무일수, 정확히 뭘 세는 건가요?</H2>
      <p style={body}>
        피보험기간은 <strong>고용보험에 가입된 채로 보수를 받은 날수</strong>예요.
        회사에 다니면서 월급을 받고, 고용보험료를 낸 기간이 곧 피보험기간이죠.
        &quot;재직 기간&quot;이랑 같다고 생각하기 쉬운데, 보수가 지급되지 않은 <a href="/w/무급휴무일-180일-미달" style={{ color: "#1D9E75", textDecoration: "underline" }}>무급일</a>은 빠지니까 재직 기간보다 짧을 수 있죠.
      </p>
      <p style={body}>
        실업급여를 받으려면 퇴직 전 18개월 동안 피보험기간이 <strong>180일 이상</strong>이어야 해요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제40조</a>에 명시된 수급자격 요건이죠.
        180일이 안 되면 아무리 억울하게 잘렸어도 실업급여를 신청할 수 없어요.
      </p>
      <p style={body}>
        그래서 &quot;내가 지금 180일을 넘겼는지&quot;를 정확히 아는 게 중요해요.
        달력상 6개월과 피보험기간 180일은 같은 게 아니니까요.
        본인이 직접 계산하거나 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 조회하면 정확한 일수가 나와요.
      </p>

      <GreenBox title="피보험기간 핵심 정리">
        <p style={{ margin: "0 0 4px" }}>고용보험 가입 상태에서 보수가 지급된 날수 = 피보험기간</p>
        <p style={{ margin: "0 0 4px" }}>퇴직 전 18개월 내 180일 이상이어야 수급자격 충족</p>
        <p style={{ margin: 0 }}>달력 기준이 아니라 실제 근무일 + 유급휴일 기준</p>
      </GreenBox>

      <SectionBadge>내 조건 확인해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="180일 충족 여부를 확인할 준비가 됐어요. 고용24에서 정확한 일수를 조회해보세요."
        partialMatchText="일부 항목이 확인되지 않았어요. 해당 항목을 먼저 챙겨보세요."
      />

      <Divider />

      {/* 섹션 2: 계산 방법 + BorderBox + Calculator */}
      <H2>180일은 실제로 몇 개월 걸리나요?</H2>
      <p style={body}>
        먼저 포함되는 날과 빠지는 날을 구분해야 해요.
        <strong>포함</strong>: 실제 출근일, 유급 주휴일(보통 일요일), 유급 연차휴가.
        <strong>제외</strong>: 무급휴일, 무급휴가, 결근일.
        이 구분이 180일 계산의 출발점이에요.
      </p>
      <p style={body}>
        주 5일제 직장을 예로 들어볼게요. 월~금 출근하면 주 5일이죠.
        여기에 유급 주휴일(일요일)이 추가되면 한 주에 6일이 <a href="/w/실업급여-피보험단위기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험단위기간</a>으로 잡혀요.
        토요일은 대부분 무급이라 빠지고요. 한 달이면 약 <strong>24~26일</strong> 정도가 쌓이는 셈이에요.
      </p>
      <p style={body}>
        그러면 180일은 몇 개월일까요?
        월 26일 기준이면 180 / 26 = 약 <strong>6.9개월</strong>이에요.
        월 24일 기준이면 180 / 24 = <strong>7.5개월</strong>이죠.
        넉넉하게 잡으면 <strong>8~9개월</strong>을 근무해야 안전하게 180일을 넘기죠.
        6개월 딱 채우고 나오면 아슬아슬하거나 모자랄 확률이 높죠.
      </p>

      <BorderBox title="주 5일 근무 기준 계산 예시">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>월~금 출근 5일 + 유급 주휴일 1일 = 주 6일</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>한 달(4.3주) 약 24~26일 적립</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>180일 / 26일 = 약 7개월</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>180일 / 24일 = 약 7.5개월</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>여유 있게 8~9개월이면 확실</p>
      </BorderBox>

      <Calculator
        title="내 피보험기간 간편 계산기"
        sliders={[
          {
            id: "months",
            label: "총 근무 개월",
            min: 1,
            max: 24,
            step: 1,
            defaultValue: 8,
            format: (v: number) => `${v}개월`,
          },
          {
            id: "daysPerMonth",
            label: "월평균 근무일 (유급휴일 포함)",
            min: 15,
            max: 25,
            step: 1,
            defaultValue: 24,
            format: (v: number) => `${v}일`,
          },
        ]}
        results={[
          {
            label: "예상 피보험단위기간",
            getValue: (inp: Record<string, number>) => inp.months * inp.daysPerMonth,
            format: (v: number) => `${v}일`,
            highlight: true,
          },
          {
            label: "180일 충족 여부",
            getValue: (inp: Record<string, number>) => inp.months * inp.daysPerMonth >= 180 ? 1 : 0,
            format: (v: number) => v >= 1 ? "충족" : "미달",
          },
        ]}
        note="실제 피보험기간은 고용24에서 정확히 조회할 수 있어요. 이 계산기는 대략적인 추정치예요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 확인 방법 + SectionBadge + Checklist */}
      <H2>내 피보험기간 근무일수 확인하는 곳</H2>
      <p style={body}>
        가장 정확한 방법은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>(www.ei.go.kr)에 로그인해서 조회하는 거예요.
        개인서비스 메뉴에서 <strong>피보험자격 이력내역</strong>을 클릭하면 직장별 피보험기간이 전부 나오죠.
        언제부터 언제까지 가입됐고, 총 며칠인지 한 화면에서 볼 수 있죠.
      </p>
      <p style={body}>
        <a href="https://www.4insure.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대사회보험포털</a>(www.4insure.or.kr)에서도 고용보험 가입 이력 조회가 가능해요.
        공인인증서나 간편인증으로 로그인하면 되죠.
        온라인 조회가 어렵다면 가까운 고용센터를 방문하거나 <strong>1350</strong>으로 전화하면 담당자가 바로 안내해줘요.
      </p>
      <p style={body}>
        조회할 때 하나 주의할 점이 있죠. 사업주가 고용보험 취득신고를 안 했으면 시스템에 기록 자체가 안 나올 수 있으니까요.
        분명히 다녔는데 기록이 안 보인다면 사업주가 신고를 누락한 거예요.
        이 경우 고용센터에 <strong>피보험자격 확인 청구</strong>를 하면 소급 등록이 가능하죠.
      </p>

      <SectionBadge>고용24 조회 경로</SectionBadge>
      <Checklist items={[
        "고용24(ei.go.kr) 접속 후 로그인",
        "개인서비스 메뉴 클릭",
        "피보험자격 이력내역 조회",
        "직장별 피보험기간·총 일수 확인",
      ]} />

      <Divider />

      {/* 섹션 4: 여러 직장 합산 */}
      <H2>여러 직장 근무일수를 합산하는 계산 방법</H2>
      <p style={body}>
        한 직장에서 180일을 다 못 채웠다고 포기할 필요 없어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 <strong>이전 직장과 현재 직장의 피보험기간을 합산</strong>할 수 있으니까요.
        A회사에서 100일, B회사에서 90일 일했으면 합쳐서 190일이 되니까 180일 요건을 충족하는 거예요.
      </p>
      <p style={body}>
        다만 조건이 하나 붙어요. 이전 퇴직 때 <strong>실업급여를 받지 않았어야</strong> 해요.
        실업급여를 한 번이라도 수급하면 그 이전 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a>이 전부 리셋되죠.
        새로 취업한 시점부터 0일에서 다시 쌓아야 하는 거예요.
        그래서 실업급여를 받은 이력이 있다면 &quot;마지막 수급 이후&quot; 기간만 카운트돼요.
      </p>
      <p style={body}>
        합산 여부가 헷갈리면 고용24에서 직접 조회하는 게 제일 정확해요.
        피보험자격 이력내역에 이전 직장 기록이 전부 나오고, 실업급여 수급 이력도 같이 표시되죠.
        전화가 편하다면 고용센터(1350)에 &quot;이전 직장 기간이 합산되는지&quot; 한마디만 물어보면 돼요.
      </p>

      <BorderBox title="합산 가능 vs 불가능">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9 }}>A회사 100일 + B회사 90일 = 190일 (실업급여 미수급 시 합산 가능)</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>실업급여 수급 후 재취업 = 이전 기간 리셋, 0일부터 다시 시작</p>
      </BorderBox>

      <Divider />

      {/* 섹션 5: 부족할 때 대처 */}
      <H2>180일이 안 되면 계산 방법부터 다시 점검하세요</H2>
      <p style={body}>
        합산까지 해봤는데도 180일이 안 되면 실업급여 수급자격이 없어요.
        이때 선택지는 두 가지예요. 첫째, <strong>추가로 일해서 180일을 채우는 방법</strong>이에요.
        단기 알바라도 고용보험에 가입되기만 하면 피보험기간이 계속 쌓이니까요.
      </p>
      <p style={body}>
        일용직도 방법이 돼요. 건설현장이나 물류센터에서 일용직으로 일하면 출근한 날수만큼 피보험기간이 올라가죠.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 <strong>일용근로내역</strong>을 조회하면 본인의 일용직 기록을 바로 볼 수 있죠.
        생각보다 기록이 쌓여 있는 경우도 많으니 한번 살펴보세요.
      </p>
      <p style={body}>
        둘째, 실업급여 대상이 아니라면 <strong>국민취업지원제도</strong>를 알아보세요.
        구직촉진수당으로 월 50만원씩 최대 6개월 받을 수 있죠.
        실업급여랑 중복은 안 되지만, 피보험기간이 부족해서 실업급여를 못 받는 분에겐 현실적인 대안이 되죠.
      </p>

      <GreenBox title="180일 부족할 때 대안">
        <p style={{ margin: "0 0 4px" }}>1. 추가 근무로 피보험기간 채우기 (일용직, 단기 알바 포함)</p>
        <p style={{ margin: 0 }}>2. 국민취업지원제도 구직촉진수당 (월 50만원, 최대 6개월)</p>
      </GreenBox>

      <Divider />

      {/* FAQ (5개) */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        피보험기간 근무일수 계산을 놓고 가장 자주 들어오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개인별 피보험기간은 고용24에서 조회하거나 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
