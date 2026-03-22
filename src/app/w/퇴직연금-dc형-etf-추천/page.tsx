"use client";

// Q1. DC형 퇴직연금에 돈이 쌓여있는데 원금보장형에만 넣어두면 손해 볼 것 같고, ETF로 굴리고 싶은 상황이에요.
// Q2. 안전자산 30% 규정을 지키면서 위험자산 70%에 적합한 ETF를 골라 직접 매수하는 행동.
// Q3. 위험자산 70%/안전자산 30% 법적 규정, 위험자산 추천 ETF, 안전자산 추천 ETF, 리밸런싱 주기.
// Q4. GreenBox(핵심 비율) + 표(ETF 비교) + Checklist(매수 전 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "DC형에서 ETF 매수는 어떻게 하나요?",
    a: "가입한 금융기관(은행·증권사) 앱에서 퇴직연금 메뉴에 들어가면 ETF를 검색하고 매수할 수 있어요. 증권사 앱이 종목이 가장 많아요.",
  },
  {
    q: "안전자산 30%를 채권 ETF로 채워도 되나요?",
    a: "돼요. 국채 ETF, 단기채 ETF, 채권혼합형 ETF 모두 안전자산으로 인정돼요. TDF(타겟데이트펀드)도 안전자산으로 분류돼요.",
  },
  {
    q: "원금보장형에만 넣어두면 어떻게 되나요?",
    a: "원금은 보전되지만 수익률이 연 2~3% 수준이에요. 물가상승률을 못 따라가면 실질적으로는 손해예요.",
  },
  {
    q: "레버리지·인버스 ETF도 가능한가요?",
    a: "안 돼요. 퇴직연금 계좌에서는 레버리지·인버스 ETF 매수가 금지돼 있어요. 일반 시장지수 ETF만 가능해요.",
  },
  {
    q: "리밸런싱은 얼마나 자주 하나요?",
    a: "1년에 1~2번이면 충분해요. 주가가 크게 올라서 위험자산 비중이 70%를 넘기면 일부를 안전자산으로 옮기면 돼요.",
  },
  {
    q: "DC형을 IRP로 옮길 수 있나요?",
    a: "퇴직할 때 DC형 적립금을 IRP로 이전할 수 있어요. IRP에서도 같은 ETF 투자가 가능하고, 세액공제 혜택까지 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-db-dc-차이", title: "퇴직연금 DB형 vs DC형 차이", description: "DB형은 회사가 운용하고 DC형은 내가 운용해요. 어떤 게 유리한지 비교해요." },
  { slug: "퇴직연금-etf-추천", title: "퇴직연금 ETF 추천", description: "IRP·DC형에서 매수할 수 있는 ETF 종류와 수익률을 비교해요." },
  { slug: "퇴직연금", title: "퇴직연금 제도 전체 안내", description: "DB, DC, IRP 세 가지 유형과 수령 방법을 정리해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 투자 · ETF</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 DC형, ETF로 어떻게 굴릴까?<br />
        안전자산 30% 맞추는 포트폴리오
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형 퇴직연금에 돈이 쌓여있는데 원금보장형에만 넣어두고 계시죠?
        연 2~3% 이자로는 물가상승률도 못 따라가요.
        법적으로 위험자산 70%, 안전자산 30% 규정만 지키면 ETF로 직접 운용할 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>위험자산 70%, 안전자산 30% 규정</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서
        DC형 계좌의 위험자산 투자 한도를 적립금의 70%까지로 정해뒀어요.
        나머지 30%는 반드시 안전자산으로 채워야 해요.
      </p>

      <GreenBox>
        DC형 투자 비율 규정이에요.<br />
        · <strong>위험자산 (최대 70%)</strong>: 주식형 ETF, 주식형 펀드, 리츠(REITs)<br />
        · <strong>안전자산 (최소 30%)</strong>: 예금, 국채 ETF, 채권형 펀드, TDF, 채권혼합형 ETF<br />
        · 레버리지·인버스 ETF는 매수 불가
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>위험자산 70%에 담을 ETF</H2>
      <p style={body}>
        장기 투자라면 미국 대형주 지수를 추종하는 ETF가 검증된 선택지예요.
        국내 상장된 해외주식형 ETF를 매수하면 퇴직연금 계좌에서도 투자할 수 있어요.
      </p>

      <SectionBadge>위험자산 추천 ETF 유형</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>추종 지수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["S&P500 ETF", "미국 대형주 500개", "안정적 장기 성장, 연평균 10% 내외"],
              ["나스닥100 ETF", "미국 기술주 100개", "성장성 높지만 변동성도 큼"],
              ["배당 ETF (SCHD형)", "미국 고배당주", "안정적 배당수익, 하락장 방어"],
              ["국내 코스피200 ETF", "국내 대형주 200개", "환율 리스크 없음, 국내 경기 연동"],
            ].map(([type, index, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{index}</td>
                <td style={{ padding: "9px 12px", color: "#555" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>안전자산 30%는 어떻게 채우나요?</H2>
      <p style={body}>
        단순히 예금에 넣어두는 것보다 채권 ETF나 TDF를 활용하면 약간의 수익까지 기대할 수 있어요.
        채권혼합형 ETF는 안전자산으로 분류되면서도 주식 비중을 일부 포함해서 실질 수익률을 높이는 전략이에요.
      </p>

      <BorderBox>
        안전자산 채우기 3가지 방법이에요.<br /><br />
        <strong>1. 국채 ETF</strong>: 국고채 10년물 ETF. 안정적이고 금리 하락기에 수익 기대<br />
        <strong>2. 단기채 ETF</strong>: 파킹통장 대용. 변동성 낮고 연 3~4% 수준<br />
        <strong>3. TDF (타겟데이트펀드)</strong>: 은퇴 시점에 맞춰 자동으로 주식/채권 비율 조절
      </BorderBox>

      <SectionBadge>ETF 매수 전 점검</SectionBadge>
      <Checklist items={[
        "내 DC형 계좌의 현재 위험자산/안전자산 비율 확인",
        "증권사 앱에서 퇴직연금 전용 ETF 검색 가능 여부 확인",
        "레버리지·인버스 ETF는 매수 불가 (주의)",
        "연 1~2회 리밸런싱 일정 캘린더에 기록",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융감독원·고용노동부 자료를 바탕으로 작성됐어요. ETF 수익률은 과거 성과이며 미래 수익을 보장하지 않아요. 투자 판단은 본인 책임이에요." />
    </ArticleLayout>
  );
}
