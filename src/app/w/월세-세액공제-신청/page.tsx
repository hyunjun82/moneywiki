// Q1. 월세 살고 있는데 연말정산 때 세액공제 받을 수 있는지, 얼마나 돌려받는지 궁금한 상황
// Q2. 월세 세액공제 자격 확인 → 공제액 계산 → 홈택스에서 신청까지 완료
// Q3. 총급여 8천만원 이하, 무주택, 기준시가 4억 이하, 공제율 17%/15%, 한도 1,000만원, 필요 서류
// Q4. EligibilityChecker(자격확인) + Calculator(공제액) + Steps(신청절차) + DocTable(서류) + FAQ

"use client";
export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  EligibilityChecker, Calculator,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const ELIGIBILITY = [
  { id: "housing", label: "무주택 세대주 또는 세대원이에요" },
  { id: "salary", label: "총급여 8,000만원 이하 (종합소득 7,000만원 이하)예요" },
  { id: "price", label: "임차 주택 기준시가 4억원 이하예요" },
  { id: "contract", label: "임대차계약서에 본인 이름이 있어요" },
  { id: "resident", label: "해당 주택에 전입신고하고 거주 중이에요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "총급여 (만원)", min: 2000, max: 8000, step: 100, defaultValue: 4000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "rent", label: "월세 (만원)", min: 10, max: 150, step: 5, defaultValue: 50, format: (v: number) => `${v.toLocaleString()}만원` },
];

const CALC_RESULTS = [
  {
    label: "연간 월세액",
    getValue: (inputs: Record<string, number>) => Math.min(inputs.rent * 12, 1000),
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "적용 공제율",
    getValue: (inputs: Record<string, number>) => inputs.salary <= 5500 ? 17 : 15,
    format: (v: number) => `${v}%`,
  },
  {
    label: "예상 공제액",
    getValue: (inputs: Record<string, number>) => {
      const annual = Math.min(inputs.rent * 12, 1000);
      const rate = inputs.salary <= 5500 ? 0.17 : 0.15;
      return Math.round(annual * rate * 10) / 10;
    },
    format: (v: number) => `${v.toLocaleString()}만원`,
    highlight: true,
  },
];

const STEPS_DATA = [
  {
    title: "홈택스 연말정산 간소화 서비스 접속",
    desc: "매년 1월 15일부터 국세청 홈택스 연말정산 간소화 서비스가 열려요. 확정일자를 받은 주택이라면 월세 납부 내역이 자동으로 조회돼요.",
    tip: "확정일자 없으면 수동으로 서류를 준비해야 해요",
  },
  {
    title: "월세 세액공제 증빙 서류 준비",
    desc: "임대차계약서 사본, 월세 이체 내역(12개월분), 주민등록등본을 준비해요. 계좌이체 시 적요란에 '월세'라고 적어두면 나중에 증빙이 편해요.",
  },
  {
    title: "회사에 서류 제출 또는 홈택스 직접 신청",
    desc: "연말정산 시기에 회사 담당자에게 서류를 제출하면 돼요. 놓쳤다면 5월 종합소득세 확정신고 때 홈택스에서 직접 경정청구할 수 있어요.",
    tip: "최대 5년 치까지 소급해서 환급받을 수 있어요",
  },
];

const DOCS = [
  { name: "임대차계약서 사본", required: true, where: "본인 보관 사본" },
  { name: "월세 납부 증빙 (12개월)", required: true, where: "은행 이체내역서 또는 현금영수증" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "주택 기준시가 확인서", required: false, where: "홈택스 또는 국토교통부 공시가격" },
];

const FAQS = [
  { q: "월세를 현금으로 냈는데 공제받을 수 있나요?", a: "현금영수증을 발급받았다면 가능해요. 집주인한테 현금영수증 발급을 요청하거나, 국세청에 현금영수증 발급 신청을 하면 돼요." },
  { q: "오피스텔이나 고시원도 공제 대상인가요?", a: "주거용 오피스텔과 고시원은 공제 대상이에요. 상가나 사무실 용도는 안 돼요." },
  { q: "집주인이 임대사업자 등록 안 해도 공제받을 수 있나요?", a: "네, 집주인의 임대사업자 등록 여부와 상관없이 세입자는 공제받을 수 있어요." },
  { q: "월세 세액공제랑 현금영수증 소득공제 중 뭐가 유리한가요?", a: "총급여 5,500만원 이하라면 세액공제(17%)가 훨씬 유리해요. 현금영수증 소득공제는 30%지만, 실질적으로 세액공제 효과가 더 커요." },
  { q: "주택임차차입금 공제랑 중복으로 받을 수 있나요?", a: "월세 세액공제와 주택임차차입금 원리금상환액 소득공제는 중복 적용이 안 돼요. 둘 중 유리한 쪽을 골라야 해요." },
  { q: "과거에 못 받은 월세 공제를 소급해서 받을 수 있나요?", a: "네, 최대 5년 치까지 경정청구로 돌려받을 수 있어요. 5월 종합소득세 신고 기간에 홈택스에서 신청하면 돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 월세 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40613&cntntsId=239025" },
      { label: "소득세법 제95조의2 (월세액 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-세액공제-항목", title: "연말정산 세액공제 항목", description: "세액공제 받을 수 있는 항목을 정리했어요." },
  { slug: "전세-보증금-보호-확정일자-받기-대항력", title: "전세 보증금 보호 확정일자", description: "확정일자로 보증금을 지키는 방법이에요." },
  { slug: "연말정산-환급금-지급일", title: "연말정산 환급금 지급일", description: "환급금이 언제 들어오는지 확인하세요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 월세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월세 세액공제, 얼마 돌려받을까?<br />
        자격 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 월세 내면서 연말정산은 그냥 넘기고 있나요? 총급여 8,000만원 이하 무주택 세입자라면 월세의 15~17%를 돌려받을 수 있어요.
        2025년 귀속분부터 공제 한도가 연 750만원에서 <strong>1,000만원</strong>으로 올랐고, 소득 기준도 총급여 <strong>8,000만원 이하</strong>로 확대됐어요.
        못 받은 게 있다면 <strong>최대 5년 치</strong>까지 소급 환급도 가능하니 지금이라도 꼭 챙기세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>월세 세액공제 받을 수 있는 사람은?</H2>
      <p style={body}>
        아래 조건을 모두 충족하면 월세 세액공제를 받을 수 있어요. 무주택이 핵심이고, 세대주가 주택 관련 공제를 안 받으면 세대원도 가능해요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="월세 세액공제 대상이에요. 아래에서 공제액을 계산해 보세요."
        partialMatchText="일부 조건이 안 맞아요. 체크 안 된 항목을 확인해 보세요."
      />

      <BorderBox>
        주거용 오피스텔, 고시원도 공제 대상이에요. 다만 상가나 사무실은 안 돼요.
        계약서에 본인 이름이 없으면 공제가 안 되니, 맞벌이 부부는 소득이 낮은 쪽 명의로 계약하는 게 유리해요.
      </BorderBox>

      <Divider />

      <H2>내 공제액은 얼마일까?</H2>
      <p style={body}>
        총급여 5,500만원 이하면 17%, 초과~8,000만원 이하면 15% 공제율이 적용돼요.
        연간 월세액은 최대 1,000만원까지만 인정되니, 월세가 약 83만원을 넘으면 한도에 걸려요.
      </p>

      <Calculator title="월세 세액공제 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS} note="2025년 귀속분 기준, 연간 월세 한도 1,000만원 적용" />

      <GreenBox title="공제율 요약">
        총급여 5,500만원 이하 → 17% (최대 170만원 공제)<br />
        총급여 5,500만원 초과 ~ 8,000만원 이하 → 15% (최대 150만원 공제)
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>홈택스에서 신청하는 방법</H2>
      <p style={body}>
        확정일자를 받은 주택이면 간소화 서비스에서 자동 조회돼요. 안 되면 서류를 직접 준비해서 회사에 제출하거나, 5월에 홈택스로 경정청구하면 돼요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>준비해야 할 서류</H2>
      <p style={body}>
        간소화 서비스에서 자동 조회되면 별도 서류가 필요 없어요. 조회가 안 되는 경우에만 아래 서류를 준비하세요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 월세 세액공제 안내예요. 공제율과 한도는 세법 개정에 따라 변경될 수 있으니 국세청 또는 홈택스에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
