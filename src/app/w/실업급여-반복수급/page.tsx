"use client";

// Q1. 작년에도 실업급여를 받았는데 이번엔 덜 받는다고 해서 감액 기준을 찾는 상황
// Q2. 내 수급 횟수 확인 후 감액률 파악 → 실제 수령액 계산
// Q3. 5년 내 3회부터 감액 시작(10%), 4회 25%, 5회 이상 50%, 이직일 기준 5년, 재취업활동계획서 의무
// Q4. GreenBox(감액률 비교표) + BorderBox(재취업활동계획서 의무) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "5년 기산점은 언제부터인가요?",
    a: "이직일 기준으로 직전 5년을 계산해요. 이번 이직일로부터 5년 전까지의 수급 횟수를 세요. 이직일이 다르면 기준 날짜도 달라져요.",
  },
  {
    q: "감액은 전체 기간에 다 적용되나요?",
    a: "네, 소정급여일수 전체에 감액이 적용돼요. 3회째 수급이면 수급 기간 전체 지급액의 10%를 깎아요. 하한액도 감액 대상이 돼요.",
  },
  {
    q: "자발적 이직도 반복수급 횟수에 포함되나요?",
    a: "자발적 이직으로 수급 자격이 제한된 경우는 횟수에 포함되지 않을 수 있어요. 실제로 수급을 받은 경우만 횟수에 포함돼요. 정확한 이력은 고용센터에서 조회해야 해요.",
  },
  {
    q: "재취업활동계획서를 안 내면 어떻게 되나요?",
    a: "계획서를 제출하지 않으면 실업인정이 거부될 수 있어요. 반복수급자는 일반 수급자보다 구직활동 기준이 엄격하게 적용돼요.",
  },
  {
    q: "하한액도 감액이 되나요?",
    a: "네, 기초일액이 하한액에 해당하는 사람도 감액이 적용돼요. 예를 들어 5회 이상 수급이면 하한액(66,048원)의 50%인 33,024원이 최저 지급선이에요.",
  },
];

const COUNT_CHECK_STEPS = [
  { title: "이직일 기준 5년 역산", desc: "이번 이직일로부터 5년 전 날짜를 계산해요. 그 날짜 이후 수급 이력이 반복수급 계산 대상이에요." },
  { title: "고용24에서 수급 이력 조회", desc: "고용24(work24.go.kr) 로그인 후 수급 이력 메뉴에서 과거 수급 횟수를 조회해요." },
  { title: "횟수 합산", desc: "이번 수급을 포함해 5년 내 수급 횟수를 세요. 실제로 급여를 받은 경우만 카운트해요." },
  { title: "감액률 적용", desc: "3회면 10%, 4회면 25%, 5회 이상이면 50%가 기초일액에서 삭감돼요. 소정급여일수 전체에 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제60조 - 반복수급에 따른 감액", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업급여 수급 이력 조회", url: "https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-구직활동", title: "실업급여 구직활동", description: "차수별 구직활동 횟수와 인정 기준이에요." },
  { slug: "실업급여-부정수급", title: "실업급여 부정수급", description: "감액보다 무거운 형사처벌 기준이에요." },
  { slug: "실업급여-기초일액", title: "실업급여 기초일액", description: "실제 수령액 계산 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 반복수급 · 감액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 반복수급 감액<br />
        5년 3회부터 10%·25%·50% 삭감
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        작년에도 실업급여를 받았다면 이번엔 덜 받을 수 있어요.
        직전 5년 내 3회째 수급부터 감액이 시작되고, 횟수가 늘수록 삭감률이 올라가요.
        내 수급 횟수 먼저 파악하면 실제 수령액을 미리 계산할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>반복수급 감액은 얼마나 되나요?</H2>
      <p style={body}>
        반복수급 감액은 직전 5년 내 수급 횟수를 기준으로 계산해요.
        <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용보험법 제60조</a>에서
        이직일 전 5년 이내에 3회 이상 실업급여를 받으면 감액한다고 정하고 있어요.
      </p>
      <p style={body}>
        감액은 기초일액(1일 지급액)에 바로 적용돼요.
        3회째 수급이면 10%, 4회째면 25%, 5회 이상이면 50%를 삭감한 금액으로
        소정급여일수 전체를 받아요.
        기초일액이 68,100원인 사람이 5회째 수급을 하면 34,050원만 받게 돼요.
      </p>
      <p style={body}>
        감액이 적용되더라도 하한액의 감액분보다 낮아지지는 않아요.
        하한액(66,048원)에 50%를 적용하면 33,024원이에요.
        이 이하로 내려가지 않아요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>반복수급 감액률별 지급액 비교 (기초일액 68,100원 기준)</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>수급 횟수</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>감액률</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>1일 지급액</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>180일 총액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { count: "1~2회", rate: "없음", daily: "68,100원", total: "12,258,000원" },
              { count: "3회", rate: "10%", daily: "61,290원", total: "11,032,200원" },
              { count: "4회", rate: "25%", daily: "51,075원", total: "9,193,500원" },
              { count: "5회 이상", rate: "50%", daily: "34,050원", total: "6,129,000원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.count}</td>
                <td style={{ padding: "5px 8px", color: i >= 1 ? "#c00" : "#333" }}>{row.rate}</td>
                <td style={{ padding: "5px 8px" }}>{row.daily}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 5회 이상이면 처음 대비 절반만 지급 / 소정급여일수는 동일
        </p>
      </GreenBox>

      <H2>5년 3회 기준, 어떻게 계산하나요?</H2>
      <p style={body}>
        '5년 3회'는 이직일 기준으로 직전 5년 이내에 실업급여를 받은 횟수를 계산해요.
        이번 수급을 포함해서 3번째가 되면 감액 대상이에요.
        이전 수급이 얼마나 오래전인지보다 5년 내 횟수가 기준이에요.
      </p>
      <p style={body}>
        감액 기준이 되는 '수급'은 실업급여를 실제로 받은 경우를 뜻해요.
        수급자격을 인정받았더라도 자진 취업해서 실제로 받지 않았거나,
        자발적 이직으로 수급 자격이 제한된 경우는 횟수에 포함되지 않을 수 있어요.
      </p>
      <p style={body}>
        예를 들어 2021년, 2023년, 2025년에 각각 수급했다면,
        2025년 이직일 기준 직전 5년(2020~2025년)을 보면 3회가 돼서 감액 대상이에요.
        감액 대상인지 확실하지 않다면 고용센터에서 피보험 이력을 조회해 정확하게 확인할 수 있어요.
      </p>

      <BorderBox>
        <strong>내 반복수급 횟수 확인 방법</strong><br />
        <a href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용24 수급 이력 조회</a> → 로그인 → 수급 이력 페이지<br />
        또는 고용센터 방문해서 피보험 이력 조회 요청<br />
        <br />
        <strong>기산점 계산 예시</strong><br />
        2025년 10월 15일 이직 → 2020년 10월 15일 이후 수급 횟수 계산<br />
        이 기간에 3회 이상이면 감액 대상
      </BorderBox>

      <H2>내 수급 횟수 확인하는 4단계</H2>
      <p style={body}>
        감액 대상인지 스스로 계산하려면 이 순서대로 따라가면 돼요.
      </p>

      <Steps steps={COUNT_CHECK_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>재취업활동계획서, 반복수급자는 필수예요</H2>
      <p style={body}>
        반복수급자에게는 재취업활동계획서 제출 의무가 추가로 부과돼요.
        5년 내 3회 이상 수급한 경우 수급 초기에 고용센터에서 재취업 계획을 수립하고 제출해야 해요.
      </p>
      <p style={body}>
        재취업활동계획서에는 희망 직종, 취업 목표, 구직활동 방법 등을 기재해요.
        단순 형식이 아니라 실제 취업 의지를 보여주는 계획이어야 해요.
        고용센터 직업상담사와 면담을 통해 작성하는 경우도 있어요.
      </p>
      <p style={body}>
        계획서를 제출하지 않으면 실업인정이 거부될 수 있어요.
        반복수급자는 일반 수급자보다 구직활동 기준이 엄격하게 적용될 수 있으니,
        첫 실업인정일 이전에 미리 고용센터에 문의하는 게 좋아요.
      </p>

      <GreenBox>
        <strong>반복수급자 추가 의무 요약</strong><br />
        재취업활동계획서 제출 (수급 초기, 고용센터 방문)<br />
        구직활동 기준 강화 적용<br />
        직업상담사 면담 진행될 수 있음<br />
        <br />
        ★ 첫 실업인정일 전에 고용센터에 미리 연락해서 준비 서류 확인
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 고용보험법 제60조 기준으로 작성됐어요. 감액률과 하한액은 매년 변경될 수 있으니 고용센터에 최신 기준을 문의하시길 권해요." />
    </ArticleLayout>
  );
}
