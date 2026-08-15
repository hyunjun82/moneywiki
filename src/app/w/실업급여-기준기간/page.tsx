"use client";
// Q1. 퇴직 후 실업급여를 신청하려는데 이직 전 여러 회사 근무이력이 있어서 18개월/180일 기준이 헷갈리는 상황
// Q2. 기준기간(18개월) 안에 피보험단위기간 180일을 충족했는지 직접 계산하고 확인할 수 있어야 함
// Q3. 18개월과 180일의 차이 / 이직일 기준 역산법 / 여러 직장 합산 조건 / 기준기간 연장 사유
// Q4. GreenBox(요약표) + DocTable(합산 절차) + EligibilityChecker(충족 여부 체커) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "18개월 안에 다른 회사 근무일도 합산되나요?",
    a: "기준기간(이직일 이전 18개월) 안에 있는 근무일이라면 다른 회사 경력도 합산돼요. 단, 과거에 실업급여를 받은 적이 있으면 그 이전 이력은 초기화돼요.",
  },
  {
    q: "피보험기간 180일이 18개월과 다른 이유가 뭔가요?",
    a: "18개월은 기준기간(범위)이고 180일은 그 안에서 실제로 일한 날수예요. 주5일제 기준으로 약 9개월 근무하면 180일이 채워져요.",
  },
  {
    q: "기준기간 연장은 어떻게 신청하나요?",
    a: "고용센터 방문 시 이직확인서와 함께 연장 사유 증빙을 제출하면 돼요. 질병이면 진단서, 출산이면 출생증명서, 육아휴직이면 육아휴직 확인서가 필요해요.",
  },
  {
    q: "과거에 실업급여를 받은 적이 있으면 이전 이력은 완전히 없어지나요?",
    a: "수급 시점 이전 피보험이력은 초기화돼요. 2022년 실업급여 수령 후 재취업했다면 2022년 이후 피보험기간만 계산 대상이에요.",
  },
  {
    q: "일용직도 기준기간이 18개월인가요?",
    a: "일용직도 기준기간은 동일하게 이직일 이전 18개월이에요. 다만 일용직은 고용보험에 가입된 실제 근무일만 피보험단위기간으로 인정돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제40조 - 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업급여 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-피보험단위기간", title: "실업급여 피보험단위기간", description: "180일 계산에서 무급휴가, 결근일 처리 방법이에요." },
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간 몇 개월 받나요", description: "소정급여일수 120~270일 기준이에요." },
  { slug: "실업급여-모의계산", title: "실업급여 모의계산", description: "예상 수령액을 직접 계산할 수 있어요." },
];

const CHECKER_GROUPS = [
  {
    key: "period",
    label: "최근 직장 근무 기간이 얼마나 됐나요?",
    options: [
      { value: "over9m", text: "9개월 이상 (180일 이상)" },
      { value: "6to9m", text: "6~9개월 미만 (120~180일)" },
      { value: "under6m", text: "6개월 미만 (120일 미만)" },
      { value: "multi", text: "여러 직장을 합산해야 해요" },
    ],
  },
  {
    key: "extend",
    label: "기준기간 연장 사유가 있나요?",
    options: [
      { value: "none", text: "없어요" },
      { value: "yes", text: "질병·출산·육아로 쉰 기간이 있어요" },
    ],
  },
];

const CHECKER_RESULTS = [
  {
    when: { period: "over9m", extend: "none" },
    pass: true,
    headline: "피보험기간 180일 충족 가능성 높아요",
    detail: "이직일 이전 18개월 안에 9개월 이상 근무했다면 180일을 충족할 가능성이 높아요. 정확한 날수는 고용24에서 피보험단위기간을 조회해 보세요.",
    badges: ["180일 충족 가능", "수급자격 기대"],
    links: [{ icon: "📋", title: "피보험단위기간 조회 방법", desc: "고용24 로그인 후 조회", href: "/w/실업급여-피보험단위기간" }],
  },
  {
    when: { period: "over9m", extend: "yes" },
    pass: true,
    headline: "기준기간 연장 적용 시 더 유리해요",
    detail: "질병·출산·육아 기간만큼 기준기간이 연장돼요. 최대 3년까지 늘어나니 더 오래된 근무 이력도 포함될 수 있어요.",
    badges: ["180일 충족 가능", "기준기간 연장"],
    links: [{ icon: "📋", title: "기준기간 연장 조건", desc: "연장 사유별 증빙 서류", href: "/w/실업급여-수급기간-몇개월-받나요" }],
  },
  {
    when: { period: "6to9m", extend: "none" },
    pass: false,
    headline: "단독으로는 180일이 부족할 수 있어요",
    detail: "6~9개월 근무라면 180일이 될 수도, 안 될 수도 있어요. 이전 직장 근무 이력이 기준기간 내에 있다면 합산할 수 있어요.",
    badges: ["합산 검토 필요"],
    links: [{ icon: "🔍", title: "이전 직장 합산 방법", desc: "고용24 가입이력 조회 후 합산", href: "/w/실업급여-피보험단위기간" }],
  },
  {
    when: { period: "6to9m", extend: "yes" },
    pass: true,
    headline: "기준기간 연장하면 합산 범위가 넓어져요",
    detail: "연장된 기준기간 안에 이전 직장 근무일도 포함될 수 있어요. 고용센터에서 정확한 피보험단위기간을 확인해보세요.",
    badges: ["합산 가능", "기준기간 연장"],
    links: [{ icon: "📋", title: "피보험기간 합산 방법", desc: "여러 직장 합산 기준", href: "/w/실업급여-피보험단위기간" }],
  },
  {
    when: { period: "under6m", extend: "none" },
    pass: false,
    headline: "단독으로는 180일 충족이 어려워요",
    detail: "최근 직장 근무가 6개월 미만이면 이전 직장 합산이 필요해요. 이전 직장이 기준기간(18개월) 안에 있어야 합산 가능해요.",
    badges: ["합산 필요"],
    links: [{ icon: "🔍", title: "이전 직장 합산 조건", desc: "기준기간 내 근무 여부 확인", href: "/w/실업급여-피보험단위기간" }],
  },
  {
    when: { period: "under6m", extend: "yes" },
    pass: false,
    headline: "기준기간 연장 후 합산 여부를 직접 따져봐야 해요",
    detail: "연장된 기준기간(최대 3년) 안에 이전 직장 이력이 있는지 확인해야 해요. 고용센터에서 전체 피보험이력을 조회해보세요.",
    badges: ["연장 후 합산 검토"],
    links: [{ icon: "📋", title: "기준기간 연장 신청", desc: "연장 사유별 필요 서류 확인", href: "/w/실업급여-수급기간-몇개월-받나요" }],
  },
  {
    when: { period: "multi", extend: "none" },
    pass: true,
    headline: "여러 직장 합산은 가능해요 (조건 확인 필요)",
    detail: "기준기간(이직일 이전 18개월) 안에 있는 모든 직장의 피보험단위기간을 합산할 수 있어요. 고용24에서 가입이력 조회 후 계산해보세요.",
    badges: ["합산 가능", "기준기간 내 근무"],
    links: [{ icon: "📋", title: "가입이력 조회 방법", desc: "고용24 로그인 후 조회", href: "/w/실업급여-피보험단위기간" }],
  },
  {
    when: { period: "multi", extend: "yes" },
    pass: true,
    headline: "연장 기준기간 + 합산으로 충족 가능성 높아요",
    detail: "기준기간이 최대 3년까지 연장되면 더 오래된 직장 이력도 포함돼요. 고용센터에 연장 사유와 합산 이력을 함께 제출하세요.",
    badges: ["합산 가능", "기준기간 연장"],
    links: [{ icon: "📋", title: "기준기간 연장 신청", desc: "연장 사유별 필요 서류", href: "/w/실업급여-수급기간-몇개월-받나요" }],
  },
];

const CHECKER_DEFAULT = {
  pass: false,
  headline: "조건을 모두 선택해 주세요",
  detail: "근무 기간과 연장 사유를 선택하면 피보험기간 충족 여부를 바로 알려드려요.",
  badges: [],
  links: [],
};

const CALC_STEPS = [
  { label: "이직일 기준 18개월 역산", detail: "퇴직일로부터 18개월 전 날짜가 기준기간 시작일이에요" },
  { label: "기준기간 내 전 직장 피보험이력 조회", detail: "고용24 → 고용보험 가입이력에서 직접 확인해요" },
  { label: "직전 실업급여 수급 여부 확인", detail: "수급 이전 이력은 초기화되어 합산 불가해요" },
  { label: "기준기간 내 피보험단위기간 합산", detail: "합산 180일 이상이면 수급자격 충족이에요" },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 수급자격 · 기준기간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 기준기간 18개월<br />
        피보험 180일 합산 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기준기간(18개월)과 피보험단위기간(180일)은 완전히 다른 개념이에요.
        18개월은 기간의 범위고, 180일은 그 안에서 실제로 일한 날수예요.
        여러 직장을 다녔어도 기준기간 안에 있으면 합산할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기준기간 18개월과 피보험 180일의 차이</H2>
      <p style={body}>
        실업급여 신청 조건을 찾아보면 "기준기간 18개월"과 "피보험기간 180일"이 함께 나와요.
        두 개념을 혼동하면 내가 조건을 충족하는지 제대로 계산할 수 없어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>의미</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "기준기간", meaning: "피보험기간을 인정받는 기간의 범위", standard: "이직일 이전 18개월 (연장 시 최대 3년)" },
              { label: "피보험단위기간", meaning: "기준기간 안에서 실제로 일한 날수", standard: "180일 이상 충족해야 수급자격 발생" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.meaning}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">고용보험법 제40조</a> 기준
        </p>
      </GreenBox>

      <p style={body}>
        주5일제 기준으로 한 달에 약 20~22일이 쌓여요. 9개월을 꾸준히 다녔다면 180일을 충족할 수 있어요.
        무급휴직·무급휴가·결근일은 제외되고, 유급 휴일과 주휴일은 포함이에요.
      </p>

      <H2>이직일 이전 18개월 역산하는 법</H2>
      <p style={body}>
        기준기간은 퇴직(이직)한 날로부터 역산해서 18개월이에요.
        2026년 2월 28일에 퇴직했다면 기준기간은 2024년 8월 28일~2026년 2월 28일이에요.
        이 기간 밖에서 일한 날은 피보험기간 계산에 포함되지 않아요.
      </p>

      <BorderBox>
        <strong>기준기간 연장 사유 (최대 3년)</strong><br />
        질병·부상으로 일을 못한 기간<br />
        임신·출산·육아로 쉰 기간<br />
        병역 복무 기간<br />
        재해 등 불가피한 사유<br />
        <br />
        예시: 육아휴직 12개월 → 기준기간 18개월 + 12개월 = 30개월로 연장<br />
        <br />
        ★ 연장 신청 시 고용센터에 이직확인서 + 사유 증빙(진단서·출생증명서 등) 제출
      </BorderBox>

      <p style={body}>
        주의할 점이 있어요. 과거에 실업급여를 받은 적이 있으면 그 이전 이력은 초기화돼요.
        2022년에 실업급여를 받고 재취업했다면 2022년 이전 경력은 합산 대상에서 제외돼요.
        퇴직 전에 미리 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">고용24</a>에서 피보험단위기간을 조회해두면 좋아요.
      </p>

      <H2>여러 직장 피보험 180일 합산하는 법</H2>
      <p style={body}>
        여러 직장을 다닌 경우, 기준기간(18개월) 안에 있는 모든 직장의 피보험단위기간을 합산할 수 있어요.
        A회사 120일 + B회사 80일이 모두 기준기간 안에 있다면 합산 200일로 180일 충족이에요.
      </p>

      <DocTable
        headers={["단계", "내용", "확인 방법"]}
        rows={CALC_STEPS.map((s, i) => [`${i + 1}단계`, s.label, s.detail])}
      />

      <p style={body}>
        정확한 피보험단위기간은 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75" }} target="_blank" rel="noopener noreferrer">고용24</a>에 로그인해서 "고용보험 가입이력"을 조회하면 날짜별 근무 이력이 나와요.
        기준기간 안에 얼마나 쌓였는지 직접 계산할 수 있어요.
      </p>

      <H2>피보험 180일 충족 여부 체커</H2>
      <p style={body}>
        근무 기간과 연장 사유를 선택하면 180일 충족 여부를 바로 확인할 수 있어요.
      </p>

      
      <EligibilityChecker
        title="피보험기간 180일 충족 여부 체커"
        subtitle="내 근무 기간이 기준기간 안에 들어오는지 30초 확인"
        intro="이직일 기준으로 18개월을 역산해요. 해당하는 근무 상황을 선택해 주세요."
        groups={CHECKER_GROUPS}
        results={CHECKER_RESULTS}
        defaultResult={CHECKER_DEFAULT}
      />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 고용보험법 기준으로 작성됐어요. 기준기간 연장 사유와 피보험단위기간 계산 방식은 변경될 수 있으니 고용센터 또는 고용24에 문의하시길 권해요." />
    </ArticleLayout>
  );
}
