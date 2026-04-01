"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경매 물건을 보는데 등기부에 근저당·가압류·전세권이 많아서 뭐가 남고 뭐가 사라지는지 모르는 입찰 예정자
// Q2. 말소기준권리를 찾아서 인수·말소 권리를 구분하고 안전하게 입찰한다
// Q3. 말소기준권리 5종(근저당·가압류·경매개시결정·담보가등기·선순위전세권), 선순위=인수/후순위=말소, 대항력 임차인 확인법
// Q4. GreenBox(핵심 원리) + Steps(권리분석 단계) + Checklist(체크리스트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "등기부등본을 떼서 을구를 확인해요",
    desc: "인터넷등기소(iros.go.kr)에서 등기부등본을 발급받으세요. 을구(소유권 이외의 권리)에 근저당권, 가압류, 전세권 등이 시간 순서대로 나열돼 있어요. 접수 날짜와 접수번호를 기준으로 순서를 파악하세요.",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
  {
    title: "말소기준권리를 찾아요",
    desc: "근저당권, 가압류, 경매개시결정등기, 담보가등기, 선순위 전세권 중에서 가장 먼저 등기된 것이 말소기준권리예요. 보통은 경매를 신청한 채권자의 근저당권이 말소기준권리가 돼요.",
  },
  {
    title: "선순위와 후순위를 나눠요",
    desc: "말소기준권리보다 먼저 등기된 권리는 선순위(인수), 나중에 등기된 권리는 후순위(말소)로 구분해요. 선순위 권리는 낙찰자가 떠안는 거고, 후순위는 경매로 깨끗이 사라져요.",
  },
  {
    title: "매각물건명세서에서 임차인을 확인해요",
    desc: "대법원 경매정보(courtauction.go.kr)에서 매각물건명세서를 열어보세요. 대항력 있는 임차인의 보증금, 전입일, 확정일자가 나와요. 임차인 보증금이 크면 입찰가를 낮춰 잡아야 해요.",
    link: { label: "대법원 경매정보", href: "https://www.courtauction.go.kr" },
  },
  {
    title: "배당 시뮬레이션으로 실투자금을 계산해요",
    desc: "감정가에서 선순위 권리 금액과 임차인 보증금을 빼면 실제 낙찰 가능 금액이 나와요. 인수해야 할 금액이 크면 투자 수익이 줄어들 수 있으니 꼼꼼히 따져보세요.",
  },
];

const CHECKLIST_ITEMS = [
  "등기부등본 을구에서 말소기준권리 찾기 / 근저당·가압류·경매개시결정 중 최선순위",
  "선순위 권리 확인 / 인수할 전세권·지상권·지역권 금액 파악",
  "매각물건명세서 임차인 확인 / 보증금·전입일·확정일자",
  "대항력 있는 임차인 배당 여부 / 배당 못 받으면 낙찰자가 인수",
  "현장 방문 / 실제 점유자와 등기부 내용 대조",
];

const FAQS = [
  {
    q: "말소기준권리가 뭔지 쉽게 설명해 주세요",
    a: "경매로 집이 팔렸을 때 '이 권리보다 나중에 등기된 건 다 지워진다'는 기준선이에요. 이 기준선보다 먼저 등기된 건 낙찰자가 떠안고, 나중에 등기된 건 사라져요.",
  },
  {
    q: "근저당권도 낙찰자가 인수하나요?",
    a: "아니에요. 근저당권은 말소기준권리 자체라서 경매 배당으로 변제되고 자동 말소돼요. 낙찰자가 떠안을 일은 없어요.",
  },
  {
    q: "선순위 전세권이 있으면 어떻게 되나요?",
    a: "낙찰자가 전세금을 물어줘야 해요. 전세권자가 나가지 않으면 전세 관계가 계속 유지돼요. 선순위 전세권 금액만큼 입찰가를 낮춰 잡아야 해요.",
  },
  {
    q: "대항력 있는 임차인은 등기부에 안 나오나요?",
    a: "맞아요. 전입신고와 점유(실제 거주)로 대항력이 생기는 거라 등기부에는 안 나와요. 매각물건명세서에서 확인하거나 현장 방문으로 직접 확인해야 해요.",
  },
  {
    q: "권리분석 틀리면 큰 손해를 보나요?",
    a: "네. 인수해야 할 선순위 권리를 발견 못 하면 낙찰 후 수천만원~수억원을 추가로 부담할 수 있어요. 초보라면 법무사나 경매 전문가에게 권리분석을 의뢰하는 게 안전해요.",
  },
  {
    q: "유치권은 말소되나요?",
    a: "유치권은 등기 없이도 성립하고, 경매로도 소멸하지 않아요. 낙찰자가 인수해야 하니까 현장에서 유치권 주장이 있는지 반드시 확인하세요. 매각물건명세서에 기재돼 있을 수 있어요.",
  },
];

const SOURCES = [
  { name: "민사집행법 제91조", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "대법원 경매정보", href: "https://www.courtauction.go.kr" },
  { name: "인터넷등기소", href: "https://www.iros.go.kr" },
];

const RELATED = [
  { slug: "살고있는-집-가압류-경매-시기", title: "가압류 후 경매 시기", description: "가압류에서 강제경매까지 걸리는 기간." },
  { slug: "미등기-부동산-가압류-가능-여부", title: "미등기 부동산 가압류", description: "등기 없는 건물도 가압류할 수 있는지." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고", description: "매매 계약 후 30일 이내 신고 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 권리분석</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 권리분석, 말소기준권리란?<br />
        인수·말소 구분하는 5단계 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 물건 등기부를 봤는데 근저당, 가압류, 전세권이 한가득이라 뭐가 뭔지 모르겠죠.
      </p>
      <p style={body}>
        말소기준권리는 <strong>경매 후 어떤 권리가 사라지고 어떤 권리가 남는지를 결정하는 기준선</strong>이에요.
        이 기준보다 먼저 등기된 권리(선순위)는 낙찰자가 떠안고, 나중에 등기된 권리(후순위)는 말소돼요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제91조</a>가 근거 조문이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>말소기준권리, 핵심만 먼저 잡아요</H2>
      <p style={body}>
        근저당권, 가압류, 경매개시결정등기, 담보가등기, 선순위 전세권. 이 5개 중 가장 먼저 등기된 것이 말소기준권리예요.
      </p>

      <GreenBox>
        말소기준권리 핵심 원리{"\n"}
        · 말소기준권리보다 먼저 등기 = 선순위 = 낙찰자 인수{"\n"}
        · 말소기준권리와 같거나 나중 = 후순위 = 경매로 말소{"\n"}
        · 등기부 을구의 접수 날짜 순서로 판단
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>권리분석은 이 순서로 해요</H2>
      <p style={body}>
        처음이라 어렵게 느껴지지만, 순서대로 하면 빠뜨리지 않아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>입찰 전 반드시 확인할 체크리스트</H2>
      <p style={body}>
        권리분석에서 하나라도 놓치면 낙찰 후 큰 손해를 볼 수 있어요. 아래 항목 전부 체크한 뒤 입찰하세요.
      </p>

      <SectionBadge>권리분석 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>인수되는 권리와 말소되는 권리 비교</H2>
      <p style={body}>
        한눈에 구분할 수 있도록 정리했어요.
      </p>

      <BorderBox>
        <strong>인수 (낙찰자가 떠안는 것)</strong>{"\n"}
        · 선순위 전세권 → 전세금 물어줘야 해요{"\n"}
        · 선순위 지상권·지역권 → 통행권 등 인정{"\n"}
        · 유치권 → 등기 없이도 인수{"\n"}
        · 배당 못 받은 대항력 임차인 → 보증금 인수
      </BorderBox>

      <GreenBox>
        말소 (경매로 사라지는 것){"\n"}
        · 말소기준권리 자체 (근저당권 등){"\n"}
        · 후순위 가압류·가등기·압류{"\n"}
        · 후순위 전세권·지상권·지역권{"\n"}
        · 배당받은 대항력 임차인의 임차권
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        경매 권리분석에서 실제로 가장 많이 헷갈리는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민사집행법 기준으로 작성했어요. 개별 경매 물건의 권리관계는 사안마다 다르니 법무사나 경매 전문가 상담을 권장해요." />
    </ArticleLayout>
  );
}
