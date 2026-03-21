"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     비트코인·이더리움을 거래 중이거나 수익이 난 상태에서 2027년부터 세금을 내야 한다는 소식을 듣고 구체적인 세율과 신고 방법을 알고 싶은 투자자
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내 가상자산 수익에 세금이 얼마나 붙는지 계산하고, 2028년 5월 신고를 준비한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     2027년 1월 시행 확정, 22% 세율, 250만원 기본공제, 이동평균법 취득가액 계산, CARF 해외 거래소 정보교환, 손익통산·이월 불가
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 세율 수치 + BorderBox로 계산 예시 + Steps로 신고 절차 + DocTable로 타임라인

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TIMELINE_TABLE = {
  headers: ["시점", "내용"],
  rows: [
    ["2026년", "거래 정보 수집 시작 (CARF). 과세는 안 됨"],
    ["2027년 1월 1일", "가상자산 과세 시행. 이후 양도·대여 소득부터 과세"],
    ["2027년 4월", "2026년 거래 정보 국세청 보고 (CARF)"],
    ["2027년 중", "48개국 정보 교환 완료"],
    ["2028년 5월", "2027년 가상자산 소득 종합소득세 신고"],
  ],
};

const REPORT_STEPS = [
  { title: "거래 내역 다운로드", desc: "업비트·빗썸 등 거래소에서 1년치 거래 내역을 엑셀로 다운받아요. 해외 거래소(바이낸스 등)도 마찬가지예요." },
  { title: "양도차익 계산", desc: "매도 금액 - 매수 금액(이동평균법) - 수수료 = 양도차익. 여러 코인 손익을 합산해요." },
  { title: "기본공제 250만원 차감", desc: "연간 순이익에서 250만원을 빼요. 250만원 이하면 세금 0원이에요." },
  { title: "홈택스에서 기타소득 신고", desc: "다음해 5월 종합소득세 신고 기간에 홈택스에서 기타소득으로 신고하면 돼요." },
];

const FAQS = [
  { q: "2026년에 비트코인 팔아서 수익 났으면 세금 내야 하나요?", a: "아니에요. 2026년 12월 31일까지는 과세 안 돼요. 가상자산으로 얼마를 벌든 세금 0원이에요. 2027년 1월 1일 이후 양도분부터 과세돼요." },
  { q: "250만원 이하 수익은 세금 안 내도 되나요?", a: "맞아요. 연간 순이익 250만원까지는 기본공제로 비과세예요. 251만원부터 22% 과세되는 구조예요." },
  { q: "해외 거래소 써도 국세청이 알아요?", a: "2027년부터 CARF로 48개국이 가상자산 거래 정보를 자동 교환해요. 바이낸스·코인베이스 등에서 한국인 거래 내역이 국세청에 보고돼요." },
  { q: "비트코인 손실이랑 이더리움 이익을 합산할 수 있나요?", a: "같은 해 안에서 가상자산끼리 손익통산이 돼요. 비트코인 -300만원, 이더리움 +800만원이면 순이익 500만원으로 계산해요." },
  { q: "올해 손실을 내년 이익에서 빼나요?", a: "안 돼요. 가상자산은 손실 이월이 안 돼요. 2027년 손실 1,000만원은 2028년 이익에서 못 빼요. 주식과 다른 점이에요." },
  { q: "스테이킹·에어드롭 수익도 과세되나요?", a: "네. 가상자산 대여 소득(스테이킹 보상, DeFi 이자)과 에어드롭도 기타소득으로 과세돼요. 양도 소득과 합산돼서 250만원 공제가 적용돼요." },
  { q: "신고 안 하면 어떻게 되나요?", a: "무신고 가산세 20%, 부정 무신고는 40%예요. 납부 지연 시 하루 0.022% 가산세가 추가로 붙어요." },
];

const SOURCES = [
  { name: "국세청 가상자산소득 과세 개요", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40370&cntntsId=238935" },
  { name: "소득세법 제21조·제37조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스 종합소득세 신고", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-IRP-세액공제", title: "연말정산 IRP 세액공제", description: "IRP로 절세하는 연말정산 전략." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득 시 내야 하는 세금 구조." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "세금 신고 전반의 기초." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 가상자산 · 과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가상자산 세금, 2027년부터 22% 과세<br />
        계산법부터 신고 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        비트코인이나 이더리움 팔아서 수익이 났는데, 세금을 내야 하는 건지 헷갈리죠.
      </p>
      <p style={body}>
        2026년까지는 과세 안 돼요. 하지만{" "}
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40370&cntntsId=238935" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 공식 안내</a>에 따르면{" "}
        <strong>2027년 1월 1일부터 가상자산 양도차익에 22% 세금</strong>이 붙어요. 연 250만원 공제 후 과세되고, 해외 거래소 거래도 CARF로 국세청이 파악하게 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 세금 구조 */}
      <H2>가상자산 세금, 핵심 구조가 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 개정</a>으로 2027년 1월 1일 이후 양도·대여 소득부터 <strong>기타소득</strong>으로 과세돼요. 주식(양도소득세)이나 부동산과는 소득 분류가 달라요.
      </p>

      <GreenBox>
        시행일: 2027년 1월 1일{"\n"}
        세율: 22% (소득세 20% + 지방소득세 2%){"\n"}
        기본공제: 연 250만원 (순이익 기준){"\n"}
        과세 분류: 기타소득 (분리과세){"\n"}
        신고 시기: 다음해 5월 종합소득세 신고
      </GreenBox>

      <p style={body}>
        단일세율이라서 양도차익이 300만원이든 3억원이든 22% 고정이에요. 누진세 구조가 아니니까 계산이 단순해요.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 계산 예시 */}
      <H2>내 수익에서 세금이 얼마나 나오나요?</H2>
      <p style={body}>
        계산 공식은 간단해요. <strong>(매도 금액 - 매수 금액 - 수수료 - 250만원) x 22%</strong>예요.
      </p>

      <BorderBox>
        <strong>계산 예시 1: 순이익 990만원</strong><br />
        매도 2,000만원 - 매수 1,000만원 - 수수료 10만원 = 양도차익 990만원<br />
        990만원 - 250만원(기본공제) = 740만원<br />
        740만원 x 22% = <strong>세금 162.8만원</strong>
      </BorderBox>

      <p style={body}>
        같은 해에 여러 코인을 거래했으면 <strong>손익통산</strong>이 돼요. 비트코인 +800만원, 이더리움 -300만원이면 순이익은 500만원이에요. 여기서 250만원 빼면 250만원에 22% 과세 = 세금 55만원이에요.
      </p>
      <p style={body}>
        다만 <strong>다음 해로 손실 이월은 안 돼요</strong>. 2027년에 1,000만원 손해 보고 2028년에 1,000만원 벌어도, 2028년 이익에서 전년 손실을 못 빼요. 주식은 되는데 가상자산은 안 되는 부분이에요.
      </p>

      <Divider />

      {/* H2-3: 취득가액 계산 */}
      <H2>2027년 전에 산 코인은 취득가를 어떻게 잡나요?</H2>
      <p style={body}>
        원칙은 <strong>이동평균법</strong>이에요. 여러 번 매수했으면 평균 단가로 취득가를 산출해요.
      </p>

      <BorderBox>
        <strong>2024년 12월 31일 이전 매수분 특례</strong><br />
        2024년 12월 31일 시가와 실제 취득가 중 큰 금액을 취득가로 인정<br />
        예) 2020년 1,000만원에 매수 → 2024년 말 시가 8,000만원 → 취득가 8,000만원 적용<br />
        과세 시작 전 수익에 소급 과세하지 않겠다는 취지예요
      </BorderBox>

      <p style={body}>
        거래 기록은 <strong>5년 이상</strong> 보관해야 해요. 업비트·빗썸 같은 국내 거래소에서 엑셀로 다운받아 저장하고, 해외 거래소도 마찬가지예요. 취득가 증빙이 안 되면 국세청이 불리하게 잡을 수 있어요.
      </p>

      <Divider />

      {/* H2-4: CARF 해외 거래소 */}
      <H2>해외 거래소 써도 국세청이 파악하나요?</H2>
      <p style={body}>
        파악해요. CARF(Crypto-Asset Reporting Framework)가 2027년부터 시행돼요. OECD가 만든 국제 표준으로, <strong>48개국</strong>이 가상자산 거래 정보를 자동으로 교환하는 시스템이에요.
      </p>

      <GreenBox>
        CARF 작동 방식:{"\n"}
        2026년 거래 내역 → 해외 거래소가 2027년 4월까지 보고{"\n"}
        → 48개국 세무당국 정보 교환{"\n"}
        → 한국 국세청이 바이낸스·코인베이스 한국인 거래 파악
      </GreenBox>

      <p style={body}>
        이름, 주소, 생년월일, 납세자번호, 연간 거래 내역이 전부 넘어가요. 숨길 수 없으니 처음부터 정확하게 신고하는 게 현명해요.
      </p>

      <Divider />

      {/* H2-5: 신고 절차 */}
      <H2>가상자산 세금 신고는 어떻게 하나요?</H2>
      <p style={body}>
        국내 거래소에서 원천징수를 안 해요. 본인이 직접{" "}
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 신고해야 해요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <p style={body}>
        신고 안 하면 무신고 가산세 20%(부정 무신고 40%)가 붙고, 납부 지연 시 하루 0.022% 가산세가 추가돼요.
      </p>

      <Divider />

      {/* H2-6: 과세 타임라인 */}
      <H2>과세 일정 한눈에 보기</H2>
      <SectionBadge>가상자산 과세 타임라인</SectionBadge>
      <DocTable headers={TIMELINE_TABLE.headers} rows={TIMELINE_TABLE.rows} />

      <p style={body}>
        지금부터 거래 기록을 잘 관리해야 해요. 2026년부터 CARF 정보 수집이 시작되니까, 이미 모든 거래가 추적되고 있는 셈이에요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>가상자산 세금, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 개정안과 국세청 안내를 바탕으로 작성했어요. 가상자산 과세 제도는 국회 논의에 따라 변경될 수 있으니 최신 정보는 국세청(126)에서 확인해보세요." />
    </ArticleLayout>
  );
}
