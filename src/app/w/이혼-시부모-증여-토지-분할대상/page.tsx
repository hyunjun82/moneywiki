"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "증여 토지는 재산분할 대상인가요?: 원칙적으로 재산분할 대상이 아니에요.",
  "분할 포함 여부는 어떻게 판단하나요?: 배우자의 기여도를 보고 결정해요.",
  "법적 판정 기준은 뭔가요?: 혼인 기간, 기여 정도, 재산 가치 변화를 종합 판단해요.",
  "이혼 시부모 증여 토지 분할대상 결정은 어떻게 되나요?: 법원이 구체적 사정을 따져서 결정해요.",
];

const FAQS = [
  { q: "시부모 증여 토지를 남편 명의로 했는데 재산분할 대상인가요?", a: "원칙적으로 특유재산이라 분할 대상이 아니에요. 하지만 배우자가 재산세 납부나 가사노동으로 토지 유지에 기여했다면 분할 대상이 될 수 있어요." },
  { q: "증여받은 토지로 농사지었는데 이것도 기여로 인정되나요?", a: "네, 인정될 수 있어요. 배우자가 직접 농사를 짓거나 관리해서 토지 가치를 유지하고 수익을 냈다면 명백한 기여로 봐요." },
  { q: "증여 토지는 재산분할 대상인가요?", a: "원칙적으로 재산분할 대상이 아니에요." },
  { q: "분할 포함 여부는 어떻게 판단하나요?", a: "배우자의 기여도를 보고 결정해요." },
  { q: "법적 판정 기준은 뭔가요?", a: "혼인 기간, 기여 정도, 재산 가치 변화를 종합 판단해요." },
  { q: "이혼 시부모 증여 토지 분할대상 결정은 어떻게 되나요?", a: "법원이 구체적 사정을 따져서 결정해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "민법", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령정보 - 이혼 재산분할", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=2" },
      { label: "대법원 판례", url: "https://www.law.go.kr/LSW/precInfoP.do?precSeq=81848" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>이혼 시부모 증여 토지 분할대상: 증여 토지 법적 판정 및 분할 포함 여부</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>결혼 후 시부모님이 남편 명의로 토지를 증여했어요. 이혼하면 이 땅도 나눠야 하나요? 원칙적으론 안 되지만 경우에 따라 달라져요. 법적 기준과 실제 판례 알려드릴게요.</p>
      <Divider />

      <H2>증여 토지는 재산분할 대상인가요?</H2>
      <p style={body}>원칙적으로 재산분할 대상이 아니에요.</p>
      <p style={body}>민법 제830조에서 부부 일방이 상속·증여·유증으로 받은 재산은 '특유재산'이라고 정해요.</p>
      <p style={body}>특유재산은 혼인 중 부부가 함께 만든 재산이 아니라서 이혼할 때 나누지 않아요.</p>
      <GreenBox title="핵심 요약">원칙적으로 재산분할 대상이 아니에요.<br />민법 제830조에서 부부 일방이 상속·증여·유증으로 받은 재산은 '특유재산'이라고 정해요.</GreenBox>
      <Divider />

      <H2>분할 포함 여부는 어떻게 판단하나요?</H2>
      <p style={body}>배우자의 기여도를 보고 결정해요.</p>
      <p style={body}>대법원 판례는 &quot;특유재산이라도 다른 배우자가 적극적으로 재산 유지·증식에 협력했으면 분할 대상&quot;이라고 봐요.</p>
      <p style={body}>예를 들어 증여받은 토지의 재산세를 부부 공동생활비로 냈거나, 토지를 담보로 받은 대출 이자를 함께 갚았다면 기여로 인정돼요.</p>
      <BorderBox><p style={body}>배우자의 기여도를 보고 결정해요.</p></BorderBox>
      <Divider />

      <H2>법적 판정 기준은 뭔가요?</H2>
      <p style={body}>혼인 기간, 기여 정도, 재산 가치 변화를 종합 판단해요.</p>
      <p style={body}>법원은 단순히 &quot;증여받았으니 안 나눈다&quot;로 끝내지 않아요.</p>
      <p style={body}>혼인 기간이 10년 넘으면 특유재산도 사실상 부부 공동재산처럼 취급되는 경향이 있어요.</p>
      <Divider />

      <H2>이혼 시부모 증여 토지 분할대상 결정은 어떻게 되나요?</H2>
      <p style={body}>법원이 구체적 사정을 따져서 결정해요.</p>
      <p style={body}>실무에서는 혼인 기간이 길수록 특유재산도 재산분할 대상에 포함되는 경우가 많아요.</p>
      <p style={body}>다만 특유재산 원소유자(증여받은 배우자)의 재산분할 비율을 더 높게 정하는 식으로 조정해요.</p>
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
