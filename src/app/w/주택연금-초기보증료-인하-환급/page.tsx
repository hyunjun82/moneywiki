"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 주택연금 가입을 앞두고 초기보증료가 부담되는데, 2026년 인하 소식을 듣고 정확히 얼마나 줄었는지·환급 규정이 뭔지 확인하려는 상황
// Q2. 변경된 초기보증료(1.0%)와 환급 기간(5년)을 파악하고, 내 주택 가격 기준으로 절감액을 계산한다
// Q3. 보증료 1.5%→1.0%, 4억 기준 200만원 절감, 연 보증료 0.75%→0.95%, 환급 기간 3년→5년, 2026.3.1 이후 신규만 적용
// Q4. GreenBox(변경 전후 비교) + BorderBox(환급 규정) + Checklist(가입 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "만 55세 이상 + 부부 모두 동의했는지 / 가입 기본 조건",
  "주택 공시가격 12억원 이하인지 / 초과 시 가입 불가",
  "2026년 3월 1일 이후 신청하는 건지 / 그 전은 기존 1.5% 적용",
  "초기보증료 납부 여력 확인 / 4억 기준 400만원",
  "연 보증료 0.95% 반영한 수령액 계산했는지 / 기존 0.75%보다 소폭 인상",
  "해지 가능성이 있다면 5년 이내 환급 규정 확인 / 기간 짧을수록 환급률 높음",
];

const FAQS = [
  {
    q: "기존 가입자도 인하된 보증료가 적용되나요?",
    a: "안 돼요. 2026년 3월 1일 이후 신규 신청자만 해당돼요. 기존 가입자는 가입 당시 조건(1.5%)이 그대로 유지돼요.",
  },
  {
    q: "보증료가 줄었는데 월 수령액이 왜 늘어나나요?",
    a: "초기보증료가 줄면 대출 원금이 늘어나는 효과가 있어서 월 수령액이 올라가요. 대신 연 보증료가 0.75%에서 0.95%로 올랐기 때문에 장기적으로는 총비용이 비슷한 수준이에요.",
  },
  {
    q: "초기보증료를 한꺼번에 내야 하나요?",
    a: "네, 가입 시 한 번에 납부해요. 다만 현금으로 직접 내는 게 아니라 주택연금 대출금에서 차감되는 방식이에요. 그래서 별도로 목돈을 준비할 필요는 없어요.",
  },
  {
    q: "환급은 어떤 비율로 받나요?",
    a: "해지 시점이 빠를수록 많이 돌려받아요. 가입 1년 이내 해지하면 약 80%, 3년차면 약 40%, 5년차면 약 20% 수준이에요. 5년을 넘기면 환급이 안 돼요.",
  },
  {
    q: "주택연금 해지하면 불이익이 있나요?",
    a: "해지 자체에 불이익은 없지만, 그동안 받은 연금액과 이자를 한꺼번에 상환해야 해요. 상환 후 남는 금액에서 초기보증료 환급분을 받는 구조예요.",
  },
  {
    q: "주택 가격이 12억 넘으면 가입이 안 되나요?",
    a: "2026년 기준으로 공시가격 12억원 이하 주택만 가입할 수 있어요. 공시가격은 실거래가의 60~70% 수준이니까 시세 17~20억까지는 가입 가능할 수 있어요. 한국주택금융공사에서 정확한 공시가격을 확인해 보세요.",
  },
];

const SOURCES = [
  { name: "금융위원회 보도자료", href: "https://www.fsc.go.kr/no010101/86211" },
  { name: "한국주택금융공사", href: "https://www.hf.go.kr" },
];

const RELATED = [
  { slug: "주택연금-가입조건-수령액-계산", title: "주택연금 가입조건과 수령액", description: "나이·주택가격별 월 수령액 계산 방법." },
  { slug: "주택연금-이사-가능-담보주택-변경", title: "주택연금 이사와 담보 변경", description: "가입 후 이사할 때 담보주택 변경 절차." },
  { slug: "주택담보대출-LTV-규제", title: "주택담보대출 LTV 규제", description: "지역·주택별 LTV 한도와 대출 가능 금액." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>주택연금 · 보증료 · 노후 자금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택연금 초기보증료, 얼마나 줄었나요?<br />
        1.0% 인하 내용과 5년 환급 규정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "주택연금 가입하려는데 초기보증료가 부담스러워요. 인하됐다는데 정확히 얼마예요?"
      </p>
      <p style={body}>
        2026년 3월 1일부터 초기보증료가 주택 가격의 <strong>1.5%에서 1.0%</strong>로 내려갔어요.
        4억원 주택이면 600만원 내던 걸 400만원만 내면 되니까 <strong>200만원 절감</strong>이에요.
        환급 받을 수 있는 기간도 3년에서 5년으로 늘어났고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 변경 전후 비교 - 핵심 답 */}
      <H2>초기보증료가 정확히 얼마나 줄었나요?</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr/no010101/86211" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회 발표</a>에 따르면 초기보증료율이 0.5%p 인하됐어요.
        주택 가격에 따라 절감 금액이 달라지니까 아래 비교표를 보세요.
      </p>

      <SectionBadge>초기보증료 변경 전후 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>변경 전</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>변경 후</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["초기보증료율", "1.5%", "1.0%"],
              ["3억 주택", "450만원", "300만원"],
              ["4억 주택", "600만원", "400만원"],
              ["6억 주택", "900만원", "600만원"],
              ["연 보증료율", "0.75%", "0.95%"],
            ].map(([label, before, after], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{before}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        72세, 4억원 주택 기준{"\n"}
        · 초기보증료: 600만원 → 400만원 (<strong>200만원 절감</strong>){"\n"}
        · 월 수령액: 129.7만원 → 133.8만원 (<strong>월 4.1만원 증가</strong>){"\n"}
        · 연 보증료는 0.75% → 0.95%로 소폭 인상{"\n"}
        → 초기 부담은 줄고, 매달 받는 돈은 늘어나는 구조예요
      </GreenBox>

      <p style={body}>
        연 보증료가 올랐다고 걱정할 수 있는데, 초기보증료 절감 + 월 수령액 증가 효과가 더 크기 때문에 신규 가입자한테는 유리해진 거예요.
        <a href="/w/주택연금-가입조건-수령액-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택연금 수령액 계산</a>에서 내 조건으로 정확한 금액을 확인해 보세요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 환급 규정 */}
      <H2>해지하면 보증료를 돌려받을 수 있나요?</H2>
      <p style={body}>
        가입 후 사정이 바뀌어서 해지해야 할 수도 있잖아요.
        이런 경우를 대비해서 초기보증료 환급 제도가 있어요.
        2026년 3월부터는 환급 가능 기간이 <strong>3년에서 5년</strong>으로 늘어났어요.
      </p>

      <BorderBox>
        <strong>초기보증료 환급 규정 (2026.3.1 이후 가입자)</strong>{"\n"}
        · 가입 후 1년 이내 해지: 약 80% 환급{"\n"}
        · 가입 후 2년 이내 해지: 약 60% 환급{"\n"}
        · 가입 후 3년 이내 해지: 약 40% 환급{"\n"}
        · 가입 후 4년 이내 해지: 약 30% 환급{"\n"}
        · 가입 후 5년 이내 해지: 약 20% 환급{"\n"}
        · 5년 초과: 환급 불가
      </BorderBox>

      <p style={body}>
        예전에는 3년 넘으면 한 푼도 못 받았는데, 이제 5년까지 환급이 돼요.
        4억 주택 기준 400만원을 냈다면 1년 이내 해지 시 약 320만원을 돌려받을 수 있는 셈이죠.
        다만 해지하면 그동안 받은 연금액 + 이자를 한꺼번에 상환해야 하니까 신중하게 판단하세요.
      </p>

      <Divider />

      {/* H2-3: 적용 대상과 체크리스트 */}
      <H2>누구한테 적용되고, 가입 전에 뭘 확인해야 하나요?</H2>
      <p style={body}>
        이번 인하 혜택은 <strong>2026년 3월 1일 이후 신규 신청자</strong>만 해당돼요.
        기존 가입자는 가입 당시 조건이 유지되니까 착오 없도록 주의하세요.
        <a href="https://www.hf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국주택금융공사</a>에서 정확한 적용 여부를 확인할 수 있어요.
      </p>

      <SectionBadge>가입 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        주택연금은 한 번 가입하면 오래 유지하는 상품이에요.
        <a href="/w/주택연금-이사-가능-담보주택-변경" style={{ color: "#1D9E75", textDecoration: "underline" }}>이사 시 담보주택 변경</a>이 가능하니까 이사 계획이 있더라도 가입을 미루지 않아도 돼요.
      </p>

      <Divider />

      {/* H2-4: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주택연금 보증료에서 실제로 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 금융위원회 발표 기준으로 작성했어요. 주택연금 가입 조건·수령액·보증료율은 정책 변경에 따라 달라질 수 있으니 최신 기준은 한국주택금융공사에서 확인해 주세요." />
    </ArticleLayout>
  );
}
