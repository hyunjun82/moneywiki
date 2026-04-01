// Q1. 실업급여를 며칠이나 받을 수 있는지 궁금한 퇴직 예정자·퇴직자
// Q2. 본인의 소정급여일수를 확인하고 총 수령 가능 금액을 파악할 수 있어야 함
// Q3. 나이(50세 기준)와 고용보험 가입기간(합산)으로 120~270일 결정, 달력 기준, 이전 수급 시 리셋, 2026 상한액 68,100원
// Q4. GreenBox(기준표) + BorderBox(최대 수령액) + EligibilityChecker(내 일수 확인) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일 기준 만 50세 미만이에요" },
  { id: "c2", label: "고용보험 총 가입기간이 10년 이상이에요" },
  { id: "c3", label: "이전에 실업급여를 받은 적이 없어요 (받았다면 이후 기간만 합산)" },
];

const CHECKLIST = [
  "고용24에서 피보험기간 조회 (여러 직장 합산 기간 확인)",
  "퇴직일 기준 만 나이 확인 (만 50세 전후로 30일 차이)",
  "이전 실업급여 수급 이력 확인 (수급 이전 기간은 리셋)",
  "퇴직 후 12개월 이내 수급자격 신청 (소정급여일수가 남아도 12개월 초과하면 소멸)",
];

const FAQS = [
  { q: "소정급여일수에 주말·공휴일도 포함되나요?", a: "네, 달력 기준이에요. 토·일·공휴일 모두 포함해서 세니까 실제 실업인정 횟수와는 다를 수 있어요." },
  { q: "소정급여일수를 다 못 쓰면 이월되나요?", a: "안 돼요. 퇴직 후 12개월(수급기간) 안에 소진해야 하고, 기한이 지나면 남은 일수는 소멸돼요." },
  { q: "49세에 퇴직하면 50세 기준을 못 받나요?", a: "그래요. 만 나이 기준이에요. 생일이 얼마 안 남았다면 퇴직일을 며칠 늦출 수 있는지 확인해보세요. 30일 차이가 상한액 기준 약 204만 원이에요." },
  { q: "장애인이면 나이와 관계없이 50세 이상 기준인가요?", a: "맞아요. 장애인은 나이와 관계없이 50세 이상·장애인 기준을 적용받아요." },
  { q: "여러 직장 가입기간이 합산되나요?", a: "네, A회사 2년 + B회사 3년이면 총 5년이에요. 다만 중간에 실업급여를 받았다면 그 이전 기간은 리셋돼요." },
  { q: "가입기간은 어디서 확인하나요?", a: "고용24(ei.go.kr)에서 피보험자격 이력 조회 메뉴에 들어가면 각 직장별 기간과 합산 기간이 나와요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제50조: 소정급여일수", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 피보험기간 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-기초일액", title: "실업급여 기초일액 계산 방법", description: "1일 지급액이 어떻게 정해지는지, 상한액·하한액 기준을 정리했어요." },
  { slug: "실업급여-수급기간-몇개월-받나요", title: "실업급여 수급기간 12개월 기한", description: "소정급여일수를 다 받으려면 언제까지 신청해야 하는지 정리했어요." },
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "비자발적 퇴사, 180일 요건 등 수급자격 조건을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-소정급여일수"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 수급기간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 소정급여일수, 나이·가입기간별 며칠 받나?<br />
        2026년 기준표와 최대 수령액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;실업급여 며칠이나 받을 수 있어? 3년 일했으면 몇 개월?&rdquo;
      </p>
      <p style={body}>
        소정급여일수는 실업급여를 받을 수 있는 총 일수예요. <strong>나이</strong>와 <strong>고용보험 가입기간</strong> 두 가지로 정해지죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>에
        기준표가 딱 나와 있어요.
      </p>
      <p style={body}>
        같은 5년을 일해도 40대는 210일, 55세는 240일이에요. 30일 차이가 2026년 상한액 68,100원 기준 약 204만 원이나 되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>소정급여일수는 어떻게 정해지나요?</H2>
      <p style={body}>
        기준은 딱 두 가지예요. <strong>고용보험 가입기간</strong>과 <strong>퇴직일 기준 나이</strong>. 가입기간이 길수록, 나이가 많을수록 더 오래 받을 수 있어요.
      </p>
      <p style={body}>
        가입기간은 마지막 직장만이 아니라 이전 직장까지 합산돼요. 다만 중간에 실업급여를 받은 적이 있으면 그 이전 기간은 리셋되죠.
      </p>
      <p style={body}>
        나이는 만 50세를 기준으로 나뉘어요. 50세 이상은 재취업이 상대적으로 어렵기 때문에 같은 가입기간이라도 30일씩 더 많아요. 장애인도 50세 이상과 동일 기준이에요.
      </p>
      <GreenBox title="2026년 소정급여일수 기준표">
        1년 미만: 50세 미만 120일 / 50세 이상 120일 | 1~3년: 150일 / 180일 | 3~5년: 180일 / 210일 | 5~10년: 210일 / 240일 | 10년 이상: 240일 / 270일
      </GreenBox>

      <Divider />

      <H2>2026년 상한액 기준 최대 얼마를 받나요?</H2>
      <p style={body}>
        2026년 1일 상한액은 <strong>68,100원</strong>이에요. 소정급여일수별 최대 총액을 계산하면 꽤 차이가 나죠.
      </p>
      <BorderBox title="소정급여일수별 최대 수령 총액 (상한액 기준)">
        120일 → 약 817만 원 | 150일 → 약 1,022만 원 | 180일 → 약 1,226만 원 | 210일 → 약 1,430만 원 | 240일 → 약 1,634만 원 | 270일 → 약 1,839만 원
      </BorderBox>
      <p style={body}>
        실제 수령액은 퇴직 전 평균임금의 60%로 계산하기 때문에, 급여가 높지 않았다면 상한액보다 적을 수 있어요. 반대로 급여가 높았으면 상한액에서 잘리죠.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>50세 전후로 얼마나 차이가 나나요?</H2>
      <p style={body}>
        같은 4년을 일해도 49세에 퇴직하면 180일, 50세에 퇴직하면 210일이에요. 30일 차이가 상한액 기준 약 204만 원이죠.
      </p>
      <p style={body}>
        나이 기준은 <strong>퇴직일 기준 만 나이</strong>예요. 생년월일이 1976년 3월 1일인 사람이 2026년 2월 28일에 퇴직하면 만 49세, 3월 2일에 퇴직하면 만 50세가 되죠. 퇴직일을 며칠만 늦출 수 있다면 50세 기준을 적용받을 수 있어요.
      </p>
      <GreenBox title="장애인은 나이와 관계없이 50세 이상 기준">
        25세 장애인이 3년 일하고 퇴직해도 소정급여일수는 210일이에요. 50세 미만 기준 180일이 아니라 50세 이상 기준을 적용받죠.
      </GreenBox>

      <Divider />

      <H2>가입기간 계산에서 놓치기 쉬운 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <p style={body}>
        소정급여일수 계산에 쓰이는 가입기간과{" "}
        <a href="/w/실업급여-수급-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>수급자격 조건</a>의
        피보험기간 180일은 다른 개념이에요. 수급자격은 퇴직 전 18개월 중 180일 이상이 조건이고, 소정급여일수는 전체 합산 가입기간으로 결정되죠. 둘을 혼동하면 안 돼요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 정확한 가입기간과 수급일수는 고용24에서 직접 조회하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
