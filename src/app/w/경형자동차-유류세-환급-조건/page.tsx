"use client";
// Q1. 경차를 타는데 유류세 환급 제도가 있다고 들었고 내가 받을 수 있는지 확인하려는 상황
// Q2. 환급 자격을 확인하고 경차사랑카드를 신청해서 연 30만원 유류세를 돌려받는다
// Q3. 대상 조건(배기량 1000cc 이하, 세대당 1대), 환급 한도 연 30만원, 리터당 250원, 카드사별 신청
// Q4. EligibilityChecker(자격 체크) + Steps(카드 신청 절차) + GreenBox(환급 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "cc", label: "배기량 1,000cc 이하 경형자동차를 소유하고 있다" },
  { id: "one", label: "세대 기준으로 경형 승용차 1대 또는 승합차 1대만 보유하고 있다" },
  { id: "name", label: "본인 명의로 등록된 차량이다 (리스 포함, 렌트 제외)" },
  { id: "notcorp", label: "법인·단체 명의가 아닌 개인 명의다" },
];

const STEPS = [
  {
    title: "경차사랑카드를 신청하세요",
    desc: "롯데·신한·현대카드 중 한 곳을 선택해서 경차사랑카드(유류구매 전용카드)를 신청해요. 체크카드와 신용카드 둘 다 가능해요. 차량등록증과 신분증을 준비하고, 온라인·전화·영업점 방문 중 편한 방법으로 신청하세요.",
    tip: "카드사 하나만 선택 가능 (중복 불가)",
  },
  {
    title: "경차사랑카드로 주유하세요",
    desc: "발급받은 카드로 주유소에서 결제하면 리터당 250원(LPG는 161원)이 자동으로 환급돼요. 별도 신청 없이 카드 결제만 하면 매월 자동 차감 또는 환급이 돼요. 1회 주유 한도는 6만원, 1일 12만원이에요.",
    tip: "리터당 250원(휘발유·경유), 161원(LPG)",
  },
  {
    title: "연 30만원 한도까지 환급받으세요",
    desc: "연간 최대 30만원까지 환급이 돼요. 매달 약 2.5만원씩 사용하면 연간 한도를 꽉 채울 수 있어요. 환급 현황은 카드사 앱이나 홈페이지에서 실시간 확인할 수 있어요.",
    tip: "연 30만원 한도 = 매달 약 2.5만원",
  },
];

const FAQS = [
  {
    q: "경차사랑카드는 어디서 신청하나요?",
    a: "롯데카드, 신한카드, 현대카드 중 한 곳에서 신청해요. 세 곳 중 하나만 선택 가능하고, 카드사를 바꾸면 이전 카드의 환급 기능은 정지돼요. 신용카드와 체크카드 모두 발급 가능해요.",
  },
  {
    q: "리스 차량도 환급 대상인가요?",
    a: "리스는 소유권이 본인에게 있으므로 환급 대상이에요. 렌트는 소유자가 렌트회사라서 대상이 아니에요. 차량등록증에 본인 이름이 있어야 해요.",
  },
  {
    q: "1회에 48리터 넘게 주유하면 어떻게 되나요?",
    a: "1회 48리터 초과 주유는 부정사용으로 간주돼서 환급이 제한돼요. 경차 연료탱크 용량이 보통 35~40리터인데, 이를 크게 초과하는 주유는 타인 차량 주유로 의심받을 수 있어요.",
  },
  {
    q: "이 제도는 언제까지 운영되나요?",
    a: "2026년 12월 31일까지 한시적으로 운영돼요. 매년 연장 여부가 결정되는데, 지금까지 계속 연장되어 왔어요. 경차 보급 촉진 취지라 당분간 유지될 가능성이 높아요.",
  },
  {
    q: "환급 한도가 남았는지 어떻게 확인해요?",
    a: "경차사랑카드를 발급받은 카드사 앱이나 홈페이지에서 '유류세 환급 현황'을 조회할 수 있어요. 매월 환급액과 연간 잔여 한도를 실시간으로 확인할 수 있어요.",
  },
  {
    q: "경형 승합차도 환급 대상인가요?",
    a: "네, 경형 승합차(다마스 등)도 대상이에요. 경형 승용차 1대 + 경형 승합차 1대를 동시에 보유하는 것도 가능해요. 다만 같은 유형(승용 2대, 승합 2대)은 안 돼요.",
  },
];

const RELATED = [
  { slug: "자동차세-감면", title: "자동차세 감면", description: "경차·전기차 자동차세 감면 혜택." },
  { slug: "경형자동차-세금-혜택", title: "경형자동차 세금 혜택", description: "경차 소유자가 받는 전체 세금 혜택." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "차량 취득세 계산법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>자동차 · 경차 · 유류세 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경차 타면 기름값 돌려받을 수 있다고?<br />
        유류세 환급 조건과 카드 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "경차를 사면 주유비를 아낄 수 있다는데, 어떻게 받는 거예요?"
      </p>
      <p style={body}>
        경형자동차 소유자는 <strong>연간 최대 30만원</strong>의 유류세를 돌려받을 수 있어요.
        경차사랑카드를 발급받으면 주유할 때 <strong>리터당 250원</strong>이 자동으로 빠져요.
        별도 신청 없이 카드로 결제만 하면 되니까 정말 간편해요.
        이 제도는 2026년 12월 31일까지 운영되는 한시적 혜택이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 유류세 환급 대상인지 체크하세요</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1775&ccfNo=2&cciNo=3&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면 배기량 1,000cc 이하 경형자동차를 개인 명의로 보유한 사람이 대상이에요. 세대 기준으로 1대만 보유해야 해요.
      </p>

      <SectionBadge>환급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="유류세 환급 대상이에요. 경차사랑카드를 신청하면 연 30만원까지 돌려받을 수 있어요."
        partialMatchText="일부 조건이 미충족이에요. 해당 항목을 확인해보세요."
      />

      <GreenBox>
        유류세 환급 계산 예시{"\n"}
        월 주유 100리터 x 250원 = 월 25,000원 환급{"\n"}
        연간 1,200리터 x 250원 = 연 30만원 (한도 도달){"\n"}
        LPG 차량: 리터당 161원, 연간 약 19.3만원 환급 가능
      </GreenBox>

      <CategoryButton label="자동차 정보" count={6} href="/category/자동차" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>경차사랑카드 신청부터 환급까지 이 순서예요</H2>
      <p style={body}>
        카드 발급 → 주유 결제 → 자동 환급 구조라 한 번만 설정하면 계속 혜택을 받을 수 있어요. 카드사는 롯데·신한·현대 중 하나만 선택할 수 있고, 나중에 바꿀 수도 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>주유할 때 이 규칙을 지키세요</H2>
      <p style={body}>
        환급 제도를 부정 사용하면 환급금 반환에 가산세까지 부과돼요. 다음 규칙을 꼭 지키세요.
      </p>

      <SectionBadge>주유 시 주의사항</SectionBadge>
      <BorderBox>
        <strong>결제 한도</strong>{"\n"}
        · 1회 6만원, 1일 12만원 이내{"\n"}
        · 1회 48리터 초과 시 부정사용 간주{"\n\n"}
        <strong>금지 사항</strong>{"\n"}
        · 타인 차량에 주유 금지 (경차 외 차량){"\n"}
        · 카드 타인 대여 금지{"\n"}
        · 부정사용 적발 시 환급금 반환 + 40% 가산세
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법을 바탕으로 작성했어요. 환급 제도는 2026년 12월 31일까지 한시 운영이에요." />
    </ArticleLayout>
  );
}
