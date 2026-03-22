"use client";

// Q1. 은행 퇴직연금 수수료가 비싸서 증권사로 옮기고 싶은데 방법을 모르는 상황
// Q2. 퇴직연금을 다른 금융사로 이전(실물이전 포함) 완료하기
// Q3. 동일 제도 내만 이전 가능(DB→DB, DC→DC, IRP→IRP), 실물이전은 2024.10 시행, 최소 3영업일 소요, 전액이전만 가능
// Q4. Steps(이전 절차) + GreenBox(실물이전 vs 일반이전 비교) + Checklist(이전 전 확인사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "퇴직연금 이전하면 수수료 내나요?", a: "이전 수수료는 무료예요. 새 금융사의 연간 운용 수수료만 발생하는데, 증권사는 비대면 가입 시 0%인 곳이 많아요." },
  { q: "실물이전이랑 일반이전 뭐가 달라요?", a: "일반이전은 보유 상품을 다 팔고 현금으로 옮겨요. 실물이전은 ETF·펀드를 매도 없이 그대로 옮겨요. 가격 변동 위험이 없어요." },
  { q: "DB형에서 DC형으로 바꾸면서 이전할 수 있나요?", a: "안 돼요. 같은 제도 내에서만 이전 가능해요. 제도 변경은 회사에 별도로 신청해야 해요." },
  { q: "이전 중에 ETF 거래할 수 있나요?", a: "이전 기간(3~10영업일) 동안 기존 계좌 거래가 정지돼요. 급한 매매가 있으면 이전 신청 전에 먼저 처리하세요." },
  { q: "보험사 상품도 실물이전 되나요?", a: "보험 상품이나 금융사 자체 상품은 실물이전이 안 될 수 있어요. 일반 ETF, 공모펀드, 예금은 대부분 가능해요." },
  { q: "일부 금액만 이전할 수 있나요?", a: "아니요, 전액이전만 가능해요. 일부만 옮기려면 중도인출로 현금을 먼저 빼고 나머지를 이전해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부 퇴직연금 실물이전 안내", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=17141" },
    { label: "금융투자교육원 퇴직연금 실물이전 유의사항", url: "https://eiec.kdi.re.kr/policy/materialView.do?num=259367&cat=epic1" },
  ]},
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방법 비교", description: "일시금 vs 연금, 어떻게 받는 게 유리한지 비교해요." },
  { slug: "IRP-개인퇴직계좌-세제-혜택", title: "IRP 세액공제 혜택", description: "IRP 납입하면 최대 115.5만원 세액공제 받아요." },
  { slug: "퇴직연금-ETF-추천-안전자산-배당-상품", title: "퇴직연금 ETF 추천", description: "퇴직연금에서 ETF로 수익 내는 전략이에요." },
];

const TRANSFER_STEPS = [
  { title: "새 금융사에서 퇴직연금 계좌 개설", desc: "옮기려는 증권사 앱을 다운로드하고 신분증, 기본 정보를 입력해서 계좌를 개설해요. 10분이면 돼요.", tip: "비대면 개설 시 수수료 0% 혜택 확인" },
  { title: "앱에서 '퇴직연금 이전' 메뉴 진입", desc: "새 금융사 앱에서 퇴직연금 이전 메뉴를 찾아요. 기존 금융사 이름과 계좌번호를 입력하고, 일반이전 또는 실물이전을 선택해요." },
  { title: "이전 가능 상품 확인 후 신청", desc: "실물이전 선택 시 이전 가능한 상품 목록이 자동 표시돼요. 본인 인증을 완료하면 신청 끝이에요." },
  { title: "기존 금융사에서 이전 동의", desc: "기존 금융사에서 SMS나 앱 푸시로 이전 동의 요청이 와요. 동의 버튼을 누르면 이전이 시작돼요." },
  { title: "이전 완료 확인", desc: "3~10영업일 후 새 금융사 앱에서 잔액과 보유 상품을 확인해요. 실물이전이면 상품이 그대로, 일반이전이면 현금으로 들어와 있어요.", tip: "수량·평가액이 정확히 일치하는지 확인" },
];

const BEFORE_CHECKLIST = [
  "같은 제도(DB→DB, DC→DC, IRP→IRP)인지 확인했나요?",
  "이전 기간 중 매매 정지되는 거 알고 있나요?",
  "은행 대출 우대금리 조건에 퇴직연금 유지가 있는지 확인했나요?",
  "보험사 상품 중 실물이전 안 되는 상품이 있는지 확인했나요?",
  "새 금융사의 수수료 정책(비대면 0% 등)을 확인했나요?",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 이전 절차<br />
        실물이전으로 수수료 0원 만드는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행 퇴직연금 수수료가 연 0.2~0.4%씩 나가는 거 알고 계시죠?
        20년 넣어두면 복리로 수백만원이 빠져나가요.
        2024년 10월부터 실물이전이 가능해져서, ETF나 펀드를 매도하지 않고도 증권사로 옮길 수 있게 됐어요.
        비대면 앱에서 10분이면 신청 끝이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>실물이전 vs 일반이전, 뭐가 다를까?</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=17141" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용노동부</a>에서
        2024년 10월 31일부터 퇴직연금 실물이전 서비스를 시작했어요.
        기존에는 보유 상품을 전부 팔고 현금으로 옮기는 방법(일반이전)밖에 없었는데, 이제 상품 그대로 옮길 수 있어요.
      </p>

      <GreenBox title="이전 방식 비교">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>항목</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>일반이전</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>실물이전</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["상품 매도", "필수 (전부 현금화)", "불필요"],
              ["가격 변동 위험", "있음", "없음"],
              ["소요 기간", "5~7영업일", "3~10영업일"],
              ["이전 수수료", "무료", "무료"],
              ["가능 상품", "전부", "ETF·공모펀드·예금"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px", fontWeight: 500 }}>{label}</td>
                <td style={{ padding: "8px 6px" }}>{a}</td>
                <td style={{ padding: "8px 6px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        보험 상품이나 금융사 자체 상품은 실물이전이 안 돼요. 이런 상품은 일반이전으로 처리되고, 나머지만 실물이전돼요.
      </p>

      <Divider />

      <H2>퇴직연금 이전하는 절차</H2>
      <p style={body}>
        비대면으로 앱에서 10분이면 신청 완료돼요. 은행 창구에 갈 필요 없어요.
      </p>

      <Steps steps={TRANSFER_STEPS} />

      <Divider />

      <H2>이전 전에 꼭 확인할 것</H2>
      <p style={body}>
        이전이 항상 유리한 건 아니에요.
        은행 대출을 받고 있다면 퇴직연금 유지 조건으로 금리 0.1~0.3%를 깎아주는 경우가 있어요.
        대출 금액이 크면 이 우대금리가 수수료 절감보다 이득일 수 있어요.
      </p>

      <Checklist items={BEFORE_CHECKLIST} />

      <Divider />
      <ArticleAd position="middle" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 퇴직연금 실물이전 제도를 바탕으로 작성했어요. 금융사별 세부 조건은 다를 수 있으니 해당 금융사에 문의하세요." />
    </ArticleLayout>
  );
}
