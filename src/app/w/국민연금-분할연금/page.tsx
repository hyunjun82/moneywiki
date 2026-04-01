"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     이혼했거나 이혼을 앞두고 있는데, 결혼 기간 동안 배우자가 낸 국민연금을 나눠 받을 수 있는지 확인하려는 사람
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내가 분할연금 수급 조건에 해당하는지 판단하고, 62세가 되면 국민연금공단에 신청한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     혼인 기간 5년 이상 조건, 수급 연령 62세(단계적 상향), 분할 비율 50% 고정, 신청 서류와 기한(5년 이내), 재혼해도 수급권 유지
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     EligibilityChecker로 조건 체크 + BorderBox로 금액 계산 예시 + Steps로 신청 절차 + DocTable로 필요 서류

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "marriage", label: "혼인 기간이 5년 이상이에요" },
  { id: "age", label: "본인 나이가 62세 이상이에요 (또는 곧 도달)" },
  { id: "exSpouse", label: "전 배우자가 국민연금 노령연금 수급 자격이 있어요" },
  { id: "overlap", label: "혼인 기간 중 전 배우자의 국민연금 가입 기간이 겹쳐요" },
];

const AGE_TABLE = {
  headers: ["출생연도", "분할연금 수급 개시 연령"],
  rows: [
    ["1953~1956년생", "61세"],
    ["1957~1960년생", "62세"],
    ["1961~1964년생", "63세"],
    ["1965~1968년생", "64세"],
    ["1969년생 이후", "65세"],
  ],
};

const DOCS_TABLE = {
  headers: ["서류", "발급처", "비고"],
  rows: [
    ["분할연금 지급 청구서", "국민연금공단", "공단 양식"],
    ["혼인관계증명서 (이혼 사실 기재)", "정부24 / 주민센터", "상세증명서로 발급"],
    ["신분증 사본", "-", "주민등록증 또는 운전면허증"],
    ["통장 사본", "-", "본인 명의 계좌"],
  ],
};

const APPLY_STEPS = [
  { title: "수급 연령 도달 확인", desc: "본인 출생연도에 맞는 수급 개시 연령(62~65세)이 됐는지 확인해요." },
  { title: "서류 준비", desc: "혼인관계증명서(이혼 사실 기재), 신분증, 통장 사본을 준비해요." },
  { title: "국민연금공단에 신청", desc: "공단 홈페이지, 내 곁에 국민연금 앱, 또는 가까운 지사를 방문해서 청구서를 제출해요." },
  { title: "심사 후 지급 개시", desc: "공단에서 심사한 뒤 매월 분할연금이 지급돼요." },
];

const FAQS = [
  { q: "이혼한 지 10년 넘었는데 지금도 신청할 수 있나요?", a: "이혼 시점은 상관없어요. 본인이 수급 연령(62~65세)에 도달하면 그때 신청하면 돼요. 다만 수급권이 생긴 날부터 5년 이내에 신청해야 해요." },
  { q: "분할연금 받으면 전 배우자 연금이 줄어드나요?", a: "네. 분할된 만큼 전 배우자의 연금이 줄어요. 50% 분할이니까 혼인 기간 해당분의 절반이 빠지는 거예요." },
  { q: "재혼해도 분할연금을 계속 받나요?", a: "네. 2016년 법 개정으로 재혼해도 분할연금 수급권이 유지돼요. 전 배우자가 재혼해도 마찬가지예요." },
  { q: "분할 비율을 협의로 바꿀 수 있나요?", a: "안 돼요. 국민연금법에서 50%로 정해놓은 거라 합의해도 비율 변경이 안 돼요. 무조건 반반이에요." },
  { q: "본인도 국민연금을 받고 있는데 분할연금이랑 겹치나요?", a: "겹쳐도 둘 다 받을 수 있어요. 분할연금은 본인 노령연금과 별개로 지급돼요." },
  { q: "사실혼 관계였는데 분할연금 받을 수 있나요?", a: "사실혼도 인정돼요. 다만 주민등록등본, 건강보험 피부양자 기록 등으로 사실혼 관계를 증명해야 해요." },
];

const SOURCES = [
  { name: "국민연금법 제64조(분할연금)", href: "https://www.law.go.kr/법령/국민연금법" },
  { name: "국민연금공단 분할연금 안내", href: "https://www.nps.or.kr" },
  { name: "국민연금공단 콜센터 1355", href: "https://www.nps.or.kr" },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 감액률과 손익분기점", description: "62세 전에 연금을 당겨 받는 조건과 감액 구조." },
  { slug: "국민연금-2026년-개혁-보험료율-소득대체율-변경", title: "2026년 국민연금 개혁안", description: "보험료율·소득대체율 변경 내용 정리." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방식 비교", description: "일시금과 연금 수령의 세금 차이." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 국민연금 · 분할연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 분할연금, 이혼해도 받을 수 있나?<br />
        조건·금액·신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오랜 결혼 생활 끝에 이혼하게 됐는데, 그동안 배우자가 낸 국민연금은 어떻게 되는 걸까요.
      </p>
      <p style={body}>
        나눠 받을 수 있어요. <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법 제64조</a>에 따라{" "}
        <strong>혼인 기간 5년 이상</strong>이면 전 배우자 연금의 일부를 분할해서 받을 수 있어요. 이걸 <strong>분할연금</strong>이라고 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 조건 체크 */}
      <H2>분할연금 받을 수 있는 조건</H2>
      <p style={body}>
        아래 조건을 모두 충족해야 분할연금을 신청할 수 있어요. 체크해보세요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="모든 조건에 해당돼요. 수급 연령이 되면 국민연금공단에 신청할 수 있어요."
        partialMatchText="일부 조건이 충족됐어요. 나머지 조건도 확인해보세요."
      />

      <p style={body}>
        여기서 &lsquo;혼인 기간&rsquo;은 국민연금 가입 기간과 겹치는 기간이에요. 결혼은 30년 했어도 배우자가 국민연금을 15년만 냈다면 분할 대상 기간은 15년이에요. 사실혼 기간도 증명하면 인정돼요.
      </p>

      <CategoryButton label="연금 정보" count={8} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 수급 연령 */}
      <H2>몇 살부터 분할연금을 받나요?</H2>
      <p style={body}>
        노령연금 수급 개시 연령과 같아요. 출생연도에 따라 다르고, 2033년까지 단계적으로 65세로 올라가요.
      </p>

      <SectionBadge>출생연도별 수급 개시 연령</SectionBadge>
      <DocTable headers={AGE_TABLE.headers} rows={AGE_TABLE.rows} />

      <p style={body}>
        이혼한 시점은 상관없어요. 20대에 이혼했더라도 수급 연령이 되면 신청할 수 있어요. 다만 <strong>수급권이 생긴 날부터 5년 이내</strong>에 신청해야 하니까 잊지 마세요.
      </p>

      <Divider />

      {/* H2-3: 금액 계산 */}
      <H2>분할연금 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        혼인 기간에 해당하는 연금의 <strong>50%</strong>를 받아요. 비율은 법으로 고정돼 있어서 협의로 바꿀 수 없어요.
      </p>

      <BorderBox>
        <strong>분할연금 계산 예시</strong><br />
        전 배우자 노령연금: 월 150만원<br />
        국민연금 가입 기간: 30년, 혼인 기간: 20년<br />
        혼인 기간 비율: 20년 / 30년 = 66.7%<br />
        혼인 기간 해당 연금: 150만원 x 66.7% = 100만원<br />
        분할연금: 100만원 x 50% = <strong>월 50만원</strong>
      </BorderBox>

      <p style={body}>
        전 배우자의 연금은 150만원에서 50만원이 빠져 100만원으로 줄어요. 분할연금도 <strong>물가상승률에 따라 매년 인상</strong>되니까 처음 받는 금액에서 고정되지 않아요.
      </p>

      <Divider />

      {/* H2-4: 신청 절차 */}
      <H2>분할연금 신청은 어떻게 하나요?</H2>
      <p style={body}>
        수급 연령이 되면 <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>에 직접 신청해요. 온라인, 앱, 방문, 우편 모두 가능해요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable headers={DOCS_TABLE.headers} rows={DOCS_TABLE.rows} />

      <p style={body}>
        사실혼이었다면 주민등록등본, 건강보험 자격득실확인서 등 추가 증빙이 필요해요. 궁금한 점은 국민연금공단 콜센터(<strong>1355</strong>)에서 상담받을 수 있어요.
      </p>

      <Divider />

      {/* H2-5: 주의사항 */}
      <H2>꼭 알아둘 주의사항</H2>

      <GreenBox>
        본인 노령연금과 중복 수령 가능{"\n"}
        전 배우자 사망해도 계속 받아요{"\n"}
        본인이 재혼해도 수급권 유지 (2016년 법 개정){"\n"}
        분할 비율은 50%로 고정, 협의 변경 불가{"\n"}
        수급권 발생일로부터 5년 이내 신청 필수
      </GreenBox>

      <Divider />

      {/* FAQ */}
      <H2>분할연금, 이런 상황은 어떻게 되나요?</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민연금법과 국민연금공단 안내를 바탕으로 작성했어요. 수급 연령과 제도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국민연금공단(1355)에서 확인해보세요." />
    </ArticleLayout>
  );
}
