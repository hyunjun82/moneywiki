"use client";

// Q1. 미등록 대부업체에서 돈 빌렸는데 선이자·보증금 떼고 원금 부풀려서 더 갚으라고 하는 상황
// Q2. 실제 원금(실수령액)을 계산하고, 초과 이자 반환 요구 + 불법 업체 신고
// Q3. 실수령액만 원금, 연 20% 초과이자 무효, 선이자는 원금충당, 미등록업체 이자계약 전부무효(0%), 연60%초과 원금무효
// Q4. GreenBox(원금 계산 예시) + Steps(신고·대응 절차) + BorderBox(법정 최고이자율) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "미등록 업체에서 빌린 돈은 안 갚아도 되나요?", a: "실제 받은 금액(원금)은 갚아야 해요. 하지만 이자는 전부 무효(0%)예요. 이미 낸 이자는 원금에 충당돼요." },
  { q: "연 60% 초과 초고금리 대출은요?", a: "2025년 7월 22일부터 연 60% 초과 대부계약은 원금·이자 전부 무효예요. 갚은 돈 전액 반환 청구 가능해요." },
  { q: "선이자로 뗀 돈도 돌려받을 수 있나요?", a: "네, 선이자는 원금에서 제외되고 초과이자로 계산돼요. 이미 낸 선이자는 원금에 충당되니 실제 갚을 금액이 줄어요." },
  { q: "업체에서 협박하면 어떻게 하나요?", a: "즉시 경찰(112)에 신고하세요. 야간(오후 9시~오전 8시) 연락, 폭행·협박, 직장 방문 등은 전부 불법 추심이에요." },
  { q: "신고는 어디에 하나요?", a: "경찰청(112), 금융감독원(1332), 금융소비자포털(fcsc.kr)에 신고할 수 있어요. 증거 자료를 준비하면 처리가 빨라요." },
  { q: "법률 도움은 어디서 받나요?", a: "대한법률구조공단(132)에서 소득 기준에 따라 무료 법률상담과 소송대리를 받을 수 있어요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "대부업법", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=261837" },
    { label: "이자제한법", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=246927" },
    { label: "찾기쉬운 생활법령 - 대부업체 이용자", url: "https://www.easylaw.go.kr/CSP/CsmMain.laf?csmSeq=275" },
    { label: "금융감독원 불법사금융 신고", url: "https://www.fcsc.kr" },
  ]},
];

const RELATED = [
  { slug: "대부업체-사채-이용자", title: "대부업체(사채) 이용자 권리", description: "등록 대부업체 이용 시 알아야 할 권리예요." },
  { slug: "생계비계좌-신청-개설-은행-방법", title: "생계비계좌 압류금지", description: "급여 압류 걱정이 있다면 생계비계좌를 만드세요." },
  { slug: "보이스피싱-대응-방법", title: "보이스피싱 대응 방법", description: "금융 사기 피해 시 대응 절차예요." },
];

const REPORT_STEPS = [
  { title: "증거 확보", desc: "대출 계약서, 입금 내역(실제 받은 금액), 문자·카톡 대화, 통화 녹음 등을 모아요.", tip: "입금 내역이 실제 원금의 핵심 증거예요" },
  { title: "경찰 신고", desc: "112로 전화하거나 가까운 경찰서에 방문해서 미등록 대부업 영업 사실을 신고해요. 불법 대부업은 형사 처벌 대상이에요." },
  { title: "금융감독원 신고", desc: "1332(금융소비자 상담)로 전화하거나 금융소비자포털(fcsc.kr)에서 온라인 신고해요." },
  { title: "법률 지원 요청", desc: "대한법률구조공단(132)에 연락해서 무료 법률상담을 받아요. 소득 기준에 따라 소송 대리까지 지원받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 불법대출 · 사금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미등록 대부업체 불법 대출<br />
        실제 원금 계산법과 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        50만원 빌렸다는데 실제로 받은 건 20만원이고, 선이자·보증금으로 30만원을 떼갔죠?
        이건 명백한 불법이에요. 법적으로 원금은 실제 받은 금액(20만원)만 인정돼요.
        미등록 업체는 이자 계약 자체가 전부 무효(0%)이고, 이미 낸 돈은 원금에 충당돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>원금은 얼마로 인정될까?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=261837" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>대부업법</a>과
        <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=246927" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", marginLeft: 4 }}>이자제한법</a>에 따르면
        선이자, 보증금, 수수료 명목으로 미리 뗀 금액은 원금에 포함되지 않아요.
        실제로 채무자가 수령한 금액만 원금이에요.
      </p>

      <GreenBox title="원금 계산 예시">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>항목</th>
              <th style={{ padding: "8px 6px", textAlign: "right" }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["명목상 대출 금액", "500,000원"],
              ["선이자 (업체가 뗌)", "-200,000원"],
              ["보증금 (업체가 뗌)", "-100,000원"],
              ["실제 수령액 = 법적 원금", "200,000원"],
            ].map(([label, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px" }}>{label}</td>
                <td style={{ padding: "8px 6px", textAlign: "right", fontWeight: i === 3 ? 700 : 400, color: i === 3 ? "#1D9E75" : "#111" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          미등록 업체는 이자 계약 전부 무효(0%). 이미 낸 선이자·보증금·연장수수료는 전부 원금에 충당돼요.
        </p>
      </GreenBox>

      <Divider />

      <H2>법정 최고이자율과 무효 기준</H2>
      <p style={body}>
        등록 대부업체의 법정 최고이자율은 연 20%예요. 미등록 업체는 이자 계약 자체가 전부 무효이고, 2025년 7월 22일부터 연 60% 초과 대부계약은 원금·이자 전부 무효예요.
      </p>

      <BorderBox title="이자 무효 기준 정리">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>구분</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>이자 효력</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>원금</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>등록 업체, 연 20% 이내</td>
              <td style={{ padding: "8px 6px" }}>유효</td>
              <td style={{ padding: "8px 6px" }}>상환 의무</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>등록 업체, 연 20% 초과분</td>
              <td style={{ padding: "8px 6px", color: "#dc2626" }}>초과분 무효</td>
              <td style={{ padding: "8px 6px" }}>상환 의무</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>미등록 업체</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>전부 무효(0%)</td>
              <td style={{ padding: "8px 6px" }}>실수령액만 상환</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>연 60% 초과(폭리)</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>전부 무효</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>원금도 무효</td>
            </tr>
          </tbody>
        </table>
      </BorderBox>

      <Divider />

      <H2>신고하고 법률 도움 받는 절차</H2>
      <p style={body}>
        미등록 대부업체는 불법이에요. 더 갚으라는 요구를 거부하고, 아래 절차대로 신고하세요.
        협박이나 폭력적 추심을 당하고 있다면 즉시 112에 신고하세요.
      </p>

      <Steps steps={REPORT_STEPS} />

      <Divider />
      <ArticleAd position="middle" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 대부업법·이자제한법을 바탕으로 작성했어요. 개별 사안은 법률구조공단(132)에 상담받으세요." />
    </ArticleLayout>
  );
}
