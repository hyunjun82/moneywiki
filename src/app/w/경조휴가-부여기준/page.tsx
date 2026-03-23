"use client";
// Q1. 경조사가 생겼는데 유급 휴가를 며칠 받을 수 있는지 궁금
// Q2. 경조휴가 일수를 확인하고 회사에 신청한다
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [{"q":"경조휴가는 유급인가요?","a":"배우자 출산휴가 10일은 법정 유급이에요. 나머지 경조휴가는 회사 규정에 따라 유급 또는 무급이에요."},{"q":"배우자 출산휴가 10일은 연속으로 써야 하나요?","a":"출산일로부터 90일 이내에 사용해야 하고, 1회 분할 사용이 가능해요."},{"q":"회사에 경조휴가 규정이 없으면요?","a":"배우자 출산휴가 10일만 법정이고, 나머지는 없을 수도 있어요. 취업규칙을 확인하세요."},{"q":"조부모 사망 시 경조휴가가 있나요?","a":"법정은 아니지만, 보통 3일 정도 부여하는 회사가 많아요."},{"q":"경조휴가 중 연차가 차감되나요?","a":"경조휴가는 연차와 별개예요. 취업규칙에 경조휴가로 명시돼 있으면 연차 차감이 아니에요."}];
const SOURCES = [{"name":"근로기준법","href":"https://www.law.go.kr/법령/근로기준법"},{"name":"남녀고용평등법","href":"https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률"}];
const RELATED = [{"slug":"육아휴직-복귀-후-연차휴가","title":"육아휴직 후 연차","description":"육아휴직 복귀 후 연차 기준."},{"slug":"육아기-근로시간-단축-정규직-대우","title":"육아기 근로시간 단축","description":"단축 시 정규직 대우."}];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 근로 · 휴가</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>경조휴가, 며칠 쓸 수 있나?<br />결혼·출산·사망 등 부여 기준</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>결혼이나 장례 때 회사에서 며칠 쉴 수 있는지 궁금하죠.</p>
      <p style={body}>경조휴가는 법정 의무는 아니지만, 대부분 회사 취업규칙에서 정하고 있어요. 근로기준법에 배우자 출산휴가(10일)만 법정이고, 나머지는 회사 규정에 따라요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>경조휴가 핵심 기준</H2>
      <p style={body}>핵심부터 정리했어요.</p>
      <GreenBox title="핵심 기준">본인 결혼: 보통 5일<br />자녀 결혼: 1일<br />배우자 출산: 10일 (법정 유급)<br />부모 사망: 5일<br />배우자 사망: 5일<br />형제자매 사망: 3일</GreenBox>

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>알아둘 주의사항</H2>
      <p style={body}>놓치기 쉬운 부분이에요.</p>
      <BorderBox><strong>주의사항</strong><br />경조휴가 주의사항<br /><br />법정 의무는 배우자 출산휴가(10일)만 해당<br /><br />나머지는 취업규칙·단체협약에 따름<br /><br />경조금과 경조휴가는 별개 (경조금은 복리후생)<br /><br />토·일 포함 여부는 회사 규정에 따름</BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 일반적인 취업규칙을 바탕으로 작성했어요. 회사별로 다르니 취업규칙을 확인하세요." />
    </ArticleLayout>
  );
}
