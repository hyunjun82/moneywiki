"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 등록금이 부담스러운 대학생이 학자금 대출 금리와 한도를 비교하려는 상황
// Q2: 등록금 대출과 생활비 대출의 금리·한도·자격을 파악하고 한국장학재단에서 신청
// Q3: 금리 1.7%, 등록금 전액/생활비 학기당 200만원, 소득구간 기준, 신청 시기
// Q4: GreenBox(금리·한도 요약) + Steps(신청 절차) + DocTable(서류) + Checklist + FAQ

const STEPS = [
  {
    title: "한국장학재단 홈페이지 접속",
    desc: "kosaf.go.kr에서 공동인증서나 금융인증서로 로그인해요. 카카오·네이버 인증으로도 가능하고요. 매 학기 신청 기간에 맞춰 접속해야 해요.",
    tip: "2026년 1학기 등록금 대출은 1월 5일, 생활비 대출은 2월 1일부터 신청 가능해요.",
  },
  {
    title: "소득구간 확인",
    desc: "한국장학재단에서 소득구간을 먼저 산정받아야 해요. 등록금 대출은 학부 10구간 이하, 생활비 대출은 학부 8구간 이하가 기준이에요. 산정까지 2~4주 걸릴 수 있어서 미리 신청하세요.",
    tip: "소득구간이 높으면 등록금 대출은 되지만 생활비 대출은 안 될 수 있어요.",
  },
  {
    title: "대출 신청서 작성",
    desc: "학사 정보(학년, 학과, 학번), 부모님 정보(소득구간 산정용), 입금 계좌를 입력해요. 개인 신용정보 동의도 필요하고요. 등록금 대출과 생활비 대출을 각각 별도로 신청해야 해요.",
  },
  {
    title: "심사 및 입금",
    desc: "등록금 대출은 학교로 직접 입금돼요. 생활비 대출은 본인 계좌로 입금되는데 신청 후 약 8주 정도 걸려요. 학점 기준(C학점, 2.0 이상)을 충족해야 승인돼요.",
    tip: "첫 학기는 학점 기준 예외가 적용될 수 있어요.",
  },
];

const DOCS = [
  { name: "공동인증서 또는 금융인증서", required: true, where: "은행 또는 인증서 발급 사이트" },
  { name: "학사 정보 (학년, 학과, 학번)", required: true, where: "학교 학생정보시스템" },
  { name: "부모님 소득 정보 (소득구간 산정용)", required: true, where: "한국장학재단에서 산정" },
  { name: "본인 명의 은행 계좌", required: true, where: "생활비 대출 입금용" },
  { name: "재학증명서", required: false, where: "학교 행정실 또는 정부24" },
];

const CHECKLIST = [
  "금리 1.7% (2020년부터 6년 연속 동결)",
  "등록금 대출: 소요액 전액, 학부 10구간 이하",
  "생활비 대출: 학기당 200만원(연 400만원), 학부 8구간 이하",
  "학점 기준: C학점(2.0) 이상 유지 필수",
  "상환: 졸업 후 6개월 뒤부터 시작 (원리금균등/소득연동 선택 가능)",
  "여러 대학 다닌 경우 대출 한도 누적 적용",
];

const FAQS = [
  { q: "학자금 대출 금리가 바뀔 수 있나요?", a: "2026년 기준 1.7%로 6년째 동결 중이에요. 다만 정부 정책에 따라 향후 변동될 수 있으니 한국장학재단 공지를 확인하세요." },
  { q: "생활비 대출 200만원을 한 번에 받을 수 있나요?", a: "학기당 200만원이에요. 1학기 200만원, 2학기 200만원으로 연 최대 400만원까지 받을 수 있어요." },
  { q: "등록금 대출이랑 생활비 대출 둘 다 받을 수 있나요?", a: "네, 소득구간 기준만 충족하면 둘 다 신청 가능해요. 등록금은 학교로, 생활비는 본인 계좌로 각각 입금돼요." },
  { q: "대학원생도 학자금 대출이 되나요?", a: "등록금 대출은 소득구간 제한 없이 가능하고, 생활비 대출은 6구간 이하여야 해요. 학부와 기준이 달라요." },
  { q: "소득구간은 어떻게 확인하나요?", a: "한국장학재단 홈페이지에서 소득구간 산정을 먼저 신청해야 해요. 산정까지 2~4주 걸리니 대출 신청 전에 미리 해두세요." },
  { q: "상환은 언제부터 해야 하나요?", a: "졸업 후 6개월 뒤부터 상환이 시작돼요. 원리금 균등 분할(15~25년), 소득연동 상환 등 방법을 선택할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "한국장학재단: 학자금 대출 신청", url: "https://www.kosaf.go.kr/" },
      { label: "교육부: 2026년 학자금 지원 정책", url: "https://www.moe.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 학자금 · 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        학자금 대출 금리와 생활비 대출 한도, 얼마까지?<br />
        2026년 신청 자격과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        등록금이 부담스러운데 어디서 빌려야 할지 모르겠죠.
        정부 학자금 대출은 금리가 1.7%로 시중 은행보다 훨씬 저렴해요.
        등록금은 전액, 생활비는 학기당 200만원까지 대출돼요.
        소득구간별 신청 자격과 절차를 아래에서 바로 확인하세요.
      </p>

      <Divider />

      <H2>금리와 한도, 한눈에 보면?</H2>
      <p style={body}>
        2026년 학자금 대출 금리는 연 1.7%예요. 2020년부터 6년 연속 동결된 수치고요.
        은행 일반 대출이 5~8%인 걸 생각하면 부담이 확 줄어들어요.
        500만원 대출 시 1년 이자가 약 8만 5천원 수준이에요.
      </p>

      <GreenBox title="2026년 학자금 대출 핵심">
        금리: 연 1.7% (6년 연속 동결)<br />
        등록금 대출: 소요액 전액 | 학부 10구간 이하<br />
        생활비 대출: 학기당 200만원 (연 400만원) | 학부 8구간 이하
      </GreenBox>

      <Divider />

      <H2>등록금 대출과 생활비 대출, 뭐가 다르죠?</H2>
      <p style={body}>
        등록금 대출은 학교에 내는 등록금(수업료 + 입학금)을 빌리는 거예요.
        소요액 전액을 대출받을 수 있어서 학교 등록금만큼 받아요.
        학교로 직접 입금되는 방식이에요.
      </p>
      <p style={body}>
        생활비 대출은 기숙사비, 식비, 교재비 같은 생활 자금을 빌리는 거예요.
        학기당 200만원까지, 연간 최대 400만원이 한도예요.
        본인 계좌로 입금되는데, 신청 후 약 8주 걸려요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>등록금 대출</p>
        <p style={{ ...body, marginBottom: 4 }}>한도: 소요액 전액 | 자격: 학부 10구간 이하</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>생활비 대출</p>
        <p style={{ ...body, marginBottom: 0 }}>한도: 학기당 200만원 | 자격: 학부 8구간 이하, 대학원 6구간 이하</p>
      </BorderBox>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        <a href="https://www.kosaf.go.kr/" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a> 홈페이지에서 온라인으로 신청해요.
        매 학기마다 새로 신청해야 하고, 소득구간 산정이 선행돼야 해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>신청할 때 필요한 서류는?</H2>
      <p style={body}>
        대부분 온라인으로 처리되지만, 미리 준비해두면 신청이 빨라요.
      </p>

      <SectionBadge>준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>핵심 정리 체크리스트</H2>
      <p style={body}>
        학자금 대출 신청 전에 아래 항목을 꼭 확인하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        학자금 대출 금리·한도 관련 실제 질문을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국장학재단 공시 정보를 바탕으로 작성됐어요. 학기별 세부 일정은 한국장학재단(kosaf.go.kr)에서 확인하세요." />
    </div>
  );
}
