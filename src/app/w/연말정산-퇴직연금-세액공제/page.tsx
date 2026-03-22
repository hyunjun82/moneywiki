"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "퇴직연금 공제로 실제로 얼마나 돌려받아요?: 퇴직연금 공제는 세액공제예요. 넣은 돈에 공제율을 곱한 만큼 바로 돌려받아요.",
  "어떤 퇴직연금이 공제돼요?: 퇴직연금 유형에 따라 달라요.",
  "퇴직연금 공제 한도가 있어요: 연금저축이랑 합산해서 연 900만 원까지 공제받을 수 있어요.",
  "중도에 빼면 손해예요: 퇴직연금을 55세 전에 해지하거나 연금 아닌 방식으로 받으면 기타소득세 16.5%가 붙어요.",
  "놓치기 쉬운 체크포인트: - 회사가 넣어주는 돈은 공제 '안 돼요'. 본인이 추가로 넣은 금액만 공제 대상이에요",
  "퇴직연금 공제 어떻게 신청해요?: 연말정산 간소화서비스에서 자동으로 나와요.",
];

const FAQS = [
  { q: "회사에서 납입한 퇴직연금도 공제받을 수 있나요?", a: "아니요. 회사가 납입하는 부담금은 공제 대상이 아니에요. 근로자가 추가로 납입한 금액만 공제돼요." },
  { q: "연금저축과 퇴직연금 공제 한도가 별도인가요?", a: "아니요. 연금저축과 퇴직연금(IRP 포함)은 합산하여 연 900만원 한도가 적용돼요." },
  { q: "DC형에 추가 납입하면 공제받을 수 있나요?", a: "네. DC형 퇴직연금에 근로자가 추가로 납입한 금액은 세액공제 대상이에요." },
  { q: "DB형은 왜 공제가 안 되나요?", a: "DB형은 회사가 전액 부담하고 근로자가 추가 납입할 수 없어서 공제 대상이 없어요." },
  { q: "IRP랑 뭐가 달라요?", a: "퇴직연금은 회사를 통해 가입하고, IRP는 개인이 금융기관에서 직접 가입해요. 공제 혜택은 같아요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국세청 연말정산 연금계좌 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6596&cntntsId=7875" },
      { label: "소득세법 제59조의3", url: "https://www.law.go.kr/법령/소득세법" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산 퇴직연금 세액공제</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>회사에서 퇴직연금 가입해주셨죠. DC형이라면 본인이 추가로 돈을 넣을 수 있어요.</p>
      <Divider />

      <H2>퇴직연금 공제로 실제로 얼마나 돌려받아요?</H2>
      <p style={body}>퇴직연금 공제는 세액공제예요. 넣은 돈에 공제율을 곱한 만큼 바로 돌려받아요.</p>
      <p style={body}>연봉 5,500만 원 이하면 공제율이 16.5%예요. 900만 원 넣으면 900만 원 × 16.5% = 148.5만 원을 세금에서 빼줘요. 연봉 5,500만 원 초과면 공제율이 13.2%라서 118.8만 원 환급이에요.</p>
      <p style={body}>근데 중요한 거 하나 있어요. 회사가 넣어주는 돈은 공제 안 돼요. 본인이 추가로 넣은 금액만 공제 대상이에요.</p>
      <GreenBox title="핵심 요약">퇴직연금 공제는 세액공제예요. 넣은 돈에 공제율을 곱한 만큼 바로 돌려받아요.<br />연봉 5,500만 원 이하면 공제율이 16.5%예요. 900만 원 넣으면 900만 원 × 16.5% = 148.5만 원을 세금에서 빼줘요. 연봉</GreenBox>
      <Divider />

      <H2>어떤 퇴직연금이 공제돼요?</H2>
      <p style={body}>퇴직연금 유형에 따라 달라요.</p>
      <p style={body}>DC형(확정기여형): 공제돼요. 근로자가 추가로 납입한 금액이 대상이에요. 회사 납입분은 안 되고 본인 추가 납입분만요.</p>
      <p style={body}>IRP(개인형퇴직연금): 공제돼요. 납입 전액이 대상이에요.</p>
      <BorderBox><p style={body}>퇴직연금 유형에 따라 달라요.</p></BorderBox>
      <Divider />

      <H2>퇴직연금 공제 한도가 있어요</H2>
      <p style={body}>연금저축이랑 합산해서 연 900만 원까지 공제받을 수 있어요.</p>
      <p style={body}>일반적인 조합이 연금저축 600만 원 + 퇴직연금(또는 IRP) 300만 원이에요. 연금저축이 수수료 낮고 운용이 자유로워서 먼저 채우고, 나머지를 퇴직연금이나 IRP로 채우는 거예요.</p>
      <p style={body}>연금저축 없이 퇴직연금이나 IRP만 넣어도 900만 원 전액 공제 가능해요.</p>
      <Divider />

      <H2>중도에 빼면 손해예요</H2>
      <p style={body}>퇴직연금을 55세 전에 해지하거나 연금 아닌 방식으로 받으면 기타소득세 16.5%가 붙어요.</p>
      <p style={body}>세액공제받은 금액을 토해내는 셈이라서 손해가 커요. 그래서 퇴직연금은 장기 목적으로 유지하는 게 좋아요.</p>
      <p style={body}>부득이한 사유가 있으면 불이익 없이 인출할 수 있어요. 무주택자 주택 구입, 6개월 이상 요양, 파산·개인회생, 천재지변 등이 해당돼요.</p>
      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>- 회사가 넣어주는 돈은 공제 &quot;안 돼요&quot;. 본인이 추가로 넣은 금액만 공제 대상이에요</p>
      <p style={body}>- 연금저축이랑 합산 &quot;900만원&quot; 한도예요. 연금저축 먼저 채우고 나머지 퇴직연금으로</p>
      <p style={body}>- DB형은 공제 &quot;안 돼요&quot;. DC형이나 IRP만 본인 추가 납입분 공제 가능해요</p>
      <Divider />

      <H2>퇴직연금 공제 어떻게 신청해요?</H2>
      <p style={body}>연말정산 간소화서비스에서 자동으로 나와요.</p>
      <p style={body}>금융기관에서 국세청에 납입 내역을 제출하기 때문에 따로 할 거 없어요. 간소화서비스 열어서 &quot;연금계좌 세액공제&quot; 항목 확인하시면 돼요.</p>
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
