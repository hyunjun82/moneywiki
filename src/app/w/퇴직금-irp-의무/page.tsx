"use client";
// Q1. 퇴직을 앞두고 회사에서 IRP 계좌번호를 제출하라는 말을 들었지만 왜 해야 하는지, 내가 해당되는지 모르는 상황
// Q2. 내 IRP 의무 여부를 판단한 뒤, IRP를 개설하고 계좌번호를 회사에 전달해 퇴직금을 수령한다
// Q3. 의무 대상 조건(만 55세 미만 + 세전 300만원 초과), 예외 4가지, 개설 절차, 세금 효과, 추가 납입 혜택
// Q4. EligibilityChecker(대상 여부) → Calculator(퇴직금 규모) → DocTable(서류) → Steps(절차) → Checklist(최종 점검)
// MAP: Q1→서론 첫 문장(상황 공감) Q2→H2순서(판단→계산→서류→절차→점검) Q3→H2깊이(예외·세금 상세) Q4→컴포넌트

import { H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후에 퇴직했거나 퇴직 예정이에요" },
  { id: "c2", label: "퇴직일 기준 만 55세 생일이 지나지 않았어요" },
  { id: "c3", label: "퇴직금(세전 기준)이 300만원을 초과해요" },
  { id: "c4", label: "퇴직연금(DC·DB) 또는 퇴직금 제도에 가입된 회사에서 근무했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 20, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "IRP 의무 이전 대상 (300만원 초과)" : "일반 계좌 수령 가능 (300만원 이하)",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증 (카카오·PASS 등)", required: true, where: "금융사 앱에서 등록" },
  { name: "IRP 계좌번호 (은행명·계좌번호·예금주)", required: true, where: "IRP 개설 후 확인" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "IRP 의무 대상 해당 여부 파악",
    desc: "퇴직일 기준 만 55세 미만이고 퇴직금이 세전 300만원을 초과하면 IRP 의무 대상이에요. 두 조건 중 하나라도 해당 안 되면 일반 계좌로 받을 수 있고요. 55세 생일이 퇴직일 당일이면 의무 대상에서 빠져요.",
    tip: "55세 생일이 퇴직일 전인지 후인지 꼭 체크해요. 하루 차이로 달라져요",
  },
  {
    title: "금융사별 IRP 수수료 비교",
    desc: "은행 IRP는 연 0.3~0.5%, 증권사 IRP는 연 0.0~0.2% 수준이에요. 퇴직금을 수령만 할 목적이라면 수수료 0% 상품을 선택하면 돼요. ETF 투자를 원하면 미래에셋·삼성증권 등 증권사 IRP가 유리해요.",
    tip: "수령만 목적이면 수수료 0% 상품 선택 은행보다 증권사가 대체로 저렴해요",
  },
  {
    title: "모바일 앱으로 IRP 계좌 개설",
    desc: "금융사 앱으로 신분증 촬영 + 간편인증 순서로 10분이면 개설돼요. 비대면 개설이 안 되는 금융사는 직접 방문해야 해요. 퇴직 확정 즉시 개설하는 게 가장 좋아요.",
    tip: "퇴직 후 개설하면 14일 지급 기한을 못 맞출 수 있죠. 퇴직 전에 미리 만들어요",
  },
  {
    title: "IRP 계좌번호를 회사 인사팀에 전달",
    desc: "은행명·계좌번호·예금주를 문자나 메일로 인사팀에 알려줘요. 회사는 퇴직일 이후 14일 이내에 이 계좌로 퇴직금을 이체해야 해요. 14일을 넘기면 연 20% 지연이자 청구 권리가 생겨요.",
    tip: "구두 전달은 나중에 증거가 안 돼요. 문자·메일로 기록을 남겨요",
  },
];

const CHECKLIST = [
  "의무 여부 체크: 만 55세 미만 + 퇴직금 세전 300만원 초과인지",
  "금융사 수수료 비교: 수령만 목적이면 수수료 0% 상품 선택",
  "IRP 개설: 모바일 앱으로 퇴직 전에 미리 개설",
  "계좌번호 전달: 인사팀에 문자·메일로 은행명·계좌번호·예금주 전달",
  "지급 기한 체크: 퇴직일 기준 14일 이내 이체 여부",
];

const FAQS = [
  {
    q: "IRP 의무 이전 제도가 언제부터 시행됐나요?",
    a: "2022년 4월 14일부터예요. 근로자퇴직급여보장법이 개정되면서 퇴직금 300만원 초과 시 IRP 계좌로만 지급하도록 바뀌었어요. 이전에는 본인 명의 계좌면 어디든 받을 수 있었고요.",
  },
  {
    q: "IRP 의무 예외가 되는 조건은 뭐가 있나요?",
    a: "크게 네 가지예요. ① 퇴직일 기준 만 55세 이상, ② 퇴직금이 세전 300만원 이하, ③ 근로자 사망, ④ 퇴직연금 담보대출 상계로 지급되는 경우예요. 이 중 하나에 해당하면 일반 계좌로 받을 수 있고요.",
  },
  {
    q: "300만원 기준은 세전인가요, 세후인가요?",
    a: "세전 퇴직금 총액 기준이에요. 퇴직소득세를 공제하기 전 금액으로 판단해요. 세후 금액이 300만원 이하라도 세전이 초과하면 IRP 의무 대상이에요.",
  },
  {
    q: "회사가 IRP 아닌 일반 계좌로 이체하면 어떻게 되나요?",
    a: "의무를 어기는 주체는 회사예요. 과태료가 부과되죠. 근로자가 동의하더라도 법적으로 허용되지 않고요. 받은 금액 자체는 유효하지만 회사가 제재를 받을 수 있죠.",
  },
  {
    q: "IRP 계좌를 바로 해지해서 현금으로 받을 수 있나요?",
    a: "가능해요. 단, 해지하면 퇴직소득세를 전액 내야 해요. IRP를 유지하면서 55세 이후 연금으로 수령하면 연금소득세(3.3~5.5%)가 적용돼 세금이 줄어요. 급하지 않다면 유지가 유리해요.",
  },
  {
    q: "IRP 계좌에 추가로 돈을 넣어도 되나요?",
    a: "가능해요. 퇴직금 수령분 외에도 연간 1,800만원까지 추가 납입할 수 있고요. 이 중 900만원까지는 세액공제(연봉 5,500만원 이하 16.5%, 초과 13.2%)가 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제17조: IRP 의무 이전 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 IRP 의무 이전 제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: IRP 계좌 관련 소비자 정보", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무 예외 조건 4가지", description: "일반 계좌로 받을 수 있는 예외 상황 정리." },
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설 방법", description: "금융사별 수수료 비교부터 개설 절차까지." },
  { slug: "퇴직금-IRP-수령방법", title: "IRP로 받은 퇴직금 수령 방법", description: "일시금·연금 선택 시 세금 차이와 수령 절차." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-irp-의무" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무가입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 의무, 내가 해당되는지 모르겠죠?<br />
        대상 조건·예외·개설 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 IRP 계좌번호를 달라는데 왜인지 모르겠죠? 2022년 4월 14일부터{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 바뀌면서
        만 55세 미만이고 퇴직금이 세전 300만원을 초과하면 IRP 계좌 없이는 퇴직금을 받을 수 없어졌어요.
        IRP를 미리 개설해두지 않으면 지급이 14일 기한을 넘겨 연 20% 지연이자가 붙을 수도 있죠.
        이 글 하나로 의무 대상 여부, 예외 조건, 개설 절차까지 전부 해결해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무 대상 조건, 내가 해당되나요?</H2>
      <p style={body}>
        IRP 의무 이전 조건은 두 가지가 동시에 충족돼야 해요. 퇴직일 기준 만 55세 미만이고, 퇴직금이 세전 300만원을 초과해야 해요.
        두 조건 중 하나라도 해당하지 않으면 일반 통장으로 받을 수 있고요.
      </p>
      <p style={body}>
        정규직·계약직·파트타임 구분 없이 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금 지급 대상이에요.
        퇴직금 제도 회사든 퇴직연금(DC·DB) 가입 회사든 동일하게 IRP 의무가 적용돼요.
        55세 생일이 퇴직일 당일인 경우는 <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>예외 조건</a>에 해당해 일반 계좌로 받을 수 있고요.
      </p>

      <GreenBox>
        의무 대상: 만 55세 미만 + 퇴직금 세전 300만원 초과<br />
        예외 대상: 만 55세 이상 OR 퇴직금 300만원 이하 OR 근로자 사망<br />
        시행일: 2022년 4월 14일 이후 퇴직자 전체 적용
      </GreenBox>

      <SectionBadge>IRP 의무 대상 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 대상이에요. 퇴직 전에 IRP 계좌를 개설해두세요. 아래 계산기로 퇴직금 금액과 의무 여부를 바로 볼 수 있죠."
        partialMatchText="예외에 해당할 수 있죠. 나이와 퇴직금 금액 조건을 정확히 따져보세요."
      />

      <Divider />

      <H2>퇴직금 금액으로 IRP 의무 여부 계산</H2>
      <p style={body}>
        월 평균급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 여부를 바로 볼 수 있죠.
        300만원 기준은 퇴직소득세 공제 전 세전 총액이에요.
      </p>
      <p style={body}>
        예를 들어 월 250만원을 받고 2년 근무했다면 퇴직금은 약 500만원이에요. 세후 금액이 300만원 이하로 떨어져도 세전이 초과하면 IRP 의무 대상이에요.
        계산기로 내 퇴직금 규모를 먼저 파악해두면 혼란이 없어요.
      </p>

      <SectionBadge>퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 월 평균급여 × 근속 기간(년). 세전 300만원 초과 시 IRP 계좌가 의무예요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 개설은 신분증과 인증서만 있으면 돼요. 대부분 금융사 앱으로 10분이면 끝나요.
        재직증명서는 일부 금융사에서만 요구하니 미리 연락해서 물어보는 게 편해요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌 개설</a> 후 계좌번호를 회사에 전달해야 14일 이내 이체가 이루어져요.
        퇴직이 확정되면 최대한 빨리 개설해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 의무 이전 절차 4단계</H2>
      <p style={body}>
        의무 여부 파악부터 계좌번호 전달까지 4단계예요.
        수수료 비교에 하루, 개설에 10분, 계좌번호 전달까지 하면 퇴직 전에 전부 마칠 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 IRP 수령 전 체크리스트</H2>
      <p style={body}>
        퇴직 전에 아래 항목을 하나씩 처리하면 퇴직금 수령이 지연되지 않아요.
        특히 계좌번호 전달을 구두로만 하면 나중에 분쟁이 생길 수 있으니 반드시 문자나 메일로 남겨요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금 수령분 외에도 연간 900만원까지 추가 납입하면 세액공제를 받아요.<br />
        연봉 5,500만원 이하 16.5%, 초과 13.2% 연 300만원 납입 시 최대 49.5만원 환급이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무 이전 제도에 관해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 알아보세요." />
    </ArticleLayout>
  );
}
