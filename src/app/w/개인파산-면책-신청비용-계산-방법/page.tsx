"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "개인파산 비용은 총 얼마예요?: 3가지 비용이 있어요. 인지대, 송달료, 관재인 비용이에요.",
  "인지대는 얼마예요?: 2,000원이에요. 파산 신청 1,000원 + 면책 신청 1,000원이에요.",
  "송달료는 얼마예요?: 채권자 수에 따라 달라져요. 법원이 채권자들에게 '파산 신청 들어왔어요'라고 우편으로 알려야 하는데, 그 우",
  "관재인 비용은 얼마예요?: 30만원~50만원이에요. 법원 예규에는 최대 500만원까지라고 나와 있지만, 대부분 30-50만원 정도예요.",
  "소송구조로 비용 면제받을 수 있어요: 소송구조란 법원이 돈 없는 사람의 소송 비용을 면제하거나 나중에 내게 해주는 제도예요.",
  "실제 사례로 보는 비용 계산: 사례 1: 김모씨 (채권자 3명, 동시폐지)",
];

const FAQS = [
  { q: "개인파산 신청하는데 비용 얼마나 드나요?", a: "인지대 2,000원 + 송달료 15-30만원 + 관재인 비용 30-50만원(선임 시)이에요. 동시폐지면 총 20-35만원 정도예요." },
  { q: "돈이 없으면 어떻게 하나요?", a: "소송구조 신청하면 송달료를 면제받거나 나중에 낼 수 있어요. 기초생활수급자나 중위소득 75% 이하면 가능해요." },
  { q: "전자소송하면 더 싼가요?", a: "네, 인지대가 10% 할인돼서 1,800원이에요. 송달료는 동일해요." },
  { q: "개인파산 비용은 총 얼마예요?", a: "3가지 비용이 있어요. 인지대, 송달료, 관재인 비용이에요." },
  { q: "인지대는 얼마예요?", a: "2,000원이에요. 파산 신청 1,000원 + 면책 신청 1,000원이에요." },
  { q: "송달료는 얼마예요?", a: "채권자 수에 따라 달라져요. 법원이 채권자들에게 \"파산 신청 들어왔어요\"라고 우편으로 알려야 하는데, 그 우편비가 송달료예요." },
  { q: "관재인 비용은 얼마예요?", a: "30만원~50만원이에요. 법원 예규에는 최대 500만원까지라고 나와 있지만, 대부분 30-50만원 정도예요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "채무자 회생 및 파산에 관한 법률", url: "https://www.law.go.kr/법령/채무자회생및파산에관한법률" },
      { label: "서울회생법원 소송구조", url: "https://slb.scourt.go.kr/rel/guide/support/index_e.jsp" },
      { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>개인파산 면책 신청비용 계산 방법 및 소송구조 면제</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>빚이 5억인데 파산 신청하려고 법원 가니까 &quot;인지대, 송달료 내세요&quot;라고 하시죠. &quot;돈이 없어서 파산하는 건데 비용을 어떻게 내?&quot; 막막하시죠.</p>
      <Divider />

      <H2>개인파산 비용은 총 얼마예요?</H2>
      <p style={body}>3가지 비용이 있어요. 인지대, 송달료, 관재인 비용이에요.</p>
      <p style={body}>| 항목 | 금액 | 누가 내나 | 납입 시기 |</p>
      <p style={body}>|------|------|----------|-----------|</p>
      <GreenBox title="핵심 요약">3가지 비용이 있어요. 인지대, 송달료, 관재인 비용이에요.<br />| 항목 | 금액 | 누가 내나 | 납입 시기 |</GreenBox>
      <Divider />

      <H2>인지대는 얼마예요?</H2>
      <p style={body}>2,000원이에요. 파산 신청 1,000원 + 면책 신청 1,000원이에요.</p>
      <p style={body}>전자소송하면 10% 할인돼요. 1,800원이에요. 대법원 전자소송 포털에서 신청하면 자동 할인돼요.</p>
      <p style={body}>- 방문 신청: 법원 민원실에서 수입인지 구매 후 신청서에 붙임</p>
      <BorderBox><p style={body}>2,000원이에요. 파산 신청 1,000원 + 면책 신청 1,000원이에요.</p></BorderBox>
      <Divider />

      <H2>송달료는 얼마예요?</H2>
      <p style={body}>채권자 수에 따라 달라져요. 법원이 채권자들에게 &quot;파산 신청 들어왔어요&quot;라고 우편으로 알려야 하는데, 그 우편비가 송달료예요.</p>
      <p style={body}>송달료 = (10회 × 7,000원) + (채권자 수 × 4회 × 7,000원)</p>
      <p style={body}>송달료 = (10회 × 7,000원) + (채권자 수 × 3회 × 7,000원)</p>
      <Divider />

      <H2>관재인 비용은 얼마예요?</H2>
      <p style={body}>30만원~50만원이에요. 법원 예규에는 최대 500만원까지라고 나와 있지만, 대부분 30-50만원 정도예요.</p>
      <p style={body}>관재인이 뭐예요? 법원이 지정한 변호사예요. 채무자 재산을 조사하고, 팔아서 채권자들에게 나눠주는 일을 해요.</p>
      <p style={body}>- 동시폐지 결정: 재산 거의 없음 → 관재인 선임 안 함 → 비용 0원</p>
      <Divider />

      <H2>소송구조로 비용 면제받을 수 있어요</H2>
      <p style={body}>소송구조란 법원이 돈 없는 사람의 소송 비용을 면제하거나 나중에 내게 해주는 제도예요.</p>
      <p style={body}>서울회생법원 소송구조에 따르면 다음 사람들이 신청 가능해요:</p>
      <p style={body}>- 기초생활수급자 (「국민기초생활보장법」 수급자)</p>
      <Divider />

      <H2>실제 사례로 보는 비용 계산</H2>
      <p style={body}>사례 1: 김모씨 (채권자 3명, 동시폐지)</p>
      <p style={body}>- 채권자: 은행 2곳, 카드사 1곳</p>
      <p style={body}>- 관재인: 0원 (동시폐지)</p>
      <Divider />

      <H2>비용 납부 방법이에요</H2>
      <p style={body}>1. 수입인지 2,000원 구매 → 신청서에 붙임</p>
      <p style={body}>2. 송달료 납부서 받기 → 은행 납부 또는 현금</p>
      <p style={body}>3. 영수증 받아서 신청서와 함께 제출</p>
      <Divider />

      <H2>지금 바로 할 수 있는 일</H2>
      <p style={body}>- ❌ 비용 마련하려고 새 대출 받기 (면책 불허 사유)</p>
      <p style={body}>- ❌ 송달료 아껴려고 채권자 수 줄이기 (거짓 신고는 처벌받음)</p>
      <p style={body}>- ❌ 소송구조 신청 안 하고 포기 (2,000원만 있어도 신청 가능)</p>
      <Divider />

      <H2>무료 도움 받을 수 있는 곳</H2>
      <p style={body}>대한법률구조공단 (소득 기준 충족 시)</p>
      <p style={body}>- 웹사이트: https://www.klac.or.kr</p>
      <p style={body}>- 비용 계산기 제공 (자동계산)</p>
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
