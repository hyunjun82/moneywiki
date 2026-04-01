"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 청년월세지원 신청 전에 내 소득이 중위소득 60% 이하인지 확인하고 싶은데, 중위소득이 뭔지도 모르고 어떻게 비교하는지도 모르는 상황
// Q2. 가구원 수별 중위소득 60% 금액 확인 → 건강보험료로 내 소득 역추산 → "내가 기준 이하다" 판단 → 신청 진행
// Q2-1. 국민건강보험 앱 또는 복지로 자가진단 페이지
// Q3. 2026년 1인 중위소득 60% 약 134만원(세전) / 건강보험료 역추산 방법 / 원가구(부모) 100% 별도 확인 필요 / 근로소득 외 금융·임대소득도 포함
// Q4. GreenBox(가구원 수별 중위소득 표) + 중위소득 설명 텍스트 + BorderBox(건강보험료 확인법 상세) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const FAQS = [
  { q: "소득이 없어도 중위소득 기준에서 걸릴 수 있나요?", a: "소득이 0원이면 소득 기준은 당연히 충족해요. 하지만 자산 기준은 별개예요. 소득이 없어도 예적금·부동산·자동차 합산이 1.22억을 넘으면 자산 기준에서 탈락해요. 소득과 자산은 별도로 심사하기 때문에 둘 다 챙겨야 해요." },
  { q: "소득 기준은 세전인가요 세후인가요?", a: "세전(총소득) 기준이에요. 월급 실수령액이 아니라 세전 급여로 따져요. 4대보험 떼기 전 금액이 기준이에요. 근로소득 외에 금융소득(이자·배당), 임대소득, 사업소득 등도 포함될 수 있어서 월급만 봐서는 정확하지 않을 수 있어요." },
  { q: "건강보험료로 소득을 확인한다고 하는데, 어디서 조회하나요?", a: "국민건강보험공단 앱 또는 홈페이지(nhis.or.kr)에서 건강보험료 납부확인서를 발급받을 수 있어요. 직장인은 &lsquo;직장가입자 보험료&rsquo;, 자영업자·프리랜서는 &lsquo;지역가입자 보험료&rsquo;를 확인해요. 무료로 발급되고, 앱에서 바로 PDF로 저장할 수 있어요." },
  { q: "부모가 자영업자이면 원가구 소득 확인을 어떻게 하나요?", a: "부모가 지역가입자이면 부모 명의 건강보험료 납부확인서로 확인해요. 건강보험공단에서 발급받거나 부모가 직접 발급해서 줘야 해요. 자영업자는 보험료 부과 체계가 복잡하기 때문에, 정확한 판단이 어려우면 마이홈포털 자가진단이나 행정복지센터 상담이 가장 확실해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "보건복지부: 2026년 기준 중위소득 고시", url: "https://www.mohw.go.kr" },
    { label: "복지로 신청", url: "https://www.bokjiro.go.kr" },
    { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건", title: "청년월세지원 자격조건 상세", description: "소득 외 주거·자산 조건도 확인해요." },
  { slug: "청년월세지원", title: "청년월세지원 전체 안내", description: "지원 금액·기간·신청 방법 전체 개요예요." },
  { slug: "청년월세지원-신청방법", title: "복지로 신청 방법", description: "서류 준비부터 온라인 신청 절차예요." },
];

const GREEN = "#1D9E75";

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
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={청년월세지원_SIDEBAR} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-소득기준" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 월세 · 소득 기준
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 소득기준<br />
        중위소득 60%가 얼마인지 내 소득으로 확인
      </h1>

      {/* ── [기] 도입 ───────────────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;중위소득 60% 이하&quot;라는 기준을 보고 &quot;그게 얼마야?&quot; 싶었죠.
        중위소득이란 전체 가구를 소득 순으로 나열했을 때 정확히 중간에 있는 가구의 소득이에요.
        정부가 매년 고시하고, 복지 지원의 기준선으로 써요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원에서는 두 가지 소득을 봐요.
        첫째, <strong>청년 본인(청년가구) 소득이 중위소득 60% 이하</strong>인지.
        둘째, <strong>부모(원가구) 소득이 중위소득 100% 이하</strong>인지.
        둘 다 충족해야 자격이 돼요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아래 표에서 내 가구원 수에 맞는 금액을 찾고, 건강보험료로 내 소득을 확인하는 방법까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 소득 기준 표 ──────────────────────────── */}
      <H2>2026년 가구원 수별 소득 기준</H2>
      <p style={body}>
        청년가구(본인 + 배우자 등)는 60% 열을, 원가구(부모)는 100% 열을 봐요.
        대부분의 미혼 청년은 1인 가구에 해당하고, 기준 금액은 월 약 134만원(세전)이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>가구원 수</th>
              <th style={{ textAlign: "right", padding: "6px 8px" }}>기준 중위소득</th>
              <th style={{ textAlign: "right", padding: "6px 8px", color: GREEN }}>60% (청년가구)</th>
              <th style={{ textAlign: "right", padding: "6px 8px" }}>100% (원가구)</th>
            </tr>
          </thead>
          <tbody>
            {INCOME_TABLE.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.members}</td>
                <td style={{ textAlign: "right", padding: "6px 8px", fontSize: 12 }}>{fmt(r.base)}</td>
                <td style={{ textAlign: "right", padding: "6px 8px", color: GREEN, fontWeight: 700 }}>{fmt(r.pct60)}</td>
                <td style={{ textAlign: "right", padding: "6px 8px" }}>{fmt(r.pct100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          2026년 보건복지부 고시 기준 / 세전 소득 / 금융·임대소득 포함
        </p>
      </GreenBox>

      <p style={body}>
        예를 들어 혼자 사는 청년(1인 가구)이고 세전 월급이 130만원이면 60%(약 134만원) 이하라 충족돼요.
        반면 세전 150만원이면 기준을 넘어서 소득 조건에서 빠져요.
        아르바이트나 인턴 수준의 소득이면 대부분 통과하고, 정규직 초봉(세전 200만원 이상)이면 대부분 초과해요.
      </p>
      <p style={body}>
        원가구(부모)는 가구원 수가 보통 3~4인이에요.
        4인 가구 기준 중위소득 100%가 약 610만원이니까, 부모 합산 소득이 610만원 이하여야 해요.
        부모님 월급이 각각 300만원씩이면 합산 600만원으로 간신히 통과하는 수준이에요.
      </p>

      <Divider />

      {/* ── [전] 건강보험료로 확인 ──────────────────────── */}
      <H2>내 소득 건강보험료로 확인하는 법</H2>
      <p style={body}>
        소득을 정확하게 계산하기 어려우면 건강보험료로 역추산하는 게 가장 편해요.
        건강보험료는 소득에 비례해서 부과되기 때문에, 보험료 금액을 보면 대략적인 소득 수준을 알 수 있어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>조회 방법</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          국민건강보험공단 앱(The건강보험) 또는 홈페이지(nhis.or.kr)에서 건강보험료 납부확인서를 발급받아요.
          무료이고, 앱에서 바로 PDF로 저장할 수 있어요.
          직장인은 &lsquo;직장가입자 보험료&rsquo;, 자영업자·프리랜서는 &lsquo;지역가입자 보험료&rsquo;를 봐야 해요.
        </p>

        <strong style={{ color: GREEN }}>직장인 기준 대략적 판단</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          직장가입자 본인 부담 보험료가 월 약 4.7만원 이하면 세전 월소득 약 134만원 수준이에요.
          보험료가 이보다 낮으면 중위소득 60% 이하일 가능성이 높아요.
          다만 이 금액은 근로소득만 반영하기 때문에 금융소득(이자·배당)이 별도로 있으면 정확하지 않을 수 있어요.
        </p>

        <strong style={{ color: GREEN }}>자영업자·프리랜서 기준</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 14 }}>
          지역가입자 보험료는 소득 외에 재산·자동차도 반영해서 부과돼요.
          그래서 보험료만으로 소득을 역추산하기가 직장인보다 어려워요.
          정확한 판단이 필요하면 마이홈포털(myhome.go.kr) 자가진단이나 행정복지센터 상담을 받는 게 가장 확실해요.
        </p>

        <strong style={{ color: GREEN }}>부모(원가구) 소득 확인</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          부모 건강보험료도 같은 방식으로 확인해요.
          부모가 직접 건강보험공단에서 납부확인서를 발급받아야 하는데, 부모에게 미리 부탁해두는 게 좋아요.
          부모 소득을 모르겠으면 부모 건강보험료 금액만 알아도 대략적인 판단이 가능해요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 보건복지부 기준 중위소득 고시 기준으로 작성됐어요. 매년 기준 금액이 바뀌니 신청 전 복지로 공고문을 봐야 해요." />
    </ArticleLayout>
  );
}
