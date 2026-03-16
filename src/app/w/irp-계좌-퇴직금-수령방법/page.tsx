"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금돼 있어요" },
  { id: "c2", label: "금융사 앱에서 잔액을 확인했어요" },
  { id: "c3", label: "해지(일시금) 또는 유지(연금) 중 선택했어요" },
  { id: "c4", label: "수령 계좌(일반 입출금)가 준비돼 있어요" },
];
const CHECKLIST = ["IRP 잔액 및 운용 상품 확인", "수령 방법 결정 — 해지 or 연금", "금융사 앱에서 해지/인출 신청", "수령 계좌 지정 및 입금 확인", "퇴직소득원천징수영수증 보관"];
const FAQS = [
  { q: "IRP 계좌에서 퇴직금 수령하는 방법은?", a: "금융사 앱에서 해지 신청하면 2~3영업일 내에 일반 계좌로 입금돼요. 영업점 방문으로도 처리할 수 있죠." },
  { q: "수령 전 확인해야 할 것들은?", a: "운용 중인 상품(펀드, ETF)이 있다면 환매 소요시간을 확인하세요. 추가 납입분과 퇴직금 구분도 중요하죠." },
  { q: "중도 인출과 만기 수령 중 어느 게 유리한가요?", a: "당장 돈이 필요하면 중도 인출, 노후 대비라면 55세 이후 연금 수령이 세금 면에서 유리해요." },
  { q: "수령 시 세금 처리 방법은?", a: "해지 시 퇴직소득세가 원천징수돼요. 연금 수령 시에는 퇴직소득세의 60~70%만 부담하죠." },
  { q: "IRP 수령 후 계좌를 어떻게 관리하나요?", a: "해지하면 계좌가 폐쇄돼요. 유지하면서 추가 납입으로 세액공제를 받을 수 있으니, 필요에 따라 결정하세요." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 — IRP 수령 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "금융감독원 — IRP 비교공시", url: "https://www.fss.or.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령 방법", description: "IRP 인출 절차와 해지 방법을 정리했어요." },
  { slug: "irp-퇴직금-인출", title: "IRP 퇴직금 인출과 절세", description: "인출 방법별 세금 차이와 절세 전략을 안내해요." },
  { slug: "퇴직금-IRP-이체-세금", title: "IRP 이체 세금 처리", description: "이체와 인출 시 세금이 어떻게 달라지는지 비교했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="irp-계좌-퇴직금-수령방법" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP계좌 · 수령</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>IRP 계좌 퇴직금 수령 방법,<br />단계별 정리</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;IRP 계좌에 퇴직금이 들어와 있는데, 단계별로 어떻게 꺼내나요?&rdquo;
        금융사 앱에서 해지 신청하면 2~3영업일 내에 일반 계좌로 입금돼요.
        수령 전 확인할 사항, 해지와 연금 수령의 차이, 세금 처리를 단계별로 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>IRP 계좌에서 퇴직금 수령하는 방법은?</H2>
      <p style={body}>금융사(은행·증권사) 앱에서 <strong>해지 신청</strong>하는 게 가장 빠르고 편해요. &ldquo;퇴직연금 &gt; IRP &gt; 해지/인출&rdquo; 메뉴에서 퇴직 사유 인출을 선택하면 되죠.</p>
      <p style={body}>수령 계좌(일반 입출금 계좌)를 지정하면 신청이 완료돼요. 운용 중인 상품이 환매된 뒤 퇴직소득세를 원천징수하고 나머지가 입금되죠. 보통 2~3영업일이면 끝나요.</p>
      <p style={body}>영업점 방문으로도 가능해요. 신분증만 가져가면 직원이 해지 절차를 안내해주죠. 앱이 불편하면 전화 상담(금융사 고객센터) 후 방문 예약을 하면 돼요.</p>
      <GreenBox title="수령 단계">1단계: 금융사 앱 로그인 → IRP 메뉴<br />2단계: 퇴직 사유 인출 선택<br />3단계: 수령 계좌 지정 → 신청 완료<br />4단계: 2~3영업일 내 입금 확인</GreenBox>

      <Divider />
      <H2>수령 전 확인해야 할 것들은?</H2>
      <p style={body}>먼저 <strong>운용 중인 상품</strong>을 확인하세요. 펀드나 ETF에 투자 중이라면 환매까지 시간이 걸려요. 원금보장형만 있으면 더 빨리 처리되죠.</p>
      <p style={body}><strong>추가 납입분</strong>이 있는지도 확인하세요. 퇴직금 외에 세액공제를 위해 추가 납입한 금액이 있다면, 전체 해지 시 기타소득세(16.5%)가 붙을 수 있어요.</p>
      <p style={body}><strong>IRP 잔액</strong>이 퇴직금과 일치하는지 확인하세요. 운용 수익(또는 손실)이 반영돼서 원래 퇴직금보다 많거나 적을 수 있거든요.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>중도 인출과 만기 수령 중 어느 게 유리한가요?</H2>
      <p style={body}>당장 목돈이 필요하면 <strong>바로 해지(일시금)</strong>가 현실적이에요. 주택 구입, 의료비 등 급한 지출이 있다면 세금을 더 내더라도 일시금이 맞죠.</p>
      <p style={body}>노후 대비가 목적이라면 <strong>55세 이후 연금 수령</strong>이 세금 면에서 유리해요. 퇴직소득세의 60~70%만 부담하니까, 장기적으로 수백만 원을 아낄 수 있죠.</p>
      <p style={body}>절충 방법도 있어요. 퇴직금 일부를 인출하고 나머지를 유지하는 &ldquo;부분 인출&rdquo;이 가능한 금융사도 있으니, 상담받아보세요.</p>

      <Divider />
      <H2>수령 시 세금 처리 방법은?</H2>
      <p style={body}>해지 시 금융사가 <strong>퇴직소득세를 원천징수</strong>한 뒤 나머지를 입금해요. 별도 세금 신고는 필요 없죠.</p>
      <p style={body}>연금으로 수령하면 매 수령 시마다 <strong>연금소득세</strong>가 소액씩 빠져요. 연간 1,500만 원 이하면 분리과세(3.3~5.5%)가 적용돼서 세금 부담이 적죠.</p>
      <p style={body}>퇴직소득원천징수영수증은 해지 후 금융사에서 발급해줘요. 세금 계산이 맞는지 확인하고 보관해두세요.</p>

      <Divider />
      <H2>IRP 수령 후 계좌를 어떻게 관리하나요?</H2>
      <p style={body}>전체 해지하면 <strong>계좌가 폐쇄</strong>돼요. 나중에 다시 IRP가 필요하면 새로 만들어야 하죠.</p>
      <p style={body}>퇴직금만 꺼내고 계좌를 유지하면 <strong>추가 납입으로 세액공제</strong>를 계속 받을 수 있어요. 연간 900만 원까지 납입하면 최대 148.5만 원을 돌려받을 수 있죠.</p>
      <p style={body}>IRP를 유지하면서 운용하면 복리 효과도 기대할 수 있어요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 비교공시에서 운용사별 수익률을 확인해보세요.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="IRP 수령 준비가 잘 돼 있네요. 금융사 앱에서 해지 신청을 진행하세요." partialMatchText="확인이 필요한 항목이 있어요. 잔액과 운용 상품을 먼저 확인하세요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 계좌 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(fss.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
