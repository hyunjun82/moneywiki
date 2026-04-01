"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 예금 이자나 주식 배당을 받고 통장에 생각보다 적게 찍혀서 세금 구조를 궁금해하는 투자자
// Q2. 내 금융소득이 종합과세 대상인지 판단하고, 추가 납부 세금을 대비한다
// Q3. 원천징수 세율 15.4%, 연 2,000만원 초과 시 종합과세 기준, 2026년 배당소득 분리과세 선택제
// Q4. 세율 비교표 + GreenBox(계산 공식) + BorderBox(종합과세 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "연간 금융소득 합계 계산 / 이자+배당 모두 포함",
  "2,000만원 초과 여부 확인 / 초과 시 5월 종합소득세 신고 필요",
  "배우자 금융소득은 합산 안 됨 / 각자 따로 계산",
  "2026년 배당소득 분리과세 선택 가능 여부 확인",
  "원천징수 안 된 금융소득은 소액이어도 종합과세 대상",
];

const FAQS = [
  {
    q: "금융소득 15.4%는 어디서 빠져나가는 건가요?",
    a: "은행이나 증권사가 이자·배당을 지급할 때 자동으로 떼요. 소득세 14% + 지방소득세 1.4%를 합친 15.4%예요. 통장에 찍히는 금액이 이미 세금이 빠진 뒤 금액이에요. 세금을 직접 납부할 필요가 없고, 연 2,000만원 이하면 여기서 납세가 완결돼요.",
  },
  {
    q: "금융소득이 2,000만원을 넘으면 세금을 더 내야 하나요?",
    a: "네, 초과분에 대해 추가 세금이 붙을 수 있어요. 2,000만원 초과분은 다른 종합소득(근로·사업소득 등)과 합산해서 6.6~49.5% 누진세율이 적용돼요. 이미 원천징수로 낸 세금은 공제되니까 차액만 추가 납부해요. 매년 5월 종합소득세 신고를 해야 해요.",
  },
  {
    q: "2026년에 배당소득 분리과세가 생겼다는데 어떤 거예요?",
    a: "종합과세 대신 분리과세를 선택하면 최대 33% 세율로 납세를 완결할 수 있어요. 과세표준 2,000만원 이하는 15.4%, 2,000만원~3억원은 22%, 3억원~50억원은 27.5%, 50억원 초과는 33%예요. 근로소득이 높아서 종합과세 시 49.5%가 적용될 수 있는 고배당 투자자에게 유리해요.",
  },
  {
    q: "주식 배당금도 금융소득에 포함되나요?",
    a: "네, 국내 주식 배당금은 금융소득(배당소득)에 포함돼요. 배당금 받을 때 15.4%를 원천징수하고 나머지를 지급해요. 주식 매매 차익(양도소득)은 별도로 분류과세되기 때문에 금융소득 2,000만원 기준에 포함되지 않아요.",
  },
  {
    q: "배우자와 금융소득을 합산해서 계산하나요?",
    a: "아니에요. 금융소득 2,000만원 기준은 개인 단위로 계산해요. 배우자의 이자·배당 수입은 본인 금융소득에 포함되지 않아요. 금융소득이 많다면 부부 간 금융자산 분산을 통해 각자 2,000만원 이하로 맞추는 절세 전략을 쓰기도 해요.",
  },
  {
    q: "ISA 계좌나 비과세 상품 이자도 2,000만원에 포함되나요?",
    a: "ISA(개인종합자산관리계좌) 내 수익은 비과세 한도 내에서 제외돼요. 비과세 종합저축(65세 이상, 장애인 등) 이자도 제외예요. 비과세 혜택이 있는 상품의 이자는 원천징수도 안 하고 종합과세 합산에도 포함되지 않아요.",
  },
];

const SOURCES = [
  { name: "국세청 금융소득 종합과세", href: "https://www.nts.go.kr" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "배당소득세", title: "배당소득세 계산 방법", description: "주식 배당금 세금 구조와 종합과세 판단법." },
  { slug: "금융소득-원천징수-이자-배당", title: "금융소득 원천징수 이자·배당", description: "15.4% 원천징수와 종합과세 기준 정리." },
  { slug: "종합소득세-신고", title: "종합소득세 신고 방법", description: "5월 종합소득세 신고 대상과 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융소득 · 원천징수 · 이자·배당세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이자·배당 왜 15.4% 떼가나요?<br />
        금융소득 원천징수와 종합과세 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "예금 이자를 받았는데 통장에 생각보다 적게 찍혔어요."
      </p>
      <p style={body}>
        이자나 배당을 받을 때 은행과 증권사가 자동으로 <strong>15.4%</strong>를 떼는 거예요.
        연간 금융소득이 <strong>2,000만원 이하</strong>면 이걸로 납세가 끝나요.
        하지만 2,000만원을 넘으면 5월에 <a href="/w/종합소득세-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>종합소득세 신고</a>를 따로 해야 하고 세금이 더 붙을 수 있어요.
        내 금융소득이 어디에 해당하는지 아래에서 바로 확인해봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 세율 - 바로 답 */}
      <H2>금융소득 원천징수 세율은 얼마예요?</H2>
      <p style={body}>
        이자소득과 배당소득 모두 <strong>15.4%</strong>를 원천징수해요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제127조</a>에 따른 소득세 14%와 지방소득세 1.4%를 합친 세율이에요.
        금융회사가 지급 시 자동으로 공제하기 때문에 별도 신고나 납부 절차가 없어요.
      </p>

      <GreenBox>
        원천징수 세액 계산{"\n"}
        금융소득 × 15.4% = 원천징수 세액{"\n"}
        금융소득 - 원천징수 세액 = 실수령액{"\n"}
        {"\n"}
        예: 이자 100만원 → 15만 4천원 세금 → 84만 6천원 수령
      </GreenBox>

      <SectionBadge>금융소득 세율 구조</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>원천징수 세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["이자소득", "15.4%", "예금 이자, 적금 이자, 채권 이자"],
              ["배당소득", "15.4%", "주식 배당금, 펀드 수익분배금"],
            ].map(([type, rate, examples], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 종합과세 기준 */}
      <H2>2,000만원 넘으면 세금이 더 붙어요</H2>
      <p style={body}>
        연간 금융소득(이자+배당 합계)이 <strong>2,000만원을 초과하면 종합과세</strong> 대상이에요.
        이 경우 초과분을 다른 소득(근로소득, 사업소득 등)과 합산해서 6.6%~49.5% 누진세율로 다시 계산해요.
        이미 원천징수로 낸 15.4%는 공제되니까 차액만 5월 종합소득세 신고 때 추가 납부하면 돼요.
      </p>

      <BorderBox>
        <strong>종합과세 기준</strong>{"\n"}
        · 연간 금융소득 합계 2,000만원 이하 → 원천징수(15.4%)로 완결{"\n"}
        · 연간 금융소득 합계 2,000만원 초과 → 5월 종합소득세 신고 필요{"\n"}
        · 원천징수 안 된 금융소득은 2,000만원 이하여도 종합과세{"\n"}
        · 배우자 금융소득은 합산하지 않음 (개인별 계산)
      </BorderBox>

      <p style={body}>
        2026년부터는 <strong>배당소득 분리과세</strong> 선택제가 생겼어요.
        종합과세 대신 분리과세를 선택하면 과세표준에 따라 최대 33%로 납세가 완결돼요.
        근로소득이 높아서 종합과세 적용 시 40% 이상이 될 것 같다면 분리과세가 유리할 수 있어요.
      </p>

      <Divider />

      {/* H2-3: 2026년 배당소득 분리과세 */}
      <H2>2026년 새로 생긴 배당소득 분리과세예요</H2>
      <p style={body}>
        고배당 투자자는 종합과세로 최고 49.5%까지 세금을 낼 수 있어요.
        2026년부터 배당소득에 한해 분리과세를 선택하면 세 부담을 낮출 수 있게 됐어요.
      </p>

      <SectionBadge>2026년 배당소득 분리과세 세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>배당소득 과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>분리과세 세율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2,000만원 이하", "15.4% (현행 유지)"],
              ["2,000만원 초과 ~ 3억원 이하", "22%"],
              ["3억원 초과 ~ 50억원 이하", "27.5%"],
              ["50억원 초과", "33%"],
            ].map(([range, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        분리과세 선택은 종합소득세 신고 시 적용해요.
        이자소득은 분리과세 대상이 아니고 배당소득에만 적용되기 때문에 주의해야 해요.
        세금이 복잡하게 얽혀 있다면 세무사 상담을 통해 유불리를 따져보는 게 좋아요.
      </p>

      <Divider />

      {/* H2-4: 체크리스트 */}
      <H2>내 금융소득이 종합과세 대상인지 점검해봐요</H2>
      <p style={body}>
        연말이 다가오면 금융소득 합계를 미리 계산해보는 게 좋아요.
        예상치 못한 세금을 5월에 한꺼번에 내는 상황을 막을 수 있고요.
        아래 항목으로 내 상황을 점검해봐요.
      </p>

      <SectionBadge>종합과세 점검 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        금융소득 원천징수에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 소득세법 기준으로 작성했어요. 분리과세 선택 요건과 세율은 법 개정에 따라 달라질 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
