"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업이나 휴직으로 국민연금을 못 낸 기간이 있어서 나중에 연금이 줄어들까 걱정하는 상황
// Q2. 추납 가능 기간과 보험료를 확인하고 국민연금공단에 추납 신청을 완료한다
// Q3. 추납 조건(현재 가입자+납부예외), 보험료 계산(신청 당시 기준소득월액×9%), 최대 119개월, 분할납부
// Q4. GreenBox(결론) + EligibilityChecker 대신 BorderBox(조건 요약) + Steps(신청 절차) + 계산 테이블 + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "추납 가능 기간을 조회하세요",
    desc: "국민연금공단 홈페이지(nps.or.kr)나 '내 곁에 국민연금' 앱에서 내 납부예외 기간과 추납 가능 개월 수를 확인할 수 있어요. 가까운 지사에 방문하거나 1355 콜센터로 전화해도 돼요.",
    link: { label: "국민연금공단 바로가기", href: "https://www.nps.or.kr" },
  },
  {
    title: "추납 보험료를 확인하세요",
    desc: "추납 보험료는 신청 당시 기준소득월액의 9%예요. 과거 금액이 아니라 지금 기준이에요. 기준소득월액이 300만원이면 월 27만원, 3년(36개월) 추납 시 총 972만원이에요.",
  },
  {
    title: "추납 신청서를 제출하세요",
    desc: "온라인(공단 홈페이지/앱), 방문(지사), 전화(1355) 세 가지 방법으로 신청 가능해요. 신분증만 있으면 돼요. 신청서는 현장에서 작성할 수 있어요.",
  },
  {
    title: "납부 방법을 선택하세요",
    desc: "일시납과 분할납부 중 선택해요. 분할납부는 최대 60회까지 가능하고 이자가 붙지 않아요. 60개월 미만이면 추납 신청 개월 수만큼 분할할 수 있어요.",
  },
];

const FAQS = [
  { q: "추납하면 연금이 얼마나 늘어나요?", a: "가입기간 1년이 늘어날 때마다 연금이 약 5%씩 증가해요. 5년 추납하면 월 수십만 원이 늘어날 수 있어요. 정확한 금액은 국민연금공단에서 예상연금액을 조회하면 확인할 수 있어요." },
  { q: "분할납부하면 이자가 붙나요?", a: "안 붙어요. 추납 분할납부는 이자 없이 원금만 내면 돼요. 한꺼번에 내기 부담스러우면 분할이 유리하죠." },
  { q: "체납된 보험료도 추납할 수 있나요?", a: "아니에요. 체납은 추납 대상이 아니에요. 체납은 내야 할 보험료를 안 낸 거라서 별도로 납부해야 해요. 추납은 납부예외 기간만 해당돼요." },
  { q: "연금 수령 중에도 추납할 수 있나요?", a: "안 돼요. 연금을 받기 시작하면 추납을 신청할 수 없어요. 수령 전에 미리 신청해야 해요." },
  { q: "소득이 없는 지역가입자도 추납할 수 있나요?", a: "네, 가능해요. 본인이 원하는 금액을 기준으로 추납할 수 있어요. 최저 기준소득월액(약 39만원) 이상이면 돼요." },
  { q: "2026년부터 추납 기준이 바뀌었나요?", a: "추납 보험료 산정 기준이 '신청한 달'에서 '납부 기한이 속하는 달'로 변경됐어요. 보험료율 인상 전에 납부하면 인상 전 요율이 적용돼요." },
];

const REFS = [
  { category: "기관", items: [
    { label: "국민연금공단 추납 안내", url: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0047M0.do" },
    { label: "국민연금 내 연금 조회", url: "https://www.nps.or.kr" },
  ]},
  { category: "법령", items: [
    { label: "국민연금법", url: "https://www.law.go.kr/법령/국민연금법" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>국민연금 · 노후 준비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 못 낸 기간, 나중에 낼 수 있을까?<br />
        추납제도 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업이나 휴직으로 국민연금을 못 낸 기간이 있으면 나중에 연금이 줄어들까 걱정되시죠?
      </p>
      <p style={body}>
        그 기간 보험료를 나중에 낼 수 있어요. <strong>추후납부(추납) 제도</strong>예요.
        추납하면 가입기간이 늘어나서 받는 연금이 많아져요. <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>에서 온라인으로 신청 가능하고, 분할납부도 돼요.
      </p>

      <Divider />

      <H2>추납 조건은 어떻게 되나요?</H2>
      <p style={body}>
        현재 국민연금에 가입되어 있으면서, 과거에 납부예외 승인을 받은 기간이 있어야 해요. 직장가입자든 지역가입자든 상관없어요.
      </p>

      <GreenBox title="추납 신청 자격">
        {"1. 현재 국민연금 가입자 (소득 신고 또는 임의가입 중)\n2. 납부예외 기간이 있을 것 (실업·휴직 등)\n3. 과거 1개월 이상 보험료 납부 이력이 있을 것\n4. 아직 연금을 수령하기 전일 것"}
      </GreenBox>

      <SectionBadge>추납 가능·불가 구분</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>추납 가능</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>추납 불가</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["납부예외 기간", "O", "-"],
              ["적용제외 기간", "일부 O", "일부 X"],
              ["체납 기간", "-", "X (별도 납부)"],
              ["미가입 기간", "-", "X"],
            ].map(([type, yes, no], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 700 }}>{yes}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#ef4444" }}>{no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        추납 한도는 <strong>최대 119개월(약 10년)</strong>이에요. 납부예외 기간이 15년이어도 119개월분까지만 추납 가능해요.
      </p>

      <Divider />

      <H2>추납 보험료는 얼마나 드나요?</H2>
      <p style={body}>
        추납 보험료는 <strong>납부 기한이 속하는 달의 기준소득월액 x 9%</strong>로 계산해요. 과거 시점 금액이 아니라 현재 기준이에요. <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법</a>에서 이 산정 방식을 규정하고 있어요.
      </p>

      <SectionBadge>기준소득월액별 추납 비용</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기준소득월액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>월 보험료</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>3년(36개월)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>5년(60개월)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["200만원", "18만원", "648만원", "1,080만원"],
              ["300만원", "27만원", "972만원", "1,620만원"],
              ["400만원", "36만원", "1,296만원", "2,160만원"],
            ].map(([income, monthly, y3, y5], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{income}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{monthly}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{y3}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{y5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        <strong>분할납부 조건</strong>{"\n"}
        {"· 최대 60회 분할 가능 (이자 없음)\n· 60개월 미만 신청 시 → 신청 개월 수만큼 분할\n· 한꺼번에 내도 되고, 나눠 내도 금액은 동일해요"}
      </BorderBox>

      <Divider />

      <H2>신청은 어디서 하나요?</H2>
      <p style={body}>
        온라인, 방문, 전화 세 가지 방법으로 신청 가능해요. 필요한 서류는 신분증뿐이에요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        <a href="/w/국민연금-조기수령-감액률-신청조건-손익분기점" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금 조기수령</a>을 고려하고 있다면 추납으로 가입기간을 먼저 채우는 게 유리할 수 있어요. 가입기간이 길수록 연금액이 늘어나니까요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민연금법에 따라 작성됐어요. 개인별 추납 가능 기간과 보험료는 국민연금공단(1355)에서 정확히 확인하세요." />
    </div>
  );
}
