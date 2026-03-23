"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "확정일수제란?: 확정일수제는 출근율과 관계없이 매년 일정한 연차휴가 일수를 부여하는 제도예요.",
  "확정일수제의 유효 조건: 확정일수제가 유효하려면 법정 기준 이상이어야 해요.",
  "출근율 80% 미달 시 확정일수: 출근율이 80% 미달해도 확정일수는 보장돼요.",
  "확정일수제 도입 시 주의사항: 확정일수제를 도입할 때 몇 가지 주의사항이 있어요.",
];

const FAQS = [
  { q: "확정일수제면 출근율을 안 봐도 되나요?", a: "네, 확정일수제는 출근율과 관계없이 정해진 일수를 부여해요." },
  { q: "확정일수제가 법정 연차보다 적으면 어떻게 되나요?", a: "법정 연차휴가 일수에 미달하면 무효가 될 수 있어요." },
  { q: "회사에서 15일 확정일수제로 하면 유효한가요?", a: "법정 연차 15일과 같거나 그 이상이면 유효해요." },
  { q: "확정일수제란?", a: "확정일수제는 출근율과 관계없이 매년 일정한 연차휴가 일수를 부여하는 제도예요." },
  { q: "확정일수제의 유효 조건에 대해 알려주세요", a: "확정일수제가 유효하려면 법정 기준 이상이어야 해요." },
  { q: "출근율 80% 미달 시 확정일수에 대해 알려주세요", a: "출근율이 80% 미달해도 확정일수는 보장돼요." },
  { q: "확정일수제 도입 시 주의사항에 대해 알려주세요", a: "확정일수제를 도입할 때 몇 가지 주의사항이 있어요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "근로기준법 제60조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 행정해석", url: "https://www.moel.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연차휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연차휴가 확정일수제 출근율</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;우리 회사는 확정일수제인데 출근율이 의미가 있나요?&quot; 이런 궁금증 있으셨죠? 확정일수제는 출근율과 관계없이 일정 연차를 보장해요.</p>
      <Divider />

      <H2>확정일수제란?</H2>
      <p style={body}>확정일수제는 출근율과 관계없이 매년 일정한 연차휴가 일수를 부여하는 제도예요.</p>
      <p style={body}>법정 연차휴가는 80% 이상 출근해야 15일이 발생해요. 확정일수제는 이런 출근율 조건 없이 처음부터 정해진 일수를 부여하는 거예요.</p>
      <p style={body}>예를 들어 &quot;입사일에 15일 부여&quot;처럼 미리 연차휴가를 주는 방식이에요. 회사 취업규칙이나 단체협약으로 정해요.</p>
      <GreenBox title="핵심 요약">확정일수제는 출근율과 관계없이 매년 일정한 연차휴가 일수를 부여하는 제도예요.<br />법정 연차휴가는 80% 이상 출근해야 15일이 발생해요. 확정일수제는 이런 출근율 조건 없이 처음부터 정해진 일수를 부여하는 거예요.</GreenBox>
      <Divider />

      <H2>확정일수제의 유효 조건</H2>
      <p style={body}>확정일수제가 유효하려면 법정 기준 이상이어야 해요.</p>
      <p style={body}>법정 연차휴가보다 유리한 조건이어야 해요. 15일 확정일수제는 법정 기준과 같으므로 유효해요. 20일 확정일수제는 법정 기준보다 유리하므로 더 좋은 조건이에요.</p>
      <p style={body}>만약 12일 확정일수제라면 법정 15일에 미달해요. 이 경우 출근율 80% 이상인 근로자는 15일을 청구할 수 있어요.</p>
      <BorderBox><p style={body}>확정일수제가 유효하려면 법정 기준 이상이어야 해요.</p></BorderBox>
      <Divider />

      <H2>출근율 80% 미달 시 확정일수</H2>
      <p style={body}>출근율이 80% 미달해도 확정일수는 보장돼요.</p>
      <p style={body}>법정 연차휴가는 출근율 80% 미만이면 1개월 개근 시 1일씩만 발생해요. 최대 11일이에요. 하지만 확정일수제는 이런 제한이 없어요.</p>
      <p style={body}>15일 확정일수제에서 출근율이 70%여도 15일을 받아요. 이게 확정일수제의 장점이에요. 근로자에게 더 유리한 거예요.</p>
      <Divider />

      <H2>확정일수제 도입 시 주의사항</H2>
      <p style={body}>확정일수제를 도입할 때 몇 가지 주의사항이 있어요.</p>
      <p style={body}>가산 연차도 함께 고려해야 해요. 3년 이상 근속자는 법정으로 가산 연차가 발생해요. 확정일수에 가산 연차가 포함되어 있는지 명확히 해야 해요.</p>
      <p style={body}>중도입사자 처리 방법도 정해야 해요. 회계연도 중에 입사하면 일할 계산으로 부여할 건지, 전체 일수를 부여할 건지 정해야 해요.</p>
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
