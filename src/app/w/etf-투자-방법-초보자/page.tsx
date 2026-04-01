"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. ETF 투자를 시작하고 싶은 초보자가 어떻게 사는지, 수수료와 세금이 얼마인지 기본부터 알고 싶은 상황.
// Q2. 증권사 계좌 개설부터 ETF 매수까지 직접 할 수 있고, 수수료·세금 구조를 이해할 수 있어야 해요.
// Q3. ETF = 주식처럼 사고파는 펀드, 계좌 개설 → 종목 선택 → 매수, 수수료(매매+운용), 세금(배당소득세 15.4%, 해외 ETF 양도세 22%).
// Q4. GreenBox(ETF 정의) + Steps(투자 시작 절차) + BorderBox(수수료·세금 비교) + Checklist(초보자 체크) + FAQ
// MAP-INTRO: ETF 투자를 시작하고 싶은데 어떻게 사는 건지 기본부터 모르겠음
// MAP-TYPE: 절차
// MAP-H2: ETF가 뭔가요 > 투자 시작 절차 > 수수료 구조 > 세금 계산 > 초보자 체크리스트 > FAQ
// MAP-COMP: GreenBox > Steps > BorderBox > BorderBox > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const INVEST_STEPS = [
  { title: "증권사 계좌 개설", desc: "키움증권, 삼성증권, 미래에셋 등 증권사 앱에서 비대면 계좌를 개설하세요. 5분이면 돼요." },
  { title: "입금", desc: "개설한 계좌에 투자할 금액을 이체하세요. 소액(10만원)부터 가능해요." },
  { title: "ETF 종목 검색", desc: "증권사 앱에서 ETF를 검색하세요. 국내 대표 ETF는 KODEX 200, TIGER 미국S&P500 등이에요." },
  { title: "매수 주문", desc: "'매수' 버튼을 눌러 수량과 가격을 입력하세요. 시장가 주문이면 바로 체결돼요.", tip: "처음엔 소액으로 연습하는 게 좋아요" },
];

const BEGINNER_CHECK = [
  "증권사 계좌를 개설했어요",
  "투자 목적(노후 대비, 목돈 마련 등)을 정했어요",
  "월 투자 가능 금액을 정했어요",
  "국내 ETF와 해외 ETF 세금 차이를 이해했어요",
  "분산 투자의 중요성을 알고 있어요",
];

const FAQS = [
  { q: "ETF는 주식이에요 펀드예요?", a: "둘 다예요. 펀드인데 주식처럼 사고팔 수 있어요. 주식시장에 상장돼 있어서 실시간으로 거래 가능하고, 여러 종목에 분산 투자하는 펀드 구조예요." },
  { q: "ETF 최소 얼마부터 살 수 있나요?", a: "1주부터 살 수 있어요. 국내 ETF는 1주에 1~5만원 정도라 소액으로 시작 가능해요." },
  { q: "ETF 수수료는 얼마예요?", a: "매매 수수료(증권사별 다름, 보통 0.015~0.1%)와 운용 보수(연 0.05~0.5%)가 있어요. 일반 펀드(연 1~2%)보다 훨씬 저렴해요." },
  { q: "국내 ETF와 해외 ETF 세금이 다른가요?", a: "네. 국내 주식형 ETF는 매매차익 비과세(배당소득세만 15.4%). 해외 ETF나 국내 채권형 ETF는 매매차익에도 배당소득세 15.4%가 붙어요." },
  { q: "ETF 배당금도 받을 수 있나요?", a: "네, 분배금이라고 해요. 분기 또는 반기마다 지급하는 ETF가 있어요. 분배금에는 배당소득세 15.4%가 원천징수돼요." },
  { q: "ETF와 개별 주식 중 뭐가 나은가요?", a: "초보자에게는 ETF가 유리해요. 한 종목에 몰빵하는 리스크가 없고, 시장 전체에 분산 투자할 수 있어요. 공부하면서 개별 주식을 추가하는 게 좋아요." },
];

const REFS = [
  { category: "참고", items: [
    { label: "금융감독원 ETF 투자 안내", url: "https://www.fss.or.kr" },
    { label: "한국거래소 ETF 정보", url: "https://www.krx.co.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>재테크 · ETF · 투자</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ETF 투자, 초보자는 어떻게 시작하나요?<br />
        매수 방법부터 수수료·세금까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ETF는 주식처럼 사고팔 수 있는 펀드예요. 한 종목 사면 여러 기업에 분산 투자되니까 초보자에게 적합하죠.
        수수료도 일반 펀드보다 훨씬 저렴해요. 계좌 개설부터 매수까지, 수수료와 세금 구조를 정리했어요.
      </p>
      <ArticleAd position="intro" />
      <Divider />
      <H2>ETF가 뭔가요?</H2>
      <p style={body}>ETF(Exchange Traded Fund)는 거래소에 상장된 펀드예요. 코스피200 지수를 따라가는 ETF를 사면 200개 기업에 분산 투자하는 효과가 있어요. 주식처럼 실시간으로 사고팔 수 있고, 1주부터 소액 투자가 가능해요.</p>
      <GreenBox title="ETF 핵심">주식처럼 거래 + 펀드처럼 분산 투자 | 1주(1~5만원)부터 매수 가능 | 수수료 저렴 (연 0.05~0.5%) | 국내·해외·채권·원자재 등 다양</GreenBox>
      <Divider />
      <H2>어떻게 시작하나요?</H2>
      <p style={body}>증권사 계좌만 있으면 바로 시작할 수 있어요. 앱에서 5분이면 비대면 개설이 가능해요.</p>
      <Steps steps={INVEST_STEPS} />
      <Divider />
      <H2>수수료는 얼마예요?</H2>
      <p style={body}>ETF 투자 비용은 매매 수수료와 운용 보수 두 가지예요. 일반 펀드보다 훨씬 저렴해요.</p>
      <BorderBox title="ETF 수수료 구조">매매 수수료: 증권사별 0.015~0.1% (사고팔 때마다) | 운용 보수: 연 0.05~0.5% (자동 차감, 별도 납부 없음) | 일반 펀드 비교: 연 1~2% → ETF가 5~20배 저렴</BorderBox>
      <Divider />
      <H2>세금은 어떻게 되나요?</H2>
      <p style={body}>국내 주식형 ETF는 매매차익이 비과세예요. 배당(분배금)에만 15.4% 세금이 붙어요. 해외 ETF나 채권형 ETF는 매매차익에도 세금이 붙으니 주의하세요.</p>
      <BorderBox title="ETF 세금 비교">국내 주식형 ETF: 매매차익 비과세, 분배금 15.4% | 해외 ETF: 매매차익 22% (양도소득세 250만원 공제 후) | 국내 채권형·원자재 ETF: 매매차익 15.4% (배당소득세)</BorderBox>
      <Divider />
      <H2>초보자가 꼭 확인할 것들</H2>
      <p style={body}>ETF 투자를 시작하기 전에 아래 항목을 체크하세요.</p>
      <Checklist items={BEGINNER_CHECK} />
      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 투자 정보 제공 목적이며 특정 종목을 추천하지 않아요. 투자 결정은 본인의 판단과 책임 하에 하세요." />
    </div>
  );
}
