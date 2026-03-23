"use client";

// Q1. 아파트나 건물 급수관 검사에서 기준치 초과 통보를 받아 대처법이 궁금한 상황
// Q2. 기준 초과 항목을 확인하고, 관리사무소·지자체에 조치를 요청한다
// Q3. 수질 기준 항목(납·철·탁도 등), 기준치 초과 시 의무 조치, 배관 교체 절차, 비용 부담 주체
// Q4. DocTable(수질 기준) + Steps(조치 절차) + GreenBox(핵심 대응) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STANDARD_TABLE = {
  headers: ["항목", "기준치", "초과 시 위험", "주요 원인"],
  rows: [
    ["납(Pb)", "0.01mg/L 이하", "신경·신장 손상", "노후 납 배관"],
    ["철(Fe)", "0.3mg/L 이하", "적수(붉은 물)", "노후 강관 부식"],
    ["탁도", "0.5NTU 이하", "음용 부적합", "배관 내 이물질"],
    ["잔류염소", "4.0mg/L 이하", "피부·점막 자극", "과도한 소독"],
    ["대장균군", "불검출", "수인성 질병", "배관 오염"],
  ],
};

const STEPS_DATA = [
  { title: "검사 결과서 확인", desc: "관리사무소에서 받은 수질 검사 결과서에서 기준 초과 항목과 수치를 확인해요." },
  { title: "관리사무소에 조치 요청", desc: "공동주택관리법에 따라 관리주체는 수질 기준 초과 시 즉시 조치할 의무가 있어요. 배관 세척이나 교체를 요청하세요." },
  { title: "지자체 수도사업소 신고", desc: "관리사무소가 조치하지 않으면 관할 시·군·구 수도사업소에 신고할 수 있어요. 행정조치가 내려져요." },
  { title: "배관 교체 또는 세척", desc: "노후 배관이 원인이면 교체, 이물질이면 세척으로 해결해요. 공용 배관은 관리비에서, 세대 내 배관은 입주자 부담이에요." },
  { title: "재검사 확인", desc: "조치 후 재검사를 해서 기준치 이내로 내려갔는지 확인해요." },
];

const FAQS = [
  { q: "급수관 검사는 얼마나 자주 해야 하나요?", a: "수도법 시행규칙에 따라 5년마다 의무 검사예요. 관리규약에 따라 더 자주 하는 아파트도 있어요." },
  { q: "적수(붉은 물)가 나오면 바로 마시면 안 되나요?", a: "철 기준치를 초과한 물은 마시지 않는 게 좋아요. 1~2분 정도 물을 틀어 깨끗해진 후 사용하고, 관리사무소에 신고하세요." },
  { q: "배관 교체 비용은 누가 내나요?", a: "공용 배관(세대 밖)은 장기수선충당금으로 해결해요. 세대 내 배관은 입주자 부담이에요. 보통 세대 배관 교체는 100~300만원 정도 들어요." },
  { q: "정수기를 쓰면 괜찮나요?", a: "정수기가 납이나 철을 걸러주긴 하지만, 배관 자체의 문제를 해결하는 건 아니에요. 근본적으로는 배관 교체가 필요해요." },
  { q: "검사 결과를 입주민에게 공개해야 하나요?", a: "네. 공동주택관리법에 따라 수질 검사 결과를 입주민에게 공개할 의무가 있어요. 게시판이나 관리비 고지서에 포함해야 해요." },
];

const SOURCES = [
  { name: "수도법 시행규칙 제22조의3", href: "https://www.law.go.kr/법령/수도법시행규칙" },
  { name: "환경부 먹는물 수질기준", href: "https://www.me.go.kr" },
];

const RELATED = [
  { slug: "건물-급수관-검사-시기-준공검사", title: "건물 급수관 검사 시기", description: "급수관 검사 의무와 주기." },
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 업무", description: "관리사무소장이 해야 할 일." },
  { slug: "공중화장실-설치기준-관리기준", title: "공중화장실 설치 관리 기준", description: "시설 기준과 관리 의무." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 주거 · 수질관리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        급수관 검사 기준치 초과, 어떻게 해야 할까?<br />
        항목별 기준과 조치 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급수관 검사에서 기준치 초과 통보를 받으면 당장 물을 마셔도 되는지 걱정되죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/수도법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>수도법 시행규칙</a>에서 정한 수질 기준을 초과하면 관리주체가 즉시 조치해야 해요. 항목별 기준치와 초과 시 대응 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수질 기준 항목과 기준치</H2>
      <p style={body}>
        급수관 검사에서 주로 확인하는 항목이에요. 기준치를 넘으면 조치가 필요해요.
      </p>

      <SectionBadge>먹는물 수질 기준</SectionBadge>
      <DocTable headers={STANDARD_TABLE.headers} rows={STANDARD_TABLE.rows} />

      <p style={body}>
        특히 납과 대장균은 건강에 직접적인 위험이 있어서 즉시 조치가 필요해요. 철은 건강 위험보다는 물 색깔과 맛에 영향을 줘요.
      </p>

      <CategoryButton label="생활 정보" count={10} href="/category/생활" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>기준 초과 시 이렇게 대응하세요</H2>
      <p style={body}>
        검사 결과를 받은 후 아래 순서로 진행하면 돼요.
      </p>

      <SectionBadge>조치 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>당장 할 수 있는 응급 대처</H2>
      <p style={body}>
        배관 교체까지 시간이 걸리니, 그 사이 할 수 있는 대처법이에요.
      </p>

      <GreenBox title="응급 대처법">
        수돗물 1~2분 흘려보낸 후 사용{"\n"}
        음용·조리에는 정수기 또는 생수 사용{"\n"}
        납 초과 시에는 끓여도 납이 제거되지 않으니 음용 자제{"\n"}
        관리사무소에 세대 내 수질 검사 별도 요청 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>급수관 수질 기준에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 수도법 시행규칙과 환경부 먹는물 수질기준을 바탕으로 작성했어요. 개별 건물의 수질 상태와 조치 방법은 관할 수도사업소나 관리사무소에서 확인하세요." />
    </ArticleLayout>
  );
}
