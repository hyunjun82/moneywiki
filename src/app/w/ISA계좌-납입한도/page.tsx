"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. ISA 개설했거나 가입 예정인 사람이 "연간 얼마까지 넣을 수 있어?" 한도 확인하는 상황
// Q2. 연간·누적 한도 파악 → 월 납입 계획 수립 → 비과세 혜택 최대화
// Q3. 연간 2,000만원 / 누적 1억원 / 월 한도 없음(연간 한도만) / 초과 시 입금 거부 / 미사용 한도 이월 없음
// Q4. GreenBox(한도 요약) + GreenBox(월 납입별 비교표) + BorderBox(한도 활용 전략) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "연간 한도를 다 못 채우면 다음 해로 이월되나요?",
    a: "아니에요. ISA 납입 한도는 이월이 안 돼요. 올해 1,000만원만 넣었어도 내년 한도는 다시 2,000만원으로 새로 시작해요. 올해 못 채운 1,000만원은 사라져요.",
  },
  {
    q: "납입 한도는 개인별인가요 가구별인가요?",
    a: "개인별이에요. 부부가 각각 가입하면 각자 연 2,000만원씩, 합산 4,000만원을 넣을 수 있어요. ISA는 1인 1계좌라 1개 금융사에서만 개설 가능해요.",
  },
  {
    q: "한도 초과하면 어떻게 되나요?",
    a: "입금 자체가 거부돼요. 초과 금액은 자동으로 반려되니 걱정할 필요는 없어요. 다만 자동이체를 높게 설정해두면 중간에 거부되는 상황이 생길 수 있어요.",
  },
  {
    q: "서민형/농어촌형 ISA는 한도가 달라요?",
    a: "납입 한도는 동일하게 연 2,000만원, 누적 1억원이에요. 다만 비과세 한도가 달라요. 일반형은 200만원, 서민형·농어촌형은 400만원까지 비과세예요.",
  },
  {
    q: "만기 연장하면 추가 납입을 더 할 수 있나요?",
    a: "만기 연장해도 누적 납입 한도(1억원)는 그대로예요. 이미 1억원을 다 채웠다면 만기 연장해도 추가 납입은 불가해요. 한도 내에서는 만기 후에도 추가 납입이 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: ISA 제도 안내", url: "https://www.fsc.go.kr" },
      { label: "금융감독원: ISA 가입자 안내", url: "https://www.fss.or.kr" },
      { label: "조세특례제한법 제91조의18 (ISA)", url: "https://www.law.go.kr/법령/조세특례제한법" },
    ],
  },
];

const RELATED = [
  { slug: "ISA계좌-세금혜택", title: "ISA 계좌 비과세 혜택과 절세 효과", description: "일반형 200만원, 서민형 400만원 비과세 한도예요." },
  { slug: "ISA계좌-만기", title: "ISA 계좌 만기와 연금 전환 방법", description: "만기 후 연금 전환 시 10% 추가 세액공제를 받아요." },
  { slug: "연말정산-연금저축", title: "연금저축 세액공제 400만원 혜택", description: "ISA와 함께 활용하는 절세 전략이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · ISA · 납입한도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        ISA 계좌 납입 한도<br />
        연간 2,000만원, 미사용 이월 안 돼요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        ISA 납입 한도는 연간 2,000만원, 누적 1억원이에요.
        월별 한도는 따로 없고, 연간 2,000만원만 넘지 않으면 돼요.
        한도 초과하면 입금이 자동으로 거부되고, 남은 한도는 다음 해로 이월되지 않아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>ISA 납입 한도 핵심 정리</H2>
      <p style={body}>
        두 가지 한도가 있어요. 연간 한도는 매년 1월 1일에 리셋되고, 누적 한도는 전체 가입 기간 동안 적용돼요.
      </p>

      <GreenBox>
        <strong>ISA 납입 한도</strong><br />
        연간 한도: 2,000만원 (매년 1월 1일 리셋)<br />
        누적 한도: 1억원 (전체 가입 기간 합산)<br />
        월별 한도: 없음 (연간 2,000만원 내에서 자유롭게)<br />
        <br />
        월 166만원씩 넣으면 연 1,992만원 → 연간 한도 거의 채움<br />
        월 200만원 넣으면 5~6월부터 입금 거부<br />
        <br />
        ★ 미사용 한도는 다음 해로 이월 안 돼요 (당해 연도만 유효)
      </GreenBox>

      <H2>월 납입액별 연간·누적 납입 비교</H2>
      <p style={body}>
        월 납입액을 어떻게 설정하느냐에 따라 연간 납입액과 비과세 효과가 달라져요.
        한도를 채울수록 비과세 혜택이 커져요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>월 납입</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>연간 납입</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>한도 소진율</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>누적 1억 도달</th>
            </tr>
          </thead>
          <tbody>
            {[
              { monthly: "50만원", annual: "600만원", rate: "30%", years: "약 17년" },
              { monthly: "100만원", annual: "1,200만원", rate: "60%", years: "약 8년" },
              { monthly: "150만원", annual: "1,800만원", rate: "90%", years: "약 6년" },
              { monthly: "166만원", annual: "1,992만원", rate: "99.6%", years: "약 5년" },
              { monthly: "200만원", annual: "❌ 초과", rate: "—", years: "—" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 3 ? "rgba(29,158,117,0.06)" : i === 4 ? "rgba(255,0,0,0.03)" : undefined }}>
                <td style={{ padding: "5px 8px", fontWeight: i === 3 ? 700 : 400 }}>{row.monthly}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: i === 4 ? "#E53E3E" : undefined }}>{row.annual}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>한도 활용 전략</H2>
      <p style={body}>
        비과세 혜택을 최대화하려면 한도를 최대한 채우는 게 유리해요.
        하지만 무리해서 넣을 필요는 없고, 여유 자금 범위 내에서 넣는 게 맞아요.
      </p>

      <BorderBox>
        <strong>한도 활용 추천 전략</strong><br />
        기본: 자동이체 150만원/월 설정 → 연 1,800만원 (한도의 90%)<br />
        보너스 활용: 연 1~2회 여유 자금 추가 납입으로 2,000만원 채우기<br />
        목돈 있을 때: 연초에 한 번에 2,000만원 납입 → 비과세 기간 최대화<br />
        <br />
        <strong>한도 확인 방법</strong><br />
        은행·증권사 앱 → ISA 계좌 → 납입 한도 조회<br />
        잔여 한도 = 2,000만원 - 올해 납입액<br />
        <br />
        ★ 한도 90% 도달 시 앱 푸시 알림이 와요<br />
        ★ 부부 각각 가입하면 가구 합산 연 4,000만원까지 넣을 수 있어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 금융위원회 기준으로 작성됐어요. ISA 납입 한도는 상품 유형(일반형·서민형·농어촌형)과 무관하게 동일해요." />
    </ArticleLayout>
  );
}
