"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여 신청하려는데 피보험기간이 180일이 됐는지, 이전 직장까지 합산되는지 모르는 상황
// Q2. 고용24에서 피보험기간 조회 → 180일 충족 여부 확인 → 미충족이면 합산 방법 파악
// Q3. 18개월 내 180일, 합산 조건(이전 수급 안 했고 1년 내 재취업), 포함/제외 항목, 수급일수 결정
// Q4. GreenBox(수급일수 표) + BorderBox(합산 조건) + Steps(고용24 조회 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "피보험기간 180일이 뭐예요?",
    a: "고용보험에 가입되어 일한 기간이 퇴직 전 18개월 안에 180일 이상이어야 해요. 이 조건을 충족해야 실업급여를 받을 수 있어요.",
  },
  {
    q: "이전 직장 기간도 합산되나요?",
    a: "네. 이전 직장에서 실업급여를 받지 않았고, 퇴사 후 1년 이내에 재취업했으면 합산돼요. 조건만 맞으면 여러 직장 기간을 모두 더할 수 있어요.",
  },
  {
    q: "육아휴직 기간도 피보험기간에 포함되나요?",
    a: "네. 육아휴직 기간은 고용보험 가입이 유지돼요. 피보험기간으로 인정돼요. 무급휴직은 제외돼요.",
  },
  {
    q: "실업급여 받고 다시 취업하면 피보험기간이 리셋되나요?",
    a: "네. 실업급여를 받으면 그 이전 피보험기간은 리셋돼요. 다시 취업해서 새로 쌓아야 해요.",
  },
  {
    q: "피보험기간은 어디서 확인해요?",
    a: "고용24(ei.go.kr)에 로그인 후 [개인서비스] → [조회] → [피보험자격 이력 조회]에서 확인할 수 있어요. 언제부터 언제까지 어느 회사에서 가입됐는지 나와요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 (피보험기간 규정)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 피보험자격 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-180일", title: "실업급여 180일 조건", description: "180일 계산 방법을 자세히 정리했어요." },
  { slug: "실업급여-수급기간", title: "실업급여 수급기간", description: "피보험기간에 따라 얼마나 받는지예요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "자발적 퇴사, 권고사직 등 자격 조건이에요." },
];

const STEPS = [
  { title: "고용24 접속 후 로그인", desc: "ei.go.kr에 접속해서 공동인증서 또는 간편인증으로 로그인해요." },
  { title: "[개인서비스] → [조회] 클릭", desc: "상단 메뉴에서 개인서비스를 선택하고 조회 항목을 눌러요." },
  { title: "[피보험자격 이력 조회] 선택", desc: "내가 다닌 회사별 고용보험 가입 기간이 날짜별로 나와요." },
  { title: "피보험 단위기간 합산 확인", desc: "18개월 내 피보험기간이 180일 이상인지 확인해요. 이전 직장 기간도 함께 표시돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 피보험기간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 피보험기간 180일<br />
        계산법과 이전 직장 합산 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        피보험기간은 고용보험에 가입되어 일한 기간이에요. 퇴직 전 18개월 안에 180일 이상이어야 실업급여를 받을 수 있고,
        기간이 길수록 더 오래 받아요. 이전 직장 기간도 조건만 맞으면 합산돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>피보험기간이 왜 중요한가요</H2>
      <p style={body}>
        두 가지를 결정해요. 첫째, 수급자격이에요. 퇴직 전 <strong>18개월 내 피보험기간이 180일 이상</strong>이어야 해요.
        180일이 안 되면 실업급여를 아예 받지 못해요.
      </p>
      <p style={body}>
        둘째, 수급일수예요. 피보험기간이 길수록 실업급여를 오래 받아요.
        1년 미만이면 120일, 10년 이상이면 최대 270일까지 받을 수 있어요.
      </p>

      <GreenBox>
        <strong>피보험기간별 수급일수 (2026년 기준)</strong><br />
        <br />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>피보험기간</th>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>50세 미만</th>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>50세 이상</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일", "120일"],
              ["1~3년", "150일", "180일"],
              ["3~5년", "180일", "210일"],
              ["5~10년", "210일", "240일"],
              ["10년 이상", "240일", "270일"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "4px 8px", fontWeight: 600 }}>{row[0]}</td>
                <td style={{ padding: "4px 8px" }}>{row[1]}</td>
                <td style={{ padding: "4px 8px" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 장애인, 만 60세 이상은 50세 이상 기준 적용
        </p>
      </GreenBox>

      <H2>이전 직장 기간 합산하는 방법</H2>
      <p style={body}>
        여러 직장에 다닌 경우 기간을 합산할 수 있어요. A회사 2년 + B회사 3년 = 피보험기간 5년이에요.
        단, 두 가지 조건을 모두 충족해야 해요.
      </p>

      <BorderBox>
        <strong>합산 조건 2가지</strong><br />
        <br />
        ① <strong>이전 직장에서 실업급여를 받지 않았어야</strong> 해요<br />
        이미 실업급여를 받았으면 그 기간은 사용한 거예요. 합산 안 돼요.<br />
        <br />
        ② <strong>이전 직장 퇴사 후 1년 이내에 재취업</strong>했어야 해요<br />
        1년 넘게 쉬었다면 그 이전 기간은 합산 안 돼요.<br />
        <br />
        이 두 조건만 충족하면 여러 직장 기간을 전부 합산할 수 있어요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>피보험기간에 포함되는 것과 제외되는 것</H2>
      <p style={body}>
        유급휴일(주휴일·공휴일·유급연차), 육아휴직, 산재 휴업 기간은 피보험기간에 포함돼요.
        고용보험 가입이 유지되는 기간은 전부 인정돼요.
      </p>
      <p style={body}>
        무급휴직, 퇴사 후 구직 기간, 고용보험 미가입 기간(프리랜서·자영업 등)은 피보험기간에 들어가지 않아요.
        급여에서 고용보험료가 빠져나갔으면 피보험기간으로 인정된다고 보면 돼요.
      </p>

      <H2>고용24에서 피보험기간 확인하는 법</H2>
      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 고용보험법 기준으로 작성됐어요. 피보험기간 규정은 변경될 수 있으니 고용24 또는 고용노동부에 살펴봐요." />
    </ArticleLayout>
  );
}
