"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. ISA 계좌를 만들려는데 증권사·은행 중 어디가 좋은지 비교하고 싶은 투자 초보~중급자예요.
// Q2. 본인 투자 스타일에 맞는 ISA 유형(중개형/신탁형)과 증권사를 선택하는 행동.
// Q3. 중개형 vs 신탁형 차이, 증권사별 수수료 비교, 추천 순위, 선택 기준.
// Q4. DiagnoseCard 대신 GreenBox(결론) + CompareTable(비교) + Steps(개설 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS_OPEN = [
  {
    title: "ISA 유형 선택",
    desc: "주식·ETF 직접 매매하고 싶으면 중개형, 은행에 맡기고 싶으면 신탁형, 소득이 적으면 서민형을 선택해요.",
  },
  {
    title: "증권사 또는 은행 앱 설치",
    desc: "선택한 금융기관의 앱을 설치해요. 비대면 개설이 대부분 가능해요. 기존에 계좌가 있는 곳이면 더 빨라요.",
  },
  {
    title: "ISA 계좌 개설 신청",
    desc: "앱에서 ISA 계좌 개설 메뉴를 찾아서 본인 인증 후 신청하면 돼요. 1인 1계좌만 가능하니까 기존 ISA가 없는지 확인하세요.",
    tip: "기존 ISA가 있으면 해지 후 다시 가입해야 해요",
  },
  {
    title: "연간 납입 한도 내 투자 시작",
    desc: "연간 4,000만원(총 2억원)까지 납입 가능해요. 만기는 3년 이상이고, 서민형은 비과세 한도가 400만원으로 더 커요.",
  },
];

const FAQS = [
  {
    q: "ISA 계좌 어디서 개설하는 게 제일 좋아요?",
    a: "주식·ETF 직접 매매하면 미래에셋증권, 삼성증권이 수수료가 제일 저렴해요. 은행에 맡기고 싶으면 KB국민은행이 운용 실적이 좋은 편이에요.",
  },
  {
    q: "ISA 수수료 제일 저렴한 곳은 어디예요?",
    a: "2026년 기준 미래에셋증권이 0.0036%로 업계 최저 수수료를 제공하고 있어요. 삼성증권(0.0042%), 한국투자증권, 신한투자증권도 비슷한 수준이에요.",
  },
  {
    q: "중개형과 신탁형, 뭐가 다른가요?",
    a: "중개형은 주식·ETF를 직접 사고팔 수 있고, 신탁형은 금융기관이 대신 운용해줘요. 직접 투자 경험이 있으면 중개형, 없으면 신탁형이 맞아요.",
  },
  {
    q: "ISA 계좌 비과세 한도는 얼마예요?",
    a: "일반형은 순이익 200만원, 서민형·농어민형은 400만원까지 비과세예요. 초과분은 9.9% 분리과세(일반 금융소득세 15.4%보다 낮음)라서 절세 효과가 커요.",
  },
  {
    q: "3년 안에 해지하면 어떻게 되나요?",
    a: "의무 가입기간 3년을 안 채우면 비과세·분리과세 혜택을 못 받아요. 그동안 세금 혜택 받은 부분을 추징당해요. 급전이 필요하면 부분 인출을 활용하세요.",
  },
  {
    q: "1인 1계좌만 가능한가요?",
    a: "네. ISA는 1인 1계좌예요. 다른 증권사로 옮기고 싶으면 기존 ISA를 이전하거나 해지 후 재가입해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — ISA 안내", url: "https://www.fss.or.kr" },
      { label: "한국거래소 — ISA 상품 정보", url: "https://www.krx.co.kr" },
      { label: "미래에셋증권 — 중개형 ISA", url: "https://digital.securities.miraeasset.com/ISA/" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-기본", title: "ISA 계좌 기본", description: "ISA의 개념과 절세 구조를 정리했어요." },
  { slug: "ISA계좌-중개형-서민형-차이", title: "ISA 중개형 vs 서민형", description: "유형별 비과세 한도와 조건이에요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제", description: "ISA와 함께 활용하면 절세 효과가 커요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 절세 · ISA</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌, 어디서 만들어야 할까?<br />
        증권사 수수료 비교와 추천
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 계좌 만들려는데 증권사가 너무 많아서 헷갈리죠. 결론부터 말하면, 주식·ETF 직접 매매한다면{" "}
        <strong>미래에셋증권·삼성증권</strong>이 수수료가 가장 저렴하고, 은행에 맡기고 싶다면 <strong>KB국민은행</strong>이 좋아요.
      </p>

      <Divider />

      <H2>추천 순위와 수수료 비교</H2>
      <p style={body}>
        ISA 수수료는 매년 계좌 잔고에서 빠지는 운용보수예요. 0.1% 차이도 장기적으로 보면 수십만원 차이가 나요.
      </p>

      <SectionBadge>2026년 중개형 ISA 수수료 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>증권사</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>매매수수료</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>우대 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["미래에셋증권", "0.0036%", "평생", "ETF도 동일 우대"],
              ["삼성증권", "0.0042%", "평생", "ISA 전용 이벤트"],
              ["한국투자증권", "0.004%대", "평생", "앱 UI 편리"],
              ["NH투자증권", "0.0049%", "12개월", "나무증권 앱"],
              ["신한투자증권", "0.004%대", "이벤트 기간", "MTS 편의성 좋음"],
            ].map(([name, fee, period, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{name}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{fee}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontSize: 13 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="유형별 추천 정리">
        <strong>주식·ETF 직접 매매</strong> → 미래에셋증권 또는 삼성증권 (수수료 최저)<br />
        <strong>은행에 맡기고 싶다면</strong> → KB국민은행 신탁형 (안정적 운용)<br />
        <strong>투자 경험 없는 초보</strong> → 앱 UI가 편한 한국투자증권 또는 토스증권
      </GreenBox>

      <Divider />

      <H2>중개형 vs 신탁형, 뭘 골라야 하죠?</H2>
      <p style={body}>
        ISA 유형 선택이 증권사 선택보다 먼저예요. 투자 스타일에 따라 결정하세요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>중개형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>신탁형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["투자 방식", "본인이 직접 매매", "금융기관이 대신 운용"],
              ["투자 가능 상품", "주식·ETF·펀드·예금", "펀드·예금·ELS"],
              ["수수료", "매매수수료만", "운용보수 + 성과보수"],
              ["추천 대상", "직접 투자 경험 있는 분", "투자 경험 없는 분"],
              ["개설 가능 기관", "증권사만", "증권사 + 은행"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>ISA 계좌 개설 절차</H2>
      <p style={body}>
        비대면으로 10분이면 끝나요. 1인 1계좌라서 기존 ISA가 있으면 먼저 정리하세요.
      </p>

      <Steps steps={STEPS_OPEN} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 각 증권사 공시 자료를 기반으로 작성됐어요. 수수료 우대 조건은 이벤트에 따라 변동될 수 있으니 가입 전 해당 증권사에서 확인하세요." />
    </ArticleLayout>
  );
}
