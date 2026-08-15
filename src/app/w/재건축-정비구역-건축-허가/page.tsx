"use client";
// Q1. 내 땅이 재건축 정비구역인데 소규모 건물을 짓거나 증축하고 싶어서, 허가가 필요한지 확인하려는 상황
// Q2. 정비구역 내 건축 허가 절차를 이해하고 구청에 허가 신청을 완료한다
// Q3. 허가 대상 행위, 신청 서류, 처리 기간, 무허가 시 제재(이행강제금·철거), 정비구역 확인법
// Q4. Steps(허가 절차) + BorderBox(허가 대상 행위) + GreenBox(무허가 제재) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "내 땅이 정비구역인지 확인하세요",
    desc: "구청 도시정비과에 전화하거나 토지이음(eum.go.kr) 사이트에서 주소를 검색하면 정비구역 여부가 나와요. 재건축인지 재개발인지 구역 종류도 확인할 수 있어요.",
    tip: "토지이음에서 무료로 확인 가능",
  },
  {
    title: "구청 도시정비과에 사전 상담을 받으세요",
    desc: "건축 계획을 설명하고 허가 가능성을 먼저 확인해요. 정비사업 일정과 겹치면 불허될 수 있어서 미리 상담하는 게 시간 낭비를 줄여요.",
  },
  {
    title: "허가 신청 서류를 준비하세요",
    desc: "건축허가 신청서, 설계도면, 토지 등기부등본, 건축 계획서가 기본이에요. 정비구역 내 행위허가 신청서도 별도로 작성해야 해요. 구청마다 양식이 다르니 미리 확인하세요.",
  },
  {
    title: "구청에 허가 신청서를 제출하세요",
    desc: "방문 접수하거나 정부24(gov.kr)에서 온라인으로 신청할 수 있어요. 서류를 스캔해서 올리고 접수번호를 받으면 돼요.",
    link: { label: "정부24 바로가기", href: "https://www.gov.kr" },
  },
  {
    title: "처리 결과를 기다리세요 (2~4주)",
    desc: "보완 요구가 들어오면 추가 서류를 제출해야 해요. 허가가 나면 건축에 착수할 수 있고, 불허되면 사유를 확인하고 계획을 수정해서 재신청할 수 있어요.",
  },
];

const FAQS = [
  {
    q: "정비구역이면 건축을 아예 못 하나요?",
    a: "아니에요. 허가만 받으면 건축할 수 있어요. 다만 정비사업에 지장을 주는 대규모 건축은 불허될 수 있어요. 소규모 건축이나 임시 건축물은 허가 가능성이 높아요.",
  },
  {
    q: "무허가로 지었다가 나중에 허가받으면 되나요?",
    a: "안 돼요. 무허가 건축물은 철거 대상이에요. 사후에 허가를 받을 수도 없고, 이행강제금이 반복 부과돼요.",
  },
  {
    q: "허가받고 지었는데 정비사업 시작되면 어떻게 되나요?",
    a: "합법 건축물은 정비사업 시 보상을 받아요. 무허가 건축물은 보상 없이 철거만 당해요. 허가 여부가 보상 가능 여부를 결정해요.",
  },
  {
    q: "정비구역이 해제되면 어떻게 되나요?",
    a: "행위 제한이 풀려요. 일반 지역처럼 건축 허가만 받으면 돼요. 정비구역 해제 여부는 구청 공지사항에서 확인할 수 있어요.",
  },
  {
    q: "증축이나 리모델링도 허가가 필요한가요?",
    a: "네. 정비구역에서는 증축, 개축, 공작물 설치, 토지 형질 변경 등 거의 모든 행위가 허가 대상이에요. 담장이나 작은 창고도 포함돼요.",
  },
  {
    q: "허가 신청 비용은 얼마 정도 드나요?",
    a: "행위허가 수수료는 무료예요. 건축허가 수수료도 소액이에요. 다만 설계도면 작성비(건축사 용역비)가 별도로 들 수 있어요.",
  },
];

const SOURCES = [
  { name: "도시및주거환경정비법", href: "https://www.law.go.kr/법령/도시및주거환경정비법" },
  { name: "찾기쉬운 생활법령정보", href: "https://www.easylaw.go.kr" },
];

const RELATED = [
  { slug: "재건축-재개발-차이", title: "재건축 재개발 차이", description: "재건축과 재개발의 기본 개념과 절차 차이." },
  { slug: "정비구역-토지-보상", title: "정비구역 토지 보상", description: "정비사업 시 토지와 건물 보상 기준." },
  { slug: "불법건축-이행강제금", title: "불법건축 이행강제금", description: "무허가 건축 시 부과되는 제재와 금액." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 재건축 · 건축 허가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        정비구역에서 건물 짓고 싶다면?<br />
        건축 허가 절차와 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내 땅이 재건축 정비구역이래요. 작은 건물 하나 짓고 싶은데 그냥 지어도 될까요?
      </p>
      <p style={body}>
        <strong>정비구역에서는 구청장 허가 없이 건축하면 안 돼요.</strong> 무단으로 지으면 이행강제금에 철거 명령까지 받아요.
        <a href="https://www.law.go.kr/법령/도시및주거환경정비법" style={{ color: "#1D9E75", textDecoration: "underline" }}>도시및주거환경정비법</a>에서 정비구역 내 행위를 제한하고 있어요.
        허가 절차만 제대로 밟으면 건축할 수 있으니 걱정 마세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 행위에 허가가 필요한가요?</H2>
      <p style={body}>
        정비구역에서는 건물 짓는 것뿐 아니라 땅을 파거나 물건을 쌓아두는 것까지 거의 모든 행위가 규제 대상이에요.
      </p>

      <BorderBox>
        <strong>허가 대상 행위</strong>{"\n"}
        · 건축물 신축·증축·개축·재축{"\n"}
        · 공작물 설치 (담장, 광고탑, 주차장, 창고 등){"\n"}
        · 토지 형질 변경 (터파기, 성토 등){"\n"}
        · 토석 채취{"\n"}
        · 토지 분할{"\n"}
        · 물건 적치 (자재, 폐기물 등 야적)
      </BorderBox>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>허가 신청 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        복잡해 보이지만 순서대로 따라가면 어렵지 않아요.
        핵심은 구청 도시정비과에서 사전 상담을 먼저 받는 거예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>무허가 건축하면 어떤 제재를 받나요?</H2>
      <p style={body}>
        허가 없이 건축하면 불법이에요. "몰랐어요"는 통하지 않아요.
        구청에서 적발하면 즉시 공사 중지 명령이 내려져요.
      </p>

      <GreenBox>
        무허가 건축 시 제재{"\n"}
        · 공사 중지 명령 (즉시){"\n"}
        · 이행강제금 부과 (수백만~수천만원, 반복 부과){"\n"}
        · 시정 명령 불이행 시 → 철거 명령{"\n"}
        · 행정대집행으로 강제 철거 → 비용 소유자 부담{"\n"}
        · 무허가 건축물은 정비사업 시 보상도 못 받아요
      </GreenBox>

      <p style={body}>
        <a href="/w/불법건축-이행강제금" style={{ color: "#1D9E75", textDecoration: "underline" }}>이행강제금</a>은 시정할 때까지 반복 부과돼요.
        공사비 다 날리고 철거비까지 내야 하니 절대 무허가로 짓지 마세요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 법률 정보를 제공해요. 정비구역별로 세부 규정이 다를 수 있으니, 해당 구청 도시정비과에서 구체적인 상담을 받으세요." />
    </ArticleLayout>
  );
}
