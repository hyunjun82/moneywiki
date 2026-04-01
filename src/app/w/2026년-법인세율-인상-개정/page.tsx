"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 법인 대표·경리 담당자가 세율 인상 소식 듣고 우리 회사 세금 얼마 오르는지 확인하려는 상황
// Q2. 세율표 보고 과세표준 구간 세금 변화를 직접 계산한다
// Q3. 세율 비교표 + 적용 시점(언제부터?) + 중소기업 특례 + 절세 체크리스트
// Q4. GreenBox(세율표) + Calculator(세금 변화) + Steps(적용 시점) + Checklist(절세)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

// 과세표준 기준 세금 변화 계산
function calcTax2025(profit: number): number {
  const p = profit * 100000000; // 억원 → 원
  if (p <= 200000000) return p * 0.09;
  if (p <= 20000000000) return 200000000 * 0.09 + (p - 200000000) * 0.19;
  if (p <= 300000000000) return 200000000 * 0.09 + (20000000000 - 200000000) * 0.19 + (p - 20000000000) * 0.21;
  return 200000000 * 0.09 + (20000000000 - 200000000) * 0.19 + (300000000000 - 20000000000) * 0.21 + (p - 300000000000) * 0.24;
}

function calcTax2026(profit: number): number {
  const p = profit * 100000000;
  if (p <= 200000000) return p * 0.10;
  if (p <= 20000000000) return 200000000 * 0.10 + (p - 200000000) * 0.20;
  if (p <= 300000000000) return 200000000 * 0.10 + (20000000000 - 200000000) * 0.20 + (p - 20000000000) * 0.22;
  return 200000000 * 0.10 + (20000000000 - 200000000) * 0.20 + (300000000000 - 20000000000) * 0.22 + (p - 300000000000) * 0.25;
}

const CALC_SLIDERS = [
  {
    id: "profit",
    label: "법인 과세표준 (세전이익)",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}억원`,
  },
];

const CALC_RESULTS = [
  {
    label: "2025년 법인세 (기존)",
    getValue: (v: Record<string, number>) => Math.round(calcTax2025(v.profit)),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "2026년 법인세 (인상)",
    getValue: (v: Record<string, number>) => Math.round(calcTax2026(v.profit)),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "추가 세부담",
    getValue: (v: Record<string, number>) => Math.round(calcTax2026(v.profit) - calcTax2025(v.profit)),
    format: (v: number) => `+${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const STEPS = [
  {
    title: "2025년 귀속분 (2026년 3월 신고): 기존 세율 적용",
    desc: "12월 결산법인 기준으로 2025년 1월 1일~12월 31일 사업연도는 아직 기존 세율(9~24%)이 적용돼요. 2026년 3월에 신고하는 법인세예요. 인상된 세율 아니에요.",
    tip: "2026년 3월 신고분 = 기존 세율 (9·19·21·24%)",
  },
  {
    title: "2026년 귀속분 (2027년 3월 신고): 인상 세율 적용",
    desc: "2026년 1월 1일 이후 개시하는 사업연도부터 인상된 세율(10~25%)이 적용돼요. 12월 결산법인은 2026년 귀속분을 2027년 3월에 신고할 때 처음으로 올라간 세금이 나와요.",
    tip: "2027년 3월 신고분부터 = 인상 세율 (10·20·22·25%)",
  },
  {
    title: "3월·6월 결산법인 등 비12월 결산법인",
    desc: "사업연도 개시일이 2026년 1월 1일 이후인지가 기준이에요. 3월 결산법인이면 2026년 4월~2027년 3월 사업연도부터 인상 세율이에요. 6월 결산법인은 2026년 7월~2027년 6월부터예요.",
    tip: "사업연도 개시일 기준으로 판단해요",
  },
];

const CHECKLIST = [
  "2025년 발생 비용 당해 연도 처리: 2026년으로 미루면 더 높은 세율에서 공제",
  "가지급금 정리: 2025년 안에 배당·급여로 청산하면 법인이익 감소 → 법인세 감소",
  "중소기업 여부 확인: 과세표준 5억원까지 10% 특례, 일반법인(2억원)보다 유리",
  "세액공제 챙기기: 고용증대·R&D·투자 세액공제 적용 가능 항목 점검",
  "중간예납 금액 조정: 2026년 사업연도 중간예납부터 인상 세율 기준으로 납부",
  "지방소득세 포함 실효세율 재산정: 법인세 × 1.1 = 최종 세부담",
];

const FAQS = [
  {
    q: "2025년 매출에 대한 법인세는 인상된 세율인가요?",
    a: "아니에요. 12월 결산법인 기준으로 2025년 귀속분(2026년 3월 신고)은 기존 세율(9~24%)이 그대로 적용돼요. 인상된 세율은 2026년 1월 1일 이후 개시 사업연도부터예요.",
  },
  {
    q: "중소기업도 법인세율이 올라요?",
    a: "네, 올라요. 다만 중소기업은 과세표준 5억원까지 10% 특례가 있어요. 일반법인은 2억원까지만 10%인 데 비해 5억원까지라서 절세 효과가 더 커요. 인상 후에도 중소기업이 유리한 건 변함없어요.",
  },
  {
    q: "지방소득세까지 포함하면 실제 세율이 얼마예요?",
    a: "법인세에 10%를 더 내야 해요. 2026년 최고세율 구간 기준 법인세 25% + 지방소득세 2.5% = 27.5%가 실제 부담이에요. 모든 구간에서 기존보다 1.1%p씩 오른 거예요.",
  },
  {
    q: "법인세 세율 인상이 언제 결정됐나요?",
    a: "2025년 12월 국회에서 세법 개정안이 통과됐어요. 기획재정부에 따르면 2022년 세율 인하 이후 법인세 세수가 급감(2022년 103조 → 2024년 62조)해 안정적 세입 기반 마련을 위해 환원했어요.",
  },
  {
    q: "법인세 중간예납은 언제 바뀐 세율이 적용되나요?",
    a: "2026년 사업연도 중에 내는 중간예납부터 인상 세율 기준이에요. 12월 결산법인은 2026년 8월 중간예납부터 인상 세율이 적용될 수 있어요. 세무사와 납부액 조정을 검토하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "법인세법 제55조: 세율 규정", url: "https://www.law.go.kr/법령/법인세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "기획재정부: 2025년 세제개편안", url: "https://www.moef.go.kr" },
      { label: "국세청: 법인세 신고·납부 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "법인세-중간예납", title: "법인세 중간예납 신청방법", description: "6개월치 세금 미리 내는 방법이에요." },
  { slug: "법인-가지급금-정리", title: "법인 가지급금 정리 방법", description: "세율 오르기 전 정리하면 절세 돼요." },
  { slug: "법인세율-2026-과세표준-구간", title: "법인세율 2026 과세표준 구간", description: "세율 구간별 계산 예시 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 법인세 · 2026년 개정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 법인세율 전 구간 1%p 인상<br />
        우리 회사 세금 얼마나 늘어나죠?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 1월 1일 이후 개시하는 사업연도부터 법인세율이 올라요.
        2억원 이하 9% → 10%, 최고세율 24% → 25%로 전 구간에서 1%p씩 인상됐어요.
        12월 결산법인이면 2025년 귀속분(2026년 3월 신고)까지는 기존 세율이고, 2026년 귀속분(2027년 3월 신고)부터 세금이 더 나와요.
        아래 계산기로 우리 회사 추가 세부담을 바로 확인해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 법인세율 세율표, 얼마나 올랐나요?</H2>
      <p style={body}>
        과세표준 4개 구간 전부 1%p씩 올랐어요.
        2022년 인하 전 세율로 돌아간 거예요.
        법인세에 10%를 더 내는 지방소득세까지 포함하면 최고 실효세율은 27.5%예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px", fontWeight: 700 }}>과세표준</th>
              <th style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700 }}>2025년</th>
              <th style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700 }}>2026년</th>
              <th style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700 }}>인상</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "6px 8px" }}>2억원 이하</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>9%</td>
              <td style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700, color: "#E53E3E" }}>10%</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>+1%p</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "6px 8px" }}>2억~200억원</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>19%</td>
              <td style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700, color: "#E53E3E" }}>20%</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>+1%p</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "6px 8px" }}>200억~3,000억원</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>21%</td>
              <td style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700, color: "#E53E3E" }}>22%</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>+1%p</td>
            </tr>
            <tr>
              <td style={{ padding: "6px 8px" }}>3,000억원 초과</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>24%</td>
              <td style={{ textAlign: "center", padding: "6px 8px", fontWeight: 700, color: "#E53E3E" }}>25%</td>
              <td style={{ textAlign: "center", padding: "6px 8px" }}>+1%p</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        누진세율 구조라서 과세표준 전체에 최고세율을 곱하지 않아요.
        예를 들어 과세표준 5억원이면 2억원 × 10% + 3억원 × 20% = 8,000만원이에요.
        중소기업은 5억원까지 10% 특례가 있어서 같은 5억원이면 5,000만원이에요.
      </p>

      <Divider />

      <H2>우리 회사 추가 세부담, 직접 계산해보세요</H2>
      <p style={body}>
        과세표준(세전 이익)을 입력하면 2025년과 2026년 법인세 차이가 바로 나와요.
        지방소득세(법인세의 10%)는 별도로 추가돼요.
      </p>

      <SectionBadge>법인세 변화 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 법인세법 제55조 기준 일반법인 세율 적용. 중소기업 특례·세액공제는 미반영."
      />

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>인상 세율, 언제부터 우리 회사에 적용되나요?</H2>
      <p style={body}>
        적용 시점은 사업연도 개시일 기준이에요.
        12월 결산법인이 가장 많으니 이 기준으로 설명해드릴게요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        중소기업은 과세표준 5억원까지 10% 특례세율이 적용돼요.<br />
        일반법인은 2억원 초과분부터 20%지만, 중소기업은 5억원까지 10%예요.<br />
        중소기업 판단은 직전 사업연도 기준: 매출액 기준(업종별 500억~1,500억원 미만) + 자산총액 5,000억원 미만 + 독립성 요건
      </BorderBox>

      <Divider />

      <H2>2025년 안에 준비할 수 있는 절세 체크리스트</H2>
      <p style={body}>
        세율 오르기 전에 할 수 있는 게 있어요.
        특히 비용 처리 시점과 가지급금 정리는 올해 안에 움직여야 효과가 있어요.
      </p>

      <SectionBadge>절세 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        고용증대 세액공제는 신규 채용 1인당 연 400만~1,200만원까지 공제돼요.<br />
        R&D 세액공제는 연구개발비의 25%(중소기업 기준)까지 공제 가능해요.<br />
        투자 세액공제(통합투자세액공제)는 기계장치·설비 투자의 1~12% 공제돼요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        법인세율 인상에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 법인세법 제55조와 기획재정부 세제개편안을 바탕으로 작성됐어요. 중소기업 특례·세액공제는 별도 요건이 있으니 세무사와 확인하세요." />
    </ArticleLayout>
  );
}
