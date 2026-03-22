"use client";
// Q1. 아파트에서 고양이를 키우고 있는데 관리규약에 따른 사육 기준이 궁금한 입주민
// Q2. 공동주택에서 반려동물 사육 규정을 확인하고, 민원 대응 방법을 파악한다
// Q3. 동물보호법, 공동주택관리법, 관리규약의 관계, 층간소음·위생 문제, 사육 금지 특약 효력
// Q4. GreenBox(법적 기준) + BorderBox(관리규약 유형) + Checklist(확인사항) + FAQ
import { H2, GreenBox, BorderBox, Divider, body, Checklist, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
const CHECKLIST = ["관리규약에 반려동물 사육 조항 확인 / 관리사무소에서 열람", "층간소음 방지 조치 / 발톱 관리, 캣타워 고정", "위생 관리 / 배설물 처리, 환기", "이웃 알레르기 여부 확인 / 사전 소통", "예방접종 및 등록 완료 / 동물보호법 의무"];
const FAQS = [
  { q: "아파트에서 고양이를 키울 수 있나요?", a: "법적으로 금지되지 않아요. 동물보호법에서 반려동물 사육 자체를 금지하지 않아요. 다만 관리규약에서 사육 방법이나 마릿수를 제한할 수 있어요." },
  { q: "관리규약에 사육 금지라고 돼 있으면요?", a: "관리규약의 사육 금지 조항은 법적 강제력이 제한적이에요. 다만 다수 입주민 동의로 만들어진 규약이라 도의적으로 따르는 게 좋아요. 강제 퇴거는 법적으로 어려워요." },
  { q: "이웃이 고양이 때문에 민원을 넣었어요", a: "소음, 악취, 알레르기 등 구체적 피해가 있다면 협의가 필요해요. 피해가 없는 단순 민원이면 사육 자체를 강제로 금지하기 어려워요." },
  { q: "고양이도 등록해야 하나요?", a: "2024년부터 고양이도 동물등록 의무 대상이에요. 12주령 이상 반려묘는 등록해야 해요. 미등록 시 과태료가 부과돼요." },
  { q: "마릿수 제한이 있나요?", a: "법적 마릿수 제한은 없어요. 하지만 관리규약에서 2~3마리로 제한하는 단지가 많아요. 10마리 이상이면 동물학대나 악취 문제로 민원이 생길 수 있어요." },
];
const SOURCES = [{ name: "동물보호법", href: "https://www.law.go.kr/법령/동물보호법" }, { name: "공동주택관리법", href: "https://www.law.go.kr/법령/공동주택관리법" }];
const RELATED = [
  { slug: "아파트-동대표-자격-선출-기준", title: "아파트 동대표 자격", description: "동대표가 될 수 있는 조건." },
  { slug: "공공임대주택-종류-차이", title: "공공임대주택 종류", description: "임대주택 유형별 비교." },
  { slug: "임대인-수리의무", title: "임대인 수리의무", description: "집 고장 시 누가 고치나." },
];
export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주거 · 반려동물 · 아파트 관리</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>아파트에서 고양이 키워도 되나요?<br />사육 규정과 민원 대응</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"관리규약에 사육 금지라는데, 정말 못 키우는 건가요?"</p>
      <p style={body}><a href="https://www.law.go.kr/법령/동물보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>동물보호법</a>에서 반려동물 사육 자체를 금지하지 않아요. 관리규약의 사육 금지 조항은 법적 강제력이 제한적이에요. 다만 소음·악취·위생 문제로 이웃에게 피해를 주면 민사 책임이 생길 수 있으니 주의가 필요해요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>법적으로 키울 수 있나요?</H2>
      <GreenBox title="아파트 반려동물 사육 기준">{"동물보호법: 반려동물 사육 자체 금지 아님\n공동주택관리법: 관리규약에서 사육 방법 제한 가능\n\n관리규약 사육 금지 조항:\n· 법적 강제력 제한적\n· 강제 퇴거 불가\n· 과태료 부과 불가\n· 다만 도의적 협조 권고\n\n2024년~ 고양이 동물등록 의무화\n(12주령 이상 반려묘 등록)"}</GreenBox>
      <CategoryButton label="주거 정보" count={10} href="/category/주거" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>관리규약은 어떤 경우가 있나요?</H2>
      <BorderBox><strong>아파트 관리규약 반려동물 유형</strong>{"\n"}허용형: 사육 허용, 마릿수·크기 제한 (가장 흔함){"\n"}등록형: 관리사무소에 등록 후 사육 가능{"\n"}금지형: 사육 금지 (법적 강제력 제한적){"\n"}무규정: 별도 조항 없음 (사육 가능){"\n"}{"\n"}※ 입주 전 관리규약을 반드시 확인하세요{"\n"}※ 관리규약 변경은 입주민 과반수 동의 필요</BorderBox>
      <Divider />
      <H2>분쟁 예방을 위해 체크하세요</H2>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 동물보호법·공동주택관리법 기준으로 작성했어요. 관리규약은 단지마다 다르니 관리사무소에서 확인해 주세요." />
    </ArticleLayout>
  );
}
