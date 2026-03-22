// Q1. 실업급여 받다가 취업했는데 신고를 어떻게 해야 하는지, 조기재취업수당을 받을 수 있는지 궁금한 상황
// Q2. 재취업 신고를 기한 내에 완료하고 조기재취업수당 수령까지 할 수 있어야 함
// Q3. 2개월 이내 재취업 신고 의무, 조기재취업수당(남은 일수의 1/2), 소정급여일수 절반 이상 남겨야 함, 12개월 근무 예상, 미신고 시 부정수급
// Q4. Steps(신고 절차) + GreenBox(조기재취업수당 조건) + BorderBox(부정수급 주의) + FAQ

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
    title: "고용24에서 취업사실 신고",
    desc: "고용24(ei.go.kr)에 로그인 → 개인서비스 → 실업급여 → 취업사실신고서 메뉴에서 취업일자, 직장명, 업무 내용을 입력하면 돼요.",
    tip: "온라인이 가장 편하고, 고용센터 방문이나 팩스로도 가능해요",
  },
  {
    title: "근로계약서 등 증빙 첨부",
    desc: "취업이면 근로계약서·재직증명서, 창업이면 사업자등록증을 스캔해서 첨부하세요. 피보험자격 취득신고가 된 상태라면 생략 가능해요.",
  },
  {
    title: "조기재취업수당 신청 (해당 시)",
    desc: "소정급여일수의 절반 이상을 남기고 취업했다면 조기재취업수당을 신청하세요. 재취업 신고와 동시에 신청할 수 있어요.",
  },
  {
    title: "수당 입금 확인",
    desc: "신청 후 약 2~3주 이내에 수급계좌로 입금돼요. 고용24에서 처리 상황을 확인할 수 있죠.",
  },
];

const CHECKLIST = [
  "취업일(근로계약서 서명일 또는 출근일)로부터 2개월 이내 신고",
  "근로계약서 또는 사업자등록증 사본 준비",
  "소정급여일수 절반 이상 남았는지 확인 (조기재취업수당 조건)",
  "수급계좌 변경이 필요하면 사전에 변경 신청",
];

const FAQS = [
  { q: "재취업 신고를 안 하면 어떻게 되나요?", a: "부정수급으로 간주돼요. 받은 실업급여를 전액 환수당하고, 추가로 최대 2배까지 가산금이 부과될 수 있어요." },
  { q: "조기재취업수당은 얼마를 받나요?", a: "남은 소정급여일수의 1/2에 해당하는 금액이에요. 1일 구직급여액 5만 원이고 60일 남았다면, 5만 원 x 30일 = 150만 원을 한 번에 받을 수 있죠." },
  { q: "소정급여일수 절반을 안 남겼으면 수당을 못 받나요?", a: "조기재취업수당은 못 받아요. 하지만 재취업 신고는 반드시 해야 해요. 미신고 시 부정수급이 되니까요." },
  { q: "취업 후 다시 실업 상태가 되면요?", a: "새로 실업급여를 신청할 수 있어요. 이미 받은 급여와 조기재취업수당은 유지되고, 새 실업급여는 별도로 산정되죠." },
  { q: "창업도 재취업 신고 대상인가요?", a: "네. 사업자등록을 했거나 실제로 사업을 시작한 날부터 2개월 이내에 신고해야 해요." },
  { q: "조기재취업수당을 받으려면 12개월 근무해야 하나요?", a: "12개월 이상 계속 근무할 것으로 예상되면 신청할 수 있어요. 실제로 12개월을 다 채울 필요는 없지만, 단기 아르바이트는 해당이 안 돼요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법: 조기재취업수당", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 실업급여 신청", url: "https://www.ei.go.kr" },
      { label: "정부24: 조기재취업수당 신청", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-조기재취업수당", title: "조기재취업수당 조건과 금액", description: "조기재취업수당 자격 조건과 계산 방법을 자세히 정리했어요." },
  { slug: "실업급여-부정수급", title: "실업급여 부정수급 처벌 기준", description: "부정수급 적발 시 환수 금액과 제재 기준을 정리했어요." },
  { slug: "실업급여-받으면서-알바", title: "실업급여 받으면서 알바 60시간 기준", description: "수급 중 아르바이트를 할 수 있는 기준을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-수급중-취업"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급 중 취업, 조기재취업수당은 얼마?<br />
        재취업 신고 방법과 부정수급 주의
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 받다가 새 직장을 구하게 됐는데, 어떻게 처리해야 할지 헷갈리죠.
      </p>
      <p style={body}>
        취업하면 <strong>2개월 이내에 재취업 신고</strong>를 해야 해요. 선택이 아니라 의무예요. 신고하지 않으면 부정수급으로 받은 돈을 다 돌려줘야 하거든요.
      </p>
      <p style={body}>
        좋은 소식은 소정급여일수의 절반 이상을 남기고 취업했다면 <strong>조기재취업수당</strong>을 받을 수 있다는 거예요. 남은 일수의 절반에 해당하는 금액을 한 번에 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>재취업 신고는 어떻게 하나요?</H2>
      <p style={body}>
        고용24에서 온라인으로 하는 게 가장 편해요. 로그인해서 취업사실신고서를 작성하고 증빙서류를 첨부하면 끝이에요.
      </p>
      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>조기재취업수당 조건은 뭔가요?</H2>
      <p style={body}>
        세 가지 조건을 충족해야 해요.
      </p>
      <GreenBox title="조기재취업수당 3가지 조건">
        1. 소정급여일수의 절반 이상을 남기고 재취직 (120일이면 60일 이상 남긴 상태) | 2. 12개월 이상 계속 근무가 예상되는 직장 (65세 이상은 6개월) | 3. 최근 2년 이내 조기재취업수당을 받은 적이 없어야 함
      </GreenBox>
      <p style={body}>
        금액은 <strong>1일 구직급여액 x 미지급일수의 1/2</strong>이에요. 예를 들어 1일 5만 원씩 받고 60일이 남았다면, 5만 원 x 30일 = 150만 원을 한 번에 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>미신고하면 어떤 불이익이 있나요?</H2>
      <BorderBox title="부정수급 주의">
        재취업 신고를 안 하고 실업급여를 계속 받으면 부정수급이에요. 적발되면 받은 실업급여 전액을 돌려줘야 하고, 최대 2배까지 가산금이 부과돼요. 부정수급 기록은 이후 실업급여 신청에도 불이익이 되니 반드시 기한 내에 신고하세요.
      </BorderBox>
      <p style={body}>
        2개월 기한을 넘겼더라도 더 이상 미루지 말고 바로 신고하세요. 늦게라도 하면 부정수급 기간이 줄어들어 페널티가 작아지거든요.
      </p>

      <Divider />

      <H2>신고 전에 체크할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 정확한 수당 금액은 고용24에서 모의계산하거나 고용센터(1350)에 문의하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
