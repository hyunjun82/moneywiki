"use client";
import { H2, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  { q: "아이돌봄서비스 지원대상·비용·신청방법에 대해 자세히 알 수 있나요?", a: "이 글에서 핵심 내용을 정리했어요. 아래 내용을 참고하세요." },
  { q: "관련 법령은 어디서 확인하나요?", a: "법제처(law.go.kr)에서 관련 법령 원문을 확인할 수 있어요." },
  { q: "더 자세한 상담은 어디서 받나요?", a: "정부 기관 상담센터나 전문가 상담을 이용하세요." },
  { q: "최신 정보는 어디서 확인하나요?", a: "관련 정부 기관 홈페이지에서 최신 내용을 확인할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "대부분 정부24(gov.kr)나 관련 기관 홈페이지에서 온라인 신청이 가능해요." }
];

const SOURCES = [
  { name: "- name: \"아이돌봄서비스", href: "https://www.idolbom.go.kr" },
  { name: "성평등가족부", href: "https://www.mogef.go.kr" },
  { name: "대한민국 정책브리핑", href: "https://www.korea.kr" }
];

const RELATED = [
  { slug: "부모급여-지원금액-신청방법", title: "- title: \"부모급여 지원금액 신청방법", description: "" },
  { slug: "아동수당-신청방법", title: "아동수당 신청방법", description: "" },
  { slug: "육아휴직-급여-신청", title: "육아휴직 급여 신청", description: "" }
];

const STEPS = [
  { title: "관련 정보를 확인하세요", desc: "정부 기관 홈페이지나 법제처에서 최신 기준을 확인할 수 있어요." },
  { title: "필요한 서류를 준비하세요", desc: "신분증과 관련 서류를 미리 준비하면 절차가 빠르게 진행돼요." },
  { title: "온라인 또는 방문 신청하세요", desc: "정부24, 홈택스 등에서 온라인 신청이 가능해요. 방문 신청은 관할 기관에서 할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>아이돌봄서비스 지원대상·비용·신청방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>"맞벌이인데 아이 돌볼 사람이 없어서 걱정이시죠. 할머니 할아버지도 멀리 사시고, 어린이집 끝나면 몇 시간 공백이 생기잖아요. 아이돌봄서비스를 이"</p>
      <p style={body}>아이돌봄서비스는 만 12세 이하 아동 가정에 아이돌보미가 방문해요. 2026년부터 중위소득 250%까지 지원 대상이 확대됐어요.</p>
      <Divider /><ArticleAd position="intro" />
      <H2>핵심 정리</H2>
      <GreenBox title="요약">"· 아이돌봄서비스는 만 12세 이하 아동 대상, 2026년부터 중위소득 250%까지 정부지원 확대\\n· 시간제 기본형 시간당 12,790원, 소득유형(가~라형)에 따라 정부지원 비율 차등 적용\\n· 아이돌봄서비스 누리집 또는 주민센터에서 신청, 다자녀 가정은 본인부담금 10% 추가 지원"</GreenBox>
      <CategoryButton label="복지" count={10} href="/category/%EB%B3%B5%EC%A7%80" />
      <RelatedArticles items={RELATED} />
      <Divider />
      <H2>절차와 방법</H2>
      <p style={body}>아래 순서대로 진행하면 돼요.</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>알아두면 좋은 것들</H2>
      <BorderBox><strong>참고사항</strong>{"\n"}· 아이돌봄서비스는 만 12세 이하 아동 대상, 2026년부터 중위소득 250%까지 정부지원 확대\n· 시간제 기본형 시간당 12,790원, 소득유형(가~라형)에 따라 정부지원 비율 차등 적용\n· 아이돌봄서비스 누리집 또는 주민센터에서 신청, 다자녀 가정은 본인부담금 10% 추가 지원</BorderBox>
      <Divider />
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성했어요. 법 개정이나 정책 변경에 따라 내용이 달라질 수 있으니 관련 기관에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
