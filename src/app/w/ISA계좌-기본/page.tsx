"use client";

// Q1. ISA 계좌를 처음 들어봤거나 세금 아끼려고 어떤 계좌를 만들어야 할지 고민하는 직장인
// Q2. 서민형/일반형 중 내 조건 확인 → 중개형/신탁형 선택 → 증권사 앱에서 개설 → 자동이체 설정
// Q3. 운용방식(중개형·신탁형·일임형) / 소득기준(서민형 5천만원 이하 400만원·일반형 200만원) / 3년 유지 / 연 2,000만원 한도 / 해외주식 직접 불가
// Q4. GreenBox(유형 비교표) + GreenBox(세금 절감 시뮬레이션) + BorderBox(개설 방법 + 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "연 5,000만원 이하 소득자라면 서민형으로 신청해야 200만원 더 유리해요",
  "주식·ETF를 직접 거래하고 싶으면 중개형, 은행에 맡기고 싶으면 신탁형이에요",
  "서민형은 홈택스에서 소득증명원을 미리 발급해두세요",
  "1인 1계좌 규정이라 개설 기관을 신중하게 선택해요",
  "ISA 만기 후 60일 이내에 연금저축으로 이전하면 최대 300만원 세액공제 추가예요",
];

const FAQS = [
  {
    q: "중개형과 신탁형 뭐가 더 좋아요?",
    a: "주식·ETF를 직접 거래하고 싶으면 중개형, 은행에 맡기고 싶으면 신탁형이에요. 중개형이 수익률을 높일 여지가 있지만 직접 운용해야 해요. 주식 경험이 없으면 신탁형으로 시작하는 게 편해요.",
  },
  {
    q: "서민형과 일반형 차이가 뭐예요?",
    a: "비과세 한도가 달라요. 서민형은 400만원, 일반형은 200만원까지 비과세예요. 근로·사업소득이 연 5,000만원 이하(농어민은 3,800만원 이하)라면 서민형이 200만원 더 유리해요. 서민형은 소득증명원 제출이 필요해요.",
  },
  {
    q: "3년 이전에 해지하면 어떻게 되나요?",
    a: "세금 혜택을 받을 수 없어요. 운용 수익에 15.4% 세금이 그대로 붙어요. 급하게 필요하면 원금은 중도 인출이 가능하고, 그 범위에서는 불이익이 없어요. 수익(이자·배당 포함)은 만기까지 유지해야 비과세예요.",
  },
  {
    q: "ISA 계좌에서 해외주식 직접 살 수 있나요?",
    a: "해외주식 직접 매매는 안 돼요. 대신 국내 거래소에 상장된 해외 ETF(TIGER 미국S&P500, KODEX 나스닥100 등)는 살 수 있어요. 미국·중국·일본 시장을 따라가는 ETF를 활용하면 돼요.",
  },
  {
    q: "1인 1계좌 규정이라고 하는데, 바꾸고 싶으면 어떻게 하나요?",
    a: "기존 ISA 계좌를 해지하고 새로 개설해야 해요. 단, 해지하면 3년 유지 혜택이 초기화되니 만기가 됐거나 혜택이 없는 상태에서 이전하는 게 좋아요.",
  },
  {
    q: "연금저축계좌로 이전하면 추가 혜택이 있나요?",
    a: "네, ISA 만기 후 60일 이내에 연금저축으로 이전하면 이전 금액의 10%(최대 300만원)를 세액공제로 추가로 받을 수 있어요. ISA 절세 효과를 극대화하는 방법이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: ISA 계좌 정책", url: "https://www.fsc.go.kr" },
      { label: "금융감독원: ISA 계좌 비교", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-중개형-서민형-차이", title: "ISA 계좌 중개형 서민형 일반형 차이", description: "유형별 세부 차이를 비교했어요." },
  { slug: "ISA계좌-ETF-추천", title: "ISA 계좌 ETF 추천", description: "ISA에 넣으면 비과세로 수익 나는 ETF들이에요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원", description: "ISA 만기금을 연금저축으로 이전하면 추가 공제 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA 계좌 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 중개형·서민형·일반형 차이<br />
        비과세 400만원 받는 절세 통장
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배당과 이자에 15.4% 세금이 붙는 거 알고 계셨나요?
        ISA 계좌를 쓰면 <strong>서민형 기준 400만원까지 세금이 0원</strong>이에요.
        초과분도 9.9%만 내면 돼요.
        연 5,000만원 이하 소득자라면 서민형으로 신청해야 일반형보다 200만원 더 유리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 계좌 유형, 어떻게 구분되나요?</H2>

      <p style={body}>
        ISA는 2가지 기준으로 나뉘어요.
        내가 직접 운용할지 맡길지(운용 방식)와 내 소득이 얼마인지(소득 기준)예요.
        두 기준을 조합해서 선택하면 돼요.
        대부분 <strong>중개형 + 서민형</strong>을 선택해요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14 }}>운용 방식 3가지</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>운용 주체</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>투자 가능</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>수수료</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "중개형", manager: "본인 직접", invest: "주식, ETF, 펀드", fee: "낮음 (0.1~0.3%)" },
              { type: "신탁형", manager: "은행 신탁", invest: "펀드, 예금", fee: "중간 (0.3~0.5%)" },
              { type: "일임형", manager: "증권사 일임", invest: "전문가 추천", fee: "높음 (0.5~1.0%)" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.manager}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.invest}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14 }}>소득 기준 (비과세 한도)</p>
        <p style={{ margin: "0 0 4px", fontSize: 13 }}>서민형 (근로·사업소득 연 5,000만원 이하): <strong>400만원</strong> 비과세</p>
        <p style={{ margin: "0 0 4px", fontSize: 13 }}>일반형 (소득 무관): <strong>200만원</strong> 비과세</p>
        <p style={{ margin: "0 0 8px", fontSize: 13 }}>농어민형 (농어민, 연 3,800만원 이하): <strong>400만원</strong> 비과세</p>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          ★ 가장 많이 쓰는 조합: 중개형 + 서민형 (주식 직접 거래 + 400만원 비과세)
        </p>
      </GreenBox>

      <Divider />

      <H2>실제로 세금을 얼마나 아낄 수 있나요?</H2>

      <p style={body}>
        배당·이자 수익이 500만원 났다고 가정해봐요.
        일반 계좌라면 15.4% 세금으로 77만원이 빠져나가요.
        ISA 서민형이라면 400만원까지 비과세, 나머지 100만원에 9.9%만 내면 9.9만원이에요.
        일반 계좌 대비 <strong>67만원 이상 더 받는 거예요</strong>.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>계좌 유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>비과세</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>세금</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>실수령 (500만원 수익)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "일반 계좌", tax_free: "없음", tax: "77만원 (15.4%)", received: "423만원" },
              { type: "ISA 일반형", tax_free: "200만원", tax: "29.7만원 (9.9%)", received: "470.3만원" },
              { type: "ISA 서민형", tax_free: "400만원", tax: "9.9만원 (9.9%)", received: "490.1만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 2 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 2 ? 700 : 400 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.tax_free}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#E53E3E" }}>{row.tax}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: i === 2 ? 700 : 400 }}>{row.received}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 서민형이 일반 계좌보다 약 67만원 더 받아요 / 비과세 초과분도 9.9% (일반 15.4%보다 낮음)
        </p>
      </GreenBox>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>ISA 계좌 개설 방법과 주의사항</H2>

      <p style={body}>
        은행·증권사 앱에서 5~10분이면 개설할 수 있어요.
        서민형은 소득증명원을 미리 홈택스에서 발급해두면 바로 신청 가능해요.
        1인 1계좌라서 어디서 만들지 신중하게 선택하세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>개설 절차</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>① 은행·증권사 앱 설치 (카카오페이증권, 토스증권, NH투자증권, KB국민은행 등)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>② ISA 계좌 메뉴 선택 → 유형 선택 (중개형/신탁형, 일반형/서민형)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>③ 본인인증 (신분증 촬영)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>④ 서민형이면 소득증명원 제출 (홈택스에서 3분 발급)</p>
        <p style={{ margin: "0 0 12px", lineHeight: 1.9 }}>⑤ 계좌 개설 완료 → 자동이체 설정</p>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>꼭 알아야 할 제한사항</p>
        <p style={{ margin: "0 0 4px", fontSize: 13, lineHeight: 1.9 }}>1인 1계좌: 은행·증권사 통틀어 1개만 개설 가능</p>
        <p style={{ margin: "0 0 4px", fontSize: 13, lineHeight: 1.9 }}>3년 의무유지: 중도 해지 시 세금 혜택 없음</p>
        <p style={{ margin: "0 0 4px", fontSize: 13, lineHeight: 1.9 }}>연 2,000만원 한도: 미사용 한도 다음 해로 이월 안됨</p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9 }}>해외주식 직접 매매 불가: 국내 상장 해외 ETF는 가능</p>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 금융위원회 기준으로 작성됐어요. ISA 서민형 소득 조건은 직전 과세기간 소득 기준으로, 개설 시 은행·증권사에서 확인해요." />
    </ArticleLayout>
  );
}
