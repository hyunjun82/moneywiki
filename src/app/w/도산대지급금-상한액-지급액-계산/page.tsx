"use client";

// Q1. 회사가 파산해서 밀린 임금·퇴직금을 도산대지급금으로 얼마나 받을 수 있는지 확인하려는 근로자
// Q2. 연령별 상한액을 확인하고 근로복지공단에 도산대지급금을 신청한다
// Q3. 연령별 상한액(최대 2,100만원), 항목별 계산(임금·퇴직금·휴업수당), 간이대지급금 차이, 신청 기한
// Q4. 비교 테이블(연령별 상한) + GreenBox(핵심 요약) + CompareTable(도산vs간이) + Steps(신청) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "도산 사실 확인을 받으세요",
    desc: "법원의 파산·회생 결정이 있거나, 고용노동부에 '도산 등 사실인정'을 신청해서 확인을 받아야 해요. 사실인정은 관할 근로감독관에게 신청하고, 보통 2~3주 소요돼요.",
    tip: "법원 파산 결정 시 별도 사실인정 불필요",
  },
  {
    title: "근로복지공단에 대지급금을 신청하세요",
    desc: "근로복지공단(comwel.or.kr)에 체불확인서, 도산 확인서, 신분증을 첨부해서 신청해요. 온라인 신청도 가능해요. 공단에서 체불 금액과 상한액을 대조해서 지급액을 결정해요.",
    link: { label: "근로복지공단", href: "https://www.comwel.or.kr" },
  },
  {
    title: "지급까지 약 2~4주 소요돼요",
    desc: "신청이 접수되면 공단에서 심사 후 2~4주 내에 지급해요. 상한액을 초과하는 금액은 파산 배당이나 회생절차에서 별도로 청구해야 해요. 신청 기한은 도산 확인 후 2년 이내예요.",
    tip: "간이대지급금은 퇴직 후 1년 이내가 기한",
  },
];

const FAQS = [
  {
    q: "도산대지급금 2,100만원은 모든 연령에 동일한가요?",
    a: "아니에요. 연령에 따라 달라요. 30세 미만은 약 1,100만원, 30~39세는 약 1,400만원, 40~49세는 약 1,800만원, 50세 이상이 최대 약 2,100만원이에요. 매년 최저임금 변동에 따라 조정돼요.",
  },
  {
    q: "임금과 퇴직금 중 뭐가 먼저 지급되나요?",
    a: "항목 간 우선순위는 없어요. 합산해서 연령별 상한 이내이면 전액 지급되고, 초과하면 공단과 협의해서 배분해요. 실무에서는 생계와 직결되는 임금을 먼저 충당하는 경향이 있어요.",
  },
  {
    q: "상한액을 초과하는 금액은 어떻게 받나요?",
    a: "파산 배당이나 회생절차에서 채권 신고를 해서 받아야 해요. 근로자의 임금채권은 최우선변제권이 있어서 다른 채권자보다 먼저 배당받을 가능성이 높아요.",
  },
  {
    q: "간이대지급금 700만원을 이미 받았는데 도산대지급금도 받을 수 있나요?",
    a: "간이대지급금을 받은 후 회사가 도산하면 도산대지급금을 추가로 신청할 수 있어요. 다만 이미 받은 간이대지급금은 도산대지급금에서 공제돼요. 이중 수급은 안 돼요.",
  },
  {
    q: "도산대지급금 신청 기한이 언제까지인가요?",
    a: "도산 확인(법원 결정 또는 사실인정) 후 2년 이내에 신청해야 해요. 기한을 놓치면 청구권이 소멸돼요. 회사가 도산하면 바로 근로복지공단에 문의하는 게 좋아요.",
  },
  {
    q: "퇴직연금(DB/DC)도 도산대지급금에 포함되나요?",
    a: "퇴직연금은 별도 관리(금융기관 적립)라서 회사가 파산해도 보호돼요. 도산대지급금은 퇴직연금이 아닌 퇴직금(법정퇴직금) 체불에 대해 지급돼요. DB형 미적립분이 체불되면 대지급금 신청 대상이에요.",
  },
];

const RELATED = [
  { slug: "간이대지급금-지급액-상한액", title: "간이대지급금 700만원 한도", description: "회사 운영 중 체불 시 활용하는 제도." },
  { slug: "도산대지급금-신청-방법-절차", title: "도산대지급금 신청 방법", description: "신청 서류와 절차 단계별 안내." },
  { slug: "대지급금-퇴직금-DB-DC-퇴직연금", title: "퇴직연금 체불과 대지급금", description: "DB·DC형 미적립분 대지급금 청구법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>노동 · 임금채권 · 도산대지급금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        도산대지급금, 얼마나 받을 수 있나요?<br />
        연령별 상한액과 지급액 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "회사가 파산했어요. 밀린 임금이랑 퇴직금을 도산대지급금으로 받을 수 있다는데, 얼마나 나오나요?"
      </p>
      <p style={body}>
        도산대지급금은 연령에 따라 <strong>최대 2,100만원</strong>까지 받을 수 있어요. <a href="/w/간이대지급금-지급액-상한액" style={{ color: "#1D9E75", textDecoration: "underline" }}>간이대지급금</a>(700만원)보다 3배 높은 한도예요.
        <a href="https://www.law.go.kr/법령/임금채권보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법 시행령</a>에 따라 임금·퇴직금·휴업수당을 합산해서 상한 내에서 지급돼요.
      </p>

      <Divider />

      <H2>연령별 상한액이 다르게 적용돼요</H2>
      <p style={body}>
        나이가 많을수록 상한이 높아요. 장기 근속자를 보호하려는 취지예요. 아래는 2026년 기준 참고 금액이고, 매년 최저임금 변동에 따라 조정돼요.
      </p>

      <SectionBadge>2026년 연령별 도산대지급금 상한액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>연령</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>합산 상한액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["30세 미만", "최대 약 1,100만원"],
              ["30~39세", "최대 약 1,400만원"],
              ["40~49세", "최대 약 1,800만원"],
              ["50세 이상", "최대 약 2,100만원"],
            ].map(([age, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{age}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        항목별 상한 기준{"\n"}
        · 임금: 월 최저임금 환산액 x 최대 3개월{"\n"}
        · 퇴직금: 월 기준액 x 재직기간(연령별 상한 내){"\n"}
        · 휴업수당: 월 최저임금의 70% x 최대 3개월{"\n"}
        → 항목 합산이 연령별 상한 초과 시 상한까지만 지급
      </GreenBox>

      <CategoryButton label="노동 정보" count={8} href="/category/노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>도산대지급금과 간이대지급금, 뭐가 다른가요?</H2>
      <p style={body}>
        두 제도의 핵심 차이는 <strong>회사가 파산했는지 여부</strong>예요.
      </p>

      <SectionBadge>두 제도 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>도산대지급금</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>간이대지급금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["요건", "법원 파산/회생 또는 도산인정", "회사 운영 중 체불"],
              ["상한액", "최대 2,100만원", "700만원"],
              ["신청 기한", "도산 확인 후 2년", "퇴직 후 1년"],
              ["처리 속도", "2~4주", "1~2주"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        회사가 도산했다면 도산대지급금이 훨씬 유리해요. 상한이 3배 높으니까요. 회사가 운영 중인데 임금만 안 주는 상황이면 간이대지급금을 신청하세요.
      </p>

      <Divider />

      <H2>도산대지급금 신청은 이렇게 해요</H2>
      <p style={body}>
        도산 확인부터 지급까지 보통 1~2개월이 걸려요. 기한(2년)을 놓치면 청구권이 사라지니까 빨리 움직이세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <a href="https://www.law.go.kr/법령/임금채권보장법시행령" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>임금채권보장법 시행령</a>
        <a href="https://www.comwel.or.kr" style={{ fontSize: 12, color: "#6b7280", textDecoration: "underline" }}>근로복지공단</a>
      </div>

      <Disclaimer text="이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 상한액은 매년 최저임금에 따라 변동되니 근로복지공단에서 최신 금액을 조회해 보세요." />
    </ArticleLayout>
  );
}
