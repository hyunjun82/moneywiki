"use client";

// Q1. 50~60대 경기도민이 체력 부담 적은 단시간 일자리를 찾으면서 지원금도 받고 싶은 상황
// Q2. 라이트잡 신청 대상인지 확인하고, 경기도일자리재단에서 신청을 완료한다
// Q3. 대상(50~64세 경기도민), 근무조건(주 15~36시간), 지원금(월 40만원), 4대보험 필수, 신청 방법
// Q4. GreenBox(자격 요약) + EligibilityChecker 대신 BorderBox(조건표) + Steps(신청) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "경기도일자리재단 홈페이지에서 신청하세요",
    desc: "gjf.or.kr 또는 잡아바 어플라이 앱에서 '베이비부머 라이트잡'을 검색해요. 모집 공고를 확인하고 온라인 신청서를 작성하면 돼요.",
    link: { label: "경기도일자리재단 바로가기", href: "https://www.gjf.or.kr" },
  },
  {
    title: "서류를 제출하세요",
    desc: "주민등록등본, 근로계약서, 4대보험 가입증명서를 제출해요. 사업자등록증 사본과 사업자 통장 사본도 필요해요. 온라인으로 첨부 가능해요.",
  },
  {
    title: "자격 심사를 받으세요",
    desc: "주민등록번호로 연령을 확인하고, 근로계약서로 근무시간과 계약 기간을 검토해요. 서류 심사 후 약 2주 안에 결과가 나와요.",
  },
  {
    title: "지원금을 받으세요",
    desc: "심사 통과 후 근무를 시작하면 사업주에게 근로자 1인당 월 40만원이 지급돼요. 급여는 사업주가 별도로 주고, 정부 지원금은 추가로 나오는 구조예요.",
  },
];

const CHECK = [
  "주민등록등본 (경기도 거주 확인)",
  "근로계약서 (주당 근무시간 15~36시간 명시)",
  "4대보험 가입증명서",
  "사업자등록증 사본 (사업주 제출)",
  "사업자 통장 사본 (지원금 수령용)",
];

const FAQS = [
  { q: "라이트잡 대상 연령이 정확히 몇 살인가요?", a: "만 50세 이상 64세 이하예요. 2026년 기준 1962년생부터 1976년생까지 해당돼요. 만 65세가 되면 대상에서 빠져요." },
  { q: "경기도 외 지역에서도 신청 가능한가요?", a: "안 돼요. 경기도에 주민등록을 둔 분만 신청할 수 있어요. 신청일 또는 근로시작일 기준으로 경기도 거주자여야 해요." },
  { q: "주 15시간 미만 일자리도 되나요?", a: "안 돼요. 주 15시간 이상 36시간 미만이어야 지원 대상이에요. 15시간 미만이면 단시간 근로자 기준에 미달해서 제외돼요." },
  { q: "지원금 40만원은 누구에게 가나요?", a: "사업주(기업)에게 지급돼요. 근로자 1인당 월 40만원을 사업주가 받아요. 급여는 사업주가 별도로 근로자에게 지급하는 구조예요." },
  { q: "4대보험에 안 들어가는 사업장이면요?", a: "지원 대상에서 제외돼요. 4대보험 가입이 필수 조건이에요. 고용보험 가입이 가능한 사업장이어야 해요." },
  { q: "가족이 운영하는 사업장에서 일해도 되나요?", a: "안 돼요. 사업주와 배우자이거나 4촌 이내 친인척 관계면 지원 대상에서 제외돼요." },
];

const REFS = [
  { category: "기관", items: [
    { label: "경기도일자리재단 라이트잡 공고", url: "https://www.gjf.or.kr" },
    { label: "경기도 일자리 누리집", url: "https://job.gg.go.kr" },
  ]},
  { category: "정부 안내", items: [
    { label: "고용노동부", url: "https://www.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 일자리 · 경기도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        라이트잡, 나도 신청할 수 있을까?<br />
        대상 연령과 근무 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        체력적으로 풀타임은 부담스럽지만 일은 하고 싶으시죠?
      </p>
      <p style={body}>
        경기도에서 만 50~64세를 위한 단시간 일자리 지원 사업 <strong>라이트잡</strong>을 운영하고 있어요.
        주 15~36시간만 일하면 되고, 사업주에게 근로자 1인당 <strong>월 40만원</strong>이 지원돼요.
        <a href="https://www.gjf.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>경기도일자리재단</a>에서 신청할 수 있어요.
      </p>

      <Divider />

      <H2>누가 신청할 수 있나요?</H2>

      <GreenBox title="라이트잡 신청 자격">
        {"· 연령: 만 50세 이상 64세 이하\n· 거주지: 경기도 주민등록자\n· 근무: 주 15시간~36시간 미만\n· 계약: 1개월 이상 근로계약\n· 보험: 4대보험 가입 필수\n· 제외: 사업주와 배우자 또는 4촌 이내 친인척"}
      </GreenBox>

      <Divider />

      <H2>근무 조건과 지원금은 어떻게 되나요?</H2>
      <p style={body}>
        하루 3~7시간 정도만 일해도 돼서 체력적 부담이 적어요. 급여는 사업주가 주고, 정부에서 월 40만원을 추가 지원하는 구조예요.
      </p>

      <BorderBox>
        <strong>근무 조건 요약</strong>{"\n"}
        {"· 주당 근무시간: 15시간 이상~36시간 미만\n· 최소 계약 기간: 1개월 이상\n· 4대보험: 가입 필수 (고용보험 기준)\n· 지원금: 사업주에게 근로자 1인당 월 40만원 지급\n· 급여: 사업주가 별도 지급 (최저임금 이상)"}
      </BorderBox>

      <Divider />

      <H2>신청은 이렇게 하세요</H2>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>준비할 서류가 뭔가요?</H2>
      <SectionBadge>서류 목록</SectionBadge>
      <Checklist items={CHECK} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 경기도일자리재단 라이트잡 공고에 따라 작성됐어요. 모집 기간과 세부 조건은 공고마다 달라질 수 있으니 최신 공고를 확인하세요." />
    </div>
  );
}
