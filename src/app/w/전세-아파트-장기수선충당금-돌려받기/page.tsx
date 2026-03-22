"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 전세로 아파트에 살면서 관리비에 장기수선충당금이 포함되어 나가고 있는데, 이사 갈 때 돌려받을 수 있는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 관리사무소에서 납부확인서를 발급받고, 집주인에게 정산을 요청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 장기수선충당금은 소유자 부담(법적 근거), 세입자가 대신 냈으면 반환 의무, 관리사무소 납부확인서 발급, 보증금에서 공제.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(돌려받는 절차) + GreenBox(법적 근거) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "관리비 고지서 확인", desc: "매달 내는 관리비 고지서에서 '장기수선충당금' 항목을 확인하세요. 관리비에 포함되어 빠져나가고 있어요." },
  { title: "관리사무소에서 납부확인서 발급", desc: "이사 전에 관리사무소를 방문해서 장기수선충당금 납부 내역서(확인서)를 발급받으세요.", tip: "몇 년치든 전부 조회가 가능해요. 분실 걱정 없어요." },
  { title: "집주인에게 정산 요청", desc: "납부확인서를 근거로 집주인에게 장기수선충당금 반환을 요청하세요." },
  { title: "보증금에서 공제 또는 별도 수령", desc: "보증금 반환 시 장기수선충당금을 공제하거나, 별도로 받으면 돼요." },
];

const FAQS = [
  {
    q: "장기수선충당금이 정확히 뭔가요?",
    a: "아파트 엘리베이터, 외벽, 배관, 지붕 같은 주요 시설을 나중에 수리하려고 미리 모아두는 돈이에요. 소유자가 부담해야 하는 비용이에요.",
  },
  {
    q: "얼마나 돌려받을 수 있나요?",
    a: "거주 기간 동안 낸 장기수선충당금 전액을 돌려받아요. 월 1~3만원 수준이라 2년이면 24~72만원 정도 돼요.",
  },
  {
    q: "집주인이 안 돌려주면 어떻게 하나요?",
    a: "공동주택관리법 시행령 제31조 제7항에 반환 의무가 명시되어 있어요. 내용증명을 보내도 안 되면 소액소송을 걸 수 있어요.",
  },
  {
    q: "월세 세입자도 돌려받을 수 있나요?",
    a: "네, 월세든 전세든 세입자(임차인)가 대신 납부한 장기수선충당금은 소유자가 반환해야 해요.",
  },
  {
    q: "영수증을 안 모아뒀는데 어떻게 하나요?",
    a: "관리사무소에서 납부 내역서를 발급해줘요. 입주일부터 퇴거일까지 전체 내역을 조회할 수 있어서 영수증이 없어도 괜찮아요.",
  },
  {
    q: "집주인이 바뀌었으면 누구한테 청구하나요?",
    a: "현재 소유자(새 집주인)에게 청구해요. 이전 소유자와의 정산은 집주인들 사이의 문제예요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "공동주택관리법 제30조 (장기수선충당금)", url: "https://www.law.go.kr/법령/공동주택관리법" },
      { label: "찾기쉬운 생활법령정보 — 장기수선충당금 반환", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=5&cciNo=3&cnpClsNo=3" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 관리비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세 살면서 낸 장기수선충당금,<br />
        이사할 때 돌려받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        관리비에 포함된 장기수선충당금, 사실 집주인이 내야 하는 돈이에요.
        전세 살면서 대신 냈다면 이사 갈 때 돌려받을 수 있어요.
        법적으로 보장된 권리니까 꼭 챙기세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>장기수선충당금, 왜 집주인이 내야 하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법 제30조</a>에
        따르면 장기수선충당금은 해당 주택의 <strong>소유자</strong>로부터 징수해야 해요.
        아파트의 엘리베이터, 외벽, 배관 같은 시설은 소유자 자산이라서, 수리비도 소유자가 부담하는 게 맞아요.
      </p>

      <GreenBox>
        <strong>법적 근거</strong>: 공동주택관리법 시행령 제31조 제7항<br />
        "소유자는 장기수선충당금을 사용자가 대신하여 납부한 경우에는 그 금액을 반환하여야 한다"
      </GreenBox>

      <p style={body}>
        그런데 실제로는 관리비 고지서에 장기수선충당금이 포함되어 세입자에게 부과되는 경우가 많아요.
        이때 세입자가 대신 낸 금액은 이사할 때 돌려받을 수 있어요.
      </p>

      <Divider />

      <H2>돌려받는 절차는 어떻게 되나요?</H2>
      <p style={body}>
        관리사무소에서 납부확인서만 발급받으면 절차는 간단해요.
        이사 전에 미리 준비해두세요.
      </p>

      <SectionBadge>장기수선충당금 환급 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>얼마나 돌려받을 수 있나요?</H2>
      <p style={body}>
        아파트 면적과 단지 규모에 따라 다르지만, 보통 월 1~3만원 수준이에요.
        2년 거주하면 적지 않은 금액이 되죠.
      </p>

      <BorderBox title="환급 금액 예시">
        월 장기수선충당금 1.5만원 x 24개월(2년) = <strong>36만원</strong><br />
        월 장기수선충당금 2.5만원 x 24개월(2년) = <strong>60만원</strong><br />
        월 장기수선충당금 3만원 x 48개월(4년) = <strong>144만원</strong>
      </BorderBox>

      <p style={body}>
        <a href="/w/전세-보증금-보호-확정일자-받기-대항력" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세 보증금 보호</a>와 함께
        장기수선충당금 환급도 이사할 때 빼놓지 말고 챙기세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공동주택관리법을 바탕으로 작성됐어요. 구체적 분쟁은 대한법률구조공단(132)에 상담하세요." />
    </ArticleLayout>
  );
}
