"use client";

// Q1. 회사에서 보험 들어줬는데 급여에 잡혀서 세금을 내야 하나 궁금한 직장인이에요.
// Q2. 본인의 단체보험이 비과세 대상인지 확인하고, 연말정산에서 정확히 처리하는 행동.
// Q3. 비과세 대상 보험 종류(순수보장성·환급부), 한도(연 70만원), 조건(전 직원 대상), 과세 전환 기준.
// Q4. GreenBox(비과세 조건 요약) + BorderBox(보험 유형 비교) + Checklist(확인 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "회사가 보험료를 전액 부담하고 있다",
  "전 직원(또는 일정 직급 이상 전원)이 가입 대상이다",
  "임원만 가입한 보험이 아니다",
  "연간 보험료가 70만원 이하다",
  "급여명세서에서 해당 보험료 항목을 확인했다",
];

const FAQS = [
  {
    q: "모든 단체보험이 비과세예요?",
    a: "아니에요. 전 직원 대상 단체순수보장성보험, 단체환급부보험만 해당돼요. 임원만 가입하거나 특정 직원만 대상인 보험은 비과세 안 돼요.",
  },
  {
    q: "70만원 넘으면 어떻게 되나요?",
    a: "초과분만 근로소득으로 과세돼요. 예를 들어 연간 보험료가 90만원이면 70만원은 비과세, 20만원은 급여에 포함돼서 세금이 붙어요.",
  },
  {
    q: "단체순수보장성보험이 뭐예요?",
    a: "만기에 환급금이 없는 보장 전용 보험이에요. 사망, 질병, 상해 등을 보장하고 만기 때 돌려받는 돈이 없는 보험이죠. 예를 들어 단체 상해보험, 단체 정기보험이 여기 해당해요.",
  },
  {
    q: "단체환급부보험은 뭐예요?",
    a: "만기에 환급금이 있는 보험이에요. 보장도 하고 만기 때 돈도 돌려주는 보험이죠. 이것도 전 직원 대상이면 연 70만원까지 비과세예요.",
  },
  {
    q: "임원만 가입한 보험은 왜 안 되나요?",
    a: "소득세법 시행령 제12조에서 '전 직원을 대상'으로 한 보험만 비과세로 정하고 있어서예요. 임원 전용 보험은 해당 임원의 근로소득으로 전액 과세돼요.",
  },
  {
    q: "급여명세서에 안 잡혀 있으면 비과세 처리된 건가요?",
    a: "맞아요. 비과세 항목이면 급여명세서 과세 대상에서 빠져 있어요. 궁금하면 인사팀에 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "소득세법 시행령 제12조 — 비과세 근로소득", url: "https://www.law.go.kr/법령/소득세법시행령" },
      { label: "국세청 — 비과세 근로소득 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-비과세-소득", title: "연말정산 비과세 소득", description: "비과세 되는 근로소득 항목을 정리했어요." },
  { slug: "연말정산-식대-비과세", title: "식대 비과세", description: "월 20만원까지 비과세 되는 식대 기준이에요." },
  { slug: "연말정산-공제항목", title: "연말정산 공제항목", description: "놓치기 쉬운 공제항목을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 비과세 · 단체보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 단체보험, 세금 내야 하나?<br />
        비과세 조건과 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 보험 들어줬는데 급여에 잡혀서 세금이 나오면 당황스럽죠.{" "}
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제12조</a>에
        따라 전 직원 대상 단체보험은 연 70만원까지 비과세예요. 조건을 못 맞추면 전액 과세되니까 꼭 확인하세요.
      </p>

      <Divider />

      <H2>비과세 되는 단체보험 조건</H2>
      <p style={body}>
        모든 단체보험이 비과세가 아니에요. 딱 두 가지 유형만 비과세 대상이고, 세 가지 조건을 모두 충족해야 해요.
      </p>

      <GreenBox title="비과세 핵심 조건">
        <strong>대상 보험</strong>: 단체순수보장성보험(만기 환급 없음), 단체환급부보험(만기 환급 있음)<br />
        <strong>가입 범위</strong>: 전 직원 대상이어야 함 (임원만 가입하면 안 됨)<br />
        <strong>한도</strong>: 각각 연 70만원까지 비과세 (초과분은 과세)
      </GreenBox>

      <p style={body}>
        "전 직원"이 핵심이에요. 회사가 임원 10명만 보험 들어주고 일반 직원은 빠져 있다면 그 보험료는 임원의 근로소득으로 잡혀서 전액 과세돼요.
      </p>

      <Divider />

      <H2>비과세 vs 과세, 이렇게 갈려요</H2>
      <p style={body}>
        같은 단체보험이라도 가입 범위와 금액에 따라 세금 처리가 달라져요.
      </p>

      <SectionBadge>과세·비과세 구분</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>비과세</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>과세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["가입 범위", "전 직원 대상", "임원만 또는 특정 직원만"],
              ["보험 유형", "순수보장성 / 환급부", "일반 저축성 보험"],
              ["연간 한도", "각 70만원 이내", "70만원 초과분 또는 전액"],
              ["급여 반영", "과세 대상에서 제외", "근로소득에 포함"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>내 보험이 비과세인지 체크하세요</H2>
      <p style={body}>
        아래 항목을 확인해서 비과세 처리가 맞는지 점검해 보세요. 하나라도 안 맞으면 인사팀에 문의하는 게 좋아요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 시행령 기준으로 작성됐어요. 구체적인 비과세 적용 여부는 국세청(126) 또는 회사 인사팀에 확인하세요." />
    </ArticleLayout>
  );
}
