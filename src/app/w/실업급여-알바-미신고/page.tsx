"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여 받으면서 알바를 했는데 신고를 안 해서 부정수급에 해당하는지, 걸리면 어떻게 되는지 불안한 상황이에요.
// Q2. 부정수급 여부를 판단하고, 미신고 상태라면 고용센터(1350)에 자진신고하는 행동.
// Q3. 알바 미신고 = 부정수급, 환수 + 최대 5배 추가징수, 형사처벌(5년 이하 징역/5천만원 이하 벌금), 자진신고 시 감면, 적발 방식(4대보험·국세청 연동).
// Q4. EligibilityChecker(부정수급 판단) + GreenBox(자진신고 비교) + Steps(자진신고 절차) + BorderBox(적발 방식) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "실업급여 받으면서 알바(소득 활동)를 했다" },
  { id: "c2", label: "알바한 사실을 실업인정일에 신고하지 않았다" },
  { id: "c3", label: "하루라도 일한 날이 있는데 '근로 없음'으로 신고했다" },
];

const SELF_REPORT_STEPS = [
  { title: "고용센터 전화 (1350)", desc: "\"알바를 신고하지 않았다\"고 솔직하게 말하세요. 미신고 기간, 알바 내용, 수입 금액을 알려주면 돼요." },
  { title: "증빙 자료 준비", desc: "급여 이체 내역, 근무 기록, 알바 계약서 등이 있으면 함께 제출하세요. 정확할수록 처리가 빨라요." },
  { title: "자진신고서 제출", desc: "고용24(ei.go.kr)에서 온라인으로 신청하거나 관할 고용센터를 방문해서 제출해요." },
  { title: "반환금 납부", desc: "부정수급 원금만 반환하면 돼요. 자진신고 시 추가징수는 감면돼요.", tip: "적발 전 자진신고해야 감면 혜택이 있어요" },
];

const FAQS = [
  { q: "하루 알바도 신고해야 하나요?", a: "네. 금액이 적어도, 기간이 짧아도, 하루라도 일한 사실이 있으면 실업인정일에 신고해야 해요. 신고 안 하면 전부 부정수급이에요." },
  { q: "고의가 아니라 몰라서 안 했어도 부정수급인가요?", a: "네. 법적으로는 과실로 보고 반환 의무가 생겨요. 다만 고의인지 과실인지에 따라 추가징수 금액이 달라질 수 있어요." },
  { q: "현금으로 받았으면 안 걸리나요?", a: "사업주가 비용 처리하면 기록이 남아요. 4대보험 취득 신고, 일용직 근로내역 신고, 간이지급명세서 제출 등으로 국세청 데이터와 자동 대조돼요. 제보로 적발되는 경우도 많아요." },
  { q: "수급이 끝났으면 괜찮은가요?", a: "아니에요. 수급 종료 후에도 소멸시효(3년) 이내에 적발되면 반환 및 추가징수 대상이에요." },
  { q: "알바 수입이 적으면 괜찮지 않나요?", a: "수입 금액과 상관없이 신고 의무가 있어요. 소득이 적더라도 미신고면 부정수급이에요. 알바 수입의 몇십 배를 토해내는 경우가 생길 수 있어요." },
  { q: "배달·대리운전 같은 플랫폼 소득도 적발되나요?", a: "돼요. 배달 플랫폼, 대리운전, 프리랜서 플랫폼 소득도 사업자등록이나 소득 신고를 통해 확인돼요. 플랫폼 기록이 남아서 적발 가능성이 높아요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 제62조 반환명령 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 부정수급 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-받으면서-알바", title: "실업급여 받으면서 알바하는 법", description: "알바하면서 실업급여도 받는 합법적인 방법이에요." },
  { slug: "실업급여-반환", title: "실업급여 부정수급 반환금 계산", description: "반환금과 추가징수가 얼마나 나오는지 정리했어요." },
  { slug: "실업급여-수급자격", title: "실업급여 받을 수 있는 조건", description: "정당하게 실업급여를 받는 자격 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 부정수급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 알바 미신고, 걸리면 어떡하죠?<br />
        부정수급 처벌과 자진신고 감면
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받으면서 편의점 알바를 했는데 신고를 안 했다고요?
        걸리면 큰일이에요. <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 따라 부정수급액 전액 반환에 최대 5배 추가징수까지 부과돼요.
        형사처벌도 가능해요. 하지만 적발 전에 자진신고하면 추가징수를 감면받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>나도 부정수급에 해당할까요?</H2>
      <p style={body}>
        실업급여는 실업 상태인 사람에게 지급하는 급여예요.
        알바를 했으면 그 기간은 완전한 실업이 아니니까, 신고해서 급여를 조정해야 해요.
        신고하지 않고 받으면 "거짓이나 부정한 방법으로 급여를 받은 것"으로 간주돼요.
        하루 알바도 예외가 아니에요.
      </p>

      <SectionBadge>부정수급 해당 여부</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="부정수급에 해당해요. 적발 전에 자진신고하면 추가징수를 감면받을 수 있어요." partialMatchText="일부 해당할 수 있어요. 고용센터(1350)에 전화해서 상황을 상담받아보세요." />

      <Divider />

      <H2>알바 미신고 처벌, 이만큼 무거워요</H2>
      <p style={body}>
        부정수급이 확정되면 행정 제재와 형사처벌이 별개로 진행될 수 있어요.
        알바로 번 돈과 비교하면 처벌이 압도적으로 무거워요.
      </p>

      <SectionBadge>자진신고 vs 적발 비교</SectionBadge>
      <GreenBox title="처벌 규모 비교 (3개월 미신고, 알바 수입 150만원 기준)">
        <p style={{ ...body, marginBottom: 8 }}><strong>적발된 경우</strong></p>
        <p style={{ ...body, marginBottom: 8 }}>부정수급액 약 613만원 반환 + 추가징수 최대 3,065만원 + 남은 실업급여 전액 중단 + 형사처벌 가능</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>자진신고한 경우</strong></p>
        <p style={{ ...body, marginBottom: 0 }}>부정수급 원금만 반환. 추가징수 감면. 형사처벌 면제 가능.</p>
      </GreenBox>

      <p style={body}>
        알바로 번 돈이 150만원인데 적발 시 최대 부담이 3,678만원이에요.
        알바 수입의 24배를 토해내는 셈이에요.
        형사처벌까지 가면 전과 기록이 남아서 취업이나 공무원 시험에도 영향을 줘요.
      </p>

      <Divider />

      <H2>적발은 생각보다 쉽게 돼요</H2>
      <p style={body}>
        "현금으로 받았으니까 괜찮겠지" 생각하시는 분이 있는데, 그렇지 않아요.
        4대보험·국세청 소득 자료가 자동으로 대조돼요.
      </p>

      <SectionBadge>적발 경로</SectionBadge>
      <BorderBox title="부정수급 적발 방식">
        <p style={{ ...body, marginBottom: 6 }}><strong>4대보험 취득 신고</strong>: 사업주가 일용직 신고하면 자동으로 대조</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>국세청 소득 자료</strong>: 간이지급명세서, 사업소득 신고 자료와 연동</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>플랫폼 기록</strong>: 배달·대리운전·프리랜서 플랫폼의 소득 기록</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>제보</strong>: 동료, 사업주, 지인 누구나 익명 제보 가능 (포상금 제도 운영)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>AI 모니터링</strong>: 2026년부터 공공 데이터 연동·AI 시스템 강화</p>
      </BorderBox>

      <Divider />

      <H2>자진신고 방법, 지금 바로 하세요</H2>
      <p style={body}>
        아직 적발되지 않았다면 하루라도 빨리 자진신고하는 게 유리해요.
        시간이 지날수록 부정수급 기간이 늘어나고, 적발 가능성도 높아져요.
      </p>

      <SectionBadge>자진신고 절차</SectionBadge>
      <Steps steps={SELF_REPORT_STEPS} />

      <p style={body}>
        자진신고의 핵심은 "적발 전" 타이밍이에요.
        고용센터에서 조사를 시작한 뒤에 "자진신고합니다"라고 해도 소용없어요.
        고용센터 1350에 전화 한 통이면 시작할 수 있어요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 자료를 바탕으로 작성했어요. 개별 사안은 고용센터(1350)에 상담받으세요." />
    </ArticleLayout>
  );
}
