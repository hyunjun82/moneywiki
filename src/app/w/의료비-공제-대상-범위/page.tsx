"use client";

// Q1. 연말정산 때 의료비 공제받으려는데, 내가 쓴 비용 중 뭐가 되고 뭐가 안 되는지 모르겠는 상황이에요.
// Q2. 공제 대상 항목과 제외 항목을 구분해서, 영수증 챙길 걸 정리하고 간소화 서비스에서 누락분을 직접 제출하는 행동.
// Q3. 공제율(15%/20%/30%), 총급여 3% 초과분 기준, 한도(700만원/무한도), 보호 대상 vs 비대상 항목 구분, 가족별 범위.
// Q4. 표(대상 vs 비대상) + GreenBox(핵심 공제율) + BorderBox(계산 예시) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "라식·라섹 수술비도 공제되나요?", a: "네, 시력 교정 목적이라 의료비 세액공제 대상이에요. 미용 목적이 아닌 치료 목적으로 인정돼요." },
  { q: "실손보험으로 받은 금액은 어떻게 되나요?", a: "실손보험금으로 보전받은 금액은 공제 대상에서 빠져요. 본인이 실제로 부담한 금액만 공제받을 수 있어요." },
  { q: "안경 구입비는 한도가 있나요?", a: "1인당 연 50만원 한도예요. 시력 교정용 안경·콘택트렌즈만 해당하고, 선글라스는 안 돼요." },
  { q: "예방접종비도 공제 가능한가요?", a: "원칙적으로 안 돼요. 다만 65세 이상 독감 예방접종은 예외적으로 공제 가능해요." },
  { q: "산후조리원 비용 한도는 얼마예요?", a: "출산 1회당 200만원 한도예요. 총급여 제한 없이 누구나 받을 수 있어요." },
  { q: "부모님 의료비도 내가 공제받을 수 있나요?", a: "부모님이 기본공제 대상자(연소득 100만원 이하, 만 60세 이상)면 가능해요. 65세 이상이면 한도 없이 공제돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 의료비 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6595&cntntsId=7874" },
    { label: "소득세법 제59조의4 (의료비 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "홈택스 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
  ] },
];

const RELATED = [
  { slug: "연말정산-신혼부부", title: "연말정산 신혼부부 절세 전략", description: "신혼부부는 의료비 몰아주기로 공제를 극대화할 수 있어요." },
  { slug: "종합소득세-신고-기한-대상", title: "종합소득세 신고 기한·대상", description: "프리랜서라면 종합소득세 신고 때 의료비 공제를 직접 챙겨야 해요." },
  { slug: "연말정산-간소화-서비스", title: "연말정산 간소화 서비스", description: "의료비 자료 대부분은 간소화 서비스에서 자동 조회돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 의료비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        의료비 공제, 뭐가 되고 뭐가 안 될까?<br />
        대상 범위부터 계산법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        병원비를 꽤 많이 썼는데 연말정산에서 다 돌려받을 수 있는 건지 헷갈리죠.
        라식은 되고 보톡스는 안 되고, 안경은 50만원까지만 되고... 기준이 복잡해요.
        공제 가능한 항목과 제외 항목을 깔끔하게 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>의료비 세액공제, 핵심 숫자부터 정리할게요</H2>
      <p style={body}>
        의료비 세액공제는 총급여의 3%를 초과한 금액부터 공제가 시작돼요.
        연봉 5,000만원이면 150만원 넘게 써야 공제 대상이 되는 거예요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6595&cntntsId=7874" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로
        공제율은 항목별로 달라요.
      </p>

      <GreenBox>
        의료비 세액공제 핵심 요약이에요.<br />
        · 기본 공제율: <strong>15%</strong> (일반 의료비)<br />
        · 난임 시술비: <strong>30%</strong> (한도 없음)<br />
        · 미숙아·선천성이상아: <strong>20%</strong> (한도 없음)<br />
        · 본인·65세 이상·장애인 의료비: 한도 <strong>없음</strong><br />
        · 그 외 가족 의료비: 연 <strong>700만원</strong> 한도
      </GreenBox>

      <Divider />

      <H2>공제되는 의료비 vs 안 되는 의료비</H2>
      <p style={body}>
        가장 헷갈리는 부분이에요. 핵심 기준은 '치료 목적이냐 미용 목적이냐'예요.
        치료 목적이면 대부분 공제되고, 미용이나 건강증진 목적이면 안 돼요.
      </p>

      <SectionBadge>공제 대상 vs 제외 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 대상 (O)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 제외 (X)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["병원 진료비·입원비·수술비", "쌍꺼풀·코 성형 (미용 목적)"],
              ["처방약·한약 (처방전 필수)", "건강기능식품·비타민·영양제"],
              ["임플란트·틀니·충치치료", "미용 목적 치아미백·라미네이트"],
              ["라식·라섹 (시력교정)", "보톡스·주름제거 (미용 목적)"],
              ["안경·콘택트렌즈 (연 50만원)", "선글라스·패션 안경"],
              ["산후조리원 (회당 200만원)", "간병인 비용·간병 용역비"],
              ["난임 시술 (한도 없음)", "일반 예방접종 (65세 이상 독감 제외)"],
            ].map(([yes, no], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>&#10003; {yes}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>&#10007; {no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        사고로 인한 성형은 치료 목적이라 공제돼요. 안검하수 수술도 마찬가지고요.
        보약은 한의사 처방전이 있으면 공제 가능하지만, 처방전 없이 산 건 안 돼요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>가족 의료비, 누가 공제받을 수 있나요?</H2>
      <p style={body}>
        본인 의료비는 전액 공제 대상이에요. 한도도 없어요.
        가족은 기본공제 대상자여야 하고, 관계에 따라 한도가 달라요.
      </p>

      <BorderBox>
        가족별 공제 범위 정리예요.<br /><br />
        <strong>본인</strong>: 한도 없음, 소득 요건 없음<br />
        <strong>65세 이상 부모님</strong>: 한도 없음 (기본공제 대상자일 때)<br />
        <strong>배우자</strong>: 연 700만원 한도 (연소득 100만원 이하)<br />
        <strong>자녀 (20세 이하)</strong>: 연 700만원 한도<br />
        <strong>형제자매</strong>: 연 700만원 한도<br /><br />
        맞벌이 부부는 소득 낮은 쪽이 의료비를 몰아받으면 유리해요.
        총급여 3% 기준을 더 빨리 넘기거든요.
      </BorderBox>

      <Divider />

      <H2>실제 공제액, 이렇게 계산해요</H2>
      <p style={body}>
        총급여에서 3%를 빼고, 남은 금액에 공제율을 곱하면 돼요.
        예시로 살펴볼게요.
      </p>

      <BorderBox>
        <strong>계산 예시</strong><br /><br />
        총급여: 5,000만원 / 연간 의료비: 500만원<br />
        최저사용금액: 5,000만원 x 3% = 150만원<br />
        공제 대상: 500만원 - 150만원 = <strong>350만원</strong><br />
        공제액: 350만원 x 15% = <strong>52.5만원</strong> 환급
      </BorderBox>

      <p style={body}>
        난임 시술비 300만원을 추가로 냈다면 300만원 x 30% = 90만원이 별도로 공제돼요.
        난임 시술비는 한도가 없어서 전액 적용이에요.
      </p>

      <Divider />

      <H2>간소화 서비스에서 빠지는 항목, 직접 챙겨야 해요</H2>

      <SectionBadge>수기 제출이 필요한 항목</SectionBadge>
      <Checklist items={[
        "안경·콘택트렌즈 구입비 (안경점 영수증)",
        "산후조리원 비용 (이용 영수증)",
        "보청기·휠체어 등 장애인 보장구",
        "간소화 미등록 의료기관 진료비",
        "일부 한의원 치료비",
      ]} />

      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화 서비스</a>는
        매년 1월 15일부터 조회할 수 있어요. 병원·약국 자료는 대부분 자동으로 올라오지만,
        위 항목들은 영수증을 직접 제출해야 해요. 영수증에는 환자 성명, 진료일자, 금액이 반드시 적혀 있어야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세청·소득세법 자료를 바탕으로 작성했어요. 세법 개정 시 공제율·한도가 달라질 수 있으니 국세청 공식 사이트에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
