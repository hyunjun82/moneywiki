"use client";

// Q1. 월급에서 세금이 얼마나 빠지는지 궁금한 직장인 (300만원~700만원 구간)
// Q2. 내 월급의 실수령액을 직접 계산하고, 4대보험 공제 내역을 이해한다
// Q3. 2026년 4대보험 요율(국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%), 간이세액표 기준, 부양가족 영향
// Q4. GreenBox 요율 요약 + BorderBox 월급별 비교 + Steps 계산 순서

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CALC_STEPS = [
  {
    title: "4대보험료를 먼저 계산해요",
    desc: "월급에 각 요율을 곱하면 돼요. 국민연금 4.75%, 건강보험 3.595%(장기요양 포함 약 4.05%), 고용보험 0.9%예요. 세 가지 합치면 약 9.7%가 빠져요.",
    tip: "2026년 국민연금은 9.5%(회사 4.75% + 본인 4.75%)",
  },
  {
    title: "간이세액표에서 소득세를 찾아요",
    desc: "국세청 간이세액표에 월급과 부양가족 수를 넣으면 소득세가 나와요. 부양가족이 많을수록 소득세가 줄어들어요.",
    tip: "홈택스 → 세금모의계산 → 근로소득 간이세액표",
    link: { label: "간이세액표 조회", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" },
  },
  {
    title: "지방소득세는 소득세의 10%예요",
    desc: "소득세가 10만원이면 지방소득세는 1만원이에요. 별도로 계산할 필요 없이 소득세에 10%만 곱하면 돼요.",
  },
  {
    title: "월급에서 전부 빼면 실수령액이에요",
    desc: "월급 - (4대보험 + 소득세 + 지방소득세) = 실수령액. 비과세 수당(식대 20만원 등)이 있으면 그 금액은 공제 전에 빼고 계산해요.",
    tip: "식대 비과세 한도: 월 20만원",
  },
];

const FAQS = [
  { q: "2026년 4대보험 요율이 올랐다는데 얼마나 오른 거예요?", a: "국민연금이 4.5%에서 4.75%로 0.25%p 올랐어요. 건강보험도 3.545%에서 3.595%로 인상됐어요. 고용보험 0.9%는 그대로예요. 월급 300만원 기준 약 9,400원 추가 공제돼요." },
  { q: "부양가족이 많으면 세금이 얼마나 줄어드나요?", a: "월급 500만원 기준, 부양가족 1명이면 소득세 약 17만원, 3명이면 약 9만원이에요. 부양가족 인정 조건은 연소득 100만원 이하, 만 20세 이하 자녀 또는 만 60세 이상 부모님이에요." },
  { q: "비과세 식대가 있으면 실수령액이 올라가나요?", a: "네. 식대 월 20만원까지 비과세라서 4대보험과 소득세 계산에서 빠져요. 월급 300만원 중 식대 20만원이면 280만원 기준으로 보험료와 세금을 매겨요." },
  { q: "국민연금 상한선이 뭔가요?", a: "2026년 기준 보수월액 상한은 617만원이에요. 월급이 이보다 많아도 617만원까지만 국민연금을 매겨요. 초과분은 공제 안 해요." },
  { q: "연봉으로 계산하면 어떻게 되나요?", a: "연봉을 12로 나눠서 월급을 구한 뒤 위 계산을 하면 돼요. 연봉 실수령액 계산기를 이용하면 더 편해요." },
];

const SOURCES = [
  { name: "국세청 근로소득 간이세액표", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" },
  { name: "4대사회보험 정보연계센터", href: "https://www.4insure.or.kr" },
  { name: "홈택스 간이세액표 조회", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "근로소득세-계산기", title: "근로소득세 계산기", description: "월급 넣으면 소득세가 바로 나와요." },
  { slug: "연봉-실수령액-계산기", title: "연봉 실수령액 계산기", description: "연봉별 실수령액을 한눈에." },
  { slug: "연말정산-고용보험료", title: "연말정산 고용보험료 공제", description: "고용보험료도 소득공제 대상이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 4대보험 · 실수령액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월급에서 세금 얼마나 떼나?<br />
        2026년 4대보험 요율과 실수령액 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월급날 통장에 찍히는 금액이 생각보다 적어서 당황하셨죠?
      </p>
      <p style={body}>
        2026년 기준 4대보험 본인 부담분은 월급의 약 9.7%예요. 여기에 소득세와 지방소득세까지 더하면 월급 300만원은 약 265만원, 500만원은 약 430만원, 700만원은 약 600만원 정도 손에 쥐게 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 4대보험 요율, 이렇게 바뀌었어요</H2>
      <p style={body}>
        올해부터 국민연금과 건강보험이 인상됐어요.
      </p>

      <GreenBox>
        국민연금: 4.75% (2025년 4.5%에서 인상, 매년 0.5%p씩 2033년까지){"\n"}
        건강보험: 3.595% (장기요양보험 별도 약 0.46%){"\n"}
        고용보험: 0.9% (변동 없음){"\n"}
        합계: 약 9.7% (본인 부담분)
      </GreenBox>

      <p style={body}>
        국민연금은 2026년부터 매년 0.5%p씩 올라서 2033년에 6.5%(총 13%)가 될 예정이에요. 올해는 첫해라서 0.25%p만 올라간 거예요.
      </p>

      <CategoryButton label="세금" count={20} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>월급 300만원 vs 500만원 vs 700만원 비교</H2>
      <p style={body}>
        월급 구간별로 공제 금액이 어떻게 다른지 비교해볼게요. 부양가족 1명 기준이에요.
      </p>

      <SectionBadge>월급별 공제 비교 (부양가족 1명 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 18 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>300만원</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>500만원</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>700만원</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["국민연금", "142,500", "237,500", "293,075"],
              ["건강보험", "107,850", "179,750", "251,650"],
              ["장기요양", "13,800", "23,000", "32,200"],
              ["고용보험", "27,000", "45,000", "63,000"],
              ["소득세(약)", "40,000", "170,000", "310,000"],
              ["지방소득세(약)", "4,000", "17,000", "31,000"],
              ["공제 합계(약)", "335,150", "672,250", "980,925"],
              ["실수령액(약)", "2,664,850", "4,327,750", "6,019,075"],
            ].map(([label, a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: i >= 6 ? "#f9fafb" : "white", fontWeight: i >= 6 ? 600 : 400 }}>
                <td style={{ padding: "9px 12px", color: "#374151" }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#374151" }}>{a}원</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#374151" }}>{b}원</td>
                <td style={{ padding: "9px 12px", textAlign: "right", color: "#374151" }}>{c}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        소득세는 <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 간이세액표</a> 기준 근사치예요. 부양가족 수에 따라 크게 달라지니까 정확한 금액은 계산기를 이용하세요.
      </p>

      <Divider />

      <H2>실수령액 계산, 이 순서대로 해요</H2>
      <p style={body}>
        내 월급의 실수령액을 직접 계산하고 싶다면 아래 순서를 따라해보세요.
      </p>

      <Steps steps={CALC_STEPS} />

      <Divider />

      <H2>월급 세금, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        올해 바뀐 부분 위주로 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 4대보험 요율과 국세청 간이세액표를 바탕으로 작성했어요. 소득세는 부양가족 수에 따라 달라지니 정확한 금액은 홈택스 간이세액표에서 확인하세요." />
    </ArticleLayout>
  );
}
