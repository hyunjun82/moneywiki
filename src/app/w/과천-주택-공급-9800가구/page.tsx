"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 과천에 9800가구 대단지가 들어선다는 뉴스를 보고, 위치·일정·청약 조건이 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 공급 위치와 규모를 파악하고, 청약 일정을 추적하며 사전 준비를 시작하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 경마장·기무사 부지 143만㎡, 9800가구, 2026년 1월 29일 발표, 청약 일정 미정, 과천시 반발 현황.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 수치) + BorderBox(부지별 상세) + Checklist(청약 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "과천 9800가구 청약은 언제 시작하나요?",
    a: "아직 구체적인 청약 일정은 공개되지 않았어요. 2026년 1월 29일 발표된 계획이라 경마장·군부대 이전 협의, 환경영향평가 등을 거쳐야 하므로 실제 청약까지 수년이 걸릴 수 있어요.",
  },
  {
    q: "어디에 지어지나요?",
    a: "과천시 주암동 일대 서울경마공원 부지(115만㎡)와 육군 기무사령부 부지(28만㎡)를 합친 총 143만㎡ 규모예요.",
  },
  {
    q: "분양가 상한제가 적용되나요?",
    a: "아직 확정되지 않았어요. 공공택지로 개발되면 분양가 상한제가 적용돼 시세보다 저렴하게 공급될 가능성이 높아요.",
  },
  {
    q: "과천시가 반발한다는데 무산될 수 있나요?",
    a: "과천시가 사전 협의 없이 발표됐다며 반발하고 있어요. 협의 과정이 길어질 수 있지만, 정부가 수도권 주택 공급 핵심 사업으로 추진 중이라 완전 무산 가능성은 낮다는 분석이에요.",
  },
  {
    q: "올림픽파크포레온급이라는데 비슷한 규모인가요?",
    a: "올림픽파크포레온이 약 1만 가구예요. 과천 9800가구는 그에 가까운 규모이고, 면적(143만㎡)은 훨씬 넓어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부 1·29 주택 공급대책", url: "https://www.molit.go.kr" },
      { label: "청약홈 청약 자격 조회", url: "https://www.applyhome.co.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법·조건", description: "청약통장 전환 방법과 조건을 미리 확인해보세요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "아파트 청약 당첨 후 취득세가 얼마인지 확인해보세요." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주자격", description: "공공분양 외에 국민임대 입주 조건도 확인해보세요." },
];

const PREP_ITEMS = [
  "청약통장(주택청약종합저축) 가입 여부 확인하기",
  "무주택 기간 확인 — 본인·배우자 기준으로 체크하기",
  "청약홈(applyhome.co.kr)에서 청약 자격 사전 확인하기",
  "소득 기준 서류 미리 발급해두기 (소득확인증명서 등)",
  "국토교통부·과천시 발표 뉴스 주기적으로 확인하기",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 청약</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        과천 주택 공급 9800가구<br />
        경마장·군부대 이전 부지 위치와 청약 일정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        과천에 대단지 아파트가 들어선다는 뉴스를 보셨죠.
        2026년 1월 29일 국토교통부가 발표한 공급대책에 과천 경마장과 군부대 이전 부지를 활용한 9800가구 공급 계획이 포함됐어요.
        어디에, 언제, 어떤 조건으로 공급되는지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>과천 9800가구 공급 계획, 핵심 수치부터</H2>
      <p style={body}>
        <a href="https://www.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토교통부</a>가
        2026년 1월 29일 발표한 주택 공급대책의 핵심 프로젝트예요.
        과천 경마장과 육군 기무사령부 부지를 합쳐 9800가구를 짓는 계획이에요.
      </p>

      <GreenBox title="핵심 수치">
        · 총 공급 가구수: <strong>9,800가구</strong><br />
        · 총 면적: <strong>143만㎡</strong> (경마장 115만㎡ + 기무사 28만㎡)<br />
        · 위치: 과천시 주암동 일대<br />
        · 발표일: 2026년 1월 29일 (국토교통부 공급대책)<br />
        · 청약 일정: 미정 (경마장·군부대 이전 협의 필요)
      </GreenBox>

      <p style={body}>
        올림픽파크포레온(약 1만 가구)과 비슷한 규모예요.
        단순 아파트가 아니라 첨단 산업시설과 주거가 결합된 직주근접 도시로 개발된다고 발표됐어요.
      </p>

      <Divider />

      <H2>부지별 위치와 현재 상태는?</H2>
      <p style={body}>
        두 개 부지를 합쳐서 개발해요. 서울 강남권 접근성이 좋은 곳에 위치해요.
      </p>

      <SectionBadge>부지 상세</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>부지</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>면적</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>현재 용도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>선행 과제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["과천 경마장", "115만㎡", "서울경마공원", "경마장 이전 협의"],
              ["기무사령부", "28만㎡", "군사시설", "군부대 이전 협의"],
              ["합계", "143만㎡", "—", "9,800가구 개발"],
            ].map(([a, b, c, d], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 12px" }}>{a}</td>
                <td style={{ padding: "10px 12px" }}>{b}</td>
                <td style={{ padding: "10px 12px" }}>{c}</td>
                <td style={{ padding: "10px 12px" }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        과천정부청사, 지하철 4호선과 가까워서 직주근접 수요가 클 거예요.
        다만 경마장과 군부대가 실제로 이전해야 개발이 가능하기 때문에, 착공까지 상당한 시간이 걸릴 거예요.
      </p>

      <Divider />

      <H2>청약 일정과 과천시 반발 현황</H2>
      <p style={body}>
        아직 구체적인 청약 일정이나 분양 시기는 공개되지 않았어요.
        경마장 이전지 협의, 도시계획 수립, 환경영향평가 등 행정 절차가 남아 있어요.
      </p>

      <BorderBox title="현재까지 진행 상황">
        · 2026.1.29 — 국토교통부 주택 공급대책 발표<br />
        · 과천시 — "사전 협의 없는 일방 발표" 반발 중<br />
        · 경마장 이전지 선정 — 미확정<br />
        · 환경영향평가 — 미착수<br />
        · 예상 청약 시기 — 발표 후 2~3년 이상 소요 전망
      </BorderBox>

      <p style={body}>
        과천시가 반발하고 있어서 협의 과정이 길어질 수 있어요.
        하지만 정부가 수도권 주택 공급 핵심 프로젝트로 추진 중이라, 일정은 지연될 수 있어도 계획 자체가 철회될 가능성은 낮다는 분석이 많아요.
      </p>

      <Divider />

      <H2>지금 미리 준비할 수 있는 것들</H2>
      <p style={body}>
        청약 일정이 나오면 빠르게 움직여야 해요.
        아직 확정 전이지만 미리 준비해두면 유리해요.
      </p>

      <Checklist items={PREP_ITEMS} />

      <p style={body}>
        공공택지 분양이면 분양가 상한제가 적용돼 시세보다 저렴하게 나올 가능성이 높아요.
        <a href="https://www.applyhome.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>청약홈</a>에서 본인 청약 자격을 미리 확인해두세요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 29일 국토교통부 발표 기준으로 작성했어요. 구체적인 청약 일정·분양가·입주 조건은 향후 입주자모집공고에서 확인하세요." />
    </ArticleLayout>
  );
}
