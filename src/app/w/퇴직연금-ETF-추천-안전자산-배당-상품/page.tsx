"use client";
// Q1. DC형 퇴직연금 가진 직장인이 "안전자산 30%를 뭘로 채워야 해?" 상품 고르는 상황
// Q2. 국채 ETF·채권혼합형·월배당 ETF 중 선택해서 포트폴리오 구성 → 증권사 앱에서 매수
// Q3. 안전자산 30% 규칙 / 국채ETF(연3~4%) vs 채권혼합형(연5~7%) vs 월배당(연6~8%) / 배당세 면제 / 나이별 전략
// Q4. GreenBox(ETF 유형별 요약표) + GreenBox(나이별 포트폴리오) + BorderBox(세금 혜택) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "퇴직연금 안전자산 30% 규칙이 뭐예요?",
    a: "근로자퇴직급여 보장법에서 DC형·IRP 계좌의 위험자산(주식형 ETF 등)은 최대 70%, 안전자산(채권·예금 등)은 최소 30%를 유지해야 한다는 규칙이에요. 주식 폭락 시 원금을 최소한 보호하기 위한 규제예요.",
  },
  {
    q: "채권혼합형 ETF도 안전자산으로 인정돼요?",
    a: "네. 채권 비중이 50% 이상인 ETF는 주식이 30~50% 섞여 있어도 안전자산으로 인정받아요. 이를 활용하면 안전자산 30% 규칙을 지키면서도 실제 주식 비중을 85%까지 높일 수 있어요.",
  },
  {
    q: "퇴직연금 계좌에서 배당을 받으면 세금을 내나요?",
    a: "안 내요. 일반 계좌에서 배당금 받으면 15.4%를 떼는데, 퇴직연금·IRP 계좌에서는 배당세가 없어요. 55세 이후 연금으로 수령할 때 3.3~5.5%만 내면 돼요.",
  },
  {
    q: "월배당 ETF 배당률 연 6~8%가 보장되나요?",
    a: "보장은 아니에요. 기대 수준이에요. 배당률은 매달 변하고, 시장 상황에 따라 낮아질 수 있어요. 장기적으로 재투자하는 전략이 단기 배당 수령보다 유리해요.",
  },
  {
    q: "DC형이 아닌 DB형 퇴직연금은 어떻게 해요?",
    a: "DB형(확정급여형)은 회사가 운용하고 퇴직 시 정해진 금액을 받아요. 본인이 투자 결정을 할 수 없어요. 투자 자유가 있는 건 DC형(확정기여형)과 IRP(개인형 퇴직연금)예요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여 보장법 (안전자산 비율 규정)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "국세청: 퇴직연금 세제 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-운용-방법-ETF-펀드-선택-전략", title: "퇴직연금 운용 방법 ETF와 펀드 선택", description: "DC형 퇴직연금 전체 포트폴리오 전략이에요." },
  { slug: "퇴직연금-수수료-비교-증권사-은행-선택", title: "퇴직연금 수수료 비교 증권사 vs 은행", description: "증권사로 이전하면 수수료를 크게 줄일 수 있어요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원 혜택", description: "퇴직연금과 함께 활용하는 절세 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · DC형 · ETF 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 ETF 추천 — 안전자산 30%<br />
        국채·채권혼합·월배당 상품 선택법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        안전자산 30%를 은행 예금만 하면 연 3% 수익이에요.
        국채 ETF는 연 3~4%, 채권혼합형은 연 5~7%, 월배당 ETF는 연 6~8%를 기대할 수 있어요.
        퇴직연금 계좌에서는 배당세가 없어서 세금 혜택도 커요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>안전자산으로 인정되는 ETF 유형별 비교</H2>
      <p style={body}>
        국채 ETF, 채권혼합형 ETF, 월배당 ETF 모두 안전자산으로 인정돼요.
        수익률과 변동성이 다르니까 본인 성향에 맞게 골라요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>기대 수익률</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>변동성</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>대표 상품 예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "국채 ETF", returns: "연 3~4%", risk: "낮음", examples: "KODEX 국고채10년, ACE 국고채10년" },
              { type: "채권혼합형 ETF", returns: "연 5~7%", risk: "중간", examples: "KODEX 200미국채혼합, SOL 미국배당미국채혼합50" },
              { type: "월배당 ETF", returns: "연 6~8%", risk: "중간", examples: "KODEX 미국배당커버드콜, 월배당 배당성장주" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75" }}>{row.returns}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.risk}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 채권혼합형: 주식 30~50% + 채권 50~70% 구성. 채권 50% 이상이면 안전자산으로 인정<br />
          ※ 수익률은 과거 성과 기준, 미래 수익 보장 아님
        </p>
      </GreenBox>

      <H2>나이별 안전자산 구성 전략</H2>
      <p style={body}>
        은퇴까지 남은 기간에 따라 안전자산 30%를 다르게 배분하는 게 유리해요.
        젊을수록 채권혼합형을 더 쓸 수 있어요.
      </p>

      <GreenBox>
        <strong>30대 (은퇴까지 30년): 성장 우선</strong><br />
        안전자산 900만원 기준 (총 3,000만원)<br />
        → 채권혼합형 ETF 600만원 + 국채 ETF 300만원<br />
        → 실질 주식 비중 약 82% / 기대 수익률 연 7~9%<br />
        <br />
        <strong>40~50대 (은퇴까지 10~20년): 균형</strong><br />
        → 채권혼합형 ETF 450만원 + 국채 ETF 450만원<br />
        → 실질 주식 비중 약 74% / 기대 수익률 연 6~7%<br />
        <br />
        <strong>55세 이상 (은퇴 후): 안정 + 월배당</strong><br />
        → 국채 ETF 600만원 + 은행 정기예금 300만원<br />
        → 실질 주식 비중 약 70% / 기대 수익률 연 5~6%<br />
        위험자산에 월배당 ETF 포함해 매달 생활비 보충
      </GreenBox>

      <H2>퇴직연금 계좌의 배당세 혜택</H2>
      <p style={body}>
        일반 증권 계좌와 달리 퇴직연금·IRP 계좌에서는 배당금을 받을 때 세금이 없어요.
        장기 복리 효과가 훨씬 커지는 이유예요.
      </p>

      <BorderBox>
        <strong>퇴직연금 계좌 배당세 혜택</strong><br />
        일반 계좌: 배당금 수령 시 15.4% 배당소득세 부과<br />
        퇴직연금·IRP: 배당세 0% (연금 수령 시 3.3~5.5%만)<br />
        <br />
        예시: 배당금 연 100만원을 20년간 받을 경우<br />
        일반 계좌: 누적 세금 약 308만원<br />
        퇴직연금: 누적 세금 0원 (재투자 복리 효과까지 극대화)<br />
        <br />
        ★ 채권혼합형 ETF로 안전자산 30%를 구성하면<br />
        안전자산 30% 규칙을 지키면서 실질 주식 비중을 85%까지 높일 수 있어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 근로자퇴직급여 보장법 기준으로 작성됐어요. 특정 ETF 상품 추천이 아니며, 투자 결정은 본인 책임이에요. 투자 전 상품 설명서를 꼭 확인하세요." />
    </ArticleLayout>
  );
}
