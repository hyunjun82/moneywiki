"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     이사를 앞두고 자녀 학교 전학 절차를 준비하는 학부모, 특히 학교급별 차이가 헷갈리는 상황.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     초·중·고 학교급별로 필요한 서류를 준비하고 전학 신청을 할 수 있다.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     초등(전입신고→자동배정), 중등(교육지원청 신청), 고등(학군 변경 필요), 필요 서류 목록.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable(학교급별 비교) + Steps(단계별 절차) + Checklist(서류 목록) + FAQ.

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARISON_TABLE = {
  headers: ["학교급", "전학 가능 조건", "신청 기관", "핵심 서류"],
  rows: [
    ["초등학교", "이사 후 전입신고만으로 가능", "주민센터 (자동 배정)", "취학아동 전입통지서, 생활기록부"],
    ["중학교", "이사 후 교육지원청 신청", "관할 교육지원청", "전학용 재학증명서, 주민등록등본"],
    ["고등학교", "학군 또는 시도가 바뀌어야만 가능", "이사한 지역 교육청", "주민등록등본, 전학용 재학증명서"],
  ],
};

const ELEMENTARY_STEPS = [
  { title: "전입신고", desc: "이사한 집 관할 주민센터에서 전입신고 후 취학아동 전입통지서 발급" },
  { title: "서류 발급", desc: "원래 학교에서 전학용 재학증명서와 생활기록부 발급" },
  { title: "새 학교 제출", desc: "배정된 학교에 취학아동 전입통지서, 재학증명서, 생활기록부 제출" },
];

const MIDDLE_STEPS = [
  { title: "전입신고", desc: "주민센터에서 전입신고 완료" },
  { title: "교육지원청 방문", desc: "거주지 관할 교육지원청에 전학용 재학증명서 제출, 학교 배정 신청" },
  { title: "새 학교 등록", desc: "배정받은 중학교에 전학용 재학증명서와 주민등록등본 제출" },
];

const HIGH_CHECKLIST = [
  "이사 전: 이사할 지역이 현재 학군과 다른 시도인지 확인",
  "이사 후: 주민센터에서 전입신고 및 주민등록등본 발급",
  "원래 학교에서 전학용 재학증명서 발급",
  "이사한 지역 관할 교육청에 주민등록등본 제출 후 학교 배정 신청",
  "특성화고·특목고·자사고는 해당 교육청에 별도 문의 필수",
];

const FAQS = [
  {
    q: "초등학교 전학은 학교를 직접 선택할 수 있나요?",
    a: "아니에요. 의무교육이라 거주지 기준으로 자동 배정돼요. 학교 선택권은 없지만 절차가 제일 간단해요.",
  },
  {
    q: "중학교 3학년도 전학 갈 수 있나요?",
    a: "고입 신입생 입시공고일(보통 10월) 이전까지만 전학이 가능해요. 입시공고일 이후에는 전학이 안 돼요.",
  },
  {
    q: "서울 강남구에서 서울 송파구로 이사하면 고등학교 전학이 되나요?",
    a: "안 돼요. 같은 서울 안에서 이사하면 시도가 바뀌지 않아서 고등학교 전학이 불가해요. 서울에서 경기도로 이사해야 전학이 가능해요.",
  },
  {
    q: "학기 중에 전학해도 되나요?",
    a: "법적으로는 언제든 가능해요. 하지만 아이 적응을 위해 학기 초나 방학 중이 낫고, 이사 일정이 정해졌다면 통학 거리 때문에 빨리 전학하는 게 나을 수 있어요.",
  },
  {
    q: "서류를 정부24에서 온라인으로 발급받을 수 있나요?",
    a: "주민등록등본은 정부24에서 온라인 발급이 돼요. 전학용 재학증명서와 생활기록부는 원래 학교에서 발급받아야 해요.",
  },
  {
    q: "특성화고나 자사고도 같은 절차인가요?",
    a: "아니에요. 학교 유형별로 전학 규정이 다를 수 있어요. 해당 학교나 교육청에 직접 문의하는 게 정확해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "초·중등교육법 (전학 절차 근거)", url: "https://www.law.go.kr/법령/초·중등교육법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "정부24 (주민등록등본 온라인 발급)", url: "https://www.gov.kr" },
      { label: "서울특별시교육청", url: "https://www.sen.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "전입신고-방법",
    title: "전입신고 방법과 필요 서류",
    description: "이사 후 14일 이내에 해야 하는 전입신고 절차와 준비 서류를 정리했어요.",
  },
  {
    slug: "주민등록등본-발급",
    title: "주민등록등본 발급 방법",
    description: "주민센터 방문, 정부24 온라인, 무인발급기로 발급하는 방법이에요.",
  },
  {
    slug: "학교생활기록부",
    title: "학교생활기록부 열람과 발급",
    description: "학교생활기록부를 발급받는 방법과 열람 권한에 대해 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 이사 · 전학 절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이사 후 전학 절차, 초·중·고가 다른가요?<br />
        학교급별 서류와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;초등학교, 중학교, 고등학교 전학 절차가 다르다던데 뭘 준비해야 하나요?&rdquo;
      </p>
      <p style={body}>
        학교급마다 신청 기관과 조건이 달라요. 초등학교는 전입신고로 자동 배정, 중학교는 교육지원청 신청, 고등학교는 학군이 바뀌어야만 전학이 가능해요.
        <a href="https://www.law.go.kr/법령/초·중등교육법" style={{ color: "#1D9E75", textDecoration: "underline" }}>초·중등교육법</a>에 따른
        학교급별 전학 절차와 필요 서류를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 학교급별 비교 */}
      <H2>초·중·고 전학, 어떻게 다른가요?</H2>
      <SectionBadge>학교급별 비교</SectionBadge>

      <DocTable headers={COMPARISON_TABLE.headers} rows={COMPARISON_TABLE.rows} />

      <GreenBox>
        초등: 전입신고 → 자동 배정 (가장 간단)<br />
        중등: 전입신고 → 교육지원청 방문 신청 → 배정<br />
        고등: 학군/시도 변경 시에만 가능 → 교육청에 신청
      </GreenBox>

      <Divider />

      {/* 섹션 2: 초등학교 */}
      <H2>초등학교 전학은 어떻게 하나요?</H2>

      <p style={body}>
        초등학교는 의무교육이라 거주지 기준으로 학교가 자동 배정돼요.
        주민센터에서 <a href="/w/전입신고-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>전입신고</a>를 하면서
        취학아동 전입통지서를 받으면 배정된 학교 이름이 적혀 있어요.
      </p>

      <Steps steps={ELEMENTARY_STEPS} />

      <p style={body}>
        서류를 제출하면 당일 또는 다음 날부터 등교할 수 있어요. 학교 선택권은 없지만 절차가 제일 간단해요.
      </p>

      <CategoryButton label="생활 정보" count={10} href="/category/생활" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 중학교 */}
      <H2>중학교 전학은 어떻게 하나요?</H2>
      <SectionBadge>중학교 절차</SectionBadge>

      <p style={body}>
        중학교는 주민센터가 아니라 거주지 관할 교육지원청에 가야 해요.
        서울은 동부·서부·남부·북부교육지원청으로 나뉘어 있고, 경기도는 시군별 교육지원청을 방문하면 돼요.
      </p>

      <Steps steps={MIDDLE_STEPS} />

      <p style={body}>
        중학교 3학년은 주의가 필요해요. 고입 신입생 입시공고일(보통 10월) 이전까지만 전학이 가능하고, 그 이후에는 전학이 안 돼요.
        중학교도 의무교육이라 거주지 기준으로 배정되지만, 교육지원청을 거쳐야 한다는 점이 초등학교와 달라요.
      </p>

      <BorderBox>
        중학교 3학년은 고입 입시공고일 이전까지만 전학 가능해요.<br />
        시기를 놓치면 다음 학년까지 기다려야 하니 미리 알아봐요.
      </BorderBox>

      <Divider />

      {/* 섹션 4: 고등학교 */}
      <H2>고등학교 전학은 조건이 까다로워요</H2>

      <p style={body}>
        고등학교는 &ldquo;거주지가 학군 또는 시도를 벗어나 이전된 경우&rdquo;에만 전학이 가능해요.
        서울에서 경기도로 이사하면 전학이 가능하지만, 서울 강남구에서 서울 송파구로 이사하면 전학이 안 돼요.
      </p>
      <p style={body}>
        전학 신청은 이사한 지역 관할 교육청에 주민등록등본을 제출해서 학교를 배정받는 방식이에요.
        배정받은 학교 소재 학교군 내에서는 거주지를 다시 이전해도 또 전학을 할 수 없어요.
      </p>

      <Checklist items={HIGH_CHECKLIST} />

      <p style={body}>
        특성화고, 특목고, 자사고 등은 전학 규정이 다를 수 있어요.
        반드시 해당 교육청이나 학교에 직접 문의해서 확인해야 해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        전학 절차에 대해 학부모들이 많이 물어보는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 초·중등교육법을 바탕으로 작성됐어요. 교육청별로 세부 절차가 다를 수 있으니, 해당 교육지원청에 문의해 주세요." />
    </ArticleLayout>
  );
}
