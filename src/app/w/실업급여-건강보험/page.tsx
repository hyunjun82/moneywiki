"use client";
// Q1: 퇴사 후 실업급여를 받는 중인데 건강보험료가 얼마나 나올지, 어떻게 처리해야 할지 걱정되는 사람
// Q2: 임의계속가입 신청해서 건강보험료 부담 줄이기
// Q3: 지역가입자 자동 전환, 실업급여는 보험료 산정 소득에 불포함, 임의계속가입 36개월 가능, 피부양자 등록 조건
// Q4: GreenBox(핵심 결론) + Steps(대응 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "퇴사 후 지역가입자 자동 전환 확인", desc: "퇴사하면 직장가입자 자격이 상실되고 지역가입자로 자동 전환돼요. 건강보험공단에서 보험료 고지서가 나와요.", tip: "퇴사 후 약 2주 뒤 첫 고지서가 도착해요" },
  { title: "임의계속가입 신청 (퇴사 후 36개월)", desc: "퇴사 전 직장 보험료가 지역 보험료보다 저렴하면 임의계속가입을 신청해요. 퇴사 후 36개월까지 직장가입자 수준의 보험료를 낼 수 있어요.", tip: "퇴사일로부터 2개월 안에 신청해야 해요" },
  { title: "피부양자 등록 가능 여부 확인", desc: "배우자나 부모가 직장가입자라면 피부양자로 등록할 수 있어요. 피부양자가 되면 보험료를 안 내도 돼요. 다만 소득과 재산 기준이 있어요." },
  { title: "실업급여 종료 후 재취업 시 직장가입자 전환", desc: "재취업하면 다시 직장가입자로 전환돼요. 임의계속가입 중이었다면 자동으로 해지되고 직장 보험료로 바뀌어요." },
];

const CHECKLIST = [
  "퇴사 후 지역가입자 전환 고지서 확인",
  "임의계속가입 신청 여부 검토 (퇴사 후 2개월 내)",
  "피부양자 등록 가능한지 확인 (소득·재산 기준)",
  "실업급여는 건강보험료 산정 소득에 포함 안 됨 확인",
  "실업크레딧(국민연금 보험료 지원) 별도 신청",
  "재취업 시 직장가입자 자동 전환 확인",
];

const FAQS = [
  { q: "실업급여 받으면 건강보험료를 안 내도 되나요?", a: "아니에요. 실업급여를 받아도 건강보험료는 계속 내야 해요. 다만 실업급여 자체는 보험료 산정 소득에 포함되지 않아서 보험료가 줄어들 수 있어요." },
  { q: "임의계속가입이 뭐예요?", a: "퇴사 전 직장 보험료를 최대 36개월까지 유지하는 제도예요. 지역 보험료가 더 비싸면 임의계속가입이 유리해요. 퇴사 후 2개월 안에 건강보험공단에 신청하면 돼요." },
  { q: "피부양자로 등록하면 보험료를 안 내도 되나요?", a: "네, 피부양자는 보험료를 안 내요. 다만 연소득 2,000만원 이하, 재산세 과세표준 5억 4,000만원 이하 등 조건을 충족해야 해요." },
  { q: "실업급여와 국민연금 실업크레딧은 별개인가요?", a: "네, 별개예요. 실업크레딧은 실업급여 수급자가 국민연금 보험료의 75%를 지원받는 제도예요. 건강보험과는 다른 제도이니 따로 신청해야 해요." },
  { q: "지역가입자 보험료가 너무 비싸면 감면받을 수 있나요?", a: "소득이 없거나 적으면 보험료 경감 신청이 가능해요. 건강보험공단 1577-1000에 전화해서 경감 대상인지 확인해보세요." },
];

const REFERENCES = [
  { category: "안내", items: [
    { label: "국민건강보험공단 임의계속가입", url: "https://www.nhis.or.kr" },
    { label: "찾기쉬운 생활법령정보 - 직장가입자 자격유지", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1063&ccfNo=2&cciNo=1&cnpClsNo=3" },
  ]},
  { category: "상담", items: [
    { label: "건강보험공단 고객센터 1577-1000", url: "https://www.nhis.or.kr" },
  ]},
];

const RELATED = [
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "실업급여를 받으려면 어떤 조건을 갖춰야 하는지 정리했어요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "자발적 퇴사도 실업급여를 받을 수 있는 경우가 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 사회보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받는 중 건강보험은 어떻게 되나?<br />
        지역가입 전환과 보험료 줄이는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사하고 실업급여를 받고 있는데 건강보험 고지서가 나왔다고요?
        직장을 그만두면 지역가입자로 자동 전환돼서 보험료를 직접 내야 해요.
        다행히 실업급여 자체는 보험료 산정 소득에 포함되지 않고, 임의계속가입으로 부담을 줄일 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴사 후 건강보험, 이렇게 바뀌어요</H2>
      <p style={body}>
        직장가입자였던 사람이 퇴사하면 건강보험 자격이 바뀌어요. 세 가지 선택지가 있어요.
      </p>

      <GreenBox title="퇴사 후 건강보험 3가지 선택">
        지역가입자 전환 → 소득·재산 기준으로 보험료 산정 (자동 전환)<br />
        임의계속가입 → 직장 보험료 수준 유지 (최대 36개월, 퇴사 후 2개월 내 신청)<br />
        피부양자 등록 → 가족 직장가입자에 편입, 보험료 무료 (소득·재산 조건 충족 시)
      </GreenBox>

      <CategoryButton label="고용·사회보험 정보" count={5} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보험료 부담을 줄이는 단계별 방법</H2>
      <p style={body}>
        보험료가 부담된다면 임의계속가입이나 피부양자 등록을 검토해보세요.
        상황에 따라 보험료를 아예 안 낼 수도 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>실업급여 수급 중 꼭 체크할 것</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        건강보험 외에 국민연금 실업크레딧도 별도로 신청해야 해요. 동시에 챙기면 사회보험 부담을 많이 줄일 수 있어요.
      </p>

      <SectionBadge>건강보험 관련 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 건강보험 제도를 바탕으로 작성됐어요. 피부양자 자격 기준과 보험료 산정 방식은 매년 변경될 수 있으니 건강보험공단에서 확인해보세요." />
    </ArticleLayout>
  );
}
