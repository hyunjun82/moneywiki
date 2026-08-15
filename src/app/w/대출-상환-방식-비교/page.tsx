"use client";
// Q1. 대출 받으러 갔더니 원금균등/원리금균등 중 선택하라는데 뭔지 모르는 상황
// Q2. 세 가지 상환 방식의 차이를 이해하고 내 상황에 맞는 방식을 선택하는 것
// Q3. 원금균등(체감식)·원리금균등·만기일시상환 각각의 계산 방식, 총 이자 차이, 월 상환액 변화, 상환 방식 변경 가능 여부
// Q4. 비교표(CompareTable) + 계산 예시(BorderBox) + 진단(DiagnoseCard) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const COMPARE_ROWS = [
  { label: "월 상환액", optionA: "초반 많고 점점 줄어듦", optionB: "매달 동일한 금액" },
  { label: "총 이자", optionA: "적음 (1억/4%/30년 → 약 2,004만원)", optionB: "많음 (1억/4%/30년 → 약 2,172만원)" },
  { label: "이자 차이", optionA: "약 168만원 절약", optionB: "기준" },
  { label: "원금 상환 속도", optionA: "빠름 (매달 같은 원금)", optionB: "느림 (초반에 이자 비중 높음)" },
  { label: "가계부 관리", optionA: "매달 금액이 달라서 번거로움", optionB: "매달 같아서 자동이체 편리" },
  { label: "DSR 심사", optionA: "초반 상환액이 커서 불리", optionB: "상환액이 낮아서 유리" },
];

const DIAGNOSE = {
  question: "나한테 맞는 상환 방식은?",
  options: [
    {
      label: "원금균등상환 (체감식)",
      desc: "매달 원금은 같고 이자만 줄어드는 방식",
      pros: ["총 이자가 가장 적어요", "시간이 갈수록 부담이 줄어요", "급여가 오르는 젊은 층에 유리해요"],
      cons: ["초반 월 상환액이 커요", "DSR 계산에서 불리해요"],
      best: "소득이 늘어날 20~30대, 이자를 최소화하고 싶은 분",
    },
    {
      label: "원리금균등상환",
      desc: "매달 내는 금액이 처음부터 끝까지 동일한 방식",
      pros: ["월 상환액이 일정해서 관리 편해요", "DSR 계산에서 유리해요", "자동이체 설정만 하면 신경 안 써도 돼요"],
      cons: ["총 이자가 원금균등보다 많아요", "원금이 천천히 줄어요"],
      best: "안정적인 소득의 중장년층, DSR 한도가 빠듯한 분",
    },
    {
      label: "만기일시상환",
      desc: "대출 기간 동안 이자만 내고 만기에 원금 한 번에 상환",
      pros: ["매달 이자만 내서 월 부담이 적어요", "전세대출처럼 단기 대출에 적합해요"],
      cons: ["총 이자가 가장 많아요", "만기에 목돈을 마련해야 해요", "원금이 줄지 않아요"],
      best: "전세대출처럼 2~3년 단기 사용 후 상환 가능한 분",
    },
  ],
};

const FAQS = [
  { q: "원금균등이랑 체감식이 같은 건가요?", a: "같은 방식이에요. 매달 내는 금액이 점점 줄어들기 때문에 '체감식'이라고 부르는 거예요. 은행마다 표현이 달라서 헷갈리지만 같은 거예요." },
  { q: "어떤 방식이 이자를 가장 적게 내요?", a: "원금균등상환이에요. 1억원, 금리 4%, 30년 기준으로 원리금균등보다 약 168만원 적게 내요. 금액이 크거나 기간이 길수록 차이가 더 벌어져요." },
  { q: "중간에 상환 방식을 바꿀 수 있나요?", a: "가능해요. 은행에 방문해서 조건 변경 신청하면 돼요. 수수료가 몇만원~십만원 정도 붙을 수 있어요. 단, 바꾼 시점부터만 적용되고 이미 낸 이자는 소급 안 돼요." },
  { q: "DSR 때문에 원금균등을 못 받는 경우가 있나요?", a: "원금균등은 첫 달 상환액이 크기 때문에 DSR 계산에서 불리해요. 같은 대출 금액이라도 원리금균등으로 하면 DSR이 낮게 나와서 대출이 되는 경우가 있어요." },
  { q: "만기일시상환은 아무 대출이나 되나요?", a: "주로 전세대출에서 쓰이고, 신용대출에서도 선택할 수 있는 경우가 있어요. 주택담보대출은 대부분 원금균등이나 원리금균등만 가능해요." },
  { q: "대출 연체하면 어떻게 되나요?", a: "연체이자(약정금리 + 3~5%p)가 붙고, 2회 연속 연체하면 기한의 이익 상실로 전액 즉시 상환해야 해요. 3개월 이상 연체하면 신용불량자(채무불이행) 등록돼요." },
  { q: "거치 기간이 뭐예요?", a: "대출 초반 일정 기간(보통 1~3년) 동안 이자만 내고 원금 상환을 미루는 거예요. 거치 기간이 끝나면 원금 + 이자를 함께 갚아요. 총 이자는 늘어나지만 초반 부담을 줄일 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국주택금융공사: 월별상환원리금 계산", url: "https://www.hf.go.kr/ko/sub01/sub01_06_03.do" },
      { label: "KB의 생각: 대출 상환 방식 비교", url: "https://kbthink.com/main/asset-management/wealth-manage-tip/kbthink-original/202505/loan-repayment.html" },
    ],
  },
];

const RELATED = [
  { slug: "DSR-계산-방법", title: "DSR 계산 방법", description: "상환 방식에 따라 DSR이 달라져요." },
  { slug: "DSR-DTI-차이", title: "DSR DTI 차이", description: "대출 규제 기준의 차이를 비교했어요." },
  { slug: "대출과-신용점수의-관계", title: "대출과 신용점수의 관계", description: "대출 상환이 신용점수에 미치는 영향이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 · 상환</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대출 상환 방식 비교,<br />
        원금균등·원리금균등·만기일시 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 받으러 갔더니 &quot;원금균등으로 할래요, 원리금균등으로 할래요?&quot; 물어보죠.
        처음 대출 받는 사람은 뭐가 뭔지 모르는 게 당연해요.
        쉽게 말하면 &quot;매달 갚는 방법&quot;을 정하는 건데, 어떤 걸 고르느냐에 따라{" "}
        <strong>총 이자가 수백만원 차이</strong> 나요.
        지금 3분만 투자하면 내 상황에 맞는 방식을 고를 수 있어요.
      </p>

      <Divider />

      <H2>원금균등 vs 원리금균등, 핵심 차이는?</H2>
      <p style={body}>
        원금균등상환(체감식)은 매달 원금을 똑같이 갚고, 이자는 남은 잔액에서 계산해요.
        시간이 지나면 갚는 금액이 점점 줄어요.
        원리금균등상환은 원금 + 이자 합계를 매달 같은 금액으로 맞춰요.
        처음부터 끝까지 동일한 금액을 내요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left" }}>항목</th>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left", color: "#0F6E56" }}>원금균등 (체감식)</th>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left" }}>원리금균등</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{r.label}</td>
                <td style={{ padding: "10px 12px", color: "#0F6E56" }}>{r.optionA}</td>
                <td style={{ padding: "10px 12px" }}>{r.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        같은 1억원을 4% 금리로 30년간 갚을 때, 원금균등이 약 168만원 이자를 덜 내요.
        금액이 크거나 기간이 길수록 이 차이는 더 벌어져요.
        3억원 30년이면 500만원 넘게 차이 나요.
      </p>

      <Divider />

      <H2>숫자로 보면 바로 이해돼요</H2>
      <p style={body}>
        1억원, 금리 연 4%, 30년(360개월) 기준으로 두 방식의 월 상환액이 어떻게 달라지는지 볼게요.
      </p>

      <SectionBadge>원금균등상환 (체감식)</SectionBadge>
      <BorderBox>
        1개월차: 원금 27.8만원 + 이자 33.3만원 = 61.1만원{"\n"}
        60개월차: 원금 27.8만원 + 이자 27.8만원 = 55.6만원{"\n"}
        180개월차: 원금 27.8만원 + 이자 16.7만원 = 44.5만원{"\n"}
        360개월차: 원금 27.8만원 + 이자 0.1만원 = 27.9만원{"\n"}
        → 총 이자: 약 2,004만원
      </BorderBox>

      <SectionBadge>원리금균등상환</SectionBadge>
      <BorderBox>
        1개월차: 원금 14.4만원 + 이자 33.3만원 = 47.7만원{"\n"}
        60개월차: 원금 18.7만원 + 이자 29.0만원 = 47.7만원{"\n"}
        180개월차: 원금 28.8만원 + 이자 18.9만원 = 47.7만원{"\n"}
        360개월차: 원금 47.6만원 + 이자 0.1만원 = 47.7만원{"\n"}
        → 총 이자: 약 2,172만원
      </BorderBox>

      <p style={body}>
        원금균등은 첫 달 61만원에서 시작해서 점점 줄어요. 원리금균등은 매달 47.7만원으로 같아요.
        초반 부담은 원금균등이 14만원 정도 크지만, 총 이자에서 168만원을 아끼는 거예요.
      </p>

      <Divider />

      <H2>만기일시상환은 언제 쓰나요?</H2>
      <p style={body}>
        만기일시상환은 대출 기간 동안 이자만 내다가 만기에 원금을 한 번에 갚는 방식이에요.
        전세대출에서 많이 쓰죠. 전세 2년 살다가 보증금 돌려받으면 그걸로 대출을 갚으면 되니까요.
      </p>

      <GreenBox title="만기일시상환 예시 (1억원, 4%, 10년)">
        매달 이자만: 약 33.3만원 (10년간 동일){"\n"}
        10년 후 원금 1억원 한 번에 상환{"\n"}
        총 이자: 약 4,000만원{"\n"}
        → 원금균등(2,004만원)보다 약 2배 많아요
      </GreenBox>

      <p style={body}>
        총 이자가 가장 많은 방식이에요. 원금을 10년 내내 안 갚으니까 계속 1억원에 대한 이자가 붙는 거예요.
        만기에 목돈이 없으면 대출을 연장하거나 갈아타야 하는데, 그때 금리가 올라 있으면 더 불리해져요.
        2~3년 단기로만 쓰는 게 좋아요.
      </p>

      <Divider />

      <H2>내 상황에는 어떤 방식이 맞아요?</H2>
      <p style={body}>
        &quot;그래서 나는 뭘 골라야 해요?&quot; 소득 패턴과 대출 목적에 따라 달라요.
        아래에서 내 상황에 가까운 걸 찾아보세요.
      </p>

      <GreenBox title={DIAGNOSE.question}>
        {DIAGNOSE.options.map((opt, i) => (
          <div key={i} style={{ marginBottom: i < DIAGNOSE.options.length - 1 ? 12 : 0 }}>
            <strong>{opt.label}</strong>: {opt.desc}{"\n"}
            추천 대상: {opt.best}
          </div>
        ))}
      </GreenBox>

      <p style={body}>
        한 가지 더 알아둘 것이 있어요.{" "}
        <a href="/w/DSR-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>DSR 계산</a>할 때
        원금균등은 첫 달 상환액(가장 큰 금액)이 기준이 돼요. 원리금균등은 고정 상환액이 기준이고요.
        같은 대출인데 상환 방식 때문에 DSR이 달라져서, 원금균등은 안 되고 원리금균등은 되는 경우도 있어요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대출 상환 방식 선택에서 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국주택금융공사 계산 방식을 참고해 작성됐어요. 실제 금리와 상환 조건은 대출 상품마다 다르니 거래 은행에 문의하세요." />
    </ArticleLayout>
  );
}
