"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

// Q1: 실업급여 받다가 조기 재취업하면 구직촉진수당을 받을 수 있는지 궁금한 구직자
// Q2: 수급 요건 확인 후 고용센터에 신청해서 잔여 급여의 50% 일시금 수령
// Q3: 소정급여일수 절반 이상 남은 상태에서 재취업, 12개월 이상 고용 유지
// Q4: GreenBox(요건 요약) + Steps(신청 절차) + Checklist + FAQ

const STEPS = [
  { title: "수급 요건 확인", desc: "소정급여일수의 절반 이상 남은 상태에서 재취업해야 해요. 예를 들어 소정급여일수가 180일이면 90일 이상 남은 상태에서 취업해야 해요. 자영업 개시도 포함돼요.", tip: "일용근로나 단기 알바는 해당 안 돼요. 12개월 이상 고용이 유지돼야 해요." },
  { title: "12개월 고용 유지", desc: "재취업한 직장에서 12개월 이상 근무해야 구직촉진수당을 받을 수 있어요. 12개월 채우기 전에 퇴사하면 지급 대상에서 제외돼요.", tip: "자영업은 12개월 이상 사업자등록을 유지해야 해요." },
  { title: "고용센터에 신청", desc: "12개월 고용 유지 후 관할 고용센터에 방문하거나 고용보험 홈페이지(ei.go.kr)에서 신청해요. 재직증명서나 사업자등록증이 필요해요." },
  { title: "지급", desc: "남은 실업급여의 50%를 일시금으로 받아요. 소정급여일수 120일에 60일 남았다면, 60일분 실업급여의 50%가 지급돼요." },
];

const CHECKLIST = [
  "소정급여일수 절반 이상 남은 상태에서 재취업",
  "재취업 후 12개월 이상 고용 유지 필수",
  "지급액: 남은 실업급여의 50% 일시금",
  "일용근로·단기 알바는 대상 아님",
  "자영업 개시도 포함 (12개월 사업자등록 유지)",
  "고용센터 방문 또는 ei.go.kr에서 신청",
];

const FAQS = [
  { q: "구직촉진수당은 얼마나 받나요?", a: "남은 실업급여의 50%를 일시금으로 받아요. 소정급여일수 180일에 100일 남았다면, 100일분 실업급여의 절반이에요." },
  { q: "자영업 시작해도 받을 수 있나요?", a: "네, 자영업 개시도 재취업으로 인정돼요. 다만 12개월 이상 사업자등록을 유지해야 해요." },
  { q: "12개월 안에 퇴사하면요?", a: "구직촉진수당 지급 대상에서 제외돼요. 12개월은 반드시 채워야 해요." },
  { q: "파트타임으로 취업해도 되나요?", a: "주 15시간 이상 근무하는 취업이면 인정돼요. 일용근로나 초단기 알바는 해당 안 돼요." },
  { q: "신청 기한이 있나요?", a: "12개월 고용 유지 후 빨리 신청하는 게 좋아요. 구체적인 기한은 관할 고용센터(1350)에 확인하세요." },
];

const REFERENCES = [{ category: "공식 사이트", items: [{ label: "고용보험: 구직촉진수당 안내", url: "https://www.ei.go.kr" }, { label: "고용노동부: 고용보험 제도", url: "https://www.moel.go.kr" }] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 조기재취업</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>구직촉진수당, 조기 재취업하면 얼마 받나?<br />수급 요건과 신청 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}><a href="/w/실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a> 받는 중에 빨리 취업하면 남은 급여의 50%를 한 번에 받을 수 있어요. 이게 구직촉진수당(조기재취업수당)이에요. 소정급여일수의 절반 이상 남은 상태에서 재취업하고, 12개월 이상 다녀야 받을 수 있어요.</p>
      <Divider />
      <H2>수급 요건이 뭔가요?</H2>
      <p style={body}>핵심 조건은 두 가지예요. 소정급여일수의 절반 이상 남은 상태에서 재취업할 것, 그리고 12개월 이상 고용을 유지할 것이에요.</p>
      <GreenBox title="구직촉진수당 요건">소정급여일수 50% 이상 남은 상태에서 재취업<br />12개월 이상 고용 유지 필수<br />지급액: 남은 실업급여의 50% (일시금)</GreenBox>
      <Divider />
      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>12개월 고용을 유지한 후에 고용센터에 신청하면 돼요.</p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>구직촉진수당 관련 핵심 사항이에요.</p>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>구직촉진수당 관련 실제 질문이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 세부 기준은 고용센터(1350)에서 확인하세요." />
    </div>
  );
}
