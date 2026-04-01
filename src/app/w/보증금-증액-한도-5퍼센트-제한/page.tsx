"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 집주인이 보증금 많이 올려달라는데 거절할 수 있는지 궁금한 임차인
// Q2. 5% 제한 규정 확인 → 1년 이내 증액 거절 → 초과 요구 시 대응
// Q3. 주택임대차보호법 제7조, 5% 상한, 1년 이내 증액 불가, 월세 전환 합산, 위반 시 대응
// Q4. GreenBox(5% 규정 핵심) + Steps(거절 방법) + BorderBox(위반 시 대응) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "현재 보증금 확인", desc: "기존 계약서의 보증금(+월세)을 확인해요. 이 금액의 5%가 인상 한도예요." },
  { title: "증액 시기 확인", desc: "직전 계약 또는 증액 후 1년이 지났는지 확인해요. 1년 이내면 증액 자체가 불가해요.", tip: "계약 시작일 기준으로 1년" },
  { title: "5% 계산", desc: "보증금 2억이면 5% = 1,000만원이 최대 인상폭. 월세가 있으면 전환액 합산해서 5% 이내인지 확인해요." },
  { title: "서면으로 거절", desc: "5% 초과 요구에는 서면(내용증명·카톡)으로 거절 의사를 전달해요. 임대차분쟁조정위원회에 조정 신청도 가능해요." },
];

const FAQS = [
  { q: "5% 인상 제한은 언제 적용되나요?", a: "계약 기간 중 증액 청구 시, 그리고 계약갱신청구권으로 갱신할 때 적용돼요. 새로운 계약을 체결하면 제한이 없어요." },
  { q: "보증금과 월세를 동시에 올리면 어떻게 계산하나요?", a: "보증금 인상분 + 월세 인상분을 보증금으로 환산해서 합산해요. 합계가 기존 전환보증금의 5%를 넘으면 안 돼요." },
  { q: "집주인이 시세가 올랐다며 20% 올려달라는데요", a: "계약 기간 중이면 5% 한도를 초과한 부분은 거절할 수 있어요. 시세 상승은 5% 제한의 예외 사유가 아니에요." },
  { q: "1년 이내에 증액 요구하면 어떡하나요?", a: "직전 증액 또는 계약 후 1년 이내 증액 청구는 법적으로 효력이 없어요. 거절하면 돼요." },
  { q: "5% 넘게 올려준 경우 돌려받을 수 있나요?", a: "5%를 초과한 부분은 효력이 없어요. 초과 지급분 반환을 청구할 수 있고, 임대차분쟁조정위원회를 활용하세요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법 제7조 (차임 등의 증감청구권)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "기관", items: [
    { label: "대한법률구조공단 상담 (132)", url: "https://www.klac.or.kr" },
  ]},
];

const RELATED = [
  { slug: "계약갱신청구권-행사-방법-절차", title: "계약갱신청구권 행사 방법", description: "전세 2년 연장 방법이에요." },
  { slug: "전월세상한제", title: "전월세상한제 정리", description: "전월세 인상 제한 제도예요." },
  { slug: "임대차분쟁조정-신청", title: "임대차분쟁조정 신청", description: "분쟁 시 조정 신청 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집주인이 보증금 많이 올려달래요<br />
        5% 증액 한도와 거절 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 보증금을 천만 원이나 올려달라는데 다 올려줘야 하는 건 아니에요.
        주택임대차보호법에 따라 1년 이내 증액은 불가하고, 1년 후에도 5%까지만 가능해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>5% 규정이 이렇게 적용돼요</H2>
      <p style={body}>임대차 기간 중 보증금 인상 요구에는 법적 상한이 있어요.</p>
      <GreenBox>
        <strong>주택임대차보호법 제7조 핵심</strong><br /><br />
        ① 증액 청구: 직전 계약 또는 증액 후 1년 이내 불가<br />
        ② 인상 한도: 기존 보증금(+월세 전환액)의 5% 이내<br />
        ③ 적용 시점: 계약 기간 중 증액 + 계약갱신청구권 갱신 시<br />
        ④ 새 계약 체결 시에는 5% 제한 적용 안 됨<br /><br />
        ★ 보증금 2억 기준 → 최대 인상: 1,000만원
      </GreenBox>

      <H2>이 순서로 대응하세요</H2>
      <p style={body}>집주인이 5% 넘게 올려달라면 법적으로 거절할 수 있어요.</p>
      <Steps steps={STEPS} />

      <H2>이미 5% 넘게 올려줬다면</H2>
      <p style={body}>초과분은 법적 효력이 없어서 돌려받을 수 있어요.</p>
      <BorderBox>
        <strong>초과분 반환 청구</strong>: 5% 초과 지급분은 법적 효력 없음 → 반환 청구 가능<br />
        <strong>임대차분쟁조정위원회</strong>: 시·군·구 소재 조정위원회에 무료 조정 신청<br />
        <strong>소액사건 소송</strong>: 2,000만원 이하면 소액사건 심판으로 빠르게 해결<br /><br />
        ★ 대한법률구조공단(132)에서 무료 상담 가능
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 주택임대차보호법 기준으로 작성됐어요. 구체적인 분쟁은 임대차분쟁조정위원회나 법률구조공단에 상담받으세요." />
    </ArticleLayout>
  );
}
