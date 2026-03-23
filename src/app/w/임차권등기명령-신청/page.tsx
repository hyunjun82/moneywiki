"use client";
// Q1: 전세 만기 후 보증금을 못 돌려받아서 이사를 가야 하는데 대항력을 유지하고 싶은 세입자
// Q2: 임차권등기명령을 신청해서 이사 후에도 대항력 유지
// Q3: 관할 법원 신청, 보증금 미반환 사실, 신청서류, 비용(등록면허세+수수료), 효력
// Q4: Steps(신청 절차) + DocTable(서류) + GreenBox(핵심) + FAQ
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, DocTable, FAQ, References, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS = [
  { title: "관할 법원 확인", desc: "임대 주택 소재지 관할 지방법원에 신청해요. 대한법률구조공단에서 무료 법률상담도 받을 수 있어요.", tip: "대한법률구조공단 132" },
  { title: "신청서 작성", desc: "임차권등기명령 신청서에 임대차 계약 내용, 보증금 미반환 사실, 전입일자와 확정일자를 기재해요." },
  { title: "서류 제출 + 비용 납부", desc: "신청서와 첨부서류를 법원에 제출하고, 등록면허세(약 7,200원)와 수수료를 납부해요." },
  { title: "법원 결정 후 등기 완료", desc: "법원이 결정하면 등기소에 임차권 등기가 완료돼요. 등기 후 이사해도 대항력과 우선변제권이 유지돼요.", tip: "결정까지 보통 1~2주 걸려요" },
];

const DOCS = [
  { name: "임차권등기명령 신청서", required: true, where: "법원 서식 또는 대한법률구조공단에서 양식 제공" },
  { name: "임대차계약서 사본", required: true, where: "계약서 원본 복사" },
  { name: "전입세대확인서", required: true, where: "주민센터 발급" },
  { name: "건물등기부등본", required: true, where: "인터넷등기소(iros.go.kr) 발급" },
  { name: "내용증명 사본 (보증금 반환 요구)", required: false, where: "우체국에서 발송한 내용증명" },
];

const FAQS = [
  { q: "임차권등기명령을 신청하면 바로 이사해도 되나요?", a: "등기가 완료된 후에 이사해야 해요. 등기 완료 전에 이사하면 대항력이 소멸해요." },
  { q: "집주인 동의가 필요한가요?", a: "필요 없어요. 법원에 일방적으로 신청하는 거라 집주인 동의 없이 진행할 수 있어요." },
  { q: "비용이 얼마나 드나요?", a: "등록면허세 약 7,200원, 수수료 등 합쳐서 1~2만원 정도예요. 소득 기준에 따라 대한법률구조공단에서 무료 지원도 받을 수 있어요." },
  { q: "임차권등기 후 새 세입자가 들어올 수 있나요?", a: "집주인이 새 세입자를 구할 수 있지만, 임차권등기가 남아있으면 새 세입자에게 불리해서 실질적으로 어려워요. 이게 집주인에게 보증금 반환 압박이 돼요." },
  { q: "소액임차인 보호도 유지되나요?", a: "네, 임차권등기를 하면 소액임차인 최우선변제권도 유지돼요." },
];

const REFERENCES = [{ category: "법령", items: [{ label: "주택임대차보호법 제3조의3", url: "https://www.law.go.kr/법령/주택임대차보호법" }] }, { category: "서비스", items: [{ label: "대한법률구조공단 132", url: "https://www.klac.or.kr" }] }];
const RELATED = [
  { slug: "확정일자", title: "확정일자 받는 방법", description: "우선변제권을 만드는 확정일자예요." },
  { slug: "체불임금-청구-소송-방법", title: "체불임금 청구 소송", description: "밀린 돈을 받는 소송 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>보증금 못 받고 이사해야 할 때, 임차권등기명령<br />신청 절차와 필요 서류</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>전세 만기가 됐는데 보증금을 안 돌려줘서 이사를 못 가고 있다면 임차권등기명령을 신청하세요. 등기가 완료되면 이사해도 대항력과 우선변제권이 유지돼요. 집주인 동의 없이 법원에 신청할 수 있어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>임차권등기명령이 뭐고, 왜 필요한가?</H2>
      <p style={body}>전입신고로 얻은 대항력은 이사하면 사라져요. 보증금을 못 받은 상태에서 이사해야 한다면 임차권등기명령으로 대항력을 유지할 수 있어요.</p>
      <GreenBox title="핵심 효과">임차권등기 완료 후 이사해도 대항력·우선변제권 유지<br />집주인 동의 불필요 (법원에 일방 신청)<br />비용: 1~2만원 / 기간: 1~2주</GreenBox>
      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>신청은 이렇게 해요</H2>
      <p style={body}>관할 법원에 신청서와 서류를 내면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>제출 서류</H2>
      <SectionBadge>임차권등기명령 신청 서류</SectionBadge>
      <DocTable docs={DOCS} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법을 바탕으로 작성됐어요. 구체적 절차는 관할 법원이나 대한법률구조공단에서 확인해보세요." />
    </ArticleLayout>
  );
}
