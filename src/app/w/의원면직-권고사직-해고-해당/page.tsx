"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 회사에서 퇴사 서류를 쓰라고 하는데 의원면직·권고사직·해고 중 뭘로 처리해야 실업급여를 받을 수 있는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 퇴사 유형 차이를 이해하고, 퇴직사유를 정확히 기재해서 실업급여를 받는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 3가지 퇴사 유형 차이, 실업급여 수급 가능 여부, 퇴직사유 작성법("회사 권유에 의한 사직"), 부당해고 구제신청.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(비교 요약) + 비교 테이블 + BorderBox(서류 작성 주의) + Steps(실업급여 신청) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const CLAIM_STEPS = [
  { title: "퇴직사유 정확히 기재", desc: "퇴사 서류에 '회사의 권유에 의한 사직' 또는 '경영상 이유에 의한 해고'라고 명확히 적어요. '일신상의 사유'라고 쓰면 의원면직 처리돼요.", tip: "구두 약속만 하지 말고 반드시 서면에 남기세요." },
  { title: "이직확인서 확인", desc: "회사가 고용보험에 제출하는 이직확인서의 이직사유 코드를 꼭 확인하세요. '자진퇴사'로 코드가 잘못 들어가면 실업급여를 못 받아요." },
  { title: "고용센터 방문", desc: "퇴직 후 고용센터에 실업급여 수급자격 신청을 해요. 구직등록과 수급자격 교육을 받으면 지급이 시작돼요." },
  { title: "구직활동 및 수급", desc: "4주마다 구직활동 내역을 보고하면 실업급여가 계속 지급돼요. 1일 최소 61,500원~최대 66,000원이에요." },
];

const FAQS = [
  { q: "의원면직이면 실업급여를 못 받나요?", a: "원칙적으로 자발적 퇴사라 못 받아요. 하지만 임금 3개월 이상 체불, 근로조건 위반, 직장 내 괴롭힘 같은 정당한 사유가 있으면 증빙자료 제출 후 받을 수 있어요." },
  { q: "권고사직인데 '일신상의 사유'로 쓰라고 하면?", a: "절대 쓰면 안 돼요. 그렇게 쓰면 의원면직으로 처리돼서 실업급여를 못 받아요. '회사의 권유에 의한 사직'이라고 명확히 적으세요." },
  { q: "해고 통보를 받았는데 부당해고 같아요", a: "해고 후 3개월 이내에 노동위원회에 부당해고 구제신청을 할 수 있어요. 인정되면 복직하거나 보상금을 받을 수 있어요." },
  { q: "실업급여는 얼마나 받을 수 있나요?", a: "퇴직 전 평균임금의 60%를 받아요. 1일 최소 61,500원~최대 66,000원이고, 근속 기간에 따라 120일~270일 동안 받아요." },
  { q: "권고사직 시 퇴직금도 받나요?", a: "네, 퇴직금은 퇴사 유형과 무관하게 1년 이상 근무했으면 무조건 받아요. 퇴직금 지급기한은 퇴사일로부터 14일이에요." },
  { q: "사표를 쓰라고 압박받았는데 해고인가요?", a: "사용자가 '사표 안 쓰면 해고하겠다'고 강요해서 어쩔 수 없이 사표를 낸 거라면 실질적으로 해고로 볼 수 있어요. 녹취록이나 문자 등 증거를 확보하세요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 — 법제처", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 — 법제처", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용보험 실업급여 신청 — 고용24", url: "https://www.ei.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 퇴사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        의원면직·권고사직·해고, 뭐가 다를까?<br />
        퇴사 유형별 실업급여 수급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사 그만둘 때 "의원면직이요", "권고사직이요" 하면서 서류 쓰라고 하죠.
        단어 하나 차이로 <a href="/w/실업급여-수급조건" style={{ color: "#1D9E75" }}>실업급여</a> 수백만원이 달라질 수 있어요.
        퇴직사유를 어떻게 적어야 하는지까지 정리했어요.
      </p>

      <Divider />

      <H2>세 가지 퇴사 유형, 핵심 차이</H2>
      <p style={body}>
        퇴사 유형은 누가 먼저 퇴사를 결정했느냐에 따라 나뉘어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75" }}>고용보험법</a>에서는
        자발적 이직이냐 비자발적 이직이냐에 따라 실업급여 수급 여부가 결정돼요.
      </p>

      <SectionBadge>퇴사 유형별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>의원면직</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>권고사직</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>해고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["결정 주체", "본인", "회사 권유 + 본인 동의", "회사 일방"],
              ["실업급여", "원칙 불가 (정당사유 시 가능)", "수급 가능", "수급 가능"],
              ["퇴직금", "1년 이상 근무 시 지급", "1년 이상 근무 시 지급", "1년 이상 근무 시 지급"],
              ["부당해고 구제", "해당 없음", "강요 시 해고로 인정 가능", "3개월 내 구제신청 가능"],
              ["핵심 포인트", "서류에 사유 정확히 기재", "'회사 권유' 반드시 명시", "해고통지서 확보"],
            ].map(([item, a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
                <td style={{ padding: "9px 12px" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="실업급여 받으려면">
        권고사직과 해고는 비자발적 이직이라 실업급여를 받을 수 있어요.
        의원면직은 원칙적으로 안 되지만, 임금체불·근로조건 위반·직장 내 괴롭힘 같은 정당한 사유가 있으면 증빙 후 받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>퇴직사유 작성, 이게 가장 중요해요</H2>
      <p style={body}>
        퇴사 서류에 어떻게 적혀있느냐가 실업급여의 증거가 돼요. 한 글자 차이로 수백만원이 달라져요.
      </p>

      <BorderBox>
        퇴직사유 작성 핵심이에요.<br />
        · 권고사직이면 → <strong>"회사의 권유에 의한 사직"</strong> 또는 <strong>"경영상 이유로 퇴직 권유받아 동의함"</strong><br />
        · <strong>"일신상의 사유로 사직함"이라고 쓰면 의원면직 처리돼요 — 절대 쓰면 안 돼요</strong><br />
        · 구두로만 약속하지 말고, 서면 합의서에 반드시 남기세요<br />
        · 이직확인서의 이직사유 코드도 반드시 확인하세요
      </BorderBox>

      <Divider />

      <H2>실업급여 신청 절차</H2>
      <p style={body}>
        퇴직 후 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75" }}>고용보험 사이트</a>에서
        실업급여를 신청할 수 있어요. 고용센터 방문도 가능하고요.
      </p>

      <Steps steps={CLAIM_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법·근로기준법을 바탕으로 작성됐어요. 실업급여 금액과 지급 기간은 개인 상황에 따라 달라질 수 있으니 고용센터에서 확인하세요." />
    </ArticleLayout>
  );
}
