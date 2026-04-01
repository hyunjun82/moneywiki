"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 상가 계약 끝나는데 권리금을 집주인한테 돌려받을 수 있는지 궁금한 임차인
// Q2: 권리금은 임대인에게 반환 청구 불가하다는 사실을 알고, 회수 방법을 파악
// Q3: 임대인 반환 의무 없음, 신규 임차인에게만 회수, 회수기회 보호 의무, 방해 시 손해배상
// Q4: GreenBox(결론) + Steps(권리금 회수 절차) + BorderBox(방해 행위) + Checklist + FAQ

const STEPS = [
  {
    title: "계약 종료 6개월 전부터 신규 임차인 물색",
    desc: "권리금 회수기회 보호 기간은 계약 종료 6개월 전부터예요. 이 시기에 맞춰 신규 임차인 후보를 찾기 시작하세요. 부동산 중개업소에 의뢰하거나 직접 구인해도 돼요.",
    tip: "너무 늦으면 적절한 신규 임차인을 못 찾을 수 있어요.",
  },
  {
    title: "임대인에게 신규 임차인 통보",
    desc: "후보를 찾았으면 임대인에게 내용증명으로 신규 임차인 정보를 알려야 해요. 내용증명을 보내는 이유는 나중에 방해 행위 입증에 증거로 쓰기 위해서예요.",
    tip: "내용증명은 우체국에서 보내면 법적 증거력이 생겨요.",
  },
  {
    title: "임대인 동의 및 권리금 계약",
    desc: "임대인이 정당한 사유 없이 거부하면 안 돼요. 동의를 받은 후 신규 임차인과 권리금 계약서를 작성하세요. 금액, 지급 시기, 양도 범위를 명확히 적어야 해요.",
  },
  {
    title: "방해 시 손해배상 청구",
    desc: "임대인이 정당한 사유 없이 거부하거나 과도한 차임을 요구해서 권리금을 회수하지 못했다면, 회수하지 못한 금액만큼 손해배상을 청구할 수 있어요. 3년 이내에 청구해야 해요.",
    tip: "소송 전 내용증명부터 보내세요. 협상으로 해결되는 경우가 많아요.",
  },
];

const CHECKLIST = [
  "권리금은 임대인에게 반환 청구 불가 — 신규 임차인에게만 회수",
  "회수기회 보호 기간: 계약 종료 6개월 전 ~ 종료일",
  "임대인은 신규 임차인 주선을 방해하면 안 됨",
  "과도한 차임 인상, 권리금 직접 요구 = 방해 행위",
  "방해로 인한 손해 → 임대인에게 손해배상 청구 가능",
  "권리금 계약서에 금액·시기·범위 명확히 기재",
  "내용증명으로 증거 확보 (방해 행위 입증용)",
];

const FAQS = [
  { q: "권리금을 집주인에게 돌려받을 수 있나요?", a: "아니에요. 권리금은 새로 들어오는 임차인에게서만 받을 수 있어요. 임대인에게는 반환 청구권이 없어요." },
  { q: "회수기회 보호 의무가 뭔가요?", a: "임대인은 계약 종료 6개월 전부터 종료일까지, 임차인이 신규 임차인에게 권리금 받는 걸 방해하면 안 된다는 의무예요. 상가건물임대차보호법에 규정돼 있어요." },
  { q: "임대인이 월세를 2배로 올리겠다고 해서 신규 임차인이 포기했어요", a: "과도한 차임 요구로 권리금 회수를 방해한 거예요. 회수하지 못한 권리금만큼 임대인에게 손해배상을 청구할 수 있어요." },
  { q: "임대인이 신규 임차인에게 권리금을 달라고 하면요?", a: "명백한 방해 행위예요. 임대인은 임차인의 권리금 회수에 개입할 수 없어요. 이런 경우 손해배상 청구 사유가 돼요." },
  { q: "권리금 분쟁은 어디에 상담하나요?", a: "대한법률구조공단(132)에서 무료 법률상담이 가능해요. 대한상사중재원이나 법원 조정제도도 이용할 수 있어요." },
  { q: "계약갱신청구권이랑 관계가 있나요?", a: "네, 계약갱신청구권을 행사하면 임대 기간을 늘릴 수 있어서 그 기간 동안 영업가치를 높이고 나중에 권리금을 더 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상가건물임대차보호법: 권리금 관련 규정", url: "https://www.law.go.kr/법령/상가건물임대차보호법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운생활법령정보: 상가 권리금", url: "https://easylaw.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 상가 · 권리금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가 권리금, 집주인한테 돌려받을 수 있나?<br />
        임대인 반환 의무와 회수 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상가에 3,000만원 권리금 내고 들어왔는데, 계약 끝나면 이 돈 돌려받을 수 있을까요.
        결론부터 말하면 임대인에게 권리금 반환을 청구할 수 없어요.
        권리금은 새로 들어오는 임차인에게서만 받을 수 있어요.
        대신 <a href="https://www.law.go.kr/법령/상가건물임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가건물임대차보호법</a>이 임차인의 권리금 회수 기회를 보호해주고 있어요.
      </p>

      <Divider />

      <H2>왜 임대인에게 돌려받을 수 없나요?</H2>
      <p style={body}>
        권리금은 영업 가치(단골, 입지, 인테리어 등)에 대한 대가예요.
        임차인이 운영하면서 쌓은 가치라서, 이걸 물려받는 다음 임차인이 돈을 내는 구조예요.
        임대인은 권리금을 받은 적이 없으니 돌려줄 의무도 없는 거예요.
      </p>

      <GreenBox title="핵심 결론">
        임대인 반환 의무: 없음 → 신규 임차인에게서만 회수 가능<br />
        임대인의 의무: 권리금 회수기회 보호 (방해 금지)
      </GreenBox>

      <Divider />

      <H2>권리금은 어떻게 회수하나요?</H2>
      <p style={body}>
        계약 종료 전에 신규 임차인을 찾아서 권리금을 받는 거예요.
        임대인은 이 과정을 방해하면 안 돼요. 이게 '권리금 회수기회 보호 의무'예요.
      </p>

      <SectionBadge>권리금 회수 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>임대인이 방해하면 어떻게 되나요?</H2>
      <p style={body}>
        임대인이 정당한 사유 없이 신규 임차인을 거부하거나, 과도한 조건을 내걸면 방해 행위로 인정돼요.
        이 경우 회수하지 못한 권리금만큼 임대인에게 손해배상을 청구할 수 있어요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, color: "#dc2626" }}>금지되는 방해 행위</p>
        <p style={{ ...body, marginBottom: 4 }}>정당한 사유 없이 신규 임차인 거부</p>
        <p style={{ ...body, marginBottom: 4 }}>과도한 차임·보증금 인상 요구</p>
        <p style={{ ...body, marginBottom: 4 }}>신규 임차인에게 권리금 직접 요구</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>정당한 거부 사유 (인정되는 경우)</p>
        <p style={{ ...body, marginBottom: 4 }}>3개월 이상 차임 연체</p>
        <p style={{ ...body, marginBottom: 0 }}>거짓·부정한 방법으로 임차, 용도 위반</p>
      </BorderBox>

      <Divider />

      <H2>핵심 체크리스트</H2>
      <p style={body}>
        상가 권리금 회수 관련 핵심을 정리했어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        상가 권리금 임대인 반환 관련 실제 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상가건물임대차보호법을 바탕으로 작성됐어요. 개별 사안의 법률 상담은 대한법률구조공단(132)에 문의하세요." />
    </div>
  );
}
