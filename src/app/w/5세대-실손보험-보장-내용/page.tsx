"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 5세대 실손보험이 기존과 뭐가 달라지는지, 보장 범위가 궁금한 상황
// Q2. 5세대 보장 변경 내용을 파악하고, 기존 보험 유지·전환 여부를 판단한다
// Q3. 비급여 자기부담률 50%, 도수치료 제외, 중증질환 상한 500만원, 보험료 변동
// Q4. DocTable(보장 변경 비교) + GreenBox(핵심 변경) + BorderBox(제외 항목) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_TABLE = {
  headers: ["항목", "4세대", "5세대", "변경 방향"],
  rows: [
    ["비급여 자기부담률", "30%", "50%", "상향"],
    ["도수치료·체외충격파", "보장", "제외", "축소"],
    ["비급여 주사치료", "보장", "제외", "축소"],
    ["중증질환 입원 상한", "없음", "연 500만원", "신설 (보호 강화)"],
    ["보험료 수준", "기준", "30~50% 인하", "인하"],
    ["재가입 주기", "5년", "5년", "동일"],
  ],
};

const FAQS = [
  { q: "비급여 자기부담률이 50%면 부담이 커지는 거 아닌가요?", a: "비급여 치료를 자주 받으면 부담이 커지지만, 보험료가 30~50% 저렴해져요. 병원을 자주 안 가는 분들은 전체 비용이 줄어들 수 있어요." },
  { q: "도수치료가 왜 제외됐나요?", a: "도수치료·체외충격파·비급여 주사는 실손보험 보험금 청구의 상당 부분을 차지해서 보험료 인상의 주요 원인이었어요. 이를 제외해서 보험료를 낮추는 방향으로 개편됐어요." },
  { q: "중증질환 상한 500만원이 뭔가요?", a: "암·심장·뇌혈관 등 중증질환으로 입원하면 비급여 자기부담 상한이 연 500만원이에요. 500만원 넘는 비급여 비용은 보험사가 전액 부담해요. 중증질환자 보호를 강화한 거예요." },
  { q: "4세대에서 5세대로 바꿔야 하나요?", a: "병원을 자주 안 가고 보험료 절약이 중요하면 5세대가 유리해요. 도수치료 등 비급여 치료를 자주 받으면 4세대 유지가 나을 수 있어요. <a href='/w/5세대-실손보험-가입-조건' style='color:#1D9E75;text-decoration:underline'>가입 조건</a>도 확인해보세요." },
  { q: "급여 항목 보장은 달라지나요?", a: "급여(건강보험 적용) 항목 보장은 큰 차이가 없어요. 자기부담률도 동일해요. 변경은 주로 비급여 쪽이에요." },
  { q: "5세대 보험료가 정말 30~50% 싸나요?", a: "금융위원회 발표 기준이에요. 실제 보험료는 보험사·나이·성별에 따라 다르지만, 4세대 대비 상당히 낮아질 전망이에요." },
];

const SOURCES = [
  { name: "금융위원회 5세대 실손보험 개편안", href: "https://www.fsc.go.kr/no010101/84272" },
  { name: "금융감독원 실손보험 안내", href: "https://www.fss.or.kr" },
];

const RELATED = [
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 가입 조건", description: "신규 가입·전환 대상 구분 방법." },
  { slug: "5세대-실손보험-청구-방법", title: "5세대 실손보험 청구 방법", description: "보험금 청구 절차와 서류." },
  { slug: "5세대-실손보험-보험료-비교", title: "5세대 실손보험 보험료 비교", description: "보험사별 보험료 차이." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 5세대 실손 · 보장</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험, 보장이 어떻게 바뀌나?<br />
        비급여 자기부담률과 제외 항목
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>5세대 실손보험이 나온다는데, 보장이 줄어드는 건 아닌지 걱정되죠.</p>
      <p style={body}>핵심은 비급여 자기부담률이 30%에서 50%로 오르고, 도수치료·비급여 주사가 제외된 대신 보험료가 30~50% 싸지는 거예요. <a href="https://www.fsc.go.kr/no010101/84272" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a>가 2026년 4월 출시를 예고했어요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>4세대 vs 5세대 보장 비교</H2>
      <p style={body}>주요 변경 항목을 비교했어요.</p>
      <SectionBadge>4세대·5세대 보장 비교</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <CategoryButton label="보험 정보" count={8} href="/category/보험" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>빠진 보장과 새로 생긴 보장</H2>
      <p style={body}>줄어든 것만 있는 게 아니라, 중증질환자 보호가 강화됐어요.</p>
      <GreenBox title="5세대 핵심 변경">
        빠진 것: 도수치료·체외충격파·비급여 주사{"\n"}
        새로 생긴 것: 중증질환 입원 비급여 상한 연 500만원{"\n"}
        보험료: 30~50% 인하{"\n"}
        급여 항목: 변동 없음
      </GreenBox>
      <Divider />

      <H2>보장 제외 항목 상세</H2>
      <p style={body}>어떤 치료가 빠지는지 구체적으로 봐야 판단할 수 있어요.</p>
      <BorderBox>
        <strong>5세대에서 제외되는 비급여 치료</strong><br />
        도수치료 (근골격계 수기 치료){"\n"}<br />
        체외충격파 치료{"\n"}<br />
        비급여 주사 (프롤로 주사, 인대강화주사 등){"\n"}<br />
        비중증 MRI 보장 한도 축소
      </BorderBox>
      <p style={body}>이 치료들을 자주 받는다면 전환 전에 연간 비용을 계산해보세요. 보험료 절약분과 자기부담 증가분을 비교해야 해요.</p>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>5세대 실손 보장에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 실손보험 개편안을 바탕으로 작성했어요. 세부 보장 내용은 출시 시점에 변경될 수 있으니 금융위원회(fsc.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
