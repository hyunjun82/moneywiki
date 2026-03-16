"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현재 실업급여(구직급여)를 수급 중이에요" },
  { id: "c2", label: "7일 이상 취업이 어려운 질병이나 부상이에요" },
  { id: "c3", label: "병원에서 발급한 의사 진단서를 갖고 있어요" },
  { id: "c4", label: "고용센터에 질병·부상 사실을 신고했어요 (또는 할 예정)" },
];

const CHECKLIST = [
  "7일 이상 취업이 어려운 질병·부상인지 확인",
  "병원에서 진단서 발급 (취업 곤란 기간 명시 필수)",
  "고용센터에 상병급여 신청서 + 진단서 제출",
  "온라인 신청은 고용24(ei.go.kr)에서 가능",
  "회복 후 고용센터에 알리고 실업급여로 복귀",
];

const FAQS = [
  {
    q: "감기로 3일 누웠는데 상병급여 받을 수 있나요?",
    a: "받을 수 없어요. 상병급여는 7일 이상 취업이 어려운 경우에만 해당되죠. 3일 정도면 실업인정일 변경으로 처리하는 게 맞아요.",
  },
  {
    q: "상병급여 받는 동안 수급기간이 줄어드나요?",
    a: "줄어들죠. 상병급여 기간도 수급기간에 포함돼요. 수급기간 210일 중 상병급여 30일을 받으면 남은 실업급여는 180일이에요.",
  },
  {
    q: "진단서 없이 상병급여 신청할 수 있나요?",
    a: "불가능해요. 의사 진단서가 필수이고, 진단서에 '취업이 어려운 기간'이 명시되어야 해요. 진단서 없이는 고용센터에서 접수 자체가 안 돼요.",
  },
  {
    q: "상병급여 금액이 실업급여보다 적나요?",
    a: "똑같아요. 상병급여는 1일 구직급여와 동일한 금액이에요. 급여 수준에서 손해 보는 건 전혀 없죠.",
  },
  {
    q: "치료가 길어져서 수급기간을 넘기면 어떻게 되나요?",
    a: "수급기간이 연장될 수 있어요. 질병이 수급기간을 초과하면 그 초과분만큼 늘어나죠. 최대 4년까지 연장이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제63조 — 상병급여 지급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 수급기간 연장 규정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 상병급여 안내 및 온라인 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 실업급여 관련 상담", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-상병급여",
    title: "상병급여 조건과 신청 방법",
    description: "상병급여의 자격 요건, 금액, 기간을 한 번에 정리했어요.",
  },
  {
    slug: "상병급여-신청-조건-및-수급-방법",
    title: "상병급여 신청 조건 및 수급 방법",
    description: "상병급여 신청 절차와 수급 요건을 단계별로 정리했어요.",
  },
  {
    slug: "실업급여-중단",
    title: "실업급여 중단 사유와 대처법",
    description: "실업급여가 중단되는 이유와 복구 방법을 확인하세요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="실업급여-질병-부상"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 상병급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받다가 다쳤다면?<br />
        상병급여 전환 조건과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실업급여 받는 중인데 교통사고가 났어요. 다음 주 실업인정일에 못 가면 끊기나요?"<br />
        끊기지 않아요. <strong>상병급여</strong>로 전환하면 되죠.<br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제63조</a>에서
        질병이나 부상으로 취업이 어려운 기간에는 구직급여 대신 상병급여를 지급하도록 정하고 있어요.
        금액도 실업급여와 똑같고, 구직활동 의무도 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 상병급여란 + 자격 체크 */}
      <H2>상병급여 전환 조건은 무엇인가요?</H2>
      <p style={body}>
        상병급여는 실업급여를 받는 사람이 질병이나 부상 때문에 일을 할 수 없을 때 지급되는 급여예요. 쉽게 말하면, 아파서 구직활동을 못 하는 동안 실업급여 대신 받는 돈이죠. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 보장하는 제도예요.
      </p>
      <p style={body}>
        핵심은 <strong>금액이 실업급여와 완전히 동일</strong>하다는 점이에요. 1일 구직급여와 같은 금액을 받으니까 급여 면에서 손해 볼 일은 없죠. 상병급여 기간에는 구직활동 의무가 면제돼요. 실업인정 출석도 안 해도 되고요.
      </p>
      <p style={body}>
        그렇다면 아프기만 하면 무조건 받을 수 있을까요? 그건 아니에요. <strong>7일 이상</strong> 취업이 어려워야 하고, 반드시 <strong>의사 진단서</strong>가 필요하죠. 감기로 며칠 쉬는 정도로는 해당이 안 돼요.
      </p>

      <GreenBox title="상병급여 핵심 요약">
        대상: 실업급여 수급 중 질병·부상으로 취업이 어려운 사람<br />
        기간: 7일 이상 취업 곤란 시<br />
        금액: 실업급여(구직급여)와 동일<br />
        구직활동: 면제<br />
        필수 서류: 의사 진단서
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당돼요. 상병급여로 전환할 수 있어요. 고용센터(1350)에 바로 연락하세요."
        partialMatchText="일부 조건이 빠져 있어요. 충족되지 않은 항목을 먼저 준비하세요."
      />

      <Divider />

      {/* 섹션 2 — 7일 기준과 신청 조건 */}
      <H2>전환 조건 중 7일 기준은 어떻게 적용되나요?</H2>
      <p style={body}>
        상병급여의 가장 중요한 기준은 <strong>7일</strong>이에요. 질병이나 부상으로 7일 이상 취업이 어려운 상태여야 신청할 수 있죠. 3~4일 아픈 건 해당이 안 돼요. 입원, 수술, 골절처럼 1주일 이상 일을 못 하는 상황이어야 해요.
      </p>
      <p style={body}>
        7일 미만으로 아픈 경우에는 어떻게 하면 될까요? 실업인정일을 변경하는 방법을 쓰면 돼요. 고용센터에 미리 연락해서 "아파서 출석이 어렵다"고 알리면, 실업인정일을 뒤로 미뤄주죠. 이건 상병급여와 별개 절차예요.
      </p>
      <p style={body}>
        진단서도 아무거나 되는 게 아니에요. <strong>"취업이 어려운 기간"이 명시</strong>되어야 해요. "향후 2주간 안정 가료를 요함" 같은 문구가 반드시 들어가야 하죠. 단순히 "감기입니다"만 적힌 진단서로는 신청이 안 돼요.
      </p>

      <BorderBox title="7일 기준 정리">
        7일 이상 취업 곤란 → <strong>상병급여 신청</strong><br />
        7일 미만 → <strong>실업인정일 변경</strong>으로 처리<br />
        진단서 필수 → "취업 곤란 기간" 명시되어야 함
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 방법 + 체크리스트 */}
      <H2>상병급여 신청 절차와 제출 서류</H2>
      <p style={body}>
        상병급여 신청 절차는 간단해요. 먼저 병원에서 진단서를 발급받으세요. 진단서에 취업이 어려운 기간이 적혀 있어야 한다는 건 앞에서 말씀드렸죠. 그다음 고용센터에 상병급여 신청서와 진단서를 함께 제출하면 돼요.
      </p>
      <p style={body}>
        직접 방문이 어려우면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청할 수 있어요. 진단서를 스캔하거나 촬영해서 첨부하면 되죠. 고용센터에서 진단서를 검토한 뒤 승인하면 상병급여가 지급돼요.
      </p>
      <p style={body}>
        갑자기 아파서 실업인정일에 못 가는 상황이라면, <strong>먼저 고용센터에 연락</strong>하는 게 중요해요. 연락 없이 불참하면 그 기간 실업급여를 못 받을 수 있죠. 전화(1350) 한 통이면 처리 방향을 안내받을 수 있어요.
      </p>

      <SectionBadge>상병급여 신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 수급기간과 연장 */}
      <H2>전환 후 수급기간 포함과 연장 규정</H2>
      <p style={body}>
        한 가지 꼭 알아둬야 할 게 있어요. 상병급여를 받는 기간은 <strong>수급기간에 포함</strong>돼요. 수급기간이 210일인데 상병급여로 30일을 받으면, 남은 실업급여는 180일이 되는 거죠. 상병급여를 받았다고 수급기간이 늘어나진 않아요.
      </p>
      <p style={body}>
        그런데 질병이 오래 가면 이야기가 달라져요. 상병급여 기간이 수급기간을 초과하면, 그 초과 기간만큼 수급기간이 <strong>연장</strong>돼요. 예를 들어 수급기간 210일인데 질병으로 300일 동안 일을 못 하면, 90일이 추가로 연장되는 구조예요.
      </p>
      <p style={body}>
        연장 가능한 최대 기간은 <strong>4년</strong>이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제50조</a>에서 이 연장 규정을 두고 있죠. 장기 입원이나 중증 질환 치료 중이라면, 수급기간이 끊길 걱정은 하지 않아도 돼요.
      </p>

      <GreenBox title="수급기간 연장 예시">
        수급기간 210일 + 상병 300일 → 초과 90일 → 수급기간 90일 연장<br />
        연장 최대 한도: 4년<br />
        근거: 고용보험법 제50조
      </GreenBox>

      <Divider />

      {/* 섹션 5 — 회복 후 복귀 + 부정수급 경고 */}
      <H2>회복 후 신청 절차에 맞춰 바로 복귀하세요</H2>
      <p style={body}>
        치료가 끝나고 일할 수 있는 상태가 되면 고용센터에 알리세요. 상병급여에서 다시 실업급여(구직급여)로 전환돼요. 그때부터 구직활동과 실업인정을 다시 하면 되죠. 남은 수급기간이 있어야 받을 수 있다는 점만 기억하세요.
      </p>
      <p style={body}>
        회복 시점을 늦게 알리면 문제가 될 수 있어요. 이미 일할 수 있는 상태인데 상병급여를 계속 받으면 부정수급에 해당하죠. 부정수급이 적발되면 받은 금액의 최대 5배를 반환해야 할 수 있어요. 완치되면 바로 신고하는 게 안전해요.
      </p>
      <p style={body}>
        정리하면, 실업급여 받는 중에 아프면 당황하지 말고 <strong>상병급여로 전환</strong>하세요. 금액은 같고, 구직활동 의무는 면제되고, 장기 질병이면 수급기간 연장까지 가능하니까요. 가장 먼저 할 일은 고용센터(1350)에 전화하는 거예요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 수급 중 질병·부상에 대해 자주 나오는 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 상병급여 인정 여부는 고용센터 심사에 따라 달라질 수 있으니, 구체적인 상황은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
