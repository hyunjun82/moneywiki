"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 시즌에 근로장려금도 같이 신청할 수 있는지, 얼마나 받는지 궁금한 저소득 근로자
// Q2. 근로장려금 자격 요건을 확인하고 신청 방법과 지급 일정을 파악해서 제때 신청한다
// Q3. 소득 기준(가구별 상한), 재산 기준(2.4억), 가구 유형별 최대 금액, 신청 시기(5월/9월), 연말정산과의 관계
// Q4. EligibilityChecker(자격 확인) + GreenBox(금액 정리) + Steps(신청 절차) + BorderBox(일정) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "income", label: "총소득이 가구 유형별 기준금액 이하예요" },
  { id: "property", label: "가구원 재산 합계가 2억 4천만원 미만이에요" },
  { id: "work", label: "근로소득, 사업소득, 종교인소득 중 하나가 있어요" },
  { id: "age", label: "단독가구인 경우 만 19세 이상이에요" },
  { id: "exclude", label: "전문직 사업자가 아니에요" },
];

const STEPS = [
  {
    title: "5월 정기신청 기간에 홈택스에서 신청하세요",
    desc: "매년 5월 1일~31일이 정기신청 기간이에요. 홈택스(hometax.go.kr)에 로그인하면 '근로장려금 신청' 메뉴가 있어요. ARS(1544-9944)로도 신청할 수 있어요.",
    tip: "5월 신청하면 9월에 지급돼요",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "반기신청은 3월과 9월에 할 수 있어요",
    desc: "근로소득만 있는 경우 반기신청이 가능해요. 상반기(3월), 하반기(9월)에 나눠서 신청하면 6개월마다 받을 수 있어요. 사업소득이 있으면 반기신청은 안 돼요.",
    tip: "반기신청 시 지급액은 산정액의 35%씩 나눠서 받아요",
  },
  {
    title: "심사 결과와 지급액을 확인하세요",
    desc: "신청 후 3개월 정도 심사가 걸려요. 홈택스에서 '장려금 심사진행 조회'로 확인할 수 있어요. 지급이 결정되면 신청 시 입력한 계좌로 입금돼요.",
  },
];

const FAQS = [
  {
    q: "근로장려금은 연말정산이랑 다른 건가요?",
    a: "완전히 별개 제도예요. 연말정산은 이미 낸 세금을 정산하는 거고, 근로장려금은 정부가 추가로 현금을 지급하는 제도예요. 연말정산과 별도로 신청해야 받을 수 있어요.",
  },
  {
    q: "가구 유형별로 얼마까지 받을 수 있나요?",
    a: "단독가구 최대 165만원, 홑벌이가구 최대 285만원, 맞벌이가구 최대 330만원이에요. 소득이 기준 중간쯤일 때 최대 금액이 나오고, 기준 상한에 가까울수록 줄어들어요.",
  },
  {
    q: "재산이 2억 4천만원 넘으면 아예 못 받나요?",
    a: "네, 2억 4천만원 이상이면 지급 대상에서 제외돼요. 재산에는 주택, 토지, 예금, 전세보증금, 자동차 등이 모두 포함돼요. 부채는 차감하지 않아요.",
  },
  {
    q: "5월에 신청을 놓쳤어요. 다른 방법 없나요?",
    a: "6월~11월에 기한후 신청을 할 수 있어요. 다만 지급액이 정기신청보다 10% 감액돼요. 예를 들어 165만원 대상이면 148만 5천원을 받게 돼요.",
  },
  {
    q: "자녀장려금도 같이 신청하나요?",
    a: "네, 같은 기간에 같은 방식으로 신청해요. 18세 미만 자녀가 있고 총소득 7천만원 이하면 자녀 1인당 최대 100만원을 추가로 받을 수 있어요.",
  },
  {
    q: "프리랜서(사업소득)도 받을 수 있나요?",
    a: "받을 수 있어요. 다만 전문직 사업자(변호사, 의사, 세무사 등)는 제외돼요. 배달, 대리운전 등 일반 사업소득이면 소득·재산 요건만 충족하면 돼요.",
  },
];

const SOURCES = [
  { name: "조세특례제한법", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청", href: "https://www.nts.go.kr" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 개념과 절차", description: "연말정산 전체 흐름과 공제 항목 정리." },
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목", description: "세액공제 항목별 한도와 조건." },
  { slug: "자녀장려금", title: "자녀장려금 신청 방법", description: "자녀 1인당 최대 100만원 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 근로장려금 · 저소득 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로장려금, 나도 받을 수 있을까?<br />
        자격 요건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "일은 하고 있는데 소득이 적어요. 정부에서 주는 돈이 있다고 하던데, 나도 해당되나요?"
      </p>
      <p style={body}>
        근로장려금(EITC)은 일은 하지만 소득이 낮은 가구에 정부가 <strong>현금을 지급</strong>하는 제도예요.
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a>에 근거가 있고,
        가구 유형에 따라 <strong>최대 330만원</strong>까지 받을 수 있어요.
        연말정산과는 별개로 따로 신청해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 근로장려금 대상인지 확인해보세요</H2>
      <p style={body}>
        소득, 재산, 가구 유형 세 가지 요건을 모두 충족해야 해요.
        아래 항목에 체크해보세요.
      </p>

      <SectionBadge>수급자격 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />

      <CategoryButton label="연말정산 정보" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가구 유형별로 얼마 받을 수 있나요?</H2>
      <p style={body}>
        근로장려금은 가구 유형과 총소득에 따라 지급액이 달라져요.
        소득이 너무 낮거나 높으면 금액이 줄어들고, 중간 구간에서 최대 금액이 나와요.
      </p>

      <GreenBox title="2025년 귀속 근로장려금 최대 금액">
        {"단독가구: 최대 165만원 (총소득 2,200만원 이하)\n홑벌이가구: 최대 285만원 (총소득 3,200만원 이하)\n맞벌이가구: 최대 330만원 (총소득 3,800만원 이하)\n\n재산 요건: 가구원 재산 합계 2억 4천만원 미만\n(재산 1.7억~2.4억 구간은 지급액 50% 감액)"}
      </GreenBox>

      <p style={body}>
        '총소득'에는 근로소득, 사업소득, 이자·배당·연금소득이 모두 포함돼요.
        비과세소득은 빼고 계산해요.
        재산에는 주택, 토지, 예금, 전세보증금, 자동차 시가 등이 포함되고 부채는 차감하지 않아요.
      </p>

      <Divider />

      <H2>근로장려금 신청은 이렇게 해요</H2>
      <p style={body}>
        매년 5월이 정기신청 기간이에요.
        근로소득만 있다면 반기신청(3월, 9월)도 가능하죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>연말정산이랑 뭐가 다르죠?</H2>
      <p style={body}>
        혼동하기 쉬운데, 완전히 다른 제도예요.
        <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a>은 이미 낸 소득세를 정산해서 돌려받거나 더 내는 거예요.
        근로장려금은 정부가 별도로 현금을 주는 거예요.
      </p>

      <BorderBox>
        <strong>연말정산 vs 근로장려금</strong>{"\n"}
        · 연말정산: 1월~2월 회사에서 진행, 기납부세액 정산{"\n"}
        · 근로장려금: 5월 본인이 직접 신청, 정부 현금 지급{"\n"}
        {"\n"}
        · 연말정산 환급과 근로장려금을 둘 다 받을 수 있어요{"\n"}
        · 신청 시기가 다르니 각각 따로 챙겨야 해요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 기준으로 작성했어요. 소득 기준, 지급액, 신청 기간은 매년 바뀔 수 있으니 최신 내용은 국세청(126)이나 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
