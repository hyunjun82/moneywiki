"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. DC형·IRP에 돈이 쌓여 있는데 예금만 넣고 있어서 손해 보는 게 아닐까 걱정하는 상황
// Q2. 나이와 위험 성향에 맞는 ETF·펀드 포트폴리오를 직접 설정할 수 있어야 함
// Q3. 70/30 규칙 의무, ETF vs TDF 비교, 나이별 전략, 세금 혜택, 주의사항
// Q4. 비교표 (ETF vs TDF) + 나이별 포트폴리오 표 + Checklist + FAQ

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CHECKLIST = [
  "안전자산 30% 이상 유지 확인 (근로자퇴직급여 보장법 의무)",
  "ETF 운용보수 연 0.5% 이하 상품 선택",
  "연 1~2회 리밸런싱: 주식 비중이 목표치 벗어나면 조정",
  "TDF 수수료 연 1% vs ETF 연 0.2% 비교 후 결정",
  "배당소득세 0% + 매매차익 과세이연 혜택 최대 활용",
  "단기 손실(-20%) 발생 시 패닉셀 금지, 장기 보유 유지",
];

const FAQS = [
  {
    q: "퇴직연금에서 주식 ETF는 최대 몇 퍼센트까지 넣을 수 있나요?",
    a: "위험자산(주식형 ETF·펀드)은 최대 70%까지만 가능해요. 근로자퇴직급여 보장법에 정해진 의무 비율이라 어기면 안 돼요. 나머지 30%는 채권이나 예금 같은 안전자산에 넣어야 해요.",
  },
  {
    q: "ETF와 TDF 중 뭐가 더 나은가요?",
    a: "수수료 기준으로는 ETF가 훨씬 유리해요. ETF는 연 0.1~0.5%, TDF는 연 1% 수준이에요. 3,000만원 기준으로 20년 누적하면 수백만원 차이가 나요. 직접 관리가 귀찮으면 TDF, 비용을 아끼고 싶으면 ETF예요.",
  },
  {
    q: "퇴직연금 계좌에서 배당금과 매매차익에 세금을 내나요?",
    a: "내지 않아요. 배당소득세도 없고 매매차익도 과세가 이연돼요. 55세 이후 연금으로 받을 때 3.3~5.5%만 내면 돼요. 일반 계좌 대비 엄청난 세금 혜택이에요.",
  },
  {
    q: "코스피200 ETF, S&P500 ETF 중 뭘 선택해야 하나요?",
    a: "분산 차원에서 둘 다 담는 게 좋아요. S&P500은 미국 대형주 500개, 코스피200은 한국 대형주 200개예요. 한쪽만 담으면 특정 국가 리스크가 집중돼요. 30대 공격형이라면 나스닥100 ETF도 함께 고려해볼 수 있어요.",
  },
  {
    q: "퇴직연금을 자주 사고팔면 수익이 더 늘어나나요?",
    a: "오히려 줄어요. 수수료가 누적되고, 타이밍을 맞추기 어렵기 때문에 잦은 거래는 손해예요. 최소 1년에 1~2번 리밸런싱 정도만 하면 충분해요.",
  },
  {
    q: "퇴직 직전에도 ETF를 계속 보유해야 하나요?",
    a: "퇴직 5년 전부터는 주식 비중을 점진적으로 줄이는 게 안전해요. 퇴직 시점에 주식이 폭락하면 수령액이 크게 줄 수 있기 때문이에요. 퇴직이 가까워질수록 채권과 예금 비중을 높이는 게 일반적인 전략이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법: 위험자산 투자 한도 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직연금 세제 혜택 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "DC형-퇴직연금-수령-운용수익-포함", title: "DC형 수령액, 운용수익 포함 계산법", description: "수익률별 수령 예상액 시뮬레이션을 확인해요." },
  { slug: "퇴직연금-수령-나이-55세-기준-조기-수령", title: "퇴직연금 수령 나이와 조기 수령 조건", description: "55세 기준과 연금·일시금 세금 차이를 비교해요." },
  { slug: "IRP계좌-가입-세액공제", title: "IRP 세액공제 한도와 절세 방법", description: "IRP 추가 납입으로 연말정산 환급받는 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · ETF · 운용 전략</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 ETF·펀드 운용 방법,<br />
        수익률 높이는 나이별 전략
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금 계좌에 돈을 예금에만 넣어두고 있으면 물가 상승분을 따라가기 어려워요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 정한 70:30 규칙 안에서 ETF로 운용하면 연 7~8% 수익도 노릴 수 있어요.
        3,000만원을 20년 동안 예금(연 3%)으로 굴리면 약 5,400만원, ETF(연 7%)로 굴리면 약 1억 1,600만원이 돼요.
        운용 방식 하나로 두 배 이상 차이가 나는 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직연금 투자의 기본 규칙: 70% vs 30%</H2>
      <p style={body}>
        위험자산(주식형 ETF·주식형 펀드)은 최대 70%까지만 넣을 수 있어요. 나머지 30%는 반드시 안전자산(채권 ETF, 정기예금, MMF)에 넣어야 해요.
        이 규칙은 선택이 아니라 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 정해진 의무예요.
      </p>
      <p style={body}>
        이 비율이 있는 이유는 원금을 완전히 잃는 상황을 방지하기 위해서예요. 2008년 금융위기 때 주식은 50% 폭락했지만 채권은 오히려 올랐어요.
        주식 70%, 안전자산 30%로 분산하면 시장이 폭락해도 일정 부분을 지킬 수 있어요.
      </p>

      <GreenBox>
        위험자산(주식형 ETF·펀드) 최대 70%,근로자퇴직급여 보장법 의무<br />
        안전자산(채권 ETF·예금) 최소 30%,어기면 법 위반<br />
        배당소득세 0%, 매매차익 과세이연,일반 계좌 대비 엄청난 세제 혜택
      </GreenBox>

      <Divider />

      <H2>ETF vs TDF: 수수료 차이가 20년 후 수백만원</H2>
      <p style={body}>
        ETF(상장지수펀드)와 TDF(타겟데이트펀드) 중 뭘 선택할지 많이 고민하죠. 가장 큰 차이는 수수료와 관리 편의성이에요.
        TDF는 은퇴 시점에 맞춰 자동으로 자산배분을 바꿔주지만, 운용보수가 연 1% 수준이에요.
        ETF는 직접 관리해야 하지만 운용보수가 연 0.1~0.5%로 훨씬 저렴해요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf8" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>ETF</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>TDF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>운용보수</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>연 0.1~0.5%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 1% 내외</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>관리 방식</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>직접 설정·리밸런싱</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>자동 리밸런싱</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>매매 자유도</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>실시간 매매 가능</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>환매 3일 소요</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>3,000만원 20년 수수료 누적</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>약 30~150만원</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>약 600만원 이상</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>추천 대상</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>비용 절감 원하는 분</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>관리 귀찮은 초보자</td>
            </tr>
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>나이별 권장 포트폴리오</H2>
      <p style={body}>
        퇴직까지 남은 기간에 따라 전략이 달라요. 젊을수록 손실을 회복할 시간이 충분하기 때문에 공격적으로 운용할 수 있어요.
        퇴직이 가까워질수록 안전자산 비중을 높여서 원금을 지키는 방향으로 전환해야 해요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf8" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>나이대</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주식형 ETF</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>채권 ETF</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>정기예금</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기대 수익률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>30대 (공격형)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>70%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>20%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>10%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 8~10%</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>40~50대 (균형형)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>50%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>30%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>20%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 6~7%</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>50대 후반 이상 (안전형)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>20%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>50%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>30%</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 4~5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BorderBox>
        주요 ETF 종류: 코스피200(한국 대형주), 나스닥100(미국 기술주), S&P500(미국 대형주 500개),
        국고채10년 ETF(안전자산), 회사채 AAA ETF(우량 기업 채권)
      </BorderBox>

      <Divider />

      <H2>운용할 때 꼭 지켜야 할 원칙</H2>
      <p style={body}>
        수익을 극대화하는 것만큼 원금을 지키는 것도 중요해요. 단기 손실에 놀라서 전부 매도하는 패닉셀이 가장 큰 실수예요.
        주식은 1년에 -20%도 빠질 수 있지만, 20년을 평균하면 연 7~8% 수익이 나요.
      </p>

      <SectionBadge>운용 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직연금 계좌에서는 배당금을 받아도 세금을 내지 않고,<br />
        ETF를 팔아서 수익이 나도 세금이 없어요.<br />
        55세 이후 연금 수령 시 3.3~5.5%만 내면 돼요. 일반 계좌 대비 세금 부담이 훨씬 적어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직연금 ETF 운용에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 금융감독원 자료를 바탕으로 작성됐어요. 수익률은 과거 데이터 기반 참고값이며 실제 투자 성과는 다를 수 있어요." />
    </ArticleLayout>
  );
}
