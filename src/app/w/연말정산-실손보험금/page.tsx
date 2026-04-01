"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     실손보험금을 받았는데 의료비 공제에서 빼야 하는지 모르거나, 안 빼서 추징당할까 걱정하는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     실손보험금을 의료비에서 차감하고, 간소화서비스에서 정확한 공제 대상 금액을 확인한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     실손보험금은 의료비에서 차감, 2023년부터 간소화 자동 반영, 차감 안 하면 과다공제 추징+가산세 10%, 보험사 청구시기 차이, 확인 방법
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 공식 + Steps로 확인 절차 + BorderBox로 과다공제 경고 + DocTable로 사례 비교

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const EXAMPLE_TABLE = {
  headers: ["항목", "금액", "설명"],
  rows: [
    ["총 의료비 지출", "500만원", "1년간 병원비·약값 합계"],
    ["실손보험금 수령", "300만원", "보험사에서 보상받은 금액"],
    ["공제 대상 의료비", "200만원", "500만원 - 300만원"],
    ["총급여 3% 기준 (5,000만원)", "150만원", "공제 시작점"],
    ["실제 공제 대상", "50만원", "200만원 - 150만원"],
    ["환급액 (15%)", "7.5만원", "50만원 x 15%"],
  ],
};

const CHECK_STEPS = [
  { title: "홈택스 간소화서비스 접속", desc: "1월 15일부터 홈택스에서 연말정산 간소화서비스에 접속하세요.", tip: "2023년부터 실손보험금이 자동 반영돼요" },
  { title: "의료비 항목 조회", desc: "의료비 항목을 열면 총 지출액과 실손보험금 수령액이 표시돼 있어요. 차감 후 금액을 확인하세요." },
  { title: "보험사 앱에서 교차 확인", desc: "보험사 앱이나 홈페이지에서 실손보험금 수령 내역을 조회해보세요. 간소화 금액과 일치하는지 비교해요." },
  { title: "차이가 있으면 직접 수정", desc: "보험사 청구 시기에 따라 간소화 자료와 차이가 있을 수 있어요. 실제 수령액 기준으로 맞추세요." },
];

const FAQS = [
  { q: "실손보험금을 왜 빼야 하나요?", a: "의료비 공제는 본인이 실제 부담한 금액만 대상이에요. 보험으로 돌려받은 건 본인 부담이 아니니까 빼는 거예요." },
  { q: "간소화에 자동 반영되면 안 빼도 되나요?", a: "2023년부터 자동 반영돼요. 하지만 금액이 정확한지 직접 확인해야 해요. 보험사 청구 시기에 따라 차이 날 수 있거든요." },
  { q: "안 빼면 어떻게 되나요?", a: "과다공제로 추징당해요. 과다 공제분 세금 납부 + 과소신고 가산세 10%가 붙어요. 국세청이 보험사 자료와 자동 대조해서 적발해요." },
  { q: "12월에 병원 가고 1월에 보험금 받으면?", a: "의료비 지출은 12월(지출 연도), 보험금 수령은 1월(수령 연도) 기준이에요. 같은 연도 내에서 차감하니까, 연도가 다르면 해당 연도 의료비에서 각각 처리돼요." },
  { q: "실비 청구를 안 했는데 빼야 하나요?", a: "아니에요. 실제로 보험금을 수령한 금액만 빼면 돼요. 청구하지 않은 건 차감 대상이 아니에요." },
];

const SOURCES = [
  { name: "국세청 의료비 세액공제 안내", href: "https://www.nts.go.kr" },
  { name: "소득세법 제59조의4 (특별세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목", description: "의료비, 교육비, 연금저축 등 세액공제 정리." },
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용방법", description: "홈택스 간소화 서비스 조회 절차." },
  { slug: "연말정산-환급-조회", title: "연말정산 환급금 조회", description: "환급금 확인 방법과 시기." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 실손보험 · 의료비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실손보험금 받았는데, 의료비 공제는?<br />
        차감 방법과 과다공제 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        병원비를 많이 썼는데 실손보험으로 돌려받았어요. 연말정산 의료비 공제에서 빼야 하는지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따르면 <strong>실손보험금으로 보상받은 금액은 의료비 공제에서 빼야</strong> 해요. 본인이 실제 부담한 금액만 공제 대상이에요. 안 빼면 과다공제로 추징 + 가산세 10%가 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>실손보험금 차감, 핵심 공식</H2>
      <p style={body}>
        계산은 간단해요. 총 의료비에서 실손보험금을 빼면 공제 대상 금액이 나와요.
      </p>

      <GreenBox>
        공제 대상 의료비 = 총 의료비 지출 - 실손보험금 수령액{"\n\n"}
        의료비 200만원 - 실손보험금 150만원 = 50만원만 공제 대상
      </GreenBox>

      <p style={body}>
        여기서 총급여 3%를 넘어야 공제가 시작되니까, 실손보험금 차감 후 남은 금액이 3%를 넘는지도 확인해야 해요.
      </p>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>실제 계산 예시로 보면</H2>
      <p style={body}>
        총급여 5,000만원인 직장인이 의료비 500만원을 쓰고 실손보험금 300만원을 받았다면 이렇게 돼요.
      </p>

      <SectionBadge>실손보험금 차감 계산 예시</SectionBadge>
      <DocTable headers={EXAMPLE_TABLE.headers} rows={EXAMPLE_TABLE.rows} />

      <p style={body}>
        실손보험금을 안 빼고 500만원으로 신청하면 350만원(500-150) x 15% = 52.5만원이 아니라, 실제로는 7.5만원만 받을 수 있어요. 차이 나는 금액은 추징 대상이에요.
      </p>

      <Divider />

      <H2>안 빼면 어떻게 되나요?</H2>
      <p style={body}>
        국세청은 보험사 자료를 가지고 있어요. 자동으로 대조해서 적발해요.
      </p>

      <BorderBox>
        <strong>과다공제 적발 시:</strong>{"\n"}
        1. 초과 공제분 세금 추가 납부{"\n"}
        2. 과소신고 가산세 10% 부과{"\n"}
        3. 납부불성실 가산세 (지연일수에 따라){"\n\n"}
        2023년부터 간소화서비스에 자동 반영되지만,{"\n"}
        금액이 정확한지 직접 확인하는 게 안전해요.
      </BorderBox>

      <Divider />

      <H2>정확하게 확인하는 방법</H2>
      <p style={body}>
        <a href="/w/연말정산-간소화서비스-이용방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>간소화서비스</a>에서 자동 반영된 금액과 보험사 앱 내역을 교차 확인하면 가장 정확해요.
      </p>

      <Steps steps={CHECK_STEPS} />

      <Divider />

      <H2>실손보험금과 의료비 공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 공제 기준은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
