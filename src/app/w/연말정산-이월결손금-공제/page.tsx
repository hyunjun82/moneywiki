"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "기본 개념: 이전 과세연도의 결손금을 다음 연도로 이월하여 소득에서 공제하는 제도이에요.",
  "대상: - 개인사업자 (종합소득세 신고자)",
  "이월 기간: - 개인사업자: 최대 15년 이월 가능",
  "공제 한도: - 개인사업자: 해당 연도 소득금액의 100%",
  "적용 예시: 2023년 결손금: -2,000만원",
  "신고 절차: 1. 결손금 발생 연도: 종합소득세 또는 법인세 신고",
];

const FAQS = [
  { q: "기본 개념에 대해 알려주세요", a: "이전 과세연도의 결손금을 다음 연도로 이월하여 소득에서 공제하는 제도이에요." },
  { q: "대상에 대해 알려주세요", a: "- 개인사업자 (종합소득세 신고자)" },
  { q: "이월 기간에 대해 알려주세요", a: "- 개인사업자: 최대 15년 이월 가능" },
  { q: "공제 한도에 대해 알려주세요", a: "- 개인사업자: 해당 연도 소득금액의 100%" },
  { q: "적용 예시에 대해 알려주세요", a: "2023년 결손금: -2,000만원" },
  { q: "신고 절차에 대해 알려주세요", a: "1. 결손금 발생 연도: 종합소득세 또는 법인세 신고" },
  { q: "주의사항에 대해 알려주세요", a: "- 결손금 신고를 하지 않은 경우" },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "관련 법령·제도", url: "https://www.law.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제 · 금융</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>연말정산-이월결손금-공제</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}></p>
      <Divider />

      <H2>기본 개념</H2>
      <p style={body}>이전 과세연도의 결손금을 다음 연도로 이월하여 소득에서 공제하는 제도이에요.</p>
      <GreenBox title="핵심 요약">이전 과세연도의 결손금을 다음 연도로 이월하여 소득에서 공제하는 제도이에요.</GreenBox>
      <Divider />

      <H2>대상</H2>
      <p style={body}>- 개인사업자 (종합소득세 신고자)</p>
      <BorderBox><p style={body}>- 개인사업자 (종합소득세 신고자)</p></BorderBox>
      <Divider />

      <H2>이월 기간</H2>
      <p style={body}>- 개인사업자: 최대 15년 이월 가능</p>
      <p style={body}>- 법인사업자: 최대 15년 이월 가능 (2020년 이후 발생분)</p>
      <Divider />

      <H2>공제 한도</H2>
      <p style={body}>- 개인사업자: 해당 연도 소득금액의 100%</p>
      <p style={body}>- 중소기업: 소득금액의 100%</p>
      <p style={body}>- 일반법인: 소득금액의 60~80% (기업 규모별 차등)</p>
      <Divider />

      <H2>적용 예시</H2>
      <p style={body}>2023년 결손금: -2,000만원</p>
      <p style={body}>2024년 소득: 3,000만원</p>
      <p style={body}>→ 2024년 과세표준: 1,000만원 (3,000 - 2,000)</p>
      <Divider />

      <H2>신고 절차</H2>
      <p style={body}>1. 결손금 발생 연도: 종합소득세 또는 법인세 신고</p>
      <p style={body}>2. 결손금 확정: 세무서에서 결손금 확인</p>
      <p style={body}>3. 이월 적용: 다음 연도 신고 시 이월결손금 명세서 작성</p>
      <Divider />

      <H2>주의사항</H2>
      <p style={body}>- 결손금 신고를 하지 않은 경우</p>
      <p style={body}>- 결손금 발생 증빙 없는 경우</p>
      <p style={body}>1. 장부 작성 필수: 복식부기 의무자는 반드시 장부 작성</p>
      <Divider />

      <H2>참고 자료</H2>

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
