"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직소득세를 이미 원천징수당했어요" },
  { id: "c2", label: "IRP에 넣고 연금으로 수령할 계획이에요" },
  { id: "c3", label: "퇴직소득세가 과다 징수된 것 같아요" },
  { id: "c4", label: "환급 신청 방법을 알고 싶어요" },
];

const FAQS = [
  {
    q: "퇴직금 세금 환급이 정말 가능한가요?",
    a: "가능한 경우가 있어요. IRP 연금 수령 시 감면분 환급, 과다 원천징수 시 정산 환급이 대표적이죠.",
  },
  {
    q: "환급 금액은 어떻게 확인하나요?",
    a: "홈택스에서 퇴직소득 원천징수영수증을 조회하면 납부한 세금을 알 수 있어요. IRP 금융기관에서도 세금 내역을 확인할 수 있죠.",
  },
  {
    q: "환급까지 얼마나 걸리나요?",
    a: "종합소득세 신고를 통한 환급은 신고 후 약 1~2개월이에요. IRP 연금 수령을 통한 감면은 수령 시점에 바로 반영되죠.",
  },
  {
    q: "퇴직금을 두 군데서 받았는데 환급이 가능한가요?",
    a: "가능해요. 각 회사에서 별도로 원천징수한 세금을 합산 정산하면, 과다 납부분이 환급될 수 있죠.",
  },
  {
    q: "환급 신청 기한이 있나요?",
    a: "종합소득세 신고 기한은 퇴직 다음 해 5월이에요. 기한을 놓쳤더라도 5년 이내 경정청구가 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세기본법 제45조의2 — 경정청구 (5년 이내)", url: "https://www.law.go.kr/법령/국세기본법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 환급 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 종합소득세 신고 및 환급", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세의 기본 구조와 계산 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 세금 줄이는 방법, IRP와 연말정산",
    description: "IRP 활용과 연말정산을 통한 퇴직금 절세 전략이에요.",
  },
  {
    slug: "퇴직금-소득세",
    title: "퇴직금 소득세, 어떻게 계산하나요?",
    description: "퇴직소득세 계산 공식과 일반 소득세와의 차이를 설명해요.",
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
          currentSlug="퇴직금-세금-환급"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금 환급<br />
        받을 수 있는 경우는?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금에서 세금을 떼갔는데, 돌려받을 수 있는 방법이 있나요?&rdquo;<br />
        있어요. IRP에서 연금으로 받으면 퇴직소득세의 <strong>30~40%</strong>가 사실상 환급되고, 과다 원천징수된 경우에는 종합소득세 신고를 통해 돌려받을 수 있죠.
        환급이 가능한 경우, 신청 방법, 기한까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금에서 세금을 환급받는 경우가 있나요?</H2>
      <p style={body}>
        크게 두 가지 경우예요. 첫째, <strong>IRP에서 연금으로 수령</strong>하는 경우예요. 일시금으로 받을 때 원천징수된 퇴직소득세보다 연금 수령 시 부과되는 세금이 적으면 차액이 환급 효과를 내죠.
      </p>
      <p style={body}>
        둘째, <strong>퇴직소득세가 과다 징수</strong>된 경우예요. 회사가 계산을 잘못하거나, 같은 해에 두 곳 이상에서 퇴직금을 받아 별도로 원천징수된 경우가 해당되죠. 합산 정산하면 초과 납부분을 돌려받을 수 있어요.
      </p>
      <p style={body}>
        세 번째로 드문 경우지만, 퇴직금 정산 과정에서 근속연수나 퇴직소득공제 계산에 오류가 있었던 경우에도 환급이 가능해요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 퇴직소득 원천징수영수증을 확인하고, 이상이 있으면 경정청구를 하면 되죠.
      </p>

      <GreenBox title="환급 가능한 3가지 경우">
        1. IRP 연금 수령 시 퇴직소득세 <strong>30~40% 감면</strong><br />
        2. 과다 원천징수 시 <strong>종합소득세 신고</strong>로 환급<br />
        3. 계산 오류 시 <strong>경정청구</strong>로 환급
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>어떻게 환급 신청을 하나요?</H2>
      <p style={body}>
        <strong>IRP 연금 수령</strong>을 통한 감면은 별도 신청이 필요 없어요. 연금을 수령할 때 금융기관이 감면된 세율을 적용해서 원천징수하죠. 이미 일시금으로 받으면서 세금을 낸 경우, IRP에 재이체하는 건 불가능하니 퇴직 시점에 결정해야 해요.
      </p>
      <p style={body}>
        <strong>과다 원천징수</strong>로 인한 환급은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 종합소득세 신고를 하면 돼요. 퇴직한 다음 해 <strong>5월</strong>에 신고하고, 과다 납부분이 확인되면 1~2개월 내에 통장으로 환급금이 입금되죠.
      </p>
      <p style={body}>
        기한을 놓쳤더라도 <strong>5년 이내</strong>에 경정청구가 가능해요. <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법 제45조의2</a>에 근거하죠. 홈택스에서 &ldquo;경정청구&rdquo; 메뉴를 이용하거나, 세무서에 방문해서 신청할 수 있어요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>환급 금액은 얼마나 되나요?</H2>
      <p style={body}>
        IRP 연금 수령을 통한 감면의 경우, 퇴직소득세의 <strong>30~40%</strong>예요. 퇴직소득세가 200만 원이었다면 60~80만 원을 아끼는 셈이죠. 퇴직금이 클수록 절세 금액도 커져요.
      </p>
      <p style={body}>
        과다 원천징수로 인한 환급은 경우마다 달라요. 두 곳에서 퇴직금을 받아 각각 원천징수된 경우, 합산 정산하면 수만 원에서 수십만 원까지 돌려받을 수 있죠. 근속연수 계산 오류가 있었다면 더 큰 금액이 환급되기도 해요.
      </p>
      <p style={body}>
        정확한 환급 금액은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 퇴직소득세 계산기를 돌려보면 확인할 수 있어요. 원천징수영수증에 나온 세금과 비교해서 차이가 나면 환급 대상이죠. 잘 모르겠으면 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>(126)에서 상담받으세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>IRP 가입 시 환급 혜택이 달라지나요?</H2>
      <p style={body}>
        IRP에 퇴직금을 넣는 것 자체는 &ldquo;환급&rdquo;이 아니라 &ldquo;과세이연&rdquo;(세금 납부 유예)이에요. 나중에 인출할 때 세금을 내는 거죠. 환급 효과는 <strong>연금으로 수령할 때</strong> 비로소 발생해요.
      </p>
      <p style={body}>
        IRP에 <strong>추가 납입</strong>한 금액은 별도의 세액공제 혜택이 있어요. 연 최대 900만 원까지 13.2~16.5% 세액공제를 받을 수 있죠. 이건 퇴직소득세와는 별개로, 근로소득세(또는 종합소득세)에서 돌려받는 거예요.
      </p>
      <p style={body}>
        정리하면, IRP는 <strong>두 가지 세금 혜택</strong>을 동시에 줘요. 퇴직금의 과세이연 + 연금 수령 시 감면, 그리고 추가 납입에 대한 세액공제. 이 두 가지를 합치면 상당한 금액을 아낄 수 있죠.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>환급 신청 기한이 있나요?</H2>
      <p style={body}>
        종합소득세 신고를 통한 환급은 퇴직한 다음 해 <strong>5월 1일~31일</strong>이 정기 신고 기간이에요. 이 기간에 홈택스에서 신고하면 가장 빠르게 환급받을 수 있죠.
      </p>
      <p style={body}>
        기한을 놓쳤더라도 걱정하지 마세요. <strong>5년 이내</strong>에 경정청구를 할 수 있거든요. 2026년에 퇴직했다면 2031년까지 환급 신청이 가능해요. 다만 빨리 할수록 좋으니 미루지 않는 게 좋죠.
      </p>
      <p style={body}>
        IRP 연금 수령을 통한 감면은 신청 기한이 따로 없어요. 55세 이후 연금을 받기 시작하는 시점에 자동으로 감면 세율이 적용되거든요. 다만 IRP 가입 자체는 퇴직 시점에 해야 하니, 퇴직할 때 바로 결정하는 게 중요하죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="세금 환급 가능성이 있어요. 홈택스에서 원천징수영수증을 확인하고, IRP 연금 수령이나 경정청구를 검토해보세요."
        partialMatchText="아직 정보가 부족해요. 국세청(126)에 상담을 받아 환급 가능 여부를 확인하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금 환급에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
