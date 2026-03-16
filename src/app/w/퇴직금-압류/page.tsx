"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "채무(빚)가 있고 압류 통보를 받았어요" },
  { id: "c2", label: "퇴직금이 압류될까 걱정돼요" },
  { id: "c3", label: "IRP 계좌에 퇴직금이 들어 있어요" },
  { id: "c4", label: "압류 한도나 보호 방법이 궁금해요" },
];

const CHECKLIST = [
  "압류 통보 확인 — 법원 결정문 또는 채권자 통보 확인",
  "퇴직금 압류 한도 확인 — 1/2 초과 압류 금지 (민사집행법)",
  "IRP 계좌 상태 확인 — 압류 대상 여부 점검",
  "압류 금지 채권 신청 — 법원에 압류 범위 변경 신청",
  "법률 상담 — 대한법률구조공단(132) 무료 상담",
];

const FAQS = [
  {
    q: "퇴직금 전액이 압류될 수 있나요?",
    a: "전액은 안 돼요. 민사집행법에 따라 퇴직금의 1/2은 압류가 금지돼요. 나머지 1/2만 압류 대상이죠. 다만 퇴직금이 일반 통장에 입금되면 보호가 어려워질 수 있어요.",
  },
  {
    q: "IRP 계좌에 있는 퇴직금도 압류되나요?",
    a: "IRP 계좌는 퇴직연금 성격이라 일반 예금보다 보호를 받는 측면이 있어요. 다만 일시금으로 인출하는 시점에서는 압류가 가능할 수 있으니, 상황별로 법률 상담을 받으세요.",
  },
  {
    q: "회사에서 퇴직금을 줄 때 이미 압류가 걸려있으면 어떻게 되나요?",
    a: "채권자가 회사에 퇴직금 채권 압류를 걸면, 회사가 압류된 금액만큼 퇴직금 지급을 보류해요. 나머지 1/2은 근로자에게 지급하죠.",
  },
  {
    q: "압류 한도를 넘어서 압류됐다면 어떻게 하나요?",
    a: "법원에 '압류 범위 변경' 신청을 하세요. 1/2 초과 압류는 위법이니까 법원에서 바로잡아줘요. 대한법률구조공단(132)에서 무료 상담을 받을 수 있어요.",
  },
  {
    q: "세금 체납으로 인한 압류도 퇴직금 1/2 보호가 되나요?",
    a: "국세 체납에 의한 압류는 민사 압류와 기준이 다를 수 있어요. 국세징수법이 적용되는데, 최저 생계비 수준까지는 보호받을 수 있죠. 세무서에 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제246조 — 압류 금지 채권", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "근로기준법 제43조 — 임금 보호", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대한법률구조공단 — 무료 법률 상담", url: "https://www.klac.or.kr" },
      { label: "법원 전자소송 — 압류 관련 신청", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-가압류",
    title: "퇴직금 가압류",
    description: "소송 중 퇴직금을 보전하기 위한 가압류 제도를 안내해요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌",
    description: "IRP 계좌의 보호 기능과 활용법을 안내해요.",
  },
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법",
    description: "일시금과 연금 수령의 장단점을 비교해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-압류" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 압류 · 채권 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 압류,<br />
        빚이 있으면 퇴직금도 날아가나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;빚이 있는데, 퇴직금까지 압류당하면 어쩌죠?&rdquo;<br />
        퇴직금 전액이 압류되지는 않아요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따라 퇴직금의 <strong>1/2은 압류가 금지</strong>돼요.
        압류 한도, IRP 계좌 보호, 압류를 막거나 되찾는 방법을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금이 압류될 수 있나요?</H2>
      <p style={body}>
        채무가 있고 채권자가 법원에 압류 신청을 하면, 퇴직금도 압류 대상이 될 수 있어요. 퇴직금은 근로자의 재산이니까요. 다만 <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제246조</a>가 압류 한도를 제한하고 있죠.
      </p>
      <p style={body}>
        퇴직금의 <strong>1/2은 압류가 금지</strong>돼요. 채권자가 아무리 많은 빚을 받아야 해도 퇴직금 절반은 건드릴 수 없는 거죠. 이건 근로자의 최소 생활을 보장하기 위한 장치예요.
      </p>
      <p style={body}>
        다만 퇴직금이 일반 예금 통장에 입금된 후에는 이야기가 달라요. 통장에 들어온 돈은 &ldquo;퇴직금&rdquo;이 아니라 &ldquo;예금&rdquo;으로 간주되면서 전액 압류가 가능해질 수 있거든요. 그래서 퇴직금을 IRP 계좌에 두는 게 보호 측면에서 유리해요.
      </p>

      <GreenBox title="퇴직금 압류 핵심 규칙">
        <strong>압류 가능</strong>: 퇴직금의 1/2<br />
        <strong>압류 금지</strong>: 퇴직금의 1/2 (민사집행법 제246조)<br />
        <strong>주의</strong>: 일반 통장 입금 후에는 전액 압류 가능성 있음
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="압류 한도와 보호 방법을 파악해두세요. 필요하면 법률 상담(132)을 받으세요."
        partialMatchText="압류 우려가 있다면 IRP 계좌를 활용하고, 법률 상담을 미리 받아두세요."
      />

      <Divider />

      <H2>퇴직금 압류 한도가 있나요?</H2>
      <p style={body}>
        <strong>1/2 초과 압류는 금지</strong>돼요. 퇴직금이 3,000만 원이면 최대 1,500만 원까지만 압류할 수 있고, 나머지 1,500만 원은 근로자에게 돌아가야 하죠.
      </p>
      <p style={body}>
        다만 이 비율은 퇴직금이 &ldquo;퇴직금 채권&rdquo; 상태일 때 적용돼요. 회사에서 지급 전이거나 IRP에 있을 때죠. 일단 일반 통장으로 입금되면 &ldquo;예금 채권&rdquo;이 되면서 보호 범위가 달라질 수 있어요.
      </p>
      <p style={body}>
        2024년부터 <strong>압류 금지 최저 금액</strong>이 강화됐어요. 월 185만 원(2024년 기준, 매년 변동) 이하의 금액은 압류할 수 없죠. 퇴직금에서 이 기준이 정확히 어떻게 적용되는지는 법원 결정에 따라 달라질 수 있어요.
      </p>

      <BorderBox title="일반 통장 입금 후 보호 방법">
        퇴직금을 일반 통장으로 받은 뒤 압류가 걸리면 &ldquo;압류 금지 채권 범위 변경&rdquo;을 법원에 신청할 수 있어요.<br />
        &ldquo;이 돈은 퇴직금이었다&rdquo;는 걸 소명하면 1/2 보호를 받을 수 있죠.<br />
        퇴직금 입금 내역을 증빙으로 남겨두세요.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 계좌의 퇴직금도 압류되나요?</H2>
      <p style={body}>
        IRP 계좌는 퇴직연금 성격이라 일반 예금보다 <strong>보호를 더 받는 측면</strong>이 있어요. 근로자퇴직급여 보장법에서 퇴직연금 수급권의 양도·압류를 제한하는 규정이 있거든요.
      </p>
      <p style={body}>
        다만 IRP에서 일시금으로 인출하는 시점에서는 압류가 걸릴 수 있어요. &ldquo;IRP 안에 있으면 보호, 꺼내면 위험&rdquo;이라고 이해하면 돼요. 그래서 채무 문제가 있다면 IRP에 그대로 두고 연금으로 받는 게 보호에 유리하죠.
      </p>
      <p style={body}>
        구체적인 보호 범위는 법원 판례에 따라 달라질 수 있어요. 본인 상황이 복잡하다면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(132)에서 무료 법률 상담을 받아보세요.
      </p>

      <Divider />

      <H2>압류를 막을 수 있는 방법이 있나요?</H2>
      <p style={body}>
        압류 자체를 완전히 막을 수는 없어요. 법원 결정에 따라 진행되니까요. 대신 <strong>압류 범위를 줄이는 것</strong>은 가능해요. 법원에 &ldquo;압류 금지 채권 범위 변경&rdquo;을 신청하면 생계에 필요한 최소 금액을 보호받을 수 있죠.
      </p>
      <p style={body}>
        퇴직금을 IRP에 넣어두면 보호 범위가 넓어질 수 있어요. 일반 통장보다 IRP가 법적 보호를 더 받으니까요. 채무 문제가 있다면 퇴직금을 일반 통장으로 빼지 말고 IRP에 유지하세요.
      </p>
      <p style={body}>
        채무 조정 제도(개인회생, 파산)를 활용하는 것도 방법이에요. 개인회생을 신청하면 채무가 조정되면서 퇴직금 압류도 해제될 수 있죠. 법원이나 법률구조공단에서 자세한 상담을 받으세요.
      </p>

      <Divider />

      <H2>압류된 퇴직금을 되찾는 방법은?</H2>
      <p style={body}>
        1/2 초과 압류가 됐다면 법원에 <strong>이의 신청</strong>을 하세요. 민사집행법상 퇴직금의 1/2은 압류 금지 채권이니까, 초과 압류된 부분을 돌려받을 수 있어요.
      </p>
      <p style={body}>
        일반 통장에 입금된 후 전액이 압류됐다면 &ldquo;이 돈은 퇴직금이다&rdquo;라는 걸 소명해야 해요. 퇴직금 지급 내역서, 이직확인서, 급여 이체 기록 등을 증빙으로 제출하면 법원에서 보호 범위를 인정해줄 수 있죠.
      </p>
      <p style={body}>
        혼자 진행하기 어렵다면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(전화 132)에서 무료 법률 상담과 소송 대리를 받을 수 있어요. 소득이 일정 기준 이하면 비용 부담 없이 도움을 받을 수 있으니 꼭 활용하세요.
      </p>

      <SectionBadge>대응 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 압류에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법을 바탕으로 작성됐어요. 개인 상황에 따라 법률 적용이 달라질 수 있으니, 법률 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
