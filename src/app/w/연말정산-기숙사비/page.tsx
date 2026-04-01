"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 대학생 자녀 기숙사비를 연말정산에서 공제받을 수 있는지 궁금
// Q2. 기숙사비는 교육비 공제 안 됨 확인 → 카드 공제 가능 여부 확인
// Q3. 기숙사비=숙식비라 교육비 공제 불가, 등록금만 공제, 카드로 내면 카드 공제 가능
// Q4. GreenBox(결론: 교육비 공제 불가) + CompareTable(공제 가능 vs 불가) + Checklist(교육비 공제 대상) + FAQ

import {
  H2, GreenBox, Divider, body, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "등록금(수업료·입학금)", optionA: "O (15%, 연 900만원)", optionB: "—" },
  { label: "교재비", optionA: "X", optionB: "카드 공제 가능" },
  { label: "기숙사비", optionA: "X", optionB: "카드 공제 가능" },
  { label: "급식비(대학)", optionA: "X", optionB: "카드 공제 가능" },
  { label: "학원비(취학 전)", optionA: "O (연 300만원)", optionB: "—" },
];

const CHECKLIST = [
  "대학교 등록금(수업료·입학금)을 납부했다",
  "자녀가 만 20세 이하이거나 장애인 특수교육비이다",
  "자녀의 연간 소득이 100만원 이하이다",
  "배우자와 중복 공제하지 않는다",
  "간소화서비스에서 교육비 항목을 확인했다",
];

const FAQS = [
  { q: "기숙사비가 왜 교육비 공제가 안 되나요?", a: "소득세법에서 교육비로 인정하는 항목은 수업료·입학금·보육비·급식비(취학 전)예요. 기숙사비는 숙식비로 분류돼서 교육비에 포함되지 않아요." },
  { q: "학교 등록금에 기숙사비가 포함돼 있으면요?", a: "등록금 고지서에서 수업료와 기숙사비가 구분돼 있으면 수업료만 공제돼요. 구분되지 않으면 학교에 확인해보세요." },
  { q: "대학원 등록금도 공제되나요?", a: "본인의 대학원 등록금은 전액 공제돼요. 자녀의 대학원은 공제 안 돼요(대학교까지만)." },
  { q: "카드로 기숙사비 내면 얼마나 공제되나요?", a: "신용카드 15%, 체크카드 30% 소득공제를 받을 수 있어요. 교육비 공제보다 세액공제 효과는 작지만 안 받는 것보단 나아요." },
  { q: "해외 대학 기숙사비도 마찬가지인가요?", a: "해외 대학 교육비 중 수업료는 공제 가능하지만 기숙사비는 동일하게 불가해요." },
];

const REFERENCES = [
  { category: "법령", items: [{ label: "소득세법 제59조의4 (교육비 세액공제)", url: "https://www.law.go.kr/법령/소득세법" }] },
  { category: "기관", items: [{ label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" }] },
];

const RELATED = [
  { slug: "연말정산-급식비", title: "연말정산 급식비 공제", description: "급식비 교육비 공제 기준이에요." },
  { slug: "연말정산-유학생-소득공제", title: "연말정산 유학생 소득공제", description: "해외 유학 교육비 공제예요." },
  { slug: "연말정산-세액공제-순서", title: "연말정산 세액공제 순서", description: "세액공제 적용 순서 정리예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교육비</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대학 기숙사비, 연말정산 교육비 공제될까?<br />
        공제 가능 항목과 카드 공제 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자녀 대학 기숙사비가 꽤 큰데 연말정산에서 돌려받을 수 있는지 궁금하죠.
        안타깝지만 기숙사비는 교육비 공제 대상이 아니에요. 카드로 결제했다면 신용카드 소득공제는 가능해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>기숙사비는 교육비 공제 안 돼요</H2>
      <p style={body}>소득세법에서 교육비로 인정하는 항목에 기숙사비(숙식비)는 포함되지 않아요.</p>
      <GreenBox>
        <strong>교육비 세액공제 대상</strong>: 수업료, 입학금, 보육비, 급식비(취학 전 아동)<br />
        <strong>대상 아닌 것</strong>: 기숙사비, 교재비, 교통비, 기타 실비<br /><br />
        ★ 기숙사비를 카드로 결제했다면 신용카드 소득공제(15%/30%)로 돌려받으세요
      </GreenBox>

      <H2>뭐가 되고 뭐가 안 되는지 비교</H2>
      <p style={body}>대학 관련 비용 중 교육비 공제가 되는 항목과 안 되는 항목이에요.</p>
      <CompareTable titleA="교육비 세액공제" titleB="카드 공제만 가능" rows={COMPARE_ROWS} />

      <H2>교육비 공제 대상인지 체크하세요</H2>
      <p style={body}>등록금은 공제가 되니 빠뜨리지 마세요.</p>
      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세법 개정에 따라 변경될 수 있으니 국세청 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
