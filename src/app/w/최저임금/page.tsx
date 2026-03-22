"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 알바나 신입 직장인인데 2026년 최저임금이 얼마인지, 내 월급이 최저임금 이상인지 확인하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 2026년 시급·월급 기준을 확인하고, 수습 감액 해당 여부를 판단하고, 미달 시 고용노동부에 신고하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 시급 10,320원, 월급 약 215만원(209시간), 수습 감액 90%(단순노무직 불가), 산입범위(상여금 5%·복리후생 1%), 위반 시 3년 징역/2천만원 벌금, 신고 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 금액) + 표(시급·일급·주급·월급) + EligibilityChecker(수습 감액 해당 여부) + Steps(미달 신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const FAQS = [
  { q: "2026년 최저임금 시급이 얼마예요?", a: "10,320원이에요. 2025년 10,030원에서 290원(2.9%) 올랐어요." },
  { q: "월급으로 환산하면 얼마예요?", a: "주 40시간 기준 월 209시간으로 계산하면 2,156,880원이에요. 4대보험 공제 후 실수령액은 약 190~196만원 수준이에요." },
  { q: "수습사원인데 감액 적용받나요?", a: "1년 이상 계약이고 수습 3개월이면 10% 감액(시급 9,288원) 가능해요. 배달·경비·청소 같은 단순노무직은 감액 불가예요." },
  { q: "주휴수당을 안 주면 최저임금 위반인가요?", a: "주 15시간 이상 근무하면 주휴수당은 법정 의무예요. 안 주면 최저임금 미달로 볼 수 있어요." },
  { q: "최저임금 미달 신고하면 불이익 없나요?", a: "근로자 신고에 대한 불이익 처분은 불법이에요. 익명 신고도 가능하고, 신고 후 2~4주 내에 처리되는 편이에요." },
  { q: "알바비 현금으로 받으면 최저임금 적용 안 되나요?", a: "현금이든 계좌이체든 상관없어요. 근로를 제공하면 최저임금법이 적용돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 2026년 최저임금 고시", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" },
      { label: "최저임금법 (법제처)", url: "https://www.law.go.kr/법령/최저임금법" },
      { label: "최저임금위원회", url: "https://www.minimumwage.go.kr" },
    ],
  },
];

const ELIGIBILITY_ITEMS = [
  { id: "contract", label: "근로계약 기간이 1년 이상이에요" },
  { id: "probation", label: "입사 후 3개월 이내 수습 기간이에요" },
  { id: "notSimple", label: "단순노무직(배달·경비·청소·서빙)이 아니에요" },
  { id: "written", label: "계약서에 수습 감액 조건이 명시돼 있어요" },
];

const REPORT_STEPS = [
  { title: "고용노동부 민원마당 접속", desc: "minwon.moel.go.kr에 접속해서 '임금체불 진정' 메뉴를 선택해요.", tip: "비회원으로도 신고 가능해요" },
  { title: "진정서 작성", desc: "사업장명, 근무기간, 실제 받은 임금, 최저임금 미달 금액을 적어요.", tip: "근로계약서·급여명세서가 있으면 첨부하세요" },
  { title: "근로감독관 배정", desc: "신고 접수 후 근로감독관이 사업주에게 출석 요구서를 보내요." },
  { title: "조사 및 지급 명령", desc: "위반 확인 시 14일 내 지급 명령이 나와요. 불응 시 검찰 송치돼요.", tip: "대부분 2~4주 안에 미달액이 지급돼요" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제 · 근로 · 임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 최저임금 시급 10,320원<br />
        월급 환산·수습 감액·위반 처벌까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내 시급이 최저임금보다 높은 건지 낮은 건지 헷갈리시죠?
        2026년 최저임금은 시급 10,320원이고, 월급으로 환산하면 약 215만원이에요.
        수습 감액 조건, 산입범위, 위반 시 처벌까지 한 번에 정리해드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>시급·월급·주급은 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 고시</a> 기준으로
        2026년 최저임금은 시급 10,320원이에요. 2025년 10,030원에서 290원(2.9%) 올랐고요.
        17년 만에 노사 합의로 결정된 금액이에요.
      </p>

      <SectionBadge>2026년 최저임금 기준표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>금액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>산정 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["시급", "10,320원", "법정 최저 시급"],
              ["일급", "82,560원", "8시간 기준"],
              ["주급", "495,360원", "40시간 + 주휴 8시간"],
              ["월급", "2,156,880원", "209시간 기준"],
            ].map(([type, amount, basis], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{amount}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="실수령액은 다를 수 있어요">
        4대보험(국민연금·건강보험·고용보험·산재보험)을 공제하면 실수령액은 약 190~196만원이에요.
        근무시간이 주 40시간보다 적으면 월급도 비례해서 줄어들어요.
      </GreenBox>

      <Divider />

      <H2>수습 감액, 누가 해당되나요?</H2>
      <p style={body}>
        수습이라고 다 감액되는 건 아니에요.
        <a href="https://www.law.go.kr/법령/최저임금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>최저임금법 제5조</a>에서 감액 조건을 정하고 있어요.
        1년 이상 계약 + 수습 3개월 이내일 때 10% 감액(시급 9,288원)이 가능하지만,
        배달원·경비원·청소원 같은 단순노무직은 수습이라도 감액 불가예요.
      </p>

      <SectionBadge>수습 감액 해당 여부 확인</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="수습 감액 대상이에요. 시급 9,288원(10% 감액)을 적용받아요."
        partialMatchText="조건을 모두 충족해야 감액이 가능해요. 하나라도 안 되면 시급 10,320원 전액을 받아야 해요."
      />

      <BorderBox>
        감액 시 주의할 점이에요.<br />
        · 계약서에 &quot;수습기간 3개월, 90% 지급&quot;이라고 <strong>명시</strong>돼 있어야 해요<br />
        · 사후에 &quot;그때가 수습이었다&quot;고 주장하면 불법이에요<br />
        · 1년 미만 계약(알바 등)은 감액 자체가 불가능해요
      </BorderBox>

      <Divider />

      <H2>월급에 뭐가 포함되고, 뭐가 빠지나요?</H2>
      <p style={body}>
        기본급만으로 최저임금을 맞추지 않아도 돼요.
        상여금과 복리후생비 일부도 포함되거든요. 다만 연장·야간·휴일수당은 빠져요.
      </p>

      <SectionBadge>최저임금 산입범위</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>포함 여부</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["기본급·고정수당", "전액 포함", "-"],
              ["상여금", "일부 포함", "최저임금의 5% 초과분만"],
              ["복리후생비", "일부 포함", "최저임금의 1% 초과분만"],
              ["연장·야간·휴일수당", "제외", "별도 지급"],
              ["연차수당", "제외", "별도 지급"],
            ].map(([item, included, standard], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: included === "전액 포함" ? "#1D9E75" : included === "제외" ? "#ef4444" : "#d97706" }}>{included}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        예를 들어 상여금이 월 30만원이면, 최저임금(215만원)의 5%인 약 10.8만원을 초과하는 19.2만원만 산입돼요.
        나머지 10.8만원은 최저임금 계산에 포함되지 않아요.
      </p>

      <ArticleAd position="mid" />
      <Divider />

      <H2>위반하면 어떤 처벌을 받나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>과 최저임금법에 따라
        최저임금 미달 지급 시 <strong>3년 이하 징역 또는 2,000만원 이하 벌금</strong>이에요.
        반복 위반이면 징역형도 나올 수 있어요.
      </p>

      <BorderBox>
        추가 불이익이에요.<br />
        · 고용노동부 <strong>임금체불 사업주 명단 공개</strong> (사업장명·대표자·체불액)<br />
        · <strong>공공기관 입찰 3년 제외</strong><br />
        · 퇴직 후 미지급 임금에 대해 <strong>연 20% 지연이자</strong> 발생<br />
        · 근로자는 차액 + 지연이자를 민사소송으로 청구 가능
      </BorderBox>

      <Divider />

      <H2>최저임금 미달이면 어떻게 신고하나요?</H2>
      <p style={body}>
        고용노동부 민원마당에서 온라인으로 진정서를 제출하면 돼요.
        근로계약서가 없어도 국민연금 가입 이력으로 확인할 수 있어서 신고 가능해요.
      </p>

      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={REPORT_STEPS} />

      <Divider />

      <H2>연도별 최저임금은 얼마씩 올랐나요?</H2>
      <p style={body}>
        최근 5년간 추이를 보면 인상률이 점점 낮아지고 있어요.
        경제 상황과 노사 협상 결과에 따라 매년 달라지거든요.
      </p>

      <SectionBadge>최근 5년 최저임금 추이</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>시급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>인상률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월급 환산</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2022년", "9,160원", "5.1%", "약 191만원"],
              ["2023년", "9,620원", "5.0%", "약 201만원"],
              ["2024년", "9,860원", "2.5%", "약 206만원"],
              ["2025년", "10,030원", "1.7%", "약 210만원"],
              ["2026년", "10,320원", "2.9%", "약 215만원"],
            ].map(([year, wage, rate, monthly], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i === 4 ? "#f0faf6" : undefined }}>
                <td style={{ padding: "9px 12px", fontWeight: i === 4 ? 700 : 400 }}>{year}</td>
                <td style={{ padding: "9px 12px", fontWeight: i === 4 ? 700 : 400, color: i === 4 ? "#1D9E75" : undefined }}>{wage}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령과 고용노동부 자료를 바탕으로 작성했어요. 구체적인 임금 분쟁은 관할 노동청이나 노무사에게 상담받으세요." />
    </div>
  );
}
