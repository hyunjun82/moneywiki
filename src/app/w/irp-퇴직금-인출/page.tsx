"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP 계좌에 퇴직금이 들어와 있어요" },
  { id: "c2", label: "만 55세 이상이에요" },
  { id: "c3", label: "IRP 가입 후 5년 이상 지났어요" },
  { id: "c4", label: "무주택자로 주택을 구입하거나 6개월 이상 요양 중이에요 (중도 인출 조건)" },
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "IRP 잔액",
    min: 500,
    max: 20000,
    step: 500,
    defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "age",
    label: "현재 나이",
    min: 30,
    max: 70,
    step: 1,
    defaultValue: 45,
    format: (v: number) => `${v}세`,
  },
];

const CALC_RESULTS = [
  {
    label: "55세 이전 인출 시 기타소득세 (16.5%)",
    getValue: (v: Record<string, number>) =>
      v.age < 55
        ? Math.round(v.amount * 10000 * 0.165)
        : Math.round(v.amount * 10000 * 0.033),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 실수령액",
    getValue: (v: Record<string, number>) => {
      const tax =
        v.age < 55
          ? Math.round(v.amount * 10000 * 0.165)
          : Math.round(v.amount * 10000 * 0.033);
      return v.amount * 10000 - tax;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: false,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "IRP 중도인출 신청서", required: true, where: "금융기관 앱 또는 창구" },
  { name: "공동인증서 또는 금융인증서", required: true, where: "앱 또는 은행 창구" },
  { name: "무주택 확인서류 (주민등록등본, 매매계약서)", required: false, where: "주택 구입 사유 해당 시" },
  { name: "진단서 또는 입원확인서", required: false, where: "6개월 이상 요양 사유 해당 시" },
  { name: "법원 결정문", required: false, where: "파산·개인회생 사유 해당 시" },
];

const STEPS = [
  {
    title: "인출 사유 확인",
    desc: "법정 사유(무주택자 주택 구입, 6개월 이상 요양, 파산·개인회생, 천재지변)에 해당하면 퇴직소득세만 내고 일부 인출이 가능해요. 그 외 사유는 전액 해지만 가능하고 기타소득세 16.5%가 붙어요. 인출 전에 내 사유가 어디에 해당하는지 먼저 확인하세요.",
    tip: "법정 사유 해당 시 기타소득세 없이 퇴직소득세만 납부",
  },
  {
    title: "세금 계산",
    desc: "55세 이전 일반 해지라면 기타소득세 16.5%가 원금 전체에 붙어요. 55세 이후 연금 수령이라면 연금소득세 3.3~5.5%로 크게 줄어요. 인출 금액과 나이를 위 계산기에 입력해서 실수령액을 먼저 확인하세요.",
    tip: "55세 기준으로 세금이 약 5배 차이 날 수 있어요",
  },
  {
    title: "금융기관 앱 또는 창구에서 신청",
    desc: "IRP를 개설한 금융기관 앱에서 '중도인출' 또는 '해지' 메뉴로 접근해요. 법정 사유가 있으면 증빙 서류를 미리 스캔해서 첨부하세요. 창구 방문 시 신분증만 있어도 신청서 작성이 가능해요.",
    tip: "앱 신청이 빠르지만 서류 첨부 기능 확인 먼저",
    link: { label: "금융감독원 IRP 안내", href: "https://www.fss.or.kr" },
  },
  {
    title: "세금 원천징수 후 지급",
    desc: "신청 후 2~3 영업일 내에 세금이 빠진 금액이 입금돼요. 기타소득세는 금융기관이 원천징수해서 신고하기 때문에 별도로 신고할 필요가 없어요. 연금 수령이라면 매월(또는 분기별)로 나눠 들어와요.",
    tip: "원천징수 영수증은 금융기관 앱에서 출력 가능",
  },
];

const CHECKLIST = [
  "나이 확인: 만 55세 기준으로 세금이 크게 달라져요",
  "인출 사유: 법정 사유 해당 여부 먼저 확인",
  "세금 계산: 기타소득세 16.5% vs 연금소득세 3.3~5.5%",
  "증빙 서류: 법정 사유라면 서류 미리 스캔해두기",
  "연금 전환 검토: 55세 이후 수령 가능하다면 기다리는 게 유리",
  "재가입 가능 여부: 해지 후 새 IRP 개설은 가능하지만 세금은 돌아오지 않아요",
];

const FAQS = [
  {
    q: "55세 이전에 IRP를 해지하면 세금이 얼마나 나오나요?",
    a: "기타소득세 16.5%가 IRP 원금 전체에 붙어요. 퇴직소득세와는 별도로 추가 부과되는 세금이에요. 퇴직금 5,000만원을 해지하면 기타소득세만 825만원이에요. 급하게 필요한 돈이 아니라면 가급적 피하는 게 좋아요.",
  },
  {
    q: "부득이한 법정 사유가 정확히 어떤 경우인가요?",
    a: "근로자퇴직급여보장법에서 정한 사유는 무주택자 주택 구입, 본인·배우자·부양가족의 6개월 이상 요양, 파산 또는 개인회생, 천재지변이에요. 이 경우에 한해 퇴직소득세만 내고 일부 인출이 가능해요.",
  },
  {
    q: "부분 인출이 가능한 경우가 있나요?",
    a: "법정 사유에 해당하면 필요한 금액만 일부 인출이 가능해요. 그 외 일반 해지는 전액 해지만 가능해요. 부분 인출 후 남은 금액은 계속 IRP에 남아 있어요.",
  },
  {
    q: "IRP를 해지했다가 나중에 다시 가입할 수 있나요?",
    a: "재가입은 가능해요. 하지만 중도 해지로 낸 기타소득세 16.5%는 돌려받지 못해요. 재가입 후 연금 수령 조건(55세 이상, 5년 이상)을 다시 채워야 해서 실질적으로 손해가 커요.",
  },
  {
    q: "연금 수령 시 세금이 정말 3.3%밖에 안 되나요?",
    a: "55세 이후 연금으로 받으면 퇴직소득세가 30~40% 줄어드는 것에 더해, 매년 받는 연금 금액에는 연금소득세 3.3~5.5%만 붙어요. 55세 이전 해지(16.5%)와 비교하면 세금이 최대 5배 차이 날 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법: IRP 중도인출 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조: 퇴직소득세 계산", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 중도인출·해지 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-IRP-수령방법", title: "IRP 퇴직금 수령 방법", description: "일시금·연금 선택부터 신청까지." },
  { slug: "퇴직금-IRP-이체-세금", title: "IRP 이체 시 세금", description: "이전과 인출 시 세금 차이 정리." },
  { slug: "퇴직금-일시금-수령-방법", title: "퇴직금 일시금 수령 방법", description: "즉시 수령 절차와 세금 계산." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="irp-퇴직금-인출" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 중도인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 퇴직금, 지금 꺼내도 되나요?<br />
        중도 인출 조건·세금·절차 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 들어온 <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금</a>을
        꺼내야 할 상황이 생겼는데 세금이 얼마나 나올지 모르겠죠.
        55세 이전에 꺼내면 기타소득세 16.5%가 원금 전체에 붙어요.
        법정 사유가 있으면 세금을 줄일 수 있고, 55세 이후 연금으로 받으면 세금이 3.3~5.5%까지 내려가요.
        인출 방법마다 세금이 크게 다르기 때문에 결정 전에 꼭 비교해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 상황에서 인출 가능한지 체크해볼게요</H2>
      <p style={body}>
        IRP는 원칙적으로 55세 이후 노후 자금을 위한 계좌예요.
        55세 이전에 꺼내려면 법정 사유가 있어야 세금 부담을 줄일 수 있어요.
        법정 사유 없이 55세 이전에 해지하면 기타소득세 16.5%가 원금 전체에 추가로 붙어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서
        정한 법정 사유는 무주택자 주택 구입, 6개월 이상 요양, 파산·개인회생, 천재지변이에요.
        이 사유에 해당하면 필요한 금액만 일부 인출이 가능해요.
      </p>

      <GreenBox>
        55세 이전 일반 해지 → 기타소득세 16.5% (원금 전체 과세)<br />
        법정 사유 일부 인출 → 퇴직소득세만 적용 (기타소득세 없음)<br />
        55세 이후 연금 수령 → 연금소득세 3.3~5.5% (가장 유리)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="연금 수령 또는 법정 사유 인출 조건을 갖추고 있어요. 세금이 대폭 줄어드는 방법으로 인출할 수 있어요."
        partialMatchText="일부 조건이 충족되지 않아요. 55세 이전이고 법정 사유도 없다면 기타소득세 16.5%가 부과돼요."
      />

      <Divider />

      <H2>인출 방법별 세금, 얼마나 차이 나나요?</H2>
      <p style={body}>
        나이와 IRP 잔액을 입력하면 세금과 실수령액이 바로 나와요.
        55세 이전(기타소득세 16.5%)과 55세 이후(연금소득세 3.3%)를 비교해보면
        같은 5,000만원에서 세금 차이가 650만원 넘게 날 수 있어요.
      </p>
      <p style={body}>
        연금소득세는 매년 받는 금액 기준으로 부과되기 때문에 아래 계산기는 단순 추정값이에요.
        정확한 세액은 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 세금 계산</a> 글에서 확인하세요.
      </p>

      <SectionBadge>IRP 인출 세금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 55세 이전: 기타소득세 16.5% (원금 전체). 55세 이후 연금: 연금소득세 3.3% 기준. 실제 세액은 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>인출 신청에 필요한 서류가 뭔가요?</H2>
      <p style={body}>
        금융기관 앱으로 신청하면 신분증과 공동인증서만으로 처리되는 경우가 많아요.
        법정 사유에 해당한다면 사유별 증빙 서류를 추가로 첨부해야 해요.
        서류가 빠지면 처리가 지연되기 때문에 신청 전에 미리 스캔해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        <b>법정 사유별 증빙 서류 예시</b><br />
        무주택자 주택 구입: 주민등록등본 + 매매계약서<br />
        6개월 이상 요양: 진단서 또는 입원확인서<br />
        파산·개인회생: 법원 결정문
      </BorderBox>

      <Divider />

      <H2>IRP 인출 신청, 4단계로 끝내요</H2>
      <p style={body}>
        사유 확인부터 실제 입금까지 빠르면 2~3 영업일이면 돼요.
        법정 사유가 있는 경우라면 증빙 서류 준비에 시간이 더 걸릴 수 있어요.
      </p>
      <p style={body}>
        세금 계산을 먼저 하고 인출 여부를 결정하는 게 중요해요.
        한 번 해지하면 세금은 돌아오지 않고, 재가입 후 연금 조건을 다시 채워야 하는 불이익이 생겨요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>인출 전 반드시 짚어볼 것들</H2>
      <p style={body}>
        중도 인출은 한 번 하면 되돌리기 어려워요.
        아래 항목을 하나씩 점검하고 나서 최종 결정을 내리세요.
        특히 55세가 가까운 경우라면 조금 더 기다리는 게 수백만 원 절세로 이어질 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        법정 사유(주택 구입, 요양 등) 해당 여부 먼저 확인<br />
        해당 시: 퇴직소득세만 내고 일부 인출 가능<br />
        해당 없을 때: 기타소득세 16.5% 각오하고 전액 해지
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 퇴직금 인출 시 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(☎ 1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
