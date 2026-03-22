"use client";

// Q1. 공공임대주택 하자보수에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 임대인이 수선의무를 이행하지 않으면 계약 해지 사유가 될 수 있어요, 특약으로 해지권을 유보했거나 채무불이행이 중대하면 해지 가능해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "공공임대주택 누수 안 고쳐주면 나갈 수 있나요?", a: "네, 가능해요. 임대인의 수선의무 불이행이 계약 목적을 달성할 수 없을 정도로 중대하면 계약을 해지할 수 있어요. 해지 통지 후 3개월이 지나면 효력이 발생해요." },
  { q: "하자보수 안 해주면 보증금 바로 돌려받나요?", a: "계약 해지 후 임대차 관계가 종료되면 보증금을 돌려받을 수 있어요. 다만 해지 통지일로부터 3개월이 지나야 효력이 발생하므로 그 이후에 명도하고 보증금을 청구할 수 있어요." },
  { q: "계약서에 중도 해지 불가 조항 있으면 못 나가나요?", a: "임대인의 채무불이행이 중대한 경우에는 계약서 조항과 관계없이 법적으로 해지할 수 있어요. 다만 입증 책임이 있으니 하자 발생과 요청 내용을 문서로 남겨두세요." },
  { q: "공공임대주택 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "공공임대주택 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "민법", href: "https://www.law.go.kr/법령/민법" },
];

const RELATED = [
  { slug: "임대차계약-해지", title: "임대차계약 해지 방법", description: "관련 내용 정리." },
  { slug: "전월세-보증금-반환", title: "전월세 보증금 반환 청구", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공공임대주택 하자보수 미조치 임대차계약 해지 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임대인이 수선의무를 이행하지 않으면 계약 해지 사유가 될 수 있어요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임대인의 수선의무와 하자보수</H2>
      <p style={body}>민법 제623조에 따르면 임대인은 임차인에게 목적물을 사용·수익하게 할 의무가 있어요. 여기에는 당연히 정상적으로 살 수 있는 상태를 유지해야 할 책임도 포함돼요.</p>
      <GreenBox>
        임대인이 수선의무를 이행하지 않으면 계약 해지 사유가 될 수 있어요{"\n"}
        특약으로 해지권을 유보했거나 채무불이행이 중대하면 해지 가능해요{"\n"}
        해지 통지 후 3개월이 지나면 효력이 발생해요
      </GreenBox>
      <p style={body}>천장 누수는 명백히 주택의 기본 기능을 해치는 하자예요. 비만 오면 물이 새는 집에서 어떻게 제대로 살 수 있겠어요. 이런 경우 임대인은 즉시 수선해야 할 의무가 있어요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>하자보수 미조치 시 계약해지 가능 여부</H2>
      <p style={body}>결론부터 말하면, 임대인이 수선의무를 계속 이행하지 않아 정상적인 거주가 불가능하다면 계약을 해지할 수 있어요.</p>
      <BorderBox>
        <strong>하자보수 미조치 시 계약해지 가능 여부</strong><br />
        결론부터 말하면, 임대인이 수선의무를 계속 이행하지 않아 정상적인 거주가 불가능하다면 계약을 해지할 수 있어요.<br />
        주택임대차보호법에서는 계약서에 해지권 유보 특약이 있거나, 임대인의 채무불이행이 있을 때 임차인이 계약을 중도에 해지할 수 있다고 정하고 있어요.
      </BorderBox>
      <p style={body}>주택임대차보호법에서는 계약서에 해지권 유보 특약이 있거나, 임대인의 채무불이행이 있을 때 임차인이 계약을 중도에 해지할 수 있다고 정하고 있어요.</p>

      <Divider />
      <H2>임대차계약 해지 절차</H2>
      <p style={body}>계약을 해지하려면 먼저 임대인에게 서면으로 최고(催告)를 해야 해요. "언제까지 하자를 보수하지 않으면 계약을 해지하겠다"는 내용을 내용증명으로 보내는 거예요.</p>
      <p style={body}>최고 기한이 지나도 보수하지 않으면 정식으로 계약 해지 통지를 보내세요. 역시 내용증명으로 보내는 게 좋아요. 해지 통지를 받은 날부터 3개월이 지나면 그 효력이 발생해요.</p>
      <p style={body}>효력이 발생하면 집을 비우고 보증금 반환을 청구할 수 있어요. 만약 임대인이 보증금을 안 돌려준다면 임차권등기명령을 신청하거나 보증금반환청구 소송을 제기할 수 있어요.</p>

      <Divider />
      <H2>공공임대주택 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
