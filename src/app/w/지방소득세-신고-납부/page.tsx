"use client";

// Q1. 종합소득세 신고는 했는데 지방소득세를 따로 신고해야 하는지, 어디서 하는지 모르는 상황이에요.
// Q2. 홈택스에서 종합소득세 신고 후 위택스에서 지방소득세를 신고·납부하는 행동.
// Q3. 세율(소득세의 10%), 신고 기한(5월 31일), 신고 방법(위택스 연동), 가산세(무신고 20%, 부정 40%), 환급 처리.
// Q4. GreenBox(핵심 정리) + Steps(신고 절차) + BorderBox(가산세 정보) + Checklist(체크리스트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "홈택스에서 종합소득세 신고", desc: "먼저 국세청 홈택스(hometax.go.kr)에서 종합소득세 신고를 완료하세요.", tip: "5월 1일~31일 신고 기간이에요" },
  { title: "접수증에서 지방소득세 신고 이동 클릭", desc: "종합소득세 신고 완료 후 접수증 화면에서 '지방소득세 신고이동' 버튼을 누르면 위택스로 자동 연결돼요." },
  { title: "위택스에서 자동 연동 확인", desc: "위택스(wetax.go.kr)에서 종합소득세 신고 내역이 자동 연동돼요. 금액(소득세 x 10%)이 맞는지 확인만 하면 돼요." },
  { title: "신고 제출 후 납부", desc: "신고서 제출 완료 후 즉시 납부하거나, 전자납부번호로 은행·ATM에서도 납부할 수 있어요." },
];

const CHECK_ITEMS = [
  "종합소득세 신고와 별도로 위택스에서 지방소득세 신고했나요?",
  "자동 연동된 금액이 소득세의 10%와 일치하나요?",
  "5월 31일 기한 내에 신고·납부를 완료했나요?",
  "소득세 환급 시 지방소득세 환급도 별도로 신청했나요?",
];

const FAQS = [
  { q: "지방소득세는 소득세랑 별개로 내야 하나요?", a: "네, 별개예요. 소득세는 국세청에, 지방소득세는 위택스(지자체)에 따로 신고·납부해야 해요. 많은 분이 소득세만 내고 지방소득세를 빠뜨려요." },
  { q: "직장인도 지방소득세를 내나요?", a: "네, 매월 월급에서 소득세와 함께 원천징수돼요. 회사에서 알아서 처리하니까 직장인은 별도 신고가 필요 없어요." },
  { q: "신고 안 하면 가산세가 얼마예요?", a: "무신고 가산세 20%, 부정 무신고는 40%예요. 납부가 늦으면 미납세액에 하루 0.022%씩 지연 가산세도 붙어요." },
  { q: "양도소득 지방소득세는 언제 내나요?", a: "양도일이 속한 달 말일로부터 2개월 이내에 예정신고해야 해요. 양도소득세와 함께 처리하세요." },
  { q: "소득세 환급받으면 지방소득세도 환급되나요?", a: "네, 환급 대상이에요. 다만 위택스에서 별도로 환급 신청해야 해요. 자동으로 들어오지 않아요." },
  { q: "프리랜서도 5월에 신고해야 하나요?", a: "네, 종합소득세 신고 대상이면 지방소득세도 5월에 함께 신고해야 해요. 홈택스 → 위택스 순서로 하면 돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "위택스 지방소득세 신고", url: "https://www.wetax.go.kr" },
      { label: "국세청 홈택스", url: "https://www.hometax.go.kr" },
      { label: "지방세법 제92조 (법제처)", url: "https://www.law.go.kr/법령/지방세법" },
    ],
  },
];

const RELATED = [
  { slug: "종합소득세-신고-절차", title: "종합소득세 신고 절차", description: "5월 종합소득세 신고 방법을 처음부터 끝까지 안내해요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "사업자가 원천징수한 세금을 신고하는 절차예요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "부가가치세 환급 절차를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 지방소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지방소득세, 따로 신고해야 하나요?<br />
        위택스 신고·납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종합소득세는 홈택스에서 신고했는데, 지방소득세는 어디서 내야 하는지 헷갈리시죠?
        소득세와 별개로 <a href="https://www.wetax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>위택스</a>에서 따로 신고·납부해야 해요.
        세율은 소득세의 10%라서 계산은 간단하지만, 빠뜨리면 가산세가 붙어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>지방소득세, 핵심만 알면 간단해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>에 따라
        소득세 납부자는 지방자치단체에 지방소득세를 별도로 내야 해요.
      </p>

      <GreenBox title="지방소득세 핵심 정리">
        · 세율: <strong>소득세 x 10%</strong> (소득세 100만원이면 지방소득세 10만원)<br />
        · 신고 기한: <strong>5월 1일~31일</strong> (종합소득세와 같은 기간)<br />
        · 신고 방법: <strong>위택스(wetax.go.kr)</strong>에서 온라인 신고<br />
        · 직장인: 회사에서 매월 원천징수, 별도 신고 불필요
      </GreenBox>

      <Divider />

      <H2>누가 신고해야 하나요?</H2>
      <p style={body}>
        소득 유형에 따라 신고 방식이 달라요.
      </p>

      <SectionBadge>소득 유형별 신고 방식</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>소득 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>신고 방법</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기한</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["종합소득 (사업자·프리랜서)", "위택스에서 직접 신고", "5월 31일"],
              ["근로소득 (직장인)", "회사에서 원천징수 (신고 불필요)", "매월 10일"],
              ["양도소득 (부동산 매도)", "위택스에서 직접 신고", "양도일로부터 2개월"],
              ["이자·배당소득", "금융기관에서 원천징수", "자동 처리"],
            ].map(([type, method, deadline], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{method}</td>
                <td style={{ padding: "9px 12px" }}>{deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>위택스 신고 절차, 이 순서로 하세요</H2>
      <p style={body}>
        홈택스에서 종합소득세 신고를 먼저 끝내고, 바로 위택스로 넘어가면 돼요. 자동 연동이라서 금액을 직접 입력할 필요 없어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>가산세, 빠뜨리면 이만큼 더 내요</H2>
      <p style={body}>
        지방소득세를 깜빡하고 안 내면 가산세가 상당해요. 소액이라고 무시하지 마세요.
      </p>

      <BorderBox>
        가산세 기준이에요.<br /><br />
        · 무신고 가산세: 납부세액의 <strong>20%</strong><br />
        · 부정 무신고: 납부세액의 <strong>40%</strong><br />
        · 과소신고 가산세: 과소 납부액의 <strong>10%</strong> (부정 시 40%)<br />
        · 납부지연 가산세: 미납세액 x 일수 x <strong>0.022%</strong> (연 약 8%)
      </BorderBox>

      <Divider />

      <H2>신고 전 체크해보세요</H2>
      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 지방세법과 위택스 안내를 바탕으로 작성됐어요. 세율과 신고 방식은 변경될 수 있으니, 신고 전 위택스에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
