"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// Q1. 검색자 상황: 퇴직이 다가오는데 회사에서 IRP 계좌를 만들어야 한다고 해서, 의무화가 뭔지·왜 해야 하는지·어떻게 만드는지 모르는 상황
// Q2. 읽고 나서 할 행동: IRP 계좌를 개설하고 계좌번호를 회사 인사팀에 제출
// Q3. 알아야 할 정보: 의무화 시행 시점(2022.4.14), 대상(55세 미만), 예외(300만원 이하·55세 이상), IRP 개설 방법, 인출 절차, 절세 옵션
// Q4. 전달 형태: Steps(준비 절차) + DocTable(예외 조건) + GreenBox(핵심 요약)

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "IRP 계좌 개설 (퇴직 전에 미리)",
    desc: "은행·증권사·보험사 앱에서 비대면으로 개설할 수 있어요. 신분증과 본인 명의 휴대폰만 있으면 5~10분이면 완료돼요. 수수료와 운용 상품을 비교해서 선택하세요.",
    tip: "퇴직 직전에 급하게 만들면 조건 비교를 못 해요. 미리 만들어두는 게 좋아요",
    link: { label: "IRP 수수료 비교", href: "/w/irp-계좌-퇴직금-수령방법" },
  },
  {
    title: "인사팀에 IRP 계좌번호 제출",
    desc: "개설한 IRP 계좌번호와 금융기관명을 회사 인사팀에 알려줘요. 이메일이나 서면으로 제출하면 돼요. 회사가 이 계좌로 퇴직금을 송금해요.",
    tip: "계좌번호 오타 없이 정확하게 전달하세요",
  },
  {
    title: "퇴직금 IRP 입금 확인",
    desc: "퇴직일 기준 14일 이내에 회사가 IRP로 송금해야 해요. 입금 내역을 앱에서 확인하세요. 14일이 지나도 안 들어오면 회사에 문의하고, 지연이자(연 20%)를 청구할 수 있어요.",
    tip: "퇴직 후 2주 안에 입금되는지 확인하세요",
  },
  {
    title: "인출 또는 연금 전환 결정",
    desc: "바로 현금으로 쓰려면 인출 신청을 하면 돼요. 퇴직소득세를 뺀 금액이 1~3영업일 내에 입금돼요. 55세 이후 연금으로 나눠 받으면 세금이 30~40% 줄어요.",
    tip: "연금 수령 조건: 55세 이상 + IRP 가입 5년 이상 + 연간 1,500만원 이하",
  },
];

const EXCEPTIONS = [
  { name: "55세 이상 퇴직자", required: false, where: "일반 계좌로 직접 수령 가능 — IRP 의무 없음" },
  { name: "퇴직금 300만원 이하", required: false, where: "소액이라 일반 계좌로 수령 가능 — 본인 신청 필요" },
  { name: "퇴직급여가 없는 경우", required: false, where: "1년 미만 근무, 주당 15시간 미만 근로자는 퇴직금 자체가 없음" },
];

const CHECKLIST = [
  "IRP 계좌 개설 — 퇴직 전에 미리, 수수료 비교 후 선택",
  "인사팀에 IRP 계좌번호 정확히 제출",
  "퇴직 후 14일 이내 입금 여부 확인",
  "인출 vs 연금 전환 — 세금 차이 계산 후 결정",
  "IRP 중도해지 금지 — 세금 + 기타소득세 16.5% 추가 부담",
  "두 곳 이상 퇴직금 수령 시 이듬해 5월 종합소득세 합산 신고",
];

const FAQS = [
  {
    q: "IRP로 받으면 돈이 묶이는 건가요?",
    a: "아니에요. IRP는 퇴직금이 거쳐가는 계좌일 뿐이에요. 인출 신청하면 퇴직소득세를 뺀 금액이 1~3영업일 내에 일반 계좌로 입금돼요. 묶이는 게 아니라 절차가 하나 추가된 거예요.",
  },
  {
    q: "회사에서 일반 계좌로 달라고 해도 안 되나요?",
    a: "55세 미만이면 법적으로 회사도 IRP로만 지급해야 해요. 근로자가 일반 계좌를 원해도 회사가 일반 계좌로 지급하면 법 위반이에요. IRP 계좌를 만들어야 해요.",
  },
  {
    q: "IRP를 중도해지하면 어떻게 되나요?",
    a: "이연됐던 퇴직소득세 전액에 기타소득세 16.5%까지 추가로 부과돼요. 중도해지는 세금 면에서 매우 불리해요. 급하게 돈이 필요하다면 해지보다 인출 방법을 먼저 검토하세요.",
  },
  {
    q: "55세 이후 연금으로 받으면 세금이 얼마나 줄어요?",
    a: "일시금으로 받을 때 내야 할 퇴직소득세의 60~70%만 내요. 10년 이상 나눠 받으면 30~40%를 절약하는 거예요. 퇴직금이 클수록 절세 금액도 커져요.",
  },
  {
    q: "전 직장 퇴직금이 있는데 새 IRP를 만들어야 하나요?",
    a: "기존 IRP에 새 퇴직금을 추가로 받을 수도 있고, 새 IRP를 만들 수도 있어요. 둘 다 가능해요. 기존 IRP의 수수료와 상품이 마음에 들면 그냥 써도 되고, 더 좋은 조건이 있으면 새로 만들어도 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — IRP 과세 이연 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "irp-계좌-퇴직금-수령방법", title: "IRP 계좌 퇴직금 수령 방법", description: "IRP에서 인출하거나 연금으로 전환하는 절차를 단계별로 안내해요." },
  { slug: "퇴직금-세금", title: "퇴직소득세 계산법과 IRP 절세", description: "퇴직소득세 계산 구조와 IRP로 30~40% 절세하는 방법이에요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "평균임금 기준 퇴직금 계산 공식과 실전 예시예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 퇴직연금 의무화</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 의무화와 IRP 가입 방법<br />
        55세 미만이면 IRP로 받아야 해요
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 IRP 계좌를 만들어야 한다고 하죠? 2022년 4월 14일부터{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 개정으로
        55세 미만 퇴직자는 퇴직금을 반드시 IRP 계좌로 받아야 해요.
        "돈이 묶이는 거 아닌가?" 걱정되겠지만, IRP에서 바로 인출하면 1~3영업일 내에 현금으로 받을 수 있어요.
        IRP 개설 방법부터 예외 조건, 절세 선택지까지 정리했어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 IRP 수령 4단계</H2>
      <p style={body}>
        IRP 계좌를 미리 만들어두는 게 가장 중요해요. 퇴직 직전에 급하게 만들면 수수료나 운용 상품을 비교할 시간이 없어요.
        개설 후 계좌번호를 인사팀에 전달하면 회사가 IRP로 퇴직금을 송금해요.
      </p>
      <Steps steps={STEPS} />

      <GreenBox>
        의무화 시행: 2022년 4월 14일부터<br />
        대상: 55세 미만 퇴직자 전원<br />
        인출하면 퇴직소득세 차감 후 1~3영업일 내 입금 — 돈 묶이는 게 아니에요
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>IRP 의무가 없는 예외 3가지</H2>
      <p style={body}>
        모든 퇴직금이 IRP 의무 대상은 아니에요.
        55세 이상이거나 퇴직금이 300만원 이하라면 일반 계좌로 받을 수 있어요.
        다만 IRP로 받더라도 바로 인출이 가능하기 때문에, 예외 조건에 해당해도 IRP로 받아두면 나중에 절세 선택이 가능해요.
      </p>

      <SectionBadge>IRP 의무 예외 조건</SectionBadge>
      <DocTable docs={EXCEPTIONS} />

      <BorderBox>
        55세 미만이라도 IRP에서 언제든 인출할 수 있어요.
        절세 없이 바로 쓰고 싶다면 인출하고, 노후까지 놔두고 싶다면 IRP에 두고 55세 이후 연금으로 받는 게 유리해요.
      </BorderBox>

      <Divider />

      <H2>퇴직금 수령 체크리스트</H2>
      <p style={body}>
        IRP 중도해지는 세금 면에서 가장 불리한 선택이에요.
        해지하면 이연됐던 퇴직소득세 전액과 기타소득세 16.5%가 동시에 부과돼요.
        아래 체크리스트로 놓치는 항목 없이 처리하세요.
      </p>

      <SectionBadge>퇴직금 수령 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직연금 의무화와 IRP에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />
      <H2>출처</H2>
      <References groups={REFERENCES} />

      <CategoryButton label="퇴직금 관련 글 더 보기" href="/w/퇴직금-세금" />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 세율·공제 기준은 변경될 수 있으니 최신 기준은 고용노동부 또는 국세청에서 확인하세요." />
    </ArticleLayout>
  );
}
