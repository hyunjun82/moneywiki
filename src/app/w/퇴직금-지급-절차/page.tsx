"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴사일이 확정되고 인사팀에 퇴직 의사를 전달했어요" },
  { id: "c2", label: "IRP 계좌를 개설했거나 예외 대상인지 확인했어요" },
  { id: "c3", label: "퇴직소득원천징수영수증을 받을 준비가 돼 있어요" },
  { id: "c4", label: "퇴직금 지급 기한(14일)을 알고 있어요" },
];

const CHECKLIST = [
  "퇴직원 제출 — 퇴사 의사를 서면으로 전달",
  "IRP 계좌 정보 제공 — 회사에 계좌번호 전달",
  "퇴직소득원천징수영수증 수령 — 세금 내역 확인",
  "퇴직금 입금 확인 — 14일 이내 입금 여부 체크",
  "미입금 시 대응 — 고용노동부(1350) 신고 준비",
];

const FAQS = [
  {
    q: "퇴직금은 퇴사 후 며칠이면 들어오나요?",
    a: "법적으로 퇴사일로부터 14일 이내에 지급해야 해요. 대부분의 회사는 급여일에 맞춰 처리하기도 하지만, 14일이 법정 기한이죠.",
  },
  {
    q: "회사가 퇴직금 계산을 잘못하면 어떻게 되나요?",
    a: "퇴직소득원천징수영수증을 받아서 직접 확인해보세요. 계산이 틀렸다면 회사에 정정을 요청하고, 안 되면 고용노동부에 진정을 넣을 수 있어요.",
  },
  {
    q: "퇴직금을 분할로 달라고 할 수 있나요?",
    a: "원칙적으로 퇴직금은 일시에 지급하는 게 맞아요. 회사가 분할 지급을 요청하면 동의 여부는 근로자에게 있죠. 동의하지 않아도 불이익은 없어요.",
  },
  {
    q: "IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "55세 이상이거나 퇴직금이 300만 원 이하면 일반 계좌로 받을 수 있어요. 그 외에는 IRP가 필요하니 퇴직 전에 개설해두세요.",
  },
  {
    q: "퇴직금 지급 절차 중 문제가 생기면 어디에 문의하나요?",
    a: "고용노동부 상담센터(1350)에 전화하면 무료 상담을 받을 수 있어요. 온라인으로는 고용노동부 민원마당에서 진정서를 접수할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 절차 및 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 — 금품 청산 의무(제36조)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법별 비교",
    description: "일시금과 IRP, 어떤 수령 방법이 유리한지 비교했어요.",
  },
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "14일 안에 안 들어오면 지연이자까지 청구할 수 있어요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설과 활용",
    description: "IRP 계좌가 왜 필요한지, 어디서 만드는지 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-지급-절차"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급절차 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 절차,<br />
        퇴사 후 어떻게 진행되나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴사하면 퇴직금이 알아서 들어오나요?&rdquo; 그렇지 않아요.
        회사가 해야 할 일이 있고, 퇴직자 본인이 준비해야 할 것도 있죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따른 지급 절차를 단계별로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 지급 절차가 어떻게 되나요?</H2>
      <p style={body}>
        절차는 크게 4단계예요. 먼저 근로자가 <strong>퇴직 의사를 전달</strong>하면, 회사 인사팀이 퇴직금을 산정하죠. 그다음 근로자의 <strong>IRP 계좌 정보</strong>를 받아 입금하고, 마지막으로 <strong>퇴직소득원천징수영수증</strong>을 발급해요.
      </p>
      <p style={body}>
        퇴직금 산정은 퇴직 전 3개월 평균임금과 근속연수를 기준으로 해요. 회사마다 인사시스템에서 자동 계산되는 경우가 많지만, 본인이 직접 검산해보는 게 좋죠. 상여금이나 연차수당이 빠져 있는 경우가 종종 있거든요.
      </p>
      <p style={body}>
        법적 지급 기한은 퇴사일로부터 <strong>14일</strong>이에요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>에 따라 퇴직 시 금품은 14일 이내에 청산해야 하죠. 이 기한을 넘기면 연 20% 지연이자가 붙어요.
      </p>

      <GreenBox title="지급 절차 4단계">
        1단계: 근로자 퇴직 의사 전달 (퇴직원 제출)<br />
        2단계: 회사 인사팀 퇴직금 산정<br />
        3단계: IRP 계좌로 입금 (또는 일반 계좌)<br />
        4단계: 퇴직소득원천징수영수증 발급
      </GreenBox>

      <Divider />

      <H2>회사가 먼저 해야 할 것들은?</H2>
      <p style={body}>
        회사는 퇴직금 산정부터 시작해요. 퇴직 전 3개월 평균임금에 근속연수를 곱해서 금액을 정하죠. DB형 퇴직연금 가입 회사라면 퇴직연금 운용사(은행·증권사)에 지급 요청을 해야 하고, DC형이라면 이미 적립된 금액이 근로자 계좌에 있어요.
      </p>
      <p style={body}>
        퇴직소득세를 원천징수한 뒤 IRP 계좌로 송금하는 것까지가 회사의 의무예요. IRP로 보내는 경우에는 세금이 유예되니까, 실제로는 퇴직금 전액이 IRP에 입금되죠.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증 발급도 회사의 의무예요. 이 서류가 있어야 근로자가 세금 내역을 확인할 수 있고, 나중에 연금 수령이나 환급 신청 시 필요하죠.
      </p>

      <BorderBox title="DC형 가입자는 절차가 다를 수 있어요">
        DC형 퇴직연금 가입자는 회사가 매년 적립한 금액이 이미 본인 계좌에 있어요.<br />
        퇴직 시 별도 산정 없이 적립금 + 운용수익을 수령하게 되죠.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직자가 준비해야 할 것들은?</H2>
      <p style={body}>
        가장 먼저 할 일은 <strong>IRP 계좌 개설</strong>이에요. 퇴직 전에 미리 만들어두면 회사가 바로 입금할 수 있어서 지급이 빨라지죠. 은행, 증권사, 보험사 어디서든 모바일로 10분이면 개설이 끝나요.
      </p>
      <p style={body}>
        IRP 계좌 정보(은행명, 계좌번호)를 회사 인사팀에 전달하세요. 55세 이상이거나 퇴직금이 300만 원 이하면 일반 계좌 정보를 주면 돼요. 어떤 방식인지 회사에 먼저 물어보는 게 좋죠.
      </p>
      <p style={body}>
        입금 후에는 퇴직소득원천징수영수증을 꼭 받아서 보관하세요. 금액이 맞는지, 세금 계산이 정확한지 직접 확인해야 해요. 이상이 있으면 바로 인사팀에 문의하고, 정정이 안 되면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 상담받으세요.
      </p>

      <SectionBadge>절차별 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>IRP 계좌로 지급받을 때 절차는?</H2>
      <p style={body}>
        회사가 퇴직연금 운용사에 지급 지시를 하면, 운용사가 근로자의 IRP 계좌로 입금해요. DB형은 운용사가 적립금에서 퇴직금을 계산해 지급하고, DC형은 이미 적립된 금액을 그대로 이전하는 방식이죠.
      </p>
      <p style={body}>
        IRP에 입금된 뒤에는 본인이 선택할 차례예요. 바로 해지해서 일시금으로 꺼내거나, 그대로 유지하면서 운용할 수 있죠. <a href="/w/퇴직금-IRP-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 수령 방법</a>은 별도 글에서 자세히 다뤘어요.
      </p>
      <p style={body}>
        퇴직연금에 가입하지 않은 회사(퇴직금 제도만 운영)라면 회사가 직접 IRP 계좌로 송금해요. 이때 퇴직소득세는 유예되고, 인출 시점에 정산되죠.
      </p>

      <Divider />

      <H2>절차 중 문제가 생기면 어떻게 하나요?</H2>
      <p style={body}>
        14일이 지나도 퇴직금이 안 들어오면 먼저 회사에 서면으로 지급을 요청하세요. 내용증명을 보내면 법적 효력이 생기죠. 그래도 안 되면 관할 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 지방관서에 임금체불 진정을 넣을 수 있어요.
      </p>
      <p style={body}>
        퇴직금 금액이 예상보다 적다면 퇴직소득원천징수영수증의 산정 내역을 확인하세요. 상여금, 연차수당, 식대 등이 평균임금에서 빠져 있는지 꼼꼼히 살펴봐야 해요. 계산 착오라면 정정 요청이 가능하죠.
      </p>
      <p style={body}>
        회사가 폐업했거나 연락이 안 되는 경우에는 <strong>체당금 제도</strong>를 활용할 수 있어요. 고용노동부에 도산 인정을 받으면 정부가 퇴직금을 대신 지급하는 제도죠. 상한액이 정해져 있지만, 전혀 못 받는 것보다는 훨씬 나아요.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 지급 절차 준비가 잘 돼 있네요. 14일 이내 입금 여부만 확인하면 돼요."
        partialMatchText="아직 준비가 덜 된 부분이 있어요. 위 항목을 하나씩 확인해보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 절차에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
