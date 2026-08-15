"use client";
// Q1. 아르바이트나 파트타임으로 일하는데 "나도 연차·주휴수당 받을 수 있나?" 궁금한 상황
// Q2. 주 15시간 기준 확인 → 연차 시간 계산 → 회사에 청구
// Q3. 주 15시간 기준, 주휴수당 계산, 연차 비례 공식, 1년 미만 연차, 퇴직금·4대보험 권리
// Q4. GreenBox(기준 요약) + BorderBox(연차 계산 공식+예시) + EligibilityChecker(내 권리 체크) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 이상(4주 평균) 근무해요" },
  { id: "c2", label: "1개월 이상 근무했어요" },
  { id: "c3", label: "고용보험에 가입돼 있어요" },
];

const FAQS = [
  { q: "주 15시간 미만이면 아무것도 못 받나요?", a: "주휴수당, 연차, 퇴직금 모두 없어요. 이 기준이 핵심이에요. 고용주가 일부러 14시간만 잡는 경우가 있는데, 실제 근무시간이 15시간 넘으면 증거 모아서 청구할 수 있어요." },
  { q: "단시간근로자 연차는 며칠인가요?", a: "시간 단위로 계산돼요. 주 20시간 근무자가 1년 80% 출근하면 60시간의 연차가 생겨요. 하루 4시간 근무면 15일, 6시간 근무면 10일이에요." },
  { q: "주휴수당은 어떻게 계산하나요?", a: "1주 개근하면 하루치 임금을 추가로 받아요. 시급 1만원, 주 3일(6시간)이면 주휴수당 6만원이에요." },
  { q: "단시간근로자도 퇴직금 받나요?", a: "네. 1년 이상 근무하고 주 15시간 이상이면 퇴직금 대상이에요." },
  { q: "사장님이 4대보험 안 해준다고 하면요?", a: "1개월 이상 근무하고 주 15시간 이상이면 가입 의무가 있어요. 안 해주면 고용노동부에 진정할 수 있어요." },
  { q: "5인 미만 사업장도 적용되나요?", a: "주휴일과 근로시간 규정은 5인 미만도 적용돼요. 다만 연차는 5인 이상 사업장에만 적용되니 사업장 규모를 확인하세요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "근로기준법 제55조(유급휴일), 제60조(연차)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "기간제 및 단시간근로자 보호에 관한 법률", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
      { label: "고용노동부: 단시간근로자 권리 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "주휴수당-계산", title: "주휴수당 계산법", description: "주휴수당 계산 공식과 예시를 정리했어요." },
  { slug: "연차휴가-사용", title: "연차휴가 사용 방법", description: "연차 발생·사용·미사용 수당을 정리했어요." },
  { slug: "단시간-근로자-실업급여", title: "단시간 근로자 실업급여", description: "파트타임으로 일하다 퇴직했을 때 실업급여 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 단시간근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단시간근로자도 연차·주휴수당 받을 수 있나요?<br />
        유급휴일 기준과 연차 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "아르바이트인데 연차 같은 거 받을 수 있나요?" 주 15시간 이상 일하면 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에 따라
        단시간근로자도 정규직과 같은 유급휴일·연차 권리가 있어요.
        다만 시간 비례로 계산되니 공식을 알아둬야 하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심 기준, 주 15시간</H2>
      <p style={body}>
        주 15시간이 모든 권리의 기준선이에요. 4주 평균으로 계산하니 주마다 달라도 괜찮아요.
      </p>

      <GreenBox>
        <strong>주 15시간 이상이면</strong><br />
        - 주휴수당(유급휴일) 받을 수 있어요<br />
        - 연차휴가가 발생해요<br />
        - 4대보험 가입 대상이에요<br />
        - 1년 이상 근무 시 퇴직금 대상이에요<br /><br />
        <strong>주 15시간 미만이면</strong><br />
        주휴수당·연차·퇴직금 모두 없어요. 최저임금만 적용돼요.
      </GreenBox>

      <H2>연차는 어떻게 계산하나요?</H2>
      <p style={body}>
        정규직처럼 15일이 발생하지만, 실제 근무시간에 비례해서 시간으로 환산돼요.
      </p>

      <BorderBox>
        <strong>연차 계산 공식 (1년 80% 이상 출근 시)</strong><br />
        (주 소정근로시간 / 40시간) x 8시간 x 15일<br /><br />
        <strong>예시: 주 20시간 근무</strong><br />
        (20 / 40) x 8 x 15 = <strong>60시간</strong><br />
        - 하루 4시간 근무 → 15일<br />
        - 하루 6시간 근무 → 10일<br /><br />
        <strong>1년 미만 근무자</strong><br />
        1개월 개근 시 1일(시간 비례) 발생, 최대 11일까지<br />
        주 20시간 근무자가 6개월 일하면: (20/40) x 8 x 6 = 24시간
      </BorderBox>

      <H2>내 권리, 지금 확인해보세요</H2>
      <p style={body}>
        아래 항목에 해당하면 주휴수당·연차·4대보험 등의 권리가 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="주휴수당, 연차, 4대보험, 퇴직금(1년 이상) 모두 받을 수 있어요."
        partialMatchText="일부 조건이 부족해요. 특히 주 15시간 기준을 확인해보세요."
      />

      <p style={body}>
        회사가 권리를 안 줄 때는 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 진정할 수 있어요.
        근로계약서, 급여명세서, 출퇴근 기록을 증거로 준비하세요. 카톡이나 문자로 받은 근무지시도 증거가 돼요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 근로기준법 기준으로 작성됐어요. 사업장 규모에 따라 적용이 다를 수 있으니 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
