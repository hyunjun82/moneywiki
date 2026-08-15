"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 0~1세 아이를 키우고 있거나 곧 출산 예정인데, 부모급여가 얼마인지, 어린이집 보내면 어떻게 되는지, 어떻게 신청하는지 알고 싶은 부모예요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 부모급여 금액을 확인하고, 출생 60일 이내에 복지로·정부24에서 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 0세 월 100만원, 1세 월 50만원, 어린이집 이용 시 차액 계산, 60일 이내 소급, 행복출산 원스톱서비스, 비과세.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 금액) + 어린이집 차액 테이블 + Steps(신청 절차) + BorderBox(필요서류) + Checklist(신청 전 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "출생신고", desc: "병원이나 주민센터에서 출생신고를 해요.", tip: "행복출산 원스톱서비스로 부모급여 동시 신청 가능" },
  { title: "부모급여 신청", desc: "복지로(bokjiro.go.kr) 또는 정부24(gov.kr)에서 온라인 신청해요.", tip: "온라인은 친부모만 가능. 다른 보호자는 읍면동 방문" },
  { title: "통장 사본 제출", desc: "아이 명의 또는 부모 명의 통장 사본을 제출해요." },
  { title: "매달 지급", desc: "신청 승인 후 매달 지정일에 통장으로 입금돼요.", tip: "시군구마다 지급일이 달라요 (보통 15~20일)" },
];

const CHECKLIST = [
  "출생신고를 완료했는지 확인",
  "출생일로부터 60일 이내인지 확인 (소급 지원 조건)",
  "아이 또는 부모 명의 통장 준비",
  "어린이집 이용 여부 결정 (차액 지급 방식 달라짐)",
  "복지로 또는 정부24 회원가입·간편인증 준비",
];

const FAQS = [
  { q: "부모급여는 몇 살까지 받을 수 있나요?", a: "0세(0~11개월)와 1세(12~23개월) 총 2년간 받아요. 만 2세부터는 부모급여 대신 아동수당(월 10만원)으로 전환돼요." },
  { q: "어린이집을 보내면 부모급여를 못 받나요?", a: "아니에요. 보육료를 먼저 지원받고 차액을 현금으로 받아요. 0세는 보육료 58만 4천원을 빼고 41만 6천원을 현금으로 받아요." },
  { q: "60일 넘겨서 신청하면 어떻게 되나요?", a: "신청한 달부터만 받아요. 이전 달은 소급 안 되니까, 출생신고할 때 동시에 신청하는 게 가장 좋아요." },
  { q: "쌍둥이면 2명 다 받나요?", a: "네, 자녀 1명당 각각 받아요. 쌍둥이면 0세 기준 월 200만원(100만원 × 2)이에요." },
  { q: "부모급여 받으면 세금을 내나요?", a: "안 내요. 소득에 포함되지 않아서 연말정산이나 종합소득세 신고할 필요 없어요." },
  { q: "행복출산 원스톱서비스가 뭔가요?", a: "출생신고와 함께 부모급여·아동수당·양육수당 등을 한 번에 신청할 수 있는 서비스예요. 병원이나 주민센터에서 이용할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 부모급여 지원 안내", url: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004657" },
    { label: "정부24 부모급여 신청", url: "https://www.gov.kr/portal/service/serviceInfo/135200000143" },
    { label: "보건복지부 부모급여 정책", url: "https://www.mohw.go.kr" },
  ] },
];

const RELATED = [
  { slug: "첫만남-이용권-바우처-사용처-및-잔액-조회", title: "첫만남 이용권 바우처 사용처", description: "출산 시 받는 200만원 바우처, 어디서 쓸 수 있는지 확인하세요." },
  { slug: "아동수당-지급기준-및-신청방법", title: "아동수당 지급기준과 신청방법", description: "만 8세까지 받는 월 10만원 아동수당이에요." },
  { slug: "2026년-육아휴직급여", title: "2026년 육아휴직급여", description: "직장인이라면 육아휴직급여도 같이 챙기세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부모급여 · 복지 · 출산지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 부모급여, 0세 100만원·1세 50만원<br />
        신청방법·어린이집 차액까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이가 태어났거나 곧 태어나는데, 부모급여가 정확히 얼마인지 궁금하시죠?
        2026년 부모급여는 0세 <strong>월 100만원</strong>, 1세 <strong>월 50만원</strong>이에요.
        출생 후 60일 안에 신청하면 출생월부터 소급으로 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* 섹션 1: 핵심 금액 */}
      <H2>0세 100만원, 1세 50만원이에요</H2>
      <p style={body}>
        <a href="https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004657" style={{ color: "#1D9E75", textDecoration: "underline" }}>복지로</a>에 따르면 부모급여는 자녀 나이에 따라 금액이 달라요.
        2025년부터 정해진 금액이 2026년도 동일하게 유지되고 있어요.
        매달 지정일에 통장으로 입금돼요.
      </p>

      <GreenBox title="2026년 부모급여 지급 금액">
        만 0세 (0~11개월): <strong>월 100만원</strong><br />
        만 1세 (12~23개월): <strong>월 50만원</strong><br />
        총 지급 기간: 최대 <strong>24개월</strong> (0세 12개월 + 1세 12개월)
      </GreenBox>

      <p style={body}>
        0세 12개월간 받으면 총 1,200만원, 1세 12개월간 받으면 총 600만원이에요.
        2년간 합산 <strong>최대 1,800만원</strong>을 지원받는 셈이에요.
      </p>

      <Divider />

      {/* 섹션 2: 어린이집 차액 */}
      <H2>어린이집 보내면 차액을 현금으로 받아요</H2>
      <p style={body}>
        어린이집에 다니면 부모급여 대신 영유아보육료가 우선 지원돼요.
        그렇다고 부모급여를 못 받는 건 아니에요. 보육료를 빼고 남은 차액을 현금으로 받을 수 있어요.
        집에서 양육하면 전액 현금이에요.
      </p>

      <SectionBadge>양육 방식별 지급 금액 (월 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>나이</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>가정양육 (현금)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>어린이집 (보육료 + 차액)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["만 0세", "100만원 전액 현금", "보육료 58.4만원 + 차액 41.6만원"],
              ["만 1세", "50만원 전액 현금", "보육료 51.5만원 (차액 없음)"],
            ].map(([age, home, daycare], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{age}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{home}</td>
                <td style={{ padding: "9px 12px" }}>{daycare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        1세는 보육료(51.5만원)가 부모급여(50만원)보다 많아서 차액이 없어요.
        0세 때는 가정양육이 현금으로 더 많이 받는 구조예요.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      {/* 섹션 3: 60일 이내 소급 */}
      <H2>출생 후 60일 안에 신청하세요</H2>
      <p style={body}>
        부모급여에서 가장 중요한 숫자가 <strong>60일</strong>이에요.
        출생일로부터 60일 이내에 신청하면 출생월부터 소급으로 전액 지원받아요.
        60일이 지나면 신청한 달부터만 받을 수 있어서, 그 전 달은 날아가는 거예요.
      </p>

      <BorderBox>
        예시: 1월 10일 출생 → 3월 10일까지 신청하면 1월분부터 소급<br />
        → 6월에 신청하면? 1~5월분은 못 받고 6월분부터만 지급<br />
        → <strong>출생신고할 때 동시에 신청하는 게 가장 좋아요.</strong>
      </BorderBox>

      <Divider />

      {/* 섹션 4: 신청 방법 */}
      <H2>신청은 온라인이 가장 빨라요</H2>
      <p style={body}>
        <a href="https://www.bokjiro.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>복지로</a> 또는 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 온라인 신청이 가능해요.
        바쁜 부모님들은 행복출산 원스톱서비스를 이용하면 출생신고와 동시에 처리할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <SectionBadge>신청 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5: 세금·소득 */}
      <H2>세금 걱정은 안 해도 돼요</H2>
      <p style={body}>
        부모급여는 소득에 포함되지 않아요. 세금을 낼 필요가 없고, 연말정산이나 종합소득세 신고도 안 해도 돼요.
        건강보험료 산정에도 영향을 주지 않으니까, 받은 돈 그대로 아이에게 쓰면 돼요.
      </p>

      <GreenBox title="부모급여 비과세">
        · 소득세 비과세 (연말정산 신고 불필요)<br />
        · 건강보험료 산정 제외<br />
        · 기초생활보장 소득 산정에서 제외
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 보건복지부·복지로·정부24 자료를 바탕으로 작성됐어요. 신청 관련 문의는 보건복지상담센터 129로 전화하세요." />
    </ArticleLayout>
  );
}
