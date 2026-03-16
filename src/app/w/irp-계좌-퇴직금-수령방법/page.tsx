"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  "퇴직일이 정해졌어요",
  "퇴직금 300만원 이상 예상돼요",
  "아직 IRP 계좌가 없어요",
  "퇴직 전에 계좌를 미리 만들어야 하는지 궁금해요",
];

const CALC_SLIDERS = [
  {
    id: "amount",
    label: "퇴직금 예상액",
    min: 300,
    max: 10000,
    step: 100,
    defaultValue: 3000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "method",
    label: "수령방식",
    min: 1,
    max: 2,
    step: 1,
    defaultValue: 1,
    format: (v: number) => v === 1 ? "일시금" : "연금(10년+)",
  },
];

const CALC_RESULTS = [
  {
    id: "result1",
    label: "일시금 퇴직소득세 추정",
    highlight: true,
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.05),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    id: "result2",
    label: "연금 선택 시 절세액 (30% 감면)",
    highlight: false,
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.05 * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "재직증명서", required: false, where: "선택 — 일부 금융사 요구" },
  { name: "공동인증서 또는 간편인증", required: true, where: "금융인증서 또는 앱" },
  { name: "기존 금융계좌", required: true, where: "이체용 기존 계좌" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설 (퇴직 전)",
    desc: "은행/증권사 앱으로 10분",
    tip: "수수료 낮은 증권사 추천",
  },
  {
    title: "회사 인사팀에 계좌번호 통보",
    desc: "문자/메일로",
    tip: "구두보다 서면 증거",
  },
  {
    title: "퇴직 후 14일 이내 이체 확인",
    desc: "IRP 앱으로 확인",
    tip: "안 오면 인사팀→노동청 순서",
  },
  {
    title: "연금/일시금 운용 방식 결정",
    desc: "55세 이후 연금이 유리",
    tip: "연금 수령 시 퇴직소득세 30% 감면",
  },
];

const CHECKLIST = [
  "IRP 계좌 — 퇴직 확정 즉시 개설",
  "계좌번호 인사팀 통보 — 문자·메일 증거 보관",
  "14일 이내 입금 확인 — 안 오면 즉시 요청",
  "수수료 — 증권사 0.2% vs 은행 0.5% 비교",
  "55세 이후 연금 수령 — 퇴직소득세 30% 감면",
];

const FAQS = [
  {
    q: "IRP 계좌를 퇴직 후에 만들어도 되나요?",
    a: "되지만 미리 만드는 게 좋아요. 퇴직 후 계좌 없으면 이체 지연됨",
  },
  {
    q: "퇴직금이 IRP에 들어오면 바로 꺼낼 수 있나요?",
    a: "55세 이전 꺼내면 기타소득세 16.5% 추가 부과",
  },
  {
    q: "IRP 수수료는 어디서 확인하나요?",
    a: "금융감독원 금융상품한눈에 사이트에서 비교 가능",
  },
  {
    q: "회사가 IRP 아닌 곳으로 보냈으면?",
    a: "고용노동부(1350) 신고, 300만원 초과 위법",
  },
  {
    q: "IRP에서 ETF 투자도 할 수 있나요?",
    a: "증권사 IRP에서 ETF 투자 가능, 은행은 예금 위주",
  },
];

const REFERENCES = [
  {
    label: "법령",
    items: [
      {
        name: "근로자퇴직급여보장법 제9조",
        url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
      },
    ],
  },
  {
    label: "공식",
    items: [
      { name: "금융감독원 — IRP 안내", url: "https://www.fss.or.kr" },
      { name: "고용노동부 — 퇴직급여 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-IRP-계좌",
    title: "퇴직금 IRP 계좌 개설",
    desc: "수수료 비교부터 개설 절차까지",
  },
  {
    slug: "퇴직금-IRP-수령방법",
    title: "퇴직금 IRP 수령 방법",
    desc: "계좌 개설 후 이체까지",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼나요?",
    desc: "IRP 절세 효과 계산",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="irp-계좌-퇴직금-수령방법"
        />
      }
    >
      {/* breadcrumb */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        IRP · 퇴직금수령 · 계좌개설
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.4, marginBottom: 6 }}>
        IRP 계좌로 퇴직금 받는 방법, 순서대로 알려드려요
        <br />
        <span style={{ fontSize: 18, fontWeight: 400, color: "#374151" }}>
          계좌 개설 시점부터 실제 이체 확인까지
        </span>
      </h1>

      {/* intro */}
      <p style={{ ...body, marginBottom: 10 }}>
        퇴직이 확정됐는데 IRP 계좌부터 만들어야 하는지, 회사가 알아서 보내주는 건지 헷갈리시죠?{" "}
        <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          IRP 계좌
        </a>
        는 퇴직금을 받기 위한 전용 그릇이에요. 300만원 이상 퇴직금은 법적으로 IRP로만 받을 수 있고, 개설부터 이체 확인까지 직접 챙겨야 해요.
      </p>
      <p style={{ ...body, marginBottom: 0 }}>
        이 글에서는 계좌 개설 시점, 서류 준비, 인사팀 통보, 이체 확인 순으로 전 과정을 짚어드려요. 퇴직 전에 딱 한 번만 읽으면 빠짐없이 챙길 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1 */}
      <H2>IRP 계좌 없이 퇴직금을 받을 수 있나요?</H2>
      <p style={{ ...body, marginBottom: 10 }}>
        퇴직금이 300만원 이상이면 IRP로 받는 게 법적 기준이에요.{" "}
        <a
          href="https://www.law.go.kr/법령/근로자퇴직급여보장법"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1D9E75", textDecoration: "underline" }}
        >
          근로자퇴직급여보장법 제9조
        </a>
        에서 퇴직연금(DC형·DB형)은 무조건 IRP로 지급하도록 정해두고 있거든요. 계좌가 없으면 회사가 이체할 곳이 없어서 지급 자체가 지연돼요.
      </p>
      <p style={{ ...body, marginBottom: 10 }}>
        퇴직금이 300만원 미만이거나 퇴직연금이 아닌 구형 퇴직금(법정퇴직금)은 일반 계좌로 받을 수 있지만, 이 경우에도 IRP로 받으면{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          퇴직소득세 절세
        </a>{" "}
        혜택이 생겨요. 세금을 아끼려면 어느 쪽이든 IRP를 쓰는 게 맞아요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        계좌 개설은 퇴직 전에 미리 해두는 게 핵심이에요. 퇴직 후 만들어도 되긴 하지만, 그 사이에{" "}
        <a href="/w/퇴직금-지급기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          14일 지급기한
        </a>
        이 지나버리면 회사는 지연이자(연 20%)를 물게 되고, 절차가 복잡해져요.
      </p>
      <GreenBox title="IRP 수령 기준 한눈에 보기">
        퇴직금 300만원 이상 → IRP 계좌 필수 (법적 의무)<br />
        퇴직금 300만원 미만 → IRP 선택 가능 (세금 혜택 있음)<br />
        퇴직연금(DC·DB형) → 금액 무관하게 IRP로만 지급
      </GreenBox>
      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌 개설이 바로 필요한 상황이에요. 지금 바로 아래 절차대로 개설하세요."
        partialMatchText="일부 항목이 해당돼요. 퇴직금 금액과 계좌 유무를 먼저 확인해보세요."
      />

      <Divider />

      {/* H2-2 */}
      <H2>일시금 vs 연금, 세금이 얼마나 다른가요?</H2>
      <p style={{ ...body, marginBottom: 10 }}>
        IRP에 들어온 퇴직금을 꺼낼 때 세금이 달라져요. 일시금으로 꺼내면 퇴직소득세를 그대로 내고, 55세 이후 연금으로 나눠 받으면 퇴직소득세가 30% 줄어들어요. 퇴직금이 클수록 절세 금액도 커지죠.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        아래 계산기로 퇴직금 규모별 세금 차이를 미리 확인해보세요. 퇴직소득세는 근속연수와 소득에 따라 달라지기 때문에 정확한 세액은{" "}
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          퇴직소득세 계산
        </a>{" "}
        글에서 따로 확인하세요.
      </p>
      <SectionBadge>퇴직금 세금 간편 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="퇴직소득세 5% 기준 단순 추정값이에요. 실제 세액은 근속연수·급여에 따라 달라져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3 */}
      <H2>계좌 개설할 때 뭘 준비해야 하나요?</H2>
      <p style={{ ...body, marginBottom: 10 }}>
        IRP 계좌는 은행·증권사 앱에서 10분이면 개설돼요. 신분증과 기존 계좌만 있으면 대부분 가능하고, 일부 금융사는 재직증명서를 요구하기도 해요. 증권사 앱을 처음 써본다면 공동인증서나 금융인증서를 먼저 발급해두세요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        수수료도 미리 비교해야 해요. 증권사 IRP는 운용 수수료가 연 0.2% 수준인데, 은행 IRP는 0.5%까지 올라가요. 퇴직금이 클수록 수수료 차이가 눈에 띄게 나오니까 금융감독원 금융상품한눈에(finlife.fss.or.kr)에서 비교하고 고르세요.
      </p>
      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4 */}
      <H2>개설부터 이체 확인까지, 4단계로 끝내요</H2>
      <p style={{ ...body, marginBottom: 10 }}>
        IRP 수령 절차는 생각보다 단순해요. 개설하고, 인사팀에 알리고, 14일 안에 들어왔는지 확인하면 돼요. 마지막에 연금/일시금 방향만 결정하면 끝이에요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        인사팀에 계좌번호를 구두로 말하면 나중에 분쟁이 생길 수 있어요. 문자나 메일로 계좌번호를 남겨두면 증거가 되고, 혹시 늦게 들어왔을 때 책임 소재도 명확해져요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5 */}
      <H2>놓치기 쉬운 것들, 퇴직 전에 한 번 더 체크하세요</H2>
      <p style={{ ...body, marginBottom: 10 }}>
        퇴직 당일에는 챙겨야 할 게 많아서 IRP 관련 절차를 빠뜨리는 경우가 있어요. 아래 체크리스트를 퇴직 전날 한 번, 퇴직 후 14일째 한 번 보세요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        특히 수수료는 미리 비교하지 않으면 나중에 바꾸기 번거로워요. 운용 기간이 길수록 수수료 차이가 쌓이기 때문에 개설 전에 꼭 따져보세요.
      </p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <GreenBox title="14일 지나도 돈이 안 왔다면">
        1단계: 인사팀에 입금 여부 재확인 요청<br />
        2단계: 고용노동부 퇴직급여 지급 지연 신고 (☎ 1350)<br />
        3단계: 신고 시 지연이자 연 20% 청구 가능
      </GreenBox>

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 계좌로 퇴직금 받을 때 헷갈리는 것들을 모았어요. 특히 55세 이전 중도 인출이나 ETF 투자 여부는 금융사마다 조건이 달라서 사전에 확인하는 게 좋아요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 금융감독원(1332)에서 확인하세요." />
    </ArticleLayout>
  );
}
