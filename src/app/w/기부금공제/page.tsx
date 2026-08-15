"use client";
// Q1. 기부금을 냈는데 연말정산에서 얼마나 돌려받을 수 있는지 궁금한 상황이에요.
// Q2. 기부금 종류별 공제율과 한도를 확인해서 환급 금액을 예측하는 행동.
// Q3. 15%/30%/40% 공제율 구간, 법정·지정·종교 한도 차이, 이월공제 10년, 기부금영수증 필수.
// Q4. GreenBox(공제율 핵심) + BorderBox(한도 비교) + Steps(신청 방법) + Checklist(준비물) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "기부금영수증 확보", desc: "기부단체에서 영수증을 받아요. 대부분 국세청 간소화 서비스에 자동 수집되지만, 일부 단체는 직접 받아야 해요." },
  { title: "홈택스 간소화 서비스 확인", desc: "1월에 hometax.go.kr에서 기부금 내역을 조회해요. 누락된 건 기부단체에 요청하세요." },
  { title: "기부금 유형 구분", desc: "법정기부금(국가·지자체), 지정기부금(사회복지·종교), 정치자금기부금 중 어디에 해당하는지 구분해요." },
  { title: "연말정산 신고서 제출", desc: "회사에 기부금영수증을 제출하거나, 종합소득세 신고 시 직접 입력해요." },
];

const FAQS = [
  { q: "종교단체 기부금 한도가 왜 낮나요?", a: "지정기부금 중 종교단체는 소득금액의 10%까지만 공제돼요. 일반 지정기부금 30%보다 낮은데, 이는 소득세법에서 종교단체를 별도로 구분하고 있기 때문이에요." },
  { q: "올해 한도를 넘긴 기부금은 어떡하나요?", a: "법정기부금과 지정기부금은 10년간 이월공제 가능해요. 다음 해에 먼저 발생한 이월분부터 공제받아요. 단, 정치자금·고향사랑기부금은 이월 안 돼요." },
  { q: "부양가족 기부금도 내가 공제받을 수 있나요?", a: "기본공제 대상 부양가족(소득 100만원 이하)의 기부금은 합산 공제 가능해요. 배우자는 나이 요건 없이 소득만 충족하면 돼요." },
  { q: "기부금영수증이 없으면 공제 못 받나요?", a: "네, 영수증이 증빙이라 없으면 공제가 안 돼요. 간소화 서비스에 자동 반영된 건 별도 영수증 없이 가능해요." },
  { q: "허위 영수증을 쓰면 어떻게 되나요?", a: "세액 추징에 과태료까지 부과돼요. 기부하지 않은 금액으로 영수증을 발급받으면 가산세도 물어요." },
  { q: "고향사랑기부금은 얼마까지 공제되나요?", a: "연간 2,000만원 한도예요(2025년 귀속부터 확대). 10만원 이하는 전액 공제(100/110), 초과분은 15% 세액공제예요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 기부금 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239040&mi=40978" },
    { label: "소득세법(기부금 공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기부금공제, 얼마나 돌려받을까?<br />
        공제율·한도·이월까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기부금 냈으면 세금 돌려받을 수 있어요.
        1천만원까지는 15%, 초과분은 30%, 3천만원 넘으면 40%까지 세액공제돼요.
        어떤 단체에 기부했는지에 따라 한도가 달라지고요.
      </p>

      <Divider />

      <H2>공제율, 얼마나 돌려받나요?</H2>
      <p style={body}>
        기부금공제는 세액공제 방식이에요. 소득에서 빼는 게 아니라 세금에서 바로 깎아줘요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239040&mi=40978" style={{ color: "#1D9E75" }}> 국세청</a>에서 정한 공제율은 기부금액 구간에 따라 달라요.
      </p>

      <GreenBox title="기부금 세액공제율">
        1천만원 이하: <strong>15%</strong><br />
        1천만원~3천만원: <strong>30%</strong><br />
        3천만원 초과: <strong>40%</strong><br />
        <span style={{ fontSize: 13, color: "#6b7280" }}>예) 2천만원 기부 → 1천만원 × 15% + 1천만원 × 30% = 450만원 환급</span>
      </GreenBox>

      <p style={body}>
        정치자금기부금은 좀 달라요. 10만원까지 전액 공제(100/110)되고, 초과분부터 15%, 3천만원 넘으면 25%예요.
        고향사랑기부금도 10만원까지 전액, 초과분 15%예요.
      </p>

      <Divider />

      <H2>기부금 종류별 한도는 얼마인가요?</H2>
      <p style={body}>
        같은 금액을 기부해도 어디에 기부했는지에 따라 한도가 달라요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75" }}>소득세법</a>에서 유형별로 구분하고 있어요.
      </p>

      <SectionBadge>기부금 유형별 한도 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>이월공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["법정기부금 (국가·지자체)", "소득의 100%", "10년"],
              ["정치자금기부금", "소득의 100%", "불가"],
              ["지정기부금 (사회복지·학술)", "소득의 30%", "10년"],
              ["종교단체 기부금", "소득의 10%", "10년"],
              ["고향사랑기부금", "연 2,000만원", "불가"],
            ].map(([type, limit, carry], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{limit}</td>
                <td style={{ padding: "9px 12px" }}>{carry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        공제 순서도 정해져 있어요. 정치자금 → 법정 → 우리사주 → 지정 순서로 한도를 계산해요.
        한도 넘는 금액은 이월공제로 다음 해에 받을 수 있어요.
      </p>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75" }}>홈택스 간소화 서비스</a>에서 기부금 내역을 확인하고, 연말정산 신고서에 반영하면 돼요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <Checklist items={[
        "기부금영수증 (간소화 서비스 미반영 시 직접 준비)",
        "기부 유형 구분 (법정·지정·종교·정치자금)",
        "부양가족 기부금 합산 여부 확인",
        "이월공제 대상 확인 (전년도 한도 초과분)",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 국세청 안내를 바탕으로 작성됐어요. 공제율과 한도는 세법 개정에 따라 변경될 수 있으니 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
