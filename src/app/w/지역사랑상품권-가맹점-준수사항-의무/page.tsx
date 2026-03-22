"use client";

// Q1. 지역사랑상품권 가맹점으로 등록했는데, 어떤 규칙을 지켜야 하는지 모르거나 위반 시 어떤 처분을 받는지 궁금한 소상공인.
// Q2. 가맹점 준수사항을 파악하고, 위반하지 않도록 점검한 뒤 올바르게 운영하는 행동.
// Q3. 준수사항 5가지(결제거부 금지, 불법환전 금지, 차별대우 금지, 허위등록 금지, 양도담보 금지), 위반 시 제재(등록취소·재등록 제한·과태료 2천만원), 등록거부 사유.
// Q4. Checklist(준수사항 점검) + GreenBox(핵심 요약) + BorderBox(과태료 표) + Steps(올바른 운영 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "상품권 결제 요청을 정당한 이유 없이 거부하지 않는다",
  "상품권 사용자를 현금·카드 고객과 차별하지 않는다",
  "재화·용역 없이 상품권을 현금으로 바꿔주지 않는다",
  "실제 매출액을 초과하는 상품권 환전을 하지 않는다",
  "받은 상품권을 타인에게 양도하거나 담보로 제공하지 않는다",
  "가맹점 표지판을 눈에 잘 띄는 곳에 부착한다",
  "환전은 정해진 기간 내에 정식 절차대로 한다",
];

const STEPS = [
  { title: "가맹점 등록", desc: "지방자치단체에 소상공인 또는 중소기업 사업자로 등록 신청해요. 연 매출 30억원 이하 업체가 대상이에요.", tip: "대형마트·백화점·유흥주점은 등록 불가" },
  { title: "표지판 부착", desc: "지자체나 발행기관에서 제공하는 가맹점 표지판을 매장 입구에 부착해요." },
  { title: "결제 수용", desc: "상품권 소지자가 결제 요청하면 현금·카드와 동일하게 받아요. 할인율, 포인트 적립도 똑같이 적용해야 해요." },
  { title: "환전 신청", desc: "정해진 환전일에 앱·환전대행가맹점·은행 입금 등으로 환전해요. 수수료는 1~3% 수준이에요.", tip: "매출 내역과 상품권 사용 내역이 일치해야 함" },
];

const FAQS = [
  { q: "상품권 결제를 거부하면 어떻게 되나요?", a: "정당한 이유 없이 거부하면 가맹점 등록이 취소될 수 있어요. 등록 취소 후 최대 1년간 재등록이 제한돼요." },
  { q: "손님이 상품권을 현금으로 바꿔달라고 하면요?", a: "거절해야 해요. 재화나 용역 없이 현금으로 환전하는 건 불법이에요. 적발 시 등록 취소 + 과태료 대상이에요." },
  { q: "가맹점 등록 없이 상품권을 받으면 어떻게 되나요?", a: "무등록 영업으로 2천만원 이하 과태료가 부과돼요. 환전도 못 받아요." },
  { q: "다른 지역 상품권도 받을 수 있나요?", a: "안 돼요. 지역사랑상품권은 해당 기초지자체에서만 사용 가능해요. 서울 강남구 상품권은 강남구 가맹점에서만 써요." },
  { q: "환전 수수료는 얼마인가요?", a: "보통 1~3% 수준이에요. 카드 수수료(2~3%)보다 저렴하거나 비슷해요. 환전 주기는 지역마다 달라요." },
  { q: "위반 조사를 거부하면요?", a: "조사를 거부·방해·기피하면 500만원 이하의 과태료가 별도로 부과돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "지역사랑상품권 이용 활성화에 관한 법률(법제처)", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
      { label: "찾기쉬운 생활법령정보 - 가맹점 등록 및 취소", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1816&ccfNo=3&cciNo=1&cnpClsNo=1" },
      { label: "행정안전부 지역사랑상품권", url: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" },
    ],
  },
];

const RELATED = [
  { slug: "온누리상품권-가맹점", title: "온누리상품권 가맹점", description: "전통시장 온누리상품권 가맹점 등록과 사용법이에요." },
  { slug: "소상공인-지원", title: "소상공인 지원 제도", description: "소상공인 대출·보조금·지원책 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 지역화폐 · 소상공인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권 가맹점, 뭘 지켜야 하나?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          준수사항부터 과태료까지
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지역사랑상품권 가맹점으로 등록했는데, 혹시 모르고 위반하면 어떡하나 걱정되시죠.
        결제 거부 한 번에 등록이 취소될 수도 있고, 불법 환전은 최대 2천만원 과태료예요.
        가맹점이 지켜야 할 규칙과 위반 시 제재를 정리했어요.
      </p>

      <Divider />

      <H2>가맹점이 반드시 지켜야 할 준수사항</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권 이용 활성화에 관한 법률</a>에서
        가맹점 의무를 규정하고 있어요. 핵심은 5가지예요.
      </p>
      <SectionBadge>필수 점검 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        특히 &quot;오늘은 상품권 안 받아요&quot;, &quot;상품권 쓰면 할인 안 돼요&quot; 같은 말로 차별하면 안 돼요. 현금·카드 고객과 완전히 동등하게 대우해야 해요.
      </p>

      <Divider />

      <H2>위반하면 어떤 처분을 받나요?</H2>
      <p style={body}>
        위반 행위의 종류와 정도에 따라 등록 취소, 재등록 제한, 과태료가 부과돼요. 한번 정리해볼게요.
      </p>
      <SectionBadge>위반 시 제재 기준</SectionBadge>
      <BorderBox title="위반별 제재 내용">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>결제 거부·차별 대우</strong> → 가맹점 등록 취소 + 최대 1년 재등록 제한</li>
          <li><strong>불법 환전 (물건 안 팔고 현금화)</strong> → 등록 취소 + 과태료</li>
          <li><strong>매출 초과 환전</strong> → 등록 취소</li>
          <li><strong>허위·부정 등록</strong> → 즉시 등록 취소</li>
          <li><strong>무등록 영업</strong> → 2천만원 이하 과태료</li>
          <li><strong>조사 거부·방해</strong> → 500만원 이하 과태료</li>
        </ul>
      </BorderBox>
      <p style={body}>
        경미한 1회 위반은 100만원 수준이지만, 상습·고의 위반은 최대 2천만원까지 올라가요. 등록 취소되면 최대 1년간 다시 등록할 수 없어요.
      </p>

      <Divider />

      <H2>가맹점 등록이 거부되는 경우는?</H2>
      <p style={body}>
        아무 업종이나 가맹점이 되는 건 아니에요. 지자체가 등록을 거부할 수 있는 경우가 있어요.
      </p>
      <GreenBox title="등록 거부 사유">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>연 매출 30억원 초과 업체 (지자체 기준에 따라 다름)</li>
          <li>사행산업 관련 업종 (유흥주점·사행성 오락실 등)</li>
          <li>중소기업기본법상 중소기업이 아닌 대기업</li>
          <li>과거 등록 취소 후 재등록 제한 기간 미경과</li>
          <li>지역 조례로 정한 제한업종이나 시설</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>올바른 가맹점 운영 절차</H2>
      <p style={body}>
        처음 가맹점 등록부터 환전까지 순서대로 정리했어요.
      </p>
      <SectionBadge>4단계 운영 흐름</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 법령 정보를 바탕으로 작성했어요. 지자체별 조례에 따라 세부 사항이 다를 수 있으니 해당 지자체에 확인하세요." />
    </ArticleLayout>
  );
}
