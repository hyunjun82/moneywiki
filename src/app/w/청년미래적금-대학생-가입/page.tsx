"use client";

// Q1. 만19~34세 청년(대학생·취준생 포함)이 청년미래적금에 가입할 수 있는지, 본인이 조건에 해당하는지 확인하려는 상황
// Q2. 가입 조건을 확인하고, 일반형·우대형 중 맞는 유형을 골라 은행에서 신청을 완료한다
// Q3. 나이(만19~34세), 소득(연6,000만원 이하), 중위소득 200% 이하, 월 납입한도 50만원, 정부기여금 6~12%, 우대형 별도 조건
// Q4. EligibilityChecker(자격확인) + CompareTable(일반형 vs 우대형) + Steps(신청 절차) + GreenBox(핵심 요약) + FAQ
// MAP-INTRO: 2026년 6월 출시 예정인 청년미래적금, 대학생도 가입할 수 있는지 궁금하죠
// MAP-TYPE: 자격확인
// MAP-H2: 가입 조건에 해당하나요 > 일반형 vs 우대형 비교 > 신청 절차 > 가입 전 주의사항 > FAQ
// MAP-COMP: EligibilityChecker > CompareTable > Steps > GreenBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const ELIGIBILITY = [
  { id: "age", label: "만 19세 이상 34세 이하예요" },
  { id: "income", label: "개인소득 연 6,000만원 이하예요" },
  { id: "median", label: "가구 기준중위소득 200% 이하예요" },
  { id: "account", label: "청년도약계좌에 현재 가입 중이 아니에요" },
  { id: "tax", label: "직전 3개년 금융소득종합과세 대상이 아니에요" },
];

const COMPARE_ROWS = [
  { label: "대상", optionA: "만19~34세, 소득 6,000만원 이하", optionB: "중소기업 신규취업·재직자 또는 소상공인" },
  { label: "소득 기준", optionA: "연 6,000만원 이하 + 중위소득 200%", optionB: "신규취업 6,000만원·재직자 3,600만원·소상공인 매출 1억" },
  { label: "정부 기여금", optionA: "납입액의 6%", optionB: "납입액의 12%" },
  { label: "월 납입 한도", optionA: "최대 50만원", optionB: "최대 50만원" },
  { label: "만기", optionA: "3년", optionB: "3년" },
  { label: "최대 수령액", optionA: "약 2,000만원", optionB: "약 2,200만원" },
];

const STEPS_DATA = [
  {
    title: "자격 조건을 먼저 확인하세요",
    desc: "만 19~34세, 개인소득 연 6,000만원 이하, 가구 기준중위소득 200% 이하를 모두 충족해야 해요. 소득은 국세청 기준 전년도 총급여로 판단하고요. 대학생이라 소득이 0원이면 소득 조건은 자동으로 충족돼요.",
    tip: "군 복무 기간은 나이 계산에서 빠져요 (최대 6년)",
  },
  {
    title: "취급 은행 앱에서 신청하세요",
    desc: "시중은행·인터넷전문은행에서 가입할 수 있어요. 은행 앱에서 '청년미래적금'을 검색하면 신청 화면이 나와요. 본인인증 후 자격 확인이 자동으로 진행되고, 통과하면 바로 계좌가 개설돼요.",
    tip: "출시일(2026년 6월 예정) 확인 후 신청",
  },
  {
    title: "매월 자동이체를 설정하세요",
    desc: "월 1만원~50만원 사이에서 자유롭게 납입 금액을 정할 수 있어요. 자동이체를 걸어두면 놓치지 않고 매달 넣을 수 있죠. 3년 만기까지 꾸준히 납입해야 정부 기여금을 받을 수 있어요.",
    tip: "중간에 금액 변경 가능, 단 미납 시 기여금 차감 가능",
  },
];

const FAQS = [
  { q: "대학생인데 소득이 없어도 가입할 수 있나요?", a: "네, 가입할 수 있어요. 소득 조건은 '연 6,000만원 이하'이기 때문에 소득이 0원이면 자동으로 충족돼요. 다만 가구 기준중위소득 200% 이하 조건이 있어서, 부모님 소득이 높으면 탈락할 수 있어요. 독립세대(주민등록 분리)라면 본인 소득만으로 판단해요." },
  { q: "청년도약계좌랑 동시에 가입할 수 있나요?", a: "동시 가입은 안 돼요. 청년도약계좌에 이미 가입돼 있다면 해지하거나 만기 후에 청년미래적금을 가입할 수 있어요. 두 상품 모두 정부 기여금이 들어가는 구조라서 중복 혜택이 불가능하죠." },
  { q: "중간에 해지하면 기여금을 못 받나요?", a: "원칙적으로 3년 만기를 채워야 정부 기여금 전액을 받을 수 있어요. 중도 해지 시 기여금이 전부 또는 일부 환수될 수 있고, 구체적인 환수 기준은 출시 시점에 확정돼요. 원금은 돌려받을 수 있어요." },
  { q: "군 복무 중에도 납입할 수 있나요?", a: "가입 후 군 입대하면 납입을 유예할 수 있어요. 군 복무 기간은 가입 기간에서 제외되고, 전역 후 남은 기간을 이어서 납입하면 돼요. 나이 계산에서도 군 복무 기간(최대 6년)은 빠지고요." },
  { q: "일반형이랑 우대형 중 어떤 게 유리한가요?", a: "우대형은 정부 기여금이 12%로 일반형(6%)의 두 배예요. 중소기업 신규 취업자(입사 6개월 이내)·중소기업 재직자(소득 3,600만원 이하)·소상공인(매출 1억 이하)에 해당하면 우대형으로 신청하는 게 무조건 유리해요." },
  { q: "자영업자·프리랜서도 가입할 수 있나요?", a: "네, 가능해요. 개인소득 연 6,000만원 이하 + 기준중위소득 200% 이하 조건만 충족하면 돼요. 소상공인이라면 연 매출 3억원 이하(우대형은 1억 이하) 기준이 적용돼요. 종합소득세 신고 기준으로 소득을 확인하고요." },
];

const REFS = [
  { category: "정부 정책", items: [
    { label: "기획재정부 - 청년미래적금 추진계획", url: "https://www.moef.go.kr" },
    { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" },
  ]},
  { category: "관련 법령", items: [
    { label: "서민의 금융생활 지원에 관한 법률", url: "https://www.law.go.kr/법령/서민의금융생활지원에관한법률" },
  ]},
];

const RELATED = [
  { title: "청년도약계좌 조건과 혜택", slug: "청년도약계좌-가입-조건-혜택", description: "" },
  { title: "연금저축펀드 세액공제 한도", slug: "연금저축펀드-세액공제-한도", description: "" },
  { title: "CMA계좌 금리 혜택", slug: "CMA계좌-금리-혜택", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>저축·적금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년미래적금, 대학생도 가입할 수 있을까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>자격 조건부터 신청 방법까지</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 6월 출시 예정인 청년미래적금, 정부가 매달 기여금을 얹어주는 상품이라 관심이 많죠.
        특히 대학생이나 취준생처럼 소득이 적거나 없는 경우에도 가입이 가능한지가 가장 궁금한 부분이에요.
        결론부터 말하면, 소득이 0원이어도 나이·가구소득 조건만 맞으면 가입할 수 있어요.
      </p>
      <Divider />

      <H2>가입 조건에 해당하나요?</H2>
      <p style={body}>
        청년미래적금은 만 19~34세 청년이면 누구나 신청할 수 있어요.
        핵심 조건은 세 가지인데, 나이·개인소득·가구소득이에요.
        대학생은 개인소득이 없거나 낮으니까 소득 조건은 거의 자동 충족이고, 가구 기준중위소득만 확인하면 돼요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="청년미래적금 가입 대상이에요!"
        partialMatchText="일부 조건이 충족되지 않았어요. 해당 항목을 확인해 보세요."
      />
      <p style={body}>
        군 복무 기간은 나이 계산에서 최대 6년까지 제외돼요.
        만 35세가 넘었더라도 군 복무 기간만큼 나이를 빼면 34세 이하가 되는 경우 가입이 가능하죠.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>일반형 vs 우대형, 뭐가 다른가요?</H2>
      <p style={body}>
        청년미래적금은 일반형과 우대형 두 가지 트랙이 있어요.
        가장 큰 차이는 정부 기여금 비율이에요.
        일반형은 납입액의 6%, 우대형은 12%를 정부가 얹어주죠.
        우대형 대상은 중소기업 취업자·재직자·소상공인으로 한정돼요.
      </p>
      <SectionBadge>비교표</SectionBadge>
      <CompareTable titleA="일반형" titleB="우대형" rows={COMPARE_ROWS} />
      <p style={body}>
        대학생 대부분은 일반형으로 가입하게 돼요.
        졸업 후 중소기업에 취업하면 우대형으로 전환 가능한지는 출시 시점에 확정될 예정이에요.
        매달 50만원씩 3년 넣으면 일반형 기준 약 2,000만원, 우대형은 약 2,200만원을 수령할 수 있어요.
      </p>
      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        가입은 시중은행·인터넷전문은행 앱에서 할 수 있어요.
        별도 서류 없이 본인인증만 하면 자격 확인이 자동으로 진행되는 구조예요.
        <a href="/w/청년도약계좌-가입-조건-혜택" style={{ color: "#1D9E75", textDecoration: "underline" }}>청년도약계좌</a>와 중복 가입은 안 되니까 이미 가입 중이라면 만기 후에 갈아타는 전략을 세워야 해요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <p style={body}>
        출시일은 2026년 6월로 예정돼 있고, 정확한 일정은 기획재정부 공고를 통해 확인할 수 있어요.
        은행별로 우대금리 조건이 다를 수 있으니 여러 곳을 비교해 보는 게 좋아요.
      </p>
      <Divider />

      <H2>가입 전 꼭 알아둘 점</H2>
      <p style={body}>
        청년미래적금은 3년 만기 상품이에요.
        중도 해지하면 정부 기여금을 전부 또는 일부 돌려줘야 할 수 있어요.
        "3년은 길다"고 느낄 수 있지만, 매달 최소 1만원부터 넣을 수 있어서 부담은 크지 않죠.
      </p>
      <GreenBox title="핵심 요약">
        월 최대 50만원 납입 → 정부 기여금 6~12% → 3년 만기 시 최대 2,200만원 수령.
        대학생·취준생도 가입 가능하고, 소득이 없으면 소득 조건은 자동 충족이에요.
        단, 청년도약계좌와 동시 가입은 불가하고, 중도 해지 시 기여금 환수에 주의해야 해요.
      </GreenBox>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 발표된 정책 내용을 바탕으로 작성했어요. 세부 조건은 2026년 6월 출시 시점에 변경될 수 있으니 기획재정부·서민금융진흥원 공고를 꼭 확인하세요." />

      <CategoryButton label="저축·적금" href="/categories/saving" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
