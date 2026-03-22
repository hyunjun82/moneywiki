"use client";

// Q1. 주택임대차보호법 제3조가 뭔지, 대항력이 왜 중요한지 알고 싶은 세입자
// Q2. 전입신고를 빠르게 해서 대항력을 확보하고, 보증금을 보호받는다
// Q3. 대항력 요건(주택인도+전입신고), 효력 발생 시점(다음 날 0시→2026년 즉시), 효력 범위, 대항력 없으면 생기는 문제
// Q4. GreenBox 요건 요약 + Steps 대항력 확보 절차 + BorderBox 주의사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "잔금 치르기 전에 등기부등본을 다시 확인해요",
    desc: "잔금일 당일 아침에 등기부등본을 떼서 새로운 근저당이나 가압류가 없는지 확인하세요. 잔금과 전입신고 사이 공백을 노리는 경우가 있어요.",
    tip: "인터넷등기소(iros.go.kr)에서 모바일 열람 가능",
  },
  {
    title: "잔금 치르고 바로 이사해요",
    desc: "실제로 그 집에 들어가서 살아야 해요. 법에서 말하는 '주택의 인도(점유)'예요. 짐을 옮기고 거주를 시작하면 요건 하나를 충족하는 거예요.",
  },
  {
    title: "이사 당일 바로 전입신고해요",
    desc: "주민센터 방문 또는 정부24에서 온라인 전입신고를 해요. 하루라도 빨리 해야 대항력을 빨리 확보할 수 있어요.",
    tip: "정부24(gov.kr) 또는 주민센터 방문",
    link: { label: "정부24 전입신고", href: "https://www.gov.kr" },
  },
  {
    title: "확정일자도 함께 받아요",
    desc: "전입신고할 때 임대차계약서에 확정일자 도장을 받으면 우선변제권(보증금 먼저 받을 권리)까지 확보돼요. 주민센터에서 600원이에요.",
    tip: "확정일자 = 대항력 + 우선변제권 (보증금 보호 최강 조합)",
  },
];

const FAQS = [
  { q: "대항력은 언제 생기나요?", a: "기존에는 전입신고 다음 날 0시에 생겼어요. 2026년부터 정부가 전입신고 처리 즉시 대항력이 발생하도록 제도를 개선하기로 했어요." },
  { q: "전입신고만 하고 실제로 안 살면 대항력이 인정되나요?", a: "아니요. 실제 거주(주택의 인도)와 전입신고(주민등록) 두 가지를 동시에 갖춰야 대항력이 생겨요. 서류상으로만 거주하는 건 안 돼요." },
  { q: "이사 가면 대항력이 사라지나요?", a: "네. 전입신고를 다른 곳으로 옮기면 대항력이 소멸해요. 보증금 돌려받기 전에 이사해야 하면 임차권등기명령을 받아두세요." },
  { q: "가족 중 한 명만 전입신고해도 되나요?", a: "네. 세대원 중 한 명만 전입신고해도 세대 전체가 대항력을 얻어요. 다만 그 세대원이 실제 거주해야 해요." },
  { q: "집주인이 바뀌면 어떻게 되나요?", a: "대항력이 있으면 새 집주인에게도 계약 기간까지 거주할 권리와 보증금 반환을 요구할 수 있어요. 새 집주인이 기존 계약을 무시할 수 없어요." },
  { q: "경매로 넘어가도 보증금 받을 수 있나요?", a: "대항력이 있으면 낙찰자에게 보증금을 요구할 수 있어요. 확정일자까지 있으면 배당절차에서 우선변제받을 수도 있어요." },
  { q: "확정일자와 대항력은 뭐가 다른 건가요?", a: "대항력은 새 집주인에게 '나 여기 살아요'라고 주장할 수 있는 힘이에요. 확정일자는 경매 시 보증금을 우선 돌려받을 수 있는 순위를 정해주는 거예요. 둘 다 갖춰야 가장 안전해요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제3조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "찾기쉬운 생활법령 - 대항력", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=2&cciNo=3&cnpClsNo=1" },
  { name: "정부24 전입신고", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "주택 매매 시 취득세 계산법." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "임대차 계약 후 신고 절차." },
  { slug: "국민임대주택-전용면적-70제곱미터-입주자격", title: "국민임대주택 입주 자격", description: "소득 기준과 신청 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 대항력</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택임대차보호법 제3조, 대항력이란?<br />
        전입신고로 보증금 지키는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약했는데 집주인이 바뀌면 보증금을 못 받는 건 아닌지 걱정되시죠?
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조</a>가 바로 그 걱정을 해결해주는 조항이에요. 이사하고 전입신고를 하면 등기 없이도 새 집주인이나 경매 낙찰자에게 보증금을 보호받을 수 있는 힘, 즉 대항력이 생겨요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대항력, 두 가지만 갖추면 돼요</H2>
      <p style={body}>
        제3조의 핵심을 요약하면 이거예요.
      </p>

      <GreenBox>
        요건 1. 주택의 인도: 실제로 그 집에 이사해서 살아야 해요 (점유){"\n"}
        요건 2. 주민등록: 전입신고를 해야 해요{"\n"}
        효력 시점: 전입신고 다음 날 0시부터 (2026년 개선 시 즉시 발생){"\n"}
        효력 범위: 새 집주인, 경매 낙찰자 등 제3자에게 임대차를 주장할 수 있어요
      </GreenBox>

      <p style={body}>
        전입신고만 해놓고 실제로 안 살면 안 돼요. 반대로 살고 있는데 전입신고를 안 해도 안 돼요. 두 가지를 동시에 충족해야 대항력이 생기는 거예요.
      </p>

      <CategoryButton label="부동산" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>대항력 확보, 이 순서로 하면 안전해요</H2>
      <p style={body}>
        잔금일 당일부터 확정일자까지, 빠뜨리면 안 되는 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>대항력이 없으면 이런 일이 생겨요</H2>
      <p style={body}>
        대항력을 갖추지 않으면 보증금을 잃을 수 있어요.
      </p>

      <BorderBox>
        <strong>집이 팔리면</strong>: 새 집주인이 "나가세요"라고 하면 나가야 해요. 보증금은 기존 집주인한테 받아야 하는데, 이미 돈을 써버렸으면 받기 어려워요.{"\n"}
        <strong>경매로 넘어가면</strong>: 낙찰자에게 보증금을 요구할 수 없어요. 기존 집주인에게만 청구할 수 있고, 배당에서도 빠져요.{"\n"}
        <strong>전세사기의 핵심</strong>: 대항력 확보 전 근저당이 설정되면 보증금보다 은행이 먼저 돈을 가져가요.
      </BorderBox>

      <p style={body}>
        전입신고 타이밍이 정말 중요해요. 잔금일 당일 바로 전입신고하는 게 전세사기 예방의 첫걸음이에요.
      </p>

      <Divider />

      <H2>대항력과 전입신고, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        세입자가 가장 많이 궁금해하는 것만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 대항력 즉시 발생 제도는 정부 개선 계획이며, 시행 시점은 확인이 필요해요. 개별 사안은 법률구조공단(132)에 상담하세요." />
    </ArticleLayout>
  );
}
