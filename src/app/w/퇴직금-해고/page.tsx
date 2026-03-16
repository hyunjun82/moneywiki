"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "해고 전 1년 이상 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 일했어요" },
  { id: "c3", label: "해고 통보를 받았거나 이미 해고됐어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "징계 해고를 당해도 퇴직금을 받을 수 있나요?",
    a: "네, 받을 수 있어요. 해고 사유가 무엇이든 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금은 발생하죠. 징계 해고라고 해서 퇴직금이 없어지는 건 아니에요.",
  },
  {
    q: "해고 예고 없이 잘리면 퇴직금 외에 다른 보상이 있나요?",
    a: "30일 전 해고 예고를 하지 않으면 30일분 이상의 통상임금을 해고예고수당으로 지급해야 해요. 퇴직금과 별도이니, 둘 다 청구할 수 있죠.",
  },
  {
    q: "부당해고인데도 퇴직금을 받아야 하나요?",
    a: "부당해고 구제신청과 퇴직금 청구는 별개 문제예요. 부당해고가 인정되면 복직이 원칙이지만, 복직을 원하지 않는다면 퇴직금을 받고 끝내는 것도 가능하죠.",
  },
  {
    q: "해고 당일 퇴직금을 달라고 할 수 있나요?",
    a: "법적 기한은 퇴직일로부터 14일이에요. 해고 당일 즉시 지급을 요구할 수는 있지만, 회사는 14일까지 시간이 있죠. 14일이 넘으면 연 20% 지연이자가 붙어요.",
  },
  {
    q: "해고 후 회사가 연락이 안 돼요. 어떻게 하나요?",
    a: "고용노동부(1350)에 퇴직금 미지급 진정을 넣으세요. 근로감독관이 사업주를 추적·조사해요. 회사가 폐업했다면 체당금 제도를 활용할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제26조 — 해고의 예고", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제36조 — 금품 청산", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 해고 관련 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-지급-기한",
    title: "퇴직금 지급 기한 14일 원칙",
    description: "퇴직금 지급 기한과 위반 시 대응 방법을 정리했어요.",
  },
  {
    slug: "해고-근로자-임금-퇴직금-지급-기한",
    title: "해고 근로자 임금·퇴직금 지급 기한",
    description: "해고 시 임금과 퇴직금 지급 기한이 동일한지 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 주면 어디에 어떻게 신고하는지 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-해고"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 해고 · 지급기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        해고 시 퇴직금,<br />
        바로 받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갑자기 해고 통보를 받으면 퇴직금이 제대로 나올지 걱정되죠.
        해고 사유가 무엇이든, 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금은 반드시 지급돼야 해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>는 퇴직일로부터 14일 이내에 금품을 청산하도록 규정하고 있죠.
        해고 시 퇴직금 수령 가능 여부, 지급 기한, 해고예고수당, 미지급 대처법까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>해고되어도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        네, 받을 수 있어요. 퇴직금은 퇴직 &ldquo;사유&rdquo;와 무관하게 발생하는 권리죠. 자발적 퇴사든 해고든, 1년 이상 계속 근로하고 주 평균 15시간 이상 일했다면 퇴직금이 생겨요.
      </p>
      <p style={body}>
        징계 해고, 경영상 해고, 권고사직 등 어떤 형태의 해고라도 마찬가지예요. 회사가 &ldquo;징계로 해고했으니 퇴직금이 없다&rdquo;고 주장하는 건 법적 근거가 없는 말이죠. 퇴직금 청구권은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 보장하고 있어요.
      </p>
      <p style={body}>
        다만 횡령, 배임 등으로 회사에 손해를 끼친 경우 회사가 손해배상 청구를 별도로 할 수 있어요. 이건 퇴직금과는 별개 문제이죠. 퇴직금은 퇴직금대로 받고, 손해배상은 손해배상대로 처리되는 거예요.
      </p>

      <GreenBox title="해고 시 퇴직금 핵심">
        - 해고 사유 무관, <strong>1년 이상 + 주 15시간 이상</strong> 근무 시 퇴직금 발생<br />
        - 징계 해고, 경영상 해고, 권고사직 <strong>모두 동일 적용</strong><br />
        - 지급 기한: 퇴직일로부터 <strong>14일 이내</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직금을 받을 수 있는 조건을 갖췄어요."
        partialMatchText="일부만 해당돼요. 근무 기간과 조건을 확인한 뒤 고용노동부(1350)에 상담받아보세요."
      />

      <Divider />

      <H2>해고 즉시 퇴직금을 요구할 수 있나요?</H2>
      <p style={body}>
        즉시 지급을 요청할 수는 있지만, 법적 기한은 퇴직일로부터 14일이에요. 회사는 14일 안에 지급하면 법을 지킨 거죠. 다만 당사자 합의로 기한을 연장할 수는 있는데, 반드시 서면 동의가 있어야 해요.
      </p>
      <p style={body}>
        해고가 갑작스러웠다면 당장 생활비가 필요할 텐데, 14일도 긴 시간이죠. 이럴 때는 회사에 조기 지급을 요청하세요. 법적 의무는 아니지만, 원만한 정리를 위해 응하는 경우가 많아요.
      </p>
      <p style={body}>
        14일이 넘어도 퇴직금이 입금되지 않으면 <a href="/w/퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙기 시작해요. 이자는 자동으로 발생하지만, 실제로 받으려면 청구해야 하죠. 내용증명으로 지연이자 포함 퇴직금 지급을 요청하는 게 효과적이에요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>해고 예고 없이 잘렸다면 퇴직금 외 다른 보상은?</H2>
      <p style={body}>
        근로기준법 제26조에 따르면, 사용자는 근로자를 해고하려면 최소 30일 전에 예고해야 해요. 30일 전 예고를 하지 않으면 30일분 이상의 통상임금을 &ldquo;해고예고수당&rdquo;으로 지급해야 하죠.
      </p>
      <p style={body}>
        해고예고수당은 퇴직금과 별개예요. 둘 다 받을 수 있죠. 퇴직금 + 해고예고수당 + 미지급 임금(있다면), 이 세 가지를 모두 청구할 수 있어요. 해고 통보일과 실제 퇴직일을 잘 확인하세요.
      </p>
      <p style={body}>
        다만 3개월 미만 근무자, 일용근로자, 중대한 귀책사유로 해고된 경우에는 해고예고가 면제돼요. 이런 경우 해고예고수당은 받을 수 없지만, 퇴직금은 요건을 충족하면 별도로 받을 수 있죠.
      </p>

      <Divider />

      <H2>해고 퇴직금 지급 기한은 동일한가요?</H2>
      <p style={body}>
        동일해요. 해고든 자발적 퇴사든 퇴직금 지급 기한은 <a href="/w/해고-근로자-임금-퇴직금-지급-기한" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직일로부터 14일</a>이에요. 근로기준법 제36조가 &ldquo;사망 또는 퇴직&rdquo;이라고만 규정하고 있어서, 퇴직 사유에 따른 구분이 없죠.
      </p>
      <p style={body}>
        즉시 해고(당일 해고)라도 14일 기한은 동일하게 적용돼요. 해고 통보일이 곧 퇴직일이 되고, 그날부터 14일 카운트가 시작되죠. 회사가 &ldquo;정산에 시간이 필요하다&rdquo;고 하더라도 법적 기한은 변하지 않아요.
      </p>
      <p style={body}>
        미지급 임금(밀린 월급, 야근수당 등)도 14일 이내에 같이 정산돼야 해요. 퇴직금과 미지급 임금을 합쳐서 한꺼번에 받는 게 일반적이죠. 14일이 지나면 전체 금액에 대해 연 20% 지연이자가 붙어요.
      </p>

      <Divider />

      <H2>해고 후 퇴직금 미지급 시 대처법은?</H2>
      <p style={body}>
        먼저 회사에 내용증명을 보내세요. &ldquo;퇴직금 + 지연이자를 지급하라&rdquo;는 내용을 담으면 되죠. 내용증명은 법적 조치를 예고하는 의미가 있어서 효과가 큰 편이에요.
      </p>
      <p style={body}>
        내용증명에도 반응이 없으면 관할 고용노동지청에 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 진정</a>을 넣으세요. 접수 후 2~4주 내에 근로감독관이 사업주를 조사하고, 시정 명령을 내려요. 사업주가 명령을 이행하지 않으면 검찰 송치까지 가능하죠.
      </p>
      <p style={body}>
        소멸시효가 퇴직일로부터 <strong>3년</strong>이니까 그 안에 움직여야 해요. 해고 충격으로 &ldquo;나중에 해야지&rdquo; 미루다가 시효가 끝나는 경우가 생각보다 많아요. 증빙 자료(해고 통보서, 급여명세서, 근로계약서)를 퇴직 전에 미리 확보해두세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        해고 시 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
