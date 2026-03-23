"use client";

// Q1. 개인 사유로 인공임신중절을 했는데 회사에 휴가를 신청할 수 있는지, 사유를 밝혀야 하는지 걱정되는 상황.
// Q2. 유산사산휴가 신청이 가능하다는 것을 확인하고, 진단서를 준비해서 회사에 휴가를 신청하는 행동.
// Q3. 근로기준법 제74조(사유 무관), 임신 기간별 휴가일수(5~90일), 전액 유급, 진단서만 필요, 거부 시 과태료 500만원.
// Q4. GreenBox(핵심 결론) + 표(임신 기간별 휴가일수) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "진단서 발급", desc: "산부인과에서 '유산 진단서' 또는 '유산 소견서'를 발급받아요. 임신 주수가 기재돼 있어야 해요.", tip: "진단서 2~5만원, 소견서 1~2만원" },
  { title: "회사에 휴가 신청", desc: "구두로 먼저 알린 후, 진단서를 첨부해서 유산사산휴가를 신청해요. 사유를 상세히 밝힐 의무는 없어요." },
  { title: "휴가 사용", desc: "임신 기간에 따라 5~90일 유급 휴가를 사용해요. 연차와 별개이고 차감되지 않아요." },
  { title: "거부 시 대응", desc: "회사가 거부하면 고용노동부 민원마당(minwon.moel.go.kr)에 '모성보호 위반'으로 신고해요. 위반 시 500만원 이하 과태료.", tip: "2주 내 조사가 시작돼요" },
];

const FAQS = [
  { q: "개인 사유로 인공임신중절해도 유산사산휴가를 받을 수 있나요?", a: "네, 가능해요. 근로기준법은 유산·사산 사유를 구분하지 않아요. 자연유산이든 인공임신중절이든 임신 기간에 따라 5~90일 유급 휴가를 받을 수 있어요." },
  { q: "신청할 때 사유를 상세히 밝혀야 하나요?", a: "아니요. 진단서에 '유산' 또는 '사산'으로만 기재돼 있으면 충분해요. 개인 사유인지 자연유산인지 밝힐 의무가 없어요." },
  { q: "회사에서 거부하면 어떻게 하나요?", a: "고용노동부에 모성보호 위반으로 신고해요. 확인되면 500만원 이하 과태료가 부과되고, 밀린 휴가를 소급 인정해야 해요." },
  { q: "연차가 차감되나요?", a: "안 돼요. 유산사산휴가는 법정 휴가이고 연차와 별개예요. 회사에서 '연차로 처리하겠다'고 하면 위법이에요." },
  { q: "임신 초기에 여러 번 유산하면 매번 받을 수 있나요?", a: "네, 매번 유산사산휴가를 받을 수 있어요. 연간 횟수 제한이 없어요." },
  { q: "프리랜서도 받을 수 있나요?", a: "근로기준법이 적용되는 근로자만 대상이에요. 정규직, 계약직, 파트타임 모두 포함되지만 프리랜서·자영업자는 대상이 아니에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제74조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "남녀고용평등법 시행령 제10조", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률시행령" },
      { label: "고용노동부 모성보호제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "출산전후휴가-급여-신청-방법", title: "출산전후휴가 급여 신청", description: "출산전후휴가 급여 신청 방법과 지급액을 정리했어요." },
  { slug: "배우자-출산휴가-신청-조건", title: "배우자 출산휴가 조건", description: "배우자 출산휴가 일수와 신청 조건을 확인해봐요." },
  { slug: "육아휴직-급여-조건", title: "육아휴직 급여", description: "육아휴직 급여 조건과 지급액을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 모성보호 · 휴가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인 인공임신중절, 유산사산휴가 받을 수 있나요?<br />
        기간별 휴가일수와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        개인 사유로 인공임신중절을 했는데 회사에 휴가를 낼 수 있는지 고민되시죠.
        결론부터 말하면, <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 유산·사산 사유를 구분하지 않아요.
        자연유산이든 개인 사유든, 진단서만 있으면 5~90일 유급 휴가를 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>핵심 결론부터 정리하면</H2>
      <p style={body}>
        유산사산휴가는 유산 원인을 따지지 않아요. 의료적으로 임신이 종료됐다면 모두 대상이에요.
        회사가 "개인 사유니까 안 된다"고 거부하면 위법이에요.
      </p>

      <GreenBox>
        · 대상: <strong>모든 근로자</strong> (정규직·계약직·파트타임)<br />
        · 사유: 자연유산·인공임신중절 <strong>구분 없음</strong><br />
        · 급여: 전액 <strong>유급</strong> (평균임금 100%)<br />
        · 서류: 의료기관 <strong>진단서(또는 소견서)</strong>만 제출<br />
        · 거부 시: 회사에 <strong>500만원 이하 과태료</strong>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>임신 기간별 휴가일수는?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 시행령 제10조</a>에서
        임신 주수별 휴가 기간을 정하고 있어요.
      </p>

      <SectionBadge>임신 기간별 휴가일수</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>임신 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>휴가일수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>급여</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["11주 이하", "5일", "유급"],
              ["12~15주", "10일", "유급"],
              ["16~21주", "30일", "유급"],
              ["22주 이상", "90일", "유급 (최초 60일 회사, 나머지 30일 고용보험)"],
            ].map(([period, days, pay], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{period}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{days}</td>
                <td style={{ padding: "9px 12px" }}>{pay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        임신 주수는 진단서나 소견서에 기재된 기간을 기준으로 해요.
        회사가 임신 주수를 임의로 재계산할 수 없어요.
      </p>

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        진단서를 받아서 회사에 제출하면 돼요. 특별한 서식이 없고, 사유를 상세히 밝힐 의무도 없어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <BorderBox>
        <strong>유산사산휴가 vs 연차, 차이가 뭔가요?</strong><br /><br />
        · 유산사산휴가: <strong>법정 휴가</strong>, 연차와 별개, 차감 안 됨<br />
        · 연차: 근로자가 자유롭게 사용하는 휴가<br /><br />
        회사에서 "연차로 처리하겠다"고 하면 이건 <strong>위법</strong>이에요.
        두 휴가는 성격이 완전히 달라요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 근로기준법·남녀고용평등법 및 고용노동부 자료를 바탕으로 작성됐어요. 개인 상황에 따라 적용이 달라질 수 있으니 고용노동부(1350)에 상담해봐요." />
    </ArticleLayout>
  );
}
