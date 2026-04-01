"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 자녀 급식비가 연말정산에서 공제되는지 확인하려는 직장인 부모
// Q2. 어린이집·유치원 vs 초중고 급식비 공제 여부 구분 → 해당되면 교육비 공제 신청
// Q3. 취학 전 아동만 교육비 공제, 초중고는 카드 공제만, 공제 한도 300만원, 무상급식 해당 없음
// Q4. GreenBox(공제 가능/불가 구분) + CompareTable(취학전 vs 초중고) + Checklist(공제 체크) + FAQ

import {
  H2, GreenBox, Divider, body, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "교육비 세액공제", optionA: "O (15%, 연 300만원 한도)", optionB: "X" },
  { label: "신용카드 소득공제", optionA: "O (카드 결제 시)", optionB: "O (카드 결제 시)" },
  { label: "대상 급식비", optionA: "유료 급식비 전액", optionB: "—" },
  { label: "간소화서비스 조회", optionA: "자동 반영", optionB: "카드 내역으로 확인" },
  { label: "무상급식", optionA: "해당 없음", optionB: "해당 없음" },
];

const CHECKLIST = [
  "자녀가 어린이집 또는 유치원에 다니고 있다",
  "급식비를 직접 납부하고 있다 (무상급식 아님)",
  "연간 교육비(입학금+수업료+급식비 등) 합계가 300만원 이하다",
  "연말정산 간소화서비스에서 교육비 항목을 확인했다",
  "맞벌이라면 부부 중 한 명만 공제 신청한다",
];

const FAQS = [
  { q: "유치원 급식비만 내고 수업료는 무상인데 공제되나요?", a: "네, 급식비만 별도로 납부하고 있으면 교육비 공제 대상이에요. 수업료 무상 여부와 상관없어요." },
  { q: "초등학교 급식비를 카드로 내면 얼마나 공제되나요?", a: "신용카드 소득공제로 15% 공제돼요. 체크카드면 30%예요. 교육비 공제는 안 되지만 카드 공제는 받을 수 있어요." },
  { q: "영수증을 따로 챙겨야 하나요?", a: "어린이집·유치원 급식비는 간소화서비스에서 자동 조회돼요. 초중고는 카드 결제 내역으로 자동 반영이에요." },
  { q: "두 자녀가 각각 유치원, 초등학교면요?", a: "유치원 자녀 급식비만 교육비 공제 대상이에요. 초등학교 자녀 급식비는 카드 공제만 가능해요. 한도는 자녀당 300만원이에요." },
  { q: "맞벌이 부부 중 누가 공제받는 게 유리하나요?", a: "총급여가 높은 쪽이 공제받는 게 보통 유리해요. 다만 다른 공제 항목과 합산해서 시뮬레이션해보는 게 정확해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "소득세법 제59조의4 (교육비 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
  ]},
  { category: "기관", items: [
    { label: "국세청 교육비 공제 안내", url: "https://www.nts.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-다자녀-세액공제", title: "연말정산 다자녀 세액공제", description: "자녀 수별 세액공제 금액이에요." },
  { slug: "연말정산-자녀-세액공제-조건", title: "연말정산 자녀 세액공제 조건", description: "자녀 세액공제 나이·소득 요건이에요." },
  { slug: "연말정산-주택청약-공제", title: "연말정산 주택청약 공제", description: "청약저축 납입액 소득공제예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교육비</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자녀 급식비, 연말정산에서 공제될까?<br />
        어린이집·유치원 vs 초중고 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자녀 급식비도 연말정산에서 돌려받을 수 있는지 궁금하죠.
        어린이집·유치원 급식비는 교육비 세액공제가 돼요. 초중고 급식비는 교육비 공제는 안 되지만 카드로 내면 카드 공제를 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>어린이집·유치원만 교육비 공제돼요</H2>
      <p style={body}>
        소득세법에서 취학 전 아동(어린이집·유치원)의 급식비를 교육비 공제 대상으로 인정해요. 초중고는 해당되지 않아요.
      </p>
      <GreenBox>
        <strong>공제 가능</strong>: 어린이집·유치원 급식비 → 교육비 세액공제 15%, 연 300만원 한도<br />
        <strong>공제 불가</strong>: 초·중·고 급식비 → 교육비 공제 안 됨 (카드 공제만 가능)<br />
        <strong>무상급식</strong>: 본인 부담금이 0원이면 공제 대상 자체가 없어요
      </GreenBox>

      <H2>취학 전 vs 초중고 비교</H2>
      <p style={body}>
        같은 급식비여도 자녀 나이에 따라 공제 방법이 완전히 달라요.
      </p>
      <CompareTable titleA="어린이집·유치원" titleB="초·중·고등학교" rows={COMPARE_ROWS} />

      <H2>공제 전에 이것만 확인하세요</H2>
      <p style={body}>
        교육비 공제를 놓치지 않으려면 아래 항목을 체크해보세요.
      </p>
      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 공제 한도와 요건은 매년 변경될 수 있으니 국세청 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
