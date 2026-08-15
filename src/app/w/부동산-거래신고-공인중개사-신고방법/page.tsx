"use client";
// Q1: 공인중개사를 통해 아파트를 매수한 후 부동산 거래신고를 누가 어떻게 해야 하는지 모르는 상황
// Q2: 공인중개사가 30일 이내 신고 완료 → 신고필증 받았는지 확인
// Q3: 신고 의무자(공인중개사/직거래 당사자), 30일 기한, 2026년 증빙자료 의무화, 신고방법, 500만원 과태료, 신고필증 필요
// Q4: BorderBox(신고 의무자 기준) + Steps(신고 절차) + DocTable(필요 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "(공인중개사 거래 시) 계약금 이체 후 통장 사본 중개사에게 전달",
    desc: "2026년 1월부터 주택 매매 신고 시 계약금 입금 증빙자료 제출이 의무화됐어요. 계약금은 통장 이체로 납부하고, 입금 확인 후 통장 사본을 중개사에게 주면 신고 서류가 갖춰져요.",
    tip: "현금으로 계약금 주면 증빙이 어려워요. 반드시 계좌이체로 해요",
  },
  {
    title: "공인중개사가 계약일로부터 30일 이내 신고",
    desc: "중개사가 관할 시·군·구청 또는 읍·면사무소에 부동산 거래신고서, 매매계약서, 계약금 입금 증빙자료를 제출해요. 공동중개인 경우 매도인·매수인 중개사가 함께 신고해요.",
    tip: "신고 완료 후 신고필증을 꼭 받아두세요, 등기 시 필요해요",
  },
  {
    title: "신고필증 수령 및 등기 진행",
    desc: "신고가 완료되면 신고필증이 발급돼요. 이 신고필증은 소유권 이전 등기를 할 때 반드시 필요해요. 중개사에게 신고필증을 받거나, 직접 관청에서 수령하면 돼요.",
    link: { label: "부동산등기 절차 확인", href: "/w/부동산-등기-절차" },
  },
];

const DOCS = [
  { name: "부동산 거래신고서", required: true, where: "중개사가 작성 (양식 있음)" },
  { name: "매매계약서", required: true, where: "중개사무소에서 작성·교부한 계약서" },
  { name: "계약금 입금 증빙자료", required: true, where: "통장 사본 또는 입금 확인서 (2026년 의무화)" },
  { name: "신분증", required: true, where: "직거래 시 매도인·매수인 각자" },
  { name: "신탁원부 (해당 시)", required: false, where: "신탁 등기 부동산의 경우" },
  { name: "건축물대장 등본 (해당 시)", required: false, where: "중개사가 제시 의무" },
];

const CHECKLIST = [
  "계약일로부터 30일 이내 신고 완료 여부 확인 (미신고 시 500만원 이하 과태료)",
  "계약금은 계좌이체로 납부 (현금 지급 시 증빙 어려움)",
  "신고필증 수령 확인 (등기 시 반드시 필요)",
  "직거래인 경우 매도인·매수인이 함께 관할 관청 방문",
  "공인중개사에게 30일 후 신고필증 받았는지 직접 확인",
  "외국인 매수 시 체류자격·국내 주소 등 추가 항목 신고 필요",
];

const FAQS = [
  {
    q: "공인중개사가 신고한다고 했는데 정말 제가 안 해도 되나요?",
    a: "네, 공인중개사가 계약서를 작성·교부한 경우에는 중개사가 신고 의무자예요. 거래 당사자는 따로 신고할 필요 없어요. 단, 30일 후에 신고필증을 받았는지 확인하는 건 매수인도 챙겨야 해요.",
  },
  {
    q: "직거래로 집을 샀는데 어떻게 신고하나요?",
    a: "매도인과 매수인이 함께 부동산 소재지 관할 시·군·구청이나 읍·면사무소에 가서 신고해야 해요. 정부24 온라인 신고도 가능해요.",
  },
  {
    q: "신고를 안 하면 어떻게 되나요?",
    a: "500만원 이하 과태료가 부과돼요. 신고필증도 없어서 소유권 이전 등기가 늦어질 수 있어요. 등기가 늦어지면 제3자에게 권리를 주장하기 어려워질 수 있어요.",
  },
  {
    q: "2026년에 바뀐 게 뭐예요?",
    a: "공인중개사가 주택 매매 신고할 때 계약서뿐 아니라 계약금 입금 증빙자료(통장 사본 등)도 의무 제출해야 해요. 허위 신고와 실거래가 조작을 막기 위한 조치예요. 외국인 주택 매수 시 체류자격 등 추가 신고 항목도 생겼어요.",
  },
  {
    q: "실거래가를 낮춰서 신고하면 어떻게 되나요?",
    a: "형사처벌 대상이 될 수 있어요. 허위 신고는 취득세 탈루로 이어지기 때문에 조세포탈죄가 적용될 수 있어요. 반드시 실거래가 그대로 신고해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "부동산 거래신고 등에 관한 법률", url: "https://www.law.go.kr/법령/부동산거래신고등에관한법률" },
      { label: "부동산 거래신고 등에 관한 법률 시행령", url: "https://www.law.go.kr/법령/부동산거래신고등에관한법률시행령" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "정부24 부동산 거래신고 온라인 신고", url: "https://www.gov.kr" },
      { label: "찾기쉬운 생활법령정보 - 부동산 거래신고", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=649" },
    ],
  },
];

const RELATED = [
  { slug: "부동산-등기-절차", title: "부동산 등기 절차", description: "거래신고 완료 후 소유권 이전 등기하는 전체 절차예요." },
  { slug: "전입신고-방법", title: "전입신고 방법", description: "이사 후 전입신고해서 대항력을 갖추는 방법이에요." },
  { slug: "주택임대차-신고", title: "주택임대차 신고 방법", description: "전세·월세 계약 후 임대차 신고하는 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 거래신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산 거래신고 공인중개사 신고방법<br />
        계약 후 30일 이내 2026년 바뀐 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공인중개사를 통해 집을 샀는데 거래신고를 누가 해야 하는지 헷갈리시죠?
        <a href="https://www.law.go.kr/법령/부동산거래신고등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 거래신고 등에 관한 법률</a>에 따르면, 공인중개사가 계약서를 작성했으면 중개사가 신고 의무자예요.
        거래 당사자가 따로 신고할 필요는 없지만, 계약일로부터 30일 안에 신고필증이 발급됐는지는 직접 챙겨야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누가 신고해야 하나요?</H2>
      <p style={body}>
        신고 의무자는 계약 방식에 따라 달라요. 공인중개사를 통했는지, 직거래인지에 따라 절차가 완전히 달라지니까 먼저 확인해야 해요.
      </p>

      <BorderBox>
        <strong>신고 의무자 기준</strong><br />
        공인중개사가 계약서 작성 → 공인중개사가 신고 (거래 당사자 신고 불필요)<br />
        공동중개 → 양쪽 중개사가 함께 신고<br />
        직거래 → 매도인 + 매수인이 함께 신고<br />
        <br />
        <strong>신고 기한</strong>: 계약일로부터 30일 이내<br />
        <strong>과태료</strong>: 미신고 또는 지연신고 시 500만원 이하
      </BorderBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공인중개사 거래 신고 절차 3단계</H2>
      <p style={body}>
        거래 당사자가 할 일은 많지 않아요. 계약금을 이체로 납부하고, 중개사에게 통장 사본 전달, 30일 후 신고필증 수령 확인이 전부예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>필요 서류 (2026년 기준)</H2>
      <p style={body}>
        2026년 1월부터 주택 매매는 계약금 입금 증빙자료 제출이 의무화됐어요. 계약서만 내면 되던 기존과 달리, 실제로 계약금이 오고갔다는 걸 증명해야 해요.
      </p>

      <SectionBadge>거래신고 제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <GreenBox>
        2026년 2월부터 외국인이 주택을 매수하는 경우 체류자격, 국내 주소 보유 여부, 183일 이상 거소 여부를 추가로 신고해야 해요. 토지거래허가구역 내 주택이라면 자금조달계획서와 입증 서류도 필요해요.
      </GreenBox>

      <Divider />

      <H2>거래 후 꼭 챙겨야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        신고 완료 후 신고필증을 받아두는 게 중요해요. 등기할 때 신고필증이 없으면 등기가 지연되고, 대항력 취득도 늦어질 수 있어요.
      </p>
      <SectionBadge>거래 후 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 부동산 거래신고 제도를 바탕으로 작성됐어요. 신고 기준과 제출 서류는 변경될 수 있으니 최신 내용은 관할 시·군·구청 또는 국토교통부에서 직접 안내받아봐요." />
    </ArticleLayout>
  );
}
