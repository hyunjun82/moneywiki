"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산에서 국민연금이 얼마나 환급에 영향을 주는지 궁금한 직장인
// Q2. 본인 절세액을 계산해서 공제 항목을 정확히 파악하는 것
// Q3. 공제율(4.5%), 계산 방법, 세율별 절세액, 추납 활용법, 자동 반영 여부
// Q4. 표(급여별 절세액) + GreenBox(핵심 요약) + BorderBox(추납 활용)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEDUCTION_TABLE = [
  { salary: "200만원", monthly: "9만원", annual: "108만원", rate6: "약 6.5만원", rate15: "약 16.2만원", rate24: "약 25.9만원" },
  { salary: "300만원", monthly: "13.5만원", annual: "162만원", rate6: "약 9.7만원", rate15: "약 24.3만원", rate24: "약 38.9만원" },
  { salary: "400만원", monthly: "18만원", annual: "216만원", rate6: "약 13만원", rate15: "약 32.4만원", rate24: "약 51.8만원" },
  { salary: "500만원", monthly: "22.5만원", annual: "270만원", rate6: "약 16.2만원", rate15: "약 40.5만원", rate24: "약 64.8만원" },
];

const FAQS = [
  {
    q: "국민연금 공제 한도가 있나요?",
    a: "한도 없이 납부한 만큼 전액이 소득공제돼요. 다른 소득공제 항목처럼 한도를 신경 쓸 필요가 없어요. 국민연금 보험료 상한액이 있어서 월 소득 590만원을 넘어도 보험료가 더 오르지 않는데, 그게 사실상 상한이 돼요. 최대 연 약 319만원까지 공제 가능해요.",
  },
  {
    q: "별도로 신청해야 하나요?",
    a: "아니요. 국민연금공단이 납부 내역을 국세청에 직접 제출해요. 연말정산 간소화서비스에서 자동으로 조회되고, 원천징수영수증에도 자동 반영돼요. 따로 서류를 챙기거나 제출할 필요가 없어요.",
  },
  {
    q: "추납한 국민연금도 공제되나요?",
    a: "네, 납부한 연도에 전액 소득공제돼요. 국민연금을 안 낸 기간이 있으면 추후납부(추납)할 수 있는데, 추납하면 그 해 소득공제에 반영돼요. 소득이 많아서 세율이 높은 해에 추납하면 절세 효과가 커요.",
  },
  {
    q: "회사 부담분 4.5%도 공제받을 수 있나요?",
    a: "아니요. 본인이 낸 4.5%만 공제 대상이에요. 회사 부담분은 회사 경비로 처리되기 때문에 근로자 공제 대상이 아니에요. 급여명세서에 적힌 국민연금 공제액이 바로 소득공제 대상이에요.",
  },
  {
    q: "육아휴직 중에는 국민연금 공제가 어떻게 되나요?",
    a: "육아휴직 기간에는 국민연금 납부가 유예돼요. 납부를 안 했으니 그 기간만큼 공제액도 줄어요. 실제 납부한 금액만큼만 공제돼요. 간소화서비스에서 조회한 금액이 적다면 이 때문일 수 있어요.",
  },
  {
    q: "연말정산에서 국민연금 공제가 빠진 것 같아요. 어떻게 하나요?",
    a: "원천징수영수증에서 '국민연금보험료 공제' 항목을 확인해보세요. 빠져 있다면 회사에 정정을 요청할 수 있어요. 이미 연말정산이 끝났다면 홈택스에서 경정청구로 5년 이내에 환급받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제51조의3 (특별소득공제)", url: "https://www.law.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 연말정산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 연말정산 간소화서비스", url: "https://www.hometax.go.kr" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-소득공제", title: "연말정산 소득공제 항목 전체", description: "국민연금 외 건강보험, 고용보험, 신용카드 공제까지 전체 항목이에요." },
  { slug: "연말정산-건강보험료", title: "연말정산 건강보험료 공제", description: "건강보험 본인 부담분도 전액 소득공제돼요. 계산 방법을 정리했어요." },
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용 방법", description: "1월 15일 개통 후 홈택스에서 공제자료를 일괄 조회하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 국민연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 국민연금 소득공제,<br />
        얼마나 환급받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 급여에서 빠져나가는 국민연금이 연말정산 때 세금을 줄여줘요.
        본인 부담분(급여의 4.5%) 전액이 한도 없이 소득공제 대상이에요.
        별도로 신청할 필요도 없고, 간소화서비스에서 자동으로 조회돼요.{" "}
        <a href="https://www.law.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제51조의3</a>에
        근거한 공제예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>얼마나 공제받고 절세되나요?</H2>
      <p style={body}>
        국민연금 보험료율은 총 9%인데, 회사와 본인이 4.5%씩 나눠요.
        본인 부담분인 4.5%만 소득공제 대상이에요.
        세율이 높을수록 절세 효과가 커요.
      </p>

      <SectionBadge>급여별 국민연금 절세액 (세율별)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 납부액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연 공제액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율 6%</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율 15%</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율 24%</th>
            </tr>
          </thead>
          <tbody>
            {DEDUCTION_TABLE.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{row.salary}</td>
                <td style={{ padding: "10px 12px" }}>{row.monthly}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75", fontWeight: 600 }}>{row.annual}</td>
                <td style={{ padding: "10px 12px" }}>{row.rate6}</td>
                <td style={{ padding: "10px 12px" }}>{row.rate15}</td>
                <td style={{ padding: "10px 12px" }}>{row.rate24}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        국민연금 소득공제 3줄 요약<br />
        · 본인 부담분(월급×4.5%) 전액, 한도 없이 공제<br />
        · 간소화서비스에서 자동 조회, 별도 신청 불필요<br />
        · 세율 15%면 월급 300만원 기준 연 약 24만원 절세
      </GreenBox>

      <Divider />

      <H2>자동으로 반영되는지, 신청 방법은?</H2>
      <p style={body}>
        국민연금공단이 납부 내역을 국세청에 자동 제출해요. 그래서 1월 15일 간소화서비스 개통 후
        홈택스에 접속하면 국민연금 납부액이 자동으로 조회돼요.
        회사에서 연말정산할 때도 원천징수영수증에 이미 포함돼 있어요.
      </p>
      <p style={body}>
        금액이 예상과 다르다면 급여 변동, 육아휴직, 중도 입사·퇴사 때문일 수 있어요.
        국민연금공단 홈페이지(nps.or.kr)나 콜센터(1355)에서 납부 내역을 조회해서 확인할 수 있어요.
        간소화서비스 금액과 비교해서 차이가 있으면 국민연금공단에 문의하면 돼요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>추납으로 절세를 키우는 방법</H2>
      <p style={body}>
        국민연금을 안 낸 기간이 있다면 추후납부(추납)할 수 있어요.
        추납하면 납부한 연도에 전액 소득공제를 받아요.
        소득이 많은 해, 세율이 높은 해에 추납하면 절세 효과가 커요.
      </p>

      <BorderBox>
        추납 절세 예시<br />
        세율 24% 구간에서 추납으로 500만원을 납부하면, 500만원 × 24% = 120만원 절세가 가능해요.
        같은 금액을 세율 6% 구간에서 납부하면 절세액은 30만원에 그쳐요.
        소득이 높은 해에 추납하는 게 훨씬 유리해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민연금 연말정산 공제 관련 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 소득세법을 바탕으로 작성됐어요. 국민연금 보험료율과 공제 기준은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 조회하세요." />
    </ArticleLayout>
  );
}
