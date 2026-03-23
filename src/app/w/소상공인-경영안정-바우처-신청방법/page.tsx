"use client";

// Q1: 가게를 운영하는데 고정비 부담이 크고 경영안정바우처 25만원을 받을 수 있는지 확인하려는 상황
// Q2: 소상공인24에서 경영안정바우처 25만원 신청 완료
// Q3: 대상(연매출 1억400만원 미만), 지원금액(25만원), 사용처(공과금·4대보험·연료비), 신청방법(소상공인24), 카드 포인트 방식
// Q4: EligibilityChecker(대상 확인) + Steps(신청 절차) + BorderBox(사용처) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const CHECK_ITEMS = [
  { id: "c1", label: "사업자등록이 되어 있고 현재 정상 영업 중이에요" },
  { id: "c2", label: "2025년 12월 31일 이전에 개업했어요" },
  { id: "c3", label: "연매출이 0원 초과 ~ 1억 400만원 미만이에요" },
  { id: "c4", label: "사행성·유흥업종이 아니에요" },
];

const STEPS = [
  {
    title: "소상공인24 회원가입 또는 로그인",
    desc: "소상공인24(sbiz24.kr) 또는 경영안정바우처 전용 페이지(voucher.sbiz24.kr)에 접속해서 회원가입해요.",
    link: { label: "소상공인24 바우처 신청", href: "https://voucher.sbiz24.kr" },
  },
  {
    title: "경영안정바우처 신청 메뉴 선택",
    desc: "로그인 후 경영안정바우처 신청 메뉴로 들어가요. 사업자 정보가 자동으로 조회돼요.",
  },
  {
    title: "매출 확인 및 카드사 선택",
    desc: "연매출 기준 충족 여부가 자동 확인돼요. KB국민, 농협, 롯데, BC, 삼성, 신한, 우리, 하나, 현대 중 카드사를 선택하세요.",
  },
  {
    title: "심사 후 포인트 지급",
    desc: "심사를 거쳐 확정되면 선택한 카드사의 포인트로 25만원이 충전돼요. 고정비 납부 시 자동 차감돼요.",
  },
];

const CHECKLIST = [
  "연매출 1억 400만원 미만 확인 (부가세 과세표준증명원)",
  "2025년 12월 31일 이전 개업 확인",
  "소상공인24 회원가입 완료",
  "참여 카드사 9개 중 보유 카드 확인",
  "예산 소진 전 조기 신청 (12월 중순 마감 예정)",
];

const FAQS = [
  {
    q: "경영안정바우처를 현금으로 받을 수 있나요?",
    a: "아니에요. 카드 포인트로 지급돼요. 고정비(전기요금, 가스비, 4대보험료 등)를 결제할 때 자동으로 차감되는 방식이에요.",
  },
  {
    q: "간이과세자도 신청할 수 있나요?",
    a: "네, 가능해요. 일반과세자든 간이과세자든 연매출 기준만 충족하면 신청할 수 있어요.",
  },
  {
    q: "배달비 지원이랑 중복으로 받을 수 있나요?",
    a: "네. 소상공인 배달비 지원은 별개 사업이라 경영안정바우처와 중복 수혜가 가능해요.",
  },
  {
    q: "신규 사업자인데 매출 증빙이 어려워요",
    a: "2025년 12월 31일 이전 개업이 조건이에요. 매출 증빙이 어려운 경우 추정 매출로 신청 가능한지 공고문을 확인해보세요.",
  },
  {
    q: "바우처 사용 기한이 있나요?",
    a: "지급받은 후 일정 기간 내에 사용해야 해요. 기한이 지나면 소멸될 수 있으니 공고에서 정확한 사용 기한을 확인하세요.",
  },
  {
    q: "개인 용도로 쓸 수 있나요?",
    a: "안 돼요. 사업장 운영 관련 고정비에만 써야 해요. 부정 사용이 적발되면 환수 조치를 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 서비스",
    items: [
      { label: "소상공인 경영안정바우처 신청", url: "https://voucher.sbiz24.kr" },
      { label: "소상공인24", url: "https://www.sbiz.or.kr" },
      { label: "기업마당 (지원사업 통합 정보)", url: "https://www.bizinfo.go.kr" },
    ],
  },
  {
    category: "관련 기관",
    items: [
      { label: "중소벤처기업부", url: "https://www.mss.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "소상공인-정책자금-대출", title: "소상공인 정책자금 대출", description: "저금리 정책자금 대출 조건과 신청 방법이에요." },
  { slug: "소상공인-배달비-지원", title: "소상공인 배달비 지원", description: "배달앱 수수료 부담을 줄여주는 지원이에요." },
  { slug: "자영업자-고용보험료-지원", title: "자영업자 고용보험료 지원", description: "고용보험료 50~80%를 최대 5년간 지원받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 소상공인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소상공인 경영안정바우처 25만원<br />
        신청 대상과 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가게 전기세, 가스비, 4대보험료 매달 빠져나가는 게 부담되시죠?
        2026년 소상공인 경영안정바우처로 25만원을 받아서 고정비에 쓸 수 있어요.
        연매출 1억 400만원 미만이면 대상이에요. 예산 소진 시 조기 마감되니까 서둘러야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 대상자인지 확인해보세요</H2>
      <p style={body}>
        <a href="https://www.mss.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>중소벤처기업부</a>에서
        총 5,700억원 규모로 시행하는 사업이에요. 약 230만명의 영세 소상공인이 대상이에요.
        연매출은 부가가치세 과세표준증명원(홈택스에서 발급)으로 확인해요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="신청 대상이에요. 소상공인24에서 바로 신청할 수 있어요."
        partialMatchText="일부 조건이 충족되지 않았어요. 각 항목을 다시 확인해보세요."
      />

      <CategoryButton label="복지·소상공인 정보" count={4} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청 절차, 온라인으로 끝나요</H2>
      <p style={body}>
        <a href="https://voucher.sbiz24.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>소상공인24</a>에서만 신청할 수 있어요.
        오프라인 접수는 안 돼요. 카드사 선택 후 심사가 끝나면 포인트가 충전돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>어디에 쓸 수 있나요?</H2>
      <p style={body}>
        기존 전기요금 지원보다 사용처가 넓어졌어요. 사업장 운영에 필수적인 고정비 대부분에 쓸 수 있죠.
      </p>

      <BorderBox>
        <strong>사용 가능 항목</strong><br /><br />
        전기요금: 사업장 전기세<br />
        가스비: 도시가스, LPG<br />
        수도요금: 사업장 수도세<br />
        통신비: 사업장 인터넷, 전화요금<br />
        4대보험료: 국민연금, 건강보험, 고용보험, 산재보험<br />
        차량 연료비: 사업용 차량 주유비<br />
        화재공제료: 전통시장 화재공제
      </BorderBox>

      <GreenBox>
        <strong>참여 카드사 9개</strong><br />
        KB국민, 농협, 롯데, BC, 삼성, 신한, 우리, 하나, 현대
      </GreenBox>

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        예산 소진 시 조기 마감돼요. 가능한 빨리 신청하는 게 좋아요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 중소벤처기업부 공고를 바탕으로 작성됐어요. 신청 기간과 세부 조건은 변경될 수 있으니 소상공인24에서 최신 공고를 확인해봐요." />
    </ArticleLayout>
  );
}
