"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 IRP로 이체된 상태예요" },
  { id: "c2", label: "IRP 이체 시점에는 세금이 빠지지 않았어요 (유예)" },
  { id: "c3", label: "인출할 때 비로소 세금이 정산돼요" },
  { id: "c4", label: "연금 수령 시 세금이 줄어드는 걸 알고 있어요" },
];
const CHECKLIST = [
  "IRP 이체 완료 확인 — 퇴직금 전액 입금 여부",
  "세금 유예 상태 확인 — 아직 퇴직소득세 미부과",
  "인출 방법 결정 — 일시금(세금 전액) vs 연금(세금 감면)",
  "추가 납입분 구분 — 퇴직금과 추가 납입금 세금 체계 다름",
  "퇴직소득원천징수영수증 보관",
];
const FAQS = [
  { q: "IRP로 이체 시 세금이 바로 부과되나요?", a: "아니에요. IRP로 이체하면 퇴직소득세가 유예돼요. 나중에 인출할 때 비로소 세금이 정산되죠." },
  { q: "IRP 이체와 세금 유예의 관계는?", a: "IRP에 퇴직금이 머무는 동안에는 세금이 부과되지 않아요. 이 기간 동안 운용 수익을 올릴 수 있고, 연금으로 받으면 세금이 줄어드는 구조죠." },
  { q: "IRP에서 인출 시 세금은 어떻게 되나요?", a: "일시금으로 꺼내면 퇴직소득세 전액이 부과돼요. 연금으로 나눠 받으면 퇴직소득세의 60~70%만 내면 되죠." },
  { q: "IRP 이체 후 절세 방법은?", a: "가장 효과적인 방법은 55세 이후 연금으로 수령하는 거예요. 10년 이상 나눠 받으면 세금이 가장 적어지죠." },
  { q: "IRP 이체 시 실수하기 쉬운 것들은?", a: "추가 납입분과 퇴직금을 구분하지 않고 전체 해지하면 기타소득세(16.5%)가 추가로 붙을 수 있어요. 퇴직금만 인출하는 게 유리하죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "소득세법 — 퇴직소득세 유예 및 연금소득세", url: "https://www.law.go.kr/법령/소득세법" }] },
  { category: "공식 자료", items: [{ label: "국세청 — 퇴직소득 세금 안내", url: "https://www.nts.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-IRP-이전-의무가입-세액공제-혜택", title: "IRP 이전과 세액공제 활용법", description: "IRP 이전 시 세액공제 혜택을 어떻게 활용하는지 정리했어요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 계산 방법", description: "퇴직소득세 계산 구조와 절세 방법을 안내해요." },
  { slug: "irp-퇴직금-인출", title: "IRP 퇴직금 인출과 절세", description: "인출 방법별 세금 차이를 비교했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-이체-세금" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP이체 · 세금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직금 IRP 이체 시 세금,<br />어떻게 처리되나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금이 IRP로 들어갔는데, 세금은 언제 내나요?&rdquo;
        IRP에 이체되는 시점에는 세금이 빠지지 않아요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 퇴직소득세가 &ldquo;유예&rdquo;되는 거죠.
        나중에 인출할 때 비로소 세금이 정산돼요. 이체와 인출의 세금 차이, 절세 방법을 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>IRP로 이체 시 세금이 바로 부과되나요?</H2>
      <p style={body}>아니에요. IRP에 퇴직금이 입금되면 퇴직소득세는 <strong>유예</strong>돼요. 세금이 면제되는 게 아니라 나중으로 미뤄지는 거죠. 인출할 때 비로소 정산이 이뤄져요.</p>
      <p style={body}>유예 기간 동안 퇴직금을 운용해서 수익을 올릴 수 있어요. 예금에 넣으면 이자가 붙고, 펀드에 투자하면 운용 수익이 생기죠. 세금을 내기 전에 돈이 불어나는 효과가 있어요.</p>
      <p style={body}>연금으로 나눠 받으면 유예된 세금의 60~70%만 부담하면 돼요. 이게 IRP의 핵심 절세 구조예요. 일시금으로 꺼내면 유예된 세금 전액을 내야 하죠.</p>
      <GreenBox title="IRP 세금 유예 구조">이체 시 → 세금 0원 (유예)<br />일시금 인출 시 → 퇴직소득세 전액 부과<br />연금 수령 시 → 퇴직소득세 60~70%만 부과</GreenBox>

      <Divider />
      <H2>IRP 이체와 세금 유예의 관계는?</H2>
      <p style={body}>IRP는 <strong>과세 이연(稅 延) 계좌</strong>예요. 세금 납부 시점을 뒤로 미뤄주는 제도이죠. 퇴직금이 IRP에 머무는 동안에는 세금이 부과되지 않고, 인출하는 순간에 정산이 이뤄져요.</p>
      <p style={body}>세금 유예의 실질적 이점은 두 가지예요. 첫째, 세금을 내기 전에 <strong>운용 수익</strong>을 올릴 수 있죠. 둘째, 연금으로 나눠 받으면 <strong>세율 자체가 낮아져요</strong>.</p>
      <p style={body}>다만 유예된 세금이 사라지는 건 아니에요. 일시금으로 꺼내면 유예된 세금을 한꺼번에 내야 하니까, 가능하면 연금 수령을 고려해보세요.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>IRP에서 인출 시 세금은 어떻게 되나요?</H2>
      <p style={body}>일시금으로 전액 인출하면 퇴직소득세가 <strong>전액 부과</strong>돼요. 금융사가 원천징수한 뒤 나머지를 지정 계좌로 입금하죠.</p>
      <p style={body}>연금으로 나눠 받으면 <strong>퇴직소득세의 60~70%</strong>만 부과돼요. 수령 기간이 10년을 넘기면 세금이 더 줄어들죠. 이건 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>이 정한 연금소득세율이 적용되기 때문이에요.</p>
      <p style={body}>추가 납입분까지 같이 인출하면 세액공제 받은 금액에 기타소득세(16.5%)가 따로 붙어요. 퇴직금만 꺼내고 추가 납입분은 유지하는 게 세금 측면에서 유리하죠.</p>

      <Divider />
      <H2>IRP 이체 후 절세 방법은?</H2>
      <p style={body}>가장 효과적인 방법은 <strong>55세 이후 연금 수령</strong>이에요. 수령 기간을 10년 이상으로 설정하면 세금이 가장 적어지죠.</p>
      <p style={body}>IRP에 <strong>추가 납입</strong>해서 세액공제를 받는 것도 절세 방법이에요. 연간 900만 원까지 납입하면 최대 148.5만 원을 돌려받을 수 있죠.</p>
      <p style={body}>IRP를 유지하면서 운용 수익을 올리면 복리 효과까지 기대할 수 있어요. 원금보장형은 안전하지만 수익이 낮고, 투자형은 수익 가능성이 높지만 손실 위험이 있으니 본인 성향에 맞게 선택하세요.</p>

      <Divider />
      <H2>IRP 이체 시 실수하기 쉬운 것들은?</H2>
      <p style={body}>첫째, <strong>추가 납입분을 구분하지 않고 전체 해지</strong>하는 실수예요. 퇴직금과 추가 납입금의 세금 체계가 다르니까, 퇴직금만 부분 인출하는 게 유리하죠.</p>
      <p style={body}>둘째, <strong>환매 타이밍을 고려하지 않는 경우</strong>예요. 펀드에 투자 중이라면 해지 시점의 평가액으로 환매되니까, 시장 하락기에 해지하면 손실이 확정돼요.</p>
      <p style={body}>셋째, <strong>다른 IRP로 이체 시 과세 여부</strong>를 모르는 경우예요. IRP 간 계좌이체는 세금이 발생하지 않으니, 더 좋은 조건의 금융사로 옮기는 건 자유롭게 할 수 있죠.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="IRP 이체 세금 구조를 잘 파악하고 계시네요. 연금 수령을 고려해보세요." partialMatchText="확인이 필요한 항목이 있어요. 인출 방법에 따라 세금이 크게 달라지니 미리 계산해보세요." />

      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 이체 세금에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
