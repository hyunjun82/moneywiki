"use client";
// Q1: 연말정산 시즌에 월세 내고 있는데 세금 돌려받을 수 있는지 궁금한 직장인
// Q2: 내가 월세 세액공제 대상인지 확인하고 얼마나 돌려받는지 계산해서 신청까지 완료한다
// Q3: 공제 자격 조건(소득/주택/세대주) / 공제율 15~17%와 한도 1000만원 / 신청 방법과 필요 서류 / 현금영수증과 비교
// Q4: EligibilityChecker로 자격확인 + Calculator로 환급액 계산 + Steps로 신청 절차 + DocTable로 서류 + GreenBox로 비교 요약
// MAP-INTRO: "월세 50만원씩 내는데, 연말정산에서 뭔가 돌려받을 수 있나요?" 독자 질문으로 시작
// MAP-TYPE: 자격확인
// MAP-H2: 자격 조건 체크 > 환급액 계산 > 신청 방법 > 필요 서류 > 현금영수증 비교 > FAQ
// MAP-COMP: EligibilityChecker > Calculator > Steps > DocTable > GreenBox > FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Calculator, Steps, DocTable, Checklist,
  FAQ, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const ELIG_ITEMS = [
  { id: "e1", label: "무주택 세대주 또는 세대원이에요" },
  { id: "e2", label: "총급여 8,000만원(종합소득 7,000만원) 이하예요" },
  { id: "e3", label: "국민주택규모(전용 85㎡) 이하 주택에 살고 있어요" },
  { id: "e4", label: "기준시가 4억원 이하 주택이에요" },
  { id: "e5", label: "임대차계약서상 주소와 주민등록 주소가 같아요" },
];

const CALC_SLIDERS = [
  {
    id: "monthly",
    label: "월세",
    min: 10, max: 150, step: 5, defaultValue: 50,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "salary",
    label: "총급여",
    min: 1000, max: 12000, step: 100, defaultValue: 4000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
];

const CALC_RESULTS = [
  {
    label: "연간 월세 합계",
    getValue: (v: Record<string, number>) => v.monthly * 12,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "공제 대상 금액",
    getValue: (v: Record<string, number>) => Math.min(v.monthly * 12, 1000),
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    label: "예상 환급액",
    highlight: true,
    getValue: (v: Record<string, number>) => {
      if (v.salary > 8000) return 0;
      const annual = Math.min(v.monthly * 12, 1000);
      const rate = v.salary <= 5500 ? 0.17 : 0.15;
      return Math.round(annual * rate);
    },
    format: (v: number) => `약 ${v.toLocaleString()}만원`,
  },
];

const STEPS_DATA = [
  {
    title: "임대차계약서와 주민등록등본 준비하세요",
    desc: "계약서에 적힌 주소와 주민등록등본 주소가 같아야 해요. 전입신고가 안 돼 있으면 공제를 못 받으니까, 계약서 서명 후 바로 전입신고하는 게 좋아요.",
    tip: "전입신고 날짜가 중요해요. 전입 전 납부한 월세는 공제 대상이 아니에요",
  },
  {
    title: "월세 이체 내역을 확보하세요",
    desc: "계좌이체 내역이 가장 확실한 증빙이에요. 현금으로 냈다면 현금영수증이라도 받아두세요. 무통장입금 영수증도 인정돼요.",
    tip: "카카오페이·토스 송금도 인정돼요. 이체 기록 캡처해두세요",
  },
  {
    title: "연말정산 간소화에서 조회하거나 직접 제출하세요",
    desc: "집주인이 사업자등록한 경우 간소화에서 자동 조회돼요. 안 뜨면 직접 서류를 회사에 제출하면 돼요. 홈택스에서 주택임차료 자료를 등록할 수도 있고요.",
    tip: "홈택스 → 연말정산 → 주택임차료(월세) 세액공제 신고",
  },
];

const DOCS = [
  { name: "임대차계약서 사본", required: true, where: "본인 보관본 복사" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "월세 이체 내역", required: true, where: "은행 앱 또는 인터넷뱅킹" },
  { name: "원천징수영수증", required: false, where: "회사 인사팀 또는 홈택스" },
];

const FAQS = [
  {
    q: "월세 세액공제와 현금영수증, 뭐가 더 유리해요?",
    a: "총급여 5,500만원 이하라면 세액공제(17%)가 훨씬 유리해요. 현금영수증은 소득공제라서 실제 환급률이 5~7% 수준이죠. 다만 총급여 8,000만원을 넘으면 세액공제 자격이 없으니 현금영수증으로 신청해야 해요.",
  },
  {
    q: "집주인 동의 없이도 받을 수 있나요?",
    a: "네, 집주인 동의가 필요 없어요. 임대차계약서와 이체 내역만 있으면 되죠. 집주인이 임대소득 신고를 안 해도 세입자의 세액공제에는 영향이 없고요.",
  },
  {
    q: "오피스텔이나 고시원도 되나요?",
    a: "주거용으로 사용하고, 전입신고가 돼 있으면 오피스텔도 가능해요. 고시원도 마찬가지예요. 핵심은 '주거용'이냐와 '전입신고'가 돼 있느냐 두 가지죠.",
  },
  {
    q: "중간에 이사하면 어떻게 되나요?",
    a: "이전 집과 현재 집 월세를 합산해서 공제받을 수 있어요. 각 집의 임대차계약서와 이체 내역을 모두 제출하면 되죠. 합산 한도는 연 1,000만원이에요.",
  },
  {
    q: "작년 월세를 올해 경정청구로 받을 수 있나요?",
    a: "네, 5년 이내라면 경정청구로 돌려받을 수 있어요. 홈택스에서 직접 신청하면 보통 2~3개월 내에 환급되죠.",
  },
  {
    q: "세대주가 아닌데 받을 수 있나요?",
    a: "세대주가 주택 관련 공제를 안 받았다면, 세대원도 월세 세액공제를 받을 수 있어요. 2024년부터 세대원 요건이 완화됐죠.",
  },
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>

      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 월세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월세 내고 있다면 세금 돌려받으세요<br />
        세액공제 조건부터 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "월세 50만원씩 내는데, 연말정산에서 뭔가 돌려받을 수 있나요?"
      </p>
      <p style={body}>
        결론부터 말하면, 연간 월세의 15~17%를 세금에서 빼줘요.
        월세 50만원이면 1년에 최대 102만원을 환급받을 수 있죠.
        조건이 까다로울 것 같지만, 무주택 직장인이고 전입신고만 돼 있으면 대부분 해당돼요.
        내가 받을 수 있는지, 얼마를 돌려받는지 아래에서 바로 체크해보세요.
      </p>

      <Divider />

      <H2>나도 받을 수 있을까? 자격 조건 체크</H2>
      <p style={body}>
        월세 세액공제는 5가지 조건을 전부 충족해야 해요.
        하나라도 빠지면 공제를 못 받으니까, 아래에서 하나씩 체크해보세요.
        특히 전입신고가 안 돼 있으면 아무리 월세를 내도 공제 대상이 아니에요.
      </p>
      <p style={body}>
        총급여 기준은 근로소득만 따져요. 프리랜서라면 종합소득금액 7,000만원 이하가 기준이 되죠.
        기준시가 4억원은 공시가격 기준이니까, 실거래가와 다를 수 있어요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={ELIG_ITEMS} />
      <p style={body}>
        5개 전부 체크됐다면 세액공제 대상이에요. 그렇다면 다음 궁금한 건 "그래서 얼마 돌려받느냐"겠죠.
      </p>

      <Divider />

      <H2>환급액이 얼마나 되나요?</H2>
      <p style={body}>
        공제율은 총급여에 따라 달라져요. 5,500만원 이하면 17%, 초과하면 15%예요.
        연간 월세 합계가 1,000만원을 넘으면 1,000만원까지만 공제 대상이 되죠.
      </p>
      <p style={body}>
        예를 들어 월세 60만원, 총급여 4,000만원이면 연간 720만원 × 17% = 약 122만원을 돌려받아요.
        월급 한 달치가 넘는 금액이니까, 놓치면 아까운 돈이에요.
      </p>
      <SectionBadge>환급액 계산</SectionBadge>
      <Calculator
        title="월세 세액공제 계산기"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="총급여 8,000만원 초과 시 세액공제 대상이 아니에요. 한도 연 1,000만원."
      />
      <p style={body}>
        계산해봤으면 이제 신청 방법이 궁금하겠죠. 서류만 갖추면 어렵지 않아요.
      </p>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        연말정산 때 회사에 서류를 제출하면 돼요.
        홈택스 간소화에서 자동으로 뜨는 경우도 있지만, 안 뜨면 직접 서류를 준비해야 하죠.
        집주인이 사업자등록을 안 한 경우가 대부분이라, 직접 제출하는 게 확실해요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        절차 자체는 간단한데, 서류를 빠뜨리면 반려돼요. 뭘 준비해야 하는지 정리해둘게요.
      </p>

      <Divider />

      <H2>필요한 서류 목록</H2>
      <p style={body}>
        핵심은 세 가지예요. 임대차계약서, 주민등록등본, 이체 내역.
        이 세 개만 있으면 기본적으로 신청 가능하죠.
        원천징수영수증은 필수는 아니지만 총급여 확인용으로 있으면 좋아요.
      </p>
      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>현금영수증과 뭐가 다른 건가요?</H2>
      <p style={body}>
        월세를 현금영수증으로 처리하면 소득공제를 받아요. 세액공제와 완전히 다른 방식이에요.
        소득공제는 과세표준을 줄이는 거라, 실제 환급률이 세율에 따라 달라지죠. 보통 5~7% 수준이에요.
      </p>
      <GreenBox title="이것만 기억해요">
        총급여 5,500만원 이하 → 세액공제 17%가 압도적으로 유리해요.{"\n"}
        총급여 8,000만원 초과 → 세액공제 불가, 현금영수증(소득공제)으로 신청하세요.{"\n"}
        둘 다 동시에는 안 돼요. 하나만 선택해야 해요.
      </GreenBox>
      <p style={body}>
        세액공제 자격이 되면 무조건 세액공제를 선택하세요. 환급 금액이 2~3배 차이 나요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 소득세법 및 국세청 연말정산 안내를 바탕으로 정리한 일반 안내 자료예요. 개인 상황에 따라 공제 금액이 달라질 수 있으니, 정확한 계산은 홈택스 또는 세무사와 상담하세요." />
    </div>
  );
}
