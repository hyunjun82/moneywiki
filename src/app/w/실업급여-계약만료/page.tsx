// Q1. 계약직으로 일하다 계약이 끝났는데 실업급여를 받을 수 있는지 궁금한 상황
// Q2. 계약만료 후 실업급여 수급자격을 확인하고 신청을 완료할 수 있어야 함
// Q3. 계약만료 = 비자발적 퇴사, 고용보험 180일 요건, 본인 갱신 거부 시 자발적 퇴사 주의, 이직확인서 사유 확인, 2026년 상한액 68,100원
// Q4. EligibilityChecker(자격) + Steps(신청 절차) + GreenBox(핵심 정리) + Checklist + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "계약기간 만료로 퇴직했어요 (회사가 갱신을 거부)" },
  { id: "c2", label: "퇴직 전 18개월 이내에 고용보험 180일 이상 가입했어요" },
  { id: "c3", label: "이직확인서에 퇴직 사유가 '계약기간 만료'로 기재돼 있어요" },
  { id: "c4", label: "재취업 의사가 있고 구직활동이 가능해요" },
];

const STEPS_DATA = [
  {
    title: "워크넷 구직등록",
    desc: "워크넷(work.go.kr)에 접속해서 구직등록을 먼저 하세요. 고용센터 방문 전에 완료해야 해요.",
    tip: "스마트폰으로도 가입·등록이 가능해요",
  },
  {
    title: "수급자격 신청자 온라인 교육 이수",
    desc: "고용24(ei.go.kr)에서 온라인 교육을 수강하세요. 약 1시간 정도 걸려요.",
  },
  {
    title: "관할 고용센터 방문 신청",
    desc: "신분증, 통장 사본을 지참하고 관할 고용센터를 방문하세요. 수급자격 인정 심사를 받게 돼요. 보통 14일 이내에 결과가 나와요.",
    tip: "고용24나 1350으로 사전 예약하면 대기 시간을 줄일 수 있어요",
  },
  {
    title: "대기기간 7일 후 첫 실업인정",
    desc: "수급자격 인정 후 7일 대기기간이 지나면 첫 실업인정일이 잡혀요. 4주마다 실업인정을 받아야 실업급여가 입금되죠.",
  },
];

const CHECKLIST = [
  "이직확인서에 퇴직 사유가 '계약기간 만료'로 기재됐는지 확인",
  "고용24(ei.go.kr)에서 피보험기간 180일 이상인지 조회",
  "갱신 거부 시 근로조건 변경 증빙자료 확보 (급여명세서, 근로계약서)",
  "퇴직 후 12개월 이내에 수급자격 신청 (기한 초과 시 자격 소멸)",
  "워크넷 구직등록 + 수급자격 온라인 교육 이수",
];

const FAQS = [
  { q: "계약만료면 무조건 실업급여를 받을 수 있나요?", a: "고용보험 180일 요건과 재취업 의사가 필요해요. 1년 이상 계약직이었다면 180일은 대부분 충족되죠." },
  { q: "회사가 갱신을 제안했는데 거절하면 어떻게 되나요?", a: "자발적 퇴사로 볼 수 있어요. 다만 갱신 제안의 근로조건이 이전보다 나빠졌다면(임금 삭감, 근무지 변경 등) 비자발적으로 인정되죠." },
  { q: "이직확인서에 '자진퇴사'로 적혀 있으면요?", a: "고용센터에 정정을 요청할 수 있어요. 계약서 사본이나 만료 통보서를 증빙으로 첨부하세요. 회사가 응하지 않으면 고용센터(1350)에 신고하면 돼요." },
  { q: "여러 직장 가입기간을 합산할 수 있나요?", a: "네. A회사 100일 + B회사 100일 = 200일로 합산돼요. 단, 이전 직장에서 실업급여를 받았다면 그 이전 기간은 리셋되죠." },
  { q: "계약만료 후 퇴직금도 받을 수 있나요?", a: "실업급여와 퇴직금은 별개 제도예요. 1년 이상 근무했으면 퇴직금 대상이고, 14일 이내 미지급 시 연 20% 지연이자를 청구할 수 있어요." },
  { q: "2026년 실업급여 금액은 얼마인가요?", a: "1일 상한액 68,100원, 하한액 66,048원이에요. 퇴직 전 평균임금의 60%로 계산하되, 상·하한액 범위 내에서 결정되죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 비자발적 이직 사유", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 계약직 권리 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기간제-실업급여", title: "기간제 근로자 실업급여 수급 조건", description: "기간제 계약이 끝나면 실업급여를 받을 수 있는 조건을 정리했어요." },
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간, 최대 몇 개월?", description: "가입기간과 나이에 따라 수급기간이 달라지는 기준을 정리했어요." },
  { slug: "실업급여-조기재취업수당", title: "조기재취업수당 조건과 금액", description: "실업급여 받다가 빨리 취업하면 남은 금액의 일부를 돌려받을 수 있죠." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-계약만료"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 계약직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 계약만료, 비자발적 퇴사로 인정되나?<br />
        수급 조건과 신청법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;계약 끝났으니 다음 달부터 안 나와도 돼요.&rdquo; 이 말을 듣는 순간 머릿속이 복잡해지죠.
      </p>
      <p style={body}>
        받을 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>은
        계약기간 만료를 비자발적 이직으로 분류하고 있거든요. 내가 그만두겠다고 한 게 아니라 계약이 끝난 거니까요.
      </p>
      <p style={body}>
        2026년 기준 1일 상한액 68,100원, 하한액 66,048원이에요. 가입기간에 따라 120일에서 최대 270일까지 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수급 자격이 되는지 먼저 확인하세요</H2>
      <p style={body}>
        계약만료로 퇴직했다면 비자발적 이직이에요. 여기에 고용보험 180일 요건과 재취업 의사만 충족되면 수급자격이 돼요. 1년 이상 계약직이었다면 180일은 자연스럽게 넘기니까 크게 걱정할 건 없어요.
      </p>
      <p style={body}>
        6개월 이하 단기 계약을 반복한 경우라도 여러 직장의 가입기간이 합산되니, 합쳐서 180일 넘으면 자격이 돼요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} />

      <Divider />

      <H2>본인이 갱신을 거절하면 어떻게 되나요?</H2>
      <p style={body}>
        회사는 갱신하겠다고 했는데 본인이 거절했다면 자발적 퇴사로 볼 수 있어요. 이 경우 실업급여가 안 나올 수 있죠.
      </p>
      <p style={body}>
        다만 정당한 사유가 있으면 인정돼요. 임금이 30% 이상 삭감되거나, 통근 시간이 왕복 3시간 이상으로 늘어나거나, 근무지가 멀리 변경된 경우가 해당되죠.
      </p>
      <GreenBox title="갱신 거절해도 비자발적으로 인정되는 경우">
        임금 30% 이상 삭감 | 근무지 변경으로 통근 왕복 3시간 초과 | 근로시간 대폭 변경 | 직장 내 괴롭힘·성희롱
      </GreenBox>
      <p style={body}>
        갱신 거부 시 근로조건이 어떻게 변경됐는지 증빙할 수 있는 자료(근로계약서, 급여명세서 등)를 반드시 확보해두세요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        워크넷 구직등록 → 온라인 교육 이수 → 고용센터 방문 순서예요. 퇴직 후 12개월 이내에 신청해야 하니 미루지 마세요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>신청 전에 꼭 확인할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <BorderBox title="이직확인서가 잘못 적혀 있다면">
        회사가 이직확인서에 &ldquo;자진퇴사&rdquo;로 기재했더라도 고용센터에 정정을 요청할 수 있어요. 계약서 사본, 만료 통보 문자·이메일을 증빙으로 첨부하세요. 회사가 정정에 응하지 않으면{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>나 1350에 신고하면 되죠.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 개별 수급자격은 고용센터 심사에 따라 달라질 수 있으니 정확한 판단은 고용센터에 문의하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
