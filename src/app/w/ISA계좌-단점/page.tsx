"use client";
// Q1. ISA 계좌 가입하려는데 단점이 뭔지 정확히 알고 싶은 상황
// Q2. 단점을 파악해서 본인에게 맞는지 판단하고, 가입 여부 결정
// Q3. 3년 의무가입(중도해지 시 비과세 소멸), 해외주식 직접 불가, ETF 수수료 0.5~0.7%, 1인1계좌, 연2000만원 한도
// Q4. GreenBox(단점 요약표) + BorderBox(중도해지 시 세금 비교) + Checklist(안 맞는 사람 체크) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "ISA 3년 전에 해지하면 어떻게 되나요?", a: "비과세 혜택이 전부 소멸하고 배당·이자에 15.4% 세금을 내야 해요. 원금은 그대로 받지만 세금 혜택을 포기하는 거예요." },
  { q: "해외주식은 정말 못 사나요?", a: "직접 매수는 안 돼요. 대신 국내에 상장된 해외 추종 ETF(TIGER 미국S&P500, KODEX 나스닥100 등)는 살 수 있어요." },
  { q: "증권사 바꾸고 싶으면요?", a: "계좌를 해지하고 다른 증권사에서 새로 개설해야 해요. 3년 의무가입 기간이 리셋되니 신중하게 선택하세요." },
  { q: "연 2,000만원 한도 이상 투자하고 싶으면요?", a: "ISA 한도는 연 2,000만원, 누적 1억원이에요. 초과 금액은 일반 증권 계좌에서 투자해야 해요." },
  { q: "ISA 만기 후에 연금계좌로 전환하면요?", a: "IRP나 연금저축으로 이전하면 이전 금액의 10%(최대 300만원) 추가 세액공제를 받을 수 있어요. 만기 후 60일 이내에 전환해야 해요." },
  { q: "배당이 없는 성장주 ETF를 ISA에 넣으면요?", a: "ISA 비과세는 배당·이자에 적용돼요. 배당이 없으면 비과세 효과가 거의 없어요. 국내 주식 매매차익은 원래 비과세니까 ISA에 넣을 이유가 없어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "금융위원회 ISA 제도 안내", url: "https://www.fsc.go.kr" },
    { label: "금융감독원 ISA 계좌", url: "https://www.fss.or.kr" },
    { label: "한국거래소 ETF 정보", url: "https://www.krx.co.kr" },
  ]},
];

const RELATED = [
  { slug: "ISA계좌-기본", title: "ISA 계좌 기본 유형 선택", description: "중개형·서민형·신탁형 유형별 차이를 정리했어요." },
  { slug: "ISA계좌-ETF-추천", title: "ISA 계좌 ETF 추천", description: "고배당 ETF로 비과세 혜택 극대화하는 전략이에요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제", description: "ISA 대안으로 연금저축펀드 세액공제를 비교해 보세요." },
];

const NOT_FIT_CHECKLIST = [
  "3년 안에 목돈이 필요할 수 있다 (집 구매, 결혼, 출산)",
  "해외 주식(애플, 테슬라 등)을 직접 사고 싶다",
  "단기 매매 위주로 투자한다",
  "연간 2,000만원 이상 투자하고 싶다",
  "증권사를 자주 바꾸는 편이다",
  "배당이 아닌 성장주 위주로 투자한다",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 단점, 가입 전에 꼭 알아야 할 것<br />
        3년 의무가입과 해외주식 제한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 계좌 비과세 혜택만 보고 가입하면 후회할 수 있어요.
        3년 의무가입 기간이 있어서 중도해지하면 비과세가 사라지고, 해외주식은 직접 못 사요.
        단점을 정확히 알고 본인에게 맞는지 판단하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 계좌 핵심 단점 5가지</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>금융위원회</a>가 정한 ISA 제도에는
        투자자에게 불리한 제약이 몇 가지 있어요.
      </p>

      <GreenBox title="ISA 계좌 주요 단점">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>단점</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>내용</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>영향</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["3년 의무가입", "중도해지 시 비과세 소멸", "15.4% 세금 부과"],
              ["해외주식 직접 불가", "국내 상장 ETF만 가능", "수수료 높은 ETF 이용"],
              ["ETF 보수 높음", "해외 추종 ETF 0.5~0.7%", "직접 투자 대비 수수료 6배"],
              ["1인 1계좌", "증권사 변경 시 해지 필요", "3년 기간 리셋"],
              ["납입 한도", "연 2,000만원, 누적 1억원", "고액 투자 제한"],
            ].map(([a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px", fontWeight: 500 }}>{a}</td>
                <td style={{ padding: "8px 6px" }}>{b}</td>
                <td style={{ padding: "8px 6px" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>중도해지하면 세금 차이가 얼마나 날까?</H2>
      <p style={body}>
        3년을 채우느냐 안 채우느냐에 따라 세금 차이가 크게 나요.
        배당·이자 수익이 500만원이라고 가정하면 이렇게 달라져요.
      </p>

      <BorderBox title="만기 vs 중도해지 세금 비교 (배당 500만원 기준)">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>구분</th>
              <th style={{ padding: "8px 6px", textAlign: "right" }}>비과세</th>
              <th style={{ padding: "8px 6px", textAlign: "right" }}>세금</th>
              <th style={{ padding: "8px 6px", textAlign: "right" }}>실수령</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>만기 해지 (서민형)</td>
              <td style={{ padding: "8px 6px", textAlign: "right" }}>400만원</td>
              <td style={{ padding: "8px 6px", textAlign: "right", color: "#1D9E75" }}>9.9만원</td>
              <td style={{ padding: "8px 6px", textAlign: "right", fontWeight: 600 }}>490.1만원</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>중도해지</td>
              <td style={{ padding: "8px 6px", textAlign: "right" }}>0원</td>
              <td style={{ padding: "8px 6px", textAlign: "right", color: "#dc2626" }}>77만원</td>
              <td style={{ padding: "8px 6px", textAlign: "right", fontWeight: 600 }}>423만원</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          중도해지하면 67만원 차이. 3년 못 기다리면 ISA 의미가 없어요.
        </p>
      </BorderBox>

      <Divider />

      <H2>ISA 계좌가 안 맞는 사람</H2>
      <p style={body}>
        아래 항목에 해당하면 ISA보다 일반 증권 계좌가 나을 수 있어요.
      </p>

      <Checklist items={NOT_FIT_CHECKLIST} />

      <p style={body}>
        반대로 3년 이상 장기 투자하고 배당 ETF 위주로 운용할 사람에게는 ISA가 유리해요.
        <a href="/w/ISA계좌-기본" style={{ color: "#1D9E75" }}> ISA 계좌 기본</a>에서 유형별 차이를 먼저 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 ISA 제도를 바탕으로 작성했어요. 금융상품 투자는 원금 손실 위험이 있으니 신중하게 판단하세요." />
    </ArticleLayout>
  );
}
