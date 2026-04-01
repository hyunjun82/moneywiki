"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 60세 이상 어르신을 채용하려는 중소기업 사업주인데 인건비 부담이 걱정되는 상황이에요.
// Q2. 고령자 고용지원금 대상인지 확인하고, 분기별 신청을 해서 지원금을 받는 행동.
// Q3. 60세 이상·재직 1년 초과·증가 조건, 1명당 분기 30만원·최대 2년, 정년 미설정 요건, 신청 방법.
// Q4. EligibilityChecker(대상 확인) + GreenBox(지원금액) + Steps(신청 절차) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "우선지원대상기업, 중견기업, 또는 사회적기업이에요" },
  { id: "c2", label: "고용보험 가입 1년 이상인 사업장이에요" },
  { id: "c3", label: "60세 이상 근로자를 1년 넘게 고용하고 있어요" },
  { id: "c4", label: "분기별 60세 이상 근로자 수가 이전보다 증가했어요" },
  { id: "c5", label: "정년을 설정한 적이 없는 사업장이에요" },
];

const APPLY_STEPS = [
  { title: "대상 확인", desc: "고용보험 가입 1년 이상이고, 60세 이상 근로자가 직전 3년 평균보다 증가했는지 확인해요." },
  { title: "신청서 작성", desc: "고용24(work24.go.kr)에서 고령자 고용지원금 신청서를 온라인으로 작성해요." },
  { title: "분기 종료 후 신청", desc: "분기가 끝난 후 다음 달에 신청해요. 예를 들어 1분기 실적은 4월에 신청해요.", tip: "관할 고용센터 기업지원부서에 직접 제출해도 돼요." },
  { title: "심사 및 지급", desc: "고용센터에서 피보험자 수 확인 후 지원금을 지급해요." },
];

const FAQS = [
  { q: "지원금은 얼마나 받나요?", a: "증가한 60세 이상 근로자 1명당 분기 30만원이에요. 3명 증가하면 분기당 90만원, 2년간 최대 720만원을 받아요." },
  { q: "정년이 있으면 안 되나요?", a: "네, 정년 미설정 사업장만 신청 가능해요. 정년을 설정한 적이 없다는 서류를 제출해야 해요." },
  { q: "외국인 근로자도 포함되나요?", a: "원칙적으로 제외되지만, 거주(F-2)·영주(F-5)·결혼이민(F-6) 비자 소지자는 신청 가능해요." },
  { q: "사업주의 배우자도 포함되나요?", a: "아니요, 사업주의 배우자와 직계 가족은 지원 대상에서 제외돼요." },
  { q: "최대 몇 명까지 지원받나요?", a: "분기별 지원 인원은 해당 분기 매월 말 피보험자 수 평균의 30%와 최대 30명 중 적은 수가 한도예요." },
  { q: "계속고용장려금과 다른 건가요?", a: "다른 제도예요. 계속고용장려금은 정년 이후 계속 고용하는 사업주에게 월 40만원을 지원하고, 고령자 고용지원금은 60세 이상 근로자 증가 시 분기 30만원을 지원해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부 고령자 고용안정지원금", url: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20250301132" },
    { label: "고용24 고령자 고용지원금", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000328" },
    { label: "정부24 신청 안내", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05004&CappBizCD=14920000019" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 고령자 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고령자 고용지원금, 얼마 받을까?<br />
        신청 조건부터 계산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        60세 이상 근로자를 고용하면 정부에서 인건비를 지원해줘요.
        1명당 분기 30만원씩 최대 2년간 받을 수 있고, 중소기업·중견기업이 대상이에요.
      </p>

      <Divider />

      <H2>우리 회사가 대상인지 확인해보세요</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 고령자 고용지원금을 신청할 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="고령자 고용지원금 신청 대상이에요. 분기 종료 후 다음 달에 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 고용보험 가입 기간과 정년 설정 여부를 확인해보세요."
      />

      <Divider />

      <H2>지원 금액은 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75" }}>고용노동부</a>에서 운영하는 제도로, 증가한 60세 이상 근로자 수에 따라 지원금이 결정돼요.
      </p>

      <GreenBox title="지원 금액 계산">
        증가 인원 1명당 <strong>분기 30만원</strong><br />
        1명 × 8분기(2년) = 최대 <strong>240만원</strong><br />
        3명 증가 시 2년간 최대 <strong>720만원</strong>
      </GreenBox>

      <p style={body}>
        분기별 월평균 60세 이상 근로자 수를 계산해서 직전 3년 평균과 비교해요.
        증가한 인원에 30만원을 곱하면 지원금이 나와요.
        최저임금 미만으로 지급하는 경우에는 지원금이 절반으로 줄어드니 주의하세요.
      </p>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75" }}>고용24</a> 또는 관할 고용센터에서 신청할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <BorderBox>
        놓치기 쉬운 점이에요.<br />
        · 신청 기간을 놓치면 해당 분기 지원금을 못 받아요<br />
        · <a href="/w/4대보험-공제액-계산" style={{ color: "#1D9E75" }}>4대보험 공제액 계산</a>과 함께 인건비 계획을 세우면 좋아요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부·고용24 자료를 바탕으로 작성됐어요. 지원 조건은 매년 변경될 수 있으니 신청 전 고용센터에 확인하세요." />
    </ArticleLayout>
  );
}
