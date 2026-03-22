"use client";

// Q1. 집주인이 보증금 인상을 요구했는데 합법적인 한도가 얼마인지, 거절할 수 있는지 궁금한 세입자
// Q2. 5% 인상 한도를 확인하고, 초과 요구 시 법적 근거를 들어 거절한다
// Q3. 5% 상한(주택임대차보호법 제7조), 1년 이내 재인상 금지, 거절 방법, 계약갱신청구권과 연계
// Q4. GreenBox(5% 규칙 요약) + BorderBox(계산 예시) + Steps(거절 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "현재 보증금의 5%를 계산하세요",
    desc: "현재 보증금에 5%를 곱하면 최대 인상 금액이 나와요. 보증금 5천만원이면 250만원, 3억원이면 1,500만원이 한도예요. 이 금액을 초과하는 요구는 법적으로 무효예요.",
    tip: "월세+보증금 합산 기준 5%",
  },
  {
    title: "5% 초과 요구에는 법 조문을 근거로 거절하세요",
    desc: "'주택임대차보호법 제7조에 따라 보증금 인상은 5%를 초과할 수 없어요'라고 명확하게 말하세요. 구두보다 문자메시지나 카카오톡으로 기록을 남기는 게 안전해요.",
    tip: "카톡·문자로 기록 남기기",
  },
  {
    title: "집주인이 계속 고집하면 내용증명을 보내세요",
    desc: "집주인이 5% 초과 인상을 고집하면서 갱신을 거부한다면, 내용증명으로 법적 근거를 통보하세요. 계약갱신청구권을 함께 행사하면 2년간 계약을 확보할 수 있어요.",
    tip: "내용증명 + 계약갱신청구권 동시 행사 가능",
  },
  {
    title: "분쟁이 안 풀리면 주택임대차분쟁조정위원회에 신청하세요",
    desc: "직접 합의가 안 되면 주택임대차분쟁조정위원회에 조정을 신청할 수 있어요. 무료이고, 대한법률구조공단(132)에서도 무료 법률상담을 받을 수 있어요.",
    tip: "주택임대차분쟁조정위원회: 무료, 관할 시·군·구청",
  },
];

const FAQS = [
  {
    q: "보증금 5% 인상 한도에 월세도 포함되나요?",
    a: "네, 보증금과 월세를 합친 전체 임대료 기준으로 5% 이내예요. 보증금 3천만원 + 월세 50만원이면 전체를 보증금으로 환산한 금액의 5% 이내로 인상할 수 있어요.",
  },
  {
    q: "보증금 5천만원이면 최대 얼마까지 올릴 수 있나요?",
    a: "최대 250만원이에요. 5천만원 x 5% = 250만원이죠. 집주인이 300만원을 올리겠다고 하면 250만원까지만 유효하고 나머지 50만원은 거절할 수 있어요.",
  },
  {
    q: "1년 이내에 또 올릴 수 있나요?",
    a: "아니에요. 마지막으로 계약을 맺거나 보증금을 올린 날부터 1년이 지나야 다시 인상 요구를 할 수 있어요. 이사 온 지 8개월이면 아직 인상 요구 자체가 불가능해요.",
  },
  {
    q: "5% 넘게 올려달라고 하면서 안 나가면 계약 안 해준다는데요?",
    a: "계약갱신청구권을 행사하세요. 임차인이 갱신을 요구하면 집주인은 정당한 사유(실거주 등) 없이 거절할 수 없어요. 이때 인상은 5% 이내로 제한돼요.",
  },
  {
    q: "신규 계약할 때도 5% 제한이 적용되나요?",
    a: "아니에요. 5% 제한은 기존 계약의 갱신 시에만 적용돼요. 새로 들어오는 세입자에게는 시세대로 보증금을 정할 수 있어요. 기존 세입자 보호를 위한 규정이에요.",
  },
  {
    q: "지자체마다 한도가 다를 수 있나요?",
    a: "주택임대차보호법에서 5%를 기본으로 정하되, 지자체가 조례로 5% 범위 내에서 다르게 정할 수 있어요. 하지만 대부분 지역이 5%를 그대로 적용하고 있어요.",
  },
];

const SOURCES = [
  { name: "주택임대차보호법 제7조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=629&ccfNo=4&cciNo=1&cnpClsNo=2" },
];

const RELATED = [
  { slug: "임대차-기간-묵시적-갱신", title: "묵시적 갱신 조건과 해지", description: "아무 말 없으면 자동 2년 연장되는 제도." },
  { slug: "계약갱신청구권-재계약-거절-사유", title: "계약갱신청구권 사용법", description: "1회 한정 2년 재계약 권리." },
  { slug: "주택임대차보호법", title: "주택임대차보호법 핵심", description: "세입자를 보호하는 법의 주요 내용." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 &middot; 임대차 &middot; 보증금 인상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보증금 얼마까지 올릴 수 있나?<br />
        임대차 인상 한도 5%와 거절 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "집주인이 보증금 1천만원 올려달라는데, 이거 거절할 수 있나요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제7조</a>에 따라 보증금 인상은 기존 금액의 <strong>5% 이내</strong>로 제한돼요. 보증금 5천만원이면 최대 <strong>250만원</strong>까지만 올릴 수 있고, 1천만원 인상 요구는 법적으로 무효예요. 거절할 권리가 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>5% 인상 한도 규칙이에요</H2>
      <p style={body}>
        보증금이든 월세든, 갱신 시 전체 임대료의 5%를 넘겨서 올릴 수 없어요. 마지막 증액 후 1년이 안 됐으면 인상 자체가 불가능해요.
      </p>

      <SectionBadge>핵심 규칙</SectionBadge>
      <GreenBox>
        1. 인상 한도: 기존 보증금(+월세)의 5% 이내{"\n"}
        2. 재인상 금지: 마지막 증액 후 1년 이내 재인상 불가{"\n"}
        3. 초과 요구: 법적으로 무효, 거절 가능{"\n"}
        4. 적용 범위: 기존 계약 갱신 시만 (신규 계약은 시세 적용)
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보증금별 최대 인상 금액은 얼마인가요?</H2>
      <p style={body}>
        현재 보증금에 5%를 곱하면 바로 나와요.
      </p>

      <SectionBadge>인상 한도 계산</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>현재 보증금</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 인상액 (5%)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>인상 후 보증금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["3,000만원", "150만원", "3,150만원"],
              ["5,000만원", "250만원", "5,250만원"],
              ["1억원", "500만원", "1억 500만원"],
              ["2억원", "1,000만원", "2억 1,000만원"],
              ["3억원", "1,500만원", "3억 1,500만원"],
            ].map(([current, max, after], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{current}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{max}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>집주인이 5% 넘게 올리겠다면 이렇게 하세요</H2>
      <p style={body}>
        법적 근거가 명확하니 차분하게 대응하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        <a href="/w/계약갱신청구권-재계약-거절-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>은 1회만 쓸 수 있으니 이미 사용했다면, <a href="/w/임대차-기간-묵시적-갱신" style={{ color: "#1D9E75", textDecoration: "underline" }}>묵시적 갱신</a>으로 자동 연장되게 하는 것도 방법이에요. 묵시적 갱신되면 동일 조건 유지라서 인상 자체가 없어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 구체적인 분쟁은 주택임대차분쟁조정위원회(관할 시·군·구청)나 대한법률구조공단(132)에서 상담받으세요." />
    </ArticleLayout>
  );
}
