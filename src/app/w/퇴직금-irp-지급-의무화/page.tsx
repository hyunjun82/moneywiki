"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, EligibilityChecker, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후에 퇴직했거나 퇴직 예정이에요" },
  { id: "c2", label: "IRP 지급 의무화 이전에는 일반 계좌 수령이 가능했어요" },
  { id: "c3", label: "의무화 이후에는 IRP로 지급하는 게 원칙이에요" },
  { id: "c4", label: "55세 이상, 300만 원 이하 등 예외가 있어요" },
];
const CHECKLIST = ["퇴직일 확인 — 2022년 4월 14일 이후인지 체크", "IRP 의무 대상 해당 여부 확인", "IRP 계좌 미리 개설", "회사에 계좌 정보 전달", "예외 해당 시 일반 계좌 정보 전달"];
const FAQS = [
  { q: "퇴직금 IRP 지급 의무화가 언제부터인가요?", a: "2022년 4월 14일부터 시행됐어요. 이날 이후 퇴직하는 근로자부터 적용되죠." },
  { q: "의무화 전후 차이는 뭔가요?", a: "의무화 전에는 퇴직금을 일반 계좌로 바로 받을 수 있었어요. 의무화 이후에는 원칙적으로 IRP를 거쳐야 하죠." },
  { q: "회사가 직접 계좌로 입금해주면 안 되나요?", a: "원칙적으로 안 돼요. 예외 조건(55세 이상, 300만 원 이하 등)에 해당하지 않으면 IRP로 지급해야 하죠." },
  { q: "IRP 의무화 예외 규정은?", a: "55세 이상, 퇴직금 300만 원 이하, 근로자 사망, 담보대출 상계 등이 예외예요." },
  { q: "의무화 위반 시 어떻게 되나요?", a: "회사가 IRP가 아닌 일반 계좌로 지급하면 과태료가 부과될 수 있어요. 근로자에게 불이익은 없죠." },
];
const REFERENCES = [
  { category: "법령", items: [{ label: "근로자퇴직급여 보장법 — IRP 지급 의무화", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" }] },
  { category: "공식 자료", items: [{ label: "고용노동부 — IRP 의무화 시행 안내", url: "https://www.moel.go.kr" }] },
];
const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무 가입 대상", description: "누가 IRP 의무 대상인지 정리했어요." },
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무 예외 조건", description: "IRP 없이 받을 수 있는 예외를 안내해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 안내", description: "IRP를 어디서 어떻게 만드는지 알려드려요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-지급-의무화" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무화</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직금 IRP 지급 의무화,<br />언제부터 어떻게 바뀌었나요?</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;예전에는 퇴직금을 통장으로 바로 받았는데, 이제 IRP가 필수라면서요?&rdquo;
        맞아요, <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a> 개정으로 2022년 4월 14일부터 퇴직금은 IRP로 지급하는 게 원칙이 됐어요.
        의무화 시행 시기, 전후 차이, 예외 규정, 위반 시 제재까지 정리해드릴게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>퇴직금 IRP 지급 의무화가 언제부터인가요?</H2>
      <p style={body}><strong>2022년 4월 14일</strong>부터 시행됐어요. 이날 이후 퇴직하는 근로자부터 퇴직금을 IRP 계좌로 지급해야 하죠.</p>
      <p style={body}>법 개정 취지는 근로자의 노후 자금을 보호하기 위해서예요. 퇴직금을 일시금으로 바로 써버리는 대신 IRP에 넣어두면 연금으로 활용할 수 있으니까요.</p>
      <p style={body}>의무화 이전에 퇴직한 사람에게는 소급 적용되지 않아요. 2022년 4월 13일 이전에 퇴직했다면 기존대로 일반 계좌로 받은 게 문제없죠.</p>
      <GreenBox title="시행 시기">2022년 4월 14일 이후 퇴직자 → IRP 의무<br />2022년 4월 13일 이전 퇴직자 → 기존 방식 유지</GreenBox>

      <Divider />
      <H2>의무화 전후 차이는 뭔가요?</H2>
      <p style={body}>의무화 전에는 퇴직금을 <strong>일반 계좌</strong>로 바로 받을 수 있었어요. IRP는 선택 사항이었죠. 퇴직금을 바로 쓰거나 저축하거나 자유롭게 선택할 수 있었어요.</p>
      <p style={body}>의무화 이후에는 퇴직금이 <strong>IRP로 먼저 입금</strong>돼요. 바로 쓰고 싶으면 IRP를 해지해서 일시금으로 꺼내야 하죠. 한 단계가 추가된 셈이에요.</p>
      <p style={body}>실질적으로는 IRP 해지가 앱으로 2~3분이면 끝나니까, 큰 불편은 아니에요. 오히려 연금 수령을 선택하면 세금을 30~40% 줄일 수 있어서 유리한 면도 있죠.</p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} /><ArticleAd position="mid" />

      <Divider />
      <H2>회사가 직접 계좌로 입금해주면 안 되나요?</H2>
      <p style={body}>예외 조건에 해당하지 않으면 <strong>안 돼요</strong>. 회사는 퇴직금을 IRP로 지급해야 하고, 일반 계좌로 보내면 과태료 대상이 될 수 있죠.</p>
      <p style={body}>근로자가 IRP를 만들지 않아서 지급이 안 되는 경우에도 회사가 임의로 일반 계좌에 보내면 안 돼요. 근로자에게 IRP 개설을 요청하고, 개설될 때까지 기다려야 하죠.</p>
      <p style={body}>다만 이 때문에 14일 지급 기한을 넘기면 지연이자 문제가 생길 수 있으니, 퇴직 전에 IRP를 미리 만들어두는 게 모두에게 편해요.</p>

      <Divider />
      <H2>IRP 의무화 예외 규정은?</H2>
      <p style={body}>55세 이상, 퇴직금 300만 원 이하, 근로자 사망, 담보대출 상계 등이 예외예요. 이 경우에는 일반 계좌로 직접 받을 수 있죠.</p>
      <p style={body}>예외 조건은 <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 의무 예외</a> 글에서 더 자세히 다뤘어요. 본인이 해당하는지 꼭 확인해보세요.</p>
      <p style={body}>예외에 해당하더라도 자발적으로 IRP를 선택할 수 있어요. 세금 유예와 연금 수령 혜택을 원한다면 IRP가 유리하니까요.</p>

      <Divider />
      <H2>의무화 위반 시 어떻게 되나요?</H2>
      <p style={body}>위반하는 주체는 <strong>회사(사업주)</strong>예요. IRP가 아닌 일반 계좌로 퇴직금을 지급하면 과태료가 부과될 수 있죠. 근로자에게 불이익은 없어요.</p>
      <p style={body}>과태료는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>가 감독하고 부과해요. 다만 근로자가 IRP를 개설하지 않아서 지급이 지연된 경우에는 회사의 책임이 아니라고 볼 수 있죠.</p>
      <p style={body}>퇴직 전에 IRP를 미리 만들어두면 회사도 근로자도 번거로움을 피할 수 있어요. 모바일 앱으로 10분이면 끝나니까, 퇴직이 예정돼 있다면 서둘러 개설하세요.</p>

      <SectionBadge>체크리스트</SectionBadge><Checklist items={CHECKLIST} />
      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="IRP 의무화 내용을 잘 파악하고 계시네요. 퇴직 전에 IRP를 준비해두세요." partialMatchText="일부 항목을 더 확인해보세요. 예외 해당 여부가 중요해요." />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 지급 의무화에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
