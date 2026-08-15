"use client";
// Q1. 계약갱신청구권 거절사유에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 계약갱신청구권은 무조건 되는 게 아니에요. 집주인이 거절할 수 있는 사유가 법으로 정해져 있어요., 대표적인 거절 사유는 실거주, 2개월 이상 연체, 무단 전대, 재건축 등이에요.
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "집주인이 실거주한다고 하면 무조건 나가야 하나요?", a: "네. 실거주는 정당한 거절 사유예요. 다만 거짓말이면 손해배상 청구할 수 있어요." },
  { q: "월세 1개월 연체했는데 거절당할 수 있나요?", a: "아니요. 2개월 이상 연체해야 거절 사유가 돼요." },
  { q: "재건축 예정이라는데 확인할 방법 있나요?", a: "구청에서 재건축 정비구역 지정 여부를 확인할 수 있어요." },
  { q: "시세 올랐다고 거절할 수 있나요?", a: "아니요. 시세 상승은 거절 사유 아니에요. 5% 넘게 올리고 싶다고 거절 못 해요." },
  { q: "부당하게 거절당하면 어떻게 해요?", a: "임대차분쟁조정위원회(132)에 무료로 신청할 수 있어요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제6조의3", href: "https://www.law.go.kr/법령/주택임대차보호법" },
];

const RELATED = [
  { slug: "계약갱신청구권-기간", title: "계약갱신청구권 기간", description: "관련 내용 정리." },
  { slug: "계약갱신청구권-행사방법", title: "계약갱신청구권 행사방법", description: "관련 내용 정리." },
  { slug: "계약갱신청구권-실거주", title: "계약갱신청구권 실거주", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 거절사유
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약갱신청구권은 무조건 되는 게 아니에요. 집주인이 거절할 수 있는 사유가 법으로 정해져 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>거절 사유 9가지</H2>
      <p style={body}>주택임대차보호법 제6조의3에서 정한 거절 사유예요. 집주인 본인이나 직계존비속이 직접 거주하려는 실거주, 월세를 2개월 이상 연체한 경우, 집주인 동의 없이 다른 사람에게 재임대한 무단 전대, 고의나 중과실로 주택을 심하게 손상시킨 주택 훼손, 건물 철거나 재건축 예정인 경우, 쌍방 합의로 계약 해지한 경우, 세입자가 거짓 정보로 계약한 경우, 무상으로 주택을 사용하는 경우, 주택 일부를 철거해야 하는 경우가 있어요.</p>
      <GreenBox>
        계약갱신청구권은 무조건 되는 게 아니에요. 집주인이 거절할 수 있는 사유가 법으로 정해져 있어요.{"\n"}
        대표적인 거절 사유는 실거주, 2개월 이상 연체, 무단 전대, 재건축 등이에요.{"\n"}
        집주인이 거짓 사유로 거절하면 손해배상 청구할 수 있어요.
      </GreenBox>
      <p style={body}>이 중에서 실제로 많이 나오는 건 실거주, 연체, 재건축이에요. 나머지는 드물어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>실거주 거절</H2>
      <p style={body}>가장 흔한 거절 사유예요. 집주인이 "직접 살겠다"고 하면 거절할 수 있어요.</p>
      <BorderBox>
        <strong>실거주 거절</strong><br />
        가장 흔한 거절 사유예요. 집주인이 "직접 살겠다"고 하면 거절할 수 있어요.<br />
        집주인 본인만 되는 게 아니에요. 직계존비속도 가능해요. 집주인 본인, 부모님(직계존속), 자녀(직계비속), 배우자의 직계존비속까지 포함돼요. 형제자매나 사촌은 안 돼요. 직계만 가능해요.
      </BorderBox>
      <p style={body}>집주인 본인만 되는 게 아니에요. 직계존비속도 가능해요. 집주인 본인, 부모님(직계존속), 자녀(직계비속), 배우자의 직계존비속까지 포함돼요. 형제자매나 사촌은 안 돼요. 직계만 가능해요.</p>

      <Divider />
      <H2>2개월 연체 거절</H2>
      <p style={body}>월세를 2기(2개월) 이상 연체하면 거절 사유가 돼요.</p>
      <p style={body}>1개월 연체는 거절 사유 아니에요. 2개월 이상이어야 해요.</p>
      <p style={body}>"연체했지만 갱신청구 전에 다 갚았어요." 이러면요? 판례가 갈려요. 갚았어도 거절 가능하다는 판결도 있고, 갚았으면 거절 못 한다는 판결도 있어요. 분쟁 가능성 있으니 연체 자체를 안 하는 게 최선이에요.</p>

      <Divider />
      <H2>계약갱신청구권 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
