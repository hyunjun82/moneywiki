"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 비거주자에게 소득을 지급하는 사업자 또는 비거주자 소득을 받는 외국인이 원천징수 세율을 알고 싶은 상황
// Q2: 소득 유형별 원천징수 세율을 확인하고 정확하게 원천징수 후 신고
// Q3: 비거주자 정의, 소득유형별 세율(20% 기본), 조세조약 적용, 지급명세서 제출
// Q4: GreenBox(세율 요약) + DocTable(유형별 세율표) + Steps(원천징수 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TAX_DOCS = [
  { name: "사업소득 (용역, 인적용역)", required: true, where: "20% (조세조약에 따라 감면 가능)" },
  { name: "근로소득", required: true, where: "19% 단일세율 또는 간이세액표 선택" },
  { name: "이자소득", required: true, where: "20% (조세조약에 따라 10~15%)" },
  { name: "배당소득", required: true, where: "20% (조세조약에 따라 10~15%)" },
  { name: "사용료소득 (로열티)", required: true, where: "20% (조세조약에 따라 감면 가능)" },
  { name: "양도소득", required: true, where: "양도차익의 10% 또는 양도가액의 2% 중 적은 금액" },
  { name: "기타소득", required: true, where: "20%" },
];

const STEPS = [
  { title: "비거주자 여부 확인", desc: "국내에 주소가 없고 183일 이상 거소가 없는 개인이 비거주자예요. 법인이면 외국법인에 해당해요.", tip: "여권, 체류 기간 확인서로 판단해요" },
  { title: "조세조약 확인", desc: "비거주자의 거주지국과 한국 사이에 조세조약이 있으면 세율이 낮아질 수 있어요. 국세청 조세조약 포탈에서 확인 가능해요.", tip: "국세법령정보시스템(taxlaw.nts.go.kr)에서 조약 검색 가능" },
  { title: "원천징수 후 납부", desc: "소득 지급 시 해당 세율로 원천징수하고, 다음 달 10일까지 홈택스에서 원천세를 신고·납부해요." },
  { title: "지급명세서 제출", desc: "비거주자에게 지급한 소득에 대해 지급명세서를 다음 해 2월 말까지 제출해요." },
];

const FAQS = [
  { q: "비거주자 원천징수 세율이 기본 몇 %예요?", a: "대부분 소득 유형에서 20%예요. 다만 조세조약이 체결된 국가의 거주자라면 10~15%로 낮아질 수 있어요." },
  { q: "조세조약은 어떻게 적용하나요?", a: "비거주자가 거주지국 정부에서 발급한 거주자증명서를 제출하면 조세조약 세율을 적용받을 수 있어요. 증명서 없이는 국내법 세율 20%가 적용돼요." },
  { q: "비거주자 근로소득도 원천징수하나요?", a: "네, 비거주자 근로소득은 19% 단일세율 또는 간이세액표 중 선택할 수 있어요." },
  { q: "외국법인에게 지급하는 소득도 원천징수하나요?", a: "네, 외국법인의 국내원천소득도 원천징수 대상이에요. 세율은 소득 유형별로 동일하게 적용돼요." },
  { q: "원천징수를 빠뜨리면 어떻게 되나요?", a: "가산세가 부과돼요. 미납부가산세(1일 0.022%)와 불성실가산세(10%)가 동시에 적용될 수 있으니 기한 내 신고·납부하세요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "소득세법 제119조 (비거주자 국내원천소득)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세법령정보시스템 조세조약", url: "https://taxlaw.nts.go.kr" },
  ]},
  { category: "신고", items: [
    { label: "홈택스 원천세 신고", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "원천징수-대상-의무자", title: "원천징수 대상과 의무자", description: "원천징수 의무가 있는 사람과 대상 소득 정리예요." },
  { slug: "외국납부세액공제", title: "외국납부세액공제", description: "해외에서 낸 세금을 공제받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        비거주자 원천징수 세율, 소득 유형별 몇 %일까?<br />
        조세조약 적용과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        외국인 프리랜서에게 용역비를 지급하거나 해외 법인에 로열티를 보내야 하는데 세금을 얼마나 떼야 할지 모르겠다고요?
        비거주자 원천징수 세율은 소득 유형별로 다르고, 조세조약이 있으면 감면받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소득 유형별 원천징수 세율</H2>
      <p style={body}>
        비거주자에게 지급하는 국내원천소득은 소득 유형에 따라 세율이 달라요. 지방소득세 2%를 별도로 더해야 해요.
      </p>

      <SectionBadge>비거주자 원천징수 세율표</SectionBadge>
      <DocTable docs={TAX_DOCS} />

      <GreenBox title="조세조약 적용 시">
        조세조약이 체결된 국가의 거주자라면 세율이 낮아져요. 예를 들어 미국 거주자의 이자소득은 조약에 따라 12%가 적용돼요.
        거주자증명서를 제출해야 적용받을 수 있어요.
      </GreenBox>

      <CategoryButton label="세금·원천징수 정보" count={4} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>원천징수 신고는 이렇게 해요</H2>
      <p style={body}>
        비거주자 소득을 지급할 때 원천징수하고, 다음 달 10일까지 홈택스에서 신고·납부하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 소득세법을 바탕으로 작성됐어요. 조세조약 세율은 국가별로 다르니 국세법령정보시스템에서 해당 국가 조약을 직접 확인해보세요." />
    </ArticleLayout>
  );
}
