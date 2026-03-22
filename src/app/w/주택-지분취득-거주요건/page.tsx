"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "핵심 요약: | 취득 시점 | 거주요건 | 보유요건 |",
  "실제 사례로 이해하기: 한마음씨는 주택 지분을 두 번에 나눠서 취득했어요.",
  "지분별 거주요건 판단 방법: 1. 지분별로 취득시기를 각각 확인",
  "공동상속주택 지분 추가 취득: 공동상속주택의 소수지분을 상속받은 후 지분을 추가 취득하는 경우도 마찬가지예요.",
  "비과세 받으려면: □ 지분별 취득시기 모두 확인했나요?",
];

const FAQS = [
  { q: "주택 지분을 나눠서 취득하면 거주요건이 어떻게 돼요?", a: "지분별로 취득시기가 다르면 각각 거주요건을 따로 판단해요." },
  { q: "조정대상지역에서 1/2 지분 취득하고, 해제 후 나머지 취득하면요?", a: "조정대상지역에서 취득한 1/2 지분만 2년 거주요건이 적용돼요." },
  { q: "지분 일부만 거주요건 미충족이면 비과세 못 받나요?", a: "네, 주택 전체에 대해 비과세를 못 받아요. 조정지역 취득 지분 거주 필수예요." },
  { q: "증여받은 지분과 매매로 취득한 지분이 다르면요?", a: "각 지분별 취득시기에 조정대상지역이었는지 따로 판단해요." },
  { q: "공동상속주택 지분 추가 취득하면 거주요건은요?", a: "조정대상지역 지정 이후 취득분은 2년 보유+거주, 지정 전 취득분은 2년 보유만 필요해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국세청", url: "https://www.nts.go.kr" },
      { label: "기획재정부", url: "https://www.moef.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 신고</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>주택 지분취득 거주요건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;엄마한테 집 절반 받았는데, 조정 해제됐으니까 거주 안 해도 되는 거 아니에요?&quot;</p>
      <Divider />

      <H2>핵심 요약</H2>
      <p style={body}>| 취득 시점 | 거주요건 | 보유요건 |</p>
      <p style={body}>|----------|---------|---------|</p>
      <p style={body}>| 조정대상지역 지정 중 취득 | 2년 이상 | 2년 이상 |</p>
      <GreenBox title="핵심 요약">| 취득 시점 | 거주요건 | 보유요건 |<br />|----------|---------|---------|</GreenBox>
      <Divider />

      <H2>실제 사례로 이해하기</H2>
      <p style={body}>한마음씨는 주택 지분을 두 번에 나눠서 취득했어요.</p>
      <p style={body}>'19.12월              →    '21.5월            →    '25.7월</p>
      <p style={body}>A주택 1/2 지분 취득        A주택 1/2 지분 취득      A주택 양도</p>
      <BorderBox><p style={body}>한마음씨는 주택 지분을 두 번에 나눠서 취득했어요.</p></BorderBox>
      <Divider />

      <H2>지분별 거주요건 판단 방법</H2>
      <p style={body}>1. 지분별로 취득시기를 각각 확인</p>
      <p style={body}>2. 각 취득시기에 조정대상지역이었는지 확인</p>
      <p style={body}>3. 조정대상지역 취득 지분 → 2년 거주 필요</p>
      <Divider />

      <H2>공동상속주택 지분 추가 취득</H2>
      <p style={body}>공동상속주택의 소수지분을 상속받은 후 지분을 추가 취득하는 경우도 마찬가지예요.</p>
      <p style={body}>1차: 비조정대상지역에서 소수지분 상속</p>
      <p style={body}>2차: 매매로 추가 지분 취득</p>
      <Divider />

      <H2>비과세 받으려면</H2>
      <p style={body}>□ 지분별 취득시기 모두 확인했나요?</p>
      <p style={body}>□ 각 취득시기에 조정대상지역이었나요?</p>
      <p style={body}>□ 조정대상지역 취득 지분 → 2년 거주 충족했나요?</p>
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
