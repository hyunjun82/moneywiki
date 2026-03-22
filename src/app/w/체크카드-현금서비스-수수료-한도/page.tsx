"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 급하게 현금이 필요해서 체크카드로 현금서비스 받을 수 있는지 알고 싶은 사람
// Q2: 체크카드는 현금서비스가 안 된다는 사실을 알고, 신용카드 현금서비스 조건 파악
// Q3: 체크카드 vs 신용카드 차이, 신용카드 이자율 6.9~19.95%, 한도 40%, 1일 200만원
// Q4: GreenBox(결론) + BorderBox(비교) + Steps(이용 방법) + Checklist + FAQ

const STEPS = [
  {
    title: "ATM에서 신용카드 삽입",
    desc: "은행이나 편의점 ATM에 신용카드를 넣고 현금서비스(단기카드대출) 메뉴를 선택해요. 본인 인증 후 금액을 입력하면 바로 현금이 나와요.",
    tip: "타행 ATM이면 수수료가 더 높을 수 있어요.",
  },
  {
    title: "모바일 앱에서 신청",
    desc: "각 카드사 앱에서 현금서비스 메뉴를 찾아 신청하면 돼요. 지정한 계좌로 바로 입금되는 방식이에요. ATM보다 수수료가 낮은 경우가 많아요.",
  },
  {
    title: "콜센터 전화 신청",
    desc: "카드사 고객센터에 전화해서 현금서비스를 신청할 수도 있어요. 본인 확인 후 계좌로 입금돼요. 영업시간 내에만 가능한 곳이 많아요.",
  },
];

const CHECKLIST = [
  "체크카드는 현금서비스 기능 없음 — ATM 출금은 내 돈 찾기",
  "신용카드 현금서비스 = 단기카드대출 (빌리는 것)",
  "이자율: 연 6.9%~19.95% (신용등급별 차등)",
  "ATM 수수료: 건당 700원~1,200원",
  "이용 한도: 카드 총 한도의 40%",
  "1일 ATM 출금 한도: 최대 200만원",
];

const FAQS = [
  { q: "체크카드로 현금서비스 받을 수 있나요?", a: "아니에요. 체크카드에는 현금서비스 기능이 없어요. ATM에서 체크카드로 돈을 찾는 건 내 통장에서 출금하는 거라 이자나 수수료가 없어요." },
  { q: "신용카드 현금서비스 이자가 얼마예요?", a: "연 6.9%~19.95%예요. 개인 신용등급에 따라 달라지고, 신용이 좋을수록 낮은 이자율을 적용받아요. 여기에 ATM 수수료 700~1,200원이 추가돼요." },
  { q: "현금서비스 한도는 어떻게 되나요?", a: "신용카드 총 한도의 40% 수준이에요. ATM에서는 1일 최대 200만원까지 인출할 수 있어요." },
  { q: "현금서비스 쓰면 신용등급이 떨어지나요?", a: "현금서비스 자체가 바로 떨어뜨리진 않지만, 자주 쓰면 금융이력에 영향을 줄 수 있어요. 연체가 생기면 확실히 떨어져요." },
  { q: "해외에서도 현금서비스가 되나요?", a: "네, 해외 CD/ATM에서도 가능해요. 1일 최대 200만원이고, 해외 이용 수수료가 별도로 붙어요." },
];

const REFERENCES = [
  {
    category: "카드사 안내",
    items: [
      { label: "삼성카드: 단기카드대출 안내", url: "https://www.samsungcard.com" },
      { label: "신한카드: 현금서비스 안내", url: "https://www.shinhancard.com" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 카드 · 현금서비스</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체크카드로 현금서비스 받을 수 있을까?<br />
        수수료·한도와 신용카드 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급하게 현금이 필요한데 체크카드로 현금서비스가 되는지 궁금하죠.
        결론부터 말하면 체크카드에는 현금서비스 기능이 없어요.
        체크카드로 ATM에서 돈을 찾으면 그건 내 통장 잔액을 인출하는 거예요.
        현금서비스(돈을 빌리는 것)는 신용카드에만 있는 기능이에요.
      </p>

      <Divider />

      <H2>체크카드와 신용카드, 뭐가 다른가요?</H2>
      <p style={body}>
        체크카드는 내 통장에 있는 돈을 바로 쓰는 카드예요.
        잔액이 없으면 결제가 안 돼요. 신용 기능이 없으니 현금서비스도 없죠.
      </p>
      <p style={body}>
        신용카드는 카드사가 먼저 돈을 내주고 나중에 받는 방식이에요.
        그래서 현금서비스(단기카드대출) 기능이 있어요.
        돈을 빌리는 거라 이자와 수수료가 발생해요.
      </p>

      <GreenBox title="핵심 차이">
        체크카드: 내 돈 출금 → 이자·수수료 없음<br />
        신용카드: 카드사에서 빌림 → 이자 6.9~19.95% + ATM 수수료
      </GreenBox>

      <Divider />

      <H2>신용카드 현금서비스 조건은?</H2>
      <p style={body}>
        신용카드 현금서비스는 정식 명칭으로 '단기카드대출'이에요.
        이자율은 연 6.9%~19.95%로 신용등급에 따라 차등 적용돼요.
        ATM 이용 시 건당 700~1,200원 수수료가 추가로 붙어요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>이자율</p>
        <p style={{ ...body, marginBottom: 4 }}>연 6.9% ~ 19.95% (신용등급별 차등)</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>한도</p>
        <p style={{ ...body, marginBottom: 4 }}>카드 총 한도의 40% | ATM 1일 최대 200만원</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>ATM 수수료</p>
        <p style={{ ...body, marginBottom: 0 }}>건당 700원 ~ 1,200원 (카드사별 상이)</p>
      </BorderBox>

      <Divider />

      <H2>현금서비스는 어떻게 받나요?</H2>
      <p style={body}>
        ATM, 모바일 앱, 콜센터 세 가지 방법이 있어요.
        이자율이 높은 편이라 가능하면 짧은 기간 내에 갚는 게 좋아요.
      </p>

      <SectionBadge>이용 방법</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>핵심 체크리스트</H2>
      <p style={body}>
        현금서비스 관련 핵심만 정리했어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        체크카드·신용카드 현금서비스 관련 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주요 카드사 공시 정보를 바탕으로 작성됐어요. 카드사별 이자율과 수수료는 다를 수 있으니 본인 카드사에서 확인하세요." />
    </div>
  );
}
