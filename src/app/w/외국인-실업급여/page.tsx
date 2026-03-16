"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "취업 가능 체류자격(비자)을 보유하고 있어요" },
  { id: "c2", label: "고용보험에 가입된 상태로 일했어요 (또는 가입 확인 필요)" },
  { id: "c3", label: "고용보험 피보험단위기간 180일 이상이에요" },
  { id: "c4", label: "비자발적으로 퇴직했어요 (해고, 계약만료 등)" },
];

const CHECKLIST = [
  "본인 비자(체류자격)가 고용보험 의무가입 대상인지 확인",
  "고용보험 가입 이력 180일 이상인지 고용24에서 조회",
  "체류 기간이 남아 있는지 확인 (만료 시 비자 연장 먼저)",
  "이직확인서에 퇴직 사유가 정확히 기재됐는지 확인",
  "여권 + 외국인등록증 + 이직확인서 준비 후 고용센터 방문",
];

const FAQS = [
  {
    q: "E-9 비자로 3년 일했는데, 회사가 폐업했어요. 실업급여 받을 수 있나요?",
    a: "E-9 비자는 고용보험 가입 대상이 아니라서 실업급여를 못 받아요. 대신 출국만기보험금을 받게 되죠. 출국할 때 적립된 금액을 수령하는 방식이에요.",
  },
  {
    q: "F-4 재외동포인데, 실업급여 받는 동안 비자가 만료되면 어떻게 되나요?",
    a: "비자가 만료되면 체류 자격이 없어지니까 실업급여 지급이 중단돼요. 수급 기간 중에 비자 연장을 반드시 해야 하죠. 출입국관리사무소에서 연장 신청하세요.",
  },
  {
    q: "실업급여 받다가 본국에 잠깐 다녀와도 되나요?",
    a: "출국하면 구직활동을 할 수 없으니 지급이 중단돼요. 다시 입국하면 남은 수급기간 내에서 재개할 수 있지만, 실업인정일을 놓치면 그 기간은 지급이 안 되죠.",
  },
  {
    q: "한국어를 잘 못하는데 고용센터에서 상담이 가능한가요?",
    a: "외국인력상담센터(1577-0071)에서 통역 서비스를 제공해요. 영어, 중국어, 베트남어, 태국어 등 다국어 상담이 가능하죠. 고용센터 방문 시 통역 지원도 요청할 수 있어요.",
  },
  {
    q: "E-7 전문인력 비자인데, 고용보험에 가입 안 돼 있어요. 지금이라도 되나요?",
    a: "E-1부터 E-7까지는 임의가입 대상이에요. 사업주와 합의하면 지금이라도 가입할 수 있죠. 가입 후 180일이 지나야 수급자격이 생기니까 빨리 가입하는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 외국인 근로자 적용 범위", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "외국인근로자의 고용 등에 관한 법률", url: "https://www.law.go.kr/법령/외국인근로자의고용등에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 신청 안내", url: "https://www.ei.go.kr" },
      { label: "출입국외국인정책본부 — 체류 자격 안내", url: "https://www.immigration.go.kr" },
      { label: "외국인력상담센터 — 다국어 상담", url: "https://www.eps.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "고용보험-적용-제외",
    title: "고용보험 적용 제외 근로자 기준",
    description: "고용보험에 가입할 수 없는 근로자 유형을 정리했어요.",
  },
  {
    slug: "실업급여-고용보험-미가입",
    title: "고용보험 미가입 상태에서 실업급여 받는 법",
    description: "회사가 고용보험에 안 넣어줬을 때 대처 방법을 알려드려요.",
  },
  {
    slug: "일용직-실업급여",
    title: "일용직 실업급여 조건과 신청 방법",
    description: "일용직 근로자의 고용보험 가입과 실업급여 수급 기준이에요.",
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
          currentSlug="외국인-실업급여"
        />
      }
    >
      {/* ── 브레드크럼 ── */}
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 외국인근로자</p>

      {/* ── h1 (2줄) ── */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국인도 실업급여 받을까?<br />
        비자별 자격 조건과 신청 서류
      </h1>

      {/* ── intro (숫자+법률 포함) ── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;외국인인데 실업급여 받을 수 있나요?&quot;<br />
        비자 종류에 따라 달라요. <strong>F-2, F-4, F-5, F-6, H-2</strong> 같은 거주·취업 비자라면
        고용보험에 가입돼 있으니 내국인과 동일하게 실업급여를 받을 수 있죠.<br /><br />
        반면 <strong>E-9 비자</strong>는 고용보험이 아니라 출국만기보험 대상이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법</a>에서
        체류 자격별 적용 범위를 명확히 나누고 있고, 의무가입 대상이라면 <strong>180일</strong> 이상 가입 시 수급자격이 생겨요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1 — 의무가입 대상 비자 + GreenBox + SectionBadge + EligibilityChecker ── */}
      <H2>비자별 자격 조건이 어떻게 나뉘나요?</H2>
      <p style={body}>
        외국인이라고 전부 고용보험에서 빠지는 게 아니에요. 체류 자격에 따라 <strong>의무가입</strong>과 <strong>임의가입</strong>으로 나뉘죠. 의무가입 비자라면 회사가 반드시 고용보험에 가입시켜야 하고, 보험료도 내국인과 동일하게 내요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면 거주 계열 비자가 의무가입 대상이에요. <strong>F-2(거주)</strong>, <strong>F-5(영주)</strong>, <strong>F-6(결혼이민)</strong>은 장기 체류가 보장된 자격이라 당연히 고용보험이 적용되죠. <strong>F-4(재외동포)</strong>와 <strong>H-2(방문취업)</strong>도 의무가입 대상이에요.
      </p>
      <p style={body}>
        이 비자를 가진 근로자가 퇴직하면, 내국인과 완전히 동일한 절차로 실업급여를 신청할 수 있어요. 고용보험 180일 이상 가입, 비자발적 퇴사, 재취업 의사 — 이 세 가지만 충족하면 되죠.
      </p>

      <GreenBox title="고용보험 의무가입 비자 5종">
        F-2 (거주) — 장기 체류 자격<br />
        F-4 (재외동포) — 재외동포 취업 자격<br />
        F-5 (영주) — 영주권자<br />
        F-6 (결혼이민) — 한국인 배우자<br />
        H-2 (방문취업) — 동포 방문취업 자격
      </GreenBox>

      <SectionBadge>내 자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="실업급여 수급 가능성이 높아요. 고용센터(1350) 상담을 받아보세요."
        partialMatchText="해당하지 않는 항목이 있으면 수급이 어려울 수 있어요."
      />

      <Divider />

      {/* ── 섹션 2 — 임의가입과 E-9 + BorderBox ── */}
      <H2>E-9 비자는 왜 신청 자격이 없나요?</H2>
      <p style={body}>
        <strong>E-1부터 E-7까지</strong>는 교수, 연구, 기술지도, 전문직업 등 전문인력 비자예요. 이 비자들은 <strong>임의가입</strong> 대상이에요. 본인과 사업주가 합의하면 고용보험에 가입할 수 있고, 가입했다면 실업급여도 받을 수 있죠.
      </p>
      <p style={body}>
        그런데 <strong>E-9(비전문취업)</strong>은 완전히 다른 구조예요. E-9 비자 근로자는 고용보험 가입 대상이 아니에요. 대신 <a href="https://www.law.go.kr/법령/외국인근로자의고용등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>외국인근로자의 고용 등에 관한 법률</a>에 따라 <strong>출국만기보험</strong>에 가입되죠. 사업주가 매월 보험료를 적립하고, 근로자가 출국할 때 일시금으로 받는 방식이에요.
      </p>
      <p style={body}>
        쉽게 말하면, E-9은 &quot;한국에서 일하고 본국으로 돌아가는&quot; 구조를 전제로 설계된 비자예요. 그래서 한국에서 재취업을 전제로 하는 실업급여 대신, 출국 시 목돈을 받는 출국만기보험이 적용되는 거죠. 회사가 폐업해도 마찬가지예요.
      </p>

      <BorderBox title="E-9 비자 핵심 포인트">
        고용보험 가입 대상 아님 → <strong>실업급여 수급 불가</strong><br />
        대신 출국만기보험 가입 → <strong>출국 시 적립금 수령</strong><br />
        회사 폐업·해고되어도 → 실업급여가 아닌 <strong>출국만기보험금</strong>
      </BorderBox>

      {/* ── 섹션 2 끝 → CategoryButton + RelatedArticles + ArticleAd(mid) ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── 섹션 3 — 실업급여 조건 + 체류자격 유지 + SectionBadge + Checklist ── */}
      <H2>비자별 수급 조건과 체류 자격 유지</H2>
      <p style={body}>
        기본 조건은 동일해요. 고용보험에 <strong>180일 이상</strong> 가입돼 있어야 하고, <strong>비자발적 퇴사</strong>여야 하며, <strong>재취업 의사</strong>가 있어야 하죠. 여기까지는 내국인과 차이가 없어요.
      </p>
      <p style={body}>
        다른 점은 <strong>체류 자격 유지</strong>라는 조건이 추가된다는 거예요. 비자가 만료되면 불법체류 상태가 되니까 실업급여 지급이 중단되죠. 실업급여를 받는 동안 비자 만료일이 다가오면, <a href="https://www.immigration.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>출입국관리사무소</a>에서 비자 연장을 먼저 해야 해요.
      </p>
      <p style={body}>
        구직활동 의무도 동일하게 적용돼요. 실업인정일에 고용센터를 방문해서 구직활동 내역을 보고해야 하죠. 그런데 취업 제한 비자로 변경되면 구직활동 자체가 불가능해지니까, 비자 종류가 바뀌지 않도록 주의해야 해요.
      </p>

      <SectionBadge>신청 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* ── 섹션 4 — 신청 방법 ── */}
      <H2>신청 서류 준비와 접수 절차</H2>
      <p style={body}>
        내국인과 같은 절차예요. 먼저 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 수급자격 교육을 이수하고, 관할 고용센터에 방문해서 수급자격 인정 신청을 하면 돼요. 준비물은 여권, 외국인등록증, 이직확인서 세 가지죠.
      </p>
      <p style={body}>
        한국어가 어렵다면 <strong>외국인력상담센터(1577-0071)</strong>를 이용하세요. 영어, 중국어, 베트남어, 태국어, 인도네시아어 등 다국어 통역 서비스를 무료로 제공하고 있죠. 고용센터 방문 시 통역 지원도 요청할 수 있어요.
      </p>
      <p style={body}>
        수급자격이 인정되면 1~4주 간격으로 고용센터에 출석해서 실업인정을 받아야 해요. 실업인정일에 구직활동 내역을 보고하면, 그 기간에 해당하는 실업급여가 지급되는 구조예요. 퇴직 후 <strong>12개월 이내</strong>에 신청해야 하니까 미루지 마세요.
      </p>

      <Divider />

      {/* ── 섹션 5 — 출국 시 대안 (반환일시금) ── */}
      <H2>출국 전 신청 서류 챙기고 반환일시금 받으세요</H2>
      <p style={body}>
        실업급여를 받는 도중에 본국으로 돌아가면 지급이 중단돼요. 실업급여는 한국에서 구직활동을 하면서 받는 제도이기 때문이죠. 다시 입국하더라도 남은 수급기간 내에서만 재개할 수 있어요.
      </p>
      <p style={body}>
        실업급여를 못 받고 출국하는 경우에는 <strong>고용보험 반환일시금</strong>을 신청할 수 있어요. 본인이 납부한 고용보험료의 일부를 돌려받는 제도예요. 출국 전에 고용센터에서 신청해야 하니까, 귀국 일정이 잡히면 미리 방문하세요.
      </p>
      <p style={body}>
        정리하면, 한국에 계속 체류하면서 재취업할 계획이면 실업급여를, 본국으로 돌아갈 계획이면 반환일시금을 받는 거예요. 두 가지를 동시에 받을 수는 없으니, 본인 상황에 맞는 쪽을 선택하면 되죠.
      </p>

      <BorderBox title="출국 vs 체류 — 어떤 걸 받을까?">
        한국에서 재취업 예정 → <strong>실업급여</strong> (구직활동 필수)<br />
        본국 귀국 예정 → <strong>반환일시금</strong> (출국 전 신청)<br />
        E-9 비자 → <strong>출국만기보험금</strong> (출국 시 자동 지급)
      </BorderBox>

      <Divider />

      {/* ── FAQ (5개) ── */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        외국인 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      {/* ── References + Disclaimer ── */}
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 외국인근로자의 고용 등에 관한 법률을 바탕으로 작성됐어요. 개별 비자의 고용보험 적용 여부는 고용센터(1350) 또는 외국인력상담센터(1577-0071)에 확인하세요." />
    </ArticleLayout>
  );
}
