"use client";

// Q1. 만 19~34세 청년인데 K-패스 30% 환급이 나한테도 적용되는지, 언제까지 받을 수 있는지 확인하고 싶은 상황
// Q2. 생년으로 자격 확인 → k-pass.or.kr에서 회원 가입 → 매달 교통비 30% 환급 시작
// Q2-1. k-pass.or.kr 회원가입 페이지
// Q3. 만 19~34세 주민등록 기준(서류 없이 자동 확인) / 35세 생일 다음 달 일반 전환 / 저소득 청년은 53% 우선 / 경기·인천은 39세까지 / 월 15회 이상 조건 동일
// Q4. 나이 계산기(인터랙티브) + 일반 vs 청년 절감액 비교표 + BorderBox 주의사항 + 가입 링크

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR, K패스_HIGHLIGHT } from "@/data/K-패스-guide";

const FAQS = [
  { q: "청년 30%는 따로 서류를 내야 하나요?", a: "아니에요, 서류가 전혀 필요 없어요. k-pass.or.kr에 가입할 때 주민등록번호로 나이가 자동 확인돼요. 만 19~34세면 별도 인증이나 증빙 없이 바로 청년 30% 환급이 적용돼요. 군 복무 기간이 있더라도 만 나이 기준이라 따로 신청할 게 없어요." },
  { q: "만 35세 되면 환급이 갑자기 끊기나요?", a: "끊기지는 않고, 환급률이 30%에서 20%로 바뀌어요. 생일이 지난 달의 다음 달부터 자동 전환돼요. 예를 들어 3월에 35세가 되면 4월 이용분부터 일반 20%가 적용돼요. 전환 전에 별도 통지가 오지 않으니까, 34세 마지막 해에 최대한 활용하는 게 좋아요." },
  { q: "저소득 청년이면 30%와 53% 중 뭐가 적용되나요?", a: "53%가 적용돼요. 기초생활수급자·차상위계층이면 청년이라도 저소득층 53%가 우선이에요. K-패스 가입할 때 저소득층 증빙을 등록하면 돼요. 30%보다 23%p 높으니까 해당되면 반드시 저소득층으로 등록해야 해요." },
  { q: "경기도·인천은 39세까지 청년이라던데 맞나요?", a: "맞아요. 기본 K-패스의 청년 기준은 만 19~34세인데, 경기도 The 경기패스와 인천 I-패스는 만 39세까지 청년으로 인정해요. 본인이 해당 지역 거주자면 더 오래 30% 환급을 받을 수 있어요. 거주 지역 확인은 k-pass.or.kr 마이페이지에서 가능해요." },
  { q: "만 19세 미만은 K-패스를 아예 못 쓰나요?", a: "청년 30%는 못 받지만, K-패스 자체는 나이 제한이 없어요. 선불 티머니 K-패스로 일반 20% 환급을 받을 수 있어요. 은행 계좌가 없는 학생이라면 티머니 충전식이 가장 편해요." },
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
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} highlightSlugs={K패스_HIGHLIGHT} currentSlug="K-패스-청년-환급" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 청년 할인
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 청년 환급 30%<br />
        내 나이로 자격 확인하고 바로 가입
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;나도 30% 환급 대상이야?&quot; — K-패스 청년 혜택이 있다는 건 알겠는데, 정확히 내가 해당되는지 애매하죠.
        만 19~34세라는 기준이 올해 기준인지 생일 기준인지, 군복무 기간은 빠지는지, 언제까지 받을 수 있는지 헷갈리는 게 많아요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        결론부터 말하면 만 나이 기준이에요. 주민등록번호에서 자동 확인되니까 서류를 준비할 필요가 전혀 없어요.
        일반 환급률 20%보다 10%p 높은 30%라서, 월 교통비 8만원 기준으로 연간 9.6만원을 더 돌려받아요.
        해당되면 하루라도 빨리 가입하는 게 이득이에요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아래 계산기에 태어난 연도를 넣으면 바로 결과가 나와요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 핵심 — 자격 확인 계산기 ─────────────────── */}
      <H2>내 나이로 청년 자격 바로 확인</H2>
      <p style={body}>
        태어난 연도만 입력하면 2026년 기준으로 만 나이를 계산해서 청년 대상 여부를 바로 알려줘요.
        주민등록상 출생연도 기준이고, 생월은 따지지 않아요.
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
          <div style={{ padding: "14px", borderRadius: 8, background: "#fff", marginTop: 8 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: isYouth ? GREEN : isUnder ? "#D97706" : "#EF4444", marginBottom: 6 }}>
              {isYouth && `2026년 기준 만 ${age}세 → 청년 30% 환급 대상이에요!`}
              {isUnder && `2026년 기준 만 ${age}세 → 청년 대상은 아니지만 일반 20% 환급은 받을 수 있어요.`}
              {isOver && `2026년 기준 만 ${age}세 → 일반 20% 환급 대상이에요. (청년 30%는 만 34세까지)`}
            </p>
            {isYouth && (
              <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.7 }}>
                서류 없이 자동 적용돼요. <a href="https://www.korea-pass.kr" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>k-pass.or.kr</a>에 가입하면 바로 30% 환급이 시작돼요.
                만 35세 생일이 지난 다음 달부터 일반 20%로 전환돼요.
              </p>
            )}
            {isOver && age !== null && age <= 39 && (
              <p style={{ fontSize: 13, color: "#D97706", margin: "6px 0 0", lineHeight: 1.7 }}>
                참고: 경기도(The 경기패스)·인천(I-패스)은 만 39세까지 청년 30%가 적용돼요. 해당 지역 거주자라면 K-패스 사이트에서 확인해보세요.
              </p>
            )}
          </div>
        )}
      </div>

      <Divider />

      {/* ── [전] 절감액 비교 ─────────────────────────────── */}
      <H2>일반 20% vs 청년 30%, 연간 차이</H2>
      <p style={body}>
        같은 교통비를 써도 청년이면 매달 10%p를 더 돌려받아요.
        월 교통비별로 일반과 청년의 차이를 비교하면 이래요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: "#999" }}>일반 20%</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: GREEN }}>청년 30%</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: "#7C3AED" }}>연간 추가 절감</th>
            </tr>
          </thead>
          <tbody>
            {[
              { fee: "4만원", normal: "8,000원", youth: "1.2만원", extra: "+4.8만원" },
              { fee: "6만원", normal: "1.2만원", youth: "1.8만원", extra: "+7.2만원" },
              { fee: "8만원", normal: "1.6만원", youth: "2.4만원", extra: "+9.6만원" },
              { fee: "10만원", normal: "2만원", youth: "3만원", extra: "+12만원" },
              { fee: "15만원", normal: "3만원", youth: "4.5만원", extra: "+18만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.fee}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", color: "#999" }}>{r.normal}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", color: GREEN, fontWeight: 700 }}>{r.youth}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", color: "#7C3AED", fontWeight: 600 }}>{r.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          월 15회 이상 이용 기준 / 월 환급 한도 약 6만원 내외
        </p>
      </GreenBox>

      <p style={body}>
        수도권에서 출퇴근하는 청년이라면 월 교통비가 보통 6~10만원 선이에요.
        월 8만원 기준으로 계산하면 일반은 월 1.6만원, 청년은 월 2.4만원을 돌려받아요.
        연간으로 따지면 청년이 9.6만원을 더 받는 셈이에요.
        별다른 조건 없이 나이만으로 이 차이가 나니까, 해당되면 무조건 가입하는 게 맞아요.
      </p>
      <p style={body}>
        <a href="/w/K-패스-환급-계산" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>환급 계산기</a>에서
        내 실제 교통비로 더 정확하게 시뮬레이션해볼 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 주의사항 ────────────────────────────────── */}
      <H2>청년 환급에서 놓치기 쉬운 4가지</H2>
      <p style={body}>
        청년 환급은 자동 적용이라 간단하지만, 아래 4가지는 모르면 손해 보거나 헷갈릴 수 있어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 35세 전환 시점을 미리 알아두기</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          만 35세 생일이 지난 달의 다음 달부터 자동으로 일반 20%로 전환돼요.
          예를 들어 2026년 3월에 35세가 되면, 4월 이용분부터 20%예요.
          별도 안내가 오지 않으니까, 34세 마지막 해에 대중교통을 최대한 활용하는 게 유리해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 저소득 청년이면 53%가 더 유리</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          기초생활수급자·차상위계층에 해당하면 청년이라도 53%가 우선 적용돼요.
          K-패스 가입할 때 저소득층 증빙(수급자 증명서 등)을 등록하면 돼요.
          30%보다 23%p 높으니까, 해당되면 반드시 저소득층으로 등록해야 해요.
          잘 모르겠으면 주민센터에서 수급자 여부부터 확인하는 게 순서예요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>3. 경기도·인천은 39세까지 청년</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          기본 K-패스는 만 34세까지지만, 경기도 The 경기패스와 인천 I-패스는 만 39세까지 청년 30% 환급을 적용해요.
          35~39세인데 경기·인천에 거주하고 있다면 지역 패스로 가입하는 게 유리해요.
          거주지 확인은 주민등록 주소 기준이에요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>4. 카드 발급과 K-패스 가입은 별개</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          K-패스 체크카드나 신용카드를 발급받았다고 자동으로 환급이 시작되지 않아요.
          <a href="https://www.korea-pass.kr" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}> k-pass.or.kr</a> 또는 카드사 앱에서 회원 가입을 따로 해야 해요.
          가입할 때 주민등록번호로 청년 여부가 자동 확인되니까, 서류는 필요 없어요.
          상세 절차는 <a href="/w/K-패스-가입방법" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>가입방법 안내</a>를 참고하면 돼요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. K-패스 청년 기준 나이는 정책 변경으로 조정될 수 있으니 k-pass.or.kr 공지를 봐야 해요." />
    </ArticleLayout>
  );
}
