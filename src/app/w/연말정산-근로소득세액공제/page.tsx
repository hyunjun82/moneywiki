"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 하는 직장인이 원천징수영수증에서 "근로소득세액공제"를 보고 이게 뭔지, 내가 얼마나 받는 건지 궁금한 상황
// Q2. 근로소득세액공제의 산출세액 구간별 공제율과 총급여별 한도를 파악해서 내 공제액을 직접 계산한다
// Q3. 산출세액 130만원 기준 공제율(55%/30%), 총급여별 한도(74만~50만), 근로소득공제와의 차이
// Q4. GreenBox(공제율 요약) + Calculator(내 공제액 계산) + BorderBox(근로소득공제 차이) + Steps(확인 방법) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 간이 계산기 ───
function TaxCreditCalc() {
  const [taxAmount, setTaxAmount] = useState(1500000);
  const [salary, setSalary] = useState(50000000);

  const calcCredit = () => {
    let credit: number;
    if (taxAmount <= 1300000) {
      credit = taxAmount * 0.55;
    } else {
      credit = 715000 + (taxAmount - 1300000) * 0.30;
    }

    let limit: number;
    if (salary <= 33000000) {
      limit = 740000;
    } else if (salary <= 70000000) {
      limit = Math.max(660000, 740000 - (salary - 33000000) * 0.008);
    } else if (salary <= 120000000) {
      limit = Math.max(500000, 660000 - (salary - 70000000) * 0.5 / 100);
    } else {
      limit = 500000;
    }

    return Math.min(credit, limit);
  };

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "20px 18px", marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>내 근로소득세액공제 계산하기</p>

      <label style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>산출세액 (원)</label>
      <input
        type="range" min={0} max={10000000} step={10000} value={taxAmount}
        onChange={e => setTaxAmount(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#1D9E75", marginBottom: 4 }}
      />
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, textAlign: "right" }}>{fmt(taxAmount)}원</p>

      <label style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>총급여 (원)</label>
      <input
        type="range" min={20000000} max={200000000} step={1000000} value={salary}
        onChange={e => setSalary(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#1D9E75", marginBottom: 4 }}
      />
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 18, textAlign: "right" }}>{fmt(salary)}원</p>

      <div style={{ background: "#fff", borderRadius: 8, padding: "14px 16px", border: "1px solid #9FE1CB" }}>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75", marginBottom: 4 }}>{fmt(calcCredit())}원</p>
        <p style={{ fontSize: 13, color: "#6b7280" }}>예상 근로소득세액공제액</p>
      </div>
    </div>
  );
}

const STEPS_DATA = [
  {
    title: "별도 신청 필요 없어요",
    desc: "근로소득세액공제는 직장인이면 자동 적용돼요. 연말정산 때 회사가 알아서 계산해 주니까 따로 서류를 내거나 홈택스에서 뭘 할 필요가 없어요.",
  },
  {
    title: "원천징수영수증에서 확인해요",
    desc: "연말정산이 끝나면 회사에서 받는 원천징수영수증에 '근로소득세액공제' 항목이 적혀 있어요. 세액공제 부분을 보면 자동 계산된 금액을 확인할 수 있죠.",
    link: { label: "홈택스에서 확인", href: "https://www.hometax.go.kr" },
  },
  {
    title: "홈택스 My홈택스에서도 조회돼요",
    desc: "홈택스에 로그인한 뒤 My홈택스 > 지급명세서 등 제출내역에서 근로소득 지급명세서를 열면 공제 금액이 나와요. 연말정산 결과가 반영된 후에 확인 가능해요.",
  },
];

const FAQS = [
  {
    q: "근로소득세액공제와 근로소득공제는 뭐가 다른 건가요?",
    a: "이름이 비슷해서 많이 헷갈리는데, 완전히 다른 거예요. 근로소득공제는 소득에서 빼는 '소득공제'고, 근로소득세액공제는 세금에서 빼는 '세액공제'예요. 소득공제는 과세표준을 낮추고, 세액공제는 산출세액에서 직접 빼주는 거죠.",
  },
  {
    q: "산출세액이 0원이면 이 공제도 의미가 없나요?",
    a: "맞아요. 산출세액이 0원이면 빼줄 세금 자체가 없으니까 근로소득세액공제도 0원이에요. 낼 세금이 없는 상태에서는 아무리 공제율이 높아도 돌려받을 게 없죠.",
  },
  {
    q: "연봉이 높으면 공제를 더 많이 받나요?",
    a: "반대예요. 총급여가 높을수록 공제 한도가 줄어들어요. 3,300만원 이하는 최대 74만원인데, 1.2억 초과면 50만원이 한도예요. 저소득 근로자한테 더 유리한 구조죠.",
  },
  {
    q: "산출세액 130만원을 기준으로 공제율이 왜 달라지나요?",
    a: "130만원 이하는 55%를 빼주고, 초과분은 30%를 빼줘요. 세금이 적은 사람한테 더 많은 비율을 돌려주는 구조예요. 130만원이면 71.5만원(55%)을 공제받고, 200만원이면 71.5만원 + 21만원 = 92.5만원이에요.",
  },
  {
    q: "세액공제 적용 순서가 있나요?",
    a: "근로소득세액공제는 다른 세액공제보다 먼저 적용돼요. 자녀세액공제, 연금저축 세액공제 등을 빼기 전에 근로소득세액공제를 먼저 빼고, 그 나머지에서 다른 공제를 적용하는 순서예요.",
  },
  {
    q: "중도 퇴사자도 근로소득세액공제를 받나요?",
    a: "네, 받아요. 퇴사할 때 회사에서 중도퇴사 연말정산을 해주면 그때까지의 산출세액을 기준으로 자동 계산돼요. 이직했다면 새 회사에서 합산 연말정산을 하면 되죠.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "소득세법 제59조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-근로소득공제", title: "연말정산 근로소득공제", description: "소득에서 빼는 공제, 세액공제와 뭐가 다른지." },
  { slug: "연말정산-세액공제-소득공제-차이", title: "세액공제와 소득공제 차이", description: "두 공제의 구조적 차이와 유불리 비교." },
  { slug: "연말정산", title: "연말정산 가이드", description: "연말정산 전체 흐름과 공제 항목 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 세액공제 · 근로소득</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로소득세액공제, 내가 얼마 받는 건지?<br />
        공제율부터 연봉별 한도까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "원천징수영수증에 근로소득세액공제라는 게 적혀 있는데, 이게 뭐예요?"
      </p>
      <p style={body}>
        직장인이면 누구나 자동으로 받는 세액공제예요. 따로 신청할 필요 없고, 산출세액에서 <strong>최대 74만원</strong>까지 빼줘요.
        연봉 5천만원이면 약 60만원, 연봉 3천만원 이하면 74만원까지 돌려받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 공제율 구조 - 바로 답 */}
      <H2>산출세액의 몇 %를 빼주나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조</a>에 따라 산출세액 130만원을 기준으로 공제율이 달라져요.
        세금이 적은 사람일수록 더 높은 비율을 돌려받는 구조예요.
      </p>

      <GreenBox>
        산출세액 130만원 이하 → 산출세액의 <strong>55%</strong> 공제{"\n"}
        산출세액 130만원 초과 → 71.5만원 + 초과분의 <strong>30%</strong> 공제{"\n"}
        {"\n"}
        예) 산출세액 100만원 → 55만원 공제{"\n"}
        예) 산출세액 200만원 → 71.5만 + 21만 = 92.5만원 공제
      </GreenBox>

      <p style={body}>
        그런데 이 금액을 전부 받는 건 아니에요. 총급여에 따라 공제 한도가 따로 있거든요.
      </p>

      <CategoryButton label="연말정산" count={15} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 연봉별 한도 */}
      <H2>연봉에 따라 한도가 달라져요</H2>
      <p style={body}>
        공제율로 계산한 금액이 아무리 커도 총급여별 한도를 넘길 수 없어요.
        총급여가 낮을수록 한도가 높고, 고소득일수록 한도가 줄어드는 구조예요.
      </p>

      <SectionBadge>총급여별 공제 한도</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>총급여 구간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제 한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["3,300만원 이하", "최대 74만원"],
              ["3,300만~7,000만원", "74만 - (총급여-3,300만)×0.8%"],
              ["7,000만~1.2억원", "66만 - (총급여-7,000만)×0.5%"],
              ["1.2억원 초과", "최소 50만원"],
            ].map(([range, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{range}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        연봉 5천만원이면 74만 - (5,000만 - 3,300만) × 0.8% = <strong>약 60.4만원</strong>이 한도예요.
        연봉 1억이면 약 51만원, 1.2억 넘으면 무조건 50만원이 최소 한도죠.
      </p>

      <Divider />

      {/* H2-3: 계산기 */}
      <H2>내 공제액을 직접 계산해 보세요</H2>
      <p style={body}>
        산출세액과 총급여를 넣으면 예상 공제액이 바로 나와요.
        산출세액은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 연말정산 간소화에서 확인할 수 있어요.
      </p>

      <TaxCreditCalc />

      <p style={body}>
        계산기 결과가 한도보다 크면 한도만큼만 공제되고, 한도보다 작으면 계산된 금액 그대로 공제돼요.
        <a href="/w/연말정산-근로소득공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로소득공제</a>와는 별개로 적용되는 거니까 둘 다 받는 거예요.
      </p>

      <Divider />

      {/* H2-4: 확인 방법 */}
      <H2>내 공제액은 어디서 확인하나요?</H2>
      <p style={body}>
        따로 신청하는 건 아무것도 없어요. 다만 내가 실제로 얼마 공제받았는지 확인하는 방법은 알아두면 좋아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        <strong>근로소득공제 vs 근로소득세액공제</strong>{"\n"}
        · 근로소득공제: 소득에서 빼는 소득공제 → 과세표준↓{"\n"}
        · 근로소득세액공제: 세금에서 빼는 세액공제 → 산출세액↓{"\n"}
        · 두 개는 별개로, 직장인이면 둘 다 자동 적용돼요
      </BorderBox>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        근로소득세액공제에서 실제로 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산(소득세법 제59조) 기준으로 작성했어요. 세법 개정에 따라 공제율·한도가 달라질 수 있으니 최신 기준은 국세청 또는 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
