"use client";

// Q1. 전세 계약을 앞두고 보증금이 부족해서 전세자금대출을 받을 수 있는지, 어떤 상품이 유리한지 비교하려는 상황
// Q2. 기금 전세대출 종류별 조건을 비교하고, 내 상황에 맞는 상품을 선택해서 신청한다
// Q3. 버팀목·청년·신혼부부·중소기업 청년 각 조건(소득·자산·나이), 금리, 한도, 신청 절차
// Q4. 비교표 + Steps(신청 절차) + GreenBox(상품별 핵심 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "전세계약을 먼저 체결하세요",
    desc: "계약서에 확정일자까지 받아두면 좋아요. 대출 신청은 계약 후에 하는 거예요. 계약 전에 대출 가능 여부를 먼저 확인하고 싶으면 주택도시기금 홈페이지에서 자격을 조회해 보세요.",
    link: { label: "주택도시기금", href: "https://nhuf.molit.go.kr" },
  },
  {
    title: "자격 조건을 확인하세요",
    desc: "무주택 세대주인지, 소득과 자산 요건에 맞는지 확인해요. 기금e든든 앱에서 간편하게 조회할 수 있어요. 조건이 안 맞으면 시중은행 전세대출을 알아보세요.",
  },
  {
    title: "은행에 대출을 신청하세요",
    desc: "기금e든든 앱이나 취급 은행 창구에서 신청해요. 전세계약서, 주민등록등본, 소득증빙(원천징수영수증), 재직증명서 등이 필요해요.",
  },
  {
    title: "심사 후 대출금이 임대인 계좌로 입금돼요",
    desc: "소득, 자산, 주택 요건을 심사하고, 승인되면 대출금이 임대인 계좌로 직접 입금돼요. 전세보증보험 가입도 이 과정에서 함께 처리돼요.",
    tip: "전세보증보험 가입이 필수. HUG 또는 SGI에서 가입",
  },
];

const FAQS = [
  {
    q: "무주택자만 전세대출 받을 수 있나요?",
    a: "기금 전세대출(버팀목, 청년전세 등)은 무주택자만 가능해요. 시중은행 전세대출은 1주택자도 가능한 상품이 있어요.",
  },
  {
    q: "전세대출 받으면 중도상환수수료가 있나요?",
    a: "3년 이내 상환하면 1~1.5% 정도 수수료가 붙어요. 3년 이후에는 수수료가 없어요. 상품마다 다르니 가입 시 확인하세요.",
  },
  {
    q: "전세대출 연장은 어떻게 하나요?",
    a: "자격 요건을 유지하면 연장 가능해요. 중간에 주택을 취득하면 상환해야 해요. 연장 신청은 만기 1~2개월 전에 하는 게 좋아요.",
  },
  {
    q: "전세보증보험 가입이 왜 필수인가요?",
    a: "전세대출 시 보증기관(HUG, SGI)의 보증이 있어야 은행이 대출을 실행해요. 보증료는 대출금액의 0.1~0.2% 수준이에요.",
  },
  {
    q: "소득이 높으면 기금 대출 못 받나요?",
    a: "버팀목은 부부합산 5,000만원 이하, 신혼부부는 7,500만원 이하가 기준이에요. 소득이 넘으면 시중은행 전세대출(연 3~5%)을 알아보세요.",
  },
  {
    q: "기금 전세대출과 시중은행 대출 중 뭐가 유리한가요?",
    a: "소득·자산 요건에 맞으면 기금 대출이 금리가 훨씬 낮아서 유리해요. 요건이 안 맞거나 한도가 부족하면 시중은행 대출을 보충으로 알아보세요.",
  },
];

const SOURCES = [
  { name: "주택도시기금", href: "https://nhuf.molit.go.kr" },
  { name: "한국주택금융공사", href: "https://www.hf.go.kr" },
];

const RELATED = [
  { slug: "전세보증보험", title: "전세보증보험", description: "보증금 보호를 위한 보험 가입 조건." },
  { slug: "전세보증금-반환-절차", title: "전세보증금 반환 절차", description: "보증금 안 줄 때 단계별 대응 방법." },
  { slug: "전월세-전환율", title: "전월세 전환율", description: "전세와 월세 전환 시 적정 금액 계산." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세자금대출, 나도 받을 수 있을까?<br />
        2026년 조건·금리·한도 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약했는데 보증금이 부족해요. 전세자금대출 조건이 어떻게 되는지 궁금하죠?
      </p>
      <p style={body}>
        전세자금대출은 크게 <strong>기금 전세대출</strong>과 <strong>시중은행 전세대출</strong>로 나뉘어요.
        기금 전세대출은 <a href="https://nhuf.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택도시기금</a>에서 운영하고, 금리가 연 1.2~3.5%로 저렴한 대신 조건이 까다로워요.
        시중은행은 금리가 연 3~5%로 높지만 조건이 완화돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기금 전세대출 4가지, 조건이 어떻게 다를까?</H2>
      <p style={body}>
        2026년 기준 기금 전세대출 상품을 비교해 볼게요.
        내 나이, 소득, 결혼 여부에 따라 유리한 상품이 달라요.
      </p>

      <SectionBadge>2026년 기금 전세대출 비교 (주택도시기금 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상품</th>
              <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득 기준</th>
              <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>금리(연)</th>
              <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["버팀목", "무주택 세대주", "5,000만원 이하", "2.0~3.1%", "최대 1.2억(수도권)"],
              ["청년전용", "만 19~34세", "5,000만원 이하", "1.8~2.1%", "최대 2억"],
              ["신혼부부", "혼인 7년 이내", "7,500만원 이하", "1.5~2.1%", "최대 2.5억"],
              ["중기청년", "중소기업 재직", "3,500만원 이하", "1.2%", "최대 1억"],
            ].map(([product, target, income, rate, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{product}</td>
                <td style={{ padding: "8px 10px", textAlign: "center" }}>{target}</td>
                <td style={{ padding: "8px 10px", textAlign: "center" }}>{income}</td>
                <td style={{ padding: "8px 10px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{rate}</td>
                <td style={{ padding: "8px 10px", textAlign: "center" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        공통 조건은 <strong>무주택 세대주, 순자산 3.45억원 이하, 전용면적 85㎡ 이하</strong>예요.
        전세보증금의 80% 이내에서 대출이 실행돼요.
      </p>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 상황에 맞는 상품은 어떤 건가요?</H2>
      <p style={body}>
        나이, 직장, 결혼 여부에 따라 가장 유리한 상품이 달라요.
      </p>

      <GreenBox>
        상황별 추천 상품{"\n"}
        · 만 34세 이하 직장인 → 청년전용 (금리 1.8~2.1%){"\n"}
        · 중소기업 재직 만 34세 이하 → 중기청년 (금리 1.2%, 최저){"\n"}
        · 결혼 7년 이내 → 신혼부부 (한도 2.5억, 최고){"\n"}
        · 위 조건에 안 맞는 무주택 세대주 → 버팀목{"\n"}
        · 소득 기준 초과 또는 1주택자 → 시중은행 전세대출
      </GreenBox>

      <Divider />

      <H2>전세자금대출 신청 절차예요</H2>
      <p style={body}>
        전세계약을 먼저 하고, 그다음 대출을 신청하는 순서예요.
        계약 전에 자격 여부를 조회해 볼 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>신청 전 알아두세요</strong>{"\n"}
        · 전세보증보험 가입 필수 (보증료: 대출금의 0.1~0.2%){"\n"}
        · 3년 이내 중도상환 시 수수료 1~1.5% 발생{"\n"}
        · 대출 기간 중 주택 취득 시 상환 의무{"\n"}
        · 자격 유지 시 연장 가능 (보통 2년 단위)
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보예요. 금리와 한도는 정책 변동에 따라 달라질 수 있으니, 주택도시기금 홈페이지에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
