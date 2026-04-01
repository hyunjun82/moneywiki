"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 예금이나 적금이 있는데 기초연금을 받을 수 있는지, 금융재산이 얼마까지 괜찮은지 궁금한 상황
// Q2. 금융재산 공제 기준(2,000만원)을 이해하고, 내 금융재산이 소득인정액에 얼마나 반영되는지 계산하는 것
// Q3. (1) 금융재산 2,000만원 공제 (2) 금융재산에 포함되는 항목 (3) 소득환산 계산 예시
// Q4. GreenBox(공제 기준) + BorderBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "주식도 금융재산에 포함되나요?",
    a: "네, 상장주식은 최종 시세가액 기준으로 금융재산에 포함돼요. 비상장주식은 액면가 또는 평가액 기준이에요.",
  },
  {
    q: "보험 해약환급금도 금융재산인가요?",
    a: "네, 보험의 해약환급금이 금융재산에 포함돼요. 보험료를 내는 중이라도 해약환급금 기준으로 반영돼요.",
  },
  {
    q: "장례비용으로 묶어둔 예금도 포함되나요?",
    a: "금융재산 중 장례비용으로 사전에 묶어둔 계좌는 별도 신고 시 일부 공제 인정이 될 수 있어요. 주민센터에서 상담받아 보세요.",
  },
  {
    q: "금융재산을 현금으로 인출하면 조사에 안 잡히나요?",
    a: "기초연금 조사 시 금융정보 제공 동의서를 받고, 금융기관 전체 계좌를 조회해요. 대량 인출은 오히려 재산 은닉으로 의심받을 수 있으니 주의하세요.",
  },
  {
    q: "금융재산 공제 2,000만원은 1인 기준인가요?",
    a: "네, 1인당 2,000만원이에요. 부부가구라면 각각 2,000만원씩 공제돼요.",
  },
  {
    q: "가상자산(코인)도 금융재산에 포함되나요?",
    a: "2026년 현재 가상자산은 기초연금 금융재산 조사 대상에 포함돼요. 거래소 보유 잔액이 금융재산으로 반영돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행령 제3조(재산의 범위)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 재산 기준", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 전체 계산 구조를 정리했어요." },
  { slug: "기초연금-기본재산액-공제-지역별기준", title: "기본재산액 공제와 지역별 기준", description: "부동산 재산 공제 기준이에요." },
  { slug: "기초연금-근로소득-공제기준-계산", title: "근로소득 공제 기준과 계산", description: "일하면서 기초연금 받을 때 공제 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-금융재산-공제기준-계산" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>금융재산 공제</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        예금 있어도 기초연금 될까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        금융재산 공제 기준과 계산
      </p>

      <p style={body}>
        예금, 적금, 주식 같은 금융재산이 있으면 기초연금을 못 받을까 걱정되죠. 결론부터 말하면, 금융재산 2,000만원까지는 공제되고 나머지만 소득인정액에 반영돼요. 생각보다 공제 폭이 크기 때문에 금융재산이 있다고 바로 탈락하지는 않아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>금융재산 공제 기준</H2>
      <p style={body}>
        기초연금 소득인정액 산정 시 금융재산에서 2,000만원을 기본 공제해요. <Link href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75" }}>기초연금법 시행령</Link>에 따른 규정이에요.
      </p>

      <GreenBox>
        <strong>금융재산 공제 기준 (2026년)</strong><br /><br />
        기본 공제: 2,000만원 (1인 기준)<br /><br />
        금융재산에 포함되는 것:<br />
        예금, 적금, 주식, 채권, 보험(해약환급금), 연금저축, 가상자산<br /><br />
        금융재산에 포함되지 않는 것:<br />
        압류·가압류된 금융재산, 보증금 목적 예치금
      </GreenBox>

      <p style={body}>
        금융재산이 2,000만원 이하이면 소득환산액이 0원이에요. 2,000만원을 초과하는 부분만 재산으로 잡혀요.
      </p>

      <H2>금융재산 소득환산 계산 예시</H2>
      <p style={body}>
        금융재산이 실제 소득인정액에 얼마나 영향을 주는지 계산해볼게요.
      </p>

      <BorderBox>
        <strong>금융재산 소득환산 계산</strong><br /><br />
        <strong>사례 1</strong>: 예금 3,000만원<br />
        (3,000만 - 2,000만 공제) x 4% / 12 = 약 3,333원/월<br /><br />
        <strong>사례 2</strong>: 예금 5,000만원 + 주식 2,000만원 = 합계 7,000만원<br />
        (7,000만 - 2,000만 공제) x 4% / 12 = 약 16만6,667원/월<br /><br />
        <strong>사례 3</strong>: 예금 1,500만원<br />
        2,000만원 공제 이하 → 소득환산액 0원<br /><br />
        <strong>사례 4</strong>: 예금 1억원<br />
        (1억 - 2,000만 공제) x 4% / 12 = 약 26만6,667원/월
      </BorderBox>

      <p style={body}>
        예금이 3,000만원이면 월 3,333원만 소득인정액에 반영돼요. 금융재산이 억대가 아닌 이상 큰 영향을 주지 않는 경우가 많아요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>금융재산 조사는 어떻게 이루어지나</H2>
      <p style={body}>
        기초연금 신청 시 금융정보 제공 동의서를 작성해요. 이 동의서를 기반으로 은행, 증권사, 보험사 등 전 금융기관의 계좌와 잔액을 조회하죠.
      </p>
      <p style={body}>
        조회 시점은 신청일 기준이 아니라 조사 시점의 잔액이에요. 조사 기간(약 30일) 중 계좌 잔액이 변동될 수 있으니, 일시적으로 돈이 몰려 있는 경우 조사 시점에 따라 결과가 달라질 수 있어요.
      </p>
      <p style={body}>
        가상자산(코인)도 조사 대상이에요. 국내 거래소에 보유 중인 가상자산 잔액이 금융재산으로 반영돼요.
      </p>

      <H2>금융재산이 많으면 어떻게 해야 하나</H2>
      <p style={body}>
        금융재산이 많아서 기초연금 기준을 넘길 것 같다면, <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75" }}>전체 소득인정액 계산</Link>을 먼저 해보세요. 금융재산만 보면 안 되고, 다른 소득과 재산을 모두 합산해야 정확해요.
      </p>
      <p style={body}>
        부채가 있으면 재산에서 차감되고, <Link href="/w/기초연금-기본재산액-공제-지역별기준" style={{ color: "#1D9E75" }}>기본재산액 공제</Link>도 적용되니 종합적으로 따져봐야 해요. 복지로 모의계산기에서 금융재산을 포함한 전체 소득인정액을 확인할 수 있어요.
      </p>
      <p style={body}>
        금융재산을 줄이기 위해 대량 인출하거나 타인 명의로 옮기는 건 부정수급으로 적발될 수 있으니 절대 하면 안 돼요. 정상적인 공제를 최대한 활용하는 게 방법이에요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법 시행령과 보건복지부 자료를 바탕으로 작성됐어요. 금융재산 조사 기준은 개인 상황에 따라 다를 수 있으니 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
