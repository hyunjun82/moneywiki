"use client";

// Q1. 근로복지공단 퇴직연금(푸른씨앗) 가입자가 급하게 돈이 필요해서 중도인출 가능한지 확인하려는 상황
// Q2. 법정 사유에 해당하는지 확인하고, 푸른씨앗 홈페이지에서 중도인출을 신청한다
// Q3. 법정 사유 6가지, 사유별 서류, 인출 한도(필요 금액만), 세금(퇴직소득세 vs 기타소득세), 처리 기간(7~14일)
// Q4. GreenBox(법정 사유) + DocTable(서류) + Steps(신청 절차) + BorderBox(세금 주의) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "법정 사유에 해당하는지 먼저 확인하세요",
    desc: "무주택자 주택구입, 전세금 마련, 6개월 이상 요양, 파산선고, 개인회생 인가, 천재지변 중 하나에 해당해야 해요. 해당하지 않으면 중도인출이 불가능해요.",
  },
  {
    title: "푸른씨앗 홈페이지에 접속하세요",
    desc: "pension.comwel.or.kr에 로그인한 후 '중도인출 신청' 메뉴를 찾아요. 인출 사유를 선택하고 필요한 정보를 입력해요.",
    link: { label: "푸른씨앗 바로가기", href: "https://pension.comwel.or.kr" },
  },
  {
    title: "증빙서류를 업로드하세요",
    desc: "사유별로 필요한 서류가 달라요. 스캔본이나 사진으로 업로드하면 돼요. 주민등록등본은 모든 사유에 공통으로 필요해요.",
  },
  {
    title: "심사 후 지급받으세요",
    desc: "서류 심사에 7~14일 정도 걸려요. 서류에 문제가 없으면 지급되고, 보완이 필요하면 연락이 와요. 진행 상황은 홈페이지에서 확인 가능해요.",
  },
];

const DOCS = [
  { name: "주민등록등본", required: true, where: "정부24 온라인 발급" },
  { name: "매매계약서 (주택구입 시)", required: false, where: "계약 시 수령" },
  { name: "무주택확인서 (주택구입/전세 시)", required: false, where: "주민센터 발급" },
  { name: "임대차계약서 (전세금 시)", required: false, where: "계약 시 수령" },
  { name: "의사 진단서 + 의료비 영수증 (요양 시)", required: false, where: "병원 발급" },
  { name: "법원 결정문 (파산/회생 시)", required: false, where: "법원 발급" },
];

const FAQS = [
  { q: "아무 때나 중도인출할 수 있나요?", a: "안 돼요. 반드시 법정 사유(주택구입, 전세금, 의료비, 파산, 회생, 천재지변)에 해당해야 해요. 생활비가 부족하거나 투자 목적으로는 인출이 불가능해요." },
  { q: "적립금 전액을 빼낼 수 있나요?", a: "안 돼요. 필요한 금액만 인출 가능해요. 주택구입이면 매매대금 한도, 전세금이면 계약서 금액 한도, 의료비면 실제 치료비 한도예요." },
  { q: "재직 중에 해지할 수 있나요?", a: "안 돼요. 재직 중에는 전체 해지가 불가능해요. 중도인출만 가능하고, 그것도 법정 사유가 필요해요. 퇴직해야 전액 수령이 가능해요." },
  { q: "세금은 어떻게 되나요?", a: "법정 사유로 인출하면 퇴직소득세만 내요. 근속연수가 길수록 세율이 낮아요. 법정 사유 아닌 인출은 기타소득세 16.5%가 붙어서 훨씬 불리해요." },
  { q: "처리 기간은 얼마나 걸리나요?", a: "서류 심사 포함 7~14일 정도예요. 서류 보완이 필요하면 더 걸릴 수 있어요. 급하면 근로복지공단(1661-0075)에 진행 상황을 문의하세요." },
  { q: "푸른씨앗 말고 다른 퇴직연금도 같은 방식인가요?", a: "법정 사유는 동일해요. 근로자퇴직급여보장법에서 정한 중도인출 사유는 모든 DC형 퇴직연금에 공통으로 적용돼요. 신청 방법만 금융기관별로 달라요." },
];

const REFS = [
  { category: "기관", items: [
    { label: "근로복지공단 퇴직연금(푸른씨앗)", url: "https://pension.comwel.or.kr" },
    { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
  ]},
  { category: "법령", items: [
    { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 중도인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로복지공단 퇴직연금, 급할 때 빼도 되나요?<br />
        푸른씨앗 중도인출 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로복지공단 퇴직연금에 가입되어 있는데 집을 사거나 전세금이 급하게 필요한 상황이시죠?
      </p>
      <p style={body}>
        푸른씨앗도 다른 퇴직연금과 마찬가지로 <strong>법정 사유</strong>가 있어야 중도인출이 가능해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서 인출 사유를 정하고 있어요.
        사유에 해당하면 <a href="https://pension.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>푸른씨앗 홈페이지</a>에서 온라인 신청이 가능해요.
      </p>

      <Divider />

      <H2>중도인출이 가능한 법정 사유는 뭔가요?</H2>
      <p style={body}>
        아래 6가지 사유 중 하나에 해당해야 인출이 가능해요. 단순히 돈이 필요하다는 이유로는 뺄 수 없어요.
      </p>

      <GreenBox title="중도인출 법정 사유 6가지">
        {"1. 무주택자 주택구입 (본인 또는 배우자 명의)\n2. 무주택자 전세금·보증금 마련\n3. 6개월 이상 요양 (본인, 배우자, 부양가족)\n4. 파산선고를 받은 경우\n5. 개인회생 인가를 받은 경우\n6. 천재지변으로 피해를 입은 경우"}
      </GreenBox>

      <p style={body}>
        주택구입과 전세금은 반드시 <strong>무주택자</strong>여야 해요. 이미 집이 있으면 이 사유로 인출할 수 없어요. 인출 한도는 필요한 금액만이에요. 전체 적립금을 빼는 게 아니에요.
      </p>

      <Divider />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        사유에 따라 제출 서류가 달라요. 주민등록등본은 모든 사유에 공통이에요.
      </p>

      <SectionBadge>사유별 필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>신청 절차를 알려드릴게요</H2>
      <p style={body}>
        푸른씨앗 홈페이지에서 온라인으로 신청해요. 서류도 온라인으로 제출 가능해요.
      </p>

      <SectionBadge>신청 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>세금은 어떻게 되나요?</H2>
      <p style={body}>
        법정 사유로 인출하느냐 아니냐에 따라 세금 차이가 커요.
      </p>

      <BorderBox>
        <strong>법정 사유 인출 vs 부적격 인출</strong>{"\n"}
        {"· 법정 사유 인출: 퇴직소득세만 부과 (근속연수 길수록 낮아요)\n· 법정 사유 아닌 인출: 기타소득세 16.5% 부과\n→ 정당한 사유 없이 인출하면 세금 부담이 훨씬 커져요"}
      </BorderBox>

      <p style={body}>
        <a href="/w/퇴직연금-수령-일시금-연금-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 수령 방식</a>에 따라 세금이 달라지니까, 퇴직 시점에 일시금과 연금 중 유리한 방식을 선택하세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법에 따라 작성됐어요. 개인별 적립금과 인출 가능 금액은 근로복지공단(1661-0075)에서 확인하세요." />
    </div>
  );
}
