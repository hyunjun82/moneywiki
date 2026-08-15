"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 육아휴직을 앞두고 있거나 사용 중인데, 2026년에 급여·기간·지원금이 얼마나 바뀌었는지 확인하려는 직장인 부모예요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 통상임금으로 육아휴직급여를 계산하고, 6+6 부모육아휴직제 해당 여부를 판단해서 고용24에 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 일반 80%(상한 150→160만원), 6+6 100%(상한 450만원), 기간 1년→1년 6개월 확대, 대체인력지원금 140만원, 업무분담지원금 60만원, 10시 출근제 신설.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 변경) + 비교 테이블(2025→2026) + Calculator(급여 계산) + Steps(신청 절차) + BorderBox(6+6 조건) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "wage", label: "통상임금 (월)", min: 100, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS_GENERAL = [
  {
    label: "일반 육아휴직급여 (80%)",
    getValue: (i: Record<string, number>) => {
      const calc = i.wage * 10000 * 0.8;
      return calc > 1600000 ? 1600000 : calc < 700000 ? 700000 : calc;
    },
    format: (v: number) => `월 ${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "6+6 부모육아휴직 (100%)",
    getValue: (i: Record<string, number>) => {
      const calc = i.wage * 10000;
      return calc > 4500000 ? 4500000 : calc;
    },
    format: (v: number) => `월 ${v.toLocaleString()}원`,
    highlight: true,
  },
];

const APPLY_STEPS = [
  { title: "회사에 육아휴직 신청", desc: "휴직 시작일 30일 전에 회사에 서면 신청해요.", tip: "신청서에 기간, 자녀 정보를 작성" },
  { title: "고용24에서 급여 신청", desc: "육아휴직 시작 후 1개월~12개월 이내에 고용24에서 온라인 신청해요." },
  { title: "서류 첨부", desc: "육아휴직 확인서(회사 발급) + 가족관계증명서를 첨부해요." },
  { title: "급여 지급", desc: "신청 후 약 14일 이내 통장으로 입금돼요.", tip: "2026년부터 휴직 기간 중 100% 지급 (사후지급 폐지)" },
];

const FAQS = [
  { q: "2026년에 육아휴직 기간이 늘었다는 게 사실인가요?", a: "네, 부모 각각 최대 1년에서 1년 6개월로 확대됐어요. 부부가 합산하면 최대 3년까지 쓸 수 있어요." },
  { q: "6+6 부모육아휴직제 조건이 뭔가요?", a: "생후 18개월 이내 자녀에 대해 부모가 둘 다 육아휴직을 써야 해요. 2024년 이후 부모 중 한 명이라도 최초로 육아휴직을 사용한 경우에 적용돼요." },
  { q: "통상임금이 150만원이면 급여가 얼마예요?", a: "일반 육아휴직이면 150만원의 80%인 120만원이에요. 6+6 적용 시에는 통상임금 100%인 150만원을 받아요." },
  { q: "대체인력지원금은 누가 받나요?", a: "사업주가 받아요. 육아휴직자 대신 새 직원을 채용하면 30인 미만 기업은 월 140만원, 30인 이상은 월 130만원을 지원받아요." },
  { q: "육아기 10시 출근제가 뭔가요?", a: "만 12세 이하 자녀를 둔 근로자가 출근 시간을 늦추는 제도예요. 임금 감소 없이 근무할 수 있고, 사업주에게 월 30만원 지원금이 나와요." },
  { q: "아빠도 육아휴직 쓸 수 있나요?", a: "당연하죠. 부모 각각 1년 6개월씩 쓸 수 있고, 6+6 혜택을 받으려면 부부 모두 사용해야 해요. 오히려 아빠가 써야 혜택이 커져요." },
  { q: "분할 사용은 몇 번까지 되나요?", a: "자녀 1명당 최대 3회까지 나눠서 쓸 수 있어요. 3개월 쓰고 복직하고, 나중에 다시 3개월 쓰는 식이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부 육아휴직 정책", url: "https://www.moel.go.kr" },
    { label: "고용24 육아휴직급여 신청", url: "https://www.work24.go.kr" },
    { label: "고용보험법 육아휴직급여", url: "https://www.law.go.kr/법령/고용보험법" },
  ] },
];

const RELATED = [
  { slug: "2026년-출산휴가급여", title: "2026년 출산전후휴가 급여", description: "상한액 월 220만원, 배우자출산휴가 20일까지 정리했어요." },
  { slug: "육아기-근로시간-단축", title: "육아기 근로시간 단축 제도", description: "근로시간 단축 급여와 신청 방법을 확인하세요." },
  { slug: "2026년-달라지는-제도", title: "2026년 달라지는 제도", description: "육아휴직 외에도 바뀌는 제도가 많아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>육아휴직 · 고용보험 · 일가정양립</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 육아휴직급여, 뭐가 바뀌었을까?<br />
        급여 계산·6+6 제도·신청방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아휴직 들어가려는데 급여가 얼마인지 걱정되시죠?
        2026년에 육아휴직 기간이 <strong>1년 6개월</strong>로 늘었고, 대체인력지원금이 월 <strong>140만원</strong>으로 올랐어요.
        6+6 부모육아휴직제를 쓰면 첫 6개월은 통상임금 100%(상한 450만원)까지 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* 섹션 1: 2025 vs 2026 비교 */}
      <H2>2025년 대비 뭐가 달라졌나요?</H2>
      <p style={body}>
        2026년 육아휴직 제도는 급여 상한, 기간, 사업주 지원금에서 변화가 커요.
        특히 대체인력지원금이 크게 올라서 사업주가 육아휴직을 허용하기 쉬워졌어요.
      </p>

      <SectionBadge>2025년 → 2026년 변경 사항</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["육아휴직 기간", "최대 1년", "최대 1년 6개월"],
              ["일반급여 상한", "월 150만원", "월 160만원"],
              ["6+6 상한", "월 450만원", "월 450만원 (유지)"],
              ["대체인력지원금 (30인 미만)", "월 120만원", "월 140만원"],
              ["대체인력지원금 (30인 이상)", "없음", "월 130만원 (신설)"],
              ["업무분담지원금 (30인 미만)", "월 20만원", "월 60만원"],
              ["업무분담지원금 (30인 이상)", "없음", "월 40만원 (신설)"],
              ["지급 방식", "사후지급", "휴직 중 100% 지급"],
            ].map(([item, y2025, y2026], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{y2025}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{y2026}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* 섹션 2: 급여 계산 */}
      <H2>육아휴직급여, 내 통상임금으로 계산해보세요</H2>
      <p style={body}>
        일반 육아휴직은 통상임금의 80%(상한 160만원, 하한 70만원)예요.
        6+6 부모육아휴직제를 적용받으면 첫 6개월은 100%(상한 450만원)까지 올라가요.
        월급에 따라 차이가 크니까 직접 계산해보세요.
      </p>

      <Calculator title="2026년 육아휴직급여 계산기" sliders={CALC_SLIDERS} results={CALC_RESULTS_GENERAL} note="일반: 통상임금 80% (상한 160만원, 하한 70만원) / 6+6: 통상임금 100% (상한 450만원)" />

      <ArticleAd position="mid" />
      <Divider />

      {/* 섹션 3: 6+6 부모육아휴직제 */}
      <H2>6+6 부모육아휴직제, 조건이 뭔가요?</H2>
      <p style={body}>
        부모가 둘 다 육아휴직을 쓰면 첫 6개월간 급여가 확 올라가는 제도예요.
        월급 300만원이면 일반 육아휴직은 160만원(상한)이지만, 6+6이면 300만원 전액을 받을 수 있어요.
        450만원까지 상한이니까, 고소득자도 혜택이 크죠.
      </p>

      <BorderBox>
        6+6 부모육아휴직제 조건이에요.<br />
        · 자녀 연령: 생후 <strong>18개월 이내</strong><br />
        · 부모 둘 다 육아휴직 사용<br />
        · 2024년 이후 부모 중 한 명이라도 최초 사용<br />
        → 두 번째 부모가 사용한 개월 수에 맞춰 첫 번째 부모에게도 동일 기간 적용
      </BorderBox>

      <SectionBadge>월급별 6+6 vs 일반 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>통상임금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일반 (80%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>6+6 (100%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>차이</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["200만원", "160만원 (상한)", "200만원", "+40만원"],
              ["300만원", "160만원 (상한)", "300만원", "+140만원"],
              ["400만원", "160만원 (상한)", "400만원", "+240만원"],
              ["500만원", "160만원 (상한)", "450만원 (상한)", "+290만원"],
            ].map(([wage, general, special, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{wage}</td>
                <td style={{ padding: "9px 12px" }}>{general}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{special}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* 섹션 4: 사업주 지원금 */}
      <H2>사업주 지원금도 올랐어요</H2>
      <p style={body}>
        &ldquo;육아휴직 쓰겠다고 하면 회사가 싫어하지 않을까?&rdquo; 걱정되시죠?
        2026년에 사업주 지원금이 크게 올라서 회사 입장에서도 부담이 줄었어요.
        대체인력을 채용하면 30인 미만 기업은 월 140만원, 대체 없이 업무 분담하면 월 60만원을 정부에서 받아요.
      </p>

      <GreenBox title="사업주 지원금 (2026년)">
        대체인력지원금: 30인 미만 <strong>월 140만원</strong> / 30인 이상 <strong>월 130만원</strong><br />
        업무분담지원금: 30인 미만 <strong>월 60만원</strong> / 30인 이상 <strong>월 40만원</strong><br />
        → 2026년부터 휴직 기간 중 100% 지급 (사후지급 폐지)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 신청 절차 */}
      <H2>육아휴직급여 신청, 이 순서예요</H2>
      <p style={body}>
        회사에 먼저 신청하고, 급여는 고용24에서 별도로 신청해야 해요.
        회사가 알아서 해주는 게 아니니까 꼭 직접 챙기세요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용노동부·고용보험법을 바탕으로 작성됐어요. 개인별 정확한 급여는 고용24(work24.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
