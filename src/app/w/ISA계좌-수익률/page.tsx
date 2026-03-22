"use client";

// Q1. ISA 계좌 평균 수익률에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. ISA 평균 수익률은 연 5-7%로 일반 적금보다 높아요, 고배당 ETF는 배당 4% + 가격 상승 3% = 연 7%예요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "ISA 계좌 수익률이 마이너스 나올 수도 있나요?", a: "네, 주식·ETF에 투자하면 손실 날 수 있어요. 안전하게 하고 싶으면 채권 ETF나 예금 위주로 하세요." },
  { q: "ISA 배당 수익은 어떻게 확인하나요?", a: "은행·증권사 앱에서 ISA 계좌 들어가면 배당 내역 볼 수 있어요. 분기마다 자동으로 입금돼요." },
  { q: "ISA 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "ISA 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "ISA 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "금융투자협회", href: "https://www.kofia.or.kr" },
  { name: "한국거래소", href: "https://www.krx.co.kr" },
];

const RELATED = [
  { slug: "ISA계좌-기본", title: "ISA 계좌 기본", description: "관련 내용 정리." },
  { slug: "ISA계좌-ETF-추천", title: "ISA 계좌 ETF 추천", description: "관련 내용 정리." },
  { slug: "ISA계좌-세금혜택", title: "ISA 계좌 세금혜택", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 평균 수익률과 배당 수익 계산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 평균 수익률은 연 5-7%로 일반 적금보다 높아요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 계좌 평균 수익률은 얼마인가요?</H2>
      <p style={body}>중개형은 연 5-7%, 신탁형은 연 3-5% 정도예요.</p>
      <GreenBox>
        ISA 평균 수익률은 연 5-7%로 일반 적금보다 높아요{"\n"}
        고배당 ETF는 배당 4% + 가격 상승 3% = 연 7%예요{"\n"}
        비과세 효과까지 합치면 실질 수익률 8-9%예요
      </GreenBox>
      <p style={body}>금융투자협회 자료에 따르면 ISA 중개형 평균 수익률이 신탁형보다 높아요. 주식·ETF 직접 운용하니까요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>ISA 계좌 배당 수익은 얼마나 되나요?</H2>
      <p style={body}>고배당 ETF는 연 4-5% 배당 받아요.</p>
      <BorderBox>
        <strong>ISA 계좌 배당 수익은 얼마나 되나요?</strong><br />
        고배당 ETF는 연 4-5% 배당 받아요.<br />
        한국거래소 자료로 보면 고배당 ETF 배당률이 4% 이상이에요. 1,000만원 투자하면 연 40만원 이상 배당 받아요.
      </BorderBox>
      <p style={body}>한국거래소 자료로 보면 고배당 ETF 배당률이 4% 이상이에요. 1,000만원 투자하면 연 40만원 이상 배당 받아요.</p>

      <Divider />
      <H2>ISA 계좌 수익률 어떻게 높이나요?</H2>
      <p style={body}>고배당 ETF + 장기 보유 + 적립식 투자하세요.</p>
      <p style={body}>수익률 높이려면 배당 많은 ETF에 장기 투자해야 해요. 단기 매매는 수수료 아까워요.</p>
      <p style={body}>고배당 ETF를 매달 자동으로 사면 평균 매수가 낮아져요. 장기 보유하면 복리 효과로 수익률 더 올라가요.</p>

      <Divider />
      <H2>ISA 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
