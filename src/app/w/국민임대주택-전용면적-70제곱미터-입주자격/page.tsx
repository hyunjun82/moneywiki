"use client";

// Q1: 국민임대주택 70㎡ 공고를 보고 신청하고 싶은데 소득·자산 기준이 헷갈리는 상황
// Q2: 소득·자산·청약통장 조건 확인 후 LH청약플러스에서 신청 완료
// Q3: 60㎡ 초과 소득기준(1인 120%/2인 110%/3인이상 100%), 청약통장 24회 이상, 총자산 3억6100만원·차 3683만원, 무주택 세대구성원
// Q4: EligibilityChecker + DocTable(소득 기준) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "세대 전원이 무주택 세대구성원이에요 (현재 주택 소유 없음)" },
  { id: "c2", label: "세대 전체 월평균소득이 도시근로자 월평균소득 기준 이하예요 (3인 이상 100%, 2인 110%, 1인 120%)" },
  { id: "c3", label: "총자산이 3억 6,100만원 이하이고, 자동차 가액이 3,683만원 이하예요" },
  { id: "c4", label: "청약통장에 24회 이상 납입했어요 (1순위 조건)" },
];

const INCOME_CRITERIA = [
  { name: "1인 가구", required: true, where: "도시근로자 월평균소득의 120% 이하" },
  { name: "2인 가구", required: true, where: "도시근로자 월평균소득의 110% 이하" },
  { name: "3인 이상 가구", required: true, where: "도시근로자 월평균소득의 100% 이하" },
];

const PRIORITY_TABLE = [
  { name: "제1순위", required: true, where: "청약통장 24회 이상 납입 (2만원/회 이상)" },
  { name: "제2순위", required: false, where: "청약통장 없어도 신청 가능 (1순위 미달 시만 선정)" },
];

const CHECKLIST = [
  "주민등록등본상 세대 전원 주택 소유 여부 확인 (배우자·직계존속 포함)",
  "세대 전원 소득 합산 후 가구원 수별 기준 초과 여부 계산",
  "총자산 3억 6,100만원 이하 확인 (부동산+금융자산+보증금 등 합산)",
  "자동차 가액 3,683만원 이하 (2대 이상이면 합산)",
  "청약통장 납입 횟수 24회 이상 확인 (1순위 조건)",
  "LH청약플러스에서 공고 날짜·신청 기간 확인",
  "소득·자산 조회는 신청 전 LH청약플러스에서 직접 확인 가능",
];

const FAQS = [
  {
    q: "60㎡와 70㎡는 소득 기준이 어떻게 다른가요?",
    a: "60㎡ 이하는 월평균소득 70% 이하(1인 90%, 2인 80%)인데, 60㎡ 초과는 100% 이하(1인 120%, 2인 110%)로 기준이 더 높아요. 70㎡는 60㎡ 초과에 해당해서 소득 기준이 더 유리해요.",
  },
  {
    q: "과거에 주택을 소유했다가 팔았으면 무주택으로 인정되나요?",
    a: "네, 현재 시점에 주택이 없으면 무주택으로 인정돼요. 다만 공고마다 세부 조건이 다를 수 있으니 LH 공고문을 꼭 확인해야 해요.",
  },
  {
    q: "청약통장 납입금은 얼마 이상이어야 하나요?",
    a: "매달 2만원 이상이면 납입 횟수로 인정돼요. 금액이 많다고 우선순위가 높아지는 건 아니고, 24회 이상 납입했는지만 확인해요.",
  },
  {
    q: "자동차가 없는데 자산 기준은 어떻게 계산하나요?",
    a: "자동차가 없으면 자동차 가액은 0원이에요. 총자산에는 부동산, 금융자산, 기타 자산, 보증금 등이 포함돼요. LH청약플러스에서 본인 인증 후 사전 확인이 가능해요.",
  },
  {
    q: "2순위로 신청하면 당첨 확률이 많이 낮나요?",
    a: "1순위 청약이 다 채워지면 2순위는 기회가 없어요. 인기 지역은 1순위에서 마감되는 경우가 대부분이라 청약통장을 미리 만들어 24회를 채우는 게 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공공주택 특별법", url: "https://www.law.go.kr/법령/공공주택특별법" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "LH청약플러스 (입주자격 조회·신청)", url: "https://apply.lh.or.kr" },
      { label: "국토교통부 공공주택 정책", url: "https://www.molit.go.kr" },
      { label: "찾기쉬운생활법령정보 - 공공임대주택", url: "https://www.easylaw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "국민임대주택-신청", title: "국민임대주택 신청 방법", description: "LH청약플러스에서 국민임대 신청하는 전체 절차예요." },
  { slug: "청약통장-가입", title: "청약통장 가입 방법", description: "주택청약종합저축을 처음 만드는 방법이에요." },
  { slug: "무주택-세대구성원", title: "무주택 세대구성원 기준", description: "무주택 세대구성원 인정 범위와 예외 사항을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 공공임대</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민임대주택 전용 70㎡ 입주자격<br />
        소득·자산·청약통장 조건 한번에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국민임대주택 70㎡ 공고를 봤는데 소득 기준이 헷갈리시죠?
        <a href="https://www.law.go.kr/법령/공공주택특별법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공공주택 특별법</a>에 따라 전용면적 60㎡를 초과하는 국민임대주택은 60㎡ 이하보다 소득 기준이 높아요.
        무주택 세대구성원으로 소득·자산 기준을 모두 충족해야 신청할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>입주 자격 4가지, 전부 맞아야 해요</H2>
      <p style={body}>
        소득 기준만 맞으면 되는 게 아니에요. 무주택 여부, 소득, 자산, 청약통장 4가지를 동시에 충족해야 해요.
        하나라도 안 맞으면 탈락이에요.
      </p>

      <SectionBadge>자격 요건 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="전용 70㎡ 국민임대주택 신청 자격이 될 가능성이 높아요. LH청약플러스에서 공고를 찾아 신청해봐요."
        partialMatchText="조건 일부가 맞지 않아요. LH청약플러스 또는 LH 콜센터(1600-1004)에서 정확한 자격 여부를 알아봐요."
      />

      <CategoryButton label="부동산·임대 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>전용 70㎡ 소득 기준 (60㎡ 초과 적용)</H2>
      <p style={body}>
        70㎡는 60㎡ 초과에 해당해서 상대적으로 소득 기준이 높아요. 1인 가구는 도시근로자 월평균소득 120%까지 허용되는 거예요.
        소득은 세대 전원의 근로소득·사업소득·재산소득을 합산해서 계산해요.
      </p>

      <SectionBadge>가구원수별 소득 기준</SectionBadge>
      <DocTable docs={INCOME_CRITERIA} />

      <BorderBox>
        <strong>소득 기준 계산 예시</strong><br />
        3인 가구(남편+아내+자녀), 도시근로자 월평균소득 100% = 약 700만원 기준이라면<br />
        남편 500만원 + 아내 150만원 = 합산 650만원 → 기준 이하, 자격 충족<br />
        <br />
        실제 적용 금액은 매년 변동되니 LH청약플러스에서 해당 연도 기준을 찾아봐요.
      </BorderBox>

      <Divider />

      <H2>청약통장 순위와 자산 기준</H2>
      <p style={body}>
        1순위가 되려면 청약통장에 24회 이상 납입해야 해요. 금액이 많다고 유리한 게 아니라 납입 횟수만 봐요.
        인기 지역은 1순위에서 마감되는 경우가 많아서 통장을 미리 챙기는 게 중요해요.
      </p>

      <SectionBadge>입주 순위 기준</SectionBadge>
      <DocTable docs={PRIORITY_TABLE} />

      <GreenBox>
        자산 기준: 총자산 3억 6,100만원 이하 + 자동차 가액 3,683만원 이하 (2026년 기준, 매년 조정). 총자산에는 부동산, 금융자산, 기타 자산, 임차 보증금이 포함돼요. 세대 전원 합산이에요.
      </GreenBox>

      <Divider />

      <H2>신청 전 꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        LH 공고마다 세부 기준이 조금씩 달라요. 공고문을 꼼꼼하게 읽어야 해요.
      </p>
      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 국민임대주택 입주자격을 바탕으로 작성됐어요. 소득·자산 기준은 매년 변동되니 신청 전 해당 공고문과 LH청약플러스에서 최신 기준을 직접 안내받아봐요." />
    </ArticleLayout>
  );
}
