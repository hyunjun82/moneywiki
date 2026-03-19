"use client";

// Q1. 만 19~34세 청년인데 K-패스 30% 환급이 나한테도 되는 건지, 언제까지인지 확인하고 싶은 상황
// Q2. 내 나이로 자격 확인 → k-pass.or.kr에서 청년 등록 → 매달 30% 환급 받기
// Q2-1. k-pass.or.kr 회원가입 페이지
// Q3. 만 19~34세 주민등록 기준 / 서류 불필요 자동 확인 / 35세 생일 다음 달 일반 전환 / 저소득 청년 53% 우선 적용
// Q4. "조건 확인 후 가입" → 자격 체커(인터랙티브) + 절감액 계산표 + 가입 링크

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

const FAQS = [
  { q: "청년 30%는 따로 서류를 내야 하나요?", a: "아니에요. k-pass.or.kr 가입할 때 주민등록번호로 나이가 자동 확인돼요. 만 19~34세면 별도 서류 없이 바로 적용돼요." },
  { q: "만 35세 되면 어떻게 되나요?", a: "생일이 지난 달의 다음 달부터 일반 20%로 자동 전환돼요. 3월에 35세가 되면 4월 이용분부터 20%예요." },
  { q: "저소득 청년이면 30%와 53% 중 뭐가 적용되나요?", a: "53%가 적용돼요. 기초수급자·차상위계층이면 청년이더라도 53%가 우선이에요. K-패스 가입 시 저소득층으로 등록하면 돼요." },
  { q: "만 19세 미만은 K-패스 못 쓰나요?", a: "청년 30%는 못 받지만 K-패스 자체는 나이 제한 없어요. 일반 20% 또는 선불 티머니로 이용 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "K-패스 공식 사이트 (회원가입)", url: "https://www.korea-pass.kr" },
    { label: "국토교통부 K-패스 청년 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "어떤 카드를 발급받을지 비교해요." },
  { slug: "K-패스-환급-계산", title: "K-패스 환급액 계산", description: "내 교통비로 얼마 돌아오는지 계산해요." },
  { slug: "청년월세지원", title: "청년월세지원 월 최대 20만원", description: "K-패스와 함께 받으면 월 최대 24만원 절감이에요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const currentYear = 2026;
  const age = birthYear ? currentYear - birthYear : null;
  const isYouth = age !== null && age >= 19 && age <= 34;
  const isUnder = age !== null && age < 19;
  const isOver = age !== null && age > 34;

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-청년-환급" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 청년 할인
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 청년 환급 30%<br />
        내가 대상인지 확인하고 바로 가입
      </h1>

      {/* [기] Q1 공감 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        나는 청년인데 30% 환급이 진짜 나한테도 되는 건지 궁금하죠?
        만 19~34세면 서류 없이 자동 적용돼요. 일반(20%)보다 연간 수만 원을 더 돌려받으니
        해당되면 지금 바로 가입하는 게 이득이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* [승] 핵심 — 자격 확인 체커 */}
      <H2>내가 청년 30%에 해당되는지 확인</H2>
      <p style={body}>
        태어난 연도만 입력하면 바로 알 수 있어요.
      </p>

      <div style={{ background: "#f0fdf9", border: `1.5px solid ${GREEN}`, borderRadius: 12, padding: "20px 16px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>태어난 연도:</span>
          <input
            type="number"
            placeholder="예: 1995"
            min={1940}
            max={2010}
            onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : null)}
            style={{
              padding: "8px 12px",
              border: "1.5px solid #ddd",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              width: 120,
              textAlign: "center",
            }}
          />
        </div>
        {age !== null && (
          <div style={{ padding: "12px 14px", borderRadius: 8, background: "#fff", marginTop: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: isYouth ? GREEN : isUnder ? "#D97706" : "#EF4444", marginBottom: 4 }}>
              {isYouth && `만 ${age}세 → 청년 30% 환급 대상이에요!`}
              {isUnder && `만 ${age}세 → 청년 대상은 아니지만 일반 20% 환급은 받을 수 있어요.`}
              {isOver && `만 ${age}세 → 일반 20% 환급 대상이에요. (청년 30%는 만 34세까지)`}
            </p>
            {isYouth && (
              <p style={{ fontSize: 12, color: "#555", margin: 0 }}>
                k-pass.or.kr 가입 시 자동 적용 · 서류 불필요 · 만 35세 생일 다음 달까지 유지
              </p>
            )}
          </div>
        )}
      </div>

      {/* [전] 절감액 계산 */}
      <H2>청년이면 얼마나 더 받는지</H2>
      <p style={body}>
        같은 교통비를 써도 일반보다 연간 수만 원을 추가로 환급받아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>일반 20%</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>청년 30%</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연 추가 절감</th>
            </tr>
          </thead>
          <tbody>
            {[
              { fee: "5만원", normal: "1만원", youth: "1.5만원", extra: "+6만원" },
              { fee: "8만원", normal: "1.6만원", youth: "2.4만원", extra: "+9.6만원" },
              { fee: "12만원", normal: "2.4만원", youth: "3.6만원", extra: "+14.4만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.fee}</td>
                <td style={{ textAlign: "right", padding: "6px 8px", color: "#999" }}>{r.normal}</td>
                <td style={{ textAlign: "right", padding: "6px 8px", color: GREEN, fontWeight: 700 }}>{r.youth}</td>
                <td style={{ textAlign: "right", padding: "6px 8px", color: "#7C3AED", fontWeight: 600 }}>{r.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 월 15회 이상 이용 기준 / 월 환급 한도 6만원 내외
        </p>
      </GreenBox>

      {/* [전] 주의사항 — Q3 부딪히는 상황 */}
      <H2>꼭 알아둘 3가지</H2>
      <p style={body}>
        청년 환급은 자동이라 간단하지만, 이 3가지는 놓치기 쉬워요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>35세 전환 시점</strong><br />
        만 35세 생일이 지난 달의 다음 달부터 자동으로 일반 20%로 바뀌어요.
        예를 들어 3월에 35세가 되면 4월 이용분부터 20%예요. 별도 신청 없이 자동이에요.
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>저소득이면 53%가 더 유리해요</strong><br />
        기초생활수급자·차상위계층이면 청년이라도 53%가 우선 적용돼요.
        K-패스 가입 시 저소득층으로 등록하면 30% 대신 53%를 받을 수 있어요.
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>카드 발급 ≠ 환급 시작</strong><br />
        카드만 만들고 <a href="https://www.korea-pass.kr" style={{ color: GREEN }}>k-pass.or.kr</a> 가입 안 하면 환급이 안 돼요.
        청년 여부도 가입할 때 자동 확인되니까 가입이 필수예요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. K-패스 청년 기준 나이는 정책 변경으로 조정될 수 있으니 k-pass.or.kr 공지를 확인하세요." />
    </ArticleLayout>
  );
}
