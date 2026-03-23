"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "얼마나 깎여요?: 중소기업에 취업한 청년은 5년간 소득세 90%를 감면받아요. 연간 200만원 한도예요.",
  "누가 받을 수 있어요?: - 취업일 현재 만 15~34세",
  "얼마나 오래 받아요?: - 고령자(60세 이상): 3년",
  "어떻게 신청해요?: 입사할 때 신청서 내면 돼요.",
  "신청 안 했으면요?: 입사할 때 신청 안 했어도 경정청구로 환급받을 수 있어요. 최근 5년치까지 가능해요.",
  "다른 감면이랑 중복돼요?: 청년이면서 장애인이면 더 유리한 것 하나만 적용돼요.",
];

const FAQS = [
  { q: "청년 소득세 감면율은?", a: "5년간 소득세 90%(연 200만원 한도) 감면돼요." },
  { q: "감면 대상 나이는?", a: "만 15~34세 청년이에요. 군복무 기간은 나이에서 차감돼요." },
  { q: "신청 안 했는데 지금이라도 받을 수 있나요?", a: "네. 경정청구로 지난 5년치까지 환급받을 수 있어요." },
  { q: "대기업에서 중소기업으로 이직하면요?", a: "중소기업 취업일부터 5년간 감면받을 수 있어요." },
  { q: "군복무 나이 차감은 어떻게 돼요?", a: "군복무 기간(최대 6년)을 나이에서 빼요. 만 36세도 군복무 2년이면 34세로 인정돼요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
      { label: "조세특례제한법 제30조", url: "https://www.law.go.kr/법령/조세특례제한법" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산 중소기업 청년</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;중소기업 다니는데 세금 깎아주는 거 있다면서요?&quot; &quot;90% 감면이면 거의 안 내는 거 아니에요?&quot;</p>
      <Divider />

      <H2>얼마나 깎여요?</H2>
      <p style={body}>중소기업에 취업한 청년은 5년간 소득세 90%를 감면받아요. 연간 200만원 한도예요.</p>
      <p style={body}>예시 (연봉 4천만원, 결정세액 200만원):</p>
      <p style={body}>- 감면액 (90%): 180만원</p>
      <GreenBox title="핵심 요약">중소기업에 취업한 청년은 5년간 소득세 90%를 감면받아요. 연간 200만원 한도예요.<br />예시 (연봉 4천만원, 결정세액 200만원):</GreenBox>
      <Divider />

      <H2>누가 받을 수 있어요?</H2>
      <p style={body}>- 취업일 현재 만 15~34세</p>
      <p style={body}>- 군복무 기간(최대 6년)은 나이에서 차감</p>
      <p style={body}>- 계산 나이: 36 - 2 = 34세 → 감면 가능</p>
      <BorderBox><p style={body}>- 취업일 현재 만 15~34세</p></BorderBox>
      <Divider />

      <H2>얼마나 오래 받아요?</H2>
      <p style={body}>- 고령자(60세 이상): 3년</p>
      <p style={body}>- 중소기업 → 중소기업 이직: 잔여 기간 계속 감면</p>
      <p style={body}>- 중소기업 → 대기업 이직: 감면 종료</p>
      <Divider />

      <H2>어떻게 신청해요?</H2>
      <p style={body}>입사할 때 신청서 내면 돼요.</p>
      <p style={body}>1. 입사할 때 '중소기업 취업자 소득세 감면신청서' 작성</p>
      <p style={body}>3. 회사가 매월 급여에서 감면 적용</p>
      <Divider />

      <H2>신청 안 했으면요?</H2>
      <p style={body}>입사할 때 신청 안 했어도 경정청구로 환급받을 수 있어요. 최근 5년치까지 가능해요.</p>
      <p style={body}>3. 중소기업 취업자 감면 선택</p>
      <p style={body}>- 3년 총 환급: 540만원</p>
      <Divider />

      <H2>다른 감면이랑 중복돼요?</H2>
      <p style={body}>청년이면서 장애인이면 더 유리한 것 하나만 적용돼요.</p>
      <p style={body}>- 청년 90% vs 장애인 70% → 청년 90% 적용</p>
      <p style={body}>- 청년 90% vs 고령자 70% → 청년 90% 적용</p>
      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>- 청년(15~34세)은 &quot;5년간 90%&quot; 감면, 연 &quot;200만원&quot; 한도예요</p>
      <p style={body}>- 군복무 나이 차감돼요. 만 36세도 군복무 2년이면 34세로 인정받아 감면 가능</p>
      <p style={body}>- 입사할 때 바로 감면신청서 제출하세요. 나중에 경정청구하면 번거로워요</p>
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
