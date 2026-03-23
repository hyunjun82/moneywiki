"use client";

// Q1. 무보험 차량에 사고를 당했는데 가해자에게 보상을 못 받을까 걱정하는 상황
// Q2. 자동차손해배상 보장사업이나 무보험차상해 특약으로 보상을 청구한다
// Q3. 보상 경로 2가지(보장사업/특약), 보상 한도(사망 1.5억, 부상 3천만), 청구 서류, 기한 3년
// Q4. GreenBox(보상 경로) + Steps(청구 절차) + 인라인 테이블(한도) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "사고 즉시 112에 신고하세요",
    desc: "경찰에 신고해서 교통사고 사실확인원을 발급받아야 해요. 이 서류가 없으면 보상 청구가 안 돼요. 가해자가 무보험이라는 사실도 경찰 조사에서 확인돼요.",
  },
  {
    title: "병원에서 치료받으면서 영수증을 전부 챙기세요",
    desc: "진단서, 입원비, 수술비, 약값, 통원 치료비 영수증을 모두 보관해요. 치료가 끝나면 완치 진단서나 후유장해 진단서를 받으세요. 후유증이 남으면 장해 등급에 따라 추가 보상을 받을 수 있어요.",
  },
  {
    title: "보험사에 청구하세요",
    desc: "무보험차상해 특약이 있으면 본인 보험사에 청구해요. 특약이 없으면 아무 보험회사나 자동차손해배상진흥원(tacss.or.kr)에 청구하면 돼요.",
    link: { label: "자동차손해배상진흥원", href: "https://tacss.or.kr" },
  },
  {
    title: "보상금을 지급받으세요",
    desc: "무보험차상해 특약 가입자는 1~2주 이내에 받을 수 있어요. 보장사업으로 청구하면 1~2개월 걸려요. 보상 후 보험사나 정부가 가해자에게 구상권을 행사해요.",
  },
];

const CHECK = [
  "교통사고 사실확인원 (경찰서 발급)",
  "진단서 (병원 발급)",
  "치료비 영수증 전체 (입원, 통원, 약값)",
  "인감증명서",
  "주민등록등본",
  "신분증 사본",
  "블랙박스 영상 (USB 저장)",
  "사고 현장 사진 (차량 파손, 번호판, 전체 현장)",
];

const FAQS = [
  { q: "무보험 사고 보상은 최대 얼마까지 받을 수 있나요?", a: "사망 시 1억 5천만원 한도예요. 실제 손해액이 2천만원 미만이어도 최소 2천만원은 보장돼요. 부상은 최대 3천만원, 후유장애는 최대 1억 5천만원까지 받을 수 있어요." },
  { q: "무보험차상해 특약이 없으면 보상을 못 받나요?", a: "아니에요. 특약이 없어도 자동차손해배상 보장사업으로 보상받을 수 있어요. 다만 특약이 있으면 본인 보험사가 먼저 보상해줘서 1~2주면 받고, 보장사업은 1~2개월 걸려요." },
  { q: "청구 기한이 있나요?", a: "사고 발생일로부터 3년이에요. 3년이 지나면 시효가 끝나서 청구할 수 없어요. 최근 3년 내 자비로 낸 치료비가 있다면 지금이라도 청구 가능해요." },
  { q: "무보험차상해 특약 보험료는 얼마인가요?", a: "월 1,000~3,000원 정도예요. 자동차보험 갱신할 때 특약으로 추가하면 돼요. 비용 대비 보장이 커서 가입해두는 게 안전해요." },
  { q: "가해자가 합의를 요청하면 어떻게 해야 하나요?", a: "합의서 쓰기 전에 반드시 보험사에 상담받으세요. 무보험 가해자는 합의금을 적게 주려고 할 수 있어요. 합의 후에는 추가 보상 청구가 어려우니까 후유증이 있을 것 같으면 완치 후 합의하세요." },
  { q: "2026년부터 달라진 게 있나요?", a: "경상환자(염좌 등)는 향후치료비를 원칙적으로 못 받게 됐어요. 중상환자(상해등급 1~11급)만 향후치료비를 받을 수 있어요. 무보험 사고도 이 기준이 적용돼요." },
];

const REFS = [
  { category: "기관", items: [
    { label: "자동차손해배상진흥원", url: "https://tacss.or.kr" },
    { label: "국토교통부 보장사업 안내", url: "https://www.molit.go.kr/USR/policyData/m_34681/dtl?id=370" },
  ]},
  { category: "법령", items: [
    { label: "자동차손해배상보장법", url: "https://www.law.go.kr/법령/자동차손해배상보장법" },
    { label: "찾기쉬운 생활법령정보 - 무보험차량 보상", url: "https://easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=90&onhunqueSeq=3002" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 교통사고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        무보험 차량에 사고 당했는데 보상받을 수 있나요?<br />
        청구 절차와 보상 한도
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        무보험 차에 사고를 당했는데 가해자한테 보상을 못 받을까 걱정되시죠?
      </p>
      <p style={body}>
        무보험 사고라도 보상받을 수 있어요. 정부가 운영하는 <strong>자동차손해배상 보장사업</strong>으로 보상받거나, 내 보험에 <strong>무보험차상해 특약</strong>이 있으면 더 빠르게 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상보장법</a> 제30조에서 이 제도를 규정하고 있어요.
      </p>

      <Divider />

      <H2>보상받는 방법은 2가지예요</H2>
      <p style={body}>
        무보험차상해 특약 가입 여부에 따라 청구 방법이 달라져요. 어느 쪽이든 보상은 받을 수 있어요.
      </p>

      <GreenBox title="보상 경로 비교">
        {"무보험차상해 특약 있음 → 본인 보험사에 청구 (1~2주 처리)\n무보험차상해 특약 없음 → 보장사업으로 아무 보험사/진흥원 청구 (1~2개월 처리)\n\n※ 특약은 월 1,000~3,000원으로 가입 가능해요"}
      </GreenBox>

      <Divider />

      <H2>보상 한도는 얼마까지인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/자동차손해배상보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>자동차손해배상보장법 시행령</a> 제3조에 보상 한도가 명시돼 있어요.
      </p>

      <SectionBadge>보상 한도 (2026년 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보상 한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["사망", "최대 1억 5천만원", "최소 보장 2천만원"],
              ["부상", "최대 3천만원", "치료비+휴업손해+위자료"],
              ["후유장애", "최대 1억 5천만원", "장해 등급에 따라 산정"],
            ].map(([type, limit, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{limit}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        <strong>보상 항목 4가지</strong>{"\n"}
        {"· 치료비: 진단서, 입원비, 수술비, 약값 전액\n· 휴업손해: 사고로 일 못 한 기간의 수입 손실\n· 위자료: 정신적 고통 보상 (사고 정도에 따라 산정)\n· 장례비: 사망 사고 시 지급"}
      </BorderBox>

      <Divider />

      <H2>청구 절차를 알려드릴게요</H2>
      <p style={body}>
        사고 직후 경찰 신고가 가장 먼저예요. 교통사고 사실확인원이 없으면 보상 청구가 안 되니까요.
      </p>

      <SectionBadge>청구 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>챙겨야 할 서류 목록이에요</H2>
      <p style={body}>
        서류를 한 번에 완비해서 제출하면 처리가 빨라져요. 부족하면 보완 요청 때문에 시간이 더 걸리거든요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECK} />

      <p style={body}>
        청구 기한은 사고 발생일로부터 <strong>3년</strong>이에요. 기한을 놓치면 시효가 끝나요. 최근 3년 내 무보험 사고로 자비 치료한 영수증이 있다면 지금 청구해도 돼요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 자동차손해배상보장법에 따라 작성됐어요. 구체적인 보상 금액은 사고 상황에 따라 달라지니 보험사나 전문가에게 상담받으세요." />
    </div>
  );
}
