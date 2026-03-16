"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 입금된 상태예요" },
  { id: "c2", label: "일시금 인출 시 퇴직소득세 전액이 부과돼요" },
  { id: "c3", label: "연금 인출 시 세금이 30~40% 줄어요" },
  { id: "c4", label: "추가 납입분은 별도 세금 체계가 적용돼요" },
];
const CHECKLIST = ["인출 방법 결정 — 일시금 vs 연금 vs 부분 인출", "운용 상품 환매 타이밍 확인", "추가 납입분 구분 — 기타소득세 발생 여부", "세금 시뮬레이션 — 일시금과 연금 비교", "인출 후 잔여 자금 운용 계획"];
const FAQS = [
  { q: "IRP 퇴직금 인출 방법에는 뭐가 있나요?", a: "일시금 해지, 연금 수령, 부분 인출 세 가지예요. 퇴직 사유 입금분은 별도 사유 없이 바로 인출 가능하죠." },
  { q: "중도 인출 가능한 사유는?", a: "퇴직금 부분은 제한 없이 인출 가능해요. 추가 납입분은 무주택자 주택구입, 6개월 이상 요양 등 법정 사유가 필요하죠." },
  { q: "연금 방식으로 인출하면 세금이 줄어드나요?", a: "네, 퇴직소득세의 60~70%만 부담해요. 수령 기간이 10년을 넘기면 세금이 더 줄어들죠." },
  { q: "인출 전 확인해야 할 것들은?", a: "운용 상품 환매 소요시간, 추가 납입분 세금 영향, 잔여 계좌 유지 여부를 확인하세요." },
  { q: "인출 후 나머지 금액 운용 방법은?", a: "IRP를 유지하면서 예금, 펀드, ETF로 운용할 수 있어요. 추가 납입으로 세액공제도 계속 받을 수 있죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "소득세법 — 퇴직소득세 및 연금소득세", url: "https://www.law.go.kr/법령/소득세법" }] },
  { category: "공식 자료", items: [{ label: "금융감독원 — IRP 수령 방법 안내", url: "https://www.fss.or.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "IRP 해지와 중도 인출의 차이를 정리했어요." },
  { slug: "퇴직금-중도인출-세금", title: "퇴직금 중도 인출 세금", description: "중도 인출 시 세금이 어떻게 달라지는지 안내해요." },
  { slug: "퇴직금-연금-전환", title: "퇴직금 연금 전환", description: "연금으로 전환하면 어떤 혜택이 있는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="irp-퇴직금-인출" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 인출절세</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>IRP 퇴직금 인출,<br />어떤 방법이 세금을 줄여주나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;IRP에 있는 퇴직금을 어떻게 꺼내야 세금을 덜 내나요?&rdquo;
        인출 방법에 따라 세금이 크게 달라져요. 일시금은 전액 부과, 연금은 30~40% 감면이죠.
        인출 방법별 세금 차이, 중도 인출 사유, 절세 전략을 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>IRP 퇴직금 인출 방법에는 뭐가 있나요?</H2>
      <p style={body}>세 가지 방법이에요. <strong>일시금 해지</strong>(전액 인출), <strong>연금 수령</strong>(55세 이후 분할 인출), <strong>부분 인출</strong>(퇴직금만 꺼내고 계좌 유지)이죠.</p>
      <p style={body}>퇴직 사유로 입금된 퇴직금은 별도 사유 없이 바로 인출할 수 있어요. 일시금이든 부분 인출이든 제한이 없죠.</p>
      <p style={body}>세금 면에서는 <strong>연금 수령이 가장 유리</strong>해요. 퇴직소득세의 60~70%만 내면 되니까요. 다만 55세 이후에야 연금을 시작할 수 있어요.</p>
      <GreenBox title="인출 방법별 세금">일시금 해지 → 퇴직소득세 100%<br />연금 수령(10년 이내) → 퇴직소득세 70%<br />연금 수령(10년 초과) → 퇴직소득세 60%</GreenBox>

      <Divider />
      <H2>중도 인출 가능한 사유는?</H2>
      <p style={body}>퇴직금 부분은 <strong>사유 제한 없이</strong> 인출할 수 있어요. &ldquo;퇴직 사유 인출&rdquo;이니까요. IRP 해지 메뉴에서 바로 신청하면 되죠.</p>
      <p style={body}>추가 납입분(세액공제 받은 금액)은 <strong>법정 사유</strong>가 있어야 중도 인출이 가능해요. 무주택자의 주택 구입, 6개월 이상 요양, 개인회생·파산, 천재지변 피해 등이 해당되죠.</p>
      <p style={body}>법정 사유 없이 추가 납입분까지 꺼내려면 IRP를 전체 해지해야 해요. 이때 세액공제 받았던 금액에 기타소득세(16.5%)가 붙으니까 주의하세요.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>연금 방식으로 인출하면 세금이 줄어드나요?</H2>
      <p style={body}>네, <strong>확실히 줄어요</strong>. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 연금으로 받으면 퇴직소득세의 60~70%만 부담하죠. 10년 이상 나눠 받으면 60%, 10년 이내면 70%예요.</p>
      <p style={body}>연금 수령을 시작하려면 <strong>만 55세 이상</strong>이어야 해요. 금융사에 연금 개시를 신청하면 매월 또는 분기별로 정해진 금액이 입금되죠.</p>
      <p style={body}>연간 연금 수령액이 1,500만 원 이하면 <strong>분리과세</strong>(3.3~5.5%)가 적용돼서 세금 부담이 더 줄어요. 수령 금액과 기간을 잘 조절하면 세금을 크게 아낄 수 있죠.</p>

      <Divider />
      <H2>인출 전 확인해야 할 것들은?</H2>
      <p style={body}><strong>운용 상품 환매 타이밍</strong>을 확인하세요. 펀드에 투자 중이라면 환매까지 1~5영업일이 걸려요. 시장 하락기에 환매하면 손실이 확정될 수 있으니, 미리 원금보장형으로 옮겨두는 게 안전하죠.</p>
      <p style={body}><strong>추가 납입분 세금 영향</strong>을 따져보세요. 전체 해지하면 세액공제 받은 금액에 기타소득세가 붙어요. 퇴직금만 부분 인출하면 이 세금을 피할 수 있죠.</p>
      <p style={body}><strong>세금 시뮬레이션</strong>을 해보세요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>이나 금융사 앱에서 일시금과 연금의 세금 차이를 미리 계산해볼 수 있어요.</p>

      <Divider />
      <H2>인출 후 나머지 금액 운용 방법은?</H2>
      <p style={body}>퇴직금을 꺼낸 뒤에도 IRP 계좌를 유지할 수 있어요. 추가 납입으로 <strong>세액공제</strong>를 계속 받을 수 있고, 운용 수익으로 자산을 불릴 수 있죠.</p>
      <p style={body}>운용 상품은 본인의 투자 성향에 맞게 선택하세요. 안정을 원하면 원금보장형(정기예금), 수익을 원하면 투자형(펀드, ETF)이 있어요.</p>
      <p style={body}>IRP를 유지하면 나중에 새 직장에서 퇴직금이 다시 들어올 때도 같은 계좌로 받을 수 있어요. 퇴직금을 한곳에서 통합 관리할 수 있어서 편리하죠.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="인출 방법별 세금 차이를 잘 파악하고 계시네요. 연금 수령을 고려해보세요." partialMatchText="확인이 필요한 항목이 있어요. 인출 방법에 따라 세금이 크게 달라지니 꼼꼼히 비교하세요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 퇴직금 인출에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(fss.or.kr)이나 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
