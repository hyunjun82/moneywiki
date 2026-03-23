"use client";

// Q1. 실업급여 받는 중인데 생활비가 부족해서 알바를 하고 싶은 상황이에요.
// Q2. 실업급여 유지하면서 알바 가능한 조건을 확인하고, 초과하지 않도록 근로시간을 조절하는 행동.
// Q3. 월 60시간 미만·3개월 미만 기준, 일용직 예외, 신고 의무, 미신고 시 5배 추징.
// Q4. EligibilityChecker(내 조건 확인) + GreenBox(핵심 조건) + Steps(신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, EligibilityChecker,
  ArticleLayout,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "월 소정근로시간이 60시간 미만이에요" },
  { id: "c2", label: "1주 소정근로시간이 15시간 미만이에요" },
  { id: "c3", label: "계약기간이 3개월 미만이에요" },
  { id: "c4", label: "고용보험에 가입되지 않는 단기 알바예요" },
  { id: "c5", label: "실업인정일에 근로내역을 신고할 거예요" },
];

const REPORT_STEPS = [
  { title: "고용24 로그인", desc: "work24.go.kr에 접속해서 공인인증서 또는 간편인증으로 로그인해요." },
  { title: "실업인정 신청 메뉴 선택", desc: "실업인정 인터넷 신청 메뉴에 들어가요. 2주에 1번 지정된 실업인정일에 신청해요." },
  { title: "근로내역 입력", desc: "알바한 날짜, 근로시간, 수입금액(세전)을 입력해요. 일용직이면 날짜별로 따로 적어요." },
  { title: "제출 및 확인", desc: "입력 내용 확인 후 제출하면 끝이에요. 고용센터에서 별도 확인 연락이 올 수 있어요." },
];

const FAQS = [
  { q: "알바 미신고하면 어떻게 되나요?", a: "부정수급으로 처리돼요. 받은 실업급여 전액 환수에 최대 5배 추가징수까지 부과돼요. 4대보험·국세청 자료가 자동 연계되니 적발 확률이 높아요." },
  { q: "하루 알바도 신고해야 하나요?", a: "네, 1일이라도 일했으면 신고 대상이에요. 소득 금액과 관계없이 근로 사실 자체를 신고해야 해요." },
  { q: "알바 신고하면 실업급여가 줄어드나요?", a: "알바한 날만 실업급여가 지급 안 되고 그만큼 수급 기간이 뒤로 밀려요. 총 수령액은 줄어들지 않아요." },
  { q: "배달앱 라이더도 신고해야 하나요?", a: "네, 플랫폼 노동도 근로에 해당해요. 앱에서 근로시간과 수입을 캡처해두면 신고할 때 편해요." },
  { q: "실업인정일을 놓치면 어떡하나요?", a: "해당 기간 실업급여를 못 받을 수 있어요. 고용센터(1350)에 바로 연락해서 보정 가능 여부를 확인하세요." },
  { q: "월 60시간 넘기면 바로 중단되나요?", a: "월 소정근로시간 60시간 이상이면 취업으로 봐요. 실업급여가 중단되고 남은 수급일수는 재취업 후 다시 실직하면 사용할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용보험법(실업의 인정 기준)", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용24 실업인정 신청", url: "https://www.work24.go.kr" },
    { label: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 알바</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 알바, 되나요?<br />
        가능 조건과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여만으로 생활비가 부족하면 알바를 생각하게 되죠.
        결론부터 말하면 가능해요. 단, 월 60시간 미만이고 계약기간 3개월 미만이어야 해요.
        이 기준을 넘기면 취업으로 간주돼서 실업급여가 중단되고, 신고 안 하면 부정수급으로 최대 5배 추징당해요.
      </p>

      <Divider />

      <H2>내 알바, 실업급여 유지될까?</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 실업급여를 유지하면서 알바할 수 있어요.
        하나라도 안 맞으면 <a href="/w/실업급여-받으면서-알바" style={{ color: "#1D9E75" }}>실업급여 알바 조건 상세</a>를 확인해보세요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여를 유지하면서 알바할 수 있어요. 실업인정일에 꼭 신고하세요."
        partialMatchText="일부 조건이 맞지 않아요. 60시간·3개월 기준을 다시 확인해보세요."
      />

      <Divider />

      <H2>핵심 조건, 이것만 기억하세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75" }}>고용보험법</a>에서 정한 취업 인정 기준이에요.
        이 기준 안에서만 알바하면 실업급여가 계속 나와요.
      </p>

      <GreenBox title="실업급여 유지 3대 조건">
        <strong>월 소정근로시간 60시간 미만</strong> (1주 15시간 미만)<br />
        <strong>계약기간 3개월 미만</strong><br />
        <strong>매 실업인정일에 근로내역 신고</strong> (고용24)
      </GreenBox>

      <p style={body}>
        일용직은 조금 다르게 적용돼요. 일한 날은 실업급여가 안 나오지만, 나머지 날은 실업으로 인정받아서 급여가 나와요.
        알바한 날의 수급일수는 뒤로 밀리니까 총 수령액은 같아요.
      </p>

      <BorderBox>
        주의할 점이 있어요.<br />
        · 월 60시간 미만이어도 <strong>3개월 이상 계속 일하면</strong> 취업으로 봐요<br />
        · 4대보험 가입되는 알바는 자동으로 고용센터에 통보돼요<br />
        · 수입금액은 <strong>세전 금액</strong>으로 신고해요 (3.3% 원천징수 전)
      </BorderBox>

      <Divider />

      <H2>알바 사실, 이렇게 신고해요</H2>
      <p style={body}>
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75" }}>고용24</a>에서 온라인으로 신고할 수 있어요.
        고용센터에 직접 가지 않아도 돼요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <p style={body}>
        온라인이 어려우면 고용센터에 직접 방문해도 돼요. 근로계약서나 급여명세서를 지참하면 더 빠르게 처리돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성됐어요. 수급 조건은 개인 상황에 따라 다를 수 있으니 고용센터(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
