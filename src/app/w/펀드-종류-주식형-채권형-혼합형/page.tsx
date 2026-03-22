"use client";

// Q1. 펀드에 투자해보고 싶은데 주식형, 채권형, 혼합형이 뭐가 다른지 모르는 상황
// Q2. 내 투자 성향에 맞는 펀드 종류를 선택한다
// Q3. 주식형(주식 60%+), 채권형(채권 60%+), 혼합형(주식혼합/채권혼합) 구조, 수익률·위험도 차이, 수수료
// Q4. CompareTable로 3종 비교 + GreenBox로 선택 기준 + BorderBox로 수수료

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "초보자에게 맞는 펀드는 어떤 종류인가요?", a: "채권형이나 채권혼합형이 안정적이에요. 원금 손실 위험이 낮고 수익도 예금보다는 높은 편이에요. 투자 경험이 쌓인 뒤에 주식형으로 넘어가는 게 안전해요." },
  { q: "펀드 수수료는 얼마나 드나요?", a: "연 0.5~2% 수준의 운용 보수가 있어요. 이건 매일 펀드 가격에 자동 반영돼서 따로 내지는 않아요. 판매 수수료는 가입 시 0~1% 정도 붙을 수 있어요." },
  { q: "ETF랑 펀드는 뭐가 달라요?", a: "ETF는 주식처럼 실시간 매매가 가능한 펀드예요. 일반 펀드는 하루에 한 번 가격이 정해지고 환매도 2~3영업일 걸려요. ETF가 수수료가 더 낮은 편이에요." },
  { q: "펀드를 중간에 빼면 손해인가요?", a: "환매 수수료가 붙을 수 있어요. 보통 가입 후 90일 이내 환매하면 이익의 70%를 수수료로 가져가요. 90일 지나면 수수료 없이 빼는 상품이 많아요." },
  { q: "주식형 펀드와 직접 주식 투자 중 뭐가 낫나요?", a: "분산 투자를 원하면 펀드, 종목 선택에 자신 있으면 직접 투자가 유리해요. 펀드는 전문가가 운용하니까 시간이 없는 분에게 적합하고요." },
  { q: "펀드 수익에 세금이 붙나요?", a: "네, 국내 주식형 펀드는 매매 차익에 세금이 없지만 해외 주식형이나 채권형은 15.4% 배당소득세가 붙어요. 2,000만원 이상이면 금융소득종합과세 대상이에요." },
];

const SOURCES = [
  { name: "자본시장과 금융투자업에 관한 법률", href: "https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" },
  { name: "금융감독원 금융상품 비교", href: "https://finlife.fss.or.kr" },
];

const RELATED = [
  { slug: "MMF투자-수익률-방법", title: "MMF 투자 수익률과 방법", description: "안전한 단기 투자 상품 MMF 정리." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 초보자 가이드", description: "ETF 시작하는 방법과 주의사항." },
  { slug: "ISA계좌-수익률", title: "ISA계좌 수익률", description: "절세 계좌 ISA 활용법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 펀드 · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        펀드 종류, 뭐가 다른 거예요?<br />
        주식형·채권형·혼합형 비교와 선택법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행에서 펀드를 추천받았는데 종류가 너무 많아서 뭘 골라야 할지 모르겠죠.
      </p>
      <p style={body}>
        펀드는 크게 주식형, 채권형, 혼합형 세 가지로 나뉘어요. <a href="https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>자본시장법</a>에서 정한 기준에 따라 주식 비중 60% 이상이면 주식형, 채권 60% 이상이면 채권형, 그 사이면 혼합형이에요. 수익률과 위험도가 다르니 내 투자 성향에 맞는 걸 고르는 게 핵심이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세 종류를 한눈에 비교해볼까요?</H2>
      <p style={body}>
        같은 펀드라도 종류에 따라 수익률, 위험도, 적합한 투자자가 완전히 달라요. 핵심 차이를 표로 정리했어요.
      </p>

      <SectionBadge>주식형·채권형·혼합형 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>주식형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>채권형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>혼합형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["주식 비중", "60% 이상", "0%", "10~60%"],
              ["채권 비중", "나머지", "60% 이상", "나머지"],
              ["기대 수익률", "연 8~15% (변동 큼)", "연 2~4%", "연 4~8%"],
              ["위험도", "높음", "낮음", "중간"],
              ["적합한 투자자", "장기 투자, 공격적", "안정 추구, 보수적", "균형 추구"],
              ["환매 소요", "3~4영업일", "2~3영업일", "3~4영업일"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151" }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[2]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        기대 수익률은 장기 평균이에요. 주식형은 어떤 해에 20% 오를 수 있지만 -15%도 가능해요. 채권형은 수익 폭이 좁은 대신 안정적이고요.
      </p>

      <CategoryButton label="금융" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>내 성향에 맞는 펀드는 어떻게 고르나요?</H2>
      <p style={body}>
        투자 경험이 없고 원금 손실이 무서운 분이라면 채권형부터 시작하는 게 안전해요. 반대로 5년 이상 장기 투자가 가능하고 단기 손실을 감수할 수 있다면 주식형이 수익률 측면에서 유리하고요.
      </p>

      <GreenBox>
        펀드 선택 기준{"\n"}
        - 투자 기간 3년 이하 + 안정 추구 → 채권형{"\n"}
        - 투자 기간 5년 이상 + 수익 추구 → 주식형{"\n"}
        - 그 사이 어딘가 → 혼합형 (채권혼합이 더 안정적){"\n"}
        - 여유자금 단기 보관 → <a href="/w/MMF투자-수익률-방법" style={{ color: "#0F6E56" }}>MMF</a>
      </GreenBox>

      <p style={body}>
        혼합형 안에서도 주식혼합형(주식 50% 이상)과 채권혼합형(주식 50% 미만)으로 나뉘어요. 채권혼합형이 변동성이 더 낮아서 처음 투자하는 분에게 적합해요.
      </p>

      <Divider />

      <H2>수수료 구조를 모르면 수익이 줄어요</H2>
      <p style={body}>
        펀드에는 눈에 보이지 않는 비용이 있어요. 운용 보수라는 건데, 펀드를 관리·운용해주는 대가로 매년 빠져나가는 비용이에요.
      </p>

      <BorderBox>
        <strong>펀드 수수료 구조</strong><br />
        - 운용 보수: 연 0.5~2% (매일 펀드 가격에 반영, 따로 납부 X)<br />
        - 판매 수수료: 가입 시 0~1% (없는 상품도 많음)<br />
        - 환매 수수료: 90일 미만 환매 시 이익의 70% (상품마다 다름)<br />
        - 총 비용이 낮을수록 장기 수익률이 유리해요
      </BorderBox>

      <p style={body}>
        같은 주식형 펀드라도 보수가 연 0.5%인 것과 2%인 것은 10년 후 수익 차이가 크게 벌어져요. 보수율을 꼭 비교하고, 가능하면 <a href="/w/ETF-투자-초보자" style={{ color: "#1D9E75", textDecoration: "underline" }}>ETF</a>도 함께 검토해보세요. ETF는 보수가 0.05~0.5% 수준으로 훨씬 저렴해요.
      </p>

      <Divider />

      <H2>펀드 투자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        초보자 펀드 선택, ETF 차이, 세금 등 실전에서 궁금한 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 자본시장법과 금융감독원 자료를 바탕으로 작성했어요. 펀드 수익률은 과거 실적이며 미래 수익을 보장하지 않아요." />
    </ArticleLayout>
  );
}
