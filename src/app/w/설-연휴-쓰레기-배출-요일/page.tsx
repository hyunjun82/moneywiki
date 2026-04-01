"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 설 연휴에 쓰레기를 언제 내놓을 수 있는지, 잘못 버리면 과태료가 나오는지 궁금한 상황
// Q2. 배출 가능 요일을 확인하고, 연휴 기간 쓰레기를 올바르게 배출한다
// Q3. 연휴 수거 중단일, 배출 금지일, 과태료 기준, 음식물쓰레기 처리법, 재활용 분리배출
// Q4. GreenBox(배출 핵심 규칙) + DocTable(과태료 기준) + BorderBox(음식물 처리) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PENALTY_TABLE = {
  headers: ["위반 유형", "1차", "2차", "3차 이상"],
  rows: [
    ["배출 시간·장소 위반", "10만원", "20만원", "30만원"],
    ["분리배출 위반", "10만원", "20만원", "30만원"],
    ["무단투기", "50만원", "70만원", "100만원"],
  ],
};

const FAQS = [
  { q: "설 당일에 쓰레기를 내놓으면 안 되나요?", a: "대부분 지자체에서 설 당일(1월 1일 음력)과 전날은 수거를 안 해요. 배출 금지일에 내놓으면 과태료 대상이에요. 구청 홈페이지에서 정확한 배출 가능일을 확인하세요." },
  { q: "음식물쓰레기는 어떻게 버리나요?", a: "수분을 최대한 제거하고 음식물 종량제 봉투나 전용 수거함에 넣어요. 연휴 기간에는 냉동 보관했다가 수거일에 내놓는 것도 방법이에요." },
  { q: "재활용품은 연휴에도 내놓을 수 있나요?", a: "재활용 수거도 일반 쓰레기와 마찬가지로 수거 중단일에는 못 내놓아요. 수거 재개일 전날 저녁에 내놓으세요." },
  { q: "택배 박스가 많은데 어떻게 처리하나요?", a: "테이프와 송장을 떼고 접어서 내놓아요. 비에 젖으면 일반 쓰레기로 분류되니 마른 상태로 배출하세요." },
  { q: "과태료는 누가 부과하나요?", a: "관할 구청 환경과에서 CCTV나 현장 단속으로 적발해요. 신고도 가능하고, 신고자에게 포상금을 주는 지자체도 있어요." },
];

const SOURCES = [
  { name: "폐기물관리법", href: "https://www.law.go.kr/법령/폐기물관리법" },
  { name: "서울시 쓰레기 배출 안내", href: "https://www.seoul.go.kr" },
];

const RELATED = [
  { slug: "공중화장실-설치기준-관리기준", title: "공중화장실 설치 관리 기준", description: "공공 시설 관리 기준." },
  { slug: "아파트-관리사무소장-업무-역할", title: "아파트 관리사무소장 업무", description: "관리사무소장의 역할과 책임." },
  { slug: "고속도로-통행료-면제-설-추석", title: "고속도로 통행료 면제", description: "명절 통행료 면제 시간과 대상." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 명절 · 쓰레기 배출</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        설 연휴 쓰레기, 언제 내놓을 수 있나?<br />
        배출 요일과 과태료 기준
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>설 연휴에 쓰레기를 내놓았다가 과태료 10만원 맞을 수 있어요.</p>
      <p style={body}>대부분 지자체에서 설 당일과 전날은 쓰레기 수거를 중단해요. <a href="https://www.law.go.kr/법령/폐기물관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>폐기물관리법</a>에 따라 배출 금지일에 내놓으면 과태료가 부과돼요. 연휴 전에 배출 가능 요일을 확인하세요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>연휴 쓰레기 배출 핵심 규칙</H2>
      <p style={body}>지자체마다 수거 일정이 다르지만, 공통 원칙이 있어요.</p>
      <GreenBox title="설 연휴 배출 규칙">
        수거 중단일: 설 당일 + 전날 (대부분 지자체){"\n"}
        배출 가능: 수거 재개 전날 저녁 (보통 설 다음날 저녁부터){"\n"}
        배출 시간: 해진 후~자정 (지자체별 상이){"\n"}
        정확한 일정: 관할 구청 홈페이지 확인 필수
      </GreenBox>

      <CategoryButton label="생활 정보" count={10} href="/category/생활" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>잘못 버리면 과태료 이만큼 나와요</H2>
      <p style={body}>배출 규칙을 어기면 10만~100만원 과태료가 부과돼요.</p>
      <SectionBadge>쓰레기 과태료 기준</SectionBadge>
      <DocTable headers={PENALTY_TABLE.headers} rows={PENALTY_TABLE.rows} />
      <Divider />

      <H2>음식물쓰레기 연휴 처리법</H2>
      <p style={body}>명절에 음식이 많이 남죠. 이렇게 처리하세요.</p>
      <BorderBox>
        <strong>음식물쓰레기 처리 요령</strong><br />
        수분을 최대한 짜서 배출 (무게=요금){"\n"}<br />
        수거 중단 기간에는 냉동 보관{"\n"}<br />
        뼈·조개껍데기·과일 씨는 일반 쓰레기{"\n"}<br />
        음식물 전용 봉투 또는 RFID 수거함 사용
      </BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>설 연휴 쓰레기 배출에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 수거 일정과 배출 규칙은 지자체별로 다르니, 관할 구청 홈페이지에서 정확한 일정을 확인하세요." />
    </ArticleLayout>
  );
}
