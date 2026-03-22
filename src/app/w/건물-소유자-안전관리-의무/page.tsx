"use client";

/*
Q1. 건물을 새로 매입했거나 관리사무소에서 안전관리자 선임 연락을 받아 당장 뭘 해야 하는지 모르는 상황이에요.
Q2. 영역별(전기·승강기·가스·보일러) 안전관리자 선임과 정기점검 일정을 확인하고 처리할 수 있어야 해요.
Q3. 5가지 관리 영역, 각 법령·선임 기준·과태료 금액, 점검 주기, 신고 기한.
Q4. Checklist(영역별 체크) + Steps(선임 절차) + BorderBox(과태료 정리) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const APPOINT_STEPS = [
  { title: "건물 내 시설 파악", desc: "전기설비·승강기·가스·보일러 중 어떤 시설이 설치돼 있는지 확인해요." },
  { title: "영역별 안전관리자 선임", desc: "각 시설별로 자격을 갖춘 안전관리자를 지정해요. 외부 대행업체에 위탁도 가능하죠." },
  { title: "관할 기관에 선임 신고", desc: "전기는 한국전기안전공사, 승강기는 한국승강기안전공단에 15일 이내 신고해요." },
  { title: "정기 교육 이수", desc: "승강기 안전관리자는 최초 선임 시 + 매년 보수교육을 이수해야 해요." },
  { title: "정기점검 일정 관리", desc: "전기 연 1~2회, 승강기 월 1회 자체점검 + 연 1회 정밀점검. 달력에 미리 표시해두세요." },
];

const CHECKLIST_ITEMS = [
  "건물에 전기설비(자가용/일반용)가 있는지 확인",
  "승강기가 1대라도 있으면 안전관리자 선임 의무",
  "도시가스 설비 유무 확인 → 가스안전관리자 선임",
  "보일러 설치 여부 → 보일러 취급자 지정",
  "각 안전관리자 선임 신고서·교육 이수증·점검 결과서 보관",
  "건물 매입 시 이전 소유자 안전관리자 승계 여부 확인",
];

const FAQS = [
  { q: "승강기 1대뿐인데도 안전관리자를 선임해야 하나요?", a: "네, 1대만 있어도 의무예요. 관리주체가 직접 관리하는 경우엔 별도 선임이 면제되지만, 안전관리 교육은 이수해야 해요." },
  { q: "안전관리자를 외부 업체에 위탁할 수 있나요?", a: "전기안전관리는 한국전기안전공사나 민간 대행업체에 위탁할 수 있어요. 승강기는 유지보수업체에 관리를 맡길 수 있죠." },
  { q: "건물을 새로 샀는데 이전 소유자의 안전관리자가 그대로 유지되나요?", a: "자동 승계되지 않아요. 소유자가 바뀌면 관리주체 변경 신고를 하고, 안전관리자를 다시 선임하거나 승계 절차를 밟아야 해요." },
  { q: "정기점검을 안 받으면 어떻게 되나요?", a: "안전점검 미실시 시 2,000만원 이하 과태료가 부과돼요. 사고 발생 시엔 관리 소홀로 민·형사 책임까지 질 수 있어요." },
  { q: "관리비에 안전관리 비용을 포함시킬 수 있나요?", a: "상가건물이라면 관리비에 포함할 수 있어요. 안전관리자 인건비, 점검 비용, 교육비 등이 관리비 산정에 반영될 수 있죠." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "전기안전관리법", url: "https://www.law.go.kr/법령/전기안전관리법" },
    { label: "승강기안전관리법", url: "https://www.law.go.kr/법령/승강기안전관리법" },
    { label: "시설물의 안전 및 유지관리에 관한 특별법", url: "https://www.law.go.kr/법령/시설물의안전및유지관리에관한특별법" },
  ]},
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령정보: 건물 안전관리", url: "https://www.easylaw.go.kr" },
    { label: "한국승강기안전공단", url: "https://www.koelsa.or.kr" },
    { label: "한국전기안전공사", url: "https://www.kesco.or.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건물관리 · 안전의무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건물 소유자 안전관리 의무, 뭘 어떻게 해야 하나?<br />
        선임부터 과태료까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건물 사고 나면 관리사무소 탓이 아니라 소유자 책임이에요.
      </p>
      <p style={body}>
        관리사무소에서 &ldquo;안전관리자 선임하세요&rdquo; 연락이 왔는데 뭘 해야 하는지 막막하죠.
        <a href="https://www.law.go.kr/법령/전기안전관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>전기안전관리법</a>,{" "}
        <a href="https://www.law.go.kr/법령/승강기안전관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>승강기안전관리법</a>에 따라
        전기·승강기·가스·보일러 각 영역별로 자격자를 선임하고 정기점검을 받아야 해요.
        안 하면 과태료에, 사고 나면 형사처벌까지 받을 수 있으니 빠짐없이 챙기세요.
      </p>

      <Divider />

      {/* 섹션 1: 5가지 영역 */}
      <H2>건물주가 챙겨야 할 안전관리 영역은?</H2>
      <p style={body}>
        건물 소유자(또는 관리주체)가 법적으로 관리해야 하는 영역은 크게 5가지예요.
        각 영역마다 적용 법령과 관리 기준이 다르니, 내 건물에 해당되는 걸 먼저 파악해야 해요.
      </p>

      <SectionBadge>영역별 핵심 요약</SectionBadge>
      <BorderBox>
        <p style={{ ...body, marginBottom: 8 }}><strong>전기 안전관리</strong> — 자가용/일반용 전기설비가 있으면 전기안전관리자 선임 의무. 미선임 시 500만원 이하 벌금.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>승강기 안전관리</strong> — 승강기 1대라도 있으면 안전관리자 선임 필수. 미선임 시 100만원 이하 과태료, 교육 미이수 시 300만원 이하 과태료.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>가스 안전관리</strong> — 도시가스 설비가 있으면 가스안전관리자 선임 + 정기 검사.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>보일러 안전관리</strong> — 보일러 설치 건물은 취급자 지정 + 정기 검사.</p>
        <p style={body}><strong>구조물 안전관리</strong> — 일정 규모 이상(1종·2종 시설)은 정기안전점검 + 정밀안전진단 의무.</p>
      </BorderBox>

      <Divider />

      {/* 섹션 2: 선임 절차 */}
      <H2>안전관리자 선임은 어떻게 하나요?</H2>
      <p style={body}>
        건물 매입 직후나 관리주체가 바뀌면 15일 이내에 안전관리자를 선임·신고해야 해요.
        직접 자격자를 고용해도 되고, 외부 전문기관에 위탁해도 되죠.
      </p>
      <Steps steps={APPOINT_STEPS} />
      <p style={body}>
        선임만 하고 끝이 아니에요. 승강기 안전관리자는 최초 교육과 매년 보수교육까지 이수해야 법적 의무를 다하게 돼요.
      </p>

      <Divider />

      {/* 섹션 3: 과태료·벌금 */}
      <H2>의무 위반하면 과태료가 얼마나 나오나요?</H2>
      <p style={body}>
        영역별로 제재 수준이 달라요. 전기는 벌금, 승강기는 과태료, 안전점검은 별도 과태료가 부과되죠.
      </p>

      <GreenBox title="주요 제재 기준">
        전기안전관리자 미선임 → 500만원 이하 벌금<br />
        승강기 안전관리자 미선임 → 100만원 이하 과태료<br />
        승강기 안전관리 교육 미이수 → 300만원 이하 과태료<br />
        안전점검 미실시 → 2,000만원 이하 과태료<br />
        사고 발생 시 → 관리 소홀 민·형사 책임
      </GreenBox>
      <p style={body}>
        반복 위반하면 과태료가 가중돼요. 사고가 터지면 과태료뿐 아니라 업무상과실치사상죄로 형사처벌까지 받을 수 있으니,
        안전관리를 미루면 안 돼요.
      </p>

      <Divider />

      {/* 섹션 4: 체크리스트 */}
      <H2>안전관리 체크리스트, 하나씩 확인해보세요</H2>
      <p style={body}>
        건물을 새로 샀거나 관리 상태를 점검하려면 아래 항목을 하나씩 체크해보세요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        점검 일정은 달력에 미리 표시해두거나 관리업체와 연간 계약을 맺으면 놓치지 않아요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령 정보를 바탕으로 작성됐어요. 건물 규모와 용도에 따라 적용 기준이 다를 수 있으니, 관할 기관에 직접 확인하세요." />
    </div>
  );
}
