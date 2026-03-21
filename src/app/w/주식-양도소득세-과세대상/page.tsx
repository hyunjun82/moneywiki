"use client";
// Q1. 주식 투자 수익이 났는데 세금을 내야 하는지 모르는 일반 개인 투자자
// Q2. 내가 양도소득세 과세 대상인지 확인하고 신고 여부를 결정하는 행동
// Q3. 소액주주 상장주식 비과세 원칙, 대주주 기준(50억원), 장외거래·비상장주식 과세, 기본공제 250만원, 신고 기한
// Q4. 과세 대상 구분표 + GreenBox 요약 + 신고 흐름 + FAQ
// MAP-INTRO: 코스피·코스닥에서 주식을 사고판 일반 투자자는 대부분 세금을 안 내도 돼요
// MAP-TYPE: 비교표
// MAP-H2: 과세원칙 > 과세대상구분 > 세율과공제 > 신고방법 > FAQ
// MAP-COMP: GreenBox > 표 > BorderBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "서킷브레이커-발동-거래중단", title: "서킷브레이커 발동 조건과 거래중단", description: "주식 거래 중단 시 대응 방법이에요." },
  { slug: "원천징수-뜻-방법-신고", title: "원천징수 뜻과 신고 방법", description: "주식 배당소득에서도 원천징수가 발생해요." },
];

const TAX_TABLE = [
  { type: "소액주주 상장주식 (장내거래)", taxable: "비과세", note: "일반 개인 투자자 대부분이 해당" },
  { type: "대주주 상장주식 (장내·장외)", taxable: "과세", note: "시가총액 50억원 이상 보유자" },
  { type: "소액주주 상장주식 (장외거래)", taxable: "과세", note: "친구에게 직접 주식을 팔 때 등" },
  { type: "비상장주식 (누구든)", taxable: "과세", note: "코스피·코스닥 외 장외 거래" },
];

const RATE_TABLE = [
  { category: "대주주 상장주식 (3억 이하)", rate: "20%", note: "지방소득세 별도 (10% 가산)" },
  { category: "대주주 상장주식 (3억 초과)", rate: "25%", note: "지방소득세 별도 (10% 가산)" },
  { category: "일반 기업 비상장주식", rate: "22%", note: "지방소득세 포함" },
  { category: "중소기업 비상장주식", rate: "11%", note: "지방소득세 포함" },
];

const STEPS = [
  {
    title: "과세 대상 여부 확인",
    desc: "먼저 내가 대주주인지, 장외거래를 했는지 확인해요. 소액주주가 거래소에서 매매한 상장주식은 신고 불필요해요.",
  },
  {
    title: "양도차익 계산",
    desc: "양도가액 - 취득가액 - 필요경비 = 양도차익이에요. 여러 번 매매했다면 손익을 합산해요. 기본공제 250만원을 차감한 금액에 세율을 곱해요.",
  },
  {
    title: "예정신고 (반기 마감 후 2개월 이내)",
    desc: "상반기(1~6월) 매도 → 8월 말까지 신고. 하반기(7~12월) 매도 → 다음 해 2월 말까지 신고해요. 홈택스에서 전자신고 가능해요.",
    link: { label: "홈택스 양도소득세 신고", href: "https://www.hometax.go.kr" },
  },
  {
    title: "확정신고 (다음 해 5월)",
    desc: "예정신고와 별개로 다음 해 5월에 확정신고도 해야 해요. 두 번 신고하는 구조예요. 신고를 안 하거나 과소신고하면 가산세가 붙어요.",
  },
];

const FAQS = [
  {
    q: "일반 투자자도 주식 양도소득세를 내야 하나요?",
    a: "코스피·코스닥에서 거래소를 통해 매매한 소액주주는 비과세예요. 세금 신고도 필요 없어요. 대주주이거나 장외거래를 한 경우에만 과세 대상이에요.",
  },
  {
    q: "대주주 기준이 뭔가요?",
    a: "2024년 1월부터 보유 주식의 시가총액이 50억원 이상이면 대주주예요. 기존 10억원에서 50억원으로 기준이 높아졌어요.",
  },
  {
    q: "기본공제 250만원은 어떻게 적용되나요?",
    a: "연간 주식 양도차익에서 250만원을 먼저 빼요. 1년 동안 500만원 차익이 났다면 250만원을 뺀 250만원에만 세금을 내요.",
  },
  {
    q: "주식에서 손해를 봤는데 세금은?",
    a: "같은 해에 수익이 난 종목과 손실이 난 종목을 합산해요. 전체 합산 결과가 0이거나 손실이면 세금이 없어요.",
  },
  {
    q: "ETF도 양도소득세를 내나요?",
    a: "국내 주식형 ETF는 주식과 동일하게 소액주주 비과세예요. 해외 ETF나 채권형 ETF는 과세 구조가 달라요.",
  },
  {
    q: "신고 안 하면 어떻게 되나요?",
    a: "가산세가 붙어요. 신고불성실 가산세 20%, 납부불성실 가산세가 추가로 부과돼요. 과세 대상이라면 기한 내에 꼭 신고하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 양도소득세 개요", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707" },
      { label: "찾기쉬운 생활법령정보: 주식투자자", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1701" },
      { label: "홈택스: 양도소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주식 · 세금 · 양도소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주식 양도소득세 과세 대상<br />
        내가 해당하는지 한 번에 확인하기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        코스피·코스닥에서 주식을 사고판 일반 투자자는 대부분 세금을 안 내도 돼요.
        우리나라는 소액주주가 거래소에서 매매하는 상장주식의 양도차익을 비과세로 처리해요.
        다만 <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1701" style={{ color: "#1D9E75", textDecoration: "underline" }}>대주주(시가총액 50억원 이상)</a>거나
        장외거래·비상장주식을 거래했다면 과세 대상이에요.
        <a href="/w/증권거래세" style={{ color: "#1D9E75", textDecoration: "underline" }}> 증권거래세</a>는 별도로 매도할 때마다 내는 세금이에요.
      </p>

      <Divider />

      <H2>주식 양도소득세, 내가 해당하나요?</H2>
      <p style={body}>
        과세 여부는 거래 방법과 보유 비율로 나뉘어요. 거래소를 통한 상장주식 매매인지,
        대주주인지, 장외거래인지 세 가지를 확인하면 돼요.
      </p>
      <p style={body}>
        국내 거래소(코스피·코스닥)에서 사고판 상장주식 차익은 소액주주에게 비과세예요.
        대주주(시가총액 50억원 이상 보유)가 되면 장내 거래라도 과세 대상이에요.
        2024년부터 대주주 기준이 기존 10억원에서 50억원으로 높아졌어요.
      </p>

      <SectionBadge>거래 유형별 과세 여부</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>거래 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세 여부</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {TAX_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.type}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 700, color: row.taxable === "비과세" ? "#1D9E75" : "#ef4444" }}>{row.taxable}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        소액주주 + 거래소 장내 매매 = 비과세 (신고 불필요)<br />
        대주주(50억 이상) 또는 장외거래 = 과세<br />
        비상장주식 = 누가 팔든 과세
      </GreenBox>

      <Divider />

      <H2>과세 대상이라면 세율은 얼마예요?</H2>
      <p style={body}>
        기본공제 250만원을 차감한 뒤 세율을 곱해요. 연간 주식 양도차익이 500만원이라면
        250만원을 뺀 250만원에만 세금을 내요. 손실이 난 종목과 수익 종목은 합산해서 계산해요.
      </p>
      <p style={body}>
        세율은 대주주 상장주식 기준 과세표준 3억원 이하 20%, 3억원 초과 25%예요.
        비상장주식은 일반 기업 22%, 중소기업 11%예요. 여기에 지방소득세가 별도로 붙어요.
      </p>

      <SectionBadge>세율 요약표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세 대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {RATE_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.category}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        기본공제 250만원은 연 1회 적용돼요. 여러 종목에서 수익이 났어도 합산 후 한 번만 빼요.
        국세청 홈택스에서 신고하면 자동으로 계산돼요.
      </BorderBox>

      <Divider />

      <H2>신고는 어떻게 하나요?</H2>
      <p style={body}>
        과세 대상이라면 예정신고와 확정신고 두 번을 해야 해요.
        예정신고는 주식을 판 반기 마감 후 2개월 이내, 확정신고는 다음 해 5월이에요.
        홈택스에서 전자신고가 가능하니 세무서 방문 없이 집에서 처리할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주식 양도소득세에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법 및 국세청 자료를 바탕으로 작성됐어요. 세율과 대주주 기준은 변경될 수 있으니 최신 내용은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
