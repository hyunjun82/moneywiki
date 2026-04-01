"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 공무원연금(또는 사학·군인연금)을 받고 있는데 기초연금도 받을 수 있는지 궁금한 상황
// Q2. 직역연금 수급자 중 예외 조건에 해당하는지 확인하고, 해당되면 기초연금을 신청할 수 있어야 함
// Q3. ① 직역연금 수급자 기초연금 원칙적 제외 ② 예외 6가지(재직 10년 미만, 유족연금 등) ③ 배우자도 제외되는 기준 ④ 예외 해당 시 신청 방법
// Q4. GreenBox(원칙+예외 요약) + BorderBox(예외 조건 상세) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "공무원연금 월 30만원 받는데 기초연금을 받을 수 있나요?",
    a: "금액이 적다고 자동으로 받을 수 있는 건 아니에요. 재직 기간이 10년 미만이었다면 예외에 해당해서 기초연금 신청이 가능해요. 10년 이상 재직했다면 금액과 관계없이 기초연금 대상에서 제외돼요.",
  },
  {
    q: "배우자가 공무원연금을 받으면 저도 기초연금을 못 받나요?",
    a: "원칙적으로 직역연금 수급자의 배우자도 제외돼요. 하지만 배우자가 예외 조건(재직 10년 미만 등)에 해당하면, 배우자도 본인도 기초연금 신청이 가능해요.",
  },
  {
    q: "군인연금을 받다가 포기하면 기초연금을 받을 수 있나요?",
    a: "직역연금 수급권을 포기해도 기초연금 수급자격이 자동으로 생기지는 않아요. 포기가 아니라 애초에 예외 조건에 해당해야 해요. 포기 후에도 연금 수급 이력이 남아서 심사에 반영돼요.",
  },
  {
    q: "사학연금 유족연금만 받고 있는데 기초연금 대상인가요?",
    a: "유족연금만 받는 경우는 예외에 해당해요. 기초연금 신청이 가능하고, 소득인정액 기준을 충족하면 받을 수 있어요.",
  },
  {
    q: "재직 기간 10년 기준은 어디서 확인하나요?",
    a: "공무원연금공단(geps.or.kr), 사학연금공단(tp.or.kr), 국방부 군인연금 홈페이지에서 재직 기간을 확인할 수 있어요. 연금 지급 내역서에도 재직 기간이 기재돼 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 직역연금 제외 기준", url: "https://www.mohw.go.kr" },
      { label: "공무원연금공단", url: "https://www.geps.or.kr" },
      { label: "사학연금공단", url: "https://www.tp.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조(적용 제외)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령 제3조(예외 조건)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격과 선정기준액", description: "2026년 기초연금 자격 조건 전체를 정리했어요." },
  { slug: "기초연금-연계감액-계산-A급여액", title: "기초연금 연계감액 계산", description: "국민연금과 기초연금 연계감액 구조예요." },
  { slug: "기초연금-탈락사유-재신청-방법", title: "기초연금 탈락 재신청", description: "탈락 사유별 재신청 방법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="공무원연금-기초연금-직역연금-예외조건" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>직역연금 예외</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        공무원연금 받으면 기초연금 못 받나?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        직역연금 예외 조건
      </p>

      <p style={body}>
        공무원연금이나 사학연금을 받고 있으면 기초연금을 못 받는다는 얘기, 많이 들어보셨죠. 원칙적으로는 맞지만, 예외가 꽤 많아요.
      </p>
      <p style={body}>
        재직 기간이 10년 미만이었거나, 유족연금만 받고 있거나, 장해보상금을 받은 경우 등은 기초연금 신청이 가능해요. 본인이 예외에 해당하는지 하나씩 따져볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>직역연금 수급자, 왜 기초연금에서 제외될까?</H2>
      <p style={body}>
        <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", fontWeight: 600 }}>기초연금법 제3조</Link>에 따르면, 공무원연금·사학연금·군인연금·별정우체국연금 수급자와 그 배우자는 기초연금 대상에서 제외돼요.
      </p>
      <p style={body}>
        이유는 직역연금 자체가 노후 소득 보장 수단이기 때문이에요. 이미 연금을 받고 있으니 기초연금까지 중복 지급할 필요가 없다는 취지죠.
      </p>
      <p style={body}>
        하지만 직역연금 금액이 매우 적거나, 본인이 직접 가입한 게 아닌 유족연금인 경우까지 일괄 제외하면 형평성 문제가 생겨요. 그래서 법에 예외 조건을 두고 있어요.
      </p>

      <Divider />

      <H2>예외 조건, 이 경우에는 기초연금을 받을 수 있어요</H2>
      <p style={body}>
        기초연금법 시행령 제3조에서 정한 예외 조건이에요. 아래 중 하나에 해당하면 직역연금을 받더라도 기초연금 신청이 가능해요.
      </p>

      <GreenBox>
        <strong>직역연금 수급자 기초연금 예외 조건</strong><br /><br />
        1. 재직 기간(복무 기간)이 10년 미만인 퇴직연금 수급자<br />
        2. 유족연금 수급자 (배우자가 사망한 경우)<br />
        3. 장해보상금·유족보상금·유족일시금을 받은 사람<br />
        4. 퇴직연금일시금·퇴직일시금을 받은 사람<br />
        5. 유족연금 대신 유족연금일시금을 선택한 사람<br />
        6. 비공무상 장해연금·장해일시금을 받은 사람
      </GreenBox>

      <p style={body}>
        핵심은 두 가지예요. 재직 기간 10년 미만이거나, 연금이 아니라 일시금으로 받은 경우. 이 두 경우에 해당하면 직역연금을 받았더라도 기초연금 신청이 가능하죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>배우자도 제외되는데, 예외는 같이 적용될까?</H2>
      <p style={body}>
        직역연금 수급자의 배우자도 원칙적으로 기초연금에서 제외돼요. 남편이 공무원연금을 받으면 아내도 기초연금을 못 받는 구조예요.
      </p>
      <p style={body}>
        그런데 남편이 위 예외 조건에 해당하면, 배우자도 함께 예외가 적용돼요. 남편의 재직 기간이 10년 미만이면, 아내도 기초연금 신청이 가능해지는 거예요.
      </p>

      <BorderBox>
        <strong>배우자 예외 적용 기준</strong><br /><br />
        직역연금 수급자 본인이 예외 조건에 해당 → 배우자도 기초연금 신청 가능<br />
        직역연금 수급자 본인이 예외 비해당 → 배우자도 기초연금 대상 제외<br /><br />
        이혼한 경우: 직역연금 수급자와 이혼하면 배우자 제외 규정이 해제돼요.
        이혼 후 본인의 소득인정액이 기준 이하이면 기초연금 신청 가능해요.
      </BorderBox>

      <p style={body}>
        이혼 후 기초연금을 받으려면 <Link href="/w/기초연금-이혼-소득합산해제-재신청" style={{ color: "#1D9E75", fontWeight: 600 }}>이혼 소득 합산 해제 후 재신청</Link> 절차를 밟아야 해요. 이혼 신고가 완료된 후에 가능하죠.
      </p>

      <Divider />

      <H2>예외 해당되면 어떻게 신청할까?</H2>
      <p style={body}>
        예외 조건에 해당하면 일반 기초연금 신청과 동일하게 주민센터 또는 복지로(bokjiro.go.kr)에서 신청하면 돼요. 다만 직역연금 관련 서류를 추가로 준비해야 해요.
      </p>
      <p style={body}>
        공무원연금공단(geps.or.kr)이나 사학연금공단(tp.or.kr)에서 "연금 지급 내역서"를 발급받으세요. 여기에 재직 기간, 연금 종류가 기재돼 있어요. 이 서류로 예외 해당 여부를 증명할 수 있어요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-수급자격-선정기준액-소득조건" style={{ color: "#1D9E75", fontWeight: 600 }}>기초연금 수급자격 조건</Link>도 동시에 충족해야 해요. 예외에 해당하더라도 소득인정액이 선정기준액(단독 247만원, 부부 395만2천원)을 넘으면 탈락하게 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 및 시행령을 기준으로 작성했어요. 직역연금 예외 해당 여부는 개인 이력에 따라 달라지니 주민센터 또는 해당 연금공단에서 확인하세요." />
    </ArticleLayout>
  );
}
