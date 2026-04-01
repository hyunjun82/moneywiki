"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 65세가 됐거나 부모님이 곧 65세인데 기초연금 받을 수 있는지 자격 조건을 확인하려는 상황
// Q2. 선정기준액과 소득 조건을 확인하고, 내가(부모님이) 대상인지 판단한 뒤 신청하러 갈 수 있어야 함
// Q3. ① 2026년 선정기준액(단독 247만, 부부 395.2만) ② 소득인정액 계산법(근로·재산 공제) ③ 나이·국적 조건 ④ 직역연금 수급자 제외 기준
// Q4. GreenBox(선정기준액 요약) + BorderBox(소득인정액 계산) + EligibilityChecker(자격 체크) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const ELIGIBILITY_ITEMS = [
  { id: "c", label: "만 65세 이상이에요" },
  { id: "c", label: "대한민국 국적이고 국내 거주 중이에요" },
  { id: "c", label: "공무원·사학·군인·별정우체국 연금을 받고 있지 않아요" },
  { id: "c", label: "월 소득인정액이 단독 247만원(부부 395만2천원) 이하예요" },
];

const FAQS = [
  {
    q: "65세 생일 전에도 신청할 수 있나요?",
    a: "생일이 속하는 달의 1개월 전부터 신청할 수 있어요. 예를 들어 4월 생일이면 3월 1일부터 가능하죠. 미리 신청해야 생일 달부터 바로 받을 수 있어요.",
  },
  {
    q: "재산이 많으면 무조건 탈락하나요?",
    a: "아니에요. 재산은 지역별 기본공제를 빼고 소득으로 환산하기 때문에, 대도시 기준 1억3,500만원까지는 재산이 0으로 계산돼요. 실거주 주택이 있어도 받는 분이 많아요.",
  },
  {
    q: "국민연금을 많이 받으면 기초연금을 못 받나요?",
    a: "국민연금을 받아도 기초연금 자격은 유지돼요. 다만 국민연금 월 수령액의 A급여액이 기준연금액의 150%(524,040원)를 넘으면 기초연금이 일부 감액될 수 있어요.",
  },
  {
    q: "자녀 소득이 높으면 탈락하나요?",
    a: "기초연금은 본인(부부 기준)의 소득·재산만 봐요. 자녀의 소득이나 재산은 심사에 반영되지 않아요. 자녀가 고소득이어도 본인 소득인정액이 기준 이하이면 받을 수 있죠.",
  },
  {
    q: "소득인정액을 미리 계산해볼 수 있나요?",
    a: "복지로(bokjiro.go.kr) 모의계산기에서 확인할 수 있어요. 근로소득, 연금소득, 부동산, 금융재산 등을 입력하면 예상 소득인정액이 나와요. 주민센터에서도 무료 상담을 받을 수 있어요.",
  },
  {
    q: "기초생활수급자도 기초연금을 받을 수 있나요?",
    a: "받을 수 있어요. 다만 생계급여 수급자는 기초연금만큼 생계급여가 줄어들 수 있어서, 실질적인 추가 소득이 크지 않을 수 있어요. 정확한 금액은 주민센터에서 확인하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 2026년 기초연금 선정기준액 고시", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 안내", url: "https://www.bokjiro.go.kr" },
      { label: "국민연금공단: 기초연금 안내", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득하위70-소득인정액-재산기준", title: "소득 하위 70%면 기초연금 무조건 받을까?", description: "소득인정액 계산과 재산 기준을 자세히 풀었어요." },
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 한 달에 얼마 받을까?", description: "단독·부부 수령액과 계산법 정리예요." },
  { slug: "기초연금-탈락사유-재신청-방법", title: "기초연금 탈락했다면?", description: "탈락 사유별 재신청 방법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-수급자격-선정기준액-소득조건" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>수급자격</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        2026년 기초연금 수급자격, 누가 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        선정기준액과 소득 조건
      </p>

      <p style={body}>
        부모님이 곧 65세가 되시거나, 본인이 기초연금 대상인지 궁금하시죠. 기초연금은 만 65세 이상이면 누구나 신청할 수 있지만, 소득인정액이 선정기준액 이하여야 받을 수 있어요.
      </p>
      <p style={body}>
        2026년 기준 단독가구 월 247만원, 부부가구 월 395만2천원 이하가 기준이에요. 여기서 말하는 소득인정액은 실제 월급이 아니라, 각종 공제를 적용한 뒤의 금액이라서 생각보다 기준 안에 드는 분이 많아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>선정기준액, 2026년에 얼마로 바뀌었을까?</H2>
      <p style={body}>
        기초연금 선정기준액은 매년 바뀌어요. 65세 이상 인구의 소득 하위 70%를 선정하기 위한 기준선이죠. <Link href="/w/기초연금-소득하위70-소득인정액-재산기준" style={{ color: "#1D9E75", fontWeight: 600 }}>소득 하위 70% 기준</Link>은 실제 소득이 아니라 소득인정액으로 판단해요.
      </p>
      <p style={body}>
        보건복지부가 매년 1월에 고시하는데, 물가 상승과 노인 소득 분포를 반영해서 조금씩 올라가고 있어요. 2025년에는 단독 228만원이었는데 2026년에는 247만원으로 올랐죠.
      </p>

      <GreenBox>
        <strong>2026년 기초연금 선정기준액</strong><br /><br />
        단독가구: 월 소득인정액 247만원 이하<br />
        부부가구: 월 소득인정액 395만2천원 이하<br /><br />
        기준연금액(최대 지급액): 월 349,360원<br />
        부부 모두 수급 시: 각각 20% 감액 → 1인당 월 279,488원
      </GreenBox>

      <p style={body}>
        선정기준액은 "이 금액 이하이면 받을 수 있다"는 커트라인이에요. 소득인정액이 이 기준보다 1원이라도 높으면 탈락하게 되죠. 다만 소득인정액 계산에 공제가 많이 들어가기 때문에, 월급 247만원을 받는다고 탈락하는 건 아니에요.
      </p>

      <Divider />

      <H2>소득 조건, 소득인정액은 이렇게 계산해요</H2>
      <p style={body}>
        소득인정액은 소득평가액과 재산의 소득환산액을 더한 금액이에요. 단순히 월급만 보는 게 아니라, 부동산·자동차·금융재산까지 소득으로 환산해서 합산하죠.
      </p>
      <p style={body}>
        근로소득은 월 112만원을 먼저 빼고, 남은 금액의 30%를 추가로 공제해요. 예를 들어 월 200만원을 벌면, (200만 - 112만) x 70% = 61만6천원만 소득으로 잡히는 거예요.
      </p>

      <BorderBox>
        <strong>소득인정액 = 소득평가액 + 재산의 소득환산액</strong><br /><br />
        <strong>소득평가액</strong><br />
        근로소득: (월 근로소득 - 112만원) x 70%<br />
        공적연금: 국민연금·공무원연금 등 전액 반영<br />
        기타소득: 임대소득·이자소득·사업소득 등<br /><br />
        <strong>재산의 소득환산액</strong><br />
        (일반재산 + 금융재산 - 기본공제 - 부채) x 4% / 12<br />
        기본공제: 대도시 1억3,500만원 / 중소도시 8,500만원 / 농어촌 7,250만원<br />
        금융재산: 2,000만원 공제
      </BorderBox>

      <p style={body}>
        국민연금은 전액 소득으로 잡혀요. 월 100만원 국민연금을 받으면 100만원 그대로 반영되죠. 반면 근로소득은 112만원 공제 + 30% 추가 공제가 있어서, 일하면서 받는 소득은 상당히 줄어들어요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수급자격 조건, 한눈에 체크해보세요</H2>
      <p style={body}>
        기초연금 수급자격은 크게 나이, 국적, 소득 세 가지예요. 만 65세 이상 대한민국 국적자로 국내에 거주하면서, 소득인정액이 선정기준액 이하이면 돼요.
      </p>
      <p style={body}>
        다만 <Link href="/w/공무원연금-기초연금-직역연금-예외조건" style={{ color: "#1D9E75", fontWeight: 600 }}>공무원연금·사학연금·군인연금·별정우체국연금</Link> 수급자와 그 배우자는 원칙적으로 제외돼요. 예외가 있긴 하지만 기본적으로는 직역연금을 받으면 기초연금 대상에서 빠지죠.
      </p>

      <EligibilityChecker items={ELIGIBILITY_ITEMS} />

      <p style={body}>
        위 네 가지를 모두 충족하면 기초연금 신청 자격이 돼요. 자녀 소득은 전혀 관계없고, 본인(부부 기준)의 소득·재산만 심사해요. 집이 있어도 기본공제 후 계산하면 기준 이하인 경우가 많으니, 일단 신청해보는 게 좋아요.
      </p>

      <Divider />

      <H2>선정기준액 넘으면 어떻게 될까?</H2>
      <p style={body}>
        소득인정액이 선정기준액을 약간 넘는 경우, 소득역전방지 감액이 적용될 수 있어요. 이건 기준선 바로 아래 있는 수급자보다 기준선 바로 위에 있는 비수급자가 오히려 소득이 적어지는 걸 막기 위한 장치예요.
      </p>
      <p style={body}>
        하지만 기준을 넘으면 기본적으로 탈락이에요. 이때 근로소득 공제나 재산 공제가 제대로 반영됐는지 꼭 확인해보세요. 주민센터에서 모의 계산을 받아보면, 공제 적용 전후 차이가 생각보다 클 수 있어요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-탈락사유-재신청-방법" style={{ color: "#1D9E75", fontWeight: 600 }}>탈락 후 재신청 방법</Link>도 있으니, 소득·재산 변동이 생기면 언제든 다시 신청할 수 있어요. 재산을 처분하거나 근로소득이 줄었을 때가 재신청 타이밍이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 보건복지부 고시 기준으로 작성했어요. 소득인정액은 개인 상황에 따라 달라지니 주민센터 또는 복지로(bokjiro.go.kr)에서 정확히 확인하세요." />
    </ArticleLayout>
  );
}
