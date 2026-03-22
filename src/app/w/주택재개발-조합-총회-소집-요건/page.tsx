"use client";

// Q1. 재개발 조합 운영이 불투명해서 직접 총회를 열고 싶은데 방법을 모르는 상황
// Q2. 5분의 1 요건 충족 → 소집 요구 → 2주 미응시 직접 소집까지 행동할 수 있어야 함
// Q3. 5분의 1 이상 서면 요구, 조합장 2주 내 소집 의무, 직접 소집권, 과반수 출석+과반수 찬성, 해임은 10분의 1 발의
// Q4. GreenBox(정족수 요약) + Steps(소집 절차) + BorderBox(의결 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SUMMON_STEPS = [
  {
    title: "조합원 5분의 1 이상 모으기",
    description: "같은 목적으로 총회 소집을 원하는 조합원을 5분의 1 이상 모아요. 임원 해임이 목적이면 10분의 1 이상이면 돼요.",
  },
  {
    title: "서면으로 소집 요구",
    description: "조합장에게 총회 소집을 서면(내용증명 권장)으로 요구해요. 총회 목적과 안건을 명확히 적어야 해요.",
  },
  {
    title: "조합장의 소집 또는 2주 경과 후 직접 소집",
    description: "조합장이 2주 이내에 총회를 소집하면 정상 진행돼요. 2주 넘게 응하지 않으면 소집 요구한 대표가 직접 총회를 열 수 있어요.",
  },
  {
    title: "총회 개최 및 의결",
    description: "조합원 과반수 출석에 출석 과반수 찬성으로 의결해요. 중요 사항 변경은 조합원 3분의 2 이상 찬성이 필요해요.",
  },
];

const FAQS = [
  {
    q: "조합원 5분의 1이 안 모이면 총회를 못 여나요?",
    a: "대의원 3분의 2 이상이 요구하는 방법도 있어요. 조합원 5분의 1 또는 대의원 3분의 2 중 한 가지를 충족하면 돼요.",
  },
  {
    q: "조합장이 총회 소집을 계속 거부하면?",
    a: "2주 이상 소집 요구에 응하지 않으면 소집 요구한 조합원들의 대표가 직접 소집할 수 있어요. 정상적으로 의결된 내용은 법적 효력이 있어요.",
  },
  {
    q: "임원 해임하려면 몇 명이 발의해야 하나요?",
    a: "조합원 10분의 1 이상이 발의하면 돼요. 총회에서 조합원 과반수 출석, 출석 과반수 동의로 해임이 가능해요.",
  },
  {
    q: "정관 변경은 일반 의결과 다른가요?",
    a: "네. 조합 설립 인가받은 사항을 변경할 때는 조합원 3분의 2 이상 찬성이 필요해요. 시장·군수 등의 인가도 받아야 하고요.",
  },
  {
    q: "서면 결의도 가능한가요?",
    a: "도시정비법에서 허용하는 경우 서면 결의가 가능해요. 다만 중요 안건은 직접 총회를 여는 게 분쟁 예방에 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "도시 및 주거환경정비법 (총회 소집)", url: "https://www.law.go.kr/법령/도시및주거환경정비법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 재건축 조합원총회", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1170&ccfNo=3&cciNo=1&cnpClsNo=6" },
    ],
  },
];

const RELATED = [
  { slug: "재개발-재건축-차이", title: "재개발과 재건축의 차이점", description: "두 사업의 구조적 차이예요." },
  { slug: "재개발-조합설립-인가", title: "재개발 조합설립 인가 절차", description: "조합을 처음 만드는 과정이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 재개발 · 조합총회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재개발 조합 총회, 조합원이 직접 열 수 있을까?<br />
        소집 요건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        조합 운영이 불투명한데 조합장이 총회를 안 열어주죠?
        조합원 5분의 1 이상이 요구하면 조합장이 소집해야 하고, 2주 넘게 안 하면 직접 열 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>총회 소집 요건은 어떻게 되나요?</H2>
      <SectionBadge>소집 요건</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/도시및주거환경정비법" style={{ color: "#1D9E75", textDecoration: "underline" }}>도시 및 주거환경정비법</a>에
        따라 총회는 기본적으로 조합장이 소집해요.
        조합장이 직권으로 열거나, 조합원들의 요구를 받아서 여는 구조예요.
      </p>

      <GreenBox title="총회 소집 요건 정리">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>일반 총회</strong>: 조합원 5분의 1 이상 또는 대의원 3분의 2 이상 요구</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>임원 해임 총회</strong>: 조합원 10분의 1 이상 발의</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>조합장 미응시</strong>: 2주 경과 후 요구 대표가 직접 소집 가능</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>요구 방식</strong>: 서면 요구 (내용증명 권장)</p>
      </GreenBox>

      <p style={body}>
        서면으로 요구할 때는 총회 목적과 안건을 명확히 적어야 해요.
        내용증명으로 보내면 나중에 법적 분쟁 시 증거로 쓸 수 있어요.
      </p>

      <Divider />

      <H2>의결 정족수는 어떻게 되나요?</H2>

      <p style={body}>
        총회가 열렸어도 정족수를 못 채우면 의결이 무효예요.
        안건의 종류에 따라 기준이 달라요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>의결 정족수 기준</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>일반 안건</strong>: 조합원 과반수 출석 + 출석 과반수 찬성</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>중요 사항 변경 (정관, 사업계획 등)</strong>: 조합원 3분의 2 이상 찬성 + 시장·군수 인가</p>
        <p style={{ margin: 0, lineHeight: 1.9 }}><strong>임원 해임</strong>: 조합원 과반수 출석 + 출석 과반수 동의</p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>총회 소집 절차는 어떻게 되나요?</H2>
      <SectionBadge>소집 절차</SectionBadge>

      <p style={body}>
        조합 운영에 문제가 있다면 아래 순서대로 움직이세요.
        핵심은 서면 증거를 남기는 거예요.
      </p>

      <Steps steps={SUMMON_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        직접 소집하더라도 절차를 정확히 지켜야 해요.
        소집 통지 기간이나 안건 기재 방법이 잘못되면 나중에 의결 무효 소송의 빌미가 될 수 있어요.
        변호사 자문을 받아 진행하는 게 안전해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 도시 및 주거환경정비법 기준으로 작성됐어요. 조합마다 정관이 다를 수 있으니 본인 조합의 정관을 반드시 확인하세요." />
    </ArticleLayout>
  );
}
