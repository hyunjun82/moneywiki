"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "건설현장에서 일용직·일당직으로 일하고 있어요" },
  { id: "c2", label: "건설근로자공제회에 공제부금이 적립되고 있어요" },
  { id: "c3", label: "건설업 종사 기간이 252일 이상이에요" },
  { id: "c4", label: "퇴직공제금 수령 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "days", label: "연간 건설현장 근무 일수", min: 50, max: 252, step: 10, defaultValue: 150, format: (v: number) => `${v}일` },
  { id: "years", label: "건설업 종사 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직공제금 (일당 9,600원 기준)",
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
  { name: "피공제자 확인서류", required: false, where: "현장 소장 또는 원청 (공제회 요청 시)" },
];

const STEPS = [
  {
    title: "공제부금 적립 내역 확인",
    desc: "원청 또는 하청 사업주가 근무일당 9,600원씩 적립해줘요. 미적립 기간이 있으면 사업주에게 소급 적립 요청을 해야 해요.",
    tip: "건설근로자공제회 앱에서 적립 내역 실시간 조회 가능",
    link: { label: "적립 내역 조회하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR090M00" },
  },
  {
    title: "수령 자격 252일 확인",
    desc: "퇴직공제금은 건설업 종사 기간이 252일 이상이어야 신청 가능해요. 여러 현장에서 근무한 일수를 모두 합산해서 계산해요. 현장이 달라도 건설업이면 모두 포함되죠.",
    tip: "252일은 약 1년치 건설업 근무 일수예요",
  },
  {
    title: "온라인 또는 방문 신청",
    desc: "방문 신청은 전국 지부에서 할 수 있어요. 신분증과 통장 사본만 있으면 되고, 공인인증서로 본인 확인이 돼요.",
    tip: "온라인 신청이 방문보다 빠르게 처리돼요",
    link: { label: "온라인 신청하기", href: "https://eum.cw.or.kr/web/fir/WEBFIR130M00" },
  },
  {
    title: "퇴직공제금 수령",
    desc: "신청 후 약 7~14일 이내에 통장으로 입금돼요. 퇴직공제금은 퇴직소득세 대상이어서 근속일수에 따라 세금이 원천징수된 뒤 지급돼요. 세후 금액이 실제 입금액이에요.",
    tip: "공제금 조회·신청: 건설근로자공제회(1588-0075)",
  },
];

const CHECKLIST = [
  "공제부금 적립 내역: 공제회 앱·홈페이지에서 조회",
  "수령 자격: 건설업 종사 252일 이상",
  "신청 서류: 신분증 + 통장 사본",
  "미적립 기간: 사업주에게 소급 적립 요청 가능",
  "퇴직소득세: 공제금 수령 시 원천징수 확인",
];

const FAQS = [
  {
    q: "건설근로자공제회 퇴직공제금이 뭔가요?",
    a: "건설현장 일용근로자를 위한 퇴직금 제도예요. 공사 발주자·원청·하청이 근무일당 9,600원씩 적립해요. 여러 현장을 옮겨도 합산해서 받을 수 있어요.",
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
    a: "252일 미만이면 지금 당장 퇴직공제금으로 받을 수 없어요. 다시 건설업에 취업하면 이전 적립 일수에 합산돼요. 건설업 완전 이탈 시에는 일정 요건에서 반환이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "건설근로자의 고용개선 등에 관한 법률: 퇴직공제", url: "https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "건설근로자공제회: 퇴직공제금 신청 안내", url: "https://cw.or.kr" },
      { label: "고용노동부: 건설근로자 퇴직공제 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "일용직-퇴직금", title: "일용직 퇴직금 받는 방법", description: "일용직 퇴직금 조건과 신청 방법을 정리했어요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 근무 조건과 예외 사항을 정리했어요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때 신고", description: "고용노동부 진정 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="건설근로자-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 건설근로자 · 퇴직공제금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건설현장 일용직도 퇴직금을 받을 수 있나요?<br />
        건설근로자공제회 퇴직공제금 조회부터 수령까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건설현장을 여러 곳 옮겨 다니면 퇴직금을 받기 어렵다고 생각하는 분들이 많아요.
        건설근로자는 일반 근로자와 다른 퇴직금 제도가 있어요.
        바로 <a href="https://cw.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자공제회</a> 퇴직공제금이에요.
        현장이 바뀌어도 근무일수가 합산되는 구조라서, 여러 곳에서 일했더라도 252일이 채워지면 받을 수 있어요.
        공제부금 조회 방법부터 신청 절차까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>건설근로자 퇴직공제금, 어떤 제도인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/건설근로자의고용개선등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설근로자의 고용개선 등에 관한 법률</a>에 따라 운영되는 퇴직금 제도예요.
        건설업 특성상 한 현장에서 오래 일하기 어렵기 때문에, 일반 퇴직금 대신 별도의 공제 적립 방식을 쓰는 거죠.
        현장을 옮길 때마다 퇴직금이 끊기는 문제를 해결하기 위해 만들어졌어요.
      </p>
      <p style={body}>
        공제부금은 사업주(원청·하청)가 근무일마다 적립해요. 근로자가 따로 신청하거나 납부할 필요가 없어요.
        여러 현장에서 일한 일수를 모두 합산하기 때문에, 오늘은 A 현장, 내일은 B 현장에서 일해도 두 곳의 근무일수가 모두 내 계좌에 쌓여요.
      </p>

      <GreenBox>
        적립 주체: 원청·하청 사업주(근로자 본인 부담 없음)<br />
        적립 단가: 근무일당 9,600원(2024년 기준)<br />
        수령 자격: 건설업 종사 252일 이상<br />
        신청처: 건설근로자공제회(cretirement.or.kr)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직공제금 신청 조건을 갖췄어요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="일부 조건이 맞지 않아요. 건설근로자공제회(1588-0075)에 문의해보세요."
      />

      <Divider />

      <H2>내 퇴직공제금이 얼마나 쌓였나요?</H2>
      <p style={body}>
        연간 근무일수와 종사 기간을 입력하면 예상 퇴직공제금을 계산할 수 있어요.
        적립 단가는 2024년 기준 일당 9,600원이에요.
        실제 금액은 건설근로자공제회 홈페이지나 앱에서 내 계좌를 직접 조회하면 정확하게 확인할 수 있죠.
      </p>

      <SectionBadge>건설근로자 퇴직공제금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 적립금은 연도별 적립 단가 변동, 미적립 기간에 따라 다를 수 있어요. 공제회 앱에서 정확한 잔액을 조회하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직공제금 신청에 필요한 서류</H2>
      <p style={body}>
        퇴직공제금 신청에 필요한 서류는 많지 않아요.
        신분증과 통장 사본만 있으면 기본적으로 신청이 가능해요.
        온라인 신청이라면 공제회 앱에 로그인해서 공인인증서로 본인 확인만 하면 되죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        사업주가 적립을 빠뜨린 기간이 있다면 건설근로자공제회에 신고하세요.
        사업주에게 소급 납부 명령이 내려지고, 미적립 기간 공제금도 받을 수 있어요.
      </BorderBox>

      <Divider />

      <H2>퇴직공제금 수령 절차 4단계</H2>
      <p style={body}>
        신청 전에 내 공제부금이 제대로 적립됐는지 먼저 확인해야 해요.
        사업주가 적립을 빠뜨린 기간이 있으면 받을 수 있는 금액이 줄어들거든요.
        4단계를 순서대로 따라가면 수령까지 무리 없이 진행할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={body}>
        신청 전에 아래 항목들을 하나씩 점검해보세요.
        특히 미적립 기간 확인은 놓치기 쉽지만 나중에 추가 청구가 어려울 수 있어요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        지금 당장 못 받더라도 나중에 다시 건설업에 취업하면 이전 일수에 합산돼요.<br />
        건설업을 완전히 그만둘 경우에는 일정 요건에서 반환 신청도 가능해요.<br />
        문의: 건설근로자공제회 1588-0075
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        건설근로자 퇴직공제금에 대해 많이 물어보는 질문들을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 건설근로자의 고용개선 등에 관한 법률을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 건설근로자공제회(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
