"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "구직촉진수당 부정수급이란: 고용보험법에서 정한 수급 요건을 충족하지 못하는데 거짓이나 부정한 방법으로 수당을 받는 걸 부정수급이라고 해",
  "부정수급은 어떻게 적발되나요: 고용센터는 생각보다 훨씬 정교하게 감시해요.",
  "부정수급 처벌은 얼마나 무거운가요: 고용보험법 제116조에 따라 3년 이하 징역 또는 3천만원 이하 벌금을 받아요.",
];

const FAQS = [
  { q: "취업했는데 실업급여 계속 받으면 들키나요?", a: "거의 100% 들켜요. 고용보험 시스템에서 4대보험 가입 이력을 자동으로 대조하거든요. 들키면 형사처벌 + 2배 추징이에요." },
  { q: "부정수급 적발되면 어떻게 되나요?", a: "받은 금액의 2배를 반환해야 하고, 3년 이하 징역 또는 3천만원 이하 벌금을 받아요. 5년간 실업급여도 못 받아요." },
  { q: "가족 이름으로 받으면 안 걸리나요?", a: "사기죄로 더 무거운 처벌 받아요. 본인뿐 아니라 명의를 빌려준 가족도 공범으로 처벌될 수 있어요." },
  { q: "구직촉진수당 부정수급이란에 대해 알려주세요", a: "고용보험법에서 정한 수급 요건을 충족하지 못하는데 거짓이나 부정한 방법으로 수당을 받는 걸 부정수급이라고 해요." },
  { q: "부정수급은 어떻게 적발되나요에 대해 알려주세요", a: "고용센터는 생각보다 훨씬 정교하게 감시해요." },
  { q: "부정수급 처벌은 얼마나 무거운가요에 대해 알려주세요", a: "고용보험법 제116조에 따라 3년 이하 징역 또는 3천만원 이하 벌금을 받아요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 근로</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>구직촉진수당 부정수급·처벌·환수·제재 기준</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>취업이 확정됐는데 아직 구직촉진수당을 받을 자격이 남았어요. 동생 이름을 빌려서 받으면 들키지 않을까 생각하셨나요? 절대 안 돼요. 이건 사기죄고 형사처벌 대상이에요.</p>
      <Divider />

      <H2>구직촉진수당 부정수급이란</H2>
      <p style={body}>고용보험법에서 정한 수급 요건을 충족하지 못하는데 거짓이나 부정한 방법으로 수당을 받는 걸 부정수급이라고 해요.</p>
      <p style={body}>이미 취업했는데 신고 안 하고 계속 받기: 가장 흔한 유형이에요. 아르바이트, 일용직이라도 취업하면 실업 상태가 아니에요.</p>
      <p style={body}>타인 명의 도용: 수급자격 없는데 가족이나 지인 이름으로 신청하는 경우예요.</p>
      <GreenBox title="핵심 요약">고용보험법에서 정한 수급 요건을 충족하지 못하는데 거짓이나 부정한 방법으로 수당을 받는 걸 부정수급이라고 해요.<br />이미 취업했는데 신고 안 하고 계속 받기: 가장 흔한 유형이에요. 아르바이트, 일용직이라도 취업하면 실업 상태가 아니에요.</GreenBox>
      <Divider />

      <H2>부정수급은 어떻게 적발되나요</H2>
      <p style={body}>고용센터는 생각보다 훨씬 정교하게 감시해요.</p>
      <p style={body}>4대보험 자동 대조: 고용보험 시스템에서 매일 4대보험 가입 이력을 확인해요. 취업해서 건강보험이나 국민연금 가입되면 자동으로 걸려요.</p>
      <p style={body}>국세청 소득 자료: 사업소득, 근로소득 발생 여부를 국세청과 실시간 연계해서 확인해요.</p>
      <BorderBox><p style={body}>고용센터는 생각보다 훨씬 정교하게 감시해요.</p></BorderBox>
      <Divider />

      <H2>부정수급 처벌은 얼마나 무거운가요</H2>
      <p style={body}>고용보험법 제116조에 따라 3년 이하 징역 또는 3천만원 이하 벌금을 받아요.</p>
      <p style={body}>2배 추징: 받은 금액의 2배를 반환해야 해요. 100만원 부정수급했으면 200만원 토해내야 하는 거예요.</p>
      <p style={body}>수급자격 제한: 향후 5년간 실업급여를 받을 수 없어요. 나중에 진짜 실직해도 못 받는 거죠.</p>
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>핵심 사항을 정리했어요.</p>
      <SectionBadge>체크 항목</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>관련 질문을 모았어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 최신 기준은 관련 기관에서 확인하세요." />
    </div>
  );
}
