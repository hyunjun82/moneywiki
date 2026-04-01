"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴직연금 계좌에 돈이 쌓여 있는데 언제부터 받을 수 있는지 모르거나 지금 급해서 빼고 싶은 상황
// Q2. 수령 신청을 완료하거나 조기 수령 가능 여부를 판단할 수 있어야 함
// Q3. 55세 기준 근거, IRP 5년 가입 조건 예외, 조기 수령 5가지 사유, 일시금 vs 연금 세금 차이
// Q4. 조기 수령 사유 표 + 연금·일시금 세금 비교 + Steps + FAQ

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "생일 1~2개월 전에 미리 준비",
    desc: "만 55세 생일이 지나면 연금 개시를 신청할 수 있어요. 생일 당일 바로 신청해도 입금까지 1~2개월 걸리기 때문에 미리 준비하는 게 좋아요. 증권사·은행 퇴직연금 앱에서 수령 방식과 기간을 미리 검토해두세요.",
    tip: "2026년에 만 55세가 되는 분은 1971년생이에요",
  },
  {
    title: "수령 방식 결정: 일시금 vs 연금",
    desc: "일시금은 전액을 한 번에 받는 방식이에요. 퇴직소득세 전액을 내야 해요. 연금은 10년 이상 나눠 받으면 퇴직소득세 30% 감면, 11년 이상이면 40% 감면이에요. 급한 돈이 필요한 게 아니라면 연금이 세금 면에서 유리해요.",
    tip: "연금 개시 신청은 취소가 안 돼요. 방식과 기간을 신중하게 결정하세요",
  },
  {
    title: "퇴직연금 앱에서 연금 개시 신청",
    desc: "앱 로그인 후 '연금 개시' 메뉴를 선택하고, 수령 방식(일시금·연금)과 기간(10년·15년·20년 등)을 입력하면 돼요. 신청 자체는 5분이면 끝나요. 승인 후 매달 자동으로 입금돼요.",
    tip: "연금수령한도를 초과하면 기타소득세 16.5%가 부과되니 앱에서 한도를 먼저 확인하세요",
  },
];

const CHECKLIST = [
  "만 55세 생일 확인 (생일 지난 후 신청 가능)",
  "IRP 자발 납입의 경우 가입 5년 이상 여부 확인",
  "퇴직금 이전 IRP라면 5년 조건 불필요",
  "연금수령한도 = 잔액 ÷ (11 - 수령연차) 계산",
  "10년 이상 연금 수령 시 퇴직소득세 30% 감면",
  "11년 이상 수령 시 40% 감면,기간 설정 시 고려",
];

const FAQS = [
  {
    q: "55세 전에 퇴직연금을 빼려면 어떻게 해야 하나요?",
    a: "주택 구입, 6개월 이상 요양, 파산 선고, 천재지변, 사회적 재난 피해 등 부득이한 사유가 있어야 해요. 해당 증빙 서류를 금융사에 제출하면 연금소득세 3.3~5.5%만 내고 인출할 수 있어요.",
  },
  {
    q: "IRP 가입 기간이 5년 미만인데 55세가 됐어요. 받을 수 있나요?",
    a: "퇴직금을 이전한 IRP라면 가입 기간 관계없이 55세부터 받을 수 있어요. 개인이 자발적으로 적립한 IRP는 5년이 지나야 해요.",
  },
  {
    q: "55세 되자마자 전부 빼도 되나요?",
    a: "법적으로는 가능하지만 연금수령한도를 초과하면 초과분에 기타소득세 16.5%가 붙어요. 한 번에 전부 빼면 일시금 처리돼서 퇴직소득세 전액을 내야 해요.",
  },
  {
    q: "연금으로 10년 받으면 세금이 얼마나 줄어드나요?",
    a: "퇴직소득세의 30%를 감면받아요. 예를 들어 일시금 기준 세금이 500만원이면 연금 10년 수령 시 약 350만원으로 줄어요. 11년 이상이면 40% 감면으로 약 300만원이에요.",
  },
  {
    q: "연금 개시 후 취소하고 다시 일시금으로 바꿀 수 있나요?",
    a: "한 번 연금 개시를 신청하면 취소할 수 없어요. 수령 방식, 기간, 시작 시점을 신중하게 결정해야 해요. 결정 전에 금융사 상담을 받아보는 게 좋아요.",
  },
  {
    q: "55세 이후 IRP에서 계속 ETF 투자를 하면서 조금씩 받을 수 있나요?",
    a: "가능해요. 연금 개시 신청 후 실제 인출을 최소화하고 IRP 계좌에서 계속 운용할 수 있어요. 국민연금을 받기 시작하는 65세까지 투자를 유지하면 복리 효과를 더 누릴 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제22조: 연금 수령 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 퇴직연금 연금소득세 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-중도인출-조건-사유-신청", title: "퇴직연금 중도인출 조건과 신청 방법", description: "55세 전 인출 가능한 사유 5가지와 서류를 안내해요." },
  { slug: "퇴직연금-운용-방법-ETF-펀드-선택-전략", title: "퇴직연금 ETF·펀드 운용 전략", description: "수령 전까지 수익률을 높이는 나이별 전략이에요." },
  { slug: "DC형-퇴직연금-수령-운용수익-포함", title: "DC형 수령액, 운용수익 포함 얼마?", description: "운용 성과에 따라 수령액이 어떻게 달라지는지 봐요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 수령 나이 · 절세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 수령 나이 55세 기준,<br />
        조기 수령 조건 5가지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금은 원칙적으로 만 55세부터 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제22조</a>에서 정한 나이예요.
        55세 전에 급하게 돈이 필요하다면 주택 구입, 6개월 이상 요양 등 부득이한 사유 5가지에 해당할 때만 인출할 수 있어요.
        연금으로 10년 이상 나눠 받으면 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>를 30~40% 감면받아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>55세 전 조기 수령: 부득이한 사유 5가지</H2>
      <p style={body}>
        원칙적으로는 55세 전에 못 빼요. 하지만 아래 5가지 부득이한 사유에 해당하면 인출할 수 있어요.
        사유에 해당하면 일반 해지(기타소득세 16.5%) 대신 연금소득세 3.3~5.5%만 내요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf8" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>사유</th>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>필요 서류</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>무주택자 주택 구입</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>매매계약서, 무주택 확인서</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>본인·배우자·부양가족 6개월 이상 요양</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>의사 진단서 (요양 소견 포함)</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>법원 파산 선고·개인회생</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>법원 선고 결정문</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>천재지변으로 재산 손실</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>피해 확인서, 손실 증빙</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
            </tr>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>사회적 재난 피해</td>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb" }}>정부 인정 재난 증빙</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BorderBox>
        사유 없이 해지하면 기타소득세 16.5%예요. 1,000만원 인출 시 조기 수령은 세금 33~55만원,
        무조건 해지하면 165만원이에요. 110만원 이상 차이 나기 때문에 서류 준비를 꼭 하세요.
      </BorderBox>

      <Divider />

      <H2>55세 이후 수령 방식: 일시금 vs 연금 비교</H2>
      <p style={body}>
        55세가 되면 두 가지 방식 중 하나를 선택해요. 급하게 목돈이 필요한 경우가 아니라면 연금이 세금 면에서 훨씬 유리해요.
        일시금은 퇴직소득세 전액을 내지만, 연금으로 10년 이상 받으면 30%, 11년 이상이면 40%를 감면받아요.
      </p>

      <GreenBox>
        일시금: 퇴직소득세 100% 납부, 급전이 필요할 때 선택<br />
        연금 10년 이상: 퇴직소득세 30% 감면<br />
        연금 11년 이상: 퇴직소득세 40% 감면,가장 절세 효과 큼
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>55세 연금 개시 신청 방법</H2>
      <p style={body}>
        연금 개시 신청 자체는 간단하지만, 수령 방식 결정이 중요해요. 한 번 신청하면 취소할 수 없어서 방식과 기간을 신중하게 선택해야 해요.
        금융사 상담을 먼저 받아보고 결정하는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 준비 체크리스트</H2>
      <p style={body}>
        생일이 지난 후 연금 개시 신청이 가능해요. IRP 가입 유형(자발 납입인지, 퇴직금 이전인지)에 따라 5년 가입 조건이 다르게 적용돼요.
        신청 전 아래 항목을 확인해두면 실수 없이 처리할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직연금 수령 나이와 조기 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 소득세법을 바탕으로 작성됐어요. 수령 조건과 세율은 변경될 수 있으니 최신 기준은 국세청(126) 또는 금융사 상담을 통해 확인하세요." />
    </ArticleLayout>
  );
}
