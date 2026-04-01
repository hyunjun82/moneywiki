"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 여유 자금을 안전하게 굴리고 싶은데 MMF가 뭔지, 예금과 뭐가 다른지 궁금한 상황.
// Q2. MMF 특성(수익률·안전성·유동성)을 이해하고, 증권사 앱에서 MMF에 가입하거나 예금과 비교해서 선택하는 행동.
// Q3. MMF 정의(단기 우량채권 펀드), 수익률(연 3% 전후), 예금자보호 안 됨, 수수료 없이 즉시 환매, 시가평가 전환 리스크.
// Q4. GreenBox(핵심 특징) + 표(MMF vs 예금 비교) + Steps(가입 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const JOIN_STEPS = [
  { title: "증권 계좌 개설", desc: "증권사 앱(신한투자증권, 키움증권 등)에서 비대면 계좌를 만들어요.", tip: "이미 계좌가 있다면 바로 다음 단계로" },
  { title: "MMF 상품 검색", desc: "앱에서 'MMF' 또는 '단기금융펀드'로 검색해요. 개인용 MMF를 선택하면 돼요." },
  { title: "금액 입금·매수", desc: "원하는 금액을 넣고 매수 버튼을 누르면 끝이에요. 최소 가입 금액은 보통 1만원부터예요." },
  { title: "환매 (필요할 때)", desc: "앱에서 환매 신청하면 수수료 없이 당일 또는 다음 영업일에 현금화돼요." },
];

const FAQS = [
  { q: "MMF 수익률은 어느 정도인가요?", a: "시중 금리와 비슷한 수준이에요. 2026년 기준 연 3% 전후인데, 시장 상황에 따라 매일 변해요." },
  { q: "MMF는 원금이 보장되나요?", a: "법적으로 원금 보장은 안 돼요. 하지만 우량채권에만 투자하도록 규정돼 있어서 실제 손실 가능성은 매우 낮아요." },
  { q: "예금자보호가 되나요?", a: "안 돼요. MMF는 투자상품이라 예금보험공사 보호 대상이 아니에요. 예금자보호가 필요하면 은행 예금을 이용해야 해요." },
  { q: "CMA MMF형이랑 MMF는 같은 건가요?", a: "CMA MMF형이 바로 MMF에 투자하는 상품이에요. 증권사 CMA 계좌에서 자동으로 MMF에 투자해주는 방식이에요." },
  { q: "MMF는 세금이 얼마나 나오나요?", a: "이자소득에 대해 15.4% 세금이 부과돼요. 은행 예금 이자와 동일한 세율이에요." },
  { q: "급하게 돈이 필요하면 바로 찾을 수 있나요?", a: "네, 영업일 기준으로 환매 신청하면 당일이나 다음 영업일에 입금돼요. 수수료도 없어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융상품 비교", url: "https://finlife.fss.or.kr" },
      { label: "금융투자협회 펀드 공시", url: "https://dis.kofia.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리·혜택", description: "CMA MMF형은 MMF에 자동 투자돼요. 금리와 혜택을 비교해봐요." },
  { slug: "예금자보호제도", title: "예금자보호제도 1억원", description: "MMF는 예금자보호 대상이 아니에요. 보호 대상 상품을 확인해봐요." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 초보자 가이드", description: "MMF보다 수익률을 높이고 싶다면 ETF도 알아봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 투자 · 단기 자금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        MMF 투자, 예금보다 나을까?<br />
        수익률·안전성·가입 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        여유 자금을 어디에 넣어둘지 고민되죠. 은행 예금은 금리가 아쉽고, 주식은 위험하고.
        MMF는 단기 우량채권에 투자하는 펀드예요. 적금 수준 수익에 언제든 찾을 수 있어서 대기 자금 넣어두기 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>MMF가 뭔가요?</H2>
      <p style={body}>
        MMF는 Money Market Fund의 약자예요. 국공채, 양도성예금증서(CD), 기업어음(CP) 같은 1년 이내 단기 우량채권에만 투자하는 펀드죠.
        법으로 투자 대상이 제한돼 있어서 주식 펀드보다 훨씬 안전해요.
      </p>

      <GreenBox>
        · 투자 대상: 1년 이내 <strong>단기 우량채권</strong> (국공채, CD, CP)<br />
        · 수익률: 은행 적금과 비슷한 수준 (연 <strong>3% 전후</strong>)<br />
        · 환매: 수수료 없이 <strong>즉시 현금화</strong> 가능<br />
        · 예금자보호: <strong>안 됨</strong> (투자상품이라 보호 대상 아님)<br />
        · 원금 보장: 법적으로 안 되지만 실제 손실 가능성은 극히 낮음
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>MMF vs 은행 예금, 뭐가 다른가요?</H2>
      <p style={body}>
        수익률은 비슷한데 특징이 달라요. 가장 큰 차이는 예금자보호 여부와 환매 자유도예요.
      </p>

      <SectionBadge>MMF vs 은행 예금 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>MMF</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>은행 정기예금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["수익률", "연 3% 전후 (변동)", "연 3% 전후 (고정)"],
              ["예금자보호", "X (투자상품)", "O (1억원까지)"],
              ["중도 인출", "수수료 없이 즉시", "중도해지 시 이자 손실"],
              ["원금 보장", "법적 불보장 (실질적 안전)", "원금 보장"],
              ["세금", "15.4%", "15.4%"],
              ["최소 가입", "1만원부터", "은행별 상이"],
            ].map(([item, mmf, deposit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{mmf}</td>
                <td style={{ padding: "9px 12px" }}>{deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        안전이 최우선이라면 예금, 유동성이 필요하면 MMF를 선택해요.
        많은 분이 일부는 예금에, 일부는 MMF에 나눠서 넣어두고 있어요.
      </p>

      <Divider />

      <H2>MMF 가입은 이렇게 해요</H2>
      <p style={body}>
        증권사 앱에서 5분이면 가입할 수 있어요. 은행 앱처럼 간단해요.
      </p>

      <Steps steps={JOIN_STEPS} />

      <BorderBox>
        <strong>주의할 점</strong><br /><br />
        · 시가와 장부가 차이가 ±0.5% 초과하면 시가평가로 전환될 수 있어요 (극히 드뭄)<br />
        · 예금자보호 안 되니까 한 곳에 너무 많이 넣지 말고 분산해요<br />
        · <a href="/w/CMA계좌-금리-혜택" style={{ color: "#1D9E75", textDecoration: "underline" }}>CMA MMF형</a>을 쓰면 입출금 통장처럼 편하게 이용 가능해요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 금융감독원·금융투자협회 자료를 바탕으로 작성됐어요. MMF 수익률은 시장 상황에 따라 변동되며, 원금 손실 가능성이 있으니 투자 전 상품 설명서를 확인해봐요." />
    </ArticleLayout>
  );
}
