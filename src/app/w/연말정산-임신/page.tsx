"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 임신 중인 직장인이 산부인과 비용을 연말정산에서 공제받을 수 있는지 궁금한 상황
// Q2. 임신·출산 관련 의료비 공제 항목을 파악하고, 연말정산 간소화에서 빠짐없이 반영한다
// Q3. 의료비 15% 세액공제, 출산 세액공제(30/50/70만원), 산후조리원 200만원 한도, 임신 바우처 차감
// Q4. GreenBox(공제 항목 요약) + 비교표(공제 항목별 금액) + Checklist(놓치기 쉬운 항목) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "산부인과 진료비·초음파·검사비 → 의료비 간소화에 자동 반영 확인",
  "산후조리원비 → 영수증 별도 제출 필요 (간소화 미반영 시)",
  "임신 바우처(국민행복카드) 결제분 → 의료비 공제 대상 아님, 차감 확인",
  "배우자 명의 결제분 → 배우자가 공제받거나, 본인 기본공제 대상자로 등록",
  "출산 세액공제 → 첫째 30만원 / 둘째 50만원 / 셋째 이상 70만원",
  "총급여 3% 초과분만 공제 → 다른 의료비와 합산해서 계산",
];

const FAQS = [
  {
    q: "임신 바우처로 결제한 병원비도 공제되나요?",
    a: "안 돼요. 임신 바우처(국민행복카드)는 정부 지원금이라서 의료비 세액공제 대상이 아니에요. 바우처로 결제한 금액을 빼고 본인이 직접 부담한 금액만 공제돼요.",
  },
  {
    q: "남편 카드로 산부인과비를 냈는데, 누가 공제받나요?",
    a: "의료비 공제는 실제로 돈을 낸 사람이 받아요. 남편 카드로 결제했으면 남편이 공제받을 수 있어요. 단, 아내가 남편의 기본공제 대상자여야 해요. 맞벌이면 소득이 높은 쪽에서 받는 게 유리해요.",
  },
  {
    q: "산후조리원비가 간소화 서비스에 안 떠요",
    a: "산후조리원이 간소화 서비스에 등록하지 않은 경우 안 뜰 수 있어요. 그러면 산후조리원에서 영수증을 직접 받아서 회사에 제출하면 돼요. 출산 1회당 200만원까지 공제 가능해요.",
  },
  {
    q: "12월에 출산하면 그해 연말정산에 반영되나요?",
    a: "네. 12월 31일까지 출산했으면 그해 귀속 연말정산에 출산 세액공제가 반영돼요. 출생신고와 관계없이 실제 출산일 기준이에요.",
  },
  {
    q: "쌍둥이를 낳으면 출산 세액공제가 2배인가요?",
    a: "쌍둥이는 한 번의 출산으로 보기 때문에 출산 세액공제 1회분만 적용돼요. 다만 쌍둥이가 둘째·셋째에 해당하면 더 높은 금액(50만원 또는 70만원)이 적용돼요.",
  },
  {
    q: "유산이나 사산 시에도 의료비 공제가 되나요?",
    a: "네. 유산·사산 관련 의료비도 의료비 세액공제 대상이에요. 출산 세액공제(30~70만원)는 적용되지 않지만, 병원 진료비는 일반 의료비와 동일하게 15% 공제를 받을 수 있어요.",
  },
];

const RELATED = [
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "내 환급액이 얼마인지 계산해 보세요." },
  { slug: "건강보험료-연말정산-추가납부", title: "건강보험료 연말정산", description: "건보료 연말정산 추가납부 안내." },
  { slug: "연말정산-근로계약서", title: "연말정산과 근로계약서", description: "중도입사·퇴사 시 연말정산 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 임신·출산 · 의료비 공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임신 중 산부인과 비용, 연말정산 돼요?<br />
        의료비 공제부터 출산 세액공제까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임신하니까 병원비가 만만치 않죠. 초음파, 검사, 진료비가 쌓이는데 이걸 연말정산에서 돌려받을 수 있을까요?
      </p>
      <p style={body}>
        산부인과 진료비는 <strong>의료비 세액공제 15%</strong> 대상이에요.
        출산하면 <strong>출산 세액공제</strong>(첫째 30만원, 둘째 50만원, 셋째 70만원)도 추가로 받아요.
        산후조리원비는 출산 1회당 <strong>200만원</strong>까지 공제되고요.
        단, 임신 바우처(국민행복카드)로 결제한 금액은 빠지니까 주의하세요.
      </p>

      <Divider />

      <H2>임신·출산 때 받을 수 있는 공제 항목이에요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a> 기준으로 임신·출산 관련 공제는 크게 3가지예요. 의료비 세액공제, 출산 세액공제, 산후조리원비 공제가 각각 별도로 적용돼요.
      </p>

      <SectionBadge>임신·출산 세액공제 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제 항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율·금액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도·조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["산부인과 진료비·검사비·초음파", "15% 세액공제", "총급여 3% 초과분부터"],
              ["출산 세액공제 (첫째)", "30만원", "출산 해당 연도에 적용"],
              ["출산 세액공제 (둘째)", "50만원", "출산 해당 연도에 적용"],
              ["출산 세액공제 (셋째 이상)", "70만원", "출산 해당 연도에 적용"],
              ["산후조리원비", "15% 세액공제", "출산 1회당 200만원 한도"],
            ].map(([item, rate, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        2024년 1월 이후 지출분부터 산후조리원비의 총급여 7,000만원 소득 제한이 폐지됐어요. 소득에 관계없이 누구나 산후조리원비 공제를 받을 수 있어요.
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={8} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>놓치기 쉬운 항목, 미리 체크하세요</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 간소화 서비스에서 대부분 자동 반영되지만, 산후조리원비가 빠져 있거나 임신 바우처 차감이 안 돼 있는 경우가 있어요.
        아래 항목을 하나씩 확인해야 공제 누락 없이 환급받을 수 있어요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <BorderBox>
        <strong>의료비 세액공제 계산 예시</strong>{"\n"}
        총급여 4,000만원, 산부인과비 150만원, 산후조리원비 180만원{"\n"}
        → 총 의료비 330만원 - 총급여의 3%(120만원) = 210만원{"\n"}
        → 210만원 × 15% = 31.5만원 세액공제{"\n"}
        → 출산 세액공제(첫째 30만원) 별도 추가
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성됐어요. 개인 상황에 따라 공제 금액이 달라질 수 있으니, 홈택스 간소화 서비스에서 조회해 보세요." />
    </ArticleLayout>
  );
}
