"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "이혼 소송 또는 협의이혼을 진행 중이에요" },
  { id: "c2", label: "배우자가 아직 퇴직하지 않아 퇴직금이 미지급 상태예요" },
  { id: "c3", label: "혼인 기간 중 형성된 퇴직금 지분을 청구하고 싶어요" },
  { id: "c4", label: "퇴직연금(DB·DC형)도 재산분할 대상인지 궁금해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "배우자 월급 (예상 기준)", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "marriageYears", label: "혼인 기간 중 근속 연수", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "혼인 기간 기여 퇴직금 추정액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.marriageYears),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "재산분할 청구 기준 (50% 기여율 적용)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.marriageYears * 0.5),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "혼인관계증명서", required: true, where: "주민센터 또는 정부24" },
  { name: "배우자 급여 관련 자료 (재직증명서 등)", required: true, where: "법원 사실조회 신청" },
  { name: "혼인 기간 중 근속 증명 자료", required: true, where: "법원 사실조회 또는 국민연금 가입내역" },
  { name: "재산분할 협의서 또는 판결문", required: false, where: "협의이혼 시 당사자 작성" },
];

const STEPS = [
  {
    title: "퇴직금 재산분할 대상 여부 확인",
    desc: "퇴직금 중 혼인 기간에 해당하는 부분이 재산분할 대상이에요. 입사 전 결혼했다면 혼인 전 기간은 제외돼요. 퇴직 전이라도 장래 수령할 퇴직금의 혼인 기여분을 현재 가치로 청구할 수 있어요.",
    tip: "미지급 퇴직금도 재산분할 대상이에요 (대법원 판례 확립)",
  },
  {
    title: "혼인 기간 기여분 계산",
    desc: "전체 근속 기간 중 혼인 기간 비율을 계산해요. 예: 근속 15년, 혼인 10년이면 10/15가 혼인 기간 기여분이에요. 이 비율에 퇴직금 예상액을 곱하면 분할 대상 금액이 나와요.",
    tip: "부부 쌍방 기여도(가사노동 포함)에 따라 분할 비율이 달라져요",
  },
  {
    title: "협의 또는 소송 진행",
    desc: "협의이혼이라면 당사자끼리 분할 금액을 정하고 재산분할 협의서를 작성해요. 합의가 안 되면 이혼 소송에서 재산분할 청구를 함께 진행해요. 법원은 기여도, 직업, 자녀 양육 등을 종합해서 판단해요.",
    tip: "공정증서나 조정조서를 남기면 이행 강제가 쉬워요",
  },
  {
    title: "지급 또는 집행",
    desc: "협의 or 판결 확정 후 지급이 이뤄지지 않으면 강제집행 신청이 가능해요. 배우자가 퇴직금을 수령한 후 이전하지 않으면 재산분할 채권 집행으로 퇴직금 계좌를 압류할 수 있어요.",
    tip: "퇴직금의 1/2까지만 압류 가능 (민사집행법 기준)",
  },
];

const CHECKLIST = [
  "혼인 기간 기여분 계산: 근속 기간 중 혼인 기간 비율",
  "미지급 퇴직금도 분할 대상: 장래 수령액 현가 청구 가능",
  "퇴직연금(DB·DC)도 포함: IRP 계좌 잔액까지 분할 대상",
  "협의이혼 시 재산분할 협의서 작성: 공증 추천",
  "소멸시효 2년: 이혼 확정 후 2년 내 청구해야 해요",
];

const FAQS = [
  {
    q: "배우자가 아직 퇴직 안 했는데 퇴직금을 분할받을 수 있나요?",
    a: "받을 수 있어요. 미지급 퇴직금도 재산분할 대상이에요. 법원은 혼인 기간 기여분을 현재 가치로 환산해서 분할 명령을 내려요. 대법원도 이를 확립된 법리로 인정하고 있어요.",
  },
  {
    q: "퇴직연금(DB·DC형)도 재산분할 대상인가요?",
    a: "맞아요. DB형, DC형, IRP 계좌 잔액 모두 재산분할 대상이에요. 혼인 기간 적립분만 대상이 되고, 혼인 전 기간이나 이혼 후 적립분은 제외돼요.",
  },
  {
    q: "혼인 기간이 짧으면 퇴직금 분할을 받기 어렵나요?",
    a: "혼인 기간이 짧을수록 분할 대상 금액이 줄어드는 건 맞아요. 하지만 기여분이 있다면 청구 자체는 가능해요. 가사노동, 자녀 양육 등 비경제적 기여도 반영돼요.",
  },
  {
    q: "재산분할 소멸시효가 얼마인가요?",
    a: "이혼 확정일로부터 2년이에요. 2년이 지나면 청구권이 소멸해요. 협의이혼이든 재판이혼이든 이혼이 확정된 날부터 카운트가 시작돼요.",
  },
  {
    q: "배우자가 퇴직금을 받고 나서 이전을 거부하면?",
    a: "재산분할 판결이나 협의서가 있다면 강제집행 신청이 가능해요. 퇴직금을 받은 계좌를 압류해서 분할액을 강제로 받아낼 수 있어요. 퇴직금의 최대 1/2까지 압류 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 판례",
    items: [
      { label: "민법 제839조의2: 재산분할청구권", url: "https://www.law.go.kr/법령/민법" },
      { label: "대법원 2014므1378: 미지급 퇴직금 재산분할", url: "https://glaw.scourt.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "법원행정처: 가사소송 재산분할 안내", url: "https://www.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-압류", title: "퇴직금 압류 가능 한도", description: "퇴직금 압류 범위와 보호 금액을 설명해요." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법 정리", description: "IRP 이체부터 일시금 수령까지 절차 안내." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산 방법을 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="이혼-퇴직금-재산분할-대상" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 이혼 · 재산분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼할 때 퇴직금도 재산분할 대상인가요?<br />
        혼인 기간 기여분 계산부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼 시 퇴직금은 혼인 기간에 해당하는 부분만 재산분할 대상이에요.
        배우자가 아직 퇴직하지 않은 미지급 퇴직금도 포함되고, DB형·DC형 퇴직연금 잔액도 마찬가지예요.
        대법원 판례로 확립된 원칙이라 청구 자체는 분명히 가능해요.
        혼인 기간 기여분 계산 방법과 청구 절차를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 재산분할, 어떤 경우에 해당되나요?</H2>
      <p style={body}>
        결혼 후 근무한 기간에 쌓인 퇴직금은 부부 공동 재산으로 봐요.
        혼인 전부터 다니던 직장이라면 혼인 전 기간은 빠지고, 혼인 기간 부분만 분할 대상이에요.
        이미 퇴직해서 받은 퇴직금은 물론, 아직 재직 중인 미지급 퇴직금도 재산분할 청구가 가능해요.
      </p>
      <p style={body}>
        퇴직연금(DB·DC형)과 IRP 잔액도 동일하게 분할 대상이에요.
        소멸시효는 이혼 확정일로부터 2년이라서, 이혼 후 빠르게 청구하는 게 좋아요.
      </p>

      <GreenBox title="재산분할 대상 퇴직금 범위">
        분할 대상: 혼인 기간 중 적립된 퇴직금·퇴직연금 잔액<br />
        분할 제외: 혼인 전 적립분, 이혼 후 새로 쌓이는 부분<br />
        소멸시효: 이혼 확정일부터 2년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 재산분할 청구가 가능해요. 아래에서 혼인 기간 기여분을 계산해보세요."
        partialMatchText="상황에 따라 청구 범위가 달라질 수 있어요. 가정법원이나 법률구조공단 상담을 권해요."
      />

      <Divider />

      <H2>혼인 기간 기여 퇴직금 추정액 계산</H2>
      <p style={body}>
        배우자 월급과 혼인 기간 중 근속 연수를 입력하면 혼인 기여분 퇴직금 추정액을 바로 확인할 수 있어요.
        실제 분할 비율은 기여도(가사노동 포함), 자녀 양육, 경제 활동 여부 등을 종합해서 법원이 결정해요.
      </p>

      <SectionBadge>혼인 기여분 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정 기준. 실제 분할 비율은 법원이 기여도를 종합 판단해요. 퇴직소득세 차감 전 금액이에요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        배우자 소득 자료는 법원 사실조회를 통해 받을 수 있어요.
        국민연금 가입내역 조회로 근속 기간을 간접적으로 확인하는 방법도 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 재산분할 청구 4단계</H2>
      <p style={body}>
        분할 대상 확인 → 기여분 계산 → 협의 또는 소송 → 지급 또는 집행 순서예요.
        소멸시효(2년)가 있으니 이혼 확정 후 빨리 움직이세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>재산분할 청구 체크리스트</H2>
      <p style={body}>
        소멸시효 2년을 놓치면 청구권이 사라져요. 이혼이 확정되면 바로 청구 절차를 시작하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="미지급 퇴직금도 청구할 수 있어요">
        배우자가 아직 재직 중이라도 혼인 기간 기여분은 청구 가능해요.<br />
        대법원 판례로 확립된 법리예요. 이혼 소송에 재산분할 청구를 함께 제기하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        이혼 시 퇴직금 재산분할에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법과 대법원 판례를 바탕으로 작성됐어요. 개인 상황에 따라 결과가 달라질 수 있으니 법률구조공단(132) 또는 가정법원 상담을 권해요." />
    </ArticleLayout>
  );
}
