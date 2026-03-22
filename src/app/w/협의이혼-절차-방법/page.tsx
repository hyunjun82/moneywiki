"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 이혼하기로 결정했는데 법원에 어떻게 신청하고, 숙려기간은 얼마나 걸리는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 가정법원에 협의이혼을 신청하고, 숙려기간을 거쳐 최종 신고까지 완료하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 4단계 절차(신청→숙려→확인→신고), 숙려기간(자녀 있으면 3개월/없으면 1개월), 필요 서류, 3개월 내 신고.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(4단계 절차) + GreenBox(숙려기간) + DocTable(서류 목록) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps, DocTable,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "가정법원에 신청", desc: "부부가 함께 관할 가정법원에 출석해서 협의이혼의사확인 신청서를 제출해요. 대리 신청은 안 돼요.", tip: "등록기준지 또는 주소지 관할 가정법원에 가면 돼요." },
  { title: "숙려기간", desc: "미성년 자녀가 있으면 3개월, 없으면 1개월 기다려야 해요. 가정폭력 등 사유가 있으면 단축 가능해요." },
  { title: "이혼의사 확인", desc: "숙려기간이 끝나면 법원이 지정한 날짜에 부부가 함께 출석해요. 판사 앞에서 이혼 의사를 최종 확인받아요." },
  { title: "이혼 신고", desc: "확인서 등본을 받은 날부터 3개월 이내에 주민센터에서 이혼신고서를 제출하면 이혼이 완료돼요.", tip: "3개월을 넘기면 확인서가 무효가 돼요. 다시 처음부터 해야 해요." },
];

const DOCS = [
  { name: "협의이혼의사확인 신청서", required: true, where: "법원 민원실 또는 대법원 전자민원센터" },
  { name: "혼인관계증명서 (상세)", required: true, where: "정부24 또는 주민센터" },
  { name: "가족관계증명서 (상세)", required: true, where: "정부24 또는 주민센터" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "양육·친권자 결정 협의서", required: false, where: "미성년 자녀가 있는 경우에만" },
  { name: "신분증·도장", required: true, where: "부부 각각 지참" },
];

const FAQS = [
  {
    q: "협의이혼 비용이 얼마나 드나요?",
    a: "법원 수수료는 거의 없어요. 인지대 몇 천원 수준이에요. 변호사를 선임하면 별도 비용이 들지만, 합의가 됐다면 변호사 없이 직접 진행할 수 있어요.",
  },
  {
    q: "부부 중 한 명이 외국에 있으면 어떻게 하나요?",
    a: "영사관에서 이혼의사 확인을 받을 수 있어요. 재외공관 공증을 통해 진행하는 방법도 있으니 관할 가정법원에 문의하세요.",
  },
  {
    q: "숙려기간 중에 마음이 바뀌면요?",
    a: "아무 때나 철회할 수 있어요. 숙려기간 중이나 확인 기일 전까지 법원에 취하서를 제출하면 돼요.",
  },
  {
    q: "재산분할은 이혼 전에 해야 하나요?",
    a: "이혼 전에 합의하는 게 좋지만, 이혼 후 2년 이내에 청구할 수도 있어요. 합의가 안 되면 법원에 재산분할 심판을 청구할 수 있어요.",
  },
  {
    q: "협의이혼과 재판이혼은 뭐가 다른가요?",
    a: "협의이혼은 부부가 합의해서 진행하고 숙려기간만 거치면 돼요. 재판이혼은 한쪽이 동의 안 할 때 소송으로 진행하며 6개월~2년 이상 걸릴 수 있어요.",
  },
  {
    q: "자녀 양육권은 어떻게 결정하나요?",
    a: "협의이혼이면 부부가 합의해서 정해요. 합의가 안 되면 법원이 자녀의 이익을 고려해 결정해요. 양육비 지급에 대해서도 함께 정해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "민법 제836조의2 (협의이혼)", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령정보 — 협의이혼", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=2&cciNo=2&cnpClsNo=1" },
      { label: "대한민국 법원 전자민원센터", url: "https://help.scourt.go.kr/nm/min_3/min_3_2/min_3_2_1/index.html" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        협의이혼, 어디서부터 시작하나요?<br />
        신청부터 신고까지 4단계 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼하기로 했는데 뭘 먼저 해야 할지 막막하죠.
        협의이혼은 가정법원 신청부터 주민센터 신고까지 4단계로 진행돼요.
        자녀 유무에 따라 걸리는 기간이 달라요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>협의이혼 절차 4단계</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=2&cciNo=2&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>와
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제836조의2</a>에 따르면,
        협의이혼은 법원 신청 → 숙려기간 → 의사확인 → 이혼신고 순서로 진행돼요.
        부부가 함께 출석해야 하고, 대리인은 안 돼요.
      </p>

      <SectionBadge>4단계 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>숙려기간은 얼마나 걸리나요?</H2>
      <p style={body}>
        숙려기간은 부부가 신중하게 결정할 시간을 주려고 만든 제도예요.
        2008년 민법 개정으로 도입됐어요.
      </p>

      <GreenBox>
        <strong>미성년 자녀가 있으면</strong> → 3개월<br />
        <strong>미성년 자녀가 없으면</strong> → 1개월<br />
        가정폭력 등 급박한 사유가 있으면 법원에 기간 단축·면제를 신청할 수 있어요.
      </GreenBox>

      <p style={body}>
        임신 중인 자녀도 미성년 자녀에 포함돼요.
        숙려기간 중에 마음이 바뀌면 취하서를 제출해서 철회할 수 있어요.
      </p>

      <Divider />

      <H2>준비해야 할 서류는 뭔가요?</H2>
      <p style={body}>
        <a href="https://help.scourt.go.kr/nm/min_3/min_3_2/min_3_2_1/index.html" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 전자민원센터</a>에서
        신청서 양식을 다운로드할 수 있어요.
        서류는 법원 방문 전에 미리 준비하면 시간을 아낄 수 있어요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="이혼 후 해야 할 것">
        · <a href="/w/이혼-재산분할-협의-불가-대응" style={{ color: "#1D9E75", textDecoration: "underline" }}>재산분할</a>: 이혼 후 2년 이내 청구 가능<br />
        · 양육비: 미성년 자녀가 있으면 양육비 약정서 작성<br />
        · 건강보험: 피부양자 자격 변경 신고 필요<br />
        · 주소 이전: 전입신고 및 우편물 전환 신청
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법과 가사소송법을 바탕으로 작성됐어요. 개별 사안은 법률구조공단(132) 또는 가정법원에 상담하세요." />
    </ArticleLayout>
  );
}
