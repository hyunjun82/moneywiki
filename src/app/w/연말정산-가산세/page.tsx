"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 연말정산 서류를 늦게 냈거나 안 냈는데 가산세가 얼마나 나오는지 걱정하는 상황이에요 (주로 회사 담당자).
// Q2. 가산세 종류별 세율을 파악하고, 기한을 놓쳤다면 빨리 지연제출해서 가산세를 줄이는 행동.
// Q3. 지급명세서 미제출 가산세(1%), 지연제출(0.5%), 원천징수이행상황신고서 미제출(1%/0.5%), 제출기한, 부담 주체(회사).
// Q4. GreenBox(가산세 핵심 요약) + PenaltyTable(가산세 세율표) + Checklist(가산세 방지 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout,
} from "@/components/article-ui";
const PENALTIES = [
  { violation: "지급명세서 미제출", penalty: "지급금액의 1%", note: "제출기한: 매년 3월 10일" },
  { violation: "지급명세서 지연제출", penalty: "지급금액의 0.5%", note: "미제출 가산세의 50%" },
  { violation: "지급명세서 허위 기재", penalty: "허위 기재 금액의 1%", note: "" },
  { violation: "간이지급명세서 미제출", penalty: "지급금액의 0.25%", note: "반기별 제출" },
  { violation: "원천징수이행상황신고서 미제출", penalty: "납부세액의 1%", note: "매월 10일까지" },
  { violation: "원천징수이행상황신고서 지연제출", penalty: "납부세액의 0.5%", note: "" },
];

const CHECK_ITEMS = [
  "지급명세서 제출기한(3월 10일) 캘린더에 등록",
  "원천징수이행상황신고서 매월 10일까지 제출 확인",
  "간이지급명세서 반기별 제출 여부 점검",
  "근로자 증빙서류 정확성 사전 검토",
  "홈택스 간소화 자료로 교차 확인",
  "기한 놓쳤다면 즉시 지연제출 — 가산세 50% 줄어들어요",
];

const FAQS = [
  { q: "지급명세서 안 내면 가산세가 얼마예요?", a: "지급금액의 1%예요. 예를 들어 급여 총액 5억원이면 500만원 가산세가 붙어요." },
  { q: "늦게라도 내면 가산세가 줄어드나요?", a: "네, 지연제출하면 미제출 가산세의 50%만 내요. 위 예시에서 250만원으로 줄어들어요. 하루라도 빨리 내는 게 유리해요." },
  { q: "가산세는 회사가 내나요, 근로자가 내나요?", a: "원칙적으로 원천징수의무자인 회사가 내요. 다만 근로자 귀책사유(허위 서류 등)면 회사가 나중에 근로자에게 구상권을 청구할 수 있어요." },
  { q: "원천징수이행상황신고서를 안 내면 어떻게 되나요?", a: "납부세액의 1% 가산세가 붙어요. 월 원천징수 세금이 1,000만원이면 10만원 가산세예요." },
  { q: "허위 내용으로 지급명세서를 제출하면요?", a: "허위 기재된 금액의 1%가 가산세로 부과돼요. 정확한 내용으로 작성하는 게 중요해요." },
  { q: "2027년까지 간이지급명세서 미제출 가산세가 면제된다는데요?", a: "2027년 12월 31일까지 지급분에 대해 간이지급명세서 미제출 가산세가 면제되는 특례가 있어요. 소규모 사업장(20인 이하)은 2028년까지 연장돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 가산세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7704&mi=2292" },
      { label: "국세기본법 제47조의2 (가산세)", url: "https://www.law.go.kr/법령/국세기본법" },
      { label: "국세청 지급명세서 제출 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12242&cntntsId=8631" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 가산세 · 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 가산세, 얼마나 나올까?<br />
        종류별 세율과 줄이는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지급명세서를 기한 안에 못 냈거나, 원천징수 신고를 빠뜨렸죠?
        가산세는 일종의 벌금인데, 종류에 따라 지급금액의 0.25%~1%가 붙어요.
        기한을 놓쳤어도 빨리 제출하면 절반으로 줄일 수 있어요.
      </p>

      <Divider />

      <H2>가산세 종류별 세율이 궁금해요</H2>
      <p style={body}>
        연말정산 관련 가산세는 크게 지급명세서와 원천징수이행상황신고서 두 축으로 나뉘어요.
        <a href="https://www.law.go.kr/법령/국세기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세기본법 제47조의2</a>에서 규정하고 있어요.
      </p>

      <SectionBadge>가산세 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>위반 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>가산세율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {PENALTIES.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{r.violation}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{r.penalty}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>기한 놓쳤으면 어떻게 해야 하나요?</H2>
      <p style={body}>
        핵심은 단 하나예요. 하루라도 빨리 제출하세요. 지연제출 가산세는 미제출 가산세의 절반이에요.
      </p>

      <GreenBox>
        기한 후 대응 핵심이에요.<br />
        · 지급명세서: 3월 10일 지나도 빨리 내면 가산세 1% → 0.5%로 반감<br />
        · 원천징수 신고: 매월 10일 놓쳐도 빨리 신고하면 가산세 절반<br />
        · 허위 기재보다 정확한 지연제출이 훨씬 유리해요
      </GreenBox>

      <p style={body}>
        예를 들어 근로자 급여 총액이 5억원인데 지급명세서를 3월 10일까지 안 냈다면 가산세가 500만원이에요.
        그런데 4월에라도 지연제출하면 250만원으로 줄어들어요. 250만원 차이가 나니까 미루지 마세요.
      </p>

      <Divider />

      <H2>가산세 안 맞으려면 뭘 챙겨야 하나요?</H2>
      <p style={body}>
        가산세를 피하는 가장 확실한 방법은 기한 준수예요.
        아래 체크리스트를 회사 인사·경리 담당자가 확인하세요.
      </p>

      <SectionBadge>가산세 방지 체크리스트</SectionBadge>
      <Checklist items={CHECK_ITEMS} />

      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        간소화 자료를 미리 확인하면 서류 오류를 줄일 수 있어요.
        <a href="/w/연말정산-간소화서비스-이용방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산 간소화서비스 이용방법</a>도 참고하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세기본법·국세청 자료를 바탕으로 작성했어요. 가산세 규정은 세법 개정 시 달라질 수 있으니 국세청(126)이나 홈택스에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
