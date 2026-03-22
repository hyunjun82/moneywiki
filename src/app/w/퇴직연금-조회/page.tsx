"use client";
// Q1. 퇴직연금이 얼마나 쌓여있는지 확인하고 싶은 직장인
// Q2. 조회 방법 확인 → 금융감독원 통합포털 or 은행앱에서 조회
// Q3. 조회 채널(통합포털/은행앱/고객센터), DB/DC 차이, 수령 방법
// Q4. Steps(조회 절차) + GreenBox(채널별 방법) + BorderBox(DB vs DC) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, Steps, ArticleLayout, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS = [
  { title: "금융감독원 통합연금포털 접속", desc: "100lifeplan.fss.or.kr에 접속해서 공동인증서로 로그인해요.", tip: "국민연금·퇴직연금·개인연금 한번에 조회 가능" },
  { title: "퇴직연금 잔액 확인", desc: "가입 유형(DB/DC/IRP)별 적립금과 운용 수익률을 확인할 수 있어요." },
  { title: "은행앱에서도 조회 가능", desc: "퇴직연금 가입 은행·증권사 앱에서 잔액·수익률을 실시간으로 확인해요." },
];

const FAQS = [
  { q: "퇴직연금이 어느 금융사에 있는지 모르겠어요", a: "금융감독원 통합연금포털에서 가입 현황을 조회하면 어떤 금융사에 가입돼 있는지 한번에 나와요." },
  { q: "DB형과 DC형은 뭐가 다른가요?", a: "DB(확정급여)형은 회사가 운용하고 퇴직 시 정해진 금액을 받아요. DC(확정기여)형은 본인이 운용하고 수익에 따라 수령액이 달라져요." },
  { q: "퇴직연금 중간에 찾을 수 있나요?", a: "원칙적으로 퇴직 전에는 인출이 안 돼요. 무주택자 주택구입, 본인·배우자 6개월 이상 요양 등 법정 사유가 있으면 중도인출 가능해요." },
  { q: "IRP 계좌도 조회되나요?", a: "네, 통합연금포털에서 IRP(개인형 퇴직연금)도 함께 조회돼요." },
  { q: "수익률이 마이너스면 어떻게 하나요?", a: "DC형이면 운용 상품을 변경할 수 있어요. 원리금 보장 상품으로 변경하면 손실을 막을 수 있어요." },
];

const REFERENCES = [
  { category: "기관", items: [
    { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    { label: "고용노동부 퇴직연금 안내", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "퇴직연금-db-dc-차이", title: "퇴직연금 DB DC 차이", description: "DB형 DC형 비교 설명이에요." },
  { slug: "퇴직연금-담보대출", title: "퇴직연금 담보대출", description: "퇴직연금 담보 대출 방법이에요." },
  { slug: "퇴직연금-세액공제", title: "퇴직연금 세액공제", description: "IRP 세액공제 한도예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 얼마나 쌓였을까?<br />잔액 조회 방법과 채널별 안내</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>회사 다니면서 퇴직연금이 얼마나 쌓였는지 한번도 안 봤다면 지금 확인해보세요. 금융감독원 통합포털에서 모든 연금을 한번에 조회할 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>이렇게 조회하면 돼요</H2>
      <p style={body}>온라인으로 3분이면 확인할 수 있어요.</p>
      <Steps steps={STEPS} />
      <H2>조회 채널 3가지</H2>
      <p style={body}>상황에 맞는 채널을 선택하세요.</p>
      <GreenBox>
        <strong>① 금감원 통합연금포털</strong> — 국민연금+퇴직연금+IRP 한번에 조회<br />
        <strong>② 퇴직연금 가입 금융사 앱</strong> — 잔액·수익률 실시간 확인<br />
        <strong>③ 회사 인사팀 문의</strong> — 가입 금융사·유형 확인 가능<br /><br />
        ★ 통합포털은 공동인증서(구 공인인증서) 필요
      </GreenBox>
      <H2>DB형 vs DC형, 뭐가 다를까</H2>
      <p style={body}>가입 유형에 따라 수령 방식이 달라요.</p>
      <BorderBox>
        <strong>DB형(확정급여)</strong>: 회사가 운용, 퇴직 시 근속연수 × 평균임금으로 정해진 금액 수령<br />
        <strong>DC형(확정기여)</strong>: 본인이 운용, 수익에 따라 수령액이 달라짐<br />
        <strong>IRP(개인형)</strong>: 퇴직금 수령 계좌 + 추가 납입으로 세액공제 가능<br /><br />
        ★ DC형은 운용 상품 선택이 중요해요. 원리금 보장 vs 실적 배당형
      </BorderBox>
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" /><Divider />
      <H2>자주 묻는 것들</H2><FAQ items={FAQS} /><Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성됐어요. 퇴직연금 상품과 수익률은 금융사마다 다르니 가입 금융사에 직접 확인하세요." />
    </ArticleLayout>
  );
}
