// Q1. 보증금 못 받고 이사해야 하는데 임차권등기명령 비용이 얼마인지, 절차가 어떤지 궁금
// Q2. 43,400원이면 신청 가능하고 비용은 임대인에게 청구 가능하다는 걸 확인 → 절차 따라 신청
// Q3. 인지세 2천원, 등기수입증지 3천원, 송달료 31,200원, 등록면허세 7,200원, 3일~1주 소요
// Q4. GreenBox(비용 요약) + Steps(신청 절차) + DocTable(서류) + Checklist(주의사항) + FAQ

"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "준비물 챙기기",
    desc: "임대차계약서 원본(또는 사본), 주민등록등본, 보증금 반환 청구 증빙(내용증명 등), 신분증을 준비하세요.",
  },
  {
    title: "관할 법원 민원실 방문 또는 전자소송",
    desc: "임차주택 소재지를 관할하는 법원에 방문하거나, 대한민국 법원 전자소송(ecfs.scourt.go.kr)에서 온라인 신청할 수 있어요.",
    link: { label: "법원 전자소송", href: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "신청서 작성 + 비용 납부",
    desc: "신청서에 신청인·임대인 정보, 주택 주소, 보증금 금액, 계약 기간을 작성해요. 수입인지(2,000원)와 등기수입증지(3,000원)를 붙이고, 송달료(31,200원)와 등록면허세(7,200원)를 납부해요.",
  },
  {
    title: "법원 결정 (3일~1주)",
    desc: "법원이 계약서와 주민등록등본을 확인하고 명령을 내려줘요. 보통 3일에서 1주일이면 결정이 나와요.",
  },
  {
    title: "등기 완료 → 이사",
    desc: "법원이 등기소에 촉탁해서 자동으로 등기돼요. 등기가 완료되면 이사를 가도 대항력과 우선변제권이 유지돼요.",
    tip: "등기 완료 전에 이사하면 안 돼요. 순서가 중요해요",
  },
];

const DOCS = [
  { name: "임대차계약서 (원본 또는 사본)", required: true, where: "본인 보관" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "보증금 반환 청구 증빙", required: true, where: "내용증명, 문자, 이메일 등" },
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "수입인지 (2,000원)", required: true, where: "우체국 또는 은행 구매" },
  { name: "등기수입증지 (3,000원)", required: true, where: "우체국 또는 은행 구매" },
];

const CHECKLIST = [
  "등기 완료 전에 이사하면 안 돼요 (대항력 소멸)",
  "임대인 정확한 주소 확인 (송달 실패 방지)",
  "등기 후에는 월세 지급 의무 면제",
  "비용 43,400원은 나중에 임대인에게 청구 가능",
  "임대인이 2명 이상이면 송달료 추가 (1명당 15,600원)",
];

const FAQS = [
  { q: "비용은 누가 부담하나요?", a: "일단 임차인이 내지만, 주택임대차보호법에 따라 나중에 임대인에게 청구할 수 있어요. 보증금에서 빼거나 별도로 청구하면 돼요." },
  { q: "온라인으로 신청할 수 있나요?", a: "네, 대한민국 법원 전자소송(ecfs.scourt.go.kr)에서 온라인 신청이 가능해요. 법원 방문 없이 처리할 수 있어요." },
  { q: "등기하면 바로 이사 가도 되나요?", a: "등기가 완료된 후에 이사하세요. 등기 완료 전에 이사하면 대항력이 없어져서 등기를 받아도 소용없어요." },
  { q: "임차권등기 후 월세를 계속 내야 하나요?", a: "아니에요. 등기를 마치면 차임지급의무가 면제돼요. 계약이 끝났는데 보증금 안 주니까 월세도 안 내도 되는 거예요." },
  { q: "법무사에게 맡기면 비용이 얼마나 드나요?", a: "법무사 수수료가 별도로 10만~40만원 정도 들어요. 하지만 절차가 간단해서 직접 해도 어렵지 않아요." },
  { q: "전세사기 피해자는 등기수수료가 면제되나요?", a: "네, 대법원이 전세사기 피해자의 등기수수료를 2026년 말까지 면제하기로 했어요. 해당 여부는 법원에 문의하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령 - 임차권등기명령", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=5&cciNo=2&cnpClsNo=1" },
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "임차권등기명령-보증금-못받고-이사-대항력", title: "임차권등기명령이란?", description: "보증금 못 받고 이사해도 대항력 유지하는 제도예요." },
  { slug: "전세-보증금-보호-확정일자-받기-대항력", title: "전세 보증금 보호 확정일자", description: "확정일자와 대항력으로 보증금을 지키세요." },
  { slug: "임대차-묵시적갱신-해지-3개월-통지", title: "임대차 묵시적갱신 해지", description: "계약 갱신과 해지 통지 기한이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 보증금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임차권등기명령, 비용은 얼마일까?<br />
        신청 수수료부터 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사 날짜는 다 잡았는데 집주인이 보증금을 안 돌려줘요.{" "}
        <a href="/w/임차권등기명령-보증금-못받고-이사-대항력" style={{ color: "#1D9E75", textDecoration: "underline" }}>임차권등기명령</a>을 신청하면{" "}
        이사를 가도 대항력이 유지돼요. 비용은 <strong>총 43,400원</strong>이고, 이 돈도 나중에 집주인한테 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신청 비용은 총 43,400원</H2>
      <p style={body}>
        임대인 1명, 임차인 1명, 주택 1개 기준이에요. 5만원도 안 들어요.
      </p>

      <GreenBox title="비용 내역">
        인지세: 2,000원 (수입인지)<br />
        등기수입증지: 3,000원<br />
        송달료: 31,200원 (5,200원 x 6회)<br />
        등록면허세(지방교육세 포함): 7,200원<br />
        <strong>합계: 43,400원</strong>
      </GreenBox>

      <BorderBox>
        임대인이 2명(부부 공동 명의)이면 송달료가 15,600원 추가돼요. 주택이 2개면 등기수입증지가 3,000원 추가되고요.
        비용은 일단 임차인이 내지만, <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>에 따라 임대인에게 청구 가능해요.
      </BorderBox>

      <Divider />

      <H2>신청 절차 5단계</H2>
      <p style={body}>
        법원 방문 또는 전자소송으로 신청할 수 있어요. 온라인 신청이 편하지만, 처음이라면 법원 민원실에서 안내받는 것도 좋아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>필요 서류</H2>
      <SectionBadge>신청 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>꼭 기억해야 할 주의사항</H2>
      <p style={body}>
        등기 완료 전에 이사하면 안 된다는 게 가장 중요해요. 순서를 꼭 지키세요.
      </p>

      <SectionBadge>주의사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임차권등기명령 비용 및 절차 안내예요. 송달료 등 비용은 변경될 수 있으니 관할 법원에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
