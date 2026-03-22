"use client";

// Q1. 청년월세지원 소득 기준이 '중위소득 60%'라는데, 그게 정확히 얼마인지, 내 소득으로 되는지 계산하고 싶은 상황
// Q2. 가구원수별 중위소득 60% 금액을 확인하고, 내 소득인정액과 비교해서 기준 충족 여부를 판단한다
// Q3. 중위소득 개념, 2026년 가구원수별 60% 금액, 소득인정액 계산법(근로+사업+재산환산), 건보료 역산법
// Q4. GreenBox(가구원수별 기준표) + BorderBox(소득인정액 계산 공식) + Steps(확인 절차) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body, SectionBadge,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const CHECK_STEPS = [
  { title: "건강보험료 확인", desc: "국민건강보험공단 홈페이지나 앱에서 본인 건강보험료 납부액을 확인해요. 직장가입자는 급여명세서에도 나와요. 이 금액으로 소득인정액을 역산할 수 있어요." },
  { title: "소득인정액 산출", desc: "근로소득, 사업소득, 재산의 소득환산액을 합산해요. 근로소득은 세전 월급이고, 재산은 재산 금액에서 기본재산액을 빼고 소득환산율을 곱해서 계산해요." },
  { title: "기준표와 비교", desc: "산출한 소득인정액을 가구원수별 중위소득 60% 기준과 비교해요. 기준 이하면 소득 조건 충족이에요. 원가구(부모) 소득도 별도로 중위소득 100%와 비교해야 해요." },
];

const FAQS = [
  { q: "아르바이트 소득만 있으면 거의 통과되나요?", a: "1인 가구 기준 세전 월 124만원 이하면 돼요. 주 40시간 미만 아르바이트라면 대부분 충족하죠. 다만 아르바이트를 여러 개 하고 있으면 합산해야 해요." },
  { q: "소득이 아예 없으면 어떻게 되나요?", a: "소득이 0원이어도 신청할 수 있어요. 소득 기준은 상한선이지 하한선이 아니거든요. 다만 재산 기준과 원가구(부모) 소득 기준은 별도로 충족해야 해요." },
  { q: "직전 달 소득이 일시적으로 높았는데 괜찮을까요?", a: "소득은 월 단위가 아니라 연간 소득을 12로 나눈 평균으로 봐요. 한 달 잔업이 많아서 소득이 높았다고 바로 탈락하지는 않아요. 연 환산 기준으로 판단하면 돼요." },
  { q: "프리랜서 소득은 어떻게 잡히나요?", a: "사업소득으로 잡혀요. 종합소득세 신고 기준 연 소득을 12로 나눈 금액이 소득인정액에 반영돼요. 프리랜서라면 직전 연도 종합소득세 신고 내역을 기준으로 봐요." },
  { q: "건강보험료로 소득을 역산한다는 게 무슨 뜻이에요?", a: "건강보험료는 소득에 비례해서 매겨지기 때문에, 보험료를 보면 소득 수준을 대략 알 수 있어요. 복지로나 마이홈포털 자가진단에서 건보료 입력으로 소득 기준 충족 여부를 간편하게 확인할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "2026년 기준 중위소득 고시 (보건복지부)", url: "https://www.mohw.go.kr" },
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 전체 정리", description: "소득 외에 나이, 재산, 주거 조건까지 한번에 봐요." },
  { slug: "청년월세지원-부모님-소득-합산-분리", title: "부모 소득 합산 기준", description: "원가구 소득은 어떻게 계산하고 면제받는 경우는 뭔지 정리했어요." },
  { slug: "청년월세지원-복지로-신청방법-서류", title: "복지로 신청 방법", description: "소득 기준 확인 후 바로 신청하는 절차를 안내했어요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-소득기준-중위소득60-계산" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 소득 기준
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 소득 기준<br />
        중위소득 60% 어떻게 계산할까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원 조건을 보면 &quot;중위소득 60% 이하&quot;라고 돼 있는데, 그게 정확히 얼마인지 감이 안 잡히죠.
        내 월급이 기준에 맞는 건지, 아르바이트 소득만 있으면 되는 건지 헷갈리고요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중위소득이란 전체 가구를 소득 순으로 줄 세웠을 때 정확히 가운데에 있는 가구의 소득이에요.
        그 60%가 청년월세지원 기준이고, 1인 가구면 세전 월 약 124만원이에요. 아래에서 가구원수별 기준과 계산법을 정리해줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가구원수별 중위소득 60% 기준</H2>
      <p style={body}>
        청년월세지원은 청년 본인 가구의 소득인정액을 기준으로 봐요. 혼자 사는 1인 가구가 가장 많지만,
        배우자가 있거나 자녀가 있으면 가구원수가 달라져서 기준 금액도 올라가요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>가구원수</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>중위소득 100%</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>60% (청년월세 기준)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: "1인", full: "약 207만원", pct: "약 124만원" },
              { n: "2인", full: "약 345만원", pct: "약 206만원" },
              { n: "3인", full: "약 443만원", pct: "약 264만원" },
              { n: "4인", full: "약 540만원", pct: "약 324만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.n}</td>
                <td style={{ padding: "5px 8px" }}>{r.full}</td>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? GREEN : "#333" }}>{r.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          2026년 보건복지부 고시 기준 / 소득인정액 기준 (세전)
        </p>
      </GreenBox>

      <p style={body}>
        대부분의 청년 신청자는 1인 가구예요. 세전 월급이 124만원 이하면 소득 조건을 충족하는 거예요.
        주 20시간 아르바이트를 하고 있다면 거의 해당되죠. 정규직으로 최저임금 이상 받고 있으면 기준을 넘길 수 있어요.
      </p>

      <Divider />

      <H2>소득인정액 계산 방법</H2>
      <p style={body}>
        소득인정액은 단순히 월급만 보는 게 아니에요. 근로소득, 사업소득에 재산의 소득환산액까지 합산한 금액이에요.
        이게 중위소득 60% 이하면 조건 충족이에요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>소득인정액 공식</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 4 }}>
          소득인정액 = 소득평가액 + 재산의 소득환산액
        </p>
        <p style={{ ...body, marginBottom: 4 }}>
          소득평가액 = 근로소득(세전) + 사업소득 + 재산소득 + 이전소득 - 가구특성별 지출비용
        </p>
        <p style={{ ...body, marginBottom: 0 }}>
          재산의 소득환산액 = (재산 - 기본재산액 - 부채) x 소득환산율
        </p>
      </BorderBox>

      <p style={body}>
        복잡해 보이지만, 실제로는 건강보험료로 간편하게 확인할 수 있어요.
        건강보험료는 소득에 비례해서 매겨지기 때문에, 보험료 금액만 알면 소득 수준을 역산할 수 있거든요.
      </p>
      <p style={body}>
        직접 계산이 어렵다면 복지로나 <a href="https://www.myhome.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>마이홈포털</a> 자가진단 메뉴에서 건보료를 입력하면 바로 확인할 수 있어요.
      </p>

      <Divider />

      <H2>소득 확인하는 3단계</H2>
      <p style={body}>
        내 소득이 기준에 맞는지 직접 확인하는 순서예요.
      </p>

      <Steps steps={CHECK_STEPS} />

      <p style={body}>
        원가구(부모) 소득도 별도로 중위소득 100%와 비교해야 해요.
        부모 소득 합산 기준이 궁금하다면 <Link href="/w/청년월세지원-부모님-소득-합산-분리" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>부모 소득 합산 기준 페이지</Link>에서 자세히 확인할 수 있어요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 보건복지부 기준 중위소득 고시를 바탕으로 작성됐어요. 정확한 소득인정액 산정은 복지로 자가진단을 이용하면 돼요." />
    </ArticleLayout>
  );
}
