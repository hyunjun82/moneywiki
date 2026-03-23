"use client";

// Q1. 농지에 주택을 지으려는 농업인이 농지전용 허가 절차를 알고 싶은 상황
// Q2. 농지전용 허가 요건과 절차를 파악해서 시·군·구청에 신청한다
// Q3. 농지전용 허가 요건(660㎡ 이하 농업인 주택), 신청 서류, 농지보전부담금, 예외(신고 대상)
// Q4. GreenBox(핵심 요건) + Steps(신청 절차) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "농지전용 허가 대상인지 확인하세요", desc: "농업인이 본인 소유 농지에 660㎡(약 200평) 이하의 주택을 짓는 경우 농지전용 허가를 받아야 해요. 농업진흥구역 안에서는 원칙적으로 불가하고, 농업진흥구역 밖이면 허가를 받을 수 있어요.", tip: "농업진흥구역 여부는 토지이용계획확인원에서 확인" },
  { title: "시·군·구청 농지과에 허가를 신청하세요", desc: "관할 시·군·구청 농지 담당 부서에 농지전용 허가 신청서와 구비서류를 제출해요. 처리 기간은 보통 14~30일이에요." },
  { title: "농지보전부담금을 납부하세요", desc: "허가를 받으면 농지보전부담금을 납부해야 해요. 공시지가의 30%가 기본이고, 농업인 주택은 50% 감면 혜택이 있어요.", tip: "감면 후 공시지가의 15% 수준" },
  { title: "건축허가를 받고 착공하세요", desc: "농지전용 허가와 건축허가는 별개예요. 농지전용 허가 후에 건축허가를 따로 받아야 해요. 동시 신청이 가능한 시·군도 있으니 확인해보세요." },
];

const DOC_CHECKLIST = [
  "농지전용 허가 신청서 / 시·군·구청 양식",
  "토지등기사항증명서 / 인터넷등기소 발급",
  "토지이용계획확인원 / 정부24 발급",
  "농업경영체 등록확인서 / 국립농산물품질관리원",
  "건축계획서 및 배치도 / 건축사 작성",
  "농지보전부담금 납부 영수증 / 허가 후 납부",
];

const FAQS = [
  { q: "농업진흥구역 안에서는 집을 못 짓나요?", a: "원칙적으로 안 돼요. 다만 1,000㎡ 이하 농가주택(농업인 주택)은 농업진흥구역 안에서도 예외적으로 허용되는 경우가 있어요. 시·군별로 조례가 다르니 반드시 확인하세요." },
  { q: "농지전용 허가 없이 집을 지으면 어떻게 되나요?", a: "불법 전용으로 원상복구 명령을 받고, 3년 이하의 징역 또는 3천만원 이하의 벌금이 부과돼요. 농지법 위반은 처벌이 무거워요." },
  { q: "농업인이 아닌데 농지에 집을 지을 수 있나요?", a: "가능하지만 요건이 더 까다로워요. 농업인 주택이 아닌 일반 주택은 농지보전부담금 감면이 안 되고, 농업진흥구역에서는 불가해요." },
  { q: "농지전용 신고로 끝나는 경우도 있나요?", a: "200㎡ 이하 농업용 시설(창고 등)은 신고로 가능한 경우가 있어요. 하지만 주택은 규모에 관계없이 허가가 필요해요." },
  { q: "농지보전부담금은 얼마나 내나요?", a: "개별공시지가의 30%가 기본이에요. 농업인 주택은 50% 감면돼서 15% 수준이에요. 공시지가가 ㎡당 5만원인 500㎡ 농지라면 약 375만원이에요." },
];

const SOURCES = [
  { name: "농지법", href: "https://www.law.go.kr/법령/농지법" },
  { name: "농림축산식품부", href: "https://www.mafra.go.kr" },
];

const RELATED = [
  { slug: "건축허가-착공신고-연기-기간", title: "건축허가 착공신고 기간", description: "허가 후 착공까지 기한." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "주택 취득 시 세금 계산." },
  { slug: "증축허가-착공신고-별도-절차", title: "증축허가 절차", description: "기존 건물 증축 시 허가 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지 · 전용허가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지에 집 짓고 싶은데 허가가 필요한가요?<br />
        농지전용 허가 절차와 서류
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"내 땅인데 집을 지으려면 허가를 받아야 한다고요?"</p>
      <p style={body}>
        농지에 주택을 짓려면 <strong>농지전용 허가</strong>가 필요해요. <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법</a>에서 농지의 다른 용도 전환을 규제하고 있거든요.
        농업인이 660㎡ 이하 주택을 짓는 경우 허가를 받을 수 있고, 농지보전부담금도 50% 감면돼요.
      </p>
      <Divider /><ArticleAd position="intro" />
      <H2>농지전용 허가 요건은?</H2>
      <p style={body}>농업인 주택을 짓는 경우 아래 요건을 갖추면 허가를 받을 수 있어요.</p>
      <GreenBox title="농업인 주택 농지전용 허가 요건">
        {"대상: 농업인(농업경영체 등록자)\n부지 면적: 660㎡(약 200평) 이하\n위치: 농업진흥구역 밖 (구역 안은 예외적으로 가능)\n\n농지보전부담금: 공시지가의 30% → 농업인 50% 감면\n처리 기간: 14~30일\n\n신청: 관할 시·군·구청 농지 담당 부서"}
      </GreenBox>
      <CategoryButton label="부동산 정보" count={18} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>신청 절차, 순서대로 해봐요</H2>
      <Steps steps={STEPS} />
      <Divider />
      <H2>준비할 서류</H2>
      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={DOC_CHECKLIST} />
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 농지법 기준으로 작성했어요. 시·군별 조례에 따라 세부 요건이 다를 수 있으니 관할 시·군·구청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
