"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 부모님, 자녀, 배우자를 부양하는데 공제를 얼마나 받을 수 있는지 궁금한 직장인
// Q2. 부양가족별 나이·소득 요건을 확인하고, 공제 대상을 빠짐없이 등록한다
// Q3. 1인당 150만원 소득공제, 나이요건(부모 60세+, 자녀 20세-), 소득요건(100만원 이하/총급여 500만원 이하), 추가공제
// Q4. DocTable(가족별 요건표) + EligibilityChecker(요건 체크) + GreenBox(공제 금액) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const FAMILY_TABLE = {
  headers: ["관계", "나이 요건", "소득 요건", "동거 요건"],
  rows: [
    ["배우자", "제한 없음", "연 소득금액 100만원 이하", "별거 가능"],
    ["직계존속 (부모님)", "만 60세 이상", "연 소득금액 100만원 이하", "별거 가능 (실제 부양)"],
    ["직계비속 (자녀)", "만 20세 이하", "연 소득금액 100만원 이하", "별거 가능"],
    ["형제자매", "만 20세 이하 또는 60세 이상", "연 소득금액 100만원 이하", "동거 필요 (일시적 별거 인정)"],
    ["장애인", "나이 제한 없음", "연 소득금액 100만원 이하", "별거 가능"],
  ],
};

const ELIGIBILITY = [
  { id: "relation", label: "배우자, 부모님, 자녀, 형제자매 중 해당하는 가족이 있다" },
  { id: "age", label: "나이 요건을 충족한다 (부모 60세+, 자녀 20세-)" },
  { id: "income", label: "해당 가족의 연간 소득금액이 100만원 이하다" },
  { id: "support", label: "실제로 부양하고 있다 (생활비, 송금 등)" },
];

const FAQS = [
  { q: "부양가족 1명당 실제로 얼마 돌려받나요?", a: "1인당 150만원 소득공제라서, 세율 15%면 약 22만원, 세율 24%면 약 36만원을 돌려받아요. 세율이 높을수록 환급 효과가 커요." },
  { q: "따로 사는 부모님도 공제되나요?", a: "네, 별거해도 실제로 부양하면 공제돼요. 매달 송금한 내역, 의료비 지출 내역 등이 증빙이 될 수 있어요." },
  { q: "맞벌이 부부가 같은 자녀를 둘 다 공제받을 수 있나요?", a: "안 돼요. 한 명의 부양가족은 부부 중 1명만 공제받을 수 있어요. 소득이 높은 쪽에 몰면 유리해요." },
  { q: "부모님이 국민연금을 받고 있으면 안 되나요?", a: "연금소득만 있고 연간 소득금액이 100만원 이하면 공제돼요. 공적연금 수령액이 연 516만원 이하면 소득금액 100만원 이하가 돼요." },
  { q: "자녀가 대학생인데 공제 대상인가요?", a: "만 20세 이하여야 기본공제 대상이에요. 만 21세 이상이면 나이 요건을 충족하지 못해요. 다만 교육비 세액공제는 별도로 받을 수 있어요." },
  { q: "추가공제는 뭔가요?", a: "기본공제 대상자 중 경로우대(70세 이상, 100만원), 장애인(200만원), 부녀자(50만원), 한부모(100만원) 해당 시 추가로 공제받아요." },
  { q: "형제자매도 공제 가능한가요?", a: "만 20세 이하 또는 만 60세 이상이고 소득·동거 요건을 충족하면 가능해요. 일시적 별거(학업, 취업)는 동거로 인정돼요." },
];

const SOURCES = [
  { name: "국세청 인적공제 안내", href: "https://www.nts.go.kr" },
  { name: "소득세법 제50조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도 비교." },
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산 방법." },
  { slug: "연말정산-공무원", title: "공무원 연말정산", description: "공무원연금 기여금 공제와 차이점." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 부양가족</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부양가족 공제, 누가 대상이고 얼마 받을까?<br />
        가족별 나이·소득 요건과 공제 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님 생활비도 드리고, 자녀 교육비도 내고 있다면 연말정산에서 부양가족 공제를 받을 수 있어요. 1인당 150만원 소득공제라 세율에 따라 22만~36만원 정도를 돌려받게 돼요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제50조</a>에서 정한 나이와 소득 요건을 모두 충족해야 공제 대상이에요. 가족 관계에 따라 조건이 달라요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 가족이 공제 대상인지 체크</H2>
      <p style={body}>
        아래 네 가지 조건을 모두 충족해야 부양가족 기본공제를 받을 수 있어요.
      </p>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="공제 대상이 될 가능성이 높아요. 세부 요건을 아래 표에서 확인해보세요."
        partialMatchText="요건이 부족하면 기본공제를 받을 수 없어요."
      />

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가족 관계별 공제 요건</H2>
      <p style={body}>
        관계에 따라 나이, 소득, 동거 요건이 달라요. 아래 표에서 해당하는 가족의 요건을 확인해보세요.
      </p>
      <SectionBadge>부양가족 기본공제 요건 (2025년 귀속)</SectionBadge>
      <DocTable headers={FAMILY_TABLE.headers} rows={FAMILY_TABLE.rows} />

      <p style={body}>
        소득 요건에서 "연 소득금액 100만원 이하"란 총수입이 아니라 필요경비를 뺀 소득금액이에요. 근로소득만 있으면 총급여 500만원 이하가 기준이에요.
      </p>

      <Divider />

      <H2>추가공제로 더 받을 수 있어요</H2>
      <p style={body}>
        기본공제(150만원) 대상자 중 아래 조건에 해당하면 추가 공제가 붙어요.
      </p>

      <GreenBox>
        경로우대: 만 70세 이상 → 100만원 추가{"\n"}
        장애인: 200만원 추가 (나이 제한 없음){"\n"}
        부녀자: 근로소득 3,000만원 이하 + 배우자 없는 여성 세대주 → 50만원{"\n"}
        한부모: 배우자 없이 직계비속 부양 → 100만원 (부녀자와 중복 불가)
      </GreenBox>

      <p style={body}>
        예를 들어 만 75세 부모님 2분을 부양하면 기본공제 300만원(150만x2) + 경로우대 200만원(100만x2) = 총 500만원 소득공제예요.
      </p>

      <Divider />

      <H2>부양가족 공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 소득세법 제50조~제51조를 기준으로 작성했어요. 공제 요건과 금액은 법 개정에 따라 달라질 수 있으니 국세청(126)이나 홈택스에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
