"use client";
// Q1. 중간정산을 신청하려는데 세금이 얼마나 빠져나갈지 몰라서 실제 수령액이 걱정되는 재직자 상황
// Q2. 세금 계산 후 중간정산 신청 여부를 결정한다
// Q3. 퇴직소득세 계산 공식(근속연수공제→환산급여공제→기본세율), 근속기간 리셋 불이익, IRP 과세이연 불가, 원천징수 타이밍
// Q4. 계산기(세금 추정) + 순서도(절차) + DocTable(서류) + Checklist(주의사항) + FAQ
// MAP: Q1→서론(수령액 걱정 공감) Q2→H2순서(조건→계산→서류→절차→주의사항) Q3→H2깊이(리셋·두번납부 강조) Q4→Calculator+Steps+DocTable+Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법정 허용 사유(무주택 주택 구입·전세보증금·요양 등)에 해당해요" },
  { id: "c2", label: "현재 재직 중인 회사가 중간정산 신청을 받아주는 곳이에요" },
  { id: "c3", label: "정산 후 근속기간이 리셋된다는 걸 알고 있죠" },
  { id: "c4", label: "세금이 원천징수되어 실제 수령액이 줄어든다는 걸 알고 있죠" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "중간정산 금액",
    min: 500, max: 15000, step: 100, defaultValue: 3000,
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
    getValue: (v: Record<string, number>) => {
      const total = v.amount * 10000;
      // 근속연수공제: 5년 이하 30만×근속, 5~10년 150만+(50만×초과), 10~20년 400만+(80만×초과), 20년초과 1200만+(120만×초과)
      const y = v.years;
      let dedYear = 0;
      if (y <= 5) dedYear = 300000 * y;
      else if (y <= 10) dedYear = 1500000 + 500000 * (y - 5);
      else if (y <= 20) dedYear = 4000000 + 800000 * (y - 10);
      else dedYear = 12000000 + 1200000 * (y - 20);
      const taxableIncome = Math.max(0, total - dedYear);
      // 환산급여 = 과세대상/근속연수×12, 환산급여공제 후 퇴직소득과세표준
      const annualized = y > 0 ? (taxableIncome / y) * 12 : taxableIncome;
      let dedAnnual = 0;
      if (annualized <= 8000000) dedAnnual = annualized * 0.6;
      else if (annualized <= 10000000) dedAnnual = 4800000 + (annualized - 8000000) * 0.55;
      else if (annualized <= 30000000) dedAnnual = 5900000 + (annualized - 10000000) * 0.45;
      else if (annualized <= 45000000) dedAnnual = 14900000 + (annualized - 30000000) * 0.35;
      else if (annualized <= 100000000) dedAnnual = 20150000 + (annualized - 45000000) * 0.25;
      else dedAnnual = 33900000 + (annualized - 100000000) * 0.15;
      const annualTaxBase = Math.max(0, annualized - dedAnnual);
      // 기본세율 적용
      let annualTax = 0;
      if (annualTaxBase <= 14000000) annualTax = annualTaxBase * 0.06;
      else if (annualTaxBase <= 50000000) annualTax = 840000 + (annualTaxBase - 14000000) * 0.15;
      else if (annualTaxBase <= 88000000) annualTax = 6240000 + (annualTaxBase - 50000000) * 0.24;
      else if (annualTaxBase <= 150000000) annualTax = 15360000 + (annualTaxBase - 88000000) * 0.35;
      else annualTax = 37060000 + (annualTaxBase - 150000000) * 0.38;
      // 퇴직소득산출세액 = 연세액/12×근속연수
      const retireTax = (annualTax / 12) * y;
      // 지방소득세 포함 (10%)
      return Math.round(retireTax * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (지방소득세 포함)`,
  },
  {
    label: "세후 수령액",
    getValue: (v: Record<string, number>) => {
      const total = v.amount * 10000;
      const y = v.years;
      let dedYear = 0;
      if (y <= 5) dedYear = 300000 * y;
      else if (y <= 10) dedYear = 1500000 + 500000 * (y - 5);
      else if (y <= 20) dedYear = 4000000 + 800000 * (y - 10);
      else dedYear = 12000000 + 1200000 * (y - 20);
      const taxableIncome = Math.max(0, total - dedYear);
      const annualized = y > 0 ? (taxableIncome / y) * 12 : taxableIncome;
      let dedAnnual = 0;
      if (annualized <= 8000000) dedAnnual = annualized * 0.6;
      else if (annualized <= 10000000) dedAnnual = 4800000 + (annualized - 8000000) * 0.55;
      else if (annualized <= 30000000) dedAnnual = 5900000 + (annualized - 10000000) * 0.45;
      else if (annualized <= 45000000) dedAnnual = 14900000 + (annualized - 30000000) * 0.35;
      else if (annualized <= 100000000) dedAnnual = 20150000 + (annualized - 45000000) * 0.25;
      else dedAnnual = 33900000 + (annualized - 100000000) * 0.15;
      const annualTaxBase = Math.max(0, annualized - dedAnnual);
      let annualTax = 0;
      if (annualTaxBase <= 14000000) annualTax = annualTaxBase * 0.06;
      else if (annualTaxBase <= 50000000) annualTax = 840000 + (annualTaxBase - 14000000) * 0.15;
      else if (annualTaxBase <= 88000000) annualTax = 6240000 + (annualTaxBase - 50000000) * 0.24;
      else if (annualTaxBase <= 150000000) annualTax = 15360000 + (annualTaxBase - 88000000) * 0.35;
      else annualTax = 37060000 + (annualTaxBase - 150000000) * 0.38;
      const retireTax = Math.round((annualTax / 12) * y * 1.1);
      return total - retireTax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "인사팀 양식 수령" },
  { name: "사유 증빙서류 (매매계약서·임대차계약서·진단서 등)", required: true, where: "해당 기관 발급" },
  { name: "근로계약서 또는 재직증명서 (입사일 확인)", required: true, where: "인사팀" },
  { name: "급여명세서 최근 3개월 (평균임금 산정)", required: true, where: "인사팀" },
  { name: "퇴직소득원천징수영수증", required: false, where: "정산 후 인사팀 발급 — 반드시 수령" },
];

const STEPS = [
  {
    title: "법정 허용 사유 해당 여부 체크",
    desc: "중간정산은 무주택자 주택 구입, 전세보증금 부담, 본인·부양가족 6개월 이상 요양, 파산·회생절차, 천재지변 등 법에서 정한 사유가 있어야만 돼요. 사유가 없으면 회사가 허용해줘도 세금 불이익이 생겨요.",
    tip: "근로자퇴직급여보장법 시행령 제3조에 허용 사유 전체 목록이 나와 있죠",
    link: { label: "법정 사유 전체 보기", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
  },
  {
    title: "홈택스에서 세금 사전 계산",
    desc: "정산 전에 세금이 얼마나 나오는지 먼저 계산해보는 게 핵심이에요. 국세청 홈택스 '퇴직소득세 모의계산'이 가장 정확해요. 중간정산액이 크거나 세금이 예상보다 많다면 세무사 상담도 고려해봐요.",
    tip: "홈택스 → 세금신고 → 모의계산 → 퇴직소득세",
    link: { label: "홈택스 모의계산 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "신청서·증빙서류 인사팀 제출",
    desc: "중간정산 신청서와 사유 증빙서류를 인사팀에 제출해요. 주택 구입이면 매매계약서, 전세면 임대차계약서, 요양이면 의사 진단서가 필요해요. 회사가 서류를 검토한 뒤 승인하면 정산이 진행돼요.",
    tip: "서류 기준은 회사마다 다를 수 있으니 인사팀에 먼저 물어봐요",
  },
  {
    title: "퇴직소득세 원천징수 확인 및 영수증 수령",
    desc: "정산금이 지급될 때 퇴직소득세가 미리 공제돼요. 지급 후 퇴직소득원천징수영수증을 꼭 받아두세요. 이 영수증은 최종 퇴직 시 세금 합산 계산에 쓰이기 때문에 잃어버리면 나중에 번거로워요.",
    tip: "영수증을 분실해도 인사팀에 재발급 요청할 수 있죠",
  },
];

const CHECKLIST = [
  "법정 허용 사유 해당 여부 체크 — 사유 없으면 신청 불가",
  "홈택스 퇴직소득세 모의계산으로 세금 사전 파악",
  "정산 후 근속기간 리셋 인지 — 이후 1년 미만 퇴직 시 퇴직금 없음",
  "세금 두 번 납부 구조 인지 — 중간정산 때 1회, 최종 퇴직 때 1회",
  "퇴직소득원천징수영수증 수령 및 보관 철저히",
  "금액이 크다면 세무사 상담 후 결정",
];

const FAQS = [
  {
    q: "중간정산을 받으면 세금을 꼭 내야 하나요?",
    a: "맞아요. 세법은 중간정산을 '퇴직'으로 보기 때문에 퇴직소득세가 그대로 원천징수돼요. 법정 허용 사유에 해당하면 세금 혜택(근속연수공제·환산급여공제)은 그대로 적용되고요.",
  },
  {
    q: "중간정산 후 최종 퇴직할 때 세금이 또 나오나요?",
    a: "맞아요. 중간정산일부터 최종 퇴직일까지의 퇴직금에 퇴직소득세가 별도로 붙어요. 중간정산분과 이후 퇴직금은 각각 따로 계산되고, 그때마다 근속기간은 정산일 기준으로 새로 시작해요.",
  },
  {
    q: "근속기간이 리셋되면 퇴직금 손해가 얼마나 되나요?",
    a: "꽤 커요. 예를 들어 10년 근무하고 중간정산 후 3년 만에 퇴직하면, 10년치 퇴직금은 먼저 받지만 이후 3년치만 추가로 받아요. 반면 중간정산 없이 13년 근무하면 전체 근속연수공제가 더 커서 세금이 더 적어요.",
  },
  {
    q: "중간정산 금액이 작으면 세금이 0원일 수 있나요?",
    a: "그런 경우도 생겨요. 근속연수공제 후 과세표준이 0이 되면 세금이 나오지 않아요. 근속기간이 짧고 금액이 작을수록 이런 상황이 되고요. 아래 계산기로 미리 추정해볼 수 있죠.",
  },
  {
    q: "법정 사유 없이 중간정산하면 어떻게 되나요?",
    a: "회사가 법을 위반하는 게 돼요. 세금 혜택도 줄어들 수 있고, 근로자퇴직급여보장법 위반으로 회사에 과태료가 부과될 수도 있죠. 법정 사유가 없다면 중간정산보다 퇴직 시 전액 받는 게 세금·법 양쪽에서 유리해요.",
  },
  {
    q: "IRP로 중간정산을 받을 수 있나요?",
    a: "원칙적으로 중간정산은 IRP가 아닌 본인 계좌로 받아요. IRP는 퇴직 시 수령 전용이에요. 중간정산 세금은 지급 시점에 바로 원천징수되고, IRP 이전으로 과세 이연할 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조: 퇴직소득 과세", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스: 퇴직소득세 모의계산", url: "https://www.hometax.go.kr" },
      { label: "고용노동부: 퇴직급여 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "국세청: 퇴직소득 세액계산 안내", url: "https://www.nts.go.kr" },
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
    description: "근속연수공제·환산급여공제 적용 단계별 공식이에요.",
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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-세금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 퇴직소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 받으면 세금이 얼마나 나오나요?<br />
        퇴직소득세 계산법과 근속기간 리셋 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중간정산을 받으면 <strong>퇴직소득세</strong>가 원천징수돼요. 최종 퇴직이 아니어도 세금을 내야 하는 구조죠.
        게다가 정산 후에는 <a href="/w/퇴직금-중간정산-후-퇴직금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>근속기간이 리셋</a>되기 때문에
        세금을 모르고 받으면 예상보다 적게 들어오고, 나중에도 손해가 생겨요.
        세금 계산 방법과 <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청 조건</a>, 주의사항을 미리 파악해두면 불이익을 막을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 신청 전 조건 체크가 먼저예요</H2>
      <p style={body}>
        중간정산은 아무 때나 신청할 수 있는 게 아니에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에서
        허용하는 사유가 있어야 해요. 무주택 세대주의 주택 구입, 전세보증금 부담, 본인·부양가족 6개월 이상 요양, 파산·회생절차, 천재지변이 대표적인 사유예요.
      </p>
      <p style={body}>
        법정 사유 없이 중간정산을 진행하면 회사가 법을 위반하는 게 돼요. 세금 혜택도 줄어들 수 있죠.
        신청 전에 내 사유가 여기에 해당하는지 먼저 체크해봐야 해요.
      </p>

      <SectionBadge>중간정산 신청 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청이 가능한 조건이에요. 아래 계산기로 예상 세금을 추정해봐요."
        partialMatchText="조건이 일부 맞지 않아요. 고용노동부(1350) 또는 인사팀에 먼저 상담해봐요."
      />

      <Divider />

      <H2>퇴직소득세 계산법, 이렇게 돼요</H2>
      <p style={body}>
        중간정산 세금은 <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a> 공식을 그대로 적용해요.
        근속기간이 짧을수록 근속연수공제가 적어서 세금이 상대적으로 높게 나와요.
        반대로 근속기간이 길면 공제가 커져서 세율이 낮아지는 구조예요.
      </p>
      <p style={body}>
        계산 순서는 이래요. 먼저 정산금에서 근속연수공제를 빼요. 남은 금액을 연 단위로 환산(×12÷근속연수)하고,
        환산급여공제를 한 번 더 빼요. 그 결과에 기본세율을 곱하고, 다시 근속연수로 되돌리면(÷12×근속연수) 퇴직소득산출세액이 나와요.
        지방소득세(10%) 포함해서 납부하고요.
      </p>
      <p style={body}>
        아래 계산기는 이 공식을 반영한 추정치예요. 실제 납부액은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 홈택스</a> 퇴직소득세 모의계산이 더 정확하죠.
      </p>

      <SectionBadge>중간정산 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근속연수공제·환산급여공제·지방소득세(10%) 반영 추정치. 퇴직금 종류, 공제 항목에 따라 실제와 차이가 날 수 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        사유에 따라 증빙서류가 달라요. 주택 구입이면 매매계약서, 전세면 임대차계약서, 요양이면 의사 진단서가 필요해요.
        서류 기준은 회사마다 다를 수 있으니, 신청 전에 인사팀에 먼저 물어보는 게 좋아요.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 정산 후 인사팀에서 받을 수 있고요.
        최종 퇴직 시 세금 계산에도 쓰이기 때문에 꼭 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>중간정산 신청 절차 4단계</H2>
      <p style={body}>
        신청 전에 세금을 미리 계산해보는 게 제일 중요해요.
        세금이 예상보다 많다면 중간정산 대신 퇴직 시 한 번에 받는 게 유리할 수도 있죠.
        아래 순서대로 진행하면 빠짐없이 처리할 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>주의사항 — 근속기간 리셋과 세금 두 번</H2>
      <p style={body}>
        중간정산의 가장 큰 불이익은 <strong>근속기간 리셋</strong>이에요.
        정산 후에는 그날부터 다시 1년을 채워야 퇴직금이 쌓여요.
        예를 들어 7년 근무 후 중간정산하고 10개월 만에 퇴직하면, 그 10개월치 퇴직금은 받을 수 없어요.
      </p>
      <p style={body}>
        세금도 두 번 나와요. 중간정산 시 한 번, 최종 퇴직 시 또 한 번이에요.
        두 번 모두 각각의 근속기간 기준으로 따로 계산돼요.
        중간정산 없이 전체 기간을 합산하면 근속연수공제가 더 크기 때문에 세금이 더 적어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        목돈이 급하지 않다면 퇴직 시 전액 받는 게 세금 면에서 나아요.
        근속기간이 길수록 근속연수공제가 커져서 최종 퇴직 시 세금이 더 적고,
        <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 연금 수령</a>을 선택하면 추가로 30~40% 절세 효과도 볼 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산 세금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율·공제 한도 변경이 있을 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 직접 확인해봐요." />
    </ArticleLayout>
  );
}
