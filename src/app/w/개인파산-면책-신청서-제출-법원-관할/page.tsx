"use client";
// Q1. 개인파산 신청 법원에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 주소지 관할 지방법원에 제출하면 돼요. 서울은 서울회생법원이에요., 방문, 전자소송, 우편 중 선택 가능해요. 전자소송이 편하고 10% 할인돼요.
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "개인파산 신청서 어느 법원에 내나요?", a: "주소지 관할 지방법원에 내면 돼요. 서울은 서울회생법원, 수원은 수원회생법원, 부산은 부산회생법원이에요." },
  { q: "서울인데 어느 법원으로 가야 하나요?", a: "서울 전 지역은 서울회생법원(서초구 법원로 114)에 내면 돼요. 강남, 강북 상관없이 모두 서울회생법원이에요." },
  { q: "잘못된 법원에 냈으면 어떻게 되나요?", a: "법원이 관할 법원으로 이송해주거나 각하할 수 있어요. 시간 지연되니 처음부터 맞는 법원에 내세요." },
  { q: "개인파산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "개인파산 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "채무자 회생 및 파산에 관한 법률", href: "https://www.law.go.kr/법령/채무자회생및파산에관한법률" },
  { name: "서울회생법원", href: "https://slb.scourt.go.kr" },
  { name: "대법원 전자소송", href: "https://ecfs.scourt.go.kr" },
];

const RELATED = [
  { slug: "개인파산-면책-신청비용-계산-방법", title: "개인파산 면책 신청비용 계산", description: "관련 내용 정리." },
  { slug: "개인파산-면책절차-신청방법-법원-심리", title: "개인파산 면책절차 신청 방법", description: "관련 내용 정리." },
  { slug: "파산선고-동시폐지-의미", title: "파산선고 동시폐지 의미", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인파산 면책 신청서 제출 법원 관할 및 제출 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주소지 관할 지방법원에 제출하면 돼요. 서울은 서울회생법원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어느 법원에 제출해야 하나요?</H2>
      <p style={body}>주소지 기준으로 정해져요. "보통재판적"이라고 하는데, 쉽게 말하면 내가 사는 곳을 관할하는 법원이에요.</p>
      <GreenBox>
        주소지 관할 지방법원에 제출하면 돼요. 서울은 서울회생법원이에요.{"\n"}
        방문, 전자소송, 우편 중 선택 가능해요. 전자소송이 편하고 10% 할인돼요.{"\n"}
        잘못된 법원에 내면 이송되거나 각하될 수 있어요.
      </GreenBox>
      <p style={body}>1단계: 주소 확인
- 주민등록등본상 주소지
- 실제 거주지와 주민등록이 다르면 → 주민등록 기준</p>

      <CategoryButton label="법률" count={10} href="/category/%EB%B2%95%EB%A5%A0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>주요 지역별 관할법원이에요</H2>
      <p style={body}>서울회생법원
- 주소: 서울 서초구 법원로 114 (서울중앙지법 별관)
- 전화: 02-530-1114
- 관할: 서울 전 지역 (강남, 강북, 동부, 서부, 남부, 북부 전부)</p>
      <BorderBox>
        <strong>주요 지역별 관할법원이에요</strong><br />
        서울회생법원
- 주소: 서울 서초구 법원로 114 (서울중앙지법 별관)
- 전화: 02-530-1114
- 관할: 서울 전 지역 (강남, 강북, 동부, 서부, 남부, 북부 전부)<br />
        주의: 서울은 무조건 서울회생법원이에요. 서울동부지법, 서울남부지법에 가면 안 돼요.
      </BorderBox>
      <p style={body}>주의: 서울은 무조건 서울회생법원이에요. 서울동부지법, 서울남부지법에 가면 안 돼요.</p>

      <Divider />
      <H2>주소가 없거나 모르면 어떻게 하나요?</H2>
      <p style={body}>주소가 없으면 거소(실제 거주지)를 기준으로 해요.</p>
      <p style={body}>거소도 불분명하면 마지막 주소를 기준으로 해요.</p>
      <p style={body}>예시:
- 노숙 중: 마지막 주민등록 주소지 관할법원
- 해외 거주 중 한국 채무: 마지막 국내 주소지 관할법원
- 주소지 여러 곳: 주민등록 주소지 우선</p>

      <Divider />
      <H2>개인파산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
