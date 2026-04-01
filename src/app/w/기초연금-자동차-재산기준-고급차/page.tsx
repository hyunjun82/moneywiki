"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 차를 가지고 있는데 기초연금에서 탈락할까 걱정되고, "고급차 기준"이 바뀌었다는 뉴스를 본 상황
// Q2. 자동차가 기초연금 재산에 어떻게 반영되는지, 고급차 기준 폐지 내용을 정확히 파악하는 것
// Q3. (1) 자동차 재산 반영 방식(시가 기준) (2) 생업용 자동차 1대 제외 (3) 고급차 기준 폐지 내용
// Q4. GreenBox(자동차 재산 반영 기준) + BorderBox(생업용·고급차 기준) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "차 2대를 가지고 있으면 어떻게 되나요?",
    a: "생업용 자동차 1대만 제외되고, 나머지는 전부 일반재산으로 반영돼요. 2대 모두 일반 자동차이면 2대 합산 시가가 재산에 포함돼요.",
  },
  {
    q: "자동차 시가는 어떻게 정하나요?",
    a: "행정안전부의 자동차 시가표준액을 기준으로 해요. 보험개발원 시가도 참고되고, 차량 연식에 따라 감가상각이 적용돼요.",
  },
  {
    q: "자동차를 폐차하면 바로 재산에서 빠지나요?",
    a: "네, 폐차 등록을 완료하면 다음 조사 시점부터 재산에서 제외돼요. 말소등록 서류를 주민센터에 제출하면 돼요.",
  },
  {
    q: "오토바이도 재산에 포함되나요?",
    a: "배기량 125cc 초과 오토바이(이륜자동차)는 재산에 포함돼요. 125cc 이하 소형 오토바이는 제외돼요.",
  },
  {
    q: "장애인 차량은 재산에서 제외되나요?",
    a: "장애인 보조 목적의 차량은 별도 기준이 적용될 수 있어요. 장애인등록이 된 경우 주민센터에서 상담받아 보세요.",
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
      { label: "보건복지부: 기초연금 재산 기준 개정", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 안내", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 전체 계산 구조를 정리했어요." },
  { slug: "기초연금-기본재산액-공제-지역별기준", title: "기본재산액 공제와 지역별 기준", description: "부동산 재산 공제 기준이에요." },
  { slug: "기초연금-금융재산-공제기준-계산", title: "금융재산 공제 기준", description: "예금·적금이 있을 때 공제되는 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-자동차-재산기준-고급차" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>자동차 재산</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        차 있으면 기초연금 탈락?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        자동차 재산 기준과 고급차 폐지
      </p>

      <p style={body}>
        자동차를 가지고 있으면 기초연금을 못 받는다고 생각하는 분이 많은데, 그렇지 않아요. 자동차는 시가 기준으로 일반재산에 포함되지만, 생업용 자동차 1대는 제외돼요. 그리고 기존에 3,000만원 이상 고급차는 전액 재산 반영이었는데, 이 기준이 폐지되면서 더 유리해졌어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>자동차 재산 반영 기준</H2>
      <p style={body}>
        기초연금에서 자동차는 일반재산으로 분류돼요. 시가표준액(행정안전부 기준) 또는 보험개발원 시가를 기준으로 반영되죠.
      </p>

      <GreenBox>
        <strong>자동차 재산 반영 방식</strong><br /><br />
        일반 자동차: 시가표준액 기준으로 일반재산에 포함<br />
        생업용 자동차: 1대에 한해 재산에서 제외<br />
        고급차 기준: 폐지됨 (3,000만원 이상 월 100% 반영 규정 삭제)<br /><br />
        재산 환산: (자동차 시가 + 기타재산 - 기본재산액 공제 - 부채) x 4% / 12
      </GreenBox>

      <p style={body}>
        자동차 시가가 기본재산액 공제 범위 안에 들면 소득환산액에 거의 영향이 없어요. 예를 들어 서울에 살면서 1,000만원짜리 차를 가지고 있다면, 기본재산액 1.35억 원 공제 범위에 포함되니 추가 부담이 없죠.
      </p>

      <H2>생업용 자동차 1대 제외</H2>
      <p style={body}>
        택시, 화물차, 영업용 차량 등 생업에 사용하는 자동차 1대는 재산에서 제외돼요. <Link href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75" }}>기초연금법 시행령</Link>에 따른 규정이에요.
      </p>

      <BorderBox>
        <strong>생업용 자동차 제외 조건</strong><br /><br />
        대상: 생업에 직접 사용하는 자동차 1대<br />
        예시: 택시, 화물차, 1톤 트럭, 영업용 승합차 등<br />
        증빙: 사업자등록증, 화물운송사업 허가증 등 생업 증빙 필요<br /><br />
        주의: 일반 승용차를 출퇴근용으로 사용하는 것은 "생업용"에 해당하지 않아요
      </BorderBox>

      <p style={body}>
        생업용 차량 인정을 받으려면 신청 시 증빙 서류를 제출해야 해요. 사업자등록증이나 운송 관련 허가증이 있으면 인정받기 수월해요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>고급차 기준 폐지, 뭐가 달라졌나</H2>
      <p style={body}>
        예전에는 시가 3,000만원 이상 자동차를 "고급자동차"로 분류하고, 시가 전액을 월 소득으로 100% 환산했어요. 고급차가 있으면 사실상 기초연금 수급이 불가능했죠.
      </p>
      <p style={body}>
        하지만 이 기준이 불합리하다는 지적이 많았어요. 10년 전에 3,000만원에 산 차가 감가상각 후에도 고급차로 분류되는 경우가 있었거든요. 이런 문제를 해결하기 위해 보건복지부에서 고급자동차 기준을 폐지했어요.
      </p>
      <p style={body}>
        이제는 차량 가격과 관계없이 일반재산과 동일한 방식(시가 x 4% / 12)으로 환산돼요. 3,000만원짜리 차가 있어도 월 소득환산액은 약 10만원 수준이라, 다른 재산·소득 상황에 따라 기초연금을 받을 수 있게 됐어요.
      </p>

      <H2>자동차 때문에 탈락이 걱정된다면</H2>
      <p style={body}>
        자동차 한 대 때문에 기초연금에서 탈락하는 경우는 드물어요. 고급차 기준이 폐지된 이후로는 더더욱 그래요.
      </p>
      <p style={body}>
        차량 시가가 높더라도 <Link href="/w/기초연금-기본재산액-공제-지역별기준" style={{ color: "#1D9E75" }}>기본재산액 공제</Link>와 부채 차감을 적용하면 실제 소득환산액은 크지 않을 수 있어요. <Link href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75" }}>복지로</Link> 모의계산기에서 자동차를 포함한 전체 소득인정액을 확인해보세요.
      </p>
      <p style={body}>
        차를 처분할 필요 없이 그대로 신청해보는 게 좋아요. 실제로 차가 있어도 기초연금을 받는 분이 많거든요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법 시행령과 보건복지부 자료를 바탕으로 작성됐어요. 자동차 시가표준액은 차량 연식·모델에 따라 다르니 정확한 금액은 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
