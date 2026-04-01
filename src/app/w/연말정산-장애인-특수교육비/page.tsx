"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 장애인 자녀 재활치료비가 공제되는지, 한도가 얼마인지 확인하려는 상황
// Q2. 장애인 특수교육비를 한도 없이 15% 세액공제받고 필요 서류를 준비한다
// Q3. 공제 대상 비용(재활교육비 vs 일반 학원비), 인가 시설 기준, 일반 교육비와 중복 적용 가능, 서류
// Q4. GreenBox(결론 요약) + BorderBox(대상 비용 구분) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "교육비 납입증명서 (시설에서 발급)",
  "장애인증명서 또는 장애인등록증 (장애인 자격 확인)",
  "간소화서비스에서 자동 조회되는지 먼저 확인",
  "조회 안 되면 시설에 직접 납입증명서 요청",
  "증빙서류 5년 보관 (경정청구 시 필요할 수 있음)",
];

const FAQS = [
  {
    q: "장애인 자녀 일반 학원비도 공제되나요?",
    a: "안 돼요. 태권도, 영어 같은 일반 학원비는 대상이 아니에요. 사회복지시설이나 재활교육 기관에서 받는 재활 목적 교육비만 해당돼요.",
  },
  {
    q: "발달재활서비스 바우처 본인부담금도 공제 되나요?",
    a: "네, 바우처로 지원받고 본인이 낸 부담금은 공제 대상이에요. 교육비 납입증명서를 발달재활서비스 제공기관에서 받으면 돼요.",
  },
  {
    q: "세법상 장애인(중증환자)도 대상인가요?",
    a: "네, 암·치매·중풍 등 항시 치료가 필요한 중증환자도 병원에서 장애인증명서를 발급받으면 세법상 장애인으로 인정돼요. 특수교육비 공제도 가능하고요.",
  },
  {
    q: "의료비랑 교육비 중복 공제 가능한가요?",
    a: "같은 비용을 의료비와 교육비로 동시에 공제받을 수는 없어요. 치료 목적이면 의료비, 교육 목적이면 교육비로 구분해서 한쪽만 신청하세요.",
  },
  {
    q: "장애인 추가공제(200만원)와 같이 받을 수 있나요?",
    a: "네, 별개 항목이에요. 기본공제 150만원 + 장애인 추가공제 200만원(소득공제)에 더해서 특수교육비 세액공제도 받을 수 있어요. 장애인 의료비 공제(한도 없음)도 가능하고요.",
  },
  {
    q: "무인가 시설에서 치료받으면 어떻게 되나요?",
    a: "무인가 시설 비용은 공제 대상이 아니에요. 사회복지사업법에 따라 인가받은 시설이어야 해요. 치료 전에 해당 기관이 인가 기관인지 확인하세요.",
  },
],

SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-장애인-공제", title: "연말정산 장애인 공제", description: "장애인 추가공제 200만원과 세법상 장애인 범위." },
  { slug: "연말정산-교육비-세액공제", title: "연말정산 교육비 세액공제", description: "교육비 공제 대상과 한도 정리." },
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 장애인 . 특수교육비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 특수교육비, 한도 없이 공제돼요<br />
        대상 비용과 신청 서류 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "장애인 자녀 재활치료비도 연말정산에서 공제받을 수 있나요?"
      </p>
      <p style={body}>
        네, <strong>한도 없이 전액 15% 세액공제</strong>돼요. 일반 교육비는 초중고 300만원, 대학 900만원 한도가 있지만 장애인 특수교육비는 쓴 만큼 전부 공제받을 수 있어요. 재활교육비 1,200만원이면 <strong>180만원 환급</strong>이죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>얼마나 돌려받을 수 있나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라 장애인 특수교육비는 한도 제한이 없어요. 공제율은 15%고요.
      </p>

      <SectionBadge>공제 계산 예시</SectionBadge>
      <GreenBox title="재활교육비 1,200만원 지출 시">
        공제 대상: 1,200만원 (한도 없음) → 세액공제: 1,200만 x 15% = <strong>180만원 환급</strong>. 일반 교육비(300만원 한도)와 합산이 아니라 별도로 적용돼요.
      </GreenBox>

      <Divider />

      <H2>어떤 비용이 공제 대상인가요?</H2>
      <p style={body}>
        재활교육 목적의 비용만 해당돼요. 일반 학원비는 대상이 아니에요.
      </p>

      <SectionBadge>공제 가능 vs 불가</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["재활교육비", "언어치료, 감각통합치료, 인지치료", "O"],
              ["직업훈련비", "장애인 직업재활시설 훈련", "O"],
              ["발달재활 바우처 본인부담금", "바우처 기관 이용 시 본인 부담분", "O"],
              ["특수학교 등록금", "특수학교, 특수학급", "O (300만원 한도 별도)"],
              ["일반 학원비", "태권도, 영어, 미술 학원", "X"],
              ["의료비", "병원 진료비, 수술비", "X (의료비 공제로 별도 신청)"],
              ["보조기기 구입비", "휠체어, 보청기 등", "X (의료비 공제로 신청)"],
            ].map(([cat, detail, eligible], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, background: "#fafafa" }}>{cat}</td>
                <td style={{ padding: "10px 12px" }}>{detail}</td>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: eligible === "X" ? "#dc2626" : "#1D9E75" }}>{eligible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />
      <ArticleAd position="mid" />

      <H2>인가된 시설에서 받아야 공제돼요</H2>
      <p style={body}>
        아무 곳에서나 치료받는다고 공제되는 건 아니에요. 사회복지사업법에 따라 인가받은 시설이어야 해요.
      </p>

      <SectionBadge>공제 가능한 시설</SectionBadge>
      <BorderBox title="인가 시설 목록">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>장애인복지관</li>
          <li>장애인거주시설, 장애인직업재활시설</li>
          <li>장애아전담 어린이집</li>
          <li>특수학교, 특수학급</li>
          <li>발달재활서비스 제공기관 (바우처 기관)</li>
          <li>인가된 언어치료실, 감각통합치료실</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>신청할 때 필요한 서류 체크하세요</H2>
      <p style={body}>
        일부 시설은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화서비스에서 자동 조회돼요. 조회 안 되면 시설에서 직접 납입증명서를 받아야 해요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 개인 상황에 따라 다를 수 있으니 정확한 세무 판단은 국세청(126) 또는 세무사와 상담하세요." />
    </ArticleLayout>
  );
}
