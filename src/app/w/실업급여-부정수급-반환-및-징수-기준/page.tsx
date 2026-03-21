"use client";

// Q1. 실업급여 받는 중에 취업하거나 구직활동을 허위로 제출했는데, 이미 부정수급이 된 것 같아서 얼마나 토해내야 하는지 확인하는 상황
// Q2. 내 상황(자진신고 가능 여부 + 공모 여부)에 따른 반환 금액과 추가 징수 배율을 파악하고, 자진신고 여부를 결정한다
// Q3. 단독 적발 시 최대 2배 추가징수 / 사업주 공모 시 최대 5배 / 자진신고 하면 추가징수 면제 / 이미 조사 시작 후엔 자진신고 불가
// Q4. GreenBox(유형별 징수 기준 표) + BorderBox(자진신고 조건 상세) + Steps(자진신고 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "부정수급 반환 금액을 한 번에 못 내면 어떻게 되나요?",
    a: "고용센터에 분할납부를 신청할 수 있어요. 납부 능력을 심사해서 분할 허용 여부를 결정해요. 단, 체납이 계속되면 재산 압류 등 강제 징수 절차가 진행될 수 있어요.",
  },
  {
    q: "자진신고 면제는 언제까지 가능한가요?",
    a: "적발되기 전이면 언제든지 가능해요. 단, 고용센터에서 이미 조사 통보를 받았거나 적발 후라면 자진신고 혜택이 적용되지 않아요. 의심 상황이면 조사 통보 전에 먼저 신고하는 게 좋아요.",
  },
  {
    q: "아르바이트 수입이 적었는데도 부정수급이 되나요?",
    a: "네, 수입 금액보다 취업 사실 자체가 기준이에요. 소득이 적어도 취업 여부를 신고하지 않으면 부정수급에 해당할 수 있어요. 단기 아르바이트도 신고 대상이에요.",
  },
  {
    q: "사업주가 이직확인서를 허위로 써줬는데 나도 처벌받나요?",
    a: "수급자가 허위 이직확인서 발급을 알고 있었다면 공모로 볼 수 있어요. 이 경우 최대 5배 추가 징수 대상이 되고 형사처벌도 받을 수 있어요. 본인이 몰랐다면 단독 부정수급으로 처리될 수 있어요.",
  },
  {
    q: "부정수급 조사 통보를 받으면 어떻게 해야 하나요?",
    a: "고용센터 출석 통보에 따라 출석해서 경위서를 작성해야 해요. 부정수급 금액과 징수 배율은 고용센터에서 결정해요. 이의가 있으면 이의신청과 행정심판을 거칠 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제62조 - 부정수급에 대한 반환명령 및 추가징수", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 부정수급 자진신고 안내", url: "https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-부정수급", title: "실업급여 부정수급 유형과 처벌 기준", description: "어떤 행위가 부정수급에 해당하는지 정리했어요." },
  { slug: "실업급여-알바-미신고", title: "실업급여 받으면서 알바하면 미신고 기준", description: "취업 인정 기준과 자진신고 감면 방법이에요." },
  { slug: "실업급여-구직활동", title: "실업급여 구직활동 인정 기준", description: "어떤 구직활동이 인정되는지 정리했어요." },
];

const SELF_REPORT_STEPS = [
  { title: "고용24 또는 고용센터 방문", desc: "고용24(work24.go.kr) 로그인 후 부정수급 자진신고 메뉴 이용, 또는 담당 고용센터에 직접 방문해요." },
  { title: "부정수급 경위서 작성", desc: "부정수급 유형, 기간, 금액을 기재해요. 취업 사실 미신고라면 취업 기간과 소득을 정확히 적어요." },
  { title: "반환 금액 확정", desc: "담당자가 신고 내용을 검토하고 반환 금액을 확정해요. 자진신고 인정 시 추가 징수는 면제돼요." },
  { title: "반환 납부", desc: "확정 금액을 지정 기한 내에 납부해요. 한 번에 납부가 어려우면 분할납부를 신청할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 부정수급 · 반환징수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 부정수급 반환 및 징수 기준<br />
        자진신고 면제 조건까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부정수급이 적발되면 받은 급여를 전액 돌려줘야 해요.
        단독 적발이면 최대 2배, 사업주 공모면 최대 5배 추가 징수까지 더해져요.
        적발 전에 자진신고하면 추가 징수가 면제돼서 전액 반환만 하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>부정수급 유형별 반환 및 징수 기준</H2>
      <p style={body}>
        부정수급 처리 기준은 어떤 방식으로 적발됐느냐, 사업주가 공모했느냐에 따라 크게 달라져요.
        자진신고는 추가 징수를 피할 수 있는 유일한 방법이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>반환</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>추가 징수</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>자진신고 시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "단독 적발", refund: "전액", extra: "최대 2배", self: "추가 징수 면제" },
              { type: "사업주 공모 적발", refund: "전액 (연대)", extra: "최대 5배", self: "혜택 제한" },
              { type: "적발 전 자진신고", refund: "전액", extra: "없음", self: "면제 적용" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.type}</td>
                <td style={{ padding: "5px 8px" }}>{row.refund}</td>
                <td style={{ padding: "5px 8px", color: row.extra === "없음" ? "#1D9E75" : "#e53e3e", fontWeight: 600 }}>{row.extra}</td>
                <td style={{ padding: "5px 8px" }}>{row.self}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 고용보험법 제62조 기준 / 단독 적발 최대 총 3배, 공모 시 최대 총 6배 청구
        </p>
      </GreenBox>

      <p style={body}>
        받은 급여가 300만 원이라면 단독 적발 시 최대 900만 원(전액 300만 원 + 추가 600만 원)이 청구될 수 있어요.
        사업주 공모라면 최대 1,800만 원(전액 300만 원 + 추가 1,500만 원)까지 커져요.
      </p>

      <H2>사업주 공모 시 5배 추가징수 기준</H2>
      <p style={body}>
        사업주가 이직 사유를 허위로 기재하거나 급여명세서를 조작해서 부정수급을 도운 경우,
        수급자와 사업주가 함께 연대 책임을 지게 돼요.
      </p>

      <BorderBox>
        <strong>사업주 공모 인정 사례</strong><br />
        · 이직확인서에 해고로 기재했지만 실제로는 자발적 퇴사<br />
        · 급여명세서에 가공 임금 기재로 수급액 부풀리기<br />
        · 재취업 사실을 함께 숨기기로 합의<br />
        <br />
        <strong>처벌 수위</strong><br />
        · 수급자: 전액 반환 + 최대 5배 추가 징수<br />
        · 사업주: 연대 반환 책임 + 형사처벌 가능 (고용보험법 위반)<br />
        · 두 사람의 책임이 분리되지 않고 연대해서 납부해야 해요<br />
        <br />
        ★ 사업주가 단독으로 이직확인서를 허위 작성해도 공모로 볼 수 있어요
      </BorderBox>

      <H2>자진신고 추가징수 면제 조건</H2>
      <p style={body}>
        적발되기 전에 먼저 신고하면 받은 급여 전액만 돌려주면 돼요.
        최대 2배의 추가 징수는 부과되지 않아서, 자진신고가 훨씬 유리해요.
      </p>

      <BorderBox>
        <strong>자진신고 면제 조건</strong><br />
        · 고용센터 조사 통보를 받기 전에 신고해야 해요<br />
        · 이미 적발 통보를 받았으면 자진신고 혜택 불가<br />
        · 사업주 공모의 경우 면제 범위가 달라질 수 있어요<br />
        <br />
        <strong>자진신고가 유리한 경우</strong><br />
        · 취업 사실을 신고 안 했는데 아직 적발되지 않은 경우<br />
        · 허위 구직활동 신청을 했지만 아직 조사 시작 전인 경우<br />
        · 소득이 발생했는데 신고하지 않은 기간이 있는 경우
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>자진신고 절차</H2>
      <p style={body}>
        자진신고는 고용24나 고용센터 방문으로 할 수 있어요.
        신고 후 담당자가 반환 금액을 확정하고 납부 방법을 안내해 줘요.
      </p>

      <Steps steps={SELF_REPORT_STEPS} />

      <p style={body}>
        고용24(<a href="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" style={{ color: "#1D9E75" }}>work24.go.kr</a>)에서 온라인 자진신고가 가능해요.
        신고 전에 고용센터 상담 전화(1350)로 먼저 물어보면 절차를 안내받을 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험법 제62조 기준으로 작성됐어요. 부정수급 징수 배율과 자진신고 면제 범위는 사안에 따라 달라질 수 있으니 고용센터 또는 고용노동부(1350)에 문의하시길 권해요." />
    </ArticleLayout>
  );
}
