"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     집을 사거나 전세 계약을 앞두고 복비가 얼마나 나올지 계산해보려는 사람
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     거래 금액과 유형에 따른 복비를 직접 계산하고, 계약 전에 중개사와 협의한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     매매·전세·월세 요율표, 월세 환산 방법, 부가세 별도 여부, 협의 가능 여부
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     매매 요율표 → 전세·월세 요율표 → 계산 예시 GreenBox → 주의사항 → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SELL_RATES = [
  { range: "5천만원 미만", rate: "0.6%", cap: "25만원", example: "4천만원 → 24만원" },
  { range: "5천만~2억 미만", rate: "0.5%", cap: "80만원", example: "1.5억 → 75만원" },
  { range: "2억~9억 미만", rate: "0.4%", cap: "없음", example: "5억 → 200만원" },
  { range: "9억~12억 미만", rate: "0.5%", cap: "없음", example: "10억 → 500만원" },
  { range: "12억~15억 미만", rate: "0.6%", cap: "없음", example: "13억 → 780만원" },
  { range: "15억 이상", rate: "0.7%", cap: "없음", example: "20억 → 1,400만원" },
];

const RENT_RATES = [
  { range: "5천만원 미만", rate: "0.5%", cap: "20만원", example: "4천만원 → 20만원" },
  { range: "5천만~1억 미만", rate: "0.4%", cap: "30만원", example: "8천만원 → 30만원" },
  { range: "1억~6억 미만", rate: "0.3%", cap: "없음", example: "3억 → 90만원" },
  { range: "6억~12억 미만", rate: "0.4%", cap: "없음", example: "8억 → 320만원" },
  { range: "12억~15억 미만", rate: "0.5%", cap: "없음", example: "13억 → 650만원" },
  { range: "15억 이상", rate: "0.6%", cap: "없음", example: "20억 → 1,200만원" },
];

const CHECKLIST = [
  "복비는 매도인·매수인 각각, 임대인·임차인 각각 따로 내요",
  "상한요율 이내에서 협의 가능,계약 전에 먼저 협의하세요",
  "월세는 환산보증금 = 보증금 + (월세 × 100)으로 계산해요",
  "일반과세자 중개사무소는 복비의 10% 부가세 별도",
  "영수증(세금계산서) 꼭 받아두세요,현금 거래 시 증거 필수",
  "상한요율 초과 요구는 위법,국토교통부·지자체에 신고 가능",
];

const FAQS = [
  {
    q: "복비는 누가 내나요?",
    a: "매도인과 매수인이 각각 따로 내요. 5억짜리 아파트면 파는 사람도 200만원, 사는 사람도 200만원이에요. 전세도 마찬가지로 임대인과 임차인이 각각 중개사에게 지불해요. 한쪽이 다 내는 게 아니에요.",
  },
  {
    q: "복비 깎을 수 있나요?",
    a: "상한요율 이내에서 협의 가능해요. 계약서 쓰기 전에 구체적으로 요율을 말하는 게 좋아요. '0.3%로 해주세요'처럼 명확하게 제시하세요. 계약 다 끝나고 나서 깎아달라 하면 협상력이 떨어져요.",
  },
  {
    q: "부가세도 내야 하나요?",
    a: "중개사무소가 일반과세자이면 복비에 10% 부가세를 추가로 받아요. 간이과세자는 부가세 없어요. 계약 전에 '부가세 별도인가요?' 미리 물어보세요. 영수증에 표시돼요.",
  },
  {
    q: "월세 계약 복비는 어떻게 계산해요?",
    a: "환산보증금으로 계산해요. 보증금 + (월세 × 100)이에요. 보증금 5천만원에 월세 100만원이면 환산보증금 1억5천만원이에요. 1억~6억 구간이라 요율 0.3% 적용해서 45만원이 상한이에요.",
  },
  {
    q: "상한요율 넘게 요구하면 어떻게 해요?",
    a: "위법이에요. 국토교통부나 지자체에 신고할 수 있어요. '원래 이렇게 받아요'라고 해도 법 기준을 초과하면 불법이에요. 신고 전에 요율표와 계산 금액을 미리 확인해두면 근거가 돼요.",
  },
  {
    q: "상가나 오피스텔은 요율이 달라요?",
    a: "주거용 오피스텔은 주택 요율이 적용돼요. 업무용 오피스텔과 상가·토지는 0.9% 이내에서 협의예요. 별도 구간이 없고 0.9%가 최대예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공인중개사법 시행규칙: 중개보수 상한요율", url: "https://www.law.go.kr/법령/공인중개사법시행규칙" },
      { label: "공인중개사법 제32조: 중개보수", url: "https://www.law.go.kr/법령/공인중개사법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부: 부동산 중개보수 안내", url: "https://www.molit.go.kr" },
      { label: "한국공인중개사협회: 중개보수 요율표", url: "https://www.kar.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "중개수수료-계산기", title: "중개수수료 계산기", description: "거래금액 입력하면 복비가 바로 계산돼요." },
  { slug: "전세계약-주의사항", title: "전세계약 주의사항", description: "전세 계약 전 반드시 확인할 체크리스트예요." },
  { slug: "취득세-계산기", title: "취득세 계산기", description: "부동산 살 때 내는 취득세 자동 계산이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 복비 · 중개수수료 · 요율표</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산 복비 요율표 2026<br />
        매매·전세·월세 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집 사거나 전세 들어갈 때 복비가 얼마나 나올지 계산해봐야 하죠?
        <a href="https://www.law.go.kr/법령/공인중개사법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>공인중개사법 시행규칙</a>에서 상한요율을 정해두고 있어요.
        거래 금액별로 0.3~0.7% 요율이 적용되고, 협의해서 그 이하로 줄일 수 있어요.
        상한요율을 넘게 받으면 위법이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>주택 매매 복비 요율표</H2>
      <p style={body}>
        주택 매매 복비는 거래금액에 따라 0.4~0.7%예요.
        상한요율이 적용되고, 그 이하로 협의할 수 있어요.
        매도인·매수인 각각 따로 내는 구조예요.
      </p>

      <SectionBadge>2026년 주택 매매 상한요율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>거래금액</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>상한요율</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>한도</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>계산 예시</th>
            </tr>
          </thead>
          <tbody>
            {SELL_RATES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.cap}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#4b5563" }}>{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>주택 전세·월세 복비 요율표</H2>
      <p style={body}>
        전세·월세 복비는 매매보다 요율이 조금 낮아요.
        월세는 환산보증금(보증금 + 월세 × 100)으로 계산해요.
        임대인·임차인 각각 따로 내요.
      </p>

      <SectionBadge>2026년 주택 전세·월세 상한요율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>거래금액</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>상한요율</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>한도</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>계산 예시</th>
            </tr>
          </thead>
          <tbody>
            {RENT_RATES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{row.rate}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.cap}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#4b5563" }}>{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>복비 계산 예시</H2>
      <p style={body}>
        요율표만 보면 헷갈릴 수 있어서 실제 계산 예시로 확인해보세요.
        부가세 포함 여부를 미리 물어봐야 실제 비용 차이가 없어요.
        계약 전에 복비 총액을 서면으로 확인해두는 게 좋아요.
      </p>

      <GreenBox>
        5억 아파트 매매: 2억~9억 구간 0.4% → 200만원 (부가세 10% 포함 시 220만원)<br />
        3억 전세: 1억~6억 구간 0.3% → 90만원 (부가세 포함 99만원)<br />
        보증금 5천+월세 100만원: 환산보증금 1.5억 → 0.3% → 45만원<br />
        ※ 매도·매수, 임대·임차 각각 따로 납부
      </GreenBox>

      <BorderBox>
        상가·토지: 매매·임대 모두 0.9% 이내 협의 (별도 구간 없음)<br />
        주거용 오피스텔: 주택 요율 적용 / 업무용 오피스텔: 상가 요율 적용
      </BorderBox>

      <Divider />

      <H2>복비 낼 때 주의할 점</H2>
      <p style={body}>
        계약 전에 미리 협의해야 협상력이 있어요.
        영수증을 받지 않으면 나중에 문제 생겨도 증거가 없어요.
        부가세 포함 여부도 계약 전에 꼭 따져봐야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 공인중개사법 시행규칙을 바탕으로 작성됐어요. 요율은 지자체 조례에 따라 다를 수 있으니 계약 전 확인하세요." />
    </ArticleLayout>
  );
}
