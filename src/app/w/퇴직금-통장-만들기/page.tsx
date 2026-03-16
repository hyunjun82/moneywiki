"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 예정이고 IRP 계좌가 아직 없어요" },
  { id: "c2", label: "은행·증권사·보험사 중 어디서 개설할지 고민 중이에요" },
  { id: "c3", label: "수수료와 운용 상품을 비교하고 싶어요" },
  { id: "c4", label: "온라인(앱)으로 개설 가능한지 궁금해요" },
];

const CHECKLIST = [
  "신분증 준비 — 주민등록증 또는 운전면허증",
  "금융기관 비교 — 수수료·운용 상품·앱 편의성",
  "개설 방법 선택 — 온라인(앱) 또는 지점 방문",
  "계좌 번호 확인 — 개설 후 회사 인사팀에 전달",
  "운용 상품 선택 — 예금·펀드·ETF 중 투자 성향에 맞게",
];

const FAQS = [
  {
    q: "IRP 계좌는 무료로 만들 수 있나요?",
    a: "개설 자체는 대부분 무료예요. 다만 운용 관리 수수료가 매년 부과되는 곳이 있죠. 최근에는 수수료 무료 IRP를 내놓는 곳도 많으니 비교해보세요.",
  },
  {
    q: "온라인으로 바로 만들 수 있나요?",
    a: "네, 은행·증권사 앱에서 10~20분이면 개설할 수 있어요. 비대면 인증(공동인증서, 간편인증 등)만 있으면 지점 방문 없이 가능하죠.",
  },
  {
    q: "여러 금융기관에 IRP를 만들 수 있나요?",
    a: "가능해요. 다만 퇴직금은 하나의 IRP로만 받게 되니, 가장 유리한 계좌를 선택해서 회사에 알려주세요.",
  },
  {
    q: "퇴직 후에 개설해도 되나요?",
    a: "되긴 하지만, 퇴직금 입금이 지연될 수 있어요. 퇴직 전에 미리 개설하고 계좌 번호를 인사팀에 전달하는 게 가장 효율적이죠.",
  },
  {
    q: "은행 IRP와 증권사 IRP, 어떤 게 좋나요?",
    a: "안정적 운용을 원하면 은행(예금 상품 다양), 적극 투자를 원하면 증권사(ETF·펀드 다양)가 유리해요. 본인 성향에 맞게 선택하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — IRP 계좌 개설", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 계좌 비교 서비스", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-통장",
    title: "퇴직금 통장 종류",
    description: "어떤 통장으로 퇴직금을 받을 수 있는지 안내해요.",
  },
  {
    slug: "퇴직금-IRP-계좌",
    title: "IRP 계좌 안내",
    description: "IRP가 뭔지, 꼭 만들어야 하는지 정리했어요.",
  },
  {
    slug: "퇴직금-통장-종류",
    title: "퇴직금 통장 종류 비교",
    description: "IRP, DB형, DC형 계좌의 차이를 비교해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장-만들기" />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통장 개설 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장 만들기,<br />
        어디서 어떻게 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금 받을 통장을 만들어야 하는데, 어디서 만들어요?&rdquo;<br />
        IRP(개인형 퇴직연금) 계좌를 개설하면 돼요.
        은행, 증권사, 보험사 어디서든 만들 수 있고, 앱으로도 10분이면 개설 가능하죠.
        어디서 만드는 게 유리한지, 수수료와 운용 상품 차이를 비교해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 통장은 어디서 만드나요?</H2>
      <p style={body}>
        <strong>은행, 증권사, 보험사</strong> 세 곳에서 만들 수 있어요. 어디서 만들든 퇴직금 수령 기능은 동일하죠. 차이가 나는 건 수수료, 운용 가능 상품, 앱 편의성이에요.
      </p>
      <p style={body}>
        은행은 접근성이 좋고 원금 보장 상품(예금)이 다양해요. 증권사는 ETF, 펀드 등 투자 상품 선택지가 넓죠. 보험사는 보험 연계 상품이 있지만 수수료가 상대적으로 높을 수 있어요.
      </p>
      <p style={body}>
        최근에는 비대면 개설이 일반적이에요. 은행·증권사 앱을 설치하고, 비대면 인증(공동인증서 또는 간편인증)으로 본인 확인을 거치면 지점 방문 없이 개설이 끝나죠.
      </p>

      <GreenBox title="IRP 개설 가능한 곳">
        <strong>은행</strong>: 국민, 신한, 하나, 우리 등 — 예금 상품 다양<br />
        <strong>증권사</strong>: 미래에셋, 삼성, 한국투자 등 — ETF·펀드 다양<br />
        <strong>보험사</strong>: 삼성생명, 한화 등 — 보험 연계 상품
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="금융기관을 비교해서 IRP를 개설하세요. 퇴직 전에 만들어두면 좋아요."
        partialMatchText="먼저 수수료와 상품을 비교한 뒤 개설 여부를 결정하세요."
      />

      <Divider />

      <H2>IRP 계좌 개설 방법은?</H2>
      <p style={body}>
        <strong>온라인</strong>: 금융기관 앱 설치 → IRP 개설 메뉴 → 본인 인증 → 약관 동의 → 완료. 10~20분이면 끝나요. 앱에서 &ldquo;퇴직연금&rdquo; 또는 &ldquo;IRP&rdquo;를 검색하면 메뉴가 나오죠.
      </p>
      <p style={body}>
        <strong>지점 방문</strong>: 신분증을 들고 가면 직원이 안내해줘요. 상품 상담도 함께 받을 수 있어서 처음 개설하는 분에게 편하죠. 다만 대기 시간이 있을 수 있어요.
      </p>
      <p style={body}>
        개설 후 계좌 번호를 회사 인사팀에 알려주세요. 회사가 퇴직금을 이 계좌로 보내게 되니까요. 퇴사 전에 미리 전달하면 퇴직금이 바로 입금될 수 있어요.
      </p>

      <BorderBox title="개설 전 준비물">
        <strong>필수</strong>: 신분증 (주민등록증 또는 운전면허증)<br />
        <strong>온라인</strong>: 공동인증서 또는 간편인증 (카카오, PASS 등)<br />
        <strong>지점 방문</strong>: 신분증만 있으면 OK
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>은행마다 혜택이 다른가요?</H2>
      <p style={body}>
        수수료 차이가 제일 크죠. 일부 은행·증권사는 IRP 수수료를 면제해주고, 다른 곳은 연 0.2~0.5% 정도 수수료를 부과해요. 금액이 클수록 수수료 차이가 체감되니 꼭 비교하세요.
      </p>
      <p style={body}>
        운용 가능 상품도 달라요. 은행은 예금·적금 상품이 풍부하고, 증권사는 ETF·펀드가 수백 종류까지 있죠. 안정적 운용을 원하면 은행, 적극 투자를 원하면 증권사가 맞아요.
      </p>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 홈페이지에서 IRP 수수료 비교 서비스를 제공하고 있어요. 금융기관별 수수료와 수익률을 한눈에 볼 수 있으니 활용하세요.
      </p>

      <Divider />

      <H2>통장 개설 시 필요한 서류는?</H2>
      <p style={body}>
        <strong>신분증</strong>만 있으면 돼요. 주민등록증 또는 운전면허증이 필수이고, 온라인 개설 시에는 공동인증서나 간편인증(카카오·PASS 등)이 추가로 필요하죠.
      </p>
      <p style={body}>
        별도의 재직증명서나 퇴사 증빙은 필요 없어요. IRP는 누구나 만들 수 있는 계좌거든요. 재직 중에 미리 만들어둬도 되고, 퇴직 후에 만들어도 되죠.
      </p>
      <p style={body}>
        개설 과정에서 투자 성향 테스트를 받게 돼요. 이건 운용 상품 추천을 위한 것이지 개설 조건은 아니에요. 솔직하게 응답하면 본인에 맞는 상품을 안내받을 수 있죠.
      </p>

      <Divider />

      <H2>어떤 은행 IRP가 유리한가요?</H2>
      <p style={body}>
        &ldquo;이 은행이 무조건 좋다&rdquo;라고 말하기는 어려워요. 본인 상황에 따라 달라지거든요. 수수료가 낮은 곳, 운용 상품이 다양한 곳, 앱이 편한 곳 — 우선순위를 정해서 비교하세요.
      </p>
      <p style={body}>
        수수료 무료 프로모션을 자주 하는 곳도 있어요. 가입 시점에 수수료 면제 기간이 1~3년인 경우가 많으니, 프로모션 조건을 확인하고 이후 수수료도 따져보세요.
      </p>
      <p style={body}>
        주거래 은행이나 증권사가 있다면 그곳에서 개설하는 게 편할 수 있어요. 기존 앱에 IRP 기능이 함께 들어가 있으니 별도 앱 설치 없이 관리할 수 있죠.
      </p>

      <SectionBadge>개설 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장 만들기에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 금융 상품과 수수료는 변동될 수 있으니, 가입 금융기관에 직접 확인하세요." />
    </ArticleLayout>
  );
}
