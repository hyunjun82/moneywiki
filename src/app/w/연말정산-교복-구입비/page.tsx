"use client";
// Q1. 중고등학생 자녀 교복을 샀는데 연말정산에서 공제받을 수 있는지, 어떻게 신청하는지 궁금한 상황
// Q2. 교복비 공제 한도(50만원)와 영수증 준비 방법을 확인하고 연말정산에 반영한다
// Q3. 공제 대상(중·고등학생), 한도(1인당 50만원), 공제율(15%), 교육비 300만원 한도와 별도, 체육복 포함, 간소화서비스 자동 반영, 영수증 미반영 시 직접 제출
// Q4. GreenBox(핵심 요약) + 비교표(공제 범위) + Steps(신청 절차) + Checklist(대상 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 간소화서비스에서 교복비 조회하세요",
    desc: "1월 15일부터 홈택스에서 교복비가 자동 조회돼요. 교복 업체가 국세청에 자료를 제출했다면 별도 영수증 없이 바로 반영할 수 있어요.",
    link: { label: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
  },
  {
    title: "간소화에 없으면 영수증을 직접 받으세요",
    desc: "모든 교복점이 국세청에 자료를 제출하는 건 아니에요. 조회가 안 되면 교복점에서 영수증(학생 이름, 학교명, 품목, 금액 포함)을 직접 받아야 해요.",
    tip: "현금영수증이나 카드 결제 영수증도 증빙 가능",
  },
  {
    title: "회사에 연말정산 서류를 제출하세요",
    desc: "간소화 PDF와 함께 추가 영수증을 회사에 제출하면 돼요. 간소화에서 조회된 건 자동 반영이고, 안 나오는 항목만 추가로 제출해요.",
  },
];

const CHECKLIST = [
  "중학생 또는 고등학생 자녀인지 확인 (초등·대학 불가)",
  "자녀 기본공제를 본인이 받고 있는지 확인",
  "교복 + 체육복 합산 50만원 한도",
  "간소화서비스에서 교복비 조회 여부 확인",
  "미조회 시 교복점 영수증 보관",
];

const FAQS = [
  { q: "교복비 공제 한도는 얼마인가요?", a: "학생 1인당 연 50만원이에요. 교복과 체육복을 합쳐서 50만원까지 공제돼요. 50만원 x 15% = 최대 7만 5천원을 세금에서 빼줘요." },
  { q: "초등학생 교복도 공제되나요?", a: "아니요. 중학생과 고등학생만 해당돼요. 초등학생은 교복이 의무가 아니라 공제 대상이 아니에요." },
  { q: "체육복도 교복비에 포함되나요?", a: "네, 학교 지정 체육복도 교복에 포함돼서 공제받을 수 있어요. 교복 + 체육복 합산으로 50만원 한도가 적용돼요." },
  { q: "교육비 300만원 한도와 별도인가요?", a: "별도예요. 중고등학생 교육비 300만원 한도에 교복비 50만원이 추가로 공제돼요. 수업료 300만원 + 교복비 50만원 = 350만원까지 가능해요." },
  { q: "맞벌이 부부는 누가 공제받나요?", a: "자녀 기본공제를 받는 사람이 교복비도 공제받아요. 남편이 자녀 기본공제를 받았다면 교복비도 남편 연말정산에서 공제해요. 나눠서 받을 수 없어요." },
  { q: "중고 교복도 공제되나요?", a: "영수증이 있다면 중고 교복도 공제 가능해요. 신품이든 중고든 상관없어요. 다만 교복 대여는 구입이 아니라서 공제 대상이 아니에요." },
  { q: "교복 가방이나 신발도 공제되나요?", a: "안 돼요. 학교 지정 품목이어도 가방, 신발, 모자, 양말은 교복으로 인정되지 않아요. 교복 본체와 부속품(셔츠, 넥타이, 벨트 등)만 해당돼요." },
];

const SOURCES = [
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-건강보험료", title: "연말정산 건강보험료 공제", description: "건강보험료 전액 소득공제 안내." },
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "교육비 공제 한도와 대상 정리." },
  { slug: "연말정산-간소화서비스-이용방법", title: "간소화서비스 이용방법", description: "홈택스 연말정산 자료 다운로드." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교복비 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 교복비, 얼마까지 공제되나요?<br />
        1인당 50만원 한도와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "교복값이 50만원 넘게 나왔는데 연말정산에서 돌려받을 수 있나요?"
      </p>
      <p style={body}>
        중고등학생 교복비는 <strong>1인당 연 50만원 한도</strong>로 지출액의 <strong>15%를 세액공제</strong>받아요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에서 정한 교육비 특별세액공제의 일부예요.
        체육복도 포함되고, <a href="/w/연말정산-교육비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>교육비 300만원 한도와 별도</a>로 추가 공제돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제 한도와 환급액은 얼마인가요?</H2>
      <p style={body}>
        학생 1인당 연 50만원이 한도예요. 교복과 체육복을 합산해서 50만원까지만 공제돼요.
      </p>

      <GreenBox>
        교복비 50만원 x 15% = 최대 7만 5천원 세금 환급{"\n"}
        자녀 2명(둘 다 중고등학생): 100만원 x 15% = 15만원 환급{"\n"}
        교육비 300만원 한도와 별도이므로 추가 공제 가능
      </GreenBox>

      <SectionBadge>공제 대상과 범위</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제 여부</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["동복·하복·춘추복 교복", "O"],
              ["학교 지정 체육복", "O"],
              ["셔츠, 넥타이, 벨트 등 부속품", "O"],
              ["중고 교복 (영수증 있을 때)", "O"],
              ["교복 가방, 신발", "X"],
              ["모자, 양말", "X"],
              ["교복 대여", "X"],
              ["초등학생 교복", "X"],
            ].map(([항목, 여부], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{항목}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: 여부 === "O" ? "#1D9E75" : "#dc2626" }}>{여부}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="연말정산 정보" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>영수증 준비와 신청 방법은요?</H2>
      <p style={body}>
        대부분 간소화서비스에서 자동 조회돼요. 안 나오는 경우만 직접 영수증을 챙기면 돼요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>공제 대상인지 어떻게 확인하나요?</H2>
      <p style={body}>
        아래 항목을 하나씩 체크해 보세요. 전부 해당하면 공제 가능해요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>맞벌이 부부 주의사항</strong>{"\n"}
        자녀 기본공제를 받는 사람만 교복비 공제를 받을 수 있어요. 남편이 자녀 기본공제를 받았다면 교복비도 남편 연말정산에서 처리해야 해요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 세법 개정에 따라 내용이 달라질 수 있으니 국세청에서 확인하세요." />
    </ArticleLayout>
  );
}
