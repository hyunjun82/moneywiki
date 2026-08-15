"use client";
// Q1. 목돈 생겼는데 어디 넣어둘지 고민하는 사람이 은행별 금리 비교하는 상황
// Q2. 금융감독원 금융상품한눈에서 실시간 비교 → 우대금리 조건 충족 → 최고금리 정기예금 가입
// Q3. 2026년 평균 2.81% / 저축은행 0.5~1%p 추가 / 우대금리 조건(비대면·급여이체·카드) / 예금자보호 1억원 / 이자소득세 15.4%
// Q4. GreenBox(비교 사이트 + 핵심 숫자) + GreenBox(우대금리 조건표) + BorderBox(예금자보호 + 세금) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "예금 금리 제일 높은 곳은 어디예요?",
    a: "2026년 1월 기준 저축은행과 상호금융(농협·신협·새마을금고)이 시중은행보다 0.3~1.0%p 높아요. 금융감독원 금융상품한눈에(finlife.fss.or.kr)에서 실시간 비교 가능해요. 단, 저축은행은 예금자보호 1억원 한도 내에서만 안전해요.",
  },
  {
    q: "예금 우대금리는 어떻게 받아요?",
    a: "비대면(앱) 가입, 첫 거래, 급여이체 설정, 자동이체, 카드 사용실적 같은 조건을 충족하면 기본금리에 0.1~1.5%p 추가돼요. 본인이 쉽게 충족할 수 있는 조건 위주로 골라요.",
  },
  {
    q: "예금자보호 한도가 1억원으로 늘었나요?",
    a: "네. 2025년부터 5,000만원에서 1억원으로 상향됐어요. 같은 금융기관 예금과 적금 합쳐서 1억원까지 보호받을 수 있어요. 1억원 초과분은 보호 안 되니 여러 은행에 나눠 넣는 게 안전해요.",
  },
  {
    q: "정기예금 만기 얼마로 해야 유리해요?",
    a: "일반적으로 1년짜리가 가장 기본이에요. 앞으로 금리 하락이 예상된다면 지금 높은 금리로 2~3년 장기로 묶어두는 것도 방법이에요. 중도 해지하면 이자를 거의 못 받으니 확실히 안 쓸 돈만 장기로 넣으세요.",
  },
  {
    q: "금융소득종합과세가 뭐예요?",
    a: "이자+배당 등 금융소득이 연 2,000만원을 넘으면 다른 소득과 합산해 누진세율(6~45%)이 적용돼요. 2,000만원 이하면 15.4% 원천징수로 끝나요. 목돈이 많다면 은행을 분산하거나 비과세 상품을 활용하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융상품한눈에 (실시간 금리 비교)", url: "https://finlife.fss.or.kr" },
      { label: "전국은행연합회 소비자포털 (은행별 금리)", url: "https://portal.kfb.or.kr" },
      { label: "저축은행중앙회 (저축은행 금리)", url: "https://www.fsb.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-납입한도", title: "ISA 계좌로 이자 비과세 받기", description: "예금 이자를 비과세로 받는 방법이에요." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리와 혜택", description: "입출금 자유로우면서 이자 받는 방법이에요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원 혜택", description: "예금과 함께 활용하는 절세 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 예금 · 금리 비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        예금 금리 비교<br />
        2026년 은행별 이자 최고금리 받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 1월 기준 정기예금 평균 금리는 연 2.81%예요.
        저축은행은 시중은행보다 0.5~1.0%p 높고, 우대금리 조건을 충족하면 3.5~4%대도 가능해요.
        예금자보호 한도는 2025년부터 1억원으로 상향됐어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>금리 비교하는 가장 빠른 방법</H2>
      <p style={body}>
        은행마다 일일이 앱을 열어볼 필요 없어요.
        금융감독원 공식 사이트에서 한 번에 비교하면 돼요.
      </p>

      <GreenBox>
        <strong>예금 금리 실시간 비교 사이트</strong><br />
        <strong>시중은행·저축은행·상호금융 통합</strong>: 금융감독원 금융상품한눈에 (finlife.fss.or.kr)<br />
        은행만: 전국은행연합회 소비자포털 (portal.kfb.or.kr)<br />
        저축은행만: 저축은행중앙회 (fsb.or.kr)<br />
        <br />
        2026년 1월 금리 현황<br />
        시중은행 1년 정기예금: 연 2.5~3.2%<br />
        저축은행 1년 정기예금: 연 3.0~4.0%<br />
        상호금융(농협·신협·새마을금고): 연 3.0~3.8%<br />
        <br />
        1,000만원 × 연 3.0% × 1년 = 세전 30만원 / 세후 약 25만 4천원 (이자소득세 15.4% 공제)
      </GreenBox>

      <H2>우대금리 조건으로 금리 높이기</H2>
      <p style={body}>
        기본금리만 보면 손해예요. 우대금리 조건 충족하면 기본금리보다 0.5~1.5%p 더 받을 수 있어요.
        은행마다 조건이 다르니 쉽게 충족할 수 있는 조건을 골라요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>우대 조건</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>우대폭</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>난이도</th>
            </tr>
          </thead>
          <tbody>
            {[
              { condition: "비대면(앱) 가입", bonus: "+0.1~0.3%p", difficulty: "쉬움" },
              { condition: "첫 거래 고객", bonus: "+0.2~0.5%p", difficulty: "쉬움" },
              { condition: "급여이체 설정", bonus: "+0.2~0.5%p", difficulty: "중간" },
              { condition: "자동이체 설정 (청약·IRP 등)", bonus: "+0.1~0.3%p", difficulty: "쉬움" },
              { condition: "카드 사용실적 충족", bonus: "+0.2~0.5%p", difficulty: "중간" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.condition}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.bonus}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 여러 조건 중복 충족 시 합산 최대 1.5%p까지 추가 가능<br />
          ※ 각 은행마다 조건이 다르므로 가입 전 확인 필수
        </p>
      </GreenBox>

      <H2>예금자보호와 이자 세금</H2>
      <p style={body}>
        목돈을 예금에 넣기 전에 예금자보호 한도와 이자 세금 구조를 알아야 해요.
      </p>

      <BorderBox>
        <strong>예금자보호 한도 (2025년 상향)</strong><br />
        같은 금융기관 예금+적금 합산 1억원까지 보호<br />
        1억원 초과분: 보호 안됨 → 여러 은행에 나눠서 예치 추천<br />
        저축은행도 예금자보호 대상이지만, 같은 저축은행에 1억원 이내로<br />
        <br />
        <strong>이자 세금</strong><br />
        이자소득세: 15.4% 원천징수 (소득세 14% + 지방소득세 1.4%)<br />
        100만원 이자 → 실수령 약 84만 6천원<br />
        <br />
        금융소득종합과세: 이자+배당 연 2,000만원 초과 시 다른 소득과 합산 과세<br />
        → ISA 계좌 활용하면 이자 200~400만원 비과세 가능 (일반형 200만원, 서민형 400만원)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 금융감독원 기준으로 작성됐어요. 예금 금리는 매일 변동하니 가입 전 금융상품한눈에에서 최신 금리를 확인하세요." />
    </ArticleLayout>
  );
}
