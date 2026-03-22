"use client";

// Q1. 집을 샀는데 부동산거래 신고를 해야 한다길래 기한·방법이 궁금한 상황
// Q2. 30일 이내 신고 확인 → 필요 서류 준비 → 온라인/오프라인 신고
// Q3. 30일 기한, 신고 의무자(매도·매수 공동), 신고 방법, 필요 서류, 미신고 과태료
// Q4. GreenBox(30일 기한 핵심) + Steps(신고 절차) + DocTable(필요 서류) + FAQ

import {
  H2, GreenBox, Divider, body,
  FAQ, References, Disclaimer, Steps, DocTable,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "매매계약 체결", desc: "계약서에 서명하고 계약금을 입금한 날이 기산일이에요." },
  { title: "신고서 작성", desc: "부동산거래관리시스템(rtms.molit.go.kr) 또는 관할 시·군·구청에서 신고서를 작성해요.", tip: "중개사가 대행하면 중개사 정보도 기재" },
  { title: "증빙서류 첨부", desc: "매매계약서 사본, 계약금 입금 증빙을 함께 제출해요. 2026년 2월 10일부터 의무화됐어요." },
  { title: "신고 접수·완료", desc: "온라인은 즉시 접수, 방문은 담당자 확인 후 접수. 신고필증을 받으면 완료예요." },
];

const DOCS = [
  { name: "부동산거래계약신고서", required: true, where: "관할 시·군·구청 또는 온라인 작성" },
  { name: "매매계약서 사본", required: true, where: "계약 시 보관한 원본 복사" },
  { name: "계약금 입금 증빙", required: true, where: "은행 이체확인서 또는 영수증 (2026.2.10~)" },
  { name: "신분증", required: true, where: "방문 신고 시 본인 확인용" },
  { name: "위임장 + 인감증명", required: false, where: "대리인이 신고할 경우" },
];

const FAQS = [
  { q: "중개사가 알아서 해주는 거 아닌가요?", a: "중개거래는 중개사가 대행하는 경우가 많지만, 법적 책임은 매도인·매수인 공동이에요. 중개사가 했는지 반드시 확인하세요." },
  { q: "직거래(개인 간 거래)도 신고해야 하나요?", a: "네, 중개사 없이 직거래해도 30일 이내에 신고해야 해요. 직거래는 매도·매수인이 직접 신고해야 해요." },
  { q: "신고 안 하면 과태료가 얼마인가요?", a: "취득가액의 5% 이하 과태료가 부과돼요. 5억 짜리 집이면 최대 2,500만 원이니 반드시 기한 내에 신고하세요." },
  { q: "30일 기한을 넘겼으면 어떡하나요?", a: "늦었어도 빨리 신고하세요. 지연 기간에 따라 과태료가 달라져요. 자진 신고하면 감경받을 수 있어요." },
  { q: "전세·월세 계약도 신고해야 하나요?", a: "보증금 6천만 원 초과 또는 월세 30만 원 초과 임대차계약은 별도로 임대차 신고를 해야 해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "부동산 거래신고 등에 관한 법률", url: "https://www.law.go.kr/법령/부동산거래신고등에관한법률" },
  ]},
  { category: "신고", items: [
    { label: "부동산거래관리시스템", url: "https://rtms.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산 세율 납부", description: "집 살 때 내야 하는 취득세 기준이에요." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 공인중개사 신고방법", description: "중개사 통한 거래신고 절차예요." },
  { slug: "이사-전학절차-초등학교-중학교-고등학교", title: "이사 전학 절차", description: "이사 후 전학 절차 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집 사고 부동산거래 신고, 언제까지 해야 할까?<br />
        30일 기한과 신고 절차
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 계약했는데 부동산거래 신고라는 걸 해야 한다고 하죠.
        매매계약 체결일부터 30일 이내에 관할 구청이나 온라인으로 신고하면 돼요. 기한 넘기면 과태료가 붙어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>30일 이내 신고가 핵심이에요</H2>
      <p style={body}>
        매매계약 체결일(계약서 서명일) 기준으로 30일 이내에 신고해야 해요. 중개사가 대행하더라도 최종 책임은 매도·매수인에게 있어요.
      </p>
      <GreenBox>
        <strong>부동산거래 신고 핵심</strong><br /><br />
        기한: 매매계약 체결일부터 30일 이내<br />
        의무자: 매도인 + 매수인 공동 (중개거래 시 중개사 대행 가능)<br />
        방법: 부동산거래관리시스템(rtms.molit.go.kr) 또는 관할 시·군·구청 방문<br />
        미신고 시: 취득가액 5% 이하 과태료<br /><br />
        ★ 2026년 2월 10일부터 계약금 입금 증빙 제출이 의무화됐어요
      </GreenBox>

      <H2>신고 절차 4단계</H2>
      <p style={body}>
        온라인이면 집에서도 할 수 있어요. 중개사가 대행하는 경우에도 완료 여부를 꼭 확인하세요.
      </p>
      <Steps steps={STEPS} />

      <H2>이 서류를 준비하세요</H2>
      <p style={body}>
        2026년 2월 10일부터 계약금 입금 증빙이 필수로 추가됐어요.
      </p>
      <DocTable docs={DOCS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 부동산 거래신고 등에 관한 법률 기준으로 작성됐어요. 구체적인 신고 사항은 관할 시·군·구청에 확인하세요." />
    </ArticleLayout>
  );
}
