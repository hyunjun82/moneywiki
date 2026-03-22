"use client";

// Q1. 아이가 있는 부모가 아동수당을 받을 수 있는지, 얼마인지, 어떻게 신청하는지 궁금한 상황
// Q2. 아동수당 지급 대상과 금액을 확인하고 신청한다
// Q3. 대상(만 8세 미만), 금액(월 10만원), 신청 방법(출생신고 시 자동/복지로/주민센터), 부모급여와의 관계
// Q4. GreenBox(결론 요약) + Steps(신청 방법) + BorderBox(부모급여 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "출생신고 시 행복출산 원스톱으로 신청하세요",
    desc: "출생신고할 때 '행복출산 원스톱 서비스'에서 아동수당을 함께 신청할 수 있어요. 별도로 따로 신청할 필요 없이 출생신고와 동시에 처리돼요.",
    tip: "정부24(gov.kr)에서 온라인 출생신고 시에도 같이 신청 가능",
  },
  {
    title: "이미 출생신고를 했다면 복지로나 주민센터에서 신청하세요",
    desc: "복지로(bokjiro.go.kr) 온라인 신청이 가능해요. 또는 주민센터에 방문해서 신청할 수도 있어요. 신청 서류는 신분증, 통장 사본이 기본이에요.",
    link: { label: "복지로 바로가기", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "매월 25일에 입금을 확인하세요",
    desc: "신청이 완료되면 매월 25일에 신청한 계좌로 10만원이 입금돼요. 25일이 주말이면 직전 영업일에 들어와요. 만 8세 생일 전달까지 받을 수 있어요.",
  },
];

const FAQS = [
  {
    q: "아동수당은 누가 받나요?",
    a: "만 8세 미만(0~95개월) 모든 아동이 대상이에요. 소득이나 재산 기준 없이 보편 지급돼요. 대한민국 국적 아동이면 다 받을 수 있어요.",
  },
  {
    q: "부모급여랑 같이 받을 수 있나요?",
    a: "네, 같이 받을 수 있어요. 부모급여(0~1세)와 아동수당(0~7세)은 별개 제도라서 중복 수급이 돼요. 0세 아이라면 부모급여 100만원 + 아동수당 10만원으로 월 110만원이에요.",
  },
  {
    q: "신청을 깜빡했어요. 소급 적용되나요?",
    a: "출생 후 60일 이내에 신청하면 출생일부터 소급 지급돼요. 60일이 지나면 신청한 달부터 받을 수 있어요. 늦게 신청할수록 손해니까 빨리 하세요.",
  },
  {
    q: "아동수당 입금일이 변경됐나요?",
    a: "기본 입금일은 매월 25일이에요. 25일이 토요일이면 금요일, 일요일이면 월요일에 입금돼요. 지자체 사정에 따라 며칠 차이가 날 수 있어요.",
  },
  {
    q: "해외에 거주하면 받을 수 없나요?",
    a: "90일 이상 해외에 체류하면 지급이 정지돼요. 귀국하면 다시 지급이 재개돼요. 해외 체류 사유가 유학이면 예외가 될 수 있어요.",
  },
  {
    q: "만 8세가 되면 자동으로 끊기나요?",
    a: "네, 만 8세 생일이 속하는 달의 전달까지 지급되고 그 다음 달부터 자동 중단돼요. 별도로 해지 신청할 필요 없어요.",
  },
];

const SOURCES = [
  { name: "아동수당법", href: "https://www.law.go.kr/법령/아동수당법" },
  { name: "복지로", href: "https://www.bokjiro.go.kr" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "부모급여-지원금액-신청방법", title: "부모급여 지원 금액과 신청", description: "0~1세 아이 부모급여 월 100만원." },
  { slug: "자녀장려금", title: "자녀장려금 신청 방법", description: "자녀 1인당 최대 100만원 지원." },
  { slug: "육아휴직급여", title: "육아휴직급여 조건과 금액", description: "육아휴직 중 받을 수 있는 급여." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>육아 지원 · 아동수당 · 정부 지원금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아동수당, 누가 얼마나 받나요?<br />
        지급 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "아이가 태어났는데 아동수당은 알아서 나오는 건가요?"
      </p>
      <p style={body}>
        만 8세 미만 아동이면 소득·재산 상관없이 <strong>월 10만원</strong>을 받아요.
        <a href="https://www.law.go.kr/법령/아동수당법" style={{ color: "#1D9E75", textDecoration: "underline" }}>아동수당법</a>에 근거한 보편 지급 제도예요.
        출생신고할 때 같이 신청하면 별도 절차 없이 바로 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>아동수당 지급 조건은?</H2>
      <p style={body}>
        대한민국 국적의 만 8세 미만(0~95개월) 아동이면 누구나 받을 수 있어요.
        소득이나 재산 기준이 없는 보편 지급이에요.
      </p>

      <GreenBox title="아동수당 핵심 요약">
        {"대상: 만 8세 미만(0~95개월) 모든 아동\n금액: 월 10만원\n입금일: 매월 25일\n소득·재산 기준: 없음 (보편 지급)\n\n만 8세 생일 전달까지 지급\n부모급여와 중복 수급 가능"}
      </GreenBox>

      <CategoryButton label="육아 지원" count={8} href="/category/육아" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>아동수당 신청은 이렇게 해요</H2>
      <p style={body}>
        가장 편한 건 출생신고할 때 같이 하는 거예요.
        이미 출생신고를 했다면 온라인이나 주민센터에서 따로 신청하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>부모급여랑 같이 받을 수 있나요?</H2>
      <p style={body}>
        네, 같이 받을 수 있어요. 아동수당과 <a href="/w/부모급여-지원금액-신청방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>부모급여</a>는 별개 제도라서 중복 수급이 돼요.
      </p>

      <BorderBox>
        <strong>0세 아이 기준 월 수령액</strong>{"\n"}
        · 부모급여: 100만원 (2026년 기준){"\n"}
        · 아동수당: 10만원{"\n"}
        · 합계: 월 110만원{"\n"}
        {"\n"}
        1세 아이 기준{"\n"}
        · 부모급여: 50만원{"\n"}
        · 아동수당: 10만원{"\n"}
        · 합계: 월 60만원{"\n"}
        {"\n"}
        2세~7세: 아동수당 10만원만 지급 (부모급여 종료)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 아동수당법 기준으로 작성했어요. 지급 금액, 대상, 입금일은 법 개정에 따라 바뀔 수 있으니 최신 내용은 복지로 또는 주민센터에서 확인해 주세요." />
    </ArticleLayout>
  );
}
