"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 기초연금을 받고 있는데 다른 혜택도 받을 수 있는지 궁금한 어르신/보호자
// Q2: 기초연금 수급자가 추가로 받을 수 있는 감면 혜택 목록을 파악하고, 신청까지 완료
// Q3: 건강보험료 감면, 통신비 할인, 난방비 지원, 교통비 할인 등 구체적 혜택과 신청처
// Q4: GreenBox(핵심 혜택) + Checklist(혜택 목록) + Steps(신청) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const HEALTH_CHECKLIST = [
  "건강보험료 감면: 기초연금 수급자 중 소득 하위 일정 구간은 건보료 경감",
  "의료급여 연계: 기초생활수급자이면서 기초연금 수급 시 의료급여 유지",
  "틀니 지원: 65세 이상 건강보험 적용 (본인부담 30%)",
  "임플란트 지원: 65세 이상 평생 2개까지 건강보험 적용",
  "건강검진: 국가건강검진 무료 (2년 주기)",
];

const LIVING_CHECKLIST = [
  "통신비 할인: 기초연금 수급자 대상 이동통신 요금 할인 (최대 월 11,000원)",
  "전기요금 할인: 독거노인, 기초수급자 등 월 최대 16,000원 감면",
  "도시가스 요금 감면: 동절기 난방비 지원 (지자체별 상이)",
  "교통비: 지하철 무임승차 (65세 이상), 지자체별 버스비 할인",
  "문화누리카드: 기초생활수급자·차상위 대상 연 11만 원 문화비",
];

const STEPS_ITEMS = [
  { title: "수급 확인서 준비", desc: "주민센터에서 기초연금 수급 확인서를 발급받으세요. 온라인으로도 발급 가능해요." },
  { title: "해당 기관에 감면 신청", desc: "건보료는 국민건강보험공단, 통신비는 통신사, 전기요금은 한전에 각각 신청해요." },
  { title: "지자체 추가 혜택 확인", desc: "거주 지역 주민센터에 문의하면 지역별 추가 지원 사업을 안내받을 수 있어요." },
];

const FAQS = [
  {
    q: "기초연금만 받아도 건강보험료가 깎이나요?",
    a: "기초연금 수급 자체만으로 자동 감면되는 건 아니에요. 소득 수준에 따라 건강보험료 경감 대상이 되는데, 기초연금 수급자 중 하위 소득 구간에 해당하면 경감 혜택을 받을 수 있죠. 국민건강보험공단(1577-1000)에 문의하면 정확히 알 수 있어요.",
  },
  {
    q: "통신비 할인은 어떻게 신청하나요?",
    a: "기초연금 수급 확인서를 가지고 이용 중인 통신사 대리점이나 고객센터에 감면 신청하면 돼요. SKT, KT, LGU+ 모두 기초생활수급자·차상위 대상 할인 프로그램이 있죠.",
  },
  {
    q: "난방비 지원은 겨울에만 받을 수 있나요?",
    a: "에너지 바우처는 동절기(11월~3월)에 집중 지원되지만, 하절기 냉방비로도 사용할 수 있어요. 매년 5~6월쯤 신청 안내가 나오니 주민센터에서 확인하세요.",
  },
  {
    q: "혜택을 한 번에 신청할 수 있는 곳이 있나요?",
    a: "정부24(gov.kr)에서 복지 서비스를 통합 검색할 수 있고, 주민센터에서 &apos;찾아가는 복지 상담&apos;을 통해 여러 혜택을 한 번에 안내받을 수 있어요. 복지로(bokjiro.go.kr)에서도 본인 대상 복지를 조회할 수 있죠.",
  },
  {
    q: "기초연금에서 탈락하면 감면 혜택도 다 없어지나요?",
    a: "기초연금 수급 조건에 연동된 혜택은 탈락 시 해제돼요. 다만 65세 이상 대상 혜택(지하철 무임, 틀니 보험 적용 등)은 기초연금과 무관하게 유지되죠.",
  },
  {
    q: "독거노인이면 추가 혜택이 더 있나요?",
    a: "독거노인은 긴급안전알림 서비스, 노인돌봄서비스, 무료 급식 등 추가 지원을 받을 수 있어요. 주민센터에 &apos;독거노인 지원&apos;으로 문의하면 안내받을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 노인 복지 서비스", url: "https://www.mohw.go.kr" },
      { label: "복지로: 복지 서비스 통합 안내", url: "https://www.bokjiro.go.kr" },
      { label: "정부24: 복지 서비스 검색", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-의료급여-건보료-감면",
    title: "의료급여 연계와 건보료 감면",
    description: "기초연금 수급자의 의료비 혜택을 구체적으로 정리했어요.",
  },
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "기초연금 수급 자격이 되는지 소득인정액 기준으로 확인해 보세요.",
  },
  {
    slug: "기초연금-신청방법-절차",
    title: "기초연금 신청 방법",
    description: "아직 기초연금을 안 받고 계시다면, 신청 방법부터 확인하세요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="기초연금 가이드"
          items={기초연금_SIDEBAR}
          highlightSlugs={기초연금_HIGHLIGHT}
          currentSlug="기초연금-감면혜택-추가지원"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>감면 혜택 추가 지원</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 받으면 또 뭘 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        감면 혜택 목록과 추가 지원 신청 방법
      </p>

      <p style={body}>
        기초연금 매월 35만 원 받는 것만으로 생활이 빠듯하죠.
        &quot;이거 말고 더 받을 수 있는 건 없나?&quot; 궁금한 분이 많고요.
      </p>
      <p style={body}>
        기초연금 수급자는 건강보험료 감면, 통신비 할인, 전기요금 할인, 난방비 지원 등 여러 추가 혜택을 받을 수 있어요.
        문제는 이런 혜택이 자동으로 적용되는 게 아니라 <strong>직접 신청해야 하는 것</strong>이 대부분이라는 점이죠.
        모르고 지나치면 그만큼 손해예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>건강 관련 감면 혜택</H2>
      <SectionBadge>의료비 절약</SectionBadge>

      <p style={body}>
        65세 이상이면 기초연금과 별개로 건강보험에서 제공하는 의료 혜택이 있어요. 틀니는 본인부담 30%로 건강보험이 적용되고, 임플란트는 평생 2개까지 보험 적용이 되죠.
      </p>
      <p style={body}>
        건강보험료 경감은 소득 수준에 따라 적용 여부가 달라져요. 기초연금 수급자 중 소득 하위 구간에 해당하면 보험료가 줄어들 수 있고, 국민건강보험공단(1577-1000)에 문의하면 본인이 경감 대상인지 바로 확인할 수 있죠.
      </p>
      <p style={body}>
        기초생활수급자이면서 기초연금도 받고 있다면 의료급여 1종 또는 2종이 유지돼요. 의료급여 대상이면 병원비 본인부담이 크게 줄어드니,{" "}
        <Link href="/w/기초연금-의료급여-건보료-감면" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료급여 연계 혜택</Link>도 함께 확인해 보세요.
      </p>

      <Checklist items={HEALTH_CHECKLIST} />

      <Divider />

      <H2>생활비 감면과 할인 혜택</H2>
      <SectionBadge>통신비/교통비/에너지</SectionBadge>

      <p style={body}>
        통신비 할인은 기초생활수급자, 차상위 계층에게 적용되는데, 기초연금 수급자 중 상당수가 이 조건에 해당돼요.
        SKT, KT, LGU+ 모두 월 최대 11,000원 정도 할인해 주죠. 통신사 대리점에 수급 확인서를 가져가면 바로 신청할 수 있어요.
      </p>
      <p style={body}>
        전기요금은 한국전력(123)에 감면 신청을 하면 되고, 도시가스 요금 감면은 지자체별로 운영해요.
        에너지 바우처는 매년 신청 시기가 있으니 주민센터에서 안내받는 게 가장 확실하죠.
      </p>
      <p style={body}>
        교통비는 65세 이상이면 지하철 무임승차가 가능하고, 지자체에 따라 버스비 할인이나 택시비 지원도 있어요.
        문화누리카드는 기초수급자·차상위 대상으로 연 11만 원 문화비를 지원하니, 해당되면 꼭 신청하세요.
      </p>

      <Checklist items={LIVING_CHECKLIST} />

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>혜택 신청, 이 순서로 하면 돼요</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        감면 혜택이 여러 곳에 흩어져 있어서 한 번에 신청하기가 어렵죠. 가장 효율적인 방법은 주민센터에서 &apos;찾아가는 복지 상담&apos;을 받는 거예요. 본인이 받을 수 있는 혜택을 한 번에 안내받을 수 있거든요.
      </p>
      <p style={body}>
        온라인으로는 복지로(bokjiro.go.kr)에서 &apos;복지서비스 모의계산&apos;을 통해 대상 여부를 조회할 수 있고, 정부24(gov.kr)에서도 복지 서비스를 통합 검색할 수 있어요.
      </p>
      <p style={body}>
        신청할 때 기초연금 수급 확인서가 필요한 경우가 많으니, 주민센터에서 미리 발급받아 두면 편리하죠.
      </p>

      <Steps steps={STEPS_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금 수급자의 추가 혜택에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 정부 복지 정책을 바탕으로 작성됐어요. 지자체별 추가 지원은 거주 지역에 따라 다르니, 주민센터(전화 120)에 문의하세요." />
    </ArticleLayout>
  );
}
