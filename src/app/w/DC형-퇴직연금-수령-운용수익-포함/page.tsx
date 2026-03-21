"use client";

// Q1. DC형 가입 중인데 수령액이 얼마나 될지, 운용수익이 포함되는지 궁금한 상황
// Q2. 수령 시점에 내 계좌에서 실제로 얼마가 나오는지 계산할 수 있어야 함
// Q3. 적립금 계산 방식, 운용수익 과세, 일시금 vs 연금 세금 차이, 수익률별 시뮬레이션
// Q4. 수익률별 수령액 비교표 + 세금 계산 구조 + Steps

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "회사가 매년 연봉의 1/12 이상 적립",
    desc: "근로자퇴직급여 보장법에 따라 회사는 매년 연봉의 최소 1/12을 DC 계좌에 넣어줘요. 월급 300만원이면 매달 25만원씩 들어오는 거예요. 이 금액이 적립금의 기준이에요.",
    tip: "앱에서 '적립 내역'을 확인해 연봉의 1/12 미만이면 인사팀에 문의하세요",
  },
  {
    title: "근로자가 직접 운용 (예금·펀드·ETF)",
    desc: "적립된 돈을 어디에 투자할지는 본인이 결정해요. 안전형은 DC 전용 정기예금(연 3~4%), 중간형은 채권 혼합형 펀드, 공격형은 주식형 ETF(코스피200, S&P500) 중에서 골라요.",
    tip: "위험자산(주식형)은 최대 70%까지만 가능해요. 안전자산 30%는 반드시 유지해야 해요",
  },
  {
    title: "55세 이후 일시금 또는 연금으로 수령",
    desc: "55세부터 계좌 잔액 전부를 받을 수 있어요. 일시금은 적립금에 퇴직소득세, 운용수익에 연금소득세 3.3~5.5%가 각각 붙어요. 연금으로 10년 이상 받으면 퇴직소득세를 30~40% 감면받아요.",
    tip: "급하지 않으면 연금 수령이 세금 면에서 유리해요",
    link: { label: "퇴직연금 수령 나이와 연금 신청 방법", href: "/w/퇴직연금-수령-나이-55세-기준-조기-수령" },
  },
];

const DOCS = [
  { name: "적립금 현황", required: true, where: "금융사 퇴직연금 앱 또는 금융감독원 통합연금포털" },
  { name: "운용 수익률 내역", required: true, where: "퇴직연금 앱 → 내 계좌 → 수익률 조회" },
  { name: "DC형 가입 확인서", required: false, where: "금융사 앱 또는 영업점 방문 발급" },
  { name: "퇴직소득원천징수영수증", required: false, where: "수령 시 금융사에서 자동 발급" },
];

const CHECKLIST = [
  "매달 적립금이 연봉 1/12 이상 들어오는지 확인",
  "안전자산 30% 이상 유지 여부 점검 (법적 의무)",
  "수익률별 수령 예상액 연 1~2회 시뮬레이션",
  "55세 전 중도인출 사유 해당 여부 파악 (주택 구입 등)",
  "이직 시 새 회사 DC형 또는 IRP로 이전 여부 결정",
  "연금 수령 10년 이상 분할로 퇴직소득세 30~40% 감면 설정",
];

const FAQS = [
  {
    q: "DC형 10년 근무하면 수령액이 얼마나 되나요?",
    a: "월급 300만원 기준 회사 적립금은 약 3,000만원(25만원 × 120개월)이에요. 여기에 운용수익이 더해져요. 연 5%로 굴렸다면 약 3,900만원, 연 7%면 약 4,300만원 정도 예상할 수 있어요.",
  },
  {
    q: "운용수익에도 세금을 내나요?",
    a: "네, 운용수익에는 연금소득세 3.3~5.5%가 붙어요. 900만원 수익이면 약 30~50만원 수준이에요. 일시금이든 연금이든 운용수익 세율은 같아요.",
  },
  {
    q: "손실이 나면 적립금보다 적게 받나요?",
    a: "맞아요. DC형은 투자 성과에 따라 수령액이 달라지기 때문에 손실이 나면 적립금보다 줄어들 수 있어요. DB형과 달리 손실 보전이 없어요.",
  },
  {
    q: "DC형 계좌에서 55세 전에 돈을 뺄 수 있나요?",
    a: "원칙적으로 불가해요. 무주택자 주택 구입, 6개월 이상 요양, 파산 선고 같은 부득이한 사유에만 인출할 수 있어요. 사유 없이 해지하면 기타소득세 16.5%가 부과돼요.",
  },
  {
    q: "이직하면 DC 계좌는 어떻게 되나요?",
    a: "퇴직하면 회사가 DC 적립금을 IRP로 이전해줘요. 새 회사에 DC형이 있으면 그쪽으로 옮기거나 IRP를 유지할 수 있어요. 직접 빼지 않는 한 계속 운용돼요.",
  },
  {
    q: "DB형보다 무조건 DC형이 유리한가요?",
    a: "수익률 기준으로 연 5% 이상 내면 DC형이 유리해요. 반대로 투자에 자신 없거나 손실 위험을 피하고 싶다면 DB형이 안정적이에요. 회사 임금 인상률도 비교해봐야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제20조: DC형 부담금 납입", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
      { label: "국세청: 퇴직연금 과세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-운용-방법-ETF-펀드-선택-전략", title: "퇴직연금 ETF·펀드 운용 전략", description: "나이별 자산배분과 수수료 차이를 비교했어요." },
  { slug: "퇴직연금-수령-나이-55세-기준-조기-수령", title: "퇴직연금 수령 나이와 조기 수령 조건", description: "55세 기준과 부득이한 사유 5가지를 정리했어요." },
  { slug: "퇴직연금-DB형-DC형-차이-수령액-운용-비교", title: "DB형 vs DC형 차이 비교", description: "수령액 기준으로 어떤 제도가 유리한지 비교해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · DC형 · 수령액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직연금 수령액,<br />
        운용수익 포함해서 얼마나 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형 퇴직연금 수령액은 회사가 넣어준 적립금에 내가 직접 굴린 운용수익을 더한 금액이에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제20조</a>에 따라 회사는 연봉의 최소 1/12를 매년 적립해야 해요.
        연 7% 수익을 내면 같은 근속연수의 DB형보다 30% 이상 많이 받을 수 있지만, 손실이 나면 그만큼 줄어드는 구조예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 수령액 구조: 적립금 + 운용수익</H2>
      <p style={body}>
        DC형은 수령액이 두 부분으로 나뉘어요. 회사가 적립한 원금과 본인이 투자해서 만든 운용수익이에요.
        월급 300만원으로 10년을 다니면 회사 적립금은 약 3,000만원(매달 25만원 × 120개월)이 쌓여요.
        여기에 운용수익이 더해져서 최종 수령액이 결정돼요.
      </p>
      <p style={body}>
        예금으로만 운용했다면(연 3~4%) 약 3,400만원, 주식형 ETF로 연 7%를 냈다면 약 4,300만원까지 늘어날 수 있어요.
        반대로 투자 손실이 나면 3,000만원 이하로 줄어들 수도 있어요. 운용 방식에 따라 수령액 격차가 수백만 원 이상 벌어지는 구조예요.
      </p>

      <GreenBox>
        DC형 수령액 = 회사 적립금 (연봉 × 1/12 이상) + 운용수익 (투자 성과에 따라 변동)<br />
        운용수익이 플러스면 DB형보다 유리, 마이너스면 불리<br />
        세금: 적립금 → 퇴직소득세, 운용수익 → 연금소득세 3.3~5.5%
      </GreenBox>

      <Divider />

      <H2>수익률별 수령액 시뮬레이션 (10년 근속, 월급 300만원)</H2>
      <p style={body}>
        아래 표는 월급 300만원, 10년 근속 기준으로 운용 수익률에 따라 예상 수령액이 어떻게 달라지는지 보여줘요.
        안전형으로만 운용해도 예금 이자 덕분에 원금보다 더 받을 수 있어요.
        공격형 ETF 투자를 잘 활용하면 같은 조건의 DB형 대비 30% 이상 차이가 날 수 있어요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf8" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>운용 방식</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>평균 수익률</th>
              <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예상 수령액</th>
              <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>적립금 대비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>정기예금 (안전형)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 3~4%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>약 3,600만원</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>+600만원</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>채권 혼합형 펀드</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>연 5%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>약 3,900만원</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>+900만원</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>주식형 ETF (공격형)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>연 7%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>약 4,300만원</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>+1,300만원</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>투자 손실</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>연 -3%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>약 2,600만원</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>-400만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BorderBox>
        회사 적립금 3,000만원 기준이에요. 실제 수령액은 금융사 앱의 수익률 조회 기능으로 확인하세요.
        수익률은 투자 상품과 시장 상황에 따라 달라지기 때문에 위 수치는 참고용이에요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수령 단계별 절차와 세금 구조</H2>
      <p style={body}>
        DC형 퇴직연금은 세 단계를 거쳐 수령액이 결정돼요. 적립, 운용, 수령 단계 각각에서 어떤 일이 일어나는지 알아야 최종적으로 얼마를 받는지 파악할 수 있어요.
        특히 수령 단계에서 일시금과 연금 중 무엇을 선택하느냐에 따라 세금 차이가 꽤 커요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>확인에 필요한 자료</H2>
      <p style={body}>
        내 DC 계좌 잔액과 수익률을 정기적으로 확인하는 게 중요해요. 금융사 앱 외에도 금융감독원 통합연금포털에서 모든 연금 계좌를 한눈에 볼 수 있어요.
        적립금이 연봉의 1/12보다 적게 들어온 달이 있다면 법 위반이기 때문에 반드시 확인해야 해요.
      </p>

      <SectionBadge>확인 자료 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DC형 수령액 관리 체크리스트</H2>
      <p style={body}>
        수령액을 극대화하려면 적립금 확인부터 운용 전략, 수령 방식 결정까지 단계별로 챙겨야 해요.
        중도인출은 최후의 수단이에요. 사유 없이 해지하면 기타소득세 16.5%를 내야 하기 때문에 가능한 한 피해야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        10년 근속·월급 300만원 기준으로 연 7% 운용 시 수령액이 약 4,300만원이에요.<br />
        같은 조건에서 정기예금만 넣으면 3,600만원 수준이죠.<br />
        700만원 차이가 나는데, 이건 20년 운용이면 더 크게 벌어져요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 수령액과 운용수익에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 소득세법을 바탕으로 작성됐어요. 수익률 시뮬레이션은 참고용이며 실제 수령액은 운용 성과에 따라 달라져요." />
    </ArticleLayout>
  );
}
