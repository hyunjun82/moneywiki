"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 농지전용허가를 받았는데 바로 공사해도 되는지, 착공 전에 뭘 더 해야 하는지 모르는 상황
// Q2. 허가→부담금 납부→착공신고 순서를 지켜서 불법전용 처벌을 피한다
// Q3. 농지전용 절차(허가→부담금→착공신고→공사), 불법전용 처벌(5년 징역), 변경허가 필요 상황
// Q4. Steps 절차 + GreenBox 핵심 요약 + BorderBox 처벌 내용 + Checklist 확인사항

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PROCEDURE_STEPS = [
  {
    title: "농지전용허가를 받아요",
    desc: "농지를 농사 외 용도(건축, 창고, 주차장 등)로 쓰려면 시장·군수·구청장에게 농지전용허가를 받아야 해요. 농업진흥지역 안 농지는 농림축산식품부장관 허가가 필요해요.",
    tip: "정부24(gov.kr)에서 온라인 신청도 가능",
    link: { label: "정부24 농지전용허가", href: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09006&CappBizCD=13800000017" },
  },
  {
    title: "농지보전부담금 등 각종 부담금을 내요",
    desc: "허가를 받으면 농지보전부담금, 대체농지 조성비 등을 납부해야 해요. 부담금을 안 내면 착공신고가 안 돼요.",
    tip: "부담금 금액은 허가 통지서에 명시돼 있어요",
  },
  {
    title: "착공신고를 해요",
    desc: "부담금 납부 후 시장·군수·구청장에게 착공신고를 해요. 일정 면적 이상이면 경계측량, 분할측량, 환경영향평가 관련 신고도 함께 해야 해요.",
    tip: "관할 시·군·구청 농지과에 문의하면 필요 서류를 안내받을 수 있어요",
  },
  {
    title: "착공신고 수리 후 공사를 시작해요",
    desc: "신고가 수리되면 그때부터 공사를 시작할 수 있어요. 이 순서를 건너뛰면 불법전용이에요.",
  },
];

const CHECKLIST_ITEMS = [
  "농지전용허가증 수령 확인",
  "농지보전부담금 납부 완료",
  "착공신고서 제출 및 수리 확인",
  "경계측량·분할측량 필요 여부 확인",
  "환경영향평가 대상 여부 확인 (일정 면적 이상)",
  "변경사항 있으면 변경허가 먼저 받기",
];

const FAQS = [
  { q: "허가 없이 형질변경하면 어떤 처벌을 받나요?", a: "농업진흥지역 농지는 5년 이하 징역 또는 해당 토지가액 이하 벌금이에요. 진흥지역 밖이면 3년 이하 징역 또는 3천만원 이하 벌금이에요." },
  { q: "농지전용과 형질변경은 같은 건가요?", a: "농지전용은 농지를 농사 외 목적으로 바꾸는 것이고, 형질변경은 토지의 물리적 형태를 바꾸는 행위예요. 농지를 전용하면서 형질변경이 수반되는 경우가 대부분이에요." },
  { q: "착공신고 없이 공사하면 어떻게 되나요?", a: "허가를 받았더라도 착공신고 없이 공사하면 불법전용으로 간주될 수 있어요. 허가 취소, 원상복구 명령, 형사처벌까지 받을 수 있어요." },
  { q: "허가받은 용도를 바꾸려면 어떻게 하나요?", a: "변경허가를 받아야 해요. 면적 변경, 경계 변경, 용도 변경 모두 관할 기관의 변경허가가 필요해요. 임의로 바꾸면 허가 위반이에요." },
  { q: "농지전용 신고로 되는 경우도 있나요?", a: "소규모 농지(비진흥지역 1,000㎡ 이하 등)는 허가 대신 신고로 전용할 수 있는 경우가 있어요. 관할 시·군·구청에 확인하세요." },
];

const SOURCES = [
  { name: "농지법", href: "https://www.law.go.kr/법령/농지법" },
  { name: "찾기쉬운 생활법령 - 농지전용 절차", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1815&ccfNo=2&cciNo=1&cnpClsNo=2" },
  { name: "정부24 농지전용허가 신청", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "토지 취득 시 세금 계산법." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "토지 거래 시 중개사 역할." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "토지 매매 후 거래신고 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지 · 전용허가</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지전용허가 받으면 바로 공사해도 될까?<br />
        착공 전 신고 절차와 처벌 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지전용허가를 받았는데, 바로 땅을 파도 되는 건지 헷갈리시죠?
      </p>
      <p style={body}>
        안 돼요. <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법</a>에 따라 허가 → 부담금 납부 → 착공신고 → 공사 시작 순서를 지켜야 해요. 착공신고 없이 공사하면 허가를 받았더라도 불법전용으로 처벌받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>허가부터 착공까지 이 순서예요</H2>
      <p style={body}>
        절대 순서를 건너뛰면 안 돼요. 단계별로 정리했어요.
      </p>

      <Steps steps={PROCEDURE_STEPS} />

      <CategoryButton label="부동산" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>불법전용하면 처벌이 이렇게 나와요</H2>
      <p style={body}>
        허가 없이 농지를 바꾸면 처벌 수위가 상당히 높아요.
      </p>

      <BorderBox>
        <strong>농업진흥지역 농지</strong>: 5년 이하 징역 또는 해당 토지가액 이하 벌금{"\n"}
        <strong>진흥지역 밖 농지</strong>: 3년 이하 징역 또는 3천만원 이하 벌금{"\n"}
        <strong>추가 제재</strong>: 원상복구 명령, 허가 취소, 이행강제금 부과{"\n"}
        토지가액이 클수록 벌금도 그만큼 커지니까, 절차를 지키는 게 훨씬 싸게 먹혀요.
      </BorderBox>

      <Divider />

      <H2>착공 전 체크리스트</H2>
      <p style={body}>
        공사 시작 전에 아래 항목을 점검하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>농지전용, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실무에서 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 농지법을 바탕으로 작성했어요. 지역에 따라 세부 절차가 다를 수 있으니 관할 시·군·구청 농지과에 문의하세요." />
    </ArticleLayout>
  );
}
