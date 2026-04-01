"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 주식 수익이 났는데 세금을 내야 하는지 모르는 일반 투자자
// Q2. 내가 양도소득세 과세 대상인지 확인하고, 과세라면 신고 절차를 밟는 것
// Q3. 소액주주 비과세 원칙, 대주주 기준(종목당 50억원), 장외·비상장 과세, 세율(22~27.5%), 기본공제 250만원, 증권거래세 0.20%, 신고 기한
// Q4. 과세 구분표 + EligibilityChecker + 세율 BorderBox + 신고 Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const TAX_TABLE = [
  { type: "소액주주 상장주식 (장내거래)", taxable: "비과세", note: "일반 개인 투자자 대부분 해당" },
  { type: "대주주 상장주식 (장내·장외)", taxable: "과세", note: "종목당 시가총액 50억원 이상" },
  { type: "소액주주 상장주식 (장외거래)", taxable: "과세", note: "거래소 밖에서 직접 매매한 경우" },
  { type: "비상장주식 (누구든)", taxable: "과세", note: "코스피·코스닥 외 주식" },
  { type: "해외 주식", taxable: "과세", note: "연 250만원 초과 수익 시 22%" },
];

const RATE_TABLE = [
  { target: "대주주 상장주식 (3억 이하)", rate: "20%", total: "22% (지방세 포함)" },
  { target: "대주주 상장주식 (3억 초과)", rate: "25%", total: "27.5% (지방세 포함)" },
  { target: "중소기업 비상장주식", rate: "10%", total: "11% (지방세 포함)" },
  { target: "일반 기업 비상장주식", rate: "20%", total: "22% (지방세 포함)" },
  { target: "해외 주식", rate: "20%", total: "22% (지방세 포함)" },
];

const ELIGIBILITY_ITEMS = [
  { id: "listed", label: "코스피·코스닥 상장주식을 거래소에서 매매했다" },
  { id: "small", label: "해당 종목의 보유 시가총액이 50억원 미만이다" },
  { id: "otc", label: "거래소를 통해 매매했다 (장외거래가 아니다)" },
  { id: "domestic", label: "국내 주식만 거래했다 (해외 주식 없음)" },
];

const STEPS_DATA = [
  { title: "과세 대상인지 확인", desc: "대주주(종목당 50억원 이상)이거나, 장외거래를 했거나, 비상장주식을 팔았는지 확인해요. 소액주주가 거래소에서 매매한 상장주식은 신고할 필요가 없어요." },
  { title: "양도차익 계산", desc: "양도가액 - 취득가액 - 필요경비 = 양도차익이에요. 같은 해에 수익 종목과 손실 종목을 합산해요. 기본공제 250만원을 차감한 금액이 과세표준이에요." },
  { title: "예정신고 (반기 마감 후 2개월 이내)", desc: "상반기(1~6월) 매도분은 8월 말까지, 하반기(7~12월) 매도분은 다음 해 2월 말까지 신고해요.", tip: "홈택스에서 전자신고 가능" },
  { title: "확정신고 (다음 해 5월)", desc: "예정신고와 별도로 다음 해 5월에 확정신고도 해야 해요. 두 번 신고하는 구조예요. 안 하면 가산세가 붙어요.", link: { label: "홈택스 양도소득세 신고", href: "https://www.hometax.go.kr" } },
];

const FAQS = [
  { q: "소액주주인데 세금 신고 안 해도 되나요?", a: "코스피·코스닥에서 거래소를 통해 매매한 소액주주(종목당 50억원 미만)는 양도소득세 비과세예요. 신고할 필요 없어요. 증권거래세는 매도할 때 증권사가 자동으로 원천징수해요." },
  { q: "대주주 기준이 50억원으로 바뀌었다면서요?", a: "2024년 1월부터 대주주 기준이 종목당 시가총액 10억원에서 50억원으로 상향됐어요. 2026년에도 동일하게 적용돼요. 기획재정부에서 현행 유지를 확인했어요." },
  { q: "ETF도 양도소득세를 내나요?", a: "국내 주식형 ETF는 소액주주 비과세예요. 해외 ETF, 채권형 ETF, 파생형 ETF는 과세 구조가 달라요. 해외 주식형 ETF는 양도차익에 22% 세율이 적용돼요." },
  { q: "기본공제 250만원은 어떻게 적용돼요?", a: "연간 양도차익 합계에서 250만원을 한 번 빼요. 수익 500만원이면 250만원을 뺀 250만원에만 세금을 내요. 여러 종목 수익·손실을 전부 합산한 뒤에 적용해요." },
  { q: "주식에서 손해 봤는데 세금이 나와요?", a: "같은 해에 수익 종목과 손실 종목을 합산해요. 합산 결과가 0이거나 손실이면 세금이 없어요. 대주주라도 손실이 나면 안 내요." },
  { q: "증권거래세는 따로 내야 하나요?", a: "증권거래세는 주식을 매도할 때 증권사가 자동으로 떼가요. 따로 신고할 필요 없어요. 2026년 기준 코스피·코스닥 증권거래세율은 0.20%예요." },
  { q: "신고 안 하면 어떻게 되나요?", a: "과세 대상인데 신고를 안 하면 무신고 가산세 20%가 붙어요. 납부 지연 가산세도 추가돼요. 국세청이 증권사 데이터를 전수 조사하니까 걸릴 확률이 높아요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 주식등 양도소득세", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12274&cntntsId=8800" },
      { label: "찾기쉬운 생활법령정보: 주식투자자", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1701" },
      { label: "기획재정부: 대주주 양도세 기준 현행 유지", url: "https://moef.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000075285&menuNo=4010100" },
      { label: "홈택스: 양도소득세 전자신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "양도소득세-계산-세율-비과세", title: "양도소득세 계산과 세율", description: "부동산·주식 양도소득세 세율과 비과세 요건을 정리했어요." },
  { slug: "원천징수-뜻-방법-신고", title: "원천징수 뜻과 신고 방법", description: "배당소득에서 원천징수가 어떻게 작동하는지 정리했어요." },
  { slug: "해외주식-세금", title: "해외주식 세금", description: "해외 주식 양도소득세 신고 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주식 · 세금 · 양도소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주식 양도소득세 과세 대상,<br />
        내가 세금을 내야 하는지 확인하기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주식으로 수익이 났는데 세금을 내야 하는 건지 궁금하죠?
        결론부터 말하면 코스피·코스닥에서 거래소를 통해 매매한 일반 투자자(소액주주)는 <strong>비과세</strong>예요.
        세금을 신고할 필요도 없어요.
        다만{" "}
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12274&cntntsId=8800" style={{ color: "#1D9E75", textDecoration: "underline" }}>대주주(종목당 50억원 이상)</a>이거나,
        장외거래·비상장주식을 거래했다면 과세 대상이에요.
      </p>

      <Divider />

      <H2>나는 과세 대상이에요, 비과세예요?</H2>
      <p style={body}>
        아래 항목을 모두 체크할 수 있으면 양도소득세 비과세예요. 신고도 불필요하고요.
        하나라도 해당이 안 되면 과세 대상일 수 있어요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="전부 해당되면 양도소득세 비과세예요. 신고할 필요 없어요."
        partialMatchText="하나라도 해당 안 되면 과세 대상일 수 있어요. 아래 구분표를 확인하세요."
      />

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

      <Divider />

      <H2>과세 대상이라면 세율은 얼마예요?</H2>
      <p style={body}>
        기본공제 250만원을 차감한 뒤 세율을 곱해요.
        1년간 주식 양도차익이 500만원이면, 250만원 빼고 남은 250만원에만 세금을 내요.
        수익 종목과 손실 종목을 합산하니까, 합산 결과가 손실이면 세금이 없어요.
      </p>

      <SectionBadge>2026년 주식 양도소득세 세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세 대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기본 세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지방세 포함</th>
            </tr>
          </thead>
          <tbody>
            {RATE_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.target}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        기본공제 250만원은 연 1회, 모든 종목 합산 후 적용돼요.{"\n"}
        증권거래세(매도 시 0.20%)는 양도소득세와 별개로 증권사가 자동 원천징수해요.
      </BorderBox>

      <Divider />

      <H2>신고는 어떻게, 언제 하나요?</H2>
      <p style={body}>
        과세 대상이라면 예정신고와 확정신고 두 번을 해야 해요.
        홈택스에서 전자신고할 수 있어서 세무서 방문 없이 집에서 처리 가능해요.
        신고 안 하면 가산세가 붙으니까 기한을 꼭 지키세요.
      </p>

      <Steps steps={STEPS_DATA} />

      <GreenBox title="2026년 기억할 포인트">
        금융투자소득세(금투세) 도입이 무산됐어요. 소액주주 상장주식 비과세가 유지돼요.{"\n"}
        대주주 기준 종목당 50억원 현행 유지 (기획재정부 확인){"\n"}
        증권거래세 0.20%로 인상 (기존 0.15%에서)
      </GreenBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주식 양도소득세에서 실제로 가장 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 및 국세청·기획재정부 자료를 바탕으로 작성됐어요. 세율과 대주주 기준은 변경될 수 있으니 최신 내용은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
