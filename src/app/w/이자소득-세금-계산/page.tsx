"use client";

// Q1. 예금·적금 이자에서 세금이 얼마나 빠지는지, 금융소득이 많으면 종합과세 대상인지 궁금한 상황.
// Q2. 본인 이자소득에 대한 세금을 계산하고, 2천만원 초과 시 종합소득세 신고 여부를 판단하는 행동.
// Q3. 원천징수 15.4%, 금융소득종합과세 기준 2천만원, 비과세 상품(ISA·비과세종합저축), 절세 전략.
// Q4. GreenBox(핵심 세율) + 표(상품별 과세) + BorderBox(계산 예시) + Checklist(절세 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "이자소득세 15.4%는 어떻게 구성되나요?",
    a: "이자소득세 14% + 지방소득세 1.4%예요. 은행에서 이자 줄 때 자동으로 떼고(원천징수) 지급해요.",
  },
  {
    q: "금융소득 2천만원은 이자만 해당하나요?",
    a: "아니요, 이자소득 + 배당소득을 합산해서 2천만원이에요. 원천징수 전 금액(세전) 기준이에요.",
  },
  {
    q: "2천만원 넘으면 세금이 얼마나 더 나오나요?",
    a: "초과분에 다른 소득과 합산해서 종합소득세율(6.6%~49.5%)이 적용돼요. 다른 소득이 많으면 추가 세금이 상당할 수 있어요.",
  },
  {
    q: "비과세종합저축은 누구나 가입할 수 있나요?",
    a: "65세 이상(기초연금 수급자), 장애인, 독립유공자 등이 가입할 수 있어요. 2026년부터 기초연금 수급자 조건이 추가됐어요.",
  },
  {
    q: "ISA 계좌의 비과세 한도는 얼마예요?",
    a: "일반형 200만원, 서민형·농어민형 400만원까지 비과세예요. 초과분은 9.9% 분리과세돼요.",
  },
  {
    q: "해외 예금 이자도 한국에서 세금 내야 하나요?",
    a: "네, 국내와 동일하게 과세돼요. 금액 무관 5월 종합소득세 신고 필수이고, 현지에서 낸 세금은 외국납부세액공제로 이중과세를 방지해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제16조 (이자소득)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 금융소득 과세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 종합소득세 신고", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "금융소득-원천징수-이자-배당", title: "금융소득 원천징수", description: "이자·배당소득 원천징수 구조와 세율이에요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제", description: "연금저축으로 절세하면서 이자소득세를 이연하는 방법이에요." },
  { slug: "예금자보호제도", title: "예금자보호제도 1억원 한도", description: "예금 보호 한도와 분산 예치 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 이자소득 · 금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이자소득 세금, 얼마나 떼나요?<br />
        세율 15.4%부터 종합과세까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        예금 이자를 받았는데 생각보다 세금이 많이 빠져서 놀란 적 있죠?
        기본적으로 15.4%가 원천징수되고, 이자+배당 합계가 연 2천만원을 넘으면 종합소득세까지 나와요.
        어디서 얼마나 떼이는지, 줄이는 방법은 뭔지 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>기본 세율 15.4%, 자동으로 떼여요</H2>

      <GreenBox>
        · 이자소득세: <strong>14%</strong><br />
        · 지방소득세: <strong>1.4%</strong> (이자소득세의 10%)<br />
        · 합계: <strong>15.4%</strong> — 은행에서 이자 지급 시 자동 원천징수<br />
        · 별도 신고 불필요 (금융소득 2천만원 이하 시)
      </GreenBox>

      <BorderBox>
        <strong>계산 예시 — 정기예금 1억원, 연 4%</strong><br /><br />
        · 연 이자: 400만원<br />
        · 원천징수 (15.4%): 61.6만원<br />
        · 실수령: <strong>338.4만원</strong>
      </BorderBox>

      <Divider />

      <H2>금융소득 2천만원 넘으면 종합과세</H2>
      <p style={body}>
        이자소득 + 배당소득을 합산해서 연 2천만원을 넘기면 금융소득종합과세 대상이에요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제14조</a>에서
        규정하고 있어요.
      </p>

      <BorderBox>
        <strong>종합과세 계산 구조</strong><br /><br />
        · 2,000만원까지: 14% 원천징수로 과세 종결<br />
        · 2,000만원 초과분: 다른 소득과 합산해서 종합소득세율(6.6%~49.5%) 적용<br />
        · 5월에 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        종합소득세 신고해야 해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>상품별 이자소득 과세 방식</H2>

      <SectionBadge>금융상품별 세금 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>상품</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["예금·적금", "15.4%", "원천징수, 2천만원 초과 시 종합과세"],
              ["채권(일반)", "15.4%", "이자 지급 시 원천징수"],
              ["저축성보험 (10년 이상)", "비과세", "월 보험료 150만원 이하 조건"],
              ["MMF·CMA", "15.4%", "매일 이자 발생, 원천징수"],
              ["ISA 계좌", "일부 비과세", "200~400만원 비과세, 초과분 9.9%"],
              ["비과세종합저축", "비과세", "65세 이상 등, 5천만원 한도"],
            ].map(([product, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{product}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, color: rate === "비과세" || rate === "일부 비과세" ? "#1D9E75" : "#333" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>이자소득 세금 줄이는 방법</H2>

      <SectionBadge>절세 전략 체크리스트</SectionBadge>
      <Checklist items={[
        "가족에게 예금 분산 — 각자 2천만원 이하 유지로 종합과세 회피",
        "ISA 계좌 활용 — 200~400만원 비과세 + 초과분 9.9% 분리과세",
        "비과세종합저축 (65세 이상 등) — 5천만원 한도 이자 전액 비과세",
        "장기저축성보험 — 10년 이상 유지하면 이자 비과세",
        "연금저축·IRP — 이자에 대한 과세를 연금 수령 시로 이연",
      ]} />

      <p style={body}>
        금융소득이 2천만원에 가까워지면 연말에 만기가 돌아오는 예금을 다음 해로 미루는 것도 방법이에요.
        가족에게 분산할 때는 증여세 문제가 생길 수 있으니 연간 증여 공제 한도(배우자 6억, 성인 자녀 5천만원)를 확인해야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 소득세법과 국세청 자료를 바탕으로 작성했어요. 금융소득 과세 기준은 세법 개정에 따라 달라질 수 있으니, 종합과세 대상이면 세무사 상담을 받아봐요." />
    </ArticleLayout>
  );
}
