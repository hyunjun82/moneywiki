"use client";

// Q1. 편의점 아르바이트 중 다쳤는데 산재보험이 되는지 궁금한 상황
// Q2. 내가 산재보험 적용 대상인지 확인하고, 산재 신청 절차를 밟는다
// Q3. 아르바이트 산재보험 의무 적용 범위, 사업주 가입 의무, 산재 신청 방법, 보상 내용
// Q4. GreenBox(적용 기준) + Steps(신청 절차) + EligibilityChecker(대상 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "e1", label: "편의점에서 아르바이트로 일하고 있다 (또는 일했다)" },
  { id: "e2", label: "근무 중이나 출퇴근 중에 다쳤다" },
  { id: "e3", label: "사업주가 1명 이상 근로자를 고용하고 있다" },
  { id: "e4", label: "일과 부상 사이에 인과관계가 있다" },
];

const STEPS_DATA = [
  { title: "사업주에게 사고 사실 알리기", desc: "다치면 바로 사업주(점주)에게 알려요. 사업주가 산재 신청을 도와줘야 하지만, 안 해줘도 본인이 직접 신청할 수 있어요." },
  { title: "산재지정 병원 방문", desc: "근로복지공단 산재지정 의료기관에서 치료받으면 치료비를 공단이 직접 부담해요. 산재보험 의료기관 명부는 공단 홈페이지에서 조회 가능해요." },
  { title: "요양급여 신청", desc: "근로복지공단에 산재보험 요양급여 신청서를 제출해요. 의사 소견서와 사고 경위서가 필요해요." },
  { title: "승인 후 보상 수령", desc: "산재로 승인되면 치료비(요양급여), 휴업급여(평균임금 70%), 장해급여 등을 받을 수 있어요." },
];

const FAQS = [
  { q: "편의점 점주가 산재보험에 안 들었다고 하는데요?", a: "1명 이상 근로자를 고용하면 산재보험은 의무 가입이에요. 점주가 보험료를 안 냈어도 근로자는 보상받을 수 있어요. 미가입 사업장이라도 공단에 직접 신청하면 돼요." },
  { q: "하루만 일한 알바도 산재 적용되나요?", a: "네. 근무 기간이나 시간과 상관없이 1명 이상 고용 사업장의 모든 근로자에게 산재보험이 적용돼요. 일용직도 마찬가지예요." },
  { q: "출퇴근 중 다쳐도 산재인가요?", a: "2018년부터 출퇴근 재해도 산재로 인정돼요. 합리적인 경로와 방법으로 출퇴근하던 중 사고를 당한 경우예요." },
  { q: "점주가 산재 신청을 반대하면요?", a: "사업주 동의 없이도 근로자 본인이 직접 근로복지공단에 신청할 수 있어요. 사업주가 방해하면 과태료 대상이에요." },
  { q: "산재 치료비는 전액 공단이 부담하나요?", a: "산재로 승인되면 치료비 전액을 공단이 부담해요. 본인 부담금이 없어요. 건강보험이 아닌 산재보험으로 처리하는 거예요." },
  { q: "휴업급여는 얼마나 받나요?", a: "평균임금의 70%를 휴업 기간 동안 받아요. 편의점 알바의 경우 시급 기준으로 평균임금을 산정해요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단 산재보험 안내", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "근로자-실수-사고-산재-보상", title: "근로자 실수 사고도 산재 되나요?", description: "본인 과실 사고의 산재 인정 기준." },
  { slug: "산재보상-회사-주최-야유회-사고", title: "회사 야유회 사고 산재 인정", description: "회사 행사 중 사고의 산재 여부." },
  { slug: "명절-단기-아르바이트-주휴수당", title: "단기 알바 주휴수당", description: "단기 아르바이트의 주휴수당 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 산재보험 · 아르바이트</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        편의점 알바 중 다쳤는데 산재 되나요?<br />
        아르바이트 산재보험 적용과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        편의점에서 일하다 다쳤는데, 알바도 산재보험이 되는지 모르겠죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a>에 따라 1명 이상 근로자를 고용한 사업장은 모두 산재보험이 적용돼요. 아르바이트도 예외가 아니에요. 점주가 보험료를 안 냈어도 근로자는 보상받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산재보험 적용 대상인지 확인하세요</H2>
      <p style={body}>
        아래 항목에 해당하면 산재보험 보상을 받을 수 있어요.
      </p>

      <SectionBadge>산재 적용 요건</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} allMatchText="산재보험 적용 대상이에요" partialMatchText="일부 요건이 부족할 수 있어요. 공단에 문의해보세요" />

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>아르바이트도 산재가 되는 이유</H2>
      <p style={body}>
        산재보험은 근무 형태(정규직·계약직·알바)와 상관없이 적용돼요.
      </p>

      <GreenBox title="산재보험 핵심">
        적용 대상: 1명 이상 사업장의 모든 근로자{"\n"}
        보험료: 사업주가 전액 부담 (근로자 부담 없음){"\n"}
        미가입 사업장: 근로자 보상은 가능, 사업주에게 구상권 행사{"\n"}
        출퇴근 재해: 2018년부터 적용
      </GreenBox>

      <p style={body}>
        점주가 산재보험 가입을 안 했더라도 근로자의 보상 권리에는 영향이 없어요. 공단이 먼저 보상하고, 미가입 사업주에게 비용을 청구해요.
      </p>

      <Divider />

      <H2>산재 신청은 이렇게 해요</H2>
      <p style={body}>
        다치면 아래 순서대로 진행하세요.
      </p>

      <SectionBadge>산재 신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <p style={body}>
        신청은 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>(1588-0075)에서 할 수 있어요. 온라인 신청도 가능해요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>알바 산재에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법을 바탕으로 작성했어요. 개별 사고의 산재 인정 여부는 사안에 따라 다르니, 근로복지공단(1588-0075)에서 상담받으세요." />
    </ArticleLayout>
  );
}
