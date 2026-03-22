"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "어떤 게 위반인가요: 계약갱신청구권을 행사했는데 집주인이 정당한 사유 없이 거절하면 위반이에요.",
  "대응 방법: 가장 먼저 시도해볼 방법이에요. 무료이고 빠르거든요.",
  "손해배상 청구: 집주인이 실거주한다고 해서 나갔는데, 다른 세입자 들이면요?",
  "입증 자료 준비: 소송이든 조정이든 증거가 필요해요.",
  "주의사항: 손해배상 청구권에는 시효가 있어요.",
];

const FAQS = [
  { q: "집주인이 5% 넘게 올리면요?", a: "위반이에요. 5% 초과분은 지급 의무 없어요. 분쟁조정이나 소송으로 해결할 수 있어요." },
  { q: "갱신 거절당했는데 실거주 아니었어요.", a: "손해배상 청구할 수 있어요. 이사비, 복비, 보증금 차액 등 받을 수 있어요." },
  { q: "어디에 신고하나요?", a: "임대차분쟁조정위원회(132)에 조정 신청하거나, 법원에 소송할 수 있어요." },
  { q: "집주인이 계속 연락 안 받아요.", a: "내용증명 보내세요. 등기우편으로 보내면 수령 여부와 관계없이 도달한 것으로 봐요." },
  { q: "실거주 확인은 언제 해야 해요?", a: "나간 후 3개월 정도 후에 확인하는 게 좋아요. 너무 빨리 확인하면 이사 준비 중일 수 있고, 너무 늦으면 증거 확보가 어려워요." },
  { q: "조정 안 되면 바로 소송해야 하나요?", a: "조정 거부해도 소송은 언제든 할 수 있어요. 다만 소송 전에 변호사 상담 받아보세요. 승소 가능성, 비용, 시간을 따져봐야 해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>주택임대차보호법 위반</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;집주인이 갱신 안 해준다고 해요. 실거주한다면서요. 근데 이상해요.&quot;</p>
      <Divider />

      <H2>어떤 게 위반인가요</H2>
      <p style={body}>계약갱신청구권을 행사했는데 집주인이 정당한 사유 없이 거절하면 위반이에요.</p>
      <p style={body}>정당한 사유는 거절사유에 나열된 9가지뿐이에요. 그 외 이유로 거절하면 불법이에요.</p>
      <p style={body}>&quot;다른 사람한테 더 비싸게 빌려줄 거야&quot; - 이건 정당한 사유가 아니에요.</p>
      <GreenBox title="핵심 요약">계약갱신청구권을 행사했는데 집주인이 정당한 사유 없이 거절하면 위반이에요.<br />정당한 사유는 거절사유에 나열된 9가지뿐이에요. 그 외 이유로 거절하면 불법이에요.</GreenBox>
      <Divider />

      <H2>대응 방법</H2>
      <p style={body}>가장 먼저 시도해볼 방법이에요. 무료이고 빠르거든요.</p>
      <p style={body}>132번으로 전화하면 돼요. 대한법률구조공단에서 운영하는 임대차분쟁조정위원회예요.</p>
      <p style={body}>조정위원회에서 양쪽 말을 듣고 조정안을 제시해요. 양쪽이 합의하면 재판상 화해와 같은 효력이 생겨요.</p>
      <BorderBox><p style={body}>가장 먼저 시도해볼 방법이에요. 무료이고 빠르거든요.</p></BorderBox>
      <Divider />

      <H2>손해배상 청구</H2>
      <p style={body}>집주인이 실거주한다고 해서 나갔는데, 다른 세입자 들이면요?</p>
      <p style={body}>| 항목 | 받을 수 있는 것 |</p>
      <p style={body}>|------|----------------|</p>
      <Divider />

      <H2>입증 자료 준비</H2>
      <p style={body}>소송이든 조정이든 증거가 필요해요.</p>
      <p style={body}>- 갱신 요청 문자/카톡/내용증명</p>
      <p style={body}>- 새 임대차 계약서 (보증금 비교용)</p>
      <Divider />

      <H2>주의사항</H2>
      <p style={body}>손해배상 청구권에는 시효가 있어요.</p>
      <p style={body}>안 사실로부터 3년, 행위가 있은 날로부터 10년 안에 청구해야 해요. 너무 오래 기다리면 권리가 소멸해요.</p>
      <p style={body}>집주인이랑 싸우더라도 기록은 차분하게 남기세요.</p>
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
