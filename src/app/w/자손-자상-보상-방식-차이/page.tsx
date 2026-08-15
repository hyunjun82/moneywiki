"use client";
// Q1. 자동차보험 갱신하면서 자손과 자상 중 뭘 골라야 하는지, 보상 방식이 정확히 어떻게 다른지 비교하려는 상황
// Q2. 자손과 자상의 보상 항목·금액·방식 차이를 이해하고 갱신 때 합리적으로 선택한다
// Q3. 보상 항목(치료비/위자료/휴업손해), 과실 적용 여부, 보상 한도 구조, 보험료 차이
// Q4. 비교표 + GreenBox(보상 금액 예시) + BorderBox(선택 기준 정리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "단독사고(가드레일, 전봇대 등)가 걱정된다 → 자상 추천",
  "안전운전에 자신 있고 사고 위험이 낮다 → 자손으로 보험료 절약",
  "과실 50% 이상 사고가 걱정된다 → 자상이 훨씬 유리",
  "보험료 연 3~5만원 차이가 부담이다 → 자손 유지 후 사고 시 전환 검토",
  "출퇴근 운전 거리가 길다 → 사고 확률 높으니 자상 권장",
];

const FAQS = [
  {
    q: "자손에서 자상으로 바꾸면 보험료가 얼마나 올라가나요?",
    a: "차종과 나이에 따라 다르지만 연간 3만~5만원 정도 더 내요. 자동차보험 갱신 시점에 변경하면 되고, 보험사 앱에서 간편하게 바꿀 수 있어요.",
  },
  {
    q: "자상은 어떤 방식으로 보상 금액을 산정하나요?",
    a: "대인배상과 같은 방식이에요. 실제 치료비 + 위자료(상해 등급별 정액) + 휴업손해(실소득의 85%)를 합산해요. 변호사 합의금 산정 방식과 비슷하죠.",
  },
  {
    q: "자상도 보상 한도가 있나요?",
    a: "가입 금액이 한도예요. 1,000만원, 3,000만원, 5,000만원, 1억원 등으로 가입할 수 있고, 가입 금액 내에서 전액 보상돼요. 보통 3,000만원이나 5,000만원을 많이 선택해요.",
  },
  {
    q: "사고가 나면 자손에서 자상으로 소급 변경할 수 있나요?",
    a: "안 돼요. 사고 발생 시점의 가입 특약으로만 보상받을 수 있어요. 그래서 갱신 때 미리 결정하는 게 중요해요.",
  },
  {
    q: "자상 가입하면 자손은 따로 안 들어도 되나요?",
    a: "맞아요. 자상이 자손의 보장 범위를 전부 포함하고, 위자료와 휴업손해까지 추가로 보장해요. 자상 가입자는 자손을 따로 들 필요가 없어요.",
  },
];

const SOURCES = [
  { name: "자동차손해배상보장법", href: "https://law.go.kr/법령/자동차손해배상보장법" },
  { name: "손해보험협회", href: "https://www.knia.or.kr" },
];

const RELATED = [
  { slug: "자손-자상-과실-상계", title: "자손 자상 과실 상계", description: "과실 비율에 따른 보험금 차이 비교." },
  { slug: "자손-자상-선택-기준", title: "자손 자상 선택 기준", description: "운전 패턴별 유리한 특약 선택 가이드." },
  { slug: "자손-자상-보험료-차이", title: "자손 자상 보험료 차이", description: "보험료 대비 보장 효율 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 자동차보험 · 보상 비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자손 자상 보상 방식, 뭐가 다를까?<br />
        보장 항목과 금액 차이 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차보험 갱신할 때마다 자손이랑 자상 중에 고민되죠?
      </p>
      <p style={body}>
        이름은 비슷한데 보상 방식이 완전히 달라요.
        <strong>자손은 치료비만</strong> 보상하고, <strong>자상은 치료비에 위자료와 휴업손해</strong>까지 줘요.
        <a href="/w/자동차보험-자손-자상-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본 차이</a>를 먼저 보고 오면 이해가 쉬워요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보상 항목부터 비교해 볼게요</H2>
      <p style={body}>
        자손과 자상의 가장 큰 차이는 <strong>보상 항목의 범위</strong>예요.
        <a href="https://law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상보장법</a> 기준으로 정리하면 이렇게 돼요.
      </p>

      <SectionBadge>보상 항목 비교표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보상 항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>자손</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>자상</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["치료비", "급수 한도 내", "가입 한도 내 전액"],
              ["위자료", "보상 안 됨", "등급별 15~200만원"],
              ["휴업손해", "보상 안 됨", "실소득의 85%"],
              ["향후 치료비", "보상 안 됨", "보상 가능"],
              ["과실 적용", "내 과실만큼 차감", "과실 무관 전액"],
              ["장해 보상", "해당 없음", "장해지급률표 적용"],
            ].map(([item, jason, jasang], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{jason}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{jasang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="보험 정보" count={8} href="/category/보험" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>실제 사고에서 보상 금액이 얼마나 차이 나나요?</H2>
      <p style={body}>
        목디스크로 6개월 치료한 경우를 예시로 볼게요. 내 과실 50%, 치료비 300만원, 위자료 150만원, 휴업손해 200만원이 발생했어요.
      </p>

      <GreenBox>
        자손 (9급 상해 기준){"\n"}
        치료비 300만원 x 50% = 150만원 → 9급 한도 240만원 이내 → 150만원 수령{"\n"}
        위자료·휴업손해: 0원{"\n"}
        합계: 150만원{"\n\n"}

        자상 (3,000만원 가입){"\n"}
        치료비 300만 + 위자료 150만 + 휴업손해 200만 = 650만원{"\n"}
        과실 무관 전액 수령{"\n"}
        합계: 650만원
      </GreenBox>

      <p style={body}>
        같은 사고에서 <strong>500만원 차이</strong>가 나요.
        연간 보험료 차이 3~5만원으로 이 정도 보장을 받을 수 있으니,
        <a href="/w/자손-자상-과실-상계" style={{ color: "#1D9E75", textDecoration: "underline" }}>과실 상계</a> 구조를 이해하면 선택이 쉬워져요.
      </p>

      <Divider />

      <H2>내 상황에 맞는 건 자손일까, 자상일까?</H2>
      <p style={body}>
        무조건 자상이 좋은 건 아니에요. 운전 패턴과 사고 위험에 따라 달라요.
        아래 체크리스트로 판단해 보세요.
      </p>

      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>선택 기준 요약</strong>{"\n"}
        · 사고 위험이 낮고 보험료를 아끼고 싶다 → 자손{"\n"}
        · 단독사고나 과실 큰 사고가 걱정된다 → 자상{"\n"}
        · 출퇴근 장거리 운전을 한다 → 자상 권장{"\n"}
        · 자상 보험료 부담이 크다면 → 자손 유지 후 갱신 때 재검토
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 자동차보험 정보를 제공해요. 보험 상품별 세부 약관이 다를 수 있으니, 가입 전 본인 보험사에서 약관을 꼭 확인하세요." />
    </ArticleLayout>
  );
}
