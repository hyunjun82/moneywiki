"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일 기준으로 만 55세 생일이 이미 지났어요" },
  { id: "c2", label: "퇴직금(세전 총액)이 300만원 이하예요" },
  { id: "c3", label: "외국인 근로자로 퇴직 후 출국 예정이에요" },
  { id: "c4", label: "사망 또는 장해로 본인이 IRP 개설을 할 수 없는 상태예요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 100, max: 600, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) =>
      v <= 3000000
        ? "300만원 이하 → 일반 계좌 수령 가능"
        : "300만원 초과 → IRP 계좌 필요",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "본인 명의 일반 계좌 번호", required: true, where: "본인 명의 은행 계좌" },
  { name: "외국인등록증 또는 여권 (외국인 출국 예외 시)", required: false, where: "본인 지참" },
  { name: "장해 진단서 또는 사망 증명서 (해당자)", required: false, where: "병원 또는 동사무소" },
];

const STEPS = [
  {
    title: "예외 조건 해당 여부 확인",
    desc: "퇴직일 기준 만 55세 이상인지, 퇴직금 세전 총액이 300만원 이하인지 먼저 확인해요. 55세는 생일이 퇴직일 이전이어야 해요. 생일 당일 퇴직은 예외에 해당하지 않아요.",
    tip: "하루 차이로 의무 여부가 바뀌니 정확히 확인하세요",
  },
  {
    title: "회사 인사팀에 예외 사유 전달",
    desc: "예외에 해당하면 인사팀에 나이·금액·출국 등 사유를 알리고 본인 명의 일반 계좌 번호를 전달해요. 문자나 이메일로 남겨두면 나중에 증거로 쓸 수 있어요.",
    tip: "이메일이나 문자로 전달 기록을 남겨두세요",
  },
  {
    title: "퇴직소득세 원천징수 후 입금 확인",
    desc: "회사가 퇴직소득세를 원천징수한 뒤 나머지를 일반 계좌로 송금해요. 퇴직일로부터 14일 이내에 입금되지 않으면 연 20% 지연이자를 청구할 수 있어요.",
    tip: "원천징수영수증 발급 요청도 함께 하세요",
    link: { label: "퇴직금 지급기한 14일 기준 보기", href: "/w/퇴직금-지급-기한" },
  },
  {
    title: "원천징수영수증 수령 및 보관",
    desc: "퇴직소득 원천징수영수증은 종합소득세 신고나 퇴직금 분쟁 시 꼭 필요한 서류예요. 인사팀에서 발급받아 보관하세요. 홈택스에서도 사후 조회가 가능해요.",
    tip: "최소 5년 이상 보관을 권해요",
    link: { label: "홈택스 원천징수영수증 조회", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "예외 조건 확인: 나이(만 55세), 금액(300만원 이하), 외국인 출국, 사망·장해",
  "인사팀에 예외 사유 + 일반 계좌 번호 이메일·문자로 전달",
  "퇴직일로부터 14일 이내 입금 여부 확인",
  "퇴직소득 원천징수영수증 발급 요청 및 보관",
  "예외 해당 안 되면 IRP 개설 후 계좌 번호 인사팀에 전달",
];

const FAQS = [
  {
    q: "IRP 의무 예외 조건이 정확히 몇 가지예요?",
    a: "근로자퇴직급여보장법 제9조 기준으로 5가지예요. 퇴직급여 300만원 이하, 만 55세 이상 퇴직, 외국인 근로자 출국, 근로자 사망, 장해로 IRP 개설이 불가한 경우예요. 이 중 하나라도 해당하면 일반 계좌로 수령할 수 있어요.",
  },
  {
    q: "55세 생일 당일에 퇴직하면 예외가 되나요?",
    a: "안 돼요. 퇴직일 기준으로 생일이 이미 지난 상태여야 해요. 생일 당일 퇴직은 '만 55세 미만'으로 처리돼서 IRP 의무 대상이에요. 하루 이후에 퇴직해야 예외에 해당해요.",
  },
  {
    q: "300만원 기준이 세전인가요, 세후인가요?",
    a: "세전 퇴직금 총액 기준이에요. 퇴직소득세를 공제하기 전 금액이 300만원 이하여야 해요. 세후로 따지지 않으니 세전 총액을 먼저 계산해보는 게 중요해요.",
  },
  {
    q: "예외인데도 IRP로 받는 게 더 유리한 경우가 있나요?",
    a: "있어요. 만 55세 이상이라도 IRP를 선택해서 연금으로 수령하면 퇴직소득세를 30% 줄일 수 있어요. 퇴직금을 노후 자금으로 쓸 계획이라면 IRP가 훨씬 유리해요.",
  },
  {
    q: "회사가 예외 적용을 거부하면 어떻게 해야 하나요?",
    a: "예외 조건이 명확히 해당됨에도 거부하면 고용노동부(1350)에 신고할 수 있어요. 이메일이나 문자로 예외 사유를 전달한 기록이 있으면 분쟁에서 유리해요.",
  },
  {
    q: "외국인 근로자는 어떤 서류가 필요한가요?",
    a: "외국인등록증이나 여권으로 신원 확인이 돼요. 출국 예정임을 회사에 알리면 IRP 없이 일반 계좌로 퇴직금을 받을 수 있어요. 출국 후에는 수령이 어려우니 퇴직 전에 정산하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 이전 의무 및 예외", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "홈택스: 퇴직소득 원천징수영수증 조회", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상과 조건", description: "누구에게 IRP가 의무인지 법령 기준으로 정리했어요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "의무 대상이라면 IRP를 미리 개설해두세요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 계산법", description: "일반 계좌 수령 시 퇴직소득세가 어떻게 적용되는지 보세요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-irp-의무-예외" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 수령 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 없이 퇴직금 받을 수 있는 경우가 있나요?<br />
        의무 예외 조건 5가지와 일반 계좌 수령 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 받을 때 IRP 계좌가 없으면 못 받는다고 알고 있는 분들이 많은데, 예외가 있어요.
        <a href="/w/퇴직금-irp-의무" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>에서 정한 5가지 조건 중 하나라도 해당하면 일반 은행 계좌로 바로 받을 수 있어요.
        만 55세 이상이거나 퇴직금이 300만원 이하라면 IRP 없이 수령 가능하고, 외국인 출국·사망·장해도 예외 조건이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무 예외, 내가 해당되는지 확인하는 방법</H2>
      <p style={body}>
        IRP 의무 예외 조건은 총 5가지예요. 퇴직급여 300만원 이하, 만 55세 이상 퇴직, 외국인 근로자 출국, 근로자 사망, 장해로 IRP 개설이 불가한 경우예요.
        이 중 하나라도 해당하면 회사 인사팀에 일반 계좌 번호를 전달하면 돼요.
      </p>
      <p style={body}>
        55세 기준은 퇴직일 기준이에요. 생일이 퇴직일보다 하루라도 앞서야 예외에 해당해요.
        300만원 기준은 세전 퇴직금 총액이고, 세후 금액으로 따지지 않아요.
        외국인 출국 예외는 출국 전 정산을 해야 하니 퇴직 타이밍이 중요해요.
      </p>

      <GreenBox>
        1. 퇴직급여 300만원 이하 (세전 총액 기준)<br />
        2. 만 55세 이상 퇴직 (퇴직일 기준, 생일이 퇴직일 이전이어야 함)<br />
        3. 외국인 근로자 출국<br />
        4. 근로자 사망<br />
        5. 장해로 IRP 개설 불가
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 예외 조건에 해당해요. 인사팀에 일반 계좌 번호를 전달하고 수령하세요."
        partialMatchText="일부 조건만 체크됐어요. 해당하는 항목이 하나라도 있으면 예외 적용이 가능해요. 인사팀과 확인하세요."
      />

      <Divider />

      <H2>퇴직금 금액으로 IRP 의무 여부 바로 계산</H2>
      <p style={body}>
        300만원 기준은 세전 퇴직금 총액이에요. 월 평균급여와 근속 기간을 조정하면 예상 퇴직금과 IRP 의무 여부가 바로 나와요.
        1년 미만 근속이나 단시간 근로자라면 퇴직금 자체가 낮을 수 있으니 먼저 계산해보세요.
      </p>

      <SectionBadge>퇴직금 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 월 평균급여 × 근속 기간 (간이 계산 기준). 세전 300만원 이하면 일반 계좌 수령 가능, 초과하면 IRP 필요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>일반 계좌 수령 시 필요한 서류</H2>
      <p style={body}>
        예외에 해당하면 신분증과 본인 명의 계좌 번호만 있으면 돼요.
        외국인 출국 예외라면 외국인등록증이나 여권이 필요하고, 장해·사망 예외라면 관련 증빙 서류가 추가돼요.
      </p>
      <p style={body}>
        별도 신청서 없이 문자나 이메일로 처리되는 경우가 많아요.
        전달 기록을 남겨두면 나중에 지급 지연 분쟁 시 증거로 쓸 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>일반 계좌 수령 신청 절차 4단계</H2>
      <p style={body}>
        예외 조건 확인부터 원천징수영수증 보관까지 4단계로 진행돼요.
        퇴직일로부터 14일 이내에 입금이 이뤄져야 하고, 지연되면 연 20% 이자를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>예외 수령 전 체크리스트</H2>
      <p style={body}>
        예외 조건 확인을 빠뜨리면 IRP 개설 후 다시 처리해야 해서 시간이 걸려요.
        수령 전에 아래 항목을 하나씩 확인하면 실수 없이 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        만 55세 이상이어도 IRP를 선택할 수 있어요.<br />
        55세 이후 연금으로 수령하면 퇴직소득세를 30% 줄일 수 있어서, 노후 자금으로 쓸 계획이라면 IRP를 고려하는 게 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 예외 조건에 관해 실제로 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 제9조를 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
