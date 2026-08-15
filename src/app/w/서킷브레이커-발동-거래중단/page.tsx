"use client";
// Q1. 뉴스에서 서킷브레이커 발동 소식 들었거나 보유 주식 거래가 갑자기 안 돼서 당황한 투자자
// Q2. 서킷브레이커 발동 이유와 거래 재개 시점을 파악해 대응 결정
// Q3. 발동 조건(전일 종가 대비 8%), 단계별 거래중단 시간(20분씩), 하루 최대 2회 한도, 발동 시간대(9시~15:20)
// Q4. 단계별 표 + GreenBox 요약 + Steps 흐름 + FAQ
// MAP-INTRO: 갑자기 주식 거래가 안 된다면 서킷브레이커가 발동된 거예요
// MAP-TYPE: 절차
// MAP-H2: 발동조건 > 단계별구조 > 발동흐름 > 체크리스트 > FAQ
// MAP-COMP: GreenBox > 표 > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "주식-양도소득세-과세대상", title: "주식 양도소득세 과세 대상", description: "내가 양도소득세를 내야 하는지 확인하는 방법이에요." },
  { slug: "증권거래세", title: "증권거래세 계산과 납부 방법", description: "주식 매도할 때마다 내는 증권거래세 기준이에요." },
];

const STAGES = [
  { id: "s1", name: "1단계", condition: "전일 종가 대비 8% 이상 하락", duration: "20분 거래 중단", note: "오전 9시 ~ 오후 3시 20분 사이에만 발동" },
  { id: "s2", name: "2단계", condition: "1단계 해제 후 8% 이상 추가 하락", duration: "추가 20분 거래 중단", note: "하루 최대 2단계까지만 발동" },
];

const STEPS = [
  {
    title: "시장이 급락 시작",
    desc: "코스피 또는 코스닥 지수가 전날 종가 대비 8% 이상 하락해요. 순간적인 급락이 아니라 1분간 평균 가격 기준으로 측정돼요. 단순히 순간 8% 찍었다 오르면 발동되지 않아요.",
  },
  {
    title: "1단계 서킷브레이커 발동",
    desc: "한국거래소가 자동으로 모든 주식·파생상품 거래를 20분간 중단해요. 이 시간 동안 매수·매도 주문 모두 불가예요. 시장 전체가 멈추는 거예요. 오후 3시 20분 이후엔 발동되지 않아요.",
    tip: "보유 주식이 있어도 거래 중단 중엔 아무것도 못 해요. 20분 기다리는 것 외에 방법이 없어요",
  },
  {
    title: "20분 후 거래 재개",
    desc: "거래 중단 20분이 지나면 단일가 매매 방식으로 거래가 재개돼요. 단일가 매매란 일정 시간 동안 주문을 모은 뒤 한 번에 체결하는 방식이에요. 바로 정상 거래로 돌아가지 않고 10분간 단일가 매매를 거쳐요.",
  },
  {
    title: "2단계 발동 여부 확인",
    desc: "재개 후에도 시장이 8% 이상 추가로 하락하면 2단계가 발동돼요. 2단계도 똑같이 20분 거래 중단이에요. 2단계까지 발동하면 그날은 더 이상 서킷브레이커가 걸리지 않아요. 하루 최대 2회가 한도예요.",
  },
];

const FAQS = [
  {
    q: "서킷브레이커 발동되면 내 주문은 어떻게 되나요?",
    a: "접수된 주문은 취소돼요. 거래 중단 중에는 새 주문도 불가예요. 20분 후 거래 재개 시 새로 주문해야 해요.",
  },
  {
    q: "코스피랑 코스닥 둘 다 동시에 발동되나요?",
    a: "각각 독립적으로 발동돼요. 코스피가 8% 떨어졌다고 코스닥이 자동으로 걸리진 않아요. 코스닥도 8% 이상 하락해야 따로 발동돼요.",
  },
  {
    q: "오후 3시 20분 이후엔 왜 발동이 안 되나요?",
    a: "장 마감(오후 3시 30분) 10분 전이기 때문이에요. 발동해도 거래 중단 20분이 마감 이후가 되어서 의미가 없어요. 그래서 3시 20분 이후엔 아무리 떨어져도 발동되지 않아요.",
  },
  {
    q: "서킷브레이커랑 사이드카는 다른 건가요?",
    a: "달라요. 사이드카는 선물 가격이 5분간 5% 이상 변동할 때 프로그램 매매만 5분간 중단하는 제도예요. 서킷브레이커는 시장 전체를 20분 멈추는 훨씬 강력한 조치예요.",
  },
  {
    q: "발동 후 투자자는 뭘 해야 하나요?",
    a: "20분 기다리는 것 외에는 할 수 있는 게 없어요. 이 시간에 패닉 매도 충동을 억제하고 시장 상황을 냉정하게 판단하는 게 도움이 돼요. 재개 직후 급격한 변동이 많아요.",
  },
  {
    q: "2020년 3월에 왜 자주 발동됐나요?",
    a: "코로나19 대유행으로 전 세계 시장이 패닉 상태였기 때문이에요. 한 달에만 5번 발동됐는데, 그 전까지 한 번도 발동된 적이 없었어요. 서킷브레이커가 자주 발동된다면 시장 불안이 극에 달한 신호예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "자본시장과 금융투자업에 관한 법률", url: "https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "한국거래소: 서킷브레이커 제도 안내", url: "https://www.krx.co.kr" },
      { label: "찾기쉬운 생활법령정보", url: "https://www.easylaw.go.kr" },
    ],
  },
];

const CHECKLIST = [
  "발동 조건: 전일 종가 대비 8% 이상 하락 (1분간 평균 기준)",
  "거래 중단 시간: 20분 (단계별 동일)",
  "하루 최대 2회 (1단계 + 2단계)",
  "발동 가능 시간: 오전 9시 ~ 오후 3시 20분",
  "거래 재개 방식: 단일가 매매 10분 후 정상 거래",
  "2단계 이후: 추가 하락해도 더 이상 발동 없음",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주식시장 · 거래제도 · 투자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        서킷브레이커 발동 조건과 거래중단 시간<br />
        단계별 구조와 실제 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갑자기 주식 거래가 안 된다면 서킷브레이커가 발동된 거예요. 코스피나 코스닥 지수가 전날 종가 대비
        8% 이상 급락하면 <a href="https://www.law.go.kr/법령/자본시장과금융투자업에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>자본시장법</a>에 따라
        20분간 모든 거래가 멈춰요. 하루 최대 2번까지 발동되고, 그 이후엔 아무리 떨어져도 추가로 걸리지 않아요.
        <a href="/w/주식-양도소득세-과세대상" style={{ color: "#1D9E75", textDecoration: "underline" }}> 주식 세금</a>처럼
        투자자라면 기본으로 알아야 할 제도예요.
      </p>

      <Divider />

      <H2>서킷브레이커 발동 조건, 정확히 뭐예요?</H2>
      <p style={body}>
        단순히 "8% 하락"이 전부가 아니에요. 1분간 평균 가격이 전일 종가 대비 8% 이상 하락하고,
        그 상태가 지속됐을 때 발동돼요. 순간적으로 8% 찍었다가 바로 회복되면 발동이 안 될 수 있어요.
      </p>
      <p style={body}>
        발동 가능한 시간은 오전 9시부터 오후 3시 20분까지예요. 장 마감 10분 전인 3시 20분 이후엔
        발동되지 않아요. 어차피 거래 중단 20분이 장 마감 이후로 넘어가기 때문에 의미가 없어서예요.
      </p>
      <p style={body}>
        코스피와 코스닥은 각각 독립적으로 발동돼요. 코스피가 8% 떨어졌다고 코스닥이 자동으로 걸리진 않고,
        코스닥도 별도로 8% 이상 하락해야 따로 발동돼요.
      </p>

      <GreenBox>
        발동 조건: 전일 종가 대비 8% 이상 하락 (1분 평균 기준)<br />
        거래 중단 시간: 1단계 20분 / 2단계 20분 (하루 최대 2회)<br />
        발동 시간대: 오전 9시 ~ 오후 3시 20분 (이후 발동 없음)
      </GreenBox>

      <Divider />

      <H2>단계별 거래중단, 어떻게 진행되나요?</H2>
      <p style={body}>
        서킷브레이커는 1단계, 2단계로 나뉘어 발동돼요. 1단계가 발동되고 거래가 재개됐는데도
        추가로 8% 이상 하락하면 2단계가 다시 발동돼요. 두 단계 모두 거래 중단 시간은 20분이에요.
      </p>
      <p style={body}>
        거래 재개 시에는 바로 정상 거래로 돌아가지 않아요. 10분간 단일가 매매를 먼저 거쳐요.
        단일가 매매는 일정 시간 동안 주문을 모아서 한 번에 체결하는 방식이에요.
        재개 직후 급격한 가격 변동을 억제하기 위한 장치예요.
      </p>

      <SectionBadge>단계별 발동 구조</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>단계</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>발동 조건</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>거래 중단</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 700, color: "#1D9E75" }}>{s.name}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{s.condition}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{s.duration}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        2단계까지 발동되면 그날은 아무리 지수가 더 떨어져도 추가 서킷브레이커는 없어요.
        투자자 보호보다 시장 기능 마비를 막는 게 우선이기 때문이에요.
      </BorderBox>

      <Divider />

      <H2>서킷브레이커 발동부터 재개까지 흐름</H2>
      <p style={body}>
        실제 서킷브레이커가 발동되면 어떤 순서로 진행되는지 단계별로 정리했어요.
        20분이라는 시간은 단순히 멈추는 게 아니라 투자자들이 패닉에서 벗어나 냉정하게
        판단할 시간을 주는 거예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>핵심 정리</H2>
      <p style={body}>
        뉴스에서 서킷브레이커 발동 소식이 들렸을 때 바로 확인해야 할 핵심 정보예요.
        특히 재개 시점과 2단계 여부가 중요해요.
      </p>

      <SectionBadge>핵심 확인 사항</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        2020년 3월 코로나19 대유행 때 한 달 동안 5번 발동됐어요.<br />
        그 전까지 한국 주식시장에서 한 번도 발동된 적이 없었어요.<br />
        서킷브레이커가 자주 발동된다면 시장이 극도로 불안하다는 신호예요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        서킷브레이커 발동 때 투자자들이 가장 많이 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 한국거래소 규정 및 자본시장법을 바탕으로 작성됐어요. 규정 변경 시 한국거래소 공식 사이트에서 최신 내용을 확인하세요." />
    </ArticleLayout>
  );
}
