"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 입사 후 시간이 지났는데 4대보험이 가입됐는지 확인이 안 돼 불안한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 정부24·4대사회보험 사이트에서 즉시 조회하고, 미가입이면 노동청에 신고하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 조회 방법 3가지, 미가입 시 신고 절차, 입사일 vs 가입일 불일치 대처법, 증명서 발급 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(조회 절차) + 비교표(용도별 증명서) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS_CHECK = [
  {
    title: "정부24에서 한 번에 조회 (가장 빠름)",
    desc: "정부24(gov.kr)에 접속해서 '4대보험 가입내역'을 검색해요. 카카오·네이버 간편인증으로 30초면 국민연금·건강보험·고용보험·산재보험 가입 여부가 한 화면에 나와요. 과거 직장 이력, 가입일, 사업장명까지 확인 가능해요.",
    link: { label: "정부24 바로가기", href: "https://www.gov.kr" },
  },
  {
    title: "4대사회보험 정보연계센터에서 조회",
    desc: "4insure.or.kr에서 '개인 민원서비스 → 가입내역 조회'로 확인할 수 있어요. 공동인증서 없이 간편인증 가능해요. 이 사이트는 4대보험 통합 증명서 발급도 여기서 돼요.",
    link: { label: "4대사회보험 정보연계센터", href: "https://www.4insure.or.kr" },
  },
  {
    title: "개별 공단 앱에서 확인 (보험별 상세)",
    desc: "국민연금은 '내 곁에 국민연금' 앱, 건강보험은 'The건강보험' 앱에서 납부 이력까지 상세 확인해요. 고용·산재보험은 고용·산재보험 토탈서비스(total.comwel.or.kr)에서 조회해요.",
  },
];

const STEPS_REPORT = [
  {
    title: "회사에 먼저 확인 요청",
    desc: "신고 전에 카카오톡·이메일로 '4대보험 가입 확인했는데 안 나오는데요?' 하고 물어봐요. 증거를 남기는 방식으로요. '깜빡했네, 바로 넣어줄게' 하면 2~3일 기다려보세요.",
    tip: "문자나 메일로 요청해야 나중에 '통보한 날짜' 증거가 남아요",
  },
  {
    title: "미루면 고용노동부 민원마당에 신고",
    desc: "minwon.moel.go.kr에서 '4대보험 미가입' 항목으로 신고해요. 입사일, 급여 내역을 적으면 10분이면 제출 완료예요. 제출 후 2주 내로 근로감독관이 조사를 시작해요.",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "신고 후 소급 가입·보험료 처리",
    desc: "조사 결과 미가입 확인 시 회사에 소급 가입 명령이 내려져요. 입사일부터의 밀린 보험료는 원칙적으로 회사가 전액 부담해요. 불응 시 과태료 500만원, 반복이면 형사처벌까지 가요.",
  },
];

const FAQS = [
  {
    q: "조회했는데 입사일이랑 가입일이 달라요. 어떻게 하나요?",
    a: "회사가 늦게 신고한 거예요. 회사에 '입사일로 소급 가입 요청'을 하면 돼요. 소급 가입은 가능하고, 안 해주면 노동청 신고예요. 공백 기간이 생기면 나중에 연금 수급액이 줄어요.",
  },
  {
    q: "퇴사했는데 아직 가입자로 나와요.",
    a: "회사가 상실 신고를 안 한 거예요. 건강보험료가 계속 나갈 수 있어요. 각 공단에 직접 연락해서 상실 처리를 요청하면 돼요. 퇴사 후 14일 이내 신고가 원칙이에요.",
  },
  {
    q: "월급이 300만원인데 기준소득월액이 200만원으로 나와요.",
    a: "회사가 보험료 줄이려고 낮게 신고한 거예요. 나중에 받을 연금액도 줄어들어요. 노동청에 신고하면 시정 명령이 내려져요.",
  },
  {
    q: "4대보험 가입증명서는 어디서 받나요?",
    a: "국민연금공단 '내 곁에 국민연금' 앱이나 홈페이지에서 즉시 PDF로 발급받아요. 비자·대출·취업용 통합 증명서는 4대사회보험 정보연계센터(4insure.or.kr)에서 '4대보험 가입자격 확인서'로 발급받을 수 있어요.",
  },
  {
    q: "주 15시간 미만 알바도 4대보험이 가입되나요?",
    a: "고용보험과 산재보험은 근무 시간과 관계없이 적용돼요. 국민연금과 건강보험은 주 60시간 미만 단기 근로자는 원칙적으로 제외예요. 단, 3개월 이상 일하면 적용 대상이 될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 기관",
    items: [
      { label: "4대사회보험 정보연계센터 — 가입내역 조회", url: "https://www.4insure.or.kr" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" },
      { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
      { label: "근로복지공단 — 고용·산재보험 토탈서비스", url: "https://total.comwel.or.kr" },
      { label: "고용노동부 민원마당 — 미가입 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "4대보험", title: "4대보험이란?", description: "국민연금·건강보험·고용보험·산재보험 기본 개념이에요." },
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "월급에서 빠지는 보험료를 미리 계산해요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급 자격", description: "고용보험 가입 이력이 실업급여 수급에 직접 연결돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>4대보험 · 근로복지 · 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        4대보험 가입 확인 방법<br />
        조회·미가입 신고·증명서 발급까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사 후 한 달 넘었는데 가입됐는지 감감무소식이죠. 정부24나 국민연금공단 앱에서 30초면 확인돼요.
        미가입이면 <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서
        10분이면 신고 완료예요.
      </p>

      <Divider />

      <H2>가입 여부 조회하는 3가지 방법</H2>
      <p style={body}>
        공동인증서 없이 카카오·네이버 간편인증으로도 조회 가능해요. 정부24가 가장 빠르고, 보험별 상세 내역은 각 공단 앱에서 확인해요.
      </p>

      <Steps steps={STEPS_CHECK} />

      <GreenBox>
        정부24에서 조회하면 현재 직장뿐 아니라 과거 직장 이력도 다 나와요.<br />
        가입일, 상실일, 사업장명까지 한꺼번에 확인할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>미가입 확인됐을 때 신고 절차</H2>
      <p style={body}>
        미가입이 확인되면 방치하면 안 돼요. 고용보험 공백은 나중에 실업급여 수급 기간에 영향을 주고, 국민연금 공백은 노후 연금액을 줄여요.
        아래 순서대로 진행하면 돼요.
      </p>

      <Steps steps={STEPS_REPORT} />

      <Divider />

      <H2>조회 시 이상한 점 발견하면 바로 대처</H2>
      <p style={body}>
        단순히 가입 여부만 보는 게 아니라, 세부 내용도 확인해야 해요. 입사일·가입일 불일치, 기준소득월액 과소 신고, 퇴사 후 미상실 — 세 가지가 흔히 생기는 문제예요.
      </p>

      <SectionBadge>이상 사항 대처 요약</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>발견된 문제</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대처 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["입사일 ≠ 가입일", "회사에 소급 가입 요청 → 거절 시 노동청 신고"],
              ["기준소득월액이 실제 급여보다 낮음", "노동청 신고 → 시정 명령"],
              ["퇴사했는데 아직 가입자로 표시", "각 공단에 직접 상실 처리 요청"],
              ["4대보험 자체 미가입", "회사 확인 요청 → 무응답 시 민원마당 신고"],
            ].map(([issue, action], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", color: "#e53e3e", fontWeight: 600 }}>{issue}</td>
                <td style={{ padding: "9px 12px" }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        조회 기록이나 신고 내용은 캡처·저장해두세요. 나중에 분쟁 시 증거가 돼요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 제도 변경 시 달라질 수 있으니 각 공단 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
