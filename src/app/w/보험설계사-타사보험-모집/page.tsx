"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

// Q1: 보험설계사인데 타사 보험 상품도 판매할 수 있는지 알고 싶은 상황
// Q2: 원칙(소속사 외 모집 금지)과 예외(GA 소속, 교차모집)를 파악
// Q3: 보험업법 제84조, GA(법인보험대리점), 교차모집 제도, 겸업 조건
// Q4: GreenBox(결론) + BorderBox(비교) + Checklist + FAQ

const CHECKLIST = [
  "원칙: 소속 보험회사 상품만 모집 가능 (보험업법 제84조)",
  "예외 1: GA(법인보험대리점) 소속이면 다수 보험사 상품 판매 가능",
  "예외 2: 교차모집 — 생보 설계사가 손보 1개사 상품 판매 가능 (역도 동일)",
  "교차모집 시 별도 등록 필요 (금융감독원 모집인 등록)",
  "무등록 모집은 보험업법 위반 — 형사처벌 대상",
  "설계사 본인 명의 외 타인 명의 모집도 불법",
];

const FAQS = [
  { q: "S생명 설계사가 H손해보험 상품도 팔 수 있나요?", a: "원칙적으로 안 돼요. 다만 교차모집 등록을 하면 손보 1개사 상품을 판매할 수 있어요. 금융감독원에 등록해야 해요." },
  { q: "GA 소속이면 여러 회사 상품을 팔 수 있나요?", a: "네, GA(법인보험대리점)는 여러 보험회사와 계약을 맺고 다양한 상품을 판매할 수 있어요. GA 소속 설계사는 해당 GA가 계약한 모든 보험사 상품을 취급해요." },
  { q: "교차모집이 뭔가요?", a: "생명보험 설계사가 손해보험 1개사 상품을 추가로 판매하거나, 손해보험 설계사가 생명보험 1개사 상품을 추가로 판매하는 제도예요. 별도 등록이 필요해요." },
  { q: "무등록으로 타사 보험 모집하면 어떻게 되나요?", a: "보험업법 위반으로 형사처벌 대상이에요. 모집인 등록을 하지 않고 보험 모집을 하면 3년 이하 징역 또는 3천만원 이하 벌금이에요." },
  { q: "보험대리점과 보험중개사는 뭐가 다른가요?", a: "대리점은 보험회사를 대리해서 모집하고, 중개사는 독립적으로 고객을 위해 보험을 중개해요. 중개사는 여러 보험사 상품을 비교·추천할 수 있어요." },
];

const REFERENCES = [{ category: "법령", items: [{ label: "보험업법 제84조: 모집 제한", url: "https://www.law.go.kr/법령/보험업법" }, { label: "금융감독원: 보험모집인 등록", url: "https://www.fss.or.kr" }] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 설계사</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>보험설계사가 타사 보험을 팔 수 있나?<br />교차모집과 GA 소속 차이</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>S생명 설계사인데 H손해보험 상품도 팔고 싶죠. 원칙적으로 소속 보험회사 상품만 모집할 수 있어요. <a href="https://www.law.go.kr/법령/보험업법" style={{ color: "#1D9E75", textDecoration: "underline" }}>보험업법 제84조</a>에서 이렇게 정하고 있어요. 다만 GA(법인보험대리점) 소속이거나 교차모집 등록을 하면 예외가 있어요.</p>
      <Divider />
      <H2>원칙: 소속사 상품만 판매 가능</H2>
      <p style={body}>보험업법 제84조에 따르면 보험설계사는 소속 보험회사의 상품만 모집할 수 있어요. 생명보험 설계사는 소속 생명보험사 상품만, 손해보험 설계사는 소속 손해보험사 상품만 판매하는 게 원칙이에요.</p>
      <p style={body}>무등록으로 타사 보험을 모집하면 보험업법 위반이에요. 3년 이하 징역 또는 3천만원 이하 벌금에 해당하는 중대한 위법행위예요.</p>
      <GreenBox title="핵심 원칙">소속 보험회사 상품만 모집 가능 (보험업법 제84조)<br />무등록 타사 모집 = 형사처벌 대상</GreenBox>
      <Divider />
      <H2>예외: GA 소속이면 다수 보험사 취급 가능</H2>
      <p style={body}>GA(법인보험대리점)는 여러 보험회사와 위탁계약을 맺은 대리점이에요. GA 소속 설계사는 해당 GA가 계약한 모든 보험회사의 상품을 판매할 수 있어요. 생보·손보를 가리지 않아요.</p>
      <p style={body}>개인 설계사에서 GA 소속으로 전환하면 판매 가능한 상품 범위가 크게 넓어지죠. 다만 수수료 체계가 달라질 수 있어서 소속 변경 전에 꼼꼼히 비교해야 해요.</p>
      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>전속 설계사</p>
        <p style={{ ...body, marginBottom: 4 }}>소속 보험회사 1곳 상품만 판매</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>GA 소속 설계사</p>
        <p style={{ ...body, marginBottom: 4 }}>GA가 계약한 여러 보험사 상품 판매 가능</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>교차모집 등록 설계사</p>
        <p style={{ ...body, marginBottom: 0 }}>타 업종(생보↔손보) 1개사 상품 추가 판매 가능</p>
      </BorderBox>
      <Divider />
      <H2>교차모집은 어떻게 하나요?</H2>
      <p style={body}>생보 설계사가 손보 1개사, 손보 설계사가 생보 1개사 상품을 추가로 판매할 수 있는 제도예요. 금융감독원에 별도 등록을 해야 하고, 해당 보험사와 위탁계약도 필요해요.</p>
      <p style={body}>교차모집은 1개사로 제한돼요. 여러 손보사 상품을 팔고 싶다면 GA 소속이 더 유리해요.</p>
      <GreenBox title="교차모집 조건">생보 설계사 → 손보 1개사 추가 가능 (역도 동일)<br />금융감독원 등록 + 해당 보험사 위탁계약 필요</GreenBox>
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>보험설계사 타사 보험 모집 관련 핵심이에요.</p>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>타사 보험 모집 관련 질문이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 보험업법을 바탕으로 작성됐어요. 세부 규정은 금융감독원(1332)에서 확인하세요." />
    </div>
  );
}
