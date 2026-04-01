"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연말정산을 앞두고 연금저축·IRP를 얼마나 넣어야 세금을 최대로 돌려받는지 계산하려는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내 총급여에 맞는 납입 금액을 결정하고 연금저축·IRP 조합을 설정한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     연금저축 600만 + IRP 300만 한도 구조, 총급여별 공제율 차이, ISA 전환 추가 혜택, 중도인출 페널티
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox로 핵심 수치 + DocTable로 총급여별 환급액 비교 + FAQ로 의사결정 지원

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REFUND_TABLE = {
  headers: ["총급여", "공제율", "300만원 납입 시", "600만원 납입 시", "900만원 납입 시"],
  rows: [
    ["5,500만원 이하", "16.5%", "49만 5천원", "99만원", "148만 5천원"],
    ["5,500만원 초과", "13.2%", "39만 6천원", "79만 2천원", "118만 8천원"],
  ],
};

const FAQS = [
  {
    q: "연금저축과 IRP 중 하나만 가입해도 되나요?",
    a: "하나만으로도 세액공제를 받을 수 있어요. 연금저축만 있으면 최대 600만원, IRP만 있으면 최대 900만원까지 공제돼요. 단, 연금저축+IRP 조합이 투자 유연성(연금저축 ETF 직접투자)과 한도 활용 측면에서 유리한 경우가 많아요.",
  },
  {
    q: "연금저축 900만원 넣으면 한도 900만원이 다 공제되나요?",
    a: "아니에요. 연금저축은 600만원까지만 공제돼요. 900만원 전부 공제받으려면 연금저축 600만원 + IRP 300만원 조합이 필요해요. 연금저축만 900만원 넣으면 300만원은 공제 안 돼요.",
  },
  {
    q: "ISA 만기 자금을 연금계좌로 옮기면 얼마를 더 공제받나요?",
    a: "전환액의 10%를 추가 공제받아요. 최대 300만원까지예요. 3,000만원 이상 옮기면 300만원 추가 공제가 생기고, 총급여 5,500만원 이하면 49만 5천원이 더 환급돼요. 기본 148만 5천원 + ISA 전환 49만 5천원 = 198만원 환급도 가능해요.",
  },
  {
    q: "55세 이전에 연금저축을 해지하거나 인출하면 어떻게 되나요?",
    a: "기타소득세 16.5%가 붙어요. 연금 수령 시 3.3~5.5%인 것과 비교하면 3배 이상이에요. 해지 말고 '부분 인출'을 활용하거나, 담보대출로 돈을 마련하는 게 나을 수 있어요.",
  },
  {
    q: "연금저축펀드와 연금저축보험 중 어떤 게 나은가요?",
    a: "세액공제 효과는 동일해요. 차이는 투자 방식이에요. 연금저축펀드는 ETF·펀드에 직접 투자 가능해서 수익률 관리가 유연하고, 연금저축보험은 원금이 보장되는 대신 수익률이 낮아요.",
  },
  {
    q: "IRP는 누구나 가입할 수 있나요?",
    a: "근로소득이나 사업소득이 있어야 가입할 수 있어요. 전업주부나 소득이 없는 분은 IRP 가입이 안 돼요. 연금저축은 소득 관계없이 누구나 가입 가능해요.",
  },
];

const SOURCES = [
  { name: "국세청 연금저축 세액공제", href: "https://www.nts.go.kr" },
  { name: "조세특례제한법 제86조의4", href: "https://www.law.go.kr/법령/조세특례제한법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "IRP계좌-가입-세액공제", title: "IRP 계좌 세액공제 방법", description: "IRP 단독 납입 한도와 퇴직금 연계 전략." },
  { slug: "연말정산", title: "연말정산 공제 항목 정리", description: "근로소득공제부터 세액공제까지 한눈에." },
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 소득세 감면 이직 후 처리법", description: "이직해도 남은 감면 기간 이어받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연금저축 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금저축펀드 세액공제 한도<br />
        IRP 조합으로 최대 148만원 환급받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "연금저축 얼마 넣어야 세금 제일 많이 돌려받아요?" 연말정산 준비할 때 가장 많이 묻는 질문이에요.
      </p>
      <p style={body}>
        핵심은 연금저축 600만원 + IRP 300만원 조합이에요. 총급여 5,500만원 이하면 연 148만 5천원, 초과하면 118만 8천원이 환급돼요. 연금저축만 900만원 넣으면 안 되고, IRP랑 나눠서 넣어야 한도 900만원을{" "}
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제86조의4</a>에 따라 전부 공제받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 한도 구조 */}
      <H2>연금저축 + IRP 세액공제 한도 구조</H2>
      <p style={body}>
        연금저축과 IRP는 각각 한도가 따로 있어요. 둘을 합쳐서 최대 900만원까지 공제받을 수 있는데, 연금저축은 600만원이 상한이에요.
      </p>

      <GreenBox>
        연금저축 단독: 최대 600만원{"\n"}
        IRP 단독: 최대 900만원{"\n"}
        연금저축 + IRP 합산: 최대 900만원{"\n"}
        (연금저축 600만 + IRP 300만 = 900만원 최적 조합)
      </GreenBox>

      <p style={body}>
        연금저축만 900만원 납입하면 600만원 초과분 300만원은 공제가 안 돼요. IRP를 함께 활용하면 300만원 추가 공제를 채울 수 있어요. 반대로 IRP만 있으면 900만원까지 단독으로 공제받을 수 있지만, ETF 직접 투자 등 연금저축의 투자 유연성을 포기하게 돼요.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 총급여별 환급액 */}
      <H2>내 연봉에서 실제로 얼마 돌아오나요?</H2>
      <p style={body}>
        총급여 5,500만원을 기준으로 공제율이 달라요. 아래 표에서 내 납입 금액에 따른 환급액을 바로 확인해보세요.
      </p>

      <SectionBadge>총급여별 환급액 (2026년 기준)</SectionBadge>
      <DocTable headers={REFUND_TABLE.headers} rows={REFUND_TABLE.rows} />

      <p style={body}>
        월 75만원씩(연 900만원) 저축하면 총급여 5,500만원 이하 기준으로 148만 5천원이 돌아와요. 실제 부담은 월 87만 5천원에서 세금 환급 12만 4천원을 빼면 월 약 63만원이에요.
      </p>

      <Divider />

      {/* H2-3: ISA 전환 추가 혜택 */}
      <H2>ISA 만기 자금 연금계좌로 옮기면 더 받아요</H2>
      <p style={body}>
        만기 도래한 ISA 자금을 연금저축이나 IRP로 옮기면 기본 한도 900만원 위에 추가 세액공제가 붙어요. 전환액의 10%, 최대 300만원까지예요.
      </p>

      <BorderBox>
        <strong>ISA → 연금계좌 전환 추가 세액공제</strong><br />
        전환액의 10% 추가 공제 (최대 300만원)<br />
        3,000만원 전환 시: 300만원 추가 공제<br />
        총급여 5,500만원 이하: 49만 5천원 추가 환급<br />
        기본 148만 5천원 + ISA 전환 49만 5천원 = 최대 198만원 환급 가능
      </BorderBox>

      <Divider />

      {/* H2-4: 중도인출 주의 */}
      <H2>55세 전에 빼면 세금이 3배가 돼요</H2>
      <p style={body}>
        연금저축은 장기 저축 상품이에요. 55세 이후 연금으로 받으면 연금소득세 3.3~5.5%만 내면 되지만, 그 전에 인출하면 기타소득세 16.5%가 붙어요.
      </p>

      <GreenBox>
        연금 수령 (55세 이후): 연금소득세 3.3~5.5%{"\n"}
        중도 인출 (55세 이전): 기타소득세 16.5%{"\n"}
        납입 기간 10년 이상 + 55세 이후 → 가장 낮은 세율 적용
      </GreenBox>

      <p style={body}>
        비상금이 필요하다면 연금저축에 손대지 말고 <a href="/w/CMA계좌-금리-혜택" style={{ color: "#1D9E75", textDecoration: "underline" }}>CMA 계좌</a>에 따로 마련해두는 게 안전해요. 천재지변·질병·파산 등 특별 사유면 세금이 경감되니 이런 상황에선 금융사에 먼저 문의해보세요.
      </p>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>연금저축 세액공제, 이런 상황은 어떻게 되나요?</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        의사결정에 도움이 되는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 조세특례제한법과 국세청 안내를 바탕으로 작성했어요. 공제율·한도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 체크해보세요." />
    </ArticleLayout>
  );
}
