"use client";
// Q1. 부동산을 처음 사려는데 계약부터 등기까지 절차가 복잡해서 뭐부터 해야 하는지 모르는 상황이에요.
// Q2. 등기부등본 확인 → 계약 → 잔금 → 등기까지 전 과정을 순서대로 진행하는 행동.
// Q3. 등기부등본 확인 포인트, 계약서 필수 항목, 대금 지급 순서, 등기 신청 기한(60일), 필요 서류, 2026년 변경사항.
// Q4. Steps(절차) + GreenBox(핵심) + DocTable(서류) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const PURCHASE_STEPS = [
  { title: "등기부등본 확인", desc: "대법원 인터넷등기소(iros.go.kr)에서 등기사항전부증명서를 발급받아요. 소유자, 저당권, 가압류를 확인해요.", tip: "계약 당일이 아니라 며칠 전에 미리 확인하세요." },
  { title: "매매계약서 작성 및 계약금 지급", desc: "부동산 표시, 매매대금, 대금 지급일정, 특약사항을 기재해요. 계약금은 통상 매매가의 10%예요.", tip: "계약금은 반드시 계좌이체로 하세요. 2026년부터 입금 증빙 의무화됐어요." },
  { title: "중도금 지급 (있는 경우)", desc: "계약일과 잔금일 사이에 지급해요. 금액이 크면 2~3회 분할도 가능해요." },
  { title: "부동산 거래신고", desc: "매매계약일로부터 30일 이내에 시·군·구청에 신고해요. 거래신고필증을 발급받아야 등기할 수 있어요." },
  { title: "잔금 지급 및 등기 서류 교환", desc: "잔금과 동시에 매도인의 등기 서류를 받아요. 열쇠도 이때 넘겨받고요." },
  { title: "소유권이전등기 신청", desc: "잔금일로부터 60일 이내에 관할 등기소에 신청해요. 보통 법무사에게 위임해요.", tip: "60일 초과 시 과태료가 부과돼요." },
];

const REGISTRATION_DOCS = [
  { name: "매도인 등기필증(등기필정보)", required: true, where: "매도인이 준비" },
  { name: "매도인 인감증명서", required: true, where: "매도인이 발급" },
  { name: "매수인 주민등록등본", required: true, where: "주민센터 또는 정부24" },
  { name: "거래신고필증", required: true, where: "시·군·구청 부동산거래관리시스템" },
  { name: "취득세 납부 영수증", required: true, where: "위택스(wetax.go.kr) 또는 시·군·구청" },
  { name: "자금조달계획서 (투기과열지구)", required: false, where: "거래신고 시 함께 제출" },
];

const PRE_CONTRACT_CHECKLIST = [
  "등기부등본 갑구(소유권)·을구(저당권)를 확인했나요?",
  "가압류·가등기·예고등기가 없는지 확인했나요?",
  "매도인 신분증과 등기부 소유자가 일치하나요?",
  "특약사항에 '잔금일까지 근저당 말소' 조건을 넣었나요?",
  "계약금은 계좌이체로 지급하고 영수증을 보관했나요?",
  "거래신고 기한(30일)과 등기 기한(60일)을 메모했나요?",
];

const FAQS = [
  { q: "등기부등본에서 가장 먼저 확인할 건 뭔가요?", a: "을구(저당권·전세권)예요. 근저당이 설정돼 있으면 매도인이 잔금 받고 말소할 수 있는지 확인하세요. 가압류가 있으면 매수를 재고하세요." },
  { q: "계약금 넣은 후 매도인이 계약을 깨면요?", a: "매도인이 계약을 파기하면 계약금의 2배를 배상해야 해요. 반대로 매수인이 파기하면 계약금을 포기하는 거예요." },
  { q: "등기를 60일 안에 안 하면 어떻게 되나요?", a: "과태료가 부과돼요. 취득세의 1~5% 수준이에요. 등기를 안 하면 소유권 보호도 안 되니 빨리 하세요." },
  { q: "법무사 비용은 얼마 정도인가요?", a: "보통 50~100만원 선이에요. 매매가에 따라 달라져요. 직접 등기소 방문으로 셀프등기하면 절약할 수 있어요." },
  { q: "2026년에 달라진 게 있나요?", a: "1월부터 계약 신고 시 계약서와 계약금 입금 증빙 제출이 의무화됐어요. 2월부터 자금조달계획서 양식도 더 구체화됐어요." },
  { q: "생애 최초 주택 구입이면 취득세 감면이 되나요?", a: "네, 2028년 말까지 연장됐어요. 1년 이내 전입신고 + 실거주 조건이에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
      { label: "국토교통부 마이홈포털", url: "https://www.myhome.go.kr" },
      { label: "위택스 (취득세 납부)", url: "https://www.wetax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "등기부등본-보는법", title: "등기부등본 보는 법", description: "갑구·을구 읽는 방법을 쉽게 알려드려요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "주택 취득세 세율과 감면 조건이에요." },
  { slug: "부동산-중개보수", title: "부동산 중개보수 요율", description: "중개수수료 상한 요율과 계산법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 매매 · 등기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산 처음 사려면 뭐부터 해야 할까?<br />
        계약부터 등기까지 6단계 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 처음 사는데 단계가 많아서 막막하죠?
        등기부등본 확인 → 계약 → 잔금 → 등기, 이 순서만 기억하면 돼요.
        빠뜨리면 안 되는 확인 사항과 2026년 변경된 규정까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 전체 절차 ── */}
      <H2>전체 절차가 어떻게 되나요?</H2>
      <p style={body}>
        부동산 매수는 크게 6단계예요. 등기부등본 확인부터 소유권이전등기까지 보통 2~3개월 걸려요.
        각 단계마다 기한이 있으니 놓치지 않도록 캘린더에 표시해두세요.
      </p>

      <SectionBadge>매수 절차 6단계</SectionBadge>
      <Steps steps={PURCHASE_STEPS} />

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 계약 전 확인 ── */}
      <H2>계약하기 전에 꼭 확인할 것들</H2>
      <p style={body}>
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 인터넷등기소</a>에서
        등기사항전부증명서를 발급받는 게 첫 번째예요.
        소유자가 맞는지, 근저당이나 가압류가 없는지 반드시 확인하세요.
      </p>

      <GreenBox title="등기부등본 핵심 체크">
        <b>표제부</b>: 주소, 면적, 건물 구조 확인<br />
        <b>갑구</b>: 소유자가 매도인과 일치하는지, 가압류·가등기 유무<br />
        <b>을구</b>: 근저당(대출), 전세권 설정 여부와 금액
      </GreenBox>

      <SectionBadge>계약 전 체크리스트</SectionBadge>
      <Checklist items={PRE_CONTRACT_CHECKLIST} />

      <Divider />

      {/* ── 섹션 3: 등기 서류 ── */}
      <H2>등기할 때 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        잔금일에 매도인과 매수인이 서류를 교환해요. 법무사에게 위임하면 서류 준비와 제출을 대행해줘요.
        셀프등기도 가능하지만, 실수하면 보정 절차가 번거로우니 처음이면 법무사를 추천해요.
      </p>

      <SectionBadge>등기 서류</SectionBadge>
      <DocTable docs={REGISTRATION_DOCS} />

      <Divider />

      {/* ── 섹션 4: 2026년 변경사항 ── */}
      <H2>2026년에 달라진 규정이 있나요?</H2>
      <p style={body}>
        올해부터 부동산 거래 투명성 규제가 강화됐어요.
        계약금 현금 거래가 사실상 막혔고, 자금조달계획서도 더 꼼꼼해졌어요.
      </p>

      <BorderBox>
        <b>2026년 1월~</b>: 매매계약 신고 시 계약서 + 계약금 입금 증빙 제출 의무화<br /><br />
        <b>2026년 2월~</b>: 자금조달계획서 양식 변경 — 대출 유형·금융기관·자기자금 항목 구체화<br /><br />
        <b>생애최초 취득세 감면</b>: 2028년 말까지 연장, 1년 내 전입 + 실거주 조건
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산 거래신고법·등기 관련 법령을 바탕으로 작성됐어요. 세부 규정은 관할 등기소나 시·군·구청에 확인하세요." />
    </ArticleLayout>
  );
}
