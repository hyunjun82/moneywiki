"use client";

// Q1. 주식은 무섭고 예금은 이자가 적은데, 채권이 안전하고 수익도 괜찮다길래 어떻게 시작하는지 알고 싶은 상황이에요.
// Q2. 채권의 기본 구조를 이해하고, 개인투자용 국채나 채권 ETF를 증권사 앱에서 매수하는 행동.
// Q3. 채권 종류(국채·회사채·금융채), 수익률 계산(표면금리+매매차익), 2026년 국채 금리, 개인투자용 국채 제도, 투자 방법(직접·ETF).
// Q4. GreenBox(핵심 수익률) + BorderBox(투자 방법 비교) + Steps(개인투자용 국채 매수 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "증권사 계좌 개설", desc: "미래에셋, 삼성, NH투자증권 등에서 비대면으로 계좌를 개설하세요. 이미 계좌가 있으면 바로 다음 단계로 가세요." },
  { title: "매월 발행 공고 확인", desc: "기획재정부에서 매월 발행 일정을 공고해요. 증권사 앱에서도 청약 공고를 확인할 수 있어요." },
  { title: "청약 신청", desc: "증권사 앱에서 개인투자용 국채 청약 메뉴를 찾아 원하는 만기(3년·5년·10년·20년물)를 선택하고 금액을 입력하세요.", tip: "선착순이 아니라 배정 방식이에요" },
  { title: "배정 확인 후 보유", desc: "청약 후 배정 결과를 확인하세요. 만기까지 보유하면 원금 + 이자를 받아요. 이표채 방식이라 1년마다 이자가 나와요." },
];

const FAQS = [
  { q: "채권 투자하면 원금 손실이 날 수 있나요?", a: "만기까지 보유하면 원금 손실 없어요. 중간에 팔면 시장 금리에 따라 가격이 변동돼서 손실이 날 수 있어요." },
  { q: "국채랑 회사채랑 뭐가 달라요?", a: "국채는 정부가 발행해서 가장 안전해요. 회사채는 기업이 발행하는 건데 기업 신용도에 따라 위험도가 달라요. 수익률은 회사채가 더 높지만 리스크도 커요." },
  { q: "개인투자용 국채는 어디서 사나요?", a: "미래에셋, 삼성, NH투자증권 등 증권사 앱에서 매월 청약할 수 있어요." },
  { q: "채권 ETF도 안전한가요?", a: "ETF는 시장 금리 변동에 따라 가격이 움직여요. 금리가 오르면 가격이 떨어질 수 있어서 만기 개념이 없는 만큼 원금 보장은 아니에요." },
  { q: "금리 하락기에 채권이 유리한 이유가 뭔가요?", a: "금리가 내리면 기존에 높은 이자를 주는 채권의 가치가 올라가요. 매매차익을 노릴 수 있어서 금리 하락기에 장기채권이 유리해요." },
  { q: "최소 투자 금액이 얼마예요?", a: "개인투자용 국채는 10만원부터, 채권 ETF는 1주 가격(보통 1~5만원)부터 시작할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "기획재정부 개인투자용 국채", url: "https://ktb.moef.go.kr/perIsuPlan.do" },
      { label: "금융투자협회 채권정보센터", url: "https://www.kofiabond.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "ETF-투자-초보자", title: "ETF 투자 초보자 가이드", description: "ETF의 기본 개념과 투자 방법을 안내해요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제", description: "연금저축에서 채권 ETF 투자하면 절세 효과까지 받아요." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리와 혜택", description: "채권 투자 전 대기 자금을 CMA에 넣어두면 이자를 받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 채권 · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        채권 투자, 수익률은 얼마나 될까?<br />
        국채 금리와 투자 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주식은 무섭고 예금 이자는 너무 적다면, 채권이 딱 중간이에요.
        정부나 기업한테 돈을 빌려주고 이자를 받는 구조라서 원금이 지켜지면서도 예금보다 수익률이 나아요.
        2026년 10년 국채 수익률은 3.51% 수준이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 채권 수익률, 지금 얼마예요?</H2>
      <p style={body}>
        <a href="https://www.kofiabond.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융투자협회 채권정보센터</a> 기준으로
        현재 주요 채권 수익률이에요.
      </p>

      <SectionBadge>2026년 3월 기준 국채 수익률</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>채권 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>수익률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>특징</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["한국 10년 국채", "3.51%", "가장 안전, 정부 보증"],
              ["미국 10년 국채", "4.23%", "달러 자산, 환율 변동 있음"],
              ["개인투자용 국채 10년", "4.41% (가산금리 포함)", "만기보유 시 연평균 5.4%"],
              ["개인투자용 국채 20년", "4.62% (가산금리 포함)", "만기보유 시 연평균 7.3%"],
            ].map(([type, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="개인투자용 국채가 유리한 이유">
        기획재정부가 매월 발행하는 개인투자용 국채는 표면금리에 가산금리가 붙어요.<br />
        10년물 기준 3.41% + 1.0% = <strong>4.41%</strong>, 연복리 적용 시 만기 수익률 54% (연평균 5.4%)예요.<br />
        2026년부터 이표채 방식으로 바뀌어서 <strong>1년마다 이자를 받을 수 있어요</strong>.
      </GreenBox>

      <Divider />

      <H2>채권 투자 방법, 2가지가 있어요</H2>
      <p style={body}>
        채권에 투자하는 방법은 직접 매수와 ETF를 통한 간접 투자로 나뉘어요.
      </p>

      <BorderBox>
        <strong>직접 매수</strong><br />
        · 개인투자용 국채: 매월 증권사에서 청약 (10만원부터)<br />
        · 회사채·금융채: 증권사 채권 메뉴에서 직접 매수 (보통 1천만원부터)<br />
        · 장점: 만기까지 보유하면 원금 보장, 확정 이자<br /><br />
        <strong>채권 ETF (간접 투자)</strong><br />
        · KODEX 국채선물10년, TIGER 미국채10년 등<br />
        · 장점: 소액(1주 1~5만원)부터 가능, 실시간 매매<br />
        · 주의: 시장 금리 변동에 따라 가격이 움직여서 원금 보장은 아님
      </BorderBox>

      <Divider />

      <H2>개인투자용 국채, 이렇게 사세요</H2>
      <p style={body}>
        <a href="https://ktb.moef.go.kr/perIsuPlan.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>기획재정부</a>에서
        매월 발행하는 개인투자용 국채는 증권사 앱에서 청약할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>금리 변동에 따른 투자 전략</H2>
      <p style={body}>
        채권 가격은 금리와 반대로 움직여요.
        금리가 내리면 채권 가격이 오르고, 금리가 오르면 가격이 떨어져요.
      </p>

      <BorderBox>
        · <strong>금리 하락기</strong>: 장기채권(10~20년물)이 유리 → 가격 상승으로 매매차익 가능<br />
        · <strong>금리 상승기</strong>: 단기채권(3~5년물)으로 짧게 보유 → 만기 후 높은 금리로 재투자<br />
        · <strong>분산 투자</strong>: 채권 60% + 주식 40% 조합이 안정적. 나이가 많을수록 채권 비중을 높이세요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 기획재정부·금융투자협회 자료를 바탕으로 작성됐어요. 채권 수익률은 시장 금리에 따라 변동되니, 투자 전 최신 수익률을 확인하세요." />
    </ArticleLayout>
  );
}
