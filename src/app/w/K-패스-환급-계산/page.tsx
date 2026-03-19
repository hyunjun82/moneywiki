"use client";

// Q1. K-패스 신청하려는데 실제로 얼마나 돌아오는지 내 교통비로 계산해보고 싶은 상황
// Q2. 내 월 교통비 × 환급률 = 환급액 확인 → 연간 절감액 파악 → 카드 발급 결정
// Q3. 환급률 일반20%·청년30%·저소득53% / 월15회 이상 조건 / 월 최대 한도 6만원 내외
// Q4. GreenBox(월 교통비별 환급액 시뮬 표 3종) + BorderBox(환급 한도 주의) + FAQ

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

const FAQS = [
  {
    q: "월 15회 미만이면 환급이 아예 없나요?",
    a: "맞아요. 14회 이하는 환급이 0원이에요. 15회가 기준이에요. 출퇴근만 하면 약 주 4회인데, 이 경우 4주 × 2 = 16~20회로 대부분 충족돼요. 주말에 대중교통을 아예 안 타면 15회 미달이 될 수 있어요.",
  },
  {
    q: "월 환급 한도가 있나요?",
    a: "카드사별로 다르지만 월 최대 6만원 내외예요. 월 교통비가 30만원이어도 환급은 최대 6만원 수준에서 멈춰요. 교통비가 많아도 한도 초과분은 환급이 안 되니 카드 약관 확인을 권해요.",
  },
  {
    q: "환급은 현금으로 받나요?",
    a: "신용카드는 다음 달 청구 금액에서 차감(청구 할인), 체크카드는 계좌로 입금되거나 캐시백 형태예요. 선불카드(티머니 등)는 카드 잔액으로 충전돼요. 모두 현금처럼 쓸 수 있어요.",
  },
  {
    q: "연말정산과 중복으로 받을 수 있나요?",
    a: "네. K-패스 환급은 교통비 결제금액 기준이 아니라 실제 탑승 기반이에요. 연말정산 대중교통 신용카드 공제(40%)는 신용카드 결제 금액 기준이라 두 혜택은 별개예요. 동시에 받을 수 있어요.",
  },
  {
    q: "환급이 안 들어왔어요. 확인 방법이 있나요?",
    a: "k-pass.or.kr → 로그인 → 이용 현황에서 해당 월 이용 횟수와 환급 예정액을 확인할 수 있어요. 15회를 채웠는데도 환급이 없으면 카드 등록이 제대로 됐는지 먼저 확인해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 환급 안내", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-가입방법", title: "K-패스 가입방법", description: "카드 발급 후 회원 등록 전 과정이에요." },
  { slug: "K-패스-청년-환급", title: "K-패스 청년 환급 30%", description: "만 19~34세 청년 환급률과 절감액이에요." },
  { slug: "연말정산-대중교통-신용카드", title: "대중교통 신용카드 공제 40%", description: "K-패스와 별도로 연말정산 공제도 받아요." },
];

const GREEN = "#1D9E75";

/* 환급액 계산 함수 */
function calcRefund(monthlyFee: number, rate: number): { monthly: number; yearly: number } {
  const cap = 60000; // 월 최대 한도
  const monthly = Math.min(Math.round(monthlyFee * rate), cap);
  return { monthly, yearly: monthly * 12 };
}

const FEE_ROWS = [30000, 50000, 70000, 80000, 100000, 120000, 150000];

export default function Page() {
  const [selected, setSelected] = useState<"일반" | "청년" | "저소득">("청년");

  const rateMap = { "일반": 0.20, "청년": 0.30, "저소득": 0.53 };
  const colorMap = { "일반": "#6B7280", "청년": GREEN, "저소득": "#7C3AED" };

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-환급-계산" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 환급 계산
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 환급 계산<br />
        월 교통비별 환급액 시뮬레이션
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스로 실제 얼마를 돌려받을 수 있는지 월 교통비 구간별로 계산해봤어요.
        일반·청년·저소득 3가지 기준으로 비교할 수 있어요.
        내 교통비 규모를 알면 어떤 카드가 유리한지도 판단할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>환급률 선택 후 확인</H2>
      <p style={body}>
        내 해당 구분을 먼저 선택하면 아래 표가 자동으로 바뀌어요.
      </p>

      {/* 환급률 선택 버튼 */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {(["일반", "청년", "저소득"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: `2px solid ${colorMap[g]}`,
              background: selected === g ? colorMap[g] : "transparent",
              color: selected === g ? "#fff" : colorMap[g],
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {g} {g === "일반" ? "(20%)" : g === "청년" ? "(30%)" : "(53%)"}
          </button>
        ))}
      </div>

      {/* 환급액 표 */}
      <GreenBox>
        <p style={{ fontSize: 12, fontWeight: 700, color: colorMap[selected], marginBottom: 8 }}>
          {selected === "일반" ? "만 35세 이상 · 일반 20% 환급" :
           selected === "청년" ? "만 19~34세 청년 · 30% 환급" :
           "기초수급자·차상위계층 · 53% 환급"}
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>월 환급액</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연 환급액</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연 실질 교통비</th>
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map((fee, i) => {
              const { monthly, yearly } = calcRefund(fee, rateMap[selected]);
              const netYearly = fee * 12 - yearly;
              const capped = monthly >= 60000;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <td style={{ padding: "5px 8px", fontWeight: 600 }}>{(fee / 10000).toFixed(0)}만원</td>
                  <td style={{ textAlign: "right", padding: "5px 8px", color: colorMap[selected], fontWeight: 700 }}>
                    {(monthly / 10000).toFixed(1)}만원{capped ? " (한도)" : ""}
                  </td>
                  <td style={{ textAlign: "right", padding: "5px 8px" }}>{(yearly / 10000).toFixed(1)}만원</td>
                  <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12, color: "#555" }}>{(netYearly / 10000).toFixed(0)}만원</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 월 15회 이상 이용 기준 / 월 한도 6만원 초과분은 환급 없음 / 연 교통비 = 월 × 12 기준
        </p>
      </GreenBox>

      <H2>환급 한도와 주의사항</H2>
      <p style={body}>
        교통비가 많아도 한도 때문에 환급이 무제한으로 늘지 않아요.
        한도를 넘기 전 구간에서 환급 효율이 가장 높아요.
      </p>

      <BorderBox>
        <strong>월 최대 환급 한도</strong><br />
        카드사별 다르지만 대부분 월 6만원 내외<br />
        일반 20% 기준 → 월 교통비 30만원 이상이면 한도 도달<br />
        청년 30% 기준 → 월 교통비 20만원 이상이면 한도 도달<br />
        저소득 53% 기준 → 월 교통비 11.3만원 이상이면 한도 도달<br />
        <br />
        <strong>환급 방식 (카드사별 다름)</strong><br />
        신용카드: 다음 달 청구 금액에서 차감 (현금 입금 아님)<br />
        체크카드: 연결 계좌 직접 입금 또는 포인트<br />
        선불카드: 카드 잔액 충전<br />
        <br />
        <strong>월 15회 조건 확인 방법</strong><br />
        k-pass.or.kr → 이용 현황 → 해당 월 이용 횟수 실시간 확인 가능
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. K-패스 환급 한도·방식은 카드사별로 다르고 정책 변경이 있을 수 있으니 발급 전 약관을 확인하세요." />
    </ArticleLayout>
  );
}
