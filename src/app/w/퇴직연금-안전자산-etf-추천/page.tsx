"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 퇴직연금 안전자산 30%를 뭘로 채워야 할지 고민이에요. 예금만 넣기엔 수익이 너무 적어요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 안전자산 ETF 종류를 비교하고 본인에 맞는 상품을 골라 매수하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 안전자산 분류 기준, 채권 ETF(단기·중기·장기), TDF, 채권혼합형 ETF, 예금형 상품 차이, 금리 변동 리스크.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(안전자산 분류) + 표(ETF 비교) + BorderBox(포트폴리오) + Checklist(선택 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "안전자산 30% 꼭 채워야 하나요?", a: "DC형, IRP는 법적 의무예요. 위험자산 70% 초과 매수 자체가 시스템에서 막혀요." },
  { q: "채권 ETF도 손실 날 수 있나요?", a: "네. 금리가 오르면 채권 가격이 떨어져서 단기적으로 손실이 나요. 단기채권 ETF가 변동성이 가장 적어요." },
  { q: "TDF는 안전자산인가요 위험자산인가요?", a: "TDF의 채권 비중만큼 안전자산으로 인정받아요. TDF2030은 채권 비중이 높아서 안전자산 비중이 크고, TDF2050은 주식 비중이 높아요." },
  { q: "채권혼합형 ETF가 뭔가요?", a: "주식 50% + 채권 50%로 구성된 ETF예요. 안전자산으로 분류되면서 주식 수익도 기대할 수 있어요. 2023년 규제 완화 이후 주식 비중을 50%까지 담을 수 있게 됐어요." },
  { q: "예금이 가장 안전하지 않나요?", a: "원금 보장 면에서는 그렇죠. 하지만 수익률이 낮아요. 채권 ETF나 TDF를 섞으면 안전성을 유지하면서 더 높은 수익을 기대할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 퇴직연금", url: "https://www.fss.or.kr" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
      { label: "TIGER ETF 퇴직연금 안전자산", url: "https://investments.miraeasset.com/tigeretf/ko/theme-etf/view.do?detailsKey=ETF_TEMA_12" },
    ],
  },
];

const CHECKLIST_ITEMS = [
  "금리 상승기엔 단기채권 ETF가 유리해요",
  "금리 하락기엔 장기채권 ETF가 유리해요",
  "직접 리밸런싱이 어려우면 TDF가 편해요",
  "주식 비중을 최대로 높이고 싶으면 채권혼합형 ETF를 활용해요",
  "운용보수 0.08%~0.36%까지 차이가 크니 비교해보세요",
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 안전자산 · ETF</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 안전자산 30%<br />
        예금보다 나은 ETF 선택법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        안전자산 30%를 예금에만 넣고 계시죠? 수익이 너무 적어서 아까운 느낌이 들 거예요.
        채권 ETF나 TDF로 채우면 안전자산으로 인정받으면서도 예금보다 높은 수익을 노릴 수 있어요.
        어떤 상품이 있고, 뭘 골라야 하는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>안전자산으로 분류되는 상품이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 기준으로
        퇴직연금에서 안전자산으로 인정받는 상품 유형이에요.
      </p>

      <GreenBox title="안전자산 분류">
        · <strong>채권형 펀드·ETF</strong>: 채권에 투자하는 상품<br />
        · <strong>채권혼합형 ETF</strong>: 채권 비중 50% 이상 (주식 최대 50%)<br />
        · <strong>TDF</strong>: 타겟데이트펀드 (채권 비중만큼 인정)<br />
        · <strong>예금형 상품</strong>: 원금 보장, 안전자산 100%
      </GreenBox>

      <Divider />

      <H2>채권 ETF, 어떤 걸 골라야 하나요?</H2>
      <p style={body}>
        채권 ETF는 만기에 따라 단기·중기·장기로 나뉘어요.
        단기채권 ETF가 변동성이 가장 적고, 장기채권 ETF는 금리 변동에 민감해요.
      </p>

      <SectionBadge>채권 ETF 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>ETF</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>만기</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>변동성</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>적합한 상황</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KODEX 단기채권", "1년 이하", "낮음", "금리 상승기, 안정 추구"],
              ["TIGER 단기채권액티브", "1년 이하", "낮음", "파킹 통장 대용"],
              ["KODEX 국고채3년", "3년", "중간", "균형 추구"],
              ["TIGER 국채3년", "3년", "중간", "균형 추구"],
              ["KODEX 국고채10년", "10년", "높음", "금리 하락기, 수익 추구"],
            ].map(([name, term, vol, fit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{name}</td>
                <td style={{ padding: "9px 12px" }}>{term}</td>
                <td style={{ padding: "9px 12px", color: vol === "낮음" ? "#1D9E75" : vol === "중간" ? "#d97706" : "#ef4444" }}>{vol}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>TDF와 채권혼합형은 뭐가 다른가요?</H2>
      <p style={body}>
        TDF(타겟데이트펀드)는 은퇴 시점에 맞춰 자동으로 주식·채권 비중을 조절해요.
        채권혼합형 ETF는 주식과 채권을 고정 비율로 담아서 직접 관리할 필요가 적어요.
      </p>

      <BorderBox>
        <strong>TDF 선택 기준</strong><br />
        · TDF2030: 은퇴가 가까운 분, 채권 비중 높아서 안정적<br />
        · TDF2045: 30~40대, 주식·채권 균형<br />
        · TDF2050: 20~30대, 주식 비중 높아서 성장성 큼<br /><br />
        <strong>채권혼합형 ETF</strong><br />
        · ACE 미국S&P500채권혼합: 주식 50% + 채권 50%<br />
        · 안전자산으로 분류되면서 주식 수익도 기대 가능<br />
        · 위험자산 70% + 채권혼합형 30% = 실질 주식 비중 최대 85%
      </BorderBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>어떤 조합이 좋을까요?</H2>
      <p style={body}>
        금리 상황과 투자 성향에 따라 안전자산 30%의 구성을 달리하세요.
      </p>

      <SectionBadge>안전자산 30% 구성 예시</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구성</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["수익 추구형", "채권혼합 ETF 20% + 단기채권 10%", "주식 비중 최대화"],
              ["균형형", "단기채권 10% + TDF 10% + 예금 10%", "안정·수익 균형"],
              ["안정 추구형", "단기채권 10% + 예금 20%", "원금 보존 우선"],
            ].map(([type, comp, feature], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{comp}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{feature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>고르기 전에 이것만 확인하세요</H2>
      <SectionBadge>선택 기준 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 투자 판단의 참고자료로 작성했어요. 특정 상품을 추천하거나 수익을 보장하지 않아요. 투자 결정은 본인 판단으로 하세요." />
    </div>
  );
}
