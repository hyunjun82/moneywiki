"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "노조 전임자에 대한 연차휴가 적용여부: 노조 전임자는 회사 업무 대신 노조 활동에 전념하지만, 근로관계는 유지돼요.",
  "전임기간은 출근으로 인정돼요: 노조 전임기간은 출근한 것으로 인정돼요.",
  "연차휴가 사용은 어떻게?: 연차휴가 사용은 회사에 청구해요.",
  "전임 복귀 후 연차휴가 처리: 전임을 마치고 복귀하면 미사용 연차휴가를 처리해야 해요.",
];

const FAQS = [
  { q: "노조 전임자도 연차휴가가 발생하나요?", a: "네, 전임기간도 근로관계가 유지되어 연차휴가가 발생해요." },
  { q: "전임기간은 출근율에 어떻게 반영되나요?", a: "전임기간은 출근한 것으로 인정돼요." },
  { q: "전임자가 연차를 쓰려면 누구에게 청구하나요?", a: "회사에 청구해요. 다만 노조와 협의가 필요할 수 있어요." },
  { q: "노조 전임자에 대한 연차휴가 적용여부에 대해 알려주세요", a: "노조 전임자는 회사 업무 대신 노조 활동에 전념하지만, 근로관계는 유지돼요." },
  { q: "전임기간은 출근으로 인정돼요에 대해 알려주세요", a: "노조 전임기간은 출근한 것으로 인정돼요." },
  { q: "연차휴가 사용은 어떻게?", a: "연차휴가 사용은 회사에 청구해요." },
  { q: "전임 복귀 후 연차휴가 처리에 대해 알려주세요", a: "전임을 마치고 복귀하면 미사용 연차휴가를 처리해야 해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "근로기준법 제60조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "노동조합법", url: "https://www.law.go.kr/법령/노동조합및노동관계조정법" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>노조 전임자 연차휴가 적용여부 출근율</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;노조 전임자도 연차휴가를 받을 수 있나요?&quot; 이런 궁금증 있으셨죠? 노조 전임자도 연차휴가가 발생해요.</p>
      <Divider />

      <H2>노조 전임자에 대한 연차휴가 적용여부</H2>
      <p style={body}>노조 전임자는 회사 업무 대신 노조 활동에 전념하지만, 근로관계는 유지돼요.</p>
      <p style={body}>근로관계가 유지되는 한 연차휴가도 발생해요. 전임기간 1년이 지나면 15일의 연차휴가가 생기고, 계속 근로기간에 따라 가산 연차도 발생해요.</p>
      <p style={body}>전임 전에 이미 발생한 연차휴가도 유효해요. 전임이 되었다고 연차휴가가 소멸하지 않아요.</p>
      <GreenBox title="핵심 요약">노조 전임자는 회사 업무 대신 노조 활동에 전념하지만, 근로관계는 유지돼요.<br />근로관계가 유지되는 한 연차휴가도 발생해요. 전임기간 1년이 지나면 15일의 연차휴가가 생기고, 계속 근로기간에 따라 가산 연차도 발생해요.</GreenBox>
      <Divider />

      <H2>전임기간은 출근으로 인정돼요</H2>
      <p style={body}>노조 전임기간은 출근한 것으로 인정돼요.</p>
      <p style={body}>출근율 계산 시 전임기간은 출근일수에 포함돼요. 전임기간이 1년이라면 80% 이상 출근한 것으로 보아 연차휴가 15일이 발생해요.</p>
      <p style={body}>고용노동부 행정해석과 판례에서 인정하고 있어요. 전임자도 근로관계가 유지되고, 노조 활동도 근로제공의 일종으로 볼 수 있기 때문이에요.</p>
      <BorderBox><p style={body}>노조 전임기간은 출근한 것으로 인정돼요.</p></BorderBox>
      <Divider />

      <H2>연차휴가 사용은 어떻게?</H2>
      <p style={body}>연차휴가 사용은 회사에 청구해요.</p>
      <p style={body}>연차휴가는 사용자가 부여하는 것이므로 회사에 청구해요. 다만 노조 전임자는 노조 업무를 수행하고 있으므로 노조와 협의가 필요할 수 있어요.</p>
      <p style={body}>실무적으로는 노조에도 알리고 회사에도 청구하는 방식으로 처리하는 경우가 많아요.</p>
      <Divider />

      <H2>전임 복귀 후 연차휴가 처리</H2>
      <p style={body}>전임을 마치고 복귀하면 미사용 연차휴가를 처리해야 해요.</p>
      <p style={body}>전임기간 중 사용하지 못한 연차휴가가 있다면 복귀 후에 사용할 수 있어요. 사용기간이 지났다면 연차수당으로 정산받아요.</p>
      <p style={body}>복귀 후에는 전임기간을 포함한 총 근속기간을 기준으로 연차휴가가 계산돼요.</p>
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
