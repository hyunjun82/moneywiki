"use client";

// Q1. 저신용·저소득 서민이 설 명절 자금이 필요해서 햇살론 특별 대출을 알아보는 상황
// Q2. 햇살론 일반·특례 중 맞는 상품을 확인하고, 서민금융진흥원 또는 취급 은행에서 대출을 신청한다
// Q3. 2026년 개편 구조(일반+특례), 대상(소득 3,500만/4,500만원 이하), 금리(일반 최대 10%, 특례 12.5%), 한도(일반 1,500만/특례 1,000만원), 신청 방법
// Q4. GreenBox(핵심 요약) + CompareTable(일반 vs 특례) + Steps(신청 절차) + BorderBox(주의사항) + FAQ
// MAP-INTRO: 설 명절 앞두고 목돈이 필요한데, 은행 대출이 어려운 상황이죠
// MAP-TYPE: 비교형
// MAP-H2: 햇살론 일반 vs 특례 > 신청 자격 > 어떻게 신청하나 > 주의할 점 > FAQ
// MAP-COMP: CompareTable > EligibilityChecker > Steps > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "대상 소득", optionA: "연 3,500만원 이하(신용 무관) 또는 4,500만원 이하+하위 20%", optionB: "연 3,500만원 이하 + 신용점수 하위 20%" },
  { label: "대출 한도", optionA: "최대 1,500만원", optionB: "최대 1,000만원" },
  { label: "금리", optionA: "연 5.25~10.00%", optionB: "연 12.5% 이내 (배려대상 9.9%)" },
  { label: "보증료", optionA: "연 2.5% 이내 (별도)", optionB: "금리에 포함" },
  { label: "상환 기간", optionA: "3~5년", optionB: "3~5년 선택" },
  { label: "취급 기관", optionA: "은행·저축은행·캐피탈", optionB: "저축은행·대부업체" },
];

const ELIGIBILITY = [
  { id: "income1", label: "연 소득 3,500만원 이하예요 (일반형: 신용점수 무관)" },
  { id: "income2", label: "연 소득 4,500만원 이하 + 신용점수 하위 20%예요 (일반형 추가 대상)" },
  { id: "credit", label: "연 소득 3,500만원 이하 + 신용점수 하위 20%예요 (특례형)" },
  { id: "age", label: "만 19세 이상이에요" },
  { id: "overdue", label: "현재 연체 중인 대출이 없어요" },
];

const STEPS_DATA = [
  {
    title: "서민금융진흥원 또는 은행에서 상담받으세요",
    desc: "서민금융진흥원 콜센터(1397)나 가까운 서민금융통합지원센터에서 상담을 받을 수 있어요. 본인의 소득·신용등급에 따라 일반형과 특례형 중 어디에 해당하는지 안내받을 수 있죠. 온라인으로도 자격 조회가 가능해요.",
    tip: "서민금융진흥원 앱·홈페이지에서 자격 조회 가능",
  },
  {
    title: "취급 금융기관에서 대출을 신청하세요",
    desc: "일반형은 시중 은행·저축은행·캐피탈에서, 특례형은 저축은행·대부업체에서 취급해요. 신분증, 소득증빙(원천징수영수증 또는 건강보험료 납부확인서), 주민등록등본을 가지고 방문하면 돼요. 일부 기관은 비대면 신청도 지원해요.",
    tip: "설 특별 대출 기간에는 심사가 빨라지는 경우 있어요",
  },
  {
    title: "심사 후 대출금을 수령하세요",
    desc: "서류 제출 후 보통 3~5영업일 이내에 심사 결과가 나와요. 승인되면 계좌로 대출금이 입금되고, 매월 원리금 균등상환으로 갚으면 돼요. 성실 상환 시 금리 인하 혜택이 있는 기관도 있어요.",
    tip: "원리금 균등상환: 매달 같은 금액 납부",
  },
];

const FAQS = [
  { q: "설에만 신청할 수 있나요?", a: "아니요, 햇살론은 연중 상시 신청 가능해요. 다만 설·추석 명절 전에 서민금융진흥원에서 '명절 특별 대출' 프로그램을 운영할 때가 있어요. 이때는 심사가 빨라지거나 한도가 소폭 늘어나는 등 혜택이 추가되는 경우가 있죠." },
  { q: "기존 햇살론15랑 뭐가 달라졌나요?", a: "2026년 1월부터 기존 근로자햇살론·햇살론뱅크는 '햇살론일반'으로, 햇살론15·최저신용자 특례보증은 '햇살론특례'로 통합됐어요. 특례형 금리가 기존 15.9%에서 12.5%로 3.4%p 낮아진 게 가장 큰 변화예요." },
  { q: "신용점수가 낮아도 되나요?", a: "일반형은 소득 3,500만원 이하면 신용점수와 무관하게 신청할 수 있어요. 특례형은 소득 3,500만원 이하 + 신용점수 하위 20%가 조건이에요. 일반 은행 대출이 안 되는 저신용자를 위한 상품이라 신용점수 기준이 완화돼 있어요." },
  { q: "대출 한도가 부족하면 어떻게 하나요?", a: "일반형 최대 1,500만원, 특례형 최대 1,000만원이 한도예요. 더 필요하면 서민금융통합지원센터에서 미소금융(무이자~저금리 소액대출)이나 긴급생활안정자금을 함께 상담받을 수 있어요." },
  { q: "기존 대출이 있어도 추가로 받을 수 있나요?", a: "기존 햇살론 잔액이 있으면 한도에서 차감돼요. 다른 금융기관 대출은 직접적으로 제한하지 않지만, 총부채 규모에 따라 심사에서 한도가 줄어들 수 있어요. 연체 중인 대출이 있으면 신청 자체가 안 돼요." },
  { q: "사회적 배려대상자는 금리가 더 낮다는데요?", a: "네, 특례형 기준으로 한부모가정·장애인·기초생활수급자·차상위계층 등 사회적 배려대상자는 연 9.9%로 이용할 수 있어요. 일반형도 배려대상자 우대금리가 적용되는 기관이 있으니 상담 시 꼭 확인하세요." },
];

const REFS = [
  { category: "신청", items: [
    { label: "서민금융진흥원 - 햇살론", url: "https://www.kinfa.or.kr" },
    { label: "서민금융진흥원 콜센터 1397", url: "https://www.kinfa.or.kr" },
  ]},
  { category: "참고", items: [
    { label: "금융위원회 - 서민금융 정책", url: "https://www.fsc.go.kr" },
  ]},
];

const RELATED = [
  { title: "긴급복지 생계지원금 신청", slug: "긴급복지-생계지원금-신청-방법", description: "" },
  { title: "예금자보호제도", slug: "예금자보호제도", description: "" },
  { title: "CMA계좌 금리 혜택", slug: "CMA계좌-금리-혜택", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>대출·서민금융</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        햇살론 설 대출, 받을 수 있을까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>일반·특례 조건과 신청 방법</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 명절 앞두고 목돈이 필요한데, 은행 대출이 어려운 상황이죠.
        2026년부터 햇살론이 '일반'과 '특례' 두 가지로 개편됐어요.
        소득 3,500만원 이하면 신용점수 관계없이 일반형을 신청할 수 있고, 금리도 최대 연 10%로 제한돼요.
      </p>
      <Divider />

      <H2>햇살론 일반 vs 특례, 뭐가 다른가요?</H2>
      <p style={body}>
        2026년 1월 개편으로 기존의 복잡한 상품 체계가 단순해졌어요.
        일반형은 기존 근로자햇살론·햇살론뱅크가 합쳐진 거고, 특례형은 햇살론15·최저신용자 특례보증이 합쳐진 거예요.
        가장 큰 차이는 대상, 금리, 한도예요.
      </p>
      <SectionBadge>핵심 비교</SectionBadge>
      <CompareTable titleA="햇살론 일반" titleB="햇살론 특례" rows={COMPARE_ROWS} />
      <p style={body}>
        특례형은 기존 15.9%에서 12.5%로 금리가 크게 낮아졌어요.
        사회적 배려대상자(한부모·장애인·수급자 등)는 9.9%까지 내려가고요.
        일반형이 조건이 더 넓으니 먼저 일반형 대상인지 확인하세요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>내가 신청할 수 있는지 확인해 보세요</H2>
      <p style={body}>
        햇살론은 저소득·저신용 서민을 위한 정책 대출이에요.
        소득과 신용점수 기준이 있고, 현재 연체 중이면 신청이 안 돼요.
        아래 항목 중 하나 이상에 해당하면 신청 대상이에요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="햇살론 신청 대상이에요!"
        partialMatchText="소득·신용 조건 중 하나만 맞아도 해당 유형에 신청할 수 있어요."
      />
      <p style={body}>
        소득 증빙은 원천징수영수증, 건강보험료 납부확인서, 소득금액증명원 중 하나로 해요.
        프리랜서·자영업자는 종합소득세 신고서로 증빙할 수 있어요.
      </p>
      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        서민금융진흥원 콜센터(1397)에서 상담받거나, 취급 금융기관에 직접 방문해서 신청할 수 있어요.
        설 명절 전에는 특별 프로그램이 운영되기도 하니 미리 확인하세요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        서민금융통합지원센터(전국 53곳)에서는 햇살론 외에도 미소금융, 긴급생활안정자금, 채무조정까지 원스톱으로 상담받을 수 있어요.
      </p>
      <Divider />

      <H2>신청 전 주의할 점</H2>
      <p style={body}>
        햇살론은 정책 대출이라 일반 대출보다 조건이 좋지만, 그래도 대출은 대출이에요.
        상환 계획을 세우고 신청하는 게 중요하죠.
      </p>
      <BorderBox title="주의사항">
        <p style={{ ...body, marginBottom: 6 }}>연체 시 신용점수 하락 + 추가 대출 제한</p>
        <p style={{ ...body, marginBottom: 6 }}>보증료(일반형 연 2.5% 이내)는 금리와 별도</p>
        <p style={{ ...body, marginBottom: 6 }}>한도 이상 필요 시 불법 사금융 이용 절대 금지</p>
        <p style={{ ...body, marginBottom: 6 }}>명절 특별 대출 사칭 보이스피싱 주의 (서민금융진흥원은 선입금 요구 안 함)</p>
        <p style={{ ...body, marginBottom: 6 }}>상환 어려울 때 → 서민금융통합지원센터에서 채무조정 상담</p>
      </BorderBox>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 서민금융진흥원·금융위원회 자료를 바탕으로 작성했어요. 금리·한도는 취급 기관과 개인 신용에 따라 달라질 수 있으니 직접 상담받으세요." />

      <CategoryButton label="대출·서민금융" href="/categories/loan" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
