"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "본인과 세대원(배우자 포함) 전체가 무주택이에요" },
  { id: "c2", label: "매매계약서(또는 분양계약서, 전세계약서)를 체결했어요" },
  { id: "c3", label: "1년 이상 같은 회사에서 근무 중이에요" },
  { id: "c4", label: "무주택 확인서를 발급받을 수 있어요" },
];

const CHECKLIST = [
  "매매계약서 또는 분양계약서 — 매수자 본인 이름 확인",
  "전세계약서 — 전세 보증금 사유인 경우",
  "무주택 확인서 — 정부24 온라인 발급 또는 주민센터 방문",
  "중간정산 신청서 — 회사 양식 또는 자유 양식",
  "재직증명서 및 급여명세서 — 근속기간·평균임금 산정용",
];

const FAQS = [
  {
    q: "분양권 당첨도 주택 구입 사유에 해당하나요?",
    a: "네, 분양계약서를 체결한 경우에도 주택 구입 사유로 인정돼요. 분양계약서와 무주택 확인서를 함께 제출하면 되죠.",
  },
  {
    q: "배우자 명의로 집을 사도 내 퇴직금으로 중간정산 가능한가요?",
    a: "배우자 명의로 매수하면 본인이 무주택이 아니게 돼요. 중간정산 사유 자체가 '무주택자의 주택 구입'이니까, 본인 명의로 취득해야 하죠.",
  },
  {
    q: "이미 집이 있는데 이사하려고 새 집을 사는 건 해당되나요?",
    a: "안 돼요. 이미 주택을 소유하고 있으면 무주택이 아니니까 이 사유를 쓸 수 없죠. 기존 집을 처분하고 무주택 상태가 돼야 가능해요.",
  },
  {
    q: "전세 보증금이 올라서 추가 자금이 필요한 경우도 되나요?",
    a: "가능해요. 기존 전세계약서와 갱신(또는 신규) 전세계약서를 함께 제출해서 보증금 인상분을 증명하면 되죠.",
  },
  {
    q: "중간정산 후 이직하면 어떻게 되나요?",
    a: "법적으로 문제는 없어요. 중간정산은 이미 완료된 거니까요. 이직 후 새 회사에서 근속연수가 0부터 다시 쌓이고, 퇴직금도 새로 계산되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 시행령 제3조 제1호 — 주택 구입 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "정부24 — 무주택 확인서 발급", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "중간정산 조건 상세",
    description: "주택 구입 외 다른 법정 사유와 조건을 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-사유별-증빙서류",
    title: "사유별 증빙서류 목록",
    description: "각 법정 사유에 맞는 증빙서류를 구체적으로 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-세금",
    title: "중간정산 세금 계산",
    description: "중간정산 시 퇴직소득세가 어떻게 계산되는지 안내해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-중간정산-주택구입"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 주택 구입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 주택 구입,<br />
        조건과 절차는?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;내 집 마련에 퇴직금을 쓸 수 있다는데, 어떻게 하면 되나요?&rdquo;<br />
        무주택자라면 가능해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 시행령</a>에서 무주택자의 주택 구입을 중간정산 법정 사유로 인정하고 있죠.
        전세 보증금 마련도 같은 항목이에요.
        무주택 기준, 필요 서류, 신청 절차를 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>주택 구입으로 중간정산 가능한 조건은?</H2>
      <p style={body}>
        조건은 딱 두 가지예요. 첫째, <strong>무주택</strong>이어야 해요. 본인뿐 아니라 세대원(배우자 포함) 전체가 주택을 소유하지 않아야 하죠. 분양권도 주택으로 간주되니까 분양받은 적이 있다면 해당되지 않아요.
      </p>
      <p style={body}>
        둘째, <strong>주택을 구입하기 위해 자금이 필요한 상황</strong>이어야 해요. 매매계약서, 분양계약서, 전세계약서 중 하나를 체결한 상태여야 하죠. &ldquo;내년에 집을 살 계획이에요&rdquo; 같은 미래 계획만으로는 안 돼요.
      </p>
      <p style={body}>
        계약서 체결 후 잔금 납부 전에 신청하는 게 일반적이에요. 잔금일에 맞춰 정산금을 받아야 하니까, 충분한 여유를 두고 회사에 신청하세요. 회사 내부 처리 기간이 2주~1개월 정도 걸릴 수 있거든요.
      </p>

      <GreenBox title="주택 구입 중간정산 핵심 조건">
        1. <strong>세대원 전체 무주택</strong> (배우자 포함, 분양권도 주택으로 간주)<br />
        2. <strong>매매·분양·전세 계약서</strong>를 체결한 상태<br />
        3. 잔금 납부를 위해 <strong>자금이 실제로 필요</strong>한 상황
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="조건에 해당돼요. 서류를 준비해서 회사 인사팀에 신청하세요."
        partialMatchText="일부 조건이 부족해요. 무주택 여부와 계약서를 먼저 확인하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>무주택 기준이 뭔가요?</H2>
      <p style={body}>
        &ldquo;무주택&rdquo;이란 본인과 세대원 전체가 주택을 소유하고 있지 않은 상태예요. 세대원에는 배우자가 포함되니까, 배우자 명의 주택이 있으면 &ldquo;유주택&rdquo;으로 판단하죠.
      </p>
      <p style={body}>
        분양권(입주 전)도 주택으로 봐요. 청약에 당첨돼서 분양 계약을 체결했다면 이미 주택 소유자로 간주되는 거죠. 다만 분양권을 양도(전매)한 경우에는 다시 무주택 상태가 될 수 있어요.
      </p>
      <p style={body}>
        무주택 여부는 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 &ldquo;주택 소유 여부 확인서&rdquo;를 발급받아 확인할 수 있어요. 온라인으로 몇 분이면 발급되죠. 주민센터 방문으로도 가능하고요.
      </p>

      <BorderBox title="상속받은 지분도 주택인가요?">
        공동 상속으로 주택 지분을 소유하고 있으면 유주택으로 볼 수 있어요.<br />
        다만 지분이 매우 소액이거나 처분이 어려운 경우 예외가 인정되기도 하죠.<br />
        애매하면 고용노동부(1350)에 상담해보세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>필요한 서류는 뭔가요?</H2>
      <p style={body}>
        핵심 서류는 <strong>매매계약서</strong>(또는 분양·전세계약서)와 <strong>무주택 확인서</strong> 두 가지예요. 여기에 중간정산 신청서, 재직증명서, 급여명세서를 추가로 준비하면 돼요.
      </p>
      <p style={body}>
        매매계약서에는 매수자 이름, 매매 금액, 잔금일이 적혀 있어야 해요. 매수자 이름이 본인 이름과 일치하는지 꼭 확인하세요. 분양계약서라면 분양 대금과 납부 일정이 나와 있어야 하죠.
      </p>
      <p style={body}>
        전세 보증금 사유라면 전세계약서와 무주택 확인서를 제출하면 돼요. 기존 전세에서 보증금이 올라 추가 자금이 필요한 경우, 이전 계약서와 새 계약서를 함께 내면 보증금 인상분을 증명할 수 있죠.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 */}
      <H2>중간정산 후 이직하면 어떻게 되나요?</H2>
      <p style={body}>
        중간정산과 이직은 별개의 문제예요. 정산을 받은 뒤 이직해도 법적으로 아무 문제가 없죠. 중간정산은 이미 완료된 거니까, 받은 돈을 돌려줄 필요도 없어요.
      </p>
      <p style={body}>
        이직하면 새 회사에서 근속연수가 0부터 다시 쌓여요. 이전 회사에서 중간정산한 기간은 새 회사 퇴직금에 영향을 주지 않죠. 새 회사에서 1년 이상 근무하면 그때부터 퇴직금이 다시 발생해요.
      </p>
      <p style={body}>
        다만 중간정산 직후에 퇴사하면 추가 퇴직금이 거의 없다는 점을 기억하세요. 정산받은 시점부터 퇴직일까지의 기간만 퇴직금 계산에 반영되니까, 며칠 만에 퇴사하면 추가 퇴직금이 사실상 0이에요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>주택 구입 중간정산 시 주의할 점은?</H2>
      <p style={body}>
        <strong>시간 여유</strong>를 충분히 두세요. 잔금일이 코앞인데 급하게 신청하면 정산금이 제때 안 나올 수 있어요. 매매계약 체결 후 바로 회사에 알리고, 서류 준비를 병행하는 게 안전하죠.
      </p>
      <p style={body}>
        <strong>세금 영향</strong>도 미리 계산하세요. 중간정산하면 근속연수가 리셋되니까, 최종 퇴직 시 세금이 더 나올 수 있어요. 주택 구입 자금이 충분하다면 중간정산 대신 주택담보대출이 세금 면에서 유리할 수도 있죠.
      </p>
      <p style={body}>
        중간정산 확인서를 꼭 받아두세요. 나중에 퇴직할 때 최종 퇴직금 계산의 기산점을 증명하는 서류예요. 이걸 분실하면 근속연수 산정에 혼란이 생길 수 있으니, 안전한 곳에 보관하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주택 구입 중간정산에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
