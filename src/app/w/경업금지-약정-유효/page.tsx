"use client";
/*
Q1. 퇴사하면서 회사가 경업금지 서약서를 요구하는데, 서명해도 되는지·효력이 있는지 궁금한 상황이에요.
Q2. 경업금지 약정의 유효 조건을 파악하고, 대가 없는 약정은 거부하거나 무효 확인 청구를 할 수 있어야 해요.
Q3. 유효 조건 4가지(정당한 이익, 합리적 제한, 충분한 대가, 근로자 지위), 대가 기준(퇴직금 30~50%), 무효 판례, 위반 시 대응법.
Q4. GreenBox(유효 조건 요약) + BorderBox(대가 기준) + Checklist(무효 판단 신호) + Steps(대응 절차) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const DEFENSE_STEPS = [
  { title: "약정 내용 분석", desc: "제한 기간·지역·직종·대가 지급 여부를 확인해요. 4가지 유효 조건에 하나라도 안 맞으면 무효 가능성이 높죠." },
  { title: "증빙자료 확보", desc: "근로계약서, 경업금지 서약서 사본, 퇴직 시 대가 지급 내역을 모아두세요." },
  { title: "무효 항변 준비", desc: "대가 미지급이면 '대가 없는 약정은 무효'라고 주장할 수 있어요. 기간 3년 이상이면 '과도한 제한'으로 다툴 수 있죠." },
  { title: "법률구조공단 상담", desc: "월 소득 400만원 이하면 대한법률구조공단(klac.or.kr)에서 무료 변호사 지원을 받을 수 있어요." },
];

const INVALID_SIGNALS = [
  "대가(별도 보상금)를 한 푼도 안 받았어요",
  "제한 기간이 3년 이상이에요",
  "대한민국 전역에서 동종 업계 취업 금지로 돼 있어요",
  "일반 사무직·생산직인데 경업금지 약정을 요구받았어요",
  "재직 중 급여나 퇴직금이 대가라고 회사가 주장해요",
];

const FAQS = [
  { q: "경업금지 약정 서명을 거부하면 해고당하나요?", a: "입사 시 거부한다고 해고할 수 없어요. 퇴직 시에도 대가 없이 서명을 강요하는 건 부당하죠. 서명 강요 자체가 문제될 수 있어요." },
  { q: "대가는 최소 얼마를 받아야 유효한가요?", a: "판례를 종합하면 퇴직금의 30~50% 또는 월급 12~24개월치 수준이에요. 퇴직금의 10% 이하는 명목상 대가라서 무효 판결이 많아요." },
  { q: "이미 서명했는데 무효로 만들 수 있나요?", a: "법원에 무효확인 청구를 할 수 있어요. 대가 미지급, 과도한 제한 등을 입증하면 무효 판결이 나올 수 있죠." },
  { q: "경업금지 위반으로 소송당하면 어떻게 되나요?", a: "약정이 유효한 경우에만 손해배상 책임이 있어요. 무효 약정이면 위반해도 법적 책임이 없죠. 회사가 실제 손해를 입증해야 하고, 못 하면 패소해요." },
  { q: "IT 업계에서 2년 경업금지는 유효한가요?", a: "기술 변화가 빠른 업종이라 2년도 과도하다고 볼 수 있어요. 법원은 업종 특성을 고려해서 판단하는데, IT는 1년도 긴 편이에요." },
  { q: "경업금지 약정이 있으면 프리랜서 활동도 못 하나요?", a: "약정의 제한 범위에 따라 달라요. '동일 제품을 다루는 경쟁사 취업 금지'라면 다른 분야 프리랜서는 제한 대상이 아니에요." },
];

const REFERENCES = [
  { category: "법령·판례", items: [
    { label: "부정경쟁방지 및 영업비밀보호에 관한 법률", url: "https://www.law.go.kr/법령/부정경쟁방지및영업비밀보호에관한법률" },
    { label: "대법원 판례 검색", url: "https://glaw.scourt.go.kr" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용노동부 노동 민원", url: "https://minwon.moel.go.kr" },
    { label: "대한법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동법 · 경업금지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경업금지 약정, 대가 없으면 무효?<br />
        유효 조건과 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사하면서 회사가 &ldquo;경쟁사 가면 손배 청구한다&rdquo;며 서약서를 내밀었죠.
      </p>
      <p style={body}>
        대가 없이 서명하면 안 돼요.
        대법원 판례를 보면 대가 없는 경업금지 약정은 무효 가능성이 높아요.
        <a href="https://www.law.go.kr/법령/부정경쟁방지및영업비밀보호에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>부정경쟁방지법</a>에서
        보호하는 영업비밀이 있어야 하고, 기간·지역·대가까지 합리적이어야 유효하죠.
        법원이 인정하는 유효 조건 4가지와, 무효 판례 기준을 정리했어요.
      </p>

      <Divider />

      {/* 섹션 1: 유효 조건 4가지 */}
      <H2>법원이 인정하는 유효 조건은 뭔가요?</H2>
      <p style={body}>
        법원은 4가지를 종합적으로 판단해요. 하나라도 충족하지 못하면 무효 판결 가능성이 높아지죠.
      </p>

      <GreenBox title="유효 조건 4가지">
        1. 회사에 보호할 정당한 이익 (영업비밀, 핵심 고객 정보 등)<br />
        2. 시간·지역·직종 제한이 합리적 (6개월~2년, 영업 구역 한정)<br />
        3. 근로자에게 충분한 대가 지급 (퇴직금의 30~50% 수준)<br />
        4. 근로자의 지위를 고려 (임원급 vs 일반 직원)
      </GreenBox>
      <p style={body}>
        일반 사무직이나 생산직에게 경업금지를 요구하는 건 4번 조건에서 걸려요.
        회사 기밀에 접근할 수 없는 직급이니까요.
      </p>

      <Divider />

      {/* 섹션 2: 대가 기준 */}
      <H2>대가는 얼마를 받아야 유효한가요?</H2>
      <p style={body}>
        법원이 명확한 금액을 제시하진 않았지만, 하급심 판례를 종합하면 기준이 보여요.
      </p>

      <BorderBox>
        <p style={{ ...body, marginBottom: 6 }}><strong>퇴직금 기준</strong> — 퇴직금의 30~50% 수준이 적정해요. 10% 이하는 명목상 대가로 보고 무효 판결이 나왔죠.</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>월급 기준</strong> — 월급의 12~24개월치. 6개월 제한이면 12개월치, 2년 제한이면 24개월치가 합리적이에요.</p>
        <p style={body}><strong>재직 중 급여는 대가 아님</strong> — 회사가 &ldquo;월급이 대가&rdquo;라고 주장해도 법원은 인정 안 해요. 경업금지 제한에 대한 별도 보상이어야 해요.</p>
      </BorderBox>

      <Divider />

      {/* 섹션 3: 무효 신호 */}
      <H2>내 약정이 무효인지 어떻게 판단하나요?</H2>
      <p style={body}>
        아래 항목 중 하나라도 해당되면 무효 가능성이 높아요.
      </p>
      <SectionBadge>무효 판단 신호</SectionBadge>
      <Checklist items={INVALID_SIGNALS} />
      <p style={body}>
        이미 서명했더라도 법원에 무효확인 청구를 할 수 있어요.
        부당해고 구제신청처럼
        근로자 권리를 부당하게 제한하는 약정은 법으로 보호받지 못하죠.
      </p>

      <Divider />

      {/* 섹션 4: 대응 절차 */}
      <H2>회사가 손배 청구하면 어떻게 대응하나요?</H2>
      <p style={body}>
        약정이 무효라면 경쟁사에 취업해도 법적 책임이 없어요.
        회사가 소송을 걸어도 아래 순서로 대응하면 돼요.
      </p>
      <Steps steps={DEFENSE_STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 판례와 법령을 바탕으로 작성됐어요. 개별 사건에 따라 판결이 다를 수 있으니, 전문 변호사와 상담하세요." />
    </div>
  );
}
