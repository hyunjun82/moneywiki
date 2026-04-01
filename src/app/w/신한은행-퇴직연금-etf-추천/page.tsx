"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 신한은행 DC형이나 IRP에서 ETF 투자를 하고 싶은데 어떤 ETF를 담아야 하고 어디서 매수하는지 모르는 상황이에요.
// Q2. 신한SOL 앱에서 퇴직연금 ETF를 검색해서 위험자산 70%·안전자산 30% 포트폴리오로 첫 매수를 하는 행동.
// Q3. DC형/IRP만 ETF 투자 가능, 위험자산 70% 한도, 신한SOL 앱 매수 방법, 추천 ETF(S&P500·나스닥100·국고채), 수수료 구조.
// Q4. Steps(매수 방법) + GreenBox(추천 포트폴리오) + BorderBox(위험자산 한도) + Checklist(체크포인트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const BUY_STEPS = [
  { title: "신한SOL 앱 로그인", desc: "신한SOL 앱을 열고 로그인해요. 앱이 없으면 앱스토어에서 설치하세요." },
  { title: "퇴직연금 메뉴 진입", desc: "하단 메뉴에서 '퇴직연금'을 찾아요. '운용지시' 또는 '상품변경' 메뉴를 선택해요." },
  { title: "ETF 검색 및 선택", desc: "검색창에 'TIGER 미국S&P500' 또는 'KODEX 미국나스닥100'을 입력해요. 원하는 ETF를 선택하세요." },
  { title: "매수 금액 입력 및 주문", desc: "투자할 금액을 입력하고 주문을 실행해요. 위험자산 70% 한도를 넘지 않는지 자동으로 체크돼요.", tip: "안전자산 30% 이상 유지 의무를 잊지 마세요" },
];

const CHECK_ITEMS = [
  "DC형 또는 IRP 계좌인지 확인 (DB형은 ETF 투자 불가)",
  "위험자산 70% 한도 내에서 투자",
  "안전자산 30% 이상 유지 의무",
  "ETF 매매 수수료 확인 (대부분 무료 또는 저렴)",
  "운용보수는 ETF마다 다르므로 비교 후 선택",
  "장기 관점(5년 이상) 적립식 투자 권장",
];

const FAQS = [
  { q: "DB형 퇴직연금에서도 ETF 투자가 되나요?", a: "안 돼요. DB형은 회사가 운용하는 구조라서 근로자가 직접 ETF를 사고팔 수 없어요. DC형이나 IRP만 가능해요." },
  { q: "위험자산 70% 한도는 뭔가요?", a: "퇴직연금에서는 적립금의 최소 30%를 안전자산에 투자해야 해요. 주식형 ETF는 위험자산으로 분류되니까 최대 70%까지만 담을 수 있어요." },
  { q: "신한SOL 앱에서 매매 수수료가 있나요?", a: "ETF 매매 수수료는 없거나 매우 저렴해요. 다만 ETF 자체에 운용보수가 있어요. TIGER 미국S&P500은 연 0.07% 수준이에요." },
  { q: "안전자산 30%에 뭘 넣으면 좋나요?", a: "KODEX 국고채10년, TIGER 단기채권액티브 같은 채권형 ETF가 인기가 많아요. 변동성이 적으면서 꾸준한 수익을 내요. 예금형 상품도 안전자산으로 인정돼요." },
  { q: "S&P500과 나스닥100 중 뭐가 나아요?", a: "S&P500은 미국 대형주 500개에 분산 투자해서 안정적이에요. 나스닥100은 기술주 중심이라 성장성이 높지만 변동성도 커요. 둘 다 담는 게 균형 잡힌 전략이에요." },
  { q: "고객센터 번호가 뭐예요?", a: "신한은행 고객센터는 1577-8000이에요. 퇴직연금 관련 문의도 가능해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "신한은행 퇴직연금", url: "https://www.shinhan.com" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
      { label: "SOL ETF 상품 목록", url: "https://www.soletf.com" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-etf-추천", title: "퇴직연금 ETF 추천 (은행별)", description: "은행별 퇴직연금 ETF 라인업을 비교했어요." },
  { slug: "퇴직연금", title: "퇴직연금 종류와 차이", description: "DB형·DC형·IRP의 차이를 쉽게 정리했어요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "IRP와 연금저축을 합쳐서 세액공제 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · ETF · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신한은행 퇴직연금 ETF 추천<br />
        신한SOL 앱 매수부터 포트폴리오까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신한은행 퇴직연금인데 ETF로 투자하고 싶으시죠? DC형이나 IRP 계좌라면 가능해요.
        신한SOL 앱에서 검색하고 주문하면 10분이면 끝나요.
        위험자산 70%, 안전자산 30% 비중만 맞추면 장기적으로 안정적인 수익을 기대할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신한SOL 앱에서 ETF 매수하는 방법</H2>
      <p style={body}>
        신한은행 DC형 퇴직연금이나 IRP에서 ETF를 매수하려면 신한SOL 앱을 사용해요.
        앱에서 퇴직연금 메뉴로 들어가서 운용지시를 하면 돼요. 생각보다 간단해요.
      </p>

      <SectionBadge>매수 절차</SectionBadge>
      <Steps steps={BUY_STEPS} />

      <Divider />

      <H2>추천 포트폴리오, 이렇게 구성하세요</H2>
      <p style={body}>
        퇴직연금은 장기 투자예요. 단타가 아니라 10년, 20년 후를 보고 투자해야 해요.
        미국 대형주 지수 ETF를 중심으로 안전자산을 섞는 게 가장 검증된 전략이에요.
      </p>

      <SectionBadge>추천 포트폴리오</SectionBadge>
      <GreenBox title="3040 직장인 기본 포트폴리오">
        <p style={{ ...body, marginBottom: 6 }}><strong>TIGER 미국S&P500</strong> (40%) — 미국 대형주 500개 분산, 수수료 연 0.07%</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>KODEX 미국나스닥100</strong> (30%) — 기술주 중심, 성장성 높음</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>KODEX 국고채10년</strong> (20%) — 안전자산, 안정적 수익</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>예금형 상품</strong> (10%) — 원리금보장, 안전자산 비중 채우기</p>
      </GreenBox>

      <p style={body}>
        위험자산(S&P500 + 나스닥100)이 70%, 안전자산(국고채 + 예금)이 30%로 구성돼요.
        매달 같은 금액을 적립식으로 투자하면 시장 등락에 흔들리지 않아도 돼요.
      </p>

      <Divider />

      <H2>위험자산 70% 한도, 꼭 지켜야 해요</H2>
      <p style={body}>
        퇴직연금에서 가장 중요한 규정이에요.
        적립금의 최소 30%는 반드시 안전자산에 투자해야 해요.
        주식형 ETF는 전부 위험자산으로 분류되니까 최대 70%까지만 담을 수 있어요.
      </p>

      <SectionBadge>자산 분류 기준</SectionBadge>
      <BorderBox title="위험자산 vs 안전자산">
        <p style={{ ...body, marginBottom: 8 }}><strong>위험자산 (최대 70%)</strong></p>
        <p style={{ ...body, marginBottom: 8 }}>주식형 ETF (TIGER S&P500, KODEX 나스닥100, KODEX 고배당 등)</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>안전자산 (최소 30%)</strong></p>
        <p style={{ ...body, marginBottom: 0 }}>채권형 ETF (KODEX 국고채10년, TIGER 단기채권 등), 예금형 상품, 원리금보장상품</p>
      </BorderBox>

      <Divider />

      <H2>투자 전 체크포인트</H2>
      <p style={body}>
        퇴직연금 ETF 투자를 시작하기 전에 아래 항목을 확인하세요.
        특히 DB형은 ETF 투자가 안 되니까 본인 계좌 유형을 먼저 확인해야 해요.
      </p>

      <SectionBadge>확인 항목</SectionBadge>
      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성했어요. ETF 수익률은 보장되지 않으며 원금 손실 가능성이 있어요. 투자 결정은 본인 판단에 따르세요." />
    </ArticleLayout>
  );
}
