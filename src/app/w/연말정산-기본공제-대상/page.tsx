"use client";
// Q1. 연말정산 때 부모님이나 자녀를 부양가족으로 올려 공제받을 수 있는지 확인하려는 직장인
// Q2. 본인 가족의 나이·소득 요건을 확인하고 부양가족 공제 신고서를 회사에 제출한다
// Q3. 1인당 150만원, 대상별 나이 요건(60세/20세), 소득 요건(100만원), 장애인 특례, 중복공제 금지
// Q4. GreenBox(요건 요약) + 비교 테이블(대상별 요건) + EligibilityChecker + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "부모님이 59세인데 기본공제 안 되나요?",
    a: "네, 직계존속은 만 60세 이상이어야 기본공제 대상이에요. 2025년 귀속 기준으로 1965년 12월 31일 이전 출생자만 가능해요. 다만 부모님이 장애인이면 나이 제한 없이 소득 요건만 충족하면 돼요.",
  },
  {
    q: "자녀가 대학생 알바로 500만원 넘게 벌면 공제가 안 되나요?",
    a: "총급여 500만원 이하여야 소득 요건을 충족해요. 500만원을 넘기면 기본공제는 안 돼요. 다만 교육비 세액공제는 소득 요건과 별개로 나이만 충족하면 받을 수 있는 경우가 있으니 구분해서 따져봐야 해요.",
  },
  {
    q: "육아휴직 중인 배우자도 공제받을 수 있나요?",
    a: "네, 육아휴직급여는 비과세소득이라 소득금액에 포함되지 않아요. 다른 소득이 없다면 배우자 기본공제를 받을 수 있어요. 실업급여, 산재보험급여도 마찬가지예요.",
  },
  {
    q: "부모님을 형제와 나눠서 공제받을 수 있나요?",
    a: "안 돼요. 한 사람을 여러 명이 중복으로 공제받을 수 없어요. 부모님 1명당 자녀 1명만 공제받을 수 있고, 소득이 높은 쪽이 공제받는 게 절세에 유리해요. 중복 공제 적발 시 가산세가 부과돼요.",
  },
  {
    q: "따로 사는 부모님도 공제받을 수 있나요?",
    a: "직계존속은 따로 살아도 기본공제가 가능해요. 동거 요건이 없거든요. 단 형제자매는 주민등록상 같은 주소에 있어야 해요. 부모님이 지방에 계셔도 나이·소득 요건만 맞으면 공제 가능해요.",
  },
  {
    q: "형제자매 공제는 왜 동거 조건이 붙나요?",
    a: "직계존비속(부모·자녀)과 달리 형제자매는 별도 생계를 꾸릴 가능성이 높기 때문이에요. 실제로 생계를 같이 하는지 확인하려는 취지예요. 동생이 지방 대학 기숙사에 있는 건 일시적 퇴거라서 동거로 인정돼요.",
  },
];

const RELATED = [
  { slug: "연말정산-의료비-공제-한도", title: "의료비 공제 한도와 공제율", description: "총급여 3% 초과분부터 15% 공제." },
  { slug: "연말정산-결정세액", title: "결정세액 계산 방법", description: "산출세액에서 세액공제를 빼면 결정세액." },
  { slug: "연말정산-자주-묻는-질문", title: "연말정산 자주 묻는 질문", description: "매년 반복되는 질문 10가지 정리." },
];

export default function Page() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecks(p => ({ ...p, [id]: !p[id] }));

  const items = [
    { id: "age", label: "부양가족이 만 60세 이상(존속) 또는 만 20세 이하(비속)인가요?" },
    { id: "income", label: "연간 소득금액이 100만원 이하(총급여 500만원 이하)인가요?" },
    { id: "dup", label: "다른 가족이 같은 사람을 이미 공제받고 있지 않나요?" },
    { id: "doc", label: "가족관계증명서(또는 주민등록등본)를 준비할 수 있나요?" },
  ];

  const allChecked = items.every(it => checks[it.id]);
  const someChecked = items.some(it => checks[it.id]) && !allChecked;

  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 인적공제 · 부양가족</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 기본공제, 누가 대상일까?<br />
        나이·소득 요건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부모님을 부양가족으로 올릴 수 있는 건지 매년 헷갈려요."
      </p>
      <p style={body}>
        기본공제는 본인과 부양가족에 대해 <strong>1인당 150만원씩 소득에서 빼주는</strong> 제도예요. 4인 가족이면 600만원, 세율 24% 구간이면 <strong>144만원 절세</strong> 효과가 있어요.
        핵심은 나이 요건과 소득 요건 두 가지고, 대상별로 조건이 다르니까 아래에서 체크해 보세요.
      </p>

      <Divider />

      <H2>대상별 나이·소득 요건이 달라요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제50조</a>에 따른 기본공제 대상과 요건이에요. 2025년 귀속(2026년 신고) 기준이에요.
      </p>

      <SectionBadge>대상별 공제 요건</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>나이 요건</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득 요건</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>동거</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["본인", "없음", "없음", "—"],
              ["배우자", "없음", "100만원 이하", "—"],
              ["부모·조부모", "만 60세 이상", "100만원 이하", "불필요"],
              ["자녀·손자녀", "만 20세 이하", "100만원 이하", "불필요"],
              ["형제자매", "20세↓ 또는 60세↑", "100만원 이하", "필수"],
            ].map(([who, age, income, live], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{who}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{age}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{income}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{live}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        소득 요건 판단 기준{"\n"}
        · 근로소득만 있으면: 총급여 500만원 이하{"\n"}
        · 사업소득: 수입 - 필요경비 = 100만원 이하{"\n"}
        · 비과세소득(육아휴직급여, 실업급여 등)은 소득에 포함 안 돼요
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>우리 가족이 공제 대상인지 확인해 보세요</H2>
      <p style={body}>
        아래 4가지 항목을 모두 충족하면 기본공제를 받을 수 있어요. 장애인이면 나이 요건은 면제되니까 소득 요건만 보면 돼요.
      </p>

      <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 18px", marginBottom: 20, border: "1px solid #e5e7eb" }}>
        {items.map(it => (
          <label key={it.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14, cursor: "pointer" }}>
            <input type="checkbox" checked={!!checks[it.id]} onChange={() => toggle(it.id)}
              style={{ marginTop: 3, accentColor: "#1D9E75", width: 18, height: 18 }} />
            <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{it.label}</span>
          </label>
        ))}
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8,
          background: allChecked ? "#E1F5EE" : someChecked ? "#FEF9C3" : "#f3f4f6",
          color: allChecked ? "#085041" : someChecked ? "#92400E" : "#6b7280",
          fontSize: 14, fontWeight: 600 }}>
          {allChecked ? "기본공제 대상이에요! 회사에 부양가족 공제 신고서를 제출하세요." :
           someChecked ? "일부 충족이에요. 나머지 항목도 확인해 보세요." :
           "위 항목을 하나씩 체크해 보세요."}
        </div>
      </div>

      <Divider />

      <H2>장애인이면 나이 제한이 사라져요</H2>
      <p style={body}>
        세법상 장애인에 해당하면 나이 요건 없이 소득 요건만 충족하면 기본공제를 받을 수 있어요. 부모님이 만 60세 미만이어도, 자녀가 만 20세를 넘어도 장애인이면 계속 공제 가능해요.
      </p>

      <BorderBox>
        <strong>세법상 장애인 범위 (생각보다 넓어요)</strong>{"\n"}
        · 장애인복지법 등록 장애인{"\n"}
        · 국가유공자 상이자{"\n"}
        · 암, 치매, 중풍, 난치병 등 항시 치료가 필요한 중증환자{"\n"}
        → 병원에서 '장애인증명서'를 발급받으면 세법상 장애인으로 인정{"\n"}
        → 기본공제 150만원 + <a href="/w/연말정산-장애인-공제" style={{ color: "#1D9E75" }}>장애인 추가공제</a> 200만원 = 350만원 공제
      </BorderBox>

      <p style={body}>
        부모님이 장애인이고 만 70세 이상이면 기본공제 150만원 + 장애인 추가공제 200만원 + 경로우대 추가공제 100만원 = <strong>450만원 소득공제</strong>가 가능해요. 놓치면 아까운 금액이에요.
      </p>

      <Divider />

      <H2>중복 공제하면 가산세가 나와요</H2>
      <p style={body}>
        한 부양가족을 여러 명이 각자 공제받는 건 안 돼요. 부모님을 형제 둘이 나눠서 공제하다 적발되면 <strong>과소납부 가산세</strong>가 부과돼요.
        맞벌이 부부도 자녀를 남편·아내가 각각 공제하면 안 되고, 한 명이 100% 공제받아야 해요.
      </p>

      <GreenBox>
        맞벌이 부부 공제 배분 팁{"\n"}
        · 인적공제(부모·자녀): 소득 높은 쪽이 유리{"\n"}
        · <a href="/w/연말정산-의료비-공제-한도" style={{ color: "#085041" }}>의료비 공제</a>: 소득 낮은 쪽이 유리 (3% 기준 넘기 쉬움){"\n"}
        · 기본공제 없이 의료비만 따로 공제는 불가능
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.nts.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>국세청</a>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>소득세법</a>
        <a href="https://www.hometax.go.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>홈택스</a>
      </div>

      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 연말정산 기준으로 작성됐어요. 세법 개정에 따라 내용이 달라질 수 있으니 국세청 공식 자료를 함께 참고하세요." />
    </ArticleLayout>
  );
}
