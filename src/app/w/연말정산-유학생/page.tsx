"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     자녀가 해외 유학 중인데 연말정산에서 공제받을 수 있는지, 어떤 서류가 필요한지 모르는 부모
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     유학생 자녀의 인적공제와 교육비 공제 가능 여부를 판단하고, 필요한 서류를 준비한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     인적공제(만 20세+소득 100만원), 교육비(연 300만원 한도, 나이무관), 어학연수 불가, 증빙서류(재학+납입), 해외소득 합산
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable로 공제 항목 비교 + GreenBox로 핵심 조건 + Steps로 서류 준비 절차 + BorderBox로 주의사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEDUCTION_TABLE = {
  headers: ["공제 항목", "조건", "공제 금액/한도", "비고"],
  rows: [
    ["인적공제", "만 20세 이하 + 소득 100만원 이하", "150만원 소득공제", "해외 소득도 합산"],
    ["교육비 세액공제", "정규 학위과정 재학", "연 300만원 x 15% = 45만원", "나이 제한 없음"],
    ["자녀세액공제", "만 8세 이상 기본공제 대상", "1명 25만원 (2025년 귀속)", "인적공제 받아야 가능"],
  ],
};

const NOT_TABLE = {
  headers: ["항목", "공제 여부", "이유"],
  rows: [
    ["해외 대학 등록금", "가능", "정규 학위과정"],
    ["해외 대학원 등록금", "가능", "석사·박사 포함"],
    ["어학연수 비용", "불가", "학위과정 아님"],
    ["교환학생 비용", "불가", "정규 학위과정 아님"],
    ["대학 부설 어학당", "불가", "학위과정 아님"],
    ["장학금 받은 부분", "불가", "본인 부담분만 공제"],
  ],
};

const DOC_STEPS = [
  { title: "해외 대학에서 재학증명서 수령", desc: "영문 재학증명서를 발급받으세요. 번역본이 필요하면 공증받아 두면 좋아요.", tip: "학기 시작 전에 미리 요청하면 편해요" },
  { title: "납입증명서(등록금 영수증) 발급", desc: "대학에서 발급하는 학비 납입 증명서가 필요해요. 금액과 납입일이 명시되어 있어야 해요." },
  { title: "송금 내역서 확인", desc: "은행 송금 내역이나 카드 결제 영수증을 함께 보관하세요. 실제 납부를 증명하는 보조 자료예요." },
  { title: "장학금 차감 후 실 납부액 계산", desc: "장학금을 받았으면 그 금액을 빼고 본인이 실제 낸 금액만 공제 신청하세요." },
  { title: "회사에 서류 제출", desc: "간소화서비스에는 해외 교육비가 안 나오므로, 위 서류를 직접 회사에 제출하세요." },
];

const FAQS = [
  { q: "만 21세 유학생은 공제 못 받나요?", a: "인적공제는 못 받아요(만 20세 초과). 하지만 교육비 세액공제는 나이 제한 없이 연 300만원까지 받을 수 있어요." },
  { q: "유학 중 아르바이트하면 어떻게 되나요?", a: "해외 소득도 소득 요건에 포함돼요. 연간 소득 100만원(근로소득만 있으면 총급여 500만원)을 넘으면 인적공제를 못 받아요." },
  { q: "어학연수 비용은 왜 공제가 안 되나요?", a: "교육비 공제는 정규 학위과정(학사·석사·박사)만 대상이에요. 어학연수, 교환학생, 대학 부설 어학당은 학위과정이 아니에요." },
  { q: "국내 대학과 한도가 다른가요?", a: "네. 국내 대학은 연 900만원 한도인데, 해외 대학은 연 300만원까지만 인정돼요. 공제율 15%는 동일해요." },
  { q: "간소화서비스에서 조회되나요?", a: "안 돼요. 해외 교육비는 간소화서비스에 자동 반영되지 않아요. 재학증명서와 납입증명서를 직접 준비해서 제출해야 해요." },
  { q: "미국·영국 등 어느 나라든 다 되나요?", a: "네. 국가 제한 없이 모든 해외 대학 정규 학위과정이 대상이에요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
  { name: "소득세법 제59조의4 (교육비 세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-대학교-등록금-공제", title: "연말정산 대학교 등록금 공제", description: "국내 대학 등록금 900만원 한도와 공제 조건." },
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목", description: "의료비, 교육비, 연금저축 등 전체 정리." },
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용방법", description: "홈택스 간소화 서비스 조회 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 유학생 · 교육비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        유학생 자녀, 연말정산 공제 가능할까?<br />
        인적공제와 교육비 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자녀가 해외 유학 중인데, 연말정산에서 공제를 받을 수 있는지 궁금하죠.
      </p>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 연말정산 안내</a>에 따르면 유학생 자녀도 공제받을 수 있어요. <strong>만 20세 이하면 인적공제 150만원</strong>, 해외 대학 등록금은 나이와 관계없이 <strong>연 300만원까지 15% 세액공제</strong>예요. 유학이라고 공제가 안 되는 건 아니에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>유학생 자녀가 받을 수 있는 공제</H2>
      <p style={body}>
        인적공제와 교육비 세액공제, 두 가지를 확인하세요. 나이와 소득 조건에 따라 달라져요.
      </p>

      <SectionBadge>유학생 자녀 공제 항목 (2025년 귀속)</SectionBadge>
      <DocTable headers={DEDUCTION_TABLE.headers} rows={DEDUCTION_TABLE.rows} />

      <GreenBox>
        만 20세 이하 유학생: 인적공제 150만원 + 교육비 45만원 = 최대 혜택{"\n"}
        만 21세 이상 유학생: 교육비 45만원(300만원 x 15%)만 가능{"\n\n"}
        소득 요건: 해외 아르바이트 포함 연 100만원 이하
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어학연수는 왜 공제가 안 되나요?</H2>
      <p style={body}>
        교육비 공제는 정규 학위과정만 대상이에요. 어학연수나 교환학생은 학위과정이 아니라서 공제 대상이 아니에요.
      </p>

      <SectionBadge>공제 가능·불가 항목 비교</SectionBadge>
      <DocTable headers={NOT_TABLE.headers} rows={NOT_TABLE.rows} />

      <p style={body}>
        <a href="/w/연말정산-대학교-등록금-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>국내 대학은 연 900만원</a>까지 공제되지만, 해외 대학은 연 300만원까지예요. 학사·석사·박사 구분 없이 모든 정규 학위과정이 대상이에요.
      </p>

      <Divider />

      <H2>서류 준비, 이렇게 하세요</H2>
      <p style={body}>
        해외 교육비는 간소화서비스에서 자동 조회되지 않아요. 직접 서류를 준비해야 해요.
      </p>

      <Steps steps={DOC_STEPS} />

      <Divider />

      <H2>해외 소득이 있으면 주의하세요</H2>
      <p style={body}>
        유학생 자녀가 현지에서 아르바이트나 인턴을 하면 그 소득도 연간 소득에 합산돼요.
      </p>

      <BorderBox>
        <strong>소득 요건 체크</strong>{"\n"}
        연간 소득금액 100만원(근로소득만 있으면 총급여 500만원) 초과 시 인적공제 탈락{"\n\n"}
        예) 미국에서 아르바이트로 연 2,000달러(약 260만원) → 소득 100만원 초과 → 인적공제 불가{"\n\n"}
        교육비 세액공제는 소득과 무관하게 가능해요
      </BorderBox>

      <Divider />

      <H2>유학생 연말정산, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 공제 한도와 조건은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
