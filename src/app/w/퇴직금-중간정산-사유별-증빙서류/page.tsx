"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "중간정산 사유(주택, 질병, 재난 등)가 확정됐어요" },
  { id: "c2", label: "해당 사유에 맞는 증빙서류를 발급받을 수 있어요" },
  { id: "c3", label: "서류에 핵심 내용(금액, 기간, 명의 등)이 빠짐없이 적혀 있어요" },
  { id: "c4", label: "서류 유효기간이 지나지 않았어요" },
];

const CHECKLIST = [
  "주택 구입 — 매매계약서 + 무주택 확인서 (정부24 발급)",
  "전세 보증금 — 전세계약서 + 무주택 확인서",
  "질병·요양 — 진단서 (6개월 이상 요양 필요 명시) + 가족관계증명서 (부양가족일 때)",
  "천재지변 — 피해사실 확인서 (관할 지자체 발급) + 피해 사진",
  "파산·개인회생 — 법원 결정문 사본",
];

const FAQS = [
  {
    q: "증빙서류를 사본으로 내도 되나요?",
    a: "회사마다 다르지만, 대부분 사본도 받아요. 다만 원본 확인을 요청할 수 있으니 원본은 따로 보관해두세요.",
  },
  {
    q: "진단서에 '6개월'이라는 문구가 없으면 어떡하나요?",
    a: "병원에 요청해서 요양 기간을 명시해달라고 하세요. 진단서 재발급이 가능하고, '장기 요양이 필요하다'는 소견이 핵심이에요.",
  },
  {
    q: "무주택 확인서는 어디서 발급받나요?",
    a: "정부24(gov.kr)에서 온라인 발급이 가능해요. 주민센터 방문으로도 받을 수 있죠. 세대원 전체의 주택 소유 여부가 나와요.",
  },
  {
    q: "서류 유효기간이 있나요?",
    a: "법적으로 정해진 유효기간은 없지만, 회사에서 '최근 3개월 이내 발급분'을 요구하는 경우가 많아요. 가능하면 신청 직전에 발급받으세요.",
  },
  {
    q: "증빙서류를 갖추지 못하면 신청 자체가 안 되나요?",
    a: "서류 없이는 회사가 정산해줄 수 없어요. 법정 사유를 증명하는 게 근로자 쪽 의무이니, 서류를 먼저 확보한 뒤 신청하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 시행령 제3조 — 중간정산 사유 및 증빙", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
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
    description: "법정 사유별 조건과 해당 여부를 자세히 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-주택구입",
    title: "주택 구입 중간정산",
    description: "무주택 주택 구입으로 중간정산받는 절차를 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-신청서",
    title: "중간정산 신청서 작성법",
    description: "신청서에 어떤 내용을 적어야 하는지 안내해요.",
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
          currentSlug="퇴직금-중간정산-사유별-증빙서류"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 증빙서류</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 사유별 증빙서류,<br />
        뭘 준비해야 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;중간정산 신청하려는데 서류가 뭐가 필요한지 모르겠어요.&rdquo;<br />
        사유마다 필요한 서류가 완전히 달라요.
        주택 구입이면 매매계약서, 질병이면 진단서, 천재지변이면 피해확인서가 필요하죠.
        빠뜨리면 보완 요청이 오면서 정산이 지연되니까, 한 번에 준비하는 게 중요해요.
        사유별로 어떤 서류가 필요한지 하나씩 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>주택 구입 사유 시 필요한 서류는?</H2>
      <p style={body}>
        주택 구입으로 중간정산을 받으려면 <strong>매매계약서</strong>(또는 분양계약서)와 <strong>무주택 확인서</strong>가 필수예요. 매매계약서에는 매수자 이름, 매매 금액, 잔금일이 적혀 있어야 하죠.
      </p>
      <p style={body}>
        무주택 확인서는 정부24(gov.kr)에서 온라인으로 발급받을 수 있어요. 주민센터 방문도 가능하고요. 이 서류에 세대원 전체의 주택 소유 여부가 나오기 때문에, 배우자 명의 주택이 있으면 &ldquo;유주택&rdquo;으로 나와요.
      </p>
      <p style={body}>
        <strong>전세 보증금</strong> 사유라면 전세계약서와 무주택 확인서를 제출하면 돼요. 기존 전세에서 보증금이 올라 추가 자금이 필요한 경우, 이전 계약서와 새 계약서를 함께 내면 보증금 인상분을 증명할 수 있죠.
      </p>

      <GreenBox title="주택 관련 서류 요약">
        <strong>매매</strong>: 매매계약서 + 무주택 확인서<br />
        <strong>전세</strong>: 전세계약서 + 무주택 확인서<br />
        <strong>공통</strong>: 세대원 전체가 무주택이어야 해요
      </GreenBox>

      <SectionBadge>내 서류 상태 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="서류가 준비됐네요. 신청서와 함께 인사팀에 제출하세요."
        partialMatchText="일부 서류가 부족해요. 빠진 항목을 확인하고 발급받으세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>질병 치료 사유 시 필요한 서류는?</H2>
      <p style={body}>
        본인 또는 부양가족이 <strong>6개월 이상 요양</strong>이 필요한 경우에 해당돼요. 핵심 서류는 <strong>의사 진단서</strong>예요. 진단서에 &ldquo;6개월 이상 요양이 필요하다&rdquo;는 소견이 반드시 포함돼야 하죠.
      </p>
      <p style={body}>
        부양가족의 질병이라면 <strong>가족관계증명서</strong>도 필요해요. 환자가 배우자인지, 부모인지, 자녀인지를 증명하는 서류죠. 정부24에서 온라인 발급이 가능하고요. 치료비 영수증이나 입원확인서를 추가로 제출하면 심사가 더 수월해져요.
      </p>
      <p style={body}>
        진단서를 받을 때 주의할 점이 있어요. &ldquo;입원 치료가 필요하다&rdquo; 정도로는 부족할 수 있죠. &ldquo;6개월 이상 장기 치료(또는 요양)가 필요하다&rdquo;는 문구를 의사에게 요청하세요. 이 문구가 있어야 법정 사유 증빙으로 인정받을 수 있어요.
      </p>

      <BorderBox title="진단서 요청 시 참고">
        병원에서 진단서를 발급받을 때 &ldquo;퇴직금 중간정산 증빙용입니다. 요양 기간을 명시해주세요&rdquo;라고 말하면 돼요.<br />
        의사가 법정 사유를 알고 있으면 적합한 문구를 넣어주죠.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>재난 사유 시 필요한 서류는?</H2>
      <p style={body}>
        화재, 홍수, 태풍 등 <strong>천재지변</strong>으로 재산 피해를 입은 경우에 해당돼요. 핵심 증빙은 관할 지방자치단체(시·군·구청)가 발급하는 <strong>피해사실 확인서</strong>예요.
      </p>
      <p style={body}>
        피해 규모를 보여줄 수 있는 <strong>사진</strong>이나 영상 자료도 함께 제출하면 좋아요. 보험 접수 서류, 소방서 화재 증명원 등 추가 증빙이 있으면 심사가 빨라지죠.
      </p>
      <p style={body}>
        피해사실 확인서는 재난 발생 직후 관할 구청(또는 읍면동 행정복지센터)에 신청하면 돼요. 대규모 재난의 경우 정부에서 일괄 조사하기도 하니, 지자체 안내를 확인하세요. 서류 발급까지 시간이 걸릴 수 있어서 재난 직후 바로 신청하는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>서류를 갖추지 못하면 신청이 안 되나요?</H2>
      <p style={body}>
        안타깝지만 증빙서류 없이는 중간정산이 어려워요. 법정 사유에 해당한다는 걸 <strong>서류로 증명하는 책임이 근로자</strong>에게 있거든요. 회사 입장에서도 서류 없이 정산해줬다가 나중에 문제가 생기면 곤란하죠.
      </p>
      <p style={body}>
        서류 발급이 어려운 사정이 있다면 회사 인사팀과 먼저 상의해보세요. &ldquo;발급 중인데 2주 뒤에 제출하겠다&rdquo;처럼 일정을 조율할 수 있는 경우도 있어요. 다만 서류가 완전히 갖춰지기 전까지 정산금 지급은 보류되는 게 일반적이죠.
      </p>
      <p style={body}>
        어떤 서류가 필요한지 잘 모르겠으면 고용노동부(1350)에 전화 상담을 받아보세요. 본인 사유에 맞는 서류 목록을 구체적으로 안내받을 수 있어요. 무료이고 전화 한 통이면 돼요.
      </p>

      <SectionBadge>사유별 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 */}
      <H2>서류 준비 시 주의할 점은?</H2>
      <p style={body}>
        <strong>유효기간</strong>에 신경 쓰세요. 법적으로 정해진 유효기간은 없지만, 많은 회사가 &ldquo;최근 3개월 이내 발급분&rdquo;을 요구해요. 너무 일찍 발급받으면 다시 받아야 할 수 있으니, 신청 시점에 맞춰 발급하는 게 효율적이죠.
      </p>
      <p style={body}>
        <strong>서류 간 정보 일치</strong>도 중요해요. 매매계약서의 매수자 이름과 재직증명서의 이름이 같아야 하고, 진단서의 환자 이름과 가족관계증명서의 정보가 맞아야 하죠. 사소한 불일치도 보완 사유가 될 수 있어요.
      </p>
      <p style={body}>
        원본과 사본을 모두 준비해두세요. 회사에 사본을 제출하되, 원본은 본인이 보관하는 게 안전해요. 나중에 세금 정산이나 분쟁 시 원본이 필요할 수 있거든요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 증빙서류에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 회사별 내부 규정이 다를 수 있으니, 인사팀에 미리 확인하세요." />
    </ArticleLayout>
  );
}
