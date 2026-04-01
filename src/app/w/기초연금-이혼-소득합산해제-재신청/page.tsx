"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 이혼 후 배우자 소득 합산이 풀려서 기초연금을 새로 받을 수 있는지 궁금한 어르신
// Q2: 이혼 시 소득 합산 해제 구조를 이해하고 재신청 절차를 밟아 수급 개시
// Q3: 부부→단독가구 전환, 선정기준 변화, 재신청 시점과 서류, 위장이혼 주의
// Q4: GreenBox(결론) + BorderBox(기준 비교) + Steps(재신청) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const STEPS = [
  { title: "이혼 신고 완료", desc: "법원 판결 또는 협의이혼 신고가 완료되어 주민등록에 반영된 상태여야 해요." },
  { title: "주민센터 방문 또는 복지로 접속", desc: "가까운 주민센터, 국민연금공단 지사, 복지로(bokjiro.go.kr)에서 기초연금을 신청하세요." },
  { title: "구비서류 제출", desc: "신분증, 통장 사본, 금융정보등제공동의서, 이혼 사실이 반영된 가족관계증명서를 준비하세요." },
  { title: "단독가구 기준 심사", desc: "이혼 후에는 단독가구 선정기준(247만 원)으로 심사를 받게 돼요." },
  { title: "수급 결정 및 지급 개시", desc: "신청 후 약 30일 이내에 결과가 나오고, 수급이 결정되면 매월 25일에 입금돼요." },
];

const FAQS = [
  {
    q: "이혼하면 자동으로 기초연금이 나오나요?",
    a: "자동은 아니에요. 이혼 후 단독가구로 전환됐더라도 기초연금은 본인이 직접 신청해야 해요. 신청하지 않으면 수급이 안 되고, 소급 지급도 안 되죠.",
  },
  {
    q: "별거 상태에서도 단독가구로 인정되나요?",
    a: "법률적 혼인 관계가 유지되면 별거 중이라도 부부가구로 봐요. 단독가구 기준을 적용받으려면 이혼 신고가 완료되어야 하죠. 사실혼 관계도 주민등록 주소지 등을 기준으로 부부가구 여부를 판단해요.",
  },
  {
    q: "위장이혼으로 기초연금 받으면 어떻게 되나요?",
    a: "부정수급으로 적발되면 기초연금 전액 환수 + 가산금이 부과돼요. 기초연금법 제19조에 따라 부정수급액의 최대 2배까지 환수할 수 있고, 형사 처벌(3년 이하 징역 또는 3천만 원 이하 벌금) 대상이 되죠.",
  },
  {
    q: "이혼 전에 탈락했었는데, 이혼 후 다시 신청할 수 있나요?",
    a: "물론이죠. 이전에 부부가구 기준으로 탈락했더라도 이혼 후 단독가구 기준이 적용되면 선정기준을 충족할 수 있어요. 이혼 신고 후 바로 재신청하면 돼요.",
  },
  {
    q: "재혼하면 기초연금은 어떻게 되나요?",
    a: "재혼하면 다시 부부가구로 전환돼요. 부부가구 선정기준(395.2만 원)으로 재산정되고, 기준을 넘으면 수급이 중지될 수 있죠. 재혼 사실은 반드시 신고해야 해요.",
  },
  {
    q: "이혼 후 자녀와 함께 살면 소득인정액에 영향이 있나요?",
    a: "기초연금 소득인정액은 본인(과 배우자)만 기준이에요. 자녀 소득이나 재산은 직접 반영되지 않죠. 다만 자녀가 증여한 재산이 있으면 그건 반영될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 제19조: 부정수급 환수", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-부부가구-소득인정액-기준",
    title: "부부가구 소득인정액 기준",
    description: "부부가구일 때 소득인정액이 어떻게 합산되는지 정리했어요.",
  },
  {
    slug: "기초연금-탈락사유-재신청-방법",
    title: "기초연금 탈락 재신청",
    description: "탈락 후 다시 신청하는 방법과 시기를 안내했어요.",
  },
  {
    slug: "기초연금-신청방법-절차",
    title: "기초연금 신청 방법",
    description: "온라인과 오프라인 신청 절차를 한 번에 정리했어요.",
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
          currentSlug="기초연금-이혼-소득합산해제-재신청"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>이혼 소득 합산 해제</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        이혼하면 기초연금 새로 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        소득 합산 해제와 재신청 절차
      </p>

      <p style={body}>
        배우자 재산이 많아서 기초연금에서 탈락한 분들이 이혼 후 &quot;이제 혼자니까 다시 받을 수 있지 않을까?&quot; 궁금해하죠.
      </p>
      <p style={body}>
        맞아요. <strong>이혼하면 배우자 소득·재산 합산이 해제</strong>돼요.{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법</a>은
        배우자가 있으면 부부가구(선정기준 395.2만 원), 없으면 단독가구(선정기준 247만 원)로 구분하죠.
        이혼으로 단독가구가 되면 본인 소득·재산만으로 심사를 받게 돼요.
      </p>
      <p style={body}>
        다만 이혼 후 기초연금이 자동으로 나오는 건 아니에요. 직접 신청해야 하고, 단독가구 기준으로 소득인정액을 따져야 하죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소득 합산 해제로 선정기준이 어떻게 바뀌나요?</H2>
      <SectionBadge>기준 변화</SectionBadge>

      <p style={body}>
        부부가구일 때는 부부의 소득과 재산을 모두 합산해서 소득인정액을 계산해요.
        선정기준도 395.2만 원으로 단독가구(247만 원)보다 높지만, 합산 소득인정액이 이 기준을 넘기는 경우가 많죠.
      </p>
      <p style={body}>
        이혼 후에는 본인 소득·재산만으로 소득인정액을 산정하고, 선정기준도 단독가구 247만 원이 적용돼요.
        배우자 재산이 빠지기 때문에 소득인정액이 크게 줄어들 수 있죠.
      </p>
      <p style={body}>
        예를 들어 배우자가 아파트와 연금을 갖고 있어서 부부가구 소득인정액이 500만 원이었다면, 이혼 후 본인 소득인정액이 200만 원으로 떨어져 단독가구 기준(247만 원)을 충족할 수 있는 거예요.
      </p>

      <BorderBox>
        <strong>부부가구</strong>: 부부 합산 소득인정액 / 선정기준 395.2만 원<br />
        <strong>단독가구(이혼 후)</strong>: 본인만 소득인정액 / 선정기준 247만 원<br />
        이혼 → 배우자 소득·재산 합산 해제 → 소득인정액 감소
      </BorderBox>

      <Divider />

      <H2>이혼 후 재신청 절차</H2>
      <SectionBadge>신청 방법</SectionBadge>

      <p style={body}>
        이혼 신고가 주민등록에 반영된 후에 기초연금을 신청할 수 있어요. 협의이혼이든 재판이혼이든, 이혼 확인서나 판결문이 시·구·읍면에 접수되어 주민등록이 변경된 상태여야 하죠.
      </p>
      <p style={body}>
        신청은 주민센터, 국민연금공단 지사, 복지로(bokjiro.go.kr) 중 편한 곳에서 하면 돼요.
        이전에 탈락한 이력이 있더라도 상관없이 다시 신청할 수 있고, 이혼 사실이 반영된 가족관계증명서를 제출하면 단독가구로 심사를 받게 되죠.
      </p>
      <p style={body}>
        신청 후 약 30일 이내에 결과가 나와요. 수급이 결정되면 신청월부터 기초연금이 산정되고, 매월 25일에 입금되죠.
        소급 지급은 안 되니 이혼 후 가급적 빨리 신청하는 게 유리해요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>위장이혼은 부정수급, 환수 대상이에요</H2>

      <p style={body}>
        기초연금을 받으려고 위장이혼을 하는 사례가 있는데, <strong>적발되면 부정수급으로 처벌받아요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 제19조</a>에 따라
        부정수급액 전액 환수에 최대 2배의 가산금이 부과되고, 형사 처벌(3년 이하 징역 또는 3천만 원 이하 벌금) 대상이 되죠.
      </p>
      <p style={body}>
        보건복지부와 지자체는 이혼 후에도 동일 주소지에 거주하거나, 재산 이전 패턴이 이상한 경우를 모니터링하고 있어요.
        주민등록 이동 이력, 재산 변동, 금융 거래 등을 조사해서 위장이혼 여부를 판별하죠.
      </p>
      <p style={body}>
        진짜 이혼으로 생활이 분리된 경우에만 단독가구 기준이 적용되는 거예요.
        위장이혼으로 적발되면 기초연금뿐 아니라 다른 복지 급여까지 전부 환수될 수 있으니, 절대 시도하면 안 되죠.
      </p>

      <GreenBox>
        위장이혼 적발 시: 전액 환수 + 가산금(최대 2배) + 형사 처벌<br />
        동일 주소지 거주, 재산 이전 패턴 등으로 모니터링<br />
        진짜 이혼으로 생활 분리된 경우에만 단독가구 적용
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        이혼과 기초연금 재신청에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법을 바탕으로 작성됐어요. 이혼 후 소득인정액은 개인 상황에 따라 다르니, 국민연금공단(1355) 상담을 받아보세요." />
    </ArticleLayout>
  );
}
