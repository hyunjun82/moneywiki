"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "IBK기업은행 IRP 계좌에 퇴직금이 입금돼 있어요" },
  { id: "c2", label: "퇴직 사실이 확인된 상태예요" },
  { id: "c3", label: "i-ONE뱅크 앱이 설치돼 있거나 영업점 방문이 가능해요" },
  { id: "c4", label: "수령 후 입금받을 일반 계좌가 준비돼 있어요" },
];

const CHECKLIST = [
  "i-ONE뱅크 앱 설치 및 로그인 확인",
  "IRP 계좌 내 퇴직금 입금 여부 확인",
  "운용 중인 상품 확인 — 펀드 환매 소요시간 체크",
  "해지 신청 — 앱 또는 영업점 방문",
  "퇴직소득원천징수영수증 보관",
];

const FAQS = [
  {
    q: "기업은행 IRP에서 퇴직금 수령하는 방법은?",
    a: "i-ONE뱅크 앱에서 IRP 해지를 신청하거나 영업점에 방문해서 처리할 수 있어요. 퇴직 사유 인출이면 적립금 전액을 꺼낼 수 있죠.",
  },
  {
    q: "온라인으로 신청이 가능한가요?",
    a: "네, i-ONE뱅크 앱에서 '퇴직연금 > IRP 해지' 메뉴로 진행할 수 있어요. 본인 인증만 완료하면 별도 서류 없이 신청이 가능하죠.",
  },
  {
    q: "해지 후 입금까지 얼마나 걸리나요?",
    a: "보통 2~3영업일이면 지정 계좌로 입금돼요. 운용 중인 펀드가 있으면 환매 기간만큼 추가 소요될 수 있죠.",
  },
  {
    q: "기업은행 IRP 수수료가 있나요?",
    a: "기업은행 IRP는 해지 수수료가 없어요. 운용 상품 자체의 환매 수수료만 확인하면 되죠.",
  },
  {
    q: "일부만 꺼내고 나머지는 유지할 수 있나요?",
    a: "퇴직 사유 인출은 전액 또는 부분 인출 모두 가능해요. 일부만 꺼내고 나머지를 연금으로 운용하는 것도 방법이죠.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "IBK기업은행 — IRP 퇴직연금 안내", url: "https://www.ibk.co.kr" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "국민은행-퇴직금-수령방법",
    title: "국민은행 퇴직금 수령 방법",
    description: "국민은행 IRP 수령 절차와 KB스타뱅킹 앱 신청법을 안내해요.",
  },
  {
    slug: "하나은행-퇴직금-수령방법",
    title: "하나은행 퇴직금 수령 방법",
    description: "하나은행 IRP 수령 절차와 하나원큐 앱 신청법을 안내해요.",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    description: "IRP에 들어온 퇴직금을 꺼내는 구체적인 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="기업은행-퇴직금-수령방법" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 기업은행 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기업은행 퇴직금 수령 방법,<br />
        단계별 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;기업은행 IRP에 퇴직금이 들어왔는데, 어떻게 꺼내죠?&rdquo;
        i-ONE뱅크 앱에서 해지 신청을 하면 2~3영업일 내에 일반 계좌로 입금돼요. 영업점 방문으로도 처리할 수 있죠.
        기업은행 IRP 수령 절차를 단계별로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기업은행 IRP에서 퇴직금 수령하는 방법은?</H2>
      <p style={body}>
        <strong>i-ONE뱅크 앱</strong>에서 바로 신청할 수 있어요. 앱에 로그인한 뒤 &ldquo;퇴직연금 &gt; IRP &gt; 해지/인출&rdquo; 메뉴로 들어가세요. 퇴직 사유 인출을 선택하고 수령 계좌를 지정하면 끝이죠.
      </p>
      <p style={body}>
        <strong>영업점 방문</strong>도 가능해요. 신분증만 가져가면 되고, 직원이 해지 절차를 안내해줘요. 운용 중인 상품이 있다면 환매 후 입금까지 며칠 걸릴 수 있지만, 원금보장형이면 당일 처리되는 경우도 있죠.
      </p>
      <p style={body}>
        해지 신청 후 퇴직소득세가 원천징수된 뒤 나머지가 지정 계좌로 입금돼요. 별도 세금 신고는 필요 없고, 원천징수영수증으로 내역을 확인하면 되죠.
      </p>

      <GreenBox title="기업은행 IRP 수령 단계">
        1단계: i-ONE뱅크 앱 로그인<br />
        2단계: 퇴직연금 &gt; IRP &gt; 해지/인출 선택<br />
        3단계: 수령 계좌 지정 후 신청 완료<br />
        4단계: 2~3영업일 내 입금 확인
      </GreenBox>

      <Divider />

      <H2>수령 신청에 필요한 것들은?</H2>
      <p style={body}>
        앱 신청 시에는 <strong>별도 서류가 필요 없어요</strong>. 본인 인증(지문, 비밀번호 등)만 완료하면 바로 해지 신청이 가능하죠. 퇴직 사실은 회사가 운용사에 이미 통보한 상태이니까요.
      </p>
      <p style={body}>
        영업점 방문 시에는 <strong>신분증</strong>만 준비하세요. 추가 서류는 필요 없어요. 다만 운용 중인 상품이 있으면 환매 동의 절차가 필요할 수 있죠.
      </p>
      <p style={body}>
        퇴직소득원천징수영수증은 회사에서 별도로 받아야 해요. 수령 신청과는 별개의 서류이지만, 세금 내역 확인을 위해 꼭 보관해두세요.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>온라인으로 신청이 가능한가요?</H2>
      <p style={body}>
        네, i-ONE뱅크 앱에서 전 과정을 처리할 수 있어요. 영업점 방문 없이 퇴직금 수령이 가능하죠. 앱에서 IRP 잔액 확인, 운용 상품 조회, 해지 신청까지 한 번에 할 수 있어요.
      </p>
      <p style={body}>
        야간이나 주말에도 신청은 가능하지만, 처리는 다음 영업일부터 시작돼요. 급하게 수령해야 한다면 평일 오전에 신청하는 게 가장 빨라요.
      </p>
      <p style={body}>
        앱 사용이 어려우면 기업은행 고객센터(1566-2566)에 전화하세요. 전화 상담으로 절차를 안내받을 수 있고, 필요하면 영업점 방문 예약까지 연결해줘요.
      </p>

      <Divider />

      <H2>수령 후 세금 처리는?</H2>
      <p style={body}>
        IRP 해지 시 퇴직소득세가 원천징수되고 나머지가 입금돼요. 근속연수가 길수록 세금 공제가 커지니까, 장기 근속자일수록 실수령액이 많아지죠.
      </p>
      <p style={body}>
        IRP에 추가 납입한 금액이 있다면 해당 부분에 기타소득세(16.5%)가 별도로 붙어요. 퇴직금만 인출하고 추가 납입분은 유지하는 것도 가능하니, 해지 전에 금액을 확인해보세요.
      </p>
      <p style={body}>
        연금으로 나눠 받으면 세금이 30~40% 줄어들어요. 기업은행 IRP를 유지하면서 55세 이후 연금 개시를 신청하면 되죠. <a href="https://www.ibk.co.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>IBK기업은행</a> 홈페이지에서 연금 수령 시뮬레이션도 해볼 수 있어요.
      </p>

      <Divider />

      <H2>기업은행 IRP 수령 시 주의할 점은?</H2>
      <p style={body}>
        운용 중인 펀드가 있다면 환매에 시간이 걸릴 수 있어요. 국내 펀드는 1~2영업일, 해외 펀드는 3~5영업일 정도 소요되죠. 퇴직 전에 미리 원금보장형으로 옮겨두면 수령이 빨라져요.
      </p>
      <p style={body}>
        기업은행 IRP는 해지 수수료가 없지만, 펀드 자체의 환매 수수료가 있을 수 있어요. 가입 후 일정 기간 이내에 환매하면 수수료가 붙는 상품이 있으니 앱에서 먼저 확인하세요.
      </p>
      <p style={body}>
        해지하면 계좌가 폐쇄돼요. 나중에 다시 IRP가 필요하면 새로 만들어야 하죠. 유지할 생각이 있다면 퇴직금만 부분 인출하고 계좌는 살려두는 방법도 있어요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="기업은행 IRP 수령 준비가 잘 돼 있네요. i-ONE뱅크 앱에서 해지 신청을 진행하세요."
        partialMatchText="확인이 필요한 항목이 있어요. 기업은행 고객센터(1566-2566)에 문의해보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기업은행 퇴직금 수령에 관해 자주 나오는 질문을 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 IBK기업은행 IRP 상품 정보를 바탕으로 작성됐어요. 상품 변경이 있을 수 있으니, 최신 정보는 IBK기업은행(ibk.co.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
