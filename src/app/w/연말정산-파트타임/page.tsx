"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 파트타임·시급 알바인데 연말정산을 해야 하는지, 어떻게 하는지 모르는 상황
// Q2. 본인이 연말정산 대상인지 판단하고, 대상이면 환급받기
// Q3. 3개월 이상 근무=상용직=연말정산 대상, 일반직원과 동일 공제, 소득 적으면 전액 환급, 투잡은 합산 필수
// Q4. GreenBox(대상 판단 기준) + BorderBox(공제 가능 항목) + Steps(환급 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "파트타임도 연말정산 하나요?", a: "한 곳에서 3개월 이상 일했고 4대보험에 가입돼 있으면 연말정산 대상이에요. 3개월 미만은 일용직이라 원천징수로 끝나요." },
  { q: "파트타임 두 군데서 동시에 일하면요?", a: "주된 직장(소득 많은 곳)에서 합산 연말정산하거나, 5월 종합소득세 신고 때 합산해요. 합산 안 하면 가산세 나올 수 있어요." },
  { q: "회사에서 연말정산 안 해주면요?", a: "소규모 사업장에서 안 해주면 5월 종합소득세 신고 때 직접 해요. 홈택스에서 간소화 자료 받아서 신고하면 돼요." },
  { q: "파트타임에서 정규직 됐으면요?", a: "같은 회사면 자동 합산돼요. 다른 회사로 갔으면 전 직장 원천징수영수증을 새 직장에 제출하세요." },
  { q: "연간 소득 150만원 이하면 안 해도 되나요?", a: "소득이 적더라도 연말정산을 해야 매달 뗀 세금(기납부세액)을 돌려받아요. 안 하면 그 돈을 못 받아요." },
  { q: "3.3% 떼는 프리랜서 알바도 연말정산 하나요?", a: "3.3% 원천징수는 사업소득이라 연말정산 대상이 아니에요. 5월 종합소득세 신고 때 환급받을 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
    { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-환급금-지급일", title: "연말정산 환급금 지급일", description: "환급금이 언제 들어오는지 시기와 조회 방법이에요." },
  { slug: "연말정산-아르바이트", title: "연말정산 아르바이트", description: "알바생 연말정산 방법을 더 자세히 정리했어요." },
  { slug: "연말정산-이직자", title: "연말정산 이직자", description: "이직했을 때 전 직장 소득 합산하는 방법이에요." },
];

const REFUND_STEPS = [
  { title: "대상 여부 확인", desc: "같은 곳에서 3개월 이상 근무했고 4대보험에 가입돼 있으면 연말정산 대상이에요. 급여명세서에서 소득세 공제 내역을 확인하세요.", tip: "3개월 미만이면 일용직 → 연말정산 대상 아님" },
  { title: "간소화 자료 다운로드", desc: "홈택스(hometax.go.kr) 접속 → 연말정산 간소화 서비스에서 본인 자료를 PDF로 다운로드해요. 1월 20일 이후에 확정 자료를 받으세요." },
  { title: "회사에 자료 제출", desc: "다운로드한 간소화 자료를 회사 인사팀에 제출해요. 회사가 지정한 기한(보통 1월 말~2월 초) 안에 내야 해요." },
  { title: "환급금 확인", desc: "2~3월 급여에 환급금이 포함돼서 나와요. 홈택스 My홈택스 → 지급명세서에서 결정세액과 기납부세액을 비교하면 환급액을 알 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파트타임도 연말정산 해야 할까?<br />
        3개월 이상 근무하면 환급받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시급제 파트타임이라 연말정산 안 해도 되는 줄 알고 있죠?
        3개월 이상 한 곳에서 일했으면 정규직과 똑같이 연말정산 대상이에요.
        소득이 적을수록 환급 비율이 높아서, 매달 뗀 세금 거의 전액 돌려받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>파트타임 연말정산 대상 기준</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>소득세법</a>에 따르면
        같은 사업장에서 3개월 이상 계속 근무하면 상용직 근로자로 분류돼요.
        시급제든 월급제든 관계없어요.
      </p>

      <GreenBox title="대상 판단 기준">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>구분</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>근무 기간</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>세금 정산</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>상용직 (연말정산 대상)</td>
              <td style={{ padding: "8px 6px" }}>3개월 이상</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>연말정산</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>일용직</td>
              <td style={{ padding: "8px 6px" }}>3개월 미만</td>
              <td style={{ padding: "8px 6px" }}>원천징수로 끝</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>프리랜서 (3.3%)</td>
              <td style={{ padding: "8px 6px" }}>기간 무관</td>
              <td style={{ padding: "8px 6px" }}>5월 종합소득세 신고</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>파트타임도 공제 전부 받을 수 있을까?</H2>
      <p style={body}>
        정규직과 완전히 동일한 공제를 받아요. 파트타임이라고 공제 항목이 줄어들지 않아요.
      </p>

      <BorderBox title="공제 가능 항목">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          &bull; 기본공제: 본인 150만원 + 부양가족 1인당 150만원<br />
          &bull; 신용카드 소득공제: 총급여 25% 초과분의 15~40%<br />
          &bull; 보험료 세액공제: 연 100만원 한도, 납입액의 12%<br />
          &bull; 의료비 세액공제: 총급여 3% 초과분의 15%<br />
          &bull; 교육비 세액공제: 본인 한도 없음, 자녀 연 300만원 한도<br />
          &bull; 연금저축 세액공제: 납입액의 16.5%(총급여 5,500만원 이하) 또는 13.2%
        </p>
      </BorderBox>

      <p style={body}>
        연간 총급여 1,200만원인 파트타임이라면 기본공제만 해도 결정세액이 거의 0원이에요.
        매달 뗀 세금 전액 환급받을 가능성이 높아요.
      </p>

      <Divider />

      <H2>환급받는 절차</H2>
      <p style={body}>
        연말정산 절차는 정규직과 똑같아요. 간소화 자료 받아서 회사에 제출하면 돼요.
      </p>

      <Steps steps={REFUND_STEPS} />

      <Divider />

      <H2>투잡이면 어떻게 해야 할까?</H2>
      <p style={body}>
        파트타임 두 곳에서 동시에 일하면 소득을 합산해서 정산해야 해요.
        합산하지 않으면 나중에 추징당할 수 있어요.
      </p>

      <BorderBox title="투잡 처리 방법">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          &bull; 방법 1: 주된 직장에서 합산 연말정산 → 부업 직장의 원천징수영수증을 제출<br />
          &bull; 방법 2: 5월 종합소득세 신고 → 두 곳 소득을 홈택스에서 합산 신고<br /><br />
          합산하면 세율 구간이 올라갈 수 있지만, 신고는 필수예요.
        </p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 연말정산 기준으로 작성했어요. 개별 세금 문제는 세무사에게 상담받으세요." />
    </ArticleLayout>
  );
}
