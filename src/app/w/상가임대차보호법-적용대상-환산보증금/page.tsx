"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 상가 계약 전에 내가 상가임대차보호법 보호를 받을 수 있는지 확인하려는 상황
// Q2: 환산보증금 계산해서 지역별 기준금액 이하인지 판단 완료
// Q3: 환산보증금 공식(보증금+월세x100), 지역별 기준(서울 9억 등), 초과 시 보호 범위, 대항력·우선변제권 차이
// Q4: GreenBox(계산 공식) + BorderBox(지역별 기준) + EligibilityChecker(보호 여부) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const CHECK_ITEMS = [
  { id: "c1", label: "사업자등록을 하고 상가건물을 임차하고 있어요" },
  { id: "c2", label: "환산보증금이 지역별 기준금액 이하예요" },
  { id: "c3", label: "임대차 계약서에 확정일자를 받았어요" },
  { id: "c4", label: "사업자등록 + 건물 인도(점유) 완료했어요" },
];

const STEPS = [
  {
    title: "환산보증금 계산",
    desc: "보증금 + (월세 x 100)으로 계산해요. 월세 200만원이면 보증금에 2억원을 더하는 거예요.",
  },
  {
    title: "지역별 기준금액 확인",
    desc: "서울 9억원, 수도권 과밀억제권역 6억 9천만원, 광역시·세종 등 5억 4천만원, 그 외 3억 7천만원이에요.",
  },
  {
    title: "대항력 요건 갖추기",
    desc: "건물 인도(실제 점유) + 사업자등록을 하면 다음 날 0시에 대항력이 생겨요.",
  },
  {
    title: "확정일자 받기",
    desc: "임대차계약서에 확정일자를 받으면 우선변제권이 생겨요. 관할 주민센터나 등기소에서 받을 수 있어요.",
  },
];

const CHECKLIST = [
  "환산보증금 = 보증금 + (월세 x 100) 계산 완료",
  "내 상가 지역의 기준금액 확인 (서울 9억, 수도권 6.9억 등)",
  "계약 전 등기부등본으로 근저당 설정 금액 확인",
  "계약 후 즉시 사업자등록 + 건물 인도(점유)",
  "임대차계약서에 확정일자 받기",
  "권리금 조항 계약서에 명시",
];

const FAQS = [
  {
    q: "보증금 5억에 월세 300만원이면 보호받을 수 있나요?",
    a: "환산보증금이 8억원이에요(5억 + 300만 x 100). 서울이면 9억원 이하니까 보호받을 수 있어요. 수도권 과밀억제권역이면 6.9억 초과라 우선변제권은 못 받아요.",
  },
  {
    q: "기준금액 초과하면 아무 보호도 못 받나요?",
    a: "아니에요. 대항력, 계약갱신청구권(10년), 권리금 보호는 금액 관계없이 모든 임차인이 받을 수 있어요. 우선변제권만 못 받는 거예요.",
  },
  {
    q: "월세 없이 보증금만 5억이면 환산보증금도 5억인가요?",
    a: "맞아요. 월세가 0이면 보증금 그 자체가 환산보증금이에요. 계산이 단순해지죠.",
  },
  {
    q: "수도권 과밀억제권역은 구체적으로 어디인가요?",
    a: "서울 전체, 인천 일부, 경기도 의정부·구리·남양주·하남·고양·수원·성남·안양·부천·광명·과천·의왕이 해당돼요. 인천은 강화·옹진 등 일부가 제외돼요.",
  },
  {
    q: "우선변제권이 없으면 경매 때 보증금을 못 돌려받나요?",
    a: "우선변제권 없이도 배당요구는 할 수 있지만, 순위에서 밀려서 보증금 전액을 돌려받기 어려울 수 있어요. 고액 임차인일수록 등기부등본을 꼼꼼히 봐야 해요.",
  },
  {
    q: "확정일자는 꼭 받아야 하나요?",
    a: "우선변제권을 받으려면 필수예요. 확정일자 없이 대항력만 있으면 경매에서 보증금을 먼저 받을 수 없어요. 기준금액 이하 임차인만 해당돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "상가건물 임대차보호법", url: "https://www.law.go.kr/법령/상가건물임대차보호법" },
      { label: "상가건물 임대차보호법 시행령", url: "https://www.law.go.kr/법령/상가건물임대차보호법시행령" },
    ],
  },
  {
    category: "공식 안내",
    items: [
      { label: "찾기쉬운 생활법령정보 - 상가건물 임대차", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=627&ccfNo=1&cciNo=2&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "상가건물-묵시적갱신", title: "상가건물 묵시적갱신", description: "계약 기간 끝나고 자동 연장되는 조건이에요." },
  { slug: "상가-계약갱신청구권", title: "상가 계약갱신청구권", description: "10년까지 계약을 연장할 수 있는 권리예요." },
  { slug: "상가건물-권리금", title: "상가건물 권리금 보호", description: "건물주가 권리금 회수를 방해하면 손해배상 청구할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 상가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        상가임대차보호법 적용 대상, 환산보증금으로<br />
        내 상가가 보호받는지 확인하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        상가를 계약하려는데 보증금이 얼마까지 보호되는 건지 헷갈리죠?
        <a href="https://www.law.go.kr/법령/상가건물임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상가건물 임대차보호법</a>은
        모든 상가를 보호하는 게 아니에요. 환산보증금이 지역별 기준금액 이하일 때만 우선변제권 같은 핵심 보호를 받을 수 있어요.
        기준을 딱 1원만 넘어도 경매에서 보증금을 먼저 받을 수 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>환산보증금, 어떻게 계산하나요?</H2>
      <p style={body}>
        환산보증금은 보증금에 월세를 보증금으로 환산한 금액을 더한 거예요.
        월세 100만원이 보증금 1억원과 비슷한 가치라고 보는 거죠.
      </p>

      <GreenBox>
        <strong>환산보증금 = 보증금 + (월세 x 100)</strong><br /><br />
        예시 1: 보증금 3억 + 월세 150만원 → 3억 + 1.5억 = 4억 5천만원<br />
        예시 2: 보증금 5억 + 월세 0원 → 5억원 (순수 보증금 계약)<br />
        예시 3: 보증금 2억 + 월세 500만원 → 2억 + 5억 = 7억원
      </GreenBox>

      <p style={body}>
        월세가 높으면 환산보증금이 크게 올라가요. 보증금 2억에 월세 500만원이면 환산보증금이 7억원이 돼요.
        계약 조건을 정할 때 환산보증금 기준을 미리 계산해보는 게 중요하죠.
      </p>

      <CategoryButton label="부동산·상가 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>지역별 기준금액, 서울은 9억원 이하</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/상가건물임대차보호법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>시행령</a>에서 지역별로 기준금액을 정해놨어요.
        같은 환산보증금이어도 지역에 따라 보호 여부가 달라져요.
      </p>

      <BorderBox>
        <strong>2026년 지역별 환산보증금 기준</strong><br /><br />
        서울특별시: 9억원 이하<br />
        수도권 과밀억제권역(서울 제외): 6억 9천만원 이하<br />
        광역시·세종시·파주·화성·안산·용인·김포 등: 5억 4천만원 이하<br />
        그 외 지역: 3억 7천만원 이하
      </BorderBox>

      <p style={body}>
        서울에서 환산보증금 8억 9천만원이면 기준 이하라 보호받지만,
        같은 금액이 경기도 수원(과밀억제권역)이면 6.9억 초과라 우선변제권을 못 받아요. 지역 확인이 먼저예요.
      </p>

      <Divider />

      <H2>내 상가, 보호 대상인지 확인해보세요</H2>
      <p style={body}>
        아래 항목을 모두 충족하면 상가임대차보호법의 우선변제권까지 받을 수 있어요.
        하나라도 빠지면 보호 범위가 줄어들 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="모든 조건을 충족했어요. 우선변제권까지 보호받을 수 있어요."
        partialMatchText="일부 조건이 부족해요. 대항력은 받을 수 있지만 우선변제권은 확인이 필요해요."
      />

      <Divider />

      <H2>기준 초과해도 받을 수 있는 보호</H2>
      <p style={body}>
        환산보증금이 기준을 넘어도 완전히 보호 밖은 아니에요. 보증금이 100억이어도 받을 수 있는 권리가 있어요.
      </p>

      <BorderBox>
        <strong>금액 관계없이 보호되는 것</strong><br />
        대항력 (점유 + 사업자등록 후 다음 날 발생)<br />
        <a href="/w/상가-계약갱신청구권" style={{ color: "#1D9E75" }}>계약갱신청구권</a> (최초 계약 포함 10년)<br />
        <a href="/w/상가건물-권리금" style={{ color: "#1D9E75" }}>권리금 보호</a> (임대인 방해 시 손해배상 가능)<br />
        월세 인상 제한 (연 5% 이내)<br /><br />
        <strong>기준금액 이하만 보호되는 것</strong><br />
        우선변제권 (경매 시 보증금 우선 회수)<br />
        소액보증금 최우선변제
      </BorderBox>

      <Divider />

      <H2>상가 계약 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계약서에 도장 찍기 전에 한 번 훑어보세요. 환산보증금 기준을 조금만 넘어도 우선변제권이 사라져요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상가건물 임대차보호법과 시행령을 바탕으로 작성됐어요. 기준금액은 주기적으로 조정되니 계약 전 법제처에서 최신 기준을 확인해봐요." />
    </ArticleLayout>
  );
}
