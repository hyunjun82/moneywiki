"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산에서 부양가족 인적공제를 최대한 받고 싶은데, 부모님·자녀 요건이 정확히 뭔지 모르는 상황이에요.
// Q2. 부양가족별 나이·소득 요건을 확인하고, 누락 없이 등록해서 공제를 최대화하는 행동.
// Q3. 1인당 150만원, 나이 요건(60세↑/20세↓), 소득 요건(100만원↓), 추가공제(경로100만·장애인200만·부녀자50만·한부모100만), 중복공제 불가.
// Q4. GreenBox(핵심 요약) + BorderBox(계산 예시) + Checklist(등록 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const REG_CHECKS = [
  "배우자: 나이 제한 없음, 연간 소득 100만원 이하(근로소득만이면 총급여 500만원 이하)",
  "부모님: 만 60세 이상 + 연간 소득 100만원 이하 (국민연금은 소득에서 제외)",
  "자녀: 만 20세 이하 + 연간 소득 100만원 이하",
  "형제자매: 만 60세 이상 또는 만 20세 이하 + 소득 100만원 이하",
  "장애인 가족: 나이 제한 없음 (기본공제 + 추가공제 200만원)",
  "중복 불가 — 형제·부부 중 한 쪽에서만 등록 (소득 높은 쪽이 유리)",
];

const FAQS = [
  { q: "인적공제가 뭔가요?", a: "본인과 부양가족 수만큼 1인당 150만원씩 소득에서 빼주는 거예요. 4인 가족이면 600만원 소득공제돼요." },
  { q: "부모님이 국민연금 받아도 공제받을 수 있나요?", a: "국민연금·기초연금은 소득에서 제외돼요. 다른 소득(임대·금융 등)이 연간 100만원 넘지 않으면 공제 가능해요." },
  { q: "자녀가 아르바이트하면 공제 못 받나요?", a: "자녀의 총급여가 500만원(또는 연간 소득합계 100만원)을 넘으면 공제 대상에서 빠져요." },
  { q: "따로 사는 부모님도 공제받을 수 있나요?", a: "동거하지 않아도 실제로 부양하면 공제받을 수 있어요. 다만 다른 형제가 이미 등록했으면 중복 불가예요." },
  { q: "형제끼리 누가 공제받는 게 유리한가요?", a: "보통 소득이 높은 쪽이 유리해요. 세율이 높으니까 같은 공제액이라도 절세 효과가 크거든요." },
  { q: "추가공제는 뭐가 있나요?", a: "경로우대(70세↑) 100만원, 장애인 200만원, 부녀자 50만원, 한부모 100만원이 있어요. 기본공제 위에 더 받는 거예요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제50조 (기본공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제51조 (추가공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 인적공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        인적공제, 1인당 150만원씩<br />
        부양가족 요건과 추가공제 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부양가족이 많으면 세금이 줄어든다는 건 아시죠?
        1인당 150만원씩 소득에서 빼줘요. 본인 포함 4인 가족이면 600만원 공제예요.
        여기에 경로우대·장애인 추가공제까지 더하면 절세 효과가 꽤 커요.
      </p>

      <Divider />

      <H2>기본공제 대상, 누가 해당되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제50조</a>에 따르면
        본인·배우자·부모·자녀·형제자매가 기본공제 대상이에요. 나이와 소득 요건을 모두 충족해야 해요.
      </p>

      <GreenBox>
        인적공제 핵심 요건이에요.<br />
        · 1인당 <strong>150만원</strong> 소득공제<br />
        · 나이 요건: 부모 만 60세↑, 자녀 만 20세↓ (배우자·장애인은 나이 무관)<br />
        · 소득 요건: 연간 소득합계 100만원↓ (근로소득만이면 총급여 500만원↓)<br />
        · 국민연금·기초연금은 소득에서 제외
      </GreenBox>

      <p style={body}>
        2025년 연말정산 기준으로 1965년 12월 31일 이전 출생한 부모님(만 60세),
        2005년 1월 1일 이후 출생한 자녀(만 20세)가 대상이에요.
      </p>

      <Divider />

      <H2>추가공제, 더 받을 수 있나요?</H2>
      <p style={body}>
        기본공제 대상이면 추가공제도 함께 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제51조</a>에서 규정하고 있어요.
      </p>

      <BorderBox>
        추가공제 금액 정리예요.<br /><br />
        <strong>경로우대</strong>: 만 70세 이상 부양가족 1인당 <strong>100만원</strong><br />
        <strong>장애인</strong>: 장애인 1인당 <strong>200만원</strong> (나이 제한 없음)<br />
        <strong>부녀자</strong>: 여성 세대주 또는 배우자 있는 여성 <strong>50만원</strong><br />
        <strong>한부모</strong>: 배우자 없이 자녀 부양 <strong>100만원</strong><br /><br />
        예) 75세 장애인 부모님 부양 시:<br />
        기본공제 150만원 + 경로우대 100만원 + 장애인 200만원 = <strong>450만원</strong>
      </BorderBox>

      <Divider />

      <H2>등록 전에 꼭 확인하세요</H2>
      <p style={body}>
        나이·소득 요건을 잘못 판단하면 과다공제로 추징당할 수 있어요.
        아래 체크리스트로 하나씩 확인하세요.
      </p>

      <SectionBadge>부양가족 등록 체크리스트</SectionBadge>
      <Checklist items={REG_CHECKS} />

      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        부양가족 정보가 자동 조회돼요. 처음 등록하는 가족이면 주민등록등본·가족관계증명서를 제출해야 할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준(2025년 귀속) 소득세법·국세청 자료를 바탕으로 작성했어요. 인적공제 요건과 금액은 세법 개정 시 달라질 수 있으니 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
