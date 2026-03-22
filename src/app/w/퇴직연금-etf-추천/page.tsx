"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → DC형이나 IRP에 퇴직연금이 쌓이는데 예금에만 두기 아까워서 ETF로 투자하고 싶은데 뭘 사야 할지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 안전자산 30% 규정을 이해하고, 위험·안전자산 ETF를 골라 포트폴리오를 구성해서 매수하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → DC형/IRP만 가능(DB형 불가), 안전자산 30% 의무, 위험자산 70% 한도, 국내 상장 ETF만 가능, 운용보수·순자산총액 기준, 채권혼합형 ETF로 주식비중 확대 가능.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 규정) + 표(ETF 목록) + BorderBox(포트폴리오 예시) + Checklist(선택 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "DB형 퇴직연금으로 ETF 투자할 수 있나요?", a: "안 돼요. DB형은 회사가 운용해서 개인이 투자 상품을 고를 수 없어요. DC형이나 IRP만 가능해요." },
  { q: "해외 거래소에 상장된 ETF도 살 수 있나요?", a: "안 돼요. 국내 증권거래소에 상장된 ETF만 매수 가능해요. TIGER 미국S&P500처럼 국내 상장 해외지수 ETF는 가능해요." },
  { q: "안전자산 30%를 예금으로만 채워도 되나요?", a: "가능해요. 하지만 수익률이 낮아요. 채권 ETF나 TDF로 채우면 안전자산으로 인정받으면서 더 높은 수익을 기대할 수 있어요." },
  { q: "위험자산 한도를 초과하면 어떻게 되나요?", a: "증권사 시스템에서 자동으로 막혀요. 위험자산 70%를 초과하는 매수 주문은 체결되지 않아요." },
  { q: "ETF 운용보수가 왜 중요한가요?", a: "0.1%p 차이도 20~30년 쌓이면 수백만원 차이가 나요. 같은 지수를 추종하면 운용보수가 낮은 상품이 유리해요." },
  { q: "리밸런싱은 얼마나 자주 해야 하나요?", a: "1년에 1~2번이면 충분해요. 주식 비중이 70%를 넘지 않도록 점검하고, 넘으면 일부 매도해서 안전자산 비중을 맞추세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 퇴직연금", url: "https://www.fss.or.kr" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
    ],
  },
];

const CHECKLIST_ITEMS = [
  "내 퇴직연금이 DC형 또는 IRP인지 확인했나요?",
  "안전자산 30% 이상 유지하고 있나요?",
  "ETF 운용보수를 비교했나요? (낮을수록 유리)",
  "순자산총액 1,000억원 이상인 ETF를 골랐나요?",
  "해외 직접 상장 ETF가 아닌 국내 상장 ETF인지 확인했나요?",
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · ETF · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 ETF, 뭘 사야 할까?<br />
        안전자산 30% 맞추는 포트폴리오
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금 계좌에 돈이 쌓이는데 예금이자만 받기 아까우시죠?
        DC형이나 IRP라면 ETF로 투자해서 수익을 낼 수 있어요.
        안전자산 30% 규정만 지키면 S&P500, 나스닥100 같은 인기 ETF도 살 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>퇴직연금 ETF 투자, 조건이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 규정에 따르면
        DC형과 IRP만 ETF 투자가 가능해요. DB형은 회사가 운용해서 개인이 고를 수 없어요.
      </p>

      <GreenBox title="핵심 규정">
        · <strong>위험자산 최대 70%</strong>: 주식형 ETF, 주식형 펀드, 리츠 등<br />
        · <strong>안전자산 최소 30%</strong>: 채권 ETF, TDF, 예금형 상품 등<br />
        · <strong>국내 상장 ETF만</strong> 매수 가능 (해외 직접 상장 불가)<br />
        · 채권혼합형 ETF(주식 50%까지)는 안전자산으로 분류돼요
      </GreenBox>

      <Divider />

      <H2>위험자산 ETF, 뭐가 좋을까요?</H2>
      <p style={body}>
        위험자산 70% 한도 내에서 투자할 수 있는 ETF예요.
        장기 투자라면 미국 대형주 지수 ETF가 검증된 선택이에요.
      </p>

      <SectionBadge>위험자산 ETF 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>ETF</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>추종 지수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["TIGER 미국S&P500", "S&P500", "미국 대형주 500개, 안정적 분산"],
              ["KODEX 미국나스닥100", "나스닥100", "기술주 중심, 높은 성장성"],
              ["ACE 미국S&P500", "S&P500", "수수료 저렴"],
              ["TIGER 미국배당다우존스", "Dow Jones Dividend", "분기 배당, 안정적 수익"],
              ["KODEX 200", "코스피200", "국내 대형주 분산"],
            ].map(([name, index, feature], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{name}</td>
                <td style={{ padding: "9px 12px" }}>{index}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{feature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>안전자산 30%, 뭘로 채우나요?</H2>
      <p style={body}>
        예금으로만 채우면 수익률이 아쉬워요.
        채권 ETF나 TDF로 채우면 안전자산으로 인정받으면서도 예금보다 높은 수익을 기대할 수 있어요.
        채권혼합형 ETF는 주식 비중을 50%까지 담을 수 있어서 실질적으로 주식 비중을 85%까지 높일 수 있어요.
      </p>

      <SectionBadge>안전자산 ETF 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>ETF</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>변동성</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KODEX 단기채권", "1년 이하 단기채권", "낮음"],
              ["TIGER 단기채권액티브", "단기채권 중심", "낮음"],
              ["KODEX 국고채3년", "3년 만기 국고채", "중간"],
              ["TIGER TDF2045", "타겟데이트펀드", "중간 (자동 리밸런싱)"],
              ["ACE 미국S&P500채권혼합", "채권혼합형", "중간 (주식 50% 포함)"],
            ].map(([name, type, vol], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{name}</td>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", color: vol === "낮음" ? "#1D9E75" : "#d97706" }}>{vol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArticleAd position="mid" />
      <Divider />

      <H2>포트폴리오 예시가 궁금해요</H2>
      <p style={body}>
        투자 성향에 따라 세 가지 포트폴리오를 참고해보세요.
        모두 안전자산 30% 규정을 충족하는 구성이에요.
      </p>

      <BorderBox>
        <strong>공격형 (위험자산 70%)</strong><br />
        · TIGER 미국S&P500: 40% | KODEX 미국나스닥100: 30%<br />
        · KODEX 단기채권: 20% | 예금: 10%<br /><br />
        <strong>균형형 (위험자산 50%)</strong><br />
        · TIGER 미국S&P500: 30% | KODEX 200: 20%<br />
        · 채권혼합 ETF: 30% | 예금: 20%<br /><br />
        <strong>안정형 (위험자산 30%)</strong><br />
        · ACE 미국S&P500: 20% | TIGER 미국배당다우존스: 10%<br />
        · TDF: 40% | 예금: 30%
      </BorderBox>

      <Divider />

      <H2>ETF 고를 때 체크포인트</H2>
      <p style={body}>
        같은 지수를 추종해도 ETF마다 운용보수, 순자산, 추적오차가 달라요.
        장기 투자일수록 이 차이가 커지니까 꼼꼼히 비교해보세요.
      </p>

      <SectionBadge>매수 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 투자 판단의 참고자료로 작성했어요. 특정 상품을 추천하거나 수익을 보장하지 않아요. 투자 결정은 본인 판단으로 하세요." />
    </div>
  );
}
