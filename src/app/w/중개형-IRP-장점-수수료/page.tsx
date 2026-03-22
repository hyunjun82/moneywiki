"use client";

// Q1. IRP 가입하려는데 중개형이 뭔지, 신탁형이랑 뭐가 다른지, 수수료가 정말 0%인지 확인하고 싶은 상황이에요.
// Q2. 중개형 IRP의 장점을 이해하고, 수수료 0% 증권사를 골라서 비대면으로 개설하는 행동.
// Q3. 신탁형 vs 중개형 차이, 수수료 무료 증권사 목록, 세액공제 한도(900만원·16.5%/13.2%), 안전자산 30% 규칙, 중도해지 불이익.
// Q4. GreenBox(핵심 비교) + BorderBox(수수료 비교) + Steps(개설 절차) + Checklist(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "수수료 0% 증권사 선택", desc: "미래에셋·삼성·KB·신한투자·한화증권 등 비대면 가입 시 수수료 0%인 곳을 고르세요.", tip: "미래에셋증권이 ETF 종류 최다로 인기가 많아요" },
  { title: "앱에서 IRP 개설 신청", desc: "증권사 앱 다운로드 → IRP 개설 메뉴 → 신분증·계좌·직장 정보 입력하면 10분이면 끝나요." },
  { title: "심사 후 계좌 활성화", desc: "1~2 영업일 내 승인 문자가 와요. 첫 입금 10만원 이상 하면 계좌가 활성화돼요." },
  { title: "투자 상품 선택", desc: "ETF, TDF, 채권 등에서 원하는 상품을 골라 매수하세요. 안전자산 30% 이상 유지해야 해요." },
];

const CAUTION_ITEMS = [
  "55세 전 해지하면 기타소득세 16.5% + 세액공제 환수당해요",
  "일부 인출 불가 — 전액 해지만 가능해요",
  "위험자산(주식형 ETF) 최대 70%까지만 가능, 나머지 30%는 안전자산",
  "비대면 가입했는데 수수료가 부과되는 경우 있으니 개설 후 꼭 확인하세요",
  "연금저축과 합산 900만원까지만 세액공제, 초과분은 이월 안 돼요",
];

const FAQS = [
  { q: "중개형이랑 신탁형 뭐가 더 나아요?", a: "투자에 관심 있으면 중개형이 훨씬 유리해요. 수수료 0%에 ETF 200개 이상 직접 매매할 수 있어요. 투자에 손 대기 싫으면 신탁형이 편하고요." },
  { q: "비대면 가입하면 정말 수수료 안 나오나요?", a: "네, 주요 증권사(미래에셋, 삼성, KB, 신한투자, 한화 등)는 비대면 가입 시 운용·자산관리 수수료가 평생 0원이에요." },
  { q: "ETF 매매할 때 수수료가 또 있나요?", a: "ETF 매매 수수료는 별도인데, 일부 증권사는 할인 또는 면제해줘요. 미래에셋증권이 이 부분에서 유리해요." },
  { q: "연금저축이랑 IRP 둘 다 해야 하나요?", a: "세액공제를 최대로 받으려면 둘 다 하는 게 좋아요. 연금저축 600만원 + IRP 300만원 = 총 900만원으로 세액공제 최대화할 수 있어요." },
  { q: "55세 전에 급하게 돈이 필요하면?", a: "전액 해지만 가능하고, 기타소득세 16.5%를 내야 해요. 세액공제 받은 금액도 환수당하니 손해가 커요. 긴급 자금은 별도로 마련해두세요." },
  { q: "배당소득세가 면제된다는 게 뭔가요?", a: "일반 계좌에서 ETF 배당 받으면 15.4% 세금을 떼요. IRP에서는 배당소득세 0%예요. 55세 이후 연금으로 받을 때 3.3~5.5%만 내면 돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "금융감독원 퇴직연금 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 연금계좌 세액공제", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875" },
    ],
  },
];

const RELATED = [
  { slug: "IRP계좌-가입-세액공제", title: "IRP 세액공제 한도", description: "연 900만원 세액공제 받는 방법을 정리했어요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제", description: "연금저축과 IRP를 함께 활용하는 절세 전략이에요." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금", description: "수령 방식에 따라 세금이 수백만원 차이 나요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중개형 IRP, 수수료 0%가 진짜인가요?<br />
        장점 5가지와 개설 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP 만들려고 알아보니까 중개형이 좋다는데, 정확히 뭐가 다른 걸까요?
        증권사에서 직접 ETF를 사고팔 수 있는 IRP예요. 비대면으로 가입하면 수수료가 진짜 0원이고,
        연간 최대 148.5만원 세액공제까지 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신탁형 vs 중개형, 뭐가 다를까요?</H2>
      <p style={body}>
        IRP에는 두 종류가 있어요. 은행·보험사가 운영하는 신탁형과 증권사가 운영하는 중개형이에요.
      </p>

      <SectionBadge>핵심 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>신탁형 (은행·보험사)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>중개형 (증권사)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["수수료", "연 0.1~0.3%", "비대면 가입 시 0%"],
              ["투자 선택지", "20~50개 (정해진 펀드만)", "200개 이상 (ETF·주식·채권)"],
              ["매매 방식", "환매 신청 후 3일 대기", "실시간 매매 가능"],
              ["운용 자유도", "낮음", "높음"],
              ["20년 누적 수수료", "200~400만원", "0원"],
            ].map(([item, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="중개형 IRP 장점 요약">
        · 수수료 0% (비대면 가입 시 평생 무료)<br />
        · ETF·채권 200개 이상 직접 선택<br />
        · 실시간 매매 가능 (타이밍 놓치지 않아요)<br />
        · 세액공제 최대 148.5만원 (총급여 5,500만원 이하 기준)<br />
        · 배당소득세 면제 (일반 계좌 15.4% → IRP 0%)
      </GreenBox>

      <Divider />

      <H2>세액공제, 얼마나 돌려받을까요?</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>에 따르면
        연금저축과 IRP를 합산해 연간 900만원까지 세액공제를 받을 수 있어요.
      </p>

      <BorderBox>
        연간 900만원 납입 시 세액공제 금액이에요.<br /><br />
        · 총급여 5,500만원 이하: <strong>16.5% = 148.5만원 환급</strong><br />
        · 총급여 5,500만원 초과: <strong>13.2% = 118.8만원 환급</strong><br /><br />
        5년이면 742.5만원, 20년이면 2,970만원이에요. 12월 31일까지 납입해야 해당 연도에 공제받아요.
      </BorderBox>

      <Divider />

      <H2>비대면 개설, 10분이면 끝나요</H2>
      <p style={body}>
        증권사 앱에서 바로 개설할 수 있어요. 신분증과 본인 명의 계좌만 있으면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이것만은 꼭 주의하세요</H2>
      <p style={body}>
        중개형 IRP가 좋지만, 모르고 가입하면 낭패를 볼 수 있는 부분이 있어요.
      </p>

      <Checklist items={CAUTION_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융감독원·국세청 자료를 바탕으로 작성됐어요. 증권사별 수수료 정책과 세액공제 한도는 변경될 수 있으니, 가입 전 해당 증권사에서 확인하세요." />
    </ArticleLayout>
  );
}
