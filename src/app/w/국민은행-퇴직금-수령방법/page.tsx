"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "국민은행(KB) IRP 계좌에 퇴직금이 입금돼 있어요" },
  { id: "c2", label: "퇴직 사실이 확인됐어요 (회사에서 지급 완료)" },
  { id: "c3", label: "KB스타뱅킹 앱이 설치돼 있거나 영업점 방문이 가능해요" },
  { id: "c4", label: "수령 후 입금받을 일반 계좌가 준비돼 있어요" },
];

const CHECKLIST = [
  "KB스타뱅킹 앱 설치 및 로그인 확인",
  "IRP 계좌 내 퇴직금 입금 여부 확인",
  "수령(해지) 신청 — 앱 또는 영업점",
  "수령 계좌 지정 — 일반 입출금 계좌",
  "퇴직소득원천징수영수증 보관",
];

const FAQS = [
  {
    q: "국민은행 IRP에서 퇴직금 수령하는 방법은?",
    a: "KB스타뱅킹 앱에서 IRP 해지를 신청하거나 영업점에 방문해서 수령할 수 있어요. 퇴직 사유 인출은 적립금 전액이 가능하죠.",
  },
  {
    q: "앱으로도 신청할 수 있나요?",
    a: "네, KB스타뱅킹 앱에서 '퇴직연금 > IRP > 해지/인출' 메뉴로 들어가면 온라인 신청이 가능해요. 영업점 방문 없이 처리되죠.",
  },
  {
    q: "수령까지 얼마나 걸리나요?",
    a: "앱으로 신청하면 보통 2~3영업일 내에 지정 계좌로 입금돼요. 영업점 방문 시에는 당일 처리되는 경우도 있죠.",
  },
  {
    q: "수수료가 있나요?",
    a: "국민은행 IRP는 해지 수수료가 없어요. 다만 운용 중인 펀드 환매 시 환매 수수료가 붙는 상품이 있을 수 있으니 미리 확인하세요.",
  },
  {
    q: "국민은행 IRP를 해지하지 않고 유지하면 뭐가 좋나요?",
    a: "55세 이후 연금으로 수령하면 퇴직소득세의 60~70%만 내면 돼요. 추가 납입으로 세액공제 혜택도 받을 수 있죠. 당장 목돈이 필요하지 않다면 유지가 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "KB국민은행 — IRP 퇴직연금 안내", url: "https://www.kbstar.com" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기업은행-퇴직금-수령방법",
    title: "기업은행 퇴직금 수령 방법",
    description: "기업은행 IRP 수령 절차를 단계별로 정리했어요.",
  },
  {
    slug: "하나은행-퇴직금-수령방법",
    title: "하나은행 퇴직금 수령 방법",
    description: "하나은행 IRP 수령 절차와 하나원큐 앱 신청법을 안내해요.",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법 총 정리",
    description: "IRP에 들어온 퇴직금을 꺼내는 구체적인 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="국민은행-퇴직금-수령방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 국민은행 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민은행 퇴직금 수령 방법,<br />
        어떻게 신청하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;국민은행 IRP에 퇴직금이 들어왔는데, 어떻게 꺼내나요?&rdquo;
        KB스타뱅킹 앱에서 바로 해지 신청이 되고, 영업점 방문으로도 처리할 수 있어요.
        국민은행 IRP 수령 절차, 앱 신청법, 세금 처리, 주의할 점까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>국민은행 IRP 계좌에서 퇴직금 수령하는 방법은?</H2>
      <p style={body}>
        두 가지 방법이에요. <strong>KB스타뱅킹 앱</strong>에서 온라인으로 해지 신청하거나, 가까운 <strong>KB국민은행 영업점</strong>에 방문해서 처리할 수 있죠. 앱이 더 편리하고 빠르니까 추천해요.
      </p>
      <p style={body}>
        앱에서는 &ldquo;퇴직연금 &gt; IRP &gt; 해지/인출&rdquo; 메뉴로 들어가면 돼요. 퇴직 사유 인출을 선택하고, 수령할 일반 계좌를 지정하면 신청이 완료되죠. 보통 2~3영업일 내에 입금돼요.
      </p>
      <p style={body}>
        영업점에 방문할 때는 신분증만 가져가면 돼요. 운용 중인 상품이 있다면 환매 절차가 필요할 수 있는데, 직원이 안내해주니까 걱정하지 않아도 되죠.
      </p>

      <GreenBox title="수령 방법 2가지">
        KB스타뱅킹 앱 → 퇴직연금 &gt; IRP &gt; 해지/인출<br />
        영업점 방문 → 신분증 지참, 당일 처리 가능
      </GreenBox>

      <Divider />

      <H2>수령 신청에 필요한 서류는?</H2>
      <p style={body}>
        앱 신청 시에는 별도 서류가 필요 없어요. 본인 인증만 완료하면 바로 해지 신청이 가능하죠. 퇴직 사실은 회사가 운용사에 이미 통보한 상태이니까요.
      </p>
      <p style={body}>
        영업점 방문 시에는 <strong>신분증</strong>만 있으면 돼요. 퇴직소득원천징수영수증은 회사에서 별도로 발급받는 서류이니, 수령 신청과는 무관하죠. 다만 세금 내역 확인을 위해 반드시 회사에 요청해서 받아두세요.
      </p>
      <p style={body}>
        운용 중인 펀드가 있다면 환매에 시간이 걸릴 수 있어요. 국내 펀드는 1~2영업일, 해외 펀드는 3~5영업일 정도 소요되죠. 퇴직금 수령을 서두르려면 미리 원금보장형 상품으로 옮겨두는 게 좋아요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>국민은행 앱으로도 신청할 수 있나요?</H2>
      <p style={body}>
        네, KB스타뱅킹 앱에서 전 과정을 처리할 수 있어요. 앱 메인 화면에서 &ldquo;퇴직연금&rdquo; 메뉴를 찾고, IRP 계좌를 선택한 뒤 해지 신청을 하면 되죠.
      </p>
      <p style={body}>
        해지 유형을 &ldquo;퇴직 사유 인출&rdquo;로 선택하세요. 퇴직금 전액을 일시금으로 꺼낼 수 있고, 수령 계좌를 지정하면 2~3영업일 내에 입금돼요. 야간이나 주말에도 신청은 가능하지만, 처리는 다음 영업일부터 시작되죠.
      </p>
      <p style={body}>
        앱 사용이 어렵다면 국민은행 고객센터(1588-9999)에 전화해서 안내를 받을 수 있어요. 전화 상담 후 영업점 예약까지 연결해주는 서비스도 있죠.
      </p>

      <Divider />

      <H2>수령 후 세금 처리는 어떻게 되나요?</H2>
      <p style={body}>
        IRP를 해지하면 퇴직소득세가 <strong>원천징수</strong>된 뒤 나머지가 지정 계좌로 입금돼요. 별도로 세금 신고를 할 필요가 없죠. 원천징수 내역은 해지 후 발급되는 영수증에서 확인할 수 있어요.
      </p>
      <p style={body}>
        IRP에 추가 납입한 금액(세액공제 받은 금액)이 있다면 그 부분에 기타소득세(16.5%)가 따로 붙어요. 퇴직금만 인출하고 추가 납입분은 유지하는 것도 가능하니, 해지 전에 확인해보세요.
      </p>
      <p style={body}>
        연금으로 수령하면 퇴직소득세의 60~70%만 부담해요. 국민은행 IRP를 유지하면서 55세 이후 연금 개시를 신청하면 되죠. 당장 목돈이 필요하지 않다면 유지가 세금 측면에서 유리해요.
      </p>

      <Divider />

      <H2>국민은행 IRP 수령 시 주의할 점은?</H2>
      <p style={body}>
        해지 전에 운용 상품을 확인하세요. 펀드에 투자 중이라면 환매 타이밍에 따라 수령 금액이 달라질 수 있어요. 시장이 하락한 시점에 환매하면 손실이 확정되니까요.
      </p>
      <p style={body}>
        국민은행 IRP는 해지 수수료가 없지만, 운용 중인 펀드 자체에 환매 수수료가 있는 경우가 있어요. 가입 후 90일 이내 환매 시 수수료가 붙는 상품이 대표적이죠. 해지 전에 앱에서 수수료 여부를 꼭 체크하세요.
      </p>
      <p style={body}>
        해지 후에는 IRP 계좌가 폐쇄돼요. 나중에 다시 IRP가 필요하면 새로 개설해야 하죠. <a href="https://www.kbstar.com" style={{ color: "#1D9E75", textDecoration: "underline" }}>KB국민은행</a> 외에 다른 금융사의 IRP도 비교해보고 선택하세요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="국민은행 IRP 수령 준비가 잘 돼 있네요. KB스타뱅킹 앱에서 해지 신청을 진행하세요."
        partialMatchText="확인이 필요한 항목이 있어요. KB국민은행 고객센터(1588-9999)에 문의해보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민은행 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민은행 IRP 상품 정보를 바탕으로 작성됐어요. 상품 변경이 있을 수 있으니, 최신 정보는 KB국민은행(kbstar.com)에서 확인하세요." />
    </ArticleLayout>
  );
}
