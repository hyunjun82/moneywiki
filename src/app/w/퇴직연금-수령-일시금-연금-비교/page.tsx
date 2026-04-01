"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 55세가 됐거나 곧 퇴직하는데, 퇴직연금을 일시금으로 받을지 연금으로 나눠 받을지 결정해야 해서 세금 차이를 비교하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 일시금 vs 연금 수령 중 본인 상황에 맞는 방식을 선택하고 금융사 앱이나 영업점에서 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 세금 차이(퇴직소득세 100% vs 70%), 연금 수령 조건(55세·최소 10년·월 30만원), 선택 기준(건강·자금 필요도·투자 성향), 한 번 결정하면 변경 불가.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 비교표 + Checklist(상황별 선택) + GreenBox(핵심 요약) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ILSIGEUM_ITEMS = [
  "당장 목돈이 필요해요 (사업 자금·부채 상환·주택 구입 등)",
  "건강이 안 좋아서 10년 이상 받을 자신이 없어요",
  "연 7% 이상 직접 투자해서 수익 낼 자신이 있어요",
  "퇴직연금 총액이 3,000만원 이하라 월 30만원 안 나와요",
];

const YEONGEEUM_ITEMS = [
  "급하게 목돈 쓸 곳이 없고 생활비를 규칙적으로 받고 싶어요",
  "건강해서 80세 이상 오래 살 자신이 있어요",
  "투자에 자신이 없고 세금 절약만으로도 충분해요",
  "국민연금과 합쳐 매달 안정적인 수입이 필요해요",
];

const FAQS = [
  {
    q: "연금 수령 시작 후 일시금으로 바꿀 수 있나요?",
    a: "불가능해요. 연금 수령을 한 번 시작하면 일시금으로 변경할 수 없어요. 반대도 마찬가지예요. 신청 전에 신중하게 결정해야 해요.",
  },
  {
    q: "퇴직연금 5,000만원이면 실제로 얼마나 절세되나요?",
    a: "일시금 수령 시 퇴직소득세 약 500만원, 연금 수령 시 약 150만원이에요. 약 350만원 절세 효과가 생겨요. 근속연수에 따라 세금이 달라지니 정확한 금액은 금융사에서 시뮬레이션해보세요.",
  },
  {
    q: "55세 전에 퇴직연금을 받을 수 있나요?",
    a: "주택 구입·6개월 이상 요양 같은 부득이한 사유가 있으면 55세 전 중도 해지할 수 있어요. 단, 세금이 16.5%로 높아져요.",
  },
  {
    q: "연금 수령 중 사망하면 남은 금액은 어떻게 되나요?",
    a: "상속인(유족)이 수령하게 돼요. 상속 절차에 따라 처리되니 금융사에 문의하세요.",
  },
  {
    q: "DB형은 연금 수령 금액이 얼마인가요?",
    a: "퇴직 시점 평균임금 × 30일 × 근속연수로 계산해요. DC형은 적립금 + 운용수익이에요. 금융사 앱에서 예상 수령액을 확인할 수 있어요.",
  },
  {
    q: "연금 수령 기간을 중간에 늘릴 수 있나요?",
    a: "일부 금융사는 기간 연장이 가능해요. 가입한 금융사에 직접 문의하세요. 다만 처음부터 길게 설정하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로자퇴직급여 보장법(법제처)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "국세청 퇴직소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-DB형-DC형-차이-수령액-운용-비교", title: "퇴직연금 DB형 DC형 차이 비교", description: "어떤 형태로 가입했는지에 따라 수령액이 크게 달라져요." },
  { slug: "IRP계좌-가입-세액공제", title: "IRP 계좌 가입과 세액공제", description: "퇴직금을 IRP에 넣으면 연 900만원 한도로 세액공제받아요." },
  { slug: "퇴직금-평균임금-산정-근속연수-계산", title: "퇴직금 계산 방법", description: "평균임금과 근속연수로 퇴직금 직접 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 세금 · 수령 방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 일시금 vs 연금 수령<br />
        세금 차이와 선택 기준 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        55세가 됐는데 퇴직연금을 어떻게 받을지 고민되시죠? 한 번에 다 받을지, 나눠 받을지에 따라 세금이 수백만원 차이 나요.
        결론부터 말하면, 급하게 목돈이 필요하지 않다면 연금 수령이 세금을 30~40% 줄여줘요.
        한 번 선택하면 변경 불가라서 지금 제대로 비교해두는 게 중요해요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>일시금 vs 연금, 세금이 얼마나 다른가요?</H2>
      <p style={body}>
        퇴직연금을 받는 방법은 두 가지예요. 한 번에 전액을 받는 일시금과 55세부터 10년 이상 나눠 받는 연금이에요.
        가장 큰 차이는 세금인데, 연금을 선택하면 퇴직소득세를 30~40% 덜 내요.
      </p>

      <SectionBadge>5,000만원 수령 시 세금 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일시금 수령</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연금 수령 (10년)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["퇴직연금", "5,000만원", "5,000만원"],
              ["세율", "퇴직소득세 100%", "퇴직소득세 70%"],
              ["예상 세금", "약 500만원", "약 150만원"],
              ["실수령액", "4,500만원", "4,850만원"],
              ["절세 효과", "—", "350만원 절약"],
              ["월 수령액", "일시불", "약 42만원"],
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

      <GreenBox>
        연금을 10년 받으면 퇴직소득세 70%만 내요.<br />
        11년째부터는 60%로 줄어들어서 절세 효과가 더 커져요.
      </GreenBox>

      <Divider />

      <H2>연금 수령 조건, 3가지를 충족해야 해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서
        연금 수령 조건을 정하고 있어요. 3가지를 모두 충족해야 세금 감면 혜택을 받아요.
      </p>

      <BorderBox>
        연금 수령 3대 조건이에요.<br />
        · <strong>55세 이상</strong>: 55세부터 수령 신청 가능<br />
        · <strong>최소 10년 이상</strong>: 10년보다 짧으면 일시금으로 간주돼 감면 혜택 없음<br />
        · <strong>월 30만원 이상</strong>: 월 수령액이 30만원 미만이면 연금 불가, 일시금으로만 수령 가능
      </BorderBox>

      <p style={body}>
        퇴직연금이 3,000만원이라면 10년 나눠도 월 25만원이에요. 30만원 기준을 못 채우니 일시금으로 받아야 해요.
        이런 경우엔 일부는 연금(월 30만원 충족 금액)으로, 나머지는 일시금으로 받는 혼합 방식도 가능해요.
      </p>

      <Divider />

      <H2>내 상황엔 일시금이 맞나요, 연금이 맞나요?</H2>
      <p style={body}>
        정답은 없어요. 자금 필요도·건강 상태·투자 의향을 기준으로 판단해야 해요.
        아래 항목에 해당하는 쪽이 본인에게 맞는 선택이에요.
      </p>

      <SectionBadge>일시금이 맞는 경우</SectionBadge>
      <Checklist items={ILSIGEUM_ITEMS} />

      <SectionBadge>연금이 맞는 경우</SectionBadge>
      <Checklist items={YEONGEEUM_ITEMS} />

      <Divider />

      <H2>신청 방법: 금융사 앱 또는 영업점에서</H2>
      <p style={body}>
        55세가 되면 퇴직연금에 가입한 금융사(은행·증권사·보험사) 앱에서 신청해요. '연금 수령 신청' 메뉴에서
        일시금·연금·혼합 중 선택하고, 연금이면 수령 기간(10년·15년·20년)을 정하면 끝이에요.
        신청하면 다음 달부터 매달 지정 계좌로 입금돼요.
      </p>

      <p style={body}>
        모바일이 어렵다면 신분증과 통장을 들고 영업점을 방문하세요. 창구에서 시뮬레이션도 함께 해줘요.
        <strong>한 번 신청하면 변경 불가</strong>라는 점만 꼭 기억해두세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로자퇴직급여 보장법과 국세청 자료를 바탕으로 작성됐어요. 근속연수·수령액에 따라 세금이 달라지니 금융사에서 개인 시뮬레이션을 꼭 받아보세요." />
    </ArticleLayout>
  );
}
