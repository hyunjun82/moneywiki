"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "근로계약서에 근무일·유급휴일이 명시돼 있어요" },
  { id: "c2", label: "유급휴일과 무급휴일을 구분할 수 있어요 (토요일이 유급인지 무급인지)" },
  { id: "c3", label: "고용24(ei.go.kr)에서 피보험단위기간을 조회했어요" },
  { id: "c4", label: "퇴직 전 18개월 내 피보험단위기간이 180일 이상이에요" },
];

const CALC_SLIDERS = [
  { id: "months", label: "근무 개월 수", min: 1, max: 24, step: 1, defaultValue: 7, format: (v: number) => `${v}개월` },
  { id: "daysPerMonth", label: "월평균 근무일수 (유급휴일 포함)", min: 15, max: 25, step: 1, defaultValue: 22, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "피보험단위기간 예상일수",
    getValue: (v: Record<string, number>) => v.months * v.daysPerMonth,
    format: (v: number) => `약 ${v}일`,
    highlight: true,
  },
  {
    label: "180일 충족 여부",
    getValue: (v: Record<string, number>) => v.months * v.daysPerMonth >= 180 ? 1 : 0,
    format: (v: number) => v >= 1 ? "충족" : "미달",
  },
];

const CHECKLIST = [
  "근로계약서에서 유급·무급휴일 구분 확인",
  "토요일이 유급인지 무급인지 체크 (무급이면 피보험단위기간에서 제외)",
  "고용24 로그인 → 개인서비스 → 고용보험 가입이력 조회",
  "직장별 적립 일수 확인 + 합산 결과 확인",
  "180일 미달이면 추가 근무 기간 계산해서 퇴직 시점 조정",
];

const FAQS = [
  {
    q: "6개월 다녔는데 180일이 안 돼요. 왜 그런 건가요?",
    a: "달력 기준이 아니라 실제 근무일 + 유급휴일 기준이에요. 주 5일 근무면 6개월에 약 156일 정도밖에 안 되죠. 토요일이 무급이면 유급휴일까지 합쳐도 170일 전후에 그칠 수 있어요.",
  },
  {
    q: "피보험단위기간이랑 피보험기간은 같은 건가요?",
    a: "이름이 비슷하지만 쓰임이 달라요. 피보험단위기간은 수급자격(180일) 판단에 쓰이고, 피보험기간은 소정급여일수(얼마나 오래 받을 수 있는지) 결정에 쓰이죠.",
  },
  {
    q: "여러 직장에서 일한 기간을 합칠 수 있나요?",
    a: "가능해요. A회사 100일 + B회사 90일 = 190일로 합산돼요. 단, 퇴직 전 18개월 이내여야 하고, 중간에 실업급여를 수급했으면 그 이전 기간은 빠지죠.",
  },
  {
    q: "일용직도 같은 방식으로 계산하나요?",
    a: "일용직은 실제 출근한 날만 피보험단위기간에 잡혀요. 주말이나 공휴일이 유급이 아니니까요. 건설 일용직은 한 달에 15~20일 정도만 적립되는 경우가 많아요.",
  },
  {
    q: "연차를 사용하면 피보험단위기간에 포함되나요?",
    a: "포함돼요. 연차는 유급휴가이기 때문에 피보험단위기간에 그대로 산입되죠. 병가도 유급이면 포함되고, 무급이면 제외돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제41조 — 피보험단위기간 정의 및 수급자격 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 피보험단위기간 조회·실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 고용보험 상담(1350)", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간과 소정급여일수",
    description: "피보험기간이 길수록 실업급여를 오래 받을 수 있어요.",
  },
  {
    slug: "무급휴무일-180일-미달",
    title: "무급휴무일 때문에 180일 미달되는 경우",
    description: "토요일이 무급이면 피보험단위기간이 줄어드는 이유를 정리했어요.",
  },
  {
    slug: "피보험기간-근무일수-계산-방법",
    title: "피보험기간 근무일수 계산 방법",
    description: "피보험기간과 근무일수가 어떻게 연결되는지 정리했어요.",
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
          currentSlug="실업급여-피보험단위기간"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 피보험단위기간</p>

      {/* h1 — 2줄 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        피보험단위기간 180일 계산, 어떻게?<br />
        유급·무급 포함 기준
      </h1>

      {/* intro — 숫자 + 법령 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        고용24에서 실업급여를 조회했더니 &quot;피보험단위기간&quot;이 나왔어요.
        분명 6개월 넘게 다녔는데, 180일이 안 된다고요?<br /><br />
        피보험단위기간은 <strong>달력 날짜가 아니라 실제 근무일과 유급휴일을 합친 일수</strong>예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법 제41조</a>에서
        이 일수가 <strong>180일 이상</strong>이어야 실업급여 수급자격이 생긴다고 정하고 있죠.
        주 5일 근무(토요 무급) 기준으로 180일을 채우려면 <strong>약 7개월</strong>이 필요해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 피보험단위기간이란 + GreenBox + SectionBadge + EligibilityChecker */}
      <H2>유급과 무급, 포함 기준이 어떻게 다른가요?</H2>
      <p style={body}>
        고용보험에 가입한 기간 전체를 세는 게 아니에요. <strong>실제로 일한 날(출근일)</strong>과 <strong>유급휴일</strong>만 더해요. 유급휴일이란 출근하지 않아도 임금이 지급되는 날을 말하죠. 일요일(주휴일), 근로자의날, 연차 사용일이 대표적이에요.
      </p>
      <p style={body}>
        반대로 무급휴일과 결근일은 빠져요. 주 5일 근무 회사에서 토요일이 무급이면 그 토요일은 피보험단위기간에 포함 안 되죠. 이게 바로 &quot;6개월 일했는데 왜 180일이 안 되지?&quot;의 핵심 원인이에요.
      </p>
      <p style={body}>
        정리하면, 피보험단위기간 = <strong>출근일 + 유급휴일(주휴일·공휴일·연차)</strong>이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제41조</a>에 명시된 기준이죠. 달력상 6개월이 지나도 무급일이 많으면 180일에 못 미칠 수 있어요.
      </p>

      <GreenBox title="포함 vs 제외 한눈에 보기">
        <strong>포함</strong>: 출근일, 유급휴일(일요일·공휴일), 연차휴가, 유급병가<br />
        <strong>제외</strong>: 무급휴일(무급 토요일 등), 결근일, 무급휴직 기간
      </GreenBox>

      <SectionBadge>내 수급자격을 체크해 보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="수급자격 조건을 충족했을 가능성이 높아요!"
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인해 보세요."
      />

      <Divider />

      {/* 섹션 2 — 실제 계산 예시 + BorderBox + Calculator */}
      <H2>주 5일 근무하면 한 달에 며칠이 포함되나요?</H2>
      <p style={body}>
        주 5일 근무자 기준으로 따져볼게요. 한 달 근무일은 약 22일이에요. 여기에 주휴일(일요일) 4~5일이 유급으로 더해지면 한 달 적립량은 <strong>26~27일</strong> 정도가 되죠. 토요일이 무급이면 빠지니까 30일이 통째로 인정되는 건 아니에요.
      </p>
      <p style={body}>
        이 기준으로 따지면 180일을 채우려면 <strong>약 7개월</strong>이 필요해요. 6개월(26일 x 6 = 156일)로는 부족하죠. 연차를 사용하면 유급 처리되니 일수가 조금 더 올라갈 수 있지만, 큰 차이는 아니에요.
      </p>
      <p style={body}>
        반면 1년(12개월) 이상 근무했다면 걱정할 필요 없어요. 26일 x 12 = 312일이니 180일을 훌쩍 넘기죠. 문제가 되는 건 <strong>6~9개월 사이 퇴직</strong>하는 경우예요. 이 구간이 가장 애매하니까 퇴직 전에 반드시 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 조회해보세요.
      </p>

      <BorderBox title="월별 적립 추정 (주 5일·토요 무급 기준)">
        6개월 → 약 156일 (180일 미달)<br />
        7개월 → 약 182일 (180일 충족)<br />
        9개월 → 약 234일<br />
        12개월 → 약 312일
      </BorderBox>

      <Calculator
        title="내 피보험단위기간 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="유급휴일 포함 기준이에요. 회사마다 유급휴일이 다르니 근로계약서를 확인하세요."
      />

      {/* 섹션 2 끝 → 버튼 + 관련 글 */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 특수 케이스 + SectionBadge + Checklist */}
      <H2>일용직·단시간 근로자의 유급·무급 포함 기준</H2>
      <p style={body}>
        일용직은 출근한 날만 피보험단위기간에 잡혀요. 일반 근로자처럼 주휴일이 유급으로 인정되는 게 아니니까요. 건설 일용직을 예로 들면, 한 달에 15~20일 정도 출근하니 적립되는 일수도 딱 그만큼이에요. 180일을 채우려면 최소 9~12개월은 걸리죠.
      </p>
      <p style={body}>
        단시간 근로자(주 15시간 미만)는 시간을 일(日)로 환산하는 방식을 써요. 8시간을 1일로 보는 거죠. 하루 4시간씩 주 3일 일하면, 하루 근무가 0.5일로 환산되는 셈이에요. 이런 분들은 적립 속도가 느리니 180일 채우는 데 시간이 더 오래 걸려요.
      </p>
      <p style={body}>
        여러 직장을 다닌 경우엔 합산이 가능하다는 점도 기억하세요. A회사에서 100일, B회사에서 90일 적립했으면 합산 190일로 수급자격을 충족해요. 다만 <strong>퇴직 전 18개월 이내</strong>에 적립한 기간만 인정되고, 중간에 실업급여를 이미 받았으면 그 이전은 빠지죠.
      </p>

      <SectionBadge>피보험단위기간 확인 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 확인 방법 */}
      <H2>내 피보험단위기간 포함 일수 확인하는 곳</H2>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24(ei.go.kr)</a>에서 바로 확인할 수 있어요. 로그인하면 직장별로 며칠이 적립됐는지 상세하게 나오죠. 여러 직장을 다닌 분이라면 합산 결과도 같이 볼 수 있어서 편리해요.
      </p>
      <p style={body}>
        만약 적립 일수가 실제 근무 기간과 차이가 크다면 회사에서 고용보험 신고를 제대로 안 한 경우일 수 있어요. 이럴 땐 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부(1350)</a>에 상담 전화를 해서 확인을 요청하세요. 사업주가 누락 신고한 기간은 소급 적용받을 수 있죠.
      </p>
      <p style={body}>
        퇴직 전에 미리 조회해보는 게 좋아요. 180일이 아슬아슬하면 한두 달 더 근무해서 확실히 채우는 전략도 가능하니까요. 퇴직한 뒤에 &quot;몇 일 모자라요&quot;라고 하면 돌이킬 수 없죠.
      </p>

      <Divider />

      {/* 섹션 5 — 180일 미달 시 대처 + 개념 비교 */}
      <H2>180일 미달이면 유급·무급 기준부터 점검하세요</H2>
      <p style={body}>
        안타깝지만 피보험단위기간 180일은 <strong>실업급여 수급자격의 최소 요건</strong>이에요. 이걸 못 채우면 실업급여 자체를 신청할 수 없죠. 그래서 퇴직 전에 미리 확인하는 게 중요해요. 150일 정도 쌓였다면 한 달만 더 다니면 넘길 수 있으니까요.
      </p>
      <p style={body}>
        이전 직장이 있다면 합산을 시도해보세요. 현 직장에서 120일이고 전 직장에서 70일 쌓였다면 합산 190일로 자격이 생겨요. 다만 중간에 실업급여를 받았으면 그 이전 직장 기간은 빠진다는 점을 꼭 확인하세요.
      </p>
      <p style={body}>
        피보험단위기간과 헷갈리기 쉬운 게 <strong>피보험기간</strong>이에요. 피보험기간은 고용보험에 가입돼 있던 총 기간(달력 기준)이고, 소정급여일수(실업급여를 얼마나 오래 받을 수 있는지)를 결정하는 데 쓰이죠. 두 개념을 혼동하면 계산이 완전히 어긋나니 구분해두세요.
      </p>

      <GreenBox title="피보험단위기간 vs 피보험기간">
        <strong>피보험단위기간</strong>: 실제 근무일 + 유급휴일 → 수급자격 판단 (180일)<br />
        <strong>피보험기간</strong>: 고용보험 가입 총 기간 → 소정급여일수 결정 (1년/3년/5년/10년 구간)
      </GreenBox>

      <Divider />

      {/* FAQ — 5개 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        피보험단위기간에 대해 실제로 많이 궁금해하시는 내용만 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* References + Disclaimer */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사안은 고용센터 판단에 따라 달라질 수 있으니, 정확한 확인은 고용24(ei.go.kr) 조회 또는 고용센터(1350) 상담을 이용하세요." />
    </ArticleLayout>
  );
}
