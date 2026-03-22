"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 벤처기업에서 스톡옵션 받았는데 세금이 얼마나 나오는지 궁금한 직장인
// Q2: 비과세 한도(5천만원)와 조건(2년 재직)을 파악하고, 행사 시점 결정
// Q3: 벤처 5천만원/일반 2천만원 비과세, 2년 재직 요건, 행사이익 계산, 인증 만료 시 한도 변경
// Q4: GreenBox(비과세 요약) + BorderBox(과세 구조) + Checklist + FAQ

const CHECKLIST = [
  "벤처기업 비과세 한도: 연 5,000만원 (일반기업 2,000만원)",
  "조건: 벤처인증 기업 + 부여일부터 2년 이상 재직",
  "행사 기한: 부여일부터 10년 이내",
  "행사이익 = 시가 - 행사가격 (주당 차익 x 주식 수)",
  "한도 초과분은 근로소득으로 합산 과세",
  "벤처 인증 만료 시 일반기업 한도(2천만원) 적용",
  "퇴직 후 행사해도 재직기간 충족했으면 비과세 가능",
];

const FAQS = [
  { q: "행사이익이 정확히 뭔가요?", a: "스톡옵션 행사가격과 시가의 차이예요. 행사가격 1만원, 시가 5만원이면 주당 행사이익이 4만원이에요. 1,000주 행사하면 총 4,000만원이에요." },
  { q: "일반 기업도 비과세가 있나요?", a: "네, 연 2,000만원까지 비과세예요. 벤처기업은 5,000만원이라 2.5배 높아요." },
  { q: "2년 안 채우고 행사하면 어떻게 되나요?", a: "비과세 혜택 없이 행사이익 전액이 근로소득으로 과세돼요. 2년은 꼭 채우는 게 유리해요." },
  { q: "벤처 인증이 만료되면요?", a: "일반기업 한도(연 2,000만원)가 적용돼요. 인증 유효기간을 미리 확인하고 행사 시기를 조절하는 게 좋아요." },
  { q: "퇴직하고 나서 행사해도 비과세 되나요?", a: "부여일부터 2년 이상 재직한 기록이 있으면 퇴직 후 행사해도 비과세 적용돼요. 단, 10년 이내에 행사해야 해요." },
  { q: "별도 신청이 필요한가요?", a: "아니에요. 행사할 때 회사에서 비과세 적용 여부를 확인하고 원천징수 처리해요. 별도로 국세청에 신고할 필요는 없어요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "조세특례제한법 제16조의2: 벤처기업 스톡옵션 비과세", url: "https://www.law.go.kr/법령/조세특례제한법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 스톡옵션 과세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 스톡옵션 · 벤처기업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        벤처기업 스톡옵션, 세금이 얼마나 나오나?<br />
        비과세 한도와 행사 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        벤처기업에서 스톡옵션 받았는데 행사하면 세금이 얼마나 나오는지 걱정되죠.
        벤처기업이면 행사이익 연 5,000만원까지 비과세예요. 일반 기업(2,000만원)보다 2.5배 높아요.
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제16조의2</a>에서 이 혜택을 규정하고 있어요.
      </p>

      <Divider />

      <H2>비과세 조건은 뭔가요?</H2>
      <p style={body}>
        세 가지 조건을 모두 충족해야 비과세가 적용돼요.
        벤처기업 인증을 받은 회사여야 하고, 스톡옵션 부여일부터 2년 이상 재직해야 해요.
        행사 시점은 부여일부터 10년 이내여야 하고요.
      </p>

      <GreenBox title="비과세 요건 정리">
        벤처기업 인증 기업일 것<br />
        부여일부터 2년 이상 재직<br />
        부여일부터 10년 이내 행사<br />
        비과세 한도: 연 5,000만원 (일반기업 2,000만원)
      </GreenBox>

      <Divider />

      <H2>행사이익은 어떻게 계산하나요?</H2>
      <p style={body}>
        행사이익은 시가와 행사가격의 차이예요.
        행사가격이 1만원이고 행사 시점 시가가 5만원이면, 주당 행사이익이 4만원이에요.
        1,000주를 행사하면 행사이익이 4,000만원이에요.
        5,000만원 한도 내니까 전액 비과세예요.
      </p>
      <p style={body}>
        행사이익이 5,000만원을 넘으면 초과분은 <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a> 때 근로소득에 합산돼요.
        예를 들어 행사이익이 8,000만원이면, 5,000만원은 비과세고 나머지 3,000만원이 과세 대상이에요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>과세 구조 예시</p>
        <p style={{ ...body, marginBottom: 4 }}>행사이익 3,000만원 → 전액 비과세</p>
        <p style={{ ...body, marginBottom: 4 }}>행사이익 5,000만원 → 전액 비과세</p>
        <p style={{ ...body, marginBottom: 4 }}>행사이익 8,000만원 → 5,000만원 비과세 + 3,000만원 과세</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>일반기업과 비교</p>
        <p style={{ ...body, marginBottom: 0 }}>벤처기업: 연 5,000만원 | 일반기업: 연 2,000만원</p>
      </BorderBox>

      <Divider />

      <H2>주의해야 할 점은?</H2>
      <p style={body}>
        행사 시점이 핵심이에요. 2년 재직 전에 행사하면 비과세가 전혀 적용 안 돼요.
        전액 근로소득으로 과세되니까 2년은 반드시 채우세요.
      </p>
      <p style={body}>
        벤처기업 인증이 만료되면 일반기업 한도(2,000만원)로 내려가요.
        인증 유효기간을 확인하고 행사 시기를 조절하는 게 유리해요.
        퇴직 후 행사해도 재직기간을 충족했으면 비과세 적용돼요.
      </p>

      <GreenBox title="행사 타이밍 체크">
        2년 미만 재직 후 행사 → 비과세 없음 (전액 과세)<br />
        벤처 인증 만료 후 행사 → 일반기업 한도(2천만원) 적용<br />
        퇴직 후 행사 → 재직기간 충족했으면 비과세 OK
      </GreenBox>

      <Divider />

      <H2>핵심 체크리스트</H2>
      <p style={body}>
        벤처기업 스톡옵션 세금 관련 핵심을 정리했어요.
      </p>

      <SectionBadge>체크 항목</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        벤처기업 스톡옵션 세금 관련 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세법 개정이 있을 수 있으니 국세청(126) 또는 홈택스에서 최신 기준을 확인하세요." />
    </div>
  );
}
