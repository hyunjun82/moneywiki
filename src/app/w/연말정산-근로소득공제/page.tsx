"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 근로소득공제가 뭔지, 내 급여에서 얼마나 빠지는지 궁금한 직장인이에요.
// Q2. 본인 총급여에 해당하는 공제율을 파악하고 공제액을 계산하는 행동.
// Q3. 5개 구간별 공제율(70%~2%), 공제 한도 2,000만원, 계산 예시, 근로소득금액 산출 과정.
// Q4. GreenBox(핵심 요약) + TaxRateTable(구간표) + Steps(계산 흐름) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_STEPS = [
  {
    title: "총급여 확인",
    desc: "연봉에서 비과세 소득(식대 20만원, 자가운전보조금 등)을 빼면 총급여예요. 보통 연봉의 95~98% 정도 돼요.",
  },
  {
    title: "구간별 공제율 적용",
    desc: "총급여를 5개 구간으로 나눠서 각 구간에 해당 공제율을 곱해요. 이걸 다 더하면 근로소득공제액이에요.",
  },
  {
    title: "총급여 - 근로소득공제 = 근로소득금액",
    desc: "총급여에서 근로소득공제를 빼면 근로소득금액이 나와요. 여기서 다시 인적공제, 신용카드 공제 등을 빼면 과세표준이 돼요.",
    tip: "근로소득공제는 자동 적용이라 별도 신청 불필요",
  },
];

const FAQS = [
  {
    q: "근로소득공제는 따로 신청해야 하나요?",
    a: "아니에요. 총급여에서 자동으로 계산돼요. 회사에서 연말정산할 때 알아서 적용해줘요. 별도 서류도 필요 없어요.",
  },
  {
    q: "급여가 높으면 불리한 건가요?",
    a: "상대적으로 그래요. 500만원 이하 구간은 70%나 공제되지만 1억원 초과 구간은 2%밖에 안 돼요. 고소득자일수록 공제 혜택이 줄어드는 누진 구조예요.",
  },
  {
    q: "공제 한도가 있나요?",
    a: "네. 근로소득공제 최대 한도는 2,000만원이에요. 총급여가 아무리 높아도 2,000만원까지만 공제돼요.",
  },
  {
    q: "총급여 5,000만원이면 공제액이 얼마예요?",
    a: "500만원 × 70% + 1,000만원 × 40% + 1,000만원 × 15% + 2,500만원 × 5% = 1,225만원이에요. 근로소득금액은 3,775만원이 돼요.",
  },
  {
    q: "근로소득공제와 근로소득세액공제는 다른 건가요?",
    a: "네, 완전히 달라요. 근로소득공제는 과세표준을 줄여주는 '소득공제'이고, 근로소득세액공제는 산출세액에서 직접 빼주는 '세액공제'예요. 둘 다 자동 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "소득세법 제47조 — 근로소득공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 — 근로소득 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6594&cntntsId=7873" },
      { label: "홈택스 연말정산 자동계산", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-과세표준", title: "연말정산 과세표준", description: "과세표준이 어떻게 나오는지 정리했어요." },
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "과세표준별 세율과 누진공제액이에요." },
  { slug: "연말정산-근로소득세액공제", title: "근로소득세액공제", description: "산출세액에서 빼주는 세액공제예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 근로소득</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로소득공제, 내 급여에서 얼마나 빠질까?<br />
        구간별 공제율과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로소득공제는 모든 직장인에게 자동 적용되는 기본 공제예요.{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제47조</a>에
        따라 총급여 500만원까지는 70%, 1억원 초과 구간은 2%로 급여가 높을수록 공제율이 낮아져요.
      </p>

      <Divider />

      <H2>구간별 공제율표</H2>
      <p style={body}>
        총급여를 5개 구간으로 쪼개서 각 구간마다 다른 공제율을 적용해요. 한꺼번에 하나의 비율을 적용하는 게 아니라 구간별로 나눠서 계산하는 거예요.
      </p>

      <SectionBadge>근로소득공제 구간표 (2025년 귀속)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>총급여 구간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>공제액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["500만원 이하", "70%", "총급여 × 70%"],
              ["500만원 초과 ~ 1,500만원 이하", "40%", "350만원 + (총급여 - 500만원) × 40%"],
              ["1,500만원 초과 ~ 4,500만원 이하", "15%", "750만원 + (총급여 - 1,500만원) × 15%"],
              ["4,500만원 초과 ~ 1억원 이하", "5%", "1,200만원 + (총급여 - 4,500만원) × 5%"],
              ["1억원 초과", "2%", "1,475만원 + (총급여 - 1억원) × 2%"],
            ].map(([range, rate, formula], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", fontSize: 13 }}>{formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="계산 예시 — 총급여 5,000만원">
        500만원 × 70% = 350만원<br />
        1,000만원 × 40% = 400만원<br />
        3,000만원 × 15% = 450만원<br />
        500만원 × 5% = 25만원<br />
        <strong>합계: 1,225만원 공제</strong> → 근로소득금액 3,775만원
      </GreenBox>

      <Divider />

      <H2>계산 흐름 3단계</H2>
      <p style={body}>
        근로소득공제가 연말정산 전체 과정에서 어디에 위치하는지 알면 이해가 쉬워요.{" "}
        <a href="/w/연말정산-과세표준" style={{ color: "#1D9E75", textDecoration: "underline" }}>과세표준</a>이 나오기 전 가장 먼저 적용되는 공제예요.
      </p>

      <Steps steps={CALC_STEPS} />

      <BorderBox>
        근로소득공제를 빼고 나면 '근로소득금액'이 돼요. 여기서 인적공제, 신용카드 공제, 연금저축 공제 등 다른 소득공제를 추가로 빼면{" "}
        <a href="/w/연말정산-과세표준" style={{ color: "#1D9E75", textDecoration: "underline" }}>과세표준</a>이 나와요.
        과세표준에{" "}
        <a href="/w/연말정산-세율표" style={{ color: "#1D9E75", textDecoration: "underline" }}>세율</a>을 곱하면 산출세액이 나오고요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성됐어요. 공제율은 법 개정 시 변경될 수 있으니 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
