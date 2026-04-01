"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴직했거나 곧 퇴직하는데, 퇴직연금을 어떻게 받는지 절차를 모르는 상황
// Q2. 본인 나이(55세 기준)와 연금 유형(DB/DC/IRP)에 맞는 수령 방법을 파악하고 금융사에서 인출 신청하는 행동
// Q3. 55세 기준 수령 방법 차이, DB·DC·IRP별 절차, IRP 인출 단계, 필요 서류, 일시금·연금 세금 차이, 중도인출 조건
// Q4. GreenBox(55세 기준 요약) + Steps(IRP 인출 절차) + BorderBox(세금 비교) + Checklist(수령 전 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const IRP_STEPS = [
  {
    title: "퇴직금 입금 확인",
    desc: "퇴직 후 회사가 퇴직연금을 IRP 계좌로 이체해요. 보통 퇴직일로부터 14일 이내에 입금돼요. 금융사 앱에서 IRP 잔액을 확인하세요.",
    tip: "입금이 안 됐으면 회사 인사팀에 문의하세요. 법정 지급기한은 퇴직 후 14일이에요.",
  },
  {
    title: "금융사 앱에서 인출 신청",
    desc: "IRP 가입 금융사(은행·증권사) 앱에 로그인해서 '퇴직금 인출' 또는 '일시금 인출' 메뉴를 찾아요. 본인인증 후 수령 계좌 정보를 입력하면 돼요.",
    tip: "앱이 어려우면 영업점 방문이나 고객센터 전화로도 가능해요. 신분증만 있으면 돼요.",
  },
  {
    title: "세금 공제 후 입금",
    desc: "퇴직소득세가 원천징수되고 세후 금액이 본인 계좌로 입금돼요. 보통 신청 후 1~3영업일 이내예요. 연금으로 받겠다면 이 단계에서 '연금개시' 신청을 하면 돼요.",
    tip: "연금 수령 시 퇴직소득세의 70%만 내요. 11년 차부터는 60%만 내고요.",
  },
];

const CHECKLIST = [
  "내 퇴직연금 유형 확인: DB형인지 DC형인지 IRP인지",
  "만 나이 55세 이상인지 확인 (미만이면 IRP 경유 필수)",
  "여러 회사 다녔으면 금융사별 퇴직연금 잔액 각각 확인",
  "일시금 vs 연금 세금 차이 시뮬레이션 (금융사 앱에서 가능)",
  "중도인출 필요 시 법정 사유 해당 여부 확인",
  "금융감독원 통합연금포털에서 전체 퇴직연금 조회",
];

const FAQS = [
  {
    q: "55세 전에 퇴직하면 돈을 아예 못 받나요?",
    a: "아니에요. IRP로 받은 뒤 인출하면 퇴직소득세를 내고 바로 현금화할 수 있어요. 다만 연금 수령은 55세까지 기다려야 해요.",
  },
  {
    q: "DB형과 DC형, 수령 방법이 다른가요?",
    a: "큰 틀은 같아요. 둘 다 55세 이후면 일시금·연금 선택 가능하고, 55세 미만이면 IRP로 받아요. 차이는 금액 계산 방식이에요. DB형은 평균임금 x 근속연수, DC형은 적립금 + 운용수익이에요.",
  },
  {
    q: "퇴직연금이 300만 원 이하인데, IRP로 꼭 받아야 하나요?",
    a: "아니에요. 퇴직급여가 300만 원 이하면 IRP를 거치지 않고 바로 본인 계좌로 일시금 수령이 가능해요.",
  },
  {
    q: "여러 회사에서 퇴직연금이 쌓여 있으면 어떻게 하나요?",
    a: "각 금융사에 따로 신청해야 해요. 금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 모든 퇴직연금 현황을 한 번에 조회할 수 있어요.",
  },
  {
    q: "연금으로 받다가 중간에 일시금으로 바꿀 수 있나요?",
    a: "가능해요. 남은 금액을 일시금으로 전환할 수 있어요. 대신 그 금액에는 퇴직소득세가 원래대로 적용돼요. 연금 수령으로 받던 세금 혜택은 사라지는 거예요.",
  },
  {
    q: "중도인출은 아무 때나 되나요?",
    a: "안 돼요. 무주택자 주택구입, 전세보증금, 6개월 이상 요양비, 파산·개인회생 등 법정 사유에 해당해야 해요. 사유 없이 인출하면 기타소득세 16.5%가 붙어요.",
  },
  {
    q: "퇴직연금 수령 시 필요한 서류가 뭐예요?",
    a: "온라인이면 본인인증(공동인증서·생체인증)만 있으면 돼요. 영업점 방문이면 신분증 지참하세요. 일부 금융사는 퇴직확인서를 요구하기도 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령·제도",
    items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 (퇴직소득세·연금소득세)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 수령", description: "세금 차이와 선택 기준을 비교해요." },
  { slug: "퇴직연금-연금수령", title: "퇴직연금 연금수령 조건과 세금", description: "55세부터 10년 이상 나눠 받으면 절세돼요." },
  { slug: "퇴직금-IRP-수령방법", title: "퇴직금 IRP 수령방법", description: "IRP 계좌 인출 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 수령방법, 55세 기준으로 달라져요<br />
        DB·DC·IRP 인출 절차와 세금 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직하고 나면 "퇴직연금을 어떻게 받지?"가 제일 먼저 떠오르죠.
        55세가 넘었는지 안 넘었는지에 따라 방법이 완전히 달라지고, 일시금으로 받느냐 연금으로 받느냐에 따라 세금도 크게 달라져요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          근로자퇴직급여보장법
        </a>
        에서 정한 기준을 바탕으로, 유형별 수령 절차와 세금 차이를 비교해 봤어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 55세 기준 ── */}
      <H2>55세가 넘었냐, 안 넘었냐가 전부예요</H2>
      <p style={body}>
        퇴직연금 수령의 분기점은 딱 하나, 만 55세예요.
        55세 이후에 퇴직하면 일시금이든 연금이든 자유롭게 선택할 수 있어요.
        55세 미만이면 일단 IRP 계좌로 받아야 하고, 거기서 인출 절차를 밟아야 해요.
      </p>

      <GreenBox>
        <strong>55세 이후 퇴직</strong><br />
        일시금 또는 연금 자유 선택 → 금융사 앱에서 바로 신청<br />
        연금 수령 시 퇴직소득세 30~40% 감면<br />
        <br />
        <strong>55세 미만 퇴직</strong><br />
        퇴직연금 → IRP 계좌로 입금 → IRP에서 인출 신청<br />
        일시금: 퇴직소득세 원천징수 후 지급<br />
        연금: 55세까지 기다린 뒤 연금개시 신청
      </GreenBox>

      <p style={body}>
        퇴직급여가 300만 원 이하면 IRP를 거치지 않고 바로 본인 계좌로 받을 수 있어요.
        그런데 유형별로 절차가 조금씩 다르니까, 하나씩 짚어볼게요.
      </p>

      <Divider />

      {/* ── 섹션 2: DB·DC별 차이 ── */}
      <H2>DB형과 DC형, 받는 절차가 다른가요?</H2>
      <p style={body}>
        큰 틀은 같아요. 둘 다 55세 이후면 일시금·연금 선택 가능하고, 55세 미만이면 IRP로 받아요.
        차이는 금액 산정 방식이에요.
      </p>

      <BorderBox>
        <strong>DB형(확정급여형)</strong><br />
        금액 = 퇴직 전 3개월 평균임금 x 30일 x 근속연수<br />
        회사가 금액을 계산해서 지급 → 운용 손익은 회사 부담<br />
        <br />
        <strong>DC형(확정기여형)</strong><br />
        금액 = 매년 적립한 부담금 + 운용수익(또는 손실)<br />
        내가 운용한 결과가 수령액에 반영 → 수익이 났으면 그만큼 더 받아요<br />
        <br />
        <strong>공통</strong><br />
        55세 이후: 일시금 또는 연금 선택<br />
        55세 미만: IRP로 이체 → 인출 신청
      </BorderBox>

      <p style={body}>
        DC형은 본인이 투자한 결과가 곧 퇴직금이에요. 수익이 잘 나면 DB형보다 더 많이 받을 수도 있고, 반대로 손실이 나면 줄어들 수도 있죠.
        IRP에서 실제로 인출하는 절차는 어떻게 되는지 볼까요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      {/* ── 섹션 3: IRP 인출 절차 ── */}
      <H2>IRP 인출 절차, 3단계면 끝나요</H2>
      <p style={body}>
        55세 미만이든 이상이든, 퇴직연금이 IRP에 들어와 있으면 아래 절차로 인출해요.
        앱으로 하면 5분이면 끝나요.
      </p>

      <Steps steps={IRP_STEPS} />

      <p style={body}>
        영업점을 방문해도 같은 절차예요. 신분증만 가져가면 돼요.
        일부 금융사는 퇴직확인서를 별도로 요구하기도 하니 미리 전화로 확인하는 게 좋아요.
        그런데 일시금으로 받을지, 연금으로 나눠 받을지에 따라 세금이 크게 달라져요.
      </p>

      <Divider />

      {/* ── 섹션 4: 세금 비교 ── */}
      <H2>일시금 vs 연금, 세금이 이만큼 달라요</H2>
      <p style={body}>
        같은 금액을 받더라도 어떻게 받느냐에 따라 세금이 달라져요.
        2026년 기준으로{" "}
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          소득세법
        </a>
        에서 정한 세율을 비교해 볼게요.
      </p>

      <SectionBadge>수령 방식별 세금 비교</SectionBadge>
      <BorderBox>
        <strong>일시금 수령</strong><br />
        퇴직소득세 100% 부과 (근속연수 공제 적용)<br />
        한꺼번에 세금을 냄<br />
        <br />
        <strong>연금 수령 (10년 이내)</strong><br />
        퇴직소득세의 70%만 부과 → 30% 감면<br />
        <br />
        <strong>연금 수령 (11~20년 차)</strong><br />
        퇴직소득세의 60%만 부과 → 40% 감면<br />
        <br />
        <strong>연금 수령 (21년 차 이후, 2026년 신설)</strong><br />
        퇴직소득세의 50%만 부과 → 50% 감면<br />
        <br />
        <span style={{ fontSize: 12, color: "#6b7280" }}>
          출처: 소득세법, 2026년 1월 1일 이후 연금 수령분부터 적용
        </span>
      </BorderBox>

      <p style={body}>
        당장 목돈이 필요하지 않다면 연금 수령이 세금 면에서 훨씬 유리해요.{" "}
        <a href="/w/퇴직연금-수령-일시금-연금-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 일시금 vs 연금 비교</a>
        에서 구체적인 금액 시뮬레이션을 해볼 수 있어요. 수령 전에 마지막으로 점검할 사항이 남아 있어요.
      </p>

      <Divider />

      {/* ── 섹션 5: 수령 전 체크리스트 ── */}
      <H2>수령 전 점검 사항</H2>
      <p style={body}>
        퇴직연금을 급하게 인출하기 전에 아래 항목부터 확인하세요.
        특히 여러 회사를 다녔으면 금융사마다 따로 신청해야 하니까 빠뜨리지 않도록 해야 해요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        금융감독원 통합연금포털(<a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>100lifeplan.fss.or.kr</a>)에서 모든 금융사의 퇴직연금을 한 번에 조회할 수 있어요. 퇴직 전에 미리 확인해두면 수령 절차가 훨씬 빨라져요.
      </GreenBox>

      <Divider />

      {/* ── FAQ ── */}
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 개인 상황에 따라 세금과 절차가 달라질 수 있으니 금융사 상담을 받아보세요." />
    </ArticleLayout>
  );
}
