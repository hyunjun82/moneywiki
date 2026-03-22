"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 전세 계약기간 중 이사를 가야 하는데, 중개보수를 내가 내야 하는지 고민하는 상황
// Q2: 법적 의무 여부를 파악하고, 집주인과 협상해서 중개보수 부담을 결정
// Q3: 법제처 해석(법적 의무 없음), 관행(임차인 부담), 묵시적갱신 후 면제, 특약, 협상 전략
// Q4: GreenBox(핵심 결론) + Steps(협상 절차) + Checklist(특약 작성) + FAQ

const STEPS_DATA = [
  { title: "계약서 특약 확인", desc: "먼저 계약서에 중도해지 시 중개보수 부담에 대한 특약이 있는지 확인하세요. 있으면 그대로 따르면 돼요." },
  { title: "집주인에게 미리 통보", desc: "이사 2~3개월 전에 솔직하게 알려야 해요. 빨리 말할수록 협의가 수월해지죠." },
  { title: "협상안 제시", desc: "\"중개보수 절반 부담할게요\" 또는 \"제가 새 세입자 구해올게요\" 같은 조건을 제안하세요." },
  { title: "합의 내용 문서화", desc: "합의된 조건을 문자나 카카오톡으로 남겨두세요. 나중에 분쟁 방지용 증거가 돼요.", tip: "구두 합의보다 문자 기록이 훨씬 안전해요" },
  { title: "새 세입자 계약 + 보증금 수령", desc: "새 세입자가 구해지면 보증금을 돌려받고 이사하세요." },
];

const CHECKLIST = [
  "계약서에 \"중도해지 시 중개보수 부담\" 특약 포함 여부 확인",
  "묵시적갱신 또는 계약갱신청구권 행사 여부 확인 (해당 시 임차인 부담 없음)",
  "특약이 없으면 법적 의무 없음을 인지하고 협상 진행",
  "합의 내용을 반드시 문자/메시지로 기록",
  "내용증명 발송 준비 (협의가 안 될 경우 보증금 반환 요구용)",
];

const FAQS = [
  { q: "법적으로 임차인이 중개보수를 내야 하나요?", a: "법적 의무는 없어요. 법제처도 나가는 임차인은 중개의뢰인이 아니라서 중개보수를 부담할 의무가 없다고 해석했어요. 하지만 관행상 임차인이 부담하는 경우가 많죠." },
  { q: "묵시적갱신 후 나가면 복비를 안 내도 되나요?", a: "맞아요. 묵시적갱신이나 계약갱신청구권을 행사한 후에는 임차인이 3개월 전 통지로 해지할 수 있고, 중개보수도 임대인이 부담해요." },
  { q: "집주인이 보증금을 안 돌려주면 어떻게 하나요?", a: "내용증명으로 보증금 반환을 요구하세요. 그래도 안 주면 임차권등기명령을 신청해서 이사 후에도 대항력을 유지한 채 보증금을 받을 수 있어요." },
  { q: "중개보수는 얼마나 되나요?", a: "전세 보증금에 따라 달라져요. 5천만 원 이하는 0.4%, 5천만~2억은 0.3%, 2억 초과는 협의(상한 0.4%). 보증금 1억이면 약 30만 원이에요." },
  { q: "특약 없이 일방적으로 나가면 어떻게 되나요?", a: "계약 위반으로 집주인이 손해배상을 청구할 수 있어요. 새 세입자를 구하는 기간 동안의 손해를 물어야 할 수 있으니, 반드시 협의 후 나가세요." },
  { q: "계약서에 넣을 특약 문구가 있나요?", a: "\"임차인의 불가피한 사유로 중도해지 시, 2개월 전 통지 후 해지 가능. 중개보수는 임대인 부담\" 같은 문구를 특약란에 넣어두면 분쟁을 예방할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "공인중개사법: 중개보수 규정", url: "https://www.law.go.kr/법령/공인중개사법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 전세 중도해지 중개보수", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=3021" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세 중도해지 시 복비, 누가 내야 할까?<br />
        법적 기준과 협상 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2년 계약인데 1년 만에 이사를 가야 하는 상황이 생겼어요. 집주인은 새 세입자 구하는 중개보수를 내가 내라고 하는데, 정말 내야 하는 걸까요?
        법제처 해석에 따르면 나가는 임차인은 <strong>법적으로 중개보수를 낼 의무가 없어요</strong>.
        하지만 현실에서는 협의가 필요하죠. 법적 기준과 실무 협상 방법을 정리해드릴게요.
      </p>

      <Divider />

      <H2>법적으로 복비를 안 내도 되는 건가요?</H2>
      <p style={body}>
        결론부터 말하면, <strong>법적 의무는 없어요</strong>.
        <a href="https://www.law.go.kr/법령/공인중개사법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법</a>에서 중개보수는 중개를 의뢰한 사람이 부담하도록 규정하고 있어요.
        나가는 임차인이 부동산에 중개를 의뢰한 게 아니라, 집주인이 새 세입자를 구하기 위해 의뢰하는 거니까요.
      </p>
      <p style={body}>
        <a href="https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=3021" style={{ color: "#1D9E75", textDecoration: "underline" }}>법제처도 같은 해석</a>을 내놨어요.
        &ldquo;나가는 임차인은 중개의뢰인이 아니기 때문에 중개보수를 부담할 법적 의무가 없다&rdquo;는 거죠.
      </p>
      <p style={body}>
        다만 현실이 좀 다른 게, 집주인도 계약 기간이 끝나기 전에 보증금을 돌려줄 의무가 없어요.
        내가 &ldquo;복비 안 낸다&rdquo;고 버티면, 집주인도 &ldquo;보증금은 만기에 준다&rdquo;고 버틸 수 있는 거죠.
        그래서 <strong>협상</strong>이 중요해요.
      </p>

      <GreenBox title="법적 기준 요약">
        법적 의무: 나가는 임차인에게 중개보수 부담 의무 <strong>없음</strong> (법제처 해석)<br />
        관행: 임차인이 부담하는 경우가 많지만 강제는 아님<br />
        묵시적갱신 후: 임차인 부담 <strong>없음</strong> (3개월 전 통지로 해지 가능)
      </GreenBox>

      <Divider />

      <H2>묵시적갱신 후에는 달라지나요?</H2>
      <p style={body}>
        완전히 달라져요. <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조의2</a>에 따르면
        묵시적갱신이나 계약갱신청구권을 행사한 후에는 임차인이 <strong>3개월 전 통지</strong>만 하면 언제든 나갈 수 있어요.
        이때 중개보수는 <strong>임대인과 새 임차인</strong>이 부담해요. 나가는 임차인은 낼 필요가 없죠.
      </p>
      <p style={body}>
        2년 계약이 끝났는데 아무 말 없이 지나갔다면 묵시적갱신이 된 거예요.
        이 상태에서 3개월 전에 &ldquo;나갈게요&rdquo;라고 통지하면 위약금이나 중개보수 없이 깔끔하게 나갈 수 있어요.
        가능하면 2년 채우고 나가는 게 가장 안전하죠.
      </p>

      <BorderBox>
        계약기간 중 해지: 법적 의무 없지만 <strong>협상 필요</strong><br />
        묵시적갱신 후 해지: 3개월 전 통지 → 중개보수 부담 <strong>없음</strong><br />
        계약갱신청구권 후 해지: 3개월 전 통지 → 중개보수 부담 <strong>없음</strong>
      </BorderBox>

      <Divider />

      <H2>집주인과 어떻게 협상하면 좋을까요?</H2>
      <p style={body}>
        핵심은 빨리 알리는 거예요. 이사 2~3개월 전에 미리 말하면 집주인도 여유 있게 새 세입자를 구할 수 있으니까 협의가 수월해져요.
        &ldquo;갑자기 내일 나간다&rdquo;보다 &ldquo;3개월 후에 이사 가야 해요&rdquo;가 훨씬 유리한 출발점이죠.
      </p>

      <SectionBadge>협상 순서 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>다음 전세 계약 때 미리 넣어둘 특약은?</H2>
      <p style={body}>
        분쟁을 예방하려면 계약서 특약란에 중도해지 조건을 미리 적어두는 게 최선이에요.
        &ldquo;2개월 전 통지 후 해지 가능, 중개보수는 임대인 부담&rdquo; 같은 문구를 넣으면 나중에 깔끔하게 정리할 수 있죠.
      </p>

      <SectionBadge>중도해지 대비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법, 공인중개사법, 법제처 해석을 바탕으로 작성했어요. 개별 계약 조건에 따라 결과가 달라질 수 있으니, 분쟁 시 법률 상담을 받으세요." />
    </div>
  );
}
