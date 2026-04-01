"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. K-패스 카드를 만들지 말지 결정하려는데, 내 교통비로 실제 얼마가 돌아오는지 계산해보고 싶은 상황
// Q2. 월 교통비 × 환급률 → 월/연 환급액 확인 → "이 정도면 카드 만들자" 결정 → 카드 발급 페이지로 이동
// Q2-1. 카드 비교 페이지 또는 카드사 발급 페이지 클릭
// Q3. 환급률 3단계(일반 20%, 청년 30%, 저소득 53%) / 월 15회 이상 조건 / 월 최대 한도 약 6만원 / 택시·시외버스·KTX 제외 / 연말정산 공제와 중복 가능
// Q4. 환급률 토글 인터랙티브 + 월 교통비별 환급 시뮬 표 + BorderBox 한도·방식·주의사항 텍스트 + FAQ

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR, K패스_HIGHLIGHT } from "@/data/K-패스-guide";

const FAQS = [
  { q: "월 15회 미만이면 환급이 아예 없나요?", a: "맞아요, 14회 이하면 환급이 0원이에요. 15회가 기준선이에요. 출퇴근 주 4일 × 왕복이면 주 8회, 월 32회 정도 되니까 직장인이면 대부분 충족돼요. 재택근무가 많은 분은 주말 이동도 합산되니까 그걸로 채울 수 있어요. 택시는 합산에서 빠지니까 주의하고요." },
  { q: "월 환급 한도가 정확히 얼마인가요?", a: "카드사마다 다르지만 대부분 월 6만원 내외예요. 월 교통비가 30만원이어도 환급은 최대 6만원 선에서 멈춰요. 한도 초과분은 환급되지 않아요. 정확한 한도는 카드사 약관에 명시되어 있으니, 발급 전에 확인하는 게 좋아요." },
  { q: "환급은 현금으로 받나요?", a: "카드 종류에 따라 달라요. 신용카드는 다음 달 청구서에서 자동 차감돼요. 카드값이 줄어드는 방식이라 현금 입금은 아니지만 효과는 같아요. 체크카드는 연결 계좌로 직접 입금되거나 캐시백이에요. 선불카드(티머니 등)는 카드 잔액으로 충전돼요." },
  { q: "연말정산 대중교통 공제와 중복으로 받을 수 있나요?", a: "받을 수 있어요. K-패스 환급은 실제 탑승 횟수 기반이고, 연말정산 대중교통 소득공제(40%)는 카드 결제금액 기준이에요. 두 제도의 산정 방식이 다르기 때문에 별개로 적용돼요. K-패스 환급 + 연말정산 공제를 동시에 받으면 실질 교통비가 더 줄어들어요." },
  { q: "환급이 안 들어왔어요. 어디서 확인하나요?", a: "k-pass.or.kr에 로그인하면 이용 현황 메뉴에서 해당 월 이용 횟수와 환급 예정액을 볼 수 있어요. 15회를 채웠는데도 환급이 없으면 카드 등록이 제대로 됐는지 먼저 봐야 해요. k-pass.or.kr 회원 가입을 안 한 경우가 가장 흔한 원인이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
    { label: "국토교통부 K-패스 환급 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "K-패스-가입방법", title: "K-패스 가입방법", description: "카드 발급 후 회원 등록 전 과정이에요." },
  { slug: "K-패스-청년-환급", title: "K-패스 청년 환급 30%", description: "만 19~34세 청년 환급률과 절감액이에요." },
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 비교예요." },
];

const GREEN = "#1D9E75";

/* 환급액 계산 함수 */
function calcRefund(monthlyFee: number, rate: number): { monthly: number; yearly: number } {
  const cap = 60000;
  const monthly = Math.min(Math.round(monthlyFee * rate), cap);
  return { monthly, yearly: monthly * 12 };
}

const FEE_ROWS = [30000, 50000, 70000, 80000, 100000, 120000, 150000];

export default function Page() {
  const [selected, setSelected] = useState<"일반" | "청년" | "저소득">("청년");

  const rateMap = { "일반": 0.20, "청년": 0.30, "저소득": 0.53 };
  const colorMap = { "일반": "#6B7280", "청년": GREEN, "저소득": "#7C3AED" };

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} highlightSlugs={K패스_HIGHLIGHT} currentSlug="K-패스-환급-계산" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 환급 계산
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 환급 계산<br />
        내 교통비로 얼마 돌아오는지 바로 확인
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스를 신청할지 말지 고민되는 건 &quot;실제로 얼마나 돌아오는지&quot; 감이 안 잡히기 때문이죠.
        20%, 30%, 53%라고 숫자만 봐서는 내 교통비에서 얼마가 빠지는지 바로 와닿지 않아요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        그래서 아래에 환급 시뮬레이션 표를 만들었어요.
        일반·청년·저소득 유형을 누르면 내 월 교통비 구간에 맞는 환급액이 바로 나와요.
        이걸 보면 카드를 만들지 말지 5초면 결정할 수 있어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        참고로 환급에는 월 15회 이상 대중교통 이용 조건이 있고, 월 최대 한도(약 6만원)도 있어요.
        표에 한도 초과 구간도 표시해뒀으니까 정확하게 볼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 핵심 — 환급 시뮬레이션 ──────────────────── */}
      <H2>내 유형 골라서 환급액 바로 확인</H2>
      <p style={body}>
        아래 버튼에서 내 유형을 누르면 표가 바뀌어요.
        일반(만 35세 이상), 청년(만 19~34세), 저소득(기초수급·차상위) 중 해당하는 걸 선택하면 돼요.
      </p>

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

      <GreenBox>
        <p style={{ fontSize: 12, fontWeight: 700, color: colorMap[selected], marginBottom: 10 }}>
          {selected === "일반" ? "만 35세 이상 · 일반 20% 환급" :
           selected === "청년" ? "만 19~34세 청년 · 30% 환급" :
           "기초수급자·차상위계층 · 53% 환급"}
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "right", padding: "6px 8px" }}>월 환급액</th>
              <th style={{ textAlign: "right", padding: "6px 8px" }}>연 환급액</th>
              <th style={{ textAlign: "right", padding: "6px 8px" }}>연 실질 교통비</th>
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map((fee, i) => {
              const { monthly, yearly } = calcRefund(fee, rateMap[selected]);
              const netYearly = fee * 12 - yearly;
              const capped = monthly >= 60000;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <td style={{ padding: "6px 8px", fontWeight: 600 }}>{(fee / 10000).toFixed(0)}만원</td>
                  <td style={{ textAlign: "right", padding: "6px 8px", color: colorMap[selected], fontWeight: 700 }}>
                    {(monthly / 10000).toFixed(1)}만원{capped ? " (한도)" : ""}
                  </td>
                  <td style={{ textAlign: "right", padding: "6px 8px" }}>{(yearly / 10000).toFixed(1)}만원</td>
                  <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 12, color: "#555" }}>{(netYearly / 10000).toFixed(0)}만원</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          월 15회 이상 이용 기준 / 월 한도 6만원 초과분은 환급 없음 / 연 교통비 = 월 × 12 기준
        </p>
      </GreenBox>

      <p style={body}>
        수도권 직장인 기준으로 월 교통비가 보통 7~10만원 선이에요.
        청년(30%)이고 월 8만원이면 연간 28.8만원을 돌려받아요.
        일반(20%)이어도 연간 19.2만원이니까, K-패스를 안 쓰면 그만큼 버리는 셈이에요.
      </p>
      <p style={body}>
        체크카드로 발급하면 연회비 0원이라 순수하게 환급액만큼 이득이에요.
        신용카드도 연회비가 5천~8천원이니까 첫 달 환급으로 본전이 나와요.
        어떤 카드가 나한테 맞는지는 <a href="/w/K-패스-카드-비교" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>카드 비교 페이지</a>에서 골라보면 돼요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 환급 한도·방식·주의사항 ──────────────────── */}
      <H2>환급 한도와 주의사항</H2>
      <p style={body}>
        교통비가 많다고 환급이 무제한으로 늘어나지는 않아요.
        월 최대 한도가 있고, 카드 종류에 따라 환급 방식도 달라요.
        발급 전에 알아둬야 나중에 &quot;왜 이만큼밖에 안 왔지?&quot; 하는 일이 없어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>월 최대 환급 한도: 약 6만원</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          카드사별로 조금 다르지만, 대부분 월 6만원 내외에서 환급 한도가 걸려요.
          일반 20% 기준으로 월 교통비 30만원 이상이면 한도에 닿고,
          청년 30%는 20만원, 저소득 53%는 약 11.3만원 이상이면 한도 도달이에요.
          교통비가 이보다 많은 분은 한도 초과분이 환급되지 않으니까 참고해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>환급 방식은 카드 종류에 따라 다름</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          신용카드는 다음 달 카드 청구서에서 자동 차감(청구 할인)이에요. 카드값이 줄어드는 방식이라 현금 입금은 아니지만 효과는 동일해요.
          체크카드는 연결된 은행 계좌로 직접 입금되거나 캐시백이에요.
          선불카드(티머니·이즐)는 카드 잔액으로 충전되는 방식이에요.
          현금처럼 바로 체감하고 싶으면 체크카드가 가장 직관적이에요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>합산되는 교통수단과 제외 대상</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          버스(시내·마을), 지하철, GTX는 합산돼요. 15회 카운트에도 포함되고 환급 대상이에요.
          반면 택시, 시외버스(고속·공항), KTX, SRT는 제외돼요.
          &quot;나는 매일 택시를 타는데&quot;라면 K-패스 혜택이 거의 없으니까 유의해야 해요.
          환급 확인은 k-pass.or.kr 마이페이지 &rarr; 이용 현황에서 할 수 있어요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. K-패스 환급 한도·방식은 카드사별로 다르고 정책 변경이 있을 수 있으니 발급 전 약관을 봐야 해요." />
    </ArticleLayout>
  );
}
