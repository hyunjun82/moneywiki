"use client";

// Q1. 내 실수로 다쳤는데 산재 처리가 되는 건지 궁금한 상황
// Q2. 본인 과실 사고도 산재 인정 가능한지 판단하고 신청한다
// Q3. 업무 관련성이 핵심, 중과실·고의 제외, 판례 기준, 신청 절차
// Q4. GreenBox로 인정 기준 + BorderBox로 불인정 사유 + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "작업 중 넘어져서 다쳤는데 내 부주의라도 산재 되나요?", a: "네, 업무 수행 중 발생한 사고라면 본인 부주의여도 산재로 인정돼요. 산재보험은 과실 여부가 아니라 업무 관련성을 기준으로 판단해요." },
  { q: "안전 수칙을 안 지켜서 다쳤으면 어떻게 되나요?", a: "안전 수칙 미준수도 일반 과실로 봐요. 산재 인정 가능해요. 다만 음주 상태에서 안전장비를 의도적으로 벗고 작업하다 다쳤다면 중과실로 판단될 수 있어요." },
  { q: "음주 상태에서 사고가 나면 산재가 안 되나요?", a: "음주가 사고의 직접적 원인이면 불인정될 수 있어요. 다만 음주 상태더라도 업무 환경 자체의 위험이 사고 원인이라면 인정되는 판례가 있어요." },
  { q: "회사에서 '네 잘못이니 산재 안 된다'고 하면요?", a: "회사 판단과 공단 판단은 별개예요. 회사가 거부해도 근로복지공단에 직접 신청할 수 있어요. 공단이 독립적으로 조사해서 결정해요." },
  { q: "출퇴근 중 교통사고도 본인 과실이면 안 되나요?", a: "출퇴근 재해는 2018년부터 산재로 인정돼요. 본인 과실 교통사고여도 통상적 경로로 출퇴근 중이었다면 산재 인정 가능해요." },
  { q: "산재 신청하면 회사에 불이익이 가나요?", a: "사업주의 산재보험료율이 올라갈 수 있어요. 그래서 회사가 산재 처리를 꺼리는 경우가 있지만, 근로자의 산재 신청 권리는 보장돼요. 회사가 산재 신청을 방해하면 처벌 대상이에요." },
];

const SOURCES = [
  { name: "산업재해보상보험법 제37조", href: "https://www.law.go.kr/법령/산업재해보상보험법" },
  { name: "근로복지공단", href: "https://www.comwel.or.kr" },
];

const RELATED = [
  { slug: "산업재해-보상-신청-절차-기한", title: "산업재해 보상 신청 절차", description: "산재 신청 5단계와 필요 서류." },
  { slug: "업무상-재해-인정-요건", title: "업무상 재해 인정 요건", description: "어떤 경우에 업무상 재해로 인정되나요." },
  { slug: "건설-일용직-실업급여-수급-조건", title: "건설일용직 실업급여", description: "건설 일용직의 실업급여 수급 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 산재 · 과실</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내 실수로 다쳐도 산재 되나요?<br />
        본인 과실 산재 인정 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        작업 중에 넘어져서 다쳤는데 "네 부주의잖아"라는 말을 듣고 산재 포기하려는 건 아니죠.
      </p>
      <p style={body}>
        결론부터 말하면, 본인 과실이어도 산재 인정돼요. <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제37조</a>는 업무상 사유로 발생한 부상·질병을 산재로 인정해요. 핵심은 과실 여부가 아니라 "업무와 관련이 있느냐"예요. 다만 고의 자해나 범죄행위는 제외돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>산재는 과실이 아니라 업무 관련성으로 판단해요</H2>
      <p style={body}>
        산재보험은 무과실책임 원칙이에요. 근로자에게 과실이 있더라도 업무 수행 중 발생한 사고면 원칙적으로 산재에 해당해요. 안전모를 안 썼다거나, 작업 절차를 잘못 따랐다거나 하는 일반적 부주의는 산재 인정에 영향을 주지 않아요.
      </p>

      <GreenBox>
        본인 과실 산재 인정 기준{"\n"}
        - 업무 수행 중 발생한 사고 → 본인 부주의여도 인정{"\n"}
        - 안전 수칙 미준수 → 일반 과실, 인정됨{"\n"}
        - 출퇴근 중 본인 과실 교통사고 → 통상 경로면 인정{"\n"}
        - 업무 관련 스트레스로 인한 질병 → 인과관계 입증 시 인정
      </GreenBox>

      <p style={body}>
        산재법이 이렇게 넓게 보호하는 이유가 있어요. 근로자가 사업장에서 일하다 다치는 건 사업 활동에 수반되는 위험이지, 개인의 책임만은 아니라고 보는 거예요.
      </p>

      <CategoryButton label="근로/노동" count={12} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이런 경우에는 산재가 안 될 수 있어요</H2>
      <p style={body}>
        모든 사고가 다 산재가 되는 건 아니에요. 법에서 정한 불인정 사유가 있어요.
      </p>

      <BorderBox>
        <strong>산재 불인정 사유</strong><br />
        - 고의 자해 또는 자살 시도 (업무 스트레스 입증 시 예외)<br />
        - 범죄행위로 인한 부상<br />
        - 음주·약물이 사고의 직접 원인인 경우<br />
        - 업무와 무관한 사적 행위 중 발생한 사고<br />
        - 정상적 인식 능력이 없는 상태에서의 자해
      </BorderBox>

      <p style={body}>
        음주 관련은 판단이 미묘해요. 술을 마신 상태여도 사고 원인이 작업 환경의 위험(미끄러운 바닥, 안전장치 미비 등)이라면 산재로 인정된 판례가 있어요. "음주 = 무조건 불인정"은 아니에요.
      </p>

      <Divider />

      <H2>회사가 거부해도 직접 신청할 수 있어요</H2>
      <p style={body}>
        "네 잘못인데 무슨 산재냐"라며 회사가 산재 처리를 거부하는 경우가 많아요. 하지만 산재 신청은 근로자의 권리예요.
      </p>
      <p style={body}>
        <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 직접 신청하면 돼요. 사업주 확인 날인 없이도 접수 가능해요. 사업주 미확인 사유서를 함께 제출하면 공단이 독립적으로 조사해서 판단해요. 회사 눈치 볼 필요 없어요.
      </p>
      <p style={body}>
        <a href="/w/산업재해-보상-신청-절차-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>산재 신청 절차</a>를 참고해서 필요 서류를 준비하세요.
      </p>

      <Divider />

      <H2>본인 과실 산재 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부주의, 음주, 출퇴근 사고 등 실제로 자주 부딪히는 상황이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 산업재해보상보험법과 판례를 바탕으로 작성했어요. 개별 사안에 따라 판단이 달라질 수 있으니 근로복지공단(1588-0075)이나 노무사 상담을 권해요." />
    </ArticleLayout>
  );
}
