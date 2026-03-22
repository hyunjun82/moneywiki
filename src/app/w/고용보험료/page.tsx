"use client";

// Q1. 급여명세서에서 고용보험료가 빠지는데 얼마를 내는 건지, 왜 내는 건지 궁금한 직장인
// Q2. 내 월급 기준 고용보험료를 직접 계산하고, 사업주 추가 부담까지 파악한다
// Q3. 2026년 요율(근로자 0.9%, 사업주 0.9%+α), 보수총액 기준, 사업장 규모별 추가 부담
// Q4. GreenBox(요율 요약) + 인라인 테이블(규모별) + BorderBox(계산 예시) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const CHECK = [
  "급여명세서 '고용보험' 항목 금액 = 보수총액 × 0.9%인지 확인",
  "상여금, 수당도 보수총액에 포함 (비과세 식대·교통비 제외)",
  "고용보험 가입기간 180일 이상이어야 실업급여 수급 자격",
  "일용직도 고용보험 가입 의무 대상이에요",
];

const FAQS = [
  { q: "상여금도 고용보험료가 붙나요?", a: "네, 상여금도 보수총액에 포함돼요. 보수총액은 세법상 과세되는 임금 전체를 뜻해요. 기본급, 상여금, 직책수당이 전부 들어가요. 비과세 식대(월 20만원 이내)나 차량유지비(월 20만원 이내)는 제외돼요." },
  { q: "고용보험료를 회사가 대신 내줄 수도 있나요?", a: "법적으로 근로자 부담분 0.9%와 사업주 부담분은 각각 정해져 있어요. 실무에서 회사가 근로자 몫까지 내주는 경우가 있는데, 이 금액은 근로자 소득에 포함될 수 있어요." },
  { q: "이직하면 고용보험 가입기간은 어떻게 되나요?", a: "이전 직장과 현재 직장의 피보험기간이 합산돼요. 단, 이전 직장에서 실업급여를 받았다면 그 기간은 합산에서 빠져요. 가입기간 합산은 근로복지공단에서 자동 처리돼요." },
  { q: "프리랜서도 고용보험에 가입할 수 있나요?", a: "특수형태근로종사자(보험설계사, 택배기사, 대리운전기사 등)는 2022년부터 고용보험 가입 대상이에요. 일반 프리랜서는 자영업자 고용보험에 임의가입할 수 있어요." },
  { q: "고용보험료가 인상될 수 있나요?", a: "요율은 고용보험법 시행령으로 정하고, 고용보험기금 재정 상황에 따라 변경될 수 있어요. 2026년 현재 실업급여분은 1.8%(각 0.9%)로 유지되고 있어요." },
  { q: "4대보험료를 한 번에 확인하고 싶어요", a: "4대사회보험 정보연계센터(4insure.or.kr)에서 국민연금, 건강보험, 고용보험, 산재보험 보험료를 한 번에 조회하고 계산할 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용보험법 시행령", url: "https://www.law.go.kr/법령/고용보험법시행령" },
  ]},
  { category: "정부 안내", items: [
    { label: "근로복지공단 보험료 안내", url: "https://www.kcomwel.or.kr" },
    { label: "4대사회보험 정보연계센터", url: "https://www.4insure.or.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용보험 · 4대보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고용보험료, 내 월급에서 얼마가 빠지나요?<br />
        2026년 요율과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서에 &apos;고용보험&apos;이라고 빠지는 금액이 정확히 얼마인지 궁금하시죠?
      </p>
      <p style={body}>
        2026년 기준 고용보험료 요율은 근로자 <strong>0.9%</strong>, 사업주 <strong>0.9%</strong>예요. 합쳐서 1.8%가 고용보험에 들어가요.
        월급 300만원이면 매달 <strong>27,000원</strong>이 빠지는 거예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a> 시행령에서 이 요율을 정하고 있어요.
      </p>

      <Divider />

      <H2>2026년 고용보험료 요율은 얼마예요?</H2>
      <p style={body}>
        근로자와 사업주가 각각 월 보수총액의 0.9%씩 부담해요. 근로자 입장에서는 월급에서 자동으로 공제되니까 직접 내는 느낌은 없어요. 회사가 원천징수해서 납부하거든요.
      </p>

      <GreenBox title="2026년 고용보험료 요율">
        {"근로자 부담: 보수총액 × 0.9%\n사업주 부담: 보수총액 × 0.9% + 고용안정·직업능력개발 보험료\n합산: 1.8% + 사업주 추가분"}
      </GreenBox>

      <p style={body}>
        사업주는 실업급여분 0.9% 외에 고용안정·직업능력개발 보험료를 추가로 내요. 이건 사업장 규모에 따라 요율이 달라지죠.
      </p>

      <Divider />

      <H2>사업장 규모별 사업주 추가 부담은 어떻게 다르나요?</H2>
      <p style={body}>
        근로자는 모두 0.9%로 동일하지만, 사업주는 사업장 규모에 따라 추가 보험료가 다르게 적용돼요.
      </p>

      <SectionBadge>사업장 규모별 추가 요율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>사업장 규모</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>추가 요율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>사업주 총 부담</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["150인 미만", "0.25%", "1.15%"],
              ["150인 이상 (우선지원)", "0.45%", "1.35%"],
              ["150인~1,000인 미만", "0.65%", "1.55%"],
              ["1,000인 이상 / 국가·지자체", "0.85%", "1.75%"],
            ].map(([size, extra, total], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{size}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{extra}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 600 }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>월급별로 고용보험료를 계산해 볼까요?</H2>
      <p style={body}>
        계산은 간단해요. 월 보수총액에 0.9%를 곱하면 근로자 부담분이 나와요.
        보수총액은 기본급뿐 아니라 상여금, 수당 등 세법상 과세되는 임금이 전부 포함돼요. 비과세 식대(월 20만원)나 차량유지비(월 20만원)는 빠지고요.
      </p>

      <BorderBox>
        <strong>월급별 고용보험료 (근로자 부담)</strong>{"\n"}
        {"· 월급 200만원 → 200만 × 0.9% = 18,000원\n· 월급 300만원 → 300만 × 0.9% = 27,000원\n· 월급 400만원 → 400만 × 0.9% = 36,000원\n· 월급 500만원 → 500만 × 0.9% = 45,000원"}
      </BorderBox>

      <p style={body}>
        매달 내는 고용보험료가 나중에 <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>로 돌아와요. 퇴직 전 18개월 이내 180일 이상 피보험기간이 있어야 수급 자격이 생기니까 가입기간을 꾸준히 유지하는 게 중요하죠.
      </p>

      <Divider />

      <H2>급여명세서 확인할 때 챙길 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECK} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 시행령 요율로 작성됐어요. 요율은 고용보험기금 재정 상황에 따라 변경될 수 있어요." />
    </div>
  );
}
