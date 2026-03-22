"use client";

// Q1. 펀드에 가입하려는 투자자가 판매수수료와 판매보수의 차이를 몰라서 비용 구조를 파악하려는 상황
// Q2. 수수료와 보수의 차이를 이해하고, A/C/S 클래스 중 자기에게 유리한 펀드를 선택한다
// Q3. 판매수수료(1회성, 선취/후취), 판매보수(매년 기준가 반영), 총보수(운용+판매+신탁+사무), 클래스별 비용 차이
// Q4. CompareTable(수수료 vs 보수) + GreenBox(클래스 선택 가이드) + BorderBox(총보수 구조) + Steps(비용 확인법) + FAQ
// MAP-INTRO: 펀드를 사려는데 수수료니 보수니 용어가 헷갈리죠
// MAP-TYPE: 비교형
// MAP-H2: 수수료와 보수 뭐가 다른가 > 펀드 클래스별 비용 > 총보수 구조 > 비용 확인하는 방법 > FAQ
// MAP-COMP: CompareTable > GreenBox > BorderBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "성격", optionA: "매매 대가 (1회성)", optionB: "관리 대가 (매년)" },
  { label: "부과 시점", optionA: "가입 시(선취) 또는 환매 시(후취)", optionB: "매일 기준가에 자동 반영" },
  { label: "법정 한도", optionA: "납입액의 2% 이내", optionB: "연평균가액의 1% 이내" },
  { label: "별도 지불", optionA: "투자금에서 직접 차감", optionB: "기준가에 녹아 있어 체감 안 됨" },
  { label: "투자 기간 영향", optionA: "1회만 내니까 장기 유리", optionB: "매년 누적되니까 장기 불리" },
  { label: "대표 클래스", optionA: "A클래스 (선취수수료형)", optionB: "C클래스 (수수료 없음, 보수 높음)" },
];

const STEPS_DATA = [
  {
    title: "투자설명서에서 총보수·수수료를 확인하세요",
    desc: "펀드 가입 전에 투자설명서의 '보수 및 수수료' 항목을 확인해요. 총보수(운용+판매+신탁+사무)와 별도 수수료가 명시돼 있어요. 같은 펀드라도 클래스에 따라 비용이 다르니 클래스별 비용표를 비교하세요.",
    tip: "금융투자협회 전자공시(dis.kofia.or.kr)에서 확인 가능",
  },
  {
    title: "클래스(A/C/S/E)를 비교하세요",
    desc: "A클래스는 선취수수료 있고 보수 낮음, C클래스는 수수료 없고 보수 높음, S·E클래스는 온라인 전용으로 보수가 가장 낮아요. 투자 기간에 따라 유리한 클래스가 다르니까, 3년 기준 총비용을 비교하는 게 좋아요.",
    tip: "3년 이상 장기 → A 또는 S/E, 1년 이하 단기 → C",
  },
  {
    title: "기준가 추이로 실제 비용 체감도를 확인하세요",
    desc: "보수는 기준가에 매일 반영되기 때문에 따로 돈이 빠져나가는 느낌이 안 돼요. 하지만 같은 자산을 운용해도 총보수가 높으면 수익률이 낮아져요. 연 0.5% 보수 차이도 10년이면 5% 이상 수익률 차이가 나요.",
    tip: "같은 지수 추종 ETF끼리 보수 차이 비교해 보세요",
  },
];

const FAQS = [
  { q: "판매수수료가 0%인 펀드는 공짜인가요?", a: "아니요, 판매수수료가 없어도 판매보수는 나가요. C클래스가 대표적인데, 선취수수료 대신 매년 판매보수가 높게 책정돼 있어요. 1년 미만 단기 투자에는 유리하지만, 장기로 가면 A클래스보다 비용이 더 많이 들어요." },
  { q: "보수가 기준가에 반영된다는 게 무슨 뜻이에요?", a: "펀드 기준가(NAV)를 매일 계산할 때 보수를 빼고 산출해요. 예를 들어 운용 수익이 연 5%인데 총보수가 1%면, 투자자가 받는 수익률은 약 4%예요. 별도로 돈이 빠지는 게 아니라 기준가 자체가 낮아지는 거죠." },
  { q: "ETF도 판매수수료가 있나요?", a: "ETF는 판매수수료가 없어요. 증권사에서 주식처럼 매매할 때 매매수수료(위탁수수료)만 내면 돼요. 대신 총보수(운용+기타)는 있고, 이것도 기준가에 매일 반영돼요. ETF 총보수는 보통 연 0.05~0.5% 수준으로 일반 펀드보다 낮아요." },
  { q: "S클래스, E클래스는 뭔가요?", a: "온라인 전용 클래스예요. S(super)는 온라인 판매, E(electronic)는 전자 판매를 뜻해요. 오프라인 창구 없이 인터넷·앱에서만 가입할 수 있는 대신 판매보수가 가장 낮아요. 같은 펀드라면 S·E클래스가 비용 면에서 제일 유리해요." },
  { q: "총보수가 연 1%면 적은 건가요?", a: "펀드 유형에 따라 달라요. 국내 주식형 펀드 평균 총보수가 약 1~1.5%, 해외 주식형은 1.5~2%예요. ETF는 0.05~0.5%이고요. 같은 유형 펀드끼리 비교해서 평균 이하면 합리적인 수준이에요." },
  { q: "환매수수료와 후취수수료는 같은 건가요?", a: "비슷하지만 다른 개념이에요. 후취수수료는 펀드 매도 시 판매사에 내는 판매 대가이고, 환매수수료는 단기 환매를 억제하기 위한 패널티예요. 환매수수료는 보통 90일 이내 환매 시 이익금의 70% 정도를 환수하고, 펀드 자산으로 귀속돼요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "자본시장과 금융투자업에 관한 법률 제76조", url: "https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" },
  ]},
  { category: "참고", items: [
    { label: "금융투자협회 전자공시", url: "https://dis.kofia.or.kr" },
    { label: "금융감독원 - 펀드 투자 비용절감 노하우", url: "https://www.fss.or.kr" },
  ]},
];

const RELATED = [
  { title: "ETF 투자 초보자 가이드", slug: "ETF-투자-초보자", description: "" },
  { title: "연금저축펀드 세액공제 한도", slug: "연금저축펀드-세액공제-한도", description: "" },
  { title: "퇴직연금 ETF 추천", slug: "퇴직연금-ETF-추천-안전자산-배당-상품", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>투자·펀드</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        펀드 판매수수료와 판매보수, 뭐가 다를까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>비용 구조와 클래스 선택법</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        펀드를 사려는데 수수료니 보수니 용어가 헷갈리죠.
        판매수수료는 가입할 때 한 번 내는 비용이고, 판매보수는 보유 기간 동안 매일 빠지는 비용이에요.
        같은 펀드라도 A클래스·C클래스에 따라 비용 구조가 완전히 달라지니까, 투자 기간에 맞춰 선택해야 해요.
      </p>
      <Divider />

      <H2>수수료와 보수, 뭐가 다른가요?</H2>
      <p style={body}>
        가장 큰 차이는 "한 번 내느냐, 매년 내느냐"예요.
        판매수수료는 가입 시(선취) 또는 환매 시(후취) 한 번만 내는 1회성 비용이에요.
        판매보수는 펀드를 들고 있는 동안 매일 기준가에서 빠지는 비용이고요.
      </p>
      <SectionBadge>핵심 비교</SectionBadge>
      <CompareTable titleA="판매수수료" titleB="판매보수" rows={COMPARE_ROWS} />
      <p style={body}>
        쉽게 말하면, 수수료는 입장료이고 보수는 관리비예요.
        장기 투자를 한다면 수수료를 한 번 내고 보수가 낮은 A클래스가 유리하고, 단기라면 수수료 없는 C클래스가 나아요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>펀드 클래스별 비용은 어떻게 다른가요?</H2>
      <p style={body}>
        같은 펀드인데 이름 끝에 A, C, S, E가 붙어 있죠.
        이게 클래스 구분이에요. 운용하는 자산은 같은데, 비용 구조만 다른 거예요.
        투자 기간에 따라 총비용이 달라지니까 꼭 비교해 보세요.
      </p>
      <GreenBox title="클래스별 선택 가이드">
        A클래스: 선취수수료 약 1% + 낮은 보수 → 3년 이상 장기 투자에 유리.
        C클래스: 수수료 0% + 높은 보수 → 1년 이하 단기 투자에 유리.
        S/E클래스: 온라인 전용, 보수 최저 → 기간 무관 가장 저렴.
        같은 펀드라면 S/E {">"} A {">"} C 순으로 장기 비용이 낮아요.
      </GreenBox>
      <p style={body}>
        온라인으로 <a href="/w/ETF-투자-초보자" style={{ color: "#1D9E75", textDecoration: "underline" }}>ETF</a>나 펀드에 가입한다면 S·E클래스를 우선 확인하세요.
        창구 가입보다 보수가 0.2~0.5%p 낮은 경우가 많아요.
      </p>
      <Divider />

      <H2>총보수 구조는 어떻게 되나요?</H2>
      <p style={body}>
        펀드를 운용하면 판매보수만 나가는 게 아니에요.
        운용보수·판매보수·신탁보수·사무보수가 모두 합쳐져서 "총보수"가 돼요.
        투자설명서에 나오는 총보수율(TER)을 확인하면 실제 비용을 알 수 있어요.
      </p>
      <SectionBadge>보수 구조</SectionBadge>
      <BorderBox title="펀드 총보수 구성">
        <p style={{ ...body, marginBottom: 6 }}><strong>운용보수</strong>: 자산운용사에 지급 (포트폴리오 운용 대가)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>판매보수</strong>: 판매사(은행·증권사)에 지급 (판매·관리 대가)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>신탁보수</strong>: 수탁사(신탁은행)에 지급 (자산 보관 대가)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>사무보수</strong>: 일반사무관리회사에 지급 (기준가 산출 등)</p>
        <p style={{ ...body, marginBottom: 6, fontWeight: 600 }}>총보수 = 운용 + 판매 + 신탁 + 사무 (전부 기준가에 반영)</p>
      </BorderBox>
      <p style={body}>
        보통 총보수의 절반 이상이 판매보수예요. 그래서 온라인 클래스(S/E)가 저렴한 거죠.
        연 0.5% 보수 차이도 10년이면 원금 대비 5% 이상 수익률 차이가 나니까 무시할 수 없어요.
      </p>
      <Divider />

      <H2>비용은 어디서 확인하나요?</H2>
      <p style={body}>
        펀드 비용은 투자설명서, 금융투자협회 전자공시, 판매사 앱에서 확인할 수 있어요.
        가입 전에 반드시 총보수와 수수료를 비교해 보세요.
      </p>
      <SectionBadge>확인 방법</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 자본시장법과 금융투자협회 자료를 바탕으로 작성했어요. 개별 펀드의 비용은 투자설명서에서 직접 확인하세요." />

      <CategoryButton label="투자·펀드" href="/categories/investment" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
