"use client";
// Q1. 월급에서 빠져나가는 건강보험료가 올랐는데 왜 올랐는지, 얼마나 더 내는지 궁금한 직장인
// Q2. 인상 이유와 본인 부담 변화를 이해하고, 급여외소득 추가 부과 해당 여부를 확인한다
// Q3. 보험료율 7.19%, 인상률 1.48%, 재정 적자 전망, 직장·지역 가입자 부담 변화, 급여외소득 2천만원 기준
// Q4. GreenBox(핵심 숫자) + BorderBox(직장/지역 비교) + EligibilityChecker(추가부과 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "extra", label: "급여 외 소득(이자, 배당, 임대 등)이 연 2,000만원을 넘는다" },
  { id: "dual", label: "직장 다니면서 부업이나 임대 수입이 따로 있다" },
  { id: "invest", label: "금융소득(이자+배당)이 연 2,000만원을 초과한다" },
];

const FAQS = [
  {
    q: "건강보험료가 왜 3년 만에 올랐나요?",
    a: "2024~2025년 2년 연속 동결했지만 건강보험 재정이 적자로 전환될 것으로 예측됐어요. 의료비가 연평균 8.1%씩 늘어나는데 보험료 수입은 정체됐으니까 최소한의 인상이 불가피했던 거예요.",
  },
  {
    q: "월급에서 얼마나 더 빠지나요?",
    a: "직장가입자 기준 월평균 본인부담이 2,235원 올랐어요. 월급 300만원이면 약 1,500원 정도 더 내는 수준이에요. 직장가입자는 회사와 반반 부담이라 실제 체감은 크지 않아요.",
  },
  {
    q: "지역가입자는 얼마나 더 내나요?",
    a: "지역가입자 월평균 보험료가 1,280원 올랐어요. 지역가입자는 소득·재산·자동차를 기준으로 보험료가 매겨지는데, 인상률은 직장가입자와 동일한 1.48%예요.",
  },
  {
    q: "급여외소득 추가 보험료란 뭔가요?",
    a: "직장가입자인데 급여 외에 이자, 배당, 임대 수입 등이 연 2,000만원을 넘으면 초과분에 보험료가 추가로 부과돼요. 2,000만원을 공제하고 남은 금액을 12로 나눠서 매달 추가로 내는 구조예요.",
  },
  {
    q: "앞으로 건강보험료가 더 오를까요?",
    a: "장기재정전망에 따르면 2033년에 준비금이 소진될 것으로 예상돼요. 의료비 지출이 계속 늘어나는 구조라 매년 소폭 인상이 이어질 가능성이 높아요. 정부가 지출 효율화를 병행하겠다고 했지만 인상 압력은 계속될 거예요.",
  },
  {
    q: "건강보험료를 줄일 방법이 있나요?",
    a: "직장가입자는 월급 기준이라 줄이기 어렵지만, 지역가입자는 재산(자동차 등)을 정리하면 보험료가 줄 수 있어요. 피부양자 등록 요건을 확인해서 가족이 함께 혜택을 받는 것도 방법이에요.",
  },
];

const RELATED = [
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "월급에서 빠지는 4대보험 금액 확인." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령", description: "조기수령 감액률과 손익분기점." },
  { slug: "연봉-실수령액-계산기", title: "연봉 실수령액 계산기", description: "세전 연봉에서 실수령액 확인." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지/연금 · 건강보험 · 보험료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건강보험료가 또 올랐는데, 왜?<br />
        2026년 보험료율 7.19% 인상 배경
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "매달 빠져나가는 건강보험료가 또 올랐다는데, 도대체 왜 올린 거예요?"
      </p>
      <p style={body}>
        2026년 건강보험료율이 <strong>7.19%</strong>로 확정됐어요. 2년 연속 동결 이후 3년 만에 인상된 건데, 인상률은 <strong>1.48%</strong>예요.
        <a href="https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1487279&mid=a10503000000" style={{ color: "#1D9E75", textDecoration: "underline" }}>보건복지부 보도자료</a>에 따르면 건강보험 재정 적자 전환이 예상되면서 최소한의 인상을 결정했다고 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보험료가 얼마나 올랐나요?</H2>
      <p style={body}>
        직장가입자와 지역가입자 모두 보험료가 올랐어요. 직장가입자는 회사와 반반 부담이라 실제 체감 인상액은 절반이에요.
      </p>

      <SectionBadge>2026년 보험료 변화</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2025년</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2026년</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>변동</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보험료율", "7.09%", "7.19%", "+0.10%p"],
              ["직장가입자 월평균 (본인)", "158,464원", "160,699원", "+2,235원"],
              ["지역가입자 월평균", "88,962원", "90,242원", "+1,280원"],
            ].map(([item, y2025, y2026, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{y2025}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{y2026}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        월급별 인상 체감액 (직장가입자 본인부담){"\n"}
        월급 250만원 → 약 +900원{"\n"}
        월급 350만원 → 약 +1,200원{"\n"}
        월급 500만원 → 약 +1,800원
      </GreenBox>

      <CategoryButton label="복지/연금 정보" count={7} href="/category/복지-연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>인상된 진짜 이유가 뭔가요?</H2>
      <p style={body}>
        보건복지부가 밝힌 공식 이유는 세 가지예요. 2년 동결로 수입 기반이 약해진 것, 의료비 지출이 연평균 8.1%씩 늘어나는 것, 그리고 지역·필수의료 강화를 위한 재정 확보가 필요하다는 거예요.
      </p>

      <SectionBadge>인상 배경 요약</SectionBadge>
      <BorderBox>
        <strong>재정 적자 전환 예상</strong>{"\n"}
        기획재정부 전망에 따르면 2026년부터 건강보험 재정이 적자로 전환되고, 2033년에는 준비금이 소진될 것으로 예측돼요.{"\n\n"}
        <strong>의료비 급증</strong>{"\n"}
        2013~2023년 건강보험 총 진료비가 연평균 8.1%씩 증가했어요. 고령화와 의료 이용량 증가가 주 원인이에요.{"\n\n"}
        <strong>최소한의 인상</strong>{"\n"}
        고물가 속 국민 부담을 고려해서 1.48%만 올리기로 했어요. 동시에 불필요한 의료비 지출을 줄이는 지출 효율화를 병행하겠다고 밝혔어요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>급여외소득 추가 보험료, 나도 해당될까?</H2>
      <p style={body}>
        직장 다니면서 이자, 배당, 임대 수입 등 급여 외 소득이 연 2,000만원을 넘으면 추가 보험료가 부과돼요. 아래 항목에 해당하면 추가 부과 대상이에요.
      </p>

      <SectionBadge>추가 부과 대상 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="급여외소득 추가 보험료 부과 대상이에요. 2,000만원 초과분에 보험료율이 적용돼요."
        partialMatchText="해당 항목이 있다면 연간 소득 합산을 확인해보세요."
      />

      <p style={body}>
        추가 보험료 계산은 (급여외소득 - 2,000만원) / 12 x 보험료율이에요. 예를 들어 급여외소득이 3,000만원이면 (3,000만 - 2,000만) / 12 x 7.19% = 월 약 6만원 추가 부과돼요.
        <a href="/w/4대보험료-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대보험료 계산기</a>에서 본인 부담액을 미리 계산해볼 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 보건복지부 보도자료를 바탕으로 작성했어요. 개인별 보험료는 국민건강보험공단(nhis.or.kr)에서 조회할 수 있어요." />
    </ArticleLayout>
  );
}
