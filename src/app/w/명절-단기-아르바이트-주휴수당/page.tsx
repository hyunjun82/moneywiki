"use client";
// Q1. 명절 단기 알바를 하는데 주휴수당을 받을 수 있는지 궁금한 상황
// Q2. 주 15시간 이상 근무 여부를 확인하고, 사업주에게 주휴수당을 요구한다
// Q3. 주휴수당 발생 요건(주 15시간 이상), 계산법, 단기 알바 적용 여부, 청구 방법
// Q4. GreenBox(주휴수당 기준) + Steps(청구 절차) + BorderBox(계산 예시) + FAQ
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS_DATA = [
  { title: "주 근무시간 확인", desc: "한 주에 15시간 이상 일했는지 확인해요. 15시간 미만이면 주휴수당이 안 나와요." },
  { title: "개근 확인", desc: "약속된 근무일에 모두 출근했는지 봐요. 결근 없이 개근해야 주휴수당이 발생해요." },
  { title: "사업주에게 요구", desc: "주휴수당은 사업주가 자동으로 줘야 해요. 안 주면 임금 체불이에요." },
  { title: "미지급 시 고용노동부 신고", desc: "주휴수당을 안 주면 고용노동부(1350)에 임금체불 진정을 할 수 있어요." },
];
const FAQS = [
  { q: "3일만 일해도 주휴수당 나오나요?", a: "주 15시간 이상이면 나와요. 하루 8시간씩 3일이면 주 24시간이니 주휴수당 대상이에요. 하루 4시간씩 3일(12시간)이면 안 돼요." },
  { q: "주휴수당 계산은 어떻게 하나요?", a: "주 40시간 미만이면 (주 근무시간 ÷ 5) × 시급이에요. 예를 들어 주 24시간 근무, 시급 1만원이면 (24÷5)×10,000 = 48,000원이에요." },
  { q: "일용직도 주휴수당 받나요?", a: "1주일 이상 연속 근무하고 주 15시간 이상이면 일용직도 받아요. 하루만 일하고 끝나는 경우는 해당 안 돼요." },
  { q: "사업주가 주휴수당이 뭔지 모른다고 하면요?", a: "근로기준법 제55조에 명시된 의무예요. 사업주가 모른다고 면제되지 않아요. 고용노동부 상담을 안내해주세요." },
  { q: "최저시급에 주휴수당이 포함된 건가요?", a: "최저임금 시급(2026년 10,030원)에 주휴수당은 포함 안 돼요. 별도로 지급해야 해요. 시급 공고에 '주휴수당 포함'이라고 적은 건 사실상 시급이 낮은 거예요." },
];
const SOURCES = [{ name: "근로기준법 제55조", href: "https://www.law.go.kr/법령/근로기준법" }, { name: "고용노동부", href: "https://www.moel.go.kr" }];
const RELATED = [
  { slug: "경조휴가-부여기준", title: "경조휴가 부여기준", description: "경조사 유급휴가 일수." },
  { slug: "산재보험-편의점-아르바이트-적용", title: "편의점 알바 산재보험", description: "알바도 산재보험 적용." },
  { slug: "임금-미지급-6개월-해결-방법", title: "임금 미지급 해결 방법", description: "임금 체불 시 대응법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 아르바이트 · 주휴수당</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>명절 단기 알바, 주휴수당 받을 수 있나?<br />발생 조건과 계산법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>명절 단기 아르바이트 하면서 주휴수당까지 받을 수 있는지 궁금하죠.</p>
      <p style={body}><a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제55조</a>에 따라 주 15시간 이상 일하고 개근하면 주휴수당이 발생해요. 단기 알바도 예외가 아니에요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>주휴수당 발생 조건</H2>
      <p style={body}>두 가지만 충족하면 돼요.</p>
      <GreenBox title="주휴수당 조건">주 15시간 이상 근무{"\n"}약속된 근무일 개근{"\n"}1주일 이상 근무 계속{"\n"}사업장 규모 무관 (1인 이상)</GreenBox>

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>계산은 이렇게 해요</H2>
      <p style={body}>주 40시간 미만 단기 알바 기준이에요.</p>
      <BorderBox><strong>주휴수당 계산법</strong><br />(주 근무시간 ÷ 5) × 시급 = 주휴수당{"\n"}<br />예) 주 24시간, 시급 10,030원 → (24÷5)×10,030 = 48,144원{"\n"}<br />예) 주 20시간, 시급 10,030원 → (20÷5)×10,030 = 40,120원</BorderBox>
      <Divider />

      <H2>안 주면 이렇게 청구하세요</H2>
      <p style={body}>주휴수당 미지급은 임금 체불이에요.</p>
      <SectionBadge>주휴수당 청구 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>단기 알바 주휴수당에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성했어요. 구체적인 임금 분쟁은 고용노동부(1350)에서 상담받으세요." />
    </ArticleLayout>
  );
}
