"use client";

// Q1: 계약갱신청구권 1회 2년 재계약 거절 사유 info
// Q2: 임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음
// Q3: 임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음, 갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 발생, 2기 차임 연체, 본인 거주, 재건축 등 정당한 사유로만 거절 가능
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음", desc: "임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음" },
  { title: "갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 ", desc: "갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 발생" },
  { title: "2기 차임 연체, 본인 거주, 재건축 등 정당한 사유로", desc: "2기 차임 연체, 본인 거주, 재건축 등 정당한 사유로만 거절 가능" },
];
const CHECKLIST = [
  "임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음",
  "갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 발생",
  "2기 차임 연체, 본인 거주, 재건축 등 정당한 사유로만 거절 가능"
];

const FAQS = [
  { q: "계약갱신청구권은 몇 번 쓸 수 있나요?", a: "1회만 쓸 수 있어요. 2년 더 살 수 있는 권리인데, 한 번 쓰면 끝이에요. 최초 계약 2년 + 갱신 2년 = 총 4년까지 살 수 있어요." },
  { q: "집주인이 본인이 살겠다고 하면 무조건 나가야 하나요?", a: "네, 정당한 거절 사유예요. 집주인 본인이나 직계 존비속이 실제로 거주할 목적이면 갱신을 거절할 수 있어요. 하지만 거짓으로 말하고 다른 사람한테 임대하면 손해배상 청구할 수 있어요." },
  { q: "2기 차임 연체가 뭔가요?", a: "2번치 월세나 관리비를 안 낸 거예요. 월세 50만 원이면 100만 원, 관리비 10만 원이면 20만 원이에요. 합산해서 2기 차임액에 해당하면 거절 가능해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법 제6조의3", url: "https://casenote.kr/법령/주택임대차보호법/제6조의3" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권 1회 2년 재계약 거절 사유
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2년 더 살고 싶은데 집주인이 거절할 수 있나요? 정당한 거절 사유와 임차인 권리를 알아봐요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음</H2>
      <p style={body}>임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음</p>
      <GreenBox title="핵심 정리">
        임차인은 1회에 한해 2년 계약 갱신을 요구할 수 있음<br />
        갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 발생<br />
        2기 차임 연체, 본인 거주, 재건축 등 정당한 사유로만 거절 가능
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>갱신 요구는 계약 종료 6개월~2개월 전에 해</H2>
      <p style={body}>갱신 요구는 계약 종료 6개월~2개월 전에 해야 효력 발생</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
