"use client";
// Q1. 배달 플랫폼 기사로 일하는데 어떤 보험에 가입해야 하는지 모르는 상황
// Q2. 배달기사에게 필요한 보험 종류를 파악하고, 가입 방법을 확인한다
// Q3. 유상운송보험(의무), 산재보험(특수형태근로자), 화물배상보험, 개인상해보험
// Q4. GreenBox(보험 종류 정리) + Steps(가입 절차) + BorderBox(비용 비교) + FAQ
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS = [
  { title: "유상운송보험(이륜차 보험)에 가입하세요", desc: "배달용 오토바이·전동킥보드로 영업하려면 유상운송 담보가 포함된 보험에 가입해야 해요. 일반 오토바이 보험에는 유상운송 담보가 없어서 사고 시 보상이 안 될 수 있어요.", tip: "유상운송 미가입 시 과태료 + 보험금 지급 거절" },
  { title: "산재보험 가입 여부를 확인하세요", desc: "배달 플랫폼 기사는 특수형태근로종사자로 산재보험 의무 가입 대상이에요. 플랫폼 회사가 보험료의 50%를 부담해요. 나머지 50%는 본인 부담이에요.", tip: "산재보험 적용 제외를 신청할 수 있지만 권장하지 않아요" },
  { title: "개인 상해보험도 검토하세요", desc: "산재보험만으로 부족할 수 있어요. 입원비, 수술비 등을 보장하는 개인 상해보험에 추가 가입하면 안전해요. 배달 전용 상해보험 상품도 있어요." },
];

const FAQS = [
  { q: "배달기사 산재보험은 의무인가요?", a: "2022년부터 배달 플랫폼 기사는 산재보험 의무 가입 대상이에요. 플랫폼 회사가 가입 절차를 해주고, 보험료는 50:50으로 나눠요." },
  { q: "자전거 배달도 보험이 필요한가요?", a: "자전거 배달은 유상운송보험 의무는 아니지만, 사고 위험이 있으니 개인 상해보험 가입을 권해요. 산재보험은 동일하게 적용돼요." },
  { q: "사고 나면 어디에 청구해야 하나요?", a: "업무 중 사고는 산재보험(근로복지공단)에 청구해요. 상대방이 있는 교통사고는 자동차보험으로, 본인 과실이면 유상운송보험 + 산재보험으로 처리해요." },
  { q: "보험료는 얼마나 드나요?", a: "유상운송보험은 연 20~40만원 수준이에요. 산재보험료는 월 소득의 약 1.4%인데 플랫폼이 절반을 내니 본인 부담은 0.7% 정도예요." },
  { q: "퀵서비스도 같은 보험인가요?", a: "네, 퀵서비스 기사도 특수형태근로종사자로 산재보험 적용 대상이에요. 유상운송보험도 동일하게 필요해요." },
];

const SOURCES = [
  { name: "산업재해보상보험법", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "산재보상-출퇴근-사고-가능", title: "출퇴근 사고도 산재인가요?", description: "출퇴근 중 사고의 산재 인정 기준." },
  { slug: "기초수급자-실업급여", title: "기초수급자 실업급여", description: "수급자도 실업급여를 받을 수 있는지." },
  { slug: "배우자-출산휴가", title: "배우자 출산휴가", description: "배우자 출산 시 쉴 수 있는 휴가." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 배달기사 · 보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>배달기사, 어떤 보험에 들어야 하나요?<br />의무 가입부터 추가 보험까지</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"배달 일 시작했는데, 보험을 뭘 들어야 하는지 모르겠어요."</p>
      <p style={body}>배달기사에게 필요한 보험은 크게 세 가지예요. <strong>유상운송보험</strong>(오토바이 영업용), <strong>산재보험</strong>(플랫폼 기사 의무), 그리고 <strong>개인 상해보험</strong>(추가 보장)이에요. 유상운송보험 없이 배달하면 사고 시 보상을 못 받을 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>배달기사에게 필요한 보험 3가지</H2>
      <GreenBox title="보험 종류 정리">{"1. 유상운송보험 (이륜차 보험)\n· 대상: 오토바이·전동킥보드 배달\n· 성격: 의무\n· 비용: 연 20~40만원\n\n2. 산재보험\n· 대상: 플랫폼 배달기사 (특수형태근로자)\n· 성격: 의무 (2022~)\n· 비용: 플랫폼 50% + 본인 50%\n\n3. 개인 상해보험\n· 대상: 모든 배달기사\n· 성격: 선택 (권장)\n· 비용: 월 2~5만원"}</GreenBox>
      <CategoryButton label="고용·보험" count={8} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>가입은 이렇게 하세요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>비용은 얼마나 드나요?</H2>
      <BorderBox><strong>배달기사 보험 비용 정리</strong>{"\n"}· 유상운송보험: 연 20~40만원 (보장 범위에 따라){"\n"}· 산재보험: 월 소득의 약 0.7% (본인 부담분){"\n"}  - 월 200만원 소득 → 월 약 14,000원{"\n"}· 개인 상해보험: 월 2~5만원{"\n"}{"\n"}총합: 월 약 4~8만원 수준</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 산업재해보상보험법 기준으로 작성했어요. 보험료, 보장 범위는 상품에 따라 다르니 가입 전 비교해보세요." />
    </ArticleLayout>
  );
}
