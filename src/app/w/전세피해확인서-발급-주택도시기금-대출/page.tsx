"use client";

// Q1. 전세사기 피해를 당해서 주택도시기금 대출을 받으려는데 전세피해확인서가 필요한 상황
// Q2. 전세피해확인서를 발급받고, 기금 대출을 신청한다
// Q3. 발급 기관(HUG), 발급 방법(온라인·오프라인), 필요 서류, 대출 신청 절차, 지원 기한
// Q4. Steps(발급·대출 절차) + DocTable(필요 서류) + GreenBox(핵심 정보) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "전세사기 피해 여부 확인", desc: "전세사기피해자 지원관리시스템(jeonse.kgeop.go.kr)에서 피해 요건에 해당하는지 확인해요." },
  { title: "전세피해확인서 신청", desc: "온라인(jeonse.kgeop.go.kr) 또는 거주지 자치구를 방문해서 신청해요. 처리 기간은 보통 2~4주예요." },
  { title: "확인서 발급 수령", desc: "심사 완료 후 전세피해확인서가 발급돼요. 온라인 신청 시 시스템에서 출력할 수 있어요." },
  { title: "기금수탁은행 대출 신청", desc: "전세피해확인서를 가지고 기금수탁은행(우리·국민·기업·농협 등)에서 주택도시기금 대출을 신청해요." },
  { title: "대출 실행", desc: "심사 후 대출이 실행돼요. 긴급 전세자금, 버팀목 전세자금 등 피해자 전용 상품을 이용할 수 있어요." },
];

const DOCS = [
  { name: "전세피해확인서 발급 신청서", required: true, where: "온라인 시스템 또는 자치구" },
  { name: "임대차계약서 사본", required: true, where: "본인 보관본" },
  { name: "전입세대열람원", required: true, where: "주민센터 또는 정부24" },
  { name: "등기부등본", required: true, where: "인터넷등기소" },
  { name: "보증금 납부 확인 서류", required: true, where: "계좌 이체 내역 등" },
  { name: "신분증 사본", required: true, where: "본인" },
];

const FAQS = [
  { q: "전세피해확인서 발급까지 얼마나 걸리나요?", a: "보통 2~4주 정도 걸려요. 서류가 미비하면 더 길어질 수 있으니, 신청 전에 서류를 꼼꼼히 준비하세요." },
  { q: "전세사기 피해자 대출 금리는 어떻게 되나요?", a: "기금 대출이라 시중 금리보다 훨씬 낮아요. 연 1~2%대 우대금리가 적용되는 경우가 많아요. 정확한 금리는 기금수탁은행에서 확인하세요." },
  { q: "전세보증보험 가입자도 대출받을 수 있나요?", a: "전세보증보험으로 보증금을 돌려받지 못한 잔액이 있으면 대출 대상이 될 수 있어요. 보증보험 청구를 먼저 진행한 뒤 잔여분에 대해 기금 대출을 신청하세요." },
  { q: "지원 기한이 있나요?", a: "전세사기피해자 지원 유효기간이 2027년 5월 31일까지 연장됐어요. 이 기한 안에 확인서 발급과 대출 신청을 마쳐야 해요." },
  { q: "온라인 신청이 안 되면 어디로 가나요?", a: "임차인 주민등록상 거주지 자치구(구청)를 방문하면 돼요. 전화로 사전 예약 후 방문하면 더 빨라요." },
];

const SOURCES = [
  { name: "전세사기피해자 지원관리시스템", href: "https://jeonse.kgeop.go.kr" },
  { name: "주택도시보증공사 전세피해지원", href: "https://www.khug.or.kr/jeonse" },
];

const RELATED = [
  { slug: "전세금-반환보증-신청", title: "전세금 반환보증 신청", description: "전세보증보험 가입과 청구 방법." },
  { slug: "우선변제권-요건", title: "우선변제권 요건", description: "보증금을 우선 돌려받을 수 있는 조건." },
  { slug: "임대차-계약기간-중-집주인-변경-퇴거", title: "계약 중 집주인 변경 시 대응", description: "집주인이 바뀌었을 때 임차인 권리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세사기 · 대출</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세피해확인서, 어디서 발급받나?<br />
        주택도시기금 대출 신청까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>전세사기 피해를 당했는데, 대출을 받으려니 전세피해확인서부터 내라고 하죠.</p>
      <p style={body}><a href="https://jeonse.kgeop.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세사기피해자 지원관리시스템</a>에서 온라인으로 신청하거나 거주지 자치구를 방문하면 발급받을 수 있어요. 확인서를 받은 뒤 기금수탁은행에서 저금리 대출을 신청할 수 있고요.</p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>발급부터 대출까지 전체 절차</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <SectionBadge>전세피해확인서 발급 → 대출 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>필요 서류 미리 준비하세요</H2>
      <p style={body}>서류가 빠지면 처리가 늦어져요. 미리 챙겨놓으세요.</p>
      <SectionBadge>필요 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />
      <Divider />

      <H2>지원 기한과 대출 조건</H2>
      <p style={body}>전세사기 피해 지원에는 기한이 있어요.</p>
      <GreenBox title="핵심 지원 정보">
        지원 유효기한: 2027년 5월 31일까지{"\n"}
        대출 금리: 연 1~2%대 (기금수탁은행별 상이){"\n"}
        대출 한도: 피해 보증금 범위 내{"\n"}
        신청 은행: 우리·국민·기업·농협 등 기금수탁은행
      </GreenBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>전세피해확인서와 기금 대출에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 전세사기피해자 지원 제도를 바탕으로 작성했어요. 지원 조건과 대출 금리는 변경될 수 있으니, 전세사기피해자 지원관리시스템(jeonse.kgeop.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
