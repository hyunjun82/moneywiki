"use client";

// Q1. 회사에서 휴일 출근 후 대체휴무를 줬는데, 수당이 안 나와서 차이를 확인하려는 직장인
// Q2. 대체휴무·보상휴가·휴일대체의 법적 차이를 이해하고 수당 청구 여부를 판단한다
// Q3. 3가지 제도 차이(사전/사후, 가산수당), 근로기준법 근거(55조/57조), 동의 요건
// Q4. CompareTable(3가지 비교) + GreenBox(핵심 차이) + BorderBox(수당 계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "회사가 동의 없이 대체휴무를 강제하면 어떻게 하나요?",
    a: "휴일대체든 대체휴무든 근로자 동의 없이 강제할 수 없어요. 동의 없이 휴일에 일했다면 휴일근로수당(통상임금의 1.5배)을 청구할 수 있어요. 고용노동부 민원(국번 없이 1350)에 상담하세요.",
  },
  {
    q: "보상휴가를 못 쓰면 수당으로 받을 수 있나요?",
    a: "네, 보상휴가를 사용하지 못하면 원래 지급해야 할 연장·야간·휴일근로수당을 전액 현금으로 받아요. 회사가 보상휴가 미사용분 수당을 안 주면 체불에 해당해요.",
  },
  {
    q: "대체휴무(대휴)를 받았는데 가산수당도 받을 수 있나요?",
    a: "대체휴무는 사전에 적법한 휴일대체 절차를 안 밟은 거라서, 휴일에 일한 건 그대로 휴일근로에 해당해요. 쉬는 날을 받았더라도 가산수당 50%는 별도로 청구할 수 있어요.",
  },
  {
    q: "휴일대체와 보상휴가, 근로자한테 유리한 건 뭔가요?",
    a: "보상휴가가 유리해요. 보상휴가는 가산수당(1.5배)이 반영된 시간만큼 쉴 수 있고, 못 쓰면 현금으로 받아요. 휴일대체는 1:1 교환이라 가산수당이 발생하지 않아요.",
  },
  {
    q: "보상휴가제를 도입하려면 어떤 절차가 필요한가요?",
    a: "근로기준법 제57조에 따라 근로자대표와 서면합의가 필수예요. 구두 합의만으로는 안 되고, 합의서에 적용 범위·사용 기간·미사용 시 수당 지급 등을 명시해야 해요.",
  },
  {
    q: "관공서의 공휴일도 휴일대체가 되나요?",
    a: "근로기준법 제55조 제2항에 따라 관공서 공휴일은 유급휴일이에요. 휴일대체가 가능하지만, 근로자 동의 + 사전에 대체할 날을 특정해야 해요. 동의 없이 공휴일 출근시키면 휴일근로수당을 지급해야 해요.",
  },
];

const RELATED = [
  { slug: "연차수당-계산-방법", title: "연차수당 계산 방법", description: "미사용 연차를 수당으로 받는 법." },
  { slug: "통상임금-퇴직금-계산", title: "통상임금으로 퇴직금 계산", description: "통상임금 산정 기준과 퇴직금 공식." },
  { slug: "근로조건-변경-실업급여", title: "근로조건 변경과 실업급여", description: "근로조건 악화로 퇴사해도 수급 가능한 경우." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>노동 · 휴일 · 수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대체휴무와 보상휴가, 뭐가 다른가요?<br />
        수당 차이와 근로자 권리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "휴일에 출근했는데 수당 대신 대체휴무를 준다고 해요. 이거 맞는 건가요?"
      </p>
      <p style={body}>
        비슷해 보이지만 법적 성격이 완전히 달라요. <strong>대체휴무(대휴)</strong>는 사후 조치라서 가산수당 50%를 별도로 받을 수 있고, <strong>휴일대체</strong>는 사전에 바꾸는 거라서 가산수당이 없어요.
        <strong>보상휴가</strong>는 수당 대신 1.5배 시간으로 쉬는 제도예요. 세 가지 차이를 정확히 알아야 손해 보지 않아요.
      </p>

      <Divider />

      <H2>세 가지 제도를 한눈에 비교해 볼게요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a> 제55조(휴일대체)와 제57조(보상휴가제)가 근거 조항이에요.
      </p>

      <SectionBadge>3가지 제도 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>휴일대체</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대체휴무(대휴)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보상휴가</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["시점", "사전 교환", "사후 조치", "사후 보상"],
              ["근거법", "제55조", "관행(법 근거 없음)", "제57조"],
              ["동의 요건", "근로자 동의", "별도 합의 없음", "근로자대표 서면합의"],
              ["가산수당", "없음 (1:1 교환)", "50% 별도 지급", "1.5배 시간 보상"],
              ["미사용 시", "—", "수당 미정산 분쟁", "수당 전액 지급"],
              ["회사 유리?", "회사에 유리", "분쟁 소지 높음", "중립적"],
            ].map(([label, a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="노동 정보" count={6} href="/category/노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수당 차이를 숫자로 비교해 볼게요</H2>
      <p style={body}>
        일요일(주휴일)에 8시간 근무한 경우를 가정할게요. 통상시급이 15,000원이라면 세 제도에 따라 받는 돈이 달라져요.
      </p>

      <BorderBox>
        <strong>통상시급 15,000원, 주휴일 8시간 근무 시</strong>{"\n\n"}
        · 휴일대체: 일요일 = 평일. 8시간 x 15,000원 = 120,000원 + 대체일 1일 휴무{"\n"}
        · 대체휴무: 휴일근로 그대로. 8시간 x 15,000원 x 1.5 = 180,000원 + 1일 쉼{"\n"}
        · 보상휴가: 수당 대신 12시간(8h x 1.5) 보상휴가{"\n\n"}
        → 대체휴무가 근로자에게 60,000원 더 유리해요
      </BorderBox>

      <p style={body}>
        회사가 "대체휴무 줬으니 가산수당은 없다"고 하면 잘못된 거예요. 대체휴무는 적법한 휴일대체가 아니기 때문에 50% 가산수당을 별도로 받을 수 있어요. 이 차이를 모르면 매달 수만원씩 손해볼 수 있어요.
      </p>

      <Divider />

      <H2>어떤 제도가 적용됐는지 확인하는 법이에요</H2>
      <p style={body}>
        핵심은 "사전에 특정 날짜를 정해서 바꿨는가"예요. 이 조건이 충족되면 휴일대체, 안 됐으면 대체휴무(대휴)예요.
      </p>

      <GreenBox>
        판단 기준{"\n"}
        · 휴일 전에 "이번 주 일요일 대신 수요일 쉬자"고 합의 → 휴일대체{"\n"}
        · 일요일 출근 후 "나중에 하루 쉬어" → 대체휴무 (가산수당 50% 추가 청구 가능){"\n"}
        · 근로자대표와 서면합의로 "수당 대신 1.5배 시간 쉬기" → 보상휴가
      </GreenBox>

      <p style={body}>
        분쟁이 생기면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 민원(1350)이나 관할 근로감독관에게 상담받을 수 있어요. 근로계약서와 급여명세서를 미리 준비하면 상담이 빨라져요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>근로기준법</a>
        <a href="https://www.moel.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>고용노동부</a>
      </div>

      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 고용노동부 행정해석을 바탕으로 작성됐어요. 개별 사안은 노무사 상담을 권장해요." />
    </ArticleLayout>
  );
}
