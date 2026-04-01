"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 대출 심사에서 DSR 때문에 안 된다고 들었는데 직접 계산해보고 싶은 상황
// Q2. DSR 공식을 이해하고 내 연봉 기준 최대 대출 가능액을 직접 계산하는 것
// Q3. DSR 공식, 포함되는 대출 범위, 40%/50% 규제, 연봉별 최대 한도, 스트레스DSR 가산, 한도 늘리는 방법
// Q4. 계산 공식(GreenBox) + 연봉별 한도표(BorderBox) + 한도 늘리기(Steps) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const LIMIT_TABLE = [
  { income: "3,000만원", annual: "1,200만원", monthly: "100만원", limit30y: "약 2억 1천만원" },
  { income: "5,000만원", annual: "2,000만원", monthly: "167만원", limit30y: "약 3억 5천만원" },
  { income: "7,000만원", annual: "2,800만원", monthly: "233만원", limit30y: "약 4억 9천만원" },
  { income: "1억원", annual: "4,000만원", monthly: "333만원", limit30y: "약 7억원" },
  { income: "1억 5천만원", annual: "6,000만원", monthly: "500만원", limit30y: "약 10억 5천만원" },
];

const STEPS_DATA = [
  { title: "기존 대출부터 정리하세요", desc: "금리 높은 신용대출이나 마이너스통장부터 상환하면 월 상환액이 줄어요. 안 쓰는 마이너스통장도 한도가 DSR에 잡히니까 해지하세요.", tip: "카드론, 자동차 할부도 전부 DSR에 포함돼요" },
  { title: "대출 기간을 늘리세요", desc: "30년 만기를 40년으로 늘리면 월 상환액이 줄어서 DSR이 낮아져요. 총 이자는 늘어나지만 당장 대출 한도를 높이는 데 효과적이에요." },
  { title: "배우자 소득을 합산하세요", desc: "공동명의로 대출받으면 두 사람 소득을 합쳐서 DSR을 계산해요. 맞벌이라면 개인보다 훨씬 유리해요." },
  { title: "정책 대출을 확인하세요", desc: "디딤돌대출, 버팀목대출은 DSR 대신 DTI를 적용하거나 기준이 완화돼요. 소득 기준만 맞으면 시중은행보다 한도가 더 나올 수 있어요.", tip: "주택도시기금 홈페이지에서 자격 확인 가능" },
];

const FAQS = [
  { q: "DSR 40%면 연봉 5천만원일 때 최대 얼마예요?", a: "기존 대출이 전혀 없다면 연간 2천만원까지 원리금 상환이 가능해요. 금리 4%, 30년 만기 주담대 기준으로 약 3억 5천만원이에요. 스트레스 DSR을 적용하면 2억 8천만원 정도로 줄어요." },
  { q: "DSR에 전세대출도 포함돼요?", a: "포함돼요. 주담대, 신용대출, 전세대출, 마이너스통장, 자동차 할부, 학자금대출까지 빚이란 빚은 원리금 전부 합산돼요." },
  { q: "1억원 이하 소액 대출은 DSR이 다르다던데요?", a: "은행 대출 총액이 1억원 이하면 DSR 70%까지 가능해요. 초과하면 40% 기준이 적용돼요. 비은행권은 50%예요." },
  { q: "스트레스 DSR이 뭐예요?", a: "실제 금리에 스트레스 금리(수도권 주담대 +3.0%, 기타 +1.5%)를 더한 가상 금리로 DSR을 계산하는 거예요. 금리 인상 상황을 미리 반영하는 방식이라 한도가 10~20% 줄어요." },
  { q: "DSR 계산기는 어디서 써요?", a: "토스뱅크, 카카오뱅크 앱에서 대출 한도 조회하면 자동으로 DSR이 계산돼요. 토스피드 DSR 계산기, 핀다 DSR 계산기도 무료로 쓸 수 있어요." },
  { q: "부부 공동명의면 DSR이 반으로 줄어요?", a: "반으로 줄어드는 건 아니에요. 두 사람 소득을 합친 금액이 분모가 되니까 DSR 비율이 낮아지는 거예요. 대출 상환액은 그대로고 소득이 늘어나는 효과예요." },
  { q: "자영업자는 연소득을 어떻게 잡아요?", a: "종합소득금액 증명원 기준이에요. 세전 매출이 아니라 비용을 빼고 남은 소득 금액으로 계산해요. 비용 처리를 많이 했으면 소득이 적게 잡혀서 불리할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: 가계대출 관리방안", url: "https://www.fsc.go.kr/no010101/79514" },
      { label: "한국은행: 금융안정보고서", url: "https://www.bok.or.kr" },
      { label: "토스피드: DSR 계산기", url: "https://toss.im/tossfeed/calculator/dsr" },
    ],
  },
];

const RELATED = [
  { slug: "DSR-DTI-차이", title: "DSR DTI 차이와 적용 기준", description: "DSR과 DTI의 계산 범위 차이를 비교했어요." },
  { slug: "대출-상환-방식-비교", title: "원금균등 vs 원리금균등 비교", description: "상환 방식에 따라 이자와 DSR이 달라져요." },
  { slug: "대출과-신용점수의-관계", title: "대출과 신용점수의 관계", description: "대출 실행하면 신용점수가 얼마나 떨어지는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 규제 · DSR</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DSR 계산 방법,<br />
        내 연봉으로 얼마까지 빌릴 수 있을까?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출 알아보다가 &quot;DSR 때문에 안 된다&quot;는 말 들어보셨죠?
        DSR은 내 소득에서 대출 갚는 데 쓰는 돈이 몇 퍼센트인지 보는 비율이에요.
        계산 자체는 어렵지 않아요. 공식 하나만 알면 내가 추가로 얼마까지 빌릴 수 있는지 바로 감이 와요.{" "}
        <a href="https://www.fsc.go.kr/no010101/79514" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회 기준</a>으로
        2026년 현재 은행은 DSR 40%, 비은행은 50%를 적용하고 있어요.
      </p>

      <Divider />

      <H2>DSR 공식, 이렇게 계산해요</H2>
      <p style={body}>
        DSR(총부채원리금상환비율)은 연소득 대비 1년간 갚아야 할 모든 대출 원리금의 비율이에요.
        주택담보대출만 보는 게 아니라 신용대출, 전세대출, 마이너스통장, 자동차 할부, 학자금대출까지 전부 합쳐요.
      </p>

      <GreenBox title="DSR 계산 공식">
        DSR(%) = (모든 대출의 연간 원리금 상환액 ÷ 연소득) × 100{"\n"}
        {"\n"}
        은행(1금융권): DSR 40% 이하{"\n"}
        비은행(저축은행·캐피탈): DSR 50% 이하{"\n"}
        소액(총 대출 1억 이하): DSR 70% 이하
      </GreenBox>

      <p style={body}>
        연소득은 세전 총급여 기준이에요. 근로소득자는 연봉, 자영업자는 종합소득금액을 봐요.
        상여금이나 성과급도 포함돼요. 연간 원리금은 매달 갚는 금액 × 12개월이에요.
      </p>

      <Divider />

      <H2>연봉별 최대 대출 한도는 얼마예요?</H2>
      <p style={body}>
        기존 대출이 전혀 없고, DSR 40%를 꽉 채운다고 가정하면 연봉별로 이 정도 나와요.
        금리 4%, 30년 만기 원리금균등 주택담보대출 기준이에요.
      </p>

      <SectionBadge>연봉별 DSR 40% 최대 한도 (기존 대출 없음, 금리 4%, 30년)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연소득</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연간 상환 가능액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 상환액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 대출 한도</th>
            </tr>
          </thead>
          <tbody>
            {LIMIT_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.income}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.annual}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.monthly}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 700 }}>{row.limit30y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        실제로는 스트레스 DSR이 적용되니까 위 금액보다 10~20% 적게 나와요.
        수도권 주담대는 스트레스 금리 +3.0%가 가산돼서 한도 차이가 더 커요.
      </p>

      <Divider />

      <H2>실제 계산 예시로 확인해볼게요</H2>
      <p style={body}>
        연봉 6천만원인 A씨가 주택담보대출 3억원을 30년 만기, 연 4% 금리로 받으려고 해요.
        기존에 신용대출 3천만원(월 50만원 상환)이 있어요.
      </p>

      <BorderBox>
        주담대 월 상환액: 약 143만원{"\n"}
        기존 신용대출 월 상환액: 50만원{"\n"}
        연간 원리금 합계: (143 + 50) × 12 = 2,316만원{"\n"}
        DSR = 2,316 ÷ 6,000 × 100 = 38.6%{"\n"}
        → 40% 이하라서 대출 가능
      </BorderBox>

      <p style={body}>
        만약 A씨에게 마이너스통장 2천만원(한도)이 더 있다면 어떨까요?
        마이너스통장도 DSR에 잡혀요. 한도 기준으로 월 상환액이 추가돼서 DSR이 40%를 넘을 수 있어요.
        이런 경우 마이너스통장을 해지하면 바로 해결돼요.
      </p>

      <BorderBox>
        스트레스 DSR 적용 시 (수도권 주담대, +3.0%){"\n"}
        실제 금리 4% → 심사 금리 7%로 계산{"\n"}
        주담대 월 상환액이 143만원 → 약 200만원으로 증가{"\n"}
        DSR = (200 + 50) × 12 ÷ 6,000 × 100 = 50%{"\n"}
        → 40% 초과로 대출 불가, 금액을 줄여야 해요
      </BorderBox>

      <Divider />

      <H2>DSR이 40%를 넘으면 어떻게 해요?</H2>
      <p style={body}>
        DSR 때문에 대출이 막혔다면 포기하기 전에 방법이 몇 가지 있어요.
        핵심은 분자(상환액)를 줄이거나 분모(소득)를 늘리는 거예요.
      </p>

      <Steps steps={STEPS_DATA} />

      <p style={body}>
        이 방법들을 조합하면 한도가 꽤 달라져요.
        예를 들어 기존 신용대출 3천만원을 먼저 갚고 대출 기간을 40년으로 늘리면,
        같은 연봉에서 주담대 한도가 1억원 넘게 늘어날 수 있어요.{" "}
        <a href="/w/DSR-DTI-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>DSR과 DTI의 차이</a>를 알아두면 정책 대출 활용 전략도 세울 수 있어요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DSR 계산과 대출 한도에서 실제로 많이 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 가계대출 관리방안을 바탕으로 작성됐어요. 대출 금리와 DSR 기준은 수시로 바뀔 수 있으니 정확한 한도는 거래 은행에 직접 문의하세요." />
    </ArticleLayout>
  );
}
