"use client";

// Q1. 노후에 집은 있는데 현금이 없어서 주택연금 가입 조건과 수령액이 궁금한 상황
// Q2. 가입 조건 확인(55세+, 9억 이하) → 수령액 계산 → 신청 절차 진행
// Q3. 가입 조건(55세, 주택가격), 수령액 기준, 신청 절차, 장단점, 상속 문제
// Q4. GreenBox(가입 조건) + EligibilityChecker(자격 체크) + Steps(신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "부부 중 1명 이상이 만 55세 이상이다" },
  { id: "c2", label: "보유 주택의 공시가격이 9억원 이하이다" },
  { id: "c3", label: "주택을 소유하고 있다 (부부 기준 1주택)" },
  { id: "c4", label: "해당 주택에 거주 중이다" },
];

const STEPS = [
  { title: "한국주택금융공사 상담", desc: "공사 홈페이지 또는 지사를 방문해서 예상 수령액을 확인해요. 전화(1688-8114)로도 상담 가능해요." },
  { title: "가입 신청", desc: "신분증, 등기부등본, 주민등록등본 등을 지참하고 지사에 방문 신청해요.", tip: "배우자 동의서 필수" },
  { title: "주택감정 및 심사", desc: "공사가 주택 감정평가를 실시하고 가입 적격 여부를 심사해요. 약 2~3주 소요." },
  { title: "근저당 설정 및 연금 수령", desc: "주택에 근저당을 설정하고 매월 연금이 입금돼요. 평생 지급이에요." },
];

const FAQS = [
  { q: "주택연금 받으면 집을 못 파나요?", a: "주택연금 가입 중에는 매각이 제한돼요. 해지 후 매각하거나, 이전 대상 주택을 변경할 수 있어요." },
  { q: "부부 모두 사망하면 집은 어떻게 되나요?", a: "연금 수령 총액이 집값보다 적으면 차액은 상속인에게 돌아가요. 집값보다 많이 받았어도 상속인에게 추가 청구하지 않아요." },
  { q: "9억 초과 주택은 가입이 안 되나요?", a: "공시가격 9억 원 초과 주택은 가입할 수 없어요. 시가가 아닌 공시가격 기준이에요." },
  { q: "2주택자도 가입 가능한가요?", a: "부부 합산 2주택이어도 합산 공시가격이 9억 원 이하이면 가입 가능해요. 3년 이내에 1주택으로 처분해야 해요." },
  { q: "매월 얼마나 받을 수 있나요?", a: "집값과 가입 나이에 따라 달라요. 예를 들어 3억 원 주택, 70세 가입 시 월 약 90만 원 정도예요. 공사 홈페이지에서 모의계산이 가능해요." },
  { q: "주택연금 받다가 중도 해지할 수 있나요?", a: "가능해요. 그동안 받은 연금과 보증료를 일시 반환하면 근저당이 해제돼요." },
];

const REFERENCES = [
  { category: "기관", items: [
    { label: "한국주택금융공사 주택연금", url: "https://www.hf.go.kr" },
    { label: "주택연금 수령액 계산기", url: "https://www.hf.go.kr/hf/sub03/sub01.do" },
  ]},
  { category: "법령", items: [{ label: "한국주택금융공사법", url: "https://www.law.go.kr/법령/한국주택금융공사법" }] },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 일시금 vs 연금", description: "퇴직연금 수령 방식 비교예요." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령", description: "국민연금 조기수령 감액률이에요." },
  { slug: "퇴직연금-조회", title: "퇴직연금 조회 방법", description: "퇴직연금 잔액 조회 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제 · 연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집은 있는데 현금이 없다면?<br />
        주택연금 가입 조건과 수령액 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은퇴 후 집은 있는데 생활비가 부족한 상황이라면 주택연금을 고려해볼 수 있어요.
        만 55세 이상, 공시가격 9억 원 이하 주택 소유자가 가입할 수 있고, 평생 매월 연금을 받아요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>가입 조건부터 확인하세요</H2>
      <p style={body}>주택연금은 누구나 가입할 수 있는 게 아니에요. 나이, 주택가격, 주택 수 조건이 있어요.</p>
      <GreenBox>
        <strong>가입 조건 4가지</strong><br /><br />
        ① 부부 중 1명 이상 만 55세 이상<br />
        ② 주택 공시가격 9억원 이하 (시가 아닌 공시가격)<br />
        ③ 부부 기준 1주택 (2주택은 합산 9억 이하 + 3년 내 처분)<br />
        ④ 해당 주택에 실거주<br /><br />
        ★ 오피스텔은 주거용으로 등록된 경우만 가능
      </GreenBox>

      <H2>내가 가입할 수 있는지 체크해보세요</H2>
      <p style={body}>모두 해당되면 가입 가능해요.</p>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="주택연금 가입 가능해요! 한국주택금융공사에 상담받아보세요." partialMatchText="일부 미충족 항목이 있어요. 공사에 개별 상담을 받아보세요." />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>상담부터 연금 수령까지 약 1개월 정도 걸려요.</p>
      <Steps steps={STEPS} />

      <H2>알아두면 좋은 것들</H2>
      <p style={body}>가입 전에 장단점을 파악하세요.</p>
      <BorderBox>
        <strong>장점</strong><br />
        평생 연금 보장 (사망 시까지)<br />
        집값이 떨어져도 연금 감액 없음<br />
        연금 수령 총액이 집값 초과해도 상속인 추가 부담 없음<br /><br />
        <strong>단점</strong><br />
        가입 중 주택 매각·임대 제한<br />
        초기 보증료 + 연 보증료 부담<br />
        해지 시 수령 연금 + 이자 일시 반환 필요<br /><br />
        ★ 국민연금 + 주택연금 조합으로 노후 소득을 설계하는 분이 많아요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 한국주택금융공사 기준으로 작성됐어요. 수령액과 가입 조건은 변경될 수 있으니 공사 홈페이지(hf.go.kr)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
