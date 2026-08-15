"use client";
// Q1. 급여명세서에 항목이 많은데 뭐가 세금 붙고 뭐가 안 붙는지 확인하려는 직장인
// Q2. 본인 급여명세서에서 과세 항목과 비과세 항목을 구분하고 연말정산에 반영한다
// Q3. 소득세법 제20조 근로소득 정의, 과세 항목(급여·상여·수당·현물급여), 비과세 항목(식대·보육수당 등), 2025 개정
// Q4. GreenBox(과세/비과세 구분) + BorderBox(비과세 한도표) + Checklist(급여명세서 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "급여명세서에서 비과세 항목이 제대로 분리되어 있는지 확인",
  "식대 월 20만원 비과세가 반영되어 있는지 확인",
  "퇴직위로금이 근로소득으로 잡혀 있는지 확인 (퇴직금과 다름)",
  "자사제품 할인 연 240만원 초과분이 과세 처리되었는지 확인",
  "스톡옵션 행사이익이 근로소득으로 과세되고 있는지 확인",
];

const FAQS = [
  {
    q: "상여금도 근로소득이에요?",
    a: "네, 명절 상여금·성과급·인센티브 전부 근로소득으로 과세돼요. 100만원 보너스 받으면 그것도 세금 붙어요.",
  },
  {
    q: "회사에서 점심 제공하면 과세되나요?",
    a: "식사를 현물로 제공받거나 월 20만원 이하 식대는 비과세예요. 초과분만 과세돼요.",
  },
  {
    q: "스톡옵션도 근로소득인가요?",
    a: "네, 스톡옵션 행사이익(행사 시점 시가 - 행사 가격)은 근로소득으로 과세돼요.",
  },
  {
    q: "퇴직금이랑 퇴직위로금은 다른 건가요?",
    a: "네, 완전히 달라요. 퇴직금은 퇴직소득으로 별도 과세되고, 퇴직위로금은 근로소득으로 과세돼요. 헷갈리면 급여명세서를 확인하세요.",
  },
  {
    q: "프리랜서 수입도 근로소득이에요?",
    a: "아니에요. 고용관계 없이 용역비를 받으면 사업소득이나 기타소득이에요. 근로소득은 고용 관계에서 받는 대가만 해당돼요.",
  },
  {
    q: "야간근로수당은 비과세인가요?",
    a: "생산직 근로자가 야간에 일하면 야간근로수당 연 240만원까지 비과세예요. 사무직은 해당 안 돼요.",
  },
];

const SOURCES = [
  { name: "소득세법 제20조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 근로소득 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6594&cntntsId=7873" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 공제 한도와 계산법", description: "25% 초과분부터 시작, 카드별 공제율 정리." },
  { slug: "연말정산-문화비", title: "문화비 소득공제 30%", description: "도서·공연·영화비 30% 공제받는 법." },
  { slug: "연말정산-다자녀-추가공제", title: "다자녀 자녀세액공제", description: "자녀 수에 따라 25만~95만원 세액공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 근로소득 · 과세 범위</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월급 말고 뭐가 근로소득이에요?<br />
        과세·비과세 항목 구분법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서 보면 항목이 많은데, 뭐가 세금 붙고 뭐가 안 붙는지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제20조</a> 기준으로
        고용 관계에서 받는 대가는 기본적으로 전부 근로소득이에요.
        급여뿐 아니라 상여금·수당·현물급여까지 포함돼요.
        다만 식대·보육수당처럼 <strong>비과세</strong>로 빠지는 항목이 있어서, 이걸 정확히 알아야 연말정산 때 손해를 안 봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>근로소득에 포함되는 것과 안 되는 것</H2>
      <p style={body}>
        기본급은 당연하고, 의외로 세금이 붙는 항목이 꽤 있어요.
      </p>

      <SectionBadge>과세·비과세 구분</SectionBadge>
      <GreenBox title="세금 붙는 항목 (과세)">
        <p>기본급, 상여금(명절·성과급·인센티브), 직책수당, 직무수당, 야근수당, 휴일수당, 퇴직위로금, 스톡옵션 행사이익, 자사제품 할인 연 240만원 초과분, 사택 무상 제공(소형주택 제외), 회사차량 사적 사용분</p>
      </GreenBox>
      <GreenBox title="세금 안 붙는 항목 (비과세)">
        <p>식대 월 20만원, 출산·보육수당 월 20만원, 자가운전보조금(차량유지비) 월 20만원, 생산직 야간근로수당 연 240만원, 국외근로소득 월 300만원, 자사제품 할인 연 240만원 이하, 소형사택(85㎡ 이하·기준시가 3억 이하)</p>
      </GreenBox>
      <p style={body}>
        비과세 한도를 넘으면 초과분은 과세돼요.
        식대 월 30만원이면 20만원은 비과세, 10만원은 과세예요.
      </p>

      <Divider />

      <H2>비과세 항목별 한도를 정리했어요</H2>
      <p style={body}>
        2025년 귀속 기준으로 주요 비과세 한도예요.
      </p>

      <SectionBadge>비과세 한도</SectionBadge>
      <BorderBox>
        <p><strong>식대</strong> — 월 20만원 (연 240만원)</p>
        <p><strong>출산·보육수당</strong> — 월 20만원</p>
        <p><strong>자가운전보조금</strong> — 월 20만원 (본인 차량 업무 사용 시)</p>
        <p><strong>생산직 야간근로수당</strong> — 연 240만원 (사무직 해당 없음)</p>
        <p><strong>국외근로소득</strong> — 월 300만원 (해외 파견 근무 시)</p>
        <p><strong>자사제품 할인</strong> — 연 240만원 (2025년 신설)</p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>근로소득이 아닌 것도 알아두세요</H2>
      <p style={body}>
        고용관계가 아니면 근로소득이 아니에요. 종류가 달라서 세금 계산 방식도 달라요.
      </p>
      <BorderBox>
        <p><strong>프리랜서 용역비</strong> → 사업소득 또는 기타소득</p>
        <p><strong>강연료 (일시적)</strong> → 기타소득</p>
        <p><strong>임대료</strong> → 부동산임대소득</p>
        <p><strong>주식 배당금</strong> → 배당소득</p>
        <p><strong>퇴직금</strong> → 퇴직소득 (근로소득 아님!)</p>
      </BorderBox>

      <Divider />

      <H2>급여명세서에서 이것만 체크하세요</H2>
      <p style={body}>
        <a href="/w/연말정산-신용카드-공제-한도" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a> 전에
        급여명세서를 한번 점검하면 놓치는 공제를 줄일 수 있어요.
      </p>

      <SectionBadge>급여명세서 체크포인트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <CategoryButton label="연말정산" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준(소득세법)으로 작성했어요. 개인 상황에 따라 과세 여부가 달라질 수 있으니 국세청 상담센터(126)에 문의하세요." />
    </ArticleLayout>
  );
}
