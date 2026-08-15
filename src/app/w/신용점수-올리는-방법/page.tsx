"use client";
// Q1: 신용점수가 낮아서 대출 거절당했거나, 점수를 올려서 좋은 금리를 받고 싶은 상황
// Q2: 6가지 실천법(연체 방지, 카드 사용률 관리, 체크카드, 비금융정보, 성향설문, 장기 관리)으로 신용점수 상승
// Q3: 연체 영향(수십점 하락, 3~6개월 회복), 카드 사용률 30%, 비금융정보 등록, KCB·NICE 차이
// Q4: Steps(실천법) + GreenBox(핵심 숫자) + BorderBox(KCB vs NICE) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "자동이체 설정으로 연체 차단",
    desc: "신용카드, 통신비, 보험료, 대출 이자 등 모든 고정 지출을 자동이체로 설정하세요. 5일 이상 연체하면 신용정보에 등록되고 최대 5년간 유지돼요.",
    tip: "결제일 전날 계좌 잔고 확인 습관을 들이세요",
  },
  {
    title: "신용카드 한도의 30% 이내로 사용",
    desc: "한도 대비 사용률이 높으면 '돈이 부족한 사람'으로 평가돼요. 한도 500만원이면 150만원 이내로 쓰고, 리볼빙은 절대 사용하지 마세요.",
  },
  {
    title: "체크카드 사용 실적 등록",
    desc: "체크카드 사용 실적도 신용평가에 반영돼요. NICE나 KCB에 체크카드 사용 실적 등록을 신청하면 신용 이력이 쌓여요. 사회초년생에게 특히 효과적이에요.",
  },
  {
    title: "비금융정보 제출",
    desc: "국세청 소득자료, 4대보험 가입 내역, 건강보험료 납부 실적을 신용평가사에 제출하세요. '상환 능력 있는 사람'으로 평가돼서 점수가 올라가요.",
  },
  {
    title: "신용성향설문 참여",
    desc: "NICE와 KCB가 분기별로 진행하는 설문에 참여하면 신용점수에 반영돼요. 10~15분 소요되고, 솔직하게 답하면 돼요.",
  },
  {
    title: "6개월간 꾸준히 관리",
    desc: "신용점수는 단기간에 급격히 올릴 수 없어요. 연체 없이 6개월 관리하면 50~100점 상승을 기대할 수 있어요. 대출 신청은 한 곳에만 하세요.",
  },
];

const CHECKLIST = [
  "모든 고정비 자동이체 설정 완료",
  "신용카드 한도 대비 사용률 30% 이하 유지",
  "리볼빙(미결제금 이월) 사용 안 함",
  "체크카드 사용 실적 신용평가사에 등록",
  "비금융정보(소득, 4대보험) 제출",
  "단기간 다수 금융기관 대출 신청 자제",
  "6개월 이내 신용카드 신규 발급 자제",
];

const FAQS = [
  {
    q: "신용점수 몇 점이면 대출이 가능한가요?",
    a: "700점 이상이면 1금융권 대출이 가능해요. 900점 이상이면 최우량 등급으로 최저 금리를 받을 수 있고요. 600점 이하면 2금융권이나 서민금융진흥원을 알아봐야 해요.",
  },
  {
    q: "NICE랑 KCB 점수가 왜 다른가요?",
    a: "평가 기준이 달라요. NICE는 상환 이력을 더 중시하고, KCB는 신용카드 이용 형태를 더 중시해요. 둘 다 관리해야 해요.",
  },
  {
    q: "카드를 아예 안 쓰면 점수가 오르나요?",
    a: "아니에요. 적당히 쓰고 제때 갚는 게 더 좋아요. 사용 실적이 아예 없으면 신용 이력 부족으로 오히려 불리해요.",
  },
  {
    q: "연체 한 번 했는데 얼마나 걸려요?",
    a: "보통 3~6개월이면 원래 수준으로 회복돼요. 연체 금액이 크거나 장기 연체였으면 1년 이상 걸릴 수 있어요. 이후 6개월간 연체 없이 관리하는 게 핵심이에요.",
  },
  {
    q: "신용점수 조회하면 점수가 떨어지나요?",
    a: "본인 조회는 영향 없어요. NICE, KCB 모두 연 3회까지 무료 조회할 수 있고, 은행 앱에서도 조회 가능해요. 금융기관이 조회하는 건 약간 영향이 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "신용정보의 이용 및 보호에 관한 법률", url: "https://www.law.go.kr/법령/신용정보의이용및보호에관한법률" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "NICE 신용정보 조회", url: "https://www.credit.co.kr" },
      { label: "KCB 올크레딧", url: "https://www.allcredit.co.kr" },
      { label: "금융소비자포털 (금융감독원)", url: "https://finlife.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "신용등급-조회", title: "신용점수 무료 조회 방법", description: "NICE, KCB 신용점수를 무료로 확인하는 방법이에요." },
  { slug: "신용카드-발급-조건", title: "신용카드 발급 조건", description: "신용카드 발급에 필요한 점수와 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 신용관리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용점수 올리는 방법 6가지<br />
        3~6개월이면 100점 올릴 수 있어요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 신청했는데 신용점수가 낮아서 거절당했다고요? &ldquo;점수 올리고 다시 오세요&rdquo;라는 말만 듣고 나왔다면
        지금부터 알려드리는 6가지만 실천해보세요.
        <a href="https://www.law.go.kr/법령/신용정보의이용및보호에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>신용정보법</a>에
        따라 관리되는 신용점수는 꾸준히 관리하면 반드시 올라가요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>6가지 실천법, 이 순서대로 하세요</H2>
      <p style={body}>
        연체 방지가 1순위예요. 한 번 연체하면 수십 점이 빠지고 회복에 몇 달이 걸려요.
        나머지 5가지는 점수를 쌓아가는 방법이에요. 전부 실천하면 6개월 내 50~100점 상승을 기대할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        <strong>핵심 숫자 정리</strong><br />
        카드 사용률: 한도의 30% 이하가 이상적<br />
        연체 기록: 5일 이상이면 신용정보 등록, 최대 5년 유지<br />
        회복 기간: 연체 후 3~6개월 (장기 연체는 1년 이상)<br />
        무료 조회: NICE·KCB 각각 연 3회
      </GreenBox>

      <CategoryButton label="금융·신용 정보" count={4} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>NICE와 KCB, 뭐가 다른가요?</H2>
      <p style={body}>
        같은 사람인데 NICE 점수와 KCB 점수가 다른 경우가 많아요. 평가 방식이 다르기 때문이에요.
        은행마다 참고하는 평가사가 다르니까 둘 다 관리해야 해요.
      </p>

      <BorderBox>
        <strong>NICE vs KCB 평가 특징</strong><br /><br />
        NICE: 상환 이력을 더 중시해요. 대출 잘 갚으면 유리하죠.<br />
        KCB: 신용카드 이용 형태를 더 중시해요. 카드 사용 관리가 중요하고요.<br /><br />
        공통: 연체 이력은 둘 다 치명적이에요. 비금융정보 제출은 둘 다 긍정적이에요.
      </BorderBox>

      <Divider />

      <H2>점수 올리기 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        아래 항목을 하나씩 체크해보세요. 빠진 게 있으면 지금 바로 실행하세요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 신용정보법과 신용평가사 기준을 바탕으로 작성됐어요. 개인별 신용점수 변동은 상황에 따라 다를 수 있으니 참고용으로 활용하세요." />
    </ArticleLayout>
  );
}
