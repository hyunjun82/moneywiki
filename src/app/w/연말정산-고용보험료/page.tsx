"use client";

// Q1. 고용보험료도 연말정산에서 공제되는지 궁금한 직장인
// Q2. 고용보험료가 자동으로 소득공제된다는 걸 확인하고, 4대보험 전체 절세 효과를 파악한다
// Q3. 고용보험료 요율 0.9%, 한도 없이 전액 소득공제, 간소화서비스 자동 반영, 4대보험 합산 효과
// Q4. GreenBox 핵심 요약 + BorderBox 4대보험 비교표 + Checklist 확인사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "간소화서비스에서 고용보험료 자동 반영 확인",
  "중도 입사·퇴사 시 해당 기간만 공제 (월할 계산)",
  "프리랜서·자영업자는 자발적 가입분만 공제 대상",
  "금액 이상하면 근로복지공단(1588-0075)에 문의",
  "4대보험 전체 합산 소득공제 효과 연말정산 미리보기로 확인",
];

const FAQS = [
  { q: "고용보험료 공제에 한도가 있나요?", a: "아니요. 한도 없이 본인 부담분 전액이 소득공제돼요. 보장성보험료(한도 100만원)와 다른 점이에요." },
  { q: "2026년 고용보험 요율이 바뀌었나요?", a: "본인 부담분 0.9%는 2025년과 동일해요. 회사 부담분(1.15~1.75%)만 사업 규모에 따라 다르고, 근로자한테는 영향 없어요." },
  { q: "따로 서류를 내야 하나요?", a: "아니요. 고용노동부와 국세청이 연계돼 있어서 간소화서비스에서 자동으로 조회돼요. 영수증 챙길 필요 없어요." },
  { q: "고용보험 안 내면 실업급여 못 받나요?", a: "네. 고용보험료를 내야 퇴사 후 실업급여 자격이 생겨요. 소득공제도 받고 실업급여 자격도 확보하는 거라 일석이조예요." },
  { q: "프리랜서도 고용보험 공제받을 수 있나요?", a: "자발적으로 고용보험에 가입한 경우에만 납부한 보험료가 소득공제 대상이에요. 종합소득세 신고 때 공제받으면 돼요." },
  { q: "고용보험료만 따로 떼어서 볼 수 있나요?", a: "급여명세서에서 항목별로 구분돼 있어요. 간소화서비스에서도 보험 종류별로 조회할 수 있고요." },
];

const SOURCES = [
  { name: "소득세법 제52조 (특별소득공제)", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 보험료 소득공제", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7869" },
  { name: "고용보험 제도 안내", href: "https://www.ei.go.kr" },
];

const RELATED = [
  { slug: "연말정산-보장성보험료-세액공제", title: "보장성보험료 세액공제", description: "실손·암보험 등 보장성보험 12% 공제." },
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "내 환급액을 바로 계산해보세요." },
  { slug: "월급별-세금-계산", title: "월급별 세금 계산", description: "4대보험과 소득세 공제 후 실수령액." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 고용보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고용보험료도 연말정산에서 공제될까?<br />
        요율 0.9%와 절세 효과
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        4대보험 중 고용보험료도 연말정산에서 공제되는지 궁금하시죠?
      </p>
      <p style={body}>
        네, 본인 부담분 전액이 소득공제돼요. 한도도 없어요. 월급의 0.9%라서 금액은 크지 않지만, <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>간소화서비스</a>에서 자동 반영되니까 따로 할 일은 없어요. 4대보험 전체를 합치면 절세 효과가 꽤 커요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>고용보험료 소득공제, 핵심만 볼게요</H2>
      <p style={body}>
        복잡하게 생각할 것 없어요. 본인 부담분 전액 공제, 한도 없음, 자동 처리.
      </p>

      <GreenBox>
        요율: 본인 부담 0.9% (2026년 동일){"\n"}
        공제 방식: 소득공제 (세액공제 아님){"\n"}
        한도: 없음 — 본인 부담분 전액 공제{"\n"}
        신청: 간소화서비스 자동 반영, 별도 서류 불필요
      </GreenBox>

      <p style={body}>
        월급 300만원이면 월 2.7만원, 연간 약 32만원이 소득공제돼요. 세율 15% 구간이라면 약 4.8만원 절세 효과가 있어요.
      </p>

      <CategoryButton label="연말정산" count={18} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>4대보험 합치면 절세 효과가 커져요</H2>
      <p style={body}>
        고용보험만 보면 작아 보이지만, 4대보험 전체로 보면 상당해요.
      </p>

      <SectionBadge>4대보험 소득공제 비교 (월급 300만원 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 18 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>보험 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>요율</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>월 공제</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>연간 소득공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["국민연금", "4.75%", "142,500원", "약 171만원"],
              ["건강보험", "3.595%", "107,850원", "약 129만원"],
              ["장기요양", "~0.46%", "13,800원", "약 17만원"],
              ["고용보험", "0.9%", "27,000원", "약 32만원"],
              ["합계", "~9.7%", "291,150원", "약 349만원"],
            ].map(([label, rate, monthly, annual], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", fontWeight: i === 4 ? 600 : 400, backgroundColor: i === 4 ? "#f9fafb" : "white" }}>
                <td style={{ padding: "9px 12px", color: "#374151" }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{monthly}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{annual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        세율 15% 구간이면 약 52만원, 24% 구간이면 약 84만원 세금이 줄어요. <a href="/w/연말정산-보장성보험료-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>보장성보험료 세액공제</a>와 별개니까 둘 다 챙기면 절세 효과가 더 커져요.
      </p>

      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>
        자동이라고 안심하지 말고, 금액이 맞는지 한 번은 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>고용보험 공제, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        간단한 것부터 헷갈리는 것까지 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 요율과 공제 기준은 매년 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
