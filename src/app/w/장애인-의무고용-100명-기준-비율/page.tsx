"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 직원이 100명 됐는데 장애인 의무고용 대상이라는 연락을 받아서, 몇 명 고용해야 하고 안 하면 부담금이 얼마인지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 의무고용 인원(3명)을 계산하고, 부담금과 장려금을 비교해서 장애인 채용 여부를 결정하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 의무고용률(3.1%), 계산법(소수점 버림), 부담금(미고용 1명당 125~209만원), 장려금(월 30~120만원), 신고 기한(1월 31일).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 숫자) + 계산 테이블 + BorderBox(부담금 계산) + Steps(채용 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const HIRE_STEPS = [
  { title: "한국장애인고용공단 문의", desc: "가장 쉬운 방법이에요. 공단(kead.or.kr)에서 무료로 채용 지원해주고 구직자를 추천해줘요." },
  { title: "직무 분석", desc: "어떤 업무를 맡길지 미리 정해요. 장애 유형에 맞는 직무를 찾는 게 중요하고, 공단에서 직무 분석도 도와줘요." },
  { title: "채용 및 근로계약", desc: "면접 후 채용하면 근로계약서를 작성해요. 장애인증명서도 함께 확보하세요." },
  { title: "고용장려금 신청", desc: "장애인 고용 후 익월에 공단 홈페이지에서 신청 가능해요. 승인되면 고용 달부터 소급 지급돼요." },
];

const FAQS = [
  { q: "직원 100명이면 장애인 몇 명 고용해야 하나요?", a: "최소 3명이에요. 100명 x 3.1% = 3.1명인데 소수점은 버리니까 3명이면 의무 이행이에요." },
  { q: "부담금은 얼마나 나오나요?", a: "미고용 인원에 따라 1명당 월 125만~209만원이에요. 3명 고용해야 하는데 0명이면 연 최소 4,500만원 이상 나올 수 있어요." },
  { q: "장애인 고용하면 지원금은 얼마 받나요?", a: "경증은 월 30~60만원, 중증은 월 60~120만원 고용장려금을 받아요. 중증 1명은 의무고용 2명으로 계산돼요." },
  { q: "99명이면 부담금 면제인가요?", a: "네, 상시근로자 100명 미만 기업은 부담금이 면제돼요. 정확히 100명이면 납부 대상이에요." },
  { q: "부담금 분할납부가 가능한가요?", a: "가능해요. 500만원 넘으면 2회 분할, 1,000만원 넘으면 4회 분할할 수 있어요." },
  { q: "명단 공개 같은 불이익도 있나요?", a: "고용률이 낮은 기업은 사업주 명단이 공개돼요. 공공기관 입찰에서도 불이익을 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "장애인고용촉진 및 직업재활법 — 법제처", url: "https://www.law.go.kr/법령/장애인고용촉진및직업재활법" },
      { label: "한국장애인고용공단 — 고용의무제도", url: "https://www.kead.or.kr/emplyobsys/cntntsPage.do?menuId=MENU0648" },
      { label: "부담금 신고납부 안내 — 한국장애인고용공단", url: "https://www.kead.or.kr/pymntinchr/cntntsPage.do?menuId=MENU0668" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 장애인 고용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직원 100명이면 장애인 몇 명?<br />
        의무고용 비율 3.1%와 부담금 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원이 100명 되니까 장애인 의무고용 대상이라는 연락 받으셨나요?
        100명 기업은 최소 3명 고용하면 되고, 안 지키면 연 수천만원 부담금이 나올 수 있어요.
        장려금을 받으면 오히려 이득이 될 수 있어요.
      </p>

      <Divider />

      <H2>의무고용률 3.1%, 계산은 이렇게</H2>
      <p style={body}>
        2026년 기준 민간기업(상시근로자 50명 이상)의 장애인 의무고용률은 3.1%예요.
        <a href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법" style={{ color: "#1D9E75" }}>장애인고용촉진법</a>에서 정한 비율이에요.
      </p>

      <GreenBox title="계산 공식">
        상시근로자 수 x 3.1% = 의무고용 인원 (소수점 버림)<br />
        100명 x 0.031 = 3.1명 → <strong>최소 3명</strong> 고용하면 의무 이행이에요.
      </GreenBox>

      <SectionBadge>직원 수별 의무고용 인원</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>상시근로자</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>계산</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>의무고용 인원</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["100명", "100 x 0.031 = 3.1", "3명"],
              ["150명", "150 x 0.031 = 4.65", "4명"],
              ["200명", "200 x 0.031 = 6.2", "6명"],
              ["300명", "300 x 0.031 = 9.3", "9명"],
            ].map(([emp, calc, req], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{emp}</td>
                <td style={{ padding: "9px 12px" }}>{calc}</td>
                <td style={{ padding: "9px 12px" }}>{req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>부담금, 안 지키면 이렇게 나와요</H2>
      <p style={body}>
        상시근로자 100명 이상 기업만 부담금을 내요. 99명이면 면제, 100명이면 납부 대상이에요.
        미고용 인원에 고용수준별 부담기초액을 곱해서 계산해요.
      </p>

      <BorderBox>
        <strong>부담금 계산 예시 (100명 기업)</strong><br />
        · 장애인 0명 고용 시: 3명 미달 x 월 약 125~209만원 x 12개월 = <strong>연 4,500~7,500만원</strong><br />
        · 장애인 1명 고용 시: 2명 미달 → <strong>연 3,000~5,000만원</strong><br />
        · 중증 장애인 1명 = 2명으로 계산, 1명만 고용해도 1명 미달로 줄어요<br />
        · 부담금 신고 기한은 매년 <strong>1월 31일</strong>, 늦으면 가산금 3%
      </BorderBox>

      <Divider />

      <H2>장려금, 고용하면 오히려 받아요</H2>
      <p style={body}>
        장애인을 고용하면 부담금을 안 내는 것뿐만 아니라 고용장려금도 받을 수 있어요.
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75" }}>한국장애인고용공단</a>에 신청하면 돼요.
      </p>

      <SectionBadge>고용장려금 지급 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>장애 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월 장려금</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>의무고용 산정</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["경증 장애인", "월 30~60만원", "1명으로 계산"],
              ["중증 장애인", "월 60~120만원", "2명으로 계산"],
            ].map(([type, amount, count], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{amount}</td>
                <td style={{ padding: "9px 12px" }}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>채용 절차, 이렇게 하면 돼요</H2>
      <p style={body}>
        장애인 채용이 어렵게 느껴질 수 있는데, 공단에서 무료로 도와줘요. 직무 분석부터 구직자 추천까지 지원해요.
      </p>

      <Steps steps={HIRE_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 장애인고용촉진법 및 한국장애인고용공단 자료를 바탕으로 작성됐어요. 부담금 기초액과 장려금은 매년 변경될 수 있으니 공단 홈페이지에서 확인하세요." />
    </ArticleLayout>
  );
}
