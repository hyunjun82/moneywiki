"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 우리은행 퇴직연금(DC형/IRP)에서 ETF 투자하고 싶은데 방법을 모르는 직장인
// Q2. 우리WON뱅킹 앱에서 퇴직연금 ETF를 매수하고 안전자산 30% 규정에 맞게 포트폴리오를 구성한다
// Q3. 투자 가능 계좌(DC/IRP), 매수 방법(우리WON뱅킹), 안전자산 30% 의무, 추천 ETF, 수수료
// Q4. Steps(매수 절차) + GreenBox(포트폴리오 예시) + BorderBox(안전자산 규정) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "우리WON뱅킹 앱에 로그인하세요",
    desc: "우리은행 모바일 앱 '우리WON뱅킹'을 열고 공동인증서나 간편인증으로 로그인하세요. 퇴직연금 메뉴는 하단 또는 전체 메뉴에서 찾을 수 있어요.",
    tip: "비대면 IRP 가입 시 운용·자산관리 수수료 전액 면제",
  },
  {
    title: "퇴직연금 > 운용지시 메뉴로 가세요",
    desc: "퇴직연금(DC형 또는 IRP) 계좌를 선택한 뒤 '운용지시' 또는 '상품변경' 메뉴를 누르세요. 여기서 원하는 ETF를 검색할 수 있어요.",
    tip: "DB형은 ETF 투자 불가. DC형·IRP만 가능",
  },
  {
    title: "ETF를 검색해서 매수 금액을 입력하세요",
    desc: "검색창에 'S&P500', '나스닥100', '국고채' 같은 키워드로 ETF를 찾아요. 원하는 상품을 선택하고 매수 금액을 입력한 뒤 주문하면 돼요. 안전자산 30% 규정을 자동으로 체크해줘요.",
    tip: "위험자산 비중이 70% 넘으면 매수 불가 알림",
  },
  {
    title: "안전자산 30%를 맞춰서 포트폴리오를 완성하세요",
    desc: "퇴직연금은 법적으로 안전자산(채권ETF, 예금 등)을 30% 이상 보유해야 해요. 위험자산(주식형 ETF)은 최대 70%까지만 가능해요. 비중이 맞지 않으면 시스템에서 매수를 막아요.",
    tip: "1년에 1~2번 리밸런싱 추천",
  },
];

const FAQS = [
  {
    q: "DB형 퇴직연금에서도 ETF 투자할 수 있나요?",
    a: "아니에요. DB형(확정급여형)은 회사가 운용하기 때문에 개인이 ETF를 직접 매수할 수 없어요. DC형(확정기여형)이나 IRP(개인형퇴직연금)만 개인이 직접 ETF에 투자할 수 있어요.",
  },
  {
    q: "ETF 매매 수수료가 있나요?",
    a: "우리은행 퇴직연금 내 ETF 매매 수수료는 없거나 매우 저렴해요. 다만 ETF 자체의 운용보수(총보수)는 상품마다 달라요. S&P500 ETF가 보통 연 0.07~0.2% 수준이에요.",
  },
  {
    q: "안전자산 30%에 어떤 상품이 해당하나요?",
    a: "채권형 ETF(국고채, 단기채권), 예금형 상품(원리금보장), 채권혼합형 펀드가 안전자산이에요. TDF(타겟데이트펀드)도 채권 비중에 따라 안전자산으로 인정되는 경우가 있어요.",
  },
  {
    q: "수익률이 안 좋으면 손해만 보나요?",
    a: "ETF 투자라서 원금 손실 가능성이 있어요. 하지만 퇴직연금은 장기 투자 성격이라 S&P500 같은 글로벌 지수 ETF는 10~20년 장기로 보면 우상향 추세를 보여왔어요. 단기 등락에 흔들리지 않는 게 중요해요.",
  },
  {
    q: "고객센터 연락처가 어떻게 되나요?",
    a: "우리은행 퇴직연금 상담전화는 1599-1000이에요. 평일 09:00~18:00에 상담 가능해요. 우리WON뱅킹 앱 내 채팅 상담도 이용할 수 있어요.",
  },
  {
    q: "TDF로 자동 운용하는 게 나을까요?",
    a: "투자에 자신이 없으면 TDF(타겟데이트펀드)가 편해요. 은퇴 시점에 맞춰 자동으로 위험자산 비중을 줄여주거든요. ETF 직접 매매가 번거로우면 TDF 하나로 퇴직연금을 운용하는 것도 좋은 선택이에요.",
  },
];

const SOURCES = [
  { name: "우리은행 퇴직연금", href: "https://svc.wooribank.com/svc/Dream?withyou=RPRPS0089" },
  { name: "금융감독원 퇴직연금", href: "https://www.fss.or.kr" },
  { name: "금감원 통합연금포털", href: "https://100lifeplan.fss.or.kr" },
];

const RELATED = [
  { slug: "퇴직연금-etf-추천", title: "퇴직연금 ETF 추천", description: "은행별 퇴직연금 ETF 추천 목록." },
  { slug: "퇴직연금", title: "퇴직연금 기본 가이드", description: "DB형, DC형, IRP 차이와 선택 기준." },
  { slug: "IRP계좌-가입-세액공제", title: "IRP 세액공제", description: "IRP 가입하면 세액공제 최대 135만원." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 &middot; ETF &middot; 우리은행</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        우리은행 퇴직연금 ETF, 어떻게 투자하나?<br />
        매수 방법부터 포트폴리오 구성까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "우리은행 DC형인데 ETF로 투자하고 싶어요. 앱에서 할 수 있나요?"
      </p>
      <p style={body}>
        네, <strong>우리WON뱅킹 앱</strong>에서 바로 매수할 수 있어요. DC형(확정기여형)이나 IRP(개인형퇴직연금)라면 S&P500, 나스닥100, 국고채 ETF 등에 직접 투자 가능해요. 안전자산 <strong>30% 이상</strong> 유지하면서 나머지 70%를 위험자산 ETF에 넣는 구조예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우리WON뱅킹에서 ETF 매수하는 절차예요</H2>
      <p style={body}>
        앱에서 4단계면 끝나요. 처음 한 번만 해보면 그 다음부턴 쉬워요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="퇴직연금 정보" count={10} href="/category/퇴직연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>안전자산 30% 규정, 꼭 지켜야 하나요?</H2>
      <p style={body}>
        네, 법으로 정해져 있어요. 근로자퇴직급여 보장법에 따라 퇴직연금 적립금의 <strong>30% 이상을 안전자산</strong>으로 보유해야 해요. 이걸 안 지키면 시스템에서 매수 자체가 차단돼요.
      </p>

      <SectionBadge>자산 배분 규정</SectionBadge>
      <BorderBox>
        <strong>위험자산 (최대 70%)</strong>{"\n"}
        &middot; 주식형 ETF: TIGER 미국S&P500, KODEX 미국나스닥100, KODEX 200 등{"\n"}
        &middot; 주식형 펀드, 혼합형 펀드(주식 비중 40% 초과){"\n\n"}
        <strong>안전자산 (최소 30%)</strong>{"\n"}
        &middot; 채권형 ETF: KODEX 국고채10년, TIGER 단기채권액티브 등{"\n"}
        &middot; 예금형 상품(원리금보장){"\n"}
        &middot; 채권혼합형 펀드(주식 비중 40% 이하)
      </BorderBox>

      <Divider />

      <H2>어떤 ETF로 포트폴리오를 짜면 좋을까요?</H2>
      <p style={body}>
        장기 투자 성격에 맞게 글로벌 지수 ETF 중심으로 구성하는 게 기본이에요. <a href="/w/퇴직연금-etf-추천" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 ETF 추천</a> 글에서 은행별 비교도 참고하세요.
      </p>

      <SectionBadge>포트폴리오 예시</SectionBadge>
      <GreenBox>
        위험자산 70%{"\n"}
        &middot; TIGER 미국S&P500 — 40% (미국 대형주 500개){"\n"}
        &middot; KODEX 미국나스닥100 — 30% (기술주 중심 성장){"\n\n"}
        안전자산 30%{"\n"}
        &middot; KODEX 국고채10년 — 20% (국채 안정성){"\n"}
        &middot; 예금형 상품 — 10% (원리금보장){"\n\n"}
        이건 예시일 뿐이에요. 본인 연령과 위험 성향에 맞게 조절하세요.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. ETF 수익률은 과거 실적이며 미래를 보장하지 않아요. 투자 결정은 본인의 판단과 책임 하에 이루어져야 해요." />
    </ArticleLayout>
  );
}
