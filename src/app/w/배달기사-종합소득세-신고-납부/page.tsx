"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 배달 플랫폼에서 3.3% 떼이는데 세금 신고를 해야 하는지, 하면 돌려받을 수 있는지 궁금한 상황이에요.
// Q2. 5월에 홈택스에서 종합소득세 신고를 완료하고 환급금을 받는 행동.
// Q3. 신고 의무(사업소득자), 경비율(단순경비율 79.4%), 환급 구조(3.3% 중 차액), 신고 기한(5/1~6/2), 가산세.
// Q4. GreenBox(핵심) + Calculator(환급 계산) + Steps(신고 절차) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "income", label: "연간 배달 수입", min: 500, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "원천징수액 (3.3%)",
    getValue: (inputs: Record<string, number>) => Math.round(inputs.income * 10000 * 0.033),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "과세 소득 (단순경비율 79.4% 적용)",
    getValue: (inputs: Record<string, number>) => Math.round(inputs.income * 10000 * 0.206),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "예상 환급액",
    getValue: (inputs: Record<string, number>) => {
      const taxable = inputs.income * 10000 * 0.206;
      let tax = 0;
      if (taxable <= 14000000) tax = taxable * 0.06;
      else if (taxable <= 50000000) tax = 14000000 * 0.06 + (taxable - 14000000) * 0.15;
      else tax = 14000000 * 0.06 + 36000000 * 0.15 + (taxable - 50000000) * 0.24;
      const withheld = inputs.income * 10000 * 0.033;
      return Math.max(0, Math.round(withheld - tax));
    },
    format: (v: number) => `약 ${v.toLocaleString()}원`,
    highlight: true,
  },
];

const FILING_STEPS = [
  { title: "소득 자료 확인", desc: "4월 말에 홈택스에 로그인해서 '지급명세서'가 제대로 올라왔는지 확인해요. 플랫폼에서 누락한 경우가 있어요." },
  { title: "홈택스 접속 및 로그인", desc: "hometax.go.kr에서 공동인증서 또는 간편인증(카카오·네이버)으로 로그인해요.", tip: "손택스 앱으로 모바일 신고도 가능해요." },
  { title: "종합소득세 신고서 작성", desc: "종합소득세 신고 메뉴 → 안내에 따라 수입금액, 경비율 입력해요. 단순경비율 대상이면 자동으로 79.4% 적용돼요." },
  { title: "신고서 제출 및 납부(환급)", desc: "제출 버튼 누르면 완료예요. 환급이면 2~3주 후 계좌로 입금돼요." },
];

const FILING_CHECKLIST = [
  "홈택스에서 지급명세서가 제대로 올라왔는지 확인했나요?",
  "배달 외 다른 소득(알바, 프리랜서)도 함께 신고했나요?",
  "경비 증빙(유류비, 수리비, 통신비)을 보관하고 있나요?",
  "환급 받을 본인 명의 계좌를 준비했나요?",
  "신고 기한(5월 1일~6월 2일) 내에 제출했나요?",
];

const FAQS = [
  { q: "3.3% 떼이니까 신고 안 해도 되지 않나요?", a: "3.3%는 임시로 떼는 거예요. 경비율 적용하면 실제 세금이 더 적어서 차액을 환급받아요. 신고 안 하면 오히려 돈을 못 돌려받아요." },
  { q: "수입이 3,600만원 넘으면 어떻게 달라지나요?", a: "단순경비율(79.4%) 대신 기준경비율이 적용돼요. 경비 증빙(영수증)이 있으면 간편장부를 쓰는 게 유리해요." },
  { q: "배달 외에 편의점 알바도 했는데 같이 신고하나요?", a: "알바가 근로소득(4대보험 가입)이면 연말정산 끝난 거라 따로 안 해도 돼요. 3.3% 원천징수 프리랜서 형태면 함께 종합소득세 신고해야 해요." },
  { q: "신고 안 하면 가산세가 얼마예요?", a: "무신고 가산세 20% + 납부지연 가산세(하루 0.022%)가 붙어요. 50만원 세금을 안 냈으면 10만원 + 매일 약 110원씩 추가돼요." },
  { q: "세무사에게 맡기면 비용이 얼마예요?", a: "단순경비율 대상은 5~10만원 선이에요. 수입이 많거나 복잡하면 15~30만원까지 올라가요." },
  { q: "오토바이 유류비나 수리비도 경비로 인정되나요?", a: "단순경비율 대상이면 이미 79.4%가 자동 인정이라 따로 안 넣어도 돼요. 기준경비율 대상이면 영수증 챙겨서 경비로 넣을 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 홈택스 (종합소득세 신고)", url: "https://www.hometax.go.kr" },
      { label: "국세청 종합소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "종합소득세-신고-방법", title: "종합소득세 신고 방법", description: "홈택스 전자신고 전체 절차를 안내해요." },
  { slug: "배달앱종사자-근로자성-인정", title: "배달앱종사자 근로자성 인정", description: "근로자인지 개인사업자인지 판단 기준이에요." },
  { slug: "프리랜서-세금-신고", title: "프리랜서 세금 신고", description: "3.3% 원천징수 프리랜서 신고 가이드예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 종합소득세 · 배달기사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        배달기사 종합소득세, 환급받을 수 있을까?<br />
        신고 방법부터 경비율 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배달하면서 3.3% 떼이고 있죠? 그 돈, 5월에 종합소득세 신고하면 상당 부분 돌려받을 수 있어요.
        경비율을 적용하면 실제 세금이 원천징수액보다 적거든요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 직접 할 수 있고, 30분이면 끝나요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 환급 계산 ── */}
      <H2>얼마나 돌려받을 수 있나요?</H2>
      <p style={body}>
        배달기사는 사업소득자로 분류돼요. 수입의 79.4%를 경비로 자동 인정받고(단순경비율, 연 3,600만원 이하),
        나머지 20.6%에만 세금이 붙어요. 3.3% 전액보다 실제 세금이 적으니 차액이 환급되는 구조예요.
      </p>

      <SectionBadge>환급액 계산기</SectionBadge>
      <Calculator
        title="배달기사 종합소득세 환급 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="단순경비율(79.4%) 기준 추정치예요. 다른 소득이 있으면 합산 세율이 달라질 수 있어요."
      />

      <p style={body}>
        예를 들어 연 3,000만원 벌었다면 99만원(3.3%)을 떼였는데, 실제 세금은 약 50만원이에요.
        49만원을 돌려받는 거죠. 신고 안 하면 이 돈을 그냥 버리는 셈이에요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 신고 절차 ── */}
      <H2>홈택스에서 신고하는 방법</H2>
      <p style={body}>
        매년 5월 1일부터 6월 2일까지가 신고 기간이에요.
        전년도(2025년) 소득을 올해(2026년) 5월에 신고하는 거예요.
        홈택스 또는 손택스 앱에서 30분이면 끝나요.
      </p>

      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={FILING_STEPS} />

      <Divider />

      {/* ── 섹션 3: 경비율과 가산세 ── */}
      <H2>수입 구간별 경비율이 다른가요?</H2>
      <p style={body}>
        연 수입 3,600만원 이하면 단순경비율(79.4%)이 자동 적용돼요. 영수증 없이도 79.4%를 경비로 인정해줘요.
        3,600만원~7,500만원이면 간편장부 또는 기준경비율, 7,500만원 이상이면 복식부기 의무예요.
      </p>

      <BorderBox>
        <b>3,600만원 이하</b>: 단순경비율 79.4% → 과세소득 = 수입의 20.6%<br /><br />
        <b>3,600~7,500만원</b>: 기준경비율 또는 간편장부 → 경비 증빙 필요<br /><br />
        <b>7,500만원 이상</b>: 복식부기 의무 → 세무사 도움 권장
      </BorderBox>

      <p style={body}>
        기한 내 미신고 시 무신고 가산세 20%가 추가돼요. 세금을 늦게 내면 하루 0.022%씩 납부지연 가산세도 붙고요.
        5월 중에 여유 있게 신고하세요.
      </p>

      <SectionBadge>신고 전 체크리스트</SectionBadge>
      <Checklist items={FILING_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 개인 상황에 따라 세금이 달라질 수 있으니 국세청 126에 문의하세요." />
    </ArticleLayout>
  );
}
