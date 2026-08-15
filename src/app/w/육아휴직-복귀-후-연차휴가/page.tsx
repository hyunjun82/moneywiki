"use client";
// Q1. 육아휴직에서 복귀하는데 연차가 어떻게 되는지 궁금한 상황
// Q2. 복귀 후 사용 가능한 연차 일수를 확인하고, 회사에 권리를 주장한다
// Q3. 육아휴직 기간 출근 간주, 연차 발생 기준, 복귀 후 즉시 사용 가능 여부, 회사 제한 불가
// Q4. GreenBox(핵심 기준) + BorderBox(계산 예시) + DocTable(상황별 연차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SCENARIO_TABLE = {
  headers: ["상황", "연차 발생", "비고"],
  rows: [
    ["1년 육아휴직 후 복귀", "15일 발생", "80% 출근율 충족 (출근 간주)"],
    ["6개월 육아휴직 후 복귀", "15일 발생", "전체 근무 기간 기준"],
    ["연도 중 복귀 (중도)", "비례 발생 가능", "입사일 기준 계산"],
    ["육아휴직 중", "사용 불가 (발생은 됨)", "복귀 후 사용"],
  ],
};

const FAQS = [
  { q: "육아휴직 1년 다녀와도 연차 15일 다 받나요?", a: "네. 근로기준법에 따라 육아휴직 기간은 출근으로 간주돼요. 80% 출근율을 자동 충족하니 연차 15일이 모두 발생해요." },
  { q: "회사에서 육아휴직 다녀왔다고 연차를 깎으면요?", a: "위법이에요. 남녀고용평등법에 따라 육아휴직을 이유로 불리한 처우를 하면 안 돼요. 고용노동부(1350)에 신고할 수 있어요." },
  { q: "복귀 즉시 연차를 사용할 수 있나요?", a: "네. 복귀 첫날부터 연차를 사용할 수 있어요. 회사가 복귀 후 일정 기간 근무를 요구하는 건 법적 근거가 없어요." },
  { q: "전년도 미사용 연차도 남아 있나요?", a: "회사가 연차 사용 촉진을 하지 않았다면, 전년도 미사용 연차는 수당으로 지급되거나 이월돼요. 촉진 절차를 밟았으면 소멸될 수 있어요." },
  { q: "육아휴직 중에 연차수당을 받을 수 있나요?", a: "아니에요. 연차는 발생하지만 실제 사용은 복귀 후에만 가능해요. 휴직 중 연차수당 청구는 안 돼요." },
  { q: "출산휴가와 육아휴직을 연달아 쓰면요?", a: "출산휴가 기간도 출근으로 간주돼요. 출산휴가+육아휴직을 합쳐서 1년이 넘더라도 연차는 정상 발생해요." },
];

const SOURCES = [
  { name: "근로기준법 제60조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "남녀고용평등법 제19조", href: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
];

const RELATED = [
  { slug: "육아기-근로시간-단축-정규직-대우", title: "육아기 근로시간 단축", description: "근로시간 단축 시 정규직 대우 기준." },
  { slug: "경조휴가-부여기준", title: "경조휴가 부여 기준", description: "결혼·출산·사망 등 경조휴가 일수." },
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 근로자 무기계약 전환", description: "2년 초과 시 무기계약 전환." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 육아휴직 · 연차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아휴직 복귀 후 연차, 몇 일 받을 수 있나?<br />
        출근 간주와 사용 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>육아휴직 1년 다녀왔는데, 연차가 깎이는 건 아닌지 걱정되죠.</p>
      <p style={body}><a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>에 따라 육아휴직 기간은 출근한 것으로 간주돼요. 1년 쉬고 와도 연차 15일이 모두 발생하고, 복귀 첫날부터 사용할 수 있어요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>육아휴직 기간은 출근으로 봐요</H2>
      <p style={body}>핵심부터 짚어볼게요.</p>
      <GreenBox title="육아휴직과 연차 핵심">
        육아휴직 기간 = 출근으로 간주{"\n"}
        80% 출근율 자동 충족 → 연차 15일 전부 발생{"\n"}
        복귀 즉시 사용 가능 (회사 제한 불가){"\n"}
        육아휴직 이유로 연차 감소 = 위법 (남녀고용평등법)
      </GreenBox>

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>상황별 연차 발생 일수</H2>
      <p style={body}>육아휴직 기간에 따라 연차가 어떻게 되는지 정리했어요.</p>
      <SectionBadge>상황별 연차 발생</SectionBadge>
      <DocTable headers={SCENARIO_TABLE.headers} rows={SCENARIO_TABLE.rows} />
      <Divider />

      <H2>회사가 연차를 제한하면 어떻게 하나요?</H2>
      <p style={body}>육아휴직을 이유로 불이익을 주는 건 위법이에요.</p>
      <BorderBox>
        <strong>회사의 위법 행위 예시</strong><br />
        육아휴직 다녀왔다고 연차 일수 감소 → 위법{"\n"}<br />
        복귀 후 일정 기간 근무해야 연차 사용 가능이라고 함 → 법적 근거 없음{"\n"}<br />
        연차 사용을 불허하면서 수당도 안 줌 → 근로기준법 위반{"\n"}<br />
        대응: 고용노동부(1350) 상담 또는 진정
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>육아휴직과 연차에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 남녀고용평등법을 바탕으로 작성했어요. 개별 회사의 취업규칙에 따라 연차 운영이 다를 수 있으니, 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
