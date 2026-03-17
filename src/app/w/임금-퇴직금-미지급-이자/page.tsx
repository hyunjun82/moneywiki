"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "임금 지급일이 지났는데 아직 못 받은 금액이 있어요" },
  { id: "c2", label: "퇴직한 지 14일이 넘었는데 퇴직금을 못 받았어요" },
  { id: "c3", label: "퇴직일로부터 3년이 지나지 않았어요" },
  { id: "c4", label: "근무 사실을 입증할 통장 내역 또는 계약서가 있어요" },
];

const CALC_SLIDERS = [
  { id: "wage", label: "미지급 임금", min: 0, max: 3000, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "severance", label: "미지급 퇴직금", min: 0, max: 5000, step: 100, defaultValue: 400, format: (v: number) => `${v}만원` },
  { id: "days", label: "지연 일수", min: 15, max: 730, step: 5, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 합계 (연 20%)",
    getValue: (v: Record<string, number>) =>
      Math.round((v.wage + v.severance) * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구금액 (원금 + 이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round((v.wage + v.severance) * 10000 * 0.2 * v.days / 365);
      return (v.wage + v.severance) * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀 재발급" },
  { name: "급여명세서 또는 통장 입금 내역", required: true, where: "회사 인사팀 또는 은행 앱 출력" },
  { name: "퇴직일 증빙 (사직서·해고통지서 등)", required: true, where: "직접 보관 또는 인사팀" },
  { name: "미지급 금액 내역 정리표 (임금·퇴직금 구분)", required: false, where: "직접 작성" },
  { name: "내용증명 사본 (발송한 경우)", required: false, where: "우체국 발송 영수증·사본" },
];

const STEPS = [
  {
    title: "미지급 금액 항목별 정리",
    desc: "임금 미지급과 퇴직금 미지급을 따로 정리해요. 임금은 '몇 월 급여 / 지급 예정일 / 미지급 금액', 퇴직금은 '퇴직일 / 예상 퇴직금 / 14일 기한 초과일'을 표로 만들어두면 진정 처리가 빨라져요.",
    tip: "이자 기산점이 달라요. 임금은 지급일 다음 날, 퇴직금은 퇴직 후 15일째부터 이자가 시작돼요",
  },
  {
    title: "지연이자 계산",
    desc: "임금·퇴직금 각각에 연 20%를 적용해요. 계산 공식은 '미지급금액 × 0.2 × 지연일수 ÷ 365'예요. 두 이자를 합산한 금액이 원금과 함께 청구 금액이 돼요. 정확한 계산이 어려우면 어림잡아 적어도 근로감독관이 재산정해줘요.",
    tip: "위 계산기로 예상 이자를 먼저 확인해보세요",
  },
  {
    title: "내용증명 발송",
    desc: "임금·퇴직금 원금과 각각의 지연이자를 명시한 내용증명을 고용주에게 보내요. '근로기준법 시행령 제17조에 따른 연 20% 지연이자를 함께 청구한다'는 문구를 넣으세요. 내용증명만으로 해결되는 경우가 많아요.",
    tip: "우체국 또는 카카오 전자내용증명으로 발송. 발송 영수증·사본을 반드시 보관하세요",
  },
  {
    title: "고용노동부 임금체불 진정",
    desc: "내용증명 후에도 무응답이면 관할 지방고용노동청에 진정서를 접수해요. 임금 미지급과 퇴직금 미지급을 하나의 진정서에 모두 기재할 수 있어요. 온라인(민원마당)이나 방문 모두 무료예요. 접수 후 근로감독관이 조사·시정 명령을 내려요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정. 임금·퇴직금·이자를 한 번에 기재하세요",
    link: { label: "민원마당 임금체불 진정 접수", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "임금·퇴직금 금액 항목별 분리 정리: 각각 원금과 이자 기산점 파악",
  "이자 기산점 확인: 임금은 지급일 다음 날, 퇴직금은 퇴직 후 15일째",
  "소멸시효 3년 확인: 퇴직일로부터 3년 내 청구",
  "내용증명 발송: '연 20% 지연이자 청구' 문구 명시",
  "진정서에 임금·퇴직금·이자 모두 기재: 한 번에 청구",
  "서류 준비: 계약서·급여명세서·퇴직 증빙 중 있는 것 모두 첨부",
];

const FAQS = [
  {
    q: "임금 지연이자와 퇴직금 지연이자의 이율이 같나요?",
    a: "이율은 둘 다 연 20%로 같아요. 다른 건 이자 시작일이에요. 임금은 약정 지급일 다음 날부터, 퇴직금은 퇴직 후 15일째부터 이자가 붙기 시작해요.",
  },
  {
    q: "지연이자에 소득세가 붙나요?",
    a: "붙지 않아요. 지연이자는 이자소득이 아니라 손해배상 성격이에요. 별도로 소득세가 과세되지 않아요.",
  },
  {
    q: "회사가 일부만 줬을 때 이자는 어떻게 계산하나요?",
    a: "아직 받지 못한 잔액에 대해서만 이자가 붙어요. 1,000만원 중 600만원을 받았다면 남은 400만원에 대해 연 20%를 적용해요.",
  },
  {
    q: "5인 미만 사업장도 지연이자가 적용되나요?",
    a: "적용돼요. 근로기준법 시행령 제17조는 사업장 규모와 상관없이 모두 적용되는 조항이에요.",
  },
  {
    q: "회사가 이자 빼고 원금만 주겠다고 하면 어떻게 하나요?",
    a: "지연이자는 법에 명시된 권리이기 때문에 회사가 일방적으로 빼고 줄 수 없어요. 원금과 이자를 합산한 금액으로 합의를 결정하는 게 맞아요.",
  },
  {
    q: "퇴직금 소멸시효가 지나면 이자도 못 받나요?",
    a: "맞아요. 퇴직금 원금 청구권이 소멸하면 이자 청구권도 함께 소멸해요. 퇴직일로부터 3년이 지나기 전에 반드시 청구해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 금품 청산 (퇴직 후 14일 이내 지급 의무)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 시행령 제17조: 미지급 임금 지연이자 (연 20%)", url: "https://www.law.go.kr/법령/근로기준법시행령" },
      { label: "근로자퇴직급여 보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 임금체불 신고 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 계산법", description: "퇴직 후 14일이 지나면 연 20% 이자가 붙어요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "노동청 신고 준비 서류와 진행 절차." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "기한 초과 시 지연이자 발생 기준 정리." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="임금-퇴직금-미지급-이자" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>임금·퇴직금 · 미지급 이자 · 청구 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금과 퇴직금 미지급, 이자까지 받을 수 있나요?<br />
        지연이자 연 20% 기준부터 청구 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임금과 퇴직금을 못 받은 상태라면 원금에 지연이자까지 함께 청구할 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 시행령 제17조</a>가
        두 경우 모두 연 20% 지연이자를 적용해요.
        단, 이자가 시작되는 기산점이 달라요.
        임금은 약정 지급일 다음 날, 퇴직금은{" "}
        <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직 후 14일</a>이
        지난 15일째부터예요.
        두 항목을 노동청 진정 한 번으로 모두 청구하는 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 이자까지 청구할 수 있는 조건</H2>
      <p style={body}>
        임금과 퇴직금 지연이자는 법에 명시된 권리예요. 회사가 거부해도 근로감독관이 이자를 포함해 시정 명령을 내려줘요.
        소멸시효 3년 안에만 있다면 지금이라도 청구가 가능해요.
      </p>
      <p style={body}>
        두 항목의 이자 기산점이 다르기 때문에, 아래 체크리스트로 청구 가능 여부를 먼저 확인하고 금액 정리를 시작하세요.
      </p>

      <GreenBox title="임금·퇴직금 지연이자 핵심 기준">
        이자율: 연 20% (사업장 규모 무관)<br />
        임금 기산점: 약정 지급일 다음 날<br />
        퇴직금 기산점: 퇴직 후 15일째 (14일 기한 초과 시)<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임금과 퇴직금 이자를 함께 청구할 수 있는 상황이에요. 아래 계산기로 예상 이자를 확인해보세요."
        partialMatchText="상황에 따라 청구 가능 여부가 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>지연이자 연 20%, 얼마나 붙을까요?</H2>
      <p style={body}>
        임금과 퇴직금 합산 금액에 연 20%를 적용해 날수 기준으로 계산해요.
        700만원을 60일 동안 못 받았다면 이자만 약 23만원이에요.
        기간이 길수록 이자도 커지기 때문에 빠른 청구가 유리해요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 시행령 제17조 기준 연 20% 이율 적용. 임금은 지급일 다음 날, 퇴직금은 퇴직 후 15일째부터 계산."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>청구에 필요한 서류 목록</H2>
      <p style={body}>
        임금과 퇴직금을 한 번에 청구할 때 필요한 서류예요.
        서류가 없어도 통장 내역이나 문자 기록만으로 진정 접수는 가능해요.
      </p>
      <p style={body}>
        미지급 금액을 임금과 퇴직금으로 분리해서 정리한 표를 첨부하면 근로감독관이 빠르게 검토할 수 있어요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="미지급 내역 정리 방법">
        임금: 몇 월 급여 / 지급 예정일 / 미지급 금액 / 이자 기산 시작일<br />
        퇴직금: 퇴직일 / 예상 퇴직금 / 14일 기한 초과 날짜 / 이자 기산 시작일<br />
        이렇게 분리해서 정리하면 진정서 처리 속도가 빨라져요.
      </BorderBox>

      <Divider />

      <H2>임금·퇴직금 이자 청구 절차 4단계</H2>
      <p style={body}>
        두 항목을 따로 청구할 필요 없어요. 진정서 하나에 임금·퇴직금·이자를 모두 기재하면 돼요.
        아래 절차를 순서대로 따라가면 대부분 해결돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 준비 체크리스트</H2>
      <p style={body}>
        항목별로 미지급 금액을 정리해두면 진정 처리 속도가 빨라져요.
        이자 기산점이 다르기 때문에 임금과 퇴직금을 반드시 분리해서 계산하세요.
      </p>

      <SectionBadge>청구 전 준비 목록</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="임금·퇴직금, 한 번에 청구하세요">
        노동청 진정서에 임금 미지급과 퇴직금 미지급을 모두 기재할 수 있어요.
        별도로 두 번 신청할 필요가 없어요. 지연이자도 각각 명시해서 청구하면
        근로감독관이 두 항목을 함께 검토해 시정 지시를 내려요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금·퇴직금 미지급 이자에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로기준법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
