"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업주 아래서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "주 소정근로시간이 15시간 이상이었어요" },
  { id: "c3", label: "근로계약서나 급여명세서 등 근무 증빙이 있어요" },
  { id: "c4", label: "아직 퇴직금을 한 번도 받지 못했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
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
    label: "근속 1년당 적립액",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "회사 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "수급 자격 확인",
    desc: "같은 사업주 아래서 1년 이상, 주 15시간 이상 근무하면 자격이 돼요. 정규직·계약직·파트타임 모두 해당해요. 4대 보험 미가입 상태라도 실제 근무 사실이 증명되면 받을 수 있어요.",
    tip: "주 15시간은 월 65시간으로 환산해서 확인하기도 해요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있어요. 퇴직이 확정되면 바로 은행이나 증권사 앱에서 개설해요. 수수료가 낮은 증권사 IRP를 고르면 장기적으로 유리해요.",
    tip: "퇴직 확정 전에 미리 개설해두는 게 좋아요",
  },
  {
    title: "IRP 계좌번호 인사팀 통보",
    desc: "IRP 계좌번호(은행명·계좌번호·예금주명)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이 계좌로 퇴직금을 이체해야 해요. 구두보다 서면으로 남기면 분쟁 때 증거가 돼요.",
    tip: "문자·메일로 남기면 나중을 위해 든든해요",
  },
  {
    title: "수령 방식 결정",
    desc: "IRP에 들어온 퇴직금은 일시금으로 인출하거나 연금으로 나눠 받을 수 있어요. 55세 이후 10년 이상 연금으로 수령하면 퇴직소득세를 최대 40%까지 줄일 수 있어요. 일시금 인출 시에는 퇴직소득세 전액을 납부해요.",
    tip: "연금 수령이 세금 면에서 장기적으로 유리해요",
  },
];

const CHECKLIST = [
  "수급 자격: 1년 이상 근무 + 주 15시간 이상 두 조건 모두 충족",
  "퇴직금 계산 공식: 1일 평균임금 × 30일 × 근속연수",
  "IRP 계좌: 퇴직금 300만원 초과 시 반드시 필요",
  "지급 기한: 퇴직 후 14일 이내 (초과 시 연 20% 지연이자 발생)",
  "청구권 소멸시효: 퇴직 후 3년 이내에 청구해야 해요",
  "퇴직금 포기 각서: 사전 포기는 무효, 강요에 의한 경우 취소 가능",
];

const FAQS = [
  {
    q: "퇴직금은 언제부터 생기나요?",
    a: "입사일부터 만 1년이 되는 날 퇴직금 청구권이 생겨요. 1년 미만에 퇴직하면 퇴직금이 없어요. 딱 1년을 채운 다음 날 퇴직해도 퇴직금은 발생해요.",
  },
  {
    q: "파트타임이나 아르바이트도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 주 15시간 이상, 1년 이상 근무하면 고용 형태에 관계없이 퇴직금이 발생해요. 주 15시간 미만 초단시간 근로자는 해당되지 않아요.",
  },
  {
    q: "퇴직금 포기 각서를 써도 되나요?",
    a: "효력이 없어요. 퇴직금 청구권은 사전에 포기해도 무효예요. 퇴직 후 실제로 받은 뒤에 포기하는 건 가능하지만, 강요에 의한 것이라면 취소할 수 있어요.",
  },
  {
    q: "회사가 14일 이내에 퇴직금을 안 주면 어떻게 되나요?",
    a: "연 20% 지연이자가 자동으로 붙어요. 고용노동부(1350) 또는 민원마당에서 진정을 접수하면 근로감독관이 직접 조사하고 지급 명령을 내려요.",
  },
  {
    q: "5인 미만 사업장도 퇴직금을 줘야 하나요?",
    a: "줘야 해요. 2010년부터 5인 미만 사업장도 퇴직금 지급 의무가 생겼어요. 사업장 규모와 관계없이 1년 이상, 주 15시간 이상 근무하면 받을 수 있어요.",
  },
  {
    q: "계약직이 반복 계약을 해도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약 갱신 사이에 공백이 없거나 짧고, 실질적으로 같은 사업주 아래서 계속 일했다면 근속기간이 합산돼요. 총 근무기간이 1년을 넘으면 퇴직금이 발생해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주15시간 요건과 예외 상황 정리." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준으로 정확하게 계산하는 법." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "IRP 계좌 개설부터 수령까지 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-이란" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 개념 · 기초</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금이란 뭔가요?<br />
        조건·계산법·수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 받는 돈이에요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          근로자퇴직급여보장법 제8조
        </a>
        에 따라 법으로 보장된 권리예요. 정규직이든 계약직이든 파트타임이든 조건만 맞으면 반드시 받을 수 있어요.
        수급 조건, 계산 공식, 수령 절차를 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금, 어떤 사람이 받을 수 있나요?</H2>
      <p style={body}>
        조건은 두 가지예요. 같은 사업주 아래서 1년 이상 계속 근무하고, 주 소정근로시간이 15시간 이상이면 자격이 돼요.
        4대 보험 가입 여부는 관계없어요. 실제 근무 사실이 증명되면 청구할 수 있어요.
      </p>
      <p style={body}>
        계약직이 공백 없이 계약을 반복해 2년을 일했다면 같은 사업주 아래 계속 근무한 것으로 인정받을 수 있어요.
        주 15시간 미만 초단시간 근로자는 해당되지 않아요.
      </p>

      <GreenBox title="퇴직금 발생 조건">
        1년 이상 계속 근무 (같은 사업주)<br />
        주 소정근로시간 15시간 이상<br />
        두 조건을 모두 충족해야 퇴직금이 발생해요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 자격이 갖춰져 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건이 맞지 않을 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>내 퇴직금 얼마나 될까요?</H2>
      <p style={body}>
        퇴직금 계산 공식은 '1일 평균임금 × 30일 × 근속연수'예요.
        1일 평균임금은 퇴직 전 3개월 총임금을 그 기간의 실제 일수로 나눈 금액이에요.
        상여금·고정수당이 포함되면 기본급만 기준으로 할 때보다 더 높게 나와요.
      </p>
      <p style={body}>
        아래 계산기는 월급 기준 간편식이에요. 상여금이나 수당이 있다면{" "}
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산기</a>
        에서 3개월 임금 기준으로 더 정확하게 계산해보세요.
      </p>

      <SectionBadge>퇴직금 간편 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산이에요. 상여금·수당 포함 시 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        퇴직금 수령 절차는 대부분 회사가 처리해줘요. 본인이 직접 챙겨야 할 건 IRP 계좌 개설과 계좌번호 통보예요.
        300만원을 초과하는 퇴직금은 IRP 계좌 없이는 받을 수 없어요.
      </p>
      <p style={body}>
        분쟁에 대비해 근로계약서와 급여명세서는 퇴직 전에 사본으로 챙겨두세요.
        퇴직 후에는 회사 시스템 접근이 막히는 경우가 많아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 받는 절차 4단계</H2>
      <p style={body}>
        퇴직금은 회사가 퇴직일로부터 14일 이내에 지급해야 해요.
        14일이 지나면 연 20% 지연이자가 자동으로 붙어요.
        절차를 미리 알아두면 지급이 늦어질 때 바로 대응할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>놓치면 손해인 체크리스트</H2>
      <p style={body}>
        퇴직을 앞두거나 이미 퇴직한 분들이 놓치기 쉬운 것들만 골랐어요.
        IRP 계좌와 지급 기한을 챙기지 않으면 수십만원 손해로 이어질 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="14일 안에 퇴직금 못 받았다면">
        퇴직 후 14일이 지난 날부터 연 20% 지연이자가 발생해요.<br />
        고용노동부(1350) 또는{" "}
        <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          민원마당
        </a>
        에서 진정을 접수하면 근로감독관이 직접 지급 명령을 내려요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
