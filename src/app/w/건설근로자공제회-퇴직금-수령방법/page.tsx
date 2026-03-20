"use client";

// Q1. 건설 현장 일용직으로 수년간 일하다 그만뒀는데, 퇴직공제금이라는 걸 받을 수 있다고 들었지만
//     얼마인지·어떻게 신청하는지 전혀 모르는 상황
// Q2. 건설근로자공제회 퇴직공제금을 직접 신청해서 통장에 받는다
// Q3. 수급 자격(적립일수 252일 이상 + 건설업 완전 종료 or 65세), 예상 금액 계산법(적립일수 × 1일 공제금액),
//     청구 서류(신분증·통장사본), 4단계 청구 절차(온라인 5~10일), 세금 처리와 IRP 이전 선택
// Q4. EligibilityChecker(자격확인 먼저) + Calculator(금액 감 잡기) + Steps(청구 절차) +
//     DocTable(서류 목록) + Checklist(최종 점검) + FAQ(실전 질문)
//
// MAP:
// Q1 → 서론: 건설 일용직 퇴직금 존재 자체를 모르는 현실 공감
// Q2 → H2 순서: 자격확인 → 금액계산 → 서류준비 → 청구절차 → 세금처리 → 체크리스트
// Q3 → H2 6개 + FAQ 6개
// Q4 → EligibilityChecker, Calculator, DocTable, Steps, Checklist, FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "건설 현장에서 일용·임시직으로 일한 기간이 있죠" },
  { id: "c2", label: "건설근로자공제회에 가입된 사업장에서 일했죠" },
  { id: "c3", label: "퇴직공제 적립일수가 252일 이상이죠 (여러 현장 합산)" },
  { id: "c4", label: "건설업 현장을 완전히 떠났거나 만 65세 이상이죠" },
];

const CALC_SLIDERS = [
  {
    id: "days",
    label: "적립 일수",
    min: 252,
    max: 3000,
    step: 10,
    defaultValue: 500,
    format: (v: number) => `${v.toLocaleString()}일`,
  },
  {
    id: "unit",
    label: "1일 공제금액 (원)",
    min: 5000,
    max: 15000,
    step: 1000,
    defaultValue: 8300,
    format: (v: number) => `${v.toLocaleString()}원`,
  },
];

const CALC_RESULTS = [
  {
    label: "퇴직공제금 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.days * v.unit),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 추정 (세전 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.days * v.unit * 0.06),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (근속에 따라 다름)`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "퇴직공제금 청구서", required: true, where: "공제회 홈페이지 내려받기 또는 방문 수령" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "건강보험 자격상실 확인서 (해당자)", required: false, where: "국민건강보험공단" },
];

const STEPS = [
  {
    title: "적립일수 확인",
    desc: "252일 이상이어야 퇴직공제금을 받을 수 있고, 여러 현장의 적립일수는 모두 합산해요. 공제회 앱이나 홈페이지에서 현장별 내역도 바로 조회되죠.",
    tip: "앱에서 적립일수 + 현장별 내역 한 번에 조회 가능해요",
    link: { label: "적립일수 조회하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR090M00" },
  },
  {
    title: "청구 자격 확인",
    desc: "건설업을 완전히 그만뒀거나, 만 65세 이상이거나, 사망·장해·외국인 출국 같은 예외 사유가 있어야 청구할 수 있죠. 건설업을 계속하면서 청구할 수는 없어요.",
    tip: "65세 이상이라면 현장 근무 중이어도 청구 가능해요",
  },
  {
    title: "온라인 또는 방문 청구",
    desc: "전국 지부를 방문하거나 온라인으로 청구해요. 신분증, 청구서, 통장 사본만 준비하면 되고, 청구 후 보통 5~10일 내에 입금되죠.",
    tip: "온라인 청구가 가장 빠르고 편해요",
    link: { label: "온라인 청구하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR130M00" },
  },
  {
    title: "세금 납부 및 수령",
    desc: "퇴직공제금에도 퇴직소득세가 붙어요. 근속기간이 길수록 세금 공제 효과가 커지고, IRP로 이전하면 수령 시점까지 세금을 미룰 수 있죠(과세 이연).",
    tip: "252일 미만이면 퇴직공제금이 아닌 '반환금'으로 소액만 돌아와요",
  },
];

const CHECKLIST = [
  "적립일수 252일 이상: 공제회 앱·홈페이지에서 합산 일수 먼저 체크",
  "청구 자격: 건설업 완전 종료 또는 만 65세 이상인지 확인",
  "신분증·통장 사본: 반드시 본인 명의 통장 준비",
  "온라인 또는 방문 청구: 청구 후 5~10일 내 입금",
  "IRP 이전 여부: 퇴직소득세 과세 이연 가능한지 검토",
];

const FAQS = [
  {
    q: "여러 건설 현장에서 일했는데 적립일수가 합산되나요?",
    a: "그렇죠. 공제회에 가입된 사업장에서 근무한 일수는 현장이 달라도 전부 합산돼요. 공제회 앱에서 현장별 내역을 한 번에 조회할 수 있고요.",
  },
  {
    q: "252일이 안 되면 어떻게 되나요?",
    a: "퇴직공제금 수급 자격이 안 돼요. 납입된 금액의 일부가 '반환금'으로 돌아오긴 하는데, 금액이 적어서 사실상 손실에 가까워요. 252일을 채우는 게 중요하죠.",
  },
  {
    q: "건설근로자공제회 퇴직금과 일반 퇴직금이 다른가요?",
    a: "달라요. 공제회 퇴직공제금은 건설 일용·임시직을 위한 별도 제도이고, 1년 이상 같은 사업장에서 일했다면 일반 퇴직금도 별도로 받을 수 있죠.",
  },
  {
    q: "퇴직공제금을 IRP 계좌로 받을 수 있나요?",
    a: "가능해요. IRP로 이전하면 수령 시점까지 퇴직소득세를 내지 않아도 되죠(과세 이연). 나중에 연금으로 분할 수령하면 세율도 낮아지고요.",
  },
  {
    q: "65세 전에 건설업을 계속하면서 청구할 수 있나요?",
    a: "안 돼요. 65세 미만이라면 건설업에서 완전히 나와야 청구할 수 있고, 65세 이상은 현장 근무 중이어도 청구 가능하죠.",
  },
  {
    q: "퇴직공제금 신청 후 얼마나 걸려요?",
    a: "온라인 청구 기준으로 보통 5~10일 내에 입금돼요. 방문 청구도 비슷하고, 서류가 완전하면 더 빠르게 처리되기도 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      {
        label: "건설근로자의 고용개선 등에 관한 법률: 퇴직공제 제도",
        url: "https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률",
      },
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
  {
    slug: "일용직-퇴직금-지급기준",
    title: "일용직 퇴직금 지급 기준",
    description: "계속 근로 인정 조건과 청구 방법이에요.",
  },
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법 전체 정리",
    description: "일시금·연금·IRP 이전 절차까지 다뤄요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "IRP 계좌 개설 방법",
    description: "은행·증권사 비교부터 개설 절차까지예요.",
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
          highlightSlugs={퇴직금_HIGHLIGHT}
          currentSlug="건설근로자공제회-퇴직금-수령방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        퇴직금 · 건설근로자 · 퇴직공제금
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건설근로자공제회 퇴직금, 받을 수 있을까요?<br />
        자격 조건부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건설 현장 일용직으로 일하다 그만뒀는데, 퇴직공제금이라는 게 있다는 걸 뒤늦게 알게 되는 분이 많아요.
        건설근로자공제회는 일용·임시직을 위한 별도 퇴직금 제도이고, 공제회에 가입된 사업장에서 일한 날이 쌓이면 퇴직 후 신청할 수 있죠.{" "}
        <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>일반 퇴직금</a>과는 다른 제도이고,
        여러 현장의 적립일수가 합산돼서 252일 이상이면 청구 자격이 생기죠.
        온라인으로 5분이면 청구할 수 있고, 5~10일 내에 입금돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 자격확인 (공감형 시작) */}
      <H2>내가 퇴직공제금을 받을 수 있는 상황인가요?</H2>
      <p style={body}>
        건설근로자공제회 퇴직공제금은 누구나 받는 게 아니에요.
        공제회에 가입된 사업장에서 일용·임시직으로 일한 날이 252일 이상 쌓여야 청구 자격이 생기고,
        건설업을 완전히 그만뒀거나 만 65세 이상이어야 신청할 수 있죠.
      </p>
      <p style={body}>
        252일 미만이면 퇴직공제금 대신 소액의 반환금만 돌아와요.
        현장이 여러 곳이었다면 전체 적립일수를 합산해서 따져봐야 하고,
        공제회 앱이나 홈페이지에서 바로 조회되죠.
      </p>

      <GreenBox>
        적립일수 252일 이상 (여러 현장 합산)<br />
        건설업 완전 종료 또는 만 65세 이상<br />
        사망·장해·외국인 출국 시 예외 적용
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직공제금 청구 조건을 갖추고 있죠. 아래 계산기로 예상 금액을 먼저 봐요."
        partialMatchText="일부 조건이 다를 수 있죠. 건설근로자공제회(1588-0641) 상담을 권해요."
      />

      <Divider />

      {/* H2-2: 금액 계산 (숫자형 시작) */}
      <H2>적립일수로 퇴직공제금 예상 금액 계산</H2>
      <p style={body}>
        퇴직공제금은 적립일수 × 1일 공제금액으로 계산해요.
        2024년 기준 1일 공제금액은 8,300원이고, 예를 들어 500일이면 약 415만원이 되죠.
        슬라이더로 내 적립일수와 공제금액을 조정해봐요.
      </p>
      <p style={body}>
        여러 현장에서 쌓인 날수가 합산되기 때문에, 한 현장에서 오래 일하지 않았더라도
        전체 합산 일수가 기준이 돼요.
        일수가 많을수록 금액도 비례해서 커지는 구조이고요.
      </p>

      <SectionBadge>퇴직공제금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 적립일수 × 1일 공제금액 기준이에요. 퇴직소득세는 근속기간에 따라 다르며, IRP 이전 시 과세 이연도 가능해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3: 서류 준비 (경고형 시작) */}
      <H2>서류 3가지만 준비하면 돼요</H2>
      <p style={body}>
        온라인 청구라면 신분증과 통장 사본만 있으면 끝나요.
        방문 청구라면 청구서를 직접 작성해야 하는데, 공제회 홈페이지에서 양식을 내려받을 수 있죠.
        본인 명의 통장이 아니면 반려되니까 미리 확인해두는 게 좋죠.
      </p>
      <p style={body}>
        건강보험 자격상실 확인서는 건설업 종료를 증명해야 하는 일부 케이스에서 요구돼요.
        대부분의 경우에는 필요 없고, 담당자가 필요하다고 하면 그때 챙겨도 늦지 않아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 청구 절차 (순서형 시작) */}
      <H2>퇴직공제금 청구, 4단계로 끝나요</H2>
      <p style={body}>
        적립일수 조회부터 입금까지 보통 1~2주면 충분해요.
        온라인 청구가 가장 빠르고, 청구 후 5~10일 내에 통장으로 들어오죠.
        서류가 완전하면 더 빨리 처리되기도 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 세금과 IRP (반전형 시작) */}
      <H2>퇴직공제금에도 세금이 붙어요, IRP로 줄일 수 있고요</H2>
      <p style={body}>
        퇴직공제금도 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a> 과세 대상이에요.
        근속기간이 길수록 공제가 커져서 세금이 줄어드는 구조이고,
        금액이 적다면 세금이 거의 안 나오는 경우도 많죠.
      </p>
      <p style={body}>
        IRP(개인형 퇴직연금) 계좌로 이전하면 수령 시점까지 퇴직소득세를 미룰 수 있죠(과세 이연).
        55세 이후 연금으로 10년 이상 나눠 받으면 세금이 30~40% 줄어들고요.
        퇴직공제금이 클수록 IRP 이전 효과가 커지는 구조예요.
      </p>

      <BorderBox>
        퇴직공제금이 300만원 초과라면 IRP 계좌로 받는 것이 원칙이에요.
        IRP 계좌가 없다면 청구 전에 미리 개설해두는 게 이체 처리에 유리해요.
      </BorderBox>

      <Divider />

      {/* H2-6: 체크리스트 */}
      <H2>청구 전 최종 점검 5가지</H2>
      <p style={body}>
        252일 미달이면 받을 금액이 크게 줄어요. 청구 전에 적립일수를 먼저 체크하는 게 순서예요.
        아래 항목 중 빠진 게 있으면 청구가 지연되거나 반려될 수 있고요.
      </p>

      <SectionBadge>청구 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        공제회에 가입된 현장이라면 어디서든 적립된 날수가 모두 합산돼요.
        공제회 앱에서 현장별 적립내역을 바로 조회할 수 있고요.
      </GreenBox>

      <Divider />

      {/* H2-7: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        건설근로자공제회 퇴직공제금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 건설근로자의 고용개선 등에 관한 법률을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 건설근로자공제회(1588-0641)에서 직접 확인해봐요." />
    </ArticleLayout>
  );
}
