"use client";
// Q1. 자녀 대학 등록금을 냈거나 직접 대학원에 다니면서 연말정산 교육비 공제가 얼마나 되는지 궁금한 직장인
// Q2. 연말정산 간소화 서비스에서 교육비 영수증을 제출해 세액공제 혜택을 받는 행동
// Q3. 본인 대학원은 한도 없이 전액 공제, 자녀 대학은 1인당 900만원 한도, 장학금 뺀 실납부액만 공제, 부양가족 조건
// Q4. 조건별 표 + GreenBox 요약 + Checklist + FAQ
// MAP-INTRO: 대학 등록금 한 학기에 400만원 넘는다면, 연말정산에서 최대 135만원 돌려받을 수 있어요
// MAP-TYPE: 텍스트
// MAP-H2: 공제금액 > 본인vs부양가족 > 장학금처리 > 공제대상비용 > 부양가족요건 > 체크포인트 > FAQ
// MAP-COMP: GreenBox > 표 > BorderBox > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "연말정산-간소화서비스-이용방법", title: "연말정산 간소화서비스 이용 방법", description: "교육비 영수증을 간소화서비스에서 바로 가져오는 방법이에요." },
  { slug: "IRP-세액공제-한도-연말정산-절세", title: "IRP 세액공제 한도와 절세", description: "교육비 공제와 함께 활용하면 환급액이 커져요." },
];

const LIMIT_TABLE = [
  { subject: "본인 대학교", limit: "한도 없음 (전액)", rate: "15%", example: "등록금 1,000만원 → 150만원 공제" },
  { subject: "본인 대학원 (석사·박사)", limit: "한도 없음 (전액)", rate: "15%", example: "등록금 1,200만원 → 180만원 공제" },
  { subject: "부양가족 대학교", limit: "1인당 연 900만원", rate: "15%", example: "900만원 × 15% = 135만원 공제" },
  { subject: "부양가족 대학원", limit: "공제 불가", rate: "-", example: "대학원은 본인만 가능" },
];

const FAQS = [
  {
    q: "대학원 등록금도 공제돼요?",
    a: "본인 대학원은 한도 없이 전액 공제돼요. 부양가족(자녀·배우자 등)이 다니는 대학원은 공제 대상이 아니에요. 대학원은 본인만 가능해요.",
  },
  {
    q: "휴학 중에 낸 등록금도 공제돼요?",
    a: "아니요. 휴학 중 납부한 등록금은 공제 대상이 아니에요. 재학 중 납부한 금액만 가능해요.",
  },
  {
    q: "장학금 받으면 공제금액이 줄어요?",
    a: "줄어요. 등록금에서 장학금을 뺀 실제 납부액만 공제 대상이에요. 등록금 800만원에 장학금 300만원이면 500만원 × 15% = 75만원이에요.",
  },
  {
    q: "대학생 자녀가 아르바이트로 돈 버는데 공제받을 수 있어요?",
    a: "자녀의 연간 소득금액이 100만원을 넘으면 부양가족 요건에서 탈락해요. 소득금액 100만원은 근로소득만 있을 때 총급여 약 500만원에 해당해요. 그 이상 벌면 공제 불가예요.",
  },
  {
    q: "학자금 대출로 등록금 냈는데 공제돼요?",
    a: "납부한 연도에 공제받아요. 나중에 대출을 상환할 때는 공제 안 돼요. 등록금을 낸 시점이 기준이에요.",
  },
  {
    q: "해외 대학 등록금도 공제돼요?",
    a: "정규 학위과정이면 가능해요. 어학연수나 비학위 과정은 안 돼요. 해외 대학교 학위 취득을 위한 등록금은 공제 대상이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제59조의4: 교육비 세액공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 교육비 세액공제 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7869" },
      { label: "홈택스: 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const CHECKLIST = [
  "본인 대학·대학원: 한도 없이 전액 × 15% 세액공제",
  "자녀 대학: 1인당 연 900만원 한도 × 15% = 최대 135만원",
  "장학금 받은 경우: 등록금 - 장학금 = 실납부액만 공제",
  "부양가족 소득 요건: 연간 소득금액 100만원 이하 (총급여 500만원 이하)",
  "부양가족 나이: 대학생은 나이 요건 없음 (소득 요건만 확인)",
  "휴학 중 등록금: 공제 불가",
  "부양가족 대학원: 공제 불가 (본인 대학원만 가능)",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 교육비 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 대학교 등록금 공제<br />
        한도·장학금·부양가족 조건 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대학 등록금 한 학기에 400만원 넘는다면, 연말정산에서 최대 135만원 돌려받을 수 있어요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의4</a>에 따라
        교육비의 15%를 세액공제해줘요. 자녀 대학은 1인당 900만원 한도, 본인 대학원은 한도 없이 전액이에요.
        <a href="/w/연말정산-교육비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}> 교육비 세액공제</a> 전체 범위가 궁금하면 함께 보세요.
      </p>

      <Divider />

      <H2>얼마나 공제받을 수 있나요?</H2>
      <p style={body}>
        공제율은 15%예요. 자녀 대학 등록금 900만원 한도를 채우면 900만원 × 15% = 135만원을 돌려받아요.
        자녀 두 명이 대학에 다니면 각각 적용돼서 최대 270만원까지 공제돼요.
      </p>
      <p style={body}>
        본인이 직장 다니면서 야간 대학원을 다니는 경우에는 등록금 전액이 공제 대상이에요.
        한도 없이 전액이기 때문에 대학원 등록금이 클수록 환급액도 커져요.
      </p>

      <SectionBadge>공제 한도 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>한도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {LIMIT_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.subject}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", color: row.limit === "공제 불가" ? "#ef4444" : "#1D9E75", fontWeight: 600 }}>{row.limit}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.rate}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        본인 대학·대학원: 한도 없이 전액 × 15%<br />
        부양가족 대학: 1인당 연 900만원 한도 × 15% = 최대 135만원<br />
        부양가족 대학원: 공제 불가 (본인만 가능)
      </GreenBox>

      <Divider />

      <H2>장학금 받으면 공제금액이 줄어요</H2>
      <p style={body}>
        장학금을 받았다면 등록금에서 장학금을 뺀 실제 납부액만 공제 대상이에요.
        등록금 800만원에 장학금 300만원을 받았다면 공제 대상은 500만원이에요.
        500만원 × 15% = 75만원이 세액공제돼요.
      </p>
      <p style={body}>
        학자금 대출로 등록금을 냈다면 납부한 연도에 공제받아요.
        나중에 대출을 갚을 때는 추가 공제가 없어요. 교육비 공제는 납부 시점 기준이에요.
      </p>

      <BorderBox>
        연말정산 간소화 서비스에서 교육비 자료를 불러오면 장학금이 자동으로 차감돼 있어요.
        따로 계산할 필요 없이 간소화 서비스에 뜬 금액이 실제 공제 대상이에요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 홈택스 연말정산 간소화 서비스</a>에서 1월에 조회하세요.
      </BorderBox>

      <Divider />

      <H2>어떤 비용이 공제되고, 뭐가 안 되나요?</H2>
      <p style={body}>
        등록금에 포함된 입학금, 수업료, 기숙사비, 실험실습비가 공제돼요.
        4년제 대학교, 전문대학, 사이버대학, 방송통신대학, 학점은행제 모두 가능해요.
        해외 대학도 정규 학위과정이면 공제 대상이에요.
      </p>
      <p style={body}>
        학교 밖에서 산 교재비는 안 돼요. 학원비, 어학연수비, 휴학 중 등록금도 공제 대상이 아니에요.
        재학 중에 납부한 금액만 가능해요.
      </p>

      <Divider />

      <H2>부양가족 대학생 공제 받으려면?</H2>
      <p style={body}>
        대학생 자녀는 나이 요건이 없어요. 만 20세가 넘어도 소득 요건만 충족하면 공제받아요.
        연간 소득금액이 100만원 이하여야 해요. 근로소득만 있다면 총급여 500만원 이하가 기준이에요.
      </p>
      <p style={body}>
        자녀가 아르바이트로 연 소득금액 100만원을 초과하면 그 해에는 부양가족 공제가 안 돼요.
        소득이 많은 해에는 교육비 공제도 받을 수 없어요.
      </p>

      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>
        연말정산 교육비 공제에서 자주 헷갈리는 부분들이에요. 미리 확인해두면 환급액이 달라져요.
      </p>

      <SectionBadge>공제 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대학교 등록금 공제에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 소득세법을 바탕으로 작성됐어요. 공제 기준은 변경될 수 있으니 최신 내용은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
