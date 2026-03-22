"use client";

// Q1. 전세계약 주의사항에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 깡통전세는 (근저당 + 보증금)이 집값보다 큰 상태, 경매 나면 보증금 못 받아요, 빌라/다세대는 시세 파악이 어려워서 더 조심해야 해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "깡통전세란 무엇인가요?", a: "집값보다 (대출금 + 보증금)이 큰 상태예요. 경매 나면 보증금 못 받아요." },
  { q: "전세보증보험은 꼭 가입해야 하나요?", a: "의무는 아닌데 필수예요. 안 가입하면 전세사기 당했을 때 구제받기 어려워요." },
  { q: "대리인이랑 계약해도 되나요?", a: "위험해요. 반드시 위임장 + 인감증명서 확인하고, 가능하면 소유자 본인과 계약하세요." },
  { q: "전세계약 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "전세계약 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택도시보증공사(HUG)", href: "https://www.khug.or.kr" },
  { name: "국토교통부", href: "https://www.molit.go.kr" },
];

const RELATED = [
  { slug: "전세보증보험", title: "전세보증보험", description: "관련 내용 정리." },
  { slug: "확정일자", title: "확정일자", description: "관련 내용 정리." },
  { slug: "대항력-발생-시점", title: "대항력 발생 시점", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세계약 주의사항 및 전세사기 예방 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        깡통전세는 (근저당 + 보증금)이 집값보다 큰 상태, 경매 나면 보증금 못 받아요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>전세사기가 왜 이렇게 많아졌나</H2>
      <p style={body}>2022년부터 전세사기가 폭발적으로 늘었어요.</p>
      <GreenBox>
        깡통전세는 (근저당 + 보증금)이 집값보다 큰 상태, 경매 나면 보증금 못 받아요{"\n"}
        빌라/다세대는 시세 파악이 어려워서 더 조심해야 해요
      </GreenBox>
      <p style={body}>왜냐면:
- 집값 떨어짐 → 전세가율 100% 넘어감 (깡통전세)
- 빌라 갭투자 → 집주인 파산 → 보증금 증발
- 세입자는 수억 원 날리고, 집주인은 잠수</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>전세사기 유형</H2>
      <p style={body}>어떻게 사기 당하는지 알아야 피할 수 있어요.</p>
      <BorderBox>
        <strong>전세사기 유형</strong><br />
        어떻게 사기 당하는지 알아야 피할 수 있어요.<br />
        (근저당 + 보증금) &gt; 집값인 상태예요.
      </BorderBox>
      <p style={body}>(근저당 + 보증금) &gt; 집값인 상태예요.</p>

      <Divider />
      <H2>계약 전 필수 확인</H2>
      <p style={body}>이거 안 하면 전세사기 당할 수 있어요.</p>
      <p style={body}>반드시 당일 발급본으로! 하루 전 것도 안 돼요.</p>
      <p style={body}>발급 방법:
- 대법원 인터넷등기소에서 직접 발급 (700원)
- 중개사가 보여주는 거 말고 직접 발급하세요</p>

      <Divider />
      <H2>전세계약 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
