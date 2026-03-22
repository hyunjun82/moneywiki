"use client";

// Q1. 경차사랑카드로 유류세 환급받고 있는데, 잘못 쓰면 어떤 처벌을 받는지 궁금한 상황
// Q2. 부정사용 유형을 파악하고, 올바른 사용법을 지킨다
// Q3. 부정환급 유형(48L 초과, 카드 대여, 타 용도), 제재 내용(전액징수+40% 가산세), 올바른 사용법
// Q4. GreenBox로 제재 요약 + Checklist로 올바른 사용법 + BorderBox로 부정사용 유형

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "본인 명의 경차에만 주유 (2대면 카드도 각각 발급)",
  "1회 주유 48리터 이하, 1일 12만원 이하 지키기",
  "경차사랑카드 타인에게 절대 빌려주지 않기",
  "차량 연료 외 용도(난방·발전기)로 사용하지 않기",
  "주유 영수증 6개월 이상 보관해두기",
  "연간 환급 한도 30만원 초과 여부 수시 확인",
];

const FAQS = [
  { q: "경차 2대를 가지고 있는데, 카드 1장으로 번갈아 주유하면 부정사용인가요?", a: "네. 1대당 카드 1장이 원칙이에요. 2대면 각각 환급카드를 발급받아야 해요. 한 장으로 두 차에 넣으면 부정사용으로 적발돼요." },
  { q: "48리터 딱 맞춰서 주유했는데 문제없나요?", a: "48리터까지는 괜찮아요. 초과 분부터 부정사용으로 간주돼요. 경차 연료탱크가 보통 35~45리터니까, 여유 있게 45리터 선에서 끊는 게 안전해요." },
  { q: "환급받았다가 나중에 적발되면 시효가 있나요?", a: "국세 부과 제척기간은 5년이에요. 부정행위의 경우 7년까지 소급 추징할 수 있고요." },
  { q: "가족이 내 카드로 주유해도 부정사용인가요?", a: "네. 본인 명의 차량에 본인이 직접 주유해야 해요. 배우자라도 타인 대여에 해당돼요." },
  { q: "LPG 경차도 유류세 환급 대상인가요?", a: "네. 휘발유·경유·LPG 모두 환급 대상이에요. LPG는 리터당 161원 환급이에요." },
  { q: "경차사랑카드 말고 다른 카드로도 환급받을 수 있나요?", a: "유류세 환급 전용 카드만 가능해요. 신한·현대·롯데 등에서 발급하는 경차 전용 카드를 써야 하고, 일반 카드로는 환급 안 돼요." },
];

const SOURCES = [
  { name: "조세특례제한법 제111조의2", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "국세청 경차 유류세 환급제도", href: "https://www.nts.go.kr" },
  { name: "찾기쉬운생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1775&ccfNo=2&cciNo=3&cnpClsNo=1" },
];

const RELATED = [
  { slug: "경형자동차-유류세-환급-조건", title: "경차 유류세 환급 조건", description: "연 30만원 환급받는 대상 조건과 카드 발급법." },
  { slug: "자동차세-계산기", title: "자동차세 계산기", description: "내 차의 자동차세를 미리 계산해보세요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "차량 구매 시 취득세 계산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경차 유류세 · 제재</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경차 유류세 잘못 환급받으면?<br />
        부정사용 유형과 제재 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경차사랑카드로 주유비 할인받고 계시죠? 편리한 제도인데, 잘못 쓰면 환급받은 돈을 전부 토해내야 해요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제111조의2</a>에 따라 부정환급이 적발되면 환급세액 전액 징수에 40% 가산세까지 붙어요.
        연 30만원 환급받았다면 42만원을 내야 하는 거예요. 어떤 경우가 부정사용이고, 어떻게 피할 수 있는지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>부정환급 제재, 얼마나 무거운가요?</H2>
      <p style={body}>
        제재는 세 가지예요. 가볍지 않아요.
      </p>

      <GreenBox>
        환급세액 전액 징수: 환급받은 금액 100% 반환{"\n"}
        40% 가산세 추가: 환급세액의 40%를 가산세로 추가 부과{"\n"}
        지원 대상 제외: 반복·악의적 부정사용 시 향후 환급 자격 박탈
      </GreenBox>

      <p style={body}>
        예를 들어 연간 30만원 환급받았는데 부정사용으로 걸리면, 30만원 + 가산세 12만원 = 42만원을 내야 해요.
        국세청은 주유 패턴을 전산으로 모니터링하고 있어서, 비정상적인 주유량이나 빈도가 감지되면 조사가 들어와요.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떤 경우가 부정사용인가요?</H2>
      <p style={body}>
        국세청이 부정사용으로 보는 유형은 크게 4가지예요.
      </p>

      <BorderBox>
        <strong>1회 48리터 초과 주유</strong> — 경차 연료탱크는 35~45리터예요. 48리터를 넘으면 다른 차에 넣었다고 판단해요.{"\n\n"}
        <strong>카드 대여·양도</strong> — 본인이 아닌 다른 사람이 카드를 사용하면 즉시 부정사용이에요. 가족이라도 안 돼요.{"\n\n"}
        <strong>연료 외 용도 사용</strong> — 주유한 연료를 난방용이나 발전기 등 차량 외 용도로 쓰면 해당돼요.{"\n\n"}
        <strong>1일 12만원 초과 결제</strong> — 하루 주유 금액 한도를 넘기면 초과분 환급이 제한돼요.
      </BorderBox>

      <Divider />
      <ArticleAd position="middle" />

      <H2>이렇게 쓰면 안전해요</H2>
      <p style={body}>
        제재받지 않으려면 아래 체크리스트대로만 하면 돼요.
      </p>

      <SectionBadge>올바른 사용 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>환급카드 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>실제로 많이 헷갈리는 부분을 정리했어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법을 바탕으로 작성했어요. 환급 한도·제재 기준은 법 개정에 따라 달라질 수 있으니 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
