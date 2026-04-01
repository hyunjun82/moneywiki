"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 예금보다 이자를 더 받고 싶은데 주식은 무서워서 안전한 투자처를 찾는 상황
// Q2. MMF가 뭔지 이해하고 증권사 앱에서 MMF에 가입한다
// Q3. MMF 구조(단기금융상품 투자), 수익률 수준(연 2.5~2.8%), 가입 방법, 예금과 차이점, 장부가 평가
// Q4. GreenBox로 핵심 정리 + CompareTable로 예금 vs MMF + Steps로 가입 절차

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INVEST_STEPS = [
  { title: "증권사 계좌 개설", desc: "미래에셋, 삼성증권, 한국투자증권 등 원하는 증권사 앱에서 비대면 계좌를 만들어요.", tip: "이미 CMA 계좌가 있으면 바로 가능" },
  { title: "MMF 상품 검색", desc: "앱 내 펀드/상품 메뉴에서 'MMF'를 검색하면 여러 상품이 나와요." },
  { title: "수익률·수수료 비교", desc: "상품별 7일·30일 수익률과 보수(수수료)를 비교해서 골라요.", tip: "보수가 낮을수록 실수익이 높음" },
  { title: "금액 입력 후 매수", desc: "최소 1만원부터 투자 가능해요. 금액을 넣고 매수 버튼을 누르면 끝이에요." },
  { title: "환매(출금) 시 1영업일", desc: "돈이 필요하면 환매 신청하세요. 보통 1영업일이면 계좌로 입금돼요." },
];

const FAQS = [
  { q: "MMF에 넣으면 원금이 줄어들 수도 있나요?", a: "이론적으로 가능하지만 실제로 거의 없어요. MMF는 국공채·CD 같은 안전한 단기상품에만 투자하고, 장부가로 평가하기 때문에 수익률이 안정적이에요." },
  { q: "은행 예금이랑 뭐가 달라요?", a: "예금은 예금자보호(5,000만원)가 되지만 MMF는 안 돼요. 대신 MMF가 금리가 더 높고 입출금이 자유로워요. 안전성은 예금이 한 단계 위예요." },
  { q: "MMF 수익에 세금이 붙나요?", a: "네, 이자소득세 15.4%가 환매 시 자동으로 빠져요. 세전 수익률이 2.8%면 세후 약 2.37% 정도 되는 거예요." },
  { q: "CMA랑 MMF는 뭐가 다른가요?", a: "CMA는 증권사 종합 입출금 계좌예요. CMA 안에서 MMF형 운용을 선택할 수도 있고, 별도로 MMF 상품에 직접 투자할 수도 있어요. MMF 직접 투자가 수익률이 조금 더 높은 경우가 많아요." },
  { q: "얼마부터 투자할 수 있나요?", a: "증권사마다 다르지만 대부분 1만원부터 가능해요. 소액으로 시작해서 감을 잡은 뒤 금액을 늘리는 게 좋아요." },
  { q: "MMF를 여러 개 동시에 가입해도 되나요?", a: "네, 제한 없어요. 증권사별로 다른 MMF 상품에 분산 투자할 수도 있고, 한 증권사에서 여러 상품을 동시에 보유할 수도 있어요." },
];

const SOURCES = [
  { name: "금융감독원 금융상품 비교", href: "https://finlife.fss.or.kr/finlife/main/main.do?menuNo=700001" },
  { name: "자본시장과 금융투자업에 관한 법률", href: "https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" },
];

const RELATED = [
  { slug: "CMA계좌-금리-혜택", title: "CMA계좌 금리와 혜택", description: "CMA 계좌 수익 구조와 활용법." },
  { slug: "펀드-종류-주식형-채권형-혼합형", title: "펀드 종류 비교", description: "주식형·채권형·혼합형 펀드 차이." },
  { slug: "ISA계좌-수익률", title: "ISA계좌 수익률", description: "ISA 계좌 비과세 혜택과 수익률." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · MMF · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        MMF 투자, 수익률은 얼마나 될까?<br />
        가입 방법부터 예금과 차이까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        예금 이자가 너무 적은데 주식은 무서워요. 그 사이 어딘가에 돈을 넣고 싶죠.
      </p>
      <p style={body}>
        MMF(Money Market Fund)는 국공채, CD(양도성예금증서), 기업어음 같은 안전한 단기 금융상품에 투자하는 펀드예요. 2026년 기준 연 2.5~2.8% 수익률을 보여주고 있고, 은행 예금보다 높으면서 원금 손실 위험은 거의 없어요. 증권사 앱에서 1만원부터 바로 시작할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>MMF는 어떤 구조로 돈이 불어나나요?</H2>
      <p style={body}>
        MMF는 여러 투자자의 돈을 모아서 만기가 짧은(보통 90일 이내) 금융상품에 투자해요. 국공채, CD, 콜론, 기업어음 같은 것들이에요. 이런 상품들은 변동성이 매우 낮아서 원금이 줄어들 확률이 거의 없어요.
      </p>
      <p style={body}>
        핵심은 장부가 평가(帳簿價 評價)예요. 일반 펀드는 매일 시가(市價)로 평가해서 수익률이 오르락내리락하는데, MMF는 장부가로 평가해서 매일 일정하게 이자가 쌓여요. 100만원 넣으면 다음 날도 100만원이고, 거기에 하루치 이자가 붙는 식이에요.
      </p>

      <GreenBox>
        MMF 핵심 정리{"\n"}
        - 투자 대상: 국공채, CD, 기업어음 등 단기 금융상품{"\n"}
        - 2026년 수익률: 연 2.5~2.8% (세전){"\n"}
        - 최소 투자금: 1만원{"\n"}
        - 환매(출금): 1영업일{"\n"}
        - 예금자보호: 적용 안 됨 (원금보장 아님, 실질 손실 위험은 극히 낮음)
      </GreenBox>

      <p style={body}>
        다만 예금자보호가 안 된다는 점은 알아둬야 해요. 은행 예금은 5,000만원까지 보호되지만, MMF는 펀드라서 보호 대상이 아니에요. 그래도 투자 대상이 매우 안전한 상품들이라 실질적인 원금 손실 사례는 거의 없어요.
      </p>

      <CategoryButton label="금융" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>증권사 앱에서 이렇게 시작하면 돼요</H2>
      <p style={body}>
        MMF 투자는 은행 예금 넣는 것만큼 쉬워요. 증권사 계좌 하나만 있으면 앱에서 바로 할 수 있어요.
      </p>

      <SectionBadge>MMF 가입 5단계</SectionBadge>
      <Steps steps={INVEST_STEPS} />

      <p style={body}>
        상품 선택 시 "법인용"과 "개인용"이 나뉘어 있으니 개인용을 선택하세요. 보수(수수료)는 연 0.1~0.3% 수준인데, 이미 공시 수익률에 반영돼 있으니 따로 빼는 건 아니에요.
      </p>

      <Divider />

      <H2>예금이랑 뭐가 다른지 비교해볼까요?</H2>
      <p style={body}>
        가장 많이 비교하는 게 은행 정기예금이에요. 안전성, 수익률, 유동성 세 가지로 나눠보면 각각 장단점이 있어요.
      </p>

      <SectionBadge>은행 예금 vs MMF 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>은행 예금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>MMF</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["수익률", "연 2.0~2.5%", "연 2.5~2.8%"],
              ["예금자보호", "5,000만원까지 보호", "보호 안 됨"],
              ["입출금", "만기 전 해지 시 이자 감소", "1영업일 자유 환매"],
              ["세금", "이자소득세 15.4%", "이자소득세 15.4%"],
              ["최소 금액", "1원~", "1만원~"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151" }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        정리하면, 돈을 자유롭게 넣고 빼면서 이자를 받고 싶으면 MMF가 유리해요. 목돈을 묶어두고 안전하게 이자 받고 싶으면 예금이 낫고요.
      </p>

      <Divider />

      <H2>MMF 투자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        원금 손실, 세금, CMA와 차이 등 실제로 많이 궁금해하는 부분이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 금융감독원 자료를 바탕으로 작성했어요. 수익률은 시장 상황에 따라 변동되며, MMF는 예금자보호 대상이 아니에요." />
    </ArticleLayout>
  );
}
