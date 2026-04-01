"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 오래된 청약저축·청약예금 보유자가 민영주택도 청약하고 싶어서 전환 방법을 찾는 상황
// Q2: 은행 앱 또는 영업점에서 주택청약종합저축으로 전환 완료
// Q3: 전환 혜택(민영+국민 모두 청약 가능), 납입금·횟수 유지, 기한 2026.9.30, 청약 접수 중 전환 불가, 예치금 기준
// Q4: BorderBox(전환 전후 비교) + Steps(전환 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARISON = [
  { name: "청약저축", required: false, where: "국민주택만 청약 가능 (85㎡ 이하)" },
  { name: "청약예금", required: false, where: "민영주택만 청약 가능" },
  { name: "청약부금", required: false, where: "민영주택 85㎡ 이하만 청약 가능" },
  { name: "주택청약종합저축 (전환 후)", required: true, where: "국민주택 + 민영주택 모두 청약 가능" },
];

const STEPS = [
  {
    title: "청약 접수 중인지 확인",
    desc: "전환 신청 전, 현재 청약 신청 중인 건이 없는지 꼭 확인해요. 청약 접수 중이면 전환이 안 돼요. 당첨자 발표 후에 전환하면 돼요.",
    tip: "청약홈(applyhome.co.kr)에서 내 청약 현황 확인 가능해요",
  },
  {
    title: "은행 앱 또는 영업점에서 전환 신청",
    desc: "거래 은행 모바일 앱에서 청약통장 메뉴 → '주택청약종합저축 전환'을 선택하면 돼요. 영업점 방문 시에는 신분증과 청약통장을 챙겨서 '주택청약종합저축으로 전환하려고요'라고 하면 직원이 안내해줘요.",
    tip: "모바일 앱으로 5분 안에 끝나요",
  },
  {
    title: "전환 완료 확인",
    desc: "전환 후 통장 종류가 '주택청약종합저축'으로 변경됐는지 확인해요. 기존 납입 금액과 횟수가 그대로 승계됐는지도 체크하세요.",
    link: { label: "청약홈에서 통장 정보 확인", href: "https://www.applyhome.co.kr" },
  },
];

const CHECKLIST = [
  "전환 기한 2026년 9월 30일 전에 완료 (기한 후 전환 불가)",
  "청약 접수 중인 건 있으면 발표 후 전환",
  "중복 청약통장 있으면 하나만 유지하고 나머지 해지 (당첨 취소 위험)",
  "전환 후 기존 납입금액·납입 횟수 승계 확인",
  "민영주택 85㎡ 초과 청약하려면 예치금 500만원 이상 필요한지 체크",
  "전환 후에도 매월 자동이체 납입 유지",
];

const FAQS = [
  {
    q: "전환하면 기존에 납입한 돈은 어떻게 되나요?",
    a: "그대로 유지돼요. 납입 횟수와 금액 모두 승계되니까 손해 볼 게 없어요. 120회 납입했으면 전환 후에도 120회로 인정돼요.",
  },
  {
    q: "전환 기한이 2026년 9월 30일인데 이후엔 못 바꾸나요?",
    a: "현재 발표된 전환 기간은 2026년 9월 30일까지예요. 정부가 주택청약통장을 일원화하는 방향이라 기한 후 전환이 불가능할 수 있어요. 서두르는 게 좋아요.",
  },
  {
    q: "전환하면 청약 1순위 자격도 그대로인가요?",
    a: "네, 유지돼요. 24회 이상 납입과 지역별 예치금 조건이 이미 충족됐다면 전환 후에도 바로 1순위예요.",
  },
  {
    q: "청약저축에서 전환 후 민영주택 청약하려면 추가로 돈을 더 넣어야 하나요?",
    a: "청약하려는 주택 면적에 따라 다를 수 있어요. 85㎡ 이하는 300만원 이상, 85㎡ 초과는 500만원 이상이 필요해요(수도권 기준). 잔액이 부족하면 추가 납입이 필요해요.",
  },
  {
    q: "은행 앱이 어렵면 어디 전화하면 되나요?",
    a: "거래 은행 고객센터나 주택도시보증공사(HUG) 콜센터 1566-9009에 전화해서 안내받으면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령·제도",
    items: [
      { label: "주택도시기금법", url: "https://www.law.go.kr/법령/주택도시기금법" },
      { label: "찾기쉬운 생활법령정보 - 아파트 분양받기", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1773&ccfNo=4&cciNo=1&cnpClsNo=1" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "청약홈 (청약 일정·공고 확인)", url: "https://www.applyhome.co.kr" },
      { label: "주택도시기금 (청약통장 정보)", url: "https://nhuf.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "주택청약-1순위", title: "주택청약 1순위 조건", description: "1순위가 되려면 충족해야 할 납입 횟수와 예치금 기준이에요." },
  { slug: "청약통장-가입", title: "청약통장 가입 방법", description: "주택청약종합저축을 처음 만드는 방법이에요." },
  { slug: "아파트-청약", title: "아파트 청약 방법", description: "청약 신청부터 당첨까지 전체 절차를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 청약</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청약저축·청약예금 주택청약종합저축 전환<br />
        2026년 9월 30일 기한 전에 바꾸는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청약저축을 10년째 납입하고 있는데 민영주택은 청약을 못 한다는 걸 이제야 알았다고요?
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1773&ccfNo=4&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택도시기금법</a>에 따라 기존 청약통장을 주택청약종합저축으로 전환하면 민영주택과 국민주택 모두 청약할 수 있어요.
        기존 납입금과 횟수는 그대로 유지되니까 손해 없이 바꿀 수 있어요. 전환 기한은 2026년 9월 30일이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>전환 전과 후, 청약 가능 범위가 달라져요</H2>
      <p style={body}>
        2015년 9월 이전에 만든 청약저축·청약예금·청약부금은 청약 가능한 주택 종류가 각각 달랐어요.
        주택청약종합저축으로 전환하면 이 제한이 사라지고 모든 유형을 청약할 수 있어요.
      </p>

      <SectionBadge>청약통장 종류별 청약 가능 범위</SectionBadge>
      <DocTable docs={COMPARISON} />

      <BorderBox>
        <strong>전환해도 유지되는 것들</strong><br />
        기존 납입금액 → 100% 승계<br />
        납입 인정 횟수 → 100% 승계<br />
        청약 1순위 자격 → 조건 충족 시 그대로 유지<br />
        <br />
        단, 민영주택 면적에 따라 예치금 추가 납입이 필요할 수 있어요.
      </BorderBox>

      <CategoryButton label="금융·청약 정보" count={6} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>전환 절차 3단계</H2>
      <p style={body}>
        은행 앱에서 5분이면 끝나요. 영업점 방문도 신분증 하나면 돼요. 준비할 서류가 따로 없어요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        수도권 기준 예치금 조건: 전용 85㎡ 이하 300만원 / 전용 102㎡ 이하 600만원 / 전용 135㎡ 이하 1,000만원 / 모든 면적 1,500만원. 청약저축 잔액이 해당 금액 이상이라면 추가 납입 없이 바로 청약 가능해요.
      </GreenBox>

      <Divider />

      <H2>전환 전 반드시 확인할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중복 청약통장이 있으면 전환 전에 해지해야 해요. 두 개를 동시에 유지하다 청약하면 당첨이 취소될 수 있어요.
      </p>
      <SectionBadge>전환 전후 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 청약통장 전환 제도를 바탕으로 작성됐어요. 전환 기한과 예치금 기준은 변경될 수 있으니 최신 정보는 청약홈 또는 거래 은행에서 직접 안내받아봐요." />
    </ArticleLayout>
  );
}
