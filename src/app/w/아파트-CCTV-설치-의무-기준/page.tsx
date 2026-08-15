"use client";
// Q1. 우리 아파트에 CCTV를 의무적으로 달아야 하는지, 기준이 뭔지 궁금한 상황이에요.
// Q2. 의무 설치 대상인지 확인하고 관리사무소에 설치 요청/점검하는 행동.
// Q3. 300세대 이상 기준, 설치 장소, 화소 기준, 보관 기간, 위반 시 과태료.
// Q4. EligibilityChecker(대상 확인) + GreenBox(설치 기준) + Checklist(점검 항목) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "units300", label: "300세대 이상 아파트예요" },
  { id: "units150", label: "150세대 이상이고 승강기가 설치돼 있어요" },
  { id: "units150h", label: "150세대 이상이고 중앙집중식 난방이에요" },
];

const CHECK_ITEMS = [
  "각 동 출입구에 카메라가 설치돼 있는지 확인",
  "승강기 내부에 카메라가 있는지 확인",
  "어린이놀이터에 카메라가 설치돼 있는지 확인",
  "지하주차장 출입구·통로에 카메라가 있는지 확인",
  "야간에도 식별 가능한 화질(130만 화소 이상)인지 확인",
  "영상 저장 기간이 30일 이상인지 관리사무소에 문의",
];

const FAQS = [
  { q: "모든 아파트가 CCTV 의무 설치 대상인가요?", a: "아니에요. 300세대 이상이거나, 150세대 이상이면서 승강기 또는 중앙난방이 있는 아파트만 해당돼요. 소규모 빌라나 다세대주택은 의무가 아니에요." },
  { q: "CCTV 해상도 기준은 어떻게 되나요?", a: "130만 화소 이상이어야 해요. 사람의 얼굴이나 차량 번호판을 식별할 수 있는 수준이에요." },
  { q: "영상은 얼마나 보관해야 하나요?", a: "30일 이상 보관이 의무예요. 관리사무소가 이를 위반하면 과태료 대상이에요." },
  { q: "CCTV 교체 비용은 누가 부담하나요?", a: "장기수선계획에 반영해서 수선충당금으로 처리해요. 입주자 대표회의에서 결정하는 사항이에요." },
  { q: "의무를 지키지 않으면 과태료가 얼마나 나오나요?", a: "500만원 이하의 과태료가 부과돼요. 관리주체(관리사무소장)가 책임을 져요." },
  { q: "개인정보 보호법과 충돌하지 않나요?", a: "공동주택 CCTV는 개인정보보호법 제25조에 따라 안전을 위해 설치가 허용돼요. 다만 설치 목적 외 열람은 제한되고, 열람 절차를 거쳐야 해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "공동주택관리법 시행령(법제처)", url: "https://www.law.go.kr/법령/공동주택관리법시행령" },
    { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" },
  ]},
];

const RELATED = [
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 업무와 역할", description: "CCTV 관리 포함, 관리사무소장의 법적 업무를 정리했어요." },
  { slug: "공중화장실-설치기준-관리기준", title: "공중화장실 설치·관리 기준", description: "공공시설 설치 의무 기준이 궁금하다면 참고하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공동주택</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        우리 아파트, CCTV 의무 설치 대상일까?<br />
        설치 기준과 화소·보관 규정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아파트 복도나 주차장에 CCTV가 없어서 불안하다면, 우리 단지가 의무 설치 대상인지 먼저 확인해보세요.
        300세대 이상이면 무조건 설치해야 하고, 150세대 이상이면서 승강기나 중앙난방이 있어도 해당돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>우리 아파트가 의무 설치 대상인지 확인해보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공동주택관리법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법 시행령</a>에서
        의무관리대상 아파트를 정하고 있어요. 아래 중 하나라도 해당되면 CCTV 설치 의무가 있어요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="CCTV 의무 설치 대상이에요"
        partialMatchText="하나라도 해당되면 의무 설치 대상이에요"
      />

      <Divider />

      <H2>어디에, 어떤 기준으로 설치해야 하나요?</H2>
      <p style={body}>
        설치 장소와 화질에도 법적 기준이 정해져 있어요. 대충 달아놓으면 안 되고, 식별 가능한 수준이어야 해요.
      </p>

      <GreenBox title="법정 설치 기준">
        · 각 동 출입구 + 승강기 내부 + 어린이놀이터: 필수<br />
        · 지하주차장 출입구·통로: 필수<br />
        · 화소: 130만 화소 이상<br />
        · 영상 보관: 30일 이상<br />
        · 위반 시: 500만원 이하 과태료
      </GreenBox>

      <Divider />

      <H2>우리 아파트 CCTV, 제대로 설치돼 있는지 점검해보세요</H2>
      <p style={body}>
        의무 설치 대상이라면 아래 항목을 기준으로 현재 설치 상태를 확인해볼 수 있어요.
        문제가 있다면 관리사무소에 개선을 요청하세요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 공동주택관리법 시행령을 기준으로 작성됐어요. 지자체별 추가 조례가 있을 수 있으니 관할 지자체에 확인하세요." />
    </ArticleLayout>
  );
}
