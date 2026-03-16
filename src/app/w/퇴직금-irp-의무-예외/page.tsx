"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "만 55세 이상이에요" },
  { id: "c2", label: "퇴직금이 300만 원 이하예요" },
  { id: "c3", label: "퇴직연금 담보대출을 상계 중이에요" },
  { id: "c4", label: "위 중 하나라도 해당되면 IRP 없이 받을 수 있어요" },
];
const CHECKLIST = ["예외 해당 여부 확인 — 나이, 금액, 특수 사유", "회사에 일반 계좌 정보 전달", "퇴직소득세 원천징수 후 입금 확인", "퇴직소득원천징수영수증 보관", "예외 해당 안 되면 IRP 개설"];
const FAQS = [
  { q: "IRP 의무 예외 조건이 뭔가요?", a: "55세 이상, 퇴직금 300만 원 이하, 근로자 사망, 담보대출 상계 등이 예외에 해당해요." },
  { q: "55세 이상이면 IRP 없이 받을 수 있나요?", a: "네, 만 55세 이상이면 일반 계좌로 직접 받을 수 있어요. IRP를 개설할 필요가 없죠." },
  { q: "소액 퇴직금도 IRP 의무인가요?", a: "퇴직금이 300만 원 이하면 예외예요. 일반 계좌로 받을 수 있죠." },
  { q: "예외 적용을 받으려면 어떻게 해야 하나요?", a: "회사 인사팀에 예외 사유를 알리고 일반 계좌 정보를 전달하면 돼요. 별도 신청서가 필요하지 않은 경우가 대부분이죠." },
  { q: "예외 신청 절차는?", a: "특별한 절차 없이 회사에 일반 계좌 정보를 주면 돼요. 회사가 예외 해당 여부를 확인한 뒤 일반 계좌로 송금하죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 시행령 — IRP 의무 예외", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — IRP 의무 예외 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상", description: "IRP 의무 가입이 누구에게 적용되는지 정리했어요." },
  { slug: "퇴직금-일시금-수령-방법", title: "퇴직금 일시금 수령 방법", description: "IRP 없이 일시금으로 받는 방법을 안내해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "의무 대상이라면 IRP를 미리 만들어두세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-의무-예외" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무예외</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직금 IRP 의무 예외,<br />해당되는 경우는?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;IRP 없이 퇴직금을 바로 받을 수 있는 경우가 있다면서요?&rdquo;
        맞아요, <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 시행령</a>이 정한 예외 조건에 해당하면 일반 계좌로 직접 받을 수 있어요.
        어떤 경우가 예외인지, 어떻게 신청하는지 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>IRP 의무 예외 조건이 뭔가요?</H2>
      <p style={body}>예외 조건은 크게 네 가지예요. 첫째 <strong>만 55세 이상</strong>, 둘째 퇴직금이 <strong>300만 원 이하</strong>, 셋째 근로자 <strong>사망</strong>, 넷째 퇴직연금 <strong>담보대출 상계</strong>로 지급되는 경우죠.</p>
      <p style={body}>이 중 가장 많이 해당되는 건 55세 이상과 300만 원 이하예요. 55세 이상은 이미 연금 수령 나이에 가까우니까 IRP를 경유할 필요가 없다는 취지이고, 300만 원 이하는 소액이라서 IRP로 관리하기 번거롭다는 이유죠.</p>
      <p style={body}>예외에 해당하면 회사가 퇴직소득세를 원천징수한 뒤 나머지를 일반 계좌로 직접 송금해요. IRP를 만들지 않아도 되니까 절차가 간단하죠.</p>
      <GreenBox title="예외 조건 4가지">1. 만 55세 이상<br />2. 퇴직금 300만 원 이하<br />3. 근로자 사망<br />4. 퇴직연금 담보대출 상계</GreenBox>

      <Divider />
      <H2>55세 이상이면 IRP 없이 받을 수 있나요?</H2>
      <p style={body}>네, <strong>퇴직일 기준으로 만 55세 이상</strong>이면 예외예요. 일반 입출금 계좌로 퇴직금을 직접 받을 수 있죠.</p>
      <p style={body}>55세 이상이라도 IRP로 받고 싶다면 선택할 수 있어요. IRP에 넣으면 연금 수령 시 세금이 줄어드니까, 노후 자금으로 활용하려면 IRP를 고려해보세요.</p>
      <p style={body}>나이 기준은 퇴직일을 기준으로 판단해요. 퇴직일이 55세 생일 전이면 의무 대상이고, 55세 생일 이후면 예외에 해당하죠.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>소액 퇴직금도 IRP 의무인가요?</H2>
      <p style={body}>퇴직금이 <strong>300만 원 이하</strong>면 IRP 의무가 아니에요. 소액이라 IRP에 넣어두기보다는 바로 사용하는 게 현실적이니까요.</p>
      <p style={body}>300만 원 기준은 세전 퇴직금 총액이에요. 퇴직소득세를 뺀 실수령액이 아니라, 세금 차감 전 금액이 기준이죠.</p>
      <p style={body}>300만 원을 약간 넘는 경우라면 IRP를 만들어야 해요. 애매한 금액이라면 회사 인사팀에 정확한 퇴직금 예상 금액을 확인하세요.</p>

      <Divider />
      <H2>예외 적용을 받으려면 어떻게 해야 하나요?</H2>
      <p style={body}>별도의 복잡한 절차는 없어요. 회사 인사팀에 <strong>예외 사유</strong>(나이, 금액 등)를 알리고, <strong>일반 계좌 정보</strong>를 전달하면 돼요.</p>
      <p style={body}>회사가 예외 해당 여부를 확인한 뒤 퇴직소득세를 원천징수하고 나머지를 일반 계좌로 송금해요. 특별한 신청서가 필요하지 않은 경우가 대부분이죠.</p>
      <p style={body}>예외에 해당하는지 확실하지 않다면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담받으세요. 잘못 판단하면 퇴직금 지급이 지연될 수 있으니까요.</p>

      <Divider />
      <H2>예외 신청 절차는?</H2>
      <p style={body}>대부분의 경우 별도 신청 없이 회사가 알아서 처리해요. 인사팀이 근로자의 나이와 퇴직금 금액을 확인하면 예외 여부가 자동으로 결정되니까요.</p>
      <p style={body}>다만 55세 기준은 <strong>퇴직일 기준</strong>이니까, 생일이 퇴직일 전후에 걸리면 회사에 정확한 기준을 확인하세요. 하루 차이로 의무 여부가 달라질 수 있거든요.</p>
      <p style={body}>예외에 해당하더라도 IRP를 선택할 수 있어요. 세금 유예와 연금 수령 혜택을 원한다면 자발적으로 IRP를 개설하는 것도 방법이죠.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="IRP 의무 예외에 해당할 가능성이 높아요. 회사에 일반 계좌 정보를 전달하세요." partialMatchText="일부 조건만 해당돼요. 정확한 예외 여부는 회사 인사팀에 확인하세요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 의무 예외에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
