"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 공무원이라 연말정산이 일반 회사원이랑 다른지 궁금한 상태
// Q2. 공무원도 일반 직장인과 동일하게 연말정산한다는 것을 확인하고 공무원연금 기여금 공제 방식을 이해한다
// Q3. 공무원연금 기여금 전액 소득공제, 나머지 공제항목은 동일, 2월 소속기관에서 처리, 간소화서비스 이용 가능
// Q4. GreenBox(핵심 차이) + BorderBox(공무원연금 구조) + Checklist(챙겨야 할 공제) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "공무원연금 기여금 전액 소득공제 반영됐는지 확인",
  "신용카드·체크카드 사용액 간소화 자료 확인",
  "의료비·교육비 간소화 자료 누락 여부 확인",
  "부양가족 등록 및 소득 요건 충족 여부 확인",
  "기부금 영수증 별도 제출 필요한지 확인",
  "주택자금(전세대출 원리금, 월세) 공제 대상인지 확인",
];

const FAQS = [
  { q: "공무원도 연말정산을 해야 하나요?", a: "네, 일반 직장인과 똑같이 매년 2월에 연말정산을 해요. 소속 기관에서 처리하고, 홈택스 간소화서비스도 동일하게 이용 가능해요." },
  { q: "공무원연금 기여금은 얼마나 공제되나요?", a: "기여금 전액이 소득공제돼요. 2025년 기준 기여금율은 기준소득월액의 9%예요. 일반 직장인의 국민연금(4.5%)보다 높은 대신 전액 공제받아요." },
  { q: "공무원만의 특별한 공제가 있나요?", a: "공무원연금 기여금이 국민연금 대신 적용되는 것 외에는 차이가 없어요. 신용카드, 의료비, 교육비, 주택자금 공제 등 모든 항목이 일반 직장인과 동일해요." },
  { q: "교사인데 연말정산이 달라지나요?", a: "공립학교 교사는 공무원이니까 공무원연금이 적용돼요. 사립학교 교사는 사학연금이 적용되는데, 공제 방식은 거의 동일해요." },
  { q: "공무원연금과 국민연금을 둘 다 낼 수 있나요?", a: "공무원이면 국민연금 대신 공무원연금에 가입해요. 동시에 납부하는 건 아니에요. 과거 국민연금 가입 이력이 있으면 연계연금 제도로 연결할 수 있어요." },
  { q: "퇴직 후 받는 공무원연금도 공제되나요?", a: "퇴직 후 받는 연금은 연금소득이에요. 연말정산이 아니라 5월 종합소득세 신고 대상이 될 수 있어요." },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "공무원연금공단", href: "https://www.geps.or.kr" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도와 조건." },
  { slug: "연말정산-부양가족-공제", title: "연말정산 부양가족 공제", description: "가족 1명당 150만원 소득공제 조건." },
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 공무원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공무원 연말정산, 뭐가 다를까?<br />
        공무원연금 기여금 공제와 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "공무원도 연말정산 하나요? 회사원이랑 다른 게 있나요?" 결론부터 말하면, 공무원도 일반 직장인과 동일하게 연말정산을 해요.
      </p>
      <p style={body}>
        차이는 딱 하나예요. 국민연금 대신 공무원연금 기여금을 내고, 그 기여금 전액이 소득공제돼요. 나머지 공제항목은 일반 직장인과 완전히 똑같아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공무원 vs 일반 직장인, 차이는 이것뿐</H2>
      <p style={body}>
        공무원 연말정산에서 일반 직장인과 다른 점은 연금 공제 하나뿐이에요.
      </p>

      <GreenBox>
        일반 직장인: 국민연금 보험료(기준소득월액 4.5%) → 전액 소득공제{"\n"}
        공무원: 공무원연금 기여금(기준소득월액 9%) → 전액 소득공제{"\n"}
        그 외 공제항목(신용카드, 의료비, 교육비 등)은 100% 동일
      </GreenBox>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에서 공무원연금 기여금도 국민연금과 동일하게 공적연금 보험료 공제로 분류해요. 기여금율이 국민연금보다 높은 만큼 소득공제 금액도 더 크죠.
      </p>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공무원연금 기여금 공제는 얼마나 되나요?</H2>
      <p style={body}>
        공무원연금 기여금율은 기준소득월액의 9%예요. 이 금액이 전액 소득공제돼요.
      </p>

      <BorderBox>
        <strong>공무원연금 기여금 공제 예시</strong><br />
        기준소득월액 400만원 → 월 기여금 36만원 → 연 432만원 소득공제{"\n"}
        기준소득월액 500만원 → 월 기여금 45만원 → 연 540만원 소득공제{"\n"}
        (일반 직장인 국민연금: 월 22.5만원~25만원 수준)
      </BorderBox>

      <p style={body}>
        기여금 공제는 별도 신청 없이 자동 반영돼요. 원천징수영수증의 공적연금 보험료 란에서 확인할 수 있어요.
      </p>

      <Divider />

      <H2>공무원이 챙겨야 할 공제 체크리스트</H2>
      <p style={body}>
        공무원연금 외 나머지 공제는 직접 챙겨야 해요. 간소화 서비스에서 자동 수집되는 것도 있지만 누락되는 항목이 있을 수 있어요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>공무원 연말정산, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 공무원연금 기여금율은 변경될 수 있으니 공무원연금공단(1588-4321)에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
