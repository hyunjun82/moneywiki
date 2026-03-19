"use client";

// Q1. 65세가 넘었거나 곧 넘는 직장인이 퇴직 후 실업급여를 받을 수 있는지 확인하는 상황
// Q2. 고용24에서 내 고용보험 가입 시점 확인 → 65세 전 가입이면 신청 가능 여부 판단
// Q3. 65세 전 입사 후 65세 이후 퇴사 = 가능 / 65세 이후 신규취업 = 불가 / 2028년 정책 변화 검토 중 / 비자발적 퇴사 필수
// Q4. GreenBox(수급 가능/불가 케이스) + GreenBox(확인할 3가지 체크리스트) + BorderBox(2028 정책 변화) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "65세 넘으면 무조건 실업급여 못 받나요?",
    a: "아니에요. 65세 전에 현재 회사에 입사한 후 65세 이후에 퇴사하면 받을 수 있어요. 안 되는 건 65세 이후에 새로 취업한 경우예요. 나이가 아니라 고용보험 가입 시점이 기준이에요.",
  },
  {
    q: "60세 정년 퇴직 후 재취업했는데 65세 이후에 퇴직하면 어떻게 되나요?",
    a: "65세 이후에 새로 취업한 경우라면 현행법상 실업급여 대상이 아니에요. 65세 이후 신규 취업은 고용보험 실업급여 적용에서 제외돼요. 재취업 시점이 65세 전인지 후인지가 핵심이에요.",
  },
  {
    q: "정년이 65세인 회사에서 66세에 퇴직하면 받을 수 있나요?",
    a: "네. 65세 전에 그 회사에 입사했고, 65세 이후에도 계속 같은 고용 관계를 유지하다가 퇴직했다면 비자발적 퇴직 등 기본 요건 충족 시 실업급여를 받을 수 있어요. 고용24에서 피보험자격 이력내역으로 정확히 확인하세요.",
  },
  {
    q: "2028년부터 바뀐다는 게 사실인가요?",
    a: "정부가 65세 이상 신규 취업자도 실업급여 대상에 포함하는 방안을 검토 중이에요. 2027년 상반기에 논의, 2028년 적용 예정이라고 했지만 아직 확정은 아니에요. 소요 예산(4년간 약 1.2조원)이 많아 추진 속도가 달라질 수 있어요.",
  },
  {
    q: "내 고용보험 가입 이력을 어디서 확인해요?",
    a: "고용24(ei.go.kr)에서 '피보험자격 이력내역'을 조회하면 현재 회사에 언제 입사했는지 정확히 나와요. 혹은 4대사회보험 정보연계센터(4insure.or.kr)에서 4대보험 가입 내역 확인서를 발급받으면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제10조 (적용 제외)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 피보험자격 이력내역 조회", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급 자격 조건", description: "고용보험 180일 + 비자발적 퇴직 기본 조건이에요." },
  { slug: "4대보험-가입-내역-확인서-발급-자격-득실", title: "4대보험 가입 내역 확인서 발급", description: "내 고용보험 가입 이력을 확인하는 방법이에요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산 방법", description: "수급 자격이 되면 얼마 받는지 계산해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 고령자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        65세 이상 실업급여 수급 자격<br />
        나이 아닌 고용보험 가입 시점이 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        65세가 넘어도 실업급여를 받을 수 있는 경우가 있어요.
        65세 전에 현재 직장에 입사했다면, 65세 이후에 퇴직해도 실업급여 자격이 돼요.
        안 되는 건 65세 이후에 새로 취업한 경우예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수급 가능 케이스 vs 수급 불가 케이스</H2>
      <p style={body}>
        고용보험법 제10조에서 65세 이후 신규 고용자는 실업급여 적용에서 제외해요.
        핵심은 '나이'가 아니라 '65세 전에 고용보험에 가입했는지'예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>상황</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>수급 가능?</th>
            </tr>
          </thead>
          <tbody>
            {[
              { situation: "60세에 입사 → 67세에 퇴사 (비자발적)", eligible: "가능" },
              { situation: "65세 이전 입사 → 65세 이후 정년 퇴직", eligible: "가능" },
              { situation: "60세 정년 퇴직 → 65세에 재취업 → 67세 퇴사", eligible: "불가" },
              { situation: "66세에 신규 취업 → 68세에 퇴사", eligible: "불가" },
              { situation: "64세에 입사 → 65세 되어도 계속 근무 → 이후 퇴사", eligible: "가능" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.situation}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: row.eligible === "가능" ? "#1D9E75" : "#E53E3E", fontWeight: 700 }}>{row.eligible}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ "가능"이어도 비자발적 퇴직 + 고용보험 180일 이상 가입 + 구직의사 조건 추가로 충족 필요
        </p>
      </GreenBox>

      <H2>수급 자격 여부 확인하는 3가지 체크리스트</H2>
      <p style={body}>
        본인 상황이 헷갈린다면 아래 순서로 확인해요.
        고용24에서 피보험자격 이력내역 조회가 가장 먼저예요.
      </p>

      <GreenBox>
        <strong>① 고용보험 가입 시점 확인</strong><br />
        고용24(ei.go.kr) → 피보험자격 이력내역 조회<br />
        현재 직장에 65세 전에 입사했는지 확인<br />
        <br />
        <strong>② 퇴직 사유 확인</strong><br />
        비자발적 퇴직 (권고사직, 계약만료, 정년퇴직 등)이어야 수급 가능<br />
        자발적 퇴사라면 정당한 사유(임금 미지급, 직장 내 괴롭힘 등)가 있어야 함<br />
        회사가 제출한 이직확인서의 퇴직 사유 코드 확인<br />
        <br />
        <strong>③ 구직 의사와 능력</strong><br />
        일할 의사와 능력이 있어야 하고, 실업인정일에 구직활동 보고해야 함<br />
        건강 문제로 일이 불가능한 상태라면 질병급여 또는 다른 지원 제도 확인 필요
      </GreenBox>

      <H2>2028년 정책 변화 검토 중</H2>
      <p style={body}>
        현행법의 65세 이후 신규 취업자 제외 조항에 대해 개편 논의가 진행되고 있어요.
      </p>

      <BorderBox>
        <strong>65세 이상 실업급여 확대 검토 현황</strong><br />
        현황: 65세 이후 신규 취업자는 실업급여 적용 제외 (고용보험법 제10조)<br />
        검토 방향: 65세 이상 신규 취업자도 실업급여 대상에 포함<br />
        일정: 2027년 상반기 논의 → 2028년 적용 여부 결정 예정<br />
        배경: 정년이 60세에서 65세로 연장되는 추세 반영<br />
        <br />
        ★ 아직 확정된 사안이 아님 — 예산 규모(4년간 약 1.2조원)로 추진 속도 변동 가능<br />
        ★ 확정 전까지는 현행법 기준(65세 전 가입 여부)으로 판단
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험법 제10조 및 2026년 1월 기준으로 작성됐어요. 개인별 수급 자격은 관할 고용센터 또는 고용노동부 고객상담센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
