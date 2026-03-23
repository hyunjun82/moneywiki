"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, DocTable, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const FAQS = [
  {
    "q": "프리랜서인데 3.3% 떼인 건 환급받을 수 있나요?",
    "a": "5월 종합소득세 신고에서 경비를 빼고 실제 세금을 계산했을 때 3.3%보다 적으면 차액을 환급받아요. 경비가 많으면 전액 환급도 가능해요."
  },
  {
    "q": "이자소득 15.4%는 별도 신고 안 해도 되나요?",
    "a": "금융소득(이자+배당)이 연 2,000만원 이하면 원천징수로 끝이에요. 2,000만원을 넘으면 종합소득세 합산 신고해야 해요."
  },
  {
    "q": "근로소득 원천세는 왜 사람마다 다른가요?",
    "a": "간이세액표가 급여, 부양가족 수에 따라 세액을 정해요. 같은 월급이라도 부양가족이 많으면 원천세가 적어요."
  },
  {
    "q": "원천세 신고를 안 하면 어떻게 되나요?",
    "a": "미신고 가산세(납부세액의 3~10%)와 납부불성실 가산세(일 0.022%)가 붙어요."
  },
  {
    "q": "반기별 납부 특례가 뭔가요?",
    "a": "상시 근로자 20인 이하 사업장은 원천세를 6개월마다 한 번에 납부할 수 있어요. 세무서에 반기별 납부 신청을 하면 돼요."
  }
];
const SOURCES = [
  {
    "name": "소득세법",
    "href": "https://www.law.go.kr/법령/소득세법"
  },
  {
    "name": "국세청 원천세 안내",
    "href": "https://www.nts.go.kr"
  }
];
const RELATED = [
  {
    "slug": "부가세-환급-신청",
    "title": "부가세 환급 신청",
    "description": "부가세 환급 절차."
  },
  {
    "slug": "법인세-신고-기한-세율",
    "title": "법인세 신고 기한과 세율",
    "description": "법인세 신고 일정."
  },
  {
    "slug": "원천징수-신고-방법",
    "title": "원천징수 신고 방법",
    "description": "원천세 신고 절차."
  }
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천세 · 세율</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>원천세 세율, 어떤 소득에 몇 % 떼나?<br />소득 유형별 원천세율 정리</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>급여나 사업소득을 지급할 때 미리 떼는 세금이 원천세인데, 세율이 소득마다 달라서 헷갈리죠.</p>
      <p style={body}>근로소득·사업소득·이자·배당 등 소득 유형에 따라 원천세율이 달라요. 근로소득은 간이세액표, 사업소득은 3.3%, 이자·배당은 15.4%가 기본이에요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>소득 유형별 원천세율</H2>
      <p style={body}>소득마다 세율이 달라요. 주요 유형을 정리했어요.</p>
      <SectionBadge>소득 유형별 원천세율</SectionBadge>
      <DocTable headers={["소득 유형","원천세율","비고"]} rows={[["근로소득","간이세액표","월급에서 자동 공제"],["사업소득(프리랜서)","3.3% (소득세 3%+지방세 0.3%)","연말 종소세 정산"],["이자소득","15.4% (소득세 14%+지방세 1.4%)","금융소득"],["배당소득","15.4%","금융소득"],["퇴직소득","기본세율","근속연수공제 적용"],["기타소득","22% (소득세 20%+지방세 2%)","필요경비 60% 공제 후"]]} />

      <CategoryButton label="세금 정보" count={10} href="/category/세금" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>원천징수 의무자가 해야 할 일</H2>
      <p style={body}>급여나 대금을 지급하는 사업자가 원천징수 의무자예요.</p>
      <SectionBadge>원천징수 의무자가 해야 할 일</SectionBadge>
      <Steps steps={[{"title":"세금 원천징수","desc":"지급액에서 해당 세율만큼 떼요."},{"title":"익월 10일까지 신고·납부","desc":"원천징수한 세금을 다음 달 10일까지 홈택스에서 신고하고 납부해요."},{"title":"지급명세서 제출","desc":"반기 또는 연간 지급명세서를 국세청에 제출해요."}]} />
      <Divider />

      <H2>프리랜서 3.3%는 최종 세금이 아니에요</H2>
      <p style={body}>3.3%는 미리 떼는 것일 뿐, 5월 종합소득세 신고에서 정산돼요.</p>
      <GreenBox title="프리랜서 3.3%는 최종 세금이 아니에요">3.3% 원천징수 → 5월 종소세 신고에서 정산<br />실제 세금이 3.3%보다 적으면 → 환급<br />실제 세금이 3.3%보다 많으면 → 추가 납부<br />경비 처리가 많을수록 환급 가능성 ↑</GreenBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성했어요. 세율은 세법 개정에 따라 달라질 수 있으니, 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
