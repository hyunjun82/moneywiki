"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 폭행·상해를 당해서 고소부터 재판까지 전체 흐름을 알고 싶은 피해자
// Q2: 수사 절차 전체를 이해하고, 지금 해야 할 행동(고소/증거 수집)을 실행
// Q3: 고소→경찰 수사→검찰 송치→기소/불기소→불복 절차, 피해자 권리
// Q4: Steps(수사 절차) + GreenBox(핵심 흐름) + BorderBox(체포·구속 기준) + Checklist + FAQ

const STEPS = [
  {
    title: "고소·신고로 수사 개시",
    desc: "경찰서에 직접 방문해서 고소장을 내거나, 112로 신고하면 수사가 시작돼요. 경찰청 민원포털(minwon.police.go.kr)에서 전자고소도 가능해요. 고소장에 피해 사실, 가해자 정보, 증거자료를 첨부하세요.",
    tip: "병원 진단서, CCTV 영상, 사진, 녹취록 등이 핵심 증거예요.",
  },
  {
    title: "경찰 조사",
    desc: "피해자와 가해자를 각각 불러서 진술을 받아요. 조서를 작성하고 서명해야 하는데, 내용이 잘못됐으면 그 자리에서 고쳐 달라고 하세요. 경찰은 현장 조사, CCTV 확인, 목격자 진술도 수집해요.",
    tip: "조서에 서명하기 전에 꼼꼼히 읽어보세요. 한 번 서명하면 번복이 어려워요.",
  },
  {
    title: "검찰 송치",
    desc: "경찰 수사가 끝나면 검찰로 사건이 넘어가요. 검찰은 수사 기록을 검토하고, 필요하면 보강 수사를 해요. 기소할지 불기소할지 최종 결정하는 건 검찰이에요.",
  },
  {
    title: "기소 또는 불기소 결정",
    desc: "기소되면 법원에서 재판이 시작돼요. 약식명령(벌금형)이나 공판청구(정식 재판)로 나뉘어요. 불기소되면 처벌 없이 끝나는데, 피해자가 불복하면 재정신청이나 항고를 할 수 있어요.",
    tip: "재정신청은 불기소 결정 통지일부터 30일 이내에 해야 해요.",
  },
];

const CHECKLIST = [
  "고소·신고 → 경찰 수사 → 검찰 송치 → 기소/불기소 순서",
  "불구속 수사가 원칙 — 대부분 출석 요구로 진행",
  "체포·구속은 증거인멸·도주 우려 있을 때만",
  "불기소 결정에 불복 → 재정신청 또는 항고 (30일 이내)",
  "피해자 권리: 수사 진행 상황 확인 요청 가능",
  "무료 법률상담: 대한법률구조공단 (132)",
  "범죄피해구조금 신청 가능 (피해 회복 어려울 때)",
];

const FAQS = [
  { q: "고소하면 가해자가 바로 잡혀가나요?", a: "대부분은 아니에요. 불구속 수사가 원칙이라서 출석 요구로 조사받아요. 주거 부정, 증거인멸 우려, 도주 우려가 있을 때만 체포하거나 구속해요." },
  { q: "경찰 조사 끝나면 바로 처벌받나요?", a: "아니에요. 검찰로 사건이 넘어가서 검찰이 기소 여부를 결정해요. 기소되면 법원에서 재판을 받고, 불기소되면 처벌 없이 끝나요." },
  { q: "불기소 결정이 나면 더 이상 방법이 없나요?", a: "재정신청이나 항고를 할 수 있어요. 재정신청은 법원에서 다시 심사하는 거고, 항고는 상급 검찰청에 재검토를 요청하는 거예요. 둘 다 30일 이내에 해야 해요." },
  { q: "합의하면 처벌이 가벼워지나요?", a: "네, 형사합의가 되면 처벌이 가벼워지거나 불기소될 수 있어요. 특히 반의사불벌죄(폭행)는 합의하면 공소 자체가 취소돼요." },
  { q: "무료 법률상담은 어디서 받나요?", a: "대한법률구조공단(132)에서 무료 상담받을 수 있어요. 소득 기준 충족 시 무료 변호사 지원도 가능해요." },
  { q: "증거가 없으면 고소할 수 없나요?", a: "증거 없이도 고소할 수 있어요. 다만 증거가 있으면 수사와 처벌에 큰 도움이 돼요. 진단서, CCTV, 목격자 진술, 사진 등을 최대한 확보하세요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "형사소송법: 수사·공소제기 절차", url: "https://www.law.go.kr/법령/형사소송법" },
      { label: "범죄피해자보호법: 피해자 권리", url: "https://www.law.go.kr/법령/범죄피해자보호법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 폭행·상해 피해자", url: "https://www.easylaw.go.kr" },
      { label: "대한법률구조공단 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 형사 · 수사절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        폭행·상해 당했을 때 수사 절차는?<br />
        고소부터 재판까지 전체 흐름
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        맞았는데 어떻게 해야 할지 모르겠죠.
        고소하면 수사가 시작되고, 경찰 조사 → 검찰 송치 → 기소 여부 결정 순서로 진행돼요.
        <a href="https://www.law.go.kr/법령/형사소송법" style={{ color: "#1D9E75", textDecoration: "underline" }}>형사소송법</a>에 따른 전체 절차를 단계별로 정리했어요.
      </p>

      <Divider />

      <H2>수사 절차, 전체 흐름은 어떻게 되나요?</H2>
      <p style={body}>
        고소·신고 → 경찰 수사 → 검찰 송치 → 기소/불기소 결정 순서예요.
        대부분 불구속 상태에서 진행되고, 기소되면 법원 재판을 받아요.
      </p>

      <SectionBadge>수사 진행 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>체포나 구속은 언제 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/형사소송법" style={{ color: "#1D9E75", textDecoration: "underline" }}>형사소송법 제200조의2</a>에 따르면 불구속 수사가 원칙이에요.
        대부분은 출석 요구로 조사받아요.
        도주 우려, 증거인멸 우려, 주거가 일정하지 않은 경우에만 체포·구속해요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>체포 유형</p>
        <p style={{ ...body, marginBottom: 4 }}>현행범 체포: 범죄 중이거나 직후에 잡는 것</p>
        <p style={{ ...body, marginBottom: 4 }}>긴급체포: 영장 없이 잡고 나중에 영장 신청</p>
        <p style={{ ...body, marginBottom: 4 }}>일반체포: 영장 받아서 체포</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>구속</p>
        <p style={{ ...body, marginBottom: 0 }}>법원 구속영장 필요 | 최대 20일 구치소 수감</p>
      </BorderBox>

      <Divider />

      <H2>불기소 결정이 나면 끝인가요?</H2>
      <p style={body}>
        아니에요. 피해자가 불복할 수 있는 방법이 두 가지 있어요.
        재정신청은 법원에서 다시 심사받는 거고, 항고는 상급 검찰청에 재검토를 요청하는 거예요.
        둘 다 불기소 결정 통지일부터 30일 이내에 해야 해요.
      </p>

      <GreenBox title="불기소 불복 방법">
        재정신청: 관할 법원에 신청 → 법원이 재심사 → 공소제기 결정 가능<br />
        항고: 상급 검찰청에 신청 → 재검토 후 기소 지휘 가능<br />
        기한: 불기소 결정 통지일부터 30일 이내
      </GreenBox>

      <Divider />

      <H2>피해자가 챙겨야 할 것</H2>
      <p style={body}>
        수사 절차에서 피해자가 알아야 할 핵심을 체크리스트로 정리했어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        폭행·상해 수사절차 관련 실제 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 형사소송법을 바탕으로 작성됐어요. 개별 사건의 법률 상담은 대한법률구조공단(132) 또는 변호사에게 문의하세요." />
    </div>
  );
}
