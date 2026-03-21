"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 회사가 망하거나 임금을 안 줘서, 본인이 대지급금 대상인지 궁금한 상황이에요. 파트타이머, 임원, 외국인 등 자기 고용형태가 해당되는지 모르겠는 거예요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인이 대지급금 대상인지 판단하고, 근로복지공단(1588-0075)에 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 핵심 기준 = 근로자성, 고용형태별 대상 여부(임원·파트타임·외국인·하청·소규모), 상한액 1,000만원, 도산/간이 구분.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(내 고용형태 대상 확인) + BorderBox(핵심 기준) + GreenBox(상한액) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY_ITEMS = [
  { id: "regular", label: "정규직으로 고용계약을 맺고 일했어요" },
  { id: "parttime", label: "파트타이머·아르바이트·단시간근로자예요" },
  { id: "contract", label: "계약직·일용직·파견직으로 일했어요" },
  { id: "foreign", label: "외국인 근로자예요 (불법체류 포함)" },
  { id: "intern", label: "현장실습생으로 실제 노동을 제공했어요" },
  { id: "exec", label: "임원(등기/비등기)인데, 실제로는 상사 지시를 받으며 일했어요" },
  { id: "small", label: "5인 미만 소규모 사업장에서 일했어요" },
];

const FAQS = [
  { q: "등기임원은 절대 대지급금을 못 받나요?", a: "원칙적으로 등기임원은 위임관계라서 대상이 아니에요. 하지만 등기만 된 상태에서 실제로는 상사의 지휘·감독 아래 일반 직원처럼 일했다면 근로자로 인정돼서 받을 수 있어요." },
  { q: "불법체류 외국인도 진짜 받을 수 있나요?", a: "네, 대법원 판례로 확립돼 있어요. 체류 자격과 무관하게 실제 근로를 제공했으면 근로자예요. 2025년 11월부터는 임금체불 신고 시 출입국관리사무소 통보 의무도 면제돼요." },
  { q: "5인 미만 사업장도 대지급금 대상인가요?", a: "네. 임금채권보장법은 근로자를 사용하는 모든 사업장에 적용돼요. 다만 농업·임업·어업 중 법인이 아닌 개인사업자로 상시근로자 5인 미만인 경우만 예외예요." },
  { q: "하청 근로자인데, 원청이 망했어요. 대지급금 받을 수 있나요?", a: "원청이 아니라 본인이 고용된 하청 회사 기준으로 판단해요. 하청도 망했다면 하청 기준으로 도산대지급금을 신청해요. 건설업은 상위 수급인 기준으로 받을 수 있는 특례가 있어요." },
  { q: "대지급금 상한액은 얼마인가요?", a: "간이대지급금 총 상한액은 1,000만원이에요. 도산대지급금은 연령별로 다른데, 최종 3개월 임금 + 최종 3년 퇴직금 범위에서 상한이 적용돼요." },
  { q: "프리랜서도 대지급금을 받을 수 있나요?", a: "순수 프리랜서(독립 사업자)는 근로자가 아니라서 대상이 아니에요. 하지만 형식은 프리랜서인데 실제로는 출퇴근 관리를 받고 업무 지시를 따랐다면 근로자로 인정돼서 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "임금채권보장법 (법제처)", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "찾기쉬운 생활법령정보 - 임금채권보장", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1694&ccfNo=3&cciNo=3&cnpClsNo=1" },
      { label: "정부24 대지급금 안내", url: "https://www.gov.kr/portal/service/serviceInfo/PTR000051327" },
    ],
  },
];

const RELATED = [
  { slug: "대지급금-체당금-지급-사유-종류", title: "대지급금 종류 (도산·간이)", description: "도산대지급금과 간이대지급금의 차이점과 지급 사유를 정리했어요." },
  { slug: "도산대지급금-신청-방법-절차", title: "도산대지급금 신청 방법", description: "회사가 파산·회생 신청했을 때 대지급금 신청 절차예요." },
  { slug: "간이대지급금-신청-방법-절차", title: "간이대지급금 신청 방법", description: "회사가 망하진 않았지만 임금을 안 줄 때 신청하는 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>급여 · 임금채권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        나도 대지급금 받을 수 있을까?<br />
        고용형태별 지급대상과 자격 요건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 망하거나 월급을 안 주는데, 파트타이머라서 또는 외국인이라서 대지급금 못 받는 건 아닌지 걱정되시죠?
        결론부터 말하면, <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>상 근로자로 인정되기만 하면 고용형태와 무관하게 대지급금을 받을 수 있어요.
        정규직이든 알바든 외국인이든, 핵심은 "근로자성"이에요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>내 고용형태, 대지급금 대상인가요?</H2>
      <p style={body}>
        대지급금은 회사가 못 준 임금을 국가가 대신 지급하는 제도예요.
        아래 항목 중 하나라도 해당되면 대지급금 대상일 가능성이 높아요.
        근로기준법상 "근로자"이기만 하면 돼요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="모두 해당되면 확실한 대지급금 대상이에요"
        partialMatchText="하나라도 해당되면 대지급금 대상일 가능성이 높아요"
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>근로자성, 어떤 기준으로 판단하나요?</H2>
      <p style={body}>
        "나는 근로자인가, 아닌가?" 이게 대지급금의 핵심 판단 기준이에요.
        직함이나 계약 형태가 아니라, 실제로 어떻게 일했느냐를 봐요.
      </p>

      <BorderBox>
        <strong>근로자성 판단 3가지 기준</strong><br /><br />
        <strong>1. 임금을 목적으로 일했는가?</strong><br />
        무보수 봉사가 아니라, 돈을 받기로 하고 일한 거면 충족돼요.<br /><br />
        <strong>2. 종속적 관계에서 일했는가?</strong><br />
        사용자의 지휘·감독을 받으면서 일했다면 충족돼요. 출퇴근 시간이 정해져 있고, 업무 지시를 따르고, 복무 규율이 적용됐다면 종속성이 인정돼요.<br /><br />
        <strong>3. 계속적으로 일했는가?</strong><br />
        일회성이 아니라 일정 기간 계속해서 일했다면 근로자로 인정될 가능성이 높아요.
      </BorderBox>

      <p style={body}>
        이 세 가지를 충족하면, 정규직이든 알바든 일용직이든 외국인이든 근로자예요.
        형식적으로 "프리랜서 계약"이라고 적어두었어도, 실제로는 출퇴근 관리를 받고 업무 지시를 따랐다면 근로자로 인정돼요.
      </p>

      <Divider />

      <H2>임원·외국인·하청, 헷갈리는 케이스는?</H2>
      <p style={body}>
        고용형태가 특수하면 "나도 되나?" 고민이 많죠.
        자주 묻는 케이스별로 정리했어요.
      </p>

      <SectionBadge>고용형태별 대지급금 대상 여부</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>고용형태</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", width: "80px" }}>대상?</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["정규직·계약직", "O", "당연 대상"],
              ["파트타이머·알바", "O", "근무시간 무관, 근로계약만 있으면 돼요"],
              ["일용직", "O", "당연 대상"],
              ["등기임원", "△", "실제로 지휘·감독 받으며 일한 경우만 가능"],
              ["비등기임원", "△", "실질적 업무 종속성에 따라 판단"],
              ["외국인 (합법체류)", "O", "당연 대상"],
              ["외국인 (불법체류)", "O", "대법원 판례로 확립, 2025.11부터 통보의무 면제"],
              ["현장실습생", "O", "실제 근로 제공 시"],
              ["하청 근로자", "O", "하청 회사 기준으로 신청 (건설업 특례 있음)"],
              ["5인 미만 사업장", "O", "농업·어업 개인사업자 일부만 예외"],
              ["순수 프리랜서", "X", "독립적 사업자는 근로자 아님"],
            ].map(([type, eligible, cond], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 500 }}>{type}</td>
                <td style={{ padding: "10px 12px", color: eligible === "O" ? "#1D9E75" : eligible === "X" ? "#dc2626" : "#d97706", fontWeight: 700, textAlign: "center" }}>{eligible}</td>
                <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 13 }}>{cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        내 경우가 위 표에서 "△"에 해당한다면, <a href="tel:1588-0075" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단(1588-0075)</a>이나 <a href="tel:1350" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부(1350)</a>에 먼저 상담받아보세요.
        근로자성 판단은 서류와 실제 근무 형태를 종합적으로 보기 때문에, 전문가 상담이 가장 정확해요.
      </p>

      <Divider />

      <H2>대지급금 상한액은 얼마인가요?</H2>
      <p style={body}>
        대지급금에도 한도가 있어요. 체불 임금 전액을 다 받을 수 있는 건 아니에요.
      </p>

      <GreenBox>
        · <strong>간이대지급금</strong>: 총 상한액 <strong>1,000만원</strong><br />
        · <strong>도산대지급금</strong>: 최종 3개월 임금 + 최종 3년 퇴직금 (연령별 상한 적용)<br />
        · 파트타이머라도 상한액 기준은 정규직과 동일해요<br />
        · 실제 체불 금액이 상한을 초과하면, 나머지는 회사에 직접 청구해야 해요
      </GreenBox>

      <p style={body}>
        도산대지급금과 간이대지급금의 차이점이 궁금하다면 <a href="/w/대지급금-체당금-지급-사유-종류" style={{ color: "#1D9E75", textDecoration: "underline" }}>대지급금 종류</a> 글을 참고하세요.
        신청 방법은 <a href="/w/간이대지급금-신청-방법-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>간이대지급금 신청</a> 또는 <a href="/w/도산대지급금-신청-방법-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>도산대지급금 신청</a>에서 확인할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 정부24 자료를 바탕으로 작성됐어요. 개별 사례는 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
