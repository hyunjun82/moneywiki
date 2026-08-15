"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

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
      { label: "고용보험법: 광역구직활동비 지급 근거 (제64조)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙: 광역구직활동비 세부 기준", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 광역구직활동비 온라인 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 취업촉진수당 안내", url: "https://www.moel.go.kr" },
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
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
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
        &quot;서울 회사에서 면접 보라는데, KTX 왕복이 10만 원이 넘어요.&quot;
      </p>
      <p style={body}>
        실업급여 받는 입장에서 교통비까지 내고 면접 보러 가기가 부담스럽죠.
        그래서 만들어진 제도가 <strong>광역구직활동비</strong>예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에 근거한 제도이고,
        거주지에서 면접 장소까지 왕복 50km 이상이면 교통비와 숙박비를 돌려받을 수 있죠.
      </p>
      <p style={body}>
        문제는 이 제도를 모르고 지나치는 분이 많다는 거예요.
        면접비 때문에 좋은 기회를 날리면 안 되잖아요.
        얼마나 받을 수 있는지, 어떻게 신청하는지 지금부터 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 광역구직활동비란 */}
      <H2>광역구직활동비, 어떤 기준으로 지급되나요?</H2>
      <SectionBadge>수급 자격 체크</SectionBadge>

      <p style={body}>
        광역구직활동비는 취업촉진수당의 한 종류예요.
        실업급여 수급 중인 사람이 먼 곳에 면접을 보러 갈 때, 실제로 쓴 교통비와 숙박비를 돌려주는 구조죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이 근거 법령이에요.
        면접 한 번 갈 때마다 신청하는 방식이라, 먼 거리 면접이 잡힐 때마다 활용하면 돼요.
      </p>
      <p style={body}>
        핵심 조건은 <strong>거리</strong>예요.
        거주지에서 면접 장소까지 왕복 50km 이상이면 대상이 되죠.
        수급기간 동안 보통 <strong>5회</strong>까지 신청할 수 있고, 정확한 횟수는 개인 상황에 따라 다를 수 있으니 고용센터에서 확인하는 게 좋아요.
      </p>
      <p style={body}>
        비슷한 이름의 &quot;이주비&quot;랑 헷갈리는 분이 꽤 많죠.
        이주비는 <strong>취업이 확정된 뒤 이사 비용</strong>을 지원하는 제도예요.
        면접 보러 갈 때 쓰는 건 광역구직활동비, 취업 후 이사할 때 쓰는 건 이주비라고 구분하면 되고요.
        둘 다{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 신청할 수 있죠.
      </p>

      <GreenBox>
        대상: 실업급여 수급 중인 사람<br />
        조건: 거주지~면접 장소 왕복 50km 이상<br />
        지원: 교통비(실비) + 숙박비(1박 약 55,000원 한도) + 일비(25,000원)<br />
        주의: 면접 전 사전 신청 필수, 사후 신청은 인정 안 됨
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="광역구직활동비 지원 조건을 모두 충족해요. 면접 전에 고용24에서 사전 신청하세요."
        partialMatchText="일부 조건이 맞지 않아요. 체크 안 된 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 금액 계산 */}
      <H2>교통비와 숙박비, 금액이 얼마나 되나요?</H2>

      <p style={body}>
        교통비는 <strong>대중교통 실비</strong>로 돌려받아요.
        KTX, 고속버스, 시외버스: 실제로 탄 교통수단 요금을 영수증 기준으로 정산하는 방식이죠.
        자가용으로 갔다면 유류비 기준으로 계산하는데, 정산 과정이 좀 번거로워요.
        깔끔하게 처리하려면 대중교통을 이용하고 영수증을 바로 챙기는 게 편해요.
      </p>
      <p style={body}>
        당일 왕복이 어려운 면접이라면 숙박비까지 나와요.
        1박당 한도는 약 <strong>55,000원</strong>이고, 숙박 영수증을 제출해야 하죠.
        오전 면접이라 전날 이동해야 하거나, 면접이 저녁에 끝나서 복귀가 힘든 경우가 대표적이에요.
      </p>
      <p style={body}>
        숙박하면 일비(식비 포함)도 별도로 지급돼요.
        1일 약 <strong>25,000원</strong>이죠.
        교통비 + 숙박비 + 일비를 합산하면, 서울~부산 면접 1박 기준 약 15~20만 원 정도 돌려받을 수 있죠.
        아래 계산기로 본인 상황에 맞는 예상 금액을 바로 조회해보세요.
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

      {/* 섹션 3: 신청 절차와 체크리스트 */}
      <H2>광역구직활동비 신청 순서와 필요 서류</H2>
      <SectionBadge>신청 전 체크리스트</SectionBadge>

      <p style={body}>
        순서가 중요해요. <strong>면접 전에 사전 신청</strong>부터 해야 하죠.
        면접 다녀온 뒤에 &quot;교통비 돌려주세요&quot;라고 하면 거절당해요.
        면접 일정이 잡히면 바로{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하거나, 고용센터에 직접 방문해서 접수하면 돼요.
      </p>
      <p style={body}>
        승인이 나면 면접을 보러 가고, 끝나면 <strong>면접 확인서</strong>(회사 직인 필수)와 <strong>교통비 영수증</strong>을 제출해야 해요.
        면접 당일에 &quot;확인서 좀 발급해주세요&quot;라고 미리 요청하는 게 좋죠.
        회사에서 거부하는 일은 거의 없지만, 만약 그런 상황이면 고용센터에 상담을 요청하면 돼요.
      </p>
      <p style={body}>
        서류 확인이 끝나면 보통 1~2주 안에 통장으로 입금이 돼요.
        영수증을 잃어버리면 정산 자체가 안 되니까, 면접 당일에 바로 정리해두세요.
        고용24 앱에서 신청 진행 상황을 수시로 확인할 수 있고요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 주의사항 */}
      <H2>사후 신청 불가 등 기준을 지켜야 하는 이유</H2>

      <p style={body}>
        실수가 가장 잦은 부분이 <strong>사후 신청</strong>이에요.
        면접 보고 돌아온 뒤에야 &quot;이런 제도가 있었네&quot; 하고 뒤늦게 신청하면 지급이 안 되죠.
        실업급여 수급을 시작할 때 고용센터에서 제도 안내를 받아두면 이런 실수를 막을 수 있죠.
        첫 상담 때 &quot;광역구직활동비 신청 방법&quot;을 물어보는 게 좋죠.
      </p>
      <p style={body}>
        면접이 취소되거나, 실제로 면접을 보지 않은 경우에도 대상이 안 돼요.
        교통비를 이미 썼더라도 <strong>면접 확인서</strong>가 없으면 지급 자체가 불가능하죠.
        면접 당일에 반드시 확인서를 받아두고, 회사 직인이 찍혀 있는지까지 꼭 살펴보세요.
      </p>
      <p style={body}>
        횟수 제한도 빠뜨리면 안 돼요.
        수급기간 중 보통 <strong>5회</strong>까지 쓸 수 있고요.
        가까운 거리(50km 미만) 면접은 어차피 대상이 안 되니까, 정말 먼 거리 면접에만 집중해서 활용하는 게 효율적이죠.
        횟수를 아껴서 쓰되, 좋은 기회가 오면 주저하지 마세요.
      </p>

      <BorderBox>
        사전 신청: 면접 전에 고용24 또는 고용센터에서 접수해야 해요. 사후 신청은 안 됨<br />
        면접 확인서 + 영수증: 둘 중 하나라도 없으면 정산이 안 돼요<br />
        횟수 제한: 수급기간 중 보통 5회. 먼 거리 면접에만 쓰는 게 현명해요
      </BorderBox>

      <Divider />

      {/* 섹션 5: 실전 활용 */}
      <H2>면접 교통비, 이렇게 신청하면 놓치지 않아요</H2>

      <p style={body}>
        타 지역 회사에서 면접 연락이 오면, 가장 먼저 할 일은 <strong>거리 확인</strong>이에요.
        네이버 지도나 카카오맵에서 거주지~면접 장소 거리를 재보세요.
        왕복 50km가 넘으면 광역구직활동비 대상이니까, 교통비 부담 없이 면접에만 집중할 수 있죠.
        좋은 기회를 교통비 때문에 포기하면 정말 아까워요.
      </p>
      <p style={body}>
        숙박이 필요한 면접이라면 숙박비 영수증까지 꼭 챙기세요.
        전날 이동해서 하루 자고, 다음 날 면접을 보는 패턴이 가장 흔하죠.
        비즈니스 호텔이나 모텔 영수증이면 충분하고, 1박 한도 약 55,000원 이내로 잡으면 전액 돌려받을 수 있죠.
      </p>
      <p style={body}>
        광역구직활동비 말고도 실업급여 수급자가 받을 수 있는 수당이 여럿 있죠.
        <a href="/w/실업급여-직업능력개발수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>직업능력개발수당</a>(훈련 중 수당), <a href="/w/실업급여-조기재취업수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>(빨리 취업하면 보너스), 이주비(취업 후 이사 비용) 등이죠.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 내가 받을 수 있는 수당을 한번 훑어보세요.
        실업급여 외에 추가로 챙길 수 있는 돈을 놓치면 아깝잖아요.
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
