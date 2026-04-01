"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 첫 취업하거나 이직한 직장인이 월급에서 빠지는 4대보험료가 정확히 얼마인지 궁금한 상황
// Q2. 2026년 기준 보험료율을 확인하고 내 월급에서 빠지는 금액을 계산한다
// Q3. 보험별 요율(국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%), 국민연금 인상 일정, 파트타임 가입 기준
// Q4. 보험료율 비교표 + Calculator(월급 입력→공제액) + GreenBox(핵심 요약) + BorderBox(파트타임) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "산재보험료는 내 월급에서 빠지나요?",
    a: "아니요. 산재보험은 사업주가 전액 부담해요. 근로자 본인 부담분은 0원이에요. 급여명세서에도 산재보험 항목은 안 나와요.",
  },
  {
    q: "국민연금 9.5%는 전부 내가 내는 건가요?",
    a: "아니요. 9.5%를 회사와 반반 나눠요. 내 월급에서 빠지는 건 4.75%예요. 300만원 기준이면 142,500원이 본인 부담이에요.",
  },
  {
    q: "아르바이트도 4대보험 가입해야 하나요?",
    a: "월 60시간 이상 일하면 4대보험 전부 가입 대상이에요. 주 15시간 이상이면 고용보험·국민연금 가입 의무가 생기고요.",
  },
  {
    q: "2033년에 국민연금이 13%가 된다는데 진짜예요?",
    a: "네, 연금개혁안에 따라 매년 0.5%p씩 올라서 2033년에 13%가 돼요. 본인 부담은 6.5%가 되는 거예요. 월급 300만원 기준 195,000원이 빠지게 되죠.",
  },
  {
    q: "건강보험 피부양자는 보험료를 안 내나요?",
    a: "맞아요. 직장가입자의 피부양자(배우자, 부모, 자녀 등)는 보험료 부담이 없어요. 소득이나 재산이 일정 기준 이상이면 피부양자에서 탈락해요.",
  },
  {
    q: "고용보험은 실업급여 받을 때만 쓰이나요?",
    a: "아니요. 육아휴직 급여, 출산전후 휴가 급여, 직업훈련비 지원도 고용보험에서 나와요. 꽤 넓은 범위의 혜택이 있죠.",
  },
],

SOURCES = [
  { name: "4대사회보험 정보연계센터", href: "https://www.4insure.or.kr" },
  { name: "국민연금공단", href: "https://www.nps.or.kr" },
  { name: "국민건강보험공단", href: "https://www.nhis.or.kr" },
];

const RELATED = [
  { slug: "4대보험-공제액-계산", title: "4대보험 공제액 계산", description: "월급별 공제액 상세 계산법." },
  { slug: "4대보험-가입-확인-방법", title: "4대보험 가입 확인 방법", description: "내 가입 이력 조회하는 법." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령", description: "감액률과 손익분기점 비교." },
];

function MiniCalc() {
  const [salary, setSalary] = useState(3000000);
  const nps = Math.round(salary * 0.0475);
  const health = Math.round(salary * 0.03595);
  const longterm = Math.round(salary * 0.03595 * 0.1314);
  const employ = Math.round(salary * 0.009);
  const total = nps + health + longterm + employ;
  const fmt = (n: number) => n.toLocaleString() + "원";

  return (
    <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "20px 18px", marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#0F6E56", marginBottom: 14 }}>내 월급 4대보험 공제액 계산</p>
      <label style={{ fontSize: 13, color: "#374151", display: "block", marginBottom: 6 }}>월급 (세전)</label>
      <input
        type="range" min={2000000} max={10000000} step={100000} value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#1D9E75" }}
      />
      <p style={{ fontSize: 20, fontWeight: 700, color: "#1D9E75", textAlign: "center", margin: "8px 0" }}>
        {(salary / 10000).toFixed(0)}만원
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        {[
          ["국민연금 (4.75%)", nps],
          ["건강보험 (3.595%)", health],
          ["장기요양 (건보×13.14%)", longterm],
          ["고용보험 (0.9%)", employ],
        ].map(([label, val], i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "10px 12px" }}>
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label as string}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{fmt(val as number)}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#1D9E75", borderRadius: 8, padding: "12px 16px", marginTop: 12, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#fff", opacity: 0.85, marginBottom: 2 }}>본인 부담 합계</p>
        <p style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{fmt(total)}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>4대보험 · 보험료율 · 공제액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        4대보험, 내 월급에서 얼마나 빠지나요?<br />
        2026년 보험료율과 공제액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "급여명세서 보니까 보험료가 30만원 가까이 빠졌는데, 이게 맞는 거예요?"
      </p>
      <p style={body}>
        2026년 기준 직장인은 월급의 약 <strong>9.7%</strong>가 4대보험료로 빠져요.
        300만원 받으면 약 29만원이 공제되는 셈이에요.
        올해 가장 큰 변화는 <strong>국민연금이 9%에서 9.5%로 인상</strong>된 거예요.
        매년 0.5%p씩 올라서 2033년엔 13%까지 가요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 4대보험료율, 한눈에 보기</H2>
      <p style={body}>
        <a href="https://www.4insure.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대사회보험 정보연계센터</a> 기준이에요.
        근로자 본인이 부담하는 비율만 정리했어요. 사업주 부담분은 별도고, 내 월급에서 직접 빠지지 않아요.
      </p>

      <SectionBadge>보험별 요율 (근로자 부담분)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보험</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>본인 부담</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>300만원 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["국민연금", "4.75%", "142,500원"],
              ["건강보험", "3.595%", "107,850원"],
              ["장기요양보험", "건보의 13.14%", "약 14,200원"],
              ["고용보험", "0.9%", "27,000원"],
              ["합계", "약 9.7%", "약 291,500원"],
            ].map(([name, rate, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i === 4 ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "#f9fafb", fontWeight: i === 4 ? 700 : 400 }}>
                <td style={{ padding: "9px 12px" }}>{name}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="경제 정보" count={12} href="/category/경제" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>내 월급 공제액은 얼마일까요?</H2>
      <p style={body}>
        아래에서 월급을 조정하면 본인 부담 4대보험료가 바로 계산돼요.
        세전 월급 기준이에요. 상여금이나 수당은 포함시키고, 비과세 항목(식대 20만원 등)은 빼고 넣으세요.
      </p>

      <MiniCalc />

      <p style={body}>
        산재보험은 여기 안 들어가 있어요. 사업주가 전액 부담하기 때문에 내 월급에서는 한 푼도 안 빠져요.
        <a href="/w/4대보험-공제액-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대보험 공제액 계산</a> 글에서 더 자세한 시뮬레이션을 해볼 수 있어요.
      </p>

      <Divider />

      <H2>국민연금 인상, 2033년까지 얼마나 오르나요?</H2>
      <p style={body}>
        연금개혁안이 통과되면서 국민연금 보험료율이 단계적으로 올라가요.
        2026년 9.5%에서 시작해서 매년 0.5%p씩, 2033년에 최종 13%가 돼요.
      </p>

      <SectionBadge>국민연금 인상 로드맵</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연도</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>총 요율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>본인 부담</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2025년", "9.0%", "4.5%"],
              ["2026~2027년", "9.5%", "4.75%"],
              ["2028~2029년", "10.0%", "5.0%"],
              ["2030~2031년", "10.5%", "5.25%"],
              ["2032~2033년", "11.0%", "5.5%"],
              ["2033년 이후", "13.0%", "6.5%"],
            ].map(([year, total, mine], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{year}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{total}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{mine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        월급 300만원 기준{"\n"}
        2026년 본인 부담: 142,500원{"\n"}
        2033년 이후 본인 부담: 195,000원{"\n"}
        → 매달 52,500원 차이
      </GreenBox>

      <Divider />

      <H2>파트타임·아르바이트도 가입 대상일까요?</H2>
      <p style={body}>
        짧은 시간만 일해도 4대보험 가입 대상이 될 수 있어요.
        "나는 알바니까 상관없겠지"라고 생각하면 나중에 <a href="/w/2026년-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>를 못 받는 상황이 생길 수 있어요.
      </p>

      <BorderBox title="파트타임 가입 기준">
        월 60시간 이상: 4대보험 전부 가입{"\n"}
        주 15시간 이상: 고용보험 + 국민연금 가입{"\n"}
        주 15시간 미만: 건강보험만 (3개월 이상 근무 시){"\n\n"}
        사업장에서 가입 안 해주면 4대사회보험 정보연계센터(1588-0075)에 신고할 수 있어요.
      </BorderBox>

      <p style={body}>
        입사할 때 4대보험 가입 여부를 반드시 확인하세요. <a href="/w/4대보험-가입-확인-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대보험 가입 확인 방법</a>에서 온라인 조회법을 정리해뒀어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 보험료율로 작성됐어요. 장기요양보험 요율은 매년 변동될 수 있어요." />
    </ArticleLayout>
  );
}
