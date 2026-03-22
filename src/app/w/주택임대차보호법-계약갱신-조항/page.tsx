"use client";

// Q1. 전세 계약 만료가 다가오는데, 계약갱신청구권과 묵시적갱신 중 뭘 써야 하는지 모르겠는 상황이에요.
// Q2. 두 제도의 차이를 이해하고, 5% 상한을 확실히 적용받기 위해 계약갱신청구권을 기한 내에 행사하는 행동.
// Q3. 제6조의2(묵시적갱신) vs 제6조의3(계약갱신청구권), 행사 기간(6개월~2개월 전), 5% 상한, 1회 제한, 거절 사유, 해지권 차이.
// Q4. 비교표(핵심 차이) + GreenBox(선택 기준) + Steps(행사 방법) + BorderBox(거절 사유) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "묵시적갱신도 5% 상한이 적용되나요?", a: "해석이 갈려요. 분쟁 소지가 있으니 확실하게 5% 상한을 받으려면 계약갱신청구권을 행사하는 게 안전해요." },
  { q: "계약갱신청구권은 몇 번 쓸 수 있나요?", a: "1회만 가능해요. 최초 계약 2년 + 갱신 2년 = 총 4년이 보장돼요. 이후에는 묵시적갱신으로 연장 가능해요." },
  { q: "묵시적갱신 후 바로 이사 갈 수 있나요?", a: "네, 3개월 전에 집주인에게 통보하면 언제든 해지할 수 있어요. 2년을 다 못 채워도 돼요." },
  { q: "집주인이 실거주를 이유로 거절했는데 다른 세입자를 들이면요?", a: "손해배상을 청구할 수 있어요. 이사비, 중개수수료, 보증금 차액 등을 청구 가능해요." },
  { q: "갱신 요구는 어떻게 전달하나요?", a: "문자나 카카오톡으로 '2년 더 살겠다'고 보내면 돼요. 증거를 남기려면 내용증명이 확실해요." },
  { q: "이미 갱신청구권을 썼으면 다음은 어떻게 되나요?", a: "묵시적갱신으로 계속 연장할 수 있어요. 횟수 제한이 없어서 집주인이 거절하지 않는 한 2년씩 갱신돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "주택임대차보호법 원문", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    { label: "찾기쉬운 생활법령 (임대차계약 갱신)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" },
    { label: "국토교통부 임대차 정책 FAQ", url: "https://www.molit.go.kr" },
  ] },
];

const RELATED = [
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주자격", description: "전세 대신 국민임대도 고려해보세요." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무 범위", description: "계약 갱신 때 중개사가 어디까지 도와줄 수 있는지 확인하세요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "전세에서 매매로 전환할 때 필요한 취득세를 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 vs 묵시적갱신<br />
        5% 상한 확실히 받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약이 끝나가는데 어떻게 해야 할지 고민되시죠.
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>에는
        세입자를 보호하는 두 가지 제도가 있어요. 비슷해 보이지만 효과가 다르니 구분해서 쓸 줄 알아야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>두 제도의 핵심 차이부터 볼게요</H2>

      <SectionBadge>계약갱신청구권 vs 묵시적갱신 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>계약갱신청구권 (제6조의3)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>묵시적갱신 (제6조의2)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["방식", "세입자가 적극적으로 요청", "양쪽 아무 말 없으면 자동 연장"],
              ["5% 상한", "확실하게 적용", "분쟁 소지 있음"],
              ["횟수", "1회만 가능", "횟수 제한 없음"],
              ["행사 기간", "만료 6개월~2개월 전", "만료 6개월~2개월 전까지 침묵"],
              ["세입자 중도해지", "원칙적으로 불가", "3개월 전 통보 시 가능"],
              ["도입 시기", "2020년 7월 (임대차3법)", "1981년부터"],
            ].map(([label, req, auto], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#333" }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{req}</td>
                <td style={{ padding: "9px 12px" }}>{auto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>어떤 걸 쓰는 게 유리할까?</H2>

      <GreenBox>
        선택 기준 정리예요.<br />
        · 보증금 인상을 <strong>5%로 확실히 막으려면</strong> → 계약갱신청구권 행사<br />
        · 이미 갱신청구권을 <strong>1회 사용했다면</strong> → 묵시적갱신으로 계속 연장<br />
        · 언제든 <strong>이사 갈 자유</strong>를 원하면 → 묵시적갱신 (3개월 전 통보로 해지 가능)
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>계약갱신청구권 행사 방법</H2>

      <Steps steps={[
        { title: "행사 기간 확인", desc: "계약 만료 6개월 전부터 2개월 전 사이에 행사해야 해요. 이 기간을 놓치면 권리를 쓸 수 없어요." },
        { title: "집주인에게 갱신 의사 전달", desc: "'2년 더 살겠다'는 의사를 문자·카톡으로 보내세요. 증거를 남기려면 내용증명이 가장 확실해요." },
        { title: "집주인 응답 대기", desc: "집주인은 정당한 사유 없이 거절하지 못해요. 거절 사유가 있으면 서면으로 통보해야 해요." },
        { title: "갱신 조건 협의", desc: "보증금 인상은 기존 금액의 5%까지만 가능해요. 시세가 30% 올랐어도 5%가 상한이에요." },
      ]} />

      <Divider />

      <H2>집주인이 거절할 수 있는 경우</H2>

      <BorderBox>
        <strong>법에서 정한 거절 사유</strong><br /><br />
        · 집주인 본인이나 직계가족이 <strong>실제 거주</strong>하려는 경우<br />
        · 건물 <strong>철거·재건축</strong> 예정인 경우<br />
        · 차임(월세)을 <strong>2개월분 이상 연체</strong>한 경우<br />
        · 집주인 동의 없이 <strong>전대</strong>(다른 사람에게 빌려줌)한 경우<br />
        · 집을 <strong>심하게 훼손</strong>한 경우<br /><br />
        실거주를 핑계로 거절한 뒤 다른 세입자를 들이면 손해배상을 청구할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법 자료를 바탕으로 작성했어요. 임대차 분쟁은 개별 사안마다 판단이 다를 수 있으니 법률 전문가와 상담하세요." />
    </ArticleLayout>
  );
}
