"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// Q1. 검색자 상황: 이사하고 전입신고를 하러 주민센터에 가야 하는데 뭘 챙겨가야 하는지 모르는 상황. 대리인이 가는 경우도 있음
// Q2. 읽고 나서 할 행동: 필요한 서류를 챙겨서 주민센터 방문 후 전입신고 + 확정일자 완료
// Q3. 알아야 할 정보: 본인 직접/대리인/온라인 각각 필요 서류, 확정일자용 추가 서류, 세대주 동의서 필요 시점
// Q4. 전달 형태: DocTable(상황별 서류) + Checklist(방문 전 체크) + GreenBox(핵심 요약)

// ─── 데이터 ──────────────────────────────────────────

const SELF_DOCS = [
  { name: "신분증 (원본)", required: true, where: "주민등록증·운전면허증·여권 중 하나 — 복사본 불가" },
  { name: "임대차계약서 (원본)", required: false, where: "전입신고 자체는 없어도 되지만, 확정일자 받으려면 필수" },
];

const AGENT_DOCS = [
  { name: "위임장", required: true, where: "본인이 직접 작성 — '전입신고 위임장 양식' 검색해서 출력" },
  { name: "본인 도장", required: true, where: "인감도장 아니어도 됨 — 위임장에 날인" },
  { name: "대리인 신분증 (원본)", required: true, where: "대신 가는 사람 신분증" },
  { name: "임대차계약서 (원본)", required: false, where: "확정일자 받으려면 추가 지참" },
];

const FAMILY_DOCS = [
  { name: "대리인(가족) 신분증 (원본)", required: true, where: "같이 사는 세대원이면 위임장 없이 가능" },
  { name: "임대차계약서 (원본)", required: false, where: "확정일자 받으려면 추가 지참" },
];

const CHECKLIST = [
  "신분증 원본 챙기기 — 주민등록증·운전면허증·여권 중 하나",
  "임대차계약서 원본 챙기기 — 확정일자 도장 받아야 하니까",
  "확정일자 수수료 600원 준비",
  "대리인이 가는 경우: 위임장 + 본인 도장 + 대리인 신분증",
  "같은 세대원이 가는 경우: 대리인 신분증만 있으면 위임장 불필요",
  "남의 집 세대원으로 들어가는 경우: 세대주 동의서 사전 확인",
];

const FAQS = [
  {
    q: "계약서 없이 전입신고할 수 있나요?",
    a: "전입신고 자체는 계약서 없이도 가능해요. 하지만 확정일자는 계약서 원본에 도장을 찍는 거라서, 확정일자까지 받으려면 꼭 챙겨가야 해요. 보증금 보호를 위해 이왕이면 같이 처리하세요.",
  },
  {
    q: "도장이 없으면 안 되나요?",
    a: "본인이 직접 신청하면 서명으로 대체 가능해요. 도장 없이 가도 돼요. 단, 대리인이 가는 경우에는 위임장에 본인 도장이 필요해요.",
  },
  {
    q: "전입신고하면 이전 주소에서 자동으로 전출되나요?",
    a: "네, 자동으로 처리돼요. 별도로 전출신고를 할 필요 없어요. 새 주소로 전입신고하면 이전 주소에서 자동 전출 처리돼요.",
  },
  {
    q: "온라인으로 전입신고하면 확정일자는 어떻게 받나요?",
    a: "정부24에서 전입신고는 온라인으로 되는데, 확정일자는 인터넷등기소(www.iros.go.kr)에서 따로 신청해야 해요. 계약서 PDF 파일을 올리고 수수료 600원을 내면 돼요. 주민센터 방문이 번거로우면 이 방법이 편해요.",
  },
  {
    q: "전입신고 기한이 있나요?",
    a: "이사 후 14일 이내에 해야 해요. 늦으면 과태료가 부과될 수 있어요. 전입신고 당일 다음 날 0시부터 대항력이 생기기 때문에, 이사 당일이나 다음 날 바로 하는 게 가장 안전해요.",
  },
  {
    q: "세대주 동의서가 필요한 경우는 어떤 때인가요?",
    a: "기존에 다른 세대주가 있는 집에 세대원으로 들어갈 때 필요해요. 보통 전세·월세로 이사하면 내가 세대주가 돼서 필요 없어요. 친구 집이나 셰어하우스처럼 이미 세대주가 있는 곳에 들어갈 때 필요할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 사이트",
    items: [
      { label: "주민등록법", url: "https://www.law.go.kr/법령/주민등록법" },
      { label: "정부24 — 전입신고 온라인 신청", url: "https://www.gov.kr" },
      { label: "대법원 인터넷등기소 — 확정일자 신청", url: "https://www.iros.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "전입신고-방법", title: "전입신고 방법과 절차", description: "주민센터 방문부터 온라인 신청까지 전입신고 전체 절차예요." },
  { slug: "확정일자", title: "확정일자란 무엇인가요?", description: "전입신고와 같이 받아야 하는 확정일자, 왜 중요한지 설명해요." },
  { slug: "대항력-요건-전입신고-점유", title: "대항력 요건 — 전입신고와 점유", description: "전입신고 다음 날 0시에 생기는 대항력과 보증금 보호 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전입신고 · 확정일자</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전입신고 서류 준비물<br />
        신분증·계약서·위임장 상황별 정리
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사하고 전입신고를 하러 가는데 뭘 챙겨가야 할지 모르겠죠?
        본인이 직접 가면 신분증만 있으면 돼요. 확정일자까지 받으려면 임대차계약서 원본도 꼭 챙기세요.
        대리인이 가면 위임장과 본인 도장이 추가로 필요해요.
        상황별로 서류를 정리했으니 자신에게 해당하는 케이스만 확인하세요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>본인이 직접 신청할 때</H2>
      <p style={body}>
        가장 간단해요. 신분증 원본만 있으면 전입신고 자체는 완료돼요.
        보증금을 지키려면 <a href="/w/확정일자" style={{ color: "#1D9E75", textDecoration: "underline" }}>확정일자</a>도 같이 받아야 하는데, 그때는 임대차계약서 원본이 필수예요.
        주민센터 한 번 방문에 전입신고와 확정일자를 동시에 처리하는 게 가장 편해요.
      </p>

      <SectionBadge>본인 직접 신청 서류</SectionBadge>
      <DocTable docs={SELF_DOCS} />

      <GreenBox>
        전입신고만: 신분증 원본 1개<br />
        전입신고 + 확정일자: 신분증 원본 + 임대차계약서 원본 + 수수료 600원<br />
        전입신고 다음 날 0시부터 대항력 발생 — 이사 당일 바로 하는 게 안전해요
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>대리인이 신청할 때</H2>
      <p style={body}>
        본인이 못 가면 가족이나 지인이 대신 갈 수 있어요.
        단, 같은 세대원(배우자·부모·자녀 등)이 아니라면 위임장과 본인 도장이 필요해요.
        같은 세대원이면 위임장 없이 대리인 신분증만 있으면 돼요.
      </p>

      <SectionBadge>일반 대리인 서류</SectionBadge>
      <DocTable docs={AGENT_DOCS} />

      <SectionBadge>같은 세대원(가족)이 대신 갈 때</SectionBadge>
      <DocTable docs={FAMILY_DOCS} />

      <BorderBox>
        위임장은 인터넷에서 '전입신고 위임장 양식'을 검색해서 출력하세요.
        본인이 직접 작성하고 도장을 찍어야 해요. 인감도장 아닌 일반 도장도 괜찮아요.
      </BorderBox>

      <Divider />

      <H2>방문 전 체크리스트</H2>
      <p style={body}>
        주민센터 도착하고 나서 서류 빠진 게 있으면 다시 가야 해요.
        특히 임대차계약서 원본을 빠뜨리면 확정일자를 못 받아요.
        출발 전에 이 항목들을 한 번 더 확인하세요.
      </p>

      <SectionBadge>방문 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        전입신고 서류 준비에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />
      <H2>출처</H2>
      <References groups={REFERENCES} />

      <CategoryButton label="전입신고 관련 글 더 보기" href="/w/전입신고-방법" />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 주민등록법을 바탕으로 작성됐어요. 서류 기준은 지자체나 상황에 따라 달라질 수 있으니 방문 전 관할 주민센터에 확인하세요." />
    </ArticleLayout>
  );
}
