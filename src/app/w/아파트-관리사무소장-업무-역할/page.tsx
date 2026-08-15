"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     새 아파트에 이사하거나 입주자대표회의에 참여하면서 관리사무소장이 어떤 일을 하는지 궁금한 입주자.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     관리사무소장 업무 범위를 파악하고 민원 제기나 해임 절차를 이해할 수 있다.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     4대 핵심 업무, 주택관리사 자격 요건, 선임 절차, 권한과 책임(횡령·배임 처벌).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     Checklist(4대 업무) + BorderBox(자격 요건) + DocTable(선임 방법) + FAQ.

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DUTIES_ITEMS = [
  "시설 운영·관리: 엘리베이터 점검, 소방시설 검사, 외벽 도색, 수도관 교체 등",
  "관리비·장기수선충당금 관리: 청구·수령·집행 및 감독",
  "직원 관리: 경비원·미화원·시설관리 직원 근무 관리, 채용, 교육, 급여 지급",
  "입주자대표회의 소통: 정기 보고, 의결 사항 집행, 입주민 민원 접수·해결",
];

const QUALIFICATION_TABLE = {
  headers: ["구분", "자격 요건", "적용 세대수"],
  rows: [
    ["주택관리사", "주택관리사 자격증 (시·도지사 발급)", "150세대 이상 의무관리대상"],
    ["주택관리사보", "주택관리사보 자격증", "대통령령 정한 세대수 미만"],
  ],
};

const SELECTION_TABLE = {
  headers: ["방법", "특징"],
  rows: [
    ["관리업체 파견", "입주자대표회의가 관리업체 선정 → 업체에서 주택관리사 파견"],
    ["직접 고용", "자체관리 아파트에서 공개 채용 → 면접 후 선발"],
  ],
};

const FAQS = [
  {
    q: "관리사무소장은 누가 선임하나요?",
    a: "입주자대표회의에서 선정해요. 관리업체를 선정하면 그 업체에서 파견하거나, 자체관리 아파트는 직접 공개 채용해요.",
  },
  {
    q: "관리사무소장 없이 운영할 수 있나요?",
    a: "의무관리대상 아파트(150세대 이상)는 반드시 관리사무소장을 배치해야 해요. 안 하면 과태료가 부과돼요.",
  },
  {
    q: "주택관리사 자격증은 어떻게 따나요?",
    a: "1차(회계원리·시설개론·민법)와 2차(관계법규·관리실무) 시험을 통과해야 해요. 한국산업인력공단에서 연 1회 주관하고, 합격률은 보통 20~30%예요.",
  },
  {
    q: "관리사무소장을 함부로 해임할 수 있나요?",
    a: "정당한 사유 없이 해임하면 법적 분쟁이 생길 수 있어요. 횡령·배임·직무유기 같은 중대한 잘못이 있어야 계약을 해지할 수 있어요.",
  },
  {
    q: "관리비 횡령이 의심될 때 어떻게 하나요?",
    a: "입주자대표회의에 감사 요청을 하거나, 직접 경찰에 신고할 수 있어요. 관리비 내역서와 통장 거래 내역 공개를 요구할 권리도 있어요.",
  },
  {
    q: "자격 없는 사람이 관리사무소장 업무를 하면 어떻게 되나요?",
    a: "1년 이하의 징역 또는 1천만원 이하의 벌금이 부과돼요. 자격 없는 사람에게 업무를 시킨 쪽도 처벌받아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공동주택관리법 (관리사무소장 자격·업무 규정)", url: "https://www.law.go.kr/법령/공동주택관리법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부 공동주택관리 정보", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "입주자대표회의-구성",
    title: "입주자대표회의 구성과 역할",
    description: "아파트 의사결정 기구인 입주자대표회의 구성 방법과 권한을 정리했어요.",
  },
  {
    slug: "공동주택-관리비",
    title: "공동주택 관리비 항목 기준",
    description: "아파트 관리비가 어떤 항목으로 구성되는지, 어디에 쓰이는지 정리했어요.",
  },
  {
    slug: "주택관리사-시험",
    title: "주택관리사 시험 일정과 과목",
    description: "주택관리사 1·2차 시험 과목, 합격 기준, 접수 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 관리 · 주택관리사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 관리사무소장은 어떤 일을 하나요?<br />
        업무·자격·책임 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;관리비 걷고 청소하는 거 아닌가요?&rdquo;
      </p>
      <p style={body}>
        그것보다 훨씬 많아요. 시설 총괄, 직원 관리, 예산 집행, 입주자대표회의 보고까지 맡아요.
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법</a>에서 정한
        관리사무소장 업무·자격·책임을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 4대 핵심 업무 */}
      <H2>관리사무소장이 하는 일은 크게 4가지예요</H2>
      <SectionBadge>핵심 업무</SectionBadge>

      <p style={body}>
        관리사무소장은 아파트를 안전하고 효율적으로 운영하는 총책임자예요.
        입주자대표회의에서 의결한 사항을 실제로 집행하는 역할을 해요.
        단순히 지시를 전달하는 게 아니라 직접 예산을 집행하고 직원을 관리하죠.
      </p>

      <Checklist items={DUTIES_ITEMS} />

      <p style={body}>
        관리비 횡령이나 업체 선정 리베이트 같은 문제가 생기면 형사처벌을 받아요.
        업무상 횡령죄나 배임죄가 성립할 수 있어서, 실제로 징역형을 선고받는 사례가 종종 있어요.
      </p>

      <Divider />

      {/* 섹션 2: 자격 요건 */}
      <H2>누구나 관리사무소장이 될 수 있나요?</H2>

      <p style={body}>
        의무관리대상 아파트의 관리사무소장은 주택관리사 자격증이 있어야 해요.
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법</a>에서
        정한 의무관리대상은 보통 150세대 이상 아파트예요.
        이 규모 이상이면 전문적인 관리가 필요하니까 국가에서 자격을 정해놓은 거예요.
      </p>

      <DocTable headers={QUALIFICATION_TABLE.headers} rows={QUALIFICATION_TABLE.rows} />

      <p style={body}>
        자격 없는 사람이 관리사무소장 업무를 하거나, 자격 없는 사람에게 시키면 1년 이하의 징역 또는 1천만원 이하의 벌금이 부과돼요.
        법으로 정한 의무니까 반드시 지켜야 해요.
      </p>

      <BorderBox>
        의무관리대상(150세대 이상): 주택관리사 자격증 필수<br />
        미달 세대수: 주택관리사보로 대체 가능<br />
        무자격자 배치 시: 1년 이하 징역 또는 1천만원 이하 벌금
      </BorderBox>

      <CategoryButton label="부동산 정보" count={15} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 주택관리사 자격증 취득 */}
      <H2>주택관리사 시험은 어떻게 되나요?</H2>
      <SectionBadge>자격증 취득</SectionBadge>

      <p style={body}>
        주택관리사 자격증은 1차·2차 시험을 통과해야 해요. 한국산업인력공단에서 연 1회 주관하고,
        합격률은 보통 20~30%예요.
      </p>
      <p style={body}>
        1차 시험은 3과목이에요. 회계원리, 공동주택 시설개론, 민법이고, 각 과목 40점 이상·전 과목 평균 60점 이상이면 합격해요.
        2차 시험은 주택관리 관계법규와 공동주택 관리실무 2과목이에요. 기준은 1차와 동일해요.
      </p>
      <p style={body}>
        주택관리사보는 1~2차 구분 없이 5과목을 한 번에 봐요. 시험 범위가 좀 더 좁고 난이도도 낮아요.
        <a href="/w/주택관리사-시험" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택관리사 시험 안내</a>에서 자세한 일정을 확인할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4: 선임 절차와 책임 */}
      <H2>어떻게 선임하고 해임하나요?</H2>

      <p style={body}>
        관리사무소장은 입주자대표회의에서 선정해요. 두 가지 방법이 있어요.
        관리업체를 선정하면 그 업체에서 주택관리사 자격 있는 사람을 파견하거나, 자체관리 아파트는 직접 채용하죠.
      </p>

      <DocTable headers={SELECTION_TABLE.headers} rows={SELECTION_TABLE.rows} />

      <p style={body}>
        선임된 관리사무소장은 입주자대표회의와 위탁관리계약 또는 고용계약을 맺어요.
        보통 1~2년 단위로 계약하고 재계약하는 구조예요.
        정당한 사유 없이 해임하면 법적 분쟁이 생길 수 있어요.
      </p>

      <GreenBox>
        아파트 시설 미관리로 사고 발생 시 손해배상 책임 가능<br />
        관리비 횡령 시 업무상 횡령죄 성립 (실형 사례 있음)<br />
        <a href="/w/입주자대표회의-구성" style={{ color: "#fff", textDecoration: "underline" }}>입주자대표회의</a>와의 소통이 분쟁 예방의 핵심이에요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        관리사무소장에 대해 입주민들이 많이 물어보는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 공동주택관리법을 바탕으로 작성됐어요. 개별 아파트 상황은 관리업체나 입주자대표회의에 문의해 주세요." />
    </ArticleLayout>
  );
}
