"use client";
// Q1. 명절에 고속도로 통행료가 면제되는지, 시간은 언제부터인지 궁금
// Q2. 면제 시간을 확인하고 통행 계획을 세운다
// Q3. 면제 시작·종료 시간, 대상 도로, 유료도로 제외 여부
// Q4. GreenBox + BorderBox + FAQ
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [{"q":"하이패스 안 달아도 면제되나요?","a":"네. 일반 톨게이트에서도 면제돼요. 하이패스 차로, 일반 차로 모두 무료 통과 가능해요."},{"q":"민자 고속도로는 왜 안 되나요?","a":"민간 사업자가 운영하는 도로라 정부 면제 대상이 아니에요. 해당 구간은 연휴에도 정상 요금이 부과돼요."},{"q":"연휴 전날 밤에 출발하면 면제되나요?","a":"면제 시작 시간(보통 연휴 첫날 0시) 이후에 톨게이트를 통과해야 해요. 시작 전에 진입했어도 면제 시간 내에 나가면 무료예요."},{"q":"이륜차(오토바이)도 면제되나요?","a":"네. 고속도로 통행이 허용된 이륜차도 면제 대상이에요."},{"q":"면제 기간은 매년 똑같나요?","a":"음력 기준이라 날짜는 달라지지만, 연휴 첫날~마지막 날 면제는 동일해요. 국토교통부가 매년 구체적 날짜를 발표해요."}];
const SOURCES = [{"name":"한국도로공사","href":"https://www.ex.co.kr"},{"name":"국토교통부","href":"https://www.molit.go.kr"}];
const RELATED = [{"slug":"설-연휴-쓰레기-배출-요일","title":"설 연휴 쓰레기 배출","description":"명절 쓰레기 배출 요일."},{"slug":"자동차보험-자기신체사고-특약","title":"자동차보험 자기신체사고","description":"사고 시 보상 범위."}];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 명절 · 교통</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>설·추석 고속도로 통행료 면제<br />면제 시간과 대상 도로</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>명절에 고속도로 통행료가 면제된다는데, 정확히 언제부터 언제까지인지 궁금하죠.</p>
      <p style={body}>설·추석 연휴에는 한국도로공사가 관리하는 고속도로 통행료가 면제돼요. 보통 연휴 첫날 0시부터 마지막 날 24시까지예요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>설·추석 고속도로 통행료 면제 핵심 기준</H2>
      <p style={body}>핵심부터 정리했어요.</p>
      <GreenBox title="핵심 기준">면제 기간: 연휴 첫날 0시 ~ 마지막 날 24시<br />대상: 한국도로공사 관할 고속도로<br />제외: 민자 고속도로(서울~춘천, 인천대교 등)<br />ETC·하이패스 모두 적용</GreenBox>

      <CategoryButton label="생활 정보" count={10} href="/category/생활" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>알아둘 주의사항</H2>
      <p style={body}>놓치기 쉬운 부분이에요.</p>
      <BorderBox><strong>주의사항</strong><br />민자 고속도로 (면제 제외)<br /><br />서울~춘천 고속도로 · 인천대교 · 용인~서울<br /><br />서울~문산 · 일부 민자 구간<br /><br />이 구간은 별도 요금 징수</BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 면제 기간과 대상은 매년 국토교통부 발표를 확인하세요." />
    </ArticleLayout>
  );
}
