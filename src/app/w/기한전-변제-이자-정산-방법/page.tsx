"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 빌린 돈을 약속 기한보다 일찍 갚으려는데, 이자를 어디까지 내야 하는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 사용 기간만큼의 이자만 계산해서 원금과 함께 갚고, 변제확인서를 받는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 기한전 변제 민법 규정, 이자 정산 방법(사용 기간만큼), 손해배상 가능성, 은행 조기상환 수수료(1~2%), 법정이율(연 5%).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론) + BorderBox(계산 예시) + Steps(실무 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const REPAY_STEPS = [
  { title: "채권자에게 미리 연락", desc: "기한 전에 갚겠다는 의사를 먼저 밝혀요. 갑자기 송금하면 분쟁이 생길 수 있어요." },
  { title: "이자 계산", desc: "원금 x 약정이율 x (실제 사용 일수 / 365)로 계산해요. 이율 약정이 없으면 법정이율 연 5%를 적용해요." },
  { title: "원금 + 이자 지급", desc: "계좌이체로 갚고 거래내역서를 보관하세요. 현금으로 갚으면 영수증을 반드시 받으세요." },
  { title: "변제확인서 수령", desc: "빚을 다 갚았다는 확인서를 서면으로 받아요. 나중에 '돈 안 받았다'는 분쟁을 막을 수 있어요." },
];

const FAQS = [
  { q: "기한전 변제하면 남은 기간 이자도 내야 하나요?", a: "원칙적으로 실제 사용한 기간의 이자만 내면 돼요. 다만 채권자가 손해배상을 청구하면 남은 기간 이자를 배상해야 할 수 있어요. 실무에서는 대부분 사용 기간 이자만 받아요." },
  { q: "무이자로 빌렸으면 그냥 원금만 갚으면 되나요?", a: "네, 무이자 대출이면 채권자에게 발생하는 손해가 없으니 원금만 갚으면 돼요." },
  { q: "은행 대출 조기상환 수수료는 얼마예요?", a: "보통 잔여 원금의 0.5~1.5% 수준이에요. 주택담보대출은 3년 이내, 신용대출은 1~2년 이내 조기상환 시 수수료가 있어요. 일정 기간 경과 후에는 면제되는 경우도 많아요." },
  { q: "이자율을 안 정했으면 어떻게 계산하나요?", a: "민법상 법정이율 연 5%가 적용돼요. '이자 있음'이라고만 약정하고 이율을 안 정했다면 연 5%로 계산하면 돼요." },
  { q: "채권자가 기한전 변제를 거부할 수 있나요?", a: "특별한 약정이 없다면 거부할 수 없어요. 만약 거부한다면 법원 공탁소에 원금과 이자를 공탁하면 변제한 것으로 인정돼요." },
  { q: "차용증에 기한전 변제 조항을 넣어야 하나요?", a: "넣어두면 분쟁 예방에 좋아요. '채무자는 변제기 전이라도 언제든 변제 가능하며, 실제 사용 기간의 이자만 지급한다'처럼 구체적으로 적으세요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "민법 제468조(변제기 전의 변제) — 법제처", url: "https://www.law.go.kr/법령/민법" },
      { label: "금전거래 변제방법 — 찾기쉬운 생활법령정보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=272&ccfNo=3&cciNo=1&cnpClsNo=1" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 금전거래</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        빌린 돈 일찍 갚으려는데, 이자는?<br />
        기한전 변제 이자 정산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        친구에게 1년 뒤 갚기로 한 돈이 있는데 일찍 갚을 수 있게 됐어요.
        남은 기간 이자까지 다 내야 하는지, 사용한 기간만큼만 내면 되는지 궁금하시죠?
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75" }}>민법</a>에서 정한 기준을 정리했어요.
      </p>

      <Divider />

      <H2>기한 전에 갚을 수 있어요</H2>
      <p style={body}>
        민법 제468조에 따르면, 특별한 약정이 없으면 변제기 전이라도 채무자가 언제든 갚을 수 있어요.
        다만 상대방에게 발생하는 손해는 배상해야 하는데, 실무에서는 대부분 실제 사용한 기간의 이자만 계산해서 받아요.
      </p>

      <GreenBox title="핵심 결론">
        기한전 변제 시 원칙적으로 실제 사용 기간의 이자만 내면 돼요.
        무이자라면 원금만 갚으면 되고, 이율을 안 정했으면 법정이율 연 5%를 적용해요.
      </GreenBox>

      <Divider />

      <H2>이자 정산, 이렇게 계산해요</H2>
      <p style={body}>
        이자부 금전소비대차계약에서 기한전 변제 시 이자 계산은 단순해요.
        원금에 약정이율을 곱한 뒤 실제 사용 일수만큼만 계산하면 돼요.
      </p>

      <BorderBox>
        <strong>계산 예시</strong><br />
        · 원금 1,000만원, 약정이율 연 10%, 1년 후 갚기로 한 계약<br />
        · 3개월 만에 갚는 경우: 1,000만원 x 10% x (90일/365일) = <strong>약 24.6만원</strong><br />
        · 원금 1,000만원 + 이자 24.6만원 = <strong>총 1,024.6만원</strong> 갚으면 돼요<br />
        · 나머지 9개월 이자는 내지 않아도 돼요
      </BorderBox>

      <p style={body}>
        이율을 약정했다면 그 이율로, 약정하지 않았다면 법정이율 연 5%로 계산해요.
        채권자가 손해배상을 청구하면 남은 기간 이자를 배상해야 할 수 있지만,
        실제로는 일찍 돌려받은 원금을 다른 곳에 쓸 수 있으니 손해배상액이 줄어들어요.
      </p>

      <Divider />

      <H2>은행 대출은 조기상환 수수료가 있어요</H2>
      <p style={body}>
        은행이나 금융기관 대출은 개인 간 거래와 달라요. 약관에 조기상환 수수료가 명시돼 있거든요.
      </p>

      <SectionBadge>대출 유형별 조기상환 수수료</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대출 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>수수료율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>면제 시점</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["주택담보대출", "0.5~1.5%", "대출 후 3년 경과"],
              ["신용대출", "0.5~1.0%", "대출 후 1~2년 경과"],
              ["정부 정책자금", "없음", "-"],
              ["서민금융진흥원 대출", "없음", "-"],
            ].map(([type, fee, waive], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{fee}</td>
                <td style={{ padding: "9px 12px" }}>{waive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>갚을 때 이렇게 하세요</H2>
      <p style={body}>
        개인 간 금전거래에서는 분쟁이 생기기 쉬워요. 아래 순서대로 하면 안전해요.
      </p>

      <Steps steps={REPAY_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 및 찾기쉬운 생활법령정보를 바탕으로 작성됐어요. 은행 대출 조기상환 수수료는 금융기관별로 다르니 대출 약관에서 확인하세요." />
    </ArticleLayout>
  );
}
