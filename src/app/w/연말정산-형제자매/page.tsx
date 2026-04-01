"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 때 형제자매를 부양가족으로 올릴 수 있는지, 조건이 되는지 확인하는 직장인
// Q2. 나이·소득 조건 확인 → 부양가족 등록 → 연 150만원 인적공제 받기
// Q3. 만 20세 이하 or 만 60세 이상 / 연간 소득 100만원 이하 / 생계를 같이 해야 함 / 신용카드·의료비 공제 안됨 / 중복 공제 불가
// Q4. GreenBox(공제 조건 핵심) + GreenBox(형제자매 유형별 공제 시뮬) + BorderBox(중복 공제 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "형제자매가 대학생인데 알바를 해요. 부양가족 될 수 있나요?",
    a: "아르바이트 소득이 연간 100만원(근로소득만 있다면 총급여 500만원) 이하라면 부양가족 등록 가능해요. 근로소득 외에 이자·배당·기타소득 합산이 100만원 이하여야 해요. 소득이 넘으면 부양가족 안 돼요.",
  },
  {
    q: "형제자매와 같이 살지 않아도 공제받을 수 있나요?",
    a: "원칙적으로 생계를 같이해야 해요. 하지만 취학, 장애, 질병 치료 등 일시적 이유로 따로 사는 경우에는 생계를 같이하는 것으로 인정받을 수 있어요. 단순히 독립해서 혼자 사는 경우에는 인정 안 돼요.",
  },
  {
    q: "형제자매 신용카드 사용액도 공제받을 수 있나요?",
    a: "아니에요. 부양가족으로 등록된 형제자매의 신용카드·체크카드 사용액은 공제가 안 돼요. 직계존속(부모, 조부모)과 직계비속(자녀)은 신용카드 공제가 되지만, 형제자매는 제외예요.",
  },
  {
    q: "형제자매를 두 명이 나눠서 각자 공제받을 수 있나요?",
    a: "아니에요. 한 명의 형제자매를 두 명의 근로자가 동시에 부양가족으로 등록할 수 없어요. 중복 신청 시 나중에 정산 과정에서 부당공제로 적발돼요. 형제자매가 여러 명이라면 각자 다른 형제자매를 맡아서 등록하면 돼요.",
  },
  {
    q: "장애인인 형제자매는 나이 조건 없이 공제되나요?",
    a: "네. 장애인복지법에 따른 장애인이거나 국가유공자, 항시 치료가 필요한 중증환자라면 나이 제한 없이 소득 조건(100만원 이하)만 충족하면 부양가족 공제가 가능해요. 장애인 추가공제 200만원도 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제50조 (인적공제 기본공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 연말정산 인적공제 안내", url: "https://www.nts.go.kr" },
      { label: "국세청 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-부양가족-등록", title: "연말정산 부양가족 등록 방법", description: "부양가족 등록 절차와 필요 서류예요." },
  { slug: "연말정산-발달재활서비스-공제", title: "장애인 추가공제 200만원", description: "형제자매가 장애인이라면 추가공제도 받을 수 있어요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원 혜택", description: "인적공제와 함께 활용하는 절세 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 인적공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 형제자매 부양가족 공제<br />
        나이·소득 조건과 신용카드 공제 제한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        형제자매가 만 20세 이하이거나 만 60세 이상이고, 연간 소득이 100만원 이하라면 부양가족으로 등록해 연 150만원을 공제받을 수 있어요.
        단, 신용카드·의료비 공제는 안 되고, 두 명이 동시에 같은 형제자매를 공제받을 수 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>형제자매 부양가족 공제 조건</H2>
      <p style={body}>
        소득세법 제50조에서 형제자매 부양가족 공제를 규정해요.
        3가지 조건을 모두 충족해야 1인당 연 150만원 기본공제를 받을 수 있어요.
      </p>

      <GreenBox>
        <strong>형제자매 부양가족 공제 3가지 조건</strong><br />
        <br />
        <strong>① 나이 조건</strong><br />
        만 20세 이하 (대학생 포함) or 만 60세 이상<br />
        나이 조건 예외: 장애인(장애 등록자)은 나이 제한 없음<br />
        <br />
        <strong>② 소득 조건</strong><br />
        연간 소득금액 합계 100만원 이하<br />
        근로소득만 있는 경우 총급여 500만원 이하<br />
        (소득금액 = 수입 - 필요경비, 총급여와 다름)<br />
        <br />
        <strong>③ 생계 요건</strong><br />
        주민등록상 같은 세대이거나 생계를 함께해야 함<br />
        취학·장애·질병 등 일시적 별거는 인정<br />
        단순 독립 생활은 인정 안됨<br />
        <br />
        ★ 공제 금액: 1인당 연 150만원 (세액공제 아닌 소득공제)
      </GreenBox>

      <H2>형제자매 유형별 공제 가능 여부</H2>
      <p style={body}>
        형제자매 상황에 따라 공제 가능 여부가 달라요. 내 형제자매가 해당되는지 확인해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>형제자매 상황</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제 여부</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>공제액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { situation: "만 20세 이하, 소득 없음", eligible: "가능", amount: "150만원" },
              { situation: "만 20세 이하, 알바 총급여 300만원", eligible: "가능", amount: "150만원" },
              { situation: "만 24세 대학생, 소득 없음", eligible: "불가", amount: "—" },
              { situation: "만 60세 이상, 소득 없음", eligible: "가능", amount: "150만원" },
              { situation: "나이 불문, 장애인 등록", eligible: "가능", amount: "150만원+추가200만원" },
              { situation: "취업 중, 연봉 2,000만원", eligible: "불가", amount: "—" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.situation}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: row.eligible === "가능" ? "#1D9E75" : "#E53E3E", fontWeight: 600 }}>{row.eligible}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 만 24세 대학생은 나이 조건(만 20세 이하) 미충족으로 공제 불가
        </p>
      </GreenBox>

      <H2>형제자매 공제 주의사항</H2>
      <p style={body}>
        형제자매 공제는 직계존·비속과 다른 점이 있어요.
        놓치면 오히려 환급을 덜 받거나 부당공제로 추징될 수 있어요.
      </p>

      <BorderBox>
        <strong>형제자매는 이 공제가 안 돼요</strong><br />
        신용카드·체크카드 사용액 공제: 직계존·비속만 가능, 형제자매 불가<br />
        의료비 세액공제: 형제자매 의료비는 공제 대상 아님<br />
        교육비 세액공제: 형제자매 학원비·등록금 공제 안됨<br />
        <br />
        <strong>중복 공제 주의</strong><br />
        형제자매 한 명을 두 근로자가 동시에 공제받으면 부당공제<br />
        국세청 시스템에서 자동으로 걸러냄 → 추징세 + 가산세 발생<br />
        <br />
        ★ 형제자매가 여러 명이라면 한 명씩 나눠서 서로 다른 형제자매를 공제받으면 OK
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 소득세법 제50조 및 2026년 국세청 연말정산 기준으로 작성됐어요. 소득금액 계산 방식은 소득 종류에 따라 다르니 정확한 확인은 홈택스에서 하세요." />
    </ArticleLayout>
  );
}
