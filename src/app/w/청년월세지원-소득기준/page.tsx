"use client";

// Q1. 청년월세지원 신청 전에 내 소득이 중위소득 60% 이하인지 확인하려는 상황
// Q2. 가구원 수별 중위소득 60% 금액 확인 → 내 소득과 비교 → 해당 여부 판단
// Q3. 2026년 1인 중위소득 60% 약 134만원 / 건강보험료로 확인 / 원가구 100% 별도 확인
// Q4. GreenBox(가구원 수별 중위소득 표) + BorderBox(건강보험료 확인법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR } from "@/data/청년월세지원-guide";

const FAQS = [
  {
    q: "소득이 없어도 중위소득 기준에서 걸릴 수 있나요?",
    a: "소득이 없으면 보통 기준을 충족해요. 단, 금융자산이나 부동산이 있으면 자산 기준에서 걸릴 수 있어요. 소득은 0원이어도 자산이 1.22억을 넘으면 탈락해요.",
  },
  {
    q: "소득 기준은 세전인가요 세후인가요?",
    a: "세전(총소득) 기준이에요. 월급 실수령액이 아니라 세전 급여로 따져요. 근로소득 외에 금융소득, 임대소득 등도 포함될 수 있어요.",
  },
  {
    q: "건강보험료로 소득을 확인한다고 하는데, 어디서 조회하나요?",
    a: "국민건강보험공단 앱 또는 홈페이지(nhis.or.kr)에서 건강보험료 납부확인서를 출력할 수 있어요. 직장인은 직장가입자 보험료, 자영업자는 지역가입자 보험료를 확인해요.",
  },
  {
    q: "부모가 자영업자이면 원가구 소득 확인을 어떻게 하나요?",
    a: "부모가 지역가입자이면 부모 명의 건강보험료 납부확인서로 확인해요. 국민건강보험공단에서 발급받거나, 부모가 직접 발급해서 제출해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 2026년 기준 중위소득 고시", url: "https://www.mohw.go.kr" },
      { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건 상세", description: "소득 외 주거·자산 조건도 확인해요." },
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 금액·기간·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법", description: "서류 준비부터 온라인 신청 절차예요." },
];

const GREEN = "#1D9E75";

// 2026년 기준 중위소득 (보건복지부 고시 기준, 원)
const INCOME_TABLE = [
  { members: "1인", base: 2228445, pct60: 1337067, pct100: 2228445 },
  { members: "2인", base: 3682609, pct60: 2209565, pct100: 3682609 },
  { members: "3인", base: 4714657, pct60: 2828794, pct100: 4714657 },
  { members: "4인", base: 6097773, pct60: 3658664, pct100: 6097773 },
  { members: "5인", base: 7108192, pct60: 4264915, pct100: 7108192 },
];

function fmt(n: number) {
  return Math.round(n / 10000) + "만원";
}

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} currentSlug="청년월세지원-소득기준" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 소득 기준
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 소득기준<br />
        중위소득 60% 금액 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원 소득 기준은 청년가구 중위소득 60% 이하예요.
        2026년 기준 1인 가구는 월 약 134만원 이하면 해당돼요.
        원가구(부모) 소득도 중위소득 100% 이하여야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 가구원 수별 소득 기준</H2>
      <p style={body}>
        청년가구(본인 + 배우자 등)와 원가구(부모)를 구분해서 각각 확인해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>가구원 수</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>기준 중위소득</th>
              <th style={{ textAlign: "right", padding: "5px 8px", color: GREEN }}>60% (청년가구 기준)</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>100% (원가구 기준)</th>
            </tr>
          </thead>
          <tbody>
            {INCOME_TABLE.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.members}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{fmt(r.base)}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: GREEN, fontWeight: 700 }}>{fmt(r.pct60)}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{fmt(r.pct100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          ★ 2026년 보건복지부 고시 기준 / 세전 소득 기준 / 금융·임대소득 포함
        </p>
      </GreenBox>

      <H2>내 소득 확인 방법</H2>
      <p style={body}>
        소득은 직접 계산하기 어려워서 건강보험료로 확인하는 게 편해요.
      </p>

      <BorderBox>
        <strong>건강보험료로 소득 확인하는 법</strong><br />
        1. 국민건강보험공단 앱 또는 nhis.or.kr 접속<br />
        2. 건강보험료 납부확인서 발급 (최근 월 기준)<br />
        3. 납부확인서의 보험료 금액으로 소득 구간 추정<br />
        <br />
        <strong>직장인 (직장가입자)</strong><br />
        월 보험료 약 5.5만원 이하 → 중위소득 60% 수준 해당 가능성 높음<br />
        <br />
        <strong>자영업자 (지역가입자)</strong><br />
        부과 체계가 달라 보험료로 단순 비교 어려움 → 복지로 자가진단 활용 권장<br />
        <br />
        ★ 정확한 기준 금액은 복지로 자가진단 또는 담당 기관에 문의
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 보건복지부 기준 중위소득 고시 기준으로 작성됐어요. 매년 기준 금액이 바뀌니 신청 전 복지로 공고문을 확인하세요." />
    </ArticleLayout>
  );
}
