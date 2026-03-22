"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "여성새로일하기센터가 뭐예요: 여성새로일하기센터(새일센터)는 고용노동부에서 운영하는 경력단절여성 재취업 지원 기관이에요.",
  "어떤 지원을 받을 수 있나요: 먼저 직업상담을 받을 수 있어요. 전문 상담사가 1:1로 만나서 적성, 경력, 희망 직종 등을 파악해 주고,",
  "어떻게 신청하나요: 여성새로일하기센터 홈페이지에 접속해서 가까운 센터를 찾으세요.",
];

const FAQS = [
  { q: "새일센터는 어디에 있나요?", a: "전국 160여 개 지역에 있어요. 여성새로일하기센터 홈페이지에서 가까운 센터를 찾을 수 있어요." },
  { q: "비용이 드나요?", a: "아니에요. 상담, 교육, 인턴십 알선 등 모든 서비스가 무료예요." },
  { q: "40대도 지원받을 수 있나요?", a: "네, 연령 제한 없어요. 경력단절 사유만 해당되면 40대, 50대도 모두 이용 가능해요." },
  { q: "여성새로일하기센터가 뭐예요에 대해 알려주세요", a: "여성새로일하기센터(새일센터)는 고용노동부에서 운영하는 경력단절여성 재취업 지원 기관이에요." },
  { q: "어떤 지원을 받을 수 있나요에 대해 알려주세요", a: "먼저 직업상담을 받을 수 있어요. 전문 상담사가 1:1로 만나서 적성, 경력, 희망 직종 등을 파악해 주고, 맞춤형 취업 계획을 세워줘요." },
  { q: "어떻게 신청하나요에 대해 알려주세요", a: "여성새로일하기센터 홈페이지에 접속해서 가까운 센터를 찾으세요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "고용노동부", url: "https://www.moel.go.kr" },
      { label: "여성새로일하기센터", url: "https://saeil.mogef.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 근로</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>경력단절여성 재취업 상담 지원</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>아이 어린이집 보내고 나니 시간이 생겼는데, 몇 년간 일을 안 해서 뭐부터 시작해야 할지 모르겠다고요? 이력서는 어떻게 쓰는지도 가물가물하고, 면접은 더 걱정되시죠. 이럴 때 도움받을 수 있는 곳이 있어요.</p>
      <Divider />

      <H2>여성새로일하기센터가 뭐예요</H2>
      <p style={body}>여성새로일하기센터(새일센터)는 고용노동부에서 운영하는 경력단절여성 재취업 지원 기관이에요.</p>
      <p style={body}>쉽게 말하면 결혼, 임신, 출산, 육아 등으로 일을 그만뒀다가 다시 일하고 싶은 여성들을 도와주는 곳이에요. 전국 160여 개 지역에 있어서 집 근처에서 쉽게 이용할 수 있어요.</p>
      <p style={body}>상담만 받는 게 아니라 직업교육 훈련, 인턴십, 취업 알선까지 한 곳에서 다 해결할 수 있어요. 혼자 막막하게 구직 활동하는 것보다 훨씬 효율적이에요.</p>
      <GreenBox title="핵심 요약">여성새로일하기센터(새일센터)는 고용노동부에서 운영하는 경력단절여성 재취업 지원 기관이에요.<br />쉽게 말하면 결혼, 임신, 출산, 육아 등으로 일을 그만뒀다가 다시 일하고 싶은 여성들을 도와주는 곳이에요. 전국 160여 개 지역에 있어서 집</GreenBox>
      <Divider />

      <H2>어떤 지원을 받을 수 있나요</H2>
      <p style={body}>먼저 직업상담을 받을 수 있어요. 전문 상담사가 1:1로 만나서 적성, 경력, 희망 직종 등을 파악해 주고, 맞춤형 취업 계획을 세워줘요.</p>
      <p style={body}>직업교육 훈련도 무료로 들을 수 있어요. 사무 직무(워드, 엑셀 등), 서비스 직무(바리스타, 제과제빵 등), 전문 직무(회계, 보육 등) 과정이 있어요. 교육 기간은 보통 1~3개월이에요.</p>
      <p style={body}>교육 후에는 인턴십 프로그램도 있어요. 실제 기업에서 3개월 정도 일해보면서 직무 경험을 쌓을 수 있어요. 인턴 기간에도 급여를 받고요.</p>
      <BorderBox><p style={body}>먼저 직업상담을 받을 수 있어요. 전문 상담사가 1:1로 만나서 적성, 경력, 희망 직종 등을 파악해 주고, 맞춤형 취업 계획을 세워줘요.</p></BorderBox>
      <Divider />

      <H2>어떻게 신청하나요</H2>
      <p style={body}>여성새로일하기센터 홈페이지에 접속해서 가까운 센터를 찾으세요.</p>
      <p style={body}>온라인으로 상담 예약을 하거나, 직접 센터를 방문해도 돼요. 신분증만 있으면 바로 상담받을 수 있어요.</p>
      <p style={body}>첫 상담에서는 경력단절 사유, 희망 직종, 교육 이수 여부 등을 이야기해요. 상담사가 적합한 프로그램을 안내해 주고, 일정을 조율해 줘요.</p>
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
