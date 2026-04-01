"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 체크카드가 신용카드보다 공제율이 높다는데 실제로 얼마나 차이나는지, 어떻게 써야 유리한지 궁금한 직장인
// Q2. 총급여 25% 기준으로 신용카드→체크카드 전환 시점을 파악하고 공제 최대화 전략을 실행한다
// Q3. 체크카드 30% vs 신용카드 15%, 25% 문턱, 전통시장·대중교통 40%, 한도 300만원
// Q4. GreenBox(공제율 비교) + BorderBox(계산 예시) + Checklist(전략 체크리스트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "총급여의 25% 금액 계산하기 (연봉 5,000만원이면 1,250만원)",
  "25%까지는 혜택 좋은 신용카드로 사용",
  "25% 초과분부터 체크카드·현금영수증으로 전환",
  "전통시장·대중교통은 카드 종류 상관없이 40% 공제",
  "공제 한도 확인: 7,000만원 이하 300만원, 1.2억 초과 200만원",
  "맞벌이면 총급여 낮은 쪽에 카드 사용 몰아주기",
];

const FAQS = [
  {
    q: "체크카드만 쓰면 더 유리한 거 아닌가요?",
    a: "아니에요. 총급여 25%까지는 어차피 공제가 안 돼요. 이 구간에서는 포인트·할인 혜택이 좋은 신용카드를 쓰는 게 이득이에요. 25%를 넘긴 이후부터 체크카드로 바꿔야 공제율 30%의 효과를 볼 수 있어요.",
  },
  {
    q: "현금영수증도 체크카드와 같은 공제율인가요?",
    a: "네. 현금영수증 공제율도 30%로 체크카드와 동일해요. 체크카드 쓰기 불편한 곳에서는 현금 + 현금영수증으로 처리하면 같은 효과예요.",
  },
  {
    q: "전통시장·대중교통은 어떤 카드로 써도 40%인가요?",
    a: "네. 전통시장과 대중교통은 신용카드든 체크카드든 40% 공제율이 적용돼요. 그리고 기본 한도 300만원과 별개로 추가 한도가 있어서 더 유리해요.",
  },
  {
    q: "공제 한도 300만원이면 실제 환급은 얼마예요?",
    a: "소득공제라서 내 세율에 따라 달라져요. 세율 15%면 300만 × 15% = 45만원, 세율 24%면 72만원이에요. 세율이 높을수록 환급이 커져요.",
  },
  {
    q: "맞벌이 부부는 카드를 어떻게 쓰는 게 좋아요?",
    a: "총급여가 낮은 쪽의 카드로 몰아서 쓰는 게 유리해요. 25% 문턱이 낮아지니까 초과분이 빨리 생기거든요. 연봉 3,000만원이면 750만원만 넘기면 되지만, 7,000만원이면 1,750만원을 넘겨야 해요.",
  },
  {
    q: "연봉이 1.2억 넘으면 카드 공제가 줄어드나요?",
    a: "한도가 줄어요. 7,000만원 이하는 300만원, 7,000~1.2억은 250만원, 1.2억 초과는 200만원 한도예요. 고소득자일수록 카드 공제 효과가 작아지는 구조예요.",
  },
];

const SOURCES = [
  { name: "국세청 신용카드 소득공제", href: "https://www.nts.go.kr" },
  { name: "소득세법 제126조의2", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 소득공제 한도와 계산법", description: "결제 수단별 공제율과 한도 구조." },
  { slug: "연말정산-전통시장-공제", title: "전통시장 공제 40%의 비밀", description: "전통시장 사용액 추가 공제 한도." },
  { slug: "연말정산", title: "연말정산 가이드", description: "소득공제와 세액공제 전체 구조 이해하기." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 체크카드 · 소득공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체크카드 공제율이 2배라는데, 진짜 유리할까?<br />
        신용카드 전환 시점과 공제 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "체크카드가 공제율이 높으니까 체크카드만 써야 한다"는 말, 반만 맞아요.
      </p>
      <p style={body}>
        체크카드 공제율은 <strong>30%</strong>로 신용카드(15%)의 2배예요. 하지만 총급여의 <strong>25%</strong>까지는 어떤 카드로 써도 공제가 안 돼요.
        이 구간에서는 신용카드 혜택을 챙기고, 25%를 넘긴 뒤부터 체크카드로 전환하는 게 최적 전략이에요.
        실제 환급이 얼마나 되는지 계산해 볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>결제 수단별 공제율, 이렇게 달라요</H2>
      <p style={body}>
        같은 금액을 써도 어떤 결제 수단을 쓰느냐에 따라 공제받는 금액이 달라져요. 체크카드가 신용카드보다 2배 유리하고, 전통시장·대중교통은 더 높아요.
      </p>

      <SectionBadge>결제 수단별 공제율 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>결제 수단</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신용카드", "15%", "기본 공제율"],
              ["체크카드", "30%", "신용카드의 2배"],
              ["현금영수증", "30%", "체크카드와 동일"],
              ["전통시장", "40%", "카드 종류 무관, 추가 한도"],
              ["대중교통", "40%", "카드 종류 무관, 추가 한도"],
            ].map(([method, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{method}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        공제 한도 (총급여별){"\n"}
        · 7,000만원 이하: 300만원{"\n"}
        · 7,000만~1.2억원: 250만원{"\n"}
        · 1.2억원 초과: 200만원{"\n"}
        + 전통시장·대중교통·도서공연 추가 한도 각 100만원
      </GreenBox>

      <p style={body}>
        기본 한도 외에 전통시장, 대중교통, 도서·공연 사용액은 별도 한도가 있어서 더 많이 공제받을 수 있어요.
        실제 금액으로 비교해 볼게요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>체크카드 전환 효과, 숫자로 비교해 봐요</H2>
      <p style={body}>
        같은 금액을 신용카드만 쓸 때 vs 25% 넘긴 뒤 체크카드로 바꿨을 때 공제 차이가 얼마나 나는지 볼게요.
      </p>

      <SectionBadge>시나리오 비교</SectionBadge>
      <BorderBox>
        <strong>총급여 5,000만원 기준</strong>{"\n"}
        최저사용액: 5,000만 × 25% = 1,250만원{"\n\n"}
        <strong>시나리오 A: 신용카드만 2,000만원 사용</strong>{"\n"}
        · 초과분 750만원 × 15% = 112.5만원 공제{"\n"}
        · 세율 15% 적용 → 실제 환급 약 <strong>16.9만원</strong>{"\n\n"}
        <strong>시나리오 B: 신용카드 1,250만원 + 체크카드 750만원</strong>{"\n"}
        · 초과분 750만원 × 30% = 225만원 공제{"\n"}
        · 세율 15% 적용 → 실제 환급 약 <strong>33.8만원</strong>{"\n\n"}
        차이: <strong>약 16.9만원</strong> 더 환급
      </BorderBox>

      <p style={body}>
        같은 2,000만원을 써도 전환 전략 하나로 환급이 2배 차이 나요.
        세율이 24%면 차이가 27만원까지 벌어지고요.
        이제 구체적인 전략을 정리해 볼게요.
      </p>

      <Divider />

      <H2>최적 카드 전략, 이렇게 실행하세요</H2>
      <p style={body}>
        전환 시점이 핵심이에요. 25%를 넘기기 전에 체크카드를 쓰면 신용카드 혜택만 놓치는 거예요.
        아래 체크리스트로 내 상황을 점검해 보세요.
      </p>

      <SectionBadge>카드 전략 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox>
        <strong>월별 전략 예시 (총급여 5,000만원)</strong>{"\n"}
        · 1~8월: 신용카드 (월 156만원 × 8개월 = 1,250만원으로 25% 충족){"\n"}
        · 9~12월: 체크카드·현금영수증으로 전환{"\n"}
        · 전통시장·대중교통은 연중 사용 (40% 우대)
      </BorderBox>

      <p style={body}>
        내 총급여에 맞춰서 전환 시점을 미리 정해두면 연말에 허둥대지 않아요.
        <a href="/w/연말정산-신용카드-공제-한도" style={{ color: "#1D9E75", textDecoration: "underline" }}>신용카드 소득공제</a> 전체 구조가 궁금하다면 별도 글에서 정리했어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        체크카드 공제에서 실제로 많이 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 공제율과 한도는 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
