"use client";

// Q1. 기초연금 신청하려는데 소득인정액이 뭔지 모르겠고, 내 소득과 재산으로 기준을 통과할 수 있는지 계산해보고 싶은 상황
// Q2. 소득인정액 계산 공식을 이해하고, 각 공제항목을 적용해서 내 소득인정액을 대략 계산해보는 것
// Q3. (1) 소득인정액 = 소득평가액 + 재산의 소득환산액 공식 (2) 소득 공제항목 (3) 재산 공제항목 (4) 선정기준액과 비교
// Q4. GreenBox(계산 공식) + BorderBox(소득 공제 + 재산 공제) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "소득인정액과 실제 소득은 뭐가 다른가요?",
    a: "소득인정액은 실제 소득에서 각종 공제를 적용하고, 재산을 소득으로 환산한 금액을 더한 거예요. 실제 소득보다 낮은 경우가 많아요.",
  },
  {
    q: "자녀가 용돈을 보내주면 소득인정액에 포함되나요?",
    a: "자녀의 사적 이전소득(용돈)은 소득인정액 산정에 포함되지 않아요. 가족 간의 비정기적 금전 지원은 반영 대상이 아니에요.",
  },
  {
    q: "기초생활수급자도 기초연금을 받을 수 있나요?",
    a: "네, 기초생활수급자도 65세 이상이고 소득인정액 기준을 충족하면 기초연금을 받을 수 있어요. 다만 생계급여와 중복 시 기초연금만큼 생계급여가 줄어들 수 있어요.",
  },
  {
    q: "재산이 아예 없으면 소득만으로 계산하나요?",
    a: "네, 재산이 없으면 재산의 소득환산액이 0원이라 소득평가액만으로 소득인정액이 결정돼요. 이 경우 기초연금 수급 가능성이 높아요.",
  },
  {
    q: "복지로에서 모의계산을 할 수 있나요?",
    a: "네, 복지로(bokjiro.go.kr)에서 기초연금 모의계산을 할 수 있어요. 소득, 재산 정보를 입력하면 예상 수급 여부와 예상 금액을 알려줘요.",
  },
  {
    q: "소득인정액이 기준보다 약간 높으면 방법이 없나요?",
    a: "공제항목을 꼼꼼히 적용했는지 주민센터에서 확인해보세요. 근로소득 공제, 금융재산 공제, 기본재산액 공제 등을 빠뜨린 경우가 있어요. 모의계산 후 재신청도 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제2조(소득인정액 정의)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령 제3조(재산의 소득환산)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 소득인정액 산정 기준", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-기본재산액-공제-지역별기준", title: "기본재산액 공제와 지역별 기준", description: "부동산이 있을 때 적용되는 기본재산액 공제예요." },
  { slug: "기초연금-근로소득-공제기준-계산", title: "근로소득 공제 기준과 계산", description: "일하면서 기초연금 받을 때 근로소득 공제 방법이에요." },
  { slug: "기초연금-금융재산-공제기준-계산", title: "금융재산 공제 기준과 계산", description: "예금·적금이 있을 때 공제되는 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-소득인정액-계산-공제항목" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>소득인정액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 소득인정액, 어떻게 계산할까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        소득·재산 공제항목 정리
      </p>

      <p style={body}>
        기초연금을 받으려면 소득인정액이 선정기준액 이하여야 해요. 그런데 "소득인정액"이 정확히 뭔지, 내 소득과 재산이 어떻게 계산되는지 모르는 분이 많죠. 실제 소득보다 낮게 나오는 경우가 많으니, 공제항목을 꼼꼼히 확인하는 게 중요해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소득인정액 계산 공식</H2>
      <p style={body}>
        소득인정액은 소득평가액과 재산의 소득환산액을 더한 금액이에요. <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75" }}>기초연금법 제2조</Link>에 정의돼 있어요.
      </p>

      <GreenBox>
        <strong>소득인정액 = 소득평가액 + 재산의 소득환산액</strong><br /><br />
        <strong>소득평가액</strong> = 근로소득 - 112만원 공제 후 x 70% + 기타소득(연금·이자·임대 등)<br /><br />
        <strong>재산의 소득환산액</strong> = (재산 - 기본재산액 공제 - 부채) x 연 4% / 12개월<br />
        금융재산은 2,000만원 추가 공제<br /><br />
        2026년 선정기준액: 단독 247만원 / 부부 395만2천원
      </GreenBox>

      <p style={body}>
        핵심은 "공제"예요. 소득과 재산 모두 그대로 반영되는 게 아니라 상당 부분이 공제되고 남은 금액만 소득인정액에 들어가죠.
      </p>

      <H2>소득 공제항목</H2>
      <p style={body}>
        소득평가액을 구할 때 적용되는 공제항목이에요. 항목별로 공제 방식이 달라요.
      </p>

      <BorderBox>
        <strong>소득 유형별 공제</strong><br /><br />
        <strong>근로소득</strong>: 112만원 기본 공제 + 나머지의 30% 추가 공제<br />
        예) 월 200만원 근로소득 → (200만 - 112만) x 70% = 61만6천원만 반영<br /><br />
        <strong>공적이전소득</strong>(국민연금·공무원연금 등): 전액 반영 (공제 없음)<br /><br />
        <strong>무료임차소득</strong>: 자녀 소유 고가주택(시가 6억 이상)에 거주 시 연 0.78% 반영<br /><br />
        <strong>사적이전소득</strong>(자녀 용돈 등): 반영하지 않음<br /><br />
        <strong>이자·배당소득</strong>: 연간 금액을 12로 나눠 월 소득으로 환산
      </BorderBox>

      <p style={body}>
        근로소득 공제가 가장 큰 편이에요. 월 200만원을 벌어도 소득인정액에는 약 62만원만 반영되니, 일하고 있다고 기초연금을 못 받는 건 아니에요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>재산 공제항목</H2>
      <p style={body}>
        재산도 전부 소득으로 환산되는 게 아니에요. <Link href="/w/기초연금-기본재산액-공제-지역별기준" style={{ color: "#1D9E75" }}>기본재산액 공제</Link>가 먼저 적용되고, 부채를 빼고, 남은 금액만 환산돼요.
      </p>

      <BorderBox>
        <strong>재산 유형별 공제</strong><br /><br />
        <strong>기본재산액 공제 (지역별)</strong><br />
        대도시: 1억3,500만원 / 중소도시: 8,500만원 / 농어촌: 7,250만원<br /><br />
        <strong>금융재산</strong>: 2,000만원 기본 공제 후 나머지만 반영<br /><br />
        <strong>부채</strong>: 재산에서 차감 (임대보증금, 주택담보대출 등)<br /><br />
        <strong>자동차</strong>: 일반 자동차는 시가 기준 반영, 생업용 자동차 1대 제외<br /><br />
        <strong>환산율</strong>: 공제 후 재산 x 연 4% / 12개월 = 월 소득환산액
      </BorderBox>

      <p style={body}>
        예를 들어 서울(대도시)에 시가 2억 원짜리 집이 있고 부채가 5,000만원이라면, (2억 - 1.35억 - 5,000만) x 4% / 12 = 약 5만원만 소득인정액에 반영돼요. 집이 있다고 무조건 탈락하는 게 아니죠.
      </p>

      <H2>계산이 복잡하면 모의계산기를 쓰세요</H2>
      <p style={body}>
        소득인정액 계산이 복잡한 건 사실이에요. 소득 종류도 많고 재산 유형마다 환산 방식이 달라서 직접 계산하기 어렵죠.
      </p>
      <p style={body}>
        가장 빠른 방법은 <Link href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75" }}>복지로</Link> 기초연금 모의계산기를 이용하는 거예요. 소득, 재산 정보를 입력하면 예상 소득인정액과 수급 가능 여부를 바로 확인할 수 있어요.
      </p>
      <p style={body}>
        주민센터에 방문하면 담당자가 직접 계산해줘요. 본인이 놓치고 있는 공제항목을 알려주는 경우도 많으니, 기준선에 가까운 분은 꼭 상담받아 보세요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법과 보건복지부 자료를 바탕으로 작성됐어요. 소득인정액은 개인 상황에 따라 달라지니 복지로 모의계산기나 주민센터에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
