"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 전세/월세 2년 살았는데 집주인이 5% 넘게 올리자고 해서 어떻게 대응해야 할지 모르는 상황이에요.
// Q2. 계약갱신청구권을 행사해서 5% 초과 인상을 거부하고, 합리적 조건으로 재계약하는 행동.
// Q3. 5% 상한 법적 근거, 행사 시기(만료 6개월~2개월 전), 인상 거부 가능, 내용증명 방법, 1년 1회 제한.
// Q4. GreenBox(5% 핵심 규칙) + BorderBox(인상 계산 예시) + Steps(갱신 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "5% 인상을 거부하면 어떻게 되나요?", a: "집주인이 강제로 올릴 수 없어요. 세입자 동의 없이는 기존 금액 그대로 유지돼요. 인상 거부를 이유로 갱신을 거절할 수도 없어요." },
  { q: "계약갱신청구권은 몇 번 쓸 수 있나요?", a: "1회만 사용할 수 있어요. 최초 2년 계약 후 1회 갱신해서 총 4년(2+2)을 보장받는 구조예요." },
  { q: "보증금과 월세 모두 5% 올릴 수 있나요?", a: "보증금과 월세를 합산한 환산보증금 기준으로 5%예요. 보증금 5% + 월세 5%가 아니라 전체 합산 5%예요." },
  { q: "5% 초과해서 올린 계약은 어떻게 되나요?", a: "5% 초과분은 무효예요. 이미 초과 지급한 금액은 반환 청구할 수 있어요." },
  { q: "묵시적 갱신과 계약갱신청구권은 뭐가 달라요?", a: "묵시적 갱신은 아무 의사표시 없이 자동 연장되는 거고, 계약갱신청구권은 세입자가 적극적으로 갱신을 요구하는 거예요. 묵시적 갱신엔 5% 상한이 적용되지 않아요." },
  { q: "갱신 요구 기간을 놓치면 어떡해요?", a: "계약갱신청구권을 행사할 수 없어요. 만료 6개월~2개월 전에 반드시 의사표시가 도달해야 해요. 내용증명으로 보내는 게 가장 안전해요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "주택임대차보호법 제6조의3·제7조", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsId=001248" },
      { label: "국토교통부 임대차 정책", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "계약갱신청구권-재계약-거절-사유", title: "계약갱신 거절 사유", description: "집주인이 갱신을 거절할 수 있는 정당한 사유를 알려드려요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 임대료 5% 상한<br />
        인상 거부와 행사 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 2년 살았는데 집주인이 10% 올리자고 연락 왔나요?
        계약갱신청구권을 행사하면 임대료 인상은 5% 이내로 제한돼요.
        세입자 동의 없이는 5% 인상도 강제할 수 없어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>임대료 5% 상한, 법에서 정한 규칙이에요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsId=001248" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제7조</a>에서
        계약 갱신 시 보증금이나 월세 증액을 기존 금액의 5% 범위 내로 제한하고 있어요.
      </p>

      <GreenBox>
        5% 상한 핵심 규칙이에요.<br />
        · 계약갱신청구권 행사 시 인상 상한: 기존 금액의 5%<br />
        · 5%는 상한이지 의무가 아니에요 (0~5% 사이에서 합의)<br />
        · 세입자 동의 없이는 인상 불가<br />
        · 인상 거부를 이유로 갱신 거절 불가<br />
        · 5% 초과 계약은 초과분 무효 + 반환 청구 가능
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>인상 금액, 이렇게 계산해요</H2>
      <p style={body}>
        보증금과 월세가 각각 있다면 각각 5% 이내로 올릴 수 있어요.
        다만 일부 지자체는 조례로 5%보다 더 낮은 상한을 정할 수 있어요.
      </p>

      <SectionBadge>인상 계산 예시</SectionBadge>
      <BorderBox>
        <strong>A씨: 보증금 1억원, 월세 50만원</strong><br />
        보증금 최대: 1억 500만원 (500만원 인상)<br />
        월세 최대: 52만 5천원 (2만 5천원 인상)<br /><br />
        <strong>B씨: 보증금 5천만원, 월세 100만원</strong><br />
        보증금 최대: 5천 250만원 (250만원 인상)<br />
        월세 최대: 105만원 (5만원 인상)<br /><br />
        세입자가 "인상 없이 그대로"라고 하면 집주인은 기존 금액으로 갱신해야 해요.
      </BorderBox>

      <Divider />

      <H2>계약갱신, 이렇게 행사해요</H2>
      <p style={body}>
        행사 시기를 놓치면 권리를 사용할 수 없어요. 만료일 기준 6개월~2개월 전에 의사표시가 도달해야 해요.
      </p>

      <SectionBadge>갱신 행사 절차</SectionBadge>
      <Steps steps={[
        { title: "계약 만료일 확인", desc: "계약서에서 정확한 만료일을 확인해요. 6개월 전·2개월 전 날짜를 달력에 표시하세요." },
        { title: "갱신 요구 의사 전달", desc: "만료 6개월~2개월 전에 집주인에게 갱신 요구를 해요. 내용증명이 가장 확실해요.", tip: "카톡·문자보다 내용증명이 법적으로 안전해요" },
        { title: "임대료 조건 협의", desc: "5% 범위 내에서 인상 여부를 협의해요. 인상을 거부하면 기존 금액으로 갱신돼요." },
        { title: "갱신 계약서 작성", desc: "합의된 조건으로 갱신 계약서를 작성해요. 확정일자를 다시 받아두면 더 안전해요." },
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성됐어요. 지자체별 조례로 상한율이 다를 수 있으니 관할 구청에 확인하세요." />
    </ArticleLayout>
  );
}
