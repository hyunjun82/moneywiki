"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연금 받기 시작했는데 건강보험료가 올라서 왜 그런지 궁금한 상황이에요.
// Q2. 건보료 인상 원인을 파악하고, 소득 감소 시 조정 신청을 해서 보험료를 낮추는 행동.
// Q3. 국민연금 50%만 반영, 금융소득·임대소득이 주원인, 2026년 건보료율 7.19%, 조정 신청 방법.
// Q4. GreenBox(인상 원인 핵심) + BorderBox(건보료 계산 예시) + Steps(조정 신청) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const ADJUST_STEPS = [
  { title: "보험료 산정 내역 확인", desc: "건강보험공단 앱 'The 건강보험' 또는 nhis.or.kr에서 어떤 소득 때문에 보험료가 올랐는지 확인해요." },
  { title: "소득 감소 서류 준비", desc: "폐업신고서, 퇴직증명서, 소득금액증명원 등 소득이 줄었음을 증명할 서류를 준비해요." },
  { title: "조정 신청", desc: "건강보험공단 앱, nhis.or.kr, 또는 가까운 지사에서 보험료 조정 신청을 해요.", tip: "빠르면 신청 다음 달부터 조정된 보험료가 적용돼요." },
  { title: "정산 확인", desc: "다음 해 11월에 실제 소득과 조정된 보험료를 비교 정산해요. 차액이 생기면 추가 납부하거나 환급받아요." },
];

const FAQS = [
  { q: "국민연금이 건보료 인상의 주원인인가요?", a: "아니에요. 국민연금은 소득의 50%만 반영돼서 건보료에 미치는 영향이 크지 않아요. 이자·배당·임대소득이 100% 반영되기 때문에 이쪽이 진짜 원인인 경우가 많아요." },
  { q: "개인연금(연금저축, IRP)도 건보료에 반영되나요?", a: "아니요, 개인연금은 건보료 산정에서 완전히 제외돼요. 국민연금만 50% 반영돼요." },
  { q: "조정 신청하면 언제부터 적용되나요?", a: "빠르면 신청 다음 달부터 조정된 보험료가 적용돼요. 신청 안 하면 다음 해 10월까지 높은 보험료를 계속 내야 해요." },
  { q: "2026년 건보료율은 얼마인가요?", a: "직장가입자 기준 7.19%예요. 2025년 7.09%에서 0.1%p 인상됐어요. 장기요양보험료율은 0.9448%예요." },
  { q: "금융소득이 얼마부터 건보료에 영향을 주나요?", a: "연간 금융소득(이자+배당)이 1,000만원을 넘으면 건보료 산정에 반영돼요. 예금 만기가 한 해에 몰리면 건보료가 확 올라요." },
  { q: "재산도 건보료에 영향을 주나요?", a: "지역가입자는 재산 점수에 따라 보험료가 추가돼요. 과세표준에서 1억원을 공제한 뒤 계산해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국민건강보험법", url: "https://www.law.go.kr/법령/국민건강보험법" },
    { label: "국민건강보험공단", url: "https://www.nhis.or.kr" },
    { label: "2026년 건보료율 7.19% 결정(보건복지부)", url: "https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1487279&mid=a10503000000" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>건강보험 · 연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금 받는데 건보료가 올랐다면?<br />
        인상 원인과 조정 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연금 받기 시작했는데 건강보험료가 갑자기 올랐죠?
        국민연금 때문이라고 생각하기 쉬운데, 진짜 원인은 이자·배당·임대소득인 경우가 많아요.
        소득이 줄었다면 조정 신청으로 다음 달부터 낮출 수 있어요.
      </p>

      <Divider />

      <H2>건보료 인상, 진짜 원인은 뭔가요?</H2>
      <p style={body}>
        국민연금은 소득의 50%만 건보료에 반영돼요. 연금 때문에 건보료가 크게 오르지는 않아요.
      </p>

      <GreenBox title="건보료 인상 3대 원인">
        <strong>이자·배당소득</strong>: 100% 반영. 예금 만기가 한 해에 몰리면 확 올라요<br />
        <strong>임대소득</strong>: 100% 반영. 전세→월세 전환 시 주의<br />
        <strong>건보료율 인상</strong>: 2026년 7.19% (전년 대비 0.1%p 인상)
      </GreenBox>

      <p style={body}>
        <a href="https://www.nhis.or.kr" style={{ color: "#1D9E75" }}>건강보험공단</a> 앱이나 홈페이지에서 내 보험료 산정 내역을 확인하면
        어떤 소득 때문에 올랐는지 정확히 알 수 있어요.
      </p>

      <Divider />

      <H2>건보료, 얼마나 나올까요?</H2>
      <p style={body}>
        국민연금만 받고 다른 소득이 없다면 부담이 크지 않아요. 2026년 기준으로 계산해볼게요.
      </p>

      <BorderBox>
        <strong>국민연금 연 2,400만원 기준 예시</strong><br />
        · 월 소득: 200만원<br />
        · 건보료 산정 소득: 200만원 x 50% = 100만원<br />
        · 월 건보료: 100만원 x 7.19% = <strong>71,900원</strong><br />
        · 장기요양 포함: 약 <strong>81,340원</strong>
      </BorderBox>

      <p style={body}>
        여기에 이자소득 500만원이 더 있으면 건보료가 약 3만원 더 올라요.
        금융소득이 연 1,000만원 넘으면 건보료가 눈에 띄게 달라져요.
        <a href="/w/지역가입자-건강보험료-표" style={{ color: "#1D9E75" }}>지역가입자 건강보험료 표</a>에서 소득별 예상 보험료를 확인해보세요.
      </p>

      <Divider />

      <H2>조정 신청, 이렇게 하세요</H2>
      <p style={body}>
        소득이 줄었는데 건보료가 그대로라면 조정 신청을 해야 해요.
        신청 안 하면 다음 해 10월까지 비싼 보험료를 그대로 내야 해요.
      </p>

      <Steps steps={ADJUST_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민건강보험법과 보건복지부 자료를 바탕으로 작성됐어요. 보험료 산정은 개인 소득·재산에 따라 다르니 건강보험공단(1577-1000)에 확인하세요." />
    </ArticleLayout>
  );
}
