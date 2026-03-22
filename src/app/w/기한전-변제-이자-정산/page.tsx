"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 빌린 돈을 만기 전에 갚으려는데, 이자를 어떻게 정산해야 하는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 기한전 변제 시 이자를 계산하고, 채권자와 합의해서 정산하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 민법상 기한전 변제 허용(단 손해배상 의무), 이자 계산법(사용 기간 이자), 법정이율 연 5%, 은행 조기상환 수수료 별도.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론) + BorderBox(계산 예시) + Steps(실무 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "기한전 변제하면 남은 기간 이자를 다 내야 하나요?",
    a: "원칙적으로 실제 사용한 기간의 이자만 내면 돼요. 다만 채권자가 손해배상을 청구하면 남은 기간 이자에 해당하는 금액을 배상해야 할 수 있어요.",
  },
  {
    q: "무이자 대출도 기한전 변제 손해배상이 있나요?",
    a: "무이자면 채권자에게 손해가 없으니 원금만 갚으면 돼요. 손해배상 문제가 생기지 않아요.",
  },
  {
    q: "은행 대출 조기상환 수수료는 얼마인가요?",
    a: "보통 잔여 원금의 1~2%예요. 대출 종류와 경과 기간에 따라 다르고, 3년 이상 경과하면 면제되는 경우가 많아요.",
  },
  {
    q: "이자율을 정하지 않았으면 어떤 이율이 적용되나요?",
    a: "민법 제379조 법정이율 연 5%가 적용돼요. 이자를 받기로 했는데 이율만 안 정한 경우에요.",
  },
  {
    q: "채권자가 원금 수령을 거부하면 어떻게 하나요?",
    a: "법원 공탁소에 원금과 이자를 공탁하면 변제한 것으로 인정돼요. 변제공탁이라고 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "민법 제468조 (기한 전의 변제)", url: "https://www.law.go.kr/법령/민법" },
      { label: "민법 제379조 (법정이율)", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령정보 — 금전채무 변제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=272&ccfNo=3&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율", description: "부동산 관련 세금 계산이 필요하면 확인하세요." },
  { slug: "금융소득-원천징수-이자-배당", title: "금융소득 원천징수", description: "이자소득에 대한 원천징수 구조를 확인하세요." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리·혜택", description: "돌려받은 원금을 효율적으로 운용할 수 있는 CMA를 확인하세요." },
];

const PROCESS_STEPS = [
  { title: "채권자에게 의사 전달", desc: "기한 전에 갚겠다는 의사를 먼저 전달해요.", tip: "갑자기 송금하면 채권자가 받지 않거나 분쟁이 생길 수 있어요." },
  { title: "이자 계산·합의", desc: "사용 기간 이자를 계산하고 채권자와 정산 금액을 합의해요.", tip: "합의 내용은 반드시 서면(문자·이메일·합의서)으로 남기세요." },
  { title: "원금 + 이자 지급", desc: "합의된 금액을 계좌이체하고 거래내역서를 보관해요." },
  { title: "변제확인서 수령", desc: "채권자에게 변제확인서나 영수증을 받아요.", tip: "나중에 '돈 안 받았다'는 분쟁을 방지하는 증거예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        빌린 돈 일찍 갚으면 이자는?<br />
        기한전 변제 이자 정산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        돈을 빌렸는데 생각보다 일찍 갚을 수 있게 됐죠.
        그런데 이자는 약속한 기간만큼 다 내야 하는 건지 헷갈려요.
        결론부터 말하면, <strong>실제 사용한 기간의 이자만 내면 돼요</strong>. 다만 조건이 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>민법상 기한전 변제, 언제든 갚을 수 있어요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제468조</a>에
        따르면, 당사자 사이에 특별한 약정이 없으면 채무자는 변제기 전이라도 언제든 변제할 수 있어요.
        다만 상대방의 손해는 배상해야 해요.
      </p>

      <GreenBox title="기한전 변제 핵심 규칙">
        · 특약 없으면 <strong>언제든 조기 상환 가능</strong><br />
        · 이자: <strong>실제 사용 기간분만</strong> 지급 (남은 기간 이자는 원칙적으로 면제)<br />
        · 채권자 손해: 남은 기간 이자 상당액을 배상 청구할 수 있음<br />
        · 무이자 대출: 원금만 갚으면 됨 (손해 없으므로)<br />
        · 법정이율: 약정이율 없으면 <strong>연 5%</strong> (민법 제379조)
      </GreenBox>

      <Divider />

      <H2>이자 정산은 이렇게 계산해요</H2>
      <p style={body}>
        이자부 대차 계약에서 기한전 변제 시 이자 계산법은 간단해요.
        원금 × 약정이율 × (실제 사용 기간 ÷ 365)로 계산하면 돼요.
      </p>

      <SectionBadge>계산 예시</SectionBadge>
      <BorderBox title="예시 1: 1,000만원, 연 10%, 1년 약정 → 6개월에 상환">
        실제 사용 기간 이자: 1,000만원 × 10% × 6/12 = <strong>50만원</strong><br />
        총 상환 금액: 1,000만원 + 50만원 = <strong>1,050만원</strong><br /><br />
        ※ 남은 6개월 이자 50만원은 원칙적으로 안 내도 돼요
      </BorderBox>

      <BorderBox title="예시 2: 500만원, 이율 미정(법정이율 5%), 6개월 약정 → 3개월에 상환">
        실제 사용 기간 이자: 500만원 × 5% × 3/12 = <strong>62,500원</strong><br />
        총 상환 금액: 500만원 + 62,500원 = <strong>5,062,500원</strong>
      </BorderBox>

      <Divider />

      <H2>은행 대출은 조기상환 수수료가 별도로 있어요</H2>
      <p style={body}>
        개인 간 거래와 달리 은행 대출은 약관에 조기상환 수수료가 정해져 있어요.
        민법 손해배상 규정이 아니라 약관에 따른 수수료예요.
      </p>

      <BorderBox title="은행 조기상환 수수료 일반 기준">
        · 주택담보대출: <strong>3년 이내</strong> 조기상환 시 잔여 원금의 약 1~1.5%<br />
        · 신용대출: <strong>1~2년 이내</strong> 조기상환 시 잔여 원금의 약 0.5~2%<br />
        · 정부 정책자금·서민금융 대출: 조기상환 수수료 <strong>없는 경우 많음</strong><br /><br />
        ※ 경과 기간에 따라 수수료 비율이 줄어들고, 일정 기간 후 면제되는 경우가 많아요
      </BorderBox>

      <Divider />

      <H2>개인 간 거래에서 기한전 변제 실무 절차</H2>
      <p style={body}>
        개인 간 돈 거래에서는 기한전 변제 시 분쟁이 생기기 쉬워요.
        아래 절차를 따르면 안전해요.
      </p>

      <Steps steps={PROCESS_STEPS} />

      <p style={body}>
        차용증 작성할 때 "기한전 변제 시 실제 사용 기간 이자만 지급한다"는 조항을 넣어두면 나중에 분쟁을 예방할 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 규정을 바탕으로 작성했어요. 금액이 크거나 분쟁 가능성이 있다면 변호사에게 상담받는 것을 권장해요." />
    </ArticleLayout>
  );
}
