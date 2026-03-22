"use client";

// Q1. 가사근로자 근로계약 체결 방법에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 가사근로자도 일하기 전에 반드시 근로계약서를 작성해야 해요, 임금, 근로시간, 휴일, 연차 등 5가지 필수 항목을 명시해야 해요
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "가사근로자 근로계약서는 꼭 써야 하나요?", a: "네, 반드시 작성해야 해요. 2022년 6월 16일부터 시행된 가사근로자법에서 의무로 정하고 있고, 미작성 시 사업주에게 500만원 이하 벌금이 부과돼요." },
  { q: "가사근로자 근로계약서는 언제 작성하나요?", a: "일을 시작하기 전에 작성해야 해요. 근로조건이 불확실한 상태에서 일하는 것을 방지하기 위한 거예요. 계약서는 2부 작성해서 1부는 근로자에게 줘야 해요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "가사근로자 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "가사근로자의 고용개선 등에 관한 법률", href: "https://www.law.go.kr/법령/가사근로자의고용개선등에관한법률" },
  { name: "찾기쉬운 생활법령정보 - 가사근로자", href: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1810&ccfNo=2&cciNo=1&cnpClsNo=2" },
  { name: "고용노동부 근로계약서", href: "https://www.moel.go.kr/mainpop2.do" },
];

const RELATED = [
  { slug: "가사근로자-근로계약서-주의사항", title: "가사근로자 근로계약서 주의사항", description: "관련 내용 정리." },
  { slug: "근로계약서-필수-기재사항", title: "근로계약서 필수 기재사항", description: "관련 내용 정리." },
  { slug: "2026년-최저임금", title: "2026년 최저임금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가사근로자 근로계약 체결 방법: 필수 기재사항 및 작성 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가사근로자도 일하기 전에 반드시 근로계약서를 작성해야 해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가사근로자 근로계약 체결 방법은 어떻게 되나요?</H2>
      <p style={body}>일을 시작하기 전에 근로계약서를 2부 작성해서 1부는 근로자가 가져요.</p>
      <GreenBox>
        가사근로자도 일하기 전에 반드시 근로계약서를 작성해야 해요{"\n"}
        임금, 근로시간, 휴일, 연차 등 5가지 필수 항목을 명시해야 해요{"\n"}
        계약서 미작성 시 사업주는 500만원 이하 벌금을 받아요
      </GreenBox>
      <p style={body}>가사서비스 제공기관과 가사근로자가 근로조건을 함께 정하고, 그 내용을 서면으로 작성해야 해요. 가사근로자의 고용개선 등에 관한 법률 제14조에서 이 절차를 명확히 규정하고 있어요. 근로조건이 불확실한 상태에서 일하는 걸 방지하기 위한 거죠. 서면은 전자문서도 포함되니까 이메일이나 전자 계약도 가능해요. 근로계약서 필수 기재사항도 함께 확인하세요.</p>

      <CategoryButton label="근로/노동" count={10} href="/category/%EA%B7%BC%EB%A1%9C%2F%EB%85%B8%EB%8F%99" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>가사근로자 계약 체결 시 필수 사항은 뭔가요?</H2>
      <p style={body}>임금, 근로시간, 휴일, 연차, 서비스 종류를 꼭 써야 해요.</p>
      <BorderBox>
        <strong>가사근로자 계약 체결 시 필수 사항은 뭔가요?</strong><br />
        임금, 근로시간, 휴일, 연차, 서비스 종류를 꼭 써야 해요.<br />
        가사근로자법 제14조와 시행령 제4조에서 정한 필수 항목이에요. 임금은 구성 항목, 계산 방법, 지급 방법까지 상세히 적어야 하고, 최소 근로시간도 명시해야 해요. 유급휴일과 연차유급휴가 규정도 반드시 들어가야 하죠
      </BorderBox>
      <p style={body}>가사근로자법 제14조와 시행령 제4조에서 정한 필수 항목이에요. 임금은 구성 항목, 계산 방법, 지급 방법까지 상세히 적어야 하고, 최소 근로시간도 명시해야 해요. 유급휴일과 연차유급휴가 규정도 반드시 들어가야 하죠. 가사서비스의 종류와 내용, 그리고 서비스를 제공할 요일이나 날짜, 시간대, 지역도 명확히 정해야 해요. 2026년 최저임금 10,320원도 반드시 준수해야 하고요.</p>

      <Divider />
      <H2>가사근로자 필수 사항은 왜 중요한가요?</H2>
      <p style={body}>근로조건을 명확히 정해야 나중에 분쟁을 막을 수 있어요.</p>
      <p style={body}>계약서에 임금과 근로시간이 명확히 적혀 있지 않으면, 나중에 "약속이 뭐였지?"하고 서로 다르게 기억할 수 있어요. 특히 가사근로자는 여러 가정을 오가며 일하는 경우가 많아서 근무지역과 시간대를 정확히 정하는 게 중요해요. 가사근로자 근로시간 기준에서도 이런 내용을 자세히 다루고 있어요. 계약서는 법적 보호를 받는 증거가 되니까 꼭 작성하고 보관하세요.</p>

      <Divider />
      <H2>가사근로자 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
