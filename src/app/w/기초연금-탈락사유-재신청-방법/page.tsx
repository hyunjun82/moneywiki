"use client";
// Q1. 기초연금을 신청했다가 탈락 통보를 받고 왜 탈락했는지, 다시 신청할 수 있는지 알고 싶은 상황
// Q2. 탈락 사유를 정확히 파악하고, 재신청 가능 시점과 방법을 알아서 다시 신청할 수 있어야 함
// Q3. ① 주요 탈락 사유 5가지 ② 이의신청 방법(90일 이내) ③ 재신청 조건(소득·재산 변동) ④ 소득인정액 재계산 포인트
// Q4. GreenBox(탈락 사유 요약) + Steps(재신청 절차) + BorderBox(이의신청 안내) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const REAPPLY_STEPS = [
  {
    title: "탈락 통지서에서 사유 확인",
    desc: "탈락 통지서에 소득인정액과 선정기준액이 적혀 있어요. 내 소득인정액이 기준보다 얼마나 높은지, 어떤 항목이 크게 잡혔는지 꼭 확인하세요.",
  },
  {
    title: "소득·재산 변동이 생기면 재신청",
    desc: "퇴직, 부동산 매각, 금융재산 감소 등으로 소득인정액이 줄어들면 재신청할 수 있어요. 별도 대기 기간 없이 변동이 생긴 즉시 신청 가능해요.",
    tip: "매년 1월 선정기준액이 올라가니, 기준액 변경 후 재신청하는 것도 방법이에요",
  },
  {
    title: "주민센터 또는 복지로에서 재신청",
    desc: "재신청도 처음 신청과 같은 절차예요. 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인 신청이 가능해요. 변동된 소득·재산을 증빙할 서류가 있으면 챙기세요.",
    link: { label: "복지로 신청", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "심사 결과 대기 (약 30일)",
    desc: "재신청 후에도 소득·재산 조사를 다시 진행해요. 약 30일 정도 걸리고, 수급 자격이 되면 신청한 달부터 기초연금을 받게 돼요.",
  },
];

const FAQS = [
  {
    q: "탈락 후 바로 재신청할 수 있나요?",
    a: "소득이나 재산에 변동이 생겼다면 바로 재신청할 수 있어요. 별도 대기 기간이 없어요. 다만 변동 없이 같은 조건으로 다시 넣으면 같은 결과가 나오겠죠.",
  },
  {
    q: "이의신청은 어떻게 하나요?",
    a: "탈락 통지를 받은 날로부터 90일 이내에 시·군·구청에 이의신청서를 제출하면 돼요. 소득인정액 계산에 오류가 있다고 생각되면 이의신청을 해보는 게 좋아요.",
  },
  {
    q: "집을 팔면 재신청 시 유리한가요?",
    a: "부동산을 매각하면 일반재산이 줄어들지만, 매각 대금이 금융재산으로 잡힐 수 있어요. 전체 소득인정액이 줄어드는지 미리 모의 계산을 해보는 게 중요해요.",
  },
  {
    q: "선정기준액이 매년 바뀌면 재신청 없이 자동으로 재심사되나요?",
    a: "아니에요. 기준액이 올라도 자동 재심사는 없어요. 직접 재신청을 해야 해요. 매년 1월에 기준액이 오르니 그때 재신청하는 분이 많아요.",
  },
  {
    q: "배우자가 사망하면 소득인정액이 바뀌나요?",
    a: "부부가구에서 단독가구로 바뀌면서 선정기준액도 395만2천원에서 247만원으로 낮아지지만, 소득인정액도 배우자 몫이 빠져서 크게 줄어들어요. 변경 신고 후 재심사를 받으면 수급자격이 될 가능성이 높아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(수급권자의 범위)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "행정심판법(이의신청)", url: "https://www.law.go.kr/법령/행정심판법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격과 선정기준액", description: "2026년 자격 조건과 소득 기준을 정리했어요." },
  { slug: "기초연금-이의신청-심사청구-절차", title: "기초연금 이의신청 절차", description: "탈락 결정에 불복할 때 밟는 절차예요." },
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "공제 항목을 알면 소득인정액이 줄어들 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-탈락사유-재신청-방법" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>탈락·재신청</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 신청했는데 탈락했다면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        탈락 사유와 재신청 방법
      </p>

      <p style={body}>
        기초연금 신청 결과가 "부적합"으로 나왔을 때 당황스럽죠. 왜 탈락했는지, 다시 신청할 수 있는 건지 막막할 수 있어요.
      </p>
      <p style={body}>
        기초연금 탈락의 가장 흔한 이유는 소득인정액 초과예요. 하지만 소득이나 재산에 변동이 생기면 언제든 재신청이 가능하고, 계산 오류가 의심되면 이의신청도 할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>탈락 사유, 왜 떨어졌을까?</H2>
      <p style={body}>
        기초연금 탈락 통지서에는 소득인정액과 선정기준액이 함께 적혀 있어요. 내 소득인정액이 기준을 얼마나 넘었는지 먼저 확인해야 해요. 근소한 차이인지, 큰 폭으로 넘었는지에 따라 대응법이 달라지죠.
      </p>

      <GreenBox>
        <strong>기초연금 주요 탈락 사유</strong><br /><br />
        1. 소득인정액 초과 (가장 흔한 사유)<br />
        2. 공무원·사학·군인·별정우체국 연금 수급자<br />
        3. 직역연금 수급자의 배우자<br />
        4. 대한민국 국적이 아니거나 해외 장기 체류 중<br />
        5. 만 65세 미만
      </GreenBox>

      <p style={body}>
        소득인정액 초과로 탈락한 경우, 어떤 항목이 크게 잡혔는지 확인하는 게 핵심이에요. 부동산 시세가 높게 책정됐거나, 금융재산 공제가 빠졌거나, 근로소득 공제가 적용 안 됐을 수 있거든요.
      </p>
      <p style={body}>
        <Link href="/w/공무원연금-기초연금-직역연금-예외조건" style={{ color: "#1D9E75", fontWeight: 600 }}>직역연금 수급자 중 예외 조건</Link>에 해당하면 받을 수도 있어요. 재직 기간이 10년 미만이거나, 유족연금만 받는 경우 등이 예외에 해당해요.
      </p>

      <Divider />

      <H2>재신청 방법, 이렇게 하면 돼요</H2>
      <p style={body}>
        재신청에는 별도 대기 기간이 없어요. 소득·재산에 변동이 생겼다면 바로 다시 신청할 수 있어요. 매년 1월에 선정기준액이 올라가니, 기준액 변경 시점도 재신청 타이밍이에요.
      </p>

      <Steps steps={REAPPLY_STEPS} />

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>이의신청, 계산이 잘못된 것 같다면?</H2>
      <p style={body}>
        소득인정액 계산에 오류가 있다고 생각되면 이의신청을 할 수 있어요. 통지를 받은 날로부터 90일 이내에 시·군·구청에 이의신청서를 내면 되죠.
      </p>

      <BorderBox>
        <strong>이의신청 방법</strong><br /><br />
        기한: 탈락 통지 후 90일 이내<br />
        접수처: 시·군·구청 (방문 또는 우편)<br />
        필요 서류: 이의신청서 + 소득·재산 변동 증빙(선택)<br /><br />
        이의신청이 받아들여지면 재조사 후 수급 자격을 다시 판단해요.<br />
        기각되면 행정심판이나 행정소송으로 다툴 수 있어요.
      </BorderBox>

      <p style={body}>
        이의신청은 무료이고, 변호사 없이 본인이 직접 할 수 있어요. 부동산 공시지가가 실제보다 높게 잡혔거나, 이미 해지한 금융상품이 반영된 경우 등에 이의신청으로 뒤집히는 사례가 있어요.
      </p>

      <Divider />

      <H2>재신청 전, 소득인정액 줄이는 포인트</H2>
      <p style={body}>
        소득인정액을 줄이려면 공제 항목을 최대한 활용해야 해요. <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", fontWeight: 600 }}>소득인정액 계산과 공제항목</Link>을 정확히 알면 재신청 시 결과가 달라질 수 있죠.
      </p>
      <p style={body}>
        근로소득이 줄었다면 급여명세서를, 부동산을 매각했다면 매매계약서를 챙겨가세요. 금융재산은 조회 기준일의 평균 잔액으로 계산하니, 일시적으로 큰 금액이 입금된 경우 해명 자료를 준비하면 돼요.
      </p>
      <p style={body}>
        부채도 소득인정액에서 차감돼요. 주택담보대출이나 임대보증금 등 정식 부채가 반영됐는지 확인하세요. 누락된 부채가 있다면 증빙을 추가하면 소득인정액이 줄어들 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법과 보건복지부 지침을 기준으로 작성했어요. 개인 상황에 따라 결과가 달라질 수 있으니 주민센터 상담을 권해요." />
    </ArticleLayout>
  );
}
