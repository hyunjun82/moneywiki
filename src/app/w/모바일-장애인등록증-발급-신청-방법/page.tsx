"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     장애인등록증을 스마트폰에 저장하고 싶은데 발급 방법을 모르는 장애인 본인 또는 보호자
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     행정복지센터에 신분증과 본인 명의 스마트폰을 가져가서 모바일 등록증을 발급받는다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     신청 자격(14세 이상), 준비물(신분증+본인명의폰), 발급 방법 2가지(QR/IC), 사용처
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     Steps(발급 절차) + DocTable(준비물) + GreenBox(요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "가까운 행정복지센터(주민센터) 방문",
    desc: "신분증과 본인 명의 스마트폰을 가져가세요. 발급 비용은 무료예요. 기존 플라스틱 장애인등록증이 있어야 모바일 등록증을 추가로 발급받을 수 있어요.",
  },
  {
    title: "QR코드 촬영으로 당일 발급 (추천)",
    desc: "담당자가 QR코드를 출력해주면 스마트폰 카메라로 촬영하세요. 바로 발급이 완료돼요. 이 방법이 가장 빠르고 간편해요.",
    tip: "IC칩 등록증 접촉 방식도 있지만, IC등록증을 먼저 신청해야 해서 시간이 더 걸려요",
  },
  {
    title: "앱에서 등록증 확인",
    desc: "발급이 완료되면 스마트폰 앱에 장애인등록증이 저장돼요. 필요할 때 앱을 실행해서 화면을 보여주면 돼요.",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증, 운전면허증 등)", required: true, where: "본인 지참" },
  { name: "본인 명의 스마트폰", required: true, where: "반드시 본인 명의 (가족 명의 불가)" },
  { name: "기존 플라스틱 장애인등록증", required: true, where: "기존 보유 (없으면 먼저 발급)" },
];

const FAQS = [
  {
    q: "발급 비용이 있나요?",
    a: "무료예요. 행정복지센터에서 비용 없이 발급받을 수 있어요.",
  },
  {
    q: "플라스틱 등록증이 있는데 모바일도 같이 쓸 수 있나요?",
    a: "네. 둘 다 유효해요. 모바일 등록증은 추가 발급이라서 기존 등록증도 계속 사용할 수 있어요.",
  },
  {
    q: "모바일 등록증으로 은행에서 신분증 확인이 되나요?",
    a: "2026년 2월부터 일부 금융기관에서 본인확인 신분증으로 사용 가능해요. 연말까지 모든 금융기관으로 확대될 예정이에요.",
  },
  {
    q: "14세 미만도 발급 가능한가요?",
    a: "아니에요. 14세 미만은 신청이 제한돼요. 14세 이상 미성년자는 법정대리인 동의가 필요해요.",
  },
  {
    q: "스마트폰을 바꾸면 어떻게 되나요?",
    a: "새 스마트폰으로 다시 발급받아야 해요. 행정복지센터를 다시 방문해서 같은 절차로 재발급하면 돼요.",
  },
  {
    q: "지적·자폐성·정신 장애인은 어떻게 신청하나요?",
    a: "보호자 동의가 필요해요. 보호자가 동행해서 동의서를 작성하면 발급받을 수 있어요.",
  },
  {
    q: "문의는 어디로 하면 되나요?",
    a: "가까운 행정복지센터 또는 모바일 신분증 콜센터 1688-0990으로 전화하면 돼요.",
  },
];

const SOURCES = [
  { name: "보건복지부 모바일 장애인등록증 안내", href: "https://www.mohw.go.kr" },
  { name: "정책브리핑 보도자료", href: "https://www.korea.kr/news/policyNewsView.do?newsId=148958372" },
];

const RELATED = [
  { slug: "장애인-복지카드-혜택", title: "장애인 복지카드 혜택", description: "장애인 복지카드로 받을 수 있는 할인과 혜택." },
  { slug: "장애인-등록-절차", title: "장애인 등록 절차", description: "처음 장애인 등록하는 방법과 준비물." },
  { slug: "장애인-연금-신청", title: "장애인 연금 신청", description: "장애인 연금 대상과 신청 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 장애인 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        모바일 장애인등록증, 어떻게 발급받을까?<br />
        신청 방법부터 사용처까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인등록증 들고 다니기 불편하셨죠? 이제 스마트폰에 저장해서 쓸 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.mohw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>보건복지부</a>에서 2026년 1월 22일부터 모바일 장애인등록증을 무료로 발급해요. 가까운 행정복지센터에 신분증과 본인 명의 스마트폰만 가져가면 당일 발급이 돼요. 2월부터는 금융기관에서 신분증 대용으로도 사용할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>발급 절차, 이렇게 하면 돼요</H2>
      <p style={body}>
        QR코드 방식이 가장 간편해요. 방문부터 발급까지 10분이면 끝나요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>준비물 체크해요</H2>
      <p style={body}>
        빠뜨리면 다시 와야 하니 꼭 챙기세요.
      </p>

      <SectionBadge>준비물</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>어디서 사용할 수 있나요?</H2>
      <p style={body}>
        기존 플라스틱 등록증을 쓰던 곳이면 어디든 사용 가능해요.
      </p>

      <GreenBox>
        행정기관: 주민센터, 구청 민원 처리{"\n"}
        교통: 지하철, 버스 할인 확인{"\n"}
        공공시설: 박물관, 미술관, 공원 입장료 할인{"\n"}
        금융기관: 2026년 2월부터 일부 → 연말까지 전 금융기관 확대{"\n"}
        온라인: 장애인 자격 확인이 필요한 웹사이트
      </GreenBox>

      <p style={body}>
        금융위원회에서 모바일 장애인등록증을 금융거래 실명확인증표로 인정했어요. 은행에서 주민등록증 없이 모바일 등록증만으로 업무를 볼 수 있게 되는 거예요.
      </p>

      <CategoryButton label="복지 정보" count={6} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>발급 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        궁금한 점을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 보건복지부 발표를 바탕으로 작성했어요. 금융기관 확대 일정은 변동될 수 있으니 행정복지센터 또는 콜센터(1688-0990)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
