"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 맞벌이인데 배우자 공제를 받을 수 있는지, 소득 기준이 정확히 얼마인지 모르는 상황이에요.
// Q2. 배우자 소득이 100만원 이하인지 확인하고, 맞벌이 절세 전략을 세우는 행동.
// Q3. 소득금액 100만원(근로소득만 시 총급여 500만원), 나이 요건 없음, 법적 혼인만, 추가 공제.
// Q4. GreenBox(핵심 조건) + EligibilityChecker(자격 확인) + BorderBox(맞벌이 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "법적 혼인 관계(혼인신고 완료)예요" },
  { id: "c2", label: "배우자 연간 소득금액이 100만원 이하예요" },
  { id: "c3", label: "배우자의 근로소득만 있다면 총급여 500만원 이하예요" },
  { id: "c4", label: "12월 31일 기준 혼인 상태가 유지돼요" },
];

const FAQS = [
  { q: "맞벌이면 배우자 공제가 안 되나요?", a: "배우자 총급여가 500만원을 넘으면(소득금액 100만원 초과) 공제받을 수 없어요. 맞벌이 부부는 서로 배우자 공제를 못 받아요." },
  { q: "사실혼도 배우자 공제가 되나요?", a: "아니요, 법적 혼인 관계만 가능해요. 혼인신고를 하지 않은 사실혼은 아무리 오래 살아도 공제 대상이 아니에요." },
  { q: "육아휴직급여도 소득에 포함되나요?", a: "아니요, 육아휴직급여는 비과세소득이라 소득금액에 포함되지 않아요. 육아휴직 중이면 배우자 공제 받기 쉬워요." },
  { q: "배우자가 프리랜서면 어떻게 계산하나요?", a: "사업소득은 수입에서 필요경비를 빼요. 기타소득은 수입에서 60%를 필요경비로 빼고요. 여러 소득을 합산해서 100만원 이하인지 확인해야 해요." },
  { q: "연중에 이혼하면 그해 공제 받을 수 있나요?", a: "12월 31일 기준 혼인 상태여야 해요. 연중에 이혼했으면 그해 배우자 공제를 못 받아요." },
  { q: "배우자 공제 외에 추가로 받을 수 있는 게 있나요?", a: "배우자가 기본공제 대상이면 보험료(12%), 교육비(15%) 세액공제도 함께 받을 수 있어요. 의료비는 기본공제 여부와 관계없이 공제 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "소득세법 제50조(기본공제)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 인적공제 안내", url: "https://www.nts.go.kr" },
    { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 인적공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 배우자 공제, 받을 수 있을까?<br />
        소득 기준과 맞벌이 절세법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        결혼했다고 자동으로 받는 공제가 아니에요.
        배우자 소득금액이 연 100만원 이하여야 기본공제 150만원을 받을 수 있어요.
        맞벌이면 서로 공제가 안 되니까 다른 방법으로 절세해야 해요.
      </p>

      <Divider />

      <H2>내 배우자, 공제 대상일까?</H2>
      <p style={body}>
        아래 항목에 모두 해당하면 배우자 기본공제 150만원을 받을 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="배우자 기본공제 150만원 대상이에요. 보험료·교육비 추가 공제도 받을 수 있어요."
        partialMatchText="일부 조건이 맞지 않아요. 소득 요건이 가장 중요하니 꼭 확인하세요."
      />

      <Divider />

      <H2>소득 기준, 정확히 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75" }}>소득세법 제50조</a>에서 정한 기본공제 요건이에요.
        배우자는 나이 요건이 없어서 소득만 충족하면 돼요.
      </p>

      <GreenBox title="배우자 공제 핵심 기준">
        연간 <strong>소득금액 100만원 이하</strong><br />
        근로소득만 있으면 <strong>총급여 500만원 이하</strong><br />
        비과세소득(육아휴직급여 등)과 분리과세소득은 <strong>제외</strong>
      </GreenBox>

      <SectionBadge>소득 종류별 계산법</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>소득 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>소득금액 계산</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>100만원 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["근로소득", "총급여 - 근로소득공제", "총급여 500만원 이하"],
              ["사업소득", "수입 - 필요경비", "경비 제외 후 100만원 이하"],
              ["기타소득", "수입 - 필요경비(60%)", "수입 250만원 이하"],
              ["연금소득", "총연금액 - 연금소득공제", "공제 후 100만원 이하"],
            ].map(([type, calc, std], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{calc}</td>
                <td style={{ padding: "9px 12px" }}>{std}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>맞벌이 부부는 어떻게 절세하나요?</H2>
      <p style={body}>
        맞벌이면 서로 배우자 공제를 못 받아요.
        대신 다른 방법으로 절세할 수 있어요.
      </p>

      <BorderBox>
        <strong>맞벌이 절세 전략</strong><br />
        · 부양가족(부모·자녀) 공제를 소득 높은 쪽에 몰아요<br />
        · 의료비는 소득 <strong>낮은 쪽</strong>이 공제받으면 유리해요 (3% 초과분 기준이라)<br />
        · 카드 공제는 각자 본인 명의 카드 사용분만 공제돼요<br />
        · <a href="/w/연말정산-맞벌이-절세-전략" style={{ color: "#1D9E75" }}>맞벌이 절세 전략</a>에서 상세하게 확인하세요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 연말정산 기준으로 작성됐어요. 소득 요건은 개인 상황에 따라 달라질 수 있으니 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
