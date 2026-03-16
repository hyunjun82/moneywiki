"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 입금된 상태예요" },
  { id: "c2", label: "퇴직 사유로 입금된 금액이에요 (전액 인출 가능)" },
  { id: "c3", label: "일시금으로 꺼낼지, 연금으로 나눠 받을지 결정했어요" },
  { id: "c4", label: "해지 시 퇴직소득세가 부과되는 걸 알고 있어요" },
];

const CHECKLIST = [
  "IRP 적립금 확인 — 퇴직금 입금 여부 체크",
  "운용 상품 확인 — 펀드 환매 소요시간 체크",
  "수령 방법 결정 — 해지(일시금) or 유지(연금)",
  "수령 계좌 준비 — 해지 시 입금받을 일반 계좌",
  "세금 내역 확인 — 원천징수영수증 보관",
];

const FAQS = [
  {
    q: "IRP에 들어온 퇴직금을 꺼내는 방법은?",
    a: "IRP를 해지하면 퇴직소득세 원천징수 후 일반 계좌로 입금돼요. 금융사 앱에서 해지 신청하면 2~3영업일 내 처리되죠.",
  },
  {
    q: "IRP 중도 인출 조건은 뭔가요?",
    a: "퇴직 사유 입금분은 전액 인출이 가능해요. 추가 납입분은 무주택자 주택구입, 6개월 이상 요양 등 법정 사유가 있어야 중도 인출이 가능하죠.",
  },
  {
    q: "IRP 해지와 중도 인출, 뭐가 다른가요?",
    a: "해지는 계좌를 폐쇄하고 전액을 꺼내는 거예요. 중도 인출은 일부 금액만 꺼내고 계좌를 유지하는 거죠.",
  },
  {
    q: "IRP 수령 시 세금은 어떻게 되나요?",
    a: "일시금 해지 시 퇴직소득세 전액이 부과돼요. 연금 수령 시에는 퇴직소득세의 60~70%만 부담하죠.",
  },
  {
    q: "IRP 수령 시 가장 주의할 점은?",
    a: "추가 납입분(세액공제 받은 금액)이 있다면 해지 시 기타소득세(16.5%)가 따로 붙어요. 퇴직금만 꺼내고 나머지를 유지하는 방법도 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 인출 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "irp-퇴직금-인출",
    title: "IRP 퇴직금 인출과 절세 방법",
    description: "인출 방법별 세금 차이와 절세 전략을 정리했어요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설 안내",
    description: "IRP 계좌가 왜 필요하고 어디서 만드는지 알려드려요.",
  },
  {
    slug: "퇴직금-IRP-이체-세금",
    title: "퇴직금 IRP 이체 시 세금 처리",
    description: "IRP 이체와 인출 시 세금이 어떻게 달라지는지 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-IRP-수령방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 수령 방법,<br />
        어떻게 찾아 쓰나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;IRP에 퇴직금이 들어왔는데, 어떻게 꺼내죠?&rdquo;
        IRP를 해지하면 2~3영업일 내에 일반 계좌로 입금돼요. 연금으로 나눠 받으면 세금을 30~40% 줄일 수 있죠.
        IRP 인출 방법, 해지와 중도 인출의 차이, 세금 처리, 주의할 점을 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP에 들어온 퇴직금을 꺼내는 방법은?</H2>
      <p style={body}>
        크게 두 가지예요. <strong>IRP 해지</strong>로 전액을 일시금으로 꺼내거나, <strong>연금 개시</strong>를 신청해서 매달 나눠 받는 방법이죠.
      </p>
      <p style={body}>
        해지는 금융사 앱에서 바로 신청할 수 있어요. &ldquo;퇴직 사유 인출&rdquo;을 선택하고 수령 계좌를 지정하면 끝이죠. 보통 2~3영업일이면 입금돼요.
      </p>
      <p style={body}>
        연금으로 받으려면 만 55세 이후에 연금 개시를 신청해야 해요. 수령 기간을 10년 이상으로 설정하면 세금이 가장 적게 나오죠. 아직 55세가 안 됐다면 IRP를 유지하면서 운용하다가 나중에 연금으로 전환하면 돼요.
      </p>

      <GreenBox title="수령 방법 비교">
        해지(일시금) → 퇴직소득세 전액 부담, 2~3영업일 입금<br />
        연금 수령 → 퇴직소득세 60~70%만 부담, 55세 이후 개시
      </GreenBox>

      <Divider />

      <H2>IRP 중도 인출 조건은 뭔가요?</H2>
      <p style={body}>
        퇴직 사유로 입금된 퇴직금은 <strong>전액 인출이 가능</strong>해요. 별도 사유 없이 바로 꺼낼 수 있죠. 이건 &ldquo;중도 인출&rdquo;이 아니라 &ldquo;퇴직 사유 인출&rdquo;이에요.
      </p>
      <p style={body}>
        반면 IRP에 추가로 납입한 금액은 법정 사유가 있어야 중도 인출이 가능해요. 무주택자의 주택 구입, 6개월 이상 요양, 개인회생·파산 등이 해당되죠.
      </p>
      <p style={body}>
        법정 사유 없이 추가 납입분을 꺼내려면 IRP를 <strong>전체 해지</strong>해야 해요. 이 경우 세액공제 받은 금액에 기타소득세(16.5%)가 붙으니까, 해지 전에 세금 영향을 따져보세요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 해지와 중도 인출, 뭐가 다른가요?</H2>
      <p style={body}>
        <strong>해지</strong>는 IRP 계좌를 폐쇄하고 적립금 전체를 꺼내는 거예요. 계좌가 사라지니까 나중에 다시 IRP가 필요하면 새로 만들어야 하죠.
      </p>
      <p style={body}>
        <strong>중도 인출</strong>은 일부 금액만 꺼내고 계좌를 유지하는 거예요. 퇴직금 부분만 인출하고 추가 납입분은 계속 운용할 수 있죠. 계좌가 유지되니까 세액공제 혜택도 계속 받을 수 있어요.
      </p>
      <p style={body}>
        퇴직금만 필요하다면 &ldquo;퇴직 사유 인출(부분 인출)&rdquo;을 선택하세요. IRP를 유지하면서 퇴직금 부분만 꺼낼 수 있으니 세금 측면에서 유리하죠.
      </p>

      <Divider />

      <H2>IRP 수령 시 세금은 어떻게 되나요?</H2>
      <p style={body}>
        일시금으로 해지하면 <strong>퇴직소득세 전액</strong>이 원천징수돼요. 근속연수가 길수록 공제가 커지니까, 장기 근속자일수록 세금이 적어지죠.
      </p>
      <p style={body}>
        연금으로 받으면 퇴직소득세의 <strong>60~70%</strong>만 부담해요. 수령 기간이 10년을 넘기면 세금이 더 줄어들죠. 이게 IRP 유지의 가장 큰 장점이에요.
      </p>
      <p style={body}>
        추가 납입분까지 같이 해지하면 세액공제 받았던 금액에 <strong>기타소득세(16.5%)</strong>가 붙어요. 퇴직금만 꺼내고 추가 납입분은 유지하면 이 세금을 피할 수 있죠.
      </p>

      <BorderBox title="세금 절약 팁">
        퇴직금만 인출 → 퇴직소득세만 부과<br />
        전체 해지 → 추가 납입분에 기타소득세 16.5% 추가<br />
        연금 수령 → 퇴직소득세 30~40% 절감
      </BorderBox>

      <Divider />

      <H2>IRP 수령 시 가장 주의할 점은?</H2>
      <p style={body}>
        <strong>운용 중인 상품 환매 타이밍</strong>을 확인하세요. 펀드에 투자 중이라면 환매까지 시간이 걸리고, 시장 하락 시 손실이 확정될 수 있어요. 퇴직이 가까워지면 원금보장형으로 옮겨두는 게 안전하죠.
      </p>
      <p style={body}>
        <strong>추가 납입분과 퇴직금 구분</strong>을 꼭 확인하세요. IRP에는 퇴직금과 추가 납입금이 섞여 있을 수 있어요. 전체 해지하면 각각 다른 세금이 적용되니까, 부분 인출이 가능한지 금융사에 먼저 물어보세요.
      </p>
      <p style={body}>
        <strong>해지 후 계좌 폐쇄</strong>도 고려하세요. 나중에 다시 IRP로 세액공제를 받고 싶다면 계좌를 유지하는 게 나아요. 퇴직금만 꺼내고 계좌를 살려두면 매년 세액공제 혜택을 계속 받을 수 있죠.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 수령 준비가 잘 돼 있네요. 금융사 앱에서 인출 신청을 진행하세요."
        partialMatchText="확인이 필요한 항목이 있어요. 수령 방법(해지 vs 유지)을 먼저 결정하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(fss.or.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
