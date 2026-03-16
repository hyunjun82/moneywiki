"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 IRP 계좌로 입금됐어요" },
  { id: "c2", label: "IRP에 추가 납입하면 세액공제를 받을 수 있어요" },
  { id: "c3", label: "연간 900만 원까지 납입하면 최대 148.5만 원 환급이 가능해요" },
  { id: "c4", label: "연금 수령 시 퇴직소득세가 30~40% 줄어드는 걸 알고 있어요" },
];

const CHECKLIST = [
  "IRP 이전 완료 확인 — 퇴직금 입금 여부 체크",
  "추가 납입 한도 확인 — 연간 900만 원(연금저축 포함)",
  "세액공제율 확인 — 총급여 5,500만 원 기준 16.5% 또는 13.2%",
  "운용 상품 선택 — 원금보장형 or 투자형",
  "연말정산 시 공제 반영 여부 확인",
];

const FAQS = [
  {
    q: "퇴직금을 IRP로 이전하면 뭐가 좋은가요?",
    a: "퇴직소득세가 유예되고, 연금으로 받으면 세금이 30~40% 줄어요. 추가 납입 시 세액공제까지 받을 수 있죠.",
  },
  {
    q: "IRP 의무 가입 대상은 누구인가요?",
    a: "2022년 4월 이후 퇴직하는 근로자 중 55세 미만이면서 퇴직금이 300만 원을 초과하는 경우 IRP 가입이 의무예요.",
  },
  {
    q: "IRP로 이전 시 세액공제 혜택이 있나요?",
    a: "퇴직금 자체는 세액공제 대상이 아니에요. 하지만 IRP에 추가 납입하면 연간 900만 원까지 세액공제(13.2~16.5%)를 받을 수 있죠.",
  },
  {
    q: "IRP 이전 절차는 어떻게 되나요?",
    a: "별도로 이전 신청할 필요 없이, 회사가 퇴직연금 운용사에 지급 지시를 하면 IRP로 자동 입금돼요.",
  },
  {
    q: "IRP 세액공제 시 주의할 점은?",
    a: "세액공제 받은 금액을 55세 전에 인출하면 기타소득세(16.5%)가 부과돼요. 장기 유지가 전제조건이죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 — IRP 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "근로자퇴직급여 보장법 — IRP 이전 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 연말정산 세액공제 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-이체-세금",
    title: "퇴직금 IRP 이체 시 세금 처리",
    description: "IRP 이체와 인출 시 세금이 어떻게 달라지는지 정리했어요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 세금 줄이는 IRP 활용법",
    description: "IRP와 연말정산을 활용한 절세 방법을 안내해요.",
  },
  {
    slug: "퇴직금-irp-의무",
    title: "퇴직금 IRP 의무 가입 대상",
    description: "IRP 의무 가입이 누구에게 적용되는지 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-이전-의무가입-세액공제-혜택" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 이전과 세액공제,<br />
        어떻게 활용하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 IRP에 넣으면 세금 혜택이 있다던데, 어떻게 활용하나요?&rdquo;
        IRP로 이전하면 퇴직소득세가 유예되고, 추가 납입 시 연말정산에서 세액공제까지 받을 수 있어요.
        이전 절차, 세액공제 한도, 주의할 점까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 IRP로 이전하면 뭐가 좋은가요?</H2>
      <p style={body}>
        가장 큰 장점은 <strong>퇴직소득세 유예</strong>예요. IRP에 입금되는 시점에는 세금이 빠지지 않고, 나중에 인출할 때 정산되죠. 연금으로 나눠 받으면 세금의 60~70%만 내면 돼요.
      </p>
      <p style={body}>
        두 번째 장점은 <strong>추가 납입 시 세액공제</strong>예요. IRP에 연간 최대 900만 원(연금저축 포함)까지 추가 납입하면, <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 13.2~16.5%의 세액공제를 받을 수 있죠.
      </p>
      <p style={body}>
        세 번째는 <strong>운용 수익</strong>이에요. IRP에 넣어둔 돈으로 예금, 펀드, ETF 등에 투자할 수 있어서 추가 수익을 기대할 수 있죠. 세금 혜택과 운용 수익을 동시에 노릴 수 있는 게 IRP의 매력이에요.
      </p>

      <GreenBox title="IRP 이전의 3가지 혜택">
        1. 퇴직소득세 유예 → 연금 수령 시 30~40% 절감<br />
        2. 추가 납입 세액공제 → 연간 최대 148.5만 원 환급<br />
        3. 운용 수익 → 예금, 펀드, ETF 투자 가능
      </GreenBox>

      <Divider />

      <H2>IRP 의무 가입 대상은 누구인가요?</H2>
      <p style={body}>
        2022년 4월 이후 퇴직하는 근로자 중 <strong>55세 미만</strong>이면서 퇴직금이 <strong>300만 원 초과</strong>인 경우 IRP 가입이 의무예요. 대부분의 퇴직자가 해당되죠.
      </p>
      <p style={body}>
        55세 이상이거나 퇴직금이 300만 원 이하면 예외예요. 일반 계좌로 직접 받을 수 있죠. <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>예외 조건</a>에 해당하는지 먼저 확인해보세요.
      </p>
      <p style={body}>
        의무 가입이라고 해서 IRP를 계속 유지해야 하는 건 아니에요. 입금 후 바로 해지해서 일시금으로 꺼내는 것도 가능하죠. 다만 해지하면 세금 유예 혜택이 사라져요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP로 이전 시 세액공제 혜택이 있나요?</H2>
      <p style={body}>
        퇴직금 자체는 세액공제 대상이 <strong>아니에요</strong>. 퇴직금은 이미 세금 유예를 받고 있으니까요. 세액공제는 IRP에 <strong>추가로 납입</strong>한 금액에만 적용되죠.
      </p>
      <p style={body}>
        추가 납입 한도는 연간 <strong>900만 원</strong>(연금저축계좌 납입분 포함)이에요. 총급여 5,500만 원 이하라면 16.5%, 초과하면 13.2%의 세액공제를 받을 수 있죠. 최대 환급액은 148.5만 원이에요.
      </p>
      <p style={body}>
        세액공제를 받으려면 12월 31일까지 납입을 완료해야 해요. <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 연말정산 간소화 서비스에서 납입 내역이 자동으로 반영되니까 별도 신고는 필요 없죠.
      </p>

      <Divider />

      <H2>IRP 이전 절차는 어떻게 되나요?</H2>
      <p style={body}>
        별도로 &ldquo;이전 신청&rdquo;을 할 필요가 없어요. 회사가 퇴직연금 운용사에 지급 지시를 내리면, 운용사가 근로자의 IRP 계좌로 자동 입금하는 구조죠.
      </p>
      <p style={body}>
        근로자가 할 일은 IRP 계좌를 미리 개설하고, 계좌 정보(은행명, 계좌번호)를 회사에 전달하는 것뿐이에요. 퇴직 전에 해두면 지급이 빨라지죠.
      </p>
      <p style={body}>
        다른 금융사의 IRP로 옮기고 싶다면 &ldquo;계좌이체&rdquo;를 신청하면 돼요. 기존 IRP에서 새 IRP로 적립금을 이전할 수 있고, 이때 세금은 발생하지 않아요.
      </p>

      <Divider />

      <H2>IRP 세액공제 시 주의할 점은?</H2>
      <p style={body}>
        세액공제 받은 금액을 <strong>55세 전에 인출</strong>하면 기타소득세(16.5%)가 부과돼요. 공제받은 혜택을 토해내는 셈이죠. 장기 유지가 전제조건이에요.
      </p>
      <p style={body}>
        퇴직금과 추가 납입금은 <strong>세금 체계가 달라요</strong>. 퇴직금은 퇴직소득세, 추가 납입금은 연금소득세(또는 기타소득세)가 적용되죠. 해지 시 각각 따로 정산되니까 금액 구성을 미리 파악해두세요.
      </p>
      <p style={body}>
        납입 한도를 초과하면 세액공제가 안 되니까 주의하세요. 연금저축계좌와 IRP 납입액을 합산해서 900만 원을 넘지 않도록 관리해야 하죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 이전과 세액공제 혜택을 잘 파악하고 계시네요. 추가 납입까지 활용하면 절세 효과가 커져요."
        partialMatchText="확인이 필요한 항목이 있어요. 세액공제 한도와 인출 시 세금을 먼저 파악하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>IRP 이전과 세액공제에 관해 자주 나오는 질문을 정리했어요.</p>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 국세청(nts.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
