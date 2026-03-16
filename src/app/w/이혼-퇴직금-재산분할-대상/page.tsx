"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "이혼 소송 중이거나 이혼을 고려하고 있어요" },
  { id: "c2", label: "배우자가 퇴직금이 발생하는 직장에 다니고 있어요" },
  { id: "c3", label: "혼인 기간 중 배우자의 근무 기간이 포함돼 있어요" },
  { id: "c4", label: "재산분할 청구를 할 계획이 있어요" },
];

const FAQS = [
  {
    q: "아직 퇴직하지 않은 배우자의 퇴직금도 재산분할 대상인가요?",
    a: "네, 대상이 될 수 있어요. 대법원은 장래 수령할 퇴직금이라도 혼인 기간에 해당하는 부분은 재산분할 대상에 포함된다고 판시했죠.",
  },
  {
    q: "혼인 전 근무 기간의 퇴직금도 분할 대상인가요?",
    a: "아니에요. 혼인 전 근무 기간에 해당하는 퇴직금은 특유재산(혼인 전 형성 재산)으로 보기 때문에 재산분할 대상에서 제외되죠.",
  },
  {
    q: "퇴직금 재산분할 비율은 보통 얼마인가요?",
    a: "50:50이 원칙이지만, 기여도에 따라 조정돼요. 맞벌이 부부라면 비교적 균등하게, 외벌이 가정이라면 가사노동 기여도를 고려해서 30~40% 정도가 되는 경우가 많죠.",
  },
  {
    q: "퇴직연금(IRP, DC형)도 재산분할 대상인가요?",
    a: "네, 퇴직연금에 적립된 금액도 재산분할 대상이에요. DB형이든 DC형이든 혼인 기간에 적립된 부분은 분할 가능하죠.",
  },
  {
    q: "배우자가 퇴직금을 미리 빼돌리면 어떻게 하나요?",
    a: "가압류를 신청하세요. 이혼 소송 전이라도 법원에 퇴직금 가압류를 신청하면 상대방이 임의로 처분하는 걸 막을 수 있어요. 변호사 상담을 받아보는 게 좋죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민법 제839조의2 — 재산분할청구권", url: "https://www.law.go.kr/법령/민법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대법원 판례 검색", url: "https://glaw.scourt.go.kr" },
      { label: "대한법률구조공단 — 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-정산",
    title: "퇴직금 정산 방법",
    description: "퇴직금 정산 시 포함되는 항목과 주의할 점을 정리했어요.",
  },
  {
    slug: "퇴직금-소멸시효",
    title: "퇴직금 소멸시효 3년",
    description: "퇴직금 청구 기한인 소멸시효 3년에 대해 정리했어요.",
  },
  {
    slug: "퇴직금-압류",
    title: "퇴직금 압류, 빚이 있으면?",
    description: "퇴직금이 압류되는 조건과 방어 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="이혼-퇴직금-재산분할-대상"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 이혼 · 재산분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 시 퇴직금 재산분할,<br />
        상대방 몫이 될 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼할 때 퇴직금도 재산분할 대상이 될 수 있다는 사실, 알고 계셨나요?
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제839조의2</a>는 혼인 중 공동으로 형성한 재산에 대해 분할을 청구할 수 있도록 규정하고 있어요.
        퇴직금도 혼인 기간 중 형성된 재산으로 보기 때문에 분할 대상이 되죠.
        아직 퇴직하지 않았더라도 장래 수령할 퇴직금까지 포함될 수 있어요.
        재산분할 대상 여부, 비율, 방어 방법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이혼 시 퇴직금이 재산분할 대상인가요?</H2>
      <p style={body}>
        네, 재산분할 대상이 될 수 있어요. <a href="https://glaw.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원</a>은 &ldquo;퇴직금은 혼인 중 공동의 노력으로 형성된 재산에 해당할 수 있다&rdquo;고 판단하고 있죠. 배우자가 직장에 다니는 동안 가사를 분담한 기여도가 인정되기 때문이에요.
      </p>
      <p style={body}>
        핵심은 &ldquo;혼인 기간&rdquo;에 해당하는 부분만 분할 대상이라는 거예요. 배우자가 결혼 전부터 일했다면, 결혼 전 근무 기간에 해당하는 퇴직금은 특유재산이라서 분할 대상에서 빠지죠.
      </p>
      <p style={body}>
        예를 들어 배우자가 10년 근무 중 7년이 혼인 기간이라면, 퇴직금의 7/10만 재산분할 대상이 돼요. 나머지 3/10은 혼인 전 특유재산으로 보호받죠.
      </p>

      <GreenBox title="퇴직금 재산분할 핵심">
        - 혼인 기간 중 형성된 부분 → <strong>재산분할 대상</strong><br />
        - 혼인 전 근무 기간 → <strong>특유재산 (분할 제외)</strong><br />
        - 아직 퇴직 전이라도 → <strong>장래 퇴직금 포함 가능</strong>
      </GreenBox>

      <Divider />

      <H2>아직 받지 않은 퇴직금도 포함되나요?</H2>
      <p style={body}>
        포함될 수 있어요. 대법원은 장래 수령할 퇴직금이라도 &ldquo;현재 퇴직할 경우 받을 수 있는 예상 퇴직금&rdquo;을 기준으로 재산분할 대상에 포함시키고 있죠. 퇴직 시점이 아니라 이혼 시점 기준으로 계산해요.
      </p>
      <p style={body}>
        다만 장래 퇴직금은 불확실성이 있기 때문에 법원이 재량으로 할인율을 적용하거나, 현재 가치로 환산해서 분할하는 경우가 많아요. 정확한 금액은 개별 사안에 따라 달라지죠.
      </p>
      <p style={body}>
        퇴직연금(DB형, DC형, IRP)에 적립된 금액도 마찬가지예요. 혼인 기간 중 적립된 부분은 재산분할 대상이 되죠. <a href="/w/퇴직금-정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 정산</a> 내역과 퇴직연금 적립 현황을 미리 확인해두는 게 중요해요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금이 재산분할 대상이 될 가능성이 높아요. 변호사 상담을 받아보세요."
        partialMatchText="일부만 해당돼요. 개별 상황에 따라 달라지니 전문 상담을 받아보는 게 좋아요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>재산분할 비율은 어떻게 정해지나요?</H2>
      <p style={body}>
        재산분할 비율은 법원이 양측의 기여도를 종합적으로 판단해서 정해요. 혼인 기간, 재산 형성에 대한 기여도, 가사노동 분담 정도, 혼인 파탄의 책임 등이 고려되죠.
      </p>
      <p style={body}>
        맞벌이 부부라면 비교적 50:50에 가까운 비율이 나오는 경우가 많아요. 외벌이 가정에서는 가사노동 기여도를 고려해 30~40% 정도가 일반적이죠. 다만 이건 평균적인 수치일 뿐, 개별 사안에 따라 크게 달라질 수 있어요.
      </p>
      <p style={body}>
        퇴직금 분할은 현금으로 지급하는 게 원칙이지만, 아직 퇴직하지 않은 경우에는 &ldquo;퇴직 시 지급&rdquo;하도록 하거나, 다른 재산으로 대체하는 방식도 가능해요. 법원 판결에 따라 달라지니 변호사와 상의하세요.
      </p>

      <Divider />

      <H2>퇴직금 재산분할을 막는 방법이 있나요?</H2>
      <p style={body}>
        혼인 전 근무 기간에 해당하는 퇴직금은 특유재산으로 보호받으니까, 이 부분을 명확히 입증하는 게 첫 번째 방어 수단이에요. 입사일, 결혼일, 퇴직일을 정확히 정리해두세요.
      </p>
      <p style={body}>
        혼전재산계약서(부부재산계약)를 미리 작성해두는 방법도 있어요. 결혼 전에 &ldquo;퇴직금은 각자의 재산으로 한다&rdquo;는 약정을 하면 분할 대상에서 제외할 수 있죠. 다만 혼인 후에는 부부재산계약 변경이 어렵다는 점을 주의하세요.
      </p>
      <p style={body}>
        이미 이혼 절차가 진행 중이라면 <a href="/w/퇴직금-압류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 가압류</a>에 대비해야 해요. 상대방이 퇴직금 가압류를 신청할 수 있으니, 변호사와 미리 대응 전략을 세우는 게 중요하죠.
      </p>

      <Divider />

      <H2>재산분할 청구 절차는?</H2>
      <p style={body}>
        이혼 소송에서 재산분할 청구를 함께 하면 돼요. 협의이혼의 경우에는 이혼 성립일로부터 2년 이내에 별도로 재산분할 청구 소송을 제기할 수 있죠.
      </p>
      <p style={body}>
        청구 시 배우자의 퇴직금 예상 금액, 혼인 기간, 기여도 등을 소명해야 해요. 배우자의 근로계약서, 급여명세서, 퇴직연금 가입 확인서 등이 증거가 되죠. 법원을 통해 사실조회를 신청하면 배우자 회사에 퇴직금 관련 자료를 요청할 수도 있어요.
      </p>
      <p style={body}>
        법률 비용이 부담되면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>(132)에서 무료 법률 상담과 소송 지원을 받을 수 있어요. 소득 기준에 따라 무료 변호사 선임까지 지원해주는 경우도 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        이혼 시 퇴직금 재산분할에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니, 변호사 상담을 받아보세요." />
    </ArticleLayout>
  );
}
