"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 병원비를 많이 써서 연말정산에서 의료비 공제를 얼마나 받을 수 있는지 확인하려는 직장인
// Q2. 의료비 공제율과 한도를 확인하고, 공제 대상 항목을 빠짐없이 챙겨 회사에 제출한다
// Q3. 공제율(15%/20%/30%), 한도(700만원/무제한), 3% 기준, 대상 항목, 맞벌이 전략
// Q4. GreenBox(핵심 정리) + 비교 테이블(대상별 한도) + Checklist(공제 대상) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "병원 진료비, 약국 약값 / 간소화서비스에서 자동 조회",
  "안경·콘택트렌즈 구입비 (1인당 50만원 한도) / 안경점 영수증 직접 제출",
  "보청기, 휠체어 등 장애인 보장구 / 건강보험공단 확인",
  "산후조리원비 (출산 1회당 200만원 한도) / 간소화 자동 조회",
  "난임시술비 / 30% 공제율, 한도 없음",
  "미숙아·선천성이상아 의료비 / 20% 공제율, 한도 없음",
];

const FAQS = [
  {
    q: "총급여의 3%를 안 넘기면 의료비 공제가 아예 안 되나요?",
    a: "맞아요. 의료비 합계가 총급여의 3%를 넘어야 초과분부터 공제가 시작돼요. 총급여 5,000만원이면 150만원이 기준이고, 200만원 썼으면 50만원에 대해 15% = 75,000원을 공제받아요.",
  },
  {
    q: "맞벌이면 의료비를 누가 공제받는 게 유리한가요?",
    a: "소득이 낮은 쪽이 유리해요. 3% 기준을 넘기기 쉽거든요. 연봉 3,000만원이면 90만원만 넘으면 되지만, 연봉 7,000만원이면 210만원을 넘어야 해요. 단, 의료비 공제는 기본공제를 받는 사람만 신청할 수 있어요.",
  },
  {
    q: "성형수술이나 미용 시술도 공제받을 수 있나요?",
    a: "안 돼요. 미용·성형 목적의 의료비는 공제 대상이 아니에요. 다만 치료 목적이면 가능해요. 시력교정술(라식·라섹)은 치료 목적으로 인정돼서 공제받을 수 있어요.",
  },
  {
    q: "실비보험으로 돌려받은 의료비도 공제가 되나요?",
    a: "실비보험으로 보전받은 금액은 공제 대상에서 제외돼요. 본인이 실제로 부담한 금액만 공제 대상이에요. 간소화서비스에서는 총 의료비가 잡히니까 보험금 수령액을 직접 빼서 신고해야 해요.",
  },
  {
    q: "65세 이상 부모님 의료비는 한도 없이 공제되나요?",
    a: "맞아요. 본인, 65세 이상 부모님, 장애인, 건강보험 산정특례자의 의료비는 한도 없이 전액 공제돼요. 일반 부양가족(배우자·자녀 등)은 연 700만원 한도가 적용돼요.",
  },
  {
    q: "약국에서 산 일반의약품도 공제가 되나요?",
    a: "처방전에 따라 약국에서 구입한 의약품은 공제 대상이에요. 처방전 없이 사는 일반의약품(감기약, 소화제 등)은 공제 대상이 아니에요.",
  },
];

const RELATED = [
  { slug: "연말정산-기본공제-대상", title: "기본공제 대상과 요건", description: "1인당 150만원 소득공제 요건 정리." },
  { slug: "연말정산-결정세액", title: "결정세액 계산 방법", description: "산출세액 - 세액공제 = 결정세액." },
  { slug: "연말정산-자주-묻는-질문", title: "연말정산 자주 묻는 질문", description: "매년 반복되는 궁금증 7가지." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 의료비 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        의료비 공제, 얼마까지 받을 수 있나요?<br />
        공제율과 한도 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "병원비를 많이 썼는데 연말정산에서 얼마나 돌려받을 수 있을까요?"
      </p>
      <p style={body}>
        의료비 세액공제는 총급여의 <strong>3%를 초과한 금액</strong>에 대해 <strong>15%</strong>를 돌려받는 제도예요.
        본인·65세 이상·장애인 의료비는 한도 없이 전액 공제되고, 일반 가족 의료비는 <strong>연 700만원 한도</strong>예요.
        난임시술비는 30%, 미숙아 의료비는 20%로 공제율이 더 높아요.
      </p>

      <Divider />

      <H2>대상별 공제율과 한도가 달라요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따른 의료비 세액공제 구조예요. 누구의 의료비인지에 따라 공제율과 한도가 달라져요.
      </p>

      <SectionBadge>의료비 공제 구조</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["본인", "15%", "한도 없음"],
              ["65세 이상 부모님", "15%", "한도 없음"],
              ["장애인", "15%", "한도 없음"],
              ["건강보험 산정특례자", "15%", "한도 없음"],
              ["6세 이하 영유아", "15%", "한도 없음"],
              ["배우자·자녀 등 일반", "15%", "연 700만원"],
              ["난임시술비", "30%", "한도 없음"],
              ["미숙아·선천성이상아", "20%", "한도 없음"],
            ].map(([who, rate, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{who}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        의료비 공제 계산 예시{"\n"}
        총급여 5,000만원, 의료비 합계 300만원{"\n"}
        3% 기준: 5,000만 x 3% = 150만원{"\n"}
        공제 대상: 300만 - 150만 = 150만원{"\n"}
        공제액: 150만 x 15% = 225,000원 세금 절감
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이런 의료비도 공제받을 수 있어요</H2>
      <p style={body}>
        병원비만 되는 게 아니에요. 안경 구입비, 산후조리원비, 보청기까지 의외로 범위가 넓어요. 간소화서비스에 안 나오는 항목은 직접 영수증을 받아서 제출해야 해요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>맞벌이라면 소득 낮은 쪽이 유리해요</H2>
      <p style={body}>
        의료비 공제의 핵심 전략은 <strong>3% 기준</strong>이에요. 총급여가 낮으면 3% 기준도 낮아지니까 초과분이 더 많아져요.
      </p>

      <BorderBox>
        <strong>맞벌이 의료비 공제 전략</strong>{"\n"}
        · 남편 연봉 7,000만원 → 3% 기준 210만원{"\n"}
        · 아내 연봉 3,000만원 → 3% 기준 90만원{"\n"}
        · 의료비 합계 200만원이면:{"\n"}
        &nbsp;&nbsp;남편 쪽: 200만 - 210만 = 기준 미달, 공제 0원{"\n"}
        &nbsp;&nbsp;아내 쪽: 200만 - 90만 = 110만 x 15% = 16.5만원 공제{"\n"}
        → 아내가 공제받아야 유리해요
      </BorderBox>

      <p style={body}>
        단, 의료비 공제는 <a href="/w/연말정산-기본공제-대상" style={{ color: "#1D9E75", textDecoration: "underline" }}>기본공제</a>를 받는 사람만 신청할 수 있어요. 자녀를 남편이 기본공제 받고 있으면, 자녀 의료비도 남편만 공제할 수 있어요. 배분 전략을 세울 때 이 점을 꼭 고려하세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.nts.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세청</a>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>소득세법</a>
        <a href="https://www.hometax.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>홈택스</a>
      </div>

      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 기준으로 작성됐어요. 실비보험 수령액은 본인 부담 의료비에서 제외해야 해요." />
    </ArticleLayout>
  );
}
