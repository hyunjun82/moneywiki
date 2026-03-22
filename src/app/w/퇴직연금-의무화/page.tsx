"use client";

// Q1. 퇴직금을 현금이 아닌 IRP로 받아야 한다는데, 왜 그런지 언제부터인지 궁금한 직장인
// Q2. 퇴직연금 의무화 대상인지 확인하고, IRP 수령 후 현금화하는 방법을 파악한다
// Q3. 2022.4월 시행, 55세 미만 퇴직자 의무, IRP 개설 절차, 현금 인출 방법, 예외(소액 등)
// Q4. GreenBox(핵심 정리) + Steps(IRP 개설~인출 절차) + BorderBox(예외 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "퇴사 전에 IRP 계좌를 개설하세요", desc: "은행, 증권사, 보험사 어디서든 IRP를 개설할 수 있어요. 퇴사일 전에 미리 만들어두면 퇴직금 입금이 빨라요. 수수료와 투자 상품 라인업을 비교해서 고르세요.", tip: "IRP 개설은 앱에서 10분이면 돼요" },
  { title: "회사에 IRP 계좌번호를 알려주세요", desc: "퇴사 시 회사에 IRP 계좌번호를 제출하면 퇴직금이 IRP로 입금돼요. 회사가 직접 송금하는 구조라서 본인이 이체할 필요 없어요." },
  { title: "현금이 필요하면 IRP에서 인출하세요", desc: "IRP에 입금된 퇴직금은 바로 인출할 수 있어요. 금융기관 앱에서 '퇴직금 인출' 메뉴를 이용하면 돼요. 인출 시 퇴직소득세가 원천징수돼요.", tip: "55세 이후 연금으로 받으면 세금이 30~40% 줄어요" },
];

const FAQS = [
  { q: "퇴직금을 현금으로 바로 받을 수 없나요?", a: "55세 미만이면 IRP로 받아야 해요. 하지만 IRP에 입금된 후 바로 인출할 수 있으니 사실상 현금 수령과 비슷해요. 인출 시 퇴직소득세만 빠져요." },
  { q: "55세 이상이면 현금으로 받을 수 있나요?", a: "네, 55세 이상은 IRP 없이 현금으로 바로 받을 수 있어요. 다만 IRP로 받아서 연금으로 수령하면 세금을 30~40% 절약할 수 있어요." },
  { q: "퇴직금이 소액이면 어떻게 되나요?", a: "퇴직금이 300만원 이하면 IRP 이체 의무가 면제돼요. 현금으로 바로 받을 수 있어요." },
  { q: "IRP에 넣어두면 뭐가 좋나요?", a: "55세 이후 연금으로 수령하면 퇴직소득세가 30~40% 감면돼요. 추가로 연간 900만원까지 세액공제(최대 148.5만원)도 받을 수 있어요." },
  { q: "IRP를 안 만들면 퇴직금을 못 받나요?", a: "회사에서 IRP 이체를 요청하는데 계좌가 없으면 퇴직금 지급이 지연돼요. 퇴사 전에 미리 개설해두는 게 좋아요." },
  { q: "어느 금융기관 IRP가 좋나요?", a: "수수료와 투자 상품 라인업을 비교해보세요. 증권사 IRP는 ETF 투자가 가능하고, 은행 IRP는 예금·펀드 중심이에요. 운용 수수료 무료 이벤트가 있는 곳도 있어요." },
];

const SOURCES = [
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "퇴직연금-종류", title: "퇴직연금 DB·DC·IRP 차이", description: "유형별 특징과 장단점 비교." },
  { slug: "퇴직연금-db-dc-전환", title: "퇴직연금 DB→DC 전환", description: "전환 방법과 주의사항." },
  { slug: "ISA계좌", title: "ISA 계좌 활용법", description: "절세 투자 계좌 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · IRP · 의무화</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 왜 IRP로 받아야 하나요?<br />
        퇴직연금 의무화와 현금 인출 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직금을 현금으로 안 주고 IRP로 보내준다는데, 왜 그런 거예요?"
      </p>
      <p style={body}>
        2022년 4월부터 55세 미만 퇴직자는 퇴직금을 <strong>IRP(개인형 퇴직연금)로 받는 게 의무</strong>예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 바뀌었거든요.
        걱정하지 마세요. IRP에 입금된 뒤 바로 현금으로 인출할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직연금 의무화, 누가 해당되나요?</H2>
      <p style={body}>55세 미만으로 퇴직하는 모든 근로자가 대상이에요. 퇴직금 300만원 이하 소액은 예외예요.</p>
      <GreenBox title="퇴직연금 의무화 핵심">
        {"시행: 2022년 4월~\n대상: 55세 미만 퇴직자 전원\n방법: 퇴직금을 IRP 계좌로 이체\n\n예외:\n· 55세 이상 퇴직자 → 현금 수령 가능\n· 퇴직금 300만원 이하 → 현금 수령 가능\n· 근로기간 1년 미만 → 퇴직금 자체 미발생\n\nIRP 입금 후 바로 인출 가능 → 실질적으로 현금화 OK"}
      </GreenBox>
      <CategoryButton label="퇴직연금 정보" count={10} href="/category/퇴직연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 개설부터 현금 인출까지</H2>
      <p style={body}>복잡하지 않아요. IRP 만들고 → 회사에 계좌 알려주고 → 입금 후 인출하면 끝이에요.</p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP에 그냥 두면 뭐가 좋나요?</H2>
      <p style={body}>바로 인출해도 되지만, 넣어두면 세금 혜택이 커요.</p>
      <BorderBox>
        <strong>IRP 유지 시 세금 혜택</strong>{"\n"}
        · 55세 이후 연금 수령 → 퇴직소득세 30~40% 감면{"\n"}
        · 추가 납입(연 900만원) → 세액공제 최대 148.5만원{"\n"}
        · 운용 수익 → 퇴직연금 계좌 내 비과세{"\n"}
        {"\n"}
        바로 인출하면?{"\n"}
        · 퇴직소득세 전액 원천징수{"\n"}
        · 세금 혜택 없음
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 근로자퇴직급여보장법 기준으로 작성했어요. 세액공제 한도, 세율 등은 법 개정에 따라 바뀔 수 있어요." />
    </ArticleLayout>
  );
}
