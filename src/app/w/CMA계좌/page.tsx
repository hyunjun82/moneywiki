"use client";

// Q1. 은행 입출금 통장 이자가 너무 낮아서 더 높은 금리를 찾는 상황
// Q2. CMA 계좌를 개설해서 여유 자금에 매일 이자를 받는 것
// Q3. CMA 3가지 유형 차이, 2026년 금리 수준, 수수료 혜택, 개설 방법
// Q4. 비교표(CMA vs 은행 통장) + Steps(개설 방법) + GreenBox

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TYPE_TABLE = [
  { type: "RP형", desc: "채권을 매수·매도하는 방식", rate: "연 3.0% 전후", safety: "증권사별 차이 있음", recommend: "가장 많이 선택" },
  { type: "발행어음형", desc: "증권사 발행 어음에 투자", rate: "연 2.8~3.2%", safety: "증권사 신용 기반", recommend: "대형 증권사 적합" },
  { type: "MMF형", desc: "단기 금융상품 펀드 연결", rate: "시장 금리 연동", safety: "원금 보장 아님", recommend: "금리 변동 체험용" },
];

const STEPS = [
  {
    title: "증권사 앱 다운로드 및 회원가입",
    desc: "KB증권, 신한투자증권, 한국투자증권, 미래에셋증권 등 대부분 증권사에서 CMA를 제공해요. 금리와 수수료 혜택이 증권사마다 달라서 비교 후 선택하세요. 금융감독원 금융상품 비교 사이트(finlife.fss.or.kr)에서 확인할 수 있어요.",
    tip: "이미 거래 중인 증권사가 있다면 신규 개설 없이 기존 계좌에 CMA 상품을 추가할 수 있어요",
  },
  {
    title: "비대면 계좌 개설 신청",
    desc: "앱에서 '계좌 개설' 또는 '비대면 계좌 개설' 메뉴를 찾아요. 본인 명의 휴대폰 번호와 신분증 사진이 필요해요. 주민등록증이나 운전면허증을 찍어서 업로드하면 돼요.",
    tip: "신분증 사진은 빛 반사 없이 밝은 곳에서 찍어야 인식이 잘 돼요",
  },
  {
    title: "본인 인증 및 CMA 상품 선택",
    desc: "약관 동의 후 CMA 상품 유형을 선택해요. RP형, 발행어음형, MMF형 중에서 고르면 되는데, 가장 많이 선택하는 건 RP형이에요. 수수료 혜택 조건(이체 수수료 무료, ATM 출금 무료)도 이 단계에서 설정해요.",
    tip: "어떤 유형이 좋은지 모르겠다면 RP형을 선택하는 게 가장 무난해요",
  },
  {
    title: "다음 날 계좌 활성화 및 입금",
    desc: "신청 다음 날이면 계좌가 활성화돼요. 기존 은행 계좌에서 이체해서 잔액을 채우면 바로 이자가 붙기 시작해요. 매일 이자가 계산되기 때문에 주말, 공휴일도 이자가 붙어요.",
    tip: "처음 입금 후 하루가 지나면 이자가 잔액에 더해진 걸 확인할 수 있어요",
  },
];

const FAQS = [
  {
    q: "CMA 계좌는 예금자 보호가 되나요?",
    a: "RP형과 발행어음형은 예금자보호법 대상이 아니에요. 은행 예금과 달리 증권사가 파산하면 원금 손실이 생길 수 있어요. 다만 RP형은 채권을 담보로 하기 때문에 실제 손실 위험은 낮아요. 걱정된다면 대형 증권사를 선택하는 게 좋아요.",
  },
  {
    q: "CMA 금리가 은행 예금보다 높나요?",
    a: "일반 입출금 통장보다는 훨씬 높아요. 은행 보통예금이 연 0.1% 수준인데, CMA는 2026년 기준 연 3.0% 전후예요. 다만 정기예금과 비교하면 비슷하거나 조금 낮을 수 있어요. 입출금이 자유로운 조건에서 이 정도 금리를 받는 게 장점이에요.",
  },
  {
    q: "공과금 자동이체나 급여 이체가 가능한가요?",
    a: "증권사에 따라 달라요. 일부 증권사는 공과금 자동이체가 지원되지 않을 수 있어요. 급여 이체는 대부분 가능해요. 월급 통장은 은행에 두고, 여유 자금을 CMA로 옮겨서 금리를 받는 방식이 가장 많이 쓰이는 방법이에요.",
  },
  {
    q: "CMA에서 주식 투자도 바로 할 수 있나요?",
    a: "같은 증권사 계좌면 자동으로 연결돼요. CMA 잔액을 주식 매수 대금으로 바로 쓸 수 있어요. 주식을 매도하면 대금이 CMA로 돌아와서 바로 이자가 붙어요. 주식과 CMA를 하나의 계좌에서 관리하는 게 편리해요.",
  },
  {
    q: "ATM 출금 수수료가 무료인가요?",
    a: "조건을 충족하면 무료예요. 증권사마다 조건이 다르지만, 한국투자증권은 공과금 자동납부 1건 이상 신청 + 월 50만원 입금하면 모든 은행 ATM 출금이 365일 무료예요. 신한투자증권은 신한은행 ATM이 영업시간 내 무제한 무료예요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 금융상품 비교", url: "https://finlife.fss.or.kr" },
      { label: "한국투자증권 CMA 안내", url: "https://www.truefriend.com/main/mall/opencma/CmaInfo.jsp" },
      { label: "신한투자증권 CMA 안내", url: "https://www.shinhansec.com/mweb/fnin/fcma/ffcma0001" },
    ],
  },
];

const RELATED = [
  { slug: "계좌-개설-제한-해제", title: "계좌 개설 제한 해제 방법", description: "새 증권사 계좌 개설 후 이체가 막혔다면 한도제한계좌 해제 방법이에요." },
  { slug: "MMF투자", title: "MMF 투자 방법과 금리", description: "CMA MMF형과 연결되는 단기 금융상품이에요. 차이점을 정리했어요." },
  { slug: "예금금리비교", title: "예금 금리 비교", description: "CMA와 함께 고려할 만한 정기예금·파킹통장 금리 비교예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 증권 · CMA</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        CMA 계좌란? 금리·유형·개설 방법<br />
        한번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행 입출금 통장 이자가 거의 없다면 CMA를 고려해볼 만해요.
        증권사의 입출금 자유 통장인데, 매일 이자가 붙고 2026년 기준 연 3.0% 전후예요.
        은행 보통예금(연 0.1%)과 비교하면 1,000만원 넣었을 때 연간 이자 차이가 30만원 가까이 나요.
        앱에서 10분이면 개설할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>CMA 3가지 유형, 뭐가 다른가요?</H2>
      <p style={body}>
        CMA는 상품 구조에 따라 RP형, 발행어음형, MMF형으로 나뉘어요.
        대부분의 사람들은 RP형을 선택해요. 운용 방식이 가장 안정적이고 금리도 괜찮기 때문이에요.
      </p>

      <SectionBadge>CMA 유형별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>운용 방식</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>2026년 금리</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {TYPE_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1D9E75" }}>{row.type}</td>
                <td style={{ padding: "10px 12px" }}>{row.desc}</td>
                <td style={{ padding: "10px 12px" }}>{row.rate}</td>
                <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 13 }}>{row.recommend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        CMA vs 은행 보통예금 비교 (1,000만원, 1년)<br />
        은행 보통예금 연 0.1% → 이자 1만원 (세후 약 8,460원)<br />
        CMA RP형 연 3.0% → 이자 30만원 (세후 약 25만원)<br />
        같은 금액인데 이자가 25배 차이나요
      </GreenBox>

      <Divider />

      <H2>CMA 계좌 개설 방법 4단계</H2>
      <p style={body}>
        증권사 앱에서 신분증 하나로 10분이면 개설돼요.
        증권사 앱을 처음 써본다면 KB증권이나 신한투자증권처럼 은행 계열 증권사가 인터페이스가 익숙해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        수수료 혜택 조건 예시<br />
        한국투자증권: 공과금 자동납부 1건 + 월 50만원 입금 → 모든 은행 ATM 365일 무료<br />
        신한투자증권: 신한은행 온라인 이체 + 신한은행 ATM → 영업시간 내 무제한 무료<br />
        조건이 증권사마다 다르니 개설 전 각 증권사 앱에서 비교해보세요
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        CMA 계좌 관련 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 각 증권사 공시 자료를 바탕으로 작성됐어요. CMA 금리와 수수료 혜택 조건은 시장 상황과 증권사 정책에 따라 변경될 수 있으니 가입 전 해당 증권사에 문의하세요." />
    </ArticleLayout>
  );
}
