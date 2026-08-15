"use client";
// Q1. 교사·교수인데 연말정산이 일반 직장인과 같은지, 방과후학교 수당이나 사학연금은 어떻게 되는지 궁금한 상황.
// Q2. 교원 특수 항목(방과후수당, 사학연금, 비과세 연구비)을 놓치지 않고 연말정산에 반영하는 행동.
// Q3. 기본 구조 동일, 방과후학교 수당 합산, 사학연금 전액 공제, 교육비 공제, 비과세 항목, 맞벌이 전략.
// Q4. GreenBox(핵심 포인트) + 표(교원 특수 항목 정리) + BorderBox(맞벌이 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "교원도 연말정산을 하나요?",
    a: "네, 근로소득자이기 때문에 일반 직장인과 완전히 동일하게 해요. 학교가 원천징수의무자예요.",
  },
  {
    q: "방과후학교 수당이 많으면 세금이 더 나오나요?",
    a: "총급여에 합산되니까 세율 구간이 올라갈 수 있어요. 미리 예상 세액을 계산해보는 게 좋아요.",
  },
  {
    q: "사학연금은 국민연금과 공제 방식이 다른가요?",
    a: "소득공제 대상인 건 같지만, 사학연금은 납부액 전액이 한도 없이 공제돼요. 국민연금도 전액 공제되고요.",
  },
  {
    q: "외부 과외 소득도 학교에서 정산해주나요?",
    a: "아니요. 외부 학원이나 과외 소득은 사업소득이라서 5월에 종합소득세 신고를 따로 해야 해요.",
  },
  {
    q: "연구활동비가 비과세인지 어떻게 확인하나요?",
    a: "학교 행정실에 문의하면 돼요. 실비변상 성격이면 비과세이고, 고정급여처럼 지급되면 과세 대상이에요.",
  },
  {
    q: "자녀가 본인 학교에 다녀도 교육비 공제 받나요?",
    a: "네, 실제로 납부한 금액은 공제받을 수 있어요. 학교 지원 학자금은 본인 부담이 아니니 제외돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스 간소화서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제 항목을 정리했어요." },
  { slug: "연말정산-신용카드등-사용액", title: "신용카드 소득공제", description: "카드 공제율·한도·계산법이에요." },
  { slug: "연말정산-월급", title: "연말정산과 월급의 관계", description: "원천징수·환급·추가납부가 월급에 어떻게 반영되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교원 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        교원 연말정산, 뭐가 다를까?<br />
        방과후수당·사학연금·비과세 항목 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        선생님도 일반 직장인처럼 <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a>을 해요.
        기본 구조는 똑같은데, 방과후학교 수당이나 사학연금 같은 교원만의 특수 항목이 있어서 놓치기 쉬워요.
        이것만 챙기면 환급액이 달라질 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>교원 연말정산, 기본은 직장인과 같아요</H2>
      <p style={body}>
        교사, 교수, 강사 등 교육기관 근무자는 모두 근로소득자예요.
        학교(공립·사립·대학)가 매월 급여에서 세금을 원천징수하고, 연말에 정산하는 구조죠.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        자료 조회하고, 공제 항목 챙겨서 학교에 제출하면 끝이에요.
      </p>

      <Divider />

      <H2>교원만 주의할 특수 항목</H2>

      <SectionBadge>항목별 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>처리 방식</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>주의점</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["방과후학교 수당", "근로소득 합산 (학교가 지급명세서에 포함)", "총급여 올라가서 세율 구간 상승 가능"],
              ["사학연금", "전액 소득공제 (공무원연금과 동일)", "간소화서비스에 자동 조회됨"],
              ["공무원연금", "전액 소득공제 (공립 교원)", "간소화서비스에 자동 조회됨"],
              ["연구활동비·교재비", "비과세 가능 (학교 규정에 따라 다름)", "행정실에 과세/비과세 확인 필요"],
              ["외부 과외 소득", "사업소득 → 5월 종합소득세 별도 신고", "학교 연말정산에 포함 안 됨"],
            ].map(([item, method, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{method}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>교육비 공제, 본인도 자녀도 가능해요</H2>
      <p style={body}>
        교원이라고 교육비 공제가 안 되는 건 아니에요.
        본인 대학원 등록금은 전액 15% 세액공제되고,
        자녀 유치원·초중고·대학 등록금도 공제 대상이에요.
      </p>

      <GreenBox>
        교육비 공제 한도 (연간)<br />
        · 본인 대학원: <strong>한도 없음</strong> (전액 15% 세액공제)<br />
        · 자녀 유치원~고등학교: 1인당 <strong>300만원</strong><br />
        · 자녀 대학교: 1인당 <strong>900만원</strong>
      </GreenBox>

      <p style={body}>
        학교에서 지원받은 학자금은 본인 부담이 아니니 제외돼요.
        자녀가 본인 근무 학교에 다녀도 실제 납부한 금액은 공제받을 수 있어요.
      </p>

      <Divider />

      <H2>맞벌이 교원 부부, 전략적으로 배분하세요</H2>
      <p style={body}>
        교원 부부가 맞벌이라면 공제 항목을 잘 나눠야 해요.
      </p>

      <BorderBox>
        <strong>유리한 배분 전략</strong><br /><br />
        · <a href="/w/연말정산-신용카드등-사용액" style={{ color: "#1D9E75", textDecoration: "underline" }}>신용카드 공제</a>·의료비 공제 → 총급여 낮은 쪽 (25%·3% 기준 넘기기 쉬움)<br />
        · 자녀 인적공제·교육비 공제 → 세율 높은 쪽 (절세 효과 큼)<br />
        · 부부가 함께 계산해보고 최적 조합을 찾는 게 중요해요.
      </BorderBox>

      <SectionBadge>교원 연말정산 체크리스트</SectionBadge>
      <Checklist items={[
        "간소화서비스에서 사학연금(공무원연금) 자동 조회 확인",
        "방과후학교 수당 합산 여부 급여명세서로 확인",
        "연구활동비·교재비 비과세 해당 여부 행정실 문의",
        "외부 과외 소득 있으면 5월 종합소득세 신고 준비",
        "맞벌이 부부면 공제 항목 배분 전략 수립",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 국세청 연말정산 안내와 소득세법을 바탕으로 작성했어요. 학교 규정에 따라 비과세 항목이 다를 수 있으니, 학교 행정실에 직접 확인해봐요." />
    </ArticleLayout>
  );
}
