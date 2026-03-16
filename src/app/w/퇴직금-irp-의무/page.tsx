"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 이후 퇴직 예정이에요" },
  { id: "c2", label: "만 55세 미만이에요" },
  { id: "c3", label: "퇴직금이 300만 원을 초과해요" },
  { id: "c4", label: "아직 IRP 계좌를 만들지 않았어요" },
];
const CHECKLIST = ["IRP 의무 대상 해당 여부 확인", "금융사별 IRP 수수료 비교", "모바일 앱으로 IRP 개설 (10분)", "계좌 정보를 회사에 전달", "추가 납입으로 세액공제 활용 검토"];
const FAQS = [
  { q: "IRP 의무 가입 대상이 누구인가요?", a: "2022년 4월 이후 퇴직하는 55세 미만 근로자 중 퇴직금이 300만 원을 초과하는 경우 의무 대상이에요." },
  { q: "IRP 의무 가입 금액 기준은?", a: "퇴직금이 300만 원을 초과하면 IRP로 지급해야 해요. 300만 원 이하는 일반 계좌로 받을 수 있죠." },
  { q: "IRP 의무 예외 대상은 누구인가요?", a: "55세 이상, 퇴직금 300만 원 이하, 근로자 사망 등이 예외에 해당해요." },
  { q: "IRP 의무를 어기면 어떻게 되나요?", a: "회사가 IRP가 아닌 일반 계좌로 지급하면 과태료가 부과될 수 있어요. 근로자에게 불이익은 없죠." },
  { q: "의무 가입 외 추가 납입도 가능한가요?", a: "가능해요. 연간 900만 원까지 추가 납입하면 세액공제(13.2~16.5%)를 받을 수 있죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 — IRP 의무 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — IRP 의무 가입 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무 예외 조건", description: "IRP 없이 퇴직금을 받을 수 있는 예외 조건을 정리했어요." },
  { slug: "퇴직금-IRP-계좌", title: "퇴직금 IRP 계좌 개설", description: "IRP 계좌 개설 방법과 금융사 비교를 안내해요." },
  { slug: "퇴직금-irp-지급-의무화", title: "IRP 지급 의무화 시행 시기", description: "IRP 의무화가 언제부터 시행됐는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-의무" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무가입</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직금 IRP 의무 가입,<br />누구에게 해당되나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금 받으려면 IRP 계좌가 무조건 필요한가요?&rdquo;
        2022년 4월부터 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 바뀌면서 대부분의 퇴직자에게 IRP가 의무가 됐어요.
        누가 해당되는지, 금액 기준은 어떤지, 예외는 없는지 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>IRP 의무 가입 대상이 누구인가요?</H2>
      <p style={body}>2022년 4월 14일 이후 퇴직하는 근로자 중 <strong>55세 미만</strong>이면서 퇴직금이 <strong>300만 원을 초과</strong>하는 경우 IRP 의무 가입 대상이에요.</p>
      <p style={body}>정규직, 계약직, 파트타임 등 근로 형태에 관계없이 퇴직급여 수급 자격이 있으면 모두 해당되죠. 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금 대상이에요.</p>
      <p style={body}>DB형이든 DC형이든 퇴직연금 제도에 가입한 회사라면 운용사가 근로자의 IRP로 직접 이체해요. 퇴직금 제도(퇴직연금 미가입)인 회사는 회사가 직접 IRP로 송금하죠.</p>
      <GreenBox title="의무 대상 요약">55세 미만 + 퇴직금 300만 원 초과 → IRP 의무<br />55세 이상 또는 300만 원 이하 → 일반 계좌 가능</GreenBox>

      <Divider />
      <H2>IRP 의무 가입 금액 기준은?</H2>
      <p style={body}>퇴직금이 <strong>300만 원</strong>을 초과하면 IRP가 의무예요. 300만 원 이하는 소액이라서 IRP를 경유할 필요 없이 일반 계좌로 받을 수 있죠.</p>
      <p style={body}>300만 원 기준은 세전 퇴직금 기준이에요. 세금을 뺀 실수령액이 아니라 총 퇴직금이 300만 원을 넘는지가 기준이죠.</p>
      <p style={body}>퇴직금 계산이 애매하다면 회사 인사팀에 미리 문의하세요. 대략적인 금액을 알면 IRP 개설 여부를 사전에 결정할 수 있어요.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>IRP 의무 예외 대상은 누구인가요?</H2>
      <p style={body}><strong>만 55세 이상</strong>인 근로자는 예외예요. 이미 연금 수령 나이에 가까우니까 IRP를 경유할 필요가 없다는 취지이죠.</p>
      <p style={body}>퇴직금이 <strong>300만 원 이하</strong>인 경우, 근로자가 <strong>사망</strong>한 경우, 퇴직연금 <strong>담보대출 상계</strong>로 지급되는 경우 등도 예외에 해당해요.</p>
      <p style={body}>예외에 해당하면 회사에 일반 계좌 정보를 전달하세요. 자세한 내용은 <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 의무 예외</a> 글에서 확인할 수 있어요.</p>

      <Divider />
      <H2>IRP 의무를 어기면 어떻게 되나요?</H2>
      <p style={body}>의무를 어기는 주체는 <strong>회사</strong>예요. 회사가 IRP가 아닌 일반 계좌로 퇴직금을 지급하면 과태료가 부과될 수 있죠. 근로자에게 불이익은 없어요.</p>
      <p style={body}>근로자가 IRP를 만들지 않아서 회사가 퇴직금을 지급하지 못하는 경우도 있어요. 이때는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에서 근로자에게 IRP 개설을 권고하죠.</p>
      <p style={body}>퇴직 전에 IRP를 미리 만들어두면 이런 문제를 예방할 수 있어요. 모바일 앱으로 10분이면 개설이 끝나니까, 퇴직이 예정돼 있다면 서둘러 만드세요.</p>

      <Divider />
      <H2>의무 가입 외 추가 납입도 가능한가요?</H2>
      <p style={body}>가능해요. IRP에 연간 최대 <strong>900만 원</strong>까지 추가 납입할 수 있고, 이 금액에 대해 세액공제(13.2~16.5%)를 받을 수 있죠.</p>
      <p style={body}>퇴직금과 추가 납입금은 세금 체계가 달라요. 퇴직금은 퇴직소득세, 추가 납입금은 연금소득세(또는 기타소득세)가 적용되죠.</p>
      <p style={body}>추가 납입은 연말정산 절세 효과가 크니까, IRP를 유지할 계획이라면 적극 활용하세요. 12월 31일까지 납입하면 그해 연말정산에 반영돼요.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="IRP 의무 가입 대상이에요. 퇴직 전에 IRP를 개설해두세요." partialMatchText="예외에 해당할 수 있어요. 나이와 퇴직금 금액을 확인해보세요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 의무 가입에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
