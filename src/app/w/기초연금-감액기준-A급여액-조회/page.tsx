"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금이 깎인다고 들었는데, 왜 깎이는지 모르겠고 내 A급여액이 얼마인지 확인하고 싶은 상황
// Q2. 기초연금 감액 3가지 사유를 이해하고, A급여액을 직접 조회해서 내 감액 여부를 판단하는 것
// Q3. (1) 감액 3가지 유형(연계·부부·소득역전) (2) A급여액 조회 방법 (3) 감액 후 최소 지급액
// Q4. GreenBox(감액 3유형 요약) + Steps(A급여액 조회 절차) + BorderBox(최소 지급액) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const QUERY_STEPS = [
  {
    title: "국민연금공단 홈페이지 접속",
    desc: "nps.or.kr에 접속해서 '내 연금 알아보기' 메뉴로 들어가세요. 공동인증서나 간편인증(카카오, 네이버 등)으로 본인 인증이 필요해요.",
  },
  {
    title: "가입내역 조회에서 A급여액 확인",
    desc: "가입내역 상세조회를 하면 본인의 A급여액을 확인할 수 있어요. A급여액은 전체 가입자 평균소득을 기반으로 본인의 가입 기간에 비례해서 산정돼요.",
  },
  {
    title: "기준선과 비교",
    desc: "2026년 기준 연계감액 시작선은 524,040원(기준연금액의 150%)이에요. 내 A급여액이 이 금액 이하이면 연계감액 없이 기초연금 전액을 받을 수 있어요.",
    tip: "전화 조회도 가능해요. 국민연금공단 고객센터 1355로 전화하세요",
  },
];

const FAQS = [
  {
    q: "기초연금이 깎이면 최소 얼마는 받을 수 있나요?",
    a: "기준연금액의 10%인 약 34,936원이 최소 지급액이에요. 연계감액, 부부감액, 소득역전 방지 감액이 모두 적용되더라도 이 금액 이하로는 안 내려가요.",
  },
  {
    q: "감액 3가지가 전부 동시에 적용될 수 있나요?",
    a: "이론적으로는 가능하지만 실제로 3가지 모두 적용되는 경우는 드물어요. 보통 연계감액+부부감액, 또는 소득역전 방지 감액 중 하나가 적용되는 경우가 많아요.",
  },
  {
    q: "A급여액이 매년 바뀌나요?",
    a: "네, A급여액은 매년 전체 가입자의 평균소득월액이 변하면서 함께 바뀌어요. 보통 매년 소폭 상승하는 추세예요.",
  },
  {
    q: "국민연금을 아직 안 받고 있으면 연계감액이 없나요?",
    a: "국민연금 수급 개시 전이라면 연계감액이 적용되지 않아요. 다만 나중에 국민연금을 받기 시작하면 그때부터 연계감액이 적용될 수 있어요.",
  },
  {
    q: "감액에 불복할 수 있나요?",
    a: "기초연금 결정에 이의가 있으면 결정 통지를 받은 날로부터 90일 이내에 이의신청을 할 수 있어요. 주민센터나 국민연금공단에서 접수하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조~제8조(기초연금액 산정·감액)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국민연금공단: 내 연금 알아보기", url: "https://www.nps.or.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-연계감액-계산-A급여액", title: "연계감액 계산과 A급여액 상세", description: "연계감액 공식과 계산 예시를 정리했어요." },
  { slug: "기초연금-부부감액-20-기준-축소계획", title: "부부감액 20% 기준", description: "부부가 함께 받을 때 감액되는 기준이에요." },
  { slug: "기초연금-소득역전방지-감액기준", title: "소득역전 방지 감액", description: "기초연금 때문에 소득이 역전되는 경우의 감액이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-감액기준-A급여액-조회" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>감액 기준</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 얼마나 깎이는 걸까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        감액 기준과 A급여액 조회
      </p>

      <p style={body}>
        기초연금을 신청했더니 생각보다 적게 나와서 당황하는 분이 많아요. 기초연금은 최대 349,360원이지만, 3가지 감액 사유에 따라 줄어들 수 있거든요. 내가 왜 깎이는지, A급여액이 얼마인지 조회하는 방법까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기초연금 감액, 3가지 사유부터 파악하기</H2>
      <p style={body}>
        기초연금이 줄어드는 이유는 크게 3가지예요. 어떤 감액이 적용됐는지에 따라 대응 방법이 달라지죠.
      </p>

      <GreenBox>
        <strong>기초연금 감액 3가지</strong><br /><br />
        1. 국민연금 연계감액: 국민연금 A급여액이 524,040원(기준연금액의 150%) 초과 시 감액<br />
        2. 부부감액: 부부 모두 기초연금 수급 시 각각 20% 감액 (1인당 279,488원)<br />
        3. 소득역전 방지 감액: 기초연금을 더했을 때 선정기준액을 넘으면 초과분만큼 감액<br /><br />
        최소 지급액: 기준연금액의 10% (약 34,936원) 보장
      </GreenBox>

      <p style={body}>
        3가지 감액 중 본인에게 해당하는 게 뭔지 확인하려면, 먼저 국민연금 A급여액을 조회하고 부부 수급 여부를 확인해야 해요.
      </p>

      <H2>A급여액 조회 방법</H2>
      <p style={body}>
        A급여액은 국민연금 가입 기간과 전체 가입자 평균소득을 기반으로 산정되는 금액이에요. 이 금액이 연계감액 판단의 핵심이죠.
      </p>

      <Steps steps={QUERY_STEPS} />

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>감액돼도 최소 지급액은 보장돼요</H2>
      <p style={body}>
        감액이 여러 개 겹쳐도 기초연금이 0원이 되지는 않아요. <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75" }}>기초연금법</Link>에서 최소 지급액을 보장하고 있거든요.
      </p>

      <BorderBox>
        <strong>최소 지급액</strong><br />
        기준연금액의 10% = 349,360원 x 10% = 약 34,936원<br /><br />
        연계감액 + 부부감액 + 소득역전 방지 감액이 전부 적용되더라도<br />
        월 34,936원 이하로는 떨어지지 않아요
      </BorderBox>

      <p style={body}>
        다만 최소 지급액 수준까지 감액되는 경우는 극히 드물어요. 대부분은 감액 1~2가지만 적용되고, 기초연금의 절반 이상은 받는 경우가 많아요.
      </p>

      <H2>감액 결과가 이상하면 이의신청하세요</H2>
      <p style={body}>
        기초연금 결정 통지서를 받았는데 금액이 예상보다 많이 적다면, 90일 이내에 이의신청을 할 수 있어요. 주민센터나 <Link href="https://www.nps.or.kr" style={{ color: "#1D9E75" }}>국민연금공단</Link> 지사에서 접수하면 돼요.
      </p>
      <p style={body}>
        이의신청을 하면 소득·재산 자료를 다시 확인하고, 감액 계산이 정확한지 재검토해요. 실제로 재산 평가나 소득 산정에서 오류가 발견되는 경우도 있으니 꼼꼼하게 확인해볼 만해요.
      </p>
      <p style={body}>
        특히 <Link href="/w/기초연금-이의신청-심사청구-절차" style={{ color: "#1D9E75" }}>이의신청 절차</Link>가 복잡하지 않으니, 금액이 이상하다고 느끼면 바로 문의하는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법과 보건복지부 자료를 바탕으로 작성됐어요. A급여액은 매년 변동되니 국민연금공단에서 최신 금액을 확인하세요." />
    </ArticleLayout>
  );
}
