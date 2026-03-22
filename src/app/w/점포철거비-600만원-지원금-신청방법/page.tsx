"use client";

// Q1. 폐업한 소상공인이 점포 원상복구 비용이 부담돼서 정부 지원금을 찾고 있는 상황
// Q2. 희망리턴패키지 점포철거비 지원 대상인지 확인하고, 서류를 갖춰 신청한다
// Q3. 지원금 600만원, 소상공인시장진흥공단 신청, 폐업 전·후 모두 가능, 심사 기준
// Q4. GreenBox(지원 요약) + Steps(신청 절차) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "소상공인시장진흥공단 홈페이지에서 신청하세요", desc: "희망리턴패키지 사업에서 점포철거비를 지원해요. 소진공(semas.or.kr) 홈페이지에서 온라인 신청하거나, 지역센터에 방문해서 신청할 수 있어요.", link: { label: "소진공 바로가기", href: "https://www.semas.or.kr" } },
  { title: "폐업 상태 또는 폐업 예정 증빙을 준비하세요", desc: "이미 폐업했다면 폐업사실증명원, 아직 영업 중이면 폐업 계획서를 제출해요. 폐업 전이라도 신청할 수 있어요." },
  { title: "점포 원상복구 견적서를 제출하세요", desc: "인테리어 철거 업체에서 받은 견적서를 제출해요. 실제 철거 비용이 600만원을 초과해도 지원금은 최대 600만원까지예요.", tip: "견적서는 2곳 이상 비교하는 게 좋아요" },
  { title: "심사 후 지원금이 입금돼요", desc: "서류 심사와 현장 확인을 거쳐 승인되면 지원금이 입금돼요. 처리 기간은 약 2~4주예요. 철거 완료 후 정산하는 방식이에요." },
];

const DOC_CHECKLIST = [
  "폐업사실증명원 / 홈택스 발급 (폐업 완료 시)",
  "사업자등록증 사본 / 폐업 전이면 현재 사업자",
  "임대차계약서 / 점포 위치 증빙",
  "원상복구 견적서 / 철거 업체 발행",
  "통장 사본 / 지원금 수령 계좌",
  "신분증 / 주민등록증 또는 운전면허증",
];

const FAQS = [
  { q: "이미 폐업했는데 신청할 수 있나요?", a: "네, 가능해요. 폐업 후에도 신청할 수 있어요. 다만 폐업 후 일정 기간 내에 신청해야 하니 빨리 하는 게 좋아요." },
  { q: "600만원이 넘는 비용은 어떻게 하나요?", a: "600만원을 초과하는 부분은 본인 부담이에요. 지원금은 최대 600만원까지만 나와요." },
  { q: "어떤 업종이든 받을 수 있나요?", a: "소상공인이면 업종 제한 없이 신청할 수 있어요. 다만 사행성 업종, 유흥주점 등은 제외될 수 있어요." },
  { q: "원상복구를 직접 하면 지원받을 수 있나요?", a: "전문 업체를 통해 철거해야 지원금 정산이 가능해요. 직접 철거하면 증빙이 어려워서 지원이 안 될 수 있어요." },
  { q: "다른 폐업 지원도 같이 받을 수 있나요?", a: "희망리턴패키지에는 점포철거비 외에 전직 교육, 재기 지원도 있어요. 여러 프로그램을 동시에 이용할 수 있어요." },
];

const SOURCES = [
  { name: "소상공인시장진흥공단", href: "https://www.semas.or.kr" },
  { name: "중소벤처기업부", href: "https://www.mss.go.kr" },
];

const RELATED = [
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금", description: "갑작스러운 위기 상황 시 긴급 지원." },
  { slug: "기초수급자-실업급여", title: "기초수급자 실업급여", description: "수급자가 실업급여도 받을 수 있는지." },
  { slug: "미환급금-조회-정부24-환급금-찾기", title: "미환급금 조회", description: "정부24에서 환급금 찾는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>소상공인 · 폐업 지원 · 점포철거비</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        폐업하는데 철거비가 부담된다면?<br />
        점포철거비 600만원 지원 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"가게 접으려는데 원상복구 비용만 수백만원이래요."</p>
      <p style={body}>
        <a href="https://www.semas.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>소상공인시장진흥공단</a>의 희망리턴패키지에서 점포 원상복구(철거) 비용을 <strong>최대 600만원</strong>까지 지원해요.
        이미 폐업한 분도 신청할 수 있어요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>지원금은 얼마, 누가 받나요?</H2>
      <GreenBox title="점포철거비 지원 핵심">
        {"지원금: 최대 600만원\n대상: 폐업 예정 또는 폐업한 소상공인\n방법: 소진공 홈페이지 또는 지역센터 방문 신청\n\n폐업 전 신청 가능 (폐업 전·후 모두 OK)\n업종 제한 거의 없음 (사행성 업종 제외)\n\n지원 내용: 인테리어 철거, 간판 철거, 원상복구 비용"}
      </GreenBox>
      <CategoryButton label="소상공인 지원" count={6} href="/category/소상공인" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <Steps steps={STEPS} />
      <Divider />

      <H2>필요한 서류</H2>
      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={DOC_CHECKLIST} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 희망리턴패키지 기준으로 작성했어요. 지원 금액, 요건, 신청 기간은 매년 바뀔 수 있으니 소상공인시장진흥공단에서 확인해 주세요." />
    </ArticleLayout>
  );
}
