"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴직 후 실업급여를 받을 예정인데, 내 연봉 기준으로 하루에 얼마나 받을 수 있는지 궁금한 상황
// Q2. 연봉 구간별 1일 구직급여를 확인하고, 상한·하한액 적용 여부를 판단해서 총 수령액을 예상한다
// Q3. 1일 구직급여 계산 공식(평균임금 60%), 상한액(66,000원대), 하한액(최저임금 80%), 소정급여일수(나이+가입기간별), 연봉별 예시
// Q4. 연봉별 비교표 + Calculator(슬라이더) + GreenBox(공식 요약) + Steps(확인 절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "salary", label: "연봉 (만원)", min: 2000, max: 10000, step: 100, defaultValue: 4000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "months", label: "고용보험 가입기간 (개월)", min: 12, max: 240, step: 6, defaultValue: 36, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (i: Record<string, number>) => Math.round((i.salary * 10000) / 12 / 30.4),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "1일 구직급여 (60%)",
    getValue: (i: Record<string, number>) => {
      const daily = Math.round((i.salary * 10000) / 12 / 30.4);
      const base = Math.round(daily * 0.6);
      const upper = 66000;
      const lower = 63104;
      return Math.max(lower, Math.min(upper, base));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "소정급여일수",
    getValue: (i: Record<string, number>) => {
      const m = i.months;
      if (m < 36) return 120;
      if (m < 60) return 150;
      if (m < 120) return 180;
      return 210;
    },
    format: (v: number) => `${v}일`,
  },
  {
    label: "예상 총 수령액",
    getValue: (i: Record<string, number>) => {
      const daily = Math.round((i.salary * 10000) / 12 / 30.4);
      const base = Math.round(daily * 0.6);
      const upper = 66000;
      const lower = 63104;
      const adjusted = Math.max(lower, Math.min(upper, base));
      const m = i.months;
      let days = 120;
      if (m >= 120) days = 210;
      else if (m >= 60) days = 180;
      else if (m >= 36) days = 150;
      return adjusted * days;
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
];

const STEPS = [
  {
    title: "퇴직 전 3개월 급여 합계를 구하세요",
    desc: "기본급뿐 아니라 상여금, 수당, 식대 등 정기적으로 받은 금액을 전부 더해야 해요. 급여명세서 3장을 꺼내서 '세전 총액'을 합산하면 돼요.",
    tip: "비과세 항목(식대 20만원 등)도 평균임금에 포함돼요",
  },
  {
    title: "총 일수로 나눠서 1일 평균임금을 계산하세요",
    desc: "3개월 급여 합계를 그 기간의 총 일수(보통 91일 전후)로 나누면 1일 평균임금이에요. 월급 300만원이면 1일 약 9만 9천원 정도예요.",
  },
  {
    title: "60%를 곱하고 상한·하한을 확인하세요",
    desc: "1일 평균임금에 0.6을 곱한 금액이 구직급여예요. 2026년 기준 상한액 66,000원, 하한액 약 63,104원이에요. 범위를 벗어나면 상한 또는 하한으로 조정돼요.",
    tip: "연봉 약 4,000만원부터 상한액에 걸려요",
  },
  {
    title: "소정급여일수를 곱하면 총 수령액이에요",
    desc: "만 50세 미만 기준 가입 1~3년 120일, 3~5년 150일, 5~10년 180일, 10년 이상 210일이에요. 만 50세 이상이면 최대 270일까지 늘어나요.",
    link: { label: "고용24 상세 기준", href: "https://www.ei.go.kr" },
  },
];

const FAQS = [
  { q: "연봉 5천만원과 8천만원이 같은 실업급여를 받나요?", a: "거의 같아요. 둘 다 상한액(1일 66,000원)에 걸리기 때문에 1일 구직급여가 동일해요. 연봉 약 4,000만원 이상은 상한 때문에 금액 차이가 없어요." },
  { q: "상여금이나 수당도 평균임금 계산에 들어가나요?", a: "네, 퇴직 전 3개월간 받은 급여 전체가 포함돼요. 기본급, 상여금, 식대, 직무수당 등 정기적으로 받은 금액은 다 넣어야 해요." },
  { q: "연봉이 낮아도 최소한 받는 금액이 있나요?", a: "하한액이 보장돼요. 2026년 최저임금 80% 기준으로 1일 약 63,104원이에요. 계산 결과가 이보다 낮으면 하한액으로 지급돼요." },
  { q: "소정급여일수가 나이에 따라 달라지나요?", a: "네, 만 50세 이상이거나 장애인이면 같은 가입기간이라도 급여일수가 30~60일 더 길어요. 만 50세 미만 10년 이상 가입 시 210일인데, 50세 이상은 같은 조건에서 270일까지 받을 수 있어요." },
  { q: "실업급여 받는 중에 취업하면 나머지는 못 받나요?", a: "남은 급여일수의 절반 이상이 남았을 때 재취업하면 조기재취업수당을 받을 수 있어요. 남은 금액의 50%를 한 번에 지급해 줘요." },
  { q: "자발적 퇴사여도 실업급여를 받을 수 있나요?", a: "정당한 사유가 있으면 가능해요. 임금체불, 직장 내 괴롭힘, 통근 불가능한 전근 등 고용노동부가 인정하는 사유에 해당하면 자발적 퇴사도 수급 자격이 생겨요." },
];

const SOURCES = [
  { name: "고용보험법 제45조", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
];

const RELATED = [
  { slug: "실업급여-수급조건", title: "실업급여 수급조건", description: "받을 수 있는지 자격 요건 확인." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "온라인 신청 절차와 준비 서류." },
  { slug: "실업급여-상한액", title: "2026 실업급여 상한액", description: "올해 상한·하한액 기준 확인." },
];

function CalcWidget() {
  const [values, setValues] = useState<Record<string, number>>({
    salary: 4000,
    months: 36,
  });
  return (
    <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#111" }}>내 실업급여 예상 계산기</p>
      {CALC_SLIDERS.map((s) => (
        <div key={s.id} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, color: "#374151" }}>
            <span>{s.label}</span><span style={{ fontWeight: 600 }}>{s.format(values[s.id])}</span>
          </div>
          <input type="range" min={s.min} max={s.max} step={s.step} value={values[s.id]}
            onChange={(e) => setValues({ ...values, [s.id]: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "#1D9E75" }} />
        </div>
      ))}
      <div style={{ borderTop: "1px solid #d1fae5", paddingTop: 14 }}>
        {CALC_RESULTS.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, fontWeight: r.highlight ? 700 : 400, color: r.highlight ? "#1D9E75" : "#374151" }}>
            <span>{r.label}</span><span>{r.format(r.getValue(values))}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>만 50세 미만 기준 근사치예요. 정확한 금액은 고용24에서 확인하세요.</p>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 구직급여 · 연봉별 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여, 내 연봉이면 얼마 받을까?<br />
        상한·하한액과 계산 공식
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "연봉 4천만원인데 하루에 얼마 받아요? 상한액이 있다던데?"
      </p>
      <p style={body}>
        퇴직 전 3개월 평균임금의 <strong>60%</strong>가 1일 구직급여예요.
        2026년 기준 상한액 <strong>66,000원</strong>, 하한액 약 <strong>63,104원</strong>이라 연봉 약 4,000만원부터 상한에 걸려요.
        아래 계산기로 내 예상 금액을 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 연봉이면 실업급여 얼마 받나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제45조</a>에 따라 1일 구직급여 = 퇴직 전 3개월 평균임금 x 60%예요.
        연봉을 입력하면 바로 계산할 수 있어요.
      </p>
      <CalcWidget />

      <CategoryButton label="실업급여 정보" count={8} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연봉 구간별 예상 금액은 얼마인가요?</H2>
      <p style={body}>
        연봉 3천만원부터 6천만원까지 구간별로 정리했어요. 상한·하한이 어디서 걸리는지 한눈에 볼 수 있어요.
      </p>

      <SectionBadge>2026년 기준 연봉별 1일 구직급여</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연봉</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>1일 평균임금</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>60% 계산</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>적용 금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2,400만원", "65,789원", "39,474원", "하한액 63,104원"],
              ["3,000만원", "82,237원", "49,342원", "하한액 63,104원"],
              ["3,600만원", "98,684원", "59,211원", "하한액 63,104원"],
              ["4,000만원", "109,649원", "65,789원", "65,789원"],
              ["4,500만원", "123,355원", "74,013원", "상한액 66,000원"],
              ["6,000만원", "164,474원", "98,684원", "상한액 66,000원"],
            ].map(([연봉, 평균, 계산, 적용], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{연봉}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{평균}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{계산}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{적용}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        연봉 4,000만원 정도까지는 하한액이 적용돼서 비슷한 금액을 받아요.{"\n"}
        연봉 4,500만원 이상은 상한액에 걸려서 1일 66,000원 이상은 못 받아요.{"\n"}
        결국 연봉 4,000~4,500만원 구간만 본인 계산 그대로 적용되는 셈이에요.
      </GreenBox>

      <Divider />

      <H2>계산 공식을 단계별로 따라가 보세요</H2>
      <p style={body}>
        복잡해 보이지만 4단계면 끝이에요. 급여명세서 3장만 있으면 직접 계산할 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>가입기간에 따라 총액이 크게 달라지나요?</H2>
      <p style={body}>
        1일 금액이 같아도 <strong>소정급여일수</strong>가 다르면 총 수령액이 2배 이상 차이나요.
        만 50세 미만 기준으로 가입기간별 일수를 정리했어요.
      </p>

      <SectionBadge>소정급여일수 (만 50세 미만)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가입기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>급여일수</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상한 적용 시 총액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년~3년 미만", "120일", "792만원"],
              ["3년~5년 미만", "150일", "990만원"],
              ["5년~10년 미만", "180일", "1,188만원"],
              ["10년 이상", "210일", "1,386만원"],
            ].map(([기간, 일수, 총액], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{기간}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{일수}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{총액}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        만 50세 이상이거나 장애인이면 급여일수가 더 길어요. 같은 10년 이상 가입이라도 최대 270일까지 받을 수 있어서 상한 기준 1,782만원이 돼요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 고용보험법을 바탕으로 작성했어요. 개인별 급여 구성이나 나이에 따라 실제 금액은 달라질 수 있으니 고용24에서 정확한 금액을 확인하세요." />
    </ArticleLayout>
  );
}
