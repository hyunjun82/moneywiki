// Q1. 세뱃돈 모아서 아이 목돈 만들어주려는데 증여세가 붙는지, 한도가 얼마인지 궁금
// Q2. 면제 한도(미성년 2천만원/성인 5천만원) 확인 → 초과 시 신고 방법 파악
// Q3. 10년 합산, 미성년 2천만원·성인 5천만원, 세율 10~50%, 3개월 내 자진신고 3% 할인
// Q4. GreenBox(면제한도) + Calculator(증여세 계산) + Steps(신고방법) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Calculator, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CALC_SLIDERS = [
  { id: "total", label: "10년간 받은 총액 (만원)", min: 0, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "minor", label: "미성년(1) / 성인(0)", min: 0, max: 1, step: 1, defaultValue: 1, format: (v: number) => v === 1 ? "미성년자" : "성인" },
];

const CALC_RESULTS = [
  {
    label: "면제 한도",
    getValue: (inputs: Record<string, number>) => inputs.minor === 1 ? 2000 : 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "과세 대상",
    getValue: (inputs: Record<string, number>) => {
      const limit = inputs.minor === 1 ? 2000 : 5000;
      return Math.max(0, inputs.total - limit);
    },
    format: (v: number) => v === 0 ? "없음 (면제 한도 이내)" : `${v.toLocaleString()}만원`,
  },
  {
    label: "예상 증여세",
    getValue: (inputs: Record<string, number>) => {
      const limit = inputs.minor === 1 ? 2000 : 5000;
      const taxable = Math.max(0, inputs.total - limit);
      if (taxable <= 0) return 0;
      if (taxable <= 10000) return taxable * 0.1;
      if (taxable <= 50000) return taxable * 0.2 - 1000;
      return taxable * 0.3 - 6000;
    },
    format: (v: number) => v === 0 ? "0원" : `${v.toLocaleString()}만원`,
    highlight: true,
  },
];

const STEPS_DATA = [
  {
    title: "홈택스 접속 → 증여세 정기신고",
    desc: "홈택스(hometax.go.kr)에 로그인한 뒤 세금신고 → 증여세 → 정기신고로 들어가세요. 미성년자는 부모(법정대리인)가 대신 신고해요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "증여자·수증자 정보 입력",
    desc: "누가 줬는지(증여자), 누가 받았는지(수증자) 정보를 입력해요. 아이 주민등록번호로 신고하되 신고자는 부모예요.",
  },
  {
    title: "증여재산 내역 입력 + 공제 적용",
    desc: "10년간 받은 총 금액을 입력하고, 직계비속 공제(미성년 2천만원/성인 5천만원)를 적용해요. 초과분에 대해 세액이 자동 계산돼요.",
  },
  {
    title: "신고서 제출 + 납부",
    desc: "신고서를 제출하고 계산된 세액을 납부하면 돼요. 증여받은 달의 말일부터 3개월 이내 자진신고하면 세액의 3%를 할인받아요.",
    tip: "2026년 1월 설에 받았다면 2026년 4월 30일까지 신고",
  },
];

const FAQS = [
  { q: "세뱃돈 몇만원 줘도 증여세 내야 하나요?", a: "아니에요. 사회 통념상 적정한 세뱃돈(수만원~수십만원)은 비과세예요. 문제는 고액이 반복적으로 오가면서 아이 명의로 저축·투자될 때예요." },
  { q: "할아버지·할머니·외조부모가 각각 따로 주면 한도도 따로인가요?", a: "아니에요. 직계존속(부모·조부모·외조부모) 전체가 하나의 그룹이에요. 그룹 합산으로 미성년 2천만원, 성인 5천만원이에요." },
  { q: "교육비로 직접 내면 증여세가 없나요?", a: "네, 학원비·등록금을 할아버지 계좌에서 직접 납부하면 증여세 대상이 아니에요. 다만 아이 계좌로 보내서 아이가 내면 증여로 볼 수 있어요." },
  { q: "신고 안 하면 어떻게 되나요?", a: "무신고 가산세 20%에 납부지연 가산세가 추가돼요. 면제 한도를 초과하면 꼭 신고하세요." },
  { q: "1천만원 이상 현금 거래는 자동으로 보고되나요?", a: "네, 건당 1천만원 이상 현금 입출금은 금융정보분석원(FIU)에 자동 보고돼요. 분산 이체도 이상거래로 판단될 수 있어요." },
  { q: "10년이 지나면 면제 한도가 리셋되나요?", a: "네, 10년이 지나면 면제 한도가 다시 초기화돼요. 아이가 태어나서 10살까지 2천만원, 10살~20살까지 또 2천만원까지 비과세예요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 증여세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960" },
      { label: "상속세 및 증여세법 제53조", url: "https://www.law.go.kr/법령/상속세및증여세법" },
      { label: "홈택스 증여세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부모님-용돈-현금-증여세", title: "부모님 용돈도 증여세?", description: "부모님께 드리는 용돈의 증여세 기준이에요." },
  { slug: "가족-간-금전소비대차-계약서", title: "가족 간 돈 빌리기", description: "가족끼리 돈 빌릴 때 필요한 계약서예요." },
  { slug: "증여세-계산-세율-공제", title: "증여세 계산기", description: "증여세 세율과 공제를 계산해 보세요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 증여세 · 자녀</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자녀 세뱃돈, 증여세 내야 할까?<br />
        면제 한도와 신고 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설날에 받은 세뱃돈을 아이 통장에 차곡차곡 모아두고 있죠. 일반적인 세뱃돈은 비과세예요. 하지만 10년간 합산해서{" "}
        미성년 자녀는 <strong>2,000만원</strong>, 성인 자녀는 <strong>5,000만원</strong>을 넘으면 초과분에 증여세가 붙어요.{" "}
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로 정리해 드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>면제 한도, 10년 합산이에요</H2>
      <p style={body}>
        증여세 면제 한도는 1회가 아니라 같은 그룹(직계존속)에서 10년간 받은 금액을 모두 합산해요.
        아버지, 어머니, 할아버지, 할머니가 각각 준 금액을 다 더한다는 뜻이에요.
      </p>

      <GreenBox title="관계별 10년 면제 한도">
        부모 → 성인 자녀: 5,000만원<br />
        부모 → 미성년 자녀: 2,000만원<br />
        배우자: 6억원<br />
        형제자매·기타 친족: 1,000만원
      </GreenBox>

      <Divider />

      <H2>얼마나 세금이 나올까?</H2>
      <p style={body}>
        면제 한도를 넘은 금액에 세율이 적용돼요. 1억원 이하는 10%, 1~5억은 20%예요. 금액이 작아도 신고 안 하면 가산세가 붙으니 주의하세요.
      </p>

      <Calculator title="증여세 간편 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS} note="직계존속 증여 기준. 미성년(1)/성인(0) 선택" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>한도 초과 시 신고 방법</H2>
      <p style={body}>
        면제 한도를 초과했다면 홈택스에서 증여세를 신고해야 해요. 3개월 이내 자진신고하면 세액의 3%를 할인받아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        교육비나 생활비를 부모·조부모가 직접 납부하면 증여세 대상이 아니에요.
        핵심은 <strong>아이 계좌로 보내지 않고</strong> 교육기관이나 학원에 직접 이체하는 거예요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 증여세 안내예요. 면제 한도와 세율은 세법 개정에 따라 변경될 수 있으니 국세청 또는 홈택스에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
