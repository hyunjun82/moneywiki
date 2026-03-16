"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

function calcTransport(distance: number): number {
  // 왕복 기준 교통비 (km당 약 180원, 대중교통 평균)
  if (distance <= 100) return Math.round(distance * 180);
  if (distance <= 200) return Math.round(distance * 160);
  return Math.round(distance * 140);
}

function calcAccommodation(nights: number): number {
  // 1박당 약 55,000원 한도
  return nights * 55000;
}

function calcDailyAllowance(nights: number): number {
  // 숙박 시 일비 25,000원
  return nights > 0 ? 25000 : 0;
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "실업급여 수급 중이에요 (수급자격 인정 완료)" },
  { id: "c2", label: "거주지에서 면접 장소까지 왕복 50km 이상이에요" },
  { id: "c3", label: "면접 확인서(회사 직인)를 받을 수 있어요" },
  { id: "c4", label: "교통비 영수증(KTX, 고속버스 등)을 보관하고 있어요" },
];

const CALC_SLIDERS = [
  { id: "distance", label: "왕복 거리", min: 50, max: 500, step: 10, defaultValue: 200, format: (v: number) => `${v}km` },
  { id: "nights", label: "숙박 일수", min: 0, max: 3, step: 1, defaultValue: 0, format: (v: number) => v === 0 ? "당일 왕복" : `${v}박` },
];

const CALC_RESULTS = [
  {
    label: "교통비 (왕복)",
    getValue: (v: Record<string, number>) => calcTransport(v.distance),
    format: (v: number) => `약 ${v.toLocaleString()}원`,
  },
  {
    label: "숙박비",
    getValue: (v: Record<string, number>) => calcAccommodation(v.nights),
    format: (v: number) => v === 0 ? "해당 없음" : `약 ${v.toLocaleString()}원`,
  },
  {
    label: "일비 (식비 포함)",
    getValue: (v: Record<string, number>) => calcDailyAllowance(v.nights),
    format: (v: number) => v === 0 ? "해당 없음" : `약 ${v.toLocaleString()}원`,
  },
  {
    label: "예상 총 지원금",
    getValue: (v: Record<string, number>) => calcTransport(v.distance) + calcAccommodation(v.nights) + calcDailyAllowance(v.nights),
    format: (v: number) => `약 ${v.toLocaleString()}원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "면접 일정이 확정되면 즉시 고용센터 또는 고용24에서 사전 신청하기",
  "거주지에서 면접 장소까지 거리를 지도 앱으로 확인하기",
  "대중교통(KTX, 고속버스 등) 영수증 반드시 보관하기",
  "면접 종료 후 회사에 면접 확인서(직인) 발급 요청하기",
  "면접 확인서와 교통비 영수증을 기한 내에 고용센터에 제출하기",
];

const FAQS = [
  {
    q: "자가용으로 가도 광역구직활동비를 받을 수 있나요?",
    a: "받을 수 있어요. 자가용은 유류비 기준으로 계산하죠. 다만 대중교통 영수증보다 정산이 복잡하니 가능하면 KTX나 고속버스 영수증을 준비하는 게 편해요.",
  },
  {
    q: "면접이 취소됐는데 이미 교통비를 썼으면 어떡하나요?",
    a: "면접 확인서가 없으면 지급이 안 돼요. 면접을 실제로 봤다는 증빙이 핵심이라, 교통비를 이미 지출했더라도 면접이 불발되면 지원 대상에서 빠지죠.",
  },
  {
    q: "수급기간 중 몇 번까지 신청할 수 있나요?",
    a: "수급기간 중 보통 5회까지 가능해요. 정확한 횟수는 개인 상황에 따라 달라질 수 있으니 고용센터(1350)에 확인하는 게 확실하죠.",
  },
  {
    q: "면접 다녀온 뒤에 사후 신청해도 되나요?",
    a: "원칙적으로 사전 신청만 인정돼요. 면접 일정이 잡히면 바로 고용24에서 신청하세요. 사후에 신청하면 지급이 거절되니까 순서를 꼭 지켜야 해요.",
  },
  {
    q: "광역구직활동비랑 이주비는 뭐가 다른가요?",
    a: "광역구직활동비는 면접 단계에서 쓰는 교통비 지원이에요. 이주비는 취업이 확정된 뒤 이사 비용을 지원하는 거죠. 면접 갈 때는 광역구직활동비, 취업 후 이사할 때는 이주비로 구분하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 광역구직활동비 지급 근거 (제64조)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 — 광역구직활동비 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 광역구직활동비 온라인 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 취업촉진수당 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-취업촉진수당",
    title: "취업촉진수당 종류와 신청 방법",
    description: "조기재취업수당, 광역구직활동비, 이주비를 한눈에 비교할 수 있어요.",
  },
  {
    slug: "실업급여-직업능력개발수당",
    title: "직업능력개발수당 조건과 신청",
    description: "훈련 수강 중 받을 수 있는 수당이에요. 교통비, 식비도 포함되죠.",
  },
  {
    slug: "실업급여-구직활동-횟수",
    title: "실업급여 구직활동 인정 횟수",
    description: "실업인정일마다 필요한 구직활동 횟수와 인정 기준을 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-광역구직활동비"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 광역구직활동비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        먼 곳 면접, 교통비 받을 수 있을까?<br />
        광역구직활동비 기준과 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부산에 사는데 서울 회사에서 면접 보라고 연락 왔어요. KTX 왕복 10만 원이 넘는데, 실업급여 받는 입장에서 교통비가 부담되죠.
        이런 상황에서 쓸 수 있는 제도가 <strong>광역구직활동비</strong>예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에 따라,
        거주지에서 면접 장소까지 일정 거리 이상 떨어진 곳에 면접을 보러 가면 교통비와 숙박비를 지원받을 수 있어요.
        면접비 때문에 좋은 기회를 놓칠 필요가 없죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 광역구직활동비란 */}
      <H2>광역구직활동비, 어떤 기준으로 지급되나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        실업급여 수급자가 멀리 있는 회사에 면접 보러 갈 때 드는 비용을 지원해주는 제도예요.
        취업촉진수당의 한 종류이고,{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 근거를 두고 있죠.
        교통비 부담 때문에 면접 자체를 포기하는 일이 없도록 만든 제도예요.
        한 번 면접 갈 때마다 신청하는 구조라서, 멀리 면접을 볼 때마다 활용할 수 있어요.
      </p>
      <p style={body}>
        지원 대상은 실업급여를 받고 있는 <strong>수급자</strong>예요.
        핵심 조건은 거주지에서 면접 장소까지의 거리이고, 이 기준을 충족하면 교통비와 숙박비를 실비로 돌려받을 수 있죠.
        수급기간 중 보통 <strong>5회</strong>까지 신청할 수 있어요.
        정확한 횟수는 개인 상황에 따라 달라질 수 있으니 고용센터에 확인하는 게 좋아요.
      </p>
      <p style={body}>
        비슷한 제도로 이주비가 있는데, 헷갈리는 분들이 많죠.
        이주비는 <strong>취업이 확정된 뒤 이사 비용</strong>을 지원하는 거예요.
        면접 단계에서 쓰는 건 광역구직활동비이고, 취업 후 이사할 때 쓰는 건 이주비라고 구분하면 돼요.
        둘 다{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 신청할 수 있죠.
      </p>

      <GreenBox title="광역구직활동비 핵심 요약">
        대상: 실업급여 수급 중인 사람<br />
        조건: 거주지에서 면접 장소까지 왕복 50km 이상<br />
        지원 항목: 교통비(실비) + 숙박비(실비, 한도 내) + 일비<br />
        신청: 면접 전 사전 신청 필수 (사후 신청 불가)
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="광역구직활동비 지원 조건을 모두 충족해요. 면접 전에 고용24에서 사전 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 체크 안 된 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 금액 계산 */}
      <H2>교통비와 숙박비, 금액이 얼마나 되나요?</H2>

      <p style={body}>
        교통비는 <strong>대중교통 실비</strong>로 지급돼요.
        KTX, 고속버스, 시외버스 등 실제 사용한 교통수단의 요금을 영수증 기준으로 돌려받는 구조예요.
        자가용을 이용한 경우에는 유류비 기준으로 계산하는데, 영수증 처리가 좀 더 복잡하죠.
        가능하면 대중교통을 이용하고 영수증을 챙기는 게 정산이 깔끔해요.
      </p>
      <p style={body}>
        숙박비는 면접 일정상 당일 왕복이 어려운 경우에 지원돼요.
        1박당 한도가 정해져 있고, 약 <strong>55,000원</strong> 수준이에요.
        면접이 오전이라 전날 이동해야 하거나, 면접이 늦게 끝나서 당일 복귀가 어려운 상황이면 숙박비까지 청구할 수 있죠.
        숙박 영수증도 반드시 보관해야 해요.
      </p>
      <p style={body}>
        숙박이 필요한 경우에는 일비(식비 포함)도 별도로 나와요.
        일비는 1일 약 <strong>25,000원</strong> 수준이죠.
        교통비 + 숙박비 + 일비를 합치면 서울에서 부산 면접을 보러 가는 경우 1박 기준으로 약 15~20만 원 정도 지원받을 수 있어요.
        아래 계산기에서 본인 상황에 맞게 예상 금액을 확인해보세요.
      </p>

      <Calculator
        title="광역구직활동비 예상 지원금"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 지급액은 영수증 기준 실비로, 고용센터 심사에 따라 달라질 수 있어요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차와 체크리스트 */}
      <H2>광역구직활동비 신청 순서와 필요 서류</H2>
      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        핵심부터 말하면, <strong>면접 전에 사전 신청</strong>해야 해요.
        면접 다녀온 뒤에 "교통비 돌려주세요"라고 하면 지급이 거절되죠.
        면접 일정이 잡히는 순간 바로{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하세요.
        고용센터에 직접 방문해서 신청해도 되고요.
      </p>
      <p style={body}>
        신청이 승인되면 면접을 보러 가요.
        면접이 끝난 뒤에는 <strong>면접 확인서</strong>(회사 직인 필요)와 <strong>교통비 영수증</strong>을 제출해야 하죠.
        면접 당일에 "확인서 발급 부탁드립니다"라고 회사에 미리 요청하세요.
        회사에서 거부하는 경우는 드물지만, 혹시 그런 상황이면 고용센터에 상담을 요청하면 돼요.
      </p>
      <p style={body}>
        서류가 확인되면 지급이 이뤄져요.
        보통 서류 제출 후 1~2주 안에 통장으로 입금되죠.
        영수증을 분실하면 정산이 어려워지니까, 면접 다녀온 당일에 바로 정리해두는 습관을 들이세요.
        고용24 앱에서 신청 진행 상황을 확인할 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 주의사항 */}
      <H2>사후 신청 불가 등 기준을 지켜야 하는 이유</H2>

      <p style={body}>
        가장 많이 실수하는 게 <strong>사후 신청</strong>이에요.
        면접 보고 나서 "아, 이런 제도가 있었네" 하고 뒤늦게 신청하면 지급이 안 되죠.
        제도를 미리 알고 있어야 활용할 수 있는 구조라서, 실업급여 수급을 시작할 때 고용센터에서 안내받는 게 좋아요.
        수급자격 인정 후 첫 상담 때 "광역구직활동비 신청 방법"을 물어보세요.
      </p>
      <p style={body}>
        면접이 취소되거나 실제로 면접을 보지 않은 경우에도 지급이 안 돼요.
        교통비를 이미 지출했더라도 <strong>면접 확인서</strong>가 없으면 대상에서 빠지죠.
        면접 확인서가 그만큼 중요한 서류예요.
        면접 당일에 반드시 받아두고, 회사 직인이 찍혀 있는지 확인하세요.
      </p>
      <p style={body}>
        횟수 제한도 기억하세요.
        수급기간 중 보통 <strong>5회</strong>까지 신청할 수 있어요.
        멀리 면접을 자주 봐야 한다면 횟수를 아껴서 써야 하죠.
        가까운 거리(50km 미만)의 면접은 대상이 안 되니까 굳이 신청할 필요 없고, 정말 먼 거리 면접에만 활용하는 게 효율적이에요.
      </p>

      <BorderBox title="반드시 기억할 3가지">
        면접 전 사전 신청 필수 &mdash; 사후 신청은 인정 안 됨<br />
        면접 확인서 + 교통비 영수증 &mdash; 둘 다 없으면 지급 불가<br />
        횟수 제한 &mdash; 수급기간 중 보통 5회까지
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 실전 활용 */}
      <H2>면접 교통비, 이렇게 신청하면 놓치지 않아요</H2>

      <p style={body}>
        실업급여 수급 중에 타 지역 회사에서 면접 제안이 오면 무조건 <strong>거리부터 확인</strong>하세요.
        네이버 지도나 카카오맵에서 거주지와 면접 장소 사이의 거리를 재면 되죠.
        왕복 50km 이상이면 광역구직활동비 대상이니, 교통비 걱정 없이 면접에 집중할 수 있어요.
        좋은 기회를 교통비 때문에 놓치는 건 정말 아까운 일이죠.
      </p>
      <p style={body}>
        숙박이 필요한 면접이라면 숙박비 영수증도 꼭 챙기세요.
        면접 전날 이동해서 숙박하고, 다음 날 면접을 보는 패턴이 가장 흔하죠.
        비즈니스 호텔이나 모텔 영수증이면 충분해요.
        1박당 한도가 약 55,000원이니까 그 범위 안에서 숙소를 잡으면 전액 돌려받을 수 있어요.
      </p>
      <p style={body}>
        광역구직활동비 말고도 실업급여 수급자를 위한 취업촉진수당이 여러 가지 있어요.
        직업능력개발수당(훈련 중 수당), 조기재취업수당(빨리 취업하면 보너스), 이주비(취업 후 이사 비용) 등이 있죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 내가 받을 수 있는 수당을 한번 확인해보세요.
        실업급여 외에 추가로 받을 수 있는 돈을 놓치면 아깝잖아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        광역구직활동비에 대해 실제로 많이 궁금해하는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 실제 지급 금액은 영수증 실비 기준이고, 고용센터 심사에 따라 달라질 수 있으니 상세한 내용은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
