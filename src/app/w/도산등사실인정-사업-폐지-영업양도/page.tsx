"use client";

// Q1. 회사가 법원 파산 없이 문 닫아서 밀린 임금을 못 받고 있는 상황이에요.
// Q2. 도산등사실인정 요건을 확인하고 고용노동부에 신청서를 제출하는 행동.
// Q3. 도산등사실인정 요건(사업폐지+지급불능), 영업양도 시 양수인 연대책임, 신청 절차, 필요 서류, 기한(인정 후 2년 내 대지급금).
// Q4. GreenBox(핵심) + EligibilityChecker(자격확인) + Steps(절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "closed", label: "사업장이 실제로 문을 닫고 영업을 완전히 중단했어요" },
  { id: "noAsset", label: "사업주의 재산이 없거나 부채가 자산보다 많아요" },
  { id: "unpaid", label: "퇴직 전 3년 이내 임금·퇴직금·휴업수당이 밀려 있어요" },
  { id: "noBankruptcy", label: "법원 파산·회생 절차가 진행되지 않은 상태예요" },
];

const STEPS_DATA = [
  { title: "관할 지방고용노동청 확인", desc: "사업장 소재지 관할 고용노동청을 찾아요. 고용노동부 홈페이지나 1350 전화로 확인 가능해요." },
  { title: "신청서 작성 및 서류 준비", desc: "도산등사실인정 신청서, 사업폐지 증빙, 임금체불 증빙 서류를 준비해요." },
  { title: "고용노동청에 신청서 제출", desc: "방문 또는 우편으로 제출해요. 접수되면 근로감독관이 현장 조사를 진행해요.", tip: "임금채권 소멸시효(3년) 이내에 신청해야 해요." },
  { title: "인정서 발급", desc: "조사 결과 요건 충족 시 도산등사실인정서가 발급돼요. 보통 1~2개월 소요돼요." },
  { title: "근로복지공단에 대지급금 신청", desc: "인정서 발급일로부터 2년 이내에 근로복지공단에 도산대지급금을 신청해요." },
];

const DOCS_DATA = [
  { name: "도산등사실인정 신청서", required: true, where: "고용노동부 홈페이지 양식 다운로드" },
  { name: "폐업사실증명원 또는 사업자등록 말소 확인서", required: true, where: "세무서 또는 홈택스" },
  { name: "근로계약서 또는 재직증명서", required: true, where: "본인 보관 또는 회사 요청" },
  { name: "임금체불 관련 증빙(급여명세서, 통장 내역)", required: true, where: "본인 보관" },
  { name: "사업주 재산 관련 정보(알고 있는 범위)", required: false, where: "자유 서식 작성" },
];

const FAQS = [
  { q: "사업주가 도주해서 연락이 안 되는데 신청할 수 있나요?", a: "가능해요. 사업주가 소재불명이면 오히려 사실상 도산으로 인정받기 쉬워요. 사업장 폐쇄, 연락불가 등을 증빙하면 돼요." },
  { q: "도산등사실인정 받으면 밀린 임금을 전부 받나요?", a: "전액은 아니에요. 도산대지급금은 퇴직 전 최종 3개월 임금 + 퇴직금 + 최종 3개월 휴업수당이 한도예요. 상한액(월 약 400만원)도 있어요." },
  { q: "영업양도가 있었으면 새 사업주에게도 청구할 수 있나요?", a: "양수인이 채권채무 관계를 이어받았다면 가능해요. 근로기준법 제44조의2에 따라 양수인이 연대 책임을 져요. 영업양도 계약서를 확인하세요." },
  { q: "사업 폐지가 아니라 일부만 축소한 경우에도 되나요?", a: "어려워요. 영업이 일부 계속되면 사실상 도산으로 보기 힘들어요. 완전히 중단돼야 해요." },
  { q: "인정서 발급까지 얼마나 걸리나요?", a: "보통 1~2개월이에요. 현장 조사, 사업주 진술 청취 등 절차가 있어서 빨라도 3~4주는 걸려요." },
  { q: "법원 파산과 도산등사실인정 차이가 뭔가요?", a: "법원 파산은 법원이 선고하는 거고, 도산등사실인정은 고용노동부 장관이 인정하는 거예요. 법원 파산이 없어도 사실상 도산이면 노동부가 인정해줘요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "임금채권보장법", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제44조의2 (영업양도 연대책임)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 도산등사실인정 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "도산대지급금-신청-방법-절차", title: "도산대지급금 신청 방법", description: "인정서 받은 후 근로복지공단에 대지급금 신청하는 절차예요." },
  { slug: "도산등사실인정-신청-방법-서류", title: "도산등사실인정 신청 서류", description: "신청서 작성법과 필요 서류를 상세히 알려드려요." },
  { slug: "임금체불-신고-방법", title: "임금체불 신고 방법", description: "밀린 임금을 받기 위한 노동청 진정 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 임금채권 · 도산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 문 닫고 임금을 못 받았다면?<br />
        도산등사실인정 요건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사장이 야반도주하거나 폐업해버렸는데, 법원 파산 절차도 안 밟았죠?
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라
        고용노동부에서 &lsquo;사실상 도산&rsquo;을 인정받으면 밀린 임금·퇴직금을 국가가 대신 지급해요.
        사업 폐지와 영업양도 상황별 조건을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 핵심 요건 ── */}
      <H2>도산등사실인정, 어떤 경우에 받나요?</H2>
      <p style={body}>
        핵심은 두 가지예요. 사업이 실제로 중단됐고, 임금을 줄 능력이 없어야 해요.
        법원 파산 절차 없이 그냥 문 닫는 중소기업이 대부분이라 이 제도가 꼭 필요하죠.
      </p>
      <p style={body}>
        고용노동부 장관이 인정하면 근로복지공단에서 도산대지급금(밀린 임금·퇴직금)을 대신 지급해요.
        단, 인정서 발급일로부터 2년 이내에 대지급금을 신청해야 하니 서두르세요.
      </p>

      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="도산등사실인정 신청 요건에 해당돼요. 관할 고용노동청에 신청하세요."
        partialMatchText="일부 요건이 안 맞아요. 해당 조건을 자세히 확인해보세요."
      />

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 사업폐지 vs 영업양도 ── */}
      <H2>사업 폐지와 영업양도, 뭐가 다른가요?</H2>
      <p style={body}>
        임금채권 처리 방식이 완전히 달라져요. 사업이 아예 없어지는 건 &lsquo;폐지&rsquo;, 다른 사람에게 넘어가는 건 &lsquo;양도&rsquo;예요.
      </p>

      <GreenBox title="핵심 차이">
        <b>사업 폐지</b>: 사업 종료 → 원 사업주만 책임 → 지급불능이면 도산등사실인정 → 대지급금<br /><br />
        <b>영업양도</b>: 새 사업주에게 인수 → <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제44조의2</a>에 따라 양수인 연대책임 → 양수인에게 직접 청구 가능
      </GreenBox>

      <p style={body}>
        실무에서는 영업양도 후 원 사업주가 나머지를 폐업하는 경우가 많아요.
        이때는 양수인에게 직접 청구하면서 동시에 원 사업주에 대한 도산등사실인정을 병행할 수 있어요.
      </p>

      <BorderBox>
        영업양도 시 양수인이 채무까지 이어받았는지는 양도 계약서에 달려 있어요.
        계약서에 &ldquo;부채 인수&rdquo; 조항이 있는지 반드시 확인하세요.
        조항이 없어도 사업 전부를 양수받았다면 연대책임이 인정된 판례가 있어요.
      </BorderBox>

      <Divider />

      {/* ── 섹션 3: 신청 절차 ── */}
      <H2>신청은 어떤 순서로 하나요?</H2>
      <p style={body}>
        관할 고용노동청에 신청서를 내면 근로감독관이 현장 조사를 해요.
        요건이 확인되면 인정서를 발급하고, 이후 근로복지공단에 대지급금을 신청하는 구조예요.
      </p>

      <SectionBadge>신청 절차 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      {/* ── 섹션 4: 필요 서류 ── */}
      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        폐업 사실을 증명하는 서류와 임금이 밀려 있다는 증빙이 핵심이에요.
        사업주 재산 정보는 알고 있는 범위에서만 제출하면 돼요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS_DATA} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법·근로기준법을 바탕으로 작성됐어요. 개별 사안은 고용노동부 1350에 문의하세요." />
    </ArticleLayout>
  );
}
