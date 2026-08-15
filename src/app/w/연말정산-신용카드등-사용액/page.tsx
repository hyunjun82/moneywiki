"use client";
// Q1. 카드를 많이 썼는데 연말정산에서 얼마나 돌려받는지 궁금한 직장인. 공제율과 한도를 모르는 상황.
// Q2. 본인 총급여 25% 기준을 확인하고, 체크카드·전통시장 활용 전략을 세우는 행동.
// Q3. 공제 시작점(총급여 25%), 카드별 공제율(신용15%/체크30%/전통시장40%), 한도(300만~200만+추가), 가족 합산.
// Q4. GreenBox(공제율 요약) + 표(카드별 공제율) + BorderBox(계산 예시) + Checklist(절세 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "체크카드가 신용카드보다 공제율이 높나요?",
    a: "네, 신용카드 15%에 비해 체크카드·현금영수증은 30%로 2배 차이나요.",
  },
  {
    q: "총급여 25%는 어떻게 계산하나요?",
    a: "연봉 5천만원이면 1,250만원이 25%예요. 1년 카드 사용액이 이 금액을 넘어야 공제가 시작돼요.",
  },
  {
    q: "가족 카드 사용액도 합산할 수 있나요?",
    a: "배우자와 부양가족(인적공제 대상)의 카드 사용액을 합산할 수 있어요. 맞벌이 부부는 각자만 가능해요.",
  },
  {
    q: "전통시장 공제 추가 한도가 뭐예요?",
    a: "기본 한도 300만원 외에 전통시장·대중교통·도서공연비 각각 100만원씩 추가 한도가 있어요. 최대 600만원까지 가능해요.",
  },
  {
    q: "2026년부터 바뀌는 게 있나요?",
    a: "다자녀 가구는 자녀당 50만원(최대 100만원)씩 기본 한도가 상향돼요. 공제율 자체는 기존과 동일해요.",
  },
  {
    q: "간소화서비스에서 누락된 내역은 어떻게 하나요?",
    a: "카드사에 연락해서 정정 요청하면 돼요. 매년 1월 홈택스에서 자동 집계된 내역을 먼저 확인하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "조세특례제한법 제126조의2", url: "https://www.law.go.kr/법령/조세특례제한법" },
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 간소화서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제 항목이에요." },
  { slug: "연말정산-교원", title: "교원 연말정산 특수 항목", description: "방과후수당·사학연금 등 교원만의 연말정산 포인트예요." },
  { slug: "연말정산-월급", title: "연말정산과 월급의 관계", description: "환급금이 월급에 어떻게 반영되는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 카드</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용카드 소득공제, 얼마나 돌려받나?<br />
        공제율·한도·계산법 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        카드를 많이 썼는데 연말정산에서 얼마나 돌려받을 수 있을지 궁금하죠?
        총급여의 25%를 넘게 쓴 금액부터 공제받을 수 있고,
        같은 금액이라도 어떤 카드로 썼느냐에 따라 환급액이 2배 차이나요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>카드별 공제율, 한눈에 보기</H2>

      <GreenBox>
        · 신용카드: <strong>15%</strong><br />
        · 체크카드·현금영수증: <strong>30%</strong><br />
        · 전통시장·대중교통: <strong>40%</strong><br />
        · 도서·공연비: <strong>30%</strong>
      </GreenBox>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>결제 수단</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신용카드", "15%", "가장 낮음"],
              ["체크카드", "30%", "신용카드의 2배"],
              ["현금영수증", "30%", "체크카드와 동일"],
              ["전통시장", "40%", "추가 한도 100만원"],
              ["대중교통", "40%", "추가 한도 100만원"],
              ["도서·공연비", "30%", "총급여 7천만원 이하만"],
            ].map(([method, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{method}</td>
                <td style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>공제 시작점과 한도</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제126조의2</a>에 따라,
        총급여의 25%를 초과한 카드 사용액부터 공제가 시작돼요.
        25%에 못 미치면 한 푼도 공제를 못 받아요.
      </p>

      <BorderBox>
        <strong>총급여별 공제 한도</strong><br /><br />
        · 7,000만원 이하: 기본 <strong>300만원</strong><br />
        · 7,000만원 초과~1.2억원 이하: <strong>250만원</strong><br />
        · 1.2억원 초과: <strong>200만원</strong><br /><br />
        <strong>추가 한도</strong> (위 기본 한도에 더해짐)<br />
        · 전통시장: +100만원 / 대중교통: +100만원 / 도서·공연비: +100만원<br />
        → 총급여 7,000만원 이하는 최대 <strong>600만원</strong>까지 가능
      </BorderBox>

      <Divider />

      <H2>실제 계산 예시</H2>

      <BorderBox>
        <strong>연봉 5,000만원, 카드 사용액 총 2,800만원인 경우</strong><br /><br />
        ① 25% 기준: 5,000만 x 25% = 1,250만원<br />
        ② 공제 대상: 2,800만 - 1,250만 = <strong>1,550만원</strong><br /><br />
        ③ 공제율 적용 (높은 순서대로):<br />
        · 전통시장 300만원 x 40% = 120만원<br />
        · 체크카드 500만원 x 30% = 150만원<br />
        · 신용카드 750만원 x 15% = 112.5만원<br />
        · 합계: 382.5만원<br /><br />
        ④ 기본 한도 300만원 적용 → 최종 공제액: <strong>300만원</strong><br />
        (전통시장 추가 한도로 120만원 추가 가능 → 실질 공제 <strong>420만원</strong>)
      </BorderBox>

      <Divider />

      <H2>절세 전략, 이렇게 쓰세요</H2>

      <SectionBadge>카드 소득공제 극대화 체크리스트</SectionBadge>
      <Checklist items={[
        "연초~9월: 신용카드로 25% 기준 채우기 (포인트·할인 혜택 활용)",
        "10월~12월: 체크카드·현금영수증으로 전환 (공제율 2배)",
        "장보기는 전통시장 이용 (40% 공제 + 추가 한도 100만원)",
        "출퇴근 대중교통 이용 (40% 공제 + 추가 한도 100만원)",
        "12월에 25% 기준 근접했다면 조금 더 써서 시작점 넘기기",
        "자녀 카드 합산 대상자를 미리 정해서 한도 효율화",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 조세특례제한법과 국세청 연말정산 안내를 바탕으로 작성했어요. 공제율·한도는 세법 개정에 따라 달라질 수 있으니 매년 국세청 공식 자료를 확인해봐요." />
    </ArticleLayout>
  );
}
