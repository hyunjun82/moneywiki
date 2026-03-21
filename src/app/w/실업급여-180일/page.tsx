"use client";

// Q1. 퇴직 후 "실업급여 180일"이라는 말이 헷갈려서 실제로 얼마나 받는지 확인하는 상황
// Q2. 내 나이+가입기간으로 실제 수급일수 확인 → 수급 기간 역산 → 12개월 이내 신청
// Q3. 180일=자격조건(18개월내 180일 이상)/실제수급은 120~270일/퇴직후 12개월 이내 신청 필수
// Q4. GreenBox(나이+가입기간별 수급일수 표) + BorderBox(180일 계산 특이사항) + Steps(신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "180일이 정확히 몇 개월인가요?",
    a: "주 5일 기준으로 약 6~8개월이에요. 회사에서 급여를 준 날(근무일 + 유급휴가일)을 세는 방식이라 정확히 6개월 근무했다고 180일이 되는 건 아니에요. 보통 7~8개월은 다녀야 180일을 채워요.",
  },
  {
    q: "180일을 채워야 실업급여를 받는 건가요?",
    a: "네, 퇴직 전 18개월 동안 고용보험에 180일 이상 가입되어 있어야 수급자격이 생겨요. 이건 신청 조건이고, 실제로는 나이와 가입기간에 따라 120~270일을 받아요.",
  },
  {
    q: "퇴직 후 180일 동안만 받는 건가요?",
    a: "아니에요. 180일은 자격 조건일 뿐이에요. 실제 수급 기간은 나이와 가입기간에 따라 따로 정해져요. 50세 미만이고 가입기간이 3년 미만이면 120일, 최대 270일까지 받을 수 있어요.",
  },
  {
    q: "여러 직장 가입기간을 합산할 수 있나요?",
    a: "네, 퇴직 전 18개월 내에 여러 직장에서 일한 고용보험 가입일수를 모두 합산해요. A회사 3개월, B회사 5개월이면 합산 180일이 될 수 있어요. 단, 이전에 실업급여를 받은 적 있으면 그 이후 기간부터만 새로 세요.",
  },
  {
    q: "퇴직 후 바로 신청해야 하나요?",
    a: "퇴직 후 12개월 이내에만 신청하면 돼요. 하지만 늦게 신청할수록 받을 수 있는 기간이 줄어들 수 있어요. 퇴직하면 빠르게 고용센터에 방문하거나 고용24에서 신청하는 게 좋아요.",
  },
];

const APPLY_STEPS = [
  { title: "이직확인서 확인", desc: "퇴직 후 회사가 고용센터에 이직확인서를 제출해야 해요. 늦어지면 고용센터에 연락해서 상황을 살펴봐요." },
  { title: "워크넷 구직신청", desc: "워크넷(work.go.kr)에 접속해서 구직신청을 해요. 온라인으로 진행 가능해요." },
  { title: "고용센터 방문 신청", desc: "주소지 관할 고용센터에 방문하거나 고용24(ei.go.kr)에서 인터넷 신청해요. 퇴직 후 12개월 이내에 해야 해요." },
  { title: "수급자격 인정 후 실업인정", desc: "수급자격 인정 후 4주마다 실업인정을 받아요. 구직활동을 증빙해야 급여가 지급돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 - 법제처", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 모의계산", url: "https://www.ei.go.kr/ei/m/pf/MOW-PF-00-180-C.html" },
      { label: "찾기쉬운 생활법령정보 - 구직급여 수급일수", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "자발적 퇴직이 아닌 경우 자격 기준이에요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산", description: "기초일액과 실제 수령액 계산 방법이에요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "고용센터 방문부터 첫 실업인정까지 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 수급기간 · 180일</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 180일, 자격 조건과<br />
        실제 수급 기간 계산하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        180일은 신청 자격 조건이에요. 실제로 받는 기간은 따로 계산해요.
        나이와 고용보험 가입기간에 따라 120일부터 270일까지 받을 수 있어요.
        퇴직 후 12개월 이내에 반드시 신청해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>180일은 신청 자격 조건이에요</H2>
      <p style={body}>
        퇴직 전 18개월 동안 고용보험에 가입한 날이 180일 이상이어야 실업급여 신청 자격이 생겨요.
        <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용보험법</a>에서
        정한 최소 기준이에요.
      </p>
      <p style={body}>
        180일을 세는 방식이 조금 특이해요.
        회사에서 급여를 준 날(근무일 + 유급휴가일)을 세거든요.
        주 5일 기준으로 보통 7~8개월은 다녀야 180일을 채울 수 있어요.
        정확히 6개월 일했다고 180일이 되는 건 아니에요.
      </p>
      <p style={body}>
        여러 직장에서 일한 가입일수는 합산돼요.
        퇴직 전 18개월 내에 A회사 3개월, B회사 5개월을 다녔다면 두 기간을 더해요.
        단, 이전에 실업급여를 받은 적 있으면 그 이후 기간부터만 새로 계산해요.
      </p>

      <BorderBox>
        <strong>180일 계산 핵심 포인트</strong><br />
        계산 기간: 퇴직 전 18개월 이내<br />
        계산 방식: 급여를 받은 날 (근무일 + 유급휴가일)<br />
        여러 직장 합산: 가능 (18개월 이내 모든 직장)<br />
        이전 수급 이력: 수급 후 기간은 리셋<br />
        <br />
        ★ 180일 미달이면 실업급여 받을 수 없음 (부분 지급 없음)
      </BorderBox>

      <H2>실제로 받는 기간은 따로예요</H2>
      <p style={body}>
        많은 분들이 "180일 조건을 채웠으니 180일 동안 받겠지"라고 생각해요.
        하지만 실제 수급 기간은 나이와 고용보험 가입기간에 따라 별도로 정해져요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>나이·가입기간별 실업급여 수급일수 (소정급여일수)</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>나이</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>가입기간</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>수급일수</th>
            </tr>
          </thead>
          <tbody>
            {[
              { age: "50세 미만", period: "1년 이상 3년 미만", days: "120일" },
              { age: "50세 미만", period: "3년 이상 5년 미만", days: "150일" },
              { age: "50세 미만", period: "5년 이상 10년 미만", days: "180일" },
              { age: "50세 미만", period: "10년 이상", days: "240일" },
              { age: "50세 이상 / 장애인", period: "1년 이상 3년 미만", days: "150일" },
              { age: "50세 이상 / 장애인", period: "3년 이상 5년 미만", days: "180일" },
              { age: "50세 이상 / 장애인", period: "5년 이상 10년 미만", days: "210일" },
              { age: "50세 이상 / 장애인", period: "10년 이상", days: "270일" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", whiteSpace: "nowrap" }}>{row.age}</td>
                <td style={{ padding: "5px 8px" }}>{row.period}</td>
                <td style={{ padding: "5px 8px", fontWeight: 700, color: "#1D9E75" }}>{row.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 정확한 수급일수는 고용24 모의계산으로 확인 / 나이 기준은 퇴직일 기준
        </p>
      </GreenBox>

      <p style={body}>
        예를 들어 35세에 퇴직하고 고용보험 가입기간이 5년 3개월이라면 180일을 받아요.
        25세에 2년 3개월 근무하고 퇴직했다면 180일 자격 조건은 만족했지만
        실제 수급 기간은 120일이 돼요.
      </p>

      <H2>실업급여 신청 절차</H2>
      <p style={body}>
        퇴직 후 12개월 이내에 신청해야 해요.
        늦어지면 받을 수 있는 총 기간이 줄어들 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>실제 수령 기간 계산 예시</H2>
      <p style={body}>
        45세, 가입기간 6년 2개월인 경우를 예시로 볼게요.
        수급일수는 180일이에요.
      </p>
      <p style={body}>
        2026년 2월 10일에 고용센터에서 신청하면 약 7일 심사 후 수급자격 인정,
        2월 20일경부터 실업인정이 시작돼요.
        4주마다 실업인정을 받으면서 급여가 지급되고, 약 6개월 후인 8월 20일 무렵까지 받아요.
      </p>
      <p style={body}>
        180일이라도 연속으로 6개월 동안 받는 게 아니에요.
        4주마다 구직활동을 증빙해야 하고, 일을 한 기간은 제외돼요.
        실제로는 8~9개월에 걸쳐 180일치를 받게 되는 경우가 많아요.
      </p>

      <BorderBox>
        <strong>신청 기한 주의사항</strong><br />
        퇴직 후 12개월 이내에 신청 필수<br />
        예시: 2026년 1월 31일 퇴직 → 2027년 1월 31일까지<br />
        2027년 2월 1일 신청 = 자격 없음<br />
        <br />
        이직확인서가 늦어지면 → 퇴직 후 바로 고용센터에 연락
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 고용보험법 기준으로 작성됐어요. 수급일수와 신청 절차는 변경될 수 있으니 고용24 또는 고용센터에서 최신 정보를 살펴봐요." />
    </ArticleLayout>
  );
}
