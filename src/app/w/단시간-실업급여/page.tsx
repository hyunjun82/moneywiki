"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 하루 4시간 미만이나 단시간 근무를 하는데, 퇴사하면 실업급여를 받을 수 있는지 궁금한 상황이에요. 주 15시간 기준을 모르거나, 자기가 해당되는지 확인하고 싶은 거예요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 주 근로시간이 15시간 이상인지 확인하고, 수급자격 충족 여부를 판단한 뒤 고용24에서 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 주 15시간 기준(소정근로시간), 15시간 이상 = 고용보험 가입 대상, 15시간 미만 = 초단시간 근로자(적용 제외), 수급 조건(24개월 90일), 금액 계산(하한액 66,048원), 대안(국민취업지원제도).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(수급 대상 여부) + BorderBox(15시간 기준 예시) + GreenBox(금액 핵심) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { Steps } from "@/components/article-ui/Steps";

const ELIGIBILITY_ITEMS = [
  { id: "hours", label: "주 소정근로시간이 15시간 이상이에요" },
  { id: "insurance", label: "고용보험에 가입돼 있어요 (급여명세서에서 확인)" },
  { id: "period", label: "퇴사일 기준 24개월 동안 90일 이상 근무했어요" },
  { id: "involuntary", label: "비자발적 퇴사(계약만료, 권고사직, 해고 등)예요" },
  { id: "seek", label: "재취업 의사가 있고, 구직활동을 할 수 있어요" },
];

const STEPS = [
  { title: "주 근로시간 확인", desc: "근로계약서에서 주 소정근로시간이 15시간 이상인지 확인해요.", tip: "계약서가 없으면 급여명세서·근무표로도 확인 가능해요" },
  { title: "고용보험 가입 확인", desc: "고용24(www.ei.go.kr) 또는 4대보험 포털에서 고용보험 가입 이력을 확인해요." },
  { title: "워크넷 구직등록 + 수급자격 교육", desc: "고용24에서 구직등록하고, 온라인 교육(수급자격 신청자 교육)을 들어요." },
  { title: "고용센터 방문 또는 온라인 신청", desc: "이직확인서, 신분증, 통장사본을 가지고 고용센터에 가거나 고용24에서 온라인으로 신청해요." },
  { title: "실업인정 + 급여 수령", desc: "4주마다 실업인정을 받으면 계좌로 입금돼요. 7일 대기기간 이후부터 급여가 나와요." },
];

const FAQS = [
  { q: "하루 4시간씩 주 3일 일하면 실업급여 받을 수 있나요?", a: "주 12시간이라서 고용보험 적용 제외예요. 실업급여를 받으려면 주 15시간 이상이어야 해요." },
  { q: "주 15시간 미만 초단시간 근로자는 아무 지원도 못 받나요?", a: "국민취업지원제도를 신청할 수 있어요. 소득 요건을 충족하면 월 최대 50만원씩 6개월간 지원받을 수 있어요." },
  { q: "계약서에는 주 15시간 미만인데 실제로는 더 일했어요. 어떡하죠?", a: "실제 근로시간 기준으로 고용보험 가입 대상이에요. 고용노동부(1350)에 신고하면 회사가 소급 가입하게 할 수 있어요. 급여명세서·근무표를 증거로 챙겨두세요." },
  { q: "단시간 근로자 실업급여 금액은 일반 근로자와 다른가요?", a: "계산 방식은 동일해요. 퇴사 전 3개월 평균임금의 60%예요. 다만 월급이 적어서 계산 금액이 하한액보다 낮으면, 하한액(66,048원/일)을 받아요." },
  { q: "수급 조건이 18개월 180일이 아니라 24개월 90일인 건 왜 그런가요?", a: "단시간 근로자는 근무일수가 적다는 점을 고려해서 기준이 완화돼 있어요. 일반 근로자는 18개월간 180일이지만, 단시간은 24개월간 90일이에요." },
  { q: "실업급여 받으면서 주 15시간 미만 알바해도 되나요?", a: "주 15시간 미만이면 취업 신고 의무가 없어요. 하지만 수입이 생기면 급여가 감액될 수 있어요. 15시간 이상 일하면 반드시 취업 신고해야 하고, 미신고 시 부정수급이에요." },
  { q: "2026년에 고용보험 기준이 바뀐다는데 사실인가요?", a: "정부가 주 15시간 기준 대신 '소득 기준'으로 변경하는 개편안을 추진 중이에요. 확정되면 초단시간 근로자도 고용보험에 가입될 수 있어요. 아직 시행 시점은 확정되지 않았어요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "단시간 근로자도 일반 근로자와 같은 수급자격 체계를 따라요." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산법", description: "하한액 66,048원 기준, 단시간 근로자 실수령액을 계산해보세요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법·절차", description: "고용24 온라인 신청부터 고용센터 방문까지 단계별 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단시간 근로자도 실업급여 받을까?<br />
        주 15시간 기준과 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        하루 4시간, 주 3~4일 일하는데 퇴사하면 실업급여를 받을 수 있는지 궁금하시죠?
        핵심은 주 소정근로시간이에요. <strong>주 15시간 이상</strong>이면 고용보험에 가입되고 실업급여를 받을 수 있어요.
        15시간 미만이면 "초단시간 근로자"로 분류돼서 고용보험 적용이 안 돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>내가 실업급여 대상인지 확인해볼까요?</H2>
      <p style={body}>
        단시간 근로자라도 아래 조건을 모두 충족하면 실업급여를 받을 수 있어요.
        하루 근무시간이 아니라 <strong>일주일 총 근로시간</strong>이 기준이에요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="모두 충족하면 실업급여를 받을 수 있어요"
        partialMatchText="일부 미충족 항목은 고용센터에서 상세 확인이 필요해요"
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>주 15시간 기준, 어떻게 계산하나요?</H2>
      <p style={body}>
        중요한 건 하루 몇 시간이 아니라, 일주일에 총 몇 시간 일하느냐예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은 근로계약서의 소정근로시간을 기준으로 해요.
      </p>

      <BorderBox>
        <strong>주 15시간 기준 예시</strong><br /><br />
        · 하루 5시간 x 주 3일 = <strong>15시간 → 가입 대상</strong><br />
        · 하루 3시간 x 주 5일 = <strong>15시간 → 가입 대상</strong><br />
        · 하루 7.5시간 x 주 2일 = <strong>15시간 → 가입 대상</strong><br />
        · 하루 4시간 x 주 3일 = <strong>12시간 → 적용 제외 (초단시간)</strong><br />
        · 하루 3시간 x 주 4일 = <strong>12시간 → 적용 제외 (초단시간)</strong>
      </BorderBox>

      <p style={body}>
        근로계약서를 작성할 때 주 근로시간이 15시간 이상인지 꼭 확인하세요.
        15시간 미만으로 계약했는데 실제로는 더 일했다면, <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 신고해서 소급 가입시킬 수 있어요.
      </p>

      <Divider />

      <H2>수급 조건은 일반 근로자와 뭐가 다르죠?</H2>
      <p style={body}>
        단시간 근로자는 피보험기간 요건이 일반 근로자보다 완화돼 있어요.
        근무일수가 적다는 점을 고려한 거예요.
      </p>

      <SectionBadge>일반 vs 단시간 수급 요건 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일반 근로자</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>단시간 근로자</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["기준 기간", "18개월", "24개월"],
              ["필요 피보험일수", "180일 이상", "90일 이상"],
              ["비자발적 이직", "필수", "필수"],
              ["구직활동 의사", "필수", "필수"],
              ["금액 계산", "평균임금 60%", "평균임금 60% (동일)"],
              ["하한액 (2026)", "66,048원/일", "66,048원/일 (동일)"],
            ].map(([label, general, parttime], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 500 }}>{label}</td>
                <td style={{ padding: "10px 12px", color: "#6b7280" }}>{general}</td>
                <td style={{ padding: "10px 12px", color: "#1D9E75", fontWeight: 600 }}>{parttime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        단시간 근로자는 24개월 동안 90일만 일하면 수급자격이 생겨요.
        금액 계산 방식은 동일하고, 월급이 적어서 계산 금액이 하한액보다 낮으면 하한액으로 받아요.
      </p>

      <Divider />

      <H2>실업급여 금액은 어느 정도 되나요?</H2>
      <p style={body}>
        단시간 근로자도 퇴사 전 3개월 평균임금의 60%를 받아요.
        다만 월급이 적어서 대부분 하한액으로 수령하게 돼요.
      </p>

      <GreenBox>
        · 계산 공식: 퇴사 전 3개월 평균임금 ÷ 30일 x 60% = 하루 실업급여<br />
        · 2026년 하한액: <strong>66,048원/일</strong> (= 최저임금 80%)<br />
        · 월급이 적어서 계산 금액이 하한액보다 낮으면, 하한액을 받아요<br />
        · 예: 월급 80만원이었다면 → 계산상 하루 16,000원이지만 → 하한액 66,048원 적용<br />
        · 상한액: 하루 66,000원 (단시간 근로자는 보통 하한액 적용)
      </GreenBox>

      <p style={body}>
        수급기간은 연령과 피보험기간에 따라 120일~270일이에요.
        자세한 금액은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24 실업급여 모의계산</a>에서 확인할 수 있어요.
      </p>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        일반 실업급여 신청과 동일해요. 다만 근로시간을 확인하는 절차가 추가될 수 있어요.
        근로계약서를 꼭 챙겨가세요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        근로계약서에 주 근로시간이 애매하게 적혀 있으면 심사가 길어질 수 있어요.
        급여명세서나 근무표를 함께 가져가면 실제 근로시간을 빠르게 증명할 수 있어요.
      </p>

      <Divider />

      <H2>주 15시간 미만이면 정말 방법이 없을까?</H2>
      <p style={body}>
        초단시간 근로자(주 15시간 미만)는 고용보험 적용 제외라서 실업급여를 받을 수 없어요.
        하지만 대안이 하나 있어요.
      </p>

      <BorderBox>
        <strong>국민취업지원제도 (초단시간 근로자 대안)</strong><br /><br />
        · 대상: 고용보험 미가입자 중 소득·재산 요건 충족자<br />
        · 지원금: 월 최대 <strong>50만원</strong> x 6개월<br />
        · 추가 지원: 취업 상담, 직업훈련, 일경험 프로그램<br />
        · 신청: <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 또는 관할 고용센터 방문<br />
        · 2026년 정부가 고용보험 가입 기준을 소득 기준으로 바꾸는 개편을 추진 중이에요
      </BorderBox>

      <p style={body}>
        실업급여는 못 받더라도, 국민취업지원제도로 월 50만원까지 지원받을 수 있어요.
        고용센터(1577-0011)에 전화해서 본인이 해당되는지 먼저 확인해보세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별 사례는 고용센터(1577-0011)에서 확인하세요." />
    </ArticleLayout>
  );
}
