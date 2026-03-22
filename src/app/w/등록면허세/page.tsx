"use client";

// Q1. 부동산 등기·법인 설립·자동차 등록 시 등록면허세가 얼마인지 궁금한 상황이에요.
// Q2. 내 상황에 맞는 세율을 확인하고 위택스에서 납부하는 행동.
// Q3. 부동산 2%, 법인 0.4%, 자동차 5%, 지방교육세 20% 추가, 면허분 세액.
// Q4. GreenBox(세율 요약) + Steps(납부 절차) + BorderBox(면허분) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const PAY_STEPS = [
  { title: "위택스 접속", desc: "wetax.go.kr에 로그인해요." },
  { title: "등록면허세 신고", desc: "부동산·차량·법인 등 해당 유형을 선택하고 과세표준을 입력해요." },
  { title: "세액 확인 및 납부", desc: "자동 계산된 세액(본세 + 지방교육세)을 확인하고 납부해요.", tip: "카드·계좌이체·가상계좌 가능" },
];

const FAQS = [
  { q: "부동산 등기할 때 등록면허세가 얼마인가요?", a: "매매는 과세표준(시가표준액)의 2%예요. 여기에 지방교육세 20%가 추가돼서 실질 부담은 2.4%예요." },
  { q: "법인 설립 시 등록면허세는 얼마인가요?", a: "자본금의 0.4%예요. 지방교육세 20% 추가하면 0.48%. 과밀억제권역(서울 등)은 3배 중과돼서 1.44%예요." },
  { q: "자동차 등록면허세는 얼마인가요?", a: "비영업용 승용차 기준 취득가액의 5%예요. 경차는 4%, 영업용은 2%예요." },
  { q: "면허분 등록면허세란 뭔가요?", a: "각종 면허·허가·인가를 받을 때 내는 세금이에요. 종별로 1종 67,500원~5종 18,000원이에요. 매년 1월에 정기분이 부과돼요." },
  { q: "등록면허세를 안 내면 어떻게 되나요?", a: "신고기한(등기일로부터 60일) 내 미납 시 20% 무신고 가산세가 붙어요. 납부기한 후에는 매일 지연 가산세도 추가돼요." },
  { q: "상속·증여로 부동산 받을 때도 내나요?", a: "네. 상속은 0.8%, 증여는 3.5% (1가구 1주택 상속 제외)예요. 유형에 따라 세율이 달라요." },
];

const REFERENCES = [
  { category: "법령 및 납부", items: [
    { label: "지방세법(법제처)", url: "https://www.law.go.kr/법령/지방세법" },
    { label: "위택스", url: "https://www.wetax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "주민세", title: "주민세 종류와 납부 방법", description: "같은 지방세인 주민세 세액과 납부 방법이에요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득 시 취득세 세율 구간을 정리했어요." },
  { slug: "주택-취득세-계산", title: "주택 취득세 계산", description: "주택 매매 시 취득세를 직접 계산해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 지방세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        등록면허세, 부동산·법인·자동차별 세율은?<br />
        세액 계산과 납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산 등기하거나 법인을 설립할 때 등록면허세를 내야 하는데, 세율이 어떻게 되는지 궁금하죠?
        부동산 매매는 2%, 법인 설립은 0.4%, 자동차는 5%예요. 여기에 지방교육세 20%가 추가되고요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>유형별 등록면허세 세율</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>에서
        등록 유형별로 세율을 정하고 있어요. 모든 등록분에 지방교육세 20%가 추가돼요.
      </p>

      <SectionBadge>등록분 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>교육세 포함</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["부동산 매매", "2%", "2.4%"],
              ["부동산 상속", "0.8%", "0.96%"],
              ["부동산 증여", "3.5%", "4.2%"],
              ["법인 설립", "0.4%", "0.48%"],
              ["법인 설립(과밀억제권역)", "1.2%", "1.44%"],
              ["비영업용 승용차", "5%", "6%"],
            ].map(([type, rate, total], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        부동산 5억 매매 시: 5억 × 2.4% = 1,200만원<br />
        법인 자본금 1억 설립(서울): 1억 × 1.44% = 144만원
      </GreenBox>

      <Divider />

      <H2>면허분은 뭐가 다른가요?</H2>
      <p style={body}>
        등록분과 별개로 각종 면허·허가·인가를 받을 때 내는 면허분이 있어요. 매년 1월에 정기분도 부과돼요.
      </p>

      <BorderBox>
        <strong>면허 종별 세액 (2026년 기준)</strong><br /><br />
        · 1종: 67,500원 (음식점·주류판매 등)<br />
        · 2종: 54,000원<br />
        · 3종: 40,500원<br />
        · 4종: 27,000원<br />
        · 5종: 18,000원
      </BorderBox>

      <Divider />

      <H2>위택스에서 납부하는 방법</H2>
      <Steps steps={PAY_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 지방세법을 기준으로 작성됐어요. 과밀억제권역 중과·감면 특례 등은 지자체별로 다를 수 있으니 위택스에서 확인하세요." />
    </ArticleLayout>
  );
}
