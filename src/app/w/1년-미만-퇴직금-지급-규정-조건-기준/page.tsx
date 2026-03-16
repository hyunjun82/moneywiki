"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const FAQS = [
  {
    q: "1년 미만이면 무조건 퇴직금을 못 받나요?",
    a: "법정 의무는 없지만, 취업규칙이나 단체협약에 1년 미만 지급 규정이 있으면 받을 수 있어요. 계약 갱신으로 기간이 합산되는 경우에도 대상이 되죠.",
  },
  {
    q: "소멸시효 3년이 지나면 방법이 없나요?",
    a: "법적으로 청구권이 소멸돼요. 다만 사업주가 소멸시효를 주장하지 않고 자발적으로 지급하면 받을 수 있죠. 현실적으로는 3년 이내에 청구하는 게 유일한 방법이에요.",
  },
  {
    q: "회사가 규정을 어기면 벌칙이 있나요?",
    a: "퇴직금 미지급은 근로자퇴직급여보장법 위반으로 3년 이하 징역 또는 3천만 원 이하 벌금에 해당해요. 고용노동부에 진정을 넣으면 근로감독관이 조사하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조 — 퇴직금의 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제49조 — 임금 청구권 소멸시효", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-1년미만",
    title: "1년 미만 근무, 퇴직금을 받을 수 있나요?",
    description: "1년 미만 퇴직금의 예외 사유와 회사 퇴사 유도 시 대처법을 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년, 기산점은 언제인가요?",
    description: "퇴직금 청구권이 소멸되는 시점과 시효 중단 방법을 설명해요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 절차와 방법",
    description: "사업주가 퇴직금을 안 줄 때 노동부 진정·고소 절차를 안내해요.",
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
          currentSlug="1년-미만-퇴직금-지급-규정-조건-기준"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 지급규정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 퇴직금 지급 규정,<br />
        정확한 조건은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;1년 미만인데 퇴직금을 받을 수 있는 경우가 있다면서요?&rdquo;<br />
        맞아요. 원칙은 &ldquo;1년 이상 근무&rdquo;지만, 예외 경로가 있죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>의 기본 규정부터, 예외가 인정되는 조건, 회사가 규정을 어길 때 대응법, 그리고 소멸시효까지 — 1년 미만 퇴직금의 법적 기준을 빠짐없이 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>법에서 정한 1년 미만 퇴직금 규정은 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제4조</a>는 &ldquo;사용자는 계속근로기간 1년에 대하여 30일분 이상의 평균임금을 퇴직금으로 퇴직하는 근로자에게 지급할 수 있는 제도를 설정하여야 한다&rdquo;고 규정하고 있어요. 핵심 요건은 <strong>계속근로기간 1년 이상</strong>이죠.
      </p>
      <p style={body}>
        이 말은 곧, 1년 미만 근무자에 대해서는 법이 퇴직금 지급 의무를 부과하지 않는다는 뜻이에요. 사업주가 자발적으로 줄 수는 있지만, 강제할 수 없죠. &ldquo;1년&rdquo;이란 입사일부터 퇴사일까지의 역일 기준 365일(또는 그 이상)을 의미하고요.
      </p>
      <p style={body}>
        여기에 하나 더, 4주 평균 <strong>주 소정근로시간 15시간 이상</strong>이라는 조건도 충족해야 해요. 1년 이상 다녔더라도 주 15시간 미만이면 퇴직금 대상이 아니죠. 두 조건이 동시에 충족돼야 법적 의무가 발생하는 구조예요.
      </p>

      <GreenBox title="법정 퇴직금 지급 요건">
        1. 계속근로기간 <strong>1년 이상</strong><br />
        2. 4주 평균 주 소정근로시간 <strong>15시간 이상</strong><br />
        두 조건을 모두 갖춰야 사업주에게 법적 지급 의무가 발생해요.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>1년 미만에도 퇴직금이 발생하는 경우는?</H2>
      <p style={body}>
        첫 번째는 <strong>취업규칙·단체협약</strong>에 1년 미만 지급 규정이 있는 경우예요. 법은 최소 기준을 정한 것이고, 회사가 더 유리한 조건을 설정하면 그게 적용되죠. 입사할 때 받은 취업규칙이나 사규를 꼭 확인해보세요.
      </p>
      <p style={body}>
        두 번째는 <strong>계약 갱신 합산</strong>이에요. 6개월 계약이 두 번 연속됐다면 12개월로 인정될 수 있죠. 대법원은 계약 사이에 공백이 없고, 업무 내용이 동일하며, 실질적으로 근로관계가 계속됐다면 합산해야 한다고 판시하고 있어요.
      </p>
      <p style={body}>
        세 번째는 <strong>부당해고 구제</strong>예요. 회사가 퇴직금 발생을 피하려고 1년 직전에 부당하게 해고했다면, 노동위원회에 구제신청을 할 수 있죠. 구제가 인정되면 해고 기간도 근속기간에 포함되기 때문에, 결과적으로 1년을 넘기게 돼요.
      </p>

      <BorderBox title="계약 갱신 합산 판단 기준">
        계약 사이 공백이 없거나 매우 짧았는지<br />
        업무 내용·근무 장소가 동일했는지<br />
        사업주가 재고용을 예정하고 있었는지<br />
        이 세 가지를 종합적으로 봐요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>조건을 충족했는지 어떻게 확인하나요?</H2>
      <p style={body}>
        가장 먼저 <strong>고용보험 피보험자격 이력</strong>을 조회해보세요. 고용24(ei.go.kr)에서 본인 이름으로 로그인하면 입사일·퇴사일·주 소정근로시간이 나오죠. 회사가 신고한 내용이 실제와 다르면 정정 요청도 가능하고요.
      </p>
      <p style={body}>
        <strong>근로계약서</strong>도 꼭 확인해야 해요. 입사일, 계약 기간, 주 소정근로시간이 기재돼 있죠. 계약서가 여러 장이면 갱신 이력이 보이니까 합산 여부를 판단하는 데 중요한 증거가 돼요.
      </p>
      <p style={body}>
        근로계약서가 없어도 포기하지 마세요. 급여 이체 내역, 출퇴근 기록, 카카오톡 업무 지시 내용 등이 모두 증거가 될 수 있어요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 상담전화 1350에 이런 자료를 가지고 문의하면 퇴직금 대상 여부를 안내받을 수 있죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>회사가 규정을 어기면 어떻게 하나요?</H2>
      <p style={body}>
        퇴직금 지급 의무가 있는데 안 주면 <strong>임금체불</strong>에 해당해요. 근로자퇴직급여보장법 위반으로 <strong>3년 이하 징역 또는 3천만 원 이하 벌금</strong>의 처벌을 받을 수 있죠. 퇴직금도 임금의 일종이기 때문이에요.
      </p>
      <p style={body}>
        대응 순서는 이래요. 먼저 사업주에게 <strong>퇴직금 지급을 요청</strong>하고, 무반응이면 <strong>내용증명</strong>을 보내세요. 그래도 안 주면 관할 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 임금체불 진정</a>을 넣으면 돼요. 근로감독관이 사업주를 불러 조사하고, 시정명령을 내리죠.
      </p>
      <p style={body}>
        시정명령에도 불응하면 검찰에 송치되고 형사처벌로 이어져요. 금액이 적다고 포기할 필요가 없어요. 노동부는 소액 사건도 적극적으로 처리하고 있으니까요. 온라인(고용노동부 민원마당)으로도 신고할 수 있어서 방문하지 않아도 돼요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직금 청구 소멸시효는 얼마나 되나요?</H2>
      <p style={body}>
        <strong>3년</strong>이에요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 따라 퇴직금 청구권은 퇴직일(마지막 근무일 다음 날)부터 3년이 지나면 소멸하죠. 3년이 넘으면 아무리 정당한 청구라도 법적으로 받아낼 수 없어요.
      </p>
      <p style={body}>
        소멸시효를 중단시키는 방법도 있어요. 내용증명을 보내거나, 노동부에 진정을 넣거나, 법원에 소송을 제기하면 시효가 중단되죠. 단, 내용증명만으로는 시효가 완전히 중단되지 않고 6개월 유예가 생기는 것이니, 그 안에 법적 조치를 취해야 해요.
      </p>
      <p style={body}>
        퇴사한 지 오래된 경우라면 소멸시효부터 따져봐야 해요. 퇴직일 기준으로 3년이 임박했다면 서둘러 노동부 진정을 넣으세요. 진정을 넣는 것만으로도 시효 중단 효력이 생기니까요. 지급 기한 <strong>14일</strong>과 지연이자 <strong>연 20%</strong>도 함께 청구할 수 있죠.
      </p>

      <GreenBox title="1년 미만 퇴직금 규정 핵심 정리">
        법정 의무: 계속근로기간 <strong>1년 이상 + 주 15시간 이상</strong><br />
        예외 경로: 취업규칙 특약 / 계약 합산 / 부당해고 구제<br />
        미지급 시: 노동부 진정 → 형사처벌 가능<br />
        소멸시효: 퇴직일로부터 <strong>3년</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금 규정에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
