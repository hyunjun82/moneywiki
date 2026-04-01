"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 재취업이나 이직을 위해 새 기술을 배우고 싶은데 비용이 부담되는 고령 근로자·구직자 상황이에요.
// Q2. 국민내일배움카드를 신청해서 최대 500만원 훈련비 지원을 받고 훈련과정을 수강하는 행동.
// Q3. 신청 자격(75세 미만, 45세 이상 대기업도 가능), 지원 한도(300~500만원), 훈련장려금(월 최대 11.6만원), 신청 방법(HRD-Net/고용센터).
// Q4. GreenBox(지원 핵심) + Steps(신청 절차) + BorderBox(지원금 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "HRD-Net 회원가입", desc: "직업훈련 포털 HRD-Net(hrd.go.kr)에서 회원가입하고 본인인증을 완료해요.", tip: "고용센터 방문 신청도 가능해요. 상담까지 받고 싶으면 방문이 더 좋아요." },
  { title: "국민내일배움카드 신청", desc: "HRD-Net에서 '국민내일배움카드 발급신청' 메뉴로 들어가서 신청서를 작성해요." },
  { title: "카드 발급 (5~7일)", desc: "심사 후 승인되면 5년간 사용할 수 있는 카드가 발급돼요. 실물 카드 또는 앱 카드로 받을 수 있어요." },
  { title: "훈련과정 검색·수강신청", desc: "HRD-Net에서 원하는 훈련과정을 검색하고 수강신청해요. IT, 디자인, 회계, 요리 등 다양한 과정이 있어요." },
  { title: "훈련기관 등록 후 수강 시작", desc: "훈련기관에서 최종 등록하면 교육이 시작돼요. 출석률 80% 이상이면 훈련장려금도 받아요." },
];

const FAQS = [
  { q: "몇 살까지 신청할 수 있나요?", a: "만 75세 미만이면 누구나 신청 가능해요. 재직자, 실업자, 자영업자 모두 해당돼요." },
  { q: "대기업 다니는데도 신청할 수 있나요?", a: "만 45세 이상이면 대기업 재직자라도 신청 가능해요. 45세 미만 대기업 재직자(월 300만원 이상)는 제외돼요." },
  { q: "지원금은 얼마나 받나요?", a: "5년간 300만원이 기본이고, 45세 이상·대기업 재직자 등은 200만원 추가로 최대 500만원까지 지원받아요." },
  { q: "훈련장려금은 따로 받나요?", a: "140시간 이상 과정을 출석률 80% 이상으로 수강하면 월 최대 11만 6천원 받아요. K-디지털 트레이닝 등 특화과정은 월 20만원이에요." },
  { q: "어떤 과정을 들을 수 있나요?", a: "IT, 디자인, 회계, 요리, 건축, 의료 등 수만 개 과정이 있어요. HRD-Net에서 지역·분야별로 검색할 수 있어요." },
  { q: "실업급여 받는 중에도 훈련 지원 되나요?", a: "네, 가능해요. 다만 고용센터에서 상담을 먼저 받는 게 좋아요. 훈련과 실업급여를 함께 활용하면 재취업에 도움이 돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민내일배움카드 운영규정", url: "https://www.law.go.kr/행정규칙/국민내일배움카드운영규정" },
      { label: "HRD-Net 직업훈련 포털", url: "https://www.hrd.go.kr" },
      { label: "정부24 국민내일배움카드 신청", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/149200000026" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 훈련 · 지원금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고령자 훈련비 최대 500만원<br />
        국민내일배움카드 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        새 기술을 배우고 싶은데 훈련비가 부담되시죠?
        국민내일배움카드를 발급받으면 5년간 최대 500만원까지 훈련비를 지원받을 수 있어요.
        만 75세 미만이면 누구나 신청 가능하고, 45세 이상은 대기업 재직자도 돼요.
      </p>

      <Divider />

      <H2>얼마나 지원받을 수 있나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/행정규칙/국민내일배움카드운영규정" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민내일배움카드 운영규정</a>에 따른
        지원 내용이에요. 본인 부담금은 15~55% 정도예요.
      </p>

      <GreenBox>
        국민내일배움카드 지원 핵심이에요.<br />
        · 기본 한도: 5년간 <strong>300만원</strong><br />
        · 45세 이상·대기업 재직자 등: 추가 200만원 → 최대 <strong>500만원</strong><br />
        · 정부 부담 비율: 훈련비의 45~85% (과정에 따라 다름)<br />
        · 훈련장려금: 월 최대 <strong>11만 6천원</strong> (특화과정 20만원)
      </GreenBox>

      <BorderBox>
        지원금 계산 예시예요.<br /><br />
        <strong>조건</strong>: 50세 대기업 재직자, IT 과정 수강비 200만원<br />
        <strong>한도</strong>: 500만원 (45세 이상 추가 200만원 포함)<br />
        <strong>정부 부담</strong>: 200만원 x 75% = 150만원<br />
        <strong>본인 부담</strong>: 200만원 x 25% = 50만원<br /><br />
        140시간 이상 과정이면 <strong>훈련장려금 월 11.6만원</strong> 별도 지급
      </BorderBox>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        온라인(HRD-Net) 또는 오프라인(고용센터 방문) 두 가지 방법이 있어요.
        온라인이 빠르고, 상담이 필요하면 고용센터 방문이 좋아요.
      </p>

      <SectionBadge>신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        <a href="/w/65세-이상-실업급여-수급-자격" style={{ color: "#1D9E75", textDecoration: "underline" }}>65세 이상 실업급여</a>를
        받을 자격이 있는 분도 훈련 지원을 함께 활용하면 재취업에 도움이 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민내일배움카드 운영규정·고용노동부 자료를 바탕으로 작성했어요. 지원 한도와 훈련장려금은 정책 변경 시 달라질 수 있으니 HRD-Net이나 고용센터(1350)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
