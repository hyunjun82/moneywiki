"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "법정 사유(주택 구입, 장기 요양, 천재지변 등)에 해당하는 상황이에요" },
  { id: "c2", label: "사유를 증명할 서류(계약서, 진단서 등)를 준비할 수 있어요" },
  { id: "c3", label: "현재 재직 중이고 1년 이상 근무했어요" },
  { id: "c4", label: "회사에 중간정산 신청서를 제출할 준비가 됐어요" },
];

const CHECKLIST = [
  "중간정산 신청서 — 회사 양식 또는 자유 양식 (사유·금액·서류 목록 기재)",
  "법정 사유 증빙 — 매매계약서, 진단서, 피해확인서 등 (사유에 따라 다름)",
  "재직증명서 — 근속기간 확인",
  "급여명세서 — 최근 3개월분 (평균임금 산정 기준)",
  "가족관계증명서 — 부양가족 요양 사유인 경우",
];

const FAQS = [
  {
    q: "법정 사유가 6가지뿐인가요?",
    a: "시행령에 열거된 사유가 기본이에요. 다만 대통령령 개정으로 추가될 수 있고, 퇴직연금 제도 전환(DB→DC)도 실질적으로 중간정산에 해당하죠.",
  },
  {
    q: "신청하면 바로 돈이 나오나요?",
    a: "회사마다 처리 기간이 달라요. 보통 서류 제출 후 2주~1개월 정도 걸리고, 증빙서류 보완이 필요하면 더 길어질 수 있죠.",
  },
  {
    q: "신청서 양식이 법으로 정해져 있나요?",
    a: "법정 양식은 없어요. 회사 인사팀에서 자체 양식을 쓰는 경우가 많고, 없으면 자유 양식으로 작성해도 되죠. 사유, 금액, 증빙서류 목록만 명확히 적으면 돼요.",
  },
  {
    q: "회사가 거부하면 어떻게 하나요?",
    a: "법정 사유에 해당하면 회사는 거부할 수 없어요. 서면으로 재요청하고, 그래도 안 되면 고용노동부(1350) 상담 후 노동청 진정을 넣으세요.",
  },
  {
    q: "중간정산 후 바로 퇴사하면 문제가 되나요?",
    a: "법적으로 문제는 없어요. 다만 중간정산 직후 퇴사하면 추가 퇴직금이 거의 없으니, 자금 계획을 세워두는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조 — 퇴직금 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여 보장법 시행령 제3조 — 법정 사유 목록", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "중간정산 조건 상세",
    description: "법정 사유별 세부 조건과 해당 여부를 상세히 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-신청서",
    title: "중간정산 신청서 작성법",
    description: "신청서에 꼭 들어가야 할 내용과 작성 시 주의할 점을 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-사유별-증빙서류",
    title: "사유별 증빙서류 목록",
    description: "주택 구입, 질병, 천재지변 등 사유별로 필요한 서류를 안내해요.",
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
          currentSlug="퇴직금-중간정산-신청-법정-사유-절차"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정 사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 법정 사유와<br />
        신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;중간정산을 받고 싶은데, 내 사유가 인정될지 모르겠어요.&rdquo;<br />
        법이 정한 사유에 해당하면 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 시행령</a>이 사유를 구체적으로 열거하고 있죠.
        법정 사유가 무엇인지, 사유별 증빙은 뭘 준비해야 하는지, 회사가 거부하면 어떻게 하는지까지 절차를 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>법정 사유가 뭔가요?</H2>
      <p style={body}>
        법정 사유란 법이 &ldquo;이 경우에는 퇴직금을 미리 정산해도 된다&rdquo;고 인정한 사유예요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>시행령 제3조</a>에 구체적으로 나열돼 있죠. 2012년 개정 이후 이 사유가 아니면 중간정산 자체가 불가능해요.
      </p>
      <p style={body}>
        주요 사유는 무주택자의 주택 구입·전세금 마련, 본인 또는 부양가족의 6개월 이상 요양, 천재지변 피해, 임금피크제·근로시간 단축으로 인한 급여 감소, 파산 선고·개인회생이에요. 이 밖에 퇴직연금 제도 전환(DB→DC)으로 기존 적립금을 정산하는 경우도 실질적 중간정산에 해당하죠.
      </p>
      <p style={body}>
        각 사유마다 증빙서류가 다르기 때문에, 내가 어떤 사유에 해당하는지를 먼저 확정하는 게 첫 번째 단계예요. 사유가 확정되면 해당 증빙을 모아서 신청서와 함께 제출하면 되죠.
      </p>

      <GreenBox title="주요 법정 사유 정리">
        1. 무주택자 <strong>주택 구입 · 전세 보증금</strong><br />
        2. 본인·부양가족 <strong>6개월 이상 요양</strong><br />
        3. <strong>천재지변</strong>(화재·수해 등) 피해<br />
        4. <strong>임금피크제·근로시간 단축</strong>으로 3개월 이상 임금 감소<br />
        5. <strong>파산 선고 또는 개인회생</strong> 결정<br />
        6. 퇴직연금 <strong>DB→DC 전환</strong> 시 기존 적립금 정산
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="법정 사유와 서류가 준비됐네요. 회사 인사팀에 신청서를 제출하세요."
        partialMatchText="일부 조건을 더 갖춰야 해요. 부족한 서류를 확인하고 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>사유별 증빙서류가 다른가요?</H2>
      <p style={body}>
        네, 사유마다 필요한 서류가 완전히 달라요. <strong>주택 구입</strong>이라면 매매계약서(또는 분양계약서)와 무주택 확인서가 필수이고, <strong>전세</strong>는 전세계약서와 무주택 확인서가 필요하죠.
      </p>
      <p style={body}>
        <strong>질병·요양</strong> 사유는 의사 진단서가 핵심이에요. &ldquo;6개월 이상 요양이 필요하다&rdquo;는 내용이 명시돼야 하죠. 부양가족의 질병이면 가족관계증명서도 함께 제출해야 해요.
      </p>
      <p style={body}>
        <strong>천재지변</strong>은 관할 지자체가 발급하는 피해사실 확인서, <strong>파산·개인회생</strong>은 법원 결정문이 증빙이 돼요. <a href="/w/퇴직금-중간정산-사유별-증빙서류" style={{ color: "#1D9E75", textDecoration: "underline" }}>사유별 증빙서류</a> 글에서 각 서류를 더 구체적으로 안내하고 있으니 참고하세요.
      </p>

      <BorderBox title="서류가 부족하면 어떻게 되나요?">
        증빙서류가 불완전하면 회사가 보완을 요청할 수 있어요.<br />
        서류 보완 기간 동안 정산이 지연되니, 처음부터 빠짐없이 준비하는 게 중요하죠.<br />
        어떤 서류가 필요한지 모르겠으면 인사팀에 미리 문의하세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        절차는 생각보다 단순해요. 먼저 회사 인사팀에서 중간정산 신청서 양식을 받으세요. 양식이 없으면 자유 양식으로 작성해도 돼요. 신청서에는 정산 사유, 희망 금액, 첨부 증빙서류 목록을 적으면 되죠.
      </p>
      <p style={body}>
        신청서와 증빙서류를 함께 인사팀에 제출하면 회사가 검토해요. 서류에 문제가 없으면 평균임금을 산정하고 정산 금액을 확정하죠. 보통 제출 후 2주~1개월이면 정산금이 지급돼요.
      </p>
      <p style={body}>
        정산금에서 퇴직소득세가 원천징수된 후 입금돼요. 세금이 빠진 금액을 받게 되니, 실수령액이 예상보다 적을 수 있죠. 세금 부분이 궁금하면 <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금</a> 글을 참고하세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>회사가 거부하면 어떻게 하나요?</H2>
      <p style={body}>
        법정 사유에 해당하는데 회사가 거부하면 이건 법 위반이에요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>에 따라 사용자는 정당한 사유 없이 중간정산을 거부할 수 없죠.
      </p>
      <p style={body}>
        먼저 서면(이메일 또는 내용증명)으로 재요청하세요. 구두 요청만으로는 기록이 남지 않아서, 나중에 분쟁이 생겼을 때 증거가 부족해질 수 있거든요. 서면에는 법정 사유, 근거 법령, 증빙서류 목록을 적어두세요.
      </p>
      <p style={body}>
        서면 요청 후에도 거부하면 고용노동부(1350)에 전화 상담을 받고, 관할 노동청에 진정을 제기하세요. 온라인으로도 가능하고(고용노동부 민원마당), 노동청에서 사실 조사 후 시정 지시를 내리면 회사가 따라야 하죠.
      </p>

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 */}
      <H2>신청 후 얼마나 걸리나요?</H2>
      <p style={body}>
        회사마다 내부 처리 기간이 달라요. 서류가 완벽하면 2주 안에 처리되는 곳도 있고, 내부 결재 단계가 많으면 1개월 이상 걸리기도 하죠. 큰 회사일수록 절차가 길어지는 경향이 있어요.
      </p>
      <p style={body}>
        증빙서류 보완이 필요하면 처리 기간이 더 늘어나요. 처음부터 빠짐없이 준비하는 게 시간을 아끼는 가장 좋은 방법이죠. 인사팀에 필요한 서류 목록을 미리 받아두면 한 번에 끝낼 수 있어요.
      </p>
      <p style={body}>
        주택 구입처럼 잔금 납부일이 정해진 경우, 충분한 여유를 두고 신청해야 해요. 잔금일 2~3개월 전에 신청하면 시간에 쫓기지 않죠. 신청 진행 상황은 인사팀에 주기적으로 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 법정 사유와 신청 절차에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
