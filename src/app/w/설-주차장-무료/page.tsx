"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 2026년 설 주차장 무료: 행정·공공기관 5일간 개방 안내 info
// Q2: 2월 14~18일 5일간 무료개방
// Q3: 2월 14~18일 5일간 무료개방, 시청·구청·도서관·주민센터 등, 주차 공간 부족 해소
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "2월 14~18일 5일간 무료개방",
  "시청·구청·도서관·주민센터 등",
  "주차 공간 부족 해소"
];

const FAQS = [
  { q: "설 주차장 무료개방은 어디서 하나요?", a: "시청, 구청, 주민센터, 도서관, 문화센터 등 행정·공공기관 주차장이 무료개방돼요. 각 지자체마다 대상이 다르니까 홈페이지 확인하세요." },
  { q: "설 연휴 주차 시간 제한 있나요?", a: "기관마다 다르지만 보통 24시간 개방이 아니라 일정 시간(09:00~18:00 등)만 개방해요. 지자체 공지 확인하세요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "행정안전부", url: "https://www.mois.go.kr" },
      { label: "정책브리핑", url: "https://www.korea.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활정보</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 설 주차장 무료<br />
        행정·공공기관 5일간 개방 안내
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 설 연휴 행정·공공기관 주차장 무료개방돼요. 2월 14~18일 5일간, 시청·구청·도서관 주차 가능해요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>2월 14~18일 5일간 무료개방</H2>
      <p style={body}>2월 14~18일 5일간 무료개방</p>
      <GreenBox title="핵심 정리">
        2월 14~18일 5일간 무료개방<br />
        시청·구청·도서관·주민센터 등<br />
        주차 공간 부족 해소
      </GreenBox>

      <CategoryButton label="생활정보 정보" count={5} href="/category/생활정보" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
