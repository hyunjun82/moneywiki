"use client";
// Q1. 청년미래적금 가입했는데 기여금이 얼마나 나오는지 궁금한 상황
// Q2. 소득별 기여금 금액을 확인하고, 가입·유지 전략을 세운다
// Q3. 소득구간별 기여금율, 가입 자격(나이·소득), 5년 만기 조건, 비과세 혜택
// Q4. GreenBox(기여금 기준) + Steps(가입 절차) + BorderBox(주의사항) + FAQ
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, FAQ, SourceNote, Disclaimer, ArticleLayout, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";

const STEPS_DATA = [
  { title: "자격 확인", desc: "만 19~34세, 총급여 7,500만원 이하(종합소득 6,300만원 이하) 청년이 대상이에요." },
  { title: "은행 앱에서 가입", desc: "시중 은행 앱에서 청년미래적금 상품을 선택하고 가입해요." },
  { title: "매달 납입", desc: "월 최대 70만원까지 자유롭게 납입해요. 납입액이 클수록 기여금도 커져요." },
  { title: "5년 만기 수령", desc: "5년 유지하면 원금+이자+정부 기여금을 합쳐 수령해요. 이자는 비과세예요." },
];
const FAQS = [
  { q: "중도 해지하면 기여금을 못 받나요?", a: "네. 5년 만기를 채워야 정부 기여금을 받을 수 있어요. 중도 해지하면 원금+이자만 돌려받아요." },
  { q: "군 복무 기간도 나이에 포함되나요?", a: "병역 이행 기간(최대 6년)은 나이 계산에서 빼줘요. 군 복무 후에도 가입 가능할 수 있어요." },
  { q: "비과세 혜택이 뭔가요?", a: "이자소득에 대해 15.4% 세금이 면제돼요. 일반 적금이면 이자에서 세금이 빠지지만, 청년미래적금은 이자 전액을 받아요." },
  { q: "청년도약계좌와 중복 가입되나요?", a: "안 돼요. 둘 중 하나를 선택해야 해요. 기여금 조건을 비교해서 유리한 쪽을 고르세요." },
  { q: "소득이 바뀌면 기여금도 바뀌나요?", a: "매년 소득을 재확인해서 기여금 비율이 조정돼요. 소득이 올라가면 기여금이 줄어들 수 있어요." },
];
const SOURCES = [{ name: "서민금융진흥원 청년미래적금", href: "https://www.kinfa.or.kr" }, { name: "금융위원회", href: "https://www.fsc.go.kr" }];
const RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축 세액공제 기준." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리 혜택", description: "CMA 금리 비교." },
  { slug: "예금자보호제도", title: "예금자보호제도", description: "5천만원 보호 한도." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 적금 · 청년</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>청년미래적금 기여금, 얼마나 받을 수 있나?<br />소득별 기여금과 가입 방법</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>청년미래적금에 가입하면 정부가 기여금을 얹어준다는데, 정확히 얼마인지 궁금하죠.</p>
      <p style={body}>총급여 7,500만원 이하 청년(만 19~34세)이 가입하면 소득에 따라 월 최대 2.4만원의 정부 기여금을 받을 수 있어요. 5년 만기 시 비과세 이자 혜택도 있고요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>소득별 기여금은 이렇게 달라요</H2>
      <p style={body}>납입액 대비 기여금 비율이 소득에 따라 차등 적용돼요.</p>
      <GreenBox title="소득별 기여금">소득 2,400만원 이하: 납입액의 6% (월 최대 2.4만원){"\n"}소득 3,600만원 이하: 납입액의 4.5% (월 최대 1.8만원){"\n"}소득 4,800만원 이하: 납입액의 3% (월 최대 1.2만원){"\n"}소득 7,500만원 이하: 납입액의 1.5% (월 최대 0.6만원)</GreenBox>
      <p style={body}>5년간 매달 70만원을 넣으면, 소득 2,400만원 이하 기준으로 기여금만 약 144만원이에요. 비과세 이자까지 합치면 일반 적금보다 수익이 커요.</p>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>가입부터 수령까지 절차</H2>
      <p style={body}>은행 앱에서 바로 가입할 수 있어요.</p>
      <SectionBadge>가입 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />
      <Divider />

      <H2>가입 전 알아둘 주의사항</H2>
      <p style={body}>5년을 채우지 못하면 기여금을 받을 수 없어요.</p>
      <BorderBox><strong>주의사항</strong><br />중도 해지 시 기여금 미지급 (원금+이자만 반환){"\n"}<br />청년도약계좌와 중복 가입 불가{"\n"}<br />매년 소득 재확인 → 기여금 비율 변동 가능{"\n"}<br />병역 기간은 나이 산정에서 제외 (최대 6년)</BorderBox>
      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>청년미래적금 기여금에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />
      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 청년미래적금 제도를 바탕으로 작성했어요. 가입 조건과 기여금은 정책 변경에 따라 달라질 수 있으니, 서민금융진흥원(kinfa.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
