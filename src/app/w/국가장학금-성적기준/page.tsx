"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 성적이 애매한 대학생이 "내 학점으로 국가장학금 받을 수 있나?" 걱정하는 상황
// Q2. 내 성적이 기준을 충족하는지 확인하고, 미달이면 구제 방법 파악
// Q3. B학점 80점(4.5만점 3.0), 12학점 이수, 기초차상위 C학점, 신입생 면제, C학점 경고제
// Q4. GreenBox(기준 요약) + EligibilityChecker(내 상황 체크) + BorderBox(구제 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "직전 학기 12학점 이상 이수했어요" },
  { id: "c2", label: "직전 학기 백분위 80점(B학점) 이상이에요" },
  { id: "c3", label: "신입생·편입생·재입학생이 아닌 재학생이에요" },
];

const FAQS = [
  { q: "4.5만점에서 몇 학점이 B학점 80점인가요?", a: "4.5만점 기준 3.0 학점이에요. 4.3만점 기준은 2.5 학점이에요. 학교마다 만점이 다르니 백분위 80점을 기준으로 보세요." },
  { q: "F학점 받은 과목은 이수학점에 포함되나요?", a: "F학점은 이수학점에서 제외돼요. 15학점 수강하고 F 3학점 받으면 12학점만 인정돼요." },
  { q: "계절학기 학점은 어디에 합산되나요?", a: "여름 계절학기는 1학기에, 겨울 계절학기는 2학기에 합산돼요. 학점이 부족하면 계절학기로 채울 수 있어요." },
  { q: "C학점 경고제가 뭔가요?", a: "1~3구간 학생이 70~80점(C학점)을 받으면 바로 탈락하지 않고 경고를 받아요. 2회까지는 장학금을 유지할 수 있고, 3번째부터 B학점을 받아야 해요." },
  { q: "장애학생 성적 기준은 어떻게 되나요?", a: "장애학생은 직전 학기 1학점만 이수하면 성적과 무관하게 지원받을 수 있어요. 별도 증빙이 필요하죠." },
  { q: "한 학기 탈락하면 영구 탈락인가요?", a: "아니에요. 다음 학기에 12학점 이상 이수하고 B학점 이상 받으면 그다음 학기에 다시 신청할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국장학재단: 국가장학금 성적 기준 안내", url: "https://www.kosaf.go.kr" },
      { label: "정부24: 국가장학금 I유형 안내", url: "https://www.gov.kr/portal/service/serviceInfo/SD0000004508" },
    ],
  },
];

const RELATED = [
  { slug: "국가장학금-2차-신청", title: "국가장학금 2차 신청", description: "2차 신청 기간과 구간별 지원금액을 정리했어요." },
  { slug: "국가장학금-소득구간-지원금액", title: "국가장학금 소득구간별 금액", description: "1~9구간 학기별 지원금 한도를 확인할 수 있어요." },
  { slug: "국가장학금-탈락-사유", title: "국가장학금 탈락 사유", description: "자주 탈락하는 이유와 대처법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 장학금 · 성적기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국가장학금 성적기준, B학점 80점 못 받으면?<br />
        면제 대상과 구제 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        성적이 애매한데 장학금 받을 수 있을까 걱정되죠.
        <a href="https://www.kosaf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a> 기준으로
        직전 학기 12학점 이상 이수하고 B학점(백분위 80점) 이상이어야 해요.
        하지만 신입생은 면제고, 기초·차상위는 C학점(70점)으로 완화되니 포기하지 마세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>성적 기준, 핵심만 정리</H2>
      <p style={body}>
        학점과 점수 두 가지를 동시에 충족해야 해요. 하나라도 부족하면 탈락이에요.
      </p>

      <GreenBox>
        <strong>일반 학생</strong>: 직전 학기 12학점 이상 이수 + 백분위 80점(B학점) 이상<br />
        - 4.5만점 기준: 3.0 학점 이상<br />
        - 4.3만점 기준: 2.5 학점 이상<br /><br />
        <strong>기초·차상위 학생</strong>: 12학점 이상 이수 + 백분위 70점(C학점) 이상<br /><br />
        <strong>면제 대상</strong>: 신입생, 편입생, 재입학생(첫 학기만) / 장애학생(1학점 이수만 충족)
      </GreenBox>

      <H2>내 성적으로 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        재학생 기준으로 확인해보세요. 신입생이나 장애학생은 아래 체크리스트와 무관하게 지원 가능해요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="성적 기준을 충족했어요. 소득구간 심사가 통과되면 장학금을 받을 수 있어요."
        partialMatchText="충족하지 못한 기준이 있어요. 아래 구제 방법을 확인해보세요."
      />

      <H2>성적 미달이면 어떻게 하나요?</H2>
      <p style={body}>
        한 학기 탈락한다고 영원히 못 받는 건 아니에요. 다음 학기에 만회할 방법이 있어요.
      </p>

      <BorderBox>
        <strong>구제 방법 3가지</strong><br /><br />
        <strong>1. C학점 경고제 활용</strong> (1~3구간)<br />
        70~80점(C학점)이면 바로 탈락이 아니라 경고예요. 2회까지 유지 가능하죠.<br /><br />
        <strong>2. 재수강으로 평점 올리기</strong><br />
        낮은 성적 과목을 재수강하면 직전 학기 성적에 반영돼요.<br /><br />
        <strong>3. 계절학기 학점 보충</strong><br />
        이수학점이 12학점 미만이면 여름·겨울 계절학기로 채울 수 있어요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1학기 한국장학재단 기준으로 작성됐어요. 성적 기준은 변경될 수 있으니 한국장학재단(1599-2000)에서 확인하세요." />
    </ArticleLayout>
  );
}
