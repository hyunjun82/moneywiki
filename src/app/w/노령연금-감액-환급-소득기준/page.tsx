"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 노령연금을 받고 있는데 소득이 있어 감액되거나, 과거 감액분을 돌려받을 수 있는지 궁금한 상황
// Q2. 내 소득 기준으로 감액 여부를 판단하고, 감액 해제 또는 환급 신청을 한다
// Q3. 재직자 노령연금 감액 기준(A값 초과 소득), 소득 산정 범위, 감액률, 환급(연기연금) 조건
// Q4. GreenBox(감액 기준) + DocTable(감액률 표) + Steps(환급 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REDUCTION_TABLE = {
  headers: ["초과 소득 구간", "감액률", "예시 (A값 298만원 기준)"],
  rows: [
    ["100만원 이하", "초과분의 5%", "소득 398만원 → 5만원 감액"],
    ["100만~200만원", "초과분의 10% + 5만원", "소득 498만원 → 15만원 감액"],
    ["200만~300만원", "초과분의 15% + 15만원", "소득 598만원 → 30만원 감액"],
    ["300만~400만원", "초과분의 20% + 30만원", "소득 698만원 → 50만원 감액"],
    ["400만원 초과", "초과분의 25% + 50만원", "최대 50% 감액 한도"],
  ],
};

const STEPS_DATA = [
  { title: "감액 여부 확인", desc: "국민연금공단(1355)이나 내연금 앱에서 현재 감액 상태를 확인해요." },
  { title: "소득 변동 신고", desc: "퇴직이나 소득 감소로 감액 사유가 없어졌으면 소득 변동 신고를 해요. 감액이 해제돼요." },
  { title: "연기연금 신청 (선택)", desc: "감액 대신 연금 수령을 1~5년 연기하면 연기 기간에 연 7.2%(월 0.6%)가 가산돼요. 소득이 높을 때 연기가 유리할 수 있어요." },
  { title: "과거 감액분 확인", desc: "감액은 환급이 아니라 해당 기간 지급이 줄어드는 거예요. 연기연금을 선택한 경우에는 연기 기간 후 가산된 금액을 받아요." },
];

const FAQS = [
  { q: "A값이 뭔가요?", a: "국민연금 가입자 전체의 3년간 평균소득월액이에요. 2026년 기준 약 298만원이에요. 이 금액을 초과하는 소득이 있으면 감액 대상이에요." },
  { q: "근로소득만 해당하나요?", a: "근로소득과 사업소득이 합산돼요. 이자소득, 배당소득, 임대소득, 연금소득은 제외예요." },
  { q: "감액은 최대 얼마까지 되나요?", a: "노령연금 기본연금액의 50%까지만 감액돼요. 부양가족 연금은 감액 대상이 아니에요." },
  { q: "만 65세 이상이면 감액 안 되나요?", a: "아니에요. 재직자 노령연금 감액은 60~65세까지만 적용된다는 오해가 있는데, 소득이 A값을 넘으면 나이와 상관없이 감액돼요. 단, 만 65세 이후에는 일부 지자체 기초연금에서 별도 감액이 있을 수 있어요." },
  { q: "연기연금은 누구나 신청할 수 있나요?", a: "노령연금 수급권자라면 신청 가능해요. 1회에 1년씩, 최대 5년까지 연기할 수 있어요. 연기 중에는 연금이 안 나오지만, 이후 가산율이 적용돼 더 받을 수 있어요." },
  { q: "감액된 연금은 나중에 돌려받을 수 있나요?", a: "감액분 자체를 환급받는 제도는 없어요. 감액 기간에 줄어든 금액은 영구적으로 줄어드는 거예요. 소득이 높을 때는 연기연금을 선택하는 게 더 유리해요." },
];

const SOURCES = [
  { name: "국민연금법 제63조의2", href: "https://www.law.go.kr/법령/국민연금법" },
  { name: "국민연금공단 재직자 노령연금 안내", href: "https://www.nps.or.kr" },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 감액률", description: "조기수령 시 감액률과 손익분기점." },
  { slug: "연금소득세-나이별-세율", title: "연금소득세 나이별 세율", description: "연금 수령 시 나이별로 달라지는 세율." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금", description: "일시금과 연금 수령 비교." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 국민연금 · 감액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        노령연금 감액, 소득이 얼마면 줄어들까?<br />
        감액 기준과 연기연금 활용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연금 받으면서 일하는데 연금이 깎인다는 얘기를 들으면 걱정되죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법 제63조의2</a>에 따라 소득이 A값(가입자 평균소득, 2026년 약 298만원)을 초과하면 노령연금이 감액돼요. 감액 구간별 비율과 대응 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>감액 기준부터 확인하세요</H2>
      <p style={body}>
        근로소득 + 사업소득의 월평균이 A값을 넘으면 감액이 시작돼요.
      </p>

      <GreenBox title="노령연금 감액 핵심">
        감액 기준: 근로·사업소득 월평균이 A값(약 298만원) 초과 시{"\n"}
        감액 한도: 기본연금액의 최대 50%{"\n"}
        제외 소득: 이자·배당·임대·연금소득은 감액 산정에 포함 안 됨{"\n"}
        부양가족 연금: 감액 대상 아님
      </GreenBox>

      <CategoryButton label="연금 정보" count={8} href="/category/연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>소득 구간별 감액률은 이렇게 돼요</H2>
      <p style={body}>
        A값을 초과하는 금액 구간에 따라 감액률이 달라져요.
      </p>

      <SectionBadge>재직자 노령연금 감액률</SectionBadge>
      <DocTable headers={REDUCTION_TABLE.headers} rows={REDUCTION_TABLE.rows} />

      <p style={body}>
        감액이 부담된다면 연기연금을 검토해보세요. 소득이 높은 동안 연금을 연기하면 나중에 가산된 금액을 받을 수 있어요.
      </p>

      <Divider />

      <H2>연기연금으로 더 받는 방법</H2>
      <p style={body}>
        감액 대신 연금 수령 자체를 미루는 선택이에요.
      </p>

      <SectionBadge>연기연금 활용 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <BorderBox>
        <strong>연기연금 가산율</strong><br />
        월 0.6%, 연 7.2% 가산{"\n"}<br />
        최대 5년 연기 → 36% 가산{"\n"}<br />
        소득이 높아 감액이 큰 기간에 연기하면 유리
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>노령연금 감액에서 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민연금법을 바탕으로 작성했어요. A값과 감액 기준은 매년 변경되니, 국민연금공단(1355)에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
