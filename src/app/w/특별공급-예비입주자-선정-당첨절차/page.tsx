"use client";

// Q1. 특별공급 신청 후 '예비입주자 XX번'으로 선정됐는데, 이게 당첨인지 탈락인지 모르겠고 언제 연락 오는지 궁금한 상황.
// Q2. 예비입주자 제도를 이해하고, 연락을 놓치지 않으며, 당첨 시 빠르게 서류 제출·계약하는 행동.
// Q3. 예비입주자 = 대기자, 물량의 500% 이상 선정, 정당첨자 포기 시 순번대로 기회, 참가 의사 표시 필요, 서류 미리 준비, 기관추천 예비 별도 운영.
// Q4. Steps(당첨 절차) + GreenBox(핵심 요약) + BorderBox(선정 기준) + Checklist(대비 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FLOW_STEPS = [
  { title: "예비입주자 순번 확인", desc: "당첨자 발표일에 청약홈(applyhome.co.kr)에서 예비입주자 순번을 확인해요. 사업주체 홈페이지에서도 조회 가능해요." },
  { title: "정당첨자 포기 발생 대기", desc: "정당첨자 계약 기간이 끝나면 사업주체가 미계약 물량을 확인해요. 분담금 부담이나 다른 단지 당첨으로 포기하는 사람이 나올 수 있어요." },
  { title: "참가 의사 확인 연락", desc: "사업주체가 예비입주자에게 전화나 문자로 '동·호수 추첨에 참여하시겠습니까?'라고 연락해요.", tip: "연락 한 번만 와요. 놓치면 다음 순번으로 넘어가요" },
  { title: "추첨 및 계약", desc: "참가 의사 밝힌 예비입주자끼리 남은 동·호수를 추첨해요. 당첨되면 정당첨자와 동일하게 계약을 진행해요." },
];

const PREPARE_ITEMS = [
  "전화번호 변경 없이 항상 수신 가능 상태 유지",
  "주민등록등본, 가족관계증명서, 소득증빙 미리 준비",
  "계약금 마련 (보통 분양가의 10~20%)",
  "사업주체 문자 알림 서비스 신청",
  "청약홈에서 예비입주자 순번 수시 확인",
];

const FAQS = [
  { q: "예비입주자는 몇 명까지 선정되나요?", a: "특별공급 물량의 500% 이상이에요. 10세대면 예비입주자 최소 50명이에요. 신청자가 600% 미만이면 당첨자 제외 전원을 예비로 선정해요." },
  { q: "순번이 뒤쪽인데 당첨 가능성이 있나요?", a: "있어요. 분담금이 높거나 입지가 아쉬운 단지는 정당첨자 중 10~20%가 포기하는 경우도 있어요. 끝까지 기다려보세요." },
  { q: "예비입주자 연락은 언제 오나요?", a: "정당첨자 계약 기간 종료 후 며칠 내에 와요. 전화나 문자로 오는데, 시점은 단지마다 달라요." },
  { q: "기관추천 특별공급 예비는 다른가요?", a: "네. 기관에서 추천한 예비자가 먼저 기회를 받고, 그래도 남으면 일반 특별공급 낙첨자에게 돌아가요. 기관별 운영 방식이 조금씩 달라요." },
  { q: "예비 당첨 포기하면 어떻게 되나요?", a: "포기하면 다음 순번으로 넘어가고, 본인은 해당 단지에서 기회를 잃게 돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택공급에 관한 규칙(법제처)", url: "https://www.law.go.kr/법령/주택공급에관한규칙" },
      { label: "한국부동산원 청약홈", url: "https://www.applyhome.co.kr" },
    ],
  },
];

const RELATED = [
  { slug: "특별공급", title: "특별공급 유형과 자격 조건", description: "5개 유형별 자격과 소득 기준을 비교해요." },
  { slug: "청약-가점제-계산", title: "청약 가점 계산", description: "가점 항목별 점수 계산법이에요." },
  { slug: "무순위-청약", title: "무순위 청약", description: "미달 단지에 청약통장 없이 신청하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 청약 · 예비입주자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        특별공급 예비입주자, 당첨 가능성 있을까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          선정 기준부터 당첨까지 절차
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        특별공급 신청했는데 &apos;예비입주자 123번&apos;이라고 나왔어요.
        당첨인 건지 탈락인 건지 헷갈리죠. 예비입주자는 완전히 떨어진 게 아니에요.
        정당첨자가 포기하면 순번대로 기회가 와요.
      </p>

      <Divider />

      <H2>예비입주자가 뭔가요?</H2>
      <p style={body}>
        쉽게 말해 &apos;대기자&apos;예요.
        <a href="https://www.law.go.kr/법령/주택공급에관한규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택공급에 관한 규칙</a>에 따라
        사업주체는 반드시 예비입주자를 선정해야 해요.
      </p>
      <GreenBox title="예비입주자 핵심 요약">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li>특별공급 물량의 <strong>500% 이상</strong>을 예비입주자로 선정</li>
          <li>컴퓨터 추첨으로 순번이 정해져서 <strong>공정하게 배정</strong></li>
          <li>정당첨자가 포기하면 <strong>순번대로</strong> 기회가 돌아옴</li>
          <li>신청자 600% 미만이면 당첨자 제외 <strong>전원 예비</strong>로 선정</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>예비입주자가 당첨되는 절차</H2>
      <p style={body}>
        정당첨자 중 포기자가 생겨야 기회가 와요. 절차를 순서대로 정리했어요.
      </p>
      <SectionBadge>당첨까지 4단계</SectionBadge>
      <Steps steps={FLOW_STEPS} />

      <Divider />

      <H2>앞 순번일수록 유리한 이유</H2>
      <p style={body}>
        포기율은 단지에 따라 크게 달라요. 분담금이 높거나 입지가 아쉬운 곳은 포기자가 많아요.
      </p>
      <BorderBox title="단지 특성별 포기 가능성">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>분양가 높은 단지</strong>: 분담금 부담 → 포기율 높음 → 예비 당첨 확률 상승</li>
          <li><strong>입지 아쉬운 단지</strong>: 다른 단지 당첨 시 이쪽 포기 → 예비에게 기회</li>
          <li><strong>인기 단지</strong>: 포기자 거의 없음 → 예비 당첨 어려움</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>연락 놓치지 않으려면 이것만 준비하세요</H2>
      <p style={body}>
        예비입주자 연락은 한 번만 와요. 놓치면 다음 순번으로 넘어가니 대비가 중요해요.
      </p>
      <SectionBadge>필수 대비 사항</SectionBadge>
      <Checklist items={PREPARE_ITEMS} />

      <Divider />

      <ArticleAd />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 주택공급에 관한 규칙을 바탕으로 작성했어요. 단지별 운영 방식이 다를 수 있으니 사업주체에 확인하세요." />
    </ArticleLayout>
  );
}
