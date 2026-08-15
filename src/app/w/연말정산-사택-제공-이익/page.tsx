"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     회사에서 사택이나 기숙사를 제공받는데 이게 세금이 붙는 건지, 비과세 조건은 뭔지 궁금한 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     본인 사택이 비과세 조건에 해당하는지 판단하고, 과세 시 금액을 파악한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     비과세 2가지 조건(소형주택 85㎡+3억, 직무필요), 과세 금액 계산(시가-부담액), 기숙사 동일 적용, 급여명세서 확인
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 비과세 조건 요약 + DocTable로 과세/비과세 비교 + BorderBox로 계산 예시 + Checklist로 확인사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_TABLE = {
  headers: ["구분", "과세 여부", "조건"],
  rows: [
    ["소형주택 사택", "비과세", "전용면적 85㎡ 이하 + 기준시가 3억원 이하"],
    ["직무상 필요 숙소", "비과세", "경비원 숙직실, 원격지 현장 숙소 등"],
    ["대형·고가 사택", "과세", "85㎡ 초과 또는 기준시가 3억 초과"],
    ["무상 제공", "과세", "월세 시가 전액이 근로소득"],
    ["저가 제공", "과세", "시가 - 본인 부담액 = 과세분"],
    ["기숙사", "사택과 동일", "위 조건 동일 적용"],
  ],
};

const CHECK_LIST = [
  "사택 전용면적이 85㎡ 이하인지 확인",
  "기준시가가 3억원 이하인지 확인 (국토부 공시가격 기준)",
  "급여명세서에 사택 이익이 과세/비과세로 구분되어 있는지 확인",
  "저가 제공 시 본인 부담액과 시가 차이 계산",
  "원천징수영수증에 비과세 반영 여부 확인",
];

const FAQS = [
  { q: "기숙사도 사택과 같은 규정인가요?", a: "네. 독신자 기숙사, 가족 사택 구분 없이 동일한 비과세 기준이 적용돼요." },
  { q: "사택 비과세 조건 두 가지를 모두 충족해야 하나요?", a: "소형주택 조건은 면적과 가격 둘 다 충족해야 해요. 하나라도 초과하면 과세 대상이에요." },
  { q: "회사가 월세를 대신 내주는 것도 사택인가요?", a: "네. 회사가 직접 임차해서 제공하거나 월세를 대납하는 것 모두 사택 제공 이익에 해당해요." },
  { q: "비과세 사택인데 급여에 과세 처리됐어요", a: "회사 담당자에게 소형주택 비과세 요건을 알려주고 수정 요청하세요. 이미 지나간 연도는 경정청구로 돌려받을 수 있어요." },
  { q: "사택 이익에 대한 세금이 얼마나 되나요?", a: "월세 시가가 100만원이면 연간 1,200만원이 근로소득에 추가돼요. 세율 15%라면 연간 약 180만원 세금이 더 나오는 셈이에요." },
];

const SOURCES = [
  { name: "소득세법 시행령 제12조 (비과세 근로소득)", href: "https://www.law.go.kr/법령/소득세법시행령" },
  { name: "국세청 비과세 근로소득 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연말정산-급여", title: "연말정산 급여와 총급여", description: "급여 구성과 비과세 항목 정리." },
  { slug: "연말정산-식대-비과세", title: "연말정산 식대 비과세", description: "월 20만원 비과세 적용 조건." },
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "과세표준별 세율 6~45% 확인." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 사택 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 사택, 세금을 내야 할까?<br />
        비과세 조건과 과세 금액 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 사택이나 기숙사를 제공받는데, 이게 과세인지 비과세인지 모르겠죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제12조</a>에 따르면 전용면적 <strong>85㎡ 이하 + 기준시가 3억원 이하</strong>인 소형주택이면 비과세예요. 조건에 안 맞으면 월세 시가만큼 근로소득에 더해져서 세금이 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>비과세 받으려면 이 조건을 충족해야 해요</H2>
      <p style={body}>
        사택 비과세는 크게 두 가지 경로가 있어요. 소형주택 조건을 충족하거나, 직무상 반드시 필요한 경우예요.
      </p>

      <GreenBox>
        소형주택 비과세: 전용면적 85㎡ 이하 + 기준시가 3억원 이하{"\n"}
        직무필요 비과세: 경비원 숙직실, 광산 숙소, 원격지 현장 숙소{"\n\n"}
        둘 중 하나만 충족하면 비과세예요
      </GreenBox>

      <p style={body}>
        소형주택 조건은 면적과 가격 두 가지를 모두 충족해야 해요. 85㎡ 이하인데 기준시가가 3억을 넘으면 과세 대상이에요.
      </p>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>과세 vs 비과세, 내 경우는 어디에 해당되나요?</H2>
      <p style={body}>
        사택 유형별로 과세 여부가 다르니 아래 표에서 확인해보세요.
      </p>

      <SectionBadge>사택 유형별 과세 여부</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <Divider />

      <H2>과세 금액은 어떻게 계산하나요?</H2>
      <p style={body}>
        비과세 조건에 해당하지 않으면 월세 시가를 기준으로 근로소득에 더해져요. 무상이냐 저가냐에 따라 계산이 달라요.
      </p>

      <BorderBox>
        <strong>무상 제공 시</strong>: 월세 시가 전액이 과세{"\n"}
        예) 월세 시가 100만원 → 연간 1,200만원 근로소득 추가{"\n\n"}
        <strong>저가 제공 시</strong>: 시가 - 본인 부담액 = 과세분{"\n"}
        예) 시가 150만원 - 부담액 50만원 = 매월 100만원 과세 → 연 1,200만원
      </BorderBox>

      <p style={body}>
        세율 15% 구간이라면 1,200만원 x 15% = 연 180만원 세금이 추가되는 셈이에요. 사택이 비과세 조건에 해당하는지 꼭 확인하세요.
      </p>

      <Divider />

      <H2>이것만은 확인하세요</H2>
      <p style={body}>
        사택 비과세 해당 여부는 회사와 본인 모두 정확히 알고 있어야 해요. 놓치면 세금을 더 내는 거니까요.
      </p>

      <Checklist items={CHECK_LIST} />

      <Divider />

      <H2>사택 제공 이익, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법 시행령과 국세청 안내를 바탕으로 작성했어요. 비과세 기준은 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)에서 확인해보세요." />
    </ArticleLayout>
  );
}
