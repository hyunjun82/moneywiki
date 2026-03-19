"use client";

// Q1. ISA 계좌 처음 들어봤거나 뭔지 모르는 사람이 가입 여부 판단하는 상황
// Q2. 유형(중개형+서민형) 선택 → 증권사 앱에서 5분 개설 → 자동이체 설정
// Q3. 운용방식(중개형/신탁형) + 소득기준(서민형400만원/일반형200만원) / 3년 유지 / 연2,000만원 한도 / 해외주식 직접 불가
// Q4. GreenBox(유형 비교표) + GreenBox(세금 절감 시뮬) + BorderBox(개설 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "ISA 계좌 중개형과 신탁형 뭐가 더 좋아요?",
    a: "주식·ETF를 직접 거래하고 싶으면 중개형, 은행에 맡기고 싶으면 신탁형이에요. 중개형이 수익률을 높일 여지가 있지만 직접 운용해야 해요. 주식 경험이 없으면 신탁형으로 시작하는 게 편해요.",
  },
  {
    q: "서민형과 일반형 차이는 뭐예요?",
    a: "비과세 한도가 달라요. 서민형은 400만원, 일반형은 200만원까지 비과세예요. 근로·사업소득이 연 5,000만원 이하(농어민은 3,800만원 이하)라면 서민형이 유리해요. 서민형은 소득증명원 제출이 필요해요.",
  },
  {
    q: "3년 이전에 해지하면 어떻게 되나요?",
    a: "세금 혜택을 받을 수 없어요. 운용 수익에 15.4% 세금이 그대로 부과돼요. 급하게 필요하면 원금은 중도 인출 가능하고, 그 범위에서는 불이익이 없어요. 수익(이자·배당 포함 수익)은 만기까지 유지해야 비과세예요.",
  },
  {
    q: "ISA 계좌에서 해외주식 직접 살 수 있나요?",
    a: "해외주식 직접 매매는 안 돼요. 대신 국내 증권거래소에 상장된 해외 ETF(TIGER 미국S&P500, KODEX 나스닥100 등)는 살 수 있어요. 미국·중국·일본 시장을 따라가는 ETF를 활용하면 돼요.",
  },
  {
    q: "ISA 계좌 만기 후 연금으로 전환하면 뭐가 좋아요?",
    a: "ISA 만기금을 연금저축계좌나 IRP로 이전하면 이전 금액의 10%(최대 300만원)를 추가 세액공제받아요. ISA 비과세 혜택 + 연금 세액공제까지 이중 절세가 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: ISA 제도 안내", url: "https://www.fsc.go.kr" },
      { label: "금융감독원: ISA 계좌 비교", url: "https://www.fss.or.kr" },
      { label: "조세특례제한법 제91조의18 (ISA)", url: "https://www.law.go.kr/법령/조세특례제한법" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-납입한도", title: "ISA 계좌 납입 한도 연간 2,000만원", description: "연간·누적 한도와 이월 불가 규칙이에요." },
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
        ISA(개인종합자산관리계좌)는 배당과 이자에 붙는 세금을 줄여주는 절세 통장이에요.
        서민형은 400만원까지 비과세, 일반형은 200만원까지 비과세예요.
        소득이 연 5,000만원 이하라면 서민형으로 신청해야 200만원 더 유리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 계좌 유형 한눈에 비교</H2>
      <p style={body}>
        운용 방식과 소득 기준 2가지로 나뉘어요.
        내가 직접 운용할지(중개형 vs 신탁형), 내 소득이 얼마인지(서민형 vs 일반형)로 선택하면 돼요.
      </p>

      <GreenBox>
        <strong>운용 방식 (중개형 vs 신탁형)</strong><br />
        <br />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
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
              { type: "일임형", manager: "증권사 일임", invest: "전문가 추천 포트폴리오", fee: "높음 (0.5~1.0%)" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 0 ? 700 : 400 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.manager}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.invest}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 4 }}>
          <strong>소득 기준 (비과세 한도)</strong>
        </p>
        서민형 (근로·사업소득 연 5,000만원 이하): 400만원 비과세<br />
        일반형 (소득 무관): 200만원 비과세<br />
        농어민형 (농어민, 연 3,800만원 이하): 400만원 비과세<br />
        <br />
        ★ 가장 많이 쓰는 조합: 중개형 + 서민형 (주식 직접 + 400만원 비과세)
      </GreenBox>

      <H2>ISA vs 일반 계좌 세금 절감 비교</H2>
      <p style={body}>
        배당·이자 수익이 많을수록 ISA 절세 효과가 커요.
        500만원 수익 기준으로 비교해봐요.
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
          ※ 서민형이 일반 계좌보다 약 67만원 더 받아요<br />
          ※ 비과세 초과분은 9.9% (일반 계좌 15.4%보다 5.5%p 낮음)
        </p>
      </GreenBox>

      <H2>ISA 계좌 개설 방법</H2>
      <p style={body}>
        은행·증권사 앱에서 5~10분이면 개설할 수 있어요.
        서민형은 소득증명원을 미리 홈택스에서 발급해두면 바로 신청 가능해요.
      </p>

      <BorderBox>
        <strong>개설 절차</strong><br />
        ① 은행·증권사 앱 설치 (카카오페이증권, 토스증권, NH투자증권, KB국민은행 등)<br />
        ② ISA 계좌 메뉴 선택 → 유형 선택 (중개형/신탁형, 일반형/서민형)<br />
        ③ 본인인증 (신분증 촬영)<br />
        ④ 서민형이면 소득증명원 제출 (홈택스에서 3분 발급)<br />
        ⑤ 계좌 개설 완료 → 자동이체 설정<br />
        <br />
        <strong>주의사항</strong><br />
        1인 1계좌: 은행·증권사 통틀어 1개만 개설 가능<br />
        3년 의무유지: 중도 해지 시 세금 혜택 없음<br />
        연 2,000만원 한도: 미사용 한도 다음 해로 이월 안됨<br />
        해외주식 직접 매매 불가: 해외 ETF(국내 상장)는 가능<br />
        <br />
        ★ 개설 후 바로 자동이체 설정 → 매월 50~166만원 납입이 효과적
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 금융위원회 기준으로 작성됐어요. ISA 서민형 소득 조건은 직전 과세기간 소득 기준으로 개설 시 은행·증권사에서 확인해요." />
    </ArticleLayout>
  );
}
