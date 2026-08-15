"use client";
// Q1. 정년 퇴직 앞둔 직원을 계속 고용하고 싶은 중소기업 사업주가 지원금이 있는지 알아보는 상황
// Q2. 지원 요건을 확인하고 고용센터에 계속고용장려금을 분기별로 신청한다
// Q3. 사업주 요건(정년제도 운영, 중소·중견), 지원금액(월 30만원, 비수도권 40만원), 신청 절차, 지원 기간
// Q4. EligibilityChecker(사업주 자격) + GreenBox(지원금액 계산) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "size", label: "중소기업 또는 중견기업이다" },
  { id: "retire", label: "취업규칙이나 단체협약에 정년제도를 운영하고 있다" },
  { id: "extend", label: "정년 연장(1년 이상), 정년 폐지, 재고용 중 하나를 시행했다" },
  { id: "within", label: "계속고용제도 시행일부터 5년 이내에 정년에 도달하는 근로자가 있다" },
  { id: "maintain", label: "해당 근로자를 정년 이후에도 계속 고용하고 있다" },
];

const STEPS = [
  {
    title: "취업규칙에 계속고용제도를 명시하세요",
    desc: "정년 연장(1년 이상), 정년 폐지, 또는 정년퇴직자 재고용 중 하나를 취업규칙이나 단체협약에 규정해야 해요. 구두 약속이나 관행만으로는 신청 자격이 안 돼요. 근로기준법상 취업규칙 변경 절차를 거쳐야 해요.",
    tip: "취업규칙 변경 시 근로자 과반수 의견 청취",
  },
  {
    title: "관할 고용센터에 사업계획서를 제출하세요",
    desc: "고용24(work24.go.kr) 또는 관할 고용센터에 계속고용장려금 사업계획서를 제출해요. 사업장 정보, 정년제도 운영 현황, 대상 근로자 명단 등을 작성해서 제출하면 돼요.",
    tip: "온라인(고용24) + 방문 신청 모두 가능",
    link: { label: "고용24 바로가기", href: "https://www.work24.go.kr" },
  },
  {
    title: "분기별로 지원금을 신청하세요",
    desc: "장려금은 분기별로 신청해요. 해당 분기에 계속 고용한 근로자 수와 고용 기간을 확인해서 신청서를 제출하면 돼요. 지급은 신청 후 약 1~2개월 내에 사업주 계좌로 입금돼요.",
    tip: "분기 종료 후 다음 달까지 신청",
  },
];

const FAQS = [
  {
    q: "직원이 직접 신청할 수 있나요?",
    a: "아니에요. 사업주가 고용센터에 직접 신청하는 제도예요. 직원은 신청 대상이 아니에요. 사업주가 정년제도를 운영하고 계속 고용해야 받을 수 있어요.",
  },
  {
    q: "지원금은 얼마나 받나요?",
    a: "수도권(서울·인천·경기)은 1인당 월 30만원, 비수도권은 월 40만원이에요. 최대 3년간 지원하니까 수도권 기준 1인당 최대 1,080만원, 비수도권은 1,440만원까지 받을 수 있어요.",
  },
  {
    q: "재고용도 지원 대상인가요?",
    a: "네, 정년퇴직 후 재고용도 대상이에요. 실제로 전체 신청의 77%가 재고용 방식이에요. 정년 연장이나 폐지가 부담스러우면 재고용 방식을 선택하는 사업장이 많아요.",
  },
  {
    q: "다른 고용 지원금과 중복으로 받을 수 있나요?",
    a: "다른 고용장려금과 중복 수급이 제한될 수 있어요. 고용증대세액공제 등과의 중복 여부는 관할 고용센터에서 사전에 확인하는 게 좋아요.",
  },
  {
    q: "대기업도 신청할 수 있나요?",
    a: "아니에요. 중소기업과 중견기업만 대상이에요. 대기업, 공공기관, 지방자치단체는 신청할 수 없어요. 우선지원대상기업 여부를 고용센터에서 확인하세요.",
  },
  {
    q: "정년을 60세에서 61세로 1년만 연장해도 되나요?",
    a: "네, 1년 이상 연장하면 돼요. 60세 → 61세, 60세 → 63세 모두 가능해요. 정년 폐지보다 부담이 적으면서도 장려금을 받을 수 있는 현실적인 방법이에요.",
  },
];

const RELATED = [
  { slug: "고령자-고용-의무-인원", title: "고령자 고용 의무 인원", description: "업종별 고령자 고용 의무 기준." },
  { slug: "고용증대-세액공제-요건-공제액-계산", title: "고용증대 세액공제", description: "인원 증가 시 세액공제 혜택." },
  { slug: "장애인-고용장려금-신청-자격", title: "장애인 고용장려금", description: "장애인 고용 시 받는 장려금." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 고용장려금 · 사업주 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정년 넘긴 직원 계속 고용하면 돈 준다고?<br />
        계속고용장려금 요건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "능력 있는 직원인데 정년이라 보내기 아깝죠?"
      </p>
      <p style={body}>
        정년 이후에도 계속 고용하면 정부가 <strong>1인당 월 30~40만원</strong>을 최대 3년간 지원해요.
        <a href="https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20250301132" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부의 고령자 고용안정지원금</a>으로 운영되는 제도인데,
        중소·중견기업이 취업규칙에 계속고용제도(정년 연장·폐지·재고용)를 명시하면 받을 수 있어요.
        전체 신청의 77%가 재고용 방식일 만큼 활용하기 쉬운 제도예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우리 회사가 받을 수 있는지 체크하세요</H2>
      <p style={body}>
        아래 요건을 모두 충족하면 신청 자격이 돼요. 핵심은 정년제도를 운영하면서 계속고용 방식을 취업규칙에 명시하는 거예요.
      </p>

      <SectionBadge>사업주 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="계속고용장려금 신청 자격이 돼요. 관할 고용센터에 사업계획서를 제출하세요."
        partialMatchText="일부 요건이 미충족이에요. 취업규칙 정비부터 시작하세요."
      />

      <GreenBox>
        지원금액 계산{"\n"}
        수도권(서울·인천·경기): 1인당 월 30만원 x 최대 36개월 = 최대 1,080만원{"\n"}
        비수도권: 1인당 월 40만원 x 최대 36개월 = 최대 1,440만원{"\n"}
        직원 3명 계속고용(비수도권) → 연간 1,440만원 지원
      </GreenBox>

      <CategoryButton label="근로/노동 정보" count={8} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>정년 연장, 폐지, 재고용 중 뭐가 좋을까?</H2>
      <p style={body}>
        세 가지 방식 모두 장려금을 받을 수 있어요. 회사 상황에 맞는 방식을 선택하면 돼요.
      </p>

      <SectionBadge>방식별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>방식</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>장점</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>유의사항</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["정년 연장 (1년 이상)", "고용 안정성 높음", "취업규칙 변경 필요"],
              ["정년 폐지", "근로자 선호도 높음", "인건비 부담 증가 가능"],
              ["재고용", "유연한 운영 가능 (77% 선택)", "재계약 조건 협의 필요"],
            ].map(([method, pros, caution], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{method}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75" }}>{pros}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{caution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        재고용 방식이 가장 많이 선택되는 이유는 기존 근로조건을 유연하게 조정할 수 있기 때문이에요. 근무 시간이나 임금을 합의하에 변경할 수 있어서 사업주 입장에서 부담이 적어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청은 이 순서대로 하세요</H2>
      <p style={body}>
        취업규칙 정비 → 사업계획서 제출 → 분기별 신청 순서예요. 온라인(<a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>)과 방문 신청 모두 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부 고령자 고용안정지원금 사업 안내를 바탕으로 작성했어요. 세부 요건은 관할 고용센터(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
