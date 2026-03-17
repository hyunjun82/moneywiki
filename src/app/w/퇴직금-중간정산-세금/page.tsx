"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "중간정산 금액",
    min: 500, max: 10000, step: 100, defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "당시 근속기간",
    min: 1, max: 30, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "퇴직소득세 추정",
    highlight: true,
    getValue: (v: Record<string, number>) =>
      Math.round(Math.max(0, v.amount * 10000 * 0.04 * (1 - Math.min(v.years, 20) * 0.02))),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "세후 수령액",
    getValue: (v: Record<string, number>) => {
      const tax = Math.round(Math.max(0, v.amount * 10000 * 0.04 * (1 - Math.min(v.years, 20) * 0.02)));
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const CHECK_ITEMS = [
  { id: "c1", label: "법정 허용 사유(주택구입·전세보증금·요양 등)에 해당해요" },
  { id: "c2", label: "무주택 세대주예요 (주택구입·전세 사유의 경우)" },
  { id: "c3", label: "회사가 중간정산 신청을 허용하고 있어요" },
  { id: "c4", label: "정산 후 근속기간이 리셋된다는 걸 알고 있어요" },
];

const DOCS = [
  { name: "근로계약서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "중간정산 신청서", required: true, where: "인사팀 양식 수령" },
  { name: "사유 증빙서류 (매매계약서 등)", required: true, where: "해당 기관" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "인사팀" },
  { name: "퇴직소득원천징수영수증", required: false, where: "정산 후 인사팀 발급" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "중간정산은 아무 때나 되는 게 아니에요. 무주택자 주택 구입, 전세보증금, 요양비 등 법에서 정한 사유가 있어야 해요. 이 조건이 없으면 회사가 허용해줘도 세금 혜택이 줄어요.",
    tip: "근로자퇴직급여보장법 시행령 제3조에 허용 사유 목록이 있어요",
  },
  {
    title: "세금 사전 계산",
    desc: "중간정산 금액과 근속기간으로 퇴직소득세가 얼마 나오는지 먼저 계산해보세요. 국세청 홈택스 '퇴직소득세 모의계산'이 가장 정확해요. 금액이 크다면 세무사 상담도 고려해봐요.",
    tip: "홈택스 → 세금신고 → 모의계산 → 퇴직소득세",
  },
  {
    title: "신청서·증빙서류 제출",
    desc: "인사팀에 중간정산 신청서와 사유 증빙서류를 제출해요. 주택 구입이면 매매계약서, 요양이면 의사 진단서 같은 식이에요. 서류 검토 후 회사에서 승인하면 정산이 진행돼요.",
    tip: "증빙서류 기준은 회사마다 다를 수 있어요",
  },
  {
    title: "퇴직소득세 원천징수 확인",
    desc: "정산금 지급 시 퇴직소득세가 미리 공제돼요. 지급 후 퇴직소득원천징수영수증을 꼭 받아두세요. 이 영수증은 나중에 최종 퇴직 시 세금 계산에도 필요해요.",
    tip: "영수증 없으면 나중에 재발급 요청 가능하지만, 받을 때 챙겨두는 게 편해요",
  },
];

const CHECKLIST = [
  "법정 허용 사유 해당 여부 먼저 확인",
  "홈택스에서 퇴직소득세 사전 계산",
  "정산 후 근속기간 리셋 인지 (이후 퇴직금은 정산일부터 계산)",
  "퇴직소득원천징수영수증 수령 및 보관",
  "최종 퇴직 시 중간정산분과 합산 세금 재계산 필요",
];

const FAQS = [
  {
    q: "중간정산을 받으면 퇴직소득세를 꼭 내야 하나요?",
    a: "맞아요. 중간정산도 퇴직으로 보기 때문에 퇴직소득세가 원천징수돼요. 다만 법정 허용 사유에 해당하면 세금 혜택이 그대로 유지돼요.",
  },
  {
    q: "중간정산 후 최종 퇴직 시 세금이 또 나오나요?",
    a: "나와요. 중간정산일부터 최종 퇴직일까지의 퇴직금에 별도로 퇴직소득세가 붙어요. 중간정산분과 나중 퇴직금은 각각 따로 계산해요.",
  },
  {
    q: "중간정산 금액이 작으면 세금이 0원일 수 있나요?",
    a: "가능해요. 근속연수공제 후 과세표준이 0이 되면 세금이 안 나와요. 근속기간이 짧고 금액이 작을수록 이런 경우가 생겨요.",
  },
  {
    q: "IRP로 중간정산을 받을 수 있나요?",
    a: "원칙적으로 중간정산은 IRP가 아닌 본인 계좌로 받아요. IRP는 퇴직 시 수령용이에요. 중간정산 세금은 바로 원천징수돼서 나와요.",
  },
  {
    q: "법정 사유 없이 중간정산하면 어떻게 되나요?",
    a: "세금 혜택이 줄어들 수 있어요. 근로자퇴직급여보장법 위반이 될 수도 있고요. 중간정산보다 퇴직 시 전액 받는 게 세금 면에서 유리한 경우가 많아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득세 과세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "고용노동부: 퇴직급여 중간정산 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "퇴직금 중간정산 조건",
    description: "법정 허용 사유 5가지와 신청 절차를 정리했어요.",
  },
  {
    slug: "퇴직금-소득세",
    title: "퇴직금 소득세 계산 방법",
    description: "퇴직소득세 공식과 근속연수공제를 설명해요.",
  },
  {
    slug: "퇴직금-중간정산-후-퇴직금-계산",
    title: "중간정산 후 퇴직금 계산법",
    description: "재근속 기간 기준 계산 방법과 세금 처리예요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 세금, 얼마나 나오나요?<br />
        퇴직소득세 계산부터 주의사항까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 중간정산을 받으면 <strong>퇴직소득세</strong>가 원천징수돼요. 최종 퇴직이 아니어도 세금을 내는 구조예요.
        세금이 얼마인지 모르고 받으면 예상보다 적게 들어와서 당황하는 분들이 많아요.
        계산 방법과 <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>법정 허용 사유</a>, 주의사항을 미리 파악해두면 손해가 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 받을 수 있는 조건인가요?</H2>
      <p style={body}>
        중간정산은 아무 때나 신청할 수 있는 게 아니에요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에서
        허용하는 사유가 있어야 해요. 대표적으로 무주택자 주택 구입, 전세보증금, 요양비, 파산·회생이에요.
      </p>
      <p style={body}>
        법정 사유 없이 중간정산을 받으면 회사도 법을 위반하는 거예요. 세금 혜택도 줄어들 수 있어요.
        신청 전에 내 사유가 여기 해당하는지 먼저 확인해야 해요.
      </p>

      <SectionBadge>중간정산 신청 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청이 가능한 조건이에요. 아래 세금 계산기로 예상 세금을 확인해보세요."
        partialMatchText="조건이 일부 맞지 않아요. 고용노동부(1350)에 먼저 상담해보세요."
      />

      <Divider />

      <H2>중간정산 세금, 얼마나 나오나요?</H2>
      <p style={body}>
        중간정산도 퇴직소득세 기준을 그대로 적용해요. 정산금액과 당시 근속기간으로 세금이 결정돼요.
        근속기간이 짧을수록 근속연수공제가 적어서 세금이 상대적으로 높게 나와요.
      </p>
      <p style={body}>
        정확한 계산은 국세청 홈택스 '퇴직소득세 모의계산'을 쓰세요. 아래 계산기는 어느 정도인지 감 잡는 용도예요.
        공제 적용 방식이 단순화돼 있어서 실제 세금과 차이가 날 수 있어요.
      </p>

      <SectionBadge>중간정산 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세 추정치. 근속연수공제·환산급여공제 반영 정확 계산은 국세청 홈택스 이용."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        사유에 따라 증빙서류가 달라요. 주택 구입이면 매매계약서, 전세면 임대차계약서가 필요해요.
        서류를 갖추고 인사팀에 신청하면 회사가 검토 후 정산을 진행해요.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 정산 후 인사팀에서 받을 수 있어요. 나중에 최종 퇴직 시 세금 계산에도 쓰이니
        꼭 챙겨두세요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>중간정산 신청 절차 4단계</H2>
      <p style={body}>
        신청 전에 세금을 미리 계산해보는 게 중요해요. 생각보다 세금이 많으면 중간정산보다 퇴직 시 한 번에 받는 게 유리할 수 있어요.
        절차를 순서대로 따라가면 빠짐없이 처리할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>중간정산 전 꼭 확인할 것들</H2>
      <p style={body}>
        가장 중요한 건 <strong>근속기간 리셋</strong>이에요. 중간정산 후에는 그날부터 다시 1년을 채워야 퇴직금이 쌓여요.
        5년 근무하고 중간정산을 받으면 이후 1년 미만 퇴직 시 퇴직금이 없어요.
      </p>
      <p style={body}>
        세금도 두 번 나와요. 중간정산 시 한 번, 최종 퇴직 시 또 한 번이에요. 이 점을 모르고 중간정산하면
        나중에 당황할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="중간정산보다 유리한 경우가 있어요">
        목돈이 급하지 않다면 퇴직 시 한 번에 받는 게 세금 면에서 유리해요.
        근속기간이 길수록 근속연수공제가 커져서 최종 퇴직 시 세금이 더 적어요.
        IRP 연금 수령 시 추가 30% 절세도 가능해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율·공제 한도 변경이 있을 수 있으니 최신 기준은 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
