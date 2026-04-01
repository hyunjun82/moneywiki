"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 기초연금 신청 서류에 전월세 계약서가 왜 필요한지 모르겠는 어르신/보호자
// Q2: 전월세 계약서가 재산 확인에 어떻게 쓰이는지 이해하고, 서류를 제대로 준비
// Q3: 임차보증금의 재산 반영 방식, 자가/전세/월세별 차이, 서류 준비 기준
// Q4: GreenBox(핵심) + BorderBox(유형별 비교) + Checklist(서류) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const DOCUMENT_CHECKLIST = [
  "전월세 계약서 원본 또는 사본 (임대인·임차인 서명 확인)",
  "확정일자 부여 증명서 (주민센터에서 발급)",
  "전입신고 확인서 (주민등록 이동 내역)",
  "월세 이체 내역 (통장 거래 내역서로 증빙)",
  "무상거주 확인서 (계약서 없이 거주하는 경우)",
];

const FAQS = [
  {
    q: "전월세 계약서가 없으면 기초연금 신청이 안 되나요?",
    a: "계약서가 없어도 신청은 돼요. 다만 거주 형태를 증명할 다른 서류가 필요하죠. 무상거주 확인서, 전입신고 내역, 공과금 납부 내역 등으로 대체할 수 있어요.",
  },
  {
    q: "전세보증금이 크면 기초연금에서 탈락하나요?",
    a: "전세보증금은 금융재산이 아닌 일반재산(주거용 재산)으로 분류돼요. 기본재산액 공제가 적용되기 때문에 전세보증금이 있다고 바로 탈락하는 건 아니에요. 공제 후 남은 금액이 소득환산되죠.",
  },
  {
    q: "월세만 내고 사는데 계약서를 꼭 내야 하나요?",
    a: "월세 계약서를 제출하면 임차보증금과 월세 지출을 증빙할 수 있어요. 월세는 주거비 지출로 인정되고, 보증금은 재산으로 반영되지만 기본재산액 공제를 받을 수 있어서 내는 게 유리하죠.",
  },
  {
    q: "자녀 명의 집에 무상으로 살고 있으면 어떻게 되나요?",
    a: "무상거주 확인서를 제출하면 임차보증금 0원으로 처리돼요. 본인 소유 재산이 아니니 주거 재산에 반영되지 않죠. 다만 자녀가 증여한 재산이 있으면 별도로 잡힐 수 있어요.",
  },
  {
    q: "계약서와 실제 보증금이 다르면 어떻게 되나요?",
    a: "계약서에 적힌 금액이 기준이에요. 실제로 더 적게 냈더라도 계약서 금액으로 재산이 산정되죠. 계약서를 수정하거나 보증금 변경 합의서를 첨부해서 실제 금액을 반영시킬 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행령 제4조: 재산의 범위", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 신청 서류 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-신청서류-준비물",
    title: "기초연금 신청 서류 준비물",
    description: "기초연금 신청에 필요한 전체 서류 목록을 정리했어요.",
  },
  {
    slug: "기초연금-기본재산액-공제-지역별기준",
    title: "기본재산액 공제 지역별 기준",
    description: "지역에 따라 재산 공제 금액이 달라지는 구조를 정리했어요.",
  },
  {
    slug: "기초연금-소득인정액-계산-공제항목",
    title: "소득인정액 계산 공제항목",
    description: "재산이 소득인정액에 어떻게 반영되는지 상세히 풀어놨어요.",
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
          currentSlug="기초연금-전월세계약서-재산확인-서류기준"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>전월세 계약서 재산 확인</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 신청 시 전월세 계약서 왜 필요?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        재산 확인 방식과 서류 준비 기준
      </p>

      <p style={body}>
        기초연금 신청하러 갔더니 &quot;전월세 계약서 가져오세요&quot;라고 하죠.
        &quot;집도 없는데 왜 계약서가 필요해?&quot; 의문이 들 수밖에 없고요.
      </p>
      <p style={body}>
        전월세 계약서는 <strong>재산(임차보증금)을 정확히 파악하기 위해</strong> 필요해요.{" "}
        <a href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 시행령 제4조</a>에 따라
        임차보증금도 재산으로 분류되거든요. 전세 5,000만 원이 있다면 그 금액이{" "}
        <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득인정액</Link> 계산에 반영되죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>전월세 계약서가 재산 확인에 쓰이는 이유</H2>
      <SectionBadge>재산 반영 구조</SectionBadge>

      <p style={body}>
        기초연금 소득인정액은 소득평가액 + 재산의 소득환산액으로 계산돼요. 여기서 재산에는 부동산뿐 아니라 임차보증금(전세금, 월세 보증금)도 포함되죠.
      </p>
      <p style={body}>
        자가 소유자는 부동산 공시가격이 재산으로 잡히고, 전세 거주자는 전세보증금이 재산으로 잡혀요.
        월세 거주자는 월세 보증금이 재산으로 반영되고요. 계약서가 이 금액을 확인하는 공식 증빙이 되는 거예요.
      </p>
      <p style={body}>
        다만 임차보증금에는{" "}
        <Link href="/w/기초연금-기본재산액-공제-지역별기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본재산액 공제</Link>가 적용돼요.
        거주 지역에 따라 대도시 1억 3,500만 원, 중소도시 8,500만 원, 농어촌 7,250만 원을 공제하죠.
        공제 후 남은 금액만 소득으로 환산되기 때문에, 보증금이 있다고 무조건 불리한 건 아니에요.
      </p>

      <GreenBox>
        전월세 계약서 = 임차보증금 확인용 공식 증빙<br />
        임차보증금은 재산으로 분류 → 기본재산액 공제 적용<br />
        공제 후 남은 금액만 소득환산 (연 4%)
      </GreenBox>

      <Divider />

      <H2>자가, 전세, 월세별 재산 반영이 달라요</H2>
      <SectionBadge>거주 유형별 비교</SectionBadge>

      <p style={body}>
        자가 소유자는 부동산 공시가격이 재산으로 잡혀요. 시가 3억 원 아파트라도 공시가격은 그보다 낮을 수 있죠.
        공시가격에서 기본재산액을 공제하고, 남은 금액에 연 4%(월 0.33%)를 곱해서 소득으로 환산해요.
      </p>
      <p style={body}>
        전세 거주자는 전세보증금이 일반재산(주거용)으로 들어가요. 기본재산액 공제를 받고, 남은 금액이 소득으로 환산되죠.
        전세금 자체가 크더라도 공제 후 금액이 적으면 기초연금 대상이 될 수 있어요.
      </p>
      <p style={body}>
        월세 거주자는 보증금(있으면)이 재산으로, 월세 지출은 별도 반영돼요.
        무상거주(자녀 집에 무료 거주 등)라면 임차보증금 0원으로 처리되니 재산 반영이 없죠.
      </p>

      <BorderBox>
        <strong>자가</strong>: 부동산 공시가격 → 기본재산액 공제 → 소득환산<br />
        <strong>전세</strong>: 전세보증금 → 기본재산액 공제 → 소득환산<br />
        <strong>월세</strong>: 월세보증금 → 기본재산액 공제 → 소득환산<br />
        <strong>무상거주</strong>: 임차보증금 0원, 무상거주 확인서 제출
      </BorderBox>

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>준비해야 할 서류 목록</H2>
      <SectionBadge>서류 체크</SectionBadge>

      <p style={body}>
        전월세 계약서가 가장 기본이에요. 임대인과 임차인 서명이 있는 원본 또는 사본을 제출하면 되죠.
        확정일자를 받은 경우 확정일자 부여 증명서도 함께 내면 임대차 관계를 더 확실하게 증빙할 수 있어요.
      </p>
      <p style={body}>
        계약서가 없는 경우도 있죠. 자녀 집에 무상으로 거주하는 경우에는 무상거주 확인서를 작성해서 제출하면 돼요.
        주민센터에서 양식을 받을 수 있고, 임대인(집 소유자)의 확인 서명이 필요해요.
      </p>
      <p style={body}>
        월세를 내고 있다면 통장 이체 내역서로 월세 지출을 증빙할 수 있어요.
        현금으로 월세를 내는 경우에는 임대인 확인서나 월세 수령 확인서를 별도로 준비해야 하죠.
      </p>

      <Checklist items={DOCUMENT_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금 신청 시 전월세 서류에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법 시행령을 바탕으로 작성됐어요. 재산 반영 기준은 매년 조정될 수 있으니, 국민연금공단(1355)이나 주민센터에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
