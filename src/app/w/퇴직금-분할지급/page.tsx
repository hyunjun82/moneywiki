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
    q: "분할 지급 동의서를 쓰면 퇴직금을 못 받나요?",
    a: "받을 수 있어요. 퇴직금 분할 지급 약정은 근로자퇴직급여보장법에 따라 무효이기 때문에, 동의서를 썼어도 퇴직 시 별도로 퇴직금을 청구할 수 있죠.",
  },
  {
    q: "매달 퇴직금 명목으로 받은 돈은 돌려줘야 하나요?",
    a: "돌려줄 필요 없어요. 무효인 약정에 따라 지급된 금액은 급여로 간주되기 때문이죠. 퇴직 시 받는 퇴직금과는 별개예요.",
  },
  {
    q: "회사가 폐업하면 분할 지급 중인 퇴직금은 어떻게 되나요?",
    a: "분할 지급 약정 자체가 무효이니, 아직 퇴직금을 받지 못한 상태와 같아요. 회사가 폐업하면 체당금(국가 대위 지급) 제도를 통해 퇴직금을 받을 수 있죠. 고용노동부에 체당금 신청을 하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조 — 퇴직금의 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "판례",
    items: [
      { label: "대법원 — 퇴직금 분할 약정 무효 판결", url: "https://glaw.scourt.go.kr" },
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
    slug: "퇴직금-연봉제",
    title: "연봉제 직장인, 퇴직금은 따로 받나요?",
    description: "퇴직금 포함 연봉 계약의 효력과 별도 지급 원칙을 설명해요.",
  },
  {
    slug: "회사-폐업-퇴직금",
    title: "회사가 폐업하면 퇴직금은 어떻게 되나요?",
    description: "폐업 시 체당금 제도를 통한 퇴직금 수령 방법을 안내해요.",
  },
  {
    slug: "퇴직금-포기각서",
    title: "퇴직금 포기각서, 법적 효력이 있나요?",
    description: "퇴직금 포기각서의 유효성과 무효 사유를 정리했어요.",
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
          currentSlug="퇴직금-분할지급"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 분할지급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 분할 지급,<br />
        동의하면 나중에 못 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;회사에서 퇴직금을 매달 나눠서 준다는데, 괜찮은 건가요?&rdquo;<br />
        괜찮지 않아요. <strong>퇴직금 분할 지급 약정은 법적으로 무효</strong>예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 퇴직금을 퇴직 시 일시금으로 지급하도록 규정하고 있죠.
        동의서를 쓴 경우에도 퇴직 시 전액을 다시 청구할 수 있어요.
        분할 지급의 법적 문제, 동의서를 쓴 경우 대처법, 회사 폐업 시 대응까지 — 꼭 알아야 할 내용을 정리할게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 분할 지급이 가능한가요?</H2>
      <p style={body}>
        <strong>법적으로 불가능해요.</strong> <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 사업주가 퇴직하는 근로자에게 퇴직금을 지급해야 한다고 규정하고 있어요. 여기서 &ldquo;퇴직하는&rdquo;이라는 표현이 핵심이죠. 퇴직 전에 미리 나눠주는 건 이 규정에 반해요.
      </p>
      <p style={body}>
        대법원은 &ldquo;퇴직금을 매월 분할하여 지급하기로 하는 약정은 강행규정인 근로자퇴직급여보장법에 반하여 무효&rdquo;라고 판시했어요. 근로자와 사업주가 서로 합의했더라도 법보다 우선할 수 없다는 뜻이죠.
      </p>
      <p style={body}>
        유일한 예외는 <strong>퇴직금 중간정산</strong>이에요. 법에서 정한 사유(주택 구입, 장기 요양 등)에 해당하면 재직 중에도 퇴직금을 미리 정산받을 수 있죠. 하지만 이건 &ldquo;분할 지급&rdquo;이 아니라 &ldquo;법정 사유에 의한 정산&rdquo;이라는 점에서 본질이 달라요.
      </p>

      <GreenBox title="분할 지급 vs 중간정산">
        <strong>분할 지급</strong>: 매달 퇴직금을 나눠서 지급 → <strong>무효</strong><br />
        <strong>중간정산</strong>: 법정 사유로 재직 중 퇴직금 정산 → <strong>유효</strong><br />
        둘은 완전히 다른 개념이에요.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>분할 지급에 동의하면 어떤 문제가 생기나요?</H2>
      <p style={body}>
        가장 큰 문제는 &ldquo;이미 받았으니 퇴직금은 없다&rdquo;는 회사의 주장이에요. 매달 퇴직금 명목으로 25만 원씩 3년간 받았으니 900만 원을 이미 지급했다는 논리죠. 하지만 분할 약정이 무효이기 때문에, 매달 받은 900만 원은 법적으로 급여에 해당해요.
      </p>
      <p style={body}>
        그래서 퇴직 시 퇴직금을 별도로 청구할 수 있어요. 이미 받은 돈을 돌려줄 필요도 없고요. 회사가 &ldquo;이중 지급이다&rdquo;라고 항변하더라도, 분할 약정이 무효인 이상 이중 지급 문제는 발생하지 않죠.
      </p>
      <p style={body}>
        두 번째 문제는 <strong>퇴직금 적립이 안 돼 있을 위험</strong>이에요. 매달 나눠줬으니 따로 쌓아둘 필요가 없다고 생각한 회사가 퇴직금 재원을 마련해두지 않은 경우가 있죠. 이러면 퇴직할 때 &ldquo;돈이 없다&rdquo;며 지급을 미루는 상황이 생길 수 있어요.
      </p>

      <BorderBox title="분할 지급 동의서를 쓴 이유가 중요해요">
        사업주의 요구로 쓴 경우 → 의사의 자유가 없었으므로 효력 부정이 쉬움<br />
        본인이 자발적으로 요청한 경우 → 그래도 법적으로 무효<br />
        어느 쪽이든 퇴직 시 별도 청구가 가능해요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>분할 지급 중 회사가 폐업하면 어떻게 되나요?</H2>
      <p style={body}>
        분할 약정이 무효이니, 법적으로는 퇴직금을 아직 받지 못한 상태와 같아요. <a href="/w/회사-폐업-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>회사가 폐업하면 체당금 제도</a>를 이용할 수 있죠. 체당금은 사업주가 지급하지 못한 임금·퇴직금을 국가가 대신 지급하는 제도예요.
      </p>
      <p style={body}>
        체당금 신청은 관할 고용노동부에 하면 돼요. 필요한 서류는 체불 임금·퇴직금 확인서, 폐업 확인 서류 등이고, 근로감독관이 사실관계를 확인한 후 지급이 결정되죠. 최대 지급 한도는 나이와 퇴직 시점에 따라 달라지지만, 퇴직금의 상당 부분을 보전받을 수 있어요.
      </p>
      <p style={body}>
        분할 약정이 있었던 경우, 매달 받은 금액이 퇴직금에서 공제되느냐가 쟁점이 될 수 있어요. 원칙적으로 분할 약정이 무효이기 때문에 공제 대상이 아니지만, 체당금 심사에서 개별적으로 판단될 수 있죠. 증거(계약서, 급여명세서, 분할 동의서 등)를 미리 확보해두는 게 중요해요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>분할 지급 동의서를 쓴 경우 대처법은?</H2>
      <p style={body}>
        이미 동의서를 썼더라도 걱정하지 마세요. 강행규정에 반하는 약정은 동의 여부와 관계없이 무효예요. 퇴직할 때 퇴직금을 별도로 청구하면 돼요.
      </p>
      <p style={body}>
        청구 방법은 일반 퇴직금 미지급과 같아요. 먼저 사업주에게 퇴직금 지급을 요청하고, 14일 이내에 안 주면 내용증명을 보내세요. 그래도 안 주면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 임금체불 진정</a>을 넣으면 돼요.
      </p>
      <p style={body}>
        진정 시 분할 동의서 사본과 매달 지급된 급여명세서를 함께 제출하세요. 근로감독관이 &ldquo;분할 약정이 무효이므로 퇴직금을 별도로 지급하라&rdquo;는 시정명령을 내리게 되죠. 사업주가 이에 불응하면 형사처벌(<strong>3년 이하 징역 또는 3천만 원 이하 벌금</strong>)로 이어질 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>분할 지급 대신 일시금을 요구할 수 있나요?</H2>
      <p style={body}>
        당연히 요구할 수 있어요. 법이 원래 퇴직 시 일시금 지급을 규정하고 있으니까요. 회사가 분할 지급을 제안하면 &ldquo;법적으로 무효인 약정이라 동의할 수 없다&rdquo;고 거절하면 돼요.
      </p>
      <p style={body}>
        재직 중이라면 사업주에게 &ldquo;퇴직연금(DB형 또는 DC형)이나 퇴직금 제도를 제대로 운영해달라&rdquo;고 요청하세요. 퇴직연금에 가입하면 금융기관에 퇴직금이 적립되기 때문에, 회사가 폐업하더라도 퇴직금을 보호받을 수 있죠.
      </p>
      <p style={body}>
        이미 분할 지급이 진행 중인 상태에서도 &ldquo;앞으로는 분할 지급에 동의하지 않겠다&rdquo;고 의사를 표시할 수 있어요. 서면으로 통보하면 증거가 남아서 나중에 유리하죠. 퇴직 시 소멸시효 <strong>3년</strong> 이내에 청구하는 것만 잊지 마세요. 지급 기한 <strong>14일</strong>과 지연이자 <strong>연 20%</strong>도 함께 청구할 수 있어요.
      </p>

      <GreenBox title="퇴직금 분할 지급 핵심 정리">
        분할 지급 약정 → <strong>무효</strong> (강행규정 위반)<br />
        동의서를 썼어도 퇴직 시 <strong>전액 별도 청구 가능</strong><br />
        매달 받은 금액은 급여로 간주 — <strong>반환 의무 없음</strong><br />
        지급 기한 <strong>14일</strong> / 지연이자 <strong>연 20%</strong> / 소멸시효 <strong>3년</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 분할 지급에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
