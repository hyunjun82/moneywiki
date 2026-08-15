"use client";
// Q1. 출산하거나 질병에 걸려서 지금 당장 구직활동을 할 수 없는데 실업급여를 나중에 받을 수 있는지 궁금한 상황
// Q2. 수급유예 신청 가능 여부를 파악하고 고용24에서 실제로 신청하는 것
// Q3. 사유(질병·출산·육아·배우자 동반출국) / 신청 기한(수급기간 12개월 내) / 최대 4년 연장 계산법 / 사유 해소 후 신고
// Q4. GreenBox(인정 사유표) + BorderBox(연장 계산 예시) + Steps(신청 절차) + FAQ
// MAP-INTRO: 출산이나 질병으로 지금 당장 구직활동을 할 수 없는데 실업급여 수급기간은 흘러가고 있죠.
// MAP-TYPE: 절차
// MAP-H2: 수급유예란 수급 시계를 멈추는 제도예요 > 최대 4년이 어떻게 계산되나요? > 수급유예 신청 절차 4단계 > 신청 전 체크리스트 > 자주 묻는 것들
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "사유 발생 즉시 준비",
    desc: "질병이면 의사 소견서 또는 진단서, 출산이면 출생증명서 또는 임신확인서, 육아면 가족관계증명서, 배우자 동반출국이면 배우자 파견 발령서를 준비해요. 사유가 발생하면 바로 서류를 챙기는 게 좋아요.",
    tip: "30일 미만 질병은 인정되지 않아요. 구직활동이 어렵다는 의사 소견서가 필요해요.",
  },
  {
    title: "수급기간 내에 신청",
    desc: "퇴직 후 12개월(수급기간)이 끝나기 전에 신청해야 해요. 이 기간이 지나면 사유가 있어도 수급유예를 신청할 수 없어요. 사유 발생 시점부터 최대한 빨리 신청하는 게 안전해요.",
    tip: "소급 적용은 일부 가능하지만 증빙이 있어야 해요. 늦을수록 불리해요.",
  },
  {
    title: "고용24에서 온라인 신청",
    desc: "고용24 로그인 → 수급자격자 서비스 → 수급기간 연장 신청 → 사유 선택 및 증빙서류 업로드 → 제출. 방문을 원하면 관할 고용센터에 직접 가도 돼요.",
    tip: "온라인 신청이 더 빠르고 편해요. 서류 스캔본을 미리 준비해두세요.",
  },
  {
    title: "사유 해소 후 즉시 신고",
    desc: "사유가 해소되면 바로 고용센터에 신고해요. 신고 후 구직활동을 재개하면 남은 소정급여일수만큼 실업급여를 받을 수 있어요. 신고를 잊으면 수급기간이 그냥 지나가요.",
    tip: "사유 해소 신고 후 2~3주 내에 수급이 재개돼요.",
  },
];

const CHECKLIST = [
  "사유 확인: 질병(30일 이상), 출산, 3세 이하 육아, 배우자 동반출국",
  "수급기간 확인: 퇴직 후 12개월이 남아 있어야 해요",
  "증빙서류 준비: 진단서·출생증명서·발령서 등",
  "고용24 또는 고용센터 방문으로 신청",
  "사유 해소 시 즉시 고용센터에 신고",
  "최대 연장 한도: 원래 수급기간 포함 총 4년(48개월)",
];

const FAQS = [
  {
    q: "수급유예 신청하면 소정급여일수가 늘어나나요?",
    a: "아니에요. 소정급여일수는 변하지 않아요. 수급유예는 수급기간(12개월)을 늘려주는 거예요. 남은 소정급여일수를 쓸 수 있는 기간이 늘어나는 거죠.",
  },
  {
    q: "출산 후 얼마 동안 수급유예가 인정되나요?",
    a: "출산 후 취업이 어려운 기간이 인정돼요. 3세 이하 자녀를 직접 양육하는 경우까지 포함돼요. 어린이집·유치원을 이용하지 않고 직접 양육하는 경우여야 해요.",
  },
  {
    q: "수급기간이 이미 지났는데 수급유예 신청이 가능한가요?",
    a: "불가능해요. 수급유예는 반드시 퇴직 후 12개월(수급기간) 이내에 신청해야 해요. 이 기간이 지나면 사유가 있어도 신청할 수 없어요.",
  },
  {
    q: "수급유예 중에도 실업인정을 받아야 하나요?",
    a: "아니에요. 수급유예 사유가 인정된 기간 동안은 구직활동 의무와 실업인정이 면제돼요. 사유가 해소된 후 고용센터에 신고하면 그때부터 다시 실업인정을 받아요.",
  },
  {
    q: "질병은 얼마나 심각해야 인정되나요?",
    a: "30일 이상 취업이 불가한 경우로 의사 소견서가 있어야 해요. 단순한 감기나 가벼운 부상은 인정되지 않아요. 고용보험법 시행령에서 취업할 수 없는 상태를 구체적으로 정하고 있어요.",
  },
  {
    q: "사유가 겹치면 기간을 합산할 수 있나요?",
    a: "가능해요. 출산 후 육아가 이어지면 출산 기간과 육아 기간을 합산해서 연장이 인정될 수 있어요. 단, 총 연장 기간이 아무리 길어도 원래 수급기간 포함 4년(48개월)이 한도예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제48조: 수급기간의 연장", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 수급기간 연장 신청", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간과 소정급여일수", description: "나이·가입기간별 수급기간과 급여일수 기준이에요." },
  { slug: "실업급여-상병급여", title: "실업급여 상병급여 조건과 신청 방법", description: "수급 중 질병 시 상병급여로 전환하는 방법이에요." },
  { slug: "실업급여-해외체류", title: "실업급여 해외체류 수급 조건", description: "해외에 있어도 실업급여를 받을 수 있는 조건이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-수급유예"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 수급유예 · 수급기간 연장</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급유예 신청 방법<br />
        출산·질병 시 최대 4년 연장하기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        출산이나 질병으로 지금 당장 구직활동을 할 수 없는데 실업급여 수급기간은 흘러가고 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          고용보험법 제48조
        </a>
        에서는 이런 경우를 위해 수급기간을 최대 4년까지 연장할 수 있도록 정하고 있어요.
        수급기간이 끝나기 전에 신청해야 하고, 사유가 해소되면 남은 급여를 그대로 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수급유예란 수급 시계를 멈추는 제도예요</H2>
      <p style={body}>
        원래 실업급여 수급기간은 퇴직일로부터 12개월이에요. 이 기간 내에 소정급여일수를 모두 써야 해요.
        그런데 출산이나 질병으로 구직활동을 못 하면 12개월이 그냥 지나가 버리죠. 수급유예는 이를 막기 위한 제도예요.
      </p>
      <p style={body}>
        수급유예 사유가 인정된 기간만큼 수급기간이 연장돼요.
        예를 들어 퇴직 후 2개월 만에 출산해서 2년간 수급유예가 인정됐다면, 수급기간이 12개월에서 최대 36개월로 늘어나요.
        소정급여일수 자체는 변하지 않고, 그 급여를 쓸 수 있는 기간만 늘어나는 거예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>인정 사유</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>필요 서류</th>
            </tr>
          </thead>
          <tbody>
            {[
              { reason: "질병·부상", condition: "30일 이상 취업 불가", doc: "의사 소견서·진단서" },
              { reason: "임신·출산", condition: "임신 중 또는 출산 후", doc: "임신확인서·출생증명서" },
              { reason: "3세 이하 육아", condition: "직접 양육 (어린이집 미이용)", doc: "가족관계증명서" },
              { reason: "배우자 동반출국", condition: "배우자 해외 파견 동반", doc: "배우자 파견 발령서" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{row.reason}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.condition}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.doc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 고용보험법 시행령 기준 / 최대 연장 한도: 원래 수급기간 포함 총 4년
        </p>
      </GreenBox>

      <H2>최대 4년이 어떻게 계산되나요?</H2>
      <p style={body}>
        수급유예 기간은 원래 수급기간(12개월)에 더해지는 방식이에요.
        총 수급기간(원래 + 연장)이 4년(48개월)을 넘어가면 4년까지만 인정해요.
        사유가 아무리 길어도 4년이 한도예요.
      </p>

      <BorderBox>
        <strong>연장 계산 예시</strong><br />
        퇴직 후 3개월 수급 → 출산으로 2년 수급유예 신청 승인<br />
        → 수급기간: 12개월 + 24개월 = 36개월<br />
        → 나머지 소정급여일수를 36개월 안에 사용 가능<br />
        <br />
        <strong>최대 4년 계산</strong><br />
        수급유예 사유 합계가 3년 6개월이면 → 12 + 42 = 54개월 → 상한 48개월(4년) 적용<br />
        <br />
        ★ 소정급여일수(90~270일)는 변하지 않아요. 수급기간만 늘어나요.
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수급유예 신청 절차 4단계</H2>
      <p style={body}>
        신청 타이밍이 핵심이에요. 퇴직 후 12개월이 지나기 전에 신청해야 하고,
        사유가 생기면 최대한 빨리 신청하는 게 안전해요.
        사유 해소 후 신고를 잊으면 수급기간이 계속 흘러가요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={body}>
        신청 기한을 놓치는 경우가 많아요.
        특히 출산이나 질병으로 바쁜 시기에 12개월 기한을 놓치지 않도록 주의하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        지금 당장 할 수 있는 것: 고용24에서 수급유예 신청 메뉴를 찾아두세요.
        서류만 준비되면 온라인으로 10분 내에 신청 완료예요.
        수급기간이 남아 있을 때만 신청할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 기준 고용보험법을 바탕으로 작성됐어요. 수급유예 인정 기준은 변경될 수 있으니 고용24 또는 고용센터(1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
