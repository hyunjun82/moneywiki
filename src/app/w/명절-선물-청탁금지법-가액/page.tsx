"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 명절에 거래처·공무원에게 선물을 보내려는데 청탁금지법에 걸릴까 봐 걱정되는 상황.
// Q2. 선물 한도(일반 5만원, 농수산물 30만원)를 확인하고 안전하게 선물을 보낼 수 있어야 해요.
// Q3. 청탁금지법 적용 대상, 선물 종류별 한도(일반 5만원/농수산물 20만원·명절 30만원), 위반 시 처벌(과태료·형사), 음식물·경조사비 별도 기준.
// Q4. GreenBox(한도 요약) + Checklist(안전 체크리스트) + BorderBox(종류별 한도표) + FAQ
// MAP-INTRO: 설 연휴 거래처에 선물 보내려다가 청탁금지법 걸릴까 걱정
// MAP-TYPE: 자격확인
// MAP-H2: 선물 한도 기준 > 적용 대상 > 종류별 한도 > 위반 시 처벌 > 안전 체크리스트 > FAQ
// MAP-COMP: GreenBox > EligibilityChecker > BorderBox > BorderBox > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "받는 사람이 공무원·공공기관·언론인·사립학교 직원이에요" },
  { id: "c2", label: "선물 가액이 5만원을 초과해요" },
  { id: "c3", label: "농수산물이 아닌 일반 선물이에요" },
  { id: "c4", label: "명절(설·추석) 전후 2주 기간이 아니에요" },
];

const FAQS = [
  { q: "공무원한테 5만원 넘는 선물 보내면 어떻게 되나요?", a: "선물 가액의 2~5배 과태료가 부과돼요. 100만원 초과하면 3년 이하 징역 또는 3천만원 이하 벌금이에요. 주는 사람, 받는 사람 둘 다 처벌 대상이에요." },
  { q: "농수산물 30만원은 설·추석만 되나요?", a: "네, 정확히는 설·추석 전후 각각 2주 기간만 돼요. 평상시 농수산물은 20만원까지예요. 그 밖에는 일반 선물 5만원 한도가 적용돼요." },
  { q: "상품권이나 기프티콘도 선물에 해당하나요?", a: "네, 해당돼요. 현금성 물품(상품권, 기프티콘, 모바일쿠폰)도 전부 5만원 한도가 적용돼요. 현금은 금액 불문 절대 안 돼요." },
  { q: "일반 회사 직원끼리도 청탁금지법 적용되나요?", a: "아니요. 청탁금지법은 공무원, 공공기관, 언론인, 사립학교 교직원에게만 적용돼요. 일반 기업 직원은 해당 안 돼요." },
  { q: "밥 사는 건 따로인가요?", a: "네, 음식물은 3만원 별도 한도예요. 선물 5만원과 합산하지 않아요. 밥 3만원 + 선물 5만원은 각각 별개 기준이에요." },
  { q: "홍삼 세트는 농수산물인가요?", a: "아니요. 홍삼처럼 가공한 제품은 농수산물이 아니라 일반 선물로 봐요. 5만원 한도가 적용돼요. 단순 건조·냉동한 것만 농수산물이에요." },
];

const REFS = [
  { category: "법령·기관", items: [
    { label: "부정청탁 및 금품 등 수수의 금지에 관한 법률", url: "https://www.law.go.kr/법령/부정청탁및금품등수수의금지에관한법률" },
    { label: "국민권익위원회", url: "https://www.acrc.go.kr" },
  ]},
];

const SAFE_LIST = [
  "받는 사람이 청탁금지법 적용 대상인지 확인했어요",
  "선물 종류가 농수산물인지 일반 선물인지 구분했어요",
  "지금이 명절 기간(설·추석 전후 2주)인지 확인했어요",
  "금액이 한도(일반 5만원, 농수산물 20~30만원) 이내예요",
  "현금이나 상품권이 아닌 실물 선물이에요",
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 청탁금지법 · 선물</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        명절 선물 한도, 얼마까지 괜찮을까?<br />
        청탁금지법 가액 기준과 처벌
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설이나 추석에 거래처 담당자한테 선물 보내려다가 &quot;이거 청탁금지법에 안 걸리나?&quot; 걱정되시죠?
        공무원, 공공기관, 언론인, 사립학교 교직원한테 한도를 넘기면 과태료에 벌금까지 물 수 있어요.
        <a href="https://www.law.go.kr/법령/부정청탁및금품등수수의금지에관한법률" style={{ color: "#1D9E75" }}>청탁금지법 제8조</a>에서 한도를 정했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>선물 한도가 얼마예요?</H2>
      <p style={body}>
        일반 선물은 5만원, 농수산물은 평상시 20만원, 명절 기간(설·추석 전후 2주)에만 30만원이에요.
        금액 기준은 절대적이라 &quot;정당한 목적&quot;이라는 이유로 넘길 수 없어요.
      </p>
      <GreenBox title="한도 요약">
        일반 선물 5만원 | 농수산물(평상시) 20만원 | 농수산물(명절) 30만원 | 음식물(밥) 3만원 | 경조사비 10만원. 각각 별도 기준이에요.
      </GreenBox>

      <Divider />

      <H2>청탁금지법 적용 대상은 누구예요?</H2>
      <p style={body}>
        모든 사람한테 적용되는 게 아니에요. 공무원, 공공기관 임직원, 언론인(방송·신문·출판), 사립학교 교직원과 그 배우자가 대상이에요.
        일반 회사 직원끼리 선물하는 건 청탁금지법과 무관해요.
      </p>
      <SectionBadge>혹시 내 선물이 위반일까요?</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="위반 가능성이 높아요. 한도 내로 줄이거나 선물 종류를 바꿔야 해요."
        partialMatchText="일부 항목에 해당하지만 조건에 따라 다를 수 있어요. 한도를 확인하세요."
      />

      <Divider />

      <H2>종류별 한도가 어떻게 다른가요?</H2>
      <p style={body}>
        선물 종류에 따라 한도가 달라요. 농수산물이냐 일반 선물이냐, 원물이냐 가공품이냐에 따라 나뉘어요.
        홍삼·김치처럼 양념하거나 가공한 건 농수산물이 아니라 일반 선물로 봐요.
      </p>
      <BorderBox title="종류별 한도 정리">
        일반 선물(과일세트, 건강식품, 상품권 등): 5만원 |
        농수산물 원물(과일, 생선, 건조 굴비 등) 평상시: 20만원 |
        농수산물 원물 명절 기간: 30만원 |
        음식물(식사 대접): 3만원 별도 |
        경조사비(축의금, 조의금): 10만원 별도
      </BorderBox>

      <Divider />

      <H2>한도 넘기면 어떤 처벌을 받나요?</H2>
      <p style={body}>
        100만원 이하면 선물 가액의 2~5배 과태료가 붙어요. 10만원짜리 선물(5만원 초과)을 주면 20~50만원 과태료가 나올 수 있어요.
        100만원을 넘기면 형사처벌이에요. 3년 이하 징역 또는 3천만원 이하 벌금이고, 주는 사람·받는 사람 둘 다 대상이에요.
      </p>
      <BorderBox title="처벌 기준">
        100만원 이하 위반: 과태료 (가액의 2~5배) |
        100만원 초과 위반: 형사처벌 (3년 이하 징역 또는 3천만원 이하 벌금) |
        &quot;몰랐다&quot;는 핑계 안 돼요. 받는 즉시 알아야 할 의무가 있어요.
      </BorderBox>

      <Divider />

      <H2>안전하게 선물하려면 뭘 체크해야 하나요?</H2>
      <p style={body}>
        모든 상황에서 가장 안전한 방법은 5만원 이하 선물이에요. 어떤 상황이든, 누구한테 줘도 문제없어요.
        그래도 농수산물 한도를 쓰고 싶다면 아래 체크리스트를 확인하세요.
      </p>
      <Checklist items={SAFE_LIST} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 1월 기준 청탁금지법 정보를 바탕으로 작성됐어요. 구체적인 법률 판단은 국민권익위원회나 전문 변호사에 상담하세요." />
    </div>
  );
}
