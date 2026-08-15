"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  Steps, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 직원 100명 넘는 사업장 인사담당자가 장애인 고용부담금 얼마 내야 하는지 궁금한 상황
// Q2: 부담금 계산 공식을 이해하고 직접 금액을 산출한 뒤 기한 내 신고·납부
// Q3: 의무고용률(민간 3.1%), 부담기초액, 중증장애인 더블카운트, 신고기한(1월 31일), 고용수준별 차등
// Q4: Calculator(부담금 계산) + GreenBox(핵심 공식) + Steps(신고 절차) + FAQ

const CALC_SLIDERS = [
  { id: "workers", label: "상시근로자 수", min: 100, max: 1000, step: 10, defaultValue: 200, format: (v: number) => `${v}명` },
  { id: "disabled", label: "현재 고용 장애인 수", min: 0, max: 50, step: 1, defaultValue: 3, format: (v: number) => `${v}명` },
  { id: "severe", label: "이 중 중증장애인 수", min: 0, max: 20, step: 1, defaultValue: 0, format: (v: number) => `${v}명` },
];

const CALC_RESULTS = [
  {
    label: "의무고용인원",
    getValue: (v: Record<string, number>) => Math.floor(v.workers * 0.031),
    format: (v: number) => `${v}명`,
  },
  {
    label: "실제 인정 인원 (중증 2배)",
    getValue: (v: Record<string, number>) => (v.disabled - v.severe) + v.severe * 2,
    format: (v: number) => `${v}명`,
  },
  {
    label: "월 미달 인원",
    getValue: (v: Record<string, number>) => {
      const required = Math.floor(v.workers * 0.031);
      const actual = (v.disabled - v.severe) + v.severe * 2;
      return Math.max(0, required - actual);
    },
    format: (v: number) => `${v}명`,
  },
  {
    label: "연간 부담금 (예상)",
    getValue: (v: Record<string, number>) => {
      const required = Math.floor(v.workers * 0.031);
      const actual = (v.disabled - v.severe) + v.severe * 2;
      const shortage = Math.max(0, required - actual);
      return shortage * 1281620 * 12;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const STEPS_DATA = [
  { title: "의무고용인원 산정", desc: "상시근로자 수 x 의무고용률(민간 3.1%)을 계산해서 소수점 이하를 버려요." },
  { title: "실제 고용인원 산정", desc: "고용 장애인 수를 합산하세요. 중증장애인은 1명당 2명으로 인정돼요." },
  { title: "미달 인원 x 부담기초액", desc: "월별 미달 인원에 부담기초액(2025년 기준 128만 1,620원)을 곱해요." },
  { title: "12개월분 합산", desc: "월별 부담금을 1월~12월까지 모두 더해서 연간 부담금을 산출하세요." },
  { title: "전자신고시스템에서 신고", desc: "한국장애인고용공단 전자신고시스템(esingo.or.kr)에서 매년 1월 31일까지 신고·납부해요." },
];

const FAQS = [
  { q: "100명 미만 사업장도 부담금을 내야 하나요?", a: "아니에요. 상시근로자 50명 이상이면 장애인 고용 의무는 있지만, 부담금 납부는 100명 이상 사업장부터 해당돼요." },
  { q: "중증장애인 더블카운트가 뭔가요?", a: "중증장애인 1명을 고용하면 의무고용인원 2명을 채운 것으로 인정받아요. 예를 들어 의무인원이 6명인데 중증장애인 3명만 고용해도 6명을 충족하는 거죠." },
  { q: "부담기초액은 매년 바뀌나요?", a: "네, 고용노동부장관이 매년 고시해요. 장애인 고용에 필요한 시설·장비 비용 등을 고려해서 금액이 정해지죠. 한국장애인고용공단 홈페이지에서 최신 금액을 확인하세요." },
  { q: "부담금을 늦게 내면 어떻게 되나요?", a: "납부 기한(1월 31일)을 넘기면 가산금이 붙어요. 연도 중에 사업을 종료한 경우에는 종료일부터 60일 이내에 신고·납부해야 하고요." },
  { q: "공공기관 의무고용률은 얼마인가요?", a: "공공기관은 민간(3.1%)보다 높은 3.8%가 적용돼요. 국가기관, 지자체, 공기업 모두 포함되죠." },
  { q: "부담금을 낸 금액은 세금에서 빼줘 주나요?", a: "장애인 고용부담금은 법인세나 소득세 신고 시 손금(필요경비)으로 처리할 수 있어요. 세무 담당자에게 확인해보세요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "장애인고용촉진 및 직업재활법", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "한국장애인고용공단: 부담금 신고납부 안내", url: "https://www.kead.or.kr/pymntinchr/cntntsPage.do?menuId=MENU0668" },
      { label: "한국장애인고용공단: 부담금 산정방법", url: "https://www.kead.or.kr/howclclt/cntntsPage.do?menuId=MENU0674" },
      { label: "전자신고시스템", url: "https://www.esingo.or.kr" },
      { label: "찾기쉬운 생활법령정보: 장애인 고용의무", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1005&ccfNo=3&cciNo=1&cnpClsNo=2" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 장애인 고용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 고용부담금, 우리 회사는 얼마 내야 할까?<br />
        의무고용률과 계산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 100명이 넘는데 장애인 근로자 수가 부족하다면 부담금을 내야 해요.
        <a href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인고용촉진 및 직업재활법</a>에 따라
        의무고용인원에서 실제 고용 장애인 수를 뺀 <strong>미달 인원 x 부담기초액</strong>을 12개월분 합산해서 납부하는 구조예요.
        아래 계산기로 우리 회사 부담금을 바로 확인해보세요.
      </p>

      <Divider />

      <H2>부담금이 얼마인지 계산해볼까요?</H2>
      <p style={body}>
        계산 공식은 간단해요. <strong>월별 미달 인원 x 부담기초액</strong>을 12개월 합산하면 연간 부담금이 나오죠.
        2025년 기준 부담기초액은 <strong>128만 1,620원</strong>이에요. 고용노동부장관이 매년 고시하는 금액이라 해마다 조금씩 달라져요.
      </p>
      <p style={body}>
        중증장애인을 고용하면 1명당 2명으로 인정받아서 미달 인원이 줄어들어요.
        예를 들어 의무인원 6명인데 중증장애인 2명 + 경증 1명 = 인정 인원 5명이라 미달은 1명이 되는 거죠.
      </p>

      <SectionBadge>우리 회사 부담금 계산기</SectionBadge>
      <Calculator
        title="장애인 고용부담금 예상 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2025년 부담기초액 128만 1,620원 기준. 고용수준별 차등 적용은 반영하지 않은 기본 계산이에요."
      />

      <Divider />

      <H2>의무고용률과 기준 인원은 어떻게 되나요?</H2>
      <p style={body}>
        2026년 기준 <strong>민간 사업장 의무고용률은 3.1%</strong>, 공공기관은 3.8%예요.
        상시근로자 수에 의무고용률을 곱한 뒤 소수점 이하를 버리면 의무고용인원이 나오죠.
        예를 들어 200명 x 3.1% = 6.2명, 소수점 버리면 6명이에요.
      </p>

      <GreenBox title="사업장 규모별 정리">
        50~99명: 장애인 고용 의무 있음, 부담금 납부 의무 <strong>없음</strong><br />
        100명 이상: 고용 의무 + 부담금 납부 의무 <strong>있음</strong><br />
        공공기관: 의무고용률 3.8%, 부담금 납부 의무 있음
      </GreenBox>

      <Divider />

      <H2>신고는 언제, 어디서 하나요?</H2>
      <p style={body}>
        전년도 1월~12월 고용 실적을 다음 해 <strong>1월 31일</strong>까지 신고하고 납부하면 돼요.
        예를 들어 2025년 실적은 2026년 1월 31일이 마감이에요.
        <a href="https://www.esingo.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>전자신고시스템(esingo.or.kr)</a>에서 온라인으로 신고하거나,
        사업체 본점 관할 <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a> 지역본부에 직접 제출할 수 있어요.
      </p>

      <SectionBadge>계산·신고 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <BorderBox>
        연도 중 사업 종료 시: 종료일부터 <strong>60일 이내</strong> 신고·납부<br />
        가산금 주의: 기한 초과 시 가산금 부과<br />
        문의: 한국장애인고용공단 <strong>1588-1519</strong>
      </BorderBox>

      <Divider />

      <H2>부담금을 줄이려면 어떻게 해야 하나요?</H2>
      <p style={body}>
        가장 직접적인 방법은 장애인 고용을 늘리는 거예요. 특히 <strong>중증장애인</strong>을 고용하면 더블카운트가 적용돼서 효과가 2배죠.
        장애인 1명을 추가 고용하면 매월 부담기초액(128만 원)을 절감하는 셈이니까, 연간으로 보면 1,500만 원 이상 절약할 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.kead.or.kr/edsysdesc/cntntsPage.do?menuId=MENU0684" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인고용장려금</a>도 활용하세요.
        의무고용률을 초과해서 장애인을 고용하면 사업주에게 월 30만~60만 원의 장려금이 지급돼요.
        부담금은 줄고 장려금은 받는 이중 효과가 생기는 거죠.
      </p>

      <GreenBox title="부담금 vs 장려금">
        부담금: 미달 인원 x 128만 원/월 → <strong>내야 하는 돈</strong><br />
        장려금: 초과 고용 장애인 x 30~60만 원/월 → <strong>받는 돈</strong>
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 장애인고용촉진 및 직업재활법과 한국장애인고용공단 공식 안내를 바탕으로 작성했어요. 부담기초액은 매년 변동되니 최신 고시를 확인하세요." />
    </div>
  );
}
