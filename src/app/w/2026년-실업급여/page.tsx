"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 퇴직했거나 퇴직 예정인데 실업급여를 얼마나 받을 수 있는지, 2026년에 바뀐 게 있는지 확인하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인의 일 평균임금으로 2026년 실업급여 수령액을 계산하고 고용24에서 모의계산하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 상한액 일 68,100원, 하한액 일 66,048원, 평균임금의 60%, 상한·하한 적용 기준, 소정급여일수(120~270일), 50세 이상 추가.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Calculator(수령액 계산) + GreenBox(핵심 숫자) + 적용 예시 테이블 + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "dailyWage", label: "이전 직장 일 평균임금", min: 50000, max: 300000, step: 5000, defaultValue: 130000, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "days", label: "소정급여일수", min: 120, max: 270, step: 30, defaultValue: 180, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "일 수령액",
    getValue: (i: Record<string, number>) => {
      const calc = Math.round(i.dailyWage * 0.6);
      if (calc > 68100) return 68100;
      if (calc < 66048) return 66048;
      return calc;
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "월 수령액 (30일)",
    getValue: (i: Record<string, number>) => {
      const daily = Math.round(i.dailyWage * 0.6);
      const adjusted = daily > 68100 ? 68100 : daily < 66048 ? 66048 : daily;
      return adjusted * 30;
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "총 수령액 예상",
    getValue: (i: Record<string, number>) => {
      const daily = Math.round(i.dailyWage * 0.6);
      const adjusted = daily > 68100 ? 68100 : daily < 66048 ? 66048 : daily;
      return adjusted * i.days;
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
];

const APPLY_STEPS = [
  { title: "워크넷 구직등록", desc: "work24.go.kr에서 구직 등록을 먼저 해요.", tip: "퇴직 전에도 등록 가능" },
  { title: "수급자격 인정 신청", desc: "관할 고용센터에 방문하거나 고용24에서 온라인 신청해요." },
  { title: "수급자격 교육 수강", desc: "실업급여 수급자격 인정 교육을 온라인으로 이수해요." },
  { title: "구직활동 후 실업인정", desc: "4주마다 구직활동을 하고 실업인정 신청을 해요.", tip: "온라인 실업인정도 가능" },
  { title: "실업급여 입금", desc: "실업인정 후 2주 이내에 통장으로 입금돼요." },
];

const FAQS = [
  { q: "상한액이 6년 만에 오른 이유가 뭔가요?", a: "2026년 최저임금이 10,320원으로 올라서 하한액(66,048원)이 기존 상한액(66,000원)을 넘어서는 역전 현상이 생겼어요. 이걸 막기 위해 상한액도 68,100원으로 조정됐어요." },
  { q: "자발적 퇴사(자진퇴사)도 실업급여 받을 수 있나요?", a: "원칙적으로 불가능하지만, 임금체불·직장 내 괴롭힘·통근 3시간 이상 등 정당한 사유가 있으면 받을 수 있어요. 고용센터에서 사유를 심사해요." },
  { q: "50세 이상이면 더 오래 받을 수 있나요?", a: "네, 각 피보험기간 구간에서 소정급여일수가 30일 추가돼요. 예를 들어 피보험기간 5~10년이면 210일이 아닌 240일을 받아요." },
  { q: "하한액보다 적게 받는 경우는 없나요?", a: "단시간 근로자(주 40시간 미만)는 소정근로시간에 비례해서 하한액이 줄어요. 풀타임이면 하한액 아래로 내려가는 일은 없어요." },
  { q: "실업급여 받으면서 알바해도 되나요?", a: "주 15시간 미만, 월 60시간 미만이면 가능해요. 초과하면 실업급여가 정지되니까 시간 관리를 잘 해야 해요." },
  { q: "반복수급자 제한은 뭔가요?", a: "5년 이내에 3회 이상 실업급여를 받으면 소정급여일수의 50%만 지급돼요. 2024년부터 시행된 제도예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용보험법 구직급여 지급액", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do" },
    { label: "고용24 실업급여 모의계산", url: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" },
  ] },
];

const RELATED = [
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격 조건", description: "비자발적 퇴직 조건부터 수급자격 신청 절차까지 정리했어요." },
  { slug: "실업급여-구직활동", title: "실업급여 구직활동 방법", description: "4주마다 해야 하는 구직활동과 실업인정 절차예요." },
  { slug: "2026년-건강보험료", title: "2026년 건강보험료 요율·계산법", description: "건보료율 7.19% 인상, 월급별 계산까지 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 구직급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 실업급여, 얼마나 받을 수 있을까?<br />
        상한액·하한액·월 수령액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직하고 나서 생활비가 걱정되시죠? 2026년 실업급여 상한액이 6년 만에 올랐어요.
        일 <strong>68,100원</strong>이 상한, 일 <strong>66,048원</strong>이 하한이에요.
        본인 평균임금에 따라 실제 수령액이 달라지니까, 아래에서 직접 계산해보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* 섹션 1: 핵심 숫자 */}
      <H2>2026년 상한액·하한액, 핵심 숫자예요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 실업급여(구직급여)는 이직 전 평균임금의 60%로 계산해요.
        다만 상한과 하한 사이에서만 지급돼요. 아무리 고임금이어도 일 68,100원이 최대이고, 아무리 저임금이어도 일 66,048원은 보장돼요.
      </p>

      <GreenBox title="2026년 실업급여 핵심 숫자">
        일 상한액: <strong>68,100원</strong> (2025년 66,000원 → +2,100원)<br />
        일 하한액: <strong>66,048원</strong> (최저임금 10,320원 × 80% × 8시간)<br />
        월 상한: 약 <strong>204만 3,000원</strong> | 월 하한: 약 <strong>198만 1,440원</strong>
      </GreenBox>

      <p style={body}>
        상한과 하한 차이가 2,052원밖에 안 돼요. 이건 최저임금이 빠르게 올라서 생긴 현상이에요.
        저임금 근로자든 고임금 근로자든 실업급여 수령액 차이가 크지 않다는 뜻이에요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 실업급여 수령액, 계산해보세요</H2>
      <p style={body}>
        이전 직장의 일 평균임금과 소정급여일수를 넣으면 예상 수령액이 나와요.
        일 평균임금은 퇴직 전 3개월 급여 총액을 일수로 나눈 금액이에요.
        모르겠으면 <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24 모의계산기</a>에서 확인할 수 있어요.
      </p>

      <Calculator title="2026년 실업급여 수령액 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS} note="평균임금 60%가 상한(68,100원) 초과 시 상한 적용, 하한(66,048원) 미만 시 하한 적용." />

      <ArticleAd position="mid" />
      <Divider />

      {/* 섹션 3: 적용 예시 */}
      <H2>일 평균임금별 실제 수령액은 이래요</H2>
      <p style={body}>
        일 평균임금이 113,500원 이상이면 상한에 걸려요. 이 아래라면 평균임금의 60%를 그대로 받고요.
        어차피 하한이 66,048원이니까, 최소 월 198만원은 보장되는 구조예요.
      </p>

      <SectionBadge>평균임금별 적용 예시</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일 평균임금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>60% 계산</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>적용</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일 수령액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["80,000원", "48,000원", "하한 적용", "66,048원"],
              ["100,000원", "60,000원", "하한 적용", "66,048원"],
              ["113,500원", "68,100원", "경계", "68,100원"],
              ["140,000원", "84,000원", "상한 적용", "68,100원"],
              ["200,000원", "120,000원", "상한 적용", "68,100원"],
            ].map(([wage, calc, apply, result], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{wage}</td>
                <td style={{ padding: "9px 12px" }}>{calc}</td>
                <td style={{ padding: "9px 12px", color: apply === "하한 적용" ? "#ef4444" : apply === "상한 적용" ? "#ef4444" : "#1D9E75", fontWeight: 600 }}>{apply}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* 섹션 4: 소정급여일수 */}
      <H2>몇 개월 동안 받을 수 있나요?</H2>
      <p style={body}>
        실업급여 지급 기간(소정급여일수)은 피보험기간과 나이에 따라 달라요.
        오래 일하고, 나이가 많을수록 더 오래 받아요. 50세 이상이거나 장애인이면 구간별로 30일이 추가돼요.
      </p>

      <SectionBadge>피보험기간별 소정급여일수</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>피보험기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>50세 미만</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>50세 이상·장애인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일", "120일"],
              ["1~3년", "150일", "180일"],
              ["3~5년", "180일", "210일"],
              ["5~10년", "210일", "240일"],
              ["10년 이상", "240일", "270일"],
            ].map(([period, under50, over50], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{period}</td>
                <td style={{ padding: "9px 12px" }}>{under50}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{over50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        예시: 일 평균임금 130,000원, 피보험기간 3년, 30세인 경우<br />
        → 상한 적용으로 일 68,100원 × 180일 = 총 <strong>12,258,000원</strong><br />
        → 약 6개월간 매달 204만원씩 받아요.
      </BorderBox>

      <Divider />

      {/* 섹션 5: 신청 절차 */}
      <H2>실업급여 신청, 이 순서로 하세요</H2>
      <p style={body}>
        퇴직하면 자동으로 입금되는 게 아니에요. 본인이 직접 신청해야 해요.
        워크넷 구직등록부터 시작해서 4주마다 구직활동 보고까지, 꽤 번거롭지만 이 돈을 포기할 수는 없죠.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        첫 신청부터 입금까지 보통 2~3주 걸려요. 퇴직하고 바로 움직이는 게 좋아요.
        <a href="/w/실업급여-수급자격-인정" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 수급자격 조건</a>을 먼저 확인해보세요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용보험법·고용노동부 고시를 바탕으로 작성됐어요. 개인별 정확한 수령액은 고용24 모의계산기에서 확인하세요." />
    </ArticleLayout>
  );
}
