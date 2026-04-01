"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     건물이나 시설에 공중화장실을 신설하거나 개보수하면서 법적 기준을 확인해야 하는 건축주 또는 시설 관리자.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     설치 시 남녀 변기 수, 장애인 시설, 기저귀교환대 기준을 확인하고 관리 규정에 맞게 운영할 수 있다.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     여성 대변기 비율(1배/1.5배), 필수 설치 시설, 소독 주기(4~9월 주3회/10~3월 주1회), 신고 절차.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable(설치 기준 수치) + Checklist(필수 시설 목록) + BorderBox(관리 기준) + FAQ.

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FEMALE_RATIO_TABLE = {
  headers: ["수용인원", "여성 대변기 최소 수"],
  rows: [
    ["1천명 미만", "남성 대변기 + 소변기 합계의 1배 이상"],
    ["1천명 이상 (공연장·공원 등)", "남성 대변기 + 소변기 합계의 1.5배 이상"],
  ],
};

const MANDATORY_ITEMS = [
  "남녀 화장실 구분 (남녀공용 불가)",
  "장애인·노인·임산부용 변기: 출입구 90cm 이상, 손잡이, 비상벨 설치",
  "대변기 칸막이: 출입문 하단 10~20cm, 칸막이 하단 5mm 이하, 상단 30cm 이상 공간",
  "어린이용 대·소변기 및 세면대 (낮은 높이로 별도 설치)",
  "영유아 기저귀교환대: 남·여 화장실 각각 1개 이상 (도로 휴게시설·역·공항·병원·도서관 등 필수)",
  "비상벨: 안전관리시설 설치 의무 대상에 포함",
  "관리인 연락처 화장실 입구 게시",
];

const MANAGEMENT_TABLE = {
  headers: ["기간", "소독 최소 횟수"],
  rows: [
    ["4월 ~ 9월 (여름·봄·가을)", "주 3회 이상"],
    ["10월 ~ 다음 해 3월 (겨울)", "주 1회 이상"],
  ],
};

const FAQS = [
  {
    q: "수용인원 500명 건물은 여성 화장실을 더 많이 만들어야 하나요?",
    a: "1천명 미만이면 남성 대소변기 합계의 1배 이상으로 충분해요. 1천명 이상일 때만 1.5배 기준이 적용돼요.",
  },
  {
    q: "관리인을 꼭 두어야 하나요?",
    a: "필수예요. 관리인 연락처를 화장실 입구에 게시해야 하고, 위생적으로 관리할 책임이 있어요. 관리인 없으면 법 위반이에요.",
  },
  {
    q: "영유아 기저귀교환대는 어디에 설치해야 하나요?",
    a: "도로 휴게시설, 철도역, 도시철도역, 공항, 문화·집회시설, 종합병원, 도서관, 공공업무시설, 관광 휴게시설에는 남·여 화장실 각각 1개 이상 설치가 필수예요.",
  },
  {
    q: "독립 공중화장실을 새로 만들 때 신고를 해야 하나요?",
    a: "시장·군수·구청장에게 신고해야 해요. 신고 없이 만들면 과태료가 부과될 수 있어요. 건물 부속 공중화장실은 건축 허가 시 포함해서 처리하면 돼요.",
  },
  {
    q: "소독을 안 하면 어떻게 되나요?",
    a: "관리 기준 위반으로 과태료가 부과될 수 있어요. 시장·군수·구청장이 연 1회 정기점검을 하고, 미흡하면 시정 명령을 내려요.",
  },
  {
    q: "장애인 화장실 기준은 어디에 나와 있나요?",
    a: "공중화장실 등에 관한 법률 외에 장애인·노인·임산부 등의 편의증진 보장에 관한 법률에도 상세히 나와 있어요. 두 법을 함께 확인해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공중화장실 등에 관한 법률", url: "https://www.law.go.kr/법령/공중화장실등에관한법률" },
      { label: "공중화장실 등에 관한 법률 시행령", url: "https://www.law.go.kr/법령/공중화장실등에관한법률시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "행정안전부 공중화장실 제도", url: "https://www.mois.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "건축-허가-신청",
    title: "건축 허가 신청 방법",
    description: "건물을 신축하거나 증축할 때 필요한 건축 허가 절차와 서류를 정리했어요.",
  },
  {
    slug: "건축물-용도변경",
    title: "건축물 용도 변경 신청",
    description: "건물 용도를 변경할 때 허가 또는 신고해야 하는 기준과 절차예요.",
  },
  {
    slug: "공공건축물-접근성",
    title: "공공건축물 장애인 접근성 기준",
    description: "공공건물에서 장애인이 불편 없이 이용할 수 있도록 지켜야 할 기준이에요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축 · 시설 기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공중화장실 설치기준<br />
        남녀 변기 수·장애인 시설·관리 규정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;건물에 화장실 새로 만들려는데 남녀 비율이나 장애인 시설 기준이 어떻게 되나요?&rdquo;
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/공중화장실등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>공중화장실 등에 관한 법률</a>에서
        설치 기준과 관리 기준을 구체적으로 정하고 있어요.
        여성 대변기 비율, 장애인 시설, 기저귀교환대 필수 설치 기준과 소독 주기까지 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 설치 기준 */}
      <H2>화장실 설치 기준 핵심은 뭔가요?</H2>
      <SectionBadge>설치 기준</SectionBadge>

      <p style={body}>
        가장 기본은 남녀 화장실을 구분하는 거예요. 남녀공용은 법적으로 불가해요.
        두 번째는 여성 대변기 수 기준이에요. 남성 화장실 소변기와 대변기 개수를 더한 것보다 여성 대변기가 적으면 안 돼요.
      </p>

      <DocTable headers={FEMALE_RATIO_TABLE.headers} rows={FEMALE_RATIO_TABLE.rows} />

      <p style={body}>
        예를 들어 남성 화장실에 소변기 5개, 대변기 3개가 있으면 합이 8개예요.
        여성 대변기는 최소 8개 이상 설치해야 해요. 1천명 이상 수용 시설이면 12개 이상이 필요하죠.
      </p>

      <GreenBox>
        남녀 화장실 반드시 구분 (남녀공용 불가)<br />
        여성 대변기 ≥ 남성 대변기 + 소변기 합계 × 1배 (일반)<br />
        1천명 이상 수용 시설 × 1.5배 (공연장·공원 등)
      </GreenBox>

      <Divider />

      {/* 섹션 2: 필수 설치 시설 */}
      <H2>법에서 정한 필수 설치 시설은 뭔가요?</H2>

      <p style={body}>
        설치 기준에는 변기 수 외에도 반드시 갖춰야 할 시설들이 있어요.
        장애인·노인·임산부용 변기는 기본이고, 기저귀교환대와 비상벨도 포함돼요.
        이런 시설을 빠뜨리면 법 위반이 되니까 설계 단계에서부터 꼼꼼히 반영해야 해요.
      </p>

      <Checklist items={MANDATORY_ITEMS} />

      <p style={body}>
        대변기 칸막이 규격도 세밀하게 정해져 있어요. 출입문 하단은 10cm 이상 20cm 이하로 띄워야 하고, 칸막이 하단은 5mm 이하, 상단은 30cm 이상 공간을 확보해야 해요. 환기와 안전을 위한 기준이에요.
      </p>

      <CategoryButton label="건축/시설 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 관리 기준 */}
      <H2>화장실을 만들었으면 어떻게 관리해야 하나요?</H2>
      <SectionBadge>관리 기준</SectionBadge>

      <p style={body}>
        화장실을 설치했으면 법에 따라 위생적으로 관리해야 해요.
        관리인을 두고, 정해진 주기로 소독하는 게 의무예요. 관리인 연락처는 화장실 입구에 반드시 게시해야 하죠.
      </p>

      <DocTable headers={MANAGEMENT_TABLE.headers} rows={MANAGEMENT_TABLE.rows} />

      <p style={body}>
        소독은 화장실 내부뿐만 아니라 외부도 해야 해요. 악취 발산과 해충 발생·번식을 막기 위해서예요.
        여름철에 파리·모기 같은 해충이 많이 생기니까 4~9월에 주 3회로 더 자주 하는 거예요.
      </p>

      <BorderBox>
        시장·군수·구청장이 연 1회 정기점검 실시<br />
        필요 시 수시점검도 가능하고, 미흡하면 시정 명령<br />
        관리 기준 위반 시 과태료 부과 가능
      </BorderBox>

      <Divider />

      {/* 섹션 4: 설치 신고 */}
      <H2>신고는 어떻게 하나요?</H2>

      <p style={body}>
        공중화장실 종류에 따라 신고 방식이 달라요. 건물과 따로 떨어진 독립 공중화장실을 새로 만들면
        시장·군수·구청장에게 신고해야 해요. 신고 없이 만들면 과태료 대상이에요.
      </p>
      <p style={body}>
        건물 부속 공중화장실은 건축 허가나 용도 변경 신고에 포함돼요.
        <a href="/w/건축-허가-신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축 허가</a>를 받을 때 화장실 설치 계획도 함께 제출하는 구조예요.
        신고 서류는 관할 구청 환경위생과나 건축과에서 받을 수 있어요.
      </p>
      <p style={body}>
        장애인 접근성 기준은 공중화장실법 외에도
        <a href="https://www.law.go.kr/법령/장애인·노인·임산부등의편의증진보장에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인·노인·임산부 등의 편의증진 보장에 관한 법률</a>에서도 규정하고 있어요. 두 법을 함께 확인해야 기준을 충족할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공중화장실 기준에 대해 건물주·시설 관리자들이 많이 물어보는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 공중화장실 등에 관한 법률을 바탕으로 작성됐어요. 세부 기준은 건물 유형과 지자체 조례에 따라 다를 수 있으니 관할 구청에 문의해 주세요." />
    </ArticleLayout>
  );
}
