"use client";

// Q1. 5월이 다가오는데 종합소득세 신고를 해야 하는지, 기한은 언제인지, 어떻게 하는지 모르겠는 상황이에요.
// Q2. 본인이 신고 대상인지 확인하고, 홈택스에서 기한 내에 신고를 완료하는 행동.
// Q3. 신고 기한(5/1~6/1), 신고 대상자 구분, 세율 구간(6~45%), 홈택스 신고 절차, 가산세, 환급 시기.
// Q4. GreenBox(기한·대상 요약) + 표(세율 구간) + Steps(신고 절차) + BorderBox(가산세) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "직장인인데 종합소득세 신고해야 하나요?", a: "근로소득만 있고 회사에서 연말정산을 끝냈다면 안 해도 돼요. 부업 소득이나 임대소득이 있으면 신고 대상이에요." },
  { q: "기한 넘기면 어떻게 되나요?", a: "무신고 가산세 20%가 붙어요. 부정 무신고면 40%까지 올라가요. 기한 후 신고는 가능하지만 가산세를 피할 수 없어요." },
  { q: "환급금은 언제 들어오나요?", a: "신고 후 약 30일 이내에 지정 계좌로 입금돼요. 보통 6월 말~7월 초에 받는 경우가 많아요." },
  { q: "모바일로도 신고할 수 있나요?", a: "네, 손택스 앱으로 가능해요. PC 없이 스마트폰만으로 간편하게 신고·납부까지 할 수 있어요." },
  { q: "지방소득세는 따로 신고하나요?", a: "홈택스에서 종합소득세 신고하면 위택스 연계로 지방소득세(종소세의 10%)도 함께 신고할 수 있어요." },
  { q: "성실신고확인대상자는 기한이 다른가요?", a: "네, 6월 30일까지 연장돼요. 업종별로 수입금액 기준이 정해져 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 종합소득세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7667" },
    { label: "홈택스 종합소득세 신고", url: "https://www.hometax.go.kr" },
    { label: "소득세법 (세율 규정)", url: "https://www.law.go.kr/법령/소득세법" },
  ] },
];

const RELATED = [
  { slug: "의료비-공제-대상-범위", title: "의료비 공제 대상 범위", description: "종합소득세 신고 때 의료비 공제도 함께 챙기세요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청 방법", description: "사업자라면 부가세와 종소세를 구분해서 신고해야 해요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "프리랜서 3.3% 원천징수와 종소세의 관계를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 종합소득세 · 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종합소득세, 나도 신고해야 할까?<br />
        기한·대상·세율·신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5월이 되면 사업자·프리랜서는 종합소득세부터 걱정되죠.
        내가 신고 대상인지, 기한은 언제까지인지, 세율은 얼마인지 한번에 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신고 기한과 대상, 먼저 확인하세요</H2>
      <p style={body}>
        2025년 귀속 종합소득세 신고 기한은 2026년 5월 1일부터 6월 1일까지예요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7667" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로
        성실신고확인대상자는 6월 30일까지 연장돼요.
      </p>

      <GreenBox>
        종합소득세 핵심 요약이에요.<br />
        · 신고 기한: 2026년 <strong>5월 1일 ~ 6월 1일</strong><br />
        · 성실신고 확인대상: <strong>6월 30일</strong>까지<br />
        · 신고 대상: 사업자, 프리랜서, 임대소득자, 2곳 이상 근무자<br />
        · 제외: 근로소득만 있고 연말정산 완료한 직장인
      </GreenBox>

      <Divider />

      <H2>세율은 소득 구간별로 달라요</H2>
      <p style={body}>
        종합소득세는 누진세율이 적용돼요. 소득이 높을수록 세율이 올라가지만,
        모든 소득에 최고 세율이 적용되는 게 아니라 구간별로 나눠서 계산해요.
      </p>

      <SectionBadge>2025년 귀속 과세표준 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>누진공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1,400만원 이하", "6%", "-"],
              ["1,400만원 ~ 5,000만원", "15%", "126만원"],
              ["5,000만원 ~ 8,800만원", "24%", "576만원"],
              ["8,800만원 ~ 1억 5,000만원", "35%", "1,544만원"],
              ["1억 5,000만원 ~ 3억원", "38%", "1,994만원"],
              ["3억원 ~ 5억원", "40%", "2,594만원"],
              ["5억원 ~ 10억원", "42%", "3,594만원"],
              ["10억원 초과", "45%", "6,594만원"],
            ].map(([range, rate, deduction], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{deduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>홈택스로 신고하는 절차예요</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        간편신고 서비스를 이용하면 프리랜서·사업자도 별도 프로그램 없이 온라인만으로 신고할 수 있어요.
      </p>

      <Steps steps={[
        { title: "홈택스 로그인", desc: "공동인증서, 간편인증(카카오·PASS 등), 금융인증서 중 선택해서 로그인하세요." },
        { title: "종합소득세 신고 메뉴 선택", desc: "'신고/납부 → 종합소득세'로 들어가요. 신고 유형에 따라 일반/간편/모두채움 중 선택돼요." },
        { title: "소득 자료 확인·입력", desc: "간소화 서비스에서 불러온 소득 자료를 확인하고, 누락분이 있으면 직접 입력하세요." },
        { title: "공제 항목 입력", desc: "소득공제·세액공제 항목을 입력해요. 의료비·교육비·보험료 등 간소화 자료가 자동으로 불러와져요." },
        { title: "세액 확인 후 제출", desc: "예상 세액을 확인하고 신고서를 제출하세요. 접수번호가 나오면 신고 완료예요." },
      ]} />

      <Divider />

      <H2>기한 넘기면 가산세가 붙어요</H2>

      <BorderBox>
        <strong>가산세 종류</strong><br /><br />
        · 무신고 가산세: 납부세액의 <strong>20%</strong><br />
        · 부정 무신고: 납부세액의 <strong>40%</strong><br />
        · 과소신고 가산세: 과소 납부세액의 <strong>10%</strong><br />
        · 납부불성실 가산세: 미납세액 x <strong>0.022%/일</strong><br /><br />
        기한 후 신고는 가능하지만 가산세는 피할 수 없어요. 1개월 이내 자진신고하면 가산세 50% 감면돼요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세청·소득세법 자료를 바탕으로 작성했어요. 세법 개정 시 세율·기한이 달라질 수 있으니 국세청 공식 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
