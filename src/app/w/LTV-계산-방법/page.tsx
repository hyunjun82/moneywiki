"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "LTV 계산 공식: LTV = (대출금액 ÷ 주택 담보가치) × 100이에요. 5억원 집에 3억원 대출이면 (3억 ÷ 5억) ×",
  "2026년 LTV 한도: 규제지역(수도권) 40%, 비규제지역 70%, 생애최초는 규제지역 70%, 비규제 80%예요.",
];

const FAQS = [
  { q: "LTV 계산은 어떻게 하나요?", a: "대출금액을 주택가격으로 나누고 100을 곱하면 돼요. 5억원 집에 3억원 대출이면 60%예요." },
  { q: "규제지역 LTV는요?", a: "수도권과 규제지역은 40%, 비규제는 70%예요." },
  { q: "생애최초는 LTV가 높나요?", a: "네, 규제지역 70%, 비규제 80%까지 가능해요." },
  { q: "LTV 계산 공식에 대해 알려주세요", a: "LTV = (대출금액 ÷ 주택 담보가치) × 100이에요. 5억원 집에 3억원 대출이면 (3억 ÷ 5억) × 100 = 60%예요." },
  { q: "2026년 LTV 한도에 대해 알려주세요", a: "규제지역(수도권) 40%, 비규제지역 70%, 생애최초는 규제지역 70%, 비규제 80%예요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "LTV DTI DSR 계산", url: "https://kbthink.com/main/asset-management/wealth-manage-tip/kbthink-original/202408/LTV-DTI-DSR.html" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>LTV 계산 방법 한도 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>집을 사려고 대출받는데 LTV라는 말 들어보셨죠? Loan to Value의 약자로, 담보가치 대비 대출 비율이에요. 어떻게 계산하는지 지금부터 설명해 드릴게요.</p>
      <Divider />

      <H2>LTV 계산 공식</H2>
      <p style={body}>LTV = (대출금액 ÷ 주택 담보가치) × 100이에요. 5억원 집에 3억원 대출이면 (3억 ÷ 5억) × 100 = 60%예요.</p>
      <GreenBox title="핵심 요약">LTV = (대출금액 ÷ 주택 담보가치) × 100이에요. 5억원 집에 3억원 대출이면 (3억 ÷ 5억) × 100 = 60%예요.</GreenBox>
      <Divider />

      <H2>2026년 LTV 한도</H2>
      <p style={body}>규제지역(수도권) 40%, 비규제지역 70%, 생애최초는 규제지역 70%, 비규제 80%예요.</p>
      <BorderBox><p style={body}>규제지역(수도권) 40%, 비규제지역 70%, 생애최초는 규제지역 70%, 비규제 80%예요.</p></BorderBox>
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
