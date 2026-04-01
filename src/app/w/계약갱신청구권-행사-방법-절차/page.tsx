"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 전세 만기 다가오는데 2년 더 살고 싶어서 계약갱신청구권 행사 방법이 궁금한 임차인
// Q2. 행사 기간 확인(만료 6~2개월 전) → 내용증명 발송 → 증액 한도 5% 확인
// Q3. 행사 시기(6~2개월 전), 1회 한정, 5% 인상 제한, 내용증명 방법, 거절 사유, 오피스텔 적용
// Q4. Steps(행사 절차) + GreenBox(핵심 조건 요약) + BorderBox(거절 사유) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "행사 시기 확인", desc: "계약 만료일 6개월 전부터 2개월 전까지 행사해야 해요. 이 기간을 놓치면 사용할 수 없어요.", tip: "달력에 만료일 6개월 전을 미리 표시해두세요" },
  { title: "내용증명 발송", desc: "임대인에게 계약갱신청구권 행사 의사를 내용증명으로 보내요. 우체국 방문 또는 인터넷우체국에서 발송 가능해요.", tip: "카톡·문자도 가능하지만 증거력은 내용증명이 가장 높음" },
  { title: "임대인 응답 확인", desc: "임대인이 정당한 거절 사유 없이 거부하면 법 위반이에요. 거절 통보를 받으면 사유를 확인하세요." },
  { title: "갱신 조건 협의", desc: "임대료 인상은 기존 보증금의 5% 이내. 그 외 조건은 기존 계약과 동일하게 2년 연장돼요." },
];

const FAQS = [
  { q: "1회만 쓸 수 있다는 게 정확히 무슨 뜻이에요?", a: "임차인이 최초 계약 또는 갱신된 계약에 대해 1번만 갱신을 요구할 수 있어요. 2+2년 = 최대 4년 거주가 보장되는 구조예요." },
  { q: "임대인이 실거주를 이유로 거절할 수 있나요?", a: "네, 임대인 본인이 실제 거주하려는 경우는 정당한 거절 사유예요. 다만 거절 후 실제로 입주하지 않으면 손해배상 청구가 가능해요." },
  { q: "오피스텔도 계약갱신청구권이 적용되나요?", a: "주거용 오피스텔은 주택임대차보호법이 적용돼서 계약갱신청구권을 쓸 수 있어요. 상가 오피스텔은 상가임대차보호법이 적용돼요." },
  { q: "5% 인상 제한은 보증금만인가요?", a: "보증금과 월세 전환액을 합산해서 5% 이내여야 해요. 보증금을 올리면서 월세도 올리면 합계가 5%를 넘는지 확인하세요." },
  { q: "갱신 후 2년 안에 이사 가고 싶으면요?", a: "임차인은 언제든 해지 통보 후 3개월 뒤에 나갈 수 있어요. 갱신했다고 2년을 꼭 채울 의무는 없어요." },
  { q: "임대인이 답을 안 하면 어떻게 되나요?", a: "만료 2개월 전까지 거절 통보가 없으면 묵시적으로 갱신이 성립해요. 기존과 동일한 조건으로 2년 연장돼요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "주택임대차보호법 제6조의3", url: "https://www.law.go.kr/법령/주택임대차보호법" },
  ]},
  { category: "기관", items: [
    { label: "국토교통부 임대차분쟁 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "보증금-증액-한도-5퍼센트-제한", title: "보증금 증액 5% 제한", description: "계약갱신 시 임대료 인상 한도예요." },
  { slug: "계약갱신청구권-오피스텔", title: "계약갱신청구권 오피스텔 적용", description: "주거용 오피스텔 갱신청구권이에요." },
  { slug: "임대차분쟁조정-신청", title: "임대차분쟁조정 신청", description: "분쟁 시 조정위원회 활용법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세 만기인데 2년 더 살고 싶다면?<br />
        계약갱신청구권 행사 방법과 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약이 끝나가는데 이사 가기 싫거나 보증금 돌려받기 어려운 상황이라면 계약갱신청구권을 쓸 수 있어요.
        만료 6개월 전~2개월 전에 행사하면 기존 조건으로 2년 더 살 수 있어요. 임대료 인상은 5% 이내로 제한돼요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>행사 절차는 4단계예요</H2>
      <p style={body}>
        타이밍이 핵심이에요. 만료 6개월 전부터 2개월 전까지 내용증명으로 의사를 전달하면 돼요.
      </p>
      <Steps steps={STEPS} />

      <H2>이 조건만 기억하세요</H2>
      <p style={body}>
        계약갱신청구권의 핵심 조건 3가지를 정리했어요.
      </p>
      <GreenBox>
        <strong>① 행사 시기</strong>: 만료 6개월 전 ~ 2개월 전 (이 기간만 가능)<br />
        <strong>② 횟수</strong>: 1회 한정 (2년 연장, 최대 4년 거주 보장)<br />
        <strong>③ 임대료 인상</strong>: 보증금+월세 합산 5% 이내만 가능<br /><br />
        ★ 내용증명으로 증거를 남겨야 분쟁 시 유리해요
      </GreenBox>

      <H2>임대인이 거절할 수 있는 경우</H2>
      <p style={body}>
        임대인에게도 정당한 거절 사유가 있어요. 다만 남용하면 손해배상 책임이 생겨요.
      </p>
      <BorderBox>
        <strong>정당한 거절 사유 (주택임대차보호법 제6조의3)</strong><br /><br />
        ① 임차인이 2기(2개월) 이상 차임을 연체한 경우<br />
        ② 임차인이 거짓이나 부정한 방법으로 임차한 경우<br />
        ③ 서로 합의하여 임대인이 상당한 보상을 한 경우<br />
        ④ 임차인이 집주인 동의 없이 전대(재임대)한 경우<br />
        ⑤ 임차인이 고의·과실로 건물을 파손한 경우<br />
        ⑥ 건물 철거·재건축을 위해 점유 회복이 필요한 경우<br />
        ⑦ 임대인(직계존비속 포함) 본인이 실거주하려는 경우<br /><br />
        ★ ⑦번 실거주 사유로 거절 후 입주하지 않으면 손해배상 청구 가능
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 주택임대차보호법 기준으로 작성됐어요. 임대차 분쟁은 주택임대차분쟁조정위원회나 법률 상담을 활용하세요." />
    </ArticleLayout>
  );
}
