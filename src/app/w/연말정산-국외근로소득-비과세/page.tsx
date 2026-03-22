"use client";

// Q1. 해외에서 근무 중인데 비과세 혜택이 있는지, 한도가 얼마인지 알고 싶은 상태
// Q2. 내 근무 유형에 맞는 비과세 한도를 확인하고, 연말정산에서 비과세 신청을 한다
// Q3. 일반 국외근로 월 300만원→500만원(2025 변경), 원양어선·해외건설 월 500만원, 비과세 대상 요건, 신청 방법
// Q4. GreenBox(한도 비교) + DocTable(유형별 한도표) + BorderBox(대상 요건) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const LIMIT_TABLE = {
  headers: ["근무 유형", "월 비과세 한도", "연 비과세 한도"],
  rows: [
    ["일반 국외근로", "월 500만원", "연 6,000만원"],
    ["원양어업 선박", "월 500만원", "연 6,000만원"],
    ["해외건설 현장", "월 500만원", "연 6,000만원"],
    ["국외 항행 선박·항공기", "월 500만원", "연 6,000만원"],
  ],
};

const CHECKLIST = [
  "해외에 상주하면서 근무하고 있다 (단기 출장 제외)",
  "국외 근무지에서 발생한 소득이다",
  "비과세 한도 초과분은 일반 근로소득으로 신고할 준비가 됐다",
  "근무지·기간 증빙서류를 준비했다",
];

const FAQS = [
  { q: "해외 출장도 비과세 대상인가요?", a: "아니에요. 단기 출장은 해당되지 않아요. 해외에 상주하면서 근무해야 비과세가 적용돼요. 주재원, 해외 파견 근무 등이 해당돼요." },
  { q: "국내 회사에서 급여를 받으면 안 되나요?", a: "국내 회사에서 급여를 받아도 해외 근무지에서 발생한 소득이면 비과세 대상이에요. 급여 지급 주체가 아니라 근무 장소가 기준이에요." },
  { q: "비과세 한도 초과분은 어떻게 되나요?", a: "초과분은 일반 근로소득으로 과세돼요. 비과세 한도까지만 세금 면제이고, 나머지는 정상적으로 연말정산에 포함돼요." },
  { q: "2025년 귀속에서 한도가 바뀌었나요?", a: "네, 일반 국외근로소득 비과세 한도가 월 300만원에서 월 500만원으로 상향됐어요. 원양어선·해외건설은 기존에도 월 500만원이었어요." },
  { q: "외국 납부 세금은 이중과세되나요?", a: "외국에서 세금을 냈다면 외국납부세액공제를 받을 수 있어요. 비과세와 별개로 이중과세를 방지하는 제도예요." },
  { q: "해외 주재원인데 어떻게 신고해요?", a: "국내 원천징수 의무자(파견 기업)가 연말정산을 처리해요. 비과세 한도를 적용한 나머지 금액에 대해 정산하면 돼요." },
];

const SOURCES = [
  { name: "국세청 비과세 근로소득", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7867&mi=6431" },
  { name: "소득세법 제12조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도 비교." },
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산 방법." },
  { slug: "연말정산-공무원", title: "공무원 연말정산", description: "공무원연금 기여금 공제 방식과 차이점." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국외근로소득 비과세, 한도가 얼마일까?<br />
        2025년 월 500만원 상향과 적용 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외에서 일하고 계시죠. 국외근로소득은 일정 금액까지 세금이 면제돼요. 2025년 귀속부터 일반 국외근로의 비과세 한도가 월 300만원에서 월 500만원으로 올랐어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제12조</a>에 따라 해외 상주 근무자의 급여 중 한도 내 금액은 비과세예요. 단기 출장은 해당되지 않으니 주의하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>비과세 한도 핵심 요약</H2>
      <p style={body}>
        2025년 귀속 기준, 근무 유형별 비과세 한도예요.
      </p>

      <GreenBox>
        2025년 귀속부터 일반 국외근로: 월 300만원 → 월 500만원으로 상향{"\n"}
        원양어선·해외건설·국외항행: 기존과 동일 월 500만원{"\n"}
        한도 초과분은 일반 근로소득으로 과세
      </GreenBox>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>근무 유형별 비과세 한도표</H2>
      <p style={body}>
        어떤 유형으로 해외 근무 중인지에 따라 한도가 적용돼요.
      </p>
      <SectionBadge>2025년 귀속 국외근로소득 비과세 한도</SectionBadge>
      <DocTable headers={LIMIT_TABLE.headers} rows={LIMIT_TABLE.rows} />

      <Divider />

      <H2>비과세 받으려면 이 조건을 충족해야 해요</H2>
      <p style={body}>
        해외에서 일한다고 무조건 비과세가 아니에요. 아래 조건을 체크해보세요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>비과세 대상이 아닌 경우</strong><br />
        해외 단기 출장 (상주 근무 아님){"\n"}
        국내에서 원격 근무하면서 해외 회사 급여를 받는 경우{"\n"}
        비거주자로 분류되는 경우 (별도 세금 규정 적용)
      </BorderBox>

      <Divider />

      <H2>국외근로소득 비과세, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 소득세법 제12조를 기준으로 작성했어요. 비과세 한도와 적용 대상은 법 개정에 따라 달라질 수 있으니 국세청(126)이나 홈택스에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
