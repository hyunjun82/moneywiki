"use client";

// Q1. 전세 계약을 앞두고 있는데 전세사기 뉴스를 보고 불안해서, 안전하게 계약하는 방법을 확인하려는 상황
// Q2. 계약 전 필수 체크 항목을 확인하고, 깡통전세를 판별해서 안전한 전세 계약을 체결한다
// Q3. 등기부등본 보는 법, 깡통전세 판별법(근저당+보증금÷시세), 전세보증보험 가입 가능 여부, 대리인·신탁 주의
// Q4. Checklist(예방 체크리스트) + GreenBox(깡통전세 계산) + Steps(등기부등본 확인법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CONFIRM_STEPS = [
  {
    title: "등기부등본을 발급받으세요",
    desc: "대법원 인터넷등기소(iros.go.kr)에서 700원이면 발급돼요. 갑구에서 소유자와 압류 여부를, 을구에서 근저당 채권최고액을 확인해요.",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
  {
    title: "실거래가로 시세를 확인하세요",
    desc: "국토교통부 실거래가 공개시스템(rt.molit.go.kr)에서 주변 매매가와 전세가를 비교해요. 보증금이 매매가의 80%를 넘으면 깡통전세 위험이에요.",
    link: { label: "실거래가 공개시스템", href: "https://rt.molit.go.kr" },
  },
  {
    title: "전세보증보험 가입 가능 여부를 조회하세요",
    desc: "HUG(1566-9009) 홈페이지에서 조회할 수 있어요. 가입이 안 되면 그 집은 위험하다는 신호예요. 보증금이 시세의 90%를 넘거나 선순위가 많으면 거절돼요.",
  },
  {
    title: "건축물대장과 세금 체납을 확인하세요",
    desc: "정부24에서 건축물대장을 발급받아 위반건축물 여부를 확인하고, 집주인에게 국세·지방세 완납증명서를 요청하세요. 세금 체납이 있으면 경매 때 세금이 먼저 배당돼요.",
  },
];

const PREVENT_CHECKLIST = [
  "등기부등본: 소유자·근저당·압류 확인 완료",
  "시세 확인: (근저당 + 내 보증금) ÷ 시세 = 80% 이하",
  "전세보증보험: HUG 가입 가능 확인 완료",
  "건축물대장: 위반건축물 아님 확인",
  "세금 체납: 국세·지방세 완납증명서 확인",
  "확정일자부 열람: 선순위 임차인 확인",
  "계약 당사자: 등기부 소유자 = 계약 상대방",
  "대리인이면: 위임장 + 인감증명서 + 집주인 직접 통화",
];

const FAQS = [
  {
    q: "전세사기 유형에는 어떤 게 있나요?",
    a: "깡통전세(근저당 과다), 이중계약, 대리인 사기, 신탁 물건 사기, 갭투자 실패 사기 등이 있어요. 빌라와 다세대주택에서 가장 많이 발생해요.",
  },
  {
    q: "빌라 전세가 특히 위험한 이유가 뭔가요?",
    a: "아파트와 달리 시세 파악이 어려워요. 실거래가가 적어서 시세를 부풀리기 쉽고, 깡통전세 비율이 높아요. 신축 빌라는 건축주가 갭투자 실패하는 경우가 많아서 더 위험해요.",
  },
  {
    q: "전세보증보험 가입 안 되면 어떻게 하나요?",
    a: "그 집은 계약하지 않는 게 좋아요. 가입 거절 사유가 있다는 건 위험 신호예요. 보증료 70~90만원으로 수억 원을 지킬 수 있으니 가입 가능한 집을 찾으세요.",
  },
  {
    q: "등기부에 '신탁' 글자가 보이면 어떻게 하나요?",
    a: "신탁 물건은 소유권이 신탁회사에 있어요. 신탁회사 동의 없이 체결한 임대차계약은 효력이 없을 수 있어요. 신탁원부를 발급받아 임대 가능 여부를 확인하세요.",
  },
  {
    q: "깡통전세 기준이 뭔가요?",
    a: "(근저당 채권최고액 + 선순위 보증금 + 내 보증금) ÷ 시세가 80%를 넘으면 깡통전세예요. 70% 이하가 안전 기준이에요. 경매 시 내 보증금을 돌려받을 여유가 있어야 해요.",
  },
  {
    q: "전세사기를 당했으면 어디에 신고하나요?",
    a: "경찰서에 사기죄로 고소하고, 전세사기피해지원센터(1533-8119)에 연락하세요. 임차권등기명령을 신청해서 대항력을 유지하고, 대한법률구조공단(132)에서 무료 법률 상담을 받으세요.",
  },
];

const SOURCES = [
  { name: "대법원 인터넷등기소", href: "https://www.iros.go.kr" },
  { name: "국토교통부 실거래가", href: "https://rt.molit.go.kr" },
  { name: "주택도시보증공사(HUG)", href: "https://www.khug.or.kr" },
];

const RELATED = [
  { slug: "전세보증보험", title: "전세보증보험", description: "보증금 보호를 위한 보험 가입 조건과 절차." },
  { slug: "확정일자", title: "확정일자", description: "전입신고와 확정일자로 우선변제권 확보하기." },
  { slug: "전세보증금-반환-절차", title: "전세보증금 반환 절차", description: "보증금 안 줄 때 단계별 대응 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 사기 예방</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세사기, 계약 전에 이것만 확인하세요<br />
        예방 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "설마 내가 당하겠어?" 이런 생각하다가 수억 원 날리는 거예요.
      </p>
      <p style={body}>
        전세사기는 사전에 확인만 잘 하면 <strong>90%는 예방</strong>할 수 있어요.
        등기부등본, 시세, 전세보증보험 가입 가능 여부.
        이 세 가지만 제대로 확인해도 대부분의 전세사기를 막을 수 있어요.
        아래 체크리스트를 하나씩 따라가세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약 전 필수 확인 4단계예요</H2>
      <p style={body}>
        이 네 가지를 안 하고 계약하면 안 돼요.
        순서대로 하나씩 확인하세요.
      </p>

      <Steps steps={CONFIRM_STEPS} />

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>깡통전세인지 어떻게 판별하나요?</H2>
      <p style={body}>
        깡통전세는 보증금을 돌려받을 수 없는 위험한 전세예요.
        간단한 계산으로 판별할 수 있어요.
      </p>

      <GreenBox>
        깡통전세 판별 공식{"\n"}
        (근저당 채권최고액 + 선순위 보증금 + 내 보증금) / 시세{"\n\n"}
        예시: 시세 5억, 근저당 2억, 선순위 0, 내 보증금 3억{"\n"}
        → (2억 + 0 + 3억) / 5억 = 100% → 깡통전세{"\n\n"}
        안전 기준: 70% 이하{"\n"}
        위험 기준: 80% 초과
      </GreenBox>

      <p style={body}>
        근저당 채권최고액은 등기부등본 을구에서 확인해요.
        채권최고액은 실제 대출금의 120~130% 수준이에요.
        <a href="https://rt.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>실거래가 공개시스템</a>에서 주변 시세를 꼭 비교하세요.
      </p>

      <Divider />

      <H2>전세사기 예방 체크리스트예요</H2>
      <p style={body}>
        계약 전에 하나씩 체크해 보세요.
        하나라도 빠지면 위험할 수 있어요.
      </p>

      <Checklist items={PREVENT_CHECKLIST} />

      <BorderBox>
        <strong>특히 주의해야 할 상황</strong>{"\n"}
        · 신축 빌라(준공 3년 이내) → 갭투자 실패 위험{"\n"}
        · 대리인 계약 → 위임장·인감증명서 필수, 집주인 직접 통화{"\n"}
        · 등기부에 "신탁" 표시 → 신탁회사 동의 없으면 계약 무효 위험{"\n"}
        · 전세보증보험 가입 불가 → 그 집은 피하세요
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 부동산 정보를 제공해요. 개별 물건의 위험도는 전문가 상담을 통해 판단하세요." />
    </ArticleLayout>
  );
}
