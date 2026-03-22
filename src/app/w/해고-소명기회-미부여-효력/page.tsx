"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 회사에서 변명할 기회도 안 주고 해고 통보를 받았는데, 이게 법적으로 유효한 해고인지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 소명기회 미부여가 부당해고 사유가 되는지 판단하고, 노동위원회에 구제 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 근로기준법에는 소명기회 의무 없지만 취업규칙에 있으면 반드시 지켜야 함, 소명 미부여 시 부당해고 가능성, 구제 신청 절차(3개월 이내), 필요 서류.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론 먼저) + BorderBox(법적 근거) + Steps(구제 신청 절차) + Checklist(증거 확보) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, Checklist, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "취업규칙에 소명 규정이 없으면 어떡하나요?", a: "근로기준법상 의무 사항은 아니에요. 하지만 중대한 징계인데 소명 기회 없이 해고했다면 정당성을 인정받기 어려워요." },
  { q: "소명 기회를 줬지만 형식적이었어요", a: "실질적인 기회를 준 게 아니라면 문제가 돼요. 충분한 시간과 자료를 제공하지 않은 형식적 소명은 부족하다고 볼 수 있어요." },
  { q: "구두로만 해명 기회를 줬어요", a: "취업규칙에서 서면 소명을 요구하면 구두만으로는 부족해요. 규정에서 정한 방식을 따라야 해요." },
  { q: "해고 통보서를 안 받았어요", a: "근로기준법에서 해고 사유와 시기를 서면으로 통지하도록 정하고 있어요. 서면 통지 없는 해고는 그 자체로 부당해고 사유가 돼요." },
  { q: "구제 신청하면 복직할 수 있나요?", a: "노동위원회가 부당해고로 판정하면 원직 복직 또는 해고 기간 임금 지급 명령을 내려요. 금전보상도 가능해요." },
  { q: "구제 신청 비용이 드나요?", a: "무료예요. 노동위원회 구제 신청에 비용이 들지 않아요. 변호사 선임은 선택사항이에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 (법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "중앙노동위원회", url: "https://www.nlrc.go.kr" },
      { label: "고용노동부 부당해고 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELIEF_STEPS = [
  { title: "증거 수집", desc: "해고 통지서, 취업규칙(소명 규정), 문자·이메일, 동료 증언 등을 모아요.", tip: "취업규칙 사본은 회사에 요청하면 교부 의무가 있어요" },
  { title: "노동위원회 구제 신청", desc: "해고 통보받은 날로부터 3개월 이내에 관할 지방노동위원회에 구제 신청서를 제출해요.", tip: "3개월 넘으면 신청 자체가 안 되니 서두르세요" },
  { title: "심문 절차", desc: "노동위원회에서 근로자와 사용자 양측의 주장을 듣고 증거를 심사해요." },
  { title: "판정 결과", desc: "부당해고 판정 시 원직 복직 또는 임금 지급 명령이 나와요.", tip: "불복하면 중앙노동위원회 재심 또는 법원 소송 가능" },
];

const EVIDENCE_ITEMS = [
  "해고 통지서 (서면 또는 문자·카톡)",
  "취업규칙 사본 (소명기회 관련 조항 확인)",
  "단체협약 사본 (해당 시)",
  "근로계약서",
  "해고 전후 문자·이메일·카톡 내용",
  "동료 증인 진술서",
  "인사위원회·징계위원회 회의록 (확보 가능 시)",
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 해고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소명 기회 없이 해고당했다면?<br />
        부당해고 구제 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갑자기 해고 통보를 받았는데 &quot;왜요?&quot; 물어볼 기회도 없었다고요?
        회사 규정에 소명 기회를 주도록 돼 있는데 지키지 않았다면
        그 해고는 부당해고가 될 수 있어요. 어떻게 대응해야 하는지 알려드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소명기회를 안 주면 해고가 무효인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a> 자체에는 소명기회 부여 의무가 없어요.
        하지만 단체협약이나 취업규칙에 &quot;징계 전 소명 기회를 부여한다&quot;는 규정이 있다면 반드시 지켜야 해요.
      </p>

      <GreenBox title="결론부터">
        · 취업규칙에 소명 규정이 <strong>있는데 안 지켰다면</strong> → 부당해고 가능성 높음<br />
        · 취업규칙에 소명 규정이 <strong>없어도</strong> → 중대 징계인데 소명 기회 없으면 정당성 인정 어려움<br />
        · 해고 사유가 <strong>명백하고 중대</strong>(현행범 횡령 등)하면 → 소명 없이도 유효할 수 있음<br />
        → 대부분의 경우 소명 기회 없는 해고는 정당성을 인정받기 어려워요.
      </GreenBox>

      <Divider />

      <H2>왜 소명기회가 중요한가요?</H2>
      <p style={body}>
        소명기회란 근로자가 징계나 해고 전에 자기 입장을 밝히고 해명할 기회예요.
        대부분의 취업규칙에 &quot;징계위원회 개최 전 해당 근로자에게 소명 기회를 부여한다&quot;는 조항이 있어요.
      </p>

      <BorderBox>
        <strong>판례의 입장</strong><br />
        · 취업규칙에 소명 규정이 있는데 이를 무시하고 한 해고는 <strong>절차적 정당성이 없다</strong>고 본 사례가 다수<br />
        · 회사가 스스로 만든 규칙을 지키지 않은 것이므로 <strong>해고의 효력을 부정</strong><br />
        · 다만 해고 사유가 극히 명백하고 중대한 경우(현행범 횡령 등)는 예외적으로 유효할 수 있음<br />
        · 형식적으로만 소명 기회를 준 경우(충분한 시간·자료 미제공)도 <strong>실질적 소명이 아니라고</strong> 판단
      </BorderBox>

      <Divider />

      <H2>어떤 증거를 모아야 하나요?</H2>
      <p style={body}>
        부당해고 구제 신청을 하려면 증거가 중요해요.
        특히 취업규칙에 소명 규정이 있다는 걸 입증해야 해요.
      </p>

      <SectionBadge>확보해야 할 증거</SectionBadge>
      <Checklist items={EVIDENCE_ITEMS} />

      <p style={body}>
        취업규칙 사본은 회사에 요청하면 교부 의무가 있어요.
        거부하면 고용노동부에 신고할 수 있어요. 해고 전후 문자나 카톡은 캡처해서 보관하세요.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      <H2>부당해고 구제, 어떻게 신청하나요?</H2>
      <p style={body}>
        해고 통보받은 날로부터 <strong>3개월 이내</strong>에
        <a href="https://www.nlrc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>노동위원회</a>에
        구제 신청해야 해요. 3개월이 지나면 신청 자체가 불가능하니 서두르세요.
      </p>

      <SectionBadge>구제 신청 절차</SectionBadge>
      <Steps steps={RELIEF_STEPS} />

      <Divider />

      <H2>서면 통지 없는 해고도 부당해고예요</H2>
      <p style={body}>
        근로기준법 제27조에서 해고 사유와 시기를 <strong>서면으로 통지</strong>하도록 규정하고 있어요.
        &quot;너 내일부터 안 나와도 돼&quot;라고 말로만 한 해고는 서면 통지 의무 위반이에요.
        이것만으로도 부당해고가 성립할 수 있어요.
      </p>

      <GreenBox title="지금 당장 할 수 있는 것">
        해고 통보를 받았다면 지금 바로 취업규칙 사본을 회사에 요청하세요.
        소명 기회 관련 조항이 있는지 확인하고, 해고 전후 모든 증거(문자·이메일·카톡)를 보관하세요.
        3개월 안에 관할 지방노동위원회에 구제 신청을 접수하세요.
      </GreenBox>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 판례를 바탕으로 작성했어요. 구체적인 사건은 노무사나 변호사에게 상담받으세요." />
    </div>
  );
}
