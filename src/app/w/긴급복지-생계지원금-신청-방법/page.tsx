"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 갑작스러운 실직·사고로 이번 달 생활비가 없어서 당장 어떻게 해야 할지 모르는 상황
// Q2: 129에 전화하거나 주민센터 방문해서 긴급복지 생계지원금 신청 완료
// Q3: 위기사유 목록, 소득·재산 기준, 가구별 지원금액, 선지원 후심사 원칙, 신청 방법, 최대 6개월 연장 조건
// Q4: EligibilityChecker(위기사유 체크) + DocTable(가구별 금액) + Steps(신청절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "주소득자가 사망, 가출, 행방불명 됐어요" },
  { id: "c2", label: "주소득자가 중한 질병이나 부상으로 3개월 이상 일하기 어려워요" },
  { id: "c3", label: "갑작스러운 실직이나 사업 실패로 소득이 끊겼어요" },
  { id: "c4", label: "화재, 자연재해, 가정폭력으로 생활이 불가능해졌어요" },
];

const SUPPORT_AMOUNTS = [
  { name: "1인 가구", required: true, where: "713,102원 / 월" },
  { name: "2인 가구", required: true, where: "1,178,435원 / 월" },
  { name: "3인 가구", required: true, where: "1,508,690원 / 월" },
  { name: "4인 가구", required: true, where: "1,833,572원 / 월" },
  { name: "5인 가구", required: true, where: "2,142,635원 / 월" },
  { name: "6인 가구", required: true, where: "2,437,878원 / 월" },
];

const STEPS = [
  {
    title: "129 전화 또는 주민센터 방문으로 신청",
    desc: "보건복지상담센터 129에 24시간 전화하면 신청 접수가 바로 돼요. 직접 방문하려면 신분증 하나만 들고 주민센터에 가면 돼요. 별도 서류는 필요 없어요.",
    link: { label: "복지로 온라인 신청", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "담당 공무원 현장 확인 (48시간 이내)",
    desc: "신청 후 48시간 이내에 담당 공무원이 현장 확인을 나와요. 위기상황을 직접 확인하는 단계예요. 집에 없으면 연락이 오니까 전화를 꼭 받아야 해요.",
    tip: "현장 확인 시 위기상황을 솔직하게 설명하는 게 중요해요",
  },
  {
    title: "지원 결정 및 생계지원금 지급",
    desc: "현장에서 위기상황이 확인되면 바로 지원 결정이 나요. 생계지원금은 결정 당일 또는 익일에 계좌로 입금돼요. 의료·주거·교육 지원도 함께 신청할 수 있어요.",
    tip: "의료지원(300만원 이내), 주거지원(월 664,300원)도 동시에 신청하세요",
  },
  {
    title: "연장 심사 (1개월 후, 필요 시)",
    desc: "기본 1개월 지급 후 위기 상황이 계속되면 연장 심사를 받을 수 있어요. 최대 6개월까지 연장 가능해요. 연장 시에는 소득증빙 서류를 미리 준비하세요.",
    tip: "연장 신청은 지급 만료 전에 미리 담당 주민센터에 요청하세요",
  },
];

const CHECKLIST = [
  "위기사유가 발생한 날로부터 가능한 빨리 신청 (시일 지나면 긴급성 불인정 가능)",
  "소득 기준 중위소득 75% 이하, 재산 대도시 2억 4,100만원 이하 확인",
  "신청 후 담당 공무원 전화 꼭 받기 (현장 확인 일정 조율)",
  "의료·주거·교육 지원도 동시 신청 여부 확인",
  "연장 신청 시 소득증빙 서류 미리 준비",
  "거짓 신청 금지 (적발 시 지원금 2배 환수)",
];

const FAQS = [
  {
    q: "긴급복지 생계지원금 받으면 기초생활수급자가 되나요?",
    a: "아니에요. 긴급복지지원은 갑작스러운 위기에 대한 일시 지원이라 기초생활보장과 완전히 별개 제도예요. 수급자 이력에도 남지 않아요.",
  },
  {
    q: "본인이 신청 못하면 가족이나 다른 사람이 대신 신청할 수 있나요?",
    a: "네, 가능해요. 가족, 친척, 이웃은 물론이고 담당 공무원이 직권으로 신청할 수도 있어요. 실제로 전체 긴급복지지원의 약 30%가 공무원 직권 신청이에요.",
  },
  {
    q: "지원받다가 소득이 기준을 넘으면 어떻게 되나요?",
    a: "지원이 중단되고 이미 받은 지원금을 환수당할 수 있어요. 거짓 신청이면 2배를 반환해야 해요. 상황이 바뀌면 담당 주민센터에 솔직하게 알려야 해요.",
  },
  {
    q: "긴급복지 생계지원금은 세금이 붙나요?",
    a: "아니에요. 긴급복지지원법 제18조에 따라 긴급지원 수급권은 압류·양도가 금지되고, 소득세도 비과세예요.",
  },
  {
    q: "6개월 이상 위기 상황이 지속되면 어떻게 하나요?",
    a: "기초생활수급자 신청으로 전환하는 게 좋아요. 긴급복지는 단기 다리 역할이고, 장기 지원은 기초생활보장이 더 안정적이에요. 주민센터에 상담 요청하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "긴급복지지원법 제2조 (위기사유 정의)", url: "https://www.law.go.kr/법령/긴급복지지원법/제2조" },
      { label: "긴급복지지원법 제19조 (환수 규정)", url: "https://www.law.go.kr/법령/긴급복지지원법/제19조" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부 긴급복지지원 사업안내", url: "https://www.mohw.go.kr/menu.es?mid=a10708010000" },
      { label: "복지로 긴급복지지원 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초생활수급자-조건-총정리", title: "기초생활수급자 신청 조건", description: "위기가 장기화되면 기초생활보장으로 전환하는 방법이에요." },
  { slug: "주거급여-신청", title: "주거급여 신청 방법", description: "주거비가 부담된다면 주거급여도 함께 신청할 수 있어요." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "실직 후 고용보험에서 받을 수 있는 실업급여 신청 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 긴급지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        긴급복지 생계지원금 신청 방법<br />
        129 전화 한 통으로 48시간 안에 받아요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갑자기 실직했는데 이번 달 생활비가 없어요. 통장 잔고가 바닥났는데 월세도 내야 해요.
        이런 상황이면 정부가 자격 심사 없이 생활비를 먼저 주는 제도가 있어요.
        <a href="https://www.law.go.kr/법령/긴급복지지원법/제2조" style={{ color: "#1D9E75", textDecoration: "underline" }}>긴급복지지원법</a>에 근거한 제도로,
        129 전화 한 통으로 신청하면 48시간 안에 현장 확인 후 바로 지급돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 위기사유에 해당하는지 먼저 체크해요</H2>
      <p style={body}>
        긴급복지 생계지원금은 "갑작스러운 위기"가 핵심이에요. 오래전부터 소득이 부족했던 경우는 기초생활보장을 먼저 알아봐야 해요.
        아래 체크리스트로 내 상황이 해당되는지 확인해봐요.
      </p>

      <SectionBadge>위기사유 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="긴급복지지원 위기사유에 해당해요. 지금 바로 129에 전화하거나 주민센터를 방문하세요."
        partialMatchText="위기사유 해당 여부가 애매해요. 129에 전화해서 상담 먼저 받아보세요. 담당자가 정확히 안내해줄 거예요."
      />

      <BorderBox>
        <strong>소득·재산 기준도 함께 봐요</strong><br />
        소득: 기준 중위소득 75% 이하<br />
        재산: 대도시 2억 4,100만원 이하 / 중소도시 1억 5,200만원 이하 / 농어촌 1억 3,000만원 이하<br />
        <br />
        단, 급한 상황이면 이 기준 전에 먼저 지급하고 나중에 확인하는 "선지원 후심사" 원칙이 적용돼요.
      </BorderBox>

      <CategoryButton label="복지 정보" count={8} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가구 규모별 지원금액 (2026년 기준)</H2>
      <p style={body}>
        긴급복지 생계지원금은 기초생활보장 생계급여와 연동돼서 매년 1월에 올라가요.
        식비·의복비·교통비 같은 기본 생활유지비를 한 달분으로 지급하는 거예요.
      </p>

      <SectionBadge>가구원수별 월 지원금액</SectionBadge>
      <DocTable docs={SUPPORT_AMOUNTS} />

      <GreenBox>
        생계지원만 있는 게 아니에요. 의료지원 1회 300만원, 주거지원 월 664,300원(대도시), 교육지원 학기당 최대 461,000원도 해당 시 함께 신청할 수 있어요.
        한 번 신청할 때 해당 항목 전부 같이 넣는 게 유리해요.
      </GreenBox>

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        서류 준비 없이 전화 한 통으로 시작할 수 있어요. 긴급한 상황이니 복잡하게 만들지 않은 제도예요.
        신청 후 현장 확인까지 48시간, 지급까지 당일~익일이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        위기 발생 직후 빨리 신청할수록 좋아요. 시일이 지나면 "긴급성"이 인정되지 않을 수 있어요.
      </p>
      <SectionBadge>신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 기준 긴급복지지원 제도를 바탕으로 작성됐어요. 지원 기준과 금액은 매년 변동될 수 있으니 최신 기준은 보건복지상담센터 129 또는 복지로에서 직접 안내받아봐요." />
    </ArticleLayout>
  );
}
