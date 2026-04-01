"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 시즌에 연금저축 세액공제 얼마 받는지 확인하거나, 올해 얼마 넣을지 계획하는 직장인
// Q2. 납입액 기준 세액공제액 파악 → 이번 연말정산 환급액 계산 or 내년 전략 수립
// Q3. 400만원 한도 × 16.5% = 66만원 / IRP 합산 시 900만원 한도 / 중도해지 16.5% 기타소득세 / 연금 수령 시 3.3~5.5%
// Q4. GreenBox(공제 한도 요약) + 납입액별 공제표 + BorderBox(IRP 합산) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "연금저축펀드와 연금저축보험 중 뭐가 나은가요?",
    a: "세액공제 혜택은 같아요. 펀드는 수익률이 높을 수 있지만 손실 위험이 있고, 보험은 원금 보장이지만 수익률이 낮고 중도 해지 시 손해가 커요. 장기적으로 투자에 익숙하면 펀드, 안정적으로 넣어두고 싶으면 보험이에요.",
  },
  {
    q: "12월에 한꺼번에 넣어도 되나요?",
    a: "네, 12월 31일까지 납입하면 그 해 연말정산에 반영돼요. 다만 펀드 상품이라면 매월 조금씩 넣는 적립식 투자가 장기적으로 유리해요.",
  },
  {
    q: "중도 해지하면 세금을 얼마나 내나요?",
    a: "받았던 세액공제 전액 반환 + 기타소득세 16.5%를 내야 해요. 예를 들어 10년 동안 매년 66만원씩 공제받았다면 660만원을 토해내야 해요. 급하면 부분 인출보다 납입 중단(유지)을 선택하는 게 나아요.",
  },
  {
    q: "총급여 5,500만원 초과면 공제율이 달라지나요?",
    a: "네. 총급여 5,500만원(종합소득 4,500만원) 이하는 16.5%, 초과는 13.2%예요. 400만원 납입 기준으로 66만원 vs 52만 8천원 차이가 나요.",
  },
  {
    q: "IRP도 있으면 합산 한도가 어떻게 되나요?",
    a: "연금저축 + IRP 합산 세액공제 한도는 900만원이에요. 연금저축 한도는 600만원이고, 연금저축 600만원 + IRP 300만원 = 900만원까지 세액공제를 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 연금계좌 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "소득세법 제59조의3 (연금계좌 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "금융감독원: 연금저축 가입 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-irp-공제", title: "IRP 세액공제 한도와 계산법", description: "연금저축과 합산해 최대 900만원 공제받는 방법이에요." },
  { slug: "연말정산-세액공제-항목-총정리", title: "연말정산 세액공제 항목 총정리", description: "13월의 월급을 만드는 세액공제 항목들이에요." },
  { slug: "국민연금-2026년-개혁-보험료율-소득대체율-변경", title: "2026년 국민연금 개혁 핵심 정리", description: "보험료율 인상과 소득대체율 변경 내용이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제 · 연금저축</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 연금저축 세액공제<br />
        400만원 넣으면 얼마 돌려받아요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        400만원 넣으면 최대 66만원 돌려받아요.
        총급여 5,500만원 이하면 16.5%, 초과면 13.2%를 세금에서 바로 깎아줘요.
        IRP와 합산하면 최대 900만원까지 세액공제가 가능해요.
        단, 55세 전에 해지하면 공제받은 세금 + 16.5% 기타소득세를 내야 하니 주의하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연금저축 세액공제 한도와 공제율</H2>
      <p style={body}>
        연간 600만원까지 납입할 수 있고, 세액공제는 400만원 한도로 적용돼요.
        소득에 따라 공제율이 달라요.
      </p>

      <GreenBox>
        <strong>2025년 귀속 연금저축 세액공제 핵심</strong><br />
        납입 한도: 연간 600만원 (IRP 합산 시 900만원)<br />
        세액공제 한도: 400만원<br />
        공제율 (총급여 5,500만원 이하): 16.5%<br />
        공제율 (총급여 5,500만원 초과): 13.2%<br />
        <br />
        400만원 납입 시 환급액: 66만원 (이하) / 52만 8천원 (초과)
      </GreenBox>

      <H2>납입액별 환급액 계산표</H2>
      <p style={body}>
        실제로 얼마 넣으면 얼마 돌려받는지 구간별로 정리했어요.
        총급여 5,500만원 이하 기준이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>연납입액</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>환급액 (16.5%)</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>환급액 (13.2%)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { deposit: "100만원", low: "16만 5천원", high: "13만 2천원" },
              { deposit: "200만원", low: "33만원", high: "26만 4천원" },
              { deposit: "300만원", low: "49만 5천원", high: "39만 6천원" },
              { deposit: "400만원 (한도)", low: "66만원", high: "52만 8천원" },
              { deposit: "600만원 (전액)", low: "66만원 (400만원 한도)", high: "52만 8천원 (400만원 한도)" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 3 ? "rgba(29,158,117,0.06)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 3 ? 700 : 400 }}>{row.deposit}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75", fontWeight: i === 3 ? 700 : 400 }}>{row.low}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>IRP와 합산하면 한도가 늘어요</H2>
      <p style={body}>
        연금저축만으로는 세액공제 한도가 400만원이지만, IRP(개인형 퇴직연금)와 합산하면 총 900만원까지 세액공제를 받을 수 있어요.
      </p>

      <BorderBox>
        <strong>연금저축 + IRP 합산 세액공제 한도 (2025년 귀속)</strong><br />
        연금저축 단독: 최대 400만원 공제<br />
        IRP 단독: 최대 900만원 공제<br />
        연금저축 + IRP 합산: 최대 900만원 공제<br />
        <br />
        추천 조합 (총급여 5,500만원 이하)<br />
        → 연금저축 600만원 + IRP 300만원 = 납입 900만원 / 공제 900만원 / 환급 148만 5천원<br />
        → 연금저축 400만원만: 납입 400만원 / 공제 400만원 / 환급 66만원
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연금저축 종류 선택하기</H2>
      <p style={body}>
        세액공제 혜택은 어떤 종류든 동일해요. 상품 특성에 따라 선택하면 돼요.
        연금저축펀드(증권사)는 수익률이 높을 수 있지만 손실 위험이 있어요.
        연금저축보험(보험사)은 원금 보장이지만 수익률이 낮고 중도 해지 시 손실이 커요.
        연금저축신탁(은행)은 가장 안전하지만 수익률이 가장 낮아요.
      </p>
      <p style={body}>
        55세 이후 연금으로 수령하면 연금소득세(3.3~5.5%)만 내요.
        16.5%로 공제받고 5.5%만 내니까, 세율 차이 11%만큼 이득이에요.
        연 1,200만원 이하로 받으면 분리과세도 가능해서 다른 소득에 합산되지 않아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 국세청 기준으로 작성됐어요. 세액공제율과 한도는 매년 변경될 수 있으니 홈택스(hometax.go.kr) 연말정산 간소화 서비스에서 확인하세요." />
    </ArticleLayout>
  );
}
