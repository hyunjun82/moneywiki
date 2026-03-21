"use client";

// Q1: 소규모 사업장 사업주 또는 근로자로 두루누리 지원받을 수 있는지 알고 싶은 사람
// Q2: 신청 자격 확인 후 고용24에서 신청 완료
// Q3: 10인 미만 사업장, 월 보수 270만 원 이하, 지원율 80%, 신청 서류
// Q4: EligibilityChecker + Steps + DocTable + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "근로자 수가 10명 미만인 사업장이에요" },
  { id: "c2", label: "해당 근로자의 월 보수가 270만 원 이하예요" },
  { id: "c3", label: "고용보험·국민연금 신규 가입자거나 기존 미가입자예요" },
  { id: "c4", label: "사업주와 근로자 모두 지원 제외 대상에 해당하지 않아요" },
];

const STEPS = [
  {
    title: "자격 확인, 사업장 규모·보수 기준 체크",
    desc: "근로자 수 10인 미만, 해당 근로자 월 보수 270만 원 이하 여부를 먼저 확인해요. 월 보수는 비과세 항목을 제외한 금액이에요. 사업 종류에 따라 제외 업종이 있으니 고용24 공지사항에서 확인하세요.",
    tip: "월 보수 270만 원은 세전 금액 기준이에요",
  },
  {
    title: "고용24에서 온라인 신청",
    desc: "고용24(work24.go.kr)에 접속해서 두루누리 사회보험료 지원 신청을 해요. 사업주가 직접 신청하는 구조예요. 공동인증서(공인인증서)가 필요해요. 신청 후 국민건강보험공단에서 심사해요.",
    link: { label: "고용24에서 신청하기", href: "https://www.work24.go.kr" },
  },
  {
    title: "서류 제출 (요청 시)",
    desc: "온라인 신청 후 건강보험공단에서 추가 서류를 요청할 수 있어요. 근로계약서, 임금대장 등이 필요할 수 있어요. 미리 준비해두면 심사가 빠르게 처리돼요.",
    tip: "근로계약서는 신규 채용 즉시 작성해두는 게 좋아요",
  },
  {
    title: "매월 보험료 고지서에서 지원금 차감 확인",
    desc: "심사 통과 후 매월 국민연금·고용보험 보험료 고지서에서 지원금이 자동으로 차감돼요. 지원율은 최대 80%예요. 단, 지원금은 보험료에서 직접 차감되는 방식이라 별도로 돈이 들어오지는 않아요.",
    tip: "고지서에서 지원 적용 여부를 매월 확인하세요",
  },
];

const DOCS = [
  { name: "사업자등록증", required: true, where: "국세청 홈택스에서 출력 가능" },
  { name: "근로계약서", required: true, where: "사업장에서 직접 작성 보관" },
  { name: "임금대장 또는 급여명세서", required: true, where: "사업장에서 직접 작성 보관" },
  { name: "공동인증서", required: true, where: "고용24 온라인 신청 시 필요" },
  { name: "4대보험 가입 서류", required: false, where: "국민건강보험공단 요청 시" },
];

const CHECKLIST = [
  "근로자 수 10인 미만 여부 확인 (지원 기간 내 내내 10인 미만이어야 해요)",
  "월 보수 270만 원 이하 여부 확인 (비과세 제외 금액 기준)",
  "고용24 회원가입 및 공동인증서 준비",
  "근로계약서·임금대장 최신 버전으로 정리",
  "지원 제외 업종 해당 여부 확인",
  "매월 고지서에서 지원 차감 여부 확인",
];

const FAQS = [
  {
    q: "두루누리 지원금이 뭔가요?",
    a: "소규모 사업장(10인 미만)의 사업주와 근로자가 납부해야 할 고용보험·국민연금 보험료 일부를 정부가 대신 내주는 제도예요. 최대 80%까지 지원해요.",
  },
  {
    q: "근로자도 신청해야 하나요?",
    a: "사업주가 신청해요. 근로자가 따로 신청할 필요는 없어요. 단, 사업주가 신청해야 근로자도 혜택을 받을 수 있어요.",
  },
  {
    q: "10인 미만인데 지원 기간 중 직원이 늘어나면 어떻게 되나요?",
    a: "10인 이상이 되는 달부터 지원이 중단돼요. 다시 10인 미만으로 줄어도 즉시 재지원이 되지 않을 수 있어요. 고용24에서 변동 신고를 해야 해요.",
  },
  {
    q: "지원금은 언제부터 받을 수 있나요?",
    a: "신청 후 심사를 거쳐 승인되면 그달 보험료부터 지원이 적용돼요. 소급 적용은 되지 않아요. 빠를수록 유리해요.",
  },
  {
    q: "고용보험과 국민연금 모두 지원받을 수 있나요?",
    a: "네, 고용보험과 국민연금 두 가지 모두 신청 가능해요. 두 가지 동시에 신청하면 각각 최대 80% 지원을 받아요.",
  },
];

const REFERENCES = [
  {
    category: "법령·제도",
    items: [
      { label: "고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률", url: "https://www.law.go.kr/법령/고용보험및산업재해보상보험의보험료징수등에관한법률" },
      { label: "국민연금법 제100조의3: 두루누리 사회보험료 지원", url: "https://www.law.go.kr/법령/국민연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 두루누리 사회보험 신청", url: "https://www.work24.go.kr" },
      { label: "고용노동부 두루누리 안내", url: "https://www.moel.go.kr" },
      { label: "국민건강보험공단 두루누리 지원 안내", url: "https://www.nhis.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "두루누리-사회보험료-지원-대상-신청", title: "두루누리 사회보험료 지원 대상과 신청 방법", description: "지원 대상 조건과 신청 절차를 자세히 정리했어요." },
  { slug: "4대보험-계산기", title: "4대보험 계산기, 사업주·근로자 부담 금액", description: "급여에서 4대보험이 얼마나 떼이는지 계산해봐요." },
  { slug: "고용보험-가입-방법", title: "고용보험 가입 방법과 절차", description: "사업장 고용보험 성립신고부터 가입까지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용·복지 · 4대보험 · 두루누리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        두루누리 지원금 신청 조건과 서류<br />
        10인 미만 사업장이면 최대 80% 지원받아요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 10명도 안 되는 소규모 사업장에서 4대보험료가 부담되시죠? 두루누리 사회보험료 지원 제도를 활용하면 고용보험·국민연금 보험료를 최대 80%까지 줄일 수 있어요.
        사업주와 근로자 모두 혜택을 받아요. <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법 제100조의3</a>에 근거한 정부 지원 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우리 사업장이 지원 대상인지 먼저 체크해봐요</H2>
      <p style={body}>
        두루누리 지원을 받으려면 두 가지 핵심 조건을 모두 충족해야 해요.
        근로자 수와 월 보수 기준 둘 다 해당해야 해요.
      </p>

      <BorderBox>
        <strong>사업장 기준</strong>: 근로자 수 10인 미만 (지원 기간 내내)<br />
        <strong>근로자 기준</strong>: 월 보수 270만 원 이하 (비과세 제외)<br />
        <strong>지원 보험</strong>: 고용보험 + 국민연금 (동시 신청 가능)<br />
        <strong>지원율</strong>: 최대 80% (신규 가입자·저소득 기준)
      </BorderBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="두루누리 지원 대상일 가능성이 높아요. 아래 신청 절차를 따라 고용24에서 신청해보세요."
        partialMatchText="조건이 일부 맞지 않을 수 있어요. 고용24 또는 고용노동부(1350)에 문의하면 정확한 대상 여부를 확인할 수 있어요."
      />

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        사업주가 고용24에서 온라인으로 신청하면 돼요. 공동인증서와 근로계약서·임금대장이 미리 있으면 신청이 빠르게 처리돼요.
        신청 후 심사를 거쳐 그달 보험료부터 지원이 적용돼요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="고용·복지 정보" count={10} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 시 필요한 서류</H2>
      <p style={body}>
        기본 서류는 사업자등록증, 근로계약서, 임금대장이에요. 온라인 신청이라 직접 방문할 필요는 없어요.
        추가 서류가 필요하면 건강보험공단에서 연락이 와요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        신청 전 빠뜨리기 쉬운 항목들이에요. 특히 10인 미만 기준은 지원 기간 내내 유지해야 해요.
      </p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        월 보수 270만 원 이하 근로자가 10명이라면 국민연금+고용보험 사업주 부담분의 최대 80%를 아낄 수 있어요.<br />
        신청을 미룰수록 소급 적용이 안 되니 빠른 신청이 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        두루누리 지원금에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 두루누리 사회보험료 지원 제도를 바탕으로 작성됐어요. 지원 기준과 지원율은 변경될 수 있으니 최신 기준은 고용24 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
