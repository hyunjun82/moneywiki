"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "건설근로자-퇴직금";

const CHECK_ITEMS = [
  { id: "c1", label: "건설현장에서 일용직·일당직으로 일해요" },
  { id: "c2", label: "건설근로자공제회에 공제부금이 적립되고 있어요" },
  { id: "c3", label: "1년 이상 건설업에 종사했어요" },
  { id: "c4", label: "퇴직공제금 수령 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "days", label: "연간 건설현장 근무 일수", min: 50, max: 252, step: 10, defaultValue: 150, format: (v: number) => `${v}일` },
  { id: "years", label: "건설업 종사 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직공제금 (적립 기준)",
    getValue: (v: Record<string, number>) => v.days * v.years * 9600,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 근무일수",
    getValue: (v: Record<string, number>) => v.days * v.years,
    format: (v: number) => `약 ${v.toLocaleString()}일`,
  },
];

const DOCS = [
  { name: "건설근로자 퇴직공제금 지급 신청서", required: true, where: "건설근로자공제회 홈페이지 또는 방문" },
  { name: "신분증 (주민등록증·운전면허증)", required: true, where: "본인 지참" },
  { name: "통장 사본", required: true, where: "본인 계좌" },
  { name: "피공제자 확인서류 (공사현장 확인 가능 서류)", required: false, where: "현장 소장 또는 원청" },
];

const STEPS = [
  {
    title: "공제부금 적립 확인",
    desc: "건설근로자공제회 홈페이지(cretirement.or.kr) 또는 앱에서 내 공제부금 적립 내역을 조회할 수 있어요. 원청 또는 하청 사업주가 나 대신 적립해요. 미적립 기간이 있으면 사업주에게 적립 요청을 해야 해요.",
    tip: "건설근로자공제회 앱에서 적립 내역 실시간 조회 가능",
  },
  {
    title: "퇴직공제금 수령 자격 확인",
    desc: "퇴직공제금은 건설업 종사 기간이 252일 이상이어야 신청 가능해요. 단, 일용·상용 구분 없이 건설업 전체 근무일수를 합산해요. 여러 현장에서 근무한 일수를 모두 합칠 수 있어요.",
    tip: "252일은 약 1년치 건설업 근무 일수예요",
  },
  {
    title: "온라인 또는 방문 신청",
    desc: "건설근로자공제회 홈페이지나 앱에서 온라인 신청이 가능해요. 방문 신청은 전국 지부에서 할 수 있어요. 신분증과 통장 사본만 있으면 돼요.",
    tip: "온라인 신청이 방문보다 빠르게 처리돼요",
  },
  {
    title: "지급 및 수령",
    desc: "신청 후 약 7~14일 이내에 통장으로 입금돼요. 퇴직공제금은 퇴직소득세 대상이에요. 근속일수에 따라 세금이 결정되고 원천징수 후 지급해요.",
    tip: "공제금 조회·신청은 건설근로자공제회(1588-0075)로 문의",
  },
];

const CHECKLIST = [
  "공제부금 적립 내역 — 공제회 앱·홈페이지에서 조회",
  "수령 자격 — 건설업 종사 252일 이상",
  "신청 서류 — 신분증 + 통장 사본",
  "미적립 기간 — 사업주에게 소급 적립 요청 가능",
  "퇴직소득세 — 공제금 수령 시 원천징수",
];

const FAQS = [
  {
    q: "건설근로자공제회 퇴직공제금이 뭔가요?",
    a: "건설현장 일용근로자를 위한 퇴직금 제도예요. 일반 퇴직금과 달리, 공사 발주자·원청·하청이 근무일당 공제부금을 적립해요. 여러 현장을 옮겨도 합산해서 받을 수 있어요.",
  },
  {
    q: "건설현장 일용직도 일반 퇴직금을 받을 수 있나요?",
    a: "같은 사업주 밑에서 1년 이상 계속 근무하면 일반 퇴직금도 받을 수 있어요. 건설공제회 퇴직공제금과는 별개예요. 단, 일용직은 계속 근무 인정이 어려운 경우가 많아요.",
  },
  {
    q: "공제부금이 미적립된 기간이 있으면 어떻게 하나요?",
    a: "사업주가 적립 의무를 이행하지 않은 거예요. 건설근로자공제회에 신고하면 사업주에게 소급 납부 명령이 내려져요. 미적립 기간 공제금도 받을 수 있어요.",
  },
  {
    q: "퇴직공제금과 실업급여를 동시에 받을 수 있나요?",
    a: "퇴직공제금은 퇴직급여고, 실업급여는 고용보험에서 나오는 거예요. 중복 수급 제한은 없어요. 퇴직공제금을 받아도 실업급여 신청이 가능해요.",
  },
  {
    q: "252일이 안 됐는데 적립된 공제부금은 어떻게 되나요?",
    a: "252일 미만이면 퇴직공제금으로 지급받을 수 없어요. 다시 건설업에 취업하면 이전 적립 일수에 합산돼요. 건설업 완전 이탈 시에는 일정 요건에서 반환이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "건설근로자의 고용개선 등에 관한 법률 — 퇴직공제", url: "https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "건설근로자공제회 — 퇴직공제금 신청 안내", url: "https://www.cretirement.or.kr" },
      { label: "고용노동부 — 건설근로자 퇴직공제 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금", title: "일용직 퇴직금 받는 방법", description: "일용직 퇴직금 조건과 신청 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 근무 조건과 예외 사항." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때 신고", description: "고용노동부 진정 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 건설근로자 · 퇴직공제금</p>
        <h1 style={body.h1}>
          건설현장 일용직도 퇴직금을 받을 수 있나요?
          <br />
          <span style={body.h1sub}>건설근로자공제회 퇴직공제금 조회부터 수령까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        건설현장을 여러 곳 옮겨 다니면 퇴직금을 받기 어렵다고 생각하는 분들이 많아요. 하지만 건설근로자는 일반 근로자와 다른 퇴직금 제도가 있어요. 바로 <strong>건설근로자공제회 퇴직공제금</strong>이에요. 현장이 바뀌어도 근무일수가 합산되는 구조라서, 여러 곳에서 일했더라도 나중에 한꺼번에 받을 수 있어요.
      </p>
      <p style={body.prose}>
        공제부금은 원청이나 하청 사업주가 근무일당 9,600원씩 쌓아줘요. 본인이 직접 납부하는 게 아니에요. 건설업에서 252일 이상 일하면 신청 자격이 생기고, 공제회 홈페이지나 앱에서 간단하게 신청할 수 있어요. 아래에서 제도 구조부터 신청 절차까지 하나씩 풀어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>건설근로자 퇴직공제금, 어떤 제도인가요?</H2>

      <p style={body.prose}>
        건설근로자 퇴직공제금은 <a href="https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" style={body.link} target="_blank" rel="noopener noreferrer">건설근로자의 고용개선 등에 관한 법률</a>에 따라 운영되는 제도예요. 건설업 특성상 한 현장에서 오래 일하기 어렵기 때문에, 일반 퇴직금 대신 별도의 공제 적립 방식을 쓰는 거예요. 현장을 옮길 때마다 퇴직금이 끊기는 문제를 해결하기 위해 만들어졌어요.
      </p>

      <GreenBox>
        건설근로자 퇴직공제금 핵심 구조<br />
        · 적립 주체: 원청·하청 사업주 (근로자 본인 부담 없음)<br />
        · 적립 단가: 근무일당 9,600원 (2024년 기준)<br />
        · 수령 자격: 건설업 종사 252일 이상<br />
        · 신청처: 건설근로자공제회(cretirement.or.kr)
      </GreenBox>

      <p style={body.prose}>
        공제부금은 사업주가 근무일마다 적립해요. 근로자가 따로 신청하거나 납부할 필요가 없어요. 문제는 사업주가 적립을 빠뜨리는 경우예요. 공제회 앱에서 내 적립 내역을 주기적으로 확인하는 게 중요한 이유예요. 미적립 기간이 발견되면 사업주에게 소급 납부를 요청할 수 있어요.
      </p>

      <p style={body.prose}>
        <a href="/w/일용직-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>일용직 퇴직금</a>과 달리 건설공제금은 여러 사업주 아래서 일한 기간을 모두 합산해요. 오늘은 A 현장, 내일은 B 현장에서 일해도 두 곳의 근무일수가 모두 내 계좌에 쌓여요. 건설업 특성에 맞게 설계된 제도예요.
      </p>

      <Divider />

      {/* 섹션 2 */}
      <H2>내 퇴직공제금이 얼마나 쌓였나요?</H2>

      <p style={body.prose}>
        연간 근무일수와 종사 기간을 입력하면 예상 퇴직공제금을 계산할 수 있어요. 적립 단가는 2024년 기준 일당 9,600원이에요. 실제 금액은 건설근로자공제회 홈페이지나 앱에서 내 계좌를 직접 조회하면 정확하게 확인할 수 있어요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 적립금은 연도별 적립 단가 변동, 미적립 기간 등에 따라 다를 수 있어요. 공제회 앱에서 정확한 잔액을 조회하세요."
      />

      <p style={body.prose}>
        5년 동안 연 150일 근무했다면 약 720만원이 쌓여 있어요. 10년이면 1,400만원을 넘어요. 적립 단가는 매년 조금씩 오르는 경향이 있어서, 실제 금액은 위 계산보다 더 많을 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>신청에 필요한 서류</H2>

      <p style={body.prose}>
        퇴직공제금 신청에 필요한 서류는 많지 않아요. 신분증과 통장 사본만 있으면 기본적으로 신청이 가능해요. 온라인 신청이라면 공제회 앱에 로그인해서 공동인증서로 본인 확인만 하면 돼요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        피공제자 확인서류는 공제회에서 근무 사실을 확인하기 어려운 경우에만 요청해요. 적립 내역이 공제회 시스템에 정상 등록된 경우라면 별도 서류 없이 처리돼요. 현장 소장이 확인서를 써주지 않아도 원청을 통해 확인할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>퇴직공제금 수령 절차 4단계</H2>

      <p style={body.prose}>
        신청 전에 내 공제부금이 제대로 적립됐는지 먼저 확인해야 해요. 사업주가 적립을 빠뜨린 기간이 있으면 나중에 받을 수 있는 금액이 줄어들거든요. 아래 4단계를 순서대로 따라가면 수령까지 무리 없이 진행할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        수령 후에는 퇴직소득세가 원천징수돼요. <a href="/w/퇴직금-소득세" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는 근속일수에 따라 계산되고, 세후 금액이 통장으로 입금돼요. 세금 납부 내역은 퇴직소득원천징수영수증으로 확인할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직공제금 체크리스트</H2>

      <p style={body.prose}>
        신청 전에 아래 항목들을 하나씩 점검해보세요. 특히 미적립 기간 확인은 놓치기 쉬운데, 나중에 추가 신청이 어려울 수 있어요. 공제회 앱에서 전체 적립 내역을 조회하는 게 첫 번째예요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        252일 미만이어도 건설업을 계속 하면 일수가 쌓여요<br />
        · 지금 당장 못 받더라도 나중에 다시 건설업에 취업하면 이전 일수에 합산돼요<br />
        · 건설업을 완전히 그만둘 경우에는 일정 요건에서 반환 신청도 가능해요<br />
        · 문의: 건설근로자공제회 1588-0075
      </GreenBox>

      <p style={body.prose}>
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금을 받지 못했을 때</a>는 고용노동부에 진정을 넣는 방법도 있어요. 건설공제회 퇴직공제금이 아닌 일반 퇴직금 분쟁이라면 노동청 경로를 활용할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 6 */}
      <H2>자주 묻는 것들</H2>

      <p style={body.prose}>
        건설근로자 퇴직공제금에 대해 많이 물어보는 질문들을 정리했어요. 제도가 낯선 분들도 아래 내용을 읽으면 전체 구조를 파악할 수 있어요.
      </p>

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
