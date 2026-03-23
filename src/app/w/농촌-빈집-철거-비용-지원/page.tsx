"use client";

// Q1. 농촌 빈집을 철거하고 싶은데 비용이 부담되어 지원 제도를 찾는 상황
// Q2. 우리 집이 지원 대상인지 확인하고 읍면동 사무소에 철거 지원 신청을 한다
// Q3. 지원 대상 기준(빈집 판정 요건), 지원 금액, 신청 절차, 필요 서류, 자부담 비율
// Q4. EligibilityChecker(대상 확인) + Steps(신청 절차) + GreenBox(지원 금액) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "e1", label: "건축물대장에 등재된 건물이다" },
  { id: "e2", label: "1년 이상 사람이 살지 않는 빈집이다" },
  { id: "e3", label: "구조 안전 위험 또는 주변 환경을 해치는 상태다" },
  { id: "e4", label: "건물 소유자(또는 상속인)가 철거에 동의한다" },
  { id: "e5", label: "해당 지자체에서 빈집 정비 사업을 시행 중이다" },
];

const STEPS_DATA = [
  { title: "빈집 실태 신고", desc: "읍면동 사무소나 지자체 빈집 관리 부서에 빈집 현황을 신고해요. 이웃 주민도 신고할 수 있어요." },
  { title: "빈집 판정 조사", desc: "지자체 담당 공무원이 현장 조사를 해요. 1년 이상 미사용, 안전 위험, 환경 피해 여부를 확인하죠." },
  { title: "빈집 정비 계획 통보", desc: "빈집으로 판정되면 소유자에게 자진 철거를 권고해요. 자진 철거 시 비용 지원을 받을 수 있어요." },
  { title: "철거 지원 신청", desc: "읍면동 사무소에 철거 지원 신청서와 서류를 제출해요. 소유자 동의서가 꼭 필요해요." },
  { title: "철거 시행", desc: "지자체가 철거업체를 선정하거나 소유자가 직접 철거 후 비용을 지원받아요. 지자체마다 방식이 달라요." },
];

const DOCS = [
  { name: "빈집 철거 지원 신청서", required: true, where: "읍면동 사무소" },
  { name: "건축물대장 등본", required: true, where: "정부24 발급" },
  { name: "토지·건물 등기부등본", required: true, where: "인터넷등기소" },
  { name: "소유자 동의서 (공동 소유 시 전원)", required: true, where: "직접 작성" },
  { name: "현장 사진", required: false, where: "직접 촬영" },
];

const FAQS = [
  { q: "철거 비용은 얼마나 지원되나요?", a: "지자체마다 다르지만 보통 철거 비용의 50~100%를 지원해요. 건물 규모에 따라 1천만~5천만원 범위가 일반적이에요. 농림축산식품부 농촌 빈집 정비 사업은 호당 최대 5천만원까지 지원하고 있어요." },
  { q: "소유자가 행방불명이면 어떻게 하나요?", a: "지자체가 공고 절차를 거쳐 직권 철거할 수 있어요. 빈집 및 소규모주택 정비에 관한 특례법에 따라 소유자 확인이 안 되면 6개월 이상 공고 후 철거가 가능해요." },
  { q: "빈집 철거 후 땅은 어떻게 활용하나요?", a: "소유자가 원하면 텃밭, 주차장, 마을 공동시설 등으로 활용할 수 있어요. 일부 지자체는 부지 활용 비용도 별도 지원해요." },
  { q: "상속받은 빈집도 지원 대상인가요?", a: "네. 상속인이 소유자로서 동의하면 철거 지원을 받을 수 있어요. 상속 등기가 안 됐어도 상속인 확인이 되면 신청 가능한 경우가 많아요." },
  { q: "도시 지역 빈집도 지원되나요?", a: "농촌 빈집 정비 사업은 농촌 지역이 대상이에요. 도시 지역은 각 시·군·구의 빈집 정비 조례에 따라 별도 지원이 있을 수 있어요." },
];

const SOURCES = [
  { name: "빈집 및 소규모주택 정비에 관한 특례법", href: "https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" },
  { name: "농림축산식품부 농촌 빈집 정비", href: "https://www.mafra.go.kr" },
];

const RELATED = [
  { slug: "농촌-빈집-매입-리모델링-지원", title: "농촌 빈집 매입 리모델링 지원", description: "빈집을 사서 고칠 때 받을 수 있는 지원금." },
  { slug: "건축물대장-열람-발급-방법", title: "건축물대장 열람 발급 방법", description: "정부24에서 건축물대장 뽑는 법." },
  { slug: "농지-취득-자격-요건", title: "농지 취득 자격 요건", description: "농촌 토지 매입 시 알아야 할 자격 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농촌 · 빈집 정비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농촌 빈집 철거, 비용 지원받을 수 있을까?<br />
        대상 조건부터 신청 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        방치된 빈집을 철거하고 싶은데 비용이 걱정되죠. 지자체에서 철거 비용의 50~100%를 지원하는 사업이 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/빈집및소규모주택정비에관한특례법" style={{ color: "#1D9E75", textDecoration: "underline" }}>빈집 및 소규모주택 정비에 관한 특례법</a>에 따라 1년 이상 비어 있고 안전 위험이 있는 건물은 지자체 지원을 받아 철거할 수 있어요. 농림축산식품부 농촌 빈집 정비 사업은 호당 최대 5천만원까지 지원하고 있고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>우리 집이 철거 지원 대상인지 확인해보세요</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 철거 비용 지원을 받을 가능성이 높아요.
      </p>

      <SectionBadge>빈집 철거 지원 대상 조건</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} allMatchText="철거 지원 대상에 해당할 가능성이 높아요" partialMatchText="일부 조건이 부족해요. 지자체에 문의해보세요" />

      <p style={body}>
        빈집 판정 기준은 지자체 조례마다 조금씩 달라요. 읍면동 사무소에 먼저 전화해서 우리 동네 기준을 확인하는 게 가장 빨라요.
      </p>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지원 금액은 얼마나 되나요?</H2>
      <p style={body}>
        지자체마다 지원 비율과 한도가 달라요. 대표적인 기준을 정리했어요.
      </p>

      <GreenBox title="철거 비용 지원 기준">
        농림축산식품부 농촌 빈집 정비: 호당 최대 5,000만원{"\n"}
        지자체 자체 사업: 철거 비용의 50~100% (한도 1,000만~3,000만원){"\n"}
        자부담: 지자체별 0~50%{"\n"}
        부지 활용 지원: 일부 지자체 별도 지원
      </GreenBox>

      <p style={body}>
        실제 지원 금액은 건물 규모, 철거 난이도, 폐기물 처리비에 따라 달라져요. 견적을 먼저 받아보고 지자체 담당자와 상의하는 게 좋아요.
      </p>

      <Divider />

      <H2>신청 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        빈집 신고부터 철거 완료까지 보통 3~6개월 걸려요.
      </p>

      <SectionBadge>철거 지원 신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>준비해야 할 서류</H2>
      <p style={body}>
        신청 전에 아래 서류를 미리 준비하면 빠르게 진행돼요.
      </p>

      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>빈집 철거 지원에서 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 빈집 및 소규모주택 정비에 관한 특례법과 농림축산식품부 사업 안내를 바탕으로 작성했어요. 지원 금액과 조건은 지자체별로 다르니 관할 읍면동 사무소에서 확인하세요." />
    </ArticleLayout>
  );
}
