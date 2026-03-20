"use client";

// Q1. 중간정산 신청을 결심했는데 어떤 사유 서류를 어디서 발급받아야 하는지 모르는 상황
// Q2. 내 사유에 맞는 서류 목록을 확정하고, 각 서류를 발급받아 인사팀에 제출한다
// Q3. 7가지 법정 사유 각각에 대응하는 서류 + 발급처 + 핵심 주의사항(의료비 6개월치 초과 증명, 무주택 입증 방식 등), 서류 불완전 시 거부 리스크
// Q4. GreenBox(7가지 사유 요약) + DocTable(사유별 서류) + Steps(발급 절차) + Checklist(제출 전 확인) + FAQ
//
// MAP:
// Q1 → 서론: 서류 목록을 모르면 재제출로 2~3주 더 걸린다는 상황 공감
// Q2 → H2 순서: 사유 해당 여부 → 사유별 서류 목록 → 발급 절차 → 제출 전 체크 → FAQ
// Q3 → H2 5개: 사유 7개 상세 + 서류 발급처 + 주의사항
// Q4 → GreenBox, DocTable, Steps, Checklist, FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const DOCS_COMMON = [
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 (법정 양식 없음, 자체 양식 사용)" },
];

const DOCS_HOUSING = [
  { name: "주택 매매계약서 (본인·배우자 명의)", required: true, where: "부동산 계약 시 수령 (사본 제출)" },
  { name: "무주택 확인 서류 (주민등록 초본)", required: true, where: "정부24(gov.kr) 무료 발급" },
];

const DOCS_RENT = [
  { name: "임대차계약서 (전세·보증부 월세)", required: true, where: "임대인에게 사본 수령" },
  { name: "무주택 확인 서류 (주민등록 초본)", required: true, where: "정부24(gov.kr) 무료 발급" },
];

const DOCS_MEDICAL = [
  { name: "진단서 (주치의 발급, 6개월 이상 요양 명기)", required: true, where: "병원 원무과" },
  { name: "예상 의료비 확인서 또는 치료비 영수증", required: true, where: "병원 발급 (월급 6개월치 초과 입증용)" },
];

const DOCS_BANKRUPTCY = [
  { name: "파산 선고 결정문 (법원 발행)", required: true, where: "관할 법원 또는 대법원 전자소송(ecfs.scourt.go.kr)" },
];

const DOCS_REHAB = [
  { name: "개인회생 절차 개시 결정문 (법원 발행)", required: true, where: "관할 법원 또는 대법원 전자소송(ecfs.scourt.go.kr)" },
];

const DOCS_DISASTER = [
  { name: "천재지변 피해 확인서", required: true, where: "관할 지방자치단체(구청·군청) 발급" },
];

const DOCS_WAGE_PEAK = [
  { name: "임금피크제 적용 확인서 또는 취업규칙 변경 공고문", required: true, where: "회사 인사팀 발급" },
];

const DOCS_EDUCATION = [
  { name: "등록금 납부 고지서 또는 수강료 영수증", required: true, where: "학교·학원·기관 발급" },
  { name: "재학 증명서 또는 입학 허가서", required: false, where: "해당 학교 발급" },
];

const DOCS_JEONSE_REPAY = [
  { name: "임대차계약서 (무주택자 전세보증금 상환용)", required: true, where: "임대인에게 사본 수령" },
  { name: "무주택 확인 서류 (주민등록 초본)", required: true, where: "정부24(gov.kr) 무료 발급" },
  { name: "전세보증금 상환 관련 증빙 (채무확인서 등)", required: true, where: "임대인 또는 금융기관 발급" },
];

const STEPS = [
  {
    title: "정부24에서 주민등록 초본 발급 (주택·전세 사유)",
    desc: "정부24(gov.kr) 로그인 → 주민등록 초본 발급 신청 → 무료. 부동산 미보유 확인이 목적이라면 '주소변동사항 포함' 옵션을 선택해요. 발급 즉시 출력해 인사팀에 제출하면 되죠.",
    tip: "공동인증서(구 공인인증서) 또는 간편인증(카카오·네이버)으로 발급 가능해요",
  },
  {
    title: "병원 원무과에서 진단서 + 예상 의료비 확인서 발급 (의료비 사유)",
    desc: "진단서에는 '6개월 이상 요양 필요' 문구가 명시돼야 해요. 이미 발생한 의료비는 영수증, 앞으로 발생할 의료비는 예상 치료비 확인서를 별도로 요청해야 하죠. 서류 2종이 합쳐져서 '월급 6개월치 초과'를 증명하게 돼요.",
    tip: "의료비가 아직 발생 전이라면 예상 치료비 확인서 발급 가능 여부를 병원에 먼저 문의해봐요",
  },
  {
    title: "법원 결정문 수령 (파산·개인회생 사유)",
    desc: "파산 선고 또는 개인회생 절차 개시 결정을 받은 경우 법원 발행 결정문 사본 하나만 있으면 충분해요. 대법원 전자소송 사이트(ecfs.scourt.go.kr)에서 열람·출력도 가능하죠.",
    tip: "결정문 원본은 보관하고 사본을 제출하는 게 원칙이에요",
  },
  {
    title: "인사팀에 사전 서류 목록 확인 (모든 사유 공통)",
    desc: "위 서류를 전부 준비하기 전에 인사팀에서 내부 기준과 추가 요구 서류 목록을 먼저 받아두는 게 가장 빠른 방법이에요. 취업규칙에 별도 기준이 있는 회사는 법정 서류 외에 추가 서류를 요구하는 경우도 있죠.",
    tip: "인사팀에 '사유별 서류 체크리스트'를 이메일로 요청해두면 나중에 근거 자료로 쓸 수 있죠",
  },
];

const CHECKLIST = [
  "중간정산 신청서: 공통 필수, 인사팀 양식 사전 수령",
  "주택 구입 사유: 매매계약서 + 주민등록 초본 (무주택 확인)",
  "주택 임차 사유: 임대차계약서 + 주민등록 초본 (무주택 확인)",
  "의료비 사유: 진단서(6개월 이상 요양 명기) + 의료비 영수증 또는 예상 치료비 확인서",
  "파산·개인회생 사유: 법원 결정문 사본 1부",
  "천재지변 사유: 지자체 발급 피해 확인서",
  "임금피크제 사유: 임금피크제 적용 확인서 또는 취업규칙 변경 공고문",
  "학자금 사유: 등록금 납부 고지서 또는 수강료 영수증",
  "무주택 전세보증금 상환 사유: 임대차계약서 + 무주택 확인서 + 채무확인서",
];

const FAQS = [
  {
    q: "전세 계약 갱신도 중간정산 사유가 되나요?",
    a: "원칙적으로 신규 계약만 해당해요. 갱신은 사유에서 제외되는 경우가 많죠. 무주택자가 전세보증금을 상환하기 위한 목적이라면 별도 사유로 인정될 수 있고요. 불명확한 경우 고용노동부(1350)에 먼저 문의하는 게 빠르죠.",
  },
  {
    q: "의료비 사유에서 '월급 6개월치 초과'를 어떻게 증명하나요?",
    a: "진단서와 예상 의료비 확인서(또는 발생한 의료비 영수증)를 합산해서 본인 월 급여의 6배를 넘는다는 걸 보여줘야 해요. 예를 들어 월 300만원이면 1,800만원 이상의 의료비가 증빙돼야 하죠.",
  },
  {
    q: "서류가 하나 빠지면 거부될 수 있나요?",
    a: "거부될 수 있죠. 중간정산은 회사 재량이라서 서류가 불완전하면 반려 가능하죠. 재제출까지 2~4주가 더 걸리기 때문에 처음 제출 때 완비하는 게 중요하죠.",
  },
  {
    q: "임금피크제로 임금이 줄면 따로 증빙해야 하나요?",
    a: "네. 임금피크제 적용 확인서나 취업규칙 변경 공고문을 첨부해야 해요. 회사 인사팀에서 발급받을 수 있고, 이 서류 하나로 충분하죠.",
  },
  {
    q: "무주택 확인서는 뭘 제출하면 되나요?",
    a: "주민등록 초본이 가장 많이 쓰여요. 정부24(gov.kr)에서 무료 발급 가능하죠. 부동산 미보유 사실은 등기부등본으로도 확인할 수 있는데, 인사팀에서 어떤 서류를 선호하는지 먼저 확인해봐요.",
  },
  {
    q: "파산·개인회생 서류는 원본이 필요한가요?",
    a: "대부분 사본으로 가능해요. 다만 회사마다 기준이 다를 수 있어서 인사팀에 원본 대조 여부를 먼저 물어보는 게 확실하죠.",
  },
  {
    q: "학자금 사유는 본인 학비만 되나요?",
    a: "근로자퇴직급여보장법 시행령에서는 본인, 배우자, 부양가족의 학자금을 포함해요. 배우자나 자녀 학비도 해당되죠. 납부 고지서나 영수증에 이름이 달라도 가족관계증명서와 함께 제출하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 법정 사유 7가지", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
      { label: "정부24: 주민등록 초본 발급", url: "https://www.gov.kr" },
      { label: "대법원 전자소송: 결정문 열람", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "퇴직금 중간정산 조건", description: "7가지 법정 사유와 자격 요건 정리." },
  { slug: "퇴직금-중간정산-신청서", title: "퇴직금 중간정산 신청서", description: "신청서 작성법과 양식 다운로드." },
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 전체 안내", description: "중간정산 요건부터 절차까지 한 번에." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-사유별-증빙서류" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 증빙서류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 서류가 없으면 거부돼요<br />
        사유별 증빙서류와 발급처 안내
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>은 서류가 완비돼야 회사가 승인해요.
        사유는 맞는데 서류가 하나 빠지면 반려되고, 다시 준비해서 제출하는 데 2~4주가 추가로 걸려요.
        주택 구입, 의료비, 파산·개인회생 등 사유마다 필요한 서류가 달라서 내 사유에 맞는 목록을 먼저 파악하는 게 중요하죠.
        어떤 서류를 어디서 발급받는지 사유별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 법정 사유 7가지 */}
      <H2>중간정산, 이 7가지 사유 중 하나에 해당해야 신청할 수 있죠</H2>
      <p style={body}>
        중간정산은 아무 때나 신청할 수 없어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령 제3조</a>에서 정한 7가지 법정 사유 중 하나에 해당하고, 그 사유를 증명하는 서류가 있어야 해요.
        사유에 해당하더라도 회사 취업규칙에 별도 기준이 있으면 그 기준도 충족해야 하죠.
      </p>
      <p style={body}>
        사유 해당 여부가 불분명하면 인사팀 또는 고용노동부(1350)에 먼저 문의하는 게 빠른 방법이에요.
        서류를 준비하고 나서 사유 자체가 불인정되면 처음부터 다시 해야 하니까요.
      </p>

      <GreenBox>
        ① 무주택자 주택 구입 또는 전세·보증부 월세 임차<br />
        ② 본인·배우자·부양가족의 6개월 이상 요양 필요 질병·부상 (의료비 월급 6개월치 초과)<br />
        ③ 파산 선고<br />
        ④ 개인회생 절차 개시 결정<br />
        ⑤ 천재지변<br />
        ⑥ 임금피크제 적용으로 임금 삭감<br />
        ⑦ 무주택자의 전세보증금 상환 / 본인·부양가족 학자금
      </GreenBox>

      <Divider />

      {/* H2-2: 사유별 서류 목록 */}
      <H2>사유별로 준비해야 하는 서류가 달라요</H2>
      <p style={body}>
        어떤 사유든 중간정산 신청서는 공통으로 필요해요.
        인사팀에 자체 양식이 있는 경우가 많으니 신청 전에 먼저 받아두는 게 편하죠.
        아래는 사유별 필수 서류예요.
      </p>

      <SectionBadge>공통 필수 서류</SectionBadge>
      <DocTable docs={DOCS_COMMON} />

      <SectionBadge>주택 구입 사유 서류</SectionBadge>
      <DocTable docs={DOCS_HOUSING} />

      <SectionBadge>주택 임차(전세·보증부 월세) 사유 서류</SectionBadge>
      <DocTable docs={DOCS_RENT} />

      <SectionBadge>의료비 사유 서류</SectionBadge>
      <DocTable docs={DOCS_MEDICAL} />

      <BorderBox>
        의료비 사유의 핵심은 '월급 6개월치 초과' 증명이에요. 진단서에 6개월 이상 요양 필요가 명시돼야 하고, 발생했거나 예상되는 의료비 총액이 월 급여의 6배를 넘는다는 서류가 있어야 해요.
      </BorderBox>

      <SectionBadge>파산 선고 사유 서류</SectionBadge>
      <DocTable docs={DOCS_BANKRUPTCY} />

      <SectionBadge>개인회생 사유 서류</SectionBadge>
      <DocTable docs={DOCS_REHAB} />

      <SectionBadge>천재지변 사유 서류</SectionBadge>
      <DocTable docs={DOCS_DISASTER} />

      <SectionBadge>임금피크제 사유 서류</SectionBadge>
      <DocTable docs={DOCS_WAGE_PEAK} />

      <SectionBadge>학자금 사유 서류</SectionBadge>
      <DocTable docs={DOCS_EDUCATION} />

      <SectionBadge>무주택 전세보증금 상환 사유 서류</SectionBadge>
      <DocTable docs={DOCS_JEONSE_REPAY} />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 발급 절차 */}
      <H2>서류 발급, 어디서 어떻게 받나요?</H2>
      <p style={body}>
        서류 목록은 알겠는데 막상 발급 방법이 막히는 경우가 많아요.
        사유별로 자주 막히는 서류 4가지를 단계별로 정리했어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: 제출 전 체크리스트 */}
      <H2>제출 전에 이것만 체크해봐요</H2>
      <p style={body}>
        서류를 한꺼번에 모아 제출하기 전에 목록을 한 번 더 대조해봐요.
        반려되면 재발급부터 다시 해야 해서 처리가 최소 2~4주 늦어지죠.
      </p>

      <SectionBadge>사유별 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법정 사유와 서류가 완비돼도 회사가 거부할 수 있죠.<br />
        취업규칙이나 단체협약에 중간정산 관련 규정이 있다면 그 기준이 우선이고요.<br />
        신청 전에 인사팀에서 내부 기준과 추가 서류 목록을 먼저 받아두는 게 가장 확실한 방법이에요.
      </GreenBox>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 사유별 증빙서류에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
