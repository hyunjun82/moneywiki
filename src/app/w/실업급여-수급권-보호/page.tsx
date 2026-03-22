// Q1. 빚이 있는데 실업급여가 압류당하는 건 아닌지 걱정하는 상황
// Q2. 실업급여 수급권 보호 범위를 이해하고 수급계좌를 지정해서 보호받을 수 있어야 함
// Q3. 고용보험법 제38조 압류 금지, 2024.4.21부터 수급계좌 예금도 압류 금지, 국세·지방세 면제, 수급계좌 지정 방법, 기 압류 시 취소 신청
// Q4. GreenBox(보호 범위) + Steps(수급계좌 지정) + BorderBox(기 압류 대처) + FAQ

"use client";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "실업급여 수급 신청 시 계좌 지정",
    desc: "고용센터 방문 또는 고용24에서 수급자격 신청할 때 본인 명의 통장을 수급계좌로 지정하면 돼요. 국내 대부분 은행 통장이 가능하죠.",
  },
  {
    title: "수급계좌는 실업급여 전용으로 관리",
    desc: "다른 입금(월급, 송금 등)이 섞이면 실업급여 외 금액은 압류될 수 있어요. 실업급여만 입금되는 통장을 따로 관리하는 게 분쟁 예방에 좋아요.",
    tip: "실업급여 외 다른 돈이 들어오면 그 부분은 압류 대상이에요",
  },
  {
    title: "계좌 변경이 필요하면 고용센터에 신청",
    desc: "수급 중 계좌를 바꾸고 싶으면 고용센터 방문 또는 고용24에서 온라인으로 변경할 수 있어요. 새 계좌부터 압류 금지 혜택이 적용되죠.",
  },
];

const FAQS = [
  { q: "실업급여가 압류될 수 있나요?", a: "아니에요. 고용보험법 제38조에 따라 수급권은 양도·압류·담보 제공이 모두 금지돼요. 법원 압류 명령이 나와도 적용 안 되죠." },
  { q: "계좌에 입금된 실업급여도 보호되나요?", a: "2024년 4월 21일부터 실업급여수급계좌에 입금된 예금 전액이 압류 금지예요. 한도 없이 전액 보호되죠." },
  { q: "일반 통장으로 받으면 보호가 안 되나요?", a: "실업급여수급계좌로 지정된 통장만 보호돼요. 수급 신청 시 반드시 별도 계좌를 지정하세요." },
  { q: "국세 체납으로도 압류할 수 없나요?", a: "네. 실업급여로 받은 금품에는 소득세·지역소득세·건강보험료 등이 모두 면제돼요. 세금 자체가 부과되지 않으니 체납 압류도 불가능하죠." },
  { q: "이미 압류됐으면 어떻게 해야 하나요?", a: "법원에 압류 취소 신청을 하거나, 부당이득금 반환 청구를 할 수 있어요. 고용센터(1350)에 상담받으면 안내를 받을 수 있죠." },
  { q: "생계비계좌와 수급계좌는 다른 건가요?", a: "별개 제도예요. 2026년 2월부터 모든 국민이 압류 금지 생계비계좌(월 250만 원 한도)를 개설할 수 있고, 실업급여 수급자는 수급계좌와 별도로 추가 개설도 가능하죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제38조: 수급권 보호", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제37조의2: 수급계좌 압류 금지", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "생계비계좌-개설방법-압류금지", title: "생계비계좌 개설 방법", description: "2026년부터 모든 국민이 월 250만 원까지 압류 금지 계좌를 만들 수 있어요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "실업급여를 받으려면 어떤 조건이 필요한지 정리했어요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "온라인 교육부터 고용센터 방문까지 신청 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-수급권-보호"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 압류 금지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급권 보호, 압류 금지 범위는?<br />
        수급계좌 지정과 대처법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        빚이 많아서 실업급여까지 압류당하는 건 아닐까 걱정되죠.
      </p>
      <p style={body}>
        다행히 실업급여는 법으로 보호받아요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제38조</a>에
        따라 수급권은 <strong>양도·압류·담보 제공이 모두 금지</strong>돼요. 2024년 4월부터는 수급계좌에 입금된 예금까지 전액 압류 금지 대상이 됐죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어디까지 보호받나요?</H2>
      <p style={body}>
        보호 범위가 넓어요. 수급권 자체, 수급계좌 예금, 세금까지 모두 보호되죠.
      </p>
      <GreenBox title="실업급여 보호 범위 3가지">
        1. 수급권 자체: 실업급여를 받을 권리 자체를 압류할 수 없어요 | 2. 수급계좌 예금: 2024.4.21부터 수급계좌에 입금된 실업급여 전액이 압류 금지 (한도 없음) | 3. 세금 면제: 소득세·지역소득세·건강보험료 등 모두 비과세
      </GreenBox>
      <p style={body}>
        법원의 압류 명령이 나와도, 세무서의 국세 체납 압류가 들어와도 실업급여에는 적용되지 않아요. 실직자의 최소한의 생계를 보장하기 위한 강제 규정이거든요.
      </p>

      <Divider />

      <H2>수급계좌는 어떻게 지정하나요?</H2>
      <p style={body}>
        실업급여 신청할 때 본인 명의 통장을 지정하면 돼요. 별도 개설이 필요한 게 아니라 기존 통장도 가능하죠. 다만 실업급여 전용으로 관리하는 게 좋아요.
      </p>
      <SectionBadge>수급계좌 관리</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>이미 압류됐다면 어떻게 하나요?</H2>
      <p style={body}>
        2024년 4월 이전에 압류당한 경우라도 지금 조치할 수 있어요.
      </p>
      <BorderBox title="압류된 실업급여 돌려받기">
        법원에 압류 취소 신청을 하거나, 부당이득금 반환 청구를 할 수 있어요. 실업급여수급계좌에 대한 압류는 법적으로 효력이 없거든요. 고용센터(1350)에 상담받으면 구체적인 절차를 안내받을 수 있죠.
      </BorderBox>

      <Divider />

      <H2>수급계좌에 다른 돈을 넣으면 어떻게 되나요?</H2>
      <p style={body}>
        실업급여 외 다른 돈(월급, 이자, 송금 등)이 입금되면 그 부분은 압류 대상이 돼요. 실업급여 300만 원 + 월급 200만 원이 같은 계좌에 있다면, 300만 원만 보호되고 200만 원은 압류될 수 있죠.
      </p>
      <p style={body}>
        그래서 실업급여 수급계좌는 따로 관리하는 게 안전해요. 다른 용도의 통장은 별도로 만들면 나중에 분쟁이 없어요.
      </p>
      <BorderBox title="2026년 2월부터 생계비계좌도 개설 가능">
        실업급여 수급자뿐 아니라 모든 국민이 압류 금지 생계비계좌(월 최대 250만 원)를 개설할 수 있어요.{" "}
        <a href="/w/생계비계좌-개설방법-압류금지" style={{ color: "#1D9E75", textDecoration: "underline" }}>생계비계좌 개설 방법</a>도
        확인해보세요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 압류 관련 법률 판단은 변호사 상담을 받으세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
