"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 사업주가 직원 사회보험료 부담 줄이고 싶어 두루누리 지원제도 찾는 상황
// Q2: 우리 사업장이 두루누리 지원 대상인지 자격 조건을 정확히 확인
// Q3: 지원 대상 조건(10인 미만·270만 원), 지원 제외 업종, 지원율·기간, 대상 판정 기준
// Q4: EligibilityChecker + BorderBox + Checklist + FAQ (자격 판단 중심)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "근로자 수가 10인 미만인 사업장을 운영 중이에요" },
  { id: "c2", label: "지원 대상 근로자의 월 보수가 270만 원 이하예요" },
  { id: "c3", label: "지원 대상 근로자가 고용보험 또는 국민연금 신규 가입자이거나 기존 미가입자예요" },
  { id: "c4", label: "제외 업종(건설업 월 보수 조건 등)에 해당하지 않아요" },
];

const STEPS = [
  {
    title: "고용24에서 두루누리 신청",
    desc: "고용24(work24.go.kr)에 사업주가 직접 로그인해서 두루누리 사회보험료 지원 신청 메뉴로 들어가요. 공동인증서가 있어야 해요. 사업자등록번호와 근로자 정보를 입력해요.",
    link: { label: "고용24 두루누리 신청", href: "https://www.work24.go.kr" },
  },
  {
    title: "국민건강보험공단 심사 (약 1~2주)",
    desc: "신청 후 국민건강보험공단에서 사업장 규모, 근로자 보수, 보험 가입 여부 등을 심사해요. 추가 서류가 필요하면 공단에서 연락이 와요. 심사 결과는 고용24에서 확인 가능해요.",
    tip: "심사 중 서류 요청이 오면 빠르게 제출해야 지원이 늦어지지 않아요",
  },
  {
    title: "승인 후 보험료 고지서에서 지원 차감 확인",
    desc: "승인되면 그달 보험료 고지서부터 지원금이 자동 차감돼요. 고용보험과 국민연금을 모두 신청한 경우 두 고지서에서 각각 차감돼요. 고지서 금액이 이전보다 줄었는지 확인하세요.",
    tip: "첫 달 고지서에서 바로 반영되는지 꼭 확인하세요",
  },
  {
    title: "변동 사항 신고 (근로자 수 변경 등)",
    desc: "지원 기간 중 근로자 수가 10인 이상으로 늘거나, 보수가 270만 원을 초과하거나, 근로자가 퇴직하면 변동 신고를 해야 해요. 변동 신고 없이 지원받으면 나중에 환수될 수 있어요.",
    tip: "근로자 채용·퇴직이 있을 때마다 고용24에서 즉시 신고하세요",
  },
];

const CHECKLIST = [
  "사업장 근로자 수 10인 미만 여부 확인",
  "지원 대상 근로자 월 보수 270만 원 이하 여부 확인",
  "고용24 사업주 계정 및 공동인증서 준비",
  "근로계약서·임금대장 최신 버전 정리",
  "고용보험·국민연금 중 미가입 항목 확인",
  "신청 후 첫 고지서에서 지원 차감 반영 확인",
  "근로자 변동 시 즉시 변동 신고 필수",
];

const FAQS = [
  {
    q: "두루누리 지원율이 80%면 사업주 부담이 20%만 남는 건가요?",
    a: "기본적으로 그래요. 단, 지원율은 신규 가입자·저소득 기준으로 다를 수 있어요. 기존 가입자도 일부 지원받는 경우가 있어요. 정확한 지원율은 고용24 또는 공단에서 확인하세요.",
  },
  {
    q: "근로자도 두루누리 혜택을 받나요?",
    a: "네, 사업주 부담분뿐 아니라 근로자 부담분도 지원돼요. 사업주가 신청하면 근로자 부담분도 함께 차감돼요. 단, 신청은 사업주가 해야 해요.",
  },
  {
    q: "고용보험만 신청해도 되나요, 국민연금도 함께 해야 하나요?",
    a: "둘 중 하나만 신청해도 돼요. 고용보험·국민연금 각각 별도로 신청할 수 있어요. 두 가지 모두 신청하면 각각 지원받아요.",
  },
  {
    q: "두루누리 지원 기간이 있나요?",
    a: "36개월까지 지원받을 수 있어요. 지원 기간이 종료된 후에도 조건이 유지되면 재신청이 가능한 경우가 있어요. 고용24에서 잔여 지원 기간을 확인하세요.",
  },
  {
    q: "10인 미만인데 어떤 근로자가 지원 대상인가요?",
    a: "사업장 전체 근로자 수가 10인 미만일 때, 월 보수 270만 원 이하인 근로자가 대상이에요. 모든 근로자를 일괄 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·제도",
    items: [
      { label: "국민연금법 제100조의3: 두루누리 사회보험료 지원", url: "https://www.law.go.kr/법령/국민연금법" },
      { label: "고용보험법 관련 조항", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 두루누리 신청 및 안내", url: "https://www.work24.go.kr" },
      { label: "고용노동부 두루누리 사회보험료 지원 안내", url: "https://www.moel.go.kr" },
      { label: "국민건강보험공단 두루누리 심사·처리", url: "https://www.nhis.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "두루누리-지원금-신청-조건-서류", title: "두루누리 지원금 신청 조건과 서류", description: "신청 자격 조건과 필요 서류를 한번에 정리했어요." },
  { slug: "4대보험-계산기", title: "4대보험 계산기, 사업주·근로자 부담 금액", description: "급여에서 4대보험이 얼마나 떼이는지 계산해봐요." },
  { slug: "고용보험-가입-방법", title: "고용보험 가입 방법과 절차", description: "사업장 고용보험 성립신고부터 가입까지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용·복지 · 4대보험 · 두루누리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        두루누리 사회보험료 지원 대상과 신청 방법<br />
        사업주·근로자 보험료 최대 80% 줄이는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        10인 미만 소규모 사업장 운영하면서 4대보험료가 부담스럽죠? 두루누리 사회보험료 지원 제도를 사용하면 고용보험·국민연금 보험료를 최대 80%까지 지원받을 수 있어요.
        사업주 부담분뿐 아니라 근로자 부담분도 함께 지원돼요. <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법 제100조의3</a>에 근거한 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지원 대상 조건, 이 두 가지가 핵심이에요</H2>
      <p style={body}>
        두루누리 지원을 받으려면 사업장 규모와 개별 근로자 보수 조건 둘 다 맞아야 해요.
        어느 하나라도 안 맞으면 지원에서 제외돼요.
      </p>
      <p style={body}>
        근로자 수는 사업장 전체 기준이고, 보수는 개별 근로자 기준이에요.
        일용직·파견근로자·건설 일용직 등은 별도 기준이 적용되니 주의해야 해요.
      </p>

      <BorderBox>
        <strong>핵심 조건 2가지</strong><br />
        ① 사업장 전체 근로자 수 10인 미만<br />
        ② 해당 근로자 월 보수 270만 원 이하 (비과세 항목 제외)<br />
        <br />
        <strong>지원 보험</strong>: 고용보험 + 국민연금 (각각 또는 동시 신청)<br />
        <strong>지원율</strong>: 최대 80% (신규 가입자·저소득 기준)<br />
        <strong>지원 기간</strong>: 최대 36개월
      </BorderBox>

      <SectionBadge>지원 대상 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="두루누리 지원 대상에 해당할 가능성이 높아요. 고용24에서 신청해보세요."
        partialMatchText="조건 일부가 맞지 않을 수 있어요. 고용24 또는 고용노동부(1350)에 문의하면 정확한 대상 여부를 확인할 수 있어요."
      />

      <Divider />

      <H2>지원 제외 대상도 꼭 알아둬야 해요</H2>
      <p style={body}>
        10인 미만이고 270만 원 이하라도 제외되는 경우가 있어요.
        재산세 과세표준 합계 6억 원 초과이거나 종합소득 4,300만 원 초과인 근로자는 제외돼요.
        사업주의 배우자, 직계 존비속도 제외 대상이에요.
      </p>
      <p style={body}>
        지원 기간 중에 근로자 수가 10인 이상으로 늘어나면 그달부터 지원이 중단돼요.
        다시 10인 미만이 돼도 재신청해야 이어받을 수 있어요.
      </p>

      <Divider />

      <H2>신청은 고용24에서 온라인으로 해요</H2>
      <p style={body}>
        자격 조건이 맞으면 고용24에서 바로 신청할 수 있어요. 구체적인 신청 절차와 필요 서류는{" "}
        <a href="/w/두루누리-지원금-신청-조건-서류" style={{ color: "#1D9E75", textDecoration: "underline" }}>두루누리 지원금 신청 조건과 서류</a> 글에서 단계별로 정리했어요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="고용·복지 정보" count={10} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 전후 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지원 기간 중 근로자 변동이 있으면 즉시 신고해야 해요. 신고 안 하면 환수 대상이 될 수 있어요.
      </p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        월 보수 270만 원 이하 근로자 1명 기준 고용보험+국민연금 사업주 부담분이 약 25만~30만 원이라면,<br />
        두루누리 지원 시 최대 20만~24만 원을 아낄 수 있어요.<br />
        근로자가 많을수록 절감액도 비례해서 커져요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        두루누리 사회보험료 지원에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 두루누리 사회보험료 지원 제도를 바탕으로 작성됐어요. 지원 기준과 지원율은 변경될 수 있으니 최신 기준은 고용24 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
