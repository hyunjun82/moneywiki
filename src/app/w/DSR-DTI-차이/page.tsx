"use client";
// Q1. 대출 상담 중 DTI는 되는데 DSR이 안 된다는 말을 듣고 둘의 차이를 모르는 상황
// Q2. DSR과 DTI의 차이를 이해하고 내 대출 한도에 어떤 게 적용되는지 판단하는 것
// Q3. DSR vs DTI 계산 범위 차이, 적용 대상, 규제 한도(40%/50%), 같은 소득에서 한도 차이, 스트레스DSR
// Q4. 비교표(CompareTable) + 계산 예시(BorderBox) + 진단(DiagnoseCard) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const COMPARE_ROWS = [
  { label: "계산 범위", optionA: "모든 대출 원리금 전체", optionB: "주담대 원리금 + 기타 대출 이자만" },
  { label: "기타 대출 반영", optionA: "원금 + 이자 전부", optionB: "이자만 (원금 제외)" },
  { label: "적용 대출", optionA: "주담대·신용대출·전세대출·마이너스통장 전부", optionB: "주택담보대출에만 적용" },
  { label: "규제 기준", optionA: "은행 40% / 비은행 50%", optionB: "은행 내규 50~60%" },
  { label: "까다로운 정도", optionA: "훨씬 까다로움", optionB: "상대적으로 느슨함" },
  { label: "2026년 적용", optionA: "거의 모든 대출의 기본 기준", optionB: "정책 대출(디딤돌·버팀목)에서 활용" },
];

const DIAGNOSE = {
  question: "내 상황에 적용되는 규제는?",
  options: [
    {
      label: "시중은행 주택담보대출",
      desc: "DSR 40% + DTI 둘 다 계산해서 더 낮은 한도 적용",
      pros: ["금리가 낮은 편이에요", "스트레스 DSR 3단계 적용으로 안정적이에요"],
      cons: ["DSR 40%로 한도가 적게 나와요", "기존 대출이 많으면 불리해요"],
      best: "기존 대출이 적고 소득이 안정적인 분",
    },
    {
      label: "정책 대출 (디딤돌·버팀목)",
      desc: "DTI 위주 적용, DSR보다 완화된 기준",
      pros: ["DTI 기준이라 한도가 더 나올 수 있어요", "금리가 시중은행보다 낮아요"],
      cons: ["소득·자산 기준이 까다로워요", "대출 금액 한도가 정해져 있어요"],
      best: "소득 기준을 충족하는 무주택 실수요자",
    },
    {
      label: "신용대출·전세대출",
      desc: "DSR만 적용 (DTI 해당 없음)",
      pros: ["DTI는 신경 안 써도 돼요"],
      cons: ["DSR 40%에 기존 대출 원리금이 전부 잡혀요", "마이너스통장 한도도 포함돼요"],
      best: "기존 주담대가 없거나 적은 분",
    },
  ],
};

const FAQS = [
  { q: "DTI는 되는데 DSR이 안 된다는 게 무슨 뜻이에요?", a: "DTI는 기타 대출의 이자만 보는데 DSR은 원리금 전부를 봐요. 신용대출이나 전세대출이 많으면 DTI 기준은 통과하지만 DSR 기준에서 걸릴 수 있어요. 실제로 이런 경우가 굉장히 많아요." },
  { q: "DSR 40%면 연봉 5천만원일 때 얼마까지 빌려요?", a: "기존 대출이 없다면 연간 2천만원, 월 약 167만원까지 원리금 상환이 가능해요. 금리 4%, 30년 만기 기준으로 약 3억 5천만원 정도 나와요. 스트레스 DSR 적용하면 더 줄어요." },
  { q: "전세대출도 DSR에 포함되나요?", a: "포함돼요. 전세대출, 마이너스통장, 자동차 할부까지 빚이란 빚은 전부 DSR 계산에 들어가요. DTI에는 전세대출 이자만 들어가고요." },
  { q: "스트레스 DSR이 뭔가요?", a: "실제 금리가 아니라 더 높은 금리를 가정해서 DSR을 계산하는 방식이에요. 2025년 7월부터 3단계가 시행돼서 수도권 주담대는 스트레스 금리 3.0%가 가산돼요. 대출 한도가 1억원 넘게 줄어들 수 있어요." },
  { q: "마이너스통장 안 쓰고 있는데도 DSR에 잡혀요?", a: "네, 한도만 있으면 DSR 계산에 포함돼요. 대출 한도를 늘리려면 안 쓰는 마이너스통장은 미리 해지하세요." },
  { q: "DTI는 이제 쓸모없는 건가요?", a: "아니에요. 디딤돌대출, 버팀목전세대출 같은 정책 대출에서는 여전히 DTI를 적용해요. 시중은행 대출은 DSR이 기본이지만 정책 대출은 DTI가 유리할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: 가계대출 관리방안", url: "https://www.fsc.go.kr/no010101/79514" },
      { label: "한국은행: 금융안정보고서", url: "https://www.bok.or.kr" },
      { label: "KB의 생각: LTV·DTI·DSR 계산", url: "https://kbthink.com/main/asset-management/wealth-manage-tip/kbthink-original/202408/LTV-DTI-DSR.html" },
    ],
  },
];

const RELATED = [
  { slug: "DSR-DTI-차이-계산방법", title: "DSR DTI 계산 방법과 40% 규제", description: "DSR 계산 예시와 스트레스 DSR 3단계까지 정리했어요." },
  { slug: "DSR-계산-방법", title: "DSR 계산 방법과 한도 예시", description: "연봉별 DSR 40% 최대 대출 한도를 계산해봐요." },
  { slug: "대출-상환-방식-비교", title: "원금균등 vs 원리금균등 비교", description: "상환 방식에 따라 이자 수백만원이 달라져요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 규제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DSR DTI 차이,<br />
        내 대출 한도에 적용되는 기준은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행에서 &quot;DTI는 괜찮은데 DSR이 안 돼서 대출이 안 된다&quot;는 말 들어봤나요?
        둘 다 대출 규제인 건 아는데, 뭐가 다른 건지 헷갈리죠.
        핵심은 계산 범위예요. DTI는 주택담보대출 위주로 보는데, DSR은 신용대출·전세대출·마이너스통장까지 모든 빚의 원리금을 전부 봐요.{" "}
        <a href="https://www.fsc.go.kr/no010101/79514" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회 가계대출 관리방안</a>에 따라
        2026년 현재 시중은행 대출은 DSR 40%가 기본이에요.
      </p>

      <Divider />

      <H2>DSR과 DTI, 계산 방식이 어떻게 달라요?</H2>
      <p style={body}>
        가장 큰 차이는 기타 대출을 어떻게 잡느냐예요.
        DTI는 주택담보대출 원리금에 다른 대출 이자만 더해요. 신용대출이 5천만원이라도 원금은 빼고 이자만 계산에 넣죠.
        DSR은 모든 대출의 원금 + 이자를 전부 합쳐요. 같은 사람이라도 DSR이 훨씬 높게 나오고, 대출 한도가 적게 잡혀요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left" }}>항목</th>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left", color: "#0F6E56" }}>DSR</th>
              <th style={{ padding: "10px 12px", borderBottom: "2px solid #1D9E75", textAlign: "left" }}>DTI</th>
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
        공식으로 보면 차이가 더 선명해요.
        DSR은 (모든 대출 연간 원리금 ÷ 연소득) × 100이고,
        DTI는 (주담대 원리금 + 기타 대출 이자 ÷ 연소득) × 100이에요.
        &quot;이자만&quot;이냐 &quot;원리금 전부&quot;냐, 이 차이 하나가 대출 한도를 수백만원에서 수천만원까지 바꿔요.
      </p>

      <Divider />

      <H2>같은 연봉인데 한도가 왜 달라요?</H2>
      <p style={body}>
        숫자로 보면 바로 이해돼요.
        연봉 6천만원인 A씨가 주택담보대출 3억원(월 143만원 상환)과 신용대출 3천만원(연 4% 금리, 월 50만원 상환)을 가지고 있다고 해볼게요.
      </p>

      <SectionBadge>DTI 계산</SectionBadge>
      <BorderBox>
        주담대 연간 원리금: 143만원 × 12 = 1,716만원{"\n"}
        신용대출 연간 이자: 3,000만원 × 4% = 120만원 (원금 제외){"\n"}
        DTI = (1,716 + 120) ÷ 6,000 × 100 = 30.6%
      </BorderBox>

      <SectionBadge>DSR 계산</SectionBadge>
      <BorderBox>
        주담대 + 신용대출 연간 원리금: (143 + 50) × 12 = 2,316만원{"\n"}
        DSR = 2,316 ÷ 6,000 × 100 = 38.6%
      </BorderBox>

      <p style={body}>
        DTI는 30.6%로 여유 있는데 DSR은 38.6%로 40%에 거의 닿아요.
        여기서 신용대출이 조금만 더 많았으면 DSR 40%를 넘어서 대출이 막혔을 거예요.
        &quot;DTI는 되는데 DSR이 안 된다&quot;는 게 바로 이런 상황이에요.
      </p>

      <Divider />

      <H2>내 상황에는 어떤 기준이 적용돼요?</H2>
      <p style={body}>
        모든 대출에 같은 규제가 적용되는 건 아니에요.
        시중은행 주택담보대출은 DSR과 DTI 둘 다 계산해서 더 낮은 한도를 적용하고,
        신용대출이나 전세대출은 DSR만 봐요.
        정책 대출은 DTI 기준이 적용되는 경우가 많아요.
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
        안 쓰는 마이너스통장이 DSR에 잡히는 경우도 많아요.
        큰 대출 받기 전에 불필요한 한도 대출부터 정리하면{" "}
        <a href="/w/DSR-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>DSR 계산</a>에서 유리해져요.
      </p>

      <Divider />

      <H2>2026년 스트레스 DSR, 한도가 더 줄었어요</H2>
      <p style={body}>
        2025년 7월부터 스트레스 DSR 3단계가 시행됐어요.
        실제 대출 금리에 스트레스 금리를 더한 가상 금리로 DSR을 계산하는 방식이에요.
        나중에 금리가 오르더라도 갚을 수 있는지 미리 따져보겠다는 취지죠.
      </p>

      <GreenBox title="스트레스 DSR 3단계 핵심">
        수도권·규제지역 주담대: 스트레스 금리 +3.0% 적용{"\n"}
        지방 비규제지역 주담대: +1.5% (2026년 6월까지 완화){"\n"}
        신용대출·기타: +1.5% 적용{"\n"}
        {"\n"}
        연소득 1억원 기준, 4% 금리 30년 주담대:{"\n"}
        스트레스 DSR 적용 전 → 약 5억 8,700만원{"\n"}
        스트레스 DSR 적용 후 → 약 4억 7,600만원{"\n"}
        같은 소득인데 1억 1,100만원 차이가 나요
      </GreenBox>

      <p style={body}>
        스트레스 금리 때문에 실제 갚는 금리가 올라가는 건 아니에요.
        대출 한도를 정할 때만 쓰이는 심사용 금리예요.
        그래도 한도가 10~20% 줄어드니까{" "}
        <a href="/w/대출-상환-방식-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>상환 방식 선택</a>이나 기존 대출 정리가 더 중요해졌어요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DSR·DTI 차이에서 실제로 많이 헷갈려하는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 가계대출 관리방안을 바탕으로 작성됐어요. DSR 기준과 스트레스 금리는 변경될 수 있으니 최신 정보는 금융위원회 또는 거래 은행에 문의하세요." />
    </ArticleLayout>
  );
}
