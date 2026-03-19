"use client";

// Q1. 월 소비 30만원은 넘기는 직장인인데, K-패스 신용카드 종류가 너무 많아서 어떤 게 나한테 유리한지 모르겠는 상황
// Q2. 내 소비 패턴(편의점/카페/쇼핑/주유)에 맞는 신용카드 1개 골라서 카드사 사이트에서 신청
// Q2-1. 카드사 공식 신청 페이지 클릭
// Q3. 전월실적 30만원 공통(교통비 포함 여부 카드사별 다름) / 연회비 5천~1만원 / 추가 할인 카테고리 차이 / 환급 방식(청구할인 vs 캐시백) 차이
// Q4. "비교해서 고른다" → 비교표 중심 텍스트 짧게 + 상황별 추천 GreenBox + 카드사 신청 딥링크

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

/* ── 카드 데이터 ─────────────────────────────────────── */
const CARDS = [
  { name: "신한카드 K-패스", fee: "5,000원", extra: "편의점·카페 5% 할인", best: "편의점·카페", url: "https://www.shinhancard.com/pconts/html/card/apply/credit/1225543_2207.html" },
  { name: "NH농협 올바른 K-패스", fee: "5,000원", extra: "농협몰·하나로마트 3% 할인", best: "농협 거래자", url: "https://card.nonghyup.com/servlet/IpCc2021R.act?CD_WRS_SQNO=90010471" },
  { name: "KB국민 K-패스", fee: "7,000원", extra: "온라인쇼핑·통신비 1% 적립", best: "KB 주거래", url: "https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?mainCC=a&cooperationcode=09322" },
  { name: "삼성카드 K-패스", fee: "8,000원", extra: "삼성페이 NFC + 온라인 1.5%", best: "삼성페이 사용자", url: "https://www.samsungcard.com/home/card/cardinfo/PGHPPCCCardCardinfoDetails001?code=AAP1830" },
  { name: "하나 K-패스", fee: "5,000원", extra: "하나머니 캐시백 + 쇼핑 할인", best: "하나은행 주거래", url: "https://www.hanacard.co.kr/OPI41000000D.web?_frame=no&CD_PD_SEQ=17016" },
];

const FAQS = [
  { q: "전월실적 30만원에 교통비도 포함되나요?", a: "카드사마다 달라요. 신한·KB는 교통비 포함, 일부 카드사는 제외예요. 발급 전 약관에서 '실적 산정 제외 항목'을 꼭 봐야 해요." },
  { q: "실적 못 채우면 환급이 안 되나요?", a: "K-패스 환급은 실적과 무관해요. 실적 조건은 추가 할인(편의점·카페 등)에만 적용돼요. 15회 이상 타면 환급은 그대로 나와요." },
  { q: "연회비가 아깝지 않나요?", a: "월 교통비 8만원 × 20% = 월 1.6만원 환급이에요. 연 19.2만원이니까 연회비 5천~8천원은 첫 달에 넘어요." },
  { q: "체크카드가 나을 수도 있나요?", a: "월 소비 30만원 미만이면 체크카드가 나아요. 실적·연회비 없이 환급만 받을 수 있거든요. 30만원 이상 쓰면 신용카드 추가 할인이 더 이득이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
    { label: "국토교통부 K-패스 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 필터 비교 표예요." },
  { slug: "K-패스-체크카드-추천", title: "K-패스 체크카드 추천", description: "실적·연회비 없는 체크카드 비교예요." },
  { slug: "K-패스-가입방법", title: "K-패스 가입방법", description: "카드 발급 후 회원 등록 절차 안내예요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  const [picked, setPicked] = useState<string | null>(null);

  const situations = [
    { label: "편의점·카페 자주 감", card: "신한카드 K-패스", reason: "편의점 GS25·CU 5% 할인, 스타벅스·이디야 할인 겸용" },
    { label: "농협 주거래", card: "NH농협 올바른 K-패스", reason: "농협몰·하나로마트 3% 할인 + 농협ATM 수수료 면제" },
    { label: "온라인쇼핑 많이 함", card: "삼성카드 K-패스", reason: "온라인쇼핑 1.5% M포인트 적립 + 삼성페이 NFC 결제" },
    { label: "KB/하나은행 주거래", card: "해당 은행 카드", reason: "주거래 은행이면 앱 통합 관리 + 이자·수수료 우대" },
  ];

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-신용카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 신용카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 신용카드 추천<br />
        내 소비 패턴별 딱 맞는 1장
      </h1>

      {/* [기] Q1 공감 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 신용카드가 10종 넘게 나와서 뭘 골라야 할지 모르겠죠?
        환급률은 전부 동일하고, 전월실적 30만원도 공통이에요.
        차이는 딱 하나 — 추가 할인 카테고리뿐이라 내가 돈 쓰는 곳에 맞춰 고르면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* [승] 핵심 답변 — 5초 안에 결론 */}
      <H2>내 상황 눌러보면 바로 추천</H2>
      <p style={body}>
        아래에서 나한테 해당되는 상황을 눌러봐요. 바로 추천 카드가 나와요.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {situations.map((s) => (
          <button
            key={s.label}
            onClick={() => setPicked(picked === s.label ? null : s.label)}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: picked === s.label ? `2px solid ${GREEN}` : "1.5px solid #e5e7eb",
              background: picked === s.label ? "rgba(29,158,117,0.06)" : "#fff",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: picked === s.label ? GREEN : "#333" }}>
              {picked === s.label ? "✓ " : ""}{s.label}
            </span>
            {picked === s.label && (
              <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.8 }}>
                <strong style={{ color: GREEN }}>추천: {s.card}</strong><br />
                {s.reason}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* [승] 비교표 */}
      <H2>신용카드 5종 비교표</H2>
      <p style={body}>
        전월실적 30만원, 환급률 동일 — 이 두 가지는 전부 같아요. 연회비와 추가 할인만 비교하면 돼요.
      </p>

      <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>카드</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 700 }}>연회비</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 700 }}>추가 할인</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>신청</th>
            </tr>
          </thead>
          <tbody>
            {CARDS.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, fontSize: 12 }}>{c.name}</td>
                <td style={{ textAlign: "right", padding: "9px 8px" }}>{c.fee}</td>
                <td style={{ padding: "9px 8px", fontSize: 11, color: "#555" }}>{c.extra}</td>
                <td style={{ textAlign: "center", padding: "9px 8px" }}>
                  <a href={c.url} style={{ display: "inline-block", padding: "5px 12px", borderRadius: 6, background: GREEN, color: "#fff", fontWeight: 700, fontSize: 11, textDecoration: "none" }}>
                    신청 →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* [전] 주의사항 — Q3 예외/부딪히는 상황 */}
      <H2>신청 전 반드시 확인할 3가지</H2>
      <p style={body}>
        카드 고르고 바로 신청하기 전에, 이 3가지를 놓치면 손해 봐요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>교통비가 실적에 포함되는지</strong><br />
        전월실적 30만원을 채울 때 교통비도 포함되는 카드사가 있고 아닌 곳이 있어요.
        교통비만으로 10만원 이상 쓰는 분은 포함 여부에 따라 실적 달성 난이도가 크게 달라져요.
        약관에서 &apos;실적 산정 제외 항목&apos;을 꼭 봐야 해요.
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>환급 방식이 카드사마다 다름</strong><br />
        신한·KB는 다음 달 청구서에서 자동 차감(청구 할인)이에요.
        농협은 캐시백, 하나는 하나머니 포인트로 돌아오죠.
        현금처럼 바로 쓰고 싶으면 청구 할인 방식이 편해요.
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>카드 발급 ≠ 환급 시작</strong><br />
        카드 받고 나서 <a href="https://www.korea-pass.kr" style={{ color: GREEN }}>k-pass.or.kr</a>에서
        회원 가입을 따로 해야 환급이 시작돼요.
        이걸 모르고 몇 달째 그냥 쓰는 분이 정말 많아요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* [결] FAQ */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 연회비·혜택·실적 조건은 카드사 정책에 따라 변경될 수 있으니 신청 전 카드사 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
