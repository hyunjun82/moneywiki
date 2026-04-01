"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. ISA 계좌 개설했는데 뭘 사야 할지 모르는 투자자가 ETF 선택하는 상황
// Q2. 고배당 ETF 위주로 포트폴리오 구성 → 비과세 혜택 최대로 받기
// Q3. KODEX고배당 배당률4.5% / TIGER미국S&P500 보수0.07% / 배당ETF가 비과세 효과 큼 / 해외주식 직접 불가 / 3~5개 추천
// Q4. GreenBox(ETF 추천 순위표) + GreenBox(배당 절세 효과) + BorderBox(포트폴리오 + 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "ISA 계좌에서 해외 ETF도 살 수 있나요?",
    a: "국내 증권거래소에 상장된 ETF만 가능해요. 미국 나스닥·뉴욕증권거래소에 상장된 ETF는 직접 못 사요. 대신 국내에 상장된 미국 추종 ETF(TIGER 미국S&P500, KODEX 나스닥100 등)는 살 수 있어요.",
  },
  {
    q: "성장주 ETF(KODEX 2차전지 등)는 ISA에 안 맞나요?",
    a: "성장주 ETF는 배당이 거의 없어요. ISA 비과세 혜택은 배당·이자에 적용되는데, 배당이 없으면 비과세 효과가 거의 없어요. 주식 매매차익은 원래 세금이 없으니까 굳이 ISA에 넣을 필요가 없어요. 배당 ETF로 비과세 효과를 극대화하세요.",
  },
  {
    q: "레버리지 ETF를 ISA에 넣으면 어떻게 되나요?",
    a: "레버리지 ETF는 변동성이 커서 ISA 3년 유지 조건과 잘 맞지 않아요. 운이 좋으면 수익이 크지만, 손실 시 비과세 혜택도 줄어들어요. 안정적인 고배당 ETF나 지수 추종 ETF 위주로 투자하는 게 ISA에 적합해요.",
  },
  {
    q: "ETF는 몇 개까지 사는 게 좋아요?",
    a: "3~5개를 추천해요. 너무 많으면 관리가 어렵고 수수료도 늘어요. 국내 지수(KODEX 200) + 미국 지수(TIGER 미국S&P500) + 고배당(KODEX 고배당) 3개 조합이 균형 잡힌 편이에요.",
  },
  {
    q: "ISA 만기 후 ETF는 어떻게 처리해요?",
    a: "만기 해지 시 ETF를 매도하거나, ISA 계좌를 연금저축계좌나 IRP로 전환할 수 있어요. IRP로 이전하면 이전 금액의 10%(최대 300만원) 추가 세액공제도 받을 수 있어요. 3년 이상 보유 후 해지하면 비과세 혜택도 그대로 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국거래소 ETF 정보", url: "https://www.krx.co.kr" },
      { label: "금융투자협회 ETF 배당 정보", url: "https://www.kofia.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-기본", title: "ISA 계좌 유형 선택 (중개형·서민형)", description: "ETF 사기 전에 ISA 유형 먼저 선택하세요." },
  { slug: "ISA계좌-납입한도", title: "ISA 납입 한도 연간 2,000만원", description: "매달 얼마씩 넣어야 한도를 채울 수 있는지예요." },
  { slug: "퇴직연금-ETF-추천-안전자산-배당-상품", title: "퇴직연금 안전자산 ETF 추천", description: "ISA 외에 퇴직연금에서도 ETF로 수익 낼 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA · ETF 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 ETF 추천<br />
        고배당 ETF로 비과세 혜택 극대화
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 계좌에서는 배당·이자에 세금이 없어요. 그래서 배당을 많이 주는 ETF를 담아야 비과세 효과가 커요.
        KODEX 200, TIGER 미국S&P500은 안정적이고, KODEX 고배당은 배당률 4.5%로 비과세 효과가 제일 커요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 추천 ETF 순위</H2>
      <p style={body}>
        배당을 많이 받을수록 ISA 비과세 혜택이 커요.
        배당이 없는 성장주 ETF는 매매차익에 세금이 없어서 굳이 ISA에 담을 필요가 없어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>ETF</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>종류</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>배당률</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>보수</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>ISA 추천도</th>
            </tr>
          </thead>
          <tbody>
            {[
              { etf: "KODEX 고배당", type: "국내 고배당", div: "4.5%", fee: "0.25%", rating: "★★★★★" },
              { etf: "TIGER 배당귀족", type: "미국 고배당", div: "3.0%", fee: "0.12%", rating: "★★★★★" },
              { etf: "KODEX 200", type: "국내 대형주", div: "2.0%", fee: "0.15%", rating: "★★★★" },
              { etf: "TIGER 미국S&P500", type: "미국 대형주", div: "1.5%", fee: "0.07%", rating: "★★★★" },
              { etf: "KODEX 단기채권", type: "국내 채권", div: "3.5%", fee: "0.08%", rating: "★★★★" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i < 2 ? "rgba(29,158,117,0.04)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i < 2 ? 700 : 400 }}>{row.etf}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.div}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.fee}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12 }}>{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 배당률은 과거 기준이며 변동 가능 / 보수는 연간 운용 수수료
        </p>
      </GreenBox>

      <H2>배당 ETF로 절세 효과 비교</H2>
      <p style={body}>
        ISA 서민형으로 배당 ETF에 투자하면 일반 계좌 대비 얼마나 더 받을 수 있는지 계산해봐요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>투자금액</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>3년 배당 (4.5%)</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>일반 계좌 세금</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>ISA 서민형 절세</th>
            </tr>
          </thead>
          <tbody>
            {[
              { amount: "1,000만원", div: "135만원", tax: "20.8만원", save: "20.8만원" },
              { amount: "2,000만원", div: "270만원", tax: "41.6만원", save: "41.6만원" },
              { amount: "3,000만원", div: "405만원", tax: "62.4만원", save: "약 61.9만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.amount}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.div}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#E53E3E" }}>{row.tax}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.save}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ KODEX 고배당 연 배당률 4.5% 기준 / 서민형 비과세 한도 400만원 적용
        </p>
      </GreenBox>

      <H2>ISA ETF 포트폴리오 전략</H2>
      <p style={body}>
        배당을 많이 받으면서 안정적인 포트폴리오를 구성하는 방법이에요.
        3~5개 ETF로 분산하면 관리도 편하고 균형이 잡혀요.
      </p>

      <BorderBox>
        <strong>추천 포트폴리오 예시 (월 50만원 기준)</strong><br />
        KODEX 고배당 25만원 (50%) — 국내 고배당, 비과세 효과 극대화<br />
        TIGER 미국S&P500 15만원 (30%) — 미국 시장 장기 성장<br />
        KODEX 단기채권 10만원 (20%) — 안전자산, 이자 수익<br />
        <br />
        3년 후 예상: 적립금 1,800만원 + 배당 200만원 이상 (비과세)<br />
        <br />
        <strong>주의사항</strong><br />
        해외주식 직접 매매 불가 → 국내 상장 해외 ETF로 대체<br />
        레버리지·인버스 ETF는 변동성이 커서 ISA에 부적합<br />
        배당 없는 성장주 ETF는 ISA 비과세 효과 거의 없음<br />
        <br />
        ★ 3년 이상 보유 유지해야 비과세 혜택 적용 (중도 해지 시 15.4%)
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. ETF 배당률·수익률은 과거 성과 기준이며 미래 수익을 보장하지 않아요. 투자 전 상품 설명서를 꼭 확인하세요." />
    </ArticleLayout>
  );
}
