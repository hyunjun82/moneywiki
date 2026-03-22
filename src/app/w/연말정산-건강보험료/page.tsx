"use client";

// Q1. 연말정산 시즌인데 건강보험료가 공제되는지, 따로 해야 하는 게 있는지 궁금한 직장인
// Q2. 건강보험료 공제 구조를 이해하고 자동 반영되니 따로 할 게 없다는 걸 확인한다
// Q3. 공제 대상(본인 부담분 전액), 한도 없음, 장기요양보험료 포함, 자동 반영(간소화서비스), 월급별 공제액, 절세 효과(세율별), 4대보험 합산
// Q4. GreenBox(핵심 결론) + 비교표(월급별 공제액) + BorderBox(4대보험 합산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "건강보험료 + 장기요양보험료 = 본인 부담분 전액 공제",
  "한도 없음, 납부한 금액 그대로 소득공제",
  "간소화서비스에서 자동 반영 — 별도 신청 불필요",
  "회사 부담분은 공제 대상 아님 (이미 회사 비용 처리)",
  "피부양자는 보험료 납부 없으니 공제 금액 없음",
];

const FAQS = [
  { q: "건강보험료 공제 한도가 있나요?", a: "한도 없어요. 본인 부담분 전액이 소득공제돼요. 급여에서 매달 공제된 건강보험료와 장기요양보험료 전부가 대상이에요." },
  { q: "장기요양보험료도 공제되나요?", a: "네, 장기요양보험료도 건강보험료와 함께 본인 부담분 전액이 소득공제돼요. 건강보험 고지서에 같이 표시되는 금액이에요." },
  { q: "따로 서류를 제출해야 하나요?", a: "필요 없어요. 국민건강보험공단이 국세청에 자료를 보내기 때문에 간소화서비스에서 자동 조회돼요. 원천징수영수증에도 자동 반영이에요." },
  { q: "회사 부담분도 공제받을 수 있나요?", a: "아니요. 회사 부담분은 이미 회사 경비로 처리돼요. 내 급여에서 빠진 본인 부담분만 공제 대상이에요." },
  { q: "피부양자로 등록돼 있으면 공제받나요?", a: "피부양자는 보험료를 내지 않으니까 공제받을 금액이 없어요. 직장에서 보험료를 납부하는 가입자만 공제 대상이에요." },
  { q: "중도 입사했으면 공제액이 줄어드나요?", a: "네, 근무 기간에 해당하는 보험료만 공제돼요. 7월에 입사했다면 7~12월 납부분만 반영돼요. 금액이 이상하면 건강보험공단(1577-1000)에서 확인해 보세요." },
];

const SOURCES = [
  { name: "소득세법 제52조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 보험료 공제", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-교복-구입비", title: "연말정산 교복비 공제", description: "중고등학생 교복비 50만원 한도." },
  { slug: "연말정산-국민연금-공제", title: "연말정산 국민연금 공제", description: "국민연금 소득공제 기준." },
  { slug: "연말정산", title: "연말정산 가이드", description: "연말정산 전체 흐름 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 건강보험료 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 건강보험료, 얼마나 공제되나요?<br />
        한도 없이 전액 소득공제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "건강보험료 매달 10만원 넘게 빠지는데 이것도 연말정산 돼요?"
      </p>
      <p style={body}>
        건강보험료와 장기요양보험료는 <strong>본인 부담분 전액이 소득공제</strong>돼요.
        <strong>한도도 없어요.</strong> <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제52조</a>에서 보험료 공제를 보장하고 있고,
        간소화서비스에서 자동 반영되니까 따로 할 일이 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>월급별로 얼마가 공제되나요?</H2>
      <p style={body}>
        건강보험료율 7.09% 중 본인 부담은 3.595%예요. 장기요양보험료는 건강보험료의 13.14%이고 역시 절반만 본인 부담이에요.
      </p>

      <SectionBadge>2025년 귀속 월급별 연간 공제액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월급</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>건강보험</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>장기요양</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>합계</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["300만원", "약 127만원", "약 17만원", "약 144만원"],
              ["400만원", "약 170만원", "약 22만원", "약 192만원"],
              ["500만원", "약 212만원", "약 28만원", "약 240만원"],
            ].map(([월급, 건강, 장기, 합계], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{월급}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{건강}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{장기}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{합계}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        월급 300만원 직장인 절세 효과{"\n"}
        · 세율 6% 구간: 144만원 x 6% = 약 9만원 절세{"\n"}
        · 세율 15% 구간: 144만원 x 15% = 약 22만원 절세{"\n"}
        · 세율 24% 구간: 144만원 x 24% = 약 35만원 절세
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>4대보험 전체를 합치면 얼마 공제되나요?</H2>
      <p style={body}>
        건강보험료뿐 아니라 <a href="/w/연말정산-국민연금-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금</a>, 고용보험도 소득공제돼요. 전부 합치면 월급의 약 9.4%예요.
      </p>

      <BorderBox>
        <strong>월급 300만원 기준 4대보험 연간 공제액</strong>{"\n"}
        · 국민연금: 약 162만원{"\n"}
        · 건강보험: 약 127만원{"\n"}
        · 장기요양보험: 약 17만원{"\n"}
        · 고용보험: 약 32만원{"\n"}
        · 합계: 약 338만원{"\n"}
        세율 15% 구간이면 약 50만원 절세
      </BorderBox>

      <Divider />

      <H2>따로 신청해야 할 게 있나요?</H2>
      <p style={body}>
        아무것도 안 해도 돼요. 건강보험공단이 국세청에 자료를 보내기 때문에
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서 자동으로 조회돼요.
        원천징수영수증에도 자동 반영이에요. 아래 체크리스트만 확인하세요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 보험료율은 매년 변경될 수 있으니 국민건강보험공단에서 확인하세요." />
    </ArticleLayout>
  );
}
