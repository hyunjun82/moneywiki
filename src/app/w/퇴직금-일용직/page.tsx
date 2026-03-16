"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [{ id: "c1", label: "같은 사업주 아래에서 1년 넘게 반복 근무했어요" },{ id: "c2", label: "주 평균 15시간 이상 일했어요" },{ id: "c3", label: "사업주의 지시·감독을 받으며 일했어요" },{ id: "c4", label: "퇴직일로부터 3년 이내예요" }];
const CHECKLIST = ["일당 지급 기록(이체·수기장부)","출근 기록(사진, 카톡)","근로계약서(있다면)","사업자등록번호·사업주 연락처","건설근로자공제회 가입 내역(건설직)"];
const FAQS = [{ q: "일용직이라 근로계약서를 안 썼어요.", a: "계약서가 없어도 일당 이체 기록, 카톡 대화 등으로 근로 사실을 증명하면 퇴직금 청구가 가능해요." },{ q: "여러 현장에서 일했는데 합산되나요?", a: "같은 사업주 소속이면 현장이 달라도 기간이 합산돼요." },{ q: "도급계약이라고 주장하면?", a: "실제로 지시·감독을 받으며 일했다면 근로자로 인정받을 수 있어요. 실질이 형식보다 우선하죠." },{ q: "퇴직금에 세금이 붙나요?", a: "퇴직소득세가 부과되지만, 근속연수가 길수록 세금이 줄어드는 구조예요." },{ q: "사업주가 폐업한 경우는?", a: "체당금 제도를 통해 정부에서 먼저 지급받을 수 있어요." }];
const REFERENCES = [{ category: "법령", items: [{ label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },{ label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" }] },{ category: "공식 자료", items: [{ label: "고용노동부", url: "https://www.moel.go.kr" },{ label: "건설근로자공제회", url: "https://www.cwma.or.kr" }] }];
const RELATED = [{ slug: "일용직-퇴직금", title: "일용직 퇴직금 받을 수 있는 조건", description: "일용직도 1년 이상 근무했다면 퇴직금을 받을 수 있어요." },{ slug: "일용직-퇴직금-지급기준", title: "일용직 퇴직금 지급 기준", description: "계속 근로 판단 기준을 정리했어요." },{ slug: "건설근로자-퇴직금", title: "건설 근로자 퇴직금", description: "건설근로자공제회 제도를 안내해요." }];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-일용직" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일용직 · 적용기준</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직금 일용직 적용 기준,<br />어떤 경우에 받을 수 있나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>일용직 근로자에게 퇴직금이 적용되는 기준이 궁금하죠? 핵심은 &ldquo;고용관계의 실질&rdquo;이에요. 매일 계약을 새로 맺는 형식이라도, 실제로 같은 사업주 밑에서 반복적으로 일했다면 퇴직금을 받을 수 있죠. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 적용 기준과 사업주의 편법에 대응하는 방법을 정리해드릴게요.</p>
      <Divider /><ArticleAd position="intro" />

      <H2>일용직 근로자에게 퇴직금이 적용되나요?</H2>
      <p style={body}>적용돼요. 근로자퇴직급여 보장법은 고용 형태를 구분하지 않아요. 일용직이라는 명칭은 급여 지급 방식일 뿐, 퇴직금 적용 여부를 결정하는 요소가 아니죠.</p>
      <p style={body}>적용 여부를 결정하는 건 &ldquo;1년 이상 계속 근로&rdquo;와 &ldquo;주 15시간 이상&rdquo; 두 가지예요. 이 조건을 충족하면 일용직이어도 사업주에게 퇴직금 지급 의무가 생기죠.</p>
      <p style={body}>대법원은 일관되게 &ldquo;계약의 형식이 아닌 근로의 실질로 판단해야 한다&rdquo;고 판시하고 있어요. 매일 새 계약서를 썼더라도 같은 곳에서 같은 일을 했다면 하나의 근로관계로 봐요.</p>
      <GreenBox title="적용 기준 요약">1. <strong>1년 이상</strong> 같은 사업주 밑에서 반복 근로<br />2. 주 평균 <strong>15시간 이상</strong><br />3. 계약 형식이 아닌 <strong>근로의 실질</strong>로 판단</GreenBox>
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="조건을 갖춘 상황이에요." partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담해보세요." />
      <Divider />

      <H2>어떤 경우 퇴직금 지급 의무가 생기나요?</H2>
      <p style={body}>같은 사업주가 반복적으로 불러서 일하게 한 경우가 대표적이에요. &ldquo;내일도 나오세요&rdquo;라는 지시가 계속됐다면 계속 근로로 인정받을 가능성이 높죠.</p>
      <p style={body}>출퇴근 시간이 정해져 있었거나, 사업주가 업무 내용을 지시했거나, 다른 곳에서 일할 자유가 제한됐다면 종속적 근로관계로 볼 수 있어요.</p>
      <p style={body}>반대로, 본인이 원할 때만 나가고 사업주의 지시를 받지 않는 완전한 자유계약 관계라면 퇴직금 적용이 어려워요.</p>
      <BorderBox title="편법 주의">일부 사업주가 퇴직금을 피하려고 11개월 30일에 &ldquo;계약 종료&rdquo;를 통보하는 경우가 있어요.<br />이건 탈법 행위로, 고용노동부에 진정하면 부당해고로 판단될 수 있죠.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />
      <Divider />

      <H2>일용직 퇴직금 계산 방법은?</H2>
      <p style={body}>계산법은 정규직과 동일해요. 퇴직 전 3개월간 받은 총 급여를 총 달력 일수로 나눈 것이 일 평균임금이고, 여기에 30을 곱하면 월 평균임금이 나오죠.</p>
      <p style={body}>평균임금이 통상임금보다 낮으면 통상임금으로 계산할 수 있어요. 일용직은 비수기에 일을 못 해서 평균임금이 떨어지는 경우가 많으니 두 금액을 비교해보세요.</p>
      <p style={body}>근무 일수 기록을 정확히 남겨두는 게 핵심이에요. 일당 지급 기록, 출근 사진, 카카오톡 대화 등이 증빙이 되죠.</p>
      <Divider />

      <H2>퇴직금 청구 방법과 소멸시효는?</H2>
      <p style={body}>사업주에게 서면(내용증명)으로 퇴직금 지급을 요청하고, 안 되면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 넣으세요.</p>
      <p style={body}>근로감독관이 사업주를 조사하고 시정 명령을 내려요. 이행하지 않으면 형사 처벌까지 갈 수 있죠.</p>
      <p style={body}>소멸시효는 <strong>퇴직일로부터 3년</strong>이에요. 기한을 넘기면 법적으로 청구할 수 없으니, 빠르게 대응하세요.</p>
      <SectionBadge>준비 서류</SectionBadge><Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} /><Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 관련 법령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
