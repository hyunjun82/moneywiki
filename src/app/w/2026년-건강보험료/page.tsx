"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 2026년 급여명세서에서 건강보험료가 올라간 걸 보고 얼마나 올랐는지, 내 보험료가 정확히 얼마인지 확인하고 싶은 직장인이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 급여에 맞는 2026년 건강보험료를 직접 계산하고, 건보공단에서 정확한 금액을 조회하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 보험료율 7.19%, 장기요양보험료율 13.14%, 직장가입자 본인부담 3.595%, 상한액 9,183,480원, 지역가입자 계산 방식, 피부양자 조건.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Calculator(월급별 보험료 계산) + 연도 비교 테이블 + BorderBox(피부양자 조건) + GreenBox(핵심 요율 요약) + Steps(조회 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "salary", label: "월급 (세전)", min: 100, max: 1000, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  { label: "건강보험료 (본인)", getValue: (i: Record<string, number>) => Math.round(i.salary * 10000 * 0.03595), format: (v: number) => `${v.toLocaleString()}원`, highlight: true },
  { label: "장기요양보험료", getValue: (i: Record<string, number>) => Math.round(i.salary * 10000 * 0.03595 * 0.1314), format: (v: number) => `${v.toLocaleString()}원` },
  { label: "합계 (본인 부담)", getValue: (i: Record<string, number>) => Math.round(i.salary * 10000 * 0.03595) + Math.round(i.salary * 10000 * 0.03595 * 0.1314), format: (v: number) => `${v.toLocaleString()}원`, highlight: true },
];

const QUERY_STEPS = [
  { title: "국민건강보험공단 접속", desc: "nhis.or.kr에 접속해요.", tip: "공동인증서 또는 간편인증(카카오·네이버) 필요" },
  { title: "로그인 후 민원여기요", desc: "상단 메뉴 '민원여기요' → '개인민원'으로 이동해요." },
  { title: "보험료 조회", desc: "'보험료 조회/납부' 메뉴에서 본인 건강보험료를 확인해요.", tip: "최근 12개월 납부 이력까지 볼 수 있어요" },
];

const FAQS = [
  { q: "2026년 건강보험료율이 왜 올랐나요?", a: "3년간 동결했던 보험료율이 건강보험 재정 안정과 지역·필수의료 강화를 위해 7.09%에서 7.19%로 인상됐어요. 보건복지부가 2025년 12월에 고시했어요." },
  { q: "월급 300만원이면 건강보험료가 정확히 얼마예요?", a: "건강보험료 본인 부담 107,850원 + 장기요양보험료 14,170원 = 약 122,020원이에요. 회사가 같은 금액을 부담하고요." },
  { q: "건강보험료 상한액에 걸리려면 월급이 얼마여야 하나요?", a: "월 상한액 9,183,480원에 걸리려면 월 소득이 약 2억 5천만원 이상이어야 해요. 대부분의 직장인은 해당 안 돼요." },
  { q: "지역가입자 보험료는 어떻게 계산하나요?", a: "소득·재산·자동차를 합산해서 점수를 매기고, 점수당 약 211원을 곱해요. 건보공단 홈페이지에서 모의계산이 가능해요." },
  { q: "피부양자 자격을 잃으면 어떻게 되나요?", a: "지역가입자로 전환돼서 별도 보험료를 내야 해요. 연 소득 2,000만원 초과하거나 재산세 과세표준 5.4억원을 넘기면 자격을 잃어요." },
  { q: "장기요양보험료는 따로 내는 건가요?", a: "건강보험료와 별도로 부과되지만, 급여에서 같이 공제돼요. 건강보험료의 13.14%가 장기요양보험료예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "보건복지부 2026년 건강보험료율 고시", url: "https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1487279" },
    { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
    { label: "보건복지부 장기요양보험료율 고시", url: "https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1487817&mid=a10503000000" },
  ] },
];

const RELATED = [
  { slug: "2026년-실업급여", title: "2026년 실업급여 상한액·하한액", description: "일 68,100원 상한, 월 수령액 계산까지 정리했어요." },
  { slug: "4대보험", title: "4대보험 계산법과 부담 비율", description: "국민연금·건강보험·고용보험·산재보험 한 번에 계산해요." },
  { slug: "2026년-달라지는-제도", title: "2026년 달라지는 제도", description: "건보료 외에 2026년에 바뀌는 제도를 한눈에 볼 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>건강보험 · 4대보험 · 보험료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 건강보험료, 얼마나 올랐을까?<br />
        요율·계산법·상한액 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서 보다가 건강보험료가 올라간 거 눈치채셨죠? 2026년 건강보험료율이 7.09%에서 <strong>7.19%</strong>로
        0.1%p 인상됐어요. 3년 만에 동결이 풀린 거예요.
        직장인은 회사와 반반 부담하니까 본인은 3.595%만 내면 돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* 섹션 1: 핵심 요율 */}
      <H2>2026년 보험료율, 핵심 숫자부터 보세요</H2>
      <p style={body}>
        매년 <a href="https://www.mohw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>보건복지부</a>에서 건강보험료율을 고시해요.
        2026년은 전년 대비 1.48% 인상이에요. 금액으로 따지면 직장인 월평균 본인 부담이 약 2,235원 올랐어요.
      </p>

      <GreenBox title="2026년 건강보험 핵심 요율">
        건강보험료율: <strong>7.19%</strong> (직장인 본인 부담 3.595%)<br />
        장기요양보험료율: 건보료의 <strong>13.14%</strong><br />
        월 상한액: <strong>9,183,480원</strong> (2025년 9,008,340원에서 인상)
      </GreenBox>

      <SectionBadge>전년 대비 변동</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>변동</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["건강보험료율", "7.09%", "7.19%", "+0.1%p"],
              ["장기요양보험료율", "0.9182%", "0.9448%", "+0.0266%p"],
              ["건보 대비 장기요양", "12.95%", "13.14%", "+0.19%p"],
              ["월 상한액", "9,008,340원", "9,183,480원", "+175,140원"],
            ].map(([label, y2025, y2026, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{y2025}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{y2026}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>월급별 건강보험료, 직접 계산해보세요</H2>
      <p style={body}>
        직장가입자 건강보험료는 월급(보수월액)에 본인 부담률 3.595%를 곱하면 돼요.
        여기에 장기요양보험료(건보료의 13.14%)를 더하면 급여에서 빠지는 총 금액이에요.
        회사가 같은 금액을 별도로 내고 있어요.
      </p>

      <Calculator title="2026년 건강보험료 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS} note="직장가입자 본인 부담 기준. 회사가 동일 금액을 별도 부담해요." />

      <SectionBadge>월급별 보험료 비교표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>건보료</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>장기요양</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>합계</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["200만원", "71,900원", "9,450원", "81,350원"],
              ["300만원", "107,850원", "14,170원", "122,020원"],
              ["400만원", "143,800원", "18,890원", "162,690원"],
              ["500만원", "179,750원", "23,620원", "203,370원"],
            ].map(([salary, health, care, total], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{salary}</td>
                <td style={{ padding: "9px 12px" }}>{health}</td>
                <td style={{ padding: "9px 12px" }}>{care}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArticleAd position="mid" />
      <Divider />

      {/* 섹션 3: 전년 대비 얼마 올랐나 */}
      <H2>작년보다 얼마나 더 내나요?</H2>
      <p style={body}>
        0.1%p 인상이 크게 안 느껴질 수 있어요. 그런데 소득이 높을수록 인상 금액도 커져요.
        월급 500만원이면 연간 약 44,000원을 더 내는 셈이에요.
      </p>

      <SectionBadge>2025년 → 2026년 인상액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>인상액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["200만원", "79,870원", "81,350원", "+1,480원"],
              ["300만원", "119,810원", "122,020원", "+2,210원"],
              ["400만원", "159,740원", "162,690원", "+2,950원"],
              ["500만원", "199,680원", "203,370원", "+3,690원"],
            ].map(([salary, y2025, y2026, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{salary}</td>
                <td style={{ padding: "9px 12px" }}>{y2025}</td>
                <td style={{ padding: "9px 12px" }}>{y2026}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444", fontWeight: 600 }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* 섹션 4: 지역가입자 */}
      <H2>지역가입자는 계산 방식이 달라요</H2>
      <p style={body}>
        프리랜서, 자영업자, 퇴직자처럼 직장에 소속되지 않은 분은 지역가입자예요.
        소득·재산·자동차를 합산해서 점수를 매기고, 2026년 점수당 약 211원을 곱해서 보험료를 산출해요.
        직장가입자와 달리 전액 본인이 부담하고요.
      </p>

      <BorderBox>
        지역가입자 보험료 예시예요.<br />
        · 소득 300만원 + 재산 1억원 → 월 약 20~25만원<br />
        · 소득 200만원 + 재산 5천만원 → 월 약 12~15만원<br />
        · 소득 100만원 + 재산 3천만원 → 월 약 6~8만원<br />
        → 정확한 금액은 <a href="https://www.nhis.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>건보공단</a> 모의계산에서 확인하세요.
      </BorderBox>

      <Divider />

      {/* 섹션 5: 피부양자 */}
      <H2>피부양자 자격, 소득·재산 기준이 있어요</H2>
      <p style={body}>
        부모님이나 배우자를 직장인 건강보험에 올려놓으면 보험료 없이 혜택을 받을 수 있어요.
        그런데 소득과 재산이 기준을 넘기면 자격을 잃고 지역가입자로 전환되면서 보험료가 별도로 나와요.
      </p>

      <GreenBox title="피부양자 자격 조건">
        · 연 소득 <strong>2,000만원 이하</strong><br />
        · 재산세 과세표준 <strong>5.4억원 이하</strong><br />
        · 대상: 배우자, 직계존비속(부모·자녀), 형제자매<br />
        → 기준 초과 시 지역가입자로 전환. 보험료 부담이 커져요.
      </GreenBox>

      <Divider />

      {/* 섹션 6: 조회 방법 */}
      <H2>내 건강보험료 조회하는 법</H2>
      <p style={body}>
        급여명세서에서 확인하는 게 가장 빠르지만, 상세 내역이 궁금하면 건보공단에서 직접 조회할 수 있어요.
        고객센터 전화번호는 <strong>1577-1000</strong>(평일 09:00~18:00)이에요.
      </p>

      <Steps steps={QUERY_STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 보건복지부·국민건강보험공단 고시를 바탕으로 작성됐어요. 개인별 정확한 보험료는 건보공단(1577-1000)에서 확인하세요." />
    </ArticleLayout>
  );
}
