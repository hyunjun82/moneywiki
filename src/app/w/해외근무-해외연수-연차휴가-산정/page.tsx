"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "해외근무기간은 출근으로 인정돼요: 해외에서 근무한 기간은 출근한 것으로 인정돼요.",
  "해외연수기간도 출근으로 인정해요: 회사 지시에 의한 해외연수라면 출근으로 인정돼요.",
  "출근율 산정 방법: 해외근무기간이 있을 때 출근율은 이렇게 계산해요.",
  "복직 후 연차휴가 처리: 해외근무를 마치고 복직하면 연차휴가는 계속 근로기간을 기준으로 계산해요.",
];

const FAQS = [
  { q: "해외근무기간도 연차휴가 출근율에 포함되나요?", a: "네, 해외근무기간은 출근한 것으로 인정돼요." },
  { q: "해외연수 중에도 연차가 발생하나요?", a: "회사 지시에 의한 연수라면 출근으로 인정되어 연차가 발생해요." },
  { q: "해외근무 후 복직하면 연차는 어떻게 되나요?", a: "해외근무기간도 계속 근로한 것으로 보아 연차일수에 반영돼요." },
  { q: "해외근무기간은 출근으로 인정돼요에 대해 알려주세요", a: "해외에서 근무한 기간은 출근한 것으로 인정돼요." },
  { q: "해외연수기간도 출근으로 인정해요에 대해 알려주세요", a: "회사 지시에 의한 해외연수라면 출근으로 인정돼요." },
  { q: "출근율 산정 방법에 대해 알려주세요", a: "해외근무기간이 있을 때 출근율은 이렇게 계산해요." },
  { q: "복직 후 연차휴가 처리에 대해 알려주세요", a: "해외근무를 마치고 복직하면 연차휴가는 계속 근로기간을 기준으로 계산해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "근로기준법 제60조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>해외근무 해외연수 연차휴가 산정</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;해외근무 다녀왔는데 연차휴가는 어떻게 계산해요?&quot; 이런 궁금증 있으셨죠? 해외근무기간이나 해외연수기간도 연차휴가 산정에 포함돼요.</p>
      <Divider />

      <H2>해외근무기간은 출근으로 인정돼요</H2>
      <p style={body}>해외에서 근무한 기간은 출근한 것으로 인정돼요.</p>
      <p style={body}>해외파견, 해외지사 근무, 해외법인 파견 등 회사 지시에 의해 해외에서 근무한 기간은 소정근로일에 출근한 것으로 봐요. 출근율 80% 이상이면 연차휴가 15일이 발생하고, 이 기간도 계산에 포함돼요.</p>
      <p style={body}>해외근무기간이 길어서 1년을 넘기더라도 계속 근로한 것으로 인정돼요. 가산 연차도 해외근무기간을 포함해서 계산해요.</p>
      <GreenBox title="핵심 요약">해외에서 근무한 기간은 출근한 것으로 인정돼요.<br />해외파견, 해외지사 근무, 해외법인 파견 등 회사 지시에 의해 해외에서 근무한 기간은 소정근로일에 출근한 것으로 봐요. 출근율 80% 이상이면 </GreenBox>
      <Divider />

      <H2>해외연수기간도 출근으로 인정해요</H2>
      <p style={body}>회사 지시에 의한 해외연수라면 출근으로 인정돼요.</p>
      <p style={body}>회사가 업무 목적으로 파견한 어학연수, 기술연수, MBA 등은 출근한 것으로 봐요. 연수기간 동안에도 연차휴가가 발생해요.</p>
      <p style={body}>다만 개인적인 사유로 휴직하고 자비로 연수를 다녀온 경우는 달라요. 이때는 휴직기간으로 처리되어 출근으로 인정되지 않아요.</p>
      <BorderBox><p style={body}>회사 지시에 의한 해외연수라면 출근으로 인정돼요.</p></BorderBox>
      <Divider />

      <H2>출근율 산정 방법</H2>
      <p style={body}>해외근무기간이 있을 때 출근율은 이렇게 계산해요.</p>
      <p style={body}>출근율 = (출근일수 + 해외근무일수) ÷ 소정근로일수 × 100</p>
      <p style={body}>해외근무일수는 분자에도, 분모(소정근로일수)에도 포함돼요. 해외근무기간 동안 국내 소정근로일수가 0이더라도 해외근무일수를 소정근로일수로 봐요.</p>
      <Divider />

      <H2>복직 후 연차휴가 처리</H2>
      <p style={body}>해외근무를 마치고 복직하면 연차휴가는 계속 근로기간을 기준으로 계산해요.</p>
      <p style={body}>해외근무 2년 + 국내근무 3년이면 총 5년 근무한 것으로 봐요. 가산 연차도 5년 기준으로 계산해서 17일(15일 + 2일)이 발생해요.</p>
      <p style={body}>해외근무 중에 사용하지 못한 연차휴가가 있다면 복직 후에 사용하거나 연차수당으로 정산받을 수 있어요.</p>
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
