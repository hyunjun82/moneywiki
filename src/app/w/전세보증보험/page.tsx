"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 전세 계약을 앞두고 보증보험을 들어야 하는지, 어떻게 드는지 모르는 상황
// Q2: 가입 가능 여부를 먼저 확인하고, HUG/SGI 중 선택해서 가입
// Q3: HUG 가입조건(시세 126% 이내), 보증료율(0.115~0.154%), 한도(수도권 7억), 가입 절차, 거절 시 대처
// Q4: Calculator(보증료 계산) + Steps(가입 절차) + Checklist(체크리스트) + FAQ

const CALC_SLIDERS = [
  { id: "deposit", label: "전세 보증금", min: 5000, max: 70000, step: 1000, defaultValue: 30000, format: (v: number) => `${(v / 10000).toFixed(1)}억원` },
  { id: "years", label: "계약 기간", min: 1, max: 3, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "우대 보증료 (청년·신혼)",
    getValue: (v: Record<string, number>) => Math.round(v.deposit * 10000 * 0.00115 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "일반 보증료",
    getValue: (v: Record<string, number>) => Math.round(v.deposit * 10000 * 0.00128 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "할증 보증료",
    getValue: (v: Record<string, number>) => Math.round(v.deposit * 10000 * 0.00154 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const STEPS_DATA = [
  { title: "가입 가능 여부 조회", desc: "HUG 홈페이지(khug.or.kr)에서 해당 주소의 가입 가능 여부를 미리 확인하세요.", tip: "계약 전에 조회하는 게 가장 안전해요. 가입 안 되는 집은 위험 신호예요" },
  { title: "전입신고 + 확정일자", desc: "입주 후 전입신고와 확정일자를 받으세요. 대항력 취득이 가입 조건이에요." },
  { title: "서류 준비", desc: "임대차계약서, 등기부등본, 주민등록등본, 신분증, 확정일자 증명을 준비하세요." },
  { title: "온라인 또는 방문 신청", desc: "HUG 홈페이지, 은행 앱, 또는 HUG 지사에서 신청할 수 있어요." },
  { title: "심사 후 보증서 발급", desc: "접수 후 1~2주 내에 심사가 완료되고 보증서가 발급돼요. 보증서는 원본 보관하세요." },
];

const CHECKLIST_ITEMS = [
  "전입신고 완료",
  "확정일자 완료",
  "등기부등본에서 근저당, 가압류 확인",
  "보증금이 시세의 90% 이하인지 확인 (HUG 기준)",
  "HUG 가입 가능 여부 온라인 조회 완료",
  "전세보증보험 가입 신청 완료",
  "보증서 원본 수령 및 보관",
];

const FAQS = [
  { q: "전세보증보험이 꼭 필요한가요?", a: "의무는 아니지만 강력히 권장해요. 집주인이 보증금을 못 돌려주면 보증기관이 대신 지급해주니까요. 2년에 70~90만 원으로 수억 원을 지킬 수 있는 보험이에요." },
  { q: "HUG에서 거절되면 어떻게 하나요?", a: "SGI서울보증(sgic.co.kr)에 신청해보세요. HUG보다 심사가 완화돼 있어요. SGI도 거절하면 그 집은 위험하다는 신호이니 계약을 재검토하세요." },
  { q: "전세대출 받으면 자동으로 가입되나요?", a: "아니에요. 전세대출 보증과 전세보증보험은 완전히 별개예요. 전세대출 보증은 은행을 보호하는 거고, 전세보증보험은 나를 보호하는 거예요. 둘 다 따로 가입해야 하죠." },
  { q: "보증금이 시세 90%를 넘으면 가입이 안 되나요?", a: "HUG 기준으로 가입이 거절돼요. 보증금이 시세 대비 너무 높다는 건 깡통전세 위험이 있다는 뜻이에요. 보증금을 낮추거나 다른 집을 알아보세요." },
  { q: "보증서를 잃어버리면 어떻게 되나요?", a: "보증기관에 재발급을 신청할 수 있어요. 하지만 청구 시 원본이 필요한 경우가 있으니 잘 보관하세요." },
  { q: "중도해지하면 보증보험은 어떻게 되나요?", a: "보증기관에 연락해서 해지 절차를 밟으면 돼요. 남은 기간의 보험료를 돌려받을 수 있어요." },
  { q: "빌라나 다세대도 가입할 수 있나요?", a: "조건만 맞으면 가능해요. 다만 빌라는 시세 파악이 어려워서 거절률이 높은 편이에요. 그만큼 더 주의해서 확인해야 하죠." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "주택도시보증공사(HUG): 전세보증금반환보증", url: "https://www.khug.or.kr" },
      { label: "SGI서울보증: 전세금보장신용보험", url: "https://www.sgic.co.kr" },
      { label: "한국주택금융공사(HF): 전세자금보증", url: "https://www.hf.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 보증보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세보증보험, 꼭 가입해야 할까?<br />
        가입 조건과 보증료 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집주인이 보증금을 못 돌려주면 어떻게 되나요? <strong>전세보증보험</strong>에 가입해두면 보증기관이 대신 지급해줘요.
        <a href="https://www.khug.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>HUG(주택도시보증공사)</a> 기준
        보증료는 연 0.115~0.154%로, 보증금 3억에 2년이면 약 <strong>77만 원</strong>이에요.
        2년에 77만 원으로 수억 원을 지킬 수 있는 보험이죠.
      </p>

      <Divider />

      <H2>보증료가 얼마나 드나요?</H2>
      <p style={body}>
        HUG 기준으로 보증료율은 <strong>연 0.115~0.154%</strong>예요.
        청년이나 신혼부부는 우대 요율(0.115%)을 적용받을 수 있죠.
        보증금이 클수록 금액이 올라가지만, 월로 나누면 3~5만 원 수준이라 부담이 크지 않아요.
      </p>

      <SectionBadge>보증료 계산기</SectionBadge>
      <Calculator
        title="전세보증보험 보증료 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ HUG 2026년 기준 보증료율 적용. 실제 보증료는 주택 유형과 부채비율에 따라 달라질 수 있어요."
      />

      <Divider />

      <H2>가입 조건이 어떻게 되나요?</H2>
      <p style={body}>
        HUG 기준으로 가장 중요한 조건은 <strong>보증금이 시세의 90% 이하</strong>여야 한다는 거예요.
        근저당 + 선순위 보증금 + 내 보증금을 합친 금액이 시세의 90%를 넘으면 가입이 거절돼요.
        전입신고와 확정일자도 완료해야 하고요.
      </p>
      <p style={body}>
        보증 한도는 <strong>수도권 7억 원, 지방 5억 원</strong>이에요.
        SGI(서울보증)는 5억 원 한도이지만 심사가 HUG보다 완화돼 있어서, HUG에서 거절되면 SGI로 시도해볼 수 있죠.
      </p>

      <GreenBox title="HUG 가입 핵심 조건">
        보증금 ≤ 시세 90% (근저당 + 선순위 합산)<br />
        전입신고 + 확정일자 완료<br />
        보증 한도: 수도권 7억 / 지방 5억<br />
        계약기간 절반 지나기 전 가입 권장
      </GreenBox>

      <Divider />

      <H2>어떻게 가입하나요?</H2>
      <p style={body}>
        <strong>계약 전에</strong> 가입 가능 여부부터 확인하는 게 가장 중요해요.
        가입이 안 되는 집이라면 계약 자체를 재검토해야 하니까요.
        HUG 홈페이지에서 온라인으로 조회하거나, 전세대출을 받는 은행에서 함께 가입할 수 있어요.
      </p>

      <SectionBadge>가입 절차 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>가입이 거절되면 어떻게 해야 하나요?</H2>
      <p style={body}>
        거절은 위험 신호예요. 보증금이 시세 대비 너무 높거나, 근저당·가압류가 많거나, 위반건축물이면 거절돼요.
        이런 집은 전세사기 위험이 높다는 뜻이에요.
      </p>
      <p style={body}>
        HUG에서 거절되면 <a href="https://www.sgic.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>SGI서울보증</a>에 시도해보세요.
        SGI도 거절한다면 그 집은 정말 위험한 거예요. 보증금을 낮추거나 다른 집을 찾는 게 맞아요.
        계약금을 이미 넣었더라도 나머지 보증금을 넣기 전에 반드시 확인하세요.
      </p>

      <BorderBox>
        연락처<br />
        HUG: <strong>1566-9009</strong> / <a href="https://www.khug.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>khug.or.kr</a><br />
        SGI: <strong>1670-7000</strong> / <a href="https://www.sgic.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>sgic.co.kr</a><br />
        HF: <strong>1688-8114</strong> / <a href="https://www.hf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>hf.go.kr</a>
      </BorderBox>

      <Divider />

      <H2>가입 전 체크리스트</H2>
      <p style={body}>
        전세 계약을 앞두고 있다면 아래 항목을 하나씩 확인하세요.
        전입신고와 확정일자는 입주 당일에 바로 해야 대항력을 빨리 확보할 수 있어요.
        등기부등본은 계약 당일과 잔금일, 두 번 확인하는 게 안전하죠.
      </p>

      <SectionBadge>7가지 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 HUG·SGI 공식 안내를 바탕으로 작성했어요. 보증료율과 가입 조건은 변동될 수 있으니 가입 전에 해당 기관에서 최신 기준을 확인하세요." />
    </div>
  );
}
