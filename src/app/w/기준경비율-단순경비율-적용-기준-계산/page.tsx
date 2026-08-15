"use client";
/*
Q1. 종합소득세 신고하려는데 기준경비율/단순경비율이 뭔지, 내가 어디에 해당하는지 모르는 상황
Q2. 내 수입금액으로 단순/기준경비율 적용 여부를 판단하고 소득금액을 계산
Q3. 수입 기준(프리랜서 2,400만원), 단순경비율 공식, 기준경비율 공식(주요경비 증빙 필수), 주요경비 종류
Q4. GreenBox(결론) + DocTable(업종별 기준) + BorderBox(계산 공식 비교) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const THRESHOLD_TABLE = {
  headers: ["업종 구분", "단순경비율 적용 기준 (직전연도 수입)"],
  rows: [
    ["프리랜서·인적용역 (IT, 디자인, 강사 등)", "2,400만원 미만"],
    ["도·소매업", "6,000만원 미만"],
    ["제조업·음식점업", "3,600만원 미만"],
    ["부동산임대업·서비스업", "2,400만원 미만"],
  ],
};

const FAQS = [
  { q: "장부를 안 쓰면 불이익이 있나요?", a: "장부 없이 추계신고(경비율 적용)하면 무기장 가산세 20%가 붙을 수 있어요. 복식부기 의무자가 장부 없이 신고하면 더 불리하죠." },
  { q: "단순경비율이랑 기준경비율 중 뭐가 유리해요?", a: "보통 단순경비율이 유리해요. 증빙 없이도 높은 비율로 비용이 인정되거든요. 수입이 늘면 기준경비율로 넘어가서 증빙이 중요해지죠." },
  { q: "기준경비율인데 증빙이 없으면 어떻게 되나요?", a: "주요경비를 증빙 없이 인정받을 수 없어요. 기준경비율만 적용되니까 소득금액이 크게 잡히고 세금이 늘어나죠." },
  { q: "올해 처음 사업 시작했는데 어떤 경비율이 적용되나요?", a: "신규 사업자는 단순경비율이 적용돼요. 직전연도 수입이 없으니까요." },
  { q: "경비율은 어디서 확인하나요?", a: "국세청 홈택스에서 업종코드별 경비율을 조회할 수 있어요. 매년 국세청이 고시하죠." },
  { q: "간편장부를 쓰면 경비율 안 써도 되나요?", a: "맞아요. 간편장부로 실제 수입·비용을 기록하면 경비율 대신 장부 기준으로 신고할 수 있어요. 절세에 유리한 경우가 많죠." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "소득세법: 추계과세", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청: 기장의무 판단", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2230&cntntsId=7669" },
    { label: "국세청: 기준경비율 Q&A", url: "https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1441&ctgId=CTG11777" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 종합소득세 · 경비율</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기준경비율 vs 단순경비율, 나는 어디?<br />
        적용 기준과 계산 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5월 <a href="/w/종합소득세-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>종합소득세</a> 신고하려는데 기준경비율이 뭔지 모르겠죠.
        장부를 안 썼을 때 국세청이 정한 비율로 비용을 인정해주는 게 <strong>경비율</strong>이에요.
        단순경비율이냐 기준경비율이냐에 따라 세금이 크게 달라지죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>단순경비율과 기준경비율, 뭐가 다른가요?</H2>
      <p style={body}>
        둘 다 장부 없이 세금을 계산하는 <strong>추계신고</strong> 방식이에요. 차이는 비용 인정 방식에 있죠.
      </p>
      <p style={body}>
        <strong>단순경비율</strong>은 수입금액에 경비율을 곱해서 비용을 인정해요. 증빙서류가 필요 없으니 간편하죠. 경비율이 높아서(보통 60~80%) 소득금액이 적게 잡히고, 세금도 적게 나와요.
      </p>
      <p style={body}>
        <strong>기준경비율</strong>은 주요경비(매입비, 임차료, 인건비)를 증빙서류로 따로 인정받고, 나머지만 기준경비율로 계산해요. 증빙이 없으면 주요경비를 인정받지 못해서 세금이 확 늘어나죠.
      </p>

      <BorderBox>
        <strong>단순경비율</strong><br />
        소득금액 = 수입금액 - (수입금액 x 단순경비율)<br /><br />
        <strong>기준경비율</strong><br />
        소득금액 = 수입금액 - 주요경비(증빙) - (수입금액 x 기준경비율)
      </BorderBox>

      <Divider />

      <H2>나는 어디에 해당되나요?</H2>
      <p style={body}>
        <strong>직전연도 수입금액</strong>이 기준이에요. 업종별로 기준 금액이 다르죠. 대부분의 프리랜서(IT, 디자인, 강사 등)는 직전연도 수입 <strong>2,400만원 미만</strong>이면 단순경비율, 이상이면 기준경비율이에요.
      </p>

      <SectionBadge>업종별 단순경비율 적용 기준</SectionBadge>
      <DocTable headers={THRESHOLD_TABLE.headers} rows={THRESHOLD_TABLE.rows} />

      <p style={body}>
        신규 사업자(올해 처음 시작)는 수입과 관계없이 <strong>단순경비율</strong>이 적용돼요. 직전연도 수입이 없으니까요.
      </p>

      <GreenBox>
        단순경비율 → 증빙 없이 높은 비율 비용 인정, 세금 적음<br />
        기준경비율 → 주요경비 증빙 필수, 없으면 세금 폭탄<br />
        신규 사업자 → 무조건 단순경비율
      </GreenBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>기준경비율이면 증빙을 꼭 챙기세요</H2>
      <p style={body}>
        기준경비율이 적용되면 <strong>주요경비 3가지</strong>의 증빙이 핵심이에요. 매입비용과 임차료는 세금계산서·신용카드 매출전표 등 정규증빙이 있어야 하고, 인건비는 원천징수영수증을 제출하거나 지급 관련 증빙을 보관해야 하죠.
      </p>
      <p style={body}>
        증빙이 없으면 기준경비율(보통 10~20%)만 적용되니까 소득이 크게 잡혀요. 예를 들어 수입 5,000만원에 기준경비율 15%면 비용 750만원만 인정, 소득 4,250만원이 되죠. 주요경비 증빙이 있으면 추가로 빠지니까 차이가 엄청나요.
      </p>

      <BorderBox>
        <strong>주요경비 3가지</strong><br />
        1. 매입비용: 재료비, 상품 매입 (세금계산서 필수)<br />
        2. 임차료: 사무실·점포 월세 (세금계산서·현금영수증)<br />
        3. 인건비: 직원 급여 (원천징수영수증)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 국세청 안내를 바탕으로 작성했어요. 업종별 경비율은 매년 변동되니 국세청 고시를 확인하세요." />
    </ArticleLayout>
  );
}
