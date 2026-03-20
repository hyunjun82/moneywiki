"use client";

// Q1. 월 소비 30만원은 넘기는 직장인인데, K-패스 신용카드가 10종 넘게 나와서 어떤 게 내 소비 패턴에 유리한지 판단이 안 되는 상황
// Q2. 카드별 추가 할인 카테고리를 비교해서 내게 맞는 1장을 골라 카드사 신청 페이지에서 바로 발급
// Q2-1. 카드사 공식 신청 페이지 클릭
// Q3. 환급률 동일(20/30/53%) → 연회비(5천~1만원)·추가 할인 카테고리(편의점/쇼핑/주유/카페)·전월실적 30만원 교통비 포함 여부·환급 방식(청구할인 vs 포인트) 차이가 선택 기준
// Q4. "비교해서 고른다" → 상황별 추천 인터랙티브 + 비교표 + 각 카드 상세 텍스트 + BorderBox 주의사항 + FAQ

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR, K패스_HIGHLIGHT } from "@/data/K-패스-guide";

/* ── 카드 데이터 ─────────────────────────────────────── */
const CARDS = [
  { name: "신한카드 K-패스", fee: "5,000원", extra: "편의점·카페 5% 할인", best: "편의점·카페", url: "https://www.shinhancard.com/pconts/html/card/apply/credit/1225543_2207.html" },
  { name: "NH농협 올바른 K-패스", fee: "5,000원", extra: "농협몰·하나로마트 3% 할인", best: "농협 거래자", url: "https://card.nonghyup.com/servlet/IpCc2021R.act?CD_WRS_SQNO=90010471" },
  { name: "KB국민 K-패스", fee: "7,000원", extra: "온라인쇼핑·통신비 1% 적립", best: "KB 주거래", url: "https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?mainCC=a&cooperationcode=09322" },
  { name: "삼성카드 K-패스", fee: "8,000원", extra: "삼성페이 NFC + 온라인 1.5%", best: "삼성페이 사용자", url: "https://www.samsungcard.com/home/card/cardinfo/PGHPPCCCardCardinfoDetails001?code=AAP1830" },
  { name: "하나 K-패스", fee: "5,000원", extra: "하나머니 캐시백 + 쇼핑 할인", best: "하나은행 주거래", url: "https://www.hanacard.co.kr/OPI41000000D.web?_frame=no&CD_PD_SEQ=17016" },
];

const FAQS = [
  { q: "전월실적 30만원에 교통비도 포함되나요?", a: "카드사마다 달라요. 신한·KB는 교통비가 실적에 포함되고, 일부 카드사는 제외돼요. 매달 교통비로 10만원 이상 쓰는 분이라면 이 차이가 꽤 커요. 발급 전 카드사 약관에서 '실적 산정 제외 항목'을 반드시 봐야 하고, 콜센터에 전화해서 직접 물어보는 게 가장 정확해요." },
  { q: "실적 못 채우면 K-패스 환급도 안 되나요?", a: "아니에요, 별개예요. K-패스 환급은 전월실적과 관계없이 월 15회 이상 대중교통을 타면 나와요. 전월실적 30만원 조건은 편의점·카페·쇼핑 같은 추가 할인에만 적용되는 거예요. 실적을 못 채워도 교통비 환급은 그대로 받을 수 있어요." },
  { q: "연회비 5천~8천원, 본전 뽑을 수 있나요?", a: "월 교통비 8만원 기준으로 계산하면 일반 환급률 20%에서 월 1.6만원이 돌아와요. 연간으로 따지면 19.2만원이에요. 연회비 5천~8천원은 첫 달 환급만으로 이미 넘기 때문에, 월 교통비가 4만원만 넘어도 본전은 충분히 뽑아요." },
  { q: "체크카드 대신 신용카드를 골라야 하는 경우는?", a: "월 소비가 30만원 이상이고, 편의점·카페·쇼핑에서 추가 할인까지 받고 싶으면 신용카드가 나아요. 반대로 30만원을 안 쓰거나 연회비가 부담되면 체크카드로 가는 게 맞고요. 체크카드는 연말정산 공제율이 30%(신용 15%)라는 장점도 있어서, 세금까지 따지면 판단이 달라질 수 있어요." },
  { q: "K-패스 카드를 나중에 다른 카드로 바꿀 수 있나요?", a: "언제든 바꿀 수 있어요. k-pass.or.kr에서 등록 카드를 변경하면 되고, 변경 당월부터 새 카드로 환급이 적용돼요. 다만 1인 1카드만 등록 가능하니까, 기존 카드 해지 전에 새 카드부터 등록하는 게 안전해요." },
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
    { label: "편의점·카페 자주 감", card: "신한카드 K-패스", reason: "GS25·CU 편의점 5% 할인이 매달 쌓이고, 스타벅스·이디야 등 카페 할인까지 겸용돼요. 출퇴근길에 커피 한 잔, 점심에 편의점 도시락 사는 패턴이면 추가 절약이 월 3천~5천원 수준이에요." },
    { label: "농협 주거래 or 마트 자주 감", card: "NH농협 올바른 K-패스", reason: "농협몰·하나로마트 3% 할인 + 농협ATM 수수료 면제예요. 농협 통장으로 월급 받는 분이라면 앱 하나로 교통비 환급과 생활비 할인을 같이 관리할 수 있어요." },
    { label: "온라인쇼핑 많이 함", card: "삼성카드 K-패스", reason: "온라인쇼핑 결제 시 1.5% M포인트 적립이에요. 삼성페이 NFC 결제도 지원돼서 지갑 없이 폰으로 교통·결제 모두 해결돼요. 쿠팡·네이버 쇼핑을 자주 쓰는 분한테 유리하죠." },
    { label: "주거래 은행 카드로 통합 관리", card: "해당 은행 카드 (KB/하나/우리 등)", reason: "주거래 은행 카드로 발급하면 앱 하나에서 잔액·환급·실적을 한 번에 관리할 수 있어요. ATM 수수료 면제, 이자 우대 같은 주거래 혜택도 계속 유지되고요." },
  ];

  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} highlightSlugs={K패스_HIGHLIGHT} currentSlug="K-패스-신용카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 신용카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 신용카드 추천<br />
        소비 패턴별 추가 할인까지 챙기는 1장
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 신용카드를 발급하려고 카드사 사이트에 들어갔는데, 신한·농협·KB·삼성·하나까지 선택지가 10종이 넘죠.
        혼란스러운 건 당연해요. 환급률은 일반 20%, 청년 30%, 저소득 53%로 어떤 카드를 써도 똑같고,
        전월실적 30만원 조건도 공통이에요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        그러면 뭘 기준으로 골라야 하냐면, 딱 한 가지 — <strong>추가 할인 카테고리</strong>예요.
        편의점을 자주 가면 신한, 온라인쇼핑이 많으면 삼성, 특정 은행 주거래라면 그 은행 카드.
        환급은 어차피 같으니까, 내가 돈 쓰는 곳에서 추가로 깎아주는 카드를 고르면 돼요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아래에서 내 상황을 골라보면 바로 추천 카드가 나와요. 비교표도 같이 정리해뒀으니 한눈에 보고 결정할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 핵심 답변 — 상황별 추천 ─────────────────── */}
      <H2>내 소비 패턴에 맞는 카드 고르기</H2>
      <p style={body}>
        K-패스 신용카드를 고를 때 가장 먼저 할 일은 &quot;나는 교통비 말고 어디에 돈을 가장 많이 쓰지?&quot;를 떠올리는 거예요.
        환급률은 전부 같으니까, 추가 할인이 내 소비 패턴과 맞아야 연회비 이상의 가치를 뽑을 수 있어요.
      </p>
      <p style={body}>
        아래 버튼 중 나한테 해당되는 걸 눌러봐요. 추천 카드와 이유가 바로 펼쳐져요.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {situations.map((s) => (
          <button
            key={s.label}
            onClick={() => setPicked(picked === s.label ? null : s.label)}
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: picked === s.label ? `2px solid ${GREEN}` : "1.5px solid #e5e7eb",
              background: picked === s.label ? "rgba(29,158,117,0.06)" : "#fff",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: picked === s.label ? GREEN : "#333" }}>
              {picked === s.label ? "\u2713 " : ""}{s.label}
            </span>
            {picked === s.label && (
              <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.9, color: "#444" }}>
                <strong style={{ color: GREEN, fontSize: 14 }}>추천: {s.card}</strong><br />
                {s.reason}
              </div>
            )}
          </button>
        ))}
      </div>

      <p style={body}>
        물론 위 분류가 절대적인 건 아니에요. 편의점도 가고 온라인쇼핑도 하는 분이라면
        연회비가 낮은 쪽(신한 5,000원 vs 삼성 8,000원)을 고르는 것도 방법이에요.
        추가 할인의 차이는 월 몇천 원 수준이라, 연회비 차이가 더 클 수 있거든요.
      </p>

      <Divider />

      {/* ── [승] 비교표 ────────────────────────────────── */}
      <H2>신용카드 5종 비교표</H2>
      <p style={body}>
        K-패스 환급률(일반 20% / 청년 30% / 저소득 53%)과 전월실적 30만원은 5종 모두 동일해요.
        아래 표에서는 카드마다 다른 부분만 정리했어요.
      </p>

      <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>카드</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 700 }}>연회비</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 700 }}>추가 할인</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>추천 대상</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>신청</th>
            </tr>
          </thead>
          <tbody>
            {CARDS.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, fontSize: 12 }}>{c.name}</td>
                <td style={{ textAlign: "right", padding: "9px 8px" }}>{c.fee}</td>
                <td style={{ padding: "9px 8px", fontSize: 11, color: "#555" }}>{c.extra}</td>
                <td style={{ textAlign: "center", padding: "9px 8px", fontSize: 11, color: GREEN, fontWeight: 600 }}>{c.best}</td>
                <td style={{ textAlign: "center", padding: "9px 8px" }}>
                  <a href={c.url} style={{ display: "inline-block", padding: "5px 12px", borderRadius: 6, background: GREEN, color: "#fff", fontWeight: 700, fontSize: 11, textDecoration: "none" }}>
                    신청 &rarr;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#888", marginTop: 4, marginBottom: 20 }}>
        * 연회비·혜택은 2026년 3월 기준이에요. 카드사 정책에 따라 변경될 수 있으니 신청 전 카드사 사이트에서 최신 조건을 봐야 해요.
      </p>

      <p style={body}>
        표를 보면 연회비 기준으로 크게 두 그룹이에요.
        신한·농협·하나는 5,000원, KB는 7,000원, 삼성은 8,000원이에요.
        3,000원 차이가 별것 아닌 것 같지만, 추가 할인을 활용하지 않으면 그냥 연회비만 더 내는 셈이에요.
        삼성카드를 고르려면 온라인쇼핑을 월 20만원 이상 하는지 먼저 따져봐야 해요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 근거 — 신청 전 반드시 알아야 할 것 ──────── */}
      <H2>신청 전 반드시 따져볼 3가지</H2>
      <p style={body}>
        카드를 고르고 신청 버튼을 누르기 전에, 이 3가지를 모르면 나중에 &quot;이거 왜 이래?&quot; 하게 돼요.
        특히 첫 번째는 실적 달성에 직접 영향을 주기 때문에 중요해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 교통비가 전월실적에 포함되는지</strong>
        <p style={{ ...body, marginTop: 8 }}>
          전월실적 30만원을 채울 때, 교통비도 실적으로 인정되는 카드사가 있고 아닌 곳이 있어요.
          신한·KB는 교통비가 실적에 포함돼요. 매달 교통비로 10만원 이상 쓰는 분이라면 실적 30만원 채우기가 훨씬 쉬워지죠.
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          반대로 교통비를 제외하는 카드사라면, 교통비 10만원을 빼고 나머지 소비로만 30만원을 채워야 해요.
          발급 전에 카드사 약관의 &lsquo;실적 산정 제외 항목&rsquo;을 꼭 봐야 하고, 헷갈리면 카드사 콜센터(카드 뒷면 번호)에 전화해서 직접 물어보는 게 가장 정확해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 환급 방식이 카드사마다 다름</strong>
        <p style={{ ...body, marginTop: 8 }}>
          K-패스 환급금이 돌아오는 방식이 카드사별로 달라요.
          신한·KB는 다음 달 카드 청구서에서 자동 차감(청구 할인)이에요. 별도로 뭘 할 필요 없이 카드값이 줄어드는 방식이라 가장 편하죠.
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          농협은 캐시백으로, 하나는 하나머니 포인트로 돌아와요.
          포인트는 다시 쓸 곳을 찾아야 하니까, 현금처럼 바로 체감하고 싶으면 청구 할인 방식 카드를 고르는 게 편해요.
          삼성카드는 M포인트로 적립되는데, 삼성 계열 매장이나 온라인몰에서 바로 쓸 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>3. 카드 발급만 하면 환급이 자동으로 시작되지 않음</strong>
        <p style={{ ...body, marginTop: 8 }}>
          이 부분을 모르는 분이 정말 많아요. 카드를 발급받고 교통카드로 쓰기 시작해도, <a href="https://www.korea-pass.kr" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>k-pass.or.kr</a>에서
          회원 가입을 따로 해야 환급이 시작돼요. 회원 가입 없이 쓰면 그냥 일반 교통카드랑 똑같아요.
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          가입 시점도 중요해요. 이번 달 중순에 가입하면 이번 달 이용분은 환급 대상이 아니에요.
          가입 당월 1일부터 말일까지 15회 이상 이용해야 다음 달에 환급이 나오니까, 카드 받자마자 바로 가입하는 게 유리해요.
          <a href="/w/K-패스-가입방법" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}> 가입 절차 상세 안내</a>를 먼저 보고 진행하면 실수를 줄일 수 있어요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [전] 연회비 본전 계산 ─────────────────────────── */}
      <H2>연회비 본전, 얼마면 뽑을 수 있을까</H2>
      <p style={body}>
        &quot;연회비 내고 카드 만드는 게 손해 아닌가?&quot; 하는 분도 있죠.
        간단하게 계산해보면 바로 답이 나와요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 교통비</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>월 환급 (일반 20%)</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>연간 환급</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>본전 시점</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cost: "4만원", monthly: "8,000원", yearly: "9.6만원", breakeven: "1개월" },
              { cost: "6만원", monthly: "1.2만원", yearly: "14.4만원", breakeven: "1개월" },
              { cost: "8만원", monthly: "1.6만원", yearly: "19.2만원", breakeven: "1개월" },
              { cost: "10만원", monthly: "2만원", yearly: "24만원", breakeven: "1개월" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.cost}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: GREEN, fontWeight: 700 }}>{r.monthly}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{r.yearly}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{r.breakeven}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          연회비 8,000원(가장 비싼 삼성카드) 기준. 월 교통비 4만원만 넘어도 첫 달에 본전이에요.
        </p>
      </GreenBox>

      <p style={body}>
        청년(30%)이면 환급액이 더 커지니까 본전은 더 빨라요.
        월 교통비 8만원 기준 청년은 월 2.4만원, 연간 28.8만원이에요.
        연회비가 부담되는 게 아니라, 안 만들면 손해인 구조예요.
      </p>
      <p style={body}>
        다만 월 교통비가 3만원 이하이고 추가 할인도 쓸 일이 없다면, 연회비 0원인 <a href="/w/K-패스-체크카드-추천" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>체크카드</a>가 더 나아요.
        신용카드의 장점은 추가 할인인데, 그 혜택을 쓸 소비가 없으면 의미가 없으니까요.
      </p>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 연회비·혜택·실적 조건은 카드사 정책에 따라 변경될 수 있으니, 신청 전 해당 카드사 공식 사이트에서 최신 조건을 봐야 해요." />
    </ArticleLayout>
  );
}
