"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연말정산 시즌에 노동조합 회비를 냈는데 세금 환급이 되는지 궁금한 근로자
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     홈택스 간소화에서 노조회비 내역을 확인하고 세액공제 신청까지 완료한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     공제율 15%, 한도 근로소득금액 30%, 간소화 미조회 시 영수증 직접 수령, 이월 공제 가능
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     핵심 공제액 표 → 신청 방법 Steps → 주의사항 GreenBox → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스 간소화 서비스에서 조회",
    desc: "1월 15일 이후 홈택스(www.hometax.go.kr) → 연말정산 간소화 → 기부금 항목에서 노조회비가 자동으로 조회돼요. 자동 조회되면 별도 서류 없이 바로 신청할 수 있어요.",
    tip: "1월 15일 이전에는 데이터가 없어요. 15일 이후에 조회해보세요",
  },
  {
    title: "간소화에 없으면 노동조합에 영수증 요청",
    desc: "간소화에 노조회비가 안 보이면 노동조합에 기부금 영수증 발급을 요청해야 해요. 조합 사무실이나 담당자에게 연락하면 돼요. 급여에서 자동 공제됐어도 영수증은 따로 받아야 해요.",
    tip: "급여에서 매달 공제됐더라도 세액공제는 별도 신청 필요해요",
  },
  {
    title: "연말정산 서류에 기부금 영수증 첨부",
    desc: "간소화 자료나 직접 받은 영수증을 회사 연말정산 담당자에게 제출해요. 2월 말까지 제출하지 못했다면 5월 종합소득세 신고 때 직접 환급 신청도 가능해요.",
    link: { label: "홈택스 연말정산 간소화 바로가기", href: "https://www.hometax.go.kr" },
  },
];

const DOCS = [
  { name: "기부금(노조회비) 영수증", required: true, where: "홈택스 간소화 조회 또는 노동조합에서 직접 발급" },
  { name: "근로소득 원천징수영수증", required: false, where: "회사 급여담당 부서 요청 (한도 계산 시 필요)" },
];

const CHECKLIST = [
  "1월 15일 이후 홈택스 간소화에서 기부금 항목 확인",
  "간소화에 없으면 노동조합에 기부금 영수증 발급 요청",
  "급여에서 자동 공제됐어도 세액공제는 별도 신청 필수",
  "공제율: 1,000만원 이하 15%, 1,000만원 초과분 30%",
  "한도: 근로소득금액의 30% (다른 지정기부금과 합산)",
  "한도 초과분은 다음 해로 이월 공제 가능 (최대 10년)",
];

const FAQS = [
  {
    q: "노조회비 전액을 공제받을 수 있나요?",
    a: "전액 공제는 아니에요. 납부한 노조회비의 15%만큼 세금에서 빼줘요. 100만원 납부했으면 세금이 15만원 줄어요. 한도는 근로소득금액의 30%예요.",
  },
  {
    q: "급여에서 자동으로 빠지는데 신청 안 해도 되나요?",
    a: "공제되지 않아요. 급여에서 자동 공제되는 건 조합비를 납부한 거예요. 연말정산 세액공제는 별도로 신청해야 해요. 간소화에서 자료를 추가해야 해요.",
  },
  {
    q: "노동조합이 합법 노조인지 어떻게 아나요?",
    a: "노동조합법상 설립신고된 노조여야 해요. 회사에 노동조합이 있다면 일반적으로 합법 노조예요. 설립신고 여부는 고용노동부 노동조합 현황에서 확인할 수 있어요.",
  },
  {
    q: "한도를 초과하면 어떻게 돼요?",
    a: "초과분은 올해 공제받지 못하지만 버리지 않아도 돼요. 10년 안에 이월해서 공제받을 수 있어요. 근로소득이 있는 해라면 계속 이월 가능해요.",
  },
  {
    q: "종교단체 기부금이랑 합산되나요?",
    a: "종교단체는 별도 한도(근로소득금액 10%)가 있어요. 노조회비는 일반 지정기부금으로 30% 한도예요. 같은 지정기부금끼리는 합산해서 30% 한도를 적용해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제34조: 기부금의 필요경비 산입 및 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "노동조합 및 노동관계조정법 제2조", url: "https://www.law.go.kr/법령/노동조합및노동관계조정법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 기부금 세액공제 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스: 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 총정리", description: "공제 항목부터 신청 방법까지 연말정산 전체 흐름이에요." },
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "근로소득 과세표준별 세율과 산출세액을 확인해요." },
  { slug: "연말정산-형제자매", title: "형제자매 인적공제 조건", description: "형제자매를 부양가족으로 올릴 수 있는 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 기부금 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        노조회비 연말정산 공제<br />
        15% 세액공제 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        노동조합 회비를 냈는데 연말정산에서 환급받을 수 있다는 거 알고 계셨나요?
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제34조</a>에 따라
        노조회비는 지정기부금으로 분류돼서 납부 금액의 15%를 세금에서 빼줘요.
        급여에서 자동으로 빠졌더라도 세액공제는 별도로 신청해야 환급받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>노조회비 세액공제, 얼마나 돌려받나요?</H2>
      <p style={body}>
        납부한 노조회비의 15%를 세금에서 빼줘요. 1,000만원 초과분은 30%예요.
        대부분 노조회비는 연간 수십만~백여만원 수준이라 15%가 적용돼요.
        근로소득금액의 30%가 한도이고, 다른 일반 지정기부금과 합산해서 계산해요.
      </p>

      <GreenBox>
        공제율: 1,000만원 이하 15% / 1,000만원 초과분 30%<br />
        한도: 근로소득금액의 30% (일반 지정기부금과 합산)<br />
        초과분: 최대 10년 이월 공제 가능
      </GreenBox>

      <p style={body}>
        연간 120만원 노조회비를 냈다면 세금이 18만원 줄어요.
        소득세 세율이 15%인 구간이라면 실수령액 차이는 더 클 수 있어요.
        간소화에서 자동 조회되는 경우도 있지만, 직접 영수증을 받아야 하는 경우가 더 많아요.
      </p>

      <Divider />

      <H2>신청 방법 3단계</H2>
      <p style={body}>
        간소화에서 자동 조회되면 가장 쉽고, 안 되면 노동조합에 영수증을 직접 요청해야 해요.
        1월 15일부터 간소화 서비스가 열리니 그 전에는 조회가 안 돼요.
        2월 말까지 제출 못 했다면 5월 종합소득세 신고 때도 신청할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>준비 서류</H2>
      <p style={body}>
        간소화에서 자동 조회되면 별도 서류가 필요 없어요.
        간소화에 없을 때만 노동조합에서 직접 영수증을 받아 제출하면 돼요.
        한도 계산이 필요하면 근로소득 원천징수영수증도 함께 준비해두면 좋아요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        급여명세서에 "노조회비" 항목이 있어도 이건 납부 내역이에요.
        세액공제를 받으려면 기부금 영수증이나 간소화 자료가 반드시 필요해요.
      </BorderBox>

      <Divider />

      <H2>놓치기 쉬운 포인트</H2>
      <p style={body}>
        매달 급여에서 빠지다 보니 연말정산 때 챙기지 않는 경우가 많아요.
        특히 간소화에 없을 때 영수증 요청을 안 하면 공제를 아예 못 받아요.
        이월 공제는 반드시 다음 연말정산 때 챙겨야 해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법을 바탕으로 작성됐어요. 공제율·한도는 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
