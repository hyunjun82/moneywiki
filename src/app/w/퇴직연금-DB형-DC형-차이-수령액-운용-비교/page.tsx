"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 회사에서 퇴직연금 가입 방식을 선택하라고 해서 DB형과 DC형 중 어느 게 유리한지 비교하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 상황(이직 계획, 근속 기간, 투자 성향)에 맞는 형태를 결정하고 회사에 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → DB·DC 구조 차이, 수령액 계산 방식 차이, 이직·파산·운용 수익 시나리오별 비교, 전환은 1회뿐인 주의사항.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 비교표 + BorderBox(핵심 차이) + EligibilityChecker or Checklist(내 상황 판단) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const MY_SITUATION_DB = [
  "지금 회사에 10년 이상 다닐 계획이에요",
  "투자에 관심이 없고 원금 보장이 중요해요",
  "임금 인상률이 높은 회사에 다니고 있어요",
  "회사 재무 상태가 탄탄해요",
];

const MY_SITUATION_DC = [
  "이직이 잦거나 2~3년 내 이직 계획이 있어요",
  "ETF·펀드 투자에 관심이 있고 직접 굴리고 싶어요",
  "회사 재무 상태가 불안정해요",
  "임금 인상보다 투자 수익이 더 클 것 같아요",
];

const FAQS = [
  {
    q: "DB형에서 DC형으로 바꿀 수 있나요?",
    a: "네, 1회에 한해서만 가능해요. 한 번 바꾸면 다시 DB형으로 돌아갈 수 없으니까 신중하게 결정해야 해요. 전환할 때 기존 DB 적립금이 DC 계좌로 이전돼요.",
  },
  {
    q: "DC형에서 수익이 나면 다 내 돈인가요?",
    a: "네, 운용 수익 전부 본인 것이에요. DB형은 회사가 수익을 가져가지만 DC형은 수익도, 손실도 전부 본인 몫이에요.",
  },
  {
    q: "회사가 파산하면 DB형 퇴직연금은 어떻게 되나요?",
    a: "임금채권보장기금에서 보장받지만 100%가 아닐 수 있어요. 최근 적립금에 한해 제한적으로 보장해요. DC형은 본인 계좌이기 때문에 회사 파산과 무관하게 안전해요.",
  },
  {
    q: "이직할 때 퇴직연금은 어떻게 되나요?",
    a: "DC형은 IRP 계좌로 쉽게 이전할 수 있어요. DB형은 각 회사의 DB 적립금을 통합하기 복잡해요. 이직이 많을수록 DC형이 관리하기 훨씬 편해요.",
  },
  {
    q: "DC형은 어느 상품에 투자할 수 있나요?",
    a: "예금·국공채 같은 원금보장형과 ETF·펀드 같은 실적배당형 모두 가능해요. 위험자산 70% 이하 규제가 적용되니까 나머지 30%는 원금보장형에 넣어야 해요.",
  },
  {
    q: "DB형과 DC형 수령액이 얼마나 차이 나요?",
    a: "DB형은 평균임금 × 30일 × 근속연수로 확정돼요. DC형은 운용 실적에 따라 달라지는데 잘 굴리면 DB형의 2배 이상도 가능해요. 반대로 손실이 나면 DB형보다 적을 수도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로자퇴직급여 보장법 — 법제처", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "고용노동부 — 퇴직연금 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 수령", description: "어떻게 받느냐에 따라 세금이 크게 달라져요." },
  { slug: "퇴직연금-운용-방법-ETF-펀드-선택-전략", title: "퇴직연금 DC형 ETF 운용 방법", description: "DC형 운용 전략과 ETF 선택 기준을 설명해요." },
  { slug: "IRP계좌-가입-세액공제", title: "IRP 계좌 가입과 세액공제", description: "IRP에 납입하면 연 900만원 한도로 세액공제받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · DB형 · DC형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 DB형 DC형 차이<br />
        수령액·운용·이직 시나리오 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DB형과 DC형은 구조가 완전히 달라요. DB형은 회사가 금액을 보장하고, DC형은 본인이 직접 굴려서 수익을 챙기는 방식이에요.
        선택에 따라 나중에 받을 금액이 2배 이상 차이 날 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따라
        DB에서 DC로의 전환은 1회만 가능하니 신중하게 결정해야 해요.
      </p>

      <Divider />

      <H2>DB형 vs DC형 핵심 구조 비교</H2>
      <p style={body}>
        두 방식의 가장 큰 차이는 '운용 주체'예요. DB형은 회사가 운용해서 정해진 금액을 줘요. DC형은 회사가 돈만 넣고, 어떻게 굴릴지는 본인이 결정해요.
      </p>

      <SectionBadge>DB형 vs DC형 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>DB형 (확정급여형)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>DC형 (확정기여형)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["수령액", "회사가 확정 (평균임금 × 30일 × 근속연수)", "운용 실적에 따라 변동"],
              ["운용 주체", "회사가 운용", "근로자가 직접 운용"],
              ["운용 수익", "회사가 가져감", "근로자 전부 가져감"],
              ["운용 손실", "회사가 부담", "근로자가 부담"],
              ["회사 파산 시", "부분 보장 (기금 한도 내)", "안전 (본인 계좌)"],
              ["이직 시 관리", "통합 복잡", "IRP로 쉽게 이전"],
              ["평균 수익률", "연 2.5~3%", "연 1~7% (운용에 따라 편차 큼)"],
              ["추천 상황", "장기 근속, 투자 무관심", "이직 잦음, 투자 관심 있음"],
            ].map(([item, db, dc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{db}</td>
                <td style={{ padding: "9px 12px" }}>{dc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>내 상황에 맞는 형태 고르기</H2>
      <p style={body}>
        정답은 없어요. 이직 계획, 투자 관심도, 회사 재무 상태를 기준으로 결정해요. 아래 항목에 해당하는 쪽이 본인에게 맞는 선택이에요.
      </p>

      <SectionBadge>DB형이 유리한 경우</SectionBadge>
      <Checklist items={MY_SITUATION_DB} />

      <SectionBadge>DC형이 유리한 경우</SectionBadge>
      <Checklist items={MY_SITUATION_DC} />

      <GreenBox>
        이직이 잦으면 DC형이 압도적으로 관리가 편해요.<br />
        DC형은 퇴사할 때마다 IRP로 이전하면 한 계좌에서 통합 관리할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>전환은 1회뿐 — 신중하게 결정하세요</H2>
      <p style={body}>
        DB형에서 DC형으로의 전환은 평생 1회만 가능해요. 전환 후 다시 DB형으로 되돌아갈 수 없어요.
        전환 시 기존 DB 적립금이 DC 계좌로 이전되고, 그 이후부터는 DC 방식으로 적용돼요.
      </p>

      <BorderBox>
        전환 전에 반드시 확인해야 할 것들이에요.<br />
        · 현재 회사에 오래 다닐 계획인지<br />
        · 임금 인상 폭이 크면 DB형이 유리할 수 있음<br />
        · DC형으로 전환 후 운용에 신경 쓸 의향이 있는지<br />
        · 회사 재무 상태가 불안정한지
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경 시 달라질 수 있으니 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
