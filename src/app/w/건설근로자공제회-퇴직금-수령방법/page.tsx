"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "건설업에서 일용·임시직으로 일한 경험이 있어요" },
  { id: "c2", label: "건설근로자공제회에 가입된 사업장에서 근무했어요" },
  { id: "c3", label: "퇴직공제 적립일수가 252일 이상이에요" },
  { id: "c4", label: "건설업 현장을 완전히 떠났거나 65세 이상이에요" },
];

const CALC_SLIDERS = [
  { id: "days", label: "적립 일수", min: 252, max: 3000, step: 10, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}일` },
  { id: "unit", label: "1일 공제금액 (원)", min: 5000, max: 15000, step: 1000, defaultValue: 8300, format: (v: number) => `${v.toLocaleString()}원` },
];

const CALC_RESULTS = [
  {
    label: "퇴직공제금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.days * v.unit),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 (세전 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.days * v.unit * 0.06),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (근속에 따라 다름)`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "퇴직공제금 청구서", required: true, where: "공제회 홈페이지 또는 방문 수령" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "건강보험 자격상실 확인서 (해당자)", required: false, where: "국민건강보험공단" },
];

const STEPS = [
  {
    title: "적립일수 확인",
    desc: "252일 이상이어야 퇴직공제금을 받을 수 있어요. 여러 현장의 적립일수는 합산돼요.",
    tip: "앱에서 바로 확인 가능: 적립내역도 현장별로 볼 수 있어요",
    link: { label: "적립일수 조회하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR090M00" },
  },
  {
    title: "청구 자격 확인",
    desc: "건설업을 완전히 그만뒀거나, 만 65세 이상이거나, 사망·장해 등의 사유가 있어야 청구할 수 있어요. 건설업을 계속하면서 청구할 수는 없어요.",
    tip: "65세 이상은 현장 근무 중이어도 청구 가능해요",
  },
  {
    title: "온라인 또는 방문 청구",
    desc: "전국 지부를 방문하거나 온라인으로 청구해요. 신분증, 청구서, 통장 사본이 필요해요. 청구 후 보통 5~10일 내에 입금돼요.",
    tip: "온라인 청구가 가장 빠르고 편해요",
    link: { label: "온라인 청구하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR130M00" },
  },
  {
    title: "세금 납부 및 수령",
    desc: "퇴직공제금에도 퇴직소득세가 부과돼요. 근속기간이 길수록 세금 공제 효과가 커요. IRP로 이전하면 과세 이연(세금 나중에 납부)이 가능해요.",
    tip: "252일 미만이면 퇴직공제금이 아닌 '반환금'으로 소액만 받아요",
  },
];

const CHECKLIST = [
  "적립일수 252일 이상: 공제회 앱·홈페이지에서 확인",
  "청구 자격: 건설업 완전 종료 또는 65세 이상",
  "신분증·통장 사본: 본인 명의 필수",
  "온라인 또는 방문 청구: 5~10일 내 입금",
  "IRP 이전: 퇴직소득세 과세 이연 가능",
];

const FAQS = [
  {
    q: "여러 건설 현장에서 일했는데 적립일수가 합산되나요?",
    a: "맞아요. 공제회에 가입된 사업장에서 근무한 일수는 모두 합산돼요. 현장이 달라도 전체 적립일수로 퇴직공제금이 계산돼요.",
  },
  {
    q: "252일이 안 되면 어떻게 되나요?",
    a: "퇴직공제금 수급 자격이 안 돼서 납입된 금액의 일부가 '반환금'으로 돌아와요. 금액이 적어서 사실상 손실에 가까워요. 252일을 채우는 게 중요해요.",
  },
  {
    q: "건설근로자공제회 퇴직금과 일반 퇴직금이 다른가요?",
    a: "다를 수 있어요. 공제회 퇴직공제금은 건설 일용·임시직을 위한 별도 제도예요. 1년 이상 같은 사업장에서 일했다면 일반 퇴직금도 별도로 받을 수 있어요.",
  },
  {
    q: "퇴직공제금을 IRP 계좌로 받을 수 있나요?",
    a: "가능해요. IRP로 이전하면 수령 시점까지 퇴직소득세를 내지 않아요(과세 이연). 나중에 연금으로 받으면 세율이 낮아져서 유리해요.",
  },
  {
    q: "65세 이전에 건설업을 계속하면서 청구할 수 있나요?",
    a: "안 돼요. 65세 미만이라면 건설업에서 완전히 나와야 청구할 수 있어요. 65세 이상은 현장 근무 중이어도 청구 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "건설근로자의 고용개선 등에 관한 법률: 퇴직공제 제도", url: "https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "건설근로자공제회: 퇴직공제금 청구 안내", url: "https://www.cw.or.kr" },
      { label: "고용노동부: 건설근로자 퇴직공제 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금-지급기준", title: "일용직 퇴직금 지급 기준", description: "계속 근로 인정 조건과 청구 방법." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 전체 정리", description: "일시금·연금·IRP 이전 절차까지." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="건설근로자공제회-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 건설근로자 · 퇴직공제금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건설근로자공제회 퇴직금, 어떻게 받나요?<br />
        적립일수 확인부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건설 현장에서 일용·임시직으로 일했다면 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a> 대신 건설근로자공제회의 퇴직공제금을 받을 수 있어요.
        적립일수 252일 이상이 기본 조건이에요.
        공제회에 가입된 현장에서 일한 날이 쌓이면 퇴직 후 신청할 수 있고, 여러 현장의 일수도 합산돼요.
        온라인으로 5분이면 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직공제금, 내가 받을 수 있나요?</H2>
      <p style={body}>
        건설근로자공제회는 건설 현장에서 일하는 일용·임시직 근로자를 위한 퇴직금 제도예요.
        공제회에 가입된 사업장에서 일하면 사업주가 매일 공제부금을 납부하고, 그 금액이 적립돼요.
        적립일수가 252일 이상이 되면 퇴직 후 퇴직공제금을 청구할 수 있어요.
      </p>
      <p style={body}>
        252일 미만이면 퇴직공제금 대신 소액의 반환금만 돌아와요.
        현장이 여러 개였다면 전체 적립일수를 합산해서 확인하세요.
        공제회 앱이나 홈페이지(cw.or.kr)에서 바로 확인할 수 있어요.
      </p>

      <GreenBox title="퇴직공제금 수급 조건">
        적립일수 252일 이상 (여러 현장 합산)<br />
        건설업 완전 종료 또는 만 65세 이상<br />
        사망·장해·외국인 출국 시 예외 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직공제금 청구 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건이 다를 수 있어요. 건설근로자공제회(1588-0641) 상담을 권해요."
      />

      <Divider />

      <H2>적립일수로 퇴직공제금 예상 계산</H2>
      <p style={body}>
        퇴직공제금은 적립일수 × 1일 공제금액으로 계산해요.
        2024년 기준 1일 공제금액은 8,300원이에요.
        슬라이더로 내 적립일수와 공제금액을 조정하면 예상 금액을 확인할 수 있어요.
      </p>

      <SectionBadge>퇴직공제금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 적립일수 × 1일 공제금액 기준. 퇴직소득세는 근속기간에 따라 다르며, IRP 이전 시 과세 이연 가능."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        온라인 청구 시에는 신분증과 통장 사본만 있으면 돼요.
        방문 청구라면 청구서를 직접 작성해야 해요.
        공제회 홈페이지에서 청구서 양식을 내려받을 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직공제금 청구 절차 4단계</H2>
      <p style={body}>
        적립일수 확인부터 수령까지 보통 1~2주면 충분해요.
        온라인 청구가 가장 빠르고, 청구 후 5~10일 내에 입금돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 체크리스트</H2>
      <p style={body}>
        252일 미달이면 받을 금액이 크게 줄어요. 청구 전에 적립일수를 반드시 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="건설 현장 여러 곳에서 일했다면 합산해요">
        공제회에 가입된 현장이라면 어디서든 적립된 날수가 모두 합산돼요.
        공제회 앱에서 현장별 적립내역을 바로 확인할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        건설근로자공제회 퇴직공제금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 건설근로자의 고용개선 등에 관한 법률을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 건설근로자공제회(1588-0641)에서 확인하세요." />
    </ArticleLayout>
  );
}
