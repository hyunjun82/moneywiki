"use client";

// Q1. 청년 목돈 마련 상품이 여러 개인데 뭐가 뭔지 헷갈리고, 내 조건에 맞는 상품을 고르고 싶은 19~34세 청년.
// Q2. 5종 상품 중 본인 조건(소득·직업·나이)에 맞는 상품 1~2개를 골라서 가입 신청하는 행동.
// Q3. 5종 상품별 대상·기간·지원방식·수령액 차이, 중복가입 제한 규칙, 소득별 최적 상품 판단 기준.
// Q4. BorderBox(5종 비교표) + GreenBox(소득별 추천) + Checklist(중복가입 규칙) + Steps(가입 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const DUP_RULES = [
  "청년미래적금 + 청년도약계좌 = 동시 가입 불가 (갈아타기는 가능)",
  "청년미래적금 + 청년형 ISA = 동시 가입 가능",
  "청년내일저축계좌 + 청년미래적금 = 소득 기준이 달라 보통 한쪽만 해당",
  "장병내일준비적금은 복무 중 전용, 전역 후 다른 상품 가입 가능",
];

const STEPS = [
  { title: "내 소득·직업 확인", desc: "개인소득, 가구 중위소득, 직업 유형(직장인·자영업·군인·저소득)을 먼저 파악해요." },
  { title: "5종 중 해당 상품 체크", desc: "아래 비교표에서 내 조건에 맞는 상품을 찾아요. 보통 1~2개에 해당돼요." },
  { title: "중복 가입 가능 여부 확인", desc: "청년형 ISA는 다른 상품과 동시 가입 가능하니 함께 가입하면 혜택이 두 배예요." },
  { title: "해당 기관에서 신청", desc: "청년미래적금은 시중은행 앱, 청년내일저축계좌는 복지로, 장병적금은 군 금융기관에서 신청해요." },
];

const FAQS = [
  { q: "여러 상품 동시에 가입할 수 있나요?", a: "일부는 안 돼요. 청년미래적금과 청년도약계좌는 중복 불가예요. 청년형 ISA는 다른 상품과 함께 가입 가능하니 꼭 같이 하세요." },
  { q: "가장 혜택 좋은 상품은 뭔가요?", a: "조건마다 달라요. 중소기업 취업자는 청년미래적금 우대형(기여금 12%), 저소득층은 청년내일저축계좌(매칭 1:3)가 가장 좋아요." },
  { q: "청년도약계좌 이미 가입했는데 어떻게 해요?", a: "만기까지 유지하는 게 유리해요. 3년 이상 가입했다면 만기 후 청년미래적금으로 갈아타기가 가능할 거예요." },
  { q: "소득이 아예 없으면 가입 가능해요?", a: "청년내일저축계좌는 근로소득이 있어야 해요. 청년미래적금도 소득 기준이 있으니, 소득이 전혀 없으면 가입이 어려워요." },
  { q: "청년형 ISA는 원금 보장이 안 되나요?", a: "맞아요. 투자형 상품이라 원금 손실 가능성이 있어요. 안정 추구라면 적금형 상품이 맞고, 수익을 노린다면 ISA를 고려해보세요." },
  { q: "군인인데 전역 후 다른 상품 가입 가능해요?", a: "네. 장병내일준비적금은 복무 중 전용이고, 전역 후 나이·소득 조건 맞으면 청년미래적금이나 청년형 ISA에 가입할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "금융위원회", url: "https://www.fsc.go.kr" },
      { label: "보건복지부 청년내일저축계좌", url: "https://www.mohw.go.kr" },
      { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년미래적금-가입조건-신청방법", title: "청년미래적금 가입 조건", description: "일반형·우대형 자격과 신청 방법을 자세히 안내해요." },
  { slug: "ISA계좌-단점", title: "ISA 계좌 장단점", description: "비과세 400만원 혜택과 주의할 점이에요." },
  { slug: "청년도약계좌-가입방법", title: "청년도약계좌 가입방법", description: "5년 만기 최대 5,000만원 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 청년 · 자산형성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년 목돈 마련 상품, 나한테 뭐가 맞을까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          5종 비교와 소득별 선택 기준
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년미래적금, 청년도약계좌, 청년내일저축계좌, 장병내일준비적금, 청년형 ISA.
        이름만 비슷해서 뭐가 뭔지 헷갈리죠. 결론부터 말하면 소득과 직업에 따라 맞는 상품이 달라요.
      </p>

      <Divider />

      <H2>5종 한눈에 비교하면?</H2>
      <p style={body}>
        상품마다 대상, 기간, 지원 방식이 전부 달라요. 내 조건에 맞는 걸 골라야 해요.
      </p>
      <SectionBadge>5종 비교표</SectionBadge>
      <BorderBox title="청년 자산형성 5종 비교">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.8, minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #1D9E75" }}>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>상품</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>대상</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>기간</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>정부 지원</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>최대 수령액</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>청년미래적금</td>
                <td style={{ padding: "8px 4px" }}>19~34세, 소득 6천만원↓</td>
                <td style={{ padding: "8px 4px" }}>3년</td>
                <td style={{ padding: "8px 4px" }}>기여금 6~12%</td>
                <td style={{ padding: "8px 4px", fontWeight: 600, color: "#1D9E75" }}>약 2,200만원</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>청년도약계좌</td>
                <td style={{ padding: "8px 4px" }}>19~34세 (신규 종료)</td>
                <td style={{ padding: "8px 4px" }}>5년</td>
                <td style={{ padding: "8px 4px" }}>기여금 3~6%</td>
                <td style={{ padding: "8px 4px" }}>약 5,000만원</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>청년내일저축계좌</td>
                <td style={{ padding: "8px 4px" }}>중위소득 50%↓ 청년</td>
                <td style={{ padding: "8px 4px" }}>3년</td>
                <td style={{ padding: "8px 4px" }}>매칭 1:3</td>
                <td style={{ padding: "8px 4px" }}>약 1,440만원</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>장병내일준비적금</td>
                <td style={{ padding: "8px 4px" }}>현역·사회복무요원</td>
                <td style={{ padding: "8px 4px" }}>복무 중</td>
                <td style={{ padding: "8px 4px" }}>정부 매칭</td>
                <td style={{ padding: "8px 4px" }}>약 1,000만원</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>청년형 ISA</td>
                <td style={{ padding: "8px 4px" }}>총급여 5천만원↓</td>
                <td style={{ padding: "8px 4px" }}>3년+</td>
                <td style={{ padding: "8px 4px" }}>비과세 400만원</td>
                <td style={{ padding: "8px 4px" }}>투자 수익에 따라</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BorderBox>

      <Divider />

      <H2>소득별로 어떤 상품이 유리해요?</H2>
      <p style={body}>
        소득 수준에 따라 가장 혜택 큰 상품이 달라요. 내 상황에 맞는 걸 고르세요.
      </p>
      <GreenBox title="소득별 추천 상품">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>중위소득 50% 이하</strong> → 청년내일저축계좌 (월 10만원에 정부 30만원 매칭, 가성비 최고)</li>
          <li><strong>중소기업 취업자 (소득 3,600만원↓)</strong> → 청년미래적금 우대형 (기여금 12%)</li>
          <li><strong>일반 직장인 (소득 6,000만원↓)</strong> → 청년미래적금 일반형 + 청년형 ISA 동시 가입</li>
          <li><strong>군 복무 중</strong> → 장병내일준비적금 (전역 후 청년미래적금 갈아타기)</li>
          <li><strong>투자에 자신 있는 청년</strong> → 청년형 ISA (비과세 400만원 + 분리과세 9.9%)</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>동시에 가입할 수 있는 조합은?</H2>
      <p style={body}>
        중복 가입 제한이 있어서 잘 확인해야 해요.
      </p>
      <SectionBadge>중복 가입 규칙</SectionBadge>
      <Checklist items={DUP_RULES} />

      <Divider />

      <H2>가입 결정부터 신청까지 절차</H2>
      <p style={body}>
        어떤 상품을 골라야 할지 결정하고 신청하는 순서예요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성했어요. 청년미래적금은 2026년 6월 출시 예정이며, 세부 조건은 변경될 수 있어요." />
    </ArticleLayout>
  );
}
