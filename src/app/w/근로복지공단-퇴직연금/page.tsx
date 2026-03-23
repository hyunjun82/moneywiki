"use client";

/*
Q1. 중소기업 다니는데 퇴직연금이 없어서 근로복지공단 퇴직연금에 대해 알고 싶은 상황
Q2. 푸른씨앗 가입 조건을 확인하고 사업주에게 가입을 요청
Q3. 30인 미만 사업장 대상, DC형, 수수료 저렴(0.2% 이하), 정부 지원금(적립금 10% 3년), 가입·수령 방법
Q4. GreenBox(핵심 혜택) + EligibilityChecker(가입 조건) + Steps(가입 절차) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "상시근로자 30인 미만 사업장이에요" },
  { id: "c2", label: "월평균보수 281만원 미만 근로자가 있어요" },
  { id: "c3", label: "사용자(사업주)가 가입 신청에 동의해요" },
  { id: "c4", label: "근로자 과반수 동의를 받을 수 있어요" },
];

const JOIN_STEPS = [
  { title: "가입 요건 확인", desc: "30인 미만 사업장인지, 근로자 과반수 동의를 받을 수 있는지 확인하세요." },
  { title: "근로복지공단에 가입 신청", desc: "근로복지공단 퇴직연금 홈페이지(pension.comwel.or.kr) 또는 전담 콜센터(1661-0075)로 신청해요." },
  { title: "규약 작성·신고", desc: "퇴직연금 규약을 작성하고 관할 노동관서에 신고하면 돼요." },
  { title: "부담금 납입 시작", desc: "매월 근로자 연간 임금총액의 1/12 이상을 적립해요. 정부 지원금도 함께 적립되죠." },
];

const FAQS = [
  { q: "푸른씨앗이 뭐예요?", a: "근로복지공단이 운영하는 중소기업 퇴직연금 제도의 이름이에요. DC형(확정기여형)으로 운영되죠." },
  { q: "수수료가 정말 저렴한가요?", a: "운용관리 수수료가 3년간 면제돼요. 면제기간 이후에도 0.2% 이하로 일반 금융회사보다 훨씬 저렴하죠." },
  { q: "정부 지원금은 얼마나 받나요?", a: "적립금의 10%를 3년간 정부가 추가로 적립해줘요. 사업주와 근로자 모두에게 혜택이 돌아가죠." },
  { q: "퇴직할 때 어떻게 받나요?", a: "퇴직 시 IRP 계좌로 이전하거나 일시금으로 수령할 수 있어요. 홈페이지에서 지급 신청하면 되죠." },
  { q: "기존 퇴직금 제도에서 전환할 수 있나요?", a: "가능해요. 기존 퇴직금 제도나 DB/DC형 퇴직연금에서 푸른씨앗으로 전환하거나 병행 운영이 돼요." },
  { q: "내 적립금은 어디서 확인하나요?", a: "근로복지공단 퇴직연금 홈페이지(pension.comwel.or.kr)에 로그인하면 적립 현황을 조회할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "근로복지공단 퇴직연금 홈페이지", url: "https://pension.comwel.or.kr" },
    { label: "고용노동부: 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
    { label: "금감원 통합연금포털: 내 퇴직연금 조회", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 근로복지공단 · 푸른씨앗</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로복지공단 퇴직연금, 뭐가 좋나?<br />
        푸른씨앗 가입 조건과 혜택
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        중소기업 다니는데 <a href="/w/퇴직연금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금</a>이 없어서 불안하죠.
        근로복지공단이 운영하는 <strong>푸른씨앗</strong>은 30인 미만 사업장을 위한 퇴직연금이에요.
        수수료가 저렴하고 <strong>정부 지원금</strong>(적립금 10%, 3년)까지 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>푸른씨앗, 일반 퇴직연금과 뭐가 달라요?</H2>
      <p style={body}>
        <a href="https://pension.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이 직접 운영하는 DC형(확정기여형) 퇴직연금이에요. 일반 금융회사 퇴직연금과 구조는 같지만, 수수료와 정부 지원에서 큰 차이가 있죠.
      </p>
      <p style={body}>
        운용관리 수수료가 <strong>3년간 면제</strong>돼요. 면제 기간이 끝나도 0.2% 이하로 일반 금융회사(평균 0.3~0.5%)보다 저렴하죠. 여기에 <strong>적립금의 10%를 3년간</strong> 정부가 추가 적립해주는 혜택까지 있어요.
      </p>

      <GreenBox>
        수수료: 3년 면제 → 이후 0.2% 이하<br />
        정부 지원금: 적립금의 10%를 3년간 추가 적립<br />
        대상: 30인 미만 사업장, 월평균보수 281만원 미만 근로자
      </GreenBox>

      <Divider />

      <H2>가입 조건, 우리 회사도 되나요?</H2>
      <p style={body}>
        상시근로자 <strong>30인 미만</strong> 사업장이면 가입할 수 있어요. 사업주가 신청하고 근로자 과반수 동의를 받아야 하죠. 월평균보수 281만원 미만 근로자가 정부 지원 대상이에요.
      </p>

      <SectionBadge>가입 조건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 푸른씨앗 가입이 가능해요. 근로복지공단(1661-0075)에 신청하세요."
        partialMatchText="일부 미충족이에요. 사업장 규모나 근로자 동의 요건을 다시 확인해보세요."
      />

      <ArticleAd position="mid" />
      <Divider />

      <H2>가입 절차, 어떻게 하나요?</H2>
      <p style={body}>
        사업주가 <a href="https://pension.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단 홈페이지</a>나 전담 콜센터(1661-0075)로 신청하면 돼요. 근로자 입장에서는 사업주에게 가입을 요청하는 것이 첫 단계죠.
      </p>

      <SectionBadge>가입 4단계</SectionBadge>
      <Steps steps={JOIN_STEPS} />

      <BorderBox>
        <strong>퇴직 시 수령 방법</strong><br />
        IRP 계좌로 이전 → 연금 또는 일시금 수령<br />
        <a href="https://100lifeplan.fss.or.kr/retire/retireInfo.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>금감원 통합연금포털</a>에서 내 퇴직연금 적립 현황 조회 가능
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부와 근로복지공단 안내를 바탕으로 작성했어요. 가입 세부 조건은 근로복지공단(1661-0075)에 문의하세요." />
    </ArticleLayout>
  );
}
