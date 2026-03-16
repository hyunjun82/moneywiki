"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "개인형 IRP 계좌에 퇴직금이 입금돼 있어요" },
  { id: "c2", label: "퇴직 사유 입금분은 별도 사유 없이 인출 가능해요" },
  { id: "c3", label: "추가 납입분은 법정 사유가 있어야 중도 인출이 돼요" },
  { id: "c4", label: "연금 수령 시 세금이 줄어드는 걸 알고 있어요" },
];
const CHECKLIST = ["개인형 IRP 잔액 확인 — 퇴직금 + 추가 납입분 구분", "수령 방법 결정 — 해지, 부분 인출, 연금", "금융사 앱에서 인출 신청", "수령 계좌 지정 및 입금 확인", "해지 후 계좌 유지 여부 결정"];
const FAQS = [
  { q: "개인형 IRP와 퇴직연금 IRP가 다른가요?", a: "제도적으로는 같은 IRP예요. 다만 개인이 직접 개설해서 추가 납입·운용하는 경우를 '개인형 IRP'라고 부르죠. 퇴직금이 들어오면 퇴직연금 수령 기능도 겸하게 돼요." },
  { q: "개인형 IRP에서 퇴직금 수령하는 방법은?", a: "금융사 앱에서 해지 또는 부분 인출을 신청하면 돼요. 퇴직 사유 입금분은 바로 꺼낼 수 있죠." },
  { q: "수령 신청에 필요한 조건은?", a: "퇴직 사실이 확인되면 별도 조건 없이 인출 가능해요. 앱에서 본인 인증만 하면 되죠." },
  { q: "수령 시 세금은 어떻게 되나요?", a: "일시금 인출 시 퇴직소득세 전액, 연금 수령 시 60~70%만 부담해요. 추가 납입분은 별도 세금 체계가 적용되죠." },
  { q: "개인형 IRP 수령 후 계좌 유지해야 하나요?", a: "의무는 아니에요. 해지하면 폐쇄되고, 유지하면 추가 납입으로 세액공제를 계속 받을 수 있죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 — IRP 운영 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "금융감독원 — IRP 비교공시", url: "https://www.fss.or.kr" }] },
];
const RELATED = [
  { slug: "irp-계좌-퇴직금-수령방법", title: "IRP 계좌 퇴직금 수령 방법", description: "IRP에서 퇴직금 수령하는 단계별 절차를 정리했어요." },
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설", description: "IRP 계좌가 왜 필요하고 어디서 만드는지 안내해요." },
  { slug: "퇴직금-연금저축계좌-수령", title: "퇴직금 연금저축계좌 수령", description: "연금저축계좌와 IRP의 차이를 비교했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="개인형-irp-퇴직금-수령방법" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 개인형IRP · 수령</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>개인형 IRP 퇴직금 수령 방법,<br />어떻게 신청하나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;개인형 IRP에 퇴직금이 들어왔는데, 일반 IRP와 뭐가 다른가요?&rdquo;
        사실 제도적으로는 같은 IRP예요. 개인이 직접 개설해서 추가 납입·운용하다가 퇴직금까지 받게 된 경우를 &ldquo;개인형 IRP&rdquo;라고 부르죠.
        수령 방법, 세금 처리, 계좌 유지 여부를 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>개인형 IRP와 퇴직연금 IRP가 다른가요?</H2>
      <p style={body}>제도적으로는 <strong>같은 IRP</strong>예요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>상 IRP는 하나의 계좌 유형이죠. 다만 용도에 따라 이름이 달라요.</p>
      <p style={body}>&ldquo;개인형 IRP&rdquo;는 개인이 <strong>자발적으로 개설</strong>해서 추가 납입(세액공제용)이나 이직 시 퇴직금 수령에 활용하는 경우를 말해요. 회사가 가입시켜주는 DC형 퇴직연금 계좌와 구분하기 위한 표현이죠.</p>
      <p style={body}>퇴직금이 입금되면 개인형 IRP에 &ldquo;퇴직금 부분&rdquo;과 &ldquo;추가 납입 부분&rdquo;이 함께 들어가요. 인출할 때 각각 다른 세금이 적용되니까 구분이 중요하죠.</p>
      <GreenBox title="개인형 IRP = 일반 IRP">퇴직금 수령 기능 + 추가 납입(세액공제) 기능<br />퇴직금 부분 → 퇴직소득세 적용<br />추가 납입 부분 → 연금소득세 or 기타소득세 적용</GreenBox>

      <Divider />
      <H2>개인형 IRP에서 퇴직금 수령하는 방법은?</H2>
      <p style={body}>일반 IRP와 동일해요. 금융사 앱에서 <strong>해지 또는 부분 인출</strong>을 신청하면 2~3영업일 내에 지정 계좌로 입금되죠.</p>
      <p style={body}>퇴직 사유로 입금된 퇴직금 부분은 <strong>별도 사유 없이 바로 인출</strong>할 수 있어요. 부분 인출을 선택하면 퇴직금만 꺼내고 추가 납입분은 유지할 수 있죠.</p>
      <p style={body}>전체 해지를 하면 퇴직금과 추가 납입분이 한꺼번에 정산돼요. 추가 납입분에 기타소득세(16.5%)가 붙을 수 있으니, 부분 인출이 세금 면에서 유리한 경우가 많아요.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>수령 신청에 필요한 조건은?</H2>
      <p style={body}>퇴직 사실이 확인되면 <strong>별도 조건 없이</strong> 인출이 가능해요. 회사가 운용사에 퇴직을 통보하면, IRP 계좌에서 퇴직금 부분이 인출 가능 상태로 전환되죠.</p>
      <p style={body}>앱에서 본인 인증만 하면 바로 신청할 수 있어요. 추가 서류는 필요 없고, 영업점 방문으로도 처리 가능하죠.</p>
      <p style={body}>인출 전에 운용 중인 상품을 확인하세요. 펀드에 투자 중이라면 환매까지 시간이 걸릴 수 있어요. 원금보장형으로 미리 옮겨두면 수령이 빨라지죠.</p>

      <Divider />
      <H2>수령 시 세금은 어떻게 되나요?</H2>
      <p style={body}>퇴직금 부분을 일시금으로 꺼내면 <strong>퇴직소득세 전액</strong>이 원천징수돼요. 연금으로 받으면 60~70%만 부담하죠.</p>
      <p style={body}>추가 납입분(세액공제 받은 금액)까지 같이 해지하면 <strong>기타소득세(16.5%)</strong>가 따로 붙어요. 공제받은 혜택을 토해내는 셈이니까, 가능하면 추가 납입분은 유지하세요.</p>
      <p style={body}>연금 수령을 선택하면 매년 수령액에 연금소득세가 소액씩 부과돼요. 연간 1,500만 원 이하면 분리과세(3.3~5.5%)가 적용돼서 세금 부담이 적죠.</p>

      <BorderBox title="퇴직금과 추가 납입분 구분이 중요해요">
        전체 해지 → 퇴직소득세 + 기타소득세 동시 발생<br />
        부분 인출(퇴직금만) → 퇴직소득세만 발생, 추가 납입분 유지
      </BorderBox>

      <Divider />
      <H2>개인형 IRP 수령 후 계좌 유지해야 하나요?</H2>
      <p style={body}>의무는 아니에요. 퇴직금을 꺼낸 뒤 계좌를 해지해도 되고, 유지해도 되죠. 선택은 본인의 몫이에요.</p>
      <p style={body}>유지하면 <strong>추가 납입으로 세액공제</strong>를 계속 받을 수 있어요. 연간 900만 원까지 납입하면 최대 148.5만 원을 환급받을 수 있죠. 연말정산 절세 수단으로 유용해요.</p>
      <p style={body}>새 직장에서 퇴직금이 다시 들어올 때도 같은 IRP로 받을 수 있어요. 퇴직금을 한곳에서 관리할 수 있어서 편리하죠. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 비교공시에서 운용사별 수익률을 확인하고 유지 여부를 결정하세요.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="개인형 IRP 수령 방법을 잘 파악하고 계시네요. 부분 인출로 세금을 절약해보세요." partialMatchText="확인이 필요한 항목이 있어요. 퇴직금과 추가 납입분을 구분해서 인출 계획을 세우세요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>개인형 IRP 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(fss.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
