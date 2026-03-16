"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업주 아래에서 1년 넘게 일했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무했어요" },
  { id: "c3", label: "일당 지급 기록이나 출근 증빙이 남아 있어요" },
  { id: "c4", label: "퇴직일로부터 3년 이내예요" },
];
const CHECKLIST = ["일당 지급 기록 — 평균임금 산정용","출근 기록(사진, 카톡, 출입카드) — 계속 근로 증빙","근로계약서 — 근무 조건 확인","사업주 연락처·사업자등록번호 — 신고 시 필수","4대보험 가입 이력 — 근로 기간 증빙"];
const FAQS = [
  { q: "일용직인데 근로계약서가 없어요.", a: "근로계약서가 없어도 일당 지급 기록, 출근 사진, 카톡 대화 등으로 근로 사실을 증명할 수 있어요." },
  { q: "사업주가 '일용직은 해당 안 된다'고 해요.", a: "법적 근거가 없는 주장이에요. 1년 이상 주 15시간 이상 근무했다면 일용직도 퇴직금 대상이죠." },
  { q: "여러 현장에서 같은 회사 소속으로 일했는데 합산 되나요?", a: "같은 사업주(회사) 소속이면 현장이 달라도 기간이 합산돼요." },
  { q: "일용직 퇴직금은 대략 얼마나 되나요?", a: "퇴직 전 3개월 평균임금 x 근속연수로 계산해요. 일당 15만 원, 3년 근무 시 약 500만 원 전후죠." },
  { q: "사업주가 폐업했는데 퇴직금을 받을 수 있나요?", a: "체당금 제도를 통해 받을 수 있어요. 고용노동부에 체당금 신청을 하면 되죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },{ label: "근로기준법 — 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — 일용직 근로자 권익", url: "https://www.moel.go.kr" },{ label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" }] },
];
const RELATED = [
  { slug: "일용직-퇴직금", title: "일용직 퇴직금 받을 수 있는 조건", description: "일용직도 1년 이상 근무했다면 퇴직금을 받을 수 있어요." },
  { slug: "퇴직금-일용직", title: "퇴직금 일용직 적용 기준", description: "일용직 근로자에게 퇴직금이 적용되는 경우를 정리했어요." },
  { slug: "건설근로자-퇴직금", title: "건설 근로자 퇴직금", description: "건설근로자공제회 제도와 수령법을 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="일용직-퇴직금-지급기준" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 지급기준</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>일용직 퇴직금 지급 기준,<br />어떻게 판단하나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>일용직 퇴직금 지급 기준은 &ldquo;계속 근로&rdquo; 여부로 판단해요. 매일 출근하지 않더라도 같은 사업주 아래에서 반복적으로 일했다면 1년 이상 계속 근로로 인정될 수 있죠. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 기준과 판단 방법, 사업주 거부 시 대응법까지 정리해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>일용직 퇴직금 지급 기준이 뭔가요?</H2>
      <p style={body}>기준은 다른 근로자와 같아요. 같은 사업장에서 <strong>1년 이상 계속 근로</strong>하고, 주 평균 <strong>15시간 이상</strong> 일했으면 퇴직금 지급 의무가 생기죠. 일용직이라는 이유로 기준이 달라지는 건 없어요.</p>
      <p style={body}>&ldquo;계속 근로&rdquo; 판단이 일용직에서 가장 중요한 쟁점이에요. 매일 출근하지 않아도, 같은 사업주가 반복적으로 불러서 일했다면 고용관계가 지속된 것으로 볼 수 있죠.</p>
      <p style={body}>일용근로자라는 명칭 때문에 매일 새로운 계약이라고 오해하기 쉬운데, 실질적으로 같은 곳에서 반복 근무했다면 형식과 관계없이 계속 근로로 인정받을 수 있어요.</p>
      <GreenBox title="지급 기준 요약">1. 같은 사업주 아래 <strong>1년 이상</strong> 반복 근로<br />2. 주 평균 <strong>15시간 이상</strong><br />3. &ldquo;계속 근로&rdquo;는 고용의 실질로 판단</GreenBox>
      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="조건을 갖춘 상황이에요." partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담해보세요." />
      <Divider />

      <H2>간헐적으로 일해도 퇴직금이 생기나요?</H2>
      <p style={body}>생길 수 있어요. 매일 출근하지 않더라도 &ldquo;필요할 때 불러서 일하는&rdquo; 패턴이 1년 이상 반복됐다면 계속 근로로 인정될 가능성이 높죠.</p>
      <p style={body}>판단 기준으로는 사업주의 지시를 받았는지, 출퇴근 시간이 정해져 있었는지, 다른 곳에서 일할 자유가 있었는지 등을 종합적으로 봐요.</p>
      <p style={body}>증빙이 핵심이에요. 사업주가 보낸 출근 요청 문자, 일당 이체 기록, 현장 출입 기록 등을 최대한 모아두세요.</p>
      <BorderBox title="인력사무소를 통해 일했다면">인력사무소에서 파견한 경우, 실제 지시·감독한 쪽이 사업주로 인정될 수 있어요.<br />누가 일을 지시하고 급여를 줬는지가 퇴직금 청구 대상을 결정하죠.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />
      <Divider />

      <H2>계속 근로 여부는 어떻게 판단하나요?</H2>
      <p style={body}>고용노동부와 법원은 &ldquo;근로 제공의 계속성&rdquo;을 기준으로 봐요. 구체적으로는 사업주가 반복적으로 출근을 요청했는지, 정해진 장소·시간에 일했는지, 사업주의 지시·감독을 받았는지를 종합 판단하죠.</p>
      <p style={body}>공백 기간이 있어도 &ldquo;고용관계가 유지됐다&rdquo;고 볼 수 있어요. 비가 와서 일주일 못 나갔거나 물량이 없어서 보름간 쉬었더라도 다시 복귀할 것이 예정돼 있었다면 계속 근로에 해당하죠.</p>
      <p style={body}>반대로 사업주와의 관계가 완전히 끊어진 후 우연히 다시 일하게 된 거라면 별도 근로관계로 봐요. 이 경우 이전 기간은 합산되지 않죠.</p>
      <Divider />

      <H2>일용직 퇴직금 신고 방법은?</H2>
      <p style={body}>사업주가 퇴직금 지급을 거부하면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣으세요. 온라인(민원마당)이나 관할 고용노동지청 방문으로 접수할 수 있어요.</p>
      <p style={body}>근로감독관이 사업주를 조사해서 시정 명령을 내려요. 이행하지 않으면 형사 처벌(3년 이하 징역/3,000만 원 이하 벌금)까지 갈 수 있죠.</p>
      <p style={body}>소멸시효는 <strong>퇴직일로부터 3년</strong>이에요. 현장을 옮기면서 이전 퇴직금을 놓치는 경우가 많으니, 현장이 끝날 때마다 정산 여부를 확인하세요.</p>
      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>일용직 퇴직금 지급 기준에 대해 자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 관련 법령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
