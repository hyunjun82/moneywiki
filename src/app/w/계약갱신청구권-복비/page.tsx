"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 전세 갱신하는데 부동산에서 복비 내라고 해서 내야 하는지 모르는 세입자
// Q2: 부동산 복비 낼 의무 여부를 판단하고, 직접 갱신해서 복비 0원으로 만들기
// Q3: 갱신 vs 재계약 차이, 중개 의뢰 여부가 핵심, 복비 상한 요율
// Q4: Steps(직접 갱신 절차) + GreenBox(결론) + Checklist + FAQ

const STEPS = [
  {
    title: "집주인에게 갱신 의사 전달",
    desc: "문자나 카톡으로 '2년 더 살겠다'고 알리면 돼요. 계약갱신청구권은 세입자가 집주인한테 직접 행사하는 권리라서 부동산을 거칠 필요가 없어요. 전화보다 문자나 카톡이 증거로 남아서 좋아요.",
    tip: "계약 만료 6개월~2개월 전에 의사를 전달해야 해요.",
  },
  {
    title: "인상 금액 협의 (5% 이내)",
    desc: "전월세상한제에 따라 차임 인상은 기존 금액의 5%까지만 가능해요. 보증금 3억이면 최대 1,500만원 인상이에요. 집주인이 5% 넘게 올리겠다고 하면 거부할 수 있어요.",
    tip: "협의 내용도 문자로 주고받으면 분쟁 예방에 좋아요.",
  },
  {
    title: "계약서 수정 또는 새로 작성",
    desc: "기존 계약서에 갱신 합의 내용을 추가하거나, 새 계약서를 작성하면 돼요. 보증금이 바뀌었으면 확정일자를 새로 받는 게 안전해요. 주민센터에서 600원이면 돼요.",
    tip: "확정일자 안 받으면 바뀐 보증금에 대한 우선변제권이 없어요.",
  },
];

const CHECKLIST = [
  "부동산에 갱신 중개를 의뢰한 적이 있는지 확인",
  "직접 갱신이면 복비 0원 — 부동산이 연락해도 거절 가능",
  "재계약(새 계약)이면 부동산 통할 경우 복비 발생",
  "보증금 변동 시 확정일자 새로 받기 (600원)",
  "전월세상한제 5% 상한 초과 여부 확인",
  "갱신 의사 전달 증거(문자/카톡) 보관",
];

const FAQS = [
  { q: "갱신할 때 복비 내야 하나요?", a: "부동산을 거치지 않고 집주인과 직접 갱신하면 복비가 없어요. 복비는 중개 서비스에 대한 대가라서, 중개를 받지 않았으면 낼 이유가 없죠." },
  { q: "부동산에서 먼저 연락해서 복비를 달라고 하면요?", a: "요청하지 않은 서비스에 대해 복비를 낼 의무가 없어요. '갱신 중개를 의뢰한 적 없다'고 말하면 돼요. 당당하게 거절하세요." },
  { q: "재계약이랑 갱신이랑 복비가 다른가요?", a: "갱신은 기존 계약을 연장하는 거고, 재계약은 완전히 새로운 계약이에요. 재계약은 부동산을 통하면 신규 계약처럼 복비가 나오고, 전월세상한제 5% 상한도 적용 안 돼요." },
  { q: "복비는 얼마나 되나요?", a: "거래금액에 따라 달라요. 5천만원 미만 0.5%, 5천만원~1억 미만 0.4%, 1억~6억 미만 0.3%, 6억~12억 미만 0.4%예요. 보증금 3억 전세면 상한이 90만원이에요." },
  { q: "계약서 작성만 부동산에 맡기면 복비가 나오나요?", a: "중개 수수료가 아닌 계약서 작성 비용만 청구할 수 있어요. 보통 10~20만원 정도지만 부동산마다 달라요. 조건 협의까지 맡겼다면 중개로 볼 수 있어서 복비가 나올 수 있어요." },
  { q: "확정일자를 새로 받아야 하나요?", a: "보증금이 변동됐다면 새로 받는 게 안전해요. 변동 없이 기간만 연장하면 기존 확정일자가 유지돼요. 주민센터에서 600원이면 돼요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공인중개사법 시행규칙 (중개수수료 요율)", url: "https://www.law.go.kr/법령/공인중개사법시행규칙" },
      { label: "주택임대차보호법 제6조의3 (계약갱신청구권)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 행사할 때 복비, 내야 할까?<br />
        중개수수료 기준과 절약 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 갱신하는데 부동산에서 복비 내라고 하면 당황스럽죠.
        결론부터 말하면 부동산을 거치지 않고 직접 갱신하면 복비가 0원이에요.
        복비는 중개 서비스에 대한 대가라서, 중개를 받지 않았으면 낼 이유가 없어요.
        아래에서 직접 갱신하는 방법과 복비 기준을 정리했어요.
      </p>

      <Divider />

      <H2>직접 갱신하면 복비가 왜 없나요?</H2>
      <p style={body}>
        <a href="/w/계약갱신청구권-행사방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>은 세입자가 집주인에게 직접 행사하는 권리예요.
        "2년 더 살게요"라고 문자 보내면 갱신이 성립돼요.
        부동산이 개입할 일이 없으니 복비도 없는 거예요.
      </p>
      <p style={body}>
        부동산에서 먼저 "갱신 도와줄게요"라고 연락하는 경우가 있어요.
        이건 내가 요청한 서비스가 아니에요.
        "갱신 중개를 의뢰한 적 없다"고 말하면 복비를 낼 의무가 없어요.
      </p>

      <GreenBox title="핵심 결론">
        직접 갱신 = 복비 0원 | 부동산 통해 갱신 = 복비 발생<br />
        부동산에서 먼저 연락해도, 의뢰한 적 없으면 복비 안 내도 돼요
      </GreenBox>

      <Divider />

      <H2>직접 갱신은 어떻게 하나요?</H2>
      <p style={body}>
        집주인과 직접 연락해서 갱신 의사를 전달하고, 조건 협의하고, 계약서를 수정하면 끝이에요.
        <a href="/w/전월세상한제" style={{ color: "#1D9E75", textDecoration: "underline" }}>전월세상한제</a>에 따라 인상폭은 5% 이내로 제한돼요.
      </p>

      <SectionBadge>직접 갱신 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>부동산 통하면 복비가 얼마나 나오나요?</H2>
      <p style={body}>
        부동산을 통해 갱신하면 거래금액에 따라 중개수수료 상한이 정해져 있어요.
        <a href="/w/공인중개사법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법 시행규칙</a>에서 요율을 규정하고 있죠.
      </p>

      <BorderBox>
        <p style={{ ...body, marginBottom: 6 }}>5천만원 미만: 0.5%</p>
        <p style={{ ...body, marginBottom: 6 }}>5천만원~1억 미만: 0.4%</p>
        <p style={{ ...body, marginBottom: 6 }}>1억~6억 미만: 0.3%</p>
        <p style={{ ...body, marginBottom: 6 }}>6억~12억 미만: 0.4%</p>
        <p style={{ ...body, marginBottom: 6 }}>12억~15억 미만: 0.5%</p>
        <p style={{ ...body, marginBottom: 0 }}>15억 이상: 0.6%</p>
      </BorderBox>

      <p style={body}>
        보증금 3억 전세 갱신이면 3억 x 0.3% = 90만원이 상한이에요.
        월세가 있으면 환산 공식(보증금 + 월세 x 100)으로 거래금액을 계산해요.
        실제 복비는 상한 이내에서 협의 가능하고요.
      </p>

      <Divider />

      <H2>갱신과 재계약, 뭐가 다른가요?</H2>
      <p style={body}>
        갱신은 기존 계약을 연장하는 거예요. 재계약은 아예 새로운 계약을 체결하는 거고요.
        이 차이가 복비에 직접 영향을 줘요.
      </p>
      <p style={body}>
        갱신은 계약갱신청구권으로 직접 하면 복비가 없어요.
        재계약은 신규 계약이라서 부동산을 통하면 복비가 발생해요.
        <a href="/w/전월세상한제" style={{ color: "#1D9E75", textDecoration: "underline" }}>전월세상한제</a> 5% 상한도 재계약에는 적용 안 돼요.
      </p>

      <GreenBox title="갱신 vs 재계약 비교">
        갱신: 기존 계약 연장, 직접 하면 복비 0원, 5% 상한 적용<br />
        재계약: 새 계약 체결, 부동산 통하면 복비 발생, 5% 상한 미적용
      </GreenBox>

      <Divider />

      <H2>갱신 전 체크리스트</H2>
      <p style={body}>
        갱신 전에 아래 항목을 미리 챙겨두면 불필요한 비용을 줄일 수 있어요.
      </p>

      <SectionBadge>확인 항목</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약갱신청구권 복비 관련 실제 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공인중개사법 시행규칙과 주택임대차보호법을 바탕으로 작성됐어요. 지역별 조례에 따라 요율이 다를 수 있으니 해당 지자체 기준도 확인하세요." />
    </div>
  );
}
