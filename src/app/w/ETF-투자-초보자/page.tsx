"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 주식 투자를 시작하고 싶은데 어떤 종목을 사야 할지 모르겠고, 한 종목에 몰빵하기 무서워서 분산 투자 방법을 찾는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 초보자에게 맞는 ETF를 선택하고 증권사 앱에서 첫 매수를 하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → ETF 구조(지수 추종), 초보자 추천 상품(KODEX 200·S&P500), 투자 방법(적립식), 선택 기준(거래량·수수료), 주의사항(레버리지 금지).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 비교표(개별주식 vs ETF) + GreenBox(핵심 전략) + Steps(투자 순서) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const INVEST_STEPS = [
  { title: "증권사 계좌 개설", desc: "키움·미래에셋·삼성·신한 중 하나를 앱에서 개설해요. 신분증과 휴대폰이면 10분 이내에 완료돼요." },
  { title: "투자 금액 결정", desc: "첫 달은 월 10~20만원 소액으로 시작해요. 무리하지 않는 금액이 장기 투자의 핵심이에요." },
  { title: "ETF 검색 및 선택", desc: "앱 검색창에 'KODEX 200' 또는 'TIGER 미국S&P500'을 검색해요. 거래량·수수료를 비교해봐요." },
  { title: "적립식 매수 설정", desc: "매달 일정 날짜에 자동 매수하도록 설정하거나, 직접 매달 같은 날에 매수해요." },
  { title: "장기 보유", desc: "최소 5년, 가급적 10년 이상 보유해요. 시장 등락에 흔들리지 않는 게 핵심이에요." },
];

const FAQS = [
  {
    q: "ETF는 얼마부터 살 수 있나요?",
    a: "KODEX 200은 1주에 약 3만원 내외예요. 증권사에 따라 소수점 매매도 가능해서 1만원부터 시작할 수 있어요. 부담 없이 시작하세요.",
  },
  {
    q: "KODEX 200과 TIGER 200 중 뭐가 더 좋아요?",
    a: "같은 KOSPI 200 지수를 추종해요. 삼성자산운용(KODEX)과 미래에셋자산운용(TIGER)이 만든 상품으로, 수수료가 비슷하고 실적도 거의 동일해요. 어떤 걸 사든 큰 차이는 없어요.",
  },
  {
    q: "미국 S&P500 ETF는 환율 영향을 받나요?",
    a: "받아요. 달러 환율이 오르면 수익이 커지고, 내리면 줄어요. 이게 부담스러우면 환헷지(H) 상품을 선택할 수 있지만 장기적으로는 환헷지 없는 게 유리한 경우가 많아요.",
  },
  {
    q: "ETF 수익에 세금은 얼마 내나요?",
    a: "국내 ETF 매매 차익은 비과세예요. 단, 분배금(배당)은 15.4% 과세예요. 해외 ETF 차익은 250만원 초과분에 대해 22% 양도소득세가 부과돼요. ISA나 연금계좌를 활용하면 세금을 줄일 수 있어요.",
  },
  {
    q: "ETF 투자 중에 시장이 30% 폭락하면 어떡하나요?",
    a: "그때가 더 살 기회예요. 적립식으로 꾸준히 사면 폭락 시 더 낮은 가격에 매수하는 효과가 생겨요. 역대 주요 지수 ETF는 폭락 후 모두 회복했어요. 팔지 않는 게 핵심이에요.",
  },
  {
    q: "ETF와 펀드 차이가 뭔가요?",
    a: "펀드는 매일 1번 기준가로 사고팔 수 있어요. ETF는 주식처럼 실시간으로 매매 가능하고 수수료도 훨씬 저렴해요. 초보자에겐 ETF가 훨씬 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국거래소 ETF 정보(ETF 목록·거래량 조회)", url: "https://www.krx.co.kr" },
      { label: "금융투자협회 ETF 투자 안내", url: "https://www.kofia.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA-계좌-가입-세제혜택", title: "ISA 계좌로 ETF 세금 아끼는 법", description: "ISA에서 ETF 투자하면 수익 200만원까지 비과세예요." },
  { slug: "채권-투자-수익률", title: "채권 ETF로 안전하게 투자하기", description: "주식 ETF와 채권 ETF를 섞으면 변동성이 줄어요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드로 ETF 투자 + 세액공제", description: "연금저축에서 ETF 사면 세액공제도 받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>투자 · ETF · 초보자 가이드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ETF 투자 초보자 가이드<br />
        첫 매수부터 장기 전략까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        어떤 주식을 사야 할지 모르겠고, 한 종목에 몰빵하기는 무서우시죠? ETF는 이 두 가지 고민을 한 번에 해결해줘요.
        200~500개 회사에 분산 투자하는 효과를 내면서 수수료는 연 0.1~0.5%로 저렴해요.
        어디서 사고 뭘 골라야 하는지 순서대로 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>ETF가 초보자에게 맞는 이유</H2>
      <p style={body}>
        ETF(Exchange Traded Fund, 상장지수펀드)는 특정 지수를 따라가도록 만든 펀드예요.
        주식처럼 실시간으로 사고팔 수 있고, 수수료도 일반 펀드의 1/10 수준이에요.
        한 종목을 사면 여러 회사에 분산된 효과가 생기는 게 가장 큰 장점이에요.
      </p>

      <SectionBadge>개별 주식 vs ETF 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>개별 주식</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>ETF</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["분산 효과", "없음 (1종목)", "200~500종목 분산"],
              ["종목 선택 필요", "필수", "불필요 (지수 자동 추종)"],
              ["수수료", "없음 (매매 수수료만)", "연 0.05~0.5%"],
              ["시장 시간 매매", "가능", "가능"],
              ["최소 투자금", "1주 (수만~수백만원)", "1주 (수천~3만원)"],
              ["리스크", "개별 기업 파산 위험", "시장 전체 리스크만"],
            ].map(([item, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        KODEX 200 1주를 사면 삼성전자·SK하이닉스 등 200개 회사에 분산된 효과가 생겨요.<br />
        한 회사가 망해도 포트폴리오 전체에 미치는 영향은 0.5% 미만이에요.
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>초보자 추천 ETF, 이것부터 시작해요</H2>
      <p style={body}>
        처음엔 대표 지수 ETF 1~2개면 충분해요. 종목이 많다고 좋은 게 아니에요.
        복잡할수록 관리가 어렵고 매매 실수가 늘어요.
      </p>

      <SectionBadge>초보자 추천 ETF 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>상품명</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>추종 지수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KODEX 200 / TIGER 200", "KOSPI 200", "국내 대표 기업 200개 분산, 1주 약 3만원"],
              ["TIGER 미국S&P500", "S&P 500", "미국 대표 기업 500개 분산, 장기 우상향"],
              ["KODEX 미국S&P500", "S&P 500", "S&P500 추종, 삼성자산운용 운용"],
              ["TIGER 미국나스닥100", "나스닥 100", "애플·MS·엔비디아 등 기술주 100개"],
              ["KODEX TDF2040 (연금용)", "생애주기 혼합", "연금계좌 전용, 자동 리밸런싱"],
            ].map(([name, index, desc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{name}</td>
                <td style={{ padding: "9px 12px" }}>{index}</td>
                <td style={{ padding: "9px 12px" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>첫 ETF 매수, 5단계로 시작해요</H2>
      <p style={body}>
        복잡하지 않아요. 증권사 앱 하나면 10분 만에 첫 매수까지 완료할 수 있어요.
      </p>

      <Steps steps={INVEST_STEPS} />

      <Divider />

      <H2>초보자가 꼭 피해야 할 것들</H2>
      <p style={body}>
        ETF는 장기 투자 상품이에요. 단기 매매나 잘못된 상품 선택이 가장 큰 실수예요.
      </p>

      <BorderBox>
        초보자 3대 금지 사항이에요.<br />
        · <strong>레버리지·인버스 ETF</strong>: 2배 움직이는 상품, 손실도 2배 (단기 투기용)<br />
        · <strong>테마·섹터 ETF 몰빵</strong>: 반도체·2차전지 등 한 섹터만 사면 변동성이 커요<br />
        · <strong>단기 매매</strong>: 시장 등락에 사고팔면 수수료와 세금만 늘어요
      </BorderBox>

      <p style={body}>
        ETF 선택 시 거래량이 하루 10만주 이상이고, 운용자산(순자산)이 100억원 이상인지 꼭 살펴봐요.
        거래량이 적으면 매도하려 할 때 사는 사람이 없어서 원하는 가격에 못 팔 수 있어요.
        수수료는 같은 지수를 추종해도 운용사마다 다르니 낮은 걸 고르는 게 유리해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 한국거래소·금융투자협회 자료를 바탕으로 작성됐어요. ETF 금리·수수료는 운용사 사정에 따라 변경될 수 있으니 투자 전 상품 설명서를 꼭 읽어봐요." />
    </ArticleLayout>
  );
}
