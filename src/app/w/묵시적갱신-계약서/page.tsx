"use client";
// Q1. 묵시적갱신이 됐는데 새 계약서를 써야 하는지, 확정일자도 다시 받아야 하는지 궁금한 상황.
// Q2. 새 계약서가 필요 없다는 걸 확인하고, 기존 확정일자가 유효하다는 걸 알 수 있어야 해요.
// Q3. 묵시적갱신 시 기존 계약서 그대로 유효, 확정일자도 유지, 새 계약서 불필요, 보증금 변동 시에만 작성.
// Q4. GreenBox(결론 요약) + BorderBox(상황별 대응) + Checklist(확인사항) + Steps(보증금 변동 시 절차) + FAQ
// MAP-INTRO: 묵시적갱신 됐는데 새 계약서를 써야 하는지 궁금
// MAP-TYPE: 텍스트
// MAP-H2: 새 계약서 필요한가요 > 확정일자는 유효한가요 > 보증금 변동 시 > 주의할 점 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const CHANGE_STEPS = [
  { title: "집주인과 보증금 변동 합의", desc: "보증금을 올리거나 내리기로 합의했다면 새 계약서를 작성해야 해요." },
  { title: "새 임대차 계약서 작성", desc: "변경된 보증금과 계약 기간을 명시한 새 계약서를 작성하세요." },
  { title: "확정일자 다시 받기", desc: "동사무소(주민센터)에서 새 계약서에 확정일자를 받으세요. 600원이에요.", tip: "확정일자를 안 받으면 보증금 보호가 약해져요" },
  { title: "전입신고 확인", desc: "전입신고가 유지되고 있는지 확인하세요. 이미 전입돼 있으면 추가 조치 불필요해요." },
];

const FAQS = [
  { q: "묵시적갱신 되면 새 계약서 써야 하나요?", a: "안 써도 돼요. 기존 계약서가 그대로 유효해요. 보증금이나 조건이 변하지 않았다면 추가로 할 게 없어요." },
  { q: "기존 확정일자도 계속 유효한가요?", a: "네, 유효해요. 묵시적갱신은 기존 계약이 자동 연장되는 거라 확정일자도 그대로 유지돼요." },
  { q: "집주인이 새 계약서 쓰자고 하면요?", a: "보증금이나 조건 변동이 없다면 굳이 쓸 필요 없어요. 새 계약서를 쓰면 계약갱신청구권 1회를 소진한 걸로 볼 수 있어서 주의해야 해요." },
  { q: "보증금을 올렸으면 어떻게 해야 하나요?", a: "새 계약서를 작성하고 확정일자를 다시 받아야 해요. 기존 확정일자는 이전 보증금에 대한 것이라 추가분은 보호가 안 돼요." },
  { q: "묵시적갱신 후 계약 기간은 얼마예요?", a: "2년이에요. 기존 계약 만료일 다음 날부터 2년간 자동 연장돼요. 임차인은 언제든 3개월 전에 통보하고 해지할 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 묵시적갱신</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 됐는데 계약서 다시 써야 하나요?<br />
        확정일자 유지 여부와 주의점
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약 만료됐는데 양쪽 다 아무 말 안 했더니 <a href="/w/묵시적갱신" style={{ color: "#1D9E75" }}>묵시적갱신</a>이 됐어요.
        새 계약서를 써야 하나요? 안 써도 돼요. 기존 계약서가 그대로 유효하고, 확정일자도 유지돼요.
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75" }}>주택임대차보호법</a>에서 보장하고 있어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>새 계약서를 안 써도 되나요?</H2>
      <p style={body}>네, 안 써도 돼요. 묵시적갱신은 기존 계약이 같은 조건으로 자동 연장되는 거예요. 보증금, 월세, 기타 조건이 그대로 유지되니까 새로 계약서를 작성할 필요가 없어요.</p>
      <GreenBox title="핵심 결론">묵시적갱신 = 기존 계약 자동 연장 = 새 계약서 불필요 = 확정일자 유효 유지. 보증금이 변하지 않았다면 아무것도 안 해도 돼요.</GreenBox>
      <Divider />
      <H2>확정일자는 계속 유효한가요?</H2>
      <p style={body}>네, 유효해요. 기존 계약서에 찍힌 확정일자가 그대로 유지돼요. 묵시적갱신은 새로운 계약이 아니라 기존 계약의 연장이니까요. 전입신고도 유지되고, 대항력(보증금 보호 능력)도 그대로예요.</p>
      <BorderBox title="묵시적갱신 후 유지되는 것들">기존 계약서: 그대로 유효 | 확정일자: 그대로 유효 | 전입신고: 그대로 유효 | 대항력: 그대로 유효 | 계약 기간: 기존 만료일로부터 2년 자동 연장</BorderBox>
      <Divider />
      <H2>보증금이 변했으면 어떻게 하나요?</H2>
      <p style={body}>보증금을 올리거나 내리기로 합의했다면 새 계약서를 작성해야 해요. 이 경우에는 확정일자도 다시 받아야 보증금 전액이 보호돼요.</p>
      <Steps steps={CHANGE_STEPS} />
      <Divider />
      <H2>집주인이 새 계약서 쓰자고 하면 주의하세요</H2>
      <p style={body}>보증금 변동 없이 새 계약서를 쓰면 계약갱신청구권 1회를 소진한 걸로 볼 수 있어요. 묵시적갱신 상태가 더 유리할 수 있으니 신중히 판단하세요. 임차인은 묵시적갱신 상태에서 3개월 전에 통보하면 언제든 해지할 수 있어요.</p>
      <BorderBox title="묵시적갱신 vs 재계약 비교">묵시적갱신: 계약갱신청구권 미소진, 3개월 전 통보로 해지 가능, 복비 없음 | 재계약: 계약갱신청구권 소진 가능, 계약 기간 구속, 부동산 거치면 복비 발생</BorderBox>
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 기준 주택임대차보호법 정보를 바탕으로 작성됐어요. 구체적인 임대차 분쟁은 전문 변호사에 상담하세요." />
    </div>
  );
}
