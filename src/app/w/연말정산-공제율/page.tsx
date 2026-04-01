"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산에서 항목별 공제율이 다르다는 건 알겠는데, 정확히 몇 %인지 모르는 상황이에요.
// Q2. 항목별 공제율을 비교해서 공제 효과가 큰 항목에 지출을 집중하는 행동.
// Q3. 소득공제(신용카드 15%~전통시장 40%), 세액공제(보험료 12%~월세 17%), 소득 구간별 차이.
// Q4. GreenBox(핵심 비교) + 비교표(항목별 공제율) + BorderBox(소득 구간별 차이) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const FAQS = [
  { q: "공제율이 높으면 무조건 좋은 건가요?", a: "네, 같은 금액을 써도 공제율이 높을수록 더 많이 돌려받아요. 체크카드(30%)가 신용카드(15%)보다 2배 유리해요." },
  { q: "대중교통 40%는 결제 수단 상관없나요?", a: "네, 신용카드든 체크카드든 현금이든 대중교통 이용금액은 모두 40% 공제율이 적용돼요." },
  { q: "연금저축 공제율은 왜 소득에 따라 다른가요?", a: "저소득자에게 더 큰 혜택을 주기 위해서예요. 총급여 5,500만원 이하면 16.5%, 초과하면 13.2%예요." },
  { q: "의료비 공제율 15%가 전부인가요?", a: "기본은 15%이고, 난임시술비는 20%, 미숙아·선천성 이상아 의료비는 20%로 더 높아요." },
  { q: "월세 공제율은 어떻게 되나요?", a: "총급여 5,500만원 이하면 17%, 5,500만원 초과~8,000만원 이하면 15%예요. 8,000만원 초과하면 월세 세액공제 대상이 아니에요." },
  { q: "헬스장·수영장 비용도 공제되나요?", a: "2025년 7월부터 총급여 7,000만원 이하면 30% 소득공제돼요. 300만원 한도 내에서 적용돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
    { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "홈택스 연말정산 간소화", url: "https://www.hometax.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 공제율</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 공제율, 항목별로 얼마?<br />
        소득공제·세액공제 한눈에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        같은 100만원을 써도 어디에 쓰느냐에 따라 환급금이 2~3배 차이 나요.
        신용카드 15%, 체크카드 30%, 전통시장 40%. 결제 습관만 바꿔도 환급금이 달라져요.
      </p>

      <Divider />

      <H2>카드 공제율, 어디가 유리할까?</H2>
      <p style={body}>
        소득공제는 지출액의 일정 비율을 소득에서 빼줘요. 공제율이 높을수록 같은 금액 써도 더 많이 돌려받아요.
      </p>

      <GreenBox title="카드·현금 공제율 비교">
        신용카드: <strong>15%</strong><br />
        체크카드·현금영수증: <strong>30%</strong> (신용카드의 2배)<br />
        전통시장·대중교통: <strong>40%</strong> (신용카드의 2.7배)
      </GreenBox>

      <SectionBadge>실제 환급 차이 (세율 24% 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>결제 수단</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>100만원 사용 시 공제액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>환급액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신용카드 (15%)", "15만원", "3.6만원"],
              ["체크카드 (30%)", "30만원", "7.2만원"],
              ["전통시장 (40%)", "40만원", "9.6만원"],
              ["대중교통 (40%)", "40만원", "9.6만원"],
            ].map(([method, deduction, refund], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{method}</td>
                <td style={{ padding: "9px 12px" }}>{deduction}</td>
                <td style={{ padding: "9px 12px" }}>{refund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>세액공제율은 어떻게 되나요?</H2>
      <p style={body}>
        세액공제는 납부한 금액의 일정 비율을 세금에서 직접 빼줘요. 소득공제보다 효과가 직접적이에요.
      </p>

      <SectionBadge>항목별 세액공제율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보험료", "12%", "100만원 한도"],
              ["의료비", "15%", "총급여 3% 초과분, 난임 20%"],
              ["교육비", "15%", "대학생 900만원 한도"],
              ["기부금", "15~40%", "1천만원 이하 15%, 3천만원 초과 40%"],
              ["연금저축", "13.2~16.5%", "5,500만원 이하 16.5%"],
              ["월세", "15~17%", "5,500만원 이하 17%, 1천만원 한도"],
            ].map(([item, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>총급여 5,500만원이 왜 중요한가요?</H2>
      <p style={body}>
        연금저축과 월세 공제율이 이 기준으로 달라져요. 경계선에 있으면 금액 차이가 상당해요.
      </p>

      <BorderBox>
        <strong>총급여 5,500만원 기준 비교</strong><br />
        · 연금저축 600만원 납입 시: 이하 16.5% = <strong>99만원</strong> / 초과 13.2% = <strong>79.2만원</strong><br />
        · 월세 600만원 납부 시: 이하 17% = <strong>102만원</strong> / 초과 15% = <strong>90만원</strong><br />
        · <a href="/w/연말정산-세액공제" style={{ color: "#1D9E75" }}>연말정산 세액공제</a>에서 상세 조건 확인하세요
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 신고) 연말정산 기준으로 작성됐어요. 세법 개정에 따라 공제율이 변경될 수 있으니 국세청 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
