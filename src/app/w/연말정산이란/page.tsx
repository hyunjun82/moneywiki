"use client";

// Q1. 사회초년생이나 연말정산을 처음 하는 사람이 연말정산이 뭔지, 어떻게 하면 세금을 돌려받는지 기본 개념을 알고 싶은 상황.
// Q2. 연말정산 개념을 이해하고, 공제 항목을 챙겨서 환급을 받을 수 있어야 해요.
// Q3. 연말정산 = 1년간 낸 세금 정산, 소득공제 vs 세액공제 차이, 주요 공제 항목, 간소화 서비스, 일정.
// Q4. GreenBox(핵심 개념) + BorderBox(소득공제 vs 세액공제) + Steps(연말정산 절차) + Checklist(공제 항목) + FAQ
// MAP-INTRO: 연말정산이 뭔지 모르겠고 어떻게 해야 세금을 돌려받는지 궁금
// MAP-TYPE: 텍스트
// MAP-H2: 연말정산이 뭔가요 > 소득공제 vs 세액공제 > 연말정산 절차 > 주요 공제 항목 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const YEA_STEPS = [
  { title: "간소화 서비스 자료 확인 (1월 15일~)", desc: "홈택스(hometax.go.kr)에서 연말정산 간소화 서비스를 열고 의료비, 교육비, 카드 사용액 등을 확인하세요." },
  { title: "빠진 자료 추가", desc: "간소화에 안 잡히는 항목(기부금 영수증, 월세 이체 내역 등)을 직접 추가하세요." },
  { title: "회사에 자료 제출", desc: "간소화 자료 PDF를 다운받아 회사 인사팀에 제출하세요. 보통 1월 말~2월 초가 마감이에요." },
  { title: "원천징수영수증 확인 (2~3월)", desc: "회사에서 원천징수영수증을 발급하면 환급액 또는 추가 납부액을 확인하세요." },
  { title: "환급금 수령 (3~4월)", desc: "환급이면 월급에 포함돼서 들어와요. 추가 납부면 월급에서 차감돼요." },
];

const DEDUCTION_CHECK = [
  "신용카드·체크카드 사용액 (총급여의 25% 초과분)",
  "의료비 (총급여의 3% 초과분)",
  "교육비 (본인·자녀 교육기관 납입금)",
  "보험료 (보장성보험 연 100만원 한도)",
  "기부금 (종교·사회복지단체)",
  "월세 세액공제 (총급여 7천만원 이하 무주택자)",
  "연금저축·IRP (세액공제 연 700만원 한도)",
];

const FAQS = [
  { q: "연말정산이 뭔가요 쉽게 설명해주세요", a: "매달 월급에서 대략적으로 뗀 세금을 연말에 정확히 다시 계산하는 거예요. 공제받을 게 많으면 세금을 돌려받고(환급), 적으면 추가로 내요(추가 납부)." },
  { q: "13월의 월급은 무조건 받는 건가요?", a: "아니요. 공제 항목을 많이 챙겨야 환급이 돼요. 공제가 적으면 오히려 추가로 세금을 낼 수 있어요." },
  { q: "소득공제와 세액공제 차이가 뭔가요?", a: "소득공제는 과세 대상 소득을 줄여주는 거예요(소득이 줄어드니 세금도 줄어요). 세액공제는 계산된 세금에서 직접 빼주는 거예요. 세액공제가 체감 효과가 커요." },
  { q: "신입 사원인데 연말정산 처음이에요", a: "홈택스 간소화 서비스에서 자료를 다운받아 회사에 내면 돼요. 기부금이나 월세처럼 간소화에 안 잡히는 항목은 직접 추가해야 해요." },
  { q: "환급금은 언제 들어오나요?", a: "보통 3~4월 월급에 포함돼서 들어와요. 회사마다 시기가 다르니 인사팀에 확인하세요." },
  { q: "놓친 공제를 나중에 받을 수 있나요?", a: "경정청구를 하면 최근 5년 치까지 소급 가능해요. 홈택스에서 '경정청구' 메뉴로 신청하세요." },
];

const REFS = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
    { label: "홈택스 간소화 서비스", url: "https://www.hometax.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 기초</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산이란? 세금 돌려받는 구조<br />
        공제 항목과 절차 기초 가이드
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직장인이라면 매년 1~2월에 연말정산을 해요. 1년간 매달 급여에서 대략 뗀 세금을 정확히 다시 계산하는 절차예요.
        공제받을 게 많으면 세금을 돌려받고, 적으면 추가로 내야 해요. 제대로 챙기면 &quot;13월의 월급&quot;을 받을 수 있어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>연말정산이 뭔가요?</H2>
      <p style={body}>매달 월급에서 소득세를 대략적으로 떼요(원천징수). 연말에 1년 치를 합산해서 정확한 세금을 다시 계산해요. 더 냈으면 돌려받고, 덜 냈으면 추가로 내는 거예요.</p>
      <GreenBox title="연말정산 핵심">매달 대략 뗀 세금 vs 1년 정확한 세금을 비교. 더 냈으면 환급(13월의 월급), 덜 냈으면 추가 납부. 공제 항목을 많이 챙길수록 환급 가능성이 높아요.</GreenBox>
      <Divider />
      <H2>소득공제와 세액공제, 뭐가 다른가요?</H2>
      <p style={body}>소득공제는 과세 대상 소득을 줄여주는 거예요. 소득이 4천만원인데 500만원 소득공제를 받으면 3,500만원에 대해 세금을 매겨요. 세액공제는 계산된 세금에서 직접 빼주는 거예요. 세금이 300만원인데 50만원 세액공제를 받으면 250만원만 내요.</p>
      <BorderBox title="소득공제 vs 세액공제">소득공제: 과세 대상 소득을 줄임 → 세율에 따라 절감 효과 다름 (고소득자에게 유리) | 세액공제: 세금에서 직접 차감 → 소득 수준과 무관하게 같은 금액 절감</BorderBox>
      <Divider />
      <H2>연말정산은 어떤 순서로 하나요?</H2>
      <p style={body}><a href="https://www.hometax.go.kr" style={{ color: "#1D9E75" }}>홈택스</a> 간소화 서비스에서 자료를 받고, 회사에 제출하면 돼요. 크게 어렵지 않아요.</p>
      <Steps steps={YEA_STEPS} />
      <Divider />
      <H2>어떤 공제 항목을 챙겨야 하나요?</H2>
      <p style={body}>주요 공제 항목을 빠짐없이 챙기세요. 하나라도 놓치면 환급금이 줄어요. <a href="/w/연말정산-놓치기-쉬운-공제-4가지" style={{ color: "#1D9E75" }}>놓치기 쉬운 공제 4가지</a>도 확인해보세요.</p>
      <Checklist items={DEDUCTION_CHECK} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 세법 정보를 바탕으로 작성됐어요. 개인 세무 상황에 따라 다를 수 있으니 국세상담센터(126)에 확인하세요." />
    </div>
  );
}
