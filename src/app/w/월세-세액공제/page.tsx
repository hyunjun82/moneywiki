"use client";

// Q1. 연말정산 때 월세 세액공제를 처음 신청하려는 무주택 직장인이 얼마 돌려받는지 계산하려는 상황
// Q2. 조건 충족 여부 확인 → 공제율·한도 계산 → 연말정산 때 서류 제출 → 환급
// Q3. 무주택 세대주·총급여 8,000만원·85㎡ 이하·기준시가 4억 이하 / 공제율 15~17% / 한도 1,000만원 / 전입신고 필수 / 임대인 동의 불필요
// Q4. EligibilityChecker(조건 체크) + GreenBox(공제율·한도 계산 예시) + Steps(신청 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "본인 및 가족(배우자·부모님·자녀) 모두 집이 없어요 (무주택 세대주)" },
  { id: "c2", label: "총급여가 8,000만원 이하예요 (종합소득금액 7,000만원 이하)" },
  { id: "c3", label: "전용면적 85㎡ 이하이고 기준시가 4억원 이하 주택에 살아요" },
  { id: "c4", label: "전입신고가 완료됐고 임대차계약서 주소와 주민등록 주소가 일치해요" },
];

const APPLY_STEPS = [
  {
    title: "서류 3가지 준비",
    description: "임대차계약서 사본 + 주민등록등본 + 월세 납입 증빙(계좌이체 확인서 또는 현금영수증)",
  },
  {
    title: "연말정산 때 회사에 제출",
    description: "연초 연말정산 시 공제 신청서와 함께 3가지 서류를 제출해요. 회사 담당자에게 '월세 세액공제 신청'이라고 명시해요.",
  },
  {
    title: "과거분은 홈택스 경정청구",
    description: "최근 5년 이내분은 홈택스에서 경정청구로 환급받을 수 있어요. 소득세 → 경정청구 메뉴에서 신청하면 돼요.",
  },
];

const FAQS = [
  {
    q: "임대인이 거부하면 신청 못 하나요?",
    a: "임대인 동의는 필요 없어요. 월세 세액공제는 근로자가 단독으로 신청하는 거예요. 임대인이 싫어해도 상관없고, 계약서에 '신청 금지' 조항을 써놔도 무효예요.",
  },
  {
    q: "오피스텔이나 고시원도 공제받을 수 있나요?",
    a: "네, 가능해요. 주거용 오피스텔은 전입신고만 하면 돼요. 고시원은 사업자등록된 곳이어야 하고 전입신고가 필수예요. 주거 목적이면 다가구주택도 돼요.",
  },
  {
    q: "세액공제와 현금영수증 중 뭐가 더 유리해요?",
    a: "세액공제가 훨씬 유리해요. 월세 600만원 기준으로 세액공제는 최대 102만원을 절감하는데 현금영수증(소득공제)은 약 25만원 절감이에요. 조건이 된다면 무조건 세액공제를 선택하세요.",
  },
  {
    q: "총급여 8,000만원 넘으면 아무것도 못 받나요?",
    a: "세액공제는 못 받아요. 대신 현금영수증으로 소득공제는 받을 수 있어요. 홈택스에서 임대인 주민번호로 현금영수증 발급 신청이 가능해요.",
  },
  {
    q: "부모님께 월세 내는 것도 공제되나요?",
    a: "안 돼요. 직계존비속(부모·조부모·자녀)에게 낸 월세는 공제 대상에서 제외돼요. 형제자매는 괜찮아요.",
  },
  {
    q: "전입신고를 나중에 해도 공제받을 수 있나요?",
    a: "전입신고한 시점 이후부터만 공제 대상이에요. 입주 즉시 전입신고하는 게 중요해요. 전입신고 전에 낸 월세는 공제 못 받아요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "소득세법 제95조의2 (월세 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 월세 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "연말정산-세율",
    title: "연말정산 세율과 환급 계산",
    description: "내 세율 구간을 알면 월세 공제 효과를 정확히 계산할 수 있어요.",
  },
  {
    slug: "전세자금대출-조건",
    title: "전세자금대출 조건과 한도",
    description: "월세 대신 전세로 갈아탈 때 대출 조건을 확인해보세요.",
  },
  {
    slug: "임대차보호법",
    title: "주택임대차보호법 핵심 정리",
    description: "전입신고와 대항력에 대해 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 월세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월세 세액공제, 얼마 돌려받나요?<br />
        조건·공제율·신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월세 80만원씩 내는데 연말정산 때 돌려받을 수 있는 돈이 있다는 거, 알고 계셨나요?
        조건만 맞으면 월세액의 <strong>15~17%</strong>를 세금에서 바로 깎아줘요.
        월세 960만원 기준이면 최대 <strong>163만원</strong>을 환급받을 수 있어요.
        임대인 동의도 필요 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>월세 세액공제 받을 수 있는 조건은?</H2>
      <SectionBadge>자격 조건 체크</SectionBadge>

      <p style={body}>
        무주택 근로자라면 조건이 맞는지 먼저 확인해보세요.
        네 가지 조건을 모두 충족해야 공제를 받을 수 있어요.
        <strong>본인뿐만 아니라 가족 전원이 무주택</strong>이어야 하는 게 핵심이에요.
        부모님이 집이 있어도 안 되고, 배우자 명의의 집이 있어도 탈락이에요.
      </p>
      <p style={body}>
        주택 크기도 중요해요. 전용면적 <strong>85㎡(약 25평) 이하</strong>이고,
        기준시가 <strong>4억원 이하</strong>인 주택이어야 해요.
        오피스텔이나 고시원도 해당되지만 전입신고는 필수예요.
        임대차계약서 주소와 주민등록 주소가 일치해야 공제 신청이 가능해요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="월세 세액공제 조건을 충족해요. 연말정산 때 신청하면 15~17% 돌려받을 수 있어요."
        partialMatchText="일부 조건이 맞지 않아요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      <H2>얼마나 돌려받을 수 있나요?</H2>

      <p style={body}>
        공제율은 총급여에 따라 달라요.
        총급여 <strong>5,500만원 이하</strong>면 월세액의 <strong>17%</strong>,
        5,500만원 초과~8,000만원 이하면 <strong>15%</strong>예요.
        공제 한도는 연간 월세액 기준 <strong>1,000만원</strong>이에요.
        월세 100만원씩 내면 연 1,200만원인데, 1,000만원까지만 인정해요.
      </p>
      <p style={body}>
        예시로 계산해볼게요.
        월세 80만원에 총급여 4,000만원이라면 연 월세 960만원 × 17% = <strong>163만 2천 원</strong>을 돌려받아요.
        월세 100만원에 총급여 6,000만원이라면 한도 1,000만원 × 15% = <strong>150만 원</strong>이에요.
        꽤 큰 금액이죠.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>총급여</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>공제율</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월세 80만원 기준 환급액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { 급여: "5,500만원 이하", 공제율: "17%", 환급: "163만 2천원 (연 960만원 × 17%)" },
              { 급여: "5,500만원 초과~8,000만원 이하", 공제율: "15%", 환급: "144만원 (연 960만원 × 15%)" },
              { 급여: "8,000만원 초과", 공제율: "공제 불가", 환급: "현금영수증(소득공제)으로 대체" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.급여}</td>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.공제율}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.환급}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 연간 월세 한도 1,000만원 / 오피스텔·고시원도 전입신고 완료 시 가능
        </p>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연말정산 신청 방법, 단계별로 정리</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        서류 3가지만 준비하면 돼요.
        임대인 동의는 필요 없고, 임대인이 싫다고 해도 신청할 수 있어요.
        계약서에 &quot;월세 세액공제 신청 금지&quot;라고 써놔도 법적으로 무효예요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        세액공제와 현금영수증은 둘 중 하나만 선택해야 해요.
        세액공제가 가능한 상황이면 무조건 세액공제를 선택하는 게 유리해요.
        현금영수증은 소득공제라서 절감 효과가 세액공제의 4분의 1 수준에 불과해요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>세액공제 vs 현금영수증 비교 (월세 600만원 기준)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>세액공제 (15%): 약 90만원 절감</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>현금영수증 (소득공제): 약 22~25만원 절감</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13, color: "#555" }}>
          ★ 세액공제 조건이 되면 무조건 세액공제 선택 / 조건 안 되면 현금영수증이라도 신청
        </p>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 소득세법 기준으로 작성됐어요. 세액공제 요건·한도는 세법 개정으로 변경될 수 있으니 국세청 홈택스 또는 세무사에게 살펴봐요." />
    </ArticleLayout>
  );
}
