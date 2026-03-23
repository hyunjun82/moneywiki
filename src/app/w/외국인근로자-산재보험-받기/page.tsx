"use client";

// Q1. [에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 국적과 체류자격에 무관하게 모든 근로자에게 산업재해보상보험법이 적용돼요., 불법체류자도 산재보험을 받을 수 있고, 신청으로 추방되지 않아요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "외국인근로자 산재보험 신청하면 출입국에 신고되나요?", a: "아니에요. 근로복지공단과 출입국관리소는 별개 기관이에요. 산재 신청 자체로는 불법체류 사실이 출입국에 통보되지 않아요. 치료 종결 후 출입국 절차를 밟으면 돼요." },
  { q: "외국인근로자 산재 치료 중 비자 만료되면 어떻게 되나요?", a: "치료가 끝날 때까지 체류 연장 신청이 가능해요. 근로복지공단에서 치료 필요성을 확인해주면 출입국관리소에 체류 연장을 신청할 수 있어요. 치료 종결 후 귀국해야 해요." },
  { q: "외국인근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "외국인근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "외국인근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "산업재해보상보험법 - 적용 범위", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단 - 외국인 산재보험 안내", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "야유회-사고-산재보상-받기", title: "야유회 사고 산재보상 받기", description: "관련 내용 정리." },
  { slug: "계약직-실업급여", title: "계약직 실업급여 조건", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국인근로자 산재보험 적용 범위 | 체류자격 무관 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국적과 체류자격에 무관하게 모든 근로자에게 산업재해보상보험법이 적용돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>외국인근로자 체류자격 무관 산재보험 적용 범위는요?</H2>
      <p style={body}>있어요. 산업재해보상보험법은 적용 범위에서 국적이나 체류자격을 구분하지 않아요. 합법·불법 체류를 막론하고 근로 관계가 있으면 모두 보호 대상이에요.</p>
      <GreenBox>
        국적과 체류자격에 무관하게 모든 근로자에게 산업재해보상보험법이 적용돼요.{"\n"}
        불법체류자도 산재보험을 받을 수 있고, 신청으로 추방되지 않아요.{"\n"}
        산재 치료 중 비자가 만료돼도 치료 종결까지 체류가 연장될 수 있어요.
      </GreenBox>
      <p style={body}>E-9(비전문취업), H-2(방문취업), E-7(특정활동) 등 취업비자로 일하는 경우는 물론이고, 미등록 외국인도 산재 신청이 가능해요. 한국 법원도 불법체류 외국인의 산재 수급권을 반복적으로 인정해 왔어요.</p>

      <CategoryButton label="실업급여" count={10} href="/category/%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>외국인근로자 산재보험 신청 방법은 뭔가요?</H2>
      <p style={body}>근로복지공단에 직접 신청해요. 회사 동의 없이 근로자가 직접 신청할 수 있어요.</p>
      <BorderBox>
        <strong>외국인근로자 산재보험 신청 방법은 뭔가요?</strong><br />
        근로복지공단에 직접 신청해요. 회사 동의 없이 근로자가 직접 신청할 수 있어요.<br />
        신청 절차예요. 먼저 사고 발생 후 병원에 가서 "일하다 다쳤다"고 정확히 말하고 치료받으세요. 병원에서 산재 환자로 등록되면 치료비가 산재 처리돼요. 이후 근로복지공단(1588-0075)이나 홈페이지에서 요양급여 
      </BorderBox>
      <p style={body}>신청 절차예요. 먼저 사고 발생 후 병원에 가서 "일하다 다쳤다"고 정확히 말하고 치료받으세요. 병원에서 산재 환자로 등록되면 치료비가 산재 처리돼요. 이후 근로복지공단(1588-0075)이나 홈페이지에서 요양급여 신청서를 제출하면 돼요.</p>

      <Divider />
      <H2>외국인근로자 귀국 후에도 산재보험 신청 가능한가요?</H2>
      <p style={body}>가능해요. 사고일로부터 3년 이내라면 본국에서도 청구할 수 있어요.</p>
      <p style={body}>귀국 전에 사고 관련 자료를 반드시 챙기세요. 진단서, 사고 경위 기록, 회사 관련 정보(사업장명, 사업자등록번호, 연락처)를 확보해두면 귀국 후 청구 시 유리해요. 치료비 영수증과 치료 기록도 보관하세요.</p>
      <p style={body}>귀국 후에는 한국에 있는 대리인을 지정하거나, 근로복지공단에 직접 우편으로 신청할 수 있어요. 공단 외국인 담당 부서에서 해외 거주 청구인을 위한 절차를 안내해줘요.</p>

      <Divider />
      <H2>외국인근로자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
