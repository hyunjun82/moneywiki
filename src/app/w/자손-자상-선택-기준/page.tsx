"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 자동차보험 갱신할 때 자손·자상 중 뭘 선택해야 할지 모르는 상황
// Q2. 보장 범위 비교 → 내 직업·운전 빈도 고려 → 자상 선택 또는 자손 유지 결정
// Q3. 자상=치료비+위자료+휴업손해+과실상계없음/자손=등급별한도+치료비만+과실상계/보험료차이 연2~4만원
// Q4. GreenBox(보장항목 비교표) + BorderBox(가입금액 선택) + GreenBox(상황별 추천) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "프리랜서·자영업자라면 자상은 필수에 가까워요",
  "자상은 과실 비율과 관계없이 가입금액 한도 내에서 보상돼요",
  "보험료 차이는 연 2~4만원 수준이에요",
  "사망·후유장애와 부상 가입금액을 별도로 선택해요",
  "갱신 때 자손에서 자상으로 변경하면 당장 적용돼요",
];

const FAQS = [
  {
    q: "자손 자상 중 어떤 걸 선택해야 하나요?",
    a: "보장 범위가 넓은 자상을 권장해요. 치료비 외에 위자료와 휴업손해까지 보장받을 수 있고, 과실상계도 없어서 실제 사고 시 받는 보험금이 훨씬 많아요.",
  },
  {
    q: "자손에서 자상으로 바꾸면 얼마나 비싸지나요?",
    a: "연간 2~4만원 정도 보험료가 더 나와요. 하지만 실제 사고 시 받는 보험금 차이를 생각하면 충분히 가성비가 있어요.",
  },
  {
    q: "전봇대 단독 충돌 같은 내 과실 사고에서도 보장되나요?",
    a: "자상은 과실 비율과 관계없이 보장돼요. 자손은 내 과실만 있으면 과실상계로 보상이 안 될 수 있어요. 단독 사고가 걱정된다면 자상을 선택하는 게 맞아요.",
  },
  {
    q: "자상 가입금액은 얼마로 해야 하나요?",
    a: "사망(후유장애) 1~3억원, 부상 1천~3천만원 중 선택해요. 소득이 높거나 프리랜서·자영업자라면 부상 시 휴업손해가 크기 때문에 상위 가입금액을 권장해요.",
  },
  {
    q: "자손 등급은 어떻게 결정되나요?",
    a: "사고 후 병원에서 진단받은 상해 정도를 1급(사망)부터 14급(경미한 타박상)까지 구분해요. 등급이 낮을수록 보상 한도가 작아져요. 14급이면 한도가 50만원밖에 안 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "손해보험협회 - 자동차보험 상품 정보", url: "https://www.knia.or.kr" },
      { label: "금융감독원 - 보험 소비자 가이드", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "자동차보험-자손-자상-차이", title: "자동차보험 자손 자상 차이", description: "두 특약의 핵심 개념 차이를 정리했어요." },
  { slug: "자동차보험-자상-보험료", title: "자동차보험 자상 보험료", description: "정확한 보험료 계산 방법이에요." },
  { slug: "자동차보험-자기신체사고-특약", title: "자동차보험 자기신체사고 특약", description: "자손 특약 상세 내용이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>자동차보험 · 자손 · 자상</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자손 자상 선택 기준<br />
        보장 범위와 보험료 차이 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차보험 갱신할 때 자손과 자상 중에서 뭘 선택해야 할지 헷갈리시죠?
        자상이 치료비 외에 위자료와 휴업손해까지 보장해서 유리해요.
        보험료 차이는 연 2~4만원이지만, 사고 시 받는 보험금 차이가 훨씬 크니까 신중하게 결정하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자손 자상 보장 범위 차이</H2>
      <p style={body}>
        자손(자기신체사고)은 상해 등급별로 정해진 한도 안에서 치료비만 보상받아요.
        1급(사망)부터 14급(경미한 타박상)까지 등급이 나뉘고, 등급이 낮을수록 한도가 작아요.
        12급이면 한도 80만원인데 치료비가 300만원 나오면 80만원만 받고 220만원은 직접 내야 해요.
      </p>
      <p style={body}>
        자상(자동차상해)은 가입금액 한도 내에서 치료비, 위자료, 휴업손해, 상실수익까지 전부 보장해요.
        과실 비율과 관계없이 보장받아요.
        전봇대를 혼자 들이받아서 내 과실이 전부여도 자상은 전액 보상돼요.
        <a href="https://www.knia.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>손해보험협회</a> 자동차보험 가이드에서도
        대부분 자상 가입을 권장해요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>자손 vs 자상 보장 항목 비교</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>보장 항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>자손 (자기신체사고)</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>자상 (자동차상해)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "치료비", juson: "등급별 한도 내", jasang: "가입금액 한도 내 전액" },
              { item: "위자료", juson: "❌", jasang: "✅" },
              { item: "휴업손해", juson: "❌", jasang: "✅" },
              { item: "상실수익", juson: "❌", jasang: "✅" },
              { item: "과실상계", juson: "적용됨", jasang: "적용 안 됨" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.item}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#888" }}>{row.juson}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#1D9E75", fontWeight: 600 }}>{row.jasang}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 출처: 손해보험협회 자동차보험 약관 기준
        </p>
      </GreenBox>

      <H2>보험료는 얼마나 차이 나나요?</H2>
      <p style={body}>
        자상이 자손보다 연간 2~4만원 정도 더 비싸요.
        보장 범위가 넓은 만큼 보험료도 높아요.
      </p>
      <p style={body}>
        실제 사고가 났을 때 받는 보험금 차이를 생각하면 자상의 가성비가 훨씬 좋아요.
        자손 가입자가 12급 부상으로 치료비 300만원 발생 시 한도 80만원만 받지만,
        자상 가입자는 300만원 전액에 휴업손해와 위자료까지 추가로 받아요.
      </p>
      <p style={body}>
        특히 단독 사고(전봇대 충돌, 단독 추락 등)처럼 내 과실만 있는 경우에는 자손은 과실상계로
        보상이 거의 안 되지만 자상은 전액 보상돼요.
        <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>금융감독원</a>에서도
        보장 범위를 우선 고려하라고 권장하고 있어요.
      </p>

      <H2>가입금액은 어떻게 선택하나요?</H2>
      <p style={body}>
        자상은 가입할 때 금액을 직접 선택해요.
        자손은 등급별로 한도가 고정이에요.
      </p>

      <BorderBox>
        <strong>자상 가입금액 선택 가이드</strong><br />
        사망·후유장애: 1억원 / 2억원 / 3억원 중 선택<br />
        부상: 1천만원 / 2천만원 / 3천만원 중 선택<br />
        <br />
        <strong>직업별 권장 가입금액</strong><br />
        직장인: 사망 1억원, 부상 1천만원 (기본)<br />
        프리랜서·자영업자: 사망 2~3억원, 부상 2~3천만원 (휴업손해 크기 때문)<br />
        <br />
        자손은 가입금액 선택 불가 → 사고 등급에 따라 한도 자동 결정
      </BorderBox>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>상황별 선택 가이드</strong>
        {[
          { situation: "프리랜서·자영업자", recommend: "자상 필수", reason: "일 못 하면 수입이 끊기기 때문에 휴업손해 보장이 중요" },
          { situation: "운전 빈도 높음", recommend: "자상 권장", reason: "사고 확률이 높아질수록 자상의 넓은 보장이 더 유리" },
          { situation: "단독 사고 가능성", recommend: "자상 필수", reason: "내 과실만 있는 사고에서도 자상만 전액 보상" },
          { situation: "보험료 최소화", recommend: "자손 고려", reason: "연 2~4만원 절감 가능하지만 사고 시 보장 차이 큼" },
        ].map((row, i) => (
          <div key={i} style={{ padding: "6px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{row.situation}</span>
            <span style={{ margin: "0 6px", color: "#1D9E75", fontWeight: 700, fontSize: 13 }}>→ {row.recommend}</span>
            <span style={{ fontSize: 12, color: "#666" }}>({row.reason})</span>
          </div>
        ))}
      </GreenBox>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 손해보험협회 자동차보험 약관 기준으로 작성됐어요. 보험료와 보장 내용은 보험사마다 다를 수 있으니 갱신 시 약관을 직접 살펴봐요." />
    </ArticleLayout>
  );
}
