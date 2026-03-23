"use client";

// Q1. 전세/월세 계약이 자동 연장됐는데 기간이 얼마인지 궁금한 세입자예요.
// Q2. 묵시적갱신 시 연장 기간(2년)과 해지 조건을 파악하는 행동.
// Q3. 연장 기간 2년, 횟수 제한 없음, 세입자 해지 3개월 통보, 집주인 해지 불가, 보증금 동일 조건.
// Q4. GreenBox(핵심 요약) + BorderBox(조건 비교) + Steps(해지 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS_TENANT = [
  {
    title: "집주인에게 해지 통보",
    desc: "구두든 서면이든 집주인에게 계약 해지 의사를 전달해요. 다만 분쟁 방지를 위해 내용증명이나 문자 기록을 남기는 게 좋아요.",
  },
  {
    title: "3개월 경과 대기",
    desc: "통보한 날부터 3개월이 지나면 계약이 자동 해지돼요. 3개월 전에 나가도 되지만 보증금 반환은 3개월 후에 청구할 수 있어요.",
    tip: "3개월 계산은 통보 '도달일' 기준이에요",
  },
  {
    title: "보증금 반환 청구",
    desc: "해지 효력 발생일에 맞춰 보증금 반환을 요구해요. 집주인이 안 돌려주면 임차권등기명령을 신청하고 보증금 반환 소송도 가능해요.",
  },
];

const FAQS = [
  {
    q: "묵시적갱신 되면 몇 년 연장되나요?",
    a: "2년이에요. 전세든 월세든 동일하게 2년 연장돼요. 원래 계약 기간이 1년이었어도 묵시적갱신 시 2년이에요.",
  },
  {
    q: "묵시적갱신 횟수 제한이 있나요?",
    a: "없어요. 계속 묵시적갱신 될 수 있어요. 집주인이 만기 6개월~2개월 전에 갱신 거절 통보를 안 하면 자동으로 또 갱신돼요.",
  },
  {
    q: "2년 안 채우고 나갈 수 있나요?",
    a: "네. 세입자는 언제든 3개월 전 통보로 해지 가능해요. 2년을 채울 필요 없어요. 이건 묵시적갱신의 가장 큰 특징이에요.",
  },
  {
    q: "집주인이 2년 안에 나가라고 할 수 있나요?",
    a: "안 돼요. 묵시적갱신 후에는 집주인이 일방적으로 해지할 수 없어요. 세입자만 해지권이 있어요.",
  },
  {
    q: "묵시적갱신과 계약갱신청구권은 뭐가 다른가요?",
    a: "묵시적갱신은 아무도 통보 안 하면 자동 연장되는 거고, 계약갱신청구권은 세입자가 적극적으로 갱신을 요구하는 권리예요. 계약갱신청구권은 1회만 쓸 수 있지만, 묵시적갱신은 횟수 제한이 없어요.",
  },
  {
    q: "보증금이나 월세 조건은 바뀌나요?",
    a: "묵시적갱신 되면 이전 계약과 동일한 조건이에요. 집주인이 보증금이나 월세를 올리려면 묵시적갱신 전에 조건 변경 통보를 했어야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택임대차보호법 제6조 — 계약의 갱신", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "주택임대차보호법 제6조의2 — 묵시적갱신 해지", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령 — 임대차 갱신", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "묵시적갱신", title: "묵시적갱신", description: "묵시적갱신의 개념과 성립 조건이에요." },
  { slug: "묵시적갱신-해지", title: "묵시적갱신 해지", description: "세입자가 묵시적갱신 계약을 끝내는 방법이에요." },
  { slug: "계약갱신청구권-기간", title: "계약갱신청구권 기간", description: "1회 행사 가능한 갱신청구권의 기간이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 묵시적갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 되면 기간은 몇 년?<br />
        연장 기간과 해지 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약 만기인데 집주인도, 나도 아무 말 없었다면 묵시적갱신이 된 거예요.{" "}
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조</a>에
        따라 연장 기간은 2년이고, 횟수 제한 없이 계속 갱신 가능해요.
      </p>

      <Divider />

      <H2>묵시적갱신, 기간은 2년</H2>
      <p style={body}>
        묵시적갱신이 성립하면 이전 계약과 동일한 조건으로 2년 연장돼요. 원래 계약이 1년이었든 3년이었든 상관없이 2년이에요.
      </p>

      <GreenBox title="묵시적갱신 핵심 정리">
        연장 기간: <strong>2년</strong> (전세·월세 동일)<br />
        횟수 제한: <strong>없음</strong> (계속 갱신 가능)<br />
        계약 조건: 이전과 <strong>동일</strong> (보증금·월세 변동 없음)<br />
        해지권: <strong>세입자만</strong> 3개월 전 통보로 해지 가능
      </GreenBox>

      <p style={body}>
        성립 조건도 간단해요. 집주인이 만기 6개월~2개월 전에 갱신 거절이나 조건 변경 통보를 안 하면 자동으로 묵시적갱신이 돼요. 세입자도 마찬가지로 이 기간에 아무 통보를 안 하면 갱신된 거예요.
      </p>

      <Divider />

      <H2>세입자가 먼저 나가고 싶다면?</H2>
      <p style={body}>
        묵시적갱신의 가장 큰 장점이 바로 이거예요. 세입자는 2년을 다 채울 필요 없이 언제든 해지할 수 있어요. 단, 3개월 전에 통보해야 해요.
      </p>

      <Steps steps={STEPS_TENANT} />

      <BorderBox>
        <strong>집주인은 해지 못 해요</strong><br /><br />
        묵시적갱신 후에는 집주인에게 해지권이 없어요. 세입자에게만 해지 통보권이 있죠.
        집주인이 "나가달라"고 해도 법적 효력이 없어요.{" "}
        <a href="/w/묵시적갱신-해지" style={{ color: "#1D9E75", textDecoration: "underline" }}>묵시적갱신 해지</a> 규정을 참고하세요.
      </BorderBox>

      <Divider />

      <H2>계약갱신청구권과 뭐가 다르죠?</H2>
      <p style={body}>
        이 두 가지를 헷갈리는 분이 많아요. 핵심 차이는 '누가 적극적으로 요구하느냐'와 '횟수 제한'이에요.
      </p>

      <SectionBadge>비교 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>묵시적갱신</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>계약갱신청구권</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["성립 방식", "아무도 통보 안 하면 자동", "세입자가 적극 요구"],
              ["횟수 제한", "없음", "1회"],
              ["연장 기간", "2년", "2년"],
              ["해지권", "세입자만 (3개월 전 통보)", "양쪽 모두"],
              ["임대료 인상", "이전과 동일", "5% 이내 인상 가능"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 기반으로 작성됐어요. 개별 사안은 법률 상담을 받으세요." />
    </ArticleLayout>
  );
}
