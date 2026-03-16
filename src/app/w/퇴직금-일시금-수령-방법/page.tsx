"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "55세 이상이거나 퇴직금이 300만 원 이하예요" },
  { id: "c2", label: "IRP에 입금된 퇴직금을 바로 인출하려고 해요" },
  { id: "c3", label: "일시금 수령 시 퇴직소득세가 전액 부과되는 걸 알고 있어요" },
  { id: "c4", label: "당장 목돈이 필요한 상황이에요" },
];

const CHECKLIST = [
  "IRP 의무 예외 해당 여부 확인 — 55세 이상, 300만 원 이하 등",
  "IRP 해지 신청 — 은행·증권사 앱 또는 영업점 방문",
  "퇴직소득원천징수영수증 확인 — 세금 내역 점검",
  "수령 계좌 지정 — 일반 입출금 계좌 준비",
  "세금 정산 확인 — 해지 시 퇴직소득세 원천징수 완료 여부",
];

const FAQS = [
  {
    q: "퇴직금을 일시금으로 받으려면 어떻게 하나요?",
    a: "IRP에 입금된 퇴직금을 해지 신청하면 일시금으로 받을 수 있어요. 55세 이상이거나 300만 원 이하면 처음부터 일반 계좌로 받을 수 있죠.",
  },
  {
    q: "IRP 해지하면 세금을 더 내야 하나요?",
    a: "퇴직금 부분만 인출하면 퇴직소득세만 부과돼요. IRP에 추가로 넣은 세액공제 받은 금액까지 같이 빼면 기타소득세(16.5%)가 추가로 붙을 수 있죠.",
  },
  {
    q: "IRP 해지 후 얼마 만에 입금되나요?",
    a: "보통 2~3영업일이면 지정한 계좌로 입금돼요. 증권사는 당일 처리되는 경우도 있죠.",
  },
  {
    q: "일시금과 연금, 세금 차이가 얼마나 되나요?",
    a: "일시금은 퇴직소득세 전액, 연금은 퇴직소득세의 60~70%만 부담해요. 수령 기간이 10년을 넘기면 세금이 더 줄어들죠.",
  },
  {
    q: "일시금 수령 후 다시 IRP에 넣을 수 있나요?",
    a: "일단 해지해서 꺼낸 퇴직금을 다시 IRP에 넣으면 '추가 납입'으로 처리돼요. 세액공제 혜택은 받을 수 있지만, 퇴직소득세 유예 효과는 사라지죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 의무 및 예외 조건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 — 퇴직소득세 계산", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-수령방법",
    title: "퇴직금 수령 방법 비교",
    description: "일시금과 IRP, 어떤 방법이 유리한지 비교했어요.",
  },
  {
    slug: "퇴직금-일시금-세금",
    title: "퇴직금 일시금 세금 계산",
    description: "일시금으로 받을 때 세금이 얼마나 나오는지 정리했어요.",
  },
  {
    slug: "퇴직금-irp-의무-예외",
    title: "퇴직금 IRP 의무 예외 조건",
    description: "IRP 없이 바로 받을 수 있는 예외 조건을 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-일시금-수령-방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금 수령,<br />
        어떻게 신청하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 한 번에 받고 싶은데, IRP에 넣어야 한다면서요?&rdquo;
        맞아요, 2022년 4월부터 퇴직금은 원칙적으로 IRP로 입금돼요. 하지만 IRP에 들어간 뒤 바로 해지하면 일시금으로 꺼낼 수 있고, 예외 조건에 해당하면 처음부터 일반 계좌로 받을 수 있죠.
        일시금 수령 방법, 세금 처리, 주의할 점을 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금을 일시금으로 받으려면 어떻게 하나요?</H2>
      <p style={body}>
        방법은 두 가지예요. 첫째, IRP에 입금된 퇴직금을 <strong>해지 신청</strong>해서 꺼내는 방법이죠. 퇴직 사유로 입금된 금액은 전액 인출이 가능하니까, IRP를 해지하면 2~3영업일 내에 일반 계좌로 입금돼요.
      </p>
      <p style={body}>
        둘째, <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 <strong>예외 조건</strong>에 해당하면 처음부터 일반 계좌로 받을 수 있어요. 55세 이상인 경우, 퇴직금이 300만 원 이하인 경우가 대표적이죠.
      </p>
      <p style={body}>
        IRP 해지는 은행·증권사 모바일 앱에서 직접 할 수 있어요. &ldquo;퇴직금 인출&rdquo; 또는 &ldquo;IRP 해지&rdquo; 메뉴를 찾으면 되고, 영업점에 방문해도 되죠. 해지 시 퇴직소득세가 원천징수된 후 나머지가 입금돼요.
      </p>

      <GreenBox title="일시금 수령 조건">
        IRP 해지 인출 → 누구나 가능 (퇴직 사유 입금분 전액)<br />
        일반 계좌 직접 수령 → 55세 이상 또는 300만 원 이하
      </GreenBox>

      <Divider />

      <H2>IRP 의무 가입 예외가 있나요?</H2>
      <p style={body}>
        <strong>55세 이상</strong>인 근로자는 IRP 없이 일반 계좌로 퇴직금을 받을 수 있어요. 이미 연금 수령 나이에 가까우니까 IRP를 경유할 필요가 없다는 취지죠.
      </p>
      <p style={body}>
        퇴직금이 <strong>300만 원 이하</strong>인 경우도 예외예요. 소액 퇴직금까지 IRP에 넣으면 오히려 번거로우니까요. 이 외에 근로자가 사망한 경우, 퇴직연금 적립금이 담보대출로 상계된 경우 등도 예외에 해당하죠.
      </p>
      <p style={body}>
        예외에 해당하면 회사에 일반 계좌 정보를 알려주세요. 회사가 퇴직소득세를 원천징수한 뒤 나머지 금액을 바로 송금해요. 자세한 <a href="/w/퇴직금-irp-의무-예외" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 의무 예외 조건</a>은 별도 글에서 다뤘어요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>일시금 수령 시 세금 처리는?</H2>
      <p style={body}>
        일시금으로 받으면 <strong>퇴직소득세</strong>가 전액 부과돼요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 근속연수와 퇴직금 총액을 기준으로 세금이 결정되죠. 근속연수가 길수록 공제 금액이 커져서 세율이 낮아져요.
      </p>
      <p style={body}>
        IRP를 해지해서 일시금을 꺼내면 해지 시점에 퇴직소득세가 원천징수돼요. 별도로 세금 신고를 할 필요는 없고, 원천징수영수증으로 내역을 확인하면 되죠.
      </p>
      <p style={body}>
        연금으로 나눠 받았다면 세금의 60~70%만 내면 되니까, 일시금이 세금 면에서는 불리해요. 하지만 당장 목돈이 필요한 상황이라면 일시금이 현실적인 선택이죠. 세금 차이를 미리 계산해보고 결정하세요.
      </p>

      <BorderBox title="추가 납입분 주의">
        IRP에 퇴직금 외에 추가로 넣은 금액(세액공제 받은 납입금)이 있다면,<br />
        해지 시 그 부분에 기타소득세(16.5%)가 별도로 붙어요.<br />
        퇴직금만 인출하고 나머지는 유지하는 방법도 있으니 확인해보세요.
      </BorderBox>

      <Divider />

      <H2>일시금 수령 후 재투자 방법은?</H2>
      <p style={body}>
        일시금을 받은 뒤 여유 자금이 있다면 <strong>연금저축계좌</strong>나 새 IRP에 납입해서 세액공제 혜택을 받을 수 있어요. 연간 900만 원까지 납입하면 최대 148.5만 원(세액공제율 16.5% 기준)을 돌려받죠.
      </p>
      <p style={body}>
        퇴직금으로 부동산이나 사업 자금을 마련하려는 분도 많아요. 이 경우 세금이 이미 빠진 금액이 입금되니까, 별도 정산 없이 바로 사용하면 돼요.
      </p>
      <p style={body}>
        단, 일시금 수령 후 다시 IRP에 넣으면 &ldquo;추가 납입&rdquo;으로 처리돼요. 퇴직소득세 유예 효과는 이미 사라졌기 때문에, 연금 수령 시 절세 혜택을 다시 받을 수는 없죠. 처음부터 연금 전환을 고려했다면 IRP를 유지하는 게 유리했을 거예요.
      </p>

      <Divider />

      <H2>일시금 수령 시 주의할 점은?</H2>
      <p style={body}>
        첫째, 세금 차이를 반드시 비교해보세요. 일시금과 연금의 세금 차이가 수백만 원에 달할 수 있어요. <a href="/w/퇴직금-일시금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>일시금 세금 계산</a>을 미리 해보면 판단이 쉬워지죠.
      </p>
      <p style={body}>
        둘째, IRP 해지 전에 운용 중인 상품을 확인하세요. 펀드나 ETF에 투자 중이라면 해지 시점의 평가액으로 환매되니까, 시장 상황에 따라 손실이 발생할 수 있어요.
      </p>
      <p style={body}>
        셋째, 퇴직소득원천징수영수증을 꼭 보관하세요. 이 서류가 있어야 나중에 세금 관련 문의나 정정 요청이 가능하죠. 회사에서 발급해주는 서류이니 퇴직 시 반드시 챙겨두세요.
      </p>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일시금 수령 조건을 파악하셨네요. IRP 해지 또는 예외 수령을 진행하세요."
        partialMatchText="일부 항목을 더 확인해보세요. 세금 차이를 비교한 뒤 결정하는 게 좋아요."
      />

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 일시금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(moel.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
