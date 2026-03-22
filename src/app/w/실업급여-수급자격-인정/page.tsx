// Q1. 실업급여 수급자격 신청 순서가 헷갈려서 뭘 먼저 해야 하는지 모르는 상황
// Q2. 온라인 교육 → 워크넷 구직등록 → 고용센터 방문 순서를 알고 신청을 완료할 수 있어야 함
// Q3. 3단계 순서(교육→등록→방문), 준비물(신분증·통장·이직확인서), 심사 14일, 불인정 시 90일 이내 심사청구
// Q4. Steps(신청 절차) + DocTable(준비물) + GreenBox(불인정 시 대처) + FAQ

"use client";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "수급자격 신청자 온라인 교육 수료",
    desc: "고용24(ei.go.kr)에서 온라인 교육을 수강하세요. 약 1시간이면 끝나요. 고용센터 방문 전에 완료해야 해요.",
    tip: "스마트폰에서도 수강 가능해요",
  },
  {
    title: "워크넷 구직등록",
    desc: "워크넷(work.go.kr)에 접속해서 구직등록을 해요. 1단계와 순서가 바뀌어도 괜찮지만, 방문 전에 둘 다 완료돼야 해요.",
  },
  {
    title: "관할 고용센터 직접 방문 → 수급자격 신청",
    desc: "신분증, 통장 사본을 지참하고 관할 고용센터를 방문하세요. 수급자격 인정 심사를 받게 돼요. 온라인 신청은 안 되고 반드시 직접 방문해야 해요.",
    tip: "고용24나 1350으로 사전 예약하면 대기 시간을 줄일 수 있어요",
  },
  {
    title: "심사 결과 확인 (약 14일)",
    desc: "방문 신청일로부터 보통 14일 이내에 결과가 나와요. 고용24에서 조회하거나 우편으로 통보받을 수 있죠.",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 소지" },
  { name: "본인 명의 통장 사본", required: true, where: "은행 발급" },
  { name: "이직확인서 사본", required: false, where: "회사 발급 (사업주 신고 완료 시 생략 가능)" },
  { name: "워크넷 구직등록 확인증", required: false, where: "워크넷에서 출력 또는 스마트폰 캡처" },
];

const FAQS = [
  { q: "고용센터 말고 온라인으로 신청할 수 있나요?", a: "수급자격 신청은 반드시 관할 고용센터를 직접 방문해야 해요. 온라인 신청은 안 되죠. 방문 전에 온라인 교육과 워크넷 등록만 미리 해두면 돼요." },
  { q: "심사 기간 중에 실업인정을 받을 수 있나요?", a: "안 돼요. 수급자격 인정 후에 첫 실업인정일이 지정되고, 그때부터 실업급여가 나와요." },
  { q: "심사에서 불인정되면 어떻게 하나요?", a: "통보받은 날부터 90일 이내에 고용보험심사관에게 심사청구를 할 수 있어요. 고용24에서 온라인으로 하거나 고용센터에 서면으로 제출하면 되죠." },
  { q: "이직확인서를 회사가 제출하지 않았으면요?", a: "고용센터에 먼저 방문해서 상담받으세요. 회사에 이직확인서 제출을 독촉할 수 있고, 미제출 시 과태료가 부과되니 회사도 결국 제출하게 돼요." },
  { q: "심사 중 추가 서류 요청이 올 수 있나요?", a: "네. 이직 사유를 확인하기 위해 추가 서류나 진술을 요청할 수 있어요. 전화를 놓치면 심사가 지연되니 연락을 잘 받아야 하죠." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 제43조: 수급자격의 인정", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 수급자격 신청 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-교육", title: "실업급여 온라인 교육 수강 방법", description: "고용24 교육 수강 절차와 고용센터 방문 기한을 정리했어요." },
  { slug: "실업급여-실업신고", title: "실업급여 워크넷 구직등록", description: "수급자격 신청 전 필수인 워크넷 구직등록 방법을 정리했어요." },
  { slug: "실업급여-심사청구-및-재심사청구-방법", title: "심사청구·재심사청구 방법", description: "수급자격 불인정 시 이의신청 절차와 기한을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-수급자격-인정"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 수급자격</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 수급자격 인정, 고용센터 심사 절차는?<br />
        준비물과 불인정 시 대처법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;수급자격 신청을 하려는데 순서가 헷갈려요. 뭐부터 해야 하나요?&rdquo;
      </p>
      <p style={body}>
        순서가 있어요. 온라인 교육 수료 → 워크넷 구직등록 → 고용센터 방문 신청. 이 순서를 지켜야 헛수고가 없죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제43조</a>에
        따라 수급자격 인정 심사는 보통 <strong>14일 이내</strong>에 결과가 나와요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신청 절차는 어떤 순서인가요?</H2>
      <p style={body}>
        온라인 두 가지(교육·등록)를 먼저 마치고, 고용센터를 한 번 방문하면 돼요. 1단계와 2단계 순서는 바뀌어도 괜찮지만, 방문 전에 둘 다 완료해야 해요.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>고용센터에 뭘 가져가야 하나요?</H2>
      <p style={body}>
        신분증만 안 빠뜨리면 나머지는 현장에서도 처리할 수 있어요. 다만 미리 준비하면 대기 시간을 줄일 수 있죠.
      </p>
      <SectionBadge>준비물</SectionBadge>
      <DocTable docs={DOCS} />
      <p style={body}>
        사전 예약을 추천해요. 고용센터는 대기가 1~2시간 이상 걸릴 수 있어요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>나
        1350으로 예약하면 정해진 시간에 바로 상담받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>심사에서 뭘 확인하나요?</H2>
      <p style={body}>
        핵심은 이직 사유예요. 비자발적 이직(권고사직, 계약 만료, 도산 등)인지를 판단하죠. 사업주가 제출한 이직확인서 내용과 수급자의 진술이 일치하는지 확인해요.
      </p>
      <p style={body}>
        자발적 퇴사라도 정당한 사유(직장 내 괴롭힘, 임금 체불, 통근 3시간 초과 등)가 있으면 예외로 인정돼요. 증빙자료(문자, 이메일, 급여명세서 등)를 미리 준비해두면 유리하죠.
      </p>
      <BorderBox title="심사 기간 주의사항">
        심사 기간 중 고용센터에서 추가 서류나 진술을 요청할 수 있어요. 연락을 놓치면 심사가 지연되니 전화를 잘 받으세요. 고용24 알림을 켜두면 진행 상황을 놓치지 않아요.
      </BorderBox>

      <Divider />

      <H2>불인정되면 어떻게 하나요?</H2>
      <p style={body}>
        이의신청이 가능해요. 불인정 통보를 받은 날부터 <strong>90일 이내</strong>에 고용보험심사관에게 심사청구를 할 수 있어요.
      </p>
      <GreenBox title="불인정 시 대처 순서">
        1. 불인정 이유 확인 (통보문에 명시) → 2. 반박 증거 준비 (문자, 이메일, 녹음 등) → 3. 90일 이내 심사청구 (고용24 또는 고용센터) → 4. 심사관 결정에 불복 시 재심사청구 (다시 90일 이내)
      </GreenBox>
      <p style={body}>
        자세한 심사청구·재심사청구 절차는{" "}
        <a href="/w/실업급여-심사청구-및-재심사청구-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>심사청구·재심사청구 방법</a>에서
        확인할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 개별 수급자격 판단은 관할 고용센터(1350)에 문의하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
